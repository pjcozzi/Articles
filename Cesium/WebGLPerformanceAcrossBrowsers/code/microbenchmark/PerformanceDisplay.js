(function(exports) {
    "use strict";
   /*global window*/

    // Ported from Cesium.
    // http://cesiumjs.org/
    // https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md

    exports = exports || window;

    var defined = function(value) {
        return value !== undefined;
    };

    var getTimestamp;

    if (typeof performance !== 'undefined' && defined(performance.now)) {
        getTimestamp = function() {
            return performance.now();
        };
    } else {
        getTimestamp = function() {
            return Date.now();
        };
    }

    var getElement = function(element) {
        if (typeof element === 'string') {
            return document.getElementById(element);
        }
        return element;
    };

    var PerformanceDisplay = function(container) {
        var removeContainer = false;

        if (!defined(container)) {
            container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.top = '10px';
            container.style.left = '10px';
            document.body.appendChild(container);
            removeContainer = true;
        }
        var container = getElement(container);

        this._removeContainer = removeContainer;
        this._container = container;
        this._fpsColor = '#e52';
        this._frameTimeColor = '#de3';
        this._backgroundColor = 'rgba(40, 40, 40, 0.7)';
        this._font = 'bold 12px Helvetica,Arial,sans-serif';

        var display = document.createElement('div');
        var fpsElement = document.createElement('div');
        this._fpsText = document.createTextNode("");
        fpsElement.appendChild(this._fpsText);
        fpsElement.style.color = this._fpsColor;
        var msElement = document.createElement('div');
        this._msText = document.createTextNode("");
        msElement.style.color = this._frameTimeColor;
        msElement.appendChild(this._msText);
        display.appendChild(fpsElement);
        display.appendChild(msElement);
        display.style['z-index'] = 1;
        display.style['background-color'] = this._backgroundColor;
        display.style.font = this._font;
        display.style.padding = '7px';
        display.style['border-radius'] = '5px';
        display.style.border = '1px solid #444';
        this._container.appendChild(display);

        this._lastFpsSampleTime = undefined;
        this._frameCount = 0;
        this._time = undefined;
        this._fps = 0;
        this._frameTime = 0;
    };

    /**
     * Update the display.  This function should only be called once per frame, because
     * each call records a frame in the internal buffer and redraws the display.
     */
    PerformanceDisplay.prototype.update = function() {
        if (!defined(this._time)) {
            //first update
            this._lastFpsSampleTime = getTimestamp();
            this._time = getTimestamp();
            return;
        }

        var previousTime = this._time;
        var time = getTimestamp();
        this._time = time;

        var frameTime = time - previousTime;

        this._frameCount++;
        var fps = this._fps;
        var fpsElapsedTime = time - this._lastFpsSampleTime;
        if (fpsElapsedTime > 1000) {
            fps = this._frameCount * 1000 / fpsElapsedTime | 0;

            this._lastFpsSampleTime = time;
            this._frameCount = 0;
        }

        if (fps !== this._fps) {
            this._fpsText.nodeValue = fps + ' FPS';
            this._fps = fps;
        }

        if (frameTime !== this._frameTime) {
            this._msText.nodeValue = frameTime.toFixed(2) + ' MS';
            this._frameTime = frameTime;
        }

    };

    PerformanceDisplay.prototype.destroy = function() {
        if (this.removeContainer) {
            this._container.parentNode.removeChild(this._container);
        }
    };

    exports.PerformanceDisplay = PerformanceDisplay;

}());
