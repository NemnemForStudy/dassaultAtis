window.steal("jquery/controller",
      '//../DSCommon/src/search/views/standalone_widget.ejs',
      '//../DSCommon/src/search/search.js',
      '//../DSCommon/src/search/views/search.css',
    '//../Controls/jquery.dsButton.js'
).then(function(){
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
    var can = window.can; //for mkscc compliance, we have to define all our variables...

//$.Controller
can.Control.extend('Ds.CommonSearchStandalone',
/* @Static */
{
  //onDocument: true,
},
/* @Prototype */
{
  init : function(){
    var that = this;
    if(!window.widget || !widget.elements || !widget.elements.title) return false; //we shouldn't really be here...

    var $widgetTitle = $(widget.elements.title);
    //in JavascriptMVC-3.3 that.view creates a document fragment, which doesn't seem to play with with some other jQuery methods like addClass.  Look up our new element
    var $ds_common_standalone_search = $widgetTitle.after(that.view('//../DSCommon/src/search/views/standalone_widget.ejs')).next("table")
                                                                        .addClass("ds_common_standalone_search")
                                                                        .find(".btn_search")
                                                                          .dsButton({icon:"ui-icon-close"})
                                                                          .end()
                                                                        //.height($(widget.elements.header).height())
                                                                        .css({
                                                                                right: $(widget.elements.menus).outerWidth(),
                                                                                maxWidth:$(widget.elements.header).innerWidth() - $(widget.elements.menus).outerWidth()
                                                                              });


    $ds_common_standalone_search.find(".btn_search").click(function() {
      $(this).find(".ui-icon").toggleClass("ui-icon-search ui-icon-close").end()
          .closest(".ds_common_standalone_search").find(".global_ctn_search").slideToggle(); //hide or show
      $(this).closest("body").find("#AEFGlobalSearchHolder").remove();
    });

    this.resize();
    widget.addEvent('onResize',this.proxy("resize"));

    //this._super(); //call the ds_search (aka search.js) init function
    $ds_common_standalone_search.find(".global_ctn_search").ds_common_search(); //instanciate our search controller on this object

    $ds_common_standalone_search.find(".global_ctn_search .option_ctn_search .option_icon").addClass("ui-icon ui-icon-triangle-1-s");
    $ds_common_standalone_search.find(".global_ctn_search .run_ctn_search .run_btn_search")
                                  .addClass("ui-icon ui-icon-search")
                                  .click(function() {
                                    var $ds_common_search = $(this).closest(".ds_common_search");
                                    $ds_common_search.ds_common_search("runsearch",$ds_common_search.find(".input_search").val());
                                  })
                                  ;
    $ds_common_standalone_search.find(".global_ctn_search .clear_ctn_search .clear_btn_search").addClass("ui-icon ui-icon-close").click(function() {
      $(this).hide().closest(".ds_common_standalone_search").find(".input_search").val("");
      $(widget.elements.header).find(".input_search").val("");
    });
    $ds_common_standalone_search.find(".input_search").keyup(function(ev) {
      if($(this).val().length > 0) {
        $ds_common_standalone_search.find(".global_ctn_search .clear_ctn_search .clear_btn_search").show();
      } else {
        $ds_common_standalone_search.find(".global_ctn_search .clear_ctn_search .clear_btn_search").hide();
      }
      that.editKeyPress(ev);
    });
  },

  destroy: function() {
    var that = this;
    if(window.widget && widget.elements && widget.elements.header) {
      $(widget.elements.header).find(".ds_common_standalone_search").remove();
    }
    this._super(); //Always call this!
  },

  editKeyPress : function(ev) {
    if(!ev)
      return false;

    var code = (ev.keyCode ? ev.keyCode : ev.which);
    switch(code) { //jQuery will normalize this
      case $.ui.keyCode.ENTER: //Escape keycode
        var $ds_common_search = $(ev.target).closest(".ds_common_search");
        $ds_common_search.ds_common_search("runsearch",$ds_common_search.find(".input_search").val());
        break;
//      default:
//        if(this.element.find(":text.search").val()) {
//          this.element.find("#globalSearch img").show();
//        } else {
//          this.element.find("#globalSearch img").hide();
//        }
//        break;
    }
  },


  "{window} resize" : function() {
    return this.resize();
  },
  resize: function() {
    var that = this;
    var $ds_common_standalone_search = $(widget.elements.header).find(".ds_common_standalone_search")
                                                .css({
                                                  maxWidth:$(widget.elements.header).innerWidth() - $(widget.elements.menus).outerWidth()
                                                });
  if ($ds_common_standalone_search.length > 0) {
      var $widgetTitle = $(widget.elements.title);
      var titleWidth = $widgetTitle.css("display","inline").width();$widgetTitle.css("display",""); //set the display to be inline to get an accurate width, then change it back to what it was before
      if($ds_common_standalone_search.find(".input_search").offset().left < (titleWidth+$widgetTitle.offset().left)) {
        //we have to hide the input until the search is clicked
        $ds_common_standalone_search.find(".btn_search .ui-icon-close").toggleClass("ui-icon-search ui-icon-close").end()
                .find(".global_ctn_search").hide();
      }
    }
  }
});
});
