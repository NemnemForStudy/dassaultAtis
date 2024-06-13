define('DS/EPSSchematicsCoreLibrary/loop/EPSDelayerBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/loop/EPSSchematicsCoreLibraryLoopCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, LoopCategory) {
	'use strict';

	var DelayerBlock = function () {
		Block.call(this);
		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Input('Loop In'),
			new ControlPortDefinitions.Output('Out'),
			new ControlPortDefinitions.Output('Loop Out')
		]);
		this.createDataPort(new DataPortDefinitions.InputBasic('Delay', 'Double', 1000.0));
	};
	DelayerBlock.prototype = Object.create(Block.prototype);
	DelayerBlock.prototype.constructor = DelayerBlock;
	DelayerBlock.prototype.uid = 'e8e7b057-0696-4350-b8c0-f9d2548896ff';
	DelayerBlock.prototype.name = 'Delayer';
	DelayerBlock.prototype.category = LoopCategory;
	DelayerBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSDelayerBlockDoc';

	DelayerBlock.prototype.execute = function (runParams) {
		this.data.startTimes = this.data.startTimes !== undefined ? this.data.startTimes : [];
		if (this.isInputControlPortActivated('In')) {
			this.data.startTimes.push(runParams.currentTime);
		}
		if (this.data.startTimes.length > 0) {
			var delay = this.getInputDataPortValue('Delay');
			if ((runParams.currentTime - this.data.startTimes[0]) >= delay) {
				this.data.startTimes.shift();
				this.activateOutputControlPort('Out');
			} else {
				this.activateOutputControlPort('Loop Out');
			}
		}
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(DelayerBlock);

	return DelayerBlock;
});
