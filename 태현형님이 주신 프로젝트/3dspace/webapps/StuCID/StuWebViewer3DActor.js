define('DS/StuCID/StuWebViewer3DActor', ['DS/StuCore/StuContext',
	'DS/StuCID/StuUIActor3D',
	'DS/EPEventServices/EPEvent',
	'DS/EP/EP',
	'DS/StuMiscContent/StuWebResource',
	'DS/StuCore/StuTools'
], function (STU, UIActor3D, Event, EP, WebRsc, Tools) {
	'use strict';

	var geterSeter = function (self, varName) {
		if (!STU.isEKIntegrationActive()) {
			Object.defineProperty(self, varName, {
				enumerable: true,
				configurable: true,
				get: function () {
					if (self.CATI3DExperienceObject !== undefined && self.CATI3DExperienceObject !== null) {
						return self.CATI3DExperienceObject.GetValueByName(varName);
					}
				},
				set: function (value) {
					if (!self.initialized) {
						return;
					}
					if (self.CATI3DExperienceObject !== undefined && self.CATI3DExperienceObject !== null) {
						self.CATI3DExperienceObject.SetValueByName(varName, value);
					}
				}
			});
		}
	};

    /**
    * Describe a web viewer in the 3D. <br/>
    * The web viewer actor emits the {@link STU.UIWebMessageReceivedEvent} event.
    *
    * @exports WebViewer3DActor
    * @class
    * @constructor
    * @noinstancector 
    * @public
    * @extends STU.UIActor3D
    * @memberof STU
    * @alias STU.WebViewer3DActor
    */
	var WebViewer3DActor = function () {

		UIActor3D.call(this);
		this.name = "WebViewer3DActor";
		this.CATICXPWebViewer;

        /**
        * Get/Set url
        *
        * @member
        * @instance
        * @name url
        * @public	
        * @type {string}
        * @memberOf STU.WebViewer3DActor
        */
		geterSeter(this, "url");


        /**
        * Get/Set contentWidth
        *
        * @member
        * @instance
        * @name contentWidth
        * @public
        * @type {number}
        * @memberOf STU.WebViewer3DActor
        */
		geterSeter(this, "contentWidth");

		/**
		 * Get/Set web resource
		 * 
		 * @member
		 * @instance
		 * @name webResource
		 * @public
		 * @type {STU.WebResource}
		 * @memberOf STU.WebViewer3DActor
		 */
		Tools.bindVariable(this, "webResource", "object");

        /**
        * Get contentHeight
        *
        * @member
        * @instance
        * @name contentHeight
        * @public
		* @readonly
        * @type {number}
        * @memberOf STU.WebViewer3DActor
        */
		if (!STU.isEKIntegrationActive()) {
			Object.defineProperty(this, 'contentHeight', {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("contentHeight");
					}
				}
			});
		}

		/**
		 * Get execution mode
		 *
		 * @member
		 * @instance
		 * @name executionMode
		 * @public
		 * @type {STU.WebViewer3DActor.EExecutionMode}
		 * @readonly
		 * @memberOf STU.WebViewer3DActor
		 */
		Object.defineProperty(this, "executionMode", {
			enumerable: true,
			configurable: true,
			get: function () {
				if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
					return this.CATI3DExperienceObject.GetValueByName("executionMode");
				}
			},
			set: function () {
				if (this.initialized) {
					throw new TypeError("property \"executionMode\" is read-only");
				}
			}
		});

		/**
		 * Version of the web viewer
		 *
		 * @member
		 * @private
		 * @type {Number}
		 */
		this._version = -1;

	};

	WebViewer3DActor.prototype = new UIActor3D();
	WebViewer3DActor.prototype.constructor = WebViewer3DActor;


	WebViewer3DActor.prototype.onInitialize = function(oExceptions) {
		UIActor3D.prototype.onInitialize.call(this, oExceptions);
		this.CATI3DExperienceObject.SetValueByName("url", this.url); // force reload to trigger onload callbacks

		this._isV1 = (this._version < WebViewer3DActor.WebViewerV2Version);
	}

	/**
	 * Executes a JS script in the browser. </br>
	 * Throws an exception if used in CSP emulation mode. </br>
	 * The use of this method is not recommended as it is not supported when published to the web
	 *
	 * @method
	 * @public
	 * @param {string} iScript the script to run
	 * @see STU.WebViewer3DActor#sendMessage
	 */
	WebViewer3DActor.prototype.executeScript = function (iScript) {
		if (this.executionMode === STU.WebViewer3DActor.EExecutionMode.eCSPEmulation && !this._isV1) {
			throw new TypeError("Use of executeScript method is not allowed in CSP emulation mode");
		}
		if (this.CATICXPWebViewer !== null && this.CATICXPWebViewer !== undefined) {
			this.CATICXPWebViewer.executeScript(iScript);
		}
	};

    /**
	* Send a [message event]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event} to the window of the web viewer.
	* The provided message is send as a string in the 'data' property of the message event.
	* You can listen to this event by adding the following script to your web page :
	* @example
	* window.addEventListener("message", (iEvent) => {
	*		let msg = iEvent.data;
	*		// Do whatever you want with your message
	*		// Checkout the Getting Started for more examples
	} )
	*
	* @method
	* @public
	* @param {string} iMessage message to send
	*/
	WebViewer3DActor.prototype.sendMessage = function(iMessage) {
		if (typeof iMessage !== 'string') {
			throw new TypeError("invalid input, expected 'string', got " + typeof iMessage);
		}
		if (this.CATICXPWebViewer !== null && this.CATICXPWebViewer !== undefined) {
			this.CATICXPWebViewer.sendMessage(iMessage);
		}
	}

	/**
	* Enumeration of possible execution modes.
	*
	* @enum {number}
	* @public
	*/
	WebViewer3DActor.EExecutionMode = {
		eCSPEmulation : 0,
		eLegacy : 1
	};

	/**
	* Version number of web viewer V2
	*
	* @type {number}
	* @private
	*/
	WebViewer3DActor.WebViewerV2Version = 425000;

	// Expose in STU namespace.
	STU.WebViewer3DActor = WebViewer3DActor;

	return WebViewer3DActor;
});

define('StuCID/StuWebViewer3DActor', ['DS/StuCID/StuWebViewer3DActor'], function (WebViewer3DActor) {
	'use strict';

	return WebViewer3DActor;
});
