/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIGraphDataDrawerDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIGraphDataDrawerDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUITemporaryModelDialog", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDataPort", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, UITemporaryModelDialog, UIDGVDataPort, UINLS, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph data drawer dialog.
     * @class UIGraphDataDrawerDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIGraphDataDrawerDialog
     * @extends UITemporaryModelDialog
     * @private
     */
    var UIGraphDataDrawerDialog = /** @class */ (function (_super) {
        __extends(UIGraphDataDrawerDialog, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - THe UI graph.
         * @param {ModelEnums.EDataPortType} portType - The data port type.
         */
        function UIGraphDataDrawerDialog(graph, portType) {
            var _this = _super.call(this, graph.getEditor(), graph.getModel(), {
                className: 'sch-graph-data-drawer-dialog',
                title: UIGraphDataDrawerDialog._getTitle(portType),
                immersiveFrame: graph.getEditor().getImmersiveFrame(),
                width: 700, minWidth: 300, height: 400, minHeight: 200
            }) || this;
            _this._graph = graph;
            _this._portType = portType;
            return _this;
        }
        /**
         * Removes the dialog.
         * @public
         */
        UIGraphDataDrawerDialog.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the dialog!
            this._graph = undefined;
            this._portType = undefined;
            this._dgvDataPorts = undefined;
        };
        /**
         * Gets the data grid view data port.
         * @public
         * @returns {UIDGVDataPort} The data grid view data port.
         */
        UIGraphDataDrawerDialog.prototype.getDataGridViewDataPort = function () {
            return this._dgvDataPorts;
        };
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UIGraphDataDrawerDialog.prototype._onClose = function () {
            if (this._dgvDataPorts) {
                this._dgvDataPorts.remove();
                this._dgvDataPorts = undefined;
            }
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIGraphDataDrawerDialog.prototype._onCreateContent = function () {
            _super.prototype._onCreateContent.call(this);
            this._dgvDataPorts = new UIDGVDataPort(this._editor, this._tmpModel, this._portType);
            this._content.appendChild(this._dgvDataPorts.getElement());
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIGraphDataDrawerDialog.prototype._onOk = function () {
            _super.prototype._onOk.call(this);
            this._graph.getEditor().getHistoryController().registerEditAction(this._graph);
        };
        /**
         * Gets the dialog title.
         * @private
         * @static
         * @param {ModelEnums.EDataPortType} portType - The data port type.
         * @returns {string} The dialog title.
         */
        UIGraphDataDrawerDialog._getTitle = function (portType) {
            var title;
            if (portType === ModelEnums.EDataPortType.eInput) {
                title = UINLS.get('dialogTitleInputDataPortsEditor');
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                title = UINLS.get('dialogTitleOutputDataPortsEditor');
            }
            else if (portType === ModelEnums.EDataPortType.eLocal) {
                title = UINLS.get('dialogTitleLocalDataPortsEditor');
            }
            return title;
        };
        return UIGraphDataDrawerDialog;
    }(UITemporaryModelDialog));
    return UIGraphDataDrawerDialog;
});
