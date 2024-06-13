/// <amd-module name="DS/StuHumanPosture/StuHumanPosture"/>
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
define("DS/StuHumanPosture/StuHumanPosture", ["require", "exports", "DS/StuCore/StuContext", "DS/StuModel/StuInstance", "DS/StuHumanPosture/StuHumanPostureApplyEvent"], function (require, exports, STU, Instance, HumanPostureApplyEvent) {
    "use strict";
    var HumanPosture = /** @class */ (function (_super) {
        __extends(HumanPosture, _super);
        /**
         * Describes a Human Posture object.
         *
         * <p>Human Postures are objects exposed on Human Actor, and share similar play capabilities with Experience animations.
         * They are retrieved with the same getPostures / getPostureByName methods exposed on Actor3D, but only Human Actors actually host and
         * return Human Postures
         * </p>
         *
         * @example
         *  // get a human actor, retrieve on of its animations and play it
         * 	var actor = this.getExperience().getActorByName("MyHumanActor");
         *  var anim = actor.getPostureByName("MyHumanPosture");
         *  anim.play();
         *
         * @public
         * @exports HumanPosture
         * @memberof STU
         * @class
         * @extends {STU.Instance}
         * @alias STU.HumanPosture
         * @constructor
         * @noinstancector
         */
        function HumanPosture() {
            var _this = _super.call(this) || this;
            /**
             * C++ class bindings to control the animation engine
             *
             * @private
             * @type {stu__HumanPostureWrapper}
             * @constructor
             */
            _this._wrapper = null;
            return _this;
        }
        /**
        * Applies the posture.
        *
        * @public
        * @name STU.HumanPosture#apply
        * @function
        */
        HumanPosture.prototype.apply = function () {
            var wrapper = this._getOrCreateWrapper();
            if (wrapper !== undefined && wrapper !== null) {
                var expPointer = this.CATI3DExperienceObject;
                if (expPointer === null || expPointer === undefined) {
                    console.error("Cannot find reference to posture, build must be corrupted");
                    return;
                }
                if (0 === this._wrapper.apply(expPointer)) {
                    var postureEvent = new HumanPostureApplyEvent(this);
                    this.dispatchEvent(postureEvent);
                }
                return;
            }
        };
        ;
        /**
        * Returns the list of impacted actors and subactors by the posture
        * Non-exposed object will not be returned
        *
        * @public
        * @return {Array.<STU.Actor>}
        * @name STU.HumanPosture#getObjectsUsingPosture
        * @function
        */
        HumanPosture.prototype.getObjectsUsingPosture = function () {
            var wrapper = this._getOrCreateWrapper();
            if (wrapper !== undefined && wrapper !== null) {
                var expPointer = this.CATI3DExperienceObject;
                if (expPointer === null || expPointer === undefined) {
                    console.error("Cannot find reference to posture, build must be corrupted");
                    return [];
                }
                return this._wrapper.getObjectsUsingPosture(expPointer);
            }
        };
        ;
        /**
        * Return the scene above the posture
        *
        * @public
        * @return {STU.Scene}
        * @name STU.HumanPosture#getScene
        * @function
        */
        HumanPosture.prototype.getScene = function () {
            if (STU.Experience.getCurrent().getCurrentScene() != null) { // scenes are activated
                return Instance.prototype.findParent.call(this, STU.Scene);
            }
            return undefined;
        };
        ;
        /**
        * Returns true if this posture is permanent, false otherwise.
        *
        * @public
        * @return {boolean}
        * @name STU.HumanPosture#isPermanent
        * @function
        */
        HumanPosture.prototype.isPermanent = function () {
            var isPermanent = true;
            if (STU.Experience.getCurrent().getCurrentScene() != null) { // scenes are activated
                if (this.getScene() != undefined)
                    isPermanent = false;
            }
            return isPermanent;
        };
        ;
        /**
         * Get or create the C++ binding for this human animation instance
         * @private
         * @returns {stu__HumanPostureWrapper}
         */
        HumanPosture.prototype._getOrCreateWrapper = function () {
            if (this._wrapper === null || this._wrapper === undefined) {
                this._wrapper = new stu__HumanPostureWrapper();
            }
            return this._wrapper;
        };
        return HumanPosture;
    }(Instance));
    STU["HumanPosture"] = HumanPosture;
    return HumanPosture;
});
