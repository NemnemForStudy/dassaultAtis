/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIDataPort", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIShortcutDataPortView", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, UIDataPort, UIShortcutDataPortView, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI shortcut data port.
     * @class UIShortcutDataPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort
     * @extends UIDataPort
     * @private
     */
    var UIShortcutDataPort = /** @class */ (function (_super) {
        __extends(UIShortcutDataPort, _super);
        /**
         * @constructor
         * @param {UIShortcut} parent - The parent UI shortcut.
         * @param {DataPort} model - The data port model.
         * @param {EShortcutType} shortcutType - The shortcut type.
         */
        function UIShortcutDataPort(parent, model, shortcutType) {
            var _this = _super.call(this, parent, model) || this;
            _this._shortcutType = shortcutType;
            _this._startPortState = _this._shortcutType === 0 /* eStartPort */;
            _this._setBorderConstraint({
                attach: _this._startPortState ? EGraphCore.BorderCstr.BOTTOM : EGraphCore.BorderCstr.TOP,
                offset: 10,
                aoffy: _this._startPortState ? -14 : -7
            });
            return _this;
        }
        /**
         * Removes the connector.
         * @public
         */
        UIShortcutDataPort.prototype.remove = function () {
            this._shortcutType = undefined;
            this._startPortState = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Indicates whether the data port label should be displayed on top of the port.
         * @public
         * @abstract
         * @returns {boolean} True if the data port label should be displayed on top of the port else false.
         */
        UIShortcutDataPort.prototype.isDataPortLabelOnTop = function () {
            return !this.isStartPort();
        };
        /**
         * Gets the parent of the port.
         * @public
         * @returns {UIShortcut} The parent of the port.
         */
        UIShortcutDataPort.prototype.getParent = function () {
            return _super.prototype.getParent.call(this);
        };
        /**
         * Gets the parent port of the shortcut.
         * @public
         * @returns {UIDataPort} The parent port of the shortcut.
         */
        UIShortcutDataPort.prototype.getParentPort = function () {
            return this.getParent().getDataPortUI();
        };
        /**
         * Gets the parent graph of the port.
         * @public
         * @returns {UIGraph} The parent graph of the port.
         */
        UIShortcutDataPort.prototype.getParentGraph = function () {
            return this._parent.getGraph();
        };
        /**
         * Checks if the port is a start port.
         * @public
         * @returns {boolean} True if the port is a start port else false.
         */
        UIShortcutDataPort.prototype.isStartPort = function () {
            return this._startPortState;
        };
        /**
         * Gets the shortcut type.
         * @private
         * @returns {ShortcutType} The shortcut type.
         */
        UIShortcutDataPort.prototype.getShortcutType = function () {
            return this._shortcutType;
        };
        /**
         * Checks if the port is editable or not.
         * @private
         * @returns {boolean} True if the port is editable else false.
         */
        // eslint-disable-next-line class-methods-use-this
        UIShortcutDataPort.prototype.isEditable = function () {
            return false;
        };
        /**
         * Converts the shortcut data port to a graph relative path.
         * @public
         * @returns {string} The relative shortcut data port path.
         */
        UIShortcutDataPort.prototype.toPath = function () {
            var graph = this._parent.getGraph();
            return graph.getModel().toPath(this.getParentGraph().getModel()) + '.shortcuts[' + graph.getShortcuts().indexOf(this.getParent()) + ']';
        };
        /**
         * Gets the port name.
         * @public
         * @returns {string} The port name.
         */
        UIShortcutDataPort.prototype.getName = function () {
            return this._parent.getDataPortUI().getName();
        };
        /**
         * Reroutes the shortcut UI links on the data port reference.
         * @public
         */
        UIShortcutDataPort.prototype.rerouteUILinksOnRef = function () {
            var _this = this;
            var viewer = this.getParentGraph().getViewer();
            var links = this.getLinks();
            links.forEach(function (link) {
                var startPort = link.getStartPort();
                var endPort = link.getEndPort();
                var refPort = _this._parent.getDataPortUI();
                viewer.removeLinkFromViewer(link);
                refPort.removeShortcutLink();
                if (startPort === _this) {
                    startPort = refPort;
                    link.setStartPort(startPort);
                }
                else if (endPort === _this) {
                    endPort = refPort;
                    link.setEndPort(endPort);
                }
                link.setView(link.createView());
                viewer.addLinkToViewer(startPort, endPort, link);
            });
        };
        /**
         * Creates the view of the connector.
         * @protected
         * @override
         * @returns {UIShortcutDataPortView} The view of the connector.
         */
        UIShortcutDataPort.prototype._createView = function () {
            return new UIShortcutDataPortView(this);
        };
        return UIShortcutDataPort;
    }(UIDataPort));
    return UIShortcutDataPort;
});
