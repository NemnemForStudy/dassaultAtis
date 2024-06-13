/* global WUXIconDefinition, WUXManagedFontIcons */
/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUISmartSearch'/>
define("DS/EPSSchematicsUI/components/EPSSchematicsUISmartSearch", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/data/EPSSchematicsUIKeyboard", "DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSEditorCore/QuickSearchScorer", "css!DS/EPSSchematicsUI/css/components/EPSSchematicsUISmartSearch"], function (require, exports, UIDom, UITools, UIFontIcon, UIKeyboard, UITemplateLibrary, BlockLibrary, UINLS, Scorer) {
    "use strict";
    /**
     * This class defines a UI smart search.
     * @class UISmartSearch
     * @alias module:DS/EPSSchematicsUI/components/EPSSchematicsUISmartSearch
     * @private
     */
    var UISmartSearch = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIGraph} graph - The graph on which the building block must be added.
         * @param {number} left - The left position of the smart combobox.
         * @param {number} top - The top position of the smart combobox.
         * @param {number} blockLeft - The left position of the block.
         * @param {number} blockTop - The top position of the block.
         */
        function UISmartSearch(graph, left, top, blockLeft, blockTop) {
            this._mouseFrozen = false;
            this._isRemoved = false;
            this._graph = graph;
            this._left = left;
            this._top = top;
            this._blockLeft = blockLeft;
            this._blockTop = blockTop;
            this._viewerContent = this._graph.getViewer().getContainer();
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
         * Removes the component.
         * @public
         */
        UISmartSearch.prototype.remove = function () {
            var _a;
            if (this._isRemoved === false) {
                this._isRemoved = true;
                clearTimeout(this._timeoutId);
                if ((_a = this === null || this === void 0 ? void 0 : this._container) === null || _a === void 0 ? void 0 : _a.parentElement) {
                    this._container.parentElement.removeChild(this._container);
                }
            }
            this._graph = undefined;
            this._left = undefined;
            this._top = undefined;
            this._blockLeft = undefined;
            this._blockTop = undefined;
            this._viewerContent = undefined;
            this._container = undefined;
            this._inputContainer = undefined;
            this._searchInput = undefined;
            this._searchCount = undefined;
            this._searchList = undefined;
            this._currentLength = undefined;
            this._selectedIndex = undefined;
            this._preselectedIndex = undefined;
            this._timeoutId = undefined;
            this._mouseFrozen = undefined;
            this._isRemoved = undefined;
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
         * Initializes the component.
         * @private
         */
        UISmartSearch.prototype._initialize = function () {
            var _this = this;
            // Creates the model
            this._model = [];
            Array.prototype.push.apply(this._model, this._getTemplateLibraryModel(true));
            Array.prototype.push.apply(this._model, this._getTemplateLibraryModel(false));
            Array.prototype.push.apply(this._model, this._getBlockLibraryModel());
            // Creates the interface
            this._container = UIDom.createElement('div', { className: 'sch-components-smartsearch' });
            this._inputContainer = UIDom.createElement('div', { className: 'sch-components-smartsearch-input-container', parent: this._container });
            this._searchInput = UIDom.createElement('input', {
                className: 'sch-components-smartsearch-input', parent: this._inputContainer, attributes: {
                    type: 'text', spellcheck: false, placeholder: UINLS.get('smartSearchPlaceHolder')
                }
            });
            this._searchInput.ondblclick = function (e) { return e.stopPropagation(); };
            this._searchInput.oninput = this._onInput.bind(this);
            this._searchInput.onkeydown = this._onKeydown.bind(this);
            this._searchInput.onblur = function () {
                if (_this._graph) {
                    _this._graph.removeSmartSearch();
                }
            };
            this._viewerContent.appendChild(this._container);
            this._container.setAttribute('style', 'left:' + this._left + 'px; top:' + this._top + 'px;');
            this._searchCount = UIDom.createElement('span', { className: 'sch-components-smartsearch-count', parent: this._inputContainer });
            this._createList();
            this._searchInput.focus();
        };
        /**
         * Creates the list view of the comboBox, based on the filter given as parameter.
         * The list view is an absolute div appended on the body's page.
         * @private
         * @param {string} filter - The string used to filter the result list.
         */
        UISmartSearch.prototype._createList = function (filter) {
            var _this = this;
            var elements = this._getElementList(filter);
            this._currentLength = elements.length;
            if (elements.length > 0) {
                elements.sort(function (a, b) { return b.score - a.score; });
                elements.forEach(function (element, index) {
                    element.localId = index;
                    element.onclick = _this._onClick.bind(_this);
                    element.onmouseenter = _this._onMouseenter.bind(_this);
                    element.onmouseleave = _this._onMouseleave.bind(_this);
                    element.onmousemove = _this._onMousemove.bind(_this);
                    element.onmousedown = function (e) { return e.preventDefault(); }; // Prevent input focus lost!
                });
                this._searchList = UIDom.createElement('ul', { children: elements, className: 'sch-components-smartsearch-list' });
                this._searchList.onmousedown = function (e) { return e.preventDefault(); }; // Prevent input focus lost!
                this._selectListElement(0);
            }
            if (this._searchList) {
                this._container.appendChild(this._searchList);
            }
            var hasManyBlocks = this._currentLength > 1;
            var txtCount = this._currentLength + ' ' + UINLS.get('categoryBlock') + (hasManyBlocks ? 's' : '');
            this._searchCount.textContent = txtCount;
        };
        /**
         * Removes the search list.
         * @private
         */
        UISmartSearch.prototype._removeList = function () {
            if (this._container && this._searchList) {
                this._container.removeChild(this._searchList);
                this._searchList = undefined;
            }
        };
        /**
         * Gets the elements of the list.
         * @private
         * @param {string} filter - The string used to filter the result list.
         * @returns {HTMLLIElement[]} The elements of the list.
         */
        UISmartSearch.prototype._getElementList = function (filter) {
            var elements = [];
            var reg = Scorer.filterRegex(filter);
            this._model.forEach(function (block, globalId) {
                var indexes = [];
                var ranges = [];
                var additionalInfos = block.categoryName + '/' + block.name;
                if (filter === undefined || additionalInfos.match(reg)) {
                    var score = void 0;
                    if (filter !== undefined) {
                        score = new Scorer(filter).score(additionalInfos, indexes);
                        indexes.forEach(function (index) { return ranges.push({ offset: index, length: 1 }); });
                    }
                    var fileNameIndex_1 = additionalInfos.lastIndexOf('/');
                    var isFont3DS = block.icon.fontIconFamily === WUXManagedFontIcons.Font3DS;
                    var divName = UIDom.createElement('div', { textContent: block.name });
                    var divAdditionalInfos = UIDom.createElement('div', { textContent: additionalInfos });
                    var spanIcon = isFont3DS ? UIFontIcon.create3DSFontIcon(block.icon.iconName) : UIFontIcon.createFAFontIcon(block.icon.iconName);
                    if (indexes[0] > fileNameIndex_1) {
                        ranges.forEach(function (range) { range.offset -= fileNameIndex_1 + 1; });
                        Scorer.highlightRangesWithStyleClass(divName, ranges, 'highlighted');
                    }
                    else {
                        Scorer.highlightRangesWithStyleClass(divAdditionalInfos, ranges, 'highlighted');
                    }
                    var element = UIDom.createElement('li', {
                        className: 'sch-components-smartsearch-list-element',
                        children: [spanIcon, UIDom.createElement('div', {
                                className: 'inlineBlockElement',
                                children: [divName, divAdditionalInfos]
                            })]
                    });
                    element.score = score;
                    element.globalId = globalId;
                    elements.push(element);
                }
            });
            return elements;
        };
        /**
         * Gets the template library model.
         * @private
         * @param {boolean} isLocalTemplate - True for local template library, false for global template.
         * @returns {ISmartSearchModel[]} The local or global template library model.
         */
        UISmartSearch.prototype._getTemplateLibraryModel = function (isLocalTemplate) {
            var model = [];
            var templateLibrary = isLocalTemplate ? this._graph.getLocalTemplateLibrary() : UITemplateLibrary;
            var templateUidList = templateLibrary.getGraphUidList().concat(templateLibrary.getScriptUidList());
            templateUidList.forEach(function (templateUid) {
                var templateName = templateLibrary.getNameByUid(templateUid);
                model.push({
                    name: templateName, uid: templateUid, score: 0, icon: UISmartSearch._getCategoryIcon(),
                    categoryName: isLocalTemplate ? UINLS.get('smartSearchLocalTemplateCategory') : UINLS.get('smartSearchGlobalTemplateCategory')
                });
            });
            return model;
        };
        /**
         * Gets the block library model.
         * @private
         * @returns {ISmartSearchModel[]} The block library model.
         */
        UISmartSearch.prototype._getBlockLibraryModel = function () {
            var model = [];
            var hideDefaultGraph = this._graph.getViewer().getEditor().getOptions().hideDefaultGraph;
            var categories = BlockLibrary.searchCategoryByName(RegExp('.*')).sort();
            categories.forEach(function (categoryName) {
                var icon = UISmartSearch._getCategoryIcon(categoryName);
                var blocks = UITools.getSortedBlockByCategory(categoryName, hideDefaultGraph);
                blocks.forEach(function (block) {
                    var categoryDoc = BlockLibrary.getCategoryDocumentation(categoryName);
                    var fullCategoryName = categoryDoc !== undefined ? categoryDoc.getFullName() : '';
                    model.push({ name: block.getName(), uid: block.uid, categoryName: fullCategoryName, icon: icon, score: 0 });
                });
            });
            return model;
        };
        /**
         * Gets the category icon.
         * @private
         * @static
         * @param {string} [categoryName] - The name of the category;
         * @returns {WUXIconDefinition} The WUX category icon.
         */
        UISmartSearch._getCategoryIcon = function (categoryName) {
            var icon = { iconName: '3d-object', fontIconFamily: WUXManagedFontIcons.Font3DS };
            if (categoryName) {
                var categoryDoc = BlockLibrary.getCategoryDocumentation(categoryName);
                var catIcon = categoryDoc === null || categoryDoc === void 0 ? void 0 : categoryDoc.getIcon();
                if (catIcon) {
                    icon.iconName = catIcon.name;
                    icon.fontIconFamily = UIFontIcon.convertToWUXFontFamily(catIcon.fontFamily);
                }
            }
            return icon;
        };
        /**
         * Selects the list element at given index.
         * @private
         * @param {number} index - The index of the element in the list.
         * @returns {HTMLLIElement} The selected HTML element.
         */
        UISmartSearch.prototype._selectListElement = function (index) {
            var element;
            if (typeof index === 'number' && index > -1) {
                this._unselectListElement(this._selectedIndex);
                element = this._searchList.childNodes[index];
                UIDom.addClassName(element, 'selected');
                this._selectedIndex = index;
            }
            return element;
        };
        /**
         * Unselects the list element at given index.
         * @private
         * @param {number} index - The index of the element in the list.
         */
        UISmartSearch.prototype._unselectListElement = function (index) {
            if (typeof index === 'number' && index > -1) {
                UIDom.removeClassName(this._searchList.childNodes[index], 'selected');
            }
        };
        /**
         * Preselects the list element at given index.
         * @private
         * @param {number} index - The index of the element in the list.
         */
        UISmartSearch.prototype._preselectListElement = function (index) {
            if (!this._mouseFrozen && typeof index === 'number' && index > -1) {
                var element = this._searchList.childNodes[index];
                UIDom.addClassName(element, 'preselected');
                this._preselectedIndex = index;
            }
        };
        /**
         * Unpreselects the list element at given index.
         * @private
         * @param {number} index - The index of the element in the list.
         */
        UISmartSearch.prototype._unpreselectListElement = function (index) {
            if (typeof index === 'number' && index > -1) {
                UIDom.removeClassName(this._searchList.childNodes[index], 'preselected');
            }
        };
        /**
         * The callback on the input event.
         * @private
         */
        UISmartSearch.prototype._onInput = function () {
            var _this = this;
            clearTimeout(this._timeoutId);
            this._timeoutId = setTimeout(function () {
                _this._removeList();
                _this._createList(_this._searchInput.value);
            }, 100);
        };
        /**
         * The callback on the list click event.
         * @private
         * @param {MouseEvent} event - The mouse click event.
         */
        UISmartSearch.prototype._onClick = function (event) {
            var element = event.target;
            if ((element === null || element === void 0 ? void 0 : element.localId) !== undefined) {
                this._changeSelectedIndex(element.localId - this._selectedIndex);
                this._pick();
            }
        };
        /**
         * The callback on the list element mouse enter event.
         * @private
         * @param {MouseEvent} event - The mouse enter event.
         */
        UISmartSearch.prototype._onMouseenter = function (event) {
            var element = event.target;
            if (element) {
                this._preselectListElement(element.localId);
            }
        };
        /**
         * The callback on the list element mouse leave event.
         * @private
         * @param {MouseEvent} event - The mouse leave event.
         */
        UISmartSearch.prototype._onMouseleave = function (event) {
            var element = event.target;
            if (element) {
                this._unpreselectListElement(element.localId);
            }
        };
        /**
         * The callback on the list element mouse move event.
         * @private
         * @param {MouseEvent} event - The mouse move event.
         */
        UISmartSearch.prototype._onMousemove = function (event) {
            this._mouseFrozen = false;
            var element = event.target;
            if (element) {
                this._preselectListElement(element.localId);
            }
        };
        /**
         * The callback on the keydown event.
         * @private
         * @param {KeyboardEvent} event - The keydown event.
         */
        UISmartSearch.prototype._onKeydown = function (event) {
            if (UIKeyboard.isKeyPressed(event, UIKeyboard.eEnter)) {
                this._pick();
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eEscape)) {
                if (this._graph) {
                    this._graph.removeSmartSearch();
                }
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.ePageUp)) {
                if (this._searchList !== undefined) {
                    this._changeSelectedIndex(-1 * this._screenAmount() + 1);
                }
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.ePageDown)) {
                if (this._searchList !== undefined) {
                    this._changeSelectedIndex(this._screenAmount() - 1);
                }
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eEnd)) {
                if (this._searchList !== undefined) {
                    this._changeSelectedIndex(this._currentLength - this._selectedIndex - 1);
                }
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eHome)) {
                if (this._searchList !== undefined) {
                    this._changeSelectedIndex(-this._selectedIndex);
                }
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eArrowUp)) {
                if (this._searchList !== undefined) {
                    this._changeSelectedIndex(-1);
                }
                else {
                    this._createList(this._searchInput.value);
                    this._changeSelectedIndex(this._currentLength - this._selectedIndex - 1);
                }
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eArrowDown)) {
                if (this._searchList !== undefined) {
                    this._changeSelectedIndex(1);
                }
                else {
                    this._createList(this._searchInput.value);
                    this._changeSelectedIndex(-this._selectedIndex);
                }
            }
            event.stopPropagation();
        };
        /**
         * Helper to retrieve the list height on screen.
         * @private
         * @returns {number} The list height.
         */
        UISmartSearch.prototype._screenAmount = function () {
            return Math.floor(this._searchList.clientHeight / this._searchList.firstChild.offsetHeight) || 1;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                      ___  ____ _____                                           //
        //                                     / _ \|  _ \_   _|                                          //
        //                                    | | | | | | || |                                            //
        //                                    | |_| | |_| || |                                            //
        //                                     \___/|____/ |_|                                            //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Picks the active item on the list and removes the control.
         * @private
         * @ignore
         */
        UISmartSearch.prototype._pick = function () {
            if (this._searchList) {
                var index = this._searchList.childNodes[this._selectedIndex].globalId;
                var block = this._model[index];
                var blockUI = this._graph.createBlock(block.uid, this._blockLeft, this._blockTop);
                blockUI.automaticExpandDataPorts();
                if (this._graph) {
                    this._graph.removeSmartSearch();
                }
            }
        };
        /**
         * Changes the selected element on the list.
         * @private
         * @ignore
         * @param {number} index - The index of the current selected element.
         */
        UISmartSearch.prototype._changeSelectedIndex = function (index) {
            if (this._searchList !== undefined) {
                index += this._selectedIndex;
                index = index >= this._currentLength ? 0 : (index < 0 ? this._currentLength - 1 : index);
                if (this._selectedIndex !== index) {
                    this._unpreselectListElement(this._preselectedIndex);
                    this._mouseFrozen = true;
                    var node = this._selectListElement(index);
                    if (node.offsetTop < this._searchList.scrollTop) {
                        this._searchList.scrollTop = node.offsetTop - node.clientHeight;
                    }
                    else if (node.offsetTop + node.offsetHeight > this._searchList.scrollTop + this._searchList.clientHeight) {
                        this._searchList.scrollTop = node.offsetTop + node.offsetHeight - this._searchList.clientHeight + node.clientHeight;
                    }
                }
            }
        };
        /**
         * Gets the smart search model.
         * @private
         * @ignore
         * @returns {ISmartSearchModel[]} The smart search model.
         */
        UISmartSearch.prototype._getModel = function () {
            return this._model;
        };
        /**
         * Gets the search input element.
         * @private
         * @ignore
         * @returns {HTMLInputElement} The search input element.
         */
        UISmartSearch.prototype._getSearchInput = function () {
            return this._searchInput;
        };
        /**
         * Gets the search list element.
         * @private
         * @ignore
         * @returns {HTMLUListElement} The search list element.
         */
        UISmartSearch.prototype._getSearchList = function () {
            return this._searchList;
        };
        /**
         * Gets the selected index.
         * @private
         * @ignore
         * @returns {number} The selected index.
         */
        UISmartSearch.prototype._getSelectedIndex = function () {
            return this._selectedIndex;
        };
        return UISmartSearch;
    }());
    return UISmartSearch;
});
