define('DS/StuHuman/StuHumanNa',
    [
        'DS/StuCore/StuContext',
        'DS/StuHuman/StuHumanSkeleton',
        'DS/EPTaskPlayer/EPTask',
        'DS/EPTaskPlayer/EPTaskPlayer',
        'DS/StuRenderEngine/StuActor3D',
        'DS/MathematicsES/MathsDef'
    ],
    function (STU, HumanSkeleton, Task, TaskPlayer, Actor3D, DSMath) {
        'use strict';

        /**
         * The task allows to update human skinning.
         * Should be done during post process everytime it is requested
         *
         * @exports HumanSkinningTask
         * @class 
         * @constructor
         * @private
         * @extends EP.Task
         * @param {Object} iRTHuman, CATRTHuman native object
         * @memberof STU
         */
         var HumanSkinningTask = function (iRTHuman) {
            Task.call(this);

            this.CATRTHuman = iRTHuman;
            this._request = false;
        };

        HumanSkinningTask.prototype = new Task();
        HumanSkinningTask.constructor = HumanSkinningTask;

        /**
         * This is the classic run method of any task.
         *
         * @method
         * @private
         * @param {Object} iExContext, the context of execution passed to any task on it's run.
         */
         HumanSkinningTask.prototype.request = function () {
            this._request = true;
            return this;
        };

        /**
         * This is the classic run method of any task.
         *
         * @method
         * @private
         * @param {Object} iExContext, the context of execution passed to any task on it's run.
         */
        HumanSkinningTask.prototype.onExecute = function (iExContext) {
            if (this._request && this.CATRTHuman !== undefined) {
                this._request = false;
                this.CATRTHuman.UpdateSkinning();
            }

            return this;
        };

        /**
         * The task allows to animate a Human.
         *
         * @exports HumanAnimationTask
         * @class 
         * @constructor
         * @private
         * @extends EP.Task
         * @param {STU.Human} iHuman, Human actor corresponding to the event
         * @memberof STU
         */
        var HumanAnimationTask = function (iHuman, iAnimation, iName) {
            Task.call(this);

            this._name = iName;

            this._actor = iHuman;

            this._animation = iAnimation;

            this._elapsedTime = 0.0;
            this._endTick = this._animation.GetAnimationEndTick();
            this._timeUnit = 33;

            this.finished = false;

            this._skinningTask = null;
        };

        HumanAnimationTask.prototype = new Task();
        HumanAnimationTask.constructor = HumanAnimationTask;

        /**
         * This is the classic run method of any task.
         *
         * @method
         * @private
         * @param {Object} iExContext, the context of execution passed to any task on it's run.
         */
        HumanAnimationTask.prototype.onExecute = function (iExContext) {
            if (this.finished) {
                return this;
            }

            if (undefined === this._actor || null === this._actor) {
                return this;
            }

            if (undefined === this._animation || null === this._animation) {
                return this;
            }

            this._elapsedTime += iExContext.getDeltaTime();
            var currentTick = Math.floor(this._elapsedTime / this._timeUnit);

            if (currentTick >= this._endTick) {
                this._animation.AnimationTick(this._actor.CATRTHumanSkeleton, this._endTick);

                if (this._actor.visible) {
                    this._actor.updateSkinning();
                }

                this.finished = true;

                TaskPlayer.removeTask(this);

                var evt = new STU.HumanAnimationFinishedEvent();
                evt.setHuman(this._actor);
                evt.setAnimation(this._name);
                evt.setFinished(this.finished);

                this._actor.dispatchEvent(evt);

                return this;
            }

            this._animation.AnimationTick(this._actor.CATRTHumanSkeleton, currentTick);
            if (this._actor.visible) {
                this._actor.updateSkinning();
            }

            return this;
        };

        HumanAnimationTask.prototype.onStart = function () {
            if (undefined === this._actor || null === this._actor) {
                return this;
            }

            if (typeof this._timeUnit !== 'number' || this._timeUnit === 0) {
                this._timeUnit = 1;
            }

            this._animation.AnimationTick(this._actor.CATRTHumanSkeleton, 0);
            if (this._actor.visible) {
                this._actor.updateSkinning();
            }

            this.sendAnimationStartEvent();

            return this;
        };

        HumanAnimationTask.prototype.sendAnimationStartEvent = function () {
            var evt = new STU.HumanAnimationStartedEvent();
            evt.setHuman(this._actor);
            evt.setAnimation(this._name);
            this._actor.dispatchEvent(evt);

            return this;
        };


        /**
         * Describe a STU.Actor3D which represents a Human created or imported in the experience.<br/>
         * 
         *
         * @exports Human
         * @class 
         * @constructor
         * @noinstancector
         * @public
         * @extends {STU.Actor3D}
         * @memberof STU
         * @alias STU.Human
         */
        var Human = function () {
            Actor3D.call(this);
            this.name = 'Human';

            this._animationTask;

            /**
             * Human skeleton.
             *
             * Note: This property is in read access only.
             *
             * @member
             * @instance
             * @name skeleton
             * @public
             * @readOnly
             * @type {STU.HumanSkeleton}
             * @memberOf STU.Human
             */
            this._skeleton = new HumanSkeleton(this);
            Object.defineProperty(this, 'skeleton', {
                enumerable: true,
                configurable: true,
                get: function () {
                    return this.getSkeleton();
                }
            });

            this._postureBackup = {
                actorTransform: null,
                rootPosition: null,
                eulerAngles: []
            };
        };

        //////////////////////////////////////////////////////////////////////////////
        //                           Prototype definitions                          //
        //////////////////////////////////////////////////////////////////////////////
        Human.prototype = new Actor3D();
        Human.prototype.constructor = Human;

        /**
         * Return the matrix transformation of this STU.Human.
         * By default, the function uses the World referential.
         * This method overwrite STU.Actor3D.getTransform.
         *
         * @method
         * @public
         * @param {STU.Actor3D} [iRef] instance object corresponding to the referential
         * @return {DSMath.Transformation} instance object corresponding to the matrix transformation
         * @see STU.Human#setTransform
         */
        Human.prototype.getTransform = function (iRef) {
            return Actor3D.prototype.getTransform.call(this, iRef);
        };

        /**
         * Set a new matrix transformation for this STU.Human.
         * By default, the function uses the World referential.
         * This method calls STU.Actor3D.setTransform.
         *
         * @method
         * @private
         * @param {DSMath.Transformation} iTransform instance object corresponding to the matrix transformation
         * @param {STU.Actor3D} [iRef] instance object corresponding to the referential
         * @see STU.Human#getTransform
         */
        Human.prototype.setTransform_ActorOnly = function (iTransform, iRef) {
            return Actor3D.prototype.setTransform.call(this, iTransform, iRef);
        };

        /**
         * Set a new matrix transformation for this STU.Human.
         * By default, the function uses the World referential.
         * This method overwrite STU.Actor3D.setTransform.
         *
         * @method
         * @public
         * @param {DSMath.Transformation} iTransform instance object corresponding to the matrix transformation
         * @param {STU.Actor3D} [iRef] instance object corresponding to the referential
         * @see STU.Human#getTransform
         */
        Human.prototype.setTransform = function (iTransform, iRef) {
            if (this.HumanMotion instanceof STU.HumanMotion === true && this.HumanMotion.getActivationState() === STU.eActivationState.eActive && this.HumanMotion.animate === true) {
                this.HumanMotion.setLocation(iTransform, iRef);
                return this;
            } else {
                return Actor3D.prototype.setTransform.call(this, iTransform, iRef);
            }
        };

        /**
         * Set a new scale for this STU.Human.
         * This method overwrite STU.Actor3D.setScale and will do nothing because a Human actor cannot be scaled.
         *
         * @method
         * @public
         * @param {number} iScale corresponding to the new scale value
         * @param {STU.Actor3D} [iRef] instance object corresponding to the referential
         * @see STU.Human#getScale
         */
        Human.prototype.setScale = function (iScale, iRef) {
            //console.debug('[STU.Human.setScale] Human cannot be scaled');
        };

        /**
         * Return the scale of this STU.Human.
         * By default, the function uses the World referential.
         * This method overwrite STU.Actor3D.getScale and will always return 1 because a Human actor cannot be scaled.
         *
         * @method
         * @public
         * @param {STU.Actor3D} [iRef] instance object corresponding to the referential
         * @return {number} corresponding to the scale value
         * @see STU.Human#setScale
         */
        Human.prototype.getScale = function (iRef) {
            return Actor3D.prototype.getScale.call(this, iRef);
        };

        /**
         * Returns a posture local to this actor, with the given name
         *
         * @method
         * @public
         * @param {string}   
         * @return {STU.HumanPosture}
         */
        Human.prototype.getPostureByName = function (iName) {
            if (this._humanPostures !== undefined && this._humanPostures !== null) {
                var count = this._humanPostures.length;
                for (var i = 0; i < count; i++) {
                    var posture = this._humanPostures[i];
                    if (posture !== undefined) {
                        if (iName === posture.name) {
                            return posture;
                        }
                    }
                }
            }
            return null;
        };

        /**
         * Returns all postures local to this actor
         *
         * @method
         * @public
         * @return {Array.<STU.HumanPosture>}
         */
        Human.prototype.getPostures = function () {
            return (this._humanPostures !== undefined && this._humanPostures !== null) ? this._humanPostures : [];
        };

        /**
         * Returns an animation local to this actor, with the given name
         *
         * @method
         * @public
         * @param {string}   
         * @return {STU.Animation}
         */
        Human.prototype.getAnimationByName = function (iName) {
            if (this._humanAnimations !== undefined && this._humanAnimations !== null) {
                var count = this._humanAnimations.length;
                for (var i = 0; i < count; i++) {
                    var anim = this._humanAnimations[i];
                    if (anim !== undefined) {
                        if (iName === anim.name) {
                            return anim;
                        }
                    }
                }
            }
            return Actor3D.prototype.getAnimationByName.call(this, iName);
        };

        /**
         * Returns all animations local to this actor
         *
         * @method
         * @public
         * @return {Array.<STU.Animation>}
         */
        Human.prototype.getAnimations = function () {
            var humanAnim = (this._humanAnimations !== undefined && this._humanAnimations !== null) ? this._humanAnimations : [];
            return humanAnim.concat(Actor3D.prototype.getAnimations.call(this));
        };

        /**
         * Return the list of animation names.
         *
         * @method
         * @public
         * @return {string[]} corresponding to the list of animation names
         */
        Human.prototype.getAnimationNames = function () {
            var names = [];

            if (this._animations instanceof Array === false) {
                return names;
            }

            var count = this._animations.length;
            for (var i = 0; i < count; i++) {
                names.push(this._animations[i].name);
            }

            return names;
        };

        /**
         * Start an animation.
         *
         * @method
         * @public
         * @param {string} iName - animation name
         * @return {STU.Human}
         */
        Human.prototype.startAnimation = function (iName) {
            this.stopCurrentAnimation();

            var animation = null;
            if (this._animations instanceof Array === false) {
                console.warn('This human has no animation');
                return this;
            }

            var count = this._animations.length;
            for (var i = 0; i < count; i++) {
                if (iName === this._animations[i].name) {
                    animation = this._animations[i].CATIHumanAnimation;
                }
            }

            if (animation === null) {
                console.warn("This human has no '" + iName + "' animation");
                return this;
            }

            // note(eb7): GetTimeUnitInMS is not ready to use
            //var task = new STU.HumanAnimationTask(this, iIndex, this.CATIHumanAnimationSet.GetAnimationEndTick(iIndex), this.CATIHumanAnimationSet.GetTimeUnitInMS(iIndex));
            this._animationTask = new HumanAnimationTask(this, animation, iName);
            TaskPlayer.addTask(this._animationTask, STU.getHumanTaskGroup(STU.EHumanTaskGroups.eAnimation));

            return this;
        };


        /**
         * Stop the current animation task.
         *
         * @method
         * @public
         * @return {STU.Human}
         */
        Human.prototype.stopCurrentAnimation = function () {
            if (undefined === this._animationTask || null === this._animationTask) {
                return this;
            }

            if (!this._animationTask.finished) {
                TaskPlayer.removeTask(this._animationTask);

                var evt = new STU.HumanAnimationStoppedEvent();
                evt.setHuman(this);
                evt.setAnimation(this._animationTask._name);
                evt.setFinished(this._animationTask.finished);

                this._animationTask.finished = true;

                delete this._animationTask;

                this.dispatchEvent(evt);
            } else {
                delete this._animationTask;
            }

            return this;
        };

        /**
         * Return the Human Skeleton.
         *
         * @method
         * @public
         * @return {STU.HumanSkeleton} corresponding to the Human Skeleton
         */
        Human.prototype.getSkeleton = function () {
            return this._skeleton;
        };

        /**
         * Update skinning of human.
         *
         * @method
         * @public
         * @return {STU.HumanSkeleton} corresponding to the Human Skeleton
         */
        Human.prototype.updateSkinning = function () {
            if (undefined === this._skinningTask || null === this._skinningTask) {
                return this;
            }

            this._skinningTask.request();
            return this;
        };

        /**
         * Process to execute when this STU.Human is initializing.
         *
         * @method
         * @private
         * @see STU.Human#onDispose
         */
        Human.prototype.onInitialize = function (oExceptions) {
            if (undefined === this.CATICXPHumanActor || null === this.CATICXPHumanActor) {
                console.error('invalid human build state');
            } else if (undefined === this.CATRTHuman || undefined === this.CATRTHumanSkeleton) {
                this.CATICXPHumanActor.InitHuman(this);
                if (undefined === this.CATRTHuman || null === this.CATRTHuman || undefined === this.CATRTHumanSkeleton || null === this.CATRTHumanSkeleton) {
                    console.error('invalid human');
                } else {
                    this.CATICXPHumanActor.PostureBackup();
                }
            }

            Actor3D.prototype.onInitialize.call(this, oExceptions);

            var funcInitialize = function (list) {
                if (list !== undefined && list !== null) {
                    for (var i = 0; i < list.length; i++) {
                        list[i].initialize(oExceptions);
                    }
                }
            };

            funcInitialize(this._humanAnimations);
            funcInitialize(this._humanPostures);
        };


        /**
         * Process to execute when this STU.Human is disposing.
         *
         * @method
         * @private
         * @see STU.Human#onInitialize
         */
        Human.prototype.onDispose = function () {
            if (undefined !== this.CATICXPHumanActor && null !== this.CATICXPHumanActor) {
                if (this._animations instanceof Array === true) {
                    var count = this._animations.length;
                    for (var i = 0; i < count; i++) {
                        this.CATICXPHumanActor.__ReleaseCATIHumanAnimation(this._animations[i]);
                    }
                }

                var isValid = (undefined !== this.CATRTHumanSkeleton && null !== this.CATRTHumanSkeleton) ? true : false;

                this.CATICXPHumanActor.DisposeHuman(this);

                if (isValid) {
                    this.CATICXPHumanActor.PostureRestore();
                }
            }

            var funcDispose = function (list) {
                if (list !== undefined && list !== null) {
                    for (var i = list.length - 1; i >= 0; i--) {
                        list[i].dispose();
                    }
                }
            };

            funcDispose(this._humanAnimations);
            funcDispose(this._humanPostures);

            Actor3D.prototype.onDispose.call(this);
        };

        /**
         * Process to execute after this STU.Human is activated.
         *
         * @method
         * @private
         * @see STU.Human#onDeactivate
         */
        Human.prototype.onActivate = function (oExceptions) {
            Actor3D.prototype.onActivate.call(this, oExceptions);

            this._skinningTask = new HumanSkinningTask(this.CATRTHuman);
            TaskPlayer.addTask(this._skinningTask, STU.getTaskGroup(STU.ETaskGroups.ePostProcess));

            var funcActivate = function (list) {
                if (list !== undefined && list !== null) {
                    for (var i = 0; i < list.length; i++) {
                        list[i].updateActivity(oExceptions);
                    }
                }
            };

            funcActivate(this._humanAnimations);
            funcActivate(this._humanPostures);
        };


        /**
         * Process to execute after this STU.Human is deactivated.
         *
         * @method
         * @private
         * @see STU.Human#onActivate
         */
        Human.prototype.onDeactivate = function () {
            if (undefined !== this._animationTask && null !== this._animationTask) {
                this.stopCurrentAnimation();
            }

            var funcDeactivate = function (list) {
                if (list !== undefined && list !== null) {
                    for (var i = list.length - 1; i >= 0; i--) {
                        list[i].updateActivity();
                    }
                }
            };

            funcDeactivate(this._humanAnimations);
            funcDeactivate(this._humanPostures);

            if (this._skinningTask) {
                TaskPlayer.removeTask(this._skinningTask);
                delete this._skinningTask;
                this._skinningTask = null;
            }
            

            Actor3D.prototype.onDeactivate.call(this);
        };

        // Expose only those entities in STU namespace.
        STU.Human = Human;

        return Human;
    }
);

define('StuHuman/StuHumanNa', ['DS/StuHuman/StuHumanNa'], function (Human) {
    'use strict';

    return Human;
});
