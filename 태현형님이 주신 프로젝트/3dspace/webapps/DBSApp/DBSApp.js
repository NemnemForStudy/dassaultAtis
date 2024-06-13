define('DS/DBSApp/Utils/URLHandler',
    [
    ], function () {
        "use strict";

        var iHandler = {
            //
            init: function (url, tenant, uri, SC) {
                this.url = url;
                this.tenant = tenant;
                this.serverUri = uri;
                this.SC = SC;
            },

            setURL : function(url) {
                this.url = url;
            },

            getURL : function() {
                return this.url;
            },

            setTenant : function (itenant) {
                this.tenant = itenant;
            },

            getTenant : function() {
                return this.tenant;
            },

            setServerUri : function(iUri) {
                this.serverUri = iUri
            },

            getServerUri : function() {
                return this.serverUri;
            },

            setSecurityContext : function(iSC) {
                this.SC = iSC;
            },

            getSecurityContext : function() {
                return this.SC;
            },

            get3DSpaceWSUrl: function(webservice, params) {
                var tenant = this.tenant || 'OnPremise';
                var path = this.url + webservice + '?tenant=' + tenant;
                if (params) {
                    path = path + '&' + params.join('&');
                }
                return path;
            },

            getDicoWSUrl: function(webservice, params) {
                var pkgs = [
                    "DMSPackDefault_01", // Package SPE IRPC
                    "DMSPackDefault_02", // Package SPE ER
                    "DMSPackDefault_03", // Package DEP IRPC
                    "DMSPackDefault_04", // Package DEP ER
                    "DMSPackDefault_05"  // Package Global attributes
                    // "ClassificationDefaultPack" // Classification Global Attributes excluded from DMS
                ];
                var args = pkgs.map(function(v) { return "package="+v;}).concat(params || []);
                args.push("maxAge=0");
                return this.get3DSpaceWSUrl(webservice, args);
            },

            getDicoCustoUrl: function(params) {
                return this.getDicoWSUrl('/resources/dictionary/DictionaryCUSTO', params);
            }

        };

        return iHandler;
    });

define('DS/DBSApp/Views/Layouts/attributesLayout',
	[
	  	'UWA/Core',
	  	'UWA/Class/View',
        'DS/UIKIT/Modal'/*,
        'DS/Windows/ImmersiveFrame',
        'DS/Windows/Panel'*/

	], function (UWA, View, Modal/*, ImmersiveFrame, Panel*/) {

		'use strict';
        /*
        This class generates all the views in the process View. In other words, it's the "leader" view.
        */
        return View.extend({
            tagName: 'div',
            className: 'AttributesView',

            init: function(/*frame*/options){
            	UWA.log("attributesLayout::init");
            	/*this.immersiveFrame = frame;*/

                //An ImmersiveFrame object is Mandatory to use Panels. We add these to the immersive Frame.
                //this.immersiveFrame = new ImmersiveFrame();

                this.modal = null;
                this.editor = null;
                this.persistJSONObject = null;
                this.content = null;
                options = UWA.clone(options || {}, false);
                this._parent(options);


            },

            setup : function(options){
                UWA.log("attributesLayout::setup");
                var that = this;
                UWA.log(that);
                //this.listenTo(this.model, {onChange: that.buildAttributesTableContent});
                //that.listenTo(that.collection, "onChange", that.render);
                //that.listenTo(that.model, "onSync", that.render);
                this.listenTo(this.collection, {
                	onSync: that.updateAttributeTableContent
                });
                /*this.listenTo(this.model.actions, {
                	onChange: that.updateAttributeTableContent("test1")});*/
                this.listenTo(this.model, {
                	onChange: that.updateAttributeTableContent
                });

                //this.content = /*UWA.createElement('div', { //*/new UWA.Element("div");
                //this.buildAttributesTableContent(model);


                /*this.modal = new Modal({
                    className: 'site-reset',
                    closable: true
                }).inject(widget.body);
                this.modal.hide();*/

                /*UWA.log(this.container);
                this.container.setContent(this.content);
                this.editor = new Modal({
                    className: 'site-reset',
                    closable: true
                }).inject(widget.body);
                this.editor.hide();*/

                //Instantiation of the left Panel, which contains a Form that will retrieve a JSON File containing the type and the action requested.
               /* this.leftPanel = new Panel({
                    closeButtonFlag: false,
                    width: 200,
                    //height: widget.getViewportDimensions().height - this.immersiveFrame.height,
                    resizableFlag: false,
                    titleBarVisibleFlag: false,
                    movableFlag: false,
                    currentDockArea: WUXDockAreaEnum.LeftDockArea,
                    verticallyStretchableFlag: true,
                    position: {
                        my: 'top left',
                        at: 'bottom left',
                        of: this.immersiveFrame
                    }
                });

                //Instantion of the Center Panel, which contains the eGraph.
                this.centerPanel = new Panel({
                    closeButtonFlag: false,
                    maximizedFlag: true,
                    titleBarVisibleFlag: false,
                    resizableFlag: true,
                    movableFlag: false,
                    position: {
                        my: 'bottom',
                        at: 'bottom',
                        of: this.immersiveFrame
                    }
                });

                //Instantiation of the top Panel, which contains the caption for the graph
                this.topPanel = new Panel({
                    closeButtonFlag: false,
                    height: 100,
                    //height: widget.getViewportDimensions().height - this.immersiveFrame.height,
                    resizableFlag: false,
                    titleBarVisibleFlag: false,
                    movableFlag: false,
                    currentDockArea: WUXDockAreaEnum.TopDockArea,
                    verticallyStretchableFlag: true,
                    horizontallyStretchableFlag: true,
                    position: {
                        my: 'top',
                        at: 'top',
                        of: this.immersiveFrame
                    }
                });*/



            },

            /*
            Render is the core method of a view, in order to populate its root container element, with the appropriate HTML.
            The convention is for render to always return this.
            */
            render : function(){
                UWA.log("attributesLayout::render");
                UWA.log(this);
                //We set the Left Panel Content thanks to the getContentPanel() method, from the ProcessLeftPanelView class.
                //this.leftPanel.content = ProcessLeftPanelView.getContentPanel(this);

                //this.topPanel.content = ProcessTopPanelView.getContentPanel()

                //It is mandatory to add the panel to the immersive Frame that will act as a container.
                //this.immersiveFrame.addWindow(this.leftPanel);

                //this.immersiveFrame.addWindow(this.topPanel);

                //Then, we have to inject the immersive Frame to the content of this View.
               //this.immersiveFrame.inject(this.content);

                //Finally, we have to set the content of the View with the property content, containing the Immersive Frame.
                this.content = UWA.createElement('div', {
                    'id': 'table-div'
                });
                this.buildAttributesTableContent();
                this.container.setContent(this.content);

                //Render always return this, this allows to chain view methods.
                return this;
            },

            buildAttributesTableContent : function(data) {
            	UWA.log("buildTable");
            	UWA.log(data);
                var dplWdthArr = [40, 10, 25, 25, 190],
                table,tbody,thead,firstLine;

            	table = UWA.createElement('table', {
                    'class': 'table table-hover',//'tableImportExport',
                    'id': 'attrTable'
                }).inject(this.content);

                thead =  UWA.createElement('thead', {
                    'class': 'attrthead',
                    'id': 'attrthead'
                }).inject(table);

                tbody =  UWA.createElement('tbody', {
                    'class': 'attrtbody',
                    'id': 'attrtbody'
                }).inject(table);

                firstLine = UWA.createElement('tr').inject(thead);

                UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left',
	                    'text' : 'Name'
               		}).inject(firstLine);
                UWA.createElement('p', {
                    text : "Type",
                    'class': ''
                }).inject(
                    UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left'
               		}).inject(firstLine)
               	);
                UWA.createElement('p', {
                    text : "Multi-Value",
                    'class': ''
                }).inject(
                    UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left'
               		}).inject(firstLine)
               	);
                UWA.createElement('p', {
                    text : "DefaultValue",
                    'class': ''
                }).inject(
                    UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left'
               		}).inject(firstLine)
               	);
                UWA.createElement('p', {
                    text : "Depreciated",
                    'class': ''
                }).inject(
                    UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left'
               		}).inject(firstLine)
               	);
               	this.tbody = tbody;
            },

            updateAttributeTableContent : function() {
            	UWA.log("updateTable");
            	UWA.log(this);
							var attributes = this.collection._models;
            	var length = attributes.length;

	            for (var i = 0; i < length; i++) {
	            	var attr = attributes[i];
	                var row = UWA.createElement('tr').inject(this.tbody);
	                /*var p = UWA.createElement('p', {
	                    //title: ext['name'],
	                    text: "test"
	                });*/
	                UWA.createElement('p', {text : attr._attributes['id']}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                UWA.createElement('p', {text : attr._attributes['subtitle']}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                UWA.createElement('p', {text : attr._attributes['multivaluated']}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                UWA.createElement('p', {text : attr._attributes['defaultValue']}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                UWA.createElement('p', {text : ''}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                /*var span = UWA.createElement("span",{styles:{"cursor": "pointer;"},id:ext['name']});
	                span.className = 'fonticon fonticon-2x fonticon-exchange-delete';
	                span.inject(UWA.createElement('td', {'align':'center','width':'20%'}).inject(row));
	                span.onclick = function(currElmt){
	                    var currSpan = currElmt.target;
	                    that.changeClass(currSpan,that.extensionsToDelete)
	                };*/
            	}
            },

            /*
            displayCenterPanel function is called from the getContentPanel() method of the ProcessLeftPanelView class.
            It receives as Parameters, the type and action chosen from the left panel, and the JSONObject containing all the necessary informations.
            */
            displayCenterPanel : function(type, action, persistJSONObject){
                UWA.log("ProcessView::displayCenterPanel");

                //Global value
                this.persistJSONObject = persistJSONObject;

                //We set the Left Panel Content thanks to the getContentPanel() method, from the ProcessEGraphView class.
                //this.centerPanel.content = ProcessEGraphView.getContentPanel();

                //We add the Center Panel to the Immersive Frame to display it, only when the form from the left Panel is submitted.
                //this.immersiveFrame.addWindow(this.centerPanel);

                //This method is used for the display of the arrows from eGraph
                //ProcessEGraphView.addEdgeArrowDesign();

                //Calls the method getGraph from ProcessEGraphView class
                //ProcessEGraphView.getGraph(this, type, action, this.persistJSONObject);
            },


            /*
            displayCreatePanel function is called from the buildNodeElement() method of the myNodeView class. In other words, it is called
            when we click on the create button of an opening node.
            It receives as Parameters, the type and action chosen from the left panel, and the step of the node
            */
            displayCreatePanel : function(type, opening, action, step){
                UWA.log("ProcessView::displayCreatePanel");

                this.modal.setHeader('<h4>Add a New Business Rule</h4>');

                this.modal.setBody(CreateFormView.getContentPanel(this, type, opening, action, step, this.persistJSONObject));

                this.modal.show();
            },

            /*
            displayEditPanel function is called from the buildNodeElement() method of the myNodeView class. In other words, it is called
            when we click on the edit button of a BR node.
            It receives as Parameters, the type and action chosen from the left panel, and the metadata associated with each node : name,
            description, factType, policy, precedence, step, number etc.
            */
            displayEditPanel : function(type, action, name, description, factType, policy, precedence, step, number){
                UWA.log("ProcessView::displayEditPanel");

                this.modal.setHeader('<h4>Edit Business Rule</h4>');

                this.modal.setBody(EditFormView.getContentPanel(this, type, action, name, description, factType, policy, precedence, step, number, this.persistJSONObject, false, false));

                this.modal.show();
            },

            /*
            displayTextEditorPanel function is called from the getContentPanel() method of the CreateFormView class. In other words, it is called
            when we click on the pencil button in the creation Form.
            It receives as Parameters, the body code written by the user.
            */
            displayTextEditorPanel : function(code){
                UWA.log("ProcessView::displayTextEditorPanel");

                this.editor.setHeader('<h4>Dassault Text Editor</h4>');

                this.editor.setBody(TextEditorView.getContentPanel(code));

                this.editor.show();
            },

            /*
            Refresh function is called whenever the user do an action in the processEGraph View : creation, deletion, edition.
            This function re-display the eGraph with the according changes.
            It receives as Parameters, the type and action chosen from the left panel and the JSON containing the informations.
            */
            refresh : function(type, action, getJSON){
                UWA.log("attributesLayout::refresh");
                this.persistJSONObject = getJSON;

                this.modal.hide();
                this.editor.hide();

                //We need to display again the center panel for refreshing
                this.displayCenterPanel(type, action, this.persistJSONObject);

            },

            destroy : function() {
            	UWA.log("attributesLayout::destroy");

            	this.stopListening();

                this._parent();
            }




        });

});

define('DS/DBSApp/Utils/Renderers/ToolsRenderer',
[
],
function() {
	"use strict"
	var rootMenu = {
		collection: 'DS/DBSApp/Collections/ToolsCollection',
		view: 'DS/DBSApp/Views/ToolsLayoutView',
		// General View options
		viewOptions: {
			useInfiniteScroll: false,
			usePullToRefresh: false,
			contents: {
				events: {
				}
			}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				description: 'subtitle'
			},

			events: {
			}
		}
	};
	return rootMenu;
});

define('DS/DBSApp/Collections/DMSMenuCollection',
[
	'UWA/Core',
	'UWA/Class/Collection',
	'WebappsUtils/WebappsUtils',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
],
function(UWA, Collection, WebappsUtils, myNLS) {
	"use strict";

	return Collection.extend({
		//No initial model passed, because there is only 1 Tile ("Manage Business Rule").

		/*
		Setup function is called when initializing a newly created instance of collection.
		It is not called in my application code because it is internally used.
		It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
		*/
		setup: function() {
			UWA.log("DMSMenuCollection::setup");
			this.url = WebappsUtils.getWebappsAssetUrl('DBSApp', 'DMSTools.json');
		},

		/*
		Parse function is used to transform the backend response into an array of models.
		It is not called in my application code because it is internally used.
		The parameter "data" corresponds to the raw response object returned by the backend API.

		It returns the array of model attributes to be added to the collection.
		*/
		parse: function(data) {

			var menu = data;//DMSTools;
			UWA.log("DMSMenuCollection::parse");
			if (Array.isArray(menu)) {
				menu.forEach(function(iElement) {
					iElement['image'] = WebappsUtils.getWebappsAssetUrl('DBSApp', iElement['image']);
					iElement['subtitle'] = "<span title='"+myNLS.get(iElement['subtitle'])+"'>"+myNLS.get(iElement['subtitle'])+"</span>";
					iElement['title'] = myNLS.get(iElement['title']);
				});
			}
			return menu;

		}

	});

});

define('DS/DBSApp/Utils/UuidHandler',
  [],
  function() {

    'use strict';

    function UuidHandler(aUuid) {
      if (!(this instanceof UuidHandler)) {
        throw new TypeError("UuidHandler constructor cannont be called as a function.");
      }
      this._uuid = aUuid;
    }
    UuidHandler.separator = "-",
      UuidHandler.create_UUID = function() {
        var separator = UuidHandler.separator;
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx' + separator + 'xxxx' + separator + '4xxx' + separator + 'yxxx' + separator + 'xxxxxxxxxxxx';
        uuid = uuid.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        var result = new UuidHandler(uuid);
        return result;
      };
    UuidHandler.prototype = {
      constructor: UuidHandler,

      getUuid: function() {
        return this._uuid;
      },
      setUuid: function(aUuid) {
        this._uuid = aUuid;
      },
      getSeparator: function() {
        UuidHandler.separator;
      },
      getUuidWithoutSeparator: function() {
        var tmpUuid = this._uuid;
        var myRegExp = new RegExp(UuidHandler.separator, 'g');
        return tmpUuid.replace(myRegExp, '');
      }

    };
    return UuidHandler;
  });

define('DS/DBSApp/Models/AttributeModel', [
	'UWA/Core',
	'UWA/Class/Model',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS',
], function(UWA, Model, myNls) {
	"use strict";

	return UWA.extend(Model.extend({
		defaults:  {
			//Metadata associated with the model returned
			//Every model must specify an ID
			id: '',
			//Properties for the tile object
			title: '',
			subtitle: '',
			content: '',
			//Properties for the data Model
			multivaluated: '',
			defaultValue: '',
			type: '',
			isInherited: '',
			isOOTBAttr: ''
		},

		parse: function(response, options) {
			var resultat;
			response['isInherited']=this._computeIsInherited(response['isInherited']);
			var internalName = response['Name'];
			var nls_key = "";
			if (response['Local'] == "Yes") {
				nls_key = response['Nature'] + "." + response['Owner'];
			} else {
				nls_key = response['Nature'];
			}
				//BMN2 ODT Jasmine 31-03-2022 : var externalName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(internalName, nls_key) : dicoHandler.getDisplayName(internalName);
			var externalName = response["ExternalName"];
			var internalParentName = response['Owner'];
			if (internalParentName == "" && response['Local'] == "No" && response.generatedOwner) {
				internalParentName = response.generatedOwner;
			}
			var nls_Key_Owner = ""
			if (response.hasOwnProperty("ownerNature")) {
				nls_Key_Owner = response.ownerNature;
			}
			//BMN2 ODT Jasmine 31-03-2022 : var externalParentName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(internalParentName, nls_Key_Owner) : dicoHandler.getDisplayName(internalParentName);
			var externalParentName = response["ExternalParentName"];
			var attrNatureNLS = this.getNLSForAttrType(response['Type']);
			var multivalueNLS = response['MultiValuated'] === "Yes" ? myNls.get("labelYes") : myNls.get("labelNo");
			resultat = {

				//Metadata associated with the model returned
				//Every model must specify an ID
				id: internalName,
				//Properties for the tile object
				title: externalName,
				subtitle: attrNatureNLS,
				//Properties for the data Model
				type: response['Type'],
				owner: externalParentName,
				ownerId: internalParentName,
				ownerNature: response.ownerNature,
				isOOTBAttr: response['isOOTBAttr'],
				isInherited: response['isInherited'],
				isLocal: response['Local'],
				maxLength: response['MaxLength'],
				resetOnClone: response['ResetOnClone'],
				resetOnRevision: response['ResetOnRevision'],
				resetOnFork: response['ResetOnFork'],
				multivaluated: response['MultiValuated'],
				multiValueNLS: multivalueNLS,
				multiLine: response['MultiLine'],
				protection: response['Protection'],
				hasRangeDefined: response['HasRangeDefined'],
				range: response['AuthorizedValues'],
				hasMagnitude: response['HasMagnitude'],
				rangeNls: response['AuthorizedValuesNLS'],
				dimension: response['Dimension'],
				manipulationUnit: response['ManipulationUnit'],
				defaultValue: response['Default'],
				userAccess: response['UIAccess'],
				predicate: response['SixWPredicate'],
				searchable: response['Indexation'],
				exportable: response['V6Exportable'],
				nlsList: response["NameNLS"],
				DMSStatus: response['DMSStatus'],
				hasDefault: response['HasDefault']
			};
			// BMN2 01-04-2022	: Done on AttrOfTypeCollection
			// if(resultat.nlsList==undefined && resultat.isOOTBAttr != undefined && resultat.isOOTBAttr=="No"){
			//	 resultat.nlsList = dicoHandler.getListNameNLSFromDico(internalName,nls_key);
			// }
			// BMN2 11/12/2020 : IR-811449-3DEXPERIENCER2021x
			// TODO: We have to implement also for other type of attribute like
			// Boolean and String (may be Attribute with dimension)
			
			// BMN2 ODT Jasmine 31-03-2022 :
			if (response.Type === "Date" && response.Default != "") {
				var date = new Date(response.Default * 1000);
				var displayValue = date.toLocaleDateString(options.lang + "-" + options.locale, {
					weekday: "short",
					month: "short",
					day: "numeric",
					year: "numeric"
				});
				resultat["defaultValueNLS"] = displayValue;
			} else {
				resultat["defaultValueNLS"] = response.Default;
			}
			return resultat;
		},
		// Quelle est l'utilité de cette méthode ?????
		sync: function(method, model, options) {
			UWA.log(this);
			var id, attrs, idAttrName, resp, errorMessage;
			if (method === 'create' || method === 'update' || method === 'patch') {
				attrs = model.toJSON(options);
			}
			id = model.id;
			idAttrName = model.idAttribute;
		},
		_computeIsInherited: function (aVal) {
			let toRet = "No";
			if (typeof aVal == "undefined") {
				toRet = "No";
			} else {
				toRet = aVal;
			}
			return toRet;
		},

		getFullName: function() {
			if (this.isLocal()) {
				return this.get("ownerId") + "." + this.get("id");
			}
			return this.get("id");
		},
		isDate: function(){
			return this.getType() === "Date" ? true : false;
		},
		isString: function() {
			return this.getType() === "String" ? true : false;
		},
		isInt: function() {
			return this.getType() === "Integer" ? true : false;
		},
		isDouble: function () {
			return this.getType() === "Double" ? true : false;
		},
		isBoolean: function () {
			return this.getType() === "Boolean" ? true : false;
		},
		getType: function() {
			return this.get("type");
		},
		isOOTB: function() {
			return this.get("isOOTBAttr") === "Yes" ? true : false;
		},
		isInherited: function() {
			return this.get("isInherited") === "Yes" ? true : false;
		},
		isLocal: function() {
			return this.get("isLocal") === "Yes" ? true : false;
		},

		/**
		 * isMultiValuated - description
		 *
		 * @return {type}	description
		 */
		isMultiValuated: function() {
			return this.get('multivaluated') === "Yes" ? true : false;
		},

		/**
		 * isMultiLine - description
		 *
		 * @return {type}	description
		 */
		isMultiLine: function() {
			return this.get('multiLine') === "Yes" ? true : false;
		},
		isSearchable: function() {
			return this.get('searchable') === "Yes" ? true : false;
		},
		isExportable: function() {
			return this.get('exportable') === "Yes" ? true : false;
		},
		isResetOnClone: function() {
			return this.get('resetOnClone') === "Yes" ? true : false;
		},
		isResetOnRevision: function() {
			return this.get('resetOnRevision') === "Yes" ? true : false;
		},
		/* S63 02/08/2022
		* FUN114519
		* Adding has default get function
		*/
		hasDefault: function() {
				var bHasDef;
				if(this.get('hasDefault') === undefined)
					bHasDef = true;
				else
					bHasDef = this.get('hasDefault') === "Yes";
			return bHasDef;
		},
		getDefaultValue: function() {
			return this.get("defaultValue");
		},
		getMaxLength: function() {
			return this.get("maxLength");
		},
		getRange: function() {
			return this.get("range");
		},
		getUserAccess: function() {
			return this.get("userAccess");
		},
		getNlsEnglish: function() {
			var list = this.get("nlsList");
			return list && list.en ? list.en : "";
		},
		getNlsFrench: function() {
			var list = this.get("nlsList");
			return list && list.fr ? list.fr : "";
		},
		getNlsDutch: function() {
			var list = this.get("nlsList");
			return list && list.de ? list.de : "";
		},
		getNlsJapanesse: function() {
			var list = this.get("nlsList");
			return list && list.ja ? list.ja : "";
		},
		getNlsKorean: function() {
			var list = this.get("nlsList");
			return list && list.ko ? list.ko : "";
		},
		getNlsRussian: function() {
			var list = this.get("nlsList");
			return list && list.ru ? list.ru : "";
		},
		getNlsChinesse: function() {
			var list = this.get("nlsList");
			return list && list.zh ? list.zh : "";
		},
		getDMSStatus: function() {
			return this.get("DMSStatus");
		},
		getNLSForAttrType: function(aType) {
			var toRet = "";
			switch (aType) {
				case "String":
					toRet = myNls.get("AttrTypeString");
					break;
				case "Integer":
					toRet = myNls.get("AttrTypeInt");
					break;
				case "Double":
					toRet = myNls.get("AttrTypeReal");
					break;
				case "Date":
					toRet = myNls.get("AttrTypeDate");
					break;
				case "Boolean":
					toRet = myNls.get("AttrTypeBool");
					break;
				default:
			}
			return toRet;
		}
	}),
	{ // methode de classe
		/**
		 * 
		 * @param {String} attrType 
		 * @param {String} oldrange 
		 * @param {String} newrange 
		 * @param {Array} errors 
		 * @returns {Array} range
		 */
		checkRange: function(attrType, oldrange, newrange, errors) { // on pourrait retourner l'id NLS au lieu du mesage?
			var words = (newrange ? newrange.split(";") : [])
					.map(item => item.trim())
					.filter(item => item.length>0);
			
			var missingValues = oldrange ? oldrange.split(";").filter(item => !words.includes(item)) : [];
			if(missingValues.length) {
				errors.push({
					fixed: true,
					nls: 'attrRangeMissingValue',
					values: missingValues
				});
				words = words.concat(missingValues);
			}
			
			var singleValues = words.filter((item, index) => words.indexOf(item) == index);
			var duplicateValues = words.filter((item, index) => words.indexOf(item) != index)
			
			if (duplicateValues.length > 0) {
				errors.push({
					fixed: true,
					nls: 'attrRangeErrDupValue',
					values: duplicateValues.filter((item, index) => duplicateValues.indexOf(item) == index)
				})
				words = singleValues;
			}
			
			if(attrType == "Integer") {
				var invalidValues = words.filter( item=>!/^[-+]?[0-9]+$/.test(item) );
				if(invalidValues.length) {
					errors.push({
						fixed: false,
						nls: 'attrRangeErrNumeric',
						values: invalidValues
					});
				}
			}
			if(attrType == "String") {
				var invalidValues = words.filter( item=>!/^[a-zA-Z0-9]+$/.test(item) );
				if(invalidValues.length) {
					errors.push({
						fixed: false,
						nls: 'attrRangeErrAlphanumeric',
						values: invalidValues
					});
				}
			}
			
			words = words.map(string => string.trim());
			words = words.filter(item => item.length>0);
			if (attrType == "String") {
				words = words.sort();
			}
			if (attrType == "Integer") {
				words = words.sort((x,y)=>parseInt('0' + x)-parseInt('0' + y))
			}
			return words;
		}
	});
});

define('DS/DBSApp/Views/CustomSetView',[
'UWA/Core',
'i18n!DS/DBSApp/assets/nls/DMSAppNLS',
'DS/W3DXComponents/Views/Item/SetView',
'DS/UIKIT/DropdownMenu',
'DS/UIKIT/Autocomplete',
'DS/UIKIT/Popover'
],
function(UWA, myNls, SetView, DropdownMenu, Autocomplete, Popover) {
	'use strict';
	/*
	This class generates all the views in the process View. In other words, it's the "leader" view.
	*/
	return SetView.extend({

		init: function(options) {
			// options = UWA.clone(options || {}, false);
			this._parent.call(this, options);
		},

		getDetailViewOptions: function() {
			return UWA.extend(this._parent.apply(this, arguments) || {}, {
				skeleton: this.options.skeleton
			});
		},

		getContentsViewOptions: function(viewObj) {
			return UWA.extend(this._parent.apply(this, arguments) || {}, {
				skeleton: this.options.skeleton
			});
		},

		getMultiselHeaderViewOptions: function() {
			return UWA.extend(this._parent.apply(this, arguments) || {}, {
				skeleton: this.options.skeleton
			});
		},

		getSwitcherViewOptions: function() {
			return UWA.extend(this._parent.apply(this, arguments) || {}, {
				skeleton: this.options.skeleton
			});
		},

		filterContentItems: function(predicate) {
			this.contentsViews.tile.nestedView.filter(predicate);
			this.dispatchEvent("onSearch", {
				number: this.contentsViews.tile.nestedView.visibleItems.length
			});
		},
		sortContentItems: function(sorter, asc) {
			this.contentsViews.tile.nestedView.sortBy(sorter, asc);
		},
		getActionsViewOptions: function() {
			var self = this,
				skeleton = this.getOption('skeleton'),
				options = this.getOption('actions'),
				collection = options.collection,
				actionClicks = options.actionClicks,
				actionFilters = options.filters,
				actionSorters = options.sorters;

			if(UWA.is(collection, 'function')) {
				collection = collection.call(this);
			}
			if(UWA.is(actionFilters, 'function')) {
				actionFilters = actionFilters.call(this); // TODO mettre paramètres pertinents
			}
			if(UWA.is(actionSorters, 'function')) {
				actionSorters = actionSorters.call(this); // TODO mettre paramètres pertinents
			}

			collection.add({
				id: 'findItem',
				title: "Find Item",
				icon: 'fonticon fonticon-search action-find-items',
				overflow: false
			}, {
				at: 0
			});

			if(actionFilters) {
				collection.add({
					id: 'filterItems',
					title: "Filter Items",
					icon: 'fonticon fonticon-filter action-filter-items',
					overflow: false
				});
			}
			if(actionSorters) {
				collection.add({
					id: 'sortItems',
					title: "Sort Items",
					icon: 'fonticon fonticon-sort-alpha-asc action-sort-items',
					overflow: false
				});
			}

			return UWA.merge({
				collection: collection,
				skeleton: this.options.skeleton
			}, UWA.extend({
				events: {
					'onActionClick': function(actionsView, actionView, event) {
						var actionId = actionView.model.get('id');
						switch(actionId) {
							case 'findItem': {
								var searchExist = this.container.getElement("#searchAutoCompleteInput");
								if (searchExist != null) {
									searchExist.destroy();
								} else {
									var searchDiv = UWA.createElement('div', {
										'id': 'searchAutoCompleteInput',
										'class': 'autoCompleteSearch',
										'styles': {
											'width': '250px',
											'overflow': 'visible'
										}
									});
									var insertDiv = actionView.container.parentNode.insertBefore(searchDiv, actionView.container);
									actionView.container.parentNode.setStyle('overflow', 'visible');

									var autoComplete = new Autocomplete({
										showSuggestsOnFocus: true,
										multiSelect: false,
										minLengthBeforeSearch: 0,
										datasets: [{
											name: 'Items',
											items: self.collection.map(function(model) {
												return {
													modelCid: model.cid,
													value: model.get("title"),
													subLabel: model.get("subtitle")
												};
											}),
											configuration: {
												searchEngine: function(dataset, text) {
													text = text.toLowerCase();
													return dataset.items.filter(function(item) {
														return item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text);
													})
												}
											}
										}],
										//placeholder: myNls.get('SearchInputMsg'),
										events: {
											onKeyUp: function(key) {
												this.elements.clear.onclick = self.filterContentItems.bind(self, null);
												var query = (key.currentTarget && key.currentTarget.value.toLowerCase()) || ''; // Value will disappear
												self.filterContentItems(function(model) {
													return	model.get("title").toLowerCase().contains(query) 
													|| 		model.get("subtitle").toLowerCase().contains(query);
												});
											},
											onSelect: function(item) {
												self.filterContentItems(function(model) {
													return model.cid == item.modelCid;
												});
											},
											onUnselect: function(item, badge, badgePos) {
												self.filterContentItems(null);
											}
										},
										style: {
											'overflow': 'visible'
										}
									}).inject(insertDiv);
									searchDiv.getElementsByTagName('input')[0].focus();
								}
								break;
							}
							case 'filterItems': {
								if (actionView.filterMenu == undefined) {
									actionView.filterMenu = new DropdownMenu({
										/*
										Accessing the container containing the action button "Create Business Rule", through this.containter.children etc.
										We could have access to it through getChildren() method I guess.
										*/
										target: actionView.container.parentNode.getElementsByClassName("action-filter-items")[0],
										//target: this.elements.actionsSection.getElementsByClassName("fonticon fonticon-fonticon fonticon-filter")[0],
										items: actionFilters,
										events: {
											onClick: function(e, item) {
												var filterIcon = this._parent.container;
												var filterDefs = actionFilters.find(f=>f.id==item.id);
												if (!filterDefs || !filterDefs.filter) {
													filterIcon.removeAttribute('style');
													self.filterContentItems(null)
												} else {
													filterIcon.setStyle('color', '#005686');
													self.filterContentItems(filterDefs.filter);
												}
											},
											//This event is triggered when we click outside of the dropdown menu. Then we destroy it.
											onClickOutside: function() {
												//this.hide();
											}
										}
									});
									actionView.filterMenu._parent = actionView;
								} 
								actionView.filterMenu.show();
								break;
							}
							case 'sortItems': {
								if(actionSorters.length==1) {
									var sortButton = actionsView.container.getElementsByClassName('action-sort-items')[0];
									var sortAsc = !sortButton.className.contains("asc");
									if(sortAsc) {
										sortButton.className = sortButton.className.replace("desc", "asc");
									} else {
										sortButton.className = sortButton.className.replace("asc", "desc");
									}
									self.sortContentItems(actionSorters[0].sorter, sortAsc);
								} else if (!actionView.sortMenu) {
									actionView.sortMenu = new DropdownMenu({
										target: actionView.container,
										items: actionSorters,
										events: {
											onClick: function(event, item) {
												if (event.target.className.contains("item-icon-sort")) {
													var sorterDefs = actionSorters.find(s=>s.id==item.id);
													var sortIcons = this.options.target.getElementsByClassName("fonticon");
													var sortAsc = !(sortIcons[0].className.contains("asc") && event.target.className.contains("desc"));
													if(sortAsc) {
														sortIcons[0].className = sortIcons[0].className.replace("desc", "asc");
													} else {
														sortIcons[0].className = sortIcons[0].className.replace("asc", "desc");
													}
													self.sortContentItems(sorterDefs.sorter, sortAsc);
												}
											},
											onShow: function() {
												for (var item of this.elements.container.getElementsByClassName("active")) {
													item.removeClassName("active");
												}
												//TODO: restore sort order?
											}
										}
									});
									actionView.sortMenu.items.forEach(function(item) {
										item.elements.container.firstElementChild.remove();
										item.elements.container.setStyle("cursor", "default");
										item.elements.container.addContent({
											tag: "div",
											class: "item-text item-icon-group",
											html: [{
												class: "fonticon fonticon-sort-alpha-asc item-icon-sort",
												tag: "span",
												title: item.titleAsc
											}, {
												class: "fonticon fonticon-sort-alpha-desc item-icon-sort",
												tag: "span",
												title: item.titleDesc
											}]
										});
									});
									actionView.sortMenu.elements.container.addClassName("sortDropdownMenu");
									actionView.sortMenu.show();
								}
								break;
							}
							default: {
								// var currentIndex = skeleton.getCurrentPanelIndex();
								// var skeletonModel = skeleton.getModelAt(currentIndex-1);
								actionClicks[actionId] && actionClicks[actionId].call(self, self.model, actionView.model);
								break;
							}
						}
					}
				}
			}, options));

		}

	});

});

define('DS/DBSApp/Views/Layouts/CustomField',
  [
    'DS/UIKIT/Input/Text',
    'DS/UIKIT/Input/Date',
    'DS/UIKIT/Input/Number',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Input/Toggle',
    'DS/UIKIT/Autocomplete',
  ],
  function(Text, DateInput, Number, Select, Toggle, Autocomplete) {
    "use strict";

    //url is the only attribute of this class.
    function CustomField(iName, iType, iHeader, iValue, iDisplayeValue, iCanBeEnable, opts) {
      if (!(this instanceof CustomField)) {
        throw new TypeError("CustomField constructor cannot be called as a function.");
      }
      this.name = iName;
      this.header = iHeader;
      this.value = iValue;
      this.displayValue = iDisplayeValue;
      this.type = iType;
      this.fieldDiv;
      this.fieldInput;
      this.canBeEnable = iCanBeEnable;
      this.disableField = null;
      this.enableField = null;
      this.placeHolderValue = opts ? opts.placeholder : "";
    }
    CustomField.prototype = {
      constructor: CustomField,
      buildInput: function(type) {
        switch (type) {
          case "input":

            break;
          default:

        }
      },
      buildField: function() {
        if (this.type == "input") {
          var divCol = UWA.createElement('div', {
            'class': 'col-md-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            'text': this.header,
            'styles': {
              "min-width": "160px",
              "font-weight": "bold",
              "background-color": "#f4f5f6"
            }
          }).inject(divInputGroup);
          /*var inputName = UWA.createElement('input', {
            type: 'text',
            class: 'form-control',
            value: this.value,
          }).inject(divInputGroup);*/
          //inputName.disabled = true;
          var inputName = this.control = new Text({
            className: 'form-control',
            value: this.displayValue,
          }).inject(divInputGroup);
          divInputGroup.inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = inputName;
          this.disableField = inputName;
          this.enableField = inputName;
        } else if (this.type == "date") {
          var divCol = UWA.createElement('div', {
            'class': 'col-md-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            'text': this.header,
            'styles': {
              "min-width": "160px",
              "font-weight": "bold",
              "background-color": "#f4f5f6"
            }
          }).inject(divInputGroup);
          // BMN2 29/01/2021 : IR-816263-3DEXPERIENCER2021x
          let displayValue = "";
          let date = "";
          if (this.displayValue.length > 0) {
            date = new Date(this.displayValue * 1000);
            displayValue = date.toLocaleDateString(widget.lang + "-" + widget.locale, {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric"
            });
          }
          var inputText = new Text({
            className: 'form-control',
            value: displayValue,
          }).inject(divInputGroup);
          inputText.hide();
          var inputDate = this.control = new DateInput({
            value: displayValue,
            placeholder: 'Select a date...'
          }).inject(divInputGroup);
          inputDate.setDate(date);
          //inputName.disabled = true;
          divInputGroup.inject(divCol);
          var deleteBtn = UWA.createElement('span', {
            'class': 'input-group-addon fonticon fonticon-clear'
          }).inject(divInputGroup);
          deleteBtn.hide();
          this.fieldDiv = divCol;
          this.fieldInput = inputDate;
          this.disableField = inputText;
          this.enableField = inputDate;

        } else if (this.type == "integer") {
          var divCol = UWA.createElement('div', {
            'class': 'col-md-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            'text': this.header,
            'styles': {
              "min-width": "160px",
              "font-weight": "bold",
              "background-color": "#f4f5f6"
            }
          }).inject(divInputGroup);
          var inputText = new Text({
            className: 'form-control',
            value: this.displayValue,
          }).inject(divInputGroup);
          inputText.hide();
          var input = this.control = new Number({
            placeholder: 'Pick a number...',
            min: -2147483647,
            max: 2147483647,
            step: 1,
            value: this.value
          }).inject(divInputGroup);

          divInputGroup.inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = input;
          this.disableField = inputText;
          this.enableField = input;

        } else if (this.type == "switch") {
          var divCol = UWA.createElement('div', {
            'class': 'col-md-6'
          });
          divCol.setStyle("padding", "10px");
          /*var inputName = new Text({
            className: 'form-control',
            value: this.value,
          }).inject(col4);
          inputText.hide();*/
          var toogle = this.control = new Toggle({
            type: 'switch',
            value: 'option1',
            label: this.header,
            checked: this.value == true
          }).inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = toogle;
          this.disableField = toogle;
          this.enableField = toogle;
        } else if (this.type == "select") {
          var divCol = UWA.createElement('div', {
            'class': 'col-md-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            'text': this.header,
            'styles': {
              "min-width": "160px",
              "font-weight": "bold",
              "background-color": "#f4f5f6"
            }
          }).inject(divInputGroup);
          var valueInputText = ""
          if (Array.isArray(this.value)) {
            var tmpArr = this.value.filter(item => item.selected == true);
            if (tmpArr.length > 0) {
              valueInputText = tmpArr[0].label
            }
          }
          var inputText = new Text({
            className: 'form-control',
            value: valueInputText,
          }).inject(divInputGroup);
          inputText.hide();
          var input = this.control = new Select({
            //id: "defaultValue",
            placeholder: this.placeHolderValue,
            custom: false,
            options: this.value
          }).inject(divInputGroup);

          divInputGroup.inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = input;
          this.disableField = inputText;
          this.enableField = input;
        } else if (this.type == "autocomplete") {
          var divCol = UWA.createElement('div', {
            'class': 'col-md-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            'text': this.header,
            'styles': {
              "min-width": "160px",
              "font-weight": "bold",
              "background-color": "#f4f5f6"
            }
          }).inject(divInputGroup);
          var inputText = new Text({
            className: 'form-control',
            value: this.displayValue,
          }).inject(divInputGroup);
          inputText.hide();
          var inputName = this.control = new Autocomplete({
            showSuggestsOnFocus: true,
            multiSelect: false,
            allowFreeInput: false,
            minLengthBeforeSearch: 0,
            datasets: [],
            placeholder: "",
            events: {
              onHideSuggests: function() {}
            },
            style: {
              overflow: 'visible'
            }
          }).inject(divInputGroup);
          //inputName.disabled = true;
          divInputGroup.inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = inputName;
          this.disableField = inputText;
          this.enableField = inputName;
        }
        return this;
      },

      enable: function() {
        if (this.canBeEnable) {
          this.disableField.hide();
          this.enableField.show();

          if (this.fieldInput.disabled != undefined) {
            this.fieldInput.disabled = false;
          } else if (this.fieldInput.setDisabled() != undefined) {
            this.fieldInput.setDisabled(false);
          }
        }
        return this;
      },

      disable: function(showValue) {
        //console.log(this.fieldInput);
        if (showValue) {
          this.enableField.hide();
          this.disableField.show();
          this.disableField.setDisabled(true);
        }
        if (this.fieldInput.disabled != undefined) {
          this.fieldInput.disabled = true;
        } else if (this.fieldInput.setDisabled() != undefined) {
          this.fieldInput.setDisabled(true);
        }
        return this;
      },
      getValue: function() {
        var toRet = "";
        if (this.fieldInput.getValue() != undefined) {
          if (this.fieldInput instanceof Toggle) {
            toRet = this.fieldInput.isChecked();
          } else {
            toRet = this.fieldInput.getValue();
          }

        } else if (this.fieldInput.value != undefined) {
          toRet = this.fieldInput.value;
        }
        return toRet;
      },
      isChanged: function() {
        var value = this.value;
        if (Array.isArray(this.value)) {
          let selectedItem = this.value.filter(item => item.selected == true);
          if (selectedItem.length > 0) {
            value = selectedItem[0].value
          } else {
            value = "";
          }
        }
        var curVal = this.getValue();
        if (Array.isArray(curVal)) {
          curVal = curVal.toString();
        }
        if (value != curVal) {
          return true;
        }
        return false;
      }


    };



    return CustomField;
  });

define('DS/DBSApp/Utils/Renderers/RootRenderer', [
	'DS/W3DXComponents/Skeleton',
	'DS/W3DXComponents/Views/Layout/ListView',
	'WebappsUtils/WebappsUtils',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
], function(Skeleton, ListView, WebappsUtils, myNls) {
	"use strict"

	var rootMenu = {
		collection: 'DS/DBSApp/Collections/DMSMenuCollection',
		/*
		When the View is not defined, it will fallback either to
		- 'DS/W3DXComponents/Views/Item/SkeletonRootView' for the CollectionView in the root panel
		or
		- 'DS/W3DXComponents/Views/Layout/ListView' for CollectionView other than the root panel
		*/
		test: WebappsUtils.getWebappsAssetUrl('DBSApp', 'DMSTools.json'),
		view: ListView, 
		// General View options
		viewOptions: {
			useInfiniteScroll: false,
			usePullToRefresh: false,
			contents: {
				events: {
				}
			}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				description: 'subtitle'
			},
			/*
				Facets are extra panels, that will instantiate a CollectionView if they contains Skeleton.getRendererHandler('RendererName').
				They receive the Model as parameter.
				The properties "businessRules" and "processRender" exist in the renderer map.
				*/
			facets: function(pSkeleton) {
				if (this.id === "1") {
					return [{
						text: 'Types View',
						icon: 'fonticon fonticon-list',
						name: 'global',
						/*
						Skeleton static method: function that handles the rendering of the view.
						Parameter can be either a String or a View.
						If Parameter is a string, it references another Renderer.
						*/
						handler: Skeleton.getRendererHandler('types')
					}]
				} else if (this.id === "2") {
					return [{
						text: 'Group of attributes View',
						icon: 'fonticon fonticon-list',
						name: 'global',
						handler: Skeleton.getRendererHandler('attributesGroup')
					}]
				} else if (this.id === "3") {
					return [{
						text: 'Extensions View',
						icon: 'fonticon fonticon-list',
						name: 'global',
						handler: Skeleton.getRendererHandler('Extensions')
					}]
				} else if (this.id === "4") {
					return [{
						text: 'Uniquekeys View',
						icon: 'fonticon fonticon-list',
						name: 'global',
						handler: Skeleton.getRendererHandler('uniquekey')
					}]
				} else if (this.id === "5") {
					return [{
						text: 'Tools',
						icon: 'fonticon fonticon-list',
						name: 'global',
						handler: Skeleton.getRendererHandler('tools')
					}]
				} else {
					/*return [{
						text: 'AttributesGroup View',
						icon: 'fonticon fonticon-list',
						name: 'global',
						/*
						Skeleton static method: function that handles the rendering of the view.
						Parameter can be either a String or a View.
						If Parameter is a string, it references another Renderer.
						*/
					/*handler: Skeleton.getRendererHandler('tools')
					}]*/
				}
			},

			events: {
			}
		}
	};
	return rootMenu;
});

/*global define*/
define('DS/DBSApp/Models/ToolsModel', [
    'UWA/Core',
    'UWA/Class/Model'
], function (UWA, Model) {
    "use strict";
    return Model.extend({
        defaults: function () {
            return {

            };
        }
    });
});

define('DS/DBSApp/Utils/Menu',
  [],
  function() {
    "use strict";
    var tt = [{
        "name": "Types",
        "subtitle": "Create your own types",
        "image": "TypeIcon.png",
        "id": "1"
      },
      {
        "name": "Group of Attributes",
        "subtitle": "Enrich your data model",
        "image": "GroupAttrIcon.png",
        "id": "2"
      },
      {
        "name": "Extensions",
        "subtitle": "Create your own extensions",
        "image": "ExtIcon.png",
        "id": "3"
      },
      {
        "name": "Attributes",
        "subtitle": "Allow to define new attributes",
        "image": "AttrIcon.png",
        "id": "4"
      },
      {
        "name": "Unique Keys",
        "subtitle": "Allow to define new unique keys",
        "image": "AttrIcon.png",
        "id": "5"
      },
      {
        "name": "Tools",
        "subtitle": "Import/Export, Indexation ...",
        "image": "AttrIcon.png",
        "id": "6"
      }
    ];
    return tt;
  });

/**
 * Icon input use the type form
 */

define('DS/DBSApp/Views/Layouts/Widgets',
[
  'UWA/Core',
  'UWA/Promise',
  'DS/UIKIT/Alert',
  'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
],
function(UWA, Promise, Alert, myNls) {
  "use strict";
    
    
  function resizeBase64Img(base64, newWidth, newHeight) {
        return new Promise((resolve, reject) => {
          let canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          let context = canvas.getContext("2d");
          let img = document.createElement("img");
          img.src = base64;
          img.onerror = reject;
          img.onload = function() {
            var oldWidth = img.width;
            var oldHeight = img.height;
            context.scale(newWidth / oldWidth, newHeight / oldHeight);
            context.drawImage(img, 0, 0);
            resolve({
              data: canvas.toDataURL("image/png"), 
              oldWidth: oldWidth, 
              oldHeight: oldHeight
            });
          }
        });
  }

  return {
    
    createAlertBox: function buildAlertBox(errors) {
      if(UWA.is(errors, 'string')) {
        return buildAlertBox({
          "message": UWA.String.escapeHTML(errors),
          "fixed": false
        });
      } 
      if(UWA.is(errors, 'object')) {
        return buildAlertBox([errors])
      }
      if(UWA.is(errors, 'array')) {
        var alertMessages = errors.map(function (error) {
          let result = "";
          if(UWA.is(error, 'string')) {
            result = UWA.String.escapeHTML(error)
          }
          if(UWA.is(error, 'object')) {
            result = UWA.String.escapeHTML(error.message || myNls.get(error.nls) || undefined);
            for(let [key, val] of Object.entries(error)) {
              result = result.replace("%" + key + "%", UWA.String.escapeHTML(val));
            }
            if(error.values) {
              var maxValueCount = error.maxValueCount || 5;
              result = result + " <br/> " + error.values.slice(0,maxValueCount).map(v=>"&laquo; " + UWA.String.escapeHTML(v) + " &raquo;").join(" - ") 
              if(result.length>maxValueCount) {
                result = result + "..."
              }
            }
          }
          return result;
        });
        
        let alertBox = new Alert({
          visible: true,
          autoHide: true,
          hideDelay: 2000
        });
        alertBox.add({
          className: 'error',
          message: alertMessages.length==1 ? alertMessages[0] : ("<ol><li>" + alertMessages.join("</li><li>") + "</li></ol>")
        });
        return alertBox;
      }
      throw 'Unexpected parameter type';
    },
    
    createCustoAlert: function buildCustoAlert(opts) {
      let message = opts['message'],
      className = opts['type'],
      hideDelay = opts['delay'],
      autoHide = opts['auto'],
      closable = !opts['auto'];
      if(opts['type']===undefined) {
        className = "primary";
      }
      let alertBox = new Alert({
        visible: true,
        autoHide: autoHide,
        closable: closable,
        hideDelay: hideDelay,
        className:className,
        messages: UWA.String.escapeHTML(message)
      });
      return alertBox;
    },
    
    createIconField: function (options, values) {
      
      // Initialiaze controls
      var { onIconChange, onIconApplied, icons, maxsize, ...options } = UWA.merge(options,{
        onIconChange: function() {},
        onIconApplied: function() {},
      });
      var divIconGroup = UWA.createElement('div', options);
      
      for(let iconDef of icons) {
        let iconName = iconDef.name;
        let iconWidth = parseInt(iconDef.width);
        let iconHeight = parseInt(iconDef.height);
        let iconHtml = icons[iconName] = UWA.extend(iconDef, {
          name: iconName,
          width: iconWidth,
          height: iconHeight,
          depends: iconDef.depends || [],
          label:  UWA.createElement('label', {
            'class': 'fonticon fonticon-upload',
            'for': options.name + "-file-"  + iconName,
            'styles': {
              'cursor':'pointer',
              'min-width': (iconWidth * 2 + 8) + 'px',
              'min-height': (iconHeight * 2 + 8) + 'px',
              'line-height': (iconHeight * 2 + 8) + 'px',
              'background-size': (iconWidth * 2 ) + 'px ' + (iconHeight * 2 ) + 'px' ,
              'font-size': iconHeight + "px",
              'background-position':'4px 4px',
              'background-repeat':'no-repeat',
              'text-align': 'center',
              'vertical-align': 'top',
              'border-radius': '4px',
              'border': '1px solid #e2e4e3',
              'box-shadow': '0 0 0 3px white inset',
              'caret-color': 'transparent',
              'margin-right': '15px'
            }
          }),
          data: UWA.createElement('input', {
            'id': options.name + "-" + iconName,
            'type': 'hidden'
          }),
          file:  UWA.createElement('input', {
            'id': options.name + "-file-"  + iconName,
            'type': 'file',
            'accept': 'image/*',
            'hidden': 'true'
          }),
          set: function(value) {
            var next = value.replace(/^data:image\/png;base64,/, '');
            var prev = this.get();
            if(next!=prev) {
              onIconChange(this.name, this.data.value = next)
            }
            this.display(next);
            return next;
          },
          get: function() {
            return this.data.value;
          },
          display: function(value) {
            this.label.setStyle("background-color", "#f9f9f9");
            if(value) {
              this.label.setStyle('display', '');
              this.label.setStyle('color', 'transparent');
              this.label.setStyle("background-image", "url(data:image/png;base64," + value + ")");
            } else {
              this.label.setStyle('color', '#78befa');
              this.label.setStyle("background-image", "none");
            }
          },
          build: function() {
            var self = this;
            this.label.inject(divIconGroup);
            this.file.inject(divIconGroup);
            this.data.inject(divIconGroup);
            this.label.onmouseleave = function(){
              self.display(self.get()); // Restore icon
            };
            this.label.onmouseenter = function(){
              self.display(null); // Hide icon
              self.label.setStyle("background-color", "#3d3d3de6");
            };
            this.file.onchange = function() {
              if (!this.files[0]) { // Cancel button
                return
              }
              let type = this.files[0].type;
              let reader = new FileReader();
              reader.onerror = function(e) {
                onIconApplied(iconName, [{
                  fixed: false,
                  nls: 'IconFormatErr'
                }]);
              };
              reader.onload = function(e) {
                resizeBase64Img(e.target.result, iconHtml.width, iconHtml.height).then(
                  function(tt){
                    self.apply(UWA.extend(tt, {
                      type: type,
                      result: e.target.result
                    }));
                  },
                  function(fail) {
                    onIconApplied(iconName, [{
                      fixed: false,
                      nls: 'IconFormatErr'
                    }])
                  }
                );
              };
              reader.readAsDataURL(this.files[0]);
            }
          },
          apply: function(tt) {
            // Check the file size after compression
            let errors = [];
            const maxb64 = (maxsize || 2000) * 256 / 64;
            const isPng = tt.type.contains('/png');
            const content = tt.result.replace(/^data:image\/.*;base64,/, '');
            // Check the file extension
            if(!isPng) {
              errors.push({
                fixed: true,
                nls: 'IconTypeErr'
              });
            } else if(content.length < maxb64) {
              tt.data = content; // Keep provided icon
            } else if(tt.data.length < maxb64) {
              errors.push({ // Browser succeed to compress image
                fixed: true,
                nls: 'IconSizeErr'
              });
            } else {
              errors.push({
                fixed: false,
                nls: 'IconSizeErr'
              });
            }

            // Check the icon size
            if(tt.oldWidth!=this.width || tt.oldHeight!=this.height) { 
              errors.push({
                fixed: true,
                nls: 'IconDimError',
                width: this.width,
                height: this.height
              });
            }
            var promises = [];
            if(errors.every(error=>error.fixed)) {
              this.set(tt.data);
              for(let iconDep of this.depends) if(!icons[iconDep].get()) {
                promises.push(resizeBase64Img(tt.result, icons[iconDep].width, icons[iconDep].height).then((tt) => {
                  icons[iconDep].set(tt.data);
                }));
              }
            }
            return Promise.all(promises).then(function(){
              onIconApplied(iconName, errors);
            });
          }
        });
        iconHtml.build();
      }
      
      // Initialize values
      for(let iconHtml of Object.values(icons)) {
          var value = iconHtml.set(iconHtml.value || (values || {})[iconHtml.name] || '');
          for(let iconDep of iconHtml.depends) {
            icons[iconDep].label.setStyle("display", value ? "" : "none");
          }
      }
      return divIconGroup;
    },
    
    createTypeIconField: function(options, values) {
       return this.createIconField(UWA.extend(options,{
         'icons': [
            {
              name: "IconLarge",
              width: 32,
              height: 32,
              depends: ["IconNormal","IconSmall"]
            }, 
            {
              name: "IconNormal",
              width: 22,
              height: 22
            }, 
            {
              name: "IconSmall",
              width: 16,
              height: 16
            }
          ]
       }), values);
    }
  }

});

define('DS/DBSApp/Utils/dictionaryJSONHandler', [], function() {
	"use strict";

	function DicoHandler(options) {
		
	}

	
	function getKeyToReadOnDico(nature) {
		var toRet = "";
		switch (nature) {
			case "Types":
			case "Type":
				toRet = "Types";
				break;
			case "Relationships":
			case "Relationship":
				toRet = "Relationships";
				break;
			case "Interfaces":
			case "Interface":
				toRet = "Interfaces";
				break;
			default:
		}
		return toRet;
	}

	DicoHandler.prototype = {
		constructor: DicoHandler,

		// appelé au chargement du widget
		startup: function(resultCUSTO, resultOOTB, predicates, attrDims, widgetLang) {
			this.predicates = predicates;
			this.attrDimensions=attrDims || {};
			
			this.startupDicoOOTB ={"Dictionary":{}};
			this.startupDicoOOTB["Dictionary"] = resultOOTB["Dictionary"];
			this.startupNlsOOTB = {"DictionaryNLS":{}};
			this.startupNlsOOTB["DictionaryNLS"]=resultOOTB["DictionaryNLS"];

			this.startupDicoCUSTO = {"Dictionary":{}};
			this.startupDicoCUSTO["Dictionary"] = resultCUSTO["Dictionary"] ||{};
			
			this.startupNlsCUSTO = {};
			for(let item in resultCUSTO) if(item.contains("NLS_")) {
				var langCode = item.split("_")[1];
				this.startupNlsCUSTO[langCode]=resultCUSTO[item];
				if(langCode.contains(widgetLang)){
					this.startupDicoCUSTO["DictionaryNLS"]=resultCUSTO[item];
				}
			}
		},

		//url is the only attribute of this class.
		init: function(iDicoJson, iDicoOOTB) {
			this.charFlag = "__";
			iDicoJson = iDicoJson || {};
			iDicoOOTB = iDicoOOTB || {};
			iDicoJson.Dictionary = iDicoJson.Dictionary || {};
			iDicoOOTB.Dictionary = iDicoOOTB.Dictionary || {};
			var timestampJson = parseInt(iDicoJson.Dictionary.JsonTimeStamp || "0");
			var timestampOOTB = parseInt(iDicoOOTB.Dictionary.JsonTimeStamp || "0");
			
			if (!this.dicoJson || timestampJson > this.dicoJson.Dictionary.JsonTimeStamp) {
				this.dicoJson = JSON.parse(JSON.stringify(iDicoJson));
				this.dicoJson.Dictionary.JsonTimeStamp = timestampJson;
				this.mergeDico = null;
			}
			if (!this.dicoOOTB || timestampOOTB > this.dicoOOTB.Dictionary.JsonTimeStamp) {
				this.dicoOOTB = JSON.parse(JSON.stringify(iDicoOOTB));
				this.dicoOOTB.Dictionary.JsonTimeStamp = timestampOOTB;
				this.mergeDico = null;
			}
			try {
				if (iDicoJson['DictionaryNLS']) {
					this.startupDicoCUSTO['DictionaryNLS'] = iDicoJson['DictionaryNLS'];
					/*Object.keys(this.dicoJson["DictionaryNLS"]).forEach(function(item) {
						this.startupDicoCUSTO['DictionaryNLS'][item] = this.dicoJson["DictionaryNLS"][item];
					});*/
				}
			} catch(error) {}
			
			for(var type of ["Types", "Interfaces", "Relationships", "UniqueKeys"]) {
				if(!this.dicoJson.Dictionary[type]) this.dicoJson.Dictionary[type]={};
				if(!this.dicoOOTB.Dictionary[type]) this.dicoOOTB.Dictionary[type]={};
			}
			if(!this.mergeDico) {
				this.mergeDico = {
					Dictionary: {
						Types: {},
						Interfaces: {},
						Relationships: {},
						UniqueKeys: {}
					}
				};
				
				for(var type of ["Types", "Interfaces", "Relationships", "UniqueKeys"]) {
					for(let [key,val] of Object.entries( this.dicoJson.Dictionary[type] ) ) {
						this.mergeDico.Dictionary[type][key] = val; 
					}
					for(let [key,val] of Object.entries( this.dicoOOTB.Dictionary[type] ) ) {
						this.mergeDico.Dictionary[type][key] = val; 
					}
				}
			}
		},

		getTypesAndRelationships: function(scopes) {
			if(!!scopes && !Array.isArray(scopes)) {
				return this.getTypesAndRelationships([scopes]);
			}
			var result = Array.prototype.concat( 
				Object.values(this.mergeDico["Dictionary"]['Types']), 
				Object.values(this.mergeDico['Dictionary']['Relationships'])
			);
			if(scopes) {
				result = result.filter(item=>scopes.includes(item['Name']))
			}
			return result;
		},

		getCustoTypesAndRelationships: function(scopes) {
			// Cette méthode ne fonctionne pas sur les vielles versions de DMS car le WS dégage le tag Specialization après les requêtes d'updates
			// C'est vers cette version qu'il faudrait tendre
			// return this.getTypesAndRelationships(scopes).filter(item=>item['Specialization']=='Yes');

			// Ce test echoue pour le package VCOProject (VCOReference / VCORepresentation apparaissent) car le metadata est invalide
			// return this.getTypesAndRelationships(scopes).filter(item=>item['FirstOOTB']!=item['Name']);

			// Du coup on ne peut pas utiliser le dico "merge"
			if(!!scopes && !Array.isArray(scopes)) {
				return this.getCustoTypesAndRelationships([scopes]);
			}
			var result = Array.prototype.concat( 
				Object.values(this.dicoJson["Dictionary"]['Types']), 
				Object.values(this.dicoJson['Dictionary']['Relationships'])
			);
			if(scopes) {
				result = result.filter(item=>scopes.includes(item['Name']))
			}
			return result;
		},
		getCustoSpeInterfaces: function() {
			return Object.values(this.dicoJson['Dictionary']['Interfaces'])
				.filter(ext=>ext.Specializable == "Yes" && ext.Deployment == "No" && ext.Customer == "No");
		},



		// Called by AttrGroupCollection.js
		getAttGroups: function(scope) {
			// IR-816552-3DEXPERIENCER2021x S63 - scopes can contain duplicates but not results!
			var interfaces = scope ? this.getExtendingInterfaces(scope) : Object.values(this.dicoJson['Dictionary']['Interfaces'] || []) ;
			return interfaces.filter(function(extension) {
				if (extension["Package"] === "OtbERConfiguration" || extension["Package"] === "OtbIRPCConfiguration") {
					return false;
				} 
				//We are just displaying deployment interfaces that are not param interfaces but since FUN125205 we display non automatic deployment extensions
				return extension['Deployment'] == "Yes" /*&& extension['Automatic'] === 'Yes'*/ 
			});
		},
		getExtendingInterfaces: function(target) {
			var scopes = [];
			while(target) {
				var result = Object.values(this.mergeDico['Dictionary']['Interfaces'])
					.filter(ext=>(ext['ScopeTypes']||[]).includes(target) || (ext['ScopeRelationships']||[]).includes(target))
				scopes = scopes.concat(result);

				var type = this.mergeDico['Dictionary']['Types'][target] || this.mergeDico['Dictionary']['Relationships'][target] || {};
				target = type['Parent']
			}
			return scopes;
		},

		isOOTBAggregator: function(name, nature) {
			var key = getKeyToReadOnDico(nature);
			return !!key && !!this.dicoOOTB['Dictionary'][key] && !!this.dicoOOTB['Dictionary'][key][name];
		},
		getInstancesOfType: function(name, nature) {
			var key = getKeyToReadOnDico(nature);
			var elem = this.mergeDico["Dictionary"][key][name]
			if(elem['CreateInstName']) {
				var relations = elem['CreateInstName'].split(';');
				var result = relations
						.map(rel=>this.mergeDico['Dictionary']['Relationships'][rel])
						.filter(rel=>!!rel)
						.map(rel=>Object.assign({'firstParent': true}, rel)); //S63 FUN124741 The user must have the choice to take the instance of the parent
				result = result.concat(relations.flatMap(function getCustoChildOfInstance(parentName) {
					return Object.values(this.mergeDico['Dictionary']['Relationships'])
						.filter(rel=>rel.Parent==parentName)
						.flatMap(rel=>[rel].concat(getCustoChildOfInstance.call(this, rel.Name)), this);
				}, this));
				return result;
			} else if(elem['Parent']) {
				var parent = this.mergeDico["Dictionary"][key][elem['Parent']];
				return this.getInstancesOfType(parent['Name'], parent['Nature']);
			} else {
				return [];
			}
		},

		// Cette methode va rendre un boolean en verifiant si le nom
		// donné en argument est une instance.
		isRelationship(name) {
			var rel = this.mergeDico["Dictionary"]['Relationships'][name];
			return !!rel;
		},
		getAllSpecializableAggregator: function(scopes) {
			var specializableTypes =	Object.values(this.mergeDico["Dictionary"]["Types"])
				.filter(typ=>typ.Specializable=='Yes' && (!scopes || scopes.includes[typ['Name']])); // WTF? Pkoi rel.Specializable!=Yes
			var specializableRelationships =	Object.values(this.mergeDico["Dictionary"]["Relationships"])
				.filter(rel=>rel.Specializable=='Yes' && (!scopes || scopes.includes[rel['Name']])); // WTF? Pkoi rel.Specializable!=Yes
			var specializableExtensions = Object.values(this.mergeDico["Dictionary"]["Interfaces"])
				.filter(ext=>ext.Specializable=='Yes' && (!scopes || scopes.includes[ext['Name']]));
			return Array.prototype.concat(specializableTypes, specializableRelationships, specializableExtensions);
		},
		getAttributes: function(nature, name, isInherited) {
			var key = getKeyToReadOnDico(nature);
			var type = this.mergeDico["Dictionary"][key][name];
			if(!type) {
				return [];
			}
			var isOOTBAttr = type['Name'] == type["FirstOOTB"] ? "Yes" : "No";
			var result = Object.values(type['Attributes'] || {}).map(function(attr) { // Verifier que la proprité existe avant de récupérer les clés.
				return Object.assign({
					'isInherited': isInherited,
					'isOOTBAttr': isOOTBAttr,
					'ownerNature' : type.Nature,
					'generatedOwner': !attr.Owner ? type.Name : undefined
				}, attr);
			})
			if (type['Parent'] && isInherited == "Yes") {
				result = result.concat(this.getAttributes(nature, type['Parent'], isInherited))
			}
			return result;
		},

		getParentTypeMap: function(name, nature) {
			var key = getKeyToReadOnDico(nature);
			var currentType = this.dicoJson["Dictionary"][key][name];
			if(!currentType) {
				return []
			}
			var result = [currentType];
			if(currentType['Parent']) {
				if(currentType.Parent == currentType.FirstOOTB) {
					var firstOotbType = this.dicoOOTB["Dictionary"][key][currentType.FirstOOTB];
					if(firstOotbType) result.push(firstOotbType);
				} else {
					result = result.concat( this.getParentTypeMap(currentType.Parent, nature) );
				}
			}
			return result;
		},
		getAgregatorByNameAndNature: function(name, nature) {
			var key = getKeyToReadOnDico(nature);
			var result = this.mergeDico["Dictionary"][key][name];
			return result;
		},

		getSubType: function(selectedTypeName) {
			var mapToRet = Object.values(this.mergeDico.Dictionary.Types).filter(val => val.Parent == selectedTypeName);
			if (mapToRet.length == 0) {
				mapToRet = Object.values(this.mergeDico.Dictionary.Relationships).filter(val => val.Parent == selectedTypeName);
			}
			if (mapToRet.length == 0) {
				mapToRet = Object.values(this.mergeDico.Dictionary.Interfaces).filter(val => val.Parent == selectedTypeName);
			}
			return mapToRet;
		},

		getTypesToContrainedForUK() {
			var items = Array.prototype.concat(
				Object.values(this.dicoJson["Dictionary"]['Types']).filter(type=>!type.hasOwnProperty("DMSStatus")),
				Object.values(this.dicoOOTB["Dictionary"]['Types'])
			);
			return items;
		},
		
		getSpecializationExtensions() {
			return Object.values(this.dicoJson['Dictionary']['Interfaces'])
				.filter(ext=>ext['Specialization'] === "Yes");
		},
		getCustomerExtensions(scope) {
			var result = Object.values(this.dicoJson['Dictionary']['Interfaces'])
				.filter(ext=>ext['CustomerExposition'] == "Programmer" && ext['Customer'] === "Yes");
			if(!scope) {
				return result;
			}
			result = result
				.filter(ext=>(ext['ScopeTypes']||[]).includes(scope) || (ext['ScopeRelationships']||[]).includes(scope))
				
			var type = this.mergeDico['Dictionary']['Types'][scope] || this.mergeDico['Dictionary']['Relationships'][scope];
			if (type && type['Parent']) { //IR-816552-3DEXPERIENCER2021x S63 we now use temporary list where we removed dup before to return
				result = result.concat(this.getCustomerExtensions(type['Parent']).filter(ext=>!result.includes(ext)));
			}
			return result;
		},
		getSubCustomerExt(extension, isInherited) {
			var result = Object.values(this.dicoJson["Dictionary"]['Interfaces'])
				.filter(ext=>ext['Customer'] == "Yes" && extension == ext['Parent'])
			if(isInherited) {
				result = result.concat(result.flatMap(ext=>this.getSubCustomerExt(ext, true)));
			}
			return result;
		},

		/* a faire 10/19/2020 BMN2 : Modifier cette fonction pour	filter les types/rel OOTB avec la propriété
			* DeployementExtensible = "No". les Types/rel crée depuis DMS ou types bleu ont virtuellement
			* la propriété DeployementExtensible = "Yes".
			* Il faut donc distinguer le dico OOTB et le dico CUSTO.
			*/
		getDeploymentExtensibleTypes: function(isIRPC) {
			var extensibleTypes = Array.prototype.concat(
				Object.values(this.dicoJson['Dictionary']['Types']),
				Object.values(this.dicoOOTB['Dictionary']['Types']).filter(type=>type['DeploymentExtensible'] == "Yes"),
				Object.values(this.dicoJson["Dictionary"]['Relationships']),
				Object.values(this.dicoOOTB["Dictionary"]['Relationships']).filter(type=>type['DeploymentExtensible'] == "Yes")
			)
			.filter(type=>type['CustomerExposition'] === "Programmer")
			.filter(type=>!isIRPC || isIRPC==(this.isIRPC(type['Name'], type['Nature']) ? 'Yes' : 'No'));
			return extensibleTypes;
		},

		getExtensibleTypes: function(isIRPC) {
			var extensibleTypes = Array.prototype.concat(
				Object.values(this.mergeDico['Dictionary']['Types']),
				Object.values(this.mergeDico["Dictionary"]['Relationships'])
			)
			.filter(type=>type['CustomerExposition'] == "Programmer")
			.filter(type=>type['CustomerExtensible'] == "Yes")
			.filter(type=>!isIRPC || isIRPC==(this.isIRPC(type['Name'], type['Nature']) ? 'Yes' : 'No'));
			return extensibleTypes;
		},
		getCustoExtensions: function(isIRPC) {
			var extensibleTypes = Object.values(this.mergeDico['Dictionary']['Interfaces']).filter(ext=>ext['Customer']=="Yes" && ext['Package'].startsWith("DMSPackDefault"))
				.filter(type=>type['CustomerExposition'] == "Programmer")
				.filter(type=>!isIRPC || isIRPC==(this.isIRPC(type['Name'], type['Nature']) ? 'Yes' : 'No'));
			return extensibleTypes;
		},
		attributeGroupHadScope(attrGrp) {
			var extension = this.mergeDico['Dictionary']['Interfaces'][attrGrp];
			var scopes = [];
			if(!extension || extension['Deployment']!='Yes') {
				return scopes;
			}
			if (extension['ScopeTypes']) {
				scopes = scopes.concat(extension['ScopeTypes']);
			}
			if (extension['ScopeRelationships']) {
				scopes = scopes.concat(extension['ScopeRelationships']);
			}
			return scopes;
		},
		customerExtensionHadScope(custoExt, inherit) {
			var extension = this.mergeDico['Dictionary']['Interfaces'][custoExt];
			var scopes = [];
			if (!extension || extension['CustomerExposition'] != "Programmer" || extension['Customer'] != "Yes") {
				return scopes;
			}
			if (extension['ScopeTypes']) {
				scopes = scopes.concat(extension['ScopeTypes']);
			} 
			if (extension['ScopeRelationships'] !== undefined) {
				scopes = scopes.concat(extension['ScopeRelationships']);
			}
			if ((inherit || !scopes) && !!extension['Parent']) {
				scopes = scopes.concat(
					this.customerExtensionHadScope(extension['Parent'], inherit).filter(ext=>!scopes.includes(ext))
				);
			}
			return scopes;
		},
		isTypeCustomerExtensible: function(typeElem) {
			if(typeElem.CustomerExtensible) {
				return typeElem.CustomerExtensible=='Yes';
			} else if(typeElem.Parent) {
				return this.isTypeCustomerExtensible(typeElem.Parent);
			} else {
				return false;
			}
		},
		isTypeDeploymentExtensible: function(typeElem) {
			if(typeElem.DeploymentExtensible) {
				return typeElem.DeploymentExtensible=='Yes';
			} else if(typeElem.Parent) {
				return this.isTypeDeploymentExtensible(typeElem.Parent);
			} else {
				return false;
			}
		},
		isIRPC: function(name, nature) {
			var key = getKeyToReadOnDico(nature);
			var obj = this.mergeDico["Dictionary"][key][name];;
			if (key == 'Types' && !obj) {
				obj = this.mergeDico["Dictionary"][key = "Relationships"][name];
			}
			if (!obj) {
				return false;
			}
			if(key == 'Interfaces' && (obj["ScopeTypes"] || []).some(type=>this.isIRPC(type, 'Type'))) {
				return true;
			}
			if(key == 'Interfaces' && (obj["ScopeRelationships"] || []).some(rel=>this.isIRPC(rel, 'Relationship'))) {
				return true;
			}
			if(key == 'Relationships' && obj['Name'] == 'PLMCoreInstance') {
				return true;
			}
			if(key == 'Relationships' && obj['Name'] == 'PLMCoreRepInstance') {
				return true;
			}
			if(key == 'Types' && obj['Name'] == 'PLMEntity') {
				return true;
			}
			if(obj['Package'] == "DMSPackDefault_01" || obj['Package'] == "DMSPackDefault_03") {
				return true;
			}
			if (obj['Parent']) {
				return this.isIRPC(obj['Parent'], key);
			}
			return false;
		},
		

		getPackageNameToCreate: function(isIRPC, isDepl) {
			if (isIRPC && !isDepl) {
				return "DMSPackDefault_01"
			} else if (!isIRPC && !isDepl) {
				return "DMSPackDefault_02";
			} else if (isIRPC && isDepl) {
				return "DMSPackDefault_03";
			} else if (!isIRPC && isDepl) {
				return "DMSPackDefault_04";
			}
		},
		accessCreateInstField: function(name) {
			var obj = this.mergeDico["Dictionary"]["Types"][name];
			if (obj['Name'] == "PLMCoreReference" || obj['Name'] == "PLMCoreRepReference") {
				return true;
			}			
			if(obj['Parent']) {
				return this.accessCreateInstField(obj['Parent'], "Types");
			}
			return false;
		},
		getDisplayName: function(aName) {
			if (aName == undefined) {
				return "";
			}
			var result = aName;
			var index1 = aName.indexOf(this.charFlag);
			if (index1 !== -1) {
				result = aName.substring(0, index1);
			}
			return result;
		},
		getNLSName: function(aName, aNature) {
			if(!aName || !aNature) {
				return '';
			}
			var key = aNature + "." + aName;
			var result = this.getDisplayName(aName);
			if (this.startupDicoCUSTO['DictionaryNLS'] && this.startupDicoCUSTO['DictionaryNLS'][key])
				var nlsName = this.startupDicoCUSTO['DictionaryNLS'][key];
			if (nlsName && nlsName != aName && !key.endsWith(nlsName)) {
				result = nlsName;
			} else if (this.startupNlsOOTB && this.startupNlsOOTB.hasOwnProperty("DictionaryNLS")) {
				var nlsName = this.startupNlsOOTB["DictionaryNLS"][key];
				if (nlsName && nlsName != aName && !key.endsWith(nlsName)) {
					result = nlsName;
				}
			}
			return result;
		},
		getListNameNLSFromDico: function(aName, aNature) {
			let toRet = {
				"en": "",
				"fr": "",
				"de": "",
				"ja": "",
				"ko": "",
				"ru": "",
				"zh": ""
			};
			var key = aNature + "." + aName;
			Object.keys(toRet).forEach((item, i) => {
				var nlsValue = this.startupNlsCUSTO[item][key];
				if (nlsValue != undefined && nlsValue != aName && !key.endsWith(nlsValue)) {
					toRet[item] = nlsValue;
				}
				if (item != "en" && nlsValue == toRet["en"]) {
					delete toRet[item];
				}
			});

			return toRet;
		},

		getPredicatesBasedOnType: function(type) {
			var result = this.predicates;
			if (type == "Integer") {
				type = "integer";
			} else if (type == "String") {
				type = "string";
			} else if (type == "Boolean") {
				type = "boolean";
			} else if (type == "Date") {
				type = "dateTime";
			} else if (type == "Double") {
				type = "double";
			}
			var toRet = [];
			if (result != undefined) {
				Object.keys(result).forEach(function(item) {
					if (result[item].properties != undefined) {
						result[item].properties.forEach(function(cur) {
							if (cur.dataType.includes(type)) {
								toRet.push(cur);
							}
						})
					}
				});
			}
			toRet.sort(function(a, b) {
				return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0;
			});
			return toRet;
		},

		isNameExisting: function(name, nature) {
			return Object.values(this.mergeDico['Dictionary'][nature]).some(function(item) {
				return this.getDisplayName(item['Name'])==name
			}, this);
		},
		// BMN2 09/09/2021 : IR-825343-3DEXPERIENCER2022x
		isNameExistingForAttr: function(name) {
			for(let nature of ['Interfaces', 'Types', 'Relationships']) {
				if(Object.values(this.mergeDico['Dictionary'][nature]).some(function(item) {
					return Object.values(item['Attributes'] || {}).some(function(attr) {
						return this.getDisplayName(attr['Name'])==name;
					}, this)
				}, this)) {
					return true;
				};
			}
			return false;
		},

		getChildren: function(name, nature) {
			var key = getKeyToReadOnDico(nature);
			var data = this.dicoJson['Dictionary'][key] || {};
			return Object.values(data).filter(item => item.Parent===name)
		},
		hadChildren: function(name, nature) {
			var key = getKeyToReadOnDico(nature);
			var data = this.dicoJson['Dictionary'][key] || {};
			return !!Object.values(data).find(item => item.Parent===name)
		},
		findUniqueKeysOnType: function(typeName) {
			return Object.values(this.dicoJson['Dictionary']['UniqueKeys']).filter(item => item.Type==typeName);
		},
		findAttrGrpOnType: function(typename) {
			return Object.values(this.dicoJson['Dictionary']['Interfaces']).filter(item => (item.ScopeTypes || []).includes(typename) || (item.ScopeRelationships || []).includes(typename));
		}
	};

	return new DicoHandler();
});

define('DS/DBSApp/Views/CustomTableScrollView',
	[
		'i18n!DS/DBSApp/assets/nls/DMSAppNLS',
		'DS/W3DXComponents/Views/Layout/TableView',
		'DS/W3DXComponents/Views/Layout/TableScrollView',
	],
	function(myNls, TableView, TableScrollView) {
		'use strict';

		var CustomTableView = TableView.extend({
			buildItemView : function(item, ItemViewType, itemViewOptions) {
				return this._parent.call(this, item, ItemViewType, UWA.extend(itemViewOptions || {}, {
					skeleton: this.options.skeleton
				}));
			},
			render: function() {
				this._parent.call(this);
				this.container.getElement("thead").setStyles({ // IR-906722-3DEXPERIENCER2023x
					'background-color':'#e2e4e3'
				});
			}
		})

		/*
		This class generates all the views in the process View. In other words, it's the "leader" view.
		*/
		return TableScrollView.extend({
			tagName: 'div',
			className: 'dashboard-table-view',
			nested : CustomTableView,
			elements: {},
			/**
			 * @override UWA.Class.View#setup
			 * @param {View}	 options.collectionView - The containing collection view.
			 */
			setup: function(options) {
				this._parent.apply(this, options);
				this.addEvent("onItemRendered", function(tt) {
					var table = this.container.getElementsByClassName("table-container")[0];
					if (table != undefined) {
						table.toggleClassName('table-container');
						table.toggleClassName('table');
					}
				});
				this.nestedView.inheritedAttr = [];
				this.nestedView.ownAttr = [];
				this.nestedView.allAttr=[];
				this.nestedView.addEvent("onAfterItemAdded", function(row) {
					this.allAttr.push(row);
					//console.log('A new row added');
					row.container.toggleClassName("row-container");
					if (row.model.get('isInherited') == "Yes") {
						this.inheritedAttr.push(row);
						row.container.addClassName('warning');
						if (row.model.get('isOOTBAttr') == "Yes") {
							row.container.getChildren()[1].innerText = myNls.get("AttrOwnerOOTB");

						}
					} else {
						this.ownAttr.push(row);
					}
				});
        /*
				this.nestedView.addEvent("FilterAttrTableView", function(data) {

					switch (data) {
						case "ownAttr":
							this.ownAttr.forEach((item, i) => {
								item.show();
							});
							this.inheritedAttr.forEach((item, i) => {
								item.hide();
							});
							break;
						case "inheritedAttr":
							this.ownAttr.forEach((item, i) => {
								item.hide();
							});
							this.inheritedAttr.forEach((item, i) => {
								item.show();
							});
							break;
						default:
							this.allAttr.forEach((item, i) => {
								item.show();
							});
					}
				});
				this.nestedView.addEvent("onSearchAttr", function(data) {
					this.allAttr.forEach((item, i) => {
						var tile = item;
						if (tile.model.get("title").toLowerCase().contains(data) || tile.model.get("subtitle").toLowerCase().contains(data)) {
							tile.show();
						} else {
							tile.hide();
						}
					});
				});
				this.nestedView.addEvent("onResetAttr", function() {
					this.allAttr.forEach((item, i) => {
							item.show();
					});
				});
        //*/
			}
		});

	});

/**
 * @author AMN14
 */
define('DS/DBSApp/Collections/ToolsCollection', [
	'UWA/Core',
	'UWA/Class/Collection',
	'DS/DBSApp/Models/ToolsModel',
	'DS/WAFData/WAFData',
	'DS/DBSApp/Utils/URLHandler'
], function (UWA, Collection, ToolsModel, WAFData, URLHandler) {
		'use strict';


	var ToolsCollection = Collection.extend({
		model: ToolsModel,
		setup: function (models, options) {
			UWA.log('ToolsCollection::setup');
			this.url = URLHandler.getURL() + "/resources/datasetup_ws/GetImportSecurityContexts";
		},

		sync: function (method, model, options) {
			options.headers = {
				'Accept': 'application/json',
				'Accept-Language': widget.lang
			};

			options = Object.assign({
				ajax: WAFData.authenticatedRequest
			}, options);

			this._parent.apply(this, [method, model, options]);
		},


		parse: function (data) {
			var parsedResponse = { env: null, Scs: [] };
			parsedResponse.env = data.ENV;
			var listCollabSpace = data.SCs;
			if (listCollabSpace != null && Array.isArray(listCollabSpace)) {
				listCollabSpace.forEach(function (collabSpace) {
					parsedResponse.Scs.push(
						{
							collabID: collabSpace.SC,
							collabName: collabSpace.CS,
						}
					);
				}
				)
			}
			return parsedResponse;
		},
	}
	);

	return ToolsCollection;
});

define('DS/DBSApp/Views/InterfaceForm', [
	'DS/UIKIT/Form',
	'DS/UIKIT/Input/Toggle',
	'DS/UIKIT/Alert',
	'DS/DBSApp/Utils/UuidHandler',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
], function(Form, Toggle, Alert, UuidHandler, myNls) {
	"use strict";

	function getDeploymentExtensibleTypesForAutoComplete(options, paramReturned, isIRPC) {
		var dicoHandler = options.dicoHandler;
		var extensibleTypes = dicoHandler.getDeploymentExtensibleTypes(isIRPC);
		var items = extensibleTypes.map(type=>({
			'value': type['Name'],
			'label':	options.entitle(type['Name'], type['Nature']),
			'sublabel': options.entitleSub(type['Name'], type['Nature']),
			'scopeNature': type['Nature'],
			'isIRPC': dicoHandler.isIRPC(type['Name'], type['Nature']) ? 'Yes': 'No'
		}));

		if (isIRPC == "Yes") {
			paramReturned['name'] = 'IRPC';
			paramReturned['displayName'] = false;
		} else if (isIRPC == "No") {
			paramReturned['name'] = 'ER';
			paramReturned['displayName'] = false;
		}
		paramReturned['items'] = items;
		return paramReturned;
	}

	var InterfaceForm;
	return InterfaceForm = {

		build: function(options) {
			var dicoHandler = options.dicoHandler;
			dicoHandler.init(dicoHandler.startupDicoCUSTO, dicoHandler.startupDicoOOTB);
			return this.buildForm(options || {})
		},


		extractInterfaceForm: function(options) {
			var model = options.model;
			var dicoHandler = options.dicoHandler;

			// Field contents
			var interface_name = options.interface_name;
			var automatic = options.automatic;
			var type_scope_name = options.type_scope_name;
			
			if(type_scope_name.length===0) {
				return {
					"errorMessage": 'no Scope'
				};
			}
			
			var isIRPC = type_scope_name[0]['isIRPC'],
				data = {},
				scope_type = [],
				scope_rel = [],
				scopes = [];

			switch (options.modeEdit) {
				case "New":
				case "AddTo": {
					var interface_name_uuid = interface_name + dicoHandler.charFlag + UuidHandler.create_UUID().getUuidWithoutSeparator();

					for (var i = 0; i < type_scope_name.length; i++) {
						var scopeTmp = type_scope_name[i]['value'];
						if (type_scope_name[i]['scopeNature'] === 'Type') {
							scope_type.push(scopeTmp);
						} else if (type_scope_name[i]['scopeNature'] === 'Relationship') {
							scope_rel.push(scopeTmp);
						}
					}
					
					//myPath = myPath + "/resources/dictionary/AggregatorCreate?nature=Interface";
					data = {
						"Name": interface_name_uuid,
						"Nature": "Interface",
						"Parent": "",
						//"FirstOOTB": "",
						"Abstract": "No",
						"CustomerExposition": "Programmer",
						//"Specializable": "Yes",
						//"Specialization": "No",
						"Deployment": "Yes",
						//"Customer": "No",
						"Automatic": automatic,
						//"Typing": "No",
						"Package": dicoHandler.getPackageNameToCreate(isIRPC=="Yes",true),
						//"Description": interface_comment,
						"ScopeTypes": scope_type,
						"ScopeRelationships": scope_rel,
						//"Attributes": {}
					}
					break;
				}
				case "Edit": {
					var interface_name_edit = model.get('id');
					for (var i = 0; i < type_scope_name.length; i++) {
						var scopeTmp = type_scope_name[i]['value'];
						scopes.push(scopeTmp);
						if (!model.get('scopes').includes(scopeTmp)) {
							if (type_scope_name[i]['scopeNature'] === 'Type') {
								scope_type.push("add:" + scopeTmp);
							} else if (type_scope_name[i]['scopeNature'] === 'Relationship') {
								scope_rel.push("add:" + scopeTmp);
							}
						}
					}
					if (model.get('ScopeTypes') !== undefined) {
						for (var i = 0; i < model.get('ScopeTypes').length; i++) {
							var scopeType = model.get('ScopeTypes')[i];
							if(model.get('DMSStatus')!=undefined) {
								scope_type.push(scopeType);
								scopes.push(scopeType);
							} else {
								var exist = false;
								for (var j = 0; j < type_scope_name.length; j++) {
									if (type_scope_name[j]['value'] === scopeType) {
										exist = true;
									}
								}
								if (exist) {
									scope_type.push(scopeType);
									//scopes.push(scopeType);
								} else {
									scope_type.push("remove:" + scopeType);
								}
							}
						}
					}
					if (model.get('ScopeRelationships') !== undefined) {
						for (var i = 0; i < model.get('ScopeRelationships').length; i++) {
							var scopeRel = model.get('ScopeRelationships')[i];
							if(model.get('DMSStatus')!=undefined) {
								scope_rel.push(scopeRel);
								scopes.push(scopeRel);
							} else {
								var exist = false;
								for (var j = 0; j < type_scope_name.length; j++) {
									if (type_scope_name[j]['value'] === scopeRel) {
										exist = true;
									}
								}
								if (exist) {
									scope_rel.push(scopeRel);
								} else {
									scope_rel.push("remove:" + scopeRel);
								}
							}
						}
					}
					
					//myPath = myPath + "/resources/dictionary/AggregatorModify?nature=Interface";
					data = {
						"Name": interface_name_edit,
						"Nature": "Interface",
						//"Parent": "",
						//"FirstOOTB": "",
						//"Abstract" : "No",
						//"CustomerExposition": "Programmer",
						//"Specializable": "Yes",
						//"Specialization": "No",
						//"Deployment": "Yes",
						//"Customer": "No",
						"Automatic": automatic,
						//"Typing": "No",
						"Package": model.get('Package'),
						//"Description": interface_comment,
						"ScopeTypes": scope_type,
						"ScopeRelationships": scope_rel,
						"scopes": scopes,
						//"Attributes": {}
					}
					break;
				}
			}
			//IR-818199-3DEXPERIENCER2021x S63 adding DMSStatus if existing
			//IR-818199-3DEXPERIENCER2021x *S63 Checking if a model exist (modify context) and checking if if it really interface information
			var DMSStatus = model && model.get('nature')==="Interface" ? model.get('DMSStatus') : undefined;
			if(DMSStatus!=undefined) data['DMSStatus']=DMSStatus;
			return data;
		},

		buildForm: function(options) {
			// Mock this
			var modeEdit = options.modeEdit;
			var model = options.model;
			var dicoHandler = options.dicoHandler;
			
			// Mock WS 
			var wsAggregatorWs = options.wsAggregatorWs;

			var myFields = [];
			var search = {
				configuration: {
					searchEngine: function(dataset, text) {
						text = text.toLowerCase();
						return dataset.items.filter(function(item) {
							return item.label.toLowerCase().contains(text) || item.sublabel.toString().toLowerCase().contains(text);
						})
					}
				}
			};

			switch (modeEdit) {
				case "New": {
					search = getDeploymentExtensibleTypesForAutoComplete(options, search);

					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('interfaceName'),
						required: true,
						placeholder: myNls.get('enterAttGrpName'),
						helperText: myNls.get('uniqueField'),
						errorText: myNls.get('nameError'),
						pattern: "^[a-zA-Z0-9]+$"
					});
					//scope name
					myFields.push({
						type: 'autocomplete',
						name: "scope_name",
						label: myNls.get('scopesNames'),
						//placeholder: myNls.get('searchTypeOrRel'),
						required: true,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: true,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError'),
						datasets: [search],
						events: {
							onSelect: function(item, position) {
								if (item['datasetId'] === undefined) {
									scopeNameField.toggleSelect(item,position,false);
								} else if (scopeNameField.selectedItems.length === 1 && !scopeNameField.datasets[0]['name']) {
									delete search['name'];
									search = getDeploymentExtensibleTypesForAutoComplete(options, search,item['isIRPC']);
									scopeNameField.removeDataset(0);
									scopeNameField.addDataset(search);
									scopeNameField.onUpdateSuggests(scopeNameField.datasets);
									scopeNameField.onHideSuggests();
									scopeNameField.onFocus();
									scopeNameField.toggleSelect(scopeNameField.getItem(item['value'], position, true));
									//scopeNameField.onHideSuggests();
									//scopeNameField.onUpdateSuggests(scopeNameField.datasets);
									//scopeNameField.selectedItems.push(item);
								}
							},
							onUnselect: function(item) {
								if (scopeNameField.selectedItems.length === 0 && scopeNameField.datasets[0]['name']) {
									delete search['name'];
									search = getDeploymentExtensibleTypesForAutoComplete(options, search);
									scopeNameField.removeDataset(0);
									scopeNameField.addDataset(search);
								}
							}
						}
					});
					//Automatic Addition
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "automatic",
						html: new function() {
							var label = UWA.createElement('label', {
								'text': myNls.get("interfaceFormAutomaticFieldLabel")
							});
							var toggle = new Toggle({
								type: 'switch',
								name: "automatic",
								value: 'Yes',
								disabled: false,
								label: myNls.get("interfaceFormAutomaticFieldOption"),
								checked: true
							}) 
							var div = UWA.createElement('div', {
								'class': 'interfaceFormAutomaticOptDiv'
							});
							label.inject(div);
							toggle.inject(div);
							return div;
						}
					}); //*/

					break;
				}
				case "Edit": {

					if (model.get('ScopeTypes') && model.get('ScopeTypes').length != 0) {
						var isIRPC = dicoHandler.isIRPC(model.get('ScopeTypes')[0], 'Type') ? 'Yes' : 'No';
						search = getDeploymentExtensibleTypesForAutoComplete(options, search, isIRPC);
					} else if (model.get('ScopeRelationships') && model.get('ScopeRelationships').length != 0) {
						var isIRPC = dicoHandler.isIRPC(model.get('ScopeRelationships')[0], 'Relationship') ? 'Yes' : 'No';
						search = getDeploymentExtensibleTypesForAutoComplete(options, search, isIRPC)
					} else {
						search = getDeploymentExtensibleTypesForAutoComplete(options, search);
					}

					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('interfaceName'),
						disabled: true,
						required: true,
						value: model.get('title')
					});
					//scope name
					myFields.push({
						type: 'autocomplete',
						name: "scope_name",
						label: myNls.get('scopesNames'),
						//placeholder: myNls.get('searchTypeOrRel'),
						required: true,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: true,
						//closableItems:false,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError'),
						datasets: [search]
					});
					//Automatic Addition
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "automatic",
						html: new function() {
							var label = UWA.createElement('label', {
								'text': myNls.get("interfaceFormAutomaticFieldLabel")
							});
							var toggle = new Toggle({
								type: 'switch',
								name: "automatic",
								value: model.get('automatic'),
								disabled: !!model.get('DMSStatus') && model.get('DMSStatus') !== "DEV",
								label: myNls.get("interfaceFormAutomaticFieldOption"),
								checked: model.get('automatic')==='Yes'
							}) //.check()
							var div = UWA.createElement('div', {
								'class': 'interfaceFormAutomaticOptDiv'
							});
							label.inject(div);
							toggle.inject(div);
							return div;
						}
					}); //*/
					break;
				}
				case "AddTo": {

					var isIRPC = dicoHandler.isIRPC(model.get('id'), model.get('nature')) ? "Yes" : "No";
					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('interfaceName'),
						required: true,
						placeholder: myNls.get('enterAttGrpName'),
						helperText: myNls.get('uniqueField'),
						errorText: myNls.get('alphaNumError'),
						pattern: "^[a-zA-Z0-9]+$"
					});
					//scope name
					myFields.push({
						type: 'autocomplete',
						name: "scope_name",
						label: myNls.get('scopesNames'),
						placeholder: " ",
						required: true,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: false,
						disabled:true,
						closableItems:false,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError'),
						datasets: [{
							items: [{
								'value': model.get('id'),
								'label': model.get('title'),
								'scopeNature': model.get('nature'),
								'isIRPC': isIRPC
							}]
						}]
					});
					//Automatic Addition
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "automatic",
						html: new function() {
							var label = UWA.createElement('label', {
								'text': myNls.get("interfaceFormAutomaticFieldLabel")
							});
							var toggle = new Toggle({
								type: 'switch',
								name: "automatic",
								value: 'Yes',
								disabled: false,
								label: myNls.get("interfaceFormAutomaticFieldOption"),
								checked: true
							})
							var div = UWA.createElement('div', {
								'class': 'interfaceFormAutomaticOptDiv'
							});
							label.inject(div);
							toggle.inject(div);
							return div;
						}
					}); //*/
					break;
				}
				default:
					throw new TypeError("InterfaceForm constructor required a correct editMode");
			}

			var form = new Form({
				//className : 'horizontal',
				grid: '4 8',
				fields: myFields,

				//button event fired
				events: {
					onSubmit: function() {
						var request = InterfaceForm.extractInterfaceForm(UWA.extend({
							automatic: (this.getField("automatic").checked ? 'Yes' : 'No'),
							interface_name: this.getTextInput('interface_name').getValue(),
							type_scope_name: this.getAutocompleteInput("scope_name").selectedItems
						}, options))
						if(request['errorMessage']) {
							var alert2 = new Alert({
								visible : true,
								//autoHide: true,
								//hideDelay: 3000
								//closable: false,
								closeOnClick : true,
								renderTo : options.widgetBody || widget.body,
								messageClassName : 'error',
								messages : result.errorMessage
							});
							scopeNameField.onFocus();
						} else {
							wsAggregatorWs.call(null, request);
						}
					}
				}
			});
			var interfaceNameField = form.getTextInput('interface_name');
			var scopeNameField = form.getAutocompleteInput('scope_name');

			form.myValidate = function(){
				var txtName = interfaceNameField.getValue();
				var regEx = new RegExp("^[0-9]|_");
				if(txtName.startsWith("XP") || regEx.test(txtName) || (modeEdit!="Edit" && dicoHandler.isNameExisting(txtName,"Interfaces"))) {
					interfaceNameField.getContent().getParent('.form-group').addClassName('has-error');
					this.dispatchEvent('onInvalid');
					var alert = new Alert({
						visible: true,
						autoHide: true,
						hideDelay: 3000,
						renderTo : this.elements.container,
						messageClassName : 'error',
						messages : myNls.get('popUpNameError'),
					});
					return false;
				}
				return this.validate();
			}

			interfaceNameField.getContent().addEventListener('input',function() {
				var spanErrorName = document.getElementById("NameWarning");
				if (spanErrorName == undefined) {
					var parent = this.getParent();
					spanErrorName = UWA.createElement('span', {
						id: "NameWarning"
					});
					// LMT7 IR-867366-3DEXPERIENCER2022x : 09/11/21
					spanErrorName.appendText(myNls.get("AlphaNumericWarning"));
					spanErrorName.setStyle('font-style', 'italic');
					spanErrorName.setStyle('color', '#EA4F37');
					spanErrorName.inject(parent.firstChild);
					spanErrorName.hidden = true;
				}
				var regexAlphaNumeric = new RegExp("^[a-zA-Z0-9]+$");
				spanErrorName.hidden = !(this.value.length > 0 && !regexAlphaNumeric.test(this.value));
			});

			switch (modeEdit) {
				case "Edit":
					if(model.get('DMSStatus')==undefined) {
						for (var i = 0; i < model.get('scopes').length; i++) {
							scopeNameField.toggleSelect(scopeNameField.getItem(model.get('scopes')[i]), -1, true);
						}
					} else {
						for (var i = 0; i < model.get('scopes').length; i++) {
							scopeNameField.disableItem(model.get('scopes')[i]);
						}
					}
					break;
				case "AddTo":
					scopeNameField.toggleSelect(scopeNameField.getItem(model.get('id'), -1, true));
					break;
			}
			return form;
		}
	};
});

/**
* Form to create a interface
*/
define('DS/DBSApp/Views/CustoExtForm', [
	'UWA/Core',
	'DS/UIKIT/Form',
	'DS/UIKIT/Input/Text',
	'DS/UIKIT/Input/Toggle',
	'DS/UIKIT/Input/Button',
	'DS/UIKIT/Input/ButtonGroup',
	'DS/UIKIT/Alert',
	'DS/DBSApp/Utils/UuidHandler',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
], function(UWA, Form, Text, Toggle, Button, ButtonGroup, Alert, UuidHandler, myNls) {
	"use strict";
	
	var CustoExtForm = {
		PARENT_NAME_FIELD_ID: "parent_name",
		INTERFACE_NAME_FIELD_ID: "interface_name",
		SCOPE_NAME_FIELD_ID: "scope_name",
		ABSTRACT_FIELD_ID: "abstract",
	}

	function getInterfaceNameField(options) {
		return Object.assign({
			type: 'text',
			name: CustoExtForm.INTERFACE_NAME_FIELD_ID,
			label: myNls.get('extName'),
			required: true,
			placeholder: myNls.get("inputExtName"),
			helperText: myNls.get('uniqueField'),
			errorText: myNls.get('nameError'),
			pattern: "^[a-zA-Z0-9]+$"
		}, options);
	}

	function getInterfaceNLSField(translations) {
		return {
			type: "html",
			'class': 'form-group',
			name: "nlsLang",
			//label: "Abstract(NLS)",
			//value: "False",
			html: new function() {
				var div = UWA.createElement('div', {
					'class': 'myNLSDiv'
				});
				var label = UWA.createElement('label', {
					'text': myNls.get('typeFormNLsFieldLabel')
				});
				var labelHelp = UWA.createElement('i', {
					'text': myNls.get('typeFormNLsFieldHelp')
				});
				var buttonGp = new ButtonGroup({
					type: 'radio',
					buttons: [
						new Button({
							value: myNls.get('shortEnglishNLS'),
							active: true
						}),
						new Button({
							value: myNls.get('shortFrenchNLS')
						}),
						new Button({
							value: myNls.get('shortGermanNLS')
						}),
						new Button({
							value: myNls.get('shortJapaneseNLS')
						}),
						new Button({
							value: myNls.get('shortKoreanNLS')
						}),
						new Button({
							value: myNls.get('shortRussianNLS')
						}),
						new Button({
							value: myNls.get('shortChineseNLS')
						})
					],
					events: {
						onClick: function(e, button) {
							//console.log(button);
							var nodeList = e.currentTarget.getParent().getElementsByTagName('input');
							Object.keys(nodeList).forEach(function(t) {
								if (nodeList.item(t).id.contains(button.getValue().toLowerCase())) {
									nodeList.item(t).show();
								} else {
									nodeList.item(t).hide();
								}
							});
						}
					}
				});
				buttonGp.buttons.forEach(function(item) {
					if (navigator.language.toLocaleLowerCase().contains(item.getValue().toLocaleLowerCase())) {
						item.setActive(true);
					} else {
						item.setActive(false);
					}
				});
				
				label.inject(div);
				labelHelp.inject(div);
				buttonGp.inject(div);
				["en", "fr", "de", "ja", "ko", "ru", "zh"].forEach(function(code) {
					var input = new Text({
						id: "nlsInput_" + code,
						name: "nlsInput_" + code,
						placeholder: myNls.get('typeFormNLsFieldPlaceholder')
					});
					
					if(translations && translations[code]) {
						input.setValue(translations[code]);
					}
					if (!navigator.language.toLocaleLowerCase().contains(code)) {
						input.hide();
					}
					input.inject(div);
				});
				return div;
			}
		};
	}

	function getInterfaceAbstractField(options) {
		return Object.assign({
			type: "html",
			'class': 'form-group',
			name: CustoExtForm.ABSTRACT_FIELD_ID,
			label: myNls.get('typeFormAbstractFieldLabel'),
			html: new function() {
				var label = UWA.createElement('label', {
					'text': myNls.get('typeFormAbstractFieldLabel')
				});
				var labelHelp = UWA.createElement('i', {
					'text': myNls.get('typeFormAbstractFieldDescrip')
				});
				var toggle = new Toggle({
					type: 'switch',
					name: 'abstractOption',
					value: 'option1',
					label: myNls.get('typeFormAbstractFieldOption')
				}); //.check()
				var div = UWA.createElement('div', {
					'class': 'myAbstractOptDiv'
				});
				label.inject(div);
				labelHelp.inject(div);
				toggle.inject(div);
				return div;
			}
		}, options);
	}

	function getInterfaceScopeField(options) {
		return Object.assign({
			type: 'autocomplete',
			name: CustoExtForm.SCOPE_NAME_FIELD_ID,
			label: myNls.get('scopesNames'),
			placeholder: " ",
			required: true,
			allowFreeInput: true,
			showSuggestsOnFocus: true,
			multiSelect: true,
			//disabled: true,
			//helperText :	"EnterType ",
			errorText: myNls.get('SpecialCharacterError'),
		}, options);
	}

	function getInterfaceParentField(options) {
		return Object.assign({
			type: 'autocomplete',
			name: CustoExtForm.PARENT_NAME_FIELD_ID,
			label: myNls.get('parentName'),
			placeholder: " ",
			required: false,
			allowFreeInput: true,
			showSuggestsOnFocus: true,
			multiSelect: false,
			//disabled:true,
			//helperText :	"EnterType ",
			errorText: myNls.get('SpecialCharacterError')
		}, options);
	}

	
	function getExtensibleTypesForAutoComplete(options, selected, isIRPC) {
		var dicoHandler = options.dicoHandler;
		var extensibleTypes = dicoHandler.getExtensibleTypes(isIRPC);
		var items = extensibleTypes.map(type=>({
			'item': type,
			'value': type['Name'],
			'label':    options.entitle(type['Name'], type['Nature']),
			'subLabel': options.entitleSub(type['Name'], type['Nature']),
			'scopeNature': type['Nature'],
			'selected': selected.includes(type['Name']),
			'isIRPC': dicoHandler.isIRPC(type['Name'], type['Nature']) ? 'Yes': 'No'
		}));
		
		return {
			isIRPC: isIRPC,
			displayName: false,
			name: isIRPC=='Yes' ? 'IRPC' : 'ER',
			other: isIRPC=='Yes' ? 'ER' : 'IRPC',
			items: items,
			configuration: {
				searchEngine: function(dataset, text) {
					text = text.toLowerCase();
					return dataset.items.filter(function(item) {
						return item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text);
					})
				}
			}
		};
	}
	
	function getCustoExtForAutoComplete(options, selected, isIRPC) {
		var dicoHandler = options.dicoHandler;
		var extensibleTypes = dicoHandler.getCustoExtensions(isIRPC);
		var items = extensibleTypes.map(type=>({
			'item': type,
			'value': type['Name'],
			'label':    options.entitle(type['Name'], type['Nature']),
			'subLabel': options.entitleSub(type['Name'], type['Nature']),
			'selected': selected.includes(type['Name']),
			'scopeNature': type['Nature'],
			'ScopeTypes': type['ScopeTypes'] || [],
			'ScopeRelationships': type['ScopeRelationships'] || [],
			'isIRPC': dicoHandler.isIRPC(type['Name'], type['Nature']) ? 'Yes': 'No'
		}));
		
		return {
			isIRPC: isIRPC,
			displayName: false,
			name: isIRPC=='Yes' ? 'IRPC' : 'ER',
			other: isIRPC=='Yes' ? 'ER' : 'IRPC',
			items: items,
			configuration: {
				searchEngine: function(dataset, text) {
					text = text.toLowerCase();
					return dataset.items.filter(function(item) {
						return item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text);
					})
				}
			}
		};
	}
	

	return Object.assign(CustoExtForm, {

		
		build: function(options) {
			var _modeEdit = options.modeEdit;
			var _model = options.model;
			var dicoHandler = options.dicoHandler;
			var wsAggregatorWs = options.wsAggregatorWs;
			
			var myFields = [];
			switch (_modeEdit) {
				case "New": {
					function refreshItems(isIRPC, parents, scopes, force) {
						if(acscope.getDataset(0).isIRPC!=isIRPC) {
							acscope.cleanDataset(0);
							acscope.getDataset(0).isIRPC = isIRPC;
							acscope.addItems(getExtensibleTypesForAutoComplete(options, scopes, isIRPC).items, acscope.getDataset(0));
							// acscope.onUpdateSuggests([acscope.getDataset(0)]);
							acscope.onHideSuggests();
						}
						if (acparent.getDataset(0).isIRPC!=isIRPC) {
							acparent.cleanDataset(0);
							acparent.getDataset(0).isIRPC = isIRPC;
							acparent.addItems(getCustoExtForAutoComplete(options, parents, isIRPC).items, acparent.getDataset(0));
							// acparent.onUpdateSuggests([acparent.getDataset(0)]);
							acparent.onHideSuggests();
						}
						if(parents.length && scopes.length) {
							acscope.disable();
						} else {
							acscope.enable();
						}
					}
					//parent name
					myFields.push(getInterfaceParentField({
						datasets: [
							getCustoExtForAutoComplete(options, []),
						],
						events: {
							onSelect: function(item, position) {
								var parents = acparent.selectedItems.map(n=>n.value);
								var scopes = dicoHandler.customerExtensionHadScope(item['value']);
								acscope.getDataset(0).isIRPC = "FORCE";
								refreshItems(item['isIRPC'], parents, scopes, true);
							},
							onUnselect: function(item) {
								var isIRPC = (acscope.selectedItems.length && acscope.selectedItems[0].isIRPC) || undefined;
								var parents = acparent.selectedItems.map(n=>n.value);
								var scopes = acscope.selectedItems.map(n=>n.value);
								refreshItems(isIRPC, parents, scopes);
							}
						}
					}));
					//Type Name
					myFields.push(getInterfaceNameField({}));
					//nls Name
					myFields.push(getInterfaceNLSField({}));
					//scope name
					myFields.push(getInterfaceScopeField({
						datasets: [
							getExtensibleTypesForAutoComplete(options, [])
						],
						events: {
							onSelect: function(item, position) {
								var parents = acparent.selectedItems.map(n=>n.value);
								var scopes = acscope.selectedItems.map(n=>n.value);
								refreshItems(item['isIRPC'], parents, scopes);
							},
							onUnselect: function(item) {
								var isIRPC = 	(acparent.selectedItems.length && acparent.selectedItems[0].isIRPC) 
											|| 	(acscope.selectedItems.length && acscope.selectedItems[0].isIRPC)
											||	undefined;
								var parents = acparent.selectedItems.map(n=>n.value);
								var scopes = acscope.selectedItems.map(n=>n.value);
								refreshItems(isIRPC, parents, scopes);
							}
						}
					}));
					//abstract
					myFields.push(getInterfaceAbstractField({
						value: false
					}));
					break;
				}
				case "Edit": {
					var isIRPC = dicoHandler.isIRPC(_model.get('id'),_model.get('nature')) ? 'Yes' : 'No';
					//Parent Name
					myFields.push(getInterfaceParentField({
						disabled: true,
						datasets: [
							getCustoExtForAutoComplete(options, [_model.get('parent')], isIRPC)
						]
					}));
					//Interface Name
					myFields.push(getInterfaceNameField({
						value: _model.get('title'),
						disabled: true
					}));
					//nls Name
					myFields.push(getInterfaceNLSField(_model.get('NameNLS')));
					//abstract
					myFields.push(getInterfaceAbstractField({
						value: _model.get('isAbstract')=="Yes",
						disabled: !!_model.get('DMSStatus')
					}));
					break;
				}
				case "AddSub": {
					var isIRPC = dicoHandler.isIRPC(_model.get('id'),_model.get('nature')) ? 'Yes' : 'No';
					var scopes = dicoHandler.customerExtensionHadScope(_model.get('id'));
					//parent name
					myFields.push(getInterfaceParentField({
						disabled: true,
						datasets: [
							getCustoExtForAutoComplete(options, [_model.get('id')], isIRPC)
						]
					}));
					//Interface Name
					myFields.push(getInterfaceNameField({}));
					//nls Name
					myFields.push(getInterfaceNLSField({})); // _model.get('NameNLS') removed because it was generated an extension with an invalid NLS
					//scope name
					myFields.push(getInterfaceScopeField({
						disabled: !!scopes.length,
						required: !!scopes.length,
						datasets: [
							getExtensibleTypesForAutoComplete(options, scopes, isIRPC)
						]
					}));
					//abstract
					myFields.push(getInterfaceAbstractField({
						value: false
					}));
					break;
				}
				case "AddScope": {
					var isIRPC = dicoHandler.isIRPC(_model.get('id'),_model.get('nature')) ? 'Yes' : 'No';
					var scopes = _model.get('scopes')
					/* //parent name
					myFields.push(getInterfaceParentField({
						disabled: true,
						datasets: [
							getCustoExtForAutoComplete(options, [_model.get('parent')], isIRPC)
						]
					}));//*/
					//Type Name
					myFields.push(getInterfaceNameField({
						value: _model.get('title')
					}));
					//scope name
					if(!!_model.get('DMSStatus')) {
						myFields.push(getInterfaceScopeField({
							name: "lock_scope_name",
							closableItems: false,
							disabled:true,
							datasets: [
								getExtensibleTypesForAutoComplete(options, scopes, isIRPC)
							]
						}));
						myFields.push(getInterfaceScopeField({
							datasets: [
								(function(extensibleTypes) {
									extensibleTypes.items = extensibleTypes.items.filter(item=>!scopes.includes(item.value))
									return extensibleTypes;
								})(getExtensibleTypesForAutoComplete(options, [], isIRPC))
							]
						}));
					} else {
						myFields.push(getInterfaceScopeField({
							datasets: [
								getExtensibleTypesForAutoComplete(options, scopes, isIRPC)
							]
						}));
					}

					break;
				}
				case "AddScopeFromType": {
					var isIRPC = dicoHandler.isIRPC(_model.get('id'),_model.get('nature')) ? 'Yes' : 'No';
					//parent name
					myFields.push(getInterfaceParentField({
						datasets: [
							getCustoExtForAutoComplete(options, [], isIRPC)
						]
					}));
					//Type Name
					myFields.push(getInterfaceNameField({}));
					//nls Name
					myFields.push(getInterfaceNLSField({})); // _model.get('NameNLS') removed because it was generated an extension with an invalid NLS
					//scope name
					myFields.push(getInterfaceScopeField({
						disabled: true,
						datasets: [
							getExtensibleTypesForAutoComplete(options, [_model.get('id')], isIRPC)
						]
					}));					
					//abstract
					myFields.push(getInterfaceAbstractField({
						value: false
					}));
					break;
				}
				default: {
					throw new TypeError("CustoExtForm constructor required a correct editMode");
				}
			}
			
			var _form = new Form({
				//className : 'horizontal',
				grid: '4 8',
				fields: myFields,
				
				//block submit du formulaire
				//button event fired
				events: {
					onSubmit: function () {
						UWA.log("Done button clicked");
						//Mask.mask(widget.body);
						var type_scope_name = (this.getAutocompleteInput(CustoExtForm.SCOPE_NAME_FIELD_ID) || {}).selectedItems || [];
						var interface_name = this.getTextInput('interface_name').getValue();
						var interface_abstract = this.getField('abstractOption') ? this.getField('abstractOption').checked : _model.get('isAbstract')==="Yes";

						var nlsArray = ["en", "fr", "de", "ja", "ko", "ru", "zh"].reduce((function(nlsArray, code) {
							var field = this.getField("nlsInput_" + code);
							var value = (field && field.value) || nlsArray[code];
							if(value) nlsArray[code] = value;
							return nlsArray;
						}).bind(this), (_modeEdit=="Edit" && _model.get('NameNLS')) || {});
						nlsArray["en"] = nlsArray["en"] || dicoHandler.getDisplayName(interface_name);
						
						var data = "";
						var newUuid = UuidHandler.create_UUID();
						// Abstract
						//IR-818199-3DEXPERIENCER2021x S63 Checking if a model exist (modify context) and checking if if it really interface information
					
						switch (_modeEdit) {
							case "New":
							case "AddSub":
							case "AddScopeFromType": {
								var parent_item = this.getAutocompleteInput(CustoExtForm.PARENT_NAME_FIELD_ID).selectedItems[0] || {}; //this.getField('scope_name').value;
								var parent_scope = dicoHandler.customerExtensionHadScope(parent_item['value'], true);
								var isIRPC = parent_item['isIRPC'] || type_scope_name[0]['isIRPC'];
								var scope_type = type_scope_name.filter(item=>item['scopeNature']=='Type' && !parent_scope.includes(item['value'])).map(item=>item['value']);
								var scope_rel = type_scope_name.filter(item=>item['scopeNature']=='Relationship' && !parent_scope.includes(item['value'])).map(item=>item['value']);
								data = {
									"Name": interface_name + dicoHandler.charFlag + newUuid.getUuidWithoutSeparator(),
									"NameNLS": nlsArray,
									"Nature": "Interface",
									"Parent": parent_item['value'] || "",
									//"FirstOOTB": "",
									"Abstract": interface_abstract?"Yes":"No",
									"CustomerExposition": "Programmer",
									//"Specializable": "Yes",
									"Specialization": "Yes",
									"Deployment": "No",
									"Customer": "Yes",
									"Automatic": "No",
									//"Typing": "No",
									"Package": dicoHandler.getPackageNameToCreate(isIRPC=="Yes",false),
									//"Description": interface_comment,
									"ScopeTypes": scope_type,
									"ScopeRelationships": scope_rel,
									//"Attributes": {}
								}
								break;
							}
							case "Edit": {
								var isIRPC = dicoHandler.isIRPC(_model.get('id'),_model.get('nature'))? "Yes" : "No";
								var parent_scope = dicoHandler.customerExtensionHadScope(_model.get('parent'), true);
								var scope_type = (_model.get('ScopeTypes') || []).filter(type=>!parent_scope.includes(type));
								var scope_rel = (_model.get('ScopeRelationships') || []).filter(rel=>!parent_scope.includes(rel));
								data = {
									"Name": _model.get('id'),
									"NameNLS": nlsArray,
									"Nature": "Interface",
									//"Parent": interface_parent_name?interface_parent_name['value']:"",
									//"FirstOOTB": "",
									"Abstract": interface_abstract?"Yes":"No",
									//"CustomerExposition": "Programmer",
									//"Specializable": "Yes",
									//"Specialization": "Yes",
									//"Deployment": "Yes",
									//"Customer": "No",
									//"Automatic": "Yes",
									//"Typing": "No",
									"Package": _model.get('Package'),
									//"Description": interface_comment,
									"ScopeTypes": scope_type,
									"ScopeRelationships": scope_rel,
									// "scopes": scopes,
									//"Attributes": {}
								}
								break;
							}

							case "AddScope":{
								var parent_scope = dicoHandler.customerExtensionHadScope(_model.get('parent'), true);
								
								var old_scope_type = (_model.get('ScopeTypes') || []).filter(item=>!parent_scope.includes(item))
								var old_scope_rel  = (_model.get('ScopeRelationships') || []).filter(item=>!parent_scope.includes(item))
								var new_scope_type = type_scope_name.filter(item=>item['scopeNature']=='Type' && !parent_scope.includes(item['value'])).map(item=>item['value']);
								var new_scope_rel  = type_scope_name.filter(item=>item['scopeNature']=='Relationship' && !parent_scope.includes(item['value'])).map(item=>item['value']);
								var scope_type = new_scope_type.filter(item=>!old_scope_type.includes(item)).map(item=>"add:"+item);
								var scope_rel  = new_scope_rel.filter(item=>!old_scope_rel.includes(item)).map(item=>"add:"+item);

								if(!!_model.get('DMSStatus')) {
									scope_type = old_scope_type.concat(scope_type);
									scope_rel  = old_scope_rel.concat(scope_rel);
								} else {
									scope_type = scope_type
										.concat(old_scope_type.filter(item=> new_scope_type.includes(item)))
										.concat(old_scope_type.filter(item=>!new_scope_type.includes(item)).map(item=>"remove:"+item));
									scope_rel  = scope_rel
										.concat(old_scope_rel.filter(item=> new_scope_rel.includes(item)))
										.concat(old_scope_rel.filter(item=>!new_scope_rel.includes(item)).map(item=>"remove:"+item));
								}
								data = {
									"Name": _model.get('id'),
									"NameNLS": nlsArray,
									"Nature": "Interface",
									//"Parent": interface_parent_name?interface_parent_name['value']:"",
									//"FirstOOTB": ""
									"Abstract": interface_abstract?"Yes":"No",
									//"CustomerExposition": "Programmer",
									//"Specializable": "Yes",
									//"Specialization": "Yes",
									//"Deployment": "Yes",
									//"Customer": "No",
									//"Automatic": "Yes",
									//"Typing": "No",
									"Package": _model.get('Package'),
									//"Description": interface_comment,
									"ScopeTypes": scope_type,
									"ScopeRelationships": scope_rel,
									//"Attributes": {}
								}
								break;
							}

						}
						
						//IR-818199-3DEXPERIENCER2021x S63 adding DMSStatus if existing
						if(_model && _model.get('nature')=="Interface" && _model.get('DMSStatus')) {
							data['DMSStatus'] = _model.get('DMSStatus');
						}
							
						wsAggregatorWs(
							data, 
							function(){
								
							}, 
							function(){
								
							});
						},//fin block submit formulaire
						onCancel: function() {
							UWA.log("cancel button clicked");
						}
					}
				});
			
			//init du formulaire
			_form.myValidate = function(){
				if(_modeEdit!=="Edit" && _modeEdit!=="AddScope") {
					var txtName = this.getTextInput(CustoExtForm.INTERFACE_NAME_FIELD_ID).getValue();
					var regEx = new RegExp("^[0-9]|_");
					if(txtName.startsWith("XP") || regEx.test(txtName) || dicoHandler.isNameExisting(txtName,"Interfaces")) {
						this.getField(CustoExtForm.INTERFACE_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
						this.dispatchEvent('onInvalid');
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 2000
						}).inject(this.elements.container);
						alert.add({
							className: 'error',
							message: myNls.get('popUpNameError')
						});
						return false;
					}
				}
				return this.validate();
			};

			var inputName = _form.getField(CustoExtForm.INTERFACE_NAME_FIELD_ID);
			inputName.addEventListener('input',function() {
				var spanErrorName = document.getElementById("NameWarning");
				if (!spanErrorName) {
					spanErrorName = UWA.createElement('span', {
						id: "NameWarning"
					});
					// LMT7 IR-867366-3DEXPERIENCER2022x : 09/11/21
					spanErrorName.appendText(myNls.get("AlphaNumericWarning"));
					spanErrorName.setStyle('font-style', 'italic');
					spanErrorName.setStyle('color', '#EA4F37');
					var parent = this.getParent();
					spanErrorName.inject(parent.firstChild);
					spanErrorName.hidden = true;
				}
				var regexAlphaNumeric = new RegExp("^[a-zA-Z0-9]+$");
				if (this.value.length > 0 && !regexAlphaNumeric.test(this.value)) {
					spanErrorName.hidden = false;
				} else {
					spanErrorName.hidden = true;
				}
			});


			var acscope = _form.getAutocompleteInput(CustoExtForm.SCOPE_NAME_FIELD_ID);
			var acparent = _form.getAutocompleteInput(CustoExtForm.PARENT_NAME_FIELD_ID);

			dicoHandler.init(dicoHandler.startupDicoCUSTO, dicoHandler.startupDicoOOTB);
			switch (_modeEdit) {
				case "New":{
					acparent.elements.input.onchange = function(item) {
						if (acparent.selectedItems.length === 0 || acparent.selectedItems[0].label !== this.value) {
							acparent.reset();
						}
					};
					break;
				}
				case "Edit":{

					break;
				}
				case "AddSub":{
					break;
				}
				case "AddScope": {
					break;
				}
				case "AddScopeFromType":{
					break;
				}

			}
			return _form;
		}
	});
	
});

/**
 * Form to	create a Specialization type, Deployment extension, Specialization extension type
 * and Customer extension type
 */

define('DS/DBSApp/Views/UniquekeyForm', [
	'DS/UIKIT/Form',
	'DS/UIKIT/Alert',
	'DS/DBSApp/Utils/UuidHandler',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
], function(Form, Alert, UuidHandler, myNls) {
	"use strict";

	var UniquekeyForm = {
		UK_NAME_FIELD_ID: "uniquekey_name",
		TYPE_NAME_FIELD_ID: "type_name",
		INTERFACE_FIELD_ID: "interface_name",
		ATTRIBUTE_FIELD_ID: "attr_list",

		buildForNew: function(options) {
			var dicoHandler = options.dicoHandler;
			var entitle = options.entitle;
			var entitleSub = options.entitleSub;

			// Fill the autocomplete
			dicoHandler.init(dicoHandler.startupDicoCUSTO, dicoHandler.startupDicoOOTB);
			
			var spanErrorName = UWA.createElement('span', {
				hidden: true,
				styles: {
					'font-style': 'italic',
					'color': '#EA4F37'
				},
				text: myNls.get("AlphaNumericWarning")
			})

			var ukTypesItems = dicoHandler.getTypesToContrainedForUK().map(function(item) {
				return {
					'value': item.Name,
					'label': entitle(item.Name, item.Nature),
					'subLabel': entitleSub(item.Name, item.Nature),
					'element': item
				};
			});

			var form = new Form({
				grid: '4 8',
				fields: [
					{ // Name Field
						type: 'text',
						name: UniquekeyForm.UK_NAME_FIELD_ID,
						label: myNls.get("NameFieldUKForm"),
						required: true,
						placeholder: myNls.get("PlaceholderUniquekeyName"),
						helperText: myNls.get("ukFormNameFieldHelper"),
						//pattern: "^[a-zA-Z0-9]+$"
						events: {
							onChange: function() {
								spanErrorName.hidden = !this.getValue().length || this.getValue().match(/^[a-zA-Z0-9]+$/);
							}
						}
					},
					{ // Type field
						type: 'autocomplete',
						name: UniquekeyForm.TYPE_NAME_FIELD_ID,
						label: myNls.get("ContrainedTypeField"),
						required: true,
						showSuggestsOnFocus: true,
						datasets: [{
							items: ukTypesItems,
							configuration: {
								searchEngine: function(dataset, text) {
									text = text.toLowerCase();
									var sug = dataset.items.filter(function(item) {
										return item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text);
									})
									return sug;
								}
							}
						}],
						events: {
							onSelect: function(item) {
								UpdateInterfaceList();
								UpdateAttrList();
							},
							onUnselect: function() {
								UpdateInterfaceList();
								UpdateAttrList();
							},
							onChange: function() {
								debugger;
								if (this.selectedItems.length == 0 || this.selectedItems[0].label != this.getValue()) {
									this.reset();
								}
							}
						}
					},
					{ // Interface field
						type: 'autocomplete',
						name: UniquekeyForm.INTERFACE_FIELD_ID,
						label: myNls.get("ConstrainedInterfaceField"),
						disabled: true,
						showSuggestsOnFocus: true,
						datasets: [{
							items: [],
							configuration: {
								searchEngine: function(dataset, text) {
									text = text.toLowerCase();
									var sug = dataset.items.filter(function(item) {
										return item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text);
									});
									return sug;
								}
							}
						}],
						events: {
							onSelect: function(item) {
								UpdateAttrList(item);
							},
							onUnselect: function(item) {
								UpdateAttrList(item);
							}
						}
					},
					{ // Attribute field
						type: 'autocomplete',
						name: UniquekeyForm.ATTRIBUTE_FIELD_ID,
						label: myNls.get("ConstrainedAttributes"),
						required: true,
						multiSelect: true,
						showSuggestsOnFocus: true,
						datasets: [{
							items: [],
							configuration: {
								searchEngine: function(dataset, text) {
									text = text.toLowerCase();
									var sug = dataset.items.filter(function(item) {
										return item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text);
									})
									return sug;
								}
							}
						}],
					}
				],
				events: {
					onSubmit: function() {
						dicoHandler.init(dicoHandler.startupDicoCUSTO, dicoHandler.startupDicoOOTB);
						// Step 1 : Retrieve data			
						var uk_Name = this.getField(UniquekeyForm.UK_NAME_FIELD_ID).value; // Name
						var typeAutoComplete = this.getAutocompleteInput(UniquekeyForm.TYPE_NAME_FIELD_ID); // Parent
						var selectedType = typeAutoComplete && typeAutoComplete.selectedItems.length && typeAutoComplete.selectedItems[0].element;
						var interfaceAutoComplete = this.getAutocompleteInput(UniquekeyForm.INTERFACE_FIELD_ID); // Instance Name
						var selectedInterface = interfaceAutoComplete && interfaceAutoComplete.selectedItems.length > 0 && interfaceAutoComplete.selectedItems[0].element;
						var isIRPCType = dicoHandler.isIRPC(selectedType.Name, selectedType.Nature);
						var attrAutoComplField = this.getAutocompleteInput(UniquekeyForm.ATTRIBUTE_FIELD_ID);
						var attrList = !attrAutoComplField ? [] : attrAutoComplField.selectedItems.map(function(item) {
							if (item.element.Local == "Yes" && item.element.Basic != "Yes") {
								return item.element.Owner + "." + item.element.Name;
							} else {
								return item.element.Name;
							}
						})
						
						var newUuid = UuidHandler.create_UUID();
						options.wsAggregatorWs({
							'Name': uk_Name + "__" + newUuid.getUuidWithoutSeparator(),
							'Nature': "UniqueKey",
							'Package': isIRPCType ? "DMSPackDefault_03" : "DMSPackDefault_04",
							'Type': (selectedType && selectedType.Name) || "",
							'Interface': (selectedInterface && selectedInterface.Name) || "",
							'Enabled': "Yes",
							'Attributes': attrList
						});
					}
				}
			});
			spanErrorName.inject(form.getField(UniquekeyForm.UK_NAME_FIELD_ID).getParent().firstChild);


			function UpdateInterfaceList() {
				var intfItems = form.getAutocompleteInput(UniquekeyForm.TYPE_NAME_FIELD_ID).selectedItems
					.flatMap(item=>dicoHandler.getExtendingInterfaces(item.element['Name']))
					.filter(ext=>ext['FirstOOTB']!=ext['Name']) // Exclude OOTB interface
					.filter(ext=>ext['Automatic']=='Yes' && ext['Deployment']=='Yes') // FUN125205: Pas d'unique keys sur les extensions de déploiement non automatique ?
					.filter(ext=>!ext["DMSStatus"])
					.map(function(item) {
						return {
							'value': item.Name,
							'label': entitle(item.Name, item.Nature),
							'subLabel': entitleSub(item.Name, item.Nature),
							'element': item
						};
					})
				var inst_AutoComplete = form.getAutocompleteInput(UniquekeyForm.INTERFACE_FIELD_ID);
				inst_AutoComplete._parent = form;
				inst_AutoComplete.enable();
				inst_AutoComplete.cleanDataset(0);
				inst_AutoComplete.addItems(intfItems, inst_AutoComplete.getDataset(0));
			}

			// Submit Function : Called when the user click on Save Button.
			function UpdateAttrList() {

				var attrItems = [
					form.getAutocompleteInput(UniquekeyForm.INTERFACE_FIELD_ID).selectedItems,
					form.getAutocompleteInput(UniquekeyForm.TYPE_NAME_FIELD_ID).selectedItems
				]
				.flat()
				.map(function(item) {
					return dicoHandler.getAttributes(item.element.Nature, item.element.Name, "Yes");
				})
				.flat()
				.filter(function(attr) { // BMN2 IR-871564 23/07/2021
					if(["isbestsofar", "ispublished", "locked", "majorrevision", "minorrevision", "reserved", "reservedby", "revindex"].includes(attr.Name)){
						return false;
					}
					if(attr.hasOwnProperty("MultiLine") && attr.MultiLine == "Yes"){
						return false;
					}
					if(attr.hasOwnProperty("MultiValuated") && attr.MultiValuated == "Yes"){
						return false;
					}
					return true;
				}).map(function(attr){
					return {
						'value': attr.Name,
						'label': entitle(attr.Name, attr.Nature),
						'subLabel': entitleSub(attr.Name, attr.Nature),
						'element': attr
					}
				})
				var inst_AutoComplete = form.getAutocompleteInput(UniquekeyForm.ATTRIBUTE_FIELD_ID);
				inst_AutoComplete.cleanDataset(0);
				inst_AutoComplete.addItems(attrItems, inst_AutoComplete.getDataset(0));
			}

			form.myValidate = function() {
				dicoHandler.init(dicoHandler.startupDicoCUSTO, dicoHandler.startupDicoOOTB);
				// Check the name of the uniquekey is unique and respect the name pattern [a-zA-Z0-9]
				var uniquekeyNameField = this.getTextInput(UniquekeyForm.UK_NAME_FIELD_ID);
				if (uniquekeyNameField) {
					this.getField(UniquekeyForm.UK_NAME_FIELD_ID).getParent('.form-group').removeClassName('has-error');
					var ukName = uniquekeyNameField.getValue();
					var regEx = new RegExp("^[a-zA-Z0-9]+$");
					if (!regEx.test(ukName)) {
						this.getField(UniquekeyForm.UK_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
						//this.dispatchEvent('onInvalid');
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 5000
						}).inject(this._parent.elements.header);
						alert.add({
							className: 'error',
							message: myNls.get("nameError")
						});
						return false;
					}
					if (dicoHandler.isNameExisting(ukName, "UniqueKeys")) {
						this.getField(UniquekeyForm.UK_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
						//this.dispatchEvent('onInvalid');
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 5000
						}).inject(this._parent.elements.header);
						alert.add({
							className: 'error',
							message: myNls.get("nameError")
						});
						return false;
					}
				}

				// If the type is an OOTB Type so we have to check if a group of attribute is selected if not inform the useRootChannelView
				var typeAutoComplete = this.getAutocompleteInput(UniquekeyForm.TYPE_NAME_FIELD_ID);
				if (typeAutoComplete) {
					this.getField(UniquekeyForm.TYPE_NAME_FIELD_ID).getParent('.form-group').removeClassName('has-error');
					if (!typeAutoComplete.selectedItems.length) {
						// If a type in not selected
						this.getField(UniquekeyForm.TYPE_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 5000
						}).inject(this._parent.elements.header);
						alert.add({
							className: 'error',
							message: myNls.get("errMsgSelectTypeForUK")
						});
						return false;
					}

					var selectedType = typeAutoComplete.selectedItems[0].element;
					var isOotbType = dicoHandler.isOOTBAggregator(selectedType.Name, selectedType.Nature);
					if (isOotbType) {
						var insterfaceAC = this.getAutocompleteInput(UniquekeyForm.INTERFACE_FIELD_ID);
						if (insterfaceAC) {
							this.getField(UniquekeyForm.INTERFACE_FIELD_ID).getParent('.form-group').removeClassName('has-error');
							if (!insterfaceAC.selectedItems.length) {
								this.getField(UniquekeyForm.INTERFACE_FIELD_ID).getParent('.form-group').addClassName('has-error');
								//this.dispatchEvent('onInvalid');
								var alert = new Alert({
									visible: true,
									autoHide: true,
									hideDelay: 5000
								}).inject(this._parent.elements.header);
								alert.add({
									className: 'error',
									message: myNls.get("errMsgSelectInterfaceForOOTBTypeForUK")
								});
								return false;
							}
						}
					}
				}

				// Check if the user have selected atleast some attributes.
				var attrAutoComplete = this.getAutocompleteInput(UniquekeyForm.ATTRIBUTE_FIELD_ID);
				if (attrAutoComplete) {
					this.getField(UniquekeyForm.ATTRIBUTE_FIELD_ID).getParent('.form-group').removeClassName('has-error');
					if (!attrAutoComplete.selectedItems.length) {
						this.getField(UniquekeyForm.ATTRIBUTE_FIELD_ID).getParent('.form-group').addClassName('has-error');
						//this.dispatchEvent('onInvalid');
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 5000
						}).inject(this._parent.elements.header);
						alert.add({
							className: 'error',
							message: myNls.get("errMsgSelectAtleastOneAttrForUK")
						});
						return false;
					}
				}
				return true;
			};
			return form;
		},
	};
	return UniquekeyForm;
});

define('DS/DBSApp/Collections/AttrOfTypeCollection',
[
	'UWA/Core',
	'UWA/Class/Collection',
	'DS/DBSApp/Utils/URLHandler',
	'DS/WAFData/WAFData',
	'DS/DBSApp/Utils/dictionaryJSONHandler',
	'DS/DBSApp/Models/AttributeModel'
],
function(UWA, Collection, URLHandler, WAFData, dicoHandler, attributeModel) {
	"use strict";

	return Collection.extend({
		model: attributeModel,

		setup: function(models, options) {
			this.url = URLHandler.getDicoCustoUrl();
			options = options || {};
			this.owner = options.owner;
		},

		sync: function(method, collection, options) {
			return this._parent.call(this, method, collection, Object.assign(options, {
				ajax: WAFData.authenticatedRequest,
				contentType: 'application/json',
				type: 'json',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'SecurityContext': URLHandler.getSecurityContext()
				},
				sort: true
			}));
		},

		parse: function(data,options) {
			dicoHandler.init(data, dicoHandler.startupDicoOOTB);
			var paramReturned = [];
			var owner = this.owner;
			var nature = this.owner.get('nature');
			var interf = this.owner.get('interface');

			if (nature == "UniqueKey") {
				var attrList = [];
				attrList = attrList.concat(dicoHandler.getAttributes('Type', owner.get('Type'), "Yes"));
				attrList = attrList.concat(dicoHandler.getAttributes('Interface', owner.get('Interface'), "Yes"));
				var typeAttributes = owner.get('attributes'); // verfier que la liste contient les attributs suivant dans this.typeAttributes.
				paramReturned = attrList.filter(item=>{
					if (item.Local == "Yes" && item.Basic!="Yes") {
						return typeAttributes.includes(item.Owner + "." + item.Name);
					} else {
						return typeAttributes.includes(item.Name);
					}
				});
			} 
			if(nature==='Type' || nature==='Relationship') {
				paramReturned = paramReturned.concat(dicoHandler.getAttributes(nature, owner.get('id'), "No")).reverse();
				paramReturned = paramReturned.concat(dicoHandler.getAttributes(nature, owner.get('parent'), "Yes"))
			} 
			if(nature==='Interface' && interf==='custoExt') {
				paramReturned = paramReturned.concat(dicoHandler.getAttributes(nature, owner.get('id'), "No")).reverse();
				paramReturned = paramReturned.concat(dicoHandler.getAttributes(nature, owner.get('parent'), "Yes"))
			}
			if(nature==='Interface' && interf==='attGroup') {
				paramReturned = paramReturned.concat(dicoHandler.getAttributes(nature, owner.get('id'), "No")).reverse();
			}

			paramReturned.forEach((item)=> {
				// Compute the Nls of the attribute name
				let nls_key = "";
				let internalName = item['id'] = item['Name']; // L'id est oblibatoire!!! sinon il faut changer l'idAttribute de la collection
				if (item['Local'] == "Yes") {
					item["ExternalName"] = dicoHandler[options.entitle].call(dicoHandler, internalName, nls_key = item['Nature'] + "." + item['Owner']);
				} else {
					item["ExternalName"] = dicoHandler[options.entitle].call(dicoHandler, internalName, nls_key = item['Nature']);
				}
				
				// Compute the NLs of the owner of the attribute
				if (!item['Owner'] && item['Local'] == "No" && item.generatedOwner) {
					item["ExternalParentName"] = dicoHandler[options.entitle].call(dicoHandler, item.generatedOwner, nature || "");
				} else {
					item["ExternalParentName"] = dicoHandler[options.entitle].call(dicoHandler, item['Owner'], nature || "");
				}

				// Item NLS
				if (!item.NameNLS && item.isOOTBAttr == "No") {
					item.NameNLS = dicoHandler.getListNameNLSFromDico(internalName, nls_key);
				}
				// Range NLS
				if (!item.AuthorizedValuesNLS && !!item.AuthorizedValues && !!item.isOOTBAttr && item.isOOTBAttr == "No") {
					item.AuthorizedValuesNLS = {};
					for(let authorizedValue of item.AuthorizedValues) {
						item.AuthorizedValuesNLS[authorizedValue] = dicoHandler.getListNameNLSFromDico(internalName + "." + authorizedValue, nls_key.replace(/^Attribute/,"Range"));
					}
				}
			});
			return paramReturned;
		}
	});
});

/**
 * Form to create a interface
 */

define('DS/DBSApp/Views/CustomModal', [
	'DS/UIKIT/Modal',
	'DS/UIKIT/Input/Button',
	'DS/DBSApp/Views/Layouts/Widgets',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
],
function(Modal, Button, DMSWidgets, myNls) {
	"use strict";
	//url is the only attribute of this class.
	function CustomModal(aElementToDisplay, aContainer, aHeader) {
		if (!(this instanceof CustomModal)) {
			throw new TypeError("CustomModal constructor cannot be called as a function.");
		}
		this.display = aElementToDisplay;
		this.container = aContainer;
		this.headerTitle = aHeader;
	}

	CustomModal.prototype = {
		constructor: CustomModal,
		//Modal for the Type form and Extension form
		formModal: function(form, container) {
			_theModal = new Modal({
				className: 'fancy',
				visible: true,
				closable: true,
				header: headerDiv,
				body: form,
				renderTo: container,

				events: {
					onHide: function() {
						UWA.log("the Modal Closed");
						_theModal.destroy();
					}
				}
			});
			/*_theModal.getBody().getElement('#myCancelBtn').addEvent('click', function() {
				_theModal.hide();
			});*/
			return _theModal;
		},

		build: function() {
			var form = this.display;
			var okButton = new Button({
				'value' : myNls.get('Save'),
				'className' : 'btn primary',
				'type': 'submit',
				'events' : {
					'onClick' : function() {
						this.setDisabled(true);
						if(typeof form.myValidate === "function" && form.myValidate()) {
							form.dispatchEvent('onSubmit');
						}
						else {
							this.setDisabled(false);
						}
					}
				}
			});
			var cancelButton = new Button({
				value : myNls.get('Cancel'),
				type: 'cancel',
				events : {
					'onClick' : function() {
						UWA.log("DoSomething");
						myModal.destroy();
					}
				}
			});
			var myModal = this.modal = this.display._parent = new Modal({
				className: 'fancy',
				visible: true,
				closable: true,
				escapeToClose: false, // To not hide autocomplete with multi-selection (UK for instance)
				header: UWA.createElement('div', {
					'class': 'global-div',
					'html': [
						{
							'tag': 'h4',
							'text': this.headerTitle
						}, 
						{
							'tag': 'nav',
							'id': 'the-forms',
							'class': 'tab tab-pills'
						}
					]
				}),
				body: this.display,
				renderTo: this.container,
				footer : [ okButton, cancelButton],

				events: {
					onHide: function() {
						UWA.log("the Modal Closed");
						myModal.destroy();
					}
				}
			});
			return this;
		},
		destroy: function() {
			this.modal.destroy();
		},
		injectAlert: function(alert) {
			return DMSWidgets.createAlertBox(alert).inject(this.modal.elements.header);
		}
	};
	return CustomModal;
});

/**
 * Form to	create a Specialization type, Deployment extension, Specialization extension type
 * and Customer extension type
 */

define('DS/DBSApp/Views/AttrRangeTable', [
	'DS/UIKIT/Modal',
	'DS/UIKIT/Input/Text',
	'DS/DBSApp/Views/Layouts/Widgets',
	'DS/DBSApp/Models/AttributeModel',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
], function(Modal, Text, DMSWidgets, AttributeModel, myNls) {
	
	function mapnls(obj, fn) {
		var result= {};
		result['en'] = fn('en', obj['en'], myNls['englishNLS']);
		result['fr'] = fn('fr', obj['fr'], myNls['frenchNLS']);
		result['de'] = fn('de', obj['de'], myNls['germanNLS']);
		result['ja'] = fn('ja', obj['ja'], myNls['japaneeseNLS']);
		result['ko'] = fn('ko', obj['ko'], myNls['koreanNLS']);
		result['ru'] = fn('ru', obj['ru'], myNls['russianNLS']);
		result['zh'] = fn('zh', obj['zh'], myNls['chineseNLS']);
		return UWA.merge(result, obj);
	}
	
	function AttrRangeTable(opts) {
		if (!(this instanceof AttrRangeTable)) {
			throw new TypeError("AttrRangeTable constructor cannot be called as a function.");
		}
		var self = this;
		this.options = UWA.extend({
			onShow: function() {},
			onHide: function() {},
			onSave: function(values) { return true; },
			onError: function(errors) {}
		}, opts)
		this.nlsRange = opts.nlsRange || {};
		this.editMode = opts.editMode;
		
		this._rangeInit = opts.rangeList.map(function(item) {
			return mapnls({value:item},lang=>(self.nlsRange[item] || {})[lang] || "")
		});
		this._rangeEdit = this._rangeInit.map(function(item) {
			return mapnls(item, self.getNLSInput);
		});
	}
	AttrRangeTable.prototype = {
		constructor: AttrRangeTable,
		getNLSRange: function() {
			var result = this._rangeEdit.reduce(function(result, rangeValue) {
				result[rangeValue.value] = mapnls(rangeValue, (lang, rangeNlsInput)=>rangeNlsInput.value);
				return result; 
			}, {});
			return result;
		},
		getNLSInput: function(lang, value, nlslang) {
			return UWA.createElement('input', {
					'type': "text",
					'class': 'form-control',
					'value': value,
					'data-init': value
			});
		},
		getTableDataElement: function(opts) {
			var td = UWA.createElement('td', {
				'colspan': '1',
				'align': 'left',
				width: opts.width,
			});
			return td;
		},
		getTableHeaderElement: function(opts) {
			var p = UWA.createElement('p', {
				text: opts.headerName,
				'class': ''
			});

			var th = UWA.createElement('th', {
				'colspan': '1',
				'align': 'left',
				'width': opts.width,
				'white-space': 'nowrap',
				'overflow': 'hidden',
				id: opts.headerId
			});
			p.inject(th);
			return th;
		},
		
		getTable: function(myContent, editMode) {
				var self = this;
				var tableWrapper = UWA.createElement('div', {
					'class': "tableDiv"
				}).inject(myContent);
				tableWrapper.setStyle('height', '300px');
				tableWrapper.setStyle('overflow-x', 'auto');

				var table = UWA.createElement('table', {
					'class': 'table', //'tableImportExport',
					'id': 'attrTable'
				}).inject(tableWrapper);
				table.setStyle('max-width', 'unset');
				table.setStyle('table-layout', 'fixed');

				var thead = UWA.createElement('thead', {
					'class': 'attrthead',
					'id': 'attrthead'
				}).inject(table);
				
				var firstLine = UWA.createElement('tr').inject(thead);
				firstLine.setStyle('background', 'whitesmoke');
				firstLine.setStyle('position', 'sticky');
				firstLine.setStyle('top', '0');

				var rangeHeader = this.getTableHeaderElement({
					headerName: myNls['attrRangeTableHeader'],
					width: "250px",
					headerId: "nameColumn"
				}).inject(firstLine);
				
				var thElements = mapnls({}, function(lang, useless, langnls) {
					return self.getTableHeaderElement({
						headerName: langnls,
						width: "250px",
						headerId: "Trans" + lang.toUpperCase()
					}).inject(firstLine);
				})

				var tbody = UWA.createElement('tbody', {
					'class': 'attrtbody',
					'id': 'attrtbody'
				}).inject(table);
				
				var searchIconTag = rangeHeader.getElementsByTagName("p")[0];
				searchIconTag.setStyle("cursor", "pointer");
				
				var searchIcon = UWA.createElement('a', {
					'class': "fonticon fonticon-search"
				})
				searchIcon.inject(searchIconTag);
				searchIcon.setStyle("text-decoration", "none");
				searchIcon.setStyle("padding-left", "5px");
				
				var searchInput = new Text({});
				searchInput.inject(rangeHeader);
				searchInput.elements.input.setStyle("display", "none");
				
				var trElements = [];
				searchIcon.onclick = function() {
					searchInput.elements.input.setStyle("display", "inline-block");
				};
				searchInput.elements.input.onkeyup = function() {
					trElements.forEach(filterRow)
				};
				
				function filterRow(trElement) {
					var filter = searchInput.getValue().toUpperCase();
					var td = trElement.getElementsByTagName("td")[0];
					if(td && td.firstChild.value.toUpperCase().startsWith(filter)) {
						trElement.style.display = "";
					} else {
						trElement.style.display = "none";
					}
				}
				return function (rangeEdit) {
					trElements.forEach(tr=>tr.destroy());
					return trElements = rangeEdit.map(function(range, i) {
						var trElement = UWA.createElement('tr').inject(tbody);
						var input = new Text({
							'id': "range_" + i,
							'value': range.value
						}).inject(self.getTableDataElement({
							'width': "250px"
						}).inject(trElement));
						input.setDisabled(true);
						
						mapnls(range, function(lang, nlsInput) {
							nlsInput.id = 'NLSValue_' + lang + '_' + i;
							nlsInput.disabled = !editMode;
							nlsInput.inject(self.getTableDataElement({
								width: "250px"
							}).inject(trElement));
						})
						filterRow(trElement);
						return trElement;
					});
				}
		},
		
		getTextRange: function(options) {
			var textRange = new Text({ id: "rangeInput" });
			textRange.elements.input.setStyle("margin-bottom", "10px");
			textRange.CustomValidate = function() {
				let toRet = true;
				if (options.attrType == "String") {
					let curInputValue = this.getValue();
					let words = curInputValue.split(";");
					words.forEach((item, i) => {
						item = item.trim();
						var regex = new RegExp("^[a-zA-Z0-9]+$");
						if (item.length > 0 && !regex.test(item)) {
							toRet = false;
						}
					});
				} else if (options.attrType == "Integer") {
					let curInputValue = this.getValue();
					let words = curInputValue.split(";");
					words.forEach((item, i) => {
						item = item.trim();
						var regex = new RegExp('^[-+]?[0-9]+$');
						if (item.length > 0 && !regex.test(item)) {
							toRet = false;
						}
					});
				}
				if (!toRet) {
					this.elements.input.setStyle('border-color', "#EA4F37");
				} else {
					this.elements.input.style.borderColor = null;
				}
				return toRet;
			};

			textRange.onChange = function() {
				var errors = [];
				var value = options.onChange(this.getValue(), errors);
				var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);
				this.setValue(value);
				this.elements.input.style.borderColor = fixed ? null : "#EA4F37";
			};
			return textRange;
			
		},
		//Modal for the Type form and Extension form
		formModal: function(options) {
			var self = this;
			//tag div element
			var headerDiv = UWA.createElement('div', {
				'class': 'global-div'
			});
				
			//tag nav element
			var tabPanel = UWA.createElement('nav', {
				'class': 'tab tab-pills',
				'id': 'the-forms'
			}).inject(headerDiv);
			
			//title for the Modal
			var heading = UWA.createElement('h4', {
				'text': myNls['attrRangeTableTitle'],
			}).inject(headerDiv);
				
			var myModal = new Modal({
				className: 'fancy',
				visible: true,
				closable: true,
				header: headerDiv,
				body: options.form,
				footer: "<button type='button' id='SaveButton' class='btn btn-primary'>" + UWA.String.escapeHTML(myNls['attrRangeTableClose']) + "</button>" +
					"<button type='button' id='CancelBtn' class='btn btn-default'>" + UWA.String.escapeHTML(myNls['attrRangeTableCancel']) + "</button> ",
				renderTo: options.container,

				events: {
					onHide: function() {
						UWA.log("the Modal Closed");
						myModal.destroy();
						options.onHide();
					},
					onShow: function() {
						options.onShow();
						UWA.log("the Modal shown");
					}
				}
			});

			if (!options.editMode) {
				myModal.getFooter().getElement('#SaveButton').hidden = true;
				myModal.getFooter().getElement('#CancelBtn').hidden = true;
			}
			myModal.getFooter().getElement('#SaveButton').addEvent('click', function() {
				if(options.onSave()) {
					myModal.hide();
				}
			});
			myModal.getFooter().getElement('#CancelBtn').addEvent('click', function() {
				if(options.onCancel()) {
					myModal.hide();
				}
			});

			myModal.elements.wrapper.setStyle('width', '800px');
			return myModal;
		},
		updateRangeList: function(words) {
			var self = this;
			this._rangeEdit = words.map(function(word) {
				var init = self._rangeInit.find(e=>e.value==word) || mapnls({ value:word },lang=>"");
				return		 self._rangeEdit.find(e=>e.value==word) || mapnls(init, self.getNLSInput);
			});
		},
		launchPanel: function(_options) {
			let self = this;
			let editMode = _options.editMode || this.editMode;
			let attrName = _options.attrName || this.options.attrName;
			UWA.log("add_type action");

			var myContent = UWA.createElement('div', {
				'id': "myContent",
			});
			var tabNav = UWA.createElement('div', {
				'id': "got-tab-sample",
				'class': "tab"
			}); //.inject(myContent);
			tabNav.setStyle("justify-content", "center");
			tabNav.inject(myContent);
			
			if(attrName) {
				var h4 = UWA.createElement('h4');
				h4.inject(tabNav);
				
				var span = UWA.createElement('span', {
					'class': "badge font-3dsregular badge-default",
					'text': attrName
				});
				span.setStyle("padding-left", "50px");
				span.setStyle("padding-right", "50px");
				span.setStyle("padding-top", "5px");
				span.setStyle("padding-bottom", "5px");
				span.inject(h4);
			}
			
			var initRange = this._rangeInit.map(item=>item.value).join(";");
			function alterRange(value, errors) {
				var words = AttributeModel.checkRange(self.options.attrType, initRange, value, errors);
				var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);
				if(fixed) { // No error or error were fixed
					self.updateRangeList(words);
					tableUpdater(self._rangeEdit);
				}
				
				if (errors.length) {
					DMSWidgets.createAlertBox(errors).inject(myModal.elements.header);
					self.options.onError(errors);
				}
				return words.join(";");
			}

			var textRange = this.getTextRange({
				attrType: this.options.attrType, 
				onError: this.options.onError,
				onChange: alterRange
			});
			var tableUpdater = this.getTable(myContent, editMode);

			var myModal = this.formModal({
				form: myContent,
				editMode: editMode,
				container: this.options.container, 
				onShow: this.options.onShow,
				onHide: this.options.onHide,
				onSave: function() {
					var errors = []
					var value = alterRange(textRange.getValue(), errors);
					var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);

					if (fixed && textRange.CustomValidate() && self.options.onSave(value)) {
						textRange.setValue(value);
						return true;
					} else {
						return false;
					}
				},
				onCancel: function() {
					// Restore default values!
					self._rangeEdit.forEach(function(tagInputs) {
						mapnls(tagInputs, function(lang, tagInput) {
							tagInput.value = tagInput.dataset.init;
							return tagInput;
						});
					});
					textRange.setValue(editRange);
					self.updateRangeList(initRange.split(";"));
					tableUpdater(self._rangeEdit);
					return true;
				}
			});

			var editRange = alterRange(this._rangeEdit.map(e=>e.value).join(";"), []);
			textRange.parent = myModal;
			textRange.setDisabled(!editMode);
			textRange.inject(tabNav);
			textRange.setValue(editRange);
			tableUpdater(this._rangeEdit);
		},
		enable: function() {
			this.editMode = true;
		},
		disable: function() {
			this.editMode = false;
		},

	};
	return AttrRangeTable;
});

/**
 * Form to	create a Specialization type, Deployment extension, Specialization extension type
 * and Customer extension type
 */

define('DS/DBSApp/Views/CreateAttrTable',
[
	'DS/DBSApp/Utils/UuidHandler', 
	'DS/UIKIT/Modal',
	'DS/UIKIT/Input/Text',
	'DS/UIKIT/Toggler',
	'DS/UIKIT/Input/Select',
	'DS/UIKIT/Input/Toggle',
	'DS/UIKIT/Input/Number',
	'DS/UIKIT/Input/Date',
	'DS/DBSApp/Views/Layouts/Widgets',
	'DS/UIKIT/Autocomplete',
	'DS/DBSApp/Views/AttrRangeTable',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
],
function(UuidHandler, Modal, Text, Toggler, Select, Toggle, Number, DateInput, DMSWidgets, Autocomplete, AttrRangeTable, myNls) {

	var NLSLANGS = ['en','fr','de','ja','ko','ru','zh'];

	var exports = {

		getTableDataElement: function(opts) {
			var td = new UWA.createElement('td', {
				'colspan': '1',
				'align': 'left',
				'width': opts.width,
				'styles': {
					'display': opts.disabled ? 'none' : ''
				}
			});
			return td;
		},
		getHeaderElement: function(opts) {
			var p = UWA.createElement('p', {
				'text': opts.headerName,
				'class': ''
			});

			var th = UWA.createElement('th', {
				'colspan': '1',
				'align': 'left',
				'width': opts.width,
				'white-space': 'nowrap',
				'overflow': 'hidden',
				'id': opts.headerId,
				'styles': {
					'display': opts.disabled ? 'none' : ''
				}
			});
			p.inject(th);
			return th;
		},
		AttrNameField: function(opts) {
			var that = this;
			var input = new Text({
				id: opts.id,
				events: {
					onChange: function() {
						var curVal = this.getValue();
						if (curVal.length == 0) return true;
						var regex = RegExp('^[a-zA-Z][a-zA-Z0-9]+$');
						if (regex.test(curVal) && this.elements.input.style.borderColor != null) {
							this.elements.input.style.borderColor = null;
						} else {
							this.elements.input.setStyle('border-color', "#EA4F37");
							DMSWidgets.createAlertBox({nls: 'ErrCreateAttrNameIncorrect'}).inject(that._theModal.elements.header);
						}
					}
				}
			});
			return input;
		},


		AttrPredicateField: function(opts) {
			var predicateDiv = UWA.createElement('div', {
				'id': opts.id,
				'class': 'autoCompletePredicate',
				styles: {
					//'width': '100%',
					overflow: 'visible'
				}
			});


			var autoCompletePredicate = new Autocomplete({
				showSuggestsOnFocus: true,
				multiSelect: false,
				minLengthBeforeSearch: 0,
				datasets: [],
				placeholder: myNls.get("createAttrFieldPredicatePlaceholder"),
				events: {},
				style: {
					//'width': '100%',
					overflow: 'visible'
				},
				events: {
					onSelect: function(item) {
						var predicateInputHidden = document.getElementById(opts.id + "_inputHidden");
						if (predicateInputHidden == undefined) {
							var input = UWA.createElement("input", {
								id: opts.id + "_inputHidden"
							});
							input.hidden = true;
							input.value = item.value;
							input.inject(predicateDiv)
						} else {
							predicateInputHidden.value = item.value;
						}
					}
				}
			}).inject(predicateDiv);
			autoCompletePredicate.addDataset({
				name: 'Predicates',
				items: opts.predicates.map(function(item) {
					return {
						value: item.curi,
						label: item.label
					};
				})
			});
			return autoCompletePredicate;
		},

		AttrLengthField: function(opts) {
			var that = this;
			var num = new Number({
				placeholder: myNls.get("createAttrFieldLengthPlaceholder"),
				min: 0,
				max: 350,
				step: 1,
				value: 0,
				id: opts.id,
				events: {
					onChange: function() {
						opts.onChange.call(that, this.getValue());
					}
				}
			});
			return num;
		},
		AttrDimensionValueField: function(opts, autoCompletePrefUnit) {
			var dimensionDiv = UWA.createElement('div', {
				'id': opts.id,
				'class': 'autoCompleteDim',
				styles: {
					//'width': '100%',
					overflow: 'visible'
				}
			});
			
			var autoCompleteDim = new Autocomplete({
				showSuggestsOnFocus: true,
				multiSelect: false,
				minLengthBeforeSearch: 0,
				datasets: [],
				placeholder: myNls.get("createAttrFieldDimensionPlaceholder"),
				events: {},
				style: {
					//'width': '100%',
					overflow: 'visible'
				},
				events: {
					onSelect: function(selectItem) {
						autoCompletePrefUnit.reset();
						var searchDico = opts.attrDimensions
							.filter(dim=>dim['Name']==selectItem.value)
							.flatMap(dim=>{
								return dim.Units.map(unit=>{
									return {
										"value":unit['Name'], 
										"label":unit['NLSName']
									};
								})
							});
						//autoCompletePrefUnit.cleanDataset(0);
						//autoCompletePrefUnit.removeDataset(0);
						autoCompletePrefUnit.datasets[0].items.length = 0
						autoCompletePrefUnit.addItems(searchDico, autoCompletePrefUnit.datasets[0]);
					},
					onUnselect: function() {
						autoCompletePrefUnit.reset();
					}
				}
			}).inject(dimensionDiv);
			autoCompleteDim.addDataset({
				name: 'Dimensions',
				items: opts.attrDimensions.map(function(item){
					return {
						value: item['Name'],
						label: item['NLS']
					};
				})
			});
			return autoCompleteDim;
		},
		AttrPreferedUnitValueField: function(opts) {
			var dimensionDiv = UWA.createElement('div', {
				'id': opts.id,
				'class': 'autoCompletePreferedUnit',
				styles: {
					//'width': '100%',
					overflow: 'visible'
				}
			});


			var autoCompleteDim = new Autocomplete({
				showSuggestsOnFocus: true,
				multiSelect: false,
				minLengthBeforeSearch: 0,
				datasets: [{
					items: []
				}],
				placeholder: myNls.get("createAttrFieldPrefUnitPlaceholder"),
				events: {},
				style: {
					//'width': '100%',
					overflow: 'visible'
				},
				events: {
					onSelect: function(item) {}
				}
			}).inject(dimensionDiv);
			return autoCompleteDim;
		},
		AttrAutorizedValueField: function(opts) {
			var that = this;
			var authorizedField = new Text({
				"id": opts.id,
				className: "form-control",
				events: {
					onChange: function() {
						var words = this.getRangeWords();
						var error = this.checkRangeWords();
						this.setValue(words.join(";"));
						if (error) {
							DMSWidgets.createAlertBox(error).inject(that._theModal.elements.header);
						} 
						opts.onChange.call(that, words);
					}
				}
			});
			authorizedField.getRangeWords = function() {
				var words = this.getValue().split(';');
				words = words.map(string => string.trim()).filter(string => string.length > 0);
				words = words.filter((item, index) => words.indexOf(item) == index); // Unique Values
				words = words.sort(opts.attrType!='Integer' ? undefined : function(a,b) {	// the function sort(), sort automatically in alphabetic order.
					return a - b
				})
				return words;
			}
			authorizedField.checkRangeWords = function() {
				var words = this.getValue().split(';').map(string => string.trim()).filter(string => string.length > 0);
				var duplicateValues = words.filter((item, index) => words.indexOf(item) != index);
				if (duplicateValues.length > 0) {
					this.elements.input.setStyle('border-color', "#EA4F37");
					return { nls: 'attrRangeErrDupValue', ITEMS: duplicateValues };
				}
				var invalidRegex = null;
				if ( opts.attrType == "String" && (invalidRegex = words.filter(item=>item.length && !item.match(/^[a-zA-Z0-9]+$/))).length ) {
					this.elements.input.setStyle('border-color', "#EA4F37");
					return { nls: 'attrRangeErrAlphanumeric', ITEMS: invalidRegex};
				} 
				if (opts.attrType == "Integer" && (invalidRegex = words.filter(item=>item.length && !item.match(/[-+]?[0-9]+$/))).length) {
					this.elements.input.setStyle('border-color', "#EA4F37");
					return { nls: 'attrRangeErrNumeric', ITEMS: invalidRegex};
				}
				this.elements.input.style.borderColor = null;
				return null;
			}

			authorizedField.CustomValidate = function() {
				return !this.checkRangeWords();
			}

			var _theRangeModal = new AttrRangeTable({
				rangeList: [], // Pas de valeur initiale à conserver dans l'UI
				attrType: opts.attrType,
				container: opts.container,
				editMode: true,
				onSave: function(value) {
					authorizedField.setValue(value);
					authorizedField.dispatchEvent("onChange"); // Dispatch event will invoke updateRangeList!!
					return true;
				},
				onHide: function() {
					that._theModal.show();
				}
			});

			var _langIcon = UWA.createElement("span", {
				class: "input-group-addon fonticon fonticon-language"
			})
			_langIcon.onclick = function() {
				var list = authorizedField.getRangeWords()
				authorizedField.setValue(list.join(";"));
				that._theModal.dispatchEvent("onHide", "HideForRangeModal");
				_theRangeModal.updateRangeList(list);
				_theRangeModal.launchPanel({
					attrName: opts.attrName() // nameField.getValue(),
				});
			}
			return {
				authorizedField: authorizedField, 
				authorizedModal: _theRangeModal, 
				authorizedIcon: _langIcon
			};

		},
		AttrDefaultValueField: function(opts, authorizedField) {
			var input = "";
			var that = this;
			var rangeWords = authorizedField && authorizedField.getRangeWords();
			if(rangeWords && rangeWords.length) {
				input = new Autocomplete({
					showSuggestsOnFocus: true,
					multiSelect: false,
					allowFreeInput: false,
					minLengthBeforeSearch: 0,
					datasets: [
						{
							name: 'Types',
							items: rangeWords.map(function(item) { 
								return { value: item };
							})
						}
					],
					placeholder: myNls.get("createAttrFieldDefaultValuePlaceholder"),
					style: {
						//'width': '100%',
						overflow: 'visible'
					}
				});
				
				input.validateWhenRangeIsDefined = function() { // BMN2 02/09/2021 : IR-830606-3DEXPERIENCER2022x
					let curDefaultValue = this.getValue();
					let words = authorizedField.getRangeWords();
					if (!this.isDisabled() && words.length && !words.includes(curDefaultValue)) {
						this.elements.inputContainer.setStyle('border-color', "#EA4F37");
						DMSWidgets.createAlertBox({nls: 'attrDefaultValShouldBeOneAmongRangeVal'}).inject(that._theModal.elements.header);
						return false;
					} else {
						this.elements.inputContainer.style.borderColor = null;
						return true;
					}
				}
				return input;
			}

			if (opts.attrType == "Date") {
				input = new DateInput({
					id: opts.id,
					placeholder: myNls.get("createAttrFieldDateDefaultValuePlaceholder"),
					showClearIcon: true,
					events: {
						onChange: function() {
							console.log(this);
							var dateObj = this.getDate();
							// A Faire : Trouver un moyen de stocker la valeur sous forme de milli secondes.
						}
					}
				});
			} else if (opts.attrType == "Integer") {
				input = new Text({
					id: opts.id
				});
				input.elements.input.oninput = function() {
					var regexInt = new RegExp('^[-+]?\\d+$');
					if (this.value.length > 1 && !regexInt.test(this.value)) {
						var reg = new RegExp('^[-+]?\\d+');
						var res = this.value.match(reg);
						if (res != null) {
							this.value = res[0];
						} else {
							this.value = "";
						}
					} else if (this.value.length == 1 && this.value != "-" && this.value != "+" && isNaN(this.value)) {
						this.value = "";
					}
				};
				input.elements.input.onchange = function() {
					if (this.value.length > 0) {
						this.value = parseInt(this.value);
						if (this.value > 2147483647) {
							this.value = 2147483647;
						} else if (this.value < -2147483647) {
							this.value = -2147483647;
						}
					}
				};
				//input.setValue('');
			} else if (opts.attrType == "Boolean") {
				input = new Select({
					id: opts.id,
					//placeholder: 'Select your option',
					options: [{
							value: 'true',
							label: myNls.get("createAttrFieldTrueLabel")
						},
						{
							value: 'false',
							label: myNls.get("createAttrFieldFalseLabel")
						}
					]
				});
			} else if (opts.attrType == "Double" || opts.attrType == "DoubleWithDim") {
				input = new Text({
					id: opts.id
				});
				input.elements.input.oninput = function() {
					var regexDouble = new RegExp('^[-+]?\\d+(\\.)?(\\d{1,6})?$');
					if (this.value.length > 1 && !regexDouble.test(this.value)) {
						//this.value = this.value.substring(0, this.value.indexOf('.') + 7);
						var reg = new RegExp('^[-+]?\\d+(\\.)?(\\d{1,6})?');
						var res = this.value.match(reg);
						if (res != null) {
							this.value = res[0];
						} else {
							this.value = "";
						}

					} else if (this.value.length == 1 && this.value != "-" && this.value != "+" && isNaN(this.value)) {
						this.value = "";
					}
				};
				input.elements.input.onchange = function() {
					if (this.value.length > 0) {
						this.value = parseFloat(this.value);
					}
				};
			} else {
				input = new Text({
					id: opts.id
				});
			}
			return input;
		},

		AttrMultiValueField: function(opts) {
			// BMN2 08/09/2021 :	IR-824980-3DEXPERIENCER2022x
			/*
			Put onChange event to manage the default value field according
			to the multi value field.
			*/
			var that = this;
			var toggle = new Toggle({
				type: 'switch',
				value: 'option1',
				label: '',
				id: opts.id,
				events: {
					onChange: function() {
						opts.onChange.call(that, this.isChecked());
					}
				}
			});
			if (opts.checked) {
				toggle.check();
			}
			return toggle;
		},

		AttrMultiLineField: function(opts) {
			var toggle = this.AttrToggleField(opts.id, opts.checked);
			return toggle;
		},

		AttrSearchableField: function(opts) {
			var toggle = this.AttrToggleField(opts.id, opts.checked);
			return toggle;
		},

		AttrUserAccessField: function(opts) {
			var select = new Select({
				id: opts.id,
				placeholder: false,
				options: [{
						value: 'ReadWrite',
						label: myNls.get("createAttrFieldReadWriteLabel"),
						selected: true
					},
					{
						value: 'ReadOnly',
						label: myNls.get("createAttrFieldReadOnlyLabel")
					}
				]
			});
			return select;
		},

		AttrResetWhenDuplicatedField: function(opts) {
			var toggle = this.AttrToggleField(opts.id, opts.checked);
			return toggle;
		},

		AttrResetWhenVersionedField: function(opts) {
			var toggle = this.AttrToggleField(opts.id, opts.checked);
			return toggle;
		},

		AttrV6ExportableField: function(opts) {
			var toggle = this.AttrToggleField(opts.id, opts.checked);
			return toggle;
		},
		/*S63 : 2/8/2022
		* FUN114519
		* Adding has default radio button
		*/
		AttrHasDefaultField: function(opts) {
			var that = this;
			var toggle = new Toggle({
				type: 'switch',
				value: 'option1',
				label: '',
				id: opts.id,
				events: {
					onChange: function() {
						opts.onChange.call(that, this.isChecked())
					}
				}
			});
			if (opts.checked) {
				toggle.check();
			}
			return toggle;
		},

		/* bmn2 : 10/20/2020:  We don't want expose this porperty now. */
		AttrResetOnForkField: function(opts) {
			var toggle = this.AttrToggleField(opts.id, opts.checked);
			return toggle;
		},

		AttrToggleField: function(id, checked) {
			var toggle = new Toggle({
				type: 'switch',
				value: 'option1',
				label: '',
				id: id
			});
			if (checked) {
				toggle.check();
			}
			return toggle;
		},
		TabNavPanel: function() {
			var tabNav = UWA.createElement('div', {
				'id': "got-tab-sample",
				'class': "tab"
			}); //.inject(myContent);
			tabNav.setStyle("justify-content", "center");
			var basics = UWA.createElement('a', {
				'class': "tab-item",
				text: myNls.get("BasicsTab")
			}).inject(tabNav);
			var values = UWA.createElement('a', {
				'class': "tab-item",
				text: myNls.get("ValuesTab")
			}).inject(tabNav);
			var behavior = UWA.createElement('a', {
				'class': "tab-item",
				text: myNls.get("BehaviorsTab")
			}).inject(tabNav);
			var translations = UWA.createElement('a', {
				'class': "tab-item",
				text: myNls.get("TranslationsTab")
			}).inject(tabNav);
			var basicsToggler = new Toggler({
				container: tabNav,
				activeClass: 'active',
				//ignored: ['disabled', 'not-selectable'],
				selected: 0,
				events: {
					onToggle: function(element, index, active) {
						console.log(active ? 'Entering' : 'Leaving', element.innerHTML);
						if (index == 0) {
							var nameColumn = document.getElementById('nameColumn');
							if (nameColumn != undefined) {
								nameColumn.scrollIntoView({
									behavior: 'smooth',
									inline: 'start'
								});
							}
						} else if (index == 1) {
							// BMN2 02/09/2021: IR-832187-3DEXPERIENCER2022x
							var authorizedValueColumn = document.getElementById('authorizedValueColumn');
							var defaultValueColumn = document.getElementById('defaultValueColumn');
							if (authorizedValueColumn && !authorizedValueColumn.isHidden()) {
								authorizedValueColumn.scrollIntoView({
									behavior: 'smooth',
									inline: 'start'
								});
							} else if(defaultValueColumn && !defaultValueColumn.isHidden()) {
								defaultValueColumn.scrollIntoView({
									behavior: 'smooth',
									inline: 'start'
								});
							}
						} else if (index == 2) {
							var multiValueColumn = document.getElementById('multiValueColumn');
							var hasDefaultColumn = document.getElementById('hasDefaultColumn');
							if (hasDefaultColumn && !hasDefaultColumn.isHidden()) {
								hasDefaultColumn.scrollIntoView({
									behavior: 'smooth',
									inline: 'start'
								});
							} else if(multiValueColumn && !multiValueColumn.isHidden()) {
								multiValueColumn.scrollIntoView({
									behavior: 'smooth',
									inline: 'start'
								});
							}
						} else if (index == 3) {
							var resetWhenDupColumn = document.getElementById('TransEN');
							if (resetWhenDupColumn) {
								resetWhenDupColumn.scrollIntoView({
									behavior: 'smooth',
									inline: 'start'
								});
							}
						}
					}
				}
			});
			return tabNav;
		},
		checkForm: function(options, lines) {
			options = options || this.options;
			lines = lines || this.lines;

			// BMN2 09/09/2021 : IR-825343-3DEXPERIENCER2022x
			// We are checking the creation panel if the attribute name unqiue
			// among all attributes to be created. 
			var attrNameList = lines.reduce(function(result,line) {
				var attrName = line['Name'].getValue();
				if(result && attrName.length && result.includes(attrName)) return null;
				return !result || !attrName.length ? result : result.concat([attrName]);
			}, [])
			if (!attrNameList) {
				return {
					nls:'ErrCreateAttrNameShouldBeUnique'
				};
			}
			// We are checking if the name is already taken by another attribute.
			let attrNameExist = attrNameList.filter((attrName)=>options.dicoHandler.isNameExistingForAttr(attrName));
			if (attrNameExist.length) {
				return {
					nls: 'ErrCreateAttrNameAlreadyTaken',
					NAME: attrNameExist.join(', ')
				};
			}

			let attrNameInvalid = attrNameList.filter(function(attrName){
				return !attrName.match(/^[a-zA-Z][a-zA-Z0-9]+$/)
			})
			if(attrNameInvalid.length) {
				return {
					nls: 'ErrCreateAttrNameInvalid',
					NAME: attrNameInvalid.join(', ')
				};
			}

			let attrRangeInvalid = lines.map(function(line){
				var attrName = line['Name'].getValue();
				let rangeValid = !line['AuthorizedValues'] || line['AuthorizedValues'].CustomValidate();
				let defaultFieldValid = !line['AuthorizedValues'] || !line['Default'].validateWhenRangeIsDefined || line['Default'].validateWhenRangeIsDefined();
				return (!rangeValid || !defaultFieldValid) && attrName;
			}).filter(item=>!!item)
			if(attrRangeInvalid.length) {
				return {
					nls: 'ErrCreateAttrRangeInvalid',
					NAME: attrRangeInvalid.join(', ')
				};
			}
			return null;
		},
		extractFormQuery: function(options, lines) {
			options = options || this.options;
			lines = lines || this.lines;

			var aggregator = options.aggregator;
			var attrType = options.attrType;
			var nature = aggregator.get('nature');
			var aggregatorId = aggregator.get('id');
			var isIRPC = options.dicoHandler.isIRPC(aggregatorId, nature);
			var isDepl = nature == "Interface" && aggregator.get('automatic') == "Yes";
			var aggregatorPackage = options.dicoHandler.getPackageNameToCreate(isIRPC, isDepl)
			if(isIRPC == undefined) return false;
			
			
			var attributes = lines.filter(line=>line['Name'].getValue().length).map(function (line) {
				var attrName = line['Name'].getValue();
				var attribute = {
					'Name': attrName + options.dicoHandler.charFlag + UuidHandler.create_UUID().getUuidWithoutSeparator(),
					'Nature': 'Attribute',
					'Description': '',
					'Type': attrType.replace('DoubleWithDim', 'Double'),
					'Protection': 'Free',
					'HasRangeDefined': 'No',
					'Local': isIRPC ? 'Yes' : 'No',
					'Owner': isIRPC ? aggregatorId : '',
					'UIAccess': line['UIAccess'].getValue()[0], // the method getValue() give the option selection in an array. So we have to keep the first entry of the array.
					'MultiValuated': line['MultiValuated'].isChecked() ? 'Yes' : 'No',
					'Indexation': line['Indexation'].isChecked() ? 'Yes': 'No',
					'V6Exportable': line['V6Exportable'].isChecked() ? 'Yes': 'No',
					"ResetOnClone": line['ResetOnClone'].isChecked() ? 'Yes': 'No',
					// "ResetOnFork": line['ResetOnFork'].isChecked() ? 'Yes': 'No',
					"ResetOnRevision": line['ResetOnRevision'].isChecked() ? 'Yes': 'No',
					'NameNLS': NLSLANGS.reduce(function(result, lang){ // BMN2 17/11/2020 : IR-807296-3DEXPERIENCER2021x: We send only nls value which is not empty.
						var nls = line['nameNLS_' + lang].value
						if(nls) result[lang] = nls;
						return result;
					}, {
						"en": attrName // Default NLS value
					})
				};

				// Sixw predicate
				var attrPredicate = line["SixWPredicate"].getValue();
				if (attrPredicate) {
					attribute["SixWPredicate"] = attrPredicate;
				}

				// Authorized Values
				if (attrType == "String" || attrType == "Integer") {
					var rangeList = line['AuthorizedValues'].getValue().split(';').map(item=>item.trim()).filter(item=>item != "");
					if (rangeList.length > 0) {
						attribute["HasRangeDefined"] = "Yes";
						attribute["AuthorizedValues"] = rangeList;
						attribute["AuthorizedValuesNLS"] = {};
						// NLS for Authorized Values
						var rangesNls = line["AuthorizedValuesNLS"].getNLSRange() || {};
						if(rangesNls) for(let range of rangeList) {
							attribute["AuthorizedValuesNLS"][range] = {};
							var rangeNls = rangesNls[range] || {};
							for(let nls in rangeNls) if(!!rangeNls[nls]) attribute["AuthorizedValuesNLS"][range][nls] = rangeNls[nls];
						}
					}
				}

				// Length && Multiline
				if (attrType == "String") {
					var attrLength = line["MaxLength"].getValue();	
					if (attrLength && attrLength != "0") attribute["MaxLength"] = attrLength;
					attribute["MultiLine"] = line["MultiLine"].isChecked() ? "Yes" : "No";
				}

				// Dimension && Manipulation Unit
				if (attrType == "DoubleWithDim") {
					var dimension = line['Dimension'].getValue();
					var manipUnit = line['ManipulationUnit'].getValue();
					if (dimension.length > 0) {
						attribute["HasMagnitude"] = "Yes";
						attribute["Dimension"] = dimension;
						attribute["ManipulationUnit"] = manipUnit;
					}
				}

				
				{ // Default Value && HasDefault
					var attrDefaultValue = line['Default'].getValue();
					if (attrType == "Date") {
						var date = line['Default'].getDate();
						if (date != null || date != undefined) {
							/*
							We set 10:00:00 AM because if we call directly toISOString()
							method, then the date is changed. Because the time is set to 00:00:00 when the user choose
							a date on UI.
							*/
							//date.setHours(10);
							/* We build a string with the date and a time in GMT, the output od to ISPString() is something like "2020-07-08T08:00:00.000Z"
							so we retrieve the only the date "2020-07-08" then we add the time in GMT.
							*/
							//var sDate = date.toISOString().split('T')[0] + "@10:00:00:GMT";
							//var myFormatedDate = new Date(sDate);
							/*
							we want the date in timestamp in secondes
							*/
							/* BMN2 08/01/2021 : IR-815276-3DEXPERIENCER2021x
							* Issue with firefox compatibility with Date() Class
							*/
							let formatedDate = new Date(date.toDateString() + " 10:00:00 GMT");
							let timestampInSec = Math.floor(formatedDate.getTime() / 1000);
							// the timestamp has to be in String before sending to the webservice.
							attrDefaultValue = timestampInSec.toString();
							//	commenter en attendant la livraison de mamadou.
							//attrDefaultValue = "";
						}
					}
					// For Boolean type attribute
					if (Array.isArray(attrDefaultValue) && attrDefaultValue.length > 0) {
						attrDefaultValue = attrDefaultValue[0];
					}
					if (attribute["MultiValuated"]==='Yes') { // If the attribute is multivalued then we clean the value of the default value
						attrDefaultValue = "";
					}

					// S63 02/08/2022 FUN114519 : new button hasDefault
					if (line['HasDefault']) {
						var attrHasDefault = line['HasDefault'].isChecked();
						
						if(!attrHasDefault) { 
							attribute["HasDefault"] = "No"; // S63 02/08/2022 FUN114519 : new statement hasDefault
							attrDefaultValue = ""; // If the attribute	do not have hasDefault then we clean the value of the default value
						}
					}
					if (attrDefaultValue) {
						attribute['Default']=attrDefaultValue;
					}
				}
				return attribute;
			});
			return {
				"AggregatorPackage": aggregatorPackage,
				"AggregatorName": aggregatorId,
				"AggregateMode": isIRPC ? "Local" : "Global",
				"AggregatorNature": nature,
				"Attributes": attributes.reduce(function(result, attribute) {
					result[attribute.Name] = attribute;
					return result;
				}, {})
			};
		},
		//Modal for the Type form and Extension form
		formModal: function(options) {
			var _theModal = new Modal({
				className: 'fancy',
				visible: true,
				closable: true,
				body: options.form,
				header: UWA.createElement('div', {
					'class': 'global-div',
					'html':[
						{ //tag nav element Why?!
							'class': 'tab tab-pills'
						},
						{ //title for the Modal
							'tag': 'h4',
							'text':	options.header
						}
					]
				}),
				footer: 
					"<button type='button' id='SaveButton' class='btn btn-primary'>" + myNls.get("Save") + "</button>" +
					"<button type='button' id='CancelBtn' class='btn btn-default'>" + myNls.get("Cancel") + "</button> ",
				renderTo: options.container,

				events: {
					onHide: function(arg) {
						UWA.log("the Modal Closed");
						// As we call the hide() function when the user click on range NLS popup
						// we avoid to destroy the modal.
						if (typeof arg === "string" && arg === "HideForRangeModal") {
							_theModal.isVisible = false;
							_theModal.elements.container.setStyle("display", "");
						} else {
							_theModal.destroy();
						}
					},
					onShow: function() {
						UWA.log("the Modal shown");
						var observer = new IntersectionObserver(function(entries) {
							entries.sort(function(a, b) {
								return (a.intersectionRatio < b.intersectionRatio) ? 1 : (a.intersectionRatio > b.intersectionRatio) ? -1 : 0;
							});
							var toggler = document.getElementById('got-tab-sample');
							if (toggler && entries.length > 0) {
								// console.log("target : " + entries[0].target.id);
								// console.log("ratio : " + entries[0].intersectionRatio);
								if (entries[0].target.id == "nameColumn" && entries[0]['intersectionRatio'] >= 0.90) {
									toggler.getElementsByClassName('active')[0].toggleClassName('active');
									toggler.getChildren()[0].toggleClassName('active');
								}
								if (entries[0].target.id == "authorizedValueColumn" && entries[0]['intersectionRatio'] >= 0.90) {
									toggler.getElementsByClassName('active')[0].toggleClassName('active');
									toggler.getChildren()[1].toggleClassName('active');
								}
								if (entries[0].target.id == "defaultValueColumn" && entries[0]['intersectionRatio'] >= 0.90) {
									toggler.getElementsByClassName('active')[0].toggleClassName('active');
									toggler.getChildren()[1].toggleClassName('active');
								}
								if (entries[0].target.id == "hasDefaultColumn" && entries[0]['intersectionRatio'] >= 0.90) {
									toggler.getElementsByClassName('active')[0].toggleClassName('active');
									toggler.getChildren()[2].toggleClassName('active');
								}
								if (entries[0].target.id == "multiValueColumn" && entries[0]['multiValueColumn'] >= 0.90) {
									toggler.getElementsByClassName('active')[0].toggleClassName('active');
									toggler.getChildren()[2].toggleClassName('active');
								}
								if (entries[0].target.id == "TransDE" && entries[0]['intersectionRatio'] >= 0.90) {
									toggler.getElementsByClassName('active')[0].toggleClassName('active');
									toggler.getChildren()[3].toggleClassName('active');
								}
								if (entries[0].target.id == "TransZH" && entries[0]['intersectionRatio'] >= 0.90) {
									toggler.getElementsByClassName('active')[0].toggleClassName('active');
									toggler.getChildren()[3].toggleClassName('active');
								}
							}
						}, {
							threshold: [1]
						});
						// BMN2 02/09/2021: IR-832187-3DEXPERIENCER2022x
						if (document.getElementById('authorizedValueColumn')) {
							observer.observe(document.getElementById('authorizedValueColumn'));
						} else {
							observer.observe(document.getElementById('defaultValueColumn'));
						}
						observer.observe(document.getElementById('nameColumn'));
						observer.observe(document.getElementById('hasDefaultColumn'));
						observer.observe(document.getElementById('multiValueColumn'));
						observer.observe(document.getElementById('TransDE'));
						observer.observe(document.getElementById('TransZH'));
					}
				}
			});
			_theModal.elements.wrapper.setStyle('width', '800px');
			_theModal.getFooter().getElement('#CancelBtn').addEvent('click', function() {
				_theModal.destroy();
			});
			_theModal.getFooter().getElement('#SaveButton').addEvent('click', function() {
				var saveButton = this;
				var saveOptions = UWA.merge({
					container: _theModal.elements.header
				}, options);

				saveButton.disabled = true;
				return options.onSave(saveOptions,
					function onSubmit() {
						_theModal.destroy();
					},
					function onFailure(){
						saveButton.disabled = false;
					}
				);
			});
			return _theModal;
		},
		onLineChanged: function(options, line, field, value) {
			switch(field) {
				case 'AuthorizedValues': {
					// BMN2 08/09/2021 : IR-824980-3DEXPERIENCER2022x
					// We save the state of the default value before resetting it.
					// As we will be able to reset as it was.
					let wasDisabled = line['Default'].isDisabled()
					let parent = line['Default'].elements.container.getParent();
					line['Default'].elements.container.remove();
					line['Default'] = this.AttrDefaultValueField({
						id: "attrDefaultValueInput_" + line.id
					}, line['AuthorizedValues']);
					line['Default'].inject(parent);
					if (value.length && line['MaxLength']) { // string attribute only
						line['MaxLength'].setValue("0"); // Autocomplete
					}
					if (wasDisabled) {
						if (value.length) line['Default'].resetInput(); // Autocomplete
						if (!value.length) line['Default'].setValue(""); // text field
						line['Default'].setDisabled(true);
					}
					break;
				}
				case 'MaxLength': {
					if(line['Default']) {
						if (value > 0) {
							if (line['Default'].getValue().length > parseInt('0' + value)) {
								line['Default'].setValue("");
							}
							line['Default'].elements.input.maxLength = value;
						} else {
							line['Default'].elements.input.removeAttribute('maxLength');
						}
					}
					break;
				}
				case 'MultiValuated': {
					line['HasDefault'].setCheck(!value);
					line['HasDefault'].setDisabled(value);
					if(value && options.dicoHandler.hasDef) { // Ce message est vraiment pénible
						DMSWidgets.createCustoAlert({
							'message': myNls.get('multiValSetTrue'),
							'delay': 3000,
							'type': 'primary',
							'auto': true
						}).inject(this._theModal.elements.header);
					}
					if (value) {
						// Sometimes the default value is autocomplete field
						// so we have to manage diffferently
						/*if (line['Default'] instanceof Autocomplete) {
							line['Default'].resetInput();
						} else {
							line['Default'].setValue("");
						}*/
					} 
					break;
				}
				case 'HasDefault': {
					line['MultiValuated'].setCheck(line['MultiValuated'].isChecked() && value);
					line['MultiValuated'].setDisabled(!value);

					if(options.dicoHandler.hasDef) DMSWidgets.createCustoAlert({ // Ce message est vraiment pénible
						'message': myNls.get(value ? 'defValSetTrue' : 'defValSetFalse'),
						'delay': 3000,
						'type': 'primary',
						'auto': true
					}).inject(this._theModal.elements.header);

					if (!value) {
						// Sometimes the default value is autocomplete field
						// so we have to manage diffferently
						/*if (line['Default'] instanceof Autocomplete) {
							line['Default'].resetInput();
						} else {
							line['Default'].setValue("");
						}*/
					}
					break;
				}
			}

			var hasRange   = line['AuthorizedValues'] && line['AuthorizedValues'].getValue()!=''
			var hasDefault = !line['HasDefault'] || line['HasDefault'].isChecked();
			var isMultiVal = line['MultiValuated'] && line['MultiValuated'].isChecked();
			if(line['Default'])    line['Default'].setDisabled(!hasDefault || isMultiVal);
			if(line['MaxLength'])  line['MaxLength'].setDisabled(hasRange);
			if(line['Default'] && line['Default'].isDisabled()) {
				if (line['Default'].unselectAll) line['Default'].unselectAll(); // Autocomplete
				if (line['Default'].resetInput) line['Default'].resetInput(); // Autocomplete
				if (line['Default'].setValue) line['Default'].setValue(""); // text field
			}
		},
		launchPanel: function(options) {
			if(!exports.isPrototypeOf(this)) {
				return exports.launchPanel.call(Object.create(exports), options);
			}
			this.lines = [];
			this.options = options;

			var myContent = UWA.createElement('div', {
				'id': "myContent",
			});
			var tabNav = this.TabNavPanel();
			tabNav.inject(myContent);

			var tableWrapper = UWA.createElement('div', {
				'class': "tableDiv"
			}).inject(myContent);
			tableWrapper.setStyle('overflow-x', 'auto');
			//tableWrapper.setStyle('overflow-y', 'auto');
			tableWrapper.onscroll = function() {
				var resetWhenDupColumn = document.getElementById('resetWhenDupColumn');
				if (resetWhenDupColumn != undefined && resetWhenDupColumn.isInViewport(this)) {
					//alert('in Viewport');
				}
			};
			var table = UWA.createElement('table', {
				'class': 'table', //'tableImportExport',
				'id': 'attrTable',
				'styles': {
					'width': '3900px',
					'height': '300px',
					'max-width': 'unset',
					'table-layout': 'fixed',
					'display': 'block'
				}
			}).inject(tableWrapper);

			var thead = UWA.createElement('thead', {
				'class': 'attrthead',
				'id': 'attrthead'
			}).inject(table);

			var tbody = UWA.createElement('tbody', {
				'class': 'attrtbody',
				'id': 'attrtbody'
			}).inject(table);

			{
				var firstLine = UWA.createElement('tr').inject(thead);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableNameHeader"),
					width: "250px",
					headerId: "nameColumn"
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTablePredicateHeader"),
					width: "250px",
					headerId: "predicateColumn"
				}).inject(firstLine);

				if (options.attrType == "String") {

					this.getHeaderElement({
						headerName: myNls.get("createAttrTableLengthHeader"),
						width: "200px",
						headerId: "lengtheColumn"
					}).inject(firstLine);
				}
				if (options.attrType == "String" || options.attrType == "Integer") {
					this.getHeaderElement({
						headerName: myNls.get("createAttrTableRangesHeader"),
						width: "250px",
						headerId: "authorizedValueColumn"
					}).inject(firstLine);
				}
				if (options.attrType == "DoubleWithDim") {
					this.getHeaderElement({
						headerName: myNls.get("createAttrTableDimensionHeader"),
						width: "250px",
						headerId: "dimensionsValueColumn"
					}).inject(firstLine);

					this.getHeaderElement({
						headerName: myNls.get("createAttrTablePrefUnitHeader"),
						width: "250px",
						headerId: "PreferendUnitValueColumn"
					}).inject(firstLine);
				}
				var defaultValueHeaderNls = myNls.get("createAttrTableDefaultValueHeader");
				if (options.attrType === "DoubleWithDim") {
					defaultValueHeaderNls = myNls.get("createAttrTableDefaultValueForDimHeader");
				}
				this.getHeaderElement({
					headerName: defaultValueHeaderNls,
					width: "250px",
					headerId: "defaultValueColumn"
				}).inject(firstLine);

				this.getHeaderElement({
					headerName: myNls.get("createAttrTableUserAccessHeader"),
					width: "200px",
					headerId: "userAccessColumn"
				}).inject(firstLine);

				this.getHeaderElement({ // S63 02/08/2022 - FUN114519 - Adding has default column
					headerName: myNls.get("createAttrHasDefaultHeader"),
					width: "100px",
					headerId: "hasDefaultColumn",
					disabled: !options.dicoHandler.hasDef
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableMultiValueHeader"),
					width: "100px",
					headerId: "multiValueColumn"
				}).inject(firstLine);
				if (options.attrType == "String") {
					this.getHeaderElement({
						headerName: myNls.get("createAttrTableMultilineHeader"),
						width: "100px",
						headerId: "multiLineColumn"
					}).inject(firstLine);
				}

				this.getHeaderElement({
					headerName: myNls.get("createAttrTableSearchableHeader"),
					width: "100px",
					headerId: "searchableeColumn"
				}).inject(firstLine);


				this.getHeaderElement({
					headerName: myNls.get("createAttrTableResetWhenDupHeader"),
					width: "100px",
					headerId: "resetWhenDupColumn"
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableResetWhenVerHeader"),
					width: "100px",
					headerId: "resetWhenVersColumn"
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableResetOnForkHeader"),
					width: "100px",
					headerId: "resetOnForkColumn",
					disabled: true /* bmn2 10/20/2020: We don't want to expose this property now. */
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTable3DXMLHeader"),
					width: "100px",
					headerId: "XPDMExporColumn"
				}).inject(firstLine);

				this.getHeaderElement({
					headerName: myNls.get("createAttrTableEnHeader"),
					width: "250px",
					headerId: "TransEN"
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableFrHeader"),
					width: "250px",
					headerId: "TransFR"
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableDeHeader"),
					width: "250px",
					headerId: "TransDE"
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableJaHeader"),
					width: "250px",
					headerId: "TransJA"
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableKoHeader"),
					width: "250px",
					headerId: "TransKO"
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableRuHeader"),
					width: "250px",
					headerId: "TransRU"
				}).inject(firstLine);
				this.getHeaderElement({
					headerName: myNls.get("createAttrTableZhHeader"),
					width: "250px",
					headerId: "TransZH"
				}).inject(firstLine);
				// First line of input
			}

			for (let i = 0; i < 3; i++) {
				let inputLine = UWA.createElement('tr').inject(tbody);
				let curLine = {
					id: i
				};
				Object.assign(curLine, {
					'Name': this.AttrNameField({
						id: "attrNameInput_" + i
					}),
					'SixWPredicate': this.AttrPredicateField({
						id: 'predicateInput_' + i,
						predicates: options.dicoHandler.getPredicatesBasedOnType(options.attrType.replace('WithDim', ''))
					}),
					'UIAccess': this.AttrUserAccessField({
						id: "attrUserAcessInput_" + i,
					}),
					'V6Exportable': this.AttrV6ExportableField({
						id: "attrV6ExportableInput_" + i
					}),
					'Indexation': this.AttrSearchableField({
						id: "attrSearchableInput_" + i,
						checked: true
					}),
					'ResetOnClone': this.AttrResetWhenDuplicatedField({
						id: "attrResetWhenDupInput_" + i,
						checked: true
					}),
					'ResetOnRevision': this.AttrResetWhenVersionedField({
						id: "attrResetWhenVersInput_" + i,
						checked: true
					}),
					'ResetOnFork': this.AttrResetOnForkField({
						id: "attrResetOnForkInput_" + i
					}),
					'MultiValuated': this.AttrMultiValueField({
						id: "attrMultiValueInput_" + i,
						checked: false,
						onChange: this.onLineChanged.bind(this, options, curLine, 'MultiValuated')
					}),
					'HasDefault': this.AttrHasDefaultField({ // S63 02/08/2022 - FUN114519 - Adding HasDefault option
						id: "attrHasDefaultInput_" + i,
						checked: true,
						onChange: this.onLineChanged.bind(this, options, curLine, 'HasDefault')
					})
				});

				if (options.attrType == "String") {
					curLine["MaxLength"] = this.AttrLengthField({
						id: "attrLengthInput_" + i,
						onChange: this.onLineChanged.bind(this, options, curLine, 'MaxLength')
					});
					curLine["MultiLine"] = this.AttrMultiLineField({
						id: "attrMultiLineInput_" + i
					});
				}

				if (options.attrType == "DoubleWithDim") {
					curLine['ManipulationUnit'] = this.AttrPreferedUnitValueField({
						id: "attrPreferedUnitValueInput_" + i
					}, i);
					curLine['Dimension'] = this.AttrDimensionValueField({
						id: "attrDimValueInput_" + i,
						attrDimensions: Object.values(options.dicoHandler.attrDimensions)
					}, curLine['ManipulationUnit']);
				}

				if (options.attrType == "String" || options.attrType == "Integer") {
					let {authorizedField, authorizedModal, authorizedIcon} = this.AttrAutorizedValueField({
						id: "attrAutorizedValueInput_" + i,
						container: options.container,
						attrType: options.attrType,
						attrName: function() { return curLine['Name'].getValue() },
						onChange: this.onLineChanged.bind(this, options, curLine, 'AuthorizedValues')
					});

					curLine['AuthorizedIcon'] = authorizedIcon;
					curLine['AuthorizedValues'] = authorizedField;
					curLine['AuthorizedValuesNLS'] = authorizedModal;
				}

				curLine['Default'] = this.AttrDefaultValueField({
					attrType: options.attrType,
					id: "attrDefaultValueInput_" + i
				}, curLine['AuthorizedValues']);



				for(let cellDef of [
					{ fields: ['Name'], width: '250px' },
					{ fields: ['SixWPredicate'], width: '250px' },
					{ fields: ['MaxLength'], width: '200px' },
					{ fields: ['AuthorizedValues', 'AuthorizedIcon'], width: "250px" },
					{ fields: ['Dimension'], width: '250px' },
					{ fields: ['ManipulationUnit'], width: '250px' },
					{ fields: ['Default'], width: '250px' },
					{ fields: ['UIAccess'], width: '250px' },
					{ fields: ['HasDefault'], width: '100px', disabled: !options.dicoHandler.hasDef },
					{ fields: ['MultiValuated'], width: '100px' },
					{ fields: ['MultiLine'], width: '100px' },
					{ fields: ['Indexation'], width: '100px' },
					{ fields: ['ResetOnClone'], width: '100px' },
					{ fields: ['ResetOnRevision'], width: '100px' },
					{ fields: ['ResetOnFork'], width: '100px', disabled: true },
					{ fields: ['V6Exportable'], width: '100px' },
				]) if(curLine[cellDef.fields[0]]) {
					let cellHtml = this.getTableDataElement(cellDef).inject(inputLine);
					if(cellDef.fields.length>1) {
						cellHtml = UWA.createElement("div", {
							class: "input-group"
						}).inject(cellHtml);
					}
					for(let field of cellDef.fields) {
						curLine[field].inject(cellHtml);
					}
				}
				for(let lang in NLSLANGS) {
					curLine['nameNLS_' + NLSLANGS[lang]] = UWA.createElement('input', {
						type: "text",
						'class': 'form-control',
						"id": "NLSValue" + lang.toUpperCase() + i
					});
					curLine['nameNLS_' + NLSLANGS[lang]].inject(this.getTableDataElement({
						width: "250px"
					}).inject(inputLine));
				}
				this.lines.push(curLine);
			}
			this._theModal = this.formModal(UWA.merge({
				form: myContent,
				onSave: function(options, onSuccess, onFailure) {
					var result = this.doSave(options, this.lines);
					if(!result) { // Strange error in extractFormQuery !!
						onFailure();
						return false;
					} else if(result.nls) { // error from checkForm
						DMSWidgets.createAlertBox(result).inject(options.container);
						onFailure();
						return false;
					} else { // Real query to apply
						options.wsSubmit(options, result, onSuccess, onFailure)
					}
				}.bind(this)
			}, options));

			return this;
		},
		getField: function(row, name) {
			return this.lines[row][name];
		},
		destroy: function(){
			this._theModal.destroy();
		},
		doSave: function(options, lines) {
			options = options || this.options;
			lines = lines || this.lines;
			return this.checkForm(options, this.lines) || this.extractFormQuery(options, this.lines);
		},
		clickOnSave: function() {
			this._theModal.getFooter().getElement('#SaveButton').dispatchEvent(new Event('click'));
		}
	};
	return exports;
});

define('DS/DBSApp/Views/AttrDisplayView',
[
	'UWA/Core',
	'UWA/Class/View',
	'DS/UIKIT/Scroller',
	'DS/DBSApp/Views/Layouts/CustomField',
	'DS/UIKIT/Input/Button',
	'DS/DBSApp/Views/Layouts/Widgets',
	'DS/DBSApp/Views/AttrRangeTable',
	'DS/DBSApp/Models/AttributeModel',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
],
function(UWA, View, Scroller, CustomField, Button, DMSWidgets, AttrRangeTable, AttributeModel, myNls) {

	'use strict';
	/*
	This class generates all the views in the process View. In other words, it's the "leader" view.
	*/
	return View.extend({
		tagName: 'div',
		className: 'AttributesView',

		setup: function(options) {
			this.aggregator = options.aggregator;
			this.dicoHandler = options.dicoHandler;
			this.modal = null;
			this.editor = null;
			this.persistJSONObject = null;
			this.fieldNew = [];
			this.fieldNew.NLSField = [];
			this.saveBtn = null;
			
			/*
				J'ajoute ce event pour gérer la largeur des noms de chaque champs.
			*/
			this.addEvent("onPostInject", function(tt) {
				var maxWidth = 0;
				tt.getElements("span.fieldHeader").forEach(function(item) {
					var tmpWidth = item.getSize().width;
					if (tmpWidth > maxWidth) {
						maxWidth = tmpWidth;
					}
				});
				tt.getElements("span.fieldHeader").forEach(function(item) {
					var tmpWidth = item.setStyle("min-width", maxWidth);
					item.setStyle("background-color", "#f4f5f6");
					//item.setStyle("font-weight","bold");
				});
			});
			// return this;
		},

		getDefaultValueField: function(attrType, value, rangesValues, editable, maxLength, enabler) {
			let input = "";
			const defaultValueLabel = myNls.get('AttrEditDefaultValueFieldLabel');
			
			if ((rangesValues || []).length > 0) {
				input = new CustomField("Default", 'autocomplete', defaultValueLabel, value, value, editable).buildField().disable(true);
				input.fieldInput.addDataset({
					name: 'range',
					items: []
				});

				input.fieldInput.addEvents({ // IR-938193-3DEXPERIENCER2023x && IR-815936-3DEXPERIENCER2021x
					'onBlur': function() {
						const curVal = this.elements.input.value;
						let item = this._getActiveItem() || this.getItemByLabel(curVal) || this.getItemByLabel(value) || this.getItems()[0];
						this.toggleSelect(item);
					}
				})

				input.updateRange = function(rangesValues) {
					var words = rangesValues
						.map(tmp=>String(tmp).trim())
						.filter(tmp=>tmp.length>0)
						.sort(attrType=='Integer' ?
							(function(a,b) { return parseInt('0' + a) - parseInt('0' + b) }) : 
							(function(a,b) { return a.localeCompare(b);})
						);
					if (words.length > 0) {
						var oldDefaultValueContent = input.getValue() || value;
						var newDefaultValueContent = words.indexOf(oldDefaultValueContent)>=0 ? oldDefaultValueContent : value;
						input.fieldInput.cleanDataset('range');
						input.fieldInput.addItems(words.map(function(item) {
							return {
								value: item.toString(),
								selected: newDefaultValueContent == item.toString()
							}
						}),input.fieldInput.getDataset('range'));
						input.enable();
					} else if(enabler()) {
						return this.getDefaultValueField(attrType, value, words, editable, maxLength, enabler);
					}
				}.bind(this);
				input.updateRange(rangesValues);
				input.disable();
			} else if (attrType == "Integer") {
				input = new CustomField("Default", 'input', defaultValueLabel, value, value, editable).buildField().disable(true);
				input.fieldInput.elements.input.oninput = function() {
					var regexInt = new RegExp('^[-+]?\\d+$');
					if (this.value.length > 1 && !regexInt.test(this.value)) {
						this.value = "";
					} else if (this.value.length == 1 && this.value != "-" && this.value != "+" && isNaN(this.value)) {
						this.value = "";
					}
				};
				input.fieldInput.elements.input.onchange = function() {
					if (this.value.length > 0) {
						this.value = parseInt(this.value);
					}
				};
				input.updateRange = function(rangesValues) { 
					if (rangesValues.length > 0) {
						return this.getDefaultValueField(attrType, rangesValues[0], rangesValues, editable, maxLength, enabler);
					}
				}.bind(this)
			}  else if (attrType == "String") {
				input = new CustomField("Default", 'input', defaultValueLabel, value, value, editable).buildField().disable(true);
				if (maxLength != undefined && maxLength > 0) {
					input.fieldInput.maxLength = maxLength;
				}
				input.updateRange = function(rangesValues) { 
					if (rangesValues.length > 0) {
						var input = this.getDefaultValueField(attrType, "", rangesValues, editable, maxLength, enabler);
						let item = input.fieldInput.getItemByLabel(rangesValues[0]); // input.value must be empty to make the field updatable
						input.fieldInput.toggleSelect(item);
						return input;
					}
				}.bind(this)
			} else if (attrType == "Date") {
				input = new CustomField("Default", 'date', defaultValueLabel, value, value, editable).buildField().disable(true);
			}else if (attrType == "Double") {
				input = new CustomField("Default", 'input', defaultValueLabel, value, value, editable).buildField().disable(true);
				input.fieldInput.elements.input.oninput = function() {
					var regexDouble = new RegExp('^[-+]?\\d+(\\.)?(\\d{1,6})?$');
					if (this.value.length > 1 && !regexDouble.test(this.value)) {
						//this.value = this.value.substring(0, this.value.indexOf('.') + 7);
						var reg = new RegExp('^[-+]?\\d+(\\.)?(\\d{1,6})?');
						var res = this.value.match(reg);
						if (res != null) {
							this.value = res[0];
						} else {
							this.value = "";
						}

					} else if (this.value.length == 1 && this.value != "-" && this.value != "+" && isNaN(this.value)) {
						this.value = "";
					}
				};
				input.fieldInput.elements.input.onchange = function() {
					if (this.value.length > 0)
						this.value = parseFloat(this.value);
				};
			} else if (attrType == "Boolean") {
				var selectedValue = "";
				if (value != undefined) {
					selectedValue = value;
				}
				var options = [{
					value: "true",
					label: myNls.get("createAttrFieldTrueLabel"),
					selected: (selectedValue.toLocaleLowerCase() == "true") ? true : false,
				}, {
					value: "false",
					label: myNls.get("createAttrFieldFalseLabel"),
					selected: (selectedValue.toLocaleLowerCase() == "false") ? true : false,
				}];

				input = new CustomField("Default", 'select', defaultValueLabel, options, options, editable, {
					placeholder: ""
				}).buildField().disable(true);
			} else {
				input = new CustomField("Default", 'input', defaultValueLabel, value, value, editable).buildField().disable(true);
			}

			return input;
		},

		getAuthorizedValueField: function(attrName, attrType, range, editable, defaultValueUpdater) {
			var view = this;
			var input = new CustomField("AuthorizedValues", 'input', myNls.get('AttrEditAuthorizedValuesFieldLabel'), range, range, editable).buildField().disable(true);
			var inputGroup = input.fieldDiv.getElementsByClassName("input-group")[0];
			
			input.rangePopup = UWA.createElement("span", {
				class: "input-group-addon fonticon fonticon-language"
			});
			input.rangePopup.inject(inputGroup);
			
			input.rangeTable = this.authorizedValueTable = new AttrRangeTable({
				rangeList: range.split(';'),
				attrName: attrName,
				attrType: attrType,
				container: this.container,
				editMode: false,
				nlsRange: this.model.get('rangeNls') || {},
				onSave: function(value) {
					input.fieldInput.setValue(value);
					input.fieldInput.dispatchEvent("onChange"); // Dispatch event will invoke updateRangeList!!
					return true;
				}
			});
			input.rangePopup.onclick = function() {
				var errors = [];
				var words = AttributeModel.checkRange(attrType, range, input.getValue(), errors);
				var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);
				if(fixed) {
					input.rangeTable.updateRangeList(words);
					input.rangeTable.launchPanel({attrName: attrName});
				}
			}
			
			input.fieldInput.addEvent("lengthChange", function(event) {
				var curVal = this.getValue();
				var words = [];
				if (curVal != "") {
					words = curVal.split(';');
				}
				var error = false;
				words.forEach(function(item) {
					if (item.length > parseInt(event.detail.length)) {
						error = true;
					}
				});
				if (error)
					this.setStyle('border-color', "#EA4F37");
			});
			input.fieldInput.elements.input.oninput = function() {
				if (attrType == "Integer" && !/^[-+\d;]+$/.test(this.value)) {
					this.value = this.value.replaceAll(/[^-+\d;]+/ig, '').replaceAll(/;+/ig, ';')
				}
			};
			input.fieldInput.onChange = function() {
				var errors = [];
				var words = AttributeModel.checkRange(attrType, range, this.getValue(), errors);
				var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);
				
				this.setValue(words.join(";"));
				if(fixed) { // No error or error were fixed
					this.elements.input.style.borderColor = null;
					input.rangePopup.style.opacity = "1"
				} else {
					this.elements.input.style.borderColor = "#EA4F37";
					input.rangePopup.style.opacity = "0.3"
				}
				
				if (errors.length) {
					DMSWidgets.createAlertBox(errors).inject(view.container.parentElement.parentElement);
				}
				if (!errors.length ||fixed) {
					defaultValueUpdater(words); 
				}
			};
			input.fieldInput.CustomValidate = function() {
				let toRet = true;
				if (attrType == "String") {
					let curInputValue = this.getValue();
					let words = curInputValue.split(";");
					words.forEach((item, i) => {
						item = item.trim();
						var regex = new RegExp("^[a-zA-Z0-9]+$");
						if (item.length > 0 && !regex.test(item)) {
							toRet = false;
						}
					});

				} else if (attrType == "Integer") {
					let curInputValue = this.getValue();
					let words = curInputValue.split(";");
					words.forEach((item, i) => {
						item = item.trim();
						var regex = new RegExp('^[-+]?[0-9]+$');
						if (item.length > 0 && !regex.test(item)) {
							toRet = false;
						}
					});
				}
				if (!toRet) {
					this.elements.input.setStyle('border-color', "#EA4F37");
				} else {
					this.elements.input.style.borderColor = null;
				}
				return toRet;
			}
			return input;
		},
		render: function() {
			UWA.log("attributesLayout::render");
			UWA.log(this);
			// Important: to initliaze these variable there because when we modify then
			// attribute we recall render() function.
			this.fieldNew = [];
			this.fieldNew.NLSField = [];
			const attrName = this.model.get('title');
			const attrType = this.model.getType();
			const curDmsStatus = this.model.getDMSStatus();

			var div = UWA.createElement('div', {
				'id': 'Attr-div-display',
				'class': 'container-fluid'
			});

			// Row 1 : Name & Type Field:
			{
				let divRow = UWA.createElement('div', {
					'class': 'row',
					'styles': {
						'margin-top': '15',
						'margin-bottom': '15'
					}
				}).inject(div);
				{
					let nameField = new CustomField("name", 'input', myNls.get('AttrEditNameFieldLabel'), attrName, attrName, false).buildField().disable(true);
					this.fieldNew.push(nameField);
					nameField.fieldDiv.inject(divRow);
				}
				{
					const attrTypeNLS = this.model.get('subtitle');
					let typeField = new CustomField("type", 'input', myNls.get('AttrEditTypeFieldLabel'), attrTypeNLS, attrTypeNLS, false).buildField().disable(true);
					this.fieldNew.push(typeField);
					typeField.fieldDiv.inject(divRow);
				}
			}

			{
				var divRowLengthPredicate = UWA.createElement('div', {
					'class': 'row',
					'styles': {
						'margin-top': '15',
						'margin-bottom': '15'
					}
				}).inject(div);

				{ //  Predicate
					let predicates = this.dicoHandler.getPredicatesBasedOnType(attrType);
					let predicateValue = this.model.get("predicate") || "";
					let predicateDisplayValue = (predicates.find(item => predicateValue == item.curi) || {}).label || "";
					let predicateFieldEditable = this.dicoHandler.isAuthoring && curDmsStatus != "DMSExported" && curDmsStatus != "DEV" && curDmsStatus != "PROD";
					let predicate = new CustomField("SixWPredicate", 'autocomplete', myNls.get('AttrEditPredicateFieldLabel'), predicateValue, predicateDisplayValue, predicateFieldEditable).buildField().disable(true);
					predicate.fieldInput.addDataset({
						items: predicates.map(function(item) {
							return {
								value: item.curi,
								label: item.label,
								selected: predicateValue == item.curi
							}
						})
					});
					predicate.fieldDiv.inject(divRowLengthPredicate);
					this.fieldNew.push(predicate);
				}

				if (this.model.isString()) {
					var attrMaxLength = this.model.getMaxLength();
					var lengthLabel = myNls.get('AttrEditLengthFieldLabel');
					if (attrMaxLength > 0) {
						let maxLengthEditable = !!this.dicoHandler.isAuthoring;
						var attrLength = new CustomField("MaxLength", 'integer', lengthLabel, this.model.getMaxLength(), this.model.getMaxLength(), maxLengthEditable).buildField().disable(true);
						attrLength.fieldInput.setValue(attrMaxLength);
						attrLength.fieldInput.options.min = attrMaxLength;
						attrLength.fieldInput.onChange = function() {
							var currentValue = this.getValue();
							if (currentValue.length >= 0) {
								currentValue = parseInt(currentValue);
								if (this.getValue() != currentValue)
									this.setValue(currentValue);
								if (currentValue <= this.options.min) {
									this.setValue(this.options.min);
								} else if (currentValue > this.options.max) {
									this.setValue(this.options.max);
								}

								if (defaultValue != undefined) {
									if (currentValue != 0 && currentValue >= attrMaxLength) {
										defaultValue.fieldInput.maxLength = currentValue;
										defaultValue.fieldInput.dispatchEvent("lengthChange", {
											detail: {
												length: currentValue
											}
										});
									}
								}
								if (authorizedValue != undefined) {
									authorizedValue.fieldInput.dispatchEvent("lengthChange", {
										detail: {
											length: currentValue
										}
									});
								}
							}
						};
					} else {
						var infiniteStr = myNls.get('AttrEditLengthInfiniteValue');
						var attrLength = new CustomField("MaxLength", 'input', lengthLabel, infiniteStr, infiniteStr, false).buildField().disable(true);
					}
					this.fieldNew.push(attrLength);
					attrLength.fieldDiv.inject(divRowLengthPredicate);
				}

			}


			if (this.model.getType().contains("Double") && this.model.get('dimension')) {
				var divRow2 = UWA.createElement('div', {
					'class': 'row',
					'styles': {
						'margin-top': '15',
						'margin-bottom': '15'
					}
				}).inject(div);


				var dimensionValue = this.model.get('dimension');
				let { NLS: dimensionNls = dimensionValue, Units: unitArray = [] } = this.dicoHandler.attrDimensions.find(obj => obj.Name == dimensionValue) || {};
				{ // Dimension
					var dimensionField = new CustomField("Dimension", 'input', "Dimension", dimensionValue, dimensionNls, false).buildField().disable(true);
					this.fieldNew.push(dimensionField);
					dimensionField.fieldDiv.inject(divRow2);
				}
				
				{ // ManipUnit
					var prefUnitValue = this.model.get('manipulationUnit') || "";
					var prefUnit = unitArray.find(item=>item.Name==prefUnitValue) || prefUnitValue;
					let manipUnitEditable = this.dicoHandler.isAuthoring && curDmsStatus != "DMSExported" && curDmsStatus != "DEV" && curDmsStatus != "PROD";
					var manipUnitField = new CustomField("ManipulationUnit", 'autocomplete', "Manipulation Unit", prefUnitValue, prefUnit ? prefUnit.NLSName : prefUnitValue, manipUnitEditable).buildField().disable(true);
					this.fieldNew.push(manipUnitField);
					manipUnitField.fieldInput.addDataset({
						'items': unitArray.map(item=>{
							return {
								value: item.Name,
								label: item.NLSName,
								selected: prefUnitValue == item.Name
							}
						})
					});
					manipUnitField.fieldDiv.inject(divRow2);
				}
			}

			{ // Row 3
				var divRow3 = UWA.createElement('div', {
					'class': 'row',
					'styles': {
						'margin-top': '15',
						'margin-bottom': '15'
					}
				}).inject(div);

				var defaultValue = {};
				function defaultValueEnabled() {
					if (multiValue && multiValue.fieldInput.isChecked()) {
						return false;
					}
					if (hasDefault && !hasDefault.fieldInput.isChecked()){
						return false;
					}
					return true;
				}
				function assignDefaultValue(input) {
					var enableFn = input.enable;
					Object.assign(defaultValue, input, {
						enable: function() {
							if(defaultValueEnabled()) {
								enableFn.call(this);
							}
						}
					});
					return defaultValue;
				}
				
				{ // HasDefault
					let defaultValEditable = this.dicoHandler.isAuthoring && this.model.hasDefault();
					defaultValue = this.getDefaultValueField(this.model.getType(), this.model.getDefaultValue(), this.model.getRange(), defaultValEditable, this.model.getMaxLength(), defaultValueEnabled)
					defaultValue = assignDefaultValue(defaultValue); 
					this.fieldNew.push(defaultValue);
					if (this.model.isInt() || this.model.isString()) {
						defaultValue.fieldDiv.inject(divRow3);
					} else {
						defaultValue.fieldDiv.inject(divRowLengthPredicate);
					}
				}

				// Authorized values
				if ((this.model.isInt() || this.model.isString()) && defaultValue.updateRange) {
					var range = this.model.getRange() || [];

					let authorizedValueFieldEditable = this.dicoHandler.isAuthoring;
					// We allow to add a first authorized value in "Without locker" codition
					if (range.length == 0 && (curDmsStatus == "DMSExported" || curDmsStatus == "DEV" || curDmsStatus == "PROD")) {
						authorizedValueFieldEditable = false;
					}
					var authorizedValue = this.getAuthorizedValueField(attrName, attrType, range.join(";"), authorizedValueFieldEditable, function(range) {
						var newInput = defaultValue.updateRange(range); // loose coupling because defaultValue.updateRange can change.
						if(!!newInput && defaultValueEnabled()) { // Ce n'est pas très propre de substituer les champs car cela force l'écran à utiliser un couplage lâche...
							defaultValue.fieldInput.destroy()
							defaultValue.fieldDiv.parentNode.replaceChild(newInput.fieldDiv, defaultValue.fieldDiv);
							assignDefaultValue(newInput).enable()
						}
					});
					this.fieldNew.push(authorizedValue);
					this.authorizedValueField = authorizedValue;
					authorizedValue.fieldDiv.inject(divRow3);
				}
			}

			
			if (this.model.getUserAccess()) {
				var divVisib = UWA.createElement('div', {
					'class': 'row',
					'styles': {
						'margin-top': '15',
						'margin-bottom': '15'
					}
				}).inject(div);

				var userAccessValues = [
					{
						value: "ReadWrite",
						label: myNls.get("createAttrFieldReadWriteLabel"),
						selected: this.model.getUserAccess().toLocaleLowerCase() == "readwrite",
					}, {
						value: "ReadOnly",
						label: myNls.get("createAttrFieldReadOnlyLabel"),
						selected: this.model.getUserAccess().toLocaleLowerCase() == "readonly",
					}
				];
				let userAccessFieldEditable = this.isUserAccessEditable();
				var userAccess = new CustomField("UIAccess", 'select', myNls.get('AttrEditUserAccessFieldLabel'), userAccessValues, userAccessValues, userAccessFieldEditable, {
					placeholder: false
				}).buildField().disable(true);

				this.fieldNew.push(userAccess);
				userAccess.fieldDiv.inject(divVisib);
			}

			{
				var divRow4 = UWA.createElement('div', {
					'class': 'row',
					'styles': {
						'margin-top': '15',
						'margin-bottom': '15'
					}
				}).inject(div);
				{
					var multiValue = new CustomField("MultiValuated", 'switch', myNls.get('AttrEditMultiValueFieldLabel'), this.model.isMultiValuated(), this.model.isMultiValuated(), false).buildField().disable(true);
					this.fieldNew.push(multiValue);
					multiValue.fieldDiv.inject(divRow4);
					multiValue.fieldInput.onChange = function() {};
				}
				if (attrType == "String") {
					
					let multiLineValue = this.model.isMultiLine();
					let multiLineEditable = !multiLineValue && this.dicoHandler.isAuthoring && curDmsStatus != "DMSExported" && curDmsStatus != "DEV" && curDmsStatus != "PROD";
					var mutliLine = new CustomField("MultiLine", 'switch', myNls.get('AttrEditMultiLineFieldLabel'), multiLineValue, multiLineValue, multiLineEditable).buildField().disable(true);
					this.fieldNew.push(mutliLine);
					mutliLine.fieldDiv.inject(divRow4);
				}
			}

			{
				var divVisib2 = UWA.createElement('div', {
					'class': 'row',
					'styles': {
						'margin-top': '15',
						'margin-bottom': '15'
					}
				}).inject(div);

				{
					let searchableFieldEditable = this.dicoHandler.isAuthoring && curDmsStatus != "DMSExported" && curDmsStatus != "DEV" && curDmsStatus != "PROD";
					var searchable = new CustomField("Indexation", 'switch', myNls.get('AttrEditSearchableFieldLabel'), this.model.isSearchable(), this.model.isSearchable(), searchableFieldEditable).buildField().disable(true);
					this.fieldNew.push(searchable);
					searchable.fieldDiv.inject(divVisib2);
				}

				{
					let exportable3DXMLFieldEditable = this.dicoHandler.isAuthoring && curDmsStatus != "DEV" && curDmsStatus != "PROD";
					var exportable = new CustomField("V6Exportable", 'switch', myNls.get('AttrEditExportableFieldLabel'), this.model.isExportable(), this.model.isExportable(), exportable3DXMLFieldEditable).buildField().disable(true);
					this.fieldNew.push(exportable);
					exportable.fieldDiv.inject(divVisib2);
				}
			}


			{
				var divBehavior = UWA.createElement('div', {
					'class': 'row',
					'styles': {
						'margin-top': '15',
						'margin-bottom': '15'
					}
				}).inject(div);
				let resetOnCloneFieldEditable = this.isResetOnCloneEditable();
				var resetWhenDup = new CustomField("ResetOnClone", 'switch', myNls.get('AttrEditResetWhenDupFieldLabel'), this.model.isResetOnClone(), this.model.isResetOnClone(), resetOnCloneFieldEditable).buildField().disable(true);
				this.fieldNew.push(resetWhenDup);
				resetWhenDup.fieldDiv.inject(divBehavior);

				let resetOnRevisionFieldEditable = this.isResetOnRevisionEditable();
				var resetWhenVers = new CustomField("ResetOnRevision", 'switch', myNls.get('AttrEditResetWhenVersFieldLabel'), this.model.isResetOnRevision(), this.model.isResetOnRevision(), resetOnRevisionFieldEditable).buildField().disable(true);
				this.fieldNew.push(resetWhenVers);
				resetWhenVers.fieldDiv.inject(divBehavior);
			}
			
			/* S63 02/08/2022
			* FUN114519
			* Adding has default switch
			*/
			if(this.dicoHandler.hasDef) {
				let hasDefaultFieldEditable = true;
				if (!this.dicoHandler.isAuthoring || curDmsStatus === "DEV" || curDmsStatus === "PROD"|| !this.model.hasDefault()) {
					hasDefaultFieldEditable = false;
				}

				var hasDefault = new CustomField("HasDefault", 'switch', myNls.get('AttrEditHasDefaultFieldLabel'), this.model.hasDefault(), this.model.hasDefault(), hasDefaultFieldEditable).buildField().disable(true);
				this.fieldNew.push(hasDefault);
				hasDefault.fieldDiv.inject(divBehavior);
				//S63 If we need a double check but is an attribute is multivaluated, it can't be hasDefautl=true
				/*hasDefault.checkBeforeEnable = function() {
					var toRet = true;
					if (multiValue.fieldInput.isChecked()) {
						toRet = false;
					}
					return toRet;
				};*/
				hasDefault.fieldInput.onChange= function() {
					if (this.isChecked()) {
						// Sometimes the default value is autocomplete field
						// so we have to manage diffferently
						/*if (defaultValue.fieldInput instanceof Autocomplete) {
								defaultValue.fieldInput.resetInput();
						} else {
								defaultValue.fieldInput.setValue("");
						}*/
						defaultValue.enable();
					} else {
						defaultValue.disable(false);
					}
				};
			}
			/* BMN2 10/20/2020
				* We don't want to expose this property now.
				var resetOnFork = new CustomField("ResetOnFork", 'switch', myNls.get('AttrEditResetOnForkFieldLabel'), this.model._attributes.resetOnFork == "Yes", this.model._attributes.resetOnFork == "Yes", true).buildField().disable(true);
				this.fieldNew.push(resetOnFork);
				resetOnFork.fieldDiv.inject(divBehavior);
			*/
			{
				var englishNLSValue = this.model.getNlsEnglish();
				var frenchNLSValue = this.model.getNlsFrench();
				var germanNLSValue = this.model.getNlsDutch();
				var japanesseNLSValue = this.model.getNlsJapanesse();
				var koreanNLSValue = this.model.getNlsKorean();
				var russianNLSValue = this.model.getNlsRussian();
				var chineseNLSValue = this.model.getNlsChinesse();
				let labelFieldEditable = this.dicoHandler.isAuthoring;
				var englishNLS = new CustomField("en", 'input', myNls.get('englishNLS'), englishNLSValue, englishNLSValue, labelFieldEditable).buildField().disable(true);
				this.fieldNew.NLSField.push(englishNLS);
				englishNLS.fieldDiv.inject(div);
	
				var frenchNLS = new CustomField("fr", 'input', myNls.get('frenchNLS'), frenchNLSValue, frenchNLSValue, labelFieldEditable).buildField().disable(true);
				this.fieldNew.NLSField.push(frenchNLS);
				frenchNLS.fieldDiv.inject(div);
	
				var germanNLS = new CustomField("de", 'input', myNls.get('germanNLS'), germanNLSValue, germanNLSValue, labelFieldEditable).buildField().disable(true);
				this.fieldNew.NLSField.push(germanNLS);
				germanNLS.fieldDiv.inject(div);
	
				var japeneseNLS = new CustomField("ja", 'input', myNls.get('japeneseNLS'), japanesseNLSValue, japanesseNLSValue, labelFieldEditable).buildField().disable(true);
				this.fieldNew.NLSField.push(japeneseNLS);
				japeneseNLS.fieldDiv.inject(div);
	
				var koreanNLS = new CustomField("ko", 'input', myNls.get('koreanNLS'), koreanNLSValue, koreanNLSValue, labelFieldEditable).buildField().disable(true);
				this.fieldNew.NLSField.push(koreanNLS);
				koreanNLS.fieldDiv.inject(div);
	
				var russianNLS = new CustomField("ru", 'input', myNls.get('russianNLS'), russianNLSValue, russianNLSValue, labelFieldEditable).buildField().disable(true);
				this.fieldNew.NLSField.push(russianNLS);
				russianNLS.fieldDiv.inject(div);
	
				var chineseNLS = new CustomField("zh", 'input', myNls.get('chineseNLS'), chineseNLSValue, chineseNLSValue, labelFieldEditable).buildField().disable(true);
				this.fieldNew.NLSField.push(chineseNLS);
				chineseNLS.fieldDiv.inject(div);
			}
			
			{
				this.saveBtn = new Button({
					'value': 'Save',
					'className': 'primary',
					'attributes': {
						'styles': {
							'width':'100%',
							'font-size':'x-large'
						}
					},
					'events': {
						'onClick': this.doSave.bind(this, this.options)
					}
				});
				this.saveBtn.hide();

				var divSave = UWA.createElement('div', {
					'class': 'row',
					'styles': {
						'margin-top': '25',
						'margin-bottom': '25',
						'margin-left': '25',
						'margin-right': '25'
					},
					'html': [
						{
							'tag': 'div',
							'class': 'col-lg-12',
							'html': [
								this.saveBtn
							]
						}
					]
				}).inject(div);

				var divToScroll = UWA.createElement('div', {
					'id': 'to-scroll',
					//'class': 'container-fluid',
					'styles': {
						"height": "100%",
						"width": "100%"
					},
					'html': [
						div
					]
				});

				this.container.setContent(UWA.createElement('div', {
					'id': 'container-scroll',
					'styles': {
						"height": "100%",
						"width": "100%"
					},
					'html': [
						new Scroller({
							element: divToScroll
						})
					]
				}));
			}

			return this;
		},

		getField: function(name) {
			return this.fieldNew.find(item=>item.name==name);
		},

		doSave: function(options) {
			var view = this;
			var model = this.model;

			if (this.authorizedValueField && !this.authorizedValueField.fieldInput.CustomValidate()) {
				return
			}
			var globalObjToSend = {
				"AggregatorPackage": this.aggregator.get("Package"),
				"AggregatorName": this.aggregator.id,
				"AggregatorNature": this.aggregator.get("nature"),
				"AggregateMode": this.model.isLocal() ? "Local" : "Global",
				"Attributes": {}
			};
			// Change 10/12/2020 : MFL BMN2 : Now Mamadou needs only the modified informations so we remove all useless informations.
			var attrModif = globalObjToSend.Attributes[model.id] = {
				'Name': model.id,
				'Nature': 'Attribute',
				'Type': model.get('type'),
				'Owner': model.get('ownerId'),
				'Local': model.get('isLocal'),
				'NameNLS': model.get('nlsList'),
				'AuthorizedValuesNLS': model.get('range'),
				'DMSStatus': model.get('DMSStatus')
			};

			this.fieldNew.forEach(function(item) {
				if (item.canBeEnable && item.isChanged()) {
					var val = item.getValue();
					if (val === true || val === false) {
						val = val ? "Yes" : "No";
					}
					if (Array.isArray(val) && val.length == 1) {
						val = val[0];
					}

					if(item.name === "HasDefault") {
						if(val === "No") // S63 02/08/2022 - FUN114519 - in case of HasDefault we are sending result only if it's No 
							attrModif[item.name] = val;
					} else if (item.name == "AuthorizedValues") {
						var newAuthorizedValues = item.getValue().split(";").map(string => string.trim()).filter(item=>!!item)
						var oldAuthorizedValues = model.get('range') || [];
						if ( newAuthorizedValues.length ) {
							attrModif["HasRangeDefined"] = "Yes";
							if (oldAuthorizedValues.length) {
								attrModif[item.name] = newAuthorizedValues.map(function(v) {
									return oldAuthorizedValues.includes(v) ? v : ('add:'+v);
								});
							} else {
								attrModif[item.name] = newAuthorizedValues.map(function(v) {
									return "addFirst:" + v;
								})
							}
						} else {
							attrModif["HasRangeDefined"] = "No";
							attrModif[item.name] = [];
						}
					} else if (item.name == "Default" && model.isDate()) {
						// BMN2 29/01/2021 : IR-816263-3DEXPERIENCER2021x
						// BMN2 06/09/2021 : IR-848975-3DEXPERIENCER2022x
						var date = item.fieldInput.getDate();
						if (!date) {
							attrModif[item.name] = "";
						} else {
							let formatedDate = new Date(date.toDateString() + " 10:00:00 GMT");
							let timestampInSec = Math.floor(formatedDate.getTime() / 1000);
							attrModif[item.name] = timestampInSec.toString(); // the timestamp has to be in String before sending to the webservice.
						} 
					} else {
						attrModif[item.name] = val;
					}
				}
			});
			var nlsObject = {};
			this.fieldNew.NLSField.forEach(function(item) {
				let val = item.getValue();
				if (val.length > 0) {
					nlsObject[item.name] = val;
				}
			});
			if (!UWA.equals(nlsObject, this.model.get('nlsList'))) {
				if (!attrModif.hasOwnProperty("NameNLS")) {
					attrModif["NameNLS"] = {};
				}
				attrModif["NameNLS"] = nlsObject;
			}
			if(this.authorizedValueTable && (attrModif["HasRangeDefined"]=="Yes" || (model.get('range') || []).length)) {
				var nlsRange = this.authorizedValueTable.getNLSRange();
				attrModif["MaxLength"] = "0";
				if (!UWA.equals(nlsRange, this.model.get('rangeNls'))) {
					attrModif["AuthorizedValuesNLS"] = nlsRange;
					attrModif["HasRangeDefined"] = "Yes"; // IR-984028-3DEXPERIENCER2023x && IR-961277-3DEXPERIENCER2022x
				}
			}

			var sizeModifAttrProp = Object.keys(attrModif).length;
			if (sizeModifAttrProp == 0) { // BMN2 03/09/2021 : IR-835593-3DEXPERIENCER2022x
				DMSWidgets.createAlertBox({nls:'AttrEditErrMsgNoChangeClickOnSave'}).inject(this.container);
				return;
			}

			if(attrModif['HasDefault']==="No" || attrModif['MultiValuated']==="Yes") {
				attrModif["Default"] = "";
			}
			
			options.wsSubmit(options, globalObjToSend, function() {
				view.saveBtn.hide();
				view.editModeOff();
			});
		},

		/*
		Refresh function is called whenever the user do an action in the processEGraph View : creation, deletion, edition.
		This function re-display the eGraph with the according changes.
		It receives as Parameters, the type and action chosen from the left panel and the JSON containing the informations.
		*/
		refresh: function(type, action, getJSON) {
			UWA.log("attributesLayout::refresh");
			this.persistJSONObject = getJSON;

			this.modal.hide();
			this.editor.hide();

			//We need to display again the center panel for refreshing
			this.displayCenterPanel(type, action, this.persistJSONObject);

		},
		destroy: function() {
			UWA.log("attributesLayout::destroy");

			this.stopListening();

			this._parent();
		},
		editModeOn: function() {

			this.saveBtn.show();
			UWA.log("On passe en mode edit");
			if(this.authorizedValueTable) {
				this.authorizedValueTable.enable();
			}
			this.fieldNew.forEach(function(item) {
				item.enable();
			});
			this.fieldNew.NLSField.forEach(function(item) {
				item.enable();
			});
		},
		editModeOff: function() {
			if(this.authorizedValueTable) {
				this.authorizedValueTable.disable();
			}
			this.fieldNew.forEach(function(item) {
				item.disable();
			});
			this.fieldNew.NLSField.forEach(function(item) {
				item.disable();
			});
		},
		isUserAccessEditable: function() {
			//IR-894001-3DEXPERIENCER2022x S63 userAccess available with orange locker
			if (!this.dicoHandler.isAuthoring || this.model.getDMSStatus() == "PROD") {
				return false;
			}
			return true;
		},
		isResetOnCloneEditable: function() {
			//IR-894001-3DEXPERIENCER2022x S63 resetOnClone available with orange locker
			if (!this.dicoHandler.isAuthoring || this.model.getDMSStatus() == "PROD") {
				return false;
			}
			return true;
		},
		isResetOnRevisionEditable: function() {
			//IR-894001-3DEXPERIENCER2022x S63 resetOnRevision available with orange locker
			if (!this.dicoHandler.isAuthoring || this.model.getDMSStatus() == "PROD") {
				return false;
			}
			return true;
		}
	});

});

define('DS/DBSApp/Utils/DMSWebServices',
[
	'UWA/Class',
	'DS/WAFData/WAFData',
	'DS/DBSApp/Utils/URLHandler',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS',
	"DS/FedDictionaryAccess/FedDictionaryAccessAPI",
	'UWA/Promise'
],
function(Class, WAFData, URLHandler, NLS, FedDictionaryAccessAPI, Promise) {
	'use strict';

	var DMSWebServices = Class.singleton({

		// Constructor
		init: function() {
			this._parent({});
		},

		getDicoJson: function(onSuccess, onError) {
			var fullPath = URLHandler.get3DSpaceWSUrl("/resources/dictionary/DictionaryOOTB", ["lang=" + widget.lang.replace(/^zh$/, "zh_CN")]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				//data: JSON.stringify(data),
				type: 'json',
				onComplete: function(payload) {
					console.log("getDicoJson:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, headers) {
					console.log("fail");
					console.log(this);
					var message = object;
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message, data, headers);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		isDMSAccessible: function(onSuccess, onError) {
			var fullPath = URLHandler.get3DSpaceWSUrl('/resources/dictionary/isDMSAccessible');
			WAFData.authenticatedRequest(fullPath, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				//data: JSON.stringify(data),
				type: 'json',
				onComplete: function(payload) {
					console.log("isDMSAccessible:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, headers) {
					console.log("fail");
					console.log(this);
					var message = object;
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.Message) {
							message = data.error.Message;
						} else if (data.message) {
							message = data.Message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message, data, headers);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		aggregatorCreate: function(data, nature, onSuccess, onError) {
			var fullPath = URLHandler.getDicoWSUrl('/resources/dictionary/AggregatorCreate', ["nature=" + nature]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				data: JSON.stringify(data),
				type: 'json',
				onComplete: function(payload) {
					console.log("aggregatorCreate:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, headers) {
					console.log("aggregatorCreate:onFailure");
					console.log(this);
					if (typeof data === "string")
						data = JSON.parse(data);
					var message = data['DictionaryException']['Message'];
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message, data, headers);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		aggregatorModify: function(data, nature, onSuccess, onError) {
			var fullPath = URLHandler.getDicoWSUrl('/resources/dictionary/AggregatorModify', ["nature=" + nature]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				data: JSON.stringify(data),
				type: 'json',
				onComplete: function(payload) {
					console.log("aggregatorModify:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, headers) {
					console.log("aggregatorModify:onFailure");
					console.log(this);
					if (typeof data === "string")
						data = JSON.parse(data);
					var message = data['DictionaryException']['Message'];
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message, data, headers);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		aggregatorDelete: function(data, nature, onSuccess, onError) {
			var fullPath = URLHandler.getDicoWSUrl('/resources/dictionary/AggregatorDelete', ["nature=" + nature]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				data: JSON.stringify(data),
				type: 'json',
				onComplete: function(payload) {
					console.log("aggregatorDelete:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, headers) {
					console.log("aggregatorDelete:onFailure");
					console.log(this);
					if (typeof data === "string")
						data = JSON.parse(data);
					var message = data['DictionaryException']['Message'];
					if (data && typeof data === 'object') { // null = 'object'
						if (data.hasOwnProperty("DictionaryException")) {
							const excep = data.DictionaryException;
							const {
								Status,
								Message
							} = excep
							if ((Status.contains("403") || Status.contains("500")) && (Message.contains("threshold") || Message.contains("#1400005: Object has references"))) {
								message = NLS.DeleteAggregatorErrHasObjects
							} else {
								message = data.DictionaryException.Message;
							}
						} else {
							message = NLS.DeleteAggregatorGenericErr;
						}

						/*if (data.error && data.error.message) {
							message = data.error.message;
						}
						else if (data.message) {
							message = data.message;
						}*/
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message, data, headers);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},
		attributeCreate: function(attrToCreate, onSuccess, onError) {
			WAFData.authenticatedRequest(URLHandler.getDicoWSUrl("/resources/dictionary/AttributeCreate"), {
				timeout: 500000,
				'method': 'POST',
				'type': 'json',
				'data': JSON.stringify(attrToCreate),
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				//'headers'	 : {'SecurityContext': 'VPLMProjectLeader.MyCompany.3DS Private Collab Space' } ,
				'onComplete': onSuccess,
				'onFailure': function(err, resp, headers) {
					if( !resp || !resp['DictionaryException']) {
						onError(NLS.DeleteAggregatorGenericErr, resp, headers);
					} else {
						const { Status = [], Message = "" } = resp.DictionaryException;
						if (Status.length && (Status.contains("403") || Status.contains("500")) && (Message.contains("threshold") || Message.contains("#1400005: Object has references"))) {
							onError(NLS.ErrCreateAttrParentHasRef, resp, headers);
						} else {
							onError(Message || NLS.DeleteAggregatorGenericErr, resp, headers);
						}
					}
				}
			});
		},
		attributeModify: function(attrToModif, onSuccess, onError) {
			WAFData.authenticatedRequest(URLHandler.getDicoWSUrl("/resources/dictionary/AttributeModify"), {
				'timeout': 500000,
				'method': 'POST',
				'type': 'json',
				'data': JSON.stringify(attrToModif),
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				//'headers'	 : {'SecurityContext': 'VPLMProjectLeader.MyCompany.3DS Private Collab Space' } ,
				'onComplete': onSuccess,
				'onFailure': function(err, resp, headers) {
						if(!resp || !resp['DictionaryException']) {
							onError(NLS.webServiceError, resp, headers);
						} else {
							const { Status = [], Message = "" } = resp.DictionaryException;
							onError(Message || NLS.webServiceError, resp, headers);
						}
				}
			});
		},
		attributeDelete: function(attrToDel, onSuccess, onError) {
			WAFData.authenticatedRequest(URLHandler.getDicoWSUrl("/resources/dictionary/AttributeDelete"), {
					'timeout': 500000,
					'method': 'POST',
					'type': 'json',
					'data': JSON.stringify(attrToDel),
					'headers': {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Accept-Language': widget.lang,
						'SecurityContext': URLHandler.getSecurityContext()
					},
					'onComplete': onSuccess,
					'onFailure': function(object, resp, headers) {
						if( !resp || !resp['DictionaryException']) {
							onError(NLS.DeleteAggregatorGenericErr, resp, headers);
						} else {
							const { Status = [], Message = "" } = resp.DictionaryException;
							if (Status.length && (Status.contains("403") || Status.contains("500")) && (Message.contains("threshold") || Message.contains("#1400005: Object has references"))) {
								onError(NLS.DeleteAggregatorErrHasObjects, resp, headers);
							} else {
								onError(Message || NLS.DeleteAggregatorGenericErr, resp, headers);
							}
						}
					}
				}
			);
		},

		getOotbNLS: function(onSuccess, onError) {
			var fullPath = URLHandler.get3DSpaceWSUrl('/resources/dictionary/DictionaryOOTBNLS', ["lang=" + widget.lang.replace(/^zh$/, "zh_CN")]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				//data: JSON.stringify(data),
				type: 'json',
				onComplete: function(payload) {
					console.log("getOotbNLS:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, headers) {
					console.log("getOotbNLS:onFailure");
					console.log(this);
					if (typeof data === "string")
						data = JSON.parse(data);
					var message = data['DictionaryException']['Message'];
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message, data, headers);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},
		getCustoDicoWithNLSUptoDate: function(onSuccess, onError) {
			var fullPath = URLHandler.getDicoWSUrl('/resources/dictionary/DictionaryCUSTO', [
				"lang=en;fr;de;ja;ko;ru;zh_CN",
				"maxAge=0"
			]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				//data: JSON.stringify(data),
				type: 'json',
				onComplete: function(payload) {
					console.log("getCustoNLS:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, headers) {
					console.log("getCustoNLS:onFailure");
					console.log(this);
					if (typeof data === "string")
						data = JSON.parse(data);
					var message = data['DictionaryException']['Message'];
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message, data, headers);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},
		getPredicates: function(onSuccess, onError) {
			var rdfPredicateServiceObj = new Promise(function(resolve, reject) {
				var ontologyServiceObj = {
					onComplete: function(result) {
						UWA.log("Got a predicates result!" + result);
						//resolve(result);
						onSuccess(result);

					},
					onFailure: function(errorMessage) {
						UWA.log("predicates service request Fail!" + errorMessage);
						//reject(errorMessage);
						onError(errorMessage);
					},
					tenantId: URLHandler.getTenant(),
					lang: widget.lang,
					apiVersion: "R2019x",
					onlyMappable: true //IR-619053-3DEXPERIENCER2019x
				};
				FedDictionaryAccessAPI.getFedProperties(ontologyServiceObj);
			});
		},
		getDimensions: function(onSuccess, onError) {
			var fullPath = URLHandler.get3DSpaceWSUrl('/resources/dictionary/dimensions', []);
			WAFData.authenticatedRequest(fullPath, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				//data: JSON.stringify(data),
				type: 'json',
				onComplete: function(payload) {
					console.log("getCustoNLS:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, responseStatus) {
					console.log("getCustoNLS:onFailure");
					console.log(this);
					var message = object;
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		launchExport: function(onSuccess, onError) {
			var fullPath = URLHandler.getDicoWSUrl("/resources/dictionary/ExportData", ["lang=" + widget.lang]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'GET',
				headers: {
					'Accept': 'application/zip',
					'Content-Type': 'application/zip',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				type: 'blob',
				onComplete: function(payload, Obj, request) {
					console.log("launchExport:onComplete");
					onSuccess(payload, request);
				},
				onFailure: function(object, data, responseStatus) {
					console.log("launchExport:fail");
					console.log(this);
					if (typeof data === "string")
						data = JSON.parse(data);
					var message = data['DictionaryException']['Message'];
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		launchImport: function(data, onSuccess, onError) {
			var fullPath = URLHandler.get3DSpaceWSUrl("/resources/dictionary/ImportData", ["lang=" + widget.lang]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'POST',
				headers: {
					'Accept': 'multipart/form-data',
					//'Content-Type': 'multipart/form-data',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				//type : 'application/zip',
				type: 'multipart/form-data',
				data: data,
				onComplete: function(payload) {
					console.log("launchImport:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, responseStatus) {
					console.log("launchImport:fail");
					console.log(this);
					if (typeof data === "string")
						data = JSON.parse(data);
					var message = data['DictionaryException']['Message'];
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		launchBRImport: function(isProd, collabSpace, data, onSuccess, onError) {
			console.log("DMSApp:launchBRImport");
			var params = [];
			//params.push("lang="+widget.lang);
			var path = "/resources/datasetup_ws/ImportZIP";
			if (!isProd) params.push("withAuthoring=true");
			var securityContext = URLHandler.getSecurityContext();
			if (!isProd) securityContext = collabSpace;

			var headers = {
				//'Accept': 'multipart/form-data',
				//'Accept-Language': widget.lang,
				//'Content-Type': 'multipart/form-data',
				'SecurityContext': securityContext
			};
			var options = DMSWebServices.options;
			var fullPath = URLHandler.get3DSpaceWSUrl(path, params);
			WAFData.authenticatedRequest(fullPath, {
				method: 'POST',
				headers: headers,
				timeout: 1000 * 60 * 30, // ms, 30mn
				//type : 'application/zip',
				type: 'multipart/form-data',
				data: data,
				onComplete: function(payload) {
					console.log("launchImport:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, responseStatus) {
					console.log("launchImport:fail");
					console.log(this);
					//IR-824489-3DEXPERIENCER2021x S63 this is the way sgq raised error
					if (typeof data === "string")
						data = JSON.parse(data);
					var message = data['message_key'];

					/*if (data !== null && data !== undefined) {
							if (data.contains("message_key"))
									message = data.substring(16, data.length - 2);
							else if (typeof data === 'object') { // null = 'object'
									if (data.error && data.error.message) {
											message = data.error.message;
									}
									else if (data.message) {
											message = data.message;
									}
							}
					}
					else if (typeof object === 'string') {
							if (object.startsWith('NetworkError:')) {
									if (object.endsWith('return ResponseCode with value "0".')) {
											message = NLS.noConnection; // "There is no Internet connection."
									}
									else if (object.endsWith('return ResponseCode with value "401".') ||
											object.endsWith('return ResponseCode with value "403".')) {
											message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
									}
									else {
											message = NLS.webServiceError; // An error is returned from web service.
									}
							}
							else if (object === 'null') {
									message = NLS.webServiceError; // An error is returned from web service.
							}
					}*/
					onError(message);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		launchUpdateIndex: function(onSuccess, onError) {
			var fullPath = URLHandler.get3DSpaceWSUrl("/resources/dictionary/UpdateIndex", ["lang=" + widget.lang]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'POST',
				headers: {
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				onComplete: function(payload) {
					console.log("launchUpdateIndex:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, responseStatus) {
					console.log("launchUpdateIndex:fail");
					console.log(this);
					var message = data;
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		getUpdateIndexInfo: function(onSuccess, onError) {
			var fullPath = URLHandler.get3DSpaceWSUrl("/resources/dictionary/GetUpdateIndexModelStatusForDMS", ["lang=" + widget.lang]);
			WAFData.authenticatedRequest(fullPath, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				type: 'json',
				onComplete: function(payload, Obj, request) {
					console.log("getDicoJson:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, headers) {
					console.log("fail");
					console.log(this);
					var message = object;
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.message) {
							message = data.error.message;
						} else if (data.message) {
							message = data.message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message, data, headers);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		},

		canBeModified: function(data, onSuccess, onError) {
			var fullPath = URLHandler.get3DSpaceWSUrl('/resources/dictionary/canBeModified');
			WAFData.authenticatedRequest(fullPath, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Accept-Language': widget.lang,
					'SecurityContext': URLHandler.getSecurityContext()
				},
				timeout: 1000 * 60 * 30, // ms, 30mn
				data: JSON.stringify(data),
				type: 'json',
				onComplete: function(payload) {
					console.log("canBeModified:onComplete");
					onSuccess(payload);
				},
				onFailure: function(object, data, headers) {
					console.log("fail");
					console.log(this);
					var message = object;
					if (data && typeof data === 'object') { // null = 'object'
						if (data.error && data.error.Message) {
							message = data.error.Message;
						} else if (data.message) {
							message = data.Message;
						}
					} else if (typeof object === 'string') {
						if (object.startsWith('NetworkError:')) {
							if (object.endsWith('return ResponseCode with value "0".')) {
								message = NLS.noConnection; // "There is no Internet connection."
							} else if (object.endsWith('return ResponseCode with value "401".') ||
								object.endsWith('return ResponseCode with value "403".')) {
								message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
							} else {
								message = NLS.webServiceError; // An error is returned from web service.
							}
						} else if (object === 'null') {
							message = NLS.webServiceError; // An error is returned from web service.
						}
					}
					onError(message,data, headers);
				},
				onTimeout: function() {
					onError("timeout", {}, {});
				}
			});
		}
	});

	return DMSWebServices;
});

define('DS/DBSApp/Views/ToolsLayoutView', [
	'UWA/Core',
	'UWA/Class/View',
	'DS/UIKIT/Scroller',
	'DS/UIKIT/Input/Select',
	'DS/UIKIT/Popover',
	'DS/UIKIT/Input/Button',
	'DS/UIKIT/Alert',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS',
	'DS/UIKIT/Mask',
	'DS/DBSApp/Utils/DMSWebServices',
	'DS/UIKIT/Spinner',
    'UWA/Controls/Input' // To load UWA.Controls.Input.File
	/*'DS/PlatformAPI/PlatformAPI',*/
],
function (UWA, View, Scroller, Select, Popover, Button, Alert, myNls, Mask, DMSWebServices, Spinner/*,PlatformAPI*/) {
	'use strict';

	var extendedView = View.extend({
		tagName: 'div',
		className: 'ToolsView',

		init: function ( /*frame*/ options) {
			UWA.log('ToolsLayoutView::init');
			UWA.log(options);

			options = UWA.clone(options || {}, false);
			this.userMessaging = null;
			this._parent(options);
			this.IsInPROD = false;
			this.listOfCollabSpace = [];
			this.divUpdateIndexHistory = null;
			this.updateButton = null;
			this.importButton = null;
			this.exportButton = null;
			this.importBRButton = null;
			this.toolsScroller = null;
			this.selectCollabSpace = null;
			this.fileController = null;
			this.fileBRController = null;
		},

		setup: function (options) {
			UWA.log("ToolsLayoutView::setup");
			UWA.log(options);
			var that = this;
			UWA.log(that);
		},
		/*
		Render is the core method of a view, in order to populate its root container element, with the appropriate HTML.
		The convention is for render to always return this.
		*/
		render: function () {
			UWA.log("ToolsLayoutView::render");
			var introDiv, that = this;

			this.contentDiv = UWA.createElement('div', {
				'id': 'mainToolsDiv'
			});

			Mask.mask(this.contentDiv);

			this.userMessaging = new Alert({
				className: 'Tools-alert',
				closable: true,
				visible: true,
				renderTo: document.body,
				autoHide: true,
				hideDelay: 2000,
				messageClassName: 'warning'
			});

			this.container.setContent(this.contentDiv);
			this.listenTo(this.collection, {
				onSync: that.buildMenu
			});
			//this.buildMenu();
			return this;
		},

		buildMenu: function () {
			UWA.log("ToolsLayoutView::buildMenu");
			var that = this;
			var env = this.collection._models[0]._attributes.env;

			if (!env.contains("DEV")) this.IsInPROD = true;
			this.listOfCollabSpace = this.collection._models[0]._attributes.Scs;
			
			var divToScroll = UWA.createElement('div', {
			'id': 'to-scroll-tools',
				});
			var div = UWA.createElement('div', {
			'class': 'container-fluid'
				}).inject(divToScroll);;

			var divGridContent = UWA.createElement('div', {
				'id': 'ToolsGridContent',
			}).inject(div);

			var divToolsCusto = UWA.createElement('div', {
				'class': 'ToolsSectionHeader',
				'id': 'ToolsCusto',
				html: myNls.custoLabel
			}).inject(divGridContent);

			/*var divToolsIndex = UWA.createElement('div', {
				'class': 'ToolsSectionHeader',
				'id': 'ToolsIndex',
				html: myNls.updateIndexLabel
			}).inject(divGridContent);*/

			var divToolsBR = UWA.createElement('div', {
				'class': 'ToolsSectionHeader',
				'id': 'ToolsBR',
				html: myNls.BRLabel
			}).inject(divGridContent);

			var divImportLabel = UWA.createElement('div', {
				'class': 'ToolsLabel',
				'id': 'ToolsImportLabel',
			}).inject(divGridContent);

			UWA.createElement('p', {
				text: myNls.import,
				'class': ''
			}).inject(divImportLabel);

			var divExportLabel = UWA.createElement('div', {
				'class': 'ToolsLabel',
				'id': 'ToolsExportLabel',
			}).inject(divGridContent);

			UWA.createElement('p', {
				text: myNls.export,
				'class': ''
			}).inject(divExportLabel);

			var divUpdateIndexLabel = UWA.createElement('div', {
				'class': 'ToolsLabel',
				'id': 'ToolsIndexLabel',
			}).inject(divGridContent);

			UWA.createElement('p', {
				text: myNls.indexUpdate,
				'class': ''
			}).inject(divUpdateIndexLabel);

			/* var divExportBRLabel = UWA.createElement('div', {
					'class': 'ToolsLabel',
					'id': 'ToolsExportBRLabel',
				}).inject(divGridContent);
				
				UWA.createElement('p', {
					text: myNls.exportBR,
					'class': ''
				}).inject(divExportBRLabel);*/

			var divImportBRLabel = UWA.createElement('div', {
				'class': 'ToolsLabel',
				'id': 'ToolsImportBRLabel',
			}).inject(divGridContent);

			UWA.createElement('p', {
				text: myNls.importBR,
				'class': ''
			}).inject(divImportBRLabel);

			var divImportInfo = UWA.createElement('div', {
				'class': 'ToolsInfo',
				'id': 'ToolsImportInfo',
			}).inject(divGridContent);

			var popoverTooltip,
				imgInfoSpan = UWA.createElement('span', {
					'class': 'fonticon fonticon-info'
				}).inject(divImportInfo);

			popoverTooltip = new Popover({
				target: imgInfoSpan,
				trigger: "hover",
				animate: "true",
				position: "top",
				body: myNls.importToolTip,
				title: ''
			});

			var divExportInfo = UWA.createElement('div', {
				'class': 'ToolsInfo',
				'id': 'ToolsExportInfo',
			}).inject(divGridContent);

			var popoverTooltip2,
				imgInfoSpan2 = UWA.createElement('span', {
					'class': 'fonticon fonticon-info'
				}).inject(divExportInfo);

			imgInfoSpan2.setStyle("color", "black");

			popoverTooltip2 = new Popover({
				target: imgInfoSpan2,
				trigger: "hover",
				animate: "true",
				position: "top",
				body: myNls.exportToolTip,
				title: ''
			});

			var divUpdateIndexInfo = UWA.createElement('div', {
				'class': 'ToolsInfo',
				'id': 'ToolsUpdateIndexInfo',
			}).inject(divGridContent);

			var popoverTooltip,
				imgInfoSpan = UWA.createElement('span', {
					'class': 'fonticon fonticon-info'
				}).inject(divUpdateIndexInfo);

			imgInfoSpan.setStyle("color", "black");

			popoverTooltip = new Popover({
				target: imgInfoSpan,
				trigger: "hover",
				animate: "true",
				position: "top",
				body: myNls.indexUpdateToolTip,
				title: ''
			});

			/*  var divExportBRInfo=UWA.createElement('div', {
					'class': 'ToolsInfo',
					'id': 'ToolsExportBRInfo',
				}).inject(divGridContent);*/

			/* var popoverTooltip,
				imgInfoSpan = UWA.createElement('span', {
					'class' : 'fonticon fonticon-info'
				}).inject(divExportBRInfo);
	
			imgInfoSpan.setStyle("color", "black");
	
			popoverTooltip = new Popover({
				target   : imgInfoSpan,
				trigger  : "hover",
				animate  : "true",
				position : "top",
				body	 : myNls.exportBRToolTip,
				title	: ''
			});*/

			var divImportBRInfo = UWA.createElement('div', {
				'class': 'ToolsInfo',
				'id': 'ToolsImportBRInfo',
			}).inject(divGridContent);

			var popoverTooltip,
				imgInfoSpan = UWA.createElement('span', {
					'class': 'fonticon fonticon-info'
				}).inject(divImportBRInfo);

			imgInfoSpan.setStyle("color", "black");

			popoverTooltip = new Popover({
				target: imgInfoSpan,
				trigger: "hover",
				animate: "true",
				position: "top",
				body: myNls.importBRToolTip,
				title: ''
			});

			var divBrowseFile = UWA.createElement('div', {
				'id': 'ToolsBrowseImportFile',
				'class': 'ToolsDivBrowseFile'
			}).inject(divGridContent);

			this.fileController = new UWA.Controls.Input.File({
				attributes: {
					'id': 'ImportFileInput'
				},
				className: 'ToolsImportFileInput xml-file-input',
				events: {
					onChange: function () {
						var fileInput = document.getElementById('ImportFileInput');
						if (fileInput.files.length === 1 && that.updateButton.isDisabled() === false) {
							that.importButton.setDisabled(false);
						}
						else that.importButton.setDisabled(true);

					}
				}
			}).inject(divBrowseFile);

			var divBrowseBRFile = UWA.createElement('div', {
				'id': 'ToolsBrowseImportBRFile',
				'class': 'ToolsDivBrowseFile'
			}).inject(divGridContent);

			this.fileBRController = new UWA.Controls.Input.File({
				attributes: {
					'id': 'ImportBRFileInput'
				},
				className: 'ToolsImportFileInput xml-file-input',
				events: {
					onChange: function () {
						var fileInput = document.getElementById('ImportBRFileInput');
						if (fileInput.files.length === 1) {
							if (that.IsInPROD || (!that.IsInPROD && that.selectCollabSpace.getSelection(false).length === 1))
								that.importBRButton.setDisabled(false);
							else that.importBRButton.setDisabled(true);
						}
						else that.importBRButton.setDisabled(true);
					}
				}
			}).inject(divBrowseBRFile);

			var divSelectCollabSpace = UWA.createElement('div', {
				'id': 'ToolsSelectCollabSpace',
			});

			this.selectCollabSpace = new Select({
				nativeSelect: true,
				placeholder: myNls.collabSpaceHolder,
				'id': 'selectCollabSpace',
				options: [],
			})

			if (!this.IsInPROD) {
				divSelectCollabSpace.inject(divGridContent);

				if (this.listOfCollabSpace != undefined && this.listOfCollabSpace !== null && this.listOfCollabSpace.length !== 0) {
					this.selectCollabSpace.inject(divSelectCollabSpace);
					this.selectCollabSpace.addEvent("onChange", function (e) {
						UWA.log("ToolsLayoutView::selectCollabSpace onChange");
						var selectedCollabSpace = that.selectCollabSpace.getSelection(false);

						if (selectedCollabSpace.length != 0) {
							var fileInput = document.getElementById('ImportBRFileInput');
							if (fileInput.files.length === 1) that.importBRButton.setDisabled(false);
							else that.importBRButton.setDisabled(true);
						}
						else that.importBRButton.setDisabled(true);
					});
					var i = 0;
					for (i = 0; i < this.listOfCollabSpace.length; i++) {
						var option = { value: this.listOfCollabSpace[i].collabID, label: this.listOfCollabSpace[i].collabName }
						this.selectCollabSpace.add(option);
					}
				}
				else {
					var imgClass = 'fonticon fonticon-' + '1.5' + 'x fonticon-alert';
					var imgTitle = "No collab Space";
					var imgSpan = UWA.createElement('span', {
						'class': imgClass,
						'id': "collabSpaceImgAlert",
					}).inject(divSelectCollabSpace);

					var collabSpaceLabel = UWA.createElement('p', {
						text: myNls.noCollabSpaceAvailable,
						id: "CollabSpaceAlert",
					}).inject(divSelectCollabSpace);

					//this.importBRButton.setDisabled(true);
				}
			}

			this.divUpdateIndexHistory = UWA.createElement('div', {
				'id': 'ToolsUpdateIndexHistory',
				'class': ''
			}).inject(divGridContent);

			//Mask.mask(this.divUpdateIndexHistory);
			var divImportButton = UWA.createElement('div', {
				'class': 'ToolsDivButton',
				'id': 'ToolsImportButton',
			}).inject(divGridContent);

			this.importButton = new Button({
				// value: myNls.importButton,
				className: 'default  ToolsUploadButton',
				icon: 'fonticon-import',
				attributes: {
					title: myNls.importButton
				},
				events: {
					onClick: function () {
						var fileInput = document.getElementById('ImportFileInput');
						if (fileInput.files.length === 1) {
							that.launchImportProcess.call(that, fileInput.files[0]);
						} else {
							that.userMessaging.add({ className: "warning", message: myNls.importNoInput });
						}
					}
				}
			}).inject(divImportButton);

			this.importButton.setDisabled(true);

			var divExportButton = UWA.createElement('div', {
				'class': 'ToolsDivButton',
				'id': 'ToolsExportButton',
			}).inject(divGridContent);

			this.exportButton = new Button({
				// value: myNls.exportButton,
				className: 'default  ToolsButton',
				icon: 'export',
				attributes: {
					title: myNls.exportButton
				},
				events: {
					onClick: function () {
						that.launchDMSExport();
					}
				}
			}).inject(divExportButton);

			var divUpdateIndexButton = UWA.createElement('div', {
				'class': 'ToolsDivButton',
				'id': 'ToolsUpdateIndexButton',
			}).inject(divGridContent);

			this.updateButton = new Button({
				//value: myNls.updateIndexButton,
				className: 'default  ToolsButton',
				icon: 'archive',
				attributes: {
					title: myNls.updateIndexButton
				},
				events: {
					onClick: function () {
						that.launchDMSUpdateIndex();
						/*if(!that.divUpdateIndexHistory.isHidden())
						{
							var d = new Date();
							var user = PlatformAPI.getUser();
							that.setUpdateIndexInformation("OnGoing",d.toLocaleString(),"...",null,user.login,"Import");
						}*/
						
					}
				}
			}).inject(divUpdateIndexButton);

			var divImportBRButton = UWA.createElement('div', {
				'class': 'ToolsDivButton',
				'id': 'ToolsImportBRButton',
			}).inject(divGridContent);

			this.importBRButton = new Button({
				className: 'default  ToolsUploadButton',
				icon: 'fonticon-import',
				attributes: {
					title: myNls.importBRButton
				},
				events: {
					onClick: function () {
						var fileInput = document.getElementById('ImportBRFileInput');
						var CollabSpace = null;
						if (!that.IsInPROD) {
							var CollabSpaceArray = that.selectCollabSpace.getSelection(false);
							if (CollabSpaceArray.length === 1) CollabSpace = CollabSpaceArray[0].value;

						}
						if (fileInput.files.length === 1 && ((!that.IsInPROD && CollabSpace !== null) || that.IsInPROD)) {
							that.launchImportBRProcess.call(that, that.IsInPROD, CollabSpace, fileInput.files[0]);
						} else {
							if (that.IsInPROD)
								that.userMessaging.add({ className: "warning", message: myNls.importNoInput });
							else that.userMessaging.add({ className: "warning", message: myNls.importBRInputMissingCollabAndFile });
						}
					}
				}
			}).inject(divImportBRButton);

			this.importBRButton.setDisabled(true);

			/*var divExportBRButton=UWA.createElement('div', {
				'class': 'ToolsDivButton',
				'id': 'ToolsExportBRButton',
			}).inject(divGridContent);*/

			/*  var exportButton = new Button({
					value: myNls.exportBRButton,
					className: 'default ToolsButton',
					icon: 'export',
					attributes: {
						title: myNls.exportBRButton
					},
					events: {
						onClick: function () {
							
						}
					}
				}).inject(divExportBRButton);*/

			var divUpdateIndexStatus = UWA.createElement('div', {
				'id': 'ToolsDivUpdateIndexStatus',
			}).inject(that.divUpdateIndexHistory);

			var divTimeUpdate = UWA.createElement('div', {
				'id': 'ToolsDivUpdateIndexTime',
				'class': 'ToolsUpdateInfoDiv',
			}).inject(that.divUpdateIndexHistory);


			UWA.createElement('span', {
				'class': 'UpdateIndexTimeInfo fonticon  fonticon-play',
				'id': 'sartUpdateIndexIcon',
			}).inject(divTimeUpdate);

			UWA.createElement('p', {
				// text: startedAtDateLocal,
				id: "startUpdateIndex",
				'class': 'UpdateIndexTimeInfo'
			}).inject(divTimeUpdate);

			UWA.createElement('span', {
				'class': 'UpdateIndexTimeInfo fonticon  fonticon-to-end',
				'id': 'endUpdateIndexIcon',
			}).inject(divTimeUpdate);

			UWA.createElement('p', {
				// text: EndedAtDateLocal,
				id: "endUpdateIndex",
				'class': 'UpdateIndexTimeInfo',
			}).inject(divTimeUpdate);

			var divUserUpdateIndex = UWA.createElement('div', {
				'id': 'ToolsDivUpdateIndexUser',
				'class': 'ToolsUpdateInfoDiv',
			}).inject(that.divUpdateIndexHistory);

			UWA.createElement('span', {
				'class': 'UpdateIndexTimeInfo fonticon  fonticon-user',
				'id': '',
			}).inject(divUserUpdateIndex);

			UWA.createElement('p', {
				id: "pUserReason",
				'class': 'UpdateIndexTimeInfo',
			}).inject(divUserUpdateIndex);

			var divLastSuccessfulUpdateIndex = UWA.createElement('div', {
				'id': 'ToolsDivUpdateIndexLastSuccess',
				'class': 'ToolsUpdateInfoDiv',
			}).inject(that.divUpdateIndexHistory);

			var lastSuccessIcon = UWA.createElement('span', {
				'class': 'UpdateIndexTimeInfo fonticon  fonticon-check',
				'id': '',
			}).inject(divLastSuccessfulUpdateIndex);
			lastSuccessIcon.setStyle("color", "green");

			UWA.createElement('p', {
				// text: "last sucessfully update : "+LastSucceededDateLocal,
				id: "pLastUpdate",
				'class': 'UpdateIndexTimeInfo',
			}).inject(divLastSuccessfulUpdateIndex);

			this.divUpdateIndexHistory.hide();

			this.launchGetUpdateIndexInfo();
			
			this.toolsScroller = new Scroller({
		element: divToScroll
	}).inject(this.contentDiv);

			Mask.unmask(this.contentDiv);
		},

		launchImportProcess: function (File) {
			UWA.log("ToolsLayoutView::launchImportProcess - File.type = " + File.type);

			/* IR-1043436-3DEXPERIENCER2023x : Test put on server side
			if (!File.type.match(/application\/x-zip-compressed/,)) {
				this.userMessaging.add({ 
					className: "error", 
					message: myNls.importBadFileExtension 
				}); //File not supported!
				return;
			}//*/
			Mask.mask(this.contentDiv);
			var formData = new FormData();
			formData.append('DMSzip', File, File.fileName);
			DMSWebServices.launchImport(formData,
				this.onCompleteRequestImport.bind(this), 
				this.onFailureRequestImport.bind(this)
			);
		},

		onCompleteRequestImport: function (payload) {
			UWA.log("Launch DMS import complete");
			this.launchGetUpdateIndexInfo();
			Mask.unmask(this.contentDiv);
			this.userMessaging.add({ className: "success", message: myNls.importSuccess });
		},

		onFailureRequestImport: function (resp) {
			UWA.log("Failure to import DMS" + resp);
			Mask.unmask(this.contentDiv);
			if(resp=="Invalid ZIP file.") {
				this.userMessaging.add({ 
					className: "error", 
					message: myNls.importBadFileExtension 
				}); //File not supported!
			} else {
				var message = myNls.importFail;
				if (resp !== null && resp !== undefined && resp.length !== 0)
					message += ": " + resp;
				this.userMessaging.add({ 
					className: "error", 
					message: message
				});
			}
		},

		launchImportBRProcess: function (isInProd, collabSpace, File) {
			UWA.log("ToolsLayoutView::launchImportBRProcess");
			UWA.log("File.type = " + File.type);

			if (!File.type.match(/application\/x-zip-compressed/)) {
				this.userMessaging.add({ 
					className: "error", 
					message: myNls.importBadFileExtension 
				}); //File not supported!
				return;
			}
			Mask.mask(this.contentDiv);
			var formData = new FormData();
			formData.append('DMSBRzip', File, File.fileName);
			DMSWebServices.launchBRImport.call(this, isInProd, collabSpace, formData,
				this.onCompleteRequestImportBR.bind(this), 
				this.onFailureRequestImportBR.bind(this)
			);
		},


		onCompleteRequestImportBR: function (payload) {
			UWA.log("Launch DMS import complete");
			Mask.unmask(this.contentDiv);
			this.userMessaging.add({ className: "success", message: myNls.importBrSuccess });
		},

		onFailureRequestImportBR: function (resp) {
			UWA.log("Failure to import DMS" + resp);
			Mask.unmask(this.contentDiv);
			var message = myNls.importBrFail;
			if (resp !== null && resp !== undefined && resp.length !== 0) {
				message += ": ";
				if (resp == "ERR_NOT_CLOUD_CONTEXT") message += myNls.importBrNotCloudContext;
				else if (resp == "INVALID_ZIP_FILE") message += myNls.importBRinvalidZipFile;
				else if (resp == "INCONSISTENT_ZIP_FILE") message += myNls.importBRInconsistentZipFile;
				else if (resp == "ERR_NOT_APPROPRIATE_CLOUD_CONTEXT") message += myNls.importBrNotAppropriateCloudContext;
				else message += resp;
			}
			this.userMessaging.add({ 
				className: "error", 
				message: message 
			});
		},


		launchDMSExport: function () {
			UWA.log("ToolsLayoutView::launchDMSExport");
			Mask.mask(this.contentDiv);
			DMSWebServices.launchExport.call(this,
				this.onCompleteRequestExport.bind(this), this.onFailureRequestExport.bind(this));
		},

		onCompleteRequestExport: function (payload, request) {
			UWA.log("Launch DMS Export complete");
			Mask.unmask(this.contentDiv);
			var fileName = "DMSExportData.zip";
			/* var contentDisp =  request.getResponseHeader("Content-Disposition"); //unable to access to content-dispositon (unsafe attribute)
				if(contentDisp!==undefined)
				{
				var fileNameIdx = contentDisp.indexOf("Filename=");
				if(fileNameIdx!=-1 && contentDisp.length>fileNameIdx+10)
					fileName = contentDisp.slice(fileNameIdx+10,contentDisp.length-1);
				
				}*/
			var a = document.createElement('a');
			a.href = window.URL.createObjectURL(payload),
				a.download = fileName;
			a.dispatchEvent(new MouseEvent('click'));
		},

		onFailureRequestExport: function (resp) {
			UWA.log("Failure to export DMS" + resp);
			Mask.unmask(this.contentDiv);
			var message = myNls.exportFail;
			if (resp !== null && resp !== undefined && resp.length !== 0)
				message += ": " + resp;
			this.userMessaging.add({ className: "error", message: message });
		},

		launchDMSUpdateIndex: function () {
			//Mask.mask(this.contentDiv);
			UWA.log("ToolsLayoutView::launchDMSUpdateIndex");
			DMSWebServices.launchUpdateIndex.call(this,
				this.onCompleteRequestUpdateIndex.bind(this), this.onFailureRequestUpdateIndex.bind(this));
		},

		onCompleteRequestUpdateIndex: function (payload) {
			UWA.log("Launch DMS Update Index complete");
			this.userMessaging.add({ className: "success", message: myNls.updateIndexSuccess });
			this.launchGetUpdateIndexInfo();
			// Mask.unmask(this.contentDiv);
		},

		onFailureRequestUpdateIndex: function (resp) {
			UWA.log("Failure to update index" + resp);
			// Mask.unmask(this.contentDiv);
			var message = myNls.updateIndexFail
			if (resp !== null && resp !== undefined && resp.length !== 0)
				message += ": " + resp;
			DMSWebServices.getUpdateIndexInfo(
			this.onCompleteRequestUpdateIndexInfo.bind(this), this.onFailureRequestUpdateIndexInfo.bind(this));
			this.userMessaging.add({ className: "error", message: message });
		},


		launchGetUpdateIndexInfo: function () {
			UWA.log("ToolsLayoutView::launchGetUpdateIndexInfo");
			var that = this;
			DMSWebServices.getUpdateIndexInfo(
				that.onCompleteRequestUpdateIndexInfo.bind(that), that.onFailureRequestUpdateIndexInfo.bind(that));
		},


		onCompleteRequestUpdateIndexInfo: function (payload) {
			var that = this;
			UWA.log("Launch DMS import complete");
			// Mask.unmask(that.divUpdateIndexHistory);
			//get update index info
			if (payload !== null && payload !== undefined) {
				// payload = {EndedAt: "",FailedAt: "",LastSucceeded: "2020/10/06'@'14:43:54:GMT",Reason: "Import",User: "CN1",startedAt: "2020/10/06'@'14:32:54:GMT",status: "OnGoing"};
				//payload = { EndedAt: "2020/10/06'@'14:43:54:PDT", FailedAt: "", LastSucceeded: "2020/10/06'@'14:43:54:GMT", Reason: "Import", User: "CN1", startedAt: "2020/10/06'@'14:32:54:GMT", status: "Ended" };
				var status = payload["status"];
				if (status !== "OnGoing") that.updateButton.setDisabled(false);

				var startedAt = payload["startedAt"];
				var startedAtInt = parseInt(startedAt,10);
				var startedAtDate = new Date (startedAtInt); 
				var startedAtDateLocal = startedAtDate.toLocaleString();
				
				var EndedAtDateLocal = "..."
				if (status === "Ended" || status === "Failed" ) {
					var EndedAt = payload["EndedAt"];
					var EndedAtdInt = parseInt(EndedAt,10);
					var EndedAtDate = new Date (EndedAtdInt);
					EndedAtDateLocal = EndedAtDate.toLocaleString();
				}
				
				var User = payload["User"];
				var Reason = payload["Reason"];
				
				var LastSucceeded = payload["LastSucceeded"];
				if(LastSucceeded) {
					var LastSucceededInt = parseInt(LastSucceeded,10);
					var LastSucceededDate = new Date (LastSucceededInt); 
					var LastSucceededDateLocal = LastSucceededDate.toLocaleString();
				}
				else {
					var LastSucceededDateLocal = null;
				}
				
				that.setUpdateIndexInformation(status, startedAtDateLocal, EndedAtDateLocal, LastSucceededDateLocal, User, Reason);
			}

		},

		onFailureRequestUpdateIndexInfo: function (resp) {
			UWA.log("Failure to retrieve update information: " + resp);
			Mask.unmask(this.contentDiv);
			this.userMessaging.add({ className: "error", message: resp});
		},


		parseDate: function (date) {
			UWA.log("ToolsLayoutView::parseDate");
			var year = date.substring(0, 4);
			var month = date.substring(5, 7);
			var day = date.substring(8, 10);
			var hours = date.substring(13, 15);
			var mins = date.substring(16, 18);
			var secondes = date.substring(19, 21);
			var parsedDate = new Date();
			var parsedDate = new Date(year + "-" + month + "-" + day + "T" + hours + ":" + mins + ":" + secondes + "Z");
			return parsedDate;
		},

		setUpdateIndexInformation: function (status, startDate, endDate, lastsuccesfulDate, user, reason) {
			UWA.log("ToolsLayoutView::setUpdateIndexInformation");
			var that = this;
			var divStatus = that.divUpdateIndexHistory.getElement("#ToolsDivUpdateIndexStatus");
			divStatus.empty();
			//Update Status info  
			if (status === "OnGoing") {
				that.updateButton.setDisabled(true);
				that.importButton.setDisabled(true);
				
				new Spinner({ className: "small", id: "ToolsSpinnerIndexInfo" }).inject(divStatus).show();

				UWA.createElement('p', {
					text: myNls.UpdateInProgress,
					id: "pSatusUpdate",
					'class': ''
				}).inject(divStatus);

				var resetSpan = UWA.createElement('span').inject(divStatus);
				var resetButton = new Button({
					id: 'ToolsResetButton',
					icon: 'fonticon fonticon-undo',
					attributes: {
						disabled: false,
						'aria-hidden': 'true'
					}
				}).inject(resetSpan);
				var resetPop = new Popover({
					target: resetSpan,
					trigger: "hover",
					animate: "true",
					position: "top",
					body: myNls.resetUpdateIndexButton,
					title: ''
				});

				resetButton.addEvent("onClick", function (e) {
					that.updateButton.setDisabled(false);
					if(document.getElementById('ImportFileInput').files.length===1)
						that.importButton.setDisabled(false);
					resetSpan.hide();
				})
			}
			else if (status === "Ended") {
				that.updateButton.setDisabled(false);
				if(document.getElementById('ImportFileInput').files.length===1)
					that.importButton.setDisabled(false);
				var successUpdateIcon = UWA.createElement('span', {
					'class': 'fonticon  fonticon-check',
					'id': '',
				}).inject(divStatus);
				successUpdateIcon.setStyle("color", "green");

				UWA.createElement('p', {
					text: myNls.updateIndexDone,
					id: 'StatusUpdateSuccess',
					'class': 'pSatusUpdate'
				}).inject(divStatus);
			}

			else if (status === "Failed") {
				that.updateButton.setDisabled(false);
				if(document.getElementById('ImportFileInput').files.length===1)
					that.importButton.setDisabled(false);
				var failedUpdateIcon = UWA.createElement('span', {
					'class': 'fonticon  fonticon-attention',
					'id': '',
				}).inject(divStatus);
				failedUpdateIcon.setStyle("color", "red");

				UWA.createElement('p', {
					text: myNls.updateIndexfail,
					id: 'StatusUpdateFailed',
					class: 'pSatusUpdate',
				}).inject(divStatus);

			}

			//Update end date			 
			var endUpdateIndex = that.divUpdateIndexHistory.getElement("#endUpdateIndex");
			endUpdateIndex.setText(endDate);

			//Update start date
			var startUpdateIndex = that.divUpdateIndexHistory.getElement("#startUpdateIndex");
			startUpdateIndex.setText(startDate);

			//Update user and reason
			var pUserReason = that.divUpdateIndexHistory.getElement("#pUserReason");
			if(reason === "Manual") {
				reason = myNls['Manual'];
			}
			else if(reason === "Import"){
				reason = myNls['Import'];
			}
			pUserReason.setText(user + " - " + reason);

			//Update last successful
			var ToolsDivUpdateIndexLastSuccess = that.divUpdateIndexHistory.getElement("#ToolsDivUpdateIndexLastSuccess");
			if (lastsuccesfulDate !== null) {
				var pLastUpdate = that.divUpdateIndexHistory.getElement("#pLastUpdate");
				pLastUpdate.setText("last sucessfully update : " + lastsuccesfulDate);
			}
			ToolsDivUpdateIndexLastSuccess.show();
			if (status === "Ended")
				ToolsDivUpdateIndexLastSuccess.hide();
			that.divUpdateIndexHistory.show();
		},

		/*
		Refresh function is called whenever the user do an action in the processEGraph View : creation, deletion, edition.
		This function re-display the eGraph with the according changes.
		It receives as Parameters, the type and action chosen from the left panel and the JSON containing the informations.
		*/
		refresh: function (type, action, getJSON) {
			UWA.log("ToolsLayoutView::refresh");
			this.persistJSONObject = getJSON;

			this.modal.hide();
			this.editor.hide();

		},
		destroy: function () {
			UWA.log("ToolsLayoutView::destroy");
			this.stopListening();
			this._parent();
		}
	});
	return extendedView;
});

define('DS/DBSApp/Utils/Renderers/AttrDisplayRenderer', 
[
	'DS/DBSApp/Utils/dictionaryJSONHandler'
], function(dicoHandler) {
	"use strict";


	return {
		view: 'DS/DBSApp/Views/AttrDisplayView',
		viewOptions: function(model) {
			return {
				dicoHandler: dicoHandler,
				aggregator: model.collection.owner, // from AttrOfTypeCollection
				wsSubmit: function (options, request, onSuccess, onFailure) { // Invoke Submit WS
					require(['DS/DBSApp/Utils/DMSWebServices', 'DS/DBSApp/Views/Layouts/Widgets'], function(DMSWebServices, DMSWidgets) {
						DMSWebServices.attributeModify(request,
							function successCase(resp){
								if(onSuccess) onSuccess.call(null, options, request, resp);
								var skeleton = options.skeleton;
								var curPanelIndex = skeleton.getCurrentPanelIndex();
								
								skeleton.getCollectionAt(curPanelIndex - 1).reset();
								var langCode = widget.lang;
								if (langCode == "zh") {
									langCode = "zh_CN";
								}
								skeleton.getCollectionAt(curPanelIndex - 1).fetch({
									lang: widget.lang,
									locale: widget.locale,
									sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
									entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
									reset: true,
									data: {
										maxAge: 0,
										lang: langCode
									},
									onComplete: function(collection, response, options) {
										var newModel = collection.get(skeleton.getNodeAt(curPanelIndex).get("assignedModel"));
										skeleton.getActiveIdCard().model = newModel;
										skeleton.getActiveIdCard().render();
										skeleton.getViewAt(curPanelIndex).model = newModel;
										skeleton.getViewAt(curPanelIndex).render();
									}
								});
							},
							function failureCase(message, resp) {
								if(onFailure) onFailure.call(null, options, request, resp);
								DMSWidgets.createAlertBox(message).inject(options.skeleton.getActiveIdCard().container);
							})
					})
				}
			};
		}
	};
});

define('DS/DBSApp/Utils/Renderers/AttrOfTypeRenderer',
[
	'DS/W3DXComponents/Skeleton',
	'DS/W3DXComponents/Collections/ActionsCollection',
	'DS/UIKIT/DropdownMenu',
	'DS/DBSApp/Utils/dictionaryJSONHandler',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS',
	'DS/DBSApp/Views/CustomSetView',
	'DS/DBSApp/Views/CustomTableScrollView',
	'DS/UIKIT/Alert',
],
function(Skeleton, ActionsCollection, DropdownMenu, dicoHandler, myNls, CustoSetView, CustoTableScrollView, Alert) {
	"use strict";

	function wsAttributeCreator(relatedCollection) {
		return function(options, request, onSuccess, onFailure) { // Invoke Submit WS
			require(['DS/DBSApp/Utils/DMSWebServices', 'DS/DBSApp/Views/Layouts/Widgets'], function(DMSWebServices, DMSWidgets) {
				DMSWebServices.attributeCreate(request,
					function successCase(resp){
						if(onSuccess) onSuccess.call(null, options, request, resp);
						relatedCollection.fetch({
							lang: widget.lang,
							locale: widget.locale,
							sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
							entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
							reset: true,
							data: {
								maxAge: 0,
								lang: widget.lang.replace(/^zh$/,'zh_CN')
							}
						});
					},
					function failureCase(message, resp) {
						if(onFailure) onFailure.call(null, options, request, resp);
						DMSWidgets.createAlertBox(message).inject(options.container);
					})
			})
		}
	}

	var Typeattributes = {
		collection: 'DS/DBSApp/Collections/AttrOfTypeCollection',
		collectionOptions: function(model) {
			return {
				owner: model
			};
		},
		fetchOptions: function(model) {
			return {
				lang: widget.lang,
				locale: widget.locale,
				sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
				entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName'
			};
		},
		view: CustoSetView, 
		viewOptions: {
			contents: {
				events: {},
				useInfiniteScroll: false,
				usePullToRefresh: false,
				views: [{
					'id': 'tile',
					'title': "AttributeList",
					'className': "table",
					'view': CustoTableScrollView
				}],
				headers: [
					{
						'label': myNls.get("AttrTableColumnLabelName"),
						'property': 'title'
					},
					{
						'label': myNls.get("AttrTableColumnLabelOwner"),
						'property': 'owner'
					},
					{
						'label': myNls.get("AttrTableColumnLabelType"),
						'property': 'subtitle'
					},
					{
						'label': myNls.get("AttrTableColumnLabelMultiValue"),
						'property': 'multiValueNLS'
					},
					{
						'label': myNls.get("AttrTableColumnLabelDefaultValue"),
						'property': 'defaultValueNLS'
					}
				]
			},
			actions: {
				collection: function() {
					var commands = [];
					if (dicoHandler.isAuthoring && this.model.get('isOOTB') === "No" && this.model.get('DMSStatus') != "PROD" && ((this.model.get('DMSStatus') != "DEV" && this.model.get('DMSStatus') != "DMSExported") || dicoHandler.isAOLI)) {
						commands.push({
							id: 'createAttr',
							title: myNls.get('CreateAttrPopup'),
							icon: 'plus',
							overflow: false,
							relatedView: this
						});
					}
					var acts = new ActionsCollection(commands);
					return acts;
				},
				actionClicks: {
					'createAttr': function(model, actionModel) {
						var pSkeleton = this.options.skeleton;
						new DropdownMenu({
							/*
							Accessing the container containing the action button "Create Business Rule", through this.containter.children etc.
							We could have access to it through getChildren() method I guess.
							*/
							target: this.actionsView.container.getElementsByClassName("fonticon fonticon-2x fonticon-plus")[0],
							items: [{
									id: "String",
									text: myNls.get("AttrTypeString")
								},
								{
									id: "Integer",
									text: myNls.get("AttrTypeInt")
								},
								{
									id: "Real",
									text: myNls.get("AttrTypeReal")
								},
								{
									id: "Boolean",
									text: myNls.get("AttrTypeBool")
								},
								{
									id: "Date",
									text: myNls.get("AttrTypeDate")
								},
								{
									id: "attrWithDim",
									text: myNls.get("AttrTypeRealWithDim")
								}
							],
							events: {
								onClick: function(e, item) {
									require(['DS/DBSApp/Views/CreateAttrTable'], (function(CreateAttrTable) {
										if (item.id == "String") {
											CreateAttrTable.launchPanel({
												attrType: "String",
												dicoHandler: dicoHandler,
												wsSubmit: wsAttributeCreator(actionModel.get('relatedView').collection),
												aggregator: actionModel.get('relatedView').model,
												header: myNls.get("HeaderPopupCreateAttrStr"),
												container: pSkeleton.container
											});
										} else if (item.id == "Integer") {
											CreateAttrTable.launchPanel({
												attrType: "Integer",
												dicoHandler: dicoHandler,
												wsSubmit: wsAttributeCreator(actionModel.get('relatedView').collection),
												aggregator: actionModel.get('relatedView').model,
												header: myNls.get("HeaderPopupCreateAttrInt"),
												container: pSkeleton.container
											});
										} else if (item.id == "Real") {
											CreateAttrTable.launchPanel({
												attrType: "Double",
												dicoHandler: dicoHandler,
												wsSubmit: wsAttributeCreator(actionModel.get('relatedView').collection),
												aggregator: actionModel.get('relatedView').model,
												header: myNls.get("HeaderPopupCreateAttrReal"),
												container: pSkeleton.container
											});
										} else if (item.id == "Boolean") {
											CreateAttrTable.launchPanel({
												attrType: "Boolean",
												dicoHandler: dicoHandler,
												wsSubmit: wsAttributeCreator(actionModel.get('relatedView').collection),
												aggregator: actionModel.get('relatedView').model,
												header: myNls.get("HeaderPopupCreateAttrBoolean"),
												container: pSkeleton.container
											});
										} else if (item.id == "Date") {
											CreateAttrTable.launchPanel({
												attrType: "Date",
												dicoHandler: dicoHandler,
												wsSubmit: wsAttributeCreator(actionModel.get('relatedView').collection),
												aggregator: actionModel.get('relatedView').model,
												header: myNls.get("HeaderPopupCreateAttrDate"),
												container: pSkeleton.container
											});
										} else if (item.id == "attrWithDim") {
											CreateAttrTable.launchPanel({
												attrType: "DoubleWithDim",
												dicoHandler: dicoHandler,
												wsSubmit: wsAttributeCreator(actionModel.get('relatedView').collection),
												aggregator: actionModel.get('relatedView').model,
												header: myNls.get("HeaderPopupCreateAttrAttrWithDim"),
												container: pSkeleton.container
											});
										}
									}).bind(this)) // Dépendances cycliques à tuer plus tard!
								},
								//This event is triggered when we click outside of the dropdown menu. Then we destroy it.
								onClickOutside: function() {
									this.destroy();
								}
							}
						}).show();
					}
				},
				filters: [
					{
						id: "allAttr",
						text: myNls.get("AllAttrFilter"),
						filter: null
					},
					{
						id: "ownAttr",
						text: myNls.get("OwnAttrFilter"),
						filter: function(model) {
							return model.get('isInherited') != "Yes"
						}
					},
					{
						id: "inheritedAttr",
						text: myNls.get("InheritedAttrFilter"),
						filter: function(model) {
							return model.get('isInherited') == "Yes"
						}
					}
				]
			},
			events: {
				onRenderSwitcherView: function(view) {
					// To hide the view switcher Icon
					view.container.hide();
					// To hide the "|" and the dot icon.
					var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
					if (actionsDiv != undefined && actionsDiv.length > 0) {
						actionsDiv[0].className = "set-actions";
					}
					var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
					if (actionInlineDot != undefined && actionInlineDot.length > 0) {
						actionInlineDot[0].hide();
					}
				}
			}
		},
		idCardOptions: {
			/*attributesMapping: {
				title: 'title'
			},*/
			actions: function(pSkeleton) {
				var curPanelIndex = pSkeleton.getCurrentPanelIndex();
				var parentModel = pSkeleton.getModelAt(curPanelIndex - 1);
				var editCmds = [];
				if (dicoHandler.isAuthoring && this._attributes.isInherited == "No" && this._attributes.isOOTBAttr == "No") {
					editCmds.push({
						text: myNls.get("AttrEditIconLabel"),
						icon: 'pencil',
						handler: function(view) {
							UWA.log("Edition of attribute");
							view.editModeOn();
						}
					});
				}
				if (dicoHandler.isAuthoring && this._attributes.isInherited == "No" && this._attributes.isOOTBAttr == "No" && parentModel._attributes.DMSStatus != "DEV" && parentModel._attributes.DMSStatus != "DMSExported" && parentModel._attributes.DMSStatus != "PROD") {
					editCmds.push({
						text: myNls.get("AttrDeleteIconLabel"),
						icon: 'fonticon fonticon-trash',
						handler: function(view) {
							var model = view.model;

							require(['DS/DBSApp/Utils/DMSWebServices' ], function(DMSWebServices) {
								var aggregatorNature = model.get("ownerNature");
								var aggregatorName = model.get("ownerId");
								var isIRPC = dicoHandler.isIRPC(model.get("ownerId"), model.get("ownerNature"));
								var aggregator = dicoHandler.getAgregatorByNameAndNature(aggregatorName, aggregatorNature)
								var isDepl = aggregator.Nature == "Interface" && aggregator.Automatic === "Yes";
								var aggr_package = dicoHandler.getPackageNameToCreate(isIRPC, isDepl);
								var attributesList = dicoHandler.getAttributes(aggregator.Nature, aggregator.Name, "No");
								var attrToDelete = attributesList.filter(item => item.Name == view.model.id)[0];
								var globalObjToSend = {
									'AggregatorPackage': aggr_package,
									'AggregatorName': aggregatorName,
									'AggregatorNature': aggregatorNature,
									'Attributes': {}
								};
	
								globalObjToSend.Attributes[attrToDelete.Name] = attrToDelete;
								DMSWebServices.attributeDelete(globalObjToSend,
									function(msg) {
										// On Complete
										let attrCollection = view.model.collection;
										attrCollection.fetch({
											lang: widget.lang,
											locale: widget.locale,
											sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
											entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
											reset: true,
											data: {
												maxAge: 0,
												lang: widget.lang.replace(/^zh$/,'zh_CN')
											},
											onComplete: function(collection, response, options) {
												pSkeleton.slideBack();
											}
										});
									},
									function(msg) {
										// On Faillure
										let alert = new Alert({
											visible: true,
											autoHide: true,
											hideDelay: 2000
										}).inject(pSkeleton.getActiveIdCard().container);
										alert.add({
											className: 'error',
											message: msg
										});
									});
							})

						}
					});
				}
				editCmds.push({
					text: myNls.get("CpToClipAttrInfoPopup"),
					icon: 'fonticon fonticon-clipboard-add',
					handler: function(view) {
						UWA.log("Copy the internal name of attribute");

						var value = view.model.getFullName();
						var input = UWA.createElement('input', {
							'value': value
						});
						document.body.appendChild(input);
						input.select();
						document.execCommand("copy");
						document.body.removeChild(input);
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 2000
						}).inject(this.elements.actionsSection);
						alert.add({
							className: 'primary',
							message: 'Internal name copied !'
						});
					}
				});
				return editCmds;
			},
			facets: function(pSkeleton) {
				return [{
					text: 'Attributes',
					icon: 'doc-text',
					name: 'hjhjh',
					handler: Skeleton.getRendererHandler('AttrDisplay')
				}];
			}
		}

	};
	return Typeattributes;
});

define('DS/DBSApp/Models/UniquekeyModel', ['UWA/Core',
	'UWA/Class/Model',
	'WebappsUtils/WebappsUtils',
	'DS/DBSApp/Utils/dictionaryJSONHandler'
],
function(UWA, Model, WebappsUtils, dicoHandler) {
	"use strict";

	return Model.extend({
		defaults: function() {
			//UWA.log("TypeModel::setDefault");
			//UWA.log(this);
			return {
				//Metadata associated with the model returned
				//Every model must specify an ID
				id: 'default',
				//Title and Image are properties that can be displayed in the Tile Object
				title: 'not found',
				subtitle: '',
				content: '',
				image: '', //WebappsUtils.getWebappsAssetUrl('DBSApp',"GroupAttrIcon.png"),
				//Additional Properties for the IDCard
				ownerName: 'Owner',
				//date					 : ,
				Description: '',
				//Additional Properties for data model
				isAbstract: 'Abstract : ?'
			};
		},
		setup: function() {
			//UWA.log("TypeModel::setup");
			//UWA.log(this);
		},
		parse: function(response, options) {
			var _dicoHandler = options.dicoHandler || dicoHandler;
			var externalName = _dicoHandler[options.entitle || 'getDisplayName'](internalName, response['Nature']);

			//UWA.log("TypeModel::parse");
			var that = this;
			var resultat;
			var internalName = response['Name'];
			var externalName = _dicoHandler.getDisplayName(internalName);
			var typeExternalName = _dicoHandler[options.entitle || 'getDisplayName'](response['Type'], "Type");
			var interfaceExternalName = _dicoHandler[options.entitle || 'getDisplayName'](response['Interface'], "Interface");

			var attributes = [];
			if (response['Attributes']) {
				var key = Object.keys(response['Attributes']);
				if (Array.isArray(key)) {
					key.forEach(function(iElement) {
						attributes.push(response['Attributes'][iElement]);
					});
				}
			}
			resultat = {
				//Metadata associated with the model returned
				//Every model must specify an ID
				id: internalName,
				//Title and Image are properties that can be displayed in the Tile Object
				title: externalName,
				//Additional Properties for data model
				attributes: attributes,
				subtitle: typeExternalName,
				nature: response['Nature'],
			//	isOOTB: dicoHandler.isOOTBAggregator(response.Name, response.Nature) ? "Yes" : "No",
				Package: response['Package'],
				Type: response['Type'],
				externalTypeName:typeExternalName,
				externalInterfaceName:interfaceExternalName,
				Interface: response['Interface'],
				image:	WebappsUtils.getWebappsAssetUrl('DBSApp',"icons/uniquekeyIcon.png"),
				Enabled: response['Enabled'],
				DMSStatus: response['DMSStatus'],
			//	Description: response['Description'] ? response['Description'] : "",
			//	NameNLS: response['NameNLS'],
				handler: function() {
					that.dispatchEvent('onActionClick', [that, {
						model: action
					}, arguments[0]]);
				}
			};

			return resultat;
		},
		sync: function(method, model, options) {
			//UWA.log(this);
			var id, attrs, idAttrName, resp, errorMessage;
			if (method === 'create' || method === 'update' || method === 'patch') {
				attrs = model.toJSON(options);
			}
			id = model.id;
			idAttrName = model.idAttribute;
		}
	});
});

define('DS/DBSApp/Collections/UniquekeyCollection',
[
	'UWA/Core',
	'UWA/Class/Collection',
	'DS/DBSApp/Models/UniquekeyModel',
	'DS/DBSApp/Utils/URLHandler',
	'DS/WAFData/WAFData',
	'DS/DBSApp/Utils/dictionaryJSONHandler'
],
function(UWA, Collection, Uniquekey, URLHandler, WAFData, dicoHandler) {
	"use strict";

	return Collection.extend({
		//No initial model passed, because there is only 1 Tile ("Manage Business Rule").
		model: Uniquekey,
		/*
		Setup function is called when initializing a newly created instance of collection.
		It is not called in my application code because it is internally used.
		It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
		*/
		setup: function(models, options) {
			UWA.log("DMSTypes::setup");
			this.url = URLHandler.getDicoCustoUrl();
		},

		/*
		Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
		It is not called in my application code because it is internally used.
		*/
		sync: function(method, collection, options) {
			return this._parent.call(this, method, collection, Object.assign(options, {
				ajax: WAFData.authenticatedRequest,
				contentType : "application/json",
				type: 'json',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'SecurityContext': URLHandler.getSecurityContext()
				},
				sort: true
			}));
		},
		
		/*
		Parse function is used to transform the backend response into an array of models.
		It is not called in my application code because it is internally used.
		The parameter "data" corresponds to the raw response object returned by the backend API.

		It returns the array of model attributes to be added to the collection.
		*/
		parse: function(data) {
			UWA.log("DMSTypes::parse");

			dicoHandler.init(data, dicoHandler.startupDicoOOTB);
			var paramReturned = [];
			Object.keys(data.Dictionary.UniqueKeys).forEach((item, i) => {
				paramReturned.push(data.Dictionary.UniqueKeys[item]);
			});
			return paramReturned.map(function(item) { // Les collections doivent retourner des items avec un id!!
				item.id = item.id || item.Name;
				return item;
			});
		},
	});
});

define('DS/DBSApp/Models/TypeModel',
[
	'DS/DBSApp/Utils/dictionaryJSONHandler',
	'UWA/Class/Model',
	'WebappsUtils/WebappsUtils'
],
function(dicoHandler, Model, WebappsUtils) {
	"use strict";

	return Model.extend({
		defaults: function() {
			//UWA.log("TypeModel::setDefault");
			//UWA.log(this);
			return {
				//Metadata associated with the model returned
				//Every model must specify an ID
				id: 'default',
				//Title and Image are properties that can be displayed in the Tile Object
				title: 'not found',
				subtitle: '',
				content: '',
				image: '', //WebappsUtils.getWebappsAssetUrl('DBSApp',"GroupAttrIcon.png"),
				//Additional Properties for the IDCard
				ownerName: 'Owner',
				//date					 : ,
				Description: '',
				//Additional Properties for data model
				isAbstract: 'Abstract : ?'
			};
		},
		setup: function(attrs, options) {
			this.tool = options.tool;
		},
		parse: function(response, options) {
			//UWA.log("TypeModel::parse");
			var that = this;
			var _dicoHandler = options.dicoHandler || dicoHandler;
			var internalName = response['Name'];
			var externalName = _dicoHandler[options.entitle || 'getDisplayName'](internalName, response['Nature']);

			var attributes = [];
			if (response['Attributes']) {
				var key = Object.keys(response['Attributes']);
				if (Array.isArray(key)) {
					key.forEach(function(iElement) {
						attributes.push(response['Attributes'][iElement]);
					});
				}
			}
			var resultat = {
				//Metadata associated with the model returned
				//Every model must specify an ID
				id: internalName,
				//Title and Image are properties that can be displayed in the Tile Object
				title: externalName,
				//Additional Properties for data model
				isAbstract: response['Abstract'],
				attributes: attributes,
				nature: response['Nature'],
				isOOTB: _dicoHandler.isOOTBAggregator(response.Name, response.Nature) ? "Yes" : "No",
				Package: response['Package'],
				DMSStatus: response['DMSStatus'],
				Description: response['Description'] ? response['Description'] : "",
				NameNLS: response['NameNLS'],
				handler: function() {
					that.dispatchEvent('onActionClick', [that, {
						model: action
					}, arguments[0]]);
				}
			};
			if (resultat.NameNLS == undefined && resultat.isOOTB == "No") {
				resultat.NameNLS = _dicoHandler.getListNameNLSFromDico(internalName, response["Nature"]);
			}
			// Beark!! on pourrait extraire l'info d'options.tool depuis les données ?!
			var tool = options.tool || (this.collection && this.collection.tool) || this.tool;
			if (tool === "attGrp") {
				this.fillInterfaceObject(resultat, response, options);
			} else if (tool === "type") {
				this.fillTypeObject(resultat, response, options);
			} else if (tool === "extension") {
				this.fillExtensionObject(resultat, response, options);
			}
			return resultat;
		},
		sync: function(method, model, options) {
			if (method === 'create' || method === 'update' || method === 'patch') {
				var attrs = model.toJSON(options);
			}
			var id = model.id;
			var idAttrName = model.idAttribute;
		},
		fillInterfaceObject: function(resultat, response, options) {
			var _dicoHandler = options.dicoHandler || dicoHandler;
			var scopes = [];
			var nlsNameScopes = [];
			// Logique partiellement copiée/collée depuis dictionaryJSONHandler.attributeGroupHadScope
			if (response['ScopeTypes']) {
				scopes = scopes.concat(response['ScopeTypes']);
				nlsNameScopes = nlsNameScopes.concat(
					response['ScopeTypes'].map(scopeType=>_dicoHandler[options.entitle || 'getDisplayName'](scopeType, 'Type'))
				);
			}
			if (response['ScopeRelationships']) {
				scopes = scopes.concat(response['ScopeRelationships']);
				nlsNameScopes = nlsNameScopes.concat(
					response['ScopeRelationships'].map(scopeRel=>_dicoHandler[options.entitle || 'getDisplayName'](scopeRel, 'Relationship'))
				);
			}

			resultat['image'] = WebappsUtils.getWebappsAssetUrl('DBSApp', "icons/DeplExtNoAuto_TileHalf.png");
			resultat['ownerName'] = response['Name'];
			resultat['scopes'] = scopes;
			resultat['automatic'] = response['Automatic'];
			resultat['ScopeTypes'] = response['ScopeTypes'] ? response['ScopeTypes'] : [];
			resultat['ScopeRelationships'] = response['ScopeRelationships'] ? response['ScopeRelationships'] : [];
			resultat['content'] = nlsNameScopes.length > 1 ? "<span title='" + nlsNameScopes.join(" ") + "'>" + nlsNameScopes[0] + ", ...</span>" : nlsNameScopes[0];
			resultat['scopesNls'] = nlsNameScopes.join(" ");
			// resultat['subtitle'] = "Automatic : "+response['Automatic'];
			resultat['interface'] = "attGroup";
		},
		fillTypeObject: function(resultat, response, options) {
			var _dicoHandler = options.dicoHandler || dicoHandler;
			resultat['subtitle'] = _dicoHandler[options.entitle || 'getDisplayName'](response['Parent'], response['Nature']);
			resultat['parent'] = response['Parent'];
			resultat['content'] = "";
			// BMN2 10/09/2021 : IR-859985-3DEXPERIENCER2022x
			// We use the hierachy to find an icon to display.
			const typeMap = _dicoHandler.getParentTypeMap(resultat.id, resultat.nature)
			let findIconLarge = false;
			typeMap.every(function(item) {
				if (item.IconLarge != undefined) {
					resultat['image'] = "data:image/png;base64," + item["IconLarge"];
					findIconLarge = true;
					return false;
				}
				return true;
			});
			/*	if (response["IconLarge"] != undefined) {
					resultat['image'] = "data:image/png;base64,"+response["IconLarge"];
					resultat['IconLarge'] = response["IconLarge"];
				} else*/
			if (!findIconLarge) {
				resultat['image'] = WebappsUtils.getWebappsAssetUrl('DBSApp', "icons/SpeType_TileHalf.png");
			}
			resultat['IconLarge'] = response["IconLarge"];
			resultat["IconNormal"] = response["IconNormal"];
			resultat["IconSmall"] = response["IconSmall"];
			resultat['DeploymentExtensible'] = response['DeploymentExtensible'];
			resultat['CustomerExtensible'] = response['CustomerExtensible'];
		},
		fillExtensionObject: function(resultat, response, options) {
			var _dicoHandler = options.dicoHandler || dicoHandler;
			var scopes = [];
			var nlsNameScopes = [];
			// Logique partiellement copiée/collée depuis dictionaryJSONHandler.attributeGroupHadScope
			if (response['ScopeTypes']) {
				scopes = scopes.concat(response['ScopeTypes']);
				nlsNameScopes = nlsNameScopes.concat(
					response['ScopeTypes'].map(scopeType=>_dicoHandler[options.entitle || 'getDisplayName'](scopeType, 'Type'))
				);
			}
			if (response['ScopeRelationships']) {
				scopes = scopes.concat(response['ScopeRelationships']);
				nlsNameScopes = nlsNameScopes.concat(
					response['ScopeRelationships'].map(scopeRel=>_dicoHandler[options.entitle || 'getDisplayName'](scopeRel, 'Relationship'))
				);
			}
			
			resultat['subtitle'] = _dicoHandler[options.entitle || 'getDisplayName'](response['Parent'], "Interface");
			resultat['parent'] = response['Parent'];
			resultat['scopes'] = scopes;
			resultat['scopesNls'] = nlsNameScopes.join(" ");
			resultat['content'] = nlsNameScopes.length > 1 ? "<span title='" + nlsNameScopes.join(" ") + "'>" + nlsNameScopes[0] + ", ...</span>" : nlsNameScopes[0];
			resultat['image'] = WebappsUtils.getWebappsAssetUrl('DBSApp', "icons/CustoExt_TileHalf.png");
			resultat['ScopeTypes'] = response['ScopeTypes'] ? response['ScopeTypes'] : [];
			resultat['ScopeRelationships'] = response['ScopeRelationships'] ? response['ScopeRelationships'] : [];
			resultat['interface'] = "custoExt";
		},
		getDMSStatus: function() {
			return this.get("DMSStatus");
		},
		getNature: function() {
			return this.get("nature");
		},
		isAbstract: function() {
			return this.get("isAbstract") === "Yes" ? true : false;
		}
	});
});

define('DS/DBSApp/Collections/TypeCollection',
[
	'DS/DBSApp/Utils/dictionaryJSONHandler',
	'UWA/Class/Collection',
	'DS/DBSApp/Models/TypeModel',
	'DS/DBSApp/Utils/URLHandler',
	'DS/WAFData/WAFData'
],
function(dicoHandler, Collection, Type, URLHandler, WAFData) {
	"use strict";

	return Collection.extend({
		//No initial model passed, because there is only 1 Tile ("Manage Business Rule").
		model: Type,
		/*
		Setup function is called when initializing a newly created instance of collection.
		It is not called in my application code because it is internally used.
		It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
		*/
		setup: function(models, options) {
			this.url = URLHandler.getDicoCustoUrl();
			options = options || {};
			this.tool = options.tool || this.tool; // Des écrans osent rappeler setup sans argument!!
			this.parent = options.parent || this.parent;
			this.scopes = options.scopes || this.scopes
			this.extScope = options.extScope || this.extScope;
			this.typeScope = options.typeScope || this.typeScope;
			this.custExtScope = options.custExtScope || this.custExtScope;
			this.attrGrpScope = options.attrGrpScope || this.attrGrpScope;
		},

		/*
		Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
		It is not called in my application code because it is internally used.
		*/
		sync: function(method, collection, options) {
			return this._parent.call(this, method, collection, Object.assign(options, {
				ajax: WAFData.authenticatedRequest,
				contentType : "application/json",
				type: 'json',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'SecurityContext': URLHandler.getSecurityContext()
				},
				sort: true
			}));
		},

		/*
		Parse function is used to transform the backend response into an array of models.
		It is not called in my application code because it is internally used.
		The parameter "data" corresponds to the raw response object returned by the backend API.

		It returns the array of model attributes to be added to the collection.
		*/
		parse: function(data, options) {
			var _dicoHandler = options.dicoHandler || dicoHandler;
			_dicoHandler.init(data, _dicoHandler.startupDicoOOTB);
			var paramReturned = [];

			var tool = options.tool || this.tool;
			var parent = options.parent || this.parent;
			var scopes = options.scopes || this.scopes;
			var typeScope = options.typeScope || this.typeScope;
			var custExtScope = options.custExtScope || this.custExtScope;
			var attrGrpScope = options.attrGrpScope || this.attrGrpScope;

			if (tool === "attGrp") {
				/* anciens selecteurs dans AttrGroupCollection */
				paramReturned = _dicoHandler.getAttGroups(typeScope);
			} else if (tool === "extension") {
				/* anciens selecteurs dans ExtOfTypeCollection */
				if(parent) {
					paramReturned = _dicoHandler.getSubCustomerExt(parent,true);
				} else if(typeScope) {
					paramReturned = _dicoHandler.getCustomerExtensions(typeScope);
				} else {
					paramReturned = _dicoHandler.getCustomerExtensions();
				}
			} else if (tool === "type") {
				if (parent) {
					paramReturned = _dicoHandler.getSubType(parent);
				} else if(attrGrpScope) {
					var scopes = _dicoHandler.attributeGroupHadScope(attrGrpScope);
					paramReturned = _dicoHandler.getTypesAndRelationships(scopes);
				} else if(custExtScope) {
					var scopes = _dicoHandler.customerExtensionHadScope(custExtScope);
					paramReturned = _dicoHandler.getTypesAndRelationships(scopes);
				} else if (scopes) { // Ce code est inutile car les scopes peuvent changer après leur edition
					options.scopes = model.get('scopes');
					paramReturned = _dicoHandler.getTypesAndRelationships(scopes);
				} else {
					var speInterfaceList = _dicoHandler.getCustoSpeInterfaces();
					paramReturned = _dicoHandler.getCustoTypesAndRelationships();
					paramReturned = paramReturned.concat(speInterfaceList);
				}
			}
			
			if(options.sorter && _dicoHandler[options.sorter]) {
				paramReturned.sort(function(a, b) {
					var a = _dicoHandler[options.sorter](a.Name,a.Nature); // sorter = getNLSName ou getDisplayName
					var b = _dicoHandler[options.sorter](b.Name,b.Nature);
					return a.localeCompare(b);
				});
			}
			return paramReturned.map(function(item) { // Les collections doivent retourner des items avec un id!!
				item.id = item.id || item.Name;
				return item;
			});
		}

	});
});

define('DS/DBSApp/Views/CustomTileView',
  [
    'UWA/Core',
    'i18n!DS/DBSApp/assets/nls/DMSAppNLS',
    'DS/W3DXComponents/Views/Item/TileView',
    'DS/UIKIT/Tooltip',
    'DS/UIKIT/Popover',
    'DS/DBSApp/Utils/dictionaryJSONHandler'
  ],
  function(UWA, myNls, TileView, Tooltip, Popover, dicoHandler) {

    'use strict';
    /*
    This class generates all the views in the process View. In other words, it's the "leader" view.
    */
    return TileView.extend({
      tagName: 'div',
      className: 'dashboard-tile-view',
      elements: {},

      /**
       * @override UWA.Class.View#setup
       * @param {View}   options.collectionView - The containing collection view.
       */
      setup: function(options) {
        this._parent.apply(this, options);
        this.addEvent("onItemRendered", function(tt) {
          if ( this.model.get('DMSStatus')!=undefined || !dicoHandler.isAuthoring  /*this.model._attributes.parent == "VPMReference" || this.model._attributes.parent == "Requirement" || this.model.get('Package') === "DMSPackDefault_01"*/) {
            var span = UWA.createElement('span', {
              class: "fonticon fonticon-lock"
            });
            /*if (this.model._attributes.parent == "VPMReference") {
              span.setStyle("color", "#EA4F37");
            } else {
              span.setStyle("color", "#E87B00");
            }*/
            span.setStyle("color", "#FFFFFF");
            span.setStyle("float", "right");
            var div = this.container.getElementsByClassName('tile-actions')[0];
            div.firstElementChild.remove();
            var msgForTooltip = "";
            if(!dicoHandler.isAuthoring) {
            	div.style.backgroundColor = "#EA4F37";
              msgForTooltip = myNls.get('InProductionStatus');
            } else {
            if (this.model.get('DMSStatus')==="PROD" /*this.model._attributes.parent == "VPMReference"|| this.model.get('Package') === "DMSPackDefault_01"*/) {
              div.style.backgroundColor = "#EA4F37";
              msgForTooltip = myNls.get('importFromProd');
            } else if(this.model.get('DMSStatus')==="DEV" || this.model.get('DMSStatus')==="DMSExported"/*this.model._attributes.parent == "Requirement"*/){
              div.style.backgroundColor = "#E87B00";
                msgForTooltip = myNls.get('exported');
            }
            }
            var tooltip = new Tooltip({
              target: div,
              body: msgForTooltip,
              position: "top" // "bottom"
            })
            /* fix IR-906721-3DEXPERIENCER2023x: replace popover by tooltip
            var popover = new Popover({
              className: "inverted",
              target: div,
              position: "top",
              body: msgForTooltip,
              title: myNls.get('locked'),
              trigger: 'onmouseover',
              autoHide: true,
              delay: {
                show: 50
              }
            });
            div.onmouseover = function() {
              var delay = setTimeout(function() {
                popover.toggle();
              }, 300);
              div.onmouseout = function() {
                clearTimeout(delay);
                if (popover.isVisible) {
                  popover.toggle();
                }
              };
              // popover.toggle();
            };
            //*/
            span.inject(div);
            /*var img = this.container.getElementsByTagName('img')[0];
            img.setStyle("filter", "grayscale(100%)");
            var title = this.container.getElementsByClassName('tile-title')[0];
            title.style.color = "#3d3d3d";*/

          }
        });
        this.collectionView = options.collectionView;
      }
    });

  });

define('DS/DBSApp/Views/CustomTilesView',
[
	'UWA/Core',
	'DS/W3DXComponents/Views/Layout/GridView',
	'DS/W3DXComponents/Views/Layout/GridScrollView',
	'DS/DBSApp/Views/CustomTileView',
],
function(UWA, GridView, GridScrollView, CustoTileView) {
	"use strict";

	function lookupIterator(value) {
		return UWA.is(value, 'function') ? value : function (model) {
			return model.get(value);
		};
	}

	function collectionSortBy(collection, hash, context) {
		var lookupHash = lookupIterator(hash);
		var sortedModels = collection.map(function (model, index, list) {
			return {
				model: model,
				index: index,
				criteria: lookupHash.call(context, model, index, list)
			};
		});
		sortedModels.sort(function (left, right) {
			var a, b;
			a = left.criteria;
			b = right.criteria;
			if (a !== b) {
				if (a > b || a === undefined) {
					return 1;
				}
				if (a < b || b === undefined) {
					return -1;
				}
			}
			if (left.index < right.index) {
				return -1;
			}
			return 1;
		});
		return sortedModels.map(function (model) {
			return model.model;
		});
	}


	function collectionBinaryInsert(collection, model, index, hash, context) {
		var lookupHash = lookupIterator(hash);
		var modelCriteria = lookupHash.call(context, model, index, collection);
		var lo = 0, hi = collection.length - 1;
		while(lo <= hi) {
			var mi = (lo+hi) >> 1;
			var miCriteria = lookupHash.call(context, collection[mi], mi, collection);
			var cmp = 0;
			if (modelCriteria !== miCriteria) {
				if (modelCriteria > miCriteria || modelCriteria === undefined) {
					cmp = 1;
				}
				if (modelCriteria < miCriteria || miCriteria === undefined) {
					cmp = -1;
				}
			}
			if (cmp==0) {
				cmp = index - mi;
			}
			if (cmp > 0) {
				lo = mi + 1;
			} else if(cmp < 0) {
				hi = mi - 1;
			} else {
				lo = hi = mi
			}
		}
		collection.splice(lo, 0, model);
		return lo;
	}



	var CustoGridView = GridView.extend({
		itemView: CustoTileView,
		itemSorter: null,
		itemSortAsc: true,
		sortedModels: null,

		setOptions : function(options) { // Il y a un bug dans la méthode parente quand itemViewOptions est une fonction!!
			return this._parent.call(this, options);
		},

		render : function(... args) {
			if(this.itemSorter) {
				this.sortedModels = collectionSortBy(this.collection, this.itemSorter, this);
				if(!this.itemSortAsc) {
					this.sortedModels = this.sortedModels.reverse();
				}
			} else {
				this.sortedModels = null;
			}
			this._parent.apply(this, args);
		},

		showCollection : function() {
			(this.sortedModels || this.collection).forEach(function(item, index) {
				var ItemView = this.getItemView(item);
				this.addItemView(item, ItemView, index);
			}, this);
		},

		addChildView : function(item, collection, options) {
			this.destroyEmptyView();
			var itemView = this.getItemView(item);
			var index = this.collection.indexOf(item);
			if(this.sortedModels && this.itemSorter) {
				index = collectionBinaryInsert(this.sortedModels, item, index, this.itemSorter, this);
				if(!this.itemSortAsc) index = this.sortedModels.length - 1 - index;
			}
			this.addItemView(item, itemView, index);
		},

		appendHtml : function(collectionView, itemView, index) {
			var nextContainer = collectionView.container.children.item(index);
			if(nextContainer) {
				collectionView.container.insertBefore(itemView.container, nextContainer);
			} else {
				collectionView.container.appendChild(itemView.container);
			}
		},
		
		sortBy : function(hash, asc) {
			this.itemSorter = hash;
			this.itemSortAsc = asc;
			this.render();
		},
		
		buildItemView : function(item, ItemViewType, itemViewOptions) {
			return this._parent.call(this, item, ItemViewType, UWA.extend(itemViewOptions || {}, {
				skeleton: this.options.skeleton
			}));
		}
	})

	return GridScrollView.extend({
		nested: CustoGridView
	})
})

define('DS/DBSApp/Utils/Renderers/TypeRenderer',
[
	'DS/W3DXComponents/Skeleton',
	'DS/DBSApp/Views/CustomSetView',
	'DS/DBSApp/Views/CustomTilesView',
	'DS/W3DXComponents/Collections/ActionsCollection',
	'DS/UIKIT/Mask',
	'DS/DBSApp/Views/CustomModal',
	'DS/DBSApp/Utils/dictionaryJSONHandler',
	'DS/UIKIT/Alert',
	'DS/DBSApp/Views/Layouts/Widgets',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
],
function(Skeleton, CustoSetView, CustoTilesView, ActionsCollection, Mask, CustomModal, dicoHandler, Alert, DMSWidgets, myNls) {
	"use strict";

	return {
		collection: 'DS/DBSApp/Collections/TypeCollection',
		collectionOptions: function(model) {
			var options = {
				tool: 'type'
			}
			if(model.get('nature')=='Interface' && model.get('interface')=='attGroup') {
				options.attrGrpScope = model.get('id');
			}
			if(model.get('nature')=='Interface' && model.get('interface')=='custoExt') {
				options.custExtScope = model.get('id');
			}
			return options;
		},
		fetchOptions: function(model) {
			return {
				lang: widget.lang,
				locale: widget.locale,
				sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
				entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName'
			};
		},
		view: CustoSetView, //'DS/W3DXComponents/Views/Item/SetView',
		viewOptions: {
			contents: {
				useInfiniteScroll: false,
				usePullToRefresh: false,
				views: [{
					'id': 'tile',
					'title': 'TypeTest',
					'className': 'tileView',
					'view': CustoTilesView,
				}]
			},
			actions: {
				collection: function() {
					var acts = [];
					var nature = this.model.get("nature");
					if (dicoHandler.isAuthoring) {
						if (nature === "Interface") {
							var tempIcon = "fonticon fonticon-pencil";
							var tempText = myNls.get('modScope');
							var myID = 'addScope';
							if (this.model.get('DMSStatus') != undefined) {
								tempIcon = "fonticon fonticon-plus";
								tempText = myNls.get('addScope');
							}
							var scopes = dicoHandler.customerExtensionHadScope(this.model.get('parent'), true);
							if (scopes.length) {
								tempIcon = "fonticon fonticon-pencil-locked";
								tempText = myNls.get('noModScopeExtension');
								myID = 'disabled';
							}
							acts.push({
								id: myID,
								title: tempText,
								icon: tempIcon,
								nature: nature,
								overflow: false
							});

						} else {
							acts.push({
								id: 'addType',
								title: myNls.get('NewTypePopup'),
								icon: 'fonticon fonticon-plus myPlusBtnType',
								overflow: false,
								nature: nature
							});
						}
					}
					return new ActionsCollection(acts);
				},
				actionClicks: {
					"addType": function(model) {
						var skeleton = this.options.skeleton;
						if (model.get("nature") == "menu" || model.get("nature") == "Type") {
							require(['DS/DBSApp/Views/TypeForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(TypeForm, DMSWebService) {
								var myTypeForm = TypeForm.buildForNew({
									isInstField: widget.getValue("instField") == "show",
									modeSubType: false,
									dicoHandler: dicoHandler,
									wsAggregatorWs: function(request) {
										DMSWebService.aggregatorCreate(request, request['Nature'], 
											function successCase(response) {
												modal.destroy();
												skeleton.getCollectionAt(1).fetch({
													lang: widget.lang,
													locale: widget.locale,
													sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													reset: true,
													data: {
														maxAge: 0,
														lang: widget.lang.replace(/^zh$/,'zh_CN')
													},
													onComplete: function(collection, response, options) {
														var modelOfCreatedType = skeleton.getCollectionAt(1).findWhere({
															id: request['Name']
														});
														var newTypeElem = skeleton.getViewAt(1).contentsViews.tile.nestedView.getChildView(modelOfCreatedType);
														newTypeElem.select();
													}
												});
											},
											function failureCase(resp) {
												modal.injectAlert(resp);
											}
										);
									}
								});
								var modal = new CustomModal(myTypeForm, skeleton.container, myNls.get("NewTypeFormHeader")).build();
							}).bind(this))
						} 
						if(model.get('nature')=='Interface' && model.get('interface')=='custoExt') {
							require(['DS/DBSApp/Views/InterfaceForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(InterfaceForm, DMSWebService) {
								var formBuild = InterfaceForm.build({
									modeEdit: 'Edit',
									model: model,
									dicoHandler: dicoHandler,
									entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
									entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
									wsAggregatorWs: function(request, onSuccess, onFailure) {
										DMSWebService.aggregatorModify(request, 'Interface',
											function successCase(resp) {
												var interface_name = request['Name'];
												var currStep = skeleton.getCurrentPanelIndex();
												modal.destroy();
												skeleton.getCollectionAt(currStep - 1).fetch({
													lang: widget.lang,
													locale: widget.locale,
													sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													reset: true,
													data:{
														maxAge:0,
														lang: widget.lang.replace(/^zh$/,'zh_CN')
													},
													onComplete: function(collection, response) {
														var modModel = collection.get(interface_name);
											
														var nestedView = skeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
														skeleton.getModelAt(currStep).set(modModel._attributes);
														nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
														skeleton.getActiveIdCard().model = modModel;
														skeleton.getActiveIdCard().render();
														skeleton.getCollectionAt(currStep).fetch({
															lang: widget.lang,
															locale: widget.locale,
															sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															reset: true,
															data:{
																maxAge:0,
																lang: widget.lang.replace(/^zh$/,'zh_CN')
															}
														});
													}
												});
											},
											function failureCase() {
												modal.injectAlert(resp);
											}
										)
									}
								});
								var modal = new CustomModal(formBuild, this.options.skeleton.container, myNls.get('editInterface')).build();
							}).bind(this))
						}
					},
					"addScope": function(model) {
						var skeleton = this.options.skeleton;
						if(model.get('nature')=='Interface' && model.get('interface')=='attGroup') {
							require(['DS/DBSApp/Views/InterfaceForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(InterfaceForm, DMSWebService) {
								var formBuild = InterfaceForm.build({
									modeEdit: 'Edit',
									model: model,
									dicoHandler: dicoHandler,
									entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
									entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
									wsAggregatorWs: function(request, onSuccess, onFailure) {
										DMSWebService.aggregatorModify(request, 'Interface',
											function successCase(resp) {
												var interface_name = request['Name'];
												var currStep = skeleton.getCurrentPanelIndex();
												modal.destroy();
												skeleton.getCollectionAt(currStep - 1).fetch({
													lang: widget.lang,
													locale: widget.locale,
													sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													reset: true,
													data:{
														maxAge:0,
														lang: widget.lang.replace(/^zh$/,'zh_CN')
													},
													onComplete: function(collection, response) {
														var modModel = collection.get(interface_name);
											
														var nestedView = skeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
														skeleton.getModelAt(currStep).set(modModel._attributes);
														nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
														skeleton.getActiveIdCard().model = modModel;
														skeleton.getActiveIdCard().render();
														skeleton.getCollectionAt(currStep).fetch({
															lang: widget.lang,
															locale: widget.locale,
															sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															reset: true,
															data:{
																maxAge:0,
																lang: widget.lang.replace(/^zh$/,'zh_CN')
															}
														});
													}
												});
											},
											function failureCase() {
												modal.injectAlert(resp);
											}
										)
									}
								});
								var modal = new CustomModal(formBuild, this.options.skeleton.container, myNls.get('attGrpScopeFormName')).build();
							}).bind(this))
						}
						if(model.get('nature')=='Interface' && model.get('interface')=='custoExt') {
							require(['DS/DBSApp/Views/CustoExtForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(CustoExtForm, DMSWebService) {
								var formBuild = CustoExtForm.build({
									modeEdit: 'AddScope',
									model: model,
									dicoHandler: dicoHandler,
									entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
									entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
									wsAggregatorWs: function(request) {
										DMSWebService.aggregatorModify(request, 'Interface', 
											function successCase() {
												modal.destroy();
												var currStep = skeleton.getCurrentPanelIndex();
												skeleton.getCollectionAt(currStep - 1).fetch({
													lang: widget.lang,
													locale: widget.locale,
													sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													reset: true,
													data:{
														maxAge:0,
														lang: widget.lang.replace(/^zh$/,'zh_CN')
													},
													onComplete: function(collection, response, options) {
														var modModel = collection.get(request['Name']);
														skeleton.getModelAt(currStep).set(modModel._attributes);
														skeleton.getActiveIdCard().model = modModel;
														skeleton.getActiveIdCard().render();
														var nestedView = skeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
														nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
														skeleton.getCollectionAt(currStep).fetch({
															lang: widget.lang,
															locale: widget.locale,
															sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															reset: true,
															data:{
																maxAge:0,
																lang: widget.lang.replace(/^zh$/,'zh_CN')
															}
														});
													}
												});
											},
											function failureCase(resp) {
												modal.injectAlert(resp);
											}
										);
									}
								});
								var modal = new CustomModal(formBuild, this.options.skeleton.container, myNls.get('custoExtScopeFormName')).build();
							}).bind(this))
						}
					}
				},
				filters: function() {
					let filterOptTab = [
						{
							id: "AllTypeFilterButton",
							text: myNls.get("ResetFilter"),
							fonticon: "reset",
							selectable: true,
							filter: null
						},
						{
							className: "divider"
						},
						{
							id: "ConcreteTypeFilterButton",
							text: myNls.get("ConcreteTypeFilter"),
							fonticon: "object-class-concrete-add",
							selectable: true,
							filter: function(model) {
								return !model.isAbstract();
							}
						},
						{
							id: "AbstractTypeFilterButton",
							text: myNls.get("AbstractTypeFilter"),
							fonticon: "object-class-abstract",
							selectable: true,
							filter: function(model) {
								return model.isAbstract();
							}
						}
					];
					if (dicoHandler.isAuthoring) {
						filterOptTab.push({
							className: "divider"
						}, {
							id: "ExportedTypeFilterButton",
							text: myNls.get("ExportedTypeFilter"),
							fonticon: "export",
							selectable: true,
							filter: function(model) {
								return model.getDMSStatus() === "DMSExported"
							}
						}, {
							id: "InProdTypeFilterButton",
							text: myNls.get("InProdTypeFilter"),
							fonticon: "factory",
							selectable: true,
							filter: function(model) {
								return model.getDMSStatus() === "PROD";
							}
						}, {
							id: "CurrentTypeFilterButton",
							text: myNls.get("UnderDefinitionFilter"),
							fonticon: "hardhat",
							selectable: true,
							filter: function(model) {
								return !model.getDMSStatus();
							}
						});
					}
					return filterOptTab;
				},
				sorters: [
					{
						id: "sortByName",
						text: myNls.get('SortTypeByName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'title',
						titleAsc: myNls.get("SortTypeAsc"),
						titleDesc: myNls.get("SortTypeDesc")
					},
					{
						id: "sortByParentName",
						text: myNls.get('SortTypeByParentName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'subtitle',
						titleAsc: myNls.get("SortTypeAsc"),
						titleDesc: myNls.get("SortTypeDesc")
					}
				]
			},
			events: {
				onRenderSwitcherView: function(view) {
					// To hide the view switcher Icon
					view.container.hide();
					// To hide the "|" and the dot icon.
					var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
					if (actionsDiv != undefined && actionsDiv.length > 0) {
						actionsDiv[0].className = "set-actions";
					}
					var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
					if (actionInlineDot != undefined && actionInlineDot.length > 0) {
						actionInlineDot[0].hide();
					}
				}
			}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				ownerName: 'subtitle',
				description: 'content'
			},
			thumbnail: function() {
				const typeMap = dicoHandler.getParentTypeMap(this.get("id"), this.get('nature'));
				let img = this.get('image');
				for (let i = 0; i < typeMap.length; i++) {
					if (typeMap[i].IconLarge != undefined) {
						img = "data:image/png;base64," + typeMap[i].IconLarge;
						break;
					}
				}
				return {
					squareFormat: true,
					url: img
				};
			},
			actions: function(skeleton) {
				var typeCmds = [];
				if (!dicoHandler.isOOTBAggregator(this.get("id"), this.get("nature"))) {
					if (dicoHandler.isAuthoring) {
						typeCmds.push({
							text: myNls.get('EditTypePopup'),
							icon: 'pencil',
							handler: function(view) {
								require(['DS/DBSApp/Views/TypeForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(TypeForm, DMSWebService) {
									var currentPanel = skeleton.getCurrentPanelIndex();
									var myModel = skeleton.getModelAt(currentPanel);
									var myTypeForm = TypeForm.buildForEdit({
										isInstField: widget.getValue("instField") == "show",
										modeSubType: false,
										model: myModel,
										dicoHandler: dicoHandler,
										wsAggregatorWs: function(request) {
											DMSWebService.aggregatorModify(request, request['Nature'], 
												function successCase(response) {
													modal.destroy();
													skeleton.getCollectionAt(1).fetch({
														lang: widget.lang,
														locale: widget.locale,
														sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
														entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
														reset: true,
														data: {
															maxAge: 0,
															lang: widget.lang.replace(/^zh$/,'zh_CN')
														},
														onComplete: function(collection, response, options) {
															var modelOfCreatedType = skeleton.getCollectionAt(1).findWhere({
																id: request['Name']
															});
															UWA.extend(skeleton.getModelAt(2)._attributes, modelOfCreatedType._attributes, true);
															skeleton.getActiveIdCard().render();
															// Il faut mettre à jour la collection/model avant de faire un render()
															// pour que la colonne "owner" soit mise à jour.
															skeleton.getViewAt(2).render();
														}
													});
												},
												function failureCase(resp) {
													modal.injectAlert(resp);
												}
											);
										}
									});
									var modal = new CustomModal(myTypeForm, skeleton.getActiveIdCard().container, myNls.get("EditTypePopup")).build();
								}).bind(this))
							}
						});
					}
					typeCmds.push({
						text: myNls.get('DeleteTypePopup'),
						icon: 'fonticon fonticon-trash ',
						handler: function(view) {
							Mask.mask(widget.body)
							var model = this.model;
							var errors = [];
							var entitle = dicoHandler[widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName'].bind(dicoHandler);
							var subtypes = dicoHandler.getChildren(model.get('id'), model.get('nature'));
							var uniquekeys = dicoHandler.findUniqueKeysOnType(model.get('id'));
							var attrgrpscope = dicoHandler.findAttrGrpOnType(model.get('id'));

							if(subtypes.length>0) {
								errors.push({
									nls: "noDeleteTypeHasChildren",
									values: subtypes.map(function(subtype){
										return entitle(subtype['Name'], subtype['Nature']);
									})
								});
							}
							if(attrgrpscope.length>0) {
								errors.push({
									nls: "noDeleteTypeOnAttrGrps",
									values: attrgrpscope.map(function(attrgrp){
										return entitle(attrgrp['Name'], attrgrp['Nature']);
									})
								})
							}
							if(uniquekeys.length>0){
								errors.push({
									nls: "noDeleteTypeOnUniqueKeys",
									values: uniquekeys.map(function(uniquekey){
										return entitle(uniquekey['Name'], uniquekey['Nature']);
									})
								});
							}
							if(errors.length>0) {
								Mask.unmask(widget.body);
								DMSWidgets.createAlertBox(errors).inject(skeleton.container);
								return;
							}

							require(['DS/DBSApp/Utils/DMSWebServices', 'DS/UIKIT/Alert' ], (function(DMSWebServices, Alert) {
								DMSWebServices.aggregatorDelete({
									"Name": model.get('id'),
									"Nature": model.get('nature'),
									"Package": model.get('Package'),
								}, model.get('nature'), function(resp) {
									Mask.unmask(widget.body);
									skeleton.slideBack();
									var currStep = skeleton.getCurrentPanelIndex();
									skeleton.getCollectionAt(currStep).fetch({
										lang: widget.lang,
										locale: widget.locale,
										sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
										entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
										reset: true,
										data: {
											maxAge: 0,
											lang: widget.lang.replace(/^zh$/,'zh_CN')
										}
									});
								},
								function(message) {
									Mask.unmask(widget.body);
									DMSWidgets.createAlertBox(message).inject(skeleton.container);
								});
							}).bind(this))

						}
					});
				}
				typeCmds.push({
					text: myNls.get('CpToClipTypeInfoPopup'),
					icon: 'fonticon fonticon-clipboard-add',
					handler: function(view) {
						var value = view.model.get("id");
						var input = UWA.createElement('input', {
							'value': value
						});
						document.body.appendChild(input);
						input.select();
						document.execCommand("copy");
						document.body.removeChild(input);
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 2000
						}).inject(this.elements.actionsSection);
						alert.add({
							className: 'primary',
							message: myNls.get('InternalNameCopied')
						});
					}
				});
				return typeCmds;
			},
			events: {
				onFacetSelect: function(facetName) {
					var myModel = this.model;
					this.options.skeleton.facetName = facetName;
					UWA.log("MyModel onFacetSelect :" + myModel);
				},
				onFacetUnselect: function(facetName) {
					var myModel = this.model;
					UWA.log("MyModel onFacetSelect :" + myModel);
				},
				onRouteChange: function(ee) {
					UWA.log("MyModel onRouteChange :" + ee);
				},
				onRender: function() {
					// style on the icon
					let pSkeleton = this.options.skeleton;
					let thumbnail = this.container.getElement(".thumbnail");
					thumbnail.setStyle("background-size", "auto");
					thumbnail.setStyle("background-position", "center");
					thumbnail.setStyle("background-color", "#f4f5f6");

					var tt = dicoHandler.getParentTypeMap(this.model.get("id"), this.model.getNature());
					if (tt.length > 0) {
						for (let item of document.getElementsByClassName('lineageDiv')) {
							item.destroy();
						}
						var lineageDiv = UWA.createElement('div', {
							'class': 'lineageDiv'
						});
						tt.reverse().forEach(function(item) {
							var spanText = UWA.createElement('span', {
								'class': "text-primary",
								"text": widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(item.Name, item.Nature) : dicoHandler.getDisplayName(item.Name),
								"id": item.Name
							});
							// Only custo type are cliclable
							if (item.Name != item.FirstOOTB) {
								spanText.setStyle("cursor", "pointer");
							}
							var curTypeName = spanText.id;
							spanText.onclick = function() {
								if (curTypeName != pSkeleton.getActiveIdCard().model.id) {
									Object.keys(pSkeleton.getViewAt(1).contentsViews.tile.nestedView.children).forEach(function(cur) {
										var curTypeId = pSkeleton.getViewAt(1).contentsViews.tile.nestedView.children[cur].model.id;
										var model = pSkeleton.getViewAt(1).contentsViews.tile.nestedView.children[cur].model;
										if (curTypeName == curTypeId) {
											var nestedView = pSkeleton.getViewAt(1).contentsViews.tile.nestedView;
											nestedView.dispatchEvent("onItemViewClick", [model], nestedView);
										}
									});
								}
							};
							var spanChevron = UWA.createElement('span', {
								'class': "fonticon fonticon-double-chevron-right "
							});
							spanText.inject(lineageDiv);
							spanChevron.inject(lineageDiv);
						});
						lineageDiv.lastElementChild.remove();
						var container = this.container.getElement(".info-section");
						lineageDiv.inject(container);
					}
					if (!dicoHandler.isAuthoring) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "badge-error";
						var text = myNls.get('InProductionStatus');
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text: text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					} else if (this.model.get('DMSStatus') != undefined) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "";
						var text = "";
						if (this.model.get('DMSStatus') === "PROD") {
							className = "badge-error";
							text = myNls.get('InProductionStatus');
						} else if (this.model.get('DMSStatus') === "DEV" || this.model.get('DMSStatus') === "DMSExported") {
							className = "badge-warning";
							text = myNls.get('ExportedStatus');
						}
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text: text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					}
				}
			},
			//Extra facets for the BusinessRulesDetails, but should it be removed ?
			facets: function() {
				var facets = [];
				//IR-852064-3DEXPERIENCER2021x/22x S63 5/11/2021 Now we do not display extension and attribute s group tab in case of extension sub type
					facets.push({
						text: myNls.get('AttrOfTypeTab'),
						icon: 'attributes-persistent',
						name: 'hjhjh',
						handler: Skeleton.getRendererHandler('Typeattributes')
					});
					//FUN124741 S63 3/6/2022 we need extension and attribute's group tab in case of Relationship
					if(this.get('nature')==="Type" || this.get('nature')==="Relationship") {
						facets.push({
							text: myNls.get('GpOfAttrOfTypeTab'),
							icon: 'deployment-extension',
							name: 'process',
							handler: Skeleton.getRendererHandler('attributesGroup')
						});
						facets.push({
							text: myNls.get('ExtOfTypeTab'),
							icon: 'package-extension',
							name: 'extension',
							handler: Skeleton.getRendererHandler('Extensions')
						});
					}
					facets.push({
						text: myNls.get('SubTypeTab'),
						icon: 'symboltype',
						name: 'subType',
						// handler: Skeleton.getRendererHandler('types'),
						handler: Skeleton.getRendererHandler('SubTypes')
					});
				return facets;
			}
		}
	}
});

define('DS/DBSApp/Utils/Renderers/ExtOfTypeRenderer', [
	'DS/W3DXComponents/Skeleton',
	'DS/W3DXComponents/Collections/ActionsCollection',
	'DS/UIKIT/Alert',
	'DS/UIKIT/Mask',
	'DS/DBSApp/Utils/dictionaryJSONHandler',
	'DS/DBSApp/Views/CustomModal',
	'DS/DBSApp/Views/CustomSetView',
	'DS/DBSApp/Views/CustomTilesView',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
], function(Skeleton, ActionsCollection, Alert, Mask, dicoHandler, CustomModal, CustoSetView, CustoTilesView, myNls) {
	"use strict";

	return {
		collection: 'DS/DBSApp/Collections/TypeCollection', 
		view: CustoSetView, 
		collectionOptions: function(model) {
			var options = {
				tool: 'extension'
			};
			if(model.get('nature')==='Type') {
				options.typeScope = model.get('id');
			}
			if(model.get('nature')==='Interface' && model.get('interface')==='custoExt') {
				options.parent = model.get('id');
			}
			return options;
		},
		fetchOptions: function(model) {
			return {
				lang: widget.lang,
				locale: widget.locale,
				sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
				entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName'
			};
		},
		viewOptions: {
			contents: {
				useInfiniteScroll: false,
				usePullToRefresh: false,
				views: [{
					'id': 'tile',
					'title': "ExtensionList",
					'className': 'tileView',
					'view': CustoTilesView
				}]
			},
			actions: {
				collection: function() {
					var acts = [];
					var isOOTB = dicoHandler.isOOTBAggregator(this.model.get('id'), this.model.get('nature'));
					if (dicoHandler.isAuthoring && !isOOTB) {
						if (this.model.get('nature')=='menu') {
							acts.push({
								id: 'newExt',
								name: 'newExt',
								title: myNls.get('createExtensions'),
								icon: 'plus myPlusBtnExt',
								overflow: false
							});
						} 
						if(this.model.get('nature')==='Type') {
							acts.push({
								id: 'addScope',
								name: 'addScope',
								title: myNls.get('addExtToType'),
								icon: 'plus myPlusBtnExt',
								overflow: false
							});
						}
						if(this.model.get('nature')==='Interface' && this.model.get('interface')==='custoExt') {
							acts.push({
								id: 'addSub',
								name: 'addSub',
								title: myNls.get('subCustoExtFormName'),
								icon: 'plus myPlusBtnExt',
								overflow: false
							});
						}
					}
					return new ActionsCollection(acts);
				},
				actionClicks: {
					"addSub": function(model, actionModel) {
						var skeleton = this.options.skeleton;
						require(['DS/DBSApp/Views/CustoExtForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(CustoExtForm, DMSWebService){
							var formBuild = CustoExtForm.build({
								modeEdit: 'AddSub',
								model: model,
								dicoHandler: dicoHandler,
								entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
								entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
								wsAggregatorWs: function(request) {
									DMSWebService.aggregatorCreate(request, 'Interface', 
										function successCase(response) {
											modal.destroy();
											var currStep = skeleton.getCurrentPanelIndex();
											skeleton.getCollectionAt(currStep - 1).fetch({
												lang: widget.lang,
												locale: widget.locale,
												sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												reset: true,
												data:{
													maxAge:0,
													lang: widget.lang.replace(/^zh$/,'zh_CN')
												},
												onComplete: function(collection, response, options) {
													var modModel = collection.get(request['Name']);
													var nestedView = skeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
													nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
													skeleton.getCollectionAt(currStep).fetch({
														lang: widget.lang,
														locale: widget.locale,
														sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
														entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
														reset: true,
														data:{
															maxAge:0,
															lang: widget.lang.replace(/^zh$/,'zh_CN')
														}
													});
												}
											});
										},
										function failureCase(resp) {
											modal.injectAlert(resp);
										}
									);
								}
							});
							var modal = new CustomModal(formBuild, skeleton.container, myNls.get("subCustoExtFormName")).build();	
						}).bind(this))
					},
					"newExt": function(model, actionModel) {
						var skeleton = this.options.skeleton;
						require(['DS/DBSApp/Views/CustoExtForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(CustoExtForm, DMSWebService){
							var formBuild = CustoExtForm.build({
								modeEdit: 'New',
								dicoHandler: dicoHandler,
								entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
								entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
								wsAggregatorWs: function(request) {
									DMSWebService.aggregatorCreate(request, 'Interface', 
										function successCase(resp) {
											modal.destroy();
											var currStep = skeleton.getCurrentPanelIndex();
											if(skeleton.currentRouteSteps[currStep-1].get('renderer')==="Extensions")
												currStep = currStep-1;
											skeleton.getCollectionAt(currStep).fetch({
												lang: widget.lang,
												locale: widget.locale,
												sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												reset: true,
												data:{
													maxAge:0,
													lang: widget.lang.replace(/^zh$/,'zh_CN')
												},
												onComplete: function(collection, response, options) {
													var modModel = collection.get(request['Name']);
													var nestedView = skeleton.getViewAt(currStep).contentsViews.tile.nestedView;
													nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
												}
											});
										},
										function failureCase(resp) {
											modal.injectAlert(resp);
										}
									);
								}
							});
							var modal = new CustomModal(formBuild, skeleton.container, myNls.get("custoExtFormName")).build();
						}).bind(this))
					},
					"addScope": function(model, actionModel){
						var skeleton = this.options.skeleton;
						if(model.get('CustomerExtensible')=="Yes") {
							require(['DS/DBSApp/Views/CustoExtForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(CustoExtForm, DMSWebService){
								var formBuild = CustoExtForm.build({
									modeEdit: "AddScopeFromType",
									model: model,
									dicoHandler: dicoHandler,
									entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
									entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
									wsAggregatorWs: function(request) {
										DMSWebService.aggregatorCreate(request, 'Interface', 
											function successCase(resp) {
												modal.destroy();
												var currStep = skeleton.getCurrentPanelIndex();
												skeleton.getCollectionAt(currStep - 1).fetch({
													lang: widget.lang,
													locale: widget.locale,
													sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													reset: true,
													data:{
														maxAge:0,
														lang: widget.lang.replace(/^zh$/,'zh_CN')
													},
													onComplete: function(collection, response, options) {
														var modModel = collection.get(request['Name']);
														var nestedView = skeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
														nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
														skeleton.getCollectionAt(currStep).fetch({
															lang: widget.lang,
															locale: widget.locale,
															sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															reset: true,
															data:{
																maxAge:0,
																lang: widget.lang.replace(/^zh$/,'zh_CN')
															}
														});
													}
												});
											},
											function failureCase(resp) {
												modal.injectAlert(resp);
											}
										);
									}
								});
								var modal = new CustomModal(formBuild, skeleton.container, myNls.get("custoExtScopeFormName")).build();
							}).bind(this))
						} else {
							var alert = new Alert({
								visible: true,
								autoHide: true,
								hideDelay: 3000
							}).inject(this.container,'top');
							alert.add({
								className: 'warning',
								message: model.get('title')+" "+myNls.get('notExtensible')
							});
						}
					}
				},
				filters: [
					{
						text: myNls.get("Extensions"),
						className: "header"
					}, {
						id: "ConcreteTypeFilterButton",
						fonticon: "object-class-concrete-add",
						text: myNls.get("ConcreteTypeFilter"),
						filter: function(model) {
							return model.get('isAbstract') != "Yes";
						}
					}, {
						id: "AbstractTypeFilterButton",
						fonticon: "object-class-abstract",
						text: myNls.get("AbstractTypeFilter"),
						filter: function(model) {
							return model.get('isAbstract') == "Yes";
						}
					}, {
						id: "AllTypeFilterButton",
						text: myNls.get("AllTypeFilter")
					}
				],
				sorters: [
					{
						id:"sortExtName",
						text: myNls.get('sortExtByName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'title',
						titleAsc: 'asc',
						titleDesc: 'desc'
					},
					{
						id:"sortExtParentName",
						text: myNls.get('sortExtByParentName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'subtitle',
						titleAsc: 'asc',
						titleDesc: 'desc'
					},
					{
						id:"sortExtScopeName",
						text: myNls.get('sortExtByScopeName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'content',
						titleAsc: 'asc',
						titleDesc: 'desc'
					}
				]
			},
			events: {
				onRenderSwitcherView: function(view) {
					// To hide the view switcher Icon
					view.container.hide();
					// To hide the "|" and the dot icon.
					var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
					if (actionsDiv != undefined && actionsDiv.length > 0) {
						actionsDiv[0].className = "set-actions";
					}
					var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
					if (actionInlineDot != undefined && actionInlineDot.length > 0) {
						actionInlineDot[0].hide();
					}
				}
			}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				ownerName: 'subtitle',
				description: 'content'
			},
			thumbnail: function() {
				return {
					squareFormat: true,
					url: this.get('image')
				};
			},
			facets: function(pSkeleton) {
				return [
					{
						text: myNls.get('AttrOfTypeTab'),
						icon: 'attributes-persistent',
						name: 'facetattrenderer-s63',
						handler: Skeleton.getRendererHandler('Typeattributes')
					},
					{	// LMT7 IR-877758-3DEXPERIENCER2022x 10/11/21 Modify the ScopesTypeTab
						text: myNls.get('ScopesTypeTab'),
						icon: 'split-3',
						name: 'facetScopesRenderer',
						handler: Skeleton.getRendererHandler('types')
					},
					{
						text: myNls.get('SubExtensions'),
						icon: 'package-extension',
						name: 'facetSubExtRenderer',
						handler: Skeleton.getRendererHandler('Extensions')
					}
				];
			},
			actions: function(skeleton) {
				var lActs = [];
				if(dicoHandler.isAuthoring) {
					lActs.push({
						text: myNls.get("editExtension"),
						icon: 'pencil',
						handler: function(view) {
							require(['DS/DBSApp/Views/CustoExtForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(CustoExtForm, DMSWebServices){
								var currIndex = skeleton.getCurrentPanelIndex();
								var formBuild = CustoExtForm.build({
									modeEdit: 'Edit',
									model: skeleton.getModelAt(currIndex),
									dicoHandler: dicoHandler,
									entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
									entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
									wsAggregatorWs: function(request) {
										DMSWebServices.aggregatorModify(request, 'Interface', 
											function successCase(response) {
												modal.destroy();
												var currStep = skeleton.getCurrentPanelIndex();
												if(skeleton.currentRouteSteps[currStep-1].get('renderer')==="Extensions")
													currStep = currStep-1;
												skeleton.getCollectionAt(currStep).fetch({
													lang: widget.lang,
													locale: widget.locale,
													sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													reset: true,
													data:{
														maxAge:0,
														lang: widget.lang.replace(/^zh$/,'zh_CN')
													},
													onComplete: function(collection, response, options) {
														var modModel = collection.get(request['Name']);
														var nestedView = skeleton.getViewAt(currStep).contentsViews.tile.nestedView;
														nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
													}
												});
											},
											function failureCase(resp) {
												modal.injectAlert(resp);
											}
										);
									}
								});
								var modal = new CustomModal(formBuild,skeleton.container,myNls.get("editExtension")).build();
							}).bind(this))
						}
					});
				}
				if(!dicoHandler.hadChildren(this.get('id'),this.get('nature'))) {
					lActs.push({
						text: myNls.get("deleteExtension"),
						icon: 'fonticon fonticon-trash myTrashBtnExt',
						handler: function(view) {
							var model = this.model;
							Mask.mask(widget.body)

							require(['DS/DBSApp/Utils/DMSWebServices', 'DS/UIKIT/Alert'], (function(DMSWebServices, Alert){
								DMSWebServices.aggregatorDelete({
									"Name": model.get('id'),
									"Nature": model.get('nature'),
									"Package": model.get('Package'),
								},
								model.get('nature'),
								function(resp){
									Mask.unmask(widget.body);
									skeleton.slideBack();
									var currStep = skeleton.getCurrentPanelIndex();
									skeleton.getCollectionAt(currStep).fetch({
										lang: widget.lang,
										locale: widget.locale,
										sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
										entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
										reset: true,
										data:{
											maxAge:0,
											lang: widget.lang.replace(/^zh$/,'zh_CN')
										}
									});
								},
								function(message) {
									Mask.unmask(widget.body);
									var alert = new Alert({
										visible: true,
										autoHide: true,
										hideDelay: 3000
									}).inject(skeleton.container);
									alert.add({
										className: 'error',
										message: message
									});
								});
							}).bind(this))
						}
					});
				} else {
					lActs.push({
						text: myNls.get("noDeleteExtension"),
						icon: 'fonticon fonticon-trash myTrashBtnExt',
						disabled: true,
					});
				}
				//}
				lActs.push({
					text: myNls.get('CpToClipExtensionInfoPopup'),
					icon: 'fonticon fonticon-clipboard-add',
					handler: function(view) {
						var value = view.model._attributes.id;
						var input = UWA.createElement('input', {
							'value': value
						});
						document.body.appendChild(input);
						input.select();
						document.execCommand("copy");
						document.body.removeChild(input);
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 2000
						}).inject(this.elements.actionsSection,'top');
						alert.add({
							className: 'primary',
							message: myNls.get('InternalNameCopied')
						});
					}
				});
				return lActs;
			},
			events: {
				onFacetSelect: function(facetName) {
					var myModel = this.model;
					var pSkeleton = this.options.skeleton;
					pSkeleton.facetName = facetName;
					UWA.log("MyModel onFacetSelect :" + myModel);
				},
				onRender: function() {
					// style on the icon
					var pSkeleton = this.options.skeleton;
					let thumbnail = this.container.getElement(".thumbnail");
					thumbnail.setStyle("background-size", "auto");
					thumbnail.setStyle("background-position", "center");
					thumbnail.setStyle("background-color", "#f4f5f6");

					var lineageDiv = UWA.createElement('div', {
						'class': 'lineageDiv'
					});
					if(this.model.get('parent')!="" && pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.visibleItems.length>1) {
						var tt = dicoHandler.getParentTypeMap(this.model.id,this.model._attributes.nature);
						if (tt.length > 0) {
							tt.reverse().forEach(function(item) {
								var spanText = UWA.createElement('span', {
									'class': "text-primary",
									"text": widget.getValue("DisplayOption") === "NLSOption"? dicoHandler.getNLSName(item.Name,item.Nature) : dicoHandler.getDisplayName(item.Name),
											"id":item.Name
								});
								// Only custo type are cliclable
								if (pSkeleton.getModelAt(pSkeleton.getCurrentPanelIndex()).get('id') != item['Name']) {
									spanText.setStyle("cursor", "pointer");
								}
								var curTypeName = spanText.id;
								spanText.onclick = function() {
									if (curTypeName != pSkeleton.getActiveIdCard().model.id) {
										Object.keys(pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.children).forEach(function(cur) {
											var curTypeId = pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.children[cur].model.id;
											if (curTypeName == curTypeId) {
												pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.unSelectAll();
												pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.children[cur].select();
												var selected = pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).container.getElement(".selected");
												pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).scrollView.scrollToElement(".selected");
											}
										});
									}
								}
								var spanChevron = UWA.createElement('span', {
									'class': "fonticon fonticon-double-chevron-right "
								});
								spanText.inject(lineageDiv);
								spanChevron.inject(lineageDiv);
							})
							lineageDiv.lastElementChild.remove();
						}
					} else {
						UWA.createElement('span', {
							'class': "text-primary",
							"text": " ",
						}).inject(lineageDiv);
					}
					var container = this.container.getElement(".detailed-info-section");
					if(container.getChildren().length>1){
						//var scopes = container.getChildren()[1];
						//container.getChildren()[1].remove();
						container.getChildren()[0].remove();
						lineageDiv.inject(container,'top');
						//scopes.inject(container);
					}
					if(!dicoHandler.isAuthoring) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "badge-error";
						var text = myNls.get('InProductionStatus');
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text : text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					} else if (this.model.get('DMSStatus')!=undefined) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "";
						var text = "";
						if (this.model.get('DMSStatus') === "PROD") {
							className = "badge-error";
							text = myNls.get('InProductionStatus');
						} else if (this.model.get('DMSStatus') === "DEV" || this.model.get('DMSStatus') === "DMSExported") {
							className = "badge-warning";
							text = myNls.get('ExportedStatus');
						}
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text: text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					}
				}
			}
		},
	};

  });

define('DS/DBSApp/Utils/Renderers/SubExtensionsRenderer',
[
	'DS/W3DXComponents/Collections/ActionsCollection',
	'DS/DBSApp/Views/CustomSetView',
	'DS/DBSApp/Views/CustomTilesView',
	'DS/DBSApp/Views/CustomModal',
	'DS/DBSApp/Utils/dictionaryJSONHandler',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
],
function(ActionsCollection, SetView, TilesView, CustomModal, dicoHandler, myNls) {
	"use strict";

	return {
		collection:  'DS/DBSApp/Collections/TypeCollection',
		view: SetView, 
		collectionOptions: function(model) {
			var options = {
				tool: 'extension'
			};
			if(model.get('nature')==='Interface' && model.get('interface')==='custoExt') {
				options.parent = model.get('id');
			}
			return options;
		},
		fetchOptions: function(model) {
			return {
				lang: widget.lang,
				locale: widget.locale,
				sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
				entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName'
			};
		},
		viewOptions: {
			contents: {
				useInfiniteScroll: false,
				usePullToRefresh: false,
				views: [{
					'id': 'tile',
					'title': "AttributeList",
					'className': "table",
					'view': TilesView
				}],
				headers: [{
					'label': "Name",
					'property': 'id'
				}],
			},
			actions: {
				collection: function() {
					var acts = [];
					if (dicoHandler.isAuthoring) {
						acts.push({
							id: 'addType',
							title: myNls.get('NewTypePopup'),
							icon: 'fonticon fonticon-plus',
							overflow: false
						});
					}
					return new ActionsCollection(acts);
				},
				actionClicks: {
					"addType": function(model) {
						var skeleton = this.options.skeleton;
						if(model.get('nature')==='Type') {
							require(['DS/DBSApp/Views/CustoExtForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(InterfaceForm, DMSWebService) {
								var formBuild = new InterfaceForm("AddSub", model).build({
									dicoHandler: dicoHandler,
									entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
									entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
									wsAggregatorWs: function(request) {
										DMSWebService.aggregatorCreate(request, 'Interface', 
											function successCase(resp) {
												modal.destroy();
												var currStep = skeleton.getCurrentPanelIndex();
												skeleton.getCollectionAt(currStep - 1).fetch({
													lang: widget.lang,
													locale: widget.locale,
													sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													reset: true,
													data:{
														maxAge:0,
														lang: widget.lang.replace(/^zh$/,'zh_CN')
													},
													onComplete: function(collection, response, options) {
														var modModel = collection.get(request['Name']);
														var nestedView = skeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
														nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
														skeleton.getCollectionAt(currStep).fetch({
															lang: widget.lang,
															locale: widget.locale,
															sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															reset: true,
															data:{
																maxAge:0,
																lang: widget.lang.replace(/^zh$/,'zh_CN')
															}
														});
													}
												});
											},
											function failureCase(resp) {
												modal.injectAlert(resp);
											}
										);
									}
								});
								var modal = new CustomModal(formBuild, this.options.skeleton.container, "edition d'extension(NLS)").build();
							}).bind(this))
						}
					}
				},
				filters: [
					{
						text: myNls.get("TypeFilterHeader"),
						className: "header"
					},
					{
						id: "ConcreteTypeFilterButton",
						text: myNls.get("ConcreteTypeFilter"),
						fonticon: "object-class-concrete-add",
						filter: function(model) {
							return model.get('isAbstract') != "Yes";
						}
					},
					{
						id: "AbstractTypeFilterButton",
						text: myNls.get("AbstractTypeFilter"),
						fonticon: "object-class-abstract",
						filter: function(model) {
							return model.get('isAbstract') != "Yes";
						}
					},
					{
						id: "AllTypeFilterButton",
						text: myNls.get("AllTypeFilter")
					}
				],
				sorters: [
					{
						id:"sortExtName",
						text: myNls.get('sortExtByName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'title',
						titleAsc: 'asc',
						titleDesc: 'desc'
					},
					{
						id:"sortExtParentName",
						text: myNls.get('sortExtByParentName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'subtitle',
						titleAsc: 'asc',
						titleDesc: 'desc'
					},
				]
			},
			events: {
				onRenderSwitcherView: function(view) {
					// To hide the view switcher Icon
					view.container.hide();
					// To hide the "|" and the dot icon.
					var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
					if (actionsDiv != undefined && actionsDiv.length > 0) {
						actionsDiv[0].className = "set-actions";
					}
					var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
					if (actionInlineDot != undefined && actionInlineDot.length > 0) {
						actionInlineDot[0].hide();
					}
				}
			}
		}
	};

});

define('DS/DBSApp/Utils/Renderers/SubTypesRenderer',
	[
		'DS/W3DXComponents/Skeleton',
		'DS/W3DXComponents/Collections/ActionsCollection',
		'DS/DBSApp/Views/CustomSetView',
		'DS/DBSApp/Views/CustomTilesView',
		'DS/DBSApp/Views/CustomModal',
		'DS/DBSApp/Utils/dictionaryJSONHandler',
		'i18n!DS/DBSApp/assets/nls/DMSAppNLS',
	],
	function(Skeleton, ActionsCollection, SetView, TilesView, CustomModal, dicoHandler, myNls) {
		"use strict";
		var Typeattributes = {
			collection: 'DS/DBSApp/Collections/TypeCollection',
			collectionOptions: function(model) {
				var options = {
					tool: 'type'
				}
				/* Toutes ces options ne servent à rien en fait?!
				if(model.get('nature')==='Type') {
					options.tool = "Types"
					options.parentName = model.get('parent');
				}
				if(model.get('nature')==='Interface' && model.get('interface')==='custoExt') {
					options.parentName = model.get('parent');
					options.tool = "Interfaces";
				}
				options.typeName = model.get('id');
				options.typeAttributes = model.get('attributes');
				options.nature = model.get('nature');
				//*/
				options.parent = model.get('id');
				return options;
			},
			fetchOptions: function(model) {
				return {
					lang: widget.lang,
					locale: widget.locale,
					sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
					entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName'
				};
			},
			view: SetView, 
			viewOptions: {
				contents: {
					useInfiniteScroll: false,
					usePullToRefresh: false,
					views: [{
						'id': 'tile',
						'title': "AttributeList",
						'className': "table",
						'view': TilesView
					}],
					headers: [{
						'label': "Name",
						'property': 'id'
					}],

				},
				actions: {
					collection: function() {
						var acts = [];
						var isOOTB = dicoHandler.isOOTBAggregator(this.model.get('id'), this.model.get('nature'));
						if (dicoHandler.isAuthoring && !isOOTB) {
							acts.push({
								id: "createSubTypeFromSubTypeView",
								title: myNls.get("createSubTypeToolTip"),
								icon: 'plus',
								overflow: false,
								relatedView: this
							});
						}
						return new ActionsCollection(acts);
					},
					actionClicks: {
						'createSubTypeFromSubTypeView': function(model) {
							var skeleton = this.options.skeleton;
							require(['DS/DBSApp/Views/TypeForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(TypeForm, DMSWebService) {
								var myTypeForm = TypeForm.buildForSubType({
									isInstField: widget.getValue("instField") == "show",
									modeSubType: true,
									model: model,
									dicoHandler: dicoHandler,
									wsAggregatorWs: function(request) {
										DMSWebService.aggregatorCreate(request, request['Nature'], 
											function successCase(response) {
												modal.destroy();
												var curPanel = skeleton.getCurrentPanelIndex();
												skeleton.getCollectionAt(curPanel - 1).fetch({
													lang: widget.lang,
													locale: widget.locale,
													sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													reset: true,
													data: {
														maxAge: 0,
														lang: widget.lang.replace(/^zh$/,'zh_CN')
													},
													onComplete: function(collection, response, options) {
														skeleton.getCollectionAt(curPanel).fetch({
															lang: widget.lang,
															locale: widget.locale,
															sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
															reset: true
														});
													}
												});
											},
											function failureCase(resp) {
												modal.injectAlert(resp);
											}
										);
									}
								});
								var modal = new CustomModal(myTypeForm, skeleton.container, myNls.get('NewTypePopup')).build();
							}).bind(this))
						}
					}
				},
				events: {
					onRenderSwitcherView: function(view) {
						// To hide the view switcher Icon
						view.container.hide();
						// To hide the "|" and the dot icon.
						var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
						if (actionsDiv != undefined && actionsDiv.length > 0) {
							actionsDiv[0].className = "set-actions";
						}
						var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
						if (actionInlineDot != undefined && actionInlineDot.length > 0) {
							actionInlineDot[0].hide();
						}
					}
				}
			},
			idCardOptions: {
				attributesMapping: {
					title: 'title',
					ownerName: 'subtitle',
					description: 'content'
				},
				facets: [
					{
						text: 'Attributes',
						icon: 'doc-text',
						name: 'hjhjh',
						handler: Skeleton.getRendererHandler('Typeattributes')
					},
					{
						text: 'Group of Attributes',
						icon: 'doc-text',
						name: 'process',
						handler: Skeleton.getRendererHandler('attributesGroup')
					},
					{
						text: 'Extensions',
						icon: 'doc-text',
						name: 'extension',
						handler: Skeleton.getRendererHandler('Extensions')
					},
					{
						text: 'Sub Type(s)',
						icon: 'doc-text',
						name: 'subType',
						handler: Skeleton.getRendererHandler('SubTypes')
					}
				]
			}

		};
		return Typeattributes;
	});

define('DS/DBSApp/Utils/Renderers/AttrGroupRenderer',
[
	'DS/W3DXComponents/Skeleton',
	'DS/W3DXComponents/Collections/ActionsCollection',
	'DS/UIKIT/Alert',
	'DS/UIKIT/Mask',
	'DS/DBSApp/Views/CustomModal',
	'DS/DBSApp/Views/CustomSetView',
	'DS/DBSApp/Views/CustomTilesView',
	'DS/DBSApp/Utils/dictionaryJSONHandler',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
],
function(Skeleton, ActionsCollection, Alert, Mask, CustomModal, CustSetView, CustoTilesView, dicoHandler, myNls) {
	"use strict";

	var attributesGroup = {
		collection: 'DS/DBSApp/Collections/TypeCollection', 
		collectionOptions: function(model) {
			return {
				tool: 'attGrp',
				typeScope: model.get('nature')=='menu' ? null : model.get('id')
			};
		},
		fetchOptions: function(model) {
			return {
				lang: widget.lang,
				locale: widget.locale,
				sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
				entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName'
			};
		},
		view: CustSetView,
		viewOptions: {
			contents: {
				useInfiniteScroll: false,
				usePullToRefresh: false,
				views: [{
					'id':'tile',
					'title': 'grpAttTest',
					'className': 'tileView',
					'view': CustoTilesView
				}]
			},
			actions: {
				collection: function() {
					var acts = []
					var isOOTB = dicoHandler.isOOTBAggregator(this.model.get('id'), this.model.get('nature'));
					if (dicoHandler.isAuthoring && !isOOTB) {
						if (this.model.get('nature')=='menu') {
							acts.push({
								title: myNls.get('newAttGrpTitle'),
								icon: 'plus myPlusBtnAttGrp',
								id: 'addAttGrp',
								overflow: false
							});
						} 
						if (this.model.get('nature')==='Type') {
							acts.push({
								title: myNls.get('newAttGrpTitle'),
								icon: 'plus myPlusBtnAttGrp',
								id: 'newAttGrp',
								name: 'newAttGrp',
								overflow: false
							});
						}
					}
					return new ActionsCollection(acts);
				},
				actionClicks: {
					'addAttGrp': function(model) {
						var skeleton = this.options.skeleton;
						require(['DS/DBSApp/Views/InterfaceForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(InterfaceForm, DMSWebServices) {
							var formBuild = InterfaceForm.build({
								modeEdit: 'New',
								dicoHandler: dicoHandler,
								entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
								entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
								wsAggregatorWs: function(request, onSuccess, onFailure) {
									DMSWebServices.aggregatorCreate(request, 'Interface',
										function successCase(resp) {
											modal.destroy();
											var interface_name = request['Name'];
											var currStep = skeleton.getCurrentPanelIndex();
								
											if(skeleton.currentRouteSteps[currStep-1].get('renderer')==="attributesGroup")
												currStep = currStep-1;
								
											skeleton.getCollectionAt(currStep).fetch({
												lang: widget.lang,
												locale: widget.locale,
												sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												reset: true,
												data:{
													maxAge:0,
													lang: widget.lang.replace(/^zh$/,'zh_CN')
												},
												onComplete: function(collection, response) {
													var modModel = collection.get(interface_name);
													var nestedView = skeleton.getViewAt(currStep).contentsViews.tile.nestedView;
													nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
												}
											});
										},
										function failureCase(resp) {
											modal.injectAlert(resp);
										}
									)
								}
							});
							var modal = new CustomModal(formBuild,skeleton.container,myNls.get("newAttGrp")).build();
						}).bind(this)) 
					},
					'newAttGrp': function(model) {
						var skeleton = this.options.skeleton;
						if(model.get('DeploymentExtensible')== "Yes") {
							require(['DS/DBSApp/Views/InterfaceForm', 'DS/DBSApp/Utils/DMSWebServices'],(function(InterfaceForm, DMSWebServices) {
								var formBuild = InterfaceForm.build({
									modeEdit: 'AddTo',
									model: model,
									dicoHandler: dicoHandler,
									entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
									entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
									wsAggregatorWs: function(request, onSuccess, onFailure) {
										DMSWebServices.aggregatorCreate(request, 'Interface',
											function successCase(resp) {
												modal.destroy();
												var interface_name = request['Name'];
												var currStep = skeleton.getCurrentPanelIndex();
												
												//IR-817326-3DEXPERIENCER2021x S63 we are now check the case where we have an extension open but in the list of extending interfaces
												if(skeleton.currentRouteSteps[currStep].get('renderer')!="attributesGroup") {
													currStep--;
												}
									
												skeleton.getCollectionAt(currStep).fetch({
													lang: widget.lang,
													locale: widget.locale,
													sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
													reset: true,
													data:{
														maxAge:0,
														lang: widget.lang.replace(/^zh$/,'zh_CN')
													},
													onComplete: function(collection, response) {
														var modModel = collection.get(interface_name);
														var nestedView = skeleton.getViewAt(currStep).contentsViews.tile.nestedView;
														nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
													},
												});
											},
											function failureCase() {
												modal.injectAlert(resp);
											}
										)
									}
								});
								var modal = new CustomModal(formBuild,skeleton.container,myNls.get("newAttGrp")).build();
							}).bind(this)) 
						} else {
							var alert = new Alert({
								visible: true,
								autoHide: true,
								hideDelay: 3000
							}).inject(this.container,'top');
							alert.add({
								className: 'warning',
								message: model.get('title')+" "+myNls.get('notExtensible')
							});
						}
					}
				},
				sorters: [
					{
						id: "sortByName",
						text: myNls.get('SortTypeByName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'title',
						titleAsc: 'asc',
						titleDesc: 'desc'
					},
				]
			},
			events: {
				onRenderSwitcherView: function(view) {
					// To hide the view switcher Icon
					view.container.hide();
					// To hide the "|" and the dot icon.
					var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
					if (actionsDiv != undefined && actionsDiv.length > 0) {
						actionsDiv[0].className = "set-actions";
					}
					var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
					if (actionInlineDot != undefined && actionInlineDot.length > 0) {
						actionInlineDot[0].hide();
					}
				}
			}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				ownerName: 'subtitle',
				description: 'scopesNls'
			},
			thumbnail: function() {
				return {
					squareFormat: true,
					url: this.get('image')
				};
			},
			//Extra facets for the BusinessRulesDetails, but should it be removed ?
			facets: [
				{
					text: myNls.get('AttrOfTypeTab'),
					icon: 'attributes-persistent',
					name: 'facetattgrprenderer-s63',
					handler: Skeleton.getRendererHandler('Typeattributes')
				},
				{	// LMT7 IR-877758-3DEXPERIENCER2022x 10/11/21 Modify the ScopesTypeTab
					text: myNls.get('ScopesTypeTab'),
					icon: 'split-3',
					name: 'scopesRenderer',
					handler: Skeleton.getRendererHandler('types')
				}
			],
			actions: function(skeleton) {
				var myActions = [];

				myActions.push({
					text: myNls.get('editAttGrp'),
					icon: 'fonticon fonticon-pencil',
					handler: function(view) {
						require(['DS/DBSApp/Views/InterfaceForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(InterfaceForm, DMSWebService) {
							var formBuild = InterfaceForm.build({
								modeEdit: 'Edit',
								model: view.model,
								dicoHandler: dicoHandler,
								entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
								entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
								wsAggregatorWs: function(request, onSuccess, onFailure) {
									DMSWebService.aggregatorModify(request, 'Interface',
										function successCase(resp) {
											modal.destroy();

											var interface_name = request['Name'];
											var currStep = skeleton.getCurrentPanelIndex();
											skeleton.getCollectionAt(currStep - 1).fetch({
												lang: widget.lang,
												locale: widget.locale,
												sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												reset: true,
												data:{
													maxAge:0,
													lang: widget.lang.replace(/^zh$/,'zh_CN')
												},
												onComplete: function(collection, response) {
													var modModel = collection.get(interface_name);
										
													var nestedView = skeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
													skeleton.getModelAt(currStep).set(modModel._attributes);
													nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
													skeleton.getActiveIdCard().model = modModel;
													skeleton.getActiveIdCard().render();
													skeleton.getCollectionAt(currStep).fetch({
														lang: widget.lang,
														locale: widget.locale,
														sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
														entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
														reset: true,
														data:{
															maxAge:0,
															lang: widget.lang.replace(/^zh$/,'zh_CN')
														}
													});
												}
											});
										},
										function failureCase() {
											modal.injectAlert(resp);
										}
									)
								}
							});
							var modal = new CustomModal(formBuild, skeleton.container, myNls.get("editAttGrp")).build();
						}).bind(this));
					}
				});

				if(!dicoHandler.hadChildren(this.get('id'),this.get('nature'))) {
					myActions.push({
						text: myNls.get('deleteAttGrp'),
						icon: 'fonticon fonticon-trash myTrashBtnAttGrp',
						handler: function(view) {
							Mask.mask(widget.body)
							var model = this.model;
							require(['DS/DBSApp/Utils/DMSWebServices', 'DS/UIKIT/Alert' ], (function(DMSWebServices, Alert) {
								DMSWebServices.aggregatorDelete(
									{
										"Name": model.get('id'),
										"Nature": model.get('nature'),
										"Package": model.get('Package'),
									},
									this.model.get('nature'),
									function(resp) {
										Mask.unmask(widget.body);
										skeleton.slideBack();
										var currStep = skeleton.getCurrentPanelIndex();
										skeleton.getCollectionAt(currStep).fetch({
											lang: widget.lang,
											locale: widget.locale,
											sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
											entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
											reset: true,
											data:{
												maxAge:0,
												lang: widget.lang.replace(/^zh$/,'zh_CN')
											}
										});
									},
									function(message) {
										Mask.unmask(widget.body);
										var alert = new Alert({
											visible: true,
											autoHide: true,
											hideDelay: 2000
										}).inject(skeleton.container);
										alert.add({
											className: 'error',
											message: message
										});
									}
								);
							}).bind(this)) 
						}
					});
				} else {
					myActions.push({
						text: "cannot remove extension because there are children(s)(NLS)",
						icon: 'fonticon fonticon-trash myTrashBtnAttGrp',
						disable: true,
					});
				}
				//}
				myActions.push({
					text: myNls.get('CpToClipExtensionInfoPopup'),
					icon: 'fonticon fonticon-clipboard-add',
					handler: function(view) {
					var value = view.model._attributes.id;
					var input = UWA.createElement('input', {
						'value': value
					});
					document.body.appendChild(input);
					input.select();
					document.execCommand("copy");
					document.body.removeChild(input);
					var alert = new Alert({
						visible: true,
						autoHide: true,
						hideDelay: 2000
					}).inject(this.elements.actionsSection,'top');
					alert.add({
						className: 'primary',
						message: myNls.get('InternalNameCopied')
					});
					}
				});
				return myActions;
			},
			events: {
				onRender: function() {
					// style on the icon
					let thumbnail = this.container.getElement(".thumbnail");
					thumbnail.setStyle("background-size", "auto");
					thumbnail.setStyle("background-position", "center");
					thumbnail.setStyle("background-color", "#f4f5f6");
					if(!dicoHandler.isAuthoring) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "badge-error";
						var text = myNls.get('InProductionStatus');
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text : text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					} else if(this.model.get('DMSStatus')!=undefined) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "";
						var text = "";
						if (this.model.get('DMSStatus') === "PROD") {
							className = "badge-error";
							text = myNls.get('InProductionStatus');
						} else if (this.model.get('DMSStatus') === "DEV" || this.model.get('DMSStatus') === "DMSExported") {
							className = "badge-warning";
							text = myNls.get('ExportedStatus');
						}
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text: text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					}
				}
			}
		}
	}
	return attributesGroup;
});

define('DS/DBSApp/Utils/Renderers/UniquekeyRenderer', [
	'DS/DBSApp/Utils/dictionaryJSONHandler',
	'DS/W3DXComponents/Skeleton',
	'DS/DBSApp/Views/CustomSetView',
	'DS/DBSApp/Views/CustomTilesView',
	'DS/W3DXComponents/Collections/ActionsCollection',
	'DS/UIKIT/Mask',
	'DS/DBSApp/Views/CustomModal',
	'DS/DBSApp/Utils/DMSWebServices',
	'DS/UIKIT/Alert',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
], function(dicoHandler, Skeleton, CustoSetView, CustoTilesView, ActionsCollection, Mask, CustomModal, webService, Alert, myNls) {
	"use strict";


	var types = {
		collection: 'DS/DBSApp/Collections/UniquekeyCollection',
		view: CustoSetView, // 'DS/W3DXComponents/Views/Item/SetView',
		viewOptions: {
			contents: {
				useInfiniteScroll: false,
				usePullToRefresh: false,
				views: [{
					'id': 'tile',
					'title': 'Unique Key',
					'className': 'tileView',
					'view': CustoTilesView
				}]
			},
			actions: {
				collection: function() {
					var acts = [];
					if (dicoHandler.isAuthoring) {
						acts.push({
							id: 'addUniqueKey',
							title: myNls.get('NewUniquekeyPopup'),
							icon: 'fonticon fonticon-plus',
							overflow: false
						});
					}
					return new ActionsCollection(acts);
				},
				actionClicks: {
					"addUniqueKey": function(model) {
						var skeleton = this.options.skeleton;
						require(['DS/DBSApp/Views/UniquekeyForm', 'DS/DBSApp/Utils/DMSWebServices'], (function(UniquekeyForm, DMSWebServices) {
							var myUniqueKeyForm = UniquekeyForm.buildForNew({
								dicoHandler: dicoHandler,
								entitle: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName.bind(dicoHandler) : dicoHandler.getDisplayName.bind(dicoHandler),
								entitleSub: widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName.bind(dicoHandler) : dicoHandler.getNLSName.bind(dicoHandler),
								wsAggregatorWs: function(request) {
									DMSWebServices.aggregatorCreate(request, request['Nature'], 
										function successCase(resp) {
											modal.destroy();
											skeleton.getCollectionAt(1).fetch({
												lang: widget.lang,
												locale: widget.locale,
												sorter: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												entitle: widget.getValue("DisplayOption")==='NLSOption' ? 'getNLSName' : 'getDisplayName',
												reset: true,
												data: {
													maxAge: 0,
													lang: widget.lang.replace(/^zh$/,'zh_CN')
												},
												onComplete: function(collection, response, options) {
													console.log(collection);
													var modelOfCreatedType = skeleton.getCollectionAt(1).findWhere({
													id: request.Name
													});
													var newTypeElem = skeleton.getViewAt(1).contentsViews.tile.nestedView.getChildView(modelOfCreatedType);
													newTypeElem.select();
												}
											});
										}, 
										function failureCase(resp) {
											if(resp.contains("Unable to activate the created UniqueKey")){
												modal.injectAlert(myNls.errMsgCreateUKEnableIssue);
											} else {
												modal.injectAlert(resp);
											}
										});
								}
							});
							var modal = new CustomModal(myUniqueKeyForm, this.options.skeleton.container, myNls.get("NewUKFormHeader")).build();
						}).bind(this))
					}
				},
				filters: [
					{
						id: "AllTypeFilterButton",
						text: myNls.get("ResetFilter"),
						fonticon: "reset",
						selectable: true
					},
					{
						className: "divider"
					},
					{
						id: "ConcreteTypeFilterButton",
						text: myNls.get("ConcreteTypeFilter"),
						selectable: true,
						filter: function(model) {
							return !model.isAbstract();
						}
					},
					{
						id: "AbstractTypeFilterButton",
						text: myNls.get("AbstractTypeFilter"),
						selectable: true,
						filter: function(model) {
							return model.isAbstract();
						}
					}
				],
				sorters: [
					{
						id: "sortByName",
						text: myNls.get('SortTypeByName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'title',
						titleAsc: 'asc',
						titleDesc: 'desc'
					},
					{
						id: "sortByParentName",
						text: myNls.get('SortTypeByParentName'),
						icon: "fonticon fonticon-sort-alpha-asc",
						sorter: 'subtitle',
						titleAsc: 'asc',
						titleDesc: 'desc'
					}
				]
			},
			events: {
				onRenderSwitcherView: function(view) {
					// To hide the view switcher Icon
					view.container.hide();
					// To hide the "|" and the dot icon.
					var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
					if (actionsDiv != undefined && actionsDiv.length > 0) {
						actionsDiv[0].className = "set-actions";
					}
					var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
					if (actionInlineDot != undefined && actionInlineDot.length > 0) {
						actionInlineDot[0].hide();
					}
				}
			}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				ownerName: 'externalTypeName',
				description: 'externalInterfaceName'
			},
			thumbnail: function() {
				//const typeMap = dicoHandler.getParentTypeMap(this.get("id"), this.get('nature'));
				let img = this.get('image');
				/*	for (let i = 0; i < typeMap.length; i++) {
						if (typeMap[i].IconLarge != undefined) {
							img = "data:image/png;base64," + typeMap[i].IconLarge;
							break;
						}
					}*/
				return {
					squareFormat: true,
					url: img
				};
			},
			actions: function(pSkeleton) {
				var typeCmds = [];
				typeCmds.push({
					text: myNls.get('DeleteUKPopup'),
					icon: 'fonticon fonticon-trash ',
					handler: function(view) {
						console.log("DeleteAggregator webservice call");
						Mask.mask(widget.body)
						webService.aggregatorDelete({
								"Name": this.model.get('id'),
								"Nature": this.model.get('nature'),
								"Package": this.model.get('Package'),
							}, this.model.get('nature'), function(resp) {
								console.log(resp);
								Mask.unmask(widget.body);
								pSkeleton.slideBack();
								var currStep = pSkeleton.getCurrentPanelIndex();
								pSkeleton.getCollectionAt(currStep).setup();
								pSkeleton.getCollectionAt(currStep).fetch({
									data: {
										maxAge: 0
									}
								});
							},
							function(message) {
								console.log(message);
								Mask.unmask(widget.body);
								var alert = new Alert({
									visible: true,
									autoHide: true,
									hideDelay: 2000
								}).inject(pSkeleton.container);
								alert.add({
									className: 'error',
									message: message
								});

							});
					}
				});
				return typeCmds;
			},
			events:{
				onRender: function(){
					// style on the icon
					let thumbnail = this.container.getElement(".thumbnail");
					thumbnail.setStyle("background-size", "auto");
					thumbnail.setStyle("background-position", "center");
					thumbnail.setStyle("background-color", "#f4f5f6");
				}
			},
			facets: [
				{
					text: myNls.get('AttrOfTypeTab'),
					icon: 'attributes-persistent',
					name: 'hjhjh',
					handler: Skeleton.getRendererHandler('Typeattributes')
				}
			]
		}

	};

	return types;
});

define('DS/DBSApp/DMSSkeleton',
	[
		'UWA/Core',
		'DS/W3DXComponents/Skeleton',
		'DS/W3DXComponents/IdCard',
		'DS/DBSApp/Utils/Renderers/RootRenderer',
		'DS/DBSApp/Utils/Renderers/AttrGroupRenderer',
		'DS/DBSApp/Utils/Renderers/TypeRenderer',
		'DS/DBSApp/Utils/Renderers/AttrOfTypeRenderer',
		'DS/DBSApp/Utils/Renderers/ExtOfTypeRenderer',
		'DS/DBSApp/Utils/Renderers/AttrDisplayRenderer',
		'DS/DBSApp/Utils/Renderers/SubTypesRenderer',
		'DS/DBSApp/Utils/Renderers/SubExtensionsRenderer',
		'DS/DBSApp/Utils/Renderers/ToolsRenderer',
		'DS/DBSApp/Utils/Renderers/UniquekeyRenderer'
	],
function(UWA, Skeleton, IdCard,
	RootRenderer, AttributesGroupRenderer, TypesRenderer, TypeAttributesRenderer, ExtOfTypeRenderer,
	AttrDisplayRenderer, SubTypesRenderer, SubExtensionsRenderer,ToolsRenderer, UniquekeyRenderer) 
{
	UWA.log("DMSApp::buildSkeleton")

	var DMSIdCard = IdCard.extend({
		_createTitleSection: function() {
			return {
				'class': 'title-section',
				'html': {
					'tag': 'h1',
					'style': 'white-space: nowrap;',
					'html': [
						{
							'tag': 'span',
							'html': this._config.get('title')
						},
						{
							'tag': 'span',
							'class': 'counter-field'
						}
					]
				}
			};
		},
		updateTitleCount: function(count) {
			titleSection = this.getElement('.counter-field'),
			titleSection.innerText = !count ? ('') : (' | ' + count);
		}
	})

	var DMSSkeleton = Skeleton.extend({
		setup: function (... args) {
			var self = this;
			this._parent.call(this, args)
		},
		createCollectionView: function (CollectionView, options) {
			return new CollectionView(UWA.extend(options, {
				skeleton: this
			}));
		},
		createDetailView: function (DetailView, options) {
			return new DetailView(UWA.extend(options, {
				skeleton: this
			}));
		},
		createIdCard: function (node, element, stepIndex, steps, idCardOptions) {
			var that = this,
				options = UWA.clone(idCardOptions, false) || {},
				actions = options.actions,
				facets = options.facets,
				tempHandler;
			
			options.model = node.get('assignedModel');
			options.skeleton = this;
			options.selectedFacet = null; // We set to null because we don't want the facet to be rendered before the sliding is done

			// We create wrapppers for actions and facet handlers so that we can add extra arguments
			if (Array.isArray(actions)) { // Wrap handlers
				options.actions = that.wrapActions(actions, node, stepIndex);
			} else if (UWA.is(actions, 'function')) { // Wrap whole function
				tempHandler = UWA.clone(options.actions);
				options.actions = that.wrapActionFunction(tempHandler, node, stepIndex);
			}

			if (Array.isArray(facets)) { // Same treatment for facets
				options.facets = that.wrapFacets(facets, {
					node: node,
					placeHolder : element,
					stepIndex: stepIndex,
					steps: steps
				});
			} else if (UWA.is(facets, 'function')) {
				tempHandler = UWA.clone(options.facets);
				options.facets = that.wrapFacetFunction(tempHandler, {
					node: node,
					placeHolder : element,
					stepIndex: stepIndex,
					steps: steps
				});
			}
			return new DMSIdCard(options);
		},
		wrapFacetFunction: function (handler, config) {
			var that = this,
				conf = config,
				node = conf.node;
			return function (... args) {
				var model = node.get('assignedModel'),
					facets = model._facets || handler.apply(model, [that].concat(args)), // Bypass: If the handler has already been called we don't call it again
					wrappedFacets;
				if (facets && Array.isArray(facets)) {
					wrappedFacets = that.wrapFacets(facets, conf);
				}
				return wrappedFacets;
			};
		},
		wrapActionFunction: function (actionHandler, node, index) {
			var that = this,
				handler = actionHandler,
				ind = index;

			return function (... args) {
				var actions = handler.apply(node.get('assignedModel'), [that].concat(args)), // Call handler with model as context
					wrappedActions;
				if (actions && Array.isArray(actions)) {
					wrappedActions = that.wrapActions(actions, node, ind);
				}
				return wrappedActions;
			};
		},
		initCollectionViewEvents: function (list) {
			var self = this;
			this._parent.call(this, list);
			var collectionEvents = {
				"onAdd": function(model, collection, options) {
					self.getActiveIdCard().updateTitleCount(collection.length);
				},
				"onRemove": function(model, collection, options) {
					self.getActiveIdCard().updateTitleCount(collection.length);
				},
				"onReset": function(model, collection, options) {
					self.getActiveIdCard().updateTitleCount(collection.length);
				}
			};
			this.listenTo(list, {
				"onSearch": function(event) {
					self.getActiveIdCard().updateTitleCount(event.number);
				},
				"onRender": function(event) {
					self.getActiveIdCard().updateTitleCount(list.collection.length);
				},
				"onFacetSelect": function(... args) {
					self.getActiveIdCard().updateTitleCount(list.collection.length);
					self.listenTo(list.collection, collectionEvents);
				},
				"onFacetUnselect": function(... args) {
					self.stopListening(list.collection, collectionEvents);
				}
			});
		},
		renderFacet: function (... args) {
			return Skeleton.prototype.renderFacet.apply(this, args);
		},
		onItemViewSelect: function (... args) {
			return Skeleton.prototype.onItemViewSelect.apply(this, args);
		},
		mergeRoutes: function (newRouteSteps, oldRouteSteps, options) {
			return Skeleton.prototype.mergeRoutes.call(this, newRouteSteps, oldRouteSteps, options);
		},
		stringifySteps: function(steps, options) {
			var path = Skeleton.prototype.stringifySteps.call(this, steps, options);
			// Redirect sub type menu
			var matchSubType = path.match(/\/toolsMenu\/1\/types\/.*\/SubTypes\/([^/]+)(\/\?.*)$/)
			if(matchSubType) path = "/toolsMenu/1/types/" + matchSubType[1] + (matchSubType[2] || '');
			// Redirect sub extension menu
			var matchSubExtension = path.match(/\/toolsMenu\/3\/Extensions\/.*\/Extensions\/([^/]+)(\/\?.*)$/)
			if(matchSubExtension) path = "/toolsMenu/3/Extensions/" + matchSubExtension[1] + (matchSubExtension[2] || '');
			// Redirect attrgroup scope
			// var matchAttrScope = path.match(/\/toolsMenu\/2\/attributesGroup\/.*\/types\/([^/]+)(\/\?.*)$/);
			// if(matchAttrScope) path = "/toolsMenu/1/types/" + matchAttrScope[1] + "/Typeattributes/";
			// Redirect extension scope
			// var matchExtScope = path.match(/\/toolsMenu\/3\/Extensions\/.*\/types\/([^/]+)(\/\?.*)$/);
			// if(matchExtScope) path = "/toolsMenu/1/types/" + matchExtScope[1] + "/Typeattributes/";
			return path;
		}
	})


	pSkeleton = new DMSSkeleton({
		menu: {},
		toolsMenu: RootRenderer,
		attributesGroup: AttributesGroupRenderer,
		types: TypesRenderer,
		Typeattributes: TypeAttributesRenderer,
		AttrDisplay: AttrDisplayRenderer,
		Extensions: ExtOfTypeRenderer,
		SubTypes: SubTypesRenderer,
		SubExt: SubExtensionsRenderer,
		tools: ToolsRenderer,
		uniquekey: UniquekeyRenderer
	}, {
		// Renderer that is going to be used for the Root (panel 0), if not specified the first declared renderer is used
		root: 'toolsMenu',
		//startRoute is used to define the route when launching the widget. In our case, we want to be in the global view at the beginning.
		startRoute: '/toolsMenu/1/types',
		useRootChannelView: false,
		// Extra Skeleton event callbacks
		events: {
			//Fired when an item is selected (or swipe was made)
			onItemSelect: function(item) {
				//These 2 lines are used to help debug the code. It is not really essential
				UWA.log("DMSApp::onItemSelect");
				UWA.log(item);
			},
			onItemViewSelect: function(item) {
				UWA.log('DMSApp::OnItemViewSelect');
				UWA.log(item);
			},
			onRenderSwitcherView: function(view) {
				UWA.log("DMSApp::onRenderSwitcher");
				console.log(view);
			},
			onRender: function(view) {
				UWA.log("DMSApp::onRender");
				console.log(view);
			},
			//Fired when route changes
			onRouteChange: function() {
				UWA.log("DMSApp::onRouteChange");
				UWA.log(this.getRoute());
				if (this.getCurrentPanelIndex() > 1) {
					this.getActiveIdCard().selectFacet(pSkeleton.facetName);
				}
			},
			onPositionChange: function() {
				console.log("DMSApp::onPositionChange");
			},
			onFacetSelect: function() {
				console.log("DMSApp::onFacetSelect");
			},
			onSlide: function(view) {
				UWA.log("DMSApp::onSlide");
			}
		}
	});
	return pSkeleton;
})

 /**
	* Form to	create a Specialization type, Deployment extension, Specialization extension type
	* and Customer extension type
	*/

define('DS/DBSApp/Views/TypeForm', [
	'UWA/Core',
	'DS/DBSApp/DMSSkeleton',
	'DS/UIKIT/Form',
	'DS/UIKIT/Input/Text',
	'DS/UIKIT/Input/Toggle',
	'DS/UIKIT/Input/Button',
	'DS/UIKIT/Input/ButtonGroup',
	'DS/UIKIT/Alert',
	'DS/DBSApp/Utils/UuidHandler', 
	'DS/DBSApp/Views/Layouts/Widgets',
	'i18n!DS/DBSApp/assets/nls/DMSAppNLS'
], function(UWA,pSkeleton, Form, Text, Toggle, Button, ButtonGroup, Alert, UuidHandler, DMSWidgets, myNls) {
	"use strict";

	var TypeForm = {
		TYPE_NAME_FIELD_ID: "type_name",
		INSTANCE_NAME_FIELD_ID: "instance_name",
		TYPE_ICON_FIELD_ID: "type_icon",
		PARENT_NAME_FIELD_ID: "parent_type",
		ABSTRACT_FIELD_ID: "abstractOption",
		DESCRIPTION_FIELD_ID: "my_comment",
		NLS_FIELD_ID_PREFIX: "nlsInput_",
		HIDE_INSTANCE_FIELD_EVENT_NAME: "hideInstanceField"
	};

	function getInstListForEditAutoComplete(dicoHandler,aType) {
		var result = [];
		var instanceList = dicoHandler.getInstancesOfType(aType['Name'], aType['Nature']);
		var currentInstances = (aType['CreateInstName']||"").split(';'); 
		if(currentInstances.length==1 && !currentInstances[0]){
			result = instanceList.map(item=>({
					'value': item['Name'],
					'label': dicoHandler.getDisplayName(item.Name) + (item['firstParent'] ? " (" + myNls.get('Inherited') + ")" : ""),
					'subLabel': dicoHandler.getDisplayName(item.Name),
					'selected': item['firstParent']==true,
					'element': item
			}))
		} else {
			result = instanceList.map(item=>({
				'value': item['Name'],
				'label': dicoHandler.getDisplayName(item.Name),
				'subLabel': dicoHandler.getDisplayName(item.Name),
				'element': item,
				'selected': currentInstances.includes(item['Name'])
			}));
		}
		return result;
	}

	function getInstListForAutoComplete(dicoHandler, aType){
		var instanceList = dicoHandler.getInstancesOfType(aType['Name'], aType['Nature']);
		var result = instanceList.map(function(item){
			return {
				'value': item['Name'],
				'label': dicoHandler.getDisplayName(item.Name) + (item['firstParent'] ? " (" + myNls.get('Inherited') + ")" : ""),
				'subLabel': dicoHandler.getDisplayName(item.Name),
				'selected': item['firstParent']==true,
				'element': item
			};
		});
		return result;
	}

	/**
	 * Return an object according to desired mode (New or Edit) required to build Parent Name field in the form
	 * @param {boolean} isEditMode - True if the field should be rendered for edit mode
	 * @param {string} fieldId - ID for the text field (Required in Edit Mode)
	 * @param {string} fieldValue - Value to fild in the text field (Required in Edit Mode)
	 * @return {Object} Object
	 */
	function getParentNameField(isEditMode, fieldId, fieldValue) {
		if (isEditMode) {
			return {
				type: 'text',
				name: TypeForm.PARENT_NAME_FIELD_ID,
				label: myNls.get("typeFormParentFieldLabel"),
				disabled: true,
				value: fieldValue,
				id: fieldId
			};
		} else {
			return {
				type: 'autocomplete',
				name: TypeForm.PARENT_NAME_FIELD_ID,
				label: myNls.get("typeFormParentFieldLabel"),
				required: true,
				allowFreeInput: true,
				showSuggestsOnFocus: true,
				errorText: "SpecialCharacterError ",
				datasets: [{
					items: [],
					configuration: {
						searchEngine: function(dataset, text) {
							text = text.toLowerCase();
							let sug = [];
							dataset.items.forEach(function(item) {
								if (item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text)) {
									sug.push(item);
								}
							});
							return sug;
						}
					}
				}],
				events: {
					onSelect: function(item) {
						this._parent.dispatchEvent(TypeForm.HIDE_INSTANCE_FIELD_EVENT_NAME, item);
					},
					onUnselect: function() {
						this._parent.dispatchEvent(TypeForm.HIDE_INSTANCE_FIELD_EVENT_NAME);
					}
				}
			};
		}
	}

	function getNameField(isEditMode, fieldId, fieldValue) {
		let toRet = {
			type: 'text',
			name: TypeForm.TYPE_NAME_FIELD_ID,
			label: myNls.get("typeFormNameFieldLabel")
		}, delta;
		if (isEditMode) {
			delta = {
				disabled: true,
				value: fieldValue,
				id: fieldId
			};
		} else {
			delta = {
				required: true,
				placeholder: myNls.get("typeFormNameFieldPlaceholder"),
				helperText: myNls.get("typeFormNameFieldHelper"),
				pattern: "^[a-zA-Z0-9]+$"
			};
		}
		UWA.extend(toRet, delta, true);
		return toRet;
	}

	function getInstanceField(isEditMode) {
		let toRet = {
			type: 'autocomplete',
			name: TypeForm.INSTANCE_NAME_FIELD_ID,
			label: myNls.get("typeFormInstanceFieldHeader"),
			required: false,
			allowFreeInput: true,
			showSuggestsOnFocus: true,
			helperText: myNls.get('CreateInstNameHelper'),
			errorText: "SpecialCharacterError ",
			datasets: [{
				items: []
			}]
		};
		if(isEditMode) {
			toRet['disabled']=true;
		}
		return toRet;
	}
	
	
	function getIcons(form, model) {
			let iconChanged = !model;
			let iconObj = {};
			for(let iconName of ['IconLarge', 'IconNormal', 'IconSmall']) {
				let iconValue = form.getField(TypeForm.TYPE_ICON_FIELD_ID + '-' + iconName).value;
				if(iconValue) {
					iconChanged = iconChanged || iconValue !== model.get(iconName);
					iconObj[iconName] = iconValue;
				} 
			}
			return iconChanged ? iconObj : undefined;
	}
	
	function getIconField(values) {
		let div = UWA.createElement('div', {
			'class': 'myTypeIconDiv'
		});
		UWA.createElement('label', {
			'text': myNls.get("typeFormIconFieldLabel"),
			'title': myNls.get("typeFormIconFieldInfo")
		}).inject(div);
		DMSWidgets.createTypeIconField({
			'name': TypeForm.TYPE_ICON_FIELD_ID,
			'class': 'myTypeIconGroup',
			'styles': {
				'margin-top': "3px",
				'margin-bottom': "3px"
			},
			onIconApplied: function(icon, errors) {
				if(errors.length) DMSWidgets.createAlertBox(errors).inject(pSkeleton.container);
			}
		}, values).inject(div);
		UWA.createElement('span', {
			'class': 'form-control-helper-text',
			'text': myNls.get("typeFormIconFieldInfo")
		}).inject(div);
			
		return {
			type: 'html',
			label: "Icon(NLS)",
			required: false,
			html: div
		};
	}
		
	function getNLS(form, model) {
		let nlsObject = {};
		let type_name = form.getField(TypeForm.TYPE_NAME_FIELD_ID).value;
		form.getFields().forEach(function(item) {
			if (item.name.startsWith(TypeForm.NLS_FIELD_ID_PREFIX)) {
				let key = item.name.split('_')[1];
				let nlsValue = item.value;
				if (key === "en" && nlsValue.length === 0) {
					nlsValue = type_name;
				}
				if (nlsValue.length > 0) {
					nlsObject[key] = nlsValue;
				}
			}
		});
		let nlsFieldChanged = !model || !UWA.equals(nlsObject, model._attributes.NameNLS);
		return nlsFieldChanged ? nlsObject : undefined;
	}


	function getNLSField(aEditMode, aNlsObj) {
		return {
			type: "html",
			'class': 'form-group',
			name: "abstract02",
			//label: "Abstract(NLS)",
			//value: "False",
			html: new function() {
				let div = UWA.createElement('div', {
					'class': 'myNLSDiv'
				});
				let label = UWA.createElement('label', {
					'text': myNls.get("typeFormNLsFieldLabel")
				});
				let labelHelp = UWA.createElement('i', {
					'text': myNls.get("typeFormNLsFieldHelp")
				});
				let buttonGp = new ButtonGroup({
					type: 'radio',
					// LMT7 IR-867366-3DEXPERIENCER2022x : 05/11/21 Add the NLS of short languages
					buttons: [
						new Button({
							// value: 'EN',
							value: myNls.get("shortEnglishNLS"),
							active: true
						}),
						new Button({
							// value: 'FR'
							value: myNls.get("shortFrenchNLS")
						}),
						new Button({
							// value: 'DE'
							value: myNls.get("shortGermanNLS")
						}),
						new Button({
							// value: 'JA'
							value: myNls.get("shortJapaneseNLS")
						}),
						new Button({
							// value: 'KO'
							value: myNls.get("shortKoreanNLS")
						}),
						new Button({
							// value: 'RU'
							value: myNls.get("shortRussianNLS")
						}),
						new Button({
							// value: 'ZH'
							value: myNls.get("shortChineseNLS")
						})
					],
					events: {
						onClick: function (e, button) {
							let nodeList = e.currentTarget.getParent().getElementsByTagName('input');
							Object.keys(nodeList).forEach(function (t) {
								if (nodeList.item(t).id.contains(button.getValue().toLowerCase())) {
									nodeList.item(t).show();
								} else {
									nodeList.item(t).hide();
								}
								//console.log(e.currentTarget.getParent().getElementsByTagName('input').item(tt).id);
							});
						}
					}
				});
				buttonGp.buttons.forEach(function(item) {
					if (navigator.language.toLocaleLowerCase().contains(item.getValue().toLocaleLowerCase())) {
						item.setActive(true);
					} else {
						item.setActive(false);
					}
				});


				//var inputTa = buildInputNLS("ta", "Entrez ici votre traduction ...", navigator.language.toLocaleLowerCase());
				label.inject(div);
				labelHelp.inject(div);
				buttonGp.inject(div);
				var inputLangTab = ["en", "fr", "de", "ja", "ko", "ru", "zh"];

				var placeholderValue = myNls.get("typeFormNLsFieldPlaceholder");
				var navLangCode = navigator.language.toLocaleLowerCase();
				inputLangTab.forEach(function(code) {
					var hide = true;
					if (navLangCode.contains(code)) {
						hide = false;
					}
					var input = new Text({
						id: TypeForm.NLS_FIELD_ID_PREFIX + code,
						name: TypeForm.NLS_FIELD_ID_PREFIX + code,
						placeholder: placeholderValue
					});
					if (aEditMode) {
						if (aNlsObj !== undefined && aNlsObj.hasOwnProperty(code)) {
							input.setValue(aNlsObj[code]);
						}
					}
					if (hide) {
						input.hide();
					}
					input.inject(div);
				});
				return div;
			}
		};

	}

	function getAbstractField(aDisable, aChecked) {
		return {
			type: "html",
			'class': 'form-group',
			name: "abstract",
			label: "Abstract",
			value: "False",
			html: new function() {

				let label = UWA.createElement('label', {
					'text': myNls.get("typeFormAbstractFieldLabel")
				});
				let labelHelp = UWA.createElement('i', {
					'text': myNls.get("typeFormAbstractFieldDescrip")
				});
				let toggle = new Toggle({
					type: 'switch',
					name: TypeForm.ABSTRACT_FIELD_ID,
					value: 'option1',
					disabled: aDisable,
					label: myNls.get("typeFormAbstractFieldOption")
				}); //.check()
				if (aChecked) {
					toggle.check();
				}
				let div = UWA.createElement('div', {
					'class': 'myAbstractOptDiv'
				});
				label.inject(div);
				labelHelp.inject(div);
				toggle.inject(div);
				return div;
			}
		};
	}


	function getFormObject(aFields) {
		return new Form({
			grid: '4 8',
			// Fields
			fields: aFields
		});
	}

	/**
	 * Test if the value contains only alphanumeric characters
	 * @param {string} valueToTest
	 * @returns {boolean} True if it's contains only alphanumeric characters,otherwise false
	 */
	function isAlphaNumericCharacters(valueToTest) {
		let regexAlphaNumeric = new RegExp("^[a-zA-Z0-9]+$");
		return regexAlphaNumeric.test(valueToTest);
	}

	function createErrorSpan(elementId, errMsg) {
		let spanErrorName = UWA.createElement('span', {
			id: elementId
		});
		// LMT7 IR-867366-3DEXPERIENCER2022x : 09/11/21
		spanErrorName.appendText(errMsg);
		spanErrorName.setStyle('font-style', 'italic');
		spanErrorName.setStyle('color', '#EA4F37');
		return spanErrorName;
	}

	function retrieveErrorMsgForNameField(container) {
		let spanId = "NameWarning";
		let errMsgForAlphaNumeric = myNls.get("AlphaNumericWarning");
		let spanErrorName = document.getElementById(spanId);
		if (spanErrorName === null) {
			spanErrorName = createErrorSpan(spanId, errMsgForAlphaNumeric);
			spanErrorName.inject(container);
		}
		return spanErrorName;
	}

	/**
	 * Manage the onInput event for the Name input field, create span next to field header
	 * to warn the user if the input contains not alphanumeric characters.
	 */
	function nameFieldOnInput() {
		let parent = this.getParent();
		let spanErrorName = retrieveErrorMsgForNameField(parent.firstChild);
		let isAlphaNumericVal = isAlphaNumericCharacters(this.value);
		spanErrorName.hidden = !(!isAlphaNumericVal && this.value.length > 0);
	}

	Object.assign(TypeForm, {
		buildForNew: function(options) {
			var dicoHandler = options.dicoHandler;
			var isInstField = options.isInstField;
			var model = options.model;
			var modeSubType = options.modeSubType;
			var wsAggregatorWs = options.wsAggregatorWs;

			var typeTitle = options.typeTitle || function(item) {
				return widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(item.Name, item.Nature) : dicoHandler.getDisplayName(item.Name);
			};
			var typeSubTitle = options.typeSubTitle || function(item) {
				return widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName(item.Name) : dicoHandler.getNLSName(item.Name, item.Nature);
			};

			var fields = [];
			fields.push(getParentNameField(false, "", ""));
			// Instance Field
			if (isInstField) {
				fields.push(getInstanceField());
			}
			// Name Field
			fields.push(getNameField(false, "", ""));
			// Icon Field
			fields.push(getIconField());
			// NLS Translation Field
			fields.push(getNLSField(false));
			// Abstract with select(true/false)
			fields.push(getAbstractField(false, false));
			
			var _theTypeForm = getFormObject(fields);

			var parentNameAuto = _theTypeForm.getAutocompleteInput(TypeForm.PARENT_NAME_FIELD_ID);
			if (parentNameAuto) {
				// ! Important : this field need to dispatch an event to the Form.
				parentNameAuto._parent = _theTypeForm;
				parentNameAuto.elements.input.onchange = function() {
					if (parentNameAuto.selectedItems.length === 0 || parentNameAuto.selectedItems[0].label !== this.value) {
						parentNameAuto.reset();
					}
				};
				// Fill the autocomplete
				dicoHandler.init(dicoHandler.startupDicoCUSTO, dicoHandler.startupDicoOOTB);
				dicoHandler.getAllSpecializableAggregator().forEach(function(item) {
					parentNameAuto.addItems({
						'value': item.Name,
						'label': typeTitle(item),
						'subLabel': typeSubTitle(item),
						'element': item
					}, parentNameAuto.datasets[0]);
				});
			}
			
			
			var inputName = _theTypeForm.getField(TypeForm.TYPE_NAME_FIELD_ID);
			// Control the input of the type name field
			inputName.addEventListener("input", nameFieldOnInput);

			_theTypeForm.addEvent(TypeForm.HIDE_INSTANCE_FIELD_EVENT_NAME, function(item) {
				var field = _theTypeForm.getField(TypeForm.INSTANCE_NAME_FIELD_ID);
				if (field !== undefined) {
					var inst_AutoComplete = _theTypeForm.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
					//S63 FUN124741 Attention si on ne clean pas le dataSet on se retrouve avec des doublons, pire on peut avoir une instance selectionné alors que le champs a disparu
					inst_AutoComplete.cleanDataset(inst_AutoComplete.datasets[0]['id']);
					if (item !== undefined && item.element.Nature === "Type") {

						dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
						var accessCreateInstField = dicoHandler.accessCreateInstField(item.element.Name);
						field.getParent().getParent().getParent().hidden = !accessCreateInstField;
						if (accessCreateInstField) {
							inst_AutoComplete.addItems(getInstListForAutoComplete(dicoHandler, item.element), inst_AutoComplete.datasets[0]);
						}
					} else {
						field.getParent().getParent().getParent().hidden = true;
					}
				}
			});
			// Display of Instance
			var field = _theTypeForm.getField(TypeForm.INSTANCE_NAME_FIELD_ID);
			if (field) {
				field.getParent().getParent().getParent().hidden = true;

				if (modeSubType && model && model.get('nature') === "Type" && dicoHandler.accessCreateInstField(model.get('id'))) {
					field.getParent().getParent().getParent().hidden = false;
					var inst_AutoComplete = _theTypeForm.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
					var parent_type = dicoHandler.getAgregatorByNameAndNature(model.id, model.get('nature'));
					var instList = getInstListForEditAutoComplete(dicoHandler, parent_type)
					inst_AutoComplete.addItems(instList, inst_AutoComplete.datasets[0]);
				}
			}
			// Submit Function : Called when the user click on Save Button.
			_theTypeForm.setOptions( {
				events: {
					onSubmit: function() {
						dicoHandler.init(dicoHandler.startupDicoCUSTO, dicoHandler.startupDicoOOTB);
						// Parent
						var parentTypeAutoComplete = this.getAutocompleteInput(TypeForm.PARENT_NAME_FIELD_ID);
						var _parent = parentTypeAutoComplete.selectedItems[0].element;
						// BMN2 IR-852068 : 26/05/2021 now isIRPC function will work also for newable interface like "Robot".
						var isIRPC =  dicoHandler.isIRPC(_parent.Name, _parent.Nature);
						var newUuid = UuidHandler.create_UUID() // Generate Name with Uuid
						var typeName = this.getField(TypeForm.TYPE_NAME_FIELD_ID).value + dicoHandler.charFlag + newUuid.getUuidWithoutSeparator();

						// Icon Name
						var iconObj = getIcons(this);
						
						// NLS Translations
						var nlsObj = getNLS(this);

						var typeToCreate = {
							"Name": typeName,
							"Nature": _parent.Nature,
							"Parent": _parent.Name,
							"FirstOOTB": _parent.FirstOOTB,
							"Package": dicoHandler.getPackageNameToCreate(isIRPC, false), // Compute the package name, if the element to create is IRPC or ER
							"Abstract": this.getField(TypeForm.ABSTRACT_FIELD_ID).checked ? "Yes" : "No",
							"CustomerExposition": "Programmer",
							"Specializable": "Yes",
							"Specialization": "Yes",
							"CustomerExtensible": (_parent.Nature!="Type" && _parent.Nature!="Relationship") || dicoHandler.isTypeCustomerExtensible(_parent) ? "Yes" : "No",
							"DeploymentExtensible": (_parent.Nature!="Type" || _parent.Nature!="Relationship") || dicoHandler.isTypeDeploymentExtensible(_parent) ? "Yes" : "No",
							"Description": "", //this.getField(TypeForm.DESCRIPTION_FIELD_ID).value;
							"NameNLS": nlsObj,
							"IconLarge": (iconObj || {}).IconLarge,
							"IconNormal": (iconObj || {}).IconNormal,
							"IconSmall": (iconObj || {}).IconSmall,
							"IconName": Object.values(iconObj || {}).some(item=>!!item) ? typeName : undefined,
						};

						if (_parent.Nature == "Type") { //S63 FUN124741 un type doit pouvoir avoir plusieurs instances
							var instances = ((this.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID) || {}).selectedItems || [])
								.filter(item=>item.element)
								.map(item=>item.element['Name'])
							// S63 l'utilisation de l'instance du parent doit être représenté par l'absence du champs
							if(instances.length) typeToCreate["CreateInstName"] = instances.join(";")
						}
						if (_parent.Nature == "Interface") {
							delete typeToCreate.CustomerExtensible;
							typeToCreate["Deployment"] = "No";
							typeToCreate["Customer"] = "No";
						}
						Object.keys(typeToCreate).forEach((item, i) => {
							if (typeToCreate[item] == undefined) {
								delete typeToCreate[item];
							}
						});

						// Step 3 : Call of the webservice
						wsAggregatorWs(typeToCreate);
						if(this._parent) this._parent.destroy();
					}
				}
			});
			_theTypeForm.myValidate = function() {
				var txtName = this.getTextInput(TypeForm.TYPE_NAME_FIELD_ID).getValue();
				var regEx = new RegExp("^[0-9]|_");
				// BMN2 10/09/2021 : IR-860013-3DEXPERIENCER2022x
				// Add check for newable interfaces like Robot.
				if (txtName.startsWith("XP") || regEx.test(txtName) || dicoHandler.isNameExisting(txtName, "Types") || dicoHandler.isNameExisting(txtName, "Relationships") || dicoHandler.isNameExisting(txtName, "Interfaces")) {
					this.getField(TypeForm.TYPE_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
					this.dispatchEvent('onInvalid');
					var alert = new Alert({
						visible: true,
						autoHide: true,
						hideDelay: 2000
					}).inject(this.elements.container);
					alert.add({
						className: 'error',
						message: myNls.get('popUpNameError')
					});
					return false;
				}
				return this.validate();
			};
			return _theTypeForm;
		},

		buildForEdit: function(options) {
			options = options || {};
			var dicoHandler = options.dicoHandler;
			var model = options.model || this.model;
			var isInstField = options.isInstField;
			var wsAggregatorWs = options.wsAggregatorWs
			var fields = [];
			// Parent Name : Edit Mode
			fields.push(getParentNameField(true, model.get('parent'), model.get('subtitle')));
			// Instance Field
			if (isInstField) {
			fields.push(getInstanceField(true));
			}
			// Type Name
			fields.push(getNameField(true, model.get('id'), model.get('title')));
			var type_name = model.get('title');
			// Icon Field
			fields.push(getIconField({
				IconLarge: model.get("IconLarge"),
				IconNormal: model.get("IconNormal"),
				IconSmall: model.get("IconSmall")
			}));
			// NLS Fields
			fields.push(getNLSField(true, model._attributes["NameNLS"]));
			// Abstract
			var abstractValue = model._attributes["isAbstract"] === "Yes";
			fields.push(getAbstractField(true, abstractValue));
			var _theTypeForm = getFormObject(fields);
			// Display of Instance
			var field = _theTypeForm.getField(TypeForm.INSTANCE_NAME_FIELD_ID);
			if (field !== undefined) {
				field.getParent().getParent().getParent().hidden = true;
				if (model && model.get('nature') === "Type" && dicoHandler.accessCreateInstField(model.get('id'))) {
					var inst_AutoComplete = _theTypeForm.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
					var parent_type = dicoHandler.getAgregatorByNameAndNature(model.id, model.get('nature'));
					var instList = getInstListForEditAutoComplete(dicoHandler, parent_type)
					inst_AutoComplete.addItems(instList, inst_AutoComplete.datasets[0]);
					field.getParent().getParent().getParent().hidden = false;
				}
			}
			// Submit Function : Called when the user click on Save Button
			_theTypeForm.setOptions({
				events: {
					onSubmit: function() {
						dicoHandler.init(dicoHandler.startupDicoCUSTO, dicoHandler.startupDicoOOTB);
						// Instance Name
						//S63 FUN124741 On devra peut être pouvoir modifier les instances
						//var instAutoComplete = this.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
						var selectedInstances = [];//Pour le moment on n'autorise pas l'edit = instAutoComplete.selectedItems;
			
						// Icon Name
						var iconObj = getIcons(this, this.model);
			
						// NLS Translations
						var nlsObj = getNLS(this, this.model);
						
						// BMN2 29/01/2021 : We will only call the webserice if we detect any changes
						if (iconObj || nlsObj || selectedInstances.length) {
							// BMN2 28/01/2021 : IR-815220-3DEXPERIENCER2021x
							// We only send modified and mandatory properties. Otherwise we remove all others properties.
							var typeToModify = {
								'Name': this.model.get('id'),
								'Nature': this.model.get('nature'), // Type
								'Package': this.model.get('Package'),
								'DMSStatus': this.model.get('DMSStatus'),
								'NameNLS': nlsObj || this.model.get('NameNLS'),
								'IconName': this.model.get('IconName') || this.model.get('id'),
								'IconLarge':  (iconObj || {}).IconLarge  || this.model.get('IconLarge'),
								'IconNormal': (iconObj || {}).IconNormal || this.model.get('IconNormal'),
								'IconSmall':  (iconObj || {}).IconSmall  || this.model.get('IconSmall')
							}

							//S63 FUN124741 un type devra peut être pouvoir avoir plusieurs instances
							var instanceList = 	selectedInstances.filter(item=>!!item['element']).map(item=>item['element']['Name'])
							if(instanceList.length!==0) {
								result['CreateInstName'] = instanceList.join(";");
							}
							
							// Step 2 : build the object to send
							console.log(typeToModify);
							wsAggregatorWs(typeToModify);
							if(this._parent) this._parent.destroy();
						}
					}
				}
			});

			_theTypeForm.model = model;
			_theTypeForm.myValidate = function() {
				// Icon Name
				var iconObj = getIcons(_theTypeForm, _theTypeForm.model);
				// NLS Fields
				var nlsObject = getNLS(_theTypeForm, _theTypeForm.model);
				// We will validate the form only if we detect at least one change,
				// so we avoid to call the submit function unnecessarily.
				return (iconObj || nlsObject);
			};
			return _theTypeForm;
		},
		buildForSubType: function(options) {
			options = options || {};
			var model = options.model || this.model;
			var dicoHandler = options.dicoHandler;
			var isInstField = options.isInstField;
			var wsAggregatorWs = options.wsAggregatorWs;

			var fields = [];
			// Parent Name : Sub Type Mode
			fields.push(getParentNameField(true, model.get('id'), model.get('title')));
			if (isInstField) {
				// Instance Field
				fields.push(getInstanceField());
			}
			// Name Field
			fields.push(getNameField(false, "", ""));
			// Icon Field
			fields.push(getIconField());
			// NLS Translation Field
			fields.push(getNLSField(false));
			// Abstract with select(true/false)
			fields.push(getAbstractField(false, false));
			var _theTypeForm = getFormObject(fields);
			var inputName = _theTypeForm.getField(TypeForm.TYPE_NAME_FIELD_ID);
			// Control the input of the type name field
			inputName.addEventListener("input", nameFieldOnInput);

			// Display of Instance
			var field = _theTypeForm.getField(TypeForm.INSTANCE_NAME_FIELD_ID);
			if (field) {
				field.getParent().getParent().getParent().hidden = true;
				if (model && model.get('nature') === "Type" && dicoHandler.accessCreateInstField(model.get('id'))) {
					var inst_AutoComplete = _theTypeForm.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
					var parent_type = dicoHandler.getAgregatorByNameAndNature(model.id, model.get('nature'));
					var instList = getInstListForAutoComplete(dicoHandler, parent_type);
					if (instList.length > 0) {
						field.getParent().getParent().getParent().hidden = false;
					}
					inst_AutoComplete.addItems(instList, inst_AutoComplete.datasets[0]);
				}
			}
			// Submit Function : Called when the user click on Save Button.
			_theTypeForm.setOptions({
				events: {

					onSubmit: function() {
						dicoHandler.init(dicoHandler.startupDicoCUSTO, dicoHandler.startupDicoOOTB);
						// Parent
						var _parent = dicoHandler.getAgregatorByNameAndNature(model.id, model.get('nature'));

						// Instance Name
						var _instance = (this.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID) || {}).selectedItems || [];
						
						// Compute the package name, if the element to create is IRPC or ER
						// BMN2 IR-852068 : 26/05/2021 now isIRPC function will work also for newable interface like "Robot".
						var isIRPC =  dicoHandler.isIRPC(_parent.Name, _parent.Nature);
						var newUuid = UuidHandler.create_UUID() // Generate Name with Uuid
						var typeName = this.getField(TypeForm.TYPE_NAME_FIELD_ID).value + dicoHandler.charFlag + newUuid.getUuidWithoutSeparator();
						// Icon Name
						var iconObj = getIcons(this, model);
						// NLS Translations
						var nlsObj = getNLS(this, model);

						var typeToCreate = {
							"Name": typeName,
							"Nature": _parent.Nature,
							"Package": dicoHandler.getPackageNameToCreate(isIRPC, false),
							"Parent": _parent.Name,
							"FirstOOTB": _parent.FirstOOTB,
							"Abstract": this.getField(TypeForm.ABSTRACT_FIELD_ID).checked ? "Yes" : "No",
							"CustomerExposition": "Programmer",
							"Specializable": "Yes",
							"Specialization": "Yes",
							"CustomerExtensible": (_parent.Nature!="Type" && _parent.Nature!="Relationship") || dicoHandler.isTypeCustomerExtensible(_parent) ? "Yes" : "No",
							"DeploymentExtensible": (_parent.Nature!="Type" || _parent.Nature!="Relationship") || dicoHandler.isTypeDeploymentExtensible(_parent) ? "Yes" : "No",
							"Description": "", //this.getField(TypeForm.DESCRIPTION_FIELD_ID).value;
							"NameNLS": nlsObj,
							"IconLarge": (iconObj || {}).IconLarge,
							"IconNormal": (iconObj || {}).IconNormal,
							"IconSmall": (iconObj || {}).IconSmall,
							"IconName": Object.values(iconObj || {}).some(item=>!!item) ? typeName : undefined
						}
						
						if (_parent.Nature == "Type") { //S63 FUN124741 un type doit pouvoir avoir plusieurs instances
							var instances = ((this.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID) || {}).selectedItems || [])
								.filter(item=>item.element)
								.map(item=>item.element['Name'])
							// S63 l'utilisation de l'instance du parent doit être représenté par l'absence du champs
							if(instances.length) typeToCreate["CreateInstName"] = instances.join(";")
						}
						if (_parent.Nature == "Interface") {
							delete typeToCreate.CustomerExtensible;
							typeToCreate["Deployment"] = "No";
							typeToCreate["Customer"] = "No";
						}
						Object.keys(typeToCreate).forEach((item, i) => {
							if (typeToCreate[item] == undefined) {
								delete typeToCreate[item];
							}
						});

						wsAggregatorWs(typeToCreate);
						if(this._parent) this._parent.destroy();
					}
				}
			});
			_theTypeForm.model = this.model;
			_theTypeForm.myValidate = function() {
				var txtName = this.getTextInput(TypeForm.TYPE_NAME_FIELD_ID).getValue();
				var regEx = new RegExp("^[0-9]|_");
				// BMN2 10/09/2021 : IR-860013-3DEXPERIENCER2022x
				// Add check for newable interfaces like Robot.
				if (txtName.startsWith("XP") || regEx.test(txtName) || dicoHandler.isNameExisting(txtName, "Types") || dicoHandler.isNameExisting(txtName, "Relationships") || dicoHandler.isNameExisting(txtName, "Interfaces")) {
					this.getField(TypeForm.TYPE_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
					this.dispatchEvent('onInvalid');
					var alert = new Alert({
						visible: true,
						autoHide: true,
						hideDelay: 2000
					}).inject(this.elements.container);
					alert.add({
						className: 'error',
						message: myNls.get('popUpNameError')
					});
					return false;
				}
				return this.validate();
			};
			return _theTypeForm;
		}
	});
	return TypeForm;
});

