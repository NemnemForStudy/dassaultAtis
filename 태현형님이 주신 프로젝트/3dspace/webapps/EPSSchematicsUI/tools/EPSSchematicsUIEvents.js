/// <amd-module name='DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents'/>
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
define("DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents", ["require", "exports", "DS/EPEventServices/EPEvent", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicsModelWeb/EPSSchematicsTools"], function (require, exports, EPEvent, EventServices, Tools) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIApplicationPrintEvent = exports.UIDialogCloseEvent = exports.UIHistoryControllerUpdateEvent = exports.UIViewerChangeEvent = void 0;
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI viewer change event.
     * @class UIViewerChangeEvent
     * @extends EPEvent
     * @private
     */
    var UIViewerChangeEvent = /** @class */ (function (_super) {
        __extends(UIViewerChangeEvent, _super);
        /**
         * @constructor
         */
        function UIViewerChangeEvent() {
            return _super.call(this) || this;
        }
        /**
         * Gets the viewer.
         * @public
         * @returns {UIViewer} The viewer.
         */
        UIViewerChangeEvent.prototype.getViewer = function () {
            return this.viewer;
        };
        /**
         * Gets the viewer change opening state.
         * @public
         * @returns {boolean} True for opening, false for closing.
         */
        UIViewerChangeEvent.prototype.getOpeningState = function () {
            return this.isOpening;
        };
        UIViewerChangeEvent.type = 'UIViewerChangeEvent';
        return UIViewerChangeEvent;
    }(EPEvent));
    exports.UIViewerChangeEvent = UIViewerChangeEvent;
    UIViewerChangeEvent.prototype.type = 'UIViewerChangeEvent';
    EventServices.registerEvent(UIViewerChangeEvent);
    /**
     * This class defines a UI history controller update event.
     * @class UIHistoryControllerUpdateEvent
     * @extends EPEvent
     * @private
     */
    var UIHistoryControllerUpdateEvent = /** @class */ (function (_super) {
        __extends(UIHistoryControllerUpdateEvent, _super);
        /**
         * @constructor
         */
        function UIHistoryControllerUpdateEvent() {
            return _super.call(this) || this;
        }
        UIHistoryControllerUpdateEvent.type = 'UIHistoryControllerUpdateEvent';
        return UIHistoryControllerUpdateEvent;
    }(EPEvent));
    exports.UIHistoryControllerUpdateEvent = UIHistoryControllerUpdateEvent;
    EventServices.registerEvent(UIHistoryControllerUpdateEvent);
    /**
     * This class defines a UI dialog close event.
     * @class UIDialogCloseEvent
     * @extends EPEvent
     * @private
     */
    var UIDialogCloseEvent = /** @class */ (function (_super) {
        __extends(UIDialogCloseEvent, _super);
        /**
         * @constructor
         */
        function UIDialogCloseEvent() {
            return _super.call(this) || this;
        }
        UIDialogCloseEvent.type = 'UIDialogCloseEvent';
        return UIDialogCloseEvent;
    }(EPEvent));
    exports.UIDialogCloseEvent = UIDialogCloseEvent;
    EventServices.registerEvent(UIDialogCloseEvent);
    /**
     * This class defines a UI dialog close event.
     * @class UIDialogCloseEvent
     * @extends EPEvent
     * @private
     */
    var UIApplicationPrintEvent = /** @class */ (function (_super) {
        __extends(UIApplicationPrintEvent, _super);
        /**
         * @constructor
         */
        function UIApplicationPrintEvent() {
            var _this = _super.call(this) || this;
            _this.showNotification = true;
            return _this;
        }
        /**
         * Gets the path of the event.
         * @public
         * @returns {string} The path of the event.
         */
        UIApplicationPrintEvent.prototype.getPath = function () {
            return this.path;
        };
        /**
         * Gets the severity of the event.
         * @public
         * @returns {ModelEnums.ESeverity} The severity of the event.
         */
        UIApplicationPrintEvent.prototype.getSeverity = function () {
            return this.severity;
        };
        /**
         * Gets the content of the event.
         * @public
         * @returns {*} The content of the event.
         */
        UIApplicationPrintEvent.prototype.getContent = function () {
            if (this.jsonContent !== undefined) {
                this.content = Tools.jsonParse(this.jsonContent);
                this.jsonContent = undefined;
            }
            return this.content;
        };
        /**
         * Gets the show notification state.
         * @public
         * @returns {boolean} The show notification state.
         */
        UIApplicationPrintEvent.prototype.getShowNotificationState = function () {
            return this.showNotification;
        };
        UIApplicationPrintEvent.type = 'UIApplicationPrintEvent';
        return UIApplicationPrintEvent;
    }(EPEvent));
    exports.UIApplicationPrintEvent = UIApplicationPrintEvent;
    EventServices.registerEvent(UIApplicationPrintEvent);
});
