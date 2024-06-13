/* COPYRIGHT DASSAULT SYSTEMES 2017
 * -----------------------------------------------------------------
 *
 *   Description :
 *   ------------
 *     Subject: This file is used to manage the properties panel component.
 *
 * -----------------------------------------------------------------
 *
 *   Story :
 *   -------
 *    Revision    /          Date      /        Author(s)    / Reasons for change
 *     0.1         /     Nov 01 2017   /       vlh2        / Initial revision.
 *     0.2         /     May 27 2018   /       mah2        / To manage 'editable' attribute
 *     0.3         /     Oct 31 2018   /       ruu1        / _lazyRender method modified to update all attr changed
 *     0.4         /     Jun 22 2020   /       XLV         / to ensure dropdown is reinstantiated on changes to actions.
 *     0.5         /     Nov 12 2020   /       SGG3        / to launch seperate triggers for model version, configuration and next gen filter.
 *     0.6         /     Mar 24 2021   /       vlh2        / correction of IR-840051-3DEXPERIENCER2021x
 *     0.7         /     Jun 28 2022   /       jbu4        / IR-958242-3DEXPERIENCER2022x : customize displayed attributes + image for attribute + menu webUX

 */

/**
 * @overview IDCard
 * @licence Copyright 2017 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
 define('DS/ENOXIDCard/js/IDCard', [
     'UWA/Core',
     'UWA/Class/View',
     'DS/Handlebars/Handlebars',
     'DS/ResizeSensor/js/ResizeSensor',
     'DS/UIKIT/DropdownMenu',
     'DS/Controls/ResponsiveThumbnailView',
     'DS/ENOXIDCard/IDCardDisplayedAttributes/js/IDCardDisplayedAttributes',
     'DS/Controls/TooltipModel',
     'DS/Menu/Menu',
     'text!DS/ENOXIDCard/html/IDCard.html',
     'text!DS/ENOXIDCard/html/AttributesPartial.html',
     'text!DS/ENOXIDCard/html/MinifiedAttributesPartial.html',
     'text!DS/ENOXIDCard/html/AttributeSectionPartial.html',
     'i18n!DS/ENOXIDCard/assets/nls/ENOXIDCard',
     'css!DS/ENOXIDCard/css/IDCard.css',
     'css!DS/UIKIT/UIKIT.css',
], function(UWA,UWAView, Handlebars, ResizeSensor, DropdownMenu, ResponsiveThumbnailView,IDCardDisplayedAttributes,WUXTooltipModel,WUXMenu, IDCardTemplate, AttributesPartial, MinifiedAttributesPartial, AttributeSectionPartial, NLSKeys) {
     'use strict';

    var idCardTemplate = Handlebars.compile(IDCardTemplate);
    var attributesTemplate = Handlebars.compile(AttributesPartial);
    var minifiedAttributesTemplate = Handlebars.compile(MinifiedAttributesPartial);
    Handlebars.registerPartial('Attributes', AttributesPartial);
    Handlebars.registerPartial('MinifiedAttributes', MinifiedAttributesPartial);
    Handlebars.registerPartial('AttributeSection', AttributeSectionPartial);

    var ENOXIDCard = UWAView.extend({

        name: 'xapp-id-card',

        className: function () {
            return this.getClassNames('-container');
        },

        domEvents: {
            'click .sidebar-home-icon': '_triggerHomeIconEvent',
            'click .sidebar-back-icon': '_triggerBackIconEvent',
            'click .sidebar-expand-collapse-icon': '_triggerExpandCollapseIconEvent',
            'click .version': '_triggerVersionExplorerEvent',
            'click .versionModel': '_triggerVersionModelExplorerEvent',
            'click .configuration': '_triggerConfigurationEvent',
            'click .ngfilter': '_triggerNGFilterEvent',
            'click .modelVersion': '_triggerModelVersionEvent',
            'click .actions-menu-icon': '_triggerOpenActionsMenuIconEvent',
            'click .information-icon': '_triggerInformationIconEvent',
            'click .generic-icon': '_triggerGenericIconEvent',
            'click .toggle-minified-icon': 'toggleMinified',
            'click .attribute-value': '_triggerClickOnAttributeEvent',
            'click .thumbnail': '_triggerClickOnThumbnail'
        },

        setup: function () {
            var that = this;

            // Get model events object
            that.modelEvents = that.model.get('modelEvents');
            that.modelEventsTokens = [];

            // user can manage displayed attributes in IDCard with the option fullListAvailableAttributes
            var fullListAvailableAttributes = that.model.get('fullListAvailableAttributes');
            if(fullListAvailableAttributes && fullListAvailableAttributes.length>0){
                that._manageIDAttributes(that.model.get('fullListAvailableAttributes'));
                that.IDCardDisplayedAttributes = new IDCardDisplayedAttributes({model : that.model});
            }
            else{
              that._manageIDAttributes(that.model.get('attributes'));
            }

            // Check if attributes were passed and parsed it into two columns
            var attributesByColumn = that._parseAttributes(that.model.get('attributes'));

            // Create options object for handlebars template
            that.templateOptions = {
                withHomeButton: (that.model.get('withHomeButton') !== undefined) ? that.model.get('withHomeButton') : false,
                withExpandCollapseButton: (that.model.get('withExpandCollapseButton') !== undefined) ? that.model.get('withExpandCollapseButton') : false,
                withActionsButton: (that.model.get('withActionsButton') !== undefined) ? that.model.get('withActionsButton') : true,
                withInformationButton: (that.model.get('withInformationButton') !== undefined) ? that.model.get('withInformationButton') : false,
                withGenericButton : (that.model.get('withGenericButton') !== undefined) ? that.model.get('withGenericButton') : false,
                withToggleMinifiedButton: (that.model.get('withToggleMinifiedButton') !== undefined) ? that.model.get('withToggleMinifiedButton') : false,
                showBackButton: (that.model.get('showBackButton') !== undefined) ? that.model.get('showBackButton') : false,
                thumbnail: that.model.get('thumbnail'),
                name: that.model.get('name'),
                version: that.model.get('version'),
                versionModel: that.model.get('versionModel'),
                configuration: that.model.get('configuration'),
                ngfilter: that.model.get('ngfilter'),
                modelVersion: that.model.get('modelVersion'),
                attributes: attributesByColumn,
                // dropdown option can have UIKIT menu options ({items : [], events : {}) or WebUX menu options ({content : [], callbacks : {}})
                dropdown: (that.model.get('dropdown') !== undefined) ? that.model.get('dropdown') : false,
                freezones: that.model.get('freezones'),
                minified: that.model.get('minified'),
                nls: NLSKeys,
            };

            // if no customEvents object passed, create empty one in the model
            if (that.model.get('customEvents') === undefined) {
                that.model.set('customEvents', {});
            }

            // Listen on model change and and 'lazy render' the changes (have to used and store a named function to remove the listener during destroy)
            that.modelOnChangeListener = function (e) {
                that._lazyRender(e._changed);
            };
            that.model.addEvent('onChange', that.modelOnChangeListener);
            that.model.addEvent('onChange:fullListAvailableAttributes', function(e){
                that._manageIDAttributes(that.model.get('fullListAvailableAttributes'));
                that.modelEvents.publish({event: 'change-values-fullListAvailableAttributes'});
            });

            // Listen on minify, expand and toggle events
            that.modelEventsTokens.push(that.modelEvents.subscribe({event: 'idcard-minify'}, function () {
                that.minify();
            }));
            that.modelEventsTokens.push(that.modelEvents.subscribe({event: 'idcard-expand'}, function () {
                that.expand();
            }));
            that.modelEventsTokens.push(that.modelEvents.subscribe({event: 'idcard-toggle-minified-view'}, function () {
                that.toggleMinified();
            }));
            that.modelEventsTokens.push(that.modelEvents.subscribe({event: 'idcard-toggle-information-icon'}, function (data) {
                that.toggleInformationIcon(data);
            }));
            that.modelEventsTokens.push(that.modelEvents.subscribe({event: 'idcard-change-thumbnail'}, function (src) {
                that.changeThumbnail(src);
            }));

            // Listen on triptych 'show' and 'hide' panel and toggle information icon active status
            that.modelEventsTokens.push(that.modelEvents.subscribe({event: 'triptych-panel-visible'}, function (data) {
                if (data === 'right') {
                    that.toggleInformationIcon(true);
                }
            }));
            that.modelEventsTokens.push(that.modelEvents.subscribe({event: 'triptych-panel-hidden'}, function (data) {
                if (data === 'right') {
                    that.toggleInformationIcon(false);
                }
            }));
            that.modelEventsTokens.push(that.modelEvents.subscribe({event: 'idcard-minified'}, function () {
                that.manageMaturityAttribute(that.model.get('attributes'));
            }));
            that.modelEventsTokens.push(that.modelEvents.subscribe({event: 'idcard-expanded'}, function () {
                that.manageMaturityAttribute(that.model.get('attributes'));
            }));

        },

        render: function () {
            var that = this;

            // Create basic HTML structure from template
            that.container.setHTML(idCardTemplate(that.templateOptions));

            // If no home button and no expand / collapse button, hide the related container
            if (!that.templateOptions.withHomeButton && !that.templateOptions.withExpandCollapseButton && !that.templateOptions.showBackButton) {
                that.container.addClassName('no-sidebar-buttons');
                that.container.getElement('.sidebar-buttons').addClassName('hidden');
            } else {
                var numberOfSidebarButtons = 0;
                if (that.templateOptions.withHomeButton) ++numberOfSidebarButtons;
                if (that.templateOptions.withExpandCollapseButton) ++numberOfSidebarButtons;
                if (that.templateOptions.showBackButton) ++numberOfSidebarButtons;
                that.container.setAttribute('data-nb-sidebar-buttons', numberOfSidebarButtons);
            }

            // If dropdown has been passed (and withActions button is at true), create a UIKIT dropdown menu on the action button element
            if (that.templateOptions.withActionsButton && that.templateOptions.dropdown) {
                // UIKIT menu if property items exists
                if(that.templateOptions.dropdown.items){
                    that.templateOptions.dropdown.target = that.container.getElement('.actions-menu-icon');
                    that._dropdownMenu = new DropdownMenu(that.templateOptions.dropdown);
                }
            }

            // Rendering freezones
            var freezones = that.model.get('freezones');
            if (freezones !== undefined && freezones.length > 0) {
                freezones.forEach(function (freezone, idx) {
                    var freezoneElt = that.container.getElement('.free-zone-' + idx);

                    if (typeof freezone === 'string') {
                        freezoneElt.innerHTML = freezone;    // User has passed plain HTML : we use innerHTML
                    } else if (freezone instanceof HTMLElement) {
                        freezoneElt.appendChild(freezone);    // User has passed an HTML element : we use appendChild
                    } else if (freezone.render !== undefined) {
                        freezone.render().inject(freezoneElt);    // User has passed an UWA.Class.View (TODO : better way to detect UWA.Class.View?) : we inject it and call render
                    }
                });
            }

            // Apply responsive design
            this.requestID =   window.requestAnimationFrame(function () {
                that.resize();
            });

            // Apply minified at render if corresponding option is set to true
            if (that.model.get('minified')) {
                that.container.addClassName('minified');
            }

            // Apply dragwithimage
            if(that.model.get('dragwithimage') !== undefined) {
                that.container.setAttribute('draggable','true');
                that.container.addClassName('draggable');
                var img = that.model.get('dragwithimage').img;
                if(!UWA.is(img)) {
                    img = new ResponsiveThumbnailView({
                        picture: that.model.get('thumbnail'),
                        icon : that.model.get('thumbnail'),
                        title : that.model.get('name') + ' ' + that.model.get('version'),
                        multipleTitleLineNumber: false,
                        subtitle : that.model.get('attributes').reduce(function(string, item){
                            if(string.length > 0 ) return string + ', ' + item.name + ': ' + item.value;
                            else return item.name + ': ' + item.value;
                        }),
                        description : that.model.get('description')
                    }).inject(document.body).getContent();
                    //R14: IR-810186-3DEXPERIENCER2021x => hide thumbnail.
                    img.setStyle('position','absolute');
                    img.setStyle('top','-1000000px');
                }

      //************** target initialized ***********************//
                let targetClicked ; //first we get the target element
                that.container.addEventListener("mousedown",function(evt){
                  targetClicked = evt.target;
                });
                that.container.addEventListener("touchstart",function(evt){
                  targetClicked = evt.target;
                });
      //************** if target is a attribute-section
                that.container.addEventListener("dragstart", function(e) {

                  let sectionTag = 'SECTION';

                  //data is contained inside section tags
                  if(targetClicked.tagName == sectionTag){
                    e.preventDefault()
                    return;
                  }

                    e.dataTransfer.setDragImage(img, 0, 0);
                    var dragData = {
                        protocol: "3DXContent",
                        version: "1.1",
                        source: widget.getValue('appId'),
                        widget_id: widget.id,
                        data: {
                            items: [that.model.get('dragwithimage').item]
                        }
                    };
                    e.dataTransfer.setData("Text", JSON.stringify(dragData));
                }, false);

            }
            that.manageMaturityAttribute(that.model.get('attributes'));
            if(!that.model.get("useBrowserTooltip")) that._createTooltipWebUX();

            return that;
        },

        _lazyRender: function (attributesChanged) {
            var that = this, keys = Object.keys(attributesChanged), elt;
            keys.forEach(function(key){
                var value = attributesChanged[key];

                if (key === 'name' || key === 'version' || key === 'versionModel' || key === 'configuration' || key === 'modelVersion' || key === 'ngfilter') {
                    elt = that.container.getElement('.' + key);
                    elt.textContent = value;
                    elt.title = value;
                    // manage space between all elements in title
                    if(value){
                        if(elt.previousSibling && elt.previousSibling.textContent!==String.fromCharCode(160)){
                            elt.before("\u00A0");
                        }
                    }else{
                        if(elt.previousSibling && elt.previousSibling.textContent===String.fromCharCode(160)){
                            elt.previousSibling.remove();
                        }
                    }
                } else if (key === 'thumbnail') {
                    that.container.getElement('.thumbnail').src = value;
                } else if (key === 'attributes') {
                    var attributesByColumn = that._parseAttributes(value);
                    that.container.getElement('.attributes-placeholder').innerHTML = attributesTemplate({attributes: attributesByColumn});
                    that.container.getElement('.attributes-section-when-minified-container').innerHTML = minifiedAttributesTemplate({attributes: attributesByColumn});
                    that.manageMaturityAttribute(value);
                } else if (key === 'freezones') {
                    that.container.getElement('.free-zone-0').innerHTML = value[0];
                } else if (key === 'showBackButton') {
                    if (value) {
                        that.container.getElement('.sidebar-back-icon').removeClassName('hidden');
                    } else {
                        that.container.getElement('.sidebar-back-icon').addClassName('hidden');
                    }
                } else if(key === 'dropdown' && that.templateOptions.withActionsButton) {
                    //ensure cleanup of existing dropdown

                    if(that._dropdownMenu) {
                        that._dropdownMenu.destroy();
                    }
                    // UIKIT menu if property items exists
                    if(value.items){
                        //instantiate new dropdown
                        var target = that.container.getElement('.actions-menu-icon');
                        if(target) {
                            value.target = target;
                            that._dropdownMenu = new DropdownMenu(value);
                        }
                    }
                }
                if(!that.model.get("useBrowserTooltip")) that._createTooltipWebUX();
            });
            that.resize();    // Trigger resize event for responsiveness
        },
        /**
        attachResizeSensor must be called after the container is added in the DOM
        */
        attachResizeSensor: function () {
            var that = this;
            that.resizeSensor = new ResizeSensor(that.container, function () {
                that.resize();
            });
        },

        resize: function () {
            var that = this;
            var width = that.container.offsetWidth;

            var titleSection=that.container.getElement('.title-section');
            if (width < 640) {
                titleSection.addClassName('smaller-font-size');
            }else{
                titleSection.removeClassName('smaller-font-size');
            }

            // manage the max size of the title with a small viewport
            // with big viewport, we prefer to display the title instead of attributes if the place is restricted
            // with small viewport, we prefer to display attributes instead  of full title if the place is restricted
            if (width < 500) {
                titleSection.addClassName('smaller-viewpoint');
            }else{
                titleSection.removeClassName('smaller-viewpoint');
            }

           var lowerMainSectionWidth=that.container.getElement('.lower-main-section') ? that.container.getElement('.lower-main-section').offsetWidth : 0;
           var columnWidth=that.container.getElement('.attribute-columns[data-column-index="0"]') ? that.container.getElement('.attribute-columns[data-column-index="0"]').offsetWidth : 0;

            // Check overflow for attributes
            if (that.container.hasClassName('minified')) {
                that._checkMinifiedAttributesOverflow();
            } else {
                that._checkAttributesOverflow();
            }

            // manage the max size of the title with a small viewport when all attributes are hidden
            // when attributes cannot be displayed because the place is restricted, we can display full title
            var minifiedAttributeSectionsContainer = that.container.getElement('.attributes-section-when-minified-container');
            var minifiedAttributeSections = minifiedAttributeSectionsContainer.getElements('.attribute-section');
            if(minifiedAttributeSections[0] && minifiedAttributeSections[0].hasClassName('hidden')){
                titleSection.removeClassName('smaller-viewpoint');
            }

            // hide attributes columns that are empty
            that.container.getElements('.attribute-columns').forEach(function (elt) {
                if(elt.childNodes.length===0){
                    elt.addClassName('hidden');
                }else{
                    elt.removeClassName('hidden');
                }
            });

            var attributePlaceholderWidth=that.container.getElement('.attributes-placeholder') ? that.container.getElement('.attributes-placeholder').offsetWidth : 0;
            var limitFreeZone0= attributePlaceholderWidth+230 + 15 + 5 ; // free zone width =230 margin left = 15 + 5 just in case
            var limitFreeZone1= attributePlaceholderWidth+230*2 + 15 + 5 ;

            // hide the freezone when the freezone begin to be covered
            if (lowerMainSectionWidth < limitFreeZone1) {
                that.container.getElement('.free-zone-1').addClassName('hidden');
            } else {
                that.container.getElement('.free-zone-1').removeClassName('hidden');
            }

            if (lowerMainSectionWidth < limitFreeZone0) {
                that.container.getElement('.free-zone-0').addClassName('hidden');
            } else {
                that.container.getElement('.free-zone-0').removeClassName('hidden');
            }

            // Hide thumnail at 868px
            if (width < 868) {
                that.container.addClassName('no-image-placeholder');
                that.container.getElement('.image-placeholder').addClassName('hidden');
            } else {
                that.container.removeClassName('no-image-placeholder');
                that.container.getElement('.image-placeholder').removeClassName('hidden');
            }

            // hide the attributes column when it begin to be covered
            // we need to do this after managing the displaying of freezones
            that.container.getElements('.attribute-columns').forEach(function (elt) {
                if(elt.childNodes.length!==0){
                    var indexColumAttr=parseInt(elt.getAttribute("data-column-index"));
                    if(indexColumAttr!==0){
                        var limitColumnAttr=columnWidth*(indexColumAttr+1);
                        if(lowerMainSectionWidth<limitColumnAttr){
                            elt.addClassName('hidden');
                        } else {
                            elt.removeClassName('hidden');
                        }
                    }
                }
            });
        },

        minify: function () {
            if (!this.container.hasClassName('minified')) {
                this.container.addClassName('minified');
                var toggleMinifiedIcon = this.container.querySelector('.toggle-minified-icon');
                if (toggleMinifiedIcon !== null) {
                    toggleMinifiedIcon.classList.remove('fonticon-expand-up');
                    toggleMinifiedIcon.classList.add('fonticon-expand-down');
                    if(this.model.get("useBrowserTooltip")){
                        toggleMinifiedIcon.title = NLSKeys.expand;
                    }else{
                        var tooltip=new WUXTooltipModel({
                            shortHelp: NLSKeys.expand
                        });
                        toggleMinifiedIcon.tooltipInfos=tooltip;
                    }
                }
                this.modelEvents.publish({event: 'idcard-minified'});
            }
        },

        expand: function () {
            if (this.container.hasClassName('minified')) {
                this.container.removeClassName('minified');
                var toggleMinifiedIcon = this.container.querySelector('.toggle-minified-icon');
                if (toggleMinifiedIcon !== null) {
                    toggleMinifiedIcon.classList.remove('fonticon-expand-down');
                    toggleMinifiedIcon.classList.add('fonticon-expand-up');
                    if(this.model.get("useBrowserTooltip")){
                        toggleMinifiedIcon.title = NLSKeys.expand;
                    }else{
                        var tooltip=new WUXTooltipModel({
                            shortHelp: NLSKeys.collapse
                        });
                        toggleMinifiedIcon.tooltipInfos=tooltip;
                    }
                }
                this.modelEvents.publish({event: 'idcard-expanded'});
            }
        },

        toggleMinified: function () {
            if (this.container.hasClassName('minified')) {
                this.expand();
            } else {
                this.minify();
            }
        },

        toggleInformationIcon: function (active) {
            var informationIcon = this.container.getElement('.information-icon');

            if (informationIcon !== null) {
                if (active === undefined || active === null) {
                    informationIcon.classList.toggle('active');
                } else if (active) {
                    informationIcon.classList.add('active');
                } else {
                    informationIcon.classList.remove('active');
                }
            }
        },

        changeThumbnail: function (srcimage) {
            if (this.container.getElement('.thumbnail')) {
                this.container.getElement('.thumbnail').src = srcimage;
                this.modelEvents.publish({event: 'idcard-thumbnail-changed', data: srcimage});
            }
        },

        destroy: function () {
            var that = this;

            // Clean all listeners, remove ResizeSensor and then call this._parent()
            that.model.removeEvent('onChange', that.modelOnChangeListener);
            that.modelEventsTokens.forEach(function (token) {
                that.modelEvents.unsubscribe(token);
            });
            if (that.resizeSensor) {
                that.resizeSensor.detach(this.container);
            }
            if(that.IDCardDisplayedAttributes){
              that.IDCardDisplayedAttributes.destroy();
            }
            WUXMenu.hide();
            window.cancelAnimationFrame(this.requestID);
            this._parent();
        },

        /**
         * Check (in Javascript), how many attributes we can display witout overflow (CSS text-overflow has strange behavior across browsers)
         * Didn't find a way to make it with pure CSS (even with Flexbox), at least it'll work same way on Chrome, Firefox and IE
         */
         _checkAttributesOverflow: function () {
             var that = this;
             that.container.getElements('.attributes-placeholder .attribute-section').forEach(function (elt) {
                 // Add a CSS-defined width on 'attribute-value' then apply text-overflow on it
                 var attrValueElt = elt.getElement('.attribute-value');
                 if (attrValueElt !== null) {
                     attrValueElt.style.width = (elt.offsetWidth - elt.getElement('.attribute-name').offsetWidth - 21) + 'px';
                     attrValueElt.style.overflow = 'hidden';
                     attrValueElt.style.textOverflow = 'ellipsis';
                 }
             });
         },

        /**
         * Same method as previous one but for minified mode
         */
        _checkMinifiedAttributesOverflow: function () {
            var that = this;

            var minifiedAttributeSectionsContainer = that.container.getElement('.attributes-section-when-minified-container');
            var minifiedAttributeSections = minifiedAttributeSectionsContainer.getElements('.attribute-section');

            // Remove all previously added 'hidden' classes
            for (var k = 0; k < minifiedAttributeSections.length; k++) {
                minifiedAttributeSections[k].removeClassName('hidden');
            }

            // Check if there is an overflow; early exit if not
            if (minifiedAttributeSectionsContainer.scrollWidth <= minifiedAttributeSectionsContainer.offsetWidth) {
                return;
            }

            // Now, select all attributes section and check how many we can display before overflowing
            var addedAttributeSectionsWidth = 0;
            for (var i = 0; i < minifiedAttributeSections.length; i++) {
                addedAttributeSectionsWidth += minifiedAttributeSections[i].offsetWidth;
                if (addedAttributeSectionsWidth > minifiedAttributeSectionsContainer.offsetWidth) {
                    minifiedAttributeSections[i].addClassName('hidden');
                }
            }
        },

        _triggerHomeIconEvent: function () {
            this.modelEvents.publish(this.model.get('customEvents').homeIconClick || {event: 'idcard-show-landing-page'});
        },

        _triggerConfigurationEvent: function () {
            this.modelEvents.publish(this.model.get('customEvents').configurationLabelClick || {event: 'idcard-open-configuration-selector'});
        },

        _triggerNGFilterEvent: function () {
            this.modelEvents.publish(this.model.get('customEvents').ngfilterLabelClick || {event: 'idcard-open-ngfilter-selector'});
        },

        _triggerModelVersionEvent: function () {
            this.modelEvents.publish(this.model.get('customEvents').modelVersionLabelClick || {event: 'idcard-open-modelVersion-selector'});
        },

        _triggerBackIconEvent: function () {
            this.modelEvents.publish(this.model.get('customEvents').backIconClick || {event: 'idcard-back'});
        },

        _triggerExpandCollapseIconEvent: function () {
            this.modelEvents.publish(this.model.get('customEvents').expandCollapseIconClick || {event: 'welcome-panel-toggle'});
        },

        _triggerVersionExplorerEvent: function () {
            this.modelEvents.publish(this.model.get('customEvents').versionLabelClick || {event: 'idcard-open-version-explorer', data: {id: this.model.get('id')}});
        },

        _triggerVersionModelExplorerEvent: function () {
            this.modelEvents.publish(this.model.get('customEvents').versionModelLabelClick || {event: 'idcard-open-version-explorer', data: {id: this.model.get('id')}});
        },

        _triggerOpenActionsMenuIconEvent: function (evt) {
            this.modelEvents.publish(this.model.get('customEvents').actionsMenuClick || {event: 'idcard-open-actions-menu'});

            // if dropdown menu for WebUX
            if(this.model.get('dropdown') && this.model.get('dropdown').content ){
                var rect=this.container.getElement('.actions-menu-icon').getBoundingClientRect();
                var config ={
                  position: {
                      x: rect.left,
                      y: rect.bottom
                    }
                };
                WUXMenu.show(this.model.get('dropdown').content, config,this.model.get('dropdown').callbacks);
            }
        },

        _triggerInformationIconEvent: function () {
            this.modelEvents.publish(this.model.get('customEvents').informationIconClick || {event: 'triptych-toggle-panel', data: 'right'});
        },

        _triggerGenericIconEvent: function (eventOptions) {
            this.modelEvents.publish({event: 'custom-generic-icon-event', data: eventOptions});
        },

        _triggerClickOnAttributeEvent: function (e) {
            this.modelEvents.publish({
                event : 'idcard-attributes-clicked',
                data : {
                    index : parseInt(e._uwaTarget.parentElement.getAttribute('data-attribute-index'), 10),
                    attributeName : e._uwaTarget.parentElement.querySelector('.attribute-name').innerHTML
                }
            });
        },

        _triggerClickOnThumbnail: function () {
            this.modelEvents.publish({ event: 'idcard-thumbnail-clicked', data: null});
        },

        /**
         * Parse attributes, split into two columns and add a unique index
         */
        _parseAttributes: function (attrs) {
            // Check if attributes were passed and parsed it into two columns
            var attributesByColumn = [], uniqueIDAttribute = 0;
            if (attrs !== undefined) {
                attributesByColumn = [attrs.slice(0, 3), attrs.slice(3, 6),attrs.slice(6, 9),attrs.slice(9, 12)];
                attributesByColumn.forEach(function (attrColumn) {
                    attrColumn.forEach(function (attr) {
                        attr.index = uniqueIDAttribute++;
                    });
                });
            }
            return attributesByColumn;
        },
        /**
        * @method _manageIDAttributes manage id for attributes
        * @param {Array} attrs list of attributes
        */
        _manageIDAttributes : function (attrs){
            var that=this;
            if(attrs){
                attrs.forEach((attr, index) => {
                    if(!that.model.get("useBrowserTooltip")){
                        // need an id to manage webux tooltip
                        if(!attr.id){
                            // create an id from the name of the attribute
                            attr.id = attr.name.replace(/[^A-Z0-9_-]/ig, "_").replace(/[\.:]/ig, "_")+index;
                        }
                        else if(/[^A-Z0-9_-]/ig.test(attr.id) || /[\.:]/ig.test(attr.id) ){
                            // verify if the id is correct for using it in the DOM
                            attr.id = attr.id.replace(/[^A-Z0-9_-]/ig, "_").replace(/[\.:]/ig, "_");
                        }
                    }else if(attr.isMaturity && !attr.id){
                        // need an id on the attribute to manage maturity in the IDCard
                        attr.id="maturity"+index;
                    }
                });
            }
        },
        /**
        * @method _createTooltipWebUX create webUX tooltips instead of browser tooltips
        */
        _createTooltipWebUX : function(){
            var that = this;

            if(that.model.get('attributes')){
                that.model.get('attributes').forEach((attribute, i) => {
                    var containerCollapsed, containerExpanded;
                    if(!attribute.container){
                        var tooltip=new WUXTooltipModel({
                            shortHelp: attribute.value
                        });
                        if(attribute.displayWhenMinified){
                            containerCollapsed = that.container.getElements("#"+attribute.id)[0];
                            if(containerCollapsed){
                                containerCollapsed.title="";
                                containerCollapsed.tooltipInfos=tooltip;
                            }
                            containerExpanded = that.container.getElements("#"+attribute.id)[1];
                            if(containerExpanded){
                                containerExpanded.title="";
                                containerExpanded.tooltipInfos=tooltip;
                            }
                        }
                        else{
                            containerExpanded = that.container.getElements("#"+attribute.id)[0];
                            if(containerExpanded){
                                containerExpanded.title="";
                                containerExpanded.tooltipInfos=tooltip;
                            }
                        }
                    }
                });
            }

            var sidebarButtons = that.container.getElements(".sidebar-buttons > div ");
            sidebarButtons.forEach((buttonContainer, i) => {
                createWebUXTooltipFromTitle(buttonContainer);
            });
            var titleSectionButtons = that.container.getElements(".title-section-buttons > span ");
            titleSectionButtons.forEach((buttonSectionContainer, i) => {
                createWebUXTooltipFromTitle(buttonSectionContainer);
            });
            var titleSection = that.container.getElements(".title-section > section ");
            titleSection.forEach((sectionContainer, i) => {
                createWebUXTooltipFromTitle(sectionContainer);
            });
            var freezones = that.container.getElements(".free-zone *");
            freezones.forEach((freezone, i) => {
                createWebUXTooltipFromTitle(freezone);
            });

            function createWebUXTooltipFromTitle(container){
                if(container.title){
                    var tooltip=new WUXTooltipModel({
                        shortHelp: container.title
                    });
                    container.tooltipInfos=tooltip;
                    container.title="";
                }
            }
        },
        /**
        * @method buildMaturityBadge - create a maturity badge for maturity attribute
        * @param {String} id id of the attribute
        * @param {boolean} displayWhenMinified true if the attribute is displayed when the idcard is minified, false if not
        */
        buildMaturityBadge: function (id,displayWhenMinified) {
          var that = this;
          let maturityContainer = that.getAttributeContainer(id,displayWhenMinified);
          if(maturityContainer) {
            maturityContainer.innerHTML="";
            maturityContainer.addClassName("maturity-container");
            var requiredMods=['DS/MaturityCompactView/MaturityCompactView','css!DS/MaturityCompactView/MaturityCompactView.css'];
            require(requiredMods,function(MaturityCompactView){
                var options ={"SecurityContext": that.model.get('securityContext')};
                that.maturityCmd = new MaturityCompactView(widget,null,options,that.model.get('id'));
                that.maturityCmd.inject(maturityContainer);
            })
        }
        },
        /**
        * @method getAttributeContainer - find the container of an attribute in the IDCard
        * @param {String} id id of the attribute
        * @param {boolean} displayWhenMinified true if the attribute is displayed when the idcard is minified, false if not
        * @return {Element} the container of the attribute
        */
        getAttributeContainer: function(id,displayWhenMinified){
            var that = this;

            var containerCollapsed, containerExpanded;

            if(displayWhenMinified){
                containerCollapsed = that.container.getElements("#"+id)[0];
                containerExpanded = that.container.getElements("#"+id)[1];
            }
            else{
                containerExpanded = that.container.getElements("#"+id)[0];
            }
            if(that.container && that.container.hasClassName("minified")) {
                return containerCollapsed;
            }
            else {
                return containerExpanded;
            }
        },


        /**
        * @method manageMaturityAttribute - build a maturity badge for attribute wanted
        * @param {Array} attributes list of attributes displayed in the IDCard
        */
        manageMaturityAttribute : function (attributes){
          var that=this;
          if(attributes){
              attributes.forEach((attribute, i) => {
                if(attribute.isMaturity){
                  that.buildMaturityBadge(attribute.id, attribute.displayWhenMinified);
                }
              });
          }
      }

    });

    return ENOXIDCard;
});
