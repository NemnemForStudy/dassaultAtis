/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIConnectorView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIConnectorView", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphViews", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom"], function (require, exports, EGraphViews, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI connector view.
     * @class UIConnectorView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIConnectorView
     * @extends EGraphViews.SVGConnView
     * @private
     */
    var UIConnectorView = /** @class */ (function (_super) {
        __extends(UIConnectorView, _super);
        /**
         * @constructor
         */
        function UIConnectorView() {
            var _this = _super.call(this) || this;
            _this._mouseOver = false;
            _this._onMouseEnterCB = _this._onMouseEnter.bind(_this);
            _this._onMouseLeaveCB = _this._onMouseLeave.bind(_this);
            _this._onMouseUpCB = _this._onMouseUp.bind(_this);
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
         * Gets the SVG element representing the connector.
         * @public
         * @returns {SVGElement} The SVG element representing the connecor.
         */
        UIConnectorView.prototype.getElement = function () {
            return this.structure.root;
        };
        /**
         * Gets the bounding box of the connector.
         * @public
         * @returns {IDOMRect} The bounding box of the connector.
         */
        UIConnectorView.prototype.getBoundingBox = function () {
            var rect = this._element.getBoundingClientRect();
            return {
                left: rect.left, right: rect.right,
                top: rect.top, bottom: rect.bottom,
                width: rect.width, height: rect.height
            };
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
        // eslint-disable-next-line no-unused-vars
        UIConnectorView.prototype.ondestroyDisplay = function (elt, grView) {
            if (this.structure !== undefined && this.structure.root !== undefined) {
                this.structure.root.removeEventListener('mouseenter', this._onMouseEnterCB);
                this.structure.root.removeEventListener('mouseleave', this._onMouseLeaveCB);
                this.structure.root.removeEventListener('mouseup', this._onMouseUpCB);
            }
            this._element = undefined;
            this._mouseOver = undefined;
            this._onMouseEnterCB = undefined;
            this._onMouseLeaveCB = undefined;
            this._onMouseUpCB = undefined;
        };
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        // eslint-disable-next-line no-unused-vars
        UIConnectorView.prototype.buildConnElement = function (connector) {
            UIDom.addClassName(this.structure.root, 'sch-connector');
            this._element = UIDom.createSVGGroup();
            this.structure.root.addEventListener('mouseenter', this._onMouseEnterCB);
            this.structure.root.addEventListener('mouseleave', this._onMouseLeaveCB);
            this.structure.root.addEventListener('mouseup', this._onMouseUpCB);
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
        UIConnectorView.prototype.onmodifyDisplay = function (connector, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, connector, changes, grView);
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
        UIConnectorView.prototype.onpositionStructure = function (elt, nextWithView, grView, parentView) {
            _super.prototype.onpositionStructure.call(this, elt, nextWithView, grView, parentView);
        };
        /**
         * The callback on the connector mouse enter event.
         * @protected
         * @param {MouseEvent} event - The mouse enter event.
         */
        // eslint-disable-next-line no-unused-vars
        UIConnectorView.prototype._onMouseEnter = function (event) {
            this._mouseOver = true;
        };
        /**
         * The callback on the connector mouse leave event.
         * @protected
         * @param {MouseEvent} event - The mouse leave event.
         */
        // eslint-disable-next-line no-unused-vars
        UIConnectorView.prototype._onMouseLeave = function (event) {
            this._mouseOver = false;
        };
        /**
         * The callback on the connectore mouse up event.
         * @protected
         * @param {MouseEvent} event - The mouse up event.
         */
        // eslint-disable-next-line no-unused-vars, class-methods-use-this
        UIConnectorView.prototype._onMouseUp = function (event) { };
        /**
         * Checks if the mouse cursor is over the connector.
         * @protected
         * @returns {boolean} True if the mouse cursor is over the connector else false.
         */
        UIConnectorView.prototype._isMouseOver = function () {
            return this._mouseOver;
        };
        return UIConnectorView;
    }(EGraphViews.SVGConnView));
    return UIConnectorView;
});
