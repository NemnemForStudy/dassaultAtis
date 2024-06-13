/**
 * @quickreview PAE6 22:01:06 IR-908929 PPD Testing issue fix + performance improvement.
 * @quickreview PAE6 21:11:17 IR-897808 To save mouse profile preferences on all tenants.
 */
define('DS/MePreferencesDialog/MePreferencesStaticDialog',
    ['UWA/Core',
        'DS/Controls/Toggle',
        'DS/Controls/ButtonGroup',
        'DS/WAFData/WAFData',
        'i18n!DS/MePreferencesDialog/assets/nls/translation',
        'DS/PlatformAPI/PlatformAPI',
        'DS/Notifications/NotificationsManagerUXMessages',
        'DS/Notifications/NotificationsManagerViewOnScreen',
        "DS/Controls/Tab",
        "DS/Controls/Editor",
        'DS/UWPClientCode/I18n',
        'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'
    ],
    function (UWA, WUXToggle,
        WUXButtonGroup, WAFData, mePrefUITranslation, PlatformAPI,
        NotificationsManagerUXMessages, WUXNotificationsManagerViewOnScreen,
        WUXTab, WUXEditor, I18n, i3DXCompassPlatformServices) {

        var GLOBAL_REPOSITORY = 0;
        var VISUALIZATION_REPOSITORY = 1;
        var LANGUAGE_PREFERENCE = 0;
        var NAVIGATION_MODE_PREFERENCE = 0;
        var REQUEST_BODY = null;
        var META_DATA_ENDPOINT = "/api/v1/preferences_metadata/enum_metadata";
        var READ_PREFERENCE_ENDPOINT = "/api/v1/preferences";

        var ERROR_NOTIF = {
            level: "error",
            title: mePrefUITranslation["Error.information"],
            sticky: false
        };

        var STATIC_LANG_VALUES = {
            "en": "English",
            "fr": "Français",
            "de": "Deutsch",
            "es": "Español",
            "cs": "čeština",
            "it": "Italiano",
            "ja": "日本語",
            "ko": "한국어",
            "pl": "Polskie",
            "pt-BR": "Português Brasileiro",
            "ru": "Pусский",
            "zh": "简体中文",
            "zh-TW": "繁體中文"
        };

        var DEBUG_STATIC_LANG_VALUES = {
            "devsymbol": "Symbol for Debug",
            "devkey": "NLS Key for Debug",
            "devtrace": "NLS Trace for Debug"
        };

        var DEBUG_LANG_VALS = ["devsymbol", "devkey", "devtrace"];

        var languageButtonGroupLeft = null;
        var languageButtonGroupRight = null;
        var mouseControlButtonGroup = null;
        var mainContainer = null;
        var languagePreferenceContainer = null;
        var mouseControlPreferenceContainer = null;
        var languageValuesContainerLeft = null;
        var languageValuesContainerRight = null;
        var mouseControlValuesContainer = null;
        var preferencesTabBar = null;

        window.notifs = NotificationsManagerUXMessages;
        WUXNotificationsManagerViewOnScreen.setNotificationManager(window.notifs);

        var mePrefDialog = function (options) {

            this._serviceURL = options.serviceURL;
            this._debugMode = options.debugMode;
            //Temp Code
            var repoArray = [
                {
                    "name": "Global",
                    "preferenceNames": [
                        "Language"
                    ]
                },
                {
                    "name": "VisualizationRepository",
                    "preferenceNames": [
                        "SWNavigationMode"
                    ]
                }
            ];
            var repoObj = { "repositories": repoArray };
            REQUEST_BODY = repoObj;

            this._languageSelectedValue = "";
            this._mouseControlSelectedValue = "";
            this._currentLanguage = "";
            buildView.call(this);
        }

        //Private
        async function readPrefEnumMetadata() {
            var me = this;
            var completeURL = me._serviceURL + META_DATA_ENDPOINT;
            return await callRestAPI.call(this, REQUEST_BODY, completeURL, 'POST').then((responseObject) => {
                createEnumView.call(this, responseObject);
                addEvents.call(this);
                return true;
            }).catch((errorInfo) => {
                window.notifs.addNotif(ERROR_NOTIF);
                return false;
            });
        }

        //Private
        async function readPrefValues() {
            var me = this;
            var completeURL = this._serviceURL + READ_PREFERENCE_ENDPOINT;
            return await callRestAPI.call(this, REQUEST_BODY, completeURL, 'POST').then((responseObject) => {
                setValues.call(this, responseObject);
                return true;
            }).catch((errorInfo) => {
                window.notifs.addNotif(ERROR_NOTIF);
                return false;
            });
        }

        mePrefDialog.prototype.getActiveTab = function () {
            return preferencesTabBar.value[0];
        };

        mePrefDialog.prototype.getUIContent = async function () {
            //await this.readPrefEnumMetadata();
            let rtVal = await readPrefEnumMetadata.call(this);
            if (rtVal) { //Set the preference(s), if the UI is populated
                let RC = await readPrefValues.call(this);
                if (!RC)   //Return empty UI content if pref values not received.
                    mainContainer = null;
            }
            else   //Return empty UI content if pref values not received.
                mainContainer = null;
            return mainContainer;
        };

        mePrefDialog.prototype.setMyProfileLang = async function () {
            var me = this;
            var passportURL = PlatformAPI.getApplicationConfiguration('app.urls.passport');
            if (passportURL) {
                var endPoint;
                if (passportURL.slice(-1) === '/')
                    endPoint = "my-profile/update/language/" + this._languageSelectedValue;
                else
                    endPoint = "/my-profile/update/language/" + this._languageSelectedValue;
                var completeURL = passportURL + endPoint;
                return await callRestAPI.call(this, null, completeURL, 'POST').then((responseObject) => {
                    var rep = JSON.parse(responseObject);
                    if (rep.code == 0)
                        return true;
                    else
                        return false;
                }).catch((errorInfo) => {
                    return false;
                });
            }
            else
                return false;
        };

        //Private
        function callRestAPI(requestBody, completeURL, methodType) {

            //To do in future: pass entire options object
            var dataInfo;
            var headersInfo;
            var typeInfo;
            if (requestBody) {
                dataInfo = JSON.stringify(requestBody);
                headersInfo = {
                    'Content-Type': 'application/json'
                };
                typeInfo = 'json';
            }
            var newProm = new Promise(function (resolve, reject) {
                WAFData.authenticatedRequest(completeURL, {
                    method: methodType,
                    type: typeInfo,
                    data: dataInfo,
                    headers: headersInfo,
                    onComplete: function (responseObject) {
                        resolve(responseObject);
                    },
                    onFailure: function (errorObject) {
                        reject(errorObject);
                    }
                });
            });
            return newProm;
        }

        //Private
        //Create Enum view here
        function createEnumView(responseEnumMetaData) {
            //Temp Code       
            var langVals = responseEnumMetaData.repositories[GLOBAL_REPOSITORY].preferences[LANGUAGE_PREFERENCE].values;

            if (this._debugMode) {
                UWA.merge(STATIC_LANG_VALUES, DEBUG_STATIC_LANG_VALUES);
                langVals = langVals.concat(DEBUG_LANG_VALS);
            }
            var langSequence = Object.keys(STATIC_LANG_VALUES);
            langSequence = langSequence.filter((val) => langVals.includes(val));
            //Create radio group for language
            languageButtonGroupLeft = new WUXButtonGroup({ type: "radio", fireOnlyFromUIInteractionFlag: true });
            for (var cnt = 0; cnt < Math.ceil((langSequence.length / 2)); cnt++) {

                if (mePrefUITranslation[langSequence[cnt] + ".Label"] && STATIC_LANG_VALUES[langSequence[cnt]]) {
                    let langLabel = mePrefUITranslation[langSequence[cnt] + ".Label"] + " (" + STATIC_LANG_VALUES[langSequence[cnt]] + ")";
                    let langToggle = new WUXToggle({ type: "radio", label: langLabel, value: langSequence[cnt] });
                    //For MePreference Page Objects. 
                    langToggle.getContent().setAttribute('data-MePreferencePageObjectUseOnly', langToggle.value);
                    languageButtonGroupLeft.addChild(langToggle);
                }

            }
            languageButtonGroupLeft.inject(languageValuesContainerLeft);

            languageButtonGroupRight = new WUXButtonGroup({ type: "radio", fireOnlyFromUIInteractionFlag: true });
            for (var cnt = Math.ceil((langSequence.length / 2)); cnt < langSequence.length; cnt++) {

                if (mePrefUITranslation[langSequence[cnt] + ".Label"] && STATIC_LANG_VALUES[langSequence[cnt]]) {
                    let langLabel = mePrefUITranslation[langSequence[cnt] + ".Label"] + " (" + STATIC_LANG_VALUES[langSequence[cnt]] + ")";
                    let langToggle = new WUXToggle({ type: "radio", label: langLabel, value: langSequence[cnt] });
                    //For MePreference Page Objects. 
                    langToggle.getContent().setAttribute('data-MePreferencePageObjectUseOnly', langToggle.value);
                    if (langSequence[cnt] == "pt-BR")
                        langToggle.getContent().getChildren()[1].setAttribute('style', "white-space:break-spaces");
                    languageButtonGroupRight.addChild(langToggle);
                }

            }
            languageButtonGroupRight.inject(languageValuesContainerRight);

            //Temp code
            var mouseControlVals = responseEnumMetaData.repositories[VISUALIZATION_REPOSITORY].preferences[NAVIGATION_MODE_PREFERENCE].values;

            //Create radio group for Mouse Control
            mouseControlButtonGroup = new WUXButtonGroup({ type: "radio" });
            for (var cnt = 0; cnt < mouseControlVals.length; cnt++)
                mouseControlButtonGroup.addChild(new WUXToggle({ type: "radio", label: mePrefUITranslation[mouseControlVals[cnt] + ".Label"], value: mouseControlVals[cnt] }));
            mouseControlButtonGroup.inject(mouseControlValuesContainer);

        }

        //Private
        //Exclude enum view and create rest of the UI
        function buildView() {


            mainContainer = new UWA.createElement('div', {
                'class': 'me-preference-panel'
            });

            //Language
            languagePreferenceContainer = new UWA.createElement('div', {
                'class': 'me-preference-panel-language-container'
            });

            languageValuesContainerLeft = new UWA.createElement('div', {
                'class': 'me-preference-panel-language-container-left'
            });

            languageValuesContainerRight = new UWA.createElement('div', {
                'class': 'me-preference-panel-language-container-right'
            });

            languageValuesContainerLeft.inject(languagePreferenceContainer);
            languageValuesContainerRight.inject(languagePreferenceContainer);

            //Mouse
            mouseControlPreferenceContainer = new UWA.createElement('div', {
                'class': 'me-preference-panel-mouse-control-container'
            });

            var mouseControlDesc = new WUXEditor({
                value: mePrefUITranslation["SWNavigationMode.PreferenceItem.desc"],
                requiredFlag: false,
                widthInCharNumber: 90,
                nbRows: 9,
                disabled: true
            });

            mouseControlDesc.getContent().getChildren()[0].setAttribute('style', "color:black;background-color:white");

            var mouseControlDescContainer = new UWA.createElement('div', {
                'class': 'me-preference-panel-mouse-control-container-desc'
            });

            mouseControlDesc.inject(mouseControlDescContainer);

            mouseControlValuesContainer = new UWA.createElement('div', {
                'class': 'me-preference-panel-mouse-control-container-values'
            });


            mouseControlDescContainer.inject(mouseControlPreferenceContainer);
            mouseControlValuesContainer.inject(mouseControlPreferenceContainer);

            preferencesTabBar = new WUXTab({
                displayStyle: "strip"
            });

            preferencesTabBar.add({
                label: mePrefUITranslation["Language.PreferenceItem.Name"],
                content: languagePreferenceContainer,
                isSelected: true,
                icon: {
                    iconName: "language",
                    fontIconFamily: WUXManagedFontIcons.Font3DS
                },
                value: 'LanguageTab'
            });
            preferencesTabBar.add({
                label: mePrefUITranslation["SWNavigationMode.PreferenceItem.Name"],
                content: mouseControlPreferenceContainer,
                icon: {
                    iconName: "mouse",
                    fontIconFamily: WUXManagedFontIcons.Font3DS
                },
                value: 'MouseControlTab'
            });

            preferencesTabBar.inject(mainContainer);

        }

        //Private
        function setValues(responseReadPrefData) {


            //Value received from DB
            var repostories = responseReadPrefData.repositories;
            var mouseControlValue = repostories[VISUALIZATION_REPOSITORY].preferences[NAVIGATION_MODE_PREFERENCE].value;
            //var languageControlValue = repostories[GLOBAL_REPOSITORY].preferences[LANGUAGE_PREFERENCE].value;
            var languageControlValue = I18n.getCurrentLanguage();
            this._currentLanguage = languageControlValue;
            this._languageSelectedValue = languageControlValue;
            //this._currentLanguage = repostories[GLOBAL_REPOSITORY].preferences[LANGUAGE_PREFERENCE].value;


            //validate if value is received from DB
            if (languageControlValue) {
                var langButtonList = languageButtonGroupLeft._getButtonList();
                var isFound = false;
                for (var cnt = 0; cnt < langButtonList.length; cnt++) {
                    if (langButtonList[cnt].value == languageControlValue) {
                        langButtonList[cnt].checkFlag = true;
                        isFound = true;
                        break;
                    }
                }
                if (!isFound) {
                    langButtonList = languageButtonGroupRight._getButtonList();
                    for (var cnt = 0; cnt < langButtonList.length; cnt++) {
                        if (langButtonList[cnt].value == languageControlValue) {
                            langButtonList[cnt].checkFlag = true;
                            break;
                        }
                    }
                }
            }

            if (mouseControlValue) {
                var mouseControlButtonList = mouseControlButtonGroup._getButtonList();
                for (var cnt = 0; cnt < mouseControlButtonList.length; cnt++)
                    if (mouseControlButtonList[cnt].value == mouseControlValue) {
                        mouseControlButtonList[cnt].checkFlag = true;
                        break;
                    }
            }
        }

        //Private
        function addEvents() {
            var me = this;
            if (languageButtonGroupLeft) {
                //Language Button Group Left
                languageButtonGroupLeft.addEventListener('change', function (e) {
                    me._languageSelectedValue = languageButtonGroupLeft.value[0];
                    languageButtonGroupRight.value = [];
                });
            }
            if (languageButtonGroupRight) {
                //Language Button Group Right
                languageButtonGroupRight.addEventListener('change', function (e) {
                    me._languageSelectedValue = languageButtonGroupRight.value[0];
                    languageButtonGroupLeft.value = [];
                });
            }
            if (mouseControlButtonGroup) {
                //Mouse Control Button Group
                mouseControlButtonGroup.addEventListener('change', function (e) {
                    me._mouseControlSelectedValue = mouseControlButtonGroup.value[0];
                });
            }
        }

        //PAE6: IR-897808 : 17 Nov 2021
        //To save mouse profile preferences on all tenants.
        /**
         * @private
         * */
        function loadAllPlatformIDs() {
            var newProm = new Promise(function (resolve, reject) {
                i3DXCompassPlatformServices.getPlatformServices({
                    onComplete: function (platformData) {
                        resolve(platformData);
                    },
                    onFailure: function (errorInfo) {
                        reject(errorInfo);
                    }
                });
            });
            return newProm;
        }

        mePrefDialog.prototype.writePreferences = async function (requestBody) {
            var platformDataObj;
            await loadAllPlatformIDs.call(this).then(function (platformData) {
                platformDataObj = platformData;
            });
            var len = platformDataObj.length;
            var completeURL = ""; 
            var allOK = true;
            for (var cnt = 0; cnt < len; cnt++) {
                if (platformDataObj[cnt].mepreferences) {
                    completeURL = platformDataObj[cnt].mepreferences + READ_PREFERENCE_ENDPOINT;
                    //PAE6 : 06 Jan 2022 : IR-908929                   
                    //PPD Testing issue fix + performance improvement.
                    callRestAPI.call(this, requestBody, completeURL, 'PUT').then((data) => {
                        return data;
                    }).catch((errorInfo) => {
                        allOK = false;
                        window.notifs.addNotif(ERROR_NOTIF);
                        return errorInfo;
                    });
                }
            }
            return allOK;
        };

        mePrefDialog.prototype.readPreferences = async function (requestBody) {
            var completeURL = this._serviceURL + READ_PREFERENCE_ENDPOINT;
            return await callRestAPI.call(this, requestBody, completeURL, 'POST').then(async (data) => {
                return data;
            }).catch((errorInfo) => {
                window.notifs.addNotif(ERROR_NOTIF);
                return errorInfo;
            });
        };

        //Prepare RequestBody for all preferences curently presented (expanded/nonexpanded) in panel.
        mePrefDialog.prototype.prepareRequestForWrite = function () {
            //Prepare JSON for write HTTP request
            //Temp code
            var me = this;
            /*var langSettings = {
                "name": "Language",
                "value": me._languageSelectedValue
            };*/
            var mouseControlSettings = {
                "name": "SWNavigationMode",
                "value": me._mouseControlSelectedValue
            };
            //var globalRepoPreferences = [];
            //globalRepoPreferences.push(langSettings);
            var VisualizationRepoPreferences = [];
            VisualizationRepoPreferences.push(mouseControlSettings);
            /*var globalRepository = {
                "name": "Global",
                "preferences": globalRepoPreferences
            };*/
            var visualizationRepository = {
                "name": "VisualizationRepository",
                "preferences": VisualizationRepoPreferences
            };
            var repositoryArray = [];
            //repositoryArray.push(globalRepository);
            repositoryArray.push(visualizationRepository);
            var requestBody = {
                "repositories": repositoryArray
            };
            return requestBody;
        };
        return mePrefDialog;
    });
