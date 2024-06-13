/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUIBreadcrumb'/>
define("DS/EPSSchematicsUI/components/EPSSchematicsUIBreadcrumb", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "css!DS/EPSSchematicsUI/css/components/EPSSchematicsUIBreadcrumb"], function (require, exports, UIDom, UIFontIcon) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI breadcrumb.
     * @class UIBreadcrumb
     * @alias module:DS/EPSSchematicsUI/components/EPSSchematicsUIBreadcrumb
     * @private
     */
    var UIBreadcrumb = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIViewerController} viewerController - The viewer controller.
         * @param {HTMLElement} container - The breadcrumb container.
         */
        function UIBreadcrumb(viewerController, container) {
            this._items = [];
            this._onItemClickCB = this._onItemClick.bind(this);
            this._viewerController = viewerController;
            this._container = container;
            this._initialize();
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
         * Removes the breadcrumb.
         * @public
         */
        UIBreadcrumb.prototype.remove = function () {
            if (this._rootItem !== undefined) {
                this._rootItem.removeEventListener('click', this._onItemClickCB);
                this._itemList.removeChild(this._rootItem);
            }
            if (this._container !== undefined) {
                this._container.removeChild(this._component);
            }
            this._viewerController = undefined;
            this._container = undefined;
            this._component = undefined;
            this._itemList = undefined;
            this._rootItem = undefined;
            this._expander = undefined;
            this._items = undefined;
            this._onItemClickCB = undefined;
        };
        /**
         * Adds an item to the item list.
         * @public
         * @param {string} title - The title of the item to add.
         */
        UIBreadcrumb.prototype.addListItem = function (title) {
            var item = UIDom.createElement('li', {
                className: 'sch-breadcrumb-item',
                parent: this._itemList,
                textContent: title
            });
            item.addEventListener('click', this._onItemClickCB);
            this._items.push(item);
            UIDom.addClassName(this._component, 'visible'); // Show the breadcrumb
        };
        /**
         * Changes the name of the item at the given index.
         * @private
         * @param {number} index - The index of the item.
         * @param {string} name - The new name of the item.
         */
        UIBreadcrumb.prototype.changeItemName = function (index, name) {
            var item = this._items[index];
            if (item !== undefined) {
                item.textContent = name;
            }
        };
        /**
         * Removes the last item from the list.
         * @private
         */
        UIBreadcrumb.prototype.removeLastItem = function () {
            var item = this._items.pop();
            if (item !== undefined) {
                item.removeEventListener('click', this._onItemClickCB);
                this._itemList.removeChild(item);
            }
            if (this._items.length === 0) { // Hides the breadcrumb
                UIDom.removeClassName(this._component, 'visible');
            }
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
         * Initializes the component.
         * @private
         */
        UIBreadcrumb.prototype._initialize = function () {
            this._component = UIDom.createElement('div', {
                className: 'sch-breadcrumb-toolbar',
                parent: this._container
            });
            this._itemList = UIDom.createElement('ul', {
                className: 'sch-breadcrumb-list',
                parent: this._component
            });
            this._rootItem = UIDom.createElement('li', {
                className: 'sch-breadcrumb-root',
                parent: this._itemList,
                children: [UIFontIcon.createFontIconFromDefinition({ name: 'home', fontFamily: 'eFontAwesome' })]
            });
            this._rootItem.addEventListener('click', this._onItemClickCB);
            this._expander = UIDom.createElement('li', {
                className: 'sch-breadcrumb-expander',
                parent: this._itemList,
                children: [UIFontIcon.createFontIconFromDefinition({ name: 'ellipsis-h', fontFamily: 'eFontAwesome' })]
            });
        };
        /**
         * The callback on the list item click event.
         * @private
         * @param {MouseEvent} event - The mouse event.
         */
        UIBreadcrumb.prototype._onItemClick = function (event) {
            var historyController = this._viewerController.getRootViewer().getEditor().getHistoryController();
            if (event.target === this._rootItem) {
                this._viewerController.removeAllViewers();
                historyController.registerViewerChangeAction();
            }
            else {
                var index = this._items.indexOf(event.target);
                if (index !== -1) {
                    this._viewerController.removeViewersUpToIndex(index + 1);
                    historyController.registerViewerChangeAction();
                }
            }
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
         * Gets the root item.
         * @private
         * @ignore
         * @returns {HTMLLIElement} The root item.
         */
        UIBreadcrumb.prototype._getRootItem = function () {
            return this._rootItem;
        };
        /**
         * Gets the list of items.
         * @private
         * @ignore
         * @returns {HTMLLIElement[]} The list of items.
         */
        UIBreadcrumb.prototype._getItems = function () {
            return this._items;
        };
        return UIBreadcrumb;
    }());
    return UIBreadcrumb;
});
