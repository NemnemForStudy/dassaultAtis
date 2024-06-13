/**
  modify the jQuery.ui.selectmenu to include icons.
  Based on the example on the jQueryUI demo page: http://jqueryui.com/selectmenu/#custom_render

  2014-07-14 - NWT
**/
(function($) {
  $.widget( "custom.iconselectmenu", $.ui.selectmenu, {
    _renderItem: function( ul, item ) {
      var $li = this._super( ul, item ); //call the default

      //add our icon span
      $( "<span>", {
        style: (item.element.attr( "data-style" ) ? item.element.attr( "data-style" ) : ''),
        "class": "ui-icon " + (item.element.attr( "data-class" ) ? item.element.attr( "data-class" ) : '')
      })
      .appendTo( $li );
      return $li;
    },

    _drawButton: function() {
      if(this.options && this.options.position && this.options.position.my && this.options.position.at && this.options.icons && this.options.icons.button) {
        if(this.options.position.my.indexOf("bottom") >= 0) {
          if(this.options.position.at.indexOf("top") >= 0) {
            //we are positioning the menu ABOVE our button.  Make the rounding of the menu at the top, not at the bottom
            //this.menu.removeClass("ui-corner-bottom").addClass("ui-corner-top");
            if(this.options.icons.button == "ui-icon-triangle-1-s") {
              this.options.icons.button = "ui-icon-triangle-1-n";
            }
          }
        }
      }

      this._super(); //create the default button

      if(this.element) {
        var $selectedOption = this.element.find( "option:selected" );
        var selectedDataStyle = $selectedOption.attr( "data-style" );
        if(selectedDataStyle && (selectedDataStyle.indexOf("background-image") >= 0)) {
          //we have an icon  add it to our button now.  the _select code below will update it later if needed
          $( "<span>", {
            style: selectedDataStyle,
            "class": "ui-icon " + ($selectedOption.attr( "data-class" ) ? $selectedOption.attr( "data-class" ) : '')
          })
          .css({left:'.2em',right:'auto'})
          .prependTo( this.buttonText.css("padding-left",'1.5em') );
        }
      }
    },

    _drawMenu: function() {
      var that = this;
      this._super(); //create the default menu

      if(this.menuWrap) {
        $(window).on("resize",function() {
          //just close our menu if we resize.  If we don't, then the menu moves all over the desktop
          that.close();
        });
      }

      if(this.menu) {
        if(this.options && this.options.position && this.options.position.my && this.options.position.at) {
          if(this.options.position.my.indexOf("bottom") >= 0) {
            if(this.options.position.at.indexOf("top") >= 0) {
              //we are positioning the menu ABOVE our button.  Make the rounding of the menu at the top, not at the bottom
              this.menu.removeClass("ui-corner-bottom").addClass("ui-corner-top");
            }
          }
        }
      }
    },

    _select: function( item, event ) {
      //update our icon, if it exists
      this._super( item, event ); //call the default
      if(item && this.menuItems) {
        var $icon = $(this.menuItems[item.index]).find(".ui-icon").clone();
        if($icon && ($icon.size() > 0)) {
          this.buttonText.css("padding-left",'1.5em')
                        .prepend($icon.css({left:'.2em',right:'auto'}))
        } else {
          //remove the padding we added for the icon
          this.buttonText.css("padding-left","");
        }
      }
    }
  });
})(jQuery);
