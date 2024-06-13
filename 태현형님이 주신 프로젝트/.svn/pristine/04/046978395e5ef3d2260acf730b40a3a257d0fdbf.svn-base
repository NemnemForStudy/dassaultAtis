/**!
* Made by BVO2 for DS on 5/24/16
*     require(['DELWebInfrastructure/Controls/Button' ],
        function (DELWebButton) {
            $(".opendata-button").each(function() {
                new DELWebButton({container:this});
            });
        }
    );
*/
(function ( $ ) {
    ($.fn.dsConvertToWebUX = function(){
        var that = this;

        //The part that changes the buttons
        require(['DS/DELWebInfrastructure/Controls/Button' ],
            function (DELWebButton) {
                that.find("button").each(function(index,button){
                    if (!$(button).hasClass("wux-controls-button") && !$(button).hasClass('wux-ui-3ds')){
                        var optionsObj = {container:button, label:$(button).html()};
                        if ($(button).hasClass('ui-button-text-icon-primary')&&!$(button).hasClass("ui-button")){
                            optionsObj.icon = ' ';
                        }
                        optionsObj.disabled = ($(button).is('[disabled]') || $(button).hasClass("ui-state-disabled"));
                        optionsObj.allowUnsafeHTMLLabel = $(button).hasClass('allowUnsafeHTMLLabel'); //in R422 by default this is false. Also by default, we do not have this class.
                        $(button).empty(); //R420 doesn't replace the old contents of the container.  So we will do it ourself.
                        var newWUX = new DELWebButton(optionsObj);
                        $(newWUX.elements.container).data('WUXButton',newWUX);
                    }
                });
            }
        );

        //The part that replaces the text inputs
        require(['DS/DELWebInfrastructure/Controls/LineEditor' ],
            function (DELWebLineEditor) {
                that.find("input[type='text']").each(function(index,lineEditor){
                    if (!$(lineEditor).parent().hasClass("wux-controls-lineeditor")){
                        var optionsObj = {container:lineEditor.parentElement};
                        if (lineEditor.placeholder){
                            optionsObj.placeholder = lineEditor.placeholder;
                        }
                        if (lineEditor.value){
                            optionsObj.value = lineEditor.value;
                        }
                        if (lineEditor.required){
                            optionsObj.requiredFlag = true;
                        }
                        var newWUX = new DELWebLineEditor(optionsObj);
                        $(newWUX.elements.container).data('WUXLineEditor',newWUX);
                    }
                });
            }
        );

        //The part that replaces the text areas
        require(['DS/DELWebInfrastructure/Controls/Editor' ],
            function (DELWebEditor) {
                that.find("textarea").each(function(index,editor){
                    if (!$(editor).parent().hasClass("wux-controls-editor")){
                        var optionsObj = {container:editor.parentElement};
                        if (editor.placeholder){
                            optionsObj.placeholder = editor.placeholder;
                        }
                        if (editor.value){
                            optionsObj.value = editor.value;
                        }
                        if (editor.required){
                            optionsObj.requiredFlag = true;
                        }
                        var newWUX = new DELWebEditor(optionsObj);
                        $(newWUX.elements.container).data('WUXEditor',newWUX);
                    }
                });
            }
        );

        //The part that replaces the NUMBER textfields
        require(['DS/DELWebInfrastructure/Controls/SpinBox' ],
            function (WUXSpinBox) {
                that.find("input[type='number']").each(function(index,numberEditor){
                    if (!$(numberEditor).parent().hasClass("wux-controls-spinbox")){
                        var optionsObj = {container:numberEditor.parentElement};
                        if (numberEditor.placeholder){
                            optionsObj.placeholder = numberEditor.placeholder;
                        }
                        if (numberEditor.value){
                            if (isNaN(numberEditor.value)) {
                                optionsObj.value = numberEditor.value;
                            } else {
                                optionsObj.value = parseFloat(numberEditor.value);
                            }
                        }
                        if (numberEditor.min && !isNaN(numberEditor.min)){
                            optionsObj.minValue = parseFloat(numberEditor.min);
                        }
                        if (numberEditor.max && !isNaN(numberEditor.max)){
                            optionsObj.maxValue = parseFloat(numberEditor.max);
                        }
                        if (numberEditor.step && !isNaN(numberEditor.step)){
                            optionsObj.stepValue = parseFloat(numberEditor.step);
                        }
                        var newWUX = new WUXSpinBox(optionsObj);
                        $(newWUX.elements.container).data('WUXSpinBox',newWUX);
                    }
                });
            }
        );

        //The part replaces the dom tooltip with the "title" attribute
        require(['DS/DELWebInfrastructure/Controls/Tooltip' ],
            function (DELWebTooltip) {
                that.find("[title]").each(function() {
                    var strTitle = $(this).attr("title");
                    $(this).removeAttr("title").attr("data-title",strTitle);
                    if (strTitle) { //make sure that it wasn't empty
                        this.tooltipFrame = new DELWebTooltip({
                                                                target:this, //tells the control where to add the event listeners
                                                                alignment: 'center', //horizontally align the tooltip
                                                                constraint: widget.body, //keep the tooltip positioned inside of this
                                                                longHelp: strTitle //actual text
                                                              });
                    }
                });
            }
        );

        //The part that replaces the checkboxes
        require(['DS/DELWebInfrastructure/Controls/Toggle' ],
            function (DELWebToggle) {
                that.find("input[type='checkbox']").each(function(index,checkbox){
                    if (!$(checkbox).parent().hasClass("wux-controls-checkbox")){
                        var optionsObj = {container:checkbox.parentElement};
                        if (checkbox.parentElement.nodeName.toUpperCase() === 'LABEL') {
                            optionsObj.label = $(checkbox.parentElement).text();

                            //reset the container
                            optionsObj.container = checkbox.parentElement.parentElement;

                            $(optionsObj.container).data('original_html',checkbox.parentElement);
                        } else {
                            $(optionsObj.container).data('original_html',checkbox);
                        }
                        if (checkbox.value){
                            optionsObj.value = checkbox.value;
                        }
                        if (checkbox.disabled){
                            optionsObj.disabled = checkbox.disabled;
                        }
                        if ($(checkbox).is(':checked')){
                            optionsObj.checkFlag = $(checkbox).is(':checked');
                        }

                        //remove the old DOM nodes now
                        $($(optionsObj.container).data('original_html')).remove(); //IE doesn't support .remove() of HTML elements, but it does of jQuery wrapped set ~ BVO2 1/3/19
                        var newWUX = new DELWebToggle(optionsObj);
                        $(newWUX.elements.container).data('WUXToggle',newWUX);
                    }
                });
            }
        );

        return that; //need to return something
    })
}(jQuery));
