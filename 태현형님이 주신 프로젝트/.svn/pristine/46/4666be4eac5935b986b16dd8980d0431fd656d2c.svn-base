/* global WUXEvent */
/// <amd-module name='DS/EPSSchematicsUI/panels/EPSSchematicsUINodeIdSelectorsPanel'/>
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
define("DS/EPSSchematicsUI/panels/EPSSchematicsUINodeIdSelectorsPanel", ["require", "exports", "DS/EPSSchematicsUI/panels/EPSSchematicsUIPanel", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVNodeIdSelector", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "css!DS/EPSSchematicsUI/css/panels/EPSSchematicsUINodeIdSelectorsPanel"], function (require, exports, UIPanel, UIFontIcon, UICommandType, UIDom, UIEvents, UIDGVNodeIdSelector, UINLS, Tools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI nodeId selector panel.
     * @private
     * @class UINodeIdSelectorsPanel
     * @alias module:DS/EPSSchematicsUI/panels/EPSSchematicsUINodeIdSelectorsPanel
     * @extends UIPanel
     */
    var UINodeIdSelectorsPanel = /** @class */ (function (_super) {
        __extends(UINodeIdSelectorsPanel, _super);
        /**
         * @public
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UINodeIdSelectorsPanel(editor) {
            var _this = _super.call(this, {
                immersiveFrame: editor.getImmersiveFrame(),
                title: UINLS.get('panelTitleNodeIdSelectors'),
                currentDockArea: editor.getOptions().blockLibraryDockArea,
                width: 500,
                height: 900,
                className: ['sch-nodeidselector-panel'],
                icon: UIFontIcon.getWUXIconFromCommand(UICommandType.eOpenNodeIdSelectorsPanel)
            }) || this;
            _this._onViewerChangeCB = _this._onViewerChange.bind(_this);
            _this._paintModeEnabled = false;
            _this._editor = editor;
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
        UINodeIdSelectorsPanel.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the panel!
            this._editor = undefined;
            this._onViewerChangeCB = undefined;
            this._paintModeEnabled = undefined;
            this._currentGraph = undefined;
            this._dataGridView = undefined;
        };
        /**
         * Refreshes the panel content.
         * @public
         */
        UINodeIdSelectorsPanel.prototype.refreshContent = function () {
            if (this.isOpen()) {
                if (this._dataGridView !== undefined) {
                    this.getContent().removeChild(this._dataGridView.getElement());
                    this._dataGridView.remove();
                    this._dataGridView = undefined;
                }
                this._createDataGridView();
                if (this.getWUXPanel().getContentVisibleState()) {
                    this.colorizeBlocks();
                }
            }
        };
        /**
         * Sets the block nodeId selector.
         * @public
         * @param {UIBlock} block - The UI block.
         * @returns {boolean} True if the nodeId selector has been set, false otherwise.
         */
        UINodeIdSelectorsPanel.prototype.setBlockNodeIdSelector = function (block) {
            var nodeIdSelectorId = this._dataGridView.getCurrentNodeIdSelectorId();
            return block.getModel().setNodeIdSelector(nodeIdSelectorId);
        };
        /**
         * Colorizes the blocks.
         * @public
         */
        UINodeIdSelectorsPanel.prototype.colorizeBlocks = function () {
            var _this = this;
            this._currentGraph.getBlocks().forEach(function (block) { return _this.colorizeBlock(block); });
        };
        /**
         * Colorizes the block.
         * @public
         * @param {UIBlock} block - The UI block.
         */
        UINodeIdSelectorsPanel.prototype.colorizeBlock = function (block) {
            if (this._currentGraph !== undefined) {
                var blockView = block.getView();
                var nodeIdSelectorName = block.getModel().getNodeIdSelector();
                if (nodeIdSelectorName === Tools.parentNodeIdSelector) {
                    var parentColor = '8C8C8C';
                    blockView.setBackgroundColor(parentColor);
                }
                else {
                    var nodeIdSelector = this._currentGraph.getModel().getNodeIdSelectorByName(nodeIdSelectorName);
                    if (nodeIdSelector !== undefined) {
                        var index = this._currentGraph.getModel().getNodeIdSelectors().indexOf(nodeIdSelector);
                        if (index !== -1) {
                            var color = this._currentGraph.getNodeIdSelectorController().getColor(index);
                            blockView.setBackgroundColor(color);
                        }
                    }
                    else {
                        blockView.removeBackgroundColor();
                    }
                }
            }
        };
        /**
         * Checks if the paint mode is enabled.
         * @public
         * @returns {boolean} True if the paint mode is enabled else false.
         */
        UINodeIdSelectorsPanel.prototype.isPaintModeEnabled = function () {
            return this._paintModeEnabled;
        };
        /**
         * Enables the paint mode.
         * @public
         */
        UINodeIdSelectorsPanel.prototype.enablePaintMode = function () {
            this._paintModeEnabled = true;
            UIDom.addClassName(document.body, 'sch-nodeidselector-paint-mode');
        };
        /**
         * Disables the paint mode.
         * @public
         */
        UINodeIdSelectorsPanel.prototype.disablePaintMode = function () {
            this._paintModeEnabled = false;
            UIDom.removeClassName(document.body, 'sch-nodeidselector-paint-mode');
        };
        /**
         * Gets the data grid view nodeId selector.
         * @public
         * @returns {UIDGVNodeIdSelector} The data grid view nodeId selector.
         */
        UINodeIdSelectorsPanel.prototype.getDataGridView = function () {
            return this._dataGridView;
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
        UINodeIdSelectorsPanel.prototype._onClose = function () {
            this.disablePaintMode();
            this._uncolorizeblocks();
            if (this._dataGridView) {
                this._dataGridView.remove();
                this._dataGridView = undefined;
            }
            if (this._editor !== undefined) {
                this._editor.removeListener(UIEvents.UIViewerChangeEvent, this._onViewerChangeCB);
            }
            this._currentGraph = undefined;
            this._paintModeEnabled = undefined;
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the panel content.
         * @protected
         * @abstract
         */
        UINodeIdSelectorsPanel.prototype._createContent = function () {
            this._paintModeEnabled = false;
            this._currentGraph = this._editor.getViewerController().getCurrentViewer().getMainGraph();
            this._editor.addListener(UIEvents.UIViewerChangeEvent, this._onViewerChangeCB);
            this._createDataGridView();
            this.colorizeBlocks();
        };
        /**
         * The callback on the panel content visible state change event.
         * @protected
         * @param {WUXEvent} event - The panel content visible state change event.
         */
        UINodeIdSelectorsPanel.prototype._onContentVisibleStateChange = function (event) {
            this.disablePaintMode();
            if (event.dsModel.contentVisibleState) {
                this.colorizeBlocks();
            }
            else {
                this._uncolorizeblocks();
            }
            _super.prototype._onContentVisibleStateChange.call(this, event);
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
         * Creates the data grid view.
         * @private
         */
        UINodeIdSelectorsPanel.prototype._createDataGridView = function () {
            var graphUI = this._editor.getViewerController().getCurrentViewer().getMainGraph();
            this._dataGridView = new UIDGVNodeIdSelector(graphUI);
            this.getContent().appendChild(this._dataGridView.getElement());
        };
        /**
         * The callback on the viewer change event.
         * @private
         * @param {UIEvents.UIViewerChangeEvent} event - The UI viewer change event.
         */
        UINodeIdSelectorsPanel.prototype._onViewerChange = function (event) {
            this._currentGraph = event.getViewer().getMainGraph();
            this.refreshContent();
        };
        /**
         * Uncolorizes the blocks.
         * @private
         */
        UINodeIdSelectorsPanel.prototype._uncolorizeblocks = function () {
            var viewers = this._editor.getViewerController().getRootViewerWithAllViewers();
            viewers.forEach(function (viewer) {
                viewer.getMainGraph().getBlocks().forEach(function (block) {
                    block.getView().removeBackgroundColor();
                });
            });
        };
        return UINodeIdSelectorsPanel;
    }(UIPanel));
    return UINodeIdSelectorsPanel;
});
