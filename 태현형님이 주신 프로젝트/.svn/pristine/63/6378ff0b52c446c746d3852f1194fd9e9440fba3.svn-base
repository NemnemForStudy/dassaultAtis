/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUIContextualBar'/>
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
define("DS/EPSSchematicsUI/components/EPSSchematicsUIContextualBar", ["require", "exports", "DS/EPSSchematicsUI/components/EPSSchematicsUIFadeOutContainer", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/components/EPSSchematicsUICommandButton", "css!DS/EPSSchematicsUI/css/components/EPSSchematicsUIContextualBar"], function (require, exports, UIFadeOutContainer, UIDom, UICommandButton) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI contextual bar.
     * @class UIContextualBar
     * @alias module:DS/EPSSchematicsUI/components/EPSSchematicsUIContextualBar
     * @extends UIFadeOutContainer
     * @private
     */
    var UIContextualBar = /** @class */ (function (_super) {
        __extends(UIContextualBar, _super);
        /**
         * @constructor
         * @param {UIViewer} viewer - The graph viewer.
         * @param {UIContextualBarController} controller - The contextual bar controller.
         * @param {UICommand[]} commands - The list of commands.
         */
        function UIContextualBar(viewer, controller, commands) {
            var _this = _super.call(this, viewer.getContainer()) || this;
            _this._buttons = [];
            _this._isRemoving = false;
            _this._controller = controller;
            _this._commands = commands;
            _this._createElement();
            return _this;
        }
        /**
         * Removes the container.
         * @public
         */
        UIContextualBar.prototype.remove = function () {
            if (!this._isRemoving) {
                this._isRemoving = true;
                this._controller.clearContextualBar();
                this._buttons.forEach(function (button) { return button.remove(); });
                this._controller = undefined;
                this._commands = undefined;
                this._buttons = undefined;
                _super.prototype.remove.call(this);
            }
        };
        /**
         * Sets the position of the contextual bar.
         * @public
         * @param {number} mouseLeft - The left position of the mouse.
         * @param {number} mouseTop - The top position of the mouse.
         */
        UIContextualBar.prototype.setPosition = function (mouseLeft, mouseTop) {
            var parentBBox = this._parent.getBoundingClientRect();
            var elementBBox = this._element.getBoundingClientRect();
            var left = mouseLeft - parentBBox.left + UIFadeOutContainer._kOffsetLeft;
            left = left + elementBBox.width > parentBBox.width ? parentBBox.width - elementBBox.width : left;
            var top = mouseTop - parentBBox.top - elementBBox.height - UIFadeOutContainer._kOffsetTop;
            top = top < 0 ? 0 : top;
            _super.prototype.setPosition.call(this, left, top);
        };
        /**
         * Creates the element.
         * @protected
         */
        UIContextualBar.prototype._createElement = function () {
            var _this = this;
            _super.prototype._createElement.call(this);
            UIDom.addClassName(this._element, 'sch-contextual-bar');
            this._commands.forEach(function (command) {
                var button = new UICommandButton({
                    command: command,
                    parent: _this._element,
                    callback: _this._controller.clearCommands.bind(_this._controller)
                });
                _this._buttons.push(button);
            });
        };
        /**
         * Gets the list of buttons.
         * @private
         * @ignore
         * @returns {UICommandButton[]} The list of buttons.
         */
        UIContextualBar.prototype._getButtons = function () {
            return this._buttons;
        };
        return UIContextualBar;
    }(UIFadeOutContainer));
    return UIContextualBar;
});
