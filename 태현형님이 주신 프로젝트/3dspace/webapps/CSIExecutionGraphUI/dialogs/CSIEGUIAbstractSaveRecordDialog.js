/* eslint-disable dot-notation */
/// <amd-module name='DS/CSIExecutionGraphUI/dialogs/CSIEGUIAbstractSaveRecordDialog'/>
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
define("DS/CSIExecutionGraphUI/dialogs/CSIEGUIAbstractSaveRecordDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBaseDialog", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFileSaver", "DS/CSIExecutionGraphUI/tools/CSIEGUITools", "DS/EPSSchematicsCSI/EPSSchematicsCSIIntrospection", "DS/EPSSchematicsCSI/EPSSchematicsCSIGraphBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayMapBlock"], function (require, exports, UIBaseDialog, UIFileSaver, CSIEGUITools, CSIIntrospection, CSIGraphBlock, ArrayMapBlock) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a CSI Execution Graph UI abstract save record  dialog.
     * @class CSIEGUIAbstractSaveRecordDialog
     * @alias module:DS/CSIExecutionGraphUI/dialogs/CSIEGUIAbstractSaveRecordDialog
     * @extends UIBaseDialog
     * @abstract
     * @private
     */
    var CSIEGUIAbstractSaveRecordDialog = /** @class */ (function (_super) {
        __extends(CSIEGUIAbstractSaveRecordDialog, _super);
        /**
         * @constructor
         * @param {IWUXDialogOptions} options — The dialog options.
         * @param {CSIExecutionGraphUIEditor} editor - The CSI Execution Graph UI editor.
         * @param {CSIEGESaveGraphDialog} saveCSIGraphDialog - The save CSI graph dialog.
         */
        function CSIEGUIAbstractSaveRecordDialog(options, editor, saveCSIGraphDialog) {
            var _this = _super.call(this, options) || this;
            _this._editor = editor;
            _this._saveCSIGraphDialog = saveCSIGraphDialog;
            _this._fileSaver = new UIFileSaver();
            return _this;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the dialog.
         * @public
         */
        CSIEGUIAbstractSaveRecordDialog.prototype.remove = function () {
            _super.prototype.remove.call(this);
            this._editor = undefined;
            this._saveCSIGraphDialog = undefined;
            this._fileSaver = undefined;
        };
        /**
         * Gets the save record button.
         * @public
         * @returns {WUXButton} The save record button.
         */
        CSIEGUIAbstractSaveRecordDialog.prototype.getSaveRecordButton = function () {
            return this._dialog.buttons.Save;
        };
        /**
         * Gets the file saver.
         * @public
         * @returns {UIFileSaver} The file saver.
         */
        CSIEGUIAbstractSaveRecordDialog.prototype.getFileSaver = function () {
            return this._fileSaver;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * The callback on the title bar close button click event.
         * @protected
         * @param {MouseEvent} event - The click event.
         */
        CSIEGUIAbstractSaveRecordDialog.prototype._onTitleBarCloseButtonClick = function (event) {
            this._saveCSIGraphDialog.close();
            event.stopPropagation();
        };
        /**
         * Exports the JSON record to file.
         * @protected
         * @param {ISaveRecordOptions} options - The save record options.
         */
        CSIEGUIAbstractSaveRecordDialog.prototype._exportJSONRecordToFile = function (options) {
            options = options || {
                'function': true,
                inputs: true,
                progresses: true,
                outputs: true,
                expectedStatus: true,
                poolToSelect: true,
                nodesConfig: true
            };
            var fctInfo = CSIEGUITools.getCSIFunctionInfo(this._editor.getGraphModel());
            var config = {
                grammarVersion: 1,
                $schema: 'http://executionfw.dsone.3ds.com/schema/csiRecord.schema.json',
                poolName: fctInfo.pool || 'CSITestExecutionGraph',
                functionName: fctInfo.name || 'newExecutionGraphFuntion',
                version: fctInfo.version || '1'
            };
            var fileNameWithVersion = (fctInfo.name && fctInfo.version) ? fctInfo.name + '_v' + fctInfo.version : undefined;
            var fileName = (fileNameWithVersion || config.functionName) + '.csirecord.json';
            if (options['function'] === true) {
                config['function'] = JSON.parse(this._editor.getJSONFunction(true));
            }
            var tmpRecordInfo = this._editor._getTempRecordInfo();
            if (options.inputs === true) {
                config.inputs = tmpRecordInfo.inputs;
            }
            if (options.outputs === true) {
                config.outputs = tmpRecordInfo.outputs;
            }
            if (options.progresses === true) {
                config.progresses = tmpRecordInfo.progresses;
            }
            if (options.expectedStatus === true) {
                config.expected = options.expectedStatusOverload || this._getExpectedStatus();
            }
            if (options.poolToSelect === true) {
                var overload = options.poolToSelectOverload;
                config.poolToSelect = overload && overload !== '' ? overload : tmpRecordInfo.poolName;
            }
            if (options.nodesConfig === true) {
                config.nodesToCreate = [];
                if (options.nodesConfigOverload !== undefined) {
                    config.cmdsToLaunch = options.nodesConfigOverload;
                }
                else {
                    this._buildNodesConfig(config);
                }
            }
            var content = JSON.stringify(config, undefined, 2) + '\n';
            this._fileSaver.saveTextFile(content, fileName);
        };
        /**
         * Gets the expected client status.
         * @protected
         * @returns {string} The expected client status.
         */
        CSIEGUIAbstractSaveRecordDialog.prototype._getExpectedStatus = function () {
            var tmpRecordInfo = this._editor._getTempRecordInfo();
            return tmpRecordInfo && tmpRecordInfo.expectedStatus ? tmpRecordInfo.expectedStatus : 'success';
        };
        /**
         * Gets the nodes config.
         * @protected
         * @returns {string[]} The nodes config.
         */
        CSIEGUIAbstractSaveRecordDialog.prototype._getNodesConfig = function () {
            var config = {};
            this._buildNodesConfig(config);
            return config.cmdsToLaunch;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Builds the nodes config.
         * @private
         * @param {IJSONRecordConfig} config - The JSON record config.
         */
        CSIEGUIAbstractSaveRecordDialog.prototype._buildNodesConfig = function (config) {
            config.cmdsToLaunch = [];
            var tmpRecordInfo = this._editor._getTempRecordInfo();
            CSIEGUIAbstractSaveRecordDialog._pushPoolInConfig(tmpRecordInfo.poolName, config);
            this._buildNodesConfigOf(this._editor.getGraphModel(), config);
        };
        /**
         * Pushes the pool into the JSON record config.
         * @private
         * @static
         * @param {string} pool - The pool name.
         * @param {IJSONRecordConfig} config - The JSON record config.
         * @param {boolean} [java=false] - True for java function else false.
         * @param {string} [identifier=undefined] - The identifier.
         * @param {number} [maxInstanceCount=undefined] - The max instance count.
         */
        CSIEGUIAbstractSaveRecordDialog._pushPoolInConfig = function (pool, config, java, identifier, maxInstanceCount) {
            var cmd = (java ? 'sh 3DExperienceNodeJava.sh' : '3DExperienceNode') + ' -p ' + pool;
            if (identifier && identifier.length > 0) {
                cmd += ' -id ' + identifier;
            }
            if (maxInstanceCount === undefined) {
                maxInstanceCount = 1;
            }
            for (var i = 0; i < maxInstanceCount; i++) {
                config.cmdsToLaunch.push(cmd);
            }
        };
        /**
         * Builds the nodes config of the provided graph block.
         * @private
         * @param {GraphBlock} graphBlock - The graph block.
         * @param {IJSONRecordConfig} config - The JSON record config.
         */
        CSIEGUIAbstractSaveRecordDialog.prototype._buildNodesConfigOf = function (graphBlock, config) {
            var _this = this;
            var nodeIdForJava = {};
            graphBlock.getBlocks().forEach(function (block) {
                if (block.getNodeIdSelector() === undefined) {
                    if (block instanceof CSIGraphBlock) {
                        CSIEGUIAbstractSaveRecordDialog._pushPoolInConfig('CSIExecutionGraph', config);
                        _this._buildNodesConfigOf(block, config);
                    }
                    else if (block instanceof ArrayMapBlock) {
                        CSIEGUIAbstractSaveRecordDialog._pushPoolInConfig('CSIExecutionGraph', config);
                        _this._buildNodesConfigOf(block.getContainedGraph(), config);
                    }
                    else if (CSIIntrospection.hasBlock(block.getUid())) {
                        CSIEGUIAbstractSaveRecordDialog._pushPoolInConfig(CSIIntrospection.getFunctionPool(block.getUid()), config, _this._isJavaFunction(block));
                    }
                }
                else if (_this._isJavaFunction(block)) {
                    nodeIdForJava[CSIIntrospection.getFunctionPool(block.getUid())] = true;
                }
            });
            graphBlock.getNodeIdSelectors().forEach(function (nodeIdSelector) {
                var poolName = nodeIdSelector.getPool();
                CSIEGUIAbstractSaveRecordDialog._pushPoolInConfig(poolName, config, nodeIdForJava[poolName], nodeIdSelector.getIdentifier(), nodeIdSelector.getMaxInstanceCount());
            });
        };
        /**
         * Checks if the provided block is a java function.
         * @private
         * @param {Block} block - The block.
         * @returns {boolean} True if the block is a java function else false.
         */
        // eslint-disable-next-line class-methods-use-this
        CSIEGUIAbstractSaveRecordDialog.prototype._isJavaFunction = function (block) {
            var result = CSIIntrospection.getFunctionImplementationName(block.getUid()) === 'java';
            return result;
        };
        return CSIEGUIAbstractSaveRecordDialog;
    }(UIBaseDialog));
    return CSIEGUIAbstractSaveRecordDialog;
});
