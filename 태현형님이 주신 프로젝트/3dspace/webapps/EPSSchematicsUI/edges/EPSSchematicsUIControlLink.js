/// <amd-module name='DS/EPSSchematicsUI/edges/EPSSchematicsUIControlLink'/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("DS/EPSSchematicsUI/edges/EPSSchematicsUIControlLink", ["require", "exports", "DS/EPSSchematicsUI/edges/EPSSchematicsUILink", "DS/EPSSchematicsUI/edges/views/EPSSchematicsUIControlLinkView", "DS/EPSSchematicsUI/geometries/EPSSchematicsUIControlLinkGeometry", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents"], function (require, exports, UILink, UIControlLinkView, UIControlLinkGeometry, UICommand, UICommandType, Events) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI Control Link.
     * @class UIControlLink
     * @alias module:DS/EPSSchematicsUI/edges/EPSSchematicsUIControlLink
     * @extends UILink
     * @private
     */
    var UIControlLink = /** @class */ (function (_super) {
        __extends(UIControlLink, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The UI Graph that owns this link.
         * @param {ControlLink} model - The control link model.
         */
        function UIControlLink(graph, model) {
            var _this = _super.call(this, graph, model) || this;
            _this._onWaitCountChangeCB = _this._onWaitCountChange.bind(_this);
            _this.setView(_this.createView());
            _this._display.set('geometry', new UIControlLinkGeometry({
                nbStairs: 1,
                reshapable: true,
                splittable: true
            }));
            _this._model.addListener(Events.ControlLinkWaitCountChangeEvent, _this._onWaitCountChangeCB);
            _this._model.addListener(Events.ControlLinkValidityChangeEvent, _this._onValidityChangeCB);
            return _this;
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
         * Removes the link.
         * @public
         */
        UIControlLink.prototype.remove = function () {
            this._model.removeListener(Events.ControlLinkWaitCountChangeEvent, this._onWaitCountChangeCB);
            this._model.removeListener(Events.ControlLinkValidityChangeEvent, this._onValidityChangeCB);
            this._onWaitCountChangeCB = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Creates the control link view.
         * @public
         * @returns {UIControlLinkView} The control link view.
         */
        UIControlLink.prototype.createView = function () {
            return new UIControlLinkView(this);
        };
        /**
         * Gets the link view.
         * @public
         * @returns {UIControlLinkView} The link view.
         */
        UIControlLink.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the link model.
         * @public
         * @returns {ControlLink} The link model.
         */
        UIControlLink.prototype.getModel = function () {
            return this._model;
        };
        /**
         * Projects the specified JSON object to the link.
         * @public
         * @param {IJSONControlLinkUI} iJSONLink - The JSON object representing the link.
         */
        UIControlLink.prototype.fromJSON = function (iJSONLink) {
            if (iJSONLink !== undefined && iJSONLink.path !== undefined) {
                this._display.reshaped = true;
                this._display.splitted = true;
                this._display.set('path', iJSONLink.path);
            }
        };
        /**
         * Projects the link to the specified JSON object.
         * @public
         * @param {IJSONControlLinkUI} oJSONLink - The JSON object representing the link.
         */
        UIControlLink.prototype.toJSON = function (oJSONLink) {
            if (this._display.reshaped === true || this._display.splitted === true) {
                oJSONLink.path = this._display.path;
            }
        };
        /**
         * Gets the link start port.
         * @public
         * @returns {UIControlPort} The link start port.
         */
        UIControlLink.prototype.getStartPort = function () {
            return this._startPort;
        };
        /**
         * Sets the link start port.
         * @public
         * @param {UIControlPort} startPort - The link start port.
         */
        UIControlLink.prototype.setStartPort = function (startPort) {
            this._startPort = startPort;
        };
        /**
         * Gets the link end port.
         * @public
         * @returns {UIControlPort} The link end port.
         */
        UIControlLink.prototype.getEndPort = function () {
            return this._endPort;
        };
        /**
         * Sets the link end port.
         * @public
         * @param {UIControlPort} endPort - The link end port.
         */
        UIControlLink.prototype.setEndPort = function (endPort) {
            this._endPort = endPort;
        };
        /**
         * Sets the number of frames to wait between each link's execution.
         * @public
         * @param {number} frames - The number of frames to wait.
         * @returns {boolean} True if the wait count has been set else false.
         */
        UIControlLink.prototype.setWaitCount = function (frames) {
            return this._model.setWaitCount(frames);
        };
        /**
         * Toggles the wait count of the control link.
         * @public
         */
        UIControlLink.prototype.toggleWaitCount = function () {
            this.setWaitCount(this._model.getWaitCount() > 0 ? 0 : 1);
        };
        /**
         * Gets the control link bounding box.
         * @public
         * @param {boolean} fixedPath - True to limit the bounding box to fixed paths segment only else false.
         * @returns {EGraphUtils.BoundingRect} The control link bounding box.
         */
        UIControlLink.prototype.getBoundingBox = function (fixedPath) {
            return this._display.geometry.getBoundingBox(this._display, fixedPath);
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {Array<UICommand>} The list of available commands.
         */
        UIControlLink.prototype.getCommands = function () {
            var commands = _super.prototype.getCommands.call(this);
            if (this._graph.getEditor().getOptions().enableFramebreaks) {
                commands.unshift(new UICommand(UICommandType.eToggleFrameBreak, this.toggleWaitCount.bind(this)));
            }
            return commands;
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
         * The callback on the control link wait count change event.
         * @private
         */
        UIControlLink.prototype._onWaitCountChange = function () {
            this.getView().onWaitCountChange();
            this.getParentGraph().onModelChange();
            this.getParentGraph().analyze();
        };
        return UIControlLink;
    }(UILink));
    return UIControlLink;
});
