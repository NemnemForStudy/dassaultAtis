
/**
 * @overview GraphReader Screen Home.
 * @licence Copyright 2006-2015 Dassault Systèmes company. All rights reserved.
 * @version 1.0.
 */

/* global define */

define('DS/GraphReaderWdg/Screens/Home',
[
    // UWA
    'UWA/Core',
    'UWA/Event',

    // UIKIT
    'DS/UIKIT/Input/Button',
    'DS/UIKIT/Input/Text',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Input/Toggle',
    'DS/UIKIT/Alert',

    // W3DXComponents
    'DS/W3DXComponents/Views/GraphView',

    // GraphReaderWdg
    'DS/GraphReaderWdg/Screens/Screen',

    // NLS
    'i18n!DS/GraphReaderWdg/assets/nls/GraphReader'
],

/**
 * @module DS/GraphReaderWdg/Screens/Home
 *
 * @requires UWA/Core
 * @requires UWA/Event
 *
 * @requires DS/UIKIT/Input/Button
 * @requires DS/UIKIT/Input/Text
 * @requires DS/UIKIT/Input/Select
 * @requires DS/UIKIT/Input/Toggle
 * @requires DS/UIKIT/Alert
 *
 * @requires DS/W3DXComponents/Views/GraphView
 *
 * @requires DS/GraphReaderWdg/Screens/Screen
 *
 * @requires i18n!DS/GraphReaderWdg/assets/nls/GraphReader
 */
function (
    // UWA
    UWA,
    UWAEvent,

    // UIKIT
    UIKITButton,
    UIKITInputText,
    UIKITInputSelect,
    UIKITInputToggle,
    UIKITAlert,

    // W3DXComponents
    GraphView,

    // GraphReaderWdg
    ScreenAbstract,

    // NLS
    Nls
) {
    'use strict';

    var GRAPH_TYPE_LINE = GraphView.TYPE_LINE,
        // GRAPH_TYPE_COLUMN = GraphView.TYPE_COLUMN,
        // GRAPH_TYPE_PIE = GraphView.TYPE_PIE,
        // GRAPH_TYPE_DONUT = GraphView.TYPE_DONUT,
        GRAPH_TYPE_TABLE = GraphView.TYPE_TABLE,

        // CLASS
        DISABLED_CLASS = 'disabled',
        HAS_PLACEHOLDER_CLASS = 'hasPlaceholder',
        SHOW_CSV_SEPARATOR_INPUT_CLASS = 'show-csvseparator-input',

        VALUE_OPT = 'value',
        DIV = 'div';



    var Screen = ScreenAbstract.extend({

        /**
         * @constant {String} PLACEHOLER_DATA_INPUT - Placeholder for paste data textarea input.
         */
        PLACEHOLER_DATA_INPUT: '',



        /**
         * @property {Boolean} _hasPlaceholderDataInput - Is the paste data input placeholder is displayed.
         * @private
         */
        _hasPlaceholderDataInput: true,

        /**
         * @property {Object} _previewCheckData .
         * @private
         */
        _previewCheckData: null,

        /**
         * @property {DS/W3DXComponents/Views/GraphView} _previewExistingData.
         * @private
         */
        _previewExistingData: null,

        /**
         * @property {Object} _error.
         * @private
         */
        _error: {},

        /**
         * @property {DS/UIKIT/Alert} _alert.
         * @private
         */
        _alert: null,

        /**
         * @property {Integer} _checkInputTimeout.
         * @private
         */
        _checkInputTimeout: null,




        // =========================
        // PUBLIC API
        // =========================


        /**
         * Init the Home screen view.
         * @param {Object} options - Screen options hash.
         */
        init: function (options) {
            this._parent(options);

            this.PLACEHOLER_DATA_INPUT = this.Controller.CSV_STR_CATEGORIES + ' ; serie 1 ; serie 2\ncat 2013 ; 8 ; 3\ncat 2014 ; 9 ; 2';
        }, // End function init()


        /**
         * Set the error message to display.
         * @param {Object} error         - Error hash message.
         * @param {String} error.message - Message to display.
         * @param {String} error.type    - Type fo message (error, warrning, info).
         */
        setError: function (error) {
            this._error = error || {};
        }, // End function setError()


        /**
         * Set the csv separator input.
         * @param {String} csvSeparatorVal - Value of the csv separator.
         */
        setCsvSeparatorInput: function (csvSeparatorVal) {
            var form,
                els = this.elements;

            if (!this._isBuilt) {
                return;
            }

            form = els.form;

            els.csvSeparatorInput.select(csvSeparatorVal);

            if (this.Model.getPrefCsvSeparator()) {
                form.addClassName(SHOW_CSV_SEPARATOR_INPUT_CLASS);
            } else {
                form.removeClassName(SHOW_CSV_SEPARATOR_INPUT_CLASS);
            }
        }, // End function setCsvSeparatorInput()


        /**
         * Show the screen.
         * @param {Object}  options            - Hash options.
         * @param {Boolean} options.isReadOnly - Is the widget is readOnly.
         */
        show: function (options) {
            var els, existingDataRadio, existingDataCtn, pasteDataCtn, checkDataCtn,
                Model = this.Model,
                hasCurrentData = Model.hasCurrentData(),
                widgetUrl = Model.getPrefUrl(),
                widgetRefreshUrl = Model.getPrefRefreshUrl();

            options = options || {};

            if (options.isReadOnly) {
                this.View.showGraphScreen();
                return;
            }

            if (!this._isBuilt) {
                this._build();
                this._isBuilt = true;
            }

            // init vars
            els = this.elements;

            els.urlInput.setOption(VALUE_OPT, widgetUrl);
            els.refreshInput.setOption(VALUE_OPT, widgetRefreshUrl);

            if (hasCurrentData) {

                existingDataRadio = els.existingDataRadio;
                existingDataCtn = els.existingDataCtn;
                pasteDataCtn = els.pasteDataCtn;
                checkDataCtn = els.checkDataCtn;

                if (!this.View.hasAccessToExistingData()) {

                    // Show Url ctn.
                    els.enterUrlRadio.dispatchEvent('onClick');

                    // Hide other radio containers.
                    pasteDataCtn.hide();
                    checkDataCtn.hide();
                    existingDataCtn.hide();

                    // Hide Existing data radio.
                    existingDataRadio.hide();

                    // Remove existing data from paste data input.
                    this._setDataInputPlaceholder();

                } else {

                    this._setDataInputValue(Model.getPrefRawData());

                    if (!this.View.isDragging()) {
                        // Build data preview.
                        this._buildDataPreview();
                    }

                    // Show Existing Data container.
                    existingDataRadio.show();
                    existingDataCtn.show();
                    existingDataRadio.dispatchEvent('onClick');

                    // Hide other radio containers.
                    pasteDataCtn.hide();
                    els.dataUrlCtn.hide();
                    els.checkDataLinkCtn.hide();
                    checkDataCtn.hide();

                }
            }

            this._parent(options);

            this._displayErrorMessage();
        }, // End function show()


        /**
         * Destroy the screen.
         */
        destroy: function () {
            clearTimeout(this._checkInputTimeout);

            if (this._previewCheckData) {
                this._previewCheckData.destroy();
            }
            this._previewCheckData = null;

            if (this._alert) {
                this._alert.destroy();
            }
            this._alert = null;

            if (this._previewExistingData) {
                this._previewExistingData.destroy();
            }
            this._previewExistingData = null;

            this._error = {};

            this._parent();
        }, // End function destroy()





        // =========================
        // PRIVATE API
        // =========================


        /**
         * Check if the url has the http(s):// protocol.
         * @private
         * @param {String} url - Url to check.
         * @return {Boolean} TRUE if the url has the http(s) protocol.
         */
        _hasHttpsProtocol: function (url) {
            url = url || '';
            return url.test(new RegExp('https://', 'i'));
        },


        /**
         * Disable check data link.
         * @private
         */
        _disableCheckDataLink: function () {
            var els = this.elements;

            els.checkDataLink.addClassName(DISABLED_CLASS);
            els.checkDataCtn.hide();
        }, // End function _disableCheckDataLink()


        /**
         * Enable check data link.
         * @private
         */
        _enableCheckDataLink: function () {
            this.elements.checkDataLink.removeClassName(DISABLED_CLASS);
        }, // End function _enableCheckDataLink()


        /**
         * Fired when a radio input change.
         * @private
         */
        _onRadioChange: function () {
            var els = this.elements;

            els.checkDataCtn.hide();
            els.errorMessageCtn.hide();
        }, // End function _onRadioChange()


        /**
         * Check the url input.
         * @private
         * @param {Element} input - Url input DOM element;
         */
        _checkUrlInput: function (input) {
            var that = this;

            clearTimeout(that._checkInputTimeout);

            that._checkInputTimeout = setTimeout(function () {
                var els = that.elements,
                    nextBtn = els.nextBtn,
                    authCtn = els.authCtn,
                    authCheckBox = els.authCheckBox,
                    inputVal = input.value;

                if (inputVal) {
                    nextBtn.enable();
                    that._enableCheckDataLink();

                    if (that._hasHttpsProtocol(inputVal)) {
                        authCtn.show();
                    } else {
                        authCtn.hide();
                        authCheckBox.setCheck(false);
                    }
                } else {
                    nextBtn.disable();
                    that._disableCheckDataLink();
                    authCtn.hide();
                    authCheckBox.setCheck(false);
                }
            }, 300);
        }, // End function _checkUrlInput()


        /**
         * Check data input.
         * @private
         * @param {Element} input - Paste data textarea input DOM element;
         */
        _checkDataInput: function (input) {
            var that = this;

            clearTimeout(that._checkInputTimeout);

            that._checkInputTimeout = setTimeout(function () {
                var nextBtn = that.elements.nextBtn,
                    inputVal = input.value;

                if (inputVal) {
                    nextBtn.enable();
                    that._enableCheckDataLink();
                } else {
                    nextBtn.disable();
                }
            }, 300);
        }, // End function _checkDataInput()


        /**
         * Build the screen.
         * @private
         */
        _build: function () {
            var ctn, nextBtn, form, refreshCtn, dropZone, csvSeparatorCtn, errorMessageCtn,
                authCtn, csvSeparatorInput, urlInput, authCheckBox, refreshInput, dataUrlCtn,
                dataInput, pasteDataCtn, existingDataRadio, existingDataCtn, checkDataLink,
                checkDataLinkCtn, checkDataCtn,
                that = this,
                Model = that.Model,
                createElement = UWA.createElement,
                els = that.elements,
                hasCurrentData = Model.hasCurrentData(),
                widgetUrl = Model.getPrefUrl(),
                widgetRefreshUrl = Model.getPrefRefreshUrl(),
                widgetCsvSeparator = Model.getPrefCsvSeparator();

            // 1 - Main container of the screen.
            ctn = els.screenCtn = createElement(DIV, {
                'class': 'screen-home'
            }).inject(that.widgetBody);

            // 2 - Form.
            form = els.form = createElement('form', {
                'class' : 'form-data',
                events: {
                    submit: function (e) {
                        that._goToOptionsScreen();
                        UWAEvent.preventDefault(e);
                    }
                }
            }).inject(ctn);

            // Big title of the screen.
            form.addContent({
                tag: DIV,
                'class': 'big-title',
                html: Nls.homeScreenTitle
            });

            // Title for expected format.
            form.addContent({
                tag: DIV,
                'class': 'format-title',
                html: Nls.expectedFormat
            });

            errorMessageCtn = els.errorMessageCtn = createElement(DIV, {
                'class': 'error-message-ctn'
            }).inject(form);

            // 1st Radio: Enter Url.
            // ---------------------
            els.enterUrlRadio = new UIKITInputToggle({
                className: 'gr-input-radio primary',
                name: 'choice',
                label: Nls.titleUrlSection,
                checked: !hasCurrentData,
                events: {
                    onClick: function () {
                        this.check();

                        that._onRadioChange();

                        // Hide other radio containers.
                        pasteDataCtn.hide();
                        existingDataCtn.hide();

                        // Show Enter Url container.
                        dataUrlCtn.show();
                        checkDataLinkCtn.show();

                        csvSeparatorCtn.remove().inject(dataUrlCtn);

                        // Enable next btn if there is data inside data input else disable it.
                        if (urlInput.getValue()) {
                            nextBtn.enable();
                            that._enableCheckDataLink();
                        } else {
                            nextBtn.disable();
                            that._disableCheckDataLink();
                        }
                    }
                }
            }).inject(form);

            // Input graph url
            urlInput = els.urlInput = new UIKITInputText({
                className: 'gr-input-text url-input',
                placeholder: Nls.dataUrlPlaceholder,
                value: widgetUrl,
                attributes: {
                    autofocus: false,
                }
            });

            urlInput.getContent().addEvents({
                keyup: function () {
                    that._checkUrlInput(this);
                },
                change: function () {
                    that._checkUrlInput(this);
                }
            });

            // Auth checkbox
            authCheckBox = els.authCheckBox = new UIKITInputToggle({
                className: 'gr-input-checkbox primary',
                type: 'checkbox',
                label: Nls.usePlatformSSO,
                checked: Model.getPrefIsUrlAuth()
            });

            // Ctn auth url
            authCtn = els.authCtn = createElement(DIV, {
                'class': 'authbox-input-ctn',
                html: authCheckBox
            });

            // Display Auth checkbox if the saved url begins by https.
            if (that._hasHttpsProtocol(widgetUrl)) {
                authCtn.show();
            }

            // Input refresh url
            refreshInput = els.refreshInput = new UIKITInputSelect({
                className: 'gr-input-select refresh-input',
                placeholder: Nls.urlRefreshPlaceholder,
                nativeSelect: true,
                options: [{
                    value: 60000,
                    label: Nls.refresh1min,
                    selected: widgetRefreshUrl === 60000
                }, {
                    value: 300000,
                    label: Nls.refresh5min,
                    selected: widgetRefreshUrl === 300000
                }, {
                    value: 900000,
                    label: Nls.refresh15min,
                    selected: widgetRefreshUrl === 900000
                }, {
                    value: 1800000,
                    label: Nls.refresh30min,
                    selected: widgetRefreshUrl === 1800000
                }, {
                    value: 3600000,
                    label: Nls.refresh1h,
                    selected: widgetRefreshUrl === 3600000
                }, {
                    value: 18000000,
                    label: Nls.refresh5h,
                    selected: widgetRefreshUrl === 18000000
                }, {
                    value: 43200000,
                    label: Nls.refresh12h,
                    selected: widgetRefreshUrl === 43200000
                }, {
                    value: 86400000,
                    label: Nls.refresh1d,
                    selected: widgetRefreshUrl === 86400000
                }]
            });

            // Ctn refresh url
            refreshCtn = createElement(DIV, {
                'class': 'refresh-ctn flex',
                html: [{
                    tag: DIV,
                    'class': 'sub-title refresh-title',
                    text: Nls.RefreshInput
                }, {
                    tag: DIV,
                    'class': 'refresh-input-ctn',
                    html: refreshInput
                }]
            });

            // Input csv separator
            csvSeparatorInput = els.csvSeparatorInput = new UIKITInputSelect({
                className: 'gr-input-select csvseparator-input',
                placeholder: that.Controller.DEFAULT_CSV_STR_DELIMITER,
                nativeSelect: true,
                options: [{
                    value: ';',
                    label: '(;) ' + Nls.semicolon,
                    selected: widgetCsvSeparator === ';'
                }, {
                    value: ',',
                    label: '(,) ' + Nls.comma,
                    selected: widgetCsvSeparator === ','
                }],
                events: {
                    onChange: function () {
                        Model.setPrefCsvSeparator(this.getValue()[0]);
                    }
                }
            });

            // Ctn csv separator
            csvSeparatorCtn = els.csvSeparatorCtn = createElement(DIV, {
                'class': 'csvseparator-ctn flex',
                html: [{
                    tag: DIV,
                    'class': 'sub-title csvseparator-title',
                    text: 'CSV value separator'
                }, {
                    tag: DIV,
                    'class': 'csvseparator-input-ctn',
                    html: csvSeparatorInput
                }]
            });

            // Data Url container
            dataUrlCtn = els.dataUrlCtn = createElement(DIV, {
                'class': 'data-url-ctn',
                html: [urlInput, authCtn, refreshCtn, csvSeparatorCtn]
            }).inject(form);


            // 2sd Radio: Paste data or drop file
            // ----------------------------------
            els.pasteDataRadio = new UIKITInputToggle({
                className: 'gr-input-radio primary',
                name: 'choice',
                label: Nls.titleDataSection,
                events: {
                    onClick: function () {
                        this.check();

                        that._onRadioChange();

                        // Hide other radio containers.
                        dataUrlCtn.hide();
                        existingDataCtn.hide();

                        // Show Paste data container.
                        pasteDataCtn.show();
                        checkDataLinkCtn.show();

                        csvSeparatorCtn.remove().inject(pasteDataCtn);

                        // Enable next btn if there is data inside data input else disable it.
                        if (!that._hasPlaceholderDataInput && dataInput.getValue()) {
                            nextBtn.enable();
                            that._enableCheckDataLink();
                        } else {
                            nextBtn.disable();
                            that._disableCheckDataLink();
                            that._goToOptionsScreen({checkData: true});
                        }
                    }
                }
            }).inject(form);

            // Input past or drop data input.
            dataInput = els.dataInput = new UIKITInputText({
                multiline: true,
                className: 'gr-input-text gr-input-textarea ' + HAS_PLACEHOLDER_CLASS,
                rows: 4,
                value: that.PLACEHOLER_DATA_INPUT
            }).inject(form);

            dataInput.getContent().addEvents({
                blur: function () {
                    if (!dataInput.getValue()) {
                        that._setDataInputPlaceholder();
                    }
                },
                focus: function () {
                    if (that._hasPlaceholderDataInput) {
                        that._removeDataInputPlaceholder();
                    }
                },
                keyup: function () {
                    that._checkDataInput(this);
                },
                change: function () {
                    that._checkDataInput(this);
                }
            });

            dropZone = els.dropZone = createElement(DIV, {
                'class': 'drop-zone',
                text: Nls.fileDropZone
            }).inject(form);

            // Paste Data container
            pasteDataCtn = els.pasteDataCtn = createElement(DIV, {
                'class': 'paste-data-ctn',
                html: [dataInput, dropZone]
            }).inject(form);


            // 3rd Radio: Use existing data
            // ----------------------------
            existingDataRadio = els.existingDataRadio = new UIKITInputToggle({
                className: 'gr-input-radio primary existing-data-radio',
                name: 'choice',
                label: Nls.titleUseDataSection,
                checked: hasCurrentData,
                events: {
                    onClick: function () {
                        this.check();
                        nextBtn.enable();

                        that._onRadioChange();

                        // Hide other radio containers.
                        pasteDataCtn.hide();
                        dataUrlCtn.hide();
                        checkDataLinkCtn.hide();

                        // Show Existing Data container.
                        existingDataCtn.show();
                    }
                }
            }).inject(form);

            // Existing Data container
            existingDataCtn = els.existingDataCtn = createElement(DIV, {
                'class': 'existing-data-ctn',
                html: {
                    tag: DIV,
                    'class': 'data-preview-ctn',
                    html: {
                        tag: DIV,
                        'class': 'title',
                        text: Nls.titlePreview
                    }
                }
            }).inject(form);


            // Check data.
            // -----------
            checkDataLink = els.checkDataLink = createElement('span', {
                'class': 'check-data-link link ' + DISABLED_CLASS,
                html: {
                    tag: 'span',
                    'class': 'check-data-text',
                    text: Nls.linkCheckData
                },
                events: {
                    click: function () {
                        if (!this.hasClassName(DISABLED_CLASS)) {
                            that._goToOptionsScreen({checkData: true});
                        }
                    }
                }
            });

            checkDataLinkCtn = els.checkDataLinkCtn = createElement(DIV, {
                'class': 'check-data-link-ctn',
                html: checkDataLink
            }).inject(form);

            checkDataCtn = els.checkDataCtn = createElement(DIV, {
                'class': 'checkdata-preview-ctn',
                html: {
                    tag: DIV,
                    'class': 'title',
                    text: Nls.titlePreview
                }
            }).inject(form);

            // Next btn.
            // ---------
            nextBtn = els.nextBtn = new UIKITButton({
                className: 'gr-btn next-btn primary',
                value: Nls.chartOptsBtn,
                disabled: !(widgetUrl || hasCurrentData),
                events: {
                    onClick: function (e) {
                        UWAEvent.stop(e);
                        that._goToOptionsScreen();
                    }
                }
            });

            // Btn container to align btn to right.
            form.addContent({
                tag: DIV,
                'class': 'nav-btn-ctn',
                html: nextBtn
            });
        }, // End function _build()


        /**
         * Go to options screen.
         * @private
         * @param {Object}  options           - Hash options.
         * @param {Boolean} options.checkData - TRUE if User has clicked on check data link.
         */
        _goToOptionsScreen: function (options) {
            var pastedData, url, checkData,
                that = this,
                els = that.elements,
                urlInput = els.urlInput;

            /**
             * @private
             */
            function onFailure (options) {
                options = options || {};

                that._displayErrorMessage(
                    options.message || Nls.unknowError,
                    options.typeMessage
                );

                if (options.url) {
                    urlInput.setValue(options.url);
                }

                els.checkDataCtn.hide();
            } // End function onFailure()

            /**
             * @private
             */
            function onSuccess () {
                that._buildDataPreview(options);
            } // End function onSuccess()


            // ======================================
            // Start of function _goToOptionsScreen()
            // ======================================

            options = options || {};
            checkData = options.checkData;

            els.errorMessageCtn.hide();

            if (els.enterUrlRadio.isChecked()) {

                url = urlInput.getValue().trim();

                if (url) {
                    that.Controller.onSetUrl({
                        url: url,
                        isUrlAuth: els.authCheckBox.isChecked(),
                        refreshUrl: (els.refreshInput.getValue())[0],
                        checkData: checkData,
                        success: checkData ? onSuccess : null,
                        failure: onFailure
                    });
                } else {
                    urlInput.setValue('');

                    onFailure({
                        message: Nls.inputUrlEmpty,
                        typeMessage: that.View.ALERT_WARNING_CLASS,
                    });
                }

            } else if (els.pasteDataRadio.isChecked()) {

                pastedData = els.dataInput.getValue().trim();

                if (pastedData && (!that._hasPlaceholderDataInput || checkData)) {
                    that.Controller.onSetPasteData({
                        pasteData: pastedData,
                        checkData: checkData,
                        success: checkData ? onSuccess : null,
                        failure: onFailure
                    });
                } else {
                    that._setDataInputPlaceholder();

                    onFailure({
                        message: Nls.inputDataEmpty,
                        typeMessage: that.View.ALERT_WARNING_CLASS
                    });
                }

            } else if (els.existingDataRadio.isChecked() && that.Model.hasCurrentData()) {

                that.View.showOptionsScreen();

            }
        }, // End function _goToOptionsScreen()


        /**
         * Set placeholder into paste data input.
         * @private
         */
        _setDataInputPlaceholder: function () {
            var dataInput = this.elements.dataInput;

            dataInput.setValue(this.PLACEHOLER_DATA_INPUT);
            dataInput.getContent().addClassName(HAS_PLACEHOLDER_CLASS);
            dataInput.blur();
            this._hasPlaceholderDataInput = true;

            this._goToOptionsScreen({checkData: true});
        }, // End function _setDataInputPlaceholder()


        /**
         * Remove placeholder into paste data input.
         * @private
         */
        _removeDataInputPlaceholder: function () {
            var dataInput = this.elements.dataInput;

            dataInput.setValue('');
            dataInput.getContent().removeClassName(HAS_PLACEHOLDER_CLASS);
            this._hasPlaceholderDataInput = false;
        }, // End function _removeDataInputPlaceholder()


        /**
         * Set data into paste data input.
         * @private
         * @param {String} value - Data value to set into paste data input.
         */
        _setDataInputValue: function (value) {
            var dataInput = this.elements.dataInput;

            if (value) {
                dataInput.setValue(value);
                dataInput.getContent().removeClassName(HAS_PLACEHOLDER_CLASS);
                this._hasPlaceholderDataInput = false;
            }
        }, // End function _setDataInputValue()


        /**
         * Display error message.
         * @private
         * @param {String} message - Error message to display.
         * @param {String} type    - Type of the message.
         */
        _displayErrorMessage: function (message, type) {
            var errorMessageCtn;

            type = type || this._error.type || this.View.ALERT_ERROR_CLASS;
            message = message || this._error.message;

            if (!message) {
                return;
            }

            if (this._alert) {
                this._alert.destroy();
            }

            errorMessageCtn = this.elements.errorMessageCtn;

            this._alert = new UIKITAlert({
                className: 'alert',
                closable: true,
                visible: true,
                messages: message,
                messageClassName: type
            }).inject(errorMessageCtn);

            errorMessageCtn.show();

            this._error = {};
        }, // End function _displayErrorMessage()


        /**
         * Draw preview chart from provided data.
         * @private
         * @param {Object}  options           - Hash options.
         * @param {Boolean} options.checkData - TRUE if User has clicked on check data link.
         */
        _buildDataPreview: function (options) {
            var data, originalType, checkData,
                els = this.elements,
                dataPreview = {
                    xAxis: {
                        categories: []
                    },
                    type: GRAPH_TYPE_TABLE,
                    series: []
                };

            options = options || {};
            checkData = options.checkData;

            data = checkData ? this.Model.getCheckedData() : this.Model.getOriginalData();

            originalType = data.originalType || GRAPH_TYPE_LINE;

            // Test if the data type is a valid type before to try to draw the preview.
            if (!this.Controller.isValidType(originalType)) {
                this._displayErrorMessage(
                    this.Controller.replace(Nls.TypeChartNotValid, {typeGraph: originalType}),
                    this.View.ALERT_WARNING_CLASS
                );

                originalType = GRAPH_TYPE_LINE;
            }

            dataPreview.series = data.series;
            dataPreview.xAxis.categories = data.xAxis ? data.xAxis.categories || [] : [];

            try {
                dataPreview = this.Controller.convertDataType(
                    dataPreview,
                    originalType,
                    GRAPH_TYPE_TABLE, {
                        isPreview: true
                    }
                );
            } catch (e) {
                this._displayErrorMessage(Nls.errorParsingData);
            }


            if (checkData) {
                if (this._previewCheckData) {
                    this._previewCheckData.destroy();
                }

                this._previewCheckData = new GraphView(dataPreview).render().inject(els.checkDataCtn.show());
            } else {
                if (this._previewExistingData) {
                    this._previewExistingData.destroy();
                }

                this._previewExistingData = new GraphView(dataPreview).render().inject(els.existingDataCtn);
            }
        } // End function _buildDataPreview()
    });


    /**
     * Screen name.
     * @constant {String} NAME
     * @memberOf module:DS/GraphReaderWdg/Screens/Home
     */
    Screen.NAME = 'home';


    return Screen;
});
