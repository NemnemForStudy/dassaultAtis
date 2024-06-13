/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIHiddenSettingsDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIHiddenSettingsDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBaseDialog", "DS/Controls/ButtonGroup", "DS/Controls/Toggle"], function (require, exports, UIBaseDialog, WUXButtonGroup, WUXToggle) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI hidden settings dialog.
     * @class UIHiddenSettingsDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIHiddenSettingsDialog
     * @extends UIBaseDialog
     * @private
     */
    var UIHiddenSettingsDialog = /** @class */ (function (_super) {
        __extends(UIHiddenSettingsDialog, _super);
        /**
         * @constructor
         * @param {WUXImmersiveFrame} immersiveFrame - The WUX immersive frame.
         * @param {UISessionStorageController} sessionStorageController - The session storage controller.
         */
        function UIHiddenSettingsDialog(immersiveFrame, sessionStorageController) {
            var _this = _super.call(this, {
                title: 'Hidden Settings',
                className: 'sch-hidden-settings-dialog',
                icon: 'cog',
                immersiveFrame: immersiveFrame,
                modalFlag: true
            }) || this;
            _this._sessionStorageController = sessionStorageController;
            return _this;
        }
        /**
         * Removes the dialog.
         * @public
         */
        UIHiddenSettingsDialog.prototype.remove = function () {
            this._sessionStorageController = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIHiddenSettingsDialog.prototype._onCreateContent = function () {
            var _this = this;
            var hiddenSettings = this._sessionStorageController.getHiddenSettingsValue();
            var buttonGroup = new WUXButtonGroup({ type: 'checkbox' });
            Object.keys(hiddenSettings).forEach(function (settingName, index) {
                var settingValue = hiddenSettings[settingName];
                var toggle = new WUXToggle({ type: 'switch', label: settingName, checkFlag: settingValue });
                toggle.addEventListener('change', function (event) {
                    _this._sessionStorageController.setHiddenSettingValue(settingName, event.dsModel.checkFlag);
                });
                buttonGroup.addChild(toggle, index);
            });
            buttonGroup.inject(this._content);
            this._dialog.position = { my: 'center', at: 'center' };
        };
        return UIHiddenSettingsDialog;
    }(UIBaseDialog));
    return UIHiddenSettingsDialog;
});
