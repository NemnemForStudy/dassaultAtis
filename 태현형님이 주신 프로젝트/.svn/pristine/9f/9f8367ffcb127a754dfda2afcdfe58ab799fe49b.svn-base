define('DS/EPSSchematicsCoreLibrary/flow/EPSJoinAllBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsTools',
    'DS/EPSSchematicsCoreLibrary/flow/EPSSchematicsCoreLibraryFlowCategory'
], function (Block, BlockLibrary, ControlPortDefinitions, Tools, FlowCategory) {
	'use strict';

	var JoinAllBlock = function () {
		Block.call(this);
		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);
	};

	JoinAllBlock.prototype = Object.create(Block.prototype);
	JoinAllBlock.prototype.constructor = JoinAllBlock;
	JoinAllBlock.prototype.uid = Tools.JoinAllBlockUid;
	JoinAllBlock.prototype.name = 'Join All';
	JoinAllBlock.prototype.category = FlowCategory;
	JoinAllBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSJoinAllBlockDoc';

	BlockLibrary.registerBlock(JoinAllBlock);

	return JoinAllBlock;
});
