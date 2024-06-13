/*******
 uses an existing DOM element as the SpinBox container instead of requiring us to create our own.

 Example:

    require(['DELWebInfrastructure/Controls/SpinBox' ],
        function (DELWebSpinBox) {
            $("input[type='number']").each(function() {
                new DELWebButton({container:this});
            });
        }
    );

*******/
define('DS/DELWebInfrastructure/Controls/SpinBox', ['DS/Controls/SpinBox'], function (WUXSpinBox) {
    'use strict';
    var SpinBox = WUXSpinBox.inherit({
        //overload the init method from BaseComponent.js
        init: function (properties) {
            if(properties && properties.container && properties.container.nodeType && (properties.container.nodeType === 1)) {
                //this is a DOM element.  set it to our container
                this._preBuildView_container = properties.container;
            }
            this._parent(properties);
        },

        buildView: function(){
            if(!this._preBuildView_container){
                this._parent();
            }else{
                this.elements.container = UWA.extendElement(this._preBuildView_container); //make sure we enhance the dom element with any required UWA methods
                delete this._preBuildView_container;

                this.elements.container.addClassName('wux-controls-spinbox');

                //find the input text field under the parent (we assume it's the first and only child)
                //we need to extend the current input box so we still have the functionailty such as addClassName
                this.elements.inputField = UWA.extendElement(this.elements.container.firstElementChild);
                this.elements.inputField.addClassName('wux-controls-lineeditor');
                this.elements.inputField.setAttribute('type', 'text');
                this.elements.inputField.tabIndex = 0;
                this.elements.inputField.setAttribute('name', 'LineEditor');
                this.elements.inputField.setAttribute('autocomplete', 'off');
                this.elements.inputField.inject(this.elements.container);

//            this.elements.inputField = new UWA.Element('input', {
//                'class': 'wux-controls-lineeditor',
//                type: 'text',
//                tabindex: 0,
//                name: 'LineEditor',
//                autocomplete: 'off'
//
//            }).inject(this.elements.container);
                this._myInput = this.elements.inputField;

                if (this.displayStyle === 'normal') {
                    this._createSpinBoxButtons();
                }

//                //add some relevant classes and options
//                this.elements.container.addClassName('wux-controls-SpinBox');
//                this.elements.container.addClassName('wux-controls-abstract');
//                this._myInput.addClassName('wux-ui-state-' + this.options.type);
//                this._validFlag = true;
            }
        }
    });

    return SpinBox;
});
