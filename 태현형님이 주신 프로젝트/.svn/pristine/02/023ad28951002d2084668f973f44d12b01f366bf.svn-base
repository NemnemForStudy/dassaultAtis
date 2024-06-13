/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsGraphContainerBlock'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsGraphContainerBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsContainedGraphBlock"], function (require, exports, Block, ContainedGraphBlock) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var GraphContainerBlock = /** @class */ (function (_super) {
        __extends(GraphContainerBlock, _super);
        function GraphContainerBlock() {
            return _super.call(this) || this;
        }
        /**
         * Construct graph container block from JSON.
         * @private
         * @param {IJSONGraphContainerBlock} iJSONGraphContainerBlock - The JSON graph container block.
         */
        GraphContainerBlock.prototype.fromJSON = function (iJSONGraphContainerBlock) {
            _super.prototype.fromJSON.call(this, iJSONGraphContainerBlock);
            this.containedGraph.fromJSON(iJSONGraphContainerBlock.containedGraph);
        };
        /**
         * Construct JSON from graph container block.
         * @private
         * @param {IJSONGraphContainerBlock} oJSONGraphContainerBlock - The JSON graph container block.
         */
        GraphContainerBlock.prototype.toJSON = function (oJSONGraphContainerBlock) {
            _super.prototype.toJSON.call(this, oJSONGraphContainerBlock);
            oJSONGraphContainerBlock.containedGraph = {};
            this.containedGraph.toJSON(oJSONGraphContainerBlock.containedGraph);
        };
        /**
         * Get contained graph.
         * @private
         * @return {ContainedGraphBlock} The contained graph block.
         */
        GraphContainerBlock.prototype.getContainedGraph = function () {
            return this.containedGraph;
        };
        /**
         * Set contained graph.
         * @private
         * @param {ContainedGraphBlock} iContainedGraphBlock - The contained graph block.
         * @return {boolean} True if contained graph block has been set, false otherwise.
         */
        GraphContainerBlock.prototype.setContainedGraph = function (iContainedGraphBlock) {
            var result = this.graph === undefined;
            result = result && this.containedGraph === undefined;
            result = result && iContainedGraphBlock instanceof ContainedGraphBlock;
            result = result && iContainedGraphBlock.container === undefined;
            if (result) {
                this.containedGraph = iContainedGraphBlock;
                iContainedGraphBlock.onSet(this);
            }
            return result;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] The name to check.
         * @return {boolean} True if the name is settable, false otherwise.
         */
        GraphContainerBlock.prototype.isNameSettable = function (iName) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            if (arguments.length !== 0) {
                result = result && typeof iName === 'string';
                result = result && (iName === null || iName === void 0 ? void 0 : iName.length) !== 0;
                result = result && iName !== this.name;
            }
            return result;
        };
        /**
         * Set name.
         * @private
         * @param {string} iName - The name to set.
         * @return {boolean} True it the name has been set, false otherwise
         */
        GraphContainerBlock.prototype.setName = function (iName) {
            var result = _super.prototype.setName.call(this, iName);
            if (result && this.containedGraph !== undefined) {
                this.containedGraph.onContainerNameChange();
            }
            return result;
        };
        /**
         * Get objects by type.
         * @private
         * @param {IBlockElementsByType} [ioObjectsByType] - The objects by type.
         * @return {IBlockElementsByType} The objects by type.
         */
        GraphContainerBlock.prototype.getObjectsByType = function (ioObjectsByType) {
            ioObjectsByType = _super.prototype.getObjectsByType.call(this, ioObjectsByType);
            this.containedGraph.getObjectsByType(ioObjectsByType);
            return ioObjectsByType;
        };
        /**
         * Get blocks by uid.
         * @private
         * @param {IBlocksByUid} [ioBlocksByUid] - The blocks by Uid.
         * @return {IBlocksByUid} The blocks by Uid.
         */
        GraphContainerBlock.prototype.getBlocksByUid = function (ioBlocksByUid) {
            ioBlocksByUid = _super.prototype.getBlocksByUid.call(this, ioBlocksByUid);
            this.containedGraph.getBlocksByUid(ioBlocksByUid);
            return ioBlocksByUid;
        };
        return GraphContainerBlock;
    }(Block));
    return GraphContainerBlock;
});
