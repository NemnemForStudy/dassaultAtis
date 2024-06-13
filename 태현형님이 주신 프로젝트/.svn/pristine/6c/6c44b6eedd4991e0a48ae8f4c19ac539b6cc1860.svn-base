/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIConnectorView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/connectors/EPSSchematicsUIPort"], function (require, exports, UIConnectorView, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI port view.
     * @class UIPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIPortView
     * @extends UIConnectorView
     * @abstract
     * @private
     */
    var UIPortView = /** @class */ (function (_super) {
        __extends(UIPortView, _super);
        /**
         * @constructor
         * @param {UIPort} port - The UI port.
         */
        function UIPortView(port) {
            var _this = _super.call(this) || this;
            _this._port = port;
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
         * Handles the display of the port reroute handler.
         * @private
         */
        UIPortView.prototype.handleRerouteHandlerDisplay = function () {
            var links = this._port.getLinks();
            var isCtrlPressed = this._port.getEditor().getKeyboardController().isCtrlKeyPressed();
            if (this._isMouseOver() && isCtrlPressed && links.length > 0) {
                links.forEach(function (link) { return link.getView().highlight(); });
                this.showRerouteHandler();
            }
            else {
                var selected_1 = false;
                links.forEach(function (link) {
                    link.getView().unhighlight();
                    selected_1 = selected_1 || link.isSelected();
                });
                if (!selected_1) {
                    this.hideRerouteHandler();
                }
            }
        };
        /**
         * Gets the reroute handler svg rect element.
         * @public
         * @returns {SVGRectElement} The reroute handler svg rect element.
         */
        UIPortView.prototype.getRerouteHandler = function () {
            return this._rerouteHandler;
        };
        /**
         * Shows the port reroute handler.
         * @private
         */
        UIPortView.prototype.showRerouteHandler = function () {
            this._element.appendChild(this._rerouteHandler);
            this._rerouteHandler.style.display = 'block';
        };
        /**
         * Hides the port reroute handler.
         * @private
         */
        UIPortView.prototype.hideRerouteHandler = function () {
            this._rerouteHandler.style.display = 'none';
        };
        /**
         * Highlights the port.
         * @public
         */
        UIPortView.prototype.highlight = function () {
            UIDom.addClassName(this.structure.root, 'sch-port-highlight');
        };
        /**
         * Unhighlights the port.
         * @public
         */
        UIPortView.prototype.unhighlight = function () {
            UIDom.removeClassName(this.structure.root, 'sch-port-highlight');
        };
        /**
         * Checks if the provided target is part of the port view.
         * @public
         * @param {Element} target - The target element to check.
         * @returns {boolean} True if the target element is inside the port view else false.
         */
        UIPortView.prototype.isPartOfView = function (target) {
            var result = false;
            var parent = target;
            while (!result && parent !== undefined && parent !== null) {
                result = parent === this._element;
                parent = parent.parentElement;
            }
            return result;
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
         * Destroys the connector.
         * @protected
         * @override
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view.
         */
        UIPortView.prototype.ondestroyDisplay = function (elt, grView) {
            this._port = undefined;
            this._rerouteHandler = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-port');
            this._createRerouteHandler();
            this.hideRerouteHandler();
            return this._element;
        };
        /**
         * The callback on the modify display.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The connector.
         * @param {Object} changes - Set of paths of modified properties.
         * @param {EGraphCore.GraphView} grView - The graph view.
         */
        UIPortView.prototype.onmodifyDisplay = function (connector, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, connector, changes, grView);
            this.handleRerouteHandlerDisplay();
        };
        /**
         * Sets the port reroute handler position.
         * It is mainly a IE11 fix which does not handle svg matrix modification in css!
         * @protected
         * @param {number} left - The left position.
         * @param {number} top - The top position.
         */
        UIPortView.prototype._setRerouteHandlerPosition = function (left, top) {
            this._rerouteHandler.setAttribute('transform', 'translate(' + left + ' ' + top + ')');
        };
        /**
         * The callback on the connector mouse enter event.
         * @protected
         * @param {MouseEvent} event - The mouse enter event.
         */
        UIPortView.prototype._onMouseEnter = function (event) {
            _super.prototype._onMouseEnter.call(this, event);
            var isCtrlPressed = event.ctrlKey;
            var displaySpeed = isCtrlPressed ? 0 /* eDirect */ : 1 /* eFast */;
            var labelController = this._port.getParentGraph().getViewer().getLabelController();
            labelController.displayPortLabel(this._port, displaySpeed);
            this.highlight();
            var grView = this._port.getParentGraph().getViewer().getView();
            this.onmodifyDisplay(this._port.getDisplay(), false, grView);
        };
        /**
         * The callback on the connector mouse leave event.
         * @protected
         * @param {MouseEvent} event - The mouse leave event.
         */
        UIPortView.prototype._onMouseLeave = function (event) {
            _super.prototype._onMouseLeave.call(this, event);
            var isCtrlPressed = event.ctrlKey;
            var labelController = this._port.getParentGraph().getViewer().getLabelController();
            labelController.clearAllLabels(true);
            // Remove the port label while dragging a link
            if (event.buttons !== 0 || isCtrlPressed) {
                labelController.clearAllLabels();
            }
            this.unhighlight();
            var grView = this._port.getParentGraph().getViewer().getView();
            this.onmodifyDisplay(this._port.getDisplay(), false, grView);
        };
        /**
         * The callback on the connectore mouse up event.
         * @protected
         * @param {MouseEvent} event - The mouse up event.
         */
        UIPortView.prototype._onMouseUp = function (event) {
            _super.prototype._onMouseUp.call(this, event);
            var labelController = this._port.getParentGraph().getViewer().getLabelController();
            labelController.clearAllLabels();
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
         * Creates the port reroute handler.
         * @private
         */
        UIPortView.prototype._createRerouteHandler = function () {
            this._rerouteHandler = UIDom.createSVGRect({
                className: 'sch-reroute-handler',
                attributes: { x: 0, y: 0, width: 4, height: 4 },
                parent: this._element
            });
        };
        return UIPortView;
    }(UIConnectorView));
    return UIPortView;
});
