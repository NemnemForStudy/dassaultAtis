/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTypeLibrary'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTypeLibrary", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVTypeLibrary"], function (require, exports, UIDataGridView, UINLS, UIFontIcon, UIWUXTools, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data grid view type library.
     * @class UIDGVTypeLibrary
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTypeLibrary
     * @extends UIDataGridView
     * @private
     */
    var UIDGVTypeLibrary = /** @class */ (function (_super) {
        __extends(UIDGVTypeLibrary, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         * @param {UITypeLibraryController} controller - The type library controller.
         */
        function UIDGVTypeLibrary(editor, controller) {
            var _this = _super.call(this, {
                className: 'sch-datagridview-typelibrary',
                treeDocument: controller.getTreeDocument(),
                autoScroll: false,
                columnDragEnabledFlag: false,
                showCellActivationFlag: false,
                cellActivationFeedback: 'none',
                //showCellPreselectionFlag: false,
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: true,
                cellSelection: 'none',
                rowSelection: 'single',
                treeNodeCellOptions: {
                    expanderStyle: 'triangle'
                },
                defaultColumnDef: {
                    width: 'auto',
                    typeRepresentation: 'string'
                },
                placeholder: '',
                rowsHeader: false,
                columnsHeader: false
            }) || this;
            _this._editor = editor;
            _this._controller = controller;
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
         * @override
         */
        UIDGVTypeLibrary.prototype.remove = function () {
            this._editor = undefined;
            this._controller = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the type library controller.
         * @public
         * @returns {UITypeLibraryController} The type library controller.
         */
        UIDGVTypeLibrary.prototype.getController = function () {
            return this._controller;
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
         * @override
         */
        UIDGVTypeLibrary.prototype._defineColumns = function () {
            this._columns.push({
                dataIndex: 'tree',
                text: 'Type name',
                visibleFlag: true
            });
            this._defineOccurenceColumn();
            this._defineApplyTypeColumn();
            this._defineDeleteColumn();
        };
        /**
         * The callback on the preselected cell change event.
         * @protected
         */
        // eslint-disable-next-line no-unused-vars
        UIDGVTypeLibrary.prototype._onPreselectedCellChange = function (event) {
            var graph = this._editor.getViewerController().getCurrentViewer().getMainGraph();
            graph.unhighlightCompatibleDataPorts();
            var cellID = this._dataGridView.getPreselectedCellID();
            var cellInfos = this._dataGridView.getCellInfosAt(String(cellID));
            if (cellInfos.nodeModel && !cellInfos.nodeModel.isRoot()) {
                var occurenceReferences = cellInfos.nodeModel.getAttributeValue('occurenceReferences');
                if (occurenceReferences.length > 0) {
                    graph.highlightUIElementsFromModel(occurenceReferences, ModelEnums.ESeverity.eInfo);
                }
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
         * Initializes the data grid view.
         * @private
         */
        UIDGVTypeLibrary.prototype._initialize = function () {
            var myCustomRep = {
                deleteFunction: {
                    stdTemplate: 'functionIcon',
                    semantics: {
                        icon: UIFontIcon.getWUX3DSIconDefinition('trash')
                    }
                }
            };
            this.getWUXDataGridView().getTypeRepresentationFactory().registerTypeRepresentations(JSON.stringify(myCustomRep));
            this._controller.sortTypes();
        };
        /**
         * Defines the data grid view apply type column.
         * @private
         */
        UIDGVTypeLibrary.prototype._defineApplyTypeColumn = function () {
            this._columns.push({
                dataIndex: 'applyType',
                text: 'Apply type',
                typeRepresentation: 'functionIcon',
                width: 40,
                minWidth: 40,
                editionPolicy: 'EditionOnOver',
                visibleFlag: true,
                //getCellValueAsStringForFind: () => '',
                getCellSemantics: function () { return { icon: UIFontIcon.getWUX3DSIconDefinition('publish') }; },
                getCellTooltip: function (cellInfos) {
                    var tooltip;
                    var nodeModel = cellInfos.nodeModel;
                    if (nodeModel !== undefined && nodeModel.getAttributeValue('applyType') !== undefined) {
                        tooltip = UIWUXTools.createTooltip({
                            title: UINLS.get('tooltipTitleApplyType'),
                            shortHelp: UINLS.get('tooltipShortHelpTypeLibraryApplyType'),
                            initialDelay: 500
                        });
                    }
                    return tooltip;
                },
                getCellClassName: function (cellInfos) {
                    var className = 'sch-dgv-column-applytype';
                    var nodeModel = cellInfos.nodeModel;
                    if (nodeModel !== undefined) {
                        var disabled = nodeModel.getAttributeValue('disabled');
                        className += disabled ? ' disabled' : '';
                    }
                    return className;
                }
            });
        };
        /**
         * Defines the data grid view occurence column.
         * @private
         */
        UIDGVTypeLibrary.prototype._defineOccurenceColumn = function () {
            this._columns.push({
                dataIndex: 'occurenceCount',
                text: 'Occurence count',
                typeRepresentation: 'string',
                editableFlag: false,
                visibleFlag: true,
                width: 40,
                minWidth: 40,
                getCellValue: function (cellInfos) {
                    var occurenceCount = cellInfos.nodeModel.getAttributeValue('occurenceCount');
                    return occurenceCount > 0 ? occurenceCount : '';
                },
                getCellClassName: function (cellInfos) {
                    var occurenceCount = cellInfos.nodeModel.getAttributeValue('occurenceCount');
                    return occurenceCount > 0 ? 'sch-dgv-column-occurencecount' : '';
                },
                getCellTooltip: function (cellInfos) {
                    var tooltip;
                    if (cellInfos.nodeModel.getAttributeValue('occurenceCount') > 0) {
                        tooltip = UIWUXTools.createTooltip({
                            title: UINLS.get('occurenceCountTypeLibraryTitle'),
                            shortHelp: UINLS.get('occurenceCountTypeLibraryShortHelp'),
                            initialDelay: 500
                        });
                    }
                    return tooltip;
                }
            });
        };
        /**
         * Defines the data grid view delete column.
         * @private
         */
        UIDGVTypeLibrary.prototype._defineDeleteColumn = function () {
            this._columns.push({
                dataIndex: 'deleteType',
                text: 'Delete',
                typeRepresentation: 'deleteFunction',
                alignment: 'center',
                width: 40,
                minWidth: 40,
                editionPolicy: 'EditionInPlace',
                visibleFlag: true,
                //getCellValueAsStringForFind: () => '',
                getCellTooltip: function (cellInfos) {
                    var tooltip;
                    var nodeModel = cellInfos.nodeModel;
                    if (nodeModel !== undefined && nodeModel.getAttributeValue('deleteType') !== undefined) {
                        tooltip = UIWUXTools.createTooltip({
                            title: UINLS.get('tooltipTitleRemoveUserType'),
                            shortHelp: UINLS.get('tooltipShortHelpRemoveUserType'),
                            longHelp: UINLS.get('tooltipLongHelpRemoveUserType'),
                            initialDelay: 500
                        });
                    }
                    return tooltip;
                },
                getCellClassName: function () { return 'sch-dgv-column-delete'; }
            });
        };
        return UIDGVTypeLibrary;
    }(UIDataGridView));
    return UIDGVTypeLibrary;
});
