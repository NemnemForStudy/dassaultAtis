/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUIControlLinkRerouteDrag'/>
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
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUIControlLinkRerouteDrag", ["require", "exports", "DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkRerouteDrag", "DS/EPSSchematicsUI/interactions/EPSSchematicsUIControlLinkConnectDrag"], function (require, exports, UILinkRerouteDrag, UIControlLinkConnectDrag) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a control link reroute drag interaction.
     * @class UIControlLinkRerouteDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUIControlLinkRerouteDrag
     * @extends UILinkRerouteDrag
     * @private
     */
    var UIControlLinkRerouteDrag = /** @class */ (function (_super) {
        __extends(UIControlLinkRerouteDrag, _super);
        /**
         * @constructor
         * @param {EGraphCore.EGraph} graph - The graph.
         * @param {EGraphCore.Connector} currentConnector - The connector from which the drag began.
         * @param {EGraphIact.IRerouteOptions} subElt - The reroute options.
         */
        function UIControlLinkRerouteDrag(graph, currentConnector, subElt) {
            return _super.call(this, graph, currentConnector, subElt) || this;
        }
        /**
         * Instantiates a temporary edge that follows the pointer
         * when no target connector is picked.
         * @protected
         * @returns {EGraphCore.Edge} The new temporary edge.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkRerouteDrag.prototype.newTempEdge = function () {
            return UIControlLinkConnectDrag.prototype.newTempEdge.call(this);
        };
        /**
         * Instantiates the actual created edge.
         * @protected
         * @param {EGraphCore.Connector} c1 - The first connector.
         * @param {EGraphCore.Connector} c2 - The second connector.
         * @returns {EGraphCore.Edge} The new edge.
         */
        // eslint-disable-next-line no-unused-vars
        UIControlLinkRerouteDrag.prototype.newEdge = function (c1, c2) {
            return UIControlLinkConnectDrag.prototype.newEdge.call(this);
        };
        /**
         * Tests if a connector can accept the drag.
         * @protected
         * @param {EGraphCore.Connector} c1 - The dragged connector.
         * @param {EGraphCore.Connector} c2 - The connector to test.
         * @returns {boolean} True to accept the connection else false.
         */
        UIControlLinkRerouteDrag.prototype.onaccept = function (c1, c2) {
            return UIControlLinkConnectDrag.prototype.onaccept.call(this, c1, c2);
        };
        /**
         * The edge connection callback.
         * @protected
         * @param {EGraphCore.Edge} edge - The edge.
         * @param {EGraphCore.Connector} otherConnector - The other connector.
         * @param {boolean} temporaryEdge - True if the edge is a temporary edge.
         */
        UIControlLinkRerouteDrag.prototype.onconnect = function (edge, otherConnector, temporaryEdge) {
            UIControlLinkConnectDrag.prototype.onconnect.call(this, edge, otherConnector, temporaryEdge);
        };
        /**
         * The connector drag end callback.
         * @override
         * @public
         * @param {boolean} cancel - True when the drag is cancel else false.
         */
        UIControlLinkRerouteDrag.prototype.onend = function (cancel) {
            var _this = this;
            _super.prototype.onend.call(this, cancel);
            this._graph.unhighlightCompatibleDataPorts();
            if (this.removed) {
                var controlLinks_1 = [];
                if (this.edges.length <= 0) {
                    this.edgesToReroute.forEach(function (edge) {
                        var link = edge.data.uiElement;
                        var startPort = link.getStartPort();
                        var endPort = link.getEndPort();
                        var waitCount = link.getModel().getWaitCount();
                        _this._graph.getModel().removeControlLink(link.getModel());
                        var controlLink = _this._graph.getModel().createControlLink(startPort.getModel(), endPort.getModel());
                        controlLink.setWaitCount(waitCount);
                        var graphControlLinks = _this._graph.getControlLinks();
                        var controlLinkUI = graphControlLinks[graphControlLinks.length - 1];
                        if (controlLinkUI.getModel() === controlLink) {
                            controlLinks_1.push(controlLinkUI.getDisplay());
                        }
                    });
                }
                else {
                    this.edgesToReroute.forEach(function (edge) { return _this._graph.getModel().removeControlLink(edge.data.uiElement.getModel()); });
                    this.edges.forEach(function (edge) {
                        var port1 = edge.cl1.c.data.uiElement;
                        var port2 = edge.cl2.c.data.uiElement;
                        var controlLink = _this._graph.getModel().createControlLink(port1.getModel(), port2.getModel());
                        controlLink.setWaitCount(edge.data.uiElement.getModel().getWaitCount());
                        edge.remove();
                        var graphControlLinks = _this._graph.getControlLinks();
                        var controlLinkUI = graphControlLinks[graphControlLinks.length - 1];
                        if (controlLinkUI.getModel() === controlLink) {
                            controlLinks_1.push(controlLinkUI.getDisplay());
                        }
                    });
                }
                this._graph.getViewer().updateSelection(controlLinks_1);
            }
        };
        return UIControlLinkRerouteDrag;
    }(UILinkRerouteDrag));
    return UIControlLinkRerouteDrag;
});
