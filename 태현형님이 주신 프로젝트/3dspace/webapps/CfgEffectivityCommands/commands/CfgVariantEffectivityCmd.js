define('DS/CfgEffectivityCommands/commands/CfgVariantEffectivityCmd', [
    'DS/CfgEffectivityCommands/commands/CfgEffCmd',
    'DS/CfgBaseUX/scripts/CfgController',
    'DS/CfgBaseUX/scripts/CfgUtility',
    'DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext',
    'DS/CfgBaseUX/scripts/CfgData',
    'i18n!DS/CfgVariantEffectivityEditor/assets/nls/CfgVariantEffectivityEditor',
    'i18n!DS/CfgMassVariantEffectivityEditor/assets/nls/CfgMassVariantEffectivityEditor',
    'i18n!DS/CfgBaseUX/assets/nls/CfgBaseUXNLS',
    'text!DS/CfgBaseUX/assets/CfgUXEnvVariables.json',
], function (CfgEffCmd, CfgController, CfgUtility, CfgAuthoringContext, CfgData, CfgVariantEffectivityEditorNLS, CfgMassVariantEffectivityEditorNLS, CfgCommonNLS, CfgUXEnvVariables_text) {
    'use strict';

    var CfgVariantCmd = CfgEffCmd.extend({
        destroy: function () {},
        execute: async function () {
            //IR-1051749 - For SAXR on edit variant call is directly coming to CfgVariantEffectivityCmd, so isEditVariantEnabled is undefined so adding service to get info.
            if (CfgData && CfgData.isEditVariantEnabled === undefined) {
                await CfgUtility.getDisabledEditVariantStatus();
            }
            //FUN122867
            if (CfgData && CfgData.isEditVariantEnabled === false) {
                CfgUtility.showwarning(CfgCommonNLS.Edit_Variant_Disabled, 'error');
                return;
            }
            var self = this;
            //[IR-927637 09-Mar-2022] moved getPAndOAccess(["GetVariant", "SetVariant"]) done for IR-822862 to individual methods executeEditVariantEffectivity and executeEditMassVariantEffectivity
            //after populateSecurityContext() check.
            var data = this.getData();

            if (data.selectedNodes && data.selectedNodes.length == 1) {
                this.executeEditVariantEffectivity();
            } else {
                //initialise controller object
                CfgController.init();
                //take latest tenant for web service calls.
                if (widget) enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
                else enoviaServerFilterWidget.tenant = 'OnPremise';

                this.executeEditMassVariantEffectivity();
            }
        },
        //method getListOfTypes
        //list out all the unique types selected
        //output types object with keys as a types.
        getListOfTypes: function () {
            var types = {};
            var data = this.getData();
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                for (var count = 0; count < data.selectedNodes.length; count++) {
                    types[data.selectedNodes[count].VPMRef] = '';
                }
            }
            return types;
        },

        processVariantEffectivityAndLaunchDialog: async function (eff_response) {
            var that = this;
            var hasEffectivity = null;
            var effExpressionXml = '';

            var instanceID = that.varOptions.instanceID;
            var instObj = eff_response.expressions;

            //Check frozen Evolution Effectivity check and show error message
            //[IR-888047 29-Sep-2021] Added work under Authoring context empty check as --> that.varOptions.cfg_auth_ctx == undefined.
            //For Active Work under Authoring context, Frozen Evolution Check on reference Evolution Effectivity should be avoided.
            let evolExpression = '';
            if (CfgUtility.isDefined(instObj[instanceID].content) && CfgUtility.isDefined(instObj[instanceID].content.Evolution) && CfgUtility.isDefined(instObj[instanceID].content.Evolution.Current)) evolExpression = instObj[instanceID].content.Evolution.Current;

            //Authoring context not defined => frozen check needs to be done.
            //Authoring context is defined => Edit varinat is possible(Instance is splited).
            if (!CfgUtility.isDefined(that.varOptions.cfg_auth_ctx)) {
                var frozenDetails = await CfgUtility.getFrozenCheck([
                    {
                        instanceId: instanceID,
                        evolutionXML: evolExpression,
                    },
                ]).catch((error) => {
                    that.enable();
                    CfgUtility.showwarning(CfgCommonNLS.CfgInstancesBelongToFrozenEvolutionFailed, 'error');
                    return;
                });
                if (frozenDetails.length == 1 && frozenDetails[0].isFrozen == true) {
                    that.enable();
                    if (evolExpression == '') CfgUtility.showwarning(CfgCommonNLS.CfgFrozenEvolutionWhenNoEff, 'error');
                    else CfgUtility.showwarning(CfgCommonNLS.CfgFrozenEvolution, 'error');
                    return;
                }
            }

            if (instObj[instanceID].hasEffectivity === 'NO') {
                console.log('Has No Effectivity');
                hasEffectivity = false;
            } else if (instObj[instanceID].content.ConfigChange != null && instObj[instanceID].content.ConfigChange != 'undefined') {
                that.enable();
                //console.log('Non Decoupled/Legacy Effectivity');
                CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Legacy_Eff_Error, 'error');
                return;
            } else if (instObj[instanceID].content.Variant == null || instObj[instanceID].content.Variant == '' || instObj[instanceID].content.Variant == 'undefined') {
                console.log('Evolution Effectivity might be set hence Variant would be null or undefined');
                hasEffectivity = false;
            } else {
                console.log('Decoupled Variant Effectivity');
                hasEffectivity = true;
                effExpressionXml = instObj[instanceID].content.Variant;
            }

            that.varOptions.varEffXML = effExpressionXml;
            that.varOptions.hasEffectivity = hasEffectivity;

            console.log('Effectivity Loaded for :' + instanceID);

            //To avoid unset Effectivity web-service call for empty Effectivity
            if (effExpressionXml == '') that.varOptions.isEmptyVariantEffectivity = true;

            require(['DS/CfgVariantEffectivityEditor/scripts/CfgVariantEffectivityInit'], function (CfgVariantEffectivityInit) {
                CfgVariantEffectivityInit.init(that.varOptions);
                if (that.CfgUXEnvVariables.isWUXDialogEnabled == false) {
                    document.getElementsByClassName('CfgDashboardDialog')[0].setAttribute('style', document.getElementsByClassName('CfgDashboardDialog')[0].getAttribute('style') + 'min-height:406px !important;min-width:320px !important;');
                }
            });

            that.enable();
        },

        executeEditVariantEffectivity: function () {
            var that = this;
            that.disable();

            var data = that.getData();
            var instances = [];
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                for (var count = 0; count < data.selectedNodes.length; count++) {
                    var instance = {};
                    instance.instanceId = data.selectedNodes[count].id;
                    instance.name = data.selectedNodes[count].alias;
                    instances.push(instance);
                }

                if (data.selectedNodes && data.selectedNodes.length > 0) {
                    if (data.selectedNodes[0].isRoot == true) {
                        console.log('Cannot Open Edit Variant Dialog for a root node');
                        that.enable();
                    } else {
                        var createDialog_callback = function () {
                            that.varOptions = {
                                selectedInstances: instances,
                                postOKHandler: that.options.postOKHandler,
                                contextData: null,
                                hasEffectivity: null,
                                varEffXML: '',
                                parent: null,
                                parentElement: null,
                                isEmptyVariantEffectivity: false,
                                parentID: data.selectedNodes[0].parentID,
                                instanceID: data.selectedNodes[0].id,
                                persistId: 'CfgEditVariantEffectivity',
                                selectedNodes: data.padNodes,
                                PADContext: data.PADContext,
                                mode: 'Dashboard',
                                ca: { headers: [] },
                                dialogue: {
                                    header: CfgVariantEffectivityEditorNLS.Dialog_Header + ' - ' + data.selectedNodes[0].alias,
                                    target: widget.body,
                                    buttonArray: null,
                                },
                            };

                            var GCOI_Options = {
                                parentID: that.varOptions.parentID,
                            };

                            that.varOptions.contextData = null;
                            var getConfiguredObjectInfoPromise = CfgUtility.getConfiguredObjectInfo(GCOI_Options);

                            getConfiguredObjectInfoPromise.then(
                                function (response) {
                                    if (response == null || response == 'undefined') {
                                        that.varOptions.contextData = null;
                                    } else if (response.version == '1.2') {
                                        that.varOptions.contextData = response.contexts.content.results;
                                    }

                                    if (that.varOptions.contextData == null || that.varOptions.contextData == 0) {
                                        that.enable();
                                        CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.No_Model_Error, 'error');
                                        return;
                                    }

                                    //web service output for error is switchng json format randomly in between index [0] and [1].
                                    //IR-959163
                                    if (
                                        response.contexts.content.results[0] != undefined &&
                                        response.contexts.content.results[0].notification != undefined &&
                                        response.contexts.content.results[0].notification.code == 'unaccessible' &&
                                        response.contexts.content.results[0].notification.type == 'ERROR'
                                    ) {
                                        CfgUtility.showwarning(response.contexts.content.results[0].notification.message, 'error');
                                        that.enable();
                                        return;
                                    }

                                    if (
                                        response.contexts.content.results[1] != undefined &&
                                        response.contexts.content.results[1].notification != undefined &&
                                        response.contexts.content.results[1].notification.code == 'unaccessible' &&
                                        response.contexts.content.results[1].notification.type == 'ERROR'
                                    ) {
                                        CfgUtility.showwarning(response.contexts.content.results[1].notification.message, 'error');
                                        that.enable();
                                        return;
                                    }

                                    if (response.version == '1.2' && response.enabledCriterias.feature == 'false') {
                                        that.enable();
                                        CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.No_Variant_Crit_Error, 'error');
                                        return;
                                    }

                                    //Used to show context mis-match error message when root's attached configuration context and work under evolution authoring context are different
                                    var contextCheckOptions = {};
                                    contextCheckOptions.iResponse = response;
                                    contextCheckOptions.iAuthoringContext = CfgAuthoringContext.get();
                                    if (CfgUtility.getContextMisMatchCheck(contextCheckOptions) == true) {
                                        that.enable();
                                        CfgUtility.showwarning(CfgCommonNLS.CfgErrorContextMisMatch, 'error');
                                        return;
                                    }

                                    // Added for uses of CfgUtility.getDisplayExpressionUsingXSLT during displayName in Edit Variant/Option operation
                                    CfgUtility.populateDisplayExpressionXSLT();

                                    //console.log("Configured Objects/models loaded");

                                    that.varOptions.evoEffXML = '';
                                    that.varOptions.varEffXML = '';
                                    that.varOptions.hasEffectivity = null; // hasEffectivity = has Variant Effectivity ?

                                    var GMFOI_Options = {
                                        version: '1.3',
                                        targetFormat: 'XML',
                                        withDescription: 'YES',
                                        view: 'All',
                                        domains: 'All',
                                        pidList: [that.varOptions.instanceID],
                                    };
                                    var getMultipleFilterableObjectInfoPromise = CfgUtility.getMultipleFilterableObjectInfo(GMFOI_Options);

                                    getMultipleFilterableObjectInfoPromise.then(
                                        function (eff_response) {
                                            if (eff_response.expressions[that.varOptions.instanceID].status === 'ERROR' || eff_response.expressions[that.varOptions.instanceID].hasEffectivity === 'ERROR') {
                                                that.enable();
                                                //console.log('getMultipleFilterableObjectInfo Service Failure');
                                                CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                                return;
                                            }

                                            //check whether change controlled
                                            var isChangePromise = CfgUtility.isChangeControlled(that.varOptions.parentID);

                                            isChangePromise.then(
                                                function (change_response) {
                                                    var cfg_auth_ctx = CfgAuthoringContext.get();
                                                    if (cfg_auth_ctx && cfg_auth_ctx.AuthoringContextHeader) {
                                                        for (var key in cfg_auth_ctx.AuthoringContextHeader) {
                                                            that.varOptions.ca.headers.push({
                                                                key: key,
                                                                value: cfg_auth_ctx.AuthoringContextHeader[key],
                                                            });
                                                        }
                                                        that.varOptions.cfg_auth_ctx = cfg_auth_ctx;
                                                    }

                                                    if (change_response == 'any') {
                                                        //Change controlled

                                                        if (that.varOptions.ca.headers.length > 0) {
                                                            if (that.varOptions.ca.headers[0].key == 'DS-Change-Authoring-Context') {
                                                                //Applicability
                                                                var applicabilityPromise = new Promise(function (resolve, reject) {
                                                                    var failure = function (tmp_response) {
                                                                        reject(tmp_response);
                                                                    };
                                                                    var success = function (tmp_response) {
                                                                        resolve(tmp_response);
                                                                    };
                                                                    var url = '/resources/modeler/change/changeaction/pid:' + that.varOptions.cfg_auth_ctx.change.id + '?applicability=1';
                                                                    var inputJsonTxt = '';

                                                                    CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/json', inputJsonTxt, success, failure, true);
                                                                });
                                                                applicabilityPromise.then(
                                                                    function (applicability_response) {
                                                                        that.varOptions.evoEffXML = applicability_response.changeaction.applicability.expressionXML;
                                                                        that.processVariantEffectivityAndLaunchDialog(eff_response);
                                                                    },
                                                                    function (error_response) {
                                                                        that.enable();
                                                                        CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                                                    }
                                                                );
                                                            } else if (that.varOptions.ca.headers[0].key == 'DS-Configuration-Authoring-Context') {
                                                                // If Parent Reference is Change controlled then Change Authoring Context must be defined
                                                                that.enable();
                                                                CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.CC_AC_HDR_Error, 'error');
                                                                return;
                                                            }
                                                        } else {
                                                            // If Parent Reference is Change controlled then Authoring Context must be defined
                                                            that.enable();
                                                            CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.CC_AC_HDR_Error, 'error');
                                                            return;
                                                        }
                                                    } else if (change_response == 'none') {
                                                        //Not Change controlled but must check if Authoring context is defined

                                                        if (that.varOptions.ca.headers.length > 0) {
                                                            if (that.varOptions.ca.headers[0].key == 'DS-Change-Authoring-Context') {
                                                                //Applicability
                                                                var applicabilityPromise = new Promise(function (resolve, reject) {
                                                                    var failure = function (tmp_response) {
                                                                        reject(tmp_response);
                                                                    };
                                                                    var success = function (tmp_response) {
                                                                        resolve(tmp_response);
                                                                    };
                                                                    var url = '/resources/modeler/change/changeaction/pid:' + that.varOptions.cfg_auth_ctx.change.id + '?applicability=1';
                                                                    var inputJsonTxt = '';

                                                                    CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/json', inputJsonTxt, success, failure, true);
                                                                });
                                                                applicabilityPromise.then(
                                                                    function (applicability_response) {
                                                                        that.varOptions.evoEffXML = applicability_response.changeaction.applicability.expressionXML;
                                                                        that.processVariantEffectivityAndLaunchDialog(eff_response);
                                                                    },
                                                                    function (error_response) {
                                                                        that.enable();
                                                                        CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                                                    }
                                                                );
                                                            } else if (that.varOptions.ca.headers[0].key == 'DS-Configuration-Authoring-Context') {
                                                                //Session Effectivity
                                                                that.varOptions.evoEffXML = that.varOptions.cfg_auth_ctx.evolution.expression;
                                                                that.processVariantEffectivityAndLaunchDialog(eff_response);
                                                            }
                                                        } else {
                                                            // Evolution Effectivity
                                                            if (eff_response.expressions[that.varOptions.instanceID].hasEffectivity == 'YES' && eff_response.expressions[that.varOptions.instanceID].content.Evolution)
                                                                that.varOptions.evoEffXML = eff_response.expressions[that.varOptions.instanceID].content.Evolution.Current;
                                                            that.processVariantEffectivityAndLaunchDialog(eff_response);
                                                        }
                                                    }
                                                },
                                                function (error_response) {
                                                    that.enable();
                                                    CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                                }
                                            );
                                        },
                                        function (error_response) {
                                            that.enable();
                                            CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                        }
                                    );
                                },
                                function (error_response) {
                                    that.enable();
                                    CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                }
                            );
                        };

                        if (widget) enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
                        else enoviaServerFilterWidget.tenant = 'OnPremise';

                        CfgUtility.populate3DSpaceURL().then(function () {
                            CfgUtility.populateSecurityContext().then(function () {
                                //[IR-927637 09-Mar-2022] added getPAndOAccess(["GetVariant", "SetVariant"]) check
                                CfgUtility.getPAndOAccess(['GetVariant', 'SetVariant']).then(
                                    //IR-822862
                                    function (infoPAndOAccess) {
                                        if (infoPAndOAccess.SetVariant == 'Not Granted') {
                                            CfgUtility.showwarning(CfgCommonNLS.CfgMessageAccessRightsError, 'error');
                                            that.enable();
                                        } else {
                                            createDialog_callback();
                                        }
                                    }
                                );
                            });
                        });
                    }
                }
            }
        },

        executeEditMassVariantEffectivity: function () {
            //keep command disable after start of execution
            this.disable();
            //get parent of all selected instances
            var oParentId = this.getCommonParentId();

            //get all types of selected instances list
            var types = this.getListOfTypes();
            var typesArray = [];
            for (var key in types) {
                if (types.hasOwnProperty(key)) {
                    typesArray.push(key);
                }
            }
            var me = this;
            var data = this.getData();

            if (widget) enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
            else enoviaServerFilterWidget.tenant = 'OnPremise';

            //populate 3dspace url for calling web services
            CfgUtility.populate3DSpaceURL().then(function () {
                //get security context for user
                CfgUtility.populateSecurityContext().then(function () {
                    //[IR-927637 09-Mar-2022] added getPAndOAccess(["GetVariant", "SetVariant"]) check
                    CfgUtility.getPAndOAccess(['GetVariant', 'SetVariant']).then(
                        //IR-822862
                        function (infoPAndOAccess) {
                            if (infoPAndOAccess.SetVariant == 'Not Granted') {
                                CfgUtility.showwarning(CfgCommonNLS.CfgMessageAccessRightsError, 'error');
                                me.enable();
                            } else {
                                CfgUtility.checkProperties(typesArray).then(
                                    function (iResponse) {
                                        var selectedInstances = me.processSelectedNodes(iResponse);
                                        if (selectedInstances.length === 0) {
                                            //All selected object type are not supported for Mass Edit dialog
                                            CfgUtility.showwarning(CfgMassVariantEffectivityEditorNLS.CFG_Invalid_All_Objects, 'error');
                                            return;
                                        }

                                        //some Objects are removed by method processSelectedNodes and information message is shown.
                                        if (selectedInstances.length != data.selectedNodes.length) {
                                            CfgUtility.showwarning(CfgMassVariantEffectivityEditorNLS.CFG_Invalid_Objects, 'info');
                                        }

                                        //Prepare valid instanceId List to check frozen Evolution Effectivity
                                        var instanceIdList = [];
                                        for (var counter = 0; counter < selectedInstances.length; counter++) {
                                            instanceIdList.push(selectedInstances[counter].instanceId);
                                        }

                                        //instanceId List are passed in pidList for method getFrozenEffectivityDetails which gives frozen Evolution Effectivity details.
                                        var effectivityOptions = { pidList: instanceIdList };
                                        CfgUtility.getFrozenEffectivityDetails(effectivityOptions).then(
                                            function (iResponse) {
                                                //Read Authoring context details for checking frozen Evolution check.
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

                                                //If frozen Evolution Effectivity is present then we show information message about it.
                                                if (iResponse.length > 0) {
                                                    var isFrozenFound = false;
                                                    //[IR-888047 29-Sep-2021] Added work under Authoring context empty check as --> authHeaders.length == 0.
                                                    //For Active Work under Authoring context, Frozen Evolution Check on reference Evolution Effectivity should be avoided.
                                                    if (authHeaders.length == 0) {
                                                        //Remove frozen instances from selected instances to avoid unwanted variant Effectivity modification.
                                                        for (var count = 0; count < iResponse.length; count++) {
                                                            var frozenInstanceId = iResponse[count].instanceId;
                                                            //frozen Evolution Effectivity should be removed
                                                            if (iResponse[count].isFrozen == true) {
                                                                isFrozenFound = true;
                                                                var frozenIndex = selectedInstances.findIndex(function (item) {
                                                                    return item.instanceId == frozenInstanceId;
                                                                });
                                                                selectedInstances.splice(frozenIndex, 1);
                                                            }
                                                        }
                                                    }

                                                    //There is no valid instance to open Mass Edit dialog so error message is shown.
                                                    if (selectedInstances.length == 0) {
                                                        CfgUtility.showwarning(CfgCommonNLS.CfgFrozenEvolutionMass, 'error');
                                                        me.enable(); //[IR-1031561 04-Jan-2023] enabled Edit Variant/Option Effectivity command
                                                        return;
                                                    } else if (isFrozenFound == true) {
                                                        //After removal of frozen Evolution Effectivity instances, there are some valid instances so information message is shown
                                                        CfgUtility.showwarning(CfgCommonNLS.CFGMessageFrozenObjectsPresent, 'info');
                                                    }
                                                }

                                                CfgUtility.populateDisplayExpressionXSLT();
                                                var options = { parentID: oParentId };
                                                CfgUtility.getConfiguredObjectInfo(options).then(
                                                    function (iResponse) {
                                                        //web service output for error is switchng json format randomly in between index [0] and [1].
                                                        //IR-959163
                                                        if (
                                                            iResponse.contexts.content.results[0] != undefined &&
                                                            iResponse.contexts.content.results[0].notification != undefined &&
                                                            iResponse.contexts.content.results[0].notification.code == 'unaccessible' &&
                                                            iResponse.contexts.content.results[0].notification.type == 'ERROR'
                                                        ) {
                                                            CfgUtility.showwarning(iResponse.contexts.content.results[0].notification.message, 'error');
                                                            me.enable();
                                                            return;
                                                        }
                                                        if (
                                                            iResponse.contexts.content.results[1] != undefined &&
                                                            iResponse.contexts.content.results[1].notification != undefined &&
                                                            iResponse.contexts.content.results[1].notification.code == 'unaccessible' &&
                                                            iResponse.contexts.content.results[1].notification.type == 'ERROR'
                                                        ) {
                                                            CfgUtility.showwarning(iResponse.contexts.content.results[1].notification.message, 'error');
                                                            me.enable();
                                                            return;
                                                        }
                                                        if (iResponse.contexts.content.results.length == 0) {
                                                            CfgUtility.showwarning(CfgMassVariantEffectivityEditorNLS.CFG_No_Model_Error, 'error');
                                                            me.enable();
                                                            return;
                                                        }

                                                        if (iResponse.version == '1.2' && iResponse.enabledCriterias.feature == 'false') {
                                                            CfgUtility.showwarning(CfgMassVariantEffectivityEditorNLS.CFG_No_Model_attached, 'error');
                                                            me.enable();
                                                            return;
                                                        }

                                                        //Used to show context mis-match error message when root's attached configuration context and work under evolution authoring context are different
                                                        var contextCheckOptions = {};
                                                        contextCheckOptions.iResponse = iResponse;
                                                        contextCheckOptions.iAuthoringContext = CfgAuthoringContext.get();
                                                        if (CfgUtility.getContextMisMatchCheck(contextCheckOptions) == true) {
                                                            CfgUtility.showwarning(CfgCommonNLS.CfgErrorContextMisMatch, 'error');
                                                            me.enable();
                                                            return;
                                                        }

                                                        //[IR-746459 20-Feb-2020] For change controlled Parent Reference, Work under change must be defined message is shown if there is no Autohring context assigned.
                                                        var isChangePromise = CfgUtility.isChangeControlled(options.parentID);
                                                        isChangePromise.then(
                                                            function (change_response) {
                                                                me.evolutionExpression = '';
                                                                me.attachedModels = iResponse;
                                                                if (change_response == 'any') {
                                                                    //Change controlled

                                                                    if (authHeaders.length > 0) {
                                                                        if (authHeaders[0].key == 'DS-Change-Authoring-Context') {
                                                                            //Applicability
                                                                            var applicabilityPromise = new Promise(function (resolve, reject) {
                                                                                var failure = function (tmp_response) {
                                                                                    reject(tmp_response);
                                                                                };
                                                                                var success = function (tmp_response) {
                                                                                    resolve(tmp_response);
                                                                                };
                                                                                var url = '/resources/modeler/change/changeaction/pid:' + cfg.change.id + '?applicability=1';
                                                                                var inputJsonTxt = '';

                                                                                CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/json', inputJsonTxt, success, failure, true);
                                                                            });
                                                                            applicabilityPromise.then(
                                                                                function (applicability_response) {
                                                                                    me.evolutionExpression = applicability_response.changeaction.applicability.expressionXML;
                                                                                    // call mass dialog that.processVariantEffectivityAndLaunchDialog(eff_response);
                                                                                    var dialogOptions = {
                                                                                        change_response: change_response,
                                                                                        authHeaders: authHeaders,
                                                                                        attachedModels: me.attachedModels,
                                                                                        selectedInstances: selectedInstances,
                                                                                        PADContext: data.PADContext,
                                                                                        evolutionExpression: me.evolutionExpression,
                                                                                    };
                                                                                    me.launchMassVariantDialog(dialogOptions);
                                                                                },
                                                                                function (error_response) {
                                                                                    me.enable();
                                                                                    CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                                                                }
                                                                            );
                                                                        } else if (authHeaders[0].key == 'DS-Configuration-Authoring-Context') {
                                                                            // If Parent Reference is Change controlled then Change Authoring Context must be defined
                                                                            me.enable();
                                                                            CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.CC_AC_HDR_Error, 'error');
                                                                            return;
                                                                        }
                                                                    } else {
                                                                        // If Parent Reference is Change controlled then Authoring Context must be defined
                                                                        me.enable();
                                                                        CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.CC_AC_HDR_Error, 'error');
                                                                        return;
                                                                    }
                                                                } else if (change_response == 'none') {
                                                                    //Not Change controlled but must check if Authoring context is defined

                                                                    if (authHeaders.length > 0) {
                                                                        if (authHeaders[0].key == 'DS-Change-Authoring-Context') {
                                                                            //Applicability
                                                                            var applicabilityPromise = new Promise(function (resolve, reject) {
                                                                                var failure = function (tmp_response) {
                                                                                    reject(tmp_response);
                                                                                };
                                                                                var success = function (tmp_response) {
                                                                                    resolve(tmp_response);
                                                                                };
                                                                                var url = '/resources/modeler/change/changeaction/pid:' + cfg.change.id + '?applicability=1';
                                                                                var inputJsonTxt = '';

                                                                                CfgUtility.makeWSCall(url, 'GET', 'enovia', 'application/json', inputJsonTxt, success, failure, true);
                                                                            });
                                                                            applicabilityPromise.then(
                                                                                function (applicability_response) {
                                                                                    me.evolutionExpression = applicability_response.changeaction.applicability.expressionXML;
                                                                                    var dialogOptions = {
                                                                                        change_response: change_response,
                                                                                        authHeaders: authHeaders,
                                                                                        attachedModels: me.attachedModels,
                                                                                        selectedInstances: selectedInstances,
                                                                                        PADContext: data.PADContext,
                                                                                        evolutionExpression: me.evolutionExpression,
                                                                                    };
                                                                                    me.launchMassVariantDialog(dialogOptions);
                                                                                },
                                                                                function (error_response) {
                                                                                    me.enable();
                                                                                    CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                                                                }
                                                                            );
                                                                        } else if (authHeaders[0].key == 'DS-Configuration-Authoring-Context') {
                                                                            //Session Effectivity
                                                                            me.evolutionExpression = cfg.evolution.expression;
                                                                            var dialogOptions = {
                                                                                change_response: change_response,
                                                                                authHeaders: authHeaders,
                                                                                attachedModels: me.attachedModels,
                                                                                selectedInstances: selectedInstances,
                                                                                PADContext: data.PADContext,
                                                                                evolutionExpression: me.evolutionExpression,
                                                                            };
                                                                            me.launchMassVariantDialog(dialogOptions);
                                                                        }
                                                                    } else {
                                                                        // Evolution Effectivity
                                                                        me.evolutionExpression = '';
                                                                        var dialogOptions = {
                                                                            change_response: change_response,
                                                                            authHeaders: authHeaders,
                                                                            attachedModels: me.attachedModels,
                                                                            selectedInstances: selectedInstances,
                                                                            PADContext: data.PADContext,
                                                                            evolutionExpression: me.evolutionExpression,
                                                                        };
                                                                        me.launchMassVariantDialog(dialogOptions);
                                                                    }
                                                                }
                                                            },
                                                            function () {
                                                                me.enable();
                                                                CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                                            }
                                                        );
                                                    },
                                                    function () {
                                                        CfgUtility.showwarning(CfgMassVariantEffectivityEditorNLS.CFG_Attach_Model_Fail, 'error');
                                                    }
                                                );
                                            },
                                            function () {
                                                me.enable();
                                                CfgUtility.showwarning(CfgVariantEffectivityEditorNLS.Service_Fail, 'error');
                                            }
                                        );
                                    },
                                    function () {
                                        CfgUtility.showwarning(CfgMassVariantEffectivityEditorNLS.CFG_Authoring_context_Fail, 'error');
                                    }
                                );
                            }
                        }
                    );
                });
            });
        },
        launchMassVariantDialog: function (iDialogOptions) {
            var me = this;

            require(['DS/CfgMassVariantEffectivityEditor/scripts/CfgMassVariantEffectivityEditorLayout'], function (CfgMassVariantEffectivityEditorLayout) {
                me.CfgUXEnvVariables = JSON.parse(CfgUXEnvVariables_text);

                var options = {
                    attachedModels: iDialogOptions.attachedModels,
                    selectedInstances: iDialogOptions.selectedInstances,
                    PADContext: iDialogOptions.PADContext,
                    evolutionExpression: iDialogOptions.evolutionExpression,
                };

                //For Mass Edit set Work Under Authoring context details
                options.WorkUnderDetails = iDialogOptions.authHeaders;

                //returned CfgMassVariantEffectivityEditorLayout object for ODT checking changes done for single context, Information details should have valid values
                me.massEditLayoutObject = CfgMassVariantEffectivityEditorLayout.render(options);
                me.enable();
            });
        },
        processSelectedNodes: function (iIsFilterablesInformation) {
            var data = this.getData();
            var instances = [];
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                for (var count = 0; count < data.selectedNodes.length; count++) {
                    var instance = {};
                    instance.instanceId = data.selectedNodes[count].id;
                    instance.name = data.selectedNodes[count].alias;
                    if (iIsFilterablesInformation[data.selectedNodes[count].VPMRef].filterable == 'YES' || iIsFilterablesInformation[data.selectedNodes[count].VPMRef].configurable == 'YES') instances.push(instance);
                }
                return instances;
            }
        },
        _onResize: function () {
            var data = this.getData();
            if (data != null && data.selectedNodes && data.selectedNodes.length != 0 && data.selectedNodes.length != 1) {
                this._checkSelection();
                return;
            }
            this._setStateCmd();
        },
        _checkSelection: function () {
            //-- Init the selection
            this._SelectedID = '';
            var data = this.getData();
            if (data.selectedNodes.length != 0 && data.selectedNodes.length != 1) {
                this._SelectedID = data.selectedNodes[0].id || '';
                this.isRoot = data.selectedNodes[0].isRoot;
                this._setStateCmd();
                if (this.isRootSelected() == true) {
                    this.disable();
                    return;
                }
                if (this.areInstancesFromSameLevel() == false) {
                    this.disable();
                    return;
                }
                if (this.isSelectionExceedUpperLimit() == false) {
                    this.disable();
                    return;
                }

                //check for screen size less than 768px
                //Mass variant edit command will be disabled when window screen is less than 768px
                //  var mqMobile = window.matchMedia("(max-width: 768px)");
                // if (mqMobile.matches) { this.disable(); return; }

                return;
            }
            if (data.selectedNodes.length === 1) {
                this._SelectedID = data.selectedNodes[0].id || '';
                this.isRoot = data.selectedNodes[0].isRoot;
            }
            //-- State of the command
            this._setStateCmd();
        },
        //check if all selected instances are from same level.//parent id of such instances should be same.
        areInstancesFromSameLevel: function () {
            var data = this.getData();
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                var parentId = data.selectedNodes[0].parentID;
                for (var count = 0; count < data.selectedNodes.length; count++) {
                    if (parentId == data.selectedNodes[count].parentID) continue;
                    else {
                        parentId = '';
                        break;
                    }
                }
                if (parentId == '') return false;
                return true;
            }
        },
        //get parent id of selected instances.
        //return parent id
        getCommonParentId: function () {
            var data = this.getData();
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                var parentId = data.selectedNodes[0].parentID;
                for (var count = 0; count < data.selectedNodes.length; count++) {
                    if (parentId == data.selectedNodes[count].parentID) continue;
                    else parentId = '';
                }
                return parentId;
            }
        },
        //check if root is selected.
        //return true if root is selected
        isRootSelected: function () {
            var data = this.getData();
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                if (data.selectedNodes[0].isRoot == true) return true;
            }
        },
        //check limit for selection of instances.
        //
        isSelectionExceedUpperLimit: function () {
            var data = this.getData();
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                if (data.selectedNodes.length > 100) return false;
                else return true;
            }
        },
    });

    return CfgVariantCmd;
});
