steal('jquery/controller',
    	'jquery/view/ejs',				      // client side templates
    	'jquery/controller/view',		    // lookup views with the controller's name
      '//../DSCommon/src/search/views/search.css',
      '//../DSCommon/src/search/views/search.ejs',
      '//../jquery.jsperanto/jquery.jsperanto.js',
      '//../DSCommon/src/search/controllers/search_options_controller.js'
).then(function(){
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
    var can = window.can; //for mkscc compliance, we have to define all our variables...
    var steal = window.steal; //for mkscc compliance, we have to define all our variables...
can.Control.extend('Ds.CommonSearch',
/* @Static */
{
	//onDocument: true,
},
/* @Prototype */
{
	init : function(){
	  var $el = this.element;
	  if(!$el.hasClass('ds_common_search')) {
	    $el = $('.global_ctn_search');
	  }

	  $el.find('.option_ctn_search').ds_common_search_options();
	  $el.children('.ds_common_search_options').show(); //why does this keep hiding??
	  $el.children('.input_ctn_search').css('overflow','hidden'); //if you don't set this, the /ematrix/webapps/SNSearchUX/SearchAutocomplete.css file overrides the TopBar.css file definition of hidden

	  $el.find(':text.input_search')
	                  .click(function() {
	                     //why does this keep hiding??
                	    $(this).closest('.ds_common_search').children('.ds_common_search_options:hidden').show();
                	  }).end()
	              ;
  },

  clearsearch : function(ev) {
    this.element.removeClass('loading')           //remove the loading class if it exists
        .find(':text.input_search').val('').end() //clear the text field
        .find('#globalSearch img').hide();        //hide the search icon
    $((window.widget && window.widget.body) ? window.widget.body : '.ds_common').find('.search_loading_overlay').remove(); //remove any overlay that we may have had.
  },

  runsearch : function(strSearch) {
    var that = this;
    //steal.dev.log(this.constructor.fullName+'::runasearch');
    if(!strSearch) {
      strSearch = this.element.find(':text.input_search').val();
    }
    if(strSearch) {
      if(this._resultsElement && (this._resultsElement.closest('body').size() <= 0)) {
        //we have an invalid resultsElement.  Remove it.
        this.setResultsContainer(null);
      }
      if(this._resultsElement) {
        this._resultsElement.add(this._resultsElement.find('.search_results_container')).addClass('loading').end()
            .find('.ui-selectable').empty();
        if(this._resultsElement.closest('.ui-dialog-content').size() > 0) {
          this._resultsElement.closest('.ui-dialog-content').dialog('option','position',{ my: 'center', at: 'center', of: ((window.widget && window.widget.body) ? window.widget.body : '.snd') });
        }
      } else {
        var $search_loading_overlay = this.element.find('.search_loading_overlay');
        if($search_loading_overlay.size() <= 0) {
          $search_loading_overlay = $('<div></div>').addClass('search_loading_overlay ui-front ui-widget-overlay').appendTo((window.widget && window.widget.body) ? window.widget.body : '.ds_common')
                                        .append($('<div></div>').addClass('search_results_container loading'));
        }
        $search_loading_overlay.show();
      }
      if(!this.element.hasClass('ds_common_search') && ($('.global_ctn_search').size() > 0)) { //standalone widget
        $('.global_ctn_search').trigger('runsearch',{
                                          value:strSearch,
                                          callback:that.proxy('displayResults')
                                        })
                  .addClass('loading');
      } else {
        this.element.trigger('runsearch',{
                                          value:strSearch,
                                          callback:that.proxy('displayResults')
                                        })
                  .addClass('loading');
      }
    }
  },

  setResultsContainer : function($resultsContainer) {
    this._resultsElement = $resultsContainer;
  },

  displayResults : function(objData) {
    var that = this;
    this.element.add(this.element.find('.loading')).removeClass('loading');
    $((window.widget && window.widget.body) ? window.widget.body : '.ds_common').find('.search_loading_overlay').remove(); //remove any overlay that we may have had.
    var prevSelection = -1; // here we will store index of previous selection
    var filterForSelection = '.search_result:visible,.ui-selected:hidden';
    if (!this._resultsElement) {
      this._resultsElement = $('<div></div>').addClass('search_results_container')
                                            .appendTo((window.widget && window.widget.body) ? window.widget.body : '.ds_common')
                                            .dialog({
                                              appendTo: ((window.widget && window.widget.body) ? window.widget.body : '.ds_common'),
                                              modal:true,
                                              minWidth: 700,
                                              width:'80%',
                                              minHeight:360,
                                              maxHeight:$((window.widget && window.widget.body) ? window.widget.body : '.ds_common').height()*.9,
                                              title:$.t('Search Results'),
                                              create:function(ev,ui) {
                                                //make sure we cannot drag outside the widget
                                                $(this).closest('.ui-dialog').draggable('option', 'containment', 'parent' );

                                          			that.element.find(':text.input_search').on( 'focusin.search_results-dialog', function( ev ) {
                    			                          //modal dialogs listen to the focusin event on the document to determin
                    			                          // if the user should be allowed to enter data.
                    			                          // prevent the document from catching the event
                                            			  if(ev && ev.stopImmediatePropagation) {
                                            			    ev.stopImmediatePropagation();
                                            			  }
                    		                        });
                                              },
                                              close:function(ev,ui) {
                                                //remove the event handler for the search dialog
                                          			that.element.find(':text.input_search').off( 'focusin.search_results-dialog');

                                                $(this).dialog('destroy').remove();
                                                that._resultsElement = null;
                                              }
                                            })
                                            //.closest('.ui-dialog').before($('.search_results_container').data('uiDialog').overlay).end() //make sure that our dialog element is AFTER the overlay, so that the dialog is always above it!
                                            .append($('<div></div>').selectable({
                                              filter: filterForSelection,  //only deal with the visible results, and anything that was already selected (so it can be UNselected
                                              selecting: function (event, ui) { // on select

                                                // handle shift key
                                                var currSelection = $(ui.selecting.tagName, event.target).index(ui.selecting); // get selecting item index
                                                if (event.shiftKey && prevSelection > -1) { // if shift key was pressed and there is previous - select them all
                                                  $(ui.selecting.tagName, event.target).slice(Math.min(prevSelection, currSelection), 1 + Math.max(prevSelection, currSelection)).filter(filterForSelection).addClass('ui-selected');
                                                } else {
                                                  prevSelection = currSelection; // othervise just save prevSelection
                                                }

                                              },

                                              stop: function (event, ui) {
                                                                        steal.dev.log(that.constructor.shortName+'::selectable stop');
                                                                      }
                                                                    })
                                                                    .click(function(ev) {
                                                                      var $target = $(ev.target).closest('.ui-selectee');
                                                                      if ($target.hasClass('ui-selected') && $target.hasClass('ui-draggable')) {
                                                                        steal.dev.log(that.constructor.shortName+'::.ui-selectee.ui-selected clicked');
                                                                        var $selectable = $();
                                                                        if(ev && ev.ctrlKey) {
                                                                          //unselect THIS item
                                                                          $selectable = $target.removeClass('ui-selected')
                                                                                              .closest('.ui-selectable');
                                                                        } else {
                                                                          //unselect all other items
                                                                          $selectable = $target.siblings('.ui-selected').removeClass('ui-selected').end()
                                                                                              .closest('.ui-selectable');
                                                                        }

                                                                        var stopFunc = $selectable.selectable( 'option' , 'stop');
                                                                        if(stopFunc) {
                                                                          //call the selectable stop function directly, passing our $selectable as the context
                                                                          $.proxy(stopFunc,$selectable,ev)();
                                                                        }
                                                                        $selectable.selectable( 'refresh' ).trigger('selectablestop');
                                                                      } else if(!$target.hasClass('ui-selected') && $target.hasClass('ui-draggable')) {
                                                                        steal.dev.log(that.constructor.shortName+'::.ui-selectee:not(.ui-selected) clicked');
                                                                        var $selectable = $target.addClass('ui-selected')
                                                                                              .closest('.ui-selectable');
                                                                        if(ev && !ev.ctrlKey) {
                                                                          //unselect all other items
                                                                          $target.siblings('.ui-selected').removeClass('ui-selected');
                                                                        }
                                                                        var stopFunc = $selectable.selectable( 'option' , 'stop');
                                                                        if(stopFunc) {
                                                                          //call the selectable stop function directly, passing our $selectable as the context
                                                                          $.proxy(stopFunc,$selectable,ev)();
                                                                        }
                                                                        $selectable.selectable( 'refresh' ).trigger('selectablestop');
                                                                      }
                                                                    })

                                            );

        var overlay = (this._resultsElement.data('uiDialog') ? this._resultsElement.data('uiDialog').overlay : null);
        if(overlay) {
            this._resultsElement.closest('.ui-dialog').before(overlay); //make sure that our dialog element is AFTER the overlay, so that the dialog is always above it!
        }

    } else {
      this._resultsElement.add(this._resultsElement.find('.loading')).removeClass('loading');
    }

    if(!objData) return false;
    if(objData.html) {
      var $selectable = $();//$retVal.filter('.ui-selectable').add($retVal.find('.ui-selectable'));
      if(this._resultsElement.hasClass('ui-selectable')) {
        $selectable = $selectable.add(this._resultsElement);
      } else {
        $selectable = $selectable.add(this._resultsElement.find('.ui-selectable'));
      }
      if($selectable.size() <= 0) {
        //look within my element
        $selectable = $selectable.add(this.element.find('.ui-selectable'));
      }
      var $retVal = $(objData.html);

      if (objData.from) {
          //if the input data has specified a 'from' to limit any duplicate results, then replace the old with the new (if any exist)
        if (this._resultsElement.find('[data-from="'+objData.from+'"]').size() > 0) {
            //get the old elements to remove
            var $oldToRemove = this._resultsElement.find('[data-from="'+objData.from+'"]');
            if($oldToRemove.last().closest($selectable).size() > 0) {
                $oldToRemove.last().after($retVal); //insert the new ones after the old ones
            } else {
                //the old elements were NOT in the selectable!  Just add the new retVal to the $selectable
                $retVal.appendTo($selectable);
            }
            $oldToRemove.remove(); //now remove the old ones
        } else {
            $retVal.appendTo($selectable);
        }
        $retVal.attr('data-from',objData.from);
      } else {
        $retVal.appendTo($selectable);
      }
      $retVal.data('objData', objData); //set this in case the application needs to do a lookup later

      $selectable.on( 'selectablestop', function( event, ui ) {
                                    $(this).find('.ui-draggable').draggable('destroy');

                                    $(this).find('.ui-selected:not(.not-draggable)')
                                                .draggable({
                                                      helper: function() {
                                                        //there should only ever be ONE object dragging.  Remove all others.
                                                        var $this = $(this);
                                                        var $retObj = $('.search_results_dragging.ui-widget-content.ui-front').empty();
                                                        if(!$retObj || ($retObj.size() <= 0)) {
                                                          $retObj = $('<div></div>')
                                                                        .addClass('search_results_dragging ui-widget-content ui-front')
                                                                        ;
                                                        }
                                                        $retObj.append($this.find('.ui-selected:not(tr)').clone());

                                                        var $trSelected = $(this).closest('.search_results_container').find('tr.ui-selected');
                                                        if($trSelected.size()) {
                                                          var $tmpTable = $('<table></table>')
                                                                            .append($trSelected.clone());
                                                          if($tmpTable.find('td.search_helper').show().size()) {//also make them visible while we are at it.
                                                            //they've indicated the cells to use as helpers.  Remove the others.
                                                            $tmpTable.find('td:not(.search_helper)').remove();
                                                          }
                                                          $retObj.append($tmpTable);
                                                        }

                                                        if($retObj.find('.ui-selected').size() > 5) {
                                                          //too many for our poor user's eyes!  Just hide them and tell them how many they are moving.
                                                          var numDragging = $retObj.find('.ui-selected').size();
                                                          $retObj.children().hide(); //just hide everything.
                                                          $('<div></div>').text($.t('{0} items...',{0:numDragging, defaultValue: numDragging+' items...'}))
                                                                          .css('padding','.5em')
                                                                          .appendTo($retObj);
                                                        }

                                                        return $retObj[0];
                                                      },
                                                      appendTo: ((window.widget && window.widget.body) ? window.widget.body : '.ds_common'),
                                                      containment: ((window.widget && window.widget.body) ? window.widget.body : '.ds_common'),
                                                      cursor:'not-allowed',
                                                      revert:function(blnValid) { //see http://jamesallardice.com/run-a-callback-function-when-a-jquery-ui-draggable-widget-reverts/
                                                        //if(blnValid) {
                                                        //    //Dropped in a valid location
                                                        //} else {
                                                        //    //Dropped in an invalid location
                                                        //}

                                                        if (blnValid) { // the drop was on an acceptable droppable
                                                          // but the drop could still have failed (due to access or other reasons.
                                                          // in such case window.widget will have a 'invalid_drop_accepted' class.
                                                          if ($((window.widget && window.widget.body) ? window.widget.body : '.ds_common').hasClass('ds_invalid_drop_accepted')) {
                                                            blnValid = false;
                                                            $((window.widget && window.widget.body) ? window.widget.body : '.ds_common').removeClass('ds_invalid_drop_accepted')
                                                          }
                                                        }
                                                        var $this = $(this);
                                                        var objDraggableData = $this.data('uiDraggable');
                                                        if(objDraggableData && objDraggableData.originalPosition) {
                                                          //we are going to override the originalPosition so that it reverts back to the search bar.
                                                          //  This should help avoid confusion about it not going to some destination location
                                                          objDraggableData.originalPosition = that.element.find(':text').offset();
                                                        }

                                                        //fade our search results back in
                                                        var $dlg = that._resultsElement.closest('.ui-dialog');
                                                        $dlg.siblings('.ui-widget-overlay').add($dlg).show('fade');

                                                        return !blnValid;
                                                      },
                                                      cursorAt:(($('html.touch').size() > 0) ? {left:-5,bottom:-20} : {left:-5,top:-5}), //for touch devices, move the helper above the finger
                                                      create: function( event, ui ) {
                                                        steal.dev.log('draggable create called');
                                                      },
                                                      start: function(ev, ui ) {
                                                        $((window.widget && window.widget.body) ? window.widget.body : '.ds_common').addClass('not-allowed ds_search_result_dragging');
                                                        $('body').one('mouseup',function() {
                                                          $(this).find('.search_results_dragging').css('background-color','RED');
                                                        });
                                                        var $dlg = that._resultsElement.closest('.ui-dialog');
                                                        $dlg.siblings('.ui-widget-overlay').add($dlg).hide('fade');

                                                        if ( window.OpenAjax ) {
                                                          OpenAjax.hub.publish('Search.ResultsDragging.start',{ev:ev, ui:ui, el:$((window.widget && window.widget.body) ? window.widget.body : '.ds_common').find('.search_results_dragging') });
                                                        }
                                                      },
                                                      stop: function(ev, ui ) {
                                                        $((window.widget && window.widget.body) ? window.widget.body : '.ds_common').removeClass('not-allowed ds_search_result_dragging');

                                                        if ( window.OpenAjax ) {
                                                          OpenAjax.hub.publish('Search.ResultsDragging.stop',{ev:ev, ui:ui, el:$((window.widget && window.widget.body) ? window.widget.body : '.ds_common').find('.search_results_dragging') });
                                                        }
                                                      }
                                                });
      }).selectable( 'refresh' );

      if(this._resultsElement.hasClass('ui-dialog-content')) {
        this._resultsElement.closest('.ui-dialog').css({top:'auto',left:'auto'}).end()
                            .dialog('option','position',{ my: 'center', at: 'center', of: ((window.widget && window.widget.body) ? window.widget.body : '.snd') }); //recenter the dialog
      }
      return $retVal;
    }
  }

});
$(window).trigger('Ds.CommonSearch.defined'); //we have to trigger this due to steal timing issues in the production build
});
