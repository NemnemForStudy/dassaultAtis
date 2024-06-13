/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBlockDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBlockDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUITemporaryModelDialog", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/typings/WebUX/controls/EPSWUXTab", "DS/Controls/LineEditor", "DS/EPSSchematicsUI/typings/WebUX/controls/EPSWUXComboBox", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVControlPort", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDataPort", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSettings", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUIBlockDialog"], function (require, exports, UITemporaryModelDialog, UIDom, UIFontIcon, UITools, UINLS, WUXTab, WUXLineEditor, WUXComboBox, Events, UIDGVControlPort, UIDGVDataPort, UIDGVSettings, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI block dialog.
     * @class UIBlockDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBlockDialog
     * @extends UITemporaryModelDialog
     * @private
     */
    var UIBlockDialog = /** @class */ (function (_super) {
        __extends(UIBlockDialog, _super);
        /**
         * @constructor
         * @param {UIBlock} block - The UI block.
         * @param {IWUXDialogOptions} [options] - The dialog options.
         */
        function UIBlockDialog(block, options) {
            var _this = _super.call(this, block.getEditor(), block.getModel(), UITools.mergeObject({
                className: ['sch-block-dialog'],
                immersiveFrame: block.getEditor().getImmersiveFrame(),
                width: 700, minWidth: 400, height: 500,
                icon: 'cog'
            }, options, true)) || this;
            _this._updateControlPortsTabLabelCB = _this._updateControlPortsTabLabel.bind(_this);
            _this._updateDataPortsTabLabelCB = _this._updateDataPortsTabLabel.bind(_this);
            _this._updateSettingsTabLabelCB = _this._updateSettingsTabLabel.bind(_this);
            _this._block = block;
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
         * Removes the dialog.
         * @public
         */
        UIBlockDialog.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the dialog!
            this._block = undefined;
            this._blockNameLineEditor = undefined;
            this._blockDescriptionLineEditor = undefined;
            this._nodeIdSelectorComboBox = undefined;
            this._tab = undefined;
            this._controlPortsTab = undefined;
            this._dataPortsTab = undefined;
            this._settingsTab = undefined;
            this._dgvControlPorts = undefined;
            this._dgvDataPorts = undefined;
            this._dgvSettings = undefined;
            this._updateControlPortsTabLabelCB = undefined;
            this._updateDataPortsTabLabelCB = undefined;
            this._updateSettingsTabLabelCB = undefined;
        };
        /**
         * Gets the WUX tab.
         * @public
         * @returns {WUXTab} The WUX tab.
         */
        UIBlockDialog.prototype.getTab = function () {
            return this._tab;
        };
        /**
         * Gets the data grid view data port.
         * @public
         * @returns {UIDGVDataPort} The data grid view data port.
         */
        UIBlockDialog.prototype.getDataGridViewDataPorts = function () {
            return this._dgvDataPorts;
        };
        /**
         * Gets the data grid view control ports.
         * @public
         * @returns {UIDGVControlPort} The data grid view control ports.
         */
        UIBlockDialog.prototype.getDataGridViewControlPorts = function () {
            return this._dgvControlPorts;
        };
        /**
         * Gets the data grid view settings.
         * @public
         * @returns {UIDGVSettings} The data grid view settings.
         */
        UIBlockDialog.prototype.getDataGridViewSettings = function () {
            return this._dgvSettings;
        };
        /**
         * Gets the nodeId selector comobobox.
         * @public
         * @returns {WUXComboBox} - The nodeId selector comobobox.
         */
        UIBlockDialog.prototype.getNodeIdSelectorCombobox = function () {
            return this._nodeIdSelectorComboBox;
        };
        /**
         * Gets the block name WUX line editor.
         * @public
         * @returns {WUXLineEditor} The block name WUX line editor.
         */
        UIBlockDialog.prototype.getBlockNameLineEditor = function () {
            return this._blockNameLineEditor;
        };
        /**
         * Gets the block description WUX line editor.
         * @public
         * @returns {WUXLineEditor} The block description WUX line editor.
         */
        UIBlockDialog.prototype.getBlockDescriptionLineEditor = function () {
            return this._blockDescriptionLineEditor;
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
         * Computes the dialog title.
         * @protected
         * @returns {string} The dialog title.
         */
        UIBlockDialog.prototype._computeTitle = function () {
            return UINLS.get('dialogTitleBlockConfiguration', { blockName: this._block.getModel().getName() });
        };
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UIBlockDialog.prototype._onClose = function () {
            this._blockNameLineEditor = undefined;
            this._blockDescriptionLineEditor = undefined;
            this._nodeIdSelectorComboBox = undefined;
            this._tab = undefined;
            this._controlPortsTab = undefined;
            this._dataPortsTab = undefined;
            this._settingsTab = undefined;
            if (this._dgvControlPorts) {
                this._dgvControlPorts.remove();
                this._dgvControlPorts = undefined;
            }
            if (this._dgvDataPorts) {
                this._dgvDataPorts.remove();
                this._dgvDataPorts = undefined;
            }
            if (this._dgvSettings) {
                this._dgvSettings.remove();
                this._dgvSettings = undefined;
            }
            if (this._tmpModel) {
                this._tmpModel.removeListener(Events.ControlPortAddEvent, this._updateControlPortsTabLabelCB);
                this._tmpModel.removeListener(Events.ControlPortRemoveEvent, this._updateControlPortsTabLabelCB);
                this._tmpModel.removeListener(Events.DataPortAddEvent, this._updateDataPortsTabLabelCB);
                this._tmpModel.removeListener(Events.DataPortRemoveEvent, this._updateDataPortsTabLabelCB);
                this._tmpModel.removeListener(Events.SettingAddEvent, this._updateSettingsTabLabelCB);
                this._tmpModel.removeListener(Events.SettingRemoveEvent, this._updateSettingsTabLabelCB);
            }
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIBlockDialog.prototype._onCreateContent = function () {
            _super.prototype._onCreateContent.call(this);
            this._dialog.title = this._computeTitle();
            this._createNameLineEditor();
            this._createDescriptionLineEditor();
            this._createNodeIdSelectorComboBox();
            this._createTab();
            this._tmpModel.addListener(Events.ControlPortAddEvent, this._updateControlPortsTabLabelCB);
            this._tmpModel.addListener(Events.ControlPortRemoveEvent, this._updateControlPortsTabLabelCB);
            this._tmpModel.addListener(Events.DataPortAddEvent, this._updateDataPortsTabLabelCB);
            this._tmpModel.addListener(Events.DataPortRemoveEvent, this._updateDataPortsTabLabelCB);
            this._tmpModel.addListener(Events.SettingAddEvent, this._updateSettingsTabLabelCB);
            this._tmpModel.addListener(Events.SettingRemoveEvent, this._updateSettingsTabLabelCB);
            // Display debug icon
            var isDebuggable = UITools.isBlockDataPortDebuggable(this._editor, this._block.getModel());
            this._dialog.icon = isDebuggable ? 'bug' : '';
            var titleBar = this._dialog.getTitleBar();
            UIDom.addClassName(titleBar, isDebuggable ? 'sch-windows-dialog-debug' : '');
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIBlockDialog.prototype._onOk = function () {
            if (UITools.isBlockDataPortDebuggable(this._editor, this._block.getModel())) {
                var fromDebugByDataPortPath_1 = new Map();
                this._dgvDataPorts.getTreeDocument().getRoots()[0].getChildren().forEach(function (root) {
                    var dataPort = root.getAttributeValue('dataPort');
                    var fromDebug = root.getAttributeValue('fromDebug');
                    fromDebugByDataPortPath_1.set(dataPort.toPath(), fromDebug);
                });
                var breakBlockData = UITools.getBreakBlockData(this._editor, this._tmpModel.getDataPorts(ModelEnums.EDataPortType.eInput), fromDebugByDataPortPath_1);
                this._editor.getOptions().playCommands.callbacks.onBreakBlockDataChange(breakBlockData);
                _super.prototype._onOk.call(this);
            }
            else {
                _super.prototype._onOk.call(this);
                this._editor.getHistoryController().registerEditAction(this._block);
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
         * Creates the block name line editor.
         * @private
         */
        UIBlockDialog.prototype._createNameLineEditor = function () {
            var _this = this;
            if (this._tmpModel.isNameSettable()) {
                var blockNameLabel = UIDom.createElement('label', {
                    className: 'sch-label-property',
                    parent: this._content,
                    children: [UIDom.createElement('span', { textContent: UINLS.get('labelBlockName') })]
                });
                this._blockNameLineEditor = new WUXLineEditor({
                    placeholder: UINLS.get('placeholderEnterValidBlockName'),
                    requiredFlag: true,
                    pattern: '',
                    value: this._tmpModel.getName()
                }).inject(blockNameLabel);
                this._blockNameLineEditor.addEventListener('change', function (event) {
                    var name = event.dsModel.value.trim();
                    _this._blockNameLineEditor.value = name;
                    if (name !== '') {
                        _this._tmpModel.setName(name);
                    }
                });
            }
        };
        /**
         * Creates the block description line editor.
         * @private
         */
        UIBlockDialog.prototype._createDescriptionLineEditor = function () {
            var _this = this;
            if (this._tmpModel.isDescriptionSettable()) {
                var blockDescriptionLabel = UIDom.createElement('label', {
                    className: 'sch-label-property',
                    parent: this._content,
                    children: [UIDom.createElement('span', { textContent: UINLS.get('labelBlockDescription') })]
                });
                this._blockDescriptionLineEditor = new WUXLineEditor({
                    placeholder: UINLS.get('placeholderEnterBlockDescription'),
                    requiredFlag: false,
                    pattern: '',
                    value: this._tmpModel.getDescription()
                }).inject(blockDescriptionLabel);
                this._blockDescriptionLineEditor.addEventListener('change', function (event) {
                    var description = event.dsModel.value.trim();
                    _this._blockDescriptionLineEditor.value = description;
                    if (description !== '') {
                        _this._tmpModel.setDescription(description);
                    }
                });
            }
        };
        /**
         * Creates the nodeId selector combobox.
         * @private
         */
        UIBlockDialog.prototype._createNodeIdSelectorComboBox = function () {
            var _this = this;
            if (this._tmpModel.isNodeIdSelectorSettable()) {
                var nodeIdSelectorLabel = UIDom.createElement('label', {
                    className: 'sch-label-property',
                    parent: this._content,
                    children: [UIDom.createElement('span', { textContent: UINLS.get('categoryNodeIdSelector') })]
                });
                var nodeIdSelectorList = this._tmpModel.getAllowedNodeIdSelectors();
                var nodeIdSelector = this._tmpModel.getNodeIdSelector();
                this._nodeIdSelectorComboBox = new WUXComboBox({
                    elementsList: UITools.getWUXComboListFromArray(nodeIdSelectorList, 'object-related'),
                    placeholder: UINLS.get('placeholderSelectNodeIdSelector'),
                    reachablePlaceholderFlag: true,
                    currentValue: nodeIdSelector,
                    enableSearchFlag: false
                }).inject(nodeIdSelectorLabel);
                this._nodeIdSelectorComboBox.addEventListener('change', function (event) {
                    _this._tmpModel.setNodeIdSelector(event.dsModel.value);
                });
            }
        };
        /**
         * Creates the tab dialog.
         * @private
         */
        UIBlockDialog.prototype._createTab = function () {
            this._tab = new WUXTab({
                reorderFlag: false,
                showComboBoxFlag: true,
                pinFlag: false,
                editableFlag: true,
                multiSelFlag: true,
                displayStyle: 'strip',
                allowUnsafeHTMLOnTabButton: false
            }).inject(this._content);
            this._controlPortsTab = UIDom.createElement('div', { className: 'sch-controls-tab' });
            this._tab.add({
                index: 0,
                label: UINLS.get('categoryControlPorts'),
                isSelected: true,
                content: this._controlPortsTab,
                icon: UIFontIcon.getWUX3DSIconDefinition('parameter-mapping')
            });
            this._dgvControlPorts = new UIDGVControlPort(this._editor, this._tmpModel);
            this._controlPortsTab.appendChild(this._dgvControlPorts.getElement());
            this._updateControlPortsTabLabel();
            this._dataPortsTab = UIDom.createElement('div', { className: 'sch-controls-tab' });
            this._tab.add({
                index: 1,
                label: UINLS.get('categoryDataPorts'),
                isSelected: false,
                content: this._dataPortsTab,
                icon: UIFontIcon.getWUX3DSIconDefinition('flow-tree')
            });
            this._dgvDataPorts = new UIDGVDataPort(this._editor, this._tmpModel);
            this._dataPortsTab.appendChild(this._dgvDataPorts.getElement());
            this._updateDataPortsTabLabel();
            this._settingsTab = UIDom.createElement('div', { className: 'sch-controls-tab' });
            this._tab.add({
                index: 2,
                label: UINLS.get('categorySettings'),
                isSelected: false,
                content: this._settingsTab,
                icon: UIFontIcon.getWUXFAIconDefinition('cogs')
            });
            this._dgvSettings = new UIDGVSettings(this._editor, this._tmpModel);
            this._settingsTab.appendChild(this._dgvSettings.getElement());
            this._updateSettingsTabLabel();
            this._tab.tabBar.centeredFlag = false;
        };
        /**
         * Updates the control ports count in the tab label.
         * @private
         */
        UIBlockDialog.prototype._updateControlPortsTabLabel = function () {
            var count = this._tmpModel.getControlPorts().length;
            this._tab.tabBar.updateTab(0, { label: UINLS.get('categoryControlPorts') + ' (' + count + ')' });
        };
        /**
         * Updates the data ports count in the tab label.
         * @private
         */
        UIBlockDialog.prototype._updateDataPortsTabLabel = function () {
            var count = this._tmpModel.getDataPorts().length;
            this._tab.tabBar.updateTab(1, { label: UINLS.get('categoryDataPorts') + ' (' + count + ')' });
        };
        /**
         * Updates the settings count in the tab label.
         * @private
         */
        UIBlockDialog.prototype._updateSettingsTabLabel = function () {
            var count = this._tmpModel.getSettings().length;
            this._tab.tabBar.updateTab(2, { label: UINLS.get('categorySettings') + ' (' + count + ')' });
        };
        return UIBlockDialog;
    }(UITemporaryModelDialog));
    return UIBlockDialog;
});
