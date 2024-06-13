/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUITabViewSwitcher'/>
define("DS/EPSSchematicsUI/components/EPSSchematicsUITabViewSwitcher", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/EPSSchematicsUIEnums", "css!DS/EPSSchematicsUI/css/components/EPSSchematicsUITabViewSwitcher"], function (require, exports, UIDom, UIFontIcon, UIEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI tab view switcher.
     * @class UITabViewSwitcher
     * @alias module:DS/EPSSchematicsUI/components/EPSSchematicsUITabViewSwitcher
     * @private
     */
    var UITabViewSwitcher = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor The UI editor.
         */
        function UITabViewSwitcher(editor) {
            this._editor = editor;
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
        UITabViewSwitcher.prototype.remove = function () {
            this._editor = undefined;
            this._tabFrame = undefined;
            this._tabContainer = undefined;
            this._editTab = undefined;
            this._playTab = undefined;
            this._debugTab = undefined;
            this._currentViewMode = undefined;
            this._currentActiveTab = undefined;
        };
        /**
         * Sets the edit active tab.
         * @public
         */
        UITabViewSwitcher.prototype.setEditActiveTab = function () {
            this._onTabClick(this._editTab);
        };
        /**
         * Gets the current view mode.
         * @public
         * @returns {UIEnums.EViewMode} The current view mode.
         */
        UITabViewSwitcher.prototype.getCurrentViewMode = function () {
            return this._currentViewMode;
        };
        /**
         * Checks if the current view is the debug view.
         * @public
         * @returns {boolean} Whether the current view is the debug view.
         */
        UITabViewSwitcher.prototype.isDebugActiveTab = function () {
            return this._currentViewMode === UIEnums.EViewMode.eDebug;
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
         * Initializes the component.
         * @private
         */
        UITabViewSwitcher.prototype._initialize = function () {
            var _this = this;
            this._tabFrame = UIDom.createElement('div', { className: 'sch-tabview-frame', parent: this._editor.getDomElement() });
            this._tabContainer = UIDom.createElement('ul', { className: 'sch-tabview-container', parent: this._tabFrame });
            this._editTab = UIDom.createElement('li', {
                className: ['sch-tabview-element', 'sch-tabview-edit', 'active'],
                parent: this._tabContainer,
                children: [
                    UIFontIcon.createFAFontIcon('pencil', { className: [UIFontIcon.getWUXFAClassName('lg')] }),
                    UIDom.createElement('span', { textContent: 'Edit' })
                ],
                onclick: function () { return _this._onTabClick(_this._editTab); },
                tooltipInfos: { shortHelp: 'Switch to edit mode' }
            });
            this._playTab = UIDom.createElement('li', {
                className: ['sch-tabview-element', 'sch-tabview-play'],
                parent: this._tabContainer,
                children: [
                    UIFontIcon.createFAFontIcon('play-circle', { className: [UIFontIcon.getWUXFAClassName('lg')] }),
                    UIDom.createElement('span', { textContent: 'Play' })
                ],
                onclick: function () { return _this._onTabClick(_this._playTab); },
                tooltipInfos: { shortHelp: 'Switch to play mode' }
            });
            this._debugTab = UIDom.createElement('li', {
                className: ['sch-tabview-element', 'sch-tabview-debug'],
                parent: this._tabContainer,
                children: [
                    UIFontIcon.createFAFontIcon('bug', { className: [UIFontIcon.getWUXFAClassName('lg')] }),
                    UIDom.createElement('span', { textContent: 'Debug' })
                ],
                onclick: function () { return _this._onTabClick(_this._debugTab); },
                tooltipInfos: { shortHelp: 'Switch to debug mode' }
            });
            this._updateTabFrameColor();
        };
        /**
         * Updates the tab frame color.
         * @private
         */
        UITabViewSwitcher.prototype._updateTabFrameColor = function () {
            var classNames = ['sch-activetab-edit', 'sch-activetab-play', 'sch-activetab-debug'];
            UIDom.removeClassName(this._editor.getImmersiveFrame().getContent(), classNames);
            var activeClassName;
            if (this._currentViewMode === UIEnums.EViewMode.eEdit) {
                activeClassName = 'sch-activetab-edit';
            }
            else if (this._currentViewMode === UIEnums.EViewMode.ePlay) {
                activeClassName = 'sch-activetab-play';
            }
            else if (this._currentViewMode === UIEnums.EViewMode.eDebug) {
                activeClassName = 'sch-activetab-debug';
            }
            UIDom.addClassName(this._editor.getImmersiveFrame().getContent(), activeClassName);
        };
        /**
         * The callback on the tab click.
         * @private
         * @param {HTMLLIElement} tab - The clicked tab.
         */
        UITabViewSwitcher.prototype._onTabClick = function (tab) {
            if (tab !== this._currentActiveTab) {
                var panelStateController = this._editor.getPanelStateController();
                panelStateController.storePanelStates(this._currentViewMode);
                var options = this._editor.getOptions().tabViewMode;
                var clickCB = void 0;
                if (tab === this._editTab) {
                    this._currentViewMode = UIEnums.EViewMode.eEdit;
                    clickCB = options.onEditTabViewClick;
                    this._switchDrawersVisibleState(true);
                }
                else if (tab === this._playTab) {
                    this._currentViewMode = UIEnums.EViewMode.ePlay;
                    clickCB = options.onPlayTabViewClick;
                    this._switchDrawersVisibleState(false);
                }
                else if (tab === this._debugTab) {
                    this._currentViewMode = UIEnums.EViewMode.eDebug;
                    clickCB = options.onDebugTabViewClick;
                    this._switchDrawersVisibleState(false);
                }
                panelStateController.restorePanelStates(this._currentViewMode);
                this._currentActiveTab = tab;
                UIDom.removeClassName(this._editTab, 'active');
                UIDom.removeClassName(this._playTab, 'active');
                UIDom.removeClassName(this._debugTab, 'active');
                UIDom.addClassName(tab, 'active');
                this._updateTabFrameColor();
                if (typeof clickCB === 'function') {
                    clickCB();
                }
            }
        };
        /**
         * Switches the visibility state of the graph drawers.
         * @private
         * @param {boolean} isEditMode - True for edit mode else false.
         */
        UITabViewSwitcher.prototype._switchDrawersVisibleState = function (isEditMode) {
            var tabViewMode = this._editor.getOptions().tabViewMode;
            if (tabViewMode !== undefined && tabViewMode.testEditor !== undefined) {
                var graph = this._editor.getViewerController().getRootViewer().getMainGraph();
                var graphInputDataDrawer = graph.getInputDataDrawer();
                var graphOutputDataDrawer = graph.getOutputDataDrawer();
                var graphInputDataTestDrawer = graph.getInputDataTestDrawer();
                var graphOutputDataTestDrawer = graph.getOutputDataTestDrawer();
                if (isEditMode) {
                    graphInputDataDrawer.show();
                    graphOutputDataDrawer.show();
                    graphInputDataTestDrawer.hide();
                    graphOutputDataTestDrawer.hide();
                }
                else {
                    graphInputDataDrawer.hide();
                    graphOutputDataDrawer.hide();
                    graphInputDataTestDrawer.show();
                    graphOutputDataTestDrawer.show();
                }
            }
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
         * Gets the current active tab.
         * @private
         * @ignore
         * @returns {HTMLLIElement} The current active tab.
         */
        UITabViewSwitcher.prototype._getCurrentActiveTab = function () {
            return this._currentActiveTab;
        };
        /**
         * Gets the edit tab.
         * @private
         * @ignore
         * @returns {HTMLLIElement} The edit tab.
         */
        UITabViewSwitcher.prototype._getEditTab = function () {
            return this._editTab;
        };
        /**
         * Gets the play tab.
         * @private
         * @ignore
         * @returns {HTMLLIElement} The play tab.
         */
        UITabViewSwitcher.prototype._getPlayTab = function () {
            return this._playTab;
        };
        /**
         * Gets the debug tab.
         * @private
         * @ignore
         * @returns {HTMLLIElement} The debug tab.
         */
        UITabViewSwitcher.prototype._getDebugTab = function () {
            return this._debugTab;
        };
        return UITabViewSwitcher;
    }());
    return UITabViewSwitcher;
});
