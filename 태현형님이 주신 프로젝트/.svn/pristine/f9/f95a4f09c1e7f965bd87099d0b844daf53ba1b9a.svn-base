/// <amd-module name='DS/EPSSchematicsUI/panels/EPSSchematicsUIBlockLibraryPanel'/>
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
define("DS/EPSSchematicsUI/panels/EPSSchematicsUIBlockLibraryPanel", ["require", "exports", "DS/EPSSchematicsUI/panels/EPSSchematicsUISplittedPanel", "DS/EPSSchematicsUI/panels/views/EPSSchematicsUIBlockLibraryDocView", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIBlockLibraryController", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVBlockLibrary", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/typings/WebUX/controls/EPSWUXProgressBar", "DS/EPSSchematicsUI/typings/WebUX/controls/EPSWUXComboBox", "DS/EPSSchematicsUI/typings/WebUX/controls/EPSWUXTabBar", "DS/Controls/LineEditor", "DS/Controls/Expander", "DS/Controls/ButtonGroup", "DS/Controls/Button", "DS/EPSSchematicsUI/EPSSchematicsUIEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "css!DS/EPSSchematicsUI/css/panels/EPSSchematicsUIBlockLibraryPanel"], function (require, exports, UISplittedPanel, UIBlockLibraryDocView, UIBlockLibraryController, UIDGVBlockLibrary, UIFontIcon, UICommandType, UIDom, UINLS, WUXProgressBar, WUXComboBox, WUXTabBar, WUXLineEditor, WUXExpander, WUXButtonGroup, WUXButton, UIEnums, ModelEnums, TypeLibrary, BlockLibrary) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: BlockLibrary: Change color of text highlight!
    /**
     * This class defines a UI block library panel.
     * @class UIBlockLibraryPanel2
     * @alias module:DS/EPSSchematicsUI/panels/UIBlockLibraryPanel2
     * @extends UISplittedPanel
     * @private
     */
    var UIBlockLibraryPanel = /** @class */ (function (_super) {
        __extends(UIBlockLibraryPanel, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UIBlockLibraryPanel(editor) {
            var _this = _super.call(this, editor, {
                immersiveFrame: editor.getImmersiveFrame(),
                title: UINLS.get('panelTitleBlockLibrary'),
                width: 500,
                height: 900,
                currentDockArea: editor.getOptions().blockLibraryDockArea,
                className: ['sch-blocklibrary-panel'],
                icon: UIFontIcon.getWUXIconFromCommand(UICommandType.eOpenBlockLibrary)
            }) || this;
            _this._isDocumentationLoaded = false;
            _this._matchBlock = false;
            _this._matchCategory = false;
            _this._onSearchLineEditorValueChangeCB = _this._onSearchLineEditorValueChange.bind(_this);
            _this._onSearchComboBoxValueChangeCB = _this._onSearchComboBoxValueChange.bind(_this);
            _this._onButtonGroupEntityValueChangeCB = _this._onButtonGroupEntityValueChange.bind(_this);
            _this._onButtonGroupPortValueChangeCB = _this._onButtonGroupPortValueChange.bind(_this);
            _this._onButtonGroupPropertyValueChangeCB = _this._onButtonGroupPropertyValueChange.bind(_this);
            _this._onTabButtonClickCB = _this._onTabButtonClick.bind(_this);
            _this._editor = editor;
            _this._blockLibraryController = new UIBlockLibraryController(_this._editor);
            return _this;
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
         * Removes the panel.
         * @private
         */
        UIBlockLibraryPanel.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the panel!
            this._blockLibraryController.remove();
            this._blockLibraryController = undefined;
            this._matchBlock = undefined;
            this._matchCategory = undefined;
            this._onSearchLineEditorValueChangeCB = undefined;
            this._onSearchComboBoxValueChangeCB = undefined;
            this._onButtonGroupEntityValueChangeCB = undefined;
            this._onButtonGroupPortValueChangeCB = undefined;
            this._onButtonGroupPropertyValueChangeCB = undefined;
            this._onTabButtonClickCB = undefined;
        };
        /**
         * Gets the block library search line editor.
         * @public
         * @returns {WUXLineEditor} The block library search line editor.
         */
        UIBlockLibraryPanel.prototype.getSearchLineEditor = function () {
            return this._searchLineEditor;
        };
        /**
         * Gets the block library search combo box.
         * @public
         * @returns {WUXComboBox} The block library search combo box.
         */
        UIBlockLibraryPanel.prototype.getSearchComboBox = function () {
            return this._searchComboBox;
        };
        /**
         * Gets the block library data grid view.
         * @public
         * @returns {UIDGVBlockLibrary} The block library data grid view.
         */
        UIBlockLibraryPanel.prototype.getBlockLibraryDataGridView = function () {
            return this._dgvBlockLibrary;
        };
        /**
         * Gets the block library documentation view.
         * @public
         * @returns {UIBlockLibraryDocView} The block library documentation view.
         */
        UIBlockLibraryPanel.prototype.getBlockLibraryDocumentationView = function () {
            return this._docView;
        };
        /**
         * Gets the button group entity.
         * @public
         * @returns {WUXButtonGroup} The button group entity.
         */
        UIBlockLibraryPanel.prototype.getButtonGroupEntity = function () {
            return this._buttonGroupEntity;
        };
        /**
         * Gets the button group port.
         * @public
         * @returns {WUXButtonGroup} The button group port.
         */
        UIBlockLibraryPanel.prototype.getButtonGroupPort = function () {
            return this._buttonGroupPort;
        };
        /**
         * Gets the button group property.
         * @public
         * @returns {WUXButtonGroup} The button group property.
         */
        UIBlockLibraryPanel.prototype.getButtonGroupProperty = function () {
            return this._buttonGroupProperty;
        };
        UIBlockLibraryPanel.prototype.getTabBar = function () {
            return this._tabBar;
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
         * The callback on the panel close event.
         * @protected
         */
        UIBlockLibraryPanel.prototype._onClose = function () {
            this._removeProgressBar();
            if (this._docView) {
                this._docView.remove();
                this._docView = undefined;
            }
            if (this._dgvBlockLibrary) {
                this._dgvBlockLibrary.remove();
                this._dgvBlockLibrary = undefined;
            }
            if (this._searchLineEditor) {
                this._searchLineEditor.removeEventListener('uncommittedChange', this._onSearchLineEditorValueChangeCB, false);
                this._searchLineEditor.removeEventListener('change', this._onSearchLineEditorValueChangeCB, false);
                this._searchLineEditor = undefined;
            }
            if (this._searchComboBox) {
                this._searchComboBox.removeEventListener('uncommittedChange', this._onSearchComboBoxValueChangeCB, false);
                this._searchComboBox.removeEventListener('change', this._onSearchComboBoxValueChangeCB, false);
                this._searchComboBox = undefined;
            }
            if (this._buttonGroupEntity) {
                this._buttonGroupEntity.removeEventListener('change', this._onButtonGroupEntityValueChangeCB, false);
                this._buttonGroupEntity = undefined;
            }
            if (this._buttonGroupPort) {
                this._buttonGroupPort.removeEventListener('change', this._onButtonGroupPortValueChangeCB, false);
                this._buttonGroupPort = undefined;
            }
            if (this._buttonGroupProperty) {
                this._buttonGroupProperty.removeEventListener('change', this._onButtonGroupPropertyValueChangeCB, false);
                this._buttonGroupProperty = undefined;
            }
            if (this._tabBar) {
                this._tabBar.removeEventListener('tabButtonClick', this._onTabButtonClickCB);
                this._tabBar.remove();
                this._tabBar = undefined;
            }
            this._dgvContainer = undefined;
            this._isDocumentationLoaded = false;
            _super.prototype._onClose.call(this);
        };
        /**
         * The callback on the panel open event.
         * @protected
         */
        UIBlockLibraryPanel.prototype._onOpen = function () {
            var _this = this;
            BlockLibrary.loadDocumentation(function () {
                if (!_this._isDocumentationLoaded) {
                    _this._onDocumentationLoaded();
                }
                _super.prototype._onOpen.call(_this);
            });
        };
        /**
         * Creates the panel content.
         * @protected
         */
        UIBlockLibraryPanel.prototype._createContent = function () {
            this._createProgressBar();
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
         * Creates a panel progress bar.
         * @private
         */
        UIBlockLibraryPanel.prototype._createProgressBar = function () {
            if (!this._progressBar) {
                this._progressBar = new WUXProgressBar({
                    infiniteFlag: true,
                    displayStyle: 'lite',
                    shape: 'circular'
                }).inject(this.getContent());
            }
        };
        /**
         * Removes the panel progress bar.
         * @private
         */
        UIBlockLibraryPanel.prototype._removeProgressBar = function () {
            if (this._progressBar) {
                this._progressBar.remove();
                this._progressBar = undefined;
            }
        };
        /**
         * The callback on the documentation loaded event.
         * @private
         */
        UIBlockLibraryPanel.prototype._onDocumentationLoaded = function () {
            this._blockLibraryController.initializeController();
            this._removeProgressBar();
            this._createDockingElement();
            this._createSearchLineEditor();
            this._createSearchComboBox();
            this._createAdvancedSearchExpander();
            this._docView = new UIBlockLibraryDocView(this._editor, this._panelBottomContainer);
            this._createDGVBlockLibrary();
            this._onButtonGroupEntityValueChange();
            this._isDocumentationLoaded = true;
        };
        /**
         * Creates the search line editor.
         * @private
         */
        UIBlockLibraryPanel.prototype._createSearchLineEditor = function () {
            this._searchLineEditor = new WUXLineEditor({
                displayStyle: 'text',
                selectAllOnFocus: true,
                displayClearFieldButtonFlag: true,
                value: ''
            }).inject(this._panelTopContainer);
            this._searchLineEditor.addEventListener('uncommittedChange', this._onSearchLineEditorValueChangeCB, false);
            this._searchLineEditor.addEventListener('change', this._onSearchLineEditorValueChangeCB, false);
        };
        /**
         * The callback on the search line editor value change event.
         * @private
         * @param {IWUXControlEvent} event - The search line editor value change event.
         */
        UIBlockLibraryPanel.prototype._onSearchLineEditorValueChange = function (event) {
            this._searchDGVBlock(event.dsModel.valueToCommit);
        };
        /**
         * Creates the search combo box.
         * @private
         */
        UIBlockLibraryPanel.prototype._createSearchComboBox = function () {
            var valueTypeNames = TypeLibrary.getTypeNameList(this._editor.getGraphModel().getGraphContext(), ModelEnums.FTypeCategory.fAll);
            this._searchComboBox = new WUXComboBox({
                elementsList: valueTypeNames,
                currentValue: 'Integer',
                placeholder: UINLS.get('placeholderSelectValueType'),
                enableSearchFlag: true
            }).inject(this._panelTopContainer);
            this._searchComboBox.visibleFlag = false;
            this._searchComboBox.addEventListener('uncommittedChange', this._onSearchComboBoxValueChangeCB, false);
            this._searchComboBox.addEventListener('change', this._onSearchComboBoxValueChangeCB, false);
        };
        /**
         * The callback on the search combo box value change event.
         * @private
         * @param {IWUXControlEvent} event - The search combo box value change event.
         */
        UIBlockLibraryPanel.prototype._onSearchComboBoxValueChange = function (event) {
            this._searchDGVBlock(event.dsModel.value);
        };
        /**
         * Searches blocks into the data grid view.
         * @private
         * @param {string} valueToSearch - The value to search for.
         */
        UIBlockLibraryPanel.prototype._searchDGVBlock = function (valueToSearch) {
            if (valueToSearch !== '') {
                var blockUids = this._searchBlockLibrary(valueToSearch);
                this._blockLibraryController.match(blockUids, this._matchBlock, this._matchCategory);
            }
            else {
                this._blockLibraryController.unmatch();
            }
            var highlight = this._matchBlock || this._matchCategory;
            this._dgvBlockLibrary.getWUXDataGridView().setFindStr(highlight ? valueToSearch : '', false);
        };
        /**
         * Search the block library for the corresponding blocks.
         * @private
         * @param {string} valueToSearch - The value to search for.
         * @returns {Block[]} The list of blocks.
         */
        UIBlockLibraryPanel.prototype._searchBlockLibrary = function (valueToSearch) {
            var blocks = [];
            this._matchBlock = false;
            this._matchCategory = false;
            if (valueToSearch !== '') {
                var entity = this._buttonGroupEntity.value[0];
                var port = this._buttonGroupPort.value[0];
                var property = this._buttonGroupProperty.value[0];
                var regExp = new RegExp(valueToSearch, 'i');
                if (entity === UIEnums.EBlockLibrarySearchFilter.eBlock) {
                    if (property === UIEnums.EBlockLibrarySearchFilter.eName) {
                        this._matchBlock = true;
                        blocks = BlockLibrary.searchBlockByName(regExp);
                    }
                    else if (property === UIEnums.EBlockLibrarySearchFilter.eSummary) {
                        blocks = BlockLibrary.searchBlockBySummary(regExp);
                    }
                    else if (property === UIEnums.EBlockLibrarySearchFilter.eDescription) {
                        blocks = BlockLibrary.searchBlockByDescription(regExp);
                    }
                    else if (property === UIEnums.EBlockLibrarySearchFilter.eCategory) {
                        this._matchCategory = true;
                        blocks = BlockLibrary.searchBlockByCategoryFullName(regExp);
                    }
                }
                else {
                    if (entity === UIEnums.EBlockLibrarySearchFilter.eSetting) {
                        var settings = [];
                        if (property === UIEnums.EBlockLibrarySearchFilter.eName) {
                            settings = BlockLibrary.searchSettingByName(regExp);
                        }
                        else if (property === UIEnums.EBlockLibrarySearchFilter.eDescription) {
                            settings = BlockLibrary.searchSettingByDescription(regExp);
                        }
                        else if (property === UIEnums.EBlockLibrarySearchFilter.eValueType) {
                            settings = BlockLibrary.searchSettingByValueType(RegExp('^' + valueToSearch + '$'));
                        }
                        blocks = settings.map(function (setting) { return setting.block; });
                    }
                    else {
                        var items = [];
                        if (entity === UIEnums.EBlockLibrarySearchFilter.eDataPort) {
                            if (property === UIEnums.EBlockLibrarySearchFilter.eName) {
                                items = BlockLibrary.searchDataPortByName(regExp);
                            }
                            else if (property === UIEnums.EBlockLibrarySearchFilter.eDescription) {
                                items = BlockLibrary.searchDataPortByDescription(regExp);
                            }
                            else if (property === UIEnums.EBlockLibrarySearchFilter.eValueType) {
                                items = BlockLibrary.searchDataPortByValueType(RegExp('^' + valueToSearch + '$'));
                            }
                        }
                        else if (entity === UIEnums.EBlockLibrarySearchFilter.eControlPort) {
                            var filterControlPort = function (controlPort) {
                                return controlPort.getType() === ModelEnums.EControlPortType.eInput ||
                                    controlPort.getType() === ModelEnums.EControlPortType.eOutput;
                            };
                            if (property === UIEnums.EBlockLibrarySearchFilter.eName) {
                                items = BlockLibrary.searchControlPortByName(regExp).filter(filterControlPort);
                            }
                            else if (property === UIEnums.EBlockLibrarySearchFilter.eDescription) {
                                items = BlockLibrary.searchControlPortByDescription(regExp).filter(filterControlPort);
                            }
                        }
                        else if (entity === UIEnums.EBlockLibrarySearchFilter.eEventPort) {
                            var filterEventPort = function (eventPort) {
                                return eventPort.getType() === ModelEnums.EControlPortType.eInputEvent ||
                                    eventPort.getType() === ModelEnums.EControlPortType.eOutputEvent;
                            };
                            if (property === UIEnums.EBlockLibrarySearchFilter.eName) {
                                items = BlockLibrary.searchControlPortByName(regExp).filter(filterEventPort);
                            }
                            else if (property === UIEnums.EBlockLibrarySearchFilter.eDescription) {
                                items = BlockLibrary.searchControlPortByDescription(regExp).filter(filterEventPort);
                            }
                            // TODO: Handle search event port by event type when supported by model!
                        }
                        // Filter the data or control ports with specified portType
                        if (port === UIEnums.EBlockLibrarySearchFilter.eInput || port === UIEnums.EBlockLibrarySearchFilter.eOutput) {
                            var isInputPort = port === UIEnums.EBlockLibrarySearchFilter.eInput;
                            var portType_1;
                            if (entity === UIEnums.EBlockLibrarySearchFilter.eDataPort) {
                                portType_1 = isInputPort ? ModelEnums.EDataPortType.eInput : ModelEnums.EDataPortType.eOutput;
                                items = items.filter(function (dp) { return dp.getType() === portType_1; });
                            }
                            else if (entity === UIEnums.EBlockLibrarySearchFilter.eControlPort) {
                                portType_1 = isInputPort ? ModelEnums.EControlPortType.eInput : ModelEnums.EControlPortType.eOutput;
                                items = items.filter(function (cp) { return cp.getType() === portType_1; });
                            }
                            else if (entity === UIEnums.EBlockLibrarySearchFilter.eEventPort) {
                                portType_1 = isInputPort ? ModelEnums.EControlPortType.eInputEvent : ModelEnums.EControlPortType.eOutputEvent;
                                items = items.filter(function (ep) { return ep.getType() === portType_1; });
                            }
                        }
                        blocks = items.map(function (item) { return item.block; });
                    }
                }
            }
            return blocks;
        };
        /**
         * Creates the data grid view block library.
         * @private
         */
        UIBlockLibraryPanel.prototype._createDGVBlockLibrary = function () {
            this._dgvContainer = UIDom.createElement('div', { className: 'sch-panel-dgv-container', parent: this._panelTopContainer });
            // TODO: Display tooltip on tabs!
            this._tabBar = new WUXTabBar({ displayStyle: 'strip' }).inject(this._dgvContainer);
            this._tabBar.add({ /*label: 'Library',*/ icon: UIFontIcon.getWUX3DSIconDefinition('library-books'), isSelected: true });
            this._tabBar.add({ /*label: 'Favorites',*/ icon: UIFontIcon.getWUX3DSIconDefinition('favorite-on'), isSelected: false });
            this._tabBar.addEventListener('tabButtonClick', this._onTabButtonClickCB);
            this._dgvBlockLibrary = new UIDGVBlockLibrary(this._editor, this._blockLibraryController, this._docView);
            this._dgvContainer.appendChild(this._dgvBlockLibrary.getElement());
        };
        /**
         * The callback on the tab button click event.
         * @private
         * @param {IWUXControlEvent} event - The tab bar control button click event.
         */
        UIBlockLibraryPanel.prototype._onTabButtonClick = function (event) {
            var treeDocument = this._dgvBlockLibrary.getTreeDocument();
            var tabValue = event.options.value;
            if (tabValue === 0) {
                treeDocument.setFilterModel({});
                treeDocument.collapseAll();
            }
            else {
                treeDocument.setFilterModel({
                    isFavorite: {
                        filterId: 'set',
                        filterModel: [true]
                    }
                });
                treeDocument.expandAll();
            }
        };
        /**
         * Creates the advanced search expander.
         * @private
         */
        UIBlockLibraryPanel.prototype._createAdvancedSearchExpander = function () {
            this._advancedSearchContainer = UIDom.createElement('div', {
                className: 'sch-advanced-search-container',
                parent: this._panelTopContainer
            });
            this._advancedSearchContent = UIDom.createElement('div', { className: 'sch-advanced-search-content' });
            this._advancedSearchExpander = new WUXExpander({
                header: UINLS.get('sectionAdvancedSearch'),
                body: this._advancedSearchContent,
                style: 'styled',
                allowUnsafeHTMLHeader: false
            }).inject(this._advancedSearchContainer);
            // Add entity button group
            this._buttonGroupEntity = new WUXButtonGroup().inject(this._advancedSearchContent);
            this._buttonGroupEntity.addChild(new WUXButton({
                type: 'radio', label: UINLS.get(UIEnums.EBlockLibrarySearchFilter.eBlock), value: UIEnums.EBlockLibrarySearchFilter.eBlock,
                emphasize: 'info', checkFlag: true, allowUnsafeHTMLLabel: false
            }));
            this._buttonGroupEntity.addChild(new WUXButton({
                type: 'radio', label: UINLS.get(UIEnums.EBlockLibrarySearchFilter.eDataPort), value: UIEnums.EBlockLibrarySearchFilter.eDataPort,
                emphasize: 'info', allowUnsafeHTMLLabel: false
            }));
            this._buttonGroupEntity.addChild(new WUXButton({
                type: 'radio', label: UINLS.get(UIEnums.EBlockLibrarySearchFilter.eControlPort), value: UIEnums.EBlockLibrarySearchFilter.eControlPort,
                emphasize: 'info', allowUnsafeHTMLLabel: false
            }));
            this._buttonGroupEntity.addChild(new WUXButton({
                type: 'radio', label: UINLS.get(UIEnums.EBlockLibrarySearchFilter.eEventPort), value: UIEnums.EBlockLibrarySearchFilter.eEventPort,
                emphasize: 'info', allowUnsafeHTMLLabel: false
            }));
            this._buttonGroupEntity.addChild(new WUXButton({
                type: 'radio', label: UINLS.get(UIEnums.EBlockLibrarySearchFilter.eSetting), value: UIEnums.EBlockLibrarySearchFilter.eSetting,
                emphasize: 'info', allowUnsafeHTMLLabel: false
            }));
            this._buttonGroupEntity.addEventListener('change', this._onButtonGroupEntityValueChangeCB, false);
            // Add port button group
            this._buttonGroupPort = new WUXButtonGroup().inject(this._advancedSearchContent);
            this._buttonGroupPort.visibleFlag = false;
            this._buttonGroupPort.addChild(new WUXButton({
                type: 'radio', label: UINLS.get(UIEnums.EBlockLibrarySearchFilter.eInputOrOutput), value: UIEnums.EBlockLibrarySearchFilter.eInputOrOutput,
                emphasize: 'info', checkFlag: true, allowUnsafeHTMLLabel: false
            }));
            this._buttonGroupPort.addChild(new WUXButton({
                type: 'radio', label: UINLS.get(UIEnums.EBlockLibrarySearchFilter.eInput), value: UIEnums.EBlockLibrarySearchFilter.eInput,
                emphasize: 'info', allowUnsafeHTMLLabel: false
            }));
            this._buttonGroupPort.addChild(new WUXButton({
                type: 'radio', label: UINLS.get(UIEnums.EBlockLibrarySearchFilter.eOutput), value: UIEnums.EBlockLibrarySearchFilter.eOutput,
                emphasize: 'info', allowUnsafeHTMLLabel: false
            }));
            this._buttonGroupPort.addEventListener('change', this._onButtonGroupPortValueChangeCB, false);
            // Add property button group
            this._buttonGroupProperty = new WUXButtonGroup().inject(this._advancedSearchContent);
            this._buttonGroupProperty.addEventListener('change', this._onButtonGroupPropertyValueChangeCB, false);
        };
        /**
         * The callback on the button group entity value change event.
         * @private
         */
        UIBlockLibraryPanel.prototype._onButtonGroupEntityValueChange = function () {
            var entity = this._buttonGroupEntity.value[0];
            if (entity === UIEnums.EBlockLibrarySearchFilter.eBlock) {
                this._buttonGroupPort.visibleFlag = false;
                this._updateButtonGroupProperties([
                    UIEnums.EBlockLibrarySearchFilter.eName,
                    UIEnums.EBlockLibrarySearchFilter.eSummary,
                    UIEnums.EBlockLibrarySearchFilter.eDescription,
                    UIEnums.EBlockLibrarySearchFilter.eCategory
                ]);
            }
            else if (entity === UIEnums.EBlockLibrarySearchFilter.eDataPort) {
                this._buttonGroupPort.visibleFlag = true;
                this._updateButtonGroupProperties([
                    UIEnums.EBlockLibrarySearchFilter.eName,
                    UIEnums.EBlockLibrarySearchFilter.eDescription,
                    UIEnums.EBlockLibrarySearchFilter.eValueType
                ]);
            }
            else if (entity === UIEnums.EBlockLibrarySearchFilter.eControlPort || entity === UIEnums.EBlockLibrarySearchFilter.eEventPort) {
                this._buttonGroupPort.visibleFlag = true;
                this._updateButtonGroupProperties([
                    UIEnums.EBlockLibrarySearchFilter.eName,
                    UIEnums.EBlockLibrarySearchFilter.eDescription
                ]);
            }
            else if (entity === UIEnums.EBlockLibrarySearchFilter.eSetting) {
                this._buttonGroupPort.visibleFlag = false;
                this._updateButtonGroupProperties([
                    UIEnums.EBlockLibrarySearchFilter.eName,
                    UIEnums.EBlockLibrarySearchFilter.eDescription,
                    UIEnums.EBlockLibrarySearchFilter.eValueType
                ]);
            }
            this._updateSearchControlPlaceholder();
            this._searchDGVBlock(this._searchLineEditor.value);
        };
        /**
         * The callback on the button group port value change event.
         * @private
         */
        UIBlockLibraryPanel.prototype._onButtonGroupPortValueChange = function () {
            var property = this._buttonGroupProperty.value[0];
            var isValueType = property === UIEnums.EBlockLibrarySearchFilter.eValueType;
            var valueToSearch;
            if (isValueType) {
                valueToSearch = this._searchComboBox.value;
            }
            else {
                valueToSearch = this._searchLineEditor.value;
            }
            this._updateSearchControlPlaceholder();
            this._searchDGVBlock(valueToSearch);
        };
        /**
         * The callback on the button group property value change event.
         * @private
         */
        UIBlockLibraryPanel.prototype._onButtonGroupPropertyValueChange = function () {
            var property = this._buttonGroupProperty.value[0];
            var isValueType = property === UIEnums.EBlockLibrarySearchFilter.eValueType;
            var valueToSearch;
            if (isValueType) {
                this._searchLineEditor.visibleFlag = false;
                this._searchComboBox.visibleFlag = true;
                valueToSearch = this._searchComboBox.value;
            }
            else {
                this._searchLineEditor.visibleFlag = true;
                this._searchComboBox.visibleFlag = false;
                valueToSearch = this._searchLineEditor.value;
            }
            this._updateSearchControlPlaceholder();
            this._searchDGVBlock(valueToSearch);
        };
        /**
         * Clears the button group property children.
         * @private
         */
        UIBlockLibraryPanel.prototype._clearButtonGroupProperties = function () {
            if (this._buttonGroupProperty !== undefined) {
                while (this._buttonGroupProperty.getButtonCount() > 0) {
                    this._buttonGroupProperty.removeChild(this._buttonGroupProperty.getButton(0));
                }
            }
        };
        /**
         * Updates the button group properties.
         * @private
         * @param {string[]} properties - The list of properties.
         */
        UIBlockLibraryPanel.prototype._updateButtonGroupProperties = function (properties) {
            var _this = this;
            this._clearButtonGroupProperties();
            properties.forEach(function (property, index) {
                _this._buttonGroupProperty.addChild(new WUXButton({
                    type: 'radio', emphasize: 'info', label: UINLS.get(property),
                    value: property, checkFlag: index === 0, allowUnsafeHTMLLabel: false
                }));
            });
        };
        /**
         * Updates the search control placeholder.
         * @private
         */
        UIBlockLibraryPanel.prototype._updateSearchControlPlaceholder = function () {
            var entity = this._buttonGroupEntity.value[0];
            var port = this._buttonGroupPort.value[0];
            var property = this._buttonGroupProperty.value[0];
            var portName = (entity === UIEnums.EBlockLibrarySearchFilter.eDataPort ||
                entity === UIEnums.EBlockLibrarySearchFilter.eControlPort ||
                entity === UIEnums.EBlockLibrarySearchFilter.eEventPort) ? UINLS.get(port) + ' > ' : '';
            this._searchLineEditor.placeholder = UINLS.get('placeholderSearch') + ': ' + UINLS.get(entity) + ' > ' + portName + UINLS.get(property);
        };
        return UIBlockLibraryPanel;
    }(UISplittedPanel));
    return UIBlockLibraryPanel;
});
