/// <amd-module name='DS/EPSSchematicsUI/labels/EPSSchematicsUIDataPortLabel'/>
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
define("DS/EPSSchematicsUI/labels/EPSSchematicsUIDataPortLabel", ["require", "exports", "DS/EPSSchematicsUI/labels/EPSSchematicsUIPortLabel", "DS/EPSSchematicsUI/components/EPSSchematicsUIValueEvaluator", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort", "DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools"], function (require, exports, UIPortLabel, UIValueEvaluator, UIDom, UIShortcutDataPort, UIGraph, UITools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data port label.
     * @class UIDataPortLabel
     * @alias module:DS/EPSSchematicsUI/labels/EPSSchematicsUIDataPortLabel
     * @extends UIPortLabel
     * @private
     */
    var UIDataPortLabel = /** @class */ (function (_super) {
        __extends(UIDataPortLabel, _super);
        /**
         * @constructor
         * @param {UILabelController} controller - The UI label controller.
         * @param {UIDataPort} portUI - The UI data port.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         * @param {boolean} soloDisplay - Whether the label is displayed solo.
         */
        function UIDataPortLabel(controller, portUI, displaySpeed, soloDisplay) {
            return _super.call(this, controller, portUI, displaySpeed, soloDisplay) || this;
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
        UIDataPortLabel.prototype.remove = function () {
            this._evaluator = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * This method updates the line position.
         * @private
         * @param {IViewpoint} vpt - The current graph viewpoint.
         * @param {boolean} [keepStraightLines=false] True to keep straight lines else false.
         */
        UIDataPortLabel.prototype.updateLinePosition = function (vpt, keepStraightLines) {
            if (keepStraightLines === void 0) { keepStraightLines = false; }
            var labelBBox = this._element.getBoundingClientRect();
            var portBBox = this._portUI.getBoundingBox(vpt);
            var lineY1 = labelBBox.top + labelBBox.height / 2;
            var isStartPort = this._portUI.isStartPort();
            var isGraphPort = this._portUI.getParent() instanceof UIGraph;
            var isShortcut = this._portUI instanceof UIShortcutDataPort;
            var inverse = isGraphPort;
            var lineX2 = portBBox.left + portBBox.width / 2;
            var lineX1 = keepStraightLines ? lineX2 : labelBBox.left + labelBBox.width / 2;
            var bottomBorder = portBBox.top + portBBox.height;
            var middleHeight = portBBox.top + portBBox.height / 2;
            var lineY2 = inverse ? (isStartPort ? bottomBorder : middleHeight) : (isStartPort ? middleHeight : bottomBorder);
            lineY2 = isShortcut ? (isStartPort ? bottomBorder : middleHeight) : lineY2;
            this._setLinePosition(lineX1, lineY1, lineX2, lineY2);
        };
        /**
         * Gets the evaluator.
         * @public
         * @returns {UIValueEvaluator} The evaluator.
         */
        UIDataPortLabel.prototype.getEvaluator = function () {
            return this._evaluator;
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
         * Creates the data port label element.
         * @protected
         */
        UIDataPortLabel.prototype._createElement = function () {
            _super.prototype._createElement.call(this);
            UIDom.addClassName(this._element, 'sch-label-dataport');
            this._buildContentElement();
        };
        /**
         * Builds the label title element.
         * @protected
         * @returns {HTMLDivElement} The label title element
         */
        UIDataPortLabel.prototype._buildTitleElement = function () {
            var titleElt = _super.prototype._buildTitleElement.call(this);
            UIDom.createElement('span', {
                className: 'sch-label-port-bracket',
                textContent: ' (',
                parent: titleElt
            });
            UIDom.createElement('span', {
                className: 'sch-label-dataport-valuetype',
                textContent: this._portUI.getModel().getValueType(),
                parent: titleElt
            });
            UIDom.createElement('span', {
                className: 'sch-label-port-bracket',
                textContent: ')',
                parent: titleElt
            });
            return titleElt;
        };
        /**
         * Gets the data port default value.
         * @protected
         * @returns {IDataPortDefaultValue} The data port default value result.
         */
        UIDataPortLabel.prototype._getDataPortDefaultValue = function () {
            return UITools.getDataPortDefaultValue(this._portUI);
        };
        /**
         * Updates the label position.
         * @protected
         * @abstract
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UIDataPortLabel.prototype._updateLabelPosition = function (vpt) {
            var isOnTopOfPort = this._portUI.isDataPortLabelOnTop();
            var labelLeft = this._computeLabelLeftPosition(vpt);
            var labelTop = this._computeLabelTopPosition(vpt, isOnTopOfPort);
            this.setPosition(labelLeft, labelTop);
        };
        /**
         * Computes the label left position.
         * @protected
         * @param {IViewpoint} vpt - The current graph viewpoint.
         * @returns {number} The label left position.
         */
        UIDataPortLabel.prototype._computeLabelLeftPosition = function (vpt) {
            var parentBBox = this._portUI.getParentGraph().getViewer().getClientRect();
            var portBBox = this._portUI.getBoundingBox(vpt);
            var labelBBox = this._element.getBoundingClientRect();
            var labelLeft = portBBox.left - parentBBox.left + (portBBox.width / 2) - (labelBBox.width / 2);
            var leftLimit = 0;
            var rightLimit = parentBBox.width - labelBBox.width;
            labelLeft = labelLeft < leftLimit ? leftLimit : labelLeft;
            labelLeft = labelLeft > rightLimit ? rightLimit : labelLeft;
            return labelLeft;
        };
        /**
         * Computes the label top position.
         * @protected
         * @param {IViewpoint} vpt - The current graph viewpoint.
         * @param {boolean} isOnTopOfPort - True if the label is positionned on top of the port else false.
         * @returns {number} The label top position.
         */
        UIDataPortLabel.prototype._computeLabelTopPosition = function (vpt, isOnTopOfPort) {
            var parentBBox = this._portUI.getParentGraph().getViewer().getClientRect();
            var portBBox = this._portUI.getBoundingBox(vpt);
            var labelBBox = this._element.getBoundingClientRect();
            var gap = UIPortLabel.kLabelToPortGap;
            var fromPortTopPosition = portBBox.top - parentBBox.top - labelBBox.height - gap;
            var fromPortBottomPosition = portBBox.top - parentBBox.top + portBBox.height + gap;
            var labelTop = isOnTopOfPort ? fromPortTopPosition : fromPortBottomPosition;
            var topLimit = 0;
            var bottomLimit = parentBBox.height - labelBBox.height;
            labelTop = labelTop < topLimit ? fromPortBottomPosition : labelTop;
            labelTop = labelTop > bottomLimit ? fromPortTopPosition : labelTop;
            return labelTop;
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
         * Builds the label content element.
         * @private
         */
        UIDataPortLabel.prototype._buildContentElement = function () {
            var hasContent = false;
            var dataPortValue;
            var playValue = UITools.getDataPortPlayValue(this._portUI);
            if (playValue.hasPlayValue && !this._isThumbnailViewer) {
                hasContent = true;
                dataPortValue = playValue.value;
                UIDom.addClassName(this._element, playValue.fromDebug ? 'sch-label-trace-debug' : 'sch-label-trace');
            }
            else {
                var defaultvalue = this._getDataPortDefaultValue();
                if (defaultvalue.hasDefaultValue) {
                    hasContent = true;
                    dataPortValue = defaultvalue.value;
                }
            }
            if (hasContent) {
                var valueTypeClasses = ['sch-label-content', 'sch-valuetype-' + typeof dataPortValue];
                if (typeof dataPortValue === 'string' && dataPortValue.match(new RegExp('\\n')) === null) {
                    valueTypeClasses.push('sch-valuetype-string-monoline');
                }
                this._evaluator = new UIValueEvaluator(dataPortValue);
                UIDom.createElement('div', {
                    className: valueTypeClasses,
                    children: [this._evaluator.getElement()],
                    parent: this._element
                });
            }
        };
        return UIDataPortLabel;
    }(UIPortLabel));
    return UIDataPortLabel;
});
