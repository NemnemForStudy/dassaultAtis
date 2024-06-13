/*! Copyright 2021 Dassault Systèmes */
/* Configure AMD Loader with path to vendor umd lib */
/* global require, define, window */
if (typeof window !== 'undefined' && typeof window.Vuex === 'function') {
    define('DS/VENVuex', window.Vuex);
} else {
    (function () {
        'use strict';

        let basePath = require.toUrl('DS/vuex-3.6.2/dist/');

        // Remove any query strings
        if (basePath.indexOf('?') > -1) {
            basePath = basePath.substring(0, basePath.indexOf('?'));
        }

        let path = basePath + ((typeof UWA === "object" && UWA.debug) ? 'vuex' : 'vuex.min');

        require.config({
            paths: {
                'DS/VENVuex': path
            },	
        });
    })();
}

define('DS/vuex/vuex',
    [
        'DS/vue/vue', 
        'DS/VEN' + 'Vuex'
    ],
    function (Vue, Vuex) {

        Vue.use(Vuex);
        return Vuex;
    });
