/* eslint-disable class-methods-use-this */
/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsControlPort'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsControlPort", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPEventServices/EPEventTarget", "DS/EPSSchematicsModelWeb/EPSSchematicsTools"], function (require, exports, Enums, Events, EventTarget, Tools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var ControlPort = /** @class */ (function () {
        /**
         * @constructor
         */
        function ControlPort() {
            this.renamable = false;
            this.valid = true;
            this.controlLinks = [];
            this.eventTarget = new EventTarget();
        }
        /**
         * Construct control port from JSON.
         * @private
         * @param {IJSONControlPort} iJSONControlPort - The JSON control port.
         */
        ControlPort.prototype.fromJSON = function (iJSONControlPort) {
            var controlPortByName = this.block.getControlPortByName(iJSONControlPort.name);
            if (controlPortByName !== undefined) {
                if (this.getIndex() < controlPortByName.getIndex()) {
                    controlPortByName.setName(Tools.generateGUID());
                }
            }
            this.setName(iJSONControlPort.name);
            this.setType(iJSONControlPort.portType);
        };
        /**
         * Construct JSON from control port.
         * @private
         * @param {IJSONControlPort} oJSONControlPort - The JSON control port.
         */
        ControlPort.prototype.toJSON = function (oJSONControlPort) {
            oJSONControlPort.name = this.name;
            oJSONControlPort.portType = this.type;
        };
        /**
         * Add listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        ControlPort.prototype.addListener = function (iEventCtor, iListener) {
            this.eventTarget.addListener(iEventCtor, iListener);
        };
        /**
         * Remove listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        ControlPort.prototype.removeListener = function (iEventCtor, iListener) {
            this.eventTarget.removeListener(iEventCtor, iListener);
        };
        /**
         * Dispatch event.
         * @private
         * @param {EP.Event} iEvent - The event to dispatch.
         */
        ControlPort.prototype.dispatchEvent = function (iEvent) {
            this.eventTarget.dispatchEvent(iEvent);
        };
        /**
         * Get control port path.
         * @private
         * @param {GraphBlock} [iGraph] - The graph block.
         * @return {string} The control port path.
         */
        ControlPort.prototype.toPath = function (iGraph) {
            var path;
            if (this.block !== undefined) {
                path = this.block.toPath(iGraph) + '.controlPorts[' + this.getIndex() + ']';
            }
            return path;
        };
        /**
         * From definition.
         * @private
         */
        ControlPort.prototype.fromDefinition = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            if (this.block instanceof BlockCtr &&
                this.block.hasDefinition()) {
                var definition = this.block.getDefinition().controlPorts[this.getIndex()];
                if (definition !== undefined) {
                    var jsonControlPort = {};
                    definition.toJSON(jsonControlPort);
                    this.fromJSON(jsonControlPort);
                }
            }
        };
        /**
         * Is from definition.
         * @private
         * @return {boolean} True if the control port is from defintion else false.
         */
        ControlPort.prototype.isFromDefinition = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var result = this.block instanceof BlockCtr;
            if (result && this.block.hasDefinition()) {
                result = this.block.getDefinition().controlPorts[this.getIndex()] !== undefined;
            }
            return result;
        };
        /**
         * Is from template.
         * @private
         * @return {boolean} True if the control port is from template else false.
         */
        ControlPort.prototype.isFromTemplate = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var result = this.block instanceof BlockCtr;
            if (result && !this.block.isTemplate()) {
                result = this.block.isFromTemplate();
            }
            return result;
        };
        /**
         * Is from invalid.
         * @private
         * @return {boolean} True if the control port is from invalid else false.
         */
        ControlPort.prototype.isFromInvalid = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var result = this.block instanceof BlockCtr;
            result = result && this.block.json !== undefined;
            return result;
        };
        /**
         * Is valid.
         * @private
         * @return {boolean} True if the control port is valid else false.
         */
        ControlPort.prototype.isValid = function () {
            return this.valid;
        };
        /**
         * Is start port.
         * @private
         * @param {GraphBlock} iGraph - The graph block.
         * @return {boolean} True if the control port is a start port else false.
         */
        ControlPort.prototype.isStartPort = function (iGraph) {
            var result = false;
            if (this.block === iGraph) {
                result = this.type === Enums.EControlPortType.eInput;
                result = result || this.type === Enums.EControlPortType.eInputEvent;
            }
            else {
                result = this.type === Enums.EControlPortType.eOutput;
                result = result || this.type === Enums.EControlPortType.eOutputEvent;
                result = result && this.block !== undefined;
                result = result && this.block.graph === iGraph;
            }
            return result;
        };
        /**
         * Is end port.
         * @private
         * @param {GraphBlock} iGraph - The graph block.
         * @return {boolean} True if the control port is an end port else false.
         */
        ControlPort.prototype.isEndPort = function (iGraph) {
            var result = false;
            if (this.block === iGraph) {
                result = this.type === Enums.EControlPortType.eOutput;
                result = result || this.type === Enums.EControlPortType.eOutputEvent;
            }
            else {
                result = this.type === Enums.EControlPortType.eInput;
                result = result || this.type === Enums.EControlPortType.eInputEvent;
                result = result && this.block !== undefined;
                result = result && this.block.graph === iGraph;
            }
            return result;
        };
        /**
         * Get documentation description.
         * @private
         * @return {string} The documentation description.
         */
        ControlPort.prototype.getDocumentationDescription = function () {
            var documentationDescription;
            if (this.block !== undefined) {
                var documentation = this.block.getDocumentation();
                if (documentation !== undefined) {
                    documentationDescription = documentation.getControlPortByName(this.name);
                }
            }
            return documentationDescription;
        };
        /**
         * Get index.
         * @private
         * @return {number} The control port index.
         */
        ControlPort.prototype.getIndex = function () {
            var index;
            if (this.block !== undefined) {
                index = this.block.getControlPorts().indexOf(this);
            }
            return index;
        };
        /**
         * Get index by type.
         * @private
         * @return {number} The control port index by type.
         */
        ControlPort.prototype.getIndexByType = function () {
            var indexByType;
            if (this.block !== undefined) {
                indexByType = this.block.getControlPorts(this.type).indexOf(this);
            }
            return indexByType;
        };
        /**
         * Get graph context.
         * @private
         * @return {GraphBlock} The graph context.
         */
        ControlPort.prototype.getGraphContext = function () {
            var graphContext;
            if (this.block !== undefined) {
                graphContext = this.block.getGraphContext();
            }
            return graphContext;
        };
        /**
         * On add.
         * @private
         * @param {Block} iBlock - The block.
         */
        ControlPort.prototype.onAdd = function (iBlock) {
            this.block = iBlock;
            if (this.getGraphContext() !== undefined) {
                this.onGraphContextIn();
            }
        };
        /**
         * On remove.
         * @private
         */
        ControlPort.prototype.onRemove = function () {
            if (this.getGraphContext() !== undefined) {
                this.onGraphContextOut();
            }
            this.unlink();
            this.block = undefined;
        };
        /**
         * On graph context in.
         * @private
         */
        ControlPort.prototype.onGraphContextIn = function () {
        };
        /**
         * On graph context out.
         * @private
         */
        ControlPort.prototype.onGraphContextOut = function () {
        };
        /**
         * Get type.
         * @private
         * @return {EP.EControlPortType} The control port type.
         */
        ControlPort.prototype.getType = function () {
            return this.type;
        };
        /**
         * Set type.
         * @private
         * @param {EP.EControlPortType} iType - The control port type.
         * @return {boolean} True if the control port type has changed, false otherwise.
         */
        ControlPort.prototype.setType = function (iType) {
            var result = this.type === undefined;
            result = result && Object.keys(Enums.EControlPortType).some(function (key) { return iType === Enums.EControlPortType[key]; });
            if (result) {
                this.type = iType;
            }
            return result;
        };
        /**
         * Get name.
         * @private
         * @return {string} The control port name.
         */
        ControlPort.prototype.getName = function () {
            return this.name;
        };
        /**
         * Set renamable.
         * @private
         * @param {boolean} iRenamable - The control port renamable state.
         * @return {boolean} True if the renamable state has changed, false otherwise.
         */
        ControlPort.prototype.setRenamable = function (iRenamable) {
            var result = typeof iRenamable === 'boolean';
            if (result) {
                this.renamable = iRenamable;
            }
            return result;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] - The control port name.
         * @return {boolean} True if the control port name is settable, false otherwise.
         */
        ControlPort.prototype.isNameSettable = function (iName) {
            var result = true;
            if (arguments.length !== 0) {
                result = result && typeof iName === 'string';
                result = result && iName.length !== 0;
                result = result && iName !== this.name;
                if (this.block !== undefined) {
                    result = result && this.block.controlPortsByName[iName] === undefined;
                }
            }
            if (this.name !== undefined) {
                result = result && !this.isFromInvalid();
                result = result && !this.isFromTemplate();
                if (result && this.isFromDefinition()) {
                    result = this.renamable;
                }
                var DynamicBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock');
                if (this.block instanceof DynamicBlockCtr) {
                    result = result && !this.block.controlPortRules[this.type].nameReadonly;
                }
            }
            return result;
        };
        /**
         * Set name.
         * @private
         * @param {string} iName - The control port name.
         * @return {boolean} True if the control port name has been set, false otherwise.
         */
        ControlPort.prototype.setName = function (iName) {
            var result = arguments.length === 1;
            result = result && this.isNameSettable(iName);
            if (result) {
                if (this.block !== undefined) {
                    delete this.block.controlPortsByName[this.name];
                    this.block.controlPortsByName[iName] = this;
                }
                this.name = iName;
                if (this.block !== undefined) {
                    var event_1 = new Events.ControlPortNameChangeEvent();
                    event_1.controlPort = this;
                    event_1.index = this.getIndex();
                    event_1.indexByType = this.getIndexByType();
                    event_1.name = this.name;
                    this.dispatchEvent(event_1);
                }
            }
            return result;
        };
        /**
         * Get control links.
         * @private
         * @param {GraphBlock} [iGraph] - The graph block.
         * @return {ControlLink[]} The control port control links.
         */
        ControlPort.prototype.getControlLinks = function (iGraph) {
            var controlLinks;
            if (iGraph === undefined) {
                controlLinks = this.controlLinks.slice(0);
            }
            else {
                controlLinks = this.controlLinks.filter(function (iControlLink) { return iControlLink.graph === iGraph; });
            }
            return controlLinks;
        };
        /**
         * Unlink.
         * @private
         * @param {GraphBlock} [iGraph] - The graph block.
         * @return {boolean} True if the control port has been unlinked, false otherwise.
         */
        ControlPort.prototype.unlink = function (iGraph) {
            var result = true;
            var controlLinks = this.getControlLinks(iGraph);
            for (var cl = 0; cl < controlLinks.length; cl++) {
                result = controlLinks[cl].unlink() && result;
            }
            return result;
        };
        return ControlPort;
    }());
    return ControlPort;
});
