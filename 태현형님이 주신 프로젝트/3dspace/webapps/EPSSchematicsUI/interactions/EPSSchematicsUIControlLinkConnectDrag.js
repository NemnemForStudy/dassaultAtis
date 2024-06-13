/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUIControlLinkConnectDrag'/>
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
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUIControlLinkConnectDrag", ["require", "exports", "DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkConnectDrag", "DS/EPSSchematicsUI/edges/EPSSchematicsUIControlLink", "DS/EPSSchematicsModelWeb/EPSSchematicsControlLink", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphViews"], function (require, exports, UILinkConnectDrag, UIControlLink, ControlLink, Tools, EGraphCore, EGraphViews) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a control link connect drag interaction.
     * @class UIControlLinkConnectDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUIControlLinkConnectDrag
     * @extends UILinkConnectDrag
     * @private
     */
    var UIControlLinkConnectDrag = /** @class */ (function (_super) {
        __extends(UIControlLinkConnectDrag, _super);
        /**
         * @constructor
         * @param {EGraphCore.EGraph} gr - The concerned graph.
         * @param {EGraphCore.Connector} c - The concerned connector.
         */
        function UIControlLinkConnectDrag(gr, c) {
            return _super.call(this, gr, c) || this;
        }
        /**
         * Instantiates a temporary edge that follows the pointer
         * when no target connector is picked.
         * @public
         * @returns {EGraphCore.Edge} The new temporary edge.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkConnectDrag.prototype.newTempEdge = function () {
            return new EGraphCore.Edge(new EGraphViews.SVGEdgeView('sch-control-link-temp'));
        };
        /**
         * Instantiates the actual created edge.
         * @public
         * @param {EGraphCore.Connector} c1 - The first connector.
         * @param {EGraphCore.Connector} c2 - The second connector.
         * @returns {EGraphCore.Edge} The new edge.
         */
        // eslint-disable-next-line no-unused-vars
        UIControlLinkConnectDrag.prototype.newEdge = function (c1, c2) {
            var controlLink = new UIControlLink(this._graph, new ControlLink());
            return controlLink.getDisplay();
        };
        /**
         * Tests if a connector can accept the drag.
         * @public
         * @param {EGraphCore.Connector} c1 - The dragged connector.
         * @param {EGraphCore.Connector} c2 - The connector to test.
         * @returns {boolean} True to accept the connection else false.
         */
        UIControlLinkConnectDrag.prototype.onaccept = function (c1, c2) {
            var port1 = c1.data.uiElement;
            var port2 = c2.data.uiElement;
            return this._graph.getModel().isControlLinkable(port1.getModel(), port2.getModel());
        };
        /**
         * The edge connection callback.
         * @public
         * @param {EGraphCore.Edge} edge - The edge.
         * @param {EGraphCore.Connector} otherConnector - The other connector.
         * @param {boolean} temporaryEdge - True if the edge is a temporary edge.
         */
        UIControlLinkConnectDrag.prototype.onconnect = function (edge, otherConnector, temporaryEdge) {
            if (!temporaryEdge) {
                var port1 = edge.cl1.c.data.uiElement;
                var port2 = edge.cl2.c.data.uiElement;
                var doAddFramebreak = port1.getEditor().getOptions().enableFramebreaks && Tools.isFrameBreakAddable(port1.getModel(), port2.getModel(), this._graph.getModel());
                if (doAddFramebreak) {
                    edge.data.uiElement.getModel().setWaitCount(1);
                }
            }
        };
        /**
         * The connector drag end callback.
         * @override
         * @public
         * @param {boolean} cancel - True when the drag is cancel else false.
         */
        UIControlLinkConnectDrag.prototype.onend = function (cancel) {
            _super.prototype.onend.call(this, cancel);
            if (this.edge !== undefined && this.edge !== null) {
                var port1 = this.edge.cl1.c.data.uiElement;
                var port2 = this.edge.cl2.c.data.uiElement;
                this.edge.remove();
                var controlLink = this._graph.getModel().createControlLink(port1.getModel(), port2.getModel());
                controlLink.setWaitCount(this.edge.data.uiElement.getModel().getWaitCount());
                this._graph.getViewer().getEditor().getHistoryController().registerCreateAction(this.edge.data.uiElement);
            }
        };
        return UIControlLinkConnectDrag;
    }(UILinkConnectDrag));
    return UIControlLinkConnectDrag;
});
