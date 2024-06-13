/* global WUXDockAreaEnum */
/// <amd-module name='DS/EPSSchematicsUI/panels/EPSSchematicsUIPlayPanel'/>
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
define("DS/EPSSchematicsUI/panels/EPSSchematicsUIPlayPanel", ["require", "exports", "DS/EPSSchematicsUI/panels/EPSSchematicsUIPanel", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/data/EPSSchematicsUIKeyboard", "DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/Controls/Button", "DS/Controls/Expander", "DS/Controls/Toggle", "css!DS/EPSSchematicsUI/css/panels/EPSSchematicsUIPlayPanel"], function (require, exports, UIPanel, UIDom, UIFontIcon, UIWUXTools, UIKeyboard, UIEvents, EventServices, ExecutionEvents, WUXButton, WUXExpander, WUXToggle) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI play panel.
     * @class UIPlayPanel
     * @alias module:DS/EPSSchematicsUI/panels/EPSSchematicsUIPlayPanel
     * @extends UIPanel
     * @private
     */
    var UIPlayPanel = /** @class */ (function (_super) {
        __extends(UIPlayPanel, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UIPlayPanel(editor) {
            var _this = _super.call(this, {
                immersiveFrame: editor.getImmersiveFrame(),
                title: 'Play commands',
                maximizeButtonFlag: false,
                closeButtonFlag: false,
                currentDockArea: editor.getOptions().playCommands.dockArea || WUXDockAreaEnum.NoneDockArea,
                horizontallyStretchableFlag: false,
                verticallyStretchableFlag: false,
                className: ['sch-play-panel'],
                icon: UIFontIcon.getWUXFAIconDefinition('play'),
                width: 184,
                height: -1,
                position: {
                    my: 'top right',
                    at: 'top right',
                    of: editor.getImmersiveFrame(),
                    offsetX: -5,
                    offsetY: 5
                }
            }) || this;
            _this._onStartButtonClickCB = _this._onStartButtonClick.bind(_this);
            _this._onStopButtonClickCB = _this._onStopButtonClick.bind(_this);
            _this._onBreakAllContinueClickCB = _this._onBreakAllContinueClick.bind(_this);
            _this._onStepOverButtonClickCB = _this._onStepOverButtonClick.bind(_this);
            _this._onStepIntoButtonClickCB = _this._onStepIntoButtonClick.bind(_this);
            _this._onStepOutButtonClickCB = _this._onStepOutButtonClick.bind(_this);
            _this._onDebugBreakCB = _this._onDebugBreak.bind(_this);
            _this._onDebugUnbreakCB = _this._onDebugUnbreak.bind(_this);
            _this._keydownCB = _this._onKeydown.bind(_this);
            _this._onViewerChangeCB = _this._onViewerChange.bind(_this);
            _this._editor = editor;
            _this._callbacks = _this._editor.getOptions().playCommands.callbacks || {};
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
        UIPlayPanel.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the panel!
            this._unregisterEventListeners();
            this._editor = undefined;
            this._callbacks = undefined;
            this._debugContent = undefined;
            this._startButton = undefined;
            this._stopButton = undefined;
            this._debugExpander = undefined;
            this._breakOnStartToggle = undefined;
            this._breakAllContinueButton = undefined;
            this._stepOverButton = undefined;
            this._onStartButtonClickCB = undefined;
            this._onStopButtonClickCB = undefined;
            this._onBreakAllContinueClickCB = undefined;
            this._onStepOverButtonClickCB = undefined;
            this._onStepIntoButtonClickCB = undefined;
            this._onStepOutButtonClickCB = undefined;
            this._onDebugBreakCB = undefined;
            this._onDebugUnbreakCB = undefined;
            this._keydownCB = undefined;
        };
        /**
         * The callback on the breakpoints change state.
         * @public
         * @param {Object[]} breakpoints - The list of breakpoints.
         */
        UIPlayPanel.prototype.onBreakpointsChange = function (breakpoints) {
            if (this._callbacks.onBreakpointsChange !== undefined) {
                this._callbacks.onBreakpointsChange(breakpoints);
            }
        };
        /**
         * Gets the debug expander.
         * @public
         * @returns {WUXExpander} The debug expander.
         */
        UIPlayPanel.prototype.getDebugExpander = function () {
            return this._debugExpander;
        };
        /**
         * Gets the break on start toggle.
         * @public
         * @returns {WUXToggle} The break on start toggle.
         */
        UIPlayPanel.prototype.getBreakOnStartToggle = function () {
            return this._breakOnStartToggle;
        };
        /**
         * Gets the start button.
         * @public
         * @returns {WUXButton} The start button.
         */
        UIPlayPanel.prototype.getStartButton = function () {
            return this._startButton;
        };
        /**
         * Gets the stop button.
         * @public
         * @returns {WUXButton} The start button.
         */
        UIPlayPanel.prototype.getStopButton = function () {
            return this._stopButton;
        };
        /**
         * Gets the step over button.
         * @public
         * @returns {WUXButton} The step over button.
         */
        UIPlayPanel.prototype.getStepOverButton = function () {
            return this._stepOverButton;
        };
        /**
         * Gets the step into button.
         * @public
         * @returns {WUXButton} The step into button.
         */
        UIPlayPanel.prototype.getStepIntoButton = function () {
            return this._stepIntoButton;
        };
        /**
         * Gets the step out button.
         * @public
         * @returns {WUXButton} The step out button.
         */
        UIPlayPanel.prototype.getStepOutButton = function () {
            return this._stepOutButton;
        };
        /**
         * Gets the break all continue button.
         * @public
         * @returns {WUXButton} The break all continue button.
         */
        UIPlayPanel.prototype.getBreakAllContinueButton = function () {
            return this._breakAllContinueButton;
        };
        /**
         * Gets the debug commands expander visible flag.
         * @public
         * @returns {boolean} The visible flag.
         */
        UIPlayPanel.prototype.getDebugCommandsVisibleFlag = function () {
            return this._debugExpander.visibleFlag;
        };
        /**
         * Sets the debug commands expander visible flag.
         * @public
         * @param {boolean} visibleFlag - The visible flag.
         */
        UIPlayPanel.prototype.setDebugCommandsVisibleFlag = function (visibleFlag) {
            this._debugExpander.visibleFlag = visibleFlag;
            this._debugExpander.expand();
        };
        /**
         * Gets the break on start toggle checked state.
         * @public
         * @returns {boolean} True if the break on start toggle is checked else false.
         */
        UIPlayPanel.prototype.getBreakOnStartToggleCheckedState = function () {
            return this._breakOnStartToggle.checkFlag;
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
        UIPlayPanel.prototype._onClose = function () {
            if (this._startButton !== undefined) {
                this._startButton.removeEventListener('buttonclick', this._onStartButtonClickCB);
            }
            if (this._stopButton !== undefined) {
                this._stopButton.removeEventListener('buttonclick', this._onStopButtonClickCB);
            }
            if (this._breakAllContinueButton !== undefined) {
                this._stopButton.removeEventListener('buttonclick', this._onBreakAllContinueClickCB);
            }
            if (this._stepOverButton !== undefined) {
                this._stepOverButton.removeEventListener('buttonclick', this._onStepOverButtonClickCB);
            }
            if (this._stepIntoButton !== undefined) {
                this._stepIntoButton.removeEventListener('buttonclick', this._onStepIntoButtonClickCB);
            }
            if (this._stepOutButton !== undefined) {
                this._stepOutButton.removeEventListener('buttonclick', this._onStepOutButtonClickCB);
            }
            this._startButton = undefined;
            this._stopButton = undefined;
            this._debugExpander = undefined;
            this._debugContent = undefined;
            this._breakOnStartToggle = undefined;
            this._breakAllContinueButton = undefined;
            this._stepOverButton = undefined;
            this._stepIntoButton = undefined;
            this._stepOutButton = undefined;
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the panel content.
         * @protected
         * @abstract
         */
        UIPlayPanel.prototype._createContent = function () {
            this._createBaseCommands();
            this._createDebugExpander();
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
         * Creates the base commands.
         * @private
         */
        UIPlayPanel.prototype._createBaseCommands = function () {
            this._startButton = new WUXButton({
                label: '',
                emphasize: 'primary',
                icon: 'play',
                iconSize: '1x',
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Play' }),
                allowUnsafeHTMLLabel: false
            }).inject(this.getContent());
            this._startButton.addEventListener('buttonclick', this._onStartButtonClickCB);
            this._stopButton = new WUXButton({
                label: '',
                emphasize: 'secondary',
                icon: 'stop',
                iconSize: '1x',
                disabled: true,
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Stop' }),
                allowUnsafeHTMLLabel: false
            }).inject(this.getContent());
            this._stopButton.addEventListener('buttonclick', this._onStopButtonClickCB);
        };
        /**
         * Creates the debug expander.
         * @private
         */
        UIPlayPanel.prototype._createDebugExpander = function () {
            this._debugContent = UIDom.createElement('div');
            this._debugExpander = new WUXExpander({
                header: 'Debug commands',
                body: this._debugContent,
                style: 'styled'
            }).inject(this.getContent());
            this._breakOnStartToggle = new WUXToggle({
                type: 'switch',
                label: 'Break on start'
            }).inject(this._debugContent);
            this._breakAllContinueButton = new WUXButton({
                label: '',
                emphasize: 'primary',
                icon: UIFontIcon.getWUX3DSIconDefinition('resume'),
                iconSize: '1x',
                disabled: true,
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Continue (F8)' }),
                checkFlag: true,
                allowUnsafeHTMLLabel: false
            }).inject(this._debugContent);
            this._breakAllContinueButton.addEventListener('buttonclick', this._onBreakAllContinueClickCB);
            this._stepOverButton = new WUXButton({
                label: '',
                emphasize: 'primary',
                icon: UIFontIcon.getWUXFAIconDefinition('sch-step-over'),
                iconSize: '1x',
                disabled: true,
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Step Over (F10)' }),
                allowUnsafeHTMLLabel: false
            }).inject(this._debugContent);
            this._stepOverButton.addEventListener('buttonclick', this._onStepOverButtonClickCB);
            this._stepIntoButton = new WUXButton({
                label: '',
                emphasize: 'primary',
                icon: UIFontIcon.getWUX3DSIconDefinition('dataflow-input'),
                iconSize: '1x',
                disabled: true,
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Step Into (F11)' }),
                allowUnsafeHTMLLabel: false
            }).inject(this._debugContent);
            this._stepIntoButton.addEventListener('buttonclick', this._onStepIntoButtonClickCB);
            this._stepOutButton = new WUXButton({
                label: '',
                emphasize: 'primary',
                icon: UIFontIcon.getWUX3DSIconDefinition('dataflow-output'),
                iconSize: '1x',
                disabled: true,
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Step Out (Shift + F11)' }),
                allowUnsafeHTMLLabel: false
            }).inject(this._debugContent);
            this._stepOutButton.addEventListener('buttonclick', this._onStepOutButtonClickCB);
        };
        /**
         * Switches the button to display the continue command.
         * @private
         */
        UIPlayPanel.prototype._switchToContinueButton = function () {
            this._breakAllContinueButton.icon = UIFontIcon.getWUX3DSIconDefinition('resume');
            this._breakAllContinueButton.tooltipInfos = UIWUXTools.createTooltip({ shortHelp: 'Continue (F8)' });
            this._breakAllContinueButton.checkFlag = true;
        };
        /**
         * Switches the button to display the break all command.
         * @private
         */
        UIPlayPanel.prototype._switchToBreakAllButton = function () {
            this._breakAllContinueButton.icon = 'pause';
            this._breakAllContinueButton.tooltipInfos = UIWUXTools.createTooltip({ shortHelp: 'Break all (F8)' });
            this._breakAllContinueButton.checkFlag = false;
        };
        /**
         * Switches the buttons to display commands necessary on break status.
         * @private
         * @param {Block} block - The block model selected by the debug cursor.
         */
        UIPlayPanel.prototype._switchToBreakStatus = function (block) {
            this._switchToContinueButton();
            this._stepOverButton.disabled = false;
            this._stepIntoButton.disabled = !block.handleStepInto();
            this._stepOutButton.disabled = false;
        };
        /**
         * Switches the buttons to display commands necessary on unbreak status.
         * @private
         */
        UIPlayPanel.prototype._switchToUnbreakStatus = function () {
            this._switchToBreakAllButton();
            this._stepOverButton.disabled = true;
            this._stepIntoButton.disabled = true;
            this._stepOutButton.disabled = true;
        };
        /**
         * Registers event listeners for debug and keyboard events.
         * @private
         */
        UIPlayPanel.prototype._registerEventListeners = function () {
            this._editor.addListener(UIEvents.UIViewerChangeEvent, this._onViewerChangeCB);
            EventServices.addListener(ExecutionEvents.DebugBreakEvent, this._onDebugBreakCB);
            EventServices.addListener(ExecutionEvents.DebugUnbreakEvent, this._onDebugUnbreakCB);
            document.body.addEventListener('keydown', this._keydownCB, false);
        };
        /**
         * Unregisters event listeners for debug and keyboard events.
         * @private
         */
        UIPlayPanel.prototype._unregisterEventListeners = function () {
            this._editor.removeListener(UIEvents.UIViewerChangeEvent, this._onViewerChangeCB);
            EventServices.removeListener(ExecutionEvents.DebugBreakEvent, this._onDebugBreakCB);
            EventServices.removeListener(ExecutionEvents.DebugUnbreakEvent, this._onDebugUnbreakCB);
            document.body.removeEventListener('keydown', this._keydownCB, false);
        };
        /**
         * The callback on keydown event
         * @private
         * @param {KeyboardEvent} event - The keydown event.
         */
        UIPlayPanel.prototype._onKeydown = function (event) {
            if (UIKeyboard.isKeyPressed(event, UIKeyboard.eF10)) {
                if (!this._stepOverButton.disabled) {
                    this._onStepOverButtonClick();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eF11)) {
                if (event.shiftKey) {
                    if (!this._stepOutButton.disabled) {
                        this._onStepOutButtonClick();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
                else {
                    if (!this._stepIntoButton.disabled) {
                        this._onStepIntoButtonClick();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eF8)) {
                if (!this._breakAllContinueButton.disabled) {
                    this._onBreakAllContinueClick();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        };
        /**
         * The callback on the start button click event.
         * @private
         */
        UIPlayPanel.prototype._onStartButtonClick = function () {
            this._registerEventListeners();
            this._switchToBreakAllButton();
            this._startButton.disabled = true;
            this._stopButton.disabled = false;
            this._breakAllContinueButton.disabled = false;
            this._stepOverButton.disabled = true;
            this._stepIntoButton.disabled = true;
            this._stepOutButton.disabled = true;
            this._breakOnStartToggle.disabled = true;
            if (this._callbacks.onStart !== undefined) {
                this._callbacks.onStart();
            }
        };
        /**
         * The callback on the stop button click event.
         * @private
         */
        UIPlayPanel.prototype._onStopButtonClick = function () {
            this._unregisterEventListeners();
            this._switchToContinueButton();
            this._startButton.disabled = false;
            this._stopButton.disabled = true;
            this._breakAllContinueButton.disabled = true;
            this._stepOverButton.disabled = true;
            this._stepIntoButton.disabled = true;
            this._stepOutButton.disabled = true;
            this._breakOnStartToggle.disabled = false;
            if (this._callbacks.onStop !== undefined) {
                this._callbacks.onStop();
            }
            this._editor.getDebugController().clear();
        };
        /**
         * The callback on the breakAll continue button click event.
         * @private
         */
        UIPlayPanel.prototype._onBreakAllContinueClick = function () {
            if (this._breakAllContinueButton.checkFlag) {
                if (this._callbacks.onContinue !== undefined) {
                    this._editor.getDebugController().onContinue();
                    this._callbacks.onContinue();
                }
                this._switchToBreakAllButton();
            }
            else {
                if (this._callbacks.onBreakAll !== undefined) {
                    this._editor.getDebugController().onBreakAll();
                    this._callbacks.onBreakAll();
                }
                this._switchToContinueButton();
            }
        };
        /**
         * The callback on the step over button click event.
         * @private
         */
        UIPlayPanel.prototype._onStepOverButtonClick = function () {
            if (this._callbacks.onStepOver !== undefined) {
                var contextPath = this._editor.getViewerController().getCurrentViewer().getMainGraph().getModel().toPath();
                this._editor.getDebugController().onStepOver(contextPath);
                this._callbacks.onStepOver(contextPath);
            }
        };
        /**
         * The callback on the step into button click event.
         * @private
         */
        UIPlayPanel.prototype._onStepIntoButtonClick = function () {
            if (this._callbacks.onStepInto !== undefined) {
                var contextPath = this._editor.getViewerController().getCurrentViewer().getMainGraph().getModel().toPath();
                this._editor.getDebugController().onStepInto(contextPath);
                this._callbacks.onStepInto(contextPath);
            }
        };
        /**
         * The callback on the step out button click event.
         * @private
         */
        UIPlayPanel.prototype._onStepOutButtonClick = function () {
            if (this._callbacks.onStepOut !== undefined) {
                var contextPath = this._editor.getViewerController().getCurrentViewer().getMainGraph().getModel().toPath();
                this._editor.getDebugController().onStepOut(contextPath);
                this._callbacks.onStepOut(contextPath);
            }
        };
        /**
         * The callback on the viewer change event.
         * @private
         * @param {UIEvents.UIViewerChangeEvent} event - The viewer change event.
         */
        UIPlayPanel.prototype._onViewerChange = function (event) {
            var viewer = event.getViewer();
            var contextPath = viewer.getMainGraph().getModel().toPath();
            var debugController = this._editor.getDebugController();
            var debugCursor = debugController.getDebugCursorByGraphContext(contextPath);
            if (debugCursor === undefined) {
                this._switchToUnbreakStatus();
            }
            else {
                var blockModel = debugCursor.getBlock().getModel();
                this._switchToBreakStatus(blockModel);
            }
        };
        /**
         * The callback on the debug break event.
         * @private
         * @param {ExecutionEvents.DebugBreakEvent} event - The debug break event.
         */
        UIPlayPanel.prototype._onDebugBreak = function (event) {
            var path = event.getPath();
            var parentPath = path.split('.').slice(0, -1).join('.');
            var contextPath = this._editor.getViewerController().getCurrentViewer().getMainGraph().getModel().toPath();
            if (contextPath === parentPath) {
                var blockModel = this._editor.getGraphModel().getObjectFromPath(path);
                this._switchToBreakStatus(blockModel);
            }
        };
        /**
         * The callback on the debug unbreak event.
         * @private
         * @param {ExecutionEvents.DebugUnbreakEvent} event - The debug unbreak event.
         */
        UIPlayPanel.prototype._onDebugUnbreak = function (event) {
            var path = event.getPath();
            var parentPath = path.split('.').slice(0, -1).join('.');
            var contextPath = this._editor.getViewerController().getCurrentViewer().getMainGraph().getModel().toPath();
            if (contextPath === parentPath) {
                this._switchToUnbreakStatus();
            }
        };
        return UIPlayPanel;
    }(UIPanel));
    return UIPlayPanel;
});
