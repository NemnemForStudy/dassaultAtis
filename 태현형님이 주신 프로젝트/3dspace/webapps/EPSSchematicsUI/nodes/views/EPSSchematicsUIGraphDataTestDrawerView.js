/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphDataTestDrawerView'/>
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
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphDataTestDrawerView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphDataDrawerView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "css!DS/EPSSchematicsUI/css/nodes/EPSSchematicsUIGraphTestDrawer"], function (require, exports, UIGraphDataDrawerView, UIDom, UIWUXTools, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI graph data test drawer view.
     * @private
     * @class UIGraphDataTestDrawerView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphDataTestDrawerView
     * @extends UIGraphDataDrawerView
     */
    var UIGraphDataTestDrawerView = /** @class */ (function (_super) {
        __extends(UIGraphDataTestDrawerView, _super);
        /**
         * @public
         * @constructor
         * @param {UIGraphDataTestDrawer} graphDataDrawer - The graph data test drawer.
         * @param {boolean} isInputPort - True if the data port is an input type else false.
         */
        function UIGraphDataTestDrawerView(graphDataDrawer, isInputPort) {
            var _this = _super.call(this, graphDataDrawer) || this;
            _this._isInputPort = isInputPort;
            return _this;
        }
        /**
         * Removes the customized default view of the node.
         * @private
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UIGraphDataTestDrawerView.prototype.ondestroyDisplay = function (elt, grView) {
            this._isInputPort = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Creates the node element.
         * @protected
         * @override
         */
        UIGraphDataTestDrawerView.prototype.createNodeElement = function () {
            var className = this._isInputPort ? 'sch-graph-inputtest-drawer' : 'sch-graph-outputref-drawer';
            var textContent = this._isInputPort ? UINLS.get('drawerTestInputs') : UINLS.get('drawerTestOutputsReference');
            var tooltipTitle = this._isInputPort ? UINLS.get('tooltipTitleEditTestInputs') : UINLS.get('tooltipTitleEditTestOutputsReference');
            var tooltipShortHelp = this._isInputPort ? UINLS.get('tooltipShortHelpEditTestInputs') : UINLS.get('tooltipShortHelpEditTestOutputsReference');
            UIDom.addClassName(this._element, ['sch-graph-test-drawer', className]);
            var titleElt = UIDom.createElement('div', {
                parent: this._element,
                className: 'sch-graph-drawer-title',
                textContent: textContent,
                tooltipInfos: UIWUXTools.createTooltip({ title: tooltipTitle, shortHelp: tooltipShortHelp })
            });
            this.display.titleElt = titleElt;
            this.display.titleElt.grElt = this._graphDataDrawer.getDisplay();
            this.display.titleElt.subElt = titleElt;
        };
        return UIGraphDataTestDrawerView;
    }(UIGraphDataDrawerView));
    return UIGraphDataTestDrawerView;
});
