/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphControlButtonView'/>
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
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphControlButtonView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "css!DS/EPSSchematicsUI/css/nodes/EPSSchematicsUIGraphControlButton"], function (require, exports, UINodeView, UIDom, UIFontIcon, UINLS, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph control button view.
     * @private
     * @class UIGraphControlButtonView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphControlButtonView
     * @extends UINodeView
     */
    var UIGraphControlButtonView = /** @class */ (function (_super) {
        __extends(UIGraphControlButtonView, _super);
        /**
         * @public
         * @constructor
         * @param {UIGraphControlButton} graphControlButton - The graph control button.
         * @param {boolean} isInput - True for input, false for output.
         */
        function UIGraphControlButtonView(graphControlButton, isInput) {
            var _this = _super.call(this) || this;
            _this._onButtonClickCB = _this._onButtonClick.bind(_this);
            _this._graphControlButton = graphControlButton;
            _this._isInput = isInput;
            return _this;
        }
        /**
         * Gets the control port button.
         * @public
         * @returns {HTMLDivElement} The control port button.
         */
        UIGraphControlButtonView.prototype.getControlPortButton = function () {
            return this._controlPortButton;
        };
        /**
         * Gets the event port button.
         * @public
         * @returns {HTMLDivElement} The event port button.
         */
        UIGraphControlButtonView.prototype.getEventPortButton = function () {
            return this._eventPortButton;
        };
        /**
         * Removes the customized default view of the node.
         * @private
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UIGraphControlButtonView.prototype.ondestroyDisplay = function (elt, grView) {
            if (this._controlPortButton !== undefined) {
                this._controlPortButton.removeEventListener('click', this._onButtonClickCB, false);
            }
            if (this._eventPortButton !== undefined) {
                this._eventPortButton.removeEventListener('click', this._onButtonClickCB, false);
            }
            this._graphControlButton = undefined;
            this._isInput = undefined;
            this._controlPortButton = undefined;
            this._eventPortButton = undefined;
            this._onButtonClickCB = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the node HTML element.
         * @protected
         * @param {module:DS/egraph/core.Node} node - The graph node.
         * @returns {IHTMLElement} The node HTML element.
         */
        UIGraphControlButtonView.prototype.buildNodeElement = function (node) {
            _super.prototype.buildNodeElement.call(this, node);
            var graphModel = this._graphControlButton.getGraph().getModel();
            // Button container
            var containerClass = this._isInput ? 'sch-graph-input-control-button-container' : 'sch-graph-output-control-button-container';
            UIDom.addClassName(this._element, ['sch-graph-control-button-container', containerClass]);
            // Control port button and icons
            var controlPortType = this._isInput ? ModelEnums.EControlPortType.eInput : ModelEnums.EControlPortType.eOutput;
            if (graphModel.isControlPortTypeAddable(controlPortType)) {
                var controlShortHelp = this._isInput ? UINLS.get('shortHelpCreateInputControlPort') : UINLS.get('shortHelpCreateOutputControlPort');
                this._controlPortButton = UIDom.createElement('div', {
                    className: 'sch-graph-control-button',
                    parent: this._element,
                    tooltipInfos: { shortHelp: controlShortHelp },
                    children: [UIFontIcon.createFAFontIcon('plus'), UIFontIcon.createFAFontIcon('caret-right')]
                });
                this._controlPortButton.addEventListener('click', this._onButtonClickCB, false);
            }
            // Event port button and icons
            var eventPortType = this._isInput ? ModelEnums.EControlPortType.eInputEvent : ModelEnums.EControlPortType.eOutputEvent;
            if (graphModel.isControlPortTypeAddable(eventPortType)) {
                var eventShortHelp = this._isInput ? UINLS.get('shortHelpCreateInputEventPort') : UINLS.get('shortHelpCreateOutputEventPort');
                this._eventPortButton = UIDom.createElement('div', {
                    className: 'sch-graph-control-button',
                    parent: this._element,
                    tooltipInfos: { shortHelp: eventShortHelp },
                    children: [UIFontIcon.createFAFontIcon('plus'), UIFontIcon.createFAFontIcon(this._isInput ? 'wifi' : 'bullhorn')]
                });
                this._eventPortButton.addEventListener('click', this._onButtonClickCB, false);
            }
            return this._element;
        };
        /**
         * The callback on the button click event.
         * @private
         * @param {MouseEvent} event - The button click event.
         */
        UIGraphControlButtonView.prototype._onButtonClick = function (event) {
            var portType;
            if (event.currentTarget === this._controlPortButton) {
                portType = this._isInput ? ModelEnums.EControlPortType.eInput : ModelEnums.EControlPortType.eOutput;
            }
            else if (event.currentTarget === this._eventPortButton) {
                portType = this._isInput ? ModelEnums.EControlPortType.eInputEvent : ModelEnums.EControlPortType.eOutputEvent;
            }
            if (portType !== undefined) {
                this._graphControlButton.getGraph().createControlPort(portType);
            }
        };
        return UIGraphControlButtonView;
    }(UINodeView));
    return UIGraphControlButtonView;
});
