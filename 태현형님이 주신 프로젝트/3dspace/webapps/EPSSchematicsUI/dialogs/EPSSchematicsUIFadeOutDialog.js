/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIFadeOutDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIFadeOutDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBaseDialog", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom"], function (require, exports, UIBaseDialog, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI fade out dialog.
     * @class UIFadeOutDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIFadeOutDialog
     * @extends UIBaseDialog
     * @private
     * @abstract
     */
    var UIFadeOutDialog = /** @class */ (function (_super) {
        __extends(UIFadeOutDialog, _super);
        /**
         * @constructor
         * @public
         * @param {IWUXDialogOptions} options - The dialog options.
         */
        function UIFadeOutDialog(options) {
            var _this = _super.call(this, options) || this;
            _this._isPinned = false;
            _this._onMousedownCB = _this._onMousedown.bind(_this);
            _this._onMousemoveCB = _this._onMousemove.bind(_this);
            _this._kOpacityMinDistance = 30;
            _this._kOpacityMaxDistance = 100;
            return _this;
        }
        /**
         * Removes the dialog.
         * @public
         */
        UIFadeOutDialog.prototype.remove = function () {
            _super.prototype.remove.call(this);
            this._onMousedownCB = undefined;
            this._onMousemoveCB = undefined;
        };
        /**
         * Sets the mouse position to place the dialog.
         * @public
         * @param {IDomPosition} position - The mouse position.
         */
        UIFadeOutDialog.prototype.setMousePosition = function (position) {
            this._mousePosition = position;
        };
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UIFadeOutDialog.prototype._onClose = function () {
            document.removeEventListener('mousedown', this._onMousedownCB);
            document.removeEventListener('mousemove', this._onMousemoveCB);
            this._mousePosition = undefined;
            this._isPinned = false;
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIFadeOutDialog.prototype._onCreateContent = function () {
            var _this = this;
            var dialogBBox = this._dialog.getBoundingClientRect();
            var immersiveFrameBBox = this._dialog.immersiveFrame.getContent().getBoundingClientRect();
            var dialogPosition = {
                my: 'top left',
                at: 'top left',
                offsetX: this._mousePosition.left - dialogBBox.width / 2,
                offsetY: this._mousePosition.top - dialogBBox.height - immersiveFrameBBox.y + 5
            };
            this._dialog.position = dialogPosition;
            document.addEventListener('mousedown', this._onMousedownCB);
            document.addEventListener('mousemove', this._onMousemoveCB);
            // Add a pin button to allow the user to pin the dialog and prevent it from closing!
            var titleBar = this._dialog.getTitleBar();
            var buttonContainer = titleBar.querySelector('.wux-windows-window-header-buttons-div');
            var pinButton = UIDom.createElement('button', {
                className: ['wux-windows-window-header-button', 'wux-ui-3ds', 'wux-ui-3ds-pin']
            });
            buttonContainer.insertBefore(pinButton, buttonContainer.firstChild);
            pinButton.addEventListener('click', function (event) {
                _this._isPinned = !_this._isPinned;
                UIDom.toggleClassName(pinButton, ['wux-ui-3ds-pin', 'wux-ui-3ds-pin-off']);
                event.stopPropagation();
            });
        };
        /**
         * Fades the dialog according to the mouse position.
         * @private
         * @param {number} mouseLeft - The left position of the mouse.
         * @param {number} mouseTop - The top position of the mouse.
         */
        UIFadeOutDialog.prototype._fadeWithDistance = function (mouseLeft, mouseTop) {
            var dialogContent = this._dialog.getContent();
            var distance = UIDom.computeDistanceFromMouse(dialogContent, mouseLeft, mouseTop);
            if (distance >= 0 && distance <= this._kOpacityMinDistance) {
                dialogContent.style.opacity = String(1);
            }
            else if (distance > this._kOpacityMinDistance && distance < this._kOpacityMaxDistance) {
                dialogContent.style.opacity = String(1 - (distance / this._kOpacityMaxDistance));
            }
            else {
                this.close();
            }
        };
        /**
         * The callback on the mousedown event.
         * @private
         * @param {MouseEvent} event - The mousedown event.
         */
        UIFadeOutDialog.prototype._onMousedown = function (event) {
            if (!this._isPinned) {
                var dialogContent = this._dialog.getContent();
                var clickOnDialog = false;
                var clickedElt = event.target;
                while (clickedElt) {
                    if (clickedElt === dialogContent) {
                        clickOnDialog = true;
                        break;
                    }
                    clickedElt = clickedElt.parentElement;
                }
                if (!clickOnDialog) {
                    this.close();
                }
            }
        };
        /**
         * The callback on the mouse move event.
         * @private
         * @param {MouseEvent} event - The mouse move event.
         */
        UIFadeOutDialog.prototype._onMousemove = function (event) {
            if (!this._isPinned) {
                this._fadeWithDistance(event.clientX, event.clientY);
            }
        };
        return UIFadeOutDialog;
    }(UIBaseDialog));
    return UIFadeOutDialog;
});
