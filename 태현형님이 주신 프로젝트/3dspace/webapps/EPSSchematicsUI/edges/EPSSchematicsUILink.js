/// <amd-module name='DS/EPSSchematicsUI/edges/EPSSchematicsUILink'/>
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
define("DS/EPSSchematicsUI/edges/EPSSchematicsUILink", ["require", "exports", "DS/EPSSchematicsUI/edges/EPSSchematicsUIEdge", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType"], function (require, exports, UIEdge, UICommand, UICommandType) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI Link.
     * @class UILink
     * @alias module:DS/EPSSchematicsUI/edges/EPSSchematicsUILink
     * @extends UIEdge
     * @abstract
     * @private
     */
    var UILink = /** @class */ (function (_super) {
        __extends(UILink, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The UI Graph that owns this link.
         * @param {DataLink|ControlLink} model - The data link or control link model.
         */
        function UILink(graph, model) {
            var _this = _super.call(this) || this;
            _this._onValidityChangeCB = _this._onValidityChange.bind(_this);
            _this._graph = graph;
            _this._model = model;
            return _this;
        }
        /**
         * Removes the link.
         * @public
         */
        UILink.prototype.remove = function () {
            this._graph.getViewer().getContextualBarController().clearCommands();
            this._startPort.unhighlight();
            this._endPort.unhighlight();
            this._startPort.getView().hideRerouteHandler();
            this._endPort.getView().hideRerouteHandler();
            this._graph = undefined;
            this._model = undefined;
            this._startPort = undefined;
            this._endPort = undefined;
            this._onValidityChangeCB = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {Array<UICommand>} The list of available commands.
         */
        UILink.prototype.getCommands = function () {
            var commands = [];
            var viewer = this._graph.getViewer();
            commands.push(new UICommand(UICommandType.eRemove, viewer.deleteSelection.bind(viewer)));
            return commands;
        };
        /**
         * Gets the link view.
         * @public
         * @returns {UILinkView} The link view.
         */
        UILink.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the parent graph of the link.
         * @public
         * @returns {UIGraph} The parent graph of the link.
         */
        UILink.prototype.getGraph = function () {
            return this._graph;
        };
        /**
         * Gets the parent graph of the link.
         * // TODO: Rename to getParent or getGraph ?
         * @public
         * @returns {UIGraph} The parent graph of the link.
         */
        UILink.prototype.getParentGraph = function () {
            return this._graph;
        };
        /**
         * Gets the SVG element representing the link.
         * @public
         * @returns {SVGElement} The SVG element representing the link.
         */
        UILink.prototype.getElement = function () {
            return this.getView().getElement();
        };
        /**
         * Gets the link SVG path.
         * @public
         * @returns {SVGPathElement} The link SVG path.
         */
        UILink.prototype.getPath = function () {
            return this.getView().getPath();
        };
        /**
         * The callback on the validity change event of a link.
         * @private
         */
        UILink.prototype._onValidityChange = function () {
            this.getView().onValidityChange();
        };
        return UILink;
    }(UIEdge));
    return UILink;
});
