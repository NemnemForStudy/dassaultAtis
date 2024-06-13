define('DS/StuCID/StuWebViewer2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuCore/StuTools'],
	function (STU, UIActor2D, Tools) {
		'use strict';

		/**
		* @exports WebViewer2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.WebViewer2DActor
		*/
		var WebViewer2DActor = function () {
			UIActor2D.call(this);

			/**
			 * Get/Set url
			 *
			 * @member
			 * @instance
			 * @name url
			 * @public
			 * @type {string}
			 * @memberOf STU.WebViewer2DActor
			 */
			Tools.bindVariable(this, "url", "string");

			/**
			 * Get/Set web resource
			 * 
			 * @member
			 * @instance
			 * @name webResource
			 * @public
			 * @type {STU.WebResource}
			 * @memberOf STU.WebViewer2DActor
			 */
			Tools.bindVariable(this, "webResource", "object");


			/**
			 * Get execution mode
			 *
			 * @member
			 * @instance
			 * @name executionMode
			 * @public
			 * @type {STU.WebViewer2DActor.EExecutionMode}
			 * @readonly
			 * @memberOf STU.WebViewer2DActor
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

		WebViewer2DActor.prototype = new UIActor2D();
		WebViewer2DActor.prototype.constructor = WebViewer2DActor;

		WebViewer2DActor.prototype.onInitialize = function(oExceptions) {
			UIActor2D.prototype.onInitialize.call(this, oExceptions);
			this.CATI3DExperienceObject.SetValueByName("url", this.url); // force reload to trigger onload callbacks

			this._isV1 = (this._version < WebViewer2DActor.WebViewerV2Version);
		}

		/**
		 * Executes a JS script in the browser. </br>
		 * Throws an exception if used in CSP emulation mode. </br>
		 * The use of this method is not recommended as it is not supported when published to the web
		 *
		 * @method
		 * @public
		 * @param {string} iScript the script to run
		 * @see STU.WebViewer2DActor#sendMessage
		 */
		WebViewer2DActor.prototype.executeScript = function (iScript) {
			if (this.executionMode === STU.WebViewer2DActor.EExecutionMode.eCSPEmulation && !this._isV1) {
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
        *     let msg = iEvent.data;
        *     // Do whatever you want with your message
		*	 // Checkout the Getting Started for more examples
        *} )
		*
		* @method
		* @public
		* @param {string} iMessage message to send
		*/
		WebViewer2DActor.prototype.sendMessage = function(iMessage) {
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
		WebViewer2DActor.EExecutionMode = {
			eCSPEmulation : 0,
			eLegacy : 1
		};

		/**
		* Version number of web viewer V2
		*
		* @type {number}
		* @private
		*/
		WebViewer2DActor.WebViewerV2Version = 425000;

		// Expose in STU namespace.
		STU.WebViewer2DActor = WebViewer2DActor;
		return WebViewer2DActor;
	}
);

define('StuCID/StuWebViewer2DActor', ['DS/StuCID/StuWebViewer2DActor'], function (WebViewer2DActor ) {
	'use strict';
	return WebViewer2DActor;
});
