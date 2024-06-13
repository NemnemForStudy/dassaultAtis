<%--  
  (c) Dassault Systemes, 1993 - 2020.  All rights reserved.
--%>
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="java.util.Map"%>
<%@page import="com.dec.util.DecMatrixUtil"%>
<%@page import="matrix.util.StringList"%>
<%@page import="matrix.db.Context"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.apps.domain.util.MapList"%>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:widget="http://www.netvibes.com/ns/">
<%
	response.setCharacterEncoding("utf-8");
	Context context = DecMatrixUtil.getAdminContext();
	MapList mlProject = DomainObject.findObjects(context, DecConstants.TYPE_PROJECT_SPACE, DecConstants.SYMB_WILD, DecConstants.EMPTY_STRING, new StringList(DecConstants.SELECT_NAME));
	Map<String, String> mProject = null;
	String sName = DecConstants.EMPTY_STRING;
	String sType = DecConstants.EMPTY_STRING;
	StringList slName = new StringList();
    for(Object oProject : mlProject){
    	mProject = (Map)oProject;
    	sType = mProject.get(DecConstants.SELECT_TYPE);
    	sName = mProject.get(DecConstants.SELECT_NAME);
    	if(DecStringUtil.equals(sType, DecConstants.TYPE_PROJECT_SPACE)){
        	slName.add(sName);
    	}
    }
%>
<head>

    <!-- Application Metas -->
    <title>Web Page Reader</title>
    <meta name="version" content="1.1" />
    <meta name="apiVersion" content="1.4" />
    <meta name="debugMode" content="false" />
    <meta name="autoRefresh" content="0" />
    <meta name="noSearchInWidgetUI" content="true" />

    <script type="text/javascript" src="../UIKIT/UIKIT.js"></script>
    <link rel="stylesheet" href="../UIKIT/UIKIT.css" type="text/css" />

    <script type="text/javascript" src="../AmdLoader/AmdLoader.js"></script>
    <link rel="stylesheet" type="text/css" href="../c/UWA/assets/css/standalone.css" />

    <script type="text/javascript" src="../c/UWA/js/UWA_Standalone_Alone.js"></script>
    <script type="text/javascript">
		define("DS/DelmiaWorksReader/DelmiaWorksReader_ko",{});
    	define("DS/DelmiaWorksReader/assets/nls/delmiaWorksReader",{
    		Title_html:"제목",
    		ProjectCode_html:"프로젝트 코드",
    		Width_html:"너비",
    		Height_html:"높이",
    		Scrolling_html:"웹 페이지 스크롤",
    		No_html:"아니요",
    		Auto_html:"자동",
    		SuppressMessages_html:"오류와 경고 메시지 표시 안 함",
    		SuppressBookmarklet_html:"북마클릿 알림 표시 안 함",
    		placeHolderEnterURL:"프로젝트 코드 입력",
    		submitURLBtn:"추가",
    		warningMessage:"브라우저에서 이 URL을 차단했을 수 있습니다. 이 경우 사용자 측에서 조치가 필요합니다.",
    		unsupportedContent:"콘텐츠 유형 {contentType}이(가) 지원되지 않습니다.",
    		unreachableUrl:"URL이 유효하지 않거나 이에 액세스할 수 없습니다.",
    		unsupportedContentSecurityPolicy:"URL이 표시되기를 적극적으로 거부하고 있습니다.",
    		doNotShowErrorsAgain:"다시 표시하지 않습니다.",<%for(String name : slName){%><%=XSSUtil.encodeForURL(name).replaceAll("[+%]", "").replaceAll("[-]","HyphenMinus")%>:"<%=name%>",<%}%>doNotShowErrorsAgainConfirmation:"이제부터 오류 메시지는 숨겨집니다."});
    </script>
    <script type="text/javascript">
    /* global widget, define */

    define('DS/decDashBoardProjectMain/decDashBoardProjectMain',
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

            'i18n!DS/DelmiaWorksReader/assets/nls/delmiaWorksReader',
            
            'i18n!DS/DelmiaWorksReader/DelmiaWorksReader_ko',

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

                /**
                 * Init the web page loading.
                 */
                load: function () {
                    var url;
                    
                    WebPage.destroyBookmarklet();
                    widget.body.empty();

                    WebPage.selectProject();
                    
                    WebPage.displayAddUrl();

                    widget.setTitle(widget.getValue('title'));
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
                    addUrlInput = new UIKITInputSelect({
    	                className: 'gr-input-select projectCode-input',
    	                placeholder: nls.placeHolderEnterURL,
    	                nativeSelect: true,
    	                options: [
    	                <% 
    	        	    for(String name : slName){
    	        	    %>
    	        	    {
    	        	    	value: "<%=XSSUtil.encodeForJavaScript(null, name) %>",
    	        	    	label: "<%=XSSUtil.encodeForJavaScript(null, name) %>",
    	        	    	selected: widget.getValue('projectCode') === "<%=XSSUtil.encodeForJavaScript(null, name) %>"
    	        	    },
    	        		<%}%>
    	                ],
    	                events: {
    	                    onChange: function () {
    	                        widget.setValue('projectCode', this.getValue()[0]);
    	                    }
    	                }
                    });

                    // 3 - the submit button
                    addUrlSubmit = new UIKitButton({
                        className: 'input-submit primary',
                        value: nls.submitURLBtn,
                        events: {
                            onClick: function (e) {
                                Event.stop(e);
                                var value = addUrlInput.getValue()[0].trim();
                                if (value) {
                                    widget.setValue('projectCode', value);
                                    WebPage.selectProject();
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
                selectProject: function () {
                    PlatformAPI.publish( "ProjectInfo", {
        				"projectCode" : "Config!" + widget.getValue('projectCode'),
        			});	
                },

                /**
                 * Process the URL and populate the widget content with either a
                 * normal HTML webpage or a PDF file (using a PDF reader).
                 * @param {String} url - Url to process and get the contend from.
                 */
                displayContentFromUrl: function (url) {
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
                            return s.replace(/([.*+?^=!:()|\[\]\/\\])/g, '\\$1');
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

            return WebPage;
        });
    </script>

    <widget:preferences>
        <widget:preference name="projectCode" type="list" label="ProjectCode_html" defaultValue="">
        <% 
        for(String name : slName){
        %>
            <widget:option value="<%=name%>" label="<%=XSSUtil.encodeForURL(name).replaceAll("[+%]", "").replaceAll("[-]","HyphenMinus")%>" />
        <%}%>
        </widget:preference>
        <widget:preference name="scrolling" type="list" label="Scrolling_html" defaultValue="auto">
            <widget:option value="no" label="No_html" />
            <widget:option value="auto" label="Auto_html" />
        </widget:preference>
        <widget:preference name="suppressMessages" type="boolean" label="SuppressMessages_html" defaultValue="false" />
        <widget:preference name="suppressBookmarklet" type="boolean" label="SuppressBookmarklet_html" defaultValue="false"/>
    </widget:preferences>

    <script type="text/javascript">
        /*global require, widget*/
        require([ 'DS/decDashBoardProjectMain/decDashBoardProjectMain' ], function(WebPage) {
            'use strict';
            widget.addEvents({
                onLoad: WebPage.load,
                onRefresh: WebPage.load
            });
        }
    );
    </script>
</head>
 <body></body>
</html>
