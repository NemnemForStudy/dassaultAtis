/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDebugConsole'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDebugConsole", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsUI/components/EPSSchematicsUIValueEvaluator", "DS/EPSSchematicsUI/components/EPSSchematicsUIBasicEvaluator", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVDebugConsole"], function (require, exports, UIDataGridView, UIValueEvaluator, UIBasicEvaluator, ModelEnums, UIWUXTools, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view debug console.
     * @class UIDGVDebugConsole
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDebugConsole
     * @extends UIDataGridView
     * @private
     */
    var UIDGVDebugConsole = /** @class */ (function (_super) {
        __extends(UIDGVDebugConsole, _super);
        /**
         * @constructor
         * @param {UIDebugConsoleController} controller - The debug console controller.
         */
        function UIDGVDebugConsole(controller) {
            var _this = _super.call(this, {
                className: 'sch-datagridview-debugconsole',
                treeDocument: controller.getTreeDocument(),
                autoScroll: true,
                columnDragEnabledFlag: false,
                showAlternateBackgroundFlag: false,
                showCellActivationFlag: false,
                showCellPreselectionFlag: false,
                cellSelection: 'none',
                rowSelection: 'single',
                //showRowBorderFlag: true,
                cellActivationFeedback: 'none',
                defaultColumnDef: {
                    width: 'auto',
                    typeRepresentation: 'string'
                },
                placeholder: '',
                rowsHeader: false,
                columnsHeader: false
            }) || this;
            _this._valueEvaluatorMap = new Map();
            _this._controller = controller;
            _this._updateContent();
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
        UIDGVDebugConsole.prototype.remove = function () {
            if (this._valueEvaluatorMap !== undefined) {
                this._valueEvaluatorMap.clear();
                this._valueEvaluatorMap = undefined;
            }
            this._controller = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Get the value evaluator map.
         * @public
         * @returns {Map<WUXTreeNodeModel, UIValueEvaluator>} The value evaluator map.
         */
        UIDGVDebugConsole.prototype.getValueEvaluatorMap = function () {
            return this._valueEvaluatorMap;
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
         * The callback on the tree document empty event.
         * @protected
         * @override
         */
        UIDGVDebugConsole.prototype._onTreeDocumentEmpty = function () {
            this._valueEvaluatorMap.clear();
            _super.prototype._onTreeDocumentEmpty.call(this);
        };
        /**
         * Defines the data grid view columns.
         * @protected
         * @override
         */
        UIDGVDebugConsole.prototype._defineColumns = function () {
            _super.prototype._defineColumns.call(this);
            this._defineOriginColumn();
            this._defineSeverityColumn();
            this._defineTimestampColumn();
            this._defineMessageColumn();
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIDGVDebugConsole.prototype._defineOriginColumn = function () {
            this._columns.push({
                dataIndex: 'originIcon',
                text: 'Origin',
                sortableFlag: false,
                typeRepresentation: 'icon',
                minWidth: 30,
                width: 30,
                getCellClassName: function (cellInfos) {
                    var severity = cellInfos.nodeModel.getAttributeValue('severity');
                    return 'sch-dgv-column-origin' + ' ' + UIDGVDebugConsole._getCellClassNameFromSeverity(severity);
                },
                getCellTooltip: function (cellInfos) {
                    return { shortHelp: cellInfos.nodeModel.getAttributeValue('originText') };
                }
            });
        };
        /**
         * Defines the data grid view severity column.
         * @private
         */
        UIDGVDebugConsole.prototype._defineSeverityColumn = function () {
            this._columns.push({
                dataIndex: 'severityIcon',
                text: 'Severity',
                sortableFlag: false,
                typeRepresentation: 'icon',
                minWidth: 30,
                width: 30,
                getCellClassName: function (cellInfos) {
                    var className = 'sch-dgv-column-severity';
                    if (cellInfos.nodeModel !== undefined) {
                        var severity = cellInfos.nodeModel.getAttributeValue('severity');
                        className += ' ' + UIDGVDebugConsole._getCellClassNameFromSeverity(severity);
                    }
                    return className;
                },
                getCellTooltip: function (cellInfos) {
                    return { shortHelp: cellInfos.nodeModel.getAttributeValue('severityText') };
                }
            });
        };
        /**
         * Defines the data grid view timestamp column.
         * @private
         */
        UIDGVDebugConsole.prototype._defineTimestampColumn = function () {
            this._columns.push({
                dataIndex: 'fullTime',
                text: 'Timestamp',
                sortableFlag: false,
                width: 80,
                getCellClassName: function (cellInfos) {
                    var severity = cellInfos.nodeModel.getAttributeValue('severity');
                    return 'sch-dgv-column-timestamp' + ' ' + UIDGVDebugConsole._getCellClassNameFromSeverity(severity);
                },
                getCellTooltip: function (cellInfos) {
                    var fullDate = cellInfos.nodeModel.getAttributeValue('fullDate');
                    var fullTime = cellInfos.nodeModel.getAttributeValue('fullTime');
                    return { shortHelp: fullDate + ' ' + fullTime };
                }
            });
        };
        /**
         * Defines the data grid view timestamp column.
         * @private
         */
        UIDGVDebugConsole.prototype._defineMessageColumn = function () {
            this._columns.push({
                dataIndex: 'message',
                text: 'Message',
                sortableFlag: false,
                allowUnsafeHTMLContent: false,
                autoRowHeightFlag: true,
                typeRepresentation: 'textBlock',
                onCellRequest: this._onMessageCellRequest.bind(this),
                getCellClassName: function (cellInfos) {
                    var severity = cellInfos.nodeModel.getAttributeValue('severity');
                    return 'sch-dgv-column-message' + ' ' + UIDGVDebugConsole._getCellClassNameFromSeverity(severity);
                }
            });
        };
        /**
         * Gets the cell class name from the given severity.
         * @private
         * @param {ESeverity} severity - The severity.
         * @returns {string} The cell class name corresponding to the given severity.
         */
        UIDGVDebugConsole._getCellClassNameFromSeverity = function (severity) {
            var cellClassName;
            if (severity === ModelEnums.ESeverity.eInfo) {
                cellClassName = 'sch-severity-level-info';
            }
            else if (severity === ModelEnums.ESeverity.eDebug) {
                cellClassName = 'sch-severity-level-debug';
            }
            else if (severity === ModelEnums.ESeverity.eWarning) {
                cellClassName = 'sch-severity-level-warning';
            }
            else if (severity === ModelEnums.ESeverity.eError) {
                cellClassName = 'sch-severity-level-error';
            }
            else if (severity === ModelEnums.ESeverity.eSuccess) {
                cellClassName = 'sch-severity-level-success';
            }
            return cellClassName;
        };
        /**
         * Updates the data grid view content.
         * @private
         */
        UIDGVDebugConsole.prototype._updateContent = function () {
            var _this = this;
            var dataGridView = this.getWUXDataGridView();
            dataGridView.registerReusableCellContent({
                id: 'reusableCellMessage',
                buildContent: function () { return UIDom.createElement('div', { className: 'sch-dgv-reusable' }); }
            });
            // Bug fix for the non resized cell height issue
            dataGridView.onReady(function () {
                dataGridView.layout.resetRowHeights();
                _this.scrollToBottom();
            });
            // Prevent default data grid copy/paste behavior!
            dataGridView.setUseClipboardFlag(false);
            //dataGridView.layout.getRowHeightFunction = this.getRowHeightFunction.bind(this);
        };
        /*private _getRowHeightFunction(rowID: number): number {
            let height;
            const nodeModel = this.treeDocument.getNthRoot(rowID);
            const valueEvaluator = this.valueEvaluatorMap.get(nodeModel);
            if (valueEvaluator !== undefined) {
                height = valueEvaluator.getObjectExpandedHeight();
            } else {
                height = this.dataGridView.layout.getRowHeightFromCellContents(rowID);
            }
            return height;
        }*/
        /**
         * The callback on the message cell request.
         * @private
         * @param {IWUXCellInfos} cellInfos - The data grid view cell infos.
         */
        UIDGVDebugConsole.prototype._onMessageCellRequest = function (cellInfos) {
            var cellView = cellInfos.cellView;
            var message = cellInfos.nodeModel.getAttributeValue('message');
            var dataGridView = this.getWUXDataGridView();
            if (typeof message === 'string') {
                dataGridView.defaultOnCellRequest(cellInfos);
            }
            else {
                var evaluatorElt = void 0;
                if (typeof message === 'boolean') {
                    evaluatorElt = UIBasicEvaluator.getInlineBooleanValueElement(message);
                }
                else if (typeof message === 'number') {
                    evaluatorElt = UIBasicEvaluator.getInlineNumberValueElement(message);
                }
                else if (typeof message === 'object' || message === undefined) {
                    var valueEvaluator = this._valueEvaluatorMap.get(cellInfos.nodeModel);
                    if (valueEvaluator === undefined) {
                        valueEvaluator = new UIValueEvaluator(message, {
                            onExpand: function () { return dataGridView.layout.resetRowHeight(cellInfos.rowID); },
                            onCollapse: function () { return dataGridView.layout.resetRowHeight(cellInfos.rowID); }
                        });
                        this._valueEvaluatorMap.set(cellInfos.nodeModel, valueEvaluator);
                    }
                    evaluatorElt = valueEvaluator.getElement();
                }
                if (evaluatorElt !== undefined) {
                    var cellContent = dataGridView.reuseCellContent('reusableCellMessage');
                    cellContent.tooltipInfos = UIWUXTools.createTooltip({ shortHelp: '' });
                    if (cellContent.firstChild) {
                        cellContent.replaceChild(evaluatorElt, cellContent.firstChild);
                    }
                    else {
                        cellContent.appendChild(evaluatorElt);
                    }
                    cellView._setReusableContent(cellContent);
                }
            }
        };
        return UIDGVDebugConsole;
    }(UIDataGridView));
    return UIDGVDebugConsole;
});
