/*********************************************************************/
/*@fullReview XF3 21/05/2016
/*********************************************************************/

define('DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctions',
[   'UWA/Core',
'DS/ConfiguratorPanel/scripts/Utilities',
'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
'DS/UIKIT/Mask',
'DS/UIKIT/Alert',
'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json'
],
function (UWA, Utilities, ConfiguratorVariables, Mask, Alert, nlsConfiguratorKeys) {
	'use strict';

	var ConfiguratorSolverFunctions = {
		solverCreated: false,
		solverKey: '',
		solverNode: null,
		solverId: '',
		configModel: null,
		modelEvents: null,
		//modelerCreated: false,
		//modelerKey: '',
		parentContainer: null,

		initSolver : function (modelId, configModel, modelEvents, configCriteria, parentContainer, options) {
			var myDico;
			var that = this;
			this.configModel = configModel;
			this.modelEvents = modelEvents;
			this.modelId = modelId;
			this.parentContainer = (parentContainer) ? parentContainer : document.body;
			if(options && options.tenant){
				this.tenant =options.tenant;
			}else {
				this.tenant = "OnPremise";
			}
			if(options && options.version){
				this.version =options.version;
			}else {
				this.version = "V1";
			}
			Mask.mask(this.parentContainer);
			this.modelEvents.subscribe({event:'ComputeConfigExpression'}, function() {
				var xmlComputed = configModel.getXMLExpression();
				that.modelEvents.publish({
					event: 'onConfigurationExpressionComputed',
					data: {
						xml: xmlComputed,
						binary: ""
					}
				});
				/*that.askBinary(function (binaryExpression) {
				console.log("--------- Callback of AskBinary function called !!!");

				var binaryExpressionFaked = "666C7403000302010200000000000508C84FB556A26A00004708BC572234060009C84FB556A26A00004708BC5722340600040100000000000000000000000000000005C84FB556A26A00007C08BC57C0D2040006C84FB556A26A00008C08BC5776440B0001000100000100000000010000000B1412010000010300017735940000017735940002020200000107B201010D01014E200D20183C3E030300000001041000000017120000010117130000001900000007000001020B00000008000001030A000000";
				//TODO : retrieve the binary in result variable

				that.modelEvents.publish({
						event: 'onConfigurationExpressionComputed',
						data: {
							xml: xmlComputed,
							binary: binaryExpressionFaked
						}
					});
				});*/
			});


			this.modelEvents.subscribe({ event: 'OnMultiSelectionChange' }, function (data) {
				that.SetMultiSelectionOnSolver(data.value, data.callsolve);
			});


			this.modelEvents.subscribe({ event: 'OnRuleAssistanceLevelChange' }, function (data) {
				if (data.value !== ConfiguratorVariables.NoRuleApplied)
				that.setSelectionModeOnSolver(data.value, data.callsolve);
			});


			this.modelEvents.subscribe({ event: 'SolverFct_getResultingStatusOriginators' }, function (data) {
				that.getResultingStatusOriginators(data.value);
			});

			this.modelEvents.subscribe({ event: 'SolverFct_CallSolveMethodOnSolver' }, function () {
				that.abortSolverCall();
				that.CallSolveMethodOnSolver();
			});

			this.modelEvents.subscribe({ event: 'SolverFct_updateConfigurations' }, function () {
				that.updateConfigurations();
			});

			this.modelEvents.subscribe({ event: 'SolverFct_getConfigurations' }, function (pcid) {
				that.getConfigurationsOnPC(pcid);
			});



			// Utilities.sendRequest(
			// 	"/resources/cfg/configurator/solver/initialization/context/" + modelId + "?parentContextId=" + modelId + "&random=" + Math.random(),
			// 	'POST',
			// 	'json',
			// 	false,
			// 	setDictionaryForDashboard,
			// 	showFailureMessage,
			// 	{
			// 		"configurationCriteria":configCriteria
			// 	},
			// 	400);

				var initializationOptions = {
					url: '/resources/cfg/configurator/solver/initialization/context/' + modelId + '?parentContextId=' + modelId + '&random=' + Math.random(),
					method: 'POST',
					responseType: 'json',
					data: {
						"configurationCriteria":configCriteria
					},
					// timeout: '400',
					tenant : that.tenant
				};
			return Utilities.sendRequestPromise(initializationOptions).then(setDictionaryForDashboard, showFailureMessage);

			function setDictionaryForDashboard(dictionaryData)
			{
				that.solverCreated = true;

				myDico = dictionaryData;
				//console.log("Success getDictionary =" + myDico);

				//Manage the release solver
				window.addEventListener("unload", function () {
					that.releaseSolver();
				});

				window.top.addEventListener("unload", function () {
					that.releaseSolver();
				});

				/*
				widget.addEvent('onRefresh', function (e) {
				that.releaseSolver();

				widget.dispatchEvent("onLoad");
			});	*/


			//Always diagnose the features
			that.setAlwaysDiagnosed(myDico.dictionary);

			if(that.version !== "V2"){
				var multiSelState = (that.configModel.getMultiSelectionState() === "true");
				 that.SetMultiSelectionOnSolver(multiSelState, false);
				 that.setSelectionModeOnSolver(that.configModel.getRulesMode());
			}else{
				if (that.configModel.getAppFunc().multiSelection === ConfiguratorVariables.str_yes || that.configModel.getAppFunc().selectionMode_Refine === ConfiguratorVariables.str_yes) {
					that.SetMultiSelectionOnSolver(multiSelState, false);
				}
				that.setSelectionModeOnSolver(that.configModel.getRulesMode());
				// that.CallSolveMethodOnSolver({firstCall : true});
			}

			//Check consistency of rules model
			that.CheckRulesConsistency();

			//Retrieve Hypervisor details
			// Utilities.sendRequest(
			// 	"/resources/cfg/configurator/solver/hypervisordetails"+ "?random=" + Math.random(),
			// 	'GET',
			// 	'json',
			// 	false,
			// 	function(HypervisorDetails) {
			// 		//that.connectToSolverNode(HypervisorDetails.hypervisorIp, HypervisorDetails.hypervisorPort, HypervisorDetails.solverKey);
			// 		that.solverKey = HypervisorDetails.solverKey;
			// 		console.log("************************** SolverKey : " + HypervisorDetails.solverKey);
			//
			// 		//that.createModeler(myDico.dictionary);
			//
			// 		callback(myDico.dictionary, HypervisorDetails.solverKey);
			//
			// 	},
			// 	function(msg) {
			// 		console.log("failed while getting Hypervisor details ="+msg);
			// 		//alert(arguments[1].message);
			// 	},
			// 	null,400);

				var hypervisorDetailOptions = {
					url: '/resources/cfg/configurator/solver/hypervisordetails'+ '?random=' + Math.random(),
					method: 'GET',
					responseType: 'json',
					data: null,
					// timeout: '400'
					tenant : that.tenant
				};
				return Utilities.sendRequestPromise(hypervisorDetailOptions).then(function success(HypervisorDetails) {
					//that.connectToSolverNode(HypervisorDetails.hypervisorIp, HypervisorDetails.hypervisorPort, HypervisorDetails.solverKey);
					that.solverKey = HypervisorDetails.solverKey;
					UWA.log("************************** SolverKey : " + HypervisorDetails.solverKey);
					Mask.unmask(that.parentContainer);
					return UWA.Promise.resolve({
						dictionary: myDico.dictionary,
						solverKey : HypervisorDetails.solverKey
					});

					// return UWA.Promise(function (resolve,) {
					// 	resolve([myDico.dictionary, HypervisorDetails.solverKey]);
					// });
				}, function fail(msg) {
					Mask.unmask(that.parentContainer);
					UWA.log("failed while getting Hypervisor details ="+msg);
				});
			}

			function showFailureMessage(msg)
			{
				UWA.log("failed while getting initdata ="+msg);
			}

		},

		// getConfigurationsOnPC : function(pcid){
		// 	var that = this;
		// 	if(this.solverCreated) {
		// 		 Mask.mask(this.parentContainer);
		// 		// Utilities.sendRequest(
		// 		// 	"/resources/cfg/configurator/configuration/" + pcid,
		// 		// 	'GET',
		// 		// 	'json',
		// 		// 	false,
		// 		// 	function(e)
		// 		// 	{
		// 		// 		that.configModel.setAppRulesParam(e.appRuleParam);
		// 		// 		that.configModel.setConfigurationCriteria(e.configurationCriteria);
		// 		//
		// 		// 		that.modelEvents.publish( {
		// 		// 			event:	'saved_configurations',
		// 		// 			data:	{
		// 		// 				configurations : e,
		// 		// 			}
		// 		// 		});
		// 		// 		Mask.unmask(that.parentContainer);
		// 		// 	},
		// 		// 	function(e)
		// 		// 	{
		// 		// 			Mask.unmask(that.parentContainer);
		// 		// 		console.log("Failed in Releasing Solver");
		// 		// 	},
		// 		// 	null,
		// 		// 	400
		// 		// );
		// 		var configurationOptions = {
		// 			url: '/resources/cfg/configurator/configuration/' + pcid,
		// 			method: 'GET',
		// 			responseType: 'json',
		// 			data: null,
		// 			// timeout: 400
		// 			tenant : that.tenant
		// 		};
		// 		Utilities.sendRequestPromise(configurationOptions).then(
		// 			function success(e)
		// 			{
		// 				Mask.unmask(that.parentContainer);
		// 				that.configModel.setAppRulesParam(e.appRuleParam);
		// 				that.configModel.setConfigurationCriteria(e.configurationCriteria);
		//
		// 				that.modelEvents.publish( {
		// 					event:	'saved_configurations',
		// 					data:	{
		// 						configurations : e,
		// 					}
		// 				});
		//
		// 			},
		// 			function fail(e)
		// 			{
		// 				 Mask.unmask(that.parentContainer);
		// 				console.log("Failed in Releasing Solver");
		// 			}
		// 		);
		// 	}
		// },

		// getConfigurationRule : function(pid,success, failure){
		// 	var configurationOptions = {
		// 		url: "/resources/modeler/configurationrule/pid:" + pid + "?attributes=1&random=" + Math.random(),
		// 		method: 'GET',
		// 		responseType: 'json',
		// 		data: null,
		// 		tenant : this.tenant
		// 	};
		// 	Utilities.sendRequestPromise(configurationOptions).then(success,failure);
		// },

		updateConfigurations : function(){
		},
		// 	var that = this;
		// 	var configStr = JSON.stringify(this.configModel.getConfigurationCriteria());
		// 	var appRuleParam = this.configModel.getAppRulesParam();
		// 	if(this.configModel.getRulesActivation() === "false"){
		// 		appRuleParam.rulesMode = "RulesMode_EnforceRequiredOptions"; //fails with "No rules mode" && blank quotes. Passing ruleActivation false is enough. This value is not referred.
		// 	}
		// 	var appRulesParamStr = JSON.stringify(appRuleParam);
		//
		// 	var productConfigDetails ={
		// 		"contextid": this.modelId,
		// 		"pcId": this.configModel.getPCId(),
		// 		"strListPriceValue": this.configModel._totalPrice,
		// 		"strAction":"edit"
		// 	};
		//
		// 	var productConfigDetailsStr = JSON.stringify(productConfigDetails);
		//
		// 	if(that.solverCreated) {
		// 		 Mask.mask(that.parentContainer);
		// 		// Utilities.sendRequest(
		// 		// 	"/resources/cfg/configurator/configuration"+ "?random=" + Math.random(),
		// 		// 	'POST',
		// 		// 	'json',
		// 		// 	false,
		// 		// 	function(e)
		// 		// 	{
		// 		// 		if(that.alert) that.alert.destroy();
		// 		// 		Mask.unmask(that.parentContainer);
		// 		// 		var notificationContainer = document.body.querySelector("#config-editor-notification-container");
		// 		// 		if(notificationContainer){
		// 		// 			that.alert = new Alert({
		// 		// 				visible: true,
		// 		// 				autoHide: true,
		// 		// 				hideDelay: 3000
		// 		// 			}).inject(notificationContainer);
		// 		//
		// 		// 			that.alert.elements.container.style.float = 'right';
		// 		// 			that.alert.elements.container.style.top = '0px';
		// 		// 			that.alert.elements.container.style.position = 'relative';
		// 		// 			that.alert.add({
		// 		// 				className: 'primary',
		// 		// 				message: "Configurations saved successfully!"
		// 		// 			});
		// 		// 		}
		// 		// 		console.log("Configurations saved successfully!");
		// 		// 	},
		// 		// 	function(e)
		// 		// 	{
		// 		// 		Mask.unmask(that.parentContainer);
		// 		// 		if(that.alert) that.alert.destroy();
		// 		// 		var notificationContainer = document.body.querySelector("#config-editor-notification-container");
		// 		// 		if(notificationContainer){
		// 		// 			that.alert = new Alert({
		// 		// 				visible: true,
		// 		// 				autoHide: true,
		// 		// 				hideDelay: 3000,
		// 		// 				className : "#config-alert"
		// 		// 			}).inject(notificationContainer);
		// 		//
		// 		// 			that.alert.elements.container.style.float = 'right';
		// 		// 			that.alert.elements.container.style.top = '0px';
		// 		// 			that.alert.elements.container.style.position = 'relative';
		// 		// 				that.alert.add({
		// 		// 				className: 'error',
		// 		// 				message: "Failed to save configurations!"
		// 		// 			});
		// 		// 		}
		// 		// 		console.log("Failed to save configurations");
		// 		// 	},
		// 		// 	{
		// 		// 		"productConfigDetails":productConfigDetailsStr,
		// 		// 		"selectedCriteria" : configStr,
		// 		// 		"appRuleParam" : appRulesParamStr
		// 		// 	},
		// 		// 	400
		// 		// );
		//
		// 		var Options = {
		// 			url: '/resources/cfg/configurator/configuration'+ '?random=' + Math.random(),
		// 			method: 'POST',
		// 			responseType: 'json',
		// 			data: {
		// 				"productConfigDetails":productConfigDetailsStr,
		// 				"selectedCriteria" : configStr,
		// 				"appRuleParam" : appRulesParamStr
		// 			},
		// 			timeout: 40000,
		// 			tenant : that.tenant
		// 		};
		// 		Utilities.sendRequestPromise(Options).then(
		// 			function success(e)
		// 			{
		// 				Mask.unmask(that.parentContainer);
		// 				if(that.alert) that.alert.destroy();
		// 				var notificationContainer = document.body.querySelector("#config-editor-notification-container");
		// 				if(notificationContainer){
		// 					that.alert = new Alert({
		// 						visible: true,
		// 						autoHide: true,
		// 						hideDelay: 3000
		// 					}).inject(notificationContainer);
		//
		// 					that.alert.elements.container.style.float = 'right';
		// 					that.alert.elements.container.style.top = '0px';
		// 					that.alert.elements.container.style.position = 'relative';
		// 					that.alert.add({
		// 						className: 'primary',
		// 						message: nlsConfiguratorKeys.saved_configurations_msg
		// 					});
		// 				}
		// 				console.log("Configurations saved successfully!");
		// 			},
		// 			function fail(e)
		// 			{
		// 				Mask.unmask(that.parentContainer);
		// 				if(that.alert) that.alert.destroy();
		// 				var notificationContainer = document.body.querySelector("#config-editor-notification-container");
		// 				if(notificationContainer){
		// 					that.alert = new Alert({
		// 						visible: true,
		// 						autoHide: true,
		// 						hideDelay: 3000,
		// 						className : "#config-alert"
		// 					}).inject(notificationContainer);
		//
		// 					that.alert.elements.container.style.float = 'right';
		// 					that.alert.elements.container.style.top = '0px';
		// 					that.alert.elements.container.style.position = 'relative';
		// 						that.alert.add({
		// 						className: 'error',
		// 						message: nlsConfiguratorKeys.failed_configurations_msg
		// 					});
		// 				}
		// 				console.log("Failed to save configurations");
		// 			}
		// 		);
		//
		// 	}
		// },

		releaseSolver: function () {
			var that = this;

			if(that.solverCreated) {
				Mask.mask(that.parentContainer);
				// Utilities.sendRequest(
				// 	"/resources/cfg/configurator/solver/release",
				// 	'POST',
				// 	null,
				// 	false,
				// 	function(e)
				// 	{
				// 		console.log("Solver Released");
				// 		that.solverCreated = false;
				// 		that.solverKey = '';
				// 		Mask.unmask(that.parentContainer);
				//
				// 	},
				// 	function(e)
				// 	{
				// 		console.log("Failed in Releasing Solver");
				// 	},
				// 	{ "solverKey": that.solverKey },
				// 	400
				// );
				var releaseSolverOptions = {
					url: '/resources/cfg/configurator/solver/release',
					method: 'POST',
					responseType: null,
					data: {'solverKey' : that.solverKey },
					// timeout: 400
					tenant : that.tenant
				};
				return Utilities.sendRequestPromise(releaseSolverOptions).then(
					function success()
					{
						UWA.log("Solver Released");
						Mask.unmask(that.parentContainer);
						that.solverCreated = false;
						that.solverKey = '';
						// Mask.unmask(that.parentContainer);
					},
					function fail()
					{
						Mask.unmask(that.parentContainer);
						UWA.log("Failed in Releasing Solver");
					}
				);
			}

			//that.deleteModeler();
		},

		/****************************************************************************************************/
		/*                                  connectToSolverNode()                                           */
		/****************************************************************************************************/

		/*connectToSolverNode: function (ipHypervisor, port, SolverNodeName) {
		var that = this;

		var nodeSolver = new EK.Node({
		hypervisorIp: ipHypervisor,
		webSocketPort: port,
		onText: onText,
		//onBinary: onBinary,
		//onClose: onClose,
		});

		that.solverNode = nodeSolver;

		/**********************************************************************/
		/*Callbacks for EK Communication                                      */
		/**********************************************************************/
		/*function onText(input) {
		console.log(input);
		}

		//Connect to solverNode
		that.solverKey = SolverNodeName;
		that.solverId = that.solverNode.connect(SolverNodeName).select();

		var sendDisconnection = {
		"_from": "configurator",
		"_to": "solver",
		"_request": "deleteNode",
		"_data": ""
		};

		that.solverNode.sendTextOnDisconnection(that.solverId, JSON.stringify(sendDisconnection));
		},*/


		/*createModeler: function (dictionary) {
		var that = this;

		Utilities.sendRequest(
		"/resources/cfg/configurator/modeler/create" + "?random=" + Math.random(),
		'GET',
		'json',
		false,
		function (result) {
		that.modelerCreated = true;
		that.modelerKey = result;

		console.log("Modeler successfully created !");

		that.initModeler(dictionary);
		},
		function (result) {
		console.log("failed while creating Modeler object : " + result);
		//alert(JSON.parse(arguments[1]).message);
		},
		null,
		null);
		},

		deleteModeler: function () {
		var that = this;

		if (that.modelerCreated) {
		Utilities.sendRequest(
		"/resources/cfg/configurator/modeler/delete",
		'POST',
		'json',
		false,
		function (e) {
		console.log("Modeler Deleted");
		that.modelerCreated = false;
		that.modelerKey = '';
		},
		function (e) {
		console.log("Failed in Deleting Modeler");
		},
		{ "modelerKey": that.modelerKey },
		null
		);
		}
		},

		initModeler: function (dictionary) {
		var that = this;

		if (that.modelerCreated) {
		Utilities.sendRequest(
		"/resources/cfg/configurator/modeler/initialize",
		'POST',
		'json',
		false,
		function (e) {
		console.log("Modeler Initialized !");
		},
		function (e) {
		console.log("Failed in Initializing Modeler");
		//alert(JSON.parse(e));
		},
		{
		"modelerKey": that.modelerKey,
		"jsonDico": dictionary
		},
		null
		);
		}
		},

		askBinary: function (callbackMethod) {
		var that = this;

		if (this.modelerCreated) {
		var xmlComputed = that.configModel.getXMLExpression();

		var jsonToSend = {
		"_from": "configurator",
		"_to": "modeler",
		"_request": "getBinaryEffectivity",
		"_data": xmlComputed
		};


		var message = JSON.stringify(jsonToSend);

		var completeMethod = function (result) {
		console.log(result);
		var binary = JSON.parse(result)._data.EffectivityBinary;

		callbackMethod(binary);
		};

		var failureMathod = function (result) {
		console.log("failed while getting computeAnswer result =" + result);
		//alert(JSON.parse(arguments[1]).message);
		};

		Utilities.sendRequest(
		"/resources/cfg/configurator/modeler/compute",
		'POST',
		'html',
		true,
		completeMethod,
		failureMathod,
		{
		"modelerKey": that.modelerKey,
		"jsonMsg": message
		},
		60000
		);
		}
		},	   */

		// callSolveForRules : function(jsonModel, callback){
		// if (this.solverCreated) {
		// 	// Mask.mask(this.parentContainer);
		// 	jsonModel._clientData = jsonModel._clientData || {};
		// 	jsonModel._clientData.type = jsonModel.statesCauses ? "validityWithCause" : "validity";
		//  	var requestData =  {
		// 		"matrixDefinition": {
		// 			"drivingCriteria": jsonModel.drivingCriteria,
		// 		 	"constrainedCriteria": jsonModel.constrainedCriteria,
		// 			"drivingCombinationValues": jsonModel.drivingCombinationValues,
		// 			"constrainedValues":jsonModel.constrainedValues,
		// 			"states": jsonModel.states
		// 		},
		// 		"buildtimeCheck": jsonModel._clientData.type,
		// 		"runtimeCheck": jsonModel._clientData.type
		// 	 };
		// 	if(jsonModel._clientData.type === "validityWithCause")
		// 	requestData.statesCauses = jsonModel.statesCauses;
		// 	var jsonToSend = {
		// 			"_from": "ruleEditor",
		// 			"_to": "solverRule",
		// 			"_version": jsonModel.version,
		// 			"_request": "checkMatrixRuleValidity",
		// 			"_data": requestData,
		// 			"_clientData" : jsonModel._clientData
		// 	};
		// 	var returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend),callback);
		// 	if (returnFromWebService != undefined) {
		// 		this.ApplyAnswer(returnFromWebService);
		// 	}
		// 	// Mask.mask(this.parentContainer);
		// 	}
		// },

		abortComputation : function(columnID){
				var jsonToSend = 		{
				"_from": "ruleEditor",
				"_to": "solver",
				"_request": "abortRequest",
				"_data": {
					"requestIds": [columnID]
				}
			};
			var returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend));

			if (returnFromWebService !== undefined) {
				this.ApplyAnswer(returnFromWebService);
			}
			// Mask.mask(this.parentContainer);
		},

		// setRuleActivation : function(ruleId, flag, callback){
		// 	var requestData =  {
		// 		"ruleId": ruleId,
		// 		 "ruleActivation": flag
		// 	};
		// 	var jsonToSend = {
		// 		"_from": "ruleEditor",
		// 		"_to": "solverRule",
		// 		"_request": "ruleActivation",
		// 		"_data": requestData
		// 	};
		// 	//this.keyForRules = solverKey;
		// 	var returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend), callback);
		//
		// 	if (returnFromWebService != undefined) {
		// 		this.ApplyAnswer(returnFromWebService);
		// 	}
		// 	// Mask.mask(this.parentContainer);
		// },

		CallSolveMethodOnSolver: function (options) {
			if (this.solverCreated) {
				if (this.configModel.getRulesActivation() == "true") {

					var requestData = { "configurationCriteria": this.configModel.getConfigurationCriteria() };
					var jsonToSend = {
						"_from": "configurator",
						"_to": "solverConfiguration",
						"_request": "solveAndDiagnoseAll",
						"_data": requestData
					};

					this.sendTextToSolver(JSON.stringify(jsonToSend),options);
					// var returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend));
					//
					// if (returnFromWebService != undefined) {
					// 	this.ApplyAnswer(returnFromWebService);
					// }

					// Mask.mask(this.parentContainer);
				}
			}
		},


		setSelectionModeOnSolver: function (newMode, callSolveAfterSolverResult) {
			if (this.solverCreated) {
				if (newMode === ConfiguratorVariables.RulesMode_DisableIncompatibleOptions)
				newMode = "Select_None";
				else if (newMode === ConfiguratorVariables.RulesMode_EnforceRequiredOptions)
				newMode = "Select_RequiredAndDefault";
				else if (newMode === ConfiguratorVariables.RulesMode_SelectCompleteConfiguration)
				newMode = "Select_ProposedSelection";
				else if (newMode === ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration)
				newMode = "Select_OptimalSelection";

				var jsonToSend = {
					"_from": "configurator",
					"_to": "solverConfiguration",
					"_request": "setSelectionMode",
					"_data": newMode						//possible Modes : "Select_OptimalSelection", "Select_ProposedSelection", "Select_RequiredAndDefault" and "Select_None"
				};

				this.sendTextToSolver(JSON.stringify(jsonToSend), callSolveAfterSolverResult);
				// var returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend), callSolveAfterSolverResult);
				//
				// if (returnFromWebService != undefined) {
				// 	this.ApplyAnswer(returnFromWebService);
				// }
			}
		},

		/*setOptimizationFunctionOnSolver : function () {
		var configSingleton = new ConfigModel();
		var optimCoeff = [];
		var i=0;

		var idWithPrice = configSingleton.cacheIdWithPrice;

		for (id in idWithPrice) {
		if (configSingleton.isAnOption(id) && idWithPrice[id] != "0.0") {
		optimCoeff.push({ "id": id, "coefficient": idWithPrice[id] });
		}
		}

		var jsonToSend = {
		"_from": "configurator",
		"_to": "solverConfiguration",
		"_request": "setOptimizationFunction",
		"_data": {
		"optimizationMode": "min",     //configSingleton.getOptimModeSelected(),
		"optimizationCoefficients": optimCoeff
		}
		};

		returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend));

		if (returnFromWebService != undefined) {
		this.ApplyAnswer(returnFromWebService);
		}

		},*/



	getResultingStatusOriginators: function (optionId) {
		if (this.solverCreated) {
			var jsonToSend = {
				"_from": "configurator",
				"_to": "solverConfiguration",
				"_request": "getResultingStatusOriginators",
				"_data": optionId
			};

			this.sendTextToSolver(JSON.stringify(jsonToSend));
			// returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend));
			//
			// if (returnFromWebService != undefined) {
			// 	this.ApplyAnswer(returnFromWebService);
			// }

			//Mask.mask(this.parentContainer);//To allow user interaction while tooltip is calculated.
		}
	},
	abortSolverCall: function (/*optionId*/) {
		if (this.solverCreated) {

			var jsonToSend = {
				"_from": "configurator",
				"_to": "solver",
				"_request": "abortRequest",
				"_data": ""
			};

			this.sendTextToSolver(JSON.stringify(jsonToSend));
			// returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend));
			//
			// if (returnFromWebService != undefined) {
			// 	this.ApplyAnswer(returnFromWebService);
			// }
		}
	},


	sendTextToSolver: function (message, callSolveAfterSolverResult) {
		//callSolveAfterSolverResult is mainly used for setMultiSelection and setSelectionMode queries
		var that = this;
		if (this.solverCreated) {
			var solverKey = that.solverKey ? that.solverKey : "";
			Mask.mask(this.parentContainer);
			// Utilities.sendRequest(
			// 	"/resources/cfg/configurator/solver/computeAnswer",
			// 	'POST',
			// 	'text',
			// 	true,
			// 	function (result) {
			// 		that.ApplyAnswer(result, callSolveAfterSolverResult);
			// 	},
			// 	function (result) {
			// 		console.log("failed while getting computeAnswer result =" + result);
			// 		//alert(JSON.parse(arguments[1]).message);
			// 	},
			// 	{
			// 		"solverId": solverKey,
			// 		"selectedCriteria": message
			// 	},
			// 	0
			// );
			// var json = JSON.parse(message);
			// if(json._request === 'ruleActivation'){
			// 	solverKey = this.keyForRules || this.solverKey;
			// }
			var solverOptions = {
				url: '/resources/cfg/configurator/solver/computeAnswer',
				method: 'POST',
				responseType: 'text',
				data: {
					"solverId": solverKey,
					"selectedCriteria": message
				},
				timeout: 40000,
				tenant : that.tenant
			};
			return Utilities.sendRequestPromise(solverOptions).then(
				function success(result) {
					Mask.unmask(that.parentContainer);
					that.ApplyAnswer(result, callSolveAfterSolverResult);
					return result;
				},
				function fail(result) {
					UWA.log("failed while getting computeAnswer result =" + result);
						Mask.unmask(that.parentContainer);
					return result;
				}
			);
		}
	},


	CheckRulesConsistency : function () {
		if (this.solverCreated) {
			var jsonToSend = {
				"_from": "configurator",
				"_to": "solverConfiguration",
				"_request": "checkModelConsistency",
				"_data": ""
			};

			this.sendTextToSolver(JSON.stringify(jsonToSend));
			// returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend));

			// Mask.mask(this.parentContainer);

			// if (returnFromWebService != undefined) {
			// 	this.ApplyAnswer(returnFromWebService);
			// }
		}
	},

	SetMultiSelectionOnSolver: function (booleanValue, callSolveAfterSolverResult) {
		if (this.solverCreated) {
			var requestData = "false";
			if (booleanValue == true) requestData = "true";
			var jsonToSend = {
				"_from": "configurator",
				"_to": "solverConfiguration",
				"_request": "setMultiSelection",
				"_data": requestData
			};

			this.sendTextToSolver(JSON.stringify(jsonToSend), callSolveAfterSolverResult);
			// returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend), callSolveAfterSolverResult);
			//
			// if (returnFromWebService != undefined) {
			// 	this.ApplyAnswer(returnFromWebService);
			// }
		}
	},

	setAlwaysDiagnosed: function (dictionary) {
		if (this.solverCreated) {
			var features = [];

			var dictionaryFeatures = dictionary.features;

			for (var i = 0; i < dictionaryFeatures.length; i++) {
				features.push(dictionaryFeatures[i].ruleId);
			}

			var jsonToSend = {
				"_from": "configurator",
				"_to": "solverConfiguration",
				"_request": "setAlwaysDiagnosed",
				"_data": { "alwaysDiagnosedIds": features }
			};

			this.sendTextToSolver(JSON.stringify(jsonToSend));
			// returnFromWebService = this.sendTextToSolver(JSON.stringify(jsonToSend));
			//
			// if (returnFromWebService != undefined) {
			// 	this.ApplyAnswer(returnFromWebService);
			// }
		}
	},
	UpdateSelectedOptions: function()
	{
		/*getFeatureIdWithOptionId
		console.log("inside UpdateSelectedOptions");*/

	},

	ApplyAnswer: function (input, in_callSolveAfterSolverResult) {
		var ret = true;
		var callSolveAfterSolverResult = true;
		var firstCall = false;
		// Mask.unmask(this.parentContainer);
		if (in_callSolveAfterSolverResult != undefined) {
			callSolveAfterSolverResult = in_callSolveAfterSolverResult;
		}
		if(in_callSolveAfterSolverResult && in_callSolveAfterSolverResult.firstCall){
			firstCall = true;
			callSolveAfterSolverResult = true;
		}

		if (input != undefined && input !== "" && UWA.typeOf(input) === "string") {
			var inputbis = JSON.parse(input);

			var answerMethod = inputbis._answer;
			var answerData = inputbis._data;
			var answerRC = inputbis._rc;

			if (answerMethod === "getResultingStatusOriginators") {

				var listIncompatibilities = answerData.listOfIncompatibilitiesIds;
				var optionSelected = answerData.optionSelected;

				this.modelEvents.publish( {
					event:	'getResultingStatusOriginators_SolverAnswer',
					data:	{
						listOfIncompatibilitiesIds : listIncompatibilities,
						optionSelected : optionSelected,
						answerRC : answerRC
					}
				});

				// Mask.unmask(this.parentContainer);
			}
			// else if (answerMethod === "checkMatrixRuleValidity") {
			// 	console.log(answerData);
			// 	answerData.version = inputbis._version;
			// 		answerData._clientData = inputbis._clientData;
			// 		if(answerData._clientData.type === "validityWithCause"){
			// 				this.modelEvents.publish( {
			// 					event:	'checkMatrixRuleValidity_SolverReason',
			// 					data:	{
			// 						answerData : answerData,
			// 					}
			// 				});
			// 		}else{
			// 			if(in_callSolveAfterSolverResult){	//if callback provided then call the callback, else publish an event
			// 			in_callSolveAfterSolverResult(answerData);
			// 		}else{
			// 			this.modelEvents.publish( {
			// 				event:	'checkMatrixRuleValidity_SolverAnswer',
			// 				data:	{
			// 					answerData : answerData,
			// 				}
			// 			});
			// 		}
			// 		}
			//
			// 		// Mask.unmask(this.parentContainer);
			// }else if(answerMethod == "ruleActivation"){
			// 	if(in_callSolveAfterSolverResult){	//if callback provided then call the callback, else publish an event
			// 	in_callSolveAfterSolverResult(inputbis._rc);
			// 	}
			// 	// Mask.unmask(this.parentContainer);
			// }else if (answerMethod === "removeData") {
			// 	if(in_callSolveAfterSolverResult){	//if callback provided then call the callback, else publish an event
			// 	in_callSolveAfterSolverResult(inputbis._rc);
			// 	}
			// 	// Mask.unmask(this.parentContainer);
			// }
			else if (answerMethod === "checkModelConsistency") {

				if (answerRC === "Rules_KO" || answerRC === "ERROR") {
					this.configModel.setRulesConsistency(false);
					if(this.configModel.setRulesActivation){
						this.configModel.setRulesActivation("false");

						var message = nlsConfiguratorKeys.InfoInconsistentRules;

						var listOfInconsistentRules = answerData.listOfInconsistentRulesIds;
						if (listOfInconsistentRules.length > 0) {
							message += "<br>" + nlsConfiguratorKeys.ImpliedRules + ":<br>";
							for (var i = 0; i < listOfInconsistentRules.length; i++) {
								message += "<blocquote style='padding-left:20px;'>" + listOfInconsistentRules[i] + "<br></blocquote>";
							}
						}
						if (answerRC === "ERROR") {
							message += "<br>" + nlsConfiguratorKeys.InfoComputationAborted;
						}

						Utilities.displayNotification({
							eventID: 'info',
							msg: message
						});
					}
					else this.configModel.setRulesConsistency(true);

					this.modelEvents.publish( {
						event:	'checkModelConsistency_SolverAnswer',
						data:	{
							answerRC : answerRC
						}
					});
					}


				// Mask.unmask(this.parentContainer);
			}

			else if (answerMethod === "solveAndDiagnoseAll") {

				var answerConfigCriteria = answerData.configurationCriteria;
				var answerModifiedAssumptions = answerData.modifiedAssumptions;
				var answerConflicts = answerData.conflicts;
				var answerDefaults = answerData.defaults;



				if (answerConflicts) {		// Conflicts found during resolution

					if (answerRC === "ERROR") {		// Error when computing conflicts (probably timeout)
						var message = nlsConfiguratorKeys.InfoComplexityOfRules;

						Utilities.displayNotification({
							eventID: 'info',
							msg: message
						});
					}

					var listOfListOfConflictingIds = answerConflicts.listOfListOfConflictingIds;
					var listOfListOfImpliedRules = answerConflicts.listOfListOfImpliedRules;
					var state;
					/*var conflictsToApply = new Object();

					for (var i = 0; i < listOfListOfConflictingIds.length; i++) {
					for (var j = 0; j < listOfListOfConflictingIds[i].length; j++) {
					state = this.configModel.getStateWithId(listOfListOfConflictingIds[i][j]);
					if (this.configModel.isAnOption(listOfListOfConflictingIds[i][j]) ) {
					if (state == "Chosen" || state == "ChosenInConflict")
					conflictsToApply[listOfListOfConflictingIds[i][j]] = "ChosenInConflict";
					else if (state == "Dismissed" || state == "DismissedInConflict")
					conflictsToApply[listOfListOfConflictingIds[i][j]] = "DismissedInConflict";
					else if (state == "Default" || state == "DefaultInConflict")
					conflictsToApply[listOfListOfConflictingIds[i][j]] = "DefaultInConflict";
							}
						}
						}
						*/
						this.configModel.setConfigurationCriteria(answerConfigCriteria);
						/*
						for (var id in conflictsToApply) {
						this.configModel.setStateWithId(id, conflictsToApply[id]);
					}*/

					this.configModel.setImpliedRules(listOfListOfImpliedRules);
					this.configModel.setConflictingFeatures(listOfListOfConflictingIds);

					this.configModel.setRulesCompliancyStatus("Invalid");
				}

				else if (answerConfigCriteria) {	// No conflict found during resolution
					this.configModel.setConfigurationCriteria(answerConfigCriteria);
					this.configModel.setConflictingFeatures(null);
					this.configModel.setRulesCompliancyStatus("Valid");
				}

				if (answerModifiedAssumptions.length > 0) {		// Some assumptions have been modified during resolution
					var message = nlsConfiguratorKeys.InfoIdsIncompatibles + "<br>";
					for (var i = 0; i < answerModifiedAssumptions.length; i++) {
						message += "<blocquote style='padding-left:20px;'>" + this.configModel.getFeatureDisplayNameWithId(answerModifiedAssumptions[i]) + "[" + this.configModel.getOptionDisplayNameWithId(answerModifiedAssumptions[i]) + "]<br></blocquote>";
					}

					Utilities.displayNotification({
						eventID: 'info',
						msg: message
					});
				}

				// Mask.unmask(this.parentContainer);
				if(firstCall){
					this.modelEvents.publish( {
						event:	'init_configurator',
						data:	{
							answerDefaults : answerDefaults,
							answerConflicts : answerConflicts,
							answerRC : answerRC
						}
					});
				}else{
					this.modelEvents.publish( {
						event:	'solveAndDiagnoseAll_SolverAnswer',
						data:	{
							answerDefaults : answerDefaults,
							answerConflicts : answerConflicts,
							answerRC : answerRC
						}
					});
				}
			}

			else if (answerMethod === "setSelectionMode" && callSolveAfterSolverResult === true) {
				if(in_callSolveAfterSolverResult && in_callSolveAfterSolverResult.firstCall)
					this.CallSolveMethodOnSolver(in_callSolveAfterSolverResult);
				else {
					this.CallSolveMethodOnSolver();
				}
			}

			else if (answerMethod === "setMultiSelection" && callSolveAfterSolverResult === true) {
				if(in_callSolveAfterSolverResult && in_callSolveAfterSolverResult.firstCall)
					this.CallSolveMethodOnSolver(in_callSolveAfterSolverResult);
				else {
					this.CallSolveMethodOnSolver();
				}
			}

			else if (answerRC === "ERROR") {
				// GENERIC ERROR MSG
				UWA.log("Error during solver resolution");
			}
		}

		return ret;
	}

	};


	return UWA.namespace('DS/ConfiguratorPanel/ConfiguratorSolverFunctions', ConfiguratorSolverFunctions);
});

/*********************************************************************/
/*@fullReview XF3 21/05/2016
/*********************************************************************/

define('DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctionsV2',
['UWA/Core',
'DS/CfgSolver/CfgSolverServices',
'DS/CfgSolver/CfgSolverDebug',
// 'DS/xPortfolioQueryServices/js/xPortfolioModel',
'DS/ConfiguratorPanel/scripts/Utilities',
'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
'DS/UIKIT/Mask',
'DS/UIKIT/Alert',
'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json'
],
function (UWA,  CfgSolverServices,CfgSolverDebug,
  // xPortfolioModel,
  Utilities, ConfiguratorVariables, Mask, Alert, nlsConfiguratorKeys) {
    'use strict';
    var ConfiguratorSolverFunctions = {
        solverCreated: false,
        solverKey: '',
        solverNode: null,
        solverId: '',
        configModel: null,
        modelEvents: null,
        parentContainer: null,

        initSolverRules : function(rules){
          var that = this;
          return CfgSolverServices.initialize({ solverKey: that.solverKey, jsonData: rules}).then(function () {
            that.solverCreated = true;
            var dictionary = that.configModel.getDictionary();
              that.setAlwaysDiagnosed(dictionary);
            that.CheckRulesConsistency();
            that.setSelectionModeOnSolver(that.configModel.getRulesMode());
            // if(that.version === "V5"){
             /* R14: Does not need to set Multi Selection on Solver anymore */
             if (that.configModel.getAppFunc().multiSelection === ConfiguratorVariables.str_yes || that.configModel.getAppFunc().selectionMode_Refine === ConfiguratorVariables.str_yes) {
                that.SetMultiSelectionOnSolver("true", {firstCall : true});
              }else{
                that.SetMultiSelectionOnSolver("false", {firstCall : true});                
              } 
              
            // }
            that.defaultImage = CfgSolverServices.getDefaultImage();
          });
        },
        initSolver: function (modelId, configModel, modelEvents, configCriteria, parentContainer, options) {

            var that = this;
            this.configModel = configModel;
            this.modelEvents = modelEvents;
            this.modelId = modelId;
            this.parentContainer = (parentContainer) ? parentContainer : document.body;
            this.dictionary = options.dictionary;
            this.abortNotificationDisplayed = false;
            this.displayErrorSolverNotification = options.displayErrorSolverNotification !== undefined ? options.displayErrorSolverNotification : true;
            if(options && options.tenant){
      				this.tenant =options.tenant;
      			}else {
      				this.tenant = "OnPremise";
      			}
      			if(options && options.version){
      				this.version =options.version;
      			}else {
      				this.version = "V1";
      			}

      		this.modelEvents.subscribe({ event: 'OnMultiSelectionChange' }, function (data) {
      			that.SetMultiSelectionOnSolver(data.value);
            });
      		
      		if (this.displayErrorSolverNotification) {
      			this.modelEvents.subscribe({ 'event': 'solver-call-error' }, function (data) {
                	Utilities.displayNotification({eventID: 'error',msg: nlsConfiguratorKeys.Error_SERVICE_OUT});
                });
      		}
            
            this.modelEvents.subscribe({ event: 'OnRuleAssistanceLevelChange' }, function (data) {
                if (data.value !== ConfiguratorVariables.NoRuleApplied)
                  that.setSelectionModeOnSolver(data.value, true);

            });

            this.modelEvents.subscribe({ event: 'SolverFct_getResultingStatusOriginators' }, function (data) {
                that.getResultingStatusOriginators(data.value);
            });

            this.modelEvents.subscribe({ event: 'SolverFct_CallSolveMethodOnSolver' }, function () {
                // that.abortSolverCall();
                  that.CallSolveMethodOnSolver();
                });

            this.modelEvents.subscribe({ event: 'SolverFct_CallSolveOnSelectedIDsMethodOnSolver' }, function (data) {
                // that.abortSolverCall();
                that.callSolverOnSelectedIDsMethodOnSolver(data);
            });

            if(this.version === "V1" || this.version === "V2" || this.version === "V3"){
              return CfgSolverServices.initSolver({modelId: modelId, data: {"configurationCriteria":configCriteria
            }, tenant : that.tenant}).then(function(data){
                return CfgSolverServices.hypervisordetails().then(function(HypervisorDetails){
                  that.solverKey = HypervisorDetails.solverKey;
                  that.activateSolverDebug();
                  setDictionaryForDashboard(data);
                });
              });
            }else if(this.version === "V4" || this.version === "V5"){
            	var options = {
            			// Add option for knowing is model definition
            			tenant : that.tenant,
            			modelVersionId : that.modelId,
            			securityContext : window.widget ? window.widget.getValue("xPref_CREDENTIAL") : undefined
            	};
              return CfgSolverServices.create(options).then(function (data) {
            	  if(data.solverKey) {
            		// Answer coming from 3dSpace
                      that.solverKey = data.solverKey;
                    }else if (data.nodeId) {
                    	// Answer coming from ConfigSolverService
                    	that.solverKey = data.nodeId;
                    }
                  that.activateSolverDebug();
                  return CfgSolverServices.initialize({ solverKey: data.solverKey, jsonData: that.dictionary }).then(function () {
                    if(that.configModel.isAsyncRuleLoad()) {
                      return UWA.Promise.resolve({
                        solverKey: that.solverKey
                      });
                    }
                    setDictionaryForDashboard({ dictionary: that.dictionary });
                  });
              });
            }
            // else if(this.version === "V5"){
            //   return CfgSolverServices.create({tenant : that.tenant}).then(function (data) {
            //       that.solverKey = data.solverKey;
            //       that.activateSolverDebug();
            //       return CfgSolverServices.initialize({ solverKey: data.solverKey, jsonData: that.dictionary }).then(function () {
            //         return UWA.Promise.resolve({
            //             solverKey: that.solverKey
            //         });
            //           // if(that.configModel.getRulesLoaded()){
            //           //   //load this after rules are available
            //           //   setDictionaryForDashboard({ dictionary: that.dictionary });
            //           // }
            //       })
            //   });
            // }

            function setDictionaryForDashboard(dictionaryData) {
                UWA.log("*********SolverKey:" + that.solverKey);
                that.configModel.setDictionary(dictionaryData.dictionary);
                that.solverCreated = true;
                var dictionary = that.configModel.getDictionary();

                window.addEventListener("unload", function () {
                    that.releaseSolver();
                });
                window.top.addEventListener("unload", function () {
                    that.releaseSolver();
                });
                if(that.configModel.getRulesMode() !== "RulesMode_SelectCompleteConfiguration"){
                  that.setAlwaysDiagnosed(dictionary);
                }
                that.CheckRulesConsistency();
                that.setSelectionModeOnSolver(that.configModel.getRulesMode());

                /* R14: Does not need to set multi selection mode on solver anymore*/
                if(that.version === "V1" || that.version === "V2"){
                   var multiSelState = (that.configModel.getMultiSelectionState() == "true")? "true":"false";
                   that.SetMultiSelectionOnSolver(multiSelState, {firstCall : true});
                }else if(that.version === "V3" || that.version === "V4" || that.version === "V5"){
                  if (that.configModel.getAppFunc().multiSelection === ConfiguratorVariables.str_yes || that.configModel.getAppFunc().selectionMode_Refine === ConfiguratorVariables.str_yes) {
                    that.SetMultiSelectionOnSolver("true", {firstCall : true});
                  }else{
                    that.SetMultiSelectionOnSolver("false", {firstCall : true});                    
                  }
                }
                


                that.defaultImage = CfgSolverServices.getDefaultImage();
                return UWA.Promise.resolve({
                    dictionary: dictionary,
                    solverKey: that.solverKey
                });
            }

            // function showFailureMessage(msg) {
            //     console.log("failed while getting initdata =" + msg);
            // }
        },

        getDefaultImage : function(){
          return this.defaultImage;
        },

        activateSolverDebug : function(){
            var solverTraces = window.sessionStorage['solver-activate-traces'];//false; // true to activate solver traces.. may need to be a local storage ot smtg
            if (solverTraces) {
                this._CfgSolverDebug = new CfgSolverDebug();
                this._CfgSolverDebug.init2('configurator', this.solverKey);
                this._CfgSolverDebug.injectIn(document.body);
            }
        },

        releaseSolver: function () {
            CfgSolverServices.release(this.solverKey);
        },

        CallSolveMethodOnSolver: function (options) {
            var that = this;
            if (this.solverCreated) {
                if (this.configModel.getRulesActivation() == "true") {
                    if(this.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration"){
                      var criteriaList = this.configModel.getChosenConfigurationCriteria();                      
                      var defaultList = this.configModel.getDefaultCriteria();                      
                      if(this.configModel.isFirstSelectionDirty()) {
                        if(criteriaList.length === 0 && defaultList.length === 0) {
                          this.configModel.setFirstSelection(false);
                        } else {
                          this.configModel.setFirstSelection(true);
                        }
                      }
                      if(this.configModel.getFirstSelection()){
                        //IR-968694 : concat chosen & dismissed criteria to the payload
                        criteriaList = criteriaList.concat(this.configModel.getDismissedConfigurationCriteria());
                        var requestData = { "configurationCriteria": criteriaList };
                          if(this.configModel._manageDefaultVersion === 'V2') {
                            requestData.timeoutForDefaultComputation = this.configModel.getDefaultComputationTimeout();
                          }
                          CfgSolverServices.CallSolveWithoutDignoseMethodOnSolver(requestData, that.solverKey, that.modelEvents).then(function (data) {
                              that.ApplyAnswer(data,options);
                          }, function () { });
                      }else{
                        if(options && options.firstCall){
                          this.modelEvents.publish({event:'solver_init_complete', data:{}});
                        } else {
                          that.modelEvents.publish({event : "solveAndDiagnoseAll_SolverAnswer"});
                        }
                        Utilities.displayNotification({eventID: 'info',msg: nlsConfiguratorKeys.Selection_Required_Complete});
                        // that.modelEvents.publish({event : "pc-interaction-complete"});
                      }
                    }else{
                    var requestData = { "configurationCriteria": this.configModel.getConfigurationCriteria() };

                    // if(this.configModel._manageDefaultVersion == 'V2') {
                    //   requestData.timeoutForDefaultComputation = this.configModel.getDefaultComputationTimeout();
                    // }

                    CfgSolverServices.CallSolveMethodOnSolver(requestData, that.solverKey, that.modelEvents).then(function (data) {
                        that.ApplyAnswer(data,options);
                    }, function () { });
                    }
                }else {
                  if(options && options.firstCall){
                    this.modelEvents.publish({event:'solver_init_complete', data:{}});
                  }
                }
            }
        },
        callSolverOnSelectedIDsMethodOnSolver: function (options) {
            var that = this;
            if (this.solverCreated) {
                if (this.configModel.getRulesActivation() == "true") {
                    // var requestData = {"idsToDiagnose" : options.idsToDiagnose, "configurationCriteria": this.configModel.getConfigurationCriteria()};
                    //IR-968694 : concat chosen & dismissed criteria to the payload
                    var configurationCriteria = this.configModel.getChosenConfigurationCriteria().concat(this.configModel.getDismissedConfigurationCriteria());
                    var requestData = {"idsToDiagnose" : options.idsToDiagnose, "configurationCriteria": configurationCriteria};
                    if(this.configModel._manageDefaultVersion === 'V2') {
                      requestData.timeoutForDefaultComputation = this.configModel.getDefaultComputationTimeout();
                    }
                    var abortRequired;
                   if(!this.abortNotificationDisplayed){
                      abortRequired = setTimeout(function(){
                      that.counterNotification = Utilities.displayNotification({eventID: 'warning',msg: nlsConfiguratorKeys.Abort_Notification,action : {label: 'Abort',callback: function (counterNotification){
                          that.abortSolverCall(that.solverKey);
                          that.counterNotification = counterNotification;
                          Utilities.removeNotification(counterNotification);
                          that.abortNotificationDisplayed = false;
                          var _solveCriteria = that.configModel.getSolveConfigurationCriteria();
                          // that.configModel.setConfigurationCriteria(_solveCriteria);
                          that.configModel.setSelectedConfigurationCriteria(_solveCriteria,options.idsToDiagnose);
                          that.configModel.setSolveWithDiagnose(false);
                          that.modelEvents.publish({event : "solveAndDiagnoseAll_SolverAnswer" , data : {refresh : true}});
                      }}});
                      that.abortNotificationDisplayed = true;
                      },10000);
                   }
                    CfgSolverServices.CallSolverOnSelectedIDsMethodOnSolver(requestData, that.solverKey, that.modelEvents).then(function (data) {
                        that.ApplyAnswer(data,"false", options.idsToDiagnose);
                        if(that.abortNotificationDisplayed){
                          Utilities.removeNotification(that.counterNotification);
                          that.abortNotificationDisplayed = false;
                        }
                        clearTimeout(abortRequired);
                    }, function () { });
                }
            }
        },

        setSelectionModeOnSolver: function (newMode, callSolveAfterSolverResult) {
            var that = this;
            if (this.solverCreated) {
              this.configModel.resetDefaultCriteria();
              if (newMode !== ConfiguratorVariables.NoRuleApplied){
                if (newMode === ConfiguratorVariables.RulesMode_DisableIncompatibleOptions)
                    newMode = "Select_None";
                else if (newMode === ConfiguratorVariables.RulesMode_EnforceRequiredOptions)
                    newMode = "Select_RequiredAndDefault";
                else if (newMode === ConfiguratorVariables.RulesMode_SelectCompleteConfiguration)
                {
                  newMode = "Select_ProposedSelection";
                  if(callSolveAfterSolverResult) {
                    that.modelEvents.publish({event : "pc-reset-first-selection"});
                  }
                }
                else if (newMode === ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration)
                    newMode = "Select_OptimalSelection";

                var abortRequest = callSolveAfterSolverResult ? that.abortSolverCall() : UWA.Promise.resolve();

                abortRequest.then(function () {
                  CfgSolverServices.setSelectionModeOnSolver(newMode, that.solverKey, that.modelEvents).then(function (data) {
                    if(callSolveAfterSolverResult) {
                      that.modelEvents.publish({event : "pc-interaction-started"});
                    }
                    setTimeout(function () {
                      that.ApplyAnswer(data, callSolveAfterSolverResult);
                    }, 100);

                  }, function () { });
                });
              }
          }
        },

        getResultingStatusOriginators: function (optionId) {
            var that = this;
            CfgSolverServices.getResultingStatusOriginators(optionId, this.solverKey,that.modelEvents).then(function (data) {
                that.ApplyAnswer(data);
            }, function () { });
        },

        abortSolverCall: function (/*optionId*/) {
            return CfgSolverServices.abortSolverCall(this.solverKey);
        },

        CheckRulesConsistency: function () {
            var that = this;
            if (this.solverCreated) {
                CfgSolverServices.CheckRulesConsistency(this.solverKey,that.modelEvents).then(function (data) {
                    that.ApplyAnswer(data);
                }, function () { });
            }
        },

        SetMultiSelectionOnSolver: function (booleanValue, callSolveAfterSolverResult) {
            var that = this;
            if (this.solverCreated) {
                CfgSolverServices.SetMultiSelectionOnSolver(booleanValue, this.solverKey,that.modelEvents).then(function (data) {
                    that.ApplyAnswer(data, callSolveAfterSolverResult);
                });
            }
        },

        setAlwaysDiagnosed: function (dictionary) {
            if (this.solverCreated && this.configModel.getRulesMode() !== "RulesMode_SelectCompleteConfiguration") {
                var features = [];
                dictionary = this.configModel.getDictionary() || { features: [] };
                var dictionaryFeatures = dictionary.features;

                for (var i = 0; i < dictionaryFeatures.length; i++) {
                    features.push(dictionaryFeatures[i].ruleId);
                }
                return CfgSolverServices.setAlwaysDiagnosed(features, this.solverKey,this.modelEvents);
            }
        },


        ApplyAnswer: function (input, in_callSolveAfterSolverResult,idsToDiagnose) {
          var ret = true;
          var callSolveAfterSolverResult;
          var firstCall = false;
          // Mask.unmask(this.parentContainer);
          if (in_callSolveAfterSolverResult !== undefined) {
            callSolveAfterSolverResult = in_callSolveAfterSolverResult;
          }
          if(in_callSolveAfterSolverResult && in_callSolveAfterSolverResult.firstCall){
            firstCall = true;
          }

            if (input !== undefined && input !== "" && UWA.typeOf(input) === "string") {
                var inputbis = JSON.parse(input);

                var answerMethod = inputbis._answer;
                var answerData = inputbis._data;
                var answerRC = inputbis._rc;

                if (answerMethod === "getResultingStatusOriginators") {

                    var listIncompatibilities = answerData.listOfIncompatibilitiesIds;
                    var optionSelected = answerData.optionSelected;

                    this.modelEvents.publish({
                        event: 'getResultingStatusOriginators_SolverAnswer',
                        data: {
                            listOfIncompatibilitiesIds: listIncompatibilities,
                            optionSelected: optionSelected,
                            answerRC: answerRC
                        }
                    });

                    //Mask.unmask(this.parentContainer);
                }
                // else if (answerMethod === "checkMatrixRuleValidity") {
                //     console.log(answerData);
                //     answerData.version = inputbis._version;
                //     answerData._clientData = inputbis._clientData;
                //     if (answerData._clientData.type === "validityWithCause") {
                //         this.modelEvents.publish({
                //             event: 'checkMatrixRuleValidity_SolverReason',
                //             data: {
                //                 answerData: answerData,
                //             }
                //         });
                //     } else {
                //         if (in_callSolveAfterSolverResult) {	//if callback provided then call the callback, else publish an event
                //             in_callSolveAfterSolverResult(answerData);
                //         } else {
                //             this.modelEvents.publish({
                //                 event: 'checkMatrixRuleValidity_SolverAnswer',
                //                 data: {
                //                     answerData: answerData,
                //                 }
                //             });
                //         }
                //     }
                //
                //     //Mask.unmask(this.parentContainer);
                // } else if (answerMethod == "ruleActivation") {
                //     if (in_callSolveAfterSolverResult) {	//if callback provided then call the callback, else publish an event
                //         in_callSolveAfterSolverResult(inputbis._rc);
                //     }
                //     //Mask.unmask(this.parentContainer);
                // } else if (answerMethod === "removeData") {
                //     if (in_callSolveAfterSolverResult) {	//if callback provided then call the callback, else publish an event
                //         in_callSolveAfterSolverResult(inputbis._rc);
                //     }
                //     //Mask.unmask(this.parentContainer);
                // }

                else if (answerMethod === "checkModelConsistency") {

                    if (answerRC === "Rules_KO" || answerRC === "ERROR") {
                        this.configModel.setRulesConsistency(false);
                        if (this.configModel.setRulesActivation) {
                            this.configModel.setRulesActivation("false");

                            var message = nlsConfiguratorKeys.InfoInconsistentRules;

                            var listOfInconsistentRules = answerData.listOfInconsistentRulesIds;
                            if (listOfInconsistentRules.length > 0) {
                                message += "<br>" + nlsConfiguratorKeys.ImpliedRules + ":<br>";
                                for (var i = 0; i < listOfInconsistentRules.length; i++) {
                                    message += "<blocquote style='padding-left:20px;'>" + listOfInconsistentRules[i] + "<br></blocquote>";
                                }
                            }
                            if (answerRC == "ERROR") {
                                message += "<br>" + nlsConfiguratorKeys.InfoComputationAborted;
                            }
                            Utilities.displayNotification({eventID: 'info',msg: message});
                        }
                        else this.configModel.setRulesConsistency(true);

                        this.modelEvents.publish({
                            event: 'checkModelConsistency_SolverAnswer',
                            data: {answerRC: answerRC}
                        });
                    }
                }

                else if (answerMethod == "solveAndDiagnoseAll" || answerMethod == "solve" || answerMethod == "solveAndDiagnose") {

                    var answerConfigCriteria = answerData.configurationCriteria;
                    var answerModifiedAssumptions = answerData.modifiedAssumptions;
                    var answerConflicts = answerData.conflicts;
                    var answerDefaults = answerData.defaults;

                    if (answerConflicts) {
                        if (answerRC === "ERROR") {
                            Utilities.displayNotification({eventID: 'info',msg: nlsConfiguratorKeys.InfoComplexityOfRules});
                        }
                        var listOfListOfConflictingIds = answerConflicts.listOfListOfConflictingIds;
                        var listOfListOfImpliedRules = answerConflicts.listOfListOfImpliedRules;
                        this.configModel.setConfigurationCriteria(answerConfigCriteria);
                        this.configModel.setImpliedRules(listOfListOfImpliedRules);
                        this.configModel.setConflictingFeatures(listOfListOfConflictingIds);
                        this.configModel.setRulesCompliancyStatus("Invalid");
                    }

                    else if (answerConfigCriteria) {	// No conflict found during resolution
                      this.configModel.setConfigurationCriteria(answerConfigCriteria,answerMethod,idsToDiagnose);
                        // if (answerMethod == "solveAndDiagnose"){
                        //   this.configModel.setSelectedConfigurationCriteria(answerConfigCriteria,idsToDiagnose);
                        // }else{
                        //   this.configModel.setConfigurationCriteria(answerConfigCriteria,answerMethod);
                        // }
                        this.configModel.setConflictingFeatures(null);
                        this.configModel.setRulesCompliancyStatus("Valid");
                    }

                    if (answerDefaults) {
                      this.configModel.setDefaultCriteria(answerDefaults);
                    }

                    if (answerModifiedAssumptions.length > 0) {		// Some assumptions have been modified during resolution
                        var message = nlsConfiguratorKeys.InfoIdsIncompatibles + "<br>";
                        for (var i = 0; i < answerModifiedAssumptions.length; i++) {
                            message += "<blocquote style='padding-left:20px;'>" + this.configModel.getFeatureDisplayNameWithId(answerModifiedAssumptions[i]) + "[" + this.configModel.getOptionDisplayNameWithId(answerModifiedAssumptions[i]) + "]<br></blocquote>";
                        }
                        Utilities.displayNotification({eventID: 'info',msg: message});
                    }
                    var dataToShate = {
                      answerDefaults : answerDefaults,
                      answerConflicts : answerConflicts,
                      answerRC : answerRC,
                      answerMethod : answerMethod,
                      firstCall : firstCall
                    }
                    // default computation timeout
                    if (answerRC == "DEFAULT_ABORTED") {
                      Utilities.displayNotification({eventID: 'warning',msg: nlsConfiguratorKeys.DefaultAbortWarning});
                    }

                    //condition to be simplified
                    if(firstCall){
                      this.modelEvents.publish({event:'solver_init_complete', data:dataToShate});
                      if(this.version === "V5"){
                        this.modelEvents.publish({event:'solveAndDiagnoseAll_SolverAnswer', data:	dataToShate});
                      }
                    }else{
                      this.modelEvents.publish({event:'solveAndDiagnoseAll_SolverAnswer', data:	dataToShate});
                    }
                }

                else if (answerMethod == "setSelectionMode" && callSolveAfterSolverResult) {
                  this.CallSolveMethodOnSolver();
                }

                else if (answerMethod == "setMultiSelection" && callSolveAfterSolverResult) {
                  if(callSolveAfterSolverResult.firstCall)
                    this.CallSolveMethodOnSolver(callSolveAfterSolverResult);
                  else
                    this.CallSolveMethodOnSolver();
                }

                else if (answerRC == "ERROR") {// GENERIC ERROR MSG
                    console.log("Error during solver resolution");
                }
            }

            return ret;
        },

        setServiceUrl : function (serviceUrl) {
          CfgSolverServices.setServiceUrl(serviceUrl);
        },
        
        // should be remove when will we pass only on the ConfigRuleService
        getUrl3DSpaceService : function (tenant) {
            return CfgSolverServices.getUrl3DSpaceService(tenant);
        }

    };


    return UWA.namespace('DS/ConfiguratorPanel/ConfiguratorSolverFunctionsV2', ConfiguratorSolverFunctions);
});

/*********************************************************************/
/*@fullReview XF3 21/05/2016
/*********************************************************************/

define('DS/ConfiguratorPanel/scripts/Utilities',
		[   'UWA/Core',
		    'DS/i3DXCompassServices/i3DXCompassServices',
		    'DS/Notifications/NotificationsManagerUXMessages',
		    'DS/Notifications/NotificationsManagerViewOnScreen',
            'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
            'DS/WAFData/WAFData'
		    ],
		    function (UWA, i3DXCompassServices, NotificationsManagerUXMessages, NotificationsManagerViewOnScreen, ConfiguratorVariables, WAFData) {

	var Utilities = {
			_serviceUrl: null,_tenant : "",
			_notif_manager: null,


			sendRequestPromise : function (options) {
				var url = options.url;
				var method = options.method;
				var data = options.data;
				var timeout = options.timeout;
				var responseType = options.responseType;
				var tenant = options.tenant || "OnPremise";
				var that = this;
				return new UWA.Promise(function (resolve, reject) {
					that.sendRequest(url, method, responseType, true, resolve, reject, data, timeout, tenant);
				});
			},

			sendRequest : function (inputUrl, requestMethod, requestType, async, onCompleteCallback, onFailureCallback, data, timeout,tenant) {
				var that = this;
				if(tenant && tenant !== "OnPremise"){
					that._securityContext = null;
					that._serviceUrl = null;
					that.receivedTenant = tenant;
				}
				if(that._securityContext == null){
					that.setSecurityContext();
				}
				//var newTimeout = timeout ? timeout : 0;

				var request = function (in_inputUrl, in_requestMethod, in_requestType, in_async, in_onCompleteCallback, in_onFailureCallback, in_data, in_timeout) {
					var requestUrl =
						that.wafAuthenticatedRequest(that._serviceUrl + in_inputUrl, {
							method : in_requestMethod,
							type: 'json',
							async : in_async ,
							proxy:'passport',
							headers:{
								"SecurityContext": (that._securityContext) ? that._securityContext : "",
								"Content-Type":  'json'
							},
							onComplete : in_onCompleteCallback,
							onFailure : in_onFailureCallback,
							timeout: in_timeout? in_timeout : 0,
							data:in_data,
							responseType:in_requestType
						}/*, newTimeout*/);

				};

				if(that._serviceUrl != null) {
					request(inputUrl, requestMethod, requestType, async, onCompleteCallback, onFailureCallback, data, timeout);
				}
				else {
					var parameters = {
							serviceName : '3DSpace',
							platformId : "",    //widget.getValue('x3dPlatformId'),
							onComplete : function(URLResult) {
								if (typeof URLResult === "string") {
									that._serviceUrl = URLResult;
								} else {
									that._serviceUrl = URLResult[0].url;
								}
								that._tenant = URLResult[0]["platformId"];

								/** Added for multitenant issue **/
								if(that.receivedTenant !== "OnPremise"){
									var count, data = URLResult || [];
									for (count = 0; count < data.length; count++) {
	                  if (that.receivedTenant == data[count]["platformId"]) {
	                      that._serviceUrl  = data[count].url;
	                      that._tenant = data[count]["platformId"];
	                  }
	                }
								}
								request(inputUrl, requestMethod, requestType, async, onCompleteCallback, onFailureCallback, data, timeout);
							},
							onFailure : function() {
								console.log("Service initialization failed...");
							}
					};

					objCancel = i3DXCompassServices.getServiceUrl(parameters);
				}


			},

			displayNotification: function(options) {
				var that = this,counterNotification;
				if (this._notif_manager === null) {
					this._notif_manager = NotificationsManagerUXMessages;
					NotificationsManagerViewOnScreen.setNotificationManager(this._notif_manager);
				}
				var level = 'info';
				if (UWA.is(options.eventID) && options.eventID !== 'primary') {
					level = options.eventID;
				}
				var notifOptions = {
					level: level,
					message: options.msg,
					sticky: false
				}
				if(options && options.action && options.action.callback){
					notifOptions.action = {
						label : options.action.label,
						callback : function(){
							options.action.callback(counterNotification);
						}.bind(counterNotification)
					}
				}
				counterNotification = this._notif_manager.addNotif(notifOptions);
				return counterNotification;
			},
			removeNotification : function(counterNotification){
				if(NotificationsManagerViewOnScreen && counterNotification && UWA.is(counterNotification, 'number')){
						NotificationsManagerViewOnScreen.removeNotification(counterNotification);
				}
			},
			removeAllNotifications : function(){
				if(NotificationsManagerViewOnScreen){
						NotificationsManagerViewOnScreen.removeNotifications();
				}
			},

			setCookie: function(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays*24*60*60*1000));
				var expires = "expires="+ d.toUTCString();
				document.cookie = cname + "=" + cvalue + "; " + expires;
			},

			getCookie: function(cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for(var i = 0; i <ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) == 0) {
						return c.substring(name.length,c.length);
					}
				}
				return "";
			},

			convertStatesToPersistedStatesInConfigCriteria: function (configurationCriteria) {

			    for (var i = 0; i < configurationCriteria.length; i++) {

			        if (configurationCriteria[i].State == ConfiguratorVariables.Chosen)
			            configurationCriteria[i].State = ConfiguratorVariables.PersistenceStates_Chosen;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.Required)
			            configurationCriteria[i].State = ConfiguratorVariables.PersistenceStates_Required;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.Default)
			            configurationCriteria[i].State = ConfiguratorVariables.PersistenceStates_Default;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.Dismissed)
			            configurationCriteria[i].State = ConfiguratorVariables.PersistenceStates_Dismissed;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.Incompatible)
			            configurationCriteria[i].State = ConfiguratorVariables.PersistenceStates_Incompatible;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.Unselected)
			            configurationCriteria[i].State = ConfiguratorVariables.PersistenceStates_Unselected;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.Selected)
			            configurationCriteria[i].State = ConfiguratorVariables.PersistenceStates_Selected;
			    }

			    return configurationCriteria;
			},

			convertPersistedStatesToStatesInConfigCriteria: function (configurationCriteria) {

			    for (var i = 0; i < configurationCriteria.length; i++) {

			        if (configurationCriteria[i].State == ConfiguratorVariables.PersistenceStates_Chosen)
			            configurationCriteria[i].State = ConfiguratorVariables.Chosen;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.PersistenceStates_Required)
			            configurationCriteria[i].State = ConfiguratorVariables.Required;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.PersistenceStates_Default)
			            configurationCriteria[i].State = ConfiguratorVariables.Default;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.PersistenceStates_Dismissed)
			            configurationCriteria[i].State = ConfiguratorVariables.Dismissed;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.PersistenceStates_Incompatible)
			            configurationCriteria[i].State = ConfiguratorVariables.Incompatible;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.PersistenceStates_Unselected /*|| configurationCriteria[i].State == "included"*/)
			            configurationCriteria[i].State = ConfiguratorVariables.Unselected;
			        else if (configurationCriteria[i].State == ConfiguratorVariables.PersistenceStates_Selected)
			            configurationCriteria[i].State = ConfiguratorVariables.Selected;
			    }

			    return configurationCriteria;
			},

			getDefaultImage: function () {
			    var image = '';

			    if (this._serviceUrl != null) {
			        image = this._serviceUrl + "/snresources/images/icons/large/iconLargeDefault.png";
			    }

			    return image;
			},

			getServiceUrl: function() {
			    return this._serviceUrl;
			},

			setSecurityContext: function () {

				var that = this;
				var securityContextWSCall = function() {
				    var response = null;
				    var _securityCntxt = undefined;   //widget.getValue('SC');
				    if ((_securityCntxt != null) && (_securityCntxt != undefined) && (_securityCntxt != "")) {
					    response = "ctx::" + _securityCntxt;
					    that._securityContext = response;
				    }
				    else {
					    var getSecurityContextURL = "/resources/pno/person/getsecuritycontext";
					    var onCompleteCallBack = function (securityContextDetails) {
						    response = securityContextDetails.SecurityContext;
					        if (!response || response == null) {
					        }
					        else {
							        if (securityContextDetails != null && securityContextDetails != "" && securityContextDetails.hasOwnProperty("SecurityContext")) {
							          var prefix = "";
							          if (securityContextDetails.SecurityContext.indexOf("ctx::") != 0)  //ctx:: is mandatory. In some serveur, this ctx doesn't exist
							           prefix = 'ctx::';
							           response = prefix + securityContextDetails.SecurityContext;
							        }
							        console.log("Setting security Context: " + response);
							        that._securityContext = securityContextDetails.SecurityContext;
						        }
					    };
					    var onFailure = function (e) {console.log('getSecurityContext:Failure...' + e);};
						that.wafAuthenticatedRequest(that._serviceUrl + getSecurityContextURL, {
						    method : 'GET',
						    type:'json',
							async : true ,
						    proxy:'passport',
							header:{
								"Content-Type":  'json'
							},
						    onComplete : onCompleteCallBack,
						    onFailure : onFailure,
						    timeout: 5000
						    });

					    }
				}

				if(that._serviceUrl == null){
						var parameters = {
							serviceName : '3DSpace',
							platformId : "",    //widget.getValue('x3dPlatformId'),
							onComplete : function(URLResult) {
								if (typeof URLResult === "string") {
									that._serviceUrl = URLResult;
								} else {
									that._serviceUrl = URLResult[0].url;
								}

								that._tenant = URLResult[0]["platformId"];
								// if(that.receivedTenant && tenant !== "OnPremise"){
								// 	that._tenant = that.receivedTenant;
								// }
								/** Added for multitenant issue **/
								if(that.receivedTenant !== "OnPremise"){
									var count, data = URLResult || [];
									for (count = 0; count < data.length; count++) {
	                  if (that.receivedTenant == data[count]["platformId"]) {
	                      that._serviceUrl  = data[count].url;
	                      that._tenant = data[count]["platformId"];
	                  }
	                }
								}
								securityContextWSCall(that);

							},
							onFailure : function() {
								console.log("Service initialization failed...");
							}
					};

					objCancel = i3DXCompassServices.getServiceUrl(parameters);
				}else {
					securityContextWSCall(that);
				}

			},

			getSecurityContext: function () {
			    return this._securityContext;
			},

			wafAuthenticatedRequest: function (url, obj, timeout) {

				var timestamp = new Date().getTime();

				/**In case the url has attributes, append the tenant and timestamp accordingly*/
				if (url.indexOf("?") == -1) {
					url = url + "?tenant=" + this._tenant + "&timestamp=" + timestamp;
				}
				else {
					url = url + "&tenant=" + this._tenant + "&timestamp=" + timestamp;
				}
				//setTimeout(function(){
					WAFData.authenticatedRequest(url, obj);
				//},timeout);

			}


	};


	return UWA.namespace('DS/ConfiguratorPanel/Utilities', Utilities);
});

define(
    'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
    [
    ],
    function(){
    'use strict';
		var ConfiguratorVariables =  {
			Unselected : 'Unselected',
			UnselectedMandatory : 'Unselected Mandatory',
			SelectionInConflict : 'Selection In Conflict',
			ChosenByTheUser : 'Chosen by the user',
			RequiredByRules : 'Required by rules',
			DefaultSelected : 'Default selected',
			ProposedByOptimization : 'Proposed by optimization',
			DismissedByTheUser : 'Dismissed by the user',
			NoFilter : 'No filter',

			BuildConfiguration : 'Build Configuration',
			RefineConfiguration : 'Refine Configuration',

			ProposeOptimizedConfiguration : 'Propose optimized configuration',
			SelectCompleteConfiguration : 'Select complete configuration',
			EnforceRequiredOptionsAndSelectDefault : 'Enforce required options and select default',
			DisableIncompatibleOptions : 'Disable incompatible options',
			NoRuleApplied : 'No rule applied',

			select : 'select',
			reject : 'reject',

			str_yes : 'yes',
			str_no 	: 'no',

			str_true	: 'true',
			str_false	: 'false',

			Complete	: 'Complete',
			Hybrid 		: 'Hybrid',
			Partial 	: 'Partial',

			Invalid : 'Invalid',
			Valid : 'Valid',

			Unknown : 'Unknown',

			Chosen : 'Chosen',
			Default : 'Default',
			Required : 'Required',
			Selected : 'Selected',
			Dismissed : 'Dismissed',
			Incompatible : 'Incompatible',
			Conflict : 'Conflict',
			Range : 'range',
			Included : 'Included',

			selectionMode_Build : 'selectionMode_Build',
			selectionMode_Refine : 'selectionMode_Refine',

			feature_SelectionMode_Dismiss: 'Dismiss',
			feature_SelectionMode_Single: 'Single',
			feature_SelectionMode_Multiple: 'Multiple',
			feature_SelectionMode_EnforceMultiple: 'EnforceMultiple',
			feature_SelectionMode_Parameter: 'Parameter',

			RulesMode_ProposeOptimizedConfiguration : 'RulesMode_ProposeOptimizedConfiguration',
			RulesMode_SelectCompleteConfiguration : 'RulesMode_SelectCompleteConfiguration',
			RulesMode_EnforceRequiredOptions : 'RulesMode_EnforceRequiredOptions',
			RulesMode_DisableIncompatibleOptions : 'RulesMode_DisableIncompatibleOptions',


			cookie_Products : "DS_ConfiguratorCookie_AppStore_Products",
			cookie_PCs : "DS_ConfiguratorCookie_AppStore_PCs",
			cookie_PhyProducts : "DS_ConfiguratorCookie_AppStore_PhyProducts",

			type_HardwareProduct : "Hardware Product",
			type_ProductReference : "VPMReference",
			type_ProductConfiguration : "Product Configuration",

			str_create : 'create',
			str_delete : 'delete',
			str_list : 'list',
			str_plus : 'plus',
			str_trash : 'trash',
			str_help : 'help',
			str_star : 'star',
			str_user : 'user',
			str_none : 'none',
			str_ERROR : 'ERROR',



			PersistenceStates_Unselected: 'available',
			PersistenceStates_Chosen: 'chosen',
			PersistenceStates_Default: 'default',
			PersistenceStates_Required: 'required',
			PersistenceStates_Selected: 'recommanded',
			PersistenceStates_Dismissed: 'dismissed',
			PersistenceStates_Incompatible: 'incompatible',

			Single: "Single",
      Multiple: "Multiple",

      Filter_AllVariants  : 'topbar-allVariants',
      Filter_Chosen : 'topbar-userSelections',
      Filter_Conflicts : 'topbar-conflictingSelections',
      Filter_Rules : 'topbar-rulesDeduction',
      Filter_Unselected : 'topbar-unselectedFeatures',
      Filter_Mand : 'topbar-unselectedMandatory',

      TILE_VIEW : 'classic',
      GRID_VIEW : 'grid'
		};

		return ConfiguratorVariables;
	}

);

define('DS/ConfiguratorPanel/scripts/Presenters/CriteriaSelectionEditor',
  [
      'DS/Controls/Abstract',
      'DS/Utilities/Utils',
      'DS/Utilities/Dom',
      'DS/Utilities/Object',
      'DS/TreeModel/TreeDocument',
      'DS/TreeModel/TreeNodeModel',
      'DS/Controls/Button',
      'DS/Controls/Popup',
      'DS/CfgBulkTablePresenter/BulkEdition/Presenter/CfgAutocomplete',
      'css!DS/ConfiguratorPanel/css/CriteriaSelectionEditor.css'
    ], function(Abstract, Utils, Dom, ObjectUtils, TreeDocument, TreeNodeModel, Button, Popup, CfgAutocomplete) {

    'use strict';

    //build Criteria Selection Editor
    var CriteriaSelectionEditor = Abstract.inherit({

        name: 'criteria-selection-editor',

        publishedProperties: {
          value : {
            defaultValue: '',
            type: 'object'
          },
          contentType : {
            defaultValue: '',
            type: 'string'
          },
          multiValue : {
            defaultValue: false,
            type: 'boolean'
          },
          stateIcon : {
            defaultValue: '',
            type: 'string'
          },
          hasConflict : {
            defaultValue: false,
            type: 'boolean'
          },
          validationAction: {
            defaultValue: false,
            type: 'boolean'
          },
          rejectAction: {
            defaultValue: false,
            type: 'boolean'
          },
          possibleValues : {
            defaultValue: '',
            type: 'object'
          },
          showLoader : {
            defaultValue: false,
            type: 'boolean'
          },
          asyncLoad : {
            defaultValue: false,
            type: 'boolean'
          },
          context : {
            defaultValue: '',
            type: 'object'
          }
        },

        buildView : function () {
          this._isBuilding = true;
          this._availableValuesDocument = new TreeDocument({
            shouldBeSelected: function (nodeModel) {
                return nodeModel.options.isSelectable;
            }
          });
          this._possibleValueNodeMap = {};
          this._possibleValueDetails = {};
          this._autoComplete = new CfgAutocomplete({
            elementsTree: this._availableValuesDocument,
            allowFreeInputFlag: false,
            allowResetToUndefinedByUIFlag: false,
            multiSearchMode : true,
            getChipInfo: (nodeModel) => this._getChipInfo(nodeModel)
          });

          this._valueContainer = UWA.createElement('div', {
            'class' : 'value-container'
          });

          this._conflictContent = UWA.createElement('span', {
            'class' : 'conflict-action-content'
          });
          this._conflictAction = new Button({
            showLabelFlag : false,
            icon: { iconName: "alert", fontIconFamily: WUXManagedFontIcons.Font3DS },
            displayStyle: 'lite'
          });
          this._conflictContent.setContent(this._conflictAction);

          this._stateContent = UWA.createElement('span', {
            styles : {
              display: 'inline-block',
              padding: '0px 5px'
            }
          });

          this._cancelContent = UWA.createElement('span', {
            'class' : 'clear-action-content'
          });
          this._cancelAction = new Button({
            showLabelFlag : false,
            icon: { iconName: "wrong", fontIconFamily: WUXManagedFontIcons.Font3DS },
            displayStyle: 'lite'
          });

          this._cancelContent.setContent(this._cancelAction);

          this._validateContent = UWA.createElement('span', {
            'class' : 'validate-action-content'
          });
          this._validateAction = new Button({
            showLabelFlag : false,
            icon: { iconName: "check", fontIconFamily: WUXManagedFontIcons.Font3DS },
            displayStyle: 'lite'
          });
          this._validateContent.setContent(this._validateAction);

          this._tooltip = new Popup({trigger: 'escape', autoHide : false, mouseRelativePosition: true  });
          this._tooltip.setBody('Loading..');
          this._tooltip.getContent().addClassName('cfg-custom-popup');

          this._valueContainer.setContent(this._conflictContent);
          this._valueContainer.addContent(this._stateContent);
          this._valueContainer.addContent(this._autoComplete.getContent());
          this._valueContainer.addContent(this._cancelContent);
          this._valueContainer.addContent(this._validateContent);
        },

        _postBuildView: function() {
          this.getContent().addClassName('criteria-selection-editor');
          this._autoComplete.multiSearchMode = this.multiValue;
          this._autoComplete.elementsTree = this._availableValuesDocument;
          this._applyPossibleValues([], this.possibleValues);
          this._autoComplete.value = this.value;
          this.getContent().setContent(this._valueContainer);
        },

        handleEvents: function() {

          var that = this;

          Dom.addEventOnElement(this, this._autoComplete, 'change', function (e) {
            e.stopPropagation();
            if(!that._isBuilding)
            {
              if(!UWA.equals(that.value, e.dsModel.value)) {
                if(that.multiValue) {
                  that.fire('update-height', {value : that.value, id : that.context});
                }
                if(!that.isActive) {
                    that.value = e.dsModel.value;
                    if(that.value || that.multiValue) {
                      that.fire('select-criteria', {value : that.value, id : that.context});
                    }
                  }
                }
            }
          });

          Dom.addEventOnElement(this, this._autoComplete, 'show', function (e) {
            e.stopPropagation();
            that.isActive = true;
            if(that.asyncLoad) {
              that.showLoader = true;
              this.fire('show-criteria', {value : that.value, id : that.context});
            } else if(that.showLoader) {
              that.showLoader = false;
            }
          });

          Dom.addEventOnElement(this, this._autoComplete, 'hide', function (e) {
            e.stopPropagation();
            that.isActive = false;
            if(that.asyncLoad) {
              this.fire('hide-criteria', {value : that.value, id : that.context});
            }
            if(!UWA.equals(that.value, e.dsModel.value)) {
              that.value = e.dsModel.value;
              that.fire('select-criteria', {value : that.value, id : that.context});
            }
          });

          Dom.addEventOnElement(this, this._conflictAction, 'buttonclick', function (e) {
            e.stopPropagation();
            that._tooltip.target = e.target;
            that._tooltip.offset = e.target.getOffsets();
            that._tooltip.show();
            that.fire('show-state-tooltip', {value : that.value, id : that.context});
          });

          Dom.addEventOnElement(this, this._cancelAction, 'buttonclick', function (e) {
              e.stopPropagation();
              that.fire('reject-criteria', {value : that.value, id : that.context});
              that.value = '';
          });

          Dom.addEventOnElement(this, this._validateAction, 'buttonclick', function (e) {
              e.stopPropagation();
              that.fire('validate-criteria', {value : that.value, id : that.context});
          });

          that.getContent().addEventListener('click', function (e) {
            if(e.target.hasClassName('wux-chip-cell-label')) {
              var value = that.value;
              if(!UWA.is(value, 'array')) {
                value = [value];
              }
              value.forEach((item, i) => {
                if(that._possibleValueDetails[item].title == e.target.textContent) {
                  if(e.target.offsetWidth - e.offsetX < 24) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    if(that._possibleValueDetails[item].validate) {
                      that.fire('validate-criteria', {value : item, id : that.context});
                    }
                  }
                  if(e.offsetX < 20) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    that._tooltip.target = e.target;
                    that._tooltip.offset = {x: e.x, y:e.y};
                    that._tooltip.show();
                    that.fire('show-state-tooltip', {value : item, id : that.context});
                  }
                }
              });
            } else if(!that.multiValue && e.target.tagName == 'SPAN') {
              if(that._possibleValueDetails.hasOwnProperty(that.value)) {
                var state = that._possibleValueDetails[that.value].state;
                if(state && e.target.className.contains(state)) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();
                  that._tooltip.target = e.target;
                  that._tooltip.offset = {x: e.x, y:e.y};
                  that._tooltip.show();
                  that.fire('show-state-tooltip', {value : that.value, id : that.context});
                }
              }

            }
          }, true);

          that.getContent().addEventListener('focusout', function (e) {
            if(that._tooltip.visibleFlag) {
              that._tooltip.hide();
            }
          });

        },

        cleanContent : function () {
            if(this.isActive && !this.asyncLoad) {
              this._autoComplete.elements.popup.visibleFlag = false;
            }
        },

        _applyValue : function (oldValue, value) {
          this._autoComplete.value = this.value;
          if(this.isActive) {
            this._autoComplete.elements.popup.visibleFlag = false;
          }
          if(this.value && !this.multiValue && this._possibleValueDetails.hasOwnProperty(this.value)) {
            this.hasConflict = this._possibleValueDetails[this.value].conflict;
            this.rejectAction = this._possibleValueDetails[this.value].rejectable;
            this.validationAction = this._possibleValueDetails[this.value].validate;
          } else {
            this.hasConflict = false;
            this.rejectAction = false;
            this.validationAction = false;
          }
        },

        _applyContentType : function (oldValue, value) {
          this.getContent().setContent(this._valueContainer);
        },

        _applyPossibleValues : function (oldValue, values) {
          if(!UWA.is(this.possibleValues, 'array')) {
            this._availableValuesDocument.removeRoots();
            this._possibleValueNodeMap = {};
            this._possibleValueDetails = {};
            return;
          }
          var nodeData = [];
          var toBeRemoved = true;
          var icons;
          this.possibleValues.forEach((item, i) => {
            if(this._possibleValueNodeMap.hasOwnProperty(item.id) && this._possibleValueDetails.hasOwnProperty(item.id) ) {
              if(!ObjectUtils.areEquals(this._possibleValueDetails[item.id], item)) {
                var valueNode = this._possibleValueNodeMap[item.id];
                icons = [];
                if(item.conflict) {
                  icons.push('alert');
                  icons.push(item.image);
                } else {
                  icons.push(item.image);
                  icons.push(item.state);
                }
                var isSelected = valueNode.isSelected();
                if(!isSelected && this.value && (this.value == item.id || this.value.indexOf(item.id) != -1)) {
                  isSelected = true;
                }
                if(isSelected) {
                  this.hasConflict = item.conflict;
                  this.rejectAction = item.rejectable;
                  this.validationAction = item.validate;
                  this.isSelectable = UWA.is(item.selectable, 'boolean') ? item.selectable: true;
                }
                valueNode.prepareUpdate();
                valueNode.updateOptions({
                  icons: icons,
                  isSelectable : UWA.is(item.selectable, 'boolean') ? item.selectable: true,
                  grid: item
                });
                valueNode.pushUpdate();

                if(isSelected) {
                  if(this.multiValue) {
                    icons = this._getChipInfo(valueNode).icon;
                  }
                  this._autoComplete.updateIcons(icons, item.title);
                }
                this._possibleValueDetails[item.id] = item;
              }
              toBeRemoved = false;
              return;
            }
            if(i == 0) {
              this._availableValuesDocument.removeRoots();
              this._possibleValueNodeMap = {};
              this._possibleValueDetails = {};
            }
            icons = [];
            if(item.conflict) {
              icons.push('alert');
              icons.push(item.image);
            } else {
              icons.push(item.image);
              icons.push(item.state);
            }
            var node = new TreeNodeModel({
              stringIdentifier : item.id,
              value: item.id,
              label: item.title,
              icons: icons,
              image : item.image,
              isSelectable : UWA.is(item.selectable, 'boolean') ? item.selectable: true,
              grid: item
            });
            this._possibleValueNodeMap[item.id] = node;
            this._possibleValueDetails[item.id] = item;
            nodeData.push(node);
          });
          if(toBeRemoved) {
            this._availableValuesDocument.loadModel(nodeData);
          }
        },

        _getChipInfo : function (nodeModel) {
          var className = 'criteria-chip-image';
          className += nodeModel.getAttributeValue('conflict') ? ' criteria-chip-conflict' : '';
          className += nodeModel.getAttributeValue('state') ? ' criteria-chip-'+ nodeModel.getAttributeValue('state') : '';
          className += nodeModel.getAttributeValue('rejectable') == false ? ' criteria-chip-no-close' : '';
          className += nodeModel.getAttributeValue('validate') ?  ' criteria-chip-validate' : '';
          return {
            label : nodeModel.getAttributeValue('title'),
            icon : {
              iconPath: nodeModel.getAttributeValue('image'),
              className: className
            }
          };
        },

        _applyMultiValue : function (oldValue, value) {
          this._autoComplete.multiSearchMode = this.multiValue;
        },

        _applyStateIcon : function (oldValue, value) {
          if(this.stateIcon) {
            this._stateContent.show();
            this._stateContent.setContent(Dom.generateIcon({
              iconName: this.stateIcon
            }));
          } else {
            this._stateContent.hide();
          }
        },

        _applyHasConflict : function (oldValue, value) {
          if(this.hasConflict) {
            this._conflictContent.show();
          } else {
            this._conflictContent.hide();
          }
        },

        _applyRejectAction : function (oldValue, value) {
          if(this.rejectAction) {
            this._cancelContent.show();
          } else {
            this._cancelContent.hide();
          }
        },
        _applyValidationAction : function (oldValue, value) {
          if(this.validationAction) {
            this._validateContent.show();
          } else {
            this._validateContent.hide();
          }
        },

        _applyShowLoader : function (oldValue, value) {
          if(UWA.is(this.showLoader, 'boolean')) {
            if(value) {
              this._autoComplete.showLoader();
            } else {
              this._autoComplete.hideLoader();
            }
          }
        },


        updateTooltipMessage : function (message) {
          this._tooltip.setBody(message);
        },

        _applyProperties: function(oldValues) {
          this._isBuilding = true;
          this._parent(oldValues);
          if (this.isDirty('contentType')) {
            this._applyContentType(oldValues.contentType);
          }
          if (this.isDirty('multiValue')) {
            this._applyMultiValue(oldValues.multiValue);
          }
          if (this.isDirty('possibleValues')) {
            this._applyPossibleValues(oldValues.possibleValues);
          }
          if (this.isDirty('stateIcon')) {
            this._applyStateIcon(oldValues.stateIcon);
          }

          if (this.isDirty('hasConflict')) {
            this._applyHasConflict(oldValues.hasConflict);
          }
          if (this.isDirty('rejectAction')) {
            this._applyRejectAction(oldValues.rejectAction);
          }
          if (this.isDirty('validationAction')) {
            this._applyValidationAction(oldValues.validationAction);
          }

          if (this.isDirty('value')) {
            this._applyValue(oldValues.value);
          }

          this._isBuilding = false;
        }
    });


  	return CriteriaSelectionEditor;
});

define(
    'DS/ConfiguratorPanel/scripts/Models/DictionaryDataUtil',
    [
    ],
    function(){
    'use strict';
		var dictionaryDataUtil =  function(options){
      this._init(options);
    };

    dictionaryDataUtil.prototype._init = function (options) {
      this._dictionary = options.dictionary;
      this._criteriMap = {};
      this._criteriDetails = {};
      this._nameIdMap = {};

      var criteria = this._dictionary.features;

      var getDetails = function (criteria) {
        var data = {
          id : criteria.ruleId,
          ruleId : criteria.ruleId,
          name : criteria.name,
          title : criteria.displayName,
          image : criteria.image,
          type : criteria.type,
          mandatory : criteria.selectionCriteria
        };
        if(criteria.options) {
          data.options = criteria.options;
        }
        if(criteria.type == 'Parameter') {
          data.unit = criteria.unit;
        }
        return data;
      };
      for (var i = 0; i < criteria.length; i++) {
        var details = getDetails(criteria[i]);
        this._nameIdMap[criteria[i].name] = criteria[i].ruleId;
        this._criteriMap[criteria[i].ruleId] = [];
        this._criteriDetails[criteria[i].ruleId] = details;
        if(criteria[i].options) {
          for (var j = 0; j < criteria[i].options.length; j++) {
            this._nameIdMap[criteria[i].options[j].name] = criteria[i].options[j].ruleId;
            this._criteriMap[criteria[i].ruleId].push(criteria[i].options[j].ruleId);
            this._criteriDetails[criteria[i].options[j].ruleId] = getDetails(criteria[i].options[j]);
            this._criteriDetails[criteria[i].options[j].ruleId].parent = criteria[i].ruleId;
          }
        }
      }
    };

    dictionaryDataUtil.prototype.getDetails = function (id) {
       return this._criteriDetails[id];
    };

    dictionaryDataUtil.prototype.getParent = function (id) {
       return this._criteriDetails[id].parent;
    };

    dictionaryDataUtil.prototype.getValues = function (id) {
      var list = this._criteriMap[id];
      if(UWA.is(list, 'array')) {
         return list;
      }
      return [];
    };

    dictionaryDataUtil.prototype.getAllCriteria = function () {
      return Object.keys(this._criteriMap);
    };

    dictionaryDataUtil.prototype.getCriteriaValues = function (id) {
       var list = this._criteriMap[id];
       if(UWA.is(list, 'array')) {
          return list.map((listId) => this._criteriDetails[listId]);
       }
       return [];
    };

    dictionaryDataUtil.prototype.isVariant = function (id) {
       return this._criteriDetails[id].type == 'Variant';
    };

    dictionaryDataUtil.prototype.isOptionGroup = function (id) {
       return this._criteriDetails[id].type == 'VariabilityGroup';
    };

    dictionaryDataUtil.prototype.isParameter = function (id) {
       return this._criteriDetails[id].type == 'Parameter';
    };

    dictionaryDataUtil.prototype.isMandatory = function (id) {
       return this._criteriDetails[id].mandatory == true;
    };

    dictionaryDataUtil.prototype.getSelection = function (selection) {
      var parts = selection.split(':');
      var variantId = this._nameIdMap[parts[0]];
      var valueId = this._nameIdMap[parts[1]];
      if(variantId && valueId) {
        return { key: variantId, value: valueId };
      }
    };


		return dictionaryDataUtil;
	}

);

define('DS/ConfiguratorPanel/scripts/Presenters/CriteriaSelectionView',
  [
      'DS/Controls/Abstract',
      'DS/Utilities/Dom',
      'DS/Handlebars/Handlebars',
      'css!DS/ConfiguratorPanel/css/CriteriaSelectionView.css'
    ], function(Abstract, Dom, Handlebars) {

    'use strict';
    //build Criteria Selection view

    var htmlBadge = `{{#isMultiValue contentType}}
        <div class="multi-value-content">
        	{{#each value}}
            	<div class="value-badge">
                <div class="value-image" style="background-image: url('{{image}}');" >
                </div>
              	{{#if icon}}
              	<span class="wux-ui-3ds wux-ui-3ds-{{icon}}"></span>
              	{{/if}}
                <span class="value-title" title="{{label}}">{{label}}</span>
              </div>
            {{/each}}
        </div>
        {{else}}
        <div class="single-value-content">
        	{{#with value}}
              <div class="value-image" style="background-image: url('{{image}}');" >
              </div>
            {{#if icon}}
            <span class="wux-ui-3ds wux-ui-3ds-lg wux-ui-3ds-{{icon}}"></span>
            {{/if}}
            <span class="value-title" title="{{label}}">{{label}}</span>
          {{/with}}
        </div>
    	{{/isMultiValue}}`;

    Handlebars.registerHelper('isMultiValue', function(contentType, opts) {
       return contentType == 2 ? opts.fn(this) : opts.inverse(this);
    });

    // Handlebars.registerHelper('valueImage', function(image, opts) {
    //    return Dom.generateIcon({iconPath : image, className : 'value-image'}).outerHTML;
    // });

    var CriteriaSelectionView = Abstract.inherit({

        name: 'criteria-selection-view',

        publishedProperties: {
          value : {
            defaultValue: '',
            type: 'object'
          },
          contentType : {
            defaultValue: '',
            type: 'string'
          }
        },

        buildView : function () {
          this._valueContainer = UWA.createElement('div', {
            'class' : 'value-container'
          });
        },

        _postBuildView: function() {
          this.getContent().addClassName('criteria-selection-view');
          this.getContent().setContent(this._valueContainer);
        },

        _applyValue : function (oldValue, value) {
          if(this.value) {
            var badgeTemplate = Handlebars.compile(htmlBadge);
            this._valueContainer.setContent(badgeTemplate(this));
          } else {
            this._valueContainer.setContent('');
          }
        },

        _applyContentType : function (oldValue, value) {
          this.getContent().setContent(this._valueContainer);
        },

        _applyProperties: function(oldValues) {
          this._parent(oldValues);
          if (this.isDirty('contentType')) {
            this._applyContentType(oldValues.contentType);
          }

          if (this.isDirty('value')) {
            this._applyValue(oldValues.value);
          }
        }

    });


  	return CriteriaSelectionView;
});



define('DS/ConfiguratorPanel/scripts/ServiceUtil',
		[
			'UWA/Core',
	    'DS/i3DXCompassServices/i3DXCompassServices',
	    'DS/Notifications/NotificationsManagerUXMessages',
	    'DS/Notifications/NotificationsManagerViewOnScreen',
      'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
      'DS/WAFData/WAFData',
	    'DS/WidgetServices/WidgetServices',
    ],
    function (UWA, i3DXCompassServices, NotificationsManagerUXMessages, NotificationsManagerViewOnScreen, ConfiguratorVariables, WAFData, WidgetServices) {


	return UWA.Class.singleton({
		uninitializedCalls: 'throw',

		init : function (options) {
			this._tenant = options.tenant;
			this._securityContext = options.securityContext;
			// id, status(0-not started, 1- in progress)
			this._requestInfo = {};

			this._parent();
		},


		performSearchRequest : function (data, requestID) {
			var that = this;
			this._requestInfo[requestID] = {status : 0 };
			return this._getSearchServiceURL().then(function () {
				UWA.merge(data, {
					source : ["3dspace"],
					login : {
						"3dspace" : {
							SecurityContext : that._securityContext
						}
					},
	      	tenant : that._tenant,
				});

				return new UWA.Promise(function (resolve, reject) {
					var options = {
						method : 'POST',
						headers : {
							'Accept' : 'application/json',
							'Content-Type': 'application/json'
						},
						tenantId : that._tenant,
						apiVersion : 'R2018x',
						data : JSON.stringify(data),
						onComplete: function (output) {
							output = JSON.parse(output);
							delete that._requestInfo[requestID];
							resolve(output);
						},
						onFailure : function () {
							delete that._requestInfo[requestID];
							reject();
						},
						onCancel : function () {
							delete that._requestInfo[requestID];
							reject({cancel: true});
						}
					};
					var request = WAFData.authenticatedRequest(that._searchServiceURL, options);
					that._requestInfo[requestID].status = 1;
					that._requestInfo[requestID].request = request;

				});
			});

		},

		performServiceRequest : function (url, data, requestID, reqOptions) {
			var that = this;
			this._requestInfo[requestID] = {status : 0 };
			reqOptions = reqOptions || {};
			return this._get3DSpaceURL().then(function () {
				if(that._3DSpaceURL ) {
					return new UWA.Promise(function (resolve, reject) {
						var headers = {
							'Accept' : 'application/json',
							'Content-Type': 'application/json',
							'SecurityContext': that._securityContext
						};
						var options = UWA.merge(reqOptions, {
							method : 'POST',
							headers : headers,
							tenantId : that._tenant,
							apiVersion : 'R2018x',
							data : JSON.stringify(data),
							onComplete: function (output) {
								delete that._requestInfo[requestID];
								output = JSON.parse(output);
								resolve(output);
							},
							onFailure : function () {
								delete that._requestInfo[requestID];
								reject();
							},
							onCancel : function () {
								delete that._requestInfo[requestID];
								reject({cancel: true});
							}
						});
						var request = WAFData.authenticatedRequest(that._3DSpaceURL + url , options);
						that._requestInfo[requestID].status = 1;
						that._requestInfo[requestID].request = request;
					});
				} else {
					return UWA.Promise.resolve();
				}

			});
		},

		cancelRequest : function (requestID) {
			var info = this._requestInfo[requestID];
			if(info && info.request) {
				info.request.cancel();
			}
		},

		_getSearchServiceURL : function () {
			if(this._searchServiceURL) {
				return UWA.Promise.resolve();
			} else {
				var that = this;
				return new UWA.Promise(function (resolve, reject) {
					WidgetServices.get3DSearchUrlAsync({
						platformId: that._tenant,
						onComplete: function(fullServerUrl){
							console.log(fullServerUrl);
							that._searchServiceURL = fullServerUrl + '/search';
							resolve();
						},
						onFailure : function () {
							reject();
						}
					});
				});
			}
		},

		_get3DSpaceURL : function () {
			if(this._3DSpaceURL) {
				return UWA.Promise.resolve();
			} else {
				var that = this;
				return new UWA.Promise(function (resolve, reject) {
					WidgetServices.get3DSpaceUrlAsync({
						platformId: that._tenant,
						onComplete: function(url){
							console.log(url);
							that._3DSpaceURL = url;
							resolve();
						},
						onFailure : function () {
							reject();
						}
					});
				});
			}
		}
	});
});

define(
    'DS/ConfiguratorPanel/scripts/Models/PCDataUtil',
    [
      'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
  		'DS/ConfiguratorPanel/scripts/ServiceUtil',
    ],

    function(ConfiguratorVariables, ServiceUtil){
    'use strict';

    var STATE_ICONS = {};
    STATE_ICONS[ConfiguratorVariables.Default] = 'favorite-on';
    STATE_ICONS[ConfiguratorVariables.Required] = 'lock';
    STATE_ICONS[ConfiguratorVariables.Chosen] = '';
    STATE_ICONS[ConfiguratorVariables.Selected] = 'lightbulb';
    STATE_ICONS[ConfiguratorVariables.Unselected] = '';
    STATE_ICONS[ConfiguratorVariables.Incompatible] = 'block';
    STATE_ICONS[ConfiguratorVariables.Dismissed] = 'user-delete';

    var STATES = {};
    STATES[ConfiguratorVariables.PersistenceStates_Chosen] = ConfiguratorVariables.Chosen;
    STATES[ConfiguratorVariables.PersistenceStates_Required] = ConfiguratorVariables.Required;
    STATES[ConfiguratorVariables.PersistenceStates_Default] = ConfiguratorVariables.Default;
    STATES[ConfiguratorVariables.PersistenceStates_Dismissed] = ConfiguratorVariables.Dismissed;
    STATES[ConfiguratorVariables.PersistenceStates_Incompatible] = ConfiguratorVariables.Incompatible;
    STATES[ConfiguratorVariables.PersistenceStates_Unselected] = ConfiguratorVariables.Unselected;
    STATES[ConfiguratorVariables.PersistenceStates_Selected] = ConfiguratorVariables.Selected;


		var pCDataUtil =  function(options){
      this._init(options);
    };

    pCDataUtil.prototype._init = function (options) {
      this._configModel = options.configModel;
      this._dictionaryUtil = options.dictionaryUtil;
      this._modelEvents = options.modelEvents;

      this._pcDetails = {};
      this._matchingPCs = {};

      this._chosenCriteria = {};
      this._searchCriteria = {};
      this._searchSelectionMode;
      this._isloadingPC = false;

      this._subscribeEvents();
      this._loadChosenCriteria();
    };

    pCDataUtil.prototype._subscribeEvents = function (id) {

      this._modelEvents.subscribe({event : 'pc-load-matching-pcs-action'}, () => {
        this._loadMatchingPCs();
      });
    };

    pCDataUtil.prototype._loadChosenCriteria = function () {
      this._chosenCriteria = this._getChosenCriteria();
    };

    pCDataUtil.prototype.refresh = function () {
      this._chosenCriteria = this._getChosenCriteria();
      this._loadMatchingPCs();
    };

    pCDataUtil.prototype.getStateIcon = function (id) {
      var state = this._configModel.getStateWithId(id);
      return STATE_ICONS[state];
    };

    pCDataUtil.prototype.isSelectable = function (id) {
      return this._configModel.getStateWithId(id) !== ConfiguratorVariables.Incompatible && this._configModel.getStateWithId(id) !== ConfiguratorVariables.Required;
    };

    pCDataUtil.prototype.getIdStateMap = function () {
      return this._configModel._cacheIdWithState;
    };

    pCDataUtil.prototype.getSelectedValue = function (id) {
      var value;
      if(this._dictionaryUtil.isVariant(id) || this._dictionaryUtil.isOptionGroup(id)) {
        var values = this._dictionaryUtil.getValues(id);
        var stateMap = values.reduce((map, valueId) => {
          var state = this._configModel.getStateWithId(valueId);
          if(map.hasOwnProperty(state)) {
            map[state].push(valueId);
          } else {
            map[state] = [valueId];
          }
          return map;
        }, {});

        if(this.isMultiValue(id)) {
          value = [];
          if(this.isDismissValue(id)) {
            if(stateMap.hasOwnProperty(ConfiguratorVariables.Dismissed)) {
              value = value.concat(stateMap[ConfiguratorVariables.Dismissed]);
            }
            if(stateMap.hasOwnProperty(ConfiguratorVariables.Incompatible)) {
              value = value.concat(stateMap[ConfiguratorVariables.Incompatible]);
            }
          } else {
            if(stateMap.hasOwnProperty(ConfiguratorVariables.Chosen)) {
              value = value.concat(stateMap[ConfiguratorVariables.Chosen]);
            }
            if(stateMap.hasOwnProperty(ConfiguratorVariables.Required)) {
              value = value.concat(stateMap[ConfiguratorVariables.Required]);
            }
            if(stateMap.hasOwnProperty(ConfiguratorVariables.Default)) {
              value = value.concat(value = stateMap[ConfiguratorVariables.Default]);
            }
            if(stateMap.hasOwnProperty(ConfiguratorVariables.Selected)) {
              value = value.concat(value = stateMap[ConfiguratorVariables.Selected]);
            }
          }
        } else {
          if(stateMap.hasOwnProperty(ConfiguratorVariables.Chosen)) {
            value = stateMap[ConfiguratorVariables.Chosen][0];
          } else if(stateMap.hasOwnProperty(ConfiguratorVariables.Required)) {
            value = stateMap[ConfiguratorVariables.Required][0];
          } if(stateMap.hasOwnProperty(ConfiguratorVariables.Default)) {
            value = stateMap[ConfiguratorVariables.Default][0];
          } if(stateMap.hasOwnProperty(ConfiguratorVariables.Selected)) {
            value = stateMap[ConfiguratorVariables.Selected][0];
          }
        }
      } else if(this._dictionaryUtil.isParameter(id)) {
        value = this._configModel.getValueWithId(id);
      }
      return value;
    };

    pCDataUtil.prototype.hasRejectAction = function (id) {
      if(this._configModel.getStateWithId(id) == ConfiguratorVariables.Chosen || this._configModel.getStateWithId(id) == ConfiguratorVariables.Default)
      {
        return true;
      }

      return false;
    };

    pCDataUtil.prototype.hasValidateAction = function (id) {
      if(this._configModel.getStateWithId(id) == ConfiguratorVariables.Required ||
        this._configModel.getStateWithId(id) == ConfiguratorVariables.Default ||
        this._configModel.getStateWithId(id) == ConfiguratorVariables.Selected
        )
      {
        return true;
      }

      return false;
    };

    pCDataUtil.prototype.hasConflict = function (id) {
      if(this._configModel.isConflictingOption(id))
      {
        return true;
      }

      return false;
    };

    pCDataUtil.prototype.isMultiValue = function (id) {
      if(this._configModel.getFeatureSelectionMode(id) == ConfiguratorVariables.feature_SelectionMode_EnforceMultiple ||
        this._configModel.getFeatureSelectionMode(id) == ConfiguratorVariables.feature_SelectionMode_Multiple ||
        this._configModel.getFeatureSelectionMode(id) == ConfiguratorVariables.feature_SelectionMode_Dismiss )
      {
        return true;
      }

      return false;
    };

    pCDataUtil.prototype.isDismissValue = function (id) {
      if(this._configModel.getFeatureSelectionMode(id) == ConfiguratorVariables.feature_SelectionMode_Dismiss)
      {
        return true;
      }

      return false;
    };

    pCDataUtil.prototype.isMandatory = function (id) {
      if(this._dictionaryUtil.isMandatory(id)){
        if(this.isDismissValue(id)) {
          return false;
        }
        var value = this.getSelectedValue(id);
        return !(value && value.length > 0);
      }
      return false;
    };

    pCDataUtil.prototype.isUpdateRequired = function (id) {
      if(this._configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration" &&
        this._configModel.isSolveWithDiagnose()) {
          if(this._configModel.getFirstSelection() &&
              (this._configModel.isConfigCriteriaUpdated() ||
                (!this._configModel.isConfigCriteriaUpdated() && !this._configModel.getDignosedVariant(id))
              )
          ) {
            return true;
          }
      }
      return false;
    };

    pCDataUtil.prototype.getIdsToDiagnose = function (id) {
      return this._dictionaryUtil.getValues(id);
    };

    pCDataUtil.prototype.selectValue = function (id, value) {
      var previousValue = this.getSelectedValue(id);

      if(this._dictionaryUtil.isVariant(id) || this._dictionaryUtil.isOptionGroup(id)) {
        if(this.isMultiValue(id)) {
          if(value) {
            value = UWA.is(value, 'array') ? value : [value];
          } else {
            value = [];
          }

          if(previousValue) {
            previousValue = UWA.is(previousValue, 'array') ? previousValue : [previousValue];
            previousValue.forEach((valueId) => {
              var valueIndex = value.indexOf(valueId);
              if( valueIndex > -1) {
                value.splice(valueIndex,1);
                return;
              }
              this.rejectValue(id, valueId);
              // this._configModel.setStateWithId(valueId, ConfiguratorVariables.Unselected);
            });
          }
          value.forEach((valueId) => {
            var oldValue = this._configModel.getStateWithId(valueId);
            if(this.isDismissValue(id)) {
              if(oldValue == ConfiguratorVariables.Dismissed) {
                this._configModel.setStateWithId(valueId, ConfiguratorVariables.Unselected);
              } else {
                this._configModel.setStateWithId(valueId, ConfiguratorVariables.Dismissed);
                if(!this._configModel.getFirstSelection()) {
                  this._configModel.setFirstSelection(true);
                }
                if(!this._chosenCriteria[id]) {
                  this._chosenCriteria[id] = {};
                }
                this._chosenCriteria[id][valueId] = false;
              }
            } else {
              if(oldValue == ConfiguratorVariables.Dismissed) {
                this._configModel.setStateWithId(valueId, ConfiguratorVariables.Default);
              } else if(oldValue == ConfiguratorVariables.Default) {
                this._configModel.setStateWithId(valueId, ConfiguratorVariables.Unselected);
              } else {
                this._configModel.setStateWithId(valueId, ConfiguratorVariables.Chosen);
                if(!this._configModel.getFirstSelection()) {
                  this._configModel.setFirstSelection(true);
                }
                if(!this._chosenCriteria[id]) {
                  this._chosenCriteria[id] = {};
                }
                this._chosenCriteria[id][valueId] = true;
              }
            }

            this._configModel.setUpdateRequiredOption(valueId,true);
          });
        } else {
          if(previousValue != value) {
            if(previousValue)
            this._configModel.setStateWithId(previousValue, ConfiguratorVariables.Unselected);

            if(value) {
              var oldValue = this._configModel.getStateWithId(value);
              if(this._configModel.getStateWithId(value) == ConfiguratorVariables.Dismissed) {
                this._configModel.setStateWithId(value, ConfiguratorVariables.Default);
              } else if(oldValue == ConfiguratorVariables.Default) {
                this._configModel.setStateWithId(value, ConfiguratorVariables.Unselected);
              } else {
                this._configModel.setStateWithId(value, ConfiguratorVariables.Chosen);
                if(!this._configModel.getFirstSelection()) {
                  this._configModel.setFirstSelection(true);
                }
                if(!this._chosenCriteria[id]) {
                  this._chosenCriteria[id] = {};
                }
                this._chosenCriteria[id][value] = true;
              }
              this._configModel.setUpdateRequiredOption(value,true);
            }
          }
        }
      }
    };

    pCDataUtil.prototype.rejectValue = function (id, value) {
      var oldValue = this._configModel.getStateWithId(value);
      if(oldValue == ConfiguratorVariables.Default) {
        this._configModel.setStateWithId(value, ConfiguratorVariables.Dismissed);
      } else {
        this._configModel.setStateWithId(value, ConfiguratorVariables.Unselected);
      }
      if(this._configModel.getStateWithId(value) == ConfiguratorVariables.Dismissed) {
          if(!this._chosenCriteria[id]) {
            this._chosenCriteria[id] = {};
          }
          this._chosenCriteria[id][value] = false;
      } else {
          if(this._chosenCriteria[id] && this._chosenCriteria[id].hasOwnProperty(value)) {
            delete this._chosenCriteria[id][value];
          }
          if(Object.keys(this._chosenCriteria[id]).length == 0) {
            delete this._chosenCriteria[id];
          }
      }



      // if(this._chosenCriteria[id]) {
      //   if(this._chosenCriteria[id].hasOwnProperty(value)) {
      //       this._chosenCriteria[id][value] = false;
      //     } else {
      //       delete this._chosenCriteria[id][value];
      //     }
      //   if(this._chosenCriteria[id] == value) {
      //     delete this._chosenCriteria[id];
      //   } else if(UWA.is(this._chosenCriteria[id], 'array')) {
      //     if(this._chosenCriteria[id].indexOf(value) != -1) {
      //       this._chosenCriteria[id].splice(this._chosenCriteria[id].indexOf(value), 1);
      //       if(this._chosenCriteria[id].length == 0) {
      //         delete this._chosenCriteria[id];
      //       }
      //     }
      //   }
      // }
      this._configModel.setUpdateRequiredOption(value,true);

    };

    pCDataUtil.prototype.validateValue = function (id, value) {
      var oldValue = this._configModel.getStateWithId(value);
      if(oldValue == ConfiguratorVariables.Default || ConfiguratorVariables.Required || ConfiguratorVariables.Selected) {
        this._configModel.setStateWithId(value, ConfiguratorVariables.Chosen);
        this._chosenCriteria[id] = value;
        this._configModel.setUpdateRequiredOption(value,true);
      }
    };

    pCDataUtil.prototype.setParamValue = function (id, value) {
      if (value) {
         var valueToBeUpdated = value.toString();
         if (UWA.is(valueToBeUpdated, "string")) {
           var paramDetails = this._dictionaryUtil.getDetails(id);
           if (paramDetails.unit && paramDetails.unit != "" && valueToBeUpdated.indexOf(paramDetails) === -1) {
               valueToBeUpdated = valueToBeUpdated + " " + paramDetails.unit;
           }
         }
         if (valueToBeUpdated) {
             this._configModel.setValueWithId(id, valueToBeUpdated);
         }
     }
    };

    pCDataUtil.prototype.updateUserSelection = function (id, value, isSelected) {
      if(!this._chosenCriteria[id]) {
        this._chosenCriteria[id] = {};
      }
      this._chosenCriteria[id][value] = isSelected;

    }
    pCDataUtil.prototype._loadMatchingPCs = async function () {
      this._modelEvents.publish({event : 'pc-matching-pcs-load-start'});
      var hasChanged = this._checkMatchingCriteriaChange();
      await this._refinePCList(hasChanged);

      this._modelEvents.publish({event : 'pc-matching-pcs-load-end'});
    };


    pCDataUtil.prototype.fetchMatchingPCs = function () {
      var requestID = "matchingPCSearch";
      this._matchingPCs = {};
      ServiceUtil.cancelRequest(requestID);
      var data = {
      	label : 'x_mdl_app_pc_panel' + Date.now(),
      	with_synthesis : false,
      	select_predicate : [
      		"ds6w:label",
      		"ds6w:identifier",
          'pc_feature_options',
          'preview_url',
          'revision',
          'pc_options_selected',
          'pc_options_rejected'
      	],
      	refine : {},
      	order_by : "desc",
      	order_field : "relevance",
      	query : this._prepareSearchQuery(),
        nresults : 200
      };

      return this._searchCall(data, requestID);
    };

    pCDataUtil.prototype._searchCall = function (data, requestID, nresults) {
      return ServiceUtil.performSearchRequest(data, requestID).then(output => {
        var results = output.results;
        var infos = output.infos;
        if(results) {
          var parsedData = this._parseSearchResult(results);
          UWA.merge(this._matchingPCs, parsedData.matchingPCs);
          UWA.merge(this._pcDetails, parsedData.pcDetails);
        }
        if(infos) {
          if(!UWA.is(nresults)) {
            nresults = 0;
          }
          nresults += infos.nresults;
          if(infos.nmatches > nresults) {
            return this._searchCall(UWA.merge({next_start : infos.next_start}, data), requestID, nresults);
          }
        }

        return UWA.Promise.resolve();
      });
    };

    pCDataUtil.prototype._parseSearchResult = function (result) {
      var _matchingPCs = {};
      var _pcDetails = {};
      var pcs = result.map((item) => {
        var details = {};
        var attributes = UWA.Json.path(item, '$..attributes[?(@.name=="resourceid" || @.name=="ds6w:label" || @.name=="ds6w:identifier" || @.name=="pc_feature_options" || @.name=="preview_url" || @.name=="revision"|| @.name=="pc_options_selected" || @.name=="pc_options_rejected" )]');
        if(attributes) {
          details = attributes.reduce((item, current) => {
            if(false && current.name == 'pc_feature_options') {
              var selection = this._dictionaryUtil.getSelection(current.value);
              if(!item.selections) {
                item.selections = {};
              }
              if(selection) {
                if(item.selections[selection.key]) {
                  item.selections[selection.key] = [selection.value].concat(item.selections[selection.key]);
                } else {
                  item.selections[selection.key] = selection.value;
                }
              }
            }
            if(current.name == 'pc_options_selected') {
              var parent = this._dictionaryUtil.getParent(current.value);
              if(parent) {
                if(!item.selections) {
                  item.selections = {};
                }
                if(item.selections[parent]) {
                  item.selections[parent] = [current.value].concat(item.selections[parent]);
                } else {
                  item.selections[parent] = current.value;
                }
              }

            }
            if(current.name == 'pc_options_rejected') {
              var parent = this._dictionaryUtil.getParent(current.value);
              if(parent) {
                if(!item.rejections) {
                  item.rejections = {};
                }
                if(item.rejections[parent]) {
                  item.rejections[parent] = [current.value].concat(item.rejections[parent]);
                } else {
                  item.rejections[parent] = current.value;
                }
              }
            }

            item[current.name] = current.value;
            return item;
          }, {});
        }
        return details;
      });

      pcs.forEach((item) => {
        _matchingPCs[item.resourceid] = true;
        _pcDetails[item.resourceid] = {
          id: item.resourceid,
          name : item['ds6w:identifier'],
          title: item['ds6w:label'],
          version: item['revision'],
          image : item['preview_url'] || item['type_icon_url'],
          selections : item.selections || {},
          rejections : item.rejections || {}
        };
      });
      return {
        matchingPCs : _matchingPCs,
        pcDetails : _pcDetails
      };
    };

    // prepare query from selections
    // uses variant Name: value Name
    //// TODO: update using physicalid
    pCDataUtil.prototype._prepareSearchQuery = function () {
      var mvID = this._configModel._modelID;
      var pcID = this._configModel._pcId;

      var typeCheck = '(flattenedtaxonomies:\"types/Product Configuration\")';
      var parentCheck = 'AND (based_95_on_95_model_95_version_95_pid:\"'+ mvID +'\") AND (NOT physicalid:\"'+ pcID +'\") ';
      var selectionModeCheck = (this._configModel.getSelectionMode() == ConfiguratorVariables.selectionMode_Refine) ? 'AND (pc_95_selection_95_mode:\"Refine\")' : 'AND (pc_95_selection_95_mode:\"Build\") ';
      var criteriaCheck = '';
      for (var variantID in this._searchCriteria) {

        for (var valueID in this._searchCriteria[variantID]) {
          if (this._searchCriteria[variantID].hasOwnProperty(valueID)) {
            if(this._searchCriteria[variantID][valueID]) {
              criteriaCheck += 'AND (pc_95_options_95_selected:\"' + valueID + '\")';
            } else {
              criteriaCheck += 'AND (pc_95_options_95_rejected:\"' + valueID + '\")';
            }
          }
        }
        // var variantName = this._dictionaryUtil.getDetails(variantID).name;
        // if (this._searchCriteria[variantID]) {
        //   var valueIDs = UWA.is(this._searchCriteria[variantID], 'array')? this._searchCriteria[variantID] : [this._searchCriteria[variantID]];
        //   valueIDs.forEach((item) => {
        //     var valueName = this._dictionaryUtil.getDetails(item).name;
        //     criteriaCheck += 'AND (pc_95_feature_95_options:\"'+ variantName + ':' + valueName + '\")';
        //   });
        // }
      }

      return typeCheck + parentCheck + selectionModeCheck + criteriaCheck;
    };

    pCDataUtil.prototype._refinePCList = async function (force) {
      this._chosenCriteria = this._getChosenCriteria();
      this._isloadingPC = true;
      if(force) {
        this._matchingPCs = {};
        if(Object.keys(this._searchCriteria).length != 0) {
          await this.fetchMatchingPCs();
        }
      }
      var filteredPC = this._filterMatchingPCs();
      this._modelEvents.publish({event : 'pc-matching-pcs-count-update', data : filteredPC.length});
      this._isloadingPC = false;
    };

    pCDataUtil.prototype._filterMatchingPCs = function () {

      var updateMatchingPC = (selection, pcList, selectionType) => {
        var filteredPC = [];
        if(pcList.length > 0)
        {
            filteredPC = pcList.filter((id) => {
                if(this._pcDetails.hasOwnProperty(id)) {
                  var isMatched = false;
                  if(this._pcDetails[id][selectionType]/*.selections*/) {
                    var parent = this._dictionaryUtil.getParent(selection.id);
                    if(this._pcDetails[id][selectionType]/*.selections*/.hasOwnProperty(parent)) {
                      var value = this._pcDetails[id][selectionType]/*.selections*/[parent];
                      if(UWA.is(value,'array')) {
                        isMatched = value.indexOf(selection.id) != -1;
                      } else {
                        isMatched = value == selection.id;
                      }
                      this._matchingPCs[id] = isMatched;
                      return isMatched;
                    }
                  }
                }
                this._matchingPCs[id] = false;
                return false;
            });

        }
        return filteredPC;
      };
      var pcList = Object.keys(this._matchingPCs);
      for (var criteriaId in this._chosenCriteria) {

        var criteria = this._chosenCriteria[criteriaId];


        for (var valueId in criteria) {
          if (criteria.hasOwnProperty(valueId)) {
            pcList = updateMatchingPC({id: valueId , state: this._configModel.getStateWithId(valueId), }, pcList, criteria[valueId] ? 'selections' : 'rejections');
          }
        }

        if(pcList.length == 0) {
          break;
        }

        // for (var i = 0; i < Object.keys(value); i++) {
        //   pcList = updateMatchingPC({id: value[i], state: this._configModel.getStateWithId(value[i]), }, pcList, 'selections');
        //   if(pcList.length == 0) {
        //     break;
        //   }
        // }
        // if(pcList.length > 0) {
        //   value = this._chosenCriteria[criteriaId].rejections;
        //   if(!UWA.is(value, 'array')) {
        //     value = [value];
        //   }
        //
        //   for (var i = 0; i < value.length; i++) {
        //     pcList = updateMatchingPC({id: value[i], state: this._configModel.getStateWithId(value[i])}, pcList, 'rejections');
        //     if(pcList.length == 0) {
        //       break;
        //     }
        //   }
        // }

      }
      return pcList;
    };

    pCDataUtil.prototype.getMatchingPCs = function () {
      var pcList = [];
      for (var id in this._matchingPCs) {
        if(this._matchingPCs[id] == false) {
          continue;
        }
        if (this._pcDetails.hasOwnProperty(id)) {
          pcList.push(this._pcDetails[id]);
        }
      }
      return pcList;
    };

    pCDataUtil.prototype.loadPCDetails = function (pcList) {
      if(UWA.is(pcList, 'array')) {
        var pcListToLoad = [];
        pcList.forEach((item) => {
          if (!this._pcDetails.hasOwnProperty(item) || !this._pcDetails[item].hasOwnProperty('states')) {
            pcListToLoad.push(item);
          }
        });
        this.fetchPCDetails(pcListToLoad);
      }
    };

    pCDataUtil.prototype.fetchPCDetails = function (pcList) {
      pcList.forEach((id) => {
        var data = {"id": id,"filerRejected": false};
        this._getDetailsCall(id).then(() => {
          this._modelEvents.publish({event : 'pc-refresh-pc-content', data: id});
        });
      });

      return true;
    };

    pCDataUtil.prototype._getDetailsCall = function (id) {
      var url = '/resources/v1/modeler/dspfl/invoke/dspfl:getCriteriaConfigurationInstances';
      var data = {"id": id, "filerRejected": false};
      return ServiceUtil.performServiceRequest(url, data, id).then(output => {
        if(output && UWA.is(output.member, 'array')) {
          if (this._pcDetails.hasOwnProperty(id)) {
            var states = {};
            var values = {};
            output.member.forEach((criteria) => {
              if(criteria.status) {
                states[criteria.id] = STATES.hasOwnProperty(criteria.status) ? STATES[criteria.status] : criteria.status;
              } else if(criteria.value) {
                values[criteria.id] = criteria.value;
              }
            });
            this._pcDetails[id].states = states;
            this._pcDetails[id].values = values;
          }
        }
      });
    };

    pCDataUtil.prototype._getInfoCall = function (id) {
      var url = UWA.String.format('/resources/v1/modeler/dspfl/dspfl:ModelVersion/{0}/dspfl:ProductConfiguration/{1}', this._configModel._modelID, id);
      var data = {};
      return ServiceUtil.performServiceRequest(url, data, 'pc'+ id, { method: 'GET', data : ''} ).then(output => {
        if(output && UWA.is(output.member, 'array') && output.member.length == 1) {
          if (this._pcDetails.hasOwnProperty(id)) {
            var evalMode = output.member[0].evalMode;
            var rulesMode = (evalMode === "CompleteConfiguration") ? 'RulesMode_SelectCompleteConfiguration' : ((evalMode === "Dependencies") ? 'RulesMode_EnforceRequiredOptions' : 'RulesMode_DisableIncompatibleOptions');
            this._pcDetails[id].rulesMode = rulesMode;
          }
        }
      });
    };

    pCDataUtil.prototype._getChosenValue = function (id) {
      var chosenValue;
      var hasSingleValue = true;
      if(this.isMultiValue(id)) {
        hasSingleValue = false;
      }
      var values = this._dictionaryUtil.getValues(id);

      for (var j = 0; j < values.length; j++) {
        var state = this._configModel.getStateWithId(values[j]);
        if(this.isDismissValue(id)) {
          if(state == ConfiguratorVariables.Dismissed || state == ConfiguratorVariables.Incompatible){
            if(!chosenValue)
            {
              chosenValue = {};
            }
            chosenValue[values[j]] = false;

            // if(hasSingleValue) {
              //   chosenValue = values[j];
              //   break;
              // } else {
                //   if(chosenValue) {
                  //     chosenValue = UWA.is(chosenValue, 'array') ? chosenValue.concat(values[j]) : [chosenValue, values[j]];
                  //   } else {
                    //     chosenValue = values[j];
                    //   }
                    // }
            }

        } else if(state == ConfiguratorVariables.Chosen ||
            state == ConfiguratorVariables.Default ||
              state == ConfiguratorVariables.Selected ||
                state == ConfiguratorVariables.Required) {
              if(!chosenValue)
              {
                chosenValue = {};
              }
              chosenValue[values[j]] = true;
              // if(hasSingleValue) {
              //   break;
              // }
        }
      }

      return chosenValue;
    };

    pCDataUtil.prototype._getChosenCriteria = function (count, includeIds) {
      var chosenCriteria = {};
      var num = 0;
      var criteriaIds = this._dictionaryUtil.getAllCriteria();

      if(includeIds) {
        includeIds.forEach((item) => {
          var chosenValue = this._getChosenValue(item);
          if(chosenValue) {
            if(!chosenCriteria[item]) {
              chosenCriteria[item] = {};
            }
            for (var valueId in chosenValue) {
              if (chosenValue.hasOwnProperty(valueId)) {
                chosenCriteria[item][valueId] = chosenValue[valueId];
              }
            }
            // chosenCriteria[item][chosenValue] = true;

            // else {
            //   chosenCriteria[item].selections = chosenValue;
            // }
            // chosenCriteria[item] = chosenValue;
            num++;
          }
        });
      }

      for (var i = 0; i < criteriaIds.length; i++) {
        if(count && num == count) {
          break;
        }
        if(includeIds && includeIds.indexOf(criteriaIds[i]) > -1) {
          continue;
        }
        var chosenValue = this._getChosenValue(criteriaIds[i]);

        if(chosenValue) {
          // chosenCriteria[criteriaIds[i]] = chosenValue;

          if(!chosenCriteria[criteriaIds[i]]) {
            chosenCriteria[criteriaIds[i]] = {};
          }
          for (var valueId in chosenValue) {
            if (chosenValue.hasOwnProperty(valueId)) {
              chosenCriteria[criteriaIds[i]][valueId] = chosenValue[valueId];
            }
          }

          // chosenCriteria[criteriaIds[i]][chosenValue] = true;

          //
          // if(!chosenCriteria[criteriaIds[i]]) {
          //   chosenCriteria[criteriaIds[i]] = {selections : chosenValue };
          // } else {
          //   chosenCriteria[criteriaIds[i]].selections = chosenValue;
          // }
          num++;
        }
      }

      return chosenCriteria;
    };

    pCDataUtil.prototype._checkMatchingCriteriaChange = function () {
      var hasChanged = false;
      if(this._searchSelectionMode !== this._configModel.getSelectionMode()) {
        this._searchSelectionMode = this._configModel.getSelectionMode();
        return true;
      }
      var searchCriteria;
      var oldSearchKeys = Object.keys(this._searchCriteria);
      searchCriteria = this._getChosenCriteria(2, oldSearchKeys);

      if(searchCriteria) {
        var searchKeys = Object.keys(searchCriteria);
        if(searchKeys.length != oldSearchKeys.length) {
          hasChanged = true;
        } else {
          for (var i = 0; i < searchKeys.length; i++) {
            // TODO: check change in criteria
            if(!this._searchCriteria.hasOwnProperty(searchKeys[i]) || !UWA.equals(searchCriteria[searchKeys[i]], this._searchCriteria[searchKeys[i]])) {
              hasChanged = true;
              break;
            }
          }
        }
        if(hasChanged) {
          this._searchCriteria = searchCriteria;
        }
      }
      return hasChanged;
    };

    pCDataUtil.prototype.applyPCSelections = async function (pcId) {
      var configurations = await this._getConfiguration(pcId);
      this._configModel.setConfigurationCriteria(configurations, "", "", true);
      this._configModel.resetFeaturesSelectionMode();
      this._modelEvents.publish({event : "OnConfigurationModeChange" , data : {mode : this._configModel.getSelectionMode()}});
    };

    pCDataUtil.prototype._getConfiguration = async function (pcId) {
        var configurations = [];
        if (this._pcDetails.hasOwnProperty(pcId)) {
            if (!this._pcDetails[pcId].states) {
                await this._getDetailsCall(pcId);
            }
            if (!this._pcDetails[pcId].rulesMode) {
                await this._getInfoCall(pcId);
            }

            if (this._pcDetails[pcId].states) {
                for (var id in this._pcDetails[pcId].states) {
                    if (this._pcDetails[pcId].states[id] == ConfiguratorVariables.Chosen ||
                        this._pcDetails[pcId].states[id] == ConfiguratorVariables.Dismissed) {
                        configurations.push({ Id: id, State: this._pcDetails[pcId].states[id] });
                    }
                }
            }
            if (this._pcDetails[pcId].values) {
                for (var paramId in this._pcDetails[pcId].values) {
                    configurations.push({ Id: paramId, Value: this._pcDetails[pcId].values[paramId] });
                }
            }
            if(this._configModel.getRulesMode() !== this._pcDetails[pcId].rulesMode) {
              this._modelEvents.publish({event : 'pc-notification-different-ruleMode'});
            }
        }
        return configurations;
    };

    pCDataUtil.prototype._getPCConfiguration = async function (pcId) {
        var configurations = [];
        if (this._pcDetails.hasOwnProperty(pcId)) {
            if (!this._pcDetails[pcId].states) {
                await this._getDetailsCall(pcId);
            }

            if (this._pcDetails[pcId].states) {
                for (var id in this._pcDetails[pcId].states) {
                    if (this._pcDetails[pcId].states[id] == ConfiguratorVariables.Chosen ||
                        this._pcDetails[pcId].states[id] == ConfiguratorVariables.Dismissed) {
                        configurations.push({ Id: id, State: this._pcDetails[pcId].states[id] });
                    }
                }
            }
            if (this._pcDetails[pcId].values) {
                for (var paramId in this._pcDetails[pcId].values) {
                    configurations.push({ Id: paramId, Value: this._pcDetails[pcId].values[paramId] });
                }
            }
        }
        return configurations;
    };

    pCDataUtil.prototype.getSelectionValue = function (pcId, criteriaId) {
      var selectedValues ;
      if(this._pcDetails && this._pcDetails.hasOwnProperty(pcId)) {
        if(this._pcDetails[pcId].selections || this._pcDetails[pcId].rejections){
          ['selections', 'rejections'].forEach((selectType) => {
            if(this._pcDetails[pcId][selectType] && this._pcDetails[pcId][selectType].hasOwnProperty(criteriaId)) {
              var values = this._pcDetails[pcId][selectType][criteriaId];
              if(UWA.is(values, 'array')) {
                selectedValues = values.map((item) => {
                  var valueDetails = this._dictionaryUtil.getDetails(item);
                  var icon = '';
                  if(this._pcDetails[pcId].states && this._pcDetails[pcId].states.hasOwnProperty(valueDetails.id)) {
                    var state = this._pcDetails[pcId].states[valueDetails.id];
                    icon = STATE_ICONS[state];
                  } else if(selectType == 'rejections') {
                    icon = STATE_ICONS[ConfiguratorVariables.Dismissed];
                  }

                  return {
                    label : valueDetails.title,
                    image: valueDetails.image,
                    icon : icon
                  };
                });
              } else {
                var valueDetails = this._dictionaryUtil.getDetails(values);
                var icon = '';
                if(this._pcDetails[pcId].states && this._pcDetails[pcId].states.hasOwnProperty(valueDetails.id)) {
                  var state = this._pcDetails[pcId].states[valueDetails.id];
                  icon = STATE_ICONS[state];
                } else if(selectType == 'rejections') {
                  icon = STATE_ICONS[ConfiguratorVariables.Dismissed];
                }
                selectedValues = {
                  label : valueDetails.title,
                  image: valueDetails.image,
                  icon : icon
                };
              }
            }
          });
        } else if(this._pcDetails[pcId].values && this._pcDetails[pcId].values.hasOwnProperty(criteriaId)) {
          return this._pcDetails[pcId].values[criteriaId];
        }
      }
      return selectedValues;
    };

    pCDataUtil.prototype.getPCDetails = function (pcId) {
      var pcDetails = {
        id: pcId
      };
      if(this._pcDetails && this._pcDetails.hasOwnProperty(pcId)) {
        pcDetails.name = this._pcDetails[pcId].title;
        pcDetails.version = this._pcDetails[pcId].version;
      }
      return pcDetails;
    }

		return pCDataUtil;
	}

);

/*
	FilterExpressionXMLServices.js
	To convert configurator json to xml for binary creation

*/

define('DS/ConfiguratorPanel/scripts/Models/FilterExpressionXMLServicesWithDisplayName',
[
	'UWA/Core',
	'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables'
],
function (UWA, ConfiguratorVariables) {
		'use strict';
    function FilterExpressionXMLServicesWithDisplayName(xmlType)
    {
	    var AppRulesParamObj = {};
	    var AppFuncObj =  {};
	    var DictionaryObj = {};
	    var ConfigCriteriaObj =  {};
	    var XML_FILE_TYPE = {};
	    var EvolutionCriteriaObj = {};
	    var ModelVersionInfoObj = {};
	    var FILTER_SELECTION_MODE = '';
	    var listOfRejectedOptionsForEachSingleFeature = {};     //XF3
	    var listOfRejectedOptionsStateForEachSingleFeature = {};     //XF3

	    var XML_TAG_NAMES = {
		    FilterSelection : 'FilterSelection',
		    Context : 'Context',
		    CfgFilterExpression : 'CfgFilterExpression',
		    Feature : 'Feature'
	    };

	    var ATTR_VALUE_MAP = {
		    selectionMode	 : "SelectionMode",
		    selectionMode_Build: "Strict",
		    selectionMode_Refine: "150%"

	    };
	    var ATTRNAMES = ['selectionMode'];
	    var CONFIGURATOR_FIELDS = {
		    ConfigurationCriteria :'configurationCriteria',
		    ApplicationState :'applicationState',
		    AppRulesParam : 'app_RulesParam',
		    AppFunc : 'app_Func',
		    Dictionary : 'dictionary',
		    Rules:'rules',
		    EvolutionCriteria: 'evolutionCriteria',
	        ModelVersionInfo:'modelVersionInfo'
	    };

	    var XML_DECLARE = {
		    Schema : "xmlns:xs",
		    Namespace : "xmlns",
		    SchemaLocation : "xs:schemaLocation"
	    };

	    var FILTER_EXPRESSION = {
		    ROOT : "CfgFilterExpression",
		    TAG1 : "FilterSelection",
		    Schema: "http://www.w3.org/2001/XMLSchema-instance",
		    Namespace : "urn:com:dassault_systemes:config",
		    SchemaLocation : "urn:com:dassault_systemes:config CfgFilterExpression.xsd"
	    };
	    initXMLType();
	    function initXMLType(){
		    if(xmlType === 'FilterExpression')
			    XML_FILE_TYPE = FILTER_EXPRESSION;
	    }
	    function initParamObjects(jsonObj)
	    {
		    AppRulesParamObj = jsonObj[CONFIGURATOR_FIELDS.AppRulesParam];
		    AppFuncObj =  jsonObj[CONFIGURATOR_FIELDS.AppFunc];
		    DictionaryObj = jsonObj[CONFIGURATOR_FIELDS.Dictionary];
		    ConfigCriteriaObj =  jsonObj[CONFIGURATOR_FIELDS.ConfigurationCriteria];
		    EvolutionCriteriaObj = jsonObj[CONFIGURATOR_FIELDS.EvolutionCriteria];
		    FILTER_SELECTION_MODE = AppRulesParamObj['selectionMode'];
		    ModelVersionInfoObj = jsonObj[CONFIGURATOR_FIELDS.ModelVersionInfo];
	    }

	    function getXMLDeclaration()
	    {
		    var initXml = '<?xml version="1.0" encoding="UTF-8"?>';
		    var attrList = [];
		    for(var elem in XML_DECLARE)
		    {
			    attrList.push(elem);
		    }
		    initXml += "<"+ XML_FILE_TYPE.ROOT;
		    if(attrList!==null) {
			    for(var item = 0; item < attrList.length; item++) {
				    var key = attrList[item];
				    var attrName = XML_DECLARE[key];
				    var attrVal = FILTER_EXPRESSION[key];
				    //attrVal=escapeXmlChars(attrVal);
				    initXml+=" "+attrName+"='"+attrVal+"'";
			    }
		    }
		    initXml+=">";
		    return initXml;
	    }

	    function jsonXmlElemCount () {
		    var elementsCnt = 0;
		    for( var it in ConfigCriteriaObj  ) {
			    if(ConfigCriteriaObj[it] instanceof Object)
			    {
			        if (ConfigCriteriaObj[it].State === ConfiguratorVariables.Chosen || ConfigCriteriaObj[it].State === ConfiguratorVariables.Required || ConfigCriteriaObj[it].State === ConfiguratorVariables.Default || ConfigCriteriaObj[it].State === ConfiguratorVariables.Selected ||
					     ConfigCriteriaObj[it].State === ConfiguratorVariables.Dismissed || ConfigCriteriaObj[it].State === ConfiguratorVariables.Incompatible)
						    elementsCnt++;
				    }
			    }

		    return elementsCnt;
	    }
	    function addAttributes(rulesParamObj,element, attrList, closed) {
		    var resultStr = "<"+ element;
				var attrVal;
		    if(attrList!==null) {
			    for(var aidx = 0; aidx < attrList.length; aidx++) {
				    var attrName = attrList[aidx];
				    if(ATTR_VALUE_MAP[attrName] !== undefined)
				    {
					    var tAttrName = ATTR_VALUE_MAP[attrName];
					    attrVal = ATTR_VALUE_MAP[rulesParamObj[attrName]];
					    attrVal=escapeXmlChars(attrVal);
					    resultStr+=" "+tAttrName+"='"+attrVal+"'";

				    }else
				    {
					    attrVal = rulesParamObj[attrName];
					    attrVal = escapeXmlChars(attrVal);
					    resultStr+=" "+attrName+"='"+attrVal+"'";
				    }

			    }
		    }
		    if(!closed)
			    resultStr+=">";
		    else
			    resultStr+="/>";
		    return resultStr;
	    }

	    function endTag(elementName) {
		    return "</"+ elementName+">";
	    }

	    function escapeXmlChars(str) {
	    if(typeof(str) === "string")
		    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
	    else
		    return str;
	    }

        //XF3 : If selection and reject are present in the same feature, we cannot add the reject in the XML or it will lead to XML parsing issues
	    /*function checkIfSelectionIsPresentInSameFeature(optionId) {
	        var config_features = DictionaryObj.features;
	        for (var itx in config_features) {
	            var cfElem = config_features[itx];
	            var coElem = cfElem['options'];
	            var optionFound = false;

	            if (coElem instanceof Object) {
	                for (var itr in coElem) {
	                    var coid = coElem[itr].ruleId;

	                    if (coid != undefined && coid.toString().trim() == optionId) {
	                        optionFound = true;
	                        break;
	                    }
	                }

	                if (optionFound) {
	                    for (var itr in coElem) {
	                        var coid = coElem[itr].ruleId;

	                        if (coid != undefined) {
	                            for (var it in ConfigCriteriaObj) {
	                                if (ConfigCriteriaObj[it] instanceof Object) {
	                                    var criteriaId = ConfigCriteriaObj[it].Id;
	                                    var state = ConfigCriteriaObj[it].State;

	                                    if (criteriaId == coid && (state == ConfiguratorVariables.Chosen || state == ConfiguratorVariables.Required || state == ConfiguratorVariables.Default || ConfigCriteriaObj[it].State == ConfiguratorVariables.Selected)) {
	                                        return true;
	                                    }
	                                }
	                            }
	                        }
	                    }
	                    break;
	                }
	            }
	        }
	        return false;
	    }*/


	    function checkLevelOfSelectionsInFeature(optionId) {
	        var selectionLevel = 'NoSelection';
	        var config_features = DictionaryObj.features;

	        for (var itx in config_features) {
	            var cfElem = config_features[itx];
	            var coElem = cfElem['options'];
	            var optionFound = false;
							var coid;

	            if (coElem instanceof Object) {
	                for (var itr in coElem) {
	                    coid = coElem[itr].ruleId;

	                    if (coid !== undefined && coid.toString().trim() === optionId) {
	                        optionFound = true;
	                        break;
	                    }
	                }

	                if (optionFound) {
	                    for (var itr in coElem) {
	                        coid = coElem[itr].ruleId;

	                        if (coid !== undefined) {
	                            for (var it in ConfigCriteriaObj) {
	                                if (ConfigCriteriaObj[it] instanceof Object) {
	                                    var criteriaId = ConfigCriteriaObj[it].Id;
	                                    var state = ConfigCriteriaObj[it].State;

	                                    if (criteriaId === coid) {
	                                        if (state === ConfiguratorVariables.Chosen) {
	                                            if (selectionLevel === 'NoSelection' || selectionLevel === 'ruleSelection') {
	                                                selectionLevel = 'userSelection';
	                                            }
	                                            else if (selectionLevel === 'userReject' || selectionLevel === 'userRejectAndRuleSelection') {
	                                                selectionLevel = 'userSelectionAndUserReject';
	                                            }
	                                            else if (selectionLevel === 'ruleReject' || selectionLevel === 'ruleSelectionAndRuleReject') {
	                                                selectionLevel = 'userSelectionAndRuleReject';
	                                            }
	                                        }
	                                        else if (state === ConfiguratorVariables.Required || state === ConfiguratorVariables.Default || state === ConfiguratorVariables.Selected) {
	                                            if (selectionLevel === 'NoSelection') {
	                                                selectionLevel = 'ruleSelection';
	                                            }
	                                            else if (selectionLevel === 'userReject') {
	                                                selectionLevel = 'userRejectAndRuleSelection';
	                                            }
	                                            else if (selectionLevel === 'ruleReject') {
	                                                selectionLevel = 'ruleSelectionAndRuleReject';
	                                            }
	                                        }
	                                        else if (state === ConfiguratorVariables.Dismissed) {
	                                            if (selectionLevel === 'NoSelection' || selectionLevel === 'ruleReject') {
	                                                selectionLevel = 'userReject';
	                                            }
	                                            else if (selectionLevel === 'userSelection' || selectionLevel === 'userSelectionAndRuleReject') {
	                                                selectionLevel = 'userSelectionAndUserReject';
	                                            }
	                                            else if (selectionLevel === 'ruleSelection' || selectionLevel === 'ruleSelectionAndRuleReject') {
	                                                selectionLevel = 'userRejectAndRuleSelection';
	                                            }
	                                        }
	                                        else if (state === ConfiguratorVariables.Incompatible) {
	                                            if (selectionLevel === 'NoSelection') {
	                                                selectionLevel = 'ruleReject';
	                                            }
	                                            else if (selectionLevel === 'userSelection') {
	                                                selectionLevel = 'userSelectionAndRuleReject';
	                                            }
	                                            else if (selectionLevel === 'ruleSelection') {
	                                                selectionLevel = 'ruleSelectionAndRuleReject';
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                    break;
	                }
	            }
	        }
	        return selectionLevel;
	    }


        //End XF3

	    function generateFilterXML (){
		    var result = "";
		    result += getXMLDeclaration();
		    result += addAttributes(AppRulesParamObj,XML_FILE_TYPE.TAG1,ATTRNAMES,false);
		    var elementsCnt = jsonXmlElemCount();

	        if (ModelVersionInfoObj !== undefined)
		        result += getProdStateXML();

				var isStrictMode = false;
				if(AppRulesParamObj.selectionMode === ConfiguratorVariables.selectionMode_Build) {
					isStrictMode = true;
				}
		    if (elementsCnt > 0) {
//		        result += addContext(DictionaryObj.model.label); // Removing optional context because it does not support empty selection (temporary?)
		        //if (EvolutionCriteriaObj != undefined)
		          //  result += getProdStateXML();

		        for (var it in ConfigCriteriaObj) {
		            if (ConfigCriteriaObj[it] instanceof Object) {
		                var criteriaId = ConfigCriteriaObj[it].Id;
		                var state = ConfigCriteriaObj[it].State;

		                /*if (state == ConfiguratorVariables.Chosen || state == ConfiguratorVariables.Required || state == ConfiguratorVariables.Default || ConfigCriteriaObj[it].State == ConfiguratorVariables.Selected) {
		                    result += addFeatureOption(criteriaId, false, state);
		                } else if (state == ConfiguratorVariables.Dismissed || state == ConfiguratorVariables.Incompatible) {
		                    if (!checkIfSelectionIsPresentInSameFeature(criteriaId)) {
		                        result += addFeatureOption(criteriaId, true, state);
		                    }
		                }*/

		                var selectionlevel = checkLevelOfSelectionsInFeature(criteriaId);

		                if (state === ConfiguratorVariables.Chosen || state === ConfiguratorVariables.Required || state === ConfiguratorVariables.Default || ConfigCriteriaObj[it].State === ConfiguratorVariables.Selected) {
		                    if (selectionlevel === 'userSelection' || selectionlevel === 'userSelectionAndUserReject' || selectionlevel === 'userSelectionAndRuleReject' || selectionlevel === 'ruleSelection' || selectionlevel === 'ruleSelectionAndRuleReject' || selectionlevel === 'userRejectAndRuleSelection') {
		                        result += addFeatureOption(criteriaId, false, state);
		                    }
		                } else if (!isStrictMode && (state === ConfiguratorVariables.Dismissed || state === ConfiguratorVariables.Incompatible)) {
		                    if (selectionlevel === 'userReject' || selectionlevel === 'ruleReject') {
		                        result += addFeatureOption(criteriaId, true, state);
		                    }
		                }
		            }
		        }
//		        result += endTag('Context');
		    }

		    var empty = true;

		    for (var prop in listOfRejectedOptionsForEachSingleFeature) {
		        if (listOfRejectedOptionsForEachSingleFeature.hasOwnProperty(prop))
		            empty = false;
		    }

		    if (!empty)
		        result += addListOfRejectedOptionsForSingleFeaturesInTheXML();

			    result += endTag(XML_FILE_TYPE.TAG1);
			    result += endTag(XML_FILE_TYPE.ROOT);
			    return result;

	    }
	    function getProdStateXML()
	    {
	        var prodStateXml = '';

	        if (ModelVersionInfoObj.modelName && ModelVersionInfoObj.modelVersionName && ModelVersionInfoObj.modelVersionRevision) {
	            var prodName = ModelVersionInfoObj.modelVersionName;
	            var prodRevsion = ModelVersionInfoObj.modelVersionRevision;
	            var modelName = ModelVersionInfoObj.modelName;

	            prodStateXml += '<TreeSeries Type="ProductState" Name="' + escapeXmlChars(modelName) + '">';
	            prodStateXml += '<Single Name="' + escapeXmlChars(prodName) + '" Revision="' + escapeXmlChars(prodRevsion) + '" />';
	            prodStateXml += '</TreeSeries>';
	        }

		    return prodStateXml;
	    }

        //XF3
	    function addOptionToTheListOfRejectedOptionsForSingleFeatures(cfid, coName, optionState) {
	        if (listOfRejectedOptionsForEachSingleFeature[cfid] === undefined)
	            listOfRejectedOptionsForEachSingleFeature[cfid] = [];

	        if (listOfRejectedOptionsStateForEachSingleFeature[cfid] === undefined)
	            listOfRejectedOptionsStateForEachSingleFeature[cfid] = [];

	        listOfRejectedOptionsForEachSingleFeature[cfid].push(coName);
	        listOfRejectedOptionsStateForEachSingleFeature[cfid].push(optionState);
	    }


	    function addListOfRejectedOptionsForSingleFeaturesInTheXML(){
	        var resXml='';

	        for (var itr in listOfRejectedOptionsForEachSingleFeature) {

	            var config_features = DictionaryObj.features;
	            for (var itx in config_features) {
	                var cfid = config_features[itx].ruleId;
	                if (cfid !== undefined && cfid.toString().trim() === itr) {
	                    var cfName = config_features[itx].displayName;
	                    resXml += "<NOT>";
	                    resXml += featureTag(cfName, false, false);
	                    for (var i = 0; i < listOfRejectedOptionsForEachSingleFeature[itr].length; i++) {
	                        var coName = listOfRejectedOptionsForEachSingleFeature[itr][i];
	                        var optionState = listOfRejectedOptionsStateForEachSingleFeature[itr][i];
	                        resXml += featureTag(coName, true, true, optionState);
	                    }
	                    resXml += endTag('Feature');
	                    resXml += endTag('NOT');

	                    break;
	                }

	            }

	        }

            return resXml;
	    }

        //End XF3

	    function addFeatureOption(criteriaId,isRejected, optionState)
	    {
		    var resXml = "";
		    var config_features = DictionaryObj.features;
		    for (var itx in config_features)
		    {
			    var cfElem = config_features[itx];
			    var cfName = cfElem.displayName;
			    var coElem = cfElem['options'];
			    if(coElem instanceof Object)
			    {
			     for(var itr in coElem)
			     {
				    var coName = coElem[itr].displayName;
				    if(coName !== undefined && coName !== null)
				    {
					    var coid = coElem[itr].ruleId;

					    if (coid !== undefined && coid.toString().trim() === criteriaId)
					    {
					        if (isRejected) {
					            if (cfElem.selectionType === "Multiple") {       //XF3
					                resXml += "<NOT>";
					                resXml += featureTag(cfName, false, false);
					                resXml += featureTag(coName, true, true, optionState);
					                resXml += endTag('Feature');
					                resXml += endTag('NOT');
					            }                                               //XF3
					            else {                                          //XF3
					                addOptionToTheListOfRejectedOptionsForSingleFeatures(cfElem.ruleId, coName, optionState);
					                return resXml;                              //XF3
					            }                                               //XF3
						    }else
						    {
							    resXml += featureTag(cfName,false, false);
							    resXml += featureTag(coName,true, true, optionState);
							    resXml += endTag('Feature');
						    }
					    }

				    }

			     }
		      }
	       }

	    return resXml;
	    }


	    function featureTag(elemName,closed, addSelectedByAttribut, optionState){
	     var resXml = '';

	     resXml += '<Feature Type="ConfigFeature" Name="' + escapeXmlChars(elemName) + '"';
			 if (addSelectedByAttribut && optionState) {

	         if (optionState === ConfiguratorVariables.Default)
                 resXml += ' SelectedBy="Default"';
	         else if (optionState === ConfiguratorVariables.Required || optionState === ConfiguratorVariables.Incompatible)
                 resXml += ' SelectedBy="Rule"';
             else
                 resXml += ' SelectedBy="User"';

	     }

	     if(!closed)
		    resXml+=">";
	     else
		    resXml+="/>";
	     return resXml;
	    }

	    this.json2xml_str =  function (jsonobj){
		    initParamObjects(jsonobj);
		    return generateFilterXML();
	    };

        /*
	    this.parseXml = function(xml) {
	        var dom = null;
	        if (window.DOMParser) {
	            try {
	                dom = (new DOMParser()).parseFromString(xml, "text/xml");
	            }
	            catch (e) { dom = null; }
	        }
	        else if (window.ActiveXObject) {
	            try {
	                dom = new ActiveXObject('Microsoft.XMLDOM');
	                dom.async = false;
	                if (!dom.loadXML(xml)) // parse error ..

	                    window.alert(dom.parseError.reason + dom.parseError.srcText);
	            }
	            catch (e) { dom = null; }
	        }
	        else
	            alert("cannot parse xml string!");
	        return dom;
	    }



        // Changes XML to JSON
	    this.xmlToJson = function(xml) {

	        var js_obj = {};
	        if (xml.nodeType == 1) {
	            if (xml.attributes.length > 0) {
	                js_obj["attributes"] = {};
	                for (var j = 0; j < xml.attributes.length; j++) {
	                    var attribute = xml.attributes.item(j);
	                    js_obj["attributes"][attribute.nodeName] = attribute.value;
	                }
	            }
	        } else if (xml.nodeType == 3) {
	            js_obj = xml.nodeValue;
	        }
	        if (xml.hasChildNodes()) {
	            for (var i = 0; i < xml.childNodes.length; i++) {
	                var item = xml.childNodes.item(i);
	                var nodeName = item.nodeName;
	                if (typeof (js_obj[nodeName]) == "undefined") {
	                    js_obj[nodeName] = setJsonObj(item);
	                } else {
	                    if (typeof (js_obj[nodeName].push) == "undefined") {
	                        var old = js_obj[nodeName];
	                        js_obj[nodeName] = [];
	                        js_obj[nodeName].push(old);
	                    }
	                    js_obj[nodeName].push(setJsonObj(item));
	                }
	            }
	        }
	        return js_obj;
	    }

        // receives XML DOM object, returns converted JSON object
	    var setJsonObj = function (xml) {
	        var js_obj = {};
	        if (xml.nodeType == 1) {
	            if (xml.attributes.length > 0) {
	                js_obj["attributes"] = {};
	                for (var j = 0; j < xml.attributes.length; j++) {
	                    var attribute = xml.attributes.item(j);
	                    js_obj["attributes"][attribute.nodeName] = attribute.value;
	                }
	            }
	        } else if (xml.nodeType == 3) {
	            js_obj = xml.nodeValue;
	        }
	        if (xml.hasChildNodes()) {
	            for (var i = 0; i < xml.childNodes.length; i++) {
	                var item = xml.childNodes.item(i);
	                var nodeName = item.nodeName;
	                if (typeof (js_obj[nodeName]) == "undefined") {
	                    js_obj[nodeName] = setJsonObj(item);
	                } else {
	                    if (typeof (js_obj[nodeName].push) == "undefined") {
	                        var old = js_obj[nodeName];
	                        js_obj[nodeName] = [];
	                        js_obj[nodeName].push(old);
	                    }
	                    js_obj[nodeName].push(setJsonObj(item));
	                }
	            }
	        }
	        return js_obj;
	    }*/
    }



    return UWA.namespace('DS/ConfiguratorPanel/scripts/Models/FilterExpressionXMLServicesWithDisplayName', FilterExpressionXMLServicesWithDisplayName);
}
);

/*
	FilterExpressionXMLServices.js
	To convert configurator json to xml for binary creation

*/

define('DS/ConfiguratorPanel/scripts/Models/FilterExpressionXMLServices',
[
	'UWA/Core',
	'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables'
],
function (UWA, ConfiguratorVariables) {
		'use strict';
    function FilterExpressionXMLServices(xmlType)
    {
	    var AppRulesParamObj = {};
	    var AppFuncObj =  {};
	    var DictionaryObj = {};
	    var ConfigCriteriaObj =  {};
	    var XML_FILE_TYPE = {};
	    var EvolutionCriteriaObj = {};
	    var ModelVersionInfoObj = {};
	    var FILTER_SELECTION_MODE = '';
	    var listOfRejectedOptionsForEachSingleFeature = {};     //XF3
	    var listOfRejectedOptionsStateForEachSingleFeature = {};     //XF3
		var listOfRejectedOptionsDNForEachSingleFeature = {};
			var includeDisplayName = true;

	    var XML_TAG_NAMES = {
		    FilterSelection : 'FilterSelection',
		    Context : 'Context',
		    CfgFilterExpression : 'CfgFilterExpression',
		    Feature : 'Feature'
	    };

	    var ATTR_VALUE_MAP = {
		    selectionMode	 : "SelectionMode",
		    selectionMode_Build: "Strict",
		    selectionMode_Refine: "150%"

	    };
	    var ATTRNAMES = ['selectionMode'];
	    var CONFIGURATOR_FIELDS = {
		    ConfigurationCriteria :'configurationCriteria',
		    ApplicationState :'applicationState',
		    AppRulesParam : 'app_RulesParam',
		    AppFunc : 'app_Func',
		    Dictionary : 'dictionary',
		    Rules:'rules',
		    EvolutionCriteria: 'evolutionCriteria',
	        ModelVersionInfo:'modelVersionInfo'
	    };

	    var XML_DECLARE = {
		    Schema : "xmlns:xs",
		    Namespace : "xmlns",
		    SchemaLocation : "xs:schemaLocation"
	    };

	    var FILTER_EXPRESSION = {
		    ROOT : "CfgFilterExpression",
		    TAG1 : "FilterSelection",
		    Schema: "http://www.w3.org/2001/XMLSchema-instance",
		    Namespace : "urn:com:dassault_systemes:config",
		    SchemaLocation : "urn:com:dassault_systemes:config CfgFilterExpression.xsd"
	    };
	    initXMLType();
	    function initXMLType(){
		    if(xmlType == 'FilterExpression')
			    XML_FILE_TYPE = FILTER_EXPRESSION;
	    }
	    function initParamObjects(jsonObj)
	    {
		    AppRulesParamObj = jsonObj[CONFIGURATOR_FIELDS.AppRulesParam];
		    AppFuncObj =  jsonObj[CONFIGURATOR_FIELDS.AppFunc];
		    DictionaryObj = jsonObj[CONFIGURATOR_FIELDS.Dictionary];
		    ConfigCriteriaObj =  jsonObj[CONFIGURATOR_FIELDS.ConfigurationCriteria];
		    EvolutionCriteriaObj = jsonObj[CONFIGURATOR_FIELDS.EvolutionCriteria];
		    FILTER_SELECTION_MODE = AppRulesParamObj['selectionMode'];
		    ModelVersionInfoObj = jsonObj[CONFIGURATOR_FIELDS.ModelVersionInfo];
				includeDisplayName = jsonObj.includeDisplayName;
	    }

	    function getXMLDeclaration()
	    {
		    var initXml = '<?xml version="1.0" encoding="UTF-8"?>';
		    var attrList = [];
		    for(var elem in XML_DECLARE)
		    {
			    attrList.push(elem);
		    }
		    initXml += "<"+ XML_FILE_TYPE.ROOT;
		    if(attrList!=null) {
			    for(var item = 0; item < attrList.length; item++) {
				    var key = attrList[item];
				    var attrName = XML_DECLARE[key];
				    var attrVal = FILTER_EXPRESSION[key];
				    //attrVal=escapeXmlChars(attrVal);
				    initXml+=" "+attrName+"='"+attrVal+"'";
			    }
		    }
		    initXml+=">";
		    return initXml;
	    }

	    function jsonXmlElemCount () {
		    var elementsCnt = 0;
		    for( var it in ConfigCriteriaObj  ) {
			    if(ConfigCriteriaObj[it] instanceof Object)
			    {
			        if (ConfigCriteriaObj[it].State == ConfiguratorVariables.Chosen || ConfigCriteriaObj[it].State == ConfiguratorVariables.Required || ConfigCriteriaObj[it].State == ConfiguratorVariables.Default || ConfigCriteriaObj[it].State == ConfiguratorVariables.Selected ||
					    ConfigCriteriaObj[it].State == ConfiguratorVariables.Dismissed || ConfigCriteriaObj[it].State == ConfiguratorVariables.Incompatible)
						    elementsCnt++;
				    }
			    }

		    return elementsCnt;
	    }
	    function addAttributes(rulesParamObj,element, attrList, closed) {
		    var resultStr = "<"+ element;
				var attrVal;
		    if(attrList!=null) {
			    for(var aidx = 0; aidx < attrList.length; aidx++) {
				    var attrName = attrList[aidx];
				    if(ATTR_VALUE_MAP[attrName] != undefined)
				    {
					    var tAttrName = ATTR_VALUE_MAP[attrName];
					    attrVal = ATTR_VALUE_MAP[rulesParamObj[attrName]];
					    attrVal=escapeXmlChars(attrVal);
					    resultStr+=" "+tAttrName+"='"+attrVal+"'";

				    }else
				    {
					    attrVal = rulesParamObj[attrName];
					    attrVal=escapeXmlChars(attrVal);
					    resultStr+=" "+attrName+"='"+attrVal+"'";
				    }

			    }
		    }
		    if(!closed)
			    resultStr+=">";
		    else
			    resultStr+="/>";
		    return resultStr;
	    }

	    function endTag(elementName) {
		    return "</"+ elementName+">";
	    }

	    function escapeXmlChars(str) {
	    if(typeof(str) == "string")
		    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
	    else
		    return str;
	    }

        //XF3 : If selection and reject are present in the same feature, we cannot add the reject in the XML or it will lead to XML parsing issues
	    /*function checkIfSelectionIsPresentInSameFeature(optionId) {
	        var config_features = DictionaryObj.features;
	        for (var itx in config_features) {
	            var cfElem = config_features[itx];
	            var coElem = cfElem['options'];
	            var optionFound = false;

	            if (coElem instanceof Object) {
	                for (var itr in coElem) {
	                    var coid = coElem[itr].ruleId;

	                    if (coid != undefined && coid.toString().trim() == optionId) {
	                        optionFound = true;
	                        break;
	                    }
	                }

	                if (optionFound) {
	                    for (var itr in coElem) {
	                        var coid = coElem[itr].ruleId;

	                        if (coid != undefined) {
	                            for (var it in ConfigCriteriaObj) {
	                                if (ConfigCriteriaObj[it] instanceof Object) {
	                                    var criteriaId = ConfigCriteriaObj[it].Id;
	                                    var state = ConfigCriteriaObj[it].State;

	                                    if (criteriaId == coid && (state == ConfiguratorVariables.Chosen || state == ConfiguratorVariables.Required || state == ConfiguratorVariables.Default || ConfigCriteriaObj[it].State == ConfiguratorVariables.Selected)) {
	                                        return true;
	                                    }
	                                }
	                            }
	                        }
	                    }
	                    break;
	                }
	            }
	        }
	        return false;
	    }*/


	    /*function checkLevelOfSelectionsInFeature(optionId) {
	        var selectionLevel = 'NoSelection';
	        var config_features = DictionaryObj.features;

	        for (var itx in config_features) {
	            var cfElem = config_features[itx];
	            var coElem = cfElem['options'];
	            var optionFound = false;

	            if (coElem instanceof Object) {
	                for (var itr in coElem) {
	                    var coid = coElem[itr].ruleId;

	                    if (coid != undefined && coid.toString().trim() == optionId) {
	                        optionFound = true;
	                        break;
	                    }
	                }

	                if (optionFound) {
	                    for (var itr in coElem) {
	                        var coid = coElem[itr].ruleId;

	                        if (coid != undefined) {
	                            for (var it in ConfigCriteriaObj) {
	                                if (ConfigCriteriaObj[it] instanceof Object) {
	                                    var criteriaId = ConfigCriteriaObj[it].Id;
	                                    var state = ConfigCriteriaObj[it].State;

	                                    if (criteriaId == coid) {
	                                        if (state == ConfiguratorVariables.Chosen) {
	                                            if (selectionLevel == 'NoSelection' || selectionLevel == 'ruleSelection') {
	                                                selectionLevel = 'userSelection';
	                                            }
	                                            else if (selectionLevel == 'userReject' || selectionLevel == 'userRejectAndRuleSelection') {
	                                                selectionLevel = 'userSelectionAndUserReject';
	                                            }
	                                            else if (selectionLevel == 'ruleReject' || selectionLevel == 'ruleSelectionAndRuleReject') {
	                                                selectionLevel = 'userSelectionAndRuleReject';
	                                            }
	                                        }
	                                        else if (state == ConfiguratorVariables.Required || state == ConfiguratorVariables.Default || state == ConfiguratorVariables.Selected) {
	                                            if (selectionLevel == 'NoSelection') {
	                                                selectionLevel = 'ruleSelection';
	                                            }
	                                            else if (selectionLevel == 'userReject') {
	                                                selectionLevel = 'userRejectAndRuleSelection';
	                                            }
	                                            else if (selectionLevel == 'ruleReject') {
	                                                selectionLevel = 'ruleSelectionAndRuleReject';
	                                            }
	                                        }
	                                        else if (state == ConfiguratorVariables.Dismissed) {
	                                            if (selectionLevel == 'NoSelection' || selectionLevel == 'ruleReject') {
	                                                selectionLevel = 'userReject';
	                                            }
	                                            else if (selectionLevel == 'userSelection' || selectionLevel == 'userSelectionAndRuleReject') {
	                                                selectionLevel = 'userSelectionAndUserReject';
	                                            }
	                                            else if (selectionLevel == 'ruleSelection' || selectionLevel == 'ruleSelectionAndRuleReject') {
	                                                selectionLevel = 'userRejectAndRuleSelection';
	                                            }
	                                        }
	                                        else if (state == ConfiguratorVariables.Incompatible) {
	                                            if (selectionLevel == 'NoSelection') {
	                                                selectionLevel = 'ruleReject';
	                                            }
	                                            else if (selectionLevel == 'userSelection') {
	                                                selectionLevel = 'userSelectionAndRuleReject';
	                                            }
	                                            else if (selectionLevel == 'ruleSelection') {
	                                                selectionLevel = 'ruleSelectionAndRuleReject';
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                    break;
	                }
	            }
	        }
	        return selectionLevel;
	    }
*/

        //End XF3

	    function generateFilterXML (options){
		    var result = "";
		    result += getXMLDeclaration();
		    result += addAttributes(AppRulesParamObj,XML_FILE_TYPE.TAG1,ATTRNAMES,false);
		    var elementsCnt = jsonXmlElemCount();

	        if (ModelVersionInfoObj != undefined)
		        result += getProdStateXML();

				var isStrictMode = false;
				if(AppRulesParamObj.selectionMode === ConfiguratorVariables.selectionMode_Build) {
					isStrictMode = true;
				}
		    if (elementsCnt > 0) {
//		        result += addContext(DictionaryObj.model.label); // Removing optional context because it does not support empty selection (temporary?)
		        //if (EvolutionCriteriaObj != undefined)
		          //  result += getProdStateXML();
				  options.configModel._dictionaryJson.features.forEach(feature => {
					  if(options.configModel.getFeatureSelectionMode(feature) === 'Dismiss' && options.configModel.hasDismissedOptions(feature, true)) {						
						result += addFeatureOptions(feature, options.configModel, true);						
					  }else if( options.configModel.hasChosenOptions(feature, true))  {
						result += addFeatureOptions(feature, options.configModel, false);
					  }
					/*if (state == ConfiguratorVariables.Chosen || state == ConfiguratorVariables.Required || state == ConfiguratorVariables.Default || ConfigCriteriaObj[it].State == ConfiguratorVariables.Selected) {
						result += addFeatureOption(criteriaId, false, state);
					} else if (!isStrictMode && (state == ConfiguratorVariables.Dismissed || state == ConfiguratorVariables.Incompatible)) { // not adding rejected values in strict mode
										if(options && options.configModel){
											var featureID = options.configModel.getFeatureIdWithOptionId(criteriaId);
											if(featureID && options.configModel.getFeatureSelectionMode(featureID) === 'Dismiss'){													
												result += addFeatureOption(criteriaId, true, state);													
											}
										}
					}*/

				  });
		       /* for (var it in ConfigCriteriaObj) {
		            if (ConfigCriteriaObj[it] instanceof Object) {
		                var criteriaId = ConfigCriteriaObj[it].Id;
		                var state = ConfigCriteriaObj[it].State;

		                /*if (state == ConfiguratorVariables.Chosen || state == ConfiguratorVariables.Required || state == ConfiguratorVariables.Default || ConfigCriteriaObj[it].State == ConfiguratorVariables.Selected) {
		                    result += addFeatureOption(criteriaId, false, state);
		                } else if (state == ConfiguratorVariables.Dismissed || state == ConfiguratorVariables.Incompatible) {
		                    if (!checkIfSelectionIsPresentInSameFeature(criteriaId)) {
		                        result += addFeatureOption(criteriaId, true, state);
		                    }
		                }

						if (state == ConfiguratorVariables.Chosen || state == ConfiguratorVariables.Required || state == ConfiguratorVariables.Default || ConfigCriteriaObj[it].State == ConfiguratorVariables.Selected) {
		                        result += addFeatureOption(criteriaId, false, state);
		                } else if (!isStrictMode && (state == ConfiguratorVariables.Dismissed || state == ConfiguratorVariables.Incompatible)) { // not adding rejected values in strict mode
											if(options && options.configModel){
												var featureID = options.configModel.getFeatureIdWithOptionId(criteriaId);
												if(featureID && options.configModel.getFeatureSelectionMode(featureID) === 'Dismiss'){													
													result += addFeatureOption(criteriaId, true, state);													
												}
											}
		                }

		                // var selectionlevel = checkLevelOfSelectionsInFeature(criteriaId);
										//
		                // if (state == ConfiguratorVariables.Chosen || state == ConfiguratorVariables.Required || state == ConfiguratorVariables.Default || ConfigCriteriaObj[it].State == ConfiguratorVariables.Selected) {
		                //     if (selectionlevel == 'userSelection' || selectionlevel == 'userSelectionAndUserReject' || selectionlevel == 'userSelectionAndRuleReject' || selectionlevel == 'ruleSelection' || selectionlevel == 'ruleSelectionAndRuleReject' || selectionlevel == 'userRejectAndRuleSelection') {
		                //         result += addFeatureOption(criteriaId, false, state);
		                //     }
		                // } else if (state == ConfiguratorVariables.Dismissed || state == ConfiguratorVariables.Incompatible) {
		                //     if (selectionlevel == 'userReject' || selectionlevel == 'ruleReject') {
		                //         result += addFeatureOption(criteriaId, true, state);
		                // }
		                // }
		            }*/
		        }
//		        result += endTag('Context');
		    

		    var empty = true;

		    for (var prop in listOfRejectedOptionsForEachSingleFeature) {
		        if (listOfRejectedOptionsForEachSingleFeature.hasOwnProperty(prop))
		            empty = false;
		    }

		    if (!empty)
		        result += addListOfRejectedOptionsForSingleFeaturesInTheXML();

			    result += endTag(XML_FILE_TYPE.TAG1);
			    result += endTag(XML_FILE_TYPE.ROOT);
			    return result;

	    }
	    function getProdStateXML()
	    {
	        var prodStateXml = '';

	        if (ModelVersionInfoObj.modelName && ModelVersionInfoObj.modelVersionName && ModelVersionInfoObj.modelVersionRevision) {
	            var prodName = ModelVersionInfoObj.modelVersionName;
	            var prodRevsion = ModelVersionInfoObj.modelVersionRevision;
	            var modelName = ModelVersionInfoObj.modelName;

	            prodStateXml += '<TreeSeries Type="ProductState" Name="' + escapeXmlChars(modelName) + '">';
	            prodStateXml += '<Single Name="' + escapeXmlChars(prodName) + '" Revision="' + escapeXmlChars(prodRevsion) + '" />';
	            prodStateXml += '</TreeSeries>';
	        }

		    return prodStateXml;
	    }

        //XF3
	    function addOptionToTheListOfRejectedOptionsForSingleFeatures(cfid, coName, coDisplayName, optionState) {
	        if (listOfRejectedOptionsForEachSingleFeature[cfid] == undefined)
	            listOfRejectedOptionsForEachSingleFeature[cfid] = [];

	        if (listOfRejectedOptionsStateForEachSingleFeature[cfid] == undefined)
	            listOfRejectedOptionsStateForEachSingleFeature[cfid] = [];

			if (listOfRejectedOptionsDNForEachSingleFeature[cfid] == undefined)
	            listOfRejectedOptionsDNForEachSingleFeature[cfid] = [];


	        listOfRejectedOptionsForEachSingleFeature[cfid].push(coName);
			listOfRejectedOptionsDNForEachSingleFeature[cfid].push(coDisplayName);
	        listOfRejectedOptionsStateForEachSingleFeature[cfid].push(optionState);
	    }


	    function addListOfRejectedOptionsForSingleFeaturesInTheXML(){
	        var resXml='';

	        for (var itr in listOfRejectedOptionsForEachSingleFeature) {

	            var config_features = DictionaryObj.features;
	            for (var itx in config_features) {
	                var cfid = config_features[itx].ruleId;
	                if (cfid != undefined && cfid.toString().trim() == itr) {
	                    var cfName = config_features[itx].name;
											var cfDisplayName = config_features[itx].displayName;
	                    resXml += "<NOT>";
	                    resXml += featureTag(cfName, cfDisplayName, false, false);
	                    for (var i = 0; i < listOfRejectedOptionsForEachSingleFeature[itr].length; i++) {
	                        var coName = listOfRejectedOptionsForEachSingleFeature[itr][i];
	                        var coDisplayName = listOfRejectedOptionsDNForEachSingleFeature[itr][i];
	                        var optionState = listOfRejectedOptionsStateForEachSingleFeature[itr][i];
	                        resXml += featureTag(coName, coDisplayName, true, true, optionState);
	                    }
	                    resXml += endTag('Feature');
	                    resXml += endTag('NOT');

	                    break;
	                }

	            }

	        }

            return resXml;
	    }

        //End XF3

	    function addFeatureOptions(Feature, configModel, isRejected)
	    {
		    var resXml = "";		    
			var cfName = Feature.name;
			var cfDisplayName = Feature.displayName;
			if(isRejected) {
				resXml += "<NOT>";				
			}
			resXml += featureTag(cfName,cfDisplayName, false, false);

		    Feature.options.forEach( (coElem) => 
		    {
			    var coName = coElem.name;
				var coDisplayName = coElem.displayName;
				var coState = configModel.getStateWithId(coElem.ruleId);
				if(coName != undefined && coName != null)
				{
					//R14: need to change with constants
					if (isRejected && ( coState === 'Dismissed' || coState === 'Incompatible' ) 
						|| !isRejected && (coState === 'Required' || coState === 'Chosen' || coState === 'Selected'  || coState === 'Default') ) {
						// if (cfElem.selectionType == "Multiple") {       //XF3

							resXml += featureTag(coName, coDisplayName, true, true, coState);
						/* }                                               //XF3
						else {                                          //XF3
							addOptionToTheListOfRejectedOptionsForSingleFeatures(cfElem.ruleId, coName, coDisplayName, optionState);
							return resXml;                              //XF3
						}                                               //XF3*/
					}
					
				    
		      }
	       });
		   resXml += endTag('Feature');
		   if(isRejected) {
			resXml += endTag('NOT');
		   }

	    return resXml;
	    }


	    function featureTag(elemName, elemDisplayName, closed, addSelectedByAttribut, optionState){
	     var resXml = '';

	     resXml += '<Feature Type="ConfigFeature" Name="' + escapeXmlChars(elemName) + '"';
			 if(includeDisplayName) {
				 resXml += ' DisplayName="' + escapeXmlChars(elemDisplayName) + '"';
			 }

	     if (addSelectedByAttribut && optionState) {

	         if (optionState == ConfiguratorVariables.Default)
                 resXml += ' SelectedBy="Default"';
	         else if (optionState == ConfiguratorVariables.Required || optionState == ConfiguratorVariables.Incompatible)
                 resXml += ' SelectedBy="Rule"';
             else
                 resXml += ' SelectedBy="User"';

	     }

	     if(!closed)
		    resXml+=">";
	     else
		    resXml+="/>";
	     return resXml;
	    }

	    this.json2xml_str =  function (jsonobj){
		    initParamObjects(jsonobj);
		    return generateFilterXML(jsonobj);
	    };

        /*
	    this.parseXml = function(xml) {
	        var dom = null;
	        if (window.DOMParser) {
	            try {
	                dom = (new DOMParser()).parseFromString(xml, "text/xml");
	            }
	            catch (e) { dom = null; }
	        }
	        else if (window.ActiveXObject) {
	            try {
	                dom = new ActiveXObject('Microsoft.XMLDOM');
	                dom.async = false;
	                if (!dom.loadXML(xml)) // parse error ..

	                    window.alert(dom.parseError.reason + dom.parseError.srcText);
	            }
	            catch (e) { dom = null; }
	        }
	        else
	            alert("cannot parse xml string!");
	        return dom;
	    }



        // Changes XML to JSON
	    this.xmlToJson = function(xml) {

	        var js_obj = {};
	        if (xml.nodeType == 1) {
	            if (xml.attributes.length > 0) {
	                js_obj["attributes"] = {};
	                for (var j = 0; j < xml.attributes.length; j++) {
	                    var attribute = xml.attributes.item(j);
	                    js_obj["attributes"][attribute.nodeName] = attribute.value;
	                }
	            }
	        } else if (xml.nodeType == 3) {
	            js_obj = xml.nodeValue;
	        }
	        if (xml.hasChildNodes()) {
	            for (var i = 0; i < xml.childNodes.length; i++) {
	                var item = xml.childNodes.item(i);
	                var nodeName = item.nodeName;
	                if (typeof (js_obj[nodeName]) == "undefined") {
	                    js_obj[nodeName] = setJsonObj(item);
	                } else {
	                    if (typeof (js_obj[nodeName].push) == "undefined") {
	                        var old = js_obj[nodeName];
	                        js_obj[nodeName] = [];
	                        js_obj[nodeName].push(old);
	                    }
	                    js_obj[nodeName].push(setJsonObj(item));
	                }
	            }
	        }
	        return js_obj;
	    }

        // receives XML DOM object, returns converted JSON object
	    var setJsonObj = function (xml) {
	        var js_obj = {};
	        if (xml.nodeType == 1) {
	            if (xml.attributes.length > 0) {
	                js_obj["attributes"] = {};
	                for (var j = 0; j < xml.attributes.length; j++) {
	                    var attribute = xml.attributes.item(j);
	                    js_obj["attributes"][attribute.nodeName] = attribute.value;
	                }
	            }
	        } else if (xml.nodeType == 3) {
	            js_obj = xml.nodeValue;
	        }
	        if (xml.hasChildNodes()) {
	            for (var i = 0; i < xml.childNodes.length; i++) {
	                var item = xml.childNodes.item(i);
	                var nodeName = item.nodeName;
	                if (typeof (js_obj[nodeName]) == "undefined") {
	                    js_obj[nodeName] = setJsonObj(item);
	                } else {
	                    if (typeof (js_obj[nodeName].push) == "undefined") {
	                        var old = js_obj[nodeName];
	                        js_obj[nodeName] = [];
	                        js_obj[nodeName].push(old);
	                    }
	                    js_obj[nodeName].push(setJsonObj(item));
	                }
	            }
	        }
	        return js_obj;
	    }*/
    }



    return UWA.namespace('DS/ConfiguratorPanel/scripts/Models/FilterExpressionXMLServices', FilterExpressionXMLServices);
}
);

/*jshint esversion: 6 */
define(
		'DS/ConfiguratorPanel/scripts/Models/ConfiguratorModel',
		[
			'UWA/Core',
			'UWA/Controls/Abstract',
			'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
			'DS/ConfiguratorPanel/scripts/Models/FilterExpressionXMLServices',
			'DS/ConfiguratorPanel/scripts/Models/FilterExpressionXMLServicesWithDisplayName',
			'DS/ConfiguratorPanel/scripts/Utilities',
			'DS/Utilities/Utils'
			],
			function (UWA, Abstract, ConfiguratorVariables, FilterExpressionXMLServices, FilterExpressionXMLServicesWithDisplayName, Utilities, Utils) {

			'use strict';

			/* refactor */
			function _unselectCriteria ( model, feature, criteria, min, newState,excludedTypes) {
				var hasUnSelected = false;
				var unselect = function (feature) {
					if( UWA.is(feature,'object')) {
						var selectedoptions = feature.options.filter( option => criteria.filter( crit => option.ruleId === crit.Id).length > 0);
						if(selectedoptions.length >= min ) {
							hasUnSelected = true;
							if(UWA.is(newState)) {
								selectedoptions.forEach(function(option) {
									model.setStateWithId(option.ruleId, newState);
								});
							}

						}
					}
				};

				if(UWA.is(feature)) {
					unselect(feature);
				}else if(UWA.is(model.getDictionary().features, 'array')) {
					// UWA.Json.path: use query to selected options id
					model.getDictionary().features.forEach(function(feature){
						if(excludedTypes && excludedTypes.length > 0 && excludedTypes.indexOf(feature.type) != -1){
								return;
						}
							unselect(feature);
					});
				}

				return hasUnSelected;
			};

			function _checkCriteriaState(model, feature, includeStates, excludeStates, min) {
				var hasIncluded = false;
				var hasExluded = false;
				if(UWA.is(feature,'object')) {
					var selectedoptions = feature.options;
					var count = 0;
					feature.options.forEach(function(option) {
						var state = model._cacheIdWithState[option.ruleId];
						if(includeStates.indexOf(state) > -1) {
							count++;
						}else if(excludeStates.indexOf(state) > -1) {
							hasExluded = true;
						}
					});
					if(count >= min) {
						hasIncluded = true;
					}
				}
				return hasIncluded && !hasExluded;
			};

			var ConfiguratorModel = Abstract.extend({
				// Members
				_appFunc : {
					multiSelection: ConfiguratorVariables.str_yes,
					selectionMode_Build: ConfiguratorVariables.str_yes,
					selectionMode_Refine:	ConfiguratorVariables.str_yes,
					rulesMode_ProposeOptimizedConfiguration:	ConfiguratorVariables.str_no,
					rulesMode_SelectCompleteConfiguration:	ConfiguratorVariables.str_no,
					rulesMode_EnforceRequiredOptions:	ConfiguratorVariables.str_yes,
					rulesMode_DisableIncompatibleOptions:	ConfiguratorVariables.str_yes
				},

				_appRulesParams : {
					multiSelection: ConfiguratorVariables.str_false,
					selectionMode: ConfiguratorVariables.selectionMode_Build,
					rulesMode: ConfiguratorVariables.RulesMode_EnforceRequiredOptions,
					rulesActivation: ConfiguratorVariables.str_true,
					completenessStatus: ConfiguratorVariables.Unknown,
					rulesCompliancyStatus: ConfiguratorVariables.Unknown
				},

				_dictionaryJson : '',   //contain all datas (features, options, attributs...)
				_dictionaryWithRules : true, // check for the dictionary if it contains rules along with variants,options..
				_configurationCriteria : [],
				_parameterCriteria : [],
				_tempconfigurationCriteria : [],
				_variantVisibilty : [],

				_allVariants :0,
				_mustSelectFeatureNumber : 0,
				_unSelectFeatureNumber : 0,
				_conflictingFeaturesNumber : 0,
				_rulesDeductionFeatureNumber : 0,

				_listOfListOfConflictingImpliedRules : [],
				_listOfRefineSelectionMode : {},
				_listOfListOfConflictingIds : [],
				_defaults : [],
				_defaultFromDico : [],
				_rulesConsistency : true,

				_cacheIdWithState : {},
				_cachePreviousCriteria : {},
				_cacheSolveCriteria : {},
				_cacheIdWithValue : {},
				_cacheUpdateView : {},
				_cacheUpdateViewOption : {},
				_cacheUIUpdated : {},
				_cacheRuleIdWithName : {},
				_tempcacheIdWithState : {},
				_cacheIdWithPrice : {},
				_cacheValidate : {},
				_totalPrice : '0.0',
				_cacheFeatures: null,
				_cacheOption: null,

				_cacheOptionIdWithFeatureId : {},
				_cacheFeatureIdWithMandStatus : {},
				_cacheFeatureIdWithChosenStatus : {},
				_cacheFeatureIdWithStatus: {},
				_cacheFeatureIdWithRulesStatus :{},
				_cacheFeatureIdWithUserSelection:{},
				_cacheSelectionID:{},
				_modelEvents: null,
				_readOnly: false,
				_isSearchActive : false,
				_enableValidation : false,
				_initialLoadStatus : false,
				_initialLoad:[],
				_BuildModeCriteria: [],
        		_modelVersionInfo: {},
				_pcId : "",
				_variantWithSelection : [],
				_variantForDiagnosis : "",
				_configCriteriaUpdated : false,
				_dignosedVariant : [],
				_withDiagnosis : true,
				_defaultComputationTimeout : 5,
				_useAsyncRuleLoad: false,
				_featureLevelSelectionMode : [],
				/**
				 * @description
				 * <blockquote>
				 * <p>Initialize the ConfiguratorModel with some options</p>
				 * </blockquote>
				 *
				 * @memberof module:DS/ENOXConfiguratorUX/ConfiguratorPanel#
				 *
				 * @param {Object} options - Available options.
				 * @param {Object} options.appFunc - JSON that shows what is allowed on the panel
				 * @param {Object} options.appRulesParams - JSON to initialize the panel
				 * @param {Object} options.configuration - JSON of a configuration
				 * @param {Object} options.modelEvents
				 *
				 */
				init: function (options) {
					var that = this;

					this._dictionaryJson = '';   //contain all datas (features, options, attributs...)
					this._configurationCriteria = [];
					this._parameterCriteria = [];
					this._tempconfigurationCriteria = [];
					this._variantVisibilty = [];
					this._allConfigCriteria = [];

					this._allVariants =0;
					this._mustSelectFeatureNumber = 0;
					this._unSelectFeatureNumber = 0;
					this._conflictingFeaturesNumber = 0;
					this._rulesDeductionFeatureNumber = 0;

					this._listOfListOfConflictingImpliedRules = [];
					this._listOfRefineSelectionMode = {};
					this._listOfListOfConflictingIds = [];
					this._defaults = [];
					this._defaultFromDico = [];
					this._rulesConsistency = true;

					this._cacheIdWithState = {};
					this._cachePreviousCriteria = {};
					this._cacheSolveCriteria = {};
					this._cacheIdWithValue = {};
					this._cacheUpdateView = {};
					this._cacheUpdateViewOption = {};
					this._cacheUIUpdated = {};
					this._cacheRuleIdWithName = {};
					this._tempcacheIdWithState = {};
					this._cacheIdWithPrice = {};
					this._cacheValidate = {};
					this._totalPrice = '0.0';
					this._cacheFeatures= null;
					this._cacheOption= null;

					this._cacheOptionIdWithFeatureId = {};
					this._cacheFeatureIdWithMandStatus = {};
					this._cacheFeatureIdWithChosenStatus = {};
					this._cacheFeatureIdWithStatus= {};
					this._cacheFeatureIdWithRulesStatus ={};
					this._cacheFeatureIdWithUserSelection={};
					this._cacheSelectionID={};
					this._modelEvents= null;
					this._readOnly= false;
					this._isSearchActive = false;
					this._enableValidation = false;
					this._initialLoadStatus = false;
					this._initialLoad=[];
					this._BuildModeCriteria= [];
					this._modelVersionInfo= {};
					this._pcId = "";
					this._variantWithSelection = [];
					this._firstSelection = false;
					this._resetFirstSelection = false;
					this._variantForDiagnosis = "";
					this._configCriteriaUpdated = false;
					this._dignosedVariant = [];
					this._withDiagnosis = true;


					//TODO : initialize appFunc and appRulesParams with the ones given as parameters

					if(options.appFunc) {
						if(options.appFunc.multiSelection)
							this._appFunc.multiSelection = options.appFunc.multiSelection;
						if(options.appFunc.selectionMode_Build)
							this._appFunc.selectionMode_Build = options.appFunc.selectionMode_Build;
						if(options.appFunc.selectionMode_Refine)
							this._appFunc.selectionMode_Refine = options.appFunc.selectionMode_Refine;
						if(options.appFunc.rulesMode_ProposeOptimizedConfiguration)
							this._appFunc.rulesMode_ProposeOptimizedConfiguration = options.appFunc.rulesMode_ProposeOptimizedConfiguration;
						if(options.appFunc.rulesMode_SelectCompleteConfiguration)
							this._appFunc.rulesMode_SelectCompleteConfiguration = options.appFunc.rulesMode_SelectCompleteConfiguration;
						if(options.appFunc.rulesMode_EnforceRequiredOptions)
							this._appFunc.rulesMode_EnforceRequiredOptions = options.appFunc.rulesMode_EnforceRequiredOptions;
						if(options.appFunc.rulesMode_DisableIncompatibleOptions)
							this._appFunc.rulesMode_DisableIncompatibleOptions = options.appFunc.rulesMode_DisableIncompatibleOptions;
					}
					if(options.appRulesParams){
						if(options.appRulesParams.multiSelection)
							this._appRulesParams.multiSelection = options.appRulesParams.multiSelection;
						if(options.appRulesParams.selectionMode)
							this._appRulesParams.selectionMode = options.appRulesParams.selectionMode;
						if(options.appRulesParams.rulesMode)
							this._appRulesParams.rulesMode = options.appRulesParams.rulesMode;
						if(options.appRulesParams.rulesActivation)
							this._appRulesParams.rulesActivation = options.appRulesParams.rulesActivation;
						if(options.appRulesParams.completenessStatus)
							this._appRulesParams.completenessStatus = options.appRulesParams.completenessStatus;
							else{
								this._appRulesParams.completenessStatus = "Partial";
							}
						if(options.appRulesParams.rulesCompliancyStatus)
							this._appRulesParams.rulesCompliancyStatus = options.appRulesParams.rulesCompliancyStatus;
					}
					if (options.modelEvents)
						this._modelEvents = options.modelEvents;
					//this.setAppRulesParam(options.appRulesParams);

					if (options.configuration) {
						//Remove all the KeyIn selections from the configuration...
						for (var t = 0; t < options.configuration.length; t++) {
							if (options.configuration[t].Id && options.configuration[t].Id.indexOf("KeyIn_") !== -1) {
								options.configuration.splice(t, 1);
								t--;
							}
						}

						//...Then, set the ConfigCriteria
						this._parameterCriteria = [];
						this.setConfigurationCriteria(Utilities.convertPersistedStatesToStatesInConfigCriteria(options.configuration),"","",true);
					}
					if(options.pcId)
						this._pcId = options.pcId;

					this.setValidationFlag(options.enableValidation);

					if(options.readOnly)
						this.setReadOnlyFlag(options.readOnly);

					if(options.manageDefaultVersion) {
						that._manageDefaultVersion = options.manageDefaultVersion; //'V2'
					}

					if(options.useAsyncRuleLoad) {
						that._useAsyncRuleLoad = options.useAsyncRuleLoad;
					}

				},

				/**
				 * Getters/Setters
				 *
				 */
				getAppFunc: function() {
					return this._appFunc;
				},

				getMultiSelectionState: function () {
					return this._appRulesParams.multiSelection;
				},
				setMultiSelectionState: function (newState) {	//newState needs to be "true" or "false" strings
					this._appRulesParams.multiSelection = newState;
				},

				getAllConfigCriteria : function () {
					return this.getParameterCriteria().concat(this.getConfigurationCriteria());
				},

				getParameterCriteria: function () {
					return this._parameterCriteria;
				},
				resetCriteria: function () {
					this._cacheIdWithState = {};
					this._cacheIdWithValue = {};
				},
				getConfigurationCriteria: function () {
					return this._configurationCriteria;
				},
				getSelectedOptionsJSONModel: function (PCSave) {
					var that = this;
					var JSONModel = [];
					this.getDictionary().features.forEach(function(feature) {

						feature.options.forEach(option => {
							if(UWA.is(that._cacheIdWithState[option.ruleId]) &&
								//Dismiss => save incompatible, dismiss
								(that.getFeatureSelectionMode(feature) === ConfiguratorVariables.feature_SelectionMode_Dismiss &&
									(that._cacheIdWithState[option.ruleId] === ConfiguratorVariables.Incompatible ||
									that._cacheIdWithState[option.ruleId] === ConfiguratorVariables.Dismissed
									)
								) ||
								// R14 IR ??? dismissed are save in dismiss mode !
								//Others => save required, default, selected, chosen
								( !(that.getFeatureSelectionMode(feature) === ConfiguratorVariables.feature_SelectionMode_Dismiss) &&
								    (	that._cacheIdWithState[option.ruleId] === ConfiguratorVariables.Required ||
										that._cacheIdWithState[option.ruleId] === ConfiguratorVariables.Default ||
										that._cacheIdWithState[option.ruleId] === ConfiguratorVariables.Selected ||
										that._cacheIdWithState[option.ruleId] === ConfiguratorVariables.Chosen ||
										that._cacheIdWithState[option.ruleId] === ConfiguratorVariables.Dismissed
									)
								)
							) {
								if(PCSave) {
									JSONModel.push({
										Id: option.ruleId,
										State: that._cacheIdWithState[option.ruleId]
									});
								}else {
									JSONModel.push({
										id: option.ruleId,
										status: that._cacheIdWithState[option.ruleId]
									});
								}

							}
						});

					});

					for (var i = 0; i < this.getParameterCriteria().length; i++) {
						if(this.getParameterCriteria()[i].Value){
							if(PCSave) {
								JSONModel.push({
									Id: this.getParameterCriteria()[i].Id,
									Value: this.getParameterCriteria()[i].Value.toString()
								});
							} else {
								JSONModel.push({
									id: this.getParameterCriteria()[i].Id,
									value: this.getParameterCriteria()[i].Value.toString()
								});
							}

						}
					}
					return JSONModel;
				},
				/* need to refactor getDismissed getChoosen ... */
				getChosenConfigurationCriteria :function(selected){
					var chosenCriteria = [];
					for (var id in this._cacheIdWithState) {
						if (this._cacheIdWithState.hasOwnProperty(id)) {
							if(this._cacheIdWithState[id] === ConfiguratorVariables.Chosen ||
								( selected &&
									(this._cacheIdWithState[id] === ConfiguratorVariables.Selected ||
										this._cacheIdWithState[id] === ConfiguratorVariables.Default ||
										this._cacheIdWithState[id] === ConfiguratorVariables.Required
									)
								)
							){
								chosenCriteria.push({Id : id, State : this._cacheIdWithState[id]});
							}
					  }
					}
					return chosenCriteria;
				},
				/* need to refactor getDismissed getChoosen ... */
				getDismissedConfigurationCriteria : function(incompatible) {
					var dismissedCriteria = [];
					for (var id in this._cacheIdWithState) {
						if (this._cacheIdWithState.hasOwnProperty(id)) {
							if(this._cacheIdWithState[id] === ConfiguratorVariables.Dismissed ||
								(incompatible &&
									this._cacheIdWithState[id] === ConfiguratorVariables.Incompatible
								)
							){
								dismissedCriteria.push({Id : id, State : this._cacheIdWithState[id]});
							}
					  }
					}
					return dismissedCriteria;
				},
				validateConfigurationCriteria : function(newConfigCriteria){
					for (var i = 0; i < newConfigCriteria.length; i++) {
						if(newConfigCriteria[i].state === ConfiguratorVariables.Selected){
							this._cacheIdWithState[newConfigCriteria[i].Id] = ConfiguratorVariables.Chosen;
						}
					}
				},
				setSelectedConfigurationCriteria : function(newConfigCriteria, idsToDiagnose){
					this.setConfigCriteriaUpdated(false);
					if(idsToDiagnose && idsToDiagnose.length > 0){
						for (var i = 0; i < idsToDiagnose.length; i++) {
							if(newConfigCriteria[idsToDiagnose[i]] !== this._allConfigCriteria[idsToDiagnose[i]]){
								this._cacheIdWithState[idsToDiagnose[i]] = newConfigCriteria[idsToDiagnose[i]];
								this._allConfigCriteria[idsToDiagnose[i]] = newConfigCriteria[idsToDiagnose[i]];
								this.setConfigCriteriaUpdated(true);
							}
						}
					}
				},
				isStatusUpdated: function(criteria){
					var updateFlag = false;
					if(this._cacheIdWithState[criteria.Id] !== criteria.State){
						this._cacheIdWithState[criteria.Id] = criteria.State;
						updateFlag = true;
						this.setConfigCriteriaUpdated(true);
					}else if(this.getUpdateRequiredOption(criteria.Id)){
						updateFlag = true;
						this.setConfigCriteriaUpdated(true);
					}
					return updateFlag;
				},
				setConfigurationCriteria: function (newConfigCriteria, answerMethod, IdsToDignose) {
					this._configurationCriteria = [];
					this._allConfigCriteria = [];
					this._variantWithSelection = [];
					for (var i = 0; i < newConfigCriteria.length; i++) {
						var featureID = this.getFeatureIdWithOptionId(newConfigCriteria[i].Id) || newConfigCriteria[i].Id;
						var updateFlag = false;
						if(newConfigCriteria[i].State){
							if(IdsToDignose && IdsToDignose.length > 0){	//"solveAndDiagnose"
								for (var j = 0; j < IdsToDignose.length; j++) {
									if(IdsToDignose[j] === newConfigCriteria[i].Id){
										updateFlag = this.isStatusUpdated(newConfigCriteria[i]);
									}
								}
							}else {	//"solve" OR "solveAndDiagnoseAll"
								updateFlag = this.isStatusUpdated(newConfigCriteria[i]);
								if(this._cacheIdWithState[newConfigCriteria[i].Id] !== "Unselected"){
									updateFlag = true;
								}
							}
							this._allConfigCriteria.push({Id : newConfigCriteria[i].Id, State : this._cacheIdWithState[newConfigCriteria[i].Id]});
							this._configurationCriteria.push({Id : newConfigCriteria[i].Id, State : this._cacheIdWithState[newConfigCriteria[i].Id]});
							this.setUpdateRequiredOption(newConfigCriteria[i].Id,updateFlag);
							if(!this.getUpdateRequired(featureID)){
								this.setUpdateRequired(featureID, updateFlag);
							}
							//patch for getxml : checkLevelOfSelectionsInFeature
							var variantWithSelection = false;
							if(this._allConfigCriteria[i].State === ConfiguratorVariables.Required || this._allConfigCriteria[i].State === ConfiguratorVariables.Chosen || this._allConfigCriteria[i].State === ConfiguratorVariables.Default || this._allConfigCriteria[i].State === ConfiguratorVariables.Selected){
								if(featureID !== this._allConfigCriteria[i].Id){
									variantWithSelection = true;
								}
							}
							if(!this.getVariantWithSelection(featureID)){
								this.setVariantWithSelection(featureID, variantWithSelection);
							}
						}else if (newConfigCriteria[i].Value) {
							this._cacheIdWithValue[newConfigCriteria[i].Id] = newConfigCriteria[i].Value;
							this._allConfigCriteria.push({Id : newConfigCriteria[i].Id, State : this._cacheIdWithValue[newConfigCriteria[i].Id]});
							if(!this._cacheIdWithValue[newConfigCriteria[i].Id]){
								this._parameterCriteria.push(newConfigCriteria[i]);
							 }
						}
					}
					this._cachePreviousCriteria = this._cacheIdWithState;
					if(answerMethod === "solve"){
					 this._cacheSolveCriteria = JSON.parse(JSON.stringify(this._cacheIdWithState));
					}
				},
				setConfigurationCriteria1: function (newConfigCriteria, answerMethod) {
					var _previousCriteria = JSON.parse(JSON.stringify(this._cachePreviousCriteria));
					var _isCriteriaSame = false;
					if(answerMethod === "solveAndDiagnose" && JSON.stringify(this._allConfigCriteria) === JSON.stringify(newConfigCriteria)){
						_isCriteriaSame = true;
						this.setConfigCriteriaUpdated(false);
					}
					this._allConfigCriteria = JSON.parse(JSON.stringify(newConfigCriteria));
					this._configurationCriteria = [];
					this._featureUpdateView = [];
					this._variantWithSelection = [];

					// this._parameterCriteria = []; //Add it here when solver will handle parameters
					for (var i = 0; i < this._allConfigCriteria.length; i++) {
						var _isVariantStatusUpdatedFlag = false;
						if(this._allConfigCriteria[i].State){
							// to be restuctured:
							if(answerMethod === "solveAndDiagnose"){
								if(this._allConfigCriteria[i].State !== this._cacheIdWithState[this._allConfigCriteria[i].Id]){
									if((this._allConfigCriteria[i].State === ConfiguratorVariables.Selected && this._cacheIdWithState[this._allConfigCriteria[i].Id] === ConfiguratorVariables.Required) ||
											(this._allConfigCriteria[i].State === ConfiguratorVariables.Unselected && this._cacheIdWithState[this._allConfigCriteria[i].Id] === ConfiguratorVariables.Incompatible)){
										_isVariantStatusUpdatedFlag = false;
									}else {
										_isVariantStatusUpdatedFlag = true;
									}
								}else{
									_isVariantStatusUpdatedFlag = false;
								}
							}else{
								_isVariantStatusUpdatedFlag = true;
							}
								if(_isVariantStatusUpdatedFlag){
									// this.setConfigCriteriaUpdated(true);
							this._cacheIdWithState[this._allConfigCriteria[i].Id] = this._allConfigCriteria[i].State;
								}else {
									this._allConfigCriteria[i].State = this._cacheIdWithState[this._allConfigCriteria[i].Id];
								}
							this._configurationCriteria.push(this._allConfigCriteria[i]);
								var updateFlag = false;
								var variantWithSelection = false;
								var featureID = this.getFeatureIdWithOptionId(this._allConfigCriteria[i].Id) || this._allConfigCriteria[i].Id;

								//patch for getxml : checkLevelOfSelectionsInFeature
								if(this._allConfigCriteria[i].State === ConfiguratorVariables.Required || this._allConfigCriteria[i].State === ConfiguratorVariables.Chosen || this._allConfigCriteria[i].State === ConfiguratorVariables.Default || this._allConfigCriteria[i].State === ConfiguratorVariables.Selected){
									if(featureID !== this._allConfigCriteria[i].Id){
										variantWithSelection = true;
									}
								}
								if(!this.getVariantWithSelection(featureID)){
									this.setVariantWithSelection(featureID, variantWithSelection);
								}


								if(_previousCriteria && _previousCriteria.hasOwnProperty(this._allConfigCriteria[i].Id)){
									if(this._cacheIdWithState[this._allConfigCriteria[i].Id] !== _previousCriteria[this._allConfigCriteria[i].Id]){
										updateFlag = true;
									}else{
										if(!this.getUIUpdated(this._allConfigCriteria[i].Id)){
											updateFlag = true;
										}
									}
								}else {
									if(this._cacheIdWithState[this._allConfigCriteria[i].Id] !== "Unselected"){
										updateFlag = true;
									}
								}
								this.setUpdateRequiredOption(this._allConfigCriteria[i].Id,updateFlag);
								if(!this.getUpdateRequired(featureID)){
									this.setUpdateRequired(featureID, updateFlag);
								}
						}else if(this._allConfigCriteria[i].Value) {
							this._cacheIdWithValue[this._allConfigCriteria[i].Id] = this._allConfigCriteria[i].Value;
							if(!this._cacheIdWithValue[this._allConfigCriteria[i].Id]){
								this._parameterCriteria.push(this._allConfigCriteria[i]);
						 }
						}
					}
					this._cachePreviousCriteria = this._cacheIdWithState;
					if(answerMethod === "solve"){
					 this._cacheSolveCriteria = JSON.parse(JSON.stringify(this._cacheIdWithState));
					 this.setConfigCriteriaUpdated(true);
				 }else 	if(answerMethod === "solveAndDiagnose"){
					 if(!_isVariantStatusUpdatedFlag)
					 this.setConfigCriteriaUpdated(false);
				 }
				},

				setUIUpdated: function(id, flag){
					this._cacheUIUpdated[id] = flag;
				},
				getUIUpdated: function(id){
					return this._cacheUIUpdated[id];
				},
				setUpdateRequired : function(id, flag){
					this._cacheUpdateView[id] = flag;
				},

				getUpdateRequired : function(id){
					return this._cacheUpdateView[id];
				},
				setUpdateRequiredOption : function(id, flag){
					this._cacheUpdateViewOption[id] = flag;
					if(!flag){
						this.setUIUpdated(id, flag);
					}
				},

				getUpdateRequiredOption : function(id){
					return this._cacheUpdateViewOption[id];
				},
				getSolveConfigurationCriteria : function(){
					return this._cacheSolveCriteria;
				},
				getPCId : function(){
					return this._pcId;
				},

				getConflictingFeatures: function () {
					return this._listOfListOfConflictingIds;
				},
				isAnOption : function(id) {

					if(this._cacheOption == undefined)
					{
						//populate cache first
						this._cacheOption = {};
						var dictionary = this.getDictionary().features;

						for (var i = 0; i < dictionary.length; i++) {
							for (var j = 0; j < dictionary[i].options.length; j++) {
								//if (dictionary[i].options[j].ruleId == id)
								//    return true;
								this._cacheOption[dictionary[i].options[j].ruleId] = true;
							}
						}
					}

					if(this._cacheOption[id] != undefined)
						return true;
					else
						return false;

					//return false;
				},

				isPresent : function(id, array){
					var flag = false;
					if(array && array.length > 0){
						for (var i = 0; i < array.length; i++) {
							if(array[i] === id){
								flag = true; break;
							}
						}
					}
					return flag;
				},

				setConflictingFeatures: function (conflictingFeatures) {
					var _uniqueListOfConflictingIds = [];
					this._listOfListOfConflictingIds = conflictingFeatures;

					var numConflictingFeatures = 0;
					if(this._listOfListOfConflictingIds && this._listOfListOfConflictingIds.length != 0)
					{
						for(var i=0; i< this._listOfListOfConflictingIds.length; i++)
						{
							//pci3 - commented below line for IR-613091 and added loop
							// numConflictingFeatures += this._listOfListOfConflictingIds[i].length;
							for (var j = 0; j < this._listOfListOfConflictingIds[i].length; j++) {
								if(!this.isPresent(this._listOfListOfConflictingIds[i][j], _uniqueListOfConflictingIds)){
									_uniqueListOfConflictingIds.push(this._listOfListOfConflictingIds[i][j]);
									numConflictingFeatures++;
									this.setUpdateRequiredOption(this._listOfListOfConflictingIds[i][j],true);
									var featureID = this.getFeatureIdWithOptionId(this._listOfListOfConflictingIds[i][j]) || this._listOfListOfConflictingIds[i][j];
									if(!this.getUpdateRequired(featureID)){
										this.setUpdateRequired(featureID, true);
									}
								}
							}
						}
					}
					this.setNumberOfConflictingFeatures(numConflictingFeatures);
				},
				isConflictingOption: function(optionId)
				{
					if(!this._listOfListOfConflictingIds) return false;
					var numLists = this._listOfListOfConflictingIds.length;
					for(var i=0; i< numLists; i++)
					{
						if (this._listOfListOfConflictingIds[i].indexOf(optionId) != -1)
							return true;
					}
					return false;

				},
				getImpliedRules: function () {
					return this._listOfListOfConflictingImpliedRules;
				},

				setImpliedRules: function (impliedRules) {
					this._listOfListOfConflictingImpliedRules = impliedRules;
				},
				getRulesConsistency: function () {
					return this._rulesConsistency;
				},
				setRulesConsistency: function (newRulesConsistency) {
					this._rulesConsistency = newRulesConsistency;
				},

				getSelectionMode: function () {
					return this._appRulesParams.selectionMode;
				},
				setSelectionMode: function (newMode) {
					this._appRulesParams.selectionMode = newMode;

					if (this.getCompletenessStatus() == ConfiguratorVariables.Hybrid && this._appRulesParams.selectionMode == ConfiguratorVariables.selectionMode_Build)
						this.setCompletenessStatus(ConfiguratorVariables.Partial);
					else
						if (this.getCompletenessStatus() == ConfiguratorVariables.Partial && this._appRulesParams.selectionMode == ConfiguratorVariables.selectionMode_Refine)
							this.setCompletenessStatus(ConfiguratorVariables.Hybrid);


					if(newMode === ConfiguratorVariables.selectionMode_Build) {
						//removeDismissedCriteria
						this.emptyDismissedOptions();
					}else {
						//resetFeaturesSelectionMode
						// switch empty variant / op group to dismiss selection mode
						this.resetFeaturesSelectionMode();
					}

					this._modelEvents.publish( {
						event:	'ComputeConfigExpression'
					});
					this._modelEvents.publish({event : "pc-changed"});
				},

				getRulesMode: function () {
					return this._appRulesParams.rulesMode;
				},
				setRulesMode: function (newMode) {
					this._appRulesParams.rulesMode = newMode;
					// R14: In Complete Mode, we want to clean up Multi Select Variants
					if(newMode === 'RulesMode_SelectCompleteConfiguration') {
						this.emptyMultiSelectedVariants(undefined,['VariabilityGroup']); //passing excludedTypes - which should not allow emptying of fields.
					}
					//when rules mode change => reset feature selection mode
					this.resetFeaturesSelectionMode();
					// tracker API
					this._modelEvents.publish({event:	'configurator-rule-mode-updated',  data: newMode });
				},

				getRulesActivation: function () {
					return this._appRulesParams.rulesActivation;
				},
				setRulesActivation: function (newMode) {
					if (newMode == ConfiguratorVariables.str_false) {

						for (var i = 0; i < this._configurationCriteria.length; i++) {
							if(this._configurationCriteria[i].State != ConfiguratorVariables.Chosen && this._configurationCriteria[i].State != ConfiguratorVariables.Unselected)
								this._configurationCriteria[i].State = ConfiguratorVariables.Unselected;
							this._cacheIdWithState[this._configurationCriteria[i].Id] = this._configurationCriteria[i].State;
						}
					}
					this._appRulesParams.rulesActivation = newMode;
				},

				getCompletenessStatus: function () {
					return this._appRulesParams.completenessStatus;
				},
				setCompletenessStatus: function (newStatus) {
					this._appRulesParams.completenessStatus = newStatus;

					this._modelEvents.publish( {
						event:	'OnCompletenessStatusChange',
						data:	{value : newStatus}
					});
				},
				setFeatureIdWithMandStatus: function(id, status)
				{
					this._cacheFeatureIdWithMandStatus[id] = status;
				},
				getFeatureIdWithMandStatus: function(id)
				{
					return this._cacheFeatureIdWithMandStatus[id];
				},

				setFeatureIdWithChosenStatus: function(id, status){
					this._cacheFeatureIdWithChosenStatus[id] = status;
				},
				getFeatureIdWithChosenStatus: function(id){
					return this._cacheFeatureIdWithChosenStatus[id];
				},

				getRulesCompliancyStatus: function () {
					return this._appRulesParams.rulesCompliancyStatus;
				},
				setRulesCompliancyStatus: function (newStatus) {
					this._appRulesParams.rulesCompliancyStatus = newStatus;
				},

				getDictionary: function () {
					return this._dictionaryJson;
				},
				setDictionary: function (newDictionary) {
					if(newDictionary){
						if(newDictionary._version === "3.0" || newDictionary._version === "3.1"){
							this._dictionaryJson = this._getCompatibleDicoInV1(newDictionary);
						}else{
							this._dictionaryJson = newDictionary;
						}
						this._dictionaryJson._version = "1.0";
					var Features = this._dictionaryJson.features;

					for (var i = 0; i < Features.length; i++) {
						this._cacheOptionIdWithFeatureId[Features[i].ruleId] = Features[i].ruleId;

						//to check if needed or not
						if (this.getSelectionMode() == ConfiguratorVariables.selectionMode_Build)
							this.setRefineSelectionModeForSpecifiedFeature(Features[i].ruleId, ConfiguratorVariables.select);
						else if (this.getSelectionMode() == ConfiguratorVariables.selectionMode_Refine)
							this.setRefineSelectionModeForSpecifiedFeature(Features[i].ruleId, ConfiguratorVariables.reject);

						for (var j = 0; j < Features[i].options.length; j++) {
							this._cacheOptionIdWithFeatureId[Features[i].options[j].ruleId] = Features[i].ruleId;
						}
						// init feature selection mode
						this.resetFeatureSelectionMode(Features[i]);
					}
					}
				},

				setRules : function(dictionary){
					var dico_inside = (dictionary.portfolioClasses) ? dictionary.portfolioClasses.member[0].portfolioComponents.member[0] : [];
					this._modelID = dico_inside.id;
					var flatRules = (dico_inside.rules && dico_inside.rules.member) ? dico_inside.rules.member : [];
					for (var i = 0; i < flatRules.length; i++) {
						this._cacheRuleIdWithName[flatRules[i].id] = flatRules[i].attributes._title || flatRules[i].attributes._name || "";
					}
				},
				_getCompatibleDicoInV1 : function(dictionary){
					var newDictionary = {};
					var features = [];
					var dico_inside = (dictionary.portfolioClasses) ? dictionary.portfolioClasses.member[0].portfolioComponents.member[0] : [];
					this._modelID = dico_inside.id;
	        		var flatVariants = (dico_inside.variants && dico_inside.variants.member) ? dico_inside.variants.member : [];
	        		var flatVGs = (dico_inside.variabilityGroups && dico_inside.variabilityGroups.member) ? dico_inside.variabilityGroups.member : [];
					var flatParamaters = (dico_inside.parameters && dico_inside.parameters.member) ? dico_inside.parameters.member : [];

					for (var i = 0; i < flatVariants.length; i++) {
							this.addMinifiedVariantAndValueInRes(features, flatVariants[i], "Single");
					}
					for (var i = 0; i < flatVGs.length; i++) {
							this.addMinifiedVGInRes(features, flatVGs[i], "Multiple");
					}
					features = features.sort(function (itemA, itemB) {
						return Utils.compare(itemA.sequenceNumber, itemB.sequenceNumber);
					});
					for (var i = 0; i < flatParamaters.length; i++) {
							this.addMinifiedParametersInRes(features, flatParamaters[i]);
					}
					this.setRules(dictionary);
					newDictionary.features = features;
					return newDictionary;
				},

				getRuleDisplayNameWithId : function(id){
					return this._cacheRuleIdWithName[id];
				},

				addMinifiedParametersInRes : function(features, parameter){
					if(parameter.kind === "instance"){
						var feature = {};
						feature.ruleId = parameter.id;  //variant.lid;
						feature.sequenceNumber = parameter.attributes._sequenceNumber ? parameter.attributes._sequenceNumber : 1;
						feature.options = [];
						feature.name =  parameter.attributes._name || "";
						feature.displayName =  parameter.attributes._title || feature.name;
						feature.selectionCriteria = parameter.attributes._mandatory || "false";
						feature.selectionType = "Parameter";
						feature.type = "Parameter";
						feature.image = parameter.attributes._image || "";

						//FD02
						feature.minValue = parameter.attributes._minValue ? parameter.attributes._minValue.inputvalue : 0;
						feature.minUnit = parameter.attributes._minValue ? parameter.attributes._minValue.inputunit : "";
						feature.maxValue = parameter.attributes._maxValue ? parameter.attributes._maxValue.inputvalue : 0;
						feature.maxUnit = parameter.attributes._maxValue? parameter.attributes._maxValue.inputunit : "";

						//FD03
						if(feature.minUnit !== feature.maxUnit){
							feature.minValue = parameter.attributes._minValue ? parameter.attributes._minValue.dbvalue : 0;
							feature.minUnit = parameter.attributes._minValue ? parameter.attributes._minValue.dbunit : "";
							feature.maxValue = parameter.attributes._maxValue ? parameter.attributes._maxValue.dbvalue : 0;
							feature.maxUnit = parameter.attributes._maxValue? parameter.attributes._maxValue.dbunit : "";
						}

						feature.stepValue = parameter.attributes._step ? parameter.attributes._step.inputvalue : 1;
						feature.unit = parameter.attributes._unit || feature.minUnit || "";

						feature.defaultValue = parameter.attributes._defaultValue ? parameter.attributes._defaultValue.inputvalue : undefined;
						feature.defaultUnit = parameter.attributes._defaultValue ? parameter.attributes._defaultValue.inputunit : "";

						features.push(feature);
					}
				},

				addMinifiedVariantAndValueInRes : function(features, variant, defaultSelectionType){
					if(variant.kind === "instance"){
						var feature = {};
						// feature.ruleId = variant.id;  //variant.lid;
						feature.ruleId = variant.idref;  // physical id of variant
						feature.sequenceNumber = variant.attributes._sequenceNumber ? variant.attributes._sequenceNumber : 1;
						feature.options = [];
						feature.name =  variant.attributes._name || "";
						feature.displayName =  variant.attributes._title || feature.name;
						feature.selectionCriteria = variant.attributes._mandatory || "false";
						feature.type = "Variant";
						feature.selectionType = variant.attributes._selectionType || defaultSelectionType;
						feature.image = variant.attributes._image || "";

						feature.optionPhysicalIds = [];
						var values = variant.values.member;
						for (var i = 0; i < values.length; i += 1) {
									var option = {};
									// option.ruleId = values[i].id; //values[j].rel_lid;
									option.ruleId = values[i].idref; // note: ruleId term not appropriate : tobe changed
									// option.ruleId = values[i].rel_lid;
									option.name = values[i].attributes._name ? values[i].attributes._name : "";
									option.displayName = values[i].attributes._title || option.name;
									option.sequenceNumber = values[i].attributes._sequenceNumber ? values[i].attributes._sequenceNumber : 1;
									option.image = values[i].attributes._image ? values[i].attributes._image : "";
									option.selectionCriteria = values[i].attributes._mandatory ? values[i].attributes._mandatory : "false";
									option.type = "Value";
									var _default = values[i].attributes._default == true;
									if(_default) {
										this._defaultFromDico.push(option.ruleId);
									}
									feature.optionPhysicalIds.push(values[i].idref);
									// for (var j = 0; j < values.length; j += 1) {
									// 	// feature.optionPhysicalIds.push(values[j].id);
									// 	// feature.optionPhysicalIds.push(values[j].rel_lid);
									// }
									feature.options.push(option);
							}
						features.push(feature);
					}
				},

				addMinifiedVGInRes : function(features, variant, defaultSelectionType){
						var feature = {};
						feature.ruleId = variant.id;
						// feature.ruleId = variant.lid;
						feature.sequenceNumber = variant.attributes._sequenceNumber ? variant.attributes._sequenceNumber : 1;
						feature.options = [];
						feature.name =  variant.attributes._name || "";
						feature.displayName =  variant.attributes._title || feature.name;
						feature.selectionCriteria = variant.attributes._mandatory || "false";
						feature.type = "VariabilityGroup";
						feature.selectionType = variant.attributes._selectionType || defaultSelectionType;
						feature.image = variant.attributes._image || "";

						var values = variant.options.member ;
						for (var i = 0; i < values.length; i += 1) {
								if(values[i].kind === "instance"){
									var option = {};
									// option.ruleId = values[i].id;
									option.ruleId = values[i].idref;
									// option.ruleId = values[i].rel_lid;
									option.name = values[i].attributes._name ? values[i].attributes._name : "";
									option.displayName = values[i].attributes._title || option.name;
									option.sequenceNumber = values[i].attributes._sequenceNumber ? values[i].attributes._sequenceNumber : 1;
									option.image = values[i].attributes._image ? values[i].attributes._image : "";
									option.selectionCriteria = values[i].attributes._mandatory ? values[i].attributes._mandatory : "false";
									option.type = "Option";
									var _default = values[i].attributes._default == true;
									if(_default) {
										this._defaultFromDico.push(option.ruleId);
									}
									feature.optionPhysicalIds = [];
									for (var j = 0; j < values.length; j += 1) {
										if(values[j].kind === "instance"){
											// feature.optionPhysicalIds.push(values[j].id);
											feature.optionPhysicalIds.push(values[j].idref);
											// feature.optionPhysicalIds.push(values[j].rel_lid);
										}
									}
									feature.options.push(option);
								}
							}
							features.push(feature);
				},

				setReadOnlyFlag: function (booleanValue) {
					if (booleanValue == true)
						this._readOnly = true;
					else if (booleanValue == false)
						this._readOnly = false;
				},

				getReadOnlyFlag : function() {
					return this._readOnly;
				},

				setAppRulesParam : function (newAppRulesParam) {
					this._appRulesParams = newAppRulesParam;

					if (this._appRulesParams.selectionMode == ConfiguratorVariables.selectionMode_Build)
						this.setRefineSelectionModeForAllFeatures(ConfiguratorVariables.select);
					if (this._appRulesParams.selectionMode == ConfiguratorVariables.selectionMode_Refine)
						this.setRefineSelectionModeForAllFeatures(ConfiguratorVariables.reject);
				},

				getAppRulesParam : function () { return this._appRulesParams; },

				getFeatureIdWithOptionId : function (Id) { return this._cacheOptionIdWithFeatureId[Id]; },
				getCacheOptionsIdWithFeatureId : function () { return this._cacheOptionIdWithFeatureId; },

				setRefineSelectionModeForSpecifiedFeature : function (id, newMode) { this._listOfRefineSelectionMode[id] = newMode; },
				getRefineSelectionModeForSpecifiedFeature : function (id) { return this._listOfRefineSelectionMode[id]; },

				setRefineSelectionModeForAllFeatures : function (newMode) {
					for (var key in this._listOfRefineSelectionMode)
						this._listOfRefineSelectionMode[key] = newMode;
				},
				/**********************************************************************/
				/*function to update the state of options (available, chosen,
				required...)                                                          */
				/**********************************************************************/
				getStateWithId : function (Id) {
					/*for (var i = 0; i < this._configurationCriteriaInJson.length; i++) {
					if (this._configurationCriteriaInJson[i].Id == Id)
                    return this._configurationCriteriaInJson[i].State;
				}*/

					return this._cacheIdWithState[Id];
				},

				setStateWithId : function (Id, NewState) {
					this._cachePreviousCriteria = JSON.parse(JSON.stringify(this._cacheIdWithState));
					if (NewState == ConfiguratorVariables.Range)
						return 0;

					var set = false;
					for (var i = 0; i < this._configurationCriteria.length; i++) {
						if (this._configurationCriteria[i].Id == Id) {

							this._configurationCriteria[i].State = NewState;
							set = true;
							break;
						}
					}
					if (!set) {
						this._configurationCriteria.push({ Id: Id, State: NewState });
					}

					this._cacheIdWithState[Id] = NewState;

					this.setConfigCriteriaUpdated(true);
				},

				getValueWithId : function (Id) {
					return this._cacheIdWithValue[Id];
				},

				setValueWithId : function (Id, value) {
					var set = false;
					for (var i = 0; i < this._parameterCriteria.length; i++) {
						if (this._parameterCriteria[i].Id == Id) {
							this._parameterCriteria[i].Value = value;
							set = true;
							break;
						}
					}
					if (!set) {
						this._parameterCriteria.push({ Id: Id, Value: value });
					}
					this._cacheIdWithValue[Id] = value;
				},


				getNumberOfMandFeaturesNotValuated: function () {
					return this._mustSelectFeatureNumber;
				},
				setNumberOfMandFeaturesNotValuated: function (newValue) {
				    var oldValue = this._mustSelectFeatureNumber;
				    this._mustSelectFeatureNumber = newValue;

				    //Event for old ConfiguratorPanel component (the one integrated in PSE)
				    this._modelEvents.publish({
				        event: 'OnMandFeatureNumberChange',
				        data: { value: newValue }
				    });

				    //Event for new ConfigEditor component
				    this._modelEvents.publish({
				        event: 'OnMandVariantNumberChange',
				        data: { value: newValue }
				    });

				    //for now only Partial and Complete events thrown
					/*if(!FirstTime)
					{
						if(newValue == 0) {
							this.setCompletenessStatus(ConfiguratorVariables.Complete);

						} else //if(oldValue == 0)
						{
							if (this._appRulesParams.selectionMode == ConfiguratorVariables.selectionMode_Build)
								this.setCompletenessStatus(ConfiguratorVariables.Partial);
							else
								this.setCompletenessStatus(ConfiguratorVariables.Hybrid);
						}
					}*/

					 this.setCompletenessStatus(this.CalculateCompletenessStatus());
				},

				CalculateCompletenessStatus : function () {
					var features = this._dictionaryJson.features;
					var mustNotValuated = 0;
					var hybrid = false;
					var cacheFeaturesIdWithSelections = {};
					var cacheFeatureTypes = {};
					var cacheConfigCriteria = {};

					// R14: in Case of Multi Selection Variant Values, we set the completeness status to hybrid
					if(this.hasMultiSelectVariantValues(undefined,false,['VariabilityGroup'])) { //passing excludedTypes - which should not emptying the option groups
						return  ConfiguratorVariables.Hybrid;
					}

					for (var k = 0; k < this._configurationCriteria.length; k++) {

						//Create a cache of the configCriteria
						//	{ IDcriteria : State, ...}

						cacheConfigCriteria[this._configurationCriteria[k].Id] = this._configurationCriteria[k].State;
					}

					for (var i = 0; i < features.length; i++) {

					    if (features[i].selectionCriteria === "Must" || this.getFeatureIdWithMandStatus(features[i].ruleId)) {  //Only consider the Must features

					        //Cache for the Features type :
					        // {
					        //  IDFeature: "Single"/"Multiple", ...
					        // }
					        cacheFeatureTypes[features[i].ruleId] = features[i].selectionType;

					        //One for the Features Selections/rejections number :
					        // {
					        //  IDFeature: {SelectionsNb:0,  UserRejectNb:0}, ...
					        // }
					        cacheFeaturesIdWithSelections[features[i].ruleId] = {
					            SelectionsNb: 0,
					            UserRejectNb: 0
					        };

					        for (var j = 0; j < features[i].options.length; j++) {
					            if (cacheConfigCriteria[features[i].options[j].ruleId] === ConfiguratorVariables.Chosen ||
									cacheConfigCriteria[features[i].options[j].ruleId] === ConfiguratorVariables.Default ||
									cacheConfigCriteria[features[i].options[j].ruleId] === ConfiguratorVariables.Required ||
									cacheConfigCriteria[features[i].options[j].ruleId] === ConfiguratorVariables.Selected ){
					                cacheFeaturesIdWithSelections[features[i].ruleId].SelectionsNb++;
					            }
					            else if (cacheConfigCriteria[features[i].options[j].ruleId] === ConfiguratorVariables.Dismissed) {
					                cacheFeaturesIdWithSelections[features[i].ruleId].UserRejectNb++;
					            }
					        }

					        //If we are on refine, consider the available states as included. Then, we need to count them as selections
					        if (this._appRulesParams.selectionMode === ConfiguratorVariables.selectionMode_Refine && cacheFeaturesIdWithSelections[features[i].ruleId].SelectionsNb === 0) {
					            cacheFeaturesIdWithSelections[features[i].ruleId].SelectionsNb = features[i].options.length - cacheFeaturesIdWithSelections[features[i].ruleId].UserRejectNb;
					        }
					    }

					}

					for (var feature in cacheFeaturesIdWithSelections) {
							if (!hybrid && cacheFeaturesIdWithSelections[feature].SelectionsNb > 1 && cacheFeatureTypes[feature] == "Single") {
								hybrid = true;
							}
							if (cacheFeaturesIdWithSelections[feature].SelectionsNb === 0 /*&& cacheFeaturesIdWithSelections[feature].UserRejectNb == 0*/) {
								mustNotValuated++;
							}
					}

					if(mustNotValuated === 0) {
						if (!hybrid) {
							return ConfiguratorVariables.Complete;
						}
						return ConfiguratorVariables.Hybrid;
					}

					if (hybrid) {
						return ConfiguratorVariables.Hybrid;
					}
					return ConfiguratorVariables.Partial;

				},

				getNumberOfConflictingFeatures: function () {
					return this._conflictingFeaturesNumber;
				},
				setNumberOfConflictingFeatures: function (newValue) {
					this._conflictingFeaturesNumber = newValue;

				    //Event for old ConfiguratorPanel component (the one integrated in PSE)
					this._modelEvents.publish({
					    event: 'OnConflictFeatureNumberChange',
					    data: { value: newValue }
					});

				    //Event for new ConfigEditor component

					this._modelEvents.publish( {
						event:	'OnConflictVariantNumberChange',
						data:	{value : newValue}
					});
				},

				getNumberOfFeaturesChosen: function () {
					return this._chosenFeaturesNumber;
				},
				setNumberOfFeaturesChosen: function (newValue) {
					this._chosenFeaturesNumber = newValue;
					this._modelEvents.publish({
					    event: 'OnChosenVariantNumberChange',
					    data: { value: newValue }
					});
				},

				getFeatureDisplayNameWithId : function(id) {
					var features = this.getDictionary().features;

					for (var i = 0; i < features.length; i++) {
						if (features[i].ruleId == id)
							return features[i].displayName;
						for (var j = 0; j < features[i].options.length; j++) {
							if (features[i].options[j].ruleId == id)
								return features[i].displayName;
						}
					}

					return;
				},

				getOptionDisplayNameWithId : function(id) {
					var features = this.getDictionary().features;

					for (var i = 0; i < features.length; i++) {
						for (var j = 0; j < features[i].options.length; j++) {
							if (features[i].options[j].ruleId == id)
								return features[i].options[j].displayName;
						}
					}

					return;
				},

				getXMLExpression : function(options){

					var jsTranObj = new FilterExpressionXMLServices('FilterExpression');

					var json = {
							"configurationCriteria": this.getConfigurationCriteria(),
							"dictionary": this.getDictionary(),
							"app_RulesParam": this.getAppRulesParam(),
							"app_Func": this.getAppFunc(),
			        //"evolutionCriteria":this.getEvolutionCriteria()
              "modelVersionInfo": this.getModelVersionInfo(),
							"configModel" : this,
							includeDisplayName: options && options.includeDisplayName !== undefined ? !!options.includeDisplayName : true
					};

					var xml = jsTranObj.json2xml_str(json);

					return xml;
				},

				getXMLExpressionWithDisplayName : function(){

					var jsTranObj = new FilterExpressionXMLServicesWithDisplayName('FilterExpression');

					var json = {
							"configurationCriteria": this.getConfigurationCriteria(),
							"dictionary": this.getDictionary(),
							"app_RulesParam": this.getAppRulesParam(),
							"app_Func": this.getAppFunc(),
					        //"evolutionCriteria":this.getEvolutionCriteria()
              "modelVersionInfo": this.getModelVersionInfo()
					};

					var xml = jsTranObj.json2xml_str(json);

					return xml;
				},

			    /*** Added newly **/

				getModelVersionInfo : function() {
				    return this._modelVersionInfo;
				},

				setModelVersionInfo: function (newModelVersionInfo) {
				    //newModelVersionInfo should contain following entries:
				    //  modelName
				    //  modelVersionName
				    //  modelVersionRevision
                    //It is used to add the modelVersion informations in the XML (filter expression XML that is used for 3DRendering and for PC save)
				    this._modelVersionInfo = newModelVersionInfo;
				},

				setCurrentFilter : function(value){
					this._currentFilter = value;
				},
				getCurrentFilter : function(){
					return this._currentFilter;
				},

				setFeatureIdWithStatus: function(id, status)
				{
					this._cacheFeatureIdWithStatus[id] = status;
				},
				getFeatureIdWithStatus: function(id)
				{
					return this._cacheFeatureIdWithStatus[id];
				},

				getNumberOfFeaturesNotValuated: function () {
					return this._unSelectFeatureNumber;
				},
				setNumberOfFeaturesNotValuated: function (newValue) {
					var oldValue = this._unSelectFeatureNumber;
					this._unSelectFeatureNumber = newValue;

					this._modelEvents.publish( {
						event:	'OnUnselectedVariantNumberChange',
						data:	{value : newValue}
					});
				},

				setFeatureIdWithRulesStatus: function(id, status)
				{
					this._cacheFeatureIdWithRulesStatus[id] = status;
				},
				getFeatureIdWithRulesStatus: function(id)
				{
					return this._cacheFeatureIdWithRulesStatus[id];
				},

				setFeatureIdWithUserSelection: function(id, status)
				{
					this._cacheFeatureIdWithUserSelection[id] = status;
				},
				getFeatureIdWithUserSelection: function(id)
				{
					return this._cacheFeatureIdWithUserSelection[id];
				},




				getNumberOfFeaturesByRules: function () {
					return this._rulesDeductionFeatureNumber;
				},
				setNumberOfFeaturesByRules: function (newValue) {
					var oldValue = this._rulesDeductionFeatureNumber;
					this._rulesDeductionFeatureNumber = newValue;

					this._modelEvents.publish( {
						event:	'OnRuleNotValidatedNumberChange',
						data:	{value : newValue}
					});
				},

				setSearchStatus: function(value){
					this._isSearchActive = value;
				},
				getSearchStatus : function(){
					return this._isSearchActive;
				},

				setVariantVisibility : function(id,value){
					this._variantVisibilty[id] = value;
				},
				getVariantVisibility : function(id){
					return this._variantVisibilty[id];
				},

				setCurrentSearchData: function(data){
					this._data = data;
				},
				getCurrentSearchData : function(){
					return this._data
				},

				setIncludedState : function(Id, NewState){
					if (NewState == ConfiguratorVariables.Range)
						return 0;
					this._tempcacheIdWithState[Id] = NewState;
				},

				getIncludedState : function (Id) {
					return this._tempcacheIdWithState[Id];
				},

				setInitialLoadStatus:function(data){
					this._initialLoadStatus = data;
				},

				getInitialLoadStatus:function(){
					return this._initialLoadStatus;
				},

				setLoading:function(id,data){
					this._initialLoad[id] = data;
				},

				getLoading:function(id){
					return this._initialLoad[id];
				},

				setCriteriaBuildMode:function(newConfigCriteria){
					this._BuildModeCriteria = newConfigCriteria;
				},

				getCriteriaBuildMode:function(){
					return this._BuildModeCriteria;
				},

				getVariants : function(){
					return this._allVariants
				},

				setVariants : function(count){
					this._allVariants = count ? count  : 0;
					this._modelEvents.publish({ event: "OnAllVariantNumberChange", data:{value : this._allVariants}});
				},

				setUserSelectVariantIDs : function(id, flag){
					var flag1 = UWA.typeOf(flag) === "boolean" ? flag : false;
					this._cacheSelectionID[id] = flag1;
				},

				getUserSelectVariantIDs : function(id){
					return this._cacheSelectionID[id];
				},

				setValidateVariant : function(id, flag){
					var flag1 = UWA.typeOf(flag) === "boolean" ? flag : false;
					this._cacheValidate[id] = flag1;
				},

				getValidateVariant : function(id, flag){
					return this._cacheValidate[id];
				},

				isValidationEnabled : function () {
					return this._enableValidation;
				},

				setValidationFlag : function(flag){
					this._enableValidation = flag ? flag : false;
				},

				setDefaultCriteria : function(data){
					this._defaults = data;
				},

				getDefaultCriteria : function(data){
					return this._defaults;
				},

				resetDefaultCriteria : function () {
					this._defaults = UWA.clone(this._defaultFromDico);
				},

				setVariantWithSelection : function(variant,flag){
					this._variantWithSelection[variant] = flag;
				},
				getVariantWithSelection : function(variant){
					return this._variantWithSelection[variant];
				},
				setVariantForDiagnosis : function(data){
					this._variantForDiagnosis = data;
				},
				getVariantForDiagnosis : function(data){
					return this._variantForDiagnosis;
				},

				getFirstSelection : function(data){
					return this._firstSelection;
				},
				setFirstSelection : function(data){
					this._firstSelection = data;
					this._resetFirstSelection = false;
				},

				setFirstSelectionDirty : function () {
					this._resetFirstSelection = true;
				},

				isFirstSelectionDirty : function () {
					return this._resetFirstSelection;
				},

				setConfigCriteriaUpdated : function(flag){
					this._configCriteriaUpdated = flag ? flag : false;
					if(this._configCriteriaUpdated){
						this._dignosedVariant = [];
					}
				},
				isConfigCriteriaUpdated : function(flag){
					return this._configCriteriaUpdated;
				},
				setDignosedVariant : function(id, flag){
					this._dignosedVariant[id] = flag ? flag : false;
				},
				getDignosedVariant : function(id){
					return this._dignosedVariant[id];
				},
				isSolveWithDiagnose : function(){
					return this._withDiagnosis;
				},
				setSolveWithDiagnose : function(flag){
					this._withDiagnosis = flag;
				},
				getDefaultComputationTimeout : function () {
					var timeout = this._defaultComputationTimeout;
					if(window && window.sessionStorage['solver-default-compute-timeout']) {
						var timeoutFromCache =  window.sessionStorage['solver-default-compute-timeout'];
						if(UWA.is(timeoutFromCache, 'string')) {
							timeoutFromCache = parseInt(timeoutFromCache);
						}
						if(UWA.is(timeoutFromCache, 'number')) {
							timeout = timeoutFromCache;
						}
					}
					return timeout;
				},

				emptyDismissedOptions: function(feature) {
					return _unselectCriteria(this,feature, this.getDismissedConfigurationCriteria(),1,ConfiguratorVariables.Unselected);
				},

				emptyChosenOptions: function(feature) {
					return _unselectCriteria(this,feature, this.getChosenConfigurationCriteria(),1,ConfiguratorVariables.Unselected);
				},

				emptyMultiSelectedVariants: function (feature,excludedTypes) {
					return _unselectCriteria(this, feature, this.getChosenConfigurationCriteria(),2,ConfiguratorVariables.Unselected,excludedTypes);
				},

				hasMultiSelectVariantValues: function (feature, selected,excludedTypes) {
					if(feature) {
						return _checkCriteriaState(this,feature, [ConfiguratorVariables.Chosen, ConfiguratorVariables.Default, ConfiguratorVariables.Required], [ConfiguratorVariables.Dismissed], 2);
					}
					return _unselectCriteria(this,feature, this.getChosenConfigurationCriteria(selected),2,undefined,excludedTypes);
				},

				hasDismissedOptions: function (feature, incompatible) {
					if(!feature) {
						return _unselectCriteria(this, feature, this.getDismissedConfigurationCriteria(incompatible),1);
					}
					var includeCrieria = [ConfiguratorVariables.Dismissed];
					if(incompatible !== undefined && incompatible == true) {
						includeCrieria.push(ConfiguratorVariables.Incompatible);
					}
					return  _checkCriteriaState(this,feature, includeCrieria, [], 1);
					// return _unselectCriteria(this, feature, this.getDismissedConfigurationCriteria(incompatible),1);
				},

				hasIncompactibleOptions: function (feature) {
					var hasIncompatible = _checkCriteriaState(this,feature, [ConfiguratorVariables.Incompatible], [ConfiguratorVariables.Chosen], 1);
					var isRequired = _checkCriteriaState(this,feature, [ConfiguratorVariables.Incompatible, ConfiguratorVariables.Required], [], feature.options.length);
					return hasIncompatible && !isRequired;
				},
				hasSingleSelectVariantValues: function (feature, selected) {
					return _checkCriteriaState(this,feature, [ConfiguratorVariables.Chosen, ConfiguratorVariables.Default, ConfiguratorVariables.Required], [ConfiguratorVariables.Dismissed], 1);
					// return _unselectCriteria(this, feature, this.getChosenConfigurationCriteria(selected),1);
				},

				hasChosenOptions: function (feature, selected) {
					return _unselectCriteria(this, feature, this.getChosenConfigurationCriteria(selected),1);
				},

				isAsyncRuleLoad : function () {
					return this._useAsyncRuleLoad || false;
				},

				// FeatureSelectionMode:
				//  Single: A Variant in normal mode
				//  Multiple: An Option Group or Refine Mode
				//  EnforceMultiple: A Variant which has been switched by user to Multi Selection
				getFeatureSelectionMode : function (feature) {
					// need to identify ODT giving features ['1','2'..]
					if(UWA.is(feature,'string'))
						return this._featureLevelSelectionMode[feature];
					if(UWA.is(feature,'object'))
						return this._featureLevelSelectionMode[feature.ruleId];
				},
				// replace param feature with id
				setFeatureMultiSelectionMode : function (feature) {
					if(	this._featureLevelSelectionMode[feature.ruleId] === ConfiguratorVariables.feature_SelectionMode_Single ||
						this._featureLevelSelectionMode[feature.ruleId] === ConfiguratorVariables.feature_SelectionMode_Dismiss) {
						this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_EnforceMultiple;
						this._modelEvents.publish({ event: 'pc-feature-selection-mode-updated'});
					}
				},
				// replace param feature with id
				setFeatureSingleSelectionMode : function (feature) {
					if(this._featureLevelSelectionMode[feature.ruleId] === ConfiguratorVariables.feature_SelectionMode_EnforceMultiple ||
						this._featureLevelSelectionMode[feature.ruleId] === ConfiguratorVariables.feature_SelectionMode_Dismiss ||
						this._featureLevelSelectionMode[feature.ruleId] === ConfiguratorVariables.feature_SelectionMode_Multiple &&
						feature.selectionType !== ConfiguratorVariables.feature_SelectionMode_Multiple ) {
						this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Single;
						this._modelEvents.publish({ event: 'pc-feature-selection-mode-updated'});
					}
				},
				// replace param feature with id
				setFeatureDismissMode : function (feature) {
					if(this._featureLevelSelectionMode[feature.ruleId] === ConfiguratorVariables.feature_SelectionMode_Single ||
						this._featureLevelSelectionMode[feature.ruleId] === ConfiguratorVariables.feature_SelectionMode_Multiple ||
						this._featureLevelSelectionMode[feature.ruleId] === ConfiguratorVariables.feature_SelectionMode_EnforceMultiple ) {
						this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Dismiss;
						this._modelEvents.publish({ event: 'pc-feature-selection-mode-updated'});
					}
				},


				resetFeaturesSelectionMode : function() {
					var Features = this._dictionaryJson.features;
					if(UWA.is(Features,'array')) {
						for (var i = 0; i < Features.length; i++) {
							this.resetFeatureSelectionMode(Features[i]);
						}
					}
				},
				/* replace string with constants */
				resetFeatureSelectionMode : function(feature) {
					// in Refine Mode all variant are in multi selection
					// if(this.hasDismissedOptions(feature,true) && this.getSelectionMode() === ConfiguratorVariables.selectionMode_Refine){
					// 	this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Dismiss;
					// }
					// else
					if (this.getSelectionMode() === ConfiguratorVariables.selectionMode_Refine) {
						if(this.hasDismissedOptions(feature) || this.hasIncompactibleOptions(feature)) {
							this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Dismiss;
						} else if(feature.selectionType === ConfiguratorVariables.feature_SelectionMode_Multiple || this.hasMultiSelectVariantValues(feature)) {
							this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Multiple;
						} else if(this.hasSingleSelectVariantValues(feature)){
							//To check if refine mode has a single selection saved
							this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Single;
					  } else {
							this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Dismiss;
						}
					}
					else if (feature.selectionType === ConfiguratorVariables.feature_SelectionMode_Multiple) {
						this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Multiple;
					}
					else if (this.hasMultiSelectVariantValues(feature)) {
						this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_EnforceMultiple;
					}else if (this.hasSingleSelectVariantValues(feature)) {
						this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Single;
					}
					else if (feature.selectionType === ConfiguratorVariables.feature_SelectionMode_Parameter) {
						this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Parameter;
					}
					else if (feature.selectionType === ConfiguratorVariables.feature_SelectionMode_Single) {
						this._featureLevelSelectionMode[feature.ruleId] = ConfiguratorVariables.feature_SelectionMode_Single;
					}
				}

			});


			return ConfiguratorModel;
		});

define(
    'DS/ConfiguratorPanel/scripts/Presenters/MultipleValueAutocompletePresenter',
    [
        'UWA/Core',
        'DS/Handlebars/Handlebars',
        'DS/UIKIT/Autocomplete',
        'DS/UIKIT/Mask',
        'DS/UIKIT/Tooltip',
        'DS/Controls/Popup',
        'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
        'DS/ConfiguratorPanel/scripts/Utilities',
        'DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctions',

        'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
        'text!DS/ConfiguratorPanel/html/MultipleValueAutocompletePresenter.html',

        'css!DS/UIKIT/UIKIT.css',
        "css!DS/ConfiguratorPanel/css/MultipleValueAutocompletePresenter.css"


    ],
    function(UWA, Handlebars, Autocomplete, Mask, Tooltip, WUXPopup, ConfiguratorVariables, Utilities, ConfiguratorSolverFunctions, nlsConfiguratorKeys, html_MultipleValueAutocompletePresenter) {

        'use strict';

        var template = Handlebars.compile(html_MultipleValueAutocompletePresenter);
        var badgeTooltip = [];
        var optionToolTip = [];
        var popup = [];
        var countConfigurations = 0;

        var MultipleValueAutocompletePresenter = function(options) {
            this._init(options);
            this._needToCallSolver = false;
        };

        /******************************* INITIALIZATION METHODS**************************************************/

        MultipleValueAutocompletePresenter.prototype._init = function(options) {
            var _options = options ? UWA.clone(options, false) : {};
            this._updateForBadge = false;
            this._updateForSuggestion = false;

            UWA.merge(this, _options);
            this._subscribeEvents();
            this._initDivs();
            this.inject(_options.parentContainer);
            this._render();
        };

        MultipleValueAutocompletePresenter.prototype._subscribeEvents = function() {
            var that = this;
            this.modelEvents.subscribe({
                event: 'OnSortResult'
            }, function(data) {
                that._sortAttribute = data.sortAttribute;
                that._sortOrder = data.sortOrder;
                var dataset = that._autocomplete.getDataset("_autocomplete");
                dataset.items = dataset.items.sort(function(a, b) {
                    var nameA, nameB;
                    if (that._sortAttribute === "displayName") {
                        nameA = a.displayName.toUpperCase();
                        nameB = b.displayName.toUpperCase();
                    }
                    if (that._sortAttribute === "sequenceNumber") {
                        nameA = parseInt(a.sequenceNumber);
                        nameB = parseInt(b.sequenceNumber);
                    }
                    if (that._sortOrder === "DESC") {
                        var temp = nameA;
                        nameA = nameB;
                        nameB = temp;
                    }
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            });

        };

        MultipleValueAutocompletePresenter.prototype._initDivs = function() {
            this._container = document.createElement('div');
            this._container.innerHTML = template({
                nls: nlsConfiguratorKeys,
                items: this.variant.optionPhysicalIds,
                context: this
            });

            this._container = this._container.querySelector('.config-editor-multivalue-autocomplete');
            this.image = this.imageContainer.querySelector(".configurator-img-thumbnail");
            this._validateCheckContainer = this._container.querySelector('.config-editor-validate-badge-check');


        };

        MultipleValueAutocompletePresenter.prototype.inject = function(parentcontainer) {
            this._parentcontainer = parentcontainer;
            parentcontainer.appendChild(this._container);
        };

        /*******************************AUTOCOMPLETE CREATION***************************************************/

        MultipleValueAutocompletePresenter.prototype._render = function() {
            var that = this;
            this._autocomplete = new Autocomplete({
                multiSelect: true,
                showSuggestsOnFocus: true,
                placeholder: nlsConfiguratorKeys.type,
                events: {
                    onSelect: function(item) {
                        that._onSelect(item);
                    },
                    onUnselect: function(item) {
                        that._onUnselect(item);
                    },
                    onShowSuggests: function(item, dataset) {
                        if (!that._isAlreadyVisible || that.configModel.getRulesMode() !== "RulesMode_SelectCompleteConfiguration") {
                            that._onShowSuggests(item, this);
                            that._isAlreadyVisible = true;
                        }
                    },
                    onFocus: function() {
                        console.log(that._autocomplete.getFocusedItem());
                        var variantName = that.configModel.getFeatureDisplayNameWithId(that.variant.ruleId);
                        var searchBox = document.querySelector('.autocomplete-input');
                        var value = searchBox ? searchBox.value : "";
                        var text = that.searchValue || value;
                        if (variantName.toUpperCase().contains(text.toUpperCase())) {
                            this.showAll(); //show all in case variant has match
                        } else {
                            if (text && text !== "")
                                that._autocomplete.getSuggestions(text);
                            else {
                                this.showAll();
                            }
                        }
                    },
                    onHideSuggests: function() {
                        that._isAlreadyVisible = false;
                        if (that._pcDdInteractionToken) {
                            that.modelEvents.unsubscribe(that._pcDdInteractionToken);
                            that._pcDdInteractionToken = undefined;
                        }
                        if (that._needToCallSolver) {
                            that.callSolver();
                            that._needToCallSolver = false;
                        }
                    }
                }
            }).inject(this._container);
            var _variantDataset = this._createDataset();
            var _datasetConfiguration = this._createConfigurations();
            this._autocomplete.addDataset(_variantDataset, _datasetConfiguration);

            if (this.variant && this.variant.options && this.variant.options.length > 5) {
                this._showMore = this._container.querySelector('.config-editor-autocomplete-show-more');
                this._showLess = this._container.querySelector('.config-editor-autocomplete-show-less');

                this._autocomplete.elements.inputContainer.appendChild(this._showMore);
                this._autocomplete.elements.inputContainer.appendChild(this._showLess);
                this._showMore.onclick = function() {
                    that._showBadges();
                    that._showLess.style.display = "inline-block";
                    that._showMore.style.display = "none";
                };
                this._showLess.onclick = function() {
                    that._hideBadges();
                    that._showLess.style.display = "none";
                    that._showMore.style.display = "inline-block";
                };

            }
             //R14 update dropdown item states.
             this.updateSelections();
        };

            /*******************************AUTOCOMPLETE INITIALIZATION - ADD DATA************************************/

            MultipleValueAutocompletePresenter.prototype._createDataset = function() {
                var dataset = {
                    name: "_autocomplete",
                    items: []
                };
                if (this.variant && this.variant.options && this.variant.options.length > 0) {
                    //sort by seq number
                    this.variant.options = this.variant.options.sort(function(a, b) {
                        var nameA = parseInt(a.sequenceNo); //a.displayName.toUpperCase();
                        var nameB = parseInt(b.sequenceNo); //b.displayName.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    for (var i = 0; i < this.variant.options.length; i++) {
                        var state = this.configModel.getStateWithId(this.variant.options[i].id) || this.configModel.getStateWithId(this.variant.optionPhysicalIds[i]);
                        var selectedFromStart = false;
                        if (state == "Chosen" || state == "Default" || state == "Required") {
                            selectedFromStart = true;
                        }

                        dataset.items.push({
                            mainId: this.variant.options[i].id,
                            // value: this.variant.optionPhysicalIds[i],
                            value: this.variant.options[i].ruleId,
                            label: this.variant.options[i].displayName,
                            disabled: false,
                            selected: selectedFromStart,
                            closable: true,
                            selectable: true,
                            icon: "",
                            state: state,
                            conflicting: false,
                            included: "",
                            ruleId: this.variant.options[i].ruleId,
                            // optionId : this.variant.optionPhysicalIds[i],
                            optionId: this.variant.options[i].ruleId,
                            tooltip: "",
                            selectionCriteria: this.variant.selectionCriteria,
                            variantId: this.variant.ruleId,
                            image: this.variant.options[i].image,
                            displayName: this.variant.options[i].displayName,
                            sequenceNumber: this.variant.options[i].sequenceNumber
                        });
                    }
                }
                return dataset;
            };

            /*******************************AUTOCOMPLETE INITIALIZATION - UPDATE DISPLAY FORMAT************************************/

            MultipleValueAutocompletePresenter.prototype._createConfigurations = function() {
                return {
                    templateEngine: function(itemContainer, itemDataset, item) {
                        itemContainer.addClassName('default-template');
                        var icon = "fonticon";
                        if (item.icon && item.icon !== '') icon = "suggestion-icon fonticon fonticon-" + item.icon;
                        if (item.icon === 'alert') icon = icon + " conflict-icon";
                        var content = UWA.createElement('span', {
                            id: "DD-item-" + item.value,
                            'class': "suggestion-icon " + icon
                        });
                        var contentForDefault = UWA.createElement('span', {
                            id: "Default-DD-item-" + item.value,
                            'class': "contentForDefault fonticon fonticon-star"
                        });
                        contentForDefault.hide();
                        itemContainer.setHTML(content.outerHTML + '<div class="item-label">' + UWA.String.escapeHTML(item.label) + '</div>' + contentForDefault.outerHTML);
                    }.bind(this)
                };
            };

            /*******************************AUTOCOMPLETE EVENTS HANDLING - SELECTION***********************************************/

            MultipleValueAutocompletePresenter.prototype._onSelect = function(item) {
                this.imageContainer.classList.add('cfg-image-selected');
                if (this.configModel.getLoading(this.variant.ruleId) === "Loaded") {

                    var newItemState = item.state;
                    var oldItemState = this.configModel.getStateWithId(item.ruleId);
                    // R14: ignore required (false positive) for onSelect
                    if(oldItemState === 'Required')
                        return;

                    if (item.included) {
                        if (item.state === ConfiguratorVariables.Dismissed) {
                            newItemState = ConfiguratorVariables.Unselected; //virtually selected
                            this.configModel.setUpdateRequiredOption(item.value, true);
                            this.configModel.setStateWithId(item.value, newItemState);
                        }
                    } else {
                        if (item.state === ConfiguratorVariables.Unselected) {
                            var defaultItem = this._find(this.defaults, item.value);
                            newItemState = defaultItem ? ConfiguratorVariables.Unselected : ConfiguratorVariables.Chosen;
                        }
                        if (item.state === ConfiguratorVariables.Dismissed) {
                            newItemState = ConfiguratorVariables.Default;
                        }
                        this.configModel.setUpdateRequiredOption(item.value, true);
                        this.configModel.setStateWithId(item.value, newItemState);
                    }
                    if (!this.configModel.getFirstSelection() && newItemState == ConfiguratorVariables.Chosen) {
                        this.configModel.setFirstSelection(true);
                    }
                    //R14 if there is no change item state change => no need to call solver
                    if (oldItemState !== newItemState) {
                        this._needToCallSolver = true;
                    }
                }
            };

            /*******************************AUTOCOMPLETE EVENTS HANDLING - UNSELECTION*********************************************/

            MultipleValueAutocompletePresenter.prototype._onUnselect = function(item) {
                var selections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems : [];
                if (selections.length == 0) {
                    this.imageContainer.classList.remove('cfg-image-selected');
                }
                if (this.configModel.getLoading(this.variant.ruleId) === "Loaded") {
                    var newItemState = item.state;
                    var build_mode = this.configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Build;

                    if (build_mode || (!build_mode && selections.length > 0)) {
                        if (item.state === ConfiguratorVariables.Default || item.state === ConfiguratorVariables.Selected) {
                            newItemState = ConfiguratorVariables.Dismissed; //Reject Default
                        } else {
                            newItemState = ConfiguratorVariables.Unselected;
                        }
                    } else {
                        newItemState = ConfiguratorVariables.Unselected;
                        // if (!item.included) {
                        //     for (var k = 0; k < this.variant.options.length; k++) {
                        //         this.configModel.setStateWithId(this.variant.optionPhysicalIds[k], ConfiguratorVariables.Unselected);
                        //         this.configModel.setIncludedState(this.variant.optionPhysicalIds[k], 'Included');
                        //         this.configModel.setIncludedState(this.variant.ruleId, 'Included');
                        //     }
                        // }
                    }
                    this.configModel.setUpdateRequiredOption(item.value, true);
                    this.configModel.setStateWithId(item.value, newItemState);
                    this.callSolver(item);
                }
            };

            /*******************************AUTOCOMPLETE EVENTS HANDLING - UPDATE SUGGESTIONS**************************************/

            MultipleValueAutocompletePresenter.prototype._onShowSuggests = function(item, self) {
                this.configModel.setLoading(this.variant.ruleId, "Loaded");
                // this.modelEvents.publish({event:'hideUnreferencedDD', data : {currentAutocomplete : this}});
                var idsToDiagnose = [];
                var configurationCriteria = [];
                var _variantForDiagnosis;

                var items = this._autocomplete.getItems();
                for (var i = 0; i < items.length; i++) {
                    idsToDiagnose.push(items[i].optionId);
                    this.configModel.setVariantForDiagnosis(items[i].variantId);
                    _variantForDiagnosis = items[i].variantId;
                    configurationCriteria.push({
                        'Id': items[i].optionId,
                        "State": items[i].state
                    });
                    this._updateIconInDD(items[i]);
                }

                this.onComplete = false;
                var that = this;
                if (this.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration" && this.configModel.isSolveWithDiagnose()) {
                    var suggestContent = self.getContent().getElement('.autocomplete-suggests') || self.elements.suggestsContainer;
                    if (!this._pcDdInteractionToken) {
                        this._pcDdInteractionToken = this.modelEvents.subscribe({
                            event: 'pc-dd-interaction-complete'
                        }, function(e) {
                            Mask.unmask(suggestContent);
                            suggestContent.style.opacity = 1;
                            that.onComplete = true;
                            if (that._isAlreadyVisible && that.configModel.isConfigCriteriaUpdated()) {
                                that.onComplete = false;
                                that.callSolverOnSelectedIDs({
                                    "idsToDiagnose": idsToDiagnose,
                                    "configurationCriteria": configurationCriteria
                                });
                                Mask.mask(suggestContent);
                                that.configModel.setDignosedVariant(_variantForDiagnosis, true);
                            }
                        });
                    }
                    //&& if config criteria is not updated
                    if (this.configModel.getFirstSelection() &&
                        (this.configModel.isConfigCriteriaUpdated() ||
                            (!this.configModel.isConfigCriteriaUpdated() && !this.configModel.getDignosedVariant(_variantForDiagnosis))
                        )
                    ) {
                        this.callSolverOnSelectedIDs({
                            "idsToDiagnose": idsToDiagnose,
                            "configurationCriteria": configurationCriteria
                        });
                        if (!this.onComplete) {
                            Mask.mask(suggestContent);
                            // suggestContent.style.opacity = 0.5;
                        }
                        this.configModel.setDignosedVariant(_variantForDiagnosis, true);
                    }
                }

            };

            /********************************FUNCTIONALITIES - CALL SOLVER BASED ON RULES SELECTION******************************/

            MultipleValueAutocompletePresenter.prototype.callSolver = function(item) {
                this.modelEvents.publish({
                    event: 'pc-interaction-started',
                    data: {}
                });
                if (this.configModel.getRulesActivation() === ConfiguratorVariables.str_true) {
                    if (this.configModel.getLoading(this.variant.ruleId) === "Loaded") {
                        this.modelEvents.publish({
                            event: 'SolverFct_CallSolveMethodOnSolver',
                            data: {}
                        });
                    }
                } else {
                    this.updateFilters();
                    this.modelEvents.publish({
                        event: 'solveAndDiagnoseAll_SolverAnswer'
                    });
                    /*if(this.configModel.getSelectionMode() === "selectionMode_Refine"){
                    	this.enforceRequired();
                    }*/
                }
            };

            MultipleValueAutocompletePresenter.prototype.callSolverOnSelectedIDs = function(idsToDiagnose) {
                // this.modelEvents.publish({event:'pc-interaction-started', data : {}});
                if (this.configModel.getRulesActivation() === ConfiguratorVariables.str_true) {
                    if (this.configModel.getLoading(this.variant.ruleId) === "Loaded") {
                        this.modelEvents.publish({
                            event: 'SolverFct_CallSolveOnSelectedIDsMethodOnSolver',
                            data: idsToDiagnose
                        });
                    }
                } else {
                    this.updateFilters();
                    this.modelEvents.publish({
                        event: 'solveAndDiagnoseAll_SolverAnswer'
                    });
                }
            };

            /********************************FUNCTIONALITIES - UPDATE VIEW - MAIN METHOD******************************************/

            MultipleValueAutocompletePresenter.prototype.enforceRequired = function(data) {
                if (data && data.answerMethod === "solveAndDiagnose" && this.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration") {
                    if (this.configModel.getVariantForDiagnosis() === this.variant.ruleId) {
                        this.updateSelections(data);
                        this.configModel.setConfigCriteriaUpdated(false);
                    }
                } else {
                    this.updateSelections(data);
                }
            };

            MultipleValueAutocompletePresenter.prototype.updateSelections = function(data) {
                var that = this,
                    variantSelectedByRule = false,
                    variantSelectedByUser = false,
                    conflictingOption = false;
                var length = this.variant.options.length;
                this.defaults = data ? data.answerDefaults : [];
                // firstCall = data ? data.firstCall : false;

                this.configModel.setFeatureIdWithRulesStatus(this.variant.ruleId, false);
                this.configModel.setFeatureIdWithChosenStatus(that.variant.ruleId, false);
                this.configModel.setUserSelectVariantIDs(that.variant.ruleId, false);

                for (var i = 0; i < length; i++) {
                    var _updateRequired = true; // this.configModel.getUpdateRequiredOption(this.variant.optionPhysicalIds[i]);
                    //var _refineMode = (this.configModel.getSelectionMode() !== "selectionMode_Build");
                    // var _xor = (_updateRequired || _refineMode) && !(_updateRequired && _refineMode);
                    if (_updateRequired) {

                        var item = this._getRequiredData(i);

                        this._loadData(item);
                        this._updateIcons(item);
                        this._updateBadge(item);
                        this._updateIconInDD(item); //Required here for the scenarios when selection in same DD - show suggests not triggered when suggests are already shown.
                        // this._updateImage(this.variant.options[i], item.selected);
                        this._updateItem(item);
                        conflictingOption = conflictingOption || item.conflicting;
                        if (item.selectedByRules) variantSelectedByRule = true;
                        if (item.selectedByUser) variantSelectedByUser = true;
                        this.configModel.setUIUpdated(this.variant.optionPhysicalIds[i], true);
                    }
                }

                var _cntSelections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems.length : 0;

                if (_cntSelections == 1) {
                    if (this._autocomplete.selectedItems[0].image && this.image)
                        this.image.src = this._autocomplete.selectedItems[0].image;
                } else {
                    if (this.variant.image && this.image)
                        this.image.src = this.variant.image;
                }
                if (conflictingOption && this.configModel.getRulesActivation() === "true") {
                    this.image.parentElement.style.borderColor = "red";
                    this._autocomplete.elements.inputContainer.addClassName("config-editor-multi-input-parent-conflict");
                } else {
                    this.image.parentElement.style.borderColor = "#b1b1b1";
                    this._autocomplete.elements.inputContainer.removeClassName("config-editor-multi-input-parent-conflict");
                }

                this.configModel.setFeatureIdWithRulesStatus(this.variant.ruleId, variantSelectedByRule);
                this.configModel.setFeatureIdWithChosenStatus(that.variant.ruleId, variantSelectedByUser);
                if (item && (item.state === "Chosen" || item.state === "Dismissed" || item.state === "Required" || item.state === "Default")) {
                    this.configModel.setUserSelectVariantIDs(item.variantId, true);
                }

                this.updateFilters();
                if (length > 5) this._updateBadgeInitialVisibility();

                /**Special case : when earlier non-refined variant becomes eligible for refined variant on deselection**/
                /*if(this.configModel.getSelectionMode() !== "selectionMode_Build" && !this.configModel.getIncludedState(this.variant.ruleId)){
                	var selectedVariant = this.configModel.getFeatureIdWithStatus(this.variant.ruleId);
                	if(!selectedVariant){
                		this._setIncludedState();
                		for (var i = 0; i < this.variant.optionPhysicalIds.length; i++) {
                			this.configModel.setUpdateRequiredOption(this.variant.optionPhysicalIds[i], true);
                		}
                		this.enforceRequired();
                	}
                }*/
            };

            /********************************FUNCTIONALITIES - APPLY REFINE VIEW**************************************************/

            /*	MultipleValueAutocompletePresenter.prototype.refineView = function(enable){
				var selectedVariant = this.configModel.getFeatureIdWithStatus(this.variant.ruleId);
				var allVariants = this.configModel.getVariants();
				if(countConfigurations >= allVariants){
					countConfigurations = 0;
				}

				if(enable){
					selectedVariant ? this.configModel.setFeatureIdWithUserSelection(this.variant.ruleId, true) : this._setIncludedState();
				}else{
					this._unsetIncludedState();
					this.configModel.setConfigurationCriteria(this.configModel.getCriteriaBuildMode());
				}
				countConfigurations++ ; //increase count for each variant

				this._BuildModeCriteria = JSON.parse(JSON.stringify( this.configModel.getConfigurationCriteria() ));
				if(countConfigurations === allVariants) {
					if(enable){
						this.configModel.setCriteriaBuildMode(this._BuildModeCriteria);
					}
					if(this.configModel.getRulesActivation() === ConfiguratorVariables.str_true){
						this.modelEvents.publish({event:'SolverFct_CallSolveMethodOnSolver', data : {}});
					}else{
						this.modelEvents.publish({event:'solveAndDiagnoseAll_SolverAnswer', data:	this.configModel.getConfigurationCriteria()});
					}
				}

				// if(this.configModel.getRulesActivation() === ConfiguratorVariables.str_true){
				// 	if(countConfigurations === allVariants) {
				// 		if(enable){
				// 			this.configModel.setCriteriaBuildMode(this.configModel.getConfigurationCriteria());
				// 		}
				// 		this.modelEvents.publish({event:'SolverFct_CallSolveMethodOnSolver', data : {}});
				// 	}
				// }else{
				// 	this._BuildModeCriteria = JSON.parse(JSON.stringify( this.configModel.getConfigurationCriteria() ));
				// 	if(countConfigurations === allVariants) {
				// 		if(enable){
				// 			this.configModel.setCriteriaBuildMode(this._BuildModeCriteria);
				// 		}
				// 		this.modelEvents.publish({event:'solveAndDiagnoseAll_SolverAnswer', data:	this.configModel.getConfigurationCriteria()});
				// 	}
				// 	// this.enforceRequired();
				// 	// this.modelEvents.publish({event:'updateAllFilters', data : {}});
				// }
			};
*/
            /*******************************UPDATE VIEW RELATED HELPER METHODS******************************************/

            MultipleValueAutocompletePresenter.prototype._getRequiredData = function(i) {
                var item = this._autocomplete.getItem(this.variant.optionPhysicalIds[i]) || {};
                var state = this.configModel.getStateWithId(item.value) || this.configModel.getStateWithId(item.mainId);
                if (item) {
                    item.state = state || "Unselected";
                }
                item.conflicting = this.configModel.isConflictingOption(item.ruleId);
                //item.included = this.configModel.getIncludedState(item.value);

                this._updateItem(item);
                return item;
            };

            /*******************************UPDATE VIEW : LOAD DATA****************************************************/

            MultipleValueAutocompletePresenter.prototype._loadData = function(item) {
                this.configModel.setLoading(this.variant.ruleId);
                var selectedState;
                this._autocomplete.enableItem(item.id);
                var rules = this.configModel.getRulesActivation() === ConfiguratorVariables.str_true;

                // switch (item.state) {
                // case ConfiguratorVariables.Default: case ConfiguratorVariables.Required: case ConfiguratorVariables.Selected:
                // 	selectedState = rules ? true : false;
                // 	break;
                // case ConfiguratorVariables.Chosen:
                // 	selectedState = rules ? true : item.conflicting ? false : true;
                // 	break;
                // case ConfiguratorVariables.Unselected:
                // 	selectedState = item.included ? true : false;
                // 	break;
                // default :
                // 	selectedState = rules ? item.conflicting ? true : false : false;
                // break;
                // }

                switch (item.state) {
                    case ConfiguratorVariables.Default:
                    case ConfiguratorVariables.Required:
                    case ConfiguratorVariables.Selected:
                        selectedState = rules;
                        break;
                    case ConfiguratorVariables.Chosen:
                        selectedState = true;
                        break;
                    case ConfiguratorVariables.Unselected:
                        selectedState = item.included;
                        break;
                    default:
                        selectedState = false;
                        break;
                }

                selectedState = !item.state ? item.included : selectedState;
                // if(item.conflicting && rules) selectedState = true;
                // (item.selected && selectedState) ? "" : this._autocomplete.toggleSelect(item,"",selectedState);
                if ((item.selected || selectedState) && !(item.selected && selectedState)) {
                    this._autocomplete.toggleSelect(item);
                }
                if (item.disable) {
                    this._autocomplete.disableItem(item.id);
                }
                // item.disable ? this._autocomplete.disableItem(item.id) : this._autocomplete.enableItem(item.id);
                this.configModel.setLoading(this.variant.ruleId, "Loaded");
            };

            /*******************************UPDATE VIEW : MODIFY ICONS***********************************************/

            MultipleValueAutocompletePresenter.prototype._updateIcons = function(item) {
                var rules = this.configModel.getRulesActivation() === ConfiguratorVariables.str_true;
                var icon;
                switch (item.state) {
                    case ConfiguratorVariables.Default:
                        icon = rules ? "star" : "";
                        break;
                    case ConfiguratorVariables.Required:
                        icon = rules ? "lock" : "";
                        break;
                    case ConfiguratorVariables.Incompatible:
                        icon = rules ? "block" : "";
                        break;
                    case ConfiguratorVariables.Dismissed:
                        icon = "user-delete";
                        break;
                    case ConfiguratorVariables.Selected:
                        icon = "lightbulb";
                        break;
                    default:
                        icon = "";
                        break;
                }
                if (item.conflicting && rules) icon = "alert";
                this._updateItem(item, {
                    icon: icon
                });
            };

            /****************************************UPDATE VIEW : GENERATE TOOLTIP MESSAGE****************************************/

            MultipleValueAutocompletePresenter.prototype._updateTooltipMessages = function(item) {
                var message = "";
                if (item.conflicting && item.conflicting == true) {
                    message = this.getConflictingMessage(item.value);
                } else {
                    message = nlsConfiguratorKeys.Loading;
                    this.modelEvents.publish({
                        event: 'SolverFct_getResultingStatusOriginators',
                        data: {
                            value: item.optionId
                        }
                    });

                    // switch (item.state) {
                    // case ConfiguratorVariables.Incompatible: case ConfiguratorVariables.Required:
                    // 	message = nlsConfiguratorKeys.Loading;
                    // 	this.modelEvents.publish({event:'SolverFct_getResultingStatusOriginators', data : {value : item.ruleId}});
                    // 	break;
                    // case ConfiguratorVariables.Default:
                    // 	message = item.label + " " + nlsConfiguratorKeys.is + " " + nlsConfiguratorKeys["Default selected"];
                    // 	break;
                    // case ConfiguratorVariables.Dismissed:
                    // 	message = item.label + " " + nlsConfiguratorKeys.is + " " + nlsConfiguratorKeys["Dismissed by the user"];
                    // 	break;
                    // default :
                    // 	break;
                    // }
                    // /**Default in compatible mode, seen as chosen but star is present**/
                    // if(this.defaults && this.configModel.getRulesMode() === "RulesMode_DisableIncompatibleOptions"){
                    // 	if(this.defaults.indexOf(item.ruleId) !== -1){
                    // 		message = item.label + " " + nlsConfiguratorKeys.is + " " + nlsConfiguratorKeys.Default;
                    // 	}
                    // }
                }
                this.setTooltipMessage(item.value, message);
            };

            /****************************************UPDATE VIEW : CACHE TOOLTIP MESSAGE******************************************/

            MultipleValueAutocompletePresenter.prototype.setTooltipMessage = function(option, message) {
                var item = this._autocomplete.getItem(option);
                this._updateItem(item, {
                    tooltip: message
                });
                this._updateSuggestionPopup(item);
                this._updateBadgePopup(item);
            };

            /****************************************UPDATE VIEW : CREATE TOOLTIP AND SET MESSAGE*********************************/

            MultipleValueAutocompletePresenter.prototype._updateSuggestionPopup = function(item) {
                if (this._updateForSuggestion) {
                    popup[item.value].setBody(item.tooltip);
                    popup[item.value].getContent().addClassName('cfg-custom-popup');
                    setTimeout(function() {
                        if (popup[item.value].elements.container.offsetWidth === 0) {
                            popup[item.value].toggle();
                        }
                    }, 100);
                    // popup[item.value].toggle(); //Added due to autoposition issue on content change in webux/pop
                    // popup[item.value].toggle(); //To be removed once it is handled by component itself;
                }
            };

            MultipleValueAutocompletePresenter.prototype._updateBadgePopup = function(item) {
                if (this._updateForBadge) {
                    badgeTooltip[item.value].setBody(item.tooltip);
                    badgeTooltip[item.value].getContent().addClassName('cfg-custom-popup');
                    setTimeout(function() {
                        if (badgeTooltip[item.value].elements.container.offsetWidth === 0) {
                            badgeTooltip[item.value].toggle();
                        }
                    }, 100);
                    // badgeTooltip[item.value].toggle(); //Added due to autoposition issue on content change in webux/pop
                    // badgeTooltip[item.value].toggle(); //To be removed once it is handled by component itself;
                }
            };

            /*******************************UPDATE VIEW : SET ICON IN BADGE AND SUGGESTIONS**************************************/

            MultipleValueAutocompletePresenter.prototype._updateBadge = function(item) {
                var currentBadge, badges = this._autocomplete.badges,
                    that = this;
                for (var i = 0; i < badges.length; i++) {
                    if (badges[i].options.id === ("selected-" + item.id)) {
                        currentBadge = badges[i];
                        currentBadge.setClosable(item.closable);
                        currentBadge.setIcon(item.icon);

                        if (this.configModel.isValidationEnabled()) {
                            var checkIcon = currentBadge.elements.container.querySelector(".config-editor-validate-badge-check");
                            if (item.state === ConfiguratorVariables.Default || item.state === ConfiguratorVariables.Required || item.state === ConfiguratorVariables.Selected) {
                                if (!checkIcon) {
                                    var _validateCheckContainer = UWA.createElement('span', {
                                        'class': "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-check config-editor-validate-badge-check"
                                    });
                                    currentBadge.elements.container.insertBefore(_validateCheckContainer, currentBadge.elements.cross);
                                    _validateCheckContainer.onclick = function(item, evt) {
                                        this.style.display = "none";
                                        that.configModel.setFeatureIdWithChosenStatus(that.variant.ruleId, true);
                                        that.configModel.setValidateVariant(that.variant.ruleId, true);
                                        that.configModel.setStateWithId(item.optionId, ConfiguratorVariables.Chosen);
                                        //Updating the new behavior only for complete mode.
                                        //To be updated for all rule modes after impact analysis.
                                        if (that.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration") {
                                            evt.preventDefault();
                                            evt.stopPropagation();
                                            that.updateSelections();
                                            that.modelEvents.publish({
                                                event: 'updateAllFilters',
                                                data: {}
                                            });
                                        } else {
                                            that.callSolver();
                                        }
                                    }.bind(_validateCheckContainer, item);
                                }
                            } else {
                                if (checkIcon) {
                                    checkIcon.remove();
                                }
                            }
                        }

                        if (currentBadge.elements.icon)
                            item.icon === "alert" ? currentBadge.elements.icon.addClassName('conflict-icon') : currentBadge.elements.icon.removeClassName('conflict-icon');

                        if (!badgeTooltip[item.value] || (badgeTooltip[item.value] && !badgeTooltip[item.value].target.isInjected())) {
                            badgeTooltip[item.value] = new WUXPopup({
                                target: currentBadge.elements.icon,
                                trigger: 'click',
                                position: 'top'
                            });
                        }

                        currentBadge.elements.icon.onclick = function() {
                            that._updateForBadge = true; //To be removed on receiving udpates from webux
                            that._updateForSuggestion = false; //To be removed on receiving udpates from webux
                            that._updateTooltipMessages(this);
                        }.bind(item);
                        break;
                    }
                }
            };

            MultipleValueAutocompletePresenter.prototype._updateIconInDD = function(item) {
                var message = '',
                    suggestion, iconDiv, that = this,
                    contentForDefault;
                if (item.elements) {
                    suggestion = this._autocomplete.elements.container.getElement('#autocomplete-item-' + item.id);
                    if (suggestion) {
                        if (suggestion.hasClassName('disabled')) {
                            suggestion.removeClassName('disabled');
                        }
                        if (suggestion.hasClassName('conflict-icon')) {
                            suggestion.removeClassName('conflict-icon');
                        }
                        iconDiv = suggestion.getElementsByClassName('fonticon')[0];
                        contentForDefault = suggestion.getElements('#Default-DD-item-' + item.value)[0];
                        if (contentForDefault) contentForDefault.hide();
                        // /**Handling default in compatible mode.**/
                        // if(this.defaults && this.configModel.getRulesMode() === "RulesMode_DisableIncompatibleOptions"){
                        // 	if(this.defaults.indexOf(item.ruleId) !== -1){
                        // 		item.icon = "star";
                        // 	}
                        // }
                        /**showing star on right side in dismissed/required state or in compatible mode*/
                        if (this.defaults && contentForDefault && item.state !== ConfiguratorVariables.Default) {
                            if (this.defaults.indexOf(item.ruleId) !== -1) {
                                contentForDefault.show();
                            }
                        }
                        if (iconDiv && item.icon) {
                            popup[item.value] = new WUXPopup({
                                target: iconDiv,
                                trigger: 'click',
                                position: 'top'
                            });
                            iconDiv.onclick = function(e) {
                                e.stopPropagation(); //Prevent trigger from item selection
                                that._updateForBadge = false; //To be removed on receiving udpates from webux
                                that._updateForSuggestion = true; //To be removed on receiving udpates from webux
                                that._updateTooltipMessages(this);
                            }.bind(item);
                            iconDiv.className = "suggestion-icon fonticon fonticon-" + item.icon;
                            if (item.icon === 'block') {
                                suggestion.addClassName('disabled');
                            }
                            if (item.icon === 'alert') {
                                suggestion.addClassName('conflict-icon');
                            }
                        } else {
                            if (iconDiv) {
                                iconDiv.className = "suggestion-icon fonticon";
                                if (popup[item.value]) {
                                    popup[item.value].elements.container.destroy();
                                    //popup[item.value].destroy();
                                    //delete popup[item.value];
                                }
                            }
                        }
                    }
                }
            };

            /****************************************UPDATE VIEW : UPDATE IMAGE AS PER CF/CO************************************/

            MultipleValueAutocompletePresenter.prototype._updateImage = function(optionObj, selected) {
                var variantImage;
                if (this._autocomplete.selectedItems && this._autocomplete.selectedItems.length > 0) {
                    variantImage = this._autocomplete.selectedItems.length > 1;
                } else {
                    variantImage = true;
                }
                var image = this.image;
                if (image && image[0]) {
                    if (variantImage) {
                        if (this.variant.image !== "")
                            image[0].src = this.variant.image;
                    } else if (variantImage == false) {
                        if (selected && optionObj && optionObj.image !== "")
                            image[0].src = optionObj.image;
                    }
                }
            };

            /*******************************UPDATE VIEW : HANDLE MUST/MAY FEATURES AND INCLUSION RULES***************************/

            MultipleValueAutocompletePresenter.prototype.updateFilters = function() {
                var variantState = this.configModel.getStateWithId(this.variant.ruleId);
                var mandatory = (this.variant.selectionCriteria === 'Must' || this.variant.selectionCriteria === true);
                var mandStatus = (mandatory || variantState === ConfiguratorVariables.Required);
                var selectedFeature;
                if (this._autocomplete.selectedItems && this._autocomplete.selectedItems.length > 0) {
                    mandStatus = false;
                    selectedFeature = true;
                } else {
                    selectedFeature = false;
                }

                if (variantState === "Incompatible") {
                    if (!this.configModel.getUserSelectVariantIDs(this.variant.ruleId))
                        selectedFeature = false;
                }

                // if(this._container.offsetParent && this._container.offsetParent.style.display === "none"){
                // 	selectedFeature = false;
                // }

                this.configModel.setFeatureIdWithMandStatus(this.variant.ruleId, mandStatus);
                this.configModel.setFeatureIdWithStatus(this.variant.ruleId, selectedFeature);
                // this.modelEvents.publish({event:'updateAllFilters', data : {}});
            };

            /********************************REFINE MODE - INCLUDED STATE GETTER SETTER***********************************/

            /*	MultipleValueAutocompletePresenter.prototype._setIncludedState = function(){
				for(var i=0; i < this.variant.options.length; i++) {
					var item = this._getRequiredData(i);
					this.configModel.setIncludedState(item.value, 'Included');
					this.configModel.setIncludedState(item.variantId, 'Included');
					this._loadData(item);
				}
			};

			MultipleValueAutocompletePresenter.prototype._unsetIncludedState = function(){
				for(var i=0; i < this.variant.options.length; i++) {
					var item = this._getRequiredData(i);
					if(item.included === 'Included'){
						this.configModel.setIncludedState(item.value);
						this.configModel.setIncludedState(item.variantId);
					}
					this._loadData(item);
				}
			}
*/
            /******************************************UTILITIES**********************************************************/

            MultipleValueAutocompletePresenter.prototype._find = function(array, id) {
                if (array) {
                    array.forEach(function(item) {
                        if (item === id) {
                            return item;
                        }
                    });
                }
            };

            MultipleValueAutocompletePresenter.prototype._showBadges = function() {
                var selections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems.length : 0;
                for (var i = 0; i < selections; i++) {
                    this._autocomplete.badges[i].show();
                    this._autocomplete.innerInputs[i].show();
                }
            };

            MultipleValueAutocompletePresenter.prototype._hideBadges = function() {
                var selections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems.length : 0;
                if (selections > 3) {
                    for (var i = 0; i < selections; i++) {
                        var criteria = i < (selections - 3);
                        if (criteria) {
                            this._autocomplete.badges[i].hide();
                            this._autocomplete.innerInputs[i + 1].hide();
                        } else {
                            this._autocomplete.badges[i].show();
                            if (this._autocomplete.innerInputs[i + 1])
                                this._autocomplete.innerInputs[i + 1].show();
                        }
                    }
                }
            };

            MultipleValueAutocompletePresenter.prototype._updateBadgeInitialVisibility = function() {
                var selections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems.length : 0;
                if (selections > 3) {
                    if (this._showMore.style.display !== "inline-block" && this._showLess.style.display !== "inline-block") {
                        this._hideBadges();
                        this._showLess.style.display = "none";
                        this._showMore.style.display = "inline-block";
                    } else if (this._showMore.style.display === "inline-block") {
                        this._hideBadges();
                    } else if (this._showLess.style.display === "inline-block") {
                        this._showBadges();
                    }
                } else {
                    this._showBadges();
                    this._showMore.style.display = "none";
                    this._showLess.style.display = "none";
                }
            };


            MultipleValueAutocompletePresenter.prototype._updateItem = function(item, object) {
                if (item) {
                    var rules = this.configModel.getRulesActivation() === ConfiguratorVariables.str_true;
                    // object = object ? object : {};
                    if (object) {
                        item.icon = (object.icon || object.icon === "") ? object.icon : item.icon;
                        item.tooltip = (object.tooltip || object.tooltip === "") ? object.tooltip : item.tooltip;
                    }
                    item.closable = item.selected ? !(item.state === "Selected" || item.state === "Required") : true;
                    item.selectedByRules = rules ? (item.icon && item.selected) : false;
                    item.disable = rules ? (item.state === "Selected" || item.state === "Required" || item.state === "Incompatible") : false;
                    // item.disable =  rules ? (item.state === "Required" || item.state === "Incompatible") ? true : false : false;
                    item.selectedByUser = item.state === "Chosen";
                }
                return item;
            };

            MultipleValueAutocompletePresenter.prototype.getConflictingMessage = function(optionId) {
                var addAlso, message = '';
                var model = this.configModel;
                message = UWA.i18n("Option") + " " + model.getOptionDisplayNameWithId(optionId) + " " + UWA.i18n("is conflicting with") + " : ";
                var listOfListOfConflictingIds = model.getConflictingFeatures();
                var listOfListOfRulesImplied = model.getImpliedRules();
                //need to traverse the list again, to generate the text for tooltip

                for (var i = 0; i < listOfListOfConflictingIds.length; i++) {
                    if (listOfListOfConflictingIds[i].indexOf(optionId) != -1) {
                        if (addAlso) message += UWA.i18n("and also conflicting with") + " ";
                        var j;
                        for (j = 0; j < listOfListOfConflictingIds[i].length; j++) {
                            if (optionId != listOfListOfConflictingIds[i][j]) {
                                message += model.getFeatureDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "[" + model.getOptionDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "]";
                                addAlso = true;
                            }
                        }
                        if (listOfListOfRulesImplied.length > 0) {
                            for (j = 0; j < listOfListOfRulesImplied[i].length; j++) {
                                if (j == 0) {
                                    message += " " + UWA.i18n("ImpliedRules") + " : ";
                                }
                                var ruleName = model.getRuleDisplayNameWithId(listOfListOfRulesImplied[i][j]) || listOfListOfRulesImplied[i][j];
                                message += " " + ruleName;
                            }
                        }
                        break;
                    }
                }
                return message;
            };


            /********************************END OF MULTIVALUEPRESENTER*****************************************************/


        return MultipleValueAutocompletePresenter;

    });

define(
    'DS/ConfiguratorPanel/scripts/Presenters/CriteriaSelectorUtil',
    [
        'DS/ConfiguratorPanel/scripts/Models/DictionaryDataUtil',
        'DS/ConfiguratorPanel/scripts/Models/PCDataUtil'
    ],
    function(DictionaryDataUtil, PCDataUtil){
    'use strict';
		var criteriaSelectorUtil =  function(options){
      this._init(options);
    };

    criteriaSelectorUtil.prototype._init = function (options) {
      this._configModel = options.configModel;
      var dictionary = this._configModel.getDictionary();
      this._modelEvents = options.modelEvents;
      // this._dictionaryUtil = new DictionaryDataUtil({ dictionary : dictionary});
      // this._pcDataUtil = new PCDataUtil({ configModel : this._configModel, dictionaryUtil: this._dictionaryUtil, modelEvents: options.modelEvents});

  		this._dictionaryUtil = options.dictionaryDataUtil;
      this._pcDataUtil = options.pCDataUtil;

      this._componentMap = {};
      var that = this;
      this._eventListeners = {
        'select-criteria' : function (e) {
          that.publishEvent({event : 'pc-select-criteria-action', data : e.options});
        },
        'reject-criteria' : function (e) {
          that.publishEvent({event : 'pc-reject-criteria-action', data : e.options});
        },
        'validate-criteria' : function(e) {
          that.publishEvent({event : 'pc-validate-criteria-action', data : e.options});
        },
        'show-criteria' : function (e) {
          that.publishEvent({event : 'pc-diagnose-criteria-action', data : e.options});
        },
        'hide-criteria' : function (e) {
          console.log('On Hide');
        },
        'show-state-tooltip' : function (e) {
          that.publishEvent({event : 'pc-show-criteria-tooltip', data : e.options});
        },
        'update-height' : function (e) {
          that.publishEvent({event : 'pc-update-row-height', data : e.options});
        }
      };

      this._modelEvents.subscribe({event : 'pc-diagnose-criteria-done'}, function (data) {
        if(that._componentMap.hasOwnProperty(data.id)) {
          that._componentMap[data.id].showLoader = false;
        }
      });

    };

    criteriaSelectorUtil.prototype.getProperties = function (id) {
      var possibleValues = this.getPossibleValues(id);
      return {
        contentType : 1,
        multiValue : this._pcDataUtil.isMultiValue(id),
        possibleValues : possibleValues,
        asyncLoad : this._pcDataUtil.isUpdateRequired(id),
        value : this._pcDataUtil.getSelectedValue(id)
      };
    };

    criteriaSelectorUtil.prototype.getPossibleValues = function (id) {
      var values = this._dictionaryUtil.getValues(id);
      var possibleValues = [];
      values.forEach((item) => {
        possibleValues.push(UWA.merge(
            {
              state : this._pcDataUtil.getStateIcon(item),
              selectable : this._pcDataUtil.isSelectable(item),
              rejectable : this._pcDataUtil.hasRejectAction(item),
              validate : this._pcDataUtil.hasValidateAction(item),
              conflict : this._pcDataUtil.hasConflict(item),
            }, this._dictionaryUtil.getDetails(item)));
      });
      return possibleValues;
    };

    criteriaSelectorUtil.prototype.updateComponent = function (component, id) {
      if(this._componentMap[id] && UWA.is(this._componentMap[id].cleanContent, 'function')) {
        this._componentMap[id].cleanContent();
      }
      if(UWA.is(component.cleanContent, 'function')) {
        component.cleanContent();
      }

      var properties = this.getProperties(id);
      component.setProperties(properties);
      for (var eventName in this._eventListeners) {
        if (this._eventListeners.hasOwnProperty(eventName)) {
          component.removeEventListener(eventName, this._eventListeners[eventName]);
          component.addEventListener(eventName, this._eventListeners[eventName]);
        }
      }
      this._componentMap[id] = component;
    };

    criteriaSelectorUtil.prototype.updateTooltip = function (id, message) {
      if(this._componentMap.hasOwnProperty(id)) {
        this._componentMap[id].updateTooltipMessage(message);
      }
    };

    criteriaSelectorUtil.prototype.publishEvent = function (options) {
      var that = this;
      setTimeout(function () {
        that._modelEvents.publish(options);
      },10);
    };

		return criteriaSelectorUtil;
	}

);

/*jshint esversion: 6 */
define(
		'DS/ConfiguratorPanel/scripts/Presenters/DismissValueAutocompletePresenter',
		[
			'UWA/Core',
			'DS/Handlebars/Handlebars',
			'DS/UIKIT/Autocomplete',
			'DS/UIKIT/Mask',
			'DS/UIKIT/Tooltip',
			'DS/Controls/Popup',
			'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
			'DS/ConfiguratorPanel/scripts/Utilities',
			'DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctions',

			'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
			'text!DS/ConfiguratorPanel/html/MultipleValueAutocompletePresenter.html',

			'css!DS/UIKIT/UIKIT.css',
			"css!DS/ConfiguratorPanel/css/MultipleValueAutocompletePresenter.css"


			],
			function (UWA, Handlebars, Autocomplete, Mask, Tooltip,WUXPopup, ConfiguratorVariables, Utilities,ConfiguratorSolverFunctions, nlsConfiguratorKeys, html_MultipleValueAutocompletePresenter) {

			'use strict';

			var template = Handlebars.compile(html_MultipleValueAutocompletePresenter);
			var badgeTooltip = [];
			var optionToolTip = [];
			var popup =[];
			var countConfigurations = 0;

			var DismissValueAutocompletePresenter = function (options) {
				this._init(options);
				this._needToCallSolver = false;
			};

			/******************************* INITIALIZATION METHODS**************************************************/

			DismissValueAutocompletePresenter.prototype._init = function(options){
				var _options = options ? UWA.clone(options, false) : {};
				this._updateForBadge = false;
				this._updateForSuggestion = false;

				UWA.merge(this, _options);
				this._subscribeEvents();
				this._initDivs();
				this.inject(_options.parentContainer);
				this._render();
			};

			DismissValueAutocompletePresenter.prototype._subscribeEvents =function(){
				var that = this;
				this.modelEvents.subscribe({ event: 'OnSortResult'}, function(data){
					that._sortAttribute = data.sortAttribute;
					that._sortOrder = data.sortOrder;
					var dataset = that._autocomplete.getDataset("_autocomplete");
					dataset.items = dataset.items.sort(function(a, b) {
						var nameA,nameB;
						if(that._sortAttribute === "displayName"){
							nameA = a.displayName.toUpperCase();
							nameB = b.displayName.toUpperCase();
						}
						if(that._sortAttribute === "sequenceNumber"){
							nameA = parseInt(a.sequenceNumber);
							nameB = parseInt(b.sequenceNumber);
						}
						if (that._sortOrder === "DESC") {
							var temp = nameA;
							nameA = nameB;
							nameB = temp;
						}
						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						return 0;
					});
				});

			};

			DismissValueAutocompletePresenter.prototype._initDivs = function () {
				this._container = document.createElement('div');
				this._container.innerHTML = template({nls : nlsConfiguratorKeys, items : this.variant.optionPhysicalIds, context:this});

				this._container = this._container.querySelector('.config-editor-multivalue-autocomplete');
				this.image = this.imageContainer.querySelector(".configurator-img-thumbnail");
				this._validateCheckContainer = this._container.querySelector('.config-editor-validate-badge-check');


			};

			DismissValueAutocompletePresenter.prototype.inject= function(parentcontainer) {
				this._parentcontainer = parentcontainer;
				parentcontainer.appendChild(this._container);
			};

			/*******************************AUTOCOMPLETE CREATION***************************************************/

			DismissValueAutocompletePresenter.prototype._render= function() {
				var that = this;
				this._autocomplete = new Autocomplete({
					multiSelect: true,
					showSuggestsOnFocus: true,
					placeholder : nlsConfiguratorKeys.type,
					events : {
						onSelect : function(item){
							that._onSelect(item);
						},
						onUnselect : function(item){
							that._onUnselect(item);
						},
						onShowSuggests : function(item, dataset){
							if(!that._isAlreadyVisible || that.configModel.getRulesMode() !== "RulesMode_SelectCompleteConfiguration"){
								that._onShowSuggests(item, this);
								that._isAlreadyVisible = true;
							}
						},
						onFocus : function(){
							console.log(that._autocomplete.getFocusedItem());
							var variantName = that.configModel.getFeatureDisplayNameWithId(that.variant.ruleId);
							var searchBox = document.querySelector('.autocomplete-input');
							var value = searchBox ? searchBox.value : "";
							var text = that.searchValue || value;
							if(variantName.toUpperCase().contains(text.toUpperCase())){
								this.showAll();	//show all in case variant has match
							}else{
								if(text && text !== "")
									that._autocomplete.getSuggestions(text);
								else {
									this.showAll();
								}
							}
						},
						onHideSuggests : function(){
							that._isAlreadyVisible = false;
							if(that._pcDdInteractionToken) {
								that.modelEvents.unsubscribe(that._pcDdInteractionToken);
								that._pcDdInteractionToken = undefined;
							}
							if(that._needToCallSolver) {
								that.callSolver();
								that._needToCallSolver = false;
							}
						}
					}
				}).inject(this._container);

				UWA.createElement('div',{
					'styles': { 'display':'inline-block'},
					'html': nlsConfiguratorKeys.All_values_except, // 'All values except: '
				}).inject(this._autocomplete.elements.inputContainer,'top');

				var _variantDataset = this._createDataset();
				var _datasetConfiguration = this._createConfigurations();
				this._autocomplete.addDataset(_variantDataset, _datasetConfiguration);

				//var length = this.variant.options.length;
				_variantDataset.items.forEach( item => this._updateBadge(item));

				this.updateFilters();

				if(this.variant && this.variant.options && this.variant.options.length > 5){
					this._showMore = this._container.querySelector('.config-editor-autocomplete-show-more');
					this._showLess = this._container.querySelector('.config-editor-autocomplete-show-less');

					this._autocomplete.elements.inputContainer.appendChild(this._showMore);
					this._autocomplete.elements.inputContainer.appendChild(this._showLess);
					this._showMore.onclick = function(){
						that._showBadges();
						that._showLess.style.display = "inline-block";
						that._showMore.style.display = "none";
					};
					this._showLess.onclick = function(){
						that._hideBadges();
						that._showLess.style.display = "none";
						that._showMore.style.display = "inline-block";
					};
				}
				 //R14 update dropdown item states.
				this.updateSelections();
			};

			/*******************************AUTOCOMPLETE INITIALIZATION - ADD DATA************************************/

			DismissValueAutocompletePresenter.prototype._createDataset= function() {
				var dataset= {name: "_autocomplete", items : []};
				if(this.variant && this.variant.options && this.variant.options.length > 0){
					//sort by seq number
					this.variant.options = this.variant.options.sort(function(a, b) {
							var nameA = parseInt(a.sequenceNo); //a.displayName.toUpperCase();
							var nameB = parseInt(b.sequenceNo);//b.displayName.toUpperCase();
							if (nameA < nameB) {
								return -1;
							}
							if (nameA > nameB) {
								return 1;
							}
							return 0;
						});
					for(var i=0; i < this.variant.options.length; i++) {
						var state = this.configModel.getStateWithId(this.variant.options[i].id) || this.configModel.getStateWithId(this.variant.optionPhysicalIds[i]);
						var selectedFromStart = false;
						var closable = true;
						var selectable = true;
						var disabled = false;
						if(state === 'Dismissed') {
							selectedFromStart = true;
							closable = true;
							selectable = true;
							disabled = false;
						} else if( state === 'Incompatible'){
							selectedFromStart = true;
							closable = false;
							selectable = false;
							disabled = true;
						} else if (state === 'Required') {
							selectedFromStart = false;
							closable = false;
							selectable = false;
							disabled = true;
						}

						dataset.items.push({
							mainId : this.variant.options[i].id,
							// value: this.variant.optionPhysicalIds[i],
							value: this.variant.options[i].ruleId,
							label : this.variant.options[i].displayName,
							disabled: disabled,
							selected : selectedFromStart,
							closable : closable,
							selectable: selectable,
							icon:"",
							state: state,
							conflicting: false,
							included : "",
							ruleId : this.variant.options[i].ruleId,
							// optionId : this.variant.optionPhysicalIds[i],
							optionId : this.variant.options[i].ruleId,
							tooltip : "",
							selectionCriteria : this.variant.selectionCriteria,
							variantId : this.variant.ruleId,
							image : this.variant.options[i].image,
							displayName : this.variant.options[i].displayName,
							sequenceNumber : this.variant.options[i].sequenceNumber
						});
					}
				}
				return dataset;
			};

			/*******************************AUTOCOMPLETE INITIALIZATION - UPDATE DISPLAY FORMAT************************************/

			DismissValueAutocompletePresenter.prototype._createConfigurations= function() {
				return {
					templateEngine: function (itemContainer, itemDataset, item) {
						itemContainer.addClassName('default-template');
						var icon = "fonticon";
						if(item.icon && item.icon!=='') icon = "suggestion-icon fonticon fonticon-" + item.icon;
						if(item.icon === 'alert') icon = icon + " conflict-icon";
						var content = UWA.createElement('span', {id: "DD-item-" + item.value ,'class': "suggestion-icon " +icon});
						var contentForDefault = UWA.createElement('span', {id: "Default-DD-item-" + item.value ,'class': "contentForDefault fonticon fonticon-star"});
						contentForDefault.hide();
						itemContainer.setHTML(content.outerHTML + '<div class="item-label">' + UWA.String.escapeHTML(item.label) + '</div>' + contentForDefault.outerHTML);
					}.bind(this)
				};
			};

			/*******************************AUTOCOMPLETE EVENTS HANDLING - SELECTION***********************************************/

			DismissValueAutocompletePresenter.prototype._onSelect= function(item) {
				this.imageContainer.classList.add('cfg-image-selected');
				if(this.configModel.getLoading(this.variant.ruleId) === "Loaded"){

					var newItemState = item.state ;
					var oldItemState = this.configModel.getStateWithId(item.ruleId);

				// R14: ignore incompatible (false positive) for onSelect
				if(oldItemState === ConfiguratorVariables.Incompatible || oldItemState === ConfiguratorVariables.Required)
					return;

					/*if(item.included){
						if (item.state === ConfiguratorVariables.Dismissed){
							newItemState = ConfiguratorVariables.Unselected; //virtually selected
							this.configModel.setUpdateRequiredOption(item.value, true);
							this.configModel.setStateWithId(item.value, newItemState);
						}
					}else{*/
						if (item.state === ConfiguratorVariables.Unselected || item.state === ConfiguratorVariables.Default ){
							//var defaultItem = this._find(this.defaults, item.value);
							newItemState = ConfiguratorVariables.Dismissed;
							this.configModel.setUpdateRequiredOption(item.value, true);
							this.configModel.setStateWithId(item.value, newItemState);
							this._updateItem(item);
							this._updateSelection(item);
							this._updateIcons(item);
							this._updateBadge(item);
							this._updateIconInDD(item);

						}
						/*else if(item.state === ConfiguratorVariables.Dismissed){
							newItemState = ConfiguratorVariables.Unselected;
						}*/

					//}
					//R14 if there is no change item state change => no need to call solver
					if(oldItemState !== newItemState) {
						this._needToCallSolver = true;
					}
				}
			};

			/*******************************AUTOCOMPLETE EVENTS HANDLING - UNSELECTION*********************************************/

			DismissValueAutocompletePresenter.prototype._onUnselect= function(item) {
				var selections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems : [];
				if(selections.length == 0){
					this.imageContainer.classList.remove('cfg-image-selected');
				}
				if(this.configModel.getLoading(this.variant.ruleId) === "Loaded"){
					var newItemState = item.state ;
					//var build_mode = this.configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Build;
					var oldItemstate = this.configModel.getStateWithId(item.ruleId);
					if(item.state === ConfiguratorVariables.Dismissed) {
						newItemState = ConfiguratorVariables.Unselected;
						this.configModel.setUpdateRequiredOption(item.value, true);
						this.configModel.setStateWithId(item.value, newItemState);
						this._updateItem(item);
						this._updateSelection(item);
						this._updateIcons(item);
						this._updateBadge(item);
						this._updateIconInDD(item);
					}

					/*if(build_mode || (!build_mode && selections.length > 0)){
						if(item.state === ConfiguratorVariables.Default || (item.included && item.state === ConfiguratorVariables.Unselected) || item.state === ConfiguratorVariables.Selected){
							newItemState = ConfiguratorVariables.Dismissed; //Reject Default
						}else{
							newItemState = ConfiguratorVariables.Unselected;
						}
					}else{
						newItemState = item.included ? ConfiguratorVariables.Dismissed : ConfiguratorVariables.Unselected;
						if(!item.included){
						for(var k=0;k<this.variant.options.length;k++){
								this.configModel.setStateWithId(this.variant.optionPhysicalIds[k], ConfiguratorVariables.Unselected);
							this.configModel.setIncludedState(this.variant.optionPhysicalIds[k], 'Included');
							this.configModel.setIncludedState(this.variant.ruleId, 'Included');
						}
					}
					}*/
					if(oldItemstate !== newItemState) {

						this._needToCallSolver = true;
					}
				}
			};

			/*******************************AUTOCOMPLETE EVENTS HANDLING - UPDATE SUGGESTIONS**************************************/

			DismissValueAutocompletePresenter.prototype._onShowSuggests= function(item, self) {
				this.configModel.setLoading(this.variant.ruleId, "Loaded");
				// this.modelEvents.publish({event:'hideUnreferencedDD', data : {currentAutocomplete : this}});
				var idsToDiagnose = [];
				var configurationCriteria = [];
				var _variantForDiagnosis;

				var items = this._autocomplete.getItems();
				for(var i=0; i<items.length; i++){
					idsToDiagnose.push(items[i].optionId);
					this.configModel.setVariantForDiagnosis(items[i].variantId);
					_variantForDiagnosis = items[i].variantId;
					configurationCriteria.push({'Id': items[i].optionId, "State" : items[i].state});
					this._updateIconInDD(items[i]);
				}



				this.onComplete = false;
				var that = this;
				if(this.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration" && this.configModel.isSolveWithDiagnose()){
					var suggestContent = self.getContent().getElement('.autocomplete-suggests') || self.elements.suggestsContainer;
					if(!this._pcDdInteractionToken) {
						this._pcDdInteractionToken = this.modelEvents.subscribe({event:'pc-dd-interaction-complete'}, function(e){
								Mask.unmask(suggestContent);
								suggestContent.style.opacity = 1;
								that.onComplete = true;
								if(that._isAlreadyVisible && that.configModel.isConfigCriteriaUpdated()) {
									that.onComplete = false;
									that.callSolverOnSelectedIDs({"idsToDiagnose" : idsToDiagnose, "configurationCriteria" : configurationCriteria});
									Mask.mask(suggestContent);
									that.configModel.setDignosedVariant(_variantForDiagnosis, true);
								}
						});
					}
					//&& if config criteria is not updated
						if(this.configModel.getFirstSelection() &&
								(this.configModel.isConfigCriteriaUpdated() ||
									(!this.configModel.isConfigCriteriaUpdated() && !this.configModel.getDignosedVariant(_variantForDiagnosis))
								)
							){
							this.callSolverOnSelectedIDs({"idsToDiagnose" : idsToDiagnose, "configurationCriteria" : configurationCriteria});
							if(!this.onComplete){
								Mask.mask(suggestContent);
								// suggestContent.style.opacity = 0.5;
							}
							this.configModel.setDignosedVariant(_variantForDiagnosis, true);
						}
				}

			};

			/********************************FUNCTIONALITIES - CALL SOLVER BASED ON RULES SELECTION******************************/

			DismissValueAutocompletePresenter.prototype.callSolver = function(item){
				this.modelEvents.publish({event:'pc-interaction-started', data : {}});
				if(this.configModel.getRulesActivation() === ConfiguratorVariables.str_true) {
					if(this.configModel.getLoading(this.variant.ruleId) === "Loaded"){
						this.modelEvents.publish({event:'SolverFct_CallSolveMethodOnSolver', data : {}});
					}
				}else{
					this.updateFilters();
					this.modelEvents.publish({event: 'solveAndDiagnoseAll_SolverAnswer'});
					if(this.configModel.getSelectionMode() === "selectionMode_Refine"){
						this.enforceRequired();
					}
				}
			};

			DismissValueAutocompletePresenter.prototype.callSolverOnSelectedIDs = function(idsToDiagnose){
				// this.modelEvents.publish({event:'pc-interaction-started', data : {}});
				if(this.configModel.getRulesActivation() === ConfiguratorVariables.str_true) {
					if(this.configModel.getLoading(this.variant.ruleId) === "Loaded"){
						this.modelEvents.publish({event:'SolverFct_CallSolveOnSelectedIDsMethodOnSolver', data : idsToDiagnose});
					}
				}else{
					this.updateFilters();
					this.modelEvents.publish({event: 'solveAndDiagnoseAll_SolverAnswer'});
				}
			};

			/********************************FUNCTIONALITIES - UPDATE VIEW - MAIN METHOD******************************************/

			DismissValueAutocompletePresenter.prototype.enforceRequired = function(data) {
				this.updateSelections(data);
			};

			DismissValueAutocompletePresenter.prototype.updateSelections = function(data) {
				var that = this, variantSelectedByRule = false, variantSelectedByUser = false,conflictingOption=false;
				var length = this.variant.options.length;
				this.defaults = data ? data.answerDefaults : [];
				// firstCall = data ? data.firstCall : false;

				//this.configModel.setFeatureIdWithRulesStatus(this.variant.ruleId, false);
				//this.configModel.setFeatureIdWithChosenStatus(that.variant.ruleId, false);
				//this.configModel.setUserSelectVariantIDs(that.variant.ruleId, false);

				for(var i =0; i<length;i++){
					//var _updateRequired = true; // this.configModel.getUpdateRequiredOption(this.variant.optionPhysicalIds[i]);
				//	var _refineMode = (this.configModel.getSelectionMode() !== "selectionMode_Build");
					// var _xor = (_updateRequired || _refineMode) && !(_updateRequired && _refineMode);
				//var item = this._getRequiredData(i);
						var item = this._getRequiredData(i);
						//var item = this.variant.options[i];

						this._updateItem(item);
						this._updateSelection(item);
						this._updateIcons(item);
						this._updateBadge(item);
						this._updateIconInDD(item); //Required here for the scenarios when selection in same DD - show suggests not triggered when suggests are already shown.
							// this._updateImage(this.variant.options[i], item.selected);
						conflictingOption = conflictingOption || item.conflicting;
						if(item.selectedByRules) variantSelectedByRule = true;
						if(item.selectedByUser) variantSelectedByUser = true;
						this.configModel.setUIUpdated(this.variant.optionPhysicalIds[i], true);
					//}
				}

				var _cntSelections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems.length : 0;

				if(_cntSelections == 1){
					if(this._autocomplete.selectedItems[0].image && this.image)
						this.image.src = this._autocomplete.selectedItems[0].image;
				}else{
					if(this.variant.image && this.image)
					this.image.src = this.variant.image;
				}
				if(conflictingOption && this.configModel.getRulesActivation() === "true"){
					this.image.parentElement.style.borderColor = "red";
					this._autocomplete.elements.inputContainer.addClassName("config-editor-multi-input-parent-conflict");
				}else{
					this.image.parentElement.style.borderColor = "#b1b1b1";
					this._autocomplete.elements.inputContainer.removeClassName("config-editor-multi-input-parent-conflict");
				}

				this.configModel.setFeatureIdWithRulesStatus(this.variant.ruleId, variantSelectedByRule);
				this.configModel.setFeatureIdWithChosenStatus(that.variant.ruleId, variantSelectedByUser);
				//if(item && (item.state === "Chosen" || item.state === "Dismissed" || item.state === "Required" || item.state === "Default")){

				// In dismiss mode Variant is fulfill by default
				this.configModel.setUserSelectVariantIDs(this.variant.ruleId, true);
				//}

				this.updateFilters();
				if(length > 5)this._updateBadgeInitialVisibility();


			};

			/********************************FUNCTIONALITIES - APPLY REFINE VIEW**************************************************/

			/*DismissValueAutocompletePresenter.prototype.refineView = function(enable){
				var selectedVariant = this.configModel.getFeatureIdWithStatus(this.variant.ruleId);
				var allVariants = this.configModel.getVariants();
				if(countConfigurations >= allVariants){
					countConfigurations = 0;
				}

				if(enable){
					selectedVariant ? this.configModel.setFeatureIdWithUserSelection(this.variant.ruleId, true) : this._setIncludedState();
				}else{
					this._unsetIncludedState();
					this.configModel.setConfigurationCriteria(this.configModel.getCriteriaBuildMode());
				}
				countConfigurations++ ; //increase count for each variant

				this._BuildModeCriteria = JSON.parse(JSON.stringify( this.configModel.getConfigurationCriteria() ));
				if(countConfigurations === allVariants) {
					if(enable){
						this.configModel.setCriteriaBuildMode(this._BuildModeCriteria);
					}
					if(this.configModel.getRulesActivation() === ConfiguratorVariables.str_true){
						this.modelEvents.publish({event:'SolverFct_CallSolveMethodOnSolver', data : {}});
					}else{
						this.modelEvents.publish({event:'solveAndDiagnoseAll_SolverAnswer', data:	this.configModel.getConfigurationCriteria()});
					}
				}

				// if(this.configModel.getRulesActivation() === ConfiguratorVariables.str_true){
				// 	if(countConfigurations === allVariants) {
				// 		if(enable){
				// 			this.configModel.setCriteriaBuildMode(this.configModel.getConfigurationCriteria());
				// 		}
				// 		this.modelEvents.publish({event:'SolverFct_CallSolveMethodOnSolver', data : {}});
				// 	}
				// }else{
				// 	this._BuildModeCriteria = JSON.parse(JSON.stringify( this.configModel.getConfigurationCriteria() ));
				// 	if(countConfigurations === allVariants) {
				// 		if(enable){
				// 			this.configModel.setCriteriaBuildMode(this._BuildModeCriteria);
				// 		}
				// 		this.modelEvents.publish({event:'solveAndDiagnoseAll_SolverAnswer', data:	this.configModel.getConfigurationCriteria()});
				// 	}
				// 	// this.enforceRequired();
				// 	// this.modelEvents.publish({event:'updateAllFilters', data : {}});
				// }
			};

			/*******************************UPDATE VIEW RELATED HELPER METHODS******************************************/

			DismissValueAutocompletePresenter.prototype._getRequiredData= function(i) {
				var item = this._autocomplete.getItem(this.variant.optionPhysicalIds[i]) || {};
				var state = this.configModel.getStateWithId(item.value) || this.configModel.getStateWithId(item.mainId);
				if(item){
					item.state = state || "Unselected";
				}
				item.conflicting = this.configModel.isConflictingOption(item.ruleId);
				item.included = this.configModel.getIncludedState(item.value);

				this._updateItem(item);
				return item;
			};

			/*******************************UPDATE VIEW : LOAD DATA****************************************************/

			DismissValueAutocompletePresenter.prototype._updateSelection= function(item) {
				//this.configModel.setLoading(this.variant.ruleId);
				//var selectedState;
				/*this._autocomplete.enableItem(item.id);
				var rules = this.configModel.getRulesActivation() === ConfiguratorVariables.str_true;
				*/
				//selectedState = !item.state ? item.included : selectedState;
				//var state = this.configModel.getStateWithId(item.ruleId);
				// if(item.conflicting && rules) selectedState = true;
				// (item.selected && selectedState) ? "" : this._autocomplete.toggleSelect(item,"",selectedState);
				///this._autocomplete.toggleSelect(item, '', item.selected);


				// item.disable ? this._autocomplete.disableItem(item.id) : this._autocomplete.enableItem(item.id);*/
				this.configModel.setLoading(this.variant.ruleId,"Loaded");
			};

			/*******************************UPDATE VIEW : MODIFY ICONS***********************************************/

			DismissValueAutocompletePresenter.prototype._updateIcons= function(item) {
				var rules = this.configModel.getRulesActivation() === ConfiguratorVariables.str_true;
				var icon;
				switch (item.state) {
				case ConfiguratorVariables.Default:
					icon = rules ? "star" : "";
					break;
				case ConfiguratorVariables.Required:
					icon = rules ? "lock" : "";
					break;
				case ConfiguratorVariables.Incompatible:
					icon = rules ? "block" : "";
					break;
				case ConfiguratorVariables.Dismissed:
					icon = "user-delete";
					break;
				case ConfiguratorVariables.Selected:
					icon = "lightbulb";
					break;
				default :
					icon = "";
				break;
				}
				if(item.conflicting && rules) icon = "alert";
				this._updateItem(item, {icon:icon});
			};

			/****************************************UPDATE VIEW : GENERATE TOOLTIP MESSAGE****************************************/

			DismissValueAutocompletePresenter.prototype._updateTooltipMessages= function(item) {
				var message = "";
				if (item.conflicting && item.conflicting == true) {
					message = this.getConflictingMessage(item.value);
				}else{
					message = nlsConfiguratorKeys.Loading;
					this.modelEvents.publish({event:'SolverFct_getResultingStatusOriginators', data : {value : item.optionId}});

					// switch (item.state) {
					// case ConfiguratorVariables.Incompatible: case ConfiguratorVariables.Required:
					// 	message = nlsConfiguratorKeys.Loading;
					// 	this.modelEvents.publish({event:'SolverFct_getResultingStatusOriginators', data : {value : item.ruleId}});
					// 	break;
					// case ConfiguratorVariables.Default:
					// 	message = item.label + " " + nlsConfiguratorKeys.is + " " + nlsConfiguratorKeys["Default selected"];
					// 	break;
					// case ConfiguratorVariables.Dismissed:
					// 	message = item.label + " " + nlsConfiguratorKeys.is + " " + nlsConfiguratorKeys["Dismissed by the user"];
					// 	break;
					// default :
					// 	break;
					// }
					// /**Default in compatible mode, seen as chosen but star is present**/
					// if(this.defaults && this.configModel.getRulesMode() === "RulesMode_DisableIncompatibleOptions"){
					// 	if(this.defaults.indexOf(item.ruleId) !== -1){
					// 		message = item.label + " " + nlsConfiguratorKeys.is + " " + nlsConfiguratorKeys.Default;
					// 	}
					// }
				}
				this.setTooltipMessage(item.value, message);
			};

			/****************************************UPDATE VIEW : CACHE TOOLTIP MESSAGE******************************************/

			DismissValueAutocompletePresenter.prototype.setTooltipMessage= function(option, message) {
				var item = this._autocomplete.getItem(option);
				this._updateItem(item, {tooltip : message});
				this._updateSuggestionPopup(item);
				this._updateBadgePopup(item);
			};

			/****************************************UPDATE VIEW : CREATE TOOLTIP AND SET MESSAGE*********************************/

			DismissValueAutocompletePresenter.prototype._updateSuggestionPopup= function(item) {
				if(this._updateForSuggestion){
						popup[item.value].setBody(item.tooltip);
						popup[item.value].getContent().addClassName('cfg-custom-popup');
						setTimeout(function(){
							if(popup[item.value].elements.container.offsetWidth === 0){
								popup[item.value].toggle();
							}
						},100);
						// popup[item.value].toggle(); //Added due to autoposition issue on content change in webux/pop
						// popup[item.value].toggle(); //To be removed once it is handled by component itself;
					}
			};

			DismissValueAutocompletePresenter.prototype._updateBadgePopup= function(item) {
				if(this._updateForBadge){
						badgeTooltip[item.value].setBody(item.tooltip);
						badgeTooltip[item.value].getContent().addClassName('cfg-custom-popup');
						setTimeout(function(){
							if(badgeTooltip[item.value].elements.container.offsetWidth === 0){
								badgeTooltip[item.value].toggle();
							}
						},100);
						// badgeTooltip[item.value].toggle(); //Added due to autoposition issue on content change in webux/pop
						// badgeTooltip[item.value].toggle(); //To be removed once it is handled by component itself;
					}
			};

			/*******************************UPDATE VIEW : SET ICON IN BADGE AND SUGGESTIONS**************************************/

			DismissValueAutocompletePresenter.prototype._updateBadge= function(item) {
				var currentBadge, badges = this._autocomplete.badges, that = this;
				var selectedItem = this._autocomplete.selectedItems.find( it => it.ruleId === item.ruleId);
				if(UWA.is(selectedItem)) {
					var badge = this._autocomplete.badges.find( badge => badge.options.id === ("selected-" + selectedItem.id));
					if(UWA.is(badge)) {
						currentBadge = badge;
						currentBadge.setClosable(item.closable);
						currentBadge.setIcon(item.icon);

						/*if(this.configModel.isValidationEnabled()){
							var checkIcon = currentBadge.elements.container.querySelector(".config-editor-validate-badge-check");
							if(item.state === ConfiguratorVariables.Default || item.state === ConfiguratorVariables.Required || item.state === ConfiguratorVariables.Selected){
								if(!checkIcon){
									var _validateCheckContainer = UWA.createElement('span', {'class': "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-check config-editor-validate-badge-check"});
									currentBadge.elements.container.insertBefore(_validateCheckContainer,currentBadge.elements.cross);
									_validateCheckContainer.onclick = function(item,evt){
										this.style.display = "none";
										that.configModel.setFeatureIdWithChosenStatus(that.variant.ruleId, true);
										that.configModel.setValidateVariant(that.variant.ruleId, true);
										that.configModel.setStateWithId(item.optionId, ConfiguratorVariables.Chosen);
										//Updating the new behavior only for complete mode.
										//To be updated for all rule modes after impact analysis.
										that.callSolver();

									}.bind(_validateCheckContainer,item);
								}
							}else {
								if(checkIcon){
									checkIcon.remove();
								}
							}
						}	*/

						if(currentBadge.elements.icon){
							if( item.icon === "alert" ) {
								currentBadge.elements.icon.addClassName('conflict-icon');
							}else {
								currentBadge.elements.icon.removeClassName('conflict-icon');
							}
						}
						if(!badgeTooltip[item.value] || (badgeTooltip[item.value] && !badgeTooltip[item.value].target.isInjected()) ) {
							badgeTooltip[item.value] = new WUXPopup({target: currentBadge.elements.icon,trigger: 'click', position:'top'});
						}

						currentBadge.elements.icon.onclick = function(){
							that._updateForBadge = true;//To be removed on receiving udpates from webux
							that._updateForSuggestion = false;//To be removed on receiving udpates from webux
							that._updateTooltipMessages(this);
						}.bind(item);
					}
				}
			};

			DismissValueAutocompletePresenter.prototype._updateIconInDD= function(item) {
				var message = '', suggestion, iconDiv, that = this, contentForDefault;
				if(item.elements){
					suggestion = this._autocomplete.elements.container.getElement('#autocomplete-item-'+ item.id);
					if(suggestion){
						if(suggestion.hasClassName('disabled')){
							suggestion.removeClassName('disabled');
						}
						if(suggestion.hasClassName('conflict-icon')){
							suggestion.removeClassName('conflict-icon');
						}
						iconDiv = suggestion.getElementsByClassName('fonticon')[0];
						contentForDefault = suggestion.getElements('#Default-DD-item-' + item.value)[0];
						if(contentForDefault) contentForDefault.hide();
						// /**Handling default in compatible mode.**/
						// if(this.defaults && this.configModel.getRulesMode() === "RulesMode_DisableIncompatibleOptions"){
						// 	if(this.defaults.indexOf(item.ruleId) !== -1){
						// 		item.icon = "star";
						// 	}
						// }
						/**showing star on right side in dismissed/required state or in compatible mode*/
						if(this.defaults && contentForDefault && item.state !== ConfiguratorVariables.Default){
							if(this.defaults.indexOf(item.ruleId) !== -1){
								contentForDefault.show();
							}
						}
						if(iconDiv && item.icon){
							popup[item.value] = new WUXPopup({ target: iconDiv,trigger: 'click', position:'top'});
							iconDiv.onclick = function(e){
								e.stopPropagation();	//Prevent trigger from item selection
								that._updateForBadge = false;//To be removed on receiving udpates from webux
								that._updateForSuggestion = true;//To be removed on receiving udpates from webux
								that._updateTooltipMessages(this);
							}.bind(item);
							iconDiv.className =  "suggestion-icon fonticon fonticon-" + item.icon;
							if(item.icon === 'block'){
								suggestion.addClassName('disabled');
							}
							if(item.icon === 'alert'){
								suggestion.addClassName('conflict-icon');
							}
						}else{
							if(iconDiv){
								iconDiv.className =  "suggestion-icon fonticon";
								if(popup[item.value]){
									popup[item.value].elements.container.destroy();
									//popup[item.value].destroy();
									//delete popup[item.value];
								}
							}
						}
					}
				}
			};

			/****************************************UPDATE VIEW : UPDATE IMAGE AS PER CF/CO************************************/

			DismissValueAutocompletePresenter.prototype._updateImage = function (optionObj, selected) {
				var variantImage;
				if(this._autocomplete.selectedItems && this._autocomplete.selectedItems.length > 0){
					variantImage = this._autocomplete.selectedItems.length > 1;
				}else{
					variantImage = true;
				}
				var image = this.image;
				if(image && image[0]){
					if(variantImage){
						if(this.variant.image !== "")
							image[0].src = this.variant.image;
					}else if(variantImage == false){
						if(selected && optionObj && optionObj.image !== "")
							image[0].src = optionObj.image;
					}
				}
			};

			/*******************************UPDATE VIEW : HANDLE MUST/MAY FEATURES AND INCLUSION RULES***************************/

			DismissValueAutocompletePresenter.prototype.updateFilters = function(){
				var variantState = this.configModel.getStateWithId(this.variant.ruleId);
				var mandatory = (this.variant.selectionCriteria === 'Must' || this.variant.selectionCriteria === true);
				var mandStatus = (mandatory || variantState === ConfiguratorVariables.Required);
				var selectedFeature;
				if(this._autocomplete.selectedItems && this._autocomplete.selectedItems.length > 0){
					mandStatus = false;
					selectedFeature = true;
				}else{
					selectedFeature = false;
				}

				if(variantState === "Incompatible"){
							if(!this.configModel.getUserSelectVariantIDs(this.variant.ruleId))
					selectedFeature = false;
				}

				// if(this._container.offsetParent && this._container.offsetParent.style.display === "none"){
				// 	selectedFeature = false;
				// }
				// In dismiss mode, variant is never mand !
				this.configModel.setFeatureIdWithMandStatus(this.variant.ruleId, false);
				this.configModel.setFeatureIdWithStatus(this.variant.ruleId, selectedFeature);
				// this.modelEvents.publish({event:'updateAllFilters', data : {}});
			};

			/********************************REFINE MODE - INCLUDED STATE GETTER SETTER***********************************/

			/*DismissValueAutocompletePresenter.prototype._setIncludedState = function(){
				for(var i=0; i < this.variant.options.length; i++) {
					//var item = this._getRequiredData(i);
					//this.configModel.setIncludedState(item.value, 'Included');
					//this.configModel.setIncludedState(item.variantId, 'Included');
					this._loadData(item);
				}
			};

			DismissValueAutocompletePresenter.prototype._unsetIncludedState = function(){
				for(var i=0; i < this.variant.options.length; i++) {
					var item = this._getRequiredData(i);
					if(item.included === 'Included'){
						this.configModel.setIncludedState(item.value);
						this.configModel.setIncludedState(item.variantId);
					}
					this._loadData(item);
				}
			}*/

			/******************************************UTILITIES**********************************************************/

			DismissValueAutocompletePresenter.prototype._find = function (array, id) {
				if(array){
					array.forEach(function(item){
						if(item === id){ return item; }
					});
				}
			};

			DismissValueAutocompletePresenter.prototype._showBadges = function () {
				var selections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems.length : 0;
				for(var i = 0 ;i< selections;i++){
					this._autocomplete.badges[i].show();
					this._autocomplete.innerInputs[i].show();
				}
			};

			DismissValueAutocompletePresenter.prototype._hideBadges = function () {
				var selections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems.length : 0;
				if(selections > 3){
					for(var i = 0 ;i < selections ; i++){
						var criteria = i < (selections - 3) ;
						if(criteria){
							this._autocomplete.badges[i].hide();
							this._autocomplete.innerInputs[i+1].hide();
						}else{
							this._autocomplete.badges[i].show();
							if(this._autocomplete.innerInputs[i+1])
								this._autocomplete.innerInputs[i+1].show();
						}
					}
				}
			};

			DismissValueAutocompletePresenter.prototype._updateBadgeInitialVisibility = function () {
				var selections = this._autocomplete.selectedItems ? this._autocomplete.selectedItems.length : 0;
				if(selections > 3){
					if(this._showMore.style.display !== "inline-block" && this._showLess.style.display !== "inline-block"){
						this._hideBadges();
						this._showLess.style.display = "none";
						this._showMore.style.display = "inline-block";
					}else if(this._showMore.style.display === "inline-block"){
						this._hideBadges();
					}else if (this._showLess.style.display === "inline-block") {
						this._showBadges();
					}
				}else{
					this._showBadges();
					this._showMore.style.display = "none";
					this._showLess.style.display = "none";
				}
			};


			DismissValueAutocompletePresenter.prototype._updateItem= function(item,object) {
				if(item){
					var rules = this.configModel.getRulesActivation() === ConfiguratorVariables.str_true;
					// object = object ? object : {};
					if(object){
						item.icon = (object.icon || object.icon === "") ? object.icon : item.icon;
						item.tooltip = (object.tooltip || object.tooltip === "") ? object.tooltip : item.tooltip;
					}
					item.state = this.configModel.getStateWithId(item.ruleId);
					item.closable = (item.state !== "Incompatible" && item.state !== 'Required');
					var newSelectionState = (item.state === "Dismissed" || item.state === "Incompatible") ;
					item.selectedByRules = rules ? (item.icon && item.selected) : false;
					var disable =  (item.state === "Required" || item.state === "Incompatible");
					item.selectable = (item.state !== "Incompatible" && item.state !== "Required");
					// item.disable =  rules ? (item.state === "Required" || item.state === "Incompatible") ? true : false : false;
					item.selectedByUser = item.state === "Dismissed";
					//R14 toggle selection
					if(item.selected !== newSelectionState && newSelectionState) {
						//item.selected = newSelectionState;
						if(disable && item.disabled){
							 item.disabled = false;
						 }
						this._autocomplete.toggleSelect(item);
					}else if(item.selected !== newSelectionState && !newSelectionState) {
						//item.selected = newSelectionState;
						if(disable && item.disabled){
							 item.disabled = false;
						 }
						this._autocomplete.toggleSelect(item);
					}
					if(disable) {
						this._autocomplete.disableItem(item.id);
						//this._autocomplete.disable(item);
					}else {
						this._autocomplete.enableItem(item.id);
					}
				}
				return item;
			};

			DismissValueAutocompletePresenter.prototype.getConflictingMessage = function(optionId){
				var addAlso, message='';
				var model = this.configModel;
				message = UWA.i18n("Option") + " " + model.getOptionDisplayNameWithId(optionId) + " " + UWA.i18n("is conflicting with") + " : ";
				var listOfListOfConflictingIds = model.getConflictingFeatures();
				var listOfListOfRulesImplied = model.getImpliedRules();
				//need to traverse the list again, to generate the text for tooltip

				for (var i = 0; i < listOfListOfConflictingIds.length; i++) {
					if (listOfListOfConflictingIds[i].indexOf(optionId) != -1) {
						if (addAlso) message += UWA.i18n("and also conflicting with") + " ";
						var j;
						for ( j = 0 ; j < listOfListOfConflictingIds[i].length; j++) {
							if (optionId != listOfListOfConflictingIds[i][j]) {
								message += model.getFeatureDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "[" + model.getOptionDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "]";
								addAlso = true;
							}
						}
						if (listOfListOfRulesImplied.length > 0) {
							for ( j = 0 ; j < listOfListOfRulesImplied[i].length; j++) {
								if (j == 0) {message +=  " " + UWA.i18n("ImpliedRules") + " : ";}
								var ruleName = model.getRuleDisplayNameWithId(listOfListOfRulesImplied[i][j]) || listOfListOfRulesImplied[i][j];
								message += " " + ruleName;
							}
						}
						break;
					}
				}
				return message;
			};


			/********************************END OF MULTIVALUEPRESENTER*****************************************************/


			return DismissValueAutocompletePresenter;
		});

define(
    'DS/ConfiguratorPanel/scripts/Presenters/ParameterPresenter',
    [
        'UWA/Core',
        'UWA/Event',
        "DS/Controls/Slider",
        "DS/Controls/SpinBox",
        'DS/Handlebars/Handlebars',
        'DS/UIKIT/Mask',
        'DS/UIKIT/Tooltip',
        'DS/Controls/Popup',
        'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
        'DS/ConfiguratorPanel/scripts/Utilities',
        'DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctions',
        'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
        'i18n!DS/xDimensionManager/assets/nls/xUnitLabelLong.json',
        'text!DS/ConfiguratorPanel/html/ParameterPresenter.html',
        'css!DS/UIKIT/UIKIT.css',
        "css!DS/ConfiguratorPanel/css/ParameterPresenter.css"
    ],
    function(UWA, Event, Slider, SpinBox, Handlebars, Mask, Tooltip, WUXPopup, ConfiguratorVariables, Utilities, ConfiguratorSolverFunctions, nlsConfiguratorKeys, nlsUnitLabelLongKeys, html_ParameterPresenter) {

        'use strict';

        var template = Handlebars.compile(html_ParameterPresenter);

        var ParameterPresenter = function(options) {
            this._init(options);
        };


        /******************************* INITIALIZATION METHODS**************************************************/

        ParameterPresenter.prototype._init = function(options) {
            var _options = options ? UWA.clone(options, false) : {};
            UWA.merge(this, _options);

            this._initDivs();
            this._render();
            this.inject(_options.parentContainer);
        };

        ParameterPresenter.prototype._initDivs = function() {
            this._container = document.createElement('div');
            this._container.innerHTML = template();

            this._container = this._container.querySelector('.config-editor-parameter-container');
            this._spinboxContainer = this._container.querySelector('.config-editor-spinbox-container');
            this._sliderContainer = this._container.querySelector('.config-editor-slider-container');
        };

        ParameterPresenter.prototype.inject = function(parentcontainer) {
            parentcontainer.appendChild(this._container);
        };

        /*******************************AUTOCOMPLETE CREATION***************************************************/

        ParameterPresenter.prototype._render = function() {
            var that = this;
            this._currentValue = this.configModel.getValueWithId(this.variant.ruleId) || this.variant.defaultValue;
            this.parameterSpinbox = this.getSpinbox();
            this.parameterSlider = this.getSlider();
            this.updateFilters();
        };

        ParameterPresenter.prototype.enforceRequired = function(data) {
            var _currentValue = this.configModel.getValueWithId(this.variant.ruleId) || this.variant.defaultValue;
            this._currentValue = this.getParsedValue(_currentValue);
            if(this._currentValue){
              if(this._currentValue < this.variant.minValue || this._currentValue > this.variant.maxValue){
                // this._currentValue = this.variant.defaultValue;
                var msgStr1 = nlsConfiguratorKeys.ParameterValueOutOfRange;
                msgStr1 = msgStr1.replace("#PARAMETER#", this.variant.name);
                var msgStr2 = msgStr1.replace("#PARAMETER_VALUE#", this._currentValue);
                Utilities.displayNotification({eventID: 'warning',msg: msgStr2});
              }
            }
            this.updateFilters();
        };

        ParameterPresenter.prototype.getParsedValue = function(value) {
          var parsedValue = value;
          if (UWA.is(value, "string") && value !== "") {
            parsedValue = JSON.parse(value.replace(/\D/g,''));
          }
          return parsedValue;
        };

        ParameterPresenter.prototype.getSpinbox = function(data) {
            var that = this;
            var parameterSpinbox = new SpinBox({
                value: parseFloat(this._currentValue),
                minValue: this.variant.minValue,
                maxValue: this.variant.maxValue,
                // units: this.variant.unit,
                stepValue: this.variant.stepValue
            });
            parameterSpinbox.elements.container.style.width = "100%";
            parameterSpinbox.elements.container.style.minWidth = "100%";
            parameterSpinbox.elements.container.style.lineHeight = "32px";
            parameterSpinbox.elements.container.style.height = "34px";
            parameterSpinbox.addEventListener('endEdit', function() {
                that._currentValue = that.parameterSpinbox.value;
                that.updateFilters();
            });
            parameterSpinbox.inject(this._spinboxContainer);
            return parameterSpinbox;
        };

        ParameterPresenter.prototype.getSlider = function(data) {
            var that = this;
            var parameterSlider = new Slider({
                value: this._currentValue,
                minValue: this.variant.minValue,
                maxValue: this.variant.maxValue,
                stepValue: this.variant.stepValue
            });
            parameterSlider.getTextFromValue = function() {
                var unit = nlsUnitLabelLongKeys[that.variant.unit] || that.variant.unit;
               if(unit){
                 return this.value + " " + unit;
               }
               else
                 return this.value;
            }

            parameterSlider.getContent().addEventListener('endEdit', function(data) {
                that._currentValue = that.parameterSlider.value;
                that.updateFilters();
            });
            parameterSlider.inject(this._sliderContainer);
            return parameterSlider;
        };


        /*******************************UPDATE VIEW : HANDLE MUST/MAY FEATURES AND INCLUSION RULES***************************/

        ParameterPresenter.prototype.updateFilters = function() {
            var valueToBeUpdated;
            //if(this._currentValue && UWA.is(this._currentValue, "string") && this._currentValue.includes(this.variant.unit))
            if (this._currentValue) {
                valueToBeUpdated = this._currentValue.toString();
                // valueToBeUpdated = JSON.stringify(this._currentValue);
                if (UWA.is(valueToBeUpdated, "string")) {
                    if (this.variant.unit && this.variant.unit != "" && valueToBeUpdated.indexOf(this.variant.unit) === -1) {
                        valueToBeUpdated = valueToBeUpdated + " " + this.variant.unit;
                    }
                }
                if (valueToBeUpdated) {
                    this.configModel.setValueWithId(this.variant.ruleId, valueToBeUpdated);
                }
                this.imageContainer.classList.add('cfg-image-selected');
            }else{
              this.imageContainer.classList.remove('cfg-image-selected');
            }
            this.parameterSlider.value = parseFloat(this._currentValue);
            this.parameterSpinbox.value = parseFloat(this._currentValue);
            var mandatory = (this.variant.selectionCriteria == 'Must' || this.variant.selectionCriteria == true) ;
            //required states on parameter ?
            // var mandStatus = (mandatory || this.configModel.getStateWithId(this.variant.ruleId) === ConfiguratorVariables.Required) ? true : false;
            var mandStatus = mandatory; //for now.
            var selectedFeature;
            if (this._currentValue !== undefined) {
                mandStatus = false;
                selectedFeature = true;
            } else {
                selectedFeature = false;
            }

            if (this._container.offsetParent && this._container.offsetParent.style.display === "none") {
                selectedFeature = false;
            }
            this.configModel.setFeatureIdWithMandStatus(this.variant.ruleId, mandStatus);
            this.configModel.setFeatureIdWithStatus(this.variant.ruleId, selectedFeature);
            this.configModel.setFeatureIdWithChosenStatus(this.variant.ruleId, selectedFeature);

            this.modelEvents.publish({event: "updateAllFilters"});

        };

        /******************************************UTILITIES**********************************************************/

        ParameterPresenter.prototype._find = function(array, id) {
            if (array) {
                array.forEach(function(item) {
                    if (item === id) {
                        return item;
                    }
                });
            }
        };
        /********************************END OF MULTIVALUEPRESENTER*************************************************************/
        return ParameterPresenter;
    });


define(
	'DS/ConfiguratorPanel/scripts/Presenters/ToolbarPresenter',
	[
		'UWA/Core',
		'UWA/Controls/Abstract',
		'DS/W3DXComponents/Views/Item/ActionView',
		'DS/W3DXComponents/Views/Layout/ActionsView',
     	'DS/W3DXComponents/Collections/ActionsCollection',
		'DS/UIKIT/Input/Button',
		'DS/UIKIT/Input/Text',
		'DS/UIKIT/DropdownMenu',
		'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
		'DS/ConfiguratorPanel/scripts/Utilities',

		'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',

		'css!DS/UIKIT/UIKIT.css',
		"css!DS/ConfiguratorPanel/scripts/Presenters/ToolbarPresenter.css"
	],
	function (UWA, Abstract, ActionView, ActionsView, ActionsCollection, Button, InputText, DropdownMenu, ConfiguratorVariables, /*ConfiguratorSolverFunctions,*/ Utilities, nlsConfiguratorKeys) {

		'use strict';

		var ToolbarPresenter = Abstract.extend({
				 /**
				 * @description
				 * <blockquote>
				 * <p>Initialiaze the ToolbarPresenter component with the required options</p>
				 * <p>This component shows all tools on top of the Configurator panel. It will show :
				 * <ul>
				 * <li>Count of the mandatory Variant classes not valuated.</li>
				 * <li>Count of the conflicting Variant classes</li>
				 * <li>The current Status of the configuration (if it is "Partial", "Complete" or "Hybrid")</li>
				 * <li>The selection mode ("Build" or "Refine"). By clicking on the icon you will be able to switch the mode</li>
				 * <li>The multi-selection state. By clicking on the icon you will be able to switch the state</li>
				 * <li>The rule assistance level. By clicking the icon you will be able to select one of them</li>
				 * <li>A magnifier icon that will allow you to filter the list of Variant classes. By clicking on the icon some tools will appear :</li>
				 *   <ul>
				 *   <li>A dropdown to filter by states</li>
				 *   <li>A search to filter with a string. The search can be applied on different attributes</li>
				 *   </ul>
				 * </ul>
				 * </p>
				 * </blockquote>
				 *
				 * @memberof module:DS/ConfiguratorPanel/ConfiguratorPanel#
				 *
				 * @param {Object} options - Available options.
				 * @param {Object} options.parentContainer - The parent container where the ToolbarPresenter will be injected
				 * @param {Object} options.modelEvents - The modelEvents object
				 * @param {Object} options.configModel - The configModel object
                 * @param {Object} options.attributesList - The List of attributes that will be displayed in the attributes filter
                 * @param {Object} options.defaultAttributeSelected - Default attribute selected in the list of attributes
                 * @param {Object} options.add3DButton - {OPTIONNAL} option to create a "3D" button in the toolbar. Added for Enovia Demo. Should be used in Model Editor integration
				 *
				 */

				 currentAttributeForSearch: '',
				 currentValueForSearch: '',

				 init: function (options) {

				     var that = this;
				     that.currentAttributeForSearch = options.defaultAttributeSelected;

				     that._attributesList = (options.attributesList) ? options.attributesList : [];
					 that._dropdownObjectForRules = {};
					 that.actionsList = null;


					 var CustomActionsView = ActionsView.extend({
						itemView : ActionView.extend({
							onRender : function() {
								this._parent();
								if(this.model.get('style')) {
									var style = this.model.get('style');
									if(UWA.is(this.model.get('style'), 'function')) {
										style = style();
									}
									this.container.setStyles(style);

								}
								if(this.model.get('id')) {
									this.container.id = this.model.get('id');
								}

								if(this.model.get('dropdown')) {

									var optionsDropdown = this.model.get('dropdown');
									var params = {};

									params.target = this.container;
									if(optionsDropdown.multiSelect)
										params.multiSelect = optionsDropdown.multiSelect;
									if(optionsDropdown.closeOnClick)
										params.closeOnClick = optionsDropdown.closeOnClick;
									if(optionsDropdown.items)
										params.items = optionsDropdown.items;
									if(optionsDropdown.events)
										params.events = optionsDropdown.events;

                                    params.renderTo = options.parentContainer;

									var dropdownObj = new DropdownMenu(params);

									if(this.model.get('dropdownObject'))
										that[this.model.get('dropdownObject')] = dropdownObj;
								}
								if(this.model.get('associatedText')) {
									this.container.addContent(this.model.get('associatedText'));
								}

								if(this.model.get('tooltip')) {
								    this.container.title = this.model.get('tooltip');
								}
							}
						})
					});

					 //Create the Main div of the Configurator
					var ToolbarDiv = document.createElement('div');
					ToolbarDiv.id = "ConfiguratorToolbar";

					var extendedToolbarDiv = UWA.extendElement(ToolbarDiv);


					//Create the div for the Mandatory and the Conflicts icons on the left of configurator toolbar
					var leftToolbarDiv = document.createElement('div');
					leftToolbarDiv.id = "leftToolbarDiv";

					var extendedLeftToolbarDiv = UWA.extendElement(leftToolbarDiv);

					extendedLeftToolbarDiv.inject(extendedToolbarDiv);

					//Actions for Mand and Conflicts icons

					var mandVarClassesNumberSpan = document.createElement('span');
					mandVarClassesNumberSpan.innerHTML = "(" + options.configModel.getNumberOfMandFeaturesNotValuated() + ")";
					mandVarClassesNumberSpan.id = "mandVarClassesNumberSpan";
					var extendedMandVarClassesNumberSpan = UWA.extendElement(mandVarClassesNumberSpan);

					options.modelEvents.subscribe({event:'OnMandFeatureNumberChange'}, function(data) {
						 mandVarClassesNumberSpan.innerHTML = "(" + data.value + ")";
					});

					var conflictingVarClassesNumberSpan = document.createElement('span');
					conflictingVarClassesNumberSpan.innerHTML = "(" + options.configModel.getNumberOfConflictingFeatures() + ")";
					conflictingVarClassesNumberSpan.id = "conflictingVarClassesNumberSpan";
					var extendedConflictingVarClassesNumberSpan = UWA.extendElement(conflictingVarClassesNumberSpan);

					options.modelEvents.subscribe({event:'OnConflictFeatureNumberChange'}, function(data) {

						document.getElementById("ConflictingFeaturesContainer").style.opacity = (options.configModel.getNumberOfConflictingFeatures() == 0)? 0:1;
						document.getElementById("ConflictingFeaturesContainer").style.cursor = (options.configModel.getNumberOfConflictingFeatures() == 0)? 'initial':'pointer';

						conflictingVarClassesNumberSpan.innerHTML = "(" + data.value + ")";
					});

					var actionsList = [{
							text : "Mandatory icon",
							icon: 'attention',
							actionId: 'MandatoryIcon',
							tooltip: nlsConfiguratorKeys[ConfiguratorVariables.UnselectedMandatory],
							handler: function(e) {
								if( !extendedToolbarDiv.style.height) {
									extendedToolbarDiv.style.height = extendedToolbarDiv.offsetHeight + "px";
								}

								if(!searchIconActivated){
									searchIconActivated = true;
									extendedFilteringToolsDiv.style.display = "block";

									extendedToolbarDiv.style.height = extendedRightToolbarDiv.offsetHeight + extendedFilteringToolsDiv.offsetHeight + "px";

									options.modelEvents.publish({
									    event: 'OnToolbarHeightChange',
									    data: { value: getToolbarHeight() }
									});

									document.getElementById('searchIcon').style.color = 'rgb(54, 142, 196)';
								}

								var selectedStatusList = FilterStatusDDMenu.getSelectedItems();

								for(var i=0; i<selectedStatusList.length; i++) {
									FilterStatusDDMenu.toggleSelection(selectedStatusList[i]);
									FilterStatusDDMenu.enableItem(selectedStatusList[i].name);
								}

								FilterStatusDDMenu.toggleSelection(FilterStatusDDMenu.getItem(ConfiguratorVariables.UnselectedMandatory));
								FilterStatusDDMenu.disableItem(FilterStatusDDMenu.getItem(ConfiguratorVariables.UnselectedMandatory).name);

								iconFilterStatusSpan.set('class', "fonticon fonticon-attention");

								options.modelEvents.publish( {
									event:	'OnFilterStatusChange',
									data:	{value : ConfiguratorVariables.UnselectedMandatory}
								});
							},
							style : function() {
							    var iconColor = '#5b5d5e';
    							var iconContWidth = '50%';

    							return { color: iconColor, width: iconContWidth};
    						},
							associatedText: extendedMandVarClassesNumberSpan
					},
					{
							text : "Conflicts icon",
							icon: 'alert',
							id: 'ConflictingFeaturesContainer',
							actionId: 'ConflictsIcon',
							tooltip: nlsConfiguratorKeys[ConfiguratorVariables.SelectionInConflict],
							handler: function(e) {
								if(options.configModel.getNumberOfConflictingFeatures() > 0) {
									if( !extendedToolbarDiv.style.height) {
										extendedToolbarDiv.style.height = extendedToolbarDiv.offsetHeight + "px";
									}

									if(!searchIconActivated){
										searchIconActivated = true;
										extendedFilteringToolsDiv.style.display = "block";

										extendedToolbarDiv.style.height = extendedRightToolbarDiv.offsetHeight + extendedFilteringToolsDiv.offsetHeight + "px";

										options.modelEvents.publish({
										    event: 'OnToolbarHeightChange',
										    data: { value: getToolbarHeight() }
										});

										document.getElementById('searchIcon').style.color = 'rgb(54, 142, 196)';
									}

									var selectedStatusList = FilterStatusDDMenu.getSelectedItems();

									for(var i=0; i<selectedStatusList.length; i++) {
										FilterStatusDDMenu.toggleSelection(selectedStatusList[i]);
										FilterStatusDDMenu.enableItem(selectedStatusList[i].name);
									}

									FilterStatusDDMenu.toggleSelection(FilterStatusDDMenu.getItem(ConfiguratorVariables.SelectionInConflict));
									FilterStatusDDMenu.disableItem(FilterStatusDDMenu.getItem(ConfiguratorVariables.SelectionInConflict).name);

									iconFilterStatusSpan.set('class', "fonticon fonticon-alert");

									options.modelEvents.publish( {
										event:	'OnFilterStatusChange',
										data:	{value : ConfiguratorVariables.SelectionInConflict}
									});
								}
							},
							style : function() {
    							var iconColor = 'red';
    							var iconContWidth = '50%';

    							return { color: iconColor, width: iconContWidth, opacity:0, cursor: 'initial'};
    						},
							associatedText: extendedConflictingVarClassesNumberSpan
					}];



					var actionView = new CustomActionsView(getActionObj(actionsList));
					actionView = actionView.render();
					actionView.container.setStyles({ verticalAlign: 'middle', justifyContent: 'flex-start'});

					actionView.inject(extendedLeftToolbarDiv);

					//Create the div for configuration mode, Multi-sel, rules assistance level and search icons
					var rightToolbarDiv = document.createElement('div');
					rightToolbarDiv.id = "rightToolbarDiv";

					var extendedRightToolbarDiv = UWA.extendElement(rightToolbarDiv);

					extendedRightToolbarDiv.inject(extendedToolbarDiv);

					//create a span for completeness status text
					var completenessStatusSpan = document.createElement('span');
					completenessStatusSpan.id = "completenessStatus";
					completenessStatusSpan.innerHTML = nlsConfiguratorKeys[options.configModel.getCompletenessStatus()];

					var extendedCompStatusSpan = UWA.extendElement(completenessStatusSpan);

					extendedCompStatusSpan.inject(extendedRightToolbarDiv);

					var searchIconActivated = false;

					function getIcon(options)
					{
						var IconDiv = UWA.createElement('span',{
							'class': 'fonticon fonticon-2x fonticon-' + options.icon ,
						});
						if(options.id && options.id !='') IconDiv.id = options.id;
						IconDiv.changeIcon = function(icon )
						{
							this.set('class', 'fonticon fonticon-2x fonticon-' + icon);
						};
						return IconDiv;
					}

					var itemsForSelectionMode;
					var iconForSelectionMode;
					var tooltipForSelectionMode;

					if(options.configModel.getSelectionMode() == ConfiguratorVariables.selectionMode_Build) {
						itemsForSelectionMode = [
							{ name: ConfiguratorVariables.selectionMode_Build, text: nlsConfiguratorKeys[ConfiguratorVariables.BuildConfiguration], fonticon: 'up-dir', selected: true, disabled: true },
							{ name: ConfiguratorVariables.selectionMode_Refine, text: nlsConfiguratorKeys[ConfiguratorVariables.RefineConfiguration], fonticon: 'down-dir', selectable: true, disabled: options.configModel.getReadOnlyFlag() }
						];
						iconForSelectionMode = 'up-dir';
						tooltipForSelectionMode = nlsConfiguratorKeys[ConfiguratorVariables.BuildConfiguration];
					}
					else {
						itemsForSelectionMode = [
							{ name: ConfiguratorVariables.selectionMode_Build, text: nlsConfiguratorKeys[ConfiguratorVariables.BuildConfiguration], fonticon: 'up-dir', selectable: true, disabled: options.configModel.getReadOnlyFlag() },
							{ name: ConfiguratorVariables.selectionMode_Refine, text: nlsConfiguratorKeys[ConfiguratorVariables.RefineConfiguration], fonticon: 'down-dir', selected: true, disabled: true }
						];
						iconForSelectionMode = 'down-dir';
						tooltipForSelectionMode = nlsConfiguratorKeys[ConfiguratorVariables.RefineConfiguration];
					}

					var iconCompletenessStatus;
					if(options.configModel.getCompletenessStatus() == ConfiguratorVariables.Hybrid)
						iconCompletenessStatus = 'high';
					else if(options.configModel.getCompletenessStatus() == ConfiguratorVariables.Complete)
						iconCompletenessStatus = 'medium';
					else
						iconCompletenessStatus = 'low';

					var txtIcon = getIcon({	id: 'optIcon' ,	icon: iconCompletenessStatus});
					txtIcon.inject(extendedRightToolbarDiv);


					var iconForRulesAssistanceLevel = 'block';
					var tooltipForRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.NoRuleApplied];
					var itemsForRulesAssistanceLevel = [];
					var selectedState = false;
					var rulesMode = options.configModel.getRulesMode();
					var rulesActivation = options.configModel.getRulesActivation();

					options.modelEvents.subscribe({event:'checkModelConsistency_SolverAnswer'}, function(data) {

						 if(that._dropdownObjectForRules != null) {
							 var ddown = that._dropdownObjectForRules;

							 if(options.configModel.getRulesActivation() == 'false') {
								if(ddown.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration)) ddown.enableItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration);
								if(ddown.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration)) ddown.enableItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration);
								if(ddown.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions)) ddown.enableItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions);
								if(ddown.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions)) ddown.enableItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions);
								ddown.enableItem(ConfiguratorVariables.NoRuleApplied);

								if(ddown.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration) && ddown.isSelected(ddown.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration).name))
									ddown.toggleSelection(ddown.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration));
								if(ddown.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration) && ddown.isSelected(ddown.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration).name))
									ddown.toggleSelection(ddown.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration));
								if(ddown.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions) && ddown.isSelected(ddown.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions).name))
									ddown.toggleSelection(ddown.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions));
								if(ddown.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions) && ddown.isSelected(ddown.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions).name))
									ddown.toggleSelection(ddown.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions));

								if(ddown.getItem(ConfiguratorVariables.NoRuleApplied) && !ddown.isSelected(ddown.getItem(ConfiguratorVariables.NoRuleApplied).name))
									ddown.toggleSelection(ddown.getItem(ConfiguratorVariables.NoRuleApplied));

								ddown.disableItem(ConfiguratorVariables.NoRuleApplied);

								document.getElementById('ruleAssistanceLevelIcon').getElementsByTagName('span')[0].className='fonticon fonticon-block fonticon-2x';
							}


						 }
							console.log(that._dropdownObjectForRules.getSelectedItems());

					});

					if(options.configModel.getMultiSelectionState() == "true" && rulesActivation == 'true') {
						Utilities.displayNotification({
							eventID: 'info',
							msg: nlsConfiguratorKeys.InfoMultiSelAndRules
						});
					}

						if(options.configModel.getAppFunc().rulesMode_ProposeOptimizedConfiguration == "yes") {
							selectedState=false;
							if(rulesMode == ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration && rulesActivation == 'true') {
								selectedState=true;
								iconForRulesAssistanceLevel = 'chart-area';
								tooltipForRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.ProposeOptimizedConfiguration];
							}
							itemsForRulesAssistanceLevel.push({ name: ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration, text: nlsConfiguratorKeys[ConfiguratorVariables.ProposeOptimizedConfiguration], fonticon: 'chart-area', selectable: true, selected: selectedState, disabled: (options.configModel.getReadOnlyFlag() == true || rulesMode == ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration) });
						}
						if(options.configModel.getAppFunc().rulesMode_SelectCompleteConfiguration == "yes") 	{
							selectedState=false;
							if(rulesMode == ConfiguratorVariables.RulesMode_SelectCompleteConfiguration && rulesActivation == 'true') {
								selectedState=true;
								iconForRulesAssistanceLevel = 'cube';
								tooltipForRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.SelectCompleteConfiguration];
							}
							itemsForRulesAssistanceLevel.push({ name: ConfiguratorVariables.RulesMode_SelectCompleteConfiguration, text: nlsConfiguratorKeys[ConfiguratorVariables.SelectCompleteConfiguration], fonticon: 'cube', selectable: true, selected: selectedState, disabled: (options.configModel.getReadOnlyFlag() == true || rulesMode == ConfiguratorVariables.RulesMode_SelectCompleteConfiguration)});
						}
						if(options.configModel.getAppFunc().rulesMode_EnforceRequiredOptions == "yes") {
							selectedState=false;
							if(rulesMode == ConfiguratorVariables.RulesMode_EnforceRequiredOptions && rulesActivation == 'true') {
								selectedState=true;
								iconForRulesAssistanceLevel = '3ds-how';
								tooltipForRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.EnforceRequiredOptionsAndSelectDefault];
							}
							itemsForRulesAssistanceLevel.push({ name: ConfiguratorVariables.RulesMode_EnforceRequiredOptions, text: nlsConfiguratorKeys[ConfiguratorVariables.EnforceRequiredOptionsAndSelectDefault], fonticon: '3ds-how', selectable: true, selected: selectedState, disabled: (options.configModel.getReadOnlyFlag() == true || rulesMode == ConfiguratorVariables.RulesMode_EnforceRequiredOptions)});
						}
						if(options.configModel.getAppFunc().rulesMode_DisableIncompatibleOptions == "yes") {
							selectedState=false;
							if(rulesMode == ConfiguratorVariables.RulesMode_DisableIncompatibleOptions && rulesActivation == 'true') {
								selectedState=true;
								iconForRulesAssistanceLevel = 'list-times';
								tooltipForRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.DisableIncompatibleOptions];
							}
							itemsForRulesAssistanceLevel.push({ name: ConfiguratorVariables.RulesMode_DisableIncompatibleOptions, text: nlsConfiguratorKeys[ConfiguratorVariables.DisableIncompatibleOptions], fonticon: 'list-times', selectable: true, selected: selectedState, disabled: (options.configModel.getReadOnlyFlag() == true || rulesMode == ConfiguratorVariables.RulesMode_DisableIncompatibleOptions)});
						}
						itemsForRulesAssistanceLevel.push({ className: "divider" });
						itemsForRulesAssistanceLevel.push({ name: ConfiguratorVariables.NoRuleApplied, text: nlsConfiguratorKeys[ConfiguratorVariables.NoRuleApplied], fonticon: 'block', selectable: true, selected: (rulesActivation == "false"), disabled: (options.configModel.getReadOnlyFlag() == true || rulesActivation == "false")});

					//Actions list creation
					that.actionsList = [
						//iconCompletenessStatus kept seperately , to solve update issue
							{
							text : "Configuration mode icon",
							icon: iconForSelectionMode,
							id: 'configurationModeIcon',
							actionId: 'ConfigurationModeIcon',
							tooltip: nlsConfiguratorKeys["Selection mode"] + ' : ' + tooltipForSelectionMode,
							handler: function(e) {
							},
							style : function() {
    							var iconColor = '#5b5d5e';

    							return { color: iconColor};
    						},
							dropdown : {
								multiSelect: false,
								closeOnClick: true,
								items: itemsForSelectionMode,
								events: {
									onClick: function (e, item) {
										if(item.elements.icon)
											document.getElementById('configurationModeIcon').getElementsByTagName('span')[0].className =  item.elements.icon.className + ' fonticon-2x';

										if (item.elements.icon) {
										    var nlsConfigurationMode;

										    if (item.name == ConfiguratorVariables.selectionMode_Build)
										        nlsConfigurationMode = nlsConfiguratorKeys[ConfiguratorVariables.BuildConfiguration];
										    else if (item.name == ConfiguratorVariables.selectionMode_Refine)
										        nlsConfigurationMode = nlsConfiguratorKeys[ConfiguratorVariables.RefineConfiguration];

										    document.getElementById('configurationModeIcon').getElementsByTagName('span')[0].title = nlsConfiguratorKeys["Selection mode"] + ' : ' + nlsConfigurationMode;
										}

										this.enableItem(ConfiguratorVariables.selectionMode_Build);
										this.enableItem(ConfiguratorVariables.selectionMode_Refine);

										this.disableItem(item.name);

										options.configModel.setSelectionMode(item.name);

										options.modelEvents.publish( {
											event:	'OnConfigurationModeChange',
											data:	{value : item.name}
										});
									}
								}
							}
					},
					{
							text : "Multi Selection icon",
							icon: 'popup',
							actionId: 'MultiSelIcon',
							tooltip: (options.configModel.getMultiSelectionState() == "true") ? (nlsConfiguratorKeys["Multi-Selection"] + " : " + nlsConfiguratorKeys["Enabled"]) : (nlsConfiguratorKeys["Multi-Selection"] + " : " + nlsConfiguratorKeys["Disabled"]),
							handler: function (e) {
							    if (options.configModel.getReadOnlyFlag() == false) {
							        var multiSelActivated = (options.configModel.getMultiSelectionState() == "true");

							        if (multiSelActivated) {
							            options.configModel.setMultiSelectionState("false");
							            e.currentTarget.style.color = '';
							            e.currentTarget.title = (nlsConfiguratorKeys["Multi-Selection"] + " : " + nlsConfiguratorKeys["Disabled"]);
							            multiSelActivated = false;
							        }
							        else {
							            options.configModel.setMultiSelectionState("true");
							            e.currentTarget.style.color = 'rgb(54, 142, 196)';
							            e.currentTarget.title = (nlsConfiguratorKeys["Multi-Selection"] + " : " + nlsConfiguratorKeys["Enabled"]);
							            multiSelActivated = true;

							            if (options.configModel.getRulesActivation() == 'true') {
							                Utilities.displayNotification({
							                    eventID: 'info',
							                    msg: nlsConfiguratorKeys.InfoMultiSelAndRules
							                });
							            }
							        }



							        options.modelEvents.publish({
							            event: 'OnMultiSelectionChange',
							            data: { value: multiSelActivated }
							        });

							        //ConfiguratorSolverFunctions.SetMultiSelectionOnSolver(multiSelActivated);
							    }
							},
							style : function() {
								var multiSelActivated = (options.configModel.getMultiSelectionState() == "true");

								var iconColor = multiSelActivated ? 'rgb(54, 142, 196)' : '';

    							return { color: iconColor};
    						}
					},
					{
							text : "Rules assistance level icon",
							icon: iconForRulesAssistanceLevel,
							id: 'ruleAssistanceLevelIcon',
							tooltip: nlsConfiguratorKeys["Rules assistance level"] + ' : ' + tooltipForRulesAssistanceLevel,
							actionId: 'RulesAssistanceLevelIcon',
							handler: function(e) {
							},
							style : function() {
    							var iconColor = '#5b5d5e';

    							return { color: iconColor};
    						},
							dropdown : {
								multiSelect: false,
								closeOnClick: true,
								items: itemsForRulesAssistanceLevel,
								events: {
									onClick: function (e, item) {
										var newRulesActivation;
										var newRulesMode;

										if(item.elements.icon)
										    document.getElementById('ruleAssistanceLevelIcon').getElementsByTagName('span')[0].className = item.elements.icon.className + ' fonticon-2x';

										if (item.elements.icon){
										    var nlsRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.NoRuleApplied];

										    if (item.name == ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration)
										        nlsRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.ProposeOptimizedConfiguration];
										    else if (item.name == ConfiguratorVariables.RulesMode_SelectCompleteConfiguration)
										        nlsRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.SelectCompleteConfiguration];
										    else if (item.name == ConfiguratorVariables.RulesMode_EnforceRequiredOptions)
										        nlsRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.EnforceRequiredOptionsAndSelectDefault];
										    else if (item.name == ConfiguratorVariables.RulesMode_DisableIncompatibleOptions)
                                                nlsRulesAssistanceLevel = nlsConfiguratorKeys[ConfiguratorVariables.DisableIncompatibleOptions];

										    document.getElementById('ruleAssistanceLevelIcon').getElementsByTagName('span')[0].title = nlsConfiguratorKeys["Rules assistance level"] + ' : ' + nlsRulesAssistanceLevel;
										}

										if(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration)) this.enableItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration);
										if(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration)) this.enableItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration);
										if(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions)) this.enableItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions);
										if(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions)) this.enableItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions);
										this.enableItem(ConfiguratorVariables.NoRuleApplied);

										if(item.name == ConfiguratorVariables.NoRuleApplied) {
											if(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration));
											if(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration));
											if(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions));
											if(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions));

											this.disableItem(ConfiguratorVariables.NoRuleApplied);

											newRulesActivation = "false";

										    //remove Conflicts Icon if any
											if (document.getElementById("ConflictingFeaturesContainer")) {
											    document.getElementById("ConflictingFeaturesContainer").style.opacity = 0;
											    document.getElementById("ConflictingFeaturesContainer").style.cursor = 'initial';
										    }
										}
										else if(item.name == ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration) {
											if( this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration) && !this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration));
											if( this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration) && !this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration));
											if( this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions) && !this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions));
											if( this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions) && !this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions));
											if(this.isSelected(this.getItem(ConfiguratorVariables.NoRuleApplied).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.NoRuleApplied));

											this.disableItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration);

											newRulesActivation = "true";
											newRulesMode = ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration;

										}
										else if(item.name == ConfiguratorVariables.RulesMode_SelectCompleteConfiguration) {
											if(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration));
											if( this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration) && !this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration));
											if( this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions) && !this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions));
											if( this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions) && !this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions));
											if(this.isSelected(this.getItem(ConfiguratorVariables.NoRuleApplied).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.NoRuleApplied));

											this.disableItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration);

											newRulesActivation = "true";
											newRulesMode = ConfiguratorVariables.RulesMode_SelectCompleteConfiguration;
										}
										else if(item.name == ConfiguratorVariables.RulesMode_EnforceRequiredOptions) {
											if(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration));
											if(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration));
											if( this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions) && !this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions));
											if( this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions));
											if(this.isSelected(this.getItem(ConfiguratorVariables.NoRuleApplied).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.NoRuleApplied));

											this.disableItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions);

											newRulesActivation = "true";
											newRulesMode = ConfiguratorVariables.RulesMode_EnforceRequiredOptions;
										}
										else if(item.name == ConfiguratorVariables.RulesMode_DisableIncompatibleOptions) {
											if(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_ProposeOptimizedConfiguration));
											if(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_SelectCompleteConfiguration));
											if(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions) && this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_EnforceRequiredOptions));
											if( this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions) && !this.isSelected(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions));
											if(this.isSelected(this.getItem(ConfiguratorVariables.NoRuleApplied).name))
												this.toggleSelection(this.getItem(ConfiguratorVariables.NoRuleApplied));

											this.disableItem(ConfiguratorVariables.RulesMode_DisableIncompatibleOptions);

											newRulesActivation = "true";
											newRulesMode = ConfiguratorVariables.RulesMode_DisableIncompatibleOptions;
										}

										options.configModel.setRulesActivation(newRulesActivation);

										if(newRulesActivation == "true") {
											options.configModel.setRulesMode(newRulesMode);

											if(options.configModel.getMultiSelectionState() == "true") {
												Utilities.displayNotification({
													eventID: 'info',
													msg: nlsConfiguratorKeys.InfoMultiSelAndRules
												});
											}
										}

										options.modelEvents.publish( {
											event:	'OnRuleAssistanceLevelChange',
											data:	{value : item.name}
										});

										//if(newRulesActivation == "true")
											//ConfiguratorSolverFunctions.setSelectionModeOnSolver(newRulesMode);

									}
								}
							},
							dropdownObject: "_dropdownObjectForRules"
					},{
							text : "Search icon",
							icon: 'search',
							id: 'searchIcon',
							actionId: 'SearchIcon',
							handler: function(e) {
								if( !extendedToolbarDiv.style.height) {
									extendedToolbarDiv.style.height = extendedToolbarDiv.offsetHeight + "px";
								}

								if(searchIconActivated){
									searchIconActivated = false;
									extendedFilteringToolsDiv.style.display = "none";

									if (document.getElementById("searchInput")) {
									    document.getElementById("searchInput").value = "";

									    options.modelEvents.publish({
									        event: 'OnSearchValueChange',
									        data: {
									            value: document.getElementById("searchInput").value,
									            attribute: that.currentAttributeForSearch
									        }
									    });
									}

									extendedToolbarDiv.style.height = extendedRightToolbarDiv.offsetHeight + extendedFilteringToolsDiv.offsetHeight + "px";
									e.currentTarget.style.color = '';
								}
								else{
									searchIconActivated = true;
									extendedFilteringToolsDiv.style.display = "block";

									extendedToolbarDiv.style.height = extendedRightToolbarDiv.offsetHeight + extendedFilteringToolsDiv.offsetHeight + "px";
									e.currentTarget.style.color = 'rgb(54, 142, 196)';
								}


								options.modelEvents.publish({
								    event: 'OnToolbarHeightChange',
								    data: { value: getToolbarHeight() }
								});
							}
					}];

					options.modelEvents.subscribe({event:'OnCompletenessStatusChange'}, function(data) {
						 var oldValue = completenessStatusSpan.textContent;
						 completenessStatusSpan.innerHTML = nlsConfiguratorKeys[data.value];

						 var iconName;
						 switch(data.value)
						 {
							case ConfiguratorVariables.Complete: iconName = "medium";
																break;
							case ConfiguratorVariables.Partial: iconName = "low";
																break;
							case ConfiguratorVariables.Hybrid: iconName = "high";
																break;
						 }
						 txtIcon.changeIcon(iconName);
					});

					var actionView = new CustomActionsView(getActionObj(that.actionsList));
					actionView = actionView.render();
					actionView.container.setStyles({ /*verticalAlign: 'middle',*/ justifyContent: 'flex-start', display: 'inline-flex'});

					actionView.inject(extendedRightToolbarDiv);


				     //create a span for 3DButton
					if (options.add3DButton && options.add3DButton === "yes") {
					    var _3DButtonSpan = document.createElement('span');
					    _3DButtonSpan.id = "3DButtonSpan";

					    var extended3DButtonSpan = UWA.extendElement(_3DButtonSpan);

					    extended3DButtonSpan.inject(extendedRightToolbarDiv);

					    var activatedState = "false";

					    var _3DButton = new Button({ value: '3D', className: 'info', id: 'my3DButton', }).inject(extended3DButtonSpan);
					    _3DButton.addEvent("onClick", function () {
					        if (activatedState === "true") {
					            activatedState = "false";
					            this.elements.input.className = 'btn-info btn btn-root';
					        }
					        else {
					            activatedState = "true";
					            this.elements.input.className = 'btn-primary btn btn-root';
					        }

					        options.modelEvents.publish({
					            event: 'Request3DFromConfigPanel',
					            data: { value: (activatedState === "true") ? "show" : "hide" }
					        });
					    });

					}

					//Create the div of filtering tools
					var filteringToolsDiv = document.createElement('div');
					filteringToolsDiv.id = "filteringToolsDiv";

					var extendedFilteringToolsDiv = UWA.extendElement(filteringToolsDiv);

					extendedFilteringToolsDiv.inject(extendedToolbarDiv);

					//Create the dropdown to filter the Variant Classes with their status
					var selectStatusDiv = document.createElement('div');
					selectStatusDiv.id = 'selectFilterOnStatusDiv';

					var extendedSelectStatusDiv = UWA.extendElement(selectStatusDiv);

					extendedSelectStatusDiv.inject(extendedFilteringToolsDiv);

					var buttonFilterStatus = new Button({
						 icon: 'down-dir right',
						 id:'FilterStatusButton'
					}).inject(selectStatusDiv);

					var iconFilterStatusSpan = document.createElement('span');
					iconFilterStatusSpan.id = 'iconFilterStatusSpan';

					var extendedIconFilterStatusSpan = UWA.extendElement(iconFilterStatusSpan);
					extendedIconFilterStatusSpan.inject(buttonFilterStatus.getContent());

					var statusItems = [];

					statusItems.push({ text: nlsConfiguratorKeys["Filter on status"], className: 'header' });
					statusItems.push({ className: "divider" });
					statusItems.push({ name: ConfiguratorVariables.Unselected, text: nlsConfiguratorKeys[ConfiguratorVariables.Unselected], fonticon: 'mouse-pointer-square', selectable: true });
					statusItems.push({ name: ConfiguratorVariables.UnselectedMandatory, text: nlsConfiguratorKeys[ConfiguratorVariables.UnselectedMandatory], fonticon: 'attention', selectable: true });
					statusItems.push({ name: ConfiguratorVariables.ChosenByTheUser, text: nlsConfiguratorKeys[ConfiguratorVariables.ChosenByTheUser], fonticon: 'user-check', selectable: true });
					statusItems.push({ name: ConfiguratorVariables.RequiredByRules, text: nlsConfiguratorKeys[ConfiguratorVariables.RequiredByRules], fonticon: '3ds-how', selectable: true });
					statusItems.push({ name: ConfiguratorVariables.DefaultSelected, text: nlsConfiguratorKeys[ConfiguratorVariables.DefaultSelected], fonticon: 'star', selectable: true });
					if (options.configModel.getAppFunc().rulesMode_ProposeOptimizedConfiguration == "yes")
					    statusItems.push({ name: ConfiguratorVariables.ProposedByOptimization, text: nlsConfiguratorKeys[ConfiguratorVariables.ProposedByOptimization], fonticon: 'chart-area', selectable: true });
					statusItems.push({ name: ConfiguratorVariables.DismissedByTheUser, text: nlsConfiguratorKeys[ConfiguratorVariables.DismissedByTheUser], fonticon: 'user-times', selectable: true });
					statusItems.push({ name: ConfiguratorVariables.SelectionInConflict, text: nlsConfiguratorKeys[ConfiguratorVariables.SelectionInConflict], fonticon: 'alert', selectable: true });
					statusItems.push({ name: ConfiguratorVariables.NoFilter, text: nlsConfiguratorKeys[ConfiguratorVariables.NoFilter], fonticon: '', selected: true, disabled: true });

					var params = {
						target: buttonFilterStatus.getContent(),
						multiSelect: false,
						closeOnClick: true,
						id: 'FilterStatusDDMenu',
						items: statusItems,
                        renderTo: options.parentContainer,
						events: {
							onClick: function (e, item) {
								if(item.elements.icon)
									iconFilterStatusSpan.set('class', item.elements.icon.className);
								else
									iconFilterStatusSpan.set('class', '');

								this.enableItem(this.getItem(ConfiguratorVariables.Unselected).name);
								this.enableItem(this.getItem(ConfiguratorVariables.UnselectedMandatory).name);
								this.enableItem(this.getItem(ConfiguratorVariables.ChosenByTheUser).name);
								this.enableItem(this.getItem(ConfiguratorVariables.RequiredByRules).name);
								this.enableItem(this.getItem(ConfiguratorVariables.DefaultSelected).name);
								this.enableItem(this.getItem(ConfiguratorVariables.ProposedByOptimization).name);
								this.enableItem(this.getItem(ConfiguratorVariables.DismissedByTheUser).name);
								this.enableItem(this.getItem(ConfiguratorVariables.SelectionInConflict).name);
								this.enableItem(this.getItem(ConfiguratorVariables.NoFilter).name);

								this.disableItem(item.name);

								options.modelEvents.publish( {
									event:	'OnFilterStatusChange',
									data:	{value : item.name}
								});
							}
						}
					};

					var FilterStatusDDMenu = new DropdownMenu(params);



					buttonFilterStatus.inject(selectStatusDiv);

					//Create the input to Search on the Variant Classes
					var inputSearchVariantClasses = new InputText({
					    placeholder: nlsConfiguratorKeys["Search"] +' (' + that.currentAttributeForSearch + ')',
						id: 'searchInput'
					});

					inputSearchVariantClasses.elements.input.ondrop = function (e) {
					    return false;
					};

					inputSearchVariantClasses.elements.input.onkeyup = function(e) {
						that.currentValueForSearch = e.target.value;
						if(e.key == "Enter") {
						    if (e.target.value == '') return;

							addSavedFilter(e.target.value, that.currentAttributeForSearch);

							options.modelEvents.publish( {
								event:	'OnFilterStringSaved',
								data:	{
											value : e.target.value,
											attribute : that.currentAttributeForSearch
										}
							});

							inputSearchVariantClasses.elements.input.value = '';
							that.currentValueForSearch = '';

							options.modelEvents.publish({
							    event: 'OnToolbarHeightChange',
							    data: { value: getToolbarHeight() }
							});
						}
						else {
						    if (e.key == "Escape") {
						        e.target.value = "";
						    }
							options.modelEvents.publish( {
								event:	'OnSearchValueChange',
								data:	{
										value : e.target.value,
										attribute : that.currentAttributeForSearch
										}
							});
						}
					};

					inputSearchVariantClasses.inject(extendedFilteringToolsDiv);

					//Create the dropdown to filter on attributes
					var AttributesMenuDiv = document.createElement('div');
					AttributesMenuDiv.id = 'attributesMenuDiv';

					var extendedAttributesMenuDiv = UWA.extendElement(AttributesMenuDiv);
					extendedAttributesMenuDiv.inject(extendedFilteringToolsDiv);


					var itemListForAttributesDropDown = [
                        { text: nlsConfiguratorKeys["Filter on attributes"], className: 'header' },
                        { className: "divider" }
					];

					for (var m = 0; m < that._attributesList.length; m++) {
					    if (that._attributesList[m] == that.currentAttributeForSearch)
					        itemListForAttributesDropDown.push({ name: that._attributesList[m], text: that._attributesList[m], selected: true, disabled: true });
                        else
					        itemListForAttributesDropDown.push({ name: that._attributesList[m], text: that._attributesList[m], selectable: true });
					}

					//Actions for Attributes Menu icon
					var actionsList = [{
							text : "Attributes menu icon",
							icon: 'menu-dot',
							id: "attributesMenuIcon",
							actionId: 'AttributesMenuIcon',
							tooltip: nlsConfiguratorKeys["Filter on attributes"],
							handler: function(e) {
							},
							style : function() {
    							var iconColor = '#5b5d5e';

    							return { color: iconColor};
    						},
							dropdown : {
								multiSelect: false,
								closeOnClick: true,
								items: itemListForAttributesDropDown,
								events: {
									onClick: function (e, item) {
										that.currentAttributeForSearch = item.name;
										inputSearchVariantClasses.elements.input.placeholder = nlsConfiguratorKeys["Search"] +' (' + item.text + ')';

										for (var n = 0; n < that._attributesList.length; n++) {
										    this.enableItem(this.getItem(that._attributesList[n]).name);
										}

										this.disableItem(item.name);

										options.modelEvents.publish( {
											event:	'OnFilterAttributeChange',
											data:	{ attribute: item.name,
													value: that.currentValueForSearch
													}
										});
									}
								}
							}
					}];

					var actionView = new CustomActionsView(getActionObj(actionsList));
					actionView = actionView.render();
					actionView.container.setStyles({ verticalAlign: 'middle', justifyContent: 'flex-start'});

					actionView.inject(AttributesMenuDiv);



					function getActionObj(actionsList) {
						var actionObj = {
						collection : new ActionsCollection(actionsList),
						events : {
							'onActionClick' : function(actionView, event) {
								var actionFunction = actionView.model.get('handler');

									if (UWA.is(actionFunction, 'function')) {
										actionFunction(event);
									}
								}
							}
						};

						return actionObj;
					}


					//Create the div that will show the saved filters
					var SavedFiltersDiv = document.createElement('div');
					SavedFiltersDiv.id = "savedFiltersDiv";

					var extendedSavedFiltersDiv = UWA.extendElement(SavedFiltersDiv);

					function addSavedFilter(FilterString, FilterAttribute) {
						var tempDiv = document.createElement('div');

						var tempSpan = document.createElement('span');
						tempSpan.innerHTML = FilterString + " (" + FilterAttribute + ")";
						var extendedTempSpan = UWA.extendElement(tempSpan);
						var extendedTempDiv = UWA.extendElement(tempDiv);

						extendedTempSpan.inject(tempDiv);
						extendedTempDiv.inject(extendedSavedFiltersDiv);

						var actionsList = [{
							text : "Erase icon",
							icon: 'erase',
							actionId: 'EraseIcon',
							handler: function(e) {
								removeSavedFilter(tempDiv, FilterString, FilterAttribute);
							}
						}];

						var actionView = new CustomActionsView(getActionObj(actionsList));
						actionView = actionView.render();
						actionView.container.setStyles({ verticalAlign: 'middle', justifyContent: 'flex-start', display: 'inline-flex', float: 'right'});

						actionView.inject(tempDiv);

						var spans = tempDiv.getElementsByTagName('span');
						if(spans[1].className == "fonticon fonticon-2x fonticon-erase") {
							spans[1].className = "fonticon fonticon-erase";
						}
					};

					function removeSavedFilter(tempDiv, FilterString, FilterAttribute) {
						 tempDiv.parentNode.removeChild(tempDiv);

						 options.modelEvents.publish( {
							event:	'OnFilterStringRemoved',
							data:	{
										value : FilterString,
										attribute : FilterAttribute
									}
						 });

						 options.modelEvents.publish({
						     event: 'OnToolbarHeightChange',
						     data: { value: getToolbarHeight() }
						 });
					}

					function getToolbarHeight() {
					    return extendedSavedFiltersDiv.offsetHeight + parseInt(extendedToolbarDiv.style.height.split("px")[0]) + 10;     //10 is for the marginTop added on savedFiltersDiv
					}

					options.parentContainer.addContent(extendedToolbarDiv);
					options.parentContainer.addContent(extendedSavedFiltersDiv);
				 },

				 getToolbarHeight: function () {
				     return document.getElementById("ConfiguratorToolbar").offsetHeight + document.getElementById("savedFiltersDiv").offsetHeight + 10;     //10 is for the marginTop added on savedFiltersDiv
				 }

			 });


		return ToolbarPresenter;
	});

/**
 * @module DS/ConfiguratorPanel/scripts/Presenters/ConfigGridPresenter
 * @description Module-Presenter to display a resume of a PC. This presenter also support multi-selection of PC. All the selected PCs will be displayed in a single tab
 */

define(
	'DS/ConfiguratorPanel/scripts/Presenters/ConfigGridPresenter',
	[
		'UWA/Core',
		'DS/CoreEvents/ModelEvents',
		'DS/Tree/TreeNodeModel',
    'DS/DataGridView/DataGridView',
		'DS/Tree/TreeDocument',
		'DS/UIKIT/Mask',
		'DS/Utilities/Utils',
		'DS/xModelEventManager/xModelEventManager',
		'DS/ConfiguratorPanel/scripts/Utilities',
		'DS/ConfiguratorPanel/scripts/Models/ConfiguratorModel',
		'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
		'DS/ConfiguratorPanel/scripts/Presenters/CriteriaSelectionEditor',
		'DS/ConfiguratorPanel/scripts/Presenters/CriteriaSelectionView',
		'DS/ConfiguratorPanel/scripts/Presenters/CriteriaSelectorUtil',
		'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
		'i18n!DS/ConfiguratorPanel/assets/nls/ConfigGridPresenter.json',
		'css!DS/ConfiguratorPanel/css/ConfigGridPresenter.css'
	],
	function (
		UWA,
		ModelEvents,
		TreeNodeModel,
		DataGridView,
		TreeDocument,
		Mask,
		Utils,
		XModelEventManager,
		Utilities,
		ConfiguratorModel,
		ConfiguratorVariables,
		CriteriaSelectionEditor,
		CriteriaSelectionView,
		CriteriaSelectorUtil,
		NLS_ConfiguratorPanel,
		NLS) {

    'use strict';

	var ConfigGridPresenter = function () {};

	ConfigGridPresenter.prototype.init = function (modelEvents, applicationChannel, options) {
		this.modelEvents = modelEvents || new ModelEvents();
		this._applicationChannel = applicationChannel;
		this._modelEventMap = {};
		this._modelEvents = modelEvents || new ModelEvents();
		this._configModel = options.configModel;
		this._pcDataUtil = options.pCDataUtil;
		this._dictionaryUtil = options.dictionaryDataUtil;


		if(options.id && modelEvents) {
			this._modelEventMap[options.id] = modelEvents;
			this._eventManager = new XModelEventManager(modelEvents);
		} else {
			this._eventManager = new XModelEventManager();
		}
    this._modelVariabilityDico = {};
		this._dictionary = options.dictionary ? options.dictionary : options.configModel ?  options.configModel.getDictionary() || {features : []} : undefined;
		this._enableMatchingPC = true;
		this._pcList = (options.pcList && Array.isArray(options.pcList)) ? options.pcList.slice() : [];
		var that = this;
		var typeLabelMap = {
			'Variant' : NLS.variantType,
			'Value' : NLS.valueType,
			'VariabilityGroup' : NLS.variabilityGroupType,
			'Option' : NLS.optionType,
			'Parameter' : NLS.parameterType
		};
		this.options = {
			'_columns': [{
					text: NLS.titleLabel,
					dataIndex: 'tree',
					minWidth : 200,
					width: 300,
					pinned : 'left',
					alwaysVisibleFlag : true,
					getCellIcons : function(cellInfos) {
							if (cellInfos.nodeModel && cellInfos.nodeModel.getIcons) {
								if(cellInfos.nodeModel.options.id && that._pcDataUtil.isMandatory(cellInfos.nodeModel.options.id)) {
									return cellInfos.nodeModel.getIcons().concat({
										iconName : 'attention',
										fontIconFamily: WUXManagedFontIcons.Font3DS
									});
								}
								return cellInfos.nodeModel.getIcons();
							}
						}
				},
        {
					text: NLS.typeLabel,
					dataIndex: 'type',
					width: this._enableMatchingPC ? '150': 'auto',
					visibleFlag: !this._enableMatchingPC,
					pinned : 'left',
					getCellValue : function (cellInfos) {
						if(cellInfos.nodeModel) {
							return typeLabelMap[cellInfos.nodeModel.options.grid.type];
						}
					}
  			},
        {
					text: NLS.sequenceNoLabel,
					dataIndex: 'sequenceNumber',
					'width': '150',
					minWidth : '100',
					visibleFlag: !this._enableMatchingPC,
					pinned : 'left',
					typeRepresentation : 'integer'
				},
				{
					text: NLS.selectionMode,
					dataIndex: 'selectionMode',
					'width': '100',
					minWidth : '100',
					visibleFlag: true,
					pinned : 'left',
					getCellTypeRepresentation : function (cellInfos) {
						if(cellInfos.nodeModel && !(cellInfos.nodeModel.getAttributeValue('selectionType') === ConfiguratorVariables.feature_SelectionMode_Parameter ||
								(cellInfos.nodeModel.getAttributeValue('selectionType') === ConfiguratorVariables.feature_SelectionMode_Multiple &&
									that._configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Build) )) {
							return 'functionMenuIcon';
						}
						return 'string';
					},
					getCellSemantics: function(cellInfos) {
						if(cellInfos.nodeModel) {
							var cellSemantics = {
								icon: {
									iconName: "checkbox-on",
									fontIconFamily: WUXManagedFontIcons.Font3DS
								}
							}

							if(cellInfos.nodeModel.getAttributeValue('selectionType') === ConfiguratorVariables.feature_SelectionMode_Parameter ||
									(cellInfos.nodeModel.getAttributeValue('selectionType') === ConfiguratorVariables.feature_SelectionMode_Multiple &&
										that._configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Build)
									) {
										return {};
							} else {
								var selectionMode = that._configModel.getFeatureSelectionMode(cellInfos.nodeModel.getAttributeValue('ruleId'));
								if(selectionMode === ConfiguratorVariables.feature_SelectionMode_Single) {
									cellSemantics.icon.iconName = 'checkbox-on';
								} else if(selectionMode === ConfiguratorVariables.feature_SelectionMode_Multiple || selectionMode === ConfiguratorVariables.feature_SelectionMode_EnforceMultiple) {
									cellSemantics.icon.iconName = 'select-all-checkboxes';
								} else if(selectionMode === ConfiguratorVariables.feature_SelectionMode_Dismiss) {
									cellSemantics.icon.iconName = 'select-none-checkboxes';
								}
							}

							return cellSemantics;
						}

	        },
					getCellValue: function (cellInfos) {
						if(cellInfos.nodeModel) {
							if(!(cellInfos.nodeModel.getAttributeValue('selectionType') === ConfiguratorVariables.feature_SelectionMode_Parameter ||
									(cellInfos.nodeModel.getAttributeValue('selectionType') === ConfiguratorVariables.feature_SelectionMode_Multiple &&
										that._configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Build) )) {
								return that._getSelectionModeMenu(cellInfos.nodeModel.getAttributeValue('ruleId'));
							}
						}
					}
				}
			]
		};
		//To keep track of loaded PCs. Note that pc id is attribute of this object.
		this._currentlyLoadedPCs = {};
		this._matchingPCActivated = false;
		this._FILTER_MODE = {
			ALL : 0,
			CHOSEN : 1,
			UNSELECTED : 2,
			RULED : 3,
			MAND : 4,
			CONFLICTED : 5
		};
		this._filterData = {
			ids : false, //[],
			mode : this._FILTER_MODE.ALL
		};
		this.refreshCall = Utils.throttle(this.refresh, 1000).bind(this);
		this._initDivs();
		this._initializeDataGridView();
		this._subscribeEvents();
		this._loadModel();
	};

		ConfigGridPresenter.prototype._subscribeEvents = function () {
			var that = this;

			// for (var pcId in that._modelEventMap) {
			// 	if (that._modelEventMap.hasOwnProperty(pcId)) {
					that._eventManager.subscribe(that._modelEvents, 'updateAllFilters', function (data) {
						that.updateFilters(data);
					});
					that._eventManager.subscribe(that._modelEvents, 'updateVariantList' , function (data) {
						// that.updateVariantList();
					});

					that._eventManager.subscribe(that._modelEvents, 'solveAndDiagnoseAll_SolverAnswer', function (data) {
							if(data) {
								data.updateView = true;
							}
							that.updateFilters(data);

							that._dataGridView.layout.resetRowHeights();
					});

					that._eventManager.subscribe(that._modelEvents, 'OnAllVariantFilterIconClick', function () {
							that._filterData.mode = that._FILTER_MODE.ALL;
							that._applyFilter();
					});

					that._eventManager.subscribe(that._modelEvents, 'onChosenVariantIconClick', function () {
							that._filterData.mode = that._FILTER_MODE.CHOSEN;
							that._applyFilter();
					});

					that._eventManager.subscribe(that._modelEvents, 'OnUnselectedVariantIconClick', function () {
							that._filterData.mode = that._FILTER_MODE.UNSELECTED;
							that._applyFilter();
					});

					that._eventManager.subscribe(that._modelEvents, 'OnRuleNotValidatedIconClick', function () {
							that._filterData.mode = that._FILTER_MODE.RULED;
							that._applyFilter();
					});

					that._eventManager.subscribe(that._modelEvents, 'onMandVariantIconClick', function () {
							that._filterData.mode = that._FILTER_MODE.MAND;
							that._applyFilter();
					});

					that._eventManager.subscribe(that._modelEvents, 'OnConflictIconClick', function () {
							that._filterData.mode = that._FILTER_MODE.CONFLICTED;
							that._applyFilter();
					});


			// sortChildren event
			this.modelEvents.subscribe({event: 'OnSortResult' }, function (data) {
				var dataIndex = data.sortAttribute === 'displayName' ? 'tree' : data.sortAttribute;
				var order = data.sortOrder;

				if(dataIndex && order) {
					var sortOptions = {
						dataIndex : dataIndex,
						sort : order.toLowerCase()
					};
					that._dataGridView.sortModel = [sortOptions];
				}
			});

			this.modelEvents.subscribe({event: 'applyVariantListFilters' }, function (data) {
				if(data && data.filterValues) {
					var requireFiltering = true;
					if(that._filterData.ids && that._filterData.ids.length === data.filterValues.length ) {
						if(JSON.stringify(that._filterData.ids) === JSON.stringify(data.filterValues)) {
								requireFiltering = false;
						}
					}
					if(requireFiltering) {
						that._filterData.ids = data.filterValues || [];
						that._applyFilter();
					}
				}
			});
			that._eventManager.subscribe(that._modelEvents, 'show-maching-pc-action', function (activate) {
				if(activate) {
				 	that._matchingPCActivated = true;
					setTimeout( () => {that._showMatchingPCColumns();}, 200);
				} else {
					that._matchingPCActivated = false;
					// that._hideMatchingPCColumns();
					setTimeout( () => {that._hideMatchingPCColumns();}, 200);
				}
				that._dataGridView.elements.statusBar.updateNodeModel('statusLoading', { visibleFlag: that._matchingPCActivated});
			});
			that._eventManager.subscribe(that._modelEvents, 'pc-matching-pcs-load-end', function () {
				that._loadMatchingPCColumns();
				that._dataGridView.elements.statusBar.updateNodeModel('statusLoading', {
					grid: {
						data: NLS.loadingStatusLabel + ' : 100%',
						semantics: {
							icon: 'check'
						}
					}
				});
			});
			that._eventManager.subscribe(that._modelEvents, 'pc-matching-pcs-count-update', function (count) {
				that._dataGridView.elements.statusBar.updateNodeModel('totalColumns',{
					grid: {
						data: NLS.totalPCLabel + ' : ' + count,
					}
				});
			});

			that._eventManager.subscribe(that._modelEvents, 'pc-notification-different-ruleMode', function (count) {
				Utilities.displayNotification({eventID: 'warning',msg: NLS.differentRuleModelMsg});
			});

			that._eventManager.subscribe(that._modelEvents, 'pc-matching-pcs-load-start', function () {
				that._dataGridView.elements.statusBar.updateNodeModel('statusLoading', {
					grid: {
						data: NLS.loadingStatusLabel + ' : 0%',
						semantics: {
							icon: 'clock'
						}
					}
				});
			});
			that._eventManager.subscribe(that._modelEvents, 'pc-criteria-selection-change', function () {
				that._modelEvents.subscribeOnce({event: 'solveAndDiagnoseAll_SolverAnswer'}, function () {
					that._modelEvents.publish({event : 'pc-load-matching-pcs-action'});
				});
				that.callSolver();
			});
			that._eventManager.subscribe(that._modelEvents, 'pc-select-criteria-action', function (data) {
				that._pcDataUtil.selectValue(data.id, data.value);
				that._modelEvents.publish({event : 'pc-criteria-selection-change'});
			});
			that._eventManager.subscribe(that._modelEvents, 'pc-reject-criteria-action', function (data) {
				that._pcDataUtil.rejectValue(data.id, data.value);
				that._modelEvents.publish({event : 'pc-criteria-selection-change'});
				// that.callSolver();
			});
			that._eventManager.subscribe(that._modelEvents, 'pc-validate-criteria-action', function (data) {
				that._pcDataUtil.validateValue(data.id, data.value);
				that._modelEvents.publish({event : 'pc-criteria-selection-change'});
				// that.callSolver();
			});

			that._eventManager.subscribe(that._modelEvents, 'OnRuleAssistanceLevelChange', function (data) {
				if (data.value == ConfiguratorVariables.NoRuleApplied) {
					that._modelEvents.publish({event : 'pc-load-matching-pcs-action'});
				} else {
					that._modelEvents.subscribeOnce({event: 'solveAndDiagnoseAll_SolverAnswer'}, function () {
						that._modelEvents.publish({event : 'pc-load-matching-pcs-action'});
					});
				}
			});

			that._eventManager.subscribe(that._modelEvents, 'OnAllVariantMonoSelect', function (data) {
				that._modelEvents.subscribeOnce({event: 'solveAndDiagnoseAll_SolverAnswer'}, function () {
					that._modelEvents.publish({event : 'pc-load-matching-pcs-action'});
				});
			});

			that._eventManager.subscribe(that._modelEvents, 'pc-diagnose-criteria-action', function (data) {
				that._modelEvents.subscribeOnce({event : 'solveAndDiagnoseAll_SolverAnswer'}, function () {
					that._modelEvents.publish({ event : 'pc-diagnose-criteria-done', data : data });
				});
				that.callSolverOnSelectedIDs(data.id);
			});
			that._eventManager.subscribe(that._modelEvents, 'pc-update-row-height', function (data) {
				that._dataGridView.layout.resetRowHeights();
			});
			that._eventManager.subscribe(that._modelEvents, 'pc-show-criteria-tooltip', function (data) {
				that._updateTooltip(data.id, data.value);
			});
			that._eventManager.subscribe(that._modelEvents, 'pc-refresh-pc-content', function (pcId) {
				var columnID = that._dataGridView.layout.getColumnIndex(pcId);
				if(columnID > 3) {
					that._dataGridView.updateRenderedColumn(columnID,{
						updateCellContent: true,
						updateCellLayout: false,
						updateCellAttributes: false
					});
				}
			});
		};

		ConfigGridPresenter.prototype.updateFilters= function(data){
			var that = this;
			this.defaults = data ? data.answerDefaults : [];

			// var configModel = this._configModel;
			// if(configModel) {
				that._treeDocument.prepareUpdate();
				var variantNodes = that._treeDocument.getChildren();
				if(variantNodes) {

					variantNodes.forEach(function (variantNode) {
						// variantNode.options.id;
						if(data && data.updateView && that._configModel.getUpdateRequired(variantNode.options.id)){
							//that._updateView(variantNode, data);
						}

					});
				}
				that._treeDocument.pushUpdate();

			that.refreshCall();
			// that.updateVariantList();
		};

		ConfigGridPresenter.prototype._applyFilter = function() {
			var data = this._filterData.ids;
			var mode = this._filterData.mode;
			var that = this;
			var children = this._treeDocument.getChildren();
			if(!children) {
				children = [];
			}

			// this._FILTER_MODE = {
			// 	ALL : 0,
			// 	CHOSEN : 1,
			// 	UNSELECTED : 2,
			// 	RULED : 3,
			// 	CONFLICTED : 4
			// }
			this._treeDocument.prepareUpdate();
			children.forEach(function (nodeModel) {

				var visibility = false;
				var isFiltered = false;
				// APPLYING FILTER
				// if(configModel) {
					var featureId = nodeModel.options.id;
					if(that._configModel.getStateWithId(featureId)=== "Incompatible") {
						if(!that._configModel.getUserSelectVariantIDs(featureId)) {
							visibility = false;
						}
					} else {
						visibility = true;
					}
					if(mode === undefined || mode !== that._FILTER_MODE.ALL) {
						isFiltered = true;
					}
					if(visibility) {
						switch (mode) {
							// case that._FILTER_MODE.ALL:
							// 		visibility = true;
							case that._FILTER_MODE.CHOSEN:
									var isChosen = that._configModel.getFeatureIdWithChosenStatus(featureId);
									if(nodeModel.getAttributeValue('type') === "Parameter") {
										if(that._configModel.getValueWithId(featureId)) {
											isChosen = true;
										}
									}
									visibility = isChosen;
								break;
							case that._FILTER_MODE.UNSELECTED:
									var isSelcted = true;
									if(nodeModel.getAttributeValue('type') === "Parameter") {
										if(that._configModel.getValueWithId(featureId)){
											isSelcted = true;
										}
									} else {
										isSelcted = that._configModel.getFeatureIdWithStatus(featureId);
									}
									visibility = !isSelcted;
								break;
							case that._FILTER_MODE.RULED:
									var isSelected = that._configModel.getFeatureIdWithRulesStatus(featureId);
									if(nodeModel.getAttributeValue('type') === "Parameter") {
										isSelected = false;
									}
									visibility = isSelected;
								break;
							case that._FILTER_MODE.MAND:
									var isMand = that._configModel.getFeatureIdWithMandStatus(featureId);
									visibility = isMand;
								break;
							case that._FILTER_MODE.CONFLICTED:
								var conflictOptions = that._configModel.getConflictingFeatures();
								var conflictingFeatures = [];
								var rulesActivationStatus = that._configModel.getRulesActivation();
								if(that._configModel.getNumberOfConflictingFeatures() > 0){
									for (var i = 0; i < conflictOptions.length; i++) {
										for (var j = 0; j < conflictOptions[i].length; j++) {
											conflictingFeatures.push(that._configModel.getFeatureIdWithOptionId(conflictOptions[i][j]));
										}
									}
								}
								visibility = conflictingFeatures.indexOf(featureId) === -1 ? false : rulesActivationStatus;
								break;
							default :
								visibility = true;
						}

					}
				// }

				if(isFiltered && visibility === false) {
					nodeModel.hide();
				} else {
					// APPLYING SEARCH
					if(data) {
						if(data.indexOf(nodeModel.options.id) !== -1) {
							visibility = true;
						} else {
							visibility = false;
						}
					} else {
						visibility = true;
					}

					if(visibility) {
						nodeModel.show();
						nodeModel.showChildNodes();
					} else {
					// var visibleNodes = nodeModel.search({
					// 		match : function (cellInfos) {
					// 			if(data.indexOf(cellInfos.nodeModel.options.id) !== -1) {
					// 				cellInfos.nodeModel.show();
					// 				return true;
					// 			} else {
					// 				cellInfos.nodeModel.hide();
					// 				return false;
					// 			}
					// 		}
					// 	});
						var hasOptions = false;
						if(nodeModel.getAttributeValue('options')) {
							hasOptions = nodeModel.getAttributeValue('options').find((item) => {
								if(data.indexOf(item.ruleId) !== -1) {
									return true;
								} else {
									return false;
								}
							});
						}
						if(hasOptions) {
							nodeModel.show();
						} else {
							nodeModel.hide();
						}
					}
				}
			});

			this._treeDocument.pushUpdate();
			this.refreshCall();
		};

/*
		ConfigGridPresenter.prototype._updateView = function(node, data) {
			// TODO: update nodes
			var configModel = this._configModel;
			var mandatory = (node.getAttributeValue('selectionCriteria') === 'Must' || node.getAttributeValue('selectionCriteria') === true);
				var mandStatus = (mandatory || configModel.getStateWithId(node.options.id) === ConfiguratorVariables.Required);

				node.prepareUpdate();
				var children = node.getChildren();
				if(children) {
					children.forEach(function (nodeModel) {
						var state = configModel.getStateWithId(nodeModel.options.id);
						if(state === ConfiguratorVariables.Chosen || state === ConfiguratorVariables.Required || state === ConfiguratorVariables.Default) {
							mandStatus = false;
						}
					});
				}
				var icons = UWA.clone(node.options.icons);
				if(mandStatus) {
					while(icons.length > 1) {
						icons.pop();
					}
					icons.push({
						iconName : 'attention',
						fontIconFamily: WUXManagedFontIcons.Font3DS
					});
					node.options.icons = icons;
				} else {
					while(icons.length > 1) {
						icons.pop();
						node.options.icons = icons;
					}
				}
				node.pushUpdate();
		}; */

    ConfigGridPresenter.prototype._initDivs = function () {
			this._container = UWA.createElement('div');
			this._container.classList.add('pc-summary');
			this._contentDiv = UWA.createElement('div');
			this._contentDiv.classList.add('contentDiv');
			this._contentDiv.innerHTML = '';
			this._container.appendChild(this._contentDiv);
		};


    ConfigGridPresenter.prototype._initializeDataGridView = function () {
			var that = this;
	    this._treeDocument = new TreeDocument();

			var _delayRequest = Utils.debounce(that._loadPCRequest, 1000).bind(that);
			this._dataGridView = new DataGridView({
	        treeDocument: that._treeDocument,
					columns: that.options._columns,
					resize: {
						rows: false,
						columns: true,
					},
					enableDragAndDrop: false,
					showSelectionCheckBoxesFlag : false,
					rowSelection : 'none',
					columnSelection : 'none',
					onDelayedModelDataRequest : function (request) {
						var displayedColumns = request.displayedColumnsIndexes;
						displayedColumns = displayedColumns.filter((item) => item > 4);
						if(displayedColumns.length > 0) {
							// console.log('Loading colunms ' + displayedColumns);
							_delayRequest(displayedColumns);
						}
					}
			}).inject(this._contentDiv);

	    this._dataGridView.elements.container.style.height = '100%';

        //Create and register Type Representations//
				this._dataGridView.registerReusableCellContent({
					id: 'criteriaSelectionEditor',
	        buildContent: function () {
							return new CriteriaSelectionEditor({});
	        },
					cleanContent : function (content) {
						if(content && UWA.is(content.cleanContent, 'function')) {
							content.cleanContent();
						}
					}
				});
				this._dataGridView.registerReusableCellContent({
					id: 'criteriaSelectionView',
	        buildContent: function () {
							return new CriteriaSelectionView({});
	        }
				});

				var statusBarInfos = [{
          type: 0,
          id: 'totalRows',
          dataElements: {
            typeRepresentation: 'string',
            value: 'Total Variability' + ' : ' + 0,
            displayLabel: true
          }
        }, {
          type: 0,
          id: 'totalColumns',
          dataElements: {
            typeRepresentation: 'string',
            value: NLS.totalPCLabel + ' : ' + 0,
            displayLabel: true
          }
        },{
					type: 0,
					id: 'statusLoading',
					dataElements: {
						position: 'far',
						typeRepresentation: 'string',
						value: NLS.loadingStatusLabel + ' : 0%',
						displayLabel: true,
						icon: 'clock',
						visibleFlag : false
					}
				}];
				this._dataGridView.buildStatusBar(statusBarInfos);
				this._dataGridView.onContextualEvent = function(params) {
          var menu = [];
          if (params && params.collectionView) {
            if(params.cellInfos && params.cellInfos.rowID == -1){
							if(params.cellInfos.columnID < 5) {
								var headerContextualEventOptions = {
										pin: false,
										firstColumnsVisibility: true,
										columnsManagement: false,
										sizeColumnToFit: false,
										insertRow: false
								};
								menu = params.collectionView.buildDefaultContextualMenu(params, headerContextualEventOptions);
								menu = menu.splice(0, 5);
							} else if(params.cellInfos.columnID >= 5){
								var applySelectionsAction = {
									type: 'PushItem',
									title: NLS.applySelectionAction,
									icon : 'list-ok',
									action: {
										callback: function(e) {
											that._applySelections(e.context);
										},
										context: params.cellInfos
									}
								};
								var openAction = {
									type: 'PushItem',
									title: NLS.openPCAction,
									icon : 'open',
									action: {
										callback: function(e) {
											that._openPCAction(e.context);
										},
										context: params.cellInfos
									}
								};
								menu.push(applySelectionsAction);
								menu.push(openAction);
							}
            }
          }
          return menu;
        };
				this._dataGridView.onReady(() => {
				    var count = this._treeDocument.getAllDescendants().length;
						this._dataGridView.elements.statusBar.updateNodeModel('totalRows', {
							grid: {
								data: NLS.totalVariablityLabel + ' : ' + count,
							}
						});
				});

				/*
				this._treeDocument.addEventListener('state-change-action', function (evtData) {
					var referenceValue = evtData.data.referenceValue;
					var dataIndex = that._dataGridView.layout.getDataIndexFromColumnIndex(this.columnID);
					var context = this;
					UWA.merge(context, {dataIndex : dataIndex});
					if(referenceValue === ConfiguratorVariables.Unselected) {
						that._onSelect(referenceValue, context);
					} else {
						that._updateTooltip(context);
					}
				});

				this._treeDocument.addEventListener('state-validate-action', function (evtData) {
					var referenceValue = evtData.data.referenceValue;
					var dataIndex = that._dataGridView.layout.getDataIndexFromColumnIndex(this.columnID);
					var context = this;
					UWA.merge(context, {dataIndex : dataIndex});
					that._onSelect(referenceValue, context);
				});

				this._treeDocument.addEventListener('value-change-action', function (evtData) {
					var referenceValue = evtData.data.referenceValue;
					var value = evtData.data.value;
					var dataIndex = that._dataGridView.layout.getDataIndexFromColumnIndex(this.columnID);
					var context = this;
					UWA.merge(context, {dataIndex : dataIndex});
					that._onValueUpdate(value, context);
				});

				this._treeDocument.addEventListener('state-remove-action', function (evtData) {
					UWA.log('state-remove');
					var referenceValue = evtData.data.referenceValue;

					var dataIndex = that._dataGridView.layout.getDataIndexFromColumnIndex(this.columnID);
					var context = this;
					UWA.merge(context, {dataIndex : dataIndex});
					that._onUnselect(referenceValue, context);
				}); */

				// updating min width of sequenceNumber columns. fix for IR-729943: Size All Columns to Fit command KO
				that._dataGridView.addEventListener('allCellsRendered', function () {
					try {
						var cellID = that._dataGridView.layout.getCellIDFromCoordinates({
							rowID: -1,
							columnID: 2
						});
						if(UWA.is(that._dataGridView._getRenderedCellAt, 'function')) {
							var cell = that._dataGridView._getRenderedCellAt(cellID);
							if (cell && cell.component) {
								var contentSizeWithoutBorder = cell.component.computeContentSize();
								var borderSize = 2; //Take borders in account.
								var contentSize = contentSizeWithoutBorder + borderSize;
								if(contentSize > 100) {
									that._dataGridView.layout.columns[2].minWidth = contentSize.toString();
								}
							}
						}
					} catch (ignore) {}
				});
				//
		};

		/*
		ConfigGridPresenter.prototype._onSelect = function (referenceValue , context) {
			var currentNode = context.nodeModel;
			var dataIndex = context.dataIndex;
			var adjacentNodes = currentNode.getBrothers();
			var parentNode = currentNode.getParent();
			var selectionType = parentNode.getAttributeValue('selectionType');

			var configModel = this._configModel;
			var newItemState = ConfiguratorVariables.Chosen;
			if(selectionType === 'Single') {
				// ConfiguratorVariables.
				adjacentNodes.forEach(function (nodeModel) {
					var nodeId = nodeModel.options.id;
					var nodeState = configModel.getStateWithId(nodeId);
					if(nodeState === ConfiguratorVariables.Chosen){
						configModel.setStateWithId(nodeId, ConfiguratorVariables.Unselected);
						nodeModel.prepareUpdate();
						nodeModel.setAttribute(dataIndex, ConfiguratorVariables.Unselected);
						nodeModel.pushUpdate();
					}
				});

				if (referenceValue === ConfiguratorVariables.Unselected){
					var defaultItem = this.default ? this.default.indexOf(currentNode.options.id) !== -1 : false;
					newItemState = defaultItem ? ConfiguratorVariables.Unselected : ConfiguratorVariables.Chosen;
				}
				if(referenceValue === ConfiguratorVariables.Dismissed){
					newItemState = ConfiguratorVariables.Default;
				}
			} else if(selectionType === 'Multiple') {

				if (referenceValue === ConfiguratorVariables.Unselected){
					var defaultItem = this.default ? this.default.indexOf(currentNode.options.id) !== -1 : false;
					newItemState = defaultItem ? ConfiguratorVariables.Unselected : ConfiguratorVariables.Chosen;
				}
				if(referenceValue === ConfiguratorVariables.Dismissed){
					newItemState = ConfiguratorVariables.Default;
				}

			}

			configModel.setStateWithId(currentNode.options.id, newItemState);
			currentNode.prepareUpdate();
			currentNode.setAttribute(dataIndex, newItemState);
			currentNode.pushUpdate();

			this.callSolver();
		};

		ConfigGridPresenter.prototype._onUnselect = function (referenceValue , context) {
			var currentNode = context.nodeModel;
			var dataIndex = context.dataIndex;

			var parentNode = currentNode.getParent();
			var selectionType = parentNode.getAttributeValue('selectionType');

			var configModel = this._configModel;
			var newItemState = ConfiguratorVariables.Unselected;
			var build_mode = configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Build;

			if(selectionType === 'Single') {
				if(build_mode) {
					if (referenceValue === ConfiguratorVariables.Chosen){
						newItemState = ConfiguratorVariables.Unselected;
					}
					if(referenceValue === ConfiguratorVariables.Default || referenceValue === ConfiguratorVariables.Selected){
						newItemState = ConfiguratorVariables.Dismissed;
					}
				}
			} else if(selectionType === 'Multiple') {

				var children = parentNode.getChildren();
				var selectionCount = 0;
				if(children) {
					selectionCount = children.reduce(function (count, nodeModel) {
						if(nodeModel.getAttributeValue(dataIndex) ===  ConfiguratorVariables.Chosen) {
							return ++count;
						}
					}, 0);
				}

				// var build_mode = configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Build ? true : false;
				if(build_mode || (!build_mode && selectionCount > 0)) {
					if(referenceValue === ConfiguratorVariables.Default || referenceValue === ConfiguratorVariables.Selected) {
						newItemState = ConfiguratorVariables.Dismissed; //Reject Default
					} else if (referenceValue === ConfiguratorVariables.Selected) {
						newItemState = ConfiguratorVariables.Dismissed;
					} else {
						newItemState = ConfiguratorVariables.Unselected;
					}
				}
			}

			configModel.setStateWithId(currentNode.options.id, newItemState);
			currentNode.prepareUpdate();
			currentNode.setAttribute(dataIndex, newItemState);
			currentNode.pushUpdate();

			this.callSolver();
		};

		ConfigGridPresenter.prototype._onValueUpdate = function (changedValue, context) {
			var currentNode = context.nodeModel;
			var dataIndex = context.dataIndex;

			// var configModel = this._configModel;

			var valueToBeUpdated = JSON.stringify(changedValue);
			if (UWA.is(valueToBeUpdated, "string")) {
					if (currentNode.getAttributeValue('unit') && currentNode.getAttributeValue('unit') !== "" && valueToBeUpdated.indexOf(currentNode.getAttributeValue('unit')) === -1) {
							valueToBeUpdated = valueToBeUpdated + " " + currentNode.getAttributeValue('unit');
					}
			}
			if (valueToBeUpdated) {
				this._configModel.setValueWithId(currentNode.options.id, valueToBeUpdated);
			}
			currentNode.prepareUpdate();
			currentNode.setAttribute(dataIndex, changedValue);
			currentNode.pushUpdate();
		};*/

		ConfigGridPresenter.prototype._updateTooltip = function (id, value) {
			// var currentNode = context.nodeModel;
			// var dataIndex = context.dataIndex;
			var configModel = this._configModel;

			// var modelEvent = this._modelEventMap[dataIndex];
			var optionId = value; //currentNode.options.id;
			var message = "";
			var that = this;
			if(configModel.getRulesActivation() === ConfiguratorVariables.str_true && configModel.isConflictingOption(optionId)) {
				// message = this.getConflictingMessage(item.value);

				var addAlso ='';
				message = NLS_ConfiguratorPanel.get("Option") + " " + configModel.getOptionDisplayNameWithId(optionId) + " " + NLS_ConfiguratorPanel.get("is conflicting with") + " : ";
				var listOfListOfConflictingIds = configModel.getConflictingFeatures();
				var listOfListOfRulesImplied = configModel.getImpliedRules();
				//need to traverse the list again, to generate the text for tooltip

				for (var i = 0; i < listOfListOfConflictingIds.length; i++) {
					if (listOfListOfConflictingIds[i].indexOf(optionId) !== -1) {
						if (addAlso) message += NLS_ConfiguratorPanel.get("and also conflicting with ");
						for (var j = 0 ; j < listOfListOfConflictingIds[i].length; j++) {
							if (optionId !== listOfListOfConflictingIds[i][j]) {
								message += configModel.getFeatureDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "[" + configModel.getOptionDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "]";
								addAlso = true;
							}
						}
						if (listOfListOfRulesImplied.length > 0) {
							var nls_ImpliedRules = NLS_ConfiguratorPanel.get("ImpliedRules");
							for (var j = 0 ; j < listOfListOfRulesImplied[i].length; j++) {
								if (j == 0) {message += " "+ nls_ImpliedRules + " : ";}
								var ruleName = configModel.getRuleDisplayNameWithId(listOfListOfRulesImplied[i][j]) || listOfListOfRulesImplied[i][j];
								message += " " + ruleName;
							}
						}
						break;
					}
				}
			} else {
				message =  NLS_ConfiguratorPanel.get("Loading");

				this._modelEvents.subscribeOnce({ 'event' : 'getResultingStatusOriginators_SolverAnswer' }, function (data) {
					if(data) {
						// var state = configModel.getStateWithId(data.optionSelected);
						// var listIncompatibilities = data.listOfIncompatibilitiesIds ? data.listOfIncompatibilitiesIds : [];
						// var optionName = configModel.getOptionDisplayNameWithId(data.optionSelected);
						// var message = "";
						// var nls_option = NLS_ConfiguratorPanel.get("Option");
						// var nls_is = NLS_ConfiguratorPanel.get("is");
						// if (data.answerRC !== ConfiguratorVariables.str_ERROR) {
						// 	message = nls_option + " " + optionName + " " + nls_is + " " + NLS_ConfiguratorPanel.get(state);
						// 	if (listIncompatibilities.length > 0) {
						// 		message += " "+NLS_ConfiguratorPanel.get("because")+" ";
						// 		for (var i = 0; i < listIncompatibilities.length; i++) {
						// 			if(i > 0) message += ",";
						// 			for (var j = 0; j < listIncompatibilities[i].length; j++) {
						// 				state = configModel.getStateWithId(listIncompatibilities[i][j]);
						// 				var variant = configModel.getFeatureDisplayNameWithId(listIncompatibilities[i][j]) + "[" + configModel.getOptionDisplayNameWithId(listIncompatibilities[i][j]) + "]"
						// 				message += " " + nls_option + " " + variant + " " + nls_is + " " + NLS_ConfiguratorPanel.get(state);
						// 			}
						// 		}
						// 	}
						// }else{
						// 	message += NLS_ConfiguratorPanel.get("InfoComputationAborted");
						// }
						var listIncompatibilities = data.listOfIncompatibilitiesIds ? data.listOfIncompatibilitiesIds : [];
						var model = configModel;
						var state = model.getStateWithId(data.optionSelected);
						var optionName = model.getOptionDisplayNameWithId(data.optionSelected);
						var rc = data.answerRC;

						message = '';

						if (listIncompatibilities.length === 0) {
								if (rc !== ConfiguratorVariables.str_ERROR) {
										message = UWA.i18n("Option") + " " + optionName + " " + UWA.i18n("is") + " " + UWA.i18n(state);
								}
						} else {
								var msgStr1 = UWA.i18n("Option #OPTION# is #STATUS# because") + " ";
								msgStr1 = msgStr1.replace("#OPTION#", optionName);
								msgStr1 = msgStr1.replace("#STATUS#", UWA.i18n(state));
								message = msgStr1;

								for (var i = 0; i < listIncompatibilities.length; i++) {

										if (i > 0)
												message += " " + UWA.i18n("and because") + " ";

										for (var j = 0; j < listIncompatibilities[i].length; j++) {

												state = model.getStateWithId(listIncompatibilities[i][j]);

												var msgStr2 = UWA.i18n("#OPTION# is #STATUS#");
												msgStr2 = msgStr2.replace("#OPTION#", model.getFeatureDisplayNameWithId(listIncompatibilities[i][j]) + "[" + model.getOptionDisplayNameWithId(listIncompatibilities[i][j]) + "]");
												msgStr2 = msgStr2.replace("#STATUS#", UWA.i18n(state));
												message += " " + msgStr2 ;
										}
								}
						}

						if (rc === ConfiguratorVariables.str_ERROR) {
								message += UWA.i18n("InfoComputationAborted");
						}
						// currentNode.getModelEvents().publish({ 'event' : 'state-message-update', data : message });
						that._criteriaSelectorUtil.updateTooltip(id, message);
					}
				});
				this._modelEvents.publish({ 'event' :'SolverFct_getResultingStatusOriginators', data : {value : optionId}});
			}
			// currentNode.getModelEvents().publish({ 'event' : 'state-message-update', data : message });
			that._criteriaSelectorUtil.updateTooltip(id, message);
		};

		ConfigGridPresenter.prototype.callSolver = function () {
			var modelEvent = this._modelEvents;
			if(this._configModel && modelEvent) {
				if(this._configModel.getRulesActivation() === ConfiguratorVariables.str_true) {
					modelEvent.publish({event:'SolverFct_CallSolveMethodOnSolver', data : {}});
				}else{
					this.updateFilters();
					modelEvent.publish({event: 'solveAndDiagnoseAll_SolverAnswer'});
				}
			}
		};
		ConfigGridPresenter.prototype.callSolverOnSelectedIDs = function (id) {
			var modelEvent = this._modelEvents;
			if(this._configModel && modelEvent) {
				if(this._configModel.getRulesActivation() === ConfiguratorVariables.str_true) {
					var idsToDiagnose = this._pcDataUtil.getIdsToDiagnose(id);
					modelEvent.publish({event:'SolverFct_CallSolveOnSelectedIDsMethodOnSolver', data : {"idsToDiagnose" : idsToDiagnose}});
				}else{
					this.updateFilters();
					modelEvent.publish({event: 'solveAndDiagnoseAll_SolverAnswer'});
				}
			}
		};

		ConfigGridPresenter.prototype._loadModel = function () {
        // this._dictionary
				// this._treeDocument
				var that = this;
				if(this._dictionary) {
					this._treeDocument.prepareUpdate();
					this._treeDocument.removeRoots();
					if(UWA.is(this._dictionary.features,'array')) {
						this._dictionary.features.forEach(function (feature) {
							var featureNode = that._createTreeNode(feature);
							if(featureNode) {
								that._treeDocument.addChild(featureNode);
							}
						});

					}
					this._treeDocument.pushUpdate();
					this._isLoaded = true;
				}
    };

		ConfigGridPresenter.prototype._createTreeNode = function (contentOptions) {
			var tmpTreeNode;
			if(contentOptions) {
				var id = contentOptions.ruleId;
				var label = contentOptions.displayName;
				if(id && label) {
					var image = contentOptions.image;
					var gridValue = {};
					for (var optionKey in contentOptions) {
						if (contentOptions.hasOwnProperty(optionKey)) {
							// if(optionKey === 'options') {
							// 	continue;
							// }
							gridValue[optionKey] = contentOptions[optionKey];
						}
					}

					tmpTreeNode = new TreeNodeModel({
						id: id,
						label: label,
						icons: image ? [image] : [],
						grid: gridValue,
					});
				}
			}
			return tmpTreeNode;
		};

		ConfigGridPresenter.prototype.refresh = function (forceUpdate) {
			if(forceUpdate && this._pcDataUtil) {
				this._pcDataUtil.refresh();
			}
			if(this._dataGridView) {
				try {
					this._dataGridView.updateRenderedColumn( 3,{
					updateCellContent: true,
					updateCellLayout: false,
					updateCellAttributes: false
				});
					this._dataGridView.updateRenderedColumn( 0,{
						updateCellContent: true,
						updateCellLayout: false,
						updateCellAttributes: false
					});
				} catch (e) {
					console.log('Error in refreshing');
				}

			}
		};

		ConfigGridPresenter.prototype.loadVariabilityDictionary = function (dictionary) {
			this._variabilityDictionary = dictionary;
			this._isLoaded = false;
		};

		ConfigGridPresenter.prototype.inject = function (parentContainer) {
        this._container.inject(parentContainer);
    };

		ConfigGridPresenter.prototype.clear = function () {
			this._container.innerHTML = '';
		};

    ConfigGridPresenter.prototype.destroy = function () {
			this._eventManager.cleanup();
			this._container.innerHTML = '';
		};


		//Product Configuration management as a columns//
		ConfigGridPresenter.prototype.loadConfigurationInfo = function (pcDetails, configurations) {

			if(pcDetails && pcDetails.id) {
				var pcId = pcDetails.id;

				if(!configurations) {
					configurations = {};
				}
				if(!this._configModel) {
					var configModel = new ConfiguratorModel({
						configuration: configurations,
						pcId: pcId,
						appRulesParams: {
							multiSelection: 'true',
							selectionMode: 'selectionMode_Build',
							rulesMode: '',
							rulesActivation: 'true',
							completenessStatus: 'Unknown',
							rulesCompliancyStatus: 'Unknown'
						},
						appFunc: {
							multiSelection: "yes",
							selectionMode_Build: "yes",
							selectionMode_Refine: "yes",
							rulesMode_ProposeOptimizedConfiguration:  "no",
							rulesMode_SelectCompleteConfiguration: "no",
							rulesMode_EnforceRequiredOptions: "yes",
							rulesMode_DisableIncompatibleOptions: "yes"
						},
						modelEvents: new ModelEvents(),
						readOnly: true,
						enableValidation : false
					});

					if((!this._dictionary && this._variabilityDictionary) || !this._isLoaded) {
						configModel.setDictionary(this._variabilityDictionary);
						this._dictionary = configModel.getDictionary();
						this._loadModel();
					}
					this._configModel = configModel;
				}

				this._criteriaSelectorUtil = new CriteriaSelectorUtil({configModel : this._configModel, modelEvents: this._modelEvents, pCDataUtil:  this._pcDataUtil, dictionaryDataUtil : this._dictionaryUtil});
				this._pcDataUtil = this._criteriaSelectorUtil._pcDataUtil;
				this._loadColumnForPC(pcDetails, configurations);
			}
		};

		ConfigGridPresenter.prototype._loadColumnForPC = function (pcObj, pcStatusInfo) {
			if (pcObj && pcStatusInfo) {
				if (this._currentlyLoadedPCs[pcObj.id] === undefined) {
					this._createColumnForPC(pcObj, pcStatusInfo);
				} else {
					UWA.log("PC with id : " + pcObj.id + " is already loaded in the view...");
				}
			}
		};

		ConfigGridPresenter.prototype._createColumnForPC = function (pcObj, pcStatusInfo) {
			var that = this;
			this._currentlyLoadedPCs[pcObj.id] = pcStatusInfo;

			var columnOptions = {
				'dataIndex': pcObj.id,
				'text': pcObj['title'] ? pcObj['title'] : NLS.configurationLabel,
			 	'width': 200,
				minWidth: 300,
				icon : pcObj['image'] ? pcObj['image'] : '',
			  typeRepresentation : 'integer', //'selectionStateType',
				// getCellTypeRepresentation: 'integer',
				sortableFlag : false,
				pinned : 'left',
				alwaysVisibleFlag : true,
				autoRowHeightFlag: true,
			   getCellValue : function(cellInfos) {
					 	if(!cellInfos.nodeModel) {
							return;
						}
					 	var state = '';
						var configModel = that._configModel;
						if(!configModel) {
							return;
						}
						if(cellInfos.nodeModel.options.grid.type === 'Variant' ||
								cellInfos.nodeModel.options.grid.type === 'VariabilityGroup') {
									return '';
						} else if(cellInfos.nodeModel.options.grid.type === 'Parameter') {
							var value = configModel.getValueWithId(cellInfos.nodeModel.options.id);
							if(UWA.is(value, 'string')) {
								var valueSplit = value.split(' ');
								if(valueSplit.length > 0) {
									try {
										value = parseFloat(valueSplit[0]);
									} catch (e) {
										value = 0;
									}
								}
							}
							return value;
						}
						state = configModel.getStateWithId(cellInfos.nodeModel.options.id);
						if(configModel.getRulesActivation() === ConfiguratorVariables.str_true && configModel.isConflictingOption(cellInfos.nodeModel.options.id)) {
							state = ConfiguratorVariables.Conflict;
						}
			      return state;
			   },
				 editionPolicy : 'EditionInPlace',
				 onCellRequest : function (cellInfos) {
					 if(cellInfos.nodeModel && (cellInfos.nodeModel.getAttributeValue('type') === 'Variant' || cellInfos.nodeModel.getAttributeValue('type') === 'VariabilityGroup') ) {
						 // return false;
						 var component;
						 if(this.isCellActive(cellInfos.cellID)) {
							 component = cellInfos.cellView.getReusableContent();
							 if(component && component.context == cellInfos.nodeModel.options.id) {
								 	// component.setProperties(that._criteriaSelectorUtil.getProperties(cellInfos.nodeModel.options.id));
									that._criteriaSelectorUtil.updateComponent(component, cellInfos.nodeModel.options.id);
									cellInfos.cellView.setReusableContent(component);
									return;
							 }
						 }
						 component = that._dataGridView.reuseCellContent('criteriaSelectionEditor');
						 // component.setProperties(that._criteriaSelectorUtil.getProperties(cellInfos.nodeModel.options.id));
						 that._criteriaSelectorUtil.updateComponent(component, cellInfos.nodeModel.options.id);
						 component.context = cellInfos.nodeModel.options.id;
						 cellInfos.cellView.setReusableContent(component);
					 } else {
						 that._dataGridView.defaultOnCellRequest(cellInfos);
					 }
				 },
				 getCellEditableState : function (cellInfos) {
				 		return true;
				 },
				 getCellSemantics : function (cellInfos) {
					 var options = {};
					 if(cellInfos.nodeModel && (cellInfos.nodeModel.getAttributeValue('type') === 'Parameter')) {
						 options.minValue = cellInfos.nodeModel.getAttributeValue('minValue');
						 options.maxValue = cellInfos.nodeModel.getAttributeValue('maxValue');
						 options.stepValue = cellInfos.nodeModel.getAttributeValue('stepValue');
						 options.units = cellInfos.nodeModel.getAttributeValue('nlsUnit') || '';
					 }
					 return options;
				 },
				 setCellValue : function (cellInfos, value) {
					 if(cellInfos.nodeModel && (cellInfos.nodeModel.getAttributeValue('type') === 'Parameter')) {
						 var paramId = cellInfos.nodeModel.getAttributeValue('ruleId');
						 that._pcDataUtil.setParamValue(paramId, value);
					}
				 }
			};
			that._dataGridView.prepareUpdateView();
      that._dataGridView.addColumnOrGroup(columnOptions);  //where to show PC information. in edit mode it would be col 2 else its just last column
			that._dataGridView.pushUpdateView();
			that.refreshCall();
		};


		ConfigGridPresenter.prototype._applySelections = async function (context) {
			// console.log('apply to selection action');
			var pcId = this._dataGridView.layout.getDataIndexFromColumnIndex(context.columnID);
			await this._pcDataUtil.applyPCSelections(pcId);
			this._modelEvents.publish({event : 'pc-criteria-selection-change'});
		};

		ConfigGridPresenter.prototype._getSelectionModeMenu = function (id) {
			var menuList =  {
				menu : []
			};
			var singleItem = {
				type: "RadioItem",
				title: NLS_ConfiguratorPanel.Single_Select,
				icon : 'checkbox-on',
				state: this._configModel.getFeatureSelectionMode(id) == ConfiguratorVariables.feature_SelectionMode_Single ? 'selected|enabled' : 'unselected|enabled',
				action: {
					callback: () => {
						this._updateSelectioMode({id : id, selectionMode : ConfiguratorVariables.feature_SelectionMode_Single});
					}
				}
			};
			var multiItem = {
				type: "RadioItem",
				title: NLS_ConfiguratorPanel.Multi_Select,
				icon : 'select-all-checkboxes',
				state: (this._configModel.getFeatureSelectionMode(id) == ConfiguratorVariables.feature_SelectionMode_Multiple || this._configModel.getFeatureSelectionMode(id) == ConfiguratorVariables.feature_SelectionMode_EnforceMultiple) ? 'selected|enabled' : 'unselected|enabled',
				action: {
					callback: () => {
						this._updateSelectioMode({id : id, selectionMode : ConfiguratorVariables.feature_SelectionMode_Multiple});
					}
				}
			}
			if(this._dictionaryUtil.isVariant(id)) {
					menuList.menu.push(singleItem);
			}
			menuList.menu.push(multiItem);
			if(this._configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Refine) {
				menuList.menu.push({
					type: "RadioItem",
					title: NLS_ConfiguratorPanel.Dismiss_Select,
					icon : 'select-none-checkboxes',
					state: this._configModel.getFeatureSelectionMode(id) == ConfiguratorVariables.feature_SelectionMode_Dismiss ? 'selected|enabled' : 'unselected|enabled',
					action: {
						callback:  () => {
							this._updateSelectioMode({id : id, selectionMode : ConfiguratorVariables.feature_SelectionMode_Dismiss});
						}
					}
				});
			}

			return menuList;
		};

		ConfigGridPresenter.prototype._updateSelectioMode = function (options) {
			console.log('update selection mode for '+ options.id);
			var that = this;
			var currentSelectionMode = this._configModel.getFeatureSelectionMode(options.id);
			var criteria = this._dictionaryUtil.getDetails(options.id);
			if(options.selectionMode === ConfiguratorVariables.feature_SelectionMode_Single) {
				if(currentSelectionMode != ConfiguratorVariables.feature_SelectionMode_Single) {
					this._modelEvents.publish({event: 'pc-confirm-variant-singleSelect', data : {
							feature : criteria,
							needConfirm : true,
							callback : function (confirmed) {
								if(confirmed) {
			          	var isSolverCalled = false;
									if(that._configModel.emptyMultiSelectedVariants(criteria) || that._configModel.emptyDismissedOptions(criteria)) {
			            	isSolverCalled = true;
										that.callSolver();
									}
									that._configModel.setFeatureSingleSelectionMode(criteria);
			            if(!isSolverCalled){
			              	that._modelEvents.publish({event: 'updateAllFilters'});
			            }
								}
							}
						}
					});
				}
			} else if(options.selectionMode === ConfiguratorVariables.feature_SelectionMode_Multiple) {
				if(currentSelectionMode != ConfiguratorVariables.feature_SelectionMode_Multiple) {
					this._modelEvents.publish({event: 'pc-confirm-variant-multiSelect', data : {
							feature : criteria,
							needConfirm : true,
							callback : function (confirmed) {
								if(confirmed) {
			          	var isSolverCalled = false;
									if(that._configModel.emptyDismissedOptions(criteria)) {
			            	isSolverCalled = true;
										that.callSolver();
									}
									that._configModel.setFeatureMultiSelectionMode(criteria);
			            if(!isSolverCalled){
			              	that._modelEvents.publish({event: 'updateAllFilters'});
			            }
								}
							}
						}
					});
				}
			} else if(options.selectionMode === ConfiguratorVariables.feature_SelectionMode_Dismiss) {
				if(currentSelectionMode != ConfiguratorVariables.feature_SelectionMode_Dismiss) {
					this._modelEvents.publish({event: 'pc-confirm-variant-dismissSelect', data : {
							feature : criteria,
							needConfirm : true,
							callback : function (confirmed) {
								if(confirmed) {
									var isSolverCalled = false;
									if(that._configModel.emptyChosenOptions(criteria)) {
										isSolverCalled = true;
										that.callSolver();
									}
									that._configModel.setFeatureDismissMode(criteria);
									if(!isSolverCalled){
											that._modelEvents.publish({event: 'updateAllFilters'});
									}
								}
							}
						}
					});
				}
			}



		};

		ConfigGridPresenter.prototype._openPCAction = function (context) {
			var pcId = this._dataGridView.layout.getDataIndexFromColumnIndex(context.columnID);
			this._modelEvents.publish({event : 'pc-open-action', data: this._pcDataUtil.getPCDetails(pcId)});
		};

		ConfigGridPresenter.prototype._loadMatchingPCColumns = function () {
			this._dataGridView.prepareUpdateView();
			var columns = this._dataGridView.layout.getLeafColumns().slice(0,5);
			this._dataGridView.columns = columns;
			var pcList = this._pcDataUtil.getMatchingPCs();
			if(pcList.length > 0) {
				// var columns = [];
				var columns = pcList.map((pcObj) => {
					return {
						dataIndex : pcObj.id,
						text : pcObj.title,
						width : 200,
						minWidth: 300,
						sortableFlag : false,
						visibleFlag : this._matchingPCActivated,
						typeRepresentation: "integer",
						autoRowHeightFlag: true,
						getCellValue :  (cellInfos) => {
							if(cellInfos.nodeModel && cellInfos.nodeModel.options.id) {
								var pcId = this._dataGridView.getColumnOrGroup(cellInfos.columnID).dataIndex;
								return this._pcDataUtil.getSelectionValue(pcId, cellInfos.nodeModel.options.id);
							}
						},
						onCellRequest : (cellInfos) => {
	 					 if(cellInfos.nodeModel) {
							 if(cellInfos.nodeModel.getAttributeValue('type') === 'Variant' || cellInfos.nodeModel.getAttributeValue('type') === 'VariabilityGroup') {
								 // this._dataGridView.defaultOnCellRequest(cellInfos);
								 setTimeout(() => {
									 if(!this._dataGridView.getVisibleCellsInViewport().hasOwnProperty(cellInfos.cellID)) {
										 cellInfos.cellModel = '';
										 try {
										 	this._dataGridView.defaultOnCellRequest(cellInfos);
										} catch (e) {
											 //	ignore : error means cell is removed
										 }
										 return;
									 }
									 var component = this._dataGridView.reuseCellContent('criteriaSelectionView');
									 var value = cellInfos.cellModel;
									 if(UWA.is(value, 'array')) {
										 component.setProperties({value : value, contentType: 2});
									 } else {
										 component.setProperties({value : value, contentType: 1});
									 }
									 cellInfos.cellView.setReusableContent(component);
								 }, 10);
							 } else {
								 this._dataGridView.defaultOnCellRequest(cellInfos);
							 }
	 					 } else {
	 						 this._dataGridView.defaultOnCellRequest(cellInfos);
	 					 }
	 				 },
					 getCellSemantics : (cellInfos) => {
						 var options = {};
						if(cellInfos.nodeModel && (cellInfos.nodeModel.getAttributeValue('type') === 'Parameter') && cellInfos.cellModel != undefined) {
							options.units = cellInfos.nodeModel.getAttributeValue('nlsUnit') || '';
						}
						return options;
					 }
					};
				});
				this._dataGridView.columns = this._dataGridView.columns.concat(columns);
			}
			// setTimeout(()=>{
				this._dataGridView.layout.applyColumns();
				this._dataGridView.pushUpdateView();
				this._dataGridView.requestDelayedModelData('OnAddColumn');
			// },2000);
		};

		ConfigGridPresenter.prototype._showMatchingPCColumns = function () {
			// var pcList = this._pcDataUtil.getMatchingPCs();
			// pcList.forEach((pcObj) => {
			// 	this._dataGridView.layout.setColumnVisibleFlag(pcObj.id, true);
			// });
			for (var i = 5; i < this._dataGridView.columns.length; i++) {
				this._dataGridView.columns[i].visibleFlag = true;
			}
			this._dataGridView.layout.applyColumns();
		};
		ConfigGridPresenter.prototype._hideMatchingPCColumns = function () {
			// var pcList = this._pcDataUtil.getMatchingPCs();
			// pcList.forEach((pcObj) => {
			// 	this._dataGridView.layout.setColumnVisibleFlag(pcObj.id, false);
			// });
			for (var i = 5; i < this._dataGridView.columns.length; i++) {
				this._dataGridView.columns[i].visibleFlag = false;
			}
			this._dataGridView.layout.applyColumns();
		};
		ConfigGridPresenter.prototype._loadPCRequest = function (columnIndexes) {
			var totalColumns =  this._dataGridView.columns.length;
			var pcListToLoad = [];
			columnIndexes.forEach((index) => {
				if(index < totalColumns) {
					pcListToLoad.push(this._dataGridView.layout.getDataIndexFromColumnIndex(index));
				}
			});

			// console.log("Load PC request" + pcListToLoad);
			this._pcDataUtil.loadPCDetails(pcListToLoad);
		};
		//Remove All Columns//
		/*ConfigGridPresenter.prototype.removeAllPCColumns = function () {
			var that = this;
			if (this.loadedPCsCount() > 0) {
				// Mask.mask(that._contentDiv);
				that._contentDiv.hide();
				that._dataGridView.prepareUpdateView();
				for (var pcId in this._currentlyLoadedPCs) {
					that._unloadColumnForPC(pcId);
					// if (pcId != undefined) {
					// 	//var colId = that._dataGridView.layout.getColumnIDFromDataIndex(pcId);
          //   //IMP: whenever we have some row/cell selected in the tree and then we try to remove column it will fail.
          //   that._dataGridView.unselectAll();
					// 	that._dataGridView.removeColumnOrGroup(pcId); //TODO: to remove or hide? decide later.
          //   //console.log('Removing column: ' + pcId + ' dataIndex: ' + colId );
					// 	delete that._currentlyLoadedPCs[pcId];
					//
					// }
				}
				that._dataGridView.pushUpdateView();
				// Mask.unmask(that._contentDiv);
				that._contentDiv.show();
			}
		};*/

		return ConfigGridPresenter;
});

/*
TODO:
1. When we have multiple pcs displayed and one or more rows selected in the tree, unselecting one pc removes all selection from tree.
This is required because we can not delete column without removing selection on its cells.
OR? Can we disable the row selection totally?

2. Can we Hide column instead of removing?

3. And delete columns/tree only when we have fresh summary preview Initialization

4. how to track addition of new variability and new pc?

//Steps:
//We have list of PC Id and names<PC Name will be a column in the table>
//We have dictionary corresponding to Parent model for which PC would be created.
//We have to pass this information to CfgVCSMainContainer
//Show and hide columns for PC's depending on the selection on the PC list presenter.
//Eye/Preview Icon Management
//    1. No selection : should be disabled.
//    2. Single selection : load preview display showing model variability in first column and pc in the next.
//    3. Single selection removed: remove the preview area and disable the preview icon.
//    4. On multiple selection show corresponding column with values against the rows of variability.
//Possible:
// A> Fixed Variability Column.
// B> Show and hide columns as per PC selection<
//            1. load tree with all columns at the start with cols for pcs as hidden.
//            2. show/hide as per selection.
//        OR load columns on demand and remove as per un-select of PCs
//            >
// C> Column edition.
// D> Full dico at start ? Later on only selected one and then on edit show full dico present for given model.
// E> Save capability.
*/

define(
		'DS/ConfiguratorPanel/scripts/Presenters/TopbarPresenter',
		[
			'UWA/Core',
			'DS/Handlebars/Handlebars',
			'DS/UIKIT/Iconbar',
			'DS/UIKIT/Tooltip',
			'DS/Core/ModelEvents',
			'DS/ResizeSensor/js/ResizeSensor',
			'DS/ENOXViewFilter/js/ENOXViewFilter',
			'DS/UIKIT/Input/Button',
			'DS/UIKIT/DropdownMenu',
			'DS/UIKIT/SuperModal',
			'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
			'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
			'text!DS/ConfiguratorPanel/html/TopbarPresenter.html',
			"css!DS/ConfiguratorPanel/css/TopbarPresenter.css"
			],
			function (UWA,Handlebars,Iconbar, Tooltip, ModelEvents,ResizeSensor,
				ENOXViewFilter,Button,DropdownMenu, SuperModal, ConfigVariables, NLS_ConfiguratorPanel, html_TopbarPresenter)
			{
			'use strict';

			Handlebars.registerHelper('check_3D', function(currentType, opts) {
				if(currentType == 'yes')
					return opts.fn(this);
				else
					return opts.inverse(this);
			});

			Handlebars.registerHelper('topbar_sort_type_check', function(currentType, compareToType, opts) {
				if(currentType == compareToType)
					return opts.fn(this);
				else
					return opts.inverse(this);
			});

			var template = Handlebars.compile(html_TopbarPresenter);

			var TopbarPresenter = function (options) {
				this._init(options);
			};

			/*********************************************INITIALIZATION************************************************************************/

			TopbarPresenter.prototype._init = function(options){
				var _options = options ? UWA.clone(options, false) : {};
				_options.add3DButton = _options.add3DButton ? _options.add3DButton : "no";
				UWA.merge(this, _options);
				this.allowRefine = this.configModel._appFunc.selectionMode_Refine;
				this.sort = [{id : "displayName", type : "string"}, {id : "sequenceNumber", type : "integer"}];

				this._subscribeToEvents();
				this._initDivs();
				this.inject(_options.parentContainer);
				this._updateFilterIcon(this._allVariants);
				this.configModel.setCurrentFilter(ConfigVariables.Filter_AllVariants);
				this.modelEvents.publish({ event: "OnAllVariantFilterIconClick", data:{activated:true} });

				this._filterAllVariants();
				this._filterUnselectedVariants();
				this._filterRuleVariants();
				this._filterMandVariants();
				this._filterChosenVariants();
				this._filterConflictingVariants();

				this._searchVariants();
        if(this.enableSwitchView) {
          this._addSwitchViewHandler();
        }
				this._sortVariants();
				this._findRuleAssistanceLevels({callsolve : false});
				this._render3DVariants();
				this._renderMatchingPCAction();
				this._updateSelectionMode();
			};

			TopbarPresenter.prototype._initDivs = function(){
				this._container = document.createElement('div');
				this._container.innerHTML = template(this);

				this._container = this._container.querySelector('.topbar-wrapperContainer');
				UWA.extendElement(this._container);

				this._allVariants = this._container.querySelector('#topbar-all-variants');
				this._unselectedVariants = this._container.querySelector('#topbar-unselected-variant');
				this._refineEnabled = this._container.querySelector('.topbar-refine-enabled');
				this._ruleVariants = this._container.querySelector('#topbar-rule-variants');
				this._mandVariants = this._container.querySelector('#topbar-mand-variants');
				this._chosenVariants = this._container.querySelector('#topbar-chosen-variants');
				this._conflictingVariants = this._container.querySelector('#topbar-conflicting-variants');
				this._conflictingVariants.style.display = "none";
				this._searchVariant = this._container.querySelector('#topbar-search-variants');
        if(this.enableSwitchView === true) {
            this._switchView = this._container.querySelector('#topbar-toggle-view');
						this._switchViewTooltip = new Tooltip({target: this._switchView, body: NLS_ConfiguratorPanel.Switch_DataGridView, trigger: 'touch'});
        } else {
            this._container.querySelector('#topbar-toggle-view').remove();
        }
				this._sortVariant = this._container.querySelector('#topbar-sort-variants-base');

				this._rulesAssistance = this._container.querySelector('#topbar-rules-assistance');
				// this._currentRuleAssistanceIcon = this._container.querySelector('#topbar-rule-assistance-level-icon');
				this._currentRuleAssistanceIcon = this._container.querySelector('.topbar-sup-span');
				this._searchContainer = this._container.querySelector('.topbar-MidMenu-Container');
				this._3DVariants = this._container.querySelector('#topbar-3D-button');
				this._matchingPCAction = this._container.querySelector('#topbar-show-matchingPC');

				this._unselectedBase = UWA.extendElement(this._container.querySelector('#topbar-unselected-base'));
				this._allVariantsSub = this._container.querySelector('#topbar-all-variants-sub');
				this._unselectedvariantSub = this._container.querySelector('#topbar-unselected-variant-sub');
				this._rulevariantSub = this._container.querySelector('#topbar-rule-variants-sub');
				this._mandVariantSub = this._container.querySelector('#topbar-mand-variants-sub');
				this._chosenVariantSub = this._container.querySelector('#topbar-chosen-variants-sub');
				this._conflictVariantSub = this._container.querySelector('#topbar-conflicting-variants-sub');

				var tooltip_all = new Tooltip({target: this._allVariants,body: NLS_ConfiguratorPanel.Filter_AllVariants, trigger: 'touch'});
				var tooltip_selected = new Tooltip({target: this._unselectedVariants,body: NLS_ConfiguratorPanel.Filter_Unselected, trigger: 'touch'});
				var tooltip_rules = new Tooltip({target: this._ruleVariants,body: NLS_ConfiguratorPanel.Filter_Rules, trigger: 'touch'});
				var tooltip_mand = new Tooltip({target: this._mandVariants,body: NLS_ConfiguratorPanel.Filter_Mand, trigger: 'touch'});
				var tooltip_conflits = new Tooltip({target: this._conflictingVariants,body: NLS_ConfiguratorPanel.Filter_Conflicts, trigger: 'touch'});
				var tooltip_chosen = new Tooltip({target: this._chosenVariants, body: NLS_ConfiguratorPanel.Filter_Chosen, trigger: 'touch'});
				var tooltip_search = new Tooltip({target: this._searchVariant, body: NLS_ConfiguratorPanel.Filter_Search, trigger: 'touch'});


				//R14: not available in Refine mode.
				var that = this;
				this._MultiSelectbutton = UWA.extendElement(this._container.querySelector('#topbar-toggle-variantMultiSelect'));
				this._MultiSelectbutton.addEventListener('click', function() {
					that._toggleMultiSelect();
				});
				this._MultiSelectTooltip = new Tooltip({target: this._container.querySelector('#topbar-toggle-variantMultiSelect'), body: NLS_ConfiguratorPanel.Tooltip_Switch_AllVariantMultiSelection, trigger: 'touch'});




			};


			TopbarPresenter.prototype._toggleMultiSelect= function(active) {
				if(this._MultiSelectbutton.hasClassName('active')) {
					//R14 need to confirm ?
					var that = this;
					this._confirmAllVariantMonoSelection().then( function (confirmed) {
						if(confirmed) {
							that._MultiSelectbutton.removeClassName('active');
							that._MultiSelectTooltip.setBody(NLS_ConfiguratorPanel.Tooltip_Switch_AllVariantMultiSelection);
							that.modelEvents.publish({event: 'OnAllVariantMonoSelect'});
						}
					});
				}else  {
					this._MultiSelectbutton.addClassName('active');
					this._MultiSelectTooltip.setBody(NLS_ConfiguratorPanel.Tooltip_Switch_AllVariantMonoSelection);
					this.modelEvents.publish({event: 'OnAllVariantMultiSelect'});

				}
			};


			TopbarPresenter.prototype.inject= function(parentcontainer) {
				var that = this;
				parentcontainer.appendChild(this._container);
				var resizeSensor = new ResizeSensor(this._container, function () {
					that._resize();
				});
			};

			/*********************************************EVENT HANDLING - UPDATE COUNTER*******************************************************/

			TopbarPresenter.prototype._subscribeToEvents = function() {
				var that = this;
				this.modelEvents.subscribe({event:'checkModelConsistency_SolverAnswer'},function(data){
					if(data.answerRC === "Rules_KO"){
						var ruleLevel = that._find(that._ruleLevels, ConfigVariables.NoRuleApplied);
						that._currentRuleAssistanceLevel = ConfigVariables.NoRuleApplied;
						that._currentRuleAssistanceIcon.className = ruleLevel.icon;
						that._setRulesAssistanceLevel();
						that._ruleAssistanceDD.items.forEach(function(item){
							if(item.id !== ConfigVariables.NoRuleApplied){
								that._ruleAssistanceDD.disableItem(item.id);
							}else{
								that._ruleAssistanceDD.toggleSelection(item);
							}
						});
					}
				});

				this.modelEvents.subscribe({event:'deactivate-3dbutton'}, function(){
					// unhighlight the 3D button
					if(that._3DVariants.hasClassName("topbar-icon-selected")) {
						that._3DVariants.removeClassName('topbar-icon-selected');
					}

				});

				this.modelEvents.subscribe({event:'pc-matching-pcs-count-update'}, function(count){
					var  countValue = count > 99 ? '+99': ''+count;
					that._matchingPCAction.getElement("#topbar-matchingPC-count-sub").setContent(countValue);
				});


			};

			/*********************************************ALL VARIANTS IN TOPBAR************************************************************/
			TopbarPresenter.prototype._filterAllVariants = function() {
				var that = this;
				this.modelEvents.subscribe({event:'OnAllVariantNumberChange'},function(data){
					that._allVariantsSub.innerText = data.value;
					that._allVariants.style.display = data.value === 0 ? "none" : "inline-block";
				});
				this._allVariants.onclick = function(){
					that._updateFilterIcon(that._allVariants);
					that.configModel.setCurrentFilter(ConfigVariables.Filter_AllVariants);
					that.modelEvents.publish({ event: "OnAllVariantFilterIconClick", data:{activated:true} });
				}
			};


			TopbarPresenter.prototype._updateSelectionMode = function () {
						var that = this;
						if(this.configModel.getSelectionMode() === "selectionMode_Refine"){
							this._unselectedBase.addClassName('fonticon-option-infinite');
							this._unselectedBase.removeClassName('fonticon-option-empty');
							this._MultiSelectbutton.hide();
							// refine mode => complete mode is not available
							if(this._ruleAssistanceDD.getItem(0).id === 'RulesMode_SelectCompleteConfiguration' ) {
								this._ruleAssistanceDD.getItem(0).elements.container.hide();
							}
							if(this._refineModeDD && this._refineModeDD.menus[0].items){
								this._refineModeDD.menus[0].items.forEach(function(item){
									if(item && item.id == "refine" &&  item.elements && item.elements.container ){
										if(!item.elements.container.hasClassName('selected'))
										item.elements.container.addClassName('selected');
									}
									else if(item && item.id === "build" && item.elements && item.elements.container ){
											if(item.elements.container.hasClassName('selected'))
											item.elements.container.removeClassName('selected');
										}
								});
							}
							if(this.enableSwitchView) {
								// this._switchView.hide();
							}
						}else{
							this._unselectedBase.removeClassName('fonticon-option-infinite');
							this._unselectedBase.addClassName('fonticon-option-empty');
							this._unselectedBase.removeClassName('fonticon-option-infinite');// = "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-option-empty";
							this._MultiSelectbutton.show();
							// build mode => complete mode is available
							if(this._ruleAssistanceDD.getItem(0).id === 'RulesMode_SelectCompleteConfiguration' ) {
								this._ruleAssistanceDD.getItem(0).elements.container.show();
							}
							//If user selects refine mode and cick on reset button, Tollbar will not get updated.
							if(this._refineModeDD && this._refineModeDD.menus[0].items){
								this._refineModeDD.menus[0].items.forEach(function(item){
									if(item && item.id == "refine" &&  item.elements && item.elements.container ){
										if(item.elements.container.hasClassName('selected'))
										item.elements.container.removeClassName('selected');
									}
									else if(that.configModel.getSelectionMode() === "selectionMode_Build"){
										if(item && item.id === "build" && item.elements && item.elements.container ){
											if(!item.elements.container.hasClassName('selected'))
											item.elements.container.addClassName('selected');
										}
									}
								});
							}

							if(this.enableSwitchView) {
								this._switchView.show();
							}
						}

						this.modelEvents.publish({
							event: "OnConfigurationModeChange",
							data : {mode : this.configModel.getSelectionMode()}
						});
					};



			/*********************************************UNSELECTED VARIANTS IN TOPBAR*****************************************************/
			TopbarPresenter.prototype._filterUnselectedVariants = function() {
				var that = this;
				this.modelEvents.subscribe({event:'OnUnselectedVariantNumberChange'},function(data){
					that._unselectedvariantSub.innerText = data.value;
				});
				var refineAllowed = this._container.querySelector('.topbar-refine-mode');
				if(refineAllowed){
					this._refineModeDD = new DropdownMenu({
						target: refineAllowed,
						renderTo:this.parentContainer,
						multiSelect: false,
						items : [{
							id : "build",
							text : NLS_ConfiguratorPanel.Build,
							fonticon : "option-empty",
							selectable: true,
							selected: (that.configModel.getSelectionMode() === "selectionMode_Build" ? true: false)
						},{
							id : "refine",
							text : NLS_ConfiguratorPanel.Refine,
							fonticon : "option-infinite",
							selectable: true,
							selected: (that.configModel.getSelectionMode() === "selectionMode_Refine" ? true: false)
						}],
						events: {
							onClick: function(e, item){
								if(item.id === 'build'){
									that._confirmBuild().then(function(confirmed){
										if(confirmed) {
											that.configModel.setSelectionMode(ConfigVariables.selectionMode_Build);
											that._updateSelectionMode();
										}else {
											that._refineModeDD.toggleSelection(that._refineModeDD.getItem('refine'));
										}
									});
								}else if (item.id === 'refine'){
									that._confirmRefine().then(function(confirmed) {
										if (confirmed) {
											that.configModel.setSelectionMode(ConfigVariables.selectionMode_Refine);
											that._updateSelectionMode();
										}else {
											that._refineModeDD.toggleSelection(that._refineModeDD.getItem('build'));
										}
									})

								}

							}
						}
					});
					//this._refineModeDD.getItem(0).elements.container.addClassName("topbar-drpdown-item");
					//this._refineModeDD.getItem(0).elements.container.children[1].addContent("<p class='topbar-drpdown-content'>" + NLS_ConfiguratorPanel.Refine_mode_description +"</p>");
				}
				this._unselectedVariants.onclick = function(e){
					if(e.target !== refineAllowed){
						that._updateFilterIcon(that._unselectedVariants);
						that.configModel.setCurrentFilter(ConfigVariables.Filter_Unselected);
						that.modelEvents.publish({ event: "OnUnselectedVariantIconClick", data:{activated:true} });
					}
				}
			};

			/*********************************************RULE VARIANTS IN TOPBAR*****************************************************/
			TopbarPresenter.prototype._filterRuleVariants = function() {
				var that = this;
				this.modelEvents.subscribe({event:'OnRuleNotValidatedNumberChange'},function(data){
					that._rulevariantSub.innerText = 	data.value;
					// that._ruleVariants.style.display = data.value === 0 ? "none" : "inline-block";
				});
				this._ruleVariants.onclick = function(e){
					if(e.target !== that._rulesAssistance){
					that._updateFilterIcon(that._ruleVariants);
					that.configModel.setCurrentFilter(ConfigVariables.Filter_Rules);
					that.modelEvents.publish({ event: "OnRuleNotValidatedIconClick", data:{activated:true} });
					}
				}
			}

			/*********************************************MAND VARIANTS IN TOPBAR*****************************************************/
			TopbarPresenter.prototype._filterMandVariants = function() {
				var that = this;
				this.modelEvents.subscribe({event:'OnMandVariantNumberChange'},function(data){
					that._mandVariantSub.innerText = data.value;
					that._mandVariants.style.display = data.value === 0 ? "none" : "inline-block";
				});
				this._mandVariants.onclick = function(){
					that._updateFilterIcon(that._mandVariants);
					that.configModel.setCurrentFilter(ConfigVariables.Filter_Mand);
					that.modelEvents.publish({ event: "onMandVariantIconClick", data:{activated:true} });
				}
			}

			/*********************************************CHOSEN VARIANTS IN TOPBAR*****************************************************/
			TopbarPresenter.prototype._filterChosenVariants = function() {
				var that = this;
				this.modelEvents.subscribe({event:'OnChosenVariantNumberChange'},function(data){
					that._chosenVariantSub.innerText = data.value;
					that._chosenVariants.style.display = data.value === 0 ? "none" : "inline-block";
				});
				this._chosenVariants.onclick = function(){
					that._updateFilterIcon(that._chosenVariants);
					that.configModel.setCurrentFilter(ConfigVariables.Filter_Chosen);
					that.modelEvents.publish({ event: "onChosenVariantIconClick", data:{activated:true} });
				}
			}

			/*********************************************CONFLICTING VARIANTS IN TOPBAR*************************************************/
			TopbarPresenter.prototype._filterConflictingVariants = function() {
				var that = this;
				this.modelEvents.subscribe({event:'OnConflictVariantNumberChange'},function(data){
					that._conflictVariantSub.innerText = data.value;
					that._conflictingVariants.style.display = data.value === 0 ? "none" : "inline-block";
				});
				this._conflictingVariants.onclick = function(){
					that._updateFilterIcon(that._conflictingVariants);
					that.configModel.setCurrentFilter(ConfigVariables.Filter_Conflicts);
					that.modelEvents.publish({ event: "OnConflictIconClick", data:{activated:true} });
				}
			}

			/*********************************************SEARCH IN TOPBAR*****************************************************************/
			TopbarPresenter.prototype._searchVariants = function() {
				var that = this;
				if(!this.searchComponent){
					var filterOptions = {
							allowMultipleSearch:true,
							parentContainer : this._searchContainer,
							onSearch: function(values){
								that.modelEvents.publish({ event: 'OnSearchResult', data:values});
							}
					};
					this.searchComponent = new ENOXViewFilter(filterOptions);
				}

				this._searchVariant.onclick = function(){
					that._searchContainer.style.display = that._searchContainer.style.display !== "inline-block" ? "inline-block" : "none";
					that._resize();
					var activeSearch = that._searchContainer.style.display !== "none" ;
					activeSearch ? that._searchVariant.classList.add('topbar-icon-selected') : that._searchVariant.classList.remove('topbar-icon-selected');
					that.configModel.setSearchStatus(activeSearch);
					if(!activeSearch){
						that.searchComponent.reset();
					}
				}
			}

			/*********************************************SORT IN TOPBAR*****************************************************************/

      TopbarPresenter.prototype._applySortAction = function(options){
				var that = this;
			 this.modelEvents.publish({event: 'OnSortResult', data : that.currentSort}); // applying sort
			 var sortAttribute = this._sortDropdown.activeMenu.parentItem;
			 var attributeId = that.currentSort.sortAttribute;
			 if(sortAttribute && sortAttribute.elements.container){
				 if(!(sortAttribute.elements.container.hasClassName('selected'))){
          sortAttribute.elements.container.addClassName('selected');
				 }
			 }
			 var sortMenuItems = this._sortDropdown.items;
			 sortMenuItems.forEach(function(sortItem){
					 if(sortItem.id !== attributeId){
						 if(!sortItem.parentId){ //for parent selection removal
							 if(sortItem.elements.container && sortItem.elements.container.hasClassName('selected')){
								sortItem.elements.container.removeClassName('selected');
							}
						}else{
							if(sortItem.parentId === attributeId){ //done for selection retention of mobile view
								var currentSortId = attributeId//+"-"+that.currentSort.sortOrder;
								if(sortItem.id === currentSortId){
									if(!(sortItem.elements.container.hasClassName('selected'))){
									 sortItem.elements.container.addClassName('selected');
								 }
							 }else{
								 if(sortItem.elements.container && sortItem.elements.container.hasClassName('selected')){
									sortItem.elements.container.removeClassName('selected');
								}
							 }
							}else{
								if(sortItem.elements.container && sortItem.elements.container.hasClassName('selected')){
								 sortItem.elements.container.removeClassName('selected');
							 }
							}
						}
					}
			 });
		 },
		 TopbarPresenter.prototype._removeActiveSortIcons = function(){
			 let sortOptions = this._sortDropdown.items;
			 for(let i=0;i<sortOptions.length;i++){
				 let iconsContainer = sortOptions[i].elements.container.children[1];
				 iconsContainer.children[0].classList.remove('active-sort-icon');
				 iconsContainer.children[1].classList.remove('active-sort-icon');
			 }
		 },
			TopbarPresenter.prototype._sortVariants = function() {
				var that = this;
				this._tooltipSort = new Tooltip({target: this._sortVariant, body: NLS_ConfiguratorPanel.Filter_Sort, trigger: 'touch'});
				that.currentSort;
				this._sortVariant.className = "fonticon fonticon-sorting";
				this._sortDropdown = new DropdownMenu({
					target: this._sortVariant,
					items: [
						      {
										id : "displayName",
										className:"topbar-sort-item",
										text: NLS_ConfiguratorPanel.Sort_DisplayName,
										selectable : true,
										handler : function(e){
											that._removeActiveSortIcons();
											that.currentSort = {sortOrder : "ASC", sortAttribute: 'displayName'};
											that._applySortAction(); //to maintain selections
											//items[0] -displayName   children[1] -> icons Container    children[0] - ascending icon
											that._sortDropdown.items[0].elements.container.children[1].children[0].classList.add('active-sort-icon');
											that._tooltipSort.setBody(NLS_ConfiguratorPanel.Sort_By + e.target.firstChild.textContent +'('+ NLS_ConfiguratorPanel.stringASC + ')');
										},
								  },
									{
										id : "sequenceNumber",
										className:"topbar-sort-item",
										text: NLS_ConfiguratorPanel.Sort_SequenceNo,
										selectable : true,
										handler : function(e){
											that._removeActiveSortIcons();
											that.currentSort = {sortOrder : "ASC", sortAttribute: 'sequenceNumber'};
										//	that._sortVariant.set('class','fonticon fonticon-sort-num-asc');
											that._applySortAction(); //to maintain selections
											//items[0] - displayName  children[1] -> icon container    children[0] - ascending icon
											that._sortDropdown.items[1].elements.container.children[1].children[0].classList.add('active-sort-icon');
											that._tooltipSort.setBody(NLS_ConfiguratorPanel.Sort_By + e.target.firstChild.textContent + '('+NLS_ConfiguratorPanel.integerASC + ')');
										},
								  }
								],
					events : {
							onClick : function(e, i){
							}
						}
				});
				var that = this;
				for(let sortItemIndex = 0; sortItemIndex < this._sortDropdown.items.length ; sortItemIndex++){
					var _sortRow = this._container.querySelector('#topbar-toolbar-sort-item-' + this._sortDropdown.items[sortItemIndex].id);
					var type ="";
					that.sort.forEach((item, i) => {
							if(item.id == that._sortDropdown.items[sortItemIndex].id){
								type = item.type
							}
					});

					_sortRow.style.display='';
					if(_sortRow){
						let sortOptionContainer = this._sortDropdown.items[sortItemIndex].elements.container

						sortOptionContainer.appendChild(_sortRow);
						if(type == 'string'){
							//children[1] - container of icons      //children[0] - ascending icon , children[1] - descending children
							sortOptionContainer.children[1].children[0].tooltipInfos = new Tooltip({target: sortOptionContainer.children[1].children[0],body:NLS_ConfiguratorPanel.stringASC })
							sortOptionContainer.children[1].children[1].tooltipInfos = new Tooltip({target : sortOptionContainer.children[1].children[1],body : NLS_ConfiguratorPanel.stringDESC})
						}else if(type == 'integer'){//type integer
							sortOptionContainer.children[1].children[0].tooltipInfos = new Tooltip({target : sortOptionContainer.children[1].children[0],body : NLS_ConfiguratorPanel.integerASC})
							sortOptionContainer.children[1].children[1].tooltipInfos = new Tooltip({target : sortOptionContainer.children[1].children[1],body : NLS_ConfiguratorPanel.integerDESC});
						}else if(type == 'date'){
							sortOptionContainer.children[1].children[0].tooltipInfos = new Tooltip({target : sortOptionContainer.children[1].children[0],body : NLS_ConfiguratorPanel.dateASC})
							sortOptionContainer.children[1].children[1].tooltipInfos = new Tooltip({target : sortOptionContainer.children[1].children[1],body : NLS_ConfiguratorPanel.dateDESC});
						}

						for(let order = 0;order < 2;order++){
							//children[1] - icons container   children[0,1] - ascending ,descending icon
							sortOptionContainer.children[1].children[order].addEventListener('click',function(e){
								that._removeActiveSortIcons();
								e.stopImmediatePropagation();
								let sortOrder = ( order == 1 ) ? "DESC" : "ASC";
								that.currentSort = {sortOrder : sortOrder, sortAttribute: sortOptionContainer.id };
								//that._sortVariant.set('class',e.target.classList[0] +' '+ e.target.classList[1]);
								that._applySortAction();
								let typeOfSort = "";

								// items[k] - sortContainer
								//let sortContainer = that._sortDropdown.items[sortItemIndex];
								let clickedIcon = e.target;
								let clickedIconOrder = clickedIcon.classList.contains('order-desc') ? 'DESC' : 'ASC';
								let idOfClickedSortItem = clickedIcon.getParent().getParent().id;
								that.sort.forEach((item, i) => {
										if(item.id == idOfClickedSortItem){
											typeOfSort = item.type
										}
								});
								//			children[1] - iconContainer
								let clickedActiveElement = that._sortDropdown.activeMenu.getItem(idOfClickedSortItem);
								clickedActiveElement.elements.container.classList.add('selected');
								clickedIcon.classList.add('active-sort-icon');
								that._tooltipSort.setBody(NLS_ConfiguratorPanel.Sort_By +  clickedActiveElement.name+ '(' + NLS_ConfiguratorPanel[typeOfSort+clickedIconOrder] + ')');
							})

						}
					}
				}
			}

			/*********************************************RULE ASSISTANCE IN TOPBAR************************************************************/

			TopbarPresenter.prototype._findRuleAssistanceLevels = function(options) {
				this._ruleLevels = [];
				var appFunc = this.configModel.getAppFunc();
				var ruleActivation = this.configModel.getRulesActivation();

				this._ruleLevels.push({id : ConfigVariables.NoRuleApplied,text : " " + NLS_ConfiguratorPanel["No rule applied"],icon : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-shield-empty",desc : "", selectable: true });

				if(appFunc["rulesMode_DisableIncompatibleOptions"] === "yes"){
					this._ruleLevels.push({id : "RulesMode_DisableIncompatibleOptions", text : " " + NLS_ConfiguratorPanel["Compatible"], icon : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-shield-1",desc : NLS_ConfiguratorPanel.descCompatible, selectable: true });

					if(appFunc["rulesMode_EnforceRequiredOptions"] === "yes"){
						this._ruleLevels.push({id : "RulesMode_EnforceRequiredOptions",text : " " + NLS_ConfiguratorPanel["Enforced/Infilled"],icon : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-shield-2",desc : NLS_ConfiguratorPanel.descEnforced, selectable: true });

						if(appFunc["rulesMode_SelectCompleteConfiguration"] === "yes"){
							this._ruleLevels.push({id : "RulesMode_SelectCompleteConfiguration",text : " " + NLS_ConfiguratorPanel["Complete/Fulfilled"],icon : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-shield-3",desc : NLS_ConfiguratorPanel.descComplete, selectable: true });

							if(appFunc["rulesMode_ProposeOptimizedConfiguration"] === "yes"){
								this._ruleLevels.push({id : "RulesMode_ProposeOptimizedConfiguration",text : " " + NLS_ConfiguratorPanel["Optimized"],icon : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-shield-full",desc : NLS_ConfiguratorPanel.descOptimized, selectable: true });
							}
						}
					}
				}
				var ruleLevel = this._find(this._ruleLevels, this.configModel.getRulesMode());
				this._currentRuleObj = (ruleActivation === "true" && ruleLevel) ? ruleLevel : this._ruleLevels[0];
				this._currentRuleObj.selected = true;
				this._currentRuleAssistanceIcon.className = this._currentRuleObj.icon;
				this._currentRuleAssistanceLevel = this._currentRuleObj.id;
				this._createRulesAssistanceDD();
				this._setRulesAssistanceLevel(options);
			};

			TopbarPresenter.prototype._createRulesAssistanceDD = function(icon, iconClass, selectedIconClass, itemsMap, handler){
				var that = this;
				if((!this._ruleAssistanceDD) && (this._ruleLevels.length > 1)){
					this._ruleAssistanceDD = new DropdownMenu({
						target: this._container.querySelector('#topbar-rules-assistance'),
						renderTo:this.parentContainer,
						items : [],
						events: {
							onClick: function(e, item){
								//R14 need to confirm ?
								that._confirmChangeAssistanceLevel(item.id).then( function (confirmed) {
									if(confirmed) {
										that._currentRuleObj = item;
										that._currentRuleAssistanceLevel = item.id;
										that._currentRuleAssistanceIcon.className = item.icon;
										that._setRulesAssistanceLevel();
									}else {
										// revert the dropdown menu selection
										that._ruleAssistanceDD.activeMenu.select(that._ruleAssistanceDD.getItem(that._currentRuleAssistanceLevel), true);
									}
								});
							}
						}
					});
					for(var i = 0; i < this._ruleLevels.length ; i++){
						var j = this._ruleLevels.length - 1 - i; //to enter highest level first in DD
						this._ruleAssistanceDD.addItem(this._ruleLevels[j]);
						this._ruleAssistanceDD.getItem(i).elements.container.addClassName("topbar-drpdown-item");
						this._ruleAssistanceDD.getItem(i).elements.container.children[1].addContent("<p class='topbar-drpdown-content'>"+this._ruleLevels[j].desc+"</p>");
					}
				} else if(this._ruleAssistanceDD && this._ruleAssistanceDD.activeMenu && this._currentRuleAssistanceLevel) {
					this._currentRuleObj = this._ruleAssistanceDD.getItem(this._currentRuleAssistanceLevel);
					if(this._currentRuleObj ) {
						this._ruleAssistanceDD.activeMenu.select(this._currentRuleObj, true);
					}
				}
			};

			TopbarPresenter.prototype._confirmBuild = function () {
				var that = this;
				var confirmPromise = new Promise((resolve) => {
					if( that.configModel.hasDismissedOptions()) {
						var superModal = new SuperModal({ className : 'confirm-changeSelectionMode-modal', renderTo: document.body});
						superModal.confirm(NLS_ConfiguratorPanel.Text_Confirm_EmptyAllDismissed, NLS_ConfiguratorPanel.Title_Confirm_EmptyAllDismissed, function (confirmed) {
							resolve(confirmed);
						});
					}else {
						resolve(true);
					}
				});

				return confirmPromise;
			};


			TopbarPresenter.prototype._confirmRefine = function () {
				var that = this;
				var confirmPromise = new Promise((resolve) => {
					if( this._currentRuleAssistanceLevel === 'RulesMode_SelectCompleteConfiguration') {
						var superModal = new SuperModal({ className : 'confirm-changeRefineMode-modal', renderTo: document.body});
						superModal.confirm(NLS_ConfiguratorPanel.Text_Confirm_RefineMode, NLS_ConfiguratorPanel.Title_Confirm_RefineMode, function (confirmed) {
							if(confirmed) {
								// if currentRuleAssistanceLevel is Complete => Switch to Aided mode.
								var ruleLevel = that._find(that._ruleLevels, ConfigVariables.RulesMode_EnforceRequiredOptions);
								that._currentRuleAssistanceLevel = ConfigVariables.RulesMode_EnforceRequiredOptions;
								that._currentRuleAssistanceIcon.className = ruleLevel.icon;
								that._setRulesAssistanceLevel();
							}
							resolve(confirmed);
						});
					}else {
						resolve(true);
					}
				});

				return confirmPromise;
			};

			TopbarPresenter.prototype._confirmChangeAssistanceLevel = function (newRulesMode) {
				var that = this;
				var confirmPromise = new Promise((resolve) => {
					if( newRulesMode === 'RulesMode_SelectCompleteConfiguration'  && that.configModel.hasMultiSelectVariantValues()) {
						var superModal = new SuperModal({ className : 'confirm-changAssistanceLevel-modal', renderTo: document.body});
						superModal.confirm(NLS_ConfiguratorPanel.Text_Confirm_EmptyAllVariantMultiSelect, NLS_ConfiguratorPanel.Title_Confirm_EmptyAllVariantMultiSelect, function (confirmed) {
							resolve(confirmed);
						});
					}else {
						resolve(true);
					}
				});

				return confirmPromise;
			};

			TopbarPresenter.prototype._confirmAllVariantMonoSelection = function () {
				var that = this;
				var confirmPromise = new Promise((resolve) => {
					if( that.configModel.hasMultiSelectVariantValues()) {
						var superModal = new SuperModal({ className : 'confirm-AllVariantMonoSelection-modal', renderTo: document.body});
						superModal.confirm(NLS_ConfiguratorPanel.Text_Confirm_AllVariantMonoSelection, NLS_ConfiguratorPanel.Title_Confirm_AllVariantMonoSelection, function (confirmed) {
							resolve(confirmed);
						});
					}else {
						resolve(true);
					}
				});

				return confirmPromise;
			};

			TopbarPresenter.prototype._setRulesAssistanceLevel = function(options){
				var solveCallback = options ? options.callsolve : true;
				var ruleActivation = (this._currentRuleAssistanceLevel === ConfigVariables.NoRuleApplied) ? ConfigVariables.str_false : ConfigVariables.str_true;
				// ruleActivation === ConfigVariables.str_true ? this._rulesAssistance.classList.add('topbar-icon-selected') : this._rulesAssistance.classList.remove('topbar-icon-selected');

				this.configModel.setRulesActivation(ruleActivation);
				this.configModel.setRulesMode(this._currentRuleAssistanceLevel);

				if(solveCallback){
					this.modelEvents.publish({ event: "OnRuleAssistanceLevelChange", data:	{value : this._currentRuleAssistanceLevel, callsolve :solveCallback} });
				}

				// Hide action menu in Complete Configuration Mode or Refine mode
				if(	this._currentRuleAssistanceLevel === 'RulesMode_SelectCompleteConfiguration' ||
					this.configModel.getSelectionMode() === "selectionMode_Refine") {
					this._MultiSelectbutton.hide();
					this._MultiSelectbutton.removeClassName('active');
				}else {
					this._MultiSelectbutton.show();
				}

				// disabled view switching for complete mode and if DGV is active, switch it to tile view
				if(this._currentRuleAssistanceLevel === 'RulesMode_SelectCompleteConfiguration' && this.enableSwitchView) {
					this._container.addClassName('pc-complete-mode');

					// var targetBtnSpan = UWA.extendElement(this._switchView.firstElementChild);
					// if(targetBtnSpan.hasClassName("wux-ui-3ds-view-small-tile")){
					// 	targetBtnSpan.removeClassName("wux-ui-3ds-view-small-tile");
					// 	targetBtnSpan.addClassName("wux-ui-3ds-view-list");
					// 	this.modelEvents.publish({ event: "onTopbarSwitchView", data:{"view": "classic"} });
					// 	this._switchViewTooltip.setBody(NLS_ConfiguratorPanel.Switch_DataGridView);
					// }
				} else {
					this._container.removeClassName('pc-complete-mode');
				}
			};

			/*********************************************3D IN TOPBAR*****************************************************************/
			TopbarPresenter.prototype._render3DVariants = function() {
				var that = this;
				if(this._3DVariants){
					UWA.extendElement(this._3DVariants);
					this._tooltip_3dView = new Tooltip( { target : this._3DVariants, body : NLS_ConfiguratorPanel.Show_3D_View, trigger : 'touch'});
					this._3DVariants.onclick = function(){

						let _3dViewSelected;
						if(	that._3DVariants.hasClassName("topbar-icon-selected") ){
									_3dViewSelected = true //3d view already selected
									that._3DVariants.classList.remove('topbar-icon-selected');
									that._tooltip_3dView.setBody(NLS_ConfiguratorPanel.Show_3D_View);
							} else {

									_3dViewSelected = false //3d view not selected
									that._3DVariants.classList.add('topbar-icon-selected');
									that._tooltip_3dView.setBody(NLS_ConfiguratorPanel.Hide_3D_View);
							};
							var activeStatus = that._3DVariants.hasClassName("topbar-icon-selected");
							that.modelEvents.publish({ event: "Request3DFromConfigPanel", data:{ value: (activeStatus === true) ? "show" : "hide" } });
						}
					}
				};


				TopbarPresenter.prototype._renderMatchingPCAction = function() {
					var that = this;
					if(this._matchingPCAction){
						UWA.extendElement(this._matchingPCAction);
						// this._matchingPCAction.hide();
						if(!this.enableMatchingPC) {
							return;
						}
						this._matchingPCTooltip = new Tooltip({target: this._matchingPCAction, body: NLS_ConfiguratorPanel.Tooltip_showMatchingPC, trigger: 'touch'});

						this._matchingPCAction.onclick = function(){
							that._matchingPCAction.hasClassName("topbar-icon-selected") ? that._matchingPCAction.classList.remove('topbar-icon-selected') : that._matchingPCAction.classList.add('topbar-icon-selected');
							var activeStatus = that._matchingPCAction.hasClassName("topbar-icon-selected");
							that.modelEvents.publish({ event: "show-maching-pc-action", data: (activeStatus === true) });
							if(activeStatus) {
								that._matchingPCTooltip.setBody(NLS_ConfiguratorPanel.Tooltip_hideMatchingPC);
							} else {
								that._matchingPCTooltip.setBody(NLS_ConfiguratorPanel.Tooltip_showMatchingPC);
						}
					}
				}
			}

			/*******************************************************UILITIES IN TOPBAR*************************************************************/

			TopbarPresenter.prototype._find = function (array, id) {
				if(array){
					var match;
					array.forEach(function(item){
						if(item.id === id){ match = item; return;}
					});
					return match ? match : array[0];
				}
			};

			TopbarPresenter.prototype._updateFilterIcon = function (currentFilter) {
				this.filters = this._container.querySelectorAll('.topbar-filter') ? this._container.querySelectorAll('.topbar-filter') : [];
				for(var i =0 ;i<this.filters.length ; i++){
					this.filters[i].classList.remove('topbar-filter-selected');
					//Commented due modified requirement - icon should be colored by default and not on click.
					// this.filters[i].classList.remove('topbar-filter-mand-selected');
					// this.filters[i].classList.remove('topbar-filter-conflicts-selected');
				}
				currentFilter.classList.add('topbar-filter-selected');
				//Commented due modified requirement - icon should be colored by default and not on click.
				// if(currentFilter === this._mandVariants)currentFilter.classList.add('topbar-filter-mand-selected');
				// if(currentFilter === this._conflictingVariants)currentFilter.classList.add('topbar-filter-conflicts-selected');
			};

			TopbarPresenter.prototype._resize = function () {
				if(this.searchComponent){
					this.searchComponent.container.removeClassName('topbar-maximize-searchtext');
					this.searchComponent.inject(this._searchContainer);

					if(this._container.offsetHeight > 70){
						this.searchComponent.inject(this._container);
						this.searchComponent.container.addClassName('topbar-maximize-searchtext');
					}
				}
				this.modelEvents.publish({event:"onTopbarHeightChange", data: this._container.offsetHeight })
			};

      TopbarPresenter.prototype._addSwitchViewHandler = function () {
          var that = this;
          if(this._switchView){
              this._switchView.onclick = function(event){
                  if(event) {
                      //"wux-ui-3ds-1x wux-ui-3ds-view-list"
											// var refineModeAction = that._container.querySelector('.topbar-refine-mode');
                      var targetBtnSpan = UWA.extendElement(that._switchView.firstElementChild);
                      if(targetBtnSpan.hasClassName("wux-ui-3ds-view-list")){
                          targetBtnSpan.removeClassName("wux-ui-3ds-view-list");
                          targetBtnSpan.addClassName("wux-ui-3ds-view-small-tile");
                          that.modelEvents.publish({ event: "onTopbarSwitchView", data:{ "view": "grid"} });
													that._switchViewTooltip.setBody(NLS_ConfiguratorPanel.Switch_TileView);
													// that._matchingPCAction.show();
													// if(refineModeAction) {
													// 	refineModeAction.hide();
													// }
                      } else {
                          targetBtnSpan.removeClassName("wux-ui-3ds-view-small-tile");
                          targetBtnSpan.addClassName("wux-ui-3ds-view-list");
                          that.modelEvents.publish({ event: "onTopbarSwitchView", data:{"view": "classic"} });
													that._switchViewTooltip.setBody(NLS_ConfiguratorPanel.Switch_DataGridView);
													// that._matchingPCAction.hide();
													// if(refineModeAction) {
													// 	refineModeAction.show();
													// }
                      }
                  }
              }
          }
      };
			return TopbarPresenter;
			});


define(
		'DS/ConfiguratorPanel/scripts/Presenters/SingleValueAutocompletePresenter',
		[
			'UWA/Core',
			'UWA/Event',
			'DS/Handlebars/Handlebars',
			'DS/UIKIT/Autocomplete',
			'DS/UIKIT/Mask',
			'DS/UIKIT/Tooltip',
			'DS/Controls/Popup',
			'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
			'DS/ConfiguratorPanel/scripts/Utilities',
			'DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctions',

			'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
			'text!DS/ConfiguratorPanel/html/SingleValueAutocompletePresenter.html',


			'css!DS/UIKIT/UIKIT.css',
			"css!DS/ConfiguratorPanel/css/SingleValueAutocompletePresenter.css"

			],
			function (UWA,Event, Handlebars, Autocomplete, Mask, Tooltip,WUXPopup, ConfiguratorVariables, Utilities,ConfiguratorSolverFunctions, nlsConfiguratorKeys, html_SingleValueAutocompletePresenter) {

			'use strict';

			var template = Handlebars.compile(html_SingleValueAutocompletePresenter);
			var badgeTooltip = [];
			var optionToolTip = [];
			var countConfigurations = 0;
			var rules = [];

			var SingleValueAutocompletePresenter = function (options) {
				this._init(options);
			};


			/******************************* INITIALIZATION METHODS**************************************************/

			SingleValueAutocompletePresenter.prototype._init = function(options){
				var _options = options ? UWA.clone(options, false) : {};
				UWA.merge(this, _options);
				this._subscribeEvents();
				this._initDivs();
				this.inject(_options.parentContainer);
				this._render();
			};

			SingleValueAutocompletePresenter.prototype._subscribeEvents = function(){
				var that = this;
				this.modelEvents.subscribe({ event: 'OnSortResult'}, function(data){
					that._sortAttribute = data.sortAttribute;
					that._sortOrder = data.sortOrder;
					var dataset = that._autocomplete.getDataset("_autocomplete");
				 	dataset.items = dataset.items.sort(function(a, b) {
						var nameA,nameB;
						if(that._sortAttribute === "displayName"){
							nameA = a.displayName.toUpperCase();
							nameB = b.displayName.toUpperCase();
						}
						if(that._sortAttribute === "sequenceNumber"){
							nameA = parseInt(a.sequenceNumber);
							nameB = parseInt(b.sequenceNumber);
						}
						if (that._sortOrder === "DESC") {
							var temp = nameA;
							nameA = nameB;
							nameB = temp;
						}
						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						return 0;
					});
				});
			};

			SingleValueAutocompletePresenter.prototype._initDivs = function () {
				this._container = document.createElement('div');
				this._container.innerHTML = template(this);
				this.image = this.imageContainer.getElementsByClassName("configurator-img-thumbnail");
				this.imageValidateDefault = this.imageContainer.querySelector("#config-editor-validate-default");
				this.imageValidateRequired = this.imageContainer.querySelector("#config-editor-validate-required");

				this._container = this._container.querySelector('.config-editor-singlevalue-autocomplete');
				this._iconGapContainer = this._container.querySelector('.iconGapContainer');
				this.rulesIconContainer = this._container.querySelector('#rulesIcon_' + this.variant.ruleId);
				this._validateCheckContainer = this._container.querySelector('.config-editor-validate-check');

			};

			SingleValueAutocompletePresenter.prototype.inject= function(parentcontainer) {
				parentcontainer.appendChild(this._container);
			};

			/*******************************AUTOCOMPLETE CREATION***************************************************/

			SingleValueAutocompletePresenter.prototype._render= function() {
				var that = this;
				this._autocomplete = new Autocomplete({
					multiSelect: false,
					showSuggestsOnFocus: true,
					allowFreeInput : true,
					placeholder : nlsConfiguratorKeys.type,
					events : {
						onSelect : function(item){
							that._onSelect(item);
						},
						onUnselect : function(item){
							that._onUnselect(item);
						},
						onShowSuggests : function(item, dataset){
							if(!that._isAlreadyVisible || that.configModel.getRulesMode() !== "RulesMode_SelectCompleteConfiguration"){
								that._onShowSuggests(item, this);
								that._isAlreadyVisible = true;
							}
						},
						onHideSuggests : function(item, dataset){
							that._isAlreadyVisible = false;
							if(that._pcDdInteractionToken) {
								that.modelEvents.unsubscribe(that._pcDdInteractionToken);
								that._pcDdInteractionToken = undefined;
							}
						},
						onFocus : function(){
							var variantName = that.configModel.getFeatureDisplayNameWithId(that.variant.ruleId);
							var searchBox = document.querySelector('.autocomplete-input');
							var value = searchBox ? searchBox.value : "";
							var text = that.searchValue || value;
							if(variantName.toUpperCase().contains(text.toUpperCase())){
								this.showAll();	//show all in case variant has match
							}else{
								if(text && text !== "")
									that._autocomplete.getSuggestions(text);
								else {
									this.showAll();
								}
							}
						},
						onKeyDown : function(event){
							//Disabling free input
							if(Event.preventDefault){
								Event.preventDefault(event);
							}
							// && that._autocomplete.currentSuggestions && that._autocomplete.currentSuggestions.length > 0
							if(event.code.contains("Enter") && that._autocomplete.currentSuggestions && that._autocomplete.currentSuggestions.length === 0){
									that._autocomplete.elements.input.value = "";
									that.rulesIconContainer.className = "fonticon";
							}
							UWA.extendElement(that.rulesIconContainer); //disabling for rule selected items
							if(that.rulesIconContainer && that.rulesIconContainer.hasClassName("fonticon-lock"))
								Event.preventDefault(event);
						},
						onKeyUp : function(event){
							//Disabling free input
							if(Event.preventDefault){
								Event.preventDefault(event);
							}
						}
					}
				}).inject(this._container);

				this._autocomplete.elements.inputContainer.addContent(this._iconGapContainer);
				this._autocomplete.elements.inputContainer.addContent(this._validateCheckContainer);
				this._autocomplete.elements.inputContainer.addClassName("config-editor-single-input-parent");
				this._autocomplete.elements.input.addClassName("config-editor-single-input");
				// this._validateCheckContainer.style.display = "none";

				var _variantDataset = this._createDataset();
				var _datasetConfiguration = this._createConfigurations();
				this._autocomplete.addDataset(_variantDataset, _datasetConfiguration);
				this._autocomplete.elements.clear.className = "autocomplete-reset fonticon fonticon-wrong";
				var resetIcon = this._autocomplete.elements.clear.addEvent('click', function(e){
					var item;
					if(that._autocomplete.selectedItems && that._autocomplete.selectedItems[0]){
						item = that._autocomplete.selectedItems[0];
					}
					that.configModel.setValidateVariant(that.variant.ruleId, false);
					that.configModel.setLoading(that.variant.ruleId,"Loaded");
					that._autocomplete.dispatchEvent('onUnselect', item);
				});
				this._autocomplete.elements.clear.hide();

				this._validateCheckContainer.onclick = function(e){
					this.style.display = "none";
					that.configModel.setFeatureIdWithChosenStatus(that.variant.ruleId, true);
					that.configModel.setValidateVariant(that.variant.ruleId, true);
					that.configModel.setStateWithId(that._autocomplete.selectedItems[0].optionId, ConfiguratorVariables.Chosen);
					that.configModel.setUpdateRequiredOption(that._autocomplete.selectedItems[0].optionId, true);
					//Updating the new behavior only for complete mode (LA Function).
					//To be updated for all rule modes after impact analysis.
					if(that.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration"){
						e.preventDefault();
						e.stopPropagation();
						that.updateSelections();
						that.modelEvents.publish({event:'updateAllFilters', data : {}});
					}else{
					that.callSolver();
					}
				}

				//R14 update dropdown item states.
				this.updateSelections();
			};

			/*******************************AUTOCOMPLETE INITIALIZATION - ADD DATA************************************/

			SingleValueAutocompletePresenter.prototype._createDataset= function() {
				var dataset= {name: "_autocomplete", items : []};
				if(this.variant && this.variant.options && this.variant.options.length > 0){
					//sort by seq number
					this.variant.options = this.variant.options.sort(function(a, b) {
							var nameA = parseInt(a.sequenceNo); //a.displayName.toUpperCase();
							var nameB = parseInt(b.sequenceNo);//b.displayName.toUpperCase();
							if (nameA < nameB) {
								return -1;
							}
							if (nameA > nameB) {
								return 1;
							}
							return 0;
						});
					for(var i=0; i < this.variant.options.length; i++) {
						var state = this.configModel.getStateWithId(this.variant.options[i].id) || this.configModel.getStateWithId(this.variant.optionPhysicalIds[i]) || ConfiguratorVariables.Unselected;
						var selectedFromStart = false;
						if(state == "Chosen" || state == "Default" || state == "Required"){
							selectedFromStart = true;
						}
						dataset.items.push({
							mainId : this.variant.options[i].id,
							// value: this.variant.optionPhysicalIds[i],
							value: this.variant.options[i].ruleId,
							label : this.variant.options[i].displayName,
							disabled: false,
							selected : selectedFromStart,
							closable : false,
							selectable:true,
							icon:"",
							state:state,
							conflicting: false,
							included : "",
							ruleId : this.variant.options[i].ruleId,
							// optionId : this.variant.optionPhysicalIds[i],
							optionId : this.variant.options[i].ruleId,
							tooltip : "",
							selectionCriteria : this.variant.selectionCriteria,
							variantId : this.variant.ruleId,
							optionRuleId : this.variant.options[i].ruleId,
							image : this.variant.options[i].image,
							displayName : this.variant.options[i].displayName,
							sequenceNumber : this.variant.options[i].sequenceNumber
						});
					}
				}
				return dataset;
			};

			/*******************************AUTOCOMPLETE INITIALIZATION - UPDATE DISPLAY FORMAT************************************/

			SingleValueAutocompletePresenter.prototype._createConfigurations= function() {
				return {
					templateEngine: function (itemContainer, itemDataset, item) {
						itemContainer.addClassName('default-template');
						var icon = "fonticon";
						if(item.icon && item.icon!=='') icon = "fonticon fonticon-" + item.icon;
						if(item.icon === 'alert') icon = icon + " conflict-icon";
						var content = UWA.createElement('span', {id: "DD-item-" + item.value ,'class': "suggestion-icon " +icon});
						var contentForDefault = UWA.createElement('span', {id: "Default-DD-item-" + item.value ,'class': "contentForDefault fonticon fonticon-star"});
						contentForDefault.hide();
						itemContainer.setHTML(content.outerHTML + '<div class="item-label">' + UWA.String.escapeHTML(item.label) + '</div>' + contentForDefault.outerHTML);
					}.bind(this)
				}
			};

			/*******************************AUTOCOMPLETE EVENTS HANDLING - SELECTION**************************************************/

			SingleValueAutocompletePresenter.prototype._onSelect= function(item) {
				// this part is moved down for exact state change
        //if(!this.configModel.getFirstSelection()){
				//	this.configModel.setFirstSelection(true);
				//}

				var oldItemState = this.configModel.getStateWithId(item.ruleId);
				// R14: ignore required (false positive) for onSelect
				if(oldItemState === 'Required')
					return;

				this.imageContainer.classList.add('cfg-image-selected');
				// this._autocomplete.elements.input.style.width = (item.label.length + 1)*8 + "px";

				var multipleDefault = false;
				if(this.configModel.getLoading(this.variant.ruleId) === "Loaded"){
					// var newItemState = item.state ;
					var suggestionsUpdated = false;
					var allSuggestions = this._autocomplete.getItems() || [];
					for(var i =0; i< (allSuggestions.length); i++){
						var suggestionState = this.configModel.getStateWithId(allSuggestions[i].value);
						if(allSuggestions[i].id !== item.id){
							if(suggestionState === ConfiguratorVariables.Chosen || suggestionState === ConfiguratorVariables.Selected){
								//|| suggestionState === ConfiguratorVariables.Selected
								this.configModel.setStateWithId(allSuggestions[i].value, ConfiguratorVariables.Unselected);
								this.configModel.setUpdateRequiredOption(allSuggestions[i].value, true);
								suggestionsUpdated = true;
							}
							if(this._find(this.defaults, allSuggestions[i].value)){
								multipleDefault = true;
							}
						}
					}
					var newItemState = item.state ;
					var defaultItem = this._find(this.defaults, item.value);
					// if(this.configModel.getRulesMode() === ConfiguratorVariables.RulesMode_SelectCompleteConfiguration){
					// 	newItemState = ConfiguratorVariables.Chosen; //defaults are not evalutaed in this mode.
					// }else{
						newItemState = (defaultItem && !multipleDefault) ? ConfiguratorVariables.Unselected : ConfiguratorVariables.Chosen;
					// }
					//R14 if there is no change item state change => no need to call solver
					if(oldItemState !== newItemState || suggestionsUpdated) {
						this.configModel.setStateWithId(item.value, newItemState);
						if(!this.configModel.getFirstSelection() && newItemState == ConfiguratorVariables.Chosen){
							this.configModel.setFirstSelection(true);
						}
						this.callSolver(item);
					}

				}
			};

			/*******************************AUTOCOMPLETE EVENTS HANDLING - UNSELECTION************************************************/

			SingleValueAutocompletePresenter.prototype._onUnselect= function(item) {
				this.imageContainer.classList.remove('cfg-image-selected');
				if(this.configModel.getLoading(this.variant.ruleId) === "Loaded"){
					var newItemState = item.state ;
					//if(this.configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Build){
						if(item.state === ConfiguratorVariables.Chosen){
							newItemState = ConfiguratorVariables.Unselected;
						}
						if(item.state === ConfiguratorVariables.Default){
							newItemState = ConfiguratorVariables.Dismissed;
						}
					//}*/
					this.configModel.setStateWithId(item.value, newItemState);
					this.callSolver(item);
				}
			};

			/*******************************AUTOCOMPLETE EVENTS HANDLING - UPDATE SUGGESTIONS****************************************/

			SingleValueAutocompletePresenter.prototype._onShowSuggests= function(item, self) {
				this.configModel.setLoading(this.variant.ruleId, "Loaded");
				var idsToDiagnose = [];
				var configurationCriteria = [];
				var _variantForDiagnosis;
				// this.modelEvents.publish({event:'hideUnreferencedDD', data : {currentAutocomplete : this}});
				var items = this._autocomplete.getItems();
				for(var i=0; i<items.length; i++){
					idsToDiagnose.push(items[i].optionId);
					this.configModel.setVariantForDiagnosis(items[i].variantId);
					_variantForDiagnosis = items[i].variantId;
					configurationCriteria.push({'Id': items[i].optionId, "State" : items[i].state});
					this._updateIconInDD(items[i]);
				}
				var that = this;
				if(this.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration" && this.configModel.isSolveWithDiagnose()){
					this.onComplete = false;
					var suggestContent = self.getContent().getElement('.autocomplete-suggests') || self.elements.suggestsContainer;
					this._pcDdInteractionToken = this.modelEvents.subscribe({event:'pc-dd-interaction-complete'}, function(e){
						Mask.unmask(suggestContent);
						suggestContent.style.opacity = 1;
						that.onComplete = true;
					});
					//&& if config criteria is not updated
						if(this.configModel.getFirstSelection() &&
								(this.configModel.isConfigCriteriaUpdated() ||
									(!this.configModel.isConfigCriteriaUpdated() && !this.configModel.getDignosedVariant(_variantForDiagnosis))
								)
							){
							this.callSolverOnSelectedIDs({"idsToDiagnose" : idsToDiagnose, "configurationCriteria" : configurationCriteria});
							if(!this.onComplete){
								Mask.mask(suggestContent);
								// self.elements.suggestsContainer.style.opacity = 0.5;
							}
							this.configModel.setDignosedVariant(_variantForDiagnosis, true);
						}
				}
			};

			/********************************FUNCTIONALITIES - CALL SOLVER BASED ON RULES SELECTION**********************************/

			SingleValueAutocompletePresenter.prototype.callSolver = function(item){
				this.modelEvents.publish({event:'pc-interaction-started', data : {}});
				if(this.configModel.getRulesActivation() === ConfiguratorVariables.str_true) {
					if(this.configModel.getLoading(this.variant.ruleId) === "Loaded"){
						this.modelEvents.publish({event:'SolverFct_CallSolveMethodOnSolver', data : {}});
					}
				}else{
					this.updateFilters();
					this.modelEvents.publish({event: 'solveAndDiagnoseAll_SolverAnswer'});
				}
			};

			SingleValueAutocompletePresenter.prototype.callSolverOnSelectedIDs = function(idsToDiagnose){
				// this.modelEvents.publish({event:'pc-interaction-started', data : {}});
				if(this.configModel.getRulesActivation() === ConfiguratorVariables.str_true) {
					if(this.configModel.getLoading(this.variant.ruleId) === "Loaded"){
						this.modelEvents.publish({event:'SolverFct_CallSolveOnSelectedIDsMethodOnSolver', data : idsToDiagnose});
					}
				}else{
					this.updateFilters();
					this.modelEvents.publish({event: 'solveAndDiagnoseAll_SolverAnswer'});
				}
			};
			/********************************FUNCTIONALITIES - UPDATE VIEW - MAIN METHOD******************************************/

			SingleValueAutocompletePresenter.prototype.enforceRequired= function(data) {
				if(data && data.answerMethod === "solveAndDiagnose" && this.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration"){
						if(this.configModel.getVariantForDiagnosis() === this.variant.ruleId){
							this.updateSelections(data);
							this.configModel.setConfigCriteriaUpdated(false);
						}
				}else{
					this.updateSelections(data);
				}
			};
			SingleValueAutocompletePresenter.prototype.updateSelections= function(data) {
				var that = this, variantSelectedByRule = false, variantSelectedByUser = false,conflictingOption=false, firstCall, hasBeenReset = false;
				this.enabled = false;
				this.defaults = data ? data.answerDefaults : [];
				firstCall = data ? data.firstCall : false;
				this.configModel.setFeatureIdWithRulesStatus(this.variant.ruleId, false);
				this.configModel.setFeatureIdWithChosenStatus(that.variant.ruleId, false);
				this.configModel.setUserSelectVariantIDs(that.variant.ruleId, false);
				for(var i =0; i<this.variant.options.length;i++){
					var item = this._getRequiredData(i);
					if(this.configModel.getUpdateRequiredOption(this.variant.optionPhysicalIds[i]) || firstCall || this.configModel.getRulesActivation() == ConfiguratorVariables.str_false){
						this._loadData(item);
						this._enableValidation(item);
						this._updateIcons(item);
						this._updateBadge(item);
						this._updateIconInDD(item);
						conflictingOption = conflictingOption || item.conflicting;
						this._updateImage(this.variant.options[i], item.selected, conflictingOption);
						this._updateItem(item);
						if((!data || data.answerMethod !== "solve") && this.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration")
						{
							this.configModel.setUpdateRequiredOption(item.value, false);
						}
					}
					if(item && item.selectedByRules) variantSelectedByRule = true;
					if(item && item.selectedByUser) variantSelectedByUser = true;
					if(item && (item.state === "Chosen" || item.state === "Dismissed" || item.state === "Required" || item.state === "Default")){
						this.configModel.setUserSelectVariantIDs(item.variantId, true);
					}
				}
				this.configModel.setFeatureIdWithRulesStatus(this.variant.ruleId, variantSelectedByRule);
				this.configModel.setFeatureIdWithChosenStatus(that.variant.ruleId, variantSelectedByUser);
				this.updateFilters();
			};

			SingleValueAutocompletePresenter.prototype._enableValidation= function(item) {
				if(this.configModel.isValidationEnabled()){
					var validate = false;
					if(item && item.state){
							if(item.state === ConfiguratorVariables.Default){
								this._validateCheckContainer.style.display = "inline-block";
								this._validateCheckContainer.classList.remove("config-editor-validate-rule-check");
								this._validateCheckContainer.classList.add("config-editor-validate-default-check");
								this.enabled = true;
							}else if(item.state === ConfiguratorVariables.Required || item.state === ConfiguratorVariables.Selected){
								this._validateCheckContainer.style.display = "inline-block";
								this._validateCheckContainer.classList.add("config-editor-validate-rule-check");
								this._validateCheckContainer.classList.remove("config-editor-validate-default-check");
								this.enabled = true;
							}else if(!this.enabled){
								this._validateCheckContainer.style.display = "none";
							}
					}
				}
			};

			/*******************************UPDATE VIEW RELATED HELPER METHODS******************************************/

			SingleValueAutocompletePresenter.prototype._getRequiredData= function(i) {
				var item = this._autocomplete.getItem(this.variant.optionPhysicalIds[i]) || {};
				var state = this.configModel.getStateWithId(item.value) || this.configModel.getStateWithId(item.mainId);
				if(item){
				item.state = state || "Unselected";
				}
				item.variantState = this.configModel.getStateWithId(item.variantId);
				item.conflicting = this.configModel.isConflictingOption(item.ruleId);

				this._updateItem(item);
				return item;
			};

			/*******************************UPDATE VIEW : LOAD DATA****************************************************/

			SingleValueAutocompletePresenter.prototype._loadData= function(item) {
				this.configModel.setLoading(this.variant.ruleId);
				var selectedState;
				this._autocomplete.enable();
				this._autocomplete.enableItem(item.id);
				var rules = this.configModel.getRulesActivation() === ConfiguratorVariables.str_true;


				switch (item.state) {
				case ConfiguratorVariables.Default: case ConfiguratorVariables.Required: case ConfiguratorVariables.Selected:
					selectedState = rules;
					break;
				case ConfiguratorVariables.Chosen:
					selectedState = true;
					break;
				case ConfiguratorVariables.Unselected:
					selectedState = item.included;
					break;
				default :
					selectedState = false;
					break;
				}

				// if(item.conflicting && rules) selectedState = true;
				// (item.selected && selectedState) ? "" : this._autocomplete.toggleSelect(item,"",selectedState);
				if((item.selected || selectedState) && !(item.selected && selectedState)){
					this._autocomplete.toggleSelect(item);
				}
				if(item.disable){
					this._autocomplete.disableItem(item.id);
				}
				this.configModel.setLoading(this.variant.ruleId,"Loaded");
			};

			/*******************************UPDATE VIEW : MODIFY ICONS***********************************************/

			SingleValueAutocompletePresenter.prototype._updateIcons= function(item) {
				var rules = this.configModel.getRulesActivation() === ConfiguratorVariables.str_true;
				var icon;
				switch (item.state) {
				case ConfiguratorVariables.Default:
					icon = rules ? "star" : "";
					break;
				case ConfiguratorVariables.Required:
					// if(this.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration"){
					// 	icon = "lightbulb";
					// }else{
						icon = rules ? "lock" : "";
					// }
					break;
				case ConfiguratorVariables.Incompatible:
					icon = rules ? "block" : "";
					break;
				case ConfiguratorVariables.Dismissed:
					icon = "user-delete";
					break;
				case ConfiguratorVariables.Selected:
					icon = "lightbulb";
					break;
				default :
					icon = "";
				break;
				}
				if(item.conflicting && rules) icon = "alert";
				this._updateItem(item, {icon:icon});
			};

			/****************************************UPDATE VIEW : GENERATE TOOLTIP MESSAGE****************************************/

			SingleValueAutocompletePresenter.prototype._updateTooltipMessages= function(item) {
				var message = "";
				if (item.conflicting && item.conflicting == true) {
					message = this.getConflictingMessage(item.value);
				}else{
					message = nlsConfiguratorKeys.Loading;
					this.modelEvents.publish({event:'SolverFct_getResultingStatusOriginators', data : {value : item.optionId}});
				}
				this.setTooltipMessage(item.value, message);
			};

			/****************************************UPDATE VIEW : CACHE TOOLTIP MESSAGE**********************************************/

			SingleValueAutocompletePresenter.prototype.setTooltipMessage= function(option, message) {
				var item = this._autocomplete.getItem(option);
				this._updateItem(item, {tooltip : message});
				this._updateSuggestionPopup(item);
				this._updateBadgePopup(item);
			};

			/****************************************UPDATE VIEW : CREATE TOOLTIP AND SET MESSAGE**************************************/

			SingleValueAutocompletePresenter.prototype._updateSuggestionPopup= function(item) {
				if(this._updateForSuggestion){
						optionToolTip[item.value].setBody(item.tooltip);
						optionToolTip[item.value].getContent().addClassName('cfg-custom-popup');
						setTimeout(function(){
							if(optionToolTip[item.value].elements.container.offsetWidth === 0){
								optionToolTip[item.value].toggle();
							}
						},100);
						// optionToolTip[item.value].toggle(); //Added due to autoposition issue on content change in webux/pop
						// optionToolTip[item.value].toggle(); //To be removed once it is handled by component itself;
					}
			};

			SingleValueAutocompletePresenter.prototype._updateBadgePopup= function(item) {
				if(this._updateForBadge){
						badgeTooltip[item.variantId].setBody(item.tooltip);
						badgeTooltip[item.variantId].getContent().addClassName('cfg-custom-popup');
						setTimeout(function(){
							if(badgeTooltip[item.variantId].elements.container.offsetWidth === 0){
								badgeTooltip[item.variantId].toggle();
							}
						},100);
					}
			};

			/*******************************UPDATE VIEW : SET ICON IN BADGE AND SUGGESTIONS********************************************/

			SingleValueAutocompletePresenter.prototype._updateBadge= function(item) {
				var that= this;
				var selection = this._autocomplete.selectedItems ? this._autocomplete.selectedItems : [];
				this.rulesIconContainer.className = selection.length === 0 ? item.icon : this.rulesIconContainer.className;
				for(var j =0; j < selection.length; j++){
					if(selection[j].id === item.id){
						item.closable ? item.selected ? this._autocomplete.elements.clear.show() : "" : this._autocomplete.elements.clear.hide();
						this.rulesIconContainer.className = "fonticon fonticon-" + item.icon;
						// if(item.icon && item.icon !== ""){	//To show the icon before Type...
						// 	this._iconGapContainer.style.display = "inline-block";
						// }
						this.rulesIconContainer.className = !item.conflicting ? this.rulesIconContainer.className : this.rulesIconContainer.className + " conflict-icon";
						if(!badgeTooltip[item.variantId] || (badgeTooltip[item.variantId] && badgeTooltip[item.variantId].target && !badgeTooltip[item.variantId].target.isConnected) ) {
							badgeTooltip[item.variantId] = new WUXPopup({ target: this.rulesIconContainer,trigger: 'click', position:'top'});
						}
						this.rulesIconContainer.onclick = function(){
							that._updateForBadge = true;
							that._updateForSuggestion = false;
							that._updateTooltipMessages(this);
						}.bind(item);
						break;
					}
				}
			};

			SingleValueAutocompletePresenter.prototype._updateIconInDD= function(item) {
				var message = '', suggestion, iconDiv, that = this, contentForDefault;
				/** Suggestions are not available by default. They are created onShowSuggests **/
				if(item.elements){
					suggestion = this._autocomplete.elements.container.getElement('#autocomplete-item-'+ item.id);
					if(suggestion){
						if(suggestion.hasClassName('disabled')){
							suggestion.removeClassName('disabled');
						}
						if(suggestion.hasClassName('conflict-icon')){
							suggestion.removeClassName('conflict-icon');
						}
						iconDiv = suggestion.getElementsByClassName('fonticon')[0];
						contentForDefault = suggestion.getElements('#Default-DD-item-' + item.value)[0];
						if(contentForDefault)contentForDefault.hide();
						// /**Handling default in compatible mode.**/
						// if(this.defaults && this.configModel.getRulesMode() === "RulesMode_DisableIncompatibleOptions"){
						// 	if(this.defaults.indexOf(item.ruleId) !== -1){
						// 		item.icon = "star";
						// 	}
						// }
						/**showing star on right side in dismissed/required state or in compatible mode*/
						if(this.defaults && contentForDefault && item.state !== ConfiguratorVariables.Default){
							if(this.defaults.indexOf(item.ruleId) !== -1){
								contentForDefault.show();
							}
						}
						if(iconDiv && item.icon){
							if(optionToolTip[item.optionId] && optionToolTip[item.optionId].elements){
								optionToolTip[item.optionId] = null;
							}
							optionToolTip[item.optionId] = new WUXPopup({ target: iconDiv,trigger: 'click', position:'top'});
							iconDiv.onclick = function(e){
								e.stopPropagation();	//Prevent trigger from item selection
								that._updateForBadge = false;//To be removed on receiving udpates from webux
								that._updateForSuggestion = true;//To be removed on receiving udpates from webux
								that._updateTooltipMessages(this);
							}.bind(item);
							iconDiv.className =  "suggestion-icon fonticon fonticon-" + item.icon;
							if(item.icon === 'block'){
								suggestion.addClassName('disabled');
							}
							if(item.icon === 'alert'){
								suggestion.addClassName('conflict-icon');
							}
						}else{
							if(iconDiv)
								iconDiv.className =  "suggestion-icon fonticon";
						}
					}

				}
			};

			/****************************************UPDATE VIEW : UPDATE IMAGE AS PER CF/CO************************************/

			SingleValueAutocompletePresenter.prototype._updateImage = function (optionObj, selected, conflicting) {
				var image = this.image;
				if(image && image[0]){
					if(this._autocomplete.selectedItems.length === 0){
						if(this.variant.image !== "")
							image[0].src = this.variant.image;
					}else{
						if(selected && optionObj && optionObj.image !== "")
							image[0].src = optionObj.image;
					}
					if(conflicting && this.configModel.getRulesActivation() === "true"){
						image[0].parentElement.style.borderColor = "red";
						this._autocomplete.elements.inputContainer.addClassName("config-editor-single-input-parent-conflict");
					}else{
						image[0].parentElement.style.borderColor = "#b1b1b1";
						this._autocomplete.elements.inputContainer.removeClassName("config-editor-single-input-parent-conflict");
					}
				}
			};

			/*******************************UPDATE VIEW : HANDLE MUST/MAY FEATURES AND INCLUSION RULES***************************/

			SingleValueAutocompletePresenter.prototype.updateFilters = function(){
				var variantState = this.configModel.getStateWithId(this.variant.ruleId);
				var mandatory = (this.variant.selectionCriteria == 'Must' || this.variant.selectionCriteria == true);
				var mandStatus = (mandatory || variantState === ConfiguratorVariables.Required);
				var selectedFeature;
				if(this._autocomplete.selectedItems && this._autocomplete.selectedItems.length > 0){
					mandStatus = false;
					selectedFeature = true;
				}else{
					selectedFeature = false;
				}

				if(variantState=== "Incompatible"){
							if(!this.configModel.getUserSelectVariantIDs(this.variant.ruleId))
								selectedFeature = false;
				}

				// if(this._container.offsetParent && this._container.offsetParent.style.display === "none"){
				// 	selectedFeature = false;
				// }

				this.configModel.setFeatureIdWithMandStatus(this.variant.ruleId, mandStatus);
				this.configModel.setFeatureIdWithStatus(this.variant.ruleId, selectedFeature);
				// this.modelEvents.publish({event:'updateAllFilters', data : {}});

			};

			/******************************************UTILITIES**********************************************************/

			SingleValueAutocompletePresenter.prototype._find = function (array, id) {
				var flag = false;
				if(array){
					array.forEach(function(item){
						if(item === id){ flag = true; }
					});
				}
				return flag;
			};

			SingleValueAutocompletePresenter.prototype._updateItem= function(item,object) {
				if(item){
					var rules = this.configModel.getRulesActivation() === ConfiguratorVariables.str_true;
					if(object){
						item.icon = (object.icon || object.icon === "") ? object.icon : item.icon;
						item.tooltip = (object.tooltip || object.tooltip === "") ? object.tooltip : item.tooltip;
					}
					// item.closable = false;
					// if(this.configModel.getRulesMode() === "RulesMode_SelectCompleteConfiguration"){
					// 	item.closable = false;
					// }else{
						item.closable = item.selected ? !(item.state === "Selected" || item.state === "Required") : true;
					// }
					item.selectedByRules = rules ? (item.icon && item.selected) : false;
					item.disable =  rules ? (item.state === "Selected" || item.state === "Required" || item.state === "Incompatible") : false;
					item.selectedByUser = item.state === "Chosen" ;

				}
				return item;
			};

			SingleValueAutocompletePresenter.prototype.getConflictingMessage = function(optionId){
				var addAlso, message='';
				var model = this.configModel;
				message = UWA.i18n("Option") + " " + model.getOptionDisplayNameWithId(optionId) + " " + UWA.i18n("is conflicting with") + " : ";
				var listOfListOfConflictingIds = model.getConflictingFeatures();
				var listOfListOfRulesImplied = model.getImpliedRules();
				//need to traverse the list again, to generate the text for tooltip

				for (var i = 0; i < listOfListOfConflictingIds.length; i++) {
					if (listOfListOfConflictingIds[i].indexOf(optionId) != -1) {
						if (addAlso)message += UWA.i18n("and also conflicting with") + " ";
						for (var j = 0 ; j < listOfListOfConflictingIds[i].length; j++) {
							if (optionId != listOfListOfConflictingIds[i][j]) {
								message += model.getFeatureDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "[" + model.getOptionDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "]";
								addAlso = true;
							}
						}
						if (listOfListOfRulesImplied.length > 0) {
							for (var j = 0 ; j < listOfListOfRulesImplied[i].length; j++) {
								if (j == 0) {message += " " + UWA.i18n("ImpliedRules") + " : ";}
								var ruleName = model.getRuleDisplayNameWithId(listOfListOfRulesImplied[i][j]) || listOfListOfRulesImplied[i][j];
								message += " " + ruleName;
							}
						}
						break;
					}
				}
				return message;
			};

			/********************************END OF MULTIVALUEPRESENTER*************************************************************/

			return SingleValueAutocompletePresenter;
});


define(
		'DS/ConfiguratorPanel/scripts/Presenters/VariantPresenter',
		[
		 'UWA/Core',
		 'UWA/Controls/Abstract',
		 'DS/UIKIT/Input/Text',
		 'DS/UIKIT/Input/Button',
		 'DS/UIKIT/DropdownMenu',
         'DS/UIKIT/Dropdown',

		 'DS/W3DXComponents/Views/Layout/ActionsView',
		 'DS/W3DXComponents/Collections/ActionsCollection',
		 'DS/UIKIT/Iconbar',
		 'DS/UIKIT/Tooltip',
		 'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
         'DS/ConfiguratorPanel/scripts/Utilities',
         'DS/ResizeSensor/js/ResizeSensor',

         'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',

		 'css!DS/UIKIT/UIKIT.css',
		"css!DS/ConfiguratorPanel/scripts/Presenters/VariantPresenter.css"

		 ],
		 function (UWA, Abstract, Text, Button, DropdownMenu, Dropdown, ActionsView, ActionsCollection, Iconbar, Tooltip, ConfiguratorVariables, Utilities, ResizeSensor, nlsConfiguratorKeys) {

			'use strict';

			var VariantPresenter = Abstract.extend({
				/**
				 * @description
				 * <blockquote>
				 * <p>Initialiaze the VariantClassesPresenter component with the required options</p>
				 * <p>This component shows all the Features from Dictionary along with
				 * <ul>
				 * <li>Its Image.</li>
				 * <li>Label for Name</li>
				 * <li>Below the Name label , other attribute label is shown if that attribute is used to search feature</li>
				 * <li>Text box for selected Options with drop down to select options </li>
				 * <li>a small info icon to see other attributes </li>
				 * <li>Options selected by Rules are shown with a select icon, if clicked , the option will become user selected</li>
				 * </ul>
				 * </p>
				 * </blockquote>
				 *
				 * @memberof module:DS/ConfiguratorPanel/ConfiguratorPanel#
				 *
				 * @param {Object} options - Available options.
				 * @param {Object} options.parentContainer - The parent container where the VariantClassesPresenter will be injected
                 * @param {Object} options.ddRenderTo - Optionnal - To temporary fix the UIKit issue on dropdown display
				 *
				 */

				init: function (options) {
					var that = this;
					that.options = options;
					var OneFeatureDiv;
					var optDropDwn;
					var OptRulesDiv;
					var model = options.configModel;
					var psTxtObj;
					this.modelEvents = options.modelEvents;
					var mandNotValuatedBoolValue = false;
					var featureRuleID;
					var mandatory;
					var txtIcon;
					var optionToolTip = {};
					var conflictingFeature = false;
					var conflictingOptions = [];
					var selectionMode = ConfiguratorVariables.str_none;
					var RulesRows = [];
					var selMode_Build = model.getSelectionMode() === ConfiguratorVariables.selectionMode_Build;
					var multiSelect;
					var readOnly = model.getReadOnlyFlag();
					var imagesDropdown;
					var feature = options.feature;
					var variantOptions = feature.options;

					var savedFilters = [];
					var selectedFilterStatus = ConfiguratorVariables.NoFilter;
					var currentAttributeSelected = '';
					var displayNameAttr = '';
					var currentSearchValue = "";

                    //Get the attribut which correspond to the display name :
					for (var attr in feature.attributes) {
					    if (feature.attributes[attr] === feature.displayName) {
					        currentAttributeSelected = attr;
					        displayNameAttr = attr;
					        break;
					    }
					}

					//Subscribe to the modelEvents coming from the toolbar
					options.modelEvents.subscribe({ event: 'OnFilterStatusChange' }, function (data) {
					    selectedFilterStatus = data.value;

					    applyFilters();
					});

					options.modelEvents.subscribe({ event: 'OnFilterAttributeChange' }, function (data) {
					    var oldAttributeSelected = currentAttributeSelected;

					    currentAttributeSelected = data.attribute;

					    //Remove previous attribute row
					    removeFilterRow(oldAttributeSelected);

						if(data.value !== '')
						{
						    applyFilters();
						}

					    //Add attribute row (if not 'Display Name')
						if (currentAttributeSelected !== displayNameAttr) {
						    var ftrAttrib = OneFeatureDiv.attributes[currentAttributeSelected.replace(/\s+/g, '')];

						    addFilterRow(currentAttributeSelected, ftrAttrib);
						}

					});
					options.modelEvents.subscribe({event:'OnConfigurationModeChange'}, function() {
						updateView();
					});
					options.modelEvents.subscribe({event:'OnMultiSelectionChange'}, function(data) {

					    if (data.value === false) {     //if multiSelection is set to false
					        var result = false;

					        if (DetectMultiSelOnSingleVariant()) {

					            result = ResetMultiSelOnSingleVariant();


					            if (model.getRulesActivation() === "false") {
					                updateView();
					            }
					        }

					        options.modelEvents.publish({
					            event: 'displayMessageFeatureReseted',
					            data: {
					                featureId: feature.ruleId,
					                hasBeenReseted: result
					            }
					        });     //a message will be displayed by the VariantClassesPresenter and then the solver will be called
					    }
					});
					options.modelEvents.subscribe({event:'OnRuleAssistanceLevelChange'}, function() {
						var rulesMode = model.getRulesActivation();
						if(rulesMode === "false" )
						    refreshViewForNoRuleMode();
					});
					options.modelEvents.subscribe({ event: 'OnSearchValueChange' }, function (data) {
					    currentSearchValue = data.value;

					    applyFilters();
					});


					options.modelEvents.subscribe({ event: 'OnFeaturesDivScrolled' }, function () {
					    //if (optDropDwn) optDropDwn.destroy();
				    });

					options.modelEvents.subscribe({event:'OnFilterStringSaved'}, function(data) {

					    savedFilters.push(data);
					    currentSearchValue = '';

						applyFilters();

					    //Add attribute row (if not 'Display Name')
						if (currentAttributeSelected !== displayNameAttr) {
						    var ftrAttrib = OneFeatureDiv.attributes[currentAttributeSelected.replace(/\s+/g, '')];

						    addFilterRow(currentAttributeSelected, ftrAttrib);
						}

					});

					options.modelEvents.subscribe({event:'OnFilterStringRemoved'}, function(data) {
						for(var k=0; k < savedFilters.length; k++)
						{
						    if (savedFilters[k].attribute === data.attribute && savedFilters[k].value === data.value) {
						        savedFilters.splice(k, 1);
							    break;
							}
						}

					    //Remove attribute row
						removeFilterRow(data.attribute);

						applyFilters();
					});
					options.modelEvents.subscribe({
					    event: 'getResultingStatusOriginators_SolverAnswer'
					}, function(data) {

					    var listIncompatibilities = data.listOfIncompatibilitiesIds;
					    var optionSelected = data.optionSelected;
					    var rc = data.answerRC;

					    var message;

					    if (listIncompatibilities.length === 0) {

					        if (rc !== ConfiguratorVariables.str_ERROR) {
					            if (model.getStateWithId(optionSelected) === ConfiguratorVariables.Incompatible)
					                message = UWA.i18n("Option") + " " + model.getOptionDisplayNameWithId(optionSelected) + " " + UWA.i18n("is never valid");
					            else if (model.getStateWithId(optionSelected) === ConfiguratorVariables.Required)
					                message = UWA.i18n("Option") + " " + model.getOptionDisplayNameWithId(optionSelected) + " " + UWA.i18n("is always required");
					        }
					    } else {
					        var msgStr1 = UWA.i18n("Option #OPTION# is #STATUS# because") + ":";
					        msgStr1 = msgStr1.replace("#OPTION#", model.getOptionDisplayNameWithId(optionSelected));
					        msgStr1 = msgStr1.replace("#STATUS#", UWA.i18n(model.getStateWithId(optionSelected)));
					        message = msgStr1;

					        for (var i = 0; i < listIncompatibilities.length; i++) {

					            if (i > 0)
					                message += "<br>" + UWA.i18n("and because") + ":";

					            for (var j = 0; j < listIncompatibilities[i].length; j++) {

					                state = model.getStateWithId(listIncompatibilities[i][j]);

					                var msgStr2 = UWA.i18n("#OPTION# is #STATUS#");
					                msgStr2 = msgStr2.replace("#OPTION#", model.getFeatureDisplayNameWithId(listIncompatibilities[i][j]) + "[" + model.getOptionDisplayNameWithId(listIncompatibilities[i][j]) + "]");
					                msgStr2 = msgStr2.replace("#STATUS#", UWA.i18n(state));
					                message += "<br><blocquote style='padding-left:20px;'>" + msgStr2 + "</blocquote>";
					            }

					        }

					        if (rc === ConfiguratorVariables.str_ERROR)
					            message += "<br>" + UWA.i18n("InfoComputationAborted");
					    }

					    if (rc === ConfiguratorVariables.str_ERROR) {
					        message += UWA.i18n("InfoComputationAborted");
					    }

						if(optionToolTip[optionSelected]) optionToolTip[optionSelected].setBody(message);
					});

					options.modelEvents.subscribe({event:'solveAndDiagnoseAll_SolverAnswer'},function() {
					    if (!readOnly)
					        updateView();
					});


					function updateView()
					{
					    var featureIconState;
					    var conflicting = false;
					    var listOfStates = [];
					    cleanTextBox(psTxtObj.getContent());

					    for(var i=0; i < RulesRows.length; i++) {
					        RulesRows[i].destroy();
					    }
					    RulesRows = [];

					    selMode_Build = model.getSelectionMode() === ConfiguratorVariables.selectionMode_Build;
					    selectionMode = ConfiguratorVariables.str_none;
					    conflictingFeature = false;
					    conflictingOptions = [];

					    for (var j = 0; j < variantOptions.length; j++) {
					        //once conflicting option found for the feature, set it , and no need to check it for other options
					        if(model.getRulesActivation() === "true") {
					            conflicting = model.isConflictingOption(variantOptions[j].ruleId);
					            if (conflictingFeature === false) conflictingFeature = conflicting;

					            if (conflicting)
					                conflictingOptions.push(variantOptions[j].ruleId);
					        }

					        var optionState = model.getStateWithId(variantOptions[j].ruleId);
					        if (!optionState) optionState = ConfiguratorVariables.Unselected;
					        listOfStates.push(optionState);

					        if (optionState === ConfiguratorVariables.Chosen || optionState === ConfiguratorVariables.Default || optionState === ConfiguratorVariables.Required)
					            selectionMode = optionState;

					        //to set the icon for the Feature
					        if (conflicting === true) {
					            featureIconState = ConfiguratorVariables.Conflict;
					        }
					        else {
					            if (optionState === ConfiguratorVariables.Chosen || (optionState === ConfiguratorVariables.Dismissed && featureIconState !== ConfiguratorVariables.Chosen) ||
											(optionState === ConfiguratorVariables.Default && (featureIconState !== ConfiguratorVariables.Chosen && featureIconState !== ConfiguratorVariables.Dismissed)))
					                featureIconState = optionState;
					        }

					        switch (optionState) {
					            case ConfiguratorVariables.Required:
					                addRulesRow("component", variantOptions[j].displayName, OptRulesDiv, variantOptions[j].ruleId);
					                break;
					            case ConfiguratorVariables.Incompatible:
					                break;
					            case ConfiguratorVariables.Chosen:
					                var dontCheck = true; //dont remove the value if already there, just add if not there
					                updateTextBox(psTxtObj.getContent(), variantOptions[j].displayName, dontCheck);
					                break;
					            case ConfiguratorVariables.Default:
					                addRulesRow("star", variantOptions[j].displayName, OptRulesDiv, variantOptions[j].ruleId);
					                break;
					            case ConfiguratorVariables.Dismissed:
					                if (selMode_Build === false) {
					                    updateTextBox(psTxtObj.getContent(), UWA.i18n("Except") + " " + variantOptions[j].displayName);
                                    }
					                break;
					            case ConfiguratorVariables.Unselected:
					                break;
					        }
					    }

					    var selected = (selectionMode !== ConfiguratorVariables.str_none);
					    updateMand(selected);
					    updateSelectedOptionsNumberAndImagesDropdownContent();
					    txtIcon.changeIcon(featureIconState);

					    if (selMode_Build === false && listOfStates.indexOf(ConfiguratorVariables.Chosen) === -1 &&
                            listOfStates.indexOf(ConfiguratorVariables.Default) === -1 &&
                            listOfStates.indexOf(ConfiguratorVariables.Required) === -1 /*&&
                            listOfStates.indexOf("recommanded") == -1*/) {

					        psTxtObj.getContent().placeholder = nlsConfiguratorKeys["All compatibles"];
					    }
					    else
					        psTxtObj.getContent().placeholder = nlsConfiguratorKeys["No user selection"];

					    applyFilters();

					}

					function refreshViewForNoRuleMode()
					{
                        //Set all states to Unselected (except user selections)
                        for(var j=0; j< variantOptions.length; j++) {
                            if (model.getStateWithId(variantOptions[j].ruleId) === ConfiguratorVariables.Default ||
                                model.getStateWithId(variantOptions[j].ruleId) === ConfiguratorVariables.Incompatible ||
                                model.getStateWithId(variantOptions[j].ruleId) === ConfiguratorVariables.Required /*||
                                model.getStateWithId(variantOptions[j].ruleId) === ConfiguratorVariables.Recommanded*/) {
                                    model.setStateWithId(variantOptions[j].ruleId, ConfiguratorVariables.Unselected);
                            }
                        }

						updateView();

					}
					/*function removeInfoIcon(itemContainer, optionId)
					{
					    if (itemContainer.lastChild && itemContainer.lastChild.id && itemContainer.lastChild.id == 'itemInfoIcon' + optionId)
						itemContainer.lastChild.destroy();

						if(optionToolTip[optionId])
						optionToolTip[optionId] = null;
					}*/

					function addInfoIcon(itemContainer, optionId, conflicting)
					{
						var color = '#42a2da';
						var icon = ConfiguratorVariables.str_help;
						var message = '';
						var itemInfoIcon;
						if (conflicting && conflicting === true) {
						    color = 'red';
						    icon = 'alert';
						    var addAlso;
						    message = UWA.i18n("Option") + " " + model.getOptionDisplayNameWithId(optionId) + " " + UWA.i18n("is conflicting with") + ":";
						    var listOfListOfConflictingIds = model.getConflictingFeatures();
						    var listOfListOfRulesImplied = model.getImpliedRules();
						    //need to traverse the list again, to generate the text for tooltip

						    for (var i = 0; i < listOfListOfConflictingIds.length; i++) {

						        if (listOfListOfConflictingIds[i].indexOf(optionId) !== -1) {

						            if (addAlso)
						                message += UWA.i18n("and also conflicting with") + ":";

						            for (var j = 0 ; j < listOfListOfConflictingIds[i].length; j++) {
						                if (optionId != listOfListOfConflictingIds[i][j]) {
						                    message += "<br><blocquote style='padding-left:20px;'>" + model.getFeatureDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "[" + model.getOptionDisplayNameWithId(listOfListOfConflictingIds[i][j]) + "] </blocquote>";
						                    addAlso = true;
						                }
						            }

						            if (listOfListOfRulesImplied.length > 0) {
						                for (var j = 0 ; j < listOfListOfRulesImplied[i].length; j++) {
						                    if (j === 0) {
						                        message += "<br><blocquote style='padding-left:20px;'> " + UWA.i18n("Implied Rules") + ":</blocquote>";
						                    }
						                    message += "<br><blocquote style='padding-left:40px;'>" + listOfListOfRulesImplied[i][j] + "</blocquote>";
						                }
						            }
						            message += "<br>";

						            break;
						        }

						    }

						    itemInfoIcon = getIcon({ id: 'itemInfoIcon' + optionId, icon: icon, color: color });


						    optionToolTip[optionId] = new Tooltip({
						        target: itemInfoIcon,
						        //position: 'right',
						        body: message
						    });
						    itemInfoIcon.inject(itemContainer);

						}
						else {
						    //ConfiguratorSolverFunctions.getResultingStatusOriginators(optionId);

						    itemInfoIcon = getIcon({ id: 'itemInfoIcon' + optionId, icon: icon, color: color });


						    optionToolTip[optionId] = new Tooltip({
						        target: itemInfoIcon,
						        //position: 'right',
						        body: message
						    });
						    itemInfoIcon.inject(itemContainer);

						    that.modelEvents.publish({
						        event: 'SolverFct_getResultingStatusOriginators',
						        data: { value: optionId }
						    });
						}


					}
					function addDefaultIcon(itemContainer, optionId)
					{
						var color = '#42a2da';
						var icon = 'star';

						var defaultIcon = getIcon({ id: 'defaultIcon' + optionId,	icon: icon, color: color});

						defaultIcon.inject(itemContainer);
					}

					function showOptionSelected(optionRuleId)
					{
					    model.setStateWithId(optionRuleId, ConfiguratorVariables.Chosen);

						that.modelEvents.publish({
							event: 'SolverFct_CallSolveMethodOnSolver',
							data: {}
						});
					}

					function addFilterRow(attribute, ftrAttrib)
					{
					    var ftrFlt = document.getElementById('FtrFiltersDiv' + featureRuleID);

						var fltRow = document.getElementById(featureRuleID + attribute );
						if(fltRow) return;

						var showString = ftrAttrib;
						if(ftrAttrib.length > 28)
							showString = ftrAttrib.substring(0,24) + '...';

						fltRow = UWA.createElement( 'tr',{ styles: {width: '100%'} , 'class' : 'unsavedFilter', id: featureRuleID + attribute,
							html: [{ tag: 'td',
								html: [ getLabelField(attribute + ':' + showString, 'font-style:italic; font-weight:normal;')]
							}]
						});
						fltRow.inject(ftrFlt);
					}

					function removeFilterRow(attribute) {
					    //Remove attribute row (if attribute is not present in one of the saved filters or in the current attribute selected)
					    var ftrFlt = document.getElementById('FtrFiltersDiv' + featureRuleID);
					    var removeAttribute = true;

					    if (attribute === displayNameAttr)
					        return;

					    for (var k = 0; k < savedFilters.length; k++) {
					        if (savedFilters[k].attribute === attribute) {
					            removeAttribute = false;

					            break;
					        }
					    }

					    if (removeAttribute && currentAttributeSelected !== attribute) {
					        var attrRow = document.getElementById(featureRuleID + attribute);

					        if (attrRow)
					            attrRow.parentNode.removeChild(attrRow);
					    }
					}

					/*function getActionObj(actionsList) {
						var actionObj = {
						collection : new ActionsCollection(actionsList),
						events : {
							'onActionClick' : function(actionView, event) {
								var actionFunction = actionView.model.get('handler');

									if (UWA.is(actionFunction, 'function')) {
										actionFunction.call(undefined, event);
									}
								}
							}
						};

						return actionObj;
					};*/
					function addRulesRow(icon, optionVal, rulesDiv, optionRuleId)
					{
						var ruleinfoIcon = '';
						if (!readOnly) {
						    ruleinfoIcon = getIcon({ id: 'ruleinfoIcon' + optionRuleId, icon: 'check', color: ' #42a2da' });
						    ruleinfoIcon.onclick = function () {
						        showOptionSelected(optionRuleId);
						        //RulesRows.destroy();
						    };
						}

						var tempLine = UWA.createElement('tr', {
						    styles: { width: '100%' },
						    id: 'OptRuleType' + optionRuleId,
						    html: [{
						        tag: 'td', styles: { width: "20px" },
						        html: [getIcon({ id: 'OptRuleIcon' + optionRuleId, icon: icon })]
						    },
                            {
                                tag: 'td',
                                html: [optionVal]
                            },
                            {
                                tag: 'td', styles: { width: '50%', 'text-align': 'right' },
                                //html: [ getIcon({	id: 'OptRuleChk' + optionRuleId,	icon: 'check'})]
                                html: [ruleinfoIcon]
                            }]
						});

						RulesRows.push(tempLine);
						tempLine.inject(rulesDiv);
					}

					function applyFilters()
					{
					    OneFeatureDiv.style.display = 'inline-block';

						if ( (currentSearchValue !== '' || savedFilters.length !== 0)) {
						    //Apply saved filters
						    for(var j=0; j< savedFilters.length; j++ )
						    {
						        var ftrAttrib = OneFeatureDiv.attributes[savedFilters[j].attribute.replace(/\s+/g, '')];

						        if (!ftrAttrib.toUpperCase().contains(savedFilters[j].value.toUpperCase())) {
						            OneFeatureDiv.style.display = 'none';
						        }
						    }

						    //Apply search filter
						    var ftrAttribValue = OneFeatureDiv.attributes[currentAttributeSelected.replace(/\s+/g, '')];

							if (!ftrAttribValue.toUpperCase().contains(currentSearchValue.toUpperCase())) {
							    OneFeatureDiv.style.display = 'none';
							}
						}

                        //Apply Status Filter
						if (selectedFilterStatus !== ConfiguratorVariables.NoFilter) {
						    var listOfStates = [];
						    //get all status in the feature
						    for (var j = 0; j < variantOptions.length; j++) {
						        var optionState = model.getStateWithId(variantOptions[j].ruleId);
						        if (!optionState) optionState = ConfiguratorVariables.Unselected;
						        listOfStates.push(optionState);
						    }

						    if (selectedFilterStatus === ConfiguratorVariables.SelectionInConflict && !conflictingFeature) {
						        OneFeatureDiv.style.display = 'none';
						    }

						    else if (selectedFilterStatus === ConfiguratorVariables.UnselectedMandatory && !mandNotValuatedBoolValue) {
						        OneFeatureDiv.style.display = 'none';
						    }

						    else if (selectedFilterStatus === ConfiguratorVariables.ChosenByTheUser && listOfStates.indexOf(ConfiguratorVariables.Chosen) === -1) {
						        OneFeatureDiv.style.display = 'none';
						    }
						    else if (selectedFilterStatus === ConfiguratorVariables.DefaultSelected && listOfStates.indexOf(ConfiguratorVariables.Default) === -1) {
						        OneFeatureDiv.style.display = 'none';
						    }
						    else if (selectedFilterStatus === ConfiguratorVariables.DismissedByTheUser && listOfStates.indexOf(ConfiguratorVariables.Dismissed) === -1) {
						        OneFeatureDiv.style.display = 'none';
						    }
						    else if (selectedFilterStatus === ConfiguratorVariables.Unselected &&
									 		(listOfStates.indexOf(ConfiguratorVariables.Chosen) >= 0 ||
									 		listOfStates.indexOf(ConfiguratorVariables.Default) >= 0 ||
											listOfStates.indexOf(ConfiguratorVariables.Required) >= 0)) {
						        OneFeatureDiv.style.display = 'none';
						    }
						    else if (selectedFilterStatus === ConfiguratorVariables.RequiredByRules && listOfStates.indexOf(ConfiguratorVariables.Required) === -1) {
						        OneFeatureDiv.style.display = 'none';
						    }
						    /*else if (selectedFilterStatus === ConfiguratorVariables.ProposedByOptimization && listOfStates.indexOf(ConfiguratorVariables.ProposedByOptimization) === -1) {
						        OneFeatureDiv.style.display = 'none';
						    }*/ //todo later
						}

						options.modelEvents.publish( {
							event:	'OnFilterResultChange',
							data:	{
								featureId : featureRuleID,
								resultBoolValue: (OneFeatureDiv.style.display === 'inline-block'),
								show: (savedFilters.length > 0 || selectedFilterStatus !== ConfiguratorVariables.NoFilter || currentSearchValue !== '')
							}
						});
					}
					function getLabelField(value , style, display, className) {
						var labeltag = ' <label style=\"display: ';

						if (!display) display = 'block';

						labeltag = labeltag.concat(display);
						labeltag = labeltag.concat(';padding: 5px 5px 0px 0px;font-family: sans-serif;');
						if(style && style!="") labeltag = labeltag.concat(style);
						labeltag = labeltag.concat('\" ');
						if (className) labeltag = labeltag.concat(" class=featureLabel ");
						labeltag = labeltag.concat(' >' + value + '</label>');

						return labeltag;
					}

					function getIcon(options)
					{
						var IconDiv = UWA.createElement('span',{
							'class': 'fonticon fonticon-' + options.icon ,
							id: options.id,
							styles : {color: options.color},
						});
						if(options.id && options.id !== '') IconDiv.id = options.id;
						IconDiv.changeIcon = function(state)
						{
							this.style.opacity = 1;
							if( mandNotValuatedBoolValue === true)
							{
								this.set('class', "fonticon fonticon-attention");
								this.style.color ='black';
							}
							else
							{
								if(state === ConfiguratorVariables.Conflict )
								{
									this.set('class', "fonticon fonticon-alert");
									this.style.color = 'red';
								}
								else if(state === ConfiguratorVariables.Chosen)
								{
									this.set('class', "fonticon fonticon-user-check");
									this.style.color = '#42a2da';
								}
								else if(state === ConfiguratorVariables.Dismissed)
								{
									this.set('class', "fonticon fonticon-user-times");
									this.style.color = 'rgb(91, 93, 94)';
								}
								else
								{this.set('class', "fonticon fonticon-user");
								this.style.opacity = 0;
								}

							}

						};
						return IconDiv;
					}
					function getOptDropDown(options)
					{
					    if (optDropDwn) optDropDwn.destroy();

						var myOptDropDwn = new DropdownMenu({
						    target: options.target,
						    renderTo: options.renderTo,
							//id: options.id,
							multiSelect: options.multiSelect,
							multiline: 	options.multiline	,
							mand : options.mand,
							firstShow: true,
							className : 'OptionsDD',
							closeOnClick: true,
							position : 'bottom',
							items: []
						});

						myOptDropDwn.addEvents({
							onShow: function(){
								if(!this.options.firstShow) return;
								this.options.firstShow = false;
								for(var i=0; i< this.items.length; i++)
								{
								    this.items[i].elements.icon.style.color = '#42a2da';
									if(this.items[i].fonticon === 'user')
									{
										this.items[i].fonticon = '';
										this.items[i].elements.icon.removeClassName('fonticon-user');
									}

									if (this.items[i].elements.icon.className === 'fonticon fonticon-user-times') {
									    this.items[i].elements.icon.style.color = 'rgb(91, 93, 94)';
									}
								}
							},
							onClick: function (e, item) {
								var status;
								var itemState = model.getStateWithId(item.name);
								var rulesMode = model.getRulesActivation();

								var curThis = this;

								function CheckIfDismissedIsPossible() {
								    var rc = false;

                                    //Prevent the reject if we already have a selection in same feature
								    for (var i = 0; i < curThis.items.length; i++) {
								        if (curThis.items[i] === item) continue;

								        var optionState = model.getStateWithId(curThis.items[i].name);
								        if (optionState === ConfiguratorVariables.Chosen || optionState === ConfiguratorVariables.Required || optionState === ConfiguratorVariables.Default) {
								            rc = false;
								            return rc;
								        }
								    }

								    if (feature.selectionCriteria === "May") {
								        rc = true;
								        return rc;
								    }
								    else {
								        for (var i = 0; i < curThis.items.length; i++) {
								            if (curThis.items[i] === item) continue;

								            var optionState = model.getStateWithId(curThis.items[i].name);
								            if (optionState !== ConfiguratorVariables.Dismissed && optionState !== ConfiguratorVariables.Incompatible) {
								                rc = true;
								                return rc;
								            }
								        }

								    }

								    return rc;
								}

								if(rulesMode === "false" )
								{

								    if (selMode_Build === false) {
								        if (itemState && (itemState === ConfiguratorVariables.Dismissed)) {
								            itemState = ConfiguratorVariables.Chosen;
								            status = true;

								            //TODO : Remove all the user Rejects if any
								            for (var i = 0; i < this.items.length; i++) {
								                if (this.items[i] === item) continue;

								                if (model.getStateWithId(this.items[i].name) === ConfiguratorVariables.Dismissed)
								                    model.setStateWithId(this.items[i].name, ConfiguratorVariables.Unselected);
								            }
								        }
								        else if (itemState && (itemState === ConfiguratorVariables.Chosen)){
								            itemState = ConfiguratorVariables.Unselected;
								            status = false;
								        }
								        else {
								            if (!CheckIfDismissedIsPossible()) {
								                if (itemState === ConfiguratorVariables.Unselected) {
								                    itemState = ConfiguratorVariables.Chosen;
								                    status = true;
								                }
																else {
								                    return;
								                }
								            }
								            else {
								                itemState = ConfiguratorVariables.Dismissed;
								                status = false;
								            }
								        }

								    }
                                    else {
								        if(itemState && ( itemState === ConfiguratorVariables.Chosen))
								        {
								            itemState = ConfiguratorVariables.Unselected;
									        status = false;
									    }
								        else
								        {
									        status = true;
									        itemState = ConfiguratorVariables.Chosen;
								        }
								    }

								    model.setStateWithId(item.name, itemState);

                                    //if we are in Single selection mode, remove all the other selections done in the variant class (if any...)
								    if (!(feature.selectionType === "Multiple" || model.getMultiSelectionState() === "true") && status)
								    {
									    for(var i=0; i< this.items.length; i++)
									    {
										    if(this.items[i] === item) continue;
										    if (model.getStateWithId(this.items[i].name) === ConfiguratorVariables.Chosen)
										    {
											    model.setStateWithId(this.items[i].name, ConfiguratorVariables.Unselected);
										    }
									    }
								    }

								    updateView();

								    /*updateMand(status , false)
								    updateSelectedOptionsNumberAndImagesDropdownContent();*/
								}
								else //if calling solver, then no need to update UI here itself, to be done after rules results
								{
								    if(selMode_Build === false)
								    {
								        if (itemState === ConfiguratorVariables.Dismissed || itemState === ConfiguratorVariables.Required) {
								            itemState = ConfiguratorVariables.Chosen;
								            status = true;

								            //TODO : Remove all the user Rejects if any
								            for (var i = 0; i < this.items.length; i++) {
								                if (this.items[i] === item) continue;

								                if (model.getStateWithId(this.items[i].name) === ConfiguratorVariables.Dismissed)
								                    model.setStateWithId(this.items[i].name, ConfiguratorVariables.Unselected);
								            }
								        }
									    else if(itemState === ConfiguratorVariables.Chosen) {
									        itemState = ConfiguratorVariables.Unselected;
									        status = false;
									    }
									    else {
									        if (!CheckIfDismissedIsPossible()) {
									            if (itemState === ConfiguratorVariables.Unselected) {
									                itemState = ConfiguratorVariables.Chosen;
									                status = true;
									            }
									            else if (itemState === ConfiguratorVariables.Default) {
									                itemState = ConfiguratorVariables.Dismissed;
									                status = false;
									            }
									            else {
									                return;
									            }
									        }
									        else {
									            itemState = ConfiguratorVariables.Dismissed;
									            status = false;
									        }
									    }

								    }
								    else
								    {
								        if(itemState && ( itemState === ConfiguratorVariables.Chosen)) {
								            itemState = ConfiguratorVariables.Unselected;
									        status = false;
									    }

									    else if(itemState === ConfiguratorVariables.Default) {
									        itemState = ConfiguratorVariables.Dismissed;
									        status = false;
									    }
									    else if (itemState === ConfiguratorVariables.Dismissed) {
									        itemState = ConfiguratorVariables.Unselected;
									        status = false;
									    }
									    else {
									        itemState = ConfiguratorVariables.Chosen;
									        status = true;

									        //TODO : Remove all the user Rejects if any (Reject of Default in same feature)
									        for (var i = 0; i < this.items.length; i++) {
									            if (this.items[i] === item) continue;

									            if (model.getStateWithId(this.items[i].name) === ConfiguratorVariables.Dismissed)
									                model.setStateWithId(this.items[i].name, ConfiguratorVariables.Unselected);
									        }
									    }


								    }

								    model.setStateWithId(item.name, itemState);

								    //if we are in Single selection mode, remove all the other selections done in the variant class (if any...)
								    if (status === true && !(feature.selectionType === "Multiple" || model.getMultiSelectionState() === "true")) {
								        for (var i = 0; i < this.items.length; i++) {
								            if (this.items[i] === item) continue;

								            if (model.getStateWithId(this.items[i].name) === ConfiguratorVariables.Chosen)
								                model.setStateWithId(this.items[i].name, ConfiguratorVariables.Unselected);
								        }
								    }

								    that.modelEvents.publish({
								        event: 'SolverFct_CallSolveMethodOnSolver',
								        data: {}
								    });
								}

								if (myOptDropDwn) myOptDropDwn.destroy();
							},
							onHide: function ()
							{
							    this.options.target.blur();
							},
							onClickOutside: function () {
							    if (myOptDropDwn) myOptDropDwn.destroy();
							}
						});

						return myOptDropDwn;
					}
					function updateMand(status /*true if selected*/)
					{
						var oldMandNotValuatedBoolValue = model.getFeatureIdWithMandStatus(featureRuleID);
						mandNotValuatedBoolValue = (mandatory || model.getStateWithId(feature.ruleId) === ConfiguratorVariables.Required)? !status : false;
						options.modelEvents.publish({
							event :	'updateMANDNumberAndRefresh3D',
							data : {
								featureId : featureRuleID,
								mandNotValuatedBoolValue : mandNotValuatedBoolValue,
								waitForAllFeatures : (model.getRulesActivation() === "true"), // right now setting for no-rule mode
								oldMandNotValuatedBoolValue : oldMandNotValuatedBoolValue //just for testing for now
							}
						});
					}

					function updateSelectedOptionsNumberAndImagesDropdownContent() {
					    var listOfSelectedOptions = [];
					    //var variantOptions = feature.options;
					    var variantImage = document.getElementById("variantImage" + feature.ruleId);
					    var variantImageDiv = document.getElementById("variantImageDiv" + feature.ruleId);
					    var numberOfSelectedOptions = document.getElementById("numberOfSelectedOptions_" + feature.ruleId);

					    //Get options selected
					    for (var j = 0; j < variantOptions.length; j++) {
					        var optionState = model.getStateWithId(variantOptions[j].ruleId);

					        if (optionState === ConfiguratorVariables.Chosen || optionState === ConfiguratorVariables.Required || optionState === ConfiguratorVariables.Default)
                                listOfSelectedOptions.push(variantOptions[j].ruleId);
					    }


					    if (listOfSelectedOptions.length > 0) {
					        if (listOfSelectedOptions.length === 1) {
					            //Set feature icon & feature icon border
					            variantImageDiv.style.border = "1px solid #42a2da";

					            for (var i = 0; i < feature.options.length; i++) {
					                if (feature.options[i].ruleId === listOfSelectedOptions[0]) {
					                    if (feature.options[i].image)
					                        variantImage.src = feature.options[i].image;
					                    else
					                        variantImage.src = feature.image;
					                    break;
					                }
					            }

					            //Set imagesDropdown visibility
					            numberOfSelectedOptions.innerHTML = 1;
					            numberOfSelectedOptions.style.display = "none";
					            //Set imagesDropdown content
					            imagesDropdown.getBody().innerHTML = "";
					        }
					        else if (listOfSelectedOptions.length > 1) {
					            //Set feature icon & feature icon border
					            if (feature.image)
					                variantImage.src = feature.image;
					            variantImageDiv.style.border = "1px solid #42a2da";

					            numberOfSelectedOptions.innerHTML = 0;

					            //Set imagesDropdown content
					            imagesDropdown.setBody({});

					            for (var i = 0; i < listOfSelectedOptions.length; i++) {
					                for (var k = 0; k < feature.options.length; k++) {
					                    if (feature.options[k].image) {
					                        numberOfSelectedOptions.innerHTML = numberOfSelectedOptions.innerHTML++;
					                        imagesDropdown.setBody(UWA.createElement('img', { src: feature.options[k].image, 'class': 'img-thumbnail', styles: { width: '80px', height: '80px', marginRight: '5px', marginTop: '5px' } }));
					                    }
					                }
					            }

					            //Set imagesDropdown visibility
					            if (numberOfSelectedOptions.innerHTML > 1)
					                numberOfSelectedOptions.style.display = "block";
					        }

					    }
					    else {
					        //Set feature icon & feature icon border
					        if (feature.image)
					            variantImage.src = feature.image;
					        variantImageDiv.style.border = "1px solid #b1b1b1";

					        //Set imagesDropdown visibility
					        numberOfSelectedOptions.innerHTML = 0;
					        numberOfSelectedOptions.style.display = "none";

					        //Set imagesDropdown content
                            imagesDropdown.getBody().innerHTML = "";
					    }
					}

					function cleanTextBox(myText)
					{
					    var data = myText.value;        //myText.getText();
						 myText.value = '';      //myText.setText('');
					}

					function updateTextBox(myText, val, dontCheck)	{
					    var data = myText.value;        //myText.getText();

					    if (!(feature.selectionType === "Multiple" || selMode_Build === false || model.getMultiSelectionState() === "true"))
						{
					        if (data === val) myText.value = '';      //myText.setText('');
					        else myText.value = val;      //myText.setText(val);
									myText.rows = 1;
						}
						else
						{
							var dArray = [];
							if(data !== "")
							{
								dArray = data.split("\n");
							}
							var i = dArray.indexOf(val);
							if(i != -1) //if value already there , remove it
							{
								if(dontCheck) dArray.splice(i, 1);
							}
							else
								dArray.push(val);

							myText.value = dArray.join("\n");      //myText.setText(dArray.join("\n"));
							myText.rows = dArray.length <= 5 ? dArray.length : 5;
						}
					}

					function DetectMultiSelOnSingleVariant() {
					    var nbChosenInFeature = 0;
					    var multiSelDetected = false;


					    if (feature.selectionType === "Single") {
					        for (var j = 0; j < feature.options.length; j++) {
					            if (model.getStateWithId(feature.options[j].ruleId) === ConfiguratorVariables.Chosen  || model.getStateWithId(feature.options[j].ruleId) === ConfiguratorVariables.Default) {
					                nbChosenInFeature++;
					            }
					        }

					        if (nbChosenInFeature > 1) {
					            multiSelDetected = true;
					        }

					    }

					    return multiSelDetected;

					}

					function ResetMultiSelOnSingleVariant() {
					    var reset = false;

					    for (var j = 0; j < feature.options.length; j++) {
					        if (model.getStateWithId(feature.options[j].ruleId) === ConfiguratorVariables.Chosen || model.getStateWithId(feature.options[j].ruleId) === ConfiguratorVariables.Default) {
					            model.setStateWithId(feature.options[j].ruleId, ConfiguratorVariables.Unselected);
					            reset = true;
					        }
					    }

					    return reset;
					}



                    //init starts here
					var image = Utilities.getDefaultImage();    //"https://iam.3ds.com/fileadmin/img/3dexperience/3DEXLoginCompass.png";
					var imageStyle = { border: '0px'};
					var imageDivStyle = { width: '80px', height: '80px', marginRight: '5px', marginTop: '10px', verticalAlign: 'middle', lineHeight: '80px', borderRadius: '4px'};

					if (feature.image)
					    image = feature.image;

					var psTxt = Text.extend({
						defaultOptions : {
							className : 'psTxt',
							placeholder : nlsConfiguratorKeys["No user selection"],
							rows: 1
						},
						init : function(options)
						{
							this._parent(options);
						}
					});


					psTxtObj = new Text({ id: 'psTxt' + feature.ruleId, multiline: true, rows: 1, placeholder: nlsConfiguratorKeys["No user selection"] });
					    psTxtObj.getContent().style.minHeight = "38px";         //to prevent IE to create scrollbar even if the textarea is empty
						multiSelect = (feature.selectionType === "Multiple" || model.getMultiSelectionState() === "true" || selMode_Build === false) ;
						psTxtObj.multiline = multiSelect;
						psTxtObj.elements.input.ondrop = function (e) {
						    return false;
						};

						psTxtObj.addEvents({
						    onClick: function () {

						        optDropDwn = getOptDropDown({
						            target: psTxtObj.getContent(),
						            renderTo: (options.ddRenderTo) ? options.ddRenderTo : options.parentContainer,
						            multiSelect: (feature.selectionType === "Multiple" || selMode_Build === false || model.getMultiSelectionState() === "true"),
						            multiline: (feature.selectionType === "Multiple" || selMode_Build === false || model.getMultiSelectionState() === "true"),
						            mand: (feature.selectionCriteria === 'Must')
						        });

						        for(var j=0; j< variantOptions.length; j++) {
						            //var fonticon = items[j].selected ? 'user-check' : 'user';
						            optDropDwn.addItem({ name: variantOptions[j].ruleId, text: variantOptions[j].displayName, fonticon: 'user', selectable: true, selected: false });

						            if (variantOptions[j].defaultSelection === 'Yes') {
						                addDefaultIcon(optDropDwn.items[optDropDwn.items.length - 1].elements.container, variantOptions[j].ruleId);
						            }
						        }

						        var items = optDropDwn.items;
						        var listOfStates = [];

						        for (var k = 0; k < items.length; k++) {
						            //disable items in readOnly !!!
						            if (readOnly)
						                optDropDwn.disableItem(items[k].id);
						            else
						                optDropDwn.enableItem(items[k].id);

						            var optionState = model.getStateWithId(items[k].name);
						            if (!optionState) optionState = ConfiguratorVariables.Unselected;

						            listOfStates.push(optionState);

                                    //add Conflicts icon on options if needed
						            if (conflictingOptions.indexOf(items[k].name) !== -1) {
						                addInfoIcon(items[k].elements.container, items[k].name, true);
						            }

						            switch (optionState) {
						                case ConfiguratorVariables.Required:
						                    items[k].elements.icon.set('class', "fonticon fonticon-component");
						                    if (!readOnly) addInfoIcon(items[k].elements.container, items[k].name);
						                    if (items[k].selected === false) items[k].toggleSelection();
						                    break;
						                case ConfiguratorVariables.Incompatible:
						                    optDropDwn.disableItem(items[k].id);
						                    items[k].elements.icon.set('class', "fonticon");//left icon
						                    if (!readOnly) addInfoIcon(items[k].elements.container, items[k].name);//right icon
						                    break;
						                case ConfiguratorVariables.Chosen:
						                    if (items[k].selected === false) items[k].toggleSelection();
						                    items[k].elements.icon.set('class', "fonticon fonticon-user-check");
						                    break;
						                case ConfiguratorVariables.Default:
						                    items[k].elements.icon.set('class', "fonticon");
						                    if (items[k].selected == false) items[k].toggleSelection();
						                    break;
						                case ConfiguratorVariables.Dismissed:
						                    items[k].elements.icon.set('class', "fonticon fonticon-user-times");
						                    //if (items[k].selected == false) items[k].toggleSelection();
						                    items[k].elements.icon.style.color = 'rgb(91, 93, 94)';
						                    break;
						                case ConfiguratorVariables.Unselected:
						                    items[k].elements.icon.set('class', "fonticon");
						                    break;
						            }
						        }

                                //Select the Unselected states in refine mode
						        if (selMode_Build === false) {
						            if (listOfStates.indexOf(ConfiguratorVariables.Chosen) === -1 &&
                                        listOfStates.indexOf(ConfiguratorVariables.Default) === -1 &&
                                        listOfStates.indexOf(ConfiguratorVariables.Required) === -1 /*&&
                                        listOfStates.indexOf("recommanded") == -1*/) {    //recommanded to be added later

						                for (var k = 0; k < items.length; k++) {
						                    var optionState = model.getStateWithId(items[k].name);

						                    if (optionState === ConfiguratorVariables.Unselected) {
						                        if (items[k].selected === false) items[k].toggleSelection();
						                    }
						                }
						            }
						        }

                                //TODO : Move incompatibles to the bottom


						        optDropDwn.show();

						    }
						});

						txtIcon = getIcon({	id: 'optIcon' + feature.ruleId,	icon: 'attention', color:'black'});
						//var infoButton = new Button({ icon: "info",	id: 'infoButton' + feature.ruleId, className: "link" });
						//var infoButton = getIcon({	id: 'infoButton' + feature.ruleId,	icon: 'info', color:'#42a2da'});

						mandatory = (feature.selectionCriteria === 'Must');

						/*new DropdownMenu({
						    target: infoButton,
						    renderTo: (options.ddRenderTo) ? options.ddRenderTo : options.parentContainer,
							id: 'InfosDD'+feature.ruleId,
							items: [
							        { text: 'Maturity : \t\t ' + feature.attributes.Current, className: 'header'},
							        { text: 'Mandatory : \t ' + mandatory, className: 'header'},
							        { text: 'Creator : \t ' + feature.attributes.Originator , className: 'header'},
							        { text: 'List Price : ' + feature.listPrice, className: 'header'},
							        { text: 'Description : ' + feature.attributes['Display Text'], className: 'header'},
							        ]
						});*/
						featureRuleID = feature.ruleId;


						/*this.modelEvents.publish({
							event:	'updateMANDNumberAndRefresh3D',
							data:	{
								featureId : feature.ruleId,
								mandNotValuatedBoolValue : mandNotValuatedBoolValue,
								waitForAllFeatures : true,
								oldMandNotValuatedBoolValue: mandatory,
							}
						});
						*/
						var OptDiv = UWA.createElement('table', { id: 'OptDiv'+feature.ruleId , styles : { width: '100%' },
							html: [{ tag: 'tr',
								html: [{ tag: 'td', styles: {width: "20px"},
									html: [ txtIcon]
								},
								{ tag: 'td',
									html: [ psTxtObj ]
								}]
							}]
						});
						OptRulesDiv = UWA.createElement('table', { id: 'OptRulesDiv'+feature.ruleId , styles: {width: '100%'},
							html: [""]
						});
						//OptRulesDiv.style.display = ConfiguratorVariables.str_none;
						var FtrFiltersDiv = UWA.createElement('table', { id: 'FtrFiltersDiv'+feature.ruleId , className : 'FtrFiltersDiv', styles: {width: '100%', display: 'block'},

						});

						OneFeatureDiv = UWA.createElement('div', { id: 'divFeature'+feature.ruleId , 'class' : 'OneFeatureDiv', 'filteredOut': 'No',

						    html: [{
						        tag: 'div', styles: { display: 'inline-block', position: 'relative' },
						        html: [{
						            tag: 'div', id: 'variantImageDiv' + feature.ruleId, styles: imageDivStyle, html: [
                                        { tag: 'img', id: 'variantImage' + feature.ruleId, src: image, 'class': 'img-thumbnail', styles: imageStyle }
						            ]
						        },
						        {
						            tag: 'a', id: 'numberOfSelectedOptions_' + feature.ruleId, styles: { position: 'absolute', top: '13px', right: '8px', cursor: 'pointer' }, html: ["0"]
						        }]
						    },
							       { tag: 'div', styles : { display: 'inline-block', verticalAlign: 'top' , width: 'calc(100% - 90px)' },
							       html: [{
							           tag: 'div', styles: {display: 'flex', flexDirection: 'row'}, html: [
                                                getLabelField(feature.displayName, 'overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: flex;', null, "featureLabel"),
							               ]},
									       FtrFiltersDiv,
									       OptDiv,
									       OptRulesDiv
									       ]
								       }/*,
								       { tag: 'div', styles : { top: '5px', position: 'absolute', right: '3px' },
								    	   html: [infoButton]
								    }*/     //Removed the info icon due to FD01 issue (no go on UPS function due to NLS missing)
								]
						});

						if(feature.attributes['Display Text']) {
						    var tooltip_label = new Tooltip({
						        target: OneFeatureDiv.querySelector(".featureLabel"),
						        body: '<b>' + feature.displayName + '</b><BR>' + feature.attributes['Display Text']
						    });
						}

                        for(var featureAttr in feature.attributes) {
                            OneFeatureDiv.attributes[featureAttr.replace(/\s+/g, '')] = feature.attributes[featureAttr];
                        }

						OneFeatureDiv.inject(options.parentContainer);

						var containerWidth = options.parentContainer.offsetWidth;

						if (containerWidth >= 1400) {
						    OneFeatureDiv.addClassName('largeContainer');
						}
						else if (containerWidth < 1400 && containerWidth >= 700) {
						    OneFeatureDiv.addClassName('mediumContainer');
						}
						else if (containerWidth < 700) {
						    OneFeatureDiv.addClassName('smallContainer');
						}

						var resizeSensor = new ResizeSensor(options.parentContainer, function () {
						    var width = options.parentContainer.offsetWidth;

						    if (width >= 1400) {
						        OneFeatureDiv.removeClassName('smallContainer');
						        OneFeatureDiv.removeClassName('mediumContainer');
						        OneFeatureDiv.addClassName('largeContainer');
						    }
						    else if (width < 1400 && width >= 750) {
						        OneFeatureDiv.removeClassName('smallContainer');
						        OneFeatureDiv.removeClassName('largeContainer');
						        OneFeatureDiv.addClassName('mediumContainer');
						    }
						    else if (width < 750) {
						        OneFeatureDiv.removeClassName('largeContainer');
						        OneFeatureDiv.removeClassName('mediumContainer');
						        OneFeatureDiv.addClassName('smallContainer');
						    }
						});


						imagesDropdown = new Dropdown({
						    body: '',
						    renderTo: (options.ddRenderTo) ? options.ddRenderTo : options.parentContainer,
						    target: document.getElementById('numberOfSelectedOptions_' + feature.ruleId),
						    className: "imagesDropdown",
                            name: "imagesDropdown" + feature.ruleId
						});

						mandNotValuatedBoolValue = mandatory;
						for(var j=0; j< variantOptions.length; j++)
						{
							//var selected = false;
							//var fonticon = 'user';

							var state = model.getStateWithId(variantOptions[j].ruleId);
							//var defaultValue = false;
							if (state === ConfiguratorVariables.Default)
							{
							    addRulesRow('star', variantOptions[j].displayName, OptRulesDiv, variantOptions[j].ruleId);
							    if (mandNotValuatedBoolValue === true)
							        mandNotValuatedBoolValue = false;
							}

							if(  state === ConfiguratorVariables.Chosen )
							{
							    if (mandNotValuatedBoolValue === true)
							        mandNotValuatedBoolValue = false;

							}
							else
							if(  state === ConfiguratorVariables.Required )
							{
							    if (mandNotValuatedBoolValue === true)
							        mandNotValuatedBoolValue = false;
								addRulesRow('star', variantOptions[j].displayName, OptRulesDiv, variantOptions[j].ruleId);

							}
						}
						model.setFeatureIdWithMandStatus(feature.ruleId, mandNotValuatedBoolValue);
						updateView();

						if (!mandNotValuatedBoolValue || mandNotValuatedBoolValue === false)
						{
							var optElem = document.getElementById('optIcon' + feature.ruleId);
							optElem.removeClassName("fonticon-attention");
						}
				}
			});

			return VariantPresenter;
		});

define('DS/ConfiguratorPanel/scripts/Presenters/VariantComponentPresenter',[
	'UWA/Core',
	'DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctionsV2',
	'DS/Handlebars/Handlebars',
	'DS/WebappsUtils/WebappsUtils',
	'DS/UIKIT/Tooltip',
	'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
	'DS/ResizeSensor/js/ResizeSensor',
	'DS/ConfiguratorPanel/scripts/Presenters/SingleValueAutocompletePresenter',
	'DS/ConfiguratorPanel/scripts/Presenters/MultipleValueAutocompletePresenter',
	'DS/ConfiguratorPanel/scripts/Presenters/DismissValueAutocompletePresenter',
	'DS/ConfiguratorPanel/scripts/Presenters/ParameterPresenter',
	'DS/ConfiguratorPanel/scripts/Utilities',
	'DS/UIKIT/DropdownMenu',
	'DS/UIKIT/Input/Button',
	'DS/UIKIT/SuperModal',
	'i18n!DS/xDimensionManager/assets/nls/xUnitLabelLong.json',
	'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
	'text!DS/ConfiguratorPanel/html/VariantComponentPresenter.html',
	"css!DS/ConfiguratorPanel/css/VariantComponentPresenter.css",
	'css!DS/UIKIT/UIKIT.css',
	],
	function (UWA,
		ConfiguratorSolverFunctionsV2,
		Handlebars,
		WebappsUtils,
		Tooltip,
		ConfiguratorVariables,
		ResizeSensor,
		SingleValueAutocompletePresenter,
		MultipleValueAutocompletePresenter,
		DismissValueAutocompletePresenter,
		ParameterPresenter,
		Utilities,
		DropdownMenu,
		Button,
		SuperModal,
		xUnitLabelLong,
		nlsConfiguratorKeys,
		html_VariantComponentPresenter) {

	'use strict';

	var template = Handlebars.compile(html_VariantComponentPresenter);

	var listAutcompletePresenters = [];

	var VariantComponentPresenter = function (options) {
		this._init(options);
	};

	VariantComponentPresenter.prototype._init = function(options){
		var _options = options ? UWA.clone(options, false) : {};
		UWA.merge(this, _options);
		this.variantId = this.variant.ruleId;
		if(this.variant.unit)
			this.variant.nlsUnit = xUnitLabelLong[this.variant.unit];
		this.image = this.variant.image ? this.variant.image : ConfiguratorSolverFunctionsV2.getDefaultImage();

		this._subscribeToEvents();
		this._initDivs();
		this.inject(_options.parentContainer);
		this._getAutocomplete();
	};

	VariantComponentPresenter.prototype.getDefaultImage = function() {
			return WebappsUtils.getWebappsAssetUrl("ENOXConfiguratorUX", "icons/iconLargeDefault.png");
	};

	VariantComponentPresenter.prototype._toggleVariantMultiSelect = function (activate, needConfirm) {

		var that = this;
		return new Promise ( (resolve) => {
			var currSelection = this.configModel.getFeatureSelectionMode(this.variant);
			if( ( ( currSelection === ConfiguratorVariables.feature_SelectionMode_Single ) && ( !UWA.is(activate) || activate !== false ) )
				|| (currSelection === ConfiguratorVariables.feature_SelectionMode_Dismiss && ( !UWA.is(activate) || activate !== false ))
				|| activate === true ) {
					//R14 need to confirm ?
				that.modelEvents.publish({event: 'pc-confirm-variant-multiSelect', data : {
						feature : that.variant,
						needConfirm : needConfirm,
						callback : function (confirmed) {
							if(confirmed) {
		          	var isSolverCalled = false;
								if(that.configModel.emptyDismissedOptions(that.variant)) {
		            	isSolverCalled = true;
									//R14 need to call solver after empty multiselect
									that.autocompletePresenter.callSolver();
								}
								that.configModel.setFeatureMultiSelectionMode(that.variant);
								that._updateVariantComponentMode();
								that._rebuildAutocomplete();
		            if(!isSolverCalled){
		              	that.modelEvents.publish({event: 'updateAllFilters'});
		            }
							}
							resolve(confirmed);
						}
					}
				});
				// that._confirmVariantMultiSelect(needConfirm).then( function (confirmed) {
				// 	if(confirmed) {
        //   	var isSolverCalled = false;
				// 		if(that.configModel.emptyDismissedOptions(that.variant)) {
        //     isSolverCalled = true;
				// 			//R14 need to call solver after empty multiselect
				// 			that.autocompletePresenter.callSolver();
				// 		}
				// 		that.configModel.setFeatureMultiSelectionMode(that.variant);
				// 		that._updateVariantComponentMode();
				// 		that._rebuildAutocomplete();
        //     if(!isSolverCalled){
        //       	that.modelEvents.publish({event: 'updateAllFilters'});
        //     }
				// 	}
				// 	resolve(confirmed);
				// });
			}else {
				//R14 need to confirm ?

				that.modelEvents.publish({event: 'pc-confirm-variant-singleSelect', data : {
						feature : that.variant,
						needConfirm : needConfirm,
						callback : function (confirmed) {
							if(confirmed) {
		          	var isSolverCalled = false;
								if(that.configModel.emptyMultiSelectedVariants(that.variant) || that.configModel.emptyDismissedOptions(that.variant)) {
		            isSolverCalled = true;
									//R14 need to call solver after empty multiselect
									that.autocompletePresenter.callSolver();
								}
								that.configModel.setFeatureSingleSelectionMode(that.variant);
								//that.configModel.resetFeatureSelectionMode(that.variant);
								that._updateVariantComponentMode();
								that._rebuildAutocomplete();
		            if(!isSolverCalled){
		              	that.modelEvents.publish({event: 'updateAllFilters'});
		            }
							}
							resolve(confirmed);
						}
					}
				});
				// that._confirmVariantSingleSelect(needConfirm).then( function (confirmed) {
				// 	if(confirmed) {
        //   	var isSolverCalled = false;
				// 		if(that.configModel.emptyMultiSelectedVariants(that.variant) || that.configModel.emptyDismissedOptions(that.variant)) {
        //     isSolverCalled = true;
				// 			//R14 need to call solver after empty multiselect
				// 			that.autocompletePresenter.callSolver();
				// 		}
				// 		that.configModel.setFeatureSingleSelectionMode(that.variant);
				// 		//that.configModel.resetFeatureSelectionMode(that.variant);
				// 		that._updateVariantComponentMode();
				// 		that._rebuildAutocomplete();
        //     if(!isSolverCalled){
        //       	that.modelEvents.publish({event: 'updateAllFilters'});
        //     }
				// 		resolve(confirmed);
				// 	}
				// });
			}
		});

	};

	VariantComponentPresenter.prototype._toggleVariantDismiss = function (activate, needConfirm) {

		var that = this;
		/*if(activate ) {
			this.configModel.setFeatureDismissMode(this.variant);
			//this._updateVariantComponentMode();
			this._rebuildAutocomplete();
		}else {*/
			//R14 need to confirm ?
			return new Promise( (resolve) => {
				that.modelEvents.publish({event: 'pc-confirm-variant-dismissSelect', data : {
						feature : that.variant,
						needConfirm : needConfirm,
						callback : function (confirmed) {
							if(confirmed) {
								var isSolverCalled = false;
								if(that.configModel.emptyChosenOptions(that.variant)){
									//R14 need to call solver after empty chosen
		              isSolverCalled = true;
									that.autocompletePresenter.callSolver();
								}
								that.configModel.setFeatureDismissMode(that.variant);
								that._updateVariantComponentMode();
								that._rebuildAutocomplete();
		            if(!isSolverCalled){
		              	that.modelEvents.publish({event: 'updateAllFilters'});
		            }
							}
							resolve(confirmed);
						}
					}
				});

				// that._confirmFeatureDismiss(needConfirm).then( function (confirmed) {
				// 	if(confirmed) {
				// 		var isSolverCalled = false;
				// 		if(that.configModel.emptyChosenOptions(that.variant)){
				// 			//R14 need to call solver after empty chosen
        //       isSolverCalled = true;
				// 			that.autocompletePresenter.callSolver();
				// 		}
				// 		that.configModel.setFeatureDismissMode(that.variant);
				// 		that._updateVariantComponentMode();
				// 		that._rebuildAutocomplete();
        //     if(!isSolverCalled){
        //       	that.modelEvents.publish({event: 'updateAllFilters'});
        //     }
				// 	}
				// 	resolve(confirmed);
				// });
			});

		//}

	};

	VariantComponentPresenter.prototype._rebuildAutocomplete = function () {
		if(this.variant.type != "Parameter"){
			delete this.autocompletePresenter;
		}
		this._autocompleteContainer.innerHTML = '';
		this._getAutocomplete();
	};

	// VariantComponentPresenter.prototype._confirmVariantSingleSelect = function (needConfirm) {
	// 	var that = this;
	// 	var confirmPromise = new Promise((resolve) => {
	// 		if ( that.configModel.hasDismissedOptions(that.variant) && ( !UWA.is(needConfirm) || needConfirm )
	// 			|| that.configModel.hasMultiSelectVariantValues(that.variant) && ( !UWA.is(needConfirm) || needConfirm ) ) {
	// 			var superModal = new SuperModal({ className : 'confirm-variantSingleSelect-modal', renderTo: document.body});
	// 			superModal.confirm( nlsConfiguratorKeys.Text_Confirm_EmptySelection, nlsConfiguratorKeys.Title_Confirm_SingleSelect, function (confirmed) {
	// 				confirmed = !UWA.is(confirmed) ? false : confirmed;
	// 				resolve(confirmed);
	// 			});
	// 		}
	// 		else {
	// 			resolve(true);
	// 		}
	// 	});
	//
	// 	return confirmPromise;
	// };
	//
	// VariantComponentPresenter.prototype._confirmVariantMultiSelect = function (needConfirm) {
	// 	var that = this;
	// 	var confirmPromise = new Promise((resolve) => {
	//
	// 		if ( that.configModel.hasDismissedOptions(that.variant) && ( !UWA.is(needConfirm) || needConfirm ) ) {
	// 			var superModal = new SuperModal({ className : 'confirm-variantMultiSelect-modal', renderTo: document.body});
	// 			superModal.confirm( nlsConfiguratorKeys.Text_Confirm_EmptySelection, nlsConfiguratorKeys.Title_Confirm_MultiSelect, function (confirmed) {
	// 				confirmed = !UWA.is(confirmed) ? false : confirmed;
	// 				resolve(confirmed);
	// 			});
	// 		}
	// 		else {
	// 			resolve(true);
	// 		}
	// 	});
	//
	// 	return confirmPromise;
	// };
	//
	// VariantComponentPresenter.prototype._confirmFeatureDismiss = function (needConfirm) {
	// 	var that = this;
	// 	var confirmPromise = new Promise((resolve) => {
	// 		if(that.configModel.hasChosenOptions(that.variant) && ( !UWA.is(needConfirm) || needConfirm ) ) {
	// 			var superModal = new SuperModal({ className : 'confirm-variantDismissSelect-modal', renderTo: document.body});
	// 			superModal.confirm( nlsConfiguratorKeys.Text_Confirm_EmptySelection, nlsConfiguratorKeys.Title_Confirm_DismissSelect, function (confirmed) {
	// 				confirmed = !UWA.is(confirmed) ? false : confirmed;
	// 				resolve(confirmed);
	// 			});
	// 		}else {
	// 			resolve(true);
	// 		}
	// 	});
	//
	// 	return confirmPromise;
	// };



	VariantComponentPresenter.prototype._initDivs = function () {
		var that = this;

		this._container = document.createElement('div');
		this._container.innerHTML = template(this);


		this._container = this._container.querySelector('#divFeature' + this.variant.ruleId);
		this._autocompleteContainer = this._container.querySelector('#autocompleteContainer_' + this.variant.ruleId);
		this._imageContainer = this._container.querySelector('.variantImgContainer');
		this._contentContainer = this._container.querySelector('.contentContainer');
		this._variantLableContainer = this._contentContainer.querySelectorAll('.variantLabelContainer');
		this._iconGapContainer = this._container.querySelector('.iconGapContainer');
		this._rulesIcon = this._container.querySelector('#rulesIcon_' + this.variant.ruleId);
		// UWA.extendElement(this._container.querySelector('.variantLabelContainer'))
		this._variantMultiSelect = UWA.createElement('div',{
			'class': 'variantMultiSelect fonticon fonticon-select-all-checkboxes ',
			events: {
				click: function() {
					that._toggleVariantMultiSelect();
				}
			}
		});

		this._variantSelectionMode = UWA.createElement('div',{
			'class': 'variantSelectionMode fonticon fonticon-select-all-checkboxes ',
		});

		this._variantMultiSelect.inject(this._container.querySelector('.variantLabelContainer'));
		this._variantSelectionMode.inject(this._container.querySelector('.variantLabelContainer'));
		var ModeSelectionList = [];
		if(that.variant.selectionType === "Single") {
			ModeSelectionList = [
				{ text: nlsConfiguratorKeys.Single_Select, id: 'single' ,  fonticon: 'checkbox-on',  selected: true},
				{ text: nlsConfiguratorKeys.Multi_Select, id: 'multi' , fonticon: 'select-all-checkboxes ', selectable: true  },
				{ className: "divider" },
				{ text: nlsConfiguratorKeys.Dismiss_Select, id: 'dismiss' , fonticon: 'select-none-checkboxes ', selectable: true  }	];
		}else if (that.variant.selectionType === "Multiple") {
			ModeSelectionList = [
				{ text: nlsConfiguratorKeys.Multi_Select, id: 'multi' , fonticon: 'select-all-checkboxes ',  selected: true},
				{ className: "divider" },
				{ text: nlsConfiguratorKeys.Dismiss_Select, id: 'dismiss' , fonticon: 'select-none-checkboxes ' , selectable: true }	];
		}
		if(that.variant.selectionType !== "Parameter") {
			this._variantSelectionModeDD = new DropdownMenu({
				body: 'This dropdown toggles on an icon click',
				target: this._variantSelectionMode,
				items: ModeSelectionList,
				events: {
					onClick: function (e, item) {
						var postPrm = null;

						if(item.id === 'single') {
							postPrm = that._toggleVariantMultiSelect(false);
						}else if(item.id === 'multi'){
							postPrm = that._toggleVariantMultiSelect(true);
						}else if (item.id === 'dismiss') {
							postPrm = that._toggleVariantDismiss(true);
						}
						postPrm.then( function (confirmed) {
							if(!confirmed) {
								// revert the dropdown menu selection
								const selMode = that.configModel.getFeatureSelectionMode(that.variant);
								var id = null;
								switch (selMode) {
									case ConfiguratorVariables.feature_SelectionMode_EnforceMultiple:
									case ConfiguratorVariables.feature_SelectionMode_Multiple:
									  id = 'multi';
									  break;
									case ConfiguratorVariables.feature_SelectionMode_Single:
										id = 'single';
										break;
									case ConfiguratorVariables.feature_SelectionMode_Dismiss:
										id = 'dismiss';
										break;
								}
								that._variantSelectionModeDD.activeMenu.select(that._variantSelectionModeDD.getItem(id), true);
							}
						});
					 }
				}
			});
		}


		var tooltipVariant = new Tooltip({
			target: this._container.querySelector('.variantLabelContainer .variantMultiSelect'),
			body: nlsConfiguratorKeys.Toggle_MultiSelection
		})


		this.mandIcon = this._container.querySelector('variantRightIcon_' + this.variant.ruleId);
		//this.refinedIcon = this._container.querySelector('variantRefinedIcon_' + this.variant.ruleId);
		UWA.extendElement(this.mandIcon);
		//UWA.extendElement(this.refinedIcon);

	};

	VariantComponentPresenter.prototype._subscribeToEvents = function () {
		var that = this;
		/** Since this is independent of solver calls, it can be subscribed here. **/
		this.modelEvents.subscribe({event: 'OnConfigurationModeChange'}, function (data) {
			var enable = data.mode === ConfiguratorVariables.selectionMode_Refine;
			that.configModel.resetFeatureSelectionMode(that.variant);
			that._updateVariantComponentMode();
			that._rebuildAutocomplete();
			/*if(UWA.is(that.autocompletePresenter.refineView)) {
				that.autocompletePresenter.refineView(enable);
			}*/
		});

		this.modelEvents.subscribe({event: 'OnAllVariantFilterIconClick'}, function (data) {
			// var includeValriant = that.configModel.getStateWithId(that.variant.ruleId) === "Incompatible" ? false : true;
			var includeValriant = true;
			if(that.configModel.getStateWithId(that.variant.ruleId)=== "Incompatible"){
				if(!that.configModel.getUserSelectVariantIDs(that.variant.ruleId))
					includeValriant = false;
			}
			that._setVisibility(includeValriant);
		});

		this.modelEvents.subscribe({event: 'onMandVariantIconClick'}, function (data) {
			var isMand = that.configModel.getFeatureIdWithMandStatus(that.variant.ruleId), flag;
			// var includeValriant = that.configModel.getStateWithId(that.variant.ruleId) === "Incompatible" ? false : isMand;
			var includeValriant = true;
			if(that.configModel.getStateWithId(that.variant.ruleId)=== "Incompatible"){
				if(!that.configModel.getUserSelectVariantIDs(that.variant.ruleId))
					includeValriant = false;
			}else{
				includeValriant = isMand;
			}
			if(includeValriant === true && data.activated === "updateAddition"){flag=true;}
			if(includeValriant === false && data.activated === "updateAddition"){} // case when auto updates removes variant
			else that._setVisibility(includeValriant,flag);
		});

		this.modelEvents.subscribe({event: 'OnUnselectedVariantIconClick'}, function (data) {
			var isSelcted = that.configModel.getFeatureIdWithStatus(that.variant.ruleId),flag;
			// var includeValriant = that.configModel.getStateWithId(that.variant.ruleId) === "Incompatible" ? false : !isSelcted;
			var includeValriant = true;
			if(that.variant.selectionType === "Parameter"){
				if(that.configModel.getValueWithId(that.variant.ruleId)){
					includeValriant = false;
				}
			}else{
			if(that.configModel.getStateWithId(that.variant.ruleId)=== "Incompatible"){
				if(!that.configModel.getUserSelectVariantIDs(that.variant.ruleId))
					includeValriant = false;
			}else{
				includeValriant = !isSelcted;
			}
			}

			if(includeValriant === true && data.activated === "updateAddition"){flag=true;}
			if(includeValriant === false && data.activated === "updateAddition"){} // case when auto updates removes variant
			else that._setVisibility(includeValriant,flag);
		});

		this.modelEvents.subscribe({event: 'OnRuleNotValidatedIconClick'}, function (data) {
			var isSelcted = that.configModel.getFeatureIdWithRulesStatus(that.variant.ruleId),flag, includeValriant = true;
			if(that.variant.selectionType === "Parameter"){
				includeValriant = false;
			}else{
				if(that.configModel.getStateWithId(that.variant.ruleId)=== "Incompatible"){
					if(!that.configModel.getUserSelectVariantIDs(that.variant.ruleId))
						includeValriant = false;
				}else{
					includeValriant = isSelcted;
				}
			}
				if(includeValriant === true && data.activated === "updateAddition"){flag=true;}
				if(includeValriant === false && data.activated === "updateAddition"){} // case when auto updates removes variant
				else that._setVisibility(includeValriant,flag);
		});

		this.modelEvents.subscribe({event: 'onChosenVariantIconClick'}, function (data) {
			var isChosen = that.configModel.getFeatureIdWithChosenStatus(that.variant.ruleId),flag;
			var includeValriant = isChosen;
			if(that.variant.selectionType === "Parameter"){
				if(that.configModel.getValueWithId(that.variant.ruleId)){
					includeValriant = true;
				}
			}else{
			if(that.configModel.getStateWithId(that.variant.ruleId)=== "Incompatible"){
				if(!that.configModel.getUserSelectVariantIDs(that.variant.ruleId))
					includeValriant = false;
			}}

			if(includeValriant === true && data.activated === "updateAddition"){flag=true;}
			if(includeValriant === false && data.activated === "updateAddition"){} // case when auto updates removes variant
			else that._setVisibility(includeValriant,flag);
		});

		this.modelEvents.subscribe({event: 'OnConflictIconClick'}, function (data) {
			var conflictOptions = that.configModel.getConflictingFeatures(), conflictingFeatures = [], flag;
			var rulesActivationStatus = that.configModel.getRulesActivation();
			if(that.configModel.getNumberOfConflictingFeatures() > 0){
				for (var i = 0; i < conflictOptions.length; i++) {
					for (var j = 0; j < conflictOptions[i].length; j++) {
						conflictingFeatures.push(that.configModel.getFeatureIdWithOptionId(conflictOptions[i][j]));
					}
				}
			}
			var includeValriant = conflictingFeatures.indexOf(that.variant.ruleId) === -1 ? false : rulesActivationStatus;
			if(includeValriant === true && data.activated === "updateAddition"){flag=true;}
			if(includeValriant === false && data.activated === "updateAddition"){} // case when auto updates removes variant
			else that._setVisibility(includeValriant,flag);
		});

		this.modelEvents.subscribe({event: 'updateExclusions'}, function (data) {
				var includeValriant = true;
				if(that.configModel.getStateWithId(that.variant.ruleId)=== "Incompatible"){
					if(!that.configModel.getUserSelectVariantIDs(that.variant.ruleId))
						includeValriant = false;
				}
				if(!includeValriant){
					that._setVisibility(includeValriant);
					that.excludedVariant = true;
				}else if(includeValriant && that.excludedVariant){
					that._setVisibility(includeValriant);
					that.excludedVariant = false;
				}
		});


		this.modelEvents.subscribe({event: 'applyDefaultSearch'}, function (data) {
			var attributesList = [];
			if(that.variant.displayName) {
				attributesList.push(that.variant.displayName);
			}
			for (var i = 0; i < that.variant.options.length; i++) {
				attributesList["value_" + that.variant.options[i].ruleId + "_DisplayName"] = that.variant.options[i].displayName;
			}
			var searchValue = (data && data.searchValue) ? data.searchValue : [];
			var matchFound = false;
			that.configModel.setCurrentSearchData(data);
			if (that.configModel.getVariantVisibility(that.variant.ruleId)) {
				that._container.style.display = 'inline-block';
				if (searchValue.length > 0) {
					for (var attr in attributesList) {
						var AttribValue = attributesList[attr].replace(/\s+/g, '');
						for (var i = 0; i < searchValue.length; i++) {
							if (AttribValue.toUpperCase().contains(searchValue[i].toUpperCase()) || searchValue[i] === '') {
								matchFound = true;
								break;
							}
						}
						if (matchFound)break;
					}
					if (!matchFound) {
						that._container.style.display = 'none';
					}
				}
			} else {
				that._container.style.display = 'none';
			}
		});

		// L3B : filter Event
		this.modelEvents.subscribe({event: 'OnFilterResult'}, function (data) {
			var searchBox = document.querySelector('.autocomplete-input');
			var value = searchBox ? searchBox.value : "";
			var text = data.searchValue || value;
			that.configModel.setCurrentSearchData({searchValue : [text]});

			// if (that.configModel.getVariantVisibility(that.variant.ruleId)) {
				if(!that.variant.xFiltersMerge){
					that.variant.xFiltersMerge = {};
				}
				if (data.filterValues.indexOf(that.variant.ruleId) != -1) {
					that.variant.xFiltersMerge[data.filterType] = true;
				}else{
					that.variant.xFiltersMerge[data.filterType] = false;
					//IR-607240 - Search
					if(that.variant && that.variant.optionPhysicalIds){
						for (var i = 0; i < that.variant.optionPhysicalIds.length; i++) {
							if(data.filterValues.indexOf(that.variant.optionPhysicalIds[i]) != -1){
								that.variant.xFiltersMerge[data.filterType] = true;
								break;
							}
						}
					}
				}
					that._applyAllFilters();
			// }else{
			// 	that._container.style.display = 'none';
			// 	that.variant.xFiltersMerge = {};
			// }
		});

		//R14: move to complete mode
		// tracker API
		//this._modelEvents.publish({event:	'configurator-rule-mode-updated'});
		this.configModel._modelEvents.subscribe({event: 'configurator-rule-mode-updated'}, function () {
			that._rebuildAutocomplete();
		});

	};

	VariantComponentPresenter.prototype._applyAllFilters= function() {
		var that = this;
		if(that.variant.xFiltersMerge && that.configModel.getVariantVisibility(that.variant.ruleId)){
			var isFiltered = true;
			Object.keys(that.variant.xFiltersMerge).forEach(function(key) {
				if(that.variant.xFiltersMerge[key] == false){
					isFiltered = false;
				}
			});
			if (isFiltered){
				that._container.style.display = 'inline-block';
			}else{
				that._container.style.display = 'none';
			}
		}
	};

	VariantComponentPresenter.prototype._isFiltered = function() {
		var isFiltered = true;
		if(this.variant.xFiltersMerge){
			for (var key in this.variant.xFiltersMerge) {
				if (this.variant.xFiltersMerge.hasOwnProperty(key)) {
					if(this.variant.xFiltersMerge[key] == false){
						isFiltered = false;
					}
				}
			}
		}
		return isFiltered;
	};

	VariantComponentPresenter.prototype._setVisibility= function(criteria,flag) {
		var isFiltered = this._isFiltered();
		if(criteria){
			if(this._container.style.display !== 'inline-block'){
				flag ? this._container.classList.add("animated-variant") : this._container.classList.remove("animated-variant");
				this.configModel.setVariantVisibility(this.variant.ruleId, true);
			}
		}else{
			this.configModel.setVariantVisibility(this.variant.ruleId, false);
		}
		var values = this.configModel.getCurrentSearchData();
		if (this.configModel.getSearchStatus() && values && values.searchValue && values.searchValue.length > 0 && values.searchValue[0] !== "") {
			this.modelEvents.publish({event: 'OnSearchResult',data: values});
		}else{
			if(criteria){
				if(this._container.style.display !== 'inline-block'){
					flag ? this._container.classList.add("animated-variant") : this._container.classList.remove("animated-variant");
					if(isFiltered) {
						this._container.style.display = 'inline-block';
					}
					this.configModel.setVariantVisibility(this.variant.ruleId, true);
				}
			}else{
				this._container.style.display = 'none';
				this.configModel.setVariantVisibility(this.variant.ruleId, false);
			}
		}
	};

	VariantComponentPresenter.prototype.inject= function(parentcontainer) {
		parentcontainer.appendChild(this._container);
	};

	VariantComponentPresenter.prototype._getAutocomplete= function() {
		var options = {
				variant: this.variant,
				parentContainer: this._autocompleteContainer,
				imageContainer : this._imageContainer,
				configModel: this.configModel,
				modelEvents: this.modelEvents
		}
		if(this.variant.selectionType === "Parameter"){
			this._contentContainer.classList.add("contentContainerForRealistic");
			this.parameterPresenter = new ParameterPresenter(options);
		}else{
			//Unconstrained mode
			// rely on ConfigModel
			var currSelectionMode = this.configModel.getFeatureSelectionMode(this.variant);
			if( currSelectionMode === ConfiguratorVariables.feature_SelectionMode_Multiple ||
				currSelectionMode === ConfiguratorVariables.feature_SelectionMode_EnforceMultiple
			) {
				this.autocompletePresenter = new MultipleValueAutocompletePresenter(options);
			}else if (currSelectionMode === ConfiguratorVariables.feature_SelectionMode_Single )  {
				this._contentContainer.classList.add("contentContainerForRealistic");
				this.autocompletePresenter = this.variant.selectionType === ConfiguratorVariables.Single ?
				new SingleValueAutocompletePresenter(options) : new MultipleValueAutocompletePresenter(options);
			}else if (currSelectionMode === ConfiguratorVariables.feature_SelectionMode_Dismiss) {
				this.autocompletePresenter = new DismissValueAutocompletePresenter(options);
			}
      currSelectionMode = "";
			listAutcompletePresenters.push(this.autocompletePresenter);
		}
		// if(this.version !== "V5"){
		if(!this.configModel.isAsyncRuleLoad()){
			this.updateView();
		}

		this._updateVariantComponentMode();

		//multi select toggle hidden in Complete Configuration Mode or Refine Mode
		/*if (!this._DropdownMenuSingleMode.getItem(1)) {
			//this._DropdownMenuSingleMode.addItem({ text: nlsConfiguratorKeys.Allow_Variant_MultiSelection });
			this._container.querySelector('.variantDropDownMenu_list').style.display = 'block';
		}*/

	};

	VariantComponentPresenter.prototype._updateVariantComponentMode= function(){

    var currentSelectionMode = this.configModel.getFeatureSelectionMode(this.variant);

		if( ( 	currentSelectionMode === ConfiguratorVariables.feature_SelectionMode_Single ||
				currentSelectionMode === ConfiguratorVariables.feature_SelectionMode_EnforceMultiple
			) &&
			this.configModel.getRulesMode() !== ConfiguratorVariables.RulesMode_SelectCompleteConfiguration &&
			this.configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Build
		){
			this._variantMultiSelect.show();
			this._variantSelectionMode.hide();
		}else if ( this.configModel.getSelectionMode() === ConfiguratorVariables.selectionMode_Refine  ) {
			this._variantSelectionMode.show();
			this._variantMultiSelect.hide();
		}
		else  {
			this._variantSelectionMode.hide();
			this._variantMultiSelect.hide();
		}

		if( currentSelectionMode === ConfiguratorVariables.feature_SelectionMode_EnforceMultiple
			|| currentSelectionMode === ConfiguratorVariables.feature_SelectionMode_Multiple  ) {
			this._variantSelectionModeDD.toggleSelection(this._variantSelectionModeDD.getItem('multi'));
			this._variantMultiSelect.addClassName('active');
			this._variantSelectionMode.addClassName('fonticon-select-all-checkboxes');
			this._variantSelectionMode.removeClassName('fonticon-checkbox-on');
			this._variantSelectionMode.removeClassName('fonticon-select-none-checkboxes');

		}else if ( currentSelectionMode === ConfiguratorVariables.feature_SelectionMode_Single ) {
			this._variantSelectionModeDD.toggleSelection(this._variantSelectionModeDD.getItem('single'));
			this._variantMultiSelect.removeClassName('active');
			this._variantSelectionMode.addClassName('fonticon-checkbox-on');
			if(this.variant.type === "Variant"){
				this._variantSelectionMode.removeClassName('fonticon-select-all-checkboxes');
				this._variantSelectionMode.removeClassName('fonticon-select-none-checkboxes');
			}
		}else if (currentSelectionMode === ConfiguratorVariables.feature_SelectionMode_Dismiss) {
			if(this.variant.type === "Parameter"){
				this._variantSelectionMode.removeClassName('fonticon-select-all-checkboxes');
				this._variantSelectionMode.removeClassName('fonticon-checkbox-on');
				return;
			}
			this._variantSelectionModeDD.toggleSelection(this._variantSelectionModeDD.getItem('dismiss'));
			this._variantMultiSelect.removeClassName('active');
			this._variantSelectionMode.addClassName('fonticon-select-none-checkboxes');
			this._variantSelectionMode.removeClassName('fonticon-select-all-checkboxes');
			this._variantSelectionMode.removeClassName('fonticon-checkbox-on');
		}
    currentSelectionMode = "";
	};

	VariantComponentPresenter.prototype.getListAutocomplete= function(){
		return listAutcompletePresenters;
	};

	VariantComponentPresenter.prototype.updateView=function (data) {
		if (this.autocompletePresenter) {
				this.autocompletePresenter.enforceRequired(data);
			}else if(this.parameterPresenter){
				this.parameterPresenter.enforceRequired(data);
			}
	};

	VariantComponentPresenter.prototype._resize= function (currentWidth) {
		var width = currentWidth || 0;
		this._container.classList.remove('smallerContainer');
		this._container.classList.remove('smallContainer');
		this._container.classList.remove('mediumContainer');
		this._container.classList.remove('largeContainer');
		if (width >= 1600) {
			this._container.classList.add('xlargeContainer');
		} else if (width < 1600 && width >= 1400) {
			this._container.classList.add('largeContainer');
		}else if (width < 1400 && width > 800) {
			this._container.classList.add('mediumContainer');
		}else if (width <= 800) {
			this._container.classList.add('smallContainer');
		}
	};

	return VariantComponentPresenter;
});


define(
		'DS/ConfiguratorPanel/scripts/Presenters/VariantClassesPresenter', 
		[
		 'UWA/Core',
		 'UWA/Controls/Abstract',
		 'DS/ConfiguratorPanel/scripts/Presenters/VariantPresenter',
         'DS/ConfiguratorPanel/scripts/Utilities',
	     'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
        
		 'css!DS/UIKIT/UIKIT.css'
		 
		 ],	
		 function (UWA, Abstract, VariantPresenter, Utilities, nlsConfiguratorKeys) {

			'use strict';

			var VariantClassesPresenter = Abstract.extend({
				/**
				 * @description
				 * <blockquote>
				 * <p>Initialiaze the VariantClassesPresenter component with the required options</p>
				 * <p>This component shows all the Features from Dictionary along with
				 * <ul>
				 * <li>Its Image.</li>
				 * <li>Label for Name</li>
				 * <li>Below the Name label , other attribute label is shown if that attribute is used to search feature</li>
				 * <li>Text box for selected Options with drop down to select options </li>
				 * <li>a small info icon to see other attributes </li>				 
				 * <li>Options selected by Rules are shown with a select icon, if clicked , the option will become user selected</li>
				 * </ul>
				 * </p>
				 * </blockquote>
				 *
				 * @memberof module:DS/ConfiguratorPanel/ConfiguratorPanel#
				 *
				 * @param {Object} options - Available options.
				 * @param {Object} options.parentContainer - The parent container where the VariantClassesPresenter will be injected
				 *
				 */
				listFilterStatusForFeatures : [],
				listMandStatusForFeatures: [],
				listResetStatusForFeatures: [],
				numberOfVariantClassesOnDictionary : 0,
				
				init: function (options) {
					var that = this;
					var model = options.configModel;
					
					that.listFilterStatusForFeatures = [];
					that.listMandStatusForFeatures = [];
					that.listResetStatusForFeatures = [];

					var FtrResultsDiv = UWA.createElement('div');
					FtrResultsDiv.id = "FtrResultsDiv";	
					FtrResultsDiv.style.display = 'none';					
					options.parentContainer.addContent(FtrResultsDiv);

					//Create the Main div of the VariantClassesPresenter
					var FeaturesDiv = UWA.createElement('div');
					FeaturesDiv.id = "FeaturesDiv";		
					FeaturesDiv.style.height = "calc(100% - " + FtrResultsDiv.offsetHeight + "px)";
					FeaturesDiv.style.overflow = "auto";
					FeaturesDiv.style.width = "100%";

					var extendedFeaturesDiv = UWA.extendElement(FeaturesDiv);
					options.parentContainer.addContent(extendedFeaturesDiv);

					var dico = options.configModel.getDictionary();
					var featureList = dico.features;	
					that.numberOfVariantClassesOnDictionary = featureList.length;

					var modelEvents = options.modelEvents;
					
					modelEvents.subscribe({ event: 'OnFilterResultChange' }, function (data) {

					    updateFilterResultNumber(data.featureId, data.resultBoolValue, data.show);
					});

					modelEvents.subscribe({ event: 'updateMANDNumberAndRefresh3D' }, function (data) {
					    updateMANDNumberAndRefresh3D(data.featureId, data.mandNotValuatedBoolValue, data.waitForAllFeatures, data.oldMandNotValuatedBoolValue);
					});

					modelEvents.subscribe({ event: 'displayMessageFeatureReseted' }, function (data) {
					    displayMessageFeatureReseted(data.featureId, data.hasBeenReseted);
					});

					extendedFeaturesDiv.addEvent('scroll', function () {
					    modelEvents.publish({
					        event: 'OnFeaturesDivScrolled'
					    });
					});

					var numberOfMandFeaturesNotValuated = 0;
					for(var i=0; i< featureList.length; i++)
					{
						var optVariants = {
							feature: featureList[i],
							parentContainer: extendedFeaturesDiv,
							configModel: model,
							modelEvents: modelEvents,
							ddRenderTo: options.ddRenderTo
						};
						var variantView = new VariantPresenter(optVariants);
						//if rules mode is not set
						var mandNotValuatedBoolValue = model.getFeatureIdWithMandStatus(featureList[i].ruleId);
						if(mandNotValuatedBoolValue == true) numberOfMandFeaturesNotValuated++;
						
					}			
					model.setNumberOfMandFeaturesNotValuated(numberOfMandFeaturesNotValuated);
					
					//@param resultBoolValue : true if the feature matches with the filter
					function updateFilterResultNumber(featureId, resultBoolValue, show) {
						var FtrResultsDiv = document.getElementById("FtrResultsDiv");
						
						if(show == false) {
							FtrResultsDiv.setContent("");
							FtrResultsDiv.style.display = 'none';
						}
						else {
							that.listFilterStatusForFeatures[featureId] = resultBoolValue;
							
							if(Object.keys(that.listFilterStatusForFeatures).length == that.numberOfVariantClassesOnDictionary) {
								
								var count = 0;
							
								for(var key in that.listFilterStatusForFeatures) {
									if(that.listFilterStatusForFeatures[key] == true)
										count++;
								}
								
								var myLabel = getLabelField(count + " " + nlsConfiguratorKeys.results ,"right: '0px'");						
								FtrResultsDiv.setContent(myLabel);
								FtrResultsDiv.style.display = 'block';
															
								that.listFilterStatusForFeatures = [];
							}
						}

						FeaturesDiv.style.height = "calc(100% - " + FtrResultsDiv.offsetHeight + "px)";
						
						function getLabelField(value , style, display) {
							var labeltag = ' <label style=\"display: '

								if(!display) display = 'block';
							labeltag = labeltag.concat(display); 
							labeltag = labeltag.concat(';padding: 5px 5px 0px 5px;font-family: sans-serif;');
							if(style && style!="") labeltag = labeltag.concat(style);
							labeltag = labeltag.concat('\" >'+value+'</label>');
							return labeltag;
						};		
					};
					
					//@param mandNotValuatedBoolValue : true if the feature is mandatory and not yet valuated
					function updateMANDNumberAndRefresh3D (featureId, mandNotValuatedBoolValue, waitForAllFeatures, oldMandNotValuatedBoolValue) {
						if(waitForAllFeatures) {
							that.listMandStatusForFeatures[featureId] = mandNotValuatedBoolValue;
								
							if(Object.keys(that.listMandStatusForFeatures).length == that.numberOfVariantClassesOnDictionary) {
								var count = 0;
								
								for(var key in that.listMandStatusForFeatures) {
									
									if(that.listMandStatusForFeatures[key] == true)
										count++;
									
									model.setFeatureIdWithMandStatus(key, that.listMandStatusForFeatures[key]);
								}
									
								//update the number of Mand not valuated
								model.setNumberOfMandFeaturesNotValuated(count);
								
								//update 3D
								modelEvents.publish( {
									event:	'ComputeConfigExpression'
								});

								that.listMandStatusForFeatures = [];
							}
						}
						else {
							if(oldMandNotValuatedBoolValue == true && mandNotValuatedBoolValue == false) {
								//update the number of Mand not valuated
								model.setNumberOfMandFeaturesNotValuated(model.getNumberOfMandFeaturesNotValuated() - 1);
								model.setFeatureIdWithMandStatus(featureId, false);
							}
							else if(oldMandNotValuatedBoolValue == false && mandNotValuatedBoolValue == true) {
								//update the number of Mand not valuated
								model.setNumberOfMandFeaturesNotValuated(model.getNumberOfMandFeaturesNotValuated() + 1);
								model.setFeatureIdWithMandStatus(featureId, true);
							}
							
							//update 3D
							modelEvents.publish( {
								event:	'ComputeConfigExpression'
							});
						}
					};

					function displayMessageFeatureReseted(featureId, hasBeenReseted) {
					    
					    var message;

					    that.listResetStatusForFeatures[featureId] = hasBeenReseted;

					    if (Object.keys(that.listResetStatusForFeatures).length == that.numberOfVariantClassesOnDictionary) {

					        var listOfFeaturesReset = [];

					        for (var key in that.listResetStatusForFeatures) {
					            if (that.listResetStatusForFeatures[key] == true)
					                listOfFeaturesReset.push(key);
					        }

					        if (listOfFeaturesReset.length > 0) {
					            message = nlsConfiguratorKeys.InfoUnsettingMultiSelection + "<br>";
					            for (var i = 0; i < listOfFeaturesReset.length; i++) {
					                message += "<blocquote style='padding-left:20px;'>" + model.getFeatureDisplayNameWithId(listOfFeaturesReset[i]) + "<br></blocquote>";
					            }
					            
					            Utilities.displayNotification({
					                eventID: 'info',
					                msg: message
					            });
					        }
                            
					        that.listResetStatusForFeatures = [];

					        modelEvents.publish({
					            event: 'SolverFct_CallSolveMethodOnSolver',
					            data: {}
					        });
					    }					    
					};
				}
			});

			return VariantClassesPresenter;
		});


define(
		'DS/ConfiguratorPanel/scripts/Presenters/VariantListPresenter',
		[
			'UWA/Core',
			'DS/Handlebars/Handlebars',
			'DS/UIKIT/Mask',
			'DS/UIKIT/Scroller',
			'DS/ConfiguratorPanel/scripts/Presenters/VariantComponentPresenter',
			'DS/ConfiguratorPanel/scripts/Utilities',
			'DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctions',
			'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
			'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
			'text!DS/ConfiguratorPanel/html/VariantListPresenter.html',
			"css!DS/ConfiguratorPanel/css/VariantListPresenter.css",
			'css!DS/UIKIT/UIKIT.css'

			],
			function (UWA, Handlebars,Mask, Scroller, variantComponentPresenter, Utilities,ConfiguratorSolverFunctions,ConfiguratorVariables, nlsConfiguratorKeys, html_VariantListPresenter) {

			'use strict';

			var template = Handlebars.compile(html_VariantListPresenter);

			var VariantListPresenter = function (options) {
				this._init(options);
			};

			VariantListPresenter.prototype._init = function(options){
				var _options = options ? UWA.clone(options, false) : {};
				UWA.merge(this, _options);

				this._subscribeToEvents();
				this._initDivs();
				this._render();
				this.inject(_options.parentContainer);
				// new Scroller({element: this._container}).inject(this._scrollContainer);
			};

			VariantListPresenter.prototype._initDivs = function () {
				this._container = document.createElement('div');
				this._container.innerHTML = template({nls : nlsConfiguratorKeys});

				this._container = this._container.querySelector('#config-editor-variant-list');
				this._extendedVariantList = this._container.querySelector('#config-editor-extended-variant-list');
				this._scrollContainer = this._container.querySelector('#config-editor-scroll-container');
				//this._container.style.height = "calc(100% - 63px)";
				// this._container.style.height = "100%";
			};

			VariantListPresenter.prototype.inject= function(parentcontainer) {
				if(parentcontainer){
					parentcontainer.appendChild(this._container);
					parentcontainer.appendChild(this._scrollContainer);
				}
			};

			VariantListPresenter.prototype._render= function(parentcontainer) {
				var dico = this.configModel.getDictionary();
				var featureList = dico.features ? dico.features : [];
				this.configModel.setVariants(featureList.length);
				this.variantCompList = [];
				this.listAutocomplete = [];

				// var featureList = featureList.sort(function(a, b) {
				// 		var nameA = parseInt(a.sequenceNo); //a.displayName.toUpperCase();
				// 		var nameB = parseInt(b.sequenceNo);//b.displayName.toUpperCase();
				// 		if (nameA < nameB) {
				// 			return -1;
				// 		}
				// 		if (nameA > nameB) {
				// 			return 1;
				// 		}
				// 		return 0;
				// 	});

				for(var i=0; i< featureList.length; i++){
					this.variantCompList.push(new variantComponentPresenter({
						variant: featureList[i],
						parentContainer: this._extendedVariantList,
						configModel: this.configModel,
						modelEvents	: this.modelEvents,
						version : this.version
					}));
					this.listAutocomplete = this.variantCompList[0].getListAutocomplete();
					this.mandIcon = document.getElementById('variantRightIcon_' + featureList[i].ruleId);
					//this.refinedIcon = document.getElementById('variantRefinedIcon_' + featureList[i].ruleId);
				}

				/** Filter list based on the topbar filter selection**/
				var currentFilter = this.configModel.getCurrentFilter();
				if(currentFilter === ConfiguratorVariables.Filter_AllVariants){
					this.configModel.setVariants(featureList.length);
					this.modelEvents.publish({ event: "OnAllVariantFilterIconClick", data:{activated:'true'} });
				}
			};

			VariantListPresenter.prototype._subscribeToEvents = function() {
				var that = this;

				this.modelEvents.subscribe({ event: 'updateAllFilters' }, function (data) {
					that.updateFilters(data);
				});

				this.modelEvents.subscribe({ event: 'updateVariantList' }, function (data) {
					that.updateVariantList();
				});

				this.modelEvents.subscribe({ event: 'applyVariantListFilters' }, function (data) {
					that.applyVariantListFilters(data);
				});

				this.modelEvents.subscribe({ event: 'OnSortResult'}, function(data){
					that._sortAttribute = data.sortAttribute;
					that._sortOrder = data.sortOrder;
					 	that.variantCompList = that.variantCompList.sort(function(a, b) {
							var nameA,nameB;
							if(that._sortAttribute === "displayName"){
								nameA = a.variant.displayName.toUpperCase();
								nameB = b.variant.displayName.toUpperCase();
							}
							if(that._sortAttribute === "sequenceNumber"){
								nameA = parseInt(a.variant.sequenceNumber);
								nameB = parseInt(b.variant.sequenceNumber);
							}
							if (that._sortOrder === "DESC") {
								var temp = nameA;
								nameA = nameB;
								nameB = temp;
							}
							if (nameA < nameB) {
								return -1;
							}
							if (nameA > nameB) {
								return 1;
							}
							return 0;
						});
						that.variantCompList.forEach(function (p) {
	        		that._extendedVariantList.appendChild(p._container);
	    			});
				});


				this.modelEvents.subscribe({event: 'solveAndDiagnoseAll_SolverAnswer'}, function (data) {
						if(data){
							data.updateView = true;
							data.answerDefaults = that.configModel.getDefaultCriteria();
						}
						that.updateFilters(data);
						that.modelEvents.publish({event:"pc-interaction-complete"});
						that.modelEvents.publish({event:"pc-dd-interaction-complete"});
				});

				this.modelEvents.subscribe({event: 'getResultingStatusOriginators_SolverAnswer'}, function (data) {
					if(data){
						var message = that.computeMessage(data);
						if(data.optionSelected && message){
							var variantId = that.configModel.getFeatureIdWithOptionId(data.optionSelected);
							for(var i=0;i < that.listAutocomplete.length; i++){
								if(variantId === that.listAutocomplete[i].variant.ruleId){
									that.listAutocomplete[i].setTooltipMessage(data.optionSelected, message);
								}
							}
						}
					}
				});

				this.modelEvents.subscribe({event: 'OnRuleAssistanceLevelChange'}, function (data){
					if (data.value === ConfiguratorVariables.NoRuleApplied) {
						that.modelEvents.publish({event : "pc-interaction-started"});
						setTimeout(function () {
							that.modelEvents.publish({event : "solveAndDiagnoseAll_SolverAnswer", data : data});
						}, 100);
					}
				});


				this.modelEvents.subscribe({event: 'OnAllVariantMultiSelect'}, function () {
					that.variantCompList.forEach(function (variantPresenter) {
						//force variant to multi select
						variantPresenter._toggleVariantMultiSelect(true);
					});
				});

				this.modelEvents.subscribe({event: 'OnAllVariantMonoSelect'}, function () {
					that.variantCompList.forEach(function (variantPresenter) {
						//force variant to multi select
						variantPresenter._toggleVariantMultiSelect(false,false);
					});
				});

				this.modelEvents.subscribe({event: 'OnConfigurationModeChange'}, function () {
					that.updateFilters();
				});


				/** Since this is independent of solver calls, it can be subscribed here. **/
				/*this.modelEvents.subscribe({event: 'OnConfigurationModeChange'}, function (data) {

					that.variantCompList.forEach(function (variantPresenter) {
						//force variant to multi select
						that.configModel.resetFeatureSelectionMode(variantPresenter.variant);
						variantPresenter._rebuildAutocomplete();
						var selectedVariant = that.configModel.getFeatureIdWithStatus(variantPresenter.variant.ruleId);
						if(data.mode === ConfiguratorVariables.selectionMode_Refine && selectedVariant){
							that.configModel.setFeatureIdWithUserSelection(variantPresenter.variant.ruleId, true);
						}else if (data.mode === ConfiguratorVariables.selectionMode_Refine) {
							variantPresenter._setIncludedState();
						}else if (UWA.is(variantPresenter._unsetIncludedState)){
							variantPresenter._unsetIncludedState();
							//variantPresenter.configModel.setConfigurationCriteria(variantPresenter.configModel.getCriteriaBuildMode());
						}
					});

					if(data.mode === ConfiguratorVariables.selectionMode_Refine){
						that.configModel.setCriteriaBuildMode(that.configModel.getConfigurationCriteria());
					}
					if(that.configModel.getRulesActivation() === ConfiguratorVariables.str_true){
						that.modelEvents.publish({event:'SolverFct_CallSolveMethodOnSolver', data : {}});
					}else{
						that.modelEvents.publish({event:'solveAndDiagnoseAll_SolverAnswer', data:	that.configModel.getConfigurationCriteria()});
					}

				});*/

			};

			VariantListPresenter.prototype.computeMessage = function (data) {
				// var state = this.configModel.getStateWithId(data.optionSelected);
				// var listIncompatibilities = data.listOfIncompatibilitiesIds ? data.listOfIncompatibilitiesIds : [];
				// var optionName = this.configModel.getOptionDisplayNameWithId(data.optionSelected);
				// var message = "";
				// if (data.answerRC !== ConfiguratorVariables.str_ERROR) {
				// 	message = UWA.i18n("Option") + " " + optionName + " " + UWA.i18n("is") + " " + UWA.i18n(state);
				// 	if (listIncompatibilities.length > 0) {
				// 		message += " because ";
				// 		for (var i = 0; i < listIncompatibilities.length; i++) {
				// 			if(i > 0) message += ",";
				// 			for (var j = 0; j < listIncompatibilities[i].length; j++) {
				// 				state = this.configModel.getStateWithId(listIncompatibilities[i][j]);
				// 				var variant = this.configModel.getFeatureDisplayNameWithId(listIncompatibilities[i][j]) + "[" + this.configModel.getOptionDisplayNameWithId(listIncompatibilities[i][j]) + "]"
				// 				message += " " + UWA.i18n("Option") + " " + variant + " " + "is" + " " + 	UWA.i18n(state);
				// 			}
				// 		}
				// 	}
				// }else{
				// 	message += UWA.i18n("InfoComputationAborted");
				// }

				var listIncompatibilities = data.listOfIncompatibilitiesIds ? data.listOfIncompatibilitiesIds : [];
				var model = this.configModel;
				var state = model.getStateWithId(data.optionSelected);
				var optionName = model.getOptionDisplayNameWithId(data.optionSelected)
				var rc = data.answerRC;

				var message = '';

				if (listIncompatibilities.length == 0) {
						if (rc !== ConfiguratorVariables.str_ERROR) {
								message = UWA.i18n("Option") + " " + optionName + " " + UWA.i18n("is") + " " + UWA.i18n(state);
						}
				} else {
						var msgStr1 = UWA.i18n("Option #OPTION# is #STATUS# because") + " ";
						msgStr1 = msgStr1.replace("#OPTION#", optionName);
						msgStr1 = msgStr1.replace("#STATUS#", UWA.i18n(state));
						message = msgStr1;

						for (var i = 0; i < listIncompatibilities.length; i++) {

								if (i > 0)
										message += " " + UWA.i18n("and because") + " ";

								for (var j = 0; j < listIncompatibilities[i].length; j++) {

										state = model.getStateWithId(listIncompatibilities[i][j]);

										var msgStr2 = UWA.i18n("#OPTION# is #STATUS#");
										msgStr2 = msgStr2.replace("#OPTION#", model.getFeatureDisplayNameWithId(listIncompatibilities[i][j]) + "[" + model.getOptionDisplayNameWithId(listIncompatibilities[i][j]) + "]");
										msgStr2 = msgStr2.replace("#STATUS#", UWA.i18n(state));
										message += " " + msgStr2 ;
								}
						}
				}

				if (rc === ConfiguratorVariables.str_ERROR) {
						message += UWA.i18n("InfoComputationAborted");
				}

				return message;
			};

			VariantListPresenter.prototype.updateFilters= function(data){
				var that =this;
				if(that.variantCompList && that.variantCompList.length > 0){
					var mandVariants = 0, unselectedVariants = 0, rulesVariants= 0, chosenVariant = 0;
					var mandvariant,conflicts, includedState, selected, ruleSelected, mandIcon, refinedIcon;
					var rules = that.configModel.getRulesActivation() === ConfiguratorVariables.str_true;
					var countVariants =0;

					//Added here for IR - New implementation
					that._allvariants = that.configModel.getVariants() || 0;
					that._conflicts = that.configModel.getNumberOfConflictingFeatures() || 0;
					that._rules = that.configModel.getNumberOfFeaturesByRules() || 0;
					that._unselectedVariants = that.configModel.getNumberOfFeaturesNotValuated() || 0;
					that._mandatory = that.configModel.getNumberOfMandFeaturesNotValuated() || 0;

					for(var i=0;i < that.variantCompList.length; i++){
						if((data && data.updateView && that.configModel.getUpdateRequired(that.variantCompList[i].variantId)) || (data && data.refresh)){
							that.variantCompList[i].updateView(data);
						}
							var variantRuleId = that.variantCompList[i].variantId;
							// var variantIncompatible = that.configModel.getStateWithId(variantRuleId)=== "Incompatible" ? true : false;
							var variantIncompatible = false;
							if(that.configModel.getStateWithId(variantRuleId)=== "Incompatible"){
								if(!that.configModel.getUserSelectVariantIDs(variantRuleId))
									variantIncompatible = true;
							}

							var mandIcon = UWA.extendElement(document.getElementById('variantRightIcon_' + variantRuleId));
							//var refinedIcon = UWA.extendElement(document.getElementById('variantRefinedIcon_' + variantRuleId));

							that.configModel.getFeatureIdWithStatus(variantRuleId) ? unselectedVariants : variantIncompatible ? unselectedVariants : unselectedVariants++;
							if(rules){
								that.configModel.getFeatureIdWithRulesStatus(variantRuleId) && !variantIncompatible ? rulesVariants++ : rulesVariants;
							}
							that.configModel.getFeatureIdWithChosenStatus(variantRuleId) ? chosenVariant++ : chosenVariant;

							var mandvariant = that.configModel.getFeatureIdWithMandStatus(variantRuleId);
							var includedState = that.configModel.getIncludedState(variantRuleId);
							mandvariant && !variantIncompatible ? mandVariants++ : mandVariants;

							if(mandIcon){
								mandvariant ? mandIcon.addClassName("fonticon-attention") : mandIcon.removeClassName("fonticon-attention");
							}
							/*if(refinedIcon){
								var includedState = that.configModel.getIncludedState(variantRuleId);
								includedState ?  refinedIcon.show() : refinedIcon.hide();
							}*/
							if(that.variantCompList[i] && !variantIncompatible)countVariants++;
					}
				}
				var conflicts = rules ? that.configModel.getNumberOfConflictingFeatures() : 0;
				that.configModel.setVariants(countVariants);
				that.configModel.setNumberOfConflictingFeatures(conflicts);
				that.configModel.setNumberOfMandFeaturesNotValuated(mandVariants);
				that.configModel.setNumberOfFeaturesNotValuated(unselectedVariants);
				that.configModel.setNumberOfFeaturesByRules(rulesVariants);
				that.configModel.setNumberOfFeaturesChosen(chosenVariant);

				that.updateVariantList();
			};

			VariantListPresenter.prototype.updateVariantList = function(){
				this.modelEvents.publish({ event: "updateExclusions", data:{activated:'true'} });

				var currentFilter = this.configModel.getCurrentFilter(),event;
				switch (currentFilter) {
					case ConfiguratorVariables.Filter_AllVariants:
						event = "OnAllVariantFilterIconClick";
						break;
					case ConfiguratorVariables.Filter_Conflicts:
						event = "OnConflictIconClick";
						break;
					case ConfiguratorVariables.Filter_Rules:
							event = "OnRuleNotValidatedIconClick";
							break;
					case ConfiguratorVariables.Filter_Mand:
							if(this._mandatory < this.configModel.getNumberOfMandFeaturesNotValuated())
							event = "onMandVariantIconClick";
							break;
					case ConfiguratorVariables.Filter_Unselected:
							event = "OnUnselectedVariantIconClick";
							break;
					case ConfiguratorVariables.Filter_Chosen:
							event = "onChosenVariantIconClick";
							break;
					default:
				}
				this.modelEvents.publish({ event: event, data:{activated:'updateAddition'} });
			};

			VariantListPresenter.prototype.applyVariantListFilters = function(data){
				this.modelEvents.publish({ event: "OnFilterResult", data:data });
			};

			return VariantListPresenter;
		});


define(
	'DS/ConfiguratorPanel/scripts/Presenters/ConfiguratorPanelPresenter',
	[
		'UWA/Core',
		'UWA/Controls/Abstract',
		'DS/W3DXComponents/Views/Layout/ActionsView',
     	'DS/W3DXComponents/Collections/ActionsCollection',
		'DS/ConfiguratorPanel/scripts/Presenters/ToolbarPresenter',
		'DS/ConfiguratorPanel/scripts/Presenters/VariantClassesPresenter',
		//'DS/Core/ModelEvents',
		//'DS/Windows/ImmersiveFrame',
		//'DS/Windows/Panel',

		'css!DS/UIKIT/UIKIT.css',
		"css!DS/ConfiguratorPanel/scripts/Presenters/ConfiguratorPanelPresenter.css"
	],
	function (UWA, Abstract, ActionsView, ActionsCollection, ToolbarPresenter, VariantClassesPresenter/*, ModelEvents,*/ /*WUXImmersiveFrame, WUXPanel,*/ /*ConfiguratorModel, ConfiguratorSolverFunctions*/) {

		'use strict';

		var ConfiguratorPanelPresenter = Abstract.extend({
				_panelShown: true,
				_modelEvents: null,
				_configModel: null,

				 /**
				 * @description
				 * <blockquote>
				 * <p>Initialiaze the ConfiguratorPanelPresenter component with the required options</p>
				 * <p>This component allows you to create a panel where you can create/edit a configuration.
				 * </p>
				 * </blockquote>
				 *
				 * @memberof module:DS/ConfiguratorPanel/ConfiguratorPanel#
				 *
				 * @param {Object} options - Available options.
				 * @param {Object} options.parentContainer - The parent container where the ConfiguratorPanelPresenter will be injected
				 * @param {Object} options._configModel - The configurator model that will be used
                 * @param {Object} options.modelEvents - ModelEvents that will be used to handle all the events in the component
                 * @param {Object} options.hideSlider - {OPTIONNAL} option to chose if we want the slider to be displayed or not. Values being true/false. By default, the slider is displayed
                 * @param {Object} options.add3DButton - {OPTIONNAL} option to create a "3D" button in the toolbar. Added for Enovia Demo. Should be used in Model Editor integration
				 *
				 */
				 init: function (options) {

				     var that = this;
				     this.hideSlider = (options.hideSlider);
				     this.add3DButton = (options.add3DButton);

					 //Create the modelEvents
					this._modelEvents = options.modelEvents; //new ModelEvents();

					 //Create an instance of the Configurator model
					this._configModel = options.configModel; /*new ConfiguratorModel({
						configuration: options.configuration,
						appRulesParams : options.appRulesParams,
						appFunc : options.appFunc,
						modelEvents : this._modelEvents
					 });*/

					 //initialize a Solver
					 //once the solver is initialized, call the panel creation
					 /*if(options.productId && options.productId!= "")
					 {
					     ConfiguratorSolverFunctions.initSolver(options.productId, this._configModel, this._modelEvents, function(dictionary){
							    console.log("Solver Initialized !!");

							    that._configModel.setDictionary(dictionary);

							    that._initConfiguratorPanel(options);
						     }
					     );
					 }*/

					 this._initConfiguratorPanel(options);


				 },

				 _initConfiguratorPanel : function (options) {
					var that = this;

					//Create the Main div of the Configurator
					var configuratorDiv = UWA.createElement('div');
					configuratorDiv.id = "ConfiguratorPanel";

					var extendedConfigPanelDiv = UWA.extendElement(configuratorDiv);

					//Create the div for the Expand/Collapse icon on the left of Configurator panel
					if (!this.hideSlider) {
					    var expandCollapseDiv = UWA.createElement('div');
					    expandCollapseDiv.id = "expandCollapseConfigPanelDiv";

					    var extendedExpandCollapseDiv = UWA.extendElement(expandCollapseDiv);

					    extendedExpandCollapseDiv.inject(configuratorDiv);


					    //Add Expand/Collapse icon in expandCollapseConfigPanelDiv
					    var actionsList = [{
							    text : "Expand Configuration Panel",
							    icon: that._panelShown ? 'left-open':'right-open',
							    actionId: 'ExpandConfigurationPanel',
							    handler: function(e) {
								    if(!that._panelShown) {
									    configuratorContentDiv.style.left = "0px";
									    that._panelShown = true;
								    }
								    else{
									    configuratorContentDiv.style.left = - configuratorContentDiv.offsetWidth + "px";
									    that._panelShown = false;
								    }

								    e.currentTarget.getElement('span').className = that._panelShown ? 'fonticon fonticon-2x fonticon-left-open':'fonticon fonticon-2x fonticon-right-open';
							    }
					    }];

					    var actionObj = {
					    collection : new ActionsCollection(actionsList),
					    events : {
						    'onActionClick' : function(actionView, event) {
							    var actionFunction = actionView.model.get('handler');

								    if (UWA.is(actionFunction, 'function')) {
									    actionFunction(event);
								    }
							    }
						    }
					    };
					    var actionView = new ActionsView(actionObj);
					    actionView = actionView.render();
					    actionView.container.setStyles({ verticalAlign: 'middle', justifyContent: 'flex-start'});


					    actionView.inject(extendedExpandCollapseDiv);
					}

					//Create the div that will contain the div that contains all the features, toolbar, variants... (Not sure that this comment is clear :D )
					var configuratorContentDivParent = UWA.createElement('div');
					configuratorContentDivParent.id = "configContentDivParent";

					var extendedConfiguratorContentDivParent = UWA.extendElement(configuratorContentDivParent);

					extendedConfiguratorContentDivParent.inject(configuratorDiv);

					//Create the div that contains all the features, toolbar, variants...
					var configuratorContentDiv = UWA.createElement('div');
					configuratorContentDiv.id = "configContentDiv";
					configuratorContentDiv.style.width = "500px";
					//configuratorContentDiv.style.left = "0px";
					//configuratorContentDiv.style.backgroundColor = "yellow";
					//configuratorContentDiv.style.opacity = 0.2;

					var extendedConfiguratorContentDiv = UWA.extendElement(configuratorContentDiv);


					extendedConfiguratorContentDiv.inject(configuratorContentDivParent);

					options.parentContainer.addContent(extendedConfigPanelDiv);


					var dico = options.configModel.getDictionary();
					var featureAttrList = [];
					var displayNameAttr = '';

					if(dico.features && dico.features.length > 0){
					for (var featureAttr in dico.features[0].attributes) {
					    featureAttrList.push(featureAttr);
					    if (dico.features[0].attributes[featureAttr] === dico.features[0].displayName) {
                            displayNameAttr = featureAttr;
					    }
					}

					var configuratorToolbar = new ToolbarPresenter({
						parentContainer : extendedConfiguratorContentDiv,
						modelEvents : that._modelEvents,
						configModel : that._configModel,
						attributesList: featureAttrList,
						defaultAttributeSelected: displayNameAttr,
						add3DButton: (this.add3DButton) ? "yes":"no"
					});


					var variantClassesDiv = UWA.createElement('div');
					variantClassesDiv.id = "variantClassesListDiv";
					//variantClassesDiv.style.maxHeight = "calc(100% - " + configuratorToolbar.getToolbarHeight() + "px)";
					variantClassesDiv.style.height = "calc(100% - " + configuratorToolbar.getToolbarHeight() + "px)";					//configuratorContentDiv.offsetHeight - configuratorToolbar.offsetHeight;
					variantClassesDiv.style.top = "0px";

					var extendedVariantClassesDiv = UWA.extendElement(variantClassesDiv);
					extendedVariantClassesDiv.inject(extendedConfiguratorContentDiv);

					var VCPresenter = new VariantClassesPresenter({
						parentContainer : extendedVariantClassesDiv,
						configModel : that._configModel,
						modelEvents : that._modelEvents,
						ddRenderTo: extendedConfiguratorContentDiv
					});

					that._modelEvents.subscribe({ event: 'OnToolbarHeightChange' }, function (data) {
					    variantClassesDiv.style.height = "calc(100% - " + data.value + "px)";
					});
					}else{
						options.parentContainer.setContent("No configurations features");
						options.parentContainer.addClassName("empty-configuration");
						this._modelEvents.publish({event: 'onEmptyConfigurations', data : dico});
						console.log("Empty dictionary. Event Returned");
					}
				},

				/*releaseSolver: function() {		//release the solver if any
					ConfiguratorSolverFunctions.releaseSolver();
				},*/

				subscribe: function(parameters, callback) {		//returns a token
					return this._modelEvents.subscribe(parameters, callback);
				},

				unsubscribe: function(token) {
					this._modelEvents.unsubscribe(token);
				}

			 });


		return ConfiguratorPanelPresenter;
	});


define(
		'DS/ConfiguratorPanel/scripts/Presenters/ConfigEditorPresenter',
		[
			'DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctionsV2',
			'DS/ResizeSensor/js/ResizeSensor',
			'DS/UIKIT/Mask',
			'DS/UIKIT/Spinner',
			'DS/UIKIT/Scroller',
			'UWA/Core',
			'DS/Handlebars/Handlebars',
			'DS/Core/ModelEvents',
			'DS/UIKIT/Input/Button',
			'DS/UIKIT/Alert',
			'DS/UIKIT/SuperModal',
			'DS/ENOXTriptych/js/ENOXTriptych',
			'DS/DataGridView/DataGridView',
			'DS/Tree/TreeDocument',
			'DS/ConfiguratorPanel/scripts/Models/DictionaryDataUtil',
			'DS/ConfiguratorPanel/scripts/Models/PCDataUtil',
			'DS/ConfiguratorPanel/scripts/Presenters/VariantListPresenter',
      'DS/ConfiguratorPanel/scripts/Presenters/ConfigGridPresenter',
			'DS/ConfiguratorPanel/scripts/Presenters/TopbarPresenter',
			'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
			'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
			'i18n!DS/ConfiguratorPanel/assets/nls/ConfigGridPresenter.json',
			'i18n!DS/ENOXModelListView/assets/nls/ModelListView',
			'text!DS/ConfiguratorPanel/html/ConfigEditorPresenter.html',
			"css!DS/ConfiguratorPanel/css/ConfigEditorPresenter.css",
			'css!DS/UIKIT/UIKIT.css'
			],
			function (ConfiguratorSolverFunctions, ResizeSensor, Mask,Spinner, Scroller, UWA, Handlebars, ModelEvents, Button, Alert, SuperModal, ENOXTriptych, DataGridView, TreeDocument, DictionaryDataUtil, PCDataUtil, VariantListPresenter, ConfigGridPresenter, TopbarPresenter, ConfiguratorVariables, NLS_Configurator, NLS_GridView, NLS, html_ConfigEditorPresenter) {
			'use strict';

			var template = Handlebars.compile(html_ConfigEditorPresenter);

			var ConfigEditorPresenter = function (options) {
				this._init(options);
			};

			ConfigEditorPresenter.prototype._init = function(options){
				var that = this;
				var _options = options ? UWA.clone(options, false) : {};
				var defaults = {modelEvents : new ModelEvents(), add3DButton : "no"};	//Default values if not provided by options
				UWA.merge(_options, defaults);
				UWA.merge(this, _options);
				this.dictionary = this.configModel.getDictionary() || {features : []};
				this.modelEvents.unsubscribeAll({event : "onTopbarHeightChange"});
				this.modelEvents.unsubscribeAll({event : "pc-interaction-started"});
				this.modelEvents.unsubscribeAll({event : "pc-interaction-complete"});
				this.modelEvents.unsubscribeAll({event : "init_configurator"});
				this._currentView = 'classic';
				this._subscribeEvents();
				that._initDivs();
			};

			ConfigEditorPresenter.prototype._subscribeEvents = function () {
				var that = this;
				this.modelEvents.subscribe({event : "onTopbarHeightChange"}, function(modHeight){
					if(modHeight > 0){
						// modHeight = that.allowSave ? modHeight + that._savePCContainer.offsetHeight + 40 : modHeight;
						// that._variantListContainer.style.height = "calc(100% - "+ modHeight + "px)";
            // that._dataGridContainer.style.height = "calc(100% - "+ modHeight + "px)";

						that._viewContainer.style.height = "calc(100% - "+ modHeight + "px)";

					}
				});

				this.modelEvents.subscribe({event:"pc-interaction-started"}, function() {
					Mask.mask(that._container);
					that._maskContainer.style.opacity = 0.5;
				});
				this.modelEvents.subscribe({event:"pc-interaction-complete"}, function() {
					Mask.unmask(that._container);
					that._maskContainer.style.opacity = 1;
					that.modelEvents.publish({event : "pc-changed"});
				});

				this.modelEvents.subscribe({event:"pc-changed"}, function() {
					that.modelEvents.publish({event : 'pc-load-matching-pcs-action'});
				});

				this.modelEvents.subscribe({event: "pc-feature-selection-mode-updated"}, function() {
					that.modelEvents.publish({event : "pc-changed"});
				});


				this.modelEvents.subscribe({event:"pc-reset-first-selection"}, function() {
					that.configModel.setFirstSelectionDirty();
				});

				this.modelEvents.subscribe({event: 'init_configurator'}, function (data) {
					that.defaultData = data || [];
					that.defaultData.updateView = true;
					if(that.dictionary.features.length > 0) {
                        that._initConfigEditor();
                    }
					// if(that.version !== "V5"){
					if(!that.configModel.isAsyncRuleLoad()){
						that.modelEvents.publish({event:'pc-loaded', data : {}});
					}
				});
        //Switch View handler//
        this.modelEvents.subscribe({event : "onTopbarSwitchView"}, function(evtData) {
            if(evtData && evtData.view) {
                if(evtData.view === ConfiguratorVariables.TILE_VIEW) {
										that._currentView = ConfiguratorVariables.TILE_VIEW;
                    that._variantListContainer.removeClassName('config-editor-display-none');
                    that._variantListContainer.addClassName('config-editor-display-block');
                    that._dataGridContainer.addClassName('config-editor-display-none');
										that.modelEvents.publish({event : "solveAndDiagnoseAll_SolverAnswer" , data : {
											refresh : true
										}});
										if(that._matchingPCActivated) {
											that.modelEvents.publish({event: 'triptych-show-panel', data : 'right'});
										}
                } else if(evtData.view === ConfiguratorVariables.GRID_VIEW) {
										that._currentView = ConfiguratorVariables.GRID_VIEW;
                    that._dataGridContainer.removeClassName('config-editor-display-none');
                    that._dataGridContainer.addClassName('config-editor-display-block');
										that._cfgGridPresenter.refresh(true);
                    that._variantListContainer.addClassName('config-editor-display-none');
										if(that._matchingPCActivated) {
											that.modelEvents.publish({event: 'triptych-hide-panel', data : 'right'});
										}
                }
            }
        });

				// events for matching PCs
				this.modelEvents.subscribe({event: 'show-maching-pc-action'}, function (activate) {
					if(activate) {
					 	that._matchingPCActivated = true;
						if(that._currentView === ConfiguratorVariables.GRID_VIEW) {
							that.modelEvents.publish({event: 'triptych-hide-panel', data : 'right'});
						} else {
							that.modelEvents.publish({event: 'triptych-show-panel', data : 'right'});
						}
					} else {
						that._matchingPCActivated = false;
						that.modelEvents.publish({event: 'triptych-hide-panel', data : 'right'});
					}
				});

				this.modelEvents.subscribe({event: 'triptych-resized'}, function (data) {
					that._resize();
					that.configuratorToolbar._resize();
				});

				this.modelEvents.subscribe({event: 'pc-matching-pcs-load-end'}, function () {
					that._loadMatchingPCList();
					that._matchingPClist.elements.statusBar.updateNodeModel('statusLoading', {
						grid: {
							data: NLS_GridView.loadingStatusLabel + ' : 100%',
							semantics: {
								icon: 'check'
							}
						}
					});
					// that._matchingPClist.elements.statusBar.updateNodeModel('statusLoading', { visibleFlag: that._matchingPCActivated});
				});
				this.modelEvents.subscribe({ event: 'pc-matching-pcs-count-update' }, function (count) {
					that._matchingPClist.elements.statusBar.updateNodeModel('totalColumns',{
						grid: {
							data: NLS_GridView.totalPCLabel + ' : ' + count,
						}
					});
				});

				this.modelEvents.subscribe({ event: 'pc-confirm-variant-singleSelect'}, function (options) {
					if(options && options.feature && UWA.is(options.callback,'function')) {
						if ( that.configModel.hasDismissedOptions(options.feature) && ( !UWA.is(options.needConfirm) || options.needConfirm )
						|| that.configModel.hasMultiSelectVariantValues(options.feature) && ( !UWA.is(options.needConfirm) || options.needConfirm ) ) {
							var superModal = new SuperModal({ className : 'confirm-variantSingleSelect-modal', renderTo: document.body});
							superModal.confirm( NLS_Configurator.Text_Confirm_EmptySelection, NLS_Configurator.Title_Confirm_SingleSelect, function (confirmed) {
								confirmed = !UWA.is(confirmed) ? false : confirmed;
								options.callback(confirmed);
							});
						}
						else {
							options.callback(true);
						}
					}
				});

				this.modelEvents.subscribe({ event: 'pc-confirm-variant-multiSelect'}, function (options) {
					if(options && options.feature && UWA.is(options.callback,'function')) {
						if ( that.configModel.hasDismissedOptions(options.feature) && ( !UWA.is(options.needConfirm) || options.needConfirm)) {
							var superModal = new SuperModal({ className : 'confirm-variantMultiSelect-modal', renderTo: document.body});
							superModal.confirm( NLS_Configurator.Text_Confirm_EmptySelection, NLS_Configurator.Title_Confirm_MultiSelect, function (confirmed) {
								confirmed = !UWA.is(confirmed) ? false : confirmed;
								options.callback(confirmed);
							});
						}
						else {
							options.callback(true);
						}
					}
				});

				this.modelEvents.subscribe({ event: 'pc-confirm-variant-dismissSelect'}, function (options) {
					if(options && options.feature && UWA.is(options.callback,'function')) {
						if(that.configModel.hasChosenOptions(options.feature) && ( !UWA.is(options.needConfirm) || options.needConfirm ) ) {
							var superModal = new SuperModal({ className : 'confirm-variantDismissSelect-modal', renderTo: document.body});
							superModal.confirm( NLS_Configurator.Text_Confirm_EmptySelection, NLS_Configurator.Title_Confirm_DismissSelect, function (confirmed) {
								confirmed = !UWA.is(confirmed) ? false : confirmed;
								options.callback(confirmed);
							});
						}else {
							options.callback(true);
						}
					}
				});


			};

			ConfigEditorPresenter.prototype._initDivs = function () {
				var previous = document.querySelector('#config-editor-container');
				if(previous) previous.parentNode.removeChild(previous);
				this._container = document.createElement('div');
				this._container.innerHTML = template();

				this._container = this._container.querySelector('#config-editor-container');
				UWA.extendElement(this._container);
				this._maskContainer = this._container.children[0];
				this._topbarContainer = this._container.querySelector('#config-editor-topbar');

				var _mainContent = UWA.createElement('div', { 'class' : 'config-editor-main-view-content'});
				this._rightContent = UWA.createElement('div', { 'class' : 'config-editor-right-view-content'});
				this._variantListContainer = this._container.querySelector('#config-editor-variant-list-container');
        this._dataGridContainer =  this._container.querySelector('#config-editor-grid-view-container');
        UWA.extendElement(this._variantListContainer);
        this._variantListContainer.addClassName('config-editor-display-block');
        UWA.extendElement(this._dataGridContainer);
        this._dataGridContainer.addClassName('config-editor-display-none');
				_mainContent.addContent(this._variantListContainer);
				_mainContent.addContent(this._dataGridContainer);

				this._viewContainer = this._container.querySelector('#config-editor-view-content');
				var options = {
					left: {
						resizable: false,
						originalSize: 0,
						originalState: 'close',
						overMobile: false,
						withClose: false
					},
					right: {
						resizable: true,
						minWidth: 250,
						originalSize: 450,
						originalState: 'close', // 'open' for open, 'close' for close
						overMobile: true,
						withClose: false
					},
					borderLeft: true,
					container: this._viewContainer,
					withtransition: false,
					modelEvents: this.modelEvents
				};
				var _triptych = new ENOXTriptych();
				_triptych.init(options, null, _mainContent, this._rightContent);

				this._savePCContainer = this._container.querySelector('#config-editor-save-configuration');
				this._cancelPCContainer = this._container.querySelector('#config-editor-cancel-configuration');
				this._notificationContainer = this._container.querySelector('#config-editor-notification-container');
			};

			ConfigEditorPresenter.prototype.inject= function(parentcontainer) {
				var that = this;
				if(parentcontainer)parentcontainer.appendChild(this._container);
				if(this.dictionary.features.length > 0){
					this._variantList = this._variantListContainer.querySelector('#config-editor-variant-list');
					this._extendedVariantList = this._container.querySelector('#config-editor-extended-variant-list');
					this._scrollContainer = this._variantListContainer.querySelector('#config-editor-scroll-container');
					new Scroller({element: this._variantList}).inject(this._scrollContainer);
					this._resize();
					that.configuratorToolbar._resize();
					var rs = new ResizeSensor(this._container, function () {
						that._resize();
						that.configuratorToolbar._resize();
					});
					if(this.version === "V5" && this.configModel.getConfigurationCriteria().length > 0){
						//No need to update the view is configuration criteria is present - as update view would be triggered after solver responds
					}else{
						if(this.version === "V5"){
							that.defaultData.refresh = true;
						}
					that.modelEvents.publish({event:'updateAllFilters', data : that.defaultData});
					}
				}else{
					UWA.extendElement(this._container);
					this._container.setContent(NLS_Configurator.onEmptyConfigurations);
					this._container.addClassName("empty-configuration");
				}
			};

			ConfigEditorPresenter.prototype._resize = function(){
				var components = this.VLPresenter  ? this.VLPresenter.variantCompList : undefined;
				var width = this._extendedVariantList.offsetWidth;
				if(components && components.length > 0){
					for(var i=0;i < components.length; i++){
						components[i]._resize(width);
					}
				}
			}

			ConfigEditorPresenter.prototype._setMultiselection = function(options){
				//set multiselection in case of Unconstrained mode
				//R14: does not need to set Multi Selection Mode on Solver anymore
				if (this.configModel.getAppFunc().multiSelection === ConfiguratorVariables.str_yes || this.configModel.getAppFunc().selectionMode_Refine === ConfiguratorVariables.str_yes) {
					this.modelEvents.publish({event: 'OnMultiSelectionChange',data: {value: true, callsolve : false}});
					this.configModel.setMultiSelectionState("true");
				}
			};

			ConfigEditorPresenter.prototype._initConfigEditor = function(options){
				var that = this;
				var configuratorToolbar = new TopbarPresenter({
					parentContainer : this._topbarContainer,
					modelEvents : this.modelEvents,
					configModel : this.configModel,
					add3DButton: this.add3DButton,
          enableSwitchView : this.enableTableView,
					enableMatchingPC : this.enableTableView,
					version : this.version
				});
				this.configuratorToolbar = configuratorToolbar;

				var dictionary = this.configModel.getDictionary();
				this._dictionaryUtil = new DictionaryDataUtil({ dictionary : dictionary});
	      this._pcDataUtil = new PCDataUtil({ configModel : this.configModel, dictionaryUtil: this._dictionaryUtil, modelEvents: this.modelEvents});

				this.VLPresenter = new VariantListPresenter({
					parentContainer : this._variantListContainer,
					configModel : this.configModel,
					modelEvents : this.modelEvents,
					maskContainer : this.maskContainer,
					version : this.version
				});
        //GridPresenter init//
        if(this.enableTableView) {
						setTimeout(function () {
							Mask.mask(that._dataGridContainer);
							that._cfgGridPresenter = new ConfigGridPresenter();
							that._cfgGridPresenter.init(that.modelEvents, undefined, {id: that.configModel._pcId, configModel: that.configModel, pCDataUtil:  that._pcDataUtil, dictionaryDataUtil : that._dictionaryUtil});
							// this._cfgGridPresenter.loadModelVariabilityInformation(UWA.clone(this.variabilityDictionary));
							that._cfgGridPresenter.loadConfigurationInfo({'id' : that.configModel._pcId });
							that._cfgGridPresenter.inject(that._dataGridContainer);
							Mask.unmask(that._dataGridContainer);
						}, 10);
        }

				if(this.allowSave === "yes"){
					this._saveBtn = new Button({ value: NLS_Configurator.save, className: 'primary' }).inject(this._savePCContainer);
					this._CancelBtn = new Button({ value: NLS_Configurator.cancel}).inject(this._cancelPCContainer);
					this._saveBtn.addEvent('onClick', function () {
						var configurations = that.configModel.getSelectedOptionsJSONModel(true);
						this.setFocus(false);
						that.modelEvents.publish({event: "onSaveClick", data : configurations});
					});
					this._CancelBtn.addEvent('onClick', function () {
						that.modelEvents.publish({event: "onResetClick"});
						this.setFocus(false);
					});
				}else{
					var persistencyContainer = this._container.querySelector('#config-editor-persistency-container');
					if(persistencyContainer){
						persistencyContainer.style.display = "none";
					}
				}

				this._matchingPClist = new DataGridView({
					treeDocument : new TreeDocument(),
					showSelectionCheckBoxesFlag : false,
					showContextualMenuColumnFlag: true,
					columns : [{
							text : NLS_GridView.titleLabel,
							dataIndex : 'tree'
						},
						{
			       text: NLS._action,
			       dataIndex: "ContextualMenuColumn"
				 		}
					]
				});
				this._matchingPClist.inject(this._rightContent);

				var statusBarInfos = [{
          type: 0,
          id: 'totalColumns',
          dataElements: {
            typeRepresentation: 'string',
            value: NLS_GridView.totalPCLabel + ' : ' + 0,
            displayLabel: true
          }
        },{
					type: 0,
					id: 'statusLoading',
					dataElements: {
						position: 'far',
						typeRepresentation: 'string',
						value: NLS_GridView.loadingStatusLabel + ' : 0%',
						displayLabel: true,
						icon: 'clock',
						visibleFlag : true
					}
				}];
				this._matchingPClist.buildStatusBar(statusBarInfos);
				this._matchingPClist.onContextualEvent = function(params) {
          var menu = [];
					if(params.cellInfos && params.cellInfos.rowID > -1) {
						if (params && params.collectionView) {
							var applySelectionsAction = {
								type: 'PushItem',
								title: NLS_GridView.applySelectionAction,
								icon : 'list-ok',
								action: {
									callback: function(e) {
										that._applySelections(e.context);
									},
									context: params.cellInfos
								}
							};
							var openAction = {
								type: 'PushItem',
								title: NLS_GridView.openPCAction,
								icon : 'open',
								action: {
									callback: function(e) {
										that._openPCAction(e.context);
									},
									context: params.cellInfos
								}
							};
							menu.push(applySelectionsAction);
							menu.push(openAction);
						}
					}
          return menu;
        };

			};

			ConfigEditorPresenter.prototype._loadMatchingPCList = function() {
				//load pc list
				var pcList = this._pcDataUtil.getMatchingPCs();
				this._matchingPClist.treeDocument.removeRoots();
				if(pcList.length > 0) {
					var pcNodes = pcList.map(function (pc) {
						return {
							label : pc.title,
							icons : [pc.image],
							grid : pc
						}
					});
					this._matchingPClist.treeDocument.loadModel(pcNodes);
				}
			};

			ConfigEditorPresenter.prototype._applySelections = async function (context) {
				// console.log('apply to selection action');
				var pcId = context.nodeModel.getAttributeValue('id');
				await this._pcDataUtil.applyPCSelections(pcId);
				// this.modelEvents.publish({event : 'pc-criteria-selection-change'});
				//this.modelEvents.publish({event : "solveAndDiagnoseAll_SolverAnswer" , data : {refresh : true}});
				this.callSolver();
			};

			ConfigEditorPresenter.prototype.callSolver = function () {
				if(this.configModel && this.modelEvents) {
					if(this.configModel.getRulesActivation() === ConfiguratorVariables.str_true) {
						this.modelEvents.publish({event:'SolverFct_CallSolveMethodOnSolver', data : {}});
					} else {
						this.updateFilters();
						this.modelEvents.publish({event: 'solveAndDiagnoseAll_SolverAnswer'});
					}
				}
			};

			ConfigEditorPresenter.prototype._openPCAction = function (context) {
				var pcId = context.nodeModel.getAttributeValue('id');
				var pcName = context.nodeModel.getAttributeValue('title');
				var pcVersion = context.nodeModel.getAttributeValue('version');
				this.modelEvents.publish({event : 'pc-open-action', data: {id : pcId, name : pcName, version: pcVersion}});
			};

			ConfigEditorPresenter.prototype.resetProductConfiguration = function(content) {
				this.configModel.setAppRulesParam(content.appRulesParams);
				this.configModel.resetCriteria();
				this.configModel.setConfigurationCriteria(content.configurationCriteria);
				this.configModel.setSelectionMode(content.selectionMode);
				this.configuratorToolbar._findRuleAssistanceLevels();
				this.configuratorToolbar._updateSelectionMode();
				this.modelEvents.publish({event : "solveAndDiagnoseAll_SolverAnswer" , data : {refresh : true}});
				if(this._currentView == ConfiguratorVariables.GRID_VIEW) {
					this._cfgGridPresenter.refresh(true);
				}
			};

			ConfigEditorPresenter.prototype.subscribe = function(parameters, callback){
				return this.modelEvents.subscribe(parameters, callback);
			};

			ConfigEditorPresenter.prototype.unsubscribe = function(token){
				this.modelEvents.unsubscribe(token);
			};


			ConfigEditorPresenter.prototype.destroy = function() {
				if(this._cfgGridPresenter && UWA.is(this._cfgGridPresenter.destroy, 'function')) {
					this._cfgGridPresenter.destroy();
				}
			};


			return ConfigEditorPresenter;
		});


define(
	'DS/ConfiguratorPanel/scripts/Presenters/PCPanel',
	[
		'DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctions',
    'DS/ConfiguratorPanel/scripts/ConfiguratorSolverFunctionsV2',
		'DS/ConfiguratorPanel/scripts/Models/ConfiguratorModel',
    'DS/ConfiguratorPanel/scripts/Presenters/ConfigEditorPresenter',
    'DS/ConfiguratorPanel/scripts/Presenters/ConfiguratorPanelPresenter',
  	'DS/UIKIT/Mask',
		'DS/Handlebars/Handlebars',
		'DS/Core/ModelEvents',
		'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables',
		'DS/ConfiguratorPanel/scripts/Utilities',
		'DS/ConfiguratorPanel/scripts/ServiceUtil',
		'DS/Usage/TrackerAPI',
		'i18n!DS/ConfiguratorPanel/assets/nls/ConfiguratorPanel.json',
		'text!DS/ConfiguratorPanel/html/PCPanel.html',
		'text!DS/ConfiguratorPanel/assets/ParamatersSampleDico.json',
		"css!DS/ConfiguratorPanel/css/PCPanel.css",
		'css!DS/UIKIT/UIKIT.css'
	],
	function (ConfiguratorSolverFunctions,
    ConfiguratorSolverFunctionsV2,
		ConfiguratorModel,
    ConfigEditorPresenter,
    ConfiguratorPanelPresenter,
    Mask,
		Handlebars,
		ModelEvents,
		ConfiguratorVariables,
		Utilities,
		ServiceUtil,
		TrackerAPI,
		NLS_Configurator,
		html_PCPanel,
		sampleDico) {
	'use strict';

	var template = Handlebars.compile(html_PCPanel);

	var PCPanel = function (configurations, dictionary, modelEvents, options) {
		this._init(configurations, dictionary, modelEvents, options);
	};

	PCPanel.prototype._init = function (configurations, dictionary, modelEvents, options) {
		var that = this;
		this._configurations = configurations || [];
		// this._dictionary = JSON.parse(sampleDico); //dictionary || undefined;
		// this._sampleDictionary = JSON.parse(sampleDico); //dictionary || undefined;
		this._dictionary = dictionary ? UWA.clone(dictionary, false) : undefined;
		// this._dictionary.portfolioClasses.member[0].portfolioComponents.member[0].parameters = this._sampleDictionary.portfolioClasses.member[0].portfolioComponents.member[0].parameters;

		var _options = options ? UWA.clone(options, false) : {};
		var defaults = {
			modelEvents: modelEvents || new ModelEvents(),
			add3DButton: "no",
			withTagger: false,
			version: "V4",
			realistic: true,
			rulesActivation : "true",
			ruleLevels: {
				"RulesMode_ProposeOptimizedConfiguration": false,
				"RulesMode_SelectCompleteConfiguration": false,
				"RulesMode_EnforceRequiredOptions": true,
        "RulesMode_DisableIncompatibleOptions" : true,
			},
			tabs: [],
			pCId: "",
			mvId: "",
			initalOptions: {
				initialRuleLevel: '', //'RulesMode_EnforceRequiredOptions'
				initialTab: "all",
				initialMode: "selectionMode_Build"
			},
			tenant: "",
			configCriteria : "{}",
			useDefaultSearch: true,
      'enableTableView' : false,
			enableValidation : false,
			useAsyncRuleLoad : false, // use setRules funtion on pcpanel
			// isWebInWin: false,
			// '3DSpaceUrl' : ''
		};
    	UWA.merge(_options, defaults);
		UWA.merge(this, _options);

		this._applicationId = options.appID || "";

		if(this.version === "V5") {
			this.manageDefaultVersion = "V2";
		} else {
			this.useAsyncRuleLoad = false;
		}
		if(this.manageDefaultVersion == "V2" && this._dictionary) {
				switch (this._dictionary._version) {
					case "1.0":
						this._dictionary._version = "1.1";
						break;
					case "2.0":
						this._dictionary._version = "2.1";
						break;
					case "3.0":
						this._dictionary._version = "3.1";
				}
		}
		// Test if we are in a webinwin app "OnPremise"
		if (this.isWebInWin === true && options.tenant !== "OnPremise") {
			// On Cloud
			// Test window.dscef
			if (window.dscef !== undefined) {
				// Test if the window["COMPASS_CONFIG"] is initialize
				if (window["COMPASS_CONFIG"] === undefined || window['COMPASS_CONFIG'].myAppsBaseUrl === undefined) {
					// Get the base url
					window.dscef.getMyAppsURL().then(function (resolve) {
						// Init the window["COMPASS_CONFIG"] variable
						window["COMPASS_CONFIG"] = {
							myAppsBaseUrl : resolve,
							userId : "all"
						};
						that.modelEvents.subscribe({event: 'configurator-rule-mode-up'}, function () {
							that._trackPCModeEvent();
						});
						that._initDivs();
						if(that.useAsyncRuleLoad){
							that._initSolverDictionary();
						}else{
							that._initSolver();
						}
		            }, function(err) {
		            	console.error(err);
		            });
					return;
				}
			}
		}else {
			// OnPremise
			if (this['3DSpaceUrl']) {
				ConfiguratorSolverFunctionsV2.setServiceUrl(this['3DSpaceUrl']);
			}
		}
		try {
			ServiceUtil.init({
				tenant : options.tenant,
				securityContext : options.securityContext
			});
		} catch (ignore) { }
		/*if(this.isWebInWin == true && this['3DSpaceUrl'] ) {
			ConfiguratorSolverFunctionsV2.setServiceUrl(this['3DSpaceUrl']);
		}else if (this._applicationId !== "ENXMODL_AP"){
			// should be remove when will we pass only on the ConfigRuleService
			// Retrieve the 3DSpace for any other application different than Model Definition
			ConfiguratorSolverFunctionsV2.getUrl3DSpaceService(this.tenant).then(function (resolve) {
				ConfiguratorSolverFunctionsV2.setServiceUrl(resolve);
				that.modelEvents.subscribe({event: 'configurator-rule-mode-up'}, function () {
					that._trackPCModeEvent();
				});
				that._initDivs();
				if(that.useAsyncRuleLoad){
					that._initSolverDictionary();
				}else{
					that._initSolver();
				}
            }, function(err) {
            	console.error(err);
            });
			return;
		}*/

		this.modelEvents.subscribe({event: 'configurator-rule-mode-updated'}, function () {
			that._trackPCModeEvent();
		});

    this._initDivs();
		if(this.useAsyncRuleLoad){
			this._initSolverDictionary();
		}else{
			this._initSolver();
		}
	};

	PCPanel.prototype._initDivs = function () {
		var previous = document.querySelector('#PC-panel-container');
		if (previous)
			previous.parentNode.removeChild(previous);
		this._container = document.createElement('div');
		this._container.innerHTML = template();
		this._container = this._container.querySelector('#PC-panel-container');
	};

	PCPanel.prototype.trackEvent = function (solverNode) {
		// tracker API
		var _DICO_VALUES_SELECTOR = '$..values.member[?(@.idref)]';
		var _DICO_OPTIONS_SELECTOR = '$..options.member[?(@.idref)]';
		var _DICO_RULES_SELECTOR = '$..rules.member[?(@.id)]';
		try {

			var values = UWA.Json.path(this._dictionary, _DICO_VALUES_SELECTOR);
			values = UWA.is(values, 'array') ? values : [];

			var options = UWA.Json.path(this._dictionary, _DICO_OPTIONS_SELECTOR);
			options = UWA.is(options, 'array') ? options : [];

			var rules = UWA.Json.path(this._dictionary, _DICO_RULES_SELECTOR);
			if(this.useAsyncRuleLoad) {
				rules = UWA.Json.path(this.rules, _DICO_RULES_SELECTOR);
			}
			rules = UWA.is(rules, 'array') ? rules : [];

			TrackerAPI.trackPageEvent({
				eventCategory: 'Solver',
				eventAction: 'inilialization',
				eventLabel: 'Solver initialization',
				eventValue: 2.0,
				appID: 'ENXMODL_AP',
				tenant: this.tenant,
				persDim: {
					pd1: this.useAsyncRuleLoad ? 'Product Configuration definition': 'Configuration Filter definition',
					pd2: solverNode,
					pd3: this._applicationId
				},
				persVal: {
					pv1: values.length,
					pv2: options.length,
					pv3: rules.length
				},
				scope: 'Dashboard'
			});
		} catch (e) {
			console.log('Log: Issue in Usage Tracker');
		}
	};

	// tracker API event for PC Mode Change
	PCPanel.prototype._trackPCModeEvent = function () {
		var ruleLevel = this._configModel.getRulesMode();
		var ruleLevelNames = {
			'RulesMode_SelectCompleteConfiguration' : 'Complete',
			'RulesMode_EnforceRequiredOptions' : 'Aided',
			'RulesMode_DisableIncompatibleOptions' : 'Compatible',
			'No rule applied' : 'No Rule'
		};
		TrackerAPI.trackPageEvent({
			eventCategory: 'Solver',
			eventAction: 'PCRuleLevelUpdate',
			eventLabel: 'PC RuleLevel Update',
			eventValue: 2.0,
			appID: 'ENXMODL_AP',
			tenant: this.tenant,
			persDim: {
				pd1: ruleLevelNames[ruleLevel],
				pd2: ruleLevel,
			},
			scope: 'Dashboard'
		});
	};

	PCPanel.prototype.inject = function (parentcontainer) {
		this.parentcontainer = parentcontainer;
    if (parentcontainer)parentcontainer.appendChild(this._container);
    if(this.myConfigEditor) this.myConfigEditor.inject(this._container);
		//Temporary for only LA function : Hide Search in V5
		// if(this.version === "V5"){
		// 	var search = this._container.querySelector("#topbar-search-variants")		;
		// 	if(search) search.hide();
		// }
	};

	PCPanel.prototype.getParent = function () {
		return this.parentcontainer;
	};

	PCPanel.prototype._initSolverDictionary = function (options) {
		var that = this;
		this._configModel = this._getConfigModel();
		this.registerSearch();
		var tempOptions = { version: this.version, dictionary: this._dictionary, tenant: this.tenant, parentContainer: this._container, displayErrorSolverNotification: this.displayErrorSolverNotification};
    this.modelEvents.subscribe({event: 'solver_init_complete'}, function (dataReceived) {
			that.modelEvents.publish({event:'solveAndDiagnoseAll_SolverAnswer', data:	{refresh : true}});
			that.modelEvents.publish({event:'pc-loaded', data : {}});
    });
		this._configModel.setDictionary(this._dictionary);
		that._loadConfigEditor();
		that.modelEvents.publish({event: 'init_configurator', data : {}});
		if(this._configModel.getDictionary()){
			// Add attribut know model definition
			ConfiguratorSolverFunctionsV2.initSolver(this.mvId, this._configModel, this.modelEvents, this.configCriteria, "", tempOptions).then(function(data){
					that.solverKey = data.solverKey;
					if(that._rulesNotSetOnSolver){
						ConfiguratorSolverFunctionsV2.initSolverRules(that.rules);

						// track API
						that.trackEvent(that.solverKey);
					}
			});
		}
	};

	PCPanel.prototype._initSolver = function (options) {
    var that = this;
		this._configModel = this._getConfigModel();
		this.registerSearch();
		var tempOptions = { version: this.version, dictionary: this._dictionary, tenant: this.tenant, parentContainer: this._container};
    this.modelEvents.subscribe({event: 'solver_init_complete'}, function (dataReceived) {
			if(!that.myConfigEditor){
				setTimeout(function(){
					if(that.myConfigEditor){
						clearTimeout() ;
						that.modelEvents.publish({event: 'init_configurator', data : dataReceived});
					}
				},100);
			}else{
				that.modelEvents.publish({event: 'init_configurator', data : dataReceived})
			}
    });

		ConfiguratorSolverFunctionsV2.initSolver(this.mvId, this._configModel, this.modelEvents, this.configCriteria, "", tempOptions).then(
			function (solverData) {
				that._loadConfigEditor();
				// ConfiguratorSolverFunctionsV2.CallSolveMethodOnSolver({firstCall : true})

				// track API
				that.trackEvent(ConfiguratorSolverFunctionsV2.solverKey);
		}).catch(function(){ /*  reject case  */ });
	};

  PCPanel.prototype._loadConfigEditor = function () {
    this.myConfigEditor = new ConfigEditorPresenter({
        // parentContainer: this._container,
        configModel: this._configModel,
        modelEvents: this.modelEvents,
        add3DButton: this.add3DButton || "no",
        allowSave: this.allowSave || 'no',
        variabilityDictionary: this._dictionary || {},
        'enableTableView' : this.enableTableView,
				version : this.version
      });
  };

  PCPanel.prototype.getXMLProductConfigurationDefinition = function(options){
    return this.myConfigEditor.configModel.getXMLExpression(options);
  };

	PCPanel.prototype.getConfigmodel = function(){
    return this.myConfigEditor.configModel;
  };

	PCPanel.prototype.resetProductConfiguration = function(content){
		this._content = UWA.merge(this,content);
		this._configurations = content.configurationCriteria;
		this.initalOptions.initialMode = content.selectionMode;
		this.initalOptions.initialRuleLevel = content.rulesMode;
		this.rulesActivation = content.rulesActivation;

		var tempConfigModel = this._getConfigModel();
		content.appRulesParams = tempConfigModel._appRulesParams;
    this.myConfigEditor.resetProductConfiguration(content);
  };

	PCPanel.prototype.setRules = function (data) {
		if(this.manageDefaultVersion == "V2") {
				switch (data._version) {
					case "1.0":
						data._version = "1.1";
						break;
					case "2.0":
						data._version = "2.1";
						break;
					case "3.0":
						data._version = "3.1";
				}
		}
		this.rules = data;
		this._configModel.setRules(data);
		if(this.solverKey && this.solverKey !== ""){
			ConfiguratorSolverFunctionsV2.initSolverRules(data);
			this._rulesNotSetOnSolver = false;

			// TrackerAPI
			this.trackEvent(this.solverKey);

		}else{
			this._rulesNotSetOnSolver = true;
		}
	};

	PCPanel.prototype._getConfigModel = function () {
		return new ConfiguratorModel({
				configuration: this._configurations,
				pcId: this.pCId,
				appRulesParams: {
					multiSelection: 'false',
					selectionMode: this.initalOptions.initialMode,
					rulesMode: this.initalOptions.initialRuleLevel,
					rulesActivation: this.rulesActivation,
					completenessStatus: this.initalOptions.completenessStatus || 'Unknown',
					rulesCompliancyStatus: this.initalOptions.rulesCompliancyStatus || 'Unknown'
				},
				appFunc: {
					multiSelection: "no" ,
					selectionMode_Build: "yes",
					selectionMode_Refine: this.realistic ? "no" : "yes",
					rulesMode_ProposeOptimizedConfiguration: this.ruleLevels["RulesMode_ProposeOptimizedConfiguration"] ? "yes" : "no",
					rulesMode_SelectCompleteConfiguration: this.ruleLevels["RulesMode_SelectCompleteConfiguration"] ? "yes" : "no",
					rulesMode_EnforceRequiredOptions: this.ruleLevels["RulesMode_EnforceRequiredOptions"] ? "yes" : "no",
					rulesMode_DisableIncompatibleOptions: this.ruleLevels["RulesMode_DisableIncompatibleOptions"] ? "yes" : "no",
				},
				modelEvents: this.modelEvents,
				readOnly: false,
				enableValidation : this.enableValidation,
				manageDefaultVersion :  this.manageDefaultVersion || 'V1',
				useAsyncRuleLoad : this.useAsyncRuleLoad
			});
	};

	PCPanel.prototype.registerSearch = function () {
		var that = this;
		if(that.useDefaultSearch){
			this.modelEvents.subscribe({event: 'OnSearchResult'}, function (data) {
					that.modelEvents.publish({event : "applyDefaultSearch", data : data});
			});
		}
	};

	PCPanel.prototype.destroy = function () {
		if(this.myConfigEditor && UWA.is(this.myConfigEditor.destroy, 'function')) {
			this.myConfigEditor.destroy();
		}
		Utilities.removeAllNotifications();
		ConfiguratorSolverFunctionsV2.releaseSolver();
		ConfiguratorSolverFunctionsV2.solverKey = "";
		delete this._configModel;
		delete this.modelEvents;
	};

	return PCPanel;
});

