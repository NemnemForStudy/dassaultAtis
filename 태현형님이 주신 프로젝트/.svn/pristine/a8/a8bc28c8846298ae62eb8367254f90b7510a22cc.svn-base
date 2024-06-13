steal(
  '//../DSCommon/src/ds_getUrlVars.js',
  '//../DSCommon/src/ajax_indicator.js'
).then(function() {
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
//    var can = window.can; //for mkscc compliance, we have to define all our variables...
    var steal = window.steal; //for mkscc compliance, we have to define all our variables...
    var Ds = window.Ds; //for mkscc compliance, we have to define all our variables...
//    var Foe = window.Foe; //for mkscc compliance, we have to define all our variables...
//    var Snd = window.Snd; //for mkscc compliance, we have to define all our variables...
//    var Dfd = window.Dfd; //for mkscc compliance, we have to define all our variables...

    var _origParams = {};

  //see https://api.jquery.com/ajaxError/
  $( document ).ajaxError(function( event, jqXHR, settings /*, thrownError */) {
        //504 === Gateway Timeout, which often happens when routing through a proxy like on the dashboard
        if ((jqXHR.status === 504) && settings && settings.url &&
                ((settings.crossDomain && (settings.url.indexOf('/resources/DEL') > 0)) || //Cloud Dashboard
                (window.UWA && UWA.hosts && UWA.hosts.proxies && UWA.hosts.proxies.passport && (settings.url.indexOf(UWA.hosts.proxies.passport) === 0))))//OnPremise dashboard
        {

          var parseXML = function( xml ) {  //try to use a real XML parser if possible
            if ( window.ActiveXObject && window.GetObject ) {
                var dom = new window.ActiveXObject( 'Microsoft.XMLDOM' );
                dom.loadXML( xml );
                return dom;
            }
            if ( window.DOMParser ) {
                return (new DOMParser()).parseFromString( xml, 'text/xml' );
            }
            if (steal) {
              steal.dev.log( 'No XML parser available' );
            } else if (window.console) {
              window.console.log( 'No XML parser available' );
            } else {
              throw new Error( 'No XML parser available' );
            }
            return null;
          };

          //the request timed out for some reason.  Create a new request to fetch the completed request
          //wait 5 seconds, then try again
          var R = null;
          var actionRecover = null;
          var urlVars = null;
          var urlVars2 = null;
          var appURL = null;

          if (settings.url.indexOf('R=') > 0) {
            urlVars = Ds.getUrlVars(settings.url.toString());
          } else if (typeof settings.data === 'object' && settings.data.constructor.name === 'FormData') {
            urlVars = settings.data.get('options');
            if(typeof urlVars === 'string'){
                urlVars = JSON.parse(urlVars);
            }
          } else if (settings.data && settings.data.indexOf('R=') >= 0) {
            urlVars = Ds.getUrlVars(settings.data.toString());
          } else if (settings.url.indexOf('url=') > 0) {
            //the proxy server calls pass the URL of the location we are trying to get as a parameter of the URL.  THAT is the URL we are interested in!
            urlVars2 = Ds.getUrlVars(settings.url.toString());
            if (urlVars2 && urlVars2.url) {
              appURL = decodeURIComponent(urlVars2.url); //we have to replace all the URL Encodings to turn it back into a normal URL
              if (appURL.indexOf('R=') > 0) {
                urlVars = Ds.getUrlVars(appURL);
              }
            }
          }
          if (urlVars && urlVars.R) {
            R = urlVars.R;

              //check specifically for the action now
              urlVars = null;
		      var endIdx = -1;
              if (settings.url.indexOf('/resources/') >= 0) {
                endIdx = settings.url.indexOf('?');
                if (endIdx <= 0) {
                  //use the entire URL
                  endIdx = settings.url.length+1;
                }

                actionRecover = settings.url.substring(settings.url.indexOf('/resources/'),endIdx);
              } else if (settings.data && typeof settings.data === 'string' && settings.data.indexOf('/resources/') >= 0) {
                endIdx = settings.data.indexOf('?');
                if (endIdx <= 0) {
                  //use the entire URL
                  endIdx = settings.data.length+1;
                }

                actionRecover = settings.data.substring(settings.data.indexOf('/resources/'),endIdx);
                //urlVars = Ds.getUrlVars(settings.data.toString());
              } else if (settings.url.indexOf('url=') > 0) {
                //the proxy server calls pass the URL of the location we are trying to get as a parameter of the URL.  THAT is the URL we are interested in!
                urlVars2 = Ds.getUrlVars(settings.url.toString());
                if (urlVars2 && urlVars2.url) {
                  appURL = decodeURIComponent(urlVars2.url); //we have to replace all the URL Encodings to turn it back into a normal URL
                  if (appURL.indexOf('/resources/') > 0) {
                    endIdx = appURL.indexOf('?');
                    if (endIdx <= 0) {
                      //use the entire URL
                      endIdx = appURL.length+1;
                    }

                    actionRecover = appURL.substring(appURL.indexOf('/resources/'),endIdx);
                  }
                }
              }

              if ((actionRecover === '/resources/DELWebInfrastructure/v0/getPreviousResponse') && settings.data && typeof settings.data === 'string') {
                //the getPreviousResonse timed out!!  The server must be REALLY busy.
                //  Just set it to the original URL that it was trying to get
                var origQueryString = decodeURIComponent(settings.data);
                if (origQueryString && (origQueryString.indexOf('actionRecover=') >= 0)) {
                    urlVars2 = Ds.getUrlVars(origQueryString);
                    if (urlVars2 && urlVars2.actionRecover && urlVars2.R) {
                        actionRecover = urlVars2.actionRecover; //back to original
                        R = urlVars2.R;
                    }
                }
              }
          }

          if (R && actionRecover) {
            var webroot = window.Configuration.webroot+'/';
            if (settings.crossDomain && (settings.url.indexOf('/resources/DEL') > 0)) { //cloud crossDomain request
                webroot = settings.url.substr(0, settings.url.indexOf('/resources/DEL'))+'/';
            }
            if (!_origParams[R]) {
                //storing this here helps when the getPreviousResponse itself times out
                _origParams[R] = {
                    actionRecover:actionRecover,
                    settings:settings,
                    event:event,
                    jqXHR:jqXHR
                };
            }

            if (settings.timeout && !settings._startTime) {
              settings._startTime = (new Date()).getTime(); //the number of milliseconds since 1970/01/01
            }
            var getPrevResponse = function() {
              if (settings.timeout && settings.startTime && (((new Date()).getTime() - settings._startTime) > settings.timeout)) {
                //the original query requested a timeout, and we've exceeded that with our attempt.  Call the error method
                jqXHR.status = 408; //408 = Request Timeout
                jqXHR.statusText = 'Request Timeout';
                if (settings.error) {
                  settings.error(jqXHR, 'timeout', jqXHR.statusText);
                } else { //use the original request object
                  //call the original request's error callback
                  jqXHR.error(jqXHR, 'timeout', jqXHR.statusText);
                }
              }
              $.ajax({
                url:webroot+'resources/DELWebInfrastructure/v0/getPreviousResponse',
                type:settings.type, //keep the type of call that we did before
                data: {
                  actionRecover:actionRecover,
                  R:R
                },
                complete:function(jqXHR_prevResp, textStatus ) {
                  if (jqXHR_prevResp.status === 204) { //204 = indicating that the request succeeded but that there was no new information to return.
                    //wait 5 seconds, try again
                    var intRandomTimeOffset = 0;
                    if (Object.keys && _origParams) {
                        //add a variable offset, dependant on the number of slow requests there are
                        intRandomTimeOffset = parseInt(Object.keys(_origParams).length * 1000 * Math.random());
                    }
                    setTimeout(getPrevResponse, 5000 + intRandomTimeOffset);
                    return;
                  } else if (jqXHR_prevResp.status === 200) { //200 = indicating the request succeeded normally.
                    //SUCCESS!
                    var responseData = jqXHR_prevResp.responseText;
                    if (settings.dataType === 'xml') {
                      if (jqXHR_prevResp.responseXML) {
                        responseData = jqXHR_prevResp.responseXML;
                      } else if (jqXHR_prevResp.responseText) {
                        var xmlTemp = parseXML(jqXHR_prevResp.responseText);
                        if (xmlTemp) {
                          responseData = xmlTemp;
                        }
                      }
                    } else if (settings.dataType === 'json') {
                        if (window.JSON && JSON.parse) {
                            var jsonTemp = JSON.parse(jqXHR_prevResp.responseText);
                            if (jsonTemp) {
                              responseData = jsonTemp;
                            }
                        }
                    }
                    if (_origParams[R] && _origParams[R].settings && _origParams[R].settings.success) {
                      _origParams[R].settings.success(responseData,textStatus,jqXHR_prevResp);
                    } else if (settings.success) {
                      settings.success(responseData,textStatus,jqXHR_prevResp);
                    } else if (jqXHR) { //the original request object
                      //call the original request's success callback
                      jqXHR.success(responseData,textStatus,jqXHR_prevResp);
                    }
                  } else { //assume everything else is an ERROR
                    if (_origParams[R] && _origParams[R].settings && _origParams[R].settings.error) {
                      _origParams[R].settings.error(jqXHR_prevResp,textStatus,jqXHR_prevResp.statusText);
                    } else if (settings.error) {
                      settings.error(jqXHR_prevResp,textStatus,jqXHR_prevResp.statusText);
                    } else if (jqXHR) { //the original request object
                      //call the original request's error callback
                      jqXHR.error(jqXHR_prevResp,textStatus,jqXHR_prevResp.statusText);
                    }
                  }
                  delete _origParams[R];
                }
              });
            };
            setTimeout(getPrevResponse, 5000);
          }
        }
  });
});
