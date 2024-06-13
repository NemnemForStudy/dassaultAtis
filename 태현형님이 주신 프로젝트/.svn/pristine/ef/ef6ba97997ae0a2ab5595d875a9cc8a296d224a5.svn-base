/// <amd-module name='DS/CSIExecutionGraphUI/tools/CSIEGUIEvents'/>
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
define("DS/CSIExecutionGraphUI/tools/CSIEGUIEvents", ["require", "exports", "DS/EPEventServices/EPEvent", "DS/EPEventServices/EPEventServices"], function (require, exports, EPEvent, EventServices) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CSIEGUIImportErrorEvent = exports.CSIEGUIImportSuccessEvent = void 0;
    /**
     * This class defines a CSIEGUI import success event.
     * @class CSIEGUIImportSuccessEvent
     * @extends EPEvent
     * @private
     */
    var CSIEGUIImportSuccessEvent = /** @class */ (function (_super) {
        __extends(CSIEGUIImportSuccessEvent, _super);
        /**
         * @constructor
         */
        function CSIEGUIImportSuccessEvent() {
            return _super.call(this) || this;
        }
        CSIEGUIImportSuccessEvent.type = 'CSIEGUIImportSuccessEvent';
        return CSIEGUIImportSuccessEvent;
    }(EPEvent));
    exports.CSIEGUIImportSuccessEvent = CSIEGUIImportSuccessEvent;
    EventServices.registerEvent(CSIEGUIImportSuccessEvent);
    /**
     * This class defines a CSIEGUI import error event.
     * @class CSIEGUIImportErrorEvent
     * @extends EPEvent
     * @private
     */
    var CSIEGUIImportErrorEvent = /** @class */ (function (_super) {
        __extends(CSIEGUIImportErrorEvent, _super);
        /**
         * @constructor
         */
        function CSIEGUIImportErrorEvent() {
            return _super.call(this) || this;
        }
        /**
         * Gets the error message.
         * @public
         * @returns {sring} The error message.
         */
        CSIEGUIImportErrorEvent.prototype.getError = function () {
            return this.error;
        };
        CSIEGUIImportErrorEvent.type = 'CSIEGUIImportErrorEvent';
        return CSIEGUIImportErrorEvent;
    }(EPEvent));
    exports.CSIEGUIImportErrorEvent = CSIEGUIImportErrorEvent;
    EventServices.registerEvent(CSIEGUIImportErrorEvent);
});
