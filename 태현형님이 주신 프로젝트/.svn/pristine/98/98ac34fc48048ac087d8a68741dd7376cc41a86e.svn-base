/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIDataPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIDataPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIPort", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortDialog", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortExpandDialog", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIDataPortView", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents"], function (require, exports, UIPort, UIDataPortDialog, UIDataPortExpandDialog, UICommand, UICommandType, UIDataPortView, ModelEnums, TypeLibrary, UITools, Events) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data port.
     * @class UIDataPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIDataPort
     * @extends UIPort
     * @abstract
     * @private
     */
    var UIDataPort = /** @class */ (function (_super) {
        __extends(UIDataPort, _super);
        /**
         * @public
         * @constructor
         * @param {UIBlock|UIGraphDataDrawer|UIShortcut} parent - The parent UI node that owns this UI data port.
         * @param {DataPort} model - The data port model.
         */
        function UIDataPort(parent, model) {
            var _this = _super.call(this, parent, model) || this;
            _this._subDataPorts = [];
            _this._expandDialog = new UIDataPortExpandDialog(_this.getEditor(), _this);
            _this._shortcutLinks = 0;
            _this._isExposed = true;
            _this._dialog = new UIDataPortDialog(_this);
            _this._onDataPortNameChangeCB = _this._onDataPortNameChange.bind(_this);
            _this._onDataPortDefaultValueChangeCB = _this._onDataPortDefaultValueChange.bind(_this);
            _this._onDataPortAddCB = _this._onDataPortAdd.bind(_this);
            _this._onDataPortRemoveCB = _this._onDataPortRemove.bind(_this);
            _this._onDataPortValidityChangeCB = _this.getView().onDataPortValidityChange.bind(_this.getView());
            _this._model.addListener(Events.DataPortNameChangeEvent, _this._onDataPortNameChangeCB);
            _this._model.addListener(Events.DataPortDefaultValueChangeEvent, _this._onDataPortDefaultValueChangeCB);
            _this._model.addListener(Events.DataPortAddEvent, _this._onDataPortAddCB);
            _this._model.addListener(Events.DataPortRemoveEvent, _this._onDataPortRemoveCB);
            _this._model.addListener(Events.DataPortValidityChangeEvent, _this._onDataPortValidityChangeCB);
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
        UIDataPort.prototype.remove = function () {
            this._dialog.remove();
            this._removeSubDataPorts();
            if (this._model !== undefined) {
                this._model.removeListener(Events.DataPortNameChangeEvent, this._onDataPortNameChangeCB);
                this._model.removeListener(Events.DataPortDefaultValueChangeEvent, this._onDataPortDefaultValueChangeCB);
                this._model.removeListener(Events.DataPortAddEvent, this._onDataPortAddCB);
                this._model.removeListener(Events.DataPortRemoveEvent, this._onDataPortRemoveCB);
                this._model.removeListener(Events.DataPortValidityChangeEvent, this._onDataPortValidityChangeCB);
            }
            if (this._expandDialog !== undefined) {
                this._expandDialog.remove();
                this._expandDialog = undefined;
            }
            this._dialog = undefined;
            this._shortcutLinks = undefined;
            this._subDataPorts = undefined;
            this._onDataPortNameChangeCB = undefined;
            this._onDataPortDefaultValueChangeCB = undefined;
            this._onDataPortAddCB = undefined;
            this._onDataPortRemoveCB = undefined;
            this._onDataPortValidityChangeCB = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Projects the specified JSON object to the data port.
         * @public
         * @param {IJSONDataPortUI} iJSONDataPort - The JSON projected data port.
         */
        UIDataPort.prototype.fromJSON = function (iJSONDataPort) {
            _super.prototype.fromJSON.call(this, iJSONDataPort);
            if (this._model.isOptional()) {
                var isExposed = (iJSONDataPort === null || iJSONDataPort === void 0 ? void 0 : iJSONDataPort.visible) || // UI info is available
                    this._model.isOverride() || // Default value is override
                    this._model.getDataLinks(this.getParentGraph().getModel()).length > 0 || // Data port has links
                    this._model.getDataPorts().length > 0; // There are subdata ports available
                this.setExposedState(isExposed);
            }
        };
        /**
         * Projects the data port to the specified JSON object.
         * @public
         * @param {IJSONDataPortUI} oJSONDataPort - The JSON projected data port.
         */
        UIDataPort.prototype.toJSON = function (oJSONDataPort) {
            _super.prototype.toJSON.call(this, oJSONDataPort);
            if (this._model.isOptional() && this.isExposed()) {
                oJSONDataPort.visible = true;
            }
        };
        /**
         * Gets the view of the of.
         * @public
         * @returns {UIDataPortView} The view of the port.
         */
        UIDataPort.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the port model.
         * @public
         * @returns {DataPort} The port model.
         */
        UIDataPort.prototype.getModel = function () {
            return _super.prototype.getModel.call(this);
        };
        /**
         * Gets the list of UI links connected to that port.
         * @public
         * @returns {Array<UIDataLink>} The list of UI links connected to that port.
         */
        UIDataPort.prototype.getLinks = function () {
            return _super.prototype.getLinks.call(this);
        };
        /**
         * Highlights the data port as a compatible port.
         * @public
         * @param {ModelEnums.ESeverity} severity - The severity of the compatibility.
         */
        UIDataPort.prototype.compatibilityHighlight = function (severity) {
            this.getView().compatibilityHighlight(severity);
        };
        /**
         * Unhighlights the data port as a compatible port.
         * @public
         */
        UIDataPort.prototype.compatibilityUnhighlight = function () {
            this.getView().compatibilityUnhighlight();
        };
        /**
         * Updates the data port width.
         * @public
         */
        UIDataPort.prototype.updateWidth = function () {
            this.getView().updateConnectorWidth();
        };
        /**
         * Gets the list of sub data ports (exposed and unexposed).
         * @public
         * @returns {UISubDataPort[]} The list of sub data ports.
         */
        UIDataPort.prototype.getAllSubDataPorts = function () {
            return this._subDataPorts.filter(function (subDataPort) { return subDataPort !== undefined; });
        };
        /**
         * Gets the list of exposed sub data ports.
         * @public
         * @returns {UISubDataPort[]} The list of exposed sub data ports.
         */
        UIDataPort.prototype.getExposedSubDataPorts = function () {
            return this._subDataPorts.filter(function (subDataPort) { return subDataPort.isExposed(); });
        };
        /**
         * Gets the UI sub data port from the provided sud data port model.
         * @public
         * @param {DataPort} subDataPortModel - The sub data port model.
         * @returns {UISubDataPort} The UI sub data port.
         */
        UIDataPort.prototype.getUISubDataPortFromModel = function (subDataPortModel) {
            return this._subDataPorts.find(function (subDataPort) { return subDataPort.getModel() === subDataPortModel; });
        };
        /**
         * Gets the UI sub data port from the provided name.
         * @public
         * @param {string} name - The sub data port name.
         * @returns {UISubDataPort} The UI sub data port.
         */
        UIDataPort.prototype.getUISubDataPortByName = function (name) {
            return this._subDataPorts.find(function (subDataPort) { return subDataPort.getModel().getName() === name; });
        };
        /**
         * Gets the shortcut links count.
         * @public
         * @returns {number} The shortcut links count.
         */
        UIDataPort.prototype.getShorcutLinksCount = function () {
            return this._shortcutLinks;
        };
        /**
         * Adds a shortcut link.
         * @public
         */
        UIDataPort.prototype.addShortcutLink = function () {
            this._shortcutLinks++;
            this.getView().updateShortcutLinkDisplay();
        };
        /**
         * Removes a shortcut link.
         * @public
         */
        UIDataPort.prototype.removeShortcutLink = function () {
            this._shortcutLinks--;
            this.getView().updateShortcutLinkDisplay();
        };
        /**
         * Checks if the data port is editable or not.
         * @public
         * @returns {boolean} True if the data port is editable else false.
         */
        UIDataPort.prototype.isEditable = function () {
            return _super.prototype.isEditable.call(this) || this._model.isValueTypeSettable() || this._model.isDefaultValueSettable();
        };
        /**
         * The callback to port double click event.
         * @public
         */
        UIDataPort.prototype.openDialog = function () {
            if (this.isEditable()) {
                this._dialog.open();
            }
        };
        /**
         * Gets the data port dialog.
         * @public
         * @returns {UIDataPortDialog} The data port dialog.
         */
        UIDataPort.prototype.getDialog = function () {
            return this._dialog;
        };
        /**
         * Gets the data port expand dialog.
         * @public
         * @returns {UIDataPortExpandDialog} The data port expand dialog.
         */
        UIDataPort.prototype.getExpandDialog = function () {
            return this._expandDialog;
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {Array<UICommand>} The list of available commands.
         */
        UIDataPort.prototype.getCommands = function () {
            var _this = this;
            var commands = _super.prototype.getCommands.call(this);
            var typeLibraryPanel = this.getEditor().getTypeLibraryPanel();
            var typeName = this._model.getValueType();
            if (this._model.isExpandable() || this._model.isCollapsible()) {
                commands.push(new UICommand(UICommandType.eEditExpandState, function (event) {
                    _this._expandDialog.setMousePosition({ left: event.clientX, top: event.clientY });
                    _this._expandDialog.open();
                }));
            }
            commands.push(new UICommand(UICommandType.eOpenTypeDescription, function () { typeLibraryPanel.selectType(typeName); }));
            if (this._model.block.isDataPortRemovable(this._model)) {
                var viewer = this.getParentGraph().getViewer();
                commands.push(new UICommand(UICommandType.eRemove, viewer.deleteSelection.bind(viewer)));
            }
            var isDebuggable = UITools.isDataPortDebuggable(this.getEditor(), this._model);
            if (isDebuggable) {
                var index = commands.findIndex(function (command) { return command.getCommandType() === UICommandType.eEdit; });
                if (index !== -1) {
                    commands.splice(index, 1, new UICommand(UICommandType.eDebug, this.openDialog.bind(this)));
                }
            }
            if (this._model.isOptional()) {
                commands.push(new UICommand(UICommandType.eHideOptionalDataPort, function () {
                    _this.setExposedState(false);
                    _this.getEditor().getHistoryController().registerHideOptionalDataPortAction();
                }));
            }
            return commands;
        };
        /**
         * Gets the data port bounding box.
         * @public
         * @param {IViewpoint} vpt - The current graph viewpoint.
         * @returns {DOMRect} The data port bounding box.
         */
        UIDataPort.prototype.getBoundingBox = function (vpt) {
            var portBBox = _super.prototype.getBoundingBox.call(this);
            var subDataPortLength = this.getExposedSubDataPorts().length;
            if (subDataPortLength > 0) {
                var width = subDataPortLength * UIDataPortView.kSpaceBetweenPorts;
                portBBox.width -= width * vpt.scale;
            }
            return portBBox;
        };
        /**
         * Unexpose all UI sub data ports.
         * @public
         */
        UIDataPort.prototype.unexposeAllUISubDataPorts = function () {
            this._subDataPorts.forEach(function (subDataPort) {
                var dataLinks = subDataPort.getModel().getDataLinks();
                if (dataLinks.length === 0) {
                    subDataPort.setExposedState(false);
                }
            });
            this.updateWidth();
        };
        /**
         * Gets the data port value type descriptor.
         * @public
         * @returns {Object} The value type descriptor.
         */
        UIDataPort.prototype.getValueTypeDescriptor = function () {
            var valueTypeName = this._model.getValueType();
            var Type = TypeLibrary.getType(this._model.getGraphContext(), valueTypeName);
            var descriptor;
            if (TypeLibrary.hasType(this._model.getGraphContext(), valueTypeName, ModelEnums.FTypeCategory.fObject)) {
                descriptor = Type;
            }
            else if (TypeLibrary.hasType(this._model.getGraphContext(), valueTypeName, ModelEnums.FTypeCategory.fClass | ModelEnums.FTypeCategory.fEvent)) {
                descriptor = Type.descriptor;
            }
            return descriptor;
        };
        /**
         * Checks if the data port is exposed.
         * @public
         * @returns {boolean} True if the data port is exposed else false.
         */
        UIDataPort.prototype.isExposed = function () {
            return this._isExposed;
        };
        /**
         * Sets the data port exposed state.
         * @public
         * @param {boolean} exposedState - True to expose the data port, false to unexpose it.
         */
        UIDataPort.prototype.setExposedState = function (exposedState) {
            if (this._isExposed !== exposedState) {
                this._isExposed = exposedState;
                if (!exposedState) {
                    this.removeLinks();
                    this._model.collapse();
                    this._model.resetDefaultValue();
                }
                if (this._model.isOptional()) {
                    this.setVisibility(exposedState);
                }
            }
        };
        /**
         * Checks if the data port is visible or not.
         * @public
         * @returns {boolean} True is the data port is visible else false.
         */
        UIDataPort.prototype.isVisible = function () {
            return this.getView().isVisible();
        };
        /**
         * Sets the data port visibility.
         * @public
         * @param {boolean} visible - True to show the data port, false to hide it.
         */
        UIDataPort.prototype.setVisibility = function (visible) {
            this.getView().setVisibility(visible);
            this._subDataPorts.forEach(function (subDataPort) { return subDataPort.setVisibility(visible); });
        };
        /**
         * Triggers a pulse animation on the port.
         * @public
         */
        UIDataPort.prototype.triggerPulseAnimation = function () {
            this.getView().triggerPulseAnimation();
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * The callback on the data port add event.
         * @protected
         * @param {DataPortAddEvent} event - The data port add event.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIDataPort.prototype._onDataPortAdd = function (event) {
            this.updateWidth();
            this.getParentGraph().onModelChange();
        };
        /**
         * Adds the provided sub data port to the port.
         * @protected
         * @param {UISubDataPort} subDataPort - The sub data port.
         * @param {number} index - The index of the sub data port.
         */
        UIDataPort.prototype._addSubDataPort = function (subDataPort, index) {
            var UISubDataPortCtr = require('DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort');
            if (subDataPort instanceof UISubDataPortCtr) {
                this._subDataPorts.splice(index, 0, subDataPort);
                this._parent.addPort(subDataPort);
                // Check if we are on a graph block with an opened graph view
                var UIGraphBlock = require('DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphBlock');
                var parentBlock = this.getParent();
                if (parentBlock instanceof UIGraphBlock && parentBlock.isGraphViewOpened()) {
                    subDataPort.setExposedState(false);
                }
            }
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
         * The callback on the data port name change event.
         * @private
         * @param {DataPortNameChangeEvent} event - The data port name change event.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIDataPort.prototype._onDataPortNameChange = function (event) {
            this.getParentGraph().onModelChange();
        };
        /**
         * The callback on the data port default value change event.
         * @private
         * @param {DataPortDefaultValueChange} event - The data port default value change event.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIDataPort.prototype._onDataPortDefaultValueChange = function (event) {
            this.getParentGraph().onModelChange();
        };
        /**
         * The callback on the data port remove event.
         * @private
         * @param {DataPortRemoveEvent} event - The data port remove event.
         */
        UIDataPort.prototype._onDataPortRemove = function (event) {
            var subDataPort = this.getUISubDataPortFromModel(event.getDataPort());
            if (subDataPort !== undefined) {
                this._removeSubDataPort(subDataPort);
                this.updateWidth();
            }
            this.getParentGraph().onModelChange();
        };
        /**
         * Removes all sub data ports from the data port.
         * @private
         */
        UIDataPort.prototype._removeSubDataPorts = function () {
            while (this._subDataPorts.length > 0) {
                this._removeSubDataPort(this._subDataPorts[0]);
            }
        };
        /**
         * Removes the provided sub data port from the data port.
         * @private
         * @param {UISubDataPort} subDataPort - The sub data port.
         */
        UIDataPort.prototype._removeSubDataPort = function (subDataPort) {
            var UISubDataPortCtr = require('DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort');
            if (subDataPort instanceof UISubDataPortCtr) {
                var index = this._subDataPorts.indexOf(subDataPort);
                if (index !== -1) {
                    this._subDataPorts.splice(index, 1);
                    subDataPort.remove();
                }
            }
        };
        return UIDataPort;
    }(UIPort));
    return UIDataPort;
});
