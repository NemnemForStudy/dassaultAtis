define('DS/StuCID/StuUIActor2D', ['DS/StuCore/StuContext', 'DS/StuModel/StuActor2D', 'DS/StuModel/StuDimension', 'DS/StuModel/StuAttachment', 'MathematicsES/MathsDef', 'DS/StuCore/StuTools', 'DS/StuCID/StuUIEvents'],
	function (STU, Actor2D, Dimension, Attachment, DSMath, Tools, UIEvents) {
		'use strict';


		/**
		* Describe a STU.UIActor2D which represents a 2D UI object.
		* This class provides the possibility to interact and manipulate them through different kind of APIs.
		*
		* @exports UIActor2D
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.Actor2D
		* @memberof STU
		* @alias STU.UIActor2D
		*/
		var UIActor2D = function () {

			Actor2D.call(this);

			this.CATICXPUIActor;

			/**
			 * True if this 2D UI Actor is visible, false otherwise.
			 *
			 * @member
			 * @instance
			 * @name visible
			 * @public
			 * @type {boolean}
			 * @memberOf STU.UIActor2D
			 */
			Object.defineProperty(this, "visible", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATICXPUIActor !== null && this.CATICXPUIActor !== undefined) { return this.CATICXPUIActor.getVisible(); }
					else { return false; }
				},
				set: function (iVisible) {
					if (iVisible !== true && iVisible !== false) {
						throw new TypeError('iVisible argument is not a boolean');
					}

					if (this.CATICXPUIActor !== null && this.CATICXPUIActor !== undefined) { this.CATICXPUIActor.setVisible(iVisible === true); }
				}
			});

			/**
			 * Opacity of the 2D UI Actor. Value is between 0 and 1.
			 *
			 * @member
			 * @instance
			 * @name opacity
			 * @public
			 * @type {Number}
			 * @memberOf STU.UIActor2D
			 */
			 Object.defineProperty(this, "opacity", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATICXPUIActor !== null && this.CATICXPUIActor !== undefined) {
						return this.CATICXPUIActor.getOpacity();
					}
					else { return undefined; }
				},
				set: function (iOpacity) {
					if (iOpacity !== null && iOpacity !== undefined && typeof iOpacity !== "number") {
						throw new TypeError('iOpacity argument is not a number');
					}

					if (this.CATICXPUIActor !== null && this.CATICXPUIActor !== undefined) {
						if (iOpacity > 1 || iOpacity < 0) {
							throw new TypeError("opacity must be between 0 and 1");
						}
						this.CATICXPUIActor.setOpacity(iOpacity);
					}
				}
			});

			/**
			 * True if this 2D UI Actor is enabled, false otherwise.
			 *
			 * @member
			 * @instance
			 * @name enabled
			 * @public
			 * @type {boolean}
			 * @memberOf STU.UIActor2D
			 */
			Object.defineProperty(this, "enabled", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATICXPUIActor !== null && this.CATICXPUIActor !== undefined) { return this.CATICXPUIActor.getEnable(); }
					else { return false; }
				},
				set: function (iEnabled) {
					if (!this.initialized) {
						return;
					}
					if (iEnabled !== true && iEnabled !== false) {
						throw new TypeError('iEnabled argument is not a boolean');
					}

					if (this.CATICXPUIActor !== null && this.CATICXPUIActor !== undefined) { this.CATICXPUIActor.setEnable(iEnabled === true); }
				}
			});

			/**
			 * Offset of the display position relative to the 2D UI Actor's attachment .
			 *
			 * @member
			 * @instance
			 * @name offset
			 * @public
			 * @type {DSMath.Vector2D}
			 * @memberOf STU.UIActor2D
			 */
			 Tools.bindObject(this, "offset", DSMath.Vector2D, ["x", "y"]);

			/**
			 * Dimension of the displayed 2D UI Actor.
			 *
			 * @member
			 * @instance
			 * @name dimension
			 * @public
			 * @type {STU.Dimension}
			 * @memberOf STU.UIActor2D
			 */
			 Tools.bindObject(this, "dimension", STU.Dimension, ["width", "height", "mode"]);


			
			var _attachment = new STU.Attachment();
			var self = this;
			var needRefresh = true;
			var proxyAttachment = new Proxy(_attachment, 
				{
				set: function (iObj, iProp, iValue) {
					if (needRefresh) {
						_attachment.CATI3DExperienceObject = self.CATI3DExperienceObject.GetValueByName("attachment").CATI3DExperienceObject;
					}
					if (iProp === "side") {
						if (self.CATICXPUIActor !== null && self.CATICXPUIActor !== undefined) {
							let target = _attachment.CATI3DExperienceObject.GetValueByName("target");
							target = target != null ? target.CATI3DExperienceObject : null;
							self.CATICXPUIActor.setAttachment(iValue, target);
						}
					} else if (iProp === "target") {
						if (_attachment.CATI3DExperienceObject !== null && _attachment.CATI3DExperienceObject !== undefined) { 
							_attachment.CATI3DExperienceObject.SetValueByName(iProp, iValue);
							return true;
						}
						return false;
					}
					iObj[iProp] = iValue;
					return true;
				},
				get: function(iObj, iProp) {
					if (needRefresh) {
						_attachment.CATI3DExperienceObject = self.CATI3DExperienceObject.GetValueByName("attachment").CATI3DExperienceObject;
					}
	
					if (["side", "target", "showAttachment"].includes(iProp)) {
						if (_attachment.CATI3DExperienceObject !== null && _attachment.CATI3DExperienceObject !== undefined) { 
							return _attachment.CATI3DExperienceObject.GetValueByName(iProp);
						}
						return undefined;
					}
					if (typeof iObj[iProp] === "function") {
						return (...args) => {
							// object may have changed on cpp side without the proxy knowing
							var expObj = self.CATI3DExperienceObject.GetValueByName("attachment");
	
							// we need to set its internals correctly before executing any method on it
							for (var prop of ["side", "target", "showAttachment"]) {
								iObj[prop] = expObj[prop];
							}
	
							var ret = iObj[iProp](...args);
	
							for (var prop of ["side", "target", "showAttachment"]) {
								if (iObj[prop] !== expObj[prop]) {
									_attachment.CATI3DExperienceObject.SetValueByName(prop, iObj[prop]);
								}
							}
							if (ret == iObj) {
								// there are corner cases where ret could be an object or an array containing a reference to iObj
								//  and not the object itself that we will not manage here and assume they will not happen
								ret = proxyAttachment;
							}
							return ret;
						}
					}
					return iObj[iProp];
				}
			});

			/**
			 * Attachment of displayed UI Actor.
			 *
			 * @member
			 * @instance
			 * @name attachment
			 * @public
			 * @type {STU.Attachment}
			 * @memberOf STU.UIActor2D
			 * @see STU.Attachment
			 */
			Object.defineProperty(this, "attachment", {
				enumerable: true,
				configurable: true,
				// when setting an object without going through its properties, JS don't go through the proxy get/set
				// so before returning the proxy, we need to make sure it is up to date
				get: function () {
					if (this.CATI3DExperienceObject !== null && this.CATI3DExperienceObject !== undefined) { 
						var expObj = this.CATI3DExperienceObject.GetValueByName("attachment");
						
						for (var prop of ["side", "target", "showAttachment"]) {
							_attachment[prop] = expObj.CATI3DExperienceObject.GetValueByName(prop);
						}
						return proxyAttachment;
					}
					return undefined;
				},
				set: function (iObj) {
					if (iObj !== null && iObj !== undefined && !(iObj instanceof STU.Attachment)) {
						throw new TypeError('given value is not a STU.Attachment');
					}

					if (!self.initialized) {
						for (var prop of ["side", "target", "showAttachment", "CATI3DExperienceObject"]) {
							_attachment[prop] = iObj[prop];
						}
						_attachment.CATI3DExperienceObject = iObj.CATI3DExperienceObject;
					} else {
						_attachment.CATI3DExperienceObject = self.CATI3DExperienceObject.GetValueByName("attachment").CATI3DExperienceObject;
	
						needRefresh = false;
						for (var prop of ["side", "target", "showAttachment"]) {
							proxyAttachment[prop] = iObj[prop];
						}
						needRefresh = true;
					}
				}
			});
		};

		UIActor2D.prototype = new Actor2D();
		UIActor2D.prototype.constructor = UIActor2D;

		/**
		 * Private methods for capacities
		 */

		/**
		 * Is Visible this STU.UIActor2D.
		 *
		 * @method
		 * @private
		 * @see STU.UIActor2D#visible
		 */
		UIActor2D.prototype.isVisible = function () {
			return this.visible;
		};

		/**
		 * Hide this STU.UIActor2D.
		 *
		 * @method
		 * @private
		 * @see STU.UIActor2D#visible
		 */
		UIActor2D.prototype.hide = function () {
			this.visible = false;
		};

		/**
		 * Show this STU.UIActor2D.
		 *
		 * @method
		 * @private
		 * @see STU.UIActor2D#visible
		 */
		UIActor2D.prototype.show = function () {
			this.visible = true;
		};

		/**
		 * Disables this STU.UIActor2D.
		 *
		 * @method
		 * @private
		 * @see STU.UIActor2D#enabled
		 */
		UIActor2D.prototype.disables = function () {
			this.enabled = false;
		};

		/**
		 * Enables this STU.UIActor2D.
		 *
		 * @method
		 * @private
		 * @see STU.UIActor2D#enabled
		 */
		UIActor2D.prototype.enables = function () {
			this.enabled = true;
		};

		/**
		 * Is Enabled this STU.UIActor2D.
		 *
		 * @method
		 * @private
		 * @see STU.UIActor2D#enabled
		 */
		UIActor2D.prototype.isEnabled = function () {
			return this.enabled;
		};

		UIActor2D.prototype.doUIDispatchEvent = function (iEventName, params) {
			try {
				var event;
				if (params === null || params === undefined) {
					event = new STU[iEventName](this);
				} else {
					var paramObj = JSON.parse(params);
					event = new STU[iEventName](this, paramObj);
				}
				if (event !== undefined) {
					this.dispatchEvent(event);
				}
			} catch (e) {
				console.error(e.stack);
			}
		};

		// Expose in STU namespace.
		STU.UIActor2D = UIActor2D;

		return UIActor2D;
	});

define('StuCID/StuUIActor2D', ['DS/StuCID/StuUIActor2D'], function (UIActor2D) {
	'use strict';

	return UIActor2D;
});
