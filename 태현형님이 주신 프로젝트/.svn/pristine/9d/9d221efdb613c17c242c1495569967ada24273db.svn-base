define('DS/EPSSchematicsCoreLibrary/flow/EPSSyncFlowsBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/flow/EPSSchematicsCoreLibraryFlowCategory'
], function (DynamicBlock, BlockLibrary, ControlPortDefinitions, FlowCategory) {
	'use strict';

	var SyncFlowsBlock = function () {
		DynamicBlock.call(this);
		this.createControlPorts([
			new ControlPortDefinitions.Input('In1'),
			new ControlPortDefinitions.Input('In2'),
			new ControlPortDefinitions.Output('Out')
		]);
		this.setDataPortInputRules({ dynamicCount: 0 });
		this.setDataPortOutputRules({ dynamicCount: 0 });
		this.setDataPortLocalRules({ dynamicCount: 0 });
		this.setControlPortInputRules({ name: { prefix: 'In', readonly: true } });
		this.setControlPortOutputRules({ dynamicCount: 0 });
		this.setEventPortInputRules({ dynamicCount: 0 });
		this.setEventPortOutputRules({ dynamicCount: 0 });
		this.setSettingRules({ dynamicCount: 0 });
	};

	SyncFlowsBlock.prototype = Object.create(DynamicBlock.prototype);
	SyncFlowsBlock.prototype.constructor = SyncFlowsBlock;
	SyncFlowsBlock.prototype.uid = '14cbf758-aca1-4021-90fe-c241f65db354';
	SyncFlowsBlock.prototype.name = 'Sync Flows';
	SyncFlowsBlock.prototype.category = FlowCategory;
	SyncFlowsBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSSyncFlowsBlockDoc';

	BlockLibrary.registerBlock(SyncFlowsBlock);

	return SyncFlowsBlock;
});
