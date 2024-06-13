/// <amd-module name="DS/StuModel/StuAnimationLoopFinishedEvent"/>
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
define("DS/StuModel/StuAnimationLoopFinishedEvent", ["require", "exports", "DS/StuCore/StuContext", "DS/CXPTypings/CXPEPEventServices", "DS/StuModel/StuAnimationEvent"], function (require, exports, STU, EPEventServices, AnimationEvent) {
    "use strict";
    /**
     * Event fired when an animation loop is ending.
     * Animation loop property has to be true
     *
     * @public
     * @class
     * @extends {STU.AnimationEvent}
     * @memberof STU
     * @exports AnimationLoopFinishedEvent
     * @constructor
     * @noinstancector
     * @alias STU.AnimationLoopFinishedEvent
     */
    var AnimationLoopFinishedEvent = /** @class */ (function (_super) {
        __extends(AnimationLoopFinishedEvent, _super);
        function AnimationLoopFinishedEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AnimationLoopFinishedEvent;
    }(AnimationEvent));
    AnimationLoopFinishedEvent.prototype.type = "AnimationLoopFinishedEvent";
    EPEventServices.registerEvent(AnimationLoopFinishedEvent);
    STU["AnimationLoopFinishedEvent"] = AnimationLoopFinishedEvent;
    return AnimationLoopFinishedEvent;
});
