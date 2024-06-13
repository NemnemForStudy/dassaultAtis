/// <amd-module name='DS/EPSSchematicsUI/tools/EPSSchematicsUIFileSaver'/>
define("DS/EPSSchematicsUI/tools/EPSSchematicsUIFileSaver", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom"], function (require, exports, UIDom) {
    "use strict";
    /**
     * A file saver class allowing to save files.
     * @class UIFileSaver
     * @alias module:DS/EPSSchematicsUI/tools/EPSSchematicsUIFileSaver
     * @private
     */
    var UIFileSaver = /** @class */ (function () {
        function UIFileSaver() {
            this.anchor = UIDom.createElement('a', { style: { display: 'none' } });
        }
        /**
         * Saves the provided text content to a file.
         * @public
         * @param {string} textContent - The text content to be saved.
         * @param {string} fileName - The file name.
         */
        UIFileSaver.prototype.saveTextFile = function (textContent, fileName) {
            this.anchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent));
            this.anchor.setAttribute('download', fileName);
            document.body.appendChild(this.anchor);
            this.anchor.click();
            document.body.removeChild(this.anchor);
        };
        return UIFileSaver;
    }());
    return UIFileSaver;
});
