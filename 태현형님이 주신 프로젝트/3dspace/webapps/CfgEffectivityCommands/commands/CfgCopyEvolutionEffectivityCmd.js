define('DS/CfgEffectivityCommands/commands/CfgCopyEvolutionEffectivityCmd', [
    'DS/CfgTracker/CfgTracker',
    'DS/CfgTracker/CfgDimension',
    'DS/CfgTracker/CfgValue',
    'DS/CfgBaseUX/scripts/CfgXMLServices',
    'DS/CfgBaseUX/scripts/CfgController',
    'DS/CfgBaseUX/scripts/CfgUtility',
    'DS/CfgBaseUX/scripts/CfgData',
    'i18n!DS/CfgWebAppEffectivityUX/assets/nls/CfgEffectivityNLS',
    'DS/CfgEffectivityCommands/commands/CfgEffCmd',
    'DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext',
], function (CfgTracker, CfgDimension, CfgValue, CfgXMLServices, CfgController, CfgUtility, CfgData, EffectivityNLS, CfgEffCmd, CfgAuthoringContext) {
    'use strict';

    var CfgCopyEvolutionEffectivityCmd = CfgEffCmd.extend({
        _onRefresh: function () {
            //For widget Refresh opertaion, existing copied data should be cleared.
            CfgData.isEvolutionEffAvailable = ' ';
        },
        /*
         * Used to check criteria checked for attached context for Copy Effectviity operation.
         */
        _getCopyCriteriaCheck: function (parentID) {
            var returnedPromise = new Promise(function (resolve, reject) {
                var failure = function (error) {
                    CfgUtility.showwarning(EffectivityNLS.CFG_No_Context_Copy_Evolution, 'error');
                    reject(error.errorMessage);
                };
                var url = '/resources/modeler/configuration/navigationServices/getConfiguredObjectInfo/pid:' + parentID + '?cfgCtxt=1&enabledCriteria=1&version=1.2';
                var copyCriteria = [];
                var successfulModellist = function (response) {
                    //Read attached Model count for cloud probes for Copy Evolution Effectivity operation
                    let attachedCount = 0;
                    if (response.contexts != undefined && response.contexts.content != undefined && response.contexts.content.results != undefined) attachedCount = response.contexts.content.results.length;
                    CfgData.attachedEvolutionModelCount = attachedCount;

                    //Add selected criteria to copyCriteria which is used to check criteria during Paste Evolution operation.
                    if (response.version == '1.2' && response.enabledCriterias != undefined) {
                        var modelCriteria = response.enabledCriterias;
                        for (var key in modelCriteria) {
                            if (modelCriteria.hasOwnProperty(key)) {
                                //Checked criteria for attached context which is selected and not feature.
                                if (modelCriteria[key] == 'true' && key != 'feature') {
                                    copyCriteria.push(key);
                                }
                            }
                        }
                        if (copyCriteria.length > 0) {
                            //Assigned copyCriteria to global variable CfgData.copyEvolutionCriteria which is used in Paste Evolution Effectivity operation.
                            CfgData.copyEvolutionCriteria = copyCriteria;
                        } else {
                            //When Evolution criteria is not selected then global variable CfgData.copyEvolutionCriteria assigned to empty value.
                            CfgData.copyEvolutionCriteria = [];
                        }
                    }
                    resolve(response);
                };
                CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/ds-json', '', successfulModellist, failure, true);
            });
            return returnedPromise;
        },
        /*
         * Don't overload it
         */
        execute: function () {
            var that = this;
            that.disable();
            var data = that.getData();

            if (data.selectedNodes && data.selectedNodes.length > 0) {
                var getEffectivity_callback = function () {
                    //check whether change controlled
                    var isChangePromise = CfgUtility.isChangeControlled(data.selectedNodes[0].parentID);
                    isChangePromise.then(
                        function (change_response) {
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

                            //For Work Under authoring context present, Copy Evolution Effectivity operation should not be allowed
                            if (authHeaders.length > 0) {
                                CfgUtility.showwarning(EffectivityNLS.CFG_Copy_Evolution_Not_Allowed, 'error');
                                return;
                            }

                            //Need to check Change controlled Object and restict Copy Evolution Effectivity operation.
                            if (change_response == 'any') {
                                if (authHeaders.length == 0) {
                                    CfgUtility.showwarning(EffectivityNLS.CC_AC_HDR_Error, 'error');
                                    return;
                                }
                            }

                            that._getCopyCriteriaCheck(data.selectedNodes[0].parentID).then(
                                async function (criteriaResponse) {
                                    if (CfgData.copyEvolutionCriteria != undefined && CfgData.copyEvolutionCriteria.length > 0) {
                                        var frozenDetails = await CfgUtility.getFrozenCheck([
                                            {
                                                instanceId: data.selectedNodes[0].id,
                                            },
                                        ]);
                                        if (frozenDetails.length == 1 && frozenDetails[0].isFrozen == true) {
                                            CfgUtility.showwarning(EffectivityNLS.CFG_Frozen_Evolution, 'error');
                                            return;
                                        }

                                        var returnedPromiseEff = new Promise(function (resolve, reject) {
                                            var jsonData = {
                                                version: '1.3',
                                                output: {
                                                    targetFormat: 'XML',
                                                    withDescription: 'YES',
                                                    view: 'Current',
                                                    domains: 'ALL',
                                                },
                                                pidList: [data.selectedNodes[0].id],
                                            };

                                            //Read Effectivity details for selected product.
                                            var url = '/resources/modeler/configuration/navigationServices/getMultipleFilterableObjectInfo';
                                            var postdata = JSON.stringify(jsonData);
                                            var onCompleteCallBack = function (getMultipleFilterableObjectInfo) {
                                                resolve(getMultipleFilterableObjectInfo);
                                            };
                                            CfgUtility.makeWSCall(url, 'POST', 'enovia', 'application/json', postdata, onCompleteCallBack, reject, true);
                                        });

                                        returnedPromiseEff.then(
                                            function (response) {
                                                that.enable();
                                                for (var key in response.expressions) {
                                                    if (response.expressions.hasOwnProperty(key)) {
                                                        //Read Currret Evolution Effectivity and stored it in golbal variable CfgData which is used in Paste Evolution Effectivity operation
                                                        if (
                                                            response.expressions[key].status == 'SUCCESS' &&
                                                            response.expressions[key].hasEffectivity == 'YES' &&
                                                            response.expressions[key].content.Evolution != null &&
                                                            response.expressions[key].content.Evolution.Current != null &&
                                                            response.expressions[key].content.Evolution.Current != ''
                                                        ) {
                                                            CfgData.EvolutionEffectivity = response.expressions[key].content.Evolution.Current;
                                                            CfgData.isEvolutionEffAvailable = 'YES';
                                                            CfgUtility.showwarning(EffectivityNLS.CFG_Copy_Evolution_Effectivity_Successful + ' ' + data.selectedNodes[0].alias, 'success');
                                                        } else if (
                                                            (response.expressions[key].status == 'SUCCESS' && response.expressions[key].hasEffectivity == 'NO') ||
                                                            (response.expressions[key].status == 'SUCCESS' && response.expressions[key].hasEffectivity == 'YES' && response.expressions[key].content.Evolution != null && response.expressions[key].content.Evolution != '')
                                                        ) {
                                                            //When user selects Empty Evolution Effectivity for Copy Effectivity operation then information message is shown. Paste Effectivity operation on Target products will clear Evolution Effectivity.
                                                            CfgData.isEvolutionEffAvailable = 'NO';
                                                            CfgUtility.showwarning(EffectivityNLS.CFG_Copy_NoEvolutionEffectivity, 'info');
                                                        } else {
                                                            //Error case where Evolution Effectivity is not supported like Drawing type.
                                                            CfgData.isEvolutionEffAvailable = ' ';
                                                            CfgUtility.showwarning(EffectivityNLS.CFG_Copy_Evolution_Effectivity_Failed + ' ' + data.selectedNodes[0].alias, 'error');
                                                        }
                                                    }
                                                }

                                                try {
                                                    //Assign default Evolution criteria used for empty evolution effectivity probes tracking
                                                    let evolutionCriteria = {
                                                        mvCriteria: 'NONE',
                                                        mpCriteria: 'NONE',
                                                        unitCriteria: 'NONE',
                                                        dateCriteria: 'NONE',
                                                    };

                                                    //when valid Evolution Effectivity is present then read Evolution critera set
                                                    if (CfgData.isEvolutionEffAvailable == 'YES') evolutionCriteria = CfgXMLServices.getProbesEvolutionCriteria(CfgData.EvolutionEffectivity);

                                                    //Assign values to global variable which are used in Paste Evolution operation Effectivity probes tracking
                                                    let probesValuesForPasteEvolutionOpertaion = { mvCriteria: evolutionCriteria.mvCriteria, mpCriteria: evolutionCriteria.mpCriteria, unitCriteria: evolutionCriteria.unitCriteria, dateCriteria: evolutionCriteria.dateCriteria };
                                                    CfgData.probesValuesForPasteEvolutionOpertaion = probesValuesForPasteEvolutionOpertaion;

                                                    CfgTracker.createEventBuilder({
                                                        category: CfgTracker.Category['USAGE'],
                                                        action: CfgTracker.Events['CLICK'],
                                                        tenant: enoviaServerFilterWidget.tenant,
                                                    })
                                                        .setLabel(CfgTracker.Labels['COPY_PASTE_EVOLUTION_EFFECTIVITY'])
                                                        .setAppId(widget.data.appId || 'NO_APP_ID')
                                                        .addDimension(CfgDimension.COPY_PASTE_EVOLUTION_EFFECTIVITY.COPY_PASTE_EVOLUTION_EFFECTIVITY_WIDGET, widget.data.title || widget.options.title || 'ODT Environment')
                                                        .addDimension(CfgDimension.COPY_PASTE_EVOLUTION_EFFECTIVITY.COPY_PASTE_EVOLUTION_EFFECTIVITY_MODE, 'Copy')
                                                        .addDimension(CfgDimension.COPY_PASTE_EVOLUTION_EFFECTIVITY.COPY_PASTE_EVOLUTION_CRITERIA_MODEL_VERSION, CfgTracker.ConfigCriteriaSelected[evolutionCriteria.mvCriteria])
                                                        .addDimension(CfgDimension.COPY_PASTE_EVOLUTION_EFFECTIVITY.COPY_PASTE_EVOLUTION_CRITERIA_MANUFACTURING_PLAN, CfgTracker.ConfigCriteriaSelected[evolutionCriteria.mpCriteria])
                                                        .addDimension(CfgDimension.COPY_PASTE_EVOLUTION_EFFECTIVITY.COPY_PASTE_EVOLUTION_CRITERIA_UNIT, CfgTracker.ConfigCriteriaSelected[evolutionCriteria.unitCriteria])
                                                        .addDimension(CfgDimension.COPY_PASTE_EVOLUTION_EFFECTIVITY.COPY_PASTE_EVOLUTION_CRITERIA_DATE, CfgTracker.ConfigCriteriaSelected[evolutionCriteria.dateCriteria])
                                                        .addPersonalValue(CfgValue.COPY_PASTE_EVOLUTION_EFFECTIVITY.COPY_PASTE_EVOLUTION_NO_OF_MODEL, CfgData.attachedEvolutionModelCount)
                                                        .addPersonalValue(CfgValue.COPY_PASTE_EVOLUTION_EFFECTIVITY.COPY_PASTE_EVOLUTION_NO_OF_OBJECT, data.selectedNodes.length)
                                                        .send();
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                            },
                                            function () {
                                                that.enable();
                                            }
                                        );
                                    } else {
                                        if (criteriaResponse.contexts != undefined && criteriaResponse.contexts.content != undefined && criteriaResponse.contexts.content.results != undefined && criteriaResponse.contexts.content.results.length == 0) {
                                            CfgUtility.showwarning(EffectivityNLS.CFG_No_Context_Copy_Evolution, 'error');
                                        } else {
                                            CfgUtility.showwarning(EffectivityNLS.CFG_No_Criteria_Copy_Evolution, 'error');
                                        }
                                        that.enable();
                                    }
                                },
                                function () {
                                    that.enable();
                                    CfgUtility.showwarning(EffectivityNLS.CFG_Service_Fail, 'error');
                                }
                            );
                        },
                        function () {
                            that.enable();
                            CfgUtility.showwarning(EffectivityNLS.CFG_No_Context_Copy_Evolution, 'error');
                        }
                    );
                };

                CfgController.init();

                if (widget.getValue('x3dPlatformId')) enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
                else enoviaServerFilterWidget.tenant = 'OnPremise';

                CfgUtility.populate3DSpaceURL().then(function () {
                    CfgUtility.populateSecurityContext().then(function () {
                        enoviaServerFilterWidget.InstanceId = data.selectedNodes[0].id;
                        getEffectivity_callback();
                    });
                });
            }
        },
    });

    return CfgCopyEvolutionEffectivityCmd;
});
