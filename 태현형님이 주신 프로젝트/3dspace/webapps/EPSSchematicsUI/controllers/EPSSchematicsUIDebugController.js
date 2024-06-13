/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIDebugController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIDebugController", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIDebugCursor", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphBlock"], function (require, exports, UIDebugCursor, EventServices, ExecutionEvents, UIBlock, UIGraph, UIGraphBlock) {
    "use strict";
    /**
     * This class defines a debug controller.
     * @class UIDebugController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIDebugController
     * @private
     */
    var UIDebugController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         */
        function UIDebugController(editor) {
            this._debugEventsByOrder = [];
            this._debugEventByBlockPath = new Map();
            this._debugCursorByBlockPath = new Map();
            this._parentDebugCursorByGraphBlockPath = new Map();
            this._onDebugBreakCB = this._onDebugBreak.bind(this);
            this._onDebugUnbreakCB = this._onDebugUnbreak.bind(this);
            this._freezeGraphContext = false;
            this._editor = editor;
            EventServices.addListener(ExecutionEvents.DebugBreakEvent, this._onDebugBreakCB);
            EventServices.addListener(ExecutionEvents.DebugUnbreakEvent, this._onDebugUnbreakCB);
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
        UIDebugController.prototype.remove = function () {
            this.clear();
            EventServices.removeListener(ExecutionEvents.DebugBreakEvent, this._onDebugBreakCB);
            EventServices.removeListener(ExecutionEvents.DebugUnbreakEvent, this._onDebugUnbreakCB);
            this._editor = undefined;
            this._debugEventsByOrder = undefined;
            this._debugEventByBlockPath = undefined;
            this._debugCursorByBlockPath = undefined;
            this._parentDebugCursorByGraphBlockPath = undefined;
            this._onDebugBreakCB = undefined;
            this._onDebugUnbreakCB = undefined;
            this._freezeGraphContext = undefined;
        };
        /**
         * Clears the list of debug elements.
         * @public
         */
        UIDebugController.prototype.clear = function () {
            this._removeAllDebugCursors();
            this._removeAllParentDebugCursors();
            this._debugEventsByOrder = [];
            this._debugEventByBlockPath.clear();
            this._debugCursorByBlockPath.clear();
            this._parentDebugCursorByGraphBlockPath.clear();
            this._freezeGraphContext = false;
        };
        /**
         * Gets the debug cursor by block path.
         * @public
         * @param {string} blockPath - The block path.
         * @returns {UIDebugCursor} The debug cursor.
         */
        UIDebugController.prototype.getDebugCursorByBlockPath = function (blockPath) {
            return this._debugCursorByBlockPath.get(blockPath);
        };
        /**
         * Gets the debug cursor at the giving graph context.
         * @public
         * @param {string} path - The graph context path.
         * @returns {UIDebugCursor} The debug cursor.
         */
        UIDebugController.prototype.getDebugCursorByGraphContext = function (path) {
            var debugCursor;
            this._debugCursorByBlockPath.forEach(function (value, key) {
                var index = key.lastIndexOf('.');
                var parentPath = key.substring(0, index);
                if (!debugCursor && index !== -1 && parentPath === path) {
                    debugCursor = value;
                }
            });
            return debugCursor;
        };
        /**
         * On continue callback, called from the play panel.
         * @public
         */
        UIDebugController.prototype.onContinue = function () {
            this._freezeGraphContext = false;
        };
        /**
         * On break all callback, called from the play panel.
         * @public
         */
        UIDebugController.prototype.onBreakAll = function () {
            this._freezeGraphContext = false;
        };
        /**
         * On step over callback, called from the play panel.
         * @public
         * @param {string} contextPath - The context path.
         */
        UIDebugController.prototype.onStepOver = function (contextPath) {
            this._openContextNextDebugCursor(contextPath);
            this._freezeGraphContext = false;
        };
        /**
         * On step into callback, called from the play panel.
         * @public
         * @param {string} contextPath - The context path.
         */
        UIDebugController.prototype.onStepInto = function (contextPath) {
            var mainGraph = this._editor._getViewer().getMainGraph();
            var debugCursor = this.getDebugCursorByGraphContext(contextPath);
            var newContextPath = debugCursor.getBlock().getModel().toPath();
            mainGraph.openGraphBlockFromPath(newContextPath);
            this._freezeGraphContext = true;
        };
        /**
         * On step out callback, called from the play panel.
         * @public
         * @param {string} contextPath - The context path.
         */
        UIDebugController.prototype.onStepOut = function (contextPath) {
            this._openContextNextDebugCursor(contextPath);
            this._freezeGraphContext = false;
        };
        /**
         * The callback on the subGraph opened event.
         * @public
         * @param {UIGraphBlock} graphBlockUI - The UI graph block.
         */
        UIDebugController.prototype.onSubGraphOpened = function (graphBlockUI) {
            var _this = this;
            var graphBlockPath = graphBlockUI.getModel().toPath();
            this._debugEventByBlockPath.forEach(function (value, key) {
                if (graphBlockPath !== key && key.startsWith(graphBlockPath)) {
                    var nextBlockList = key.replace(graphBlockPath + '.', '').split('.') || [];
                    var nextBlockPath = graphBlockPath + '.' + nextBlockList[0];
                    _this._createParentDebugCursor(nextBlockPath);
                    _this._createDebugCursor(key);
                }
            });
        };
        /**
         * The callback on the subGraph removed event.
         * @public
         * @param {UIGraphBlock} graphBlockUI - The UI graph block.
         */
        UIDebugController.prototype.onSubGraphRemoved = function (graphBlockUI) {
            var _this = this;
            var graphBlockPath = graphBlockUI.getModel().toPath();
            // Remove the debug cursor from the block in previous graph view
            this._debugCursorByBlockPath.forEach(function (value, key) {
                if (graphBlockPath !== key && key.startsWith(graphBlockPath)) {
                    _this._removeDebugCursor(key);
                }
            });
            // Remove parent debug cursor from the graph block in the previous graph view
            this._parentDebugCursorByGraphBlockPath.forEach(function (value, key) {
                if (key.startsWith(graphBlockPath)) {
                    _this._removeParentDebugCursor(key);
                }
            });
            // Create the parent debug cursor on the graph block in the current graph view
            this._debugEventByBlockPath.forEach(function (value, key) {
                if (graphBlockPath !== key && key.startsWith(graphBlockPath)) {
                    _this._createParentDebugCursor(graphBlockPath);
                }
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
         * The callback on the debug break event.
         * @private
         * @param {DebugBreakEvent} event - The debug break event.
         */
        UIDebugController.prototype._onDebugBreak = function (event) {
            var blockPath = event.getPath();
            this._focusOnGraph(UIDebugController._getParentPath(blockPath));
            this._createDebugCursor(blockPath);
            this._registerDebugEvent(event);
        };
        /**
         * The callback on the debug unbreak event.
         * @private
         * @param {DebugUnbreakEvent} event - The debug unbreak event.
         */
        UIDebugController.prototype._onDebugUnbreak = function (event) {
            var _this = this;
            var blockPath = event.getPath();
            this._removeDebugCursor(blockPath);
            // Remove parent debug cursor
            this._parentDebugCursorByGraphBlockPath.forEach(function (value, key) {
                if (blockPath.startsWith(key)) {
                    _this._removeParentDebugCursor(key);
                }
            });
            this._registerDebugEvent(event);
        };
        /**
         * Registers the provided event.
         * @private
         * @param {DebugEvent} event - The debug event.
         */
        UIDebugController.prototype._registerDebugEvent = function (event) {
            this._debugEventsByOrder.push(event);
            var blockPath = event.getPath();
            if (event instanceof ExecutionEvents.DebugBreakEvent) {
                this._debugEventByBlockPath.set(blockPath, event);
            }
            else {
                this._debugEventByBlockPath.delete(blockPath);
            }
        };
        /**
         * Creates a debug cursor for the provided block path.
         * @private
         * @param {string} blockPath - The block path.
         */
        UIDebugController.prototype._createDebugCursor = function (blockPath) {
            if (!this._debugCursorByBlockPath.has(blockPath)) {
                var rootGraph = this._editor.getViewerController().getRootViewer().getMainGraph();
                var elementUI = rootGraph.getObjectFromPath(blockPath);
                if (elementUI instanceof UIBlock) {
                    this._debugCursorByBlockPath.set(blockPath, new UIDebugCursor(elementUI, false));
                }
            }
        };
        /**
         * Removes the debug cursor for the provided block path.
         * @private
         * @param {string} blockPath - The block path.
         */
        UIDebugController.prototype._removeDebugCursor = function (blockPath) {
            var debugCursor = this._debugCursorByBlockPath.get(blockPath);
            if (debugCursor) {
                debugCursor.remove();
                this._debugCursorByBlockPath.delete(blockPath);
            }
        };
        /**
         * Removes all the debug cursors.
         * @private
         */
        UIDebugController.prototype._removeAllDebugCursors = function () {
            var _this = this;
            this._debugCursorByBlockPath.forEach(function (value, key) { return _this._removeDebugCursor(key); });
        };
        /**
         * Creates a parent debug cursor for the provided graph block path.
         * @private
         * @param {string} graphBlockPath - The graph block path.
         */
        UIDebugController.prototype._createParentDebugCursor = function (graphBlockPath) {
            if (!this._parentDebugCursorByGraphBlockPath.has(graphBlockPath)) {
                var rootGraph = this._editor.getViewerController().getRootViewer().getMainGraph();
                var graphBlockUI = rootGraph.getObjectFromPath(graphBlockPath);
                if (graphBlockUI instanceof UIGraph) {
                    graphBlockUI = graphBlockUI.getBlockView();
                }
                if (graphBlockUI instanceof UIGraphBlock) {
                    this._parentDebugCursorByGraphBlockPath.set(graphBlockPath, new UIDebugCursor(graphBlockUI, true));
                }
            }
        };
        /**
         * Removes the parent debug cursor for the provided graph block path.
         * @private
         * @param {string} graphBlockPath - THe graph block path.
         * @param {boolean} force - True to force the removal, false to decrease ref counter.
         */
        UIDebugController.prototype._removeParentDebugCursor = function (graphBlockPath) {
            var debugCursor = this._parentDebugCursorByGraphBlockPath.get(graphBlockPath);
            if (debugCursor) {
                debugCursor.remove();
                this._parentDebugCursorByGraphBlockPath.delete(graphBlockPath);
            }
        };
        /**
         * Removes all the parent debug cursors.
         * @private
         */
        UIDebugController.prototype._removeAllParentDebugCursors = function () {
            var _this = this;
            this._parentDebugCursorByGraphBlockPath.forEach(function (value, key) { return _this._removeParentDebugCursor(key); });
        };
        /**
         * Focusses on the given graph path.
         * @private
         * @param {string} graphPath - The graph path.
         */
        UIDebugController.prototype._focusOnGraph = function (graphPath) {
            if (!this._freezeGraphContext) {
                var rootGraph = this._editor.getViewerController().getRootViewer().getMainGraph();
                rootGraph.openGraphBlockFromPath(graphPath);
                this._freezeGraphContext = true;
            }
        };
        /**
         * Opens context next debug cursor.
         * @private
         * @param {string} contextPath - The context path.
         */
        UIDebugController.prototype._openContextNextDebugCursor = function (contextPath) {
            var mainGraph = this._editor._getViewer().getMainGraph();
            var currentContextPath = contextPath;
            var newContextPath = '';
            var debugCursorFound = false;
            while (currentContextPath !== '' && !debugCursorFound) {
                newContextPath = currentContextPath;
                debugCursorFound = newContextPath !== contextPath && this.getDebugCursorByGraphContext(newContextPath) !== undefined;
                if (!debugCursorFound) {
                    currentContextPath = UIDebugController._getParentPath(newContextPath);
                }
            }
            mainGraph.openGraphBlockFromPath(newContextPath);
        };
        /**
         * Gets the parent graph block path.
         * @private
         * @static
         * @param {string} path - The path of the block.
         * @returns {string} The parent graph block path.
         */
        UIDebugController._getParentPath = function (path) {
            return path.split('.').slice(0, -1).join('.');
        };
        return UIDebugController;
    }());
    return UIDebugController;
});
