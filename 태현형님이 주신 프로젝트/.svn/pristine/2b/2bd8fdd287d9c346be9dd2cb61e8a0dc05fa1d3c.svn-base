/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestDataPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestDataPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphDataPort", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphTestDataPortView", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestSubDataPort", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIInputTestDialog", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIOutputTestDialog", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, UIGraphDataPort, UIGraphTestDataPortView, UIGraphTestSubDataPort, UICommand, UICommandType, UIInputTestDialog, UIOutputTestDialog, ModelEnums, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph test data port.
     * @class UIGraphTestDataPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestDataPort
     * @extends UIGraphDataPort
     * @private
     */
    var UIGraphTestDataPort = /** @class */ (function (_super) {
        __extends(UIGraphTestDataPort, _super);
        /**
         * @constructor
         * @param {UIGraphDataTestDrawer} parent - The UI graph input test drawer.
         * @param {DataPort} model - The data port model.
         */
        function UIGraphTestDataPort(parent, model) {
            var _this = _super.call(this, parent, model, false) || this;
            _this._setBorderConstraint({
                attach: _this.isStartPort() ? EGraphCore.BorderCstr.TOP : EGraphCore.BorderCstr.BOTTOM
            });
            var editor = _this.getEditor();
            _this._testDataPortDialog = _this.isStartPort() ? new UIInputTestDialog(editor) : new UIOutputTestDialog(editor);
            return _this;
        }
        /**
         * Removes the port.
         * @public
         */
        UIGraphTestDataPort.prototype.remove = function () {
            if (this._testDataPortDialog !== undefined) {
                this._testDataPortDialog.remove();
            }
            this._testDataPortDialog = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the view of the of.
         * @public
         * @returns {UIGraphTestDataPortView} The view of the port.
         */
        UIGraphTestDataPort.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Checks if the data port is a start port.
         * @public
         * @returns {boolean} True if the data port is a start port else false.
         */
        UIGraphTestDataPort.prototype.isStartPort = function () {
            var portType = this._model.getType();
            return portType === ModelEnums.EDataPortType.eInput;
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {Array<UICommand>} The list of available commands.
         */
        UIGraphTestDataPort.prototype.getCommands = function () {
            var commands = [];
            commands.push(new UICommand(UICommandType.eEdit, this._testDataPortDialog.open.bind(this._testDataPortDialog)));
            return commands;
        };
        /**
         * The callback on the connector double click event.
         * @public
         */
        UIGraphTestDataPort.prototype.onConnectorDoubleClick = function () {
            this._testDataPortDialog.open();
        };
        /**
         * Creates the UI sub data port.
         * @public
         * @override
         * @param {UIGraphDataTestDrawer} parent - The parent UI graph test data drawer.
         * @param {number} index - The index of the sub data port.
         * @param {DataPort} subDataPortModel - The sub data port model.
         * @returns {UIGraphTestSubDataPort} The creates UI sub data port.
         */
        UIGraphTestDataPort.prototype.createUISubDataPort = function (parent, index, subDataPortModel) {
            var subDataPortUI = new UIGraphTestSubDataPort(this, parent, subDataPortModel);
            this._addSubDataPort(subDataPortUI, index);
            if (!this.isVisible()) {
                subDataPortUI.setVisibility(false);
            }
            this.updateWidth();
            return subDataPortUI;
        };
        /**
         * Creates the view of the connector.
         * @protected
         * @returns {UIGraphTestDataPortView} The view of the connector.
         */
        UIGraphTestDataPort.prototype._createView = function () {
            return new UIGraphTestDataPortView(this);
        };
        return UIGraphTestDataPort;
    }(UIGraphDataPort));
    return UIGraphTestDataPort;
});
