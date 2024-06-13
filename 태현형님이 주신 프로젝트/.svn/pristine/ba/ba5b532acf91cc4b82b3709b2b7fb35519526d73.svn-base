/*global WUXDockAreaEnum */
/// <amd-module name='DS/EPSSchematicsUI/panels/EPSSchematicsUISplittedPanel'/>
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
define("DS/EPSSchematicsUI/panels/EPSSchematicsUISplittedPanel", ["require", "exports", "DS/EPSSchematicsUI/panels/EPSSchematicsUIPanel", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXDockingElement", "css!DS/EPSSchematicsUI/css/panels/EPSSchematicsUISplittedPanel"], function (require, exports, UIPanel, UIDom, UITools, WUXDockingElement) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI splitted panel.
     * @class UISplittedPanel
     * @alias module:DS/EPSSchematicsUI/panels/EPSSchematicsUISplittedPanel
     * @extends UIPanel
     * @abstract
     * @private
     */
    var UISplittedPanel = /** @class */ (function (_super) {
        __extends(UISplittedPanel, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         * @param {IPanelOptions} options - The panel options.
         */
        function UISplittedPanel(editor, options) {
            var _this = _super.call(this, UITools.mergeObject({ className: ['sch-splitted-panel'] }, options, true)) || this;
            _this._editor = editor;
            return _this;
        }
        /**
         * Removes the panel.
         * @private
         */
        UISplittedPanel.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the panel!
            this._editor = undefined;
        };
        /**
         * The callback on the panel close event.
         * @protected
         */
        UISplittedPanel.prototype._onClose = function () {
            this._topDockingElement = undefined;
            this._panelTopContainer = undefined;
            this._panelBottomContainer = undefined;
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the docking element.
         * @private
         */
        UISplittedPanel.prototype._createDockingElement = function () {
            var size = (this._editor.getDomElement().clientHeight / 2) - (23 + 6);
            this._panelTopContainer = UIDom.createElement('div', { className: 'sch-panel-topcontainer' });
            this._panelBottomContainer = UIDom.createElement('div', { className: 'sch-panel-bottomcontainer' });
            this._topDockingElement = new WUXDockingElement({
                side: WUXDockAreaEnum.TopDockArea,
                dockingZoneContent: this._panelTopContainer,
                freeZoneContent: this._panelBottomContainer,
                collapsibleFlag: false,
                dockingZoneSize: size,
                useBordersFlag: false
            }).inject(this.getContent());
        };
        return UISplittedPanel;
    }(UIPanel));
    return UISplittedPanel;
});
