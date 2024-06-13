/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphContainerBlockView'/>
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
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphContainerBlockView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIBlockView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary"], function (require, exports, UIBlockView, UIDom, BlockLibrary) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph container block view.
     * @private
     * @class UIGraphContainerBlockView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphContainerBlockView
     * @extends UIBlockView
     */
    var UIGraphContainerBlockView = /** @class */ (function (_super) {
        __extends(UIGraphContainerBlockView, _super);
        /**
         * @public
         * @constructor
         * @param {UIGraphContainerBlock} block - The UI graph container block.
         */
        function UIGraphContainerBlockView(block) {
            var _this = _super.call(this, block) || this;
            _this._blockNameRef = BlockLibrary.getBlock(block.getModel().getUid()).getName();
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
         * This method gets the block sub name element.
         * @public
         * @returns {HTMLDivElement} The block sub name element.
         */
        UIGraphContainerBlockView.prototype.getBlockSubNameElement = function () {
            return this._blockSubNameElt;
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
         * The callback on the node display modification.
         * @protected
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.PathSetTrie} changes - Changes set of paths of modified properties.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UIGraphContainerBlockView.prototype.onmodifyDisplay = function (elt, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, elt, changes, grView);
            this._updateBlockSubName();
        };
        /**
         * Creates the block container.
         * @private
         */
        UIGraphContainerBlockView.prototype._createBlockContainer = function () {
            _super.prototype._createBlockContainer.call(this);
            this._updateBlockSubName();
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
         * Checks if the user block name is identical to the block sub name reference.
         * @private
         * @returns {boolean} True if block name is identical to block sub name.
         */
        UIGraphContainerBlockView.prototype._areBlockNameIdentical = function () {
            return this._block.getModel().getName() === this._blockNameRef;
        };
        /**
         * Updates the display of the block sub name.
         * @private
         */
        UIGraphContainerBlockView.prototype._updateBlockSubName = function () {
            if (this._blockSubNameElt !== undefined) {
                this._blockContainerMiddleCenter.removeChild(this._blockSubNameElt);
                this._blockSubNameElt = undefined;
            }
            if (!this._areBlockNameIdentical()) {
                this._blockSubNameElt = UIDom.createElement('div', {
                    className: 'sch-block-subname',
                    parent: this._blockContainerMiddleCenter,
                    textContent: this._blockNameRef
                });
            }
        };
        return UIGraphContainerBlockView;
    }(UIBlockView));
    return UIGraphContainerBlockView;
});
