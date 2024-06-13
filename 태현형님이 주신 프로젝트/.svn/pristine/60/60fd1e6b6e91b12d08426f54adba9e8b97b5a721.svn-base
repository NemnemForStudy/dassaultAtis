
var stuContextRequires = ['DS/StuCore/StuContext', 'DS/StuModel/StuBehavior', 'DS/EPTaskPlayer/EPTask', 'DS/EPTaskPlayer/EPTaskPlayer', 'DS/MathematicsES/MathsDef'
];
if (typeof (window) === 'undefined') {
	stuContextRequires.push('binary!StudioIVModelRT');
}

/* global define */
define('DS/StudioIV/StuiVScenario', stuContextRequires,
	function (STU, Behavior, Task, TaskPlayer, DSMath, EK_Bind) {
		'use strict';


		/**
		 * Describe a IVScenario<br/>
		 * 
		 *
		 * @exports IVScenario
		 * @class 
		 * @constructor
		 * @noinstancector
		 * @public
		 * @extends {STU.Behavior}
		 * @memberOf STU
		 * @alias STU.IVScenario
		 */
		var IVScenario = function () {

			Behavior.call(this);
			this.name = 'IVScenario';

			this.associatedTask;

			//////////////////////////////////////////////////////////////////////////
			// Properties that should NOT be visible in UI
			//////////////////////////////////////////////////////////////////////////


			this._iVSUI = null;

			this._ARCamera = null;

			this._markerTransform = new DSMath.Transformation();

			this._markerTransformRAW = new DSMath.Transformation();


			//////////////////////////////////////////////////////////////////////////
			// Properties that should be visible in UI
			//////////////////////////////////////////////////////////////////////////

			this.marker;

			/**
			 * Visibility state of the background stream
			 * @member
			 * @instance
			 * @name hideStream
			 * @private
			 * @type {Boolean}
			 * @default {false}
			 * @memberOf STU.IVScenario
			 */
			this._hideStream = false;
			Object.defineProperty(this, 'hideStream', {
				enumerable: true,
				configurable: true,
				get: function () {
					if (!!this._iVSUI) {
						return (this._iVSUI.getBackgroundStreamState() === 0);
					}

					return false;
				},
				set: function (iHideStream) {

					this._hideStream = iHideStream;

					this.updateHideStream();					
				}
			});

			// Transform from OpenCV ref to V6
			this.P_OCV_V6 = new DSMath.Transformation();
			this.P_OCV_V6.setRotationFromEuler([Math.PI / 2, Math.PI / 2, 0]);
		};

		IVScenario.prototype = new Behavior();
		IVScenario.prototype.constructor = IVScenario;
		IVScenario.prototype.protoId = 'C9856424-213D-45F2-B9A5-F6C0AA2FDBA7';
		IVScenario.prototype.pureRuntimeAttributes = [].concat(Behavior.prototype.pureRuntimeAttributes);

		/**
		 * Returns true when the marker is tracked
		 * @public
		 */
		IVScenario.prototype.isMarkerTracked = function () {
			if (!!this._iVSUI) {
				return this._iVSUI.isMarkerTracked();
			}
			return false;
		};


		/**
		 * Transformation of the tracked marker.<br/>
		 *
		 * Can be null at start when the marker is still not tracked.
		 *
		 * @public
		 * @return {DSMath.Transformation}
		 */
		IVScenario.prototype.getMarkerTransform = function () {
			return this._markerTransform;
		};

		/**
		 * Transformation of the augmented reality camera.<br/>
		 * 
		 * @public
		 * @return {DSMath.Transformation}
		 */
		IVScenario.prototype.getCameraTransform = function () {
			return this._ARCamera.getTransform();
		};


		/**
		 * Process executed when STU.IVScenario is activating
		 * @private
		 * @method
		 */
		IVScenario.prototype.onActivate = function (oExceptions) {
			Behavior.prototype.onActivate.call(this, oExceptions);

			var parentActor = this.getActor();
			if (parentActor === undefined || parentActor === null) {
				throw new TypeError(this.name + ' behavior must have a parent actor');
			}

			if (parentActor instanceof STU.Camera === false) {
				throw new TypeError(this.name + ' behavior must be under a STU.Camera');
			}

			if (STU.Experience.getCurrent().getStartupCamera() !== parentActor) {
				console.info(this.name + ' behavior is not under the startup camera. The behavior is deactivated');
				return;
			}

			this._ARCamera = parentActor;

			var markerActor;
			if (!!this.marker && this.marker instanceof STU.ARMarkerActor) {
				markerActor = this.marker;
			} else {
				var actorsInExp = STU.Experience.getCurrent().getActors();
				var nbActors = actorsInExp.length;
				for (var i = 0; i < nbActors; ++i) {
					var actor = actorsInExp[i];
					if (actor !== undefined && actor !== null && actor instanceof STU.ARMarkerActor) {
						markerActor = actorsInExp[i];
						break;
					}
				}
			}

			this._iVSUI = this.buildWrapper(); // jshint ignore:line
			this._iVSUI.createIVScenario();
			this.updateHideStream();

			this._iVSUI.setMarkerType(markerActor.pattern);
			this._iVSUI.setMarkerSize(markerActor.size);

			

			var retVal = this._iVSUI.startTracking();
			if (retVal < 0) {
				console.error('IVScenario is unable to start the tracking engine');
				return;
			}

			//the user has set the accuracy to "no tracking"
			//no task will be created 
			if (this._iVSUI.isNoTrackingEnabled() === true) {
				return;
			}
		};

		/**
		 * 
		 * @private
		 */
		IVScenario.prototype.updateHideStream = function () {
			if (!!this._iVSUI) {
				if (this._hideStream === true) {
					this._iVSUI.setBackgroundStreamState(0);
				} else {
					this._iVSUI.setBackgroundStreamState(1);
				}
			}
		};

		/**
		 * Process executed when STU.IVScenario is deactivating
		 * @private
		 * @method
		 */
		IVScenario.prototype.onDeactivate = function () {
			if (this._iVSUI !== undefined && this._iVSUI !== null) {
				this._iVSUI.dispose();
				this._iVSUI = null;
			}

			Behavior.prototype.onDeactivate.call(this);
		};

		/**
		 * Method called each frame by the task manager
		 *
		 * @method
		 * @private
		 */
		IVScenario.prototype.onExecute = function (iContext) {
			//skip until the marker is tracked
			if (this.isMarkerTracked() === false) {
				return this;
			}

			this._iVSUI.getVirtualGlobalTransform(this._markerTransformRAW);
			this._markerTransform = DSMath.Transformation.multiply(this.P_OCV_V6, this._markerTransformRAW);
			this._ARCamera.viewAngle = this._iVSUI.getCameraDeviceViewAngle();

			this.execute();
		};

		// Expose in STU namespace.
		STU.IVScenario = IVScenario;

		return IVScenario;
	});

define('StudioIV/StuiVScenario', ['DS/StudioIV/StuiVScenario'], function (IVScenario) {
	'use strict';

	return IVScenario;
});
