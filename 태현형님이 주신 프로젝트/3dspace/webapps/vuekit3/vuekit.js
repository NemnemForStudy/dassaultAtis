/*! Copyright 2021 Dassault Systèmes */
/* Configure AMD Loader with path to umd lib */
/* eslint-disable */
/* global require, define, UWA */
(function () {
    'use strict';

    let basePath = require.toUrl('DS/vuekit/vu-kit.umd');

    // Remove any query strings
    if (basePath.indexOf('?') > -1) {
        basePath = basePath.substring(0, basePath.indexOf('?'));
    }

    // for UWA & Widget platform based applications, the debug mode switches to Vue debug build
    let path = basePath + ((typeof UWA === 'object' && UWA.debug) ? '' : '.min');

    require.config({
        paths: {
            'vu-kit': path
        },
    });
})();

define('DS/vuekit/vuekit',
    [
        'DS/vue/vue',
        'vu-' + 'kit',
        'css!DS/vuekit' + '/vu-kit.css',
    ],
    function (Vue, Vuekit) {
        'use strict';

        Vue.use(Vuekit);

        return Vuekit;
    });
