/**
 * ESignAuthenticationMediator Component - handling interaction between components for smooth async events
 *
 */
define('DS/ENXESignMgmt/Components/ESignAuthenticationMediator',
['DS/Core/ModelEvents'],
function(ModelEvents) {

    'use strict';
    var _eventBroker = null;
    var ESignAuthenticationMediator = function () {
        // Private variables
        _eventBroker= new ModelEvents();
    };

    /**
     * publish a topic on given channels in param, additional data may go along with the topic published
     * @param  {[type]} eventTopic [description]
     * @param  {[type]} data       [description]
     *
     */
    ESignAuthenticationMediator.prototype.publish = function (eventTopic, data) {
          _eventBroker.publish({ event: eventTopic, data: data }); // publish from ModelEvent
    };

    /**
    *
    * Subscribe to a topic
    * @param {string} eventTopic the topic to subcribe to
    * @param {function} listener the function to be called when the event fires
    * @return {ModelEventsToken}             a token to use when you want to unsubscribe
    */
    ESignAuthenticationMediator.prototype.subscribe = function (eventTopic, listener) {
        return _eventBroker.subscribe({ event: eventTopic }, listener);

    };
    
    /**
     * Subscribe to an event once with eventually
     *
     *
     * @param  {Object} settings  options hash or a option/value pair.
     * @param  {Event} settings.event  Event to subscribe.
     * @param  {Function} callback  Function to call after event reception.
     *
     * @return {undefined}
     *
     */
    ESignAuthenticationMediator.prototype.subscribeOnce = function(eventTopic, listener) {
    	return _eventBroker.subscribeOnce({ event: eventTopic }, listener);
    };

    /**
     * Unsubscribe to a topic
     * @param  {[type]} token [description]
     *
     */
    ESignAuthenticationMediator.prototype.unsubscribe = function (token) {
        _eventBroker.unsubscribe(token);
    };

    ESignAuthenticationMediator.prototype.getEventBroker = function(){
      return _eventBroker;
    };

    ESignAuthenticationMediator.prototype.destroy = function(){
      _eventBroker.destroy();
    };



   return ESignAuthenticationMediator;

});

/**
 * Notification Component - initializing the notification component
 *
 */
define('DS/ENXESignMgmt/Components/ENXESignMgmtNotifications',[
	'DS/Notifications/NotificationsManagerUXMessages',
	'DS/Notifications/NotificationsManagerViewOnScreen',
	],
function(NotificationsManagerUXMessages,NotificationsManagerViewOnScreen) {

    'use strict';
    let _notif_manager = null;
    let ENXESignMgmtNotifications = function () {
        // Private variables
    	
    	
        /**
         * 
         *
         * @param {Number} policy Policy that need to be set. It can be a combination of multiple options.
         *                  possible options :
         *                      - 0  No stacking
         *                      - 1  Stacking using level only
         *                      - 2  Stacking using category (can not be used alone, use level too by setting a policy of 3)
         *                      - 4  Stacking using title (can not be used alone, use level too by setting a policy of 5)
         *                      - 8  Stacking using subtitle (can not be used alone, use level too by setting a policy of 9)
         *                      - 16 Stacking only if the new notification matches the last one displayed (can not be used alone)
         *                  possible values :
         *                      - 0                    No stacking
         *                      - 1 + possibleOptions  Stacking can't be done without stacking the level
         * 
         */
    	_notif_manager = NotificationsManagerUXMessages;
    	NotificationsManagerViewOnScreen.setNotificationManager(_notif_manager);
    	NotificationsManagerViewOnScreen.setStackingPolicy(9); //To stack similar subject messages 
    	
    };
    
    ENXESignMgmtNotifications.prototype.handler = function () {
    	
    	if(document.getElementById("_codeContentouterDiv")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("_codeContentouterDiv"));
    	}else if(document.getElementById("_esignContentouterDiv")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("_esignContentouterDiv"));
    	}else{
    		if(document.getElementsByClassName('wux-notification-screen').length > 0){
        		NotificationsManagerViewOnScreen.inject(document.body);
        	}else{
        		NotificationsManagerViewOnScreen.inject(document.body);
        	}
    	}
    	
    	return _notif_manager;
    };
    
    ENXESignMgmtNotifications.prototype.notifview = function(){
    	return NotificationsManagerViewOnScreen;
    }; 
    
    return ENXESignMgmtNotifications;

});

/* global define,  */
/**
  * @overview Route Management - ENOVIA Bootstrap file to interact with the platform
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
 define('DS/ENXESignMgmt/ENXESignMgmtBootstrap', 
[
    'UWA/Core',
    'UWA/Class/Collection',
    'UWA/Class/Listener',
    'UWA/Utils',
    'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
    'DS/WAFData/WAFData'
],
function(
	UWACore,
	UWACollection,
	UWAListener,
	UWAUtils,
	CompassServices,
	WAFData
) {
            'use strict';

            var _started = false, _url3Dspace, _url3DPassport , ENXESignMgmtBootstrap, _tenantId;

           
			 function initPlatformServices () {
				
				 return new Promise(function(resolve, reject) {
	               
	                CompassServices.getPlatformServices({
	                    onComplete: function (platformData) {
							for(var i=0; i<platformData.length; i++){
								if(platformData[i]['platformId'] == _tenantId) {

									_url3Dspace = platformData[i]["3DSpace"];
									_url3DPassport =  platformData[i]["3DPassport"];
									// Fix passport URL by removing cas if present 
									let currentPassportUrl = _url3DPassport;
									let casPattern = new RegExp('(.*)(cas)(\\/?$)','i');
									let casMatches = casPattern.exec(currentPassportUrl);
									if (casMatches) {
										_url3DPassport = casMatches[1];
									}
								}
							}
	                    	resolve(platformData);
	                    	
	                    },
	                    onFailure: function (platformData) {
	                    	 _url3Dspace = [];
							 _url3DPassport = [];
	                    	eSignMod.EsignAuthrnotify.handler().addNotif({
								level: 'error',
								subtitle: NLS.Unexpectederror, 
							    sticky: false
							});
	                    	reject(platformData);
	                    }
	                });
	                
				 });
	            }
			 
			 ENXESignMgmtBootstrap = UWACore.merge(UWAListener, {

                startInit : function(currTenant) {
					 
                	return new Promise(function(resolve, reject) {
					_tenantId = currTenant;
					initPlatformServices().then(
    	    				success => {
    	    				
    	    					resolve(success);
    	    		    	},
    	    		    	failure => {
    	    		    		eSignMod.EsignAuthrnotify.handler().addNotif({
    								level: 'error',
    								subtitle: NLS.Unexpectederror, 
    							    sticky: false
    							});
    	    		    		reject(failure);
    	    		    	});
                    
                    
                    
                	 });
                },

                getEsign3DSpaceURL : function() {
                    if ( _url3Dspace) {
                        return  _url3Dspace;
                    }
                },
				
				getEsign3DPassportURL : function() {
                    if ( _url3DPassport) {
                        return  _url3DPassport;
                    }
                }
               
            });

            return ENXESignMgmtBootstrap;
        });


define('DS/ENXESignMgmt/Services/ESignAuthenticationServices',
		[
			"UWA/Core",
			'UWA/Class/Promise',
			'DS/WAFData/WAFData',
			'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
			'DS/ENXESignMgmt/ENXESignMgmtBootstrap'
			],
			function(
					UWACore,
					Promise,
					WAFData,
					i3DXCompassPlatformServices,
					ENXESignMgmtBootstrap
			) {
	'use strict';
	let ESignAuthenticationServices , _getLoginTicket, _serviceURL, _reAuthenticateESign, _validateTOTPCode;

	_reAuthenticateESign = function(loginFormData, EsignplatformURLs){

		return new Promise(function(resolve, reject) {
			console.log(loginFormData);
			var  options = {};
			var platformData, tenantId;

			var _serviceURL = ENXESignMgmtBootstrap.getEsign3DSpaceURL();
			if(typeof _serviceURL === 'undefined'){
				_serviceURL = EsignplatformURLs.URL3DSpace + "/resources/bps/reauthenticate";
			}
			else{
				_serviceURL = _serviceURL + "/resources/bps/reauthenticate";
			}

			options.data = loginFormData;
			options.method = 'POST';
			options.headers = {
					'Content-Type' : 'application/json',
			};
			options.onComplete = function(serverResponse) {

				resolve(serverResponse);
			};
			options.onFailure = function(serverResponse,respData) {

				if(respData){
					reject(respData);
				}else{
					reject(serverResponse);
				}

			};

			WAFData.authenticatedRequest(_serviceURL, options);	
		}); 

	};

	_validateTOTPCode = function(totpJsonObj, jsonSuccessObj, EsignplatformURLs){

		return new Promise(function(resolve, reject) {

			var  options = {};


			var _serviceURL = ENXESignMgmtBootstrap.getEsign3DSpaceURL();
			if(typeof _serviceURL === 'undefined'){
				_serviceURL = EsignplatformURLs.URL3DSpace + "/resources/bps/validate2FAcode";
			}
			else{
				_serviceURL = _serviceURL + "/resources/bps/validate2FAcode";
			}
			options.data = totpJsonObj;
			options.method = 'POST';
			options.headers = {
					'Content-Type' : 'application/json',
			};
			options.onComplete = function(serverResponse) {

				resolve(serverResponse);
			};
			options.onFailure = function(serverResponse,respData) {

				if(respData){
					reject(respData);
				}else{
					reject(serverResponse);
				}

			};

			WAFData.authenticatedRequest(_serviceURL, options);	
		}); 

	};


	ESignAuthenticationServices={
			reAuthenticateESign: (loginFormData,EsignplatformURLs) => {return _reAuthenticateESign(loginFormData,EsignplatformURLs);},
			validateTOTPCode: (totpJsonObj, jsonSuccessObj, EsignplatformURLs) => {return _validateTOTPCode(totpJsonObj, jsonSuccessObj, EsignplatformURLs);}
	};

	return ESignAuthenticationServices;
});

define('DS/ENXESignMgmt/Controller/ESignAuthenticationController',[
	'DS/ENXESignMgmt/Services/ESignAuthenticationServices',
	'UWA/Promise'],


	function(ESignAuthenticationServices, Promise) {

	'use strict';
	let ESignAuthenticationController;

	ESignAuthenticationController = {

			reAuthenticateESign: function(loginFormData, EsignplatformURLs){
				return new Promise(function(resolve, reject) {
					ESignAuthenticationServices.reAuthenticateESign(loginFormData,EsignplatformURLs).then(
							success => {

								resolve(success); 
							},
							failure => {

								reject(failure);
							});
				});	
			},
			validateTOTPCode: function(totpJsonObj, jsonSuccessObj, EsignplatformURLs){
				return new Promise(function(resolve, reject) {
					ESignAuthenticationServices.validateTOTPCode(totpJsonObj, jsonSuccessObj, EsignplatformURLs).then(
							success => {

								resolve(success); 
							},
							failure => {

								reject(failure);
							});
				});	
			}

	};

	return ESignAuthenticationController;
});

define('DS/ENXESignMgmt/Views/Dialogs/ESignAuthenticationDialog',
		[
			'i18n!DS/ENXESignMgmt/assets/nls/ENXESignMgmt',	
			'DS/ENXESignMgmt/Controller/ESignAuthenticationController',
			'DS/ENXESignMgmt/Components/ESignAuthenticationMediator',
			'DS/ENXESignMgmt/Components/ENXESignMgmtNotifications',
			'DS/ENXESignMgmt/ENXESignMgmtBootstrap',
			"DS/Utilities/Dom",
			"DS/WebappsUtils/WebappsUtils",
			"DS/Controls/LineEditor",
			"DS/Controls/Button",
			"DS/Windows/ImmersiveFrame",
			"DS/Windows/Dialog",
			"DS/Controls/Tab",
			'DS/Controls/Toggle',
			'DS/Controls/ButtonGroup',
			'DS/Notifications/NotificationsManagerUXMessages',
			'css!DS/UIKIT/UIKIT.css',
			'css!DS/ENXESignMgmt/ENXESignMgmt.css'
			],
			function ( NLS, ESignAuthenticationController, ESignAuthenticationMediator, ENXESignMgmtNotifications, ENXESignMgmtBootstrap, Dom ,WebappsUtils,WUXlineEditor,
					WUXButton,WUXImmersiveFrame,WUXDialog,WUXTabBar,WUXToggle, WUXButtonGroup, NotificationsManagerUXMessages) {    
	"use strict";
	var ESignMediator ;
	var EsignAuthrnotify;
	var EsignplatformURLs, taskAssigneeUserName, taskAssigneeEmail, currTenant;
	var ESignAuthenticationDialog  = {

			initEnoviaBootstrap : function (currTenant){
				return new Promise(function(resolve, reject) {
					require(['DS/ENXESignMgmt/ENXESignMgmtBootstrap'], function(ENXESignMgmtBootstrap) {

						ENXESignMgmtBootstrap.startInit(currTenant).then(
								success => {
									resolve(success);
								},
								failure =>{
									EsignAuthrnotify.handler().addNotif({
										level: 'error',
										subtitle: NLS.EsignUnexpectederror, 
										sticky: false
									});
								}); 


					});

				});
			},

			//initializing mediator and notification
			init : function (_esignAuthimmersiveFrame2 ,platformServiceURLs) {
				ESignMediator = new ESignAuthenticationMediator();
				EsignAuthrnotify = new ENXESignMgmtNotifications();
				if(typeof widget !== 'undefined') {
					currTenant = platformServiceURLs.tenantId;
					ESignAuthenticationDialog.initEnoviaBootstrap(currTenant).then(
							success => {
								taskAssigneeUserName = platformServiceURLs.taskAssigneeUserName;
								taskAssigneeEmail = platformServiceURLs.taskAssigneeEmail;
								ESignAuthenticationDialog.BuildESignAuthLoginDialog(_esignAuthimmersiveFrame2)
							},
							failure =>{
								EsignAuthrnotify.handler().addNotif({
									level: 'error',
									subtitle: NLS.EsignUnexpectederror, 
									sticky: false
								});
							}); 

				}
				else{
					EsignplatformURLs = platformServiceURLs;
					taskAssigneeUserName = platformServiceURLs.taskAssigneeUserName;
					taskAssigneeEmail = platformServiceURLs.taskAssigneeEmail;
					ESignAuthenticationDialog.BuildESignAuthLoginDialog(_esignAuthimmersiveFrame2);
				}
				return ESignMediator;
			},

			InitiateEsignAuthDialog : function (container, jsonSuccessObj, cookieJsonObj ) {  

				this._immersiveFramework = container;
				var that = this;
				var DialogContentouterDiv = new UWA.Element('div', {id: '_codeContentouterDiv','class':''});
				var middleDiv = new UWA.Element('div', {id: '_codemiddleDiv','class':''});
				var innderDiv = new UWA.Element('div', {id: '_codeinnderDiv','class':''});

				var compassLogoDiv = new UWA.Element('div', {id: '_codeCompassLogoDiv','class':''});
				var compassLogoSpan = new UWA.Element("span", {id: 'validatecompassLogoSpan','class':''});
				var  logo = new UWA.Element("img", {
						//"class": "dddxp-logo",
						src: WebappsUtils.getWebappsAssetUrl("ENXESignMgmt","icons/ESign/3DSpace.png"),
						 
					});
				var fieldDiv = new UWA.Element('div', {id: '_codeFieldDiv','class':''});
				var codeLabelDiv = new UWA.Element('div', {id: '_codeLabelDiv','class':''});
				var codeLabel = new UWA.Element('h5', {id: '_codeLabel','class':'', text: NLS.EsignAuthCodeLabel});
				var codeTextDiv = new UWA.Element('div', {id: '_codeTextDiv','class':''});
				var codeText = new UWA.Element('h5', {id: '_codeText','class':'', text: NLS.EsignCodeMessage});
				var codeInputDiv =  new UWA.Element('div', {id: '_codeInputDiv','class':''});
				var codeInput = UWA.createElement('input', { type: 'text', id : '_esignAuthcontentEditorDomId',size : '40','class':'form-control' ,placeholder : NLS.EsignCodePlaceholder });
				
				logo.inject(compassLogoSpan);
				compassLogoSpan.inject(compassLogoDiv);
				compassLogoDiv.inject(innderDiv);		
				codeLabel.inject(codeLabelDiv);
				codeLabelDiv.inject(fieldDiv);
				codeText.inject(codeTextDiv);
				codeTextDiv.inject(fieldDiv);
				codeInput.inject(codeInputDiv);
				codeInputDiv.inject(fieldDiv);
				fieldDiv.inject(innderDiv);
				innderDiv.inject(middleDiv);
				middleDiv.inject(DialogContentouterDiv);
				this._esignAuthDialog = new WUXDialog({
					title: NLS.EsignUserVerification,
					modalFlag: true,
					domId : 'ESignLoginDialog',
					content: DialogContentouterDiv,
					immersiveFrame: container,
					width:600,
					height:400,
					buttons: {
		   		Ok: new WUXButton({
		   			emphasize: "primary",
					domId:"esignVerifyButton",
		   			label: NLS.EsignVerify,
		   			onClick: function (e) {
		   							var button = e.dsModel;
					var myDialog = button.dialog;
					var totpCode = document.getElementById("_esignAuthcontentEditorDomId").value;
					
					if( ""  == totpCode || null == totpCode){
						EsignAuthrnotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.EsignAuthInvalidCode, 
							sticky: false
						});
						return;
					}
					if(totpCode){

						var totpJsonObj = {
								code : totpCode,
								totpURL : encodeURIComponent(jsonSuccessObj.x3ds_totp_url),
								csrfToken : jsonSuccessObj["X-DS-IAM-CSRFTOKEN"],
								reauthsessionid : cookieJsonObj.reauthsessionid								
						}
						
						if( cookieJsonObj.SERVERID !=null && cookieJsonObj.SERVERID != undefined ){
							totpJsonObj["SERVERID"] = cookieJsonObj.SERVERID;
						}else{
							totpJsonObj["SERVERID"] = null;
						}
						
						totpJsonObj = JSON.stringify(totpJsonObj);	

						ESignAuthenticationController.validateTOTPCode(totpJsonObj, jsonSuccessObj, EsignplatformURLs).then(
								success => { 
									var jsonObj = JSON.parse(success);
									if(jsonObj.result == 'success'){

										if(jsonObj.userdata.fields.username.toLowerCase() != taskAssigneeUserName.toLowerCase()){
                                             EsignAuthrnotify.handler().addNotif({
															level: 'error',
															subtitle: NLS.EsignAuthInvalidCredintials, 
															sticky: false
											});
											return;
										} else {
											ESignMediator.publish('ESign-Validated');
										    myDialog.close();
										}										
									}else{
										EsignAuthrnotify.handler().addNotif({
											level: 'error',
											subtitle: NLS.EsignAuthInvalidCode, 
											sticky: false
										});
										return;
									}	
								},
								failure =>{

									EsignAuthrnotify.handler().addNotif({
										level: 'error',
										subtitle: NLS.EsignUnexpectederror, 
										sticky: false
									});
									myDialog.close();
								}
						);
					};
		   			}
		   		}),
		   		
		   		Cancel: new WUXButton({
					emphasize: "secondary",
		   			onClick: function (e) {
		   				var button = e.dsModel;
		   				var myDialog = button.dialog;
		   				myDialog.close();
		   			}
		   		})
	       }

				});

				
				
				this._esignAuthDialog.addEventListener('close', function (e) {	            	

					if(that._immersiveFramework){
						that._immersiveFramework.destroy();
						that._immersiveFramework = undefined;
					}
				});


			},

			BuildESignAuthLoginDialog : function (container) { 
				this._immersiveFramework = container;
				var self = this;

				var DialogContentouterDiv = new UWA.Element('div', {id: '_esignContentouterDiv','class':''});
				var middleDiv = new UWA.Element('div', {id: '_esignmiddleDiv','class':''});
				var innderDiv = new UWA.Element('div', {id: '_esigninnderDiv','class':''});

				var compassLogoDiv = new UWA.Element('div', {id: '_compassLogoDiv','class':''});
				var compassLogoSpan = new UWA.Element("span", {id: '_compassLogoSpan','class':''});
				var  logo = new UWA.Element("img", {
						//"class": "dddxp-logo",
						src: WebappsUtils.getWebappsAssetUrl("ENXESignMgmt","icons/ESign/3DSpace.png"),
						 
					});
				var logindialogDiv = new UWA.Element('div', {id: '_logindialogDiv','class':''});
				var _logintitlediv = new UWA.Element('div', {id: '_logintitlediv' ,'class':''});
				var loginIdTitle = new UWA.Element('h5', {id: '_loginIdTitle','class':'', text: NLS.EsignAuthLoginUserName});
				var loginUsernameDiv = new UWA.Element('div', {id: '_loginUsernameDiv','class':''});
				var loginUsernameField = UWA.createElement('input', { type: 'text', id : '_esignAuthLoginDialoginUsername', 'class':'form-control',size : '40', pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+', placeholder : NLS.EsignUsernamePlaceholder });	
				var loginUsernameIconSpan = new UWA.Element('span', {id: '_loginUsernameIconSpan','class':'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-user'});
				var PasswordFieldDiv = new UWA.Element('div', {id: '_PasswordFieldDiv','class':''});
				var PasswordField = UWA.createElement('input', { type: 'password', id : '_esignAuthLoginDialoginPassword','class':'form-control' ,size : '40', placeholder :NLS.EsignAuthLoginPassword });	
				var loginPasswordIconSpan = new UWA.Element('span', {id: '_loginPasswordIconSpan','class':'wux-ui-3ds wux-ui-3ds-1x  wux-ui-3ds-lock'});

				var checkBoxDiv = new UWA.Element('div', {id: '_checkBoxDiv','class':''});

				var Checkbox = new WUXToggle({ type: "checkbox",
					label: NLS.EsignAuthLoginReadAndUnderstand, 
					domId: '_esignAuthLoginDialogincheckbox',
					checkFlag : false
				});	
				logo.inject(compassLogoSpan);
				compassLogoSpan.inject(compassLogoDiv);
				compassLogoDiv.inject(innderDiv);		
				loginIdTitle.inject(_logintitlediv);
				_logintitlediv.inject(logindialogDiv);
				loginUsernameIconSpan.inject(loginUsernameDiv);
				loginUsernameField.inject(loginUsernameDiv);
				loginUsernameDiv.inject(logindialogDiv);
				loginPasswordIconSpan.inject(PasswordFieldDiv);
				PasswordField.inject(PasswordFieldDiv);
				PasswordFieldDiv.inject(logindialogDiv);
				Checkbox.inject(checkBoxDiv);
				checkBoxDiv.inject(logindialogDiv);
				logindialogDiv.inject(innderDiv);
				innderDiv.inject(middleDiv);
				middleDiv.inject(DialogContentouterDiv);
				
				this._esignAuthLoginDialog = new WUXDialog({
					title: NLS.EsignUserVerification,
					modalFlag: true,
					domId : 'ESignLoginDialog',
					content: DialogContentouterDiv,
					immersiveFrame: this._immersiveFramework,
					width:600,
					height:400,
					resizableFlag : false, 
					buttons: {
						Ok : new WUXButton({
							emphasize: "primary",
							domId:"esignValidateButton",
							label: NLS.EsignValidate,
							onClick: function (e) {

								var checkBox = document.getElementById("_esignAuthLoginDialogincheckbox");
								var userName = document.getElementById("_esignAuthLoginDialoginUsername");
								var passWord = document.getElementById("_esignAuthLoginDialoginPassword");

								if(userName.value == "" || passWord.value == ""){
									EsignAuthrnotify.handler().addNotif({
										level: 'error',
										subtitle: NLS.EsignAuthMandField, 
										sticky: false
									});
									return;

								}
								else if(!checkBox.dsModel.checkFlag){
									EsignAuthrnotify.handler().addNotif({
										level: 'error',
										subtitle: NLS.EsignAuthSelectCheckBox, 
										sticky: false
									});
									return;
								}
								else{
									var button = e.dsModel;
									var _passportURL = ENXESignMgmtBootstrap.getEsign3DPassportURL();
									if(typeof _passportURL === 'undefined'){
										_passportURL = EsignplatformURLs.URLpassport ;
									}

									var loginTicketJsonObj = {
											//lt : _lt,
											username :  document.getElementById("_esignAuthLoginDialoginUsername").value,
											password : document.getElementById("_esignAuthLoginDialoginPassword").value,
											passportURL : _passportURL
									}
									loginTicketJsonObj = JSON.stringify(loginTicketJsonObj);

									ESignAuthenticationController.reAuthenticateESign(loginTicketJsonObj,EsignplatformURLs).then(
											success => {
												var cookieJsonObj;
												var jsonSuccessObj = JSON.parse(JSON.parse(success).authResponse);
												var reauthsessionid = JSON.parse(success).reauthsessionid;
												cookieJsonObj ={"reauthsessionid":reauthsessionid};
												if( JSON.parse(success).SERVERID !=null && JSON.parse(success).SERVERID != undefined ){
													var serverId = JSON.parse(success).SERVERID;
													cookieJsonObj["SERVERID"] = serverId;
												}
												 

												if(jsonSuccessObj.result == "failed"){
													EsignAuthrnotify.handler().addNotif({
														level: 'error',
														subtitle: NLS.EsignAuthInvalidCredintials, 
														sticky: false
													});
													return;
												}
												else{

													if((jsonSuccessObj.userdata && jsonSuccessObj.userdata.fields && jsonSuccessObj.userdata.fields.username.toLowerCase() != taskAssigneeUserName.toLowerCase()) || (jsonSuccessObj.result == "totp_required" && !(taskAssigneeUserName.toLowerCase() == userName.value.toLowerCase() || taskAssigneeEmail == userName.value))){
														EsignAuthrnotify.handler().addNotif({
															level: 'error',
															subtitle: NLS.EsignAuthInvalidCredintials, 
															sticky: false
														});
														return;
													}
													if(jsonSuccessObj.result == "totp_required" ){//totp_required

														var _esignAuthimmersiveFrame;
														_esignAuthimmersiveFrame = new WUXImmersiveFrame();
														_esignAuthimmersiveFrame.inject(document.body);

														if(self._immersiveFramework){
															self._immersiveFramework.destroy();
															self._immersiveFramework = undefined;
														}

														ESignAuthenticationDialog.InitiateEsignAuthDialog(_esignAuthimmersiveFrame,jsonSuccessObj,cookieJsonObj);
													}
													else if(jsonSuccessObj.result == "success"){
														ESignMediator.publish('ESign-Validated');
														this.dsModel.dialog.close();
													}

												}
											},
											failure =>{
												EsignAuthrnotify.handler().addNotif({
													level: 'error',
													subtitle: NLS.EsignUnexpectederror, 
													sticky: false
												});
												this.dsModel.dialog.close();
											}
									);

								}
							}
						}),
						Cancel: new WUXButton({
							emphasize: "secondary",
						onClick: function (e) {
		   				this.dsModel.dialog.close();
						}
					})
					}
				});

				

				this._esignAuthLoginDialog.addEventListener('close', function (e) {	            	

					if(self._immersiveFramework){
						self._immersiveFramework.destroy();
						self._immersiveFramework = undefined;
					}
				});
			}


	};
	return ESignAuthenticationDialog;
});


