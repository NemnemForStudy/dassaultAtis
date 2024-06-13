
(function () {
   })();

define('DS/EffectivityWebExternalJS/scripts/CfgConfigurationRevisionFactoryLoader', [
],
function (CfgConfigurationRevisionFactoryLoader) {
    'use strict';
    return CfgConfigurationRevisionFactoryLoader;
}
);
/*
@desc Configuration revision controller creation global method
this method creates the VersionExplorerController for selection of configured revision for expression purpose.
*/

        function CfgConfigurationRevisionFactory(iId, cfgRevVECallBackFn, iTenant, ibaseURL, iSecurityContext, iParent, iSelectedNode,out_vEObject) {
            require(
            [
            'UWA/Core',
            'DS/Handlebars/Handlebars4',
            'DS/ENOXVersionExplorerController/VersionExplorerController',
            'DS/ENOXVersionExplorerUtils/VersionExplorerEnums',
            'DS/LifecycleServices/LifecycleServicesSettings',
            'DS/UWPClientCode/I18n',
            'i18n!DS/CfgBaseUX/assets/nls/CfgBaseUX' // APP NLS
            ],
            function (Core, Handlebars, VersionExplorerController, VersionExplorerEnums, LifecycleServicesSettings,I18n, APP_NLS) {

                // create UWA div for Configuration Facet	
                var cfgFacet = UWA.createElement("div", {
                    "styles": {
                        "height": "100%"
                    }
                });
                // set template HTML for facet	
                cfgFacet.inject(iParent);

                //var cfgRevisionUXContainer = cfgFacet.getElement(".configuration-revision-section");
                var versionExplorer =
                    //create VE object collect for amd attrbiute filling 
                    out_vEObject.value = new VersionExplorerController({
                        versionGraphContainer: null || cfgFacet
                    });
                if (!window.widget) { window.widget = {}; window.widget.lang = I18n.getCurrentLanguage(); }
                var lifecycleSettings = [{ '3DSpace': ibaseURL, 'platformId': iTenant }];
                LifecycleServicesSettings.setOption('platform_services', lifecycleSettings);
                versionExplorer.setSingleSelectionMode();//single selection mode
                versionExplorer.disableCommands();//read only mode ENOXVersionExplorerLoadVersionModel
                var that = this;
                that.selectedNode = iSelectedNode;
                versionExplorer.publishEvent('ENOXVersionExplorerLoadVersionModel', {
                    id: iId,//physical id of an Object
                    securityContext: iSecurityContext,//security context for the user
                    tenantId: iTenant,//tenant for the user
                    type: "ConfiguredBaseline",//type of object
                    context: null,
                    dataModelType: 6,
                    onComplete: function () {
                        /*self.versionExplorer.publishEvent('ENOXVersionExplorerSetActiveVersion', {
                            id: instanceId
                        });*/
                    
                        cfgRevVECallBackFn(); 

                        console.log(iId);
                        if (that.selectedNode && that.selectedNode.id)
                            out_vEObject.value.select(that.selectedNode.id);
                    }
                });
            });
        }


