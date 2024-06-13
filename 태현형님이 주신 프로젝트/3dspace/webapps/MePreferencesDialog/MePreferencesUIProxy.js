define('DS/MePreferencesDialog/MePreferencesUIProxy',
    ['DS/MePreferencesDialog/MePreferencesUIProxyAdapter'],
    function (MePreferencesUIProxyAdapter) {

        var mePrefProxy = function () {
        }


        mePrefProxy.prototype.GetPreferenceDialog = async function () {
            return MePreferencesUIProxyAdapter.getPreferenceDialog().then((uiDialog) => {
                if (uiDialog)
                    return uiDialog;
                else
                    return null;
            });

        };
        return mePrefProxy;
    });

