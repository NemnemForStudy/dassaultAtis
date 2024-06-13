/*global define*/
define('DS/ENOXCADCommonSettingUI/Model/XCADCommonSettingModel',
    [
        'UWA/Class/Model'
    ], function (Model) {
        "use strict";
        return Model.extend({
            defaults: function() {
                return {
                    id: ''
                };
            }
        });
    });


/*global define, widget*/
define('DS/ENOXCADCommonSettingUI/Views/XCADCommonSettingViewUtilities',
    [
        'UWA/Core',
		'DS/UIKIT/Modal',
        'DS/UIKIT/Input/Button',
		'i18n!DS/ENOXCADCommonSettingUI/assets/nls/XCADCommonSettingViewNLS'
    ],
    function (UWA,
			  Modal, 
              Button,
              XCADCommonSettingViewNLS) {

        'use strict';

        var UIview = {
			
			createContentDiv : function() {
				var contentDiv = UWA.createElement('div', {'id': 'commonSettingMainDiv'});
				let hght = widget.getViewportDimensions().height;
				contentDiv.setStyle('height', hght - 170 + 'px');
				return contentDiv;
			},
						
            createInfoDiv : function (parentDiv) {
                var introDiv = UWA.createElement('div', {'class': 'information'}).inject(parentDiv);
				UWA.createElement ("br", {}).inject(introDiv);
                UWA.createElement('p', {
                    text   : XCADCommonSettingViewNLS.IntroductionText,
                    'class': 'font-3dslight',
					styles: {
						'margin-left': '20px'
					}					
                }).inject(introDiv);
            },			
			
            createApplyResetToolbar : function (insertdivID, activateApplyBtn, applyParams, confirmationModalShow) {
                var applyDiv, tableButtons, lineButtons, buttonApplyCell, applyBttn,
                    buttonResetCell, resetBbttn;
				
                applyDiv =  UWA.createElement('div', {
                    'id': 'ApplyResetDiv',
					styles: {
						'bottom': '2.5em'
					}
                }).inject(insertdivID);
                                            
                tableButtons = UWA.createElement('table', {
                    'class' : '',
                    'id' : '',
                    'width' : '100%'
                }).inject(applyDiv);

                lineButtons = UWA.createElement('tr').inject(tableButtons);

                if (activateApplyBtn === true) {
                    buttonApplyCell = UWA.createElement('td', {
                        'width' : '50%',
                        'Align' : 'left'
                    }).inject(lineButtons);

                    applyBttn =  new Button({
                        className: 'primary',
                        id : 'buttonExport',
                        icon : 'export',         
                        attributes: {
                            disabled: false,
                            title: XCADCommonSettingViewNLS.ApplyTooltipText,
                            text : XCADCommonSettingViewNLS.ApplyText
                        },
                        events: {
                            onClick: function () {
                                applyParams();
                            }
                        }
                    }).inject(buttonApplyCell);
                    applyBttn.getContent().setStyle("width", 130);
                }

                buttonResetCell = UWA.createElement('td', {
                    'width' : '50%',
                    'Align' : 'right'
                }).inject(lineButtons);

                resetBbttn = new Button({
                    className: 'warning',
                    icon: 'loop',
                    attributes: {
                        disabled: false,
                        title: XCADCommonSettingViewNLS.ResetTooltipText,
                        text : XCADCommonSettingViewNLS.ResetText
                    },
                    events: {
                        onClick: function () {                              
                            confirmationModalShow();
                        }
                    }
                }).inject(buttonResetCell);

                resetBbttn.getContent().setStyle("width", 130);
                return applyDiv;
            }						
			
        };

        return UIview;
    });

define('DS/ENOXCADCommonSettingUI/utils/URLHandler', [], function () {
  'use strict';

  var urlHandler = {
    init: function (url, tenant) {
      this.url = url;
      this.tenant = tenant;
    },

    setURL: function (url) {
      this.url = url;
    },

    getURL: function () {
      return this.url;
    },

    getTenant: function () {
      return this.tenant;
    },

    setTenant: function (itenant) {
      this.tenant = itenant;
    }
  };

  return urlHandler;
});

define('DS/ENOXCADCommonSettingUI/utils/AlertMessage', [
  'DS/UIKIT/Alert'
], function (Alert) {
  'use strict';

  return new Alert({
    className: 'param-alert',
    closable: true,
    visible: true,
    renderTo: document.body,
    autoHide: true,
    hideDelay: 3000,
    messageClassName: 'warning'
  });
});


/*global define, widget*/
define('DS/ENOXCADCommonSettingUI/Views/XCADConnectorOrderParamViewUtilities',
    [
        'UWA/Core',
		'DS/Controls/ComboBox',
		'DS/Controls/Button',		
		'DS/Controls/SelectionChips',		
		'DS/UIKIT/Accordion',
        'DS/UIKIT/Popover',
        'DS/UIKIT/Modal',
		'DS/UIKIT/Mask',
		'DS/UIKIT/Input/Button',
		'DS/WAFData/WAFData',
		'DS/ENOXCADCommonSettingUI/utils/URLHandler',
		'DS/ENOXCADCommonSettingUI/utils/AlertMessage',
		'i18n!DS/ENOXCADCommonSettingUI/assets/nls/XCADConnectorOrderParamViewNLS'
    ],
    function (UWA,
			  WUXComboBox,
			  WUXButton,
			  SelectionChips,	
              Accordion,
			  Popover,
              Modal,
			  Mask,
			  Button,
			  WAFData,
			  URLHandler,
			  AlertMessage,
			  XCADConnectorOrderParamViewNLS) {

        'use strict';

        var UIview = {
			
			createContentDiv : function() {
				var contentDiv = UWA.createElement('div', {
                        'id' : 'paramConnectorOrderDiv'
                    });
				let hght = widget.getViewportDimensions().height;
				contentDiv.setStyle('height', hght - 210 + 'px');
				contentDiv.setStyle('max-height', '210px');				
				return contentDiv;
			},
						
            createParamMainDiv : function (parentDiv) {
				var paramMainDiv = UWA.createElement('div', {
                        'id' : 'paramMainDiv'
                    }).inject(parentDiv);
				paramMainDiv.setStyle('height', "100%");
				return paramMainDiv;
            },

			createParamTable : function (parentDiv) {
                var paramTable = UWA.createElement('table', {
                    'class': 'table table-condensed'
                }).inject(parentDiv);
				return paramTable;
			},
			
			createParamTableBody : function (parentDiv) {
                var paramTableBody =  UWA.createElement('tbody', {
                    'class': 'fparamtbody'
                }).inject(parentDiv);
				return paramTableBody;
			},

            createFamilyUIKITAccordion : function (paramTable) {
                var iAccord = new Accordion({
                    className: 'styled divided filled',
                    exclusive: false,
                    items : []
                });
				iAccord.addItem({
					title: XCADConnectorOrderParamViewNLS.ConnectorOrderAccordText,
					content: paramTable,
					selected: true,
					name: "ConnectorOrderAccord"
				});				
                return iAccord;
            },
			
			buildConnectorOrderTableHeading: function () {
				const lineTitle = UWA.createElement('tr', {
					'class': 'success'
				});

				var iCell = UWA.createElement('td', {
					align: 'left',
					width: '35%'
				}).inject(lineTitle);

				UWA.createElement('h5', {
					text: XCADConnectorOrderParamViewNLS.ColumnParamNameHeader
				}).inject(iCell);

				iCell = UWA.createElement('td', {
					align: 'left',
					width: '10%'
				}).inject(lineTitle);

				UWA.createElement('h5', {
					text: XCADConnectorOrderParamViewNLS.ColumnParamInfoHeader
				}).inject(iCell);

				iCell = UWA.createElement('td', {
					align: 'left',
					width: '30%'
				}).inject(lineTitle);

				UWA.createElement('h5', {
					text: XCADConnectorOrderParamViewNLS.ColumnParamValueHeader
				}).inject(iCell);

				iCell = UWA.createElement('td', {
				  'Align' : 'center',
				  'width' : '10%',
				}).inject(lineTitle);

				UWA.createElement('h5', {
				  text   : XCADConnectorOrderParamViewNLS.ColumnParamActionsHeader
				}).inject(iCell);

				iCell = UWA.createElement('td', {
					align: 'center',
					width: '15%'
				}).inject(lineTitle);

				UWA.createElement('h5', {
					text: XCADConnectorOrderParamViewNLS.ColumnParamDeployStatusHeader
				}).inject(iCell);

				return lineTitle;
			},						

			addConnectorOrderParamRow: function (model, tableBody) {
				const that = this;

				const connectorOrderParamRow = UWA.createElement('tr');
				
				const cellParamName = UWA.createElement('td', {
					width: '45%',
					align: 'left'
				}).inject(connectorOrderParamRow);				
			  
				UWA.createElement('p', {
					text: XCADConnectorOrderParamViewNLS.ParamConnectorOrderName,
					'class': ''
				}).inject(cellParamName);
				
				const cellParamInfo = UWA.createElement('td', {
					width: '10%',
					align: 'left'
				}).inject(connectorOrderParamRow);				

				const imgInfoSpan = UWA.createElement('span', {
					'class': 'fonticon fonticon-info'
				}).inject(cellParamInfo);

				imgInfoSpan.setStyle('color', 'black');

				const popOver = new Popover({
					target: imgInfoSpan,
					trigger: 'hover',
					animate: 'true',
					position: 'top',
					body: XCADConnectorOrderParamViewNLS.ParamConnectorOrderInfoTooltip,
					title: ''
				});

				const cellParamValue= UWA.createElement('td', {
					width: '30%',
					align: 'left'
				}).inject(connectorOrderParamRow);
				
				const paramValueTable = UWA.createElement('table', {
					'class': 'table table-condensed',
					id: 'paramValueTable'
				}).inject(cellParamValue); 
				
				const selectionChipChildRow = UWA.createElement('tr').inject(paramValueTable);

				const cellSelectionChips = UWA.createElement('td', {
					width: '100%',
					colspan: 2
				}).inject(selectionChipChildRow);
				
				const rangeLabels = model.get('rangeLabels');
				const ranges = model.get('ranges');
				const valuesFromDB = model.get('valuesFromDB');				
				
				that.selectionChips = that.getSelectionChips(
					rangeLabels,
					ranges,
					valuesFromDB
				);
				that.selectionChips.inject(cellSelectionChips);
								
				that.selectionChipsBackup = that.selectionChips.getAllChipsOptions();
				
				that.selectionChips.addEventListener('change', function () {
					let addedChips = that.selectionChips.getAllChipsOptions();
					let addedChipsValues = addedChips.map(function (el) {
					  return el.value;
					});
					//if(addedChipsValues.length > 0){
						let valuesFromDB = model.get('valuesFromDB');
						let ranges = model.get('ranges');
						if((valuesFromDB.length > 0 && valuesFromDB.every(elem => addedChipsValues.includes(elem))) || 
						  (valuesFromDB.length == 0 && ranges.every(elem => addedChipsValues.includes(elem)))){
							that.selectionChipsBackup = that.selectionChips.getAllChipsOptions();
							model.set('valuesFromUI', addedChipsValues);
						} else {
							AlertMessage.add({
								className: 'error',
								message: XCADConnectorOrderParamViewNLS.XCADCanNotBeRemoved
							});
							that.selectionChips._preventEventsCpt++;
							that.selectionChips.removeAllChips();
							that.selectionChips.addChips(that.selectionChipsBackup);
							that.selectionChips._preventEventsCpt--;
						}
					//}										
				}); 

				that.cellParamActions = UWA.createElement('td', {
					width: '15%',
					align: 'center'
				}).inject(connectorOrderParamRow);
				
				let deployStatus = model.get('deployStatus');
				if(deployStatus !== 'NotDeployed')
				{
					that.createDeleteActionsIcon(model, that.cellParamActions);
				}				

				that.cellParamDeployStatus = UWA.createElement('td', {
					width: '15%',
					align: 'right'
				}).inject(connectorOrderParamRow);
								
				that.buildDeployStatusCell(deployStatus).inject(that.cellParamDeployStatus);
				
				connectorOrderParamRow.inject(tableBody);
			},

			buildDeployStatusCell: function (deployStatus) {
				const iconSize = '1';
				let imgClass, imgTitle, iconColor;

				switch (deployStatus) {
					case 'Deployed':
						imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-check';
						imgTitle = XCADConnectorOrderParamViewNLS.DeployedStatusText;
						iconColor = 'green';
						break;
					case 'NotDeployed':
						imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-cog';
						imgTitle = XCADConnectorOrderParamViewNLS.NotDeployedStatusText;
						iconColor = 'orange';
						break;
					case 'NewNotDeployed':
						imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-cog';
						imgTitle = XCADConnectorOrderParamViewNLS.NewValueNotDeployedStatusText;
						iconColor = 'black';
						break;
					case 'InvalidValueCanNotDeploy':
						imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-wrong';
						imgTitle = XCADConnectorOrderParamViewNLS.InvalidValueDeployStatusText;
						iconColor = 'red';
						break;
					default:
						break;
				}

				const imgCell = UWA.createElement('td', {
					width: '15%',
					align: 'center',
					title: imgTitle
				});

				const imgSpan = UWA.createElement('span', {
					'class': imgClass
				}).inject(imgCell);

				imgSpan.setStyle('color', iconColor);
				imgCell.setStyle('vertical-align', 'text-bottom');
				imgCell.setStyle('min-width', '46px');

				return imgCell;
			},

			getSelectionChips: function (rangeLabels, ranges, valuesFromDB) {
				const selectionChips = new SelectionChips({
					displayMenu: false,
					fireOnlyFromUIInteractionFlag: true
				});

				if(valuesFromDB.length > 0){
					for (let i = 0; i < valuesFromDB.length; i++) {
						if (ranges.includes(valuesFromDB[i])) {
							let index = ranges.indexOf(valuesFromDB[i]);
							selectionChips.addChip({
								label: rangeLabels[index],
								value: ranges[index]
							});
						}
					}
				}else{
					for (let i = 0; i < ranges.length; i++) {
						selectionChips.addChip({
							label: rangeLabels[i],
							value: ranges[i]
						});
					}					
				}

				selectionChips.getContent().setStyles({
					width: '100%',
					height: 'auto',
					'min-height': '50px'
				});

				return selectionChips;
			},
			
			resetConnectorOrderParam : function (paramModel) {
				var that = this;
				let valuesFromUI = paramModel.get('valuesFromUI');
				let valuesFromDB = paramModel.get('valuesFromDB');
				let ranges = paramModel.get('ranges');
				let rangeLabels = paramModel.get('rangeLabels');
				if(valuesFromUI !== valuesFromDB){
					that.selectionChips.removeAllChips();
					if(valuesFromDB.length > 0){
						for (let i = 0; i < valuesFromDB.length; i++) {
							if (ranges.includes(valuesFromDB[i])) {
								let index = ranges.indexOf(valuesFromDB[i]);
								that.selectionChips.addChip({
									label: rangeLabels[index],
									value: ranges[index]
								});
							}
						}					
						paramModel.set('deployStatus', 'Deployed');
					} else {
						for (let i = 0; i < ranges.length; i++) {
							that.selectionChips.addChip({
								label: rangeLabels[i],
								value: ranges[i]
							});
						}
						paramModel.set('deployStatus', 'NotDeployed');
					}
				}			
			},
			
			createDeleteActionsIcon: function(paramModel, actionCell)
			{
				var that = this;
				var deleteSpan, deleteButton, deletePop;

				deleteSpan = UWA.createElement('span');
				deleteButton = new Button({
					className: 'close',
					icon: 'fonticon fonticon-trash fonticon-1.5x',
					attributes: {
						disabled: false,
						'aria-hidden' : 'true'
					}
				}).inject(deleteSpan);
				deletePop = new Popover({
					target: deleteSpan,
					trigger : "hover",
					animate: "true",
					position: "top",
					body: XCADConnectorOrderParamViewNLS.deleteCADSequencing,
					title: ''
				});
				deleteSpan.inject(actionCell);
				
				deleteButton.addEvent("onClick", function (e) {
						that.deleteCADSequencingParams(paramModel);
					});
			},

            deleteCADSequencingParams : function (paramModel) {
				var that = this;
                UWA.log("XCADConnectorOrderParamViewUtilities::deleteCADSequencingParams!");

				let datatoSend = {};
				let mainDiv = document.getElementById("commonSettingMainDiv");
				Mask.mask(mainDiv);
				var url = URLHandler.getURL() + "/resources/xcadcommonsetting/services/cadsequencing/delete?tenant=" + URLHandler.getTenant();

				WAFData.authenticatedRequest(url, {
					timeout: 250000,
					method: 'POST',
					data: JSON.stringify(datatoSend),
					type: 'json',
					//proxy: 'passport',

					headers: {
						'Content-Type' : 'application/json',
						'Accept' : 'application/json',
						'Accept-Language' : widget.lang
					},

					onFailure : function (json) {
						that.onDeleteFailure.call(that,json);
					},

					onComplete: function(json) {
						that.onDeleteSuccess.call(that,json, paramModel);
					}
				});			
				
            },

			onDeleteFailure : function (json) {
				let mainDiv = document.getElementById("commonSettingMainDiv");
				Mask.unmask(mainDiv);
				AlertMessage.add({ className: "error", message: XCADConnectorOrderParamViewNLS.deleteErrorMessage });
			},

			onDeleteSuccess : function (json, paramModel) {	
				var that = this;
				let ranges = paramModel.get('ranges');
				let rangeLabels = paramModel.get('rangeLabels');
				that.selectionChips.removeAllChips();				
				for (let i = 0; i < ranges.length; i++) {
					that.selectionChips.addChip({
						label: rangeLabels[i],
						value: ranges[i]
					});
				}
				paramModel.set('deployStatus', 'NotDeployed');
				paramModel.set('valuesFromDB', []);		
				paramModel.set('valuesFromUI', ranges);					
				let mainDiv = document.getElementById("commonSettingMainDiv");
				Mask.unmask(mainDiv);
				AlertMessage.add({ className: "success", message: XCADConnectorOrderParamViewNLS.deleteSuccessMessage });
			}			
        };

        return UIview;
    });

/*global define*/
define('DS/ENOXCADCommonSettingUI/Model/XCADConnectorOrderParamModel',
    [
       'DS/ENOXCADCommonSettingUI/Model/XCADCommonSettingModel'
    ], function (XCADCommonSettingModel) {
        "use strict";
        return XCADCommonSettingModel.extend({
            defaults: function() {
                return {
                    id: '',
					paramid:'',
					ranges:'',
					rangeLabels:'',
					deployStatus:'',
					valuesFromDB:'',
					valuesFromUI:''
                };
            }
        });
    });

/*global define, widget*/
define('DS/ENOXCADCommonSettingUI/Collection/XCADCommonSettingCollection', [
    'UWA/Core',
	'UWA/Class/Model',
    'UWA/Class/Collection',
    'DS/ENOXCADCommonSettingUI/Model/XCADCommonSettingModel',
	'DS/ENOXCADCommonSettingUI/Model/XCADConnectorOrderParamModel',
    'DS/WAFData/WAFData',
    'DS/ENOXCADCommonSettingUI/utils/URLHandler'
], function (UWA, Model, Collection, XCADCommonSettingModel, XCADConnectorOrderParamModel, WAFData, URLHandler) {
    "use strict";

	var XCADCommonSettingCollection = Collection.extend({

	  model : function (attrs,options) {
			if(attrs.paramid === "XCADTemplateCADOrder"){
				return new XCADConnectorOrderParamModel(attrs, options);
			}else{
				return new XCADCommonSettingModel(attrs, options);
			}
      },

	  setup : function (models, options) {
		UWA.log('XCADCommonSettingCollection::setup!');
		UWA.log(options);
		URLHandler.setTenant(options.tenant);
		URLHandler.setURL(options.baseUrl);

		this.childCollection = null;
		this.url = URLHandler.getURL() + "/resources/xcadcommonsetting/services/getValues?tenant=" + URLHandler.getTenant();
	  },

	  sync : function(method, model, options) {
		  UWA.log("XCADCommonSettingCollection::sync!");

		  options.headers = {
			  Accept: 'application/json',
			  'Accept-Language' : widget.lang
		  };

		  options = Object.assign({
			  ajax: WAFData.authenticatedRequest
		  }, options);

		  this._parent.apply(this, [method, model, options]);
	  },


	  parse: function (data) {
			UWA.log("XCADCommonSettingCollection::parse!");
			var paramEntries = [];
			var paramValuesFromUI = [];
			var paramIdEntries = [];
			var paramNLSEntries = [];
			var paramValuesFromDB = [];	
			var paramDeploySatus = "";
			var paramDomainId = "XCADParameterization";
			var paramId = "XCADTemplateCADOrder";
			if(data.XCADTemplateCADOrder){	
				var connectorOrderData = data.XCADTemplateCADOrder;
				if (Array.isArray(connectorOrderData.rangeValues)) {
					connectorOrderData.rangeValues.forEach(function (iElement) {
						paramIdEntries.push(iElement);
					});				
				}
				
				if (Array.isArray(connectorOrderData.rangeLabels)) {
					connectorOrderData.rangeLabels.forEach(function (iElement) {
						paramNLSEntries.push(iElement);
					});				
				}
				
				if (Array.isArray(connectorOrderData.valuesFromDB)) {
					connectorOrderData.valuesFromDB.forEach(function (iElement) {
						if(iElement){
							paramValuesFromDB.push(iElement);
						}
					});				
				}
				
				if(paramValuesFromDB.length > 0){
					paramDeploySatus = 'Deployed';
					for (let elm of paramValuesFromDB) {
						paramValuesFromUI.push(elm);
					}
				}else{
					paramDeploySatus = 'NotDeployed';
					for (let elm of paramIdEntries) {
						paramValuesFromUI.push(elm);
					}					
				}
				paramEntries.push({
					ranges      : paramIdEntries,
					rangeLabels : paramNLSEntries,
					deployStatus: paramDeploySatus,
					valuesFromDB: paramValuesFromDB,
					valuesFromUI: paramValuesFromUI,
					domainid    : paramDomainId,
					paramid     : paramId, 
					id 			: paramId				
				});	
			}			

          return paramEntries;
	  },

	  create : function(attributes, options) {
			UWA.log("XCADCommonSettingCollection::create!");
			options.proxy = 'passport';
			this._parent.apply(this, [attributes, options]);
	  }

	});

	return XCADCommonSettingCollection;
});

/*global define*/
define('DS/ENOXCADCommonSettingUI/Views/XCADConnectorOrderParamView',
    [
        'UWA/Core',
        'UWA/Class/View',
        'DS/UIKIT/Modal',
		'DS/UIKIT/Scroller',
		'DS/ENOXCADCommonSettingUI/Views/XCADConnectorOrderParamViewUtilities'		
    ],
    function (UWA,
			  View,
              Modal,
			  Scroller,			  
			  XCADConnectorOrderParamViewUtilities) {

        'use strict';

        var extendedView;

        extendedView = View.extend({
            tagName: 'div',
            className: 'generic-detail',

            init: function (options) {
				UWA.log('XCADConnectorOrderParamView::init!');
                var initDate =  new Date();

                options = UWA.clone(options || {}, false);
                this._parent(options);
                this.contentDiv = null;
				this.paramScroller = null;
				this.paramMainDIV = null;
            },

            setup: function(options) {
                UWA.log('XCADConnectorOrderParamView::setup!');
                UWA.log(options);
				const that = this;
				
				that.listenTo(
					that.model,
					'onChange:valuesFromUI',
					that.valueOnChangeHandler
				);

				that.listenTo(
					that.model,
					'onChange:deployStatus',
					that.deployStatusOnChangeHandler
				);				
            },

			valueOnChangeHandler: function (model, options) {
				const that = this;

				if (options) {
					let valuesFromDB = model.get('valuesFromDB');
					if(valuesFromDB.length > 0){
						model.set('deployStatus', 'NewNotDeployed');
					}else{
						model.set('deployStatus', 'NotDeployed');
					}
				} else {
					model.set('deployStatus', 'InvalidValueCanNotDeploy');
				}
			},
	
			deployStatusOnChangeHandler: function (model, options) {
				const that = this;
				XCADConnectorOrderParamViewUtilities.cellParamDeployStatus.innerHTML = '';
				XCADConnectorOrderParamViewUtilities.buildDeployStatusCell(options).inject(
					XCADConnectorOrderParamViewUtilities.cellParamDeployStatus
				);
				if(options === 'Deployed'){
					XCADConnectorOrderParamViewUtilities.cellParamActions.innerHTML = '';
					XCADConnectorOrderParamViewUtilities.createDeleteActionsIcon(model, XCADConnectorOrderParamViewUtilities.cellParamActions);
				}else if(options === 'NotDeployed'){
					XCADConnectorOrderParamViewUtilities.cellParamActions.innerHTML = '';
				}
			},

            render: function () {
                UWA.log("XCADConnectorOrderParamView::render!");

                var that = this;
														
                this.contentDiv = XCADConnectorOrderParamViewUtilities.createContentDiv();
					
                this.paramMainDIV = XCADConnectorOrderParamViewUtilities.createParamMainDiv(this.contentDiv);											
				widget.addEvent('onResize', function () {
					let hght = widget.getViewportDimensions().height;
					that.contentDiv.setStyle('height', hght - 210 + 'px');
				});				

				const paramTable = XCADConnectorOrderParamViewUtilities.createParamTable(this.paramMainDIV);
				const paramTableBody = XCADConnectorOrderParamViewUtilities.createParamTableBody(paramTable);
				
				var tableHeaderLine =  XCADConnectorOrderParamViewUtilities.buildConnectorOrderTableHeading();
				tableHeaderLine.inject(paramTableBody);
				
				XCADConnectorOrderParamViewUtilities.addConnectorOrderParamRow(this.model, paramTableBody);
				
				const accord = XCADConnectorOrderParamViewUtilities.createFamilyUIKITAccordion(paramTable);								
				accord.inject(this.paramMainDIV);

                this.paramScroller = new Scroller({
                    element:this.paramMainDIV
                }).inject(this.contentDiv);
				
                that.container.setContent(this.contentDiv);
				
                return that;
            },

            onCompleteRequestParameters : function() {
                UWA.log("XCADConnectorOrderParamView::onCompleteRequestParameters!");
            },			

            destroy : function() {
                this.stopListening();
                this._parent.apply(this, arguments);
            }

        });

        return extendedView;
    });

/*global define*/
define('DS/ENOXCADCommonSettingUI/Views/XCADCommonSettingView',
    [
        'UWA/Core',
        'UWA/Class/View',
        'DS/UIKIT/Modal',
        'DS/UIKIT/Mask',
		'DS/ENOXCADCommonSettingUI/Views/XCADConnectorOrderParamView',
		'DS/ENOXCADCommonSettingUI/Views/XCADConnectorOrderParamViewUtilities',
		'DS/ENOXCADCommonSettingUI/Views/XCADCommonSettingViewUtilities',
		'DS/WAFData/WAFData',
		'DS/ENOXCADCommonSettingUI/utils/URLHandler',
		'DS/ENOXCADCommonSettingUI/utils/AlertMessage',
		'i18n!DS/ENOXCADCommonSettingUI/assets/nls/XCADCommonSettingViewNLS'
    ],
    function (UWA,
			  View,
              Modal,
			  Mask,
			  XCADConnectorOrderParamView,
			  XCADConnectorOrderParamViewUtilities,
			  XCADCommonSettingViewUtilities,
			  WAFData,
			  URLHandler,
			  AlertMessage,
			  XCADCommonSettingViewNLS) {

        'use strict';

        var extendedView;

        extendedView = View.extend({
            tagName: 'div',
            className: 'generic-detail',

            init: function (options) {
				UWA.log('XCADCommonSettingView::init!');
                var initDate =  new Date();

                options = UWA.clone(options || {}, false);
                this._parent(options);

                this.contentDiv = null;
				this.controlDiv = null;
            },

            setup: function(options) {
                UWA.log('XCADCommonSettingView::setup!');
                UWA.log(options);
            },

            render: function () {
                UWA.log("XCADCommonSettingView::render!");
				
                var that = this;

                that.contentDiv = XCADCommonSettingViewUtilities.createContentDiv();
                Mask.mask(that.contentDiv);
								
				widget.addEvent('onResize', function () {
					let hght = widget.getViewportDimensions().height;
					that.contentDiv.setStyle('height', hght - 170 + 'px');
				});				
	  							
				XCADCommonSettingViewUtilities.createInfoDiv(that.contentDiv);

                that.controlDiv = XCADCommonSettingViewUtilities.createApplyResetToolbar.call(that, that.contentDiv, true,
                                                                  that.applyCommonSettingParams.bind(that), that.resetCommonSettingParamsInSession.bind(that));				
  
				that.contentDiv.inject(that.container);
				
				this.listenTo(this.collection, {
					onSync: that.onCompleteRequestParameters
				});				
				
				Mask.unmask(that.contentDiv);
                return this;
            },

            onCompleteRequestParameters : function() {
                UWA.log("XCADCommonSettingView::onCompleteRequestParameters!");
				var that = this;
				for (let i = 0; i < this.collection._models.length; i++) {
					var paramModel = this.collection._models[i];
					if(paramModel._attributes.paramid === "XCADTemplateCADOrder"){
						new XCADConnectorOrderParamView({model: paramModel}).render().container.inject(that.contentDiv);
					}
				}
            },

            resetCommonSettingParamsInSession : function () {
				UWA.log("XCADCommonSettingView::resetCommonSettingParamsInSession!");
				Mask.mask(this.contentDiv);
				for (let i = 0; i < this.collection._models.length; i++) {
					var paramModel = this.collection._models[i];
					if(paramModel._attributes.paramid === "XCADTemplateCADOrder"){
						XCADConnectorOrderParamViewUtilities.resetConnectorOrderParam(paramModel);
					}
				}
				Mask.unmask(this.contentDiv);
            },

            applyCommonSettingParams : function () {
				var that = this;
                UWA.log("XCADCommonSettingView::applyCommonSettingParams!");

				let datatoSend = {};
				for (let i = 0; i < this.collection._models.length; i++) {
					var paramModel = this.collection._models[i];
					if(paramModel._attributes.paramid === "XCADTemplateCADOrder"){
						let valuesFromUI = paramModel.get('valuesFromUI');
						let valuesFromDB = paramModel.get('valuesFromDB');
						if(valuesFromUI !== valuesFromDB){
							datatoSend["XCADTemplateCADOrder"] = { "valuesFromUI" : valuesFromUI.toString()};
						}
					}
				}
				
				if(Object.keys(datatoSend).length !== 0){
					Mask.mask(this.contentDiv);
					var url = URLHandler.getURL() + "/resources/xcadcommonsetting/services/deploy?tenant=" + URLHandler.getTenant();

					WAFData.authenticatedRequest(url, {
						timeout: 250000,
						method: 'POST',
						data: JSON.stringify(datatoSend),
						type: 'json',
						//proxy: 'passport',

						headers: {
							'Content-Type' : 'application/json',
							'Accept' : 'application/json',
							'Accept-Language' : widget.lang
						},

						onFailure : function (json) {
							that.onApplyFailure.call(that,json);
						},

						onComplete: function(json) {
							that.onApplySuccess.call(that,json);
						}
					});	
				}				
				
            },

			onApplyFailure : function (json) {
				Mask.unmask(this.contentDiv);
				AlertMessage.add({ className: "error", message: XCADCommonSettingViewNLS.applyErrorMessage });
			},

			onApplySuccess : function (json) {
				for (let i = 0; i < this.collection._models.length; i++) {
					var paramModel = this.collection._models[i];
					if(paramModel._attributes.paramid === "XCADTemplateCADOrder"){
						let valuesFromUI = paramModel.get('valuesFromUI');
						let valuesFromDB = paramModel.get('valuesFromDB');
						if(valuesFromUI !== valuesFromDB){				
							paramModel.set('valuesFromDB', valuesFromUI);
							if(valuesFromUI.length > 0){
								paramModel.set('deployStatus', 'Deployed');	
							} else {
								paramModel.set('deployStatus', '');	
							}
						}
					}
				}				
				
				Mask.unmask(this.contentDiv);
				AlertMessage.add({ className: "success", message: XCADCommonSettingViewNLS.applySuccessMessage });
			},
			
            destroy : function() {
                this.stopListening();
                this._parent.apply(this, arguments);
            }

        });

        return extendedView;
    });


/*global define, widget*/
define('DS/ENOXCADCommonSettingUI/Views/XCADCommonSettingLayoutView',
    [
        'UWA/Core',
        'UWA/Class/View',
        'DS/ENOXCADCommonSettingUI/Views/XCADCommonSettingView'
    ], function (UWA, View, XCADCommonSettingView) {

        'use strict';

        return View.extend({

            defaultOptions: {
                type: 'default'
            },

            init : function (options) {
                UWA.log("XCADCommonSettingsLayoutView::init!");
                UWA.log(options);
                this.options = options;
                this.childView = null;
            },

            render: function () {
				UWA.log("XCADCommonSettingsLayoutView::render!");
                var options = this.options;
				var xCADCommonSettingView = new XCADCommonSettingView(options);
				this.childView = xCADCommonSettingView;
				return xCADCommonSettingView.render();
            },

            destroy : function() {
				UWA.log("XCADCommonSettingsLayoutView::destroy!");
                this.childView.destroy();
                this.stopListening();
                this._parent.apply(this, arguments);
            }

        });
    });

