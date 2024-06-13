/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUIFadeOutContainer'/>
define("DS/EPSSchematicsUI/components/EPSSchematicsUIFadeOutContainer", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/components/EPSSchematicsUIFadeOutContainer"], function (require, exports, UIDom) {
    "use strict";
    /**
     * This class defines a UI fade out container component.
     * @class UIFadeOutContainer
     * @alias module:S/EPSSchematicsUI/components/EPSSchematicsUIFadeOutContainer
     * @private
     */
    var UIFadeOutContainer = /** @class */ (function () {
        /**
         * @constructor
         * @param {HTMLElement} [parent] - The parent html element.
         */
        function UIFadeOutContainer(parent) {
            this._onMousemoveCB = this._onMousemove.bind(this);
            this._isFadeDisabled = false;
            this._parent = parent;
            document.addEventListener('mousemove', this._onMousemoveCB, false);
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
         * Removes the container.
         * @public
         */
        UIFadeOutContainer.prototype.remove = function () {
            document.removeEventListener('mousemove', this._onMousemoveCB, false);
            if (this._parent !== undefined) {
                this._parent.removeChild(this._element);
            }
            this._parent = undefined;
            this._element = undefined;
            this._onMousemoveCB = undefined;
        };
        /**
         * Gets the container element.
         * @public
         * @returns {HTMLElement} The container element.
         */
        UIFadeOutContainer.prototype.getElement = function () {
            return this._element;
        };
        /**
         * Sets the position of the container.
         * @public
         * @param {number} left - The left position of the container.
         * @param {number} top - The top position of the container.
         */
        UIFadeOutContainer.prototype.setPosition = function (left, top) {
            this._element.style.left = left + 'px';
            this._element.style.top = top + 'px';
        };
        /**
         * Disables the fade with distance behavior.
         * @public
         */
        UIFadeOutContainer.prototype.disableFadeWithDistance = function () {
            this._isFadeDisabled = true;
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
         * Creates the container element.
         * @protected
         */
        UIFadeOutContainer.prototype._createElement = function () {
            this._element = UIDom.createElement('div', {
                className: 'sch-fadeout-container',
                parent: this._parent
            });
        };
        /**
         * Fades the container according to the mouse position.
         * @protected
         * @param {number} mouseLeft - The left position of the mouse.
         * @param {number} mouseTop - The top position of the mouse.
         * @param {HTMLElement} [target] - The target mouse element.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIFadeOutContainer.prototype._fadeWithDistance = function (mouseLeft, mouseTop, target) {
            if (!this._isFadeDisabled) {
                var distance = UIDom.computeDistanceFromMouse(this._element, mouseLeft, mouseTop);
                if (distance >= 0 && distance <= UIFadeOutContainer._kOpacityMinDistance) {
                    this._element.style.opacity = String(1);
                }
                else if (distance > UIFadeOutContainer._kOpacityMinDistance && distance < UIFadeOutContainer._kOpacityMaxDistance) {
                    this._element.style.opacity = String(1 - (distance / UIFadeOutContainer._kOpacityMaxDistance));
                }
                else {
                    this.remove();
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
         * The callback on the mouse move event.
         * @private
         * @param {MouseEvent} event - The mouse move event.
         */
        UIFadeOutContainer.prototype._onMousemove = function (event) {
            this._fadeWithDistance(event.clientX, event.clientY, event.target);
        };
        UIFadeOutContainer._kOpacityMinDistance = 30;
        UIFadeOutContainer._kOpacityMaxDistance = 100;
        UIFadeOutContainer._kOffsetLeft = 20;
        UIFadeOutContainer._kOffsetTop = 20;
        return UIFadeOutContainer;
    }());
    return UIFadeOutContainer;
});
