/// <amd-module name='DS/CSIExecutionGraphUI/controllers/CSIEGUIBlockConverterController'/>
define("DS/CSIExecutionGraphUI/controllers/CSIEGUIBlockConverterController", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsJSONConverter", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsCoreLibrary/flow/EPSSyncFlowsBlock"], function (require, exports, SchematicsJSONConverter, Tools, SyncFlowsBlock) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the CSI Execution Graph UI block converter controller.
     * @class CSIEGUIBlockConverterController
     * @alias module:DS/CSIExecutionGraphUI/controllers/CSIEGUIBlockConverterController
     * @private
     */
    var CSIEGUIBlockConverterController = /** @class */ (function () {
        function CSIEGUIBlockConverterController() {
        }
        /**
         * Registers the block converters.
         * @public
         * @static
         */
        CSIEGUIBlockConverterController.registerBlockConverters = function () {
            SchematicsJSONConverter.addBlockConverter('2.0.5', Tools.WaitAllBlockUid, SyncFlowsBlock.prototype.uid, this._convertWaitAllBlock);
        };
        /**
         * The Wait All block converter.
         * @private
         * @static
         * @param {Block} iOldBlock - The old block.
         * @param {Block} oNewBlock - The new block.
         * @param {ControlPort[]} ioLinkedControlPort - The list of linked control ports.
         */
        CSIEGUIBlockConverterController._convertWaitAllBlock = function (iOldBlock, oNewBlock, ioLinkedControlPort) {
            var jsonObject = {};
            iOldBlock.toJSON(jsonObject);
            oNewBlock.fromJSON(jsonObject);
        };
        return CSIEGUIBlockConverterController;
    }());
    return CSIEGUIBlockConverterController;
});
