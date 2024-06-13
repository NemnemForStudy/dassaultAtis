/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUILabelController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUILabelController", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/labels/EPSSchematicsUIBlockLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIDataLinkLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIControlLinkLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIControlPortLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIDataPortLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIGraphTestDataPortLabel", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestSubDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsDataLink", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/edges/EPSSchematicsUILink", "css!DS/EPSSchematicsUI/css/controllers/EPSSchematicsUILabelController"], function (require, exports, UIDom, UIBlockLabel, UIDataLinkLabel, UIControlLinkLabel, UIControlPortLabel, UIDataPortLabel, UIGraphTestDataPortLabel, UIGraphTestDataPort, UIGraphTestSubDataPort, DataLink, DataPort, UIBlock, UILink) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the Label Controller.
     * @class UILabelController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUILabelController
     * @private
     */
    var UILabelController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIViewer} viewer - The viewer.
         */
        function UILabelController(viewer) {
            this._viewer = viewer;
            this._labelContainerElt = UIDom.createElement('div', {
                className: 'sch-label-container',
                parent: this._viewer.getContainer()
            });
            this._lineContainerElt = UIDom.createSVGElement({ className: 'sch-label-line-container', parent: this._labelContainerElt });
        }
        /**
         * Removes the controller.
         * @public
         */
        UILabelController.prototype.remove = function () {
            this.clearAllLabels();
            this._viewer = undefined;
            this._blockLabel = undefined;
            this._linkLabel = undefined;
            this._portLabel = undefined;
            this._labelContainerElt = undefined;
            this._lineContainerElt = undefined;
        };
        /**
         * Clears all the displayed labels.
         * @public
         * @param {boolean} [skipPortLabel=false] - True to skip the port label else false.
         */
        UILabelController.prototype.clearAllLabels = function (skipPortLabel) {
            if (skipPortLabel === void 0) { skipPortLabel = false; }
            if (this._linkLabel !== undefined) {
                this._linkLabel.remove();
                this._linkLabel = undefined;
            }
            if (this._blockLabel !== undefined) {
                this._blockLabel.remove();
                this._blockLabel = undefined;
            }
            if (this._portLabel !== undefined && !skipPortLabel) {
                this._portLabel.remove();
                this._portLabel = undefined;
            }
        };
        /**
         * Clears the port label without calling the remove function.
         * The remove function will be called by the port label itself as it fades out!
         * @public
         */
        UILabelController.prototype.clearPortLabelWithoutRemove = function () {
            this._portLabel = undefined;
        };
        /**
         * Gets the block labels bounding box.
         * @public
         * @returns {IDOMRect} The block labels bounding box.
         */
        UILabelController.prototype.getBlockLabelsBoundingBox = function () {
            return this._blockLabel.getBoundingBox();
        };
        /**
         * Displays the block labels.
         * @public
         * @param {UIBlock} blockUI - The UI block.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         */
        UILabelController.prototype.displayBlockLabels = function (blockUI, displaySpeed) {
            var result = blockUI !== undefined;
            result = result && (this._blockLabel === undefined || this._blockLabel.getUIBlock() !== blockUI);
            result = result && this._portLabel === undefined;
            if (result) {
                this.clearAllLabels();
                this._blockLabel = new UIBlockLabel(this, blockUI, displaySpeed);
                this._blockLabel.updatePosition(this._viewer.getViewpoint());
            }
        };
        /**
         * Displays the link labels.
         * @public
         * @param {UILink} linkUI - The UI link.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         */
        UILabelController.prototype.displayLinkLabels = function (linkUI, displaySpeed) {
            var result = linkUI !== undefined;
            result = result && (this._linkLabel === undefined || this._linkLabel.getUILink() !== linkUI);
            result = result && this._portLabel === undefined;
            if (result) {
                this.clearAllLabels();
                var isDataLink = linkUI.getModel() instanceof DataLink;
                if (isDataLink) {
                    this._linkLabel = new UIDataLinkLabel(this, linkUI, displaySpeed);
                }
                else {
                    this._linkLabel = new UIControlLinkLabel(this, linkUI, displaySpeed);
                }
                this._linkLabel.updatePosition(this._viewer.getViewpoint());
            }
        };
        /**
         * Displays the port label.
         * @public
         * @param {UIPort} portUI - The UI port.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         */
        UILabelController.prototype.displayPortLabel = function (portUI, displaySpeed) {
            var result = portUI !== undefined;
            result = result && (this._portLabel === undefined || this._portLabel.getUIPort() !== portUI);
            if (result) {
                this.clearAllLabels();
                var isDataPort = portUI.getModel() instanceof DataPort;
                if (isDataPort) {
                    var isDataTestPort = isDataPort && (portUI instanceof UIGraphTestDataPort || portUI instanceof UIGraphTestSubDataPort);
                    if (isDataTestPort) {
                        this._portLabel = new UIGraphTestDataPortLabel(this, portUI, displaySpeed, true);
                    }
                    else {
                        this._portLabel = new UIDataPortLabel(this, portUI, displaySpeed, true);
                    }
                }
                else {
                    this._portLabel = new UIControlPortLabel(this, portUI, displaySpeed, true);
                }
                this._portLabel.updatePosition(this._viewer.getViewpoint());
            }
        };
        /**
         * Displays the UI element corresponding label.
         * @public
         * @param {UIPort|UIBlock|UILink} uiElement - The UI element.
         * @param {boolean} showDirect - True to show the label without fade in effect else false.
         * @param {Element} [subElt] - The sub element.
         */
        UILabelController.prototype.displayLabel = function (uiElement, showDirect, subElt) {
            var displaySpeed = 0 /* eDirect */;
            if (this._viewer.getContextualBarController().isContextualBarDisplayed()) {
                this.clearAllLabels();
            }
            else if (uiElement instanceof UIBlock && uiElement.getView().isBlockContainer(subElt)) {
                displaySpeed = showDirect ? displaySpeed : 2 /* eSlow */;
                this.displayBlockLabels(uiElement, displaySpeed);
            }
            else if (uiElement instanceof UILink) {
                displaySpeed = showDirect ? displaySpeed : 1 /* eFast */;
                this.displayLinkLabels(uiElement, displaySpeed);
            }
            else {
                this.clearAllLabels(true);
            }
        };
        /**
         * Updates the labels position.
         * @public
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UILabelController.prototype.updateLabels = function (vpt) {
            if (this._blockLabel !== undefined) {
                this._blockLabel.updatePosition(vpt);
            }
            if (this._linkLabel !== undefined) {
                this._linkLabel.updatePosition(vpt);
            }
            if (this._portLabel !== undefined) {
                this._portLabel.updatePosition(vpt);
            }
        };
        /**
         * Shows the labels without fade in effect.
         * @public
         */
        UILabelController.prototype.directShowLabels = function () {
            if (this._portLabel !== undefined) {
                this._portLabel.updateDisplaySpeed(0 /* eDirect */);
            }
        };
        /**
         * Adds the label element to the controller.
         * @public
         * @param {HTMLElement} labelElt - The label element.
         */
        UILabelController.prototype.addLabelToContainer = function (labelElt) {
            this._labelContainerElt.appendChild(labelElt);
        };
        /**
         * Removes the label element from the controller.
         * @public
         * @param {HTMLElement} labelElt - The label element.
         */
        UILabelController.prototype.removeLabelFromContainer = function (labelElt) {
            this._labelContainerElt.removeChild(labelElt);
        };
        /**
         * Adds the line element to the controller.
         * @public
         * @param {SVGLineElement} lineElt - The line element.
         */
        UILabelController.prototype.addLineToContainer = function (lineElt) {
            this._lineContainerElt.appendChild(lineElt);
        };
        /**
         * Removes the line element from the controller.
         * @public
         * @param {SVGLineElement} lineElt - The line element.
         */
        UILabelController.prototype.removeLineFromContainer = function (lineElt) {
            this._lineContainerElt.removeChild(lineElt);
        };
        /**
         * Gets the block label.
         * @public
         * @returns {UIBlockLabel} The block label.
         */
        UILabelController.prototype.getBlockLabel = function () {
            return this._blockLabel;
        };
        /**
         * Gets the link label.
         * @public
         * @returns {UILinkLabel} The link label.
         */
        UILabelController.prototype.getLinkLabel = function () {
            return this._linkLabel;
        };
        /**
         * Gets the port label.
         * @public
         * @returns {UIPortLabel} The port label.
         */
        UILabelController.prototype.getPortLabel = function () {
            return this._portLabel;
        };
        /**
         * Gets the UI viewer.
         * @public
         * @returns {UIViewer|UIThumbnailViewer} The UI viewer.
         */
        UILabelController.prototype.getViewer = function () {
            return this._viewer;
        };
        return UILabelController;
    }());
    return UILabelController;
});
