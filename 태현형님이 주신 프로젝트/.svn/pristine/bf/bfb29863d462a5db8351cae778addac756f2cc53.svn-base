/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBaseDialog'/>
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBaseDialog", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXDialog", "DS/Controls/Button", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUIBaseDialog"], function (require, exports, UIDom, WUXDialog, WUXButton) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI base dialog.
     * @class UIValidationDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBaseDialog
     * @private
     * @abstract
     */
    var UIBaseDialog = /** @class */ (function () {
        /**
         * @constructor
         * @param {IWUXDialogOptions} options - The dialog options.
         */
        function UIBaseDialog(options) {
            this._openState = false;
            this._options = options;
            this._options.buttons = options.buttons || {};
            this._options.buttonsDefinition = options.buttonsDefinition || {};
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
         * Removes the dialog.
         * @public
         */
        UIBaseDialog.prototype.remove = function () {
            this.close();
            this._dialog = undefined;
            this._options = undefined;
            this._openState = undefined;
            this._content = undefined;
        };
        /**
         * Opens the dialog.
         * @public
         */
        UIBaseDialog.prototype.open = function () {
            if (!this._openState) {
                this._createDialog();
                this._openState = true;
            }
        };
        /**
         * Closes the dialog.
         * @public
         */
        UIBaseDialog.prototype.close = function () {
            if (this._openState) {
                this._dialog.close();
            }
        };
        /**
         * Gets the dialog open state.
         * @public
         * @returns {boolean} The dialog open state.
         */
        UIBaseDialog.prototype.isOpen = function () {
            return this._openState;
        };
        /**
         * Gets the WUX dialog.
         * @public
         * @returns {WUXDialog} The WUX dialog.
         */
        UIBaseDialog.prototype.getDialog = function () {
            return this._dialog;
        };
        /**
         * Gets the dialog content.
         * @public
         * @returns {HTMLDivElement} The dialog content.
         */
        UIBaseDialog.prototype.getContent = function () {
            return this._content;
        };
        /**
         * Gets the dialog options.
         * @public
         * @returns {IWUXDialogOptions} The dialog options.
         */
        UIBaseDialog.prototype.getOptions = function () {
            return this._options;
        };
        /**
         * Sets the visible flag of the dialog.
         * @public
         * @param {boolean} visibleFlag - The visible flag.
         */
        UIBaseDialog.prototype.setVisibleFlag = function (visibleFlag) {
            this._dialog.visibleFlag = visibleFlag;
        };
        /**
         * The callback on the dialog close event.
         * @protected
         * @param {*} [args] - The optionnal arguments.
         */
        UIBaseDialog.prototype._onClose = function (args) {
            if (typeof this._options.onClose === 'function') {
                this._options.onClose.call(this, args);
            }
            this._dialog = undefined;
            this._content = undefined;
            this._openState = false;
        };
        /**
         * The callback on the title bar close button click event.
         * @protected
         * @param {MouseEvent} event - The click event.
         */
        UIBaseDialog.prototype._onTitleBarCloseButtonClick = function (event) {
            this.close();
            event.stopPropagation();
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
         * The callback on the title bar dblclick event.
         * @private
         */
        UIBaseDialog.prototype._onTitleBarDblclick = function () {
            if (this._dialog.allowMaximizeFlag) {
                this._dialog.maximizedFlag = !this._dialog.maximizedFlag;
            }
        };
        /**
         * Creates the dialog.
         * @private
         */
        UIBaseDialog.prototype._createDialog = function () {
            this._content = UIDom.createElement('div', { className: 'sch-dialog-content' });
            this._options.content = this._content;
            this._generateButtons();
            this._dialog = new WUXDialog(this._options);
            this._onCreateContent();
            var className = Array.isArray(this._options.className) ? this._options.className : [this._options.className];
            className.unshift('sch-windows-dialog');
            UIDom.addClassName(this._dialog.elements.container, className);
            this._dialog.addEventListener('close', this._onClose.bind(this), false);
            this._dialog.getTitleBar().addEventListener('dblclick', this._onTitleBarDblclick.bind(this), false);
            if (this._dialog.closeButtonFlag) {
                this._dialog.elements._closeButton.addEventListener('click', this._onTitleBarCloseButtonClick.bind(this), false);
            }
            // Set the focus on the dialog so key events be propagated on this context
            var content = this._dialog.getContent();
            content.tabIndex = -1;
            content.focus();
        };
        /**
         * Generates the WUX buttons.
         * We have to regenerate buttons as WUX messed up each button when the dialog is destoyed!
         * @private
         */
        UIBaseDialog.prototype._generateButtons = function () {
            var _this = this;
            if (this._options.buttonsDefinition !== undefined) {
                var buttonsName = Object.keys(this._options.buttonsDefinition);
                buttonsName.forEach(function (buttonName) {
                    _this._options.buttons[buttonName] = new WUXButton(_this._options.buttonsDefinition[buttonName]);
                });
            }
        };
        return UIBaseDialog;
    }());
    return UIBaseDialog;
});
