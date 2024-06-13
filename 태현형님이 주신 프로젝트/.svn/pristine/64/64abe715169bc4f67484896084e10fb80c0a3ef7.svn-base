/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUILocalStorageController'/>
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
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUILocalStorageController", ["require", "exports", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIAbstractStorageController"], function (require, exports, UIAbstractStorageController) {
    "use strict";
    /**
     * This class defines the UI local storage controller.
     * @class UILocalStorageController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUILocalStorageController
     * @extends UIAbstractStorageController
     * @private
     */
    var UILocalStorageController = /** @class */ (function (_super) {
        __extends(UILocalStorageController, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UILocalStorageController(editor) {
            var _this = _super.call(this, {
                applicatioName: UILocalStorageController._getApplicationName(),
                storageContainer: window.localStorage,
                defaultStorage: {
                    settings: {
                        maxSplitDataPortCount: 10,
                        alwaysMinimizeDataLinks: false
                    },
                    blockLibrary: {
                        favorites: []
                    }
                },
                onError: function (e) {
                    _this._editor.displayNotification({
                        level: 'error',
                        subtitle: 'Error while writing to local storage!',
                        message: e.stack
                    });
                }
            }) || this;
            _this._editor = editor;
            return _this;
        }
        /**
         * Removes the controller.
         * @public
         */
        UILocalStorageController.prototype.remove = function () {
            this._editor = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the maxSplitDataPortCount editor settings value.
         * @public
         * @returns {number} The maxSplitDataPortCount editor settings value.
         */
        UILocalStorageController.prototype.getMaxSplitDataPortCountEditorSetting = function () {
            return this._currentStorage.settings.maxSplitDataPortCount;
        };
        /**
         * Sets the maxSplitDataPortCount editor settings value.
         * @public
         * @param {number} value - The maxSplitDataPortCount editor settings value.
         */
        UILocalStorageController.prototype.setMaxSplitDataPortCountEditorSetting = function (value) {
            this._currentStorage.settings.maxSplitDataPortCount = value;
            this._writeStorage();
        };
        /**
         * Gets the alwaysMinimizeDataLinks editor settings value.
         * @public
         * @returns {boolean} The alwaysMinimizeDataLinks editor settings value.
         */
        UILocalStorageController.prototype.getAlwaysMinimizeDataLinksSetting = function () {
            return this._currentStorage.settings.alwaysMinimizeDataLinks;
        };
        /**
         * Sets the alwaysMinimizeDataLinks editor settings value.
         * @public
         * @param {boolean} value - The alwaysMinimizeDataLinks editor settings value
         */
        UILocalStorageController.prototype.setAlwaysMinimizeDataLinksSetting = function (value) {
            this._currentStorage.settings.alwaysMinimizeDataLinks = value;
            this._writeStorage();
            // Update opened graphs
            var viewers = this._editor.getViewerController().getRootViewerWithAllViewers();
            viewers.forEach(function (viewer) { return viewer.getMainGraph().setDataLinksMinimizerState(value); });
        };
        /**
         * Gets the block library favorites value.
         * @public
         * @returns {string[]} value - The block library favorites value.
         */
        UILocalStorageController.prototype.getBlockLibraryFavorites = function () {
            return this._currentStorage.blockLibrary.favorites;
        };
        /**
         * Sets the block library favorites value.
         * @public
         * @param {string[]} value - The block library favorites value.
         */
        UILocalStorageController.prototype.setBlockLibraryFavorites = function (value) {
            this._currentStorage.blockLibrary.favorites = value;
            this._writeStorage();
        };
        return UILocalStorageController;
    }(UIAbstractStorageController));
    return UILocalStorageController;
});
