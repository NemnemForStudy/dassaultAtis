
define('DS/StuMiscContent/StuPLMInfoBalloonBe', ['DS/StuCore/StuContext', 'DS/StuModel/StuBehavior', 'DS/EPTaskPlayer/EPTask', 'DS/EP/EP', 'DS/MathematicsES/MathsDef',
	'DS/StuMiscContent/StuVisuServices', 'DS/StuCameras/StuInputManager'],
	function (STU, Behavior, Task, EP, DSMath, StuVisuServices) {
		'use strict';


		/**
		 * Behavior to display text annotation on actor.
		 * @exports PLMInfoBalloon
		 * @class 
		 * @constructor
		 * @private
		 * @extends STU.Behavior
		 * @memberof STU 
		 * @alias STU.PLMInfoBalloon
		 */
		var PLMInfoBalloon = function () {

			Behavior.call(this);

			this.name = 'PLMInfoBalloon';

			/**
			 * Text to be displayed
			 *
			 * @member
			 * @private
			 * @type {string}
			 */
			this.text = 'Text';


			this.font = 'Arial';
			this.bold = true;
			this.italic = true;
			this.height = 16;
			this.textColor = [0, 0, 0, 255];
			this.PLMInfo = [];
			this._renderManager;
			this._inputManager = null;
			/**
			 * Method of activation of task (mouse click/mouse over/keyboard)
			 *
			 * @member
			 * @private
			 * @type {STU.PLMInfoBalloon.eActivationMode}
			 */
			this.activateOn = 0;
			this.taskExecute;
			this.mouseWorld;
			this.main3DViewer;
			this.panel;

			/**
			* An enumeration of all the supported method of activation of task (mouse click/mouse over/keyboard)
			*
			* @enum {number}
			* @private
			*/
			PLMInfoBalloon.eActivationMode = {
				/**
				 * @private
				 * @type {Number}
				 */
				eMouseClick: 0,
				/**
				 * @private
				 * @type {Number}
				 */
				eMouseOver: 1,
				/**
				 * @private
				 * @type {Number}
				 */
				eKeyboard: 2
			};
		};

		PLMInfoBalloon.prototype = new Behavior();
		PLMInfoBalloon.prototype.constructor = PLMInfoBalloon;

		/**
		 * Process to execute when this STU.PLMInfoBalloon is activating. 
		 *
		 * @method
		 * @private
		 */
		PLMInfoBalloon.prototype.onActivate = function (oExceptions) {
			Behavior.prototype.onActivate.call(this, oExceptions);

			console.log("activation");

			this.main3DViewer = new StuVisuServices().build();

			this._renderManager = STU.RenderManager.getInstance();

			var properties = new Array();

			properties = this.main3DViewer.GetPLMProperties(this.getActor().CATI3DExperienceObject);

			var value = properties[0];

			this.taskExecute = false;

			this.text = this.getActor().name + ":" + "\n";
			for (var i = 0; i < properties.length; i++) {
				var found = false;
				for (var j = 0; j < this.PLMInfo.length; j++) {
					if (properties[i] === this.PLMInfo[j]) {
						found = true;
					}
				}
				if (!found) {
					var propName = properties[i];
					var value = this.main3DViewer.GetPLMPropValue(this.getActor().CATI3DExperienceObject, propName);
					this.text = this.text + properties[i] + " = " + value + "\n";
				}
			}


			if (this.activateOn === 0) {
				EP.EventServices.addObjectListener(STU.ClickablePressEvent, this, 'onClickablePress');
			}
			else if (this.activateOn === 1) {
				this.getActor().addObjectListener(STU.ClickableMoveEvent, this, 'onMouseMoveOverSomeActor');
				this.getActor().addObjectListener(STU.ClickableExitEvent, this, 'onExitSomeActor');
			}
			else if (this.activateOn === 2) {
				EP.EventServices.addObjectListener(EP.KeyboardPressEvent, this, 'onKeyboardEvent');
			}

			this._inputManager = new STU.InputManager();
			if (this._inputManager === undefined || this._inputManager === null) {
				return this;
			}
			this._inputManager.initialize();
			this._inputManager.activate(true);
			this._inputManager.useMouse = true;
			this._inputManager.mouseAxis = 1;
			this._inputManager.mouseInvertY = false;

			this.offset = new DSMath.Point();
			this.offset.x = 0;
			this.offset.y = 0;
			this.offset.z = 0;

		};

		/**
		 * Process to execute when this STU.PLMInfoBalloon is deactivating. 
		 *
		 * @method
		 * @private
		 */
		PLMInfoBalloon.prototype.onDeactivate = function () {

			if (this._inputManager !== undefined && this._inputManager !== null) {

				this._inputManager.deactivate();
				this._inputManager.dispose();
				this._inputManager = null;
			}

			EP.EventServices.removeObjectListener(STU.ClickablePressEvent, this, 'onClickablePress');
			this.getActor().removeObjectListener(STU.ClickableMoveEvent, this, 'onMouseMoveOverSomeActor');
			this.getActor().removeObjectListener(STU.ClickableExitEvent, this, 'onExitSomeActor');
			EP.EventServices.removeObjectListener(EP.KeyboardPressEvent, this, 'onKeyboardEvent');

			Behavior.prototype.onDeactivate.call(this);
			console.log("deactivation");
		};


		/**
		 * Process executed when PLMInfoBalloonTask is stoped
		 *
		 * @private
		 */
		PLMInfoBalloon.prototype.onStop = function (iExContext) {
			//this.panel.VisibleFlag = false;
			this.TextUIActor.visible = true;
			this.TextUIActor.text = "";
			this.uiAttachment.side = 4;
			this.uiAttachment.target = null;
			this.TextUIActor.attachment = this.uiAttachment;
		};

		/**
		 * Method called each frame by the task manager
		 *
		 * @private
		 * @param  iExContext Execution context
		 */
		PLMInfoBalloon.prototype.onExecute = function (iExContext) {

			if (this.TextUIActor === undefined) {
				//if (this.taskExecute) {
				//	this.main3DViewer.AnnotationDisplay(this.mouseWorld, this.panel, this.offset);				
				//	this.panel.VisibleFlag = true;
				//}
				//else
				//	this.panel.VisibleFlag = false;
			}
			else {
				if (this.TextUIActor instanceof STU.UIActor && this.taskExecute) {
					this.TextUIActor.visible = true;
					this.TextUIActor.text = this.text;
					if (this.moveUIActor) {
						this.uiAttachment = this.TextUIActor.attachment;
						this.uiAttachment.side = 9;
						this.uiAttachment.target = this.getActor();
						this.TextUIActor.attachment = this.uiAttachment;
					}
				}
				else {
					this.TextUIActor.visible = false;
				}
			}

		};


		PLMInfoBalloon.prototype.onClickablePress = function (iEvent) {
			var thisActor = iEvent.getActor();
			var parent = thisActor;
			if (thisActor !== this.getActor()) {
				parent = thisActor.getParent();
				while (parent !== null && parent !== undefined && parent !== this.getActor()) {
					parent = parent.getParent();
				}
			}

			if (parent === this.getActor()) {
				var viewerSize = this._renderManager.getViewerSize();
				var axis = this._inputManager.axis1;
				var x = (-axis.x + 1) / 2 * viewerSize.x;
				var y = (-axis.y - 1) / -2 * viewerSize.y;
				var point = new DSMath.Vector2D();
				point.set(x, y);

				this.mouseWorld = this.getMouseInWorld(point);


				if (this.taskExecute) {
					this.taskExecute = false;
				}
				else {
					this.taskExecute = true;
				}
			}
		};

		PLMInfoBalloon.prototype.onMouseMoveOverSomeActor = function () {
			var viewerSize = this._renderManager.getViewerSize();
			var axis = this._inputManager.axis1;
			var x = (-axis.x + 1) / 2 * viewerSize.x;
			var y = (-axis.y - 1) / -2 * viewerSize.y;
			var point = new DSMath.Vector2D();
			point.set(x, y);

			this.mouseWorld = this.getMouseInWorld(point);

			this.taskExecute = true;
		};

		PLMInfoBalloon.prototype.onExitSomeActor = function () {
			this.taskExecute = false;
		};

		PLMInfoBalloon.prototype.onKeyboardEvent = function (iKeyboardEvent) {
			if (iKeyboardEvent instanceof EP.KeyboardPressEvent) {
				if (iKeyboardEvent.getKey() === this.activationKey) {
					var viewerSize = this._renderManager.getViewerSize();
					var axis = this._inputManager.axis1;
					var x = (-axis.x + 1) / 2 * viewerSize.x;
					var y = (-axis.y - 1) / -2 * viewerSize.y;
					var point = new DSMath.Vector2D();
					point.set(x, y);

					this.mouseWorld = this.getMouseInWorld(point);

					if (this.taskExecute) {
						this.taskExecute = false;
					}
					else {
						this.taskExecute = true;
					}
				}
			}
		};

		PLMInfoBalloon.prototype.projectPoint = function (iLine, iVectOrigin, iMyActor) {
			var origin = iLine.origin;
			var direction = iLine.direction;
			direction.normalize();
			var xMouse = direction.clone();
			xMouse.z = 0;
			xMouse.normalize();
			var cosAlpha = xMouse.dot(direction);
			var alpha = Math.acos(cosAlpha);
			var d = origin.z;
			var mouseDistance = (d / Math.sin(alpha));
			direction.multiplyScalar(mouseDistance);
			iVectOrigin.set(origin.x, origin.y, origin.z);
			iVectOrigin.add(direction);
		};

		PLMInfoBalloon.prototype.getMouseInWorld = function (mousePoint) {

			var point = new DSMath.Vector2D();
			point.set(mousePoint.x, mousePoint.y);

			var vectOrigin = new DSMath.Vector3D();

			var line = this._renderManager.getLineFromPosition(point);

			var myActor = this.getActor();
			if (!(myActor instanceof STU.Actor3D)) {
				return;
			}

			var intersectArray = this._renderManager._pickFromLine(line);
			if (intersectArray.length > 0) {
				if (intersectArray[0].getActor() === myActor) {
					if (intersectArray.length > 1) {
						vectOrigin.set(intersectArray[1].point.x, intersectArray[1].point.y, intersectArray[1].point.z);
						return vectOrigin;
					}
					else {
						this.projectPoint(line, vectOrigin, myActor);
						return vectOrigin;
					}
				}
				else {
					vectOrigin.set(intersectArray[0].point.x, intersectArray[0].point.y, intersectArray[0].point.z);
					return vectOrigin;
				}
			}
			else {
				this.projectPoint(line, vectOrigin, myActor);
				return vectOrigin;
			}
		};


		/**
		 * Display PLM properties on UI text actor.Driver capacity
		 *
		 * @method
		 * @private    
		 */
		PLMInfoBalloon.prototype.displayPLMProperties = function () {
			if (this.TextUIActor instanceof STU.UIActor) {
				this.TextUIActor.text = this.text;
				if (this.moveUIActor) {
					this.uiAttachment = this.TextUIActor.attachment;
					this.uiAttachment.side = 9;
					this.uiAttachment.target = this.getActor();
					this.TextUIActor.attachment = this.uiAttachment;
				}
			}
		};


		/**
		* Hide PLM properties on UI text actor. Driver capacity
		*
		* @method
		* @private
		*/
		PLMInfoBalloon.prototype.hidePLMProperties = function () {
			if (this.TextUIActor instanceof STU.UIActor) {
				this.TextUIActor.text = "";
				this.uiAttachment.side = 4;
				this.uiAttachment.target = null;
				this.TextUIActor.attachment = this.uiAttachment;
			}
		};

		/**
		 * Get the PLM Properties of Actor.
		 *
		 * @method
		 * @private
		 * @return {Array.<string>}
		 */
		PLMInfoBalloon.prototype.getProperties = function () {
			var plmProperties = new Array();
			plmProperties = this.main3DViewer.GetPLMProperties(this.getActor().CATI3DExperienceObject);
			return plmProperties;
		};


		/**
		 * Get value of PLM Property.
		 *
		 * @method
		 * @private  
		 * @param {string} iName Name of property.
		 * @return {string}
		 */
		PLMInfoBalloon.prototype.getPropertyByName = function (iName) {
			var plmValue;
			var plmValue = this.main3DViewer.GetPLMPropValue(this.getActor().CATI3DExperienceObject, iName);
			return plmValue;
		};


		// Expose in STU namespace.
		STU.PLMInfoBalloon = PLMInfoBalloon;

		return PLMInfoBalloon;
	});

define('StuMiscContent/StuPLMInfoBalloonBe', ['DS/StuMiscContent/StuPLMInfoBalloonBe'], function (PLMInfoBalloon) {
	'use strict';

	return PLMInfoBalloon;
});
