/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphDataDrawerView'/>
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
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphDataDrawerView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "css!DS/EPSSchematicsUI/css/nodes/EPSSchematicsUIGraphDataDrawer"], function (require, exports, UINodeView, UIDom, UIFontIcon, UIWUXTools, UINLS, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph data drawer view.
     * @private
     * @class UIGraphDataDrawerView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphDataDrawerView
     * @extends UINodeView
     */
    var UIGraphDataDrawerView = /** @class */ (function (_super) {
        __extends(UIGraphDataDrawerView, _super);
        /**
         * @public
         * @constructor
         * @param {UIGraphDataDrawer} graphDataDrawer - The UI graph data drawer.
         */
        function UIGraphDataDrawerView(graphDataDrawer) {
            var _this = _super.call(this) || this;
            _this._graphDataDrawer = graphDataDrawer;
            return _this;
        }
        /**
         * Shows the graph drawer.
         * @public
         */
        UIGraphDataDrawerView.prototype.show = function () {
            UIDom.removeClassName(this._element, 'sch-drawer-hidden');
        };
        /**
         * Hides the graph drawer.
         * @public
         */
        UIGraphDataDrawerView.prototype.hide = function () {
            UIDom.addClassName(this._element, 'sch-drawer-hidden');
        };
        /**
         * Checks if the drawer is visible.
         * @public
         * @returns {boolean} True if the drawer is visible else false.
         */
        UIGraphDataDrawerView.prototype.isVisible = function () {
            return !UIDom.hasClassName(this._element, 'sch-drawer-hidden');
        };
        /**
         * Gets the title element.
         * @public
         * @returns {HTMLDivElement} The title element.
         */
        UIGraphDataDrawerView.prototype.getTitleElement = function () {
            return this._titleElt;
        };
        /**
         * Gets the button element.
         * @public
         * @returns {HTMLDivElement} The button element.
         */
        UIGraphDataDrawerView.prototype.getButtonElement = function () {
            return this._buttonElt;
        };
        /**
         * Removes the customized default view of the node.
         * @private
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UIGraphDataDrawerView.prototype.ondestroyDisplay = function (elt, grView) {
            this._graphDataDrawer = undefined;
            this._buttonElt = undefined;
            this._titleElt = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the node HTML element.
         * @protected
         * @param {module:DS/egraph/core.Node} node - The graph node.
         * @returns {IHTMLElement} The node HTML element.
         */
        UIGraphDataDrawerView.prototype.buildNodeElement = function (node) {
            _super.prototype.buildNodeElement.call(this, node);
            UIDom.addClassName(this._element, 'sch-graph-data-drawer');
            var textContent, titleShortHelp, buttonShortHelp, dataPortClassName;
            if (this._graphDataDrawer.getPortType() === ModelEnums.EDataPortType.eInput) {
                textContent = UINLS.get('drawerInputDataPorts');
                titleShortHelp = UINLS.get('shortHelpEditInputDataPorts');
                buttonShortHelp = UINLS.get('shortHelpCreateInputDataPort');
                dataPortClassName = 'sch-graph-input-data-drawer';
            }
            else if (this._graphDataDrawer.getPortType() === ModelEnums.EDataPortType.eOutput) {
                textContent = UINLS.get('drawerOutputDataPorts');
                titleShortHelp = UINLS.get('shortHelpEditOutputDataPorts');
                buttonShortHelp = UINLS.get('shortHelpCreateOutputDataPort');
                dataPortClassName = 'sch-graph-output-data-drawer';
            }
            else if (this._graphDataDrawer.getPortType() === ModelEnums.EDataPortType.eLocal) {
                textContent = UINLS.get('drawerLocalDataPorts');
                titleShortHelp = UINLS.get('shortHelpEditLocalDataPorts');
                buttonShortHelp = UINLS.get('shortHelpCreateLocalDataPort');
                if (this._graphDataDrawer.getInputLocalState()) {
                    dataPortClassName = 'sch-graph-input-local-data-drawer';
                }
                else {
                    dataPortClassName = 'sch-graph-output-local-data-drawer';
                }
            }
            UIDom.addClassName(this._element, dataPortClassName);
            if (this._graphDataDrawer.isDataPortAddable()) {
                UIDom.addClassName(this._element, 'sch-drawer-addable');
                this._buttonElt = UIDom.createElement('div', {
                    className: 'sch-drawer-button',
                    parent: this._element,
                    tooltipInfos: UIWUXTools.createTooltip({ shortHelp: buttonShortHelp }),
                    children: [UIFontIcon.createFAFontIcon('plus')]
                });
                this.display.buttonElt = this._buttonElt;
                this.display.buttonElt.grElt = this._graphDataDrawer.getDisplay();
                this.display.buttonElt.subElt = this._buttonElt;
            }
            this._titleElt = UIDom.createElement('div', {
                className: 'sch-drawer-title',
                parent: this._element,
                textContent: textContent,
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: titleShortHelp })
            });
            this.display.titleElt = this._titleElt;
            this.display.titleElt.grElt = this._graphDataDrawer.getDisplay();
            this.display.titleElt.subElt = this._titleElt;
            return this._element;
        };
        return UIGraphDataDrawerView;
    }(UINodeView));
    return UIGraphDataDrawerView;
});
