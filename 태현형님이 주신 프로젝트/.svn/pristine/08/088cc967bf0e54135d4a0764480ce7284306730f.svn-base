/// <amd-module name="DS/StuModel/StuAnimationStoppedEvent"/>
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
define("DS/StuModel/StuAnimationStoppedEvent", ["require", "exports", "DS/StuCore/StuContext", "DS/CXPTypings/CXPEPEventServices", "DS/StuModel/StuAnimationEvent"], function (require, exports, STU, EPEventServices, AnimationEvent) {
    "use strict";
    /**
     * Event fired when an animation is stopped
     *
     * @public
     * @class
     * @extends {STU.AnimationEvent}
     * @memberof STU
     * @exports AnimationStoppedEvent
     * @constructor
     * @noinstancector
     * @alias STU.AnimationStoppedEvent
     */
    var AnimationStoppedEvent = /** @class */ (function (_super) {
        __extends(AnimationStoppedEvent, _super);
        function AnimationStoppedEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AnimationStoppedEvent;
    }(AnimationEvent));
    AnimationStoppedEvent.prototype.type = "AnimationStoppedEvent";
    EPEventServices.registerEvent(AnimationStoppedEvent);
    STU["AnimationStoppedEvent"] = AnimationStoppedEvent;
    return AnimationStoppedEvent;
});
