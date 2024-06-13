/*******
 uses an existing DOM element as the line editor container instead of requiring us to create our own.

 Example:

    require(['DELWebInfrastructure/Controls/LineEditor' ],
        function (DELWebButton) {
            $(".opendata-button").each(function() {
                new DELWebButton({container:this});
            });
        }
    );

*******/
define('DS/DELWebInfrastructure/Controls/LineEditor', ['DS/Controls/LineEditor'], function (WUXLineEditor) {
    'use strict';
    var LineEditor = WUXLineEditor.inherit({
        //overload the init method from BaseComponent.js
        init: function (properties) {
            if(properties && properties.container && properties.container.nodeType && (properties.container.nodeType === 1)) {
                //this is a DOM element.  set it to our container
                this._preBuildView_container = properties.container;
                // if(!properties.label) {
                    // properties.label = properties.container.innerHTML;
                // }
            }
            this._parent(properties);
        },

        // _preBuildView: function () {
            // if(!this._preBuildView_container) {
                // this._parent();
            // } else {
                // this.elements.container = UWA.extendElement(this._preBuildView_container); //make sure we enhance the dom element with any required UWA methods
                // delete this._preBuildView_container;

                // this.elements.container.addClassName('wux-controls-lineeditor');
                // //we have already defined our container as an existing element
                // this.elements.lineeditor = this.elements.container;

                // this.elements.container.addClassName('wux-controls-abstract');
                // this.elements.container.dsModel = this;

                // this.isMultiSelection = false;
            // }
        // },

        buildView: function(){
            if(!this._preBuildView_container){
                this._parent();
            }else{
                this.elements.container = UWA.extendElement(this._preBuildView_container); //make sure we enhance the dom element with any required UWA methods
                delete this._preBuildView_container;

                //find the input text field under the parent (we assume it's the first and only child)
                //we need to extend the current input box so we still have the functionailty such as addClassName
                this._myInput = UWA.extendElement(this.elements.container.firstElementChild);

                //add some relevant classes and options
                this.elements.container.addClassName('wux-controls-lineeditor');
                this.elements.container.addClassName('wux-controls-abstract');
                this._myInput.addClassName('wux-ui-state-' + this.options.type);
                this._validFlag = true;
            }
        }

    });

    return LineEditor;
});
