/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIShortcut'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIShortcut", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIShortcutView", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort", "DS/EPSSchematicsUI/tools/EPSSchematicsUIMath", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents"], function (require, exports, UINode, UIShortcutView, UIShortcutDataPort, UIMath, ModelEnums, Events) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI shortcut.
     * @private
     * @class UIShortcut
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIShortcut
     * @extends UINode
     */
    var UIShortcut = /** @class */ (function (_super) {
        __extends(UIShortcut, _super);
        /**
         * @public
         * @constructor
         * @param {UIGraph} graph - The parent UI graph that owns this UI shortcut.
         * @param {UIDataPort} dataPortUI - The UI data port reference.
         * @param {number} left - The left position of the shortcut.
         * @param {number} top - The top position of the shortcut.
         * @param {UIEnums.EShortcutType} [shortcutType] - The type of shortcut.
         */
        function UIShortcut(graph, dataPortUI, left, top, shortcutType) {
            var _this = _super.call(this, { graph: graph, isDraggable: true }) || this;
            _this._onDataPortRemoveCB = _this._onDataPortRemove.bind(_this);
            _this._onBlockRemoveCB = _this._onBlockRemove.bind(_this);
            _this._dataPortUI = dataPortUI;
            _this._dataPortModel = _this._dataPortUI.getModel(); // Keep the reference on model after dataPortUI destruction!
            _this._blockModel = _this._dataPortModel.block;
            _this._portType = _this._dataPortModel.getType();
            _this._parentDataPortModel = _this._dataPortModel.dataPort;
            _this.setView(new UIShortcutView());
            _this.setPosition(left, top);
            _this.setDimension(20, 3);
            if (_this._portType === ModelEnums.EDataPortType.eInput || _this._portType === ModelEnums.EDataPortType.eOutput) {
                _this._shortcutType = _this._dataPortModel.isStartPort(_this._graph.getModel()) ? 0 /* eStartPort */ : 1 /* eEndPort */;
            }
            else if (_this._portType === ModelEnums.EDataPortType.eLocal) {
                if (shortcutType !== undefined) {
                    _this._shortcutType = shortcutType;
                }
                else if (_this._parentDataPortModel !== undefined) { // Manage sub data port
                    _this._shortcutType = _this._dataPortUI.getParentPort().getInputLocalState() ? 0 /* eStartPort */ : 1 /* eEndPort */;
                }
                else {
                    _this._shortcutType = _this._dataPortUI.getInputLocalState() ? 0 /* eStartPort */ : 1 /* eEndPort */;
                }
            }
            _this._shortcutDataPort = new UIShortcutDataPort(_this, _this._dataPortModel, _this._shortcutType);
            _this.getDisplay().appendConnector(_this._shortcutDataPort.getDisplay());
            if (_this._parentDataPortModel !== undefined) {
                _this._parentDataPortModel.addListener(Events.DataPortRemoveEvent, _this._onDataPortRemoveCB);
            }
            else {
                _this._blockModel.addListener(Events.DataPortRemoveEvent, _this._onDataPortRemoveCB);
            }
            _this._graph.getModel().addListener(Events.BlockRemoveEvent, _this._onBlockRemoveCB);
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
         * Removes the node from its parent graph.
         * @public
         * @param {boolean} [retouteLinks=false] - True to retoute links on ref, default is false.
         */
        UIShortcut.prototype.remove = function (retouteLinks) {
            if (retouteLinks === void 0) { retouteLinks = false; }
            if (retouteLinks === true) {
                this._shortcutDataPort.rerouteUILinksOnRef();
            }
            this._shortcutDataPort.remove();
            if (this._parentDataPortModel !== undefined) {
                this._parentDataPortModel.removeListener(Events.DataPortRemoveEvent, this._onDataPortRemoveCB);
            }
            else {
                this._blockModel.removeListener(Events.DataPortRemoveEvent, this._onDataPortRemoveCB);
            }
            this._graph.getModel().removeListener(Events.BlockRemoveEvent, this._onBlockRemoveCB);
            this._dataPortUI = undefined;
            this._shortcutType = undefined;
            this._dataPortModel = undefined;
            this._blockModel = undefined;
            this._portType = undefined;
            this._parentDataPortModel = undefined;
            this._shortcutDataPort = undefined;
            this._onDataPortRemoveCB = undefined;
            this._onBlockRemoveCB = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Projects the specified JSON object to the shortcut.
         * @public
         * @param {IJSONShortcutUI} iJSONShortcut - The JSON projected shortcut.
         */
        UIShortcut.prototype.fromJSON = function (iJSONShortcut) {
            if (iJSONShortcut !== undefined) {
                this.setPosition(iJSONShortcut.left, iJSONShortcut.top, true);
            }
        };
        /**
         * Projects the shortcut to the specified JSON object.
         * @public
         * @param {IJSONShortcutUI} oJSONShortcut - The JSON projected shortcut.
         */
        UIShortcut.prototype.toJSON = function (oJSONShortcut) {
            oJSONShortcut.left = this.getActualLeft();
            oJSONShortcut.top = this.getActualTop();
            oJSONShortcut.port = this._dataPortModel.toPath(this._graph.getModel());
            oJSONShortcut.shortcutType = this._shortcutType;
        };
        /**
         * Sets the shortcut position relative to its parent graph.
         * @public
         * @param {number} left - The left position of the shortcut.
         * @param {number} top - The top position of the shortcut.
         * @param {boolean} [relativeToGraph=false] - True to compute position relative to its parent graph, false otherwise.
         */
        UIShortcut.prototype.setPosition = function (left, top, relativeToGraph) {
            if (relativeToGraph === void 0) { relativeToGraph = false; }
            var posLeft = this._graph.getEditor().getOptions().gridSnapping ? UIMath.snapValue(left) : left;
            var posTop = this._graph.getEditor().getOptions().gridSnapping ? UIMath.snapValue(top) : top;
            if (this.getLeft() !== posLeft || this.getTop() !== posTop) {
                this._graph.onUIChange();
            }
            _super.prototype.setPosition.call(this, posLeft, posTop, relativeToGraph);
        };
        /**
         * Gets the UI shortcut data port.
         * @public
         * @returns {UIShortcutDataPort} The UI shortcut data port.
         */
        UIShortcut.prototype.getShortcutDataPort = function () {
            return this._shortcutDataPort;
        };
        /**
         * Gets the shortcut data port model.
         * @public
         * @returns {DataPort} The data port model.
         */
        UIShortcut.prototype.getDataPortModel = function () {
            return this._dataPortModel;
        };
        /**
         * Gets the shortcut data port UI.
         * @public
         * @returns {UIDataPort} The data port UI.
         */
        UIShortcut.prototype.getDataPortUI = function () {
            return this._dataPortUI;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * The callback on the model data port remove event.
         * @private
         * @param {Events.DataPortRemoveEvent} event - The model data port remove event.
         */
        UIShortcut.prototype._onDataPortRemove = function (event) {
            if (event.getDataPort() === this._dataPortModel) {
                this._graph.removeShortcut(this);
            }
        };
        /**
         * The callback on the model block remove event.
         * @private
         * @param {Events.BlockRemoveEvent} event - The model block remove event.
         */
        UIShortcut.prototype._onBlockRemove = function (event) {
            if (event.getBlock() === this._blockModel) {
                this._graph.removeShortcut(this);
            }
        };
        return UIShortcut;
    }(UINode));
    return UIShortcut;
});
