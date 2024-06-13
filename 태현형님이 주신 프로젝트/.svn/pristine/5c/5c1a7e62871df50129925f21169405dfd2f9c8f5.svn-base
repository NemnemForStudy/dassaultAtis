/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUIValueEvaluator'/>
define("DS/EPSSchematicsUI/components/EPSSchematicsUIValueEvaluator", ["require", "exports", "DS/EPSSchematicsUI/components/EPSSchematicsUIBasicEvaluator", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeDocument", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "css!DS/EPSSchematicsUI/css/components/EPSSchematicsUIValueEvaluator"], function (require, exports, UIBasicEvaluator, UIDom, WUXTreeDocument, WUXTreeNodeModel) {
    "use strict";
    /**
     * This class defines a UI value evaluator.
     * @class UIValueEvaluator
     * @alias module:S/EPSSchematicsUI/components/EPSSchematicsUIValueEvaluator
     * @private
     */
    var UIValueEvaluator = /** @class */ (function () {
        /**
         * @constructor
         * @param {*} value - The value to evaluate.
         * @param {IValueEvaluatorOptions} [options] The evaluator options.
         */
        function UIValueEvaluator(value, options) {
            if (options === void 0) { options = {}; }
            this._value = value;
            this._options = options;
            this._element = UIDom.createElement('div', { className: 'sch-value-evaluator' });
            this._setValue(value);
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
         * Gets the object evaluator element.
         * @public
         * @returns {HTMLDivElement} The object evaluator element.
         */
        UIValueEvaluator.prototype.getElement = function () {
            return this._element;
        };
        /**
         * Gets the WUX tree document.
         * @public
         * @returns {WUXTreeDocument} The tree document.
         */
        UIValueEvaluator.prototype.getTreeDocument = function () {
            return this._treeDocument;
        };
        /**
         * Gets the value of the evaluator.
         * @public
         * @returns {*} The value of the evaluator.
         */
        UIValueEvaluator.prototype.getValue = function () {
            return this._value;
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
         * Sets the value of the evaluator.
         * @private
         * @param {*} value - The value of the evaluator.
         */
        UIValueEvaluator.prototype._setValue = function (value) {
            if (typeof value === 'object') {
                this._createObjectView(value);
            }
            else {
                this._createInlineView(value);
            }
        };
        /**
         * Creates the inline view of the provided value.
         * @private
         * @param {string|number|boolean} value - The value.
         */
        UIValueEvaluator.prototype._createInlineView = function (value) {
            this._value = value;
            var inlineElt = UIBasicEvaluator.getInlineValueElement(value);
            this._element.appendChild(inlineElt);
        };
        /**
         * Creates the object view of the provided value.
         * @private
         * @param {object|WUXTreeDocument} value - The object value value of tree document object value.
         */
        UIValueEvaluator.prototype._createObjectView = function (value) {
            this._value = value;
            this._treeDocument = value instanceof WUXTreeDocument ? value : UIValueEvaluator._createObjectTreeDocument(value);
            var rootNodeModel = this._treeDocument.getRoots()[0];
            this._nodeModelMap = new Map();
            // Clean previous tree document model events
            var modelEvents = this._treeDocument.getModelEvents();
            modelEvents.unsubscribeAll({ event: 'postExpand' });
            modelEvents.unsubscribeAll({ event: 'postCollapse' });
            this._treeDocument.onPreExpand(UIValueEvaluator._onPreExpand);
            this._treeDocument.onPostExpand(this._onPostExpand.bind(this));
            this._treeDocument.onPostCollapse(this._onPostCollapse.bind(this));
            var key = rootNodeModel.getAttributeValue('key');
            var val = rootNodeModel.getAttributeValue('value');
            var keyValueElt = UIValueEvaluator._createKeyValueElement(key, val, false);
            var rootElement = UIDom.createElement('ol', { parent: this._element, className: ['sch-object-tree-root', 'sch-object-tree-children'] });
            var liElt = UIDom.createElement('li', {
                parent: rootElement,
                className: 'sch-object-tree-parent',
                children: [keyValueElt]
            });
            liElt.onclick = UIValueEvaluator._onClick.bind(this, rootNodeModel);
            var olElt = UIDom.createElement('ol', {
                parent: rootElement,
                className: 'sch-object-tree-children'
            });
            this._addNodeModelToMap(rootNodeModel, liElt, olElt);
            if (rootNodeModel.isExpanded()) {
                this._createNodeView(rootNodeModel);
            }
        };
        /**
         * The callback on the tree document pre expand event.
         * @private
         * @param {IWUXModelEvent} event - The pre expand event.
         */
        UIValueEvaluator._onPreExpand = function (event) {
            var parentNodeModel = event.target;
            if (parentNodeModel.getChildren().length === 0) {
                var parentValue_1 = parentNodeModel.getAttributeValue('value');
                Object.keys(parentValue_1).forEach(function (key) {
                    var value = parentValue_1[key];
                    var childNodeModel = new WUXTreeNodeModel({
                        label: key,
                        grid: { key: key, value: value },
                        children: []
                    });
                    parentNodeModel.addChild(childNodeModel);
                });
            }
            parentNodeModel.preExpandDone();
        };
        /**
         * The callback on the tree document post expand event.
         * @private
         * @param {IWUXModelEvent} event - The post expand event.
         */
        UIValueEvaluator.prototype._onPostExpand = function (event) {
            this._createNodeView(event.target);
            if (this._options.onExpand !== undefined) {
                this._options.onExpand();
            }
        };
        /**
         * The callback on the tree document post collapse event.
         * @private
         * @param {IWUXModelEvent} event - The post collapse event.
         */
        UIValueEvaluator.prototype._onPostCollapse = function (event) {
            this._removeNodeView(event.target);
            if (this._options.onCollapse !== undefined) {
                this._options.onCollapse();
            }
        };
        /**
         * The callback on the expander click event.
         * @private
         * @static
         * @param {WUXTreeNodeModel} childNodeModel - The clicked child node model.
         * @param {MouseEvent} event - The click event.
         */
        UIValueEvaluator._onClick = function (childNodeModel, event) {
            var selection = window.getSelection();
            if (selection.toString() === '') {
                if (!childNodeModel.isExpanded()) {
                    childNodeModel.expand();
                }
                else {
                    childNodeModel.collapse();
                }
            }
            event.stopPropagation();
        };
        /**
         * Creates a tree document from the provided object value.
         * @private
         * @static
         * @param {object} value - The object value.
         * @returns {WUXTreeDocument} The object value tree document.
         */
        UIValueEvaluator._createObjectTreeDocument = function (value) {
            var treeDocument;
            if (typeof value === 'object') {
                treeDocument = new WUXTreeDocument({ useAsyncPreExpand: true });
                var rootNode = new WUXTreeNodeModel({ grid: { value: value }, children: [] });
                treeDocument.addChild(rootNode);
            }
            return treeDocument;
        };
        /**
         * Creates the key value pair element.
         * @private
         * @static
         * @param {string} key - The key.
         * @param {*} value - The value
         * @param {boolean} hideValue - True to hide the object value (only display object type) else false.
         * @returns {HTMLSpanElement} The key value pair element.
         */
        UIValueEvaluator._createKeyValueElement = function (key, value, hideValue) {
            var container = [];
            if (key !== undefined) {
                var keyElt = UIDom.createElement('span', { className: 'sch-object-key', textContent: key });
                var separatorElt = UIDom.createElement('span', { textContent: ': ' });
                container = [keyElt, separatorElt];
            }
            container.push(UIBasicEvaluator.getInlineValueElement(value, hideValue));
            return UIDom.createElement('span', { className: 'sch-object-keyvalue', children: container });
        };
        /**
         * Creates the node view.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         */
        UIValueEvaluator.prototype._createNodeView = function (nodeModel) {
            var _this = this;
            this._expandNodeViewArrow(nodeModel);
            this._expandNodeViewTitle(nodeModel);
            var childNodeModelList = nodeModel.getChildren();
            childNodeModelList.forEach(function (childNodeModel) {
                var key = childNodeModel.getAttributeValue('key');
                var value = childNodeModel.getAttributeValue('value');
                var isObject = value !== null && value !== undefined && typeof value === 'object';
                var isChildExpanded = childNodeModel.isExpanded();
                var childContainer = _this._getChildContainer(nodeModel);
                var liElt = UIDom.createElement('li', {
                    parent: childContainer,
                    className: isObject ? 'sch-object-tree-parent' : 'sch-object-tree-leaf',
                    children: [UIValueEvaluator._createKeyValueElement(key, value, isChildExpanded)]
                });
                var olElt = UIDom.createElement('ol', {
                    parent: childContainer,
                    className: 'sch-object-tree-children'
                });
                _this._addNodeModelToMap(childNodeModel, liElt, olElt);
                if (isObject) {
                    liElt.onclick = UIValueEvaluator._onClick.bind(_this, childNodeModel);
                }
                if (isChildExpanded) {
                    _this._createNodeView(childNodeModel);
                }
            });
        };
        /**
         * Removes the node view.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         */
        UIValueEvaluator.prototype._removeNodeView = function (nodeModel) {
            var _this = this;
            this._collapseNodeViewArrow(nodeModel);
            this._collapseNodeViewTitle(nodeModel);
            var childNodeModelList = nodeModel.getChildren();
            childNodeModelList.forEach(function (childNodeModel) {
                _this._removeNodeView(childNodeModel);
                _this._removeNodeModelFromMap(childNodeModel);
            });
            var childContainer = this._getChildContainer(nodeModel);
            if (childContainer !== undefined) {
                while (childContainer.firstChild) {
                    childContainer.removeChild(childContainer.firstChild);
                }
            }
        };
        /**
         * Expands the node view arrow.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         */
        UIValueEvaluator.prototype._expandNodeViewArrow = function (nodeModel) {
            var titleContainer = this._getNodeTitleContainer(nodeModel);
            UIDom.addClassName(titleContainer, 'expanded');
        };
        /**
         * Collapses the node view arrow.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         */
        UIValueEvaluator.prototype._collapseNodeViewArrow = function (nodeModel) {
            var titleContainer = this._getNodeTitleContainer(nodeModel);
            UIDom.removeClassName(titleContainer, 'expanded');
        };
        /**
         * Expands the node view title.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         */
        UIValueEvaluator.prototype._expandNodeViewTitle = function (nodeModel) {
            var titleContainer = this._getNodeTitleContainer(nodeModel);
            if (titleContainer !== undefined) {
                var key = nodeModel.getAttributeValue('key');
                var value = nodeModel.getAttributeValue('value');
                while (titleContainer.firstChild) {
                    titleContainer.removeChild(titleContainer.firstChild);
                }
                titleContainer.appendChild(UIValueEvaluator._createKeyValueElement(key, value, true));
            }
        };
        /**
         * Collapses the node view title.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         */
        UIValueEvaluator.prototype._collapseNodeViewTitle = function (nodeModel) {
            var titleContainer = this._getNodeTitleContainer(nodeModel);
            if (titleContainer !== undefined) {
                var key = nodeModel.getAttributeValue('key');
                var value = nodeModel.getAttributeValue('value');
                while (titleContainer.firstChild) {
                    titleContainer.removeChild(titleContainer.firstChild);
                }
                titleContainer.appendChild(UIValueEvaluator._createKeyValueElement(key, value, false));
            }
        };
        /**
         * Adds the node model to the map.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         * @param {HTMLLIElement} titleContainer - The title container.
         * @param {HTMLOListElement} childContainer - The child container.
         */
        UIValueEvaluator.prototype._addNodeModelToMap = function (nodeModel, titleContainer, childContainer) {
            this._nodeModelMap.set(nodeModel, { titleContainer: titleContainer, childContainer: childContainer });
        };
        /**
         * Removes the node model from the map.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         */
        UIValueEvaluator.prototype._removeNodeModelFromMap = function (nodeModel) {
            this._nodeModelMap.delete(nodeModel);
        };
        /**
         * Gets the child container.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         * @returns {HTMLOListElement} The child container.
         */
        UIValueEvaluator.prototype._getChildContainer = function (nodeModel) {
            var nodeModelFromMap = this._nodeModelMap.get(nodeModel);
            return nodeModelFromMap === null || nodeModelFromMap === void 0 ? void 0 : nodeModelFromMap.childContainer;
        };
        /**
         * Gets the node's count.
         * @private
         * @param {WUXTreeNodeModel} node - The parent node.
         * @returns {number} The node's count.
         */
        UIValueEvaluator._getNodesCount = function (node) {
            var count = 0;
            if (node !== undefined) {
                count++;
                if (node.isExpanded()) {
                    var childNodes = node.getChildren();
                    childNodes.forEach(function (childNode) { count += UIValueEvaluator._getNodesCount(childNode); });
                }
            }
            return count;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                      ___  ____ _____                                           //
        //                                     / _ \|  _ \_   _|                                          //
        //                                    | | | | | | || |                                            //
        //                                    | |_| | |_| || |                                            //
        //                                     \___/|____/ |_|                                            //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the object expanded height.
         * @private
         * @ignore
         * @returns {number} The object expanded height.
         */
        UIValueEvaluator.prototype._getObjectExpandedHeight = function () {
            var rootNode = this._treeDocument.getRoots()[0];
            var expandedCount = UIValueEvaluator._getNodesCount(rootNode);
            var height = expandedCount * 16;
            return height;
        };
        /**
         * Gets the node title container.
         * @private
         * @ignore
         * @param {WUXTreeNodeModel} nodeModel - The node model.
         * @returns {HTMLLIElement} The child container.
         */
        UIValueEvaluator.prototype._getNodeTitleContainer = function (nodeModel) {
            var nodeModelFromMap = this._nodeModelMap.get(nodeModel);
            return nodeModelFromMap === null || nodeModelFromMap === void 0 ? void 0 : nodeModelFromMap.titleContainer;
        };
        return UIValueEvaluator;
    }());
    return UIValueEvaluator;
});
