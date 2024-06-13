/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIStateMachineController'/>
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
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIStateMachineController", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphIact", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphViews", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIControlPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphControlPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestSubDataPort", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataDrawer", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIShortcut", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIComment", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIPersistentLabel", "DS/EPSSchematicsUI/edges/EPSSchematicsUILink", "DS/EPSSchematicsUI/interactions/EPSSchematicsUIGraphBorderMoveDrag", "DS/EPSSchematicsUI/interactions/EPSSchematicsUIGraphControlPortMoveDrag", "DS/EPSSchematicsUI/interactions/EPSSchematicsUIControlLinkRerouteDrag", "DS/EPSSchematicsUI/interactions/EPSSchematicsUIControlLinkConnectDrag", "DS/EPSSchematicsUI/interactions/EPSSchematicsUINodeBorderMoveDrag", "DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataPortShortcutDrag", "DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataLinkRerouteDrag", "DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataLinkConnectDrag", "DS/EPSSchematicsUI/interactions/EPSSchematicsUINodeMoveDrag", "DS/EPSSchematicsModelWeb/EPSSchematicsControlLink", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPort", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort", "DS/EPSSchematicsUI/typings/WebUX/menu/EPSWUXMenu", "css!DS/EPSSchematicsUI/css/controllers/EPSSchematicsUIStateMachineController"], function (require, exports, EGraphIact, EGraphViews, UIPort, UIControlPort, UIDataPort, UIGraphControlPort, UIGraphTestDataPort, UIGraphTestSubDataPort, UINode, UIBlock, UIGraphDataDrawer, UIShortcut, UIComment, UIPersistentLabel, UILink, UIGraphBorderMoveDrag, UIGraphControlPortMoveDrag, UIControlLinkRerouteDrag, UIControlLinkConnectDrag, UINodeBorderMoveDrag, UIDataPortShortcutDrag, UIDataLinkRerouteDrag, UIDataLinkConnectDrag, UINodeMoveDrag, ControlLink, ControlPort, DataPort, WUXMenu) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the state machine controller.
     * @class UIStateMachineController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIStateMachineController
     * @private
     */
    var UIStateMachineController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIViewer} viewer - The graph viewer.
         */
        function UIStateMachineController(viewer) {
            this._clientPosition = { clientX: 0, clientY: 0 };
            this._doubleLeftClick = false;
            this._onMouseupCB = this._onMouseup.bind(this);
            this._viewer = viewer;
            this._container = viewer.getContainer();
            this._labelController = viewer.getLabelController();
            this._nodeIdSelectorsPanel = viewer.getEditor().getNodeIdSelectorsPanel();
            this._rootState = new UIGraphRootState(viewer);
            this._stateMachine = new EGraphIact.StateMachine(viewer.getDisplay(), undefined, this._rootState, viewer.getView());
            this._stateMachine.enddrag = this._enddrag.bind(this);
            this._stateMachine.rootState.onmousedown = this._onmousedown.bind(this);
            this._stateMachine.rootState.onmousemove = this._onmousemove.bind(this);
            this._container.addEventListener('mouseup', this._onMouseupCB, true);
            // Enable reroute of edges
            this._stateMachine.setEdgeRerouteOptions({
                active: true,
                modifier: 1 /* CTRL */,
                alwaysRerouteSelection: false
            });
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
        UIStateMachineController.prototype.remove = function () {
            this._container.removeEventListener('mouseup', this._onMouseupCB, true);
            this._stateMachine.domRoot.removeEventListener('mousedown', this._stateMachine.boundMouseDownHandler);
            this._stateMachine.domRoot.removeEventListener('mouseup', this._stateMachine.boundMouseUpHandler);
            this._stateMachine.domRoot.removeEventListener('contextmenu', this._stateMachine.boundCtxMenuHandler);
            this._stateMachine.domRoot.removeEventListener('mousemove', this._stateMachine.boundMouseMoveHandler);
            this._stateMachine.domRoot.removeEventListener(document.body.onwheel !== undefined ? 'wheel' : 'mousewheel', this._stateMachine.boundMouseWheelHandler);
            this._stateMachine.domRoot.removeEventListener('touchstart', this._stateMachine.boundTouchStartHandler);
            this._stateMachine.domRoot.removeEventListener('dragstart', this._stateMachine.boundDragStartHandler);
            this._stateMachine.domRoot.removeEventListener('dragenter', this._stateMachine.boundDragEnterHandler);
            this._stateMachine.domRoot.removeEventListener('dragexit', this._stateMachine.boundDragExitHandler);
            this._stateMachine.domRoot.removeEventListener('dragleave', this._stateMachine.boundDragLeaveHandler);
            this._stateMachine.domRoot.removeEventListener('dragover', this._stateMachine.boundDragOverHandler);
            this._stateMachine.domRoot.removeEventListener('drop', this._stateMachine.boundDropHandler);
            window.removeEventListener('mousedown', this._stateMachine.boundMouseDownHandler);
            window.removeEventListener('mouseup', this._stateMachine.boundMouseUpHandler);
            window.removeEventListener('contextmenu', this._stateMachine.boundCtxMenuHandler);
            window.removeEventListener('mousemove', this._stateMachine.boundMouseMoveHandler);
            this._viewer = undefined;
            this._container = undefined;
            this._labelController = undefined;
            this._rootState = undefined;
            this._stateMachine = undefined;
            this._nodeIdSelectorsPanel = undefined;
            this._clientPosition = undefined;
            this._doubleLeftClick = undefined;
            this._onMouseupCB = undefined;
        };
        /**
         * Gets the port at pointer position.
         * @public
         * @returns {UIPort} The port at pointer position.
         */
        UIStateMachineController.prototype.getPortAtPointerPosition = function () {
            var port;
            var element = this._getGraphElementAtPointerPosition();
            if (element && element.type === 3 /* CONNECTOR */ && element.data.uiElement instanceof UIPort) {
                port = element.data.uiElement;
            }
            return port;
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
         * The callback on the mouse down event.
         * @private
         * @param {EGraphIact.StateMachine} sm - The state machine.
         * @param {EGraphIact.IEventData} data - The data information.
         * @returns {EGraphIact.StateResult} The state result.
         */
        UIStateMachineController.prototype._onmousedown = function (sm, data) {
            var element = data.grElt;
            this._labelController.clearAllLabels();
            this._viewer.getContextualBarController().clearCommands();
            var result = { consume: true };
            if (data.inside) {
                // Unfocus unwanted div and focus main viewer
                window.getSelection().removeAllRanges();
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
                this._container.focus();
                if (data.button === 4 /* MIDDLE */) {
                    this._nodeIdSelectorsPanel.disablePaintMode();
                    result = this._graphPanning();
                }
                else if (data.button === 1 /* LEFT */) {
                    var mainGraph = sm.graph.data.uiElement.mainGraph;
                    this._doubleLeftClick = data.detail >= 2;
                    mainGraph.removeSmartSearch();
                    mainGraph.hideAllBlocksHalo();
                    if (element !== undefined && element !== null) {
                        element.data = (element.data !== undefined && element.data !== null) ? element.data : {};
                        var uiElement = data.grElt.data.uiElement;
                        if (!(uiElement instanceof UIBlock)) {
                            this._nodeIdSelectorsPanel.disablePaintMode();
                        }
                        if (data.modifiers === 2 /* SHIFT */) {
                            result = this._handleSelectionClick(data);
                        }
                        else if (element.type === 2 /* GROUP */) {
                            this._viewer.clearSelection();
                            result = this._handleGroupClick(data);
                        }
                        else if (element.type === 3 /* CONNECTOR */) {
                            result = this._handleConnectorClick(data);
                        }
                        else if (element.type === 1 /* NODE */) {
                            result = this._handleNodeClick(data);
                        }
                        else if (element.type === 4 /* EDGE */) {
                            this._viewer.replaceSelection(element);
                            result = this._handleEdgeClick(data);
                        }
                    }
                    else {
                        this._nodeIdSelectorsPanel.disablePaintMode();
                        result = this._createRectangleSelection(data);
                    }
                }
                else if (data.button === 2 /* RIGHT */) {
                    if (element === undefined || element.type === 2 /* GROUP */) {
                        this._displayContextualMenu({ x: data.clientPos[0] + 1, y: data.clientPos[1] + 1 });
                    }
                }
            }
            return result;
        };
        /**
         * The callback on the mouse move event.
         * @private
         * @param {EGraphIact.StateMachine} sm - The state machine.
         * @param {EGraphIact.IEventData} data - The data information.
         */
        UIStateMachineController.prototype._onmousemove = function (sm, data) {
            if (data.grElt !== undefined && data.grElt !== null) {
                this._clientPosition.clientX = data.clientPos !== undefined ? data.clientPos[0] : 0;
                this._clientPosition.clientY = data.clientPos !== undefined ? data.clientPos[1] : 0;
                var uiElement = data.grElt.data.uiElement;
                var isCtrlPressed = data.modifiers === 1 /* CTRL */;
                this._labelController.displayLabel(uiElement, isCtrlPressed, data.subElt);
            }
            else {
                //this.labelController.clearAllLabels(); // TODO: remove this line for test data port labels!!
            }
        };
        /**
         * The callback on the mouse up event.
         * We only gets the client position on mouse up for rectangular selection drag.
         * Otherwise it will display the contextual menu after dragging a block!
         * @private
         * @param {Event} event - The mouse up event.
         */
        UIStateMachineController.prototype._onMouseup = function (event) {
            if (this._stateMachine.drag instanceof EGraphIact.RectSelectionDrag) {
                this._clientPosition.clientX = event.clientX;
                this._clientPosition.clientY = event.clientY;
            }
        };
        /**
         * Gets the graph element at pointer position.
         * @public
         * @returns {EGraphCore.Selectable} The graph element at pointer position.
         */
        UIStateMachineController.prototype._getGraphElementAtPointerPosition = function () {
            var data = this._stateMachine.buildEventDataFromMouseEvent(this._clientPosition);
            var element = data.grElt !== undefined && data.grElt !== null ? data.grElt : undefined;
            return element;
        };
        /**
         * The callback on the state machine end drag event.
         * @private
         * @param {boolean} cancel - True to cancel the drag else false to confirm it.
         */
        UIStateMachineController.prototype._enddrag = function (cancel) {
            if (this._stateMachine.drag && this._stateMachine.drag.onend) {
                this._stateMachine.drag.onend(Boolean(cancel));
            }
            this._stateMachine.drag = null;
            if (cancel) {
                this._viewer.getContextualBarController().hideContextualBar();
            }
            else if (this._stateMachine.lastMouseEvent) {
                if (this._clientPosition.clientX === this._stateMachine.lastMouseEvent.clientX &&
                    this._clientPosition.clientY === this._stateMachine.lastMouseEvent.clientY) {
                    var pickInfo = this._stateMachine.pick.pick(this._clientPosition.clientX, this._clientPosition.clientY, this._stateMachine.domRoot);
                    var pickElt = pickInfo.grElt || undefined;
                    if (pickElt !== undefined && pickElt.data !== undefined && pickElt.data.uiElement !== undefined) {
                        var uiElement = pickElt.data.uiElement;
                        if (uiElement instanceof UIPort || uiElement instanceof UILink || uiElement instanceof UIBlock || uiElement instanceof UIComment) {
                            this._viewer.getContextualBarController().displayContextualBar(this._clientPosition.clientX, this._clientPosition.clientY);
                        }
                    }
                }
            }
        };
        /**
         * Handles the selection of elements in the graph.
         * @private
         * @param {EGraphIact.IEventData} data - The data information.
         * @returns {EGraphIact.StateResult} The state result.
         */
        UIStateMachineController.prototype._handleSelectionClick = function (data) {
            var element = data.grElt;
            if (element.data.graph !== undefined) {
                return this._createRectangleSelection(data);
            }
            else if (this._viewer.isSelected(element)) {
                this._viewer.removeFromSelection(element);
            }
            else {
                this._viewer.addToSelection(element);
            }
            return { consume: true };
        };
        /**
         * Handles the group mouse done event.
         * @private
         * @param {EGraphIact.IEventData} data - The data information.
         * @returns {EGraphIact.StateResult} The state result.
         */
        UIStateMachineController.prototype._handleGroupClick = function (data) {
            var stateResult = undefined;
            var element = data.grElt;
            var graph = this._viewer.getMainGraph();
            if (this._doubleLeftClick) {
                var viewerRect = this._viewer.getClientRect();
                graph.createSmartSearch(data.clientPos[0] - viewerRect.left, data.clientPos[1] - viewerRect.top, data.graphPos[0], data.graphPos[1]);
            }
            else if (graph.getView().isBorder(data.dom)) {
                this._stateMachine.startdrag(new UIGraphBorderMoveDrag(data.dom, element));
                stateResult = EGraphIact.EndDragOnLeftState;
            }
            else {
                return this._createRectangleSelection(data);
            }
            return { consume: true, state: stateResult };
        };
        /**
         * Handles the edge mouse done event.
         * @private
         * @param {EGraphIact.IEventData} data - The data information.
         * @returns {EGraphIact.StateResult} The state result.
         */
        UIStateMachineController.prototype._handleEdgeClick = function (data) {
            var link = data.grElt.data.uiElement;
            if (link !== undefined) {
                this._viewer.getContextualBarController().displayContextualBar(this._clientPosition.clientX, this._clientPosition.clientY);
                if (link.getModel() instanceof ControlLink) {
                    this._stateMachine.startdrag(new EGraphIact.EdgeReshapingDrag(this._stateMachine.graph, data.grElt));
                }
            }
            return { consume: true, state: EGraphIact.EndDragOnLeftState };
        };
        /**
         * Handles the node mouse done event.
         * @private
         * @param {EGraphIact.IEventData} data - The data information.
         * @returns {EGraphIact.StateResult} The state result.
         */
        UIStateMachineController.prototype._handleNodeClick = function (data) {
            var stateResult = EGraphIact.EndDragOnLeftState;
            var consume = true;
            var grElement = data.grElt;
            var uiElement = data.grElt.data.uiElement;
            var subElement = data.subElt;
            if (uiElement !== undefined) {
                if (uiElement instanceof UIBlock) {
                    var blockView = uiElement.getView();
                    if (blockView.isConfigurationIcon(subElement)) {
                        this._viewer.replaceSelection(grElement);
                        uiElement.openConfigurationDialog();
                        stateResult = null;
                    }
                    else if (blockView.isInfoIcon(subElement)) {
                        this._viewer.replaceSelection(grElement);
                        uiElement.onInfoIconClick();
                        stateResult = null;
                    }
                    else if (blockView.isCategoryIcon(subElement)) {
                        this._viewer.replaceSelection(grElement);
                        uiElement.onCategoryIconClick();
                        stateResult = null;
                    }
                    else if (blockView.isBreakpointIcon(subElement)) {
                        uiElement.onBreakpointIconClick();
                        stateResult = null;
                    }
                    else if (blockView.isBlockContainer(subElement)) {
                        if (this._doubleLeftClick) {
                            this._viewer.replaceSelection(grElement);
                            uiElement.onBlockDblClick();
                            stateResult = null;
                        }
                        else {
                            if (this._nodeIdSelectorsPanel.isPaintModeEnabled()) {
                                var result = this._nodeIdSelectorsPanel.setBlockNodeIdSelector(uiElement);
                                if (result) {
                                    this._viewer.getEditor().getHistoryController().registerEditAction(uiElement);
                                }
                            }
                            else {
                                this._viewer.replaceSelection(grElement);
                                this._stateMachine.startdrag(this._rootState.newDragForElement(this._stateMachine.graph, grElement, subElement));
                            }
                        }
                    }
                }
                else if (uiElement instanceof UIGraphDataDrawer) {
                    uiElement.onNodeClick(subElement);
                }
                else if (uiElement instanceof UIShortcut) {
                    this._viewer.replaceSelection(grElement);
                    this._stateMachine.startdrag(this._rootState.newDragForElement(this._stateMachine.graph, grElement, subElement));
                }
                else if (uiElement instanceof UIComment || uiElement instanceof UIPersistentLabel) {
                    var doReplaceSelection = true;
                    if (uiElement.getView().isNodeBorderElement(data.dom)) {
                        this._stateMachine.startdrag(new UINodeBorderMoveDrag(data.dom, uiElement));
                        stateResult = EGraphIact.EndDragOnLeftState;
                    }
                    else if (uiElement.getView().isNodeDraggableElement(data.dom)) {
                        this._stateMachine.startdrag(this._rootState.newDragForElement(this._stateMachine.graph, grElement, subElement));
                    }
                    else if (uiElement instanceof UIPersistentLabel && (uiElement.getView().isUnpinIconElement(data.dom) || uiElement.getView().isEvaluator(data.dom))) {
                        doReplaceSelection = false;
                    }
                    else {
                        consume = false;
                    }
                    if (doReplaceSelection) {
                        this._viewer.replaceSelection(grElement);
                    }
                }
            }
            return { consume: consume, state: stateResult };
        };
        /**
         * Handles the connector mouse done event.
         * @private
         * @param {EGraphIact.IEventData} data - The data information.
         * @returns {EGraphIact.StateResult} The state result.
         */
        UIStateMachineController.prototype._handleConnectorClick = function (data) {
            var element = data.grElt;
            var port = element.data.uiElement;
            var ctrlPressed = (data.modifiers === 1 /* CTRL */);
            var altPressed = (data.modifiers === 4 /* ALT */);
            if (port !== undefined) {
                if (port.getModel() instanceof ControlPort) {
                    if (port instanceof UIGraphControlPort && port.getView().isHandler(data.dom)) {
                        if (this._doubleLeftClick) {
                            port.openDialog();
                        }
                        else {
                            this._viewer.replaceSelection(element);
                            this._stateMachine.startdrag(new UIGraphControlPortMoveDrag(element.data.uiElement));
                        }
                    }
                    else if (port instanceof UIControlPort && this._doubleLeftClick) {
                        port.openDialog();
                    }
                    else {
                        var edgesToReroute = this._getEdgesToReroute(element, ctrlPressed);
                        if (edgesToReroute.length > 0) {
                            this._stateMachine.startdrag(new UIControlLinkRerouteDrag(this._stateMachine.graph, element, { id: 'reroot', edgesToReroute: edgesToReroute }));
                        }
                        else {
                            this._viewer.replaceSelection(element);
                            this._stateMachine.startdrag(new UIControlLinkConnectDrag(this._stateMachine.graph, element));
                        }
                    }
                }
                else if (port.getModel() instanceof DataPort && !(port instanceof UIGraphTestSubDataPort)) {
                    if (this._doubleLeftClick && port instanceof UIDataPort) {
                        if (port instanceof UIGraphTestDataPort) {
                            port.onConnectorDoubleClick();
                        }
                        else {
                            port.openDialog();
                        }
                    }
                    else if (altPressed) {
                        this._stateMachine.startdrag(new UIDataPortShortcutDrag(port));
                    }
                    else {
                        var edgesToReroute = this._getEdgesToReroute(element, ctrlPressed);
                        if (edgesToReroute.length > 0) {
                            this._stateMachine.startdrag(new UIDataLinkRerouteDrag(this._stateMachine.graph, element, { id: 'reroot', edgesToReroute: edgesToReroute }));
                        }
                        else {
                            this._viewer.replaceSelection(element);
                            this._stateMachine.startdrag(new UIDataLinkConnectDrag(this._stateMachine.graph, element));
                        }
                    }
                }
            }
            return { consume: true, state: EGraphIact.EndDragOnLeftState };
        };
        /**
         * Pans the graph in its viewer.
         * @private
         * @returns {EGraphIact.StateResult} The state result.
         */
        UIStateMachineController.prototype._graphPanning = function () {
            var _this = this;
            this._viewer.getContextualBarController().clearCommands();
            document.body.style.cursor = '-webkit-grab';
            this._stateMachine.startdrag(new EGraphIact.ViewpointMoveDrag(this._stateMachine.graphView));
            var stateResult = { consume: true, state: { onmouseup: undefined } };
            stateResult.state.onmouseup = function () {
                _this._stateMachine.enddrag();
                document.body.style.cursor = 'default';
                return { consume: true, state: undefined };
            };
            return stateResult;
        };
        /**
         * Creates a rectangular selection in the graph.
         * @private
         * @param {EGraphIact.IEventData} data - The data information.
         * @returns {EGraphIact.StateResult} The state result.
         */
        UIStateMachineController.prototype._createRectangleSelection = function (data) {
            var overlay = new EGraphViews.RectangleOverlay(this._stateMachine.graphView, {
                background: { className: 'sch-graph-selection-background' },
                rectangle: { className: 'sch-graph-selection-rectangle' }
            });
            var pickOptions = {
                overlapping: true,
                nodes: true,
                connectors: true,
                edges: true
            };
            var selectionMode = (data.modifiers === 2 /* SHIFT */) ? 1 /* ADD */ : 0 /* REPLACE */;
            var clientPosition = this._clientPosition;
            var applyCB = function () {
                var grView = this.grView;
                var viewer = grView.gr.data.uiElement;
                var pickedElements = grView.rectanglePick(this.x1, this.y1, this.x2, this.y2, this.pickOpts);
                if (this.selectionMode === 0 /* REPLACE */) {
                    viewer.updateSelection(pickedElements, this.selectionMode);
                    viewer.getContextualBarController().displayContextualBar(clientPosition.clientX, clientPosition.clientY);
                }
                else {
                    pickedElements.forEach(function (pickedElement) {
                        if (pickedElement.isSelected()) {
                            viewer.removeFromSelection(pickedElement);
                        }
                        else {
                            viewer.addToSelection(pickedElement);
                        }
                    });
                }
            };
            var rectDrag = new EGraphIact.RectSelectionDrag(this._stateMachine.graphView, data.graphPos[0], data.graphPos[1], overlay, pickOptions, selectionMode, applyCB);
            this._stateMachine.startdrag(rectDrag);
            return { consume: false, state: EGraphIact.EndDragOnLeftState };
        };
        /**
         * Gets the list of edges to reroute.
         * @private
         * @param {EGraphCore.Connector} connector - The connector element.
         * @param {boolean} ctrlPressed - True if control key is pressed else false.
         * @returns {EGraphCore.Edge[]} The list of edges to reroute.
         */
        UIStateMachineController.prototype._getEdgesToReroute = function (connector, ctrlPressed) {
            var edges = [];
            if (this._stateMachine.edgeRerouteOptions.active) {
                var selectedEdges = [];
                var allEdges = [];
                for (var edge = connector.children.first; edge; edge = edge.next) {
                    allEdges.push(edge.ref);
                    if (edge.ref.selected) {
                        selectedEdges.push(edge.ref);
                    }
                }
                edges = ctrlPressed ? allEdges : selectedEdges;
            }
            return edges;
        };
        /**
         * Displays the contextual menu.
         * @private
         * @param {IPosition} position - The position of the menu.
         */
        UIStateMachineController.prototype._displayContextualMenu = function (position) {
            var _this = this;
            WUXMenu.show([{
                    type: 'TitleItem',
                    title: 'Graph View'
                }, {
                    type: 'SeparatorItem'
                }, {
                    type: 'PushItem',
                    title: 'Center graph view',
                    accelerator: 'C',
                    fonticon: { content: 'wux-ui-3ds wux-ui-3ds-group' },
                    action: { callback: function () { return _this._viewer.centerView(); } } /*,
                    tooltip: {
                        title: 'Center graph view',
                        shortHelp: 'Centers the graph into the view.'
                    }*/
                }, {
                    type: 'PushItem',
                    title: 'Fit graph in view',
                    accelerator: 'F',
                    fonticon: { content: 'wux-ui-3ds wux-ui-3ds-resize-fullscreen' },
                    action: { callback: function () { return _this._viewer.zoomGraphToFitInView(); } }
                }, {
                    type: 'PushItem',
                    title: 'Zoom graph 1:1',
                    accelerator: 'Numpad0',
                    fonticon: { content: 'wux-ui-3ds wux-ui-3ds-zoom-selected' },
                    action: { callback: function () { return _this._viewer.zoomOneToOne(); } }
                }], {
                position: position
            });
        };
        return UIStateMachineController;
    }());
    /**
     * This class defines the graph root state.
     * @class UIGraphRootState
     * @extends EGraphIact.DefaultRootState
     */
    var UIGraphRootState = /** @class */ (function (_super) {
        __extends(UIGraphRootState, _super);
        /**
         * @constructor
         * @param {UIViewer} viewer - The viewer.
         */
        function UIGraphRootState(viewer) {
            var _this = _super.call(this) || this;
            _this._viewer = viewer;
            return _this;
        }
        /**
         * The callback on the mouse wheel event.
         * @protected
         * @param {EGraphIact.StateMachine} sm - The state machine.
         * @param {EGraphIact.IEventData} data - The data information.
         * @returns {EGraphIact.StateResult} The state result.
         */
        UIGraphRootState.prototype.onwheel = function (sm, data) {
            var _a, _b;
            this._viewer.getContextualBarController().clearCommands();
            var consume = false;
            var isPersistentLabel = ((_b = (_a = data === null || data === void 0 ? void 0 : data.grElt) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.uiElement) instanceof UIPersistentLabel;
            if (!isPersistentLabel) {
                var halfWidth = sm.graphView.domRoot.clientWidth / 2;
                var halfHeight = sm.graphView.domRoot.clientHeight / 2;
                var isCtrlPressed = data.modifiers & 2 /* SHIFT */;
                var domRootBBox = sm.domRoot.getBoundingClientRect();
                var posx = isCtrlPressed ? halfWidth : data.clientPos[0] - domRootBBox.left;
                var posy = isCtrlPressed ? halfHeight : data.clientPos[1] - domRootBBox.top;
                var scaleMin = sm.graphView.gr.zoomOpts.min;
                var scaleMax = sm.graphView.gr.zoomOpts.max;
                sm.graphView.zoominc(0.5 * data.wheelDelta, posx, posy, [scaleMin, scaleMax, 0.25]);
                consume = true;
                // TODO: edges picking areas
                // iacts.js exports.DefaultRootState.prototype.onwheel
                // Apply scale factor here on edges picking areas
                // sm.graph.updateEdgesPickingAreasSize(vpt[2]);
            }
            return { consume: consume };
        };
        /**
         * The callback on the graph element drag event.
         * @public
         * @param {EGraphCore.EGraph} gr - The graph.
         * @param {EGraphCore.Selectable} elt - The dragged element.
         * @param {Element} [subElt] - The optional sub element of the element to drag.
         * @returns {EGraphIact.SinglePtDrag} The drag constraint.
         */
        // eslint-disable-next-line class-methods-use-this
        UIGraphRootState.prototype.newDragForElement = function (gr, elt, subElt) {
            var result = null;
            if (elt.type !== 2 /* GROUP */) {
                if (elt.type === 1 /* NODE */) {
                    var uiElement = elt.data.uiElement;
                    if (uiElement instanceof UINode && uiElement.isDraggable()) {
                        result = new UINodeMoveDrag(gr);
                    }
                }
                else {
                    result = _super.prototype.newDragForElement.call(this, gr, elt, subElt);
                }
            }
            return result;
        };
        return UIGraphRootState;
    }(EGraphIact.DefaultRootState));
    return UIStateMachineController;
});
