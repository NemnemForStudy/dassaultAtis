define('DS/StuCID/StuUIEvents', ['DS/StuCore/StuContext',
	'DS/EPEventServices/EPEvent',
	'DS/EP/EP'], function (STU, Event, EP) {

		/**
		* Base class for UI events.
		*
		* @exports UIEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {EP.Event}
		* @memberOf STU
		* @alias STU.UIEvent
		*/
		var UIEvent = function(iSender) {
			Event.call(this);

			/**
			 * the sender of the event
			 *
			 * @member
			 * @instance
			 * @name sender
			 * @public
			 * @type {STU.UIActor2D | STU.UIActor3D}
			 * @memberOf STU.UIEvent
			 */
			this.sender = iSender;
		};
		UIEvent.prototype = new Event();
		UIEvent.prototype.constructor = UIEvent;
		UIEvent.prototype.type = 'UIEvent';
		// Expose in STU namespace.
		STU.UIEvent = UIEvent;
		EP.EventServices.registerEvent(UIEvent); // IR-974577

		/**
		* @private
		* @exports DoubleReleaseEvent
		* @alias STU.DoubleReleaseEvent
		*/
		var UIDoubleReleaseEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			this.index = 0;
			if (iParams !== null && iParams !== undefined && iParams["index"] !== null && iParams["index"] !== undefined)  {
				this.index = iParams["index"];
			}
		};
		UIDoubleReleaseEvent.prototype = new UIEvent();
		UIDoubleReleaseEvent.prototype.constructor = UIDoubleReleaseEvent;
		UIDoubleReleaseEvent.prototype.type = 'UIDoubleReleaseEvent';
		// Expose in STU namespace.
		STU.UIDoubleReleaseEvent = UIDoubleReleaseEvent;
		EP.EventServices.registerEvent(UIDoubleReleaseEvent);


		/**
		* @private
		* @exports RightClickEvent
		* @alias STU.RightClickEvent
		*/
		var UIRightClickEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			this.index = 0;
			if (iParams !== null && iParams !== undefined && iParams["index"] !== null && iParams["index"] !== undefined)  {
				this.index = iParams["index"];
			}
		};
		UIRightClickEvent.prototype = new UIEvent();
		UIRightClickEvent.prototype.constructor = UIRightClickEvent;
		UIRightClickEvent.prototype.type = 'UIRightClickEvent';
		// Expose in STU namespace.
		STU.UIRightClickEvent = UIRightClickEvent;
		EP.EventServices.registerEvent(UIRightClickEvent);

		/**
		* The UIDoubleClickEvent event is sent when the user double clicks on a UI Actor.
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* <br>Note: when the user double clicks on a UI Actor, both UIClick (for the first click) and UIDoubleClick (for the second click) are sent.
		*
		* @example
		* beScript.onUIDoubleClick = function(event) {
		*   console.log("doubleclick");
		* }
		*
		* @exports UIDoubleClickEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIDoubleClickEvent
		*/
		var UIDoubleClickEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			/**
			 * In case the UI Actor is a gallery, this gives the index of the item on which the event happened. </br>
			 * Otherwise, it is 0
			 *
			 * @member
			 * @instance
			 * @name index
			 * @public
			 * @type {Number}
			 * @memberOf STU.UIDoubleClickEvent
			 */
			this.index = 0;
			if (iParams !== null && iParams !== undefined && iParams["index"] !== null && iParams["index"] !== undefined)  {
				this.index = iParams["index"];
			}
		};
		UIDoubleClickEvent.prototype = new UIEvent();
		UIDoubleClickEvent.prototype.constructor = UIDoubleClickEvent;
		UIDoubleClickEvent.prototype.type = 'UIDoubleClickEvent';
		// Expose in STU namespace.
		STU.UIDoubleClickEvent = UIDoubleClickEvent;
		EP.EventServices.registerEvent(UIDoubleClickEvent);

		/**
		* The UIClickEvent event is sent when the user clicks on a UI Actor.
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* @example
		* beScript.onUIClick = function(event) {
		*   console.log("click");
		* }
		*
		* @exports UIClickEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIClickEvent
		*/
		var UIClickEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			/**
			 * In case the UI Actor is a gallery, this gives the index of the item on which the event happened. </br>
			 * Otherwise, it is 0
			 *
			 * @member
			 * @instance
			 * @name index
			 * @public
			 * @type {Number}
			 * @memberOf STU.UIClickEvent
			 */
			this.index = 0;
			if (iParams !== null && iParams !== undefined && iParams["index"] !== null && iParams["index"] !== undefined)  {
				this.index = iParams["index"];
			}
		};

		UIClickEvent.prototype = new UIEvent();
		UIClickEvent.prototype.constructor = UIClickEvent;
		UIClickEvent.prototype.type = 'UIClickEvent';

		// Expose in STU namespace.
		STU.UIClickEvent = UIClickEvent;
		EP.EventServices.registerEvent(UIClickEvent);


		/**
		* The UIPressEvent event is sent when the left mouse button is pressed over a UI Actor.
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* @example
		* beScript.onUIPress = function(event) {
		*   console.log("press");
		* }
		*
		* @exports UIPressEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIPressEvent
		*/
		var UIPressEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			/**
			 * In case the UI Actor is a gallery, this gives the index of the item on which the event happened. </br>
			 * Otherwise, it is 0
			 *
			 * @member
			 * @instance
			 * @name index
			 * @public
			 * @type {Number}
			 * @memberOf STU.UIPressEvent
			 */
			this.index = 0;
			if (iParams !== null && iParams !== undefined && iParams["index"] !== null && iParams["index"] !== undefined)  {
				this.index = iParams["index"];
			}
		};

		UIPressEvent.prototype = new UIEvent();
		UIPressEvent.prototype.constructor = UIPressEvent;
		UIPressEvent.prototype.type = 'UIPressEvent';

		// Expose in STU namespace.
		STU.UIPressEvent = UIPressEvent;
		EP.EventServices.registerEvent(UIPressEvent);


		/**
		 * The UIReleaseEvent event is sent when the left mouse button is released over a UI Actor.
		 *
		 * This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		 *
		 * @example
		 * beScript.onUIRelease = function(event) {
		 *   console.log("release");
		 * }
		 *
		 * @exports UIReleaseEvent
		 * @class
		 * @constructor
		 * @noinstancector
		 * @public
		 * @extends {STU.UIEvent}
		 * @memberOf STU
		 * @alias STU.UIReleaseEvent
		 */
		var UIReleaseEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			/**
			 * In case the UI Actor is a gallery, this gives the index of the item on which the event happened. </br>
			 * Otherwise, it is 0
			 *
			 * @member
			 * @instance
			 * @name index
			 * @public
			 * @type {Number}
			 * @memberOf STU.UIReleaseEvent
			 */
			this.index = 0;
			if (iParams !== null && iParams !== undefined && iParams["index"] !== null && iParams["index"] !== undefined)  {
				this.index = iParams["index"];
			}
		};

		UIReleaseEvent.prototype = new UIEvent();
		UIReleaseEvent.prototype.constructor = UIReleaseEvent;
		UIReleaseEvent.prototype.type = 'UIReleaseEvent';

		// Expose in STU namespace.
		STU.UIReleaseEvent = UIReleaseEvent;
		EP.EventServices.registerEvent(UIReleaseEvent);


		/**
		* The UIEnterEvent event is sent when the mouse cursor is getting over a UI Actor.
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* @example
		* beScript.onUIEnter = function(event) {
		*   console.log("enter");
		* }
		*
		* @exports UIEnterEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIEnterEvent
		*/
		var UIEnterEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			/**
			 * In case the UI Actor is a gallery, this gives the index of the item on which the event happened. </br>
			 * Otherwise, it is 0
			 *
			 * @member
			 * @instance
			 * @name index
			 * @public
			 * @type {Number}
			 * @memberOf STU.UIEnterEvent
			 */
			this.index = 0;
			if (iParams !== null && iParams !== undefined && iParams["index"] !== null && iParams["index"] !== undefined)  {
				this.index = iParams["index"];
			}
		};

		UIEnterEvent.prototype = new UIEvent();
		UIEnterEvent.prototype.constructor = UIEnterEvent;
		UIEnterEvent.prototype.type = 'UIEnterEvent';

		// Expose in STU namespace.
		STU.UIEnterEvent = UIEnterEvent;
		EP.EventServices.registerEvent(UIEnterEvent);


		/**
		* The UIExit event is sent when the mouse cursor is getting out of a UI Actor.
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* @example
		* beScript.onUIExit = function(event) {
		*   console.log("exit");
		* }
		*
		* @exports UIExitEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIExitEvent
		*/
		var UIExitEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			/**
			 * In case the UI Actor is a gallery, this gives the index of the item on which the event happened. </br>
			 * Otherwise, it is 0
			 *
			 * @member
			 * @instance
			 * @name index
			 * @public
			 * @type {Number}
			 * @memberOf STU.UIExitEvent
			 */
			this.index = 0;
			if (iParams !== null && iParams !== undefined && iParams["index"] !== null && iParams["index"] !== undefined)  {
				this.index = iParams["index"];
			}
		};

		UIExitEvent.prototype = new UIEvent();
		UIExitEvent.prototype.constructor = UIExitEvent;
		UIExitEvent.prototype.type = 'UIExitEvent';

		// Expose in STU namespace.
		STU.UIExitEvent = UIExitEvent;
		EP.EventServices.registerEvent(UIExitEvent);


		/**
		* The UIHoverEvent event is sent when the mouse cursor is moving over a UI Actor.
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* @example
		* beScript.onUIHover = function(event) {
		*   console.log("hover");
		* }
		*
		* @exports UIHoverEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIHoverEvent
		*/
		var UIHoverEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			/**
			 * In case the UI Actor is a gallery, this gives the index of the item on which the event happened. </br>
			 * Otherwise, it is 0
			 *
			 * @member
			 * @instance
			 * @name index
			 * @public
			 * @type {Number}
			 * @memberOf STU.UIHoverEvent
			 */
			this.index = 0;
			if (iParams !== null && iParams !== undefined && iParams["index"] !== null && iParams["index"] !== undefined)  {
				this.index = iParams["index"];
			}
		};
		UIHoverEvent.prototype = new UIEvent();
		UIHoverEvent.prototype.constructor = UIHoverEvent;
		UIHoverEvent.prototype.type = 'UIHoverEvent';



		// Expose in STU namespace.
		STU.UIHoverEvent = UIHoverEvent;
		EP.EventServices.registerEvent(UIHoverEvent);

		/**
		* The UIDragStartEvent event is sent when a slider is dragged.
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* @example
		* beScript.onUIDragStart = function(event) {
		*   console.log("dragged");
		* }
		*
		* @exports UIDragStartEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIDragStartEvent
		*/
		var UIDragStartEvent = function (iSender) {
			UIEvent.call(this, iSender);
		};
		UIDragStartEvent.prototype = new UIEvent();
		UIDragStartEvent.prototype.constructor = UIDragStartEvent;
		UIDragStartEvent.prototype.type = 'UIDragStartEvent';

		// Expose in STU namespace.
		STU.UIDragStartEvent = UIDragStartEvent;
		EP.EventServices.registerEvent(UIDragStartEvent);

		/**
		* The UIDragEndEvent event is sent when a slider is dropped.
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* @example
		* beScript.onUIDragEnd = function(event) {
		*   console.log("dropped");
		* }
		*
		* @exports UIDragEndEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIDragEndEvent
		*/
		var UIDragEndEvent = function (iSender) {
			UIEvent.call(this, iSender);
		};
		UIDragEndEvent.prototype = new UIEvent();
		UIDragEndEvent.prototype.constructor = UIDragEndEvent;
		UIDragEndEvent.prototype.type = 'UIDragEndEvent';

		// Expose in STU namespace.
		STU.UIDragEndEvent = UIDragEndEvent;
		EP.EventServices.registerEvent(UIDragEndEvent);

		/**
		* The UIValueChangeEvent event is sent when the value has changed on the UI Actor (on a {@link STU.ColorPicker2DActor} for instance).
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* @example
		* beScript.onUIValueChange = function(event) {
		*   console.log("value changed");
		* }
		*
		* @exports UIValueChangeEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIValueChangeEvent
		*/
		var UIValueChangeEvent = function (iSender) {
			UIEvent.call(this, iSender);
		};
		UIValueChangeEvent.prototype = new UIEvent();
		UIValueChangeEvent.prototype.constructor = UIValueChangeEvent;
		UIValueChangeEvent.prototype.type = 'UIValueChangeEvent';

		// Expose in STU namespace.
		STU.UIValueChangeEvent = UIValueChangeEvent;
		EP.EventServices.registerEvent(UIValueChangeEvent);

		/**
		* The UIReturnPressEvent event is sent when return is pressed on a UI Actor (on a {@link STU.TextField2DActor} for instance).
		*
		* This event is dispatched globally on the EP.EventServices and locally on the involved {@link STU.UIActor3D} or {@link STU.UIActor2D}.
		*
		* @example
		* beScript.onUIReturnPress = function(event) {
		*   console.log("return pressed");
		* }
		*
		* @exports UIReturnPressEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIReturnPressEvent
		*/
		var UIReturnPressEvent = function (iSender) {
			UIEvent.call(this, iSender);
		};
		UIReturnPressEvent.prototype = new UIEvent();
		UIReturnPressEvent.prototype.constructor = UIReturnPressEvent;
		UIReturnPressEvent.prototype.type = 'UIReturnPressEvent';

		// Expose in STU namespace.
		STU.UIReturnPressEvent = UIReturnPressEvent;
		EP.EventServices.registerEvent(UIReturnPressEvent);

		/**
		* @exports UIWebMessageReceivedEvent
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends {STU.UIEvent}
		* @memberOf STU
		* @alias STU.UIWebMessageReceivedEvent
		*/
		var UIWebMessageReceivedEvent = function (iSender, iParams) {
			UIEvent.call(this, iSender);

			/**
			 * The message coming from the web page
			 *
			 * @member
			 * @instance
			 * @name message
			 * @public
			 * @type {string}
			 * @memberOf STU.UIWebMessageReceivedEvent
			 */
			this.message = iParams ? iParams.message : null;
			
			// deprecated web viewers have a property "message" instead
			if (this.message === null) {
				Object.defineProperty(this, "message", {
					enumerable: true,
					configurable: true,
					get: function () {
						return this.sender ? this.sender.message : "";
					}
				});
			}

		};

		UIWebMessageReceivedEvent.prototype = new UIEvent();
		UIWebMessageReceivedEvent.prototype.constructor = UIWebMessageReceivedEvent;
		UIWebMessageReceivedEvent.prototype.type = 'UIWebMessageReceivedEvent';

		// Expose in STU namespace.
		STU.UIWebMessageReceivedEvent = UIWebMessageReceivedEvent;
		EP.EventServices.registerEvent(UIWebMessageReceivedEvent);

		return STU;
	}
);

