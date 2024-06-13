/// <amd-module name='DS/EPSSchematicsUI/panels/EPSSchematicsUIDebugConsolePanel'/>
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
define("DS/EPSSchematicsUI/panels/EPSSchematicsUIDebugConsolePanel", ["require", "exports", "DS/EPSSchematicsUI/panels/EPSSchematicsUIPanel", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDebugConsole", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFileSaver", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/Controls/Button", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "css!DS/EPSSchematicsUI/css/panels/EPSSchematicsUIDebugConsolePanel"], function (require, exports, UIPanel, UIDGVDebugConsole, UIDom, UIFileSaver, UITools, UIFontIcon, UICommandType, UIWUXTools, WUXButton, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: Disable save and clear button when treeDocument is empty!
    /**
     * This class defines a UI debug console panel.
     * @class UIDebugConsolePanel
     * @alias module:DS/EPSSchematicsUI/panels/EPSSchematicsUIDebugConsolePanel
     * @extends UIPanel
     * @private
     */
    var UIDebugConsolePanel = /** @class */ (function (_super) {
        __extends(UIDebugConsolePanel, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UIDebugConsolePanel(editor) {
            var _this = _super.call(this, {
                immersiveFrame: editor.getImmersiveFrame(),
                title: UINLS.get('panelTitleDebugConsole'),
                width: 1200,
                height: 310,
                currentDockArea: editor.getOptions().debugConsoleDockArea,
                className: ['sch-debugconsole-panel'],
                icon: UIFontIcon.getWUXIconFromCommand(UICommandType.eDebugConsole)
            }) || this;
            _this._editor = undefined;
            _this._controller = undefined;
            _this._fileSaver = new UIFileSaver();
            _this._toolbar = undefined;
            _this._clearButton = undefined;
            _this._saveButton = undefined;
            _this._dataGridViewContainer = undefined;
            _this._dataGridView = undefined;
            _this._editor = editor;
            _this._controller = _this._editor.getDebugConsoleController();
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
        UIDebugConsolePanel.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the panel!
            this._editor = undefined;
            this._controller = undefined;
            this._fileSaver = undefined;
            this._toolbar = undefined;
            this._clearButton = undefined;
            this._saveButton = undefined;
            this._dataGridViewContainer = undefined;
            this._dataGridView = undefined;
        };
        /**
         * Gets the debug console controller.
         * @public
         * @returns {UIDebugConsoleController} The debug console controller.
         */
        UIDebugConsolePanel.prototype.getController = function () {
            return this._controller;
        };
        /**
         * Gets the data grid view debug console.
         * @public
         * @returns {UIDGVDebugConsole} The data grid view debug console.
         */
        UIDebugConsolePanel.prototype.getDataGridView = function () {
            return this._dataGridView;
        };
        /**
         * Gets the WUX save button.
         * @public
         * @returns {WUXButton} The WUX save button.
         */
        UIDebugConsolePanel.prototype.getWUXSaveButton = function () {
            return this._saveButton;
        };
        /**
         * Gets the WUX clear button.
         * @public
         * @returns {WUXButton} The WUX clear button.
         */
        UIDebugConsolePanel.prototype.getWUXClearButton = function () {
            return this._clearButton;
        };
        /**
         * Gets the file saver.
         * @public
         * @returns {UIFileSaver} The file saver.
         */
        UIDebugConsolePanel.prototype.getFileSaver = function () {
            return this._fileSaver;
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
        UIDebugConsolePanel.prototype._onClose = function () {
            this._toolbar = undefined;
            this._clearButton = undefined;
            this._saveButton = undefined;
            this._dataGridViewContainer = undefined;
            if (this._dataGridView !== undefined) {
                this._dataGridView.remove();
                this._dataGridView = undefined;
            }
            if (this._controller !== undefined) {
                this._controller.unregisterDebugConsole();
            }
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the panel content.
         * @protected
         * @abstract
         */
        UIDebugConsolePanel.prototype._createContent = function () {
            this._createToolbar();
            this._createDataGridView();
            this._controller.clearToolbarButtonsNotifications();
            this._controller.registerDebugConsole(this);
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
         * Creates the panel toolbar.
         * @private
         */
        UIDebugConsolePanel.prototype._createToolbar = function () {
            var _this = this;
            this._toolbar = UIDom.createElement('div', { className: 'sch-toolbar', parent: this.getContent() });
            this._clearButton = new WUXButton({
                emphasize: 'primary',
                icon: UIFontIcon.getWUXFAIconDefinition('trash-o'),
                allowUnsafeHTMLLabel: false,
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: UINLS.get('shortHelpClearConsole') }),
                onClick: function () { return _this._onClearButtonClick(); }
            }).inject(this._toolbar);
            this._saveButton = new WUXButton({
                emphasize: 'primary',
                icon: UIFontIcon.getWUXFAIconDefinition('floppy-o'),
                allowUnsafeHTMLLabel: false,
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: UINLS.get('shortHelpSaveConsole') }),
                onClick: function () { return _this._onSaveButtonClick(); }
            }).inject(this._toolbar);
        };
        /**
         * Creates the data grid view.
         * @private
         */
        UIDebugConsolePanel.prototype._createDataGridView = function () {
            this._dataGridViewContainer = UIDom.createElement('div', { className: 'sch-datagridview-container', parent: this.getContent() });
            this._dataGridView = new UIDGVDebugConsole(this._controller);
            this._dataGridViewContainer.appendChild(this._dataGridView.getElement());
        };
        /**
         * The callback on the clear button click event.
         * @private
         */
        UIDebugConsolePanel.prototype._onClearButtonClick = function () {
            this._controller.clear();
        };
        /**
         * The callback on the save button click event.
         * @private
         */
        UIDebugConsolePanel.prototype._onSaveButtonClick = function () {
            var treeDocument = this._controller.getTreeDocument();
            var roots = treeDocument.getRoots();
            var entries = [];
            roots.forEach(function (root) {
                var grid = root.options.grid;
                entries.push({
                    timestamp: grid.timestamp.getTime(),
                    date: grid.fullDate + ' ' + grid.fullTime,
                    severity: grid.severity,
                    severityText: grid.severityText,
                    message: grid.message
                });
            });
            var stringToSave = UITools.safeJSONStringify(entries);
            var currentDate = new Date();
            var fullDateAndTime = UITools.getFullDate(currentDate) + ' ' + UITools.getFullTime(currentDate);
            var fileName = 'OutputConsole - ' + fullDateAndTime + '.json';
            this._fileSaver.saveTextFile(stringToSave, fileName);
        };
        return UIDebugConsolePanel;
    }(UIPanel));
    return UIDebugConsolePanel;
});
