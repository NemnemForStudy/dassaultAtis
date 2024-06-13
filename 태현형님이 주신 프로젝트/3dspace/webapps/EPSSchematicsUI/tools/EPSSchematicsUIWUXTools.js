/// <amd-module name='DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools'/>
define("DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", ["require", "exports", "DS/Controls/TooltipModel"], function (require, exports, WUXTooltipModel) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var UIWUXTools = /** @class */ (function () {
        function UIWUXTools() {
        }
        /**
         * This method creates a WUX tooltip.
         * @public
         * @static
         * @param {ITooltipOptions} options - The WUX tooltip options.
         * @returns {TooltipModel} The WUX tooltip.
         */
        UIWUXTools.createTooltip = function (options) {
            var hasTitle = options.title !== undefined && options.title !== '';
            var hasShortHelp = options.shortHelp !== undefined && options.shortHelp !== '';
            return new WUXTooltipModel({
                title: options.title || '',
                shortHelp: hasShortHelp ? (hasTitle ? options.shortHelp : '<b>' + options.shortHelp + '</b>') : '',
                longHelp: options.longHelp || '',
                shortToLongDelay: 1000,
                initialDelay: options.initialDelay || 0,
                reshowDelay: options.reshowDelay || 0,
                mouseRelativePosition: options.mouseRelativePosition || true,
                allowUnsafeHTMLTitle: true,
                allowUnsafeHTMLLongHelp: true,
                allowUnsafeHTMLShortHelp: true
            });
        };
        return UIWUXTools;
    }());
    return UIWUXTools;
});
