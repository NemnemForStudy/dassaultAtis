/// <amd-module name='DS/EPSSchematicsUI/labels/EPSSchematicsUIBlockLabel'/>
define("DS/EPSSchematicsUI/labels/EPSSchematicsUIBlockLabel", ["require", "exports", "DS/EPSSchematicsUI/labels/EPSSchematicsUIPortLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIControlPortLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIDataPortLabel", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, UIPortLabel, UIControlPortLabel, UIDataPortLabel, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI block label.
     * @class UILinkLabel
     * @alias module:DS/EPSSchematicsUI/labels/EPSSchematicsUIBlockLabel
     * @private
     */
    var UIBlockLabel = /** @class */ (function () {
        /**
         * @constructor
         * @param {UILabelController} controller - The UI label controller.
         * @param {UIBlock} blockUI - The UI block.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         */
        function UIBlockLabel(controller, blockUI, displaySpeed) {
            this._icpLabels = [];
            this._ocpLabels = [];
            this._idpLabels = [];
            this._odpLabels = [];
            this._controller = controller;
            this._blockUI = blockUI;
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
         * Removes the block label.
         * @public
         */
        UIBlockLabel.prototype.remove = function () {
            var removeLabel = function (label) { return label.remove(); };
            this._icpLabels.forEach(removeLabel);
            this._ocpLabels.forEach(removeLabel);
            this._idpLabels.forEach(removeLabel);
            this._odpLabels.forEach(removeLabel);
            this._controller = undefined;
            this._blockUI = undefined;
            this._displaySpeed = undefined;
            this._icpLabels = undefined;
            this._ocpLabels = undefined;
            this._idpLabels = undefined;
            this._odpLabels = undefined;
        };
        /**
         * Gets the UI block.
         * @public
         * @returns {UIBlock} blockUI - The UI block.
         */
        UIBlockLabel.prototype.getUIBlock = function () {
            return this._blockUI;
        };
        /**
         * Updates the block labels positions.
         * @public
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UIBlockLabel.prototype.updatePosition = function (vpt) {
            this._updateControlPortLabelsPosition(vpt, true);
            this._updateControlPortLabelsPosition(vpt, false);
            this._updateDataPortLabelsPosition(vpt, true);
            this._updateDataPortLabelsPosition(vpt, false);
        };
        /**
         * Gets the block label bounding box including the block bounding box.
         * @public
         * @returns {IDOMRect} The block label bounding box.
         */
        UIBlockLabel.prototype.getBoundingBox = function () {
            var blockBB = this._blockUI.getElement().getBoundingClientRect();
            var labelsBB = {
                left: blockBB.left, right: blockBB.right,
                top: blockBB.top, bottom: blockBB.bottom,
                width: blockBB.width, height: blockBB.height
            };
            var labels = [].concat(this._icpLabels, this._ocpLabels, this._idpLabels, this._odpLabels);
            labels.forEach(function (label) {
                var lBB = label.getElement().getBoundingClientRect();
                labelsBB.left = lBB.left < labelsBB.left ? lBB.left : labelsBB.left;
                labelsBB.right = lBB.right > labelsBB.right ? lBB.right : labelsBB.right;
                labelsBB.top = lBB.top < labelsBB.top ? lBB.top : labelsBB.top;
                labelsBB.bottom = lBB.bottom > labelsBB.bottom ? lBB.bottom : labelsBB.bottom;
            });
            labelsBB.width = labelsBB.right - labelsBB.left;
            labelsBB.height = labelsBB.bottom - labelsBB.top;
            return labelsBB;
        };
        /**
         * Gets the label display speed.
         * @public
         * @returns {UIEnums.ELabelDisplaySpeed} The label display speed.
         */
        UIBlockLabel.prototype.getDisplaySpeed = function () {
            return this._displaySpeed;
        };
        /**
         * Gets the input control port labels.
         * @public
         * @returns {Array<UIControlPortLabel>} The input control port labels.
         */
        UIBlockLabel.prototype.getInputControlPortLabels = function () {
            return this._icpLabels;
        };
        /**
         * Gets the output control port labels.
         * @public
         * @returns {Array<UIControlPortLabel>} The output control port labels.
         */
        UIBlockLabel.prototype.getOutputControlPortLabels = function () {
            return this._ocpLabels;
        };
        /**
         * Gets the input data port labels.
         * @public
         * @returns {Array<UIDataPortLabel>} The input data port labels.
         */
        UIBlockLabel.prototype.getInputDataPortLabels = function () {
            return this._idpLabels;
        };
        /**
         * Gets the output data port labels.
         * @public
         * @returns {Array<UIDataPortLabel>} The output data port labels.
         */
        UIBlockLabel.prototype.getOutputDataPortLabels = function () {
            return this._odpLabels;
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
         * Creates the block label element.
         * @private
         */
        UIBlockLabel.prototype._createElement = function () {
            var _this = this;
            // Create control port labels
            var controlPorts = this._blockUI.getUIControlPorts();
            controlPorts.forEach(function (controlPort) {
                var cpLabel = new UIControlPortLabel(_this._controller, controlPort, _this._displaySpeed, false);
                cpLabel.disableFadeWithDistance();
                var array = controlPort.isStartPort() ? _this._icpLabels : _this._ocpLabels;
                array.push(cpLabel);
            });
            // Create input data port labels
            var inputDataPorts = this._blockUI.getUIDataPorts(ModelEnums.EDataPortType.eInput, true);
            inputDataPorts.forEach(function (dataPort) {
                var dpLabel = new UIDataPortLabel(_this._controller, dataPort, _this._displaySpeed, false);
                dpLabel.disableFadeWithDistance();
                _this._idpLabels.push(dpLabel);
            });
            // Create output data port labels
            var outputDataPorts = this._blockUI.getUIDataPorts(ModelEnums.EDataPortType.eOutput, true);
            outputDataPorts.forEach(function (dataPort) {
                var dpLabel = new UIDataPortLabel(_this._controller, dataPort, _this._displaySpeed, false);
                dpLabel.disableFadeWithDistance();
                _this._odpLabels.push(dpLabel);
            });
        };
        /**
         * Updates the control port labels position.
         * @private
         * @param {IViewpoint} vpt - The current graph viewpoint.
         * @param {boolean} isStartPort - True for start port, false for end port.
         */
        UIBlockLabel.prototype._updateControlPortLabelsPosition = function (vpt, isStartPort) {
            var controlPortLabels = isStartPort ? this._icpLabels : this._ocpLabels;
            var parentBBox = this._blockUI.getGraph().getViewer().getClientRect();
            var length = controlPortLabels.length;
            var isEven = length % 2 === 0;
            var centerIndex = Math.floor(length / 2);
            var gap = vpt.scale < 1 ? UIPortLabel.kLabelToPortGap * vpt.scale : UIPortLabel.kLabelToPortGap;
            controlPortLabels.forEach(function (label, index) {
                var portBBox = label.getUIPort().getBoundingBox(vpt);
                var labelBBox = label.getElement().getBoundingClientRect();
                var portLeft = portBBox.left - parentBBox.left;
                var portMiddleTop = portBBox.top - parentBBox.top + portBBox.height / 2;
                var labelMiddleHeight = labelBBox.height / 2;
                var labelTop = 0;
                if (index < centerIndex) {
                    labelTop = portBBox.top - parentBBox.top - labelBBox.height;
                }
                else if (!isEven && index === centerIndex) {
                    labelTop = portMiddleTop - labelMiddleHeight;
                }
                else {
                    labelTop = portBBox.top - parentBBox.top + portBBox.height;
                }
                var labelLeft = isStartPort ? portLeft - gap - labelBBox.width : portLeft + portBBox.width + gap;
                label.setPosition(labelLeft, labelTop);
                label.updateLinePosition(vpt);
            });
        };
        /**
         * Updates the data port labels position.
         * @private
         * @param {IViewpoint} vpt - The current graph viewpoint.
         * @param {boolean} isStartPort - True for start port, false for end port.
         */
        UIBlockLabel.prototype._updateDataPortLabelsPosition = function (vpt, isStartPort) {
            var dataPortLabels = isStartPort ? this._idpLabels.slice() : this._odpLabels.slice();
            var parentBBox = this._blockUI.getGraph().getViewer().getClientRect();
            var gap = vpt.scale < 1 ? UIPortLabel.kLabelToPortGap * vpt.scale : UIPortLabel.kLabelToPortGap;
            var accumulator;
            while (dataPortLabels.length > 0) {
                var firstLabel = dataPortLabels.shift();
                var lastLabel = dataPortLabels.pop() || firstLabel;
                var isCenter = firstLabel === lastLabel;
                var firstLabelBBox = firstLabel.getElement().getBoundingClientRect();
                var firstPortBBox = firstLabel.getUIPort().getBoundingBox(vpt);
                var firstPortLeft = firstPortBBox.left - parentBBox.left;
                var firstPortTop = firstPortBBox.top - parentBBox.top;
                var firstLabelLeft = void 0, firstLabelTop = void 0;
                if (accumulator === undefined) {
                    accumulator = isStartPort ? firstPortTop - gap : firstPortTop + firstPortBBox.height + gap;
                }
                if (isCenter) {
                    firstLabelLeft = firstPortLeft + firstPortBBox.width / 2 - firstLabelBBox.width / 2;
                    firstLabelTop = isStartPort ? accumulator - firstLabelBBox.height : accumulator;
                }
                else {
                    var lastLabelBBox = lastLabel.getElement().getBoundingClientRect();
                    var lastPortBBox = lastLabel.getUIPort().getBoundingBox(vpt);
                    var lastPortLeft = lastPortBBox.left - parentBBox.left;
                    var maxLabelHeight = firstLabelBBox.height > lastLabelBBox.height ? firstLabelBBox.height : lastLabelBBox.height;
                    var labelTop = isStartPort ? accumulator - maxLabelHeight : accumulator;
                    var lastLabelTop = labelTop;
                    var lastLabelLeft = lastPortLeft;
                    lastLabel.setPosition(lastLabelLeft, lastLabelTop);
                    lastLabel.updateLinePosition(vpt, true);
                    firstLabelLeft = firstPortLeft + firstPortBBox.width - firstLabelBBox.width;
                    firstLabelTop = labelTop;
                    accumulator = isStartPort ? labelTop - UIBlockLabel._kLabelToLabelGap : labelTop + maxLabelHeight + UIBlockLabel._kLabelToLabelGap;
                }
                firstLabel.setPosition(firstLabelLeft, firstLabelTop);
                firstLabel.updateLinePosition(vpt, true);
            }
        };
        UIBlockLabel._kLabelToLabelGap = 1;
        return UIBlockLabel;
    }());
    return UIBlockLabel;
});
