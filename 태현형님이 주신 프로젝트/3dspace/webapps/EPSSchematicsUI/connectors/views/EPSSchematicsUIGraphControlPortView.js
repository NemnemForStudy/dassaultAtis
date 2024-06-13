/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphControlPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphControlPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIControlPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/data/EPSSchematicsUIShapes", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "css!DS/EPSSchematicsUI/css/connectors/EPSSchematicsUIGraphControlPort"], function (require, exports, UIControlPortView, UIDom, UIShapes, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI graph control port view.
     * @class UIGraphControlPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphControlPortView
     * @extends UIControlPortView
     * @private
     */
    var UIGraphControlPortView = /** @class */ (function (_super) {
        __extends(UIGraphControlPortView, _super);
        /**
         * @constructor
         * @param {UIGraphControlPort} port - The UI block port.
         */
        function UIGraphControlPortView(port) {
            return _super.call(this, port) || this;
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
         * Updates the port name.
         * @public
         * @param {string} name - The port name.
         */
        UIGraphControlPortView.prototype.updatePortName = function (name) {
            this._computePortWidth(name);
            this._port.getDisplay().internalUpdate();
        };
        /**
         * Checks if the given element is part of the graph port's handler.
         * @public
         * @param {Element} element - The graph port element.
         * @returns {boolean} true if the element is part of the graph port's handler else false.
         */
        // eslint-disable-next-line class-methods-use-this
        UIGraphControlPortView.prototype.isHandler = function (element) {
            return element !== undefined && UIDom.hasClassName(element, 'sch-graph-port-handler');
        };
        /**
         * Gets the graph control port handler svg element.
         * @public
         * @returns {SVGElement} The graph control port handler.
         */
        UIGraphControlPortView.prototype.getHandler = function () {
            return this._handler;
        };
        /**
         * Gets the graph control port triangle svg element.
         * @public
         * @returns {SVGElement} The graph control port triangle svg element.
         */
        UIGraphControlPortView.prototype.getTriangle = function () {
            return this._triangle;
        };
        /**
         * Gets the port bounding box.
         * @public
         * @returns {IDOMRect} The port bounding box.
         */
        UIGraphControlPortView.prototype.getBoundingBox = function () {
            return this._background.getBoundingClientRect();
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
        UIGraphControlPortView.prototype.ondestroyDisplay = function (elt, grView) {
            this._background = undefined;
            this._title = undefined;
            this._triangle = undefined;
            this._handler = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIGraphControlPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-graph-port');
            var isInputPort = this._port.getModel().getType() === ModelEnums.EControlPortType.eInput;
            UIDom.addClassName(this._element, isInputPort ? 'sch-input-control-port' : 'sch-output-control-port');
            this._createBackground();
            this._createTitle();
            this._createTriangle();
            this._createHandler();
            this._computePortWidth(this._port.getModel().getName());
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
        UIGraphControlPortView.prototype.onmodifyDisplay = function (connector, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, connector, changes, grView);
            var graph = this._port.getParent();
            var topLimit = graph.getPaddingTop();
            var bottomLimit = graph.getHeight() - graph.getPaddingBottom() - UIGraphControlPortView.kPortHeight;
            if (connector.offset < topLimit) {
                graph.updateSizeFromControlPorts();
                this._port.setOffset(topLimit);
            }
            else if (connector.offset > bottomLimit) {
                graph.updateSizeFromControlPorts();
            }
        };
        /**
         * The callback on the connector structure positionning.
         * @protected
         * @override
         * @param {EGraphCore.Connector} elt - The element using this view.
         * @param {EGraphCore.Connector} nextWithView - The next sibling of element.
         * @param {EGraphCore.GraphView} grView - The graph view.
         * @param {EGraphViews.PerEltView} parentView - The view of the parent of the element.
         */
        UIGraphControlPortView.prototype.onpositionStructure = function (elt, nextWithView, grView, parentView) {
            _super.prototype.onpositionStructure.call(this, elt, nextWithView, grView, parentView);
            // Force update to refresh border constraint after port dimension be correctly computed.
            this._port.getDisplay().internalUpdate();
        };
        /**
         * Creates the port background.
         * @protected
         */
        UIGraphControlPortView.prototype._createBackground = function () {
            this._background = UIDom.createSVGRect({
                className: 'background',
                parent: this._element,
                attributes: {
                    x: 0, y: 0, rx: 2, ry: 2,
                    width: UIGraphControlPortView.kPortWidth,
                    height: UIGraphControlPortView.kPortHeight
                }
            });
        };
        /**
         * Create the port title.
         * @protected
         */
        UIGraphControlPortView.prototype._createTitle = function () {
            this._title = UIDom.createSVGText({
                className: 'title',
                attributes: { dy: 4.2 },
                parent: this._element
            });
        };
        /**
         * Creates the port triangle.
         * @protected
         */
        UIGraphControlPortView.prototype._createTriangle = function () {
            this._triangle = UIDom.createSVGPolygon({
                className: 'sch-graph-port-triangle',
                parent: this._element,
                attributes: { points: UIShapes.controlPortPolygonPoints }
            });
        };
        /**
         * Creates the port handler.
         * @protected
         */
        UIGraphControlPortView.prototype._createHandler = function () {
            this._handler = UIDom.createSVGRect({
                className: 'sch-graph-port-handler',
                parent: this._element,
                attributes: {
                    x: 0, y: 0,
                    width: UIGraphControlPortView.kPortWidth,
                    height: UIGraphControlPortView.kPortHeight
                }
            });
        };
        /**
         * Computes the port background.
         * @protected
         */
        UIGraphControlPortView.prototype._computeBackground = function () {
            var parentClassNames = ['sch-graph-port', 'sch-input-control-port'];
            var titleBBox = UIDom.renderedSVGBBox(this._title, parentClassNames); // Compute offscreen SVG bounding boxes
            var bgWidth = titleBBox.width + UIGraphControlPortView._kPortTriangleHeight + UIGraphControlPortView._kPortTriangleOffset + 2 * UIGraphControlPortView.kPortWidthOffset;
            this._background.setAttribute('width', String(bgWidth));
        };
        /**
         * Computes the port title.
         * @private
         */
        UIGraphControlPortView.prototype._computeTitle = function () {
            var titleLeft = this._port.isStartPort() ? UIGraphControlPortView.kPortWidthOffset : UIGraphControlPortView.kPortLeftOffset + UIGraphControlPortView.kPortWidthOffset;
            var titleTop = UIGraphControlPortView.kPortHeight / 2;
            this._title.setAttribute('x', String(titleLeft));
            this._title.setAttribute('y', String(titleTop));
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
         * Computes the port triangle.
         * @private
         */
        UIGraphControlPortView.prototype._computeTriangle = function () {
            var bgWidth = parseFloat(this._background.getAttribute('width'));
            var triangleHeight = UIGraphControlPortView._kPortTriangleHeight;
            var triangleOffset = UIGraphControlPortView._kPortTriangleOffset;
            var triangleLeft = this._port.isStartPort() ? bgWidth - triangleOffset : triangleOffset + triangleHeight;
            var triangleTop = (UIGraphControlPortView.kPortHeight / 2);
            this._triangle.setAttribute('transform', 'translate(' + triangleLeft + ' ' + triangleTop + ') rotate(180)');
        };
        /**
         * Computes the port handler.
         * @private
         */
        UIGraphControlPortView.prototype._computeHandler = function () {
            var bgWidth = parseFloat(this._background.getAttribute('width'));
            var width = bgWidth - UIGraphControlPortView.kPortLeftOffset;
            var left = this._port.isStartPort() ? 0 : UIGraphControlPortView.kPortLeftOffset;
            this._handler.setAttribute('width', String(width));
            this._handler.setAttribute('x', String(left));
        };
        /**
         * Computes the port reroute handler.
         * @private
         */
        UIGraphControlPortView.prototype._computeRerouteHandler = function () {
            var bgWidth = parseFloat(this._background.getAttribute('width'));
            var left = this._port.isStartPort() ? bgWidth - UIGraphControlPortView._kPortRerouteHandlerWidth / 2 : -UIGraphControlPortView._kPortRerouteHandlerWidth / 2;
            var top = UIGraphControlPortView.kPortHeight / 2 - UIGraphControlPortView._kPortRerouteHandlerHeight / 2;
            this._setRerouteHandlerPosition(left, top);
        };
        /**
         * Computes the width of the port.
         * @private
         * @param {string} name - The port name.
         */
        UIGraphControlPortView.prototype._computePortWidth = function (name) {
            this._updateTitle(name);
            this._computeBackground();
            this._computeTitle();
            this._computeTriangle();
            this._computeHandler();
            this._computeRerouteHandler();
        };
        /**
         * Updates the port title.
         * @private
         * @param {string} name - The port name.
         */
        UIGraphControlPortView.prototype._updateTitle = function (name) {
            this._title.textContent = name;
        };
        UIGraphControlPortView.kPortWidth = 100;
        UIGraphControlPortView.kPortHeight = 20;
        UIGraphControlPortView.kPortLeftOffset = 20;
        UIGraphControlPortView.kPortWidthOffset = 5;
        UIGraphControlPortView._kPortTriangleHeight = 15;
        UIGraphControlPortView._kPortTriangleOffset = 1.5;
        UIGraphControlPortView._kPortRerouteHandlerWidth = 4;
        UIGraphControlPortView._kPortRerouteHandlerHeight = 4;
        return UIGraphControlPortView;
    }(UIControlPortView));
    return UIGraphControlPortView;
});
