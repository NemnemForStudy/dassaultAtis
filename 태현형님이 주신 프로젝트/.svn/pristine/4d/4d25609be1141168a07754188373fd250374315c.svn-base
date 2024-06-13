steal('//../DSCommon/src/search/search.js', '//../DSCommon/src/search/models/searchhelper.js'
).then(function(){
    $(window).one('Ds.CommonSearch.defined',function() { //we have to wait for this to be triggered due to steal timing issues in the production build
        Ds.CommonSearch.extend('Ds.CommonSearchWidget',
        /* @Static */
        {
            //onDocument: true,
            _socket:null
        },
        /* @Prototype */
        {
			_socketName: 'search_socket_' + (new Date()).getTime(),
			_searchOptions: {
    			title: window.Configuration.applicationName || '',
                mode: 'furtive',
                attributeDisplayVals: '',
                attributeTypes: '',
                attributes: '',
                default_with_precond: true,
                precond: '', //'flattenedtaxonomies:types/VPMReference',
                show_precond: false,
                multiSel: false
			},

            init : function(){
                var that = this;
                this.element.ds_common_search();
                if(window.widget && window.widget.addEvent) {
                    window.widget.addEvent('onSearch', function(strSearch) {
                        that.onSearch(strSearch);
                    });

                    $(widget.body).on('dragover', function (ev) {
                        if (window.OpenAjax) {
                            OpenAjax.hub.publish('UnifiedSearch.ResultsDragging.start', { ev: ev });
                        }
                        ev.preventDefault(); //this needs to be called to allow the drop on our widget!
                    });

                    $(widget.body).on('drop', function (ev) {
                        Infra.Model.Search.getUnifiedSearchObjectsFromDrop({ev:ev}, function(resultData) {
                            if (resultData && !$.isEmptyObject(resultData)) {
                                $.each(resultData, function (idx, plmobj) {
                                    plmobj.objectType = plmobj.plmBaseObjectType;
                                    if (window.OpenAjax) {
                                        OpenAjax.hub.publish('UnifiedSearch.Results.drop', { ev: ev, obj: plmobj });
                                    }
                                    return;
                                });
                            }
                        });
                    });

                    if (!Ds.CommonSearchWidget._socket && !window.widget.getBool('useLegacySearch')) {
                        that.setup3DSearch();
                    }
                }
              },

              destroy: function() {
                this.destroySocket();
                this._super(); //Always call this!
              },
              destroySocket: function() {
                if (Ds.CommonSearchWidget._socket) {
                    //remove our lisener for when the section was expanded
                    //we need to unregister first
                    var optionsUnregister = {};
                    optionsUnregister.widget_id = this._searchOptions.widget_id;
                    Ds.CommonSearchWidget._socket.dispatchEvent('unregisterSearchContext', optionsUnregister);
                    Ds.CommonSearchWidget._socket.dispatchEvent('UnregisterContext', optionsUnregister);
                	Ds.CommonSearchWidget._socket.unsubscribeServer('SearchComServer');
                	Ds.CommonSearchWidget._socket.removeListener('Selected_Objects_search' , this._Selected_Objects_search_listener);

                    Ds.CommonSearchWidget._socket.disconnect();
                    delete Ds.CommonSearchWidget._socket;
                }
              },

              onSearch: function(strSearch) {
                var that = this;
                if (!Ds.CommonSearchWidget._socket && !window.widget.getBool('useLegacySearch')) {
                    that.setup3DSearch(function() {
                        that.onSearch(strSearch);
                    });
                    return;
                }

                if (Ds.CommonSearchWidget._socket) {
                    that._activateSearchContext(strSearch);
                } else {
                    that.element.ds_common_search('runsearch',strSearch)
                }
              },

              setup3DSearch: function(success) {
                var that = this;
                require({
                    baseUrl: window.Configuration.webappsDir //set in ds_common.js
                },
                // -- Module Dependancies --
                    [	'UWA/Core',
	                    'UWA/Utils/InterCom'
                ], function (UWA, InterCom) {
                    if (Ds.CommonSearchWidget._socket) {
                        //we need to unregister first
                        that.destroySocket();
                    } else {
                        var curSecurityContext = window.widget.getValue('pad_security_ctx') || window.widget.getValue('collabSpace');
                        if (window.Foe && window.Foe.Model && window.Foe.Model.Session && window.Foe.Model.Session.get) {
                            var sessionSecurityContext = Foe.Model.Session.get('pad_security_ctx');
                            if (sessionSecurityContext !== curSecurityContext) { //might be lower case
                                curSecurityContext = sessionSecurityContext;
                            }
//                        } else {
//                            curSecurityContext = window.widget.getValue('collabSpace');
                        }
                        if (!curSecurityContext && window.localStorage) {
                            $.each(window.localStorage, function(strKey, strVal) {
                                if (strKey && strVal && strKey.indexOf('security_ctx') >= 0) {
                                    curSecurityContext = strVal;
                                }
                                return !curSecurityContext; //returning false will act like a break
                            });
                        }
                        if (curSecurityContext) { //might be NULL
                            curSecurityContext = curSecurityContext.replace('ctx::', '');
                        }
                        that._searchOptions.role = curSecurityContext;
                        that._searchOptions.app_socket_id = that._socketName;
                        that._searchOptions.widget_id = window.widget.id;
                        that._searchOptions.multiSel = (widget.body && ($(widget.body).children('opendata_dlg_container').size() <= 0));
                    }

                    // Initialize the communication pipe if required
                    if (!UWA.is(Ds.CommonSearchWidget._socket)) {
                        // Create a new socket. The socket id is the one define in {@link module:DS/SearchIntegrationSample/SearchIntegrationSample.SearchIntegrationSample#options options}
                        Ds.CommonSearchWidget._socket = new InterCom.Socket(that._socketName, {
                            dispatchRetryInterval: 0
                        });

                        // Subscribe to the Search Intercom server (it has already been created by the 3D#)
                        Ds.CommonSearchWidget._socket.subscribeServer('SearchComServer');

                        that.set3DSearchString();

                        // Dispatch registration event.
                        Ds.CommonSearchWidget._socket.dispatchEvent('RegisterContext', that._searchOptions);

                        // Listen to the event that will be triggered when the user click on OK with a selected object
                        that._Selected_Objects_search_listener = Ds.CommonSearchWidget._socket.addListener('Selected_Objects_search', that._selectedObjectsSearch.bind(that));
                    }
                    if(success) {success()};
                });
              },

              set3DSearchString: function() {
                var that = this;
                var arrControllers = this.element.data('controls');
                if (!arrControllers || !arrControllers.length) {
                    return; //there is nothing we can set it to, so leave it alone
                }

                var arrSearchStrings = [];
                $.each(arrControllers, function(idxConstructor, objConstructor) {
                    if (objConstructor && objConstructor.get3DSearchString) {
                        //add this to our list
                        var strMySearchString = objConstructor.get3DSearchString();
                        if (strMySearchString && (typeof strMySearchString === 'string') && strMySearchString.length) {
                            arrSearchStrings.push(strMySearchString);
                        }
              }
                });

                if (arrSearchStrings.length > 0) {
                    that._searchOptions.precond = '(' + arrSearchStrings.join(') OR (') + ')';
                }
              },

              _selectedObjectsSearch: function (parameters) {
                //Ds.CommonSearchWidget._socket.dispatchEvent('clearSearch');
                steal.dev.log('SEARCH PHYSICAL ID = ' + parameters[0]['id']);
                var strMessage = 'Items must be dropped on their intended target';
                if (window.$ && window.$.t) {
                    strMessage = window.$.t(strMessage);
                } else if (window._) {
                    strMessage = window._(strMessage);
                }
                window.alert(strMessage);
              },

    		  _activateSearchContext: function (searchVal) {
                // Check if the socket exits
                if (UWA.is(Ds.CommonSearchWidget._socket)) {
                    // Dispatch the event
                    this._searchOptions.default_search_criteria = searchVal;
                    Ds.CommonSearchWidget._socket.dispatchEvent('InContextSearch', this._searchOptions);
                } else {
                    throw new Error('Socket not initialized');
                }
              }
            });
    });
    if(Ds && Ds.CommonSearch) {
        $(window).trigger('Ds.CommonSearch.defined'); //we have to trigger this due to steal timing issues in the production build
    }
});
