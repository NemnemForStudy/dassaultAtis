/* global define */
define('DS/StuCameras/StuFreeNavigation', ['DS/StuCore/StuContext', 'DS/EP/EP', 'DS/StuCameras/StuNavigation', 'DS/MathematicsES/MathsDef', 'DS/StuCore/StuEnvServices'], function (STU, EP, Navigation, DSMath, StuEnvServices) {
	'use strict';

	/**
	 * Describe a free camera navigation.
	 *
	 * @exports FreeNavigation
	 * @class 
	 * @constructor
	 * @noinstancector
	 * @public
	 * @extends {STU.Navigation}
	 * @memberOf STU
	 * @alias STU.FreeNavigation
	 */
	var FreeNavigation = function () {

		Navigation.call(this);
		this.name = 'FreeNavigation';

		//////////////////////////////////////////////////////////////////////////
		// Properties that should NOT be visible in UI
		//////////////////////////////////////////////////////////////////////////  
		//var myEnvServices = new StuEnvServices();
		this._New_Cam_Impl = StuEnvServices.CATGetEnv("CXP_NEW_NAVIGATION");


		this._targetToGoTo = null;
		this._targetCoordinateToGoTo = null;
		this._targetVirtualPointToGoTo = null;
		this._isGoingTo = false;
		this._elapsedTimeGoTo = 0;
		this._timeToGoTo = 1.5;
		this._isFollowing = false;

		/**
		 * Flag indicating on "navigate on click" mode, the input is compute according to the position where the mouse has been pressed (not anymore based on the center of the screen).
		 *
		 * @member
		 * @private
		 * @type {boolean}
		 */
		this._useMousePosAsRefWithNavigateOnClick = true;

		/**
		* Position of the center of the reticule widget relatively to the center of the window
		*
		* @member
		* @private
		* @type {Array.<number>}
		*/
		this._leftReticulePosition = {
			'x': 0,
			'y': 0
		};

		/**
		 * Position of the center of the reticule widget relatively to the center of the window
		 *
		 * @member
		 * @private
		 * @type {Array.<number>}
		*/
		this._rightReticulePosition = {
			'x': 0,
			'y': 0
		};

		/**
		 * Widget handeling the reticule behaviour
		 *
		 * @member
		 * @private
		 * @type {stu__ReticuleWidget}
		 */
		this._leftReticuleWidget = null;

		/**
		 * Widget handeling the reticule behaviour
		 *
		 * @member
		 * @private
		 * @type {stu__ReticuleWidget}
		 */
		this._rightReticuleWidget = null;

		/**
		 * Flag indicating if the cursor is in the neutral zone of the reticule widget
		 *
		 * @member
		 * @private
		 * @type {boolean}
		 */
		this._isCursorInNeutralZoneL = false;

		/**
		 * Flag indicating if the cursor is in the neutral zone of the reticule widget
		 *
		 * @member
		 * @private
		 * @type {boolean}
		 */
		this._isCursorInNeutralZoneR = false;

		//////////////////////////////////////////////////////////////////////////
		// Properties that should be visible in UI
		//////////////////////////////////////////////////////////////////////////

		///
		/////////      General
		///

		///
		/////////      Parameters
		///

		/**
		 * Set the walk speed (in unit/second)
		 *
		 * @public
		 * @type {number}
		 */
		this.speed = 3000;

		/**
		 * Set the run speed (in unit/second)
		 *
		 * @public
		 * @type {number}
		 */
		this.turboSpeed = 6000;

		///
		/////////      Controls
		///

	    /**
         * Enable or disable navigation with gamepad
         *
         * @member
         * @public
         * @type {boolean}
         */
		this.useGamepad = true;

		/**
		 *  Enable or disable touch
		 *
		 * @member
		 * @instance
		 * @name useTouch
		 * @public
		 * @type {Boolean}
		 * @default {false}
		 * @memberOf STU.FreeNavigation
		 */
		this._useTouch = false;
		Object.defineProperty(this, 'useTouch', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._useTouch;
			},
			set: function (value) {
				this._useTouch = value;
				if (this._inputManager !== undefined && this._inputManager !== null) {
					this._inputManager.useTouch = value;
				}
			}
		});

		/**
		 *  Mapped key for moving left
		 *
		 * @member
		 * @instance
		 * @name moveLeft
		 * @public
		 * @type {EP.Keyboard.EKey}
		 * @default {EP.Keyboard.EKey.eLeft}
		 * @memberOf STU.FreeNavigation
		 */
		this._moveLeft = EP.Keyboard.EKey.eLeft;
		Object.defineProperty(this, 'moveLeft', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._moveLeft;
			},
			set: function (value) {
				this._moveLeft = value;
				if (this._inputManager !== undefined && this._inputManager !== null) {
					this._inputManager.keyLeft = this._moveLeft;
				}
			}
		});

		/**
		 *  Mapped key for moving right
		 *
		 * @member
		 * @instance
		 * @name moveRight
		 * @public
		 * @type {EP.Keyboard.EKey}
		 * @default {EP.Keyboard.EKey.eRight}
		 * @memberOf STU.FreeNavigation
		 */
		this._moveRight = EP.Keyboard.EKey.eRight;
		Object.defineProperty(this, 'moveRight', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._moveRight;
			},
			set: function (value) {
				this._moveRight = value;
				if (this._inputManager !== undefined && this._inputManager !== null) {
					this._inputManager.keyRight = this._moveRight;
				}
			}
		});

		/**
		 *  Mapped key for moving forward
		 *
		 * @member
		 * @instance
		 * @name moveForward
		 * @public
		 * @type {EP.Keyboard.EKey}
		 * @default {EP.Keyboard.EKey.eUp}
		 * @memberOf STU.FreeNavigation
		 */
		this._moveForward = EP.Keyboard.EKey.eUp;
		Object.defineProperty(this, 'moveForward', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._moveForward;
			},
			set: function (value) {
				this._moveForward = value;
				if (this._inputManager !== undefined && this._inputManager !== null) {
					this._inputManager.keyUp = this._moveForward;
				}
			}
		});

		/**
		 *  Mapped key for moving backward
		 *
		 * @member
		 * @instance
		 * @name moveBackward
		 * @public
		 * @type {EP.Keyboard.EKey}
		 * @default {EP.Keyboard.EKey.eDown}
		 * @memberOf STU.FreeNavigation
		 */
		this._moveBackward = EP.Keyboard.EKey.eDown;
		Object.defineProperty(this, 'moveBackward', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._moveBackward;
			},
			set: function (value) {
				this._moveBackward = value;
				if (this._inputManager !== undefined && this._inputManager !== null) {
					this._inputManager.keyDown = this._moveBackward;
				}
			}
		});

		/**
		 *  Mapped key to activate turbo
		 *
		 * @member
		 * @instance
		 * @name turbo
		 * @public
		 * @type {EP.Keyboard.EKey}
		 * @default {EP.Keyboard.EKey.eShift}
		 * @memberOf STU.FreeNavigation
		 */
		this._turbo = EP.Keyboard.EKey.eShift;
		Object.defineProperty(this, 'turbo', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._turbo;
			},
			set: function (value) {
				this._turbo = value;
				if (this._inputManager !== undefined && this._inputManager !== null) {
					this._inputManager.keyTrigger1 = this._turbo;
				}
			}
		});
		
	    /**
		 *  Mapped key for moving up
		 *
		 * @member
		 * @instance
		 * @name moveUp
		 * @private
		 * @type {EP.Keyboard.EKey}
		 * @default {EP.Keyboard.EKey.ePageUp}
		 * @memberOf STU.FreeNavigation
		 */
		this._moveUp = EP.Keyboard.EKey.ePageUp;
		Object.defineProperty(this, 'moveUp', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._moveUp;
			},
			set: function (value) {
				this._moveUp = value;
				if (this._inputManager !== undefined && this._inputManager !== null) {
					this._inputManager.keyFront = this._moveUp;
				}
			}
		});

	    /**
		 *  Mapped key for moving down
		 *
		 * @member
		 * @instance
		 * @name moveDown
		 * @private
		 * @type {EP.Keyboard.EKey}
		 * @default {EP.Keyboard.EKey.ePageDown}
		 * @memberOf STU.FreeNavigation
		 */
		this._moveDown = EP.Keyboard.EKey.ePageDown;
		Object.defineProperty(this, 'moveDown', {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._moveDown;
			},
			set: function (value) {
				this._moveDown = value;
				if (this._inputManager !== undefined && this._inputManager !== null) {
					this._inputManager.keyBack = this._moveDown;
				}
			}
		});

		///
		/////////      Advanced
		///

		/**
		 * Prevent the camera from going throw objects
		 *
		 * @public
		 * @type {number}
		 */
		 this.avoidCollision = true;
	};

	FreeNavigation.prototype = new Navigation();
	FreeNavigation.prototype.constructor = FreeNavigation;
	FreeNavigation.prototype.protoId = '7741A5D5-EE30-4253-A2D4-505A65D36FCC';

	/**
	 * Process executed when STU.FreeNavigation is activating
	 *
	 * @private
	 */
	FreeNavigation.prototype.onActivate = function (oExceptions) {
		Navigation.prototype.onActivate.call(this, oExceptions);

		//Registering key bindings
		this._inputManager.useMouse = true;
		this._inputManager.useKeyboard = true;
		this._inputManager.mouseAxis = 2;
		this._inputManager.mouseInvertY = false;
		this._inputManager.keyLeft = this.moveLeft;
		this._inputManager.keyRight = this.moveRight;
		this._inputManager.keyUp = this.moveForward;
		this._inputManager.keyDown = this.moveBackward;
		this._inputManager.keyFront = this.moveUp;
		this._inputManager.keyBack = this.moveDown;
		this._inputManager.keyTrigger1 = this.turbo; //turbo key
		this._inputManager.useGamepad = this.useGamepad;
		this._inputManager.useTouch = this._useTouch;
		this._inputManager.useDoubleTouch = true;
		this._useMousePosAsRefWithNavigateOnClick = true;
	};

	/**
	 * Process executed when STU.FreeNavigation is deactivating
	 *
	 * @private
	 */
	FreeNavigation.prototype.onDeactivate = function () {
		Navigation.prototype.onDeactivate.call(this);

		if (this._leftReticuleWidget !== undefined && this._leftReticuleWidget !== null) {
			this._leftReticuleWidget.Dispose();
			this._leftReticuleWidget = null;
		}

		if (this._rightReticuleWidget !== undefined && this._rightReticuleWidget !== null) {
			this._rightReticuleWidget.Dispose();
			this._rightReticuleWidget = null;
		}
	};

	/**
	 * Returns true when the navigation is currently going to the given point.
	 *
	 * @public
	 * @param  {STU.Actor3D}  iTarget
	 * @return {Boolean}
	 */
	FreeNavigation.prototype.isGoingTo = function (iTarget) {
		return this._isGoingTo && iTarget === this._targetToGoTo;
	};

	/**
	 * Makes to navigation go to a given point with a smooth transition.
	 *
	 * @public
	 * @param  {STU.Actor3D} iTarget Target to go to
	 */
	// IBS GLOBE : _targetCoordinateToGoTo et _distToTarget exprim�s dans myLocation
	FreeNavigation.prototype.goTo = function (iTarget) {
		// - XE8 - 
		//    This one is exactly the same as FirstPersonNavigation.goTo, for now I leave them split but they could be merged one day.
		// 

		// IBS GLOBE : on veut travailler dans un repere defini : 
		// parceque iTarget et this ne sont pas forc�ment dans la mm location
		// du coup on utilise la location de this comme repere commun
		// on n'utilise pas le rep�re world � cause du scaling
		var myLocation = this._camera.getLocation();
		if (myLocation === null || myLocation === undefined)
			myLocation = "World";

		if (!(iTarget instanceof STU.Actor3D)) {
			console.error('goTo can only go to a STU.Actor3D');

		} else if (this._isFollowing === true) {
			console.warn('There is already a followPath transition going on. This call to FreeNavigation.goTo will be ignored.');

		} else { // everything is OK => start goTo transition
			this._targetToGoTo = iTarget;
			this._targetCoordinateToGoTo = iTarget.getPosition(myLocation);
			this._targetVirtualPointToGoTo = iTarget;
			this._isGoingTo = true;
			this._elapsedTimeGoTo = 0;
			this._timeToGoTo = 450 / (this.horizontalRotationSensitivity + this.verticalRotationSensitivity);
			// note that 450 / (100 + 200) = 1.5 so the transition will take 1.5s with default RotationSensitivity values
			this._distToTarget = DSMath.Vector3D.sub(this._targetCoordinateToGoTo, this._camera.getPosition(myLocation)).squareNorm();
		}
	};

	/**
	 * Performs the go to transition.
	 *
	 * @private
	 * @param  {DSMath.Vector3D} oMotionVector  motion vector to modify
	 * @param  {DSMath.Vector3D} iCurrentCamPos Current position of the camera
	 */
	// IBS GLOBE : iCurrentCamPos et oMotionVector exprim�s dans myLocation
	FreeNavigation.prototype.handleGoTo = function (oMotionVector, iCurrentCamPos) {
		if (this._isGoingTo !== true) {
			return;
		}

		var dir = DSMath.Vector3D.sub(this._targetCoordinateToGoTo, iCurrentCamPos);

		var d2 = dir.squareNorm();
		if (d2 > this._distToTarget) { // target reached
			oMotionVector.x = 0;
			oMotionVector.y = 0;
			oMotionVector.z = 0;

			this._isGoingTo = false;

			var evt = new STU.NavHasReachedEvent(this._targetToGoTo, this);
			this._camera.dispatchEvent(evt);
			this.dispatchEvent(new STU.ServiceStoppedEvent("goTo", this));

		} else {
			dir.normalize();

			oMotionVector.x = dir.x;
			oMotionVector.y = dir.y;
			oMotionVector.z = dir.z;

			this._distToTarget = d2;
		}
	};

    /**
	 * To stop capacity "Go To" throught NL keyword ("while", "during", etc...) 
	 * @method
	 * @private
	 */
	FreeNavigation.prototype.stopGoingTo = function (iPoint) {
		this._isGoingTo = false;
		this._targetToGoTo = null;
		this._targetCoordinateToGoTo = null;
		this._targetVirtualPointToGoTo = null;
		this._elapsedTimeGoTo = 0;
		this._timeToGoTo = 0;
	};

	/**
	 * Handle collision detection between objects and the camera
	 *
     * 
	 * @private
	 * @param  {DSMath.Point} iCameraPosition Camera position
	 * @param  {DSMath.Vector3D} iSpeedVector    Current speed vector : is modified by this method
	 */
	// IBS GLOBE : iCameraPosition et iSpeedVector exprim�s dans myLocation
	FreeNavigation.prototype.handleCollision = function (iCameraPosition, iSpeedVector) {
		var cameraSize = 300;
		var nbTry = 2;

		var myLocationTransfoInWorld = new DSMath.Transformation();
		var invMyLocationTransfoInWorld = new DSMath.Transformation();
		do {
			var speedVectorD2 = iSpeedVector.squareNorm();
			var collisionRay = new STU.Ray();
			collisionRay.origin = iCameraPosition;
			collisionRay.direction = iSpeedVector;
			collisionRay.setLength((Math.sqrt(speedVectorD2) + cameraSize));

			var objHit;
			// IBS GLOBE : conversion du Ray du rep�re location au rep�re monde
			// ASO4 GLOBE: On effectue le raycast dans le repere scene pour plus de precision
			var myLocation = this._camera.getLocation();
			if (myLocation === null || myLocation === undefined) {
				myLocation = "World";
				objHit = this._renderMngr._pickFromRay(collisionRay);
			}
			else {
				myLocationTransfoInWorld = myLocation.getTransform("World");
				invMyLocationTransfoInWorld = myLocationTransfoInWorld.getInverse();

	            /*var Origin = collisionRay.origin.clone();
			    Origin.applyTransformation(myLocationTransfoInWorld);
			    collisionRay.origin = Origin;
			    var Direction = collisionRay.direction.clone();
			    Direction.applyTransformation(myLocationTransfoInWorld);
			    collisionRay.direction = Direction;*/

				objHit = this._renderMngr._pickFromRay(collisionRay, true, false, myLocation);
			}

			if (objHit.length > 0) {
	            /*var n_World = objHit[0].getNormal(); 
			    var n_Loc = n_World.clone();
			    n_Loc.applyTransformation(invMyLocationTransfoInWorld);

			    var p_World = objHit[0].getPoint();
			    var p_Loc = p_World.clone();
			    p_Loc.applyTransformation(invMyLocationTransfoInWorld);*/

				var n_Loc = objHit[0].getNormal();
				var p_Loc = objHit[0].getPoint();

				var v = iSpeedVector.clone();
				v.normalize();
				var w = DSMath.Vector3D.cross(n_Loc, v);

				var d = DSMath.Vector3D.cross(n_Loc, w);
				var newSpeed = iSpeedVector.dot(d);

				v.multiplyScalar(cameraSize);
				//var bodySidePt = DSMath.Vector3D.add(v, iCameraPosition);
				var bodySidePt = iCameraPosition.clone();
				bodySidePt.addVector(v);

				//var camBody2Obstacle = DSMath.Vector3D.sub(p_Loc, bodySidePt);
				var camBody2Obstacle = new DSMath.Vector3D(p_Loc.x - bodySidePt.x, p_Loc.y - bodySidePt.y, p_Loc.z - bodySidePt.z);

				iSpeedVector.set(camBody2Obstacle.x + newSpeed * d.x, camBody2Obstacle.y + newSpeed * d.y, camBody2Obstacle.z + newSpeed * d.z);
				nbTry = nbTry - 1;
			} else {
				nbTry = 0;
			}
		} while (nbTry > 0);
	};

	/**
	 * Makes the navigation look at a given actor with a smooth transition.
	 *
	 * @public
	 * @param  {STU.Actor3D} iActor 3DActor to look at
	 */
	FreeNavigation.prototype.lookAt = function (iActor) {
		// - XE8 - 
		//    This one is exactly the same as FirstPersonNavigation.lookAt, for now I leave them split but they could be merged one day.
		// 
		if (!(iActor instanceof STU.Actor3D)) {
			console.error('FreeNavigation.lookAt can only look at an STU.Actor3D');

		} else {
			this._isLookingAt = true;
			this._lookAtTarget = iActor;
			this._lookAtElapsedTime = 0; // 0
			this._timeToLookAt = 450 / (this.horizontalRotationSensitivity + this.verticalRotationSensitivity);

			var myLocation = this._camera.getLocation();
			if (myLocation === null || myLocation === undefined) {
				myLocation = "World";
			}

			var camTransfo = this._camera.getTransform(myLocation);
			this._lookAtStartQuat = new DSMath.Quaternion();
			camTransfo.matrix.getQuaternion(this._lookAtStartQuat);
		}
	};

	/**
	 * Performs the lookAt transition.
	 *
	 * @private
	 */
	FreeNavigation.prototype.handleLookAt = function () {
		// - XE8 - 
		//    This one is exactly the same as FirstPersonNavigation.handleLookAt, for now I leave them split but they could be merged one day.
		// 
		if (this._isLookingAt === false) {
			return;
		}

		this._lookAtElapsedTime += this._deltaTime;
		var lerpAmount = this._lookAtElapsedTime / this._timeToLookAt;

		var myLocation = this._camera.getLocation();
		if (myLocation === null || myLocation === undefined) {
			myLocation = "World";
		}

		if (lerpAmount >= 1) {
			this._camera.lookAt(this._lookAtTarget);
			this._isLookingAt = false;
		} else {
			var camTransform = this._camera.getTransform(myLocation);

			var dir = DSMath.Vector3D.sub(this._lookAtTarget.getPosition(myLocation), camTransform.vector);
			dir.normalize();

			//Cameras are looking to -x
			dir.negate();

			// projecting the new sight direction on the ground to get a right direction parallel to the ground
			var dirOnGround = dir.clone();
			dirOnGround.z = 0;
			dirOnGround.normalize();

			// computing the right direction using the ground-projected sight direction
			/*var right = ThreeDS.Mathematics.cross({
				x: 0,
				y: 0,
				z: 1
			}, dirOnGround);*/
			var right = DSMath.Vector3D.cross(DSMath.Vector3D.zVect, dirOnGround);
			right.normalize();

			// computing the up direction as usual
			var up = DSMath.Vector3D.cross(dir, right);
			up.normalize();

			var mTargetLook = new DSMath.Matrix3x3();
			mTargetLook.setFromArray([
				dir.x, right.x, up.x,
				dir.y, right.y, up.y,
				dir.z, right.z, up.z
			]);

			var endQuat = new DSMath.Quaternion();
			mTargetLook.getQuaternion(endQuat);
			var intermediateQuat = DSMath.Quaternion.slerp(this._lookAtStartQuat, endQuat, lerpAmount);
			camTransform.matrix = intermediateQuat.getMatrix();
			this._camera.setTransform(camTransform, myLocation);
		}
	};

	/**
	 * Returns true when the navigation is currently following the given path.
	 *
	 * @public
	 * @param  {STU.PathActor}  iPath
	 * @return {Boolean}
	 */
	FreeNavigation.prototype.isFollowing = function (iPath) {
		return this._isFollowing && iPath === this._followedPath;
	};

	/**
	 * Make the navigation follow a path.
	 *
	 * @public
	 * @param  {STU.PathActor} iPath Path to follow
	 */
	FreeNavigation.prototype.followPath = function (iPath) {
		if (!(iPath instanceof STU.PathActor)) {
			console.error('FreeNavigation.followPath can only follow a STU.PathActor');

		} else if (this._isGoingTo === true) {
			console.warn('There is already a goTo transition going on. This call to FreeNavigation.followPath will be ignored.');

		} else {
			this._isFollowing = true;
			this._followedPath = iPath;
			this._followedPathLength = iPath.getLength();
			this._followedPathDone = 0;

			this._camera.setPosition(iPath.getValue(0), "World"); //start point
		}
	};


    /**
     * To stop capacity "Follows" throught NL keyword ("while", "during", etc...) 
     * @method
     * @private
     */
	FreeNavigation.prototype.stopFollowingPath = function (iPoint) {
		this._isFollowing = false;
		this._followedPath = null;
		this._followedPathLength = 0;
		this._followedPathDone = 0;
	};

	/**
	 * Performs the path following.
	 *
	 * @private
	 * @param  {DSMath.Vector3D} iSpeedCoef    Speed coefficient for turbo boost
	 * @param  {DSMath.Point} ioNextCamPosition Camera position
	 */
	// ioNextCamPosition dans le repere de la scene
	FreeNavigation.prototype.handleFollowPath = function (iSpeedCoef, ioNextCamPosition) {
		if (this._isFollowing === false) {
			return;
		}

		this._followedPathDone += iSpeedCoef * this._deltaTime;

		var pathAmount = this._followedPathDone / this._followedPathLength;

		if (pathAmount <= 1) {
			var nextPoint = this._followedPath.getValue(pathAmount); // repere monde ?
			ioNextCamPosition.x = nextPoint.x;
			ioNextCamPosition.y = nextPoint.y;
			ioNextCamPosition.z = nextPoint.z;

		} else { // end reached
			this._isFollowing = false;

			//dispatch event 
			var evt = new STU.NavHasCompletedEvent(this._followedPath, this);
			this._camera.dispatchEvent(evt);

			this.dispatchEvent(new STU.ServiceStoppedEvent("followPath", this));
		}
	};

	/**
	* Returns true when the touch cursor is in the neural zone
	*
	* @private		 
	* @return {Boolean}
	*/
	FreeNavigation.prototype.isInNeutralZone = function (reticulePosition, axis) {
		//Is the touch cursor in the neural zone ?
		var viewerSize = STU.RenderManager.getInstance().getViewerSize();
		var xpx = (viewerSize.x * 0.5) * (axis.x - reticulePosition.x);
		var ypx = (viewerSize.y * 0.5) * (axis.y - reticulePosition.y);
		var norm = xpx * xpx + ypx * ypx;

		if (norm <= this._neutralZoneRadius * this._neutralZoneRadius) {
			return true;
		}

		return false;
	}

	/**
	 * Handle the display of the reticule 
	 * 
	 * @private
	 */
	FreeNavigation.prototype.displayReticule = function (reticuleWidget, reticulePosition, axis) {
		if (reticuleWidget !== undefined && reticuleWidget !== null) {
			var inputManager = this._inputManager;

			if (this.isInNeutralZone(reticulePosition, axis)) {
				this._isCursorInNeutralZoneL = true;
				reticuleWidget.ShowArrow(false);
				reticuleWidget.SetOpacity(0.1);
			}
			else { // not in neutral zone
				var opacityLevel = Math.max(0.1, Math.sqrt(Math.pow(axis.x - reticulePosition.x, 2) + Math.pow(
					axis.y - reticulePosition.y, 2)));
				var rotationAngle = STU.Math.RadToDegree * Math.atan2((inputManager.mouseInvertY ? 1 : -1) * (axis.y -
					reticulePosition.y), -(axis.x - reticulePosition.x));

				reticuleWidget.ShowArrow(true);
				reticuleWidget.SetOpacity(opacityLevel);
				reticuleWidget.SetRotationInDegree(rotationAngle);
			}
		}
	};

	/**
	 * Handle the behaviour of the reticule to move with touch
	 *
	 * @method
	 * @private
	 */
	FreeNavigation.prototype.handleReticulesForTouch = function () {
		var inputManager = this._inputManager;
		if (this._useTouch === true) {

			if (inputManager === undefined || inputManager === null) {
				return this;
			}

			// Mouse move only && mouse down only
			if (this.navigateOnClick === true) {
				//console.log(this._inputManager.touchProperties.idLeft);
				if (this._inputManager.touchProperties.idLeft == -1) {
					if (this._leftReticuleWidget !== undefined && this._leftReticuleWidget !== null) {
						this._leftReticuleWidget.Dispose();
						this._leftReticuleWidget = null;
					}
				}
				else {
					//Widget creation 
					if (this._leftReticuleWidget === undefined || this._leftReticuleWidget === null) {
						this._leftReticulePosition = {
							'x': inputManager.axis7.x,
							'y': inputManager.axis7.y
						};

						this._leftReticuleWidget = this.buildReticule(); // jshint ignore:line
						this._leftReticuleWidget.BuildWidget(this._neutralZoneRadius, -this._leftReticulePosition.x, (inputManager.mouseInvertY ? -1 : 1) * this._leftReticulePosition.y);
					}

				}

				if (this._inputManager.touchProperties.idRight == -1) {
					if (this._rightReticuleWidget !== undefined && this._rightReticuleWidget !== null) {
						this._rightReticuleWidget.Dispose();
						this._rightReticuleWidget = null;
					}
				}
				else {

					if (this._rightReticuleWidget === undefined || this._rightReticuleWidget === null) {
						this._rightReticulePosition = {
							'x': inputManager.axis8.x,
							'y': inputManager.axis8.y
						};

						this._rightReticuleWidget = this.buildReticule(); // jshint ignore:line
						this._rightReticuleWidget.BuildWidget(this._neutralZoneRadius, -this._rightReticulePosition.x, (inputManager.mouseInvertY ? -1 : 1) * this._rightReticulePosition.y);
					}
				}

				this.displayReticule(this._leftReticuleWidget, this._leftReticulePosition, inputManager.axis7);
				this.displayReticule(this._rightReticuleWidget, this._rightReticulePosition, inputManager.axis8);

			}
		}
	};

	/**
	 * Update method called each frames
	 *
	 * @private
	 */
	FreeNavigation.prototype.update = function () {
		var forwardVec,
			rightVec,
			upVec,
			ZAxisVec,
			camToTargetVec;
		var needToUpdateCamera = false;

		var lookAtPositionVec = new DSMath.Vector3D();

		var myLocation = this._camera.getLocation();
		if (myLocation === null || myLocation === undefined) {
			myLocation = "World";
		}

		var oldCameraPositionVec = this._camera.getPosition(myLocation);
		var cameraPositionVec = oldCameraPositionVec.clone();
		var oldCameraPositionPt = new DSMath.Point(oldCameraPositionVec.x, oldCameraPositionVec.y, oldCameraPositionVec.z);

		forwardVec = this._camera.getForward(myLocation);

		// call the appropriate function for reticule for UI
		if (this._useTouch) {
			this.handleReticulesForTouch();
		}
		else {
			this.handleReticule();
		}

		ZAxisVec = new DSMath.Vector3D(0, 0, 1);
		rightVec = this._camera.getRight(myLocation);
		upVec = this._camera.getUp(myLocation);

		var speed = this._inputManager.buttonsState[STU.eInputTrigger.eTrigger1] ? this.turboSpeed : this.speed;

		if (this._isFollowing === true) {
			this.handleFollowPath(speed, cameraPositionVec);
			this._camera.setPosition(cameraPositionVec, "World");

		} else {
			// moving handling
			if (this._inputManager.axis1.x !== 0 || this._inputManager.axis1.y !== 0 || this._inputManager.axis1.z !== 0
				|| this._inputManager.axis3.x !== 0 || this._inputManager.axis3.y !== 0 || this._inputManager.axis3.z !== 0
				|| this._inputManager.axis7.x !== 0 || this._inputManager.axis7.y !== 0 || this._inputManager.axis7.z !== 0
				|| this._isGoingTo === true) {

				var axisX = this._inputManager.axis1.x;
				var axisY = this._inputManager.axis1.y;
				var axisZ = this._inputManager.axis1.z;

				axisX += this._inputManager.axis3.x;
				axisY += this._inputManager.axis3.y;
				axisZ += this._inputManager.axis3.z;

				// manage moving with touch input
				if (this._useTouch) {
					if (this._inputManager.touchProperties.idLeft != -1 && !(this.isInNeutralZone(this._leftReticulePosition, this._inputManager.axis7))) {
						var deltaPosX = (this._inputManager.axis7.x - this._inputManager.axis7.firstTouchPosition.x) / this._deltaTime;
						var deltaPosY = (this._inputManager.axis7.y - this._inputManager.axis7.firstTouchPosition.y) / this._deltaTime;

						this._inputManager.axis7.lastTouchPosition.x = this._inputManager.axis7.x;
						this._inputManager.axis7.lastTouchPosition.y = this._inputManager.axis7.y;

						axisX += deltaPosX * -1;
						axisY += deltaPosY * -1;
					}
				}
				
				//Z translation only activable under variable
				if (this._New_Cam_Impl === false) {
					axisZ = 0;
				}

				var motionVec;
				if (this._isGoingTo === true) {
					motionVec = new DSMath.Vector3D();
					// IBS GLOBE : iCurrentCamPos et oMotionVector exprim�s dans myLocation
					this.handleGoTo(motionVec, cameraPositionVec); // computes motionVec

				} else {
					motionVec = DSMath.Vector3D.multiplyScalar(rightVec, axisX);
					motionVec.add(DSMath.Vector3D.multiplyScalar(forwardVec, axisY));
					motionVec.add(DSMath.Vector3D.multiplyScalar(upVec, axisZ));
					motionVec.normalize();
				}

				// changing speed according to current mode
				motionVec.multiplyScalar(speed * this._deltaTime);

				if (motionVec.squareNorm() > 0) {
					cameraPositionVec.add(motionVec);

					if (this.avoidCollision === true && this._isGoingTo === false) { // no collision check during transitions
						var speedVec = DSMath.Vector3D.sub(cameraPositionVec, oldCameraPositionVec);
						// IBS GLOBE : iCameraPosition et iSpeedVector exprim�s dans myLocation
						this.handleCollision(oldCameraPositionPt, speedVec);
						cameraPositionVec = DSMath.Vector3D.add(oldCameraPositionVec, speedVec);
					}

					this._camera.setPosition(cameraPositionVec);
					lookAtPositionVec.add(motionVec);
				}
			}
		}


		if (this._isLookingAt === true) {
			this.handleLookAt();
		} else {
			var deltaX = 0;
			var deltaY = 0;

			/*if ((this.navigateOnClick === false && this._isCursorInNeutralZone === false && this.useGamepad === false) ||
				(this.navigateOnClick === true && this._isMousePressed === true)) {

				// ORIENTATION.       
				// x and y movement during this frame
				var deltaX = this.followMouse === true ? (this._inputManager.axis2.x - this._lastMousePosition.x) / this._deltaTime : this._inputManager.axis2.x;
				var deltaY = this.followMouse === true ? (this._inputManager.axis2.y - this._lastMousePosition.y) / this._deltaTime : this._inputManager.axis2.y;

				this._lastMousePosition.x = this._inputManager.axis2.x;
				this._lastMousePosition.y = this._inputManager.axis2.y;

				camToTargetVec = this.transformCamera(ZAxisVec, deltaX, rightVec, deltaY, forwardVec);

				needToUpdateCamera = true;
			}*/
			//manage mouse inputs
			if ((this.navigateOnClick === false && this._isCursorInNeutralZone === false && this.useGamepad === false) ||
				(this.navigateOnClick === true && this._isMousePressed === true)) {
				var mouseXAxis = this._inputManager.axis2.x;
				var mouseYAxis = this._inputManager.axis2.y;

				var refX = 0;
				var refY = 0;
				if (this._useMousePosAsRefWithNavigateOnClick) {
					refX = this._lastMousePosition.x;
					refY = this._lastMousePosition.y;
				}

				deltaX = this.followMouse === true ? (mouseXAxis - this._lastMousePosition.x) / this._deltaTime : mouseXAxis - refX;
				deltaY = this.followMouse === true ? (mouseYAxis - this._lastMousePosition.y) / this._deltaTime : mouseYAxis - refY;

				if (this.followMouse === true) {
					this._lastMousePosition.x = mouseXAxis;
					this._lastMousePosition.y = mouseYAxis;
				}

				camToTargetVec = this.transformCamera(ZAxisVec, deltaX, rightVec, deltaY, forwardVec);
				needToUpdateCamera = true;
			}

			//manage gamepad inputs
			if (this.useGamepad === true) {
				var gamepadXAxis = this._inputManager.axis4.x * -1;
				var gamepadYAxis = this._inputManager.axis4.y * -1;

				deltaX += gamepadXAxis;
				deltaY += gamepadYAxis;

				camToTargetVec = this.transformCamera(ZAxisVec, deltaX, rightVec, deltaY, forwardVec);

				needToUpdateCamera = true;
			}
			
			// manage rotation with touch input
			if (this.navigateOnClick === true && this._isTouchPressed === true ) {
				if (this._inputManager.touchProperties.idRight != -1) {
					var touchXAxis = this._inputManager.axis8.x;
					var touchYAxis = this._inputManager.axis8.y;

					// [DCN23] - Quick fix - add this three lines below to disable the teleoprtation (because the lastTouchPosition === 0,0);
					// => espacially in the case when using one finger then putting another and then let go of the first
					// => continuous use of screen but still detect the lift of one causing the event "lift finger" so it reset the value of lastTouchPostion to 0;0 but do not put it back to a clsoe position like when you first touch the screen (kinda firstTouchposition)
					// this situation happens because the flag for this._isTouchPressed didn't raise down BUT the onGestureDragEndEvent or onTouchReleaseEvent (for instance) is raised ! so the lastTouchPos is still reset !!
					// therefore i need to do the check myself here = like in the StuNavigation.js Line 308 to 321. I think this fix can be put inside the StuNavigation.js but because there can still be dependance build on it I prefer not to modify it.
					if (this._inputManager.axis8.lastTouchPosition.x == 0 && this._inputManager.axis8.lastTouchPosition.y == 0) {
						this._inputManager.axis8.lastTouchPosition.x = this._inputManager.axis8.x;
						this._inputManager.axis8.lastTouchPosition.y = this._inputManager.axis8.y;
					}

					//deltaX = this.followMouse === true ? (touchXAxis - this._inputManager.axis8.lastTouchPosition.x) / this._deltaTime : touchXAxis;
					//deltaY = this.followMouse === true ? (touchYAxis - this._inputManager.axis8.lastTouchPosition.y) / this._deltaTime : touchYAxis;
					deltaX += this.followMouse === true ? (touchXAxis - this._inputManager.axis8.lastTouchPosition.x) / this._deltaTime : touchXAxis - this._inputManager.axis8.lastTouchPosition.x;
					deltaY += this.followMouse === true ? (touchYAxis - this._inputManager.axis8.lastTouchPosition.y) / this._deltaTime : touchYAxis - this._inputManager.axis8.lastTouchPosition.y;

					if (this.followMouse === true) {
						this._inputManager.axis8.lastTouchPosition.x = touchXAxis;
						this._inputManager.axis8.lastTouchPosition.y = touchYAxis;
					}

					camToTargetVec = this.transformCamera(ZAxisVec, deltaX, rightVec, deltaY, forwardVec);
					needToUpdateCamera = true;
				}
			}

		}



		if (needToUpdateCamera === true) {
			lookAtPositionVec.set(cameraPositionVec.x + camToTargetVec.x, cameraPositionVec.y + camToTargetVec.y, cameraPositionVec.z + camToTargetVec.z);
			this._camera.lookAt(lookAtPositionVec);
		}

		return this;
	};

	FreeNavigation.prototype.transformCamera = function (iZvect, iDeltaX, iRightVec, iDelatY, iForwardVec) {
		var camToTargetVec = new DSMath.Vector3D();

		var rightQuat = new DSMath.Quaternion();
		rightQuat.makeRotation(iRightVec, -iDelatY * STU.Math.DegreeToRad * this.verticalRotationSensitivity * this._deltaTime);

		var zAxisQuat = new DSMath.Quaternion();
		zAxisQuat.makeRotation(iZvect, iDeltaX * STU.Math.DegreeToRad * this.horizontalRotationSensitivity * this._deltaTime);

		var composedRotQuat = DSMath.Quaternion.multiply(rightQuat, zAxisQuat);

		var forwardPoint = new DSMath.Point();
		forwardPoint.set(iForwardVec.x, iForwardVec.y, iForwardVec.z);
		var camToTargetPoint = forwardPoint.applyQuaternion(composedRotQuat);//var camToTargetPoint = composedRotQuat.rotate(forwardPoint);

		camToTargetVec.set(camToTargetPoint.x, camToTargetPoint.y, camToTargetPoint.z);

		if (Math.abs(camToTargetVec.z) > 0.999) {
			forwardPoint.set(iForwardVec.x, iForwardVec.y, iForwardVec.z);
			camToTargetPoint = forwardPoint.applyQuaternion(zAxisQuat);//var camToTargetPoint = zAxisQuat.rotate(forwardPoint);
			camToTargetVec.set(camToTargetPoint.x, camToTargetPoint.y, camToTargetPoint.z);
		}

		return camToTargetVec;
	};

	// Expose in STU namespace.
	STU.FreeNavigation = FreeNavigation;

	return FreeNavigation;
});

define('StuCameras/StuFreeNavigation', ['DS/StuCameras/StuFreeNavigation'], function (FreeNavigation) {
	'use strict';

	return FreeNavigation;
});
