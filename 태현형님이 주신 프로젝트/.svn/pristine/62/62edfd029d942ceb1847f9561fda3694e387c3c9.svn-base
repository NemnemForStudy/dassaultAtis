/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsControlLink'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsControlLink", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPort", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPort", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsPolyfill", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPEventServices/EPEventTarget"], function (require, exports, ControlPort, EventPort, Events, Polyfill, TypeLibrary, EventTarget) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var ControlLink = /** @class */ (function () {
        function ControlLink() {
            this.valid = true;
            this.waitCount = 0;
            this.eventTarget = new EventTarget();
            this.onCastLevelChangeListener = this.onCastLevelChange.bind(this);
            this.onValidityChangeListener = this.onValidityChange.bind(this);
        }
        /**
         * Construct control link from JSON.
         * @private
         * @param {IJSONControlLink} iJSONControlLink - The JSON control link.
         */
        ControlLink.prototype.fromJSON = function (iJSONControlLink) {
            this.setWaitCount(iJSONControlLink.waitCount);
        };
        /**
         * Construct JSON from control link.
         * @private
         * @param {Object} oJSONControlLink - The JSON control link.
         */
        ControlLink.prototype.toJSON = function (oJSONControlLink) {
            oJSONControlLink.startPort = this.startPort.toPath(this.graph);
            oJSONControlLink.endPort = this.endPort.toPath(this.graph);
            oJSONControlLink.waitCount = this.getWaitCount();
        };
        /**
         * Add listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        ControlLink.prototype.addListener = function (iEventCtor, iListener) {
            this.eventTarget.addListener(iEventCtor, iListener);
        };
        /**
         * Remove listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        ControlLink.prototype.removeListener = function (iEventCtor, iListener) {
            this.eventTarget.removeListener(iEventCtor, iListener);
        };
        /**
         * Dispatch event.
         * @private
         * @param {EP.Event} iEvent - The event to dispatch.
         */
        ControlLink.prototype.dispatchEvent = function (iEvent) {
            this.eventTarget.dispatchEvent(iEvent);
        };
        /**
         * Get control link path.
         * @private
         * @param {GraphBlock} [iGraph] - The graph block.
         * @return {string} The control link path.
         */
        ControlLink.prototype.toPath = function (iGraph) {
            var path;
            if (this.graph !== undefined) {
                path = this.graph.toPath(iGraph) + '.controlLinks[' + this.getIndex() + ']';
            }
            return path;
        };
        /**
         * Is from template.
         * @private
         * @return {boolean} True if from template, false otherwise.
         */
        ControlLink.prototype.isFromTemplate = function () {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            var result = this.graph instanceof GraphBlockCtr;
            if (result && !this.graph.isTemplate()) {
                result = this.graph.isFromTemplate();
            }
            return result;
        };
        /**
         * Get start port.
         * @private
         * @return {ControlPort} The start control port.
         */
        ControlLink.prototype.getStartPort = function () {
            return this.startPort;
        };
        /**
         * Get end port.
         * @private
         * @return {ControlPort} The end control port.
         */
        ControlLink.prototype.getEndPort = function () {
            return this.endPort;
        };
        /**
         * Get cast level.
         * @private
         * @return {EP.ECastLevel} The cast level.
         */
        ControlLink.prototype.getCastLevel = function () {
            return this.castLevel;
        };
        /**
         * Is valid.
         * @private
         * @return {boolean} True if the control port is valid, false otherwise.
         */
        ControlLink.prototype.isValid = function () {
            return this.valid;
        };
        /**
         * Compute validity.
         * @private
         * @return {boolean} The validity result.
         */
        ControlLink.prototype.computeValidity = function () {
            var result = true;
            if (this.startPort instanceof EventPort && this.endPort instanceof EventPort) {
                result = this.castLevel <= this.graph.getSettingByName('CastLevel').getValue();
            }
            return result;
        };
        /**
         * On validity change.
         * @private
         */
        ControlLink.prototype.onValidityChange = function () {
            var newValid = this.computeValidity();
            if (this.valid !== newValid) {
                this.valid = newValid;
                var event_1 = new Events.ControlLinkValidityChangeEvent();
                event_1.controlLink = this;
                event_1.index = this.getIndex();
                this.dispatchEvent(event_1);
                this.graph.onValidityChange();
            }
        };
        /**
         * Get index.
         * @private
         * @return {number} The control link index.
         */
        ControlLink.prototype.getIndex = function () {
            var index;
            if (this.graph !== undefined) {
                index = this.graph.getControlLinks().indexOf(this);
            }
            return index;
        };
        /**
         * Get graph context.
         * @private
         * @return {GraphBlock} The graph context.
         */
        ControlLink.prototype.getGraphContext = function () {
            var graphContext;
            if (this.graph !== undefined) {
                graphContext = this.graph.getGraphContext();
            }
            return graphContext;
        };
        ControlLink.isControlLinkAvailable = function (iStartPort, iEndPort, iGraph) {
            var result = iStartPort.getControlLinks(iGraph).every(function (controlLink) { return controlLink.endPort !== iEndPort; });
            return result;
        };
        ControlLink.isCastable = function (iPort1, iPort2, iGraph) {
            var result = false;
            var castLevel = TypeLibrary.getCastLevel(iGraph.getGraphContext(), iPort1.getEventType(), iPort2.getEventType());
            result = castLevel <= iGraph.getSettingByName('CastLevel').getValue();
            return result;
        };
        ControlLink.isGraphBlock = function (iGraph) {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            var result = iGraph instanceof GraphBlockCtr;
            result = result && !iGraph.isTemplate();
            result = result && !iGraph.isFromTemplate();
            return result;
        };
        ControlLink.isLinked = function (iLink) {
            var result = iLink.graph !== undefined;
            result = result && iLink.startPort !== undefined;
            result = result && iLink.endPort !== undefined;
            return result;
        };
        /**
         * Are linkable ports.
         * @private
         * @param {ControlPort} iPort1 - The first control port.
         * @param {ControlPort} iPort2 - The second control port.
         * @param {GraphBlock} iGraph - The graph block.
         * @return {boolean} True if linkable, false otherwise.
         */
        ControlLink.prototype.isLinkable = function (iPort1, iPort2, iGraph) {
            var result = false;
            if (ControlLink.isGraphBlock(iGraph) && !ControlLink.isLinked(this) && iPort1 instanceof ControlPort && iPort2 instanceof ControlPort) {
                if (iPort1.isStartPort(iGraph) && iPort2.isEndPort(iGraph) && ControlLink.isControlLinkAvailable(iPort1, iPort2, iGraph)) {
                    result = (!(iPort1 instanceof EventPort) && !(iPort2 instanceof EventPort));
                    result = result || (iPort1 instanceof EventPort && iPort1.block === iGraph);
                    result = result || (iPort2 instanceof EventPort && iPort2.block === iGraph);
                    if (iPort1 instanceof EventPort && iPort2 instanceof EventPort) {
                        result = !this.valid;
                        result = result || ControlLink.isCastable(iPort1, iPort2, iGraph);
                    }
                }
                else if (iPort2.isStartPort(iGraph) && iPort1.isEndPort(iGraph) && ControlLink.isControlLinkAvailable(iPort2, iPort1, iGraph)) {
                    result = (!(iPort1 instanceof EventPort) && !(iPort2 instanceof EventPort));
                    result = result || (iPort1 instanceof EventPort && iPort1.block === iGraph);
                    result = result || (iPort2 instanceof EventPort && iPort2.block === iGraph);
                    if (iPort1 instanceof EventPort && iPort2 instanceof EventPort) {
                        result = !this.valid;
                        result = result || ControlLink.isCastable(iPort2, iPort1, iGraph);
                    }
                }
            }
            return result;
        };
        /**
         * On add.
         * @private
         * @param {GraphBlock} iGraphBlock - The graph block.
         */
        ControlLink.prototype.onAdd = function (iGraphBlock) {
            this.graph = iGraphBlock;
            if (this.startPort instanceof EventPort && this.endPort instanceof EventPort) {
                this.startPort.addListener(Events.ControlPortEventTypeChangeEvent, this.onCastLevelChangeListener);
                this.endPort.addListener(Events.ControlPortEventTypeChangeEvent, this.onCastLevelChangeListener);
                var castLevelSetting = iGraphBlock.getSettingByName('CastLevel');
                castLevelSetting.addListener(Events.SettingValueChangeEvent, this.onValidityChangeListener);
            }
            this.onGraphContextIn();
        };
        /**
         * On remove.
         * @private
         * @param {GraphBlock} iGraphBlock - The graph block.
         */
        ControlLink.prototype.onRemove = function (iGraphBlock) {
            this.onGraphContextOut();
            if (this.startPort instanceof EventPort && this.endPort instanceof EventPort) {
                this.startPort.removeListener(Events.ControlPortEventTypeChangeEvent, this.onCastLevelChangeListener);
                this.endPort.removeListener(Events.ControlPortEventTypeChangeEvent, this.onCastLevelChangeListener);
                var castLevelSetting = iGraphBlock.getSettingByName('CastLevel');
                castLevelSetting.removeListener(Events.SettingValueChangeEvent, this.onValidityChangeListener);
            }
            this.graph = undefined;
            this.startPort.controlLinks.splice(this.startPort.controlLinks.indexOf(this), 1);
            this.startPort = undefined;
            this.endPort.controlLinks.splice(this.endPort.controlLinks.indexOf(this), 1);
            this.endPort = undefined;
            this.castLevel = undefined;
        };
        /**
         * On graph context in.
         * @private
         */
        // eslint-disable-next-line class-methods-use-this
        ControlLink.prototype.onGraphContextIn = function () { };
        /**
         * On graph context out.
         * @private
         */
        // eslint-disable-next-line class-methods-use-this
        ControlLink.prototype.onGraphContextOut = function () { };
        /**
         * Link.
         * @private
         * @param {ControlPort} iPort1 - The first control port.
         * @param {ControlPort} iPort2 - The second control port.
         * @param {GraphBlock} iGraph - The graph block.
         * @return {boolean} True if link was created, false otherwise.
         */
        ControlLink.prototype.link = function (iPort1, iPort2, iGraph) {
            var result = this.isLinkable(iPort1, iPort2, iGraph);
            if (result) {
                this.startPort = iPort1.isStartPort(iGraph) ? iPort1 : iPort2;
                this.endPort = this.startPort === iPort2 ? iPort1 : iPort2;
                if (this.startPort instanceof EventPort && this.endPort instanceof EventPort) {
                    this.castLevel = TypeLibrary.getCastLevel(iGraph.getGraphContext(), this.startPort.getEventType(), this.endPort.getEventType());
                }
                this.startPort.controlLinks.push(this);
                this.endPort.controlLinks.push(this);
                result = iGraph.addControlLink(this);
            }
            return result;
        };
        /**
         * Unlink.
         * @private
         * @return {boolean} True if the link was unlinked, false otherwise.
         */
        ControlLink.prototype.unlink = function () {
            var result = !this.isFromTemplate();
            result = result && this.startPort !== undefined;
            result = result && this.endPort !== undefined;
            result = result && this.graph !== undefined;
            result = result && this.graph.removeControlLink(this);
            return result;
        };
        /**
         * On cast level change.
         * @private
         */
        ControlLink.prototype.onCastLevelChange = function () {
            var castLevel = TypeLibrary.getCastLevel(this.getGraphContext(), this.startPort.getEventType(), this.endPort.getEventType());
            if (castLevel !== this.castLevel) {
                this.castLevel = castLevel;
                var event_2 = new Events.ControlLinkCastLevelChangeEvent();
                event_2.controlLink = this;
                event_2.index = this.getIndex();
                this.dispatchEvent(event_2);
                this.onValidityChange();
            }
        };
        /**
         * Get wait count.
         * @private
         * @return {number} The wait count.
         */
        ControlLink.prototype.getWaitCount = function () {
            return this.waitCount;
        };
        /**
         * Set wait count.
         * @private
         * @param {number} iWaitCount - The wait count.
         * @return {boolean} True if the wait count was set, false otherwise.
         */
        ControlLink.prototype.setWaitCount = function (iWaitCount) {
            var result = !this.isFromTemplate();
            result = result && Polyfill.isInteger(iWaitCount);
            result = result && iWaitCount >= 0;
            result = result && iWaitCount !== this.waitCount;
            if (result) {
                this.waitCount = iWaitCount;
                if (this.graph !== undefined) {
                    var event_3 = new Events.ControlLinkWaitCountChangeEvent();
                    event_3.controlLink = this;
                    event_3.index = this.getIndex();
                    event_3.waitCount = this.waitCount;
                    this.dispatchEvent(event_3);
                }
            }
            return result;
        };
        return ControlLink;
    }());
    return ControlLink;
});
