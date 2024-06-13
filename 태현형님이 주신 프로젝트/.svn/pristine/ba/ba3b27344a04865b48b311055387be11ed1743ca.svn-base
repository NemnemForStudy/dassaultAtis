/// <amd-module name='DS/EPSSchematicsUI/edges/views/EPSSchematicsUIControlLinkView'/>
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
define("DS/EPSSchematicsUI/edges/views/EPSSchematicsUIControlLinkView", ["require", "exports", "DS/EPSSchematicsUI/edges/views/EPSSchematicsUILinkView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/edges/EPSSchematicsUIControlLink"], function (require, exports, UILinkView, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI control link view.
     * @class UIControlLinkView
     * @alias module:DS/EPSSchematicsUI/edges/views/EPSSchematicsUIControlLinkView
     * @extends UILinkView
     * @private
     */
    var UIControlLinkView = /** @class */ (function (_super) {
        __extends(UIControlLinkView, _super);
        /**
         * @constructor
         * @param {UIControlLink} link - The UI control link.
         */
        function UIControlLinkView(link) {
            var _this = _super.call(this, link, 'sch-control-link-path') || this;
            _this._onMouseMoveCB = _this._onMouseMove.bind(_this);
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
         * The callback on the control link wait count change event.
         * @public
         */
        UIControlLinkView.prototype.onWaitCountChange = function () {
            this._updateFramesBreakDisplay();
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
         * Removes the link view.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UIControlLinkView.prototype.ondestroyDisplay = function (elt, grView) {
            if (this.structure.root !== undefined && this.structure.root !== null) {
                this.structure.root.removeEventListener('mousemove', this._onMouseMoveCB);
            }
            this._waitCount = undefined;
            this._onMouseMoveCB = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Creates the link view.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UIControlLinkView.prototype.oncreateDisplay = function (elt, grView) {
            _super.prototype.oncreateDisplay.call(this, elt, grView);
            UIDom.addClassName(this.structure.root, 'sch-control-link');
            this._updateFramesBreakDisplay();
            this.structure.root.addEventListener('mousemove', this._onMouseMoveCB);
        };
        /**
         * The callback to apply modified properties to the display.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.PathSetTrie} changes - Set of paths of modified properties.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UIControlLinkView.prototype.onmodifyDisplay = function (elt, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, elt, changes, grView);
            this._updateFramesBreakPosition();
        };
        /**
         * The callback on the link view mouse enter event.
         * @protected
         * @param {MouseEvent} event - The mouse enter event.
         */
        UIControlLinkView.prototype._onMouseEnter = function (event) {
            _super.prototype._onMouseEnter.call(this, event);
            this._updateCursor(event.clientX, event.clientY);
        };
        /**
         * The callback on the link view mouse leave event.
         * @protected
         */
        UIControlLinkView.prototype._onMouseLeave = function () {
            _super.prototype._onMouseLeave.call(this);
            this._clearCursor();
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
         * The callback on the link view mouse move event.
         * @private
         * @param {MouseEvent} event - The mouse move event.
         */
        UIControlLinkView.prototype._onMouseMove = function (event) {
            this._updateCursor(event.clientX, event.clientY);
        };
        /**
         * Updates the mouse cursor on the link view.
         * @private
         * @param {number} clientX - The mouse x position.
         * @param {number} clientY - The mouse y position.
         */
        UIControlLinkView.prototype._updateCursor = function (clientX, clientY) {
            this._clearCursor();
            var mousePos = this._link.getParentGraph().getViewer().clientToViewpoint(clientX, clientY);
            var isVertical = this._link.getDisplay().geometry.isSegmentVertical(this._link.getDisplay(), mousePos[0], mousePos[1]);
            if (isVertical !== undefined) {
                UIDom.addClassName(this.structure.root, isVertical ? 'vertical' : 'horizontal');
            }
        };
        /**
         * Clears the mouse cursor from the link view.
         * @private
         */
        UIControlLinkView.prototype._clearCursor = function () {
            UIDom.removeClassName(this.structure.root, ['vertical', 'horizontal']);
        };
        /**
         * Updates the frames break position to be centered on the link's path.
         * @private
         */
        UIControlLinkView.prototype._updateFramesBreakPosition = function () {
            if (this._waitCount !== undefined) {
                var elt = this._link.getDisplay();
                var middle = parseInt(String(elt.path.length / 2));
                var startPoint = { left: elt.path[middle - 2], top: elt.path[middle - 1] };
                var endPoint = { left: elt.path[middle + 1], top: elt.path[middle + 2] };
                var fbLeft = startPoint.left + ((endPoint.left - startPoint.left) / 2);
                var fbTop = startPoint.top + ((endPoint.top - startPoint.top) / 2);
                var transform = this._waitCount.transform.baseVal.getItem(0);
                transform.matrix.e = fbLeft;
                transform.matrix.f = fbTop;
            }
        };
        /**
         * Updates the UI Control Link display of the framesBreak.
         * @private
         */
        UIControlLinkView.prototype._updateFramesBreakDisplay = function () {
            var options = this._link.getParentGraph().getEditor().getOptions();
            if (options.enableFramebreaks) {
                var enableWaitCount = this._link.getModel().getWaitCount() > 0;
                if (this._waitCount !== undefined && !enableWaitCount) {
                    this._waitCount.parentNode.removeChild(this._waitCount);
                    this._waitCount = undefined;
                }
                else if (enableWaitCount) {
                    var circle = UIDom.createSVGCircle({
                        className: 'sch-control-link-circle',
                        attributes: { cx: 0, cy: 0, r: 8 }
                    });
                    var line1 = UIDom.createSVGLine({
                        className: 'sch-control-link-line',
                        attributes: { x1: 0, y1: 0, x2: 0, y2: -7 }
                    });
                    var line2 = UIDom.createSVGLine({
                        className: 'sch-control-link-line',
                        attributes: { x1: 0, y1: 0, x2: 4, y2: 5 }
                    });
                    this._waitCount = UIDom.createSVGGroup({
                        className: 'sch-control-link-waitcount',
                        parent: this.structure.root,
                        children: [circle, line1, line2],
                        attributes: { transform: 'matrix(1 0 0 1 0 0)' }
                    });
                    this.display.waitCount = this._waitCount;
                    this.display.waitCount.grElt = this._link.getDisplay();
                    this.display.waitCount.subElt = 'waitCount';
                    this._updateFramesBreakPosition();
                }
            }
        };
        return UIControlLinkView;
    }(UILinkView));
    return UIControlLinkView;
});
