define('DS/EPSSchematicsCoreLibrary/time/EPSWaiterBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/time/EPSSchematicsCoreLibraryTimeCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, TimeCategory) {
	'use strict';

	var WaiterBlock = function () {
		Block.call(this);
		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);
		this.createDataPort(new DataPortDefinitions.InputBasic('Delay', 'Double', 1000.0));
	};
	WaiterBlock.prototype = Object.create(Block.prototype);
	WaiterBlock.prototype.constructor = WaiterBlock;
	WaiterBlock.prototype.uid = '4b949047-55ff-45a1-9549-41a09969f97d';
	WaiterBlock.prototype.name = 'Waiter';
	WaiterBlock.prototype.category = TimeCategory;
	WaiterBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSWaiterBlockDoc';

	WaiterBlock.prototype.execute = function (runParams) {
		this.data.startTimes = this.data.startTimes !== undefined ? this.data.startTimes : [];
		if (this.isInputControlPortActivated('In')) {
			this.data.startTimes.push(runParams.currentTime);
		}
		if (this.data.startTimes.length > 0) {
			var delay = this.getInputDataPortValue('Delay');
			if ((runParams.currentTime - this.data.startTimes[0]) >= delay) {
				this.data.startTimes.shift();
				this.activateOutputControlPort('Out');
				return Enums.EExecutionResult.eExecutionFinished;
			}
		}
		return Enums.EExecutionResult.eExecutionPending;
	};

	BlockLibrary.registerBlock(WaiterBlock);

	return WaiterBlock;
});
