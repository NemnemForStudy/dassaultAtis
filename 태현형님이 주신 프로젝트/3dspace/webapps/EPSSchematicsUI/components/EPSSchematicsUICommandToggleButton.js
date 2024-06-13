/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUICommandToggleButton'/>
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
define("DS/EPSSchematicsUI/components/EPSSchematicsUICommandToggleButton", ["require", "exports", "DS/EPSSchematicsUI/components/EPSSchematicsUICommandButton", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom"], function (require, exports, UICommandButton, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI command toggle button.
     * @class UICommandToggleButton
     * @alias module:DS/EPSSchematicsUI/components/EPSSchematicsUICommandToggleButton
     * @extends UICommandButton
     * @private
     */
    var UICommandToggleButton = /** @class */ (function (_super) {
        __extends(UICommandToggleButton, _super);
        /**
         * @constructor
         * @param {ICommandToggleButtonOptions} options - The command button options.
         */
        function UICommandToggleButton(options) {
            var _this = _super.call(this, options) || this;
            _this._toggleCB = options.toggleCB;
            _this._checked = options.checked || false;
            _this.setCheckedState(_this._checked);
            return _this;
        }
        /**
         * Removes the command button.
         * @public
         */
        UICommandToggleButton.prototype.remove = function () {
            this._toggleCB = undefined;
            this._checked = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Sets the checked state of the command toggle button.
         * @public
         * @param {boolean} checked - The checked state of the command toggle button.
         */
        UICommandToggleButton.prototype.setCheckedState = function (checked) {
            this._checked = checked;
            if (this._checked === true) {
                UIDom.addClassName(this._buttonElt, 'checked');
            }
            else {
                UIDom.removeClassName(this._buttonElt, 'checked');
            }
        };
        /**
         * Gets the checked state of the command toggle button.
         * @public
         * @returns {boolean} The checked state of the command toggle button.
         */
        UICommandToggleButton.prototype.getCheckedState = function () {
            return this._checked;
        };
        /**
         * Initializes the command button.
         * @protected
         */
        UICommandToggleButton.prototype._initialize = function () {
            _super.prototype._initialize.call(this);
            UIDom.addClassName(this._buttonElt, 'sch-toggle-command-button');
            UIDom.createElement('div', { parent: this._buttonElt });
        };
        /**
         * The callback on the command button mouse click event.
         * @protected
         * @param {MouseEvent} event - The command button click event.
         */
        UICommandToggleButton.prototype._onClick = function (event) {
            this.setCheckedState(!this._checked);
            if (this._toggleCB !== undefined) {
                this._toggleCB(this._checked);
            }
            _super.prototype._onClick.call(this, event);
        };
        return UICommandToggleButton;
    }(UICommandButton));
    return UICommandToggleButton;
});
