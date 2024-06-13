define('DS/SetEnterpriseItemNumberWintop/SetPartNumberWintop', [
  'DS/ENOXEngineerCommonUtils/XENWebInWinHelper',
  'DS/EngineeringItemCmd/SetPartNumberCmd/SetPartCmd'
], function(XENWebInWinHelper, SetPartCmd) {

    'use strict';

    

    var  SetPartNumberWintop = {
      onLoad: function(){
        XENWebInWinHelper.initializeSocket();
        XENWebInWinHelper.getSocket().addListener('onDispatchToWin', function (parameters){
          var name = parameters.notif_name;
         var parameters_string = UWA.is(parameters.notif_parameters, 'string') ? parameters.notif_parameters : JSON.stringify(parameters.notif_parameters);
         var message = parameters_string;
         dscef.sendString (name + '=' + message,{
              recordable: true,
              captureAll: true
          });              	
       });  

        var setPartCmdTransactionParameters = window["WIN_TRANSACTION_PARAMETERS"];
        var myAppsBaseURL = window["COMPASS_CONFIG"].myAppsBaseUrl;
        var tenantID = window["COMPASS_CONFIG"].tenantID;
        var strSecurityContext =  window["COMPASS_CONFIG"].SecurityContext;
        var authorizedChangeInfo =  window["COMPASS_CONFIG"].authorizedChange;
        if(widget && authorizedChangeInfo){	widget.setValue('authorizedChange' , authorizedChangeInfo);		}
        if(widget && tenantID){		widget.setValue('x3dPlatformId' , tenantID);	}
        var selectedNodes = window["selectedItems"].map(function(item){
         return  {
            options:{
              padgrid:{
                'ds6w:globalType':'ds6w:Part'
              },
              grid:{
                
              }
            },
            getLabel: function(){
              return item.title;
            },
            getID: function(){
              return item.objectId;
            },
            getSessionStoredEIN: function(){
              return item.SessionEIN;
            }
          }
        })

        var setPartNumber = new SetPartCmd({
          context:{
            getSelectedNodes: function(){
              return selectedNodes;
            },
	    getTransactionParameters: function(){
            	return setPartCmdTransactionParameters;
	    },
	    getMyBaseAppURL: function(){
            	return myAppsBaseURL;
	    },
	    getTenentID: function(){
            	return tenantID;
	    },
	    getSC: function(){
            	return strSecurityContext;
	    }
          }
        });
        widget.body.empty();
        setPartNumber.execute();
      },
      onRefresh: function(){
        console.log('onRefresh ...');
      }
    };

    return SetPartNumberWintop;

});
