/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIControlPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIControlPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIPort", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIControlPortDialog", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPort"], function (require, exports, UIPort, UICommand, UICommandType, UIControlPortDialog, ModelEnums, Events, EventPort) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI control port.
     * @class UIControlPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIControlPort
     * @extends UIPort
     * @abstract
     * @private
     */
    var UIControlPort = /** @class */ (function (_super) {
        __extends(UIControlPort, _super);
        /**
         * @constructor
         * @param {UIBlock|UIGraph} parent - The parent that owns this UI control port.
         * @param {ControlPort} model - The control port model.
         */
        function UIControlPort(parent, model) {
            var _this = _super.call(this, parent, model) || this;
            _this._onControlPortNameChangeCB = _this._onControlPortNameChange.bind(_this);
            _this._onControlPortEventTypeChangeCB = _this._onControlPortEventTypeChange.bind(_this);
            _this._dialog = new UIControlPortDialog(_this);
            _this._model.addListener(Events.ControlPortNameChangeEvent, _this._onControlPortNameChangeCB);
            _this._model.addListener(Events.ControlPortEventTypeChangeEvent, _this._onControlPortEventTypeChangeCB);
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
        UIControlPort.prototype.remove = function () {
            this._dialog.remove();
            this._model.removeListener(Events.ControlPortNameChangeEvent, this._onControlPortNameChangeCB);
            this._model.removeListener(Events.ControlPortEventTypeChangeEvent, this._onControlPortEventTypeChangeCB);
            this._onControlPortNameChangeCB = undefined;
            this._onControlPortEventTypeChangeCB = undefined;
            this._dialog = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the view of the of.
         * @public
         * @returns {UIControlPortView} The view of the port.
         */
        UIControlPort.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the port model.
         * @public
         * @returns {ControlPort} The port model.
         */
        UIControlPort.prototype.getModel = function () {
            return _super.prototype.getModel.call(this);
        };
        /**
         * Gets the parent of the port.
         * @public
         * @returns {UIBlock|UIGraph} The parent of the port.
         */
        UIControlPort.prototype.getParent = function () {
            return _super.prototype.getParent.call(this);
        };
        /**
         * Gets the list of UI links connected to that port.
         * @public
         * @returns {Array<UIControlLink>} The list of UI links connected to that port.
         */
        UIControlPort.prototype.getLinks = function () {
            return _super.prototype.getLinks.call(this);
        };
        /**
         * Checks if the port is a start port.
         * @public
         * @returns {boolean} True if the port is a start port else false.
         */
        UIControlPort.prototype.isStartPort = function () {
            return this._model.getType() === ModelEnums.EControlPortType.eInput || this._model.getType() === ModelEnums.EControlPortType.eInputEvent;
        };
        /**
         * Checks if the control port is editable or not.
         * @public
         * @returns {boolean} True if the control port is editable else false.
         */
        UIControlPort.prototype.isEditable = function () {
            return _super.prototype.isEditable.call(this) || (this._model instanceof EventPort && this._model.isEventTypeSettable());
        };
        /**
         * The callback to control port double click event.
         * @public
         */
        UIControlPort.prototype.openDialog = function () {
            if (this.isEditable()) {
                this._dialog.open();
            }
        };
        /**
         * Gets the control port dialog.
         * @public
         * @returns {UIControlPortDialog} The control port dialog.
         */
        UIControlPort.prototype.getDialog = function () {
            return this._dialog;
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {Array<UICommand>} The list of available commands.
         */
        UIControlPort.prototype.getCommands = function () {
            var commands = _super.prototype.getCommands.call(this);
            if (this._parent.getModel().isControlPortRemovable(this._model)) {
                var viewer = this.getParentGraph().getViewer();
                commands.push(new UICommand(UICommandType.eRemove, viewer.deleteSelection.bind(viewer)));
            }
            return commands;
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
         * The callback on the control port name change event.
         * @protected
         * @param {ControlPortNameChangeEvent} event - The control port name change event.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIControlPort.prototype._onControlPortNameChange = function (event) {
            this.getParentGraph().onModelChange();
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
         * The callback on the control port event type change event.
         * @private
         * @param {ControlPortEventTypeChangeEvent} event - The control port event type change event.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIControlPort.prototype._onControlPortEventTypeChange = function (event) {
            this.getParentGraph().onModelChange();
        };
        return UIControlPort;
    }(UIPort));
    return UIControlPort;
});
