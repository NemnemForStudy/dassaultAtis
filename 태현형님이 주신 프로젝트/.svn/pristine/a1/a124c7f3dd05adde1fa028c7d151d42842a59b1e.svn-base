// XSS_CHECKED
/*******
 uses an existing DOM element title attribute as the tooltip container instead of requiring us to create our own.

 Example:  DELWebTooltip/WUXTooltipModel

    require(['DELWebInfrastructure/Controls/Tooltip' ],
        function (DELWebTooltip) {
            $(".title").each(function() {
                new DELWebTooltip({container:this});
            });
        }
    );

*******/
define('DS/DELWebInfrastructure/Controls/Tooltip', ['DS/Controls/TooltipModel' ,'DS/Controls/Tooltip' ], function (WUXTooltipModel, WUXTooltip) {
    'use strict';
    var Tooltip = WUXTooltip.inherit({
        //overload the init method from BaseComponent.js
        init: function (properties) {

//            if(properties && properties.container && properties.container.nodeType && (properties.container.nodeType === 1)) {
//                //this is a DOM element.  set it to our container
//                this._preBuildView_container = properties.container;
//
//            }
            if(properties.target) {
                //properties.target.tooltipFrame = new WUXTooltip(properties);
                properties.target.tooltipInfos = new WUXTooltipModel(properties);
            }
            this._parent(properties);
        },

        hide: function() {
            //the default hide method clears the target, but never adds it back in.  This will result in the event handlers being lost
            if(this.target) {
                this._targetOrig = this.target;
            }
            this._parent(); //this will reset the target
            if(this._targetOrig) {
                this.target = this._targetOrig; //this will auto-call the _AddEventListeners back on the target.
                delete this._targetOrig;
            }
        }
    });


    return Tooltip;
});
