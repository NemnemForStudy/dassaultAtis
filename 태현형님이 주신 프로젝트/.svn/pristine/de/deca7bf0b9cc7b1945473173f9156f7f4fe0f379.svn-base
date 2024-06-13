/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkRerouteDrag'/>
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
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkRerouteDrag", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphIact"], function (require, exports, EGraphIact) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a link reroute drag interaction.
     * @class UILinkRerouteDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkRerouteDrag
     * @extends EGraphIact.RerouteConnConnectDrag
     * @abstract
     * @private
     */
    var UILinkRerouteDrag = /** @class */ (function (_super) {
        __extends(UILinkRerouteDrag, _super);
        /**
         * @constructor
         * @param {EGraphCore.EGraph} graph - The graph.
         * @param {EGraphCore.Connector} currentConnector - The connector from which the drag began.
         * @param {EGraphIact.IRerouteOptions} subElt - The reroute options.
         */
        function UILinkRerouteDrag(graph, currentConnector, subElt) {
            var _this = _super.call(this, graph, currentConnector, subElt) || this;
            _this._beginPorts = [];
            var viewer = graph.data.uiElement;
            _this._graph = viewer.getMainGraph();
            _this._currentPort = currentConnector.data.uiElement;
            _this.beginConnectors.forEach(function (connector) { return _this._beginPorts.push(connector.data.uiElement); });
            return _this;
        }
        /**
         * The edge disconnection callback.
         * @param {EGraphCore.Edge} edge - The disconnected edge.
         * @param {EGraphCore.Connector} otherConnector - The other connector.
         * @param {boolean} temporaryEdge - True if the edge is a temporary edge.
         * @param {boolean} [nextOtherConnector] - Not null when the disconnection is
         * immediately followed by a connection to a not temporary connector.
         * @protected
         */
        // eslint-disable-next-line no-unused-vars
        UILinkRerouteDrag.prototype.ondisconnect = function (edge, otherConnector, temporaryEdge, nextOtherConnector) {
            this._currentPort.getView().hideRerouteHandler();
            this._beginPorts.forEach(function (port) { return port.getView().hideRerouteHandler(); });
        };
        /**
         * The connector drag end callback.
         * @override
         * @public
         * @param {boolean} cancel - True when the drag is cancel else false.
         */
        UILinkRerouteDrag.prototype.onend = function (cancel) {
            EGraphIact.ConnConnectDrag.prototype.onend.call(this, cancel);
        };
        return UILinkRerouteDrag;
    }(EGraphIact.RerouteConnConnectDrag));
    return UILinkRerouteDrag;
});
