/// <amd-module name='DS/EPSSchematicsPlay/EPSSchematicsPlay'/>
define("DS/EPSSchematicsPlay/EPSSchematicsPlay", ["require", "exports", "DS/EPSSchematicsUI/EPSSchematicsUIEditor", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicEngine/EPSSchematicsExecutionGraph", "DS/EPSSchematicEngine/EPSSchematicsTask", "DS/EPSSchematicsPlay/EPSLoopManager", "DS/EPInputsServicesWeb/EPInputsServices"], function (require, exports, SchematicsEditor, UIDom, ExecutionGraph, SchematicsTask, EPSLoopManager, InputsServices) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the Schematics Play.
     * @class EPSSchematicsPlay
     * @alias module:DS/EPSSchematicsPlay/EPSSchematicsPlay
     * @private
     */
    var EPSSchematicsPlay = /** @class */ (function () {
        /**
         * @constructor
         * @param {Function} [onInitialized] - The function called after initialization.
         */
        function EPSSchematicsPlay(onInitialized) {
            this._onInitialized = onInitialized;
            this._container = UIDom.createElement('div', { parent: document.body, style: { height: '100%' } });
            var options = {
                domContainer: this._container,
                onInitialized: this._onInitializedCB.bind(this),
                playCommands: {
                    callbacks: {
                        onStart: this._onStart.bind(this),
                        onStop: this._onStop.bind(this),
                        onStepOver: this._onStepOver.bind(this),
                        onStepInto: this._onStepInto.bind(this),
                        onStepOut: this._onStepOut.bind(this),
                        onBreakAll: this._onBreakAll.bind(this),
                        onContinue: this._onContinue.bind(this),
                        onBreakpointsChange: this._onBreakpointsChange.bind(this)
                    }
                }
            };
            this._editor = new SchematicsEditor(options);
            this._loopManager = new EPSLoopManager();
        }
        /**
         * Closes the schematics play.
         * @public
         */
        EPSSchematicsPlay.prototype.onClose = function () {
            if (this._editor !== undefined) {
                this._editor.onClose();
            }
            this._onInitialized = undefined;
            this._container = undefined;
        };
        /**
         * Gets the Schematics editor.
         * @public
         * @returns {SchematicsEditor} The Schematics editor.
         */
        EPSSchematicsPlay.prototype.getEditor = function () {
            return this._editor;
        };
        /**
         * The callback on the start button click event.
         * @private
         */
        EPSSchematicsPlay.prototype._onStart = function () {
            var savedGraph = this._editor.getContent();
            var breakOnStart = this._editor.getPlayPanel().getBreakOnStartToggleCheckedState();
            this._executionGraph = ExecutionGraph.createExecutionGraph(savedGraph, undefined, undefined, undefined, breakOnStart, this._breakpoints);
            this._loopManager.registerTask(new SchematicsTask(this._executionGraph, true));
            this._loopManager.start();
            this._inputsServices = new InputsServices();
            this._inputsServices.enableMouse(document.body);
            this._inputsServices.enableKeyboard(document.body);
        };
        /**
         * The callback on the stop button click event.
         * @private
         */
        EPSSchematicsPlay.prototype._onStop = function () {
            this._inputsServices.disableMouse();
            this._inputsServices.disableKeyboard();
            this._inputsServices = undefined;
            this._loopManager.stop();
        };
        /**
         * The callback on the step over button click event.
         * @private
         * @param {string} contextPath - The context path.
         */
        EPSSchematicsPlay.prototype._onStepOver = function (contextPath) {
            this._executionGraph.stepOver(contextPath);
        };
        /**
         * The callback on the step into button click event.
         * @private
         * @param {string} contextPath - The context path.
         */
        EPSSchematicsPlay.prototype._onStepInto = function (contextPath) {
            this._executionGraph.stepInto(contextPath);
        };
        /**
         * The callback on the step out button click event.
         * @private
         * @param {string} contextPath - The context path.
         */
        EPSSchematicsPlay.prototype._onStepOut = function (contextPath) {
            this._executionGraph.stepOut(contextPath);
        };
        /**
         * The callback on the break all button click event.
         * @private
         */
        EPSSchematicsPlay.prototype._onBreakAll = function () {
            this._executionGraph.breakAll();
        };
        /**
         * The callback on the continue button click event.
         * @private
         */
        EPSSchematicsPlay.prototype._onContinue = function () {
            this._executionGraph.continue();
        };
        /**
         * The callback on the breakpoints change event.
         * @private
         * @param {IBreakpoint[]} breakpoints - The list of breakpoints.
         */
        EPSSchematicsPlay.prototype._onBreakpointsChange = function (breakpoints) {
            this._breakpoints = breakpoints;
            if (this._executionGraph !== undefined) {
                this._executionGraph.updateBreakpoints(breakpoints);
            }
        };
        /**
         * The callback to the schematics editor initialization.
         * @private
         */
        EPSSchematicsPlay.prototype._onInitializedCB = function () {
            this._loadJSONGraphFromURL(location.search);
            if (this._onInitialized !== undefined) {
                this._onInitialized();
            }
        };
        /**
         * Loads the json graph provided into the URL of the page.
         * @private (Public only for ODT)
         * @param {string} urlParams - The url parameters.
         * @param {Function} [callback] - The function call when the JSON graph is loaded.
         */
        EPSSchematicsPlay.prototype._loadJSONGraphFromURL = function (urlParams, callback) {
            var _this = this;
            var content;
            var parameters = urlParams.substring(1).split('&');
            for (var p = 0; p < parameters.length; p++) {
                var parameter = parameters[p];
                var keyValue = parameter.split('=');
                if (keyValue.length === 2) {
                    var key = decodeURI(keyValue[0]);
                    var value = decodeURI(keyValue[1]);
                    if (key === 'content' && value !== undefined && value !== '') {
                        content = value;
                        break;
                    }
                }
            }
            if (content !== undefined) {
                new Promise(function (resolve_1, reject_1) { require(['text!' + content], resolve_1, reject_1); }).then(function (jsonGraph) {
                    _this._editor.setContent(jsonGraph);
                    if (callback !== undefined) {
                        callback();
                    }
                });
            }
        };
        return EPSSchematicsPlay;
    }());
    return EPSSchematicsPlay;
});
