(function(exports) {
    "use strict";
   /*global window*/

    // Ported from Cesium.
    // http://cesiumjs.org/
    // https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md

    exports = exports || window;

    function getQueryParameters() {
        var queryParameters = {};

        var search = window.location.search;
        if (search.length > 1) {
            search = search.substr(1);
            var parameters = search.split('&');
            for (var i = 0; i < parameters.length; ++i) {
                if (parameters[i].length > 0) {
                    var index = parameters[i].indexOf('=');
                    if (index !== -1) {
                        var key = parameters[i].substr(0, index);
                        var value = unescape(parameters[i].substr(index + 1));
                        queryParameters[key] = value;
                    } else {
                        queryParameters[parameters[i]] = '';
                    }
                }
            }
        }

        return queryParameters;
    }
    
    exports.getQueryParameters = getQueryParameters;

}());
