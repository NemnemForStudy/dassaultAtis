// This will transform all of jQuery's $.ajax calls to use the proxies defined by the UWA component (so we don't have to do this manually for every request!)
if(window.jQuery && window.UWA && window.UWA.Data && window.UWA.Data.proxies && window.UWA.Data.proxies.ajax) {
   // Make sure we are at least v1.5 of jQuery so we have the function we want to use.
   // Also make sure that the widget environment isn't 'uwa', which means that we are running in standalone mode
  if(jQuery.ajaxPrefilter) {
    /****
      options - the request options
      originalOptions - the options as provided to the ajax method, unmodified and, thus, without defaults from ajaxSettings
      jqXHR - the jqXHR object of the request
    ****/
    var corsAuthenticationSupported = null;
    jQuery.ajaxPrefilter(function( options, originalOptions, jqXHR ){
      'use strict';
      if(jqXHR && options && window.widget && window.widget.environment){
          if((!options.data || !options.data.APP_NAME) && window.Configuration && window.Configuration.mode && !window.Configuration.useFixtures) { //NOT IN FIXTURES
            //if we have a setting in the application config and we do NOT have one in our options to send to the server, then add it.
            // This improves the consistancy across frameworks that define their own APP_NAME value
            if(!options.data) {
                //check the direct URL first...
                if(options.url.indexOf("APP_NAME=") < 0) {
                    options.data = "APP_NAME="+window.Configuration.mode;
                }
            } else if(typeof options.data == "string") {
                //just add it to the end of the querystring if it isn't already there
                if((options.data.indexOf("APP_NAME=") < 0) && (options.url.indexOf("APP_NAME=") < 0)) {
                    options.data += "&APP_NAME="+window.Configuration.mode;
                }
            }

            if(options.data && $.isPlainObject(options.data)) {
                options.data.APP_NAME = window.Configuration.mode;
            }
          }

          //copied from WAFData.js
          // check if a module is available independently of the AMD loader implementation
          function isModuleAvailable (moduleId) {
              // RequireJS exposes a global require.defined to check if module are loaded
              if (require && require.defined) {
                  return require.defined(moduleId);
              } else {
                  // Else the spec mandate the loader to throw an error when using a local require
                  try {
                      require(moduleId);
                      return true;
                  } catch (e) {
                      return false;
                  }
              }
          }

          // Lazy check for Passport CORS authentication support
          function isCorsAuthenticationSupported () {
              var platformAPIname = 'DS/PlatformAPI/PlatformAPI',
                  passportDisableCorsKeyName = 'com.3ds.wp.passport.cors';

              if (corsAuthenticationSupported === null) {
                  corsAuthenticationSupported = !(isModuleAvailable(platformAPIname) &&
                      String(require(platformAPIname).getApplicationConfiguration(passportDisableCorsKeyName)) === 'disabled');

                  if (!corsAuthenticationSupported) {
                      logger.info('Passport CORS authentication is not supported');
                  }
              }

              return corsAuthenticationSupported;
          }

          if(window.widget.environment.name != 'uwa'){
              var uwaDataOptions = { //these are grabed from UWA2/js/Data.js::request()
                        timeout: 250000, //some queries take a REALLY long time in Enovia.  bump this up to 250 seconds to allow enovia enough time to respond
                        method: (options.type ? options.type.toUpperCase() : 'GET'), // in R419 POST doesnt work - bad request error - kam
                       // method: 'GET',
                        type: (options.dataType ? options.dataType.toLowerCase() : 'text'),
                        proxy: (window.UWA.Data.proxies["passport"] ? "passport" : "ajax"),
                        async: options.async//,
                        //headers: {},
                        //useOfflineCache: window.UWA.Data.useOfflineCache,
                        //allowCrossOriginRequest: window.UWA.Data.allowCrossOriginRequest,
                        //useJsonpRequest: window.UWA.Data.useJsonpRequest,
                        //onFailure: options.error || function (error) {
                        //    throw error;
                        //},
                        //onComplete: options.success || function () {
                        //    // Nothing to do by default...
                        //}
                    };
              /*if (options.dataType == "json")
              {
                  options.headers = { 'Accept': 'application/json', 'X-Requested-Method': 'GET', 'Content-Type': 'application/json' };
                  options.type = "get";
              }*/


            var secContext = window.widget.getValue('collabSpace');
            var strUser = (window.COMPASS_CONFIG ? window.COMPASS_CONFIG.userId : null);
            if (window.Foe && window.Foe.Model && window.Foe.Model.Session) {
                if (!secContext) {
                    secContext = window.Foe.Model.Session.get('security_ctx');
                }
                if (!strUser) {
                    strUser = window.Foe.Model.Session.get('user');
                }
            }
            while (secContext && secContext.contains('ctx::ctx::')) {
                //NWT 3/10/2022 - not sure how, but sometimes the ctx:: prefix gets added twice.  at least fix it here
                secContext = secContext.replace('ctx::ctx::', 'ctx::');
            }

            uwaDataOptions.headers = {
                    //Accept: 'application/json',
                    'Accept-Language' : window.widget.lang,
                    //'Content-Type': 'application/json; charset=UTF-8',
                    SecurityContext: secContext,
                    SecurityToken: strUser+'|'+secContext+'|preferred'
            };
//            if (options.dataType === 'json') {
//                  uwaDataOptions.headers.Accept = 'application/json';
//                  uwaDataOptions.headers['Content-Type'] = 'application/json; charset=UTF-8';
//            }

              //not sure if these are used, but we might as well set them if we have them.
            if(options.error) {
              uwaDataOptions.onFailure = options.error;
            }
            if(options.success) {
              uwaDataOptions.onComplete = options.success;
            }

            var newUrl = options.url;
            if((newUrl[0] == "/") && window.widget.getUrl) {
              //get the protocol/hostname/port from our original server
              //newUrl = $("<a>",{href:widget.uwaUrl}).get(0).origin + newUrl;
              var aTag = $("<a>",{href:window.widget.getUrl()}).get(0);
    //          if(aTag.pathname && (aTag.pathname.indexOf(newUrl) != 0)) {
    //            //we have an invalid path to start with!  use the first part of our path...
    //            var nextSlashPos = aTag.pathname.indexOf("/",1); //start looking at index 1
    //            if(nextSlashPos < 0) { //not found...
    //              newUrl = aTag.pathname;
    //            } else {
    //              newUrl = aTag.pathname.substring(0,nextSlashPos);
    //            }
    //          }

              var origin = aTag.origin;
              if(!origin) { //not all browsers support the origin on an anchor tag...
                origin = aTag.protocol + "//" + aTag.hostname;
                if(aTag.port) {
                  origin += ":"+aTag.port;
                }
              }
              newUrl = origin + newUrl;
            }

            //if we can, use the correct proxy
            //if(uwaDataOptions.type && window.UWA.Data.proxies[uwaDataOptions.type]) {
            //  uwaDataOptions.proxy = uwaDataOptions.type;
            //}

            //use UWA's own methods to create our proxified URL
            if (!isCorsAuthenticationSupported()) {
                newUrl = window.UWA.Data.proxifyUrl(newUrl,uwaDataOptions);
            } else {
                options.xhrFields = { withCredentials: true };
                if (uwaDataOptions.headers) {
                    options.headers = uwaDataOptions.headers;
                }
            }
            if(newUrl != options.url) {
              var strMsg = "jquery.uwa.proxy.js - '"+options.url+"' has been proxified using UWA to '"+newUrl+"'";
              if(window.steal) { //StealJS is part of JavascriptMVC
                steal.dev.log(strMsg); //this will only actually print to the console in development mode
              } else if(UWA.log) {
                UWA.log(strMsg); //use UWA's logging mechanism
              } else if(window.console && console.log) {
                console.log(strMsg); //default to the normal browser console, if it exists.
              }
              options.crossDomain = false; //we are no longer a cross domain script!
              options.url = newUrl; //set the url of the ajax request to our new one.
            }
          }
      }
    });
  } else {
    var strMsg = "jquery.uwa.proxy.js - jQuery.ajaxPrefilter DOES NOT EXIST!  WE CANNOT PROXIFY OUR AJAX CALLS!!";
    if(window.steal) { //StealJS is part of JavascriptMVC
      steal.dev.log(strMsg); //this will only actually print to the console in development mode
    } else if(UWA.log) {
      UWA.log(strMsg); //use UWA's logging mechanism
    } else if(window.console && console.log) {
      console.log(strMsg); //default to the normal browser console, if it exists.
    }
  }

  if(window.steal && window.steal.request) {
    //we need to update steal's internal XMLHTTPRequest method with our proxied URL
    window.steal.requestORIG = window.steal.request;
    window.steal.request = function(options, success, error){
      if(options && options.src && window.widget && window.widget.environment && (window.widget.environment.name != 'uwa')){
        var uwaDataOptions = { //these are grabed from UWA2/js/Data.js::request()
            //timeout: 25000,
                    method: 'GET',
                    type: (options.dataType ? options.dataType.toLowerCase() : 'text'),
                    proxy: (window.UWA.Data.proxies["passport"] ? "passport" : "ajax")
//                    proxy: "ajax"//,
                    //async: options.async//,
                    //headers: {},
                    //useOfflineCache: window.UWA.Data.useOfflineCache,
                    //allowCrossOriginRequest: window.UWA.Data.allowCrossOriginRequest,
                    //useJsonpRequest: window.UWA.Data.useJsonpRequest,
                    //onFailure: options.error || function (error) {
                    //    throw error;
                    //},
                    //onComplete: options.success || function () {
                    //    // Nothing to do by default...
                    //}
                };

        if("async" in options) {
          uwaDataOptions.async = options.async;
        }
        //not sure if these are used, but we might as well set them if we have them.
        if(error) {
          uwaDataOptions.onFailure = error;
        }
        if(success) {
          uwaDataOptions.onComplete = success;
        }

        var newUrl = options.src.toString();
        if((newUrl[0] == "/") && window.widget.getUrl) {
          //trick to create a temporary anchor tag, set the href, then use the common browser anchor location attributes
          var aTag = $("<a>",{href:window.widget.getUrl()}).get(0);
          if(aTag) {
            var origin = aTag.origin;
            if(!origin) { //not all browsers support the origin on an anchor tag...
              origin = aTag.protocol + "//" + aTag.hostname;
              if(aTag.port) {
                origin += ":"+aTag.port;
              }
            }
            newUrl = origin + newUrl;
          }
        }

        try {
          if (window.Fam && window.Fam.Model && window.Fam.Model.Platform && window.Fam.Model.Platform.callAuthenticatedRequest) {
            return window.Fam.Model.Platform.callAuthenticatedRequest(newUrl.toString(), uwaDataOptions.onComplete, uwaDataOptions.onFailure, uwaDataOptions.type, uwaDataOptions.method, uwaDataOptions.data, function() {
                  return UWA.Data.request(newUrl.toString(),uwaDataOptions);
            });
          } else {
              return UWA.Data.request(newUrl.toString(),uwaDataOptions);
          }
        } catch (e) {
          //well, that didn't work.  try the jquery version
          return jQuery.ajax(newUrl.toString(),jQuery.extend(false,options,{url: newUrl.toString(), type: uwaDataOptions.method, success:success, error:error}));
        }
      }
      return window.steal.requestORIG(options, success, error);
    };
  }
}
