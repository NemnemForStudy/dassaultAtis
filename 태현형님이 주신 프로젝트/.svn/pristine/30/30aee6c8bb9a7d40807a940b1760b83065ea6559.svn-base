function executeWidgetCode() {
	require(['DS/decDashboardCommon/decDashboardEmbeded3DSpace', 'DS/WAFData/WAFData', 'DS/decDashboardCommon/decDashboardCommon', 'DS/PlatformAPI/PlatformAPI',
	'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices','UWA/Core','UWA/Utils'],
    	function (embeded3DSpace, WAFData, dashboardCommon, PlatformAPI,
    CompassPlatformServices, UWA, Utils) {
	        'use strict';
	        var myWidget = {
				topicName: "ProjectInfo",
	            alertContainer: {},
	            iframeContainer: {},
	            isInternalService: false,
	            readOnly: widget.readOnly,
	
	            bookmarklet: null,
	            queryStr: "jsp=../common/decDashBoardProjectProgressChart.jsp",
	            
				msgArr: new Array(),
				inputProjectCodeMsg: "<p>Please enter the project code into the Preference in the upper right corner.</p>",
				init: function() {
					// main widget에서 프로젝트 코드 지정 시 event catch
					PlatformAPI.subscribe("ProjectInfo", myWidget.setProjectCode);
					
					// dashboard url을 통해 프로젝트 코드 조회
					dashboardCommon.getProjectCode(myWidget.load);
					
					myWidget.setQueryStr("jsp=../common/decDashBoardProjectProgressChart.jsp");
				},
				load: function() {
					var url;

	                myWidget.destroyBookmarklet();
	                widget.body.empty();
	
	                url = myWidget.getUrl();
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
									var epcType = response["data"][0]["data"];
									
									if (!url) {
					                } else {
					                    myWidget.displayContentFromUrl(url,epcType);
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
	
	                widget.setTitle(widget.getValue('title'));
					},
				destroyBookmarklet: function () {
	                myWidget.bookmarklet && myWidget.bookmarklet.destroy();
	                myWidget.bookmarklet = null;
	            },
	            getUrl: function () {
					if(widget.getValue('projectCode')){
						var useUrl = null;
						if ( widget.getValue("widgetHost") )
						{
							useUrl = widget.getValue("widgetHost");
						}
						else
						{
							useUrl = widget.getUrl();
							useUrl = useUrl.substring(0, useUrl.indexOf('3dspace'));
						}
	                var urlProtocol, url = Utils.parseUrl(useUrl + "3dspace/webapps/decDashboardCommon/decDashboardEmbeded3DSpace.jsp?dashboard=true&projectCode=" + widget.getValue('projectCode') + "&EPCType=" + widget.getValue('EPCType') + (myWidget.queryStr !== null && myWidget.queryStr !== "" ? "&" + myWidget.queryStr : "")),
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

				setProjectCode: function (callData) {
					dashboardCommon.setProjectCode(callData, myWidget.load);
				},
				
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
	
	                myWidget.alertContainer = UWA.createElement('div', { 'class': 'alert-container' }).inject(widget.body);
	
					// added by thok 2023.09.25 [S]
	                
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
					
					// added by thok 2023.2023.09.25 [E]
					
					div.inject(widget.body);
	
	                myWidget.iframeContainer = UWA.createElement('div', {
	                    'class': 'iframe-container ' + (widget.getValue('scrolling') === 'no' ? '' : 'scrolling')
	                }).inject(widget.body);
	
	                // Determine if the URL belongs to a known internal service. If so, use authentication
	                getServices()
	                    .then(function (services) {
	                        myWidget.isInternalService = checkMatchingService(url, services);
	
	                        authentication = myWidget.isInternalService ? 'passport' : '';
	
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
	                                    myWidget.isInternalService
	                                        && contentType.indexOf('application/octet-stream') > -1
	                                )
	                            )
	                        ) {
	                            myWidget.buildPdfViewer(url, authentication);
	                        } else {
	                            myWidget.buildWebpageViewer(url);
	                            if (response && !hasValidCSP(response.headers)) {
	                                myWidget.notify(nls.unsupportedContentSecurityPolicy);
	                            }
	                        }
	
	                        if (!response) {
	                            myWidget.notify(nls.unreachableUrl);
	                        }
	                    });
	
	            },
	             buildPdfViewer: function (url, authentication) {
	                myWidget.alertContainer.empty();
	
	                require(['DS/W3DXComponents/PDFViewer'], function (PDFViewer) {
	                    var pdfViewer = new PDFViewer({
	                        url: url,
	                        requestsOptions: {
	                            'authentication': authentication,
	                            onFailure: function () {
	                                myWidget.buildWebpageViewer(url, true);
	                            }
	                        }
	                    });
	                    pdfViewer.render().inject(myWidget.iframeContainer);
	                    myWidget.alertContainer.classList.add('webpagereader-lower'); // push lower to avoid overlap with pdf topbar
	                });
	            },
	            buildWebpageViewer: function (url, asPdfFallback) {
	                var objectContainer, iframe;
	
	                widget.body.addClassName('no-padding');
	                myWidget.iframeContainer.empty();
	                myWidget.alertContainer.empty();
	
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
	                    objectContainer.inject(myWidget.iframeContainer);
	                } else {
	                    iframe.inject(myWidget.iframeContainer);
	                }
	
	                if (url.indexOf('http://') === 0) {
	                    myWidget.notify(nls.warningMessage, 'warning');
	                }
	                myWidget.alertContainer.classList.remove('webpagereader-lower');
	            },
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
	                            html: [UWA.createElement('span', { text: message })].concat(myWidget.readOnly ? [] : [
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
	                                            }).inject(myWidget.alertContainer, 'before');
	                                        }
	                                    }
	                                })
	                            ])
	                        }),
	                        className: alertType
	                    }]
	                }).inject(myWidget.alertContainer);
	            }
			};
	        
	        widget.addEvents({
	            onLoad: myWidget.init,
	            onRefresh: myWidget.load,
	            onConfigChange: myWidget.init,           
           		onUpdateValue: function(){
								
					dashboardCommon.setProjectbox();
					dashboardCommon.getProjectCode(myWidget.load);
            		//myWidget.setProjectCode();
					myWidget.init;
				}
       		});
	    }
	);
}
