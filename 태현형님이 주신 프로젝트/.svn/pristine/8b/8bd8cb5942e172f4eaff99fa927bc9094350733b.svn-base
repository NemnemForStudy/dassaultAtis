/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIConnector", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIPersistentLabel", "DS/EPSSchematicsUI/edges/EPSSchematicsUILink", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType"], function (require, exports, UIConnector, UIPersistentLabel, UILink, UICommand, UICommandType) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI port.
     * @class UIPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIPort
     * @extends UIConnector
     * @abstract
     * @private
     */
    var UIPort = /** @class */ (function (_super) {
        __extends(UIPort, _super);
        /**
         * @constructor
         * @param {UIBlock|UIGraph|UIGraphDataDrawer|UIShortcut} parent - The parent that owns this UI port.
         * @param {DataPort|ControlPort} model - The data or control port model.
         */
        function UIPort(parent, model) {
            var _this = _super.call(this) || this;
            _this._parent = parent;
            _this._model = model;
            return _this;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the port.
         * @public
         */
        UIPort.prototype.remove = function () {
            var controller = this.getParentGraph().getViewer().getContextualBarController();
            if (controller) {
                controller.clearCommands();
            }
            this.removeLinks();
            this.removePersistentLabel();
            this._parent = undefined;
            this._model = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the view of the of the port.
         * @public
         * @returns {UIPortView} The view of the port.
         */
        UIPort.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the list of UI links connected to that port.
         * @public
         * @returns {Array<UILink>} The list of UI links connected to that port.
         */
        UIPort.prototype.getLinks = function () {
            var _a, _b;
            var links = [];
            for (var element = this._display.children.first; element; element = element.next) {
                if (((_b = (_a = element === null || element === void 0 ? void 0 : element.ref) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.uiElement) instanceof UILink) {
                    links.push(element.ref.data.uiElement);
                }
            }
            return links;
        };
        /**
         * Removes the links connected to that port.
         * @public
         */
        UIPort.prototype.removeLinks = function () {
            var links = this.getLinks();
            var graph = this.getParentGraph();
            links.forEach(function (link) { return graph.removeLink(link); });
        };
        /**
         * Gets the parent of the port.
         * @public
         * @returns {UIBlock|UIGraph|UIGraphDataDrawer|UIShortcut} The parent of the port.
         */
        UIPort.prototype.getParent = function () {
            return this._parent;
        };
        /**
         * Gets the UI editor.
         * @public
         * @returns {UIEditor} The UI editor.
         */
        UIPort.prototype.getEditor = function () {
            return this.getParentGraph().getEditor();
        };
        /**
         * Gets the port model.
         * @public
         * @returns {DataPort|ControlPort} The port model.
         */
        UIPort.prototype.getModel = function () {
            return this._model;
        };
        /**
         * Gets the name of the port.
         * @public
         * @returns {string} The name of the port.
         */
        UIPort.prototype.getName = function () {
            return this._model.getName();
        };
        /**
         * Highlights the port.
         * @public
         */
        UIPort.prototype.highlight = function () {
            this.getView().highlight();
        };
        /**
         * Unhghlights the port.
         * @public
         */
        UIPort.prototype.unhighlight = function () {
            this.getView().unhighlight();
        };
        /**
         * Checks if the port is editable.
         * @public
         * @returns {boolean} True if the port is editable else false.
         */
        UIPort.prototype.isEditable = function () {
            return this._model.isNameSettable();
        };
        /**
         * Checks if the port is selected.
         * @public
         * @returns {boolean} True is the port is selected else false.
         */
        UIPort.prototype.isSelected = function () {
            return this.getParentGraph().getViewer().isSelected(this._display);
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {Array<UICommand>} The list of available commands.
         */
        UIPort.prototype.getCommands = function () {
            var commands = [];
            if (this.isEditable()) {
                commands.push(new UICommand(UICommandType.eEdit, this.openDialog.bind(this)));
            }
            return commands;
        };
        /**
         * Loads the port from the provided JSON port model.
         * @public
         * @abstract
         * @param {IJSONPortUI} iJSONPort - The JSON port model.
         */
        UIPort.prototype.fromJSON = function (iJSONPort) {
            if (iJSONPort === null || iJSONPort === void 0 ? void 0 : iJSONPort.label) {
                this.createPersistentLabel();
                this._persistentLabel.fromJSON(iJSONPort.label);
            }
        };
        /**
         * Saves the port to the provided JSON port model.
         * @public
         * @abstract
         * @param {IJSONPortUI} oJSONPort - The JSON port model.
         */
        UIPort.prototype.toJSON = function (oJSONPort) {
            if (this._persistentLabel) {
                var oJSONLabel = {};
                this._persistentLabel.toJSON(oJSONLabel);
                oJSONPort.label = oJSONLabel;
            }
        };
        /**
         * Creates the port persistent label.
         * @public
         * @returns {UIPersistentLabel} The persistent label.
         */
        UIPort.prototype.createPersistentLabel = function () {
            if (!this._persistentLabel) {
                this._persistentLabel = new UIPersistentLabel(this);
                this.getEditor().getViewerController().getCurrentViewer().getLabelController().clearAllLabels();
            }
            return this._persistentLabel;
        };
        /**
         * Removes the port persistent label.
         * @public
         */
        UIPort.prototype.removePersistentLabel = function () {
            if (this._persistentLabel) {
                this._persistentLabel.remove();
                this._persistentLabel = undefined;
            }
        };
        /**
         * Gets the port persistent label.
         * @public
         * @returns {UIPersistentLabel} The port persistent label.
         */
        UIPort.prototype.getPersistentLabel = function () {
            return this._persistentLabel;
        };
        return UIPort;
    }(UIConnector));
    return UIPort;
});
