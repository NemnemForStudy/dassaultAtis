/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIDataPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIDataPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsUI/data/EPSSchematicsUIShapes", "css!DS/EPSSchematicsUI/css/connectors/EPSSchematicsUIDataPort"], function (require, exports, UIPortView, UIDom, ModelEnums, GraphBlock, UIShapes) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI data port view.
     * @class UIDataPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIDataPortView
     * @extends UIPortView
     * @abstract
     * @private
     */
    var UIDataPortView = /** @class */ (function (_super) {
        __extends(UIDataPortView, _super);
        /**
         * @constructor
         * @param {UIDataPort} port - The UI data port.
         */
        function UIDataPortView(port) {
            var _this = _super.call(this, port) || this;
            _this._visible = true; // Visible state is needed as the connector can be built after setVisibility!
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
         * Highlights the port's view as a compatible port.
         * @public
         * @param {ModelEnums.ESeverity} severity - The severity of the compatibility.
         */
        UIDataPortView.prototype.compatibilityHighlight = function (severity) {
            UIDom.addClassName(this._element, 'sch-data-port-compatibility');
            if (severity === ModelEnums.ESeverity.eInfo) {
                UIDom.addClassName(this._element, 'info');
            }
            else if (severity === ModelEnums.ESeverity.eSuccess) {
                UIDom.addClassName(this._element, 'success');
            }
            else if (severity === ModelEnums.ESeverity.eWarning) {
                UIDom.addClassName(this._element, 'warning');
            }
        };
        /**
         * Unhighlights the port's view as a compatible port.
         * @public
         */
        UIDataPortView.prototype.compatibilityUnhighlight = function () {
            UIDom.removeClassName(this._element, ['sch-data-port-compatibility', 'info', 'success', 'warning']);
        };
        /**
         * Checks if the port's view is compatibility highlighted.
         * @public
         * @param {ModelEnums.ESeverity} severity - The severity of the compatibility.
         * @returns {boolean} True is the port is compatibility highlighted else false.
         */
        UIDataPortView.prototype.isCompatibilityHighlighted = function (severity) {
            var result = UIDom.hasClassName(this._element, 'sch-data-port-compatibility');
            if (severity === ModelEnums.ESeverity.eInfo) {
                result = result && UIDom.hasClassName(this._element, 'info');
            }
            else if (severity === ModelEnums.ESeverity.eSuccess) {
                result = result && UIDom.hasClassName(this._element, 'success');
            }
            else if (severity === ModelEnums.ESeverity.eWarning) {
                result = result && UIDom.hasClassName(this._element, 'warning');
            }
            return result;
        };
        /**
         * Gets the data port bounding box.
         * @public
         * @returns {IDOMRect} The data port bounding box.
         */
        UIDataPortView.prototype.getBoundingBox = function () {
            var rect = this._polygon.getBoundingClientRect();
            return {
                bottom: rect.bottom,
                height: rect.height,
                left: rect.left,
                right: rect.right,
                top: rect.top,
                width: rect.width
            };
        };
        /**
         * Gets the port polygon SVG element.
         * @public
         * @returns {SVGElement} The port polygon SVG element.
         */
        UIDataPortView.prototype.getPolygon = function () {
            return this._polygon;
        };
        /**
         * Updates the shortcut link display.
         * @public
         */
        UIDataPortView.prototype.updateShortcutLinkDisplay = function () {
            var shortcutLinksCount = this._port.getShorcutLinksCount();
            if (shortcutLinksCount > 0) {
                if (this._shortcut === undefined) {
                    this._shortcutLine = UIDom.createSVGLine({ className: 'sch-shortcut-line' });
                    this._shortcutText = UIDom.createSVGText({ className: 'sch-shortcut-text' });
                    this._shortcutIcon = UIDom.createSVGPath({
                        className: 'sch-shortcut-icon',
                        attributes: { d: UIShapes.shortcutIconPathPoints }
                    });
                    this._shortcut = UIDom.createSVGGroup({
                        className: 'sch-shortcut-link',
                        parent: this._element,
                        insertBefore: this._polygon,
                        children: [this._shortcutLine, this._shortcutText, this._shortcutIcon]
                    });
                    this._configureShortcutLink();
                }
                this._shortcutText.textContent = String(shortcutLinksCount);
            }
            else if (this._shortcut !== undefined) {
                this._element.removeChild(this._shortcut);
                this._shortcutLine = undefined;
                this._shortcutIcon = undefined;
                this._shortcutText = undefined;
                this._shortcut = undefined;
            }
        };
        /**
         * The callback on the data port validity change event.
         * @public
         */
        UIDataPortView.prototype.onDataPortValidityChange = function () {
            if (!this._port.getModel().isValid()) {
                UIDom.addClassName(this.structure.root, 'invalid');
                UIDom.addClassName(this._element, 'invalid');
            }
            else {
                UIDom.removeClassName(this.structure.root, 'invalid');
                UIDom.removeClassName(this._element, 'invalid');
            }
        };
        /**
         * Sets the connector visibility.
         * @public
         * @param {boolean} visible - True to show the connector, false to hide it.
         */
        UIDataPortView.prototype.setVisibility = function (visible) {
            this._visible = visible;
            var classFct = visible ? UIDom.removeClassName : UIDom.addClassName;
            classFct(this.structure.root, 'sch-connector-hidden');
        };
        /**
         * Checks if the connector is visible or not.
         * @public
         * @returns {boolean} True if the connector is visible else false.
         */
        UIDataPortView.prototype.isVisible = function () {
            return this._visible;
        };
        /**
         * Triggers a pulse animation on the port.
         * @public
         */
        UIDataPortView.prototype.triggerPulseAnimation = function () {
            var _this = this;
            if (this._pulseCircle !== undefined) {
                this._element.removeChild(this._pulseCircle);
                this._pulseCircle = undefined;
            }
            this._pulseCircle = UIDom.createSVGCircle({
                attributes: { cx: 5, cy: 0, r: 5 },
                className: 'sch-circle-pulse',
                onanimationend: function () { _this._element.removeChild(_this._pulseCircle); _this._pulseCircle = undefined; },
                parent: this._element
            });
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
        UIDataPortView.prototype.ondestroyDisplay = function (elt, grView) {
            if (this._pulseCircle !== undefined) {
                this._pulseCircle.onanimationend = null;
            }
            this._polygon = undefined;
            this._shortcut = undefined;
            this._shortcutLine = undefined;
            this._shortcutIcon = undefined;
            this._shortcutText = undefined;
            this._pulseCircle = undefined;
            this._visible = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIDataPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-data-port');
            this.onDataPortValidityChange();
            var portType = this._port.getModel().getType();
            if (portType === ModelEnums.EDataPortType.eInput) {
                UIDom.addClassName(this._element, 'sch-input-data-port');
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                UIDom.addClassName(this._element, 'sch-output-data-port');
            }
            else if (portType === ModelEnums.EDataPortType.eLocal) {
                var parentPort = this._port;
                var UISubDataPortCtr = require('DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort');
                var UIShortcutDataPortCtr = require('DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort');
                var isShortcutDataPort = this._port instanceof UIShortcutDataPortCtr;
                if (isShortcutDataPort) {
                    parentPort = this._port.getParentPort();
                }
                var isSubDataPort = parentPort instanceof UISubDataPortCtr;
                if (isSubDataPort) {
                    parentPort = parentPort.getParentPort();
                }
                if (parentPort.getInputLocalState()) {
                    UIDom.addClassName(this._element, 'sch-input-local-data-port');
                }
                else {
                    UIDom.addClassName(this._element, 'sch-output-local-data-port');
                }
            }
            this.setVisibility(this._visible);
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
        UIDataPortView.prototype.onmodifyDisplay = function (connector, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, connector, changes, grView);
            this.updateShortcutLinkDisplay();
        };
        /**
         * Creates an input connector.
         * @param {EGraphCore.Connector} connector - The connector.
         * @protected
         */
        UIDataPortView.prototype._createInputConnector = function (connector) {
            this._polygon = UIDom.createSVGPolygon({
                className: 'sch-data-port-polygon',
                parent: this._element,
                attributes: { points: UIShapes.inputDataPortPolygonPoints }
            });
            connector.multiset(['cstr', 'aoffy'], -7);
            this._setRerouteHandlerPosition(5, -2);
        };
        /**
         * Creates an output connector.
         * @param {EGraphCore.Connector} connector - The connector.
         * @protected
         */
        UIDataPortView.prototype._createOutputConnector = function (connector) {
            this._polygon = UIDom.createSVGPolygon({
                className: 'sch-data-port-polygon',
                parent: this._element,
                attributes: { points: UIShapes.outputDataPortPolygonPoints }
            });
            connector.multiset(['cstr', 'aoffy'], -10);
            this._setRerouteHandlerPosition(9, -2);
        };
        /**
         * Updates the input connector width given the number of sub data ports.
         * @protected
         * @param {number} subDataPortLength - The number of sub data ports.
         * @param {boolean} [inverse=false] - True to inverse the increase direction.
         */
        UIDataPortView.prototype._updateInputConnectorWidth = function (subDataPortLength, inverse) {
            if (inverse === void 0) { inverse = false; }
            if (this._polygon !== undefined) {
                var points = UIShapes.inputDataPortPolygonPoints;
                if (subDataPortLength > 0) {
                    var width = UIDataPortView.kPortHalfWidth + subDataPortLength * UIDataPortView.kSpaceBetweenPorts;
                    points = inverse ? UIShapes.inputDataPortStretchableReversedPolygonPoints : UIShapes.inputDataPortStretchablePolygonPoints;
                    points = points.replace(new RegExp('x', 'g'), String(width));
                }
                this._polygon.setAttribute('points', points);
            }
        };
        /**
         * Updates the output connector width given the number of sub data ports.
         * @protected
         * @param {number} subDataPortLength - The number of sub data ports.
         * @param {boolean} [inverse=false] - True to inverse the increase direction.
         */
        UIDataPortView.prototype._updateOutputConnectorWidth = function (subDataPortLength, inverse) {
            if (inverse === void 0) { inverse = false; }
            if (this._polygon !== undefined) {
                var points = UIShapes.outputDataPortPolygonPoints;
                if (subDataPortLength > 0) {
                    var width = UIDataPortView.kPortHalfWidth + subDataPortLength * UIDataPortView.kSpaceBetweenPorts;
                    points = inverse ? UIShapes.outputDataPortStretchableReversedPolygonPoints : UIShapes.outputDataPortStretchablePolygonPoints;
                    points = points.replace(new RegExp('x', 'g'), String(width));
                }
                this._polygon.setAttribute('points', points);
            }
        };
        /**
         * The callback on the connector mouse enter event.
         * @protected
         * @param {MouseEvent} event - The mouse enter event.
         */
        UIDataPortView.prototype._onMouseEnter = function (event) {
            _super.prototype._onMouseEnter.call(this, event);
            this._port.getParentGraph().highlightShortcuts(this._port);
        };
        /**
         * The callback on the connector mouse leave event.
         * @protected
         * @param {MouseEvent} event - The mouse leave event.
         */
        UIDataPortView.prototype._onMouseLeave = function (event) {
            _super.prototype._onMouseLeave.call(this, event);
            this._port.getParentGraph().unhighlightShortcuts(this._port);
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
         * Configures the shortcut link.
         * It is mainly a IE11 fix which does not handle svg matrix modification in css!
         * @private
         */
        UIDataPortView.prototype._configureShortcutLink = function () {
            var isGraphPort = this._port.getModel().block instanceof GraphBlock;
            var portType = this._port.getModel().getType();
            var isInput = portType === ModelEnums.EDataPortType.eInput;
            var UISubDataPortCtr = require('DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort');
            var isSubDataPort = this._port instanceof UISubDataPortCtr;
            var parentPort = isSubDataPort ? this._port.parentPort : this._port;
            var isInputLocal = portType === ModelEnums.EDataPortType.eLocal && parentPort.isInputLocal;
            var translateY = isSubDataPort ? 10.75 : 14;
            this._shortcut.setAttribute('transform', 'rotate(-90) translate(0 ' + translateY + ')');
            if ((isGraphPort && (isInput || isInputLocal)) || (!isGraphPort && !isInput)) {
                this._shortcutLine.setAttribute('y2', String(8));
                this._shortcutLine.setAttribute('transform', 'translate(0 -2.5)');
                this._shortcutText.setAttribute('transform', 'translate(6 13.8)');
                this._shortcutIcon.setAttribute('transform', 'rotate(90) translate(11 0) scale(0.1)');
            }
            else {
                this._shortcutLine.setAttribute('y2', String(13));
                this._shortcutLine.setAttribute('transform', 'translate(0 -7.4)');
                this._shortcutText.setAttribute('transform', 'rotate(180) translate(-6 -8.5)');
                this._shortcutIcon.setAttribute('transform', 'rotate(90) translate(11 0) scale(0.1)');
            }
        };
        UIDataPortView.kSpaceBetweenPorts = 20;
        UIDataPortView.kPortHalfWidth = 12 / 2;
        return UIDataPortView;
    }(UIPortView));
    return UIDataPortView;
});
