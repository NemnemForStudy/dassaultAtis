define('DS/MePreferencesDialog/MePreferencesUIProxyAdapter',
    ['DS/Windows/Dialog',
        'DS/Controls/Button',
        'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
        'DS/MePreferencesDialog/MePreferencesStaticDialog',
        'i18n!DS/MePreferencesDialog/assets/nls/translation',
        'DS/Windows/ImmersiveFrame',
        'DS/UWPClientCode/I18n',
        'UWA/Core',
        'DS/WebappsUtils/WebappsUtils'],
    function (WUXDialog, WUXButton,
        i3DXCompassPlatformServices, MePreferencesStaticDialog,
        mePrefProxyTranslation, WUXImmersiveFrame, I18n, UWA, WebappsUtils) {

        var serviceURL = "";
        var uiDialogContent = null;
        var uiDialog = null;
        var immersiveFrame = null;
        /**
         * @private
         */
        function removeImmersiveFrame() {
            //Get all immersive frames present in the application.
            var immFramesList = document.getElementsByClassName('wux-windows-immersive-frame');
            for (let it = 0; it < immFramesList.length; it++) {
                let immFrame = immFramesList[it];
                //Remove the immersive frame added for MePreferenceDialog 
                if (immFrame.dsModel.identifier == "me-preference-dialog-immersive-frame") {
                    immFrame.remove();
                    break;
                }
            }
            immersiveFrame = null;
        }

        /**
         * @private
         */
        function loadCSS() {
            var path = WebappsUtils.getWebappsBaseUrl() + "MePreferencesDialog/MePreferencesStaticDialog.css";
            var linkElem = new UWA.createElement('link', {
                'rel': 'stylesheet',
                'type': 'text/css',
                'href': path
            });
            document.getElementsByTagName('head')[0].appendChild(linkElem);
        }

        /**
         * @private
         */
        function loadServiceURL(platformId) {
            var me = this;
            var prom = new Promise(function (resolve, reject) {
                i3DXCompassPlatformServices.getServiceUrl({
                    serviceName: 'mepreferences',
                    platformId: platformId,
                    onComplete: function (urlData) {
                        resolve(urlData);
                    },
                    onFailure: function (errorInfo) {
                        reject(errorInfo);
                    }
                });
            });
            return prom;
        }

        /**
         * @private
         */
        function retrievePlatformId() {
            var webURL = window.location.href;
            var startPt = webURL.search("//");
            startPt += 2;
            var endPt = webURL.search("-");
            var platformID = webURL.substring(startPt, endPt);
            return platformID.toUpperCase();
        }

        /**
         * @private
         * */
        function isServiceAvailable() {
            var me = this;
            var newProm = new Promise(function (resolve, reject) {
                loadServiceURL.call(me, retrievePlatformId()).then((urlData) => {
                    serviceURL = urlData;
                    resolve(true);
                }).catch((errorInfo) => {
                    reject(false);
                });
            });
            return newProm;
        }

        /**
         * @private
         */
        function createModalDialog(immersiveFrame) {
            var me = this;
            uiDialog = new WUXDialog({
                immersiveFrame: immersiveFrame,
                title: mePrefProxyTranslation["Preferences.Title"],
                modalFlag: true,
                visibleFlag: false,
                position: {
                    my: "center",
                    at: "center",
                    of: immersiveFrame
                },
                movableFlag: false,
                identifier: "me-preference-dialog",
                buttons: {
                    Save: new WUXButton({
                        domId: "saveButton",
                        onClick: async function (e) {

                            //Check the value of the active tab.
                            var activeTabValue;
                            if (uiDialogContent) {
                                activeTabValue = uiDialogContent.getActiveTab();

                                //For mouse profile
                                if (activeTabValue == "MouseControlTab") {

                                    //Write preferences
                                    var req = uiDialogContent.prepareRequestForWrite();
                                    await uiDialogContent.writePreferences(req);

                                }

                                //For language profile
                                else if (activeTabValue == "LanguageTab") {

                                    //If language settings are changed then update cookies and reload the browser tab
                                    if (uiDialogContent._currentLanguage != uiDialogContent._languageSelectedValue) {
                                        //Set MyProfile Language
                                        await uiDialogContent.setMyProfileLang();
                                        //Set cookies
                                        I18n.setCurrentLanguage(uiDialogContent._languageSelectedValue);
                                    }

                                }

                                //Close
                                uiDialog.close();

                                //Remove Immersive Frame
                                removeImmersiveFrame();
                            }

                        }
                    }),
                    Close: new WUXButton({
                        domId: "closeButton",
                        onClick: function (e) {
                            //Close
                            uiDialog.close();

                            //Remove Immersive Frame
                            removeImmersiveFrame();
                        }
                    })
                }
            });
        }

        var mePrefProxy = {
            getPreferenceDialog: async function () {

                if (immersiveFrame)
                    return immersiveFrame;

                //Create ImmersiveFrame for WUXDialog
                immersiveFrame = new WUXImmersiveFrame({
                    identifier: 'me-preference-dialog-immersive-frame'
                });

                //Create Dialog
                createModalDialog.call(this, immersiveFrame);

                const urlParams = new URLSearchParams(window.location.search);
                const params = Object.fromEntries(urlParams.entries());
                var debugMode = false;
                if (params && params.debug === "")
                    debugMode = true;

                return isServiceAvailable.call(this).then(function (RC) {
                    if (RC) {    //getServiceURL call success       
                        //Valid service url retrieved successfully. 
                        if (serviceURL) {
                            //create mePrefDialogContent instance
                            uiDialogContent = new MePreferencesStaticDialog({ "serviceURL": serviceURL, "debugMode": debugMode });

                            //This will return Dialog content
                            return uiDialogContent.getUIContent().then((dialogContent) => {
                                if (dialogContent) {  //Dialog contents are not null

                                    uiDialog.content = dialogContent;
                                    
                                    //Close button "x" of dialog.
                                    var mePrefDialogCloseButton = uiDialog.elements._closeButton;
                                    mePrefDialogCloseButton.addEventListener('click', function () {
                                        //Remove Immersive Frame
                                        removeImmersiveFrame();
                                    });

                                    //Load CSS
                                    loadCSS();

                                    uiDialog.visibleFlag = true;

                                    //Return immersive frame
                                    return immersiveFrame;
                                }
                                else    //Dialog content is null probably because some other API calls to "mep" failed.                 
                                    return null;
                            });
                        }//URL retrieved is invalid (in case of invalid platformID)
                        else
                            return null;
                    }
                    else  //getServiceURL call fails
                        return null;
                });
            }

        };

        return mePrefProxy;
    });
