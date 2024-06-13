/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVBlockLibrary'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVBlockLibrary", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS"], function (require, exports, UIDataGridView, UIDom, UIFontIcon, UIWUXTools, BlockLibrary, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data grid view block library.
     * @class UIDGVBlockLibrary
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVBlockLibrary
     * @extends UIDataGridView
     * @private
     */
    var UIDGVBlockLibrary = /** @class */ (function (_super) {
        __extends(UIDGVBlockLibrary, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         * @param {UIBlockLibraryController} controller - The block library controller.
         * @param {UIBlockLibraryDocView} docView - The block library documentation view.
         */
        function UIDGVBlockLibrary(editor, controller, docView) {
            var _this = _super.call(this, {
                className: 'sch-datagridview-blocklibrary',
                treeDocument: controller.getTreeDocument(),
                columnDragEnabledFlag: false,
                showCellActivationFlag: false,
                cellActivationFeedback: 'none',
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: true,
                cellSelection: 'none',
                rowSelection: 'single',
                treeNodeCellOptions: {
                    expanderStyle: 'triangle'
                },
                placeholder: UINLS.get('blockLibraryDataGridViewPlaceHolder'),
                rowsHeader: false,
                columnsHeader: false,
                cellDragEnabledFlag: true,
                onDragStartCell: UIDGVBlockLibrary._onBlockDragStart,
                onDragOverCell: UIDGVBlockLibrary._onPreventCellDrag,
                onDragEnterCell: UIDGVBlockLibrary._onPreventCellDrag,
                onDragLeaveCell: UIDGVBlockLibrary._onPreventCellDrag,
                onDragEndCell: UIDGVBlockLibrary._onPreventCellDrag,
                onDropCell: UIDGVBlockLibrary._onPreventCellDrag,
                onDragOverBlank: UIDGVBlockLibrary._onPreventCellDrag,
                onDropBlank: UIDGVBlockLibrary._onPreventCellDrag
            }) || this;
            _this._editor = editor;
            _this._controller = controller;
            _this._docView = docView;
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
        UIDGVBlockLibrary.prototype.remove = function () {
            this._editor = undefined;
            this._controller = undefined;
            this._docView = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Selects the block with specified Uid.
         * @public
         * @param {string} blockUid - The block Uid.
         */
        UIDGVBlockLibrary.prototype.selectBlock = function (blockUid) {
            var block = BlockLibrary.getBlock(blockUid);
            if (block !== undefined) {
                var category = block.getCategory();
                var categoryPaths = category.split('/');
                // Expand the treeView to the last category
                var categoryNode = this._expandToPath(this._controller.getTreeDocument(), categoryPaths);
                if (categoryNode !== undefined) {
                    // Find the block by uid
                    var blockNode = categoryNode.getChildren().find(function (node) { return node.getAttributeValue('isBlock') && node.getAttributeValue('value') === blockUid; });
                    if (blockNode !== undefined) {
                        this.scrollToNode(blockNode);
                        blockNode.select();
                        this._docView.displayBlockDocumentation(blockUid);
                    }
                }
            }
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
        UIDGVBlockLibrary.prototype._defineColumns = function () {
            this._columns.push({
                dataIndex: 'tree',
                text: 'Block name',
                visibleFlag: true
            });
            this._defineFavoriteColumn();
        };
        /**
         * The callback on the cell click event.
         * @protected
         * @param {MouseEvent} event - The mouse event.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         */
        UIDGVBlockLibrary.prototype._onCellClick = function (event, cellInfos) {
            if (cellInfos !== undefined) {
                var isBlock = cellInfos.nodeModel.getAttributeValue('isBlock');
                if (isBlock) {
                    var blockUid = cellInfos.nodeModel.getAttributeValue('value');
                    this._docView.displayBlockDocumentation(blockUid);
                }
                else {
                    var categoryName = cellInfos.nodeModel.getLabel();
                    var fullCategoryName = cellInfos.nodeModel.getAttributeValue('value');
                    this._docView.displayCategoryDocumentation(categoryName, fullCategoryName);
                }
            }
        };
        /**
         * The callback on the cell dblclick event.
         * Handles the expand/collapse of parent node.
         * @protected
         * @param {MouseEvent} event - The dblclick mouse event.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         */
        UIDGVBlockLibrary.prototype._onCellDblClick = function (event, cellInfos) {
            if (cellInfos !== undefined) {
                var isBlock = cellInfos.nodeModel.getAttributeValue('isBlock');
                if (isBlock) {
                    var blockUid = cellInfos.nodeModel.getAttributeValue('value');
                    var lastOpenedViewer = this._editor.getViewerController().getCurrentViewer();
                    var graph = lastOpenedViewer.getMainGraph();
                    var block = graph.createBlockInMiddle(blockUid);
                    block.automaticExpandDataPorts();
                }
            }
            _super.prototype._onCellDblClick.call(this, event, cellInfos);
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
         * Defines the favorite column.
         * @private
         */
        UIDGVBlockLibrary.prototype._defineFavoriteColumn = function () {
            this._columns.push({
                dataIndex: 'favoriteIcon',
                text: 'Favorite',
                typeRepresentation: 'functionIcon',
                width: 40,
                minWidth: 40,
                editionPolicy: 'EditionOnOver',
                visibleFlag: true,
                getCellSemantics: function (cellInfos) {
                    var semantics = { icon: undefined };
                    var nodeModel = cellInfos.nodeModel;
                    if (nodeModel !== undefined && nodeModel.getAttributeValue('favoriteIcon') !== undefined) {
                        var isFavorite = nodeModel.getAttributeValue('isFavorite');
                        semantics.icon = UIFontIcon.getWUX3DSIconDefinition(isFavorite ? 'favorite-on' : 'favorite-off');
                    }
                    return semantics;
                },
                getCellTooltip: function (cellInfos) {
                    var tooltip;
                    var nodeModel = cellInfos.nodeModel;
                    if (nodeModel !== undefined && nodeModel.getAttributeValue('favoriteIcon') !== undefined) {
                        var isFavorite = nodeModel.getAttributeValue('isFavorite');
                        tooltip = UIWUXTools.createTooltip({
                            title: UINLS.get(isFavorite ? 'removeBlockFromFavoritesTitle' : 'addBlockToFavoritesTitle'),
                            shortHelp: UINLS.get(isFavorite ? 'removeBlockFromFavoritesShortHelp' : 'addBlockToFavoritesShortHelp'),
                            initialDelay: 500
                        });
                    }
                    return tooltip;
                }
            });
        };
        /**
         * Expands the tree document to the provided category path.
         * @private
         * @param {WUXTreeNodeModel|WUXTreeDocument} root - The tree node model to expand.
         * @param {string[]} paths - The category paths.
         * @param {string} [path] - The current category path.
         * @returns {WUXTreeNodeModel} The deeped expanded category tree node model.
         */
        UIDGVBlockLibrary.prototype._expandToPath = function (root, paths, path) {
            if (root !== undefined && paths.length > 0) {
                var children = root.getChildren() || [];
                if (path !== undefined) {
                    path += '/' + paths.shift();
                }
                else {
                    path = paths.shift();
                }
                var child = children.find(function (node) { return !node.getAttributeValue('isBlock') && node.getAttributeValue('value') === path; });
                if (child !== undefined) {
                    child.expand();
                    root = this._expandToPath(child, paths, path);
                }
            }
            return root;
        };
        /**
         * The callback on the block drag start event.
         * @private
         * @static
         * @param {DragEvet} event - The drag start event.
         * @param {IWUXCellInfos} dragInfos - The drag infos.
         * @returns {boolean} True to call the default implementation else false.
         */
        UIDGVBlockLibrary._onBlockDragStart = function (event, dragInfos) {
            if (dragInfos && dragInfos.nodeModel) {
                var isBlock = dragInfos.nodeModel.getAttributeValue('isBlock');
                if (isBlock) {
                    var blockUid = dragInfos.nodeModel.getAttributeValue('value');
                    var jsonForDrop = '{"uid": "' + blockUid + '" }';
                    event.dataTransfer.setData('droppedElement', jsonForDrop);
                    var ghost_1 = UIDom.createElement('div', {
                        className: 'sch-dgv-dnd-block',
                        textContent: dragInfos.nodeModel.getLabel(),
                        parent: document.body
                    });
                    var bbox = UIDom.getComputedStyleBBox(ghost_1);
                    event.dataTransfer.setDragImage(ghost_1, bbox.width / 2, bbox.height / 2);
                    setTimeout(function () { return document.body.removeChild(ghost_1); });
                }
                else {
                    event.preventDefault();
                }
            }
            return false;
        };
        /**
         * THe callback to prevent cell drag event.
         * @private
         * @static
         * @param {DragEvet} event - The drag event.
         * @returns {boolean} True to call the default implementation else false.
         */
        UIDGVBlockLibrary._onPreventCellDrag = function (event) {
            event.preventDefault();
            return false;
        };
        return UIDGVBlockLibrary;
    }(UIDataGridView));
    return UIDGVBlockLibrary;
});
