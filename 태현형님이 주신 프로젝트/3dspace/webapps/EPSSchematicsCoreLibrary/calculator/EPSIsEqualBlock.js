define('DS/EPSSchematicsCoreLibrary/calculator/EPSIsEqualBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/calculator/EPSSchematicsCoreLibraryCalculatorCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, CalculatorCategory) {
	'use strict';

	var IsEqualBlock = function () {

		Block.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('True'),
			new ControlPortDefinitions.Output('False')
		]);

		var dataPortValue1 = this.createDataPort(new DataPortDefinitions.InputAll('Value1', 'Double', {
			'Boolean': false,
			'Double': 0.0,
			'Integer': 0,
			'String': ''
		}));

		this.createDataPort(new DataPortDefinitions.InputRef('Value2', dataPortValue1, {
			'Boolean': false,
			'Double': 0.0,
			'Integer': 0,
			'String': ''
		}));
	};

	IsEqualBlock.prototype = Object.create(Block.prototype);
	IsEqualBlock.prototype.constructor = IsEqualBlock;

	IsEqualBlock.prototype.uid = 'eeb7840e-75a0-4464-9497-55acfd240af7';
	IsEqualBlock.prototype.name = 'Is Equal';
	IsEqualBlock.prototype.category = CalculatorCategory;
	IsEqualBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSIsEqualBlockDoc';

	var arrayCompare = function (array1, array2) {
		return (array1.length === array2.length) && array1.every(function (element, index) {
			return compare(element, array2[index]);
		});
	};

	var objectCompare = function (obj1, obj2) {
		var result = false;
		if (Object.getPrototypeOf(obj1) !== Object.getPrototypeOf(obj2)) {
			result = false;
		} else if (Object.keys(obj1).length !== Object.keys(obj2).length) {
			result = false;
		} else {
			result = true;
			for (var name in obj1) {
				if (obj1.hasOwnProperty(name) !== obj2.hasOwnProperty(name)) {
					result = false;
					break;
				} else {
					var isEqual = compare(obj1[name], obj2[name]);
					if (!isEqual) {
						result = false;
						break;
					}
				}
			}
		}
		return result;
	};

	var compare = function (value1, value2) {
		var result = false;
		if (value1 === value2) {
			result = true;
		} else if (value1 instanceof Object) {
			if (Array.isArray(value1)) {
				result = arrayCompare(value1, value2);
			} else {
				result = objectCompare(value1, value2);
			}
		}
		return result;
	};

	IsEqualBlock.prototype.execute = function () {
		var value1 = this.getInputDataPortValue('Value1');
		var value2 = this.getInputDataPortValue('Value2');
		var isEqual = compare(value1, value2);
		if (isEqual) {
			this.activateOutputControlPort('True');
		} else {
			this.activateOutputControlPort('False');
		}
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(IsEqualBlock);

	return IsEqualBlock;
});
