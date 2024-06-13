/*global WUXDockAreaEnum */
/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIPanelStateController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIPanelStateController", ["require", "exports", "DS/EPSSchematicsUI/EPSSchematicsUIEnums"], function (require, exports, UIEnums) {
    "use strict";
    /**
     * This class defines the UI panel state controller.
     * @class UIPanelStateController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIPanelStateController
     * @private
     */
    var UIPanelStateController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         */
        function UIPanelStateController(editor) {
            this._panels = [];
            this._panelStateMap = new Map();
            this._dockingStateMap = new Map();
            this._editor = editor;
            this._panels = [
                this._editor.getBlockLibraryPanel(),
                this._editor.getTypeLibraryPanel(),
                this._editor.getHistoryPanel(),
                this._editor.getNodeIdSelectorsPanel(),
                this._editor.getDebugConsolePanel()
            ];
            this._dockingElements = [
                this._editor.getImmersiveFrame().getDockingElement(WUXDockAreaEnum.LeftDockArea),
                this._editor.getImmersiveFrame().getDockingElement(WUXDockAreaEnum.RightDockArea),
                this._editor.getImmersiveFrame().getDockingElement(WUXDockAreaEnum.BottomDockArea)
            ];
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
        UIPanelStateController.prototype.remove = function () {
            this._panelStateMap.clear();
            this._dockingStateMap.clear();
            this._editor = undefined;
            this._panels = undefined;
            this._dockingElements = undefined;
            this._panelStateMap = undefined;
            this._dockingStateMap = undefined;
        };
        /**
         * Initializes the state of each panel.
         * @public
         */
        UIPanelStateController.prototype.initialize = function () {
            var _this = this;
            var viewModes = [UIEnums.EViewMode.eEdit, UIEnums.EViewMode.ePlay, UIEnums.EViewMode.eDebug];
            viewModes.forEach(function (viewMode) {
                _this._dockingElements.forEach(function (dockingElement) { return _this._storeDockingElementState(dockingElement, viewMode); });
                _this._panels.forEach(function (panel) { return _this._storePanelState(panel, viewMode); });
            });
            var playPanel = this._editor.getPlayPanel();
            if (playPanel !== undefined) {
                var wuxPlayPanel_1 = playPanel.getWUXPanel();
                var playPanelStates_1 = {};
                Object.keys(UIEnums.EViewMode).forEach(function (viewMode) {
                    playPanelStates_1[UIEnums.EViewMode[viewMode]] = {
                        width: wuxPlayPanel_1.width,
                        height: wuxPlayPanel_1.height,
                        position: Object.assign({}, wuxPlayPanel_1.position),
                        visibleFlag: true,
                        currentDockArea: wuxPlayPanel_1.currentDockArea
                    };
                });
                playPanelStates_1[UIEnums.EViewMode.eEdit].visibleFlag = false;
                playPanelStates_1[UIEnums.EViewMode.ePlay].debugCommandsVisibleFlag = false;
                playPanelStates_1[UIEnums.EViewMode.eDebug].debugCommandsVisibleFlag = true;
                this._panelStateMap.set(playPanel, playPanelStates_1);
            }
            this.restorePanelStates(UIEnums.EViewMode.eEdit);
        };
        /**
         * Stores each panels states.
         * @public
         * @param {EViewMode} viewMode - The view mode to store.
         */
        UIPanelStateController.prototype.storePanelStates = function (viewMode) {
            var _this = this;
            this._dockingElements.forEach(function (dockingElement) { return _this._storeDockingElementState(dockingElement, viewMode); });
            this._panels.forEach(function (panel) { return _this._storePanelState(panel, viewMode); });
            // Store play panel states
            var playPanel = this._editor.getPlayPanel();
            if (playPanel !== undefined) {
                var playPanelStates = this._panelStateMap.get(playPanel);
                var wuxPanel = playPanel.getWUXPanel();
                playPanelStates[viewMode] = {
                    width: wuxPanel.width,
                    height: wuxPanel.height,
                    position: Object.assign({}, wuxPanel.position),
                    visibleFlag: wuxPanel.visibleFlag,
                    currentDockArea: wuxPanel.currentDockArea,
                    debugCommandsVisibleFlag: playPanel.getDebugCommandsVisibleFlag()
                };
                this._panelStateMap.set(playPanel, playPanelStates);
            }
        };
        /**
         * Restores each panels states to the provided view mode.
         * @public
         * @param {EViewMode} viewMode - The view mode to restore.
         */
        UIPanelStateController.prototype.restorePanelStates = function (viewMode) {
            var _this = this;
            this._dockingElements.forEach(function (dockingElement) { return _this._restoreDockingElementState(dockingElement, viewMode); });
            this._panels.forEach(function (panel) { return _this._restorePanelState(panel, viewMode); });
            // Restore play panel states
            var playPanel = this._editor.getPlayPanel();
            if (playPanel !== undefined) {
                var playPanelStates = this._panelStateMap.get(playPanel);
                if (playPanelStates !== undefined) {
                    var playPanelState = playPanelStates[viewMode];
                    if (playPanelState !== undefined) {
                        var wuxPlayPanel = playPanel.getWUXPanel();
                        playPanel.setDebugCommandsVisibleFlag(playPanelState.debugCommandsVisibleFlag);
                        wuxPlayPanel.currentDockArea = playPanelState.currentDockArea;
                        wuxPlayPanel.width = playPanelState.width;
                        wuxPlayPanel.height = playPanelState.height;
                        wuxPlayPanel.position = Object.assign({}, playPanelState.position);
                        wuxPlayPanel.visibleFlag = playPanelState.visibleFlag;
                    }
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
         * Stores the provided panel state.
         * @private
         * @param {UIPanel} panel - The UI panel.
          *@param {UIEnums.EViewMode} viewMode - The view mode to store.
         */
        UIPanelStateController.prototype._storePanelState = function (panel, viewMode) {
            if (panel !== undefined) {
                var panelStates = this._panelStateMap.get(panel) || {};
                var wuxPanel = panel.getWUXPanel();
                var state = { isPanelVisible: panel.isOpen() && wuxPanel.visibleFlag };
                if (state.isPanelVisible) {
                    state.width = wuxPanel.width;
                    state.height = wuxPanel.height;
                    state.position = Object.assign({}, wuxPanel.position);
                    state.visibleFlag = wuxPanel.visibleFlag;
                    state.currentDockArea = wuxPanel.currentDockArea;
                    state.activeFlag = wuxPanel.activeFlag;
                }
                panelStates[viewMode] = state;
                this._panelStateMap.set(panel, panelStates);
            }
        };
        /**
         * Restores the panel state to the provided view mode.
         * @private
         * @param {UIPanel} panel - The UI panel.
          *@param {UIEnums.EViewMode} viewMode - The view mode to restore.
         */
        UIPanelStateController.prototype._restorePanelState = function (panel, viewMode) {
            if (panel !== undefined) {
                var panelStates = this._panelStateMap.get(panel);
                if (panelStates !== undefined) {
                    var panelState = panelStates[viewMode];
                    if (panelState !== undefined) {
                        if (panelState.isPanelVisible) {
                            if (!panel.isOpen()) {
                                panel.open();
                            }
                            var wuxPanel = panel.getWUXPanel();
                            wuxPanel.visibleFlag = true;
                            wuxPanel.currentDockArea = panelState.currentDockArea;
                            wuxPanel.width = panelState.width;
                            wuxPanel.height = panelState.height;
                            wuxPanel.position = Object.assign({}, panelState.position);
                            if (panelState.activeFlag) {
                                wuxPanel.activeFlag = true;
                                //panel.panel.ensureVisible();
                            }
                        }
                        else if (panel.isOpen()) {
                            panel.getWUXPanel().visibleFlag = false;
                        }
                    }
                }
            }
        };
        /**
         * Stores each docking element states.
         * @private
         * @param {DockingElement} dockingElement - The docking element.
         * @param {UIEnums.EViewMode} viewMode - The view mode to store.
         */
        UIPanelStateController.prototype._storeDockingElementState = function (dockingElement, viewMode) {
            if (dockingElement !== undefined) {
                var dockingElementStates = this._dockingStateMap.get(dockingElement) || {};
                dockingElementStates[viewMode] = {
                    dockingZoneSize: dockingElement.dockingZoneSize,
                    collapseDockingZoneFlag: dockingElement.collapseDockingZoneFlag
                };
                this._dockingStateMap.set(dockingElement, dockingElementStates);
            }
        };
        /**
         * Restores each dockign element states to the provided view mode.
         * @private
         * @param {DockingElement} dockingElement - The docking element.
         * @param {UIEnums.EViewMode} viewMode - The view mode to restore.
         */
        UIPanelStateController.prototype._restoreDockingElementState = function (dockingElement, viewMode) {
            if (dockingElement !== undefined) {
                var dockingElementStates = this._dockingStateMap.get(dockingElement);
                if (dockingElementStates !== undefined) {
                    var dockingElementState = dockingElementStates[viewMode];
                    if (dockingElementState !== undefined) {
                        dockingElement.dockingZoneSize = dockingElementState.dockingZoneSize;
                        dockingElement.collapseDockingZoneFlag = dockingElementState.collapseDockingZoneFlag;
                    }
                }
            }
        };
        return UIPanelStateController;
    }());
    return UIPanelStateController;
});
