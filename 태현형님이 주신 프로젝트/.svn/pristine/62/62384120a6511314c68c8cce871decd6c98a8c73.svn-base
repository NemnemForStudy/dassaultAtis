/*global widget, define*/
define('DS/WebNoteWdg/WebNote',
    [
        // UWA
        'UWA/Core',

        'i18n!DS/WebNoteWdg/assets/nls/webNote',
        "css!DS/WebNoteWdg/WebNote"
    ],
    function (UWA, language) {
        'use strict';
        var WebNote = UWA.extend({

            elements: {},

            storeText: function () {
                var textReceived = WebNote.elements.textarea.value,
                    textModified;

                if (textReceived === language.typeText) {
                    textModified = "";
                } else {
                    textModified = textReceived.replace(/\r?\n/g, "$@n");
                }
                widget.setValue('text', textModified);
                WebNote.f.nodeValue = textReceived + '\n\n';
            },

            throttle: function (func, wait) {

                var timeout, result,
                    previous = 0;

                function later() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply();
                }
                return function () {

                    if (!UWA.is(timeout)) {
                        timeout = setTimeout(later, wait);
                    } else {
                        var now = new Date(),
                            remaining = wait - (now - previous);

                        if (remaining <= 0) {
                            clearTimeout(timeout);
                            timeout = null;
                            previous = now;
                            result = func.apply();
                        } else {
                            previous = now;
                            clearTimeout(timeout);
                            timeout = setTimeout(later, wait);
                        }
                    }
                    return result;
                };
            },

            resize: function () {
                var width = (widget.getViewportDimensions().width - 20);

                WebNote.elements.container.setStyles({'width': width });
            },

            setStyles: function () {
                var font = widget.getValue('font'),
                    fontSize = widget.getValue('fontSize');

                WebNote.elements.textarea.setStyles({'font-family' : font, 'font-size': fontSize});
            },

            setText: function (text) {
                WebNote.f.nodeValue = WebNote.elements.textarea.value = text;
            },

/*            onResetSearch: function () {
                WebNote.elements.text.setHTML(WebNote.convertTextToHTML(widget.getValue('text')).makeClickable());
            },*/

            onViewChange: function (event) {
                var width = (widget.getViewportDimensions().width - 20), height;
                if ((event.type !== 'fullscreen') && (event.type !== 'maximized')) {
                    height = WebNote.windowedHeight;
                } else {
                    if (UWA.is(event.height)) {
                        height = event.height;
                    }
                }

                WebNote.elements.container.setStyles({'width': width, 'height': height });
            },

            updateTitle: function () {
                var title = widget.getValue('title');

                if (title) {
                    widget.setTitle(title.escapeHTML());
                } else {
                    widget.setTitle("");
                }
            },

            load: function () {


                widget.body.addClassName('WebNote');

                var defaultText = language.typeText, text = widget.getValue('text') || defaultText,
                    height = (widget.getViewportDimensions().height / 2), width = (widget.getViewportDimensions().width - 20);

                WebNote.updateTitle();

                text = text.replace(/\$@n/g, '\n');

                widget.body.setStyle('padding', '0');
                widget.body.setStyle('padding-top', '10px');

                WebNote.elements.container = UWA.createElement('div', {
                    'class': 'wrapper'
                }).inject(widget.body.empty());

                WebNote.elements.container.setStyles({'width': width, 'height': height });
                WebNote.windowedHeight = height;

                WebNote.elements.textarea = UWA.createElement('textarea', {
                    'class': 'textareaField'
                }).inject(WebNote.elements.container);

                WebNote.elements.textarea.onkeypress = WebNote.elements.textarea.onkeyup = WebNote.elements.textarea.onchange = WebNote.throttle(WebNote.storeText, 250);
                WebNote.elements.textarea.onfocus = function () {
                    if (this.value === defaultText) {
                        WebNote.setText("");
                    }
                };
                WebNote.elements.textarea.onblur = function () {
                    if (this.value === "") {
                        WebNote.setText(defaultText);
                    }
                };

                /* In order to have a textarea doing an auto-resize upon entering text without jQuery, a trick is used. A TextNode is created with a css relative position.
                Thus the textNode is under the textarea css speaking and is not visible, but it will provide the mechanism for autoresize.
                */
                WebNote.f = document.createTextNode('');
                WebNote.elements.container.appendChild(WebNote.f);

                WebNote.setStyles();
                WebNote.setText(text);
            }
        });

        return WebNote;
    });
