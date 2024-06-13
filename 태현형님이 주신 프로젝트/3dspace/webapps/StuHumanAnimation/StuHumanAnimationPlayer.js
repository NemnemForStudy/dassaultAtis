/// <amd-module name="DS/StuHumanAnimation/StuHumanAnimationPlayer"/>
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
define("DS/StuHumanAnimation/StuHumanAnimationPlayer", ["require", "exports", "DS/CXPTypings/CXPEP", "DS/StuCore/StuContext", "DS/StuCore/StuManager", "DS/StuModel/StuAnimationStartedEvent", "DS/StuModel/StuAnimationFinishedEvent", "DS/StuModel/StuAnimationPausedEvent", "DS/StuModel/StuAnimationResumedEvent", "DS/StuModel/StuAnimationStoppedEvent", "DS/StuModel/StuAnimationLoopFinishedEvent", "DS/StuModel/StuAnimationLoopStartedEvent"], function (require, exports, EP, STU, Manager, AnimationStartedEvent, AnimationFinishedEvent, AnimationPausedEvent, AnimationResumedEvent, AnimationStoppedEvent, AnimationLoopFinishedEvent, AnimationLoopStartedEvent) {
    "use strict";
    // to avoid cyclic reference
    //import HumanAnimation = require("DS/StuHumanAnimation/StuHumanAnimation");
    /**
     * Human animation task
     *
     * @private
     * @class HumanAnimationPlayerTask
     * @extends {EPTask}
     */
    var HumanAnimationPlayerTask = /** @class */ (function (_super) {
        __extends(HumanAnimationPlayerTask, _super);
        function HumanAnimationPlayerTask(player) {
            var _this = _super.call(this) || this;
            _this.player = player;
            return _this;
        }
        HumanAnimationPlayerTask.prototype.onExecute = function (iPlayerCtx) {
            this.player.onExecute(iPlayerCtx);
        };
        HumanAnimationPlayerTask.prototype.onStop = function () {
            var _this = this;
            // reset played animations
            this.player._registeredAnimations.forEach(function (humanAnimationState) {
                var humanAnimation = humanAnimationState.humanAnim;
                if (humanAnimation._wrapper !== null && humanAnimation._wrapper !== undefined) {
                    _this.player._resetAnimation(humanAnimation);
                }
            });
            this.player._registeredAnimations = [];
        };
        return HumanAnimationPlayerTask;
    }(EP.Task));
    /**
     * Enum of play modes
     * Used to store paused state
     * @private
     * @enum {number}
     */
    var PlayModeEnum;
    (function (PlayModeEnum) {
        PlayModeEnum[PlayModeEnum["PLAYING"] = 0] = "PLAYING";
        PlayModeEnum[PlayModeEnum["PAUSED"] = 1] = "PAUSED";
        PlayModeEnum[PlayModeEnum["STOPPED"] = 2] = "STOPPED";
    })(PlayModeEnum || (PlayModeEnum = {}));
    /**
     * Animation player manager used to play human animations
     *
     * @private
     * @class HumanAnimationPlayer
     * @extends STU.Manager
     * @memberof STU
     */
    var HumanAnimationPlayer = /** @class */ (function (_super) {
        __extends(HumanAnimationPlayer, _super);
        function HumanAnimationPlayer() {
            var _this = _super.call(this) || this;
            _this._registeredAnimations = [];
            return _this;
        }
        /**
         * Modulus function giving a positive value with negative numbers
         * i.e.   _modulus(-7,5) => 3
         *        -7 % 5 => -2
         *
         * @private
         * @param {number} n
         * @param {number} m
         * @return {number}
         */
        HumanAnimationPlayer.prototype._absoluteModulus = function (n, m) {
            return ((n % m) + m) % m;
        };
        /**
         * @private
         */
        HumanAnimationPlayer.prototype.onInitialize = function () {
            // Human animations are located on the parent actor,
            // we copy them into the behavior
            this._task = new HumanAnimationPlayerTask(this);
            EP.TaskPlayer.addTask(this._task, STU.getHumanTaskGroup(STU.EHumanTaskGroups.eAnimation));
        };
        /**
         * @private
         * @param {EP.PlayerContext} iPlayerCtx
         */
        HumanAnimationPlayer.prototype.onExecute = function (iPlayerCtx) {
            // each frames we loop throw all playing animations to play to the next animation step
            for (var idx = 0; idx < this._registeredAnimations.length; idx++) {
                var anim = this._registeredAnimations[idx];
                // Check that current animation isn't paused
                if (anim.state === PlayModeEnum.PAUSED || anim.state === PlayModeEnum.STOPPED) {
                    // and skip the animation if it's the case
                    continue;
                }
                var playDirection = anim.humanAnim.speedFactor;
                if (anim.humanAnim.reverse) {
                    playDirection = -playDirection;
                }
                if (anim.humanAnim.bounce) {
                    playDirection *= anim.bounceDirection;
                }
                else if (anim.bounceDirection !== 1.0) { // in case bounceDirection hasn't been reset
                    anim.bounceDirection = 1.0;
                }
                // Compute next step according to animation settings
                anim.currentTime += (playDirection * iPlayerCtx.getDeltaTime() / 1000);
                // In case next step is over boundaries we need to refine the computation
                var isOverLimits = anim.currentTime > anim.humanAnim.duration || anim.currentTime < 0;
                if (isOverLimits) {
                    // Handle loop option 
                    if (anim.humanAnim.loop) {
                        if (!anim.humanAnim.bounce || anim.bounceDirection === -1.0) {
                            if (anim.hasBeenLooping) {
                                var animLoopFinishEvent = new AnimationLoopFinishedEvent(anim.humanAnim);
                                anim.humanAnim.dispatchEvent(animLoopFinishEvent);
                            }
                            else {
                                anim.hasBeenLooping = true;
                            }
                            if (anim.state === PlayModeEnum.PLAYING) {
                                var animLoopStartedEvent = new AnimationLoopStartedEvent(anim.humanAnim);
                                anim.humanAnim.dispatchEvent(animLoopStartedEvent);
                            }
                        }
                    }
                    else if (!anim.humanAnim.bounce || anim.bounceDirection === -1.0) {
                        // Animation has finished
                        var animHasFinished = new AnimationFinishedEvent(anim.humanAnim);
                        anim.humanAnim.dispatchEvent(animHasFinished);
                        if (anim.hasBeenLooping) {
                            var animLoopFinishEvent = new AnimationLoopFinishedEvent(anim.humanAnim);
                            anim.humanAnim.dispatchEvent(animLoopFinishEvent);
                            anim.hasBeenLooping = false;
                        }
                        anim.humanAnim.dispatchEvent(new STU.ServiceStoppedEvent("play", anim.humanAnim));
                        anim.state = PlayModeEnum.STOPPED;
                        // // Log animation index for removal 
                        // indexToBeRemoved.push(idx);
                        // // Set animation to first or last frame before stopping it
                        if (anim.currentTime < 0) {
                            anim.currentTime = 0;
                            anim.humanAnim._wrapper.jumpToTime(0);
                        }
                        else {
                            anim.currentTime = anim.humanAnim.duration;
                            anim.humanAnim._wrapper.jumpToTime(anim.humanAnim.duration);
                        }
                        // No need to go further if the animation has ended 
                        continue;
                    }
                    // Handle bounce option
                    if (!anim.humanAnim.bounce) { // not bouncing 
                        // Handle regular loop
                        anim.currentTime = this._absoluteModulus(anim.currentTime, anim.humanAnim.duration);
                    }
                    else { // bouncing
                        // Implement bouncing behavior
                        if (anim.currentTime < 0) {
                            anim.currentTime = Math.abs(anim.currentTime);
                        }
                        if (anim.currentTime > anim.humanAnim.duration) {
                            // const delta = anim.currentTime - anim.humanAnim.duration;
                            // anim.currentTime = anim.humanAnim.duration - delta;
                            // Quicker way of doing the two lines above 
                            anim.currentTime = 2.0 * anim.humanAnim.duration - anim.currentTime;
                        }
                        // Flip bounce direction
                        anim.bounceDirection = -anim.bounceDirection;
                    }
                }
                // Something went wrong if time is still not OK
                if (anim.currentTime < 0 || anim.currentTime > anim.humanAnim.duration) {
                    console.error("iTime must between 0 and ".concat(anim.humanAnim.duration, "s"));
                    return;
                }
                // Apply computed time to animation
                anim.humanAnim._wrapper.jumpToTime(anim.currentTime);
            }
        };
        HumanAnimationPlayer.prototype.onDispose = function () {
            EP.TaskPlayer.removeTask(this._task);
            delete this._task;
            _super.prototype.onDispose.call(this);
        };
        /**
         * Plays the animation
         *
         * @private
         * @param {STU.HumanAnimation} iAnimation
         */
        HumanAnimationPlayer.prototype.play = function (iAnimation) {
            if (iAnimation === undefined || iAnimation === null) {
                return;
            }
            if (typeof iAnimation.duration !== "number" || iAnimation.duration <= 0) {
                console.error("Human Animation duration is invalid");
            }
            var existingState = null;
            // Check if the animation is not already playing 
            for (var _i = 0, _a = this._registeredAnimations; _i < _a.length; _i++) {
                var playingAnim = _a[_i];
                if (playingAnim.humanAnim === iAnimation) {
                    if (playingAnim.state === PlayModeEnum.PLAYING) {
                        console.warn("Given animation is already playing");
                        return;
                    }
                    else {
                        existingState = playingAnim;
                    }
                }
            }
            if (iAnimation._wrapper === null || iAnimation._wrapper === undefined) {
                var wrapper = iAnimation._getOrCreateWrapper();
                if (wrapper === undefined || wrapper === null) {
                    console.error("Animation engine couldn't be started. Animations won't move without it");
                    return;
                }
                iAnimation._wrapper = wrapper;
            }
            var expPointer = iAnimation.CATI3DExperienceObject;
            if (expPointer === null || expPointer === undefined) {
                console.error("Cannot find reference to engine animation, build must be corrupted");
                return;
            }
            if (!iAnimation._wrapper.isRTAnimationInitialized(expPointer)) {
                iAnimation._wrapper.initRTAnimation(expPointer);
            }
            if (existingState === null) {
                var startTime = iAnimation.reverse ? iAnimation.duration : 0;
                existingState = {
                    bounceDirection: 1.0,
                    currentTime: startTime,
                    name: iAnimation.name,
                    humanAnim: iAnimation,
                    state: PlayModeEnum.PLAYING,
                    hasBeenLooping: false
                };
                this._registeredAnimations.push(existingState);
            }
            else {
                // send resumedEvent instead of Start/LoopStart if anim was paused
                if (existingState.state === PlayModeEnum.PAUSED) {
                    var animEvent_1 = new AnimationResumedEvent(iAnimation);
                    iAnimation.dispatchEvent(animEvent_1);
                    existingState.state = PlayModeEnum.PLAYING;
                    return;
                }
                else {
                    // anim is stopped
                    if (existingState.humanAnim.reverse) {
                        if (existingState.currentTime === 0) {
                            existingState.currentTime = existingState.humanAnim.duration;
                        }
                    }
                    else if (existingState.currentTime === existingState.humanAnim.duration) {
                        existingState.currentTime = 0;
                    }
                    this._resetAnimation(existingState.humanAnim);
                }
                existingState.state = PlayModeEnum.PLAYING;
            }
            var animEvent = new AnimationStartedEvent(iAnimation);
            iAnimation.dispatchEvent(animEvent);
            // Send loop start event according to loop mode 
            if (iAnimation.loop) {
                var animLoopStarted = new AnimationLoopStartedEvent(iAnimation);
                iAnimation.dispatchEvent(animLoopStarted);
                existingState.hasBeenLooping = true;
            }
        };
        /**
         * Pauses the animation if playing
         *
         * @private
         * @param {STU.HumanAnimation} iAnimation
         */
        HumanAnimationPlayer.prototype.pause = function (iAnimation) {
            if (iAnimation === undefined || iAnimation === null) {
                return;
            }
            for (var _i = 0, _a = this._registeredAnimations; _i < _a.length; _i++) {
                var anim = _a[_i];
                if (anim.humanAnim === iAnimation) {
                    if (anim.state === PlayModeEnum.PLAYING) {
                        anim.state = PlayModeEnum.PAUSED;
                        var animEvent = new AnimationPausedEvent(iAnimation);
                        anim.humanAnim.dispatchEvent(animEvent);
                    }
                    else {
                        console.warn("Given animation is not playing");
                    }
                    return;
                }
            }
            console.warn("Given animation is not playing");
        };
        /**
         * Stops the animation
         *
         * @private
         * @param {STU.HumanAnimation} iAnimation
         */
        HumanAnimationPlayer.prototype.stop = function (iAnimation) {
            if (iAnimation === undefined || iAnimation === null) {
                return;
            }
            for (var i = 0; i < this._registeredAnimations.length; i++) {
                var anim = this._registeredAnimations[i];
                if (anim.humanAnim === iAnimation) {
                    anim.state = PlayModeEnum.STOPPED;
                    this._registeredAnimations.splice(i, 1);
                    this._resetAnimation(iAnimation);
                    var animEvent = new AnimationStoppedEvent(iAnimation);
                    iAnimation.dispatchEvent(animEvent);
                    iAnimation.dispatchEvent(new STU.ServiceStoppedEvent("play", iAnimation));
                    return;
                }
            }
        };
        /**
         * Reset given animation at its first frame with respect of reverse mode
         *
         * @private
         * @memberof HumanAnimationPlayer
         */
        HumanAnimationPlayer.prototype._resetAnimation = function (iAnimation) {
            if (iAnimation._wrapper === null || iAnimation._wrapper === undefined) {
                return;
            }
            if (iAnimation.reverse) {
                iAnimation._wrapper.jumpToTime(iAnimation.duration);
            }
            else {
                iAnimation._wrapper.jumpToTime(0);
            }
        };
        /**
         * Tells if the given animation is playing
         *
         * @private
         * @param {STU.HumanAnimation} iAnimation
         * @return {boolean}
         */
        HumanAnimationPlayer.prototype.isPlaying = function (iAnimation) {
            var playCondition = false;
            for (var _i = 0, _a = this._registeredAnimations; _i < _a.length; _i++) {
                var anim = _a[_i];
                if (anim.humanAnim === iAnimation) {
                    if (anim.state === PlayModeEnum.PLAYING) {
                        playCondition = true;
                    }
                    break;
                }
            }
            return playCondition;
        };
        /**
         * Tells if the given animation is playing backward
         *
         * @private
         * @param {STU.HumanAnimation} iAnimation
         * @return {boolean}
         */
        HumanAnimationPlayer.prototype.isPlayingBackward = function (iAnimation) {
            for (var _i = 0, _a = this._registeredAnimations; _i < _a.length; _i++) {
                var anim = _a[_i];
                if (anim.humanAnim === iAnimation) {
                    if (anim.state === PlayModeEnum.PLAYING) {
                        return anim.bounceDirection < 0 ? !anim.humanAnim.reverse : anim.humanAnim.reverse;
                    }
                }
            }
            return false;
        };
        /**
         * Tells if the given animation is paused
         *
         * @private
         * @param {STU.HumanAnimation} iAnimation
         * @return {boolean}
         */
        HumanAnimationPlayer.prototype.isPaused = function (iAnimation) {
            var pauseCondition = false;
            for (var _i = 0, _a = this._registeredAnimations; _i < _a.length; _i++) {
                var anim = _a[_i];
                if (anim.humanAnim === iAnimation) {
                    if (anim.state === PlayModeEnum.PAUSED) {
                        pauseCondition = true;
                    }
                    break;
                }
            }
            return pauseCondition;
        };
        /**
         * Tells if the given animation is stopped
         *
         * @private
         * @param {STU.HumanAnimation} iAnimation
         * @return {boolean}
         */
        HumanAnimationPlayer.prototype.isStopped = function (iAnimation) {
            for (var _i = 0, _a = this._registeredAnimations; _i < _a.length; _i++) {
                var playingAnim = _a[_i];
                if (playingAnim.humanAnim === iAnimation) {
                    return playingAnim.state === PlayModeEnum.STOPPED;
                }
            }
            return true;
        };
        /**
         * Moves the animation cursor to the given time
         *
         * @private
         * @param {STU.HumanAnimation} iAnimation
         * @param {number} iTime in seconds
         */
        HumanAnimationPlayer.prototype.setTime = function (iAnimation, iTime) {
            if (typeof iTime !== "number" || iTime < 0 || iTime > iAnimation.duration) {
                console.error("iTime must between 0 and ".concat(iAnimation.duration, "s"));
                return;
            }
            var animState = null;
            for (var _i = 0, _a = this._registeredAnimations; _i < _a.length; _i++) {
                var anim = _a[_i];
                if (anim.humanAnim === iAnimation) {
                    anim.currentTime = iTime;
                    animState = anim;
                }
            }
            if (!animState) {
                animState = {
                    bounceDirection: 1.0,
                    currentTime: iTime,
                    name: iAnimation.name,
                    humanAnim: iAnimation,
                    state: PlayModeEnum.STOPPED,
                    hasBeenLooping: false
                };
                this._registeredAnimations.push(animState);
            }
            // Fix for IR-744228
            if (animState.state === PlayModeEnum.PAUSED || animState.state === PlayModeEnum.STOPPED) {
                if (iAnimation._wrapper === null || iAnimation._wrapper === undefined) {
                    var wrapper = iAnimation._getOrCreateWrapper();
                    if (wrapper === undefined || wrapper === null) {
                        console.error("Animation engine couldn't be started. Animations won't move without it");
                        return;
                    }
                    iAnimation._wrapper = wrapper;
                }
                var expPointer = iAnimation.CATI3DExperienceObject;
                if (expPointer === null || expPointer === undefined) {
                    console.error("Cannot find reference to engine animation, build must be corrupted");
                    return;
                }
                if (!iAnimation._wrapper.isRTAnimationInitialized(expPointer)) {
                    iAnimation._wrapper.initRTAnimation(expPointer);
                }
                iAnimation._wrapper.jumpToTime(iTime);
            }
        };
        /**
         * Return the current time of the animation
         *
         * @private
         * @param {STU.HumanAnimation} iAnimation
         * @return {number}
         */
        HumanAnimationPlayer.prototype.getTime = function (iAnimation) {
            for (var i = 0; i < this._registeredAnimations.length; i++) {
                var anim = this._registeredAnimations[i];
                if (anim.humanAnim === iAnimation) {
                    return anim.currentTime;
                }
            }
            if (iAnimation.reverse) {
                return iAnimation.duration;
            }
            return 0;
        };
        return HumanAnimationPlayer;
    }(Manager));
    STU.registerManager(HumanAnimationPlayer);
    // Expose in STU namespace.
    STU["HumanAnimationPlayer"] = HumanAnimationPlayer;
    return HumanAnimationPlayer;
});
