//NWT 3/18/2020 - put this here so we can get the drag and drop indicator without having to request permissions to prereq PADUtils
$(function() {
    if (!window.define) { return; }
define('DS/DELWebInfrastructure/views/DnDInvite', [
    'css!DS/PADUtils/PADUtils',
    'i18n!DS/PADUtils/assets/nls/PADUtils.json',
    'DS/Core/Core',
    'UWA/Controls/Abstract',
    'UWA/Class/Options',
    'UWA/Class/Events',
    'UWA/Utils/Client'
//    ,'DS/PADUtils/PADContext',
//    'DS/PADUtils/PADSettingsMgt',
//    'DS/PADUtils/PADWebInWinServices',
//    'DS/PADUtils/PADUtilsServices'
], function(cssPADUtils,
    nlsPADUtils,
    WUXCore,
    Abstract,
    Options,
    Events,
    Client
//    ,PADContext,
//    PADSettingsMgt,
//    PADWebInWinServices,
//    PADUtilsServices
    ) {
    'use strict';

    // origin https://www.quirksmode.org/js/events_properties.html#position
    function convertToPosition(event) {
        var posx = 0;
        var posy = 0;
        if (event.pageX || event.pageY) {
            posx = event.pageX;
            posy = event.pageY;
        } else if (event.clientX || event.clientY) {
            posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        // posx and posy contain the mouse position relative to the document
        // Do something with this information
        return {
            x: posx,
            y: posy
        };
    }

    function isInside(point, rect) {
        if (point.y >= rect.top && point.y <= rect.bottom && point.x >= rect.left && point.x <= rect.right) {
            return true;
        }

        return false;
    }



    var PADDnDInvite = Abstract.extend(Options, Events, {
        name: 'paddnd_invite',
        defaultOptions: {
            mode: 'dynamic',
            invites: {
                drop: {
                    nls: 'drop',
                    icon: 'drag-drop'
                },
                add_in_context: {
                    nls: 'add_in_context',
                    icon: 'plus'
                },
                add_as_object: {
                    nls: 'add_as_object',
                    icon: 'plus'
                },
                insert: {
                    icon: 'plus',
                    nls: 'insert'
                },
                find: {
                    icon: 'search',
                    nls: 'find'
                }
            },
            active_invite: 'drop',
            isTouchActivated: false
        },
        init: function(options) {
            this._parent(options);
            this.options.isTouchActivated = false; //PADSettingsMgt.getSetting('touchDropInvite') && (Client.Features.touchEvents && !Client.Features.pointerEvents);
            if (this.options.isTouchActivated) {
                this.options.invites.drop = {
                    nls: 'add_as_object',
                    icon: 'touch'
                };
            }
            switch (this.getMode()) {
                case 'none':
                    break;
                case 'drop_here':
                    this._createDropHereInvite();
                    break;
                case 'dynamic':
                    this._createDynamicInvite();
                    break;
                case 'inviteWithFilter':
                    if (options.filterActive === undefined || options.filterActive === true) {
                        this._createDynamicInvite(true);
                    } else {
                        this._createDynamicInvite(false);
                    }
                    break;
                default:
                    console.warn('Unknown mode [' + this.getMode() + ']');
                    this._createDynamicInvite();
                    break;
            }
        },

        _createDynamicInvite: function(withFilter) {
            var that = this;
            this.elements.container = UWA.createElement('div', {
                'class': this.getClassNames('_container')
            });
            var invites_keys = Object.getOwnPropertyNames(this.options.invites);
            this.elements.container.informationDiv = UWA.createElement('div', {
                'class': this.getClassNames('_informationMain'),
                draggable: false
            });
            this.elements.container.informationDiv.inject(this.elements.container);

            if (this.options.isTouchActivated) {
                var touchCB = function(e) {
                    require(['DS/ApplicationFrame/CommandsManager'], function(CommandsManager) {
                        var command = CommandsManager.getCommand('AddRoot', 'Default');
                        command.begin();
                    });
                };
                this.elements.container.className += ' touch_look';
                this.elements.container.informationDiv.style.pointerEvents = 'auto';
                this.elements.container.informationDiv.addEventListener('touchend', touchCB);
            }
            for (var idx = 0; idx < invites_keys.length; idx++) {
                var key = invites_keys[idx];
                this.elements.container[key] = UWA.createElement('div', {
                    'class': this.getClassNames('_display ' + key),
                    draggable: false
                });
                UWA.createElement('i', {
                    'class': this.getClassNames('_img wux-ui-3ds wux-ui-3ds-5x wux-ui-3ds-' + this.options.invites[key].icon)
                }).inject(this.elements.container[key]);
                UWA.createElement('h5', {
                    'class': this.getClassNames('_txt font-3dsregular ' + key),
                    'text': nlsPADUtils['PADDropInvit_' + this.options.invites[key].nls]
                }).inject(this.elements.container[key]);
                this.elements.container[key].inject(this.elements.container.informationDiv);
                if (this.options.active_invite !== key) {
                    this.elements.container[key].hide();
                }
            }

            if (withFilter === true) {
                this.elements.container.style.pointerEvents = 'auto';
                this.elements.container.addEventListener('dragover', function(event) {
                    event.dataTransfer.dropEffect = 'move';
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
                var count = 0;
                this.elements.container.addEventListener('dragenter', function(e) {
                    var PADSession = require('DS/PADUtils/PADSession');
                    if (!PADSession.determineAuthoredFlag()) {
                        e.preventDefault();
                        e.stopPropagation();
                        count++;
                        that.elements.container.addClassName('withFilterOpen');
                        that.elements.container.filterDiv.style.display = 'block';
                    } else {
                        that.elements.container.removeClassName('withFilterOpen');
                        that.elements.container.filterDiv.style.display = 'none';
                    }
                });

                this.elements.container.addEventListener('dragleave', function(e) {
                    var PADSession = require('DS/PADUtils/PADSession');
                    if (PADSession.determineAuthoredFlag() === false) {
                        e.preventDefault();
                        e.stopPropagation();
                        count--;
                        if (count <= 0) {
                            that.elements.container.removeClassName('withFilterOpen');
                            that.elements.container.filterDiv.style.display = 'none';
                            count = 0;
                        }
                        return false;
                    }
                });
                this.elements.container.addEventListener('drop', function(e) {
                    count = 0;
                    var PADSession = require('DS/PADUtils/PADSession');
                    if (PADSession.determineAuthoredFlag() === false) {
                        that.elements.container.removeClassName('withFilterOpen');
                        that.elements.container.filterDiv.style.display = 'none';
                    }
                    if (UWA.is(that.options.dropOnInvite, 'function')) that.options.dropOnInvite(e);
                    return false;
                });
                this.elements.container.filterDiv = UWA.createElement('div', {
                    'class': this.getClassNames('_filterMain'),
                    draggable: false
                });
                this.elements.container.filterDiv.style.display = 'none';
                this.elements.container.filterDiv.inject(this.elements.container);

                var key = 'filter';
                this.elements.container[key] = UWA.createElement('div', {
                    'class': this.getClassNames('_display ' + key)
                });
                UWA.createElement('i', {
                    'class': this.getClassNames('_img wux-ui-3ds wux-ui-3ds-5x wux-ui-3ds-filter')
                }).inject(this.elements.container[key]);
                UWA.createElement('h5', {
                    'class': this.getClassNames('_txt font-3dsregular ' + key),
                    'text': nlsPADUtils.PADDropInvit_filter
                }).inject(this.elements.container[key]);
                this.elements.container[key].inject(this.elements.container.filterDiv);
                var dropFilterCB = function(e) {
                    count = 0;
                    this._dropFilterCB(e);
                }.bind(this);

                this.elements.container.filterDiv.addEventListener('dragover', function(event) {
                    event.dataTransfer.dropEffect = 'move';
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });

                this.elements.container.filterDiv.addEventListener('drop', dropFilterCB);
            } else {
                if (UWA.is(that.options.dropOnInvite, 'function')) {
                    this.elements.container.addEventListener('dragover', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    });
                    this.elements.container.addEventListener('drop', function(event) {
                        that.options.dropOnInvite(event);
                        return false;
                    });
                }
            }

            if (this.getOption('renderTo')) {
                this.elements.container.inject(this.getOption('renderTo'));
            }
        },


        _dropFilterCB: function(e) {
            e.preventDefault();
            e.stopPropagation(); // To avoid multi call on _internalAdd
            this.elements.container.removeClassName('withFilterOpen');
            this.elements.container.filterDiv.style.display = 'none';
            return false;

//            // IR-686319 Bug was exception for 2D which does not have publish method.
//            var context = PADContext.get();
//            if (context && context.publish) {
//                context.publish({
//                    event: 'onFilterDropped'
//                });
//            }
//
//            var unserialize = PADUtilsServices.deserializeDroppedData(e);
//            require(['DS/ApplicationFrame/CommandsManager'], function(CommandsManager) {
//                var command = CommandsManager.getCommand('FilterDropObjects', typeof context.getCommandContext === 'function' ? context.getCommandContext() : null);
//                if (command) {
//                    command.execute(unserialize);
//                } else {
//                    console.error('PADDnDInvite : _dropFilterCB() - The command PAD3DViewerFilterDropObjectsHdr is undefined');
//                }
//                this.hide();
//            }.bind(this));
//
//            return false;
        },


        _createDropHereInvite: function() {
            this.elements.container = UWA.createElement('div', {
                'class': this.getClassNames('_drop_here'),
                draggable: false
            });

            UWA.createElement('i', {
                'class': this.getClassNames('_img wux-ui-3ds wux-ui-3ds-4x wux-ui-3ds-drag-drop')
            }).inject(this.elements.container);
            UWA.createElement('h5', {
                'class': this.getClassNames('_txt drop_here'),
                'text': nlsPADUtils.PADDropInvit_drop_here
            }).inject(this.elements.container);

            if (this.getOption('renderTo')) {
                this.elements.container.inject(this.getOption('renderTo'));
            }
        },

        show: function(active_view) {
            switch (this.getMode()) {
                case 'none':
                    break;
                case 'drop_here':
                    if (active_view === 'drop') {
                        this.elements.container.show();
                        this.dispatchEvent('toggleInvite', true);
                    } else if (this.elements.container.getStyle('display') === 'block') {
                        this.elements.container.hide();
                        this.dispatchEvent('toggleInvite', true);
                    }
                    break;
                default:
                    if (this.options.active_invite !== active_view) {
                        if (!UWA.is(active_view, 'string')) {
                            this.options.active_invite = 'drop';
                        } else {
                            if (this.options.active_invite !== active_view && this.options.active_invite !== '') {
                                this.elements.container[this.options.active_invite].hide();
                            }
                            this.options.active_invite = active_view;
                        }

                        //For scenarios IR-601823-3DEXPERIENCER2018x and IR-596539-3DEXPERIENCER2018x
                        if (this.options.active_invite === 'drop') {
                            this.elements.container.informationDiv.style.pointerEvents = 'auto';
                        } else {
                            this.elements.container.informationDiv.style.pointerEvents = 'none';
                        }

                        this.elements.container[this.options.active_invite].show();
                        this.elements.container.show();
                        this.dispatchEvent('toggleInvite', true);
                    }
            }
        },

        hide: function(active_view) {
            //console.error(new Error('show me callstack'));
            switch (this.getMode()) {
                case 'none':
                    break;
                case 'drop_here':
                    if (this.elements.container.getStyle('display') === 'block') {
                        this.elements.container.hide();
                        this.dispatchEvent('toggleInvite', true);
                    }
                    break;
                default:
                    if (UWA.is(active_view, 'string')) {
                        if (this.options.active_invite !== '' && this.options.active_invite === active_view) {
                            this.elements.container[this.options.active_invite].hide();
                            this.elements.container.hide();
                        }
                    } else if (this.options.active_invite !== '') {
                        this.elements.container[this.options.active_invite].hide();
                        this.elements.container.hide();
                    }
                    this.options.active_invite = '';
                    this.dispatchEvent('toggleInvite', false);
            }
        },

        getMode: function() {
            //When we are in a web in win context, we don't want to see the drop invide as it's not supported inside the app switcher
            return /* PADWebInWinServices.isWebInWinContext() ? 'none' : */ this.options.mode;
        },

        isEventInside: function(e) {
            if (this.getMode() === 'none') {
                return false;
            }

            var pos = convertToPosition(e);
            if (!this.elements.container.isHidden()) {
                var containerRect = this.elements.container.getBoundingClientRect();
                if (isInside(pos, containerRect)) {
                    return true;
                }
            }

            return false;
        }
    });

    return PADDnDInvite;
});
});
