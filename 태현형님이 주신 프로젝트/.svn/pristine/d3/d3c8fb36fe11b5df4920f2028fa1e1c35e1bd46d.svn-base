/*! Copyright 2021 Dassault Systèmes */
/* Configure AMD Loader with path to vendor umd lib */
/* global require, define, window, UWA */
if (typeof window !== 'undefined' && typeof window.Vuetify === 'function') {
    define('DS/VENVuetify', window.Vuetify);
} else {
    (function () {
        'use strict';

        let basePath = require.toUrl('DS/vuetify-2.4.9/dist/vuetify');

        // Remove any query strings
        if (basePath.indexOf('?') > -1) {
            basePath = basePath.substring(0, basePath.indexOf('?'));
        }

        // for UWA & Widget platform based applications, the debug mode switches to Vue debug build
        let path = basePath + ((typeof UWA === 'object' && UWA.debug) ? '' : '.min');

        require.config({
            paths: {
                'vuetify': path
            },
        });
    })();
}

define('DS/Vuetify/Vuetify',
    [
        'DS/vue/vue',
        'vuetify',
    ],
    function (Vue, Vuetify) {
        'use strict';

        Vue.use(Vuetify);

        return Vuetify;
    });
