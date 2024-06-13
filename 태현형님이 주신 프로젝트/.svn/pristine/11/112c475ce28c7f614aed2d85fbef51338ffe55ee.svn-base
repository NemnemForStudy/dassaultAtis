define('DS/CfgEffectivityCommands/commands/CfgCopyEffectivityCmd', [
    'DS/CfgTracker/CfgTracker',
    'DS/CfgTracker/CfgDimension',
    'DS/CfgTracker/CfgValue',
    'DS/CfgEffectivityCommands/commands/CfgCommandUtilityCmd',
    'DS/CfgBaseUX/scripts/CfgController',
    'DS/CfgBaseUX/scripts/CfgUtility',
    'DS/CfgBaseUX/scripts/CfgData',
    'DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext',
    'i18n!DS/CfgWebAppEffectivityUX/assets/nls/CfgEffectivityNLS',
    'i18n!DS/CfgBaseUX/assets/nls/CfgBaseUXNLS',
    'DS/CfgEffectivityCommands/commands/CfgEffCmd',
], function (CfgTracker, CfgDimension, CfgValue, CfgCommandUtility, CfgController, CfgUtility, CfgData, CfgAuthoringContext, EffectivityNLS, CfgCommonNLS, CfgEffCmd) {
    'use strict';

    var CfgCopyEffectivityCmd = CfgEffCmd.extend({
        _onRefresh: function () {
            CfgData.isVariantEffAvailable = ' ';
        },
        /*
         * Used to check model is attached to parent product. If Model is not attached to parent product then Error message is shown.
         */
        _getContextAttachedCheck: function (parentID) {
            var returnedPromise = new Promise(function (resolve, reject) {
                var failure = function (error) {
                    CfgUtility.showwarning(EffectivityNLS.CFG_No_Context_Copy_Variant, 'error');
                    reject(error.errorMessage);
                };
                var url = '/resources/modeler/configuration/navigationServices/getConfiguredObjectInfo/pid:' + parentID + '?cfgCtxt=1&enabledCriteria=1&version=1.2';
                var successfulModellist = function (response) {
                    //Read attached Model count for cloud probes for Copy Variant Effectivity operation
                    let attachedCount = 0;
                    if (response.contexts != undefined && response.contexts.content != undefined && response.contexts.content.results != undefined) attachedCount = response.contexts.content.results.length;
                    CfgData.attachedVariantModelCount = attachedCount;

                    resolve(response);
                };
                CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/ds-json', '', successfulModellist, failure, true);
            });
            return returnedPromise;
        },

        /**
         * Don't overload it
         */
        execute: async function () {
            //IR-1051749 - For SAXR on edit variant call is directly coming to CfgCopyEffectivityCmd, so isEditVariantEnabled is undefined so adding service to get info.
            if (CfgData && CfgData.isEditVariantEnabled === undefined) {
                await CfgUtility.getDisabledEditVariantStatus();
            }
            //IR-950795
            if (CfgData && CfgData.isEditVariantEnabled === false) {
                CfgUtility.showwarning(CfgCommonNLS.CopyVariantDisabled, 'error');
                return;
            }

            var that = this;
            that.disable();
            var data = that.getData();

            if (data.selectedNodes && data.selectedNodes.length > 0) {
                if (data.selectedNodes[0].isRoot == true) {
                    console.log('Cannot copy Variant Effectivity for a root node');
                    that.enable();
                } else {
                    let getEffectivity_callback = function () {
                        that._getContextAttachedCheck(data.selectedNodes[0].parentID).then(
                            function (contextResponse) {
                                if (contextResponse.contexts != undefined && contextResponse.contexts.content != undefined && contextResponse.contexts.content.results != undefined && contextResponse.contexts.content.results.length == 0) {
                                    CfgUtility.showwarning(EffectivityNLS.CFG_No_Context_Copy_Variant, 'error');
                                    that.enable();
                                } else if (contextResponse.enabledCriterias != undefined && contextResponse.enabledCriterias.feature != undefined && contextResponse.enabledCriterias.feature == 'false') {
                                    CfgUtility.showwarning(EffectivityNLS.CFG_No_Variant_Crit_Error, 'error');
                                    that.enable();
                                } else {
                                    var returnedPromiseEff = new Promise(function (resolve, reject) {
                                        var jsonData = {
                                            version: '1.3',
                                            output: {
                                                targetFormat: 'XML',
                                                withDescription: 'NO',
                                                view: 'Current',
                                                domains: 'ALL',
                                            },
                                            pidList: [data.selectedNodes[0].id],
                                        };
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
                                                    if (response.expressions[key].status == 'SUCCESS' && response.expressions[key].hasEffectivity == 'YES' && response.expressions[key].content.Variant != null && response.expressions[key].content.Variant != '') {
                                                        CfgData.isVariantEffAvailable = 'YES';
                                                        CfgData.VariantEffectivity = response.expressions[key].content.Variant;
                                                        CfgUtility.showwarning(EffectivityNLS.CFG_Copy_Effectivity_Successful + ' ' + data.selectedNodes[0].alias, 'success');
                                                    } else if (
                                                        (response.expressions[key].status == 'SUCCESS' && response.expressions[key].hasEffectivity == 'NO') ||
                                                        (response.expressions[key].status == 'SUCCESS' && response.expressions[key].hasEffectivity == 'YES' && response.expressions[key].content.Evolution != null && response.expressions[key].content.Evolution != '')
                                                    ) {
                                                        CfgData.isVariantEffAvailable = 'NO';
                                                        CfgUtility.showwarning(EffectivityNLS.CFG_Copy_NoEffectivity, 'info');
                                                    } else {
                                                        CfgData.isVariantEffAvailable = ' ';
                                                        CfgUtility.showwarning(EffectivityNLS.CFG_Copy_Effectivity_Failed + ' ' + data.selectedNodes[0].alias, 'error');
                                                    }
                                                }
                                            }

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

                                                //Assign default Variability used for empty Variant effectivity probes tracking
                                                let selectState = {
                                                    nbVariablity: 0,
                                                    nbVariablityValue: 0,
                                                    complex: 0,
                                                };

                                                //when valid Variant Effectivity is present then read Variability details
                                                if (CfgData.isVariantEffAvailable == 'YES') {
                                                    selectState = CfgCommandUtility.getTrackerInformation(CfgData.VariantEffectivity);
                                                }

                                                //Assign values to global variable which are used in Paste Variant Effectivity operation probes tracking
                                                let probesValuesForPasteVariantOpertaion = { nbVariablity: selectState.nbVariablity, nbVariablityValue: selectState.nbVariablityValue, complex: selectState.complex };
                                                CfgData.probesValuesForPasteVariantOpertaion = probesValuesForPasteVariantOpertaion;

                                                CfgTracker.createEventBuilder({
                                                    category: CfgTracker.Category['USAGE'],
                                                    action: CfgTracker.Events['CLICK'],
                                                    tenant: widget.getValue('x3dPlatformId'),
                                                })
                                                    .setLabel(CfgTracker.Labels['COPY_PASTE_VARIANT_EFFECTIVITY'])
                                                    .setAppId(widget.data.appId || 'NO_APP_ID')
                                                    .addDimension(CfgDimension.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_EFFECTIVITY_WIDGET, widget.data.title || widget.options.title || 'ODT Environment')
                                                    .addDimension(CfgDimension.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_EFFECTIVITY_MODE, 'Copy')
                                                    .addDimension(CfgDimension.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_EFFECTIVITY_WORK_UNDER, authoringMode)
                                                    .addPersonalValue(CfgValue.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_NO_OF_MODEL, CfgData.attachedVariantModelCount)
                                                    .addPersonalValue(CfgValue.COPY_PASTE_VARIANT_EFFECTIVITY.COPY_PASTE_VARIANT_NO_OF_OBJECT, data.selectedNodes.length)
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
                                        function (error) {
                                            that.enable();
                                        }
                                    );
                                }
                            },
                            function () {
                                that.enable();
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
            }
        },
    });

    return CfgCopyEffectivityCmd;
});
