// This will transform all of jQuery's $.ajax calls to use the proxies defined by the UWA component (so we don't have to do this manually for every request!)
if(window.jQuery && window.widget && window.widget.getValue) {
    // Make sure we are at least v1.5 of jQuery so we have the function we want to use.
    // Also make sure that the widget environment isn't 'uwa', which means that we are running in standalone mode
    if(jQuery.ajaxPrefilter) {
        /****
        options - the request options
        originalOptions - the options as provided to the ajax method, unmodified and, thus, without defaults from ajaxSettings
        jqXHR - the jqXHR object of the request
        ****/
        jQuery.ajaxPrefilter(function( options, originalOptions, jqXHR ){
            'use strict';
            var context = window.widget.getValue("pad_security_ctx") || window.widget.getValue('collabSpace');
            if (!context && window.Foe && window.Foe.Model && window.Foe.Model.Session) {
                context = Foe.Model.Session.get('security_ctx');
                if (context && context.contains('ctx::ctx::')) {
                    //NWT 8/31/2021 - not sure how, but sometimes the ctx:: prefix gets added twice.  at least fix it here
                    context = secContext.replace('ctx::ctx::', 'ctx::');
                    Foe.Model.Session.set('security_ctx', context);
                }
                window.widget.setValue('pad_security_ctx', context);
            }
            var objNewHeaders = {
                SecurityContext : context,
                'Accept-Language': window.widget.lang || 'en'
            };
            if (options.headers) {
                options.headers = $.extend(true, options.headers, objNewHeaders);
            } else {
                options.headers = objNewHeaders;
            }
        });
    }
}
