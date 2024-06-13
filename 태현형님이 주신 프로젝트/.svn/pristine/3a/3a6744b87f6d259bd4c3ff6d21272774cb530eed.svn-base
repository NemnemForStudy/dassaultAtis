steal("jquery/controller",
      '//../jquery.jsperanto/jquery.jsperanto.js', //translation
      "//../DSCommon/src/search/views/options/search_options.ejs"
).then(function(){
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
    var can = window.can; //for mkscc compliance, we have to define all our variables...
    var steal = window.steal; //for mkscc compliance, we have to define all our variables...
return can.Control.extend('Ds.CommonSearchOptions',
/* @Static */
{
  //onDocument: true,
},
/* @Prototype */
{
  init : function(){
    var that = this;

    if(!$.t) {
      //in production mode, this code seems to have a problem with the order that the code is actually loaded.  So we'll wait a small amount until everything is loaded
      setTimeout(this.proxy("init"),50);
      return false;
    }

    if(!steal.isRhino && window.widget.standalone) { //don't try to process this on the build script, and only include it if we are a standalone widget
      if (document.createStyleSheet){ //I HATE IE
        document.createStyleSheet('../DELWebInfrastructure/DSCommon/src/search/views/emxUIMenu.css');
      } else {
        $("<link rel='stylesheet' type='text/css' href='../DELWebInfrastructure/DSCommon/src/search/views/emxUIMenu.css'>").appendTo($("head"));
      }
//      "//../../common/styles/emxUIMenu.css"
//      steal(
//      /*{ //put this down here in init so that the webroot is correctly defined from ds_common.js
//          //just grab this from the enovia directory
//          src:"//../../../common/styles/emxUIMenu.css",
//          packaged:false
//      }*/
//      ); //load this CSS file from enovia
    }

    setTimeout(function() {
      that.element.show()
              .find(".option_center .option_text").text($.t("All"));
      },1000);
    this.element.find("ul.menu").remove(); //we are implementing our own.
  },

  click: function() {
    //steal.dev.log(this.constructor.fullName+" click");
    if($("#AEFGlobalSearchHolder").size()) {
      $("#AEFGlobalSearchHolder").remove();
    } else {
      $("body").append(this.view("//../DSCommon/src/search/views/options/search_options.ejs"))
            .find("#AEFGlobalSearchHolder").css({
                                                  top : this.element.offset().top + this.element.height(),
                                                  left: this.element.offset().left
                                               })
                                           .delegate("a","click",this.proxy("selectMenuItem"));
    }
  },

  //"{#AEFGlobalSearchHolder a} click": function($el, ev) {
  selectMenuItem : function(ev) {
    if(!ev || !ev.currentTarget) return false;

    var $el = $(ev.currentTarget);

    //steal.dev.log(this.constructor.fullName+": menu item clicked");
    //this.element.find(".button label").text($el.find("label").text());
    this.element.find(".option_center .option_text").text($el.find("label").text());

    var oriname = $el.find("label").attr("oriname") || "";
    this.element.data($el.closest("[data-type]").attr('data-type'),oriname);
    this.element.data('dataset',$el.parent().get(0).dataset); //Add any HTML5 "data-" attributes defined by the applications

    //this.element.prev(":has(.search)").css("margin-left",this.element.width() - 44);

    //let the click handler above deal with this
    this.click();
    //this.element.find("#AEFGlobalSearchHolder").remove(); //remove our results object
//    if(ev && ev.stopPropagation)
//      ev.stopPropagation();
  }

});
});
