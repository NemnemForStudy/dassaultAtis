steal("jquery/controller",
    	'jquery/view/ejs',				      // client side templates
    	'jquery/controller/view',		    // lookup views with the controller's name
      '//../jquery.jsperanto/jquery.jsperanto.js',
      "//../DSCommon/src/search/search.js"//,
//      {
//        src:"//../../plugins/UWA/js/UWA_Swym_Alone_full.js",
//        packaged:false //it's already compressed, and our compressor complains...
//      }

).then(function(){
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
    var can = window.can; //for mkscc compliance, we have to define all our variables...
    var steal = window.steal; //for mkscc compliance, we have to define all our variables...
//$.Controller
can.Control.extend('Ds.CommonTopBar',
/* @Static */
{
	//onDocument: true
},
/* @Prototype */
{
 /**
 * When the page loads, gets all top_bars to be displayed.
 */
  _topBarProxy: null,
  _Compass : null, //will hold the UWA Compass component after it is created
  userID : null,
  _data : null,
  _compassInitialized : false,

  init : function() {
    //steal.dev.log("Ds.CommonTopBar init!");
    var that = this;
    var Ds = window.Ds;
    if(!that.userID) {
      //we may have missed the event.  Try to pull it from the general Persist store.
      if(window.Persist) {
        var generalStore = new window.Persist.Store('general', {about: 'General persistant storage for the application'});
        generalStore.get('UserID',function(ok, val) {
          if(ok && val) {
            that.userID = val;
          }
        });
      }

      if(!that.userID) {
        //poll for it again in half a second
        Ds.CommonTopBar._initTimeout = setTimeout(this.proxy("init"),500);
        return;
      }
    }
    if(Ds.CommonTopBar._initTimeout) {
      clearTimeout(Ds.CommonTopBar._initTimeout);
      Ds.CommonTopBar._initTimeout = null;
      delete Ds.CommonTopBar._initTimeout;
    }

    if(window.TopBarProxy) {
      return; //we are already trying to display it.
    } else if(this._compassInitialized) {
      return; //we are already initializing things.
    }
    this._compassInitialized = true;

    //steal.dev.log("Ds.CommonTopBar init - loading top bar libraries");
    steal(
    "//../../TopFrame/TopFrame.css",
    "//../../TagNavigator/TagNavigator.css",
    "//../../TopBar/TopBar.css",
    "//../../Coachmark/Coachmark.css",
    "//../../UWA2/assets/css/inline.css",
    "//../../plugins/UWA/js/UWA_Swym_Alone_full.js"
    /*
            {
              src:"//../../TopFrame/TopFrame.css",
              packaged:false
            },
            {
              src:"//../../TagNavigator/TagNavigator.css",
              packaged:false
            },
            {
              src:"//../../TopBar/TopBar.css",
              packaged:false
            },
            {
              src:"//../../Coachmark/Coachmark.css",
              packaged:false
            },
            {
              src:"//../../UWA2/assets/css/inline.css",
              packaged:false
            },
            {
              src:"//../../../plugins/UWA/js/UWA_Swym_Alone_full.js",
              packaged:false //it's already compressed, and our compressor complains...
            }*/
    ).then(function() {
        require.config({
                        baseUrl:window.Configuration.webappsDir,
                        paths: {
                            "DS":window.Configuration.webappsDir,
                            "i3DXCompass":window.Configuration.webappsDir+'/i3DXCompass',
                            "SNSearchUX":window.Configuration.webappsDir+'/SNSearchUX',
                            "TopFrame":window.Configuration.webappsDir+'/TopFrame',
                            "TopBar":window.Configuration.webappsDir+'/TopBar',
                            "DS/TopBar/views/TopBarView":window.Configuration.webappsDir+'/TopBar',
                            "TopBarProxy":window.Configuration.webappsDir+'/TopBarProxy',
                            "TagNavigator":window.Configuration.webappsDir+'/TagNavigator',
                            "TagNavigatorProxy":window.Configuration.webappsDir+'/TagNavigatorProxy',
                            "UWA":window.Configuration.webappsDir+"/UWA2/js"
                        }

                      });

        if(!require.toUrl) {
          require.toUrl = function (strURL) {
            //return window.Configuration.webroot+'/webapps/'+strURL.replace("DS/","");
            return window.Configuration.webappsDir+'/'+strURL.replace("DS/","");
          };
        }
        steal(
        window.Configuration.webappsDir+"/UIKIT/UIKIT.js"
        /*{
                src:window.Configuration.webappsDir+"/UIKIT/UIKIT.js",
                packaged:false
              }*/);
        }
    ).then(
      window.Configuration.webroot+"/plugins/Compass/js/Compass.js"
     /* {
              src:window.Configuration.webroot+"/plugins/Compass/js/Compass.js",
              packaged:false
      }*/
    ).then(
      window.Configuration.webappsDir+"/TagNavigator/TagNavigator.js"
     /*  {
                src:window.Configuration.webappsDir+"/TagNavigator/TagNavigator.js",
                packaged:false
      }*/
    ).then(
      window.Configuration.webappsDir+"/TopBarProxy/TopBarProxy.js"
    /*   {
              //src:window.Configuration.webroot+"/plugins/V6frame/script/TopBarProxy-min.js",
              src:window.Configuration.webappsDir+"/TopBarProxy/TopBarProxy.js",
              packaged:false
      }*/
    ).then(
      window.Configuration.webappsDir+"/TopBar/TopBar.js"
    /*   {
              //src:window.Configuration.webroot+"/plugins/V6frame/script/TopBar-min.js",
              src:window.Configuration.webappsDir+"/TopBar/TopBar.js",
              packaged:false
      }*/
    ).then(
      window.Configuration.webappsDir+"/TopFrame/TopFrame.js"
    /*   {
              //src:window.Configuration.webroot+"/plugins/V6frame/script/TopFrame-min.js",
              src:window.Configuration.webappsDir+"/TopFrame/TopFrame.js",
              packaged:false
      }*/
    ).then(function() {

      //steal.dev.log("Ds.CommonTopBar init - top bar libraries loading, creating top frame");
      require(['DS/TopFrame/TopFrame','DS/TopBarProxy/TopBarProxy','DS/TopBar/TopBar'], function (TopFrame,TopBarProxy,TopBar) {
        var options = {
                        userName : that.userID ? that.userID : " ", //init to empty
                        brand : "DELMIA"//,
                        //baseAppletPath : window.Configuration.webroot+"/WebClient/",
                        //baseHtmlPath : window.Configuration.webroot+"/plugins/Compass/html/",
                        //baseImgPath : window.Configuration.webroot+"/plugins/Compass/images/"
                      };


        if(window.Configuration.applicationName) {
          options.application = window.Configuration.applicationName;
          if(options.application.indexOf(options.brand) === 0) {
            //if the application name defined the brand as part of the string, remove it.  It will be added separately in the top bar
            options.application = options.application.substr(options.brand.length); //remove the first part, which is the brand name
          }
          options.application = $.trim(options.application); //trim any whitespace from front and back
        }
        if(window.jQuery && window.jQuery.jsperanto) {
          options.lang = $.jsperanto.lang();
        }
        if(that.userID) {
          options.userId = that.userID;
        }
        //TEMP
        //options.userId = "NWT";

        if(window.Configuration.UWA) {
          if(window.Configuration.UWA.Data && window.Configuration.UWA.Data.proxies && window.Configuration.UWA.Data.proxies.passport) {
            options.passportUrl = window.Configuration.UWA.Data.proxies.passport;
            if(window.UWA && window.UWA.Data && window.UWA.Data.proxies) {
              UWA.Data.proxies.passport = options.passportUrl;
            }
          }
        }
        if(window.Configuration.Compass) {
          if(window.Configuration.Compass.proxyTicketUrl) {
            options.proxyTicketUrl = window.Configuration.Compass.proxyTicketUrl;
          }
          if(window.Configuration.Compass.myAppsBaseURL) {
            options.myAppsBaseURL = window.Configuration.Compass.myAppsBaseURL;
          }
        }
        if(window.Configuration.TagNavigator) {
          if(window.Configuration.TagNavigator.tagsServicesURL) {
            options.tagsServicesURL = window.Configuration.TagNavigator.tagsServicesURL;
          }
        }

        if(!options.events) {
          options.events = {};
        }
        options.events.search = function(objSearch) {
          //steal.dev.log("top_bar.js - run search!");
          that.element.find(".global_ctn_search").ds_common_search("runsearch",((objSearch && objSearch.value) ? objSearch.value : null));
        };
        options.events.clearSearch = function(objSearch) {
          //steal.dev.log("top_bar.js - run search!");
          that.element.find(".global_ctn_search").ds_common_search("clearsearch");
        };

        try {
          TopFrame.init(options);
        } catch(err) {
          steal.dev.log(that.constructor.shortName+"::init - TopFrame.init threw an error: "+err.message);
        }

        that.element.find(".global_ctn_search").ds_common_search();
        //that.element.find("#compass_ctn").ds_common_compass();

        var onCB = function (command) {steal.dev.log('Command callback received on ' + command + ' of Provider default');};
        that._topBarProxy = new TopBarProxy({'id': 'default'});
        that._topBarProxy.setContent({
                  profile: [
                      {label: $.t('My Profile'), onExecute: function(command) {
                                                          if ( window.OpenAjax ) {
                                                            OpenAjax.hub.publish("Menu.profile.my_profile",{menuCommand:command});
                                                          }

  //                                                        window.open(window.Configuration.webroot+'/components/emxComponentsEditPeopleDialogFS.jsp?suiteKey=Components&contextusereditprofile=true&objectId='); //need to get the user's objectId somehow.. ex: 27264.22920.40624.59151
                                                        }
                      },
                      {label: $.t('Preferences'), onExecute: function(command) {
                                                          if ( window.OpenAjax ) {
                                                            OpenAjax.hub.publish("Menu.profile.preferences",{menuCommand:command});
                                                          }
                                                        }
                      },
                      {label: $.t('Change Password...'), onExecute: function(command) {
                                                          if ( window.OpenAjax ) {
                                                            OpenAjax.hub.publish("Menu.profile.change_password",{menuCommand:command});
                                                          }
                                                        }
                      },
                      {label: $.t('Sign Out'), onExecute: function(command) {
                                                          if ( window.OpenAjax ) {
                                                            OpenAjax.hub.publish("logout",{menuCommand:command});
                                                          }
                                                        }
                      }
                  ],
                  add: [
  //                    {label: 'Widget', onExecute: function () { that.addWidget(); }},
  //                    {label: 'Tab', onExecute: onCB},
  //                    {label: 'Dashboard', onExecute: onCB}
                  ],
                  share: [
  //                    {label: 'Share Tab', onExecute: onCB},
  //                    {label: 'Share Dashboard', onExecute: onCB}
                  ],
                  home: [
                  ],
                  help: [
  //                    {label: 'Get Started', onExecute: onCB},
                      {label: $.t('Support Community'), onExecute: function(command) {
                                                          if ( window.OpenAjax ) {
                                                            OpenAjax.hub.publish("Menu.help.support_community",{menuCommand:command});
                                                          }
                                                        }
                      },
                      {label: $.t('About 3DEXPERIENCE Platform...'), onExecute: function(command) {
                                                          if ( window.OpenAjax ) {
                                                            OpenAjax.hub.publish("Menu.help.about_3dexperience_platform",{menuCommand:command});
                                                          }
                                                        }
                      }
                  ]
              });

        TopBar.MainMenuBar.setActiveMenuProviders(['default']);
        //that.collection.add({providerId: 'default', active: true});

        that.element.find(".user-name").text(that.userID);

        if ( window.OpenAjax ) {
          OpenAjax.hub.publish(that.constructor.fullName + ".init",{});
        }
      });
    });
  },

  /**
  Adding commands through declaration,if a menu was set for this provider before, it will add commands to the already existing menu. You can see these commands in TopBar, when Frame activates the command provider Id.
  @method addContent
  @param {object} content this is a json object that holds the menu
    @param {array} [content.profile], or .add, or .share, or .home, or .help
    @param {object} [content.profile.label] what we be shown to end use, should be internationalized
    @param {object} [content.profile.onExecute] define the callback to be called on when executing the command
    @param {object} [content.profile.submenu] an instance of Menu, containing some MenuItem.
  **/
  addMenuBarContent : function(obj) {
    if(!obj) {
      steal.dev.log(this.constructor.shortName+"::addMenuBarContent - empty input object!");
      return;
    } else if(!this._topBarProxy) {
      steal.dev.log(this.constructor.shortName+"::addMenuBarContent - this._topBarProxy!");
      return;
    } else if(!$.isPlainObject(obj)) {
      steal.dev.log(this.constructor.shortName+"::addMenuBarContent - input object is not a valid object!");
      return;
    }

    this._topBarProxy.addContent(obj);
  },

	"Ds.Auth.updated subscribe" : function(called, objData) {
	  //steal.dev.log("Ds.CommonTopBar: Ds.Auth.updated");
	  if(objData && objData.user) {
  	  this.userID = objData.user;
  	  this._data = objData;
  	  this.init();
	    this.element.find(".user-name").text(objData.full_name ? objData.full_name : objData.user);
	  }
	},

	"Menu.help.support_community subscribe" : function(called, objData) {
	  var url = "http://www.3ds.com/support/users-communities/";
	  if(window.Configuration && window.Configuration.supportCommunityURL) {
	    url = window.Configuration.supportCommunityURL;
	  }
	  var name = "Menu.help.support_community.dlg";
	  var winSupportCommunity = window.open(url,name);
  },

	"Menu.help.about_3dexperience_platform subscribe" : function(called, objData) {
	  var url = window.Configuration.webroot+"/common/emx3DExperiencePlatformAbout.jsp?suiteKey=Framework&StringResourceFileId=emxFrameworkStringResource&SuiteDirectory=common&targetLocation=popup";
	  var name = "Menu.help.about_3dexperience_platform.dlg";
	  var objDim = { width: 530, height: 325};

	  //open an empty window that the form will be posted to.
	  var winAbout = window.open(url,name,"toolbar=no,status=no,menubar=no,fullscreen=no,width="+objDim.width+",height="+objDim.height);
	  $(winAbout).focus(); //bring it to the front
  },

	"Menu.profile.my_profile subscribe" : function(called, objData) {
	  var that = this;
    if(!this.userID) {
      alert($.t("Please Log In First"));
      return;
    } else if(!this._data || !this._data.person_object_id) {
      steal.dev.log(this.constructor.shortName+' '+called+" - unable to locate the user's Business Object ID!");
      alert($.t("Invalid User ID"));
      return;
    }

	  this.loadEnoviaFrame();

	  var url = window.Configuration.webroot+"/components/emxComponentsEditPeopleDialogFS.jsp";
	  var name = "Menu.profile.my_profile.dlg";
	  var objDim = { width: ($(window.document).width()/2), height: ($(window.document).height()/2)};

	  //open an empty window that the form will be posted to.
	  var winPref = window.open("",name,"toolbar=no,status=no,menubar=no,fullscreen=no,width="+objDim.width+",height="+objDim.height);
	  $(winPref).focus(); //bring it to the front

	  //we need to create a temporary form and post the data to it.
    this.element.find("form#frmProfile_"+that.constructor.shortName).remove();
	  var $tmpProfileForm = $("<form></form>").attr({
	                                                  target : name,
	                                                  method : "POST", // or "post" if appropriate
	                                                  action : url,
	                                                  id: "frmProfile_"+that.constructor.shortName
	                                                })
	                          .append($("<input />").attr({
	                                                        type : "text",
	                                                        name : "contextusereditprofile",
	                                                        value : true
	                                                      })
	                          ).append($("<input />").attr({
	                                                        type : "text",
	                                                        name : "suiteKey",
	                                                        value : "Components"
	                                                      })
	                          ).append($("<input />").attr({
	                                                        type : "text",
	                                                        name : "objectId",
	                                                        value : that._data.person_object_id
	                                                      })
	                          ).hide()
	                          .appendTo(this.element)
	                          .submit();

    //remove the form when we don't need it any longer.
    $(winPref).ready(function() {
      that.element.find("form#frmProfile_"+that.constructor.shortName).remove();
    }).unload(function() {
      that.element.find("form#frmProfile_"+that.constructor.shortName).remove();
    });
	},

	"Menu.profile.preferences subscribe" : function(called, objData) {
    if(!this.userID) {
      alert($.t("Please Log In First"));
      return;
    }

	  this.loadEnoviaFrame();

	  var url = window.Configuration.webroot+"/common/emxPreferences.jsp?suiteKey=Framework&StringResourceFileId=emxFrameworkStringResource&SuiteDirectory=common&targetLocation=popup";
	  var name = "Menu.profile.preferences.dlg";
	  var objDim = { width: ($(window.document).width()/2), height: ($(window.document).height()/2)};
	  var winPref = window.open(url,name,"toolbar=no,status=no,menubar=no,fullscreen=no,width="+objDim.width+",height="+objDim.height);
	  $(winPref).focus(); //bring it to the front
	},

	"Menu.profile.change_password subscribe" : function(called, objData) {
    if(!this.userID) {
      alert($.t("Please Log In First"));
      return;
    }

	  this.loadEnoviaFrame();

	  var url = window.Configuration.webroot+"/common/emxChangePassword.jsp?HelpMarker=emxhelppasswordchange&suiteKey=Framework&StringResourceFileId=emxFrameworkStringResource&SuiteDirectory=common&targetLocation=popup";
	  var name = "Menu.profile.change_password.dlg";
	  var objDim = { width: ($(window.document).width()/2), height: ($(window.document).height()/2)};
	  var winPref = window.open(url,name,"toolbar=no,status=no,menubar=no,fullscreen=no,width="+objDim.width+",height="+objDim.height);
	  $(winPref).focus(); //bring it to the front

	},

	loadEnoviaFrame : function() {
	  //enovia dialogs talk back to the opening enovia window, which we don't have open.
	  //  Therefore, create a hidden frame with the Enovia frame, and point our getTopWindow function to it.
	  if($("iframe#enoviaFrame").size() <= 0) {
	    $("<iframe></iframe>").css("display","none")
	                          .appendTo($("body"))
	                          .attr({
	                                  id : "enoviaFrame",
	                                  src: window.Configuration.webroot
	                               });
	  }

    if(!window.getTopWindow) {
  	  window.getTopWindow = function() {
    	  if($("iframe#enoviaFrame").size() <= 0) {
    	    return null;
    	  }
  	    return $("iframe#enoviaFrame").get(0); //return the first element
  	  };
  	}
	}
});
});
