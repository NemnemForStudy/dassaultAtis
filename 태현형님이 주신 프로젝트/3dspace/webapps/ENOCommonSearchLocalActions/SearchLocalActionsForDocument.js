define('DS/ENOCommonSearchLocalActions/SearchLocalActionsForDocument',
    ['UWA/Class',
        'UWA/Class/Debug',
        'UWA/Class/Events',
		'UWA/Environment'
    ],
    function (UWAClass,
        UWADebug,
        UWAEvents,
		UWAEnvironment
    ) {

        var ActionsHandler = UWAClass.singleton(UWAEvents, UWADebug, {

            executeAction: function (actions_data) {
                var that = this;
                if (actions_data.object_id) {
                    actions_data.actionsHelper.getServiceURL({
                        'onComplete': function (url) {
                            require.config({
                                paths: {
                                    "DS/DocumentCommands": url + "/webapps/DocumentCommands"
                                },
                            });
                            var environment = new UWAEnvironment({
                                'id': actions_data.object_id
                            });
                            environment.dispatchEvent('onInit');
                            environment.inited = true;
                            environment.wp = {
                                'id': actions_data.object_id
                            };
                            environment.registerWidget(new UWA.Widget());
                            var widget = environment.getWidget();

                            widget.body = document.body;
                            widget.widgetDomain = this.dsBaseUrl;
                            var commonCommandsFile = 'DS/DocumentCommands/ENOXDocumentCommands';
                            require([commonCommandsFile], function (CommonCommands) {
                                var cmdOptions = {};
                                cmdOptions.platformUrls = {
                                    '3DSpace': url
                                };
                                cmdOptions.document = {
                                    id: actions_data.object_id,
                                    'serviceId': "3DSpace",
                                    'envId': actions_data.actionsHelper.getPlatformID({
                                        'id': actions_data.object_id
                                    }),
                                    'data': {
                                        'title': actions_data.actionsHelper.getAllValues({
                                            'id': actions_data.object_id
                                        })["ds6w:label"],
                                        'name': actions_data.actionsHelper.getAllValues({
                                            'id': actions_data.object_id
                                        })["ds6w:identifier"]
                                    }
                                };
                                cmdOptions.onComplete = function (result) {
                                    window.rr = result;
                                };

                                cmdOptions.notificationTarget = document.getElementsByClassName(".onesearch_results");
                                cmdOptions.document.filesCallback = function (actions) {
                                    if ((actions_data.action_id == "documentAction_Download")) {
                                        var download = actions['Download'];
                                        download.handler();
                                    } else if ((actions_data.action_id == "documentAction_Edit")) {
                                        var edit = actions['Edit'];
                                        edit.handler();
                                    } else if ((actions_data.action_id == "documentAction_UndoEdit")) {
                                        var undoEdit = actions['UndoEdit'];
                                        undoEdit.handler();
                                    } else if ((actions_data.action_id == "documentAction_Update")) {
                                        var update = actions['Update'];
                                        update.handler();
                                    } else if ((actions_data.action_id == "documentAction_CopyLink")) {
                                        var copyLink = actions['CopyLink'];
                                        copyLink.options = {
                                            'target': actions_data.actionsHelper.getTarget()
                                        };
                                        copyLink.handler();
                                    }
                                }
                                var cmds = new CommonCommands(widget);
                                cmds.init(cmdOptions);
                                var actions = cmds.render();
                            });
                        },
                        'id': actions_data.object_id
                    });
                } else if (actions_data.object_ids) {
                    actions_data.actionsHelper.getServiceURL({
                        'onComplete': function (url) {
                            require.config({
                                paths: {
                                    "DS/DocumentCommands": url + "/webapps/DocumentCommands"
                                },
                            });
                            require(['DS/DocumentManagement/' + 'DocumentManagement',
                            'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
                            'DS/CoreEvents/ModelEvents',
                            'DS/DocumentCommands/' + 'DocumentCommandsV2'
                        ], function (DocumentManagement,
                            i3DXCompassPlatformServices,
                            ModelEvents,
                            DocumentCommandsV2
                        ) {
                            i3DXCompassPlatformServices.getPlatformServices({
                                platformId: actions_data.actionsHelper.getPlatformID({
                                    'id': actions_data.object_ids[0]
                                }),
                                onComplete: function (platformUrls) {
                                    DocumentManagement.getDocuments(actions_data.object_ids, {
                                        tenant: platformUrls.platformId,
                                        tenantUrl: platformUrls['3DSpace'],
                                        additionalURLParams: "$fields=isDocumentType",
                                        onComplete: function (response) {
                                            if (response.success) {
                                                var modelEvents = new ModelEvents();
                                                modelEvents.subscribe({
                                                    event: "docv2-show-notification"
                                                }, function (e) {
                                                    actions_data.actionsHelper.displayAlert({
                                                        "message": e.message,
                                                        "level": e.level
                                                    });
                                                });
                                                var options = {
                                                    fetchSecurityContext: function () {
                                                        return;
                                                    },
                                                    getSelectedNodes: function () {
                                                        return response.data;
                                                    },
                                                    getDocumentFromNodeModel: function (e6wDocument) {
                                                        return e6wDocument;
                                                    },
                                                    platformUrls: platformUrls,
                                                    isFromContextMenu: true,
                                                    events: modelEvents
                                                };
                                                var docCmdsV2 = new DocumentCommandsV2(options);
                                                var commoncmds = docCmdsV2.commands;
                                                commoncmds["Download"].execute();
                                            }
                                        },
                                        onFailure: function (response) {
    
                                        }
                                    });
                                }
                            });
    
                        });
                        }, 'id': actions_data.object_ids[0]
                    });
                   
                } 

            },
        });
        return ActionsHandler;

    });

        
