/*XSS_CHECKED*/
/**
 * Sample is available at FW
 * DS/ENOXCollectionToolBarTst/ENOXCollectionToolBar_sampleV2.html
 */

define(
		'DS/ENOXCollectionToolBar/js/ENOXCollectionToolBarV2',
		[
				'DS/Core/ModelEvents',
        'UWA/Core',
				'DS/Handlebars/Handlebars',
				'DS/Controls/Toggle',
				'DS/UIKIT/Iconbar',
				'DS/UIKIT/DropdownMenu',
				'DS/UIKIT/Tooltip',
        'DS/Controls/TooltipModel',
				'DS/ResizeSensor/js/ResizeSensor',
				'DS/ENOXViewFilter/js/ENOXBasicFilter',
        'DS/ENOXCollectionToolBar/js/ENOXGeneratedToolBar',
				'i18n!DS/ENOXCollectionToolBar/assets/nls/ENOXCollectionToolBar',
				'text!DS/ENOXCollectionToolBar/html/ENOXCollectionToolBarV2.html',
				'css!DS/ENOXCollectionToolBar/css/ENOXCollectionToolBarV2.css',
				'css!DS/UIKIT/UIKIT.css' ],

		function(ModelEvents,UWA, Handlebars, Toggle, Iconbar, DropdownMenu,
				Tooltip, WUXTooltipModel, ResizeSensor, ENOXViewFilter, GeneratedToolBar,
				nls_ENOXCollectionToolBarV2, html_ENOXCollectionToolBarV2,
				css_ENOXCollectionToolBarV2, css_uikit

		) {

			'use strict';

			Handlebars.registerHelper('sort_type_check2', function(currentType,
					compareToType, opts) {
				if (currentType == compareToType)
					return opts.fn(this);
				else
					return opts.inverse(this);
			});

			var template = Handlebars.compile(html_ENOXCollectionToolBarV2);

			var ENOXCollectionToolBarV2 = function(options) {
        let that = this;
        if(options.useGeneratedToolbar){
              that =  new GeneratedToolBar(options);
              return that;
        }

        this._nls_order_translation_map = {
           'asc'  : nls_ENOXCollectionToolBarV2.Ascend,
           'desc' : nls_ENOXCollectionToolBarV2.Descend,
           'ASC'  : nls_ENOXCollectionToolBarV2.Ascend,
           'DESC' : nls_ENOXCollectionToolBarV2.Descend
        };
				this._init(options);
			};

			/** ***************************************************INITIALIZATION************************************************************ */
			ENOXCollectionToolBarV2.prototype._init = function(options) {
				this._options = options ? UWA.clone(options, false) : {};

				this._modelEvents = options.modelEvents ? options.modelEvents
						: new ModelEvents();
				// Default values if not provided by options
				var defaults = {
					currentNbitems : 0,
					currentNbSelections : 0
				};

				this._options.multiselectActionCount = (this._options.multiselActions && this._options.multiselActions.length > 0) ? this._options.multiselActions.length
						: undefined;
				this._options.itemName = (options.itemName) ? options.itemName
						: nls_ENOXCollectionToolBarV2.Item;
				this._options.itemsName = (options.itemsName) ? options.itemsName
						: nls_ENOXCollectionToolBarV2.Items;

        		this._options.useWebUITooltip= options.useWebUITooltip ? true : false;
            //flag to use new toolbar as a feature - low cost
            this._options.withStableActions = options.withStableActions ? options.withStableActions : false;

				UWA.merge(this._options, defaults);

				this._setMultiselectionActions();
        this._initDivs();
				this._subscribeToEvents();
				this._render();
			};

			ENOXCollectionToolBarV2.prototype._initDivs = function() {
				this._container = document.createElement('div');
				this._options.nls = nls_ENOXCollectionToolBarV2;
				this._options.showBarAction = true;
				// Show the action bar if the multisel or a action is set
				/*
				 * if (this._options.actions || this._options.withmultisel) {
				 * this._options.showBarAction = true; }
				 */

        // console.log("ENOX-COLLECTION-TOOLBAR-OPTIONS",this._options);


				this._container.innerHTML = template(this._options);

				this._container = this._container
						.querySelector('.enox-collection-toolbar-v2-container');
				this._multiSelectContainer = this._container
						.querySelector('.enox-collection-toolbar-withmultisel');
				this._countContainer = this._container
						.querySelector('.enox-collection-toolbar-item-count');
				this._itemCountContainer = this._container
						.querySelector('.enox-collection-toolbar-item-count-inner');
				this._filterIconContainer = this._container
						.querySelector('.enox-collection-toolbar-filter');
				this._filterTextContainer = this._container
						.querySelector('.enox-basic-filter-container');
				this._finalItemContainer = this._container
						.querySelector('.enox-collection-toolbar-finalItem');
				this._filterContainer = this._container
						.querySelector('.enox-collection-toolbar-search-textbox-container');
				this._multiselectionContainer = this._container
						.querySelector('.enox-collection-toolbar-multiselection');
				this._multiselectionOptions = this._container
						.querySelector('#enox-collection-toolbar-multiselect-options');
				this._multiselectionCount = this._container
						.querySelector('.enox-collection-toolbar-multiselect-count');
				this._multiselectionDivider = this._container
						.querySelector('#enox-collection-toolbar-multiselect-divider');
				this._actionsContainer = this._container
						.querySelector('.enox-collection-toolbar-actions');
				this._rightMenuContainer = this._container
						.querySelector('.enox-collection-toolbar-right-menu');
				this._rightMenuContainerWrapper = this._container
						.querySelector('.enox-collection-toolbar-right-menu-wrapper');
        if(this._options.withStableActions){
                this._actionsFixedContainer = this._container
                      .querySelector('.enox-collection-toolbar-fixed-actions');//to get the fixedActionbar
                this._enoxDividerSearch = this._container
                      .querySelector('.enox-divider-search');

          }
				var checkBoxTextWidth = this._options.showItemCount ? (this._options.showItemCount.width ? this._options.showItemCount.width
						: undefined)
						: undefined;
				this._manageChangeWidthTextCheckBox(checkBoxTextWidth);

			};

			ENOXCollectionToolBarV2.prototype.inject = function(parentcontainer) {
				parentcontainer.appendChild(this._container);

			};

			/**
			 * FUNCTIONALITIES INITIALIZATION
			 */

			ENOXCollectionToolBarV2.prototype._render = function() {
				//var that = this;
				this._actionsIconBar = new Iconbar(
						{
							renderTo : this._actionsContainer,
							events : {
								onClick : function(e, i) {
									if (i && !i.disabled) {
										if (i.allowSelectRetain) {
											i.selected = !i.selected;
											i.selected ? i.elements.container
													.addClassName("enox-collection-toolbar-filter-activated")
													: i.elements.container
															.removeClassName("enox-collection-toolbar-filter-activated");
										}
									}
								}
							}
						});

            //iconBar for fixed Actions

            this._actionsFixedIconBar = new Iconbar(
    						{
    							renderTo : this._actionsFixedContainer,
    							events : {
    								onClick : function(e, i) {
    									if (i && !i.disabled) {
    										if (i.allowSelectRetain) {
    											i.selected = !i.selected;
    											i.selected ? i.elements.container
    													.addClassName("enox-collection-toolbar-filter-activated")
    													: i.elements.container
    															.removeClassName("enox-collection-toolbar-filter-activated");
    										}
    									}
    								}
    							}
    						});


				var checkBoxTextWidth = this._options.showItemCount ? (this._options.showItemCount.width ? this._options.showItemCount.width
						: undefined)
						: undefined;
				this._manageChangeWidthTextCheckBox(checkBoxTextWidth);

				// This test is for setting the width of the actionToolBar
				// depending of if we show the TextField (itemCount) and the
				// checkBox select (CSS).
				/*
				 * if (this._options.showItemCount &&
				 * this._options.withmultisel) {
				 * this._rightMenuContainerWrapper.className =
				 * this._rightMenuContainerWrapper.className + ' ' +
				 * 'enox-collection-toolbar-right-menu-wrapper-width-with-checkBox'; }
				 * else { if (this._options.showItemCount) {
				 * this._rightMenuContainerWrapper.className =
				 * this._rightMenuContainerWrapper.className + ' ' +
				 * 'enox-collection-toolbar-right-menu-wrapper-width-with-text'; }
				 * else { this._rightMenuContainerWrapper.className =
				 * this._rightMenuContainerWrapper.className + ' ' +
				 * 'enox-collection-toolbar-right-menu-wrapper-width'; } }
				 */

         if(this._options.withStableActions){

                   this.widthFixedAction = (this._options.filter ? 1 : 0 )  + (this._options.sort  ? 1 : 0 )  +

                                            //if views exist         if more than one view exist
                                            ((this._options. showSwitchViewAction && this._options.views) ? (this._options.views.length >2 ? 1 : 0) : 0)  +
                                            //if stableActions array exist                              if length ==1                if length >1
                                            (this._options.stableActions? (this._options.stableActions.length == 1 ? 1 : this._options.stableActions.length ) : 0);
                  //console.log(this._options,"checking the width of the fixedAction Bar",this.widthFixedAction);
                  this._actionsFixedContainer.style.minWidth = this.widthFixedAction * 38 + 1 +'px';
          				this._renderOtherActions();

                //  if(!this._options.showSolo){
                    this._renderMultiselection();
                  //}
                  this._renderSearch();

                  this._renderOtherActions(true);
                      //this._renderOtherActions(true);//true for stable Actions


                  this._renderSort();

                  if(this._options.showSwitchViewAction || typeof this._options.showSwitchViewAction === 'undefined'){
          				      this._renderViews();
                  }

        }else{

              this._renderSearch();
              this._renderMultiselection();
              this._renderOtherActions();

              this._renderViews();
              this._renderSort();

        }

      };


      ENOXCollectionToolBarV2.prototype._adjustDividerVisibility = function(){
        // if( typeof this._actionsIconBar.elements.container.firstChild.children == 'undefined'){
        //     break;
        //   }
        let children = this._actionsIconBar.elements.container.firstChild.children;
        let len = children.length;
        let prev =0;
        let ele=0;

        // let display = flag ? '':'none';
          for(let  i =0;i<len;i++){
            if(children[i].className == 'divider' ){

              if( prev == 0) {
                      if(ele > 0){
                        children[i].style.display="";//first divider visible
                      }else{
                        children[i].style.display = "none";
                      }
                      prev = i;
                      ele =0;
              } else {
                      if(ele >0){
                        children[i].style.display = '';//visible ''
                      }
                      if( ele == 0) {
                        children[i].style.display = "none";//hidden 'none'
                      }
                }
                ele = 0;
                prev = i;

              } else {
                if( children[i].style.display == ''){
                    ele += 1;
                  }
            }

        }//eo forloop



          //FOR THE LAST ELE/DIVIDER

            //for the last ele showing the divider
            if( ele > 0 ) {
              //console.log("last ele present",prev)
                //children[prev].style.display = '';
                if(this._enoxDividerSearch){
                  this._enoxDividerSearch.style.display = '';
                }
            }
            // if(this._enoxDividerSearch){
            //   if(ele > 0){
            //     this._enoxDividerSearch.style.display = '';
            //   }
            //   if(ele == 0){
            //     this._enoxDividerSearch.style.display = "none";
            //   }
            // }
            //for hiding the last divider
            if(ele  == 0){
              //children[prev].style.display = 'none';
                if(this._enoxDividerSearch){
                  this._enoxDividerSearch.style.display = "none";
                }
            }


      }



      // ENOXCollectionToolBarV2.prototype._renderStableActions = function(){
      //
      //     var actions = this._options.stableActions;
      //     var className = '';
      //     // IconAction Customize
      //     if (actions && actions.length > 0) {
      //
      //       this._wrapperContent = [];
      //       for (var i = 0; i < actions.length; i++) {
      //         // if(actions[i].id == 'mv-filter'){
      //         //   console.log("+++++++++++++++")
      //         // }
      //         var that = this;
      //         var action = actions[i];
      //         actions[i].disabled = actions[i].disabled || false;
      //         var contentItems = actions[i].content || [];
      //         var content;
      //         // Test if the content have many action
      //         if (contentItems.length > 0) {
      //           var itemSubAction = [];
      //           for (var t = 0; t < contentItems.length; t++) {
      //             var item = contentItems[t];
      //             item.parent = actions[i].id;
      //             // Add the event
      //             // enox-collection-toolbar-action-activated for
      //             // every item
      //             if (item.handler) {
      //               var handlerUser = item.handler
      //               var handleAction = function(e, i) {
      //                 that._publishEventItemOtherAction(this)
      //                 // Fire the user custom event
      //                 if (this.handlerUser) {
      //                   this.handlerUser(e, this);
      //                 }
      //               }.bind(item);
      //               // console.log(item.handler)
      //               item.handlerUser = handlerUser;
      //               item.handler = handleAction;
      //               // for sub-items
      //               if (item.items) {
      //                 item.items
      //                     .forEach(function(sub_item) {
      //                       if (!sub_item.handler) {
      //                         sub_item.handler = handlerUser;
      //                       }
      //                       var subHandlerUser = sub_item.handler;
      //                       var handleSubAction = function(
      //                           e, i) {
      //                         that
      //                             ._publishEventItemOtherAction(this)
      //                         if (this.subHandlerUser) {
      //                           this
      //                               .subHandlerUser(
      //                                   e,
      //                                   this);
      //                         }
      //                       }.bind(sub_item);
      //                       sub_item.subHandlerUser = subHandlerUser;
      //                       sub_item.handler = handleSubAction;
      //                     });
      //               }
      //             } else {
      //               item.handler = function(e, i) {
      //                 that._publishEventItemOtherAction(this)
      //               }.bind(item);
      //             }
      //
      //             itemSubAction.push(item);
      //
      //           }
      //           content = {
      //             type : action.type ? action.type
      //                 : 'dropdownmenu',
      //             options : {
      //               items : itemSubAction,
      //               responsiveMode : true,
      //               multiSelect : actions[i].multiSelect ? actions[i].multiSelect
      //                   : false
      //             }
      //           }
      //           this._wrapperContent[actions[i].id] = content;
      //           className = actions[i].className ? actions[i].className
      //               : '';
      //           this._actionsFixedIconBar
      //               .addItem({
      //                 className : className,
      //                 id : actions[i].id,
      //                 fonticon : actions[i].fonticon,
      //                 text : actions[i].text,
      //                 disabled : actions[i].disabled,
      //                 content : this._wrapperContent[actions[i].id],
      //                 // handler : handleAction
      //                 selected : actions[i].selected ? actions[i].selected
      //                     : false,
      //                 allowSelectRetain : actions[i].allowSelectRetain
      //               });
      //
      //
      //                 if(this._options.useWebUITooltip) this._setWebUXTooltipOnIcon(actions[i].id, {title : actions[i].text, loadHelpRsc : actions[i].loadHelpRsc});
      //
      //         } else {
      //           // Add the event
      //           // enox-collection-toolbar-action-activated
      //           // on the item
      //           var handleAction = function(e, i) {
      //             console
      //                 .log('Publish event : enox-collection-toolbar-action-activated'
      //                     + ' id : ' + this.id)
      //             that._modelEvents
      //                 .publish({
      //                   event : 'enox-collection-toolbar-action-activated',
      //                   data : this.id
      //                 });
      //             // Fire the user custom event
      //             if (this.handler) {
      //               this.handler(e, this, i);
      //             }
      //           }.bind(action);
      //           className = actions[i].className ? actions[i].className
      //               : '';
      //           this._actionsFixedIconBar
      //               .addItem({
      //                 className : className,
      //                 id : actions[i].id,
      //                 fonticon : actions[i].fonticon,
      //                 text : actions[i].text,
      //                 handler : handleAction,
      //                 selected : actions[i].selected ? actions[i].selected : false,
      //                 allowSelectRetain : actions[i].allowSelectRetain,
      //                 disabled : actions[i].disabled
      //               });
      //           if(this._options.useWebUITooltip) this._setWebUXTooltipOnIcon(actions[i].id, {title : actions[i].text,loadHelpRsc : actions[i].loadHelpRsc});
      //         }
      //       }
      //
      //       // if ((this._options.views && this._options.views.length > 0 ) || (this._options.sort && this._options.sort.length > 0)) {
      //       // 	this._actionsIconBar.addItem({
      //       // 		className : 'divider'
      //       // 	});
      //       // }
      //
      //     }
      //
      // };
			/**
			 * EVENTS HANDLED
			 */

			ENOXCollectionToolBarV2.prototype._subscribeToEvents = function() {
				var that = this;
				this._listSubscription = [];

				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-click-filter-search'
				}, function() {
					that._clickSearch();
				}));

				this._listSubscription
						.push(this._modelEvents
								.subscribe(
										{
											event : 'enox-collection-toolbar-select-all-checkbox-partial'
										},
										function() {
											that._selectionToggler.mixedState = true;
										}));

				this._listSubscription
						.push(this._modelEvents
								.subscribe(
										{
											event : 'enox-collection-toolbar-select-all-checkbox-uncheck'
										},
										function() {
											that._selectionToggler.mixedState = false;
											that._selectionToggler.checkFlag = false;
										}));

				this._listSubscription
						.push(this._modelEvents
								.subscribe(
										{
											event : 'enox-collection-toolbar-select-all-checkbox-checked'
										},
										function() {
											that._selectionToggler.mixedState = false;
											that._selectionToggler.checkFlag = true;
										}));

				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-items-count-update'
				}, function(itemCount) {
                    //only when show item count is enabled.
                    if(that._options.showItemCount) {
                        that._updateItemCount(itemCount);
                    }
				}));

				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-reset-sort'
				}, function() {
					that._resetSort();
				}));

				// Color the action in the toolbar (event CSS)
				// data :
				// { id : 'idAction', icon : 'iconAction'}
				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-color-selected-action'
				}, function(data) {
					that._setColorIconSelected(data);
				}));

				// Change the selected value of a subMenu
				// data :
				// { id : 'idAction', selected : boolean}
				this._listSubscription
						.push(this._modelEvents
								.subscribe(
										{
											event : 'enox-collection-toolbar-change-select-subMenu-action'
										}, function(data) {
											that._selectSubMenuAction(data.id,
													data.selected);
										}));

				this._listSubscription
						.push(this._modelEvents
								.subscribe(
										{
											event : 'enox-collection-toolbar-multiselect-icon-update-count'
										},
										function(number) {
											that
													._updateIconMultiselectNumber(number);
										}));

				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-set-multisel-actions'
				}, function(options) {
					that._multiselectActionsDD.destroy();
					that._setMultiselectionActions(options);
					that._renderMultiselection(options);
				}));

				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-add-action'
				}, function(item) {
					that._actionsIconBar.addItem({
						id : item.id,
						fonticon : item.icon,
						text : item.title,
						handler : item.onClick
					});
          		if(that._options.useWebUITooltip) that._setWebUXTooltipOnIcon(item.id, {title : item.text,loadHelpRsc : item.loadHelpRsc });
				}));

				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-remove-action'
				}, function(id) {
					that._actionsIconBar.menu.removeItem(id);
				}));

				// Disable the item
				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-disable-action'
				}, function(id) {
        //  that._modelEvents.publish({event:"enox-collection-toolbar-visibility-action",data:{id:id,flag:false}});
					  that._actionsIconBar.disableItem(id);
					// // // Menu
					  that._actionsIconBar.menu.disableItem(id);
					// // // OverflowMenu
					  that._actionsIconBar.overflowMenu.disableItem(id);
					// // // Disable SubMenu
					  that._activeSubMenuAction(id, false);
				}));

				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-enable-action'
				}, function(id) {
        //  that._modelEvents.publish({event:"enox-collection-toolbar-visibility-action",data:{id:id,flag:true}});
					that._actionsIconBar.enableItem(id);
					// Menu
					that._actionsIconBar.menu.enableItem(id);
					// OverflowMenu
					that._actionsIconBar.overflowMenu.enableItem(id);
					// Enable SubMenu
					that._activeSubMenuAction(id, true);
				}));

				// Change Icon SUBSCRIPTION
				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-change-icon-action'
				}, function(item) {
					that.changeIcon(item.id, item.fonticon, item.text);
				}));

				// Change Text Tooltip
				this._listSubscription
						.push(this._modelEvents
								.subscribe(
										{
											event : 'enox-collection-toolbar-change-text-tooltip-action'
										}, function(item) {
											that._setTextTooltipIcon(item.id,
													item.text, item.loadHelpRsc);
										}));

				// HIDE SUBSCRIPTION
				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-visibility-action'
				}, function(item) {
					that.setItemBarVisibility(item.id, item.flag);
				}));

				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-hide-checkbox'
				}, function() {
					that.setCheckBoxMultiVisibility(false);
				}));

				this._listSubscription.push(this._modelEvents.subscribe({
					event : 'enox-collection-toolbar-show-checkbox'
				}, function() {
					that.setCheckBoxMultiVisibility(true);
				}));

				this._listSubscription
						.push(this._modelEvents
								.subscribe(
										{
											event : 'enox-collection-toolbar-visibility-iconMultipleActionBar'
										},
										function(flag) {
											// Get the multiselection element
											// Customisation specific for the multiselection
											if (flag) {
												that._multiSelElement.style.display = '';
											}else {
												that._multiSelElement.style.display = 'none';
											}
											// Update the visibility into the overflow menu
											that.setItemBarVisibility(
													'iconMultipleActionBar',
													flag);
											that
													.setItemBarVisibility(
															'divider-multiselect',
															flag);
										}));


				// Event to set the state of the multiselection
				this._listSubscription
						.push(this._modelEvents
								.subscribe(
										{
											event : 'enox-collection-toolbar-active-iconMultipleActionBar'
										},
										function(flag) {
											that._setMultiselectionActive(flag);
										}));


                    var that = this;
                    function callBack(mutations){
                      for(let mutation of mutations){
                      let toolbar = mutation.target;
                      let resizeSensor = toolbar.querySelector('.resize-sensor');
                          if(mutation.isIntersecting){ //visible on viewport
                              if(resizeSensor == undefined || resizeSensor == null){
                                that.attachResizeSensor();
                                //intObserver.unobserve(that._container);
                               }
                          }else if(resizeSensor){ //if container not visible on viewport
                            that.resizeSensor.detach();//no need for a resizeSensor listener
                          }

                      }
                    };

                  this._intersectionObserver = new IntersectionObserver(callBack)//,{trackVisibility:true,delay:100});
                  //isVisible is a new feature confirming the visibility of the container on the viewport
                  this._intersectionObserver.observe(this._container);

			};

			/** MULTISELCTIONS */

			ENOXCollectionToolBarV2.prototype._renderMultiselection = function(
					) {
				var that = this;

				this.currentNbitems = this._options.currentNbitems ? this._options.currentNbitems
						: 0;
				this.currentNbSelections = this._options.currentNbSelections ? this._options.currentNbSelections
						: 0;

				// <!> We cannot have the checkBox without the text <!>
				// Text ItemCount
				if (this._options.showItemCount) {
					// CheckBox Multiple
					if (this._options.withmultisel) {
						UWA.extendElement(this._multiSelectContainer);
						this._selectionToggler = new Toggle({
							type : 'checkbox',
							allowUnsafeHTMLLabel : false,
							value : 'chechBoxItem'
						}).inject(this._multiSelectContainer);
						this._selectionToggler
								.addEventListener(
										'buttonclick',
										function() {
											that._selectionToggler.checkFlag ? that._modelEvents
													.publish({
														event : 'enox-collection-toolbar-all-selected'
													})
													: that._modelEvents
															.publish({
																event : 'enox-collection-toolbar-all-unselected'
															});
										});

					}
					if (this.currentNbitems !== 1) {
						this._itemCountContainer.innerHTML = this.currentNbitems
								+ " " + this._options.itemsName;
						this._itemCountContainer.title = this.currentNbitems
								+ " " + this._options.itemsName;
					} else {
						this._itemCountContainer.innerHTML = this.currentNbitems
								+ " " + this._options.itemName;
						this._itemCountContainer.title = this.currentNbitems
								+ " " + this._options.itemName;
					}
				}

				// IconBar Multiple
				if (this._multiselectionActions) {
					this._multiselectionActive = this._options.multiselactive ? this._options.multiselactive
							: false;
					var itemsMultipleActionBar = [];
					for (var i = 0; i < this._multiselectionActions.length; i++) {
						itemsMultipleActionBar.push({
							id : this._multiselectionActions[i].id,
							text : this._multiselectionActions[i].text,
							fonticon : this._multiselectionActions[i].fonticon,
							handler : this._multiselectionActions[i].handler,
							disabled : this._multiselectionActions[i].disabled
						});


					}
					var contentMultipleActionBar = {
						type : 'dropdownmenu',
						options : {
							items : itemsMultipleActionBar,
							responsiveMode : true
						/*
						 * events : { onClick : function(e, item) {
						 * console.log('malin') } }
						 */

						}
					};

					var iconMultipleActionBar = {
						className : 'enox-collection-toolbar-multiselect-icon',
						id : 'iconMultipleActionBar',
						customToHideDropDown : true,
						fonticon : 'select-on',
						selected : this._multiselectionActive,
						text : nls_ENOXCollectionToolBarV2.Multiselection_Tooltip,
						disabled : false,
						handler : function(e, i) {
							that._lastEvent = e;
							that._handlerMultiselection(e, i);
						},
						content : contentMultipleActionBar
					};
					this._actionsIconBar.addItem(iconMultipleActionBar);
          // this._actionIconBar.addItem()
					if(this._options.useWebUITooltip) this._setWebUXTooltipOnIcon(iconMultipleActionBar.id, {title : iconMultipleActionBar.text});

					// Variable containing the element of the multiSelAction
					this._multiSelElement = this._actionsIconBar.getItem('iconMultipleActionBar').elements.container;
        //  console.log("items ----------------",this._actionsIconBar.getItem('iconMultipleActionBar'));
					this.actionBar_displayContent = this._actionsIconBar.displayContent;
					// Patch to overwrite the displayContent of the iconBar
					this._actionsIconBar.displayContent = function(
							currentComponent) {
						if (currentComponent.id === 'iconMultipleActionBar') {
							if (that._lastEvent) {
								switch (that._lastEvent.target.id) {
								case 'select-on-multi-action':
									return;
								case 'down-chevron-multi-action':
									currentComponent.elements.container = that._lastEvent.target;
									break;
								case '':
									break;
								default:
								}
							}
						}
						that.actionBar_displayContent.apply(this, arguments);
					};

					// Code to manage the 'sub' number of the
					// iconMultipleActionBar
					// Get the iconMultipleActionBar
					this._multiActionIcon = this._container
							.querySelector('#iconMultipleActionBar');
					// Set the id on the icon of multiselect
					this._multiActionIcon.getChildren()[0].setAttribute('id',
							'select-on-multi-action');
					/*
					 * this._multiActionIcon.getChildren()[0].addEventListener("mousedown",
					 * function(event){ console.log('test')
					 * event.stopImmediatePropagation(); return false; })
					 */
					// Create a html <sub> in the iconMultipleActionBar (whom
					// manage the number of selection made)
					var subMultiActionIcon = document.createElement("sub");
					subMultiActionIcon.setAttribute('class',
							'enox-collection-toolbar-multiselect-count');
					this.numberOfSelection = document.createTextNode('');
					this._updateIconMultiselectNumber(this.currentNbSelections);

					subMultiActionIcon.appendChild(this.numberOfSelection);
					this._multiActionIcon.appendChild(subMultiActionIcon);
					// End code to manage the sub number of the
					// iconMultipleActionBar

					// Create a html <span> in the iconMultipleActionBar (whom
					// show the down arrow)
					var iconDownArrowMultiActionIcon = document
							.createElement("span");
					iconDownArrowMultiActionIcon.setAttribute('class',
							'fonticon fonticon-chevron-down');
					iconDownArrowMultiActionIcon.setAttribute('id',
							'down-chevron-multi-action');
					this._multiActionIcon
							.appendChild(iconDownArrowMultiActionIcon);
					iconDownArrowMultiActionIcon.style.paddingLeft = "8px";
					// End code to manage iconMultipleActionBar of the
					// iconMultipleActionBar

					// Remove a issue css when iconSortActionBar go in the
					// reponsive menu
					this._actionsIconBar.overflowMenu
							.getItem('iconMultipleActionBar').elements.container.classList
							.remove('enox-collection-toolbar-multiselect-icon');

					if( !this._options.withStableActions && ( ( this._options.actions && this._options.actions.length > 0) ||
              (this._options.views && this._options.views.length > 0 ) ||
              (this._options.sort && this._options.sort.length > 0) )
          ){
            this._actionsIconBar.addItem({
  						className : 'divider',
  						id : 'divider-multiselect'
  					});
          }

				} //for multiselection
        /*
					 * else if (this._options.multiselActionCallback &&
					 * this._multiselectionWrapperContainer) {
					 * that._multiselectionOptions .addEventListener("click",
					 * function() {
					 * that._options.multiselActionCallback.call(null,
					 * that._multiselectionWrapperContainer); }); }
					 */

			};

			ENOXCollectionToolBarV2.prototype._handlerMultiselection = function(
					event, i) {
				var source = event.target.id;
				switch (source) {
				case 'select-on-multi-action':
					this._setMultiselectionActive(!this._multiselectionActive);
					this._modelEvents
							.publish({
								event : 'enox-collection-toolbar-click-multiselect-icon',
								data : {
									object : i,
									active : this._multiselectionActive
								}
							});
					break;
				case 'down-chevron-multi-action':
					this._modelEvents
						.publish({
							event : 'enox-collection-toolbar-click-multiselect-icon',
							data : {
								object : i
							}
						});
        	break;
				default:
         break;
				}
			};

			/**
			 * SEARCH
			 */

			ENOXCollectionToolBarV2.prototype._renderSearch = function() {
				var that = this;
				if (this._options.filter ) {
					// Icon Search
          var iconBar = this._options.withStableActions ? this._actionsFixedIconBar: this._actionsIconBar;

				      iconBar
							.addItem({
								id : 'enox-search',
								fonticon : 'search',
								text : nls_ENOXCollectionToolBarV2.Search_Tooltip,
								handler : function(e, i) {
									that._modelEvents
											.publish({
												event : 'enox-collection-toolbar-click-filter-search',
												data : i
											});
								}
							});



          	if(this._options.useWebUITooltip) this._setWebUXTooltipOnIcon('enox-search', {title : nls_ENOXCollectionToolBarV2.Search_Tooltip});
            if(!this._options.withStableActions &&
                ( ( this._options.multiselActions && this._options.multiselActions.length > 0) ||
                    ( this._options.actions && this._options.actions.length > 0) ||
                    (this._options.views && this._options.views.length > 0 ) ||
                    (this._options.sort && this._options.sort.length > 0)
                )){
                  this._actionsIconBar.addItem({
                    className : 'divider'
                  });
                }

					// Filter (SearchComponent) input
					var filterOptions = this._options.filter;
					this.filterWidth = this._options.filter.width ? this._options.filter.width
							: 400;
					// Variable to manage the resize of the filter (resize
					// function)
					this.resizeFilter = false;
					this._searchComponent = new ENOXViewFilter(filterOptions);
					this._searchComponent._modelEvents
							.subscribe(
									{
										event : 'enox-basic-filter-search-value'
									},
									function(data) {
										that._modelEvents
												.publish({
													event : 'enox-collection-toolbar-filter-search-value',
													data : data
												});
									});
					this.filter = UWA
							.extendElement(this._searchComponent._autocomplteWrapper);
					this._searchComponent.inject(this._filterContainer);
					this._searchComponent._container.style.display = 'none';

					// This loop is for removing every node how is not a real
					// element in the dom (like text)
          if(this._options.withStableActions){
					for (var t = 0; t < this._actionsFixedContainer.childNodes.length; t++) {
						if (this._actionsFixedContainer.childNodes[t].nodeType !== Node.ELEMENT_NODE) {
							this._actionsFixedContainer
									.removeChild(this._actionsFixedContainer.childNodes[t]);
						}
					}
				}else{
          for (var t = 0; t < this._rightMenuContainer.childNodes.length; t++) {
						if (this._rightMenuContainer.childNodes[t].nodeType !== Node.ELEMENT_NODE) {
							this._rightMenuContainer
									.removeChild(this._rightMenuContainer.childNodes[t]);
						}
					}
        }
      }
		};

			// Method Click on the Search Icon
			ENOXCollectionToolBarV2.prototype._clickSearch = function(show) {
				var filter = this._searchComponent._container;
				if (filter) {
          this._resize();//for calculating the position of the filter before showing
					if (show) {
						filter.style.display = 'inline-block';
						// Get the search icon in the toolbar
						var item =  this._actionsIconBar.getItem('enox-search')?this._actionsIconBar.getItem('enox-search'):this._actionsFixedIconBar.getItem('enox-search');
						// Add css on the icon (blue selected)
						item.elements.container
								.addClassName('enox-collection-toolbar-filter-activated');
						// Focus on the filter (not sure the function
						// _updateInnerInputFocus work)
						this._searchComponent.searchTextBox
								._updateInnerInputFocus(0);
						// IR-758859-3DEXPERIENCER2021x
						this._searchComponent.searchTextBox.elements.input
								.focus();
					} else {
						filter.style.display = (filter.style.display === 'none') ? 'inline-block'
								: 'none';
						if (filter.style.display !== 'none') {//now visible
							// Get the search icon in the toolbar
							var item = this._actionsIconBar.getItem('enox-search')? this._actionsIconBar.getItem('enox-search') : this._actionsFixedIconBar
									.getItem('enox-search');
							// Add css on the icon (blue selected)

							item.elements.container
									.addClassName('enox-collection-toolbar-filter-activated');
							this.resizeFilter = false;
							// Focus on the filter (not sure the function
							// _updateInnerInputFocus work)
							this._searchComponent.searchTextBox
									._updateInnerInputFocus(0);
							// IR-758859-3DEXPERIENCER2021x
							this._searchComponent.searchTextBox.elements.input
									.focus();
							// that._searchComponent.searchTextBox.elements.input.focus();
						} else {//now not visible
							// Get the search icon in the toolbar
							var item = this._actionsIconBar.getItem('enox-search')? this._actionsIconBar.getItem('enox-search') : this._actionsFixedIconBar
									.getItem('enox-search');
							if (item.elements.container
									.hasClassName("enox-collection-toolbar-filter-activated")) {
								item.elements.container
										.removeClassName("enox-collection-toolbar-filter-activated");

							}
							// Reset the height of the toolbar
							this._container.style.height = '53px';
							this._searchComponent._modelEvents.publish({
								event : 'enox-basic-filter-reset-search'
							});
						}
					}
          //console.log("clickSearch");
					this._resize();//for setting the height of the toolbar

				}
			};

			ENOXCollectionToolBarV2.prototype.setSearchText = function(input) {
				if (this._searchComponent) {
					this._searchComponent.setText(input);
					this._clickSearch(true)
				}
			};

			/**
			 * OTHER ACTIONS
			 */

			// Parameter :
			// Object
			// {id : '' , text : '' , fonticon : '', ()}
			ENOXCollectionToolBarV2.prototype._renderOtherActions = function(flag=false) {
				var actions = !flag ? this._options.actions : this._options.stableActions ;
        var className = '';
				// IconAction Customize
				if (actions && actions.length > 0) {

					this._wrapperContent = [];
					for (var i = 0; i < actions.length; i++) {

						var that = this;
						var action = actions[i];
						actions[i].disabled = actions[i].disabled || false;
						var contentItems = actions[i].content || [];
						var content;
						// Test if the content have many action
						if (contentItems.length > 0) {
							var itemSubAction = [];
							for (var t = 0; t < contentItems.length; t++) {
								var item = contentItems[t];
								item.parent = actions[i].id;
								// Add the event
								// enox-collection-toolbar-action-activated for
								// every item
								if (item.handler) {
									var handlerUser = item.handler
									var handleAction = function(e, i) {
										that._publishEventItemOtherAction(this)
										// Fire the user custom event
										if (this.handlerUser) {
											this.handlerUser(e, this);
										}
									}.bind(item);
									// console.log(item.handler)
									item.handlerUser = handlerUser;
									item.handler = handleAction;
									// for sub-items
									if (item.items) {
										item.items
												.forEach(function(sub_item) {
													if (!sub_item.handler) {
														sub_item.handler = handlerUser;
													}
													var subHandlerUser = sub_item.handler;
													var handleSubAction = function(
															e, i) {
														that
																._publishEventItemOtherAction(this)
														if (this.subHandlerUser) {
															this
																	.subHandlerUser(
																			e,
																			this);
														}
													}.bind(sub_item);
													sub_item.subHandlerUser = subHandlerUser;
													sub_item.handler = handleSubAction;
												});
									}
								} else {
									item.handler = function(e, i) {
										that._publishEventItemOtherAction(this)
									}.bind(item);
								}

                itemSubAction.push(item);

							}
							content = {
								type : action.type ? action.type
										: 'dropdownmenu',
								options : {
									items : itemSubAction,
									responsiveMode : true,
									multiSelect : actions[i].multiSelect ? actions[i].multiSelect
											: false
								}
							}
							this._wrapperContent[actions[i].id] = content;
							className = actions[i].className ? actions[i].className
									: '';
              var addItemObj = {
                className : className,
                id : actions[i].id,
                fonticon : actions[i].fonticon,
                text : actions[i].text,
                disabled : actions[i].disabled,
                content : this._wrapperContent[actions[i].id],
                // handler : handleAction
                selected : actions[i].selected ? actions[i].selected
                    : false,
                allowSelectRetain : actions[i].allowSelectRetain
              }

							!flag ? this._actionsIconBar
									      .addItem(addItemObj)       :
                      this._actionsFixedIconBar
                        .addItem(addItemObj);
                      //  iconBar.addItem(addItemObj);

              			if(this._options.useWebUITooltip) this._setWebUXTooltipOnIcon(actions[i].id, {title : actions[i].text, loadHelpRsc : actions[i].loadHelpRsc});

						} else {
							// Add the event
							// enox-collection-toolbar-action-activated
							// on the item
							var handleAction = function(e, i) {
								console
										.log('Publish event : enox-collection-toolbar-action-activated'
												+ ' id : ' + this.id)
								that._modelEvents
										.publish({
											event : 'enox-collection-toolbar-action-activated',
											data : this.id
										});
								// Fire the user custom event
								if (this.handler) {
									this.handler(e, this, i);
								}
							}.bind(action);
              className = actions[i].className ? actions[i].className
                  : '';

              var addItemObj = {
                className : className,
                id : actions[i].id,
                fonticon : actions[i].fonticon,
                text : actions[i].text,
                handler : handleAction,
                selected : actions[i].selected ? actions[i].selected : false,
                allowSelectRetain : actions[i].allowSelectRetain,
                disabled : actions[i].disabled
              }
              !flag ?   this._actionsIconBar
									         .addItem(addItemObj)
                    :
                        this._actionsFixedIconBar
                           .addItem(addItemObj);
              //  iconBar.addItem(addItemObj);
              if(this._options.useWebUITooltip) this._setWebUXTooltipOnIcon(actions[i].id, {title : actions[i].text,loadHelpRsc : actions[i].loadHelpRsc});
						}
					}

          var that = this;

          //for showing selected icon from the overflowMenuTrigger
          //if(flag){
              this._actionsIconBar.overflowMenuTrigger.addEventListener(
                  'click' , function(){
                    setTimeout(function(){
                    var elements = document.querySelectorAll('.dropdown-menu-icons .item');
                    elements.forEach((item)=>{

                        var icon = that._actionsIconBar.getItem(item.id);
                        //UWA.log(icon);
                        // if(item.hasClassName == 'selected'){
                        //   item.addClassName('selected');
                        // }
                        if(icon.selected){
                          item.addClassName('selected selectable');
                          // UWA.log(item.className)
                          item.addEventListener('click',function(){
                            icon.selected = false ;
                            item.removeClassName('selected');//from overflowMenu
                            icon.elements.container.removeClassName('enox-collection-toolbar-filter-activated');//from iconBar view
                          })
                        }
                        else{
                          item.removeClassName('selected');
                        }
                    });

                    //this._actionIconBar.

                  })
              });
            //}

					if (!this._options.withStableActions && ((this._options.views && this._options.views.length > 0 ) || (this._options.sort && this._options.sort.length > 0))) {
						this._actionsIconBar.addItem({
							className : 'divider'
						});
					}

				}
			};

			// Event Publish for the action (create by the user with the id
			// giving)
			// enox-collection-toolbar-action-activated
			ENOXCollectionToolBarV2.prototype._publishEventItemOtherAction = function(
					item) {
				console
						.log('Publish event : enox-collection-toolbar-action-activated'
								+ ' id : ' + item.id)
				// Change the Icon on the toolbar
				if (item.changeIconSelection) {
					this.changeIcon(item.parent, item.fonticon, item.text)
				}
				this._modelEvents.publish({
					event : 'enox-collection-toolbar-action-activated',
					data : item.id
				});
			};

			/**
			 * VIEWS
			 */

			ENOXCollectionToolBarV2.prototype._renderViews = function() {

				var views = this._options.views;

				if (views && views.length > 0) {
					var that = this, currentView;
					// Set the currentView
					currentView = this._find(views, this._options.currentView);
					this._currentViewId = currentView.id;
					this._currentViewFontIcon = currentView.fonticon;
					this._currentViewText = currentView.text;
					var itemsViewsActionBar = [];
					// Add every views in the dropdownmenu
					for (var i = 0; i < views.length; i++) {
						var view = views[i];
						// Add the event
						// enox-collection-toolbar-switch-view-activated for
						// every items
						var handleViews = function(e, i) {
							// Change the icon view
							var iconContainer = that._iconViewsActionBarContainer
									.getChildren()[0];
							// Remove the icon (class)
							iconContainer.removeAttribute('class');
							// Add the new icon (class)
							that._currentViewId = this.id;
							that._currentViewFontIcon = this.fonticon;
							that._currentViewText = this.text;
							iconContainer.setAttribute('class',
									'fonticon fonticon-' + this.fonticon);
							that._setTextTooltipIcon('iconViewsActionBar',
									this.text, this.loadHelpRsc);
							console
									.log('Publish event : enox-collection-toolbar-switch-view-activated'
											+ 'id : ' + this.id)
							that._modelEvents
									.publish({
										event : 'enox-collection-toolbar-switch-view-activated',
										data : this.id
									});
							// Fire the user custom event
							if (this.handler) {
								this.handler(e, this)
							}
						}.bind(view);
						itemsViewsActionBar
								.push({
									id : views[i].id,
									title : views[i].text,
									text : views[i].text,
									description : views[i].text,
									fonticon : views[i].fonticon,
									handler : handleViews,
									selectable : views[i].selectable ? views[i].selectable
											: true,
									selected : views[i].id === currentView.id

								});
					}

					var contentViewsActionBar = {
						type : 'dropdownmenu',
						options : {
							responsiveMode : true,
							items : itemsViewsActionBar
						}
					}

					var iconViewsActionBar = {
						id : 'iconViewsActionBar',
						fonticon : currentView.fonticon,
						text : currentView.text,
						disabled : currentView.disabled ? currentView.disabled
								: false,
						content : contentViewsActionBar
					}

          var iconBar = this._options.withStableActions ? this._actionsFixedIconBar : this._actionsIconBar;
					if (views.length > 1) {
            iconBar.addItem(iconViewsActionBar);
						if(this._options.useWebUITooltip) this._setWebUXTooltipOnIcon(iconViewsActionBar.id, {title : iconViewsActionBar.text, loadHelpRsc : currentView.loadHelpRsc});
					}

					// Variable to get the IconViewsBarContainer
					this._iconViewsActionBarContainer = this._container
							.querySelector('#iconViewsActionBar');

              //this._options.withStableActions ? '' :
					var elementView =  iconBar
							.getItem('iconViewsActionBar'); //get the IconBar dropdown
					if (elementView && elementView.elements.container) {
						elementView.elements.container
								.addEventListener(
										'click',
										function() {
											setTimeout(function() {
												var dropDownViews = document
														.querySelectorAll('.dropdown-menu-icons .iconViewsActionBar ');
												if (dropDownViews
														&& dropDownViews.length > 0) {
													dropDownViews
															.forEach(function(
																	view) {
																if (view.id === that._currentViewId) {
																	if (!view
																			.hasClassName('selected')) {
																		view
																				.addClassName('selected')
																	}
																} else {
																	if (view
																			.hasClassName('selected')) {
																		view
																				.removeClassName('selected')
																	}
																}
															});
												}
											});
										});
					}


          if(!this._options.withStableActions)
              this._actionsIconBar.overflowMenuTrigger
							.addEventListener(
									"click",
									function() {
										if (that._actionsIconBar.overflowMenu
												.getItem('iconViewsActionBar')) {
											if (that._actionsIconBar.overflowMenu
													.getItem('iconViewsActionBar')) {
												that._actionsIconBar.overflowMenu
														.getItem('iconViewsActionBar').elements.icon.className = "fonticon fonticon-"
														+ that._currentViewFontIcon;
												var openViews = document
														.querySelector('.iconViewsActionBar .fonticon-right-open');
												if (openViews) {
													openViews
															.addEventListener(
																	'click',
																	function() {
																		setTimeout(function() {
																			var dropdown = document
																					.querySelector('.menu-iconViewsActionBar');
																			if (dropdown) {
																				if (dropdown
																						.querySelector('.item-back')) {
																					var children = dropdown
																							.querySelector(
																									'.item-back')
																							.getChildren();
																					if (children
																							&& children.length == 2) {
																						if (children[1]) {
																							children[1].innerText = that._currentViewText;
																						}
																					}
																				}
																				if (dropdown
																						.querySelector('#'
																								+ that._currentViewId)) {
																					var viewsElemt = dropdown
																							.querySelectorAll('.iconViewsActionBar');
																					if (viewsElemt
																							&& viewsElemt.length > 0) {
																						viewsElemt
																								.forEach(function(
																										view) {
																									if (view.id === that._currentViewId) {
																										if (!view
																												.hasClassName('selected')) {
																											view
																													.addClassName('selected')
																										}
																									} else {
																										if (view
																												.hasClassName('selected')) {
																											view
																													.removeClassName('selected')
																										}
																									}
																								});
																					}
																				}
																			}
																		});
																	});
												}
											}
										}
									})




				}
			};

			/*
			 * SORT
			 */
			ENOXCollectionToolBarV2.prototype._renderSort = function() {
				var sortOptions = this._options.sort;
				var that = this;
				if (sortOptions && sortOptions.length > 0) {
					this._asc = 'ASC';
					this._desc = 'DESC';
					var itemsSortActionBar = [];
					var nameCurrentTitle;
					for (var i = 0; i < sortOptions.length; i++) {
						var selectFirstMenu = false;
						// var subItemsSortActionBar = [
						// 		{
						// 			id : sortOptions[i].id + '-ASC',
						// 			fonticon : sortOptions[i].type === 'integer' ? 'sort-num-asc'
						// 					: 'sort-alpha-asc',
						// 			text : nls_ENOXCollectionToolBarV2.Ascend,
						// 			selectable : true,
						// 			selected : this._options.currentSort && this._options.currentSort.id === sortOptions[i].id
						// 					&& this._options.currentSort.order == 'ASC',
            //
						// 			handler : function(e) {
						// 				that._handlerSort(this, that._asc);
						// 			}.bind(sortOptions[i])
						// 		},
						// 		{
						// 			id : sortOptions[i].id + '-DESC',
						// 			fonticon : sortOptions[i].type === 'integer' ? 'sort-num-desc'
						// 					: 'sort-alpha-desc',
						// 			text : nls_ENOXCollectionToolBarV2.Descend,
						// 			selectable : true,
						// 			selected : this._options.currentSort && this._options.currentSort.id === sortOptions[i].id
						// 					&& this._options.currentSort.order == 'DESC',
						// 			handler : function(e) {
						// 				that._handlerSort(this, that._desc)
						// 			}.bind(sortOptions[i])
						// 		} ];
						if (this._options.currentSort
								&& this._options.currentSort.id === sortOptions[i].id) {
							nameCurrentTitle = sortOptions[i].text;
							selectFirstMenu = true;
						}
						itemsSortActionBar.push({
							id : sortOptions[i].id,
							text : sortOptions[i].text,
							fonticon : sortOptions[i].fonticon,
							handler : function(e) {
								that._handlerSort(this, '');
							}.bind(sortOptions[i]),
						//	handler : sortOptions[i].handler,
							// items : subItemsSortActionBar,
							selectable : true,
							selected : selectFirstMenu
						})

						}
					//Clear Sort button enablement
					if(this._options.withClearSort === true) {
						let clearSortOptions = this._options.clearSort ? this._options.clearSort : undefined;
						itemsSortActionBar.push({
							id : clearSortOptions && clearSortOptions.id ? clearSortOptions.id : "clearSort",
							text : clearSortOptions && clearSortOptions.title? clearSortOptions.title : nls_ENOXCollectionToolBarV2.Clear,	//add this in NLS of the collectiontoolbar
							fonticon : clearSortOptions && clearSortOptions.fonticon ? clearSortOptions.fonticon : "fonticon-reset",
							handler : clearSortOptions && clearSortOptions.handler ?  clearSortOptions.handler : function(e) {
								that._resetSort();
							}
						});
					}
					var contentSortActionBar = {
						type : 'dropdownmenu',
						options : {
							items : itemsSortActionBar
						}
					}

					var iconSortActionBar = {
						id : 'iconSortActionBar',
						fonticon : 'fonticon fonticon-sorting',
						disabled : false,
						text : this._options.currentSort ? nls_ENOXCollectionToolBarV2.sortBy
								+ nameCurrentTitle
								: nls_ENOXCollectionToolBarV2.sort,
						content : contentSortActionBar
					}

          var iconBar = !this._options.withStableActions ? this._actionsIconBar : this._actionsFixedIconBar;
          iconBar.addItem(iconSortActionBar);
/*--------------------------------------------------------------------------------------------------------------------------*/


            let sort = iconBar.getItem('iconSortActionBar');
            var that = this;
            sort.elements.container.addEventListener('click',function(e){
              setTimeout(function(){
                let activeSort ;
                // load the asc & desc icons
                    let sortDropdown = document.querySelectorAll('.iconSortActionBar');
                    for(var i = 0; i < sort.content.options.items.length ; i++){
                      let id = sortDropdown[i].id;
                    	var _sortRow =UWA.clone( that._container.querySelector(`[id=`+`'enox-collection-toolbar-sort-item-` + id +`']`) );
                    	if(_sortRow && sortDropdown[i].children.length <2){
                        that._addSorttooltip(_sortRow,id,sortDropdown[i].children[0].innerText);
                        _sortRow.style.display = '';
                    		sortDropdown[i].appendChild(_sortRow);
                        if(that._options.currentSort && that._options.currentSort.id && id == that._options.currentSort.id){
                          if(that._options.currentSort.order =='ASC'){
                            activeSort = _sortRow.children[0];
                          }else{
                            activeSort = _sortRow.children[1];
                          }
                        }
                    }else{
                      _sortRow = null;
                    }
                  }

                  if(activeSort){
                  //activeSort.className += ' active-sort-icon';
                  activeSort.classList.add('active-sort-icon');
                  }
              },100);
            })
/*-------------------------------------------------------------------------------------------------------------------------------------*/
          if(this._options.useWebUITooltip) this._setWebUXTooltipOnIcon(iconSortActionBar.id, {title : iconSortActionBar.text});

					// Variable to get the IconViewsBarContainer
					this._sortBase = this._container
							.querySelector('#iconSortActionBar');

					// This event on the 3 dot menu is for avoid a issue css on
					// the icon multiselect in the responsive mode
          //if( !this._options.withStableActions)
            this._actionsIconBar.overflowMenuTrigger
							.addEventListener(
									"click",
									function() {
										if (that._actionsIconBar.overflowMenu
												.getItem('iconMultipleActionBar')) {
											that._actionsIconBar.overflowMenu
													.getItem('iconMultipleActionBar').elements.container.classList
													.remove('enox-collection-toolbar-multiselect-icon');
										}
									});


//------------------------ insert icon in the overflow dropdown menu of sort------------------------------------------------------//
                  var pos = 0,menus = this._actionsIconBar.overflowMenu.menus;
                  for(let j=0 ;j<menus.length ; j++){
                    if(menus[j].elements.container.className.includes('menu-iconSortActionBar')){
                      pos = j;
                      let activeSort,activeSortIcon;
                      console.log('insert the icons in it')
                       let sortDropdown = menus[j].elements.container.querySelectorAll('.iconSortActionBar');
                             for(var i = 0; i < sortDropdown.length ; i++){
                               let id = sortDropdown[i].id;
                               var _sortRow = UWA.clone( that._container.querySelector(`[id=`+`'enox-collection-toolbar-sort-item-` + id +`']`) );
                               if(_sortRow && sortDropdown[i].children.length<2){
                                   that._addSorttooltip(_sortRow,id,sortDropdown[i].children[0].innerText);
                                 _sortRow.style.display = '';
                                 sortDropdown[i].appendChild(_sortRow);
                                 if(that._options.currentSort && that._options.currentSort.id && id == that._options.currentSort.id){
                                   activeSort = sortDropdown[i];
                                   if(that._options.currentSort.order =='ASC'){
                                     activeSortIcon = _sortRow.children[0];
                                   }else{
                                     activeSortIcon = _sortRow.children[1];
                                   }
                                 }
                               }else{
                                 _sortRow = null;
                               }
                             }

                             if(activeSortIcon){
                               // activeSortIcon.addClassName('active-sort-icon');
                               activeSortIcon.classList.add('active-sort-icon');
                               //activeSort.addClassName('selected');
                               activeSort.classList.add('selected');
                             }
                    }
                  }

          let sortOverflow =   this._actionsIconBar.overflowMenu.getItem('iconSortActionBar');

          if(sortOverflow){
                sortOverflow.elements.container.addEventListener('mouseover',function(){setTimeout(function(){
                  let clearSortLast = 0;
                  if(that._options.withClearSort) clearSortLast = 1;
                  let sortArr = menus[pos].elements.container.firstChild.children;
                  for(let i=0;i<sortArr.length - clearSortLast ;i++){
                    if(that._options.currentSort && that._options.currentSort.id && that._options.currentSort.order && that._options.currentSort.id == sortArr[i].id){
                      sortArr[i].addClassName('selected');
                      let sortChildren = sortArr[i].getChildren()[1].children;
                      if(sortChildren[0].classList.contains('order-'+that._options.currentSort.order.toLowerCase())){
                        sortChildren[0].classList.add('active-sort-icon');
                        sortChildren[1].classList.remove('active-sort-icon');
                      }else{
                        sortChildren[1].classList.add('active-sort-icon');
                        sortChildren[0].classList.remove('active-sort-icon')
                      }
                    }else{
                      sortArr[i].removeClassName('selected');
                    }
                  }
                },100)

               })
          }
          this._activateCurrentSort(this._options.currentSort);
				}
			};

      ENOXCollectionToolBarV2.prototype._addSorttooltip = function(_sortRow,id,text){
        let that = this;

            let dateA = nls_ENOXCollectionToolBarV2.dateASC,dateD = nls_ENOXCollectionToolBarV2.dateDESC ;
            let intA = nls_ENOXCollectionToolBarV2.integerASC, intD = nls_ENOXCollectionToolBarV2.integerDESC;
            let strA = nls_ENOXCollectionToolBarV2.stringASC, strD = nls_ENOXCollectionToolBarV2.stringDESC;
            let ascTitle, descTitle,type;

            if(_sortRow.children[0].className.includes('date-sorting')) {
              ascTitle = dateA;
              descTitle = dateD;
              type='date'
            }else if(_sortRow.children[0].className.includes('num')){
              ascTitle = intA;
              descTitle= intD;
              type = 'integer'
            }else if(_sortRow.children[0].className.includes('alpha')){
              ascTitle = strA;
              descTitle = strD;
              type='string'
            }
        if(that._options.useWebUITooltip) {
          _sortRow.children[0].tooltipInfos = new WUXTooltipModel({title:ascTitle})
          _sortRow.children[1].tooltipInfos = new WUXTooltipModel({title:descTitle})
        }else{
          _sortRow.children[0].tooltipInfos = new Tooltip({target:_sortRow.children[0],body : ascTitle});
          _sortRow.children[1].tooltipInfos = new Tooltip({target : _sortRow.children[1],body : descTitle});
        }


//--------------------click listener for the icons -------------------------//
        _sortRow.children[0].addEventListener('click',function(e){
          e.stopImmediatePropagation();
          that._handlerSort({id:id ,text:text ,type:type },that._asc);
        });
        _sortRow.children[1].addEventListener('click',function(e){
          e.stopImmediatePropagation();
          that._handlerSort({id:id ,text:text ,type:type },that._desc);
        })
      }

			// Method to handle the sort event
			ENOXCollectionToolBarV2.prototype._handlerSort = function(attribut,
					order) {
            //order is passed undefined for first selection
            order = order ? order.toUpperCase() : 'ASC';

				if (this._options.currentSort == undefined) {
					this._options.currentSort = {};
				}

				if (order.length === 0) {
					order = this._options.currentSort.order;
				} else if (order.length > 0) {
					this._options.currentSort.id = attribut.id;
					this._options.currentSort.order = order;

				}
				var that = this;

				this._setTextTooltipIcon('iconSortActionBar',
						//R14: IR-796546-3DEXPERIENCER2021x set a \n to avoid tooltip too long issue
						(   nls_ENOXCollectionToolBarV2.sortBy
							+ ' ' + attribut.text
							+ ' (' + nls_ENOXCollectionToolBarV2[attribut.type + order] + ')'));
				this._selectSort(attribut.id, order);
				//this._changeIconSort(attribut.type, order);

				console
						.log('Publish event : [enox-collection-toolbar-sort-activated]'
								+ ' order by : ' + attribut.id + ' ' + order)
				that._modelEvents.publish({
					event : 'enox-collection-toolbar-sort-activated',
					data : {
						sortOrder : order,
						sortAttribute : attribut.id
					}
				})

			};

			// Method to change the iconSort <!> Work only for the main menu (no
			// submenu) <!>
			ENOXCollectionToolBarV2.prototype._changeIconSort = function(type,
					order) {

				// icon desktop
				var iconContainer = this._sortBase.getChildren()[0];
				// icon responsive
				var itemOverflowMenu = this._options.withStableActions ?'':this._actionsIconBar.overflowMenu
						.getItem('iconSortActionBar').elements;
				// Remove the icon (class)
				iconContainer.removeAttribute('class');
        order = order ? order : 'ASC';
				if ( itemOverflowMenu && itemOverflowMenu.icon)
					itemOverflowMenu.icon.removeAttribute('class');
				//Add the new icon (class)
				switch (type) {
				case 'integer':
					iconContainer
							.setAttribute('class',
									'fonticon fonticon-sort-num-'
											+ order.toLowerCase());
               if (itemOverflowMenu && itemOverflowMenu.icon)
            		 itemOverflowMenu.icon.setAttribute('class',
            				'fonticon fonticon-sort-num-'
            					+ order.toLowerCase());

					break;
				case 'string':
					iconContainer.setAttribute('class',
							'fonticon fonticon-sort-alpha-'
									+ order.toLowerCase());
          if ( itemOverflowMenu && itemOverflowMenu.icon)
						itemOverflowMenu.icon.setAttribute('class',
							'fonticon fonticon-sort-alpha-'
									+ order.toLowerCase());

					break;
        case 'date':
          let dateOrder = (order.toLowerCase() == 'asc') ? '1-31':'31-1';
          iconContainer.setAttribute('class',
              'fonticon fonticon-date-sorting-'+dateOrder);
          if ( itemOverflowMenu && itemOverflowMenu.icon)
                itemOverflowMenu.icon.setAttribute('class',
                  'fonticon fonticon-date-sorting-'
                      + dateOrder);
				default:
				}

			};

			// Method to select the corresponding sort and make it 'selected'
			ENOXCollectionToolBarV2.prototype._selectSort = function(id, order) {
				// IconBar have 2 dropmenu distinct one for the desktop and the
				// second for responsive mode.
				// And for each subMenu work independently
        let clearSortLast = 0;
        if(this._options.withClearSort){
          clearSortLast = 1;
        }

        // for the first time order is undefined
				order = order ? order.toUpperCase() : 'ASC';
				// Test for the dropmenu desktop of the fixed ActionBar
        var menu = this._actionsIconBar.getItem('iconSortActionBar')?this._actionsIconBar.getItem('iconSortActionBar') :this._actionsFixedIconBar.getItem('iconSortActionBar');
				if (menu) {
					var menuSort = menu.content.component ? menu.content.component.items : menu.content.options.items;
					var firstMenu;
					// unselected all items and select only the current
					for (var i = 0; i < menuSort.length - clearSortLast ; i++) {

          	// The first menu which should be selected
						if (menuSort[i].id === id) {
							firstMenu = menuSort[i];
						}
						if (menuSort[i].id === id + '-' + order) {
							// add the css selected
							if (menuSort[i].elements) {
								menuSort[i].elements.container
										.addClassName('selected')
                    let parentDiv = menuSort[i].elements.container.getChildren()[1];
                    parentDiv.children[0].classList.remove('active-sort-icon');
                    parentDiv.children[1].classList.remove('active-sort-icon');
                if(order == 'ASC'){
                  parentDiv.children[0].classList.add('active-sort-icon');
                }else{
                  parentDiv.children[1].classList.add('active-sort-icon');
                }
              }
							// Set the propertie selected to true
							menuSort[i].selected = true;
						} else {
							// Remove the css selected
							if (menuSort[i].elements) {
								menuSort[i].elements.container
										.removeClassName('selected')
                    let parentDiv = menuSort[i].elements.container.getChildren()[1];
                    parentDiv.children[0].classList.remove('active-sort-icon');
                    parentDiv.children[1].classList.remove('active-sort-icon');
							}

							// Set the propertie selected to false
							menuSort[i].selected = false;
						}
					}
					// Select the parent menu of the subMenu
					firstMenu.selected = true;
					if (firstMenu.elements) {
						firstMenu.elements.container.addClassName('selected');
            let parentDivSortIcon = firstMenu.elements.container.getChildren()[1];
            let activeChild = 0, deactiveChild = 0;
            if (order == 'ASC') {
              activeChild = 0 ;
              deactiveChild = 1;
            } else {
                activeChild = 1;
                deactiveChild = 0;
            }
            parentDivSortIcon.children[activeChild].classList.add('active-sort-icon');
            parentDivSortIcon.children[deactiveChild].classList.remove('active-sort-icon');

					}
				}

				// Test for the dropmenu responsive
				if (!this._options.withStableActions && this._actionsIconBar.overflowMenu) {
					var menuSortOverFlow,menus =  this._actionsIconBar.overflowMenu.menus;
          for(let i=0;i<menus.length ;i++){
            if(menus[i].elements.container.className.includes('menu-iconSortActionBar')){
              menuSortOverFlow = menus[i].items;
            }
          }
          var firstMenuOverFlow;
					// unselected all items and select only the current
					for (var i = 0; i < menuSortOverFlow.length - clearSortLast; i++) {

						// The first menu which should be selected
						if (menuSortOverFlow[i].id === id) {
							firstMenuOverFlow = menuSortOverFlow[i];
						}
						if (menuSortOverFlow[i].id === id + '-' + order) {
							// add the css selected
							if (menuSortOverFlow[i].elements) {
								menuSortOverFlow[i].elements.container
										.addClassName('selected')
                    let parentDiv = menuSortOverFlow[i].elements.container.getChildren()[1];
                    parentDiv.children[0].classList.remove('active-sort-icon');
                    parentDiv.children[1].classList.remove('active-sort-icon');
                    if(order == 'ASC'){
                      parentDiv.children[0].classList.add('active-sort-icon');
                    }else{
                      parentDiv.children[1].classList.add('active-sort-icon');
                    }
							}


							// Set the propertie selected to false
							menuSortOverFlow[i].selected = true;
						} else {
							// Remove the css selected
							if (menuSortOverFlow[i].elements) {
								menuSortOverFlow[i].elements.container
										.removeClassName('selected')
                    let parentDiv = menuSortOverFlow[i].elements.container.getChildren()[1];
                    if(parentDiv && parentDiv.children && parentDiv.children.length >= 2) {
                      parentDiv.children[0].classList.remove('active-sort-icon');
                      parentDiv.children[1].classList.remove('active-sort-icon');
                    }

              }

							// Set the propertie selected to false
							menuSortOverFlow[i].selected = false;
						}
					}
					// Select the parent menu of the subMenu
					firstMenuOverFlow.selected = true;
					if (firstMenuOverFlow.elements) {
						firstMenuOverFlow.elements.container
								.addClassName('selected');
                let parentDivSortIcon = firstMenuOverFlow.elements.container.getChildren()[1];
                let activeChild = 0, deactiveChild = 0;
                if (order == 'ASC') {
                  activeChild = 0 ;
                  deactiveChild = 1;
                } else {
                  activeChild = 1;
                  deactiveChild = 0;
                }
                if(parentDivSortIcon && parentDivSortIcon.children && parentDivSortIcon.children.length >= 2) {
                  parentDivSortIcon.children[activeChild].classList.add('active-sort-icon');
                  parentDivSortIcon.children[deactiveChild].classList.remove('active-sort-icon');
                }
					}
				}

			};

			// Method to reset the sort (work only if the dropdownmenu was
			// created)
			ENOXCollectionToolBarV2.prototype._resetSort = function() {
        let that = this;
        let withClearSort = 0;
        if(that._options.withClearSort){
          withClearSort=1;
        }

				// Test for iconSortMenu in desktop
        let menu= this._actionsIconBar.getItem('iconSortActionBar')? this._actionsIconBar.getItem('iconSortActionBar') : this._actionsFixedIconBar.getItem('iconSortActionBar');
				if (menu.content.component) {//get the div of sortActionBar
					var menuSort = menu.content.component.items;
					for (var i = 0; i < menuSort.length - withClearSort; i++) {
						// Remove the css selected
						menuSort[i].elements.container
								.removeClassName('selected')
            let ascChild = menuSort[i].elements.container.getChildren()[1].children[0];
            let descChild = menuSort[i].elements.container.getChildren()[1].children[1];
            // Set the propertie selected to false
						menuSort[i].selected = false;
            ascChild.classList.remove('active-sort-icon');
            descChild.classList.remove('active-sort-icon');
					}
				}
				// Test for iconSortMenu in responsive
				if (!this._options.withStableActions && this._actionsIconBar.overflowMenu) {
          var menuSortOverFlow,menus =  this._actionsIconBar.overflowMenu.menus;
          for(let i=0;i<menus.length ; i++){
            if(menus[i].elements.container.className.includes('menu-iconSortActionBar')){
              menuSortOverFlow = menus[i].items;
            }
          }
					// Remove all items selected
					for (var i = 0; i < menuSortOverFlow.length- withClearSort; i++) {
						menuSortOverFlow[i].elements.container
								.removeClassName('selected');
						// Set the propertie selected to false
            let ascChild = menuSortOverFlow[i].elements.container.getChildren()[1].children[0];
            let descChild = menuSortOverFlow[i].elements.container.getChildren()[1].children[1];
            // Set the propertie selected to false
						menuSortOverFlow[i].selected = false;
            ascChild.classList.remove('active-sort-icon');
            descChild.classList.remove('active-sort-icon');
					}
				}
//upon clearSort currentSort is also
        that._options.currentSort = {
          id : "",
          order : ""
        }
				console
						.log('Publish event : [enox-collection-toolbar-sort-reset]')
				this._setTextTooltipIcon('iconSortActionBar', nls_ENOXCollectionToolBarV2.sort);
				this._modelEvents.publish({
					event : 'enox-collection-toolbar-sort-reset',
					data : {}
				})
			};

			// Method to change a icon in the toolbar
			// Id : String
			// Fonticon : String
			// TooltipText : String
			ENOXCollectionToolBarV2.prototype.changeIcon = function(id,
					foncticon, tooltiptext) {
				// Get the iconAction in the actionBar
				var itemAction = this._container.querySelector('#' + id);
				if (itemAction) {
					var iconContainer = itemAction.getChildren()[0];
					// Remove the icon (class)
					iconContainer.removeAttribute('class');
					// Add the new icon (class)
					iconContainer.setAttribute('class', 'fonticon fonticon-'
							+ foncticon);
					// Set the tooltip on the icon in the iconbar
					this._setTextTooltipIcon(id, tooltiptext);

					// OverflowMenu
					var itemOverflowMenu = this._actionsIconBar.overflowMenu
							.getItem(id).elements;
					// Remove the icon (class)
          if(itemOverflowMenu && itemOverflowMenu.icon){
					       itemOverflowMenu.icon.removeAttribute('class');
					       itemOverflowMenu.icon.setAttribute('class',
							     'fonticon fonticon-' + foncticon);
				        }
        }
			};


      /**
      * @method _setTextTooltipIcon Set the tooltip of a item in the iconBar
      * @param {String} id id of the icon on wich we want to set the new tooltip content
      * @param {String} text content of the tooltip to set. In case of webUX tootlip, the text matches the title of the tooltip
      * @param {Object} [loadHelpRsc] object for using rsc file to fill the tootlip (only for webUX tooltip). If this option is used, the previous parameter "text" is not taken into account.
      * @param {String} loadHelpRsc.helpResourceFile the name of the help rsc file where there is information about the tooltip
      * @param {String} loadHelpRsc.resourceID the id to find the information about the tooltip in the rsc file
      */
			ENOXCollectionToolBarV2.prototype._setTextTooltipIcon = function(
					id, text, loadHelpRsc=null) {
//console.log(id)


          //for the other actionBar with overflow
          if(!this._options.useWebUITooltip){
            // Menu desktop
    				var item = this._actionsIconBar.getItem(id) ? this._actionsIconBar.getItem(id) : this._actionsFixedIconBar.getItem(id);
    				item.tooltip.getBody().innerText = text;
    				// Menu responsive
    				var itemOverflowMenu = this._actionsIconBar.overflowMenu
    						.getItem(id);
    				if (itemOverflowMenu && text) {
    					// Replace all \br by space to avoid issue display in the submenu (3 dot)
    					var newText = text.replace(/\n/g," ")
    					itemOverflowMenu.elements.content.innerText = newText;
    				}
          }
          else {
            this._setWebUXTooltipOnIcon(id, {title : text, loadHelpRsc : loadHelpRsc});
          }

			}

      /**
      * @method _setWebUXTooltipOnIcon set the content of a WebUX tooltip on a specific icon in the toolbar
      * @param {String} idIcon id of the icon in the toolbar
      * @param {bject} options content to set in the tooltip
      * @param {String} options.title title to set in the tooltip
      * @param {Object} options.loadHelpRsc option to use rsc file to fill the tootlip
      * @param {String} options.loadHelpRsc.helpResourceFile the name of the help rsc file where there is information about the tooltip
      * @param {String} options.loadHelpRsc.resourceID the id to find the information about the tooltip in the rsc file
      */
      ENOXCollectionToolBarV2.prototype._setWebUXTooltipOnIcon=function (idIcon,options){
        // get the icon from the toolbar
        var itemCreated=this._actionsIconBar.getItem(idIcon)? this._actionsIconBar.getItem(idIcon) : this._actionsFixedIconBar.getItem(idIcon);

        var that=this;
        if(itemCreated){
          // clear if previous tooltip created with UIKIT

          if(itemCreated.tooltip){
            itemCreated.tooltip.destroy();
            itemCreated.tooltip=undefined;
          }

          // create the tooltip with WebUI and fill the content with a help xml file
          if(options.loadHelpRsc && options.loadHelpRsc.helpResourceFile && options.loadHelpRsc.resourceID){
            if(!itemCreated.elements.container.tooltipInfos){
              itemCreated.elements.container.tooltipInfos = new WUXTooltipModel({
                mouseRelativePosition: false,
                allowUnsafeHTMLLongHelp : true,
              });
            }
            itemCreated.elements.container.tooltipInfos.loadFromHelpRscFile(options.loadHelpRsc.helpResourceFile, options.loadHelpRsc.resourceID);

            // setTimeout needed because loadFromHelpRscFile is asynchronous, so the property title is not updated right now
            setTimeout(function (){
               if(!itemCreated.text){
                 // set the property text of the item if undefined and rebuild the overflow menu with the new tooltip content set
                 itemCreated.text=itemCreated.elements.container.tooltipInfos.title;
                 that._actionsIconBar.buildOverflowMenu();
               }
               var text=itemCreated.elements.container.tooltipInfos.title;
               // update Menu responsive
               var itemOverflowMenu = that._actionsIconBar.overflowMenu.getItem(idIcon);
               if (itemOverflowMenu && text) {
                 // Replace all \br by space to avoid issue display in the submenu (3 dot)
                 var newText = text.replace(/\n/g," ")
                 itemOverflowMenu.elements.content.innerText = newText;
               }
            },1000);
          }
          else{
            // create the tooltip with WebUI and fill its content with the title given
            if(!itemCreated.elements.container.tooltipInfos){
              itemCreated.elements.container.tooltipInfos = new WUXTooltipModel({
                title: options.title,
                mouseRelativePosition: false,
                allowUnsafeHTMLLongHelp : true,
              });
            }
            else{
              // update the title
              itemCreated.elements.container.tooltipInfos.title=options.title;

              var text=options.title;
              // update Menu responsive
              var itemOverflowMenu = that._actionsIconBar.overflowMenu.getItem(idIcon);
              if (itemOverflowMenu && text) {
                // Replace all \br by space to avoid issue display in the submenu (3 dot)
                var newText = text.replace(/\n/g," ")
                itemOverflowMenu.elements.content.innerText = newText;
              }
            }
          }
        }
      };

			// Set the toolbar at the value (sortBy)
			// Parameter :
			// 1 : {id : "name", order : "order"}
			ENOXCollectionToolBarV2.prototype._activateCurrentSort = function(
					sortBy) {
				if (sortBy) {
					var currentSort = this._find(this._options.sort, sortBy.id);
					this._setTextTooltipIcon('iconSortActionBar',
						//R14: IR-796546-3DEXPERIENCER2021x set a \n to avoid tooltip too long issue
						(   nls_ENOXCollectionToolBarV2.sortBy
							+ ' ' + currentSort.text
							+ ' (' + nls_ENOXCollectionToolBarV2[currentSort.type +sortBy.order.toUpperCase() ] + ')'));
					this._selectSort(currentSort.id, sortBy.order);
				//	this._changeIconSort(currentSort.type, sortBy.order);
				}
			};
      ENOXCollectionToolBarV2.prototype._countContainerVisibility = function(){
          if(!this._countContainer || this._container.offsetWidth == 0) {
            return ;
          }
          let toolbarWidth =  this._rightMenuContainer.offsetWidth + 100;
          if(toolbarWidth > this._container.offsetWidth){
            this._countContainer.style.display = 'none';
          }else{
            this._countContainer.style.display = '';
          }
      }
      // ENOXCollectionToolBarV2.prototype._resizeOtherActions = function(width,total_width,widthToolBar){
      //   var that = this;
      //   total_width = this._container.clientWidth;
			// 	width = total_width - widthToolBar;
      // //  this._hiddenCountContainer;
      //   var px = 0;
      //   this._options.withStableActions ? px = 200 : '';
      //
      //   this._options.withStableActions ? this._countContainerVisibility() : '';
      //   if (width > px) {
      //     //console.log("width greater than 0",width);
      //     if (that.filter) {
      //       //console.log("insideFilter")
      //       that.filter.style.width = this.filterWidth + 'px';
      //       // no need to check the resizeFilter if width is > 0
      //
      //     	if (this.resizeFilter) {
      //       //console.log("insideResizeFilter")
      //         // Set the filter in the same line as the toolbar
      //         //console.log("resizeFilter true")
      //         that.filter.style.position = '';
      //         that.filter.style.top = '';
      //         that.filter.style.left = '';
      //         // Set the toolbar normal height
      //         this._container.style.height = '53px';
      //         // <!><!><!>
      //         // This test is made for reordering the div to avoid
      //         // a gap
      //         // issue between the actionBar and the filter
      //         if(this._options.withStableActions){
      //             for (var i = 0; i < this._actionsFixedContainer.childNodes.length; i++) {
      //               if (this._actionsFixedContainer.childNodes[i] === this._filterContainer) {
      //                 this._actionsFixedContainer
      //                     .removeChild(this._filterContainer);
      //                 this._actionsFixedContainer
      //                     .insertBefore(
      //                         this._filterContainer,
      //                         this._actionsFixedContainer.children[1]);
      //               }
      //             }
      //           }else{
      //             for (var i = 0; i < this._rightMenuContainer.childNodes.length; i++) {
    	// 							if (this._rightMenuContainer.childNodes[i] === this._filterContainer) {
    	// 								this._rightMenuContainer
    	// 										.removeChild(this._filterContainer);
    	// 								this._rightMenuContainer
    	// 										.insertBefore(
    	// 												this._filterContainer,
    	// 												this._rightMenuContainer.children[0]);
    	// 							}
    	// 						}
      //           }
      //         // <!><!><!>
      //         this.resizeFilter = false;
      //     	} //resizeFilter check
      //     }
      //   } else {
      //     //console.log("inside width ", width)
      //     //at the time of loading
      //     if (that.filter) {
      //       that.filter.style.width = total_width + 'px';
      //
      //       if (!this.resizeFilter) {
      //         // Set the filter below the toolbar
      //         //console.log("absolute")
      //
      //         that.filter.style.position = 'absolute';
      //         that.filter.style.top = '48px';
      //         that.filter.style.left = '0px';
      //         // Set the toolbar height due to the filter
      //         if (this._searchComponent._container.style.display !== 'none') {
      //           this._container.style.height = '88px'
      //         }
      //         // <!><!><!>
      //         // This test is made for reordering the div to avoid
      //         // a gap
      //         // issue between the actionBar and the filter
      //         if(this._options.withStableActions){
      //           for (var i = 0; i < this._actionsFixedContainer.childNodes.length; i++) {
      //               if (this._actionsFixedContainer.childNodes[i] === this._filterContainer) {
      //                 this._actionsFixedContainer
      //                     .removeChild(this._filterContainer);
      //                 this._actionsFixedContainer
      //                     .appendChild(this._filterContainer);
      //                 break;
      //               }
      //           }
      //         } else {
      //           for (var i = 0; i < this._rightMenuContainer.childNodes.length; i++) {
  		// 						if (this._rightMenuContainer.childNodes[i] === this._filterContainer) {
  		// 							this._rightMenuContainer
  		// 									.removeChild(this._filterContainer);
  		// 							this._rightMenuContainer
  		// 									.appendChild(this._filterContainer);
  		// 							break;
  		// 						}
  		// 					}
      //         }
      //         // <!><!><!>
      //         this.resizeFilter = true;
      //       }
      //     }
      //   }
      // }

      // ENOXCollectionToolBarV2.prototype._resizeOtherActions = function(width,total_width){
      //   var that = this;
      //   if (width > 0) {
			// 		if (that.filter) {
			// 			that.filter.style.width = this.filterWidth + 'px';
			// 			if (this.resizeFilter) {
			// 				// Set the filter in the same line as the toolbar
			// 				that.filter.style.position = '';
			// 				that.filter.style.top = '';
			// 				that.filter.style.left = '';
			// 				// Set the toolbar normal height
			// 				this._container.style.height = '53px'
			// 				// <!><!><!>
			// 				// This test is made for reordering the div to avoid
			// 				// a gap
			// 				// issue between the actionBar and the filter
			// 				for (var i = 0; i < this._rightMenuContainer.childNodes.length; i++) {
			// 					if (this._rightMenuContainer.childNodes[i] === this._filterContainer) {
			// 						this._rightMenuContainer
			// 								.removeChild(this._filterContainer);
			// 						this._rightMenuContainer
			// 								.insertBefore(
			// 										this._filterContainer,
			// 										this._rightMenuContainer.children[0]);
			// 					}
			// 				}
			// 				// <!><!><!>
			// 				this.resizeFilter = false;
			// 			}
			// 		}
			// 	} else {
			// 		if (that.filter) {
			// 			that.filter.style.width = total_width + 'px';
			// 			if (!this.resizeFilter) {
			// 				// Set the filter below the toolbar
			// 				that.filter.style.position = 'absolute';
			// 				that.filter.style.top = '48px';
			// 				that.filter.style.left = '0px';
			// 				// Set the toolbar height due to the filter
			// 				if (this._searchComponent._container.style.display !== 'none') {
			// 					this._container.style.height = '88px'
			// 				}
			// 				// <!><!><!>
			// 				// This test is made for reordering the div to avoid
			// 				// a gap
			// 				// issue between the actionBar and the filter
			// 				for (var i = 0; i < this._rightMenuContainer.childNodes.length; i++) {
			// 					if (this._rightMenuContainer.childNodes[i] === this._filterContainer) {
			// 						this._rightMenuContainer
			// 								.removeChild(this._filterContainer);
			// 						this._rightMenuContainer
			// 								.appendChild(this._filterContainer);
			// 						break;
			// 					}
			// 				}
			// 				// <!><!><!>
			// 				this.resizeFilter = true;
			// 			}
			// 		}
			// 	}
      // }

			ENOXCollectionToolBarV2.prototype._resize = function() {
				var that = this, width;
			//	var total_width = this._container.offsetWidth;

				// Evaluate the marge
				var widthToolBar = this._actionsContainer.offsetWidth
						+ (this._countContainer ? this._countContainer.offsetWidth
								: 0)
						+ (this._multiSelectContainer ? this._multiSelectContainer.offsetWidth
								: 0) + this.filterWidth + 20;
				//var width = total_width - widthToolBar;
				// console.log('marge width : '+width);

			  //this._options.withStableActions ? this._resizeStableActions(width,total_width,widthToolBar) : this._resizeOtherActions(width,total_width);
        //this._resizeOtherActions(width,total_width,widthToolBar);
        //var that = this;
        var total_width = this._container.clientWidth;
				width = total_width - widthToolBar;
      //  this._hiddenCountContainer;
        var px = 0;
        this._options.withStableActions ? px = 200 : '';

        this._options.withStableActions? this._countContainerVisibility() : '';
        if (width > px) {
          //console.log("width greater than 0",width);
          if (that.filter) {
            //console.log("insideFilter")
            that.filter.style.width = this.filterWidth + 'px';
            // no need to check the resizeFilter if width is > 0

          	if (this.resizeFilter) {
            //console.log("insideResizeFilter")
              // Set the filter in the same line as the toolbar
              //console.log("resizeFilter true")
              that.filter.style.position = '';
              that.filter.style.top = '';
              that.filter.style.left = '';
              // Set the toolbar normal height
              this._container.style.height = '53px';
              // <!><!><!>
              // This test is made for reordering the div to avoid
              // a gap
              // issue between the actionBar and the filter
              if(this._options.withStableActions){
                  for (var i = 0; i < this._actionsFixedContainer.childNodes.length; i++) {
                    if (this._actionsFixedContainer.childNodes[i] === this._filterContainer) {
                      this._actionsFixedContainer
                          .removeChild(this._filterContainer);
                      this._actionsFixedContainer
                          .insertBefore(
                              this._filterContainer,
                              this._actionsFixedContainer.children[1]);
                              break;
                    }
                  }
                }else{
                  for (var i = 0; i < this._rightMenuContainer.childNodes.length; i++) {
    								if (this._rightMenuContainer.childNodes[i] === this._filterContainer) {
    									this._rightMenuContainer
    											.removeChild(this._filterContainer);
    									this._rightMenuContainer
    											.insertBefore(
    													this._filterContainer,
    													this._rightMenuContainer.children[0]);
                              break;
                    }
    							}
                }
              // <!><!><!>
              this.resizeFilter = false;
          	} //resizeFilter check
          }
        } else {
          //console.log("inside width ", width)
          //at the time of loading
          if (that.filter) {
            that.filter.style.width = total_width + 'px';

            if (!this.resizeFilter) {
              // Set the filter below the toolbar
              //console.log("absolute")

              that.filter.style.position = 'absolute';
              that.filter.style.top = '48px';
              that.filter.style.left = '0px';
              // Set the toolbar height due to the filter
              if (this._searchComponent._container.style.display !== 'none') {
                this._container.style.height = '88px'
              }
              // <!><!><!>
              // This test is made for reordering the div to avoid
              // a gap
              // issue between the actionBar and the filter
              if(this._options.withStableActions){
                for (var i = 0; i < this._actionsFixedContainer.childNodes.length; i++) {
                    if (this._actionsFixedContainer.childNodes[i] === this._filterContainer) {
                      this._actionsFixedContainer
                          .removeChild(this._filterContainer);
                      this._actionsFixedContainer
                          .appendChild(this._filterContainer);
                      break;
                    }
                }
              } else {
                for (var i = 0; i < this._rightMenuContainer.childNodes.length; i++) {
  								if (this._rightMenuContainer.childNodes[i] === this._filterContainer) {
  									this._rightMenuContainer
  											.removeChild(this._filterContainer);
  									this._rightMenuContainer
  											.appendChild(this._filterContainer);
  									break;
  								}
  							}
              }
              // <!><!><!>
              this.resizeFilter = true;
            }
          }
        }
				this._actionsIconBar.resize();

				/*
				 * if
				 * (this._actionsIconBar.classList.contains('iconbar-overflow-menu-trigger')) { }
				 */

				this._modelEvents.publish({
					event : 'enox-collection-toolbar-on-toolbar-height-change',
					data : that._container.offsetHeight
				});
			};

			// Method to find a id in a array and set the selected property
			ENOXCollectionToolBarV2.prototype._find = function(array, id) {
				var currentObj;
				array.forEach(function(item) {
					if (item.id === id) {
						item.selected = true;
						currentObj = item;
						return;
					}
				})
				if (!currentObj) {
					currentObj = array[0];
					array[0].selected = true;
				}
				return currentObj;
			};

			// Method to hide checkBoxMultiple
			ENOXCollectionToolBarV2.prototype.setCheckBoxMultiVisibility = function(
					flag) {
				if (flag) {
					this._multiSelectContainer.style.display = '';
				} else {
					this._multiSelectContainer.style.display = 'none';
				}
			};

			// Method to hide text checkBoxMultiple
			ENOXCollectionToolBarV2.prototype.setCheckBoxMultiTextVisibility = function(
					flag) {
				if (flag) {
					this._countContainer.style.display = '';
				} else {
					this._countContainer.style.display = 'none';
				}
			};

			// Method to hide a item in the iconBar
			ENOXCollectionToolBarV2.prototype.setItemBarVisibility = function(
					id, flag) {
				// Get the item in the toolbar
				var item = this._actionsIconBar.getItem(id);

				// Get the item in the menu overflow

				var itemOverflow = this._actionsIconBar.overflowMenu
						.getItem(id)
				if (flag) {
					if (item) {
						item.elements.container.style.display = '';
					}
					if (itemOverflow) {
						itemOverflow.elements.container.style.display = '';
					}
				} else {
					if (item) {
						item.elements.container.style.display = 'none';
					}
					if (itemOverflow) {
						itemOverflow.elements.container.style.display = 'none';
					}
				}


        this._adjustDividerVisibility();

        //UWA.log("itemBarVisibility",id,flag)

				this._resize();
			};

			// Method to disable a action (subMenu) in a menu
			// <!> This method is a customization of the iconBar <!>
			ENOXCollectionToolBarV2.prototype._activeSubMenuAction = function(
					id, active) {
				var isMainElement = this._actionsIconBar.getItem(id);
				// Test if the Id wasn't a element in the actionBar
				if (isMainElement == false) {
					var allActionToolBar = this._actionsIconBar.elements.container.children[0].children
					// Navigate to each action to find the submenu
					for (var i = 0; i < allActionToolBar.length; i++) {
						// Get the item/action
						var action = this._actionsIconBar
								.getItem(allActionToolBar[i]);
						// Test if the action is a dropdownmenu
						if (action.content) {
							var actionContent = action.content;
							if (actionContent.type == 'dropdownmenu') {
								// Test if the dropdownmenu have been already
								// created
								if (actionContent.component) {
									if (active == false) {
										// Disable the action
										actionContent.component.disableItem(id);
										//break; A2N:commented to fix  IR-979988
									} else {
										actionContent.component.enableItem(id);
										//break; A2N:commented to fix  IR-979988
									}
								} else {
									// Navigate into the dropdownmenu to disable
									// the id corresponding
									for (var j = 0; j < actionContent.options.items.length; j++) {
										if (actionContent.options.items[j].id == id) {
											if (active == false) {
												// Disable the action
												actionContent.options.items[j].disabled = true;
												break;
											} else {
												// Disable the action
												actionContent.options.items[j].disabled = false;
												break;
											}
										}
									}
								}
							}
						}
					}
				}

			};

			// Method to select a action (subMenu) in a menu
			// <!> This method is a customization of the iconBar <!>
			ENOXCollectionToolBarV2.prototype._selectSubMenuAction = function(
					id, selected) {
				var isMainElement = this._actionsIconBar.getItem(id);
				// Test if the Id wasn't a element in the actionBar
				if (isMainElement == false) {
					var allActionToolBar = this._actionsIconBar.elements.container.children[0].children
					// Navigate to each action to find the submenu
					for (var i = 0; i < allActionToolBar.length; i++) {
						// Get the item/action
						var action = this._actionsIconBar
								.getItem(allActionToolBar[i]);
						// Test if the action is a dropdownmenu
						if (action.content) {
							var actionContent = action.content;
							if (actionContent.type == 'dropdownmenu') {
								// Test if the dropdownmenu have been already
								// created
								if (actionContent.component) {
									for (var m = 0; m < actionContent.component.items.length; m++) {
										if (actionContent.component.items[m].id == id) {
											if (selected) {
												actionContent.component.items[m].selected = true;
												actionContent.component.items[m].elements.container
														.addClassName('selected');
												this._actionsIconBar.overflowMenu
														.getItem(id).elements.container
														.addClassName('selected')
												// actionContent.component.items[m].toggleSelection();
											    return;
											} else {
												actionContent.component.items[m].selected = false;
												actionContent.component.items[m].elements.container
														.removeClassName('selected');
												this._actionsIconBar.overflowMenu
														.getItem(id).elements.container
														.removeClassName('selected')
												// actionContent.component.items[m].toggleSelection();
												return;
											}
										}
									}
									//break;
								} else {
									// Navigate into the dropdownmenu to set
									// attribut 'selected' to the id
									// corresponding
									for (var j = 0; j < actionContent.options.items.length; j++) {
										if (actionContent.options.items[j].id == id) {
											actionContent.options.items[j].selected = selected;
											break;
										}
									}
								}
							}
						}
					}
				}

			};

			// Method to make the icon selected
			ENOXCollectionToolBarV2.prototype._setColorIconSelected = function(
					data) {
				var painterIcon = document.querySelector('#' + data.id);
        if(painterIcon){
          var iconContainer = painterIcon.getChildren()[0];
          iconContainer.removeAttribute('class');
          // Add the blue color on the icon when it selected
          iconContainer.setAttribute('class', 'fonticon fonticon-'
              + data.icon
              + ' enox-collection-toolbar-filter-activated');
        }
			};

			// Method to update the number display in the iconMultiselect
			ENOXCollectionToolBarV2.prototype._updateItemCount = function(
					itemCount) {
				this.currentNbitems = itemCount;
				if (itemCount === 1) {
					this._itemCountContainer.innerHTML = itemCount + " "
							+ this._options.itemName;
					this._itemCountContainer.title = itemCount + " "
							+ this._options.itemName;
				} else {
					this._itemCountContainer.innerHTML = itemCount + " "
							+ this._options.itemsName;
					this._itemCountContainer.title = itemCount + " "
							+ this._options.itemsName;
				}
			};

			ENOXCollectionToolBarV2.prototype._setMultiselectionActions = function(
					options) {
				this._multiselectionActions = options ? options
						: this._options.multiselActions;
			};

			ENOXCollectionToolBarV2.prototype._setMultiselectionActive = function(
					value) {
				if (value) {
					this._setColorIconSelected({
						id : 'iconMultipleActionBar',
						icon : 'select-on'
					});
				} else {
					this.changeIcon('iconMultipleActionBar', 'select-on',
							nls_ENOXCollectionToolBarV2.Multiselection_Tooltip);
				}
				this._multiselectionActive = value;
			};

			// Method to update the number display in the iconMultiselect
			ENOXCollectionToolBarV2.prototype._updateIconMultiselectNumber = function(
					number) {
				this.currentNbSelections = number;
				if (number > 9999) {
					this.numberOfSelection.nodeValue = '>9999';

				} else if (number === 0) {
					this.numberOfSelection.nodeValue = '';
				} else {
					this.numberOfSelection.nodeValue = number;
				}
			};

			ENOXCollectionToolBarV2.prototype._manageChangeWidthTextCheckBox = function(
					userWidth) {
				// This test is for setting the width of the actionToolBar
				// depending if we show the TextField (itemCount) and the
				// CheckBox (selectItem).
				// By default :
				// TextField : 100px
				// CheckBox : 20px
				if (this._options.showItemCount && this._options.withmultisel) {
					if (userWidth) {
						this._countContainer.style.width = this._options.showItemCount.width
								+ "px";
						this._rightMenuContainerWrapper.style.width = 'calc(100% - '
								+ (this._options.showItemCount.width + 20)
								+ 'px)';
					} else {
						this._rightMenuContainerWrapper.className = this._rightMenuContainerWrapper.className
								+ ' '
								+ 'enox-collection-toolbar-right-menu-wrapper-width-with-checkBox';
					}
				} else {
					if (this._options.showItemCount) {
						if (userWidth) {
							this._countContainer.style.width = this._options.showItemCount.width
									+ "px";
							this._rightMenuContainerWrapper.style.width = 'calc(100% - '
									+ (this._options.showItemCount.width + 20)
									+ 'px)';
						} else {
							this._rightMenuContainerWrapper.className = this._rightMenuContainerWrapper.className
									+ ' '
									+ 'enox-collection-toolbar-right-menu-wrapper-width-with-text';
						}
					} else {
						this._rightMenuContainerWrapper.className = this._rightMenuContainerWrapper.className
								+ ' '
								+ 'enox-collection-toolbar-right-menu-wrapper-width';
					}
				}
			}

			// Function to manage the resize toolbar
			// <!><!><!><!><!><!><!><!><!><!><!><!>
			// Must be attach after the DOM is generate
			// <!><!><!><!><!><!><!><!><!><!><!><!>
			ENOXCollectionToolBarV2.prototype.attachResizeSensor = function() {
				let that = this;
				if(this.resizeSensor && typeof(this.resizeSensor.detach) === "function") {
					this.resizeSensor.detach();
				}
				this.resizeSensor = new ResizeSensor(
					  this._container,
						function() {
							if (that._container.clientWidth > 0
              /*If a container has several tabs containing different instances of EnoxCollectionToolbarv2,
              all the instances do not update as we resize the widget, As for a tab change width will be same,
              following condition is commented. */
              /*	&& that._container.offsetWidth !== that._currentWidth */) {
              //UWA.log("attachResize")
								that._resize();
								that._currentWidth = that._container.clientWidth;
							}
						});
			};

			return ENOXCollectionToolBarV2;
		});
