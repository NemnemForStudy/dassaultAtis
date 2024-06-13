/*global sendNotification */
window.onload = function () {
  if (window.location.search.indexOf('no_jsnotif=true') === -1) {
    sendNotification('PageLoaded', {});
  }
};

define('DS/AfrWebInWinLeftPanel/AfrWebInWinLeftPanelMgr', [
  'UWA/Drivers/Alone',
  'UWA/Core',
  'UWA/Class',
  'UWA/Class/Debug',
  'UWA/Element',
  'UWA/Event'
], function (
  UWAAlone,
  UWACore,
  UWAClass,
  UWADebug,
  UWAElement,
  UWAEvent
) {
    'use strict';

    var AfrWebInWinLeftPanelMgr = UWAClass.singleton(UWADebug, {

      _views: {},

      init: function () {
        this.log('AfrWebInWinLeftPanelMgr init');
        //  debugger;
        var debug_me = window.location.search.substring(1).indexOf('debug_me') >= 0 ? true : false;

        this.setDebugMode(debug_me);

        UWAElement.addEvent.call(document, 'keydown', function (event) {
          var key = UWAEvent.whichKey(event);
          var tagName = UWAEvent.getElement(event) ? UWAEvent.getElement(event).getTagName() : 'unknown';

          if (((key === 'backspace') || (key === 'alt+left')) && (['input', 'select'].indexOf(tagName) === -1)) {
            UWAEvent.stop(event);
            Logger.log('AfrWebInWinLeftPanelMgr/AfrWebInWinLeftPanelMgr backspace stopped', event);
          }

          if (event.keyCode === 116) { //F5
            event.returnValue = false;
            event.preventDefault();
            event.stopPropagation();
          }
        });
      },

      initView: function (viewParams) {
        var that = this;

        //debugger;
        this.log("Inside initView, view Parameters=" + JSON.stringify(viewParams));

        if (this._views[viewParams.viewId]) {
          throw new Error("View is alreday instantiated, viewId = " + viewParams.viewId);
        }
        //
        //check all needed options are available
        if (!viewParams.amdPath || !viewParams.viewId || !viewParams.options || !viewParams.passcode) {
          throw new Error("INVALID view parameters")
        }
        //
        require([viewParams.amdPath], function (LeftPanelView) {
          //
          that._views[viewParams.viewId] = {
            "viewImpl": LeftPanelView,
            "passcode": viewParams.passcode
          }

          //create a div for the new View
          var leftContentElem = UWACore.extendElement(document.body).getElement('#left-content');
          var leftView = UWACore.createElement('div', {
            "id": viewParams.viewId,
            "class": "left-view",
            'data-rec-id': viewParams.viewId
          }).inject(leftContentElem);
          //
          leftView.hide();//keep it hidden by default, we show it only when we are explicitly asked with activateView
          //
          viewParams.options.notifSeparator = viewParams.viewNotifSeparator;
          LeftPanelView.buildView(viewParams.options);

        }, function (error) {
          console.error('Cannot load view: ' + error.requireModules);
        });
      },

      runViewScript: function (parameters) {
        //check all needed options are available
        var viewId = parameters.viewId
        if (!viewId) { throw new Error("INVALID parameters for runViewScript") }
        //check that the view is already registered
        var viewInfo = this._views[viewId];
        if (viewInfo) {
          if (parameters.passcode == viewInfo.passcode) {
            viewInfo.viewImpl.executeMethod(parameters.scriptParams);
          }
        } else { throw new Error("view NOT registered, id=" + viewId) }
      },

     activateView: function (options) {
        var that = this;
        if (!options || !options.viewId) { throw new Error("INVALID parameters for activateView") }

        this.log("View to activate=" + options.viewId);

        var leftContentElem = UWACore.extendElement(document.body).getElement('#left-content');
        var views = leftContentElem.getElements(".left-view");
        views.forEach(function (viewElem) {
          if (viewElem.id === options.viewId) {
            //viewElem.setstyle("display", "block");
            viewElem.show();
            //
            sendNotification("activeView", options.viewId);
          } else {
            //viewElem.setStyle("display", "none");
            viewElem.hide();
            that.log("hiding the View, id=" + viewElem.id);
          }
        })
      },

      deactivateView: function (options) {
        if (!options || !options.viewId) { throw new Error("INVALID parameters for deactivateView") }

        this.log("View to deactivateView=" + options.viewId);

        var leftContentElem = UWACore.extendElement(document.body).getElement('#left-content');
        var views = leftContentElem.getElements(".left-view");
        var nbVisibleViews = 0;
        views.forEach(function (viewElem) {
          if (viewElem.id === options.viewId) {
            viewElem.hide();
          } else {
            if (false == viewElem.isHidden()) {
              ++nbVisibleViews;
            }
          }
        });
        //
        sendNotification("nbVisibleViews", nbVisibleViews);
      }
    });

    return AfrWebInWinLeftPanelMgr;
  }
);
