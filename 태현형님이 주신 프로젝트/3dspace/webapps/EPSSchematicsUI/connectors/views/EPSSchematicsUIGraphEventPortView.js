/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphEventPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphEventPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphControlPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/data/EPSSchematicsUIShapes"], function (require, exports, UIGraphControlPortView, UIDom, UIShapes) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined the customized default view for a UI graph event port.
     * @class UIGraphEventPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphEventPortView
     * @extends UIGraphControlPortView
     * @private
     * @param {UIGraphEventPort} port - The UI block port.
     * @param {EventPort} model - The event port model.
     */
    var UIGraphEventPortView = /** @class */ (function (_super) {
        __extends(UIGraphEventPortView, _super);
        /**
         * @constructor
         * @param {UIGraphEventPort} port - The UI block port.
         */
        function UIGraphEventPortView(port) {
            var _this = _super.call(this, port) || this;
            _this.kPortIconOffset = 2;
            return _this;
        }
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
        UIGraphEventPortView.prototype.ondestroyDisplay = function (elt, grView) {
            this._icon = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Creates the port background.
         * @protected
         */
        UIGraphEventPortView.prototype._createBackground = function () {
            _super.prototype._createBackground.call(this);
            this._createIcon();
        };
        /**
         * Creates the port triangle.
         * @protected
         */
        UIGraphEventPortView.prototype._createTriangle = function () {
            this._triangle = UIDom.createSVGPath({
                className: 'sch-graph-port-triangle',
                attributes: { d: UIShapes.eventPortPathPoints },
                parent: this._element
            });
        };
        /**
         * Computes the port background.
         * @protected
         */
        UIGraphEventPortView.prototype._computeBackground = function () {
            _super.prototype._computeBackground.call(this);
            // Update the background by adding the icon width.
            var bgWidth = parseFloat(this._background.getAttribute('width'));
            bgWidth += this.kPortIconOffset + this._getIconWidth() - UIGraphControlPortView.kPortWidthOffset;
            this._background.setAttribute('width', String(bgWidth));
            this._computeIcon();
        };
        /**
         * Computes the port title.
         * @protected
         */
        UIGraphEventPortView.prototype._computeTitle = function () {
            _super.prototype._computeTitle.call(this);
            if (this._port.isStartPort()) { // Override the title left position
                var titleLeft = this.kPortIconOffset + this._getIconWidth();
                this._title.setAttribute('x', String(titleLeft));
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
         * Gets the port icon width.
         * @private
         * @returns {number} The port icon width.
         */
        UIGraphEventPortView.prototype._getIconWidth = function () {
            var parentClassNames = ['sch-graph-port', 'sch-input-control-port'];
            var iconBBox = UIDom.renderedSVGBBox(this._icon, parentClassNames);
            return iconBBox.width;
        };
        /**
        * Computes the port icon.
        * @private
        */
        UIGraphEventPortView.prototype._computeIcon = function () {
            var bgWidth = parseFloat(this._background.getAttribute('width'));
            var iconWidth = this._getIconWidth();
            var iconLeft = this._port.isStartPort() ? this.kPortIconOffset : bgWidth - iconWidth + this.kPortIconOffset;
            var iconTop = (UIGraphControlPortView.kPortHeight / 2);
            this._icon.setAttribute('x', iconLeft.toString());
            this._icon.setAttribute('y', iconTop.toString());
        };
        /**
         * Creates the port icon.
         * @private
         */
        UIGraphEventPortView.prototype._createIcon = function () {
            this._icon = UIDom.createSVGText({
                className: 'icon',
                textContent: this._port.isStartPort() ? '\uf1eb' : '\uf0a1',
                parent: this._element,
                attributes: { dy: 4.2 }
            });
        };
        return UIGraphEventPortView;
    }(UIGraphControlPortView));
    return UIGraphEventPortView;
});
