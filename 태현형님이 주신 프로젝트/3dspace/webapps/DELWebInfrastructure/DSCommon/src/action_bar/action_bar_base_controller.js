steal(
      '//../DSCommon/src/views/ds_common/action_bar.ejs',
      '//../DSCommon/src/views/ds_common/action_bar.css',
      'jquery/controller',
      'jquery/view/ejs',                      // client side templates
      'jquery/controller/view',            // lookup views with the controller's name
      '//../jquery.jsperanto/jquery.jsperanto.js',
function() {
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
    var can = window.can; //for mkscc compliance, we have to define all our variables...
    var steal = window.steal; //for mkscc compliance, we have to define all our variables...

return can.Control.extend('Ds.CommonActionBar',
/* @Static */
{
    onDocument: false
},
/* @Prototype */
{
    init: function(options, onActionBarReadyCallBack){
        var that = this;
        require({
            baseUrl: window.Configuration.webappsDir //set in ds_common.js
        }, [
            'UWA/Core',
            'DS/ApplicationFrame/ActionBar',
            'DS/ApplicationFrame/CommandsManager',
            'DS/RuntimeView/RSCManager',
            'UWA/Controls/Abstract',
            'DS/ENO6WPlugins/jQuery',
            'DS/PlatformAPI/PlatformAPI',
            'DS/Layouts/SlidingViews',
            'UWA/Utils/InterCom',
            'DS/RuntimeView/NLSManager'
        ], function(UWA,
            ActionBar,
            AFRCommandsManager,
            RSCManager,
            Abstract,
            jQuery,
            PlatformAPI,
            SlidingViews,
            InterCom,
            LifecycleServicesSettings,
            NLSManager)
        {
            'use strict';

            // When creating a second action bar, this call unregisters any commands that were available on the
            // first action bar that was created.  So, if you uncomment this line for any reason, you must verify
            // that the commands on both action bars are available and functioning when both action bars are
            // created.  (For example, the 3D action bar, and the Network action bar.)

            //AFRCommandsManager._reset();

            var onActionBarReady_localCB = function(){
                var setEnabledCB = function(event, State, CommandID){
                    if(CommandID){
                        var cmd = AFRCommandsManager.getCommand(CommandID, that.element.context);
                        if(State === true){
                            if(cmd){
                                cmd.enable();
                            }
                        }
                        else if (State == false){
                            if(cmd){
                                cmd.disable();
                            }
                        }
                    }
                    event.stopPropagation();
                }

                $(that.element).on("enabledSet", setEnabledCB);

                if(onActionBarReadyCallBack) {
                    onActionBarReadyCallBack();
                }
            }

            that.element.addClass("AfrActionBar wux-afr wux-afr-actionbar wux-afr-actionbar-top-section wux-ui-is-rendered");
            if (!that._actionBar) {
                that._actionBar = new ActionBar({
                    context: that.element.context,
                    file: options.workbench,
                    module: options.workbenchModule,
                    language: options['language'] //use this like an array, because the compiler doesn't like using language in dot notation
                }).inject(that.element.context);
                that._actionBar.onActionBarReady(onActionBarReady_localCB);
            } else {
                that._actionBar.loadModel({
                    context: that,
                    merge: options.merge,
                    file: options.workbench,
                    module: options.workbenchModule,
                    language: options['language'] //use this like an array, because the compiler doesn't like using language in dot notation
                });
            }
            $(that.element.context).data("WUXActionBar",that._actionBar); //for easy reference, esp from ODTs

            //update the margin-left of the container with half the actual width of the contents
            that.element.css("margin-left",-that.element.width()/2);
        });
    },

    click: function($el, ev) {
        if(ev && ev.stopPropagation) {
            ev.stopPropagation();
        }
    }
});
});
