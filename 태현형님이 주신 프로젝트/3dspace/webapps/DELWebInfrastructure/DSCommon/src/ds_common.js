if (window.define) { define('DS/DELWebInfrastructure/DSCommon/src/ds_common.js'); }
window.ignoreRequire = true; //set this to force jqueryUI to load normally, even if requireJS is defined somewhere
if(window.console) { window.console.log("processing ds_common.js"); }
window.dsCommonWatchdog = setTimeout(function() {
    'use strict';
    window.location.reload();
},10000);
steal('can',
    "jquery/controller",            // a widget factory
    'jquery/controller/subscribe',  // subscribe to OpenAjax.hub
    'jquery/view/ejs',                    // client side templates
    'jquery/controller/view',           // lookup views with the controller's name
    'jquery/model',                         // Ajax wrappers
    function() {
        'use strict';
        if(window.console) window.console.log("ds_common.js - initial load complete");
        if(window.dsCommonWatchdog) {
          clearTimeout(window.dsCommonWatchdog);
          delete window.dsCommonWatchdog;
        }
        var aTag = null;
        if(window.widget && window.widget.environment && (window.widget.environment.name != 'uwa') && window.widget.getUrl) {
          //live widget
          aTag = $("<a>",{href:window.widget.getUrl()}).get(0);
        } else {
          aTag = $("<a>",{href:window.location.href}).get(0);
        }
        if(aTag && window.Configuration && window.Configuration.webroot && (window.Configuration.webroot[0] == "/")) {
          if(aTag.pathname && (aTag.pathname.indexOf(window.Configuration.webroot) != 0)) {
            //we have an invalid path to start with!  use the first part of our path...
            if(window.Configuration.webapp && (aTag.pathname.indexOf(window.Configuration.webapp) === 1)) {
                //we are at the root directory, whis might mean we are in an ODT.  just use a simple "/"
                window.Configuration.webroot = '/.';
            } else {
                //get the slash AFTER the first slash, which should indicate the
                var nextSlashPos = aTag.pathname.indexOf("/",1); //start looking at index 1
                if(nextSlashPos < 0) { //not found...
                  window.Configuration.webroot = aTag.pathname;
                } else {
                  window.Configuration.webroot = aTag.pathname.substring(0,nextSlashPos);
                }
            }
            steal.dev.log("in ds_common.js: [34] window.Configuration.webroot = "+window.Configuration.webroot);
          }

          var origin = aTag.origin || "";
          if(!origin) { //not all browsers support the origin on an anchor tag...
            if(aTag.protocol && aTag.hostname) {
                origin = aTag.protocol + "//" + aTag.hostname;
                if(aTag.port) {
                  origin += ":"+aTag.port;
                }
            } else if(steal.isRhino) {
                //we are trying to generate the production build.  Just set it to the localhost
                origin = "http://127.0.0.1";
            }
          }

          if(window.Configuration.webroot[0] !== "/"){
        	  window.Configuration.webroot = "/" + window.Configuration.webroot;
          }

          if((window.Configuration.webroot === "/.") || (window.Configuration.webroot === "/"+window.Configuration.webapp)) {
                window.Configuration.webappsDir = origin;
          } else {
                window.Configuration.webappsDir = origin + window.Configuration.webroot + "/webapps";
          }
          window.Configuration.webroot = origin + window.Configuration.webroot; //get the protocol/hostname/port from our original server
          //steal.dev.log("in ds_common.js: [45] window.Configuration.webroot = "+window.Configuration.webroot);
        }
    }
).then(
      "//../jquery.uwa.proxy.js", //have jQuery's ajax calls use the UWA proxies (if any)
      "//../jquery.uwa.securityContext.js" //have jQuery's ajax calls use the UWA proxies (if any)
).then('//../jquery.jsperanto/jquery.jsperanto.js', //translation
      '//../persist-js/persist.js', //persistent client side storage abstraction
      //"//../../UIKIT/5.Fonts.css", //for the font definitions.  Only available in BSFdebug
      //"//../DSCommon/src/views/Fonts.css",
      '//../modernizr/modernizr.js',
      '//../jQueryUI/js/jquery-ui-1.11.2.js',
//      '//../jquery.pnotify/pnotify.custom.js', //override the alert box
      '//../jQueryUI/css/3dexp/jquery-ui-1.11.0.custom.css',
      '//../DSCommon/src/ds_common.css',
//      '//../jquery.pnotify/pnotify.custom.min.css',
//      '//../jquery.pnotify/jquery.pnotify.ds.css',
      '//../DSCommon/src/jsmvcFindController.js'
).then(
      '//../DSCommon/src/alert/alert.js',
      '//../DSCommon/src/search/controllers/search_standalone_controller.js',
      '//../DSCommon/src/search/controllers/search_widget_controller.js',
      '//../DSCommon/src/top_bar/top_bar.js',
      '//../DSCommon/src/ds_getUrlVars.js'
).then(function(){
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
    var can = window.can; //for mkscc compliance, we have to define all our variables...
    var steal = window.steal; //for mkscc compliance, we have to define all our variables...

/**
 * @class Ds.Common
 */
//$.Controller
can.Control('Ds.Common',
/* @Static */
{
    //See https://dsxdev-online.dsone.3ds.com/doconline/English/CAAW3DXComp/CAAW3DXTaWidgetNLS.htm
    initDsTranslate: function() {
        if (window.require && window.Configuration.webapp) {
            //include the app specific translation file
            require({
                baseUrl: window.Configuration.webappsDir //set in ds_common.js
            },['i18n!DS/'+window.Configuration.webapp+'/assets/nls/'+window.Configuration.webapp], function (NLS) {
                if ($.jsperanto && $.jsperanto.addObjectToDictionary) {
                    $.jsperanto.addObjectToDictionary(NLS);
                }
            });
        }
    }
},
/* @Prototype */
{
  language : false,
  _3DSPACEURL: null,
//  pnotify_stack_context:{},

    init : function(){
      var that = this;
        if(!$.jsperanto || !$.jsperanto.translate ||
           !$.ui || //jQueryUI should be loaded by now!
//           !window.PNotify || //we need PNotify to override the alert box
            (window.widget && window.widget.environment &&
              (!this.element.ds_common_search_standalone || !$.isFunction(this.element.ds_common_search_standalone) ||
               !this.element.ds_common_search_widget || !$.isFunction(this.element.ds_common_search_widget))
            )
          )
        {
          //in production mode, this code seems to have a problem with the order that the code is actually loaded.  So we'll wait a small amount until everything is loaded
          setTimeout(that.proxy("init"), 50);
          steal.dev.log("ds_common.js re-calling init....");
          return false;
        }

        if (window.require && !that._i3DXCompassPlatformServices) {
            //load this to correctly get the service URLs
            require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(i3DXCompassPlatformServices) {
                that._i3DXCompassPlatformServices = i3DXCompassPlatformServices;

                if (window.Configuration.webroot && (window.widget.standalone || (window.widget.environment.name === 'uwa'))) {
                    //set a timeout in case we aren't even authenticated on the dashboard yet in standalone mode
                    that._i3DXCompassPlatformServices_timeout = setTimeout(function() {
                        delete that._i3DXCompassPlatformServices_timeout;
                        that._3DSPACEURL = window.Configuration.webroot;
                        that.init();
                    }, 5000); //5 seconds
                }

                var platformId = null;
                if (!platformId && window.widget.data) {
                    platformId = widget.data.x3dPlatformId;
                }
                that._i3DXCompassPlatformServices.getServiceUrl({
                    platformId: platformId, //it's OK if it is null, it will just return all
                    serviceName: '3DSpace', //ex: '3DSearch',
                    //config: window.COMPASS_CONFIG,
                    onComplete: function(data) {
                        var strURL = null;
                        if (data && data.length) {
                            if (data.length === 1) {
                                strURL = data[0].url;
                            } else {
                                //they are for all platforms.  return them ALL
                                strURL = data;
                            }
                        }

                        if (that._i3DXCompassPlatformServices_timeout) {
                            clearTimeout(that._i3DXCompassPlatformServices_timeout);
                            delete that._i3DXCompassPlatformServices_timeout
                        }

                        that._3DSPACEURL = strURL;
                        that.init();
                    },
                    onFailure: function(err) {
                        steal.dev.log(err);
                        if (!that._3DSPACEURL && window.Configuration.webroot) {
                            that._3DSPACEURL = window.Configuration.webroot;
                        }
                        if (that._i3DXCompassPlatformServices_timeout) {
                            clearTimeout(that._i3DXCompassPlatformServices_timeout);
                            delete that._i3DXCompassPlatformServices_timeout
                        }

                        that.init();
                    }
                });
            });
            return false;
        }

      if(window.Configuration && window.Configuration.webroot && (window.Configuration.webroot[0] == "/")) {
          var aTag = null;
            if(window.widget && window.widget.getUrl) {
            //live widget
            aTag = $("<a>",{href:window.widget.getUrl()}).get(0);
          } else {
            aTag = $("<a>",{href:window.location.href}).get(0);
          }

          if(aTag && aTag.pathname && (aTag.pathname.indexOf(window.Configuration.webroot) != 0)) {
            //we have an invalid path to start with!  use the first part of our path...
            var nextSlashPos = aTag.pathname.indexOf("/",1); //start looking at index 1
            if(nextSlashPos < 0) { //not found...
              window.Configuration.webroot = aTag.pathname;
            } else {
              window.Configuration.webroot = aTag.pathname.substring(0,nextSlashPos);
            }
          }

          var origin = aTag.origin;
          if(!origin) { //not all browsers support the origin on an anchor tag...
            origin = aTag.protocol + "//" + aTag.hostname;
            if(aTag.port) {
              origin += ":"+aTag.port;
            }
          }

          if(window.Configuration.webroot[0] !== "/"){
              window.Configuration.webroot = "/" + window.Configuration.webroot;
          }

          window.Configuration.webroot = origin + window.Configuration.webroot; //get the protocol/hostname/port from our original server
      }
      if(window.Configuration && window.Ds && window.Ds.getUrlVars) {
            //set whether or not we are using fixtures before calling initLanguage so that the correct fixture URL is used
            var urlVars = window.Ds.getUrlVars();
            if(urlVars) {
                if(urlVars.useFixtures) {
                    window.Configuration.useFixtures = true;
                    if(!isNaN(urlVars.useFixtures) && (urlVars.useFixtures > 200)) {
                        window.Configuration.fixtureDelay = parseInt(urlVars.useFixtures,10);
                    }
                }
            }
      }

      //steal.dev.log("Ds.Common init!");
      this.initLanguage(this.language);

        if((window.top == window) && (!window.widget || !window.widget.body || !('launched' in window.widget))) {
          this.display();
        } else {
          if(window.widget && /* ($('.input_search').size() <= 0) && */ ('setMenu' in window.widget)) {
            window.widget.standalone = (window.widget.environment.name == 'uwa');

            if(window.widget.standalone) {
              /////////////////// Maximize Window
              widget.setMenu({
                name: 'options/MaximizeWidget',
                icon: 'arrow-up',
                jQueryIcon: 'arrow-4-diag',
                label: ($.t ? $.t("Maximize") : "Maximize"),
                onExecute: 'MaximizeWidget'
              });
              widget.addEvent('MaximizeWidget',function() {
                $(widget.elements.wrapper).css({width:'auto',height:'auto',top:0,bottom:0,left:0,right:0}).trigger("resize");
              });

              //we need to add a search bar so we can do our work!
              this.element.ds_common_search_standalone();
            } else {
              //live widget, not standalone!
              this.element.ds_common_search_widget();
            }
          }
        }

        $(window).bind('resize',this.proxy('windowResized'));
        $(window).bind('orientationchange',this.proxy('windowResized'));
        this.windowResized();

    	$(window).ds_alert();

    },

    initLanguage: function(myLang) {
      var that = this;
      //if we are in developer/debug mode, then tell the server to record translations
      if((steal.config().env == "development" ) && !steal.isRhino) {
        //tell the server to record any new translation strings
        if(window.Foe && window.Foe.Model && window.Foe.Model.Session && window.Foe.Model.Session.setGlobalParameters) {
            window.Foe.Model.Session.setGlobalParameters({GEN_PROPERTY_FILE:1});
        } else if(!window.Configuration.useFixtures) {
            //at least post to the webservice
            var webroot = that._3DSPACEURL || window.Configuration.webroot;
            var strGlobalParamsUrl = webroot + '/resources/DELWebInfrastructureTST/GlobalOptions/set';
            $.post(strGlobalParamsUrl, {GEN_PROPERTY_FILE:1});
        }
      }

      if(!myLang && window.widget && window.widget.lang) {  //UWA dashboard will set this when the widget is launched.
        myLang = window.widget.lang;
      }

      if(!myLang) {
        myLang = $.jsperanto.lang();
      }
      if(!myLang) {
        var generalStore = new Persist.Store('general', {about: 'General persistant storage for the application'});

        //check for the Culture/locale returned by the server during login
        generalStore.get('Culture',function(ok, val) {
          if(ok && val && val.length) {
            myLang = val;
            if(myLang.indexOf(";") > 0) {
              //ex: "en-US,en;q=0.5"
              var langParts = myLang.split(";");
              myLang = langParts[0];
            }
            if(myLang.indexOf(",") > 0) {
              //ex: "en-US,en"
              var langParts = myLang.split(",");
              myLang = langParts[0];
            }
          }
        });
      }
      if(!myLang) {
        myLang = $.jsperanto.detectLanguage();
      }
        //myLang="fr"; //TEMP

      if(!myLang || (myLang.toLowerCase() == 'en') || (myLang.toLowerCase() == 'en-us')) {
        myLang = 'en-US';
      }
      if(myLang && (myLang.toLowerCase() != 'en') && (myLang.toLowerCase() != 'en-us') && (myLang != '__template__')) {
        if(myLang.indexOf('-') > 0) {
          var partsArr = myLang.split('-');
          myLang = partsArr[0].toLowerCase() + '-' + partsArr[1].toUpperCase();
        } else {
          myLang = myLang.toLowerCase(); //make sure that it is lower case
        }
      }

        //steal.dev.log("steal.browser.rhino = " + steal.browser.rhino);
        //steal.dev.log("steal.options.env = " + steal.options.env);

      var jsperantoOptions = {  lang: myLang,
                                fallbackLang : "en",
                                interpolationPrefix : "{", //beginning of variable substitution, to match java .property files
                                interpolationSuffix : "}" //end of variable substitution, to match java .property files
//                                dicoPath:"<?= $GLOBALS['registry']->get('webroot','ahciv') ?><?= $jsonDirName ?>",
//                                fallbackDicoPath:"<?= $GLOBALS['registry']->get('webroot','ahciv') ?><?= $jsonFallbackDirName ?>",
//                                fallbackDicoScript:"<?= $GLOBALS['registry']->get('webroot','ahciv') ?>/locale/getTranslateJSON.php",
//                                fallbackTranslateScript:"<?= $GLOBALS['registry']->get('webroot','ahciv') ?>/locale/getTranslateStringJSON.php"
                             };
      if(window.Configuration.translation) {
//        if(window.Configuration.useFixtures && window.Configuration.webapp) {
//            //just set the URL to the fixture en-US.json file
//            window.Configuration.translation.dicoPath = window.Configuration.webapp+"/fixtures";
//        }

        var webroot = that._3DSPACEURL || window.Configuration.webroot;

        $.each(["dicoPath","fallbackDicoPath","fallbackDicoScript","fallbackTranslateScript"],function(idx,pathName) {
          //update all the translation paths relative to the webroot path
          if(window.Configuration.translation[pathName] && (window.Configuration.translation[pathName].indexOf("http") !== 0) && (window.Configuration.translation[pathName].indexOf("/") !== 0)) {
            window.Configuration.translation[pathName] = webroot + "/" + window.Configuration.translation[pathName];
          }
        });

        jsperantoOptions = $.extend(false,jsperantoOptions,window.Configuration.translation);
      }

//      if ((steal.browser && steal.browser.rhino)) { // || (steal.options.env != "production" )) {
//        $.jsperanto.init(function(t){},{ lang:myLang, dicoPath:'../locales' });
//      } else {
//        $.jsperanto.init(function(t){},{ lang:myLang });
//      }

      // GJA: Added check for production build
      if (steal.isRhino) {
        $.jsperanto.init(function(t){
                                        Ds.Common.initDsTranslate(); //in static methods in this file
                                        if(window.initTranslate) {
                                            window.initTranslate(t);
                                        }
                                    },{ lang:myLang, dicoPath:'../fixtures' });
      } else if(window.Configuration && window.Configuration.useFixtures) {
        //fixtures are corrected above...
        //$.jsperanto.init(function(t){},{ lang:myLang, dicoPath:'fixtures' });
      } else {
//        if(myLang != $.jsperanto.lang()) {
          $.jsperanto.init(function(t){
                                        Ds.Common.initDsTranslate(); //in static methods in this file
                                        if(window.initTranslate) {
                                            window.initTranslate(t);
                                        }
                                      },jsperantoOptions);
//        }
      }
//    });

    },

  windowResized: function()
  {
    var winHeight = $(window).height();
    if(winHeight < $("#top-banner").height()) {
      winHeight = $(window.document).height();
    }
    $("#ds_common_main").height(winHeight);
    //$("#ds_common_main").height($(window.document).height());
  },

  display: function() {
    if($.t) {
      if(this.element.ds_common_top_bar) {
        if(!window.widget || !("launched" in window.widget)) {
          //only add the top bar to a non-widget
          this.element.addClass("pagebody"); //so compass parts display correctly per the css file tn_poc.css
          this.element.ds_common_top_bar();
        }
      } else {
          setTimeout(this.proxy("display"),50);
      }
    } else {
      setTimeout(this.proxy("display"),50);
    }
  },

//  "Ds.CommonTopBar.init subscribe":function(called, iOpts) {
//    if(this.element.children(".app-content").size() > 0) { //note that the app_content may not be rendered yet.  We are checking it again below in the Ds.CommonTopBar.init subscribe
//      this.pnotify_stack_context.context = this.element.children(".app-content");
//    }
//  },

    "Ds.Auth.updated subscribe" : function(called, objData) {
      //steal.dev.log("Ds.CommonTopBar: Ds.Auth.updated");
      if(objData && objData.language) {
        this.language = objData.language;
        if(this.language.indexOf(";") > 0) {
          //ex: "en-US,en;q=0.5"
          var langParts = this.language.split(";");
          this.language = langParts[0];
        }
        if(this.language.indexOf(",") > 0) {
          //ex: "en-US,en"
          var langParts = this.language.split(",");
          this.language = langParts[0];
        }
        this.initLanguage(this.language);
      }
    }
//  "Ds.CommonTopBar.init subscribe":function(called, iOpts) {
//    //make sure that the area used for the main app is correct.
//      //$("#appMain").css({
//      $(".app-content").css({
//                          height:"auto",
//                          //top:$("#top-banner #top").height(),
//                          top:0,
//                          bottom:0
//                        });
//  }

});
if(!window.widget || !window.widget.body || !("launched" in window.widget)) {
  $("<div></div>").appendTo("body").addClass("app-content").ds_common();
} else {
  $(window.widget.body).ds_common();
}

});

window.niy = function ( iFunctionName ) {
    "use strict";
    if (iFunctionName != undefined && iFunctionName != "") {
        alert(iFunctionName + " is not implemented yet ");
    } else {
        alert("not implemented yet ");
    }
}

//window.jsmvcFindController = function(el, contructorFuncion) {
//  var control = null;
//  if(el && $(el).data) {
//    var controls = $(el).data("controls");
//    if (controls && controls.length) {
//      for (var i=0; i < controls.length; i++) {
//          var ctrl = controls[i];
//          if (ctrl && ctrl.constructor && ctrl.constructor == contructorFuncion) {
//            control = ctrl;
//            break;
//          }
//      }
//    }
//  }
//  return control;
//}
