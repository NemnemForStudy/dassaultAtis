/// <amd-module name="DS/StuModel/StuAnimationPausedEvent"/>
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
define("DS/StuModel/StuAnimationPausedEvent", ["require", "exports", "DS/StuCore/StuContext", "DS/CXPTypings/CXPEPEventServices", "DS/StuModel/StuAnimationEvent"], function (require, exports, STU, EPEventServices, AnimationEvent) {
    "use strict";
    /**
     * Event fired when an animation is paused
     *
     * @public
     * @class
     * @extends {STU.AnimationEvent}
     * @memberof STU
     * @exports AnimationPausedEvent
     * @constructor
     * @noinstancector
     * @alias STU.AnimationPausedEvent
     */
    var AnimationPausedEvent = /** @class */ (function (_super) {
        __extends(AnimationPausedEvent, _super);
        function AnimationPausedEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AnimationPausedEvent;
    }(AnimationEvent));
    AnimationPausedEvent.prototype.type = "AnimationPausedEvent";
    EPEventServices.registerEvent(AnimationPausedEvent);
    STU["AnimationPausedEvent"] = AnimationPausedEvent;
    return AnimationPausedEvent;
});
