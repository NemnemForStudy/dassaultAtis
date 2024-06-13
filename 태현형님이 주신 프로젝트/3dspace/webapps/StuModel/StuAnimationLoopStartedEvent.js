/// <amd-module name="DS/StuModel/StuAnimationLoopStartedEvent"/>
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
define("DS/StuModel/StuAnimationLoopStartedEvent", ["require", "exports", "DS/StuCore/StuContext", "DS/CXPTypings/CXPEPEventServices", "DS/StuModel/StuAnimationEvent"], function (require, exports, STU, EPEventServices, AnimationEvent) {
    "use strict";
    /**
     * Event fired when an animation loop is beginning.
     * Animation loop property has to be true
     *
     * @public
     * @class
     * @extends {STU.AnimationEvent}
     * @memberof STU
     * @exports AnimationLoopStartedEvent
     * @constructor
     * @noinstancector
     * @alias STU.AnimationLoopStartedEvent
     */
    var AnimationLoopStartedEvent = /** @class */ (function (_super) {
        __extends(AnimationLoopStartedEvent, _super);
        function AnimationLoopStartedEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AnimationLoopStartedEvent;
    }(AnimationEvent));
    AnimationLoopStartedEvent.prototype.type = "AnimationLoopStartedEvent";
    EPEventServices.registerEvent(AnimationLoopStartedEvent);
    STU["AnimationLoopStartedEvent"] = AnimationLoopStartedEvent;
    return AnimationLoopStartedEvent;
});
