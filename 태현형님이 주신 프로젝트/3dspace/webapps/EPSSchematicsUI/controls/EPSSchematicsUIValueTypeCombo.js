/// <amd-module name='DS/EPSSchematicsUI/controls/EPSSchematicsUIValueTypeCombo'/>
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
define("DS/EPSSchematicsUI/controls/EPSSchematicsUIValueTypeCombo", ["require", "exports", "DS/Controls/Abstract", "DS/Utilities/Dom", "DS/Core/WebUXComponents", "DS/Controls/Button", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/data/EPSSchematicsUIKeyboard", "DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSEditorCore/QuickSearchScorer", "css!DS/EPSSchematicsUI/css/controls/EPSSchematicsUIValueTypeCombo"], function (require, exports, WUXAbstract, WUXDomUtils, WebUXComponents, WUXButton, UIDom, UIFontIcon, UIKeyboard, UIEvents, UINLS, QuickSearchScorer) {
    "use strict";
    /**
     * This class defines the UI value type combobox WUX control.
     * @class UIValueTypeCombo
     * @alias DS/EPSSchematicsUI/controls/EPSSchematicsUIValueTypeCombo
     * @extends WUXAbstract
     * @private
     */
    var UIValueTypeCombo = /** @class */ (function (_super) {
        __extends(UIValueTypeCombo, _super);
        function UIValueTypeCombo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.onWindowMousedownCB = _this.onWindowMousedown.bind(_this);
            _this.onMouseenterCB = _this.onMouseenter.bind(_this);
            _this.onMouseleaveCB = _this.onMouseleave.bind(_this);
            _this.onMousemoveCB = _this.onMousemove.bind(_this);
            _this.currentLength = 0;
            _this.mouseFrozen = false;
            return _this;
        }
        Object.defineProperty(UIValueTypeCombo, "publishedProperties", {
            /**
             * @property {Object} publishedProperties - The default control properties.
             * @private
             */
            get: function () {
                return {
                    value: {
                        defaultValue: '',
                        type: 'string',
                        category: 'Behavior'
                    },
                    possibleValues: {
                        defaultValue: [],
                        type: 'array',
                        category: 'Model'
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
        /**
         * Removes the control.
         * @public
         * @returns {IWUXControlAbstract} The removed control.
         */
        UIValueTypeCombo.prototype.remove = function () {
            this.removeList();
            return _super.prototype.remove.call(this);
        };
        /**
         * Applies the value property.
         * @public
         * @param {string} oldValue - The old value property.
         * @param {string} newValue - The new value property.
         */
        UIValueTypeCombo.prototype._applyValue = function (oldValue, newValue) {
            this.elements.searchInput.value = newValue;
            if (!this.preventTriggeringChangeEvent) {
                this.fire('change');
            }
        };
        /**
         * Applies the show type library button property.
         * @public
         * @param {boolean} oldValue - The old value property.
         * @param {boolean} newValue - The new value property.
         */
        // eslint-disable-next-line no-unused-vars
        UIValueTypeCombo.prototype._applyShowTypeLibraryButton = function (oldValue, newValue) {
            var _this = this;
            if (this.showTypeLibraryButton) {
                this.elements.typeLibraryButton = UIDom.createElement('button', {
                    className: ['sch-controls-valuetypecombo-button', 'sch-controls-valuetypecombo-button-typelibrary'],
                    parent: this.elements.container,
                    insertBefore: this.elements.button,
                    tooltipInfos: {
                        title: UINLS.get('openTypeLibraryTitle'),
                        shortHelp: UINLS.get('openTypeLibraryShortHelp'),
                        initialDelay: 500
                    },
                    children: [UIFontIcon.create3DSFontIcon('text')],
                    attributes: { type: 'button' },
                    onclick: function (event) {
                        var typeLibraryPanel = _this.editor.getTypeLibraryPanel();
                        typeLibraryPanel.selectType(_this.value);
                        var closeEvent = new UIEvents.UIDialogCloseEvent(); // Send a dialog close event
                        _this.editor.dispatchEvent(closeEvent);
                        event.stopPropagation();
                    }
                });
            }
            else if (this.elements.typeLibraryButton) {
                this.elements.container.removeChild(this.elements.typeLibraryButton);
                this.elements.typeLibraryButton = undefined;
            }
        };
        /**
         * Builds the view of the control.
         * @protected
         */
        UIValueTypeCombo.prototype.buildView = function () {
            this.preventTriggeringChangeEvent = true; // Prevent fire change event during the control build
            UIDom.addClassName(this.elements.container, 'sch-controls-valuetypecombo');
            this.elements.searchInput = UIDom.createElement('input', {
                className: 'sch-controls-valuetypecombo-input',
                parent: this.elements.container,
                attributes: { type: 'text', spellcheck: false }
            });
            this.elements.button = UIDom.createElement('button', {
                className: ['sch-controls-valuetypecombo-button', 'sch-controls-valuetypecombo-button-expand'],
                parent: this.elements.container,
                children: [UIFontIcon.create3DSFontIcon('expand-down')]
            });
            this.elements.searchInput.value = this.value;
        };
        /**
         * The callback on the control post build view.
         * @public
         */
        UIValueTypeCombo.prototype._postBuildView = function () {
            this.preventTriggeringChangeEvent = false; // Restore the change event dispatching
        };
        /**
         * Handles the control events.
         * @public
         */
        UIValueTypeCombo.prototype.handleEvents = function () {
            var _this = this;
            WUXDomUtils.addEventOnElement(this, this.elements.button, 'click', function () {
                if (_this.elements.searchList !== undefined) {
                    _this.removeList();
                }
                else {
                    _this.createList(_this.value);
                }
                _this.elements.searchInput.focus();
                _this.elements.searchInput.select();
            });
            WUXDomUtils.addEventOnElement(this, this.elements.searchInput, 'blur', function () {
                window.getSelection().removeAllRanges();
            });
            WUXDomUtils.addEventOnElement(this, this.elements.searchInput, 'keydown', function (event) {
                if (UIKeyboard.isKeyPressed(event, UIKeyboard.eArrowUp)) {
                    if (_this.elements.searchList !== undefined) {
                        _this.changeSelectedIndex(-1);
                    }
                    else {
                        _this.createList(_this.value);
                        _this.changeSelectedIndex(_this.currentLength - _this.selectedIndex - 1);
                    }
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eArrowDown)) {
                    if (_this.elements.searchList !== undefined) {
                        _this.changeSelectedIndex(1);
                    }
                    else {
                        _this.createList(_this.value);
                        _this.changeSelectedIndex(-_this.selectedIndex);
                    }
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eHome)) {
                    if (_this.elements.searchList !== undefined) {
                        _this.changeSelectedIndex(-_this.selectedIndex);
                    }
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eEnd)) {
                    if (_this.elements.searchList !== undefined) {
                        _this.changeSelectedIndex(_this.currentLength - _this.selectedIndex - 1);
                    }
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.ePageUp)) {
                    if (_this.elements.searchList !== undefined) {
                        _this.changeSelectedIndex(-1 * _this.screenAmount() + 1);
                    }
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.ePageDown)) {
                    if (_this.elements.searchList !== undefined) {
                        _this.changeSelectedIndex(_this.screenAmount() - 1);
                    }
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eEscape)) {
                    _this.removeList();
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eEnter)) {
                    _this.callMethodFromUIInteraction('pick');
                }
                event.stopPropagation();
            });
            WUXDomUtils.addEventOnElement(this, this.elements.searchInput, 'input', function () {
                clearTimeout(_this.timeoutId);
                _this.timeoutId = setTimeout(function () {
                    _this.removeList();
                    _this.createList(_this.elements.searchInput.value);
                }, 100);
            });
        };
        /**
         * Creates the search list view of the comboBox, based on the filter given as parameter.
         * The list view is an absolute div appended on the body's page.
         * @private
         * @param {string} filter - The string used to filter the result list.
         */
        UIValueTypeCombo.prototype.createList = function (filter) {
            var _this = this;
            var elements = this.getElementList(filter);
            this.currentLength = elements.length;
            if (elements.length > 0) {
                elements.sort(function (a, b) { return b.score - a.score; });
                elements.forEach(function (element, index) {
                    element.localId = index;
                    WUXDomUtils.addEventOnElement(_this, element, 'click', function (event) {
                        var elt = event.target;
                        if (elt !== undefined && elt.localId !== undefined) {
                            _this.changeSelectedIndex(elt.localId - _this.selectedIndex);
                            _this.callMethodFromUIInteraction('pick');
                        }
                    });
                    element.onmouseenter = _this.onMouseenterCB;
                    element.onmouseleave = _this.onMouseleaveCB;
                    element.onmousemove = _this.onMousemoveCB;
                    element.onmousedown = function (event) { return event.preventDefault(); }; // Prevent input focus lost!
                });
                this.elements.searchListContainer = UIDom.createElement('div', { className: 'sch-controls-valuetypecombo-list-container' });
                this.elements.searchList = UIDom.createElement('ul', {
                    children: elements,
                    className: 'sch-controls-valuetypecombo-list',
                    parent: this.elements.searchListContainer
                });
                if (this.showCreateUserTypeButton) {
                    this.elements.createTypeContainer = UIDom.createElement('div', {
                        className: 'sch-controls-valuetypecombo-createtype-container',
                        parent: this.elements.searchListContainer
                    });
                    this.elements.createTypeButton = new WUXButton({
                        label: UINLS.get('shortHelpHistoryCreateCustomType'),
                        emphasize: 'primary',
                        icon: UIFontIcon.getWUXFAIconDefinition('plus'),
                        onClick: function () {
                            var typeLibraryPanel = _this.editor.getTypeLibraryPanel();
                            var event = new UIEvents.UIDialogCloseEvent(); // Send a dialog close event
                            _this.editor.dispatchEvent(event);
                            typeLibraryPanel.open();
                            typeLibraryPanel.openCreateTypeDialog(_this.dataPort);
                        }
                    }).inject(this.elements.createTypeContainer);
                }
                //this.elements.onmousedown = (event: MouseEvent) => event.preventDefault(); // Prevent input focus lost!
                this.selectListElement(0);
                window.addEventListener('mousedown', this.onWindowMousedownCB, true);
                var bbox = this.elements.container.getBoundingClientRect();
                this.elements.searchListContainer.style.left = bbox.left + 'px';
                this.elements.searchListContainer.style.top = bbox.top + bbox.height + 'px';
                this.elements.searchListContainer.style.width = bbox.width + 'px';
                document.body.appendChild(this.elements.searchListContainer);
            }
        };
        /**
         * Removes the search list.
         * @private
         */
        UIValueTypeCombo.prototype.removeList = function () {
            if (this.elements.searchListContainer !== undefined) {
                window.removeEventListener('mousedown', this.onWindowMousedownCB, true);
                document.body.removeChild(this.elements.searchListContainer);
                this.elements.searchListContainer = undefined;
                this.elements.searchList = undefined;
            }
        };
        /**
         * Picks the active item on the list and removes the list.
         * @private
         */
        UIValueTypeCombo.prototype.pick = function () {
            if (this.elements.searchList !== undefined) {
                var childNode = this.elements.searchList.childNodes[this.selectedIndex];
                var index = childNode.globalId;
                var value = this.possibleValues[index];
                this.elements.searchInput.focus();
                this.removeList();
                this.value = value;
                this.elements.searchInput.value = this.value;
            }
        };
        /**
         * The callback on the window mouse down event.
         * Ignores interaction with comboBox (input and button).
         * Check if an element is clicked or if search list must be closed.
         * @private
         * @param {MouseEvent} event - The window mouse down event.
         */
        UIValueTypeCombo.prototype.onWindowMousedown = function (event) {
            clearTimeout(this.timeoutId);
            var element = event.target;
            if (element !== this.elements.searchInput &&
                element !== this.elements.button &&
                element !== this.elements.searchList &&
                element.parentNode !== this.elements.searchList &&
                element !== (this.elements.createTypeButton ? this.elements.createTypeButton.getContent() : undefined)) {
                if (this.elements.searchList !== undefined && this.elements.searchInput !== undefined) {
                    var childNode = this.elements.searchList.childNodes[this.selectedIndex];
                    var index = childNode.globalId;
                    this.value = this.elements.searchInput.value === this.possibleValues[index].toLowerCase() ? this.possibleValues[index] : this.value;
                    this.elements.searchInput.value = this.value;
                }
                this.removeList();
            }
        };
        /**
         * Gets the elements of the list.
         * @private
         * @param {string} filter - The string used to filter the result list.
         * @returns {IValueTypeElement[]} The elements of the list.
         */
        UIValueTypeCombo.prototype.getElementList = function (filter) {
            var reg = QuickSearchScorer.filterRegex(filter);
            var elements = [];
            var nonMatchingElements = [];
            var createSeparator = true;
            this.possibleValues.forEach(function (value, valueIndex) {
                var divName = UIDom.createElement('div', { textContent: value });
                var listElement = UIDom.createElement('li', {
                    className: 'sch-controls-valuetypecombo-list-element',
                    children: [divName]
                });
                listElement.globalId = valueIndex;
                var indexes = [];
                var ranges = [];
                var score = 0;
                if (filter === undefined || value.match(reg)) {
                    if (filter !== undefined) {
                        score = new QuickSearchScorer(filter).score(value, indexes);
                        indexes.forEach(function (index) { return ranges.push({ offset: index, length: 1 }); });
                    }
                    QuickSearchScorer.highlightRangesWithStyleClass(divName, ranges, 'highlighted');
                    listElement.score = score;
                    elements.push(listElement);
                }
                else {
                    UIDom.addClassName(listElement, 'nonmatching');
                    if (createSeparator) {
                        UIDom.addClassName(listElement, 'separator');
                        createSeparator = false;
                    }
                    listElement.score = score;
                    nonMatchingElements.push(listElement);
                }
            });
            Array.prototype.push.apply(elements, nonMatchingElements); // Faster than array concat because modify the existing array!
            return elements;
        };
        /**
         * The callback on the list element mouse enter event.
         * @private
         * @param {MouseEvent} event - The mouse enter event.
         */
        UIValueTypeCombo.prototype.onMouseenter = function (event) {
            var element = event.target;
            if (element !== undefined) {
                this.preselectListElement(element.localId);
            }
        };
        /**
         * The callback on the list element mouse leave event.
         * @private
         * @param {MouseEvent} event - The mouse leave event.
         */
        UIValueTypeCombo.prototype.onMouseleave = function (event) {
            var element = event.target;
            if (element !== undefined) {
                this.unpreselectListElement(element.localId);
            }
        };
        /**
         * The callback on the list element mouse move event.
         * @private
         * @param {MouseEvent} event - The mouse move event.
         */
        UIValueTypeCombo.prototype.onMousemove = function (event) {
            this.mouseFrozen = false;
            var element = event.target;
            if (element !== undefined) {
                this.preselectListElement(element.localId);
            }
        };
        /**
         * Selects the list element at given index.
         * @private
         * @param {number} index - The index of the element in the list.
         * @returns {IValueTypeElement} The selected HTML element.
         */
        UIValueTypeCombo.prototype.selectListElement = function (index) {
            var element;
            if (typeof index === 'number' && index > -1) {
                this.unselectListElement(this.selectedIndex);
                element = this.elements.searchList.childNodes[index];
                UIDom.addClassName(element, 'selected');
                this.selectedIndex = index;
            }
            return element;
        };
        /**
         * Unselects the list element at given index.
         * @private
         * @param {number} index - The index of the element in the list.
         */
        UIValueTypeCombo.prototype.unselectListElement = function (index) {
            if (typeof index === 'number' && index > -1) {
                UIDom.removeClassName(this.elements.searchList.childNodes[index], 'selected');
            }
        };
        /**
         * Preselects the list element at given index.
         * @private
         * @param {number} index - The index of the element in the list.
         */
        UIValueTypeCombo.prototype.preselectListElement = function (index) {
            if (!this.mouseFrozen && typeof index === 'number' && index > -1) {
                var element = this.elements.searchList.childNodes[index];
                UIDom.addClassName(element, 'preselected');
                this.preselectedIndex = index;
            }
        };
        /**
         * Unpreselects the list element at given index.
         * @private
         * @param {number} index - The index of the element in the list.
         */
        UIValueTypeCombo.prototype.unpreselectListElement = function (index) {
            if (typeof index === 'number' && index > -1) {
                UIDom.removeClassName(this.elements.searchList.childNodes[index], 'preselected');
            }
        };
        /**
         * Changes the selected element on the list.
         * @private
         * @param {number} index - The index of the current selected element.
         */
        UIValueTypeCombo.prototype.changeSelectedIndex = function (index) {
            if (this.elements.searchList !== undefined) {
                index += this.selectedIndex;
                index = index >= this.currentLength ? 0 : (index < 0 ? this.currentLength - 1 : index);
                if (this.selectedIndex !== index) {
                    this.unpreselectListElement(this.preselectedIndex);
                    this.mouseFrozen = true;
                    var node = this.selectListElement(index);
                    if (node.offsetTop < this.elements.searchList.scrollTop) {
                        this.elements.searchList.scrollTop = node.offsetTop - node.clientHeight;
                    }
                    else if (node.offsetTop + node.offsetHeight > this.elements.searchList.scrollTop + this.elements.searchList.clientHeight) {
                        this.elements.searchList.scrollTop = node.offsetTop + node.offsetHeight - this.elements.searchList.clientHeight + node.clientHeight;
                    }
                }
            }
        };
        /**
         * Helper function to retrieve the list height on screen.
         * @private
         * @returns {number} The list height.
         */
        UIValueTypeCombo.prototype.screenAmount = function () {
            return Math.floor(this.elements.searchList.clientHeight / this.elements.searchList.firstChild.offsetHeight) || 1;
        };
        return UIValueTypeCombo;
    }(WUXAbstract));
    WebUXComponents.addClass(UIValueTypeCombo, 'UIValueTypeCombo');
    return UIValueTypeCombo;
});
