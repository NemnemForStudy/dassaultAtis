/* global TooltipModel */
/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVNodeIdSelector'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVNodeIdSelector", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/EPSSchematicsUIEnums", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/Controls/Button", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVNodeIdSelector"], function (require, exports, UIDataGridView, UIDom, UINLS, UIFontIcon, UIEnums, UIWUXTools, WUXButton) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data grid view nodeId selector.
     * @private
     * @class UIDGVNodeIdSelector
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVNodeIdSelector
     * @extends UIDataGridView
     */
    var UIDGVNodeIdSelector = /** @class */ (function (_super) {
        __extends(UIDGVNodeIdSelector, _super);
        /**
         * @public
         * @constructor
         * @param {UIGraph} graphUI - The UI graph.
         */
        function UIDGVNodeIdSelector(graphUI) {
            var _this = _super.call(this, {
                className: 'sch-datagridview-nodeidselector',
                rowsHeader: false,
                columnsHeader: false,
                columnDragEnabledFlag: false,
                showCellActivationFlag: false,
                cellActivationFeedback: 'none',
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: true,
                cellSelection: 'none',
                rowSelection: 'single',
                treeDocument: graphUI.getNodeIdSelectorController().getTreeDocument()
            }) || this;
            _this._graphUI = graphUI;
            _this._controller = graphUI.getNodeIdSelectorController();
            _this._initialize();
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
         * Removes the data grid view.
         * @public
         */
        UIDGVNodeIdSelector.prototype.remove = function () {
            if (this._resizeObserver) {
                this._resizeObserver.unobserve(this._scroller);
            }
            this._graphUI = undefined;
            this._controller = undefined;
            this._addButton = undefined;
            this._scroller = undefined;
            this._resizeObserver = undefined;
            this._currentNodeIdSelectorId = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the current nodeId selector Id.
         * @public
         * @returns {string} The current nodeId selector Id.
         */
        UIDGVNodeIdSelector.prototype.getCurrentNodeIdSelectorId = function () {
            return this._currentNodeIdSelectorId;
        };
        /**
         * Sets the current nodeId selector Id.
         * @public
         * @param {string} nodeIdSelectorId - The current nodeId selector Id.
         */
        UIDGVNodeIdSelector.prototype.setCurrentNodeIdSelectorId = function (nodeIdSelectorId) {
            this._currentNodeIdSelectorId = nodeIdSelectorId;
        };
        /**
         * Gets the add button.
         * @public
         * @returns {WUXButton} The add button.
         */
        UIDGVNodeIdSelector.prototype.getAddButton = function () {
            return this._addButton;
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
         * Defines the data grid view columns.
         * @protected
         */
        UIDGVNodeIdSelector.prototype._defineColumns = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'tree',
                text: UINLS.get('treeListColumnName'),
                sortableFlag: true,
                editableFlag: false,
                width: 'auto',
                typeRepresentation: 'string',
                editionPolicy: 'EditionOnOver',
                getCellClassName: function (cellInfos) {
                    var _a;
                    var className = 'sch-dgv-not-editable';
                    if ((_a = cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.isRoot()) {
                        var nodeIdSelector = cellInfos.nodeModel.getAttributeValue('nodeIdSelector');
                        className = (nodeIdSelector === null || nodeIdSelector === void 0 ? void 0 : nodeIdSelector.isNameSettable()) ? '' : className;
                    }
                    return className;
                },
                getCellEditableState: function (cellInfos) {
                    var _a;
                    var editableState = false;
                    if ((_a = cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.isRoot()) {
                        var nodeIdSelector = cellInfos.nodeModel.getAttributeValue('nodeIdSelector');
                        editableState = (nodeIdSelector === null || nodeIdSelector === void 0 ? void 0 : nodeIdSelector.isNameSettable()) || false;
                    }
                    return editableState;
                },
                setCellValue: function (cellInfos, value) {
                    var _a;
                    var nodeIdSelector = (_a = cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.getAttributeValue('nodeIdSelector');
                    if (nodeIdSelector) {
                        nodeIdSelector.setName(value);
                        _this._graphUI.getEditor().getHistoryController().registerEditNodeIdSelectorAction();
                    }
                }
            });
            this._columns.push({
                dataIndex: 'value',
                text: UINLS.get('treeListColumnValue'),
                sortableFlag: true,
                editableFlag: true,
                editionPolicy: 'EditionOnOver',
                alignment: 'near',
                width: 'auto',
                getCellTypeRepresentation: function (cellInfos) { var _a; return ((_a = cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.getAttributeValue('typeRepresentation')) || 'string'; },
                setCellValue: function (cellInfos, value) {
                    if (cellInfos.nodeModel) {
                        var nodeIdSelector = cellInfos.nodeModel.getAttributeValue('nodeIdSelector');
                        if (nodeIdSelector) {
                            var id = cellInfos.nodeModel.getAttributeValue('id');
                            if (id === UIEnums.ENodeIdSelectorProperty.ePool) {
                                nodeIdSelector.setPool(value);
                            }
                            else if (id === UIEnums.ENodeIdSelectorProperty.eCriterion) {
                                value = value === -1 ? undefined : value;
                                nodeIdSelector.setCriterion(value);
                            }
                            else if (id === UIEnums.ENodeIdSelectorProperty.eIdentifier) {
                                nodeIdSelector.setIdentifier(value);
                            }
                            else if (id === UIEnums.ENodeIdSelectorProperty.eQueuing) {
                                nodeIdSelector.setQueuing(value);
                            }
                            else if (id === UIEnums.ENodeIdSelectorProperty.eTimeout) {
                                nodeIdSelector.setTimeout(value);
                            }
                            else if (id === UIEnums.ENodeIdSelectorProperty.eMaxInstanceCount) {
                                nodeIdSelector.setMaxInstanceCount(value);
                            }
                            else if (id === UIEnums.ENodeIdSelectorProperty.eCmdLine) {
                                nodeIdSelector.setCmdLine(value);
                            }
                            _this._graphUI.getEditor().getHistoryController().registerEditNodeIdSelectorAction();
                        }
                    }
                }
            });
            this._columns.push({
                dataIndex: 'deleteNodeIdSelector',
                text: '',
                typeRepresentation: 'functionIcon',
                width: 40,
                minWidth: 40,
                editionPolicy: 'EditionOnOver',
                sortableFlag: false,
                getCellSemantics: function () { return { icon: UIFontIcon.getWUX3DSIconDefinition('trash') }; },
                getCellClassName: function () { return 'sch-dgv-column-delete'; },
                getCellTooltip: function (cellInfos) {
                    var _a;
                    var tooltip;
                    if ((_a = cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.getAttributeValue('deleteNodeIdSelector')) {
                        tooltip = UIWUXTools.createTooltip({
                            title: UINLS.get('tooltipTitleDeleteNodeIdSelector'),
                            shortHelp: UINLS.get('tooltipShortHelpDeleteNodeIdSelector'),
                            initialDelay: 500
                        });
                    }
                    return tooltip;
                }
            });
            this._columns.push({
                dataIndex: 'color',
                text: UINLS.get('treeListColumnColor'),
                typeRepresentation: 'color',
                width: 40,
                minWidth: 40,
                sortableFlag: false,
                editableFlag: true,
                editionPolicy: 'EditionInPlace',
                alignment: 'center',
                getCellClassName: function (cellInfos) { var _a; return ((_a = cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.getAttributeValue('nodeIdSelector')) ? '' : 'sch-dgv-cell-disabled'; },
                setCellValue: function (cellInfos, value) {
                    if (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) {
                        cellInfos.nodeModel.setAttribute('color', value);
                        _this._graphUI.getEditor().getNodeIdSelectorsPanel().colorizeBlocks();
                        _this._graphUI.getEditor().getHistoryController().registerEditNodeIdSelectorAction();
                    }
                }
            });
            this._columns.push({
                dataIndex: 'applyNodeIdSelector',
                text: UINLS.get('treeListColumnApply'),
                typeRepresentation: 'functionIcon',
                sortableFlag: false,
                width: 40,
                minWidth: 40,
                alignment: 'center',
                editionPolicy: 'EditionOnOver',
                getCellSemantics: function () { return { icon: UIFontIcon.getWUX3DSIconDefinition('brush') }; },
                getCellClassName: function () { return 'sch-dgv-column-apply'; },
                getCellTooltip: function () { return { title: UINLS.get('shortHelpApplyNodeIdSelectorToBlock'), shortHelp: UINLS.get('longHelpApplyNodeIdSelectorToBlock'), initialDelay: 500 }; }
            });
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
         * Initializes the data grid view.
         * @private
         */
        UIDGVNodeIdSelector.prototype._initialize = function () {
            var _this = this;
            this._addButton = new WUXButton({
                emphasize: 'primary',
                icon: 'plus',
                tooltipInfos: UIWUXTools.createTooltip({ title: UINLS.get('createNodeIdSelectorTitle'), shortHelp: UINLS.get('createNodeIdSelectorShortHelp'), initialDelay: 500 }),
                onClick: function () {
                    _this._graphUI.getModel().createNodeIdSelector();
                    _this._graphUI.getEditor().getHistoryController().registerCreateNodeIdSelectorAction();
                }
            }).inject(this._dataGridView.elements.scrollContainerRel);
            UIDom.addClassName(this._addButton.getContent(), 'sch-datagridview-addbutton');
            this._scroller = this._dataGridView.elements.scroller.getContent();
            this._scroller.addEventListener('scroll', function () { return _this._updateAddButtonPosition(); });
            this._resizeObserver = new ResizeObserver(function () { return _this._updateAddButtonPosition(); });
            this._resizeObserver.observe(this._scroller, {});
        };
        /**
         * Updates the add button position.
         * @private
         */
        UIDGVNodeIdSelector.prototype._updateAddButtonPosition = function () {
            var isBottomReached = this._scroller.scrollHeight - this._scroller.scrollTop === this._scroller.clientHeight;
            var addOrRemoveClassName = isBottomReached ? UIDom.addClassName : UIDom.removeClassName;
            addOrRemoveClassName(this._addButton.getContent(), 'sch-addbutton-top');
        };
        return UIDGVNodeIdSelector;
    }(UIDataGridView));
    return UIDGVNodeIdSelector;
});
