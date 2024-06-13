/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVCustomType'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVCustomType", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/Controls/Button", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVCustomType"], function (require, exports, UIDataGridView, UINLS, UIFontIcon, UIWUXTools, ModelEnums, TypeLibrary, WUXButton) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view custom type.
     * @class UIDGVCustomType
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVCustomType
     * @extends UIDataGridView
     * @private
     */
    var UIDGVCustomType = /** @class */ (function (_super) {
        __extends(UIDGVCustomType, _super);
        /**
         * @constructor
         * @param {Block} blockModel - The block model.
         * @param {string} customTypeName - The custom type name.
         * @param {boolean} isEditable - True if the custom type is editable else false.
         */
        function UIDGVCustomType(blockModel, customTypeName, isEditable) {
            var _this = _super.call(this, {
                className: 'sch-datagridview-customtype',
                isEditable: isEditable,
                placeholder: UINLS.get('placeholderNoProperties'),
                rowsHeader: isEditable,
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: true,
                columnDragEnabledFlag: false,
                cellSelection: 'none',
                rowSelection: isEditable ? 'multiple' : 'none',
                cellPreselectionFeedback: isEditable ? 'row' : 'none',
                showCellActivationFlag: false,
                cellActivationFeedback: 'none'
                //onContextualEvent: () => []
            }) || this;
            _this._blockModel = blockModel;
            _this._customTypeName = customTypeName;
            _this._isEditable = isEditable;
            _this._graphContext = _this._blockModel.getGraphContext();
            _this._customType = TypeLibrary.getType(_this._graphContext, customTypeName);
            _this._customTypeCategory = TypeLibrary.getTypeCategory(_this._graphContext, customTypeName);
            _this._isEnumTypeCategory = _this._customTypeCategory === ModelEnums.FTypeCategory.fEnum;
            _this._typeNameList = TypeLibrary.getTypeNameList(_this._graphContext, ModelEnums.FTypeCategory.fAll);
            if (_this._isEditable) {
                _this._createToolbar();
            }
            _this._updateContent();
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
         * Removes the data grid view.
         * @public
         */
        UIDGVCustomType.prototype.remove = function () {
            this._blockModel = undefined;
            this._customTypeName = undefined;
            this._graphContext = undefined;
            this._customType = undefined;
            this._customTypeCategory = undefined;
            this._isEnumTypeCategory = undefined;
            this._typeNameList = undefined;
            this._addButton = undefined;
            this._deleteButton = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the WUX add button.
         * @public
         * @returns {WUXButton} The WUX add button.
         */
        UIDGVCustomType.prototype.getAddButton = function () {
            return this._addButton;
        };
        /**
         * Gets the WUX delete button.
         * @public
         * @returns {WUXButton} The WUX delete button.
         */
        UIDGVCustomType.prototype.getDeleteButton = function () {
            return this._deleteButton;
        };
        /**
         * Updates the type library custom type.
         * @public
         */
        UIDGVCustomType.prototype.updateTypeLibraryCustomType = function () {
            var customTypeDefinition = this._getCustomTypeDefinition();
            TypeLibrary.updateLocalCustomObjectType(this._graphContext, this._customTypeName, customTypeDefinition);
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
         * Defines the data grid view columns.
         * @protected
         * @override
         */
        UIDGVCustomType.prototype._defineColumns = function () {
            _super.prototype._defineColumns.call(this);
            this._defineColumnName();
            this._defineColumnValueType();
            this._defineColumnValue();
            this._defineColumnMandatoryValue();
        };
        /**
         * Creates the data grid view toolbar.
         * @protected
         */
        UIDGVCustomType.prototype._createToolbar = function () {
            var _this = this;
            _super.prototype._createToolbar.call(this);
            this._addButton = new WUXButton({
                icon: UIFontIcon.getWUXFAIconDefinition('plus'),
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: UINLS.get('shortHelpAddProperty') }),
                onClick: this._onAddButtonClick.bind(this)
            }).inject(this._toolbarContainer);
            this._deleteButton = new WUXButton({
                icon: UIFontIcon.getWUX3DSIconDefinition('trash'),
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: UINLS.get('shortHelpDeleteProperty') }),
                disabled: true,
                onClick: this._onDeleteButtonClick.bind(this)
            }).inject(this._toolbarContainer);
            this._treeDocument.getXSO().onChange(function () {
                if (_this._deleteButton !== undefined) {
                    var selectedNodes = _this._treeDocument.getSelectedNodes();
                    _this._deleteButton.disabled = selectedNodes.length === 0;
                }
            });
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
         * Defines the data grid view name column.
         * @private
         */
        UIDGVCustomType.prototype._defineColumnName = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'name',
                text: UINLS.get('treeListColumnName'),
                typeRepresentation: 'string',
                sortableFlag: this._isEditable,
                editableFlag: this._isEditable,
                editionPolicy: 'EditionOnOver',
                setCellValue: function (cellInfos, value) {
                    var newName = value;
                    var roots = _this._treeDocument.getRoots();
                    var filteredRoots = roots.filter(function (nodeModel) { return nodeModel.getAttributeValue('name') === newName; });
                    if (filteredRoots.length > 0) {
                        newName = cellInfos.nodeModel.getAttributeValue('name');
                    }
                    cellInfos.nodeModel.updateOptions({ grid: { name: newName } });
                }
            });
        };
        /**
         * Defines the data grid view value type column.
         * @private
         */
        UIDGVCustomType.prototype._defineColumnValueType = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'valueType',
                text: UINLS.get('treeListColumnValueType'),
                typeRepresentation: 'valueTypeCombo',
                sortableFlag: this._isEditable,
                editableFlag: this._isEditable,
                editionPolicy: 'EditionOnOver',
                getCellSemantics: function () { return { possibleValues: _this._typeNameList }; }
            });
        };
        /**
         * Defines the data grid view value column.
         * @private
         */
        UIDGVCustomType.prototype._defineColumnValue = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'defaultValue',
                text: UINLS.get('treeListColumnDefaultValue'),
                typeRepresentation: 'String',
                sortableFlag: this._isEditable,
                editableFlag: this._isEditable,
                editionPolicy: 'EditionOnOver',
                alignment: 'near',
                getCellTypeRepresentation: function (cellInfos) {
                    var typeRepresentation = 'String';
                    if (cellInfos.nodeModel) {
                        typeRepresentation = cellInfos.nodeModel.getAttributeValue('valueType');
                    }
                    return typeRepresentation;
                },
                getCellEditableState: function (cellInfos) {
                    var isEditable = _this._isEditable;
                    if (cellInfos.nodeModel) { // TODO: Ask WebUX if possible to have a typrep that displays nothing?
                        var valueType = cellInfos.nodeModel.getAttributeValue('valueType');
                        isEditable = isEditable && (valueType !== 'Buffer' && valueType !== 'Array<Buffer>');
                    }
                    return isEditable;
                },
                getCellSemantics: function (cellInfos) {
                    var valueType = cellInfos.nodeModel.getAttributeValue('valueType');
                    var isObjectType = valueType === 'Object';
                    return { authoringFlag: _this._isEditable && isObjectType };
                },
                getCellValue: function (cellInfos) {
                    var cellValue = undefined;
                    if (cellInfos.nodeModel) {
                        var defaultValue = cellInfos.nodeModel.getAttributeValue('defaultValue');
                        var valueType = cellInfos.nodeModel.getAttributeValue('valueType');
                        var isDefaultValueValid = TypeLibrary.isValueType(_this._graphContext, valueType, defaultValue);
                        cellValue = isDefaultValueValid ? defaultValue : undefined;
                    }
                    return cellValue;
                },
                setCellValue: function (cellInfos, value) {
                    // As default value type may change (ie from string to double[])
                    // setAttribute is not compatible (does not handle array reference change)!
                    // cellInfos.nodeModel.setAttribute('defaultValue', value);
                    // TODO: A fix will be done by David on the SetAttribute method!
                    cellInfos.nodeModel.updateOptions({ grid: { defaultValue: value } });
                }
            });
        };
        /**
         * Defines the data grid view mandatory value column.
         * @private
         */
        UIDGVCustomType.prototype._defineColumnMandatoryValue = function () {
            this._columns.push({
                dataIndex: 'mandatoryValue',
                width: 40,
                resizableFlag: false,
                alignment: 'center',
                icon: UIFontIcon.getWUX3DSIconDefinition('issue'),
                //icon: UIFontIcon.getWUXFAIconDefinition('exclamation-circle'),
                typeRepresentation: 'boolean',
                sortableFlag: this._isEditable,
                editableFlag: this._isEditable,
                editionPolicy: 'EditionOnOver',
                getCellTooltip: function () {
                    return UIWUXTools.createTooltip({
                        shortHelp: UINLS.get('treeListColumnMandatoryValue'),
                        initialDelay: 500
                    });
                }
            });
        };
        /**
         * Updates the data grid view content.
         * @private
         */
        UIDGVCustomType.prototype._updateContent = function () {
            var _this = this;
            if (this._customType !== undefined) {
                var isClassType = this._customTypeCategory === ModelEnums.FTypeCategory.fClass;
                var isEventType = this._customTypeCategory === ModelEnums.FTypeCategory.fEvent;
                var isClassOrEventType = (isClassType || isEventType) && this._customType.descriptor;
                var customTypeDescriptor_1 = isClassOrEventType ? this._customType.descriptor : this._customType;
                Object.keys(customTypeDescriptor_1).forEach(function (propertyName) {
                    var property = customTypeDescriptor_1[propertyName];
                    _this._addCustomType(propertyName, property.type, property.defaultValue, property.mandatory);
                });
                if (this._isEnumTypeCategory) {
                    this._dataGridView.layout.setColumnVisibleFlag('valueType', false);
                    this._dataGridView.layout.setColumnVisibleFlag('defaultValue', false);
                    this._dataGridView.layout.setColumnVisibleFlag('mandatoryValue', false);
                }
            }
        };
        /**
         * Adds a custom type.
         * @private
         * @param {string} name - The custom type name.
         * @param {string} valueType - The custom type value type.
         * @param {*} defaultValue - The custom type default value.
         * @param {boolean} mandatoryValue - The custom type mandatory value.
         */
        UIDGVCustomType.prototype._addCustomType = function (name, valueType, defaultValue, mandatoryValue) {
            this._addTreeNodeModel({
                grid: {
                    name: name,
                    valueType: valueType,
                    defaultValue: defaultValue,
                    mandatoryValue: mandatoryValue
                }
            });
        };
        /**
         * Gets the custom type definition.
         * @private
         * @returns {IObjectType} The custom type definition.
         */
        UIDGVCustomType.prototype._getCustomTypeDefinition = function () {
            var customType = {};
            var roots = this._treeDocument.getRoots();
            roots.forEach(function (nodeModel) {
                var name = nodeModel.getAttributeValue('name');
                customType[name] = {
                    type: nodeModel.getAttributeValue('valueType'),
                    defaultValue: nodeModel.getAttributeValue('defaultValue'),
                    mandatory: nodeModel.getAttributeValue('mandatoryValue')
                };
            });
            return customType;
        };
        /**
         * The callback on the add button click event.
         * @private
         */
        UIDGVCustomType.prototype._onAddButtonClick = function () {
            var roots = this._treeDocument.getRoots();
            var property = 'property';
            var id = 1;
            var propertyName = property + id;
            var filterCB = function (root) { return root.getAttributeValue('name') === propertyName; };
            while (roots.filter(filterCB).length > 0) {
                id++;
                propertyName = property + id;
            }
            this._addCustomType(propertyName, 'Double', undefined, false);
        };
        /**
         * The callback on the delete button click event.
         * @private
         */
        UIDGVCustomType.prototype._onDeleteButtonClick = function () {
            var _this = this;
            var roots = this._treeDocument.getSelectedNodes();
            roots.forEach(function (nodeModel) { return _this._treeDocument.removeRoot(nodeModel); });
        };
        return UIDGVCustomType;
    }(UIDataGridView));
    return UIDGVCustomType;
});
