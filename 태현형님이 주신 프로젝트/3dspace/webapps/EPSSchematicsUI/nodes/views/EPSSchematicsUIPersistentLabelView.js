/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIPersistentLabelView'/>
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
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIPersistentLabelView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIResizableRectNodeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/components/EPSSchematicsUIValueEvaluator", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "css!DS/EPSSchematicsUI/css/nodes/EPSSchematicsUIPersistentLabel"], function (require, exports, UIResizableRectNodeView, UIDom, UIFontIcon, UIValueEvaluator, UIWUXTools, UITools, Events, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI persistent label view.
     * @private
     * @class UIPersistentLabelView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIPersistentLabelView
     * @extends UIResizableRectNodeView
     */
    var UIPersistentLabelView = /** @class */ (function (_super) {
        __extends(UIPersistentLabelView, _super);
        /**
         * @public
         * @constructor
         * @param {UIPersistentLabel} label - The persistent label.
         */
        function UIPersistentLabelView(label) {
            var _this = _super.call(this) || this;
            _this._onDataPortNameChangeCB = _this._onDataPortNameChange.bind(_this);
            _this._onDataPortValueTypeChangeCB = _this._onDataPortValueTypeChange.bind(_this);
            _this._onDataPortDefaultValueChangeCB = _this._onDataPortDefaultValueChange.bind(_this);
            _this._label = label;
            _this._portUI = _this._label.getUIPort();
            _this._dataPort = _this._portUI.getModel(); // TODO: rename into _portModel!!!
            _this._isSubdataPort = _this._dataPort.dataPort !== undefined;
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
         * Checks if the provided element is the unpin icon element.
         * @public
         * @param {Element} element - The element to check.
         * @returns {boolean} True if the provided element is the unpin icon element else false.
         */
        UIPersistentLabelView.prototype.isUnpinIconElement = function (element) {
            return element === this._unpinIconElt;
        };
        /**
         * Checks if the provided element is the evaluator element.
         * @public
         * @param {Element} element - The element to check.
         * @returns {boolean} True if the provided element is the evaluator element else false.
         */
        UIPersistentLabelView.prototype.isEvaluator = function (element) {
            var _a, _b;
            return (_b = (_a = this._evaluator) === null || _a === void 0 ? void 0 : _a.getElement()) === null || _b === void 0 ? void 0 : _b.contains(element);
        };
        /**
         * Gets the persistent label evaluator.
         * @public
         * @returns {UIValueEvaluator} The persistent label evaluator.
         */
        UIPersistentLabelView.prototype.getEvaluator = function () {
            return this._evaluator;
        };
        /**
         * Refreshes the display of the label (play value or default value).
         * @public
         */
        UIPersistentLabelView.prototype.refreshLabelDisplay = function () {
            this._removeEvaluator();
            UIDom.removeClassName(this._element, ['sch-node-label-trace', 'sch-node-label-trace-debug']);
            var playValueState = UITools.getDataPortPlayValue(this._portUI);
            if (playValueState.hasPlayValue) {
                var fromDebug = playValueState.fromDebug;
                UIDom.addClassName(this._element, fromDebug ? 'sch-node-label-trace-debug' : 'sch-node-label-trace');
                this._createEvaluator(playValueState.value);
            }
            else {
                var defaultValueState = UITools.getDataPortDefaultValue(this._portUI);
                if (defaultValueState.hasDefaultValue) {
                    this._createEvaluator(defaultValueState.value);
                }
            }
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
         * Removes the customized default view of the node.
         * @protected
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UIPersistentLabelView.prototype.ondestroyDisplay = function (elt, grView) {
            this._dataPort.removeListener(Events.DataPortNameChangeEvent, this._onDataPortNameChangeCB);
            this._dataPort.removeListener(Events.DataPortValueTypeChangeEvent, this._onDataPortValueTypeChangeCB);
            // Handle sub data ports
            var refDataPort = this._dataPort.dataPort ? this._dataPort.dataPort : this._dataPort;
            refDataPort.removeListener(Events.DataPortDefaultValueChangeEvent, this._onDataPortDefaultValueChangeCB);
            this._label = undefined;
            this._portUI = undefined;
            this._dataPort = undefined;
            this._titleElt = undefined;
            this._portNameElt = undefined;
            this._bracketLeftElt = undefined;
            this._portValueTypeElt = undefined;
            this._bracketRightElt = undefined;
            this._contentElt = undefined;
            this._evaluator = undefined;
            this._unpinIconElt = undefined;
            this._onDataPortNameChangeCB = undefined;
            this._onDataPortValueTypeChangeCB = undefined;
            this._onDataPortDefaultValueChangeCB = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the node HTML element.
         * @protected
         * @param {module:DS/egraph/core.Node} node - The graph node.
         * @returns {IHTMLElement} The node HTML element.
         */
        UIPersistentLabelView.prototype.buildNodeElement = function (node) {
            var _this = this;
            _super.prototype.buildNodeElement.call(this, node);
            UIDom.addClassName(this._element, 'sch-node-label-container');
            var portName = this._dataPort.getName();
            var portType = this._dataPort.getValueType();
            this._portNameElt = UIDom.createElement('span', { className: ['sch-node-label-port-name', 'sch-node-draggable'], textContent: portName });
            this._bracketLeftElt = UIDom.createElement('span', { className: ['sch-node-label-port-bracket', 'sch-node-draggable'], textContent: ' (' });
            this._portValueTypeElt = UIDom.createElement('span', { className: ['sch-node-label-dataport-valuetype', 'sch-node-draggable'], textContent: portType });
            this._bracketRightElt = UIDom.createElement('span', { className: ['sch-node-label-port-bracket', 'sch-node-draggable'], textContent: ')' });
            this._titleElt = UIDom.createElement('div', {
                className: ['sch-node-label-title', 'sch-node-draggable'],
                children: [this._portNameElt, this._bracketLeftElt, this._portValueTypeElt, this._bracketRightElt],
                parent: this._element
            });
            this._unpinIconElt = UIFontIcon.create3DSFontIcon('pin-off', {
                className: 'sch-node-label-unpin',
                parent: this._element,
                tooltipInfos: UIWUXTools.createTooltip({ title: UINLS.get('unpinPortLabelTitle'), shortHelp: UINLS.get('unpinPortLabelShortHelp'), initialDelay: 800 }),
                onclick: function () {
                    var historyController = _this._portUI.getEditor().getHistoryController();
                    var persistentLabel = _this._label;
                    _this._portUI.removePersistentLabel();
                    historyController.registerRemoveAction([persistentLabel]);
                }
            });
            this.display.unpinIcon = this._unpinIconElt;
            this.display.unpinIcon.grElt = this._label.getDisplay();
            this.display.unpinIcon.subElt = this._unpinIconElt;
            this._contentElt = UIDom.createElement('div', { parent: this._element, className: 'sch-node-label-content' });
            this.refreshLabelDisplay();
            this._dataPort.addListener(Events.DataPortNameChangeEvent, this._onDataPortNameChangeCB);
            this._dataPort.addListener(Events.DataPortValueTypeChangeEvent, this._onDataPortValueTypeChangeCB);
            // Handle sub data ports
            var refDataPort = this._dataPort.dataPort ? this._dataPort.dataPort : this._dataPort;
            refDataPort.addListener(Events.DataPortDefaultValueChangeEvent, this._onDataPortDefaultValueChangeCB);
            return this._element;
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
         * The callback on the data port name change event.
         * @private
         * @param {DataPortNameChangeEvent} event - The data port name change event.
         */
        UIPersistentLabelView.prototype._onDataPortNameChange = function (event) {
            var portName = event.getName();
            if (this._portNameElt) {
                this._portNameElt.textContent = portName;
                this._updateLabelWidthFromTitleWidth();
            }
        };
        /**
         * The callback on the data port value type change event.
         * @private
         * @param {DataPortValueTypeChangeEvent} event - The data port value type change event.
         */
        UIPersistentLabelView.prototype._onDataPortValueTypeChange = function (event) {
            if (this._portValueTypeElt) {
                var valueType = event.getValueType();
                var defaultValue = event.getDefaultValue();
                this._portValueTypeElt.textContent = valueType;
                this._updateContentClassNameFromValueChange(defaultValue);
                this._updateLabelWidthFromTitleWidth();
            }
        };
        /**
         * The callback on the data port default value change event.
         * @private
         * @param {DataPortDefaultValueChangeEvent} event - The data port default value change event.
         */
        UIPersistentLabelView.prototype._onDataPortDefaultValueChange = function (event) {
            var defaultValue = event.getDefaultValue();
            var displayValue = this._isSubdataPort ? defaultValue[this._dataPort.getName()] : defaultValue;
            this._createEvaluator(displayValue);
        };
        /**
         * Removes the evaluator.
         * @private
         */
        UIPersistentLabelView.prototype._removeEvaluator = function () {
            var _a, _b;
            if ((_a = this._contentElt) === null || _a === void 0 ? void 0 : _a.contains((_b = this._evaluator) === null || _b === void 0 ? void 0 : _b.getElement())) {
                this._contentElt.removeChild(this._evaluator.getElement());
                this._evaluator = undefined;
            }
        };
        /**
         * Creates the evaluator.
         * @private
         * @param {*} value - The value to evaluate.
         */
        UIPersistentLabelView.prototype._createEvaluator = function (value) {
            this._removeEvaluator();
            this._evaluator = new UIValueEvaluator(value);
            this._contentElt.appendChild(this._evaluator.getElement());
            this._updateContentClassNameFromValueChange(value);
        };
        /**
         * Updates the content element className when the data port value change.
         * @private
         * @param {*} defaultValue - The data port default value.
         */
        UIPersistentLabelView.prototype._updateContentClassNameFromValueChange = function (defaultValue) {
            UIDom.clearClassName(this._contentElt);
            var typeofValue = typeof defaultValue;
            var contentClasses = ['sch-node-label-content', 'sch-valuetype-' + typeofValue];
            if (typeofValue === 'string' && defaultValue.match(new RegExp('\\n')) === null) {
                contentClasses.push('sch-valuetype-string-monoline');
            }
            UIDom.addClassName(this._contentElt, contentClasses);
        };
        /**
         * Updates the width of the label from the title width.
         * As title width is cropped for overflow management,
         * we have to compute its width from its children elements.
         * @private
         */
        UIPersistentLabelView.prototype._updateLabelWidthFromTitleWidth = function () {
            var vpt = this._label.getGraph().getViewer().getViewpoint();
            var portNameWidth = this._portNameElt.getBoundingClientRect().width;
            var bracketLeftWidth = this._bracketLeftElt.getBoundingClientRect().width;
            var portValueTypeWidth = this._portValueTypeElt.getBoundingClientRect().width;
            var bracketRightWidth = this._bracketRightElt.getBoundingClientRect().width;
            var kPaddings = 30;
            var titleWidth = portNameWidth + bracketLeftWidth + portValueTypeWidth + bracketRightWidth + kPaddings;
            var screenSpaceWidth = titleWidth / vpt.scale;
            this._label.setWidth(screenSpaceWidth);
        };
        return UIPersistentLabelView;
    }(UIResizableRectNodeView));
    return UIPersistentLabelView;
});
