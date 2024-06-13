define('DS/ENOXCollectionToolBar/js/ENOXGeneratedToolBar',
					[	'DS/Handlebars/Handlebars',
						'DS/TreeModel/TreeDocument',
						'DS/TreeModel/TreeNodeModel',
						'DS/Tweakers/GeneratedToolbar',
						'DS/Tweakers/TypeRepresentationFactory',
						'DS/Core/ModelEvents',
						'DS/Controls/LineEditor',
						'DS/ResizeSensor/js/ResizeSensor',
						'DS/Menu/Menu',
						'DS/Controls/Toggle',
						'text!DS/ENOXCollectionToolBar/html/ENOXGeneratedToolBar.html',
						'i18n!DS/ENOXCollectionToolBar/assets/nls/ENOXGeneratedToolBar',
						'css!DS/ENOXCollectionToolBar/css/ENOXGeneratedToolBar.css'
					]
	,function(
					Handlebars,
					TreeDocument,
					TreeNodeModel,
					WUXGeneratedToolbar,
					TypeRepresentationFactory,
					ModelEvents,
					LineEditor,
					ResizeSensor,
					Menu,
					Toggle,
					html_ENOXGeneratedToolBar,
					nls_GeneratedToolBar,
					css_ENOXGeneratedToolBar){
			'use strict';

	let ENOXGeneratedToolBar = function(options){
		this._init(options);
	};

let genToolbarTemplate = Handlebars.compile(html_ENOXGeneratedToolBar);

	ENOXGeneratedToolBar.prototype._init = function(options){
		let that = this;


		//initialize a toogle typeRepresentation
		let typeRepFactory = new TypeRepresentationFactory();

		if(options.customTypeRepresentation)
			typeRepFactory.registerTypeRepresentations(customTypeRepresentation);




		that._options = options ?  options : [];
		this._modelEvents = options.modelEvents ? options.modelEvents
				: new ModelEvents();
		this.model = {
			"entries" : []
		};
		this.stableModel = {
			"entries":[]
		};

		that._options.currentSort = that._options.currentSort ? that._options.currentSort : { id: '',order : ''};

	this._subscribeToEvents()
	this._initDivs();


		if(this._options.withmultiselToggle)
			this._createMultiSelToggle()

		if(this._options.showItemCount)
				this._createCountOption();

		this._createOtherActionsOptions();

	 	this._createSearchOptions();
		if(this._options.withmultisel)
				this._createMultiSel();


	 	if(this._options.withStableActions){
	 		this._createOtherActionsOptions(true);
 		}
	 	this._createSortOptions();

		if(this._options.showSwitchViewAction || typeof this._options.showSwitchViewAction === 'undefined'){
			this._createViewOptions();
		}




	 let totalEle = this.model.entries.length;
	 for(let i=1;i< totalEle;i++){
		 if(this.model.entries[totalEle-i].priority ){
			 break;//priority already set ie unstable actions
		 }
		 this.model.entries[totalEle-i].priority = 100-i;
	 }
	 this.render();

	 // //after evey node update a re-render occures
	 // that.toolbarTreeDocument.onNodeModelUpdate(function(){
	 //
	 // })


	}

	ENOXGeneratedToolBar.prototype._initDivs = function(){
		this._container = document.createElement('div');

		this._container.innerHTML = genToolbarTemplate(this._options);

		this._container = this._container
				.querySelector('.enox-generated-toolbar-container');
	  this._filterContainer = this._container.querySelector('.enox-generated-toolbar-filter-container');
		this._unstableContainer = this._container.querySelector('.enox-generated-toolbar-unstable-container');
		this._stableContainer =  this._container.querySelector('.enox-generated-toolbar-stable-container');
		this._seperatorContainer = this._container.querySelector('#stableSeperator');
		this._countContainer = this._container.querySelector('.enox-generated-toolbar-item-count');
		this._countSpan = this._container.querySelector('.itemCount');
		this._multiselToggleContainer = this._container.querySelector('.enox-generated-toolbar-multisel-toggle');
	}

	ENOXGeneratedToolBar.prototype.render = function(model){
		let that = this;


		that.toolbarTreeDocument = WUXGeneratedToolbar.prototype.createTreeDocument(that.model);
		that.stableToolbarTreeDocument = WUXGeneratedToolbar.prototype.createTreeDocument(that.stableModel);
		//render Gtoolbar
		this.genToolbar = new WUXGeneratedToolbar({
			overflowManagement: "dropdown",
			direction : "horizontal",
			items : that.toolbarTreeDocument,
			layoutOptions: {
		    layoutDensity: 'comfortable'
		  }
		});

		this.stableGenToolbar = new WUXGeneratedToolbar({
			overflowManagement : "dropdown",
			direction: "horizontal",
			items : that.stableToolbarTreeDocument
		})

		that.genToolbar.inject(that._unstableContainer);
		that.stableGenToolbar.inject(that._stableContainer);


	}


	ENOXGeneratedToolBar.prototype.inject = function(parentContainer){
		let that = this;
		parentContainer.appendChild(this._container);
		that._attachIntersectionObserver(that._container);
	}


	ENOXGeneratedToolBar.prototype._sortActionSelected = function(ctx){
		let that = this;
		let container = ctx.dsModel.elements.container;
		let tempMenu = [];
		let sortItems = that._options.sort;



		sortItems.forEach((item, i) => {
			tempMenu.push({
				id : item.id,
				title: item.text,
				type: 'CheckItem',
				action : {
					callback : function(){}
				}
			})
		});
		let menu = that._displayMenu(tempMenu,container);
		function callback(){
		 //var sorting=document.evaluate( `//div[contains(@class,'wux-tweaker-function') and .//div[contains(@class,'wux-button-icon-placeholder') and .//span[contains(@class,'wux-ui-3ds-sorting')]]]` , document, null, 9, null).singleNodeValue;
		 let sorting = document.querySelector('.wux-menu.wux-menu-mouse , .wux-menu.wux-menu-touch');
		 if(sorting){
				that._createSortDropdown();

		 } else {
			 setTimeout(function(){
				 callback();
			 },50)
		 }
	 }
	 setTimeout(function(){
		 callback();
	 },50)
	}

	ENOXGeneratedToolBar.prototype._displayMenu = function(menu,container){
		let that = this;
		let containerPos = container.getBoundingClientRect()
		let pos = {
								position: {
										x: containerPos.right,
										y: containerPos.bottom
								}
							};
		let layout = "topright";
		let input = that.isTouch ? "touch" : "mouse";
		Menu.show(menu, pos);
	}
//************************************* SORT PARTY ******************************************//
	ENOXGeneratedToolBar.prototype._attachIntersectionObserver = function(container){
		let that = this;
		function callBack(mutations){
			for(let mutation of mutations){
			let toolbar = mutation.target;
			let sortAction = toolbar.querySelector('.wux-ui-3ds-sorting');
			let resizeSensor = toolbar.querySelector('.resize-sensor');
					if(mutation.isIntersecting){
							if(resizeSensor == undefined || resizeSensor == null){
									that.attachResizeSensor();
									that._modelEvents.publish({ event : 'enox-collection-toolbar-injected'});
									that._resizeToolbar();
									//intObserver.unobserve(that._container);
							}
					} else if(resizeSensor){
						that._resizeSensor.detach()
					}

			}
		};

	this._intersectionObserver = new IntersectionObserver(callBack)//,{trackVisibility:true,delay:100});
	//isVisible is a new feature confirming the visibility of the container on the viewport
	this._intersectionObserver.observe(container);


	}

	ENOXGeneratedToolBar.prototype._createSortOptions = function(){
		let that = this;
		if(!that._options.sort || (that._options.sort.length == 0) ) return ;


		// will create options upon dropdown
		let sortTypeRepresentation = {
			id : "iconSortActionBar",
			dataElements : {
				typeRepresentation : 'functionIcon',
				tooltip:{
						title : nls_GeneratedToolBar.sort,
						shortHelp : nls_GeneratedToolBar.sortElements
				} ,
				value : function(ctx){
						that._sortActionSelected(ctx);
				},
				icon :{
					iconName : 'sorting',
					fontIconFamily: 1,
				},
			},
			visibleFlag : true,
			category : 'stableActions',
			position: 'far',
			touchMode :  that._options.touchMode ? that._options.touchMode : false
		}

		that.stableModel.entries.push(sortTypeRepresentation);

	}



	ENOXGeneratedToolBar.prototype._createSortOptionBody = function(sortOption){
		let that = this;
		let sortMainDiv = {
          tag: 'div',
          class: 'sort-item '+ sortOption.id,
					id : ""+sortOption.id+"",
          html: [
					{
						tag: 'span',
						class: 'item-text',
						text : sortOption.text
					},
					{
					tag: 'div',
					class: 'item-icon-group',
					html: []
				}]
        };


				switch (sortOption.type) {

	          case 'date' :
	            sortMainDiv.html[1].html = [
	              {
	                tag: 'span',
	                title: nls_GeneratedToolBar.dateASC,
	                id: sortOption.id,
	                order: 'asc',
	                class: that._getClassFromSortTypeAndOrder(sortOption.type,'asc'),

								},
	              {
	                tag: 'span',
	                title: nls_GeneratedToolBar.dateDESC,
	                id: sortOption.id ,
	                order: 'desc',
	                class: that._getClassFromSortTypeAndOrder(sortOption.type,'desc'),

	              }
	            ];
	            break;

	          case 'integer' :
	            sortMainDiv.html[1].html = [
	              {
	                tag: 'span',
	                title: nls_GeneratedToolBar.integerASC,
	                id: sortOption.id ,
	                order: 'asc',
	                class: that._getClassFromSortTypeAndOrder(sortOption.type,'asc'),

								},
	              {
	                tag: 'span',
	                title: nls_GeneratedToolBar.integerDESC,
	                id: sortOption.id ,
	                order: 'desc',
	                class: that._getClassFromSortTypeAndOrder(sortOption.type,'desc'),

								}
	            ];
	            break;


	          default:
	            sortMainDiv.html[1].html = [{
	                tag: 'span',
	                title: nls_GeneratedToolBar.stringASC,
	                id: sortOption.id ,
	                order: 'asc',
	                class: that._getClassFromSortTypeAndOrder(sortOption.type,'asc'),

								},
	              {
	                tag: 'span',
	                title: nls_GeneratedToolBar.stringDESC,
	                id: sortOption.id ,
	                order: 'desc',
	                class: that._getClassFromSortTypeAndOrder(sortOption.type,'desc'),

									}
	            ];
							break;
	        }


					return sortMainDiv;

	}

	ENOXGeneratedToolBar.prototype._getClassFromSortTypeAndOrder = function(type,order){

		let className = '';
		switch(type){
			case 'date' :
										if(order.toUpperCase() == 'ASC'){
											className = 'wux-ui-3ds-date-sorting-1-31 wux-ui-3ds';
										} else {
											className = 'wux-ui-3ds-date-sorting-1-31 wux-ui-3ds';
										}
										break;
			case 'integer':
										if(order.toUpperCase() == 'ASC'){
											className = 'wux-ui-3ds-num-sorting-1-2 wux-ui-3ds';
										} else {
											className = 'wux-ui-3ds-num-sorting-2-1 wux-ui-3ds';
										}
										break;
			default :
										if(order.toUpperCase() == 'ASC'){
											className = 'wux-ui-3ds-alpha-sorting-a-z wux-ui-3ds';
										} else {
											className = 'wux-ui-3ds-alpha-sorting-z-a wux-ui-3ds';
										}
										break;
		}

		return className;

	}


	ENOXGeneratedToolBar.prototype._createSortDropdown = function(){
		let that = this;
		let sortContainer = document.querySelector('.wux-menu-mouse,.wux-menu-touch').querySelector('.wux-menu-container');
		sortContainer.innerHTML = '';//setHTML not supported for dynamic view

		let sortDropdownBodyStructure = {
			html : [],
			events : {
				click:  function(evt){
					// console.log(evt)
					let id="" , order="" ;

					if(that._options.clearSort && (evt.target.id == that._options.clearSort.id || evt.target.parentElement.id == that._options.clearSort.id ) ){
						that._resetSort();
						that._removeGeneratedSortDropdown(evt.target)
						that._updateTooltip('iconSortActionBar',nls_GeneratedToolBar.sortElements);
						return ;
					}


					switch(evt.target.tagName){
						case 'SPAN':
										if(evt.target.id){
													id = evt.target.id;
													order = evt.target.getAttribute('order').toUpperCase();
										} else {
													id = evt.target.parentElement.id;
													order = 'ASC'
										} ;
										break;

						 case 'DIV':
												id = evt.target.parentElement.id;
												order = 'ASC';
												break;
					 }
					let text ;
					if( evt.target.closest('div[id="'+id+'"]') ){
						text = evt.target.closest('div[id="'+id+'"]').innerText;
					} else if(evt.target.id !== undefined){
						id = evt.target.id;
						text = evt.target.querySelector('span.item-text').innerText;
					}
					let sortItem = { id : id, order : order};
					that._activateCurrentSort(sortItem);
					that._removeGeneratedSortDropdown(evt.target);
					that._updateTooltip('iconSortActionBar',nls_GeneratedToolBar.SortedBy + text);
					that._modelEvents.publish({
						event : 'enox-collection-toolbar-sort-activated',
						data : {
							sortOrder : order,
							sortAttribute : id
							}
						});

				}
			}
		};
		that._options.sort.forEach(item=>{
				sortDropdownBodyStructure.html.push(that._createSortOptionBody(item));
		})

		if(that._options.withClearSort){
				let clearOptions = that._options.clearSort ? that._options.clearSort : undefined ;
				let clearId = ( clearOptions && clearOptions.id )  ? clearOptions.id :"clearSort" ;
				let clearFonticon = (clearOptions && clearOptions.fonticon ) ? clearOptions.fonticon : 'wux-ui-3ds-reset wux-ui-3ds';
				let clearText = ( clearOptions && clearOptions.title ) ? clearOptions.title :  nls_GeneratedToolBar.clearSort;

				let clearHandler = (clearOptions && clearOptions.handler) ? clearOptions.handler : function(){ that._resetSort() };

				let clearSort = {
					tag: 'div',
					class: 'sort-item',
					id : clearId ,
					html: [
					{
						tag: 'span',
						class: 'item-text',
						text :  clearText
					},{
					tag: 'div',
					class: 'item-icon-group ' +  clearFonticon ,
					html: []
				}],
					events : {
						click : clearHandler
					}
				}
				sortDropdownBodyStructure.html.push(clearSort)
		}

		let dropdownComponent = new UWA.createElement('div',sortDropdownBodyStructure);
		dropdownComponent.inject(sortContainer)



		let activeSortIcon;
		let activeSort;

		if(that._options.currentSort.id ){

			if(that._options.withClearSort && (that._options.clearSort && that._options.currentSort.id == that._options.clearSort.id) || that._options.currentSort.id == 'clearSort' )
				return;

			activeSort = sortContainer.querySelector('div[id="'+that._options.currentSort.id+'"]')
			activeSort.addClassName('selected');

			if(that._options.currentSort.order && that._options.currentSort.order == "DESC"){
				activeSortIcon = sortContainer.querySelector('span[id="'+that._options.currentSort.id+'"][order=desc]');
			} else {
				activeSortIcon = sortContainer.querySelector('span[id="'+that._options.currentSort.id+'"][order=asc]');
			}
			activeSortIcon.addClassName('selected-icon')
		}



	}

	ENOXGeneratedToolBar.prototype._activateCurrentSort = function(item){
		let that = this;

		that._options.currentSort.id = item.id;
		that._options.currentSort.order = item.order.toUpperCase();


	}

	ENOXGeneratedToolBar.prototype._removeGeneratedSortDropdown = function(element){
		let that = this;
		let sortDropdown = element.closest('.wux-menu.wux-menu-mouse , .wux-menu.wux-menu-touch');
		sortDropdown.remove();

	}

	ENOXGeneratedToolBar.prototype._resetSort = function(){
		let that = this;
		UWA.log("Publish event : 'enox-collection-toolbar-sort-reset'");
		that._modelEvents.publish({ event : 'enox-collection-toolbar-sort-reset', data : {} });

		that._options.currentSort.id ='';
		that._options.currentSort.order = '';


	}

//********************************** VIEW PARTY ********************************************************//

ENOXGeneratedToolBar.prototype._createViewOptions = function(){
	let that = this;
	let views = that._options.views ;
	let currentView = that._options.currentView;



	if((views == undefined) || views.length < 2)
		return;

	if(!currentView){
		currentView = {
			text : "",
			disabled : false,
			id : ""
		}
	} else {
		that._options.views.forEach((item) => {
			if(item.id == currentView){
				currentView = item;
			}
		});

	}

	let viewRepresentation = {
		id : 'iconViewsActionBar',
		icon : {
			iconName : currentView.fonticon,
			fontIconFamily : 1
		},
		position : 'far',
		category : "stableActions",
		touchMode : this._options.touchMode ? this._options.touchMode : false,
		disabled : currentView.disabled ? currentView.disabled : false,
		dataElements : {
			typeRepresentation: "layout",
			tooltip : {
				title : nls_GeneratedToolBar.switchView,
			},
			value  : currentView.id,
			possibleValues : [],
		},
		onNodeUpdate : function(evt){
			let viewId = evt.getAttributeValue('data');
			that.updateView(viewId);
		}
	};


	that._options.views.forEach((item) => {
		let tempView = {
			value: item.id,
			label : item.text,
			icon : {
				iconName : item.fonticon,
				fontIconFamily : 1
			},
		};
		viewRepresentation.dataElements.possibleValues.push(tempView);
	});


	return that.stableModel.entries.push(viewRepresentation);

}

	ENOXGeneratedToolBar.prototype.updateView = function(viewId){
			let that = this;
			// that._modelEvents.publish({
			// 		event : 'enox-collection-toolbar-update-view',
			// 		data : viewId
			// })

			that._options.views.forEach((item) => {
				if(item.id == that._options.currentView.id){
					currentView = item;
				}
			});



			that._modelEvents.publish({
				event : 'enox-collection-toolbar-switch-view-activated',
				data : viewId
			});


			UWA.log("Publish event : 'enox-collection-toolbar-switch-view-activated'"+ ' id : ' + viewId);

	}

//************************************** SEARCH **************************************************************//

	ENOXGeneratedToolBar.prototype._createSearchOptions = function(){
		let that = this;

		if( (that._options.filter === undefined ) || !that._options.filter)
			return;

		let searchOption = that._createSearchAndFilter() ;
		searchOption.forEach((item) => {
				that.stableModel.entries.push(item);
		});


	}

	ENOXGeneratedToolBar.prototype._createSearchAndFilter = function(){
		let that = this;
		this._filterActive = false;
		if( typeof this._options.filter != undefined){
			let lineEditor = new LineEditor({
					placeholder: nls_GeneratedToolBar.Search,
				 value: undefined,
				 selectAllOnFocus: true,
				 displayClearFieldButtonFlag: true,
				 visibleFlag : false,
				 touchMode : this._options.touchMode ? this._options.touchMode : false
			});
			lineEditor.getContent().addClassName('searchInputFilter');
			lineEditor.addEventListener('uncommittedChange',function(ctx){
				let data = {};
				data.searchValue= [];

				if(ctx.dsModel.valueToCommit){
					let text = ctx.dsModel.valueToCommit;
					data.searchValue.push(text);
				}
				that._modelEvents.publish({event : 'enox-collection-toolbar-filter-search-value',data : data})
			});
			lineEditor.inject(this._filterContainer);
			this._filter = lineEditor;
		}



		let searchOption = [
		// 	{
		// 	id:"searchFilter",
		// 	dataElements : {
		// 		typeRepresentation : "string",
		// 		touchMode :  that._options.touchMode ? that._options.touchMode : false,
		// 		placeholder : nls_GeneratedToolBar.Search,
		// 		visibleFlag : true,
		// 		allowResetToUndefinedByUIFlag: true,
		// 		icon : {
		// 			className : "searchFilterEditor"
		// 		},
		// 		position : 'far',
		// 		category: 'stableActions',
		// 		onNodeLiveUpdate : function(ctx,value){
		//
		// 				that._modelEvents.publish({event : 'enox-collection-toolbar-filter-search-value',data : { searchValue : [value]} })
		// 		}
		// 	}
		// },
		{
			id : "enox-search",
			icon: {
				iconName : "search",
				fontIconFamily : 1
			},
			// action : {
			// 	module : "DS/ENOXCollectionToolBar/js/ENOXGeneratedToolBar",
			// 	func : "searchAction"
			// },
			dataElements : {
				typeRepresentation : "functionIcon",
				value : function(){
					that._searchAction();
				},
				tooltip : {
					title : nls_GeneratedToolBar.Search,
					shortHelp : nls_GeneratedToolBar.SearchElements,
				}
			},
			position : 'far',
			category :  'stableActions',
			visibleFlag : true,
			touchMode : that._options.touchMode ? that._options.touchMode : false
		}];


		return searchOption;
	}

	ENOXGeneratedToolBar.prototype._searchAction = function(evt){
		let that = this;
		that._modelEvents.publish({
			event : 'enox-collection-toolbar-toggle-filter',
			data : !that._filterActive
		});

	}

	// ENOXGeneratedToolBar.searchElements = function(evt){
	// 	console.log(evt);
	// }



//********************************************************************************************************//

ENOXGeneratedToolBar.prototype._updateTooltip = function(id, text){
	let that = this;
		let toolbar;
		if(that.genToolbar.getNodeModelByID(id)){
			toolbar = that.genToolbar;
		} else if(that.stableGenToolbar.getNodeModelByID(id)){
			toolbar = that.stableGenToolbar;
		}
		toolbar.updateNodeModel(id,{ tooltip : { title : text }});

}


//***********************************OTHER ACTIONS ********************************************************//


	ENOXGeneratedToolBar.prototype._createOtherActionsOptions = function(flag){
		let that = this;
		let actions = flag ? that._options.stableActions: that._options.actions;
		let otherActions = [];
		let category = 1;
		actions && actions.forEach((item) => {

			if(item.content && item.content.length > 0  && !item.typeRepresentation) //representation not given
				item.typeRepresentation = 'chevronMenuIcon';

			if(item.className == 'divider'){
				return category++;
			}

			let parentID = item.id;
			let tempModel = {
				id : item.id,
				dataElements : {
					typeRepresentation : item.typeRepresentation ? item.typeRepresentation : 'functionIcon',
					icon : {
						iconName : item.fonticon ? item.fonticon : ( item.icon && item.icon.iconName ? item.icon.IconName : ""),
						fontIconFamily : item.fontIconFamily ? item.fontIconFamily : 1, //1 for webux
						className : item.className ? item.className : (item.icon && item.icon.className ? item.icon.className : ( item.selected ? 'enox-collection-toolbar-filter-activated' : '' ))
					},
					disabled : item.disabled ? item.disabled : false,
					tooltip  : {
						title : ( item.tooltip && item.tooltip.title ) ? item.tooltip.title : item.text,
						shortHelp : ( item.tooltip && item.tooltip.shortHelp ) ? item.tooltip.shortHelp : '',
						longHelp : ( item.tooltip && item.tooltip.longHelp ) ? item.tooltip.longHelp : ''
					},
					visibleFlag : item.visibility ? item.visibility : ( (item.visibleFlag && !item.visibleFlag) ? false : true ),
					category : item.category ? item.category : category,
					position : item.position ? item.position : 'far',
					label :  item.label ? item.label : item.text,
					touchMode :that._options.touchMode ? that._options.touchMode : false,
				}
			};

			 if(item.typeRepresentation == 'functionMenuIconCount'){
				 tempModel.dataElements.count = item.count ? item.count : 0 ;
				}



			if(item.content && item.content.length > 0){
				let menu = [];

				item.content.forEach((subItem) => {
						subItem.parent = parentID;
						let handler = subItem.handler;
						let genToolHandler = function(){
							this.parent = item.id
							// item = that.onNodeUpdate();
							that._publishItemActivated(this);
							if(this.handler){
								this.handler();
							}
						}.bind(subItem);

						let tempMenu = {
							type : 'PushItem',
							title : subItem.title ? subItem.title : subItem.text,
							id : subItem.id,
							action : {
								callback : genToolHandler
							}
						}
						if(subItem.icon || subItem.fonticon){
							tempMenu.icon= {
								iconName : subItem.fonticon,
								fontIconFamily : subItem.fontIconFamily ? subItem.fontIconFamily : 1
							}
						}
						//sub menu inside a dropdown menu option
						if(subItem.value){
							tempMenu.value = subItem.value
						}
						let subMenuArr = [];
						if(subItem.items){
							 subItem.items.forEach((subMenu) => {
								 subMenu.parent = parentID;

								let genToolSubMenuHandler = function(){
									this.parent = item.id;
									that._publishItemActivated(this);
									if(this.handler){
										this.handler();
									}
								}.bind(subMenu);

								let subMenuItem = {
									id : subMenu.id,
									type : "PushItem",
									title : subMenu.title ? subMenu.title : subMenu.text,

									action : {
											callback : genToolSubMenuHandler
										}
								}

								if(subMenu.icon || subMenu.fonticon){
									subMenuItem.icon= {
										iconName : subMenu.fonticon,
										fontIconFamily : subMenu.fontIconFamily ? subMenu.fontIconFamily : 1
									}
								}

								if(subMenu.value){
									subMenu.value = subMenuItem.value
								}
								subMenuArr.push(subMenuItem);

							});
						}
						if(subMenuArr.length > 0 )
							tempMenu.submenu = subMenuArr;

						menu.push(tempMenu);
				});

				if(item.data)
					tempModel.dataElements.data = item.data;



				if(item.typeRepresentation == 'functionIcon'){
					tempModel.dataElements.possibleValues = menu;
				} else {
					tempModel.dataElements.value = {}
					tempModel.dataElements.value.menu = menu;
				}
			} else {

				let genToolHandler = function(){
					that._publishItemActivated(this);
					if(this.handler){
						this.handler();
					}
				}.bind(item);




				if(typeof item.value == 'undefined'){
					tempModel.dataElements.value = genToolHandler;

				}

				if(item.placeholder)
					tempModel.dataElements.placeholder = item.placeholder;
			}

			if(typeof item.value != 'undefined')
				tempModel.dataElements.value = item.value;

			tempModel.onNodeUpdate = function(ctx,value){
				that._modelEvents.publish({ event : 'enox-collection-toolbar-node-updated',data: { context : ctx, value : value} });
			}

			tempModel.onNodeLiveUpdate = function(ctx,value){
				that._modelEvents.publish({ event : 'enox-collection-toolbar-node-live-update',data: { context : ctx, value: value} });
			}

		 	otherActions.push(tempModel);
		 });
		//
		otherActions.forEach( ( item, i ) => {

			if(!flag){
				item.priority = otherActions.length - i ;
				that.model.entries.push(item);
			} else {
				item.dataElements.priority = 100;
				item.dataElements.category = 'stableActions';
				item.dataElements.position = 'far';
				that.stableModel.entries.push(item)
			}

		});



	}

ENOXGeneratedToolBar.prototype._publishItemActivated = function(item){
			let that = this;
			UWA.log("Publish event : 'enox-collection-toolbar-action-activated'"+ ' id : ' + item.id);

			if(item.selected != undefined){
				 let semantics = that.genToolbar.getNodeModelByID(item.id).getAttributeValue('semantics');
				 let prevClassName = semantics.icon.className;
				 let updatedClassName = "";
				if(prevClassName != 'enox-collection-toolbar-filter-activated'){
					updatedClassName = 'enox-collection-toolbar-filter-activated'
				}
				item.selected = !item.selected;
				//that.genToolbar.prepareUpdateView();
					that.genToolbar.updateNodeModel(item.id,{
						grid : {
							semantics : {
											icon : {
													iconName : item.fonticon,
													fontIconFamily  : item.fontIconFamily ? item.fontiIconFamily : 1 ,
													className : updatedClassName
															}
								 					}
							 		}
						 });
				//that.genToolbar.pushUpdateView();
			}

			if (item.changeIconSelection) {
				that.changeIcon(item.parent, item.fonticon, item.text, item.fontIconFamily);
			}

			this._modelEvents.publish({
				event : 'enox-collection-toolbar-action-activated',
				data : item.id
			});
}

ENOXGeneratedToolBar.prototype.updateActionCount = function(id,count){
	let that = this;
	let toolbar = that._getToolbar(id);

	toolbar.updateNodeModel(id, {
		count : count
	})
}

ENOXGeneratedToolBar.prototype.changeIcon = function(id,fonticon,text,fontIconFamily){
//	that.genToolbar.prepareUpdateView();
	let that = this;
	that.genToolbar.updateNodeModel(id,{'icon': { 'iconName' : fonticon , 'fontIconFamily' : fontIconFamily ? fontIconFamily : 1 },'tooltip': { 'title' : text}});

//	that.genToolbar.pushUpdateView();
}

ENOXGeneratedToolBar.prototype._getToolbar = function(id){
	let that = this;
	let toolbar ;
	if(that.genToolbar.getNodeModelByID(id)){
		toolbar = that.genToolbar;
	} else if(that.stableGenToolbar.getNodeModelByID(id)) {
		toolbar = that.stableGenToolbar;
	}

	return toolbar;
}

//*********************************************MultiSel****************************************************//

ENOXGeneratedToolBar.prototype._createMultiSel = function(){
	let that = this;


	let multiSelOption = {
		id : "multiSelEle",
		dataElements : {
			typeRepresentation : "functionMenuIconCount",
			position : "far",
			priority : 0,
			icon : {
					iconName : 'select-off',
					fontIconFamily :  1, //1 for webux
			},
			count : 0,
			tooltip  : {
					title : 'Select',
					shortHelp : '',
					longHelp : ''
			},
			visibleFlag :true,
			touchMode : that._options.touchMode ? that._options.touchMode : false,
			category: 'stableActions',

			value : {
				menu : []
			}
		}
	}


	that._multiSelMenu = [{
			id : 'selectVisible',
			type : "PushItem",
			title : nls_GeneratedToolBar.Select_all_visible,
			action : {
				callback :  function(){
					that._modelEvents.publish({ event : "enox-collection-toolbar-all-selected"});
			}}
	},{
		id : 'selectNone',
		type : "PushItem",
		title : nls_GeneratedToolBar.Select_none,
		action : {
			callback :  function(){
					that._modelEvents.publish({ event : "enox-collection-toolbar-all-unselected"});
				}}
	},
	{
		id : 'selectInversion',
		type : "PushItem",
		title : nls_GeneratedToolBar.Select_inversion,
		action : {
			callback :  function(){
					that._modelEvents.publish({ event : "enox-collection-toolbar-select-inversion"});
				}}
	}];


 // if(this._options.multiselActions){

	 multiSelOption.dataElements.value.menu.push(that._multiSelMenu[0]);
	//  });
 //
 // }


 that.stableModel.entries.push(multiSelOption)



}

ENOXGeneratedToolBar.prototype._createMultiSelToggle = function(){
	let that = this;

	that._multiSelToggle = new Toggle({ type : "checkbox" });
	that._multiSelToggle.inject(that._multiselToggleContainer);
	that._multiSelToggle.addEventListener('buttonclick',
						function(e) {
							let toggle = e.dsModel;
							toggle.checkFlag ?
								that._modelEvents.publish({	event : 'enox-collection-toolbar-all-selected'  })
									:
								that._modelEvents.publish({ event : 'enox-collection-toolbar-all-unselected'	})	;
						});

}

ENOXGeneratedToolBar.prototype._setColorIconSelected = function(data){
	let that = this;
	let toolbar = that._getToolbar(data.id);
	let alreadySelected = false;
	let activeIcon = 'enox-collection-toolbar-filter-activated';
	let nodeModel = toolbar.getNodeModelByID(data.id);
	let className = nodeModel.options.grid.semantics.icon.className;
	let iconName = nodeModel.options.grid.semantics.icon.iconName;
	let fontIconFamily = nodeModel.options.grid.semantics.icon.fontIconFamily;
	let updatedClassName  = '';

	if(className){
		let tempArr = className.split(" ");
		tempArr.forEach((item) => {
			if(item == activeIcon){
				alreadySelected = true;
			}
		});
		if( alreadySelected ){
			//remove className
			updatedClassName = className.replace(activeIcon,"");
		} else {
			updatedClassName = className + " " + activeIcon;
		}
	} else {
		updatedClassName = activeIcon;
	}

	toolbar.updateNodeModel(data.id, {
		grid : {
			semantics : {
				icon : {
					iconName : iconName,
					fontIconFamily : fontIconFamily,
					className : updatedClassName
				}
			}
		}
	});

}


//********************************************* Count ********************************************************//

ENOXGeneratedToolBar.prototype._createCountOption = function(){
	//will create  action upon whom the text would be visible
	let that = this;
	this.currentNbitems = that._options.currentNbitems? that._options.currentNbitems : 0 ;

	let itemName = this._options.itemName;
	let itemsName= this._options.itemsName;
	if(!itemName)
		itemName = nls_GeneratedToolBar.Item;
	if(!itemsName)
		itemsName = nls_GeneratedToolBar.Items;

	let value = '';
	if(that.currentNbitems == 1){
		value = this.currentNbitems +' ' +itemName;
	}else {
		value = this.currentNbitems +' '+ itemsName;
	}

//	that._countContainer.innerText = value;
	that._countSpan.innerText = value;
}

ENOXGeneratedToolBar.prototype._updateCount = function(item){
	let that = this;
	let value = '';
	let itemName  = this._options.itemName;
	let itemsName = this._options.itemsName;
	this.currentNbitems = item;
	if(!itemName)
		itemName = nls_GeneratedToolBar.Item;
	if(!itemsName)
		itemsName = nls_GeneratedToolBar.Items;

	if(item == 1){
		value = item +' ' + itemName;
	}else {
		value = item +' '+ itemsName;
	}

	that._countSpan.innerText = value;
}


//**************************************** Multi Selection Action ******************************************//

ENOXGeneratedToolBar.prototype._createMultiSelOption = function(){

}

//Generated Toolbar doen't allow multiselect so can only select one from the possible Values
ENOXGeneratedToolBar.prototype._selectSubMenuAction = function(id,selected){
	let that = this;
	let toolbar = that._getToolbar(id);
	let nodeModel = toolbar.getNodeModelByID(id);

}
//*********************************** LISTENERS **********************************************************//

	ENOXGeneratedToolBar.prototype._subscribeToEvents = function() {
		var that = this;
		this._listSubscription = [];

//************************************** Left side multisel-toggle checkbox *************************************//


this._listSubscription
		.push(this._modelEvents
				.subscribe(
						{
							event : 'enox-collection-toolbar-select-all-checkbox-partial'
						},
						function() {
							that._multiSelToggle.mixedState = true;
						}));

this._listSubscription
		.push(this._modelEvents
				.subscribe(
						{
							event : 'enox-collection-toolbar-select-all-checkbox-uncheck'
						},
						function() {
							that._multiSelToggle.mixedState = false;
							that._multiSelToggle.checkFlag = false;
						}));

this._listSubscription
		.push(this._modelEvents
				.subscribe(
						{
							event : 'enox-collection-toolbar-select-all-checkbox-checked'
						},
						function() {
							that._multiSelToggle.mixedState = false;
							that._multiSelToggle.checkFlag = true;
						}));





//***************************************** Search Filter *****************************************************//
		this._listSubscription.push(this._modelEvents.subscribe({
	 	event : 'enox-collection-toolbar-toggle-filter'
	}, function(data) {



		that._filterActive = data;
		that._filter.visibleFlag = data;
		that._filter.value = undefined;
		that._filter.valueToCommit = undefined;


		that._resizeToolbar();

		// if(data && that._options.touchMode){
		// 		that._filter.focus();
		// 		that._filterContainer.style.marginLeft = '25px';
		// 	} else if(data && !that._options.touchMode){
		// 		that._filterContainer.style.marginLeft = '15px';
		// 	} else {
		// 		that._filterContainer.style.marginLeft = '0px';
		// 	}
	 }));



		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-click-filter-search'
		}, function() {
			that._searchAction();
		}));


		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-items-count-update'
		}, function(itemCount) {
			if(that._options.showItemCount)
				that._updateCount(itemCount)

		}));




		this._listSubscription.push(this._modelEvents.subscribe({
			event: 'enox-collection-toolbar-multiselect-icon-update-count'} , function(count){
				let iconName = ( count > 0 ) ? 'select-on' :  'select-off';

				that._modelEvents.publish({event: 'enox-collection-toolbar-icon-update', data : { id : 'multiSelEle', iconName : iconName}});
				that.updateActionCount('multiSelEle',count);
			}))

			this._listSubscription.push(this._modelEvents.subscribe({
				event : 'enox-collection-toolbar-set-multisel-actions'
			}, function(selectedState) {
				//0 - no selected , 1- all selected, 2 - some selected
				let tempMenu = [];
				if(selectedState == 1){
					tempMenu.push(that._multiSelMenu[selectedState])
				} else {
						for(let i=0;i<= selectedState;i++){
							tempMenu.push(that._multiSelMenu[i])
						}
				}
				that._modelEvents.publish({event : "enox-collection-toolbar-update-menu", data : {menu : tempMenu, id : 'multiSelEle'} })

			 }));

			// this._listSubscription.push(this._modelEvents.subscribe({
			// 	event : 'enox-collection-toolbar-add-action'
			// }, function(item) {
			//
			// 	let tempModel = [{
			// 		id : item.id,
			// 		dataElements: {
			// 			typeRepresentation : item.typeRepresentation ? item.typeRepresentation : 'functionIcon',
			// 			icon : {
			// 				iconName : item.fonticon ? item.fonticon : ( item.icon && item.icon.iconName ? item.icon.IconName : ""),
			// 				fontIconFamily : item.fontIconFamily ? item.fontIconFamily : 1, //1 for webux
			// 				className : item.className ? item.className : (item.icon && item.icon.className ? item.icon.className : ( item.selected ? 'active-icon' : '' ))
			// 			},
			// 			disabled : item.disabled ? item.disabled : false,
			// 			tooltip  : {
			// 				title : ( item.tooltip && item.tooltip.title ) ? item.tooltip.title : (item.title ? item.title : ( item.text ? item.text : "")),
			// 				shortHelp : ( item.tooltip && item.tooltip.shortHelp ) ? item.tooltip.shortHelp : '',
			// 				longHelp : ( item.tooltip && item.tooltip.longHelp ) ? item.tooltip.longHelp : ''
			// 			},
			// 			visibleFlag : item.visibility ? item.visibility : true,
			// 			category : item.category ? item.category : category,
			// 			position : item.position ? item.position : 'far',
			// 			label :  item.label ? item.label : item.text,
			// 			touchMode :that._options.touchMode ? that._options.touchMode : false,
			// 			action : {
			// 				callback : item.onClick
			// 			}
			// 		}
			// 	}];
			//
			// 	let newTreeDoc = WUXGeneratedToolbar.prototype.createTreeDocument(tempModel)
			//
			//
			// }));

		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-reset-sort'
		}, function() {
			that._resetSort();
		}));

		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-disable-action'
		}, function(id) {

			let toolbar = that._getToolbar(id);

			if(toolbar){
					toolbar.updateNodeModel(id,{
						disabled : true
					})
			}
		}))

		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-enable-action'
		}, function(id) {
			let toolbar = that._getToolbar(id);
			if(toolbar){
					toolbar.updateNodeModel(id,{
						disabled : false
					})
			}
		}));

		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-icon-update'
		}, function(item) {
			let genToolbar = that._getToolbar(item.id);
			let options = genToolbar.getNodeModelByID(item.id);

			genToolbar.updateNodeModel(item.id, {
				grid : {
					semantics : {
						icon : {
							iconName : item.iconName,
							fontIconFamily : item.fontIconFamily ? item.fontIconFamily : 1
						}
					}
				}
			})
		}));

		this._listSubscription
				.push(this._modelEvents
						.subscribe(
								{
									event : 'enox-collection-toolbar-update-item-count'
								},
								function(item) {
									let genToolbar = that._getToolbar(item.id);
									genToolbar.updateNodeModel(item.id,{
													count : item.count
											})
								}));


		this._listSubscription
					.push(this._modelEvents
								.subscribe(
								 {
															event : 'enox-collection-toolbar-update-menu'
								 },
								function(item) {
									let genToolbar = that._getToolbar(item.id);

								genToolbar.updateNodeModel(item.id,{
														grid : {
															data : {
																menu : item.menu
															}
														}
											});
								}));

		//
		// this._listSubscription.push(this._modelEvents.subscribe({
		// 	event : 'enox-collection-toolbar-add-action'
		// }, function(item) {
		// 	that._actionsIconBar.addItem({
		// 		id : item.id,
		// 		fonticon : item.icon,
		// 		text : item.title,
		// 		handler : item.onClick
		// 	});
		// 			if(that._options.useWebUITooltip) that._setWebUXTooltipOnIcon(item.id, {title : item.text,loadHelpRsc : item.loadHelpRsc });
		// }));
		//


		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-color-selected-action'
		}, function(data) {
			that._setColorIconSelected(data);
		}));


		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-enable-action'
		}, function(id) {
			that.genToolbar.updateNodeModel(id, {
				disabled : false
			})
		}));


		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-disable-action'
		}, function(id) {
			that.genToolbar.updateNodeModel(id, {
				disabled : true
			})
		}));

		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-node-updated'
		}, function(ctx) {
			// let visibleCount = 0;
			// let children = that.stableToolbarTreeDocument.getAllDescendants();
			// children.forEach((item) => {
			// 	if(item.options.visibleFlag == true)
			// 		visibleCount++
			// });
			//
			// if(that._options.touchMode){
			// 	that._stableContainer.style['flex-basis'] = visibleCount * 42 + 30  + ( that._options.withmultisel ? 69 : 0 ) + 'px';
			// }

		}));
		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-node-live-update'
		}, function(ctx) {

			//console.log(ctx)

		}));
		//
		// // Change Icon SUBSCRIPTION
		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-change-icon-action'
		}, function(item) {
			that.changeIcon(item.id, item.fonticon, item.text, item.fontiIconFamily);
		}));
		//
		// // Change Text Tooltip
		this._listSubscription
				.push(this._modelEvents
						.subscribe(
								{
									event : 'enox-collection-toolbar-change-text-tooltip-action'
								}, function(item) {
									that._updateTooltip(item.id,
											item.text);
								}));


		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-visibility-action'
		}, function(item) {
			let toolbar = that._getToolbar(item.id)
			toolbar.updateNodeModel(item.id, {
				visibleFlag : item.flag
			})

		}));


		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-display-menu'
		}, function(obj) {

			that._displayMenu(obj.menu, obj.container)

		}));

		this._listSubscription.push(this._modelEvents.subscribe({
			event : 'enox-collection-toolbar-change-select-subMenu-action'
		}, function(data) {
			that._selectSubMenuAction( data.id, data.selected);
		}));


		this._listSubscription
				.push(this._modelEvents
						.subscribe(
								{
									event : 'enox-collection-toolbar-visibility-iconMultipleActionBar'
								},
								function(flag) {

									that.stableToolbar.updateNodeMode('multisel',{
										visibleFlag : flag
									})

								}));


		//
		// // Event to set the state of the multiselection
		this._listSubscription
				.push(this._modelEvents
						.subscribe(
								{
									event : 'enox-collection-toolbar-active-iconMultipleActionBar'
								},
								function(flag) {

									that.stableGenToolbar.updateNodeModel('multisel',{
										grid : {
											semantics : {
															icon : {
																	iconName : item.fonticon,
																	fontIconFamily  : item.fontIconFamily ? item.fontiIconFamily : 1 ,
																	className : flag ? "enox-collection-toolbar-filter-activated" : ""
																			}
												 					}
											 		}
									})

								}));
		//
		//
		// 						var that = this;
		// 						function callBack(mutations){
		// 							for(let mutation of mutations){
		// 							let toolbar = mutation.target;
		// 							let resizeSensor = toolbar.querySelector('.resize-sensor');
		// 									if(mutation.isIntersecting){ //visible on viewport
		// 											if(resizeSensor == undefined || resizeSensor == null){
		// 												that.attachResizeSensor();
		// 												//intObserver.unobserve(that._container);
		// 											 }
		// 									}else if(resizeSensor){ //if container not visible on viewport
		// 										that.resizeSensor.detach();//no need for a resizeSensor listener
		// 									}
		//
		// 							}
		// 						};
		//
		// 					this._intersectionObserver = new IntersectionObserver(callBack)//,{trackVisibility:true,delay:100});
		// 					//isVisible is a new feature confirming the visibility of the container on the viewport
		// 					this._intersectionObserver.observe(this._container);

	};


  ENOXGeneratedToolBar.prototype._resizeFilter = function(mobileView){
		let that = this;
		let toolbarHeight = 36;//PC mode
		if(that._options.touchMode){
			toolbarHeight = 60
		}

		if(mobileView)
		{
				if(that._filterContainer.firstChild){
					//firstChild exist means still in tab or monitor view

					let searchFilter = that._container.querySelector('.searchInputFilter');
					that._filterContainer.removeChild(searchFilter);
					that._container.appendChild(searchFilter)

					searchFilter.style.width = '100%';
					searchFilter.style.position = 'absolute';
					searchFilter.style['margin-top'] = '50px';
					that._container.style.height = toolbarHeight + searchFilter.offsetHeight + 'px';
				}

				//that._countContainer.style.display = 'none';
		} else {
			if(typeof that._filterContainer.firstChild === undefined || that._filterContainer.firstChild == null ){
				//no child just moved to tab or monitor view
				let searchFilter =  that._container.querySelector('.searchInputFilter');
				that._container.removeChild(searchFilter)
				that._filterContainer.appendChild(searchFilter);

				searchFilter.style.width = '150px';
				searchFilter.style.position = '';
				searchFilter.style.margin = '';

			}
			that._container.style.height = toolbarHeight+ 'px';
		}

	}


	ENOXGeneratedToolBar.prototype._resizeToolbar = function(){
			let that = this;
			//that._stableContainer.style.width = that._stableContainer.querySelector('.wux-controls-toolbar-farContainer').getBoundingClientRect().width + 'px';




			let toolbarWidth = that._container.clientWidth;
			if(toolbarWidth == 0)
				return;

			let filterWidth = that._filterContainer.clientWidth;
			let unstableWidth = that._unstableContainer.clientWidth;
			let seperatorWidth = that._seperatorContainer.clientWidth;
			let stableWidth = that._stableContainer.clientWidth;

			let actionsWidth = unstableWidth + seperatorWidth +filterWidth +  stableWidth;
		//	let containerWidth = that._container.closest('')
				let smallerDevice;
				//tab and lower devices
				if(toolbarWidth < 600 ){//|| this._stableContainer.getBoundingClientRect().right > (window.innerWidth || document.documentElement.clientWidth)){
					smallerDevice = true;
				} else {
					smallerDevice = false;
				}

				if(that._options.showItemCount){
					if(smallerDevice){
					 	that._countContainer.style.display = 'none';
					} else {
						that._countContainer.style.display = '';
					}
				}

			if(that._filterActive){
					that._resizeFilter(smallerDevice)
			}else {
					that._resizeFilter(false)
			}


			// if(that._options.withmultisel)
			// 	that.genToolbar.updateNodeModel('multiSelToggle',{ visibleFlag : !mobile})

	}

	ENOXGeneratedToolBar.prototype.attachResizeSensor = function(){
		let that = this;
		//needed to be able to resize filter upon parent resizing
		that._resizeSensor = new ResizeSensor(that._container,function(){
			that._resizeToolbar();
		})

	}

	return ENOXGeneratedToolBar;

})
