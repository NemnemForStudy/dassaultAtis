/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIConnector'/>
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIConnector", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIConnectorView"], function (require, exports, EGraphCore, UIConnectorView) {
    "use strict";
    /**
     * This class defines a UI connector.
     * @private
     * @abstract
     * @class UIConnector
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIConnector
     */
    var UIConnector = /** @class */ (function () {
        /**
         * @public
         * @constructor
         */
        function UIConnector() {
            this._createDisplay();
            this._setView(this._createView());
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the connector.
         * @public
         */
        UIConnector.prototype.remove = function () {
            this._display.remove();
            this._display = undefined;
        };
        /**
         * Gets the connector display.
         * @public
         * @returns {EGraphCore.Connector} The connector display.
         */
        UIConnector.prototype.getDisplay = function () {
            return this._display;
        };
        /**
         * Gets the view of the connector.
         * @public
         * @returns {UIConnectorView} The view of the connector.
         */
        UIConnector.prototype.getView = function () {
            return this._display.views.main;
        };
        /**
         * Gets the offset of the connector.
         * @public
         * @returns {number} The offset of the connector.
         */
        UIConnector.prototype.getOffset = function () {
            return this._display.offset;
        };
        /**
         * Sets the offset of the connector.
         * @public
         * @param {number} offset - The offset of the connector.
         */
        UIConnector.prototype.setOffset = function (offset) {
            this._display.set('offset', offset);
        };
        /**
         * Gets the top position of the connector.
         * @public
         * @returns {number} The top position of the connector.
         */
        UIConnector.prototype.getTop = function () {
            return this._display.top;
        };
        /**
         * Gets the left position of the connector.
         * @public
         * @returns {number} left top position of the connector.
         */
        UIConnector.prototype.getLeft = function () {
            return this._display.left;
        };
        /**
         * Gets the SVG element representing the connector.
         * @public
         * @returns {SVGElement} The SVG element representing the connecor.
         */
        UIConnector.prototype.getElement = function () {
            return this.getView().getElement();
        };
        /**
         * Gets the bounding box of the connector.
         * @public
         * @param {IViewpoint} vpt - The current graph viewpoint.
         * @returns {IDOMRect} The bounding box of the connector.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIConnector.prototype.getBoundingBox = function (vpt) {
            return this.getView().getBoundingBox();
        };
        /**
         * Sets the connector border constraint.
         * @protected
         * @param {IBorderConstraint} constraint - The connector border constraint.
         */
        UIConnector.prototype._setBorderConstraint = function (constraint) {
            var parameters = [];
            for (var prop in constraint) {
                if (constraint.hasOwnProperty(prop)) {
                    parameters.push(prop === 'cstr' ? ['cstr'] : ['cstr', prop]);
                    parameters.push(constraint[prop]);
                }
            }
            if (parameters.length) {
                this._display.multiset.apply(this._display, parameters);
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Creates the display of the connector.
         * @private
         */
        UIConnector.prototype._createDisplay = function () {
            this._display = new EGraphCore.Connector();
            this._display.data = { uiElement: this };
        };
        /**
         * Sets the view of the connector.
         * @private
         * @param {UIConnectorView} view - The view of the connector.
         */
        UIConnector.prototype._setView = function (view) {
            if (view !== undefined && view instanceof UIConnectorView) {
                this._display.views.main = view;
            }
        };
        return UIConnector;
    }());
    return UIConnector;
});
