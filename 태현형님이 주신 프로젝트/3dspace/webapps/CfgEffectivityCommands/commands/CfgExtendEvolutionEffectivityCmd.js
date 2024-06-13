define('DS/CfgEffectivityCommands/commands/CfgExtendEvolutionEffectivityCmd', [
    'DS/CfgBaseUX/scripts/CfgController',
    'DS/CfgBaseUX/scripts/CfgUtility',
    'DS/CfgBaseUX/scripts/CfgData',
    'i18n!DS/CfgWebAppEffectivityUX/assets/nls/CfgEffectivityNLS',
    'DS/CfgEffectivityCommands/commands/CfgEffCmd',
    'DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext',
    'DS/PlatformAPI/PlatformAPI',
], function (CfgController, CfgUtility, CfgData, EffectivityNLS, CfgEffCmd, CfgAuthoringContext, PlatformAPI) {
    'use strict';
    var availableEvolutionList = [];
    var CfgExtendEvolutionEffectivityCmd = CfgEffCmd.extend({
        /**
         * Override base class CfgEffCmd function for selectedNodes.length >= 1 because Extend Effectivity functionality is supported for multuiple products
         */
        _checkSelection: function () {
            //-- Init the selection
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

        /*
         * Used to check context is attached or criteria checked for Extent Effectivity operation.
         */
        _getExtendEffectivityCriteriaCheck: function (parentID) {
            var returnedPromise = new Promise(function (resolve, reject) {
                var failure = function (error) {
                    CfgUtility.showwarning(EffectivityNLS.CFG_No_Context_Copy_Evolution, 'error');
                    reject(error.errorMessage);
                };
                var url = '/resources/modeler/configuration/navigationServices/getConfiguredObjectInfo/pid:' + parentID + '?cfgCtxt=1&enabledCriteria=1&version=1.2';
                var selectedCriteria = [];
                var successfulModellist = function (response) {
                    //Add selected criteria to selectedCriteria which is used to check criteria during Paste Evolution operation.
                    if (response.version == '1.2' && response.enabledCriterias != undefined) {
                        var modelCriteria = response.enabledCriterias;
                        for (var key in modelCriteria) {
                            if (modelCriteria.hasOwnProperty(key)) {
                                //Checked criteria for attached context which is selected and not feature.
                                if (modelCriteria[key] == 'true' && key != 'feature') {
                                    selectedCriteria.push(key);
                                }
                            }
                        }
                        if (selectedCriteria.length > 0) {
                            //Assigned selectedCriteria to global variable CfgData.extendEvolutionCriteria which is used to check valid data for Extend Effectivity operation.
                            CfgData.extendEvolutionCriteria = selectedCriteria;
                        } else {
                            //When Evolution criteria is not selected then global variable CfgData.extendEvolutionCriteria assigned to empty value.
                            CfgData.extendEvolutionCriteria = [];
                        }
                    }
                    resolve(response);
                };
                CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/ds-json', '', successfulModellist, failure, true);
            });
            return returnedPromise;
        },

        /**
         * Used to get empty Evolution Effectivity check before Extend Evolution Effectivity operation. For PCS improvement lightweight _getAvailableDemainDetails is used.
         */
        _getAvailableDemainDetails: function (instanceList) {
            var returnedPromise = new Promise(function (resolve, reject) {
                var success = function (response) {
                    for (var key in response) {
                        if (response.hasOwnProperty(key)) {
                            if (response[key].length == 2 || (response[key].length == 1 && response[key].toString() == 'Evolution')) availableEvolutionList.push(key);
                        }
                    }
                    resolve(response);
                };
                var failure = function (response) {
                    reject(response);
                };
                var inputjson = ' ';
                inputjson = {
                    version: '1.0',
                    pidList: instanceList,
                };

                var url = '/resources/modeler/configuration/expressionServices/getAvailableDomains';
                var inputjsonTxt = JSON.stringify(inputjson);

                CfgUtility.makeWSCall(url, 'POST', 'enovia', 'json', inputjsonTxt, success, failure, true);
            });
            return returnedPromise;
        },

        /**
         * Used to perform Extend Evolution Effectivity operation.
         */
        _processExtendEffectivityOperation: function (options) {
            var that = this;
            var data = options.data;
            var authHeaders = options.authHeaders;

            //Called after tennant and security context details are fetched.
            var getExtendEvolutionEffectivity_callback = function () {
                var instanceList = [];
                for (var i = 0; i < data.selectedNodes.length; i++) {
                    instanceList.push(data.selectedNodes[i].id);
                }

                var wsOptions = {
                    operationheader: {
                        key: authHeaders[0].key,
                        value: authHeaders[0].value,
                    },
                };

                //Empty Evolution effectivity check is performed in method _getExtendEffectivityCriteriaCheck.
                that._getExtendEffectivityCriteriaCheck(data.selectedNodes[0].parentID).then(
                    function (criteriaResponse) {
                        if (CfgData.extendEvolutionCriteria != undefined && CfgData.extendEvolutionCriteria.length > 0) {
                            var thatlocal = that;
                            availableEvolutionList = [];
                            // For PCS improvement lightweight _getAvailableDemainDetails is used to check Evolution Effectivity is present or not.
                            var returnPromise = that._getAvailableDemainDetails(instanceList);
                            returnPromise.then(
                                function () {
                                    var that = thatlocal;
                                    //All products should have Evolution Effectivity then only passed for Extend operation.
                                    if (availableEvolutionList.length == instanceList.length) {
                                        var returnedPromiseEff = new Promise(function (resolve, reject) {
                                            let jsonData = {
                                                version: '1.0',
                                                resources: instanceList,
                                            };

                                            let url = '/resources/modeler/configuration/authoringServices/extendEffectivities';
                                            let postdata = JSON.stringify(jsonData);
                                            //[IR-951371 02-Jun-2022] show modeler error message
                                            let failure = function (jsonresponse1, error) {
                                                var jsonresponse = error ? error : jsonresponse1;
                                                reject(jsonresponse);
                                            };
                                            let onCompleteCallBack = function (extendEffectivitiesResponse) {
                                                resolve(extendEffectivitiesResponse);
                                            };
                                            CfgUtility.makeWSCall(url, 'POST', 'enovia', 'application/json', postdata, onCompleteCallBack, failure, true, wsOptions);
                                        });

                                        //After Extend Evolution Effectiviy operation, Effectivity modification event is published to refresh update Effectivity column values.
                                        returnedPromiseEff.then(
                                            function (response) {
                                                that.enable();
                                                if (response.globalStatus != undefined) {
                                                    if (response.globalStatus != undefined && response.globalStatus != 'ERROR') {
                                                        //Publish Effectivity modification event for Extend Effectivity details
                                                        var refreshEventMessage = {
                                                            commandName: 'cfgExtendEvolutionEffectivity',
                                                            widgetId: widget.id,
                                                            response: response,
                                                            data: {},
                                                        };

                                                        CfgUtility.publishPostProcessingEventForApplications(refreshEventMessage);
                                                    }

                                                    if (response.globalStatus == 'SUCCESS') {
                                                        CfgUtility.showwarning(EffectivityNLS.CFG_Extend_Successful, 'success');
                                                    } else if (response.globalStatus == 'ERROR') {
                                                        CfgUtility.showwarning(EffectivityNLS.CFG_Extend_Failure, 'error');
                                                    } else if (response.globalStatus == 'ATLEAST_ONEFAILURE') {
                                                        CfgUtility.showwarning(EffectivityNLS.CFG_Extend_PartialSuccessful, 'info');
                                                    }
                                                }
                                            },
                                            function (errorResponse) {
                                                if (errorResponse && errorResponse.errorMessage) {
                                                    CfgUtility.showwarning(errorResponse.errorMessage, 'error'); //[IR-951371 02-Jun-2022] show error message from modeler
                                                }
                                                that.enable();
                                            }
                                        );
                                    } else {
                                        //error message for empty Evolution Effectivity is shown.
                                        CfgUtility.showwarning(EffectivityNLS.CFG_Extend_No_Evolution, 'error');
                                        that.enable();
                                    }
                                },
                                function () {
                                    that.enable();
                                    CfgUtility.showwarning(EffectivityNLS.CFG_Service_Fail, 'error');
                                }
                            );
                        } else {
                            //error message for context not attached to parent reference.
                            if (criteriaResponse.contexts != undefined && criteriaResponse.contexts.content != undefined && criteriaResponse.contexts.content.results != undefined && criteriaResponse.contexts.content.results.length == 0) {
                                CfgUtility.showwarning(EffectivityNLS.CFG_Extend_No_Context, 'error');
                            } //error message for No Evolution criteria selected.
                            else {
                                CfgUtility.showwarning(EffectivityNLS.CFG_Extend_No_Criteria, 'error');
                            }
                            that.enable();
                        }
                    },
                    function () {
                        that.enable();
                        CfgUtility.showwarning(EffectivityNLS.CFG_Service_Fail, 'error');
                    }
                );
            };

            CfgController.init();

            if (widget.getValue('x3dPlatformId')) enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
            else enoviaServerFilterWidget.tenant = 'OnPremise';

            CfgUtility.populate3DSpaceURL().then(function () {
                CfgUtility.populateSecurityContext().then(function () {
                    getExtendEvolutionEffectivity_callback();
                });
            });
        },
        /*
         * Don't overload it. Method execute is called when user clicks Extend Evolution Effectivity command
         */
        execute: function () {
            var that = this;
            that.disable();
            //User selection for Extend Evolution Effectivity operation.
            var data = that.getData();

            //For valid single / multiple child selection Extend Evolution Effectivity operation is supported.
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                //Check work under authoring context details for Extend Evolution Effectivity operation.
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
                    that.enable();
                    CfgUtility.showwarning(EffectivityNLS.CFG_Extend_With_Session_Allowed, 'error');
                    return;
                }

                var options = { data: data, authHeaders: authHeaders };
                that._processExtendEffectivityOperation(options);
            }
        },
    });

    return CfgExtendEvolutionEffectivityCmd;
});
