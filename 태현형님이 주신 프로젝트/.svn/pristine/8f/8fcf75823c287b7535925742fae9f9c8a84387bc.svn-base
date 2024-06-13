/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionScriptBlock'/>
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
define("DS/EPSSchematicEngine/EPSSchematicsExecutionScriptBlock", ["require", "exports", "DS/EPSSchematicEngine/EPSSchematicsExecutionBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, ExecutionBlock, Events, Enums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a schematics execution script block.
     * @class ExecutionScriptBlock
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionScriptBlock
     * @private
     */
    var ExecutionScriptBlock = /** @class */ (function (_super) {
        __extends(ExecutionScriptBlock, _super);
        /**
         * @constructor
         * @param {ScriptBlock} model - The block model.
         * @param {ExecutionGraph} parent - The parent graph.
         */
        function ExecutionScriptBlock(model, parent) {
            var _this = _super.call(this, model, parent) || this;
            _this.model.addListener(Events.BlockScriptContentChangeEvent, _this.onBlockScriptContentChange.bind(_this));
            _this._updateScript(_this.model.getScriptContent());
            return _this;
        }
        /**
         * Updates the script block.
         * @private
         * @param {string} scriptContent - The script content.
         */
        ExecutionScriptBlock.prototype._updateScript = function (scriptContent) {
            var handleShorcuts = this.parent !== undefined && (this.parent.version === '1.0.0' || this.parent.version === '1.0.1');
            // Initialize the execution script
            var executionScript = '(function (runParams) {\n';
            if (handleShorcuts) {
                // Declare data ports shortcuts
                var dataPorts = this.getDataPorts();
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    var dataPort = dataPorts[dp];
                    if (dataPort.model.getType() === Enums.EDataPortType.eInput) {
                        executionScript += 'var ' + dataPort.model.getName() + ' = this.dataPorts[' + dp + '].getValue();\n';
                    }
                    else if (dataPort.model.getType() === Enums.EDataPortType.eOutput) {
                        executionScript += 'var ' + dataPort.model.getName() + ';\n';
                    }
                }
            }
            // Declare the execution function
            executionScript += 'var __scriptFunction = function (runParams) {\n';
            executionScript += scriptContent + '\n};\n';
            executionScript += 'var __scriptReturn = __scriptFunction.call(this, runParams);\n';
            if (handleShorcuts) {
                // Copy shortcuts value to outputs data ports
                var dataPorts = this.getDataPorts();
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    var dataPort = dataPorts[dp];
                    if (dataPort.model.getType() === Enums.EDataPortType.eOutput) {
                        executionScript += 'if (' + dataPort.model.getName() + ' !== undefined) ';
                        executionScript += 'this.dataPorts[' + dp + '].setValue(' + dataPort.model.getName() + ');\n';
                    }
                }
            }
            // Function return
            executionScript += 'return __scriptReturn;\n';
            executionScript += '});';
            // Evaluate to get execute function
            this.onExecute = eval(executionScript); // eslint-disable-line
        };
        /**
         * The callback on the block script change event.
         * @private
         * @param {BlockScriptContentChangeEvent} event - The block script change event.
         */
        ExecutionScriptBlock.prototype.onBlockScriptContentChange = function (event) {
            this._updateScript(event.getScriptContent());
        };
        return ExecutionScriptBlock;
    }(ExecutionBlock));
    return ExecutionScriptBlock;
});
