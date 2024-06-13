/// <amd-module name='DS/EPSSchematicsUI/labels/EPSSchematicsUIPortLabel'/>
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define("DS/EPSSchematicsUI/labels/EPSSchematicsUIPortLabel", ["require", "exports", "DS/EPSSchematicsUI/components/EPSSchematicsUIFadeOutContainer", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "css!DS/EPSSchematicsUI/css/labels/EPSSchematicsUIPortLabel"], function (require, exports, UIFadeOutContainer, UIDom, UIFontIcon, UIWUXTools, UIGraph, DataPort, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: Manage enumeration (display in blue as number but with the string value)! see UITypesCatalog.getStringValue!
    // TODO: Margin when the label is close to the window border!
    // TODO: Highlight (or cursor change) on the evaluator title to show the title is expandable!
    // TODO: Then manage Ctrl key press to direct show label ok for port but ko for block and link!
    // TODO: Persist label inside graph => https://bl.ocks.org/Jverma/2385cb7794d18c51e3ab
    /**
     * This class defines a UI port label.
     * @class UIPortLabel
     * @alias module:DS/EPSSchematicsUI/labels/EPSSchematicsUIPortLabel
     * @extends UIFadeOutContainer
     * @abstract
     * @private
     */
    var UIPortLabel = /** @class */ (function (_super) {
        __extends(UIPortLabel, _super);
        /**
         * @constructor
         * @param {UILabelController} controller - The UI label controller.
         * @param {UIPort} portUI - The UI port.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         * @param {boolean} soloDisplay - Whether the label is displayed solo.
         */
        function UIPortLabel(controller, portUI, displaySpeed, soloDisplay) {
            var _this = _super.call(this) || this;
            _this._controller = controller;
            _this._portUI = portUI;
            _this._displaySpeed = displaySpeed;
            _this._soloDisplay = soloDisplay;
            var UIThumbnailViewerCtor = require('../viewers/EPSSchematicsUIThumbnailViewer');
            _this._isThumbnailViewer = _this._controller.getViewer() instanceof UIThumbnailViewerCtor;
            _this._createElement();
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
         * Removes the port label.
         * @public
         */
        UIPortLabel.prototype.remove = function () {
            if (this._controller) {
                this._controller.clearPortLabelWithoutRemove();
                this._controller.removeLabelFromContainer(this._element);
                this._controller.removeLineFromContainer(this._line);
                this._controller = undefined;
            }
            this._portUI = undefined;
            this._displaySpeed = undefined;
            this._soloDisplay = undefined;
            this._isThumbnailViewer = undefined;
            this._line = undefined;
            this._initialDistance = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the UI port.
         * @public
         * @returns {UIPort} portUI - The UI port.
         */
        UIPortLabel.prototype.getUIPort = function () {
            return this._portUI;
        };
        /**
         * Updates the display speed of the label.
         * @public
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         */
        UIPortLabel.prototype.updateDisplaySpeed = function (displaySpeed) {
            var isDirect = displaySpeed === 0 /* eDirect */;
            var isSlow = displaySpeed === 2 /* eSlow */;
            var classNameToAdd = isDirect ? 'sch-label-show-direct' : (isSlow ? 'sch-label-show-slow' : 'sch-label-show-fast');
            var classNameToRemove = ['sch-label-show-direct', 'sch-label-show-slow', 'sch-label-show-fast'];
            UIDom.removeClassName(this._element, classNameToRemove);
            UIDom.removeClassName(this._line, classNameToRemove);
            UIDom.addClassName(this._element, classNameToAdd);
            UIDom.addClassName(this._line, classNameToAdd);
        };
        /**
         * Updates the position of the port label and its line.
         * @public
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UIPortLabel.prototype.updatePosition = function (vpt) {
            this._updateLabelPosition(vpt);
            this.updateLinePosition(vpt);
        };
        /**
         * Sets the label position.
         * @public
         * @param {number} left: The left position of the label.
         * @param {number} top: The top position of the label.
         */
        UIPortLabel.prototype.setPosition = function (left, top) {
            _super.prototype.setPosition.call(this, left, top);
            // Set the minimum label width
            var labelBBox = this._element.getBoundingClientRect();
            this._element.style.width = labelBBox.width + 'px';
        };
        /**
         * Gets the port label line element.
         * @public
         * @returns {SVGLineElement} The port label line element.
         */
        UIPortLabel.prototype.getLine = function () {
            return this._line;
        };
        /**
         * Gets the label display speed.
         * @public
         * @returns {UIEnums.ELabelDisplaySpeed} The label display speed.
         */
        UIPortLabel.prototype.getDisplaySpeed = function () {
            return this._displaySpeed;
        };
        /**
         * Gets the label controller.
         * @public
         * @returns {UILabelController} The label controller.
         */
        UIPortLabel.prototype.getLabelController = function () {
            return this._controller;
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
         * Fades the container according to the mouse position.
         * @protected
         * @param {number} mouseLeft - The left position of the mouse.
         * @param {number} mouseTop - The top position of the mouse.
         * @param {HTMLElement} target - The target mouse element.
         */
        UIPortLabel.prototype._fadeWithDistance = function (mouseLeft, mouseTop, target) {
            if (!this._isFadeDisabled) {
                var distance = UIDom.computeDistanceFromMouse(this._element, mouseLeft, mouseTop);
                if (this._initialDistance === undefined || distance <= this._initialDistance || this._portUI.getView().isPartOfView(target)) {
                    this._initialDistance = distance;
                    this._element.style.opacity = String(1);
                    this._line.style.opacity = String(1);
                }
                else if (distance < UIPortLabel._kOpacityMaxDistance) {
                    this._element.style.opacity = String(1 - (distance / UIPortLabel._kOpacityMaxDistance));
                    this._line.style.opacity = String(1 - (distance / UIPortLabel._kOpacityMaxDistance));
                }
                else {
                    this.remove();
                }
            }
        };
        /**
         * Creates the port label element.
         * @protected
         */
        UIPortLabel.prototype._createElement = function () {
            var _this = this;
            _super.prototype._createElement.call(this);
            var isHidden = this._portUI.getPersistentLabel() !== undefined;
            var hiddenClass = isHidden ? ['sch-label-hidden'] : [];
            var traceHiddenClass = this._isThumbnailViewer ? ['sch-trace-hidden'] : [];
            var labelClassName = __spreadArray(__spreadArray(['sch-label'], hiddenClass, true), traceHiddenClass, true);
            UIDom.addClassName(this._element, labelClassName);
            var isDataPort = this._portUI.getModel() instanceof DataPort;
            var isSubDataPort = isDataPort && this._portUI.getModel().dataPort !== undefined;
            var parentDataPort = isSubDataPort ? this._portUI.getParentPort() : this._portUI;
            var isGraphDataPort = parentDataPort.getParent() instanceof UIGraph;
            var isPinable = isDataPort && !isGraphDataPort;
            if (this._soloDisplay && isPinable) {
                UIDom.addClassName(this._element, 'sch-label-solo');
                UIFontIcon.create3DSFontIcon('pin', {
                    className: 'sch-label-pin-icon',
                    parent: this._element,
                    tooltipInfos: UIWUXTools.createTooltip({ title: UINLS.get('pinPortLabelTitle'), shortHelp: UINLS.get('pinPortLabelShortHelp'), initialDelay: 800 }),
                    onclick: function () { return _this._portUI.getEditor().getHistoryController().registerCreateAction(_this._portUI.createPersistentLabel()); }
                });
            }
            // Create the label title
            this._buildTitleElement();
            this._controller.addLabelToContainer(this._element);
            // Create the line
            var lineClassName = __spreadArray(['sch-label-line'], (isHidden ? ['sch-label-line-hidden'] : []), true);
            this._line = UIDom.createSVGLine({ className: lineClassName });
            this._controller.addLineToContainer(this._line);
            // Manage the display speed
            this.updateDisplaySpeed(this._displaySpeed);
        };
        /**
         * Builds the label title element.
         * @protected
         * @returns {HTMLDivElement} The label title element
         */
        UIPortLabel.prototype._buildTitleElement = function () {
            return UIDom.createElement('div', {
                className: 'sch-label-title',
                children: [UIDom.createElement('span', {
                        className: 'sch-label-port-name',
                        textContent: this._portUI.getModel().getName()
                    })],
                parent: this._element
            });
        };
        /**
         * Updates the line position.
         * @private
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        /*private updateLinePosition(vpt: IViewpoint): void {
            const labelBBox = this.element.getBoundingClientRect();
            const portBBox = this.portUI.getBoundingBox(vpt);
            const lineX1 = labelBBox.left + labelBBox.width / 2;
            const lineY1 = labelBBox.top + labelBBox.height / 2;
            const lineX2 = portBBox.left + portBBox.width / 2;
            const lineY2 = portBBox.top + portBBox.height / 2;
            this.setLinePosition(lineX1, lineY1, lineX2, lineY2);
        };*/
        /**
         * Sets the label line position.
         * @protected
         * @param {number} x1 - The start point line left position.
         * @param {number} y1 - The start point line top position.
         * @param {number} x2 - The end point line left position.
         * @param {number} y2 - The end point line top position.
         */
        UIPortLabel.prototype._setLinePosition = function (x1, y1, x2, y2) {
            var cr = this._controller.getViewer().getClientRect();
            this._line.setAttribute('x1', String(x1 - cr.left));
            this._line.setAttribute('y1', String(y1 - cr.top));
            this._line.setAttribute('x2', String(x2 - cr.left));
            this._line.setAttribute('y2', String(y2 - cr.top));
        };
        UIPortLabel._kOpacityMaxDistance = 25;
        UIPortLabel.kLabelToPortGap = 40;
        UIPortLabel.kLabelToPortXYGap = Math.sqrt(Math.pow(UIPortLabel.kLabelToPortGap, 2) / 2);
        return UIPortLabel;
    }(UIFadeOutContainer));
    return UIPortLabel;
});
