/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIAbstractStorageController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIAbstractStorageController", ["require", "exports"], function (require, exports) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI abstract storage controller.
     * @class UIAbstractStorageController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIAbstractStorageController
     * @private
     * @abstract
     */
    var UIAbstractStorageController = /** @class */ (function () {
        /**
         * @constructor
         * @param {IAbstractStorageControllerOptions} options - The storage controller options.
         */
        function UIAbstractStorageController(options) {
            this._options = options;
            this._applicationName = options.applicatioName;
            this._storageContainer = options.storageContainer;
            this._defaultStorage = options.defaultStorage;
            this._readStorage();
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
         * Removes the controller.
         * @public
         */
        UIAbstractStorageController.prototype.remove = function () {
            this._options = undefined;
            this._storageContainer = undefined;
            this._applicationName = undefined;
            this._currentStorage = undefined;
        };
        /**
         * Clears the storage.
         * @public
         */
        UIAbstractStorageController.prototype.clearStorage = function () {
            this._storageContainer.removeItem(this._applicationName);
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
         * Writes the storage.
         * An error can occured if the size of the local storage (5Mb) is reached!
         * @protected
         */
        UIAbstractStorageController.prototype._writeStorage = function () {
            try {
                this._storageContainer.setItem(this._applicationName, JSON.stringify(this._currentStorage));
            }
            catch (e) {
                if (typeof this._options.onError === 'function') {
                    this._options.onError(e);
                }
            }
        };
        /**
         * Gets the application name.
         * @protected
         * @static
         * @returns {string} The application name.
         */
        UIAbstractStorageController._getApplicationName = function () {
            var pathName = window.location.pathname;
            return 'sch-app-' + pathName.slice(1, pathName.indexOf('/', 1)).toLowerCase();
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
         * Reads the storage.
         * @private
         */
        UIAbstractStorageController.prototype._readStorage = function () {
            var jsonValue = this._storageContainer.getItem(this._applicationName);
            if (jsonValue !== null && jsonValue !== undefined) {
                this._currentStorage = JSON.parse(jsonValue) || this._defaultStorage;
            }
            if (this._currentStorage === undefined) {
                this._currentStorage = this._defaultStorage;
            }
            if (this._currentStorage !== this._defaultStorage) {
                this._initializeObjectProperties(this._currentStorage, this._defaultStorage);
                this._removeUnusedObjectProperties(this._currentStorage, this._defaultStorage);
            }
        };
        /**
         * Initializes a target object properties with the structure of a reference object.
         * @private
         * @param {Object} target - The target object to initialize.
         * @param {Object} reference - The object reference.
         */
        UIAbstractStorageController.prototype._initializeObjectProperties = function (target, reference) {
            var _this = this;
            Object.keys(reference).forEach(function (key) {
                if (target[key] === undefined) {
                    target[key] = reference[key];
                }
                else if (typeof reference[key] === 'object') {
                    _this._initializeObjectProperties(target[key], reference[key]);
                }
            });
        };
        /**
         * Removes the unused object properties compare to an object reference.
         * @private
         * @param {Object} target - The target object.
         * @param {Object} reference - The object reference.
         */
        UIAbstractStorageController.prototype._removeUnusedObjectProperties = function (target, reference) {
            var _this = this;
            Object.keys(target).forEach(function (key) {
                if (!reference.hasOwnProperty(key)) {
                    delete target[key];
                }
                else if (typeof reference[key] === 'object' && !Array.isArray(reference[key])) {
                    _this._removeUnusedObjectProperties(target[key], reference[key]);
                }
            });
        };
        return UIAbstractStorageController;
    }());
    return UIAbstractStorageController;
});
