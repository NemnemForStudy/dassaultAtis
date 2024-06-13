/// <amd-module name='DS/EPSSchematicsUI/labels/EPSSchematicsUILinkLabel'/>
define("DS/EPSSchematicsUI/labels/EPSSchematicsUILinkLabel", ["require", "exports"], function (require, exports) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: Fix issue with show direct when mouse is already on link and ctrl key is pressed!
    // TODO: When port is not inside view, make label line intersect between the link and the view!
    /**
     * This class defines a UI link label.
     * @class UILinkLabel
     * @alias module:DS/EPSSchematicsUI/labels/EPSSchematicsUILinkLabel
     * @abstract
     * @private
     */
    var UILinkLabel = /** @class */ (function () {
        /**
         * @constructor
         * @param {UILabelController} controller - The UI label controller.
         * @param {UILink} linkUI - The UI link.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         */
        function UILinkLabel(controller, linkUI, displaySpeed) {
            this._controller = controller;
            this._linkUI = linkUI;
            this._displaySpeed = displaySpeed;
            this._createElement();
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
         * Removes the link label.
         * @public
         */
        UILinkLabel.prototype.remove = function () {
            if (this._startPortLabel !== undefined) {
                this._startPortLabel.remove();
            }
            if (this._endPortLabel !== undefined) {
                this._endPortLabel.remove();
            }
            this._controller = undefined;
            this._linkUI = undefined;
            this._displaySpeed = undefined;
            this._startPortLabel = undefined;
            this._endPortLabel = undefined;
        };
        /**
         * Gets the UI link.
         * @returns {UILink} The UI link.
         */
        UILinkLabel.prototype.getUILink = function () {
            return this._linkUI;
        };
        /**
         * Gets the start port label.
         * @public
         * @returns {UIPortLabel} The start port label.
         */
        UILinkLabel.prototype.getStartPortLabel = function () {
            return this._startPortLabel;
        };
        /**
         * Gets the end port label.
         * @public
         * @returns {UIPortLabel} The end port label.
         */
        UILinkLabel.prototype.getEndPortLabel = function () {
            return this._endPortLabel;
        };
        /**
         * Gets the label display speed.
         * @public
         * @returns {UIEnums.ELabelDisplaySpeed} The label display speed.
         */
        UILinkLabel.prototype.getDisplaySpeed = function () {
            return this._displaySpeed;
        };
        /**
         * Updates the start/end label and lines position.
         * @public
         * @param {IViewpoint} vpt - The current graph viewpoint.
         * @param {number} startLeft - The left start label position.
         * @param {number} startTop - The top start label position.
         * @param {number} endLeft - The left end label position.
         * @param {number} endTop - The top end label position.
         */
        UILinkLabel.prototype.updatePosition = function (vpt, startLeft, startTop, endLeft, endTop) {
            if (startLeft === void 0) { startLeft = 0; }
            if (startTop === void 0) { startTop = 0; }
            if (endLeft === void 0) { endLeft = 0; }
            if (endTop === void 0) { endTop = 0; }
            // Crop default label position to the graph viewer
            var startCropped = this._getCroppedPosition(this._startPortLabel, startLeft, startTop);
            var endCropped = this._getCroppedPosition(this._endPortLabel, endLeft, endTop);
            // Set the start and end label position
            this._startPortLabel.setPosition(startCropped.left, startCropped.top);
            this._endPortLabel.setPosition(endCropped.left, endCropped.top);
            // Set the start and end line position
            this._startPortLabel.updateLinePosition(vpt);
            this._endPortLabel.updateLinePosition(vpt);
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
         * Creates the link label element.
         * @protected
         */
        UILinkLabel.prototype._createElement = function () {
            this._startPortLabel.disableFadeWithDistance();
            this._endPortLabel.disableFadeWithDistance();
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
         * Gets the label position cropped to the graph viewer borders.
         * @private
         * @param {UIPortLabel} labelUI - The UI data or control port label.
         * @param {number} left - The left port label position.
         * @param {number} top - The top port label position.
         * @returns {IDomPosition} The cropped label position.
         */
        UILinkLabel.prototype._getCroppedPosition = function (labelUI, left, top) {
            var parentBBox = this._linkUI.getParentGraph().getViewer().getClientRect();
            var labelBBox = labelUI.getElement().getBoundingClientRect();
            var leftLimit = 0;
            var topLimit = 0;
            var rightLimit = parentBBox.width - labelBBox.width;
            var bottomLimit = parentBBox.height - labelBBox.height;
            left = left < leftLimit ? leftLimit : left;
            left = left > rightLimit ? rightLimit : left;
            top = top < topLimit ? topLimit : top;
            top = top > bottomLimit ? bottomLimit : top;
            return { left: left, top: top };
        };
        return UILinkLabel;
    }());
    return UILinkLabel;
});
