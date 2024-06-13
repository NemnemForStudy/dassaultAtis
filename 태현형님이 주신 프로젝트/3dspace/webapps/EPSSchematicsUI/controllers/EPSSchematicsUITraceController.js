/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUITraceController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUITraceController", ["require", "exports", "DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceHandler", "DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceGraphHandler", "DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceBlockHandler", "DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceControlPortHandler", "DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceDataPortHandler", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPort", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents"], function (require, exports, UITraceHandler, UITraceGraphHandler, UITraceBlockHandler, UITraceControlPortHandler, UITraceDataPortHandler, GraphBlock, ControlPort, DataPort, Tools, ModelEnums, EventServices, ExecutionEvents) {
    "use strict";
    var UITraceController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         */
        function UITraceController(editor) {
            this._isPlaying = false;
            this._traceEventsByOrder = [];
            this._traceEventsByDataPortPath = new Map();
            this._traceEventsByGraphBlockPath = new Map();
            this._traceBlockHandlersByPath = new Map();
            this._traceControlLinkHandlersByPath = new Map();
            this._traceDataLinkHandlersByPath = new Map();
            this._traceControlPortHandlersByPath = new Map();
            this._traceDataPortHandlersByPath = new Map();
            this._startListenersCB = this._startListeners.bind(this);
            this._stopListenersCB = this._stopListeners.bind(this);
            this._registerTraceEventCB = this._registerTraceEvent.bind(this);
            this._notifyCB = this._notify.bind(this);
            this._editor = editor;
            EventServices.addListener(ExecutionEvents.TraceStartEvent, this._startListenersCB);
            EventServices.addListener(ExecutionEvents.TraceStopEvent, this._stopListenersCB);
            EventServices.addListener(ExecutionEvents.NotifyEvent, this._notifyCB);
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
        UITraceController.prototype.remove = function () {
            this._stopListeners();
            EventServices.removeListener(ExecutionEvents.NotifyEvent, this._notifyCB);
            EventServices.removeListener(ExecutionEvents.TraceStartEvent, this._startListenersCB);
            EventServices.removeListener(ExecutionEvents.TraceStopEvent, this._stopListenersCB);
            this._editor = undefined;
            this._graph = undefined;
            this._isPlaying = undefined;
            this._traceEventsByOrder = undefined;
            this._traceEventsByDataPortPath = undefined;
            this._traceEventsByGraphBlockPath = undefined;
            this._traceBlockHandlersByPath = undefined;
            this._traceControlLinkHandlersByPath = undefined;
            this._traceDataLinkHandlersByPath = undefined;
            this._traceControlPortHandlersByPath = undefined;
            this._traceDataPortHandlersByPath = undefined;
            this._startListenersCB = undefined;
            this._stopListenersCB = undefined;
            this._registerTraceEventCB = undefined;
            this._notifyCB = undefined;
        };
        /**
         * Gets the editor.
         * @public
         * @returns {UIEditor} The editor.
         */
        UITraceController.prototype.getEditor = function () {
            return this._editor;
        };
        /**
         * Gets the playing sate.
         * @public
         * @returns {boolean} True if playing else false.
         */
        UITraceController.prototype.getPlayingState = function () {
            return this._isPlaying;
        };
        /**
         * Gets the trace data port events from the provided data port path..
         * @public
         * @param {string} path - The data port path.
         * @returns {Array<TraceDataPortEvent>} The trace data port events.
         */
        UITraceController.prototype.getEventByDataPortPath = function (path) {
            return this._traceEventsByDataPortPath.get(path) || [];
        };
        /**
         * Dispatches the sub graph events.
         * @public
         * @param {UIGraphBlock} graphBlockUI - The UI graph block.
         */
        UITraceController.prototype.dispatchSubGraphEvents = function (graphBlockUI) {
            var _this = this;
            if (this._isPlaying) {
                var path = graphBlockUI.getModel().toPath();
                var events = this._traceEventsByGraphBlockPath.get(path) || [];
                events.forEach(function (event) { return _this._traceElement(event, true); });
            }
        };
        /**
         * Removes the sub graph events.
         * @public
         * @param {UIGraphBlock} graphBlockUI - The UI graph block.
         */
        UITraceController.prototype.removeSubGraphEvents = function (graphBlockUI) {
            var _this = this;
            if (this._isPlaying) {
                var path = graphBlockUI.getModel().toPath();
                var events = this._traceEventsByGraphBlockPath.get(path) || [];
                events.forEach(function (event) { return _this._untraceElement(event, graphBlockUI); });
            }
        };
        /**
         * Gets the trace block handlers by path.
         * @public
         * @returns {Map<string, UITraceHandler>} The trace block handlers by path.
         */
        UITraceController.prototype.getTraceBlockHandlersByPath = function () {
            return this._traceBlockHandlersByPath;
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
         * Starts the listeners for trace block, port and link events.
         * @private
         */
        UITraceController.prototype._startListeners = function () {
            this._isPlaying = true;
            if (this._editor.getOptions().traceMode) {
                this._graph = this._editor._getViewer().getMainGraph();
                EventServices.addListener(ExecutionEvents.TraceBlockEvent, this._registerTraceEventCB);
                EventServices.addListener(ExecutionEvents.TracePortEvent, this._registerTraceEventCB);
                EventServices.addListener(ExecutionEvents.TraceLinkEvent, this._registerTraceEventCB);
                EventServices.addListener(ExecutionEvents.TraceDataLinkEvent, this._registerTraceEventCB);
                EventServices.addListener(ExecutionEvents.TraceDataPortEvent, this._registerTraceEventCB);
            }
        };
        /**
         * Stops the listeners for trace block, port and link events.
         * @private
         */
        UITraceController.prototype._stopListeners = function () {
            this._isPlaying = false;
            if (this._editor.getOptions().traceMode) {
                EventServices.removeListener(ExecutionEvents.TraceBlockEvent, this._registerTraceEventCB);
                EventServices.removeListener(ExecutionEvents.TracePortEvent, this._registerTraceEventCB);
                EventServices.removeListener(ExecutionEvents.TraceLinkEvent, this._registerTraceEventCB);
                EventServices.removeListener(ExecutionEvents.TraceDataLinkEvent, this._registerTraceEventCB);
                EventServices.removeListener(ExecutionEvents.TraceDataPortEvent, this._registerTraceEventCB);
                this._clear();
            }
        };
        /**
         * Clears the list of traced elements.
         * @private
         */
        UITraceController.prototype._clear = function () {
            this._traceEventsByOrder = [];
            this._traceEventsByGraphBlockPath.clear();
            this._traceEventsByDataPortPath.clear();
            this._traceBlockHandlersByPath.forEach(function (handler) { return handler.disable(); });
            this._traceBlockHandlersByPath.clear();
            this._traceDataLinkHandlersByPath.forEach(function (handler) { return handler.disable(); });
            this._traceDataLinkHandlersByPath.clear();
            this._traceControlLinkHandlersByPath.forEach(function (handler) { return handler.disable(); });
            this._traceControlLinkHandlersByPath.clear();
            this._traceControlPortHandlersByPath.forEach(function (handler) { return handler.disable(); });
            this._traceControlPortHandlersByPath.clear();
            this._traceDataPortHandlersByPath.forEach(function (handler) { return handler.disable(); });
            this._traceDataPortHandlersByPath.clear();
        };
        /**
         * Registers the trace event.
         * @private
         * @param {TraceEvent} event - The trace event.
         */
        UITraceController.prototype._registerTraceEvent = function (event) {
            var path = event.getPath();
            if (path !== undefined && path !== '') {
                var objectModel = this._graph.getModel().getObjectFromPath(path);
                var parent_1 = objectModel.block || objectModel.graph;
                if (parent_1 !== undefined) {
                    this._traceEventsByOrder.push(event);
                    if (event instanceof ExecutionEvents.TraceDataPortEvent) {
                        this._setEventByDataPortPath(path, event);
                    }
                    if (parent_1 instanceof GraphBlock) {
                        if (objectModel instanceof ControlPort) {
                            // Register outside graph control port trace event
                            if (parent_1.graph !== undefined) {
                                var parentControlPortPath = parent_1.graph.toPath();
                                this._setEventByGraphBlockPath(parentControlPortPath, event);
                            }
                        }
                        else if (objectModel instanceof DataPort) {
                            // Register outside graph data port trace event
                            if (parent_1.graph !== undefined) {
                                var parentDataPortPath = parent_1.graph.toPath();
                                this._setEventByGraphBlockPath(parentDataPortPath, event);
                            }
                        }
                    }
                    else {
                        parent_1 = parent_1.graph;
                    }
                    var parentPath = parent_1.toPath();
                    this._setEventByGraphBlockPath(parentPath, event);
                }
                this._traceElement(event, false);
            }
        };
        /**
         * Sets the traceEventsByDataPortPath with the provided event.
         * @private
         * @param {string} path - The data port path.
         * @param {TraceDataPortEvent} event - The trace data port event.
         */
        UITraceController.prototype._setEventByDataPortPath = function (path, event) {
            var events = this._traceEventsByDataPortPath.get(path) || [];
            events.push(event);
            this._traceEventsByDataPortPath.set(path, events);
        };
        /**
         * Sets the traceEventsByGraphBlockPath with the provided event.
         * @private
         * @param {string} path - The graph block path.
         * @param {TraceEvent} event - The trace event.
         */
        UITraceController.prototype._setEventByGraphBlockPath = function (path, event) {
            var events = this._traceEventsByGraphBlockPath.get(path) || [];
            events.push(event);
            this._traceEventsByGraphBlockPath.set(path, events);
        };
        /**
         * Traces the element specified in the provided event.
         * @private
         * @param {TraceEvent} event - The trace event.
         * @param {boolean} skipAnimation - True to skip the trace animation.
         */
        UITraceController.prototype._traceElement = function (event, skipAnimation) {
            if (event instanceof ExecutionEvents.TraceBlockEvent) {
                this._traceBlock(event, skipAnimation);
            }
            else if (event instanceof ExecutionEvents.TraceLinkEvent) {
                this._traceControlLink(event, skipAnimation);
            }
            else if (event instanceof ExecutionEvents.TraceDataLinkEvent) {
                this._traceDataLink(event, skipAnimation);
            }
            else if (event instanceof ExecutionEvents.TracePortEvent) {
                this._traceControlPort(event, skipAnimation);
            }
            else if (event instanceof ExecutionEvents.TraceDataPortEvent) {
                this._traceDataPort(event, skipAnimation);
            }
        };
        /**
         * Untraces the element specified in the provided event.
         * @private
         * @param {Event} event - The trace event.
         * @param {UIGraphBlock} parentBlock - The parent UI graph block.
         */
        UITraceController.prototype._untraceElement = function (event, parentBlock) {
            var path = event.getPath();
            if (event instanceof ExecutionEvents.TraceBlockEvent) {
                this._untraceBlock(path);
            }
            else if (event instanceof ExecutionEvents.TraceLinkEvent) {
                this._untraceControlLink(path);
            }
            else if (event instanceof ExecutionEvents.TraceDataLinkEvent) {
                this._untraceDataLink(path);
            }
            else if (event instanceof ExecutionEvents.TracePortEvent) {
                this._untraceControlPort(path, parentBlock);
            }
            else if (event instanceof ExecutionEvents.TraceDataPortEvent) {
                this._untraceDataPort(path, parentBlock);
            }
        };
        /**
         * Traces the block.
         * @private
         * @param {ExecutionEvents.TraceBlockEvent} event - The trace block event.
         * @param {boolean} skipAnimation - True to skip the trace animation.
         */
        UITraceController.prototype._traceBlock = function (event, skipAnimation) {
            var path = event.getPath();
            if (path !== undefined) {
                var elementUI = this._graph.getObjectFromPath(path);
                if (elementUI !== undefined) {
                    var options = {
                        executionResult: event.getExecutionResult(),
                        errorStack: event.getErrorStack(),
                        errorMessage: event.getErrorMessage()
                    };
                    var traceHandler = this._traceBlockHandlersByPath.get(path);
                    if (traceHandler === undefined) {
                        var HandlerCtr = path === Tools.rootPath ? UITraceGraphHandler : UITraceBlockHandler;
                        traceHandler = new HandlerCtr(this, elementUI);
                        this._traceBlockHandlersByPath.set(path, traceHandler);
                    }
                    traceHandler.enable(skipAnimation, options);
                }
            }
        };
        /**
         * Untraces the block.
         * @private
         * @param {string} path - The path of the block to untrace.
         */
        UITraceController.prototype._untraceBlock = function (path) {
            var traceHandler = this._traceBlockHandlersByPath.get(path);
            if (traceHandler !== undefined) {
                traceHandler.disable();
                this._traceBlockHandlersByPath.delete(path);
            }
        };
        /**
         * Traces the control link.
         * @private
         * @param {TraceLinkEvent} event - The trace control link event.
         * @param {boolean} skipAnimation - True to skip the trace animation.
         */
        UITraceController.prototype._traceControlLink = function (event, skipAnimation) {
            var path = event.getPath();
            if (path !== undefined) {
                var elementUI = this._graph.getObjectFromPath(path);
                if (elementUI !== undefined) {
                    var traceHandler = this._traceControlLinkHandlersByPath.get(path);
                    if (traceHandler === undefined) {
                        traceHandler = new UITraceHandler(this, elementUI);
                        this._traceControlLinkHandlersByPath.set(path, traceHandler);
                    }
                    traceHandler.enable(skipAnimation);
                }
            }
        };
        /**
         * Untraces the control link.
         * @private
         * @param {string} path - The path of the control link to untrace.
         */
        UITraceController.prototype._untraceControlLink = function (path) {
            var traceHandler = this._traceControlLinkHandlersByPath.get(path);
            if (traceHandler !== undefined) {
                traceHandler.disable();
                this._traceControlLinkHandlersByPath.delete(path);
            }
        };
        /**
         * Traces the link.
         * @private
         * @param {TraceLinkEvent|TraceDataLinkEvent} event - The trace link event.
         * @param {boolean} skipAnimation - True to skip the trace animation.
         */
        UITraceController.prototype._traceDataLink = function (event, skipAnimation) {
            var path = event.getPath();
            if (path !== undefined) {
                var elementUI = this._graph.getObjectFromPath(path);
                if (elementUI !== undefined) {
                    var traceHandler = this._traceDataLinkHandlersByPath.get(path);
                    if (traceHandler === undefined) {
                        traceHandler = new UITraceHandler(this, elementUI);
                        this._traceDataLinkHandlersByPath.set(path, traceHandler);
                    }
                    traceHandler.enable(skipAnimation);
                }
            }
        };
        /**
         * Untraces the link.
         * @private
         * @param {string} path - The path of the link to untrace.
         */
        UITraceController.prototype._untraceDataLink = function (path) {
            var traceHandler = this._traceDataLinkHandlersByPath.get(path);
            if (traceHandler !== undefined) {
                traceHandler.disable();
                this._traceDataLinkHandlersByPath.delete(path);
            }
        };
        /**
         * Traces the control port.
         * @private
         * @param {TracePortEvent} event - The trace control port event.
         * @param {boolean} skipAnimation - True to skip the trace animation.
         */
        UITraceController.prototype._traceControlPort = function (event, skipAnimation) {
            var path = event.getPath();
            if (path !== undefined) {
                var traceHandler = this._traceControlPortHandlersByPath.get(path);
                if (traceHandler === undefined) {
                    traceHandler = new UITraceControlPortHandler(this, this._graph, path);
                    this._traceControlPortHandlersByPath.set(path, traceHandler);
                }
                traceHandler.enable(skipAnimation);
            }
        };
        /**
         * Untraces the control port.
         * @private
         * @param {string} path - The path of the control port to untrace.
         * @param {UIGraphBlock} parentBlock - The parent graph block.
         */
        UITraceController.prototype._untraceControlPort = function (path, parentBlock) {
            var traceHandler = this._traceControlPortHandlersByPath.get(path);
            if (traceHandler !== undefined) {
                var isEmpty = traceHandler.disable(parentBlock);
                if (isEmpty) {
                    this._traceControlPortHandlersByPath.delete(path);
                }
            }
        };
        /**
         * This method traces the data port.
         * @private
         * @param {TraceDataPortEvent} event - The trace data port event.
         * @param {boolean} skipAnimation - True to skip the trace animation.
         */
        UITraceController.prototype._traceDataPort = function (event, skipAnimation) {
            var _this = this;
            var path = event.getPath();
            if (path !== undefined) {
                var fromDebug_1 = event.isFromDebug();
                var traceHandler = this._traceDataPortHandlersByPath.get(path);
                if (traceHandler === undefined) {
                    traceHandler = new UITraceDataPortHandler(this, this._graph, path);
                    this._traceDataPortHandlersByPath.set(path, traceHandler);
                }
                // Propagate the trace event on sub data ports
                var dataPort = this._graph.getModel().getObjectFromPath(path);
                if (dataPort) {
                    dataPort.getDataPorts().forEach(function (subDataPort) {
                        var subDataPortPath = subDataPort.toPath();
                        if (path !== undefined) {
                            var subTraceHandler = _this._traceDataPortHandlersByPath.get(subDataPortPath);
                            if (subTraceHandler === undefined) {
                                subTraceHandler = new UITraceDataPortHandler(_this, _this._graph, subDataPortPath);
                                _this._traceDataPortHandlersByPath.set(subDataPortPath, subTraceHandler);
                            }
                            subTraceHandler.setFromDebug(fromDebug_1);
                            subTraceHandler.enable(skipAnimation);
                        }
                    });
                }
                traceHandler.setFromDebug(fromDebug_1);
                traceHandler.enable(skipAnimation);
            }
        };
        /**
         * Untraces the data port.
         * @private
         * @param {string} path - The path of the data port to untrace.
         * @param {UIGraphBlock} parentBlock - The parent graph block.
         */
        UITraceController.prototype._untraceDataPort = function (path, parentBlock) {
            var traceHandler = this._traceDataPortHandlersByPath.get(path);
            if (traceHandler !== undefined) {
                var isEmpty = traceHandler.disable(parentBlock);
                if (isEmpty) {
                    this._traceDataPortHandlersByPath.delete(path);
                }
            }
        };
        /**
         * The callback to the notify event.
         * @private
         * @param {NotifyEvent} event - The notify event.
         */
        UITraceController.prototype._notify = function (event) {
            this._editor.displayNotification({
                level: UITraceController._getLevelFromSeverity(event.getSeverity()),
                subtitle: event.getTitle(),
                message: event.getMessage()
            });
        };
        /**
         * Get the corresponding WUX notification level from the given severity.
         * @private
         * @param {ESeverity} severity - The severity.
         * @returns {string} The corresponding WUX notification level.
         */
        UITraceController._getLevelFromSeverity = function (severity) {
            var keys = Object.keys(ModelEnums.ESeverity);
            var level, key;
            for (var k = 0; k < keys.length && level === undefined; k++) {
                key = keys[k];
                if (ModelEnums.ESeverity[key] === severity) {
                    level = key.substring(1).toLowerCase();
                }
            }
            return level;
        };
        return UITraceController;
    }());
    return UITraceController;
});
