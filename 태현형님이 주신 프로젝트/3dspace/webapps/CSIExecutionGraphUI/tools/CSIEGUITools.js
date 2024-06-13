/// <amd-module name='DS/CSIExecutionGraphUI/tools/CSIEGUITools'/>
define("DS/CSIExecutionGraphUI/tools/CSIEGUITools", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary"], function (require, exports, ModelTools, BlockLibrary, TypeLibrary) {
    "use strict";
    /**
     * This class defines the CSI Execution Graph Editor tools.
     * @class CSIEGETools
     * @alias module:DS/CSIExecGraphEditor/tools/CSIEGETools
     * @private
     */
    var CSIEGUITools = /** @class */ (function () {
        function CSIEGUITools() {
        }
        /**
         * Ceates an HTML help link from the provided url.
         * @public
         * @static
         * @param {string} url - The url of the help link to open.
         * @returns {string} The HTML help link.
         */
        CSIEGUITools.createHelpLink = function (url) {
            return '<a href="' + url + '" target="_blank" class="csiegui-help-link" onClick="event.stopPropagation();">(?)</a>';
        };
        /**
         * Gets the CSI function information.
         * @public
         * @static
         * @param {GraphBlock} graphBlock - The graph block model.
         * @returns {ICSIJSONFunctionInfo} The CSI function information.
         */
        CSIEGUITools.getCSIFunctionInfo = function (graphBlock) {
            var jsonInfo;
            if (graphBlock) {
                jsonInfo = { name: 'name', pool: 'Pool', version: 1 };
                var graphBlockName = graphBlock.getName();
                if (graphBlockName) {
                    if (graphBlockName.search('/') > 0) {
                        jsonInfo.name = graphBlockName.split('/')[1];
                        jsonInfo.pool = graphBlockName.split('/')[0];
                    }
                    else {
                        jsonInfo.name = graphBlockName;
                    }
                    if (jsonInfo.name.search('_v') > 0) {
                        jsonInfo.version = parseInt(jsonInfo.name.split('_v')[1]);
                        jsonInfo.name = jsonInfo.name.split('_v')[0];
                    }
                }
            }
            return jsonInfo;
        };
        /**
         * Checks if the given object reference is an instance of one of the provided constructors.
         * @public
         * @static
         * @param {object} reference - The object reference.
         * @param {Constructor[]} constructors - The list of constrcutors.
         * @returns {boolean} True is the object reference is an instance of one of the provided constructors else false.
         */
        CSIEGUITools.isInstanceOf = function (reference, constructors) {
            return constructors.some(function (constructor) { return reference instanceof constructor; });
        };
        /**
         * Checks if the execution graph handles context Id.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles context Id else false.
         */
        CSIEGUITools.hasExecGraphDebugContextId = function () {
            var result = false;
            var csiExecutionGraphDebuggerBlock = BlockLibrary.getBlock('CSIExecutionGraph/csiExecutionGraphDebugger_v1');
            if (csiExecutionGraphDebuggerBlock !== undefined) {
                var callDataPort = csiExecutionGraphDebuggerBlock.getDataPortByName('Call');
                var callType = callDataPort.getValueType();
                var callTypeDescriptor = TypeLibrary.getGlobalType(callType);
                result = callTypeDescriptor.hasOwnProperty('contextId');
            }
            return result;
        };
        /**
         * Checks if the execution graph handles debug new update breakpoints.
         * This feature has been delivered at the same time as ContextId in the engine.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles debug new update breakpoints else false.
         */
        CSIEGUITools.hasExecGraphDebugNewUpdateBreakPoints = function () {
            return this.hasExecGraphDebugContextId();
        };
        /**
         * Checks if the execution graph handles break block data.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles break block data else false.
         */
        CSIEGUITools.hasExecGraphDebugBreakBlockData = function () {
            var result = false;
            var csiExecutionGraphDebuggerBlock = BlockLibrary.getBlock('CSIExecutionGraph/csiExecutionGraphDebugger_v1');
            if (csiExecutionGraphDebuggerBlock !== undefined) {
                var callDataPort = csiExecutionGraphDebuggerBlock.getDataPortByName('Call');
                var callType = callDataPort.getValueType();
                var callTypeDescriptor = TypeLibrary.getGlobalType(callType);
                result = callTypeDescriptor.hasOwnProperty('breakBlockData');
            }
            return result;
        };
        /**
         * Checks if the execution graph handles block state.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles block state else false.
         */
        CSIEGUITools.hasExecGraphDebugBlockState = function () {
            var result = false;
            var csiExecutionGraphFunctionBlock = BlockLibrary.getBlock('CSIExecutionGraph/csiExecutionGraphFunction_v1');
            if (csiExecutionGraphFunctionBlock !== undefined) {
                var callDataPort = csiExecutionGraphFunctionBlock.getDataPortByName('Call');
                var callType = callDataPort.getValueType();
                var callTypeDescriptor = TypeLibrary.getGlobalType(callType);
                var debugConfigType = callTypeDescriptor.debugConfig.type;
                var debugConfigTypeDescriptor = TypeLibrary.getGlobalType(debugConfigType);
                result = debugConfigTypeDescriptor.hasOwnProperty('blockState');
            }
            return result;
        };
        /**
         * Checks if the execution graph handles connection state.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles block state else false.
         */
        CSIEGUITools.hasExecGraphDebugConnectionState = function () {
            var result = false;
            var csiExecutionGraphFunctionBlock = BlockLibrary.getBlock('CSIExecutionGraph/csiExecutionGraphFunction_v1');
            if (csiExecutionGraphFunctionBlock !== undefined) {
                var callDataPort = csiExecutionGraphFunctionBlock.getDataPortByName('Call');
                var callType = callDataPort.getValueType();
                var callTypeDescriptor = TypeLibrary.getGlobalType(callType);
                var debugConfigType = callTypeDescriptor.debugConfig.type;
                var debugConfigTypeDescriptor = TypeLibrary.getGlobalType(debugConfigType);
                result = debugConfigTypeDescriptor.hasOwnProperty('connectionState');
            }
            return result;
        };
        /**
         * Convert the provided block path to CSI id.
         * @public
         * @static
         * @param {string} blockPath - The path of the block.
         * @returns {string} The CSI id.
         */
        CSIEGUITools.pathToCSIid = function (blockPath) {
            var csiPath = blockPath;
            csiPath = csiPath.replace(ModelTools.rootPath + '.', '');
            csiPath = csiPath.replace(/\.containedGraph/g, '');
            csiPath = csiPath.replace(/\./g, '/');
            return csiPath;
        };
        /**
         * Gets the required pools from the provided CSI JSON graph.
         * @public
         * @static
         * @param {ICSIJSONGraph} json - The CSI JSON graph.
         * @returns {string[]} The required pools.
         */
        CSIEGUITools.getRequiredPoolsOf = function (json) {
            var _this = this;
            var pools = [];
            json.implementation.blocks.forEach(function (block) {
                var isFunction = block.type === 'Function';
                var isExecutionBlock = block.type === 'ExecutionGraph';
                var isArrayMap = block.type === 'ArrayMap';
                if ((isFunction || isExecutionBlock || isArrayMap) && !block.implementation.nodeIdSelector && block.implementation.pool) {
                    pools.push(block.implementation.pool);
                }
                if (isExecutionBlock || isArrayMap) {
                    pools = pools.concat(_this.getRequiredPoolsOf(block));
                }
            });
            json.implementation.nodeIdSelectors.forEach(function (nodeIdSelector) { return pools.push(nodeIdSelector.pool); });
            pools.filter(function (value, index, self) { return self.indexOf(value) === index; });
            return pools;
        };
        CSIEGUITools.AndAndBlockUid = '71ae6e55-9d1b-442b-a8eb-9a52f87850ad';
        CSIEGUITools.OrOrBlockUid = '7c7e3de3-6df4-49d7-ae17-6bb6ab0a9d17';
        return CSIEGUITools;
    }());
    return CSIEGUITools;
});
