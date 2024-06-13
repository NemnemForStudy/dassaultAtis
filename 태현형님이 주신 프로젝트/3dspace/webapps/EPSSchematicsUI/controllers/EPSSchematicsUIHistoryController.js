/* global WUXManagedFontIcons */
/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIHistoryController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIHistoryController", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeDocument", "DS/EPSSchematicsUI/data/EPSSchematicsUIHistoryAction", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockControlPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockDataPort", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIComment", "DS/EPSSchematicsUI/edges/EPSSchematicsUIControlLink", "DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink", "DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphControlPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphEventPort", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIPersistentLabel", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIShortcut", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents"], function (require, exports, WUXTreeDocument, UIHistoryAction, UIBlock, UIBlockControlPort, UIBlockDataPort, UIComment, UIControlLink, UIDataLink, UIGraph, UIGraphControlPort, UIGraphDataPort, UIGraphEventPort, UIPersistentLabel, UIShortcut, WUXTreeNodeModel, UIEvents) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: Manage remove action of a sub data port deletion (data split) !
    // TODO: Manage templates !
    // TODO: Manage framebreak control link edition !
    // TODO: Manage create graph & csi graph from selection !
    // TODO: Manage loading json graph !
    // TODO: Manage link rerouting !
    // TODO: Manage control link shape modification !
    // TODO: Merge all the register methods into on big registerAction method!
    /**
     * This class defines a UI history controller.
     * @private
     * @class UIHistoryController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIHistoryController
     */
    var UIHistoryController = /** @class */ (function () {
        /**
         * @public
         * @constructor
         * @param {UIEditor} editor - The schematics editor.
         */
        function UIHistoryController(editor) {
            this._editor = editor;
            this._treeDocument = new WUXTreeDocument({ useAsyncPreExpand: true });
            this._currentIndex = undefined;
            this._maxStackLength = Infinity;
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
         * Removes the controller.
         * @public
         */
        UIHistoryController.prototype.remove = function () {
            if (this._treeDocument !== undefined) {
                this._treeDocument.removeRoots();
                this._treeDocument = undefined;
            }
            this._editor = undefined;
            this._currentIndex = undefined;
            this._maxStackLength = undefined;
        };
        /**
         * Gets the controller tree document.
         * @public
         * @returns {WUXTreeDocument} The tree document.
         */
        UIHistoryController.prototype.getTreeDocument = function () {
            return this._treeDocument;
        };
        /**
         * Gets the maximum history stack length.
         * @public
         * @returns {number} maxStackLength - The maximum history stack length.
         */
        UIHistoryController.prototype.getMaxStackLength = function () {
            return this._maxStackLength;
        };
        /**
         * Sets the maximum history stack length.
         * @public
         * @param {number} maxStackLength - The maximum history stack length.
         */
        UIHistoryController.prototype.setMaxStackLength = function (maxStackLength) {
            this._maxStackLength = maxStackLength;
        };
        /**
         * Moves one step backward into the history stack.
         * @public
         */
        UIHistoryController.prototype.back = function () {
            if (!this.isFirstIndex()) {
                this._currentIndex--;
                this._applyCurrentState();
            }
        };
        /**
         * Moves one step forward into the history stack.
         * @public
         */
        UIHistoryController.prototype.forward = function () {
            if (!this.isLastIndex()) {
                this._currentIndex++;
                this._applyCurrentState();
            }
        };
        /**
         * Checks if the current index is in first position.
         * @public
         * @returns {boolean} True if this is the first index else false.
         */
        UIHistoryController.prototype.isFirstIndex = function () {
            return this._currentIndex <= 0;
        };
        /**
         * Checks if the current index is in last position.
         * @public
         * @returns {boolean} True if this is the last index else false.
         */
        UIHistoryController.prototype.isLastIndex = function () {
            return this._currentIndex >= this._treeDocument.getRoots().length - 1;
        };
        /**
         * Sets the current index.
         * @public
         * @param {number} index - The current index.
         */
        UIHistoryController.prototype.setCurrentIndex = function (index) {
            if (index !== this._currentIndex) {
                this._currentIndex = index;
                this._applyCurrentState();
            }
        };
        /**
         * Gets the current index.
         * @public
         * @returns {number} The current index.
         */
        UIHistoryController.prototype.getCurrentIndex = function () {
            return this._currentIndex;
        };
        /**
         * Registers a create new graph action.
         * @public
         */
        UIHistoryController.prototype.registerCreateNewGraphAction = function () {
            this._pushState(UIHistoryAction.eCreateGraph);
        };
        /**
         * Registers a clear graph action.
         * @public
         */
        UIHistoryController.prototype.registerClearGraphAction = function () {
            this._pushState(UIHistoryAction.eClearGraph);
        };
        /**
         * Registers a load graph action.
         * @public
         */
        UIHistoryController.prototype.registerLoadGraphAction = function () {
            this._pushState(UIHistoryAction.eLoadGraph);
        };
        /**
         * Registers a viewer change action.
         * @public
         */
        UIHistoryController.prototype.registerViewerChangeAction = function () {
            this._pushState(UIHistoryAction.eChangeViewer);
        };
        /**
         * Registers a create custom type action.
         * @public
         */
        UIHistoryController.prototype.registerCreateCustomTypeAction = function () {
            this._pushState(UIHistoryAction.eCreateCustomType);
        };
        /**
         * Registers a remove custom type action.
         * @public
         */
        UIHistoryController.prototype.registerRemoveCustomTypeAction = function () {
            this._pushState(UIHistoryAction.eRemoveCustomType);
        };
        /**
         * Registers an edit custom type action.
         * @public
         */
        UIHistoryController.prototype.registerEditCustomTypeAction = function () {
            this._pushState(UIHistoryAction.eEditCustomType);
        };
        /**
         * Registers a show optional data port action.
         * @public
         */
        UIHistoryController.prototype.registerShowOptionalDataPortAction = function () {
            this._pushState(UIHistoryAction.eShowOptionalDataPort);
        };
        /**
         * Registers a hide optional data port action.
         * @public
         */
        UIHistoryController.prototype.registerHideOptionalDataPortAction = function () {
            this._pushState(UIHistoryAction.eHideOptionalDataPort);
        };
        /**
         * Registers a create nodeId selector action.
         * @public
         */
        UIHistoryController.prototype.registerCreateNodeIdSelectorAction = function () {
            this._pushState(UIHistoryAction.eCreateNodeIdSelector);
        };
        /**
         * Registers a remove nodeId selector action.
         * @public
         */
        UIHistoryController.prototype.registerRemoveNodeIdSelectorAction = function () {
            this._pushState(UIHistoryAction.eRemoveNodeIdSelector);
        };
        /**
         * Registers an edit nodeId selector action.
         * @public
         */
        UIHistoryController.prototype.registerEditNodeIdSelectorAction = function () {
            this._pushState(UIHistoryAction.eEditNodeIdSelector);
        };
        /**
         * Registers a create action.
         * @public
         * @param {*} elementUI - The created element.
         */
        UIHistoryController.prototype.registerCreateAction = function (elementUI) {
            if (elementUI instanceof UIBlock) {
                this._pushState(UIHistoryAction.eCreateBlock);
            }
            else if (elementUI instanceof UIControlLink) {
                this._pushState(UIHistoryAction.eCreateControlLink);
            }
            else if (elementUI instanceof UIDataLink) {
                this._pushState(UIHistoryAction.eCreateDataLink);
            }
            else if (elementUI instanceof UIGraphControlPort) {
                if (elementUI instanceof UIGraphEventPort) {
                    this._pushState(UIHistoryAction.eCreateGraphEventPort);
                }
                else {
                    this._pushState(UIHistoryAction.eCreateGraphControlPort);
                }
            }
            else if (elementUI instanceof UIGraphDataPort) {
                this._pushState(UIHistoryAction.eCreateGraphDataPort);
            }
            else if (elementUI instanceof UIShortcut) {
                this._pushState(UIHistoryAction.eCreateShortcut);
            }
            else if (elementUI instanceof UIBlockDataPort) {
                this._pushState(UIHistoryAction.eCreateBlockDataPort);
            }
            else if (elementUI instanceof UIBlockControlPort) {
                this._pushState(UIHistoryAction.eCreateBlockControlPort);
            }
            else if (elementUI instanceof UIPersistentLabel) {
                this._pushState(UIHistoryAction.eCreatePersistentLabel);
            }
            else if (elementUI instanceof UIComment) {
                this._pushState(UIHistoryAction.eCreateComment);
            }
        };
        /**
         * Registers a remove action.
         * @public
         * @param {Array<*>} elementsUI - The list of elements to remove.
         */
        UIHistoryController.prototype.registerRemoveAction = function (elementsUI) {
            if (Array.isArray(elementsUI)) {
                if (elementsUI.length === 1) {
                    var elementUI = elementsUI[0];
                    if (elementUI instanceof UIBlock) {
                        this._pushState(UIHistoryAction.eRemoveBlock);
                    }
                    else if (elementUI instanceof UIControlLink) {
                        this._pushState(UIHistoryAction.eRemoveControlLink);
                    }
                    else if (elementUI instanceof UIDataLink) {
                        this._pushState(UIHistoryAction.eRemoveDataLink);
                    }
                    else if (elementUI instanceof UIGraphControlPort) {
                        if (elementUI instanceof UIGraphEventPort) {
                            this._pushState(UIHistoryAction.eRemoveGraphEventPort);
                        }
                        else {
                            this._pushState(UIHistoryAction.eRemoveGraphControlPort);
                        }
                    }
                    else if (elementUI instanceof UIGraphDataPort) {
                        this._pushState(UIHistoryAction.eRemoveGraphDataPort);
                    }
                    else if (elementUI instanceof UIBlockControlPort) {
                        this._pushState(UIHistoryAction.eRemoveBlockControlPort);
                    }
                    else if (elementUI instanceof UIBlockDataPort) {
                        this._pushState(UIHistoryAction.eRemoveBlockDataPort);
                    }
                    else if (elementUI instanceof UIShortcut) {
                        this._pushState(UIHistoryAction.eRemoveShortcut);
                    }
                    else if (elementUI instanceof UIPersistentLabel) {
                        this._pushState(UIHistoryAction.eRemovePersistentLabel);
                    }
                    else if (elementUI instanceof UIComment) {
                        this._pushState(UIHistoryAction.eRemoveComment);
                    }
                }
                else {
                    this._pushState(UIHistoryAction.eRemoveSelection);
                }
            }
        };
        /**
         * Registers an edit action.
         * @public
         * @param {*} elementUI - The edited element.
         */
        UIHistoryController.prototype.registerEditAction = function (elementUI) {
            if (elementUI instanceof UIGraph) {
                this._pushState(UIHistoryAction.eEditGraph);
            }
            else if (elementUI instanceof UIBlock) {
                this._pushState(UIHistoryAction.eEditBlock);
            }
            else if (elementUI instanceof UIGraphControlPort) {
                this._pushState(UIHistoryAction.eEditGraphControlPort);
            }
            else if (elementUI instanceof UIGraphDataPort) {
                this._pushState(UIHistoryAction.eEditGraphDataPort);
            }
            else if (elementUI instanceof UIBlockControlPort) {
                this._pushState(UIHistoryAction.eEditBlockControlPort);
            }
            else if (elementUI instanceof UIBlockDataPort) {
                this._pushState(UIHistoryAction.eEditBlockDataPort);
            }
            else if (elementUI instanceof UIComment) {
                this._pushState(UIHistoryAction.eEditComment);
            }
        };
        /**
         * Registers a resize action.
         * @public
         * @param {UINode} elementUI - The resized element.
         */
        UIHistoryController.prototype.registerResizeAction = function (elementUI) {
            if (elementUI instanceof UIPersistentLabel) {
                this._pushState(UIHistoryAction.eResizePersistentLabel);
            }
            else if (elementUI instanceof UIComment) {
                this._pushState(UIHistoryAction.eResizeComment);
            }
        };
        /**
         * Registers a move action.
         * @public
         * @param {Array<*>} elementsUI - The list of moved elements.
         */
        UIHistoryController.prototype.registerMoveAction = function (elementsUI) {
            if (Array.isArray(elementsUI)) {
                if (elementsUI.length === 1) {
                    var elementUI = elementsUI[0];
                    if (elementUI instanceof UIBlock) {
                        this._pushState(UIHistoryAction.eMoveBlock);
                    }
                    else if (elementUI instanceof UIShortcut) {
                        this._pushState(UIHistoryAction.eMoveShortcut);
                    }
                    else if (elementUI instanceof UIGraphControlPort) {
                        if (elementUI instanceof UIGraphEventPort) {
                            this._pushState(UIHistoryAction.eMoveGraphEventPort);
                        }
                        else {
                            this._pushState(UIHistoryAction.eMoveGraphControlPort);
                        }
                    }
                    else if (elementUI instanceof UIGraph) {
                        this._pushState(UIHistoryAction.eMoveGraph);
                    }
                    else if (elementUI instanceof UIPersistentLabel) {
                        this._pushState(UIHistoryAction.eMovePersistentLabel);
                    }
                    else if (elementUI instanceof UIComment) {
                        this._pushState(UIHistoryAction.eMoveComment);
                    }
                }
                else {
                    this._pushState(UIHistoryAction.eMoveSelection);
                }
            }
        };
        /**
         * Registers a data port type edition action.
         * @public
         * @param {UIDataPort[]} elementsUI - The list of edited data ports.
         */
        UIHistoryController.prototype.registerEditDataPortTypeAction = function (elementsUI) {
            if (elementsUI.length > 0) {
                if (elementsUI.length === 1) {
                    this._pushState(UIHistoryAction.eEditDataPortType);
                }
                else {
                    this._pushState(UIHistoryAction.eEditDataPortTypeSelection);
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
         * Pushes a new history state.
         * @private
         * @param {UIHistoryAction} action - The history action value.
         */
        UIHistoryController.prototype._pushState = function (action) {
            var _this = this;
            var roots = this._treeDocument.getRoots();
            var currentJSONGraph = this._editor.getContent();
            var previousAction = roots[this._currentIndex];
            var previousJSONGraph = previousAction ? previousAction.getAttributeValue('jsonGraph') : undefined;
            if (currentJSONGraph !== previousJSONGraph || action === UIHistoryAction.eChangeViewer) {
                // Remove nodes after current index
                if (this._currentIndex < roots.length - 1) {
                    var removeNodes = roots.slice(this._currentIndex + 1);
                    removeNodes.forEach(function (node) { return _this._treeDocument.removeRoot(node); });
                }
                // Remove first node is the maximum stack length is reached
                roots = this._treeDocument.getRoots();
                if (roots.length >= this._maxStackLength) {
                    this._treeDocument.removeRoot(roots[0]);
                }
                var currentGraphPath = this._editor.getViewerController().getCurrentViewer().getMainGraph().getModel().toPath();
                var nodeModel = new WUXTreeNodeModel({
                    grid: {
                        actionValue: action,
                        actionName: UIHistoryAction.getShortHelp(action),
                        currentIcon: { iconName: 'arrow-right', fontIconFamily: WUXManagedFontIcons.FontAwesome },
                        isCurrent: false,
                        isDisabled: false,
                        actionIcon: UIHistoryAction.getIcon(action),
                        jsonGraph: currentJSONGraph,
                        graphPath: currentGraphPath,
                        date: Date.now()
                    }
                });
                this._treeDocument.addRoot(nodeModel);
                this._currentIndex = this._treeDocument.getRoots().length - 1;
                this._updateCurrentState();
            }
        };
        /**
         * Updates the current state.
         * @private
         */
        UIHistoryController.prototype._updateCurrentState = function () {
            var _this = this;
            var roots = this._treeDocument.getRoots();
            roots.forEach(function (node, index) {
                node.setAttribute('isCurrent', index === _this._currentIndex);
                node.setAttribute('isDisabled', index > _this._currentIndex);
            });
            this._editor.dispatchEvent(new UIEvents.UIHistoryControllerUpdateEvent());
        };
        /**
         * Applies the current history state.
         * @private
         */
        UIHistoryController.prototype._applyCurrentState = function () {
            var currentNode = this._treeDocument.getRoots()[this._currentIndex];
            var jsonGraph = currentNode.getAttributeValue('jsonGraph');
            var graphPath = currentNode.getAttributeValue('graphPath');
            var viewer = this._editor._getViewer();
            var vpt = viewer.getViewpoint();
            this._editor.getViewerController().removeAllViewers();
            viewer.getMainGraph().removeAllPersitentLabels();
            viewer.load(jsonGraph);
            viewer.getMainGraph().openGraphBlockFromPath(graphPath);
            viewer.setViewpoint(vpt); // useful to apply a vpt from a root graph to a subgraph !!????
            this._updateCurrentState();
        };
        return UIHistoryController;
    }());
    return UIHistoryController;
});
