/// <amd-module name="DS/StuHumanAnimation/StuHumanAnimation"/>
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
define("DS/StuHumanAnimation/StuHumanAnimation", ["require", "exports", "DS/StuCore/StuContext", "DS/StuModel/StuAnimation", "DS/StuHumanAnimation/StuHumanAnimationPlayer"], function (require, exports, STU, Animation, AnimationPlayer) {
    "use strict";
    var HumanAnimation = /** @class */ (function (_super) {
        __extends(HumanAnimation, _super);
        /**
         * Describes a Human Animation object.
         *
         * <p>Human Animations are objects exposed on Human Actor, and share similar play capabilities with Experience animations.
         * They are retrieved with the same getAnimations / getAnimationByName methods exposed on Actor3D, but only Human Actors actually host and
         * return Human Animations
         * </p>
         *
         * @example
         *  // get a human actor, retrieve on of its animations and play it
         * 	var actor = this.getExperience().getActorByName("MyHumanActor");
         *  var anim = actor.getAnimationByName("MyHumanAnimation");
         *  anim.play();
         *
         * @public
         * @exports HumanAnimation
         * @memberof STU
         * @class
         * @extends {STU.Animation}
         * @alias STU.HumanAnimation
         * @constructor
         * @noinstancector
         */
        function HumanAnimation() {
            var _this = _super.call(this) || this;
            /**
            * Get duration
            *
            * @public
            * @type {number}
            * @name STU.HumanAnimation#duration
            * @override
            */
            _this._duration = 0;
            /**
             * C++ class bindings to control the animation engine
             *
             * @private
             * @type {stu__HumanAnimationWrapper}
             * @constructor
             */
            _this._wrapper = null;
            return _this;
        }
        Object.defineProperty(HumanAnimation.prototype, "duration", {
            get: function () {
                return this._duration;
            },
            set: function (iDuration) { },
            enumerable: false,
            configurable: true
        });
        /**
        * Plays the animation. <br/>
        * If already playing, does nothing. <br/>
        * It takes into account the various parameters defined on.
        *
        * @public
        * @name STU.HumanAnimation#play
        * @function
        */
        HumanAnimation.prototype.play = function () {
            var animPlayer = AnimationPlayer.getInstance();
            if (animPlayer !== null && animPlayer !== undefined) {
                animPlayer.play(this);
            }
            else {
                console.error("could not play the animation");
            }
        };
        ;
        /**
        * Pauses the animation if playing.
        *
        * @public
        * @name STU.HumanAnimation#pause
        * @function
        */
        HumanAnimation.prototype.pause = function () {
            var animPlayer = AnimationPlayer.getInstance();
            if (animPlayer !== null && animPlayer !== undefined) {
                animPlayer.pause(this);
            }
            else {
                console.error("could not pause the animation");
            }
        };
        ;
        /**
        * Stops the animation.
        *
        * @public
        * @name STU.HumanAnimation#stop
        * @function
        */
        HumanAnimation.prototype.stop = function () {
            var animPlayer = AnimationPlayer.getInstance();
            if (animPlayer !== null && animPlayer !== undefined) {
                animPlayer.stop(this);
            }
            else {
                console.error("could not stop the animation");
            }
        };
        ;
        /**
         * Tells if the animation is playing
         *
         * @public
         * @return {boolean}
         * @name STU.HumanAnimation#isPlaying
         * @function
         */
        HumanAnimation.prototype.isPlaying = function () {
            var animPlayer = AnimationPlayer.getInstance();
            if (animPlayer !== null && animPlayer !== undefined) {
                return animPlayer.isPlaying(this);
            }
            return false;
        };
        ;
        /**
         * Tells if the animation is paused
         *
         * @public
         * @return {boolean}
         * @name STU.HumanAnimation#isPaused
         * @function
         */
        HumanAnimation.prototype.isPaused = function () {
            var animPlayer = AnimationPlayer.getInstance();
            if (animPlayer !== null && animPlayer !== undefined) {
                return animPlayer.isPaused(this);
            }
            return false;
        };
        ;
        /**
         * Tells if the animation is playing backward
         *
         * @public
         * @return {boolean}
         * @name STU.HumanAnimation#isPlayingBackward
         * @function
         */
        HumanAnimation.prototype.isPlayingBackward = function () {
            var animPlayer = AnimationPlayer.getInstance();
            if (animPlayer !== null && animPlayer !== undefined) {
                return animPlayer.isPlayingBackward(this);
            }
            return false;
        };
        /**
         * Returns the current time of the animation in seconds
         *
         * @public
         * @return {number}
         * @name STU.HumanAnimation#getTime
         * @function
         */
        HumanAnimation.prototype.getTime = function () {
            var animPlayer = AnimationPlayer.getInstance();
            if (animPlayer !== null && animPlayer !== undefined) {
                return animPlayer.getTime(this);
            }
            return 0;
        };
        /**
         * Sets the current time of the animation to the given time
         *
         * @public
         * @param {number} iTime the new time of the animation (in seconds)
         * @name STU.HumanAnimation#setTime
         * @function
         */
        HumanAnimation.prototype.setTime = function (iTime) {
            var animPlayer = AnimationPlayer.getInstance();
            if (animPlayer !== null && animPlayer !== undefined) {
                animPlayer.setTime(this, iTime);
            }
        };
        /**
        * Returns the list of impacted actors and subactors by the animation
        * Non-exposed object will not be returned
        *
        * @public
        * @return {Array.<STU.Actor>}
        * @name STU.HumanAnimation#getAnimatedObjects
        * @function
        */
        HumanAnimation.prototype.getAnimatedObjects = function () {
            var wrapper = this._getOrCreateWrapper();
            if (wrapper !== undefined && wrapper !== null) {
                var expPointer = this.CATI3DExperienceObject;
                if (expPointer === null || expPointer === undefined) {
                    console.error("Cannot find reference to engine animation, build must be corrupted");
                    return [];
                }
                return this._wrapper.getAnimatedObjects(expPointer);
            }
        };
        ;
        /**
         * Get or create the C++ binding for this human animation instance
         * @private
         * @returns {stu__HumanAnimationWrapper}
         */
        HumanAnimation.prototype._getOrCreateWrapper = function () {
            if (this._wrapper === null || this._wrapper === undefined) {
                this._wrapper = new stu__HumanAnimationWrapper();
            }
            return this._wrapper;
        };
        /**
         * Process to execute when this STU.Instance is initializing.
         *
         * @method
         * @private
         */
        HumanAnimation.prototype.onInitialize = function () {
            _super.prototype.onInitialize.call(this);
            var expPointer = this.CATI3DExperienceObject;
            if (expPointer !== undefined && expPointer !== null) {
                this._duration = expPointer.GetValueByName("duration");
            }
        };
        return HumanAnimation;
    }(Animation));
    STU["HumanAnimation"] = HumanAnimation;
    return HumanAnimation;
});
