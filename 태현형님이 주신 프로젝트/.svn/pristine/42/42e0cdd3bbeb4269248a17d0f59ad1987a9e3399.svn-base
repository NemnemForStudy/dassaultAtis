/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUICommandButton'/>
define("DS/EPSSchematicsUI/components/EPSSchematicsUICommandButton", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "css!DS/EPSSchematicsUI/css/components/EPSSchematicsUICommandButton"], function (require, exports, UIDom, UIFontIcon) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI command button.
     * @class UICommandButton
     * @alias module:DS/EPSSchematicsUI/components/EPSSchematicsUICommandButton
     * @private
     */
    var UICommandButton = /** @class */ (function () {
        /**
         * @constructor
         * @param {ICommandButtonOptions} options - The command button options.
         */
        function UICommandButton(options) {
            this._onClickCB = this._onClick.bind(this);
            this._disabled = false;
            this._command = options.command;
            this._parent = options.parent;
            this._className = options.className;
            this._callback = options.callback;
            this._initialize();
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
         * Removes the command button.
         * @public
         */
        UICommandButton.prototype.remove = function () {
            this._buttonElt.removeEventListener('click', this._onClickCB, false);
            this._command = undefined;
            this._parent = undefined;
            this._className = undefined;
            this._callback = undefined;
            this._buttonElt = undefined;
            this._onClickCB = undefined;
            this._disabled = undefined;
        };
        /**
         * Gets the command button element.
         * @public
         * @returns {HTMLDivElement} The command button element.
         */
        UICommandButton.prototype.getElement = function () {
            return this._buttonElt;
        };
        /**
         * Gets the command button disabled state.
         * @public
         * @returns {boolean} The command button disabled state.
         */
        UICommandButton.prototype.getDisabledState = function () {
            return this._disabled;
        };
        /**
        * Sets the command button disabled state.
        * @param {boolean} disabled - The disabled state.
        * @public
        */
        UICommandButton.prototype.setDisabledState = function (disabled) {
            this._disabled = disabled;
            if (disabled) {
                UIDom.addClassName(this._buttonElt, 'disabled');
            }
            else {
                UIDom.removeClassName(this._buttonElt, 'disabled');
            }
        };
        /**
         * Sets the command button short help.
         * @public
         * @param {string} shortHelp - The short help.
         */
        UICommandButton.prototype.setShortHelp = function (shortHelp) {
            this._buttonElt.tooltipInfos.shortHelp = '<b>' + shortHelp + '</b>';
        };
        /**
         * Gets the command button short help.
         * @public
         * @returns {string} The short help.
         */
        UICommandButton.prototype.getShortHelp = function () {
            return this._command.getShortHelp();
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Initializes the command button.
         * @protected
         */
        UICommandButton.prototype._initialize = function () {
            var className = ['sch-command-button'];
            if (typeof this._className === 'string' && this._className !== '') {
                className.push(this._className);
            }
            this._buttonElt = UIDom.createElement('div', {
                className: className,
                parent: this._parent,
                tooltipInfos: { title: this._command.getTitle(), shortHelp: this._command.getShortHelp() },
                children: [UIFontIcon.createFontIconFromDefinition(this._command.getIcon())]
            });
            this._buttonElt.addEventListener('click', this._onClickCB, false);
        };
        /**
         * The callback on the command button mouse click event.
         * @protected
         * @param {MouseEvent} event - The command button click event.
         */
        UICommandButton.prototype._onClick = function (event) {
            if (!this._disabled) {
                var commandCB = this._command.getCallback();
                if (commandCB !== undefined) {
                    commandCB(event);
                }
                if (this._callback !== undefined) {
                    this._callback();
                }
            }
        };
        return UICommandButton;
    }());
    return UICommandButton;
});
