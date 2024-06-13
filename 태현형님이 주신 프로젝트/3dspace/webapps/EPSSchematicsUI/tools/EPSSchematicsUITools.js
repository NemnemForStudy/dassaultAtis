/// <amd-module name='DS/EPSSchematicsUI/tools/EPSSchematicsUITools'/>
define("DS/EPSSchematicsUI/tools/EPSSchematicsUITools", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, BlockLibrary, GraphBlock, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var UITools = /** @class */ (function () {
        function UITools() {
        }
        /**
         * Gets the compatible WUX combobox list from the given array.
         * @public
         * @static
         * @param {Array<string>} array - The array.
         * @param {string} [iconItem] - The font icon item.
         * @returns {Array<IWUXComboBoxElement>} The WUX combo list.
         */
        UITools.getWUXComboListFromArray = function (array, iconItem) {
            var combolist = [];
            array.forEach(function (element) { return combolist.push({ labelItem: element, valueItem: element, iconItem: iconItem }); });
            return combolist;
        };
        /**
         * Gets the compatible WUX combobox list from the given enumeration.
         * @public
         * @static
         * @param {Object} enumeration - The enumeration.
         * @param {string} [iconItem] - The font icon item.
         * @returns {Array<IWUXComboBoxElement>} The WUX combo list.
         */
        UITools.getWUXComboListFromEnum = function (enumeration, iconItem) {
            var combolist = [];
            var keys = Object.keys(enumeration);
            keys.forEach(function (key) { return combolist.push({ labelItem: key, valueItem: enumeration[key], iconItem: iconItem }); });
            return combolist;
        };
        /**
         * Gets the value inline preview.
         * @public
         * @static
         * @param {*} value - The value to preview.
         * @param {number} [maxLength] - The maximum preview length.
         * @param {number} [maxDepth=1] - The maximum object depth to reach.
         * @param {number} [currentDepth=0] - The current object depth.
         * @returns {string} The inline root value preview.
         */
        UITools.getValueInlinePreview = function (value, maxLength, maxDepth, currentDepth) {
            if (maxDepth === void 0) { maxDepth = 1; }
            if (currentDepth === void 0) { currentDepth = 0; }
            var result, prefix, postfix;
            var separator = ', ', ellipsis = '...';
            if (value !== undefined) {
                if (typeof value === 'object') {
                    var isArray = Array.isArray(value);
                    result = value.constructor.name;
                    result = isArray ? result + '(' + value.length + ')' : result;
                    if (currentDepth < maxDepth) {
                        prefix = isArray ? '[' : '{';
                        postfix = isArray ? ']' : '}';
                        result += ' ' + prefix;
                        // For array we filter only index properties
                        var keys = isArray ? Object.keys(value).filter(function (key) { return Number.isInteger(Number(key)); }) : Object.keys(value);
                        for (var k = 0; k < keys.length; k++) {
                            var key = keys[k];
                            var subValue = UITools.getValueInlinePreview(value[key], undefined, maxDepth, currentDepth + 1);
                            subValue = isArray ? subValue : key + ': ' + subValue;
                            if (maxLength !== undefined) {
                                if (result.length + subValue.length > maxLength - separator.length - ellipsis.length - postfix.length) {
                                    result += ellipsis;
                                    break;
                                }
                            }
                            result += subValue;
                            if (k < keys.length - 1) {
                                result += separator;
                            }
                        }
                        result += postfix;
                    }
                }
                else if (typeof value === 'string') {
                    result = value;
                    if (maxLength !== undefined && result.length > maxLength - 2) {
                        result = result.substring(0, maxLength - ellipsis.length - 2) + ellipsis;
                    }
                    result = '"' + result + '"';
                }
                else {
                    result = value.toString();
                }
            }
            return String(result);
        };
        /**
         * Safely stringify to JSON the provided object.
         * @public
         * @static
         * @param {*} object - The object to safely stringify.
         * @returns {string} - The safely stringified object.
         */
        UITools.safeJSONStringify = function (object) {
            var objMap = new Map();
            var cache = [];
            var parseObject = function (o, parentPath) {
                objMap.set(o, parentPath);
                for (var p in o) {
                    if (o.hasOwnProperty(p)) {
                        var v = o[p];
                        if (typeof v === 'object' && v !== null && !objMap.has(v)) {
                            parseObject(v, parentPath + '.' + p);
                        }
                    }
                }
            };
            parseObject(object, '~');
            var result = JSON.stringify(object, function (k, v) {
                if (typeof v === 'object' && v !== null) {
                    if (cache.indexOf(v) !== -1) {
                        return '[Circular Reference: ' + objMap.get(v) + ']';
                    }
                    cache.push(v);
                }
                return v;
            }, 2);
            objMap.clear();
            return result;
        };
        /**
         * Gets the sorted block list from the provided category.
         * @public
         * @static
         * @param {string} categoryName - The block category name.
         * @param {boolean} [hideDefaultGraph=false] - True to hide the default graph else false.
         * @returns {Array<Block>} The sorted block list.
         */
        UITools.getSortedBlockByCategory = function (categoryName, hideDefaultGraph) {
            if (hideDefaultGraph === void 0) { hideDefaultGraph = false; }
            var blocks = BlockLibrary.searchBlockByCategory(RegExp('^' + categoryName + '$'));
            blocks.sort(function (block1, block2) { return block1.getName() <= block2.getName() ? -1 : 1; });
            if (hideDefaultGraph) {
                var defaultGraph = blocks.find(function (block) { return block.constructor === GraphBlock; });
                var index = blocks.indexOf(defaultGraph);
                if (index !== -1) {
                    blocks.splice(index, 1);
                }
            }
            return blocks;
        };
        /**
         * Gets the correct option value.
         * If defaultValue is undefined then value is returned.
         * If defaultValue is provided then type of value is checked and
         * if types are different then defaultValue is returned.
         * @public
         * @static
         * @param {*} value - The option value.
         * @param {*} defaultValue - The default option value.
         * @returns {*} The correct option value.
         */
        UITools.getOptionValue = function (value, defaultValue) {
            var result = value;
            var defaultType = typeof defaultValue;
            if (defaultType !== 'undefined') {
                result = typeof value === defaultType ? value : defaultValue;
            }
            return result;
        };
        /**
         * Gets the full date.
         * @public
         * @static
         * @param {Date} date - The date.
         * @returns {string} The full date.
         */
        UITools.getFullDate = function (date) {
            var year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            return year + '-' + month + '-' + day;
        };
        /**
         * Gets the full time.
         * @public
         * @static
         * @param {Date} date - The date.
         * @returns {string} The full time.
         */
        UITools.getFullTime = function (date) {
            var hours = ('0' + date.getHours()).slice(-2);
            var minutes = ('0' + date.getMinutes()).slice(-2);
            var seconds = ('0' + date.getSeconds()).slice(-2);
            var milliseconds = ('00' + date.getMilliseconds()).slice(-3);
            return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
        };
        /**
         * Gets the full date and time.
         * @public
         * @static
         * @param {Date} date - The date.
         * @returns {string} The full date and time.
         */
        UITools.getFullDateAndTime = function (date) {
            return UITools.getFullDate(date) + ' ' + UITools.getFullTime(date);
        };
        /**
         * Escapes HTML characters from the provided string.
         * @public
         * @static
         * @param {string} text - The text to escape.
         * @returns {string} The escaped text.
         */
        UITools.escapeHTML = function (text) {
            var escapeElement = document.createElement('textarea');
            escapeElement.textContent = text;
            return escapeElement.innerHTML;
        };
        /**
         * Format the provided text by converting double quotes to single quotes.
         * @public
         * @static
         * @param {string} text - The text to format.
         * @returns {string} The formatted text.
         */
        UITools.formatToSingleQuotes = function (text) {
            return text.replace(new RegExp('"', 'g'), '\'');
        };
        /**
         * Perfoms an intersection between two arrays.
         * @public
         * @static
         * @param {T[]} array1 - The first array.
         * @param {T[]} array2 - The second array.
         * @returns {T[]} - The intersection between the two arrays.
         */
        UITools.arrayIntersection = function (array1, array2) {
            if (array2.length > array1.length) {
                var temp = array2;
                array2 = array1;
                array1 = temp;
            }
            return array1.filter(function (value) { return array2.indexOf(value) > -1; });
        };
        /**
         * Merges two objects.
         * @public
         * @static
         * @param {object} obj1 - The object 1.
         * @param {object} obj2 - The object 2.
         * @param {boolean} mergeArray - True to merge arrays, false to override.
         * @returns {object} The merged object.
         */
        UITools.mergeObject = function (obj1, obj2, mergeArray) {
            var result = obj1 || obj2;
            if (obj1 !== undefined && obj2 !== undefined) {
                Object.keys(obj2).forEach(function (key) {
                    var value = obj2[key];
                    if (value !== undefined) {
                        if (mergeArray && Array.isArray(value)) {
                            value = [obj1[key] || [], value].flat();
                        }
                        result[key] = value;
                    }
                });
            }
            return result;
        };
        /**
         * Gets the data port play value.
         * @public
         * @static
         * @param {UIDataPort} portUI - The data port UI.
         * @returns {IDataPortPlayValue} The data port play value result.
         */
        UITools.getDataPortPlayValue = function (portUI) {
            var _a;
            var result = { hasPlayValue: false, value: undefined, fromDebug: false };
            var traceController = (_a = portUI === null || portUI === void 0 ? void 0 : portUI.getEditor()) === null || _a === void 0 ? void 0 : _a.getTraceController();
            if (traceController === null || traceController === void 0 ? void 0 : traceController.getPlayingState()) {
                var isSubDataPort = portUI.getModel().dataPort !== undefined;
                var parentDataPortModel = isSubDataPort ? portUI.getModel().dataPort : portUI.getModel();
                var path = parentDataPortModel.toPath();
                var events = traceController.getEventByDataPortPath(path);
                if (events.length > 0) {
                    var lastEvent = events[events.length - 1];
                    result.value = isSubDataPort ? lastEvent.getValue()[portUI.getModel().getName()] : lastEvent.getValue();
                    result.fromDebug = lastEvent.isFromDebug();
                    result.hasPlayValue = true;
                }
            }
            return result;
        };
        /**
         * Gets the data port default value.
         * @public
         * @static
         * @param {UIDataPort} portUI - The data port UI.
         * @returns {IDataPortDefaultValue} The data port default value result.
         */
        UITools.getDataPortDefaultValue = function (portUI) {
            var _a;
            var result = { hasDefaultValue: false, value: undefined };
            if (portUI === null || portUI === void 0 ? void 0 : portUI.isStartPort()) {
                var portModel = portUI.getModel();
                var isGraph = portModel.block instanceof GraphBlock;
                var viewerController = (_a = portUI === null || portUI === void 0 ? void 0 : portUI.getEditor()) === null || _a === void 0 ? void 0 : _a.getViewerController();
                if (viewerController) {
                    var isRootGraph = portModel.block === viewerController.getRootViewer().getMainGraph().getModel();
                    var hasNoLinks = portModel.getDataLinks(portModel.block.graph).length === 0;
                    if ((isGraph && isRootGraph) || hasNoLinks) {
                        result.value = portModel.getDefaultValue();
                        result.hasDefaultValue = true;
                    }
                }
            }
            return result;
        };
        /**
         * Checks the data port is debuggable.
         * @public
         * @static
         * @param {UIEditor} editor - The editor.
         * @param {DataPort} dataPort - The data port model.
         * @returns {boolean} True if the port is debuggable else false.
         */
        UITools.isDataPortDebuggable = function (editor, dataPort) {
            var _a, _b, _c;
            var traceController = editor.getTraceController();
            var debugController = editor.getDebugController();
            var result = dataPort.isDefaultValueSettable();
            result = result && ((_c = (_b = (_a = editor.getOptions()) === null || _a === void 0 ? void 0 : _a.playCommands) === null || _b === void 0 ? void 0 : _b.callbacks) === null || _c === void 0 ? void 0 : _c.onBreakBlockDataChange) !== undefined;
            result = result && traceController.getPlayingState();
            result = result && debugController.getDebugCursorByBlockPath(dataPort.block.toPath()) !== undefined;
            return result;
        };
        /**
         * Checks if one of the block input data port is debuggable
         * @public
         * @static
         * @param {UIEditor} editor - The editor.
         * @param {Block} block - The block model.
         * @returns {boolean} True if one the block input data port is debuggable else false.
         */
        UITools.isBlockDataPortDebuggable = function (editor, block) {
            var _this = this;
            var result = false;
            if (editor && block) {
                result = block.getDataPorts(ModelEnums.EDataPortType.eInput).some(function (dataPort) { return _this.isDataPortDebuggable(editor, dataPort); });
            }
            return result;
        };
        /**
         * Gets the break block data.
         * @public
         * @static
         * @param {UIEditor} editor - The editor.
         * @param {DataPort[]} dataPorts - The data port model list.
         * @param {Map<string, boolean>} overrideMap - The override map.
         * @returns {IDebugValue[]} The break block data.
         */
        UITools.getBreakBlockData = function (editor, dataPorts, overrideMap) {
            var traceController = editor.getTraceController();
            var breakBlockData = [];
            dataPorts.forEach(function (dataPort) {
                var dataPortPath = dataPort.toPath();
                var traceEvents = traceController.getEventByDataPortPath(dataPortPath);
                if (traceEvents.length) {
                    var traceEvent = traceEvents[traceEvents.length - 1];
                    var override = overrideMap.has(dataPortPath) ? overrideMap.get(dataPortPath) : false;
                    var isValueModified_1 = (!traceEvent.isFromDebug() && traceEvent.getValue() !== dataPort.getDefaultValue()) || override;
                    var playValue_1 = isValueModified_1 ? dataPort.getDefaultValue() : traceEvent.getValue();
                    // Manage sub data port override
                    Array.from(overrideMap.keys()).filter(function (key) { return key.startsWith(dataPortPath); }).forEach(function (key) {
                        if (key.length > dataPortPath.length) {
                            var propertyName = key.replace(dataPortPath + '.', '');
                            isValueModified_1 = true;
                            playValue_1[propertyName] = dataPort.getDefaultValue()[propertyName];
                        }
                    });
                    breakBlockData.push({
                        dataPort: dataPort,
                        value: playValue_1,
                        fromDebug: isValueModified_1
                    });
                }
            });
            return breakBlockData;
        };
        return UITools;
    }());
    return UITools;
});
