/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphControlPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphControlPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIControlPort", "DS/EPSSchematicsUI/constraints/EPSSchematicsUIGraphControlPortBorderCstr", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphControlPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIMath", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, UIControlPort, UIGraphControlPortBorderCstr, UIGraphControlPortView, UIMath, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph control port.
     * @class UIGraphControlPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphControlPort
     * @extends UIControlPort
     * @private
     */
    var UIGraphControlPort = /** @class */ (function (_super) {
        __extends(UIGraphControlPort, _super);
        /**
         * @constructor
         * @param {UIGraph} parent - The parent UI graph that owns this UI graph port.
         * @param {ControlPort} model - The control port model.
         * @param {number} offset - The position of the control port.
         */
        function UIGraphControlPort(parent, model, offset) {
            var _this = _super.call(this, parent, model) || this;
            var validOffset = _this.computeValidOffset(offset);
            var start = _this.isStartPort();
            _this._setBorderConstraint({
                cstr: new UIGraphControlPortBorderCstr(_this),
                offset: validOffset,
                attach: start ? EGraphCore.BorderCstr.LEFT : EGraphCore.BorderCstr.RIGHT,
                aoffx: start ? -UIGraphControlPortView.kPortHeight / 2 : UIGraphControlPortView.kPortHeight / 2,
                aoffy: start ? UIGraphControlPortView.kPortLeftOffset - 1 : UIGraphControlPortView.kPortLeftOffset
            });
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
        UIGraphControlPort.prototype.remove = function () {
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the view of the of.
         * @public
         * @returns {UIGraphControlPortView} The view of the port.
         */
        UIGraphControlPort.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the parent of the port.
         * @public
         * @returns {UIGraph} The parent of the port.
         */
        UIGraphControlPort.prototype.getParent = function () {
            return this._parent;
        };
        /**
         * Gets the parent graph of the port.
         * @public
         * @returns {UIGraph} The parent graph of the port.
         */
        UIGraphControlPort.prototype.getParentGraph = function () {
            return this._parent;
        };
        /**
         * Computes a valid port's offset included between a minimum
         * and a maximum limit and snapped to the graph's grid.
         * @public
         * @param {number} offset - The given port's offset position.
         * @returns {number} A valid port's offset position.
         */
        UIGraphControlPort.prototype.computeValidOffset = function (offset) {
            var graph = this.getParentGraph();
            /*const topLimit = graph.paddingTop + UIGraphControlPortView.kPortHeight;
            const bottomLimit = graph.getHeight() - graph.paddingBottom - UIGraphControlPortView.kPortHeight;
            if (offset < topLimit) {
                offset = topLimit;
            } else if (offset > bottomLimit) {
                offset = bottomLimit;
            }*/
            return graph.getEditor().getOptions().gridSnapping ? UIMath.snapValue(offset) : offset;
        };
        /**
         * Loads the port from the provided JSON port model.
         * @public
         * @param {IJSONGraphControlPortUI} iJSONGraphControlPort - The JSON graph control port model.
         */
        UIGraphControlPort.prototype.fromJSON = function (iJSONGraphControlPort) {
            if (iJSONGraphControlPort !== undefined) {
                this.setOffset(iJSONGraphControlPort.offset);
            }
        };
        /**
         * Saves the port to the provided JSON port model.
         * @public
         * @param {IJSONGraphControlPortUI} oJSONGraphControlPort - The JSON graph control port model.
         */
        UIGraphControlPort.prototype.toJSON = function (oJSONGraphControlPort) {
            oJSONGraphControlPort.offset = this._display.offset;
        };
        /**
         * Sets the port's offset position.
         * @public
         * @param {number} offset - The port's offset position.
         */
        UIGraphControlPort.prototype.setOffset = function (offset) {
            var validOffset = this.computeValidOffset(offset);
            _super.prototype.setOffset.call(this, validOffset);
            this.getParentGraph().onUIChange();
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
         * Creates the view of the connector.
         * @protected
         * @override
         * @returns {UIGraphControlPortView} The view of the connector.
         */
        UIGraphControlPort.prototype._createView = function () {
            return new UIGraphControlPortView(this);
        };
        /**
         * The callback on the control port name change event.
         * @protected
         * @param {ControlPortNameChangeEvent} event - The control port name change event.
         */
        UIGraphControlPort.prototype._onControlPortNameChange = function (event) {
            this.getView().updatePortName(event.getName());
            _super.prototype._onControlPortNameChange.call(this, event);
        };
        return UIGraphControlPort;
    }(UIControlPort));
    return UIGraphControlPort;
});
