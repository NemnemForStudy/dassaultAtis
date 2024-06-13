/* global widget, define */

define('decDashBoardProjectProgressChart/decDashBoardProjectProgressChart',
    [
        // UWA
        'UWA/Core',
        'UWA/Utils',
        'UWA/Event',
        'UWA/Promise',
        
		'DS/PlatformAPI/PlatformAPI',
        'DS/UIKIT/Input/Text',
    	'DS/UIKIT/Input/Select',
        'DS/UIKIT/Input/Button',
        'DS/UIKIT/Alert',

        'DS/Bookmarklet/Notification',

        'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',

        'DS/WAFData/WAFData',
        "DS/decDashboardCommon/decDashboardCommon",

        'i18n!DS/DelmiaWorksReader/assets/nls/delmiaWorksReader',

        'css!DS/DelmiaWorksReader/DelmiaWorksReader'
    ],
    function (
        UWA,
        Utils,
        Event,
        Promise,

		PlatformAPI,
        UIKitText,
    	UIKITInputSelect,
        UIKitButton,
        UIKitAlert,

        Bookmarklet,

        CompassPlatformServices,

        WAFData,
        dashboardCommon,

        nls
    ) {
        'use strict';
        var WebPage;

        WebPage = {
    		topicName: "ProjectInfo",
            alertContainer: {},
            iframeContainer: {},
            isInternalService: false,
            readOnly: widget.readOnly,

            bookmarklet: null,
            epcType:null,
			
			setSubscribe: function(){
                PlatformAPI.subscribe("ProjectInfo", WebPage.setProjectCode);
			},
			setProjectCode: function (callData) {
				dashboardCommon.setProjectCode(callData, WebPage.load);
			},
			
			
			
            /**
             * Init the web page loading.
             */
            load: function () {
				
                var url;

                WebPage.destroyBookmarklet();
                widget.body.empty();
                
                url = WebPage.getUrl();
                widget.setValue('x3dUntrustedContent', !!url);
				
				var projectCode = widget.getValue("projectCode");
				if ( projectCode !== "" )
				{
		    		var widgetURL = widget.getUrl();
		    		var spaceURL = widgetURL.substring(0, widgetURL.indexOf("/3dspace"));
					WAFData.authenticatedRequest(spaceURL + "/3dspace/resources/JPO/emxProjectSpace/getProjectEPCType", {
						method: "POST",
						type: "json",
						data: {
							projectCode: projectCode
						},
						onComplete: function (response) {
		                	console.log('Startup params', response);
		                	if ( response.hasOwnProperty("result") === true && response["result"].toUpperCase() === "SUCCESS")
		               		{
								WebPage.epcType = response["data"][0]["data"];
								
								if (!url) {
				                } else {
				                    WebPage.displayContentFromUrl(url,WebPage.epcType);
				                }
							}
		            	},
		            	onFailure: function (e) {
							console.log('ERROR : getDisciplineList', e);
						},
						onTimeout: function (e) { 
							console.log('ERROR : getDisciplineList', e);  
						}
		            });
				}
				
                if (!url) {
                } else {
                    //WebPage.displayContentFromUrl(url,widget.getValue("projectCode"));
                }
                
                widget.setTitle(widget.getValue('title'));
            },
            
            /**
			 * set Project Code And load
			 */
			setProjectCode: function(callData){
				var projectCode = callData.projectCode;
				if(projectCode.indexOf("Config!") != -1){
					projectCode = projectCode.replace("Config!", "");
					widget.setValue('projectCode', projectCode);
					WebPage.load();
				}
			},
			
            /**
             * Pop a notification within the widget
             * @param {string} message the message to display in the notification pop-up
             * @param {string} [type='error'] the type of the alert (warning, error)
             */
            notify: function (message, inputAlertType) {
                if ((widget.getValue('suppressMessages') || false).toString() === 'true') return;

                var alertType, defaultAlertType = 'error';

                alertType = (['warning', 'error'].indexOf(inputAlertType) > -1) ? inputAlertType : defaultAlertType;

                new UIKitAlert({
                    closable: true,
                    className: 'webpagereader-notify',
                    visible: true,
                    messages: [{
                        message: UWA.createElement('div', {
                            html: [UWA.createElement('span', { text: message })].concat(WebPage.readOnly ? [] : [
                                UWA.createElement('br'),
                                UWA.createElement('span', {
                                    text: nls.doNotShowErrorsAgain,
                                    styles: {
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        'text-decoration': 'underline'
                                    },
                                    events: {
                                        click: function () {
                                            widget.setValue('suppressMessages', true);
                                            new UIKitAlert({
                                                visible: true,
                                                closable: true,
                                                autoHide: true,
                                                hideDelay: 3000,
                                                messages: [{ message: nls.doNotShowErrorsAgainConfirmation }]
                                            }).inject(WebPage.alertContainer, 'before');
                                        }
                                    }
                                })
                            ])
                        }),
                        className: alertType
                    }]
                }).inject(WebPage.alertContainer);
            },

            createBookmarklet: function () {
                // If do not show again is true, don't create the bookmarklet.
                if ((widget.getValue('suppressBookmarklet') || false).toString() === 'true') {
                    return;
                }

                WebPage.bookmarklet = new Bookmarklet({
                    onDoNotShowAgain: !WebPage.readOnly && function () {
                        widget.setValue('suppressBookmarklet', true);
                    }
                });

                WebPage.bookmarklet.render().inject(widget.body);
            },

            destroyBookmarklet: function () {
                WebPage.bookmarklet && WebPage.bookmarklet.destroy();
                WebPage.bookmarklet = null;
            },

            /**
             * Inject the add feed form in the widget body
             */
            displayAddUrl: function () {
                var createElement = UWA.createElement,
                    mainContainer,
                    addUrlContainer,
                    addUrlForm,
                    addUrlFieldset,
                    addUrlSubmit,
                    addUrlInput;

                WebPage.createBookmarklet();

                // build the main container
                mainContainer = createElement('div', {
                    'class': 'container',
                    events: {
                        click: function () {
                            WebPage.destroyBookmarklet();
                        }
                    }
                }).inject(widget.body);

                // build the add feed container
                addUrlContainer = createElement('div', { 'class': 'addUrl' }).inject(mainContainer);

                // build the add feed form
                addUrlForm = createElement('form', { 'class': 'urlform' }).inject(addUrlContainer);

                // 1 - the field set
                addUrlFieldset = createElement('fieldset').inject(addUrlForm);

                // 2 - the input text field
                addUrlInput = new UIKitText({
                    events: {
                        onKeyDown: function (e) {
                            var value, key;

                            key = Event.whichKey(e);

                            value = this.getValue().trim();
                            if (value && key === 'return') {
                                widget.setValue('projectCode', value);
                                WebPage.load();
                            }
                        }
                    },
                    attributes: {
                        autofocus: true,
                        placeholder: nls.placeHolderEnterURL
                    }
                });

                // 3 - the submit button
                addUrlSubmit = new UIKitButton({
                    className: 'input-submit primary',
                    value: nls.submitURLBtn,
                    events: {
                        onClick: function (e) {
                            Event.stop(e);
                            var value = addUrlInput.getValue().trim();
                            if (value) {
                                widget.setValue('projectCode', value);
                                WebPage.load();
                            }
                        }
                    }
                });

                addUrlSubmit.inject(addUrlFieldset);

                createElement('span', { html: [addUrlInput] }).inject(addUrlFieldset);

            },

            /**
             * Build webpage viewer.
             * @param {string} url - The url to load
             * @param {boolean} [asPdfFallback] - Specify it as true to load the url as PDF fallback
             */
            buildWebpageViewer: function (url, asPdfFallback) {
                var objectContainer, iframe;

                widget.body.addClassName('no-padding');
                WebPage.iframeContainer.empty();
                WebPage.alertContainer.empty();

                iframe = UWA.createElement('iframe', {
                    frameborder: 0,
                    src: url,
                    width: '100%',
                    height: '100%',
                    scrolling: widget.getValue('scrolling'),
                    sandbox: 'allow-same-origin allow-forms allow-scripts allow-popups' // Block 'iframe busters'
                });

                // Using an <object> with an <iframe> fallback will be compatible with most browsers.
                if (asPdfFallback) {
                    objectContainer = UWA.createElement('object', {
                        type: 'application/pdf',
                        width: '100%',
                        height: '100%',
                        typemustmatch: 'true'
                    });
                    objectContainer.setAttribute('data', url);
                    iframe.inject(objectContainer);
                    objectContainer.inject(WebPage.iframeContainer);
                } else {
                    iframe.inject(WebPage.iframeContainer);
                }

                if (url.indexOf('http://') === 0) {
                    WebPage.notify(nls.warningMessage, 'warning');
                }
                WebPage.alertContainer.classList.remove('webpagereader-lower');
            },

            /**
             * Build PDF Viewer.
             * @param {String} url - Url to load into the PDF Viewer.
             * @param {String} authentication - authentication type (passport or none).
             */
            buildPdfViewer: function (url, authentication) {
                WebPage.alertContainer.empty();

                require(['DS/W3DXComponents/PDFViewer'], function (PDFViewer) {
                    var pdfViewer = new PDFViewer({
                        url: url,
                        requestsOptions: {
                            'authentication': authentication,
                            onFailure: function () {
                                WebPage.buildWebpageViewer(url, true);
                            }
                        }
                    });
                    pdfViewer.render().inject(WebPage.iframeContainer);
                    WebPage.alertContainer.classList.add('webpagereader-lower'); // push lower to avoid overlap with pdf topbar
                });
            },

            /**
             * Get the url to load into the iframe.
             * @return {String} urlResult - Url with protocol and source.
             */
            getUrl: function () {
				if(widget.getValue('projectCode')){
				var useUrl = widget.getUrl();
				useUrl = useUrl.substring(0, useUrl.indexOf('3dspace'));
                var urlProtocol, url = Utils.parseUrl(useUrl + "3dspace/webapps/decDashBoardProjectProgressChart/decDashBoardProjectProgressChart.jsp?projectCode=" + widget.getValue('projectCode')
                +"&EPCType=" + widget.getValue('EPCType')),
                    urlResult = '',
                    urlSource = url.source;
				}else{
                var urlProtocol, url = '',
                    urlResult = '',
                    urlSource = url.source;
				}
				

                if (urlSource && urlSource !== 'about:blank') {
                    urlProtocol = url.protocol;
                    if (urlProtocol === 'https') {
                        urlResult = urlSource;
                    } else if (urlProtocol === 'http') {
                        urlResult = urlSource;
                    } else {
                        urlResult = 'http://' + urlSource;
                    }
                }
                return urlResult.trim();
            },

            /**
             * Process the URL and populate the widget content with either a
             * normal HTML webpage or a PDF file (using a PDF reader).
             * @param {String} url - Url to process and get the contend from.
             */
            displayContentFromUrl: function (url,epcType) {
                var authentication;

                // Get the list of user known services, identified by their URL origin
                function getServices () {
                    return new Promise(function (resolve, reject) {
                        CompassPlatformServices.getPlatformServices({
                            onComplete: function (data) {
                                resolve(data || []);
                            },
                            onFailure: reject
                        });
                    });
                }

                // Makes a request in order to read the content type (asnc)
                function pokeTarget (url, authentication) {
                    return new Promise(function (resolve, reject) {
                        WAFData.handleRequest(url, {
                            onComplete: function (resp, headers) {
                                resolve({
                                    value: resp,
                                    headers: headers
                                });
                            },
                            onFailure: reject,
                            onTimeout: reject,
                            authentication: authentication
                        });
                    });
                }

                // Checks if the input URL matches any known internal services of 'ANY' of the users' tenants
                function checkMatchingService (url, tenantsServices) {
                    var serviceFound;

                    tenantsServices.forEach(function (tenantServices) {
                        for (var serviceKey in tenantServices) {
                            if (url.indexOf(tenantServices[serviceKey]) === 0) {
                                serviceFound = true;
                            }
                        }
                    });
                    return serviceFound;
                }

                // Returns the origin from a URL
                function getOrigin (url) {
                    var a = document.createElement('a');
                    a.href = url;

                    // a.origin doesn't work on IE, and a.host always include a port number on IE
                    return ['http:', 'https:'].indexOf(a.protocol) > -1 && a.host
                        ? a.protocol + '//' + a.hostname
                            + ((!a.port || a.protocol === 'http:' && a.port === '80'
                                || a.protocol === 'https:' && a.port === '443'
                            )
                                ? ''
                                : ':' + a.port)
                        : '';
                }

                // Tests a string against a wildcard scheme (with '*'s)
                function testWildcardScheme (rule, str) {
                    return new RegExp('^' + rule.split('*').map(function escapeRegex (s) {
                        return s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
                    }).join('.*') + '$').test(str);
                }

                // Provides the value of an HTML header
                function getHeader (headers, name) {
                    return headers[name] || headers[name.toLowerCase()] || '';
                }

                // Checks that the content security policy of the target url matches the current location
                function hasValidCSP (headers) {
                    var xFrameOptions = getHeader(headers, 'X-Frame-Options'),
                        contentSecurityPolicy = getHeader(headers, 'Content-Security-Policy'),
                        widgetOrigin = getOrigin(window.location.origin),
                        targetOrigin = getOrigin(url);

                    return !(xFrameOptions.toLowerCase() === 'deny'
                        || (xFrameOptions.toLowerCase() === 'sameorigin' && targetOrigin !== widgetOrigin)
                        || (xFrameOptions.toLowerCase().indexOf('allow-from') === 0
                            && getOrigin(xFrameOptions.split(' ')[1]) !== origin)
                        || contentSecurityPolicy.split(';').reduce(function (blocked, cspItem) {
                            var acceptedAncestors;

                            cspItem = cspItem.trim();

                            if (cspItem.toLowerCase().indexOf('frame-ancestors') !== 0) {
                                return blocked;
                            }

                            acceptedAncestors = cspItem.split(' ').slice(1);

                            return blocked
                                || acceptedAncestors[0] === '\'none\''
                                || (acceptedAncestors[0] === '\'self\'' && targetOrigin !== widgetOrigin)
                                || !acceptedAncestors.reduce(function (matchingOriginFound, source) {
                                    return matchingOriginFound || (source.indexOf(':') === source.length - 1
                                        // scheme source
                                        ? widgetOrigin.indexOf(source) === 0
                                        // host source, possibly with wildcard
                                        : testWildcardScheme(
                                            decodeURIComponent(getOrigin(source)), // normalize origin wildcard scheme
                                            widgetOrigin
                                        )
                                    );
                                }, false);
                        }, false)
                    );
                }
                
                WebPage.alertContainer = UWA.createElement('div', { 'class': 'alert-container' }).inject(widget.body);
                
                // added by thok 2023.08.30 [S]
                
                var setEPCType = widget.getValue('EPCType');
                if(setEPCType==null){
					setEPCType = 'overall';
				}
                
                var div = UWA.createElement('div', {id :'testDiv',
                					styles: {
                                        padding: '15px 15px',
                                        'text-align': 'left'
                                    }});
                
                var btnOverall = UWA.createElement('button', {  type: 'button' ,
                												id : 'btn-overall' ,
                												class : 'buttonDiv', 
                												innerHTML : 'Overall',
                												styles:{
																	overflow: 'visible',
																	color: '#5b5d5e',
																	'background-color' : '#F7F7F7',
																	border: '0px',
																	overflow: 'visible',
																	'border-radius': '1px',
																	transition: 'background-color 2s font-weight 2s',
																	margin: '0px 0px',
																	'margin-right': '5px',
																}
															   });
				if(setEPCType=='overall'){
					btnOverall.style.fontWeight='bold'; // 클릭 한 폰트 볼드
					btnOverall.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
				}
															   
				btnOverall.addEventListener('click', function() {
										  var button = this;
										  
										  var section1s = document.getElementsByClassName('buttonDiv');
										
										  for( var i = 0; i < section1s.length; i++ ){
											  var section1 = section1s.item(i);
											  section1.style.backgroundColor = '#F7F7F7';
											  section1.style.fontWeight = 'normal';
										  }
										  
										  button.style.fontWeight='bold'; // 클릭 한 폰트 볼드
										  button.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
										  
										  widget.setValue('EPCType','overall');
										  WebPage.load();
										});										   
				
				var overText = document.createTextNode('Overall');
  				btnOverall.appendChild(overText);
  				
                div.appendChild(btnOverall);
                
				if(epcType.includes('E')){
					var btnEng = UWA.createElement('button', {  type: 'button' ,
                												id : 'btn-eng' ,
                												class : 'buttonDiv', 
                												innerHTML : 'Engineering',
                												styles:{
																	overflow: 'visible',
																	color: '#5b5d5e',
																	'background-color': '#F7F7F7',
																	border: '0px',
																	overflow: 'visible',
																	'border-radius': '1px',
																	transition: 'background-color 2s font-weight 2s',
																	margin: '0px 0px',
																	'margin-right': '5px',
																}
															   });
				if(setEPCType=='eng'){
					btnEng.style.fontWeight='bold'; // 클릭 한 폰트 볼드
					btnEng.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
				}

				btnEng.addEventListener('click', function() {
										  var button = this;
										  
										  var section1s = document.getElementsByClassName('buttonDiv');
										
										  for( var i = 0; i < section1s.length; i++ ){
											  var section1 = section1s.item(i);
											  section1.style.backgroundColor = '#F7F7F7';
											  section1.style.fontWeight = 'normal';
										  }
										  
										  button.style.fontWeight='bold'; // 클릭 한 폰트 볼드
										  button.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
										  
										  widget.setValue('EPCType','eng');
										  WebPage.load();
										});
										
  				var engText = document.createTextNode('Engineering');
  				btnEng.appendChild(engText);
  					
				div.appendChild(btnEng);
				
				}
				
				if(epcType.includes('P')){
					var btnProc = UWA.createElement('button', {  type: 'button' ,
                												id : 'btn-proc' ,
                												class : 'buttonDiv', 
                												innerHTML : 'Procurement',
                												styles:{
																	overflow: 'visible',
																	color: '#5b5d5e',
																	'background-color': '#F7F7F7',
																	border: '0px',
																	overflow: 'visible',
																	'border-radius': '1px',
																	transition: 'background-color 2s font-weight 2s',
																	margin: '0px 0px',
																	'margin-right': '5px',
																}
															   });
															   
					if(setEPCType=='proc'){
						btnProc.style.fontWeight='bold'; // 클릭 한 폰트 볼드
						btnProc.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
					}
					
					btnProc.addEventListener('click', function() {
										  var button = this;
										  
										  var section1s = document.getElementsByClassName('buttonDiv');
										
										  for( var i = 0; i < section1s.length; i++ ){
											  var section1 = section1s.item(i);
											  section1.style.backgroundColor = '#F7F7F7';
											  section1.style.fontWeight = 'normal';
										  }
										  
										  button.style.fontWeight='bold'; // 클릭 한 폰트 볼드
										  button.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
										  
										  widget.setValue('EPCType','proc');
										  WebPage.load();
										});

  					var procText = document.createTextNode('Procurement');
  					btnProc.appendChild(procText);
  					
					div.appendChild(btnProc);
				} 
				
				if(epcType.includes('C')){
					var btnCon = UWA.createElement('button', {  type: 'button' ,
                												id : 'btn-con' ,
                												class : 'buttonDiv', 
                												innerHTML : 'Construction',
                												styles:{
																	overflow: 'visible',
																	color: '#5b5d5e',
																	'background-color': '#F7F7F7',
																	border: '0px',
																	overflow: 'visible',
																	'border-radius': '1px',
																	transition: 'background-color 2s font-weight 2s',
																	margin: '0px 0px',
																	'margin-right': '5px',
																}
															   });
					var btnComm = UWA.createElement('button', {  type: 'button' ,
                												id : 'btn-comm' ,
                												class : 'buttonDiv', 
                												innerHTML : 'Commissioning',
                												styles:{
																	overflow: 'visible',
																	color: '#5b5d5e',
																	'background-color': '#F7F7F7',
																	border: '0px',
																	overflow: 'visible',
																	'border-radius': '1px',
																	transition: 'background-color 2s font-weight 2s',
																	margin: '0px 0px',
																	'margin-right': '5px',
																}
															   });
					
					if(setEPCType=='con'){
						btnCon.style.fontWeight='bold'; // 클릭 한 폰트 볼드
						btnCon.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
					}
					
					if(setEPCType=='comm'){
						btnComm.style.fontWeight='bold'; // 클릭 한 폰트 볼드
						btnComm.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
					}
															   
					btnCon.addEventListener('click', function() {
										  var button = this;
										  
										  var section1s = document.getElementsByClassName('buttonDiv');
										
										  for( var i = 0; i < section1s.length; i++ ){
											  var section1 = section1s.item(i);
											  section1.style.backgroundColor = '#F7F7F7';
											  section1.style.fontWeight = 'normal';
										  }
										  
										  button.style.fontWeight='bold'; // 클릭 한 폰트 볼드
										  button.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
										  
										  widget.setValue('EPCType','con');
										  WebPage.load();
										});
					btnComm.addEventListener('click', function() {
										  var button = this;
										  
										  var section1s = document.getElementsByClassName('buttonDiv');
										
										  for( var i = 0; i < section1s.length; i++ ){
											  var section1 = section1s.item(i);
											  section1.style.backgroundColor = '#F7F7F7';
											  section1.style.fontWeight = 'normal';
										  }
										  
										  button.style.fontWeight='bold'; // 클릭 한 폰트 볼드
										  button.style.backgroundColor = '#e6e9ff'; // 클릭 한 배경 분홍
										  
										  widget.setValue('EPCType','comm');
										  WebPage.load();
										});
																
					var conText = document.createTextNode('Construction');
  					btnCon.appendChild(conText);
  					var commText = document.createTextNode('Commissioning');
  					btnComm.appendChild(commText);
					
					div.appendChild(btnCon);
					div.appendChild(btnComm);
				}
				
				// added by thok 2023.08.30 [E]
				
				div.inject(widget.body);
				
                WebPage.iframeContainer = UWA.createElement('div', {
                    'class': 'iframe-container ' + (widget.getValue('scrolling') === 'no' ? '' : 'scrolling')
                }).inject(widget.body);

                // Determine if the URL belongs to a known internal service. If so, use authentication
                getServices()
                    .then(function (services) {
                        WebPage.isInternalService = checkMatchingService(url, services);

                        authentication = WebPage.isInternalService ? 'passport' : '';

                        return pokeTarget(url, authentication);
                    })
                    ['catch'](function (e) {
                        UWA.log(e);
                    })
                    .then(function (response) {
                        var contentType = response && getHeader(response.headers, 'Content-Type');

                        if (url.slice(-4).toLowerCase() === '.pdf'
                            || typeof contentType === 'string' && (
                                contentType === 'application/pdf' || (
                                    WebPage.isInternalService
                                        && contentType.indexOf('application/octet-stream') > -1
                                )
                            )
                        ) {
                            WebPage.buildPdfViewer(url, authentication);
                        } else {
                            WebPage.buildWebpageViewer(url);
                            if (response && !hasValidCSP(response.headers)) {
                                WebPage.notify(nls.unsupportedContentSecurityPolicy);
                            }
                        }

                        if (!response) {
                            WebPage.notify(nls.unreachableUrl);
                        }
                    });

            }
        };
        widget.addEvents({
            onLoad: function(){
            	WebPage.setSubscribe();
            	WebPage.load;
            },
            onRefresh: WebPage.load,
            onUpdateValue: function(){
								
				dashboardCommon.setProjectbox();
				dashboardCommon.getProjectCode(WebPage.load);
            	WebPage.setSubscribe();
				
			}
        });

        return WebPage;
    });
