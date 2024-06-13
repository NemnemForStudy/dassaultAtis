if(window.require) {
    require(['DS/DELWebInfrastructure/Controls/Button' ],  //preload this file
        function (DELWebButton) {
        }
    );
}
(function ( $ ) {
    $.widget( "custom.dsButton", {
    	version: "2018.01.22",
        // default options
    	defaultElement: "<button>",
    	options: {
//    		classes: {
//    			"ui-button": "ui-corner-all"
//    		},
//    		disabled: null,
//    		icon: null,
//    		iconPosition: "beginning",
//    		label: null,
//    		showLabel: true
    	},


        // the constructor
        _create: function() {
            var that = this;
            require(['DS/DELWebInfrastructure/Controls/Button' ],
                function (DELWebButton) {
                    that.element.not(".wux-controls-button").each(function() {
                        new DELWebButton($.extend(false,{container:this},that.options));
                    });
                }
            );
        },

      // events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
        // remove generated elements
//        this.changer.remove();

//        this.element
//          .removeClass( "custom-colorize" )
//          .enableSelection()
//          .css( "background-color", "transparent" );
      },


      // called when created, and later when changing options
      _refresh: function() {
//        this.element.css( "background-color", "rgb(" +
//          this.options.red +"," +
//          this.options.green + "," +
//          this.options.blue + ")"
//        );

        // trigger a callback/event
        this._trigger( "change" );
      },
//
//              // _setOptions is called with a hash of all options that are changing
//              // always refresh when changing options
//              _setOptions: function() {
//                // _super and _superApply handle keeping the right this-context
//                this._superApply( arguments );
//                this._refresh();
//              },
//
      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
        var that = this;
        var newValues = {};
        switch(key) {
            case 'disabled':
            case 'label':
                newValues[key] = value;
                break;
            default:
                this._super( key, value );
                return;
                break;
        }

        this.element.filter(".wux-controls-button").each(function() {
            var el = this;
            el.dsModel.setProperties(newValues);
            //this._refresh();
        });
      },

      _enable: function() {
        this.button("enable");
      },

      _disable: function() {
        this.button("disable");
      },

      _refresh: function(){
          this.button("refresh");
      }

    });

}( jQuery ));
