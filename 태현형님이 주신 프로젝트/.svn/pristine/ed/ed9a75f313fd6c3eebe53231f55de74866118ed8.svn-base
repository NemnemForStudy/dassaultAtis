steal("jquery/controller",
      "./compass.css",
      window.Configuration.webroot+"/plugins/UWA/js/UWA_Swym_Alone_full.js",
      //window.Configuration.webroot+"/plugins/Compass/js/Compass.js"
      "http://uwa.dsifweadm.3ds.com/lib/UWA/assets/css/base/controls/accordion.css",
      window.Configuration.webroot+"/plugins/Compass/css/ds.Compass.css"
).then(function(){
//$.Controller
can.Control.extend('Ds.CommonCompass',
/* @Static */
{
	//onDocument: true,
},
/* @Prototype */
{
  _Compass : null, //will hold the UWA Compass component after it is created

//	init : function(){
//	  //this.createCompass();
//	  //just create a dummy for now until we get the auth event
//	  this.element.html($('<div class="compass-ct" id="dscompass" style="background-image: url(&quot;/ematrix/plugins/Compass/images/Top_Bar_Layer_Top_Rounded_part.png&quot;);"><div class="compass compass-small" id="dscompass-small" style="background-image: url(&quot;/ematrix/plugins/Compass/images/compass.png&quot;); display: block;"></div></div>'));
//	},

	"Ds.Auth.updated subscribe" : function(called, objData) {
	  if(objData && objData.user) {
  	  this.userID = objData.user;
  	  this.createCompass();
  	}
	},

	createCompass : function() {
	  var that = this;
	  //steal.dev.log("Ds.CommonCompass init!");

	  //most of this was grabbed from window.Configuration.webroot+"/plugins/Compass/js/initCompass.js"

    // Provide the URL to the passport proxy
    //UWA.Data.proxies.passport = 'http://<my_domain>/my_proxy';
    if(window.Configuration.UWA && window.Configuration.UWA.Data && window.Configuration.UWA.Data.proxies && window.Configuration.UWA.Data.proxies.passport) {
      UWA.Data.proxies.passport = window.Configuration.UWA.Data.proxies.passport;
    }

    require({baseUrl: window.Configuration.webroot+'/plugins/Compass/js/'}, ['Compass'], function (Compass) {
        var myAppsBaseURL = window.Configuration.webroot;
        if(window.Configuration.Compass && window.Configuration.Compass.myAppsBaseURL) {
          myAppsBaseURL = window.Configuration.Compass.myAppsBaseURL;
        }

        var objCompassParams = {
                    compassTarget : that.element.attr("id"), //"dsdemo",
                    appsTarget : "my-apps-ct",
                    closable : true,
                    //dynamic: true,
                    play : function () {
                        alert('Play 3D experience !');
                    },
                    //Base Image Path
                    baseImgPath: window.Configuration.webroot+'/plugins/Compass/images/',
                    baseHtmlPath: window.Configuration.webroot+"/plugins/Compass/html/",
                    baseAppletPath : window.Configuration.webroot+"/WebClient/",
                    //Base URL for My Apps
                    myAppsBaseURL: myAppsBaseURL, //'http://vdevpril730dsy.dsy.ds:8090/ematrix',
                    //myAppsBaseURL: 'http://vdevpril512dsy.dsy.ds:8090/enovia',
                    launchOnSameDomain : function (url) {
                        alert(url);
                        return true;
                    }
                };
        if(that.userID) {
          objCompassParams.dynamic = true; //pulls the data from the server
          objCompassParams.userId = that.userID;
        }
        if(window.Configuration.Compass && window.Configuration.Compass.passportUrl) {
          objCompassParams.passportUrl = window.Configuration.Compass.passportUrl;
        }
        if(window.Configuration.Compass && window.Configuration.Compass.proxyTicketUrl) {
          objCompassParams.proxyTicketUrl = window.Configuration.Compass.proxyTicketUrl;
        }
        if(window.jQuery && window.jQuery.jsperanto) {
          objCompassParams.lang = $.jsperanto.lang();
        }

        that.element.empty();
        Compass.initialize(objCompassParams);
        that._Compass = Compass;
    });
//    require(['UWA/Core', 'UWA/Utils/InterCom'], function (UWA, InterCom) {
//        //var eventInfo = UWA.extendElement(document).getElement('#taginput');
//        var compassEventSocket = new InterCom.Socket('compassEventSocket');
//        compassEventSocket.subscribeServer('com.ds.compass', window);
////        compassEventSocket.addListener('compassOnInit', function (json, inf) {
////            //eventInfo.setAttributes({'value': 'compassOnInit'});
////        });
////        compassEventSocket.addListener('compassEvent', function (json, inf) {
////            //eventInfo.setAttributes({'value': 'compassEvent ' + json.quadrant});
////        });
//        compassEventSocket.addListener('compassPanelOnShow', function (json, inf) {
//            UWA.extendElement(document).getElement('#container').setStyle('display', 'block');
//            //eventInfo.setAttributes({'value': 'compassPanelOnShow'});
//        });
//        compassEventSocket.addListener('compassPanelOnHide', function (json, inf) {
//            UWA.extendElement(document).getElement('#container').setStyle('display', 'none');
//            //eventInfo.setAttributes({'value': 'compassPanelOnHide'});
//        });
//    });

    if ( window.OpenAjax ) {
      OpenAjax.hub.publish(this.constructor.fullName + ".init",{});
    }
  }

});
});
