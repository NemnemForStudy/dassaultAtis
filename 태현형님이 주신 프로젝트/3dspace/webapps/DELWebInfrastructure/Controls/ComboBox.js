// XSS_CHECKED
/*******
 uses an existing DOM element as the button container instead of requiring us to create our own.

 Example:

    require(['DELWebInfrastructure/Controls/ComboBox' ],
        function (DELWebComboBox) {
            $("select").each(function() {
                new DELWebComboBox({container:this});
            });
        }
    );

*******/
if (window.define) {
define('DS/DELWebInfrastructure/Controls/ComboBox', ['DS/Controls/ComboBox'], function (WUXComboBox) {
    'use strict';
    var ComboBox = WUXComboBox.inherit({
        //overload the init method from BaseComponent.js
        init: function (properties) {
            if(properties && properties.container && properties.container.nodeType && (properties.container.nodeType === 1)) {
                //this is a DOM element.  set it to our container
                this._preBuildView_container = properties.container;
                if(!properties.label) {
                    properties.label = properties.container.innerHTML;
                }
            }

            if (properties && properties.allowUnsafeHTMLContent) {
                if (!this.allowUnsafeHTMLContent) {
                    this.allowUnsafeHTMLContent = properties.allowUnsafeHTMLContent;
                }
            }

            this._parent(properties);
        },

        _preBuildView: function () {
            if(this._preBuildView_container) {
                this.elements.container = UWA.extendElement(this._preBuildView_container); //make sure we enhance the dom element with any required UWA methods
            }
            this._parent(); //this will call the _preBuildView in the Abstract.js file, which will just add the class and take care of everything else
        },

        _selectedIndexModified: function () {
            this._parent(); //call the parent popup before we start editing it
            if (this.elements.text.textContent && this.allowUnsafeHTMLContent) {
                if (!this.enableSearchFlag && !this.multiSelFlag && this.selectedIndexes) {
                    if ((this.selectedIndex >= 0) && (this.selectedIndex < this._getAllDescendants().length)) {
                        this.elements.text.innerHTML = this._getAllDescendants()[this.selectedIndex].options.label;
                    }
                }
            }
        },

        _buildPopup: function () {
            this._parent(); //call the parent popup before we start editing it
            if (this.elements.treeListView && this.allowUnsafeHTMLContent) {
                this.elements.treeListView.options.allowUnsafeHTMLContent = this.allowUnsafeHTMLContent;
                if (this.elements.treeListView.getManager) {
                    this.elements.treeListView.getManager().options.allowUnsafeHTMLContent = this.allowUnsafeHTMLContent;
                }
            }
        }


    });

    return ComboBox;
});
}
