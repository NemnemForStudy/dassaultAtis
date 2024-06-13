/*! Copyright 2014 Dassault Systèmes */
/* Configure AMD Loader to load non AMD lib
 * See requirejs shim config for references :
 *   http://requirejs.org/docs/api.html#config-shim
 */
/* global require, define, Highcharts */

// if Highcharts has already been exported to global scope (preloaded) and if has same version, define it right away
if (typeof Highcharts !== 'undefined' && Highcharts.version === '8.2.2') {
    define('highcharts/highcharts', function() {
        'use strict';
        return Highcharts;
    });
} else {

    // Avoid leaking variables
    (function() {
        'use strict';

        // Remove any query strings
        var path = require.toUrl('DS/VENHighChart/highcharts.8.2.2/highcharts');
        if (path.indexOf('?') > -1) {
            path = path.substring(0, path.indexOf('?'));
        }

        var path2 = require.toUrl('DS/VENHighChart/highcharts.8.2.2/highcharts-more');
        if (path2.indexOf('?') > -1) {
            path2 = path2.substring(0, path2.indexOf('?'));
        }

        var path3 = require.toUrl('DS/VENHighChart/highcharts.8.2.2/modules/pattern-fill');
        if (path3.indexOf('?') > -1) {
            path3 = path3.substring(0, path3.indexOf('?'));
        }

        require.config({
            paths: {
                'highcharts/highcharts': path,
                'highcharts/highcharts-more': path2,
                'highcharts/modules/pattern-fill': path3
            },
            packages: [{
                name: "highcharts",
                main: "highcharts"
            }]

        });
    })();
}

define('DS/VENHighChart/UIHighCharts',
    [
        'highcharts/highcharts',
        'highcharts/highcharts-more',
        'highcharts/modules/pattern-fill'
    ],
    function(Highcharts) {
        'use strict';
        return Highcharts;
    }
);
