/// <amd-module name="DS/StuHumanPosture/StuHumanPostureApplyEvent"/>
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
define("DS/StuHumanPosture/StuHumanPostureApplyEvent", ["require", "exports", "DS/StuCore/StuContext", "DS/CXPTypings/CXPEP", "DS/CXPTypings/CXPEPEventServices"], function (require, exports, STU, EP, EPEventServices) {
    "use strict";
    /**
     * Event fired when a posture is applyed
     *
     * @public
     * @class
     * @extends {EP.Event}
     * @memberof STU
     * @exports HumanPostureApplyEvent
     * @constructor
     * @noinstancector
     * @alias STU.HumanPostureApplyEvent
     */
    var HumanPostureApplyEvent = /** @class */ (function (_super) {
        __extends(HumanPostureApplyEvent, _super);
        function HumanPostureApplyEvent(iPosture) {
            var _this = _super.call(this) || this;
            /**
            * Posture related to the posture event
            *
            * @public
            * @type {STU.HumanPosture}
            * @name STU.HumanPostureApplyEvent#name
            */
            _this.posture = null;
            _this.posture = iPosture;
            return _this;
        }
        return HumanPostureApplyEvent;
    }(EP.Event));
    HumanPostureApplyEvent.prototype.type = "HumanPostureApplyEvent";
    EPEventServices.registerEvent(HumanPostureApplyEvent);
    STU["HumanPostureApplyEvent"] = HumanPostureApplyEvent;
    return HumanPostureApplyEvent;
});
