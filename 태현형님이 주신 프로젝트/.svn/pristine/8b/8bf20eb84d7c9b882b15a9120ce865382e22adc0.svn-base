// XSS_CHECKED
/*******
 uses an existing DOM element as the Toggle instead of requiring us to create our own.

 Example:

    require(['DELWebInfrastructure/Controls/Toggle' ],
        function (DELWebToggle) {
            $("input[type='checkbox']").each(function() {
                new DELWebToggle({container:this});
            });
        }
    );

*******/
define('DS/DELWebInfrastructure/Controls/Toggle', ['DS/Controls/Toggle'], function (WUXToggle) {
    'use strict';
    var Toggle = WUXToggle.inherit({
        //overload the init method from BaseComponent.js
        init: function (properties) {
            if(properties && properties.container && properties.container.nodeType && (properties.container.nodeType === 1)) {
                //this is a DOM element.  set it to our container
                this._preBuildView_container = properties.container;
//                if(!properties.label) {
//                    properties.label = properties.container.innerHTML;
//                }
            }
            this._parent(properties);
        },

        _preBuildView: function () {
            if(!this._preBuildView_container) {
                this._parent();
            } else {
                this.elements.container = UWA.extendElement(this._preBuildView_container); //make sure we enhance the dom element with any required UWA methods
                delete this._preBuildView_container;

                this.elements.container.addClassName('wux-controls-abstract wux-controls-toggle wux-controls-checkbox');
                //we have already defined our container as an existing element
                this.elements.button = this.elements.container;

                //replace this._parent() with the stuff that we care about from DS/Controls/Abstract, bypassing the DS/Controls/Button _preBuildView
                //this._parent();
                //this.elements.container.addClassName('wux-controls-abstract');
                this.elements.container.dsModel = this;

                //this.isMultiSelection = false;
            }
        }

    });

    return Toggle;
});
