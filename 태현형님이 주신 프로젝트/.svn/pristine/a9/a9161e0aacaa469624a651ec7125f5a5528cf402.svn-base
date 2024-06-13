define('DS/EPSSchematicsCoreLibrary/flow/EPSWaitAllBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsTools',
    'DS/EPSSchematicsCoreLibrary/flow/EPSSchematicsCoreLibraryFlowCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, SettingDefinitions, Tools, FlowCategory) {
	'use strict';

	var WaitAllBlock = function () {
		DynamicBlock.call(this);
		this.createControlPorts([
			new ControlPortDefinitions.Input('In1'),
			new ControlPortDefinitions.Input('In2'),
			new ControlPortDefinitions.Output('Out')
		]);
		this.createSetting(new SettingDefinitions.Basic('Same Frame', 'Boolean', false));
		this.setDataPortInputRules({ dynamicCount: 0 });
		this.setDataPortOutputRules({ dynamicCount: 0 });
		this.setDataPortLocalRules({ dynamicCount: 0 });
		this.setControlPortInputRules({ name: { prefix: 'In', readonly: true } });
		this.setControlPortOutputRules({ dynamicCount: 0 });
		this.setEventPortInputRules({ dynamicCount: 0 });
		this.setEventPortOutputRules({ dynamicCount: 0 });
		this.setSettingRules({ dynamicCount: 0 });
	};

	WaitAllBlock.prototype = Object.create(DynamicBlock.prototype);
	WaitAllBlock.prototype.constructor = WaitAllBlock;
	WaitAllBlock.prototype.uid = Tools.WaitAllBlockUid;
	WaitAllBlock.prototype.name = 'Wait All';
	WaitAllBlock.prototype.category = FlowCategory;
	WaitAllBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSWaitAllBlockDoc';

	var resetInputStates = function () {
		this.data.inputStates = [];
	    var inputControlPortNames = this.getInputControlPortNameList();
	    for (var i = 0; i < inputControlPortNames.length; i++) {
	        this.data.inputStates.push(false);
		}
	};

	var areAllInputsActivated = function () {
		for (var i = 0; i < this.data.inputStates.length; i++) {
			if (this.data.inputStates[i] === false) {
				return false;
			}
		}
		return true;
	};

	var activateInputs = function () {
	    var inputControlPortNames = this.getInputControlPortNameList();
	    for (var i = 0; i < inputControlPortNames.length; i++) {
	        if (this.isInputControlPortActivated(inputControlPortNames[i])) {
	            this.data.inputStates[i] = true;
	        }
	    }
	};

	WaitAllBlock.prototype.execute = function (runParams) {
		var sameFrame = this.getSettingValue('Same Frame');
		if ((sameFrame === true && this.data.time !== runParams.currentTime) || this.data.time === undefined) {
			this.data.time = runParams.currentTime;
			resetInputStates.call(this);
		}
		activateInputs.call(this);
		if (areAllInputsActivated.call(this)) {
			this.data.time = undefined;
		    this.activateOutputControlPort('Out');
		}
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(WaitAllBlock);

	return WaitAllBlock;
});
