/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIComment'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIComment", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUICommentView", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType"], function (require, exports, UINode, UICommentView, UICommand, UICommandType) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI comment.
     * @private
     * @class UIComment
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIComment
     * @extends UINode
     */
    var UIComment = /** @class */ (function (_super) {
        __extends(UIComment, _super);
        /**
         * @public
         * @constructor
         * @param {UIGraph} graph - The parent graph.
         * @param {number} left - The left position.
         * @param {number} top - The top position.
         */
        function UIComment(graph, left, top) {
            var _this = _super.call(this, { graph: graph, isDraggable: true }) || this;
            _this.setView(new UICommentView(_this));
            _this.setDimension(200, 100);
            _this.setMinDimension(200, 80);
            _this.setPosition(left, top);
            _this._textContent = 'This is a comment!';
            return _this;
        }
        /**
         * Removes the node from its parent graph.
         * @public
         */
        UIComment.prototype.remove = function () {
            this._textContent = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the main view of the node.
         * @public
         * @returns {UICommentView} The main view of the node.
         */
        UIComment.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Projects the specified JSON object to the comment.
         * @public
         * @param {IJSONCommentUI} iJSONComment - The JSON projected comment.
         */
        UIComment.prototype.fromJSON = function (iJSONComment) {
            if (iJSONComment !== undefined) {
                this.setPosition(iJSONComment.left, iJSONComment.top, true);
                this.setDimension(iJSONComment.width, iJSONComment.height);
                this._textContent = iJSONComment.textContent;
            }
        };
        /**
         * Projects the comment to the specified JSON object.
         * @public
         * @param {IJSONCommentUI} oJSONComment - The JSON projected comment.
         */
        UIComment.prototype.toJSON = function (oJSONComment) {
            if (oJSONComment !== undefined) {
                oJSONComment.top = this.getActualTop();
                oJSONComment.left = this.getActualLeft();
                oJSONComment.width = this.getWidth();
                oJSONComment.height = this.getHeight();
                oJSONComment.textContent = this._textContent;
            }
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {Array<UICommand>} The list of available commands.
         */
        UIComment.prototype.getCommands = function () {
            var commands = [];
            var commentView = this.getView();
            commands.push(new UICommand(UICommandType.eEdit, commentView.onTextContentDblclick.bind(commentView)));
            var viewer = this._graph.getViewer();
            commands.push(new UICommand(UICommandType.eRemove, viewer.deleteSelection.bind(viewer)));
            return commands;
        };
        /**
         * Gets the text content of the comment.
         * @public
         * @returns {string} The text content of the comment.
         */
        UIComment.prototype.getTextContent = function () {
            return this._textContent;
        };
        /**
         * Sets the text content of the comment.
         * @public
         * @param {string} textContent - The text content of the comment.
         */
        UIComment.prototype.setTextContent = function (textContent) {
            this._textContent = textContent;
            this._graph.onUIChange();
        };
        return UIComment;
    }(UINode));
    return UIComment;
});
