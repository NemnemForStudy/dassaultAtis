/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIBlockLibraryController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIBlockLibraryController", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeDocument", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary"], function (require, exports, WUXTreeDocument, WUXTreeNodeModel, UITools, UIFontIcon, BlockLibrary) {
    "use strict";
    // TODO: Move tree document used in the tree list view of the block library here!
    // TODO: Try to merge the model from UISmartSearch on this tree document? (adapted to QuickSearchScorer?)
    /**
     * This class defines a UI block library controller.
     * @class UIBlockLibraryController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIBlockLibraryController
     * @private
     */
    var UIBlockLibraryController = /** @class */ (function () {
        //private _onBlockLibraryRegisterCategoryEventCB: Function = this._onBlockLibraryRegisterCategoryEvent.bind(this);
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         */
        function UIBlockLibraryController(editor) {
            this._treeDocument = new WUXTreeDocument({ useAsyncPreExpand: true });
            this._isInitialized = false;
            this._favoriteIconCB = { module: 'DS/EPSSchematicsUI/controllers/EPSSchematicsUIBlockLibraryController', func: '_switchFavorite' };
            this._editor = editor;
            this._favoriteIconCB.argument = { editor: editor };
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
         * Remove the controller.
         * @public
         */
        UIBlockLibraryController.prototype.remove = function () {
            //BlockLibrary.removeListener(Events.BlockLibraryRegisterCategoryEvent, this._onBlockLibraryRegisterCategoryEventCB);
            if (this._treeDocument) {
                this._treeDocument.empty();
            }
            this._editor = undefined;
            this._treeDocument = undefined;
            this._isInitialized = undefined;
            //this._onBlockLibraryRegisterCategoryEventCB = undefined;
        };
        /**
         * Gets the tree document.
         * @public
         * @returns {TreeDocument} The tree document.
         */
        UIBlockLibraryController.prototype.getTreeDocument = function () {
            return this._treeDocument;
        };
        /**
         * Initializes the controller.
         * To be called once the documentation is loaded.
         * @public
         */
        UIBlockLibraryController.prototype.initializeController = function () {
            var _this = this;
            if (!this._isInitialized) {
                var fullCategoryNames = BlockLibrary.searchCategoryByName(RegExp('.*')).sort();
                fullCategoryNames.forEach(function (fullCategoryName) {
                    if (fullCategoryName && fullCategoryName !== '') { // Create categories (even if no blocks inside it ie: Core)
                        _this._createCategoriesModel(fullCategoryName);
                    }
                    _this._createBlocksModel(fullCategoryName);
                });
                //BlockLibrary.addListener(Events.BlockLibraryRegisterCategoryEvent, this._onBlockLibraryRegisterCategoryEventCB);
                //BlockLibrary.addListener(Events.BlockLibraryRegisterBlockEvent, this.onBlockLibraryRegisterCB);
                this._loadFavorites();
                this._isInitialized = true;
            }
        };
        /**
         * Matches the search result for blocks or categories.
         * @public
         * @param {Block[]} blocks - The list of blocks to match.
         * @param {boolean} highlightBlock - True to highlight block name else false.
         * @param {boolean} highlightCategory - True to highlight category name else false.
         */
        UIBlockLibraryController.prototype.match = function (blocks, highlightBlock, highlightCategory) {
            this._treeDocument.prepareUpdate();
            this._treeDocument.collapseAll();
            this._treeDocument.search({
                match: function (nodeInfos) {
                    var node = nodeInfos.nodeModel;
                    var label = node.getLabel();
                    var blockFound = blocks.find(function (block) { return block.getName() === label; });
                    if (blockFound) {
                        if (highlightBlock) {
                            node.matchSearch();
                        }
                        if (node.isRoot()) {
                            node.collapse();
                        }
                        else {
                            node.reverseExpand();
                            var parentNode = node;
                            do {
                                if (highlightCategory && parentNode.hasChildren()) {
                                    parentNode.matchSearch();
                                }
                                parentNode = parentNode.getParent();
                                parentNode.show();
                            } while (!parentNode.isRoot());
                            if (highlightCategory) {
                                parentNode.matchSearch();
                            }
                        }
                        node.show();
                    }
                    else {
                        node.unmatchSearch();
                        node.hide();
                    }
                }
            });
            this._treeDocument.pushUpdate();
        };
        /**
         * Unmatches the search result for blocks.
         * @public
         */
        UIBlockLibraryController.prototype.unmatch = function () {
            this._treeDocument.prepareUpdate();
            this._treeDocument.collapseAll();
            this._treeDocument.search({
                match: function (nodeInfos) {
                    var node = nodeInfos.nodeModel;
                    node.unmatchSearch();
                    node.show();
                }
            });
            this._treeDocument.pushUpdate();
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
         * Switches favorite state on the selected block.
         * @protected
         * @static
         * @param {IFunctionIconArguments} args - The function icon arguments.
         */
        UIBlockLibraryController._switchFavorite = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var blockUid = nodeModel.getAttributeValue('value');
                var isFavorite = nodeModel.getAttributeValue('isFavorite');
                var newFavoriteState = !isFavorite;
                nodeModel.setAttribute('isFavorite', newFavoriteState);
                var editor = args.editor;
                var localStorageController = editor.getLocalStorageController();
                var favorites = localStorageController.getBlockLibraryFavorites();
                var index = favorites.indexOf(blockUid);
                var updateLocalStorage = false;
                if (newFavoriteState && index === -1) {
                    favorites.push(blockUid);
                    updateLocalStorage = true;
                }
                else if (!newFavoriteState && index !== -1) {
                    favorites.splice(index, 1);
                    updateLocalStorage = true;
                }
                if (updateLocalStorage) {
                    localStorageController.setBlockLibraryFavorites(favorites);
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
        // TODO: Hide the category by default and make it visible when a block is added!!!
        // TODO: Check if an options exist in the WUX model to show/hide tree when no child!!!
        /**
         * Creates the categories model.
         * @private
         * @param {string} fullCategoryName - The full category name.
         */
        UIBlockLibraryController.prototype._createCategoriesModel = function (fullCategoryName) {
            var categoryNames = fullCategoryName.split('/');
            var parentNodeModel = this._treeDocument;
            var currentCategoryPath = '';
            categoryNames.forEach(function (categoryName) {
                currentCategoryPath += currentCategoryPath !== '' ? '/' + categoryName : categoryName;
                var categoryNodeModel = UIBlockLibraryController._getCategoryNodeModelFromPath(categoryName, parentNodeModel);
                if (!categoryNodeModel) {
                    var displayName = categoryName;
                    var categoryDoc = BlockLibrary.getCategoryDocumentation(currentCategoryPath);
                    if (categoryDoc) {
                        var name_1 = categoryDoc.getName();
                        displayName = name_1 && name_1 !== '' ? name_1 : displayName;
                    }
                    categoryNodeModel = new WUXTreeNodeModel({
                        label: displayName,
                        icons: [UIFontIcon.getWUXIconFromBlockCategory(currentCategoryPath)],
                        grid: { isBlock: false, value: currentCategoryPath }
                    });
                    parentNodeModel.addChild(categoryNodeModel);
                }
                parentNodeModel = categoryNodeModel;
            });
        };
        /**
         * Creates the blocks model.
         * @private
         * @param {string} fullCategoryName - The full category name.
         */
        UIBlockLibraryController.prototype._createBlocksModel = function (fullCategoryName) {
            var _this = this;
            var parentNodeModel = UIBlockLibraryController._getCategoryNodeModelFromPath(fullCategoryName, this._treeDocument);
            if (parentNodeModel) {
                var hideDefaultGraph = this._editor.getOptions().hideDefaultGraph;
                var blocks = UITools.getSortedBlockByCategory(fullCategoryName, hideDefaultGraph);
                blocks.forEach(function (block) {
                    parentNodeModel.addChild(new WUXTreeNodeModel({
                        label: block.getName(),
                        icons: [{ iconName: '3d-object' }],
                        grid: {
                            isBlock: true,
                            value: block.getUid(),
                            favoriteIcon: _this._favoriteIconCB,
                            isFavorite: false
                        }
                    }));
                });
            }
        };
        /**
         * Gets the category node model from the given path.
         * @private
         * @static
         * @param {string} fullCategoryName - The full category name.
         * @param {WUXTreeNodeModel|WUXTreeDocument} relativeNodeModel - The relative node model.
         * @returns {WUXTreeNodeModel|WUXTreeDocument} The category node model.
         */
        UIBlockLibraryController._getCategoryNodeModelFromPath = function (fullCategoryName, relativeNodeModel) {
            var categoryNodeModel = relativeNodeModel;
            if (fullCategoryName && fullCategoryName !== '') {
                var getCategoryNodeModel = function (parent, path) {
                    return (parent.getChildren() || []).find(function (cn) { return cn.getAttributeValue('value') === path; });
                };
                var categoryNames = fullCategoryName.split('/');
                var currentCategoryPath = '';
                while (categoryNames.length > 0 && categoryNodeModel) {
                    var categoryName = categoryNames.shift();
                    currentCategoryPath += currentCategoryPath !== '' ? '/' + categoryName : categoryName;
                    categoryNodeModel = getCategoryNodeModel(categoryNodeModel, currentCategoryPath);
                }
            }
            return categoryNodeModel;
        };
        /**
         * Loads the favorites blocks from the local storage to the treeDocument.
         * @private
         */
        UIBlockLibraryController.prototype._loadFavorites = function () {
            var localStorageController = this._editor.getLocalStorageController();
            var favorites = localStorageController.getBlockLibraryFavorites();
            this._setFavorites(favorites);
        };
        /**
         * Sets as favorites the provided list of block uids.
         * @private
         * @param {string[]} favorites - The list of block uids.
         */
        UIBlockLibraryController.prototype._setFavorites = function (favorites) {
            if (favorites.length > 0) {
                var childNodes_1 = this._treeDocument.getAllDescendants() || [];
                if (childNodes_1.length > 0) {
                    favorites.forEach(function (blockUid) {
                        var childNode = childNodes_1.find(function (node) { return node.getAttributeValue('value') === blockUid; });
                        if (childNode) {
                            childNode.setAttribute('isFavorite', true);
                        }
                    });
                }
            }
        };
        return UIBlockLibraryController;
    }());
    return UIBlockLibraryController;
});
