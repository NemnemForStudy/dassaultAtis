/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUICommentView'/>
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
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUICommentView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIResizableRectNodeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/data/EPSSchematicsUIKeyboard", "css!DS/EPSSchematicsUI/css/nodes/EPSSchematicsUIComment"], function (require, exports, UIResizableRectNodeView, UIDom, UIKeyboard) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI comment view.
     * @private
     * @class UICommentView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUICommentView
     * @extends UINodeView
     */
    var UICommentView = /** @class */ (function (_super) {
        __extends(UICommentView, _super);
        /**
         * @public
         * @constructor
         * @param {UIComment} comment - The UI comment.
         */
        function UICommentView(comment) {
            var _this = _super.call(this) || this;
            _this._isEscapeKeyPressed = false;
            _this._onTextContentDblclickCB = _this.onTextContentDblclick.bind(_this);
            _this._onInputTextContentBlurCB = _this._onInputTextContentBlur.bind(_this);
            _this._onInputTextContentKeydownCB = _this._onInputTextContentKeydown.bind(_this);
            _this._comment = comment;
            return _this;
        }
        /**
         * Removes the customized default view of the node.
         * @private
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UICommentView.prototype.ondestroyDisplay = function (elt, grView) {
            this._comment = undefined;
            this._containerElt = undefined;
            this._textContentElt = undefined;
            this._inputTextContentElt = undefined;
            this._isEscapeKeyPressed = undefined;
            this._onTextContentDblclickCB = undefined;
            this._onInputTextContentBlurCB = undefined;
            this._onInputTextContentKeydownCB = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the node HTML element.
         * @protected
         * @param {module:DS/egraph/core.Node} node - The graph node.
         * @returns {IHTMLElement} The node HTML element.
         */
        UICommentView.prototype.buildNodeElement = function (node) {
            _super.prototype.buildNodeElement.call(this, node);
            UIDom.addClassName(this._element, ['sch-node-comment', 'sch-node-draggable']);
            this._containerElt = UIDom.createElement('div', {
                className: ['sch-node-comment-container', 'sch-node-draggable'],
                parent: this._element,
                insertBefore: this._borderContainer
            });
            this._textContentElt = UIDom.createElement('div', {
                className: ['sch-node-comment-textcontent', 'sch-node-draggable'],
                parent: this._containerElt,
                textContent: this._comment.getTextContent()
            });
            this._textContentElt.addEventListener('dblclick', this._onTextContentDblclickCB);
            this._element.dsModel = this._comment;
            return this._element;
        };
        /**
         * The callback on the text content double click event.
         * @public
         */
        UICommentView.prototype.onTextContentDblclick = function () {
            this._createInputTextContentElement();
        };
        /**
         * Gets the input text content element.
         * @public
         * @returns {HTMLTextAreaElement} The input text content element.
         */
        UICommentView.prototype.getInputTextContentElement = function () {
            return this._inputTextContentElt;
        };
        /**
         * The callback on the input text content blur event.
         * @private
         * @param {FocusEvent} event - The input text content blur event.
         */
        UICommentView.prototype._onInputTextContentBlur = function (event) {
            if (!this._isEscapeKeyPressed) {
                this._comment.setTextContent(this._inputTextContentElt.value);
            }
            this._removeInputTextContentElement();
            event.stopPropagation();
            this._comment.getGraph().getEditor().getHistoryController().registerEditAction(this._comment);
        };
        /**
         * The callback on the input text content keydown event.
         * @private
         * @param {KeyboardEvent} event - The input text content keydown event.
         */
        UICommentView.prototype._onInputTextContentKeydown = function (event) {
            if (UIKeyboard.isKeyPressed(event, UIKeyboard.eEscape)) {
                this._isEscapeKeyPressed = true;
                this._inputTextContentElt.blur();
            }
            event.stopPropagation();
        };
        /**
         * Creates the input text content element.
         * @private
         */
        UICommentView.prototype._createInputTextContentElement = function () {
            if (this._inputTextContentElt === undefined) {
                this._textContentElt.textContent = '';
                this._inputTextContentElt = UIDom.createElement('textarea', {
                    className: 'sch-node-comment-textcontent-input',
                    parent: this._textContentElt,
                    attributes: { spellcheck: true }
                });
                this._inputTextContentElt.value = this._comment.getTextContent();
                this._inputTextContentElt.focus();
                this._inputTextContentElt.select();
                this._inputTextContentElt.addEventListener('blur', this._onInputTextContentBlurCB);
                this._inputTextContentElt.addEventListener('keydown', this._onInputTextContentKeydownCB);
                this._inputTextContentElt.addEventListener('mousedown', function (e) { return e.stopPropagation(); });
                this._inputTextContentElt.addEventListener('wheel', function (e) { return e.stopPropagation(); });
            }
        };
        /**
         * Removes the input text content element.
         * @private
         */
        UICommentView.prototype._removeInputTextContentElement = function () {
            if (this._inputTextContentElt !== undefined) {
                this._inputTextContentElt.removeEventListener('blur', this._onInputTextContentBlurCB);
                this._inputTextContentElt.removeEventListener('keydown', this._onInputTextContentKeydownCB);
                if (this._inputTextContentElt.parentElement) {
                    this._inputTextContentElt.parentElement.removeChild(this._inputTextContentElt);
                }
                this._textContentElt.textContent = this._comment.getTextContent();
                this._inputTextContentElt = undefined;
                this._isEscapeKeyPressed = false;
            }
        };
        return UICommentView;
    }(UIResizableRectNodeView));
    return UICommentView;
});
