/// <amd-module name='DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink'/>
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
define("DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink", ["require", "exports", "DS/EPSSchematicsUI/edges/EPSSchematicsUILink", "DS/EPSSchematicsUI/edges/views/EPSSchematicsUIDataLinkView", "DS/EPSSchematicsUI/geometries/EPSSchematicsUIDataLinkGeometry", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents"], function (require, exports, UILink, UIDataLinkView, UIDataLinkGeometry, UIShortcutDataPort, Events) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data link.
     * @class UIDataLink
     * @alias module:DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink
     * @extends UILink
     * @private
     */
    var UIDataLink = /** @class */ (function (_super) {
        __extends(UIDataLink, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The UI Graph that owns this link.
         * @param {DataLink} model - The data link model.
         * @param {boolean} [forceMaximizedState=false] - True to force the data link to be maximized.
         */
        function UIDataLink(graph, model, forceMaximizedState) {
            if (forceMaximizedState === void 0) { forceMaximizedState = false; }
            var _this = _super.call(this, graph, model) || this;
            _this._forceMaximizedState = false;
            _this._onCastLevelChangeCB = _this._onCastLevelChange.bind(_this);
            _this._forceMaximizedState = forceMaximizedState || !_this._graph.getDataLinksMinimizerState();
            _this.setView(_this.createView());
            _this._display.set('geometry', new UIDataLinkGeometry());
            _this._model.addListener(Events.DataLinkCastLevelChangeEvent, _this._onCastLevelChangeCB);
            _this._model.addListener(Events.DataLinkValidityChangeEvent, _this._onValidityChangeCB);
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
        UIDataLink.prototype.remove = function () {
            if (this._startPort instanceof UIShortcutDataPort) {
                var dataPortUI = this._startPort.getParent().getDataPortUI();
                if (dataPortUI !== undefined) {
                    dataPortUI.removeShortcutLink();
                }
            }
            else if (this._endPort instanceof UIShortcutDataPort) {
                var dataPortUI = this._endPort.getParent().getDataPortUI();
                if (dataPortUI !== undefined) {
                    dataPortUI.removeShortcutLink();
                }
            }
            this._model.removeListener(Events.DataLinkCastLevelChangeEvent, this._onCastLevelChangeCB);
            this._model.removeListener(Events.DataLinkValidityChangeEvent, this._onValidityChangeCB);
            this._forceMaximizedState = undefined;
            this._onCastLevelChangeCB = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Creates the data link view.
         * @public
         * @returns {UIDataLinkView} The data link view.
         */
        UIDataLink.prototype.createView = function () {
            return new UIDataLinkView(this, this._forceMaximizedState);
        };
        /**
         * Gets the link view.
         * @public
         * @returns {UIDataLinkView} The link view.
         */
        UIDataLink.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the link model.
         * @public
         * @returns {DataLink} The link model.
         */
        UIDataLink.prototype.getModel = function () {
            return this._model;
        };
        /**
         * Projects the specified JSON object to the link.
         * @public
         * @param {IJSONDataLinkUI} iJSONLink - The JSON object representing the link.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
        UIDataLink.prototype.fromJSON = function (iJSONLink) { };
        /**
         * Projects the link to the specified JSON object.
         * @public
         * @param {IJSONDataLinkUI} oJSONLink - The JSON object representing the link.
         */
        UIDataLink.prototype.toJSON = function (oJSONLink) {
            var isStartShortcut = this._startPort instanceof UIShortcutDataPort;
            var isEndShortcut = this._endPort instanceof UIShortcutDataPort;
            if (isStartShortcut || isEndShortcut) {
                oJSONLink.shortcut = {
                    startPort: isStartShortcut ? this._startPort.toPath() : undefined,
                    endPort: isEndShortcut ? this._endPort.toPath() : undefined
                };
            }
        };
        /**
         * Gets the link start port.
         * @public
         * @returns {UIDataPort} The link start port.
         */
        UIDataLink.prototype.getStartPort = function () {
            return this._startPort;
        };
        /**
         * Sets the link start port.
         * @public
         * @param {UIDataPort} startPort - The link start port.
         */
        UIDataLink.prototype.setStartPort = function (startPort) {
            this._startPort = startPort;
            if (this._startPort instanceof UIShortcutDataPort) {
                var dataPortUI = this._startPort.getParent().getDataPortUI();
                if (dataPortUI !== undefined) {
                    dataPortUI.addShortcutLink();
                }
            }
        };
        /**
         * Gets the link end port.
         * @public
         * @returns {UIDataPort} The link end port.
         */
        UIDataLink.prototype.getEndPort = function () {
            return this._endPort;
        };
        /**
         * Sets the link end port.
         * @public
         * @param {UIDataPort} endPort - The link end port.
         */
        UIDataLink.prototype.setEndPort = function (endPort) {
            this._endPort = endPort;
            if (this._endPort instanceof UIShortcutDataPort) {
                var dataPortUI = this._endPort.getParent().getDataPortUI();
                if (dataPortUI !== undefined) {
                    dataPortUI.addShortcutLink();
                }
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
         * The callback on the data link cast level change event.
         * @private
         */
        UIDataLink.prototype._onCastLevelChange = function () {
            this.getView().onCastLevelChange();
        };
        return UIDataLink;
    }(UILink));
    return UIDataLink;
});
