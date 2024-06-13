/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsInvalidBlock'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsInvalidBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock"], function (require, exports, DynamicBlock) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var InvalidBlock = /** @class */ (function (_super) {
        __extends(InvalidBlock, _super);
        function InvalidBlock() {
            var _this = _super.call(this) || this;
            _this.activateNodeIdSelector();
            _this.json = undefined;
            _this.valid = false;
            return _this;
        }
        /**
         * Construct invalid block from JSON.
         * @private
         * @param {IJSONInvalidBlock} iJSONInvalidBlock - The JSON invalid block.
         */
        InvalidBlock.prototype.fromJSON = function (iJSONInvalidBlock) {
            this.json = undefined;
            this.uid = iJSONInvalidBlock.definition.uid;
            _super.prototype.fromJSON.call(this, iJSONInvalidBlock);
            this.json = JSON.stringify(iJSONInvalidBlock);
        };
        /**
         * Construct JSON from invalid block.
         * @private
         * @param {IJSONInvalidBlock} oJSONInvalidBlock - The JSON invalid block.
         */
        InvalidBlock.prototype.toJSON = function (oJSONInvalidBlock) {
            var jsonObject = JSON.parse(this.json);
            var keys = Object.keys(jsonObject);
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                oJSONInvalidBlock[key] = jsonObject[key];
            }
        };
        /**
         * Compute validity.
         * @private
         * @return {boolean} The block validity.
         */
        // eslint-disable-next-line class-methods-use-this
        InvalidBlock.prototype.computeValidity = function () {
            return false;
        };
        /**
         * Has definition.
         * @private
         * @return {boolean} True if the block has definition, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        InvalidBlock.prototype.hasDefinition = function () {
            return true;
        };
        /**
         * Get definition.
         * @private
         * @return {Block} The block definition.
         */
        InvalidBlock.prototype.getDefinition = function () {
            var definition = this;
            if (this.json === undefined) {
                definition = new DynamicBlock();
            }
            return definition;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] - The name to check.
         * @return {boolean} True if the name is settable, false otherwise.
         */
        InvalidBlock.prototype.isNameSettable = function (iName) {
            var result = this.json === undefined;
            result = result && !this.isFromTemplate();
            if (arguments.length !== 0) {
                result = result && typeof iName === 'string';
                result = result && iName.length !== 0;
                result = result && iName !== this.name;
            }
            return result;
        };
        /**
         * Is data port type addable.
         * @private
         * @param {EP.EDataPortType} iType - The data port type.
         * @return {boolean} True if the data port type is addable, false otherwise.
         */
        InvalidBlock.prototype.isDataPortTypeAddable = function (iType) {
            var result = this.json === undefined;
            result = result && _super.prototype.isDataPortTypeAddable.call(this, iType);
            return result;
        };
        /**
         * Is control port type addable.
         * @private
         * @param {EP.EControlPortType} iType - The control port type.
         * @return {boolean} True if the control port type is addable, false otherwise.
         */
        InvalidBlock.prototype.isControlPortTypeAddable = function (iType) {
            var result = this.json === undefined;
            result = result && _super.prototype.isControlPortTypeAddable.call(this, iType);
            return result;
        };
        /**
         * Is setting type addable.
         * @private
         * @return {boolean} True if the setting type is addable, false otherwise.
         */
        InvalidBlock.prototype.isSettingTypeAddable = function () {
            var result = this.json === undefined;
            result = result && !this.isFromTemplate();
            return result;
        };
        /**
         * Is nodeId selector settable.
         * @private
         * @param {string} [iNodeIdSelector] - The nodeId selector.
         * @return {boolean} True if the nodeId selector is settable, false otherwise.
         */
        InvalidBlock.prototype.isNodeIdSelectorSettable = function (iNodeIdSelector) {
            var result = this.json === undefined;
            result = result && _super.prototype.isNodeIdSelectorSettable.call(this, iNodeIdSelector);
            return result;
        };
        return InvalidBlock;
    }(DynamicBlock));
    return InvalidBlock;
});
