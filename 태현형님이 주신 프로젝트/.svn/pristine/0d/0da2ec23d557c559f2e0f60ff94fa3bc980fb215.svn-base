/* globals WUXDockAreaEnum */
/*eslint no-unused-vars: 0*/
/*eslint no-loop-func: 0*/

define('DS/EPHeader/EPHeader',
    ['DS/EPPrivateTools/Utils', 'DS/Windows/ImmersiveFrame', 'DS/Controls/Toggle', 'DS/Notifications/NotificationsManagerUXMessages', 'DS/Notifications/NotificationsManagerViewOnScreen', 'css!DS/EPHeader/EPHeader.css'],
    function(Utils, WUXImmersiveFrame, WUXToggle, WUXNotificationsManagerUXMessages, WUXNotificationsManagerViewOnScreen) {
        'use strict';

    var EPHeader = function(settings) {
        window.notifs = WUXNotificationsManagerUXMessages;
        WUXNotificationsManagerViewOnScreen.setNotificationManager(window.notifs);
        this.settings = settings;
        this.separators = [];
        this.dialogImmersiveFrame = settings.immersiveFrame;

        if (!this.dialogImmersiveFrame) {
            this.dialogImmersiveFrame = new WUXImmersiveFrame();
            this.immersiveFrameDOMParented = false;
        }
        else {
            this.immersiveFrameDOMParented = true;
        }

        //this.indicatorsMap = this.controller.indicatorsMap;
        return this;
    };

    EPHeader.prototype.constructor = EPHeader;

    EPHeader.prototype.getView = function() {
        if (!this.view) { this.view = this._createDomElement(); }
        return this.view;
    };

    EPHeader.prototype._createDomElement = function() {
        var me = this;
        var shareUrlButton = Utils.html('span', '', 'wux-button-icon-fi wux-ui-fa wux-ui-fa-share-alt headerButton');
        shareUrlButton.title = 'Copy URL';
        shareUrlButton.addEventListener('click', function() {
            var fullUrl = window.location.href;
            Utils.copyTextToClipboard(fullUrl);
            window.notifs.addNotif({
                level: 'success',
                title: 'URL copied to clipboard'
            });
        });

        var bottomLogo = Utils.html('img');
        bottomLogo.src = '../EPHeader/assets/EKCompass.png';
        bottomLogo.classList.add('headerLogo');

        var logo = Utils.html('img');
        logo.src = this.settings.logo;
        logo.classList.add('headerLogo');
        logo.classList.add('top');
        logo.addEventListener('click', function() {
            window.open('../executionfw/', '_blank');
        });

        this.firstToolBarArray = [];
        this.firstToolBarArray.push(bottomLogo);
        this.firstToolBarArray.push(logo);
        this.firstToolBarArray.push(Utils.html('h1', this.settings.appName));

        if (this.settings.center) {
            this.firstToolBarArray.push(Utils.html('div', [Utils.html('div', [this.settings.center], 'topCenterInnerDiv')], 'topCenterDiv'));
        }

        if (this.settings.actions) {
            Object.keys(this.settings.actions).forEach(function(name) {
                var action = me.settings.actions[name];
                var button;
                if(action.isToggle) {
                    var toggle = new WUXToggle({
                        type: 'switch',
                        value: name
                    });
                    toggle.toggle();
                    toggle.addEventListener('change', action.callback);
                    toggle.getContent().classList.add('epToggle');
                    button = Utils.html('div', [toggle.getContent()]);
                    button.title = action.title || name;
                }
                else if (action.icon) {
                    button = Utils.html('img', '', 'extraLogo');
                    button.src = action.icon;
                    button.id = name;
                    button.title = action.title || name;
                    button.addEventListener('click', action.callback);
                }
                else if (action.cssIcon) {
                    button = Utils.html('span', '', 'headerButton ' + action.cssIcon);
                    button.id = name;
                    button.title = action.title || name;
                    button.addEventListener('click', action.callback);
                }
                me.firstToolBarArray.push(button);
            });
        }


        this.firstToolBarArray.push(shareUrlButton);
        var frontButtons = this.addButtonsInfront();
        if(frontButtons) {
            this.firstToolBarArray.push(frontButtons);
        }

        this.topToolBar = Utils.html('div', this.firstToolBarArray, 'topToolBar', 'topToolBar');
        var arrayHeaderElts = [this.topToolBar];
        if ( !this.immersiveFrameDOMParented) {
            if(this.settings.immersiveFrameContainer) {
                this.settings.immersiveFrameContainer.appendChild(this.dialogImmersiveFrame.getContent());
            } else {
                arrayHeaderElts.push(Utils.html('div', [this.dialogImmersiveFrame.getContent()], 'flexGrowItem'));
            }
        }
        return Utils.html('div', arrayHeaderElts, 'flexVerticalContainer');
    };

    EPHeader.prototype.addToolBarAction = function(actionName, actionValue ) {
        if (this.settings.actions) {
            if (! this.settings.actions[actionName]) {
                this.settings.actions[actionName] = actionValue;
                var button;
                if (actionValue.icon) {
                    button = Utils.html('img', '', 'extraLogo');
                    button.src = actionValue.icon;
                    button.id = actionName;
                    button.title = actionValue.title || actionName;
                    button.addEventListener('click', actionValue.callback);
                }
                else if (actionValue.cssIcon) {
                    button = Utils.html('span', '', 'headerButton ' + actionValue.cssIcon);
                    button.id = actionName;
                    button.title = actionValue.title || actionName;
                    button.addEventListener('click', actionValue.callback);
                }
                this.firstToolBarArray.splice(3, 0, button);

                var parentToolBarElt = this.topToolBar.parentNode;
                var newTopToolBar = Utils.html('div', this.firstToolBarArray, 'topToolBar', 'topToolBar');

                parentToolBarElt.replaceChild(newTopToolBar, this.topToolBar);
                this.topToolBar = newTopToolBar;
            }
        }
    };

    EPHeader.prototype.enableToolBarAction = function( actionName, enable) {
        var button = document.getElementById(actionName);
        if ( button ) {
            if ( enable ) {
                button.style.removeProperty('filter');
                button.addEventListener('click', this.settings.actions[actionName].callback);
            }
            else {
                button.style.setProperty('filter', 'brightness(50%)');
                button.removeEventListener('click', this.settings.actions[actionName].callback);
            }
        }
    };

    EPHeader.prototype.toggleToolBarAction = function( actionName, toggleOn ) {
        var button = document.getElementById(actionName);
        if ( button ) {
            if ( toggleOn ) {
                button.style.removeProperty('filter');
            }
            else {
                button.style.setProperty('filter', 'opacity(50%)');
            }
            this.settings.actions[actionName].toggle = toggleOn;
        }
    };

    EPHeader.prototype.getToolBarActionToggleStatus = function( actionName ) {
        var returnedValue = false;
        if ( this.settings.actions[actionName] ) {
            returnedValue = this.settings.actions[actionName].toggle;
        }
        return returnedValue;
    };

    EPHeader.prototype.removeToolBarAction = function( actionName ) {
        if ( this.settings.actions ) {
            if ( this.settings.actions[actionName] ) {
                delete this.settings.actions[actionName];
                var button = document.getElementById(actionName);

                this.firstToolBarArray.splice(this.firstToolBarArray.indexOf(button), 1);

                var parentToolBarElt = this.topToolBar.parentNode;
                var newTopToolBar = Utils.html('div', this.firstToolBarArray, 'topToolBar', 'topToolBar');

                parentToolBarElt.replaceChild(newTopToolBar, this.topToolBar);
                this.topToolBar = newTopToolBar;
            }
        }
    };

    EPHeader.prototype.addButtonsInfront = function() {
        return null;
    };

    EPHeader.prototype.addSeparator = function() {
        var button = Utils.html('span', '', 'headerButton separator');
        this.separators.push(button);
    
        this.firstToolBarArray.splice(3, 0, button);

        var parentToolBarElt = this.topToolBar.parentNode;
        var newTopToolBar = Utils.html('div', this.firstToolBarArray, 'topToolBar', 'topToolBar');

        parentToolBarElt.replaceChild(newTopToolBar, this.topToolBar);
        this.topToolBar = newTopToolBar;
    };

    EPHeader.prototype.getActionButton = function(actionName) {
        return document.getElementById(actionName);
    };

    return EPHeader;
});
