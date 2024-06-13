/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUISessionStorageController'/>
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
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUISessionStorageController", ["require", "exports", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIAbstractStorageController"], function (require, exports, UIAbstractStorageController) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI session storage controller.
     * @class UISessionStorageController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUISessionStorageController
     * @extends UIAbstractStorageController
     * @private
     */
    var UISessionStorageController = /** @class */ (function (_super) {
        __extends(UISessionStorageController, _super);
        /**
         * @constructor
         * @param {IAbstractStorageControllerOptions} [options] - The storage controller options.
         */
        function UISessionStorageController(options) {
            return _super.call(this, options || {
                applicatioName: UISessionStorageController._getApplicationName(),
                storageContainer: window.sessionStorage,
                defaultStorage: {
                    hiddenSettings: {
                        exportJSBlock: false
                    }
                },
                onError: function () { throw new Error('Error while writing to local storage!'); }
            }) || this;
        }
        /**
         * Gets the hidden settings value.
         * @public
         * @returns {IHiddenSettingsSessionStorage} The hidden settings
         */
        UISessionStorageController.prototype.getHiddenSettingsValue = function () {
            return this._currentStorage.hiddenSettings;
        };
        /**
         * Gets the value of the provided hidden setting name.
         * @public
         * @param {string} settingName - The name of the hidden setting.
         * @returns {boolean} The value of the hidden setting.
         */
        UISessionStorageController.prototype.getHiddenSettingValue = function (settingName) {
            return this._currentStorage.hiddenSettings[settingName];
        };
        /**
         * Sets the value of the provided hidden setting name.
         * @public
         * @param {string} settingName - The name of the hidden setting.
         * @param {boolean} value - The value of the hidden setting.
         */
        UISessionStorageController.prototype.setHiddenSettingValue = function (settingName, value) {
            this._currentStorage.hiddenSettings[settingName] = value;
            this._writeStorage();
        };
        return UISessionStorageController;
    }(UIAbstractStorageController));
    return UISessionStorageController;
});
