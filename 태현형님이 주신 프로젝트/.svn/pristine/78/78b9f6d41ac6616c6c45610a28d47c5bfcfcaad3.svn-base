var stuContextRequires = ['DS/StuCore/StuContext', 'DS/StuModel/StuBehavior', 'DS/EPTaskPlayer/EPTask', 'DS/EPTaskPlayer/EPTaskPlayer', 'DS/MathematicsES/MathsDef'];
if (typeof (window) === 'undefined') {
	stuContextRequires.push('binary!StudioSoundModelRT');
}

define('DS/StuSound/StuSoundPlayer', stuContextRequires, function (STU, Behavior, Task, TaskPlayer, DSMath) {
	'use strict';

	/**
	 * Describe a behavior able to play a specialized sound.
	 *
	 * @exports SoundPlayer
	 * @class 
	 * @constructor
	 * @noinstancector
	 * @public
	 * @extends {STU.Behavior}
	 * @memberOf STU
     * @alias STU.SoundPlayer
	 */
	var SoundPlayer = function () {

		Behavior.call(this);
		this.name = 'SoundPlayer';

		/**
		 * Sound resource that will be played
		 *
		 * @member
		 * @instance
		 * @name  sound
		 * @public
		 * @type {STU.SoundResource}
		 * @memberOf STU.SoundPlayer
		 */
		this._sound = null;
		Object.defineProperty(this, 'sound', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._sound;
			},
			set: function (iSound) {
				this._sound = iSound;

				this.updateSound();
			}
		});


		/**
		 * Loop mode <br/>
		 *  true : the sound is repeated after having reached the end <br/>
		 *  false : the sound will stop when the end is reached <br/>
		 *
		 * @member
		 * @instance
		 * @name  loop
		 * @public
		 * @type {Boolean}
		 * @memberOf STU.SoundPlayer
		 */
		this._loop = true;
		Object.defineProperty(this, 'loop', {
			enumerable: true,
			configurable: true,
			get: function () {
				if (!!this._sndSoundWrapper && this._sndSoundWrapper.getEngineStatus() === 1) {
					return (1 === this._sndSoundWrapper.isLooping());
				}

				return this._loop;
			},
			set: function (iLoop) {
				this._loop = iLoop;

				// for onActivate, called by updateSound()
				if (!!this._sndSoundWrapper) {
					this._sndSoundWrapper.setLoopMode(iLoop);
				}
			}
		});

		/**
		 * Volume of played sound [0;1]
		 *
		 * @member
		 * @instance
		 * @name  volume
		 * @public
		 * @type {Number}
		 * @memberOf STU.SoundPlayer
		 */
		this._volume = 1.0;
		Object.defineProperty(this, 'volume', {
			enumerable: true,
			configurable: true,
			get: function () {
				// always this._volume, setVolume is always called with this._volume
				/*if (!!this._sndSoundWrapper) {
					this._volume = this._sndSoundWrapper.getVolume();
				}*/

				return this._volume;
			},
			set: function (iVolume) {
				this._volume = Math.min(Math.max(iVolume, 0), 1);

				// for onActivate, called by this.updateSound()
				if (!!this._sndSoundWrapper) {
					this._sndSoundWrapper.setVolume(this._volume);
				}
			}
		});

		/**
		 * Duration of the sound in seconds
		 *
		 * @member
		 * @instance
		 * @name  duration
		 * @readOnly
		 * @public
		 * @type {Number}
		 * @memberOf STU.SoundPlayer
		 */
		Object.defineProperty(this, 'duration', {
			enumerable: true,
			configurable: true,
			get: function () {
				var duration = -1;
				if (!!this._sndSoundWrapper) {
					duration = this._sndSoundWrapper.getDuration();
				}

				return duration;
			}
		});

		/**
		 * Percentage of the sound already played <br/>
		 * Range : [0;100]
		 *
		 * @member
		 * @instance
		 * @name  playPosition
		 * @readOnly
		 * @public
		 * @type {Number}
		 * @memberOf STU.SoundPlayer
		 */
		Object.defineProperty(this, 'playPosition', {
			enumerable: true,
			configurable: true,
			get: function () {
				var playPosition = -1;
				if (!!this._sndSoundWrapper) {
					playPosition = this._sndSoundWrapper.getPlayPostion();
				}

				return playPosition;
			}
		});


		/**
		 * Inner angle of the sound cone, in radian <br/>
		 * Range : [0;2*Math.PI]
		 *
		 * @member
		 * @instance
		 * @name  coneInnerAngle
		 * @private
		 * @default 2*Math.PI
		 * @type {Number}
		 * @memberOf STU.SoundPlayer
		 */
		this._coneInnerAngle = 2 * Math.PI;
		Object.defineProperty(this, 'coneInnerAngle', {
			enumerable: true,
			configurable: true,
			get: function () {
				if (!!this._sndSoundWrapper) {
					this._coneInnerAngle = this._sndSoundWrapper.getConeInnerAngle();
				}

				return this._coneInnerAngle;
			},
			set: function (iConeInnerAngle) {
				this._coneInnerAngle = iConeInnerAngle;

				this.updateConeInnerAngle();
			}
		});

		/**
		 * Outer angle of the sound cone, in radian <br/>
		 * Range : [0;2*Math.PI]
		 *
		 * @member
		 * @instance
		 * @name  coneOuterAngle
		 * @private
		 * @default 2*Math.PI
		 * @type {Number}
		 * @memberOf STU.SoundPlayer
		 */
		this._coneOuterAngle = 2 * Math.PI;
		Object.defineProperty(this, 'coneOuterAngle', {
			enumerable: true,
			configurable: true,
			get: function () {
				if (!!this._sndSoundWrapper) {
					this._coneOuterAngle = this._sndSoundWrapper.getConeOuterAngle();
				}

				return this._coneOuterAngle;
			},
			set: function (iConeOuterAngle) {
				this._coneOuterAngle = iConeOuterAngle;

				this.updateConeOuterAngle();
			}
		});

		/**
		 * Source roll-off factor <br/>
		 * Range : [0.0 ; +inf]
		 *
		 * @member
		 * @instance
		 * @name  rollOffFactor
		 * @private
		 * @default 1
		 * @type {Number}
		 * @memberOf STU.SoundPlayer
		 */
		this._rollOffFactor = 1;
		Object.defineProperty(this, 'rollOffFactor', {
			enumerable: true,
			configurable: true,
			get: function () {
				if (!!this._sndSoundWrapper) {
					this._rollOffFactor = this._sndSoundWrapper.getRollOffFactor();
				}

				return this._rollOffFactor;
			},
			set: function (iRollOffFactor) {
				this._rollOffFactor = iRollOffFactor;

				this.updateRollOffFactor();
			}
		});


		/**
		 * Sound pitch <br/>
		 * Range : [0.5;2.0]
		 *
		 * @member
		 * @instance
		 * @name  pitch
		 * @private
		 * @default 1
		 * @type {Number}
		 * @memberOf STU.SoundPlayer
		 */
		this._pitch = 1.0;
		Object.defineProperty(this, 'pitch', {
			enumerable: true,
			configurable: true,
			get: function () {
				if (!!this._sndSoundWrapper) {
					this._pitch = this._sndSoundWrapper.getPitch();
				}

				return this._pitch;
			},
			set: function (iPitch) {
				this._pitch = iPitch;

				this.updatePitch();
			}
		});

		/**
		 * The speed of sound. It is used in Doppler computing.
		 *
		 * @member
		 * @instance
		 * @name  tempo
		 * @private
		 * @type {Number}
		 * @default  343.3
		 * @memberOf STU.SoundPlayer
		 */
		this._tempo = 0;
		Object.defineProperty(this, 'tempo', {
			enumerable: true,
			configurable: true,
			get: function () {
				if (!!this._sndSoundWrapper) {
					this._tempo = this._sndSoundWrapper.getTempo();
				}

				return this._tempo;
			},
			set: function (iTempo) {
				this._tempo = iTempo;

				this.updateTempo();
			}
		});


		this._speed = 1.0;
		Object.defineProperty(this, 'speed', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._speed;
			},
			set: function (iSpeed) {
				this._speed = iSpeed;
				this.pitch = iSpeed;
			}
		});

		this._position = null;
		this._direction = null;
		this._sndSoundWrapper = this.buildWrapper(); // jshint ignore:line

		this._isSpatialized = false;
	};



	SoundPlayer.prototype = new Behavior();
	SoundPlayer.prototype.constructor = SoundPlayer;
	SoundPlayer.prototype.pureRuntimeAttributes = [
		'_loop', '_volume', '_position',
		'_direction', '_sndSoundWrapper', '_isSpatialized'
	].concat(Behavior.prototype.pureRuntimeAttributes);


	/**
	 * Update method called each frames
	 *
	 * @method
	 * @private
	 * @param   {Number} iElapsedTime Time elapsed since last frame
	 */
	SoundPlayer.prototype.onExecute = function () {
		//spacialiazed sound
		if (this._isSpatialized) {
			var parent = this.getActor();
			// IBS CORRECTION SUMMER PROJECT
			var transfo = parent.getTransform("World");

			var position = transfo.vector;
			position.multiplyScalar(0.001); // cxp unit is mm sound engine is m
			var direction = transfo.matrix.getFirstColumn();
			//Cameras are looking to -x
			if (parent instanceof STU.Camera) {
				direction.negate();
			}

			this._sndSoundWrapper.setPosition(position);
			this._sndSoundWrapper.setDirection(direction);
		}
	};

	/**
	 * Plays the sound resource
	 * @method
	 * @public
	 */
	SoundPlayer.prototype.play = function () {
		this._sndSoundWrapper.play();
	};

	/**
	 * Pauses the sound resource
	 * @method
	 * @public
	 */
	SoundPlayer.prototype.pause = function () {
		this._sndSoundWrapper.pause();
	};

	/**
	 * Stops the playing sound
	 * @method
	 * @public
	 */
	SoundPlayer.prototype.stop = function () {
		this._sndSoundWrapper.stop();
	};

	/**
	 * Play state : <br/>
	 *     true if the sound is playing <br/>
	 *     false otherwise <br/>
	 *
	 * @method
	 * @public
	 * @return {Boolean}
	 */
	SoundPlayer.prototype.isPlaying = function () {
		return this._sndSoundWrapper.isPlaying();
	};

	/**
	 * Pause state : <br/>
	 *     true if the sound is paused <br/>
	 *     false otherwise <br/>
	 *
	 * @method
	 * @public
	 * @return {Boolean}
	 */
	SoundPlayer.prototype.isPaused = function () {
		return this._sndSoundWrapper.isPaused();
	};

	/**
	 * Stop state : <br/>
	 *     true if the sound is stopped <br/>
	 *     false otherwise <br/>
	 *
	 * @method
	 * @public
	 * @return {Boolean}
	 */
	SoundPlayer.prototype.isStopped = function () {
		return this._sndSoundWrapper.isStopped();
	};


	/**
	 * Process executed when SoundPlayer is activating
	 * @method
	 * @private
	 */
	SoundPlayer.prototype.onActivate = function (oExceptions) {
		Behavior.prototype.onActivate.call(this, oExceptions);

		var parent = this.getParent();
		this._isSpatialized = parent instanceof STU.Actor3D;

		if (!this._sndSoundWrapper || !this._sound || !this._sound.CATI3DExperienceObject) {
			return;
		}

		this.updateSound();
		this.updateTempo();
		this.updatePitch();
		this._sndSoundWrapper.setSpeed({
			x: 1,
			y: 1,
			z: 1
		});

		this.updateConeInnerAngle();
		this.updateConeOuterAngle();
		this.updateRollOffFactor();

		// Sound engine activation 
		var sndStatus = this._sndSoundWrapper.getEngineStatus();
		if (sndStatus !== 1) {
			this._sndSoundWrapper.playSoundEngine();
		}
	};

	/**
	 * 
	 * @private
	 */
	SoundPlayer.prototype.updateSound = function () {
		if (!!this._sndSoundWrapper && !!this._sound && !!this._sound.CATI3DExperienceObject) {
			var isPlaying = this.isPlaying();
			this.stop();

			this._sndSoundWrapper.setResource(this._sound.CATI3DExperienceObject);
			// IBS CORRECTION SUMMER PROJECT
			this._sndSoundWrapper.setSpatialized(this._isSpatialized);
			this._sndSoundWrapper.setLoopMode(this._loop);
			this._sndSoundWrapper.setVolume(this._volume);


			// IR-376085 
			// Handle the case where the user wants to change the sound while playing
			if (isPlaying) {
				this.play();
			}
		}
	};

	/**
	 * 
	 * @private
	 */
	SoundPlayer.prototype.updateTempo = function () {
		if (!!this._sndSoundWrapper) {
			this._sndSoundWrapper.setTempo(this._tempo);
		}
	};

	/**
	 * 
	 * @private
	 */
	SoundPlayer.prototype.updatePitch = function () {
		if (!!this._sndSoundWrapper) {
			this._sndSoundWrapper.setPitch(this._pitch);
		}
	};

	/**
	 * 
	 * @private
	 */
	SoundPlayer.prototype.updateConeInnerAngle = function () {
		if (!!this._sndSoundWrapper) {
			this._sndSoundWrapper.setConeInnerAngle(this._coneInnerAngle);
		}
	};

	/**
	 * 
	 * @private
	 */
	SoundPlayer.prototype.updateConeOuterAngle = function () {
		if (!!this._sndSoundWrapper) {
			this._sndSoundWrapper.setConeOuterAngle(this._coneOuterAngle);
		}
	};

	/**
	 * 
	 * @private
	 */
	SoundPlayer.prototype.updateRollOffFactor = function () {
		if (!!this._sndSoundWrapper) {
			this._sndSoundWrapper.setRollOffFactor(this._rollOffFactor);
		}
	};

	/**
	 * Process executed when SoundPlayer is deactivating
	 * @method
	 * @private
	 */
	SoundPlayer.prototype.onDeactivate = function () {
		if (!!this._sndSoundWrapper) {
			this._sndSoundWrapper.stop();
			this._sndSoundWrapper.stopSoundEngine();
		}

		// delete this._sndSoundWrapper;

		Behavior.prototype.onDeactivate.call(this);
	};

	// Expose in STU namespace.
	STU.SoundPlayer = SoundPlayer;

	return SoundPlayer;
});

define('StuSound/StuSoundPlayer', ['DS/StuSound/StuSoundPlayer'], function (SoundPlayer) {
	'use strict';

	return SoundPlayer;
});
