/**
  modify the jQuery.ui.selectable to work wich touch scroll, single select.
 
  2016-10-19 - ZJX
**/
(function($) {
  $.widget( "custom.singletouchselectable", $.ui.selectable, {
  
 	_create: function() {
		var selectees,
			that = this;
            
        this.currentSlection = null;
        this.pre_selectees = []
        this.scrollStarted = false;
          
		this.element.addClass("ui-selectable");

		this.dragged = false;

		// cache selectee children based on filter
		this.refresh = function() {
			selectees = $(that.options.filter, that.element[0]);
			selectees.addClass("ui-selectee");
			selectees.each(function() {
				var $this = $(this),
					pos = $this.offset();
				$.data(this, "selectable-item", {
					element: this,
					$element: $this,
					left: pos.left,
					top: pos.top,
					right: pos.left + $this.outerWidth(),
					bottom: pos.top + $this.outerHeight(),
					startselected: false,
					selected: $this.hasClass("ui-selected"),
					selecting: $this.hasClass("ui-selecting"),
					unselecting: $this.hasClass("ui-unselecting")
				});
			});
            
         var el = this.element;              
         this.element[0].addEventListener('touchmove', function(e){
            that.options.disabled = true;
            that.scrollStarted = true;
            }, false);
            
        this.element[0].addEventListener('touchend', function(e){
             that.options.disabled = false;                          
            }, false);
            
		};
		this.refresh();

		this.selectees = selectees.addClass("ui-selectee");

		this._mouseInit();

		this.helper = $("<div class='ui-selectable-helper'></div>");
	},
    
	_mouseStart: function(event) {
		var that = this,
			options = this.options;

		this.opos = [ event.pageX, event.pageY ];

		if (this.options.disabled) {
			return;
		}

		this.selectees = $(options.filter, this.element[0]);
        
        this.currentSlection = $(".ui-selected", this.element[0]);
        
		this._trigger("start", event);
		
       // $(options.appendTo).append(this.helper);
       
		// position helper (lasso)
		this.helper.css({
			"left": event.pageX,
			"top": event.pageY,
			"width": 0,
			"height": 0
		});

		if (options.autoRefresh) {
			this.refresh();
		}

		this.selectees.filter(".ui-selected").each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.startselected = true;
            
	//		if (!event.metaKey && !event.ctrlKey) { //  remove multi select
				selectee.$element.removeClass("ui-selected");
				selectee.selected = false;
				selectee.$element.addClass("ui-unselecting");
				selectee.unselecting = true;
				// selectable UNSELECTING callback
				that._trigger("unselecting", event, {
					unselecting: selectee.element
				});
		//	}
            
		});

		$(event.target).parents().addBack().each(function() {
			var doSelect,
				selectee = $.data(this, "selectable-item");
			if (selectee) {
				doSelect = (!event.metaKey && !event.ctrlKey) || !selectee.$element.hasClass("ui-selected");
				selectee.$element
					.removeClass(doSelect ? "ui-unselecting" : "ui-selected")
					.addClass(doSelect ? "ui-selecting" : "ui-unselecting");
				selectee.unselecting = !doSelect;
				selectee.selecting = doSelect;
				selectee.selected = doSelect;
				// selectable (UN)SELECTING callback
				if (doSelect) {
                    that.pre_selectees.push( selectee.element);
                    
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
                    
				} else {
					that._trigger("unselecting", event, {
						unselecting: selectee.element
					});
				}
				return false;
			}
		});

	},

	_mouseStop: function(event) {
		var that = this;

		this.dragged = false;
                
    // restore original selection while scrolling
         if (this.scrollStarted) {
            $(this.pre_selectees).each( function () {
                $(this).removeClass("ui-selecting");
            });            

             // --- set "selected" state
            $(this.currentSlection).each(function() {
                    var selectee = $.data(this, "selectable-item");
                    selectee.$element.removeClass("ui-selecting").addClass("ui-selected");
                    selectee.selecting = false;
                    selectee.selected = true;
                    selectee.startselected = true;
                 });
  
            this.pre_selectees = []; 
            
            // --- clear unselecting  state
            $(".ui-unselecting", this.element[0]).each(function() {
                    var selectee = $.data(this, "selectable-item");
                    selectee.$element.removeClass("ui-unselecting");
                    selectee.selected = false;
                    selectee.unselecting = false;
                    selectee.startselected = false;
                 });
                
           // -- clear selecting  state
            $(".ui-selecting", this.element[0]).each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.$element.removeClass("ui-selecting");
                selectee.selecting = false;
                selectee.selected = false;
                selectee.startselected = false;
            });
                   
            this._trigger("stop", event);
            that.scrollStarted = false;    
            
            return;            
         }
        that.scrollStarted = false; 
        
		$(".ui-unselecting", this.element[0]).each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.$element.removeClass("ui-unselecting");
			selectee.unselecting = false;
			selectee.startselected = false;
			that._trigger("unselected", event, {
				unselected: selectee.element
			});
		});
 
        var total = $(".ui-selecting", this.element[0]).length;
		$(".ui-selecting", this.element[0]).each(function(idx) {
            var isLast_item = (idx + 1 == total);
			var selectee = $.data(this, "selectable-item");
            
            // --- enforce single select
			selectee.selecting = false;
			selectee.selected = isLast_item ? true : false;
			selectee.startselected = isLast_item ? true : false;
            selectee.$element.removeClass("ui-selecting");
            
            if (isLast_item) {              
                selectee.$element.addClass("ui-selected");
                that._trigger("selected", event, {
                    selected: selectee.element
                });
            }
		});
        
  
		this._trigger("stop", event);

		this.helper.remove();

		return false;
	}

  });
})(jQuery);
