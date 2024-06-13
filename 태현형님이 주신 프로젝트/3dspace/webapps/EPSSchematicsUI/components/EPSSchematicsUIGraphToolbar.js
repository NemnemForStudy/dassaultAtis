/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUIGraphToolbar'/>
define("DS/EPSSchematicsUI/components/EPSSchematicsUIGraphToolbar", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/components/EPSSchematicsUICommandButton", "DS/EPSSchematicsUI/components/EPSSchematicsUICommandToggleButton", "DS/EPSSchematicsUI/components/EPSSchematicsUICommandNotificationButton", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIEditorSettingsDialog", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIGraphBlockDialog", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "css!DS/EPSSchematicsUI/css/components/EPSSchematicsUIGraphToolbar"], function (require, exports, UIDom, UICommandButton, UICommandToggleButton, UICommandNotificationButton, UICommand, UICommandType, UIEditorSettingsDialog, UIGraphBlockDialog, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a graph toolbar.
     * @class UIGraphToolbar
     * @alias module:DS/EPSSchematicsUI/components/EPSSchematicsUIGraphToolbar
     * @private
     */
    var UIGraphToolbar = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIGraph} graph - The UI graph.
         */
        function UIGraphToolbar(graph) {
            this._onButtonClickCB = this._onButtonClick.bind(this);
            this._commandButtons = [];
            this._graph = graph;
            this._viewer = this._graph.getViewer();
            this._editor = this._graph.getEditor();
            this._editorSettingsDialog = new UIEditorSettingsDialog(this._editor);
            this._graphConfigDialog = new UIGraphBlockDialog(this._graph);
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
        UIGraphToolbar.prototype.remove = function () {
            this._commandButtons.forEach(function (commandButton) { return commandButton.remove(); });
            this._commandButtons = undefined;
            this._blockLibraryButton = undefined;
            this._typeLibraryButton = undefined;
            this._debugConsoleButton = undefined;
            this._historyButton = undefined;
            this._graphConfigButton = undefined;
            this._graphLoadButton = undefined;
            this._graphSaveButton = undefined;
            this._graphClearButton = undefined;
            this._graphAnalyzerButton = undefined;
            this._graphDataLinkMinimizerButton = undefined;
            this._graphContrastButton = undefined;
            this._graphNodeIdSelectorsButton = undefined;
            this._commentButton = undefined;
            this._editorSettingsButton = undefined;
            this._expanderButton = undefined;
            var viewerContent = this._viewer.getContainer();
            if (viewerContent !== undefined) {
                viewerContent.removeChild(this._toolbarElt);
            }
            if (this._editorSettingsDialog !== undefined) {
                this._editorSettingsDialog.remove();
                this._editorSettingsDialog = undefined;
            }
            if (this._graphConfigDialog) {
                this._graphConfigDialog.close();
                this._graphConfigDialog = undefined;
            }
            this._graph = undefined;
            this._viewer = undefined;
            this._editor = undefined;
            this._toolbarElt = undefined;
            this._expanderContainerElt = undefined;
            this._onButtonClickCB = undefined;
        };
        /**
         * Updates the graph toolbar position.
         * @public
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UIGraphToolbar.prototype.updatePosition = function (vpt) {
            var toolbarLeft, toolbarTop;
            var vpx = vpt.translationX;
            var vpy = vpt.translationY;
            var vps = vpt.scale;
            var scale = vps < 1.0 ? vps : 1.0;
            var toolbarBBox = this._toolbarElt.getBoundingClientRect();
            var viewHeight = this._graph.getViewer().getHeight();
            var graphTop = this._graph.getTop();
            var graphHeight = this._graph.getHeight();
            var graphLeft = this._graph.getLeft();
            var graphWidth = this._graph.getWidth();
            // Compute the toolbar left position
            var isLeftBorderVisible = (vpx / vps) + graphLeft + UIGraphToolbar.kGraphBorderHalfSize >= 0;
            if (!isLeftBorderVisible) {
                var fixedLeft = 0;
                var rightLimit = vpx + (graphLeft * vps) + (graphWidth * vps) - (UIGraphToolbar.kGraphBorderHalfSize * vps) - toolbarBBox.width;
                toolbarLeft = fixedLeft > rightLimit ? rightLimit : fixedLeft;
            }
            else {
                toolbarLeft = vpx + (graphLeft * vps) + (UIGraphToolbar.kGraphBorderHalfSize * vps);
            }
            // Compute the toolbar top position
            var isBottomBorderVisible = (vpy / vps) + graphTop + graphHeight - UIGraphToolbar.kGraphBorderHalfSize <= viewHeight / vps;
            if (!isBottomBorderVisible) {
                var fixedTop = viewHeight - toolbarBBox.height;
                var topLimit = vpy + (graphTop * vps) + (UIGraphToolbar.kGraphBorderHalfSize * vps);
                toolbarTop = fixedTop < topLimit ? topLimit : fixedTop;
            }
            else {
                toolbarTop = vpy + (graphTop * vps) + (graphHeight * vps) - toolbarBBox.height - (UIGraphToolbar.kGraphBorderHalfSize * vps);
            }
            // Update the toolbar scale and position
            this._toolbarElt.style.transform = 'matrix(' + scale + ',0,0,' + scale + ',' + Math.round(toolbarLeft) + ',' + Math.round(toolbarTop) + ')';
            var padding = vps < 1.0 ? 5 : 5 * vps;
            this._toolbarElt.style.padding = padding + 'px';
        };
        /**
         * Gets the block library button.
         * @public
         * @returns {UICommandButton} The block library button.
         */
        UIGraphToolbar.prototype.getBlockLibraryButton = function () {
            return this._blockLibraryButton;
        };
        /**
         * Gets the type library button.
         * @public
         * @returns {UICommandButton} The type library button.
         */
        UIGraphToolbar.prototype.getTypeLibraryButton = function () {
            return this._typeLibraryButton;
        };
        /**
         * Gets the debug console button.
         * @public
         * @returns {UICommandNotificationButton} The debug console button.
         */
        UIGraphToolbar.prototype.getDebugConsoleButton = function () {
            return this._debugConsoleButton;
        };
        /**
         * Gets the history button.
         * @public
         * @returns {UICommandButton} The history button.
         */
        UIGraphToolbar.prototype.getHistoryButton = function () {
            return this._historyButton;
        };
        /**
         * Gets the graph configuration button.
         * @public
         * @returns {UICommandButton} The graph configuration button.
         */
        UIGraphToolbar.prototype.getGraphConfigurationButton = function () {
            return this._graphConfigButton;
        };
        /**
         * Gets the graph load button.
         * @public
         * @returns {UICommandButton} The graph load button.
         */
        UIGraphToolbar.prototype.getGraphLoadButton = function () {
            return this._graphLoadButton;
        };
        /**
         * Gets the graph save button.
         * @public
         * @returns {UICommandButton} The graph save button.
         */
        UIGraphToolbar.prototype.getGraphSaveButton = function () {
            return this._graphSaveButton;
        };
        /**
         * Gets the graph clear button.
         * @public
         * @returns {UICommandButton} The graph clear button.
         */
        UIGraphToolbar.prototype.getGraphClearButton = function () {
            return this._graphClearButton;
        };
        /**
         * Gets the graph analyzer button.
         * @public
         * @returns {UICommandToggleButton} The graph analyzer button.
         */
        UIGraphToolbar.prototype.getGraphAnalyzerButton = function () {
            return this._graphAnalyzerButton;
        };
        /**
         * Gets the graph data link minimizer button.
         * @public
         * @returns {UICommandToggleButton} The graph data link minimizer button.
         */
        UIGraphToolbar.prototype.getGraphDataLinkMinimizerButton = function () {
            return this._graphDataLinkMinimizerButton;
        };
        /**
         * Gets the graph contrast button.
         * @public
         * @returns {UICommandButton} The graph contrast button.
         */
        UIGraphToolbar.prototype.getGraphContrastButton = function () {
            return this._graphContrastButton;
        };
        /**
         * Gets the graph nodeId selectors button.
         * @public
         * @returns {UICommandButton} The graph nodeId selectors button.
         */
        UIGraphToolbar.prototype.getGraphNodeIdSelectorsButton = function () {
            return this._graphNodeIdSelectorsButton;
        };
        /**
         * Gets the comment button.
         * @public
         * @returns {UICommandButton} The comment button.
         */
        UIGraphToolbar.prototype.getCommentButton = function () {
            return this._commentButton;
        };
        /**
         * Gets the editor settings button.
         * @public
         * @returns {UICommandButton} The graph editor settings button.
         */
        UIGraphToolbar.prototype.getEditorSettingsButton = function () {
            return this._editorSettingsButton;
        };
        /**
         * Gets the expander button.
         * @public
         * @returns {UICommandToggleButton} The expander button.
         */
        UIGraphToolbar.prototype.getExpanderButton = function () {
            return this._expanderButton;
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
         * Initializes the graph toolbar.
         * @private
         */
        UIGraphToolbar.prototype._initialize = function () {
            this._toolbarElt = UIDom.createElement('div', { className: 'sch-graph-toolbar', parent: this._viewer.getContainer() });
            this._blockLibraryButton = new UICommandButton({
                command: new UICommand(UICommandType.eOpenBlockLibrary, this._onButtonClickCB),
                parent: this._toolbarElt
            });
            this._commandButtons.push(this._blockLibraryButton);
            this._typeLibraryButton = new UICommandButton({
                command: new UICommand(UICommandType.eOpenTypeLibraryPanel, this._onButtonClickCB),
                parent: this._toolbarElt
            });
            this._commandButtons.push(this._typeLibraryButton);
            this._debugConsoleButton = new UICommandNotificationButton({
                command: new UICommand(UICommandType.eDebugConsole, this._onButtonClickCB),
                parent: this._toolbarElt
            }, this._editor.getDebugConsoleController());
            this._commandButtons.push(this._debugConsoleButton);
            this._historyButton = new UICommandButton({
                command: new UICommand(UICommandType.eOpenHistoryPanel, this._onButtonClickCB),
                parent: this._toolbarElt
            });
            this._commandButtons.push(this._historyButton);
            this._graphConfigButton = new UICommandButton({
                command: new UICommand(UICommandType.eOpenGraphConfiguration, this._onButtonClickCB),
                className: 'sch-graph-toolbar-button-configuration',
                parent: this._toolbarElt
            });
            this._commandButtons.push(this._graphConfigButton);
            this._createExpanderToolbar();
        };
        /**
         * Creates the expander toolbar part.
         * @private
         */
        UIGraphToolbar.prototype._createExpanderToolbar = function () {
            var _this = this;
            var options = this._editor.getOptions();
            if (options.hideGraphToolbarButton !== 511 /* fAllButton */) {
                this._expanderContainerElt = UIDom.createElement('div', { className: 'sch-graph-toolbar-expander-container' });
                if (!(options.hideGraphToolbarButton & 1 /* fLoad */)) {
                    var isExpanded = options.expandGraphToolbarButton & 1 /* fLoad */;
                    this._graphLoadButton = new UICommandButton({
                        command: new UICommand(UICommandType.eOpenFile, function () {
                            var rootViewer = _this._editor.getViewerController().getRootViewer();
                            var callback = options.onOpen || rootViewer.loadFile.bind(rootViewer);
                            callback();
                        }),
                        parent: isExpanded ? this._toolbarElt : this._expanderContainerElt
                    });
                    this._commandButtons.push(this._graphLoadButton);
                }
                if (!(options.hideGraphToolbarButton & 2 /* fSave */)) {
                    var isExpanded = options.expandGraphToolbarButton & 2 /* fSave */;
                    this._graphSaveButton = new UICommandButton({
                        command: new UICommand(UICommandType.eSaveFile, function () {
                            var rootViewer = _this._editor.getViewerController().getRootViewer();
                            var callback = options.onSave || rootViewer.saveFile.bind(rootViewer);
                            callback();
                        }),
                        parent: isExpanded ? this._toolbarElt : this._expanderContainerElt
                    });
                    this._commandButtons.push(this._graphSaveButton);
                }
                if (!(options.hideGraphToolbarButton & 4 /* fClear */)) {
                    var isExpanded = options.expandGraphToolbarButton & 4 /* fClear */;
                    var rootViewer = this._editor.getViewerController().getRootViewer();
                    this._graphClearButton = new UICommandButton({
                        command: new UICommand(UICommandType.eClearGraph, rootViewer.clearGraph.bind(rootViewer)),
                        parent: isExpanded ? this._toolbarElt : this._expanderContainerElt
                    });
                    this._commandButtons.push(this._graphClearButton);
                }
                if (!(options.hideGraphToolbarButton & 8 /* fGraphAnalyzer */)) {
                    var isExpanded = options.expandGraphToolbarButton & 8 /* fGraphAnalyzer */;
                    this._graphAnalyzerButton = new UICommandToggleButton({
                        command: new UICommand(UICommandType.eGraphAnalyzer),
                        parent: isExpanded ? this._toolbarElt : this._expanderContainerElt,
                        toggleCB: this._graph.setGraphAnalyzerState.bind(this._graph),
                        checked: this._graph.getGraphAnalyzerState()
                    });
                    this._commandButtons.push(this._graphAnalyzerButton);
                }
                if (!(options.hideGraphToolbarButton & 16 /* fDataLinkMinimizer */)) {
                    var isExpanded = options.expandGraphToolbarButton & 16 /* fDataLinkMinimizer */;
                    this._graphDataLinkMinimizerButton = new UICommandToggleButton({
                        command: new UICommand(UICommandType.eMinimizeDataLinks),
                        parent: isExpanded ? this._toolbarElt : this._expanderContainerElt,
                        toggleCB: this._graph.setDataLinksMinimizerState.bind(this._graph),
                        checked: this._graph.getDataLinksMinimizerState()
                    });
                    this._commandButtons.push(this._graphDataLinkMinimizerButton);
                }
                if (!(options.hideGraphToolbarButton & 32 /* fContrast */)) {
                    var isExpanded = options.expandGraphToolbarButton & 32 /* fContrast */;
                    this._graphContrastButton = new UICommandButton({
                        command: new UICommand(UICommandType.eSwitchContrast, this._viewer.switchGraphContrast.bind(this._viewer)),
                        parent: isExpanded ? this._toolbarElt : this._expanderContainerElt
                    });
                    this._commandButtons.push(this._graphContrastButton);
                }
                if (!(options.hideGraphToolbarButton & 64 /* fNodeIdSelectors */)) {
                    var isExpanded = options.expandGraphToolbarButton & 64 /* fNodeIdSelectors */;
                    this._graphNodeIdSelectorsButton = new UICommandButton({
                        command: new UICommand(UICommandType.eOpenNodeIdSelectorsPanel, this._onButtonClickCB),
                        parent: isExpanded ? this._toolbarElt : this._expanderContainerElt
                    });
                    this._commandButtons.push(this._graphNodeIdSelectorsButton);
                }
                if (!(options.hideGraphToolbarButton & 128 /* fCreateComment */)) {
                    var isExpanded = options.expandGraphToolbarButton & 128 /* fCreateComment */;
                    this._commentButton = new UICommandButton({
                        className: 'sch-graph-toolbar-button-comment',
                        command: new UICommand(UICommandType.eCreateComment, function () { _this._graph.createComment(); }),
                        parent: isExpanded ? this._toolbarElt : this._expanderContainerElt
                    });
                    this._commandButtons.push(this._commentButton);
                }
                if (!(options.hideGraphToolbarButton & 256 /* fEditorSettings */)) {
                    var isExpanded = options.expandGraphToolbarButton & 256 /* fEditorSettings */;
                    this._editorSettingsButton = new UICommandButton({
                        command: new UICommand(UICommandType.eOpenEditorSettings, this._onButtonClickCB),
                        className: 'sch-graph-toolbar-button-editor-settings',
                        parent: isExpanded ? this._toolbarElt : this._expanderContainerElt
                    });
                    this._commandButtons.push(this._editorSettingsButton);
                }
                if (this._expanderContainerElt.children.length > 0) {
                    this._toolbarElt.appendChild(this._expanderContainerElt);
                    this._expanderButton = new UICommandToggleButton({
                        command: new UICommand(UICommandType.eToolbarExpander, this._onButtonClickCB),
                        parent: this._toolbarElt,
                        className: 'sch-graph-toolbar-button-expander'
                    });
                    this._commandButtons.push(this._expanderButton);
                }
            }
        };
        /**
         * The callback on the button click event.
         * @private
         * @param {MouseEvent} event - The button click event.
         */
        UIGraphToolbar.prototype._onButtonClick = function (event) {
            var buttonElt = event.currentTarget;
            if (buttonElt === this._blockLibraryButton.getElement()) {
                this._editor.getBlockLibraryPanel().switchVisibility();
            }
            else if (buttonElt === this._typeLibraryButton.getElement()) {
                this._editor.getTypeLibraryPanel().switchVisibility();
            }
            else if (buttonElt === this._debugConsoleButton.getElement()) {
                this._editor.getDebugConsolePanel().switchVisibility();
            }
            else if (buttonElt === this._graphConfigButton.getElement()) {
                this._graphConfigDialog.open();
            }
            else if (buttonElt === this._historyButton.getElement()) {
                this._editor.getHistoryPanel().switchVisibility();
            }
            else if (buttonElt === this._graphNodeIdSelectorsButton.getElement()) {
                this._editor.getNodeIdSelectorsPanel().switchVisibility();
            }
            else if (buttonElt === this._editorSettingsButton.getElement()) {
                this._editorSettingsDialog.open();
            }
            else if (buttonElt === this._expanderButton.getElement()) {
                this._switchExpander();
            }
        };
        /**
         * Switches the opening or the closing of the toolbar expander.
         * @private
         */
        UIGraphToolbar.prototype._switchExpander = function () {
            UIDom.toggleClassName(this._expanderContainerElt, 'expanded');
            var shortHelp = this._expanderButton.getCheckedState() ? UINLS.get('shortHelpHideEditorOptions') : UINLS.get('shortHelpShowEditorOptions');
            this._expanderButton.setShortHelp(shortHelp);
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
         * Gets the toolbar element.
         * @private
         * @ignore
         * @returns {HTMLDivElement} The toolbar element.
         */
        UIGraphToolbar.prototype._getToolbarElt = function () {
            return this._toolbarElt;
        };
        /**
         * Gets the expander container element.
         * @private
         * @ignore
         * @returns {HTMLDivElement} The expander container element.
         */
        UIGraphToolbar.prototype._getExpanderContainerElt = function () {
            return this._expanderContainerElt;
        };
        /**
         * Gets the editor settings dialog.
         * @private
         * @ignore
         * @returns {UIEditorSettingsDialog} The editor settings dialog.
         */
        UIGraphToolbar.prototype._getEditorSettingsDialog = function () {
            return this._editorSettingsDialog;
        };
        /**
         * Gets the graph configuration dialog.
         * @private
         * @ignore
         * @returns {UIGraphBlockDialog} The graph configuration dialog.
         */
        UIGraphToolbar.prototype._getGraphConfigurationDialog = function () {
            return this._graphConfigDialog;
        };
        UIGraphToolbar.kGraphBorderSize = 5.0;
        UIGraphToolbar.kGraphBorderHalfSize = UIGraphToolbar.kGraphBorderSize / 2;
        return UIGraphToolbar;
    }());
    return UIGraphToolbar;
});
