/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsBlock'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPort", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPort", "DS/EPSSchematicsModelWeb/EPSSchematicsSetting", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPortDefinitions", "DS/EPEventServices/EPEventTarget"], function (require, exports, DataPort, ControlPort, EventPort, Setting, Events, Tools, Enums, DataPortDefinitions, ControlPortDefinitions, SettingDefinitions, EventPortDefinitions, EventTarget) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * <p>Block</br>
     *
     * Steps to create a new Block class (see example below):</br>
     * - Implement the class inheriting the Block prototype</br>
     * - Set a name, category and uid on the prototype</br>
     * - Implement the constructor function in order to create DataPort, ControlPort and Setting</br>
     * - Implement the execute function</br>
     * - Register the class on the BlockLibrary</p>
     *
     * @constructor
     * @private
     * @example
     * var MyBlock = function () {
     * 	Block.call(this);
     * 	this.createControlPorts([
     * 		new ControlPortDefinitions.Input('ControlIn'),
     * 		new ControlPortDefinitions.Output('ControlOut')
     * 	]);
     * 	this.createDataPorts([
     * 		new DataPortDefinitions.InputAll('DataIn', 'Double'),
     * 		new DataPortDefinitions.OutputAll('DataOut', 'Double')
     * 	]);
     * 	this.createSetting(new SettingDefinitions.Basic('MySetting', 'Boolean', false));
     * };
     * MyBlock.prototype = Object.create(Block.prototype);
     * MyBlock.prototype.constructor = MyBlock;
     *
     * MyBlock.prototype.uid = 'e04f6c27-b675-4dbe-88ce-dedd4e37d1bf';
     * MyBlock.prototype.name = 'MyBlock';
     * MyBlock.prototype.category = 'MyCategory/MySubCategory';
     * MyBlock.prototype.documentation = 'DS/MyModule/assets/MyBlockDoc.json';
     *
     * MyBlock.prototype.execute = function () {
     * 	// My execution
     * 	return Enums.EExecutionResult.eExecutionFinished;
     * };
     *
     * BlockLibrary.registerBlock(MyBlock);
     */
    var Block = /** @class */ (function () {
        /**
         * @constructor
         */
        function Block() {
            this.valid = true;
            this.dataPorts = [];
            this.dataPortsByName = {};
            this.controlPorts = [];
            this.controlPortsByName = {};
            this.settings = [];
            this.settingsByName = {};
            this.nodeIdSelectorActivated = false;
            this.onNodeIdSelectorRemoveBind = this.onNodeIdSelectorRemove.bind(this);
            this.onNodeIdSelectorNameChangeBind = this.onNodeIdSelectorNameChange.bind(this);
            this.eventTarget = new EventTarget();
        }
        /**
         * Construct block from JSON.
         * @private
         * @param {IJSONBlock} iJSONBlock - The JSON block.
         */
        Block.prototype.fromJSON = function (iJSONBlock) {
            this.setName(iJSONBlock.name);
            this.setDescription(iJSONBlock.description);
            for (var dp = 0; dp < this.dataPorts.length; dp++) {
                if (dp < iJSONBlock.dataPorts.length) {
                    this.dataPorts[dp].fromJSON(iJSONBlock.dataPorts[dp]);
                }
                else {
                    this.dataPorts[dp].fromDefinition();
                }
            }
            for (var cp = 0; cp < this.controlPorts.length; cp++) {
                if (cp < iJSONBlock.controlPorts.length) {
                    this.controlPorts[cp].fromJSON(iJSONBlock.controlPorts[cp]);
                }
                else {
                    this.controlPorts[cp].fromDefinition();
                }
            }
            for (var s = 0; s < this.settings.length; s++) {
                if (s < iJSONBlock.settings.length) {
                    this.settings[s].fromJSON(iJSONBlock.settings[s]);
                }
                else {
                    this.settings[s].fromDefinition();
                }
            }
            if (iJSONBlock.nodeIdSelector !== this.nodeIdSelector) {
                if (this.isNodeIdSelectorSettable(iJSONBlock.nodeIdSelector)) {
                    this.setNodeIdSelector(iJSONBlock.nodeIdSelector);
                }
                else {
                    this.setInvalidNodeIdSelector(iJSONBlock.nodeIdSelector);
                }
            }
        };
        /**
         * Construct JSON from Block.
         * @private
         * @param {IJSONBlock} oJSONBlock - The JSON block.
         */
        Block.prototype.toJSON = function (oJSONBlock) {
            oJSONBlock.definition = {};
            oJSONBlock.definition.uid = this.getUid();
            oJSONBlock.name = this.getName();
            oJSONBlock.description = this.getDescription();
            oJSONBlock.dataPorts = [];
            oJSONBlock.controlPorts = [];
            oJSONBlock.settings = [];
            for (var dp = 0; dp < this.dataPorts.length; dp++) {
                var dataPort = {};
                this.dataPorts[dp].toJSON(dataPort);
                oJSONBlock.dataPorts.push(dataPort);
            }
            for (var cp = 0; cp < this.controlPorts.length; cp++) {
                var controlPort = {};
                this.controlPorts[cp].toJSON(controlPort);
                oJSONBlock.controlPorts.push(controlPort);
            }
            for (var s = 0; s < this.settings.length; s++) {
                var setting = {};
                this.settings[s].toJSON(setting);
                oJSONBlock.settings.push(setting);
            }
            oJSONBlock.nodeIdSelector = this.getNodeIdSelector();
        };
        /**
         * Get object from path.
         * @private
         * @param {string} iPath - The object path
         * @return {Object} - The object from given path.
         */
        Block.prototype.getObjectFromPath = function (iPath) {
            var elements = iPath.replace(/\[/g, '.').replace(/\]/g, '').split('.');
            var object = this;
            for (var e = 1; e < elements.length; e++) {
                var property = elements[e];
                if (object instanceof DataPort) {
                    property = elements.slice(e).join('.');
                    e = elements.length - 1;
                    object = object.getDataPortByName(property);
                }
                else {
                    object = object[property];
                }
            }
            return object;
        };
        /**
         * Clone block but keep outside ref: graph and graph context.
         * @private
         * @return {Block} The cloned block.
         */
        Block.prototype.clone = function () {
            var clone;
            var jsonBlock = {};
            this.toJSON(jsonBlock);
            var BlockCtor = this.constructor;
            clone = new BlockCtor(this.getUid(), this.getGraphContext());
            clone.cloneRef = this;
            clone.graph = this.graph;
            if (this.graph === undefined) {
                clone.graphContext = this.getGraphContext();
            }
            if (this.isTemplate()) {
                clone.template(this.getUid());
            }
            clone.fromJSON(jsonBlock);
            return clone;
        };
        /**
         * Add listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        Block.prototype.addListener = function (iEventCtor, iListener) {
            this.eventTarget.addListener(iEventCtor, iListener);
        };
        /**
         * Remove listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        Block.prototype.removeListener = function (iEventCtor, iListener) {
            this.eventTarget.removeListener(iEventCtor, iListener);
        };
        /**
         * Dispatch event.
         * @private
         * @param {EP.Event} iEvent - The event to dispatch.
         */
        Block.prototype.dispatchEvent = function (iEvent) {
            this.eventTarget.dispatchEvent(iEvent);
        };
        /**
         * Get graph context.
         * @private
         * @return {GraphBlock} The graph context.
         */
        Block.prototype.getGraphContext = function () {
            var graphContext = this.graphContext;
            if (this.graph !== undefined) {
                graphContext = this.graph.getGraphContext();
            }
            return graphContext;
        };
        /**
         * On add.
         * @private
         * @param {GraphBlock} iGraphBlock - The graph block.
         */
        Block.prototype.onAdd = function (iGraphBlock) {
            this.graph = iGraphBlock;
            this.graphContext = undefined;
            iGraphBlock.addListener(Events.NodeIdSelectorRemoveEvent, this.onNodeIdSelectorRemoveBind);
            this.onGraphContextIn();
        };
        /**
         * On remove.
         * @private
         * @param {GraphBlock} iGraphBlock - The graph block.
         */
        Block.prototype.onRemove = function (iGraphBlock) {
            this.onGraphContextOut();
            this.setNodeIdSelector(undefined);
            iGraphBlock.removeListener(Events.NodeIdSelectorRemoveEvent, this.onNodeIdSelectorRemoveBind);
            this.unlink();
            this.untemplate();
            this.graph = undefined;
        };
        /**
         * On graph context in.
         * @private
         */
        Block.prototype.onGraphContextIn = function () {
            for (var dp = 0; dp < this.dataPorts.length; dp++) {
                this.dataPorts[dp].onGraphContextIn();
            }
            for (var cp = 0; cp < this.controlPorts.length; cp++) {
                this.controlPorts[cp].onGraphContextIn();
            }
            for (var s = 0; s < this.settings.length; s++) {
                this.settings[s].onGraphContextIn();
            }
        };
        /**
         * On graph context out.
         * @private
         */
        Block.prototype.onGraphContextOut = function () {
            for (var dp = 0; dp < this.dataPorts.length; dp++) {
                this.dataPorts[dp].onGraphContextOut();
            }
            for (var cp = 0; cp < this.controlPorts.length; cp++) {
                this.controlPorts[cp].onGraphContextOut();
            }
            for (var s = 0; s < this.settings.length; s++) {
                this.settings[s].onGraphContextOut();
            }
        };
        /**
         * Get block path.
         * @private
         * @param {Block} [iGraph] - The graph block.
         * @return {string} The block path.
         */
        Block.prototype.toPath = function (iGraph) {
            var ref = this.cloneRef || this;
            var path = Tools.rootPath;
            if (this !== iGraph && ref !== iGraph && ref.graph !== undefined) {
                path = ref.graph.toPath(iGraph) + '.blocks[' + ref.getIndex() + ']';
            }
            return path;
        };
        /**
         * Is valid.
         * @private
         * @return {boolean} True if the block is valid, false otherwise.
         */
        Block.prototype.isValid = function () {
            return this.valid;
        };
        /**
         * Compute validity.
         * @private
         * @return {boolean} True if the block is valid, false otherwise.
         */
        Block.prototype.computeValidity = function () {
            var result = this.dataPorts.every(function (dataPort) { return dataPort.isValid(); });
            result = result && this.controlPorts.every(function (controlPort) { return controlPort.isValid(); });
            result = result && this.settings.every(function (setting) { return setting.isValid(); });
            if (this.nodeIdSelector !== undefined) {
                result = result && this.nodeIdSelector !== this.invalidNodeIdSelector;
            }
            return result;
        };
        /**
         * On validity change.
         * @private
         */
        Block.prototype.onValidityChange = function () {
            var newValid = this.computeValidity();
            if (this.valid !== newValid) {
                this.valid = newValid;
                if (this.valid) {
                    this.invalidNodeIdSelector = undefined;
                }
                var event_1 = new Events.BlockValidityChangeEvent();
                event_1.block = this;
                event_1.index = this.getIndex();
                this.dispatchEvent(event_1);
                if (this.graph !== undefined) {
                    this.graph.onValidityChange();
                }
            }
        };
        /**
         * Is global templatable.
         * @private
         * @return {boolean} True if the block is globaly templatable, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.isGlobalTemplatable = function () {
            return false;
        };
        /**
         * Is local templatable.
         * @private
         * @return {boolean} True if the block is a localy templatable, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.isLocalTemplatable = function () {
            return false;
        };
        /**
         * Is template.
         * @private
         * @return {boolean} True if the block is a template, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.isTemplate = function () {
            return false;
        };
        /**
         * Is global template.
         * @private
         * @return {boolean} True if the block is a global template, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.isGlobalTemplate = function () {
            return false;
        };
        /**
         * Is local template.
         * @private
         * @return {boolean} True if the block is a local template, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.isLocalTemplate = function () {
            return false;
        };
        /**
         * Has local template.
         * @private
         * @return {boolean} True if the block has a local template, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.hasLocalTemplate = function () {
            return false;
        };
        /**
         * Has local custom type.
         * @private
         * @return {boolean} True if the block has a local custom type, false otherwise.
         */
        Block.prototype.hasLocalCustomType = function () {
            var result = this.dataPorts.some(function (dataPort) { return dataPort.hasLocalCustomType(); });
            result = result || this.settings.some(function (setting) { return setting.hasLocalCustomType(); });
            return result;
        };
        /**
         * Template.
         * @private
         * @param {string} [iUid] - The uid.
         * @return {boolean} True if the block has been templated, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
        Block.prototype.template = function (iUid) {
            return false;
        };
        /**
         * Untemplate.
         * @private
         * @return {boolean} True if the block has been untemplated, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.untemplate = function () {
            return false;
        };
        /**
         * Is from template.
         * @private
         * @return {boolean} True if the block is from template, false otherwise.
         */
        Block.prototype.isFromTemplate = function () {
            var result = this.hasDefinition();
            result = result && this.graph !== undefined;
            result = result && (this.graph.isTemplate() || this.graph.isFromTemplate());
            return result;
        };
        /**
         * Is contained graph.
         * @private
         * @return {boolean} True if the block is a contained graph, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.isContainedGraph = function () {
            return false;
        };
        /**
         * Is from contained graph.
         * @private
         * @return {boolean} True if the block is from a contained graph, false otherwise.
         */
        Block.prototype.isFromContainedGraph = function () {
            var result = this.graph !== undefined;
            result = result && (this.graph.isContainedGraph() || this.graph.isFromContainedGraph());
            return result;
        };
        /**
         * Has definition.
         * @private
         * @return {boolean} True if the block has definition, false otherwise.
         */
        Block.prototype.hasDefinition = function () {
            var BlockLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary');
            return BlockLibrarySingleton.hasBlock(this.uid);
        };
        /**
         * Get definition.
         * @private
         * @return {Block} The block definition.
         */
        Block.prototype.getDefinition = function () {
            var BlockLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary');
            return BlockLibrarySingleton.getBlock(this.uid);
        };
        /**
         * Get documentation.
         * @private
         * @return {BlockDocumentation} The block documentation.
         */
        Block.prototype.getDocumentation = function () {
            var BlockLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary');
            return BlockLibrarySingleton.getBlockDocumentation(this.uid);
        };
        /**
         * Get documentation summary.
         * @private
         * @return {string} The block documentation summary.
         */
        Block.prototype.getDocumentationSummary = function () {
            var documentationSummary;
            var documentation = this.getDocumentation();
            if (documentation !== undefined) {
                documentationSummary = documentation.getSummary();
            }
            return documentationSummary;
        };
        /**
         * Get documentation description.
         * @private
         * @return {string} The block documentation description.
         */
        Block.prototype.getDocumentationDescription = function () {
            var documentationDescription;
            var documentation = this.getDocumentation();
            if (documentation !== undefined) {
                documentationDescription = documentation.getDescription();
            }
            return documentationDescription;
        };
        /**
         * Get documentation example.
         * @private
         * @return {IDocumentationExample} The block documentation example.
         */
        Block.prototype.getDocumentationExample = function () {
            var documentationExample;
            var documentation = this.getDocumentation();
            if (documentation !== undefined) {
                documentationExample = documentation.getExample();
            }
            return documentationExample;
        };
        /**
         * Get index.
         * @private
         * @return {number} The index of the block.
         */
        Block.prototype.getIndex = function () {
            var index;
            if (this.graph !== undefined) {
                index = this.graph.getBlocks().indexOf(this);
            }
            return index;
        };
        /**
         * Get uid.
         * @private
         * @return {string} The uid of the block.
         */
        Block.prototype.getUid = function () {
            return this.uid;
        };
        /**
         * Get name.
         * @protected
         * @return {string} The name of the block.
         */
        Block.prototype.getName = function () {
            return this.name;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] - The name of the block.
         * @return {boolean} True if the name is settable, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
        Block.prototype.isNameSettable = function (iName) {
            return false;
        };
        /**
         * Set name.
         * @private
         * @param {string} iName - The name of the block.
         * @return {boolean} True if the block name has been set, false otherwise.
         */
        Block.prototype.setName = function (iName) {
            var result = arguments.length === 1;
            result = result && this.isNameSettable(iName);
            if (result) {
                this.name = iName;
                var event_2 = new Events.BlockNameChangeEvent();
                event_2.block = this;
                event_2.index = this.getIndex();
                event_2.name = this.name;
                this.dispatchEvent(event_2);
            }
            return result;
        };
        /**
         * Get description.
         * @protected
         * @return {string} The description of the block.
         */
        Block.prototype.getDescription = function () {
            return this.description;
        };
        /**
         * Is description settable.
         * @private
         * @param {string} [iDescription] - The description of the block.
         * @return {boolean} True if the description of the block is settable, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
        Block.prototype.isDescriptionSettable = function (iDescription) {
            return false;
        };
        /**
         * Set description.
         * @private
         * @param {string} iDescription - The description of the block.
         * @return {boolean} True if the description of the block is set, false otherwise.
         */
        Block.prototype.setDescription = function (iDescription) {
            var result = arguments.length === 1;
            result = result && this.isDescriptionSettable(iDescription);
            if (result) {
                this.description = iDescription;
                var event_3 = new Events.BlockDescriptionChangeEvent();
                event_3.block = this;
                event_3.index = this.getIndex();
                event_3.description = this.description;
                this.dispatchEvent(event_3);
            }
            return result;
        };
        /**
         * Get category.
         * @protected
         * @return {string} The category of the block.
         */
        Block.prototype.getCategory = function () {
            return this.category;
        };
        /**
         * Create and add data port.
         * @private
         * @param {TAllTypes} iDataPortDefinition - The data port definition.
         * @return {DataPort|undefined} The block data port.
         */
        Block.prototype.createDataPort = function (iDataPortDefinition) {
            var dataPort = new DataPort();
            var result = iDataPortDefinition instanceof Object;
            result = result && dataPort.setType(iDataPortDefinition.type);
            result = result && dataPort.setName(iDataPortDefinition.name);
            result = result && dataPort.setOptional(iDataPortDefinition.optional);
            if (result) {
                var notRefDef = [
                    DataPortDefinitions.InputBasic, DataPortDefinitions.InputList,
                    DataPortDefinitions.InputCategory, DataPortDefinitions.InputAll,
                    DataPortDefinitions.InputAdvanced, DataPortDefinitions.OutputBasic,
                    DataPortDefinitions.OutputList, DataPortDefinitions.OutputCategory,
                    DataPortDefinitions.OutputAll, DataPortDefinitions.OutputAdvanced,
                    DataPortDefinitions.LocalAdvanced
                ];
                if (notRefDef.some(function (def) { return iDataPortDefinition instanceof def; })) {
                    if (iDataPortDefinition.defaultValues !== undefined) {
                        result = result && dataPort.setDefaultValues(iDataPortDefinition.defaultValues);
                    }
                    result = result && dataPort.setValueTypes(iDataPortDefinition.valueTypes);
                    result = result && dataPort.setTypeCategory(iDataPortDefinition.typeCategory);
                    if (iDataPortDefinition.valueType !== undefined &&
                        iDataPortDefinition.valueType !== dataPort.valueType) {
                        result = result && dataPort.setValueType(iDataPortDefinition.valueType);
                    }
                }
                else if (iDataPortDefinition instanceof DataPortDefinitions.InputRef ||
                    iDataPortDefinition instanceof DataPortDefinitions.OutputRef) {
                    if (iDataPortDefinition.defaultValues !== undefined) {
                        result = result && dataPort.setDefaultValues(iDataPortDefinition.defaultValues);
                    }
                    result = result && dataPort.setRef(iDataPortDefinition.refPort);
                }
                else if (iDataPortDefinition instanceof DataPortDefinitions.InputRefArrayValue ||
                    iDataPortDefinition instanceof DataPortDefinitions.OutputRefArrayValue) {
                    if (iDataPortDefinition.defaultValues !== undefined) {
                        result = result && dataPort.setDefaultValues(iDataPortDefinition.defaultValues);
                    }
                    result = result && dataPort.setRefArrayValue(iDataPortDefinition.refPort);
                }
            }
            result = result && this.addDataPort(dataPort);
            dataPort = result ? dataPort : undefined;
            return dataPort;
        };
        /**
         * Create and add data ports.
         * @private
         * @param {TAllTypes[]} iDataPortDefinitions - The list of data port definitions.
         * @return {DataPort[]} The list of created data ports.
         */
        Block.prototype.createDataPorts = function (iDataPortDefinitions) {
            var dataPorts = [];
            for (var dpd = 0; dpd < iDataPortDefinitions.length; dpd++) {
                var dataPort = this.createDataPort(iDataPortDefinitions[dpd]);
                if (dataPort !== undefined) {
                    dataPorts.push(dataPort);
                }
            }
            return dataPorts;
        };
        /**
         * Is data port type addable.
         * @private
         * @param {EP.EDataPortType} iType - The data port type.
         * @return {boolean} True if data port type is addable, false otherwise.
         */
        Block.prototype.isDataPortTypeAddable = function (iType) {
            var result = Object.keys(Enums.EDataPortType).some(function (key) { return Enums.EDataPortType[key] === iType; });
            var definition = this.getDefinition();
            if (definition !== undefined) {
                var definitionDataPorts = definition.getDataPorts(iType);
                var dataPorts = this.getDataPorts(iType);
                result = result && definitionDataPorts.length > dataPorts.length;
            }
            return result;
        };
        /**
         * Is data port addable.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the data port is addable, false otherwise.
         */
        Block.prototype.isDataPortAddable = function (iDataPort) {
            var result = iDataPort instanceof DataPort;
            result = result && iDataPort.name !== undefined;
            result = result && iDataPort.type !== undefined;
            result = result && this.isDataPortTypeAddable(iDataPort.type);
            result = result && iDataPort.getValueType() !== undefined;
            result = result && iDataPort.block === undefined;
            result = result && !this.hasDataPort(iDataPort);
            result = result && !this.hasDataPortName(iDataPort.name);
            if (!iDataPort.isOptional()) {
                result = result && !this.hasOptionalDataPort(iDataPort.type);
            }
            return result;
        };
        /**
         * Add data port.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the data port has been added, false otherwise.
         */
        Block.prototype.addDataPort = function (iDataPort) {
            var result = this.isDataPortAddable(iDataPort);
            if (result) {
                this.dataPorts.push(iDataPort);
                this.dataPortsByName[iDataPort.name] = iDataPort;
                iDataPort.onAdd(this);
                var event_4 = new Events.DataPortAddEvent();
                event_4.dataPort = iDataPort;
                event_4.index = iDataPort.getIndex();
                event_4.indexByType = iDataPort.getIndexByType();
                this.dispatchEvent(event_4);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Is data port removable.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the data port is removable, false otherwise.
         */
        Block.prototype.isDataPortRemovable = function (iDataPort) {
            var result = iDataPort instanceof DataPort;
            result = result && !iDataPort.isFromDefinition();
            result = result && iDataPort.block === this;
            result = result && this.hasDataPort(iDataPort);
            return result;
        };
        /**
         * Remove data port.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the data port has been removed, false otherwise.
         */
        Block.prototype.removeDataPort = function (iDataPort) {
            var result = this.isDataPortRemovable(iDataPort);
            if (result) {
                var index = iDataPort.getIndex();
                var indexByType = iDataPort.getIndexByType();
                iDataPort.onRemove();
                this.dataPorts.splice(index, 1);
                delete this.dataPortsByName[iDataPort.name];
                var event_5 = new Events.DataPortRemoveEvent();
                event_5.dataPort = iDataPort;
                event_5.index = index;
                event_5.indexByType = indexByType;
                this.dispatchEvent(event_5);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Has data port.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the block has the data port, false otherwise.
         */
        Block.prototype.hasDataPort = function (iDataPort) {
            return this.dataPorts.indexOf(iDataPort) !== -1;
        };
        /**
         * Has data port name.
         * @private
         * @param {string} iName - The name of the data port.
         * @return {boolean} True if the block has the data port with provided name, false otherwise.
         */
        Block.prototype.hasDataPortName = function (iName) {
            return this.dataPortsByName[iName] !== undefined;
        };
        /**
         * Has optional data port.
         * @private
         * @param {EP.EDataPortType} [iType] - The data port type.
         * @return {boolean} True if the block has an optional data port with provided type, false otherwise.
         */
        Block.prototype.hasOptionalDataPort = function (iType) {
            return this.getDataPorts(iType).some(function (dataPort) { return dataPort.isOptional(); });
        };
        /**
         * Get data port by name.
         * @private
         * @param {string} iName - The name of the data port.
         * @return {DataPort} The data port with provided name.
         */
        Block.prototype.getDataPortByName = function (iName) {
            return this.dataPortsByName[iName];
        };
        /**
         * Get data ports.
         * @private
         * @param {EP.EDataPortType} [iType] - The data port type.
         * @return {DataPort[]} The data ports with provided type.
         */
        Block.prototype.getDataPorts = function (iType) {
            var dataPorts;
            if (iType === undefined) {
                dataPorts = this.dataPorts.slice(0);
            }
            else {
                dataPorts = this.dataPorts.filter(function (iDataPort) { return iDataPort.type === iType; });
            }
            return dataPorts;
        };
        /**
         * Create and add control port.
         * @private
         * @param {EventPortDefinitions.TAllTypes|ControlPortDefinitions.TAllTypes} iControlPortDefinition - The control port definition.
         * @return {ControlPort|undefined} The created control port.
         */
        Block.prototype.createControlPort = function (iControlPortDefinition) {
            var controlPort;
            if (iControlPortDefinition instanceof EventPortDefinitions.InputBasic ||
                iControlPortDefinition instanceof EventPortDefinitions.InputList ||
                iControlPortDefinition instanceof EventPortDefinitions.InputAll ||
                iControlPortDefinition instanceof EventPortDefinitions.OutputBasic ||
                iControlPortDefinition instanceof EventPortDefinitions.OutputList ||
                iControlPortDefinition instanceof EventPortDefinitions.OutputAll) {
                controlPort = new EventPort();
            }
            else if (iControlPortDefinition instanceof ControlPortDefinitions.Input ||
                iControlPortDefinition instanceof ControlPortDefinitions.Output) {
                controlPort = new ControlPort();
            }
            var result = controlPort !== undefined;
            result = result && controlPort.setType(iControlPortDefinition.type);
            result = result && controlPort.setName(iControlPortDefinition.name);
            if (result) {
                if (iControlPortDefinition instanceof EventPortDefinitions.InputBasic ||
                    iControlPortDefinition instanceof EventPortDefinitions.InputList ||
                    iControlPortDefinition instanceof EventPortDefinitions.InputAll ||
                    iControlPortDefinition instanceof EventPortDefinitions.OutputBasic ||
                    iControlPortDefinition instanceof EventPortDefinitions.OutputList ||
                    iControlPortDefinition instanceof EventPortDefinitions.OutputAll) {
                    result = result && controlPort.setEventTypes(iControlPortDefinition.eventTypes);
                    result = result && controlPort.setTypeCategory(iControlPortDefinition.typeCategory);
                    if (iControlPortDefinition.eventType !== undefined && iControlPortDefinition.eventType !== controlPort.getEventType()) {
                        result = result && controlPort.setEventType(iControlPortDefinition.eventType);
                    }
                }
            }
            result = result && this.addControlPort(controlPort);
            controlPort = result ? controlPort : undefined;
            return controlPort;
        };
        /**
         * Create and add control ports.
         * @private
         * @param {(EventPortDefinitions.TAllTypes | ControlPortDefinitions.TAllTypes)[]} iControlPortDefinitions - The list of control or event port definitions.
         * @return {ControlPort[]} The created control ports.
         */
        Block.prototype.createControlPorts = function (iControlPortDefinitions) {
            var controlPorts = [];
            for (var cpd = 0; cpd < iControlPortDefinitions.length; cpd++) {
                var controlPort = this.createControlPort(iControlPortDefinitions[cpd]);
                if (controlPort !== undefined) {
                    controlPorts.push(controlPort);
                }
            }
            return controlPorts;
        };
        /**
         * Is control port type addable.
         * @private
         * @param {EP.EControlPortType} iType - The control port type.
         * @return {boolean} True if control port with provided type is addable, false otherwise.
         */
        Block.prototype.isControlPortTypeAddable = function (iType) {
            var result = Object.keys(Enums.EControlPortType).some(function (key) { return Enums.EControlPortType[key] === iType; });
            var definition = this.getDefinition();
            if (definition !== undefined) {
                var definitionControlPorts = definition.getControlPorts(iType);
                var controlPorts = this.getControlPorts(iType);
                result = result && definitionControlPorts.length > controlPorts.length;
            }
            return result;
        };
        /**
         * Is control port addable.
         * @private
         * @param {ControlPort} iControlPort - The control port.
         * @return {boolean} True if the control port is addable, false otherwise.
         */
        Block.prototype.isControlPortAddable = function (iControlPort) {
            var result = iControlPort instanceof ControlPort;
            result = result && iControlPort.name !== undefined;
            result = result && iControlPort.type !== undefined;
            result = result && this.isControlPortTypeAddable(iControlPort.type);
            if (iControlPort instanceof EventPort) {
                result = result && iControlPort.getEventType() !== undefined;
            }
            result = result && iControlPort.block === undefined;
            result = result && !this.hasControlPort(iControlPort);
            result = result && !this.hasControlPortName(iControlPort.name);
            return result;
        };
        /**
         * Add control port.
         * @private
         * @param {ControlPort} iControlPort - The control port.
         * @return {boolean} True if the control port has been added, false otherwise.
         */
        Block.prototype.addControlPort = function (iControlPort) {
            var result = this.isControlPortAddable(iControlPort);
            if (result) {
                this.controlPorts.push(iControlPort);
                this.controlPortsByName[iControlPort.name] = iControlPort;
                iControlPort.onAdd(this);
                var event_6 = new Events.ControlPortAddEvent();
                event_6.controlPort = iControlPort;
                event_6.index = iControlPort.getIndex();
                event_6.indexByType = iControlPort.getIndexByType();
                this.dispatchEvent(event_6);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Is control port removable.
         * @private
         * @param {ControlPort} iControlPort - The control port.
         * @return {boolean} True if the control port is removable, false otherwise.
         */
        Block.prototype.isControlPortRemovable = function (iControlPort) {
            var result = iControlPort instanceof ControlPort;
            result = result && !iControlPort.isFromDefinition();
            result = result && iControlPort.block === this;
            result = result && this.hasControlPort(iControlPort);
            return result;
        };
        /**
         * Remove control port.
         * @private
         * @param {ControlPort} iControlPort - The control port.
         * @return {boolean} True if the control port has been removed, false otherwise.
         */
        Block.prototype.removeControlPort = function (iControlPort) {
            var result = this.isControlPortRemovable(iControlPort);
            if (result) {
                var index = iControlPort.getIndex();
                var indexByType = iControlPort.getIndexByType();
                iControlPort.onRemove();
                this.controlPorts.splice(index, 1);
                delete this.controlPortsByName[iControlPort.name];
                var event_7 = new Events.ControlPortRemoveEvent();
                event_7.controlPort = iControlPort;
                event_7.index = index;
                event_7.indexByType = indexByType;
                this.dispatchEvent(event_7);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Has control port.
         * @private
         * @param {ControlPort} iControlPort - The control port.
         * @return {boolean} True if the block has the provided control port, false otherwise
         */
        Block.prototype.hasControlPort = function (iControlPort) {
            return this.controlPorts.indexOf(iControlPort) !== -1;
        };
        /**
         * Has control port name.
         * @private
         * @param {string} iName - The name of the control port.
         * @return {boolean} True if the block has the control port with the provided name, false otherwise.
         */
        Block.prototype.hasControlPortName = function (iName) {
            return this.controlPortsByName[iName] !== undefined;
        };
        /**
         * Get control port by name.
         * @private
         * @param {string} iName - The name of the control port.
         * @return {ControlPort} The control port with provided name.
         */
        Block.prototype.getControlPortByName = function (iName) {
            return this.controlPortsByName[iName];
        };
        /**
         * Get control ports.
         * @private
         * @param {EP.EControlPortType} [iType] - The control port type.
         * @return {ControlPort[]} The list of control ports with provided type.
         */
        Block.prototype.getControlPorts = function (iType) {
            var controlPorts;
            if (iType === undefined) {
                controlPorts = this.controlPorts.slice(0);
            }
            else {
                controlPorts = this.controlPorts.filter(function (iControlPort) { return iControlPort.type === iType; });
            }
            return controlPorts;
        };
        /**
         * Create and add setting.
         * @private
         * @param {SettingDefinitions.TAllTypes} iSettingDefinition - The setting definition.
         * @return {Setting|undefined} - The created setting.
         */
        Block.prototype.createSetting = function (iSettingDefinition) {
            var setting = new Setting();
            var result = iSettingDefinition instanceof Object;
            result = result && setting.setName(iSettingDefinition.name);
            setting.block = this;
            if (iSettingDefinition instanceof SettingDefinitions.Basic ||
                iSettingDefinition instanceof SettingDefinitions.List ||
                iSettingDefinition instanceof SettingDefinitions.Category ||
                iSettingDefinition instanceof SettingDefinitions.All ||
                iSettingDefinition instanceof SettingDefinitions.Advanced) {
                if (iSettingDefinition.defaultValues !== undefined) {
                    result = result && setting.setDefaultValues(iSettingDefinition.defaultValues);
                }
                result = result && setting.setValueTypes(iSettingDefinition.valueTypes);
                result = result && setting.setTypeCategory(iSettingDefinition.typeCategory);
                if (iSettingDefinition.valueType !== undefined && iSettingDefinition.valueType !== setting.valueType) {
                    result = result && setting.setValueType(iSettingDefinition.valueType);
                }
            }
            setting.block = undefined;
            result = result && this.addSetting(setting);
            setting = result ? setting : undefined;
            return setting;
        };
        /**
         * Create and add settings.
         * @private
         * @param {SettingDefinitions.TAllTypes[]} iSettingDefinitions - The list of setting definitions.
         * @return {Setting[]} The list of created settings.
         */
        Block.prototype.createSettings = function (iSettingDefinitions) {
            var settings = [];
            for (var s = 0; s < iSettingDefinitions.length; s++) {
                var setting = this.createSetting(iSettingDefinitions[s]);
                if (setting !== undefined) {
                    settings.push(setting);
                }
            }
            return settings;
        };
        /**
         * Is setting type addable.
         * @private
         * @return {boolean} True setting type is addable, false otherwise.
         */
        Block.prototype.isSettingTypeAddable = function () {
            var result = true;
            var definition = this.getDefinition();
            if (definition !== undefined) {
                var definitionSettings = definition.getSettings();
                var settings = this.getSettings();
                result = definitionSettings.length > settings.length;
            }
            return result;
        };
        /**
         * Is setting addable.
         * @private
         * @param {Setting} iSetting - The setting.
         * @return {boolean} True if the setting is addable, false otherwise.
         */
        Block.prototype.isSettingAddable = function (iSetting) {
            var result = iSetting instanceof Setting;
            result = result && this.isSettingTypeAddable();
            result = result && iSetting.name !== undefined;
            result = result && iSetting.valueType !== undefined;
            result = result && iSetting.block === undefined;
            result = result && !this.hasSetting(iSetting);
            result = result && !this.hasSettingName(iSetting.name);
            return result;
        };
        /**
         * Add setting.
         * @private
         * @param {Setting} iSetting - The setting.
         * @return {boolean} True if the setting has been added, false otherwise.
         */
        Block.prototype.addSetting = function (iSetting) {
            var result = this.isSettingAddable(iSetting);
            if (result) {
                this.settings.push(iSetting);
                this.settingsByName[iSetting.name] = iSetting;
                iSetting.onAdd(this);
                var event_8 = new Events.SettingAddEvent();
                event_8.setting = iSetting;
                event_8.index = iSetting.getIndex();
                this.dispatchEvent(event_8);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Is setting removable.
         * @private
         * @param {Setting} iSetting - The setting.
         * @return {boolean} True if the setting is removable, false otherwise.
         */
        Block.prototype.isSettingRemovable = function (iSetting) {
            var result = iSetting instanceof Setting;
            result = result && !iSetting.isFromDefinition();
            result = result && iSetting.block === this;
            result = result && this.hasSetting(iSetting);
            return result;
        };
        /**
         * Remove setting.
         * @private
         * @param {Setting} iSetting - The setting.
         * @return {boolean} True if the setting has been removed, false otherwise.
         */
        Block.prototype.removeSetting = function (iSetting) {
            var result = this.isSettingRemovable(iSetting);
            if (result) {
                var index = iSetting.getIndex();
                iSetting.onRemove();
                this.settings.splice(index, 1);
                delete this.settingsByName[iSetting.name];
                var event_9 = new Events.SettingRemoveEvent();
                event_9.setting = iSetting;
                event_9.index = index;
                this.dispatchEvent(event_9);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Has setting.
         * @private
         * @param {Setting} iSetting - The setting.
         * @return {boolean} True is the block has the provided setting, false otherwise.
         */
        Block.prototype.hasSetting = function (iSetting) {
            return this.settings.indexOf(iSetting) !== -1;
        };
        /**
         * Has setting name.
         * @private
         * @param {string} iName - The name of the setting.
         * @return {boolean} True is the block has the setting with the provided name, false otherwise.
         */
        Block.prototype.hasSettingName = function (iName) {
            return this.settingsByName[iName] !== undefined;
        };
        /**
         * Get setting by name.
         * @private
         * @param {string} iName - The name of the setting.
         * @return {Setting} The setting with provided name.
         */
        Block.prototype.getSettingByName = function (iName) {
            return this.settingsByName[iName];
        };
        /**
         * Get settings.
         * @private
         * @return {Setting[]} The list of settings.
         */
        Block.prototype.getSettings = function () {
            return this.settings.slice(0);
        };
        /**
         * Activate nodeId selector.
         * @private
         */
        Block.prototype.activateNodeIdSelector = function () {
            this.nodeIdSelectorActivated = true;
        };
        /**
         * Get nodeId selector.
         * @private
         * @return {string} The nodeId selector.
         */
        Block.prototype.getNodeIdSelector = function () {
            return this.nodeIdSelector;
        };
        /**
         * Get allowed nodeId selectors.
         * @private
         * @return {string[]} The allowed nodeId selectors.
         */
        Block.prototype.getAllowedNodeIdSelectors = function () {
            var allowedNodeIdSelectors = [];
            if (this.graph !== undefined) {
                allowedNodeIdSelectors = Object.keys(this.graph.nodeIdSelectorsByName);
                allowedNodeIdSelectors.unshift(Tools.parentNodeIdSelector);
            }
            if (this.invalidNodeIdSelector !== undefined) {
                allowedNodeIdSelectors.push(this.invalidNodeIdSelector);
            }
            return allowedNodeIdSelectors;
        };
        /**
         * Is nodeId selector settable.
         * @private
         * @param {string} [iNodeIdSelector] - The nodeId selector.
         * @return {boolean} True if nodeId selector is settable, false otherwise.
         */
        Block.prototype.isNodeIdSelectorSettable = function (iNodeIdSelector) {
            var allowedNodeIdSelectors = this.getAllowedNodeIdSelectors();
            var result = this.nodeIdSelectorActivated;
            result = result && this.json === undefined;
            result = result && allowedNodeIdSelectors.length > 0;
            if (iNodeIdSelector !== undefined) {
                result = result && allowedNodeIdSelectors.indexOf(iNodeIdSelector) !== -1;
            }
            if (arguments.length !== 0) {
                result = result && this.nodeIdSelector !== iNodeIdSelector;
            }
            return result;
        };
        /**
         * Set invalid nodeId selector.
         * @private
         * @param {string} iNodeIdSelector - The invalid nodeId selector.
         * @return {boolean} True if the invalid nodeId selector has been set, false otherwise.
         */
        Block.prototype.setInvalidNodeIdSelector = function (iNodeIdSelector) {
            this.invalidNodeIdSelector = iNodeIdSelector;
            var result = this.setNodeIdSelector(iNodeIdSelector);
            return result;
        };
        /**
         * Set nodeId selector.
         * @private
         * @param {string} iNodeIdSelector - The nodeId selector.
         * @return {boolean} True if the nodeId selector has been set, false otherwise.
         */
        Block.prototype.setNodeIdSelector = function (iNodeIdSelector) {
            var result = arguments.length === 1;
            result = result && this.isNodeIdSelectorSettable(iNodeIdSelector);
            if (result) {
                if (this.nodeIdSelectorInstance !== undefined) {
                    this.nodeIdSelectorInstance.removeListener(Events.NodeIdSelectorNameChangeEvent, this.onNodeIdSelectorNameChangeBind);
                }
                this.nodeIdSelector = iNodeIdSelector;
                if (this.graph !== undefined) {
                    this.nodeIdSelectorInstance = this.graph.getNodeIdSelectorByName(this.nodeIdSelector);
                    if (this.nodeIdSelectorInstance !== undefined) {
                        this.nodeIdSelectorInstance.addListener(Events.NodeIdSelectorNameChangeEvent, this.onNodeIdSelectorNameChangeBind);
                    }
                }
                var event_10 = new Events.BlockNodeIdSelectorChangeEvent();
                event_10.block = this;
                event_10.index = this.getIndex();
                event_10.nodeIdSelector = this.nodeIdSelector;
                this.dispatchEvent(event_10);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * On nodeId selector remove.
         * @private
         * @param {NodeIdSelectorRemoveEvent} iNodeIdSelectorRemoveEvent - The nodeId selector remove event.
         */
        Block.prototype.onNodeIdSelectorRemove = function (iNodeIdSelectorRemoveEvent) {
            if (iNodeIdSelectorRemoveEvent.getNodeIdSelector() === this.nodeIdSelectorInstance) {
                this.setNodeIdSelector(undefined);
            }
        };
        /**
         * On nodeId selector name change.
         * @private
         * @param {NodeIdSelectorNameChangeEvent} iNodeIdSelectorNameChangeEvent - The nodeId selector name change event.
         */
        Block.prototype.onNodeIdSelectorNameChange = function (iNodeIdSelectorNameChangeEvent) {
            this.nodeIdSelector = iNodeIdSelectorNameChangeEvent.getName();
        };
        /**
         * Unlink.
         * @private
         * @return {boolean} True if the block has been unlinked, false otherwise.
         */
        Block.prototype.unlink = function () {
            var result = true;
            for (var dp = 0; dp < this.dataPorts.length; dp++) {
                result = this.dataPorts[dp].unlink(this.graph) && result;
            }
            for (var cp = 0; cp < this.controlPorts.length; cp++) {
                result = this.controlPorts[cp].unlink(this.graph) && result;
            }
            return result;
        };
        Block.pushObjectsByType = function (ioObjectsByType, iTypeName, iObject) {
            if (!ioObjectsByType.hasOwnProperty(iTypeName)) {
                ioObjectsByType[iTypeName] = [];
            }
            ioObjectsByType[iTypeName].push(iObject);
        };
        /**
         * Get objects by type.
         * @private
         * @param {IBlockElementsByType} [ioObjectsByType] - The objects by type.
         * @return {IBlockElementsByType} The objects by type.
         */
        Block.prototype.getObjectsByType = function (ioObjectsByType) {
            ioObjectsByType = ioObjectsByType || {};
            for (var dp = 0; dp < this.dataPorts.length; dp++) {
                this.dataPorts[dp].getObjectsByType(ioObjectsByType);
            }
            for (var cp = 0; cp < this.controlPorts.length; cp++) {
                var controlPort = this.controlPorts[cp];
                if (controlPort instanceof EventPort) {
                    var typeName = controlPort.getEventType();
                    Block.pushObjectsByType(ioObjectsByType, typeName, controlPort);
                }
            }
            for (var s = 0; s < this.settings.length; s++) {
                var setting = this.settings[s];
                var typeName = setting.getValueType();
                Block.pushObjectsByType(ioObjectsByType, typeName, setting);
            }
            return ioObjectsByType;
        };
        /**
         * Get blocks by uid.
         * @private
         * @param {IBlocksByUid} [ioBlocksByUid] - The blocks by Uid.
         * @return {IBlocksByUid} The blocks by Uid.
         */
        Block.prototype.getBlocksByUid = function (ioBlocksByUid) {
            ioBlocksByUid = ioBlocksByUid || {};
            var uid = this.getUid();
            if (!ioBlocksByUid.hasOwnProperty(uid)) {
                ioBlocksByUid[uid] = [];
            }
            ioBlocksByUid[uid].push(this);
            return ioBlocksByUid;
        };
        /**
         * Is exportable.
         * @private
         * @return {boolean} True if the block is exportable, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.isExportable = function () {
            return false;
        };
        /**
         * Export content.
         * @private
         * @return {string} The exported block content.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.exportContent = function () {
            return undefined;
        };
        /**
         * Export file name.
         * @private
         * @return {string} The exported block file name.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.exportFileName = function () {
            return undefined;
        };
        /**
         * Handle break point.
         * @private
         * @return {boolean} True if the block handles break point, false otherwise
         */
        Block.prototype.handleBreakpoint = function () {
            return !this.isFromContainedGraph() && !this.isContainedGraph();
        };
        /**
         * Handle step into.
         * @private
         * @return {boolean} True if the block handles step into, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.handleStepInto = function () {
            return false;
        };
        /**
         * This method defines the pre execution function that will be triggered by the Schematics Engine
         * in the context of the corresponding block.
         * @private
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.onPreExecute = function () { };
        /**
         * This method defines the execution function that will be triggered by the Schematics Engine
         * in the context of the corresponding block.
         * @private
         * @return {EP.EExecutionResult} The execution result.
         */
        // eslint-disable-next-line class-methods-use-this
        Block.prototype.execute = function () {
            return Enums.EExecutionResult.eExecutionError;
        };
        /**
         * This method defines the post execution function that will be triggered by the Schematics Engine
         * in the context of the corresponding block.
         * @private
         */
        Block.prototype.onPostExecute = function () {
            this.disableInputControlPorts();
        };
        return Block;
    }());
    Block.prototype.uid = '';
    Block.prototype.name = '';
    Block.prototype.category = '';
    Block.prototype.documentation = '';
    return Block;
});
