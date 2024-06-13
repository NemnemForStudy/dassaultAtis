steal(
      'jquery/controller'
, function () {
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
    var can = window.can; //for mkscc compliance, we have to define all our variables...
    var steal = window.steal; //for mkscc compliance, we have to define all our variables...

return can.Control.extend('Ds.Alert',
/* @Static */
{
    onDocument: true
},
    /* @Prototype */
{
    _ManagerViewOnScreen: null,
init: function () {
    var that = this;
    if(!window.require) { return; } //important for the build
    require(
    {
        baseUrl: window.Configuration.webappsDir //set in ds_common.js
    }
    , [
      'DS/Core/Core'
      , 'DS/Notifications/NotificationsManagerUXMessages'
      , 'DS/Notifications/NotificationsManagerViewOnScreen'
      //, 'DS/DELWebInfrastructureControls/DELWebNotificationsManagerViewOnScreen'
      ]
    ,
    function (Core
                , NotifManager
                , ManagerViewOnScreen
    ) {
        'use strict';
        UWA.debug = true;
        window._alert = window.alert; //store this for backup, just in case we need it again in the future
        if (!ManagerViewOnScreen._getNotificationManager) {
            //IR-991060- NWT 9/21/2022 - the current getNotificationManager doesn't actually return anything!
            //just try to fix that so that it at least returns SOMETHING
            ManagerViewOnScreen._getNotificationManager = ManagerViewOnScreen.getNotificationManager;
            ManagerViewOnScreen.getNotificationManager = function() {
                return this._getNotificationManager() || this._manager;
            };
        }
        if (!ManagerViewOnScreen.getNotificationManager() && !ManagerViewOnScreen._manager) {
            ManagerViewOnScreen.setNotificationManager(NotifManager);
            ManagerViewOnScreen.setStackingPolicy(1 + 2 + 4 + 8); // + 16 + 128
        }
        that._ManagerViewOnScreen = ManagerViewOnScreen;
        if (ManagerViewOnScreen.elements && ManagerViewOnScreen.elements.container && !ManagerViewOnScreen.elements.container.dsModel) {
            //for whatever reason, the Manager doesn't add the dsModel that is defined in Controls\Abstract
            ManagerViewOnScreen.elements.container.dsModel = ManagerViewOnScreen;
        }

        window.alert = function (strMsg, iOpts) {
            //if the window.Configuration.supressNotifications isn't there, OR we have a forceDisplay in the options, then display the alert
            //NOTE: the force display overrides the supressNotifications. The supressNotifications is used when we don't want ANY erros displaying to the user,
            //  such as before they've logged in or after they've logged out. A good example of when we might want to override the supressNotifications is
            //  when we need to display to the user that their browser won't support WEBGL, which is relevant no matter whether they've logged in or not.
            if((!window.Configuration || !window.Configuration.supressNotifications) || (iOpts && "forceDisplay" in iOpts && iOpts.forceDisplay === true)){

                //if we have the force display, remove it so it doesn't mess up the empty object settings for the alert.
                if(iOpts && $.isPlainObject(iOpts) && ("forceDisplay" in iOpts) && iOpts.forceDisplay === true){
                    delete iOpts.forceDisplay;
                }

                var emptyObj = $.isEmptyObject(iOpts);

                var opts = {};
                opts.message = strMsg;

                if ($.isEmptyObject(iOpts)) {
                    // If no input preferences, we make the dialog type Error.
                    opts.level = 'error';
                    opts.subtitle = '';
                    opts.sticky = false;
                    opts.category = (strMsg || '').toString();
                    opts.title = ($.t ? $.t('Error') : 'Error') + ':';
                }
                else {
                    opts.level = emptyObj ? 'warning' : (iOpts.type || 'warning');
                    opts.subtitle = emptyObj ? '' : (iOpts.subtitle || '');
                    opts.sticky = emptyObj ? false : (iOpts.sticky || false);
                    opts.category = emptyObj ? (strMsg || '').toString() : (iOpts.category || (strMsg || '').toString());
                    opts.title = emptyObj ? (opts.level == 'warning' ? ($.t ? $.t('Error') : 'Error') : '') : (iOpts.title || '');
                    if (opts.title == "") {
                        opts.title = opts.type;
                    }
                }

                var notif = NotifManager.addNotif(opts);

                // if no options provided set auto remove timeout to 6 seconds
                if (!opts.sticky && ManagerViewOnScreen && ManagerViewOnScreen.removeNotification) {
                    setTimeout(function () {
                        ManagerViewOnScreen.removeNotification(notif);
                    },
                    (iOpts && iOpts.duration ? iOpts.duration : 6000)); //helps during ODTs!
                }
            }
        }
    });
},

//used in ODTs
'Notification.clearAll subscribe': function(called, objParams) {
    var that = this;
    if (!this._ManagerViewOnScreen || !this._ManagerViewOnScreen.removeNotifications) {
        return; //nothing we can do other than wait
    }

    this._ManagerViewOnScreen.removeNotifications();
}

});
});
