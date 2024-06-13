/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPEventServices/EPEventTarget", "DS/EPSSchematicsModelWeb/EPSSchematicsBlock"], function (require, exports, Events, EventTarget, Block) {
    "use strict";
    var hasCategory = function (iName) {
        return categoryDocsByName.hasOwnProperty(iName);
    };
    var hasJSONExtension = function (iPath) {
        return iPath.substring(iPath.length - jsonExtension.length, iPath.length) === jsonExtension;
    };
    var hasPlugin = function (iPath) {
        return iPath.indexOf('!') !== -1;
    };
    var getCategories = function () {
        return Object.keys(categoryDocsByName);
    };
    var getBlocks = function () {
        var uids = Object.keys(blocksByUid);
        return uids.map(function (uid) { return blocksByUid[uid]; });
    };
    var categoryDocsByName = {};
    var blocksByUid = {};
    var blockDocsByUid = {};
    var eventTarget = new EventTarget();
    var textPlugin = 'text!';
    var jsonExtension = '.json';
    var BlockLibrary;
    (function (BlockLibrary) {
        var BlockDocumentation = /** @class */ (function () {
            function BlockDocumentation(iJSON) {
                this.jsonObject = typeof iJSON === 'string' ? JSON.parse(iJSON) : iJSON;
            }
            BlockDocumentation.prototype.getSummary = function () {
                return this.jsonObject.summary;
            };
            BlockDocumentation.prototype.getDescription = function () {
                return this.jsonObject.description;
            };
            BlockDocumentation.prototype.getDataPortByName = function (iName) {
                return this.jsonObject.dataPorts[iName];
            };
            BlockDocumentation.prototype.getControlPortByName = function (iName) {
                return this.jsonObject.controlPorts[iName];
            };
            BlockDocumentation.prototype.getSettingByName = function (iName) {
                return this.jsonObject.settings[iName];
            };
            BlockDocumentation.prototype.getExample = function () {
                return this.jsonObject.example;
            };
            return BlockDocumentation;
        }());
        BlockLibrary.BlockDocumentation = BlockDocumentation;
        var CategoryDocumentation = /** @class */ (function () {
            function CategoryDocumentation(iId, iJSON) {
                this.id = iId;
                var jsonObject = typeof iJSON === 'string' ? JSON.parse(iJSON) : iJSON;
                this.description = jsonObject.description;
                this.icon = jsonObject.icon;
                this.name = jsonObject.name;
                this.buildFullName();
            }
            CategoryDocumentation.prototype.buildFullName = function () {
                var ids = this.id.split('/');
                this.name = this.name || ids[ids.length - 1];
                this.fullName = '';
                var categoryPath = '';
                for (var i = 0; i < ids.length - 1; i++) {
                    categoryPath += ids[i];
                    var catDoc = BlockLibrary.getCategoryDocumentation(categoryPath);
                    categoryPath += '/';
                    this.fullName += catDoc.getName() + '/';
                }
                this.fullName += this.name;
            };
            CategoryDocumentation.prototype.getDescription = function () {
                return this.description;
            };
            CategoryDocumentation.prototype.getIcon = function () {
                return this.icon;
            };
            CategoryDocumentation.prototype.getName = function () {
                return this.name;
            };
            CategoryDocumentation.prototype.getFullName = function () {
                return this.fullName;
            };
            return CategoryDocumentation;
        }());
        BlockLibrary.CategoryDocumentation = CategoryDocumentation;
        /**
         * Register a category.
         * @protected
         * @param {string} iName - The name of the category.
         * @param {string} [iDoc] - The documentation of the category.
         */
        function registerCategory(iName, iDoc) {
            if (typeof iName !== 'string') {
                throw new TypeError('iName argument is not a string');
            }
            if (hasCategory(iName)) {
                throw new TypeError('iName argument is already registered');
            }
            var lastSlashIndex = iName.lastIndexOf('/');
            if (lastSlashIndex !== -1) {
                var parentCategory = iName.substring(0, lastSlashIndex);
                if (!hasCategory(parentCategory)) {
                    BlockLibrary.registerCategory(parentCategory);
                }
            }
            categoryDocsByName[iName] = iDoc;
            var newEvt = new Events.BlockLibraryRegisterCategoryEvent();
            newEvt.category = iName;
            eventTarget.dispatchEvent(newEvt);
        }
        BlockLibrary.registerCategory = registerCategory;
        /**
         * This method registers a block into the schematics block library.
         * The block's uid will be used to store the definition.
         * The uid of the block must be unique.
         * @protected
         * @param {TBlockConstructor} blockConstructor - The block constructor to register.
         */
        function registerBlock(blockConstructor) {
            var CtorBlock = blockConstructor;
            if (typeof CtorBlock !== 'function') {
                throw new TypeError('block argument is not a function');
            }
            if (!(CtorBlock.prototype instanceof Block)) {
                throw new TypeError('block argument is not a Block constructor');
            }
            if (typeof CtorBlock.prototype.uid !== 'string' || CtorBlock.prototype.uid.length === 0) {
                throw new TypeError('block.prototype.uid argument is not a valid string');
            }
            if (blocksByUid[CtorBlock.prototype.uid] !== undefined) {
                throw new TypeError('block.prototype.uid argument is already registered');
            }
            if (typeof CtorBlock.prototype.name !== 'string' || CtorBlock.prototype.name.length === 0) {
                throw new TypeError('block.prototype.name argument is not a valid string');
            }
            if (!hasCategory(CtorBlock.prototype.category)) {
                BlockLibrary.registerCategory(CtorBlock.prototype.category);
            }
            var blocksByCategory = BlockLibrary.searchBlockByCategory(RegExp('^' + CtorBlock.prototype.category + '$'));
            if (blocksByCategory.some(function (iBlock) { return iBlock.name === CtorBlock.prototype.name; })) {
                throw new TypeError('block.prototype.name argument is already used');
            }
            var block = new CtorBlock();
            blocksByUid[CtorBlock.prototype.uid] = block;
            var newEvt = new Events.BlockLibraryRegisterBlockEvent();
            newEvt.uid = CtorBlock.prototype.uid;
            eventTarget.dispatchEvent(newEvt);
        }
        BlockLibrary.registerBlock = registerBlock;
        /**
         * Load the documentation.
         * @protected
         * @param {Function} [iOnLoadEnd] The callback function.
         */
        function loadDocumentation(iOnLoadEnd) {
            var categoryNames = getCategories().filter(function (name) {
                return typeof categoryDocsByName[name] === 'string' && categoryDocsByName[name].length !== 0;
            });
            var blockUids = Object.keys(blocksByUid).filter(function (uid) {
                return typeof blocksByUid[uid].documentation === 'string' && blocksByUid[uid].documentation.length !== 0 && !blockDocsByUid.hasOwnProperty(uid);
            });
            var categoryDocPaths = categoryNames.map(function (name) {
                var categoryDocPath = categoryDocsByName[name];
                if (hasJSONExtension(categoryDocPath) && !hasPlugin(categoryDocPath)) {
                    categoryDocPath = textPlugin + categoryDocPath;
                }
                return categoryDocPath;
            });
            var blockDocPaths = blockUids.map(function (uid) {
                var blockDocPath = blocksByUid[uid].documentation;
                if (hasJSONExtension(blockDocPath) && !hasPlugin(blockDocPath)) {
                    blockDocPath = textPlugin + blockDocPath;
                }
                return blockDocPath;
            });
            require(categoryDocPaths.concat(blockDocPaths), function () {
                for (var c = 0; c < categoryNames.length; c++) {
                    categoryDocsByName[categoryNames[c]] = new CategoryDocumentation(categoryNames[c], arguments[c]);
                }
                for (var b = 0; b < blockUids.length; b++) {
                    var blockDoc = new BlockDocumentation(arguments[categoryNames.length + b]);
                    blockDocsByUid[blockUids[b]] = blockDoc;
                }
                if (iOnLoadEnd !== undefined) {
                    iOnLoadEnd();
                }
            });
        }
        BlockLibrary.loadDocumentation = loadDocumentation;
        /**
         * This method checks if the block specified by its uid is registered.
         * @private
         * @param {string} uid - The uid of the block.
         * @return {boolean} True if the block is registered.
         */
        function hasBlock(uid) {
            return blocksByUid[uid] !== undefined;
        }
        BlockLibrary.hasBlock = hasBlock;
        /**
         * This method gets the block specified by its uid.
         * @private
         * @param {string} uid - The uid of the block.
         * @return {Block} The block found in the block library.
         */
        function getBlock(uid) {
            return blocksByUid[uid];
        }
        BlockLibrary.getBlock = getBlock;
        /**
         * Get the category documentation.
         * @protected
         * @param {string} iName - The name of the category.
         * @returns {CategoryDocumentation} The category documentation.
         */
        function getCategoryDocumentation(iName) {
            return categoryDocsByName[iName] instanceof CategoryDocumentation ? categoryDocsByName[iName] : undefined;
        }
        BlockLibrary.getCategoryDocumentation = getCategoryDocumentation;
        /**
         * Get the block documentation.
         * @protected
         * @param {string} iUid - The Uid of the block.
         * @returns {BlockDocumentation} The block documentation.
         */
        function getBlockDocumentation(iUid) {
            return blockDocsByUid[iUid];
        }
        BlockLibrary.getBlockDocumentation = getBlockDocumentation;
        /**
         * Search category by name.
         * @protected
         * @param {RegExp} iRegExpName - The name regular expression.
         * @returns {string[]} The found categories.
         */
        function searchCategoryByName(iRegExpName) {
            return getCategories().filter(function (categoryName) { return iRegExpName.test(categoryName); });
        }
        BlockLibrary.searchCategoryByName = searchCategoryByName;
        /**
         * Search category by description.
         * @protected
         * @param {RegExp} iRegExpDesc - The description regular expression.
         * @returns {string[]} The found categories.
         */
        function searchCategoryByDescription(iRegExpDesc) {
            return getCategories().filter(function (categoryName) {
                var categoryDocumentation = BlockLibrary.getCategoryDocumentation(categoryName);
                return categoryDocumentation !== undefined && iRegExpDesc.test(categoryDocumentation.getDescription());
            });
        }
        BlockLibrary.searchCategoryByDescription = searchCategoryByDescription;
        /**
         * Search block by name.
         * @protected
         * @param {RegExp} iRegExpName - The name regular expression.
         * @returns {Block[]} The found blocks.
         */
        function searchBlockByName(iRegExpName) {
            return getBlocks().filter(function (block) { return iRegExpName.test(block.getName()); });
        }
        BlockLibrary.searchBlockByName = searchBlockByName;
        /**
         * Search block by summary.
         * @protected
         * @param {RegExp} iRegExpSum - The summary regular expression.
         * @returns {Block[]} The found blocks.
         */
        function searchBlockBySummary(iRegExpSum) {
            return getBlocks().filter(function (block) { return iRegExpSum.test(block.getDocumentationSummary()); });
        }
        BlockLibrary.searchBlockBySummary = searchBlockBySummary;
        /**
         * Search block by description.
         * @protected
         * @param {RegExp} iRegExpDesc - The description regular expression.
         * @returns {Block[]} The found blocks.
         */
        function searchBlockByDescription(iRegExpDesc) {
            return getBlocks().filter(function (block) { return iRegExpDesc.test(block.getDocumentationDescription()); });
        }
        BlockLibrary.searchBlockByDescription = searchBlockByDescription;
        /**
         * Search block by category.
         * @protected
         * @param {RegExp} iRegExpCat - The category regular expression.
         * @returns {Block[]} The found blocks.
         */
        function searchBlockByCategory(iRegExpCat) {
            return getBlocks().filter(function (block) { return iRegExpCat.test(block.getCategory()); });
        }
        BlockLibrary.searchBlockByCategory = searchBlockByCategory;
        /**
         * Search block by category full name.
         * @protected
         * @param {RegExp} iRegExpCat - The category regular expression.
         * @returns {Block[]} The found blocks.
         */
        function searchBlockByCategoryFullName(iRegExpCat) {
            return getBlocks().filter(function (block) {
                var categoryDocumentation = BlockLibrary.getCategoryDocumentation(block.getCategory());
                return categoryDocumentation !== undefined && iRegExpCat.test(categoryDocumentation.getFullName());
            });
        }
        BlockLibrary.searchBlockByCategoryFullName = searchBlockByCategoryFullName;
        /**
         * Search data port by name.
         * @protected
         * @param {RegExp} iRegExpName - The name regular expression.
         * @returns {DataPort[]} The found data ports.
         */
        function searchDataPortByName(iRegExpName) {
            var dataPortsResult = [];
            var blocks = getBlocks();
            for (var b = 0; b < blocks.length; b++) {
                var dataPorts = blocks[b].getDataPorts();
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    var dataPort = dataPorts[dp];
                    if (iRegExpName.test(dataPort.getName())) {
                        dataPortsResult.push(dataPort);
                    }
                }
            }
            return dataPortsResult;
        }
        BlockLibrary.searchDataPortByName = searchDataPortByName;
        /**
         * Search data port by description.
         * @protected
         * @param {RegExp} iRegExpDesc - The description regular expression.
         * @returns {DataPort[]} The found data ports.
         */
        function searchDataPortByDescription(iRegExpDesc) {
            var dataPortsResult = [];
            var blocks = getBlocks();
            for (var b = 0; b < blocks.length; b++) {
                var dataPorts = blocks[b].getDataPorts();
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    var dataPort = dataPorts[dp];
                    if (iRegExpDesc.test(dataPort.getDocumentationDescription())) {
                        dataPortsResult.push(dataPort);
                    }
                }
            }
            return dataPortsResult;
        }
        BlockLibrary.searchDataPortByDescription = searchDataPortByDescription;
        /**
         * Search data port by value type.
         * @protected
         * @param {RegExp} iRegExpValueType - The value type regular expression.
         * @returns {DataPort[]} The found data ports.
         */
        function searchDataPortByValueType(iRegExpValueType) {
            var dataPortsResult = [];
            var blocks = getBlocks();
            for (var b = 0; b < blocks.length; b++) {
                var dataPorts = blocks[b].getDataPorts();
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    var dataPort = dataPorts[dp];
                    var allowedValueTypes = dataPort.getAllowedValueTypes();
                    if (allowedValueTypes.some(function (valueType) { return iRegExpValueType.test(valueType); })) {
                        dataPortsResult.push(dataPort);
                    }
                }
            }
            return dataPortsResult;
        }
        BlockLibrary.searchDataPortByValueType = searchDataPortByValueType;
        /**
         * Search control port by name.
         * @protected
         * @param {RegExp} iRegExpName - The name regular expression.
         * @returns {ControlPort[]} The found control ports.
         */
        function searchControlPortByName(iRegExpName) {
            var controlPortsResult = [];
            var blocks = getBlocks();
            for (var b = 0; b < blocks.length; b++) {
                var controlPorts = blocks[b].getControlPorts();
                for (var cp = 0; cp < controlPorts.length; cp++) {
                    var controlPort = controlPorts[cp];
                    if (iRegExpName.test(controlPort.getName())) {
                        controlPortsResult.push(controlPort);
                    }
                }
            }
            return controlPortsResult;
        }
        BlockLibrary.searchControlPortByName = searchControlPortByName;
        /**
         * Search control port by description.
         * @protected
         * @param {RegExp} iRegExpDesc - The description regular expression.
         * @returns {ControlPort[]} The found control ports.
         */
        function searchControlPortByDescription(iRegExpDesc) {
            var controlPortsResult = [];
            var blocks = getBlocks();
            for (var b = 0; b < blocks.length; b++) {
                var controlPorts = blocks[b].getControlPorts();
                for (var cp = 0; cp < controlPorts.length; cp++) {
                    var controlPort = controlPorts[cp];
                    if (iRegExpDesc.test(controlPort.getDocumentationDescription())) {
                        controlPortsResult.push(controlPort);
                    }
                }
            }
            return controlPortsResult;
        }
        BlockLibrary.searchControlPortByDescription = searchControlPortByDescription;
        /**
         * Search setting by name.
         * @protected
         * @param {RegExp} iRegExpName - The name regular expression.
         * @returns {Setting[]} The found settings.
         */
        function searchSettingByName(iRegExpName) {
            var settingsResult = [];
            var blocks = getBlocks();
            for (var b = 0; b < blocks.length; b++) {
                var settings = blocks[b].getSettings();
                for (var s = 0; s < settings.length; s++) {
                    var setting = settings[s];
                    if (iRegExpName.test(setting.getName())) {
                        settingsResult.push(setting);
                    }
                }
            }
            return settingsResult;
        }
        BlockLibrary.searchSettingByName = searchSettingByName;
        /**
         * Search setting by description.
         * @protected
         * @param {RegExp} iRegExpDesc - The description regular expression.
         * @returns {Setting[]} The found settings.
         */
        function searchSettingByDescription(iRegExpDesc) {
            var settingsResult = [];
            var blocks = getBlocks();
            for (var b = 0; b < blocks.length; b++) {
                var settings = blocks[b].getSettings();
                for (var s = 0; s < settings.length; s++) {
                    var setting = settings[s];
                    if (iRegExpDesc.test(setting.getDocumentationDescription())) {
                        settingsResult.push(setting);
                    }
                }
            }
            return settingsResult;
        }
        BlockLibrary.searchSettingByDescription = searchSettingByDescription;
        /**
         * Search setting by value type.
         * @protected
         * @param {RegExp} iRegExpValueType - The value type regular expression.
         * @returns {Setting[]} The found settings.
         */
        function searchSettingByValueType(iRegExpValueType) {
            var settingsResult = [];
            var blocks = getBlocks();
            for (var b = 0; b < blocks.length; b++) {
                var settings = blocks[b].getSettings();
                for (var s = 0; s < settings.length; s++) {
                    var setting = settings[s];
                    var allowedValueTypes = setting.getAllowedValueTypes();
                    if (allowedValueTypes.some(function (valueType) { return iRegExpValueType.test(valueType); })) {
                        settingsResult.push(setting);
                    }
                }
            }
            return settingsResult;
        }
        BlockLibrary.searchSettingByValueType = searchSettingByValueType;
        // Listener
        /**
         * Add listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        function addListener(iEventCtor, iListener) {
            eventTarget.addListener(iEventCtor, iListener);
        }
        BlockLibrary.addListener = addListener;
        /**
         * Remove listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        function removeListener(iEventCtor, iListener) {
            eventTarget.removeListener(iEventCtor, iListener);
        }
        BlockLibrary.removeListener = removeListener;
    })(BlockLibrary || (BlockLibrary = {}));
    return BlockLibrary;
});
