/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataLinkRerouteDrag'/>
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
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataLinkRerouteDrag", ["require", "exports", "DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkRerouteDrag", "DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphViews", "DS/EPSSchematicsModelWeb/EPSSchematicsDataLink"], function (require, exports, UILinkRerouteDrag, UIDataLink, EGraphCore, EGraphViews, DataLink) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a data link reroute drag interaction.
     * @class UIDataLinkRerouteDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataLinkRerouteDrag
     * @extends UILinkRerouteDrag
     * @private
     */
    var UIDataLinkRerouteDrag = /** @class */ (function (_super) {
        __extends(UIDataLinkRerouteDrag, _super);
        /**
         * @constructor
         * @param {EGraphCore.EGraph} graph - The graph.
         * @param {EGraphCore.Connector} currentConnector - The connector from which the drag began.
         * @param {EGraphIact.IRerouteOptions} subElt - The reroute options.
         */
        function UIDataLinkRerouteDrag(graph, currentConnector, subElt) {
            var _this = _super.call(this, graph, currentConnector, subElt) || this;
            _this._reroutedLinks = _this.edgesToReroute.map(function (edge) { return edge.data.uiElement.getModel(); });
            return _this;
        }
        /**
         * Instantiates a temporary edge that follows the pointer
         * when no target connector is picked.
         * @protected
         * @returns {EGraphCore.Edge} The new temporary edge.
         */
        UIDataLinkRerouteDrag.prototype.newTempEdge = function () {
            this._graph.highlightCompatibleDataPortsFromList(this._beginPorts, this._reroutedLinks);
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
        UIDataLinkRerouteDrag.prototype.newEdge = function (c1, c2) {
            var dataLink = new UIDataLink(this._graph, new DataLink());
            return dataLink.getDisplay();
        };
        /**
         * Tests if a connector can accept the drag.
         * @protected
         * @param {EGraphCore.Connector} c1 - The dragged connector.
         * @param {EGraphCore.Connector} c2 - The connector to test.
         * @returns {boolean} True to accept the connection else false.
         */
        UIDataLinkRerouteDrag.prototype.onaccept = function (c1, c2) {
            return this._graph.getModel().isDataLinkable(c1.data.uiElement.getModel(), c2.data.uiElement.getModel(), this._reroutedLinks, true);
        };
        /**
         * The edge connection callback.
         * @protected
         * @param {EGraphCore.Edge} edge - The edge.
         * @param {EGraphCore.Connector} otherConnector - The other connector.
         * @param {boolean} temporaryEdge - True if the edge is a temporary edge.
         */
        UIDataLinkRerouteDrag.prototype.onconnect = function (edge, otherConnector, temporaryEdge) {
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
        UIDataLinkRerouteDrag.prototype.onend = function (cancel) {
            var _this = this;
            _super.prototype.onend.call(this, cancel);
            this._graph.unhighlightCompatibleDataPorts();
            if (this.removed) {
                if (this.edges.length <= 0) {
                    this.edgesToReroute.forEach(function (edge) {
                        var link = edge.data.uiElement;
                        var startPort = link.getStartPort();
                        var endPort = link.getEndPort();
                        _this._graph.rerouteUIDataLink(link, startPort, endPort);
                    });
                }
                else {
                    this.edgesToReroute.forEach(function (edge) { return _this._graph.getModel().removeDataLink(edge.data.uiElement.getModel()); });
                    this.edges.forEach(function (edge) {
                        var port1 = edge.cl1.c.data.uiElement;
                        var port2 = edge.cl2.c.data.uiElement;
                        _this._graph.getModel().createDataLink(port1.getModel(), port2.getModel(), true);
                        edge.remove();
                    });
                }
            }
        };
        return UIDataLinkRerouteDrag;
    }(UILinkRerouteDrag));
    return UIDataLinkRerouteDrag;
});
