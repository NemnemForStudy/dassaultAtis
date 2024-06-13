/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTools'/>
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTools", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsSetting"], function (require, exports, ModelEnums, Tools, TypeLibrary, UITools, DataPort, Setting) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view tools.
     * @class UIDGVTools
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTools
     * @private
     */
    var UIDGVTools = /** @class */ (function () {
        function UIDGVTools() {
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                    _   _    _    __  __ _____                                  //
        //                                   | \ | |  / \  |  \/  | ____|                                 //
        //                                   |  \| | / _ \ | |\/| |  _|                                   //
        //                                   | |\  |/ ___ \| |  | | |___                                  //
        //                                   |_| \_/_/   \_\_|  |_|_____|                                 //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the data item name cell editable state.
         * @public
         * @static
         * @param {UIEditor} editor - The UI editor.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort|Setting} dataItem - The data port or setting.
         * @returns {boolean} - The data item name cell editable state.
         */
        UIDGVTools.getDataItemNameCellEditableState = function (editor, cellInfos, dataItem) {
            var result = false;
            if (editor && (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) && dataItem) {
                result = dataItem.isNameSettable();
                result = result && !editor.getTraceController().getPlayingState();
            }
            return result;
        };
        /**
         * Sets the data item name cell value.
         * @public
         * @static
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort|Setting} dataItem - The data port or setting.
         * @param {string} newName - The new name.
         */
        UIDGVTools.setDataItemNameCellValue = function (cellInfos, dataItem, newName) {
            if ((cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) && dataItem) {
                var previousName = cellInfos.nodeModel.getLabel();
                var result = dataItem.setName(newName);
                var name_1 = result ? newName : previousName;
                cellInfos.nodeModel.setLabel(name_1);
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                __     ___    _    _   _ _____   _______   ______  _____                        //
        //                \ \   / / \  | |  | | | | ____| |_   _\ \ / /  _ \| ____|                       //
        //                 \ \ / / _ \ | |  | | | |  _|     | |  \ V /| |_) |  _|                         //
        //                  \ V / ___ \| |__| |_| | |___    | |   | | |  __/| |___                        //
        //                   \_/_/   \_\_____\___/|_____|   |_|   |_| |_|   |_____|                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the data item value type cell semantics.
         * @public
         * @static
         * @param {UIEditor} editor - The UI editor.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort|Setting} dataItem - The data port or setting.
         * @returns {Object} The data item value type cell semantics.
         */
        UIDGVTools.getDataItemValueTypeSemantics = function (editor, cellInfos, dataItem) {
            var result = {};
            if ((cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) && dataItem && dataItem.isValueTypeSettable()) {
                var graphContext = dataItem.getGraphContext();
                var valueType = cellInfos.nodeModel.getAttributeValue('valueType');
                var typeCategory = ModelEnums.FTypeCategory.fAll ^ ModelEnums.FTypeCategory.fArray;
                var isLocalType = TypeLibrary.hasLocalCustomType(graphContext, valueType, typeCategory);
                var hasCreateTypeButton = (dataItem.typeCategory & ModelEnums.FTypeCategory.fObject) === ModelEnums.FTypeCategory.fObject;
                result = {
                    editor: editor,
                    dataPort: dataItem instanceof DataPort ? dataItem : undefined,
                    possibleValues: dataItem.getAllowedValueTypes(),
                    showCreateUserTypeButton: hasCreateTypeButton,
                    showTypeLibraryButton: isLocalType
                };
            }
            return result;
        };
        /**
         * Sets the data item value type cell value.
         * @public
         * @static
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort|Setting} dataItem - The data port or setting.
         * @param {string} newValueType - The new value type.
         */
        UIDGVTools.setDataItemValueTypeCellValue = function (cellInfos, dataItem, newValueType) {
            if ((cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) && dataItem && dataItem.isValueTypeSettable()) {
                var previousValueType = cellInfos.nodeModel.getAttributeValue('valueType');
                var result = dataItem.setValueType(newValueType);
                var valueType = result ? newValueType : previousValueType;
                cellInfos.nodeModel.updateOptions({ grid: { valueType: valueType } });
            }
        };
        /**
         * Gets the data item value type cell editable state.
         * @public
         * @static
         * @param {UIEditor} editor - The UI editor.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort|Setting} dataItem - The data port or setting.
         * @returns {boolean} The data item value type cell editable state.
         */
        UIDGVTools.getDataItemValueTypeCellEditableState = function (editor, cellInfos, dataItem) {
            var result = false;
            if (editor && (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) && dataItem) {
                result = dataItem.isValueTypeSettable();
                result = result && !editor.getTraceController().getPlayingState();
            }
            return result;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //             ____  _____ _____ _   _   _ _   _____  __     ___    _    _   _ _____              //
        //            |  _ \| ____|  ___/ \ | | | | | |_   _| \ \   / / \  | |  | | | | ____|             //
        //            | | | |  _| | |_ / _ \| | | | |   | |    \ \ / / _ \ | |  | | | |  _|               //
        //            | |_| | |___|  _/ ___ \ |_| | |___| |     \ V / ___ \| |__| |_| | |___              //
        //            |____/|_____|_|/_/   \_\___/|_____|_|      \_/_/   \_\_____\___/|_____|             //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the data item default value cell value.
         * @public
         * @static
         * @param {UIEditor} editor - The UI editor.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort|Setting} dataItem - The data port or setting.
         * @returns {*} The data item default value cell value.
         */
        UIDGVTools.getDataItemDefaultValueCellValue = function (editor, cellInfos, dataItem) {
            var result = undefined;
            if (editor && (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) && dataItem) {
                var isDataPort = dataItem instanceof DataPort;
                var defaultValue = isDataPort ? dataItem.getDefaultValue() : dataItem.getValue();
                var valueType = cellInfos.nodeModel.getAttributeValue('valueType');
                var isDefaultValueValid = TypeLibrary.isValueType(dataItem.getGraphContext(), valueType, defaultValue);
                result = isDefaultValueValid && !this.isEmptyLocalCustomType(dataItem) ? defaultValue : undefined;
                // Display the data port play value
                if (isDataPort) {
                    var traceController = editor.getTraceController();
                    if (traceController.getPlayingState()) {
                        var isSubDataPort = dataItem.dataPort !== undefined;
                        var parentDataPortModel = isSubDataPort ? dataItem.dataPort : dataItem;
                        var events = traceController.getEventByDataPortPath(parentDataPortModel.toPath());
                        if (events.length > 0) {
                            var fromDebug = cellInfos.nodeModel.getAttributeValue('fromDebug');
                            var event_1 = events[events.length - 1];
                            result = fromDebug ? defaultValue : (isSubDataPort ? event_1.getValue()[dataItem.getName()] : event_1.getValue());
                        }
                    }
                }
            }
            return result;
        };
        /**
         * Gets the data item default value cell editable state.
         * @public
         * @static
         * @param {UIEditor} editor - The UI editor.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort|Setting} dataItem - The data port or setting.
         * @returns {boolean} - The data item default value cell editable state.
         */
        UIDGVTools.getDataItemDefaultValueCellEditableState = function (editor, cellInfos, dataItem) {
            var result = false;
            if (editor && (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) && dataItem) {
                var isSetting = dataItem instanceof Setting;
                var valueType = cellInfos.nodeModel.getAttributeValue('valueType');
                var isPlaying = editor.getTraceController().getPlayingState();
                result = (isSetting || !this.isReadOnlyRoot(editor, dataItem)); // Check only for data port is not root (CSI specific restriction)!
                result = result && (isSetting ? dataItem.isValueSettable() : dataItem.isDefaultValueSettable());
                result = result && (!isPlaying || (!isSetting && UITools.isDataPortDebuggable(editor, dataItem)));
                result = result && (valueType !== 'Buffer' && valueType !== 'Array<Buffer>');
                result = result && !this.isEmptyLocalCustomType(dataItem);
            }
            return result;
        };
        /**
         * Sets the data item default value cell value.
         * @protected
         * @param {UIEditor} editor - The UI editor.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort|Setting} dataItem - The data port or setting.
         * @param {*} newDefaultValue - The data item new default value.
         */
        UIDGVTools.setDataItemDefaultValueCellValue = function (editor, cellInfos, dataItem, newDefaultValue) {
            if (editor && (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) && dataItem) {
                var isDataPort = dataItem instanceof DataPort;
                var isValueSettable = isDataPort ? dataItem.isDefaultValueSettable() : dataItem.isValueSettable();
                if (isValueSettable) {
                    var previousDefaultValue = cellInfos.nodeModel.getAttributeValue('defaultValue');
                    if (this.isClassOrEventType(dataItem)) {
                        var valueType = dataItem.getValueType();
                        newDefaultValue = editor.getTypesCatalog().createClassTypeInstance(valueType, newDefaultValue);
                    }
                    var result = isDataPort ? dataItem.setDefaultValue(newDefaultValue) : dataItem.setValue(newDefaultValue);
                    var defaultValue = result ? newDefaultValue : previousDefaultValue;
                    var fromDebug = editor.getTraceController().getPlayingState();
                    cellInfos.nodeModel.updateOptions({ grid: { fromDebug: fromDebug, defaultValue: defaultValue } });
                }
            }
        };
        /**
         * Gets the data item default value cell type representation.
         * @protected
         * @abstract
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} - The data item default value cell type representation.
         */
        UIDGVTools.getDataItemDefaultValueCellTypeRepresentation = function (cellInfos) {
            var result = 'string';
            if (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) {
                result = cellInfos.nodeModel.getAttributeValue('valueType');
            }
            return result;
        };
        /**
         * Gets the data port default value cell class name.
         * @protected
         * @param {UIEditor} editor - The UI editor.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort} dataPort - The data port model.
         * @returns {string} The data port default value cell class name.
         */
        UIDGVTools.getDataPortDefaultValueCellClassName = function (editor, cellInfos, dataPort) {
            var result = '';
            if (editor && (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel)) {
                result = cellInfos.nodeModel.isRoot() && !dataPort ? 'sch-dgv-node-root' : '';
                if (dataPort && UITools.isDataPortDebuggable(editor, dataPort)) {
                    var isSubDataPort = dataPort.dataPort !== undefined;
                    var parentDataPortModel = isSubDataPort ? dataPort.dataPort : dataPort;
                    var traceController = editor.getTraceController();
                    var events = traceController.getEventByDataPortPath(parentDataPortModel.toPath());
                    if (events.length > 0) {
                        var fromDebug = cellInfos.nodeModel.getAttributeValue('fromDebug');
                        var event_2 = events[events.length - 1];
                        result = (event_2.fromDebug || fromDebug) ? 'sch-dgv-debug-value' : 'sch-dgv-play-value';
                    }
                }
            }
            return result;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                  ____  _____ ____  _____ _____                                 //
        //                                 |  _ \| ____/ ___|| ____|_   _|                                //
        //                                 | |_) |  _| \___ \|  _|   | |                                  //
        //                                 |  _ <| |___ ___) | |___  | |                                  //
        //                                 |_| \_\_____|____/|_____| |_|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the data item reset cell class name.
         * @public
         * @static
         * @param {UIEditor} editor - The UI editor.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {DataPort|Setting} dataItem - The data port or setting.
         * @returns {boolean} - The data item reset cell class name.
         */
        UIDGVTools.getDataItemResetCellClassName = function (editor, cellInfos, dataItem) {
            var result = '';
            if (editor && (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel)) {
                result = cellInfos.nodeModel.isRoot() && !dataItem ? 'sch-dgv-node-root' : 'sch-dgv-icon-reset';
                if (dataItem) {
                    var isDataPort = dataItem instanceof DataPort;
                    var isPlaying = editor.getTraceController().getPlayingState();
                    var isValueSettable = isDataPort ? dataItem.isDefaultValueSettable() : dataItem.isValueSettable();
                    if (!dataItem.isOverride() || !isValueSettable || isPlaying) {
                        result += ' disabled';
                    }
                }
            }
            return result;
        };
        /**
         * The callback on the reset data port button click event.
         * @public
         * @static
         * @param {IWUXFunctionIconArguments} args - The function icon arguments.
         */
        UIDGVTools.onResetPortButtonClick = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var dataPort = nodeModel.getAttributeValue('dataPort');
                dataPort.resetDefaultValue();
                nodeModel.updateOptions({ grid: { defaultValue: dataPort.getDefaultValue() } });
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                    _____ ___   ___  _     ____                                 //
        //                                   |_   _/ _ \ / _ \| |   / ___|                                //
        //                                     | || | | | | | | |   \___ \                                //
        //                                     | || |_| | |_| | |___ ___) |                               //
        //                                     |_| \___/ \___/|_____|____/                                //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Check if the data port is a read only root input data port.
         * This is a CSI specific implementation!
         * @public
         * @static
         * @param {UIEditor} editor - The UI editor.
         * @param {DataPort} dataPort - The data port model.
         * @returns {boolean} True if the data port is a read only root else false.
         */
        UIDGVTools.isReadOnlyRoot = function (editor, dataPort) {
            var isRootInput = (dataPort === null || dataPort === void 0 ? void 0 : dataPort.block.toPath()) === Tools.rootPath && dataPort.getType() === ModelEnums.EDataPortType.eInput;
            return !(editor === null || editor === void 0 ? void 0 : editor.getOptions().rootInputDataDefaultValueSettable) && isRootInput;
        };
        /**
         * Checks if the data port or setting value type is an empty local custom type.
         * @public
         * @static
         * @param {DataPort|Setting} dataItem - The data port or setting to check.
         * @returns {boolean} True if the data port or setting value type is an empty local custom type else false.
         */
        UIDGVTools.isEmptyLocalCustomType = function (dataItem) {
            var valueType = dataItem.getValueType();
            var localCustomType = TypeLibrary.getLocalCustomType(dataItem.block.getGraphContext(), valueType);
            var result = localCustomType !== undefined && Object.keys(localCustomType).length === 0;
            return result;
        };
        /**
         * Checks if the data port or setting value type is a class or event type.
         * @private
         * @param {DataPort|Setting} dataItem - The data port or setting to check.
         * @returns {boolean} True if the data port value type is a class or event type else false.
         */
        UIDGVTools.isClassOrEventType = function (dataItem) {
            var graphContext = dataItem.getGraphContext();
            var valueType = dataItem.getValueType();
            var typeCategory = ModelEnums.FTypeCategory.fClass | ModelEnums.FTypeCategory.fEvent;
            var result = TypeLibrary.hasType(graphContext, valueType, typeCategory);
            result = result || TypeLibrary.hasType(graphContext, TypeLibrary.getArrayValueTypeName(valueType), typeCategory);
            return result;
        };
        return UIDGVTools;
    }());
    return UIDGVTools;
});
