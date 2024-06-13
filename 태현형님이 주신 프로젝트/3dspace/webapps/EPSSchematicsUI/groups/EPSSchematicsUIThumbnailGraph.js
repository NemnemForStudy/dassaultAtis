/// <amd-module name='DS/EPSSchematicsUI/groups/EPSSchematicsUIThumbnailGraph'/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("DS/EPSSchematicsUI/groups/EPSSchematicsUIThumbnailGraph", ["require", "exports", "DS/EPSSchematicsUI/groups/EPSSchematicsUIGroup"], function (require, exports, UIGroup) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI thumbnail graph.
     * @class UIThumbnailGraph
     * @alias module:DS/EPSSchematicsUI/groups/EPSSchematicsUIThumbnailGraph
     * @extends UIGroup
     * @private
     */
    var UIThumbnailGraph = /** @class */ (function (_super) {
        __extends(UIThumbnailGraph, _super);
        /**
         * @constructor
         * @param {UIThumbnailViewer} viewer - The thumbnail viewer.
         * @param {GraphBlock} model - The graph block model.
         */
        function UIThumbnailGraph(viewer, model) {
            var _this = _super.call(this, viewer) || this;
            _this.model = model;
            return _this;
        }
        /**
         * Gets the graph block model.
         * @public
         * @returns {GraphBlock} The graph block model.
         */
        UIThumbnailGraph.prototype.getModel = function () {
            return this.model;
        };
        /**
         * The callback on the UI change event.
         * @public
         */
        // eslint-disable-next-line class-methods-use-this
        UIThumbnailGraph.prototype.onUIChange = function () { };
        return UIThumbnailGraph;
    }(UIGroup));
    return UIThumbnailGraph;
});
