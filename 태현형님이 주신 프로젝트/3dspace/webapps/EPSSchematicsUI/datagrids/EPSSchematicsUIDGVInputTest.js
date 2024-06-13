/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVInputTest'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVInputTest", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVIOTestAbstract"], function (require, exports, UIDGVIOTestAbstract) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view input test.
     * @class UIDGVInputTest
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVInputTest
     * @extends UIDGVIOTestAbstract
     * @private
     */
    var UIDGVInputTest = /** @class */ (function (_super) {
        __extends(UIDGVInputTest, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UIDGVInputTest(editor) {
            return _super.call(this, editor, 'sch-datagridview-inputtest') || this;
        }
        /**
         * Initializes the data grid view.
         * @protected
         */
        UIDGVInputTest.prototype._initialize = function () {
            this._dataPorts = this._graph.getInputDataDrawer().getModelDataPorts();
            _super.prototype._initialize.call(this);
        };
        return UIDGVInputTest;
    }(UIDGVIOTestAbstract));
    return UIDGVInputTest;
});
