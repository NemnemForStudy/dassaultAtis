/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortExpandDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortExpandDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIFadeOutDialog", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVPropertyExposure", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUIDataPortExpandDialog"], function (require, exports, UIFadeOutDialog, UIDGVPropertyExposure, UINLS, GraphBlock, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data port expand dialog.
     * @class UIDataPortExpandDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortExpandDialog
     * @extends UIFadeOutDialog
     * @private
     */
    var UIDataPortExpandDialog = /** @class */ (function (_super) {
        __extends(UIDataPortExpandDialog, _super);
        /**
         * @constructor
         * @public
         * @param {UIEditor} editor - The UI editor.
         * @param {UIDataPort} dataPortUI - The UI data port.
         */
        function UIDataPortExpandDialog(editor, dataPortUI) {
            var _this = _super.call(this, {
                title: UINLS.get('dialogTitleDataPortPropertyExposureEditor'),
                className: 'sch-dialog-expand-dataport',
                immersiveFrame: editor.getImmersiveFrame(),
                resizableFlag: true,
                width: 300,
                minWidth: 300,
                height: 200
            }) || this;
            _this._dataPortUI = dataPortUI;
            return _this;
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
         * Removes the dialog.
         * @public
         */
        UIDataPortExpandDialog.prototype.remove = function () {
            this._dataPortUI = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the data grid view property exposure.
         * @public
         * @returns {UIDGVPropertyExposure} The data grid view property exposure.
         */
        UIDataPortExpandDialog.prototype.getDataGridView = function () {
            return this._dataGridView;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UIDataPortExpandDialog.prototype._onClose = function () {
            this._dataPortUI.getParentGraph().getViewer().takeFocus();
            this._dataGridView.remove();
            this._dataGridView = undefined;
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIDataPortExpandDialog.prototype._onCreateContent = function () {
            this._dataGridView = new UIDGVPropertyExposure(this._dataPortUI, this._onOk.bind(this));
            this._content.appendChild(this._dataGridView.getElement());
            _super.prototype._onCreateContent.call(this);
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIDataPortExpandDialog.prototype._onOk = function () {
            var blockModel = this._dataPortUI.getModel().block;
            var isLocalPort = this._dataPortUI.getModel().getType() === ModelEnums.EDataPortType.eLocal;
            var parent = this._dataPortUI.getParent();
            var isGraph = blockModel instanceof GraphBlock;
            var subDataPortUpdateList = [];
            if (blockModel.isTemplate() && !isLocalPort) {
                //this.updateExternalSubDataPorts(parent);
                // TO FINISH: create sub data port that exist on the model but does not exist on the UI!
                // check that sub data port that does not exist on the model are correctly created on the UI!
                // check that delete sub data port from the UI does not delete from the template
                // check that deleted or created sub data port from the template does not impact the instance!
                subDataPortUpdateList = this._updateExternalTemplateSubDataPorts();
            }
            else if (isGraph && !isLocalPort) {
                var UIGraphBlockCtor = require('DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphBlock');
                subDataPortUpdateList = parent instanceof UIGraphBlockCtor ? this._updateExternalSubDataPorts(parent) : this._updateInternalSubDataPorts(parent.blockView);
                this._dataPortUI.updateWidth();
            }
            else {
                subDataPortUpdateList = this._dataGridView.getExposedDataPortsName();
            }
            this._dataPortUI.getModel().updateDataPorts(subDataPortUpdateList);
            if (!isGraph) {
                this._dataPortUI.getParentGraph().updateSizeFromBlocks();
            }
            var graph = (isGraph ? this._dataPortUI.getParent() : this._dataPortUI.getParentGraph());
            graph.getEditor().getHistoryController().registerEditAction(this._dataPortUI);
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
         * Exposes the sub data ports according to the selected names from the tree list.
         * @private
         * @returns {Array<string>} The list of sub data port name to expose.
         */
        UIDataPortExpandDialog.prototype._exposeSubDataPortsFromTreeList = function () {
            var _this = this;
            var exposedSubDataPortsName = this._dataGridView.getExposedDataPortsName();
            exposedSubDataPortsName.forEach(function (name) {
                var subDataPort = _this._dataPortUI.getUISubDataPortByName(name);
                if (subDataPort !== undefined) { // Change the exposed state of the sub data port that already exists on the model
                    subDataPort.setExposedState(true);
                }
            });
            return exposedSubDataPortsName;
        };
        /**
         * Updates the internal sub data ports.
         * @private
         * @param {UIGraphBlock} parent - The parent UI graph block.
         * @returns {Array<string>} The list of sub data port name to expose.
         */
        UIDataPortExpandDialog.prototype._updateInternalSubDataPorts = function (parent) {
            var _this = this;
            var updateList = this._exposeSubDataPortsFromTreeList();
            if (parent !== undefined) {
                // Get the list of external sub data ports to include the visible ones
                var externalDataPort = parent.getUIDataPortFromModel(this._dataPortUI.getModel());
                var externalSubDataPorts = externalDataPort.getAllSubDataPorts();
                externalSubDataPorts.forEach(function (externalSubDataPort) {
                    var externalSubDataPortName = externalSubDataPort.getModel().getName();
                    if (updateList.indexOf(externalSubDataPortName) === -1) {
                        if (externalSubDataPort.isExposed()) {
                            updateList.push(externalSubDataPortName);
                        }
                        var internalSubDataPort = _this._dataPortUI.getUISubDataPortByName(externalSubDataPortName);
                        if (internalSubDataPort === null || internalSubDataPort === void 0 ? void 0 : internalSubDataPort.isExposed()) {
                            internalSubDataPort.setExposedState(false);
                        }
                    }
                });
                // The other internal sub data ports that are no more selected and
                // not externaly visible will be removed by omission!
            }
            return updateList;
        };
        /**
         * Updates the external sub data ports.
         * @private
         * @param {UIGraphBlock} parent - The parent UI graph block.
         * @returns {Array<string>} The list of sub data port name to expose.
         */
        UIDataPortExpandDialog.prototype._updateExternalSubDataPorts = function (parent) {
            var updateList = this._exposeSubDataPortsFromTreeList();
            // Remove the data port that does not exist
            var dataPortIndex = parent.getUIDataPorts().indexOf(this._dataPortUI);
            var externalSubDataPorts = this._dataPortUI.getAllSubDataPorts();
            externalSubDataPorts.forEach(function (externalSubDataPort, subDataPortIndex) {
                var externalSubDataPortName = externalSubDataPort.getModel().getName();
                if (updateList.indexOf(externalSubDataPortName) === -1) {
                    if (!externalSubDataPort.isExposed()) {
                        // If sub data port is not exposed, this means it is internally exposed so we do not remove
                        updateList.push(externalSubDataPortName);
                    }
                    else {
                        // If sub data port is exposed, we need to unexpose it if it exist internally or remove it if it does not.
                        if (parent.getInternalSubDataPortExposedState(dataPortIndex, subDataPortIndex)) {
                            externalSubDataPort.setExposedState(false);
                            updateList.push(externalSubDataPortName);
                        }
                        // Else Remove from model by omission
                    }
                }
            });
            return updateList;
        };
        /**
         * Updates the external template sub data port.
         * @private
         * @returns {string[]} The list of sub data port name to expose.
         */
        UIDataPortExpandDialog.prototype._updateExternalTemplateSubDataPorts = function () {
            var _this = this;
            var exposedSubDataPortsName = this._dataGridView.getExposedDataPortsName();
            exposedSubDataPortsName.forEach(function (subDataPortName) {
                var subDataPortUI = _this._dataPortUI.getUISubDataPortByName(subDataPortName);
                if (subDataPortUI !== undefined) {
                    // Change the exposed state of the sub data port that already exists on the model
                    subDataPortUI.setExposedState(true);
                } /* else {
                    // check the sub data port exist on the model
                    const subDataPortModel = this.dataPortUI.model.getDataPortByName(subDataPortName);
                    if (subDataPortModel !== undefined) {
                        //create the subdataport
                    }
                }*/
            });
            this._dataPortUI.updateWidth();
            return exposedSubDataPortsName;
        };
        return UIDataPortExpandDialog;
    }(UIFadeOutDialog));
    return UIDataPortExpandDialog;
});
