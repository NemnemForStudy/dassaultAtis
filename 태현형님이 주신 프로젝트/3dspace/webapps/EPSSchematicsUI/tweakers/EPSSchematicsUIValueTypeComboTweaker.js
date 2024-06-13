/// <amd-module name='DS/EPSSchematicsUI/tweakers/EPSSchematicsUIValueTypeComboTweaker'/>
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
define("DS/EPSSchematicsUI/tweakers/EPSSchematicsUIValueTypeComboTweaker", ["require", "exports", "DS/Tweakers/TweakerBase", "DS/Utilities/Utils", "DS/Utilities/Dom", "DS/Core/WebUXComponents", "DS/EPSSchematicsUI/controls/EPSSchematicsUIValueTypeCombo"], function (require, exports, WUXTweakerBase, WUXUtils, WUXDomUtils, WebUXComponents, UIValueTypeCombo) {
    "use strict";
    /**
     * This class defines the UI value type combobox WUX tweaker.
     * @class UIValueTypeComboTweaker
     * @alias DS/EPSSchematicsUI/tweakers/EPSSchematicsUIValueTypeComboTweaker
     * @extends WUXTweakerBase
     * @private
     */
    var UIValueTypeComboTweaker = /** @class */ (function (_super) {
        __extends(UIValueTypeComboTweaker, _super);
        function UIValueTypeComboTweaker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(UIValueTypeComboTweaker, "publishedProperties", {
            /**
             * @property {Object} publishedProperties - The default control properties.
             * @private
             */
            get: function () {
                return {
                    value: {
                        defaultValue: '',
                        type: 'string',
                        advancedSetter: true
                    },
                    displayStyle: {
                        defaultValue: 'myStyle',
                        type: 'string'
                    },
                    possibleValues: {
                        defaultValue: [],
                        type: 'array'
                    },
                    editor: {
                        defaultValue: undefined,
                        type: 'object',
                        category: 'Behavior'
                    },
                    dataPort: {
                        defaultValue: undefined,
                        type: 'object',
                        category: 'Behavior'
                    },
                    showCreateUserTypeButton: {
                        defaultValue: false,
                        type: 'boolean',
                        category: 'Behavior'
                    },
                    showTypeLibraryButton: {
                        defaultValue: false,
                        type: 'boolean',
                        category: 'Behavior'
                    }
                };
            },
            enumerable: false,
            configurable: true
        });
        UIValueTypeComboTweaker.prototype._applyProperties = function (oldValues) {
            _super.prototype._applyProperties.call(this, oldValues);
            if (this.isDirty('showTypeLibraryButton')) {
                this._applyShowTypeLibraryButton(oldValues.showTypeLibraryButton, this.showTypeLibraryButton);
            }
        };
        UIValueTypeComboTweaker.prototype._applyShowTypeLibraryButton = function (oldValue, newValue) {
            if (this.elements._viewModule && !this.readOnly) {
                this.elements._viewModule.setShowTypeLibraryButton(newValue, oldValue);
            }
        };
        return UIValueTypeComboTweaker;
    }(WUXTweakerBase));
    var BaseViewModuleValueTypeComboTweaker = function (tweaker, options) {
        WUXTweakerBase.prototype.baseViewModule.call(this, tweaker, options);
    };
    WUXUtils.applyMixin(BaseViewModuleValueTypeComboTweaker, WUXTweakerBase.prototype.baseViewModule);
    BaseViewModuleValueTypeComboTweaker.prototype.buildView = function () {
        if (this._tweaker.elements.container) {
            this._view = new UIValueTypeCombo();
            this._view.getContent().addClassName('sch-tweakers-typecombo');
            this.setValue(this._tweaker.value);
            this._view.possibleValues = this._tweaker.possibleValues;
            this._view.editor = this._tweaker.editor;
            this._view.dataPort = this._tweaker.dataPort;
            this._view.showCreateUserTypeButton = this._tweaker.showCreateUserTypeButton;
            this._view.showTypeLibraryButton = this._tweaker.showTypeLibraryButton;
        }
    };
    BaseViewModuleValueTypeComboTweaker.prototype.setValue = function (newValue /*, oldValue: any*/) {
        this._view.value = newValue;
    };
    BaseViewModuleValueTypeComboTweaker.prototype.setShowTypeLibraryButton = function (newValue /*, oldValue: any*/) {
        this._view.showTypeLibraryButton = newValue;
    };
    BaseViewModuleValueTypeComboTweaker.prototype.handleEvents = function () {
        var _this = this;
        WUXDomUtils.addEventOnElement(this._tweaker, this._view, 'change', function (event) {
            event.stopPropagation();
            _this.setTweakerValue(_this._view.value);
        });
    };
    UIValueTypeComboTweaker.prototype.baseViewModule = BaseViewModuleValueTypeComboTweaker;
    UIValueTypeComboTweaker.prototype.VIEW_MODULES = {
        myStyle: { classObject: BaseViewModuleValueTypeComboTweaker, options: { viewOptions: { displayStyle: 'myStyle' } } }
    };
    WebUXComponents.addClass(UIValueTypeComboTweaker, 'UIValueTypeComboTweaker');
    return UIValueTypeComboTweaker;
});
