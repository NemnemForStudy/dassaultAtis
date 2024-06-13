/// <amd-module name="DS/StuModel/StuAnimation"/>
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
define("DS/StuModel/StuAnimation", ["require", "exports", "DS/StuCore/StuContext", "DS/StuModel/StuInstance"], function (require, exports, STU, Instance) {
    "use strict";
    /**
     * Base class for animation classes.
     *
     * <p>It is used for STU.ProductAnimation and STU.ExperienceAnimation.</p>
     *
     * @public
     * @exports Animation
     * @memberof STU
     * @class
     * @extends {STU.Instance}
     * @alias STU.Animation
     * @constructor
     * @noinstancector
     */
    var Animation = /** @class */ (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            var _this = _super.call(this) || this;
            /**
             * If true, the animation will play backward, from the end the beginning
             *
             * @public
             * @type {boolean}
             * @name STU.Animation#reverse
             */
            _this._reverse = false;
            /**
             * If true, the animation will play forward and then backward once
             * (or reverse if the reverse property is true)
             *
             * @public
             * @type {boolean}
               * @name STU.Animation#bounce
             */
            _this._bounce = false;
            /**
             * If true, the animation will play until it is stopped
             *
             * @public
             * @type {boolean}
               * @name STU.Animation#loop
             */
            _this._loop = false;
            /**
             * Speed factor applied to the animation during a play.
             * Must be > 0
             *
             * A value of 1 will play at normal speed
             * A value of 2 will play twice faster than normal speed
             *
             * @public
             * @type {number}
               * @name STU.Animation#speedFactor
             */
            _this._speedFactor = 1.0;
            return _this;
        }
        Object.defineProperty(Animation.prototype, "reverse", {
            get: function () {
                if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
                    return this.CATI3DExperienceObject.GetValueByName("reverse");
                }
                return false;
            },
            set: function (iReverse) {
                if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
                    this.CATI3DExperienceObject.SetValueByName("reverse", iReverse);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "bounce", {
            get: function () {
                if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
                    return this.CATI3DExperienceObject.GetValueByName("bounce");
                }
                return false;
            },
            set: function (iBounce) {
                if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
                    this.CATI3DExperienceObject.SetValueByName("bounce", iBounce);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "loop", {
            get: function () {
                if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
                    return this.CATI3DExperienceObject.GetValueByName("loop");
                }
                return false;
            },
            set: function (iLoop) {
                if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
                    this.CATI3DExperienceObject.SetValueByName("loop", iLoop);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "speedFactor", {
            get: function () {
                if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
                    return this.CATI3DExperienceObject.GetValueByName("speedFactor");
                }
                return 1;
            },
            set: function (iSpeed) {
                if (iSpeed > 0) {
                    if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
                        this.CATI3DExperienceObject.SetValueByName("speedFactor", iSpeed);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        /*
        * @private
        */
        Animation.prototype.onDispose = function () {
            //CLE2 SCENE : Stop the animations on dispose
            this.stop();
            this.selfActive = null;
        };
        ;
        /**
         *
         * Plays the animation. <br/>
         * If already playing, does nothing. <br/>
         * It takes into account the various parameters defined on.
         *
         * @public
         * @name STU.Animation#play
         * @function
         */
        Animation.prototype.play = function () { throw new Error("not implemented"); };
        ;
        /**
        * Pauses the animation if playing.
        *
        * @public
        * @name STU.Animation#pause
        * @function
        */
        Animation.prototype.pause = function () { throw new Error("not implemented"); };
        ;
        /**
        * Stops the animation.
        *
        * @public
        * @name STU.Animation#stop
        * @function
        */
        Animation.prototype.stop = function () { throw new Error("not implemented"); };
        ;
        /**
        * Resumes the animation if paused, otherwise does nothing.
        *
        * @public
        * @name STU.Animation#resume
        * @function
        */
        Animation.prototype.resume = function () {
            if (this.isPaused()) {
                this.play();
            }
            else {
                console.error("could not resume the animation");
            }
        };
        ;
        /**
        * Reverse the play direction (forward/backward)
        *
        * @private
        * @name STU.Animation#DoReverse
        * @function
        */
        Animation.prototype.doReverse = function () { this.reverse = !this.reverse; };
        ;
        /**
         * Tells if the animation is playing
         *
         * @public
         * @return {boolean}
         * @name STU.Animation#isPlaying
         * @function
         */
        Animation.prototype.isPlaying = function () { throw new Error("not implemented"); };
        ;
        /**
         * Tells if the animation is paused
         *
         * @public
         * @return {boolean}
         * @name STU.Animation#isPaused
         * @function
         */
        Animation.prototype.isPaused = function () { throw new Error("not implemented"); };
        ;
        /**
         * Tells if the animation is playing backward
         *
         * @public
         * @return {boolean}
         * @name STU.Animation#isPlayingBackward
         * @function
         */
        Animation.prototype.isPlayingBackward = function () { throw new Error("not implemented"); };
        ;
        /**
         * Returns the current time of the animation in seconds
         *
         * @public
         * @return {number}
           * @name STU.Animation#getTime
         * @function
         */
        Animation.prototype.getTime = function () { throw new Error("not implemented"); };
        ;
        /**
         * Sets the current time of the animation to the given time
         *
         * @public
         * @param {number} iTime the new time of the animation (in seconds)
           * @name STU.Animation#setTime
         * @function
         */
        Animation.prototype.setTime = function (iTime) { throw new Error("not implemented"); };
        ;
        /**
         * Sets the current time of the animation to the given time in percent
         *
         * @private
         * @param {number} iPercent the new time of the animation (in percent)
           * @name STU.Animation#setTime
         * @function
         */
        Animation.prototype.setPercentage = function (iPercent) {
            if (iPercent < 0 || iPercent > 100) {
                throw new Error("invalid input parameter, expected float number between 1 and 100");
            }
            this.setTime(this.duration * iPercent * 0.01);
        };
        ;
        /**
        * Returns the list of impacted objects
        *
        * @public
        * @return {Array.<STU.Actor>}
        * @name STU.Animation#getAnimatedObjects
        * @function
        */
        Animation.prototype.getAnimatedObjects = function () { throw new Error("not implemented"); };
        ;
        /**
        * Return the scene above the animation
        *
        * @public
        * @return {STU.Scene}
        * @name STU.Animation#getScene
        * @function
        */
        Animation.prototype.getScene = function () {
            if (STU.Experience.getCurrent().getCurrentScene() != null) { // scenes are activated
                return Instance.prototype.findParent.call(this, STU.Scene);
            }
            return undefined;
        };
        ;
        /**
        * Returns true if this animation is permanent, false otherwise.
        *
        * @public
        * @return {boolean}
        * @name STU.Animation#isPermanent
        * @function
        */
        Animation.prototype.isPermanent = function () {
            var isPermanent = true;
            if (STU.Experience.getCurrent().getCurrentScene() != null) { // scenes are activated
                if (this.getScene() != undefined)
                    isPermanent = false;
            }
            return isPermanent;
        };
        ;
        return Animation;
    }(Instance));
    STU["Animation"] = Animation;
    return Animation;
});
