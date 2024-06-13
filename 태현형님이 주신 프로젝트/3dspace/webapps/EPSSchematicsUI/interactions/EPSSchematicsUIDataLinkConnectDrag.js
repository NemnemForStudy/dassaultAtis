/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataLinkConnectDrag'/>
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
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataLinkConnectDrag", ["require", "exports", "DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkConnectDrag", "DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink", "DS/EPSSchematicsModelWeb/EPSSchematicsDataLink", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphViews"], function (require, exports, UILinkConnectDrag, UIDataLink, DataLink, EGraphCore, EGraphViews) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a data link connect drag interaction.
     * @class UIDataLinkConnectDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataLinkConnectDrag
     * @extends UILinkConnectDrag
     * @private
     */
    var UIDataLinkConnectDrag = /** @class */ (function (_super) {
        __extends(UIDataLinkConnectDrag, _super);
        /**
         * @constructor
         * @param {EGraphCore.EGraph} gr - The concerned graph.
         * @param {EGraphCore.Connector} c - The concerned connector.
         */
        function UIDataLinkConnectDrag(gr, c) {
            return _super.call(this, gr, c) || this;
        }
        /**
         * Instantiates a temporary edge that follows the pointer
         * when no target connector is picked.
         * @protected
         * @returns {EGraphCore.Edge} The new temporary edge.
         */
        // eslint-disable-next-line class-methods-use-this
        UIDataLinkConnectDrag.prototype.newTempEdge = function () {
            this._graph.highlightCompatibleDataPorts(this._port);
            return new EGraphCore.Edge(new EGraphViews.SVGEdgeView('sch-data-link-path temp'));
        };
        /**
         * Instantiates the actual created edge.
         * @protected
         * @param {EGraphCore.Connector} c1 - The first connector.
         * @param {EGraphCore.Connector} c2 - The second connector.
         * @returns {EGraphCore.Edge} The new edge.
         */
        // eslint-disable-next-line no-unused-vars
        UIDataLinkConnectDrag.prototype.newEdge = function (c1, c2) {
            var dataLink = new UIDataLink(this._graph, new DataLink(), true);
            return dataLink.getDisplay();
        };
        /**
         * Tests if a connector can accept the drag.
         * @protected
         * @param {EGraphCore.Connector} c1 - The dragged connector.
         * @param {EGraphCore.Connector} c2 - The connector to test.
         * @returns {boolean} True to accept the connection else false.
         */
        UIDataLinkConnectDrag.prototype.onaccept = function (c1, c2) {
            var port1 = c1.data.uiElement;
            var port2 = c2.data.uiElement;
            return this._graph.isDataPortLinkable(port1, port2, [], true);
        };
        /**
         * The edge connection callback.
         * @protected
         * @param {EGraphCore.Edge} edge - The edge.
         * @param {EGraphCore.Connector} otherConnector - The other connector.
         * @param {boolean} temporaryEdge - True if the edge is a temporary edge.
         */
        UIDataLinkConnectDrag.prototype.onconnect = function (edge, otherConnector, temporaryEdge) {
            if (!temporaryEdge) {
                this._graph.unhighlightCompatibleDataPorts();
            }
        };
        /**
         * The connector drag end callback.
         * @override
         * @public
         * @param {boolean} cancel - True when the drag is cancel else false.
         */
        // eslint-disable-next-line no-unused-vars
        UIDataLinkConnectDrag.prototype.onend = function (cancel) {
            _super.prototype.onend.call(this, cancel);
            this._graph.unhighlightCompatibleDataPorts();
            if (this.edge !== undefined && this.edge !== null) {
                var port1 = this.edge.cl1.c.data.uiElement;
                var port2 = this.edge.cl2.c.data.uiElement;
                this._graph.getModel().createDataLink(port1.getModel(), port2.getModel(), true);
                this.edge.remove();
                this._graph.getViewer().getEditor().getHistoryController().registerCreateAction(this.edge.data.uiElement);
            }
        };
        return UIDataLinkConnectDrag;
    }(UILinkConnectDrag));
    return UIDataLinkConnectDrag;
});
