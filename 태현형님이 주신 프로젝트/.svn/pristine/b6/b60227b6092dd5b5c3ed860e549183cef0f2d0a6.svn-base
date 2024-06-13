(window.create_dsDialogFN = function($) {
    if(!$.ui || !$.ui.dialog) {
        setTimeout(function() { window.create_dsDialogFN($); }, 50);
        return;
    }
    $.widget( "custom.dsDialog", $.ui.dialog, {
        _create: function() {
    		// Invoke the parent widget's _create so that the dialog is created already
    		this._super();

            //Then Set up the DS styles;
    		this.uiDialog.addClass("wux-controls-abstract wux-windows-window wux-windows-dialog dsDialog");
    		this.uiDialog.addClass("wux-controls-abstract wux-windows-window wux-windows-dialog dsDialog");
    		this.uiDialog.find(".ui-dialog-titlebar").addClass("wux-windows-window-titlebar");


    		this.uiDialog.find(".ui-widget-content").addClass("dsDialog-Content");
    		this.uiDialog.find(".ui-dialog-titlebar-close")
    						.addClass("wux-windows-window-header-button wux-windows-window-header-close wux-ui-fa wux-ui-fa-times");

            return this;
        }
    });
})(jQuery);
