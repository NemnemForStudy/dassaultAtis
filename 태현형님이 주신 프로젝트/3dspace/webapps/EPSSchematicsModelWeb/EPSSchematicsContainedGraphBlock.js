/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsContainedGraphBlock'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsContainedGraphBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsTools"], function (require, exports, GraphBlock, Block, Events, Tools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var ContainedGraphBlock = /** @class */ (function (_super) {
        __extends(ContainedGraphBlock, _super);
        function ContainedGraphBlock() {
            return _super.call(this) || this;
        }
        /**
         * Clone contained graph block but keep outside ref: container.
         * @private
         * @return {ContainedGraphBlock} The cloned contained graph block.
         */
        ContainedGraphBlock.prototype.clone = function () {
            var clone;
            var jsonBlock = {};
            this.toJSON(jsonBlock);
            var BlockCtor = this.constructor;
            clone = new BlockCtor();
            clone.cloneRef = this;
            clone.onSet(this.container);
            clone.fromJSON(jsonBlock);
            return clone;
        };
        /**
         * On set.
         * @private
         * @param {GraphContainerBlock} iContainer - The graph container block.
         */
        ContainedGraphBlock.prototype.onSet = function (iContainer) {
            this.container = iContainer;
        };
        /**
         * Get graph context.
         * @private
         * @return {GraphBlock} The graph context.
         */
        ContainedGraphBlock.prototype.getGraphContext = function () {
            var graphContext = this.graphContext;
            if (this.container !== undefined) {
                graphContext = this.container.getGraphContext();
            }
            return graphContext;
        };
        /**
         * Has definition.
         * @private
         * @return {boolean} True if the block has definition, false otherwise.
         */
        ContainedGraphBlock.prototype.hasDefinition = function () {
            var result = this.container !== undefined;
            result = result && this.container.hasDefinition();
            return result;
        };
        /**
         * Get definition.
         * @private
         * @return {ContainedGraphBlock} The definition.
         */
        ContainedGraphBlock.prototype.getDefinition = function () {
            var definition;
            if (this.hasDefinition()) {
                definition = this.container.getDefinition().getContainedGraph();
            }
            return definition;
        };
        /**
         * To path.
         * @private
         * @param {GraphBlock} iGraph - The graph block.
         * @return {string} The block path.
         */
        ContainedGraphBlock.prototype.toPath = function (iGraph) {
            var ref = this.cloneRef || this;
            var path = Tools.rootPath;
            if (this !== iGraph && ref !== iGraph && ref.container !== undefined) {
                path = ref.container.toPath(iGraph) + '.containedGraph';
            }
            return path;
        };
        /**
         * Is from template.
         * @private
         * @return {boolean} True if from template, false otherwise.
         */
        ContainedGraphBlock.prototype.isFromTemplate = function () {
            var result = this.hasDefinition();
            result = result && this.container !== undefined;
            result = result && (this.container.isTemplate() || this.container.isFromTemplate());
            return result;
        };
        /**
         * Is contained graph.
         * @private
         * @return {boolean} True if is contained graph, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        ContainedGraphBlock.prototype.isContainedGraph = function () {
            return true;
        };
        /**
         * Is from contained graph.
         * @private
         * @return {boolean} True if is from contained graph, false otherwise.
         */
        ContainedGraphBlock.prototype.isFromContainedGraph = function () {
            var result = this.container !== undefined;
            result = result && (this.container.isContainedGraph() || this.container.isFromContainedGraph());
            return result;
        };
        /**
         * Get name.
         * @protected
         * @return {string} The name of the contained graph block.
         */
        ContainedGraphBlock.prototype.getName = function () {
            var name = this.name;
            if (this.container !== undefined) {
                name = this.container.getName();
            }
            return name;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] The name to check.
         * @return {boolean} True if name is settable, false otherwise.
         */
        ContainedGraphBlock.prototype.isNameSettable = function ( /*iName*/) {
            var result = this.container !== undefined;
            result = result && this.container.isNameSettable.apply(this.container, arguments);
            return result;
        };
        /**
         * Set name.
         * @private
         * @param {string} iName - The name to set.
         * @return {boolean} True if the name was set, false otherwise.
         */
        ContainedGraphBlock.prototype.setName = function (iName) {
            var result = this.container !== undefined;
            result = result && this.container.setName(iName);
            return result;
        };
        /**
         * On container name change.
         * @private
         */
        ContainedGraphBlock.prototype.onContainerNameChange = function () {
            var event = new Events.BlockNameChangeEvent();
            event.block = this;
            event.index = this.getIndex();
            event.name = this.getName();
            this.dispatchEvent(event);
        };
        /**
         * Handle step into.
         * @private
         * @return {boolean} True if the block handles step into, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        ContainedGraphBlock.prototype.handleStepInto = function () {
            return false;
        };
        return ContainedGraphBlock;
    }(GraphBlock));
    ContainedGraphBlock.prototype.isDescriptionSettable = Block.prototype.isDescriptionSettable;
    return ContainedGraphBlock;
});
