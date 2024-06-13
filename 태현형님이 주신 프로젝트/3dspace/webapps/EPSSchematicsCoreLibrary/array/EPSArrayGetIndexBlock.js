/// <amd-module name='DS/EPSSchematicsCoreLibrary/array/EPSArrayGetIndexBlock'/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("DS/EPSSchematicsCoreLibrary/array/EPSArrayGetIndexBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions", "DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory"], function (require, exports, Block, BlockLibrary, Enums, ControlPortDefinitions, DataPortDefinitions, ArrayCategory) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var ArrayGetIndexBlock = /** @class */ (function (_super) {
        __extends(ArrayGetIndexBlock, _super);
        function ArrayGetIndexBlock() {
            var _this = _super.call(this) || this;
            _this.createControlPorts([
                new ControlPortDefinitions.Input('In'),
                new ControlPortDefinitions.Output('Found'),
                new ControlPortDefinitions.Output('Not Found')
            ]);
            var dataPortArray = _this.createDataPort(new DataPortDefinitions.InputCategory('Array', Enums.FTypeCategory.fArray, 'Array<Double>'));
            _this.createDataPorts([
                new DataPortDefinitions.InputRefArrayValue('Value', dataPortArray),
                new DataPortDefinitions.OutputCategory('Index', Enums.FTypeCategory.fNumerical, 'Integer')
            ]);
            return _this;
        }
        ArrayGetIndexBlock.prototype.execute = function () {
            var array = this.getInputDataPortValue('Array');
            if (array === undefined) {
                throw new Error('The data port Array is undefined!');
            }
            var value = this.getInputDataPortValue('Value');
            if (value === undefined) {
                throw new Error('The data port Value is undefined!');
            }
            var index = array.indexOf(value);
            if (index !== -1) {
                this.setOutputDataPortValue('Index', index);
                this.activateOutputControlPort('Found');
            }
            else {
                this.setOutputDataPortValue('Index', undefined);
                this.activateOutputControlPort('Not Found');
            }
            return Enums.EExecutionResult.eExecutionFinished;
        };
        return ArrayGetIndexBlock;
    }(Block));
    ArrayGetIndexBlock.prototype.uid = 'd65b326f-ae0b-447f-9134-84e9cf67910c';
    ArrayGetIndexBlock.prototype.name = 'Array Get Index';
    ArrayGetIndexBlock.prototype.category = ArrayCategory;
    ArrayGetIndexBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayGetIndexBlockDoc';
    BlockLibrary.registerBlock(ArrayGetIndexBlock);
    return ArrayGetIndexBlock;
});
