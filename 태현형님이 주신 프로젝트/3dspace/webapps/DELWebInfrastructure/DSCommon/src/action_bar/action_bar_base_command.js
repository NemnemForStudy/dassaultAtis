steal(
      'jquery/controller'
      ,'jquery/view/ejs'				      // client side templates
      ,'jquery/controller/view'		    // lookup views with the controller's name
      ,'//../jquery.jsperanto/jquery.jsperanto.js'

,function(){
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
    var can = window.can; //for mkscc compliance, we have to define all our variables...
    var steal = window.steal; //for mkscc compliance, we have to define all our variables...

return can.Control.extend('Ds.CommonActionBarCommand',
    /* @Static */
    {
        _commandID: null, // in the command that extends this base command you must specify the CommandID in the static section
        onDocument: false
    },

    /* @Prototype */
    {
        viewElement: null,
        _viewElementPrev: null,
        packedStations:null,
        _packedStationsPrev:null,
        _models: {}, //key = model id
        _currentlyPasting: {}, //keeps track of items that we are CURRENTLY PASTING so if you drill out/in, you will still see the "loading" ghost

        //init: function(commandID /*This needs to be the ID specified in your afr file*/){
        //    this._commandID = commandID;
        //},

        enable : function(AfterEnableCallback, otherCommandID /*if you want to disable another command command on the action bar*/){
            var CommandToDisable = otherCommandID ? otherCommandID : this._commandID;
            this.element.trigger("enabledSet", [/*state (true to enable false to disable*/true, /*Command ID*/CommandToDisable]);

            require(['DS/ApplicationFrame/CommandsManager'], function(CommandsManager) {
              'use strict';
              if(CommandsManager && CommandsManager.getCommand(CommandToDisable)){
            	  CommandsManager.getCommand(CommandToDisable).enable();

              }

              if(AfterEnableCallback)
                  AfterEnableCallback();
            });

         },

        disable : function(AfterDisableCallback, otherCommandID /*if you want to disable another command command on the action bar*/){
            var CommandToDisable = otherCommandID ? otherCommandID : this._commandID;
            this.element.trigger("enabledSet", [/*state (true to enable false to disable*/false, /*Command ID*/CommandToDisable]);

           require(['DS/ApplicationFrame/CommandsManager'], function(CommandsManager) {
              'use strict';
              if(CommandsManager && CommandsManager.getCommand(CommandToDisable)){
            	  CommandsManager.getCommand(CommandToDisable).disable();
              }

              if(AfterDisableCallback)
                  AfterDisableCallback();
           });

        }

    });
});

