(function() {
    "use strict";
    /*global window,document,Float32Array,Uint16Array,mat4,vec3,snoise*/
    /*global getShaderSource,createWebGLContext,createProgram,PerformanceDisplay*/

    var parameters = getQueryParameters();
    var resolution = parameters.resolution ? parameters.resolution : 2048;

    var CPU_IMPLEMENTATION = parameters.cpu && (parameters.cpu === 'yes');
    var WIDTH_POINTS = resolution;
    var HEIGHT_POINTS = resolution;
    var WIDTH_DIVISIONS = WIDTH_POINTS - 1;
    var HEIGHT_DIVISIONS = HEIGHT_POINTS - 1;

    var message = document.getElementById('message');
    var canvas = document.getElementById('canvas');
    var gl = createWebGLContext(canvas, message);
    if (!gl) {
        return;
    }

    ///////////////////////////////////////////////////////////////////////////

    var positionLocation = 0;
    var heightLocation = 1;
    var u_timeLocation;

    function createShaders() {
        var program;
        var fs = getShaderSource(document.getElementById("fs"));

        if (CPU_IMPLEMENTATION) {
            var cpuVS = getShaderSource(document.getElementById("cpuVS"));

            program = createProgram(gl, cpuVS, fs, message);
            positionLocation = gl.getAttribLocation(program, "position");
            heightLocation = gl.getAttribLocation(program, "height");
        }
        else {
            var gpuVS = getShaderSource(document.getElementById("gpuVS"));

            program = createProgram(gl, gpuVS, fs, message);
            positionLocation = gl.getAttribLocation(program, "position");
            u_timeLocation = gl.getUniformLocation(program,"u_time");
        }

        gl.useProgram(program);

        var persp = mat4.create();
        mat4.perspective(45.0, 0.5, 0.1, 100.0, persp);

        var eye = [2.0, 1.0, 3.0];
        var center = [0.0, 0.0, 0.0];
        var up = [0.0, 0.0, 1.0];
        var view = mat4.create();
        mat4.lookAt(eye, center, up, view);

        var model = mat4.create();
        mat4.identity(model);
        mat4.translate(model, [-0.5, -0.5, 0.0]);
        var mv = mat4.create();
        mat4.multiply(view, model, mv);
        var mvp = mat4.create();
        mat4.multiply(persp, mv, mvp);
        gl.uniformMatrix4fv(gl.getUniformLocation(program,"u_modelViewPerspective"), false, mvp);
    }
    createShaders();

    var heights;
    var numberOfPositions;

    function createBuffers() {
        numberOfPositions = 6 * 2 * WIDTH_DIVISIONS * HEIGHT_DIVISIONS;
        var positions = new Float32Array(numberOfPositions);

        // Triangle soup.
        var k = 0;
        for (var i = 0; i < HEIGHT_DIVISIONS; ++i) {
            var bottomY = i / HEIGHT_POINTS;
            var topY = (i + 1) / HEIGHT_POINTS;

            for (var j = 0; j < WIDTH_DIVISIONS; ++j) {
                var leftX = j / WIDTH_POINTS;
                var rightX= (j + 1) / WIDTH_POINTS;

                positions[k] = leftX;
                positions[k + 1] = bottomY;

                positions[k + 2] = rightX;
                positions[k + 3] = bottomY;

                positions[k + 4] = rightX;
                positions[k + 5] = topY;

                positions[k + 6] = leftX;
                positions[k + 7] = bottomY;

                positions[k + 8] = rightX;
                positions[k + 9] = topY;

                positions[k + 10] = leftX;
                positions[k + 11] = topY;

                k += 12;
            }
        }

        message.innerText = (CPU_IMPLEMENTATION ? 'CPU' : 'GPU') + 
            '. Resolution: ' + resolution + 
            '. Vertices: ' + (numberOfPositions / 2).toLocaleString();

        var positionsName = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionsName);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);

        if (CPU_IMPLEMENTATION) {
            heights = new Float32Array(numberOfPositions);

            var heightsName = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, heightsName);
            gl.bufferData(gl.ARRAY_BUFFER, heights.length * heights.BYTES_PER_ELEMENT, gl.STREAM_DRAW);
            gl.vertexAttribPointer(heightLocation, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(heightLocation);
        }
    }
    createBuffers();

    var performanceDisplay = new PerformanceDisplay();
    var time = 0.0;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    function animate() {
        // Update
        time += 0.0005;

        if (CPU_IMPLEMENTATION) {
            var k = 0;
            for (var i = 0; i < HEIGHT_DIVISIONS; ++i) {
                var bottomY = i / HEIGHT_POINTS;
                var topY = (i + 1) / HEIGHT_POINTS;

                for (var j = 0; j < WIDTH_DIVISIONS; ++j) {
                    var leftX = j / WIDTH_POINTS;
                    var rightX= (j + 1) / WIDTH_POINTS;

                    heights[k++] = snoise([leftX, bottomY, time]);
                    heights[k++] = snoise([rightX, bottomY, time]);
                    heights[k++] = snoise([rightX, topY, time]);
                    heights[k++] = snoise([leftX, bottomY, time]);
                    heights[k++] = snoise([rightX, topY, time]);
                    heights[k++] = snoise([leftX, topY, time]);
                }
            }

            // Buffer already bound
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, heights);
        }

        // Render
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniform1f(u_timeLocation, time);
        gl.drawArrays(gl.TRIANGLES, 0, numberOfPositions / 2);

        performanceDisplay.update();
        window.requestAnimationFrame(animate);
    }
    animate();

}());
