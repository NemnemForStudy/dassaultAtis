/// <amd-module name="DS/StuModel/StuAnimationEvent"/>
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
define("DS/StuModel/StuAnimationEvent", ["require", "exports", "DS/StuCore/StuContext", "DS/CXPTypings/CXPEP", "DS/CXPTypings/CXPEPEventServices"], function (require, exports, STU, EP, EPEventServices) {
    "use strict";
    /**
     * Base class of animation events
     *
     * @public
     * @exports AnimationEvent
     * @memberof STU
     * @class
     * @extends {EP.Event}
     * @constructor
     * @noinstancector
     * @alias STU.AnimationEvent
     */
    var AnimationEvent = /** @class */ (function (_super) {
        __extends(AnimationEvent, _super);
        function AnimationEvent(iAnimation) {
            var _this = _super.call(this) || this;
            /**
             * Product animation related to the animation event
             *
             * @public
             * @type {STU.Animation}
             * @name STU.AnimationEvent#name
             */
            _this.animation = null;
            _this.animation = iAnimation;
            return _this;
        }
        return AnimationEvent;
    }(EP.Event));
    AnimationEvent.prototype.type = "AnimationEvent";
    EPEventServices.registerEvent(AnimationEvent); // Should not be dispatch but needed for IR-974577
    STU["AnimationEvent"] = AnimationEvent;
    return AnimationEvent;
});
