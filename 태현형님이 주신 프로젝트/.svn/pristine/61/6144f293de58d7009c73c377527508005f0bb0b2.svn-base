/*! Copyright 2021 Dassault Systèmes */
/* Configure AMD Loader with path to vendor umd lib */
/* global require, define, UWA */
(function () {
    'use strict';

    let basePath = require.toUrl('DS/vuejs/2.6.10/');

    // Remove any query strings
    if (basePath.indexOf('?') > -1) {
        basePath = basePath.substring(0, basePath.indexOf('?'));
    }

    // for UWA & Widget platform based applications, the debug mode switches to Vue debug build
    let path = basePath + ((typeof UWA === 'object' && UWA.debug) ? 'vue' : 'vue.min');

    require.config({
        paths: {
            vuejs: path,
        },
    });
})();

// AMDLoader fails in some settings to resolve Vue without this required hook.
// This solves a race condition where path in require config is set multiple times 
// with a different path and loaded in between.
define('vue', [ 'vuejs' ], (Vue) => Vue);

define('DS/vue/vue',
    ['vue'],
    function (Vue) {
        'use strict';

        return Vue;
    });
