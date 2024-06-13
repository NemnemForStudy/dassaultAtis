define('DS/PCsBulkViewPresenter/js/Utils/PCsBulkViewPresenterUtils',[
    'UWA/Core',
    'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables'
],function(
    UWA,
    ConfiguratorVariables
){
    'use strict';
    var PCsBulkViewPresenterUtils = {};
    /**
        * convert from jsonModel format to solver format before sending to solver
        * @param {*} columnData from json model
        * @returns {Object}
        */
    PCsBulkViewPresenterUtils.buildSolverInputFormat = function(columnData) {
        var solverInputData;
        if (columnData && columnData.length > 0) {
            var configurationCriteria = [];
            for (var i = 0; i < columnData.length; i++) {
                var cellData = {};
                if(columnData[i].values){ // for Options
                    for(var j = 0; j<columnData[i].values.length; j++){
                        cellData = this.createCellDataInSolverFormat(columnData[i].values[j]);
                        if ( cellData.Id && cellData.Id.length > 0) {
                            configurationCriteria.push(cellData);
                        }
                    }
                }else if(UWA.is(columnData[i].title,'string') && !UWA.is(columnData[i].unit)){ // for Variant
                // Accept only 'Chosen' and 'Dismissed' state
                    cellData = this.createCellDataInSolverFormat(columnData[i]);
                    // Test if a value with 'Dismissed' state exists in the dropDown data => should be added too.
                    //Add the selected value in the DGv if exist
                    if(cellData.Id && cellData.Id.length > 0){
                        if (cellData.State){
                        // Add only 'Chosen' & 'Dismissed' state to solver input before check conflict
                            if(cellData.State === ConfiguratorVariables.Chosen || cellData.State === ConfiguratorVariables.Dismissed) {
                                configurationCriteria.push(cellData);

                            }
                        }
                    }
                }
                var dropDownMenu = columnData[i].dropDownData;
                if(dropDownMenu && dropDownMenu.length > 0){
                    for(var k=0; k<dropDownMenu.length; k++){
                        if(dropDownMenu[k].state === 'M'){
                        // Test if the value is already exist in solver input with 2 different state ( 'Dismissed' & 'Chosen')
                        // TO ensure that same value with two different states shouldn't be added to solver input
                            if(cellData.Id !== dropDownMenu[k].id){
                                var dropDownSingleData = this.createCellDataInSolverFormat(dropDownMenu[k]);
                                configurationCriteria.push(dropDownSingleData);
                            }
                        }
                    }
                }
            }
            solverInputData = {
                'configurationCriteria': configurationCriteria
            };
        }
        return solverInputData;
    };

     /**
       * convert from jsonModel format to solver format after sending the solver request
       * @param {*} columnData from json model
       * @param {boolean} saveDone flag to update the persistancy format of the parameter
       * @returns {Object}
       */
      PCsBulkViewPresenterUtils.buildPersistencyInputFormat = function(columnData, saveDone) {
        var configurationCriteria = [];
        if (columnData && columnData.length > 0) {

            for (var i = 0; i < columnData.length; i++) {
                if(columnData[i].values){ // options
                    for(var j = 0; j<columnData[i].values.length; j++){
                        configurationCriteria.push({
                            'id': columnData[i].values[j].id,
                            'status': this.fromStateToStatus('C')
                        });
                    }
                }else{
                    if(UWA.is(columnData[i].unit)) { // param
                      if(saveDone) {
                        // Title here is the value of the parameter
                        configurationCriteria.push({
                            'id': columnData[i].id,
                            'value': columnData[i].title,
                            'unit' : columnData[i].unit
                        });
                      } else {
                        if(columnData[i] && columnData[i].title){
                          var value = columnData[i].title + "";
                          if(columnData[i].unit !== ""){
                            value += ' ' + columnData[i].unit;
                          }
                          configurationCriteria.push({
                            'id': columnData[i].id,
                            'value': value
                          });
                        }
                      }

                    }else {  // variant
                        // Set 'Chosen' state with an exception for 'Dismissed' & 'Unselected'
                        if(columnData[i].state !== 'M' && columnData[i].state !== 'U'){
                            configurationCriteria.push({
                                'id': columnData[i].id,
                                'status': this.fromStateToStatus('C')
                            });
                        }
                    }
                }
            }
        }
        return configurationCriteria;
    };

    PCsBulkViewPresenterUtils.fromStateToStatus = function(state) {
        var status = "";

        if (state === 'C') {
            status = ConfiguratorVariables.Chosen;
        }else if (state === 'S') {
            status = ConfiguratorVariables.Selected;
        } else if (state === 'I') {
            status = ConfiguratorVariables.Incompatible;
        } else if (state === 'D') {
            status = ConfiguratorVariables.Default;
        } else if (state === 'R') {
            status = ConfiguratorVariables.Required;
        } else if(state === 'M'){
            status = ConfiguratorVariables.Dismissed;
        }else {
            status = ConfiguratorVariables.Unselected;
        }
        return status;
    };

    PCsBulkViewPresenterUtils.createCellDataInSolverFormat = function(columnData){
        var cellData = {};
        cellData = {
            'Id': columnData.id,
            'State': this.fromStateToStatus(columnData.state)
        };
        return cellData;
    };

    /**
       * convert the format of pc content to jsonmodel format
       * @param {Object} receivedData
       * @param {Object} variabilityValuesMap
       * @returns {cellObj} in json model format
       */
    PCsBulkViewPresenterUtils.buildJsonModelFormatForLoadedData = function(receivedData, variabilityValuesMap) {
        var cellObj = {};
        if (receivedData && receivedData.id) {
            if (variabilityValuesMap[receivedData.id]) {
                var variabilityValue = variabilityValuesMap[receivedData.id].variabilityValue;
                var rowID = variabilityValuesMap[receivedData.id].rowID;
                var type = variabilityValue.type;
                var image = variabilityValue.image;
                if (variabilityValue && rowID >= 0) {
                    cellObj.id = variabilityValue.id;
                    cellObj.rowID = rowID;
                    cellObj.type = type;
                    cellObj.image = image;
                    if (receivedData.value) {
                        cellObj.title = receivedData.value;
                        cellObj.unit = receivedData.unit;
                        cellObj.state = 'C';
                    } else if (receivedData.status) {
                        var state = this.convertCriteriaStateFormat(receivedData.status);
                        cellObj.state = state;
                        cellObj.stateValidity = variabilityValue.stateValidity;
                        cellObj.title = variabilityValue.title;
                    }
                }
            }
        }
        return cellObj;
    };

    /**
       * Convert solver State from solver format to jsonmodel format
       * @param {*} status
       * @returns {String} new state
       */
     PCsBulkViewPresenterUtils.convertCriteriaStateFormat = function(status) {
        var state;
        switch (status) {
            case ConfiguratorVariables.Chosen:
                state = 'C';
                break;
            case ConfiguratorVariables.Default:
                state = 'D';
                break;
            case ConfiguratorVariables.Required:
                state = 'R';
                break;
            case ConfiguratorVariables.Selected:
                state = 'S';
                break;
            case ConfiguratorVariables.Incompatible:
                state = 'I';
                break;
            case ConfiguratorVariables.Dismissed:
                state = 'M';
                break;
            default:
                state = 'U'; // for 'Unselected' if Config criteria is empty
                break;
        }
        return state;
    };

    // converts the solver configuration criteria to json model list
      // idList will filter the criteria if not undefined
      PCsBulkViewPresenterUtils.convertSolverConfigurationJson = function (configurationCriteria, idList, variabilityValuesMap, configCriteriaMap) {
        var criteriaList = [];
        if (configurationCriteria) {
            if (configurationCriteria.length > 0) {
                for (var i = 0; i < configurationCriteria.length; i++) {
                    var criteriaId = configurationCriteria[i].Id;

                    if(idList && idList.indexOf(criteriaId) < 0) {
                        continue;
                    }
                    if(variabilityValuesMap[criteriaId]) {
                        var criteriaState = configurationCriteria[i].State;
                        var configCriteriaState = this.convertCriteriaStateFormat(criteriaState);

                        var configCriteriaObj = variabilityValuesMap[criteriaId].variabilityValue;
                        if(configCriteriaMap && configCriteriaMap[criteriaId]){
                            configCriteriaObj.stateValidity = 'C';
                        }else{
                            configCriteriaObj.stateValidity = 'V'; // valid state by default
                        }
                        configCriteriaObj.rowID = variabilityValuesMap[criteriaId].rowID;
                        if (configCriteriaState) {
                            configCriteriaObj.state = configCriteriaState;
                        } else {
                            configCriteriaObj.state = 'U';
                        }

                        criteriaList.push(configCriteriaObj);
                    }
                }
            }
        }
        return criteriaList;
    };

    return PCsBulkViewPresenterUtils;
});

define('DS/PCsBulkViewPresenter/js/PCsBulkViewPresenter', [
    'UWA/Core',
    'DS/WAFData/WAFData',
    'DS/i3DXCompassServices/i3DXCompassServices',
    'DS/CoreEvents/ModelEvents',
    'DS/UIKIT/Badge',
    'DS/Utilities/Dom',
    'DS/Controls/SpinBox',
    'DS/UIKIT/Mask',
    'DS/xModelEventManager/xModelEventManager',
    'DS/CfgBulkTablePresenter/BulkEdition/Presenter/BulkTablePresenter',
    'DS/PCsBulkViewPresenter/js/Utils/PCsBulkViewPresenterUtils',
    'DS/CfgBulkTablePresenter/BulkEdition/Model/BulkTableModel',
    'DS/ConfiguratorPanel/scripts/Models/ConfiguratorModel',
    'i18n!DS/PCsBulkViewPresenter/assets/nls/PCsBulkViewPresenter',
    'i18n!DS/CfgBulkTablePresenter/assets/nls/BulkTablePresenter',
    'css!DS/PCsBulkViewPresenter/css/PCsBulkViewPresenter.css'
], function (
    UWA,
    WAFData,
    i3DXCompassServices,
    ModelEvents,
    Badge,
    Dom,
    SpinBox,
    Mask,
    xModelEventManager,
    BulkTablePresenter,
    PCsBulkViewPresenterUtils,
    BulkTableModel,
    ConfiguratorModel,
    _NLS_PCsBulkTablePresenter,
    _NLS_BulkTablePresenter) {
    'use strict';

    var COLUMN_ID_INDEX = 3;
    var CONSTANT_GET_CRITERIA_CONFIGURATION_INSTANCE = 'getCriteriaConfigurationInstances';
    var INVOKE_SERVICE = 'dspfl/invoke/dspfl:';
    var RESOURCE_WS_URL = '/resources/v1/modeler/';
    var STR_SERVICE_NAME = "3DSpace";
    var PCsBulkViewPresenter = BulkTablePresenter.extend({
        init: function (options) {
            if (!options) {
                options = {};
            }
            this._modelId = options.modelId;
            this._privateChannel = new ModelEvents();
            this._applicationChannel = options.applicationChannel || new ModelEvents();
            this._privateChannelForRules = options.privateChannelForRules || new ModelEvents();
            this._bulkTableModel = new BulkTableModel();
            this._withSolver = UWA.is(options.withSolver, 'boolean') ? options.withSolver : true;
            this._withStatusComputing = this._withSolver? true : false;
            this._withSuggestionComputing = false;
            if (!UWA.is(options.showEditAction, 'boolean')) {
                options.showEditAction = true;
            }
            if (!UWA.is(options.showCompareAction, 'boolean')) {
                options.showCompareAction = true;
            }
            this._solverKey = '';
            this._loadedPCs = {};
            this._pauseCheckConflictCall = false;
            this._arrayColumnIDsToCheck = [];
            this._arrayColumnIDsChecked = [];
            this._bufferFetchIds = [];
            this._bufferFetchPromises = [];
            this._selectedPCs = [];
            this._eventManager = new xModelEventManager(this._privateChannel, this._applicationChannel, this._privateChannelForRules);
            this._securityContext = options.securityContext;
            this._tenant = options.tenant;
            this._parent(options);
        },
        setModelVersion: function (modelVersionId) {
            this._modelId = modelVersionId;
        },
        setSecurityContext: function(securityContext){
            this._securityContext = securityContext;
        },
        setTenant: function(tenant){
            this._tenant = tenant;
        },
        loadVariabilityInfo: function (variabilityDictionary) {
            if (variabilityDictionary && variabilityDictionary.portfolioClasses) {

                this._variabilityDictionary = variabilityDictionary;
                this._initPCBulkModel();
                var bulkPresenterOptions = {
                    jsonModel: this._bulkTableModel._jsonModel,
                    COLUMN_ID_INDEX: COLUMN_ID_INDEX,
                    presenterState: 'preview-mode',
                    modelEvent: this._privateChannel,
                    statusBarOptions: {
                        totalColumnLabel: _NLS_PCsBulkTablePresenter.TotalProductConfigurations,
                        totalRowsLabel: _NLS_PCsBulkTablePresenter.TotalVariability,
                        withStatusInfo: this._withSolver, //true withStatusInfo
                        withStatusComputing: this._withStatusComputing, //true,
                        withSuggestionsComputing: this._withSuggestionComputing //false
                    },
                    setAsReferenceItem: true
                };
                if (this._container) {
                    this.destroy();
                    this._eventManager = new xModelEventManager(this._privateChannel, this._applicationChannel, this._privateChannelForRules);
                }
                this._createBulkTableDGV(bulkPresenterOptions);
                //for autocomplete implementation
                this.registerCellContent();
            }
        },
        _createBulkTableDGV: function (bulkPresenterOptions) {

            if (bulkPresenterOptions) {
                this._parent(bulkPresenterOptions);
            }
        },
        _initPCBulkModel: function () {
            var configModel = new ConfiguratorModel({});
            configModel.setDictionary(this._variabilityDictionary);
            var mapDicoPC = configModel.getDictionary();
            this._bulkTableModel.init(mapDicoPC);
        },
        _subscribeToEvents: function() {
            this._parent();
        },
        setColumnAsReference: function(cellInfos){
            this._parent(cellInfos);
        },
        unSetColumnAsReference: function(isChangeReference){
            this._parent(isChangeReference);
        },
        onTableUpdateStart: function () {
            this._parent();
        },
        onTableUpdateEnd : function () {
            this._parent();
        },
        fetchData: function (arraySelectedIds) {
            var that_ = this;
            return new Promise((resolve, reject) => {
                if (arraySelectedIds.length) {

                    // R14 do not overwhelm the server with fetch.
                    // When the loading Selected PCs function is busy
                    // push new entries to a buffer
                    if (UWA.is(that_._batchLoadingPromise)) {
                        that_._bufferFetchIds = that_._bufferFetchIds.concat(arraySelectedIds);
                        that_._bufferFetchPromises.push({
                            resolve: resolve,
                            reject: reject
                        });
                    } else {
                        Mask.mask(that_._container);
                        arraySelectedIds.forEach(function (pcObj) {
                            pcObj.modelID = that_._modelId;
                            that_._bulkTableModel.createColumn(pcObj);
                        });
                        // update list of selected Ids.
                        that_._selectedPCs = that_._selectedPCs.concat(arraySelectedIds);
                        that_._batchLoadingPromise = that_.batchLoading(arraySelectedIds).then(function () {
                            that_._batchLoadingPromise = null;
                            Mask.unmask(that_._container);
                            setTimeout(function () {
                                if (that_._bufferFetchIds.length) {
                                    that_.fetchData(that_._bufferFetchIds).then(function () {
                                        that_._bufferFetchPromises.forEach(function (mypromise) {
                                            mypromise.resolve();
                                        });
                                    });
                                    that_._bufferFetchIds = [];
                                }
                            });
                            resolve();
                        }, function (err) {
                            that_._batchLoadingPromise = null;
                            Mask.unmask(that_._container);
                            reject(err);
                        });
                    }
                } else {
                    reject(new Error("Empty List"));
                }
            });
        },
        /**
         * R14: to move to BulkTablePresenter
         * fetching content column by column after selection then checking conflict
         */
        batchLoading: function (arraySelectedIds) {
            var that = this;
            var selectedPCs = UWA.clone(arraySelectedIds, false); // doing shallow clone to avoid stack max side exceed issue
            var FinalPromise = new Promise((resolve, reject) => {
                var PromiseArray = [];
                if (arraySelectedIds.length)
                    PromiseArray.push(that.loadElement(arraySelectedIds.shift()));
                if (arraySelectedIds.length)
                    PromiseArray.push(that.loadElement(arraySelectedIds.shift()));
                if (arraySelectedIds.length)
                    PromiseArray.push(that.loadElement(arraySelectedIds.shift()));
                if (arraySelectedIds.length)
                    PromiseArray.push(that.loadElement(arraySelectedIds.shift()));

                if (PromiseArray.length) {
                    Promise.all(PromiseArray).then((values) => {
                        setTimeout(function () {
                            that._createColumnsForLoadedInfos(values, selectedPCs);
                            that.batchLoading(arraySelectedIds).then(
                                function () {
                                    resolve();
                                },
                                function (err) {
                                    reject(err);
                                }
                            );
                        });
                    });
                } else {
                    resolve();
                    if (!that._editionflag) {
                        that.checkConflictOfAllPCs();
                    }
                }
            });
            return FinalPromise;
        },
        loadElement: function (selectedPC) {
            var that = this;
            return new UWA.Promise(function(resolve,reject){
                that.getCriteriaConfigurationInstances({
                    id: selectedPC.id,
                    filerRejected:false
                }, function (data_success) {
                    UWA.log('Success');
                    resolve(data_success);
                }, function (data_failure) {
                    UWA.log('Failed' + data_failure);
                    reject();
                });
            });
        },
        _createColumnsForLoadedInfos: function (loadData, selectedPCs) {
            if (loadData) {

                var variabilityValuesMap = this._bulkTableModel.getVariabilityValuesMap();
                for (var i = 0; i < loadData.length; i++) {
                    if (loadData[i].member && UWA.is(loadData[i].member, 'array')) {
                        var dataReceived = loadData[i].member;
                        var configurationCriteria = [];
                        for (var j = 0; j < dataReceived.length; j++) {
                            var cellObj = PCsBulkViewPresenterUtils.buildJsonModelFormatForLoadedData(dataReceived[j], variabilityValuesMap);
                            configurationCriteria.push(cellObj);
                        }
                        var pcId = selectedPCs[i].id;
                        var columnID = this._bulkTableModel.getColumnID(pcId);
                        // push Id to check conflict
                        this._arrayColumnIDsToCheck.push(columnID);
                        if (columnID !== undefined) {
                            configurationCriteria = this._bulkTableModel.switchVariantToMultiSelection(configurationCriteria, columnID);
                            this._bulkTableModel.updateJsonModel(configurationCriteria, columnID);
                            var pcObj = this._bulkTableModel.getColumnHeader(columnID);
                            // create the column in dgv after getting the content
                            if (!this._loadedPCs[pcObj.id]) {
                                this._loadedPCs[pcObj.id] = pcObj;
                                this._createColumnForPC(pcObj);
                            }
                        }

                    }
                }

            }
        },
        _createColumnForPC: function (pcObj) {
            var that = this;

            if (pcObj) {

                var columnOptions = {
                    'dataIndex': pcObj.id,
                    'text': pcObj.title,
                    icon: pcObj.attributes.image,
                    'typeRepresentation': 'string',
                    sortableFlag: false,
                    editableFlag: this.isEditable(),
                    autoRowHeightFlag: true,
                    onCellRequest: function (cellInfos) {
                        var isEditable = that._dataGridView.layout.getColumnEditableFlag(cellInfos.columnID);
                        that._setCellContent(cellInfos, isEditable);
                    },
                    getCellValue: function (cellInfos) {
                        if (cellInfos.nodeModel) {
                            var matrix_columnID = cellInfos.columnID - COLUMN_ID_INDEX;
                            var matrix_rowID = cellInfos.rowID;
                            var cellObj = that._bulkTableModel.getMatrixCellData(matrix_columnID, matrix_rowID);
                            if (cellObj && cellObj.title) {
                                return cellObj.title;
                            }
                        }
                    },
                    setCellValue: function (cellInfos, value) {
                        that._privateChannel.publish({
                            event: 'pcsBulkEdit-on-change'
                        });
                        var rowID = cellInfos.nodeModel.options.grid.rowIndex;
                        var cellType = that._bulkTableModel.getCellType(cellInfos.rowID);
                        var checkConflictOfAllPC = true;
                        if (value !== undefined) {
                            if (cellType && cellType === 'Parameter') {
                                // in case of Param => do not check Conflict
                                checkConflictOfAllPC = false;
                            }
                            that._bulkTableModel.setMatrixCellData(cellInfos.columnID - COLUMN_ID_INDEX, rowID, value);
                        }
                        if (checkConflictOfAllPC) {
                            that.checkConflictOfPC(cellInfos.columnID - COLUMN_ID_INDEX).then(function (data) {
                                that.applySolverAnswer(data, cellInfos.columnID - COLUMN_ID_INDEX);
                                that.checkStatusOfPC(cellInfos.columnID - COLUMN_ID_INDEX).then(function (solverData) {
                                    that.applySolverAnswer(solverData, cellInfos.columnID - COLUMN_ID_INDEX);
                                    //update the UX
                                    that._updateDGVColumn(cellInfos.columnID);
                                });
                            });
                        }
                    }
                };
                this._dataGridView.addColumnOrGroup(columnOptions);
                var data = {
                    id: 'totalColumn',
                    text: _NLS_PCsBulkTablePresenter.TotalProductConfigurations + ' : ' + Object.keys(this._loadedPCs).length
                };
                this._updateStatusBar(data);
            }
        },

        removeLoadedPC: function (pcsToRemove) {
            if (pcsToRemove) {
                var arraySelectedPCs = pcsToRemove;
                if (UWA.is(pcsToRemove, 'array') === false) {
                    arraySelectedPCs = [pcsToRemove];
                }
                this._dataGridView.prepareUpdateView();
                for (var i = 0; i < arraySelectedPCs.length; i++) {
                    // deactivate show differences icon if we are removing the reference pc
                    var columnAsReference = this._bulkTableModel.getColumnHeader(this._bulkTableModel.getColumnID(arraySelectedPCs[i].id));
                    if (columnAsReference) {
                        if (columnAsReference.isAsReference) {
                            this._compareFlag = false;
                            this._privateChannel.publish({
                                event: 'enox-collection-toolbar-change-icon-action',
                                data: {
                                    id: 'compare-pc',
                                    fonticon: 'highlighter',
                                    text: _NLS_BulkTablePresenter.HighlightDifferences
                                }
                            });
                        }
                    }
                    this._bulkTableModel.removeColumn(arraySelectedPCs[i]);
                    delete this._loadedPCs[arraySelectedPCs[i].id];
                    this._dataGridView.removeColumnOrGroup(arraySelectedPCs[i].id);
                }
                var data = {
                    id: 'totalColumn',
                    text: _NLS_PCsBulkTablePresenter.TotalProductConfigurations + ' : ' + Object.keys(this._loadedPCs).length
                };
                // Unset column as reference and deactivate show differences icon if there is less than two columns left
                if (Object.keys(this._loadedPCs).length < 2 && this._compareFlag) {
                    this.unSetColumnAsReference(false);
                }
                this._updateStatusBar(data);
                this._dataGridView.pushUpdateView();
            }
        },

        removeAllLoadedPCs: function () {
            var that = this;
            if (this._loadedPCs && Object.keys(this._loadedPCs).length > 0) {
                Object.values(this._loadedPCs).forEach(function (pc) {
                    that.removeLoadedPC(pc);
                });
            }
        },
        getNbLoadedPCs: function () {
            return this._bulkTableModel.getAllColumnIDs().length;
        },
        _setCellContent: function (cellInfos, isEditable) {

            var component;
            var rowID = cellInfos.nodeModel.options.grid.rowIndex;
            cellInfos.rowID = rowID;
            var cellData = this.getCellData(cellInfos);
            var type = cellInfos.nodeModel ? cellInfos.nodeModel.getAttributeValue('type') : undefined;
            var referenceCellData;
            if (this._compareFlag) {
                referenceCellData = this.getReferenceCellData(cellInfos);
            }
            if (type) {
                // Variant , VariabilityGroup, Parameter

                cellInfos.cellView.setReusableContent(null);
                if (isEditable) {
                    if (type === 'Parameter') {
                        var paramData = this._bulkTableModel.getRowHeaderData(cellInfos.rowID);
                        var max = paramData.range[0].max;
                        var min = paramData.range[0].min;
                        var value = cellData.title;
                        if (value === '') {
                            value = undefined;
                        }
                        var edit = new SpinBox({
                            id: cellData.id,
                            value: value,
                            units: cellData.unit,
                            minValue: min.value,
                            maxValue: max.value,
                            stepValue: 1
                        });
                        component = edit;
                        if (referenceCellData) {
                            var referenceParam = referenceCellData.title + referenceCellData.unit;
                            value = cellData.title + cellData.unit;
                            if (referenceParam !== value) {
                                component.getContent().classList.add('highlight-parameter');
                            }
                        }

                    } else {
                        if (type === 'VariabilityGroup') {
                            component = this._dataGridView.reuseCellContent('_autoCompleteMultiple');
                            component.setTemplateOptions({
                                values: cellData.values,
                                referenceValues: referenceCellData ? referenceCellData.values : undefined,
                                items: cellData.dropDownData,
                                cellInfos: cellInfos
                            });
                        } else {

                            component = this._dataGridView.reuseCellContent('_autoComplete');
                            var dataIndex = this._dataGridView.layout.getDataIndexFromColumnIndex(cellInfos.columnID);
                            var id = cellData.id;
                            if (cellInfos.nodeModel.getAttributeValue(dataIndex)) {
                                id = cellInfos.nodeModel.getAttributeValue(dataIndex);
                            }
                            component.setTemplateOptions({
                                id: id,
                                referenceId: referenceCellData ? referenceCellData.id : undefined,
                                image: cellData.image,
                                value: cellData.title,
                                items: cellData.dropDownData,
                                multiSelect: false,
                                cellInfos: cellInfos,
                                stateValidity: cellData.stateValidity,
                                state: cellData.state
                            });
                        }
                    }


                } else {
                    if (type === 'VariabilityGroup') {
                        component = this._dataGridView.reuseCellContent('_valueMultiple');
                        component.setTemplateOptions({
                            items: cellData.values,
                            referenceValues: referenceCellData ? referenceCellData.values : undefined
                        });
                    } else {
                        // For variant in multi-selection, we display a multiple value badge
                        if (cellData.values) {
                            component = this._dataGridView.reuseCellContent('_valueMultiple');
                            component.setTemplateOptions({
                                items: cellData.values,
                                referenceValues: referenceCellData ? referenceCellData.values : undefined
                            });
                        } else {
                            // For variant & parameter, we display a single value badge for both
                            component = this._dataGridView.reuseCellContent('_valueSingle');
                            var title = "";
                            if (type === 'Parameter') {
                                if (cellData.title) {
                                    title = cellData.title;
                                    if (cellData.unit) {
                                        title += " " + cellData.unit;
                                    }
                                }
                            } else { //Variant
                                title = cellData.title;
                            }
                            component.setTemplateOptions({
                                id: cellData.id,
                                type: type,
                                referenceData: referenceCellData ? referenceCellData : undefined,
                                value: title,
                                icon: cellData.image,
                                state: cellData.state,
                                stateValidity: cellData.stateValidity
                            });
                        }
                    }
                }
            }

            if (component) {
                // set content
                if ((type && type === 'Parameter') && isEditable) {
                    cellInfos.cellView.setReusableContent(component);
                } else {
                    cellInfos.cellView.setReusableContent(component.getTemplateContent());
                    if (type) {
                        if (type === 'VariabilityGroup' || (type === 'Variant' && component.items)) {
                            this._dataGridView.layout.resetRowHeight(cellInfos.rowID);
                        }
                    }
                }
            } else {
                this._dataGridView.defaultOnCellRequest(cellInfos);
            }
        },


        getCellData: function (cellInfos) {
            var matrix_columnID = cellInfos.columnID - COLUMN_ID_INDEX;
            var matrix_rowID = cellInfos.rowID;
            return this._bulkTableModel.getMatrixCellData(matrix_columnID, matrix_rowID);
        },
        registerCellContent: function () {
            var that = this;
            var STATE_ICONS = {
                'C': '',
                'A': '',
                'S': 'lightbulb',
                'R': 'lock',
                'D': 'favorite-on',
                'I': 'block',
                'M': 'user-delete',
                'Conflict': 'alert'
            };

            this._dataGridView.registerReusableCellContent({
                id: '_valueSingle',
                buildContent: function () {
                    var content = UWA.createElement('div');
                    content.classList.add('single-value-content');
                    var badges = {
                        setTemplateOptions: function (option) {
                            this.id = option.id;
                            this.referenceData = option.referenceData;
                            this.icon = option.icon;
                            this.state = option.state;
                            this.type = option.type;
                            this.stateValidity = option.stateValidity;
                            this.label.textContent = '';
                            var value = option.value;
                            if (this.state) {
                                if (this.state === 'C' || this.state === 'R' || this.state === 'D') {
                                    this.stateBtn.setContent(Dom.generateIcon(STATE_ICONS[this.state]));
                                    if (this.icon && value) {
                                        this.label.textContent = value;
                                        this.iconBtn.setContent(Dom.generateIcon({
                                            iconPath: this.icon,
                                            iconSize: {
                                                width: '25px',
                                                height: '22px'
                                            }
                                        }));
                                        this.iconBtn.setStyle('visibility', 'visible');
                                        this.stateBtn.setStyle('visibility', 'visible');
                                        content.addContent(this.iconBtn);
                                        this.label.setStyle('padding-left', '0px');
                                    }
                                    if (this.state === 'R' || this.state === 'D') {
                                        content.addContent(this.stateBtn);
                                        this.label.setStyle('padding-left', '5px');
                                    }
                                } else {
                                    this.iconBtn.setStyle('visibility', 'hidden');
                                    this.stateBtn.setStyle('visibility', 'hidden');
                                }
                            }

                            if (this.stateValidity && this.stateValidity === 'C') {
                                this.stateBtn.setContent(Dom.generateIcon(STATE_ICONS.Conflict));
                                this.stateBtn.setStyle('visibility', 'visible');
                                this.stateBtn.classList.add('pc-bulk-conflict');
                                content.addContent(this.stateBtn);
                                this.label.setStyle('padding-left', '20px');
                                content.addContent(this.label);
                                content.value = this.id;
                            } else {
                                content.addContent(this.label);
                                content.value = this.id;
                            }
                            if (this.referenceData) {
                                if (this.referenceData.id !== this.id) {
                                    content.classList.add('highlight-background');
                                } else {
                                    if (this.type === 'Parameter') {
                                        var referenceParamValue = "";
                                        if (this.referenceData.title) {
                                            referenceParamValue = this.referenceData.title;
                                            if (this.referenceData.unit) {
                                                referenceParamValue += " " + this.referenceData.unit;
                                            }
                                        }
                                        if (referenceParamValue !== value) {
                                            content.classList.add('highlight-background');
                                        }
                                    }
                                }
                            }
                        },
                        iconBtn: UWA.createElement('div', {
                            styles: {
                                display: 'inline-block'
                            }
                        }),
                        stateBtn: UWA.createElement('div', {
                            styles: {
                                display: 'inline-block'
                            }
                        }),
                        label: UWA.createElement('span'),
                        getTemplateContent: function () {
                            return content;
                        }
                    };
                    return badges;
                }
            });

            this._dataGridView.registerReusableCellContent({
                id: '_valueMultiple',
                buildContent: function () {
                    var content = UWA.createElement('div');
                    content.classList.add('multiple-value-content');
                    var badges = {
                        setTemplateOptions: function (option) {
                            this.referenceValues = option.referenceValues;
                            if (option && option.items) {
                                this.items = option.items;
                            }
                            if (content.getChildren().length > 0) {
                                content.destroy();
                            }
                            for (var i = 0; i < this.items.length; i++) {
                                if (this.items[i].state && (this.items[i].state === 'C' || this.items[i].state === 'R' || this.items[i].state === 'D')) {
                                    var iconBtn = UWA.createElement('div', {
                                        styles: {
                                            display: 'inline-block'
                                        }
                                    });
                                    iconBtn.setContent(Dom.generateIcon({
                                        iconPath: this.items[i].image,
                                        iconSize: {
                                            width: '27px',
                                            height: '22px'
                                        }
                                    }));
                                    iconBtn.setStyle('visibility', 'visible');

                                    var badge = new Badge({
                                        content: this.items[i].title,
                                        className: "default"
                                    });
                                    var referenceValueExist = true;
                                    if (this.referenceValues) {
                                        referenceValueExist = this.referenceValues.some(elem => elem.id === this.items[i].id);
                                    }
                                    var badgeDivContent = badge.getContent();
                                    badgeDivContent.classList.add('badge-multiple-value');
                                    //Case if the value doesn't exist in the reference column -> highlight that value
                                    if (!referenceValueExist) {
                                        badgeDivContent.classList.add('highlight-background');
                                    }
                                    badgeDivContent.insertBefore(iconBtn, badgeDivContent.children[0]);
                                    if (this.items[i].stateValidity && this.items[i].stateValidity === 'C') {
                                        var conflictBtn = UWA.createElement('div', {
                                            styles: {
                                                display: 'inline-block'
                                            }
                                        });
                                        conflictBtn.setContent(Dom.generateIcon(STATE_ICONS.Conflict));
                                        conflictBtn.setStyle('visibility', 'visible');
                                        conflictBtn.classList.add('pc-bulk-conflict-option');
                                        badgeDivContent.insertBefore(conflictBtn, badgeDivContent.children[badgeDivContent.getChildren().length - 1]);
                                        conflictBtn.onclick = function () {
                                            if (this.id && that.configCriteriaMap) {
                                                var listConflictingRules = that.configCriteriaMap[this.id].conflictingRules;
                                                if (listConflictingRules && listConflictingRules.length > 0) {
                                                    that._getRuleDetails(listConflictingRules, this.title);
                                                }
                                            }
                                        }.bind(this.items[i]);
                                    }
                                    content.addContent(badge);
                                }

                            }
                            // If reference column's cell contains values and the compared with column's cell is empty -> highlight cell background
                            if (this.items.length === 0) {
                                if (this.referenceValues && this.referenceValues.length > 0) {
                                    content.classList.add('highlight-background');
                                }
                            } else {
                                // If reference column's cell contains values and compared column's cell :
                                // 1) Does not contain all values from reference cell -> highlight compared cell background
                                // 2) Contains all values from reference cell -> dont compared highlight the cell background

                                // if(this.referenceValues && this.referenceValues.length > this.items.length){
                                //   content.classList.add('highlight-background');
                                // }else
                                if (this.referenceValues && this.referenceValues.length > 0) {
                                    var differences = this.referenceValues.filter(obj1 => {
                                        return !this.items.some(obj2 => {
                                            return obj1.id === obj2.id;
                                        });
                                    });
                                    if (differences.length > 0) {
                                        content.classList.add('highlight-background');
                                    }
                                }
                            }
                        },
                        getTemplateContent: function () {
                            return content;
                        }
                    };
                    return badges;
                }
            });
        },
        destroy: function () {
            this._parent();
            if (this._eventManager) {
                this._eventManager.cleanup("PCsBulkTablePresenter");
                this._eventManager = null;
            }

        },
        refresh: function () {
            if (this._dataGridView) {
                this._dataGridView.invalidateLayout({
                    updateCellContent: true,
                    updateCellLayout: false,
                    updateCellAttributes: false
                });

            }
        },
        inject: function (parentContainer) {
            this._container.inject(parentContainer);
        },
        getContent: function () {
            return this._container;
        },
        getCriteriaConfigurationInstances: function (data, onCompl, onFail) {
            var that = this;
            var urlCatalog;
            this.getURL().then(function(){
                if (that._3dCompassUrl) {
                    urlCatalog = that._3dCompassUrl;
                }
                urlCatalog += RESOURCE_WS_URL + INVOKE_SERVICE + CONSTANT_GET_CRITERIA_CONFIGURATION_INSTANCE;

                that._integratedEnv = true;
                var ajaxRequest = that._integratedEnv ? WAFData.authenticatedRequest : WAFData.proxifiedRequest;
                data = UWA.is(data, 'string') ? data : JSON.stringify(data);
                ajaxRequest(urlCatalog, {
                    method: 'POST',
                    data: data,
                    type: 'json',
                    async: true,
                    headers: that._integratedEnv ? {
                        'SecurityContext': (that._securityContext) ? that._securityContext : '',
                        'Content-Type': 'application/json'
                    } : {
                        'Content-Type': 'application/json',
                        'Authorization': urlCatalog.authorizationTicket ? urlCatalog.authorizationTicket : '',
                        'SecurityContext': urlCatalog.securityContext ? urlCatalog.securityContext : ''
                    },
                    onComplete: onCompl,
                    onFailure: onFail,
                    timeout: 300000
                });
            });
        },
        getURL: function () {
            var that = this;
            return new UWA.Promise(function (resolve, reject) {
                if (that._3dCompassUrl === null || that._3dCompassUrl === undefined) {
                    var parameters = {
                        serviceName: STR_SERVICE_NAME,
                        platformId: that._tenant,
                        async: false,
                        onComplete: function (URLResult) {
                            if (typeof URLResult === 'string') {
                                that._3dCompassUrl = URLResult;
                            } else {
                                that._3dCompassUrl = URLResult[0].url;
                                URLResult.forEach(function (platforms) {
                                    if (platforms.platformId === that._tenant) {
                                        that._3dCompassUrl = platforms.url;
                                    }
                                });
                            }
                            resolve();
                        },
                        onFailure: function () {
                            UWA.log('3DCompasss Service URL fetch failed...');
                            reject();
                        }
                    };
                    i3DXCompassServices.getServiceUrl(parameters);
                } else {
                    resolve();
                }
            });
        },
    });
    return PCsBulkViewPresenter;
});

