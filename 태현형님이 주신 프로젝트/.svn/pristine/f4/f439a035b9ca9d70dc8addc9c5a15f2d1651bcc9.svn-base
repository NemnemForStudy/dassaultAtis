/* global WUXManagedFontIcons */
/// <amd-module name='DS/CSIExecutionGraphUI/datagrids/CSIEGUINodesConfigurationDataGridView'/>
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
define("DS/CSIExecutionGraphUI/datagrids/CSIEGUINodesConfigurationDataGridView", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/Controls/TooltipModel", "DS/Controls/Button"], function (require, exports, UIDataGridView, UIFontIcon, UIDom, WUXTooltipModel, WUXButton) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the CSI Execution Graph nodes configuration data grid view.
     * @class CSIEGUINodesConfigurationDataGridView
     * @alias module:DS/CSIExecutionGraphUI/datagrids/CSIEGUINodesConfigurationDataGridView
     * @extends UIDataGridView
     * @private
     */
    var CSIEGUINodesConfigurationDataGridView = /** @class */ (function (_super) {
        __extends(CSIEGUINodesConfigurationDataGridView, _super);
        /**
         * @constructor
         * @param {string[]} nodesConfig - The nodes sonfig.
         */
        function CSIEGUINodesConfigurationDataGridView(nodesConfig) {
            var _this = _super.call(this, {
                className: 'csiege-datagridview',
                rowsHeader: false,
                placeholder: 'No nodes configuration',
                cellActivationFeedback: 'none',
                cellSelection: 'single'
            }) || this;
            _this.container = UIDom.createElement('div', { className: 'csiegui-datagridview-container' });
            _this.deleteNodeConfigIconCB = {
                module: 'DS/CSIExecutionGraphUI/datagrids/CSIEGUINodesConfigurationDataGridView',
                func: 'deleteNodeConfiguration'
            };
            _this._nodesConfig = nodesConfig;
            _this.deleteNodeConfigIconCB.argument = { dataGridView: _this };
            _this.initialize();
            return _this;
        }
        /**
         * Removes the data grid view.
         * @public
         */
        CSIEGUINodesConfigurationDataGridView.prototype.remove = function () {
            this._nodesConfig = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the data grid view element.
         * @public
         * @returns {HTMLDivElement} The data grid view element.
         */
        CSIEGUINodesConfigurationDataGridView.prototype.getElement = function () {
            return this.container;
        };
        /**
         * Toggles the disabled state on the data grid view.
         * @public
         */
        CSIEGUINodesConfigurationDataGridView.prototype.toggleDisabledState = function () {
            if (UIDom.hasClassName(this.container, 'disabled')) {
                UIDom.removeClassName(this.container, 'disabled');
            }
            else {
                UIDom.addClassName(this.container, 'disabled');
            }
        };
        /**
         * Initializes the data grid view.
         * @protected
         */
        CSIEGUINodesConfigurationDataGridView.prototype.initialize = function () {
            var _this = this;
            this._nodesConfig.forEach(function (nodeConfig) {
                _this._addTreeNodeModel({
                    grid: {
                        nodeConfig: nodeConfig,
                        deleteNodeConfig: _this.deleteNodeConfigIconCB
                    }
                });
            });
            var addButton = new WUXButton({
                label: 'Add Node configuration',
                icon: { iconName: 'plus', fontIconFamily: WUXManagedFontIcons.Font3DS },
                emphasize: 'secondary',
                onClick: function () { return _this.createAndEditNodeConfiguration(); }
            });
            this.container.appendChild(this._element);
            this.container.appendChild(addButton.getContent());
        };
        /**
         * Defines the data grid view columns.
         * @protected
         * @override
         */
        CSIEGUINodesConfigurationDataGridView.prototype._defineColumns = function () {
            this._columns.push({
                dataIndex: 'nodeConfig',
                text: 'CSI Nodes configuration',
                visibleFlag: true,
                editableFlag: true
            });
            this._columns.push({
                dataIndex: 'deleteNodeConfig',
                text: '',
                typeRepresentation: 'functionIcon',
                resizableFlag: false,
                sortableFlag: false,
                width: '30',
                minWidth: '30',
                editionPolicy: 'EditionOnOver',
                editableFlag: false,
                getCellSemantics: function () { return { icon: UIFontIcon.getWUX3DSIconDefinition('wrong') }; },
                getCellTooltip: function () { return new WUXTooltipModel({
                    shortHelp: 'Delete Node configuration',
                    initialDelay: 500
                }); }
            });
        };
        /**
         * Gets the nodes configuration.
         * @public
         * @returns {string[]} The nodes configuration.
         */
        CSIEGUINodesConfigurationDataGridView.prototype.getNodesConfig = function () {
            var roots = this.getTreeDocument().getRoots();
            var nodesConfig = roots.map(function (root) { return root.getAttributeValue('nodeConfig'); });
            return nodesConfig;
        };
        /**
         * Creates and edit a node configuration.
         * @public
         */
        CSIEGUINodesConfigurationDataGridView.prototype.createAndEditNodeConfiguration = function () {
            var nodeModel = this._addTreeNodeModel({
                grid: {
                    nodeConfig: '',
                    deleteNodeConfig: this.deleteNodeConfigIconCB
                }
            });
            this.scrollToBottom();
            var cellID = this.getCellIdFromNodeModel(nodeModel, 0);
            this._dataGridView.setCellInEdition(cellID);
        };
        /**
         * Removes the selected node configuration from the tree document.
         * @protected
         * @static
         * @param {object} args - The function icon arguments.
         */
        CSIEGUINodesConfigurationDataGridView.deleteNodeConfiguration = function (args) {
            var treeDocument = args.dataGridView.getTreeDocument();
            treeDocument.removeRoot(args.context.nodeModel);
        };
        return CSIEGUINodesConfigurationDataGridView;
    }(UIDataGridView));
    return CSIEGUINodesConfigurationDataGridView;
});
