/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockDataPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockDataPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIDataPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/connectors/EPSSchematicsUIBlockDataPort"], function (require, exports, UIDataPortView, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI block data port view.
     * @class UIBlockDataPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockDataPortView
     * @extends UIDataPortView
     * @private
     */
    var UIBlockDataPortView = /** @class */ (function (_super) {
        __extends(UIBlockDataPortView, _super);
        /**
         * @constructor
         * @param {UIBlockDataPort} port - The UI block data port.
         */
        function UIBlockDataPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIBlockDataPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-block-port');
            if (this._port.isStartPort()) {
                this._createInputConnector(connector);
            }
            else {
                this._createOutputConnector(connector);
            }
            this.updateConnectorWidth();
            return this._element;
        };
        /**
         * Updates the shortcut link display.
         * @public
         */
        UIBlockDataPortView.prototype.updateShortcutLinkDisplay = function () {
            _super.prototype.updateShortcutLinkDisplay.call(this);
            if (this._shortcutText !== undefined) {
                if (this._port.isStartPort()) {
                    var startPort = this._port.getModel().getDataLinks()[0].getStartPort();
                    var graphUI = this._port.getParentGraph();
                    var isSubDataPort = startPort.dataPort !== undefined;
                    var blockModel = isSubDataPort ? startPort.dataPort.block : startPort.block;
                    var isRootGraph = blockModel.graph === undefined;
                    var blockUI = isRootGraph ? graphUI : graphUI.getUIBlockFromModel(blockModel);
                    var dataPortUI = void 0;
                    if (isSubDataPort) {
                        var parentDataPortUI = blockUI.getUIDataPortFromModel(startPort.dataPort);
                        dataPortUI = parentDataPortUI.getUISubDataPortFromModel(startPort);
                    }
                    else {
                        dataPortUI = blockUI.getUIDataPortFromModel(startPort);
                    }
                    var targetPortName = dataPortUI.getName();
                    this._shortcutText.textContent = targetPortName;
                }
            }
        };
        /**
         * Updates the connector width.
         * @public
         */
        UIBlockDataPortView.prototype.updateConnectorWidth = function () {
            var subDataPortLength = this._port.getExposedSubDataPorts().length;
            if (this._port.isStartPort()) {
                this._updateInputConnectorWidth(subDataPortLength);
            }
            else {
                this._updateOutputConnectorWidth(subDataPortLength);
            }
        };
        return UIBlockDataPortView;
    }(UIDataPortView));
    return UIBlockDataPortView;
});
