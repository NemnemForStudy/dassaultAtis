/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIDataPort", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType"], function (require, exports, UIDataPort, UICommand, UICommandType) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI sub data port.
     * @class UISubDataPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort
     * @extends UIDataPort
     * @abstract
     * @private
     */
    var UISubDataPort = /** @class */ (function (_super) {
        __extends(UISubDataPort, _super);
        /**
         * @constructor
         * @param {UIDataPort} parentPort - The parent UI data port that owns this sub data port.
         * @param {UIBlock|UIGraphDataDrawer} parent - The parent of this sub data port.
         * @param {DataPort} model - The data port model.
         */
        function UISubDataPort(parentPort, parent, model) {
            var _this = _super.call(this, parent, model) || this;
            _this._parentPort = parentPort;
            return _this;
        }
        /**
         * Removes the port.
         * @public
         */
        UISubDataPort.prototype.remove = function () {
            this._parentPort = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the view of the of.
         * @public
         * @returns {UISubDataPortView} The view of the port.
         */
        UISubDataPort.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the parent graph of the port.
         * @public
         * @returns {UIGraph} The parent graph of the port.
         */
        UISubDataPort.prototype.getParentGraph = function () {
            return this._parent.getGraph();
        };
        /**
         * Gets the parent port of the sub data port.
         * @public
         * @returns {UIDataPort} the parent port of the sub data port.
         */
        UISubDataPort.prototype.getParentPort = function () {
            return this._parentPort;
        };
        /**
         * Gets the name of the sub data port.
         * @public
         * @returns {string} The name of the sub data port.
         */
        UISubDataPort.prototype.getName = function () {
            return this._model.dataPort.getName() + '.' + this._model.getName();
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {Array<UICommand>} The list of available commands.
         */
        UISubDataPort.prototype.getCommands = function () {
            var commands = _super.prototype.getCommands.call(this);
            if (this._model.dataPort.isDataPortRemovable(this._model)) {
                commands.push(new UICommand(UICommandType.eHideProperty, this._onRemoveSubDataPort.bind(this)));
            }
            return commands;
        };
        /**
         * Sets the data port exposed state.
         * @public
         * @param {boolean} exposedState - True to expose the data port, false to unexpose it.
         */
        UISubDataPort.prototype.setExposedState = function (exposedState) {
            _super.prototype.setExposedState.call(this, exposedState);
            if (this._parentPort.isVisible()) {
                this.setVisibility(exposedState);
            }
        };
        return UISubDataPort;
    }(UIDataPort));
    return UISubDataPort;
});
