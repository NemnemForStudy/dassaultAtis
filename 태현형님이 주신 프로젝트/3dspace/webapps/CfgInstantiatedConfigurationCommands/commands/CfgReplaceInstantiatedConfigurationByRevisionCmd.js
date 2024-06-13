define('DS/CfgInstantiatedConfigurationCommands/commands/CfgReplaceInstantiatedConfigurationByRevisionCmd', [
    'DS/CfgBaseUX/scripts/CfgController',
    'DS/CfgBaseUX/scripts/CfgUtility',
    'DS/Utilities/Utils',
    'DS/PADUtils/PADContext',
    'DS/ApplicationFrame/Command',
    'DS/Utilities/TouchUtils',
    'DS/CfgBaseUX/scripts/CfgDialog',
    'DS/CfgBaseUX/scripts/CfgData',
    'DS/CoreEvents/ModelEvents',
    'DS/CfgInstantiatedConfigurationUX/scripts/CfgReplacePCVersionExplorerView',
    'i18n!DS/CfgBaseUX/assets/nls/CfgBaseUXNLS',
    'i18n!DS/CfgInstantiatedConfigurationCommands/assets/nls/CfgInstantiatedConfigurationCommands',
], function (CfgController, CfgUtility, Utils, PADContext, AFRCommand, TouchUtils, CfgDialog, CfgData, ModelEvents, CfgReplacePCVersionExplorerView, CfgBaseUXNLS, ReplaceInstantiatedConfigurationNLS) {
    'use strict';

    var CfgReplaceInstantiatedConfigurationByRevisionCmd = AFRCommand.extend({
        productConfigrationData: null,

        init: function (options) {
            var that = this;
            this._parent(options, {
                mode: 'exclusive',
                isAsynchronous: false,
            });
            this._isConfigAvailable = 0;
            this._isStaticMappingActivation = 0;
            this.enable();

            var that = this;

            let response = CfgData.getConfigurationSettingsResponse;
            if (response != undefined) {
                response.settings.forEach(function (setting) {
                    if (setting.settingName == 'StaticMappingActivation' && setting.value == 'enabled') {
                        that._isStaticMappingActivation = 1;
                    }
                });
            } else {
                //[IR-1057931 01-Mar-2023] Security context required for checkDecouplingActivation web-service for StaticMappingActivation value.
                CfgController.init();

                if (widget.getValue('x3dPlatformId')) enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
                else enoviaServerFilterWidget.tenant = 'OnPremise';

                CfgUtility.populate3DSpaceURL().then(function () {
                    CfgUtility.populateSecurityContext().then(function () {
                        CfgUtility.checkDecouplingActivation().then(function () {
                            response = CfgData.getConfigurationSettingsResponse;

                            response.settings.forEach(function (setting) {
                                if (setting.settingName == 'StaticMappingActivation' && setting.value == 'enabled') {
                                    that._isStaticMappingActivation = 1;
                                    that._setStateCmd();
                                }
                            });
                        });
                    });
                });
            }

            //Replace Product Configuration command available for CFG role
            CfgUtility.rolesAvailable(function (userGrantedRoles) {
                if (userGrantedRoles.isCFGRoleAvail) {
                    that._isConfigAvailable = 1;
                    that._setStateCmd();
                }
            });

            if (PADContext.get !== undefined && PADContext.get() !== null) this._SelectorManager = PADContext.get().getPADTreeDocument().getXSO();
            else this._SelectorManager = null;

            if (null !== this._SelectorManager) {
                if (undefined !== this._SelectorManager.onPostAdd) {
                    this._SelectorManager.onPostAdd(this._checkSelection.bind(this));
                }
                if (undefined !== this._SelectorManager.onPostRemove) {
                    this._SelectorManager.onPostRemove(this._checkSelection.bind(this));
                }
                if (undefined !== this._SelectorManager.onEmpty) {
                    this._SelectorManager.onEmpty(this._checkSelection.bind(this));
                }
            }

            var that = this;
            if (PADContext.get !== undefined && PADContext.get() !== null) {
                //Read editMode modified for disabling Replace Product Configuration command
                PADContext.get().addEvent('editModeModified', function (state) {
                    if (state === true) {
                        that._checkSelection();
                    } else {
                        that.disable();
                    }
                });
            }
        },

        //check Replace Product Configuration commands state depending on user selection changes
        _checkSelection: Utils.debounce(function () {
            //-- Init the selection
            let that = this;
            this._SelectedID = '';
            let theSelection = this.getData().selectedNodes;
            //Replace Product Configuration command valid for single child object selection
            if (theSelection.length == 1 && theSelection[0].isRoot == false) {
                that._SelectedID = theSelection[0].id || '';
            }

            that._setStateCmd();
        }, 20),

        //Decide Replace Product Configuration commands enable/disable state
        _setStateCmd: function () {
            var isCmdEnable = 0;
            if (undefined !== this._SelectedID && '' !== this._SelectedID) {
                isCmdEnable = 1;
                if (this._isConfigAvailable == 0) isCmdEnable = 0;
                if (this._isStaticMappingActivation == 0) isCmdEnable = 0;
            }
            if (PADContext.get !== undefined && PADContext.get() !== null && PADContext.get().getEditMode() !== true) {
                isCmdEnable = 0;
            }
            if (1 === isCmdEnable) {
                this.enable();
            } else {
                this.disable();
            }
        },

        //Read user selection data to decide Replace Product Configuration commands enable/disable state
        getData: function () {
            let data = { selectedNodes: [] };

            if (PADContext.get !== undefined && PADContext.get() !== null) {
                let selectednodes = PADContext.get().getPADTreeDocument().getSelectedNodes();
                let length = selectednodes.length;
                for (let i = 0; i < length; i++) {
                    if (selectednodes[i].isRoot()) {
                        let item = {
                            id: selectednodes[i].getID(),
                            isRoot: true,
                        };
                        data.selectedNodes.push(item);
                    } else {
                        let item = {
                            id: selectednodes[i].getRelationID(),
                            isRoot: false,
                        };
                        data.selectedNodes.push(item);
                    }
                }
            }
            return data;
        },

        //User selects / unselects Product Configuration from revision explorer and OK button state decided on it.
        subscribeCfgReplaceProductConfigurationActionEvents: function () {
            CfgData.cfgReplaceProductConfigurationActionEvents.subscribe({ event: 'selectionInReplaceProductConfigurationDialog' }, (msg) => {
                let selectedPCId = '';
                let selectedStateValue = '';
                if (msg != undefined && msg.data != undefined && msg.data.nodeModel != undefined && msg.data.nodeModel.options != undefined && msg.data.nodeModel.options) {
                    if (msg.data.nodeModel.options.id != undefined) selectedPCId = msg.data.nodeModel.options.id;
                    if (msg.data.nodeModel.options.grid != undefined && msg.data.nodeModel.options.grid.maturity != undefined) selectedStateValue = msg.data.nodeModel.options.grid.maturity;
                }

                if (CfgReplaceInstantiatedConfigurationByRevisionCmd.existingPCId === selectedPCId) this.replaceProductConfigurationDialog.footerButton.Ok.disabled = true;
                else if (selectedStateValue == 'Inactive') this.replaceProductConfigurationDialog.footerButton.Ok.disabled = true;
                else this.replaceProductConfigurationDialog.footerButton.Ok.disabled = false;
            });

            CfgData.cfgReplaceProductConfigurationActionEvents.subscribe({ event: 'unselectionInReplaceProductConfigurationDialog' }, () => {
                // After unselection, disable the OK button
                this.replaceProductConfigurationDialog.footerButton.Ok.disabled = true;
            });
        },

        //Send event to Application for refreshing Instantiated Configuration column value
        sendEventToApplication: function (iResponse, selectedInstanceId) {
            let pcReplacePCMessage = {
                commandName: 'cfgReplaceInstantiatedConfigurationByRevision',
                widgetId: widget.id,
                response: iResponse,
                data: {
                    relids: [selectedInstanceId],
                },
            };

            // Pulish the event
            CfgUtility.publishPostProcessingEventForApplications(pcReplacePCMessage);
        },

        //insert user selected Product Configuration
        insertProductConfigration: async function (iOptions) {
            let that = this;
            let failure = function (jsonresponse1, error) {
                let jsonresponse = error ? error : jsonresponse1;
                CfgUtility.showwarning(jsonresponse.errorMessage, 'error');
            };
            let success = function (response) {
                let orignalPCName = '<b>' + iOptions.pcName.replaceAll('<', '&lt;') + '</b>';
                let changedPCName = '<b>' + iOptions.updatedPCName.replaceAll('<', '&lt;') + '</b>';
                let successMessage = ReplaceInstantiatedConfigurationNLS.CFG_Replace_Product_Configuration_By_Revision.replace('{1}', orignalPCName).replace('{2}', changedPCName);

                CfgUtility.showwarning(successMessage, 'success');
                that.sendEventToApplication(response, iOptions.instanceId);
                console.log('insertProductConfigration OK = ' + JSON.stringify(response));
            };
            var url = '/resources/modeler/configuration/authoringServices/insertProductConfiguration?InstanceId=' + iOptions.instanceId + '&ProductConfigurationId=' + iOptions.updatedPCId;
            await CfgUtility.makeWSCall(url, 'POST', 'enovia', 'application/ds-json', '', success, failure, true);
        },

        //Remove existing Instantiated Configuration and then insert user selected Product Configuration.
        updateProductConfigration: async function (iOptions) {
            let that = this;
            let wsOptions = null;

            let jsonData = {
                version: '1.0',
                resources: [iOptions.instanceId],
            };

            let url = '/resources/modeler/configuration/authoringServices/removeProductConfiguration';
            let postdata = JSON.stringify(jsonData);

            let failure = function (jsonresponse1, error) {
                let jsonresponse = error ? error : jsonresponse1;
                CfgUtility.showwarning(jsonresponse.errorMessage, 'error');
            };
            let onCompleteCallBack = function (response) {
                //After removal of existing Instantiated Configuration, Add new user selected Product Configuration
                that.insertProductConfigration(iOptions);
                console.log('removeProductConfiguration OK = ' + JSON.stringify(response));
            };
            await CfgUtility.makeWSCall(url, 'POST', 'enovia', 'application/json', postdata, onCompleteCallBack, failure, true, wsOptions);
        },

        //Revision Explorer dialog creation for Instantiated Configuration
        createReplaceProductConfigurationDialog: function (options) {
            let that = this;
            let pcName = options.pcName;

            CfgReplaceInstantiatedConfigurationByRevisionCmd.existingPCId = options.pcId;

            // VE information for the product will be injected into this div
            this.MainContainer = new UWA.Element('div', {
                html: this.CfgReplacePCVersionExplorerViewObj.render(),
                styles: { width: '100%', height: '100%' },
            });

            // Footer buttons for the Replace Product Configuration by Revision dialog
            let footerbtns = [
                {
                    label: 'OK',
                    labelValue: CfgBaseUXNLS.CfgLabelOK,
                    handler: async function () {
                        //User selects Product Configuration Revision and clicks OK button on Revision explorer dialog
                        if (that.CfgReplacePCVersionExplorerViewObj.CfgReplaceProductConfigurationFactoryObj.getVEObject().getSelectedNodes().length == 1) {
                            //get user selected Product Configuration details
                            let selectedPC = that.CfgReplacePCVersionExplorerViewObj.CfgReplaceProductConfigurationFactoryObj.getVEObject().getSelectedNodes()[0];

                            //read user selected Product Configuration details and perform Update operation.
                            //Here existing Product Configuration Removed and added newly selected Product Configuration.
                            let updatedPCId = ' ';
                            let updatedPCName = ' ';
                            if (selectedPC != undefined && selectedPC.options != undefined && selectedPC.options.data != undefined) {
                                updatedPCId = selectedPC.options.data.id;
                                updatedPCName = selectedPC.options.data.displayName + ' ' + selectedPC.options.data.revision;
                            }
                            options.updatedPCId = updatedPCId;
                            options.updatedPCName = updatedPCName;

                            //Perform Replace Product Configutation operation
                            await that.updateProductConfigration(options);
                        }

                        //Close Revision explorer dialog
                        that.replaceProductConfigurationDialog.closeDialog();
                    },
                    className: 'primary',
                },
                {
                    label: 'Cancel',
                    labelValue: CfgBaseUXNLS.CfgLabelCancel,
                    handler: function () {
                        //Close Revision explorer dialog
                        that.replaceProductConfigurationDialog.closeDialog();
                    },
                    className: 'secondary',
                },
            ];

            let dialogOption = {
                className: '',
                title: ReplaceInstantiatedConfigurationNLS.CFG_Replace_Product_Configuration_By_Revision_Header,
                parent: widget.body,
                body: this.MainContainer,
                overlay: true,
                mode: 'DashboardConfigurationContext',
                closable: true,
                animate: true,
                resizable: true,
                footer: footerbtns,
                persistId: 'CfgReplacePCByRevision',
                width: 900,
                height: 490,
                minHeight: 300,
                minWidth: 370,
                style: { 'min-height': '350px' },
                dialogue: {
                    // heading of the dialog
                    header: pcName ? ReplaceInstantiatedConfigurationNLS.CFG_Replace_Product_Configuration_By_Revision_Header + ' - ' + pcName : ReplaceInstantiatedConfigurationNLS.CFG_Replace_Product_Configuration_By_Revision_Header,
                    buttonArray: footerbtns,
                    target: widget.body,
                },
                touchMode: true,
                //touchMode: TouchUtils.getTouchMode() == undefined || TouchUtils.getTouchMode() == false ? false : true,
                //All CFG dialog shows buttons in Touch mode.
            };

            this.replaceProductConfigurationDialog = new CfgDialog(dialogOption);
            this.replaceProductConfigurationDialog.render();

            // disable the "Ok" button when the dialog is loaded
            this.replaceProductConfigurationDialog.footerButton.Ok.disabled = true;
        },

        //Revision explorer view for Instantiated Configuration.
        createVersionExplorerView: async function (options) {
            let productConfigurationId = options.pcId;

            let pcVersionToBeSelectedInVEObj = {
                id: options.pcId,
                name: options.pcName,
            };

            this.CfgReplacePCVersionExplorerViewObj = await new CfgReplacePCVersionExplorerView({
                productConfigurationId: productConfigurationId,
                pcVersionToBeSelectedInVEObj: pcVersionToBeSelectedInVEObj,
            });

            //Open revision explorer view of Instantiated Configuration
            this.createReplaceProductConfigurationDialog(options);
        },

        initReplaceProductConfigurationDialog: async function (options) {
            // clear CfgData
            CfgData.clear();

            // initilize Add instance to cfg Replace Product Configuration by Revision Action Events to Model Events
            CfgData.cfgReplaceProductConfigurationActionEvents = new ModelEvents();

            // subscribe for each action event
            this.subscribeCfgReplaceProductConfigurationActionEvents();

            if (widget) enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
            else enoviaServerFilterWidget.tenant = 'OnPremise';

            // populate 3D space URL
            await CfgUtility.populate3DSpaceURL();

            // populate security context
            await CfgUtility.populateSecurityContext();

            //Open revision explorer of selected Product Configuration.
            await this.createVersionExplorerView(options);
        },

        //Read Instantiated Product Configuration details for Replace Product Configuration operation
        getProductConfigrationInfo: async function (iOptions) {
            CfgController.init();

            if (widget.getValue('x3dPlatformId')) enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
            else enoviaServerFilterWidget.tenant = 'OnPremise';

            let instanceId = iOptions.data.selectedNodes[0].id;
            let options = { instanceIdList: [instanceId] };
            await CfgUtility.populate3DSpaceURL();
            await CfgUtility.populateSecurityContext();

            //get Instantiated Configuration information for selected Product
            let iResponse = await CfgUtility.getProductConfigurations(options);

            CfgReplaceInstantiatedConfigurationByRevisionCmd.productConfigrationData = null;

            for (let key in iResponse) {
                if (key != 'version') {
                    if (iResponse.hasOwnProperty(key)) {
                        if (iResponse[key].hasStaticMapping == 'true' && iResponse[key].content != undefined && iResponse[key].content.results != undefined && iResponse[key].filterID != undefined) {
                            if (iResponse[key].content.results[0].type == 'VPMCfgConfiguration') {
                                CfgUtility.showNotifs('error', ReplaceInstantiatedConfigurationNLS.CFG_Replace_Failed_Title, '', ReplaceInstantiatedConfigurationNLS.CFG_Error_Predefined_Configuration_Not_Allowed);
                                return;
                            }

                            let pcStaticMappingValue = ' ';
                            let revisionValue = ' ';
                            let computed = iResponse[key].content.results[0].computed;
                            let basicData = iResponse[key].content.results[0].basicData;

                            if (basicData != undefined) {
                                for (let count = 0; count < basicData.length; count++) {
                                    if (basicData[count].name == 'revision' && basicData[count].value != undefined) {
                                        revisionValue = basicData[count].value[0];
                                        break;
                                    }
                                }
                            }

                            //added check for private Product Configuration
                            if (computed != undefined) pcStaticMappingValue = computed.label.value[0] + ' ' + revisionValue;

                            CfgReplaceInstantiatedConfigurationByRevisionCmd.productConfigrationData = { instanceId: instanceId, pcId: iResponse[key].filterID, pcName: pcStaticMappingValue };
                        }
                    }
                }
            }

            //error message shown if Instantiated Product Configuration not available for selected product
            if (CfgReplaceInstantiatedConfigurationByRevisionCmd.productConfigrationData == null) {
                CfgUtility.showNotifs('error', ReplaceInstantiatedConfigurationNLS.CFG_Replace_Failed_Title, ReplaceInstantiatedConfigurationNLS.CFG_Error_No_Instantiated_Configuration, ReplaceInstantiatedConfigurationNLS.CFG_Error_No_Instantiated_Configuration_Action);
            } else {
                //get Instantiated Product Configuration details.
                let options = CfgReplaceInstantiatedConfigurationByRevisionCmd.productConfigrationData;

                //Open revision Explorer for Instantiated Configuration
                this.initReplaceProductConfigurationDialog(options);
            }
        },

        /*
         * Don't overload it. Method execute is called when user clicks Replace Product Configuration command
         */
        execute: async function () {
            let that = this;
            that.disable();
            //User selection for Replace Product Configuration operation.
            let data = that.getData();

            //For valid single child selection Replace Product Configuration operation is supported.
            if (data.selectedNodes && data.selectedNodes.length == 1) {
                let options = { data: data, parent: that };
                await that.getProductConfigrationInfo(options);
                that.enable();
            }
        },
    });

    return CfgReplaceInstantiatedConfigurationByRevisionCmd;
});
