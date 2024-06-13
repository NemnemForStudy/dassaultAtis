define('DS/CfgEffectivityCommands/commands/CfgPasteEffectivityCmd', [
    'DS/CfgTracker/CfgTracker',
    'DS/CfgTracker/CfgDimension',
    'DS/CfgTracker/CfgValue',
    'DS/CfgBaseUX/scripts/CfgUtility',
    'DS/CfgBaseUX/scripts/CfgData',
    'i18n!DS/CfgWebAppEffectivityUX/assets/nls/CfgEffectivityNLS',
    'i18n!DS/CfgBaseUX/assets/nls/CfgBaseUXNLS',
    'DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext',
    'DS/CfgEffectivityCommands/commands/CfgEffCmd',
], function (CfgTracker, CfgDimension, CfgValue, CfgUtility, CfgData, EffectivityNLS, CfgBaseUXNLS, CfgAuthoringContext, CfgEffCmd) {
    'use strict';
    var successfullList = [];
    var instanceList = [];
    var failedList = [];
    var warningList = [];
    var emptyVariantList = [];
    var configChageList = [];
    var frozenEvolutionList = [];
    var availableVariantList = [];
    var availableVarAndEvolutionList = [];
    var featureNotEnabled = 'true';
    let errorMessageValue = '';

    var CfgPasteEffectivityCmd = CfgEffCmd.extend({
        /**
         * Override base class CfgEffCmd function for selectedNodes.length >= 1 because Paste Variant Effectivity functionality is supported for multuiple products
         */
        _checkSelection: function () {
            //-- Init the selection
            var instanceLength;
            this._SelectedID = '';

            var data = this.getData();
            if (data.selectedNodes.length >= 1) {
                this._SelectedID = data.selectedNodes[0].id || '';
                this._SelectedAlias = data.selectedNodes[0].alias || '?';
                this.isRoot = data.selectedNodes[0].isRoot;
            }

            //-- State of the command
            this._setStateCmd();
        },

        /**
         * Set Variant Effectivity for selected multiple products using webservice pasteVariantEffectivities
         */
        _setVariantEffectivity: function (instanceList, productName, variantXML, authHeaders, selectdData) {
            var that = this;
            var wsOptions = null;
            if (authHeaders.length > 0) {
                wsOptions = {
                    operationheader: {
                        key: authHeaders[0].key,
                        value: authHeaders[0].value,
                    },
                };
            }
            var exppressionList = [
                {
                    domain: 'Variant',
                    content: variantXML,
                },
            ];

            //[FUN126066 Enhance error messages for set effectivity web services] changed version to 1.1
            var options = {
                version: '1.1',
                domain: 'Variant',
                view: 'Current',
                targetFormat: 'TXT',
                withDescription: 'YES',
                expressionList: exppressionList,
                instanceIdList: instanceList,
                wsOptions: wsOptions,
            };

            that._processSetEffectivities(options, selectdData, that);
        },

        /**
         * For PCS improvement, CfgUtility.refreshEffectvity which calls getMultipleFilterableObjectInfo is avoided for Set Variant Effectivity operation.
         */
        _refreshGridForSetEffectivity: function (response) {
            //PADContext is not available in all scenario. Data is retrieved which was set depending on each context
            var data = CfgData.SelectedDataForPasteOperation;
            var nodeList = data.padNodes;

            for (var counter = 0; counter < nodeList.length; counter++) {
                var instanceId = nodeList[counter].getRelationID();
                if (configChageList.indexOf(instanceId) >= 0) continue;
                var hasEff = EffectivityNLS.CFG_EFFECTIVITY_YES;
                var varEff = ' ';
                if (response.results[0].existing != undefined && response.results[0].existing.content != undefined && response.results[0].existing.content.Variant != undefined) {
                    varEff = response.results[0].existing.content.Variant;
                }
                varEff = varEff == null || '' ? ' ' : varEff.replace(/[\r\n]+/g, ' ');
                nodeList[counter].updateOptions({
                    grid: { Effectivity: hasEff, VariantEffectivity: varEff },
                });
            }
        },

        /**
         * For PCS improvement, CfgUtility.refreshEffectvity which calls getMultipleFilterableObjectInfo is avoided for unset Variant Effectivity operation.
         */
        _refreshGridForUnsetEffectivity: function () {
            //PADContext is not available in all scenario. Data is retrieved which was set depending on each context
            var data = CfgData.SelectedDataForPasteOperation;
            var nodeList = data.padNodes;
            for (var counter = 0; counter < nodeList.length; counter++) {
                var hasEff = ' ';
                var instanceId = nodeList[counter].getRelationID();
                if (availableVariantList.indexOf(instanceId) >= 0) hasEff = EffectivityNLS.CFG_EFFECTIVITY_NO;
                else if (availableVarAndEvolutionList.indexOf(instanceId) >= 0) hasEff = EffectivityNLS.CFG_EFFECTIVITY_YES;

                nodeList[counter].updateOptions({
                    grid: { Effectivity: hasEff, VariantEffectivity: ' ' },
                });
            }
        },

        /**
         * Used to check model is attached to parent product. If Model is not attached to parent product then Error message is shown.
         */
        _getConfigurationFeature: function (parentID) {
            var returnedPromise = new Promise(function (resolve, reject) {
                var failure = function (response, error) {
                    CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_Operation_Failed, 'error');
                    reject(error.errorMessage);
                };
                var url = '/resources/modeler/configuration/navigationServices/getConfiguredObjectInfo/pid:' + parentID + '?cfgCtxt=1&enabledCriteria=1&version=1.2';
                var successfulModellist = function (response) {
                    if (response.version == '1.2' && response.enabledCriterias.feature == 'false') {
                        if (featureNotEnabled != 'false') featureNotEnabled = response.enabledCriterias.feature;
                    }
                    resolve(response);
                };
                CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/ds-json', '', successfulModellist, failure, true);
            });
            return returnedPromise;
        },

        /**
         * Used to get Domain details before Paste Variant Effectivity operation. Forbidden types like 3DSpahe object is added to failedList and shown in error message.
         */
        //getFrozenEffectivityDetails response will give Available Domain Details
        _getAvailableDomainDetails: function (iResponse) {
            if (iResponse.length > 0) {
                //Remove frozen instances from selected instances to avoid unwanted variant Effectivity modification.
                for (var count = 0; count < iResponse.length; count++) {
                    var instanceId = iResponse[count].instanceId;
                    if (iResponse[count].AvailableDomainDetails != undefined) {
                        var domainVaue = iResponse[count].AvailableDomainDetails;
                        if (domainVaue == 'NoEff' || domainVaue == 'Evolution') emptyVariantList.push(instanceId);
                        if (domainVaue == 'ConfigChange' || domainVaue == 'UnsupportedType') configChageList.push(instanceId);
                        if (domainVaue == 'NoEff' || domainVaue == 'Variant') availableVariantList.push(instanceId);
                        if (domainVaue == 'ALL' || domainVaue == 'Evolution') availableVarAndEvolutionList.push(instanceId);

                        if (iResponse[count].isFrozen == true) {
                            frozenEvolutionList.push(instanceId);
                        }
                    }
                }
            }
        },

        /**
         * Function used to clear Variant Effectivity for selected products using single web-service call unsetVariantEffectivities.
         */
        _unsetVariantEffectivities: function (selectdData, authHeaders, instanceList) {
            var that = this;
            var wsOptions = null;
            if (authHeaders.length > 0) {
                wsOptions = {
                    operationheader: {
                        key: authHeaders[0].key,
                        value: authHeaders[0].value,
                    },
                };
            }

            var options = {
                version: '1.0',
                unsetList: instanceList,
                wsOptions: wsOptions,
            };

            var counter,
                selLength = selectdData.selectedNodes.length;
            var selectedItems = [];
            for (counter = 0; counter < selLength; counter++) {
                selectedItems.push({
                    prodId: selectdData.selectedNodes[counter].id,
                    productName: selectdData.selectedNodes[counter].alias,
                });
            }

            CfgUtility.unsetVariantEffectivities(options).then(
                function (response) {
                    var instanceNewIdList = [];
                    var modifiedNodeList = [];
                    if (response.GlobalStatus != undefined && response.GlobalStatus == 'SUCCESS') {
                        for (var i = 0; i < response.results.length; i++) {
                            var result = response.results[i];
                            var newDetails = result['new'];
                            var existingDetails = result.existing;

                            for (var count = 0; count < selectdData.selectedNodes.length; count++) {
                                var relationId = selectdData.selectedNodes[count].id;
                                if (existingDetails != undefined && existingDetails.pid != undefined) {
                                    if (relationId == existingDetails.pid) {
                                        modifiedNodeList.push(selectdData.selectedNodes[count]);
                                        continue;
                                    }
                                }
                            }

                            if (newDetails != undefined && newDetails.pid != undefined) {
                                //instanceNewIdList.push(newDetails.pid);   //Splited Id with new instances are not used.
                                if (existingDetails != undefined && existingDetails.pid != undefined) {
                                    instanceNewIdList.push(existingDetails.pid);

                                    var selectedItem = selectedItems.filter(function (item) {
                                        return item.prodId == existingDetails.pid;
                                    })[0];
                                    if (selectedItem != undefined) {
                                        if (result.status == 'SUCCESS') {
                                            successfullList.push(selectedItem.productName);
                                        } else {
                                            failedList.push(selectedItem.productName);
                                        }
                                    }
                                }
                            } else {
                                var childStatus = result.status;
                                var childProductId = result.existing.pid;
                                var productName = '';
                                var selectedItem = selectedItems.filter(function (item) {
                                    return item.prodId == childProductId;
                                })[0];
                                if (selectedItem != undefined) {
                                    productName = selectedItem.productName;
                                    if (childStatus == 'SUCCESS' && emptyVariantList.indexOf(childProductId) == -1 && configChageList.indexOf(childProductId) == -1) {
                                        successfullList.push(productName);
                                    } else if (emptyVariantList.indexOf(childProductId) >= 0) {
                                        warningList.push(productName);
                                    } else {
                                        failedList.push(productName);
                                    }
                                }
                            }
                        }

                        response.instanceNewIdList = instanceNewIdList;

                        //Publish Effectivity modification event for updating Effectivity details
                        var refreshEventMessage = {
                            commandName: 'cfgPasteVariant',
                            widgetId: widget.id,
                            response: response,
                            data: {},
                        };

                        CfgUtility.publishPostProcessingEventForApplications(refreshEventMessage);

                        if (!that.options.context) {
                            //[IR-833916 12-Jul-2021] show changed variant split info message.
                            if (response.instanceNewIdList.length > 0) {
                                CfgUtility.showwarning(EffectivityNLS.CFG_Application_Refresh_For_Instance_Evolved, 'info');
                            }
                            that._showEmptyMessage();
                        } else {
                            //[IR-780872 10-Jul-2020] Instance Evolved message should be shown for all applications after Variant split operation.
                            if (response.instanceNewIdList.length > 0) {
                                CfgUtility.showwarning(EffectivityNLS.CFG_Application_Refresh_For_Instance_Evolved, 'info');
                            }
                            that.options.context.withTransactionUpdate(function () {
                                that._refreshGridForUnsetEffectivity();
                                that._showEmptyMessage();
                            });
                        }
                    } else if (response.GlobalStatus != undefined && response.GlobalStatus == 'ERROR') {
                        for (var i = 0; i < selectdData.selectedNodes.length; i++) {
                            failedList.push(selectdData.selectedNodes[i].alias);
                        }
                        that._showEmptyMessage();
                    }
                },
                function (response) {
                    for (var i = 0; i < selectdData.selectedNodes.length; i++) {
                        failedList.push(selectdData.selectedNodes[i].alias);
                    }
                    that._showEmptyMessage();
                }
            );
        },

        /**
         * Function used show error / successful messages after Paste Variant Effectivity operation.
         */
        _showMessage: function () {
            //[FUN126066 Enhance error messages for set effectivity web services] show error message from wb-service.
            if (errorMessageValue != '') {
                CfgUtility.showwarning(errorMessageValue, 'error');
                errorMessageValue = '';
                return;
            }

            if (successfullList.length == 1 && failedList.length == 1) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_Successful + ' ' + successfullList.toString(), 'success');
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_Failed + ' ' + failedList.toString(), 'error');
            } else if (successfullList.length == 0 && failedList.length == 1) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_Failed + ' ' + failedList.toString(), 'error');
            } else if (successfullList.length > 1 && failedList.length == 0) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_AllSuccessful, 'success');
            } else if (successfullList.length > 1 && failedList.length == 1) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_PartialSuccessful, 'success');
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_Failed + ' ' + failedList.toString(), 'error');
            } else if (successfullList.length > 1 && failedList.length > 1) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_PartialSuccessful, 'success');
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_Failed + ' ' + failedList.toString(), 'error');
            } else if (successfullList.length == 1 && failedList.length > 1) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_Successful + ' ' + successfullList.toString(), 'success');
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_Failed + ' ' + failedList.toString(), 'error');
            } else if (successfullList.length == 1 && failedList.length == 0) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_Successful + ' ' + successfullList.toString(), 'success');
            } else if (successfullList.length == 0 && failedList.length > 1) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Effectivity_AllFailed, 'error');
            }
        },

        /**
         * Function used show error / successful messages if Variant Effectivity for source product is Empty during Copy Variant Effectivity operation.
         */
        _showEmptyMessage: function () {
            if (successfullList.length > 1 && failedList.length == 0 && warningList.length == 0) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Empty_Effectivity_AllSuccessful, 'success');
                return;
            } else if (failedList.length > 1 && successfullList.length == 0 && warningList.length == 0) {
                CfgUtility.showwarning(EffectivityNLS.CFG_Empty_Effectivity_AllFailed, 'error');
                return;
            }

            if (failedList.length != 0) CfgUtility.showwarning(EffectivityNLS.CFG_Empty_Effectivity_Failed + ' ' + failedList.toString(), 'error');
            if (successfullList.length != 0) CfgUtility.showwarning(EffectivityNLS.CFG_Empty_Effectivity_Successful + ' ' + successfullList.toString(), 'success');
            if (warningList.length != 0) CfgUtility.showwarning(EffectivityNLS.CFG_Empty_Effectivity_Warning + ' ' + warningList.toString(), 'info');
        },

        _processSetEffectivities: function (options, selectdData, that) {
            CfgUtility.pasteVariantEffectivities(options).then(
                function (response) {
                    var i,
                        selLength = selectdData.selectedNodes.length;
                    for (i = 0; i < selLength; i++) {
                        var prodId = selectdData.selectedNodes[i].id;
                        if (configChageList.indexOf(prodId) == -1) {
                            if (response.GlobalStatus != undefined && response.GlobalStatus == 'SUCCESS') {
                                successfullList.push(selectdData.selectedNodes[i].alias);
                            } else if (response.GlobalStatus != undefined && response.GlobalStatus == 'ERROR') {
                                failedList.push(selectdData.selectedNodes[i].alias);

                                //[FUN126066 Enhance error messages for set effectivity web services] Read error message from web-service
                                if (response.results != undefined && response.results[0] != undefined) {
                                    let errorCodeValue = response.results[0].errorCode;
                                    switch (errorCodeValue) {
                                        case 123:
                                            errorMessageValue = EffectivityNLS.CFG_Paste_Effectivity_Failed_Different_Context + '<b>' + CfgBaseUXNLS.CfgHeaderEditConfigurationContext + '</b>';
                                            break;
                                        case 126:
                                            errorMessageValue = EffectivityNLS.CFG_Paste_Effectivity_Failed_WorkUnder_Different_Criteria + '<b>' + CfgBaseUXNLS.CfgHeaderEditConfigurationContext + '</b>';
                                            break;
                                        case 134:
                                            errorMessageValue = EffectivityNLS.CFG_Paste_Effectivity_Failed_WorkUnder_Different_Context + '<b>' + CfgBaseUXNLS.CfgHeaderEditConfigurationContext + '</b>';
                                            break;
                                        default:
                                            errorMessageValue = response.results[0].message;
                                            break;
                                    }

                                    console.log('Paste Variant Effectivity operation error = ' + response.results[0].errorDetails);
                                }
                            }
                        }
                    }

                    var instanceNewIdList = [];
                    if (response.GlobalStatus != undefined && response.GlobalStatus == 'SUCCESS') {
                        for (var counter = 0; counter < response.results.length; counter++) {
                            var result = response.results[counter];
                            var existingDetails = result.existing;
                            var newDetails = result['new'];
                            if (newDetails != undefined && newDetails.pid != undefined) {
                                //instanceNewIdList.push(newDetails.pid);   //Splited Id with new instances are not used.
                                if (existingDetails != undefined && existingDetails.pid != undefined) {
                                    instanceNewIdList.push(existingDetails.pid);
                                }
                            }
                        }
                    }
                    response.instanceNewIdList = instanceNewIdList;

                    //Publish Effectivity modification event for updating Effectivity details
                    var refreshEventMessage = {
                        commandName: 'cfgPasteVariant',
                        widgetId: widget.id,
                        response: response,
                        data: {},
                    };

                    CfgUtility.publishPostProcessingEventForApplications(refreshEventMessage);

                    //[FUN126066 Enhance error messages for set effectivity web services] Assign original value for Effectivity and Variant Effectivity column
                    if (errorMessageValue != '') {
                        for (i = 0; i < selLength; i++) {
                            let hasEff = selectdData.selectedNodes[i].effectivity;
                            let varEff = selectdData.selectedNodes[i].variantEffectivity;
                            selectdData.padNodes[i].updateOptions({
                                grid: {
                                    Effectivity: hasEff,
                                    VariantEffectivity: varEff,
                                },
                            });
                        }
                    }

                    //PADContext is not available in all scenario. If other context is null then use PADContext.
                    if (!that.options.context) {
                        //[IR-833916 12-Jul-2021] show changed variant split info message.
                        if (response.instanceNewIdList.length > 0) {
                            CfgUtility.showwarning(EffectivityNLS.CFG_Application_Refresh_For_Instance_Evolved, 'info');
                        }
                        that._showMessage();
                    } else {
                        //[IR-780872 10-Jul-2020] Instance Evolved message should be shown for all applications after Variant split operation.
                        if (response.instanceNewIdList.length > 0) {
                            CfgUtility.showwarning(EffectivityNLS.CFG_Application_Refresh_For_Instance_Evolved, 'info');
                        }
                        that.options.context.withTransactionUpdate(function () {
                            that._refreshGridForSetEffectivity(response);
                            that._showMessage();
                        });
                    }
                },
                function (response) {
                    //[IR-636352 02-Jan-2020] spinner changed with Failed node Effectivity
                    //[IR-940450 05-May-2022] commented below check to show error for Non-PADContext applications.
                    //if (!that.options.context) {
                    for (var i = 0; i < selectdData.selectedNodes.length; i++) {
                        var hasEff = selectdData.selectedNodes[i].effectivity;
                        var varEff = selectdData.selectedNodes[i].variantEffectivity;
                        selectdData.padNodes[i].updateOptions({
                            grid: {
                                Effectivity: hasEff,
                                VariantEffectivity: varEff,
                            },
                        });
                        failedList.push(selectdData.selectedNodes[i].alias);
                    }
                    that._showMessage();
                    //}
                }
            );
        },

        sendPasteVariantTrackerEvent: function (options) {
            try {
                //Read Authoring context details for cloud probes.
                let authoringMode = 'Empty';
                let cfg = CfgAuthoringContext.get();
                if (cfg && cfg.AuthoringContextHeader) {
                    for (let key in cfg.AuthoringContextHeader) {
                        if (key === 'DS-Change-Authoring-Context') authoringMode = 'Change';
                        else if (key === 'DS-Configuration-Authoring-Context') authoringMode = 'Evolution';
                    }
                }

                let selectState = {
                    nbVariablity: 0,
                    nbVariablityValue: 0,
                    complex: 0,
                };

                if (CfgData.probesValuesForPasteVariantOpertaion != undefined)
                    selectState = { nbVariablity: CfgData.probesValuesForPasteVariantOpertaion.nbVariablity, nbVariablityValue: CfgData.probesValuesForPasteVariantOpertaion.nbVariablityValue, complex: CfgData.probesValuesForPasteVariantOpertaion.complex };

                CfgTracker.createEventBuilder({
                    category: CfgTracker.Category['USAGE'],
                    action: CfgTracker.Events['CLICK'],
                    tenant: widget.getValue('x3dPlatformId'),
                })
                    .setLabel(CfgTracker.Labels['COPY_PASTE_VARIANT_EFFECTIVITY'])
                    .setAppId(widget.data.appId || 'NO_APP_ID')
                    .addDimension(CfgDimension.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_EFFECTIVITY_WIDGET, widget.data.title || widget.options.title || 'ODT Environment')
                    .addDimension(CfgDimension.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_EFFECTIVITY_MODE, 'Paste')
                    .addDimension(CfgDimension.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_EFFECTIVITY_WORK_UNDER, authoringMode)
                    .addPersonalValue(CfgValue.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_NO_OF_MODEL, options.contextLength)
                    .addPersonalValue(CfgValue.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_NO_OF_OBJECT, options.selectedNodesLength)
                    .addPersonalValue(CfgValue.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_NO_OF_VARIANT, selectState.nbVariablity)
                    .addPersonalValue(CfgValue.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_NO_OF_VARIANT_VALUES, selectState.nbVariablityValue)
                    .addPersonalValue(CfgValue.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_NO_OF_OPTION_GROUP, -1)
                    .addPersonalValue(CfgValue.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_NO_OF_OPTION_GROUP_VALUES, -1)
                    .addPersonalValue(CfgValue.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_COMPLEXITY, selectState.complex)
                    .send();
            } catch (e) {
                console.error(e);
            }
        },

        /**
         * When user clicks on Action bar Paste Variant Effectivity command as well as Paste Variant Effectivity contextual menu then execute is called.
         * Updated value for allowedLimitNo = 50 for 2018x FD08 function FUN085315.
         */
        execute: async function () {
            //IR-1051749 - For SAXR on edit variant call is directly coming to CfgPasteEffectivityCmd, so isEditVariantEnabled is undefined so adding service to get info.
            if (CfgData && CfgData.isEditVariantEnabled === undefined) {
                await CfgUtility.getDisabledEditVariantStatus();
            }
            //IR-950795
            if (CfgData && CfgData.isEditVariantEnabled === false) {
                CfgUtility.showwarning(CfgBaseUXNLS.PasteVariantDisabled, 'error');
                return;
            }

            //display warning message as Effectivity is not copied
            if (CfgData && CfgData.isVariantEffAvailable == ' ') {
                CfgUtility.showwarning(EffectivityNLS.CFG_Paste_Variant_Info, 'info');
                return;
            }

            featureNotEnabled = 'true';
            var that = this;
            that.disable();
            var data = that.getData();
            //[IR-983903 12-Sep-2022] Increased Paste Variant Effectivity operation limit
            var allowedLimitNo = 500;
            console.log(data);
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                if (data.selectedNodes.length > allowedLimitNo) {
                    var numberoflimitMessage = EffectivityNLS.CFG_LimitNo_Paste_Effectivity.split('5').join(allowedLimitNo);
                    CfgUtility.showwarning(numberoflimitMessage, 'error');
                } else {
                    var thatlocal = that;
                    //check whether change controlled
                    var isChangePromise = CfgUtility.isChangeControlled(data.selectedNodes[0].parentID);
                    isChangePromise.then(
                        function (change_response) {
                            var that = thatlocal;
                            if (change_response == 'any') {
                                var authHeaders = [];
                                var cfg = CfgAuthoringContext.get();
                                if (cfg && cfg.AuthoringContextHeader) {
                                    for (var key in cfg.AuthoringContextHeader) {
                                        authHeaders.push({
                                            key: key,
                                            value: cfg.AuthoringContextHeader[key],
                                        });
                                    }
                                }
                                if (authHeaders.length == 0) {
                                    CfgUtility.showwarning(EffectivityNLS.CC_AC_HDR_Error, 'error');
                                    return;
                                }
                            }

                            //PADContext is not available in all scenario. Data is kept which can be set depending on each context
                            CfgData.SelectedDataForPasteOperation = data;
                            var isVariantEffectivityAvailable = CfgData.isVariantEffAvailable;

                            //[IR-636352 02-Jan-2020] Show spinner for Paste operation.
                            var nodeList = data.padNodes;
                            var hasEff;
                            var varEff;
                            if (!that.options.context) {
                                for (var counter = 0; counter < nodeList.length; counter++) {
                                    nodeList[counter].updateOptions({
                                        grid: {
                                            Effectivity: hasEff,
                                            VariantEffectivity: varEff,
                                        },
                                    });
                                }
                            }

                            var authHeaders = [];
                            var cfg = CfgAuthoringContext.get();
                            if (cfg && cfg.AuthoringContextHeader) {
                                for (var key in cfg.AuthoringContextHeader) {
                                    authHeaders.push({
                                        key: key,
                                        value: cfg.AuthoringContextHeader[key],
                                    });
                                }
                            }
                            var allPromises = [];
                            var i,
                                length = data.selectedNodes.length;
                            successfullList = [];
                            failedList = [];
                            warningList = [];
                            emptyVariantList = [];
                            configChageList = [];
                            availableVariantList = [];
                            availableVarAndEvolutionList = [];
                            frozenEvolutionList = [];

                            instanceList = [];
                            for (i = 0; i < length; i++) {
                                instanceList.push(data.selectedNodes[i].id);
                            }

                            if (isVariantEffectivityAvailable == 'NO') {
                                //instanceId List are passed in pidList for method getFrozenEffectivityDetails which gives frozen Evolution Effectivity details.
                                var effectivityOptions = {
                                    pidList: instanceList,
                                };
                                CfgUtility.getFrozenEffectivityDetails(effectivityOptions).then(
                                    function (iResponse) {
                                        //Fills different global Lists which are used to show Error/Successful/Information message
                                        that._getAvailableDomainDetails(iResponse);

                                        var validData = {
                                            selectedNodes: [],
                                            padNodes: [],
                                        };
                                        for (var i = 0; i < data.selectedNodes.length; i++) {
                                            var instId = data.selectedNodes[i].id;
                                            if (emptyVariantList.indexOf(data.selectedNodes[i].id) >= 0) {
                                                warningList.push(data.selectedNodes[i].alias);
                                                var index = instanceList.indexOf(instId);
                                                if (index > -1) {
                                                    instanceList.splice(index, 1);
                                                }

                                                //[IR-636352 02-Jan-2020] spinner changed with Failed node Effectivity
                                                if (!that.options.context) {
                                                    var hasEff = data.selectedNodes[i].effectivity;
                                                    var varEff = data.selectedNodes[i].variantEffectivity;
                                                    data.padNodes[i].updateOptions({
                                                        grid: {
                                                            Effectivity: hasEff,
                                                            VariantEffectivity: varEff,
                                                        },
                                                    });
                                                }
                                            }
                                            //[IR-888047 29-Sep-2021] Added work under Authoring context empty check as --> authHeaders.length == 0.
                                            //For Active Work under Authoring context, Frozen Evolution Check on reference Evolution Effectivity should be avoided
                                            //and passed as Valid reference for Clear Variant Effectivity operation
                                            else if (frozenEvolutionList.indexOf(data.selectedNodes[i].id) >= 0 && authHeaders.length == 0) {
                                                var index = instanceList.indexOf(instId);
                                                if (index > -1) {
                                                    instanceList.splice(index, 1);
                                                }

                                                //[IR-636352 02-Jan-2020] spinner changed with Failed node Effectivity
                                                if (!that.options.context) {
                                                    var hasEff = data.selectedNodes[i].effectivity;
                                                    var varEff = data.selectedNodes[i].variantEffectivity;
                                                    data.padNodes[i].updateOptions({
                                                        grid: {
                                                            Effectivity: hasEff,
                                                            VariantEffectivity: varEff,
                                                        },
                                                    });
                                                }
                                            } else if (configChageList.indexOf(data.selectedNodes[i].id) >= 0) {
                                                failedList.push(data.selectedNodes[i].alias);
                                                var index = instanceList.indexOf(instId);
                                                if (index > -1) {
                                                    instanceList.splice(index, 1);
                                                }

                                                //[IR-636352 02-Jan-2020] spinner changed with Failed node Effectivity
                                                if (!that.options.context) {
                                                    var hasEff = data.selectedNodes[i].effectivity;
                                                    var varEff = data.selectedNodes[i].variantEffectivity;
                                                    data.padNodes[i].updateOptions({
                                                        grid: {
                                                            Effectivity: hasEff,
                                                            VariantEffectivity: varEff,
                                                        },
                                                    });
                                                }
                                            } else {
                                                validData.selectedNodes.push(data.selectedNodes[i]);
                                                validData.padNodes.push(data.padNodes[i]);
                                            }
                                        }

                                        //[IR-888047 29-Sep-2021] Added work under Authoring context empty check as --> authHeaders.length == 0 for Frozen Evolution Clear message.
                                        if (instanceList.length > 0) {
                                            //show frozen Evolution check Information message for clear Variant Effectivity operation
                                            if (frozenEvolutionList.length > 0 && authHeaders.length == 0) CfgUtility.showwarning(EffectivityNLS.CFG_Frozen_Evolution_Clear_Variant_Operation_Info, 'info');

                                            that._unsetVariantEffectivities(validData, authHeaders, instanceList);
                                        } else {
                                            //show frozen Evolution check error message for clear Variant Effectivity operation
                                            if (frozenEvolutionList.length > 0 && authHeaders.length == 0) CfgUtility.showwarning(EffectivityNLS.CFG_Frozen_Evolution_Clear_Variant_Operation_Error, 'error');

                                            that._showEmptyMessage();
                                        }

                                        //send clear Variant Effectivity operation details for cloud probes tracking
                                        let probesOptions = { selectedNodesLength: data.selectedNodes.length, contextLength: 0 };
                                        that.sendPasteVariantTrackerEvent(probesOptions);
                                    },
                                    function (error) {
                                        //[IR-636352 02-Jan-2020] spinner changed with Failed node Effectivity
                                        //[IR-940450 05-May-2022] commented below check to show error for Non-PADContext applications.
                                        //if (!that.options.context) {
                                        for (var i = 0; i < data.selectedNodes.length; i++) {
                                            var hasEff = data.selectedNodes[i].effectivity;
                                            var varEff = data.selectedNodes[i].variantEffectivity;
                                            data.padNodes[i].updateOptions({
                                                grid: {
                                                    Effectivity: hasEff,
                                                    VariantEffectivity: varEff,
                                                },
                                            });
                                            failedList.push(data.selectedNodes[i].alias);
                                        }
                                        that._showEmptyMessage();
                                        //}
                                    }
                                );
                            } else {
                                var uniqueParentIDs = [];
                                var featurePromices = [];
                                for (i = 0; i < length; i++) {
                                    var parentId = data.selectedNodes[i].parentID;
                                    if (uniqueParentIDs.indexOf(parentId) == -1) uniqueParentIDs.push(parentId);
                                }

                                for (i = 0; i < uniqueParentIDs.length; i++) {
                                    featurePromices.push(that._getConfigurationFeature(uniqueParentIDs[i]));
                                }

                                Promise.all(featurePromices).then(
                                    function (resp) {
                                        if (featureNotEnabled == 'true') {
                                            //For probes tracking calculate attached context details
                                            let totalAttachedContext = 0;
                                            for (let iCounter = 0; iCounter < resp.length; iCounter++) {
                                                totalAttachedContext += resp[iCounter].contexts.content.results.length;
                                            }

                                            let attachedContextLength = Math.round(totalAttachedContext / resp.length);

                                            //instanceId List are passed in pidList for method getFrozenEffectivityDetails which gives frozen Evolution Effectivity details.
                                            var effectivityOptions = {
                                                pidList: instanceList,
                                            };
                                            CfgUtility.getFrozenEffectivityDetails(effectivityOptions).then(
                                                function (iResponse) {
                                                    //Fills different global Lists which are used to show Error/Successful/Information message
                                                    that._getAvailableDomainDetails(iResponse);

                                                    for (i = 0; i < length; i++) {
                                                        if (configChageList.indexOf(data.selectedNodes[i].id) >= 0) {
                                                            failedList.push(data.selectedNodes[i].alias);

                                                            //[IR-636352 02-Jan-2020] spinner changed with Failed node Effectivity
                                                            if (!that.options.context) {
                                                                hasEff = data.selectedNodes[i].effectivity;
                                                                varEff = data.selectedNodes[i].variantEffectivity;
                                                                nodeList[i].updateOptions({
                                                                    grid: {
                                                                        Effectivity: hasEff,
                                                                        VariantEffectivity: varEff,
                                                                    },
                                                                });
                                                            }
                                                        }

                                                        //[IR-888047 29-Sep-2021] Added work under Authoring context empty check as --> authHeaders.length == 0.
                                                        //frozen products are removed from valid Products list which is passed to Paste Variant Effectivity operation. Original Effectivity should be shown.
                                                        if (frozenEvolutionList.indexOf(data.selectedNodes[i].id) >= 0 && authHeaders.length == 0) {
                                                            //[IR-636352 02-Jan-2020] spinner changed with Failed node Effectivity
                                                            if (!that.options.context) {
                                                                hasEff = data.selectedNodes[i].effectivity;
                                                                varEff = data.selectedNodes[i].variantEffectivity;
                                                                nodeList[i].updateOptions({
                                                                    grid: {
                                                                        Effectivity: hasEff,
                                                                        VariantEffectivity: varEff,
                                                                    },
                                                                });
                                                            }
                                                        }
                                                    }

                                                    //Unsupported types or ConfigChange products are removed from valid Products list which is passed to Paste Variant Effectivity operation.
                                                    if (failedList.length > 0) {
                                                        //Removed Products which are not supported like Drawing.
                                                        for (i = 0; i < configChageList.length; i++) {
                                                            var instId = configChageList[i];
                                                            var index = instanceList.indexOf(instId);
                                                            if (index > -1) {
                                                                instanceList.splice(index, 1);
                                                            }
                                                        }
                                                    }

                                                    //[IR-888047 29-Sep-2021] Added work under Authoring context empty check as --> authHeaders.length == 0.
                                                    //For Active Work under Authoring context, Frozen Evolution Check on reference Evolution Effectivity should be avoided
                                                    //and passed as Valid reference for Paste Variant Effectivity operation
                                                    //frozen Evolution Products are removed from valid Products list which is passed to Paste Variant Effectivity operation for empty Work under Authoring context.
                                                    if (frozenEvolutionList.length > 0 && authHeaders.length == 0) {
                                                        for (i = 0; i < frozenEvolutionList.length; i++) {
                                                            var instId = frozenEvolutionList[i];
                                                            var index = instanceList.indexOf(instId);
                                                            if (index > -1) {
                                                                instanceList.splice(index, 1);
                                                            }
                                                        }
                                                    }

                                                    //Valid products passed to Paste Variant Effectivity operation.
                                                    if (instanceList.length > 0) {
                                                        //show frozen Evolution check Information message for Paste Variant Effectivity operation
                                                        //[IR-888047 29-Sep-2021] Added work under Authoring context empty check as --> authHeaders.length == 0 for Frozen Evolution message.
                                                        if (frozenEvolutionList.length > 0 && authHeaders.length == 0) CfgUtility.showwarning(EffectivityNLS.CFG_Frozen_Evolution_Paste_Variant_Operation_Info, 'info');

                                                        var variantEffxml = CfgData.VariantEffectivity;
                                                        if (variantEffxml != undefined && variantEffxml != null) {
                                                            allPromises.push(that._setVariantEffectivity(instanceList, data.selectedNodes[0].alias, variantEffxml, authHeaders, data));
                                                        }
                                                    } else {
                                                        //show frozen Evolution check error message for Paste Variant Effectivity operation
                                                        //[IR-888047 29-Sep-2021] Added work under Authoring context empty check as --> authHeaders.length == 0 for Frozen Evolution message.
                                                        if (frozenEvolutionList.length > 0 && authHeaders.length == 0) CfgUtility.showwarning(EffectivityNLS.CFG_Frozen_Evolution_Paste_Variant_Operation_Error, 'error');

                                                        that._showMessage();
                                                    }

                                                    //send Paste Variant Effectivity operation details for cloud probes tracking
                                                    let probesOptions = { selectedNodesLength: data.selectedNodes.length, contextLength: attachedContextLength };
                                                    that.sendPasteVariantTrackerEvent(probesOptions);
                                                },
                                                function (error) { }
                                            );
                                        } else {
                                            failedList.push(data.selectedNodes[0].alias);
                                            if (instanceList.length > 1) failedList.push(data.selectedNodes[0].alias);

                                            //[IR-636352 02-Jan-2020] spinner changed with Failed node Effectivity
                                            if (!that.options.context) {
                                                for (i = 0; i < length; i++) {
                                                    hasEff = data.selectedNodes[i].effectivity;
                                                    varEff = data.selectedNodes[i].variantEffectivity;
                                                    nodeList[i].updateOptions({
                                                        grid: {
                                                            Effectivity: hasEff,
                                                            VariantEffectivity: varEff,
                                                        },
                                                    });
                                                }
                                            }

                                            that._showMessage();
                                        }
                                    },
                                    function (error) {
                                        //[IR-940450 05-May-2022] commented below check to show error for Non-PADContext applications.
                                        //if (!that.options.context) {
                                        failedList.push(data.selectedNodes[0].alias);
                                        if (instanceList.length > 1) failedList.push(data.selectedNodes[0].alias);

                                        for (i = 0; i < length; i++) {
                                            hasEff = data.selectedNodes[i].effectivity;
                                            varEff = data.selectedNodes[i].variantEffectivity;
                                            nodeList[i].updateOptions({
                                                grid: {
                                                    Effectivity: hasEff,
                                                    VariantEffectivity: varEff,
                                                },
                                            });
                                        }
                                        that._showMessage();
                                        //}
                                    }
                                );
                            }
                        },
                        function () {
                            that.enable();
                            CfgUtility.showwarning(EffectivityNLS.CFG_Service_Fail, 'error');
                        }
                    );
                }
            }
        },
    });
    return CfgPasteEffectivityCmd;
});
