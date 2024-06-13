/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIKeyboardController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIKeyboardController", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents", "DS/EPSSchematicsUI/data/EPSSchematicsUIKeyboard"], function (require, exports, UIEvents, UIKeyboard) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a keyboard controller.
     * @class UIKeyboardController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIKeyboardController
     * @private
     */
    var UIKeyboardController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         */
        function UIKeyboardController(editor) {
            this._isCtrlPressed = false;
            this._onViewerChangeCB = this._onViewerChange.bind(this);
            this._onKeydownCB = this._onKeydown.bind(this);
            this._onKeyupCB = this._onKeyup.bind(this);
            this._onCopyCB = this.onCopy.bind(this);
            this._onPasteCB = this.onPaste.bind(this);
            this._editor = editor;
            this._editor.addListener(UIEvents.UIViewerChangeEvent, this._onViewerChangeCB);
            if (document.body !== undefined && document.body !== null) {
                document.body.addEventListener('copy', this._onCopyCB, false);
                document.body.addEventListener('paste', this._onPasteCB, false);
            }
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
        UIKeyboardController.prototype.remove = function () {
            if (document.body !== undefined && document.body !== null) {
                document.body.removeEventListener('copy', this._onCopyCB, false);
                document.body.removeEventListener('paste', this._onPasteCB, false);
            }
            if (this._editor !== undefined) {
                this._editor.removeListener(UIEvents.UIViewerChangeEvent, this._onViewerChangeCB);
            }
            this._removeKeyboardListeners();
            this._editor = undefined;
            this._viewer = undefined;
            this._onViewerChangeCB = undefined;
            this._onKeydownCB = undefined;
        };
        /**
         * Checks if the control key is pressed.
         * @public
         * @returns {boolean} True if the control key is pressed else false.
         */
        UIKeyboardController.prototype.isCtrlKeyPressed = function () {
            return this._isCtrlPressed;
        };
        /**
         * The callback on the editor copy event.
         * @public
         * @param {ClipboardEvent} event - The copy event.
         */
        UIKeyboardController.prototype.onCopy = function (event) {
            if (event.clipboardData !== undefined) {
                var viewer = this._editor.getViewerController().getCurrentViewer();
                if (event.target === document.body || event.target === viewer.getContainer()) {
                    var blocks = viewer.getSelectedBlocks();
                    if (blocks.length) {
                        var savedBlocks_1 = [];
                        blocks.forEach(function (block) {
                            if (block.getModel().isValid()) {
                                savedBlocks_1.push(block.save());
                            }
                        });
                        event.clipboardData.setData('application/eps.schematics', JSON.stringify(savedBlocks_1));
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }
        };
        /**
         * The callback on the current viewer keydown event
         * @public
         * @param {ClipboardEvent} event - The keydown event.
         */
        UIKeyboardController.prototype.onPaste = function (event) {
            if (event.clipboardData !== undefined) {
                var viewer = this._editor.getViewerController().getCurrentViewer();
                if (event.target === document.body || event.target === viewer.getContainer()) {
                    var data = event.clipboardData.getData('application/eps.schematics');
                    if (data !== undefined && data !== null && data !== '') {
                        var blocks = JSON.parse(data);
                        var graph = viewer.getMainGraph();
                        graph.loadBlocks(blocks);
                        event.preventDefault();
                        event.stopPropagation();
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
         * The callback on the viewer change event.
         * @private
         * @param {UIEvents.UIViewerChangeEvent} event - The viewer change event.
         */
        UIKeyboardController.prototype._onViewerChange = function (event) {
            var viewer = event.getViewer();
            if (this._viewer !== viewer) {
                this._removeKeyboardListeners();
                this._viewer = viewer;
                this._addKeyboardListeners();
                this._viewer.getContainer().tabIndex = 0;
                this._viewer.getContainer().focus();
            }
        };
        /**
         * Adds the keyboard listeners to the viewer.
         * @private
         */
        UIKeyboardController.prototype._addKeyboardListeners = function () {
            if (this._viewer !== undefined) {
                this._viewer.getContainer().addEventListener('keydown', this._onKeydownCB, false);
                this._viewer.getContainer().addEventListener('keyup', this._onKeyupCB, false);
            }
        };
        /**
         * Removes the keyboard listeners from the viewer.
         * @private
         */
        UIKeyboardController.prototype._removeKeyboardListeners = function () {
            if (this._viewer !== undefined && this._viewer.getContainer() !== undefined) {
                this._viewer.getContainer().removeEventListener('keydown', this._onKeydownCB, false);
                this._viewer.getContainer().removeEventListener('keyup', this._onKeyupCB, false);
            }
        };
        /**
         * The callback on the current viewer keydown event
         * @private
         * @param {KeyboardEvent} event - The keydown event.
         */
        UIKeyboardController.prototype._onKeydown = function (event) {
            if (this._viewer.getEditionMode() === true) {
                event.preventDefault();
                event.stopPropagation();
            }
            else {
                this._isCtrlPressed = event.metaKey || event.ctrlKey;
                if (this._isCtrlPressed) {
                    this._onCtrlKeydown(event);
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eBackspace)) {
                    if (this._viewer.getMainGraph().getSmartSearch() === undefined) {
                        event.preventDefault();
                    }
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eDelete)) {
                    this._viewer.deleteSelection();
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eArrowLeft)) {
                    this._viewer.moveSelection(true, false, false, false);
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eArrowUp)) {
                    this._viewer.moveSelection(false, true, false, false);
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eArrowRight)) {
                    this._viewer.moveSelection(false, false, true, false);
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eArrowDown)) {
                    this._viewer.moveSelection(false, false, false, true);
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eKeyT)) {
                    this._viewer.createShortcutFromSelection();
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eF9)) {
                    this._viewer.toggleBreakpointOnSelectedBlocks();
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eKeyC)) {
                    var viewer = this._editor.getViewerController().getCurrentViewer();
                    viewer.centerView();
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eKeyF)) {
                    var viewer = this._editor.getViewerController().getCurrentViewer();
                    viewer.zoomGraphToFitInView();
                }
                else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eNumpad0)) {
                    var viewer = this._editor.getViewerController().getCurrentViewer();
                    viewer.zoomOneToOne();
                }
            }
        };
        /**
         * The callback on the current viewer keyup event
         * @private
         * @param {KeyboardEvent} event - The keyup event.
         */
        UIKeyboardController.prototype._onKeyup = function (event) {
            this._isCtrlPressed = event.metaKey || event.ctrlKey;
            this._refreshPortRerouteHandler();
        };
        /**
         * The callback on the control keydown event.
         * @private
         * @param {KeyboardEvent} event - The keydown event.
         */
        UIKeyboardController.prototype._onCtrlKeydown = function (event) {
            var options = this._editor.getOptions();
            var isKeyPressed = false;
            this._viewer.getLabelController().directShowLabels();
            if (UIKeyboard.isKeyPressed(event, UIKeyboard.eKeyS)) {
                isKeyPressed = true;
                var rootViewer = this._editor.getViewerController().getRootViewer();
                var saveCB = options.onSave || rootViewer.saveFile.bind(rootViewer);
                saveCB();
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eKeyO)) {
                isKeyPressed = true;
                var rootViewer = this._editor.getViewerController().getRootViewer();
                var openCB = options.onOpen || rootViewer.loadFile.bind(rootViewer);
                openCB();
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eKeyG)) {
                isKeyPressed = true;
                this._viewer.createGraphFromSelection();
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eKeyL)) {
                isKeyPressed = true;
                this._viewer.getMainGraph().analyzeGraphLoops();
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eKeyZ)) {
                isKeyPressed = true;
                this._editor.getHistoryController().back();
            }
            else if (UIKeyboard.isKeyPressed(event, UIKeyboard.eKeyY)) {
                isKeyPressed = true;
                this._editor.getHistoryController().forward();
            }
            if (isKeyPressed) {
                event.preventDefault();
            }
            this._refreshPortRerouteHandler();
        };
        /**
         * Refreshes the port reroute handler.
         * @private
         */
        UIKeyboardController.prototype._refreshPortRerouteHandler = function () {
            var stateMachineController = this._editor.getViewerController().getCurrentViewer().getStateMachineController();
            var port = stateMachineController.getPortAtPointerPosition();
            if (port) {
                port.getView().handleRerouteHandlerDisplay();
            }
        };
        return UIKeyboardController;
    }());
    return UIKeyboardController;
});
