
(function () {
})();

define('DS/EffectivityWebExternalJS/scripts/CfgReplaceProductConfigurationFactoryLoader', [
],
    function (CfgReplaceProductConfigurationFactoryLoader) {
        'use strict';
        return CfgReplaceProductConfigurationFactoryLoader;
    }
);
/*
@desc Replace Product Configuration by revision explorer creation global method
this method creates the VersionExplorerController for selection of Product Configuration for replace Product Configuration by revision.
*/

        function CfgReplaceProductConfigurationFactory(iId, cfgReplacePCVECallBackFn, iTenant, ibaseURL, iSecurityContext, iParent, iSelectedNode,out_pCObject) {
            require(
            [
            'UWA/Core',
            'DS/Handlebars/Handlebars4',
            'DS/ENOXVersionExplorerController/VersionExplorerController',            
            'DS/LifecycleServices/LifecycleServicesSettings',
            'DS/UWPClientCode/I18n',            
            ],
            function (Core, Handlebars, VersionExplorerController, LifecycleServicesSettings,I18n) {

                // create UWA div for Configuration Facet	
                var cfgFacet = UWA.createElement("div", {
                    "styles": {
                        "height": "100%"
                    }
                });
                // set template HTML for facet	
                cfgFacet.inject(iParent);
                                
                var versionExplorer =
                    //create VE object collect for amd attrbiute filling 
                    out_pCObject.value = new VersionExplorerController({
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
                    type: "Product Configuration",//type of object
                    //type: "ConfiguredBaseline",//type of object
                    context: null,
                    dataModelType: 6,
                    onComplete: function () {                       
                    
                        cfgReplacePCVECallBackFn(); 

                        console.log(iId);
                        if (that.selectedNode && that.selectedNode.id)
                            out_pCObject.value.select(that.selectedNode.id);
                    }
                });
            });
        }


