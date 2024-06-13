/* eslint-disable class-methods-use-this */
/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsNodeIdSelector'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsNodeIdSelector", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsPolyfill", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPEventServices/EPEventTarget"], function (require, exports, Enums, Polyfill, Tools, Events, EventTarget) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var NodeIdSelector = /** @class */ (function () {
        /**
         * @constructor
         */
        function NodeIdSelector() {
            this.queuing = true;
            this.maxInstanceCount = 1;
            this.eventTarget = new EventTarget();
        }
        /**
         * Construct node id selector from JSON.
         * @private
         * @param {IJSONNodeIdSelector} iJSONNodeIdSelector - The JSON node id selector.
         */
        NodeIdSelector.prototype.fromJSON = function (iJSONNodeIdSelector) {
            var nodeIdSelectorByName = this.graph.getNodeIdSelectorByName(iJSONNodeIdSelector.name);
            if (nodeIdSelectorByName !== undefined) {
                var nodeIdSelectors = this.graph.getNodeIdSelectors();
                var nodeIdSelectorByNameIndex = nodeIdSelectors.indexOf(nodeIdSelectorByName);
                var thisIndex = nodeIdSelectors.indexOf(this);
                if (thisIndex < nodeIdSelectorByNameIndex) {
                    nodeIdSelectorByName.setName(Tools.generateGUID());
                }
            }
            this.setName(iJSONNodeIdSelector.name);
            this.setPool(iJSONNodeIdSelector.pool);
            this.setCriterion(iJSONNodeIdSelector.criterion);
            this.setIdentifier(iJSONNodeIdSelector.identifier);
            this.setQueuing(iJSONNodeIdSelector.queuing);
            this.setTimeout(iJSONNodeIdSelector.timeout);
            this.setMaxInstanceCount(iJSONNodeIdSelector.maxInstanceCount);
            this.setCmdLine(iJSONNodeIdSelector.cmdLine);
        };
        /**
         * Construct JSON from node id selector.
         * @private
         * @param {IJSONNodeIdSelector} oJSONNodeIdSelector - The JSON node id selector.
         */
        NodeIdSelector.prototype.toJSON = function (oJSONNodeIdSelector) {
            oJSONNodeIdSelector.name = this.getName();
            oJSONNodeIdSelector.pool = this.getPool();
            oJSONNodeIdSelector.criterion = this.getCriterion();
            oJSONNodeIdSelector.identifier = this.getIdentifier();
            oJSONNodeIdSelector.queuing = this.getQueuing();
            oJSONNodeIdSelector.timeout = this.getTimeout();
            oJSONNodeIdSelector.maxInstanceCount = this.getMaxInstanceCount();
            oJSONNodeIdSelector.cmdLine = this.getCmdLine();
        };
        /**
         * Add listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        NodeIdSelector.prototype.addListener = function (iEventCtor, iListener) {
            this.eventTarget.addListener(iEventCtor, iListener);
        };
        /**
         * Remove listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        NodeIdSelector.prototype.removeListener = function (iEventCtor, iListener) {
            this.eventTarget.removeListener(iEventCtor, iListener);
        };
        /**
         * Dispatch event.
         * @private
         * @param {EP.Event} iEvent - The event to dispatch.
         */
        NodeIdSelector.prototype.dispatchEvent = function (iEvent) {
            this.eventTarget.dispatchEvent(iEvent);
        };
        /**
         * On add.
         * @private
         * @param {GraphBlock} iGraphBlock - The graph block.
         */
        NodeIdSelector.prototype.onAdd = function (iGraphBlock) {
            this.graph = iGraphBlock;
            this.onGraphContextIn();
        };
        /**
         * On remove.
         * @private
         */
        NodeIdSelector.prototype.onRemove = function () {
            this.onGraphContextOut();
            this.graph = undefined;
        };
        /**
         * On graph context in.
         * @private
         */
        NodeIdSelector.prototype.onGraphContextIn = function () {
        };
        /**
         * On graph context out.
         * @private
         */
        NodeIdSelector.prototype.onGraphContextOut = function () {
        };
        /**
         * Get index.
         * @private
         * @return {number} The nodeIdSelector index.
         */
        NodeIdSelector.prototype.getIndex = function () {
            var index;
            if (this.graph !== undefined) {
                index = this.graph.getNodeIdSelectors().indexOf(this);
            }
            return index;
        };
        /**
         * Get name.
         * @private
         * @return {string} The nodeIdSelector name.
         */
        NodeIdSelector.prototype.getName = function () {
            return this.name;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] - The nodeIdSelector name.
         * @return {boolean} True if settable else false.
         */
        NodeIdSelector.prototype.isNameSettable = function (iName) {
            var result = true;
            if (arguments.length !== 0) {
                result = result && typeof iName === 'string';
                result = result && iName.length !== 0;
                result = result && iName !== this.name;
                result = result && iName !== Tools.parentNodeIdSelector;
                if (this.graph !== undefined) {
                    result = result && this.graph.nodeIdSelectorsByName[iName] === undefined;
                }
            }
            return result;
        };
        /**
         * Set name.
         * @private
         * @param {string} iName - The nodeIdSelector name.
         * @return {boolean} True if name has changed, false otherwise.
         */
        NodeIdSelector.prototype.setName = function (iName) {
            var result = arguments.length === 1;
            result = result && this.isNameSettable(iName);
            if (result) {
                if (this.graph !== undefined) {
                    delete this.graph.nodeIdSelectorsByName[this.name];
                    this.graph.nodeIdSelectorsByName[iName] = this;
                }
                this.name = iName;
                if (this.graph !== undefined) {
                    var event_1 = new Events.NodeIdSelectorNameChangeEvent();
                    event_1.nodeIdSelector = this;
                    event_1.index = this.getIndex();
                    event_1.name = this.name;
                    this.dispatchEvent(event_1);
                }
            }
            return result;
        };
        /**
         * Get pool.
         * @private
         * @return {string} The nodeIdSelector pool.
         */
        NodeIdSelector.prototype.getPool = function () {
            return this.pool;
        };
        /**
         * Is pool settable.
         * @private
         * @param {string} [iPool] - The pool name.
         * @return {boolean} Whether pool is settable.
         */
        NodeIdSelector.prototype.isPoolSettable = function (iPool) {
            var result = true;
            if (arguments.length !== 0) {
                result = result && typeof iPool === 'string';
                result = result && iPool.length !== 0;
                result = result && iPool !== this.pool;
            }
            return result;
        };
        /**
         * Set pool.
         * @private
         * @param {string} iPool - The pool name.
         * @return {boolean} True if name has changed else false.
         */
        NodeIdSelector.prototype.setPool = function (iPool) {
            var result = arguments.length === 1;
            result = result && this.isPoolSettable(iPool);
            if (result) {
                this.pool = iPool;
                if (this.graph !== undefined) {
                    var event_2 = new Events.NodeIdSelectorPoolChangeEvent();
                    event_2.nodeIdSelector = this;
                    event_2.index = this.getIndex();
                    event_2.pool = this.pool;
                    this.dispatchEvent(event_2);
                }
            }
            return result;
        };
        /**
         * Get criterion.
         * @private
         * @return {EP.ECriterion} The criterion.
         */
        NodeIdSelector.prototype.getCriterion = function () {
            return this.criterion;
        };
        /**
         * Is criterion settable.
         * @private
         * @param {EP.ECriterion} [iCriterion] - The criterion.
         * @return {boolean} True if the criterion is settable else false.
         */
        NodeIdSelector.prototype.isCriterionSettable = function (iCriterion) {
            var result = true;
            if (arguments.length !== 0) {
                if (iCriterion !== undefined) {
                    result = result && Object.keys(Enums.ECriterion).some(function (key) { return iCriterion === Enums.ECriterion[key]; });
                }
                result = result && iCriterion !== this.criterion;
            }
            return result;
        };
        /**
         * Set criterion.
         * @private
         * @param {EP.ECriterion} iCriterion - The criterion.
         * @return {boolean} True if the criterion has changed, else false.
         */
        NodeIdSelector.prototype.setCriterion = function (iCriterion) {
            var result = arguments.length === 1;
            result = result && this.isCriterionSettable(iCriterion);
            if (result) {
                if (this.criterion === Enums.ECriterion.eIdentifier) {
                    this.setIdentifier(undefined);
                }
                this.criterion = iCriterion;
                if (this.graph !== undefined) {
                    var event_3 = new Events.NodeIdSelectorCriterionChangeEvent();
                    event_3.nodeIdSelector = this;
                    event_3.index = this.getIndex();
                    event_3.criterion = this.criterion;
                    this.dispatchEvent(event_3);
                }
            }
            return result;
        };
        /**
         * Get identifier.
         * @private
         * @return {string} The identifier.
         */
        NodeIdSelector.prototype.getIdentifier = function () {
            return this.identifier;
        };
        /**
         * Is identifier settable.
         * @private
         * @param {string} [iIdentifier] - The identifier.
         * @return {boolean} True if the identifier is settable else false.
         */
        NodeIdSelector.prototype.isIdentifierSettable = function (iIdentifier) {
            var result = this.criterion === Enums.ECriterion.eIdentifier;
            if (arguments.length !== 0) {
                if (iIdentifier !== undefined) {
                    result = result && typeof iIdentifier === 'string';
                    result = result && iIdentifier.length !== 0;
                }
                result = result && iIdentifier !== this.identifier;
            }
            return result;
        };
        /**
         * Set identifier.
         * @private
         * @param {string} iIdentifier - The identifier.
         * @return {boolean} True if the identifier has changed else false.
         */
        NodeIdSelector.prototype.setIdentifier = function (iIdentifier) {
            var result = arguments.length === 1;
            result = result && this.isIdentifierSettable(iIdentifier);
            if (result) {
                this.identifier = iIdentifier;
                if (this.graph !== undefined) {
                    var event_4 = new Events.NodeIdSelectorIdentifierChangeEvent();
                    event_4.nodeIdSelector = this;
                    event_4.index = this.getIndex();
                    event_4.identifier = this.identifier;
                    this.dispatchEvent(event_4);
                }
            }
            return result;
        };
        /**
         * Get queuing.
         * @private
         * @return {boolean} The queuing.
         */
        NodeIdSelector.prototype.getQueuing = function () {
            return this.queuing;
        };
        /**
         * Is queuing settable.
         * @private
         * @param {boolean} [iQueuing] - The queuing.
         * @return {boolean} True if the queuing is settable else false.
         */
        NodeIdSelector.prototype.isQueuingSettable = function (iQueuing) {
            var result = true;
            if (arguments.length !== 0) {
                result = result && typeof iQueuing === 'boolean';
                result = result && iQueuing !== this.queuing;
            }
            return result;
        };
        /**
         * Set queuing.
         * @private
         * @param {boolean} iQueuing - The queuing.
         * @return {boolean} True if the queuing has changed else false.
         */
        NodeIdSelector.prototype.setQueuing = function (iQueuing) {
            var result = arguments.length === 1;
            result = result && this.isQueuingSettable(iQueuing);
            if (result) {
                this.queuing = iQueuing;
                if (this.graph !== undefined) {
                    var event_5 = new Events.NodeIdSelectorQueuingChangeEvent();
                    event_5.nodeIdSelector = this;
                    event_5.index = this.getIndex();
                    event_5.queuing = this.queuing;
                    this.dispatchEvent(event_5);
                }
            }
            return result;
        };
        /**
         * Get timeout.
         * @private
         * @return {number} The timeout.
         */
        NodeIdSelector.prototype.getTimeout = function () {
            return this.timeout;
        };
        /**
         * Is timeout settable.
         * @private
         * @param {number} [iTimeout] - The timeout.
         * @return {boolean} True if the timeout is settable else false.
         */
        NodeIdSelector.prototype.isTimeoutSettable = function (iTimeout) {
            var result = true;
            if (arguments.length !== 0) {
                if (iTimeout !== undefined) {
                    result = result && Polyfill.isInteger(iTimeout);
                    result = result && iTimeout >= 0;
                }
                result = result && iTimeout !== this.timeout;
            }
            return result;
        };
        /**
         * Set timeout.
         * @private
         * @param {number} iTimeout - The timeout.
         * @return {boolean} True if the timeout has changed else false.
         */
        NodeIdSelector.prototype.setTimeout = function (iTimeout) {
            var result = arguments.length === 1;
            result = result && this.isTimeoutSettable(iTimeout);
            if (result) {
                this.timeout = iTimeout;
                if (this.graph !== undefined) {
                    var event_6 = new Events.NodeIdSelectorTimeoutChangeEvent();
                    event_6.nodeIdSelector = this;
                    event_6.index = this.getIndex();
                    event_6.timeout = this.timeout;
                    this.dispatchEvent(event_6);
                }
            }
            return result;
        };
        /**
         * Get max instance count.
         * @private
         * @return {number} The max instance count.
         */
        NodeIdSelector.prototype.getMaxInstanceCount = function () {
            return this.maxInstanceCount;
        };
        /**
         * Is max instance count settable.
         * @private
         * @param {number} [iMaxInstanceCount] - The max instance count.
         * @return {boolean} True if max instance count is settable else false.
         */
        NodeIdSelector.prototype.isMaxInstanceCountSettable = function (iMaxInstanceCount) {
            var result = true;
            if (arguments.length !== 0) {
                result = result && Polyfill.isInteger(iMaxInstanceCount);
                result = result && iMaxInstanceCount > 0;
                result = result && iMaxInstanceCount !== this.maxInstanceCount;
            }
            return result;
        };
        /**
         * Set max instance count.
         * @private
         * @param {number} iMaxInstanceCount - The max instance count.
         * @return {boolean} True if the max instance count has changed else false.
         */
        NodeIdSelector.prototype.setMaxInstanceCount = function (iMaxInstanceCount) {
            var result = arguments.length === 1;
            result = result && this.isMaxInstanceCountSettable(iMaxInstanceCount);
            if (result) {
                this.maxInstanceCount = iMaxInstanceCount;
                if (this.graph !== undefined) {
                    var event_7 = new Events.NodeIdSelectorMaxInstanceCountChangeEvent();
                    event_7.nodeIdSelector = this;
                    event_7.index = this.getIndex();
                    event_7.maxInstanceCount = this.maxInstanceCount;
                    this.dispatchEvent(event_7);
                }
            }
            return result;
        };
        /**
         * Get cmd line.
         * @private
         * @return {string} The cmd line.
         */
        NodeIdSelector.prototype.getCmdLine = function () {
            return this.cmdLine;
        };
        /**
         * Is cmd line settable.
         * @private
         * @param {string} [iCmdLine] - The cmd line.
         * @return {boolean} True if the cmd line is settable else false.
         */
        NodeIdSelector.prototype.isCmdLineSettable = function (iCmdLine) {
            var result = true;
            if (arguments.length !== 0) {
                if (iCmdLine !== undefined) {
                    result = result && typeof iCmdLine === 'string';
                    result = result && iCmdLine.length !== 0;
                }
                result = result && iCmdLine !== this.cmdLine;
            }
            return result;
        };
        /**
         * Set cmd line.
         * @private
         * @param {string} iCmdLine - The cmd line.
         * @return {boolean} True if the cmd line has changed else false.
         */
        NodeIdSelector.prototype.setCmdLine = function (iCmdLine) {
            var result = arguments.length === 1;
            result = result && this.isCmdLineSettable(iCmdLine);
            if (result) {
                this.cmdLine = iCmdLine;
                if (this.graph !== undefined) {
                    var event_8 = new Events.NodeIdSelectorCmdLineChangeEvent();
                    event_8.nodeIdSelector = this;
                    event_8.index = this.getIndex();
                    event_8.cmdLine = this.cmdLine;
                    this.dispatchEvent(event_8);
                }
            }
            return result;
        };
        return NodeIdSelector;
    }());
    return NodeIdSelector;
});
