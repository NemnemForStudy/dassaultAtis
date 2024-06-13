/// <amd-module name="DS/StuMiscContent/StuExperienceAnimation"/>
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
define("DS/StuMiscContent/StuExperienceAnimation", ["require", "exports", "DS/StuCore/StuContext", "DS/StuModel/StuAnimation"], function (require, exports, STU, Animation) {
    "use strict";
    /**
    * Describes an Experience Animation object.
    *
    * <p>Experience animations class represent both Local and Global animations that
    * can be created in Creative Experience and edited through the timeline editor</p>
    *
    * @example
    *	// get an animation on an actor that hosts local animations, and play it
    *	var actor = this.getExperience().getActorByName("MyAnimatedActor");
    *	var anim = actor.getAnimationByName("MyLocalAnimation");
    *	anim.play();
    *
    * @example
    *	// get a global animation on the experience, and play it
    *	var anim = this.getExperience().getAnimationByName("MyGlobalAnimation");
    *	anim.play();
    *
    * @public
    * @exports ExperienceAnimation
    * @memberof STU
    * @class
    * @extends {STU.Animation}
    * @alias STU.ExperienceAnimation
    * @constructor
    * @noinstancector
    */
    var ExperienceAnimation = /** @class */ (function (_super) {
        __extends(ExperienceAnimation, _super);
        function ExperienceAnimation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
            * Get duration
            *
            * @public
            * @type {number}
            * @name STU.ExperienceAnimation#duration
            * @override
            */
            _this._duration = 0.0;
            _this.name = 'ExperienceAnimation';
            _this.featureCatalog = '3DExperience.feat';
            _this.featureStartup = 'Animation_Spec';
            return _this;
        }
        Object.defineProperty(ExperienceAnimation.prototype, "duration", {
            get: function () {
                if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
                    return this.CATICXPAnimation.getDuration();
                }
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
        * @name STU.ExperienceAnimation#play
        * @function
        */
        ExperienceAnimation.prototype.play = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                this.CATICXPAnimation.play();
            }
        };
        ;
        /**
        * Resumes the animation if paused, otherwise does nothing.
        *
        * @public
        * @name STU.ExperienceAnimation#resume
        * @function
        */
        ExperienceAnimation.prototype.resume = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                if (this.CATICXPAnimation.isPaused()) {
                    this.CATICXPAnimation.play();
                }
            }
        };
        ;
        /**
        * Pauses the animation if playing.
        *
        * @public
        * @name STU.ExperienceAnimation#pause
        * @function
        */
        ExperienceAnimation.prototype.pause = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                this.CATICXPAnimation.pause();
            }
        };
        ;
        /**
        * Stops the animation.
        *
        * @public
        * @name STU.ExperienceAnimation#stop
        * @function
        */
        ExperienceAnimation.prototype.stop = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                this.CATICXPAnimation.stop();
            }
        };
        ;
        /**
         * Tells if the animation is playing
         *
         * @public
         * @name STU.ExperienceAnimation#isPlaying
         * @return {boolean}
         * @function
         */
        ExperienceAnimation.prototype.isPlaying = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                return this.CATICXPAnimation.isPlaying();
            }
        };
        ;
        /**
         * Tells if the animation is paused
         *
         * @public
         * @return {boolean}
         * @name STU.ExperienceAnimation#isPaused
         * @function
         */
        ExperienceAnimation.prototype.isPaused = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                return this.CATICXPAnimation.isPaused();
            }
        };
        ;
        /**
         * Tells if the animation is playing backward
         *
         * @deprecated R2023x - see STU.ExperienceAnimation.isPlayingBackward
         * @public
         * @return {boolean}
         * @name STU.ExperienceAnimation#isRewinding
         * @function
         */
        ExperienceAnimation.prototype.isRewinding = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                return this.CATICXPAnimation.isRewinding();
            }
        };
        /**
         * Tells if the animation is playing backward
         *
         * @public
         * @return {boolean}
         * @name STU.ExperienceAnimation#isPlayingBackward
         * @function
         */
        ExperienceAnimation.prototype.isPlayingBackward = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                return this.CATICXPAnimation.isRewinding();
            }
        };
        /**
         * Moves the animation cursor to the given time
         *
         * @public
         * @param {number} iTime in seconds
         * @name STU.ExperienceAnimation#setTime
         * @function
         */
        ExperienceAnimation.prototype.setTime = function (iTime) {
            if (!isNaN(iTime)) {
                if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                    this.CATICXPAnimation.setTime(iTime);
                }
            }
        };
        /**
         * Gets the current animation time
         *
         * @public
         * @return {number}
         * @name STU.ExperienceAnimation#getTime
         * @function
         */
        ExperienceAnimation.prototype.getTime = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                return this.CATICXPAnimation.getTime();
            }
        };
        /**
        * Returns the list of impacted objects
        *
        * @public
        * @return {Array.<STU.Actor>}
        * @name STU.ExperienceAnimation#getAnimatedObjects
        * @function
        */
        ExperienceAnimation.prototype.getAnimatedObjects = function () {
            if (this.CATICXPAnimation !== undefined && this.CATICXPAnimation !== null) {
                return this.CATICXPAnimation.getAnimatedObjects();
            }
        };
        ;
        /**
         * Pause the animation and send an event stop to the NL
         * Should not be called directly, only from NL
         *
         * @private
         */
        ExperienceAnimation.prototype.pauseForNL = function () {
            this.pause();
            this.dispatchEvent(new STU.ServiceStoppedEvent("play", this));
        };
        ;
        /**
         * useful to dispatch events from c++
         *
         * @private
         */
        ExperienceAnimation.prototype.doDispatchEvent = function (iEventName) {
            var event;
            if (iEventName == "ServiceStoppedEvent") {
                event = new STU.ServiceStoppedEvent("play", this);
            }
            else {
                event = new STU[iEventName + "Event"](this);
            }
            this.dispatchEvent(event);
        };
        return ExperienceAnimation;
    }(Animation));
    STU["ExperienceAnimation"] = ExperienceAnimation;
    return ExperienceAnimation;
});
