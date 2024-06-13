define('DS/EffectivityInlineEditor/EffectivityInlineEditor', [
    'DS/CfgBaseUX/scripts/CfgData',
    'DS/CfgBaseUX/scripts/CfgDialog',
    'DS/CfgBaseUX/scripts/CfgXMLServices',
    'DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext',
    'DS/Handlebars/Handlebars',
    'DS/UIKIT/Mask',
    'DS/CfgAutoCompleteComponent/Presenter/CfgAutoCompletePresenter',
    'DS/Controls/Accordeon',
    'DS/Controls/ComboBox',
    'DS/EffectivityInlineEditor/utils/CfgAutoCompleteUtils',
    'DS/EffectivityInlineEditor/utils/CommonUtils',
    'DS/EffectivityInlineEditor/utils/DictionaryUtils',
    'DS/CfgBaseUX/scripts/CfgUtility',
    'DS/CfgBaseUX/scripts/CfgController',
    'DS/CfgTracker/CfgTracker',
    'DS/CfgTracker/CfgDimension',
    'DS/CfgTracker/CfgValue',
    'text!DS/EffectivityInlineEditor/templates/MonoModelTemplate.html',
    'text!DS/EffectivityInlineEditor/templates/NoModelOpenedTemplate.html',
    'i18n!DS/EffectivityInlineEditor/assets/nls/EffectivityInlineEditor',
    'i18n!DS/CfgBaseUX/assets/nls/CfgBaseUXNLS',
    'css!DS/EffectivityInlineEditor/styles/EffectivityInlineEditor.css',
], function (
    CfgData,
    CfgDialog,
    CfgXMLServices,
    CfgAuthoringContext,
    Handlebars,
    Mask,
    AutoCompletePresenter,
    WUXAccordeon,
    WUXComboBox,
    CfgAutoCompleteUtils,
    CommonUtils,
    DictionaryUtils,
    CfgUtility,
    CfgController,
    Tracker,
    TrackerDimension,
    TrackerValue,
    MonoModelTemplate,
    NoModelOpenedTemplate,
    AppNLS,
    CfgCommonNLS
) {
    'use strict';

    var TEMPLATES = {
        MonoModel: Handlebars.compile(MonoModelTemplate),
        NoModelOpened: Handlebars.compile(NoModelOpenedTemplate),
    };

    var EffectivityInlineEditor = function () {};
    var createVarDialog_callback;

    EffectivityInlineEditor.prototype.init = function (options) {
        var that = this;
        var container = options.parentDiv;

        // Create a map to get current expressions from model name
        that.mapEffectivityExpressionFromModelName = {};
        options.varEffJsonWithLabel.effectivity.forEach(function (currentExpr) {
            that.mapEffectivityExpressionFromModelName[currentExpr.name] = currentExpr.Combinations;
        });

        // Create a map to get current evolution expressions from model name
        that.mapEvoExpressionFromModelName = {};
        options.varEffJsonWithLabel.effectivity.forEach(function (currentExpr) {
            that.mapEvoExpressionFromModelName[currentExpr.name] = currentExpr.evoExp;
        });

        // Create map to get model name and current expression from model ID
        that.mapModelInfosFromModelID = {};
        options.contextData.forEach(function (model) {
            var modelName = CommonUtils.getNameFromModelBasicData(model.basicData);
            var modelMarketingName = CfgUtility.getAttributeValue(model.data, 'Marketing Name'); //FUN102424:to use display name instead of name for model in inline editor
            if (Array.isArray(modelMarketingName)) modelMarketingName = modelMarketingName[0];

            that.mapModelInfosFromModelID[model.physicalID] = {
                id: model.physicalID,
                name: modelName,
                marketingName: modelMarketingName,
                currentExpressionRaw: that.mapEffectivityExpressionFromModelName[modelName] || [],
                currentEvoExpression: that.mapEvoExpressionFromModelName[modelName] || '',
                displayed: false,
            };
        });

        // Init the ActionBar containing the search for a Model and the add (+) icon (if more than 5 models)
        if (options.contextData.length > 5) {
            that.actionBarContainer = document.createElement('div');
            that.actionBarContainer.classList.add('effectivity-inline-editor-action-bar');
            container.appendChild(that.actionBarContainer);
            that.noModelOpenedPanel = container.appendChild(
                CommonUtils.createHTMLElementFromString(
                    TEMPLATES.NoModelOpened({
                        icon: options.iconModelURL,
                        text: AppNLS.NO_MODELS_MSG,
                    })
                )
            );
            that._createOrRefreshModelComboBox();
        } else {
            that.noActionBarMode = true;
        }

        if (options.contextData.length === 1) {
            // If only one model, just render the monoModelTemplate
            that.model = that.mapModelInfosFromModelID[Object.keys(that.mapModelInfosFromModelID)[0]];
            container.appendChild(CommonUtils.createHTMLElementFromString(TEMPLATES.MonoModel({ modelName: that.model.marketingName }))); //FUN102424 to use display name instead of name for model in inline editor

            // Create the clean effectivity icon and the AutoComplete component
            that.autoCompletePresenter = that._createAutoCompletePresenter(that.model);
            that._createCleanEffectivityIcon(container.querySelector('.effectivity-inline-editor-monomodel-header'), that.autoCompletePresenter);
            container.querySelector('.effectivity-inline-editor-monomodel-autocomplete-container').appendChild(that.autoCompletePresenter.container);

            // IR-911121-3DEXPERIENCER2022x
            // the following method execution will make the dropdown appear when the dialog is launched
            // but the dropdown will only be seen when the user manually clicks on the editor, hence the following method execution is stopped
            // that.focus();
        } else {
            // If multiple models, create a WUXAccordeon component
            that.accordeon = new WUXAccordeon({
                style: 'styled',
                exclusive: false,
            }).inject(container);
            that.accordeon.touchMode = true;

            // Listen to expand / collapse event and force overflow hidden on WUXAccordeon so AutoCompleteComponent is not cut
            that.accordeon.addEventListener('expand', function (data) {
                data.options.expanderTarget.elements.expanderContainer.classList.add('overflow-visible-override');
                data.options.expanderTarget.elements.bodyContainer.classList.add('overflow-visible-override');
            });
            that.accordeon.addEventListener('collapse', function (data) {
                data.options.expanderTarget.elements.expanderContainer.classList.remove('overflow-visible-override');
                data.options.expanderTarget.elements.bodyContainer.classList.remove('overflow-visible-override');
            });
            that.accordeon.elements.container.classList.add('effectivity-inline-editor-container');

            // Open all models already having an expression
            for (var key in that.mapModelInfosFromModelID) {
                if (that.mapModelInfosFromModelID.hasOwnProperty(key)) {
                    if (that.mapModelInfosFromModelID[key].currentExpressionRaw.length > 0 || that.noActionBarMode) {
                        that._addAutoCompleteSection(key);
                    }
                }
            }
        }
        EffectivityInlineEditor.instance = this;
    };

    /**
     * Returns back the current effectivities expression
     */
    EffectivityInlineEditor.prototype.getExpressions = function () {
        var that = this;

        if (that.autoCompletePresenter) {
            return CfgAutoCompleteUtils.getExpressions(that.autoCompletePresenter, that.model);
        } else {
            return CfgAutoCompleteUtils.getExpressions(that.accordeon);
        }
    };

    /**
     * Focus the corresponding AutoComplete component
     * @param {(number|string)} indexOrModelId - Focus the AutoComplete component of the corresponding accordeon index (if number) or model id (if string)
     * (In monomodel mode, no param is needed)
     */
    EffectivityInlineEditor.prototype.focus = function (indexOrModelId) {
        var that = this;

        if (that.accordeon === undefined) {
            // If in monomodel mode, just focus the only AutoCompleteComponent
            CfgAutoCompleteUtils.giveFocus(that.autoCompletePresenter);
        } else if (typeof indexOrModelId === 'number' && that.accordeon.items[indexOrModelId] !== undefined) {
            CfgAutoCompleteUtils.giveFocus(that.accordeon.items[indexOrModelId]._autoCompletePresenter);
        } else if (typeof indexOrModelId === 'string') {
            for (var i = 0; i < that.accordeon.items.length; i++) {
                if (that.accordeon.items[i]._model.id === indexOrModelId) {
                    CfgAutoCompleteUtils.giveFocus(that.accordeon.items[i]._autoCompletePresenter);
                    return;
                }
            }
        }
    };

    /**
     * Create or refresh the ComboBox from available model list
     */
    EffectivityInlineEditor.prototype._createOrRefreshModelComboBox = function () {
        var that = this;

        // There is no comboBox if only one model passed
        if (that.noActionBarMode) {
            return;
        }

        // Destroy old one (if existing)
        if (that.comboBoxModel !== undefined) {
            that.actionBarContainer.removeChild(that.comboBoxModel.elements.container);
        }

        // Create new ComboBox element
        that.comboBoxModel = new WUXComboBox({
            elementsList: CommonUtils.createWUXComboBoxElementListFromModelsMap(that.mapModelInfosFromModelID),
            enableSearchFlag: true,
            touchMode: true,
            placeholder: AppNLS.MODEL_ADD,
        }).inject(that.actionBarContainer);

        // Add listener for ComboBoxModel change event, create a new AutoCompletePresenter from selected Model
        that.comboBoxModel.addEventListener('change', function () {
            if (that.comboBoxModel.selectedIndex !== -1) {
                var selectedModelID = that.comboBoxModel.elementsList[that.comboBoxModel.selectedIndex].valueItem;
                that._addAutoCompleteSection(selectedModelID);
            }
        });
    };

    /**
     * Add an AutoComplete section (aka another Accordeon item) and remove the model from the available models list
     */
    EffectivityInlineEditor.prototype._addAutoCompleteSection = function (modelID, expandedByDefault) {
        var that = this,
            model = that.mapModelInfosFromModelID[modelID],
            modelName = model.name;

        // Hide the "No Model Opened" panel (if existing)
        if (!that.noActionBarMode) {
            that.noModelOpenedPanel.classList.add('hidden');
        }

        // Create the AutoCompletePresenter inside a new accordeon item
        // FUN102424 use display name instead of name for model in inline editor (model.marketingName)
        var autoCompletePresenter = that._createAutoCompletePresenter(model);
        var idAccordeonItem = that.accordeon.addItem({
            header: model.marketingName,
            expandedFlag: expandedByDefault || true,
            body: autoCompletePresenter.container,
            _autoCompletePresenter: autoCompletePresenter,
            _model: model,
        });
        that.accordeon._applyTouchMode(); // TODO : bug workaround, removable when WUX Accordeon is patched

        // Deactivate keydown and keyup event for 'Space' keycode to prevent accordeon for expanding / collapsing when user press 'Space'
        CommonUtils.stopPropagationForSpaceKeyupKeydownEvent(autoCompletePresenter.container);

        // Create clean effectivity & close icons (and corresponding event listener)
        var accordeonIconsContainer = document.createElement('div');
        accordeonIconsContainer.classList.add('accordeon-icons-container');
        that.accordeon.elements.expander.elements.expanderContainer.appendChild(accordeonIconsContainer);

        //[IR-1058759 08-Mar-2023] Need to add css for showing Autocomplete for multi-model scenario
        that.accordeon.elements.expander.elements.expanderContainer.classList.add('overflow-visible-override');
        that.accordeon.elements.expander.elements.bodyContainer.classList.add('overflow-visible-override');

        that._createCleanEffectivityIcon(accordeonIconsContainer, autoCompletePresenter);
        if (!that.noActionBarMode) {
            var closeIcon = CommonUtils.createFontIconElement('close', AppNLS.MODEL_RM);
            closeIcon.addEventListener('click', function () {
                that._removeAutoCompleteSection(modelID, idAccordeonItem);
            });
            that.accordeon.elements.expander.elements.header.appendChild(closeIcon);
            accordeonIconsContainer.appendChild(closeIcon);
        }

        // Tag model as displayed and refresh comboBox
        model.displayed = true;
        that._createOrRefreshModelComboBox();
    };

    /**
     * Remove an AutoComplete section (and tag the associated model as not displayed)
     */
    EffectivityInlineEditor.prototype._removeAutoCompleteSection = function (modelID, accordeonIdToDelete) {
        var that = this;

        // Remove passed model expression and refresh ComboBox
        that.mapModelInfosFromModelID[modelID].currentExpression = null;
        that.mapModelInfosFromModelID[modelID].displayed = false;
        that.accordeon.deleteItem(that.accordeon.getIndexFromId(accordeonIdToDelete));
        ++that.accordeon._id; // Prevent multiple expander with same id
        that._createOrRefreshModelComboBox();

        // Show the "No Model Opened" panel if no model displayed in accordeon
        if (that.accordeon.items.length === 0) {
            that.noModelOpenedPanel.classList.remove('hidden');
        }
    };

    /**
     * Create an AutoCompletePresenter component
     */
    EffectivityInlineEditor.prototype._createAutoCompletePresenter = function (model) {
        // Create a temporary dictionary from effectivity expression if the full dictionary is not available
        if (model.dico === undefined) {
            model.dico = DictionaryUtils.createPartialDictionaryFromEffectivityExpression(model.currentExpressionRaw);
            model._dicoMapped = DictionaryUtils.createMapsFromDico(model.dico);
        }

        // Construct current expression
        if (model.currentExpression === undefined) {
            if (model.currentExpressionRaw.length > 0) {
                model.currentExpression = CfgAutoCompleteUtils.convertEffectivityExpressionToCfgAutoCompletePresenterFormat(model.currentExpressionRaw, model._dicoMapped.byName);
            } else {
                model.currentExpression = null;
            }
        }

        // Init CfgAutoCompletePresenter
        var autoCompletePresenter = new AutoCompletePresenter({
            currentExpression: model.currentExpression,
            dictionary: model.dico,
            editable: true,
            minLengthBeforeSearch: 0,
            withAdvancedOperator: false,
        });
        autoCompletePresenter.render();

        // On first focus, get the full dictionary and update AutoCompletePresenter with it
        autoCompletePresenter._autocomplete.addEvent('onFocus', function () {
            if (!model.fullDicoAvailable) {
                // IR-911121-3DEXPERIENCER2022x
                // When the user clicks the editor, autoCompletePresenter will load the already constructed dropdown, but it is required to display the updated dropdown after the getModelDictionary ws execution, hence the dropdown is hidden before the ws call, and it will be again be shown after the drop down gets updated with the ws response
                autoCompletePresenter._autocomplete.onHideSuggests();

                Mask.mask(autoCompletePresenter._autocomplete.elements.container);
                DictionaryUtils.getModelDictionary(model).then(function () {
                    // Get full dictionary and refresh datasets
                    model.fullDicoAvailable = true;
                    autoCompletePresenter.model.set('dictionary', model.dico);
                    autoCompletePresenter.createMapDico();
                    CfgAutoCompleteUtils.refreshAutoCompleteDatasets(autoCompletePresenter);

                    var datasets = autoCompletePresenter._autocomplete.datasets;

                    for (var datasetCount = 0; datasetCount < datasets.length; datasetCount++) {
                        var currentDataSet = datasets[datasetCount];
                        if (currentDataSet.name == 'datasetoperator' || currentDataSet.name == 'datasetnot' || currentDataSet.name == 'OpeningSeparators' || currentDataSet.name == 'ClosingSeparators') continue;

                        //add names of variants and option groups in the dataset for the search engine to process
                        currentDataSet.items &&
                            currentDataSet.items.forEach(function (item) {
                                item.nameAttribute = model._dicoMapped.byId[item.id_].attributes._name;
                            });

                        currentDataSet.searchEngine = function (dataset, text) {
                            var matchingItems = [];

                            dataset.items &&
                                dataset.items.forEach(function (item) {
                                    if (item && (item.label.toLowerCase().contains(text.toLowerCase()) || item.nameAttribute.toLowerCase().contains(text.toLowerCase()))) {
                                        matchingItems.push(item);
                                    }
                                });

                            return matchingItems;
                        };
                    }

                    //[IR-994004 15-Nov-2022] need to check feature used to set Effectivity is present in dictionary.
                    let validFeaturesWithEvolution = true;

                    if (autoCompletePresenter.getExpression().length === 0) {
                        // Just in case effectivity expression had been reset before loading dictionary
                        model.currentExpression = null;
                    } else {
                        // Recreate current expression with full dictionary
                        model.currentExpression = CfgAutoCompleteUtils.convertEffectivityExpressionToCfgAutoCompletePresenterFormat(model.currentExpressionRaw, model._dicoMapped.byName);

                        //[IR-994004 15-Nov-2022] check Effectivity expression Features are available in Dictionary
                        if (model.currentExpression.items != undefined && model.currentExpression.items.length > 0) {
                            for (let Count = 0; Count < model.currentExpression.items.length; Count++) {
                                let item = model.currentExpression.items[Count];
                                if (item.id == '-1') {
                                    validFeaturesWithEvolution = false;
                                    break;
                                }
                            }
                        }
                    }
                    autoCompletePresenter.setExpression(model.currentExpression);
                    //[IR-994004 15-Nov-2022] Initialize component for valid expression only
                    if (validFeaturesWithEvolution == true) {
                        autoCompletePresenter.createInitialExpression();
                    }
                    CfgAutoCompleteUtils.giveFocus(autoCompletePresenter);

                    Mask.unmask(autoCompletePresenter._autocomplete.elements.container);
                });
            }
        });

        return autoCompletePresenter;
    };

    /**
     * Create the cleanEffectivityIcon and related listener
     */
    EffectivityInlineEditor.prototype._createCleanEffectivityIcon = function (container, autoCompletePresenter) {
        var cleanEffectivityIcon = CommonUtils.createFontIconElement('broom', AppNLS.EFF_CLEAR);
        cleanEffectivityIcon.addEventListener('click', function (e) {
            autoCompletePresenter.setExpression(null);
            autoCompletePresenter.createInitialExpression();
            e.stopPropagation();
            autoCompletePresenter._autocomplete.elements.input.focus();
        });
        container.appendChild(cleanEffectivityIcon);
    };

    /* This method is used to track cloud probes data for Edit Variant Effectivity operation.
     * @param {*} options contains Edit Variant Effectivity criteria selected by user to set Variant Effectivity.
     *
     * Output values Example send to TrackerAPI for tracking probes data as:
     * Cloud Probes for Edit Variant Effectivity scenario.
     * Personal Dimensions = {"pd1":"Product Structure","pd2":"Desktop","pd3":"Create","pd4":"Both","pd5":"Single"}
     * Personal Values = {"pv1":1,"pv2":1,"pv3":2,"pv4":5,"pv5":1,"pv6":3,"pv7":2,"pv8":1,"pv9":2,"pv10":9}
     * pd1  =   Edit_Variant_Effectivity_Widget             Possible values : ["Product Structure","Logical Product Definition","ENOVIA - Engineering Release Management","Requirement Structure","Manufacturing Items Management", "Web In Win",...]
     * pd2  =   Edit_Variant_Effectivity_Media              Possible values : ["Desktop","Tab","Mobile"] Device used to set Varint Effectivity
     * pd3  =   Edit_Variant_Effectivity_Mode               Possible values : ["Create","Edit"] User operation either create Variant Effectivity or modify Variant Effectivity
     * pd4  =   Edit_Variant_Authoring_Mode                 Possible values : ["Change", "Evolution", "Empty"] Authoring context mode during Edit Variant Effectivity operation
     * pd5  =   Edit_Variant_Effectivity_Type_Mode          Possible values : ["Single", "Multiple", "Inline"] Edit Variant Effectivity mode
     * pv1  =   Edit_Variant_No_Of_Model                    Possible values : [0 / 1 / 2 / 3 / 4 / ... ] Number of  model/s attached to Reference/s when Edit Variant Effectivity dialog is closed.
     * pv2  =   Edit_Variant_Reference                      Possible values : [1 / 2 / 3 / 4 / ...] Number of Reference/s on which  Edit Variant Effectivity operation is performed.
     * pv3  =   Edit_Variant_Total_No_Variant               Possible values : [0 / 1 / 2 / 3 / 4 / ...] Number of Variant/s used during  Edit Variant Effectivity operation to set Variant Effectivity.
     * pv4  =   Edit_Variant_Total_No_Variant_Value         Possible values : [0 / 1 / 2 / 3 / 4 / ...] Number of Variant Value/s used during  Edit Variant Effectivity operation to set Variant Effectivity.
     * pv5  =   Edit_Variant_Total_No_Option_Group          Possible values : [0 / 1 / 2 / 3 / 4 / ... ] Number of Option Group/s used during  Edit Variant Effectivity operation to set Variant Effectivity.
     * pv6  =   Edit_Variant_Total_No_Option                Possible values : [0 / 1 / 2 / 3 / 4 / ... ] Number of Option/s used during  Edit Variant Effectivity operation to set Variant Effectivity.
     * pv7  =   Edit_Variant_Total_No_Not_Operator          Possible values : [0 / 1 / 2 / 3 / 4 / ... ] Total number of Not operator during  Edit Variant Effectivity operation.
     * pv8  =   Edit_Variant_Complexity                     Possible values : [1 / 2 / 3 / 4 / ... ] Complexity of Variant Effectivity Expression during  Edit Variant Effectivity operation.
     * pv9  =   Edit_Variant_Dictionary_Features            Possible values : [1 / 2 / 3 / 4 / ... ] Total number of Variants and Option group present in dictionary.
     * pv10  =   Edit_Variant_Dictionary_Feature_Options    Possible values : [1 / 2 / 3 / 4 / ... ] Total number of Variant Values and Options present in dictionary.
     */
    EffectivityInlineEditor.sendEditVariantTrackerEvent = function (options) {
        let appID = '';
        let pd1Value = '';

        let pv1Value = options.noOfContext; //Number for Context attached to parent which are used to set Variant Effectivity
        let pv2Value = options.noOfReference; //Selected Reference count for Edit Variant. For Single Edit Variant noOfReference = 1
        let pv3Value = options.totalVariantLength; //Total number of Variant used for Edit Variant Effectivity operation
        let pv4Value = options.totalVariantValueLength; //Total number of Variant Values used for Edit Variant Effectivity operation
        let pv5Value = options.totalOptionGroupLength; //Total number of Option Group used for Edit Variant Effectivity operation
        let pv6Value = options.totalOptionLength; //Total number of Option used for Edit Variant Effectivity operation
        let pv7Value = options.totalNotOperatorLength; //Total number of NOT operator used during Edit Variant Effectivity operation
        let pv8Value = options.variantComplexity; //Complexity of Variant Expression
        let pv9Value = options.totalFeaturesLength; //Total number of Variants and Option group present in dictionary
        let pv10Value = options.totalFeatureOptionsLength; //Total number of Variant Values and Options present in dictionary

        if (options.mode == 'Native') {
            appID = 'Native';
            //From Native Web In Win, widget values are not assigned so default value for pd1Value = "Web In Win" is assigned.
            pd1Value = 'Web In Win';
        } else {
            appID = widget.data.appId;
            //Calling widget title from which Edit Evolution Effectivity dialog is opened.
            if (widget.options != undefined) pd1Value = widget.options.title;
            else pd1Value = 'ODT Environment';
        }

        //Read device used to perform Edit Evolution Effectivity operation.
        let pd2Value = Tracker.getDeviceUsedForOperation();

        let pd3Value = Tracker.ConfigOperationMode['CREATE'];
        if (options.variantMode == 'Edit') pd3Value = Tracker.ConfigOperationMode['EDIT'];

        //Read work under Authoring context mode during Edit Variant Effectivity operation
        let pd4Value = Tracker.AuthoringMode['EMPTY'];
        if (options.authoringMode != 'Empty') pd4Value = Tracker.AuthoringMode[options.authoringMode];

        //Edit Variant mode
        let pd5Value = Tracker.EditVariantMode['INLINE'];

        //Send details to TrackerAPI for Edit Variant Effectivity operation.
        Tracker.createEventBuilder({
            category: Tracker.Category['USAGE'],
            action: Tracker.Events['CLICK'],
            tenant: enoviaServerFilterWidget.tenant,
        })
            .setLabel(Tracker.Labels['EDIT_VARIANT_EFFECTIVITY'])
            .setAppId(appID)
            .addDimension(TrackerDimension.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_EFFECTIVITY_WIDGET, pd1Value)
            .addDimension(TrackerDimension.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_EFFECTIVITY_MEDIA, pd2Value)
            .addDimension(TrackerDimension.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_EFFECTIVITY_MODE, pd3Value)
            .addDimension(TrackerDimension.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_AUTHORING_MODE, pd4Value)
            .addDimension(TrackerDimension.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_EFFECTIVITY_TYPE_MODE, pd5Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_NO_OF_MODEL, pv1Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_REFERENCE_SELECTED, pv2Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_TOTAL_NO_VARIANT, pv3Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_TOTAL_NO_VARIANT_VALUE, pv4Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_TOTAL_NO_OPTION_GROUP, pv5Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_TOTAL_NO_OPTION, pv6Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_TOTAL_NO_NOT_OPERATOR, pv7Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_COMPLEXITY, pv8Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_DICTIONARY_FEATURES, pv9Value)
            .addPersonalValue(TrackerValue.EDIT_VARIANT_EFFECTIVITY.EDIT_VARIANT_DICTIONARY_FEATURE_OPTIONS, pv10Value)
            .send();
    };
    //Prepare data for Edit Variant Tracker Event
    EffectivityInlineEditor.callEditVariantTrackerEvent = function () {
        //Initialize probes options with number of attached context used to set Variant Effectivity
        let variantProbesOptions = {
            noOfContext: EffectivityInlineEditor.instance.ite_options.contextData.length,
        };

        //set mode value using enoviaServerFilterWidget.mode Dashbobard as Inline Edit Variant supported
        variantProbesOptions.mode = 'Dashboard';

        //set variantMode value Create or Edit using hasEffectivity property.
        variantProbesOptions.variantMode = 'Create';
        if (EffectivityInlineEditor.instance.cfgVarDialog && EffectivityInlineEditor.instance.cfgVarDialog.options.isInlineEmptyVariantEffectivity == false) variantProbesOptions.variantMode = 'Edit';

        //read keep Session Effectivity checkbox state
        variantProbesOptions.authoringMode = 'Empty';
        if (EffectivityInlineEditor.instance.ite_options.auth.headers.length > 0) {
            if (EffectivityInlineEditor.instance.ite_options.auth.headers[0].key == 'DS-Change-Authoring-Context') variantProbesOptions.authoringMode = 'CHANGE';
            else if (EffectivityInlineEditor.instance.ite_options.auth.headers[0].key == 'DS-Configuration-Authoring-Context') variantProbesOptions.authoringMode = 'EVOLUTION';
        }

        variantProbesOptions.noOfReference = 1;

        //Read total number of criteria selected
        variantProbesOptions.totalVariantLength = -1; //Default value for Inline Edit Variant for Total number of Variant used during Edit Variant Effectivity operation
        variantProbesOptions.totalVariantValueLength = -1; //Default value for Inline Edit Variant for Total number of Variant Value used during Edit Variant Effectivity operation
        variantProbesOptions.totalOptionGroupLength = -1; //Default value for Inline Edit Variant for Total number of Option Group used during Edit Variant Effectivity operation
        variantProbesOptions.totalOptionLength = -1; //Default value for Inline Edit Variant for Total number of Option used during Edit Variant Effectivity operation
        variantProbesOptions.totalNotOperatorLength = -1; //Default value for Inline Edit Variant for Total number of Not Operator used during Edit Variant Effectivity operation
        variantProbesOptions.variantComplexity = -1; //Default value for Inline Edit Variant for Variant Effectivity expression complexity
        variantProbesOptions.totalFeaturesLength = -1; //Default value for Inline Edit Variant for Total Variant and Option group in dictionary
        variantProbesOptions.totalFeatureOptionsLength = -1; //Default value for Inline Edit Variant for Total Variant Value and Option in dictionary

        EffectivityInlineEditor.sendEditVariantTrackerEvent(variantProbesOptions);
    };

    /**
     * //[IR-855307 07-Jun-2021] Created the inline Editor dialog function only for valid scenario.
     */
    (EffectivityInlineEditor.prototype.createVariantDialog = function () {
        CfgData.clear();
        // IR-940626-3DEXPERIENCER2022x
        // adding mode to the ite_options
        this.ite_options = {
            ...this.ite_options,
            mode: 'VariantInlineEditor',
        };
        this.cfgVarDialog = new CfgDialog(this.ite_options);
        this.ite_options.parentDiv = this.cfgVarDialog.container;
        this.cfgVarDialog.render();
        Mask.mask(this.cfgVarDialog.container);
    }),
        /*
    initVariantDialog function is used to initiate the dialog inline editor.
            //var ite_options = {
            //    'node': node,//actual model node of underlying app on which dialog is getting launched
            //    'contextData': null,// if context data is available or default null
            //    'varEffJsonWithLabel': null,//if effectivity json available or default null
            //    'parentDiv': null,// parent div ,required 
            //    'isInlineEmptyVariantEffectivity': false,//if variant efectivity is empty //default false
            //    'parentID': parentID,//parent id of instance
            //    'instanceID': instanceRelID,//instance id itself
            //    'mode': "ITEOnDashboard",//mode in which inline editor is getting launched ,default ITEOnDashboard for dashboard
            //    width: 800,//width of dialog
            //    height: 500,//height of dialog
            //    minHeight: 380,//minimum hight of dialog
            //    minWidth: 240,//minimum widht of dialog
            //    'iconModelURL': null,//if require different empty effectivity icon else by default null
            //    'auth': { 'headers': [] },//authoring context if any available else default object as shown.
            //    'dialogue': {//dialog details
            //        'header': EffectivityNLS.CFG_EDIT_VARIANT_HEADER + " - " + instanceLabel,//header of the dialog
            //        'target': widget.body,//dialog parent
            //        'buttonArray': null//buttons to display OK cancel with callback handlers
            //    }
            //}; 
    */

        (EffectivityInlineEditor.prototype.initVariantDialog = function (ite_options) {
            //var instanceRelID = node.options.relationid;
            //var instanceLabel = node.options.label;
            //var parentID = node._parentNode.options.resourceid;

            //// This is not Root
            //CfgEffectivityColumns.ite_options = {
            //    'node': node,
            //    'contextData': null,
            //    'varEffJsonWithLabel': null,
            //    'parentDiv': null,
            //    'isInlineEmptyVariantEffectivity': false,
            //    'parentID': parentID,
            //    'instanceID': instanceRelID,
            //    'mode': "ITEOnDashboard",
            //    width: 800,
            //    height: 500,
            //    minHeight: 380,
            //    minWidth: 240,
            //    'iconModelURL': null,
            //    'auth': { 'headers': [] },
            //    'dialogue': {
            //        'header': EffectivityNLS.CFG_EDIT_VARIANT_HEADER + " - " + instanceLabel,
            //        'target': widget.body,
            //        'buttonArray': null
            //    }
            //};
            if (CfgData && CfgData.isEditVariantEnabled === false) {
                CfgUtility.showwarning(CfgCommonNLS.Edit_Variant_Disabled, 'error');

                // IR-953815-3DEXPERIENCER2023x
                CfgData.cfgEffInlineEditorActionEvents.publish({
                    event: 'clearIteOptionsOnVarDialogClose',
                });

                return;
            }

            var that = this;
            that.ite_options = ite_options;

            var okCallback = null;
            if (that.ite_options.setVariantEffectivity) okCallback = that.ite_options.setVariantEffectivity;
            else okCallback = that.setVariantEffectivity;

            var cancelCallback = null;
            if (that.ite_options.cancelVariantDialog) cancelCallback = that.ite_options.cancelVariantDialog;
            else cancelCallback = that.cancelVariantDialog;

            that.ite_options.dialogue.buttonArray = [
                {
                    label: 'OK',
                    labelValue: AppNLS.Edit_Var_OK,
                    handler: okCallback,
                    className: 'primary',
                },
                {
                    label: 'Cancel',
                    labelValue: AppNLS.Edit_Var_Cancel,
                    handler: cancelCallback,
                    className: 'default',
                },
            ];

            createVarDialog_callback = function () {
                that.ite_options.contextData = null;
                var GCOI_options = {
                    parentID: that.ite_options.parentID,
                };
                var getConfiguredObjectInfoPromise = CfgUtility.getConfiguredObjectInfo(GCOI_options);

                getConfiguredObjectInfoPromise.then(
                    function (response) {
                        if (response == null || response == 'undefined') {
                            that.ite_options.contextData = null;
                        } else if (response.version == '1.2') {
                            that.ite_options.contextData = response.contexts.content.results;
                        }

                        if (that.ite_options.contextData == null || that.ite_options.contextData == 0) {
                            CfgUtility.showwarning(AppNLS.No_Model_Error, 'error');

                            // IR-953815-3DEXPERIENCER2023x
                            CfgData.cfgEffInlineEditorActionEvents.publish({
                                event: 'clearIteOptionsOnVarDialogClose',
                            });

                            //that.cancelVariantDialog();   //[IR-855307 07-Jun-2021] By default dialog creation avoided so cancelVariantDialog() is not required.
                            return;
                        }

                        //IR-959163
                        if (response.contexts.content.results[0] != undefined && response.contexts.content.results[0].notification != undefined && response.contexts.content.results[0].notification.code == 'unaccessible' && response.contexts.content.results[0].notification.type == 'ERROR') {
                            CfgUtility.showwarning(response.contexts.content.results[0].notification.message, 'error');
                            return;
                        }

                        if (response.version == '1.2' && response.enabledCriterias.feature == 'false') {
                            CfgUtility.showwarning(AppNLS.No_Variant_Crit_Error, 'error');

                            // IR-953815-3DEXPERIENCER2023x
                            CfgData.cfgEffInlineEditorActionEvents.publish({
                                event: 'clearIteOptionsOnVarDialogClose',
                            });
                            //that.cancelVariantDialog();   //[IR-855307 07-Jun-2021] By default dialog creation avoided so cancelVariantDialog() is not required.
                            return;
                        }

                        //Used to show context mis-match error message when root's attached configuration context and work under evolution authoring context are different
                        var contextCheckOptions = {};
                        contextCheckOptions.iResponse = response;
                        contextCheckOptions.iAuthoringContext = CfgAuthoringContext.get();
                        if (CfgUtility.getContextMisMatchCheck(contextCheckOptions) == true) {
                            CfgUtility.showwarning(CfgCommonNLS.CfgErrorContextMisMatch, 'error');
                            //that.cancelVariantDialog();   //[IR-855307 07-Jun-2021] By default dialog creation avoided so cancelVariantDialog() is not required.

                            // IR-953815-3DEXPERIENCER2023x
                            CfgData.cfgEffInlineEditorActionEvents.publish({
                                event: 'clearIteOptionsOnVarDialogClose',
                            });
                            return;
                        }

                        //console.log("Configured Objects/models loaded");
                        that.ite_options.varEffJsonWithLabel = null;
                        var GMFOI_Options = {
                            version: '1.3',
                            targetFormat: 'XML',
                            withDescription: 'YES',
                            view: 'All',
                            domains: 'All',
                            pidList: [that.ite_options.instanceID],
                        };
                        var getMultipleFilterableObjectInfoPromise = CfgUtility.getMultipleFilterableObjectInfo(GMFOI_Options);

                        getMultipleFilterableObjectInfoPromise.then(
                            function (eff_response) {
                                if (eff_response.expressions[that.ite_options.instanceID].status === 'ERROR' || eff_response.expressions[that.ite_options.instanceID].hasEffectivity === 'ERROR') {
                                    CfgUtility.showwarning(AppNLS.Service_Fail, 'error');
                                    //that.cancelVariantDialog();   //[IR-855307 07-Jun-2021] By default dialog creation avoided so cancelVariantDialog() is not required.

                                    // IR-953815-3DEXPERIENCER2023x
                                    CfgData.cfgEffInlineEditorActionEvents.publish({
                                        event: 'clearIteOptionsOnVarDialogClose',
                                    });
                                    return;
                                }

                                var isChangePromise = CfgUtility.isChangeControlled(that.ite_options.parentID);

                                isChangePromise.then(
                                    async function (change_response) {
                                        var cfg_auth_ctx = CfgAuthoringContext.get();
                                        if (cfg_auth_ctx && cfg_auth_ctx.AuthoringContextHeader) {
                                            for (var key in cfg_auth_ctx.AuthoringContextHeader) {
                                                that.ite_options.auth.headers.push({
                                                    key: key,
                                                    value: cfg_auth_ctx.AuthoringContextHeader[key],
                                                });
                                            }
                                            that.ite_options.cfg_auth_ctx = cfg_auth_ctx;
                                        }

                                        // IR-953815-3DEXPERIENCER2023x
                                        // Frozen check is done before opening the dialog, hence in case of error case, the dialog will not be opened
                                        if (!CfgUtility.isDefined(that.ite_options.cfg_auth_ctx)) {
                                            var frozenDetails = await CfgUtility.getFrozenCheck([
                                                {
                                                    instanceId: that.ite_options.instanceID,
                                                },
                                            ]).catch((error) => {
                                                //that.enable();
                                                // IR-953815-3DEXPERIENCER2023x
                                                // that.cancelVariantDialog();

                                                CfgUtility.showwarning(CfgCommonNLS.CfgInstancesBelongToFrozenEvolutionFailed, 'error');

                                                // IR-953815-3DEXPERIENCER2023x
                                                if (CfgData && CfgData.cfgEffInlineEditorActionEvents)
                                                    CfgData.cfgEffInlineEditorActionEvents.publish({
                                                        event: 'clearIteOptionsOnVarDialogClose',
                                                    });
                                                return;
                                            });
                                            if (frozenDetails && frozenDetails.length == 1 && frozenDetails[0].isFrozen == true) {
                                                CfgUtility.showwarning(CfgCommonNLS.CfgFrozenEvolutionMass, 'error');

                                                // IR-953815-3DEXPERIENCER2023x
                                                // that.cancelVariantDialog();
                                                CfgData.cfgEffInlineEditorActionEvents.publish({
                                                    event: 'clearIteOptionsOnVarDialogClose',
                                                });
                                                return;
                                            }
                                        }

                                        if (change_response == 'any') {
                                            //Change controlled
                                            if (that.ite_options.auth.headers.length > 0) {
                                                if (that.ite_options.auth.headers[0].key == 'DS-Change-Authoring-Context') {
                                                    //Applicability
                                                    var applicabilityPromise = new Promise(function (resolve, reject) {
                                                        var failure = function (tmp_response) {
                                                            reject(tmp_response);
                                                        };
                                                        var success = function (tmp_response) {
                                                            resolve(tmp_response);
                                                        };
                                                        var url = '/resources/modeler/change/changeaction/pid:' + that.ite_options.cfg_auth_ctx.change.id + '?applicability=1';
                                                        var inputJsonTxt = '';

                                                        CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/json', inputJsonTxt, success, failure, true);
                                                    });
                                                    applicabilityPromise.then(
                                                        function (applicability_response) {
                                                            //[IR-855307 07-Jun-2021] Inline Editor dialog should be created only for valid data.
                                                            that.createVariantDialog();
                                                            that.ite_options.evoEffXML = applicability_response.changeaction.applicability.expressionXML;
                                                            that.processVariantEffectivityAndLaunchDialog(eff_response);
                                                        },
                                                        function (error_response) {
                                                            that.enable();
                                                            CfgUtility.showwarning(AppNLS.Service_Fail, 'error');
                                                            CfgData.cfgEffInlineEditorActionEvents.publish({
                                                                event: 'clearIteOptionsOnVarDialogClose',
                                                            });
                                                        }
                                                    );
                                                } else if (that.ite_options.auth.headers[0].key == 'DS-Configuration-Authoring-Context') {
                                                    // If Parent Reference is Change controlled then Change Authoring Context must be defined
                                                    CfgUtility.showwarning(AppNLS.CC_AC_HDR_Error, 'error');

                                                    // IR-953815-3DEXPERIENCER2023x
                                                    if (CfgData && CfgData.cfgEffInlineEditorActionEvents) {
                                                        CfgData.cfgEffInlineEditorActionEvents.publish({
                                                            event: 'clearIteOptionsOnVarDialogClose',
                                                        });
                                                    }

                                                    //that.cancelVariantDialog();   //[IR-855307 07-Jun-2021] By default dialog creation avoided so cancelVariantDialog() is not required.
                                                    return;
                                                }
                                            } else {
                                                // If Parent Reference is Change controlled then Authoring Context must be defined
                                                CfgUtility.showwarning(AppNLS.CC_AC_HDR_Error, 'error');

                                                // IR-953815-3DEXPERIENCER2023x
                                                CfgData.cfgEffInlineEditorActionEvents.publish({
                                                    event: 'clearIteOptionsOnVarDialogClose',
                                                });
                                                //that.cancelVariantDialog();   //[IR-855307 07-Jun-2021] By default dialog creation avoided so cancelVariantDialog() is not required.
                                                return;
                                            }
                                        } else if (change_response == 'none') {
                                            //[IR-855307 07-Jun-2021] Inline Editor dialog should be created only for valid data.
                                            that.createVariantDialog();

                                            //Not Change controlled but must check if Authoring context is defined
                                            if (that.ite_options.auth.headers.length > 0) {
                                                if (that.ite_options.auth.headers[0].key == 'DS-Change-Authoring-Context') {
                                                    //Applicability
                                                    var applicabilityPromise = new Promise(function (resolve, reject) {
                                                        var failure = function (tmp_response) {
                                                            reject(tmp_response);
                                                        };
                                                        var success = function (tmp_response) {
                                                            resolve(tmp_response);
                                                        };
                                                        var url = '/resources/modeler/change/changeaction/pid:' + that.ite_options.cfg_auth_ctx.change.id + '?applicability=1';
                                                        var inputJsonTxt = '';

                                                        CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/json', inputJsonTxt, success, failure, true);
                                                    });
                                                    applicabilityPromise.then(
                                                        function (applicability_response) {
                                                            that.ite_options.evoEffXML = applicability_response.changeaction.applicability.expressionXML;
                                                            that.processVariantEffectivityAndLaunchDialog(eff_response);
                                                        },
                                                        function (error_response) {
                                                            that.enable();

                                                            // IR-953815-3DEXPERIENCER2023x
                                                            CfgUtility.showwarning(AppNLS.Service_Fail, 'error');
                                                            CfgData.cfgEffInlineEditorActionEvents.publish({
                                                                event: 'clearIteOptionsOnVarDialogClose',
                                                            });
                                                        }
                                                    );
                                                } else if (that.ite_options.auth.headers[0].key == 'DS-Configuration-Authoring-Context') {
                                                    //Session Effectivity
                                                    that.ite_options.evoEffXML = that.ite_options.cfg_auth_ctx.evolution.expression;
                                                    that.processVariantEffectivityAndLaunchDialog(eff_response);
                                                }
                                            } else {
                                                // Evolution Effectivity
                                                if (eff_response.expressions[that.ite_options.instanceID].hasEffectivity == 'YES' && eff_response.expressions[that.ite_options.instanceID].content.Evolution)
                                                    that.ite_options.evoEffXML = eff_response.expressions[that.ite_options.instanceID].content.Evolution.Current;
                                                that.processVariantEffectivityAndLaunchDialog(eff_response);
                                            }
                                        }
                                    },
                                    function (error_response) {
                                        if (document.getElementsByClassName('CfgITEOnDashboardDialog')[0]) {
                                            CfgUtility.showwarning(AppNLS.Service_Fail, 'error');

                                            // IR-953815-3DEXPERIENCER2023x
                                            CfgData.cfgEffInlineEditorActionEvents.publish({
                                                event: 'clearIteOptionsOnVarDialogClose',
                                            });
                                        }
                                    }
                                );
                            },
                            function (error_response) {
                                if (document.getElementsByClassName('CfgITEOnDashboardDialog')[0]) {
                                    CfgUtility.showwarning(AppNLS.Service_Fail, 'error');

                                    // IR-953815-3DEXPERIENCER2023x
                                    CfgData.cfgEffInlineEditorActionEvents.publish({
                                        event: 'clearIteOptionsOnVarDialogClose',
                                    });
                                }
                            }
                        );
                    },
                    function (error_response) {
                        if (document.getElementsByClassName('CfgITEOnDashboardDialog')[0]) {
                            CfgUtility.showwarning(AppNLS.Service_Fail, 'error');

                            // IR-953815-3DEXPERIENCER2023x
                            CfgData.cfgEffInlineEditorActionEvents.publish({
                                event: 'clearIteOptionsOnVarDialogClose',
                            });
                        }
                    }
                );
            };

            CfgController.init();

            if (widget) enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
            else enoviaServerFilterWidget.tenant = 'OnPremise';

            CfgUtility.populate3DSpaceURL().then(function () {
                CfgUtility.populateSecurityContext().then(function () {
                    CfgUtility.populateDisplayExpressionXSLT().then(function () {
                        //FUN122867
                        if (!CfgData.hasOwnProperty('isEditVariantEnabled')) {
                            CfgUtility.checkDecouplingActivation()
                                .then(function (response) {
                                    if (response && response.isEditVariantEnabled === false) {
                                        CfgData.isEditVariantEnabled = false;
                                        CfgUtility.showwarning(CfgCommonNLS.Edit_Variant_Disabled, 'error');

                                        // IR-953815-3DEXPERIENCER2023x
                                        CfgData.cfgEffInlineEditorActionEvents.publish({
                                            event: 'clearIteOptionsOnVarDialogClose',
                                        });
                                        return;
                                    } else {
                                        CfgData.isEditVariantEnabled = true;
                                    }
                                    that.checkPAndOAccess();
                                })
                                .catch(function () {
                                    CfgData.isEditVariantEnabled = true;
                                });
                        } else {
                            that.checkPAndOAccess();
                        }
                    });
                });
            });
        }),
        (EffectivityInlineEditor.prototype.checkPAndOAccess = function () {
            CfgUtility.getPAndOAccess(['GetVariant', 'SetVariant']).then(
                //IR-822862
                function (infoPAndOAccess) {
                    if (infoPAndOAccess.SetVariant == 'Not Granted') {
                        CfgUtility.showwarning(CfgCommonNLS.CfgMessageAccessRightsError, 'error');
                        // IR-953815-3DEXPERIENCER2023x
                        CfgData.cfgEffInlineEditorActionEvents.publish({
                            event: 'clearIteOptionsOnVarDialogClose',
                        });
                    } else {
                        createVarDialog_callback();
                    }
                }
            );
        }),
        (EffectivityInlineEditor.prototype.cancelVariantDialog = function () {
            EffectivityInlineEditor.instance = this;
            EffectivityInlineEditor.instance.cfgVarDialog.closeDialog();

            // IR-940626-3DEXPERIENCER2022x
            CfgData.cfgEffInlineEditorActionEvents.publish({
                event: 'clearIteOptionsOnVarDialogClose',
            });
        }),
        (EffectivityInlineEditor.prototype.setVariantEffectivity = function () {
            var XMLExpression = null;
            var output_json = EffectivityInlineEditor.instance.getExpressions();

            if (output_json.effectivity == 'ERROR') {
                CfgUtility.showwarning(AppNLS.Syntax_Error, 'error');

                //[IR-992657 12-Oct-2022] Need to enable Inline Edit Variant dialog after syntax error.
                let that = this;
                Mask.unmask(that.cfgVarDialog.container);

                // IR-953815-3DEXPERIENCER2023x
                CfgData.cfgEffInlineEditorActionEvents.publish({
                    event: 'clearIteOptionsOnVarDialogClose',
                });
                return;
            } else if (output_json.effectivity.length == 0) XMLExpression = '';
            else XMLExpression = CfgXMLServices.VariantJSONtoXMLConverter(output_json);

            //To avoid unset Effectivity web-service call for empty Effectivity
            if (XMLExpression == '' && EffectivityInlineEditor.instance.ite_options.isInlineEmptyVariantEffectivity == true) {
                EffectivityInlineEditor.instance.cfgVarDialog.closeDialog();
                return;
            }

            var wsOptions = null;
            if (EffectivityInlineEditor.instance.ite_options.auth.headers.length > 0) {
                wsOptions = {
                    operationheader: {
                        key: EffectivityInlineEditor.instance.ite_options.auth.headers[0].key,
                        value: EffectivityInlineEditor.instance.ite_options.auth.headers[0].value,
                    },
                };
            }

            var onCompleteCallBack = function (response) {
                //For Inline Text Editor mode, Variant Split details is calculated from web-service setVariantEffectivities.
                //when Work Under Change is enabled then Variant Effectivity is splited using web-service setVariantEffectivities.
                //splited Instance details is returned in web-service setVariantEffectivities response which need to be used for Refreshing Product Structure Editor widget
                var splitId = ' ';
                var existingId = ' ';
                var newId = ' ';
                if (response.GlobalStatus != undefined && response.GlobalStatus == 'SUCCESS') {
                    var result = response.results[0];
                    var existingDetails = result.existing;
                    var newDetails = result['new'];
                    if (existingDetails != undefined && existingDetails.pid != undefined) {
                        splitId = existingDetails.pid;
                        existingId = existingDetails.pid;
                        if (existingDetails.content != undefined && existingDetails.content.Variant != undefined) {
                            var xmlExistingValue = existingDetails.content.Variant;
                            response.results[0].existing.content.displayExpression = CfgUtility.getDisplayExpressionUsingXSLT(xmlExistingValue);
                        }
                    }

                    if (newDetails != undefined && newDetails.pid != undefined) {
                        //splitId = newDetails.pid; //Splited Id with new instances are not used. uncomment if using replaceNodes.
                        newId = newDetails.pid;
                        if (newDetails.content != undefined && newDetails.content.Variant != undefined) {
                            var xmlNewValue = newDetails.content.Variant;
                            response.results[0]['new'].content.displayExpression = CfgUtility.getDisplayExpressionUsingXSLT(xmlNewValue);
                        }
                    }
                }

                if (newId != ' ') {
                    CfgUtility.showwarning(AppNLS.CFG_Application_Refresh_For_Instance_Evolved, 'info');
                }

                if (EffectivityInlineEditor.instance.ite_options.postOKHandler) {
                    EffectivityInlineEditor.instance.ite_options.postOKHandler(response);
                }

                //response value is modified for event data to be sent so need to passsed after postCloseHandler
                if (response.GlobalStatus != undefined && response.GlobalStatus == 'SUCCESS') {
                    //Publish Effectivity modification event for updating Effectivity details
                    var refreshEventMessage = {
                        commandName: 'cfgInlineVariant',
                        widgetId: widget.id,
                        response: CfgUtility.getEventResponse(response),
                        data: {},
                    };

                    CfgUtility.publishPostProcessingEventForApplications(refreshEventMessage);
                }

                //successful operation message is shown for setVariantEffectivities response
                if ((response.GlobalStatus !== undefined && response.GlobalStatus == 'SUCCESS') || (response.unset !== undefined && (response.unset.Variant.status.toUpperCase() === 'SUCCESS' || response.unset.Variant.status.toUpperCase() === 'WARNING')))
                    CfgUtility.showwarning(AppNLS.Service_OK, 'success');
                else if (response.GlobalStatus !== undefined && response.GlobalStatus == 'ERROR' && response.results[0].errorDetails !== undefined) {
                    CfgUtility.showwarning(AppNLS.Service_Fail + ' ' + response.results[0].errorDetails, 'error');
                } else {
                    CfgUtility.showwarning(AppNLS.Service_Fail, 'error');
                }

                //Call Edit Variant Tracker event to send user selection for cloud probes.
                EffectivityInlineEditor.callEditVariantTrackerEvent();

                // IR-953815-3DEXPERIENCER2023x
                if (EffectivityInlineEditor.instance.cfgVarDialog) EffectivityInlineEditor.instance.cfgVarDialog.closeDialog();

                // IR-953815-3DEXPERIENCER2023x
                if (CfgData && CfgData.cfgEffInlineEditorActionEvents)
                    CfgData.cfgEffInlineEditorActionEvents.publish({
                        event: 'clearIteOptionsOnVarDialogClose',
                    });
            };

            var onFailureCallBack = function (error_response) {
                //console.log(response);
                EffectivityInlineEditor.instance.cfgVarDialog.closeDialog();
                if (CfgUtility.isDefined(error_response) && CfgUtility.isDefined(error_response.errorMessage)) {
                    CfgUtility.showwarning(AppNLS.Service_Fail + '\n' + error_response.errorMessage, 'error');

                    // IR-953815-3DEXPERIENCER2023x
                    CfgData.cfgEffInlineEditorActionEvents.publish({
                        event: 'clearIteOptionsOnVarDialogClose',
                    });
                }
                //IR-825515
                else {
                    CfgUtility.showwarning(AppNLS.Service_Fail, 'error');

                    // IR-953815-3DEXPERIENCER2023x
                    CfgData.cfgEffInlineEditorActionEvents.publish({
                        event: 'clearIteOptionsOnVarDialogClose',
                    });
                }
            };

            // IR-975255-3DEXPERIENCER2023x
            if (XMLExpression == '') {
                //unset effectivity
                //Variant Split Function (GA)
                var unsetList = [];
                unsetList.push(EffectivityInlineEditor.instance.ite_options.instanceID);
                var optionsJson = {
                    version: '1.0',
                    wsOptions: wsOptions,
                    unsetList: unsetList,
                    domain: 'Variant',
                };

                CfgUtility.unsetVariantEffectivities(optionsJson).then(
                    function (response) {
                        onCompleteCallBack(response);
                    },
                    function (error_response) {
                        onFailureCallBack(error_response);
                    }
                );
            } else {
                // set effectivity
                //[FUN126066 Enhance error messages for set effectivity web services] changed version to 1.1. //Variant Split Function (GA)
                var optionsJson = {
                    wsOptions: wsOptions,
                    version: '1.1',
                    domain: 'Variant',
                    view: 'All',
                    expressionList: [
                        {
                            pid: EffectivityInlineEditor.instance.ite_options.instanceID,
                            VariantContent: XMLExpression,
                        },
                    ],
                };

                CfgUtility.setVariantEffectivities(optionsJson).then(
                    function (response) {
                        onCompleteCallBack(response);
                    },
                    function (error_response) {
                        onFailureCallBack(error_response);
                    }
                );
            }
        }),
        (EffectivityInlineEditor.prototype.processVariantEffectivityAndLaunchDialog = async function (eff_response) {
            var that = this;
            var hasEffectivity = null;
            var effExpressionXml = '';

            var instanceID = that.ite_options.instanceID;
            var instObj = eff_response.expressions;

            //Check frozen Evolution Effectivity check and show error message
            //[IR-888047 29-Sep-2021] Added work under Authoring context empty check as --> that.ite_options.cfg_auth_ctx == undefined.
            //For Active Work under Authoring context, Frozen Evolution Check on reference Evolution Effectivity should be avoided.
            let evolExpression = '';
            if (CfgUtility.isDefined(instObj[instanceID].content) && CfgUtility.isDefined(instObj[instanceID].content.Evolution) && CfgUtility.isDefined(instObj[instanceID].content.Evolution.Current)) evolExpression = instObj[instanceID].content.Evolution.Current;

            // if (!CfgUtility.isDefined(that.ite_options.cfg_auth_ctx)) {
            //     var frozenDetails = await CfgUtility.getFrozenCheck([
            //         {
            //             instanceId: instanceID,
            //             evolutionXML: evolExpression,
            //         },
            //     ]).catch((error) => {
            //         //that.enable();
            //         that.cancelVariantDialog();
            //         CfgUtility.showwarning(CfgCommonNLS.CfgInstancesBelongToFrozenEvolutionFailed, 'error');
            //         return;
            //     });
            //     if (frozenDetails.length == 1 && frozenDetails[0].isFrozen == true) {
            //         CfgUtility.showwarning(CfgCommonNLS.CfgFrozenEvolutionMass, 'error');
            //         that.cancelVariantDialog();
            //         return;
            //     }
            // }
            if (instObj[instanceID].hasEffectivity === 'NO') {
                console.log('Has No Effectivity');
                hasEffectivity = false;
            } else if (instObj[instanceID].content.ConfigChange != null && instObj[instanceID].content.ConfigChange != 'undefined') {
                CfgUtility.showwarning(AppNLS.Legacy_Eff_Error, 'error');

                // IR-953815-3DEXPERIENCER2023x
                CfgData.cfgEffInlineEditorActionEvents.publish({
                    event: 'clearIteOptionsOnVarDialogClose',
                });
                that.cancelVariantDialog();
                return;
            } else if (instObj[instanceID].content.Variant == null || instObj[instanceID].content.Variant == '' || instObj[instanceID].content.Variant == 'undefined') {
                console.log('Evolution Effectivity might be set hence Variant would be null or undefined');
                hasEffectivity = false;
            } else {
                console.log('Decoupled Variant Effectivity');
                hasEffectivity = true;
                effExpressionXml = instObj[instanceID].content.Variant;
            }

            var varEffJson = null;
            var varDescJson = null;
            var tmpJson = { effectivity: [] };

            if (hasEffectivity == true) {
                varEffJson = CfgXMLServices.VariantXMLToJSONConverter(effExpressionXml);
                varDescJson = CfgXMLServices.VariantDescXMLtoJSONConverter(effExpressionXml);
            } else {
                that.ite_options.isInlineEmptyVariantEffectivity = true;
            }

            console.log('Effectivity Loaded for :' + instanceID);

            that.ite_options.evoExpJson = CfgXMLServices.EvolutionXMLtoJSONforFilterVariant(that.ite_options.evoEffXML);

            for (var cnt = 0; cnt < that.ite_options.contextData.length; cnt++) {
                var currentModel = that.ite_options.contextData[cnt];
                var nameVal = CfgUtility.getAttributeValue(currentModel.basicData, 'name');
                if (Array.isArray(nameVal)) nameVal = nameVal[0];

                var jsonAttrVal = { name: nameVal, Combinations: [], evoExp: '' };

                if (hasEffectivity == true) {
                    for (var i = 0; i < varEffJson.length; i++) {
                        var json = JSON.parse(varEffJson[i]);
                        if (json.name == nameVal) {
                            if (json.Combinations.length > 0) {
                                json = CfgUtility.fillVariantDictionaryWithDisplayName(json, varDescJson);
                                jsonAttrVal = json;
                            }
                            break;
                        }
                    }
                }

                if (that.ite_options.evoEffXML) {
                    that.ite_options.evoExpJson.contextsFilterXML.forEach(function (context) {
                        if (context.name == nameVal) {
                            jsonAttrVal.evoExp = context.expression;
                        }
                    });
                }
                tmpJson.effectivity.push(jsonAttrVal);
            }

            that.ite_options.varEffJsonWithLabel = tmpJson;
            that.ite_options.iconModelURL = enoviaServerFilterWidget.baseURL + '/common/images/I_Model_Thumbnail.png';
            //CfgEffectivityColumns.cfgVarEffectivityInlineEditor = new EffectivityInlineEditor();
            that.init(that.ite_options);

            Mask.unmask(that.cfgVarDialog.container);

            var iteDialog = document.getElementsByClassName('CfgITEOnDashboardDialog')[0];

            //Following check will handle the styling incase webUX dialog variable is false
            //if(this.CfgUXEnvVariables.isWUXDialogEnabled == false){
            //    iteDialog.setAttribute('style', iteDialog.getAttribute('style') + 'min-height:380px !important;min-width:240px !important;');     //AKE8COMMENT WEBUXDIALOG
            //    var iteBody = iteDialog.getElementsByClassName('modal-body')[0];
            //    iteBody.setAttribute('style', iteBody.getAttribute('style') + 'overflow-y:auto !important;');
            //}
        });

    return EffectivityInlineEditor;
});
