/// <amd-module name='DS/EPSSchematicsUI/panels/EPSSchematicsUITypeLibraryPanel'/>
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
define("DS/EPSSchematicsUI/panels/EPSSchematicsUITypeLibraryPanel", ["require", "exports", "DS/EPSSchematicsUI/panels/EPSSchematicsUISplittedPanel", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTypeLibrary", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVCustomType", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUICustomTypeNameDialog", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/Controls/Button", "DS/EPSSchematicsUI/typings/WebUX/controls/EPSWUXFind", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "css!DS/EPSSchematicsUI/css/panels/EPSSchematicsUITypeLibraryPanel"], function (require, exports, UISplittedPanel, UIDom, UIFontIcon, UICommandType, UIDGVTypeLibrary, UIDGVCustomType, UICustomTypeNameDialog, TypeLibrary, Events, ModelEnums, WUXButton, WUXFind, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI type library panel.
     * @class UITypeLibraryPanel
     * @alias module:DS/EPSSchematicsUI/panels/EPSSchematicsUITypeLibraryPanel
     * @extends UISplittedPanel
     * @private
     */
    var UITypeLibraryPanel = /** @class */ (function (_super) {
        __extends(UITypeLibraryPanel, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UITypeLibraryPanel(editor) {
            var _this = _super.call(this, editor, {
                immersiveFrame: editor.getImmersiveFrame(),
                title: UINLS.get('panelTitleTypeLibrary'),
                currentDockArea: editor.getOptions().typeLibraryDockArea,
                width: 420,
                height: 600,
                className: ['sch-typelibrary-panel'],
                icon: UIFontIcon.getWUXIconFromCommand(UICommandType.eOpenTypeLibraryPanel)
            }) || this;
            _this._onTypeLibraryUnregisterLocalCustomCB = _this._onTypeLibraryUnregisterLocalCustom.bind(_this);
            _this._typeLibraryController = _this._editor.getTypeLibraryController();
            _this._treeDocument = _this._typeLibraryController.getTreeDocument();
            _this._createTypeDialog = new UICustomTypeNameDialog(_this._editor, function (typeName) { _this.selectAndEditType(typeName); });
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
        UITypeLibraryPanel.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the panel!
            this._createTypeDialog.remove();
            this._typeLibraryController = undefined;
            this._treeDocument = undefined;
            this._createTypeDialog = undefined;
            this._searchControl = undefined;
            this._onTypeLibraryUnregisterLocalCustomCB = undefined;
        };
        /**
         * Selects the provided custom type name.
         * @public
         * @param {string} typeName - The name of the custom type to select.
         */
        UITypeLibraryPanel.prototype.selectType = function (typeName) {
            if (typeName !== undefined && typeName !== '') {
                this.ensureVisible();
                var baseTypeName = TypeLibrary.getArrayValueTypeName(typeName) || typeName;
                var nodeModel = this._typeLibraryController.getTreeNodeModelFromTypeName(baseTypeName, true);
                if (nodeModel !== undefined) {
                    this._selectModelAndUpdateView(nodeModel);
                    this._displayTypeEditor(baseTypeName, false);
                }
            }
        };
        /**
         * Selects and edit the given custom type name.
         * @public
         * @param {string} typeName - The name of the custom type to select and edit.
         */
        UITypeLibraryPanel.prototype.selectAndEditType = function (typeName) {
            if (typeName !== undefined && typeName !== '') {
                this.ensureVisible();
                var nodeModel = this._typeLibraryController.getTreeNodeModelFromTypeName(typeName, false);
                if (nodeModel !== undefined) {
                    this._selectModelAndUpdateView(nodeModel);
                    this._displayTypeEditor(typeName, true);
                }
            }
        };
        /**
         * Opens the create type dialog.
         * @public
         * @param {DataPort} [dataPort] - The data port model to update.
         */
        UITypeLibraryPanel.prototype.openCreateTypeDialog = function (dataPort) {
            this._createTypeDialog.open(dataPort);
        };
        /**
         * Gets the type library data grid view.
         * @public
         * @returns {UIDGVTypeLibrary} The type library data grid view.
         */
        UITypeLibraryPanel.prototype.getTypeLibraryDataGridView = function () {
            return this._dgvTypeLibrary;
        };
        /**
         * Gets the data grid view custom type.
         * @public
         * @returns {UITreeListCustomType} The data grid view custom type.
         */
        UITypeLibraryPanel.prototype.getDataGridViewCustomType = function () {
            return this._dgvCustomType;
        };
        /**
         * Gets the custom type name dialog.
         * @public
         * @returns {UICustomTypeNameDialog} The custom type name dialog.
         */
        UITypeLibraryPanel.prototype.getCustomTypeNameDialog = function () {
            return this._createTypeDialog;
        };
        /**
         * Gets the create button.
         * @public
         * @returns {WUXButton} The create button.
         */
        UITypeLibraryPanel.prototype.getCreateButton = function () {
            return this._createButton;
        };
        /**
         * Gets the apply button.
         * @public
         * @returns {WUXButton} The apply button.
         */
        UITypeLibraryPanel.prototype.getApplyButton = function () {
            return this._applyButton;
        };
        /**
         * Gets the edit button.
         * @public
         * @returns {WUXButton} The edit button.
         */
        UITypeLibraryPanel.prototype.getEditButton = function () {
            return this._editButton;
        };
        /**
         * Gets the WUX find search control.
         * @public
         * @returns {WUXControl} The WUX find search control.
         */
        UITypeLibraryPanel.prototype.getSearchControl = function () {
            return this._searchControl;
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
        UITypeLibraryPanel.prototype._onClose = function () {
            this._removeTypeEditor();
            TypeLibrary.removeListener(Events.TypeLibraryUnregisterLocalCustomEvent, this._onTypeLibraryUnregisterLocalCustomCB);
            this._treeDocument.getXSO().unsubscribe(this._onChangeEventToken);
            this._onChangeEventToken = undefined;
            if (this._dgvTypeLibrary !== undefined) {
                this._dgvTypeLibrary.remove();
                this._dgvTypeLibrary = undefined;
            }
            if (this._searchControl) {
                this._searchControl.destroy();
                this._searchControl = undefined;
            }
            this._controlsContainer = undefined;
            this._dataGridViewContainer = undefined;
            this._createButton = undefined;
            this._bottomHeader = undefined;
            this._bottomContent = undefined;
            _super.prototype._onClose.call(this);
        };
        /**
         * The callback on the panel open event.
         * @protected
         */
        UITypeLibraryPanel.prototype._onOpen = function () {
            _super.prototype._onOpen.call(this);
            this._typeLibraryController.updateOccurenceCount();
        };
        /**
         * Creates the panel content.
         * @protected
         * @abstract
         */
        UITypeLibraryPanel.prototype._createContent = function () {
            this._createDockingElement();
            this._createTopContainer();
            this._createBottomContainer();
            TypeLibrary.addListener(Events.TypeLibraryUnregisterLocalCustomEvent, this._onTypeLibraryUnregisterLocalCustomCB);
            this._onChangeEventToken = this._treeDocument.getXSO().onChange(this._onSelectionUpdate.bind(this));
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
         * Creates the top container.
         * @private
         */
        UITypeLibraryPanel.prototype._createTopContainer = function () {
            var _this = this;
            this._controlsContainer = UIDom.createElement('div', {
                className: 'sch-panel-controls-container',
                parent: this._panelTopContainer
            });
            this._dataGridViewContainer = UIDom.createElement('div', {
                className: 'sch-panel-dgv-container',
                parent: this._panelTopContainer
            });
            this._dgvTypeLibrary = new UIDGVTypeLibrary(this._editor, this._typeLibraryController);
            this._dataGridViewContainer.appendChild(this._dgvTypeLibrary.getElement());
            this._createButton = new WUXButton({
                label: UINLS.get('shortHelpHistoryCreateCustomType'),
                emphasize: 'primary',
                icon: UIFontIcon.getWUXFAIconDefinition('plus'),
                onClick: function () { return _this.openCreateTypeDialog(); }
            }).inject(this._controlsContainer);
            var datagridview = this._dgvTypeLibrary.getWUXDataGridView();
            this._searchControl = new WUXFind({
                placeholder: 'Search type',
                displayClose: false,
                displayMatchCaseToggle: false,
                displayNavigationButtons: false,
                relatedWidget: datagridview,
                onFindRequest: function () {
                    var typeName = _this._searchControl.findStr;
                    _this._searchControl.displayNavigationButtons = typeName !== '';
                    _this._searchControl.elements.findEditor.displayClearFieldButtonFlag = typeName !== '';
                    datagridview.showMatchingCellBackgroundFlag = false;
                    datagridview.prepareUpdateView();
                    _this._treeDocument.prepareUpdate();
                    _this._treeDocument.getFilterManager().setPropertyFilterModel('typeName', {
                        filterId: 'stringRegexp',
                        filterModel: {
                            condition1: { type: 'contains', filter: typeName }
                        }
                    });
                    _this._treeDocument.pushUpdate();
                    datagridview.setFindStr(typeName, false);
                    datagridview.pushUpdateView();
                },
                onFindPreviousResult: datagridview.goToPreviousMatchingCell,
                onFindNextResult: datagridview.goToNextMatchingCell,
                onFindClose: datagridview.closeFind
            }).inject(this._controlsContainer);
        };
        /**
         * Creates the bottom container.
         * @private
         */
        UITypeLibraryPanel.prototype._createBottomContainer = function () {
            this._bottomHeader = UIDom.createElement('div', {
                className: 'sch-bottom-header',
                parent: this._panelBottomContainer,
                textContent: UINLS.get('sectionTypeDocumentation')
            });
            this._bottomContent = UIDom.createElement('div', {
                className: 'sch-bottom-content',
                parent: this._panelBottomContainer
            });
        };
        /**
         * Displays the type editor.
         * @private
         * @param {string} typeName - The name of the type.
         * @param {boolean} [editionEnabled=false] - True to enable the type edition else false.
         */
        UITypeLibraryPanel.prototype._displayTypeEditor = function (typeName, editionEnabled) {
            var _this = this;
            if (editionEnabled === void 0) { editionEnabled = false; }
            this._removeTypeEditor();
            this._typeName = typeName;
            this._bottomContentTop = UIDom.createElement('div', {
                className: 'sch-bottom-topcontent',
                parent: this._bottomContent
            });
            this._bottomContentBottom = UIDom.createElement('div', {
                className: 'sch-bottom-bottomcontent',
                parent: this._bottomContent
            });
            this._typeTitle = UIDom.createElement('div', {
                className: 'sch-type-title',
                parent: this._bottomContentTop,
                textContent: 'Type ' + this._typeName
            });
            this._buttonContainer = UIDom.createElement('div', {
                className: 'sch-panel-button-container',
                parent: this._bottomContentTop
            });
            var graphContext = this._editor._getViewer().getMainGraph().getModel().getGraphContext();
            var isTypeEditable = TypeLibrary.hasLocalCustomType(graphContext, typeName, ModelEnums.FTypeCategory.fAll);
            if (isTypeEditable) {
                if (!editionEnabled) {
                    this._editButton = new WUXButton({
                        label: UINLS.get('shortHelpEditType'),
                        emphasize: 'primary',
                        icon: UIFontIcon.getWUXFAIconDefinition('pencil'),
                        onClick: function () { return _this._displayTypeEditor(_this._typeName, true); }
                    }).inject(this._buttonContainer);
                }
                else {
                    this._applyButton = new WUXButton({
                        label: UINLS.get('shortHelpApplyType'),
                        emphasize: 'primary',
                        icon: UIFontIcon.getWUXFAIconDefinition('check-circle'),
                        onClick: function () {
                            _this._dgvCustomType.updateTypeLibraryCustomType();
                            _this._displayTypeEditor(_this._typeName, false);
                            _this._editor.getHistoryController().registerEditCustomTypeAction();
                        }
                    }).inject(this._buttonContainer);
                    this._cancelButton = new WUXButton({
                        label: UINLS.get('shortHelpCancelType'),
                        emphasize: 'secondary',
                        icon: UIFontIcon.getWUXFAIconDefinition('times-circle'),
                        onClick: function () { return _this._displayTypeEditor(_this._typeName, false); }
                    }).inject(this._buttonContainer);
                }
            }
            var graphModel = this._editor.getGraphModel();
            this._dgvCustomType = new UIDGVCustomType(graphModel, typeName, isTypeEditable && editionEnabled);
            this._bottomContentBottom.appendChild(this._dgvCustomType.getElement());
        };
        /**
         * Removes the type editor.
         * @private
         */
        UITypeLibraryPanel.prototype._removeTypeEditor = function () {
            if (this._bottomContent !== undefined) {
                if (this._dgvCustomType !== undefined) {
                    this._dgvCustomType.remove();
                    this._dgvCustomType = undefined;
                }
                while (this._bottomContent.firstChild) {
                    this._bottomContent.removeChild(this._bottomContent.firstChild);
                }
                this._typeName = undefined;
                this._bottomContentTop = undefined;
                this._bottomContentBottom = undefined;
                this._typeTitle = undefined;
                this._buttonContainer = undefined;
                this._editButton = undefined;
                this._applyButton = undefined;
                this._cancelButton = undefined;
            }
        };
        /**
         * The callback on the type library unregister local custom event.
         * @private
         * @param {Events.TypeLibraryUnregisterLocalCustomEvent} event - The type library unregister local custom event.
         */
        UITypeLibraryPanel.prototype._onTypeLibraryUnregisterLocalCustom = function () {
            this._removeTypeEditor();
        };
        /**
         * The callback on the tree document selection update event.
         * @private
         */
        UITypeLibraryPanel.prototype._onSelectionUpdate = function () {
            var selelectedNodeModel = this._treeDocument.getSelectedNodes()[0];
            if (selelectedNodeModel !== undefined && !selelectedNodeModel.isRoot()) {
                var typeName = selelectedNodeModel.getLabel();
                this._displayTypeEditor(typeName, false);
            }
            else {
                this._removeTypeEditor();
            }
        };
        /**
         * Selects the provided node and updates the data grid view.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The tree node model.
         */
        UITypeLibraryPanel.prototype._selectModelAndUpdateView = function (nodeModel) {
            var _this = this;
            this._typeLibraryController.getTreeDocument().unselectAll();
            nodeModel.getParent().expand();
            nodeModel.select();
            if (this.isOpen()) {
                this._dgvTypeLibrary.scrollToNode(nodeModel);
            }
            else {
                this.open();
                this._dgvTypeLibrary.registerPostUpdateViewAction(function () { return _this._dgvTypeLibrary.scrollToNode(nodeModel); });
            }
        };
        return UITypeLibraryPanel;
    }(UISplittedPanel));
    return UITypeLibraryPanel;
});
