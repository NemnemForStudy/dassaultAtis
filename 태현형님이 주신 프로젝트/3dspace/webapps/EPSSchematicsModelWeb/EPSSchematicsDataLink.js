/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsDataLink'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsDataLink", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPEventServices/EPEventTarget", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort"], function (require, exports, TypeLibrary, EventTarget, Events, DataPort) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var DataLink = /** @class */ (function () {
        /**
         * @constructor
         */
        function DataLink() {
            this.valid = true;
            this.eventTarget = new EventTarget();
            this.onCastLevelChangeListener = this.onCastLevelChange.bind(this);
            this.onValidityChangeListener = this.onValidityChange.bind(this);
        }
        /**
         * Construct data link from JSON.
         * @private
         * @param {IJSONDataLink} iJSONDataLink - The JSON data link.
         */
        // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
        DataLink.prototype.fromJSON = function (iJSONDataLink) { };
        /**
         * Construct JSON from data link.
         * @private
         * @param {IJSONDataLink} oJSONDataLink - The JSON data link.
         */
        DataLink.prototype.toJSON = function (oJSONDataLink) {
            oJSONDataLink.startPort = this.startPort.toPath(this.graph);
            oJSONDataLink.endPort = this.endPort.toPath(this.graph);
        };
        /**
         * Add listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        DataLink.prototype.addListener = function (iEventCtor, iListener) {
            this.eventTarget.addListener(iEventCtor, iListener);
        };
        /**
         * Remove listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        DataLink.prototype.removeListener = function (iEventCtor, iListener) {
            this.eventTarget.removeListener(iEventCtor, iListener);
        };
        /**
         * Dispatch event.
         * @private
         * @param {EP.Event} iEvent - The event to dispatch.
         */
        DataLink.prototype.dispatchEvent = function (iEvent) {
            this.eventTarget.dispatchEvent(iEvent);
        };
        /**
         * Get data link path.
         * @private
         * @param {GraphBlock} [iGraph] - The graph block.
         * @return {string} The data link path.
         */
        DataLink.prototype.toPath = function (iGraph) {
            var path;
            if (this.graph !== undefined) {
                path = this.graph.toPath(iGraph) + '.dataLinks[' + this.getIndex() + ']';
            }
            return path;
        };
        /**
         * Is valid.
         * @private
         * @return {boolean} True if data link is valid, false otherwise.
         */
        DataLink.prototype.isValid = function () {
            return this.valid;
        };
        /**
         * Compute validity.
         * @private
         * @return {boolean} The data link validity.
         */
        DataLink.prototype.computeValidity = function () {
            var result = this.castLevel <= this.graph.getSettingByName('CastLevel').getValue();
            return result;
        };
        /**
         * On validity change.
         * @private
         */
        DataLink.prototype.onValidityChange = function () {
            var newValid = this.computeValidity();
            if (this.valid !== newValid) {
                this.valid = newValid;
                var event_1 = new Events.DataLinkValidityChangeEvent();
                event_1.dataLink = this;
                event_1.index = this.getIndex();
                this.dispatchEvent(event_1);
                this.graph.onValidityChange();
            }
        };
        /**
         * Is from template.
         * @private
         * @return {boolean} True if data link is from template, false otherwise.
         */
        DataLink.prototype.isFromTemplate = function () {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            var result = this.graph instanceof GraphBlockCtr;
            if (result && !this.graph.isTemplate()) {
                result = this.graph.isFromTemplate();
            }
            return result;
        };
        /**
         * Get graph context.
         * @private
         * @return {GraphBlock} The graph context.
         */
        DataLink.prototype.getGraphContext = function () {
            var graphContext;
            if (this.graph !== undefined) {
                graphContext = this.graph.getGraphContext();
            }
            return graphContext;
        };
        /**
         * Get start port.
         * @private
         * @return {DataPort} The start port.
         */
        DataLink.prototype.getStartPort = function () {
            return this.startPort;
        };
        /**
         * Get end port.
         * @private
         * @return {DataPort} The end port.
         */
        DataLink.prototype.getEndPort = function () {
            return this.endPort;
        };
        /**
         * Get cast level.
         * @private
         * @return {EP.ECastLevel} The cast level.
         */
        DataLink.prototype.getCastLevel = function () {
            return this.castLevel;
        };
        /**
         * Get index.
         * @private
         * @return {number} The data link index.
         */
        DataLink.prototype.getIndex = function () {
            var index;
            if (this.graph !== undefined) {
                index = this.graph.getDataLinks().indexOf(this);
            }
            return index;
        };
        DataLink.isDataLinkAvailable = function (iStartPort, iEndPort, iGraph, iLinksToReroute) {
            var result = false;
            var endPortDataLinks = iEndPort.getDataLinks(iGraph).filter(function (dataLink) { return iLinksToReroute.indexOf(dataLink) === -1; });
            if (iEndPort.block === iGraph) {
                result = endPortDataLinks.every(function (dataLink) { return dataLink.startPort !== iStartPort; });
            }
            else {
                result = endPortDataLinks.length === 0;
                var startPortLinkToReroute_1;
                result = result && iLinksToReroute.every(function (dataLink) {
                    startPortLinkToReroute_1 = startPortLinkToReroute_1 || dataLink.startPort;
                    return startPortLinkToReroute_1 === dataLink.startPort;
                });
            }
            return result;
        };
        DataLink.isCastable = function (iPort1, iPort2, iStartPort, iEndPort, iGraph, iWithChange) {
            var result = false;
            var castLevel = TypeLibrary.getCastLevel(iGraph.getGraphContext(), iStartPort.getValueType(), iEndPort.getValueType());
            result = castLevel <= iGraph.getSettingByName('CastLevel').getValue();
            if (!result && iWithChange) {
                result = !iPort2.isReferenced() && iPort2.isValueTypeSettable(iPort1.getValueType());
            }
            return result;
        };
        /**
         * Are linkable ports.
         * @private
         * @param {DataPort} iPort1 - The first port.
         * @param {DataPort} iPort2 - The second port.
         * @param {GraphBlock} iGraph - The graph block.
         * @param {DataLink[]} [iLinksToReroute] - The list of link to reroute.
         * @param {boolean} [iWithChange] - True to consider data port value type change, false otherwise.
         * @return {boolean} True if ports are linkable, false otherwise.
         */
        DataLink.prototype.isLinkable = function (iPort1, iPort2, iGraph, iLinksToReroute, iWithChange) {
            var result = false;
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (iGraph instanceof GraphBlockCtr && !iGraph.isTemplate() && !iGraph.isFromTemplate() &&
                this.graph === undefined && this.startPort === undefined && this.endPort === undefined &&
                iPort1 instanceof DataPort && iPort2 instanceof DataPort && (iPort1.block !== iGraph || iPort2.block !== iGraph)) {
                iLinksToReroute = iLinksToReroute || [];
                iWithChange = iWithChange && iLinksToReroute.length <= 1 && iPort2.getDataLinks(iGraph).filter(function (dataLink) { return iLinksToReroute.indexOf(dataLink) === -1; }).length === 0;
                if (iPort1.isStartPort(iGraph) && iPort2.isEndPort(iGraph) && DataLink.isDataLinkAvailable(iPort1, iPort2, iGraph, iLinksToReroute)) {
                    result = !this.valid;
                    result = result || DataLink.isCastable(iPort1, iPort2, iPort1, iPort2, iGraph, iWithChange);
                }
                else if (iPort2.isStartPort(iGraph) && iPort1.isEndPort(iGraph) && DataLink.isDataLinkAvailable(iPort2, iPort1, iGraph, iLinksToReroute)) {
                    result = !this.valid;
                    result = result || DataLink.isCastable(iPort1, iPort2, iPort2, iPort1, iGraph, iWithChange);
                }
            }
            return result;
        };
        /**
         * On add.
         * @private
         * @param {GraphBlock} iGraphBlock - The graph block.
         */
        DataLink.prototype.onAdd = function (iGraphBlock) {
            this.graph = iGraphBlock;
            this.startPort.addListener(Events.DataPortValueTypeChangeEvent, this.onCastLevelChangeListener);
            this.endPort.addListener(Events.DataPortValueTypeChangeEvent, this.onCastLevelChangeListener);
            var castLevelSetting = iGraphBlock.getSettingByName('CastLevel');
            castLevelSetting.addListener(Events.SettingValueChangeEvent, this.onValidityChangeListener);
            this.onGraphContextIn();
        };
        /**
         * On remove.
         * @private
         * @param {GraphBlock} iGraphBlock - The graph block.
         */
        DataLink.prototype.onRemove = function (iGraphBlock) {
            this.onGraphContextOut();
            this.startPort.removeListener(Events.DataPortValueTypeChangeEvent, this.onCastLevelChangeListener);
            this.endPort.removeListener(Events.DataPortValueTypeChangeEvent, this.onCastLevelChangeListener);
            var castLevelSetting = iGraphBlock.getSettingByName('CastLevel');
            castLevelSetting.removeListener(Events.SettingValueChangeEvent, this.onValidityChangeListener);
            this.graph = undefined;
            this.startPort.dataLinks.splice(this.startPort.dataLinks.indexOf(this), 1);
            this.startPort = undefined;
            this.endPort.dataLinks.splice(this.endPort.dataLinks.indexOf(this), 1);
            this.endPort = undefined;
            this.castLevel = undefined;
        };
        /**
         * On graph context in.
         * @private
         */
        DataLink.prototype.onGraphContextIn = function () {
            TypeLibrary.addListener(Events.TypeLibraryRegisterLocalCustomEvent, this.onCastLevelChangeListener);
            TypeLibrary.addListener(Events.TypeLibraryUpdateLocalCustomEvent, this.onCastLevelChangeListener);
            TypeLibrary.addListener(Events.TypeLibraryUnregisterLocalCustomEvent, this.onCastLevelChangeListener);
        };
        /**
         * On graph context out.
         * @private
         */
        DataLink.prototype.onGraphContextOut = function () {
            TypeLibrary.removeListener(Events.TypeLibraryRegisterLocalCustomEvent, this.onCastLevelChangeListener);
            TypeLibrary.removeListener(Events.TypeLibraryUpdateLocalCustomEvent, this.onCastLevelChangeListener);
            TypeLibrary.removeListener(Events.TypeLibraryUnregisterLocalCustomEvent, this.onCastLevelChangeListener);
        };
        /**
         * Link ports.
         * @private
         * @param {DataPort} iPort1 - The first port.
         * @param {DataPort} iPort2 - The second port.
         * @param {GraphBlock} iGraph - The graph block.
         * @param {boolean} [iWithChange] - True to consider data port value type change, false otherwise.
         * @return {boolean} True if link has been created, otherwise false.
         */
        DataLink.prototype.link = function (iPort1, iPort2, iGraph, iWithChange) {
            var result = this.isLinkable(iPort1, iPort2, iGraph, [], iWithChange);
            if (result) {
                if (iWithChange && !this.isLinkable(iPort1, iPort2, iGraph, [], false)) {
                    iPort2.setValueType(iPort1.getValueType());
                }
                this.startPort = iPort1.isStartPort(iGraph) && iPort2.isEndPort(iGraph) ? iPort1 : iPort2;
                this.endPort = this.startPort === iPort2 ? iPort1 : iPort2;
                this.castLevel = TypeLibrary.getCastLevel(iGraph.getGraphContext(), this.startPort.getValueType(), this.endPort.getValueType());
                this.startPort.dataLinks.push(this);
                this.endPort.dataLinks.push(this);
                result = iGraph.addDataLink(this);
            }
            return result;
        };
        /**
         * Unlink ports.
         * @private
         * @return {boolean} True if the data link has been unlinked, false otherwise.
         */
        DataLink.prototype.unlink = function () {
            var result = !this.isFromTemplate();
            result = result && this.startPort !== undefined;
            result = result && this.endPort !== undefined;
            result = result && this.graph !== undefined;
            result = result && this.graph.removeDataLink(this);
            return result;
        };
        /**
         * On cast level change.
         * @private
         */
        DataLink.prototype.onCastLevelChange = function () {
            var castLevel = TypeLibrary.getCastLevel(this.getGraphContext(), this.startPort.getValueType(), this.endPort.getValueType());
            if (castLevel !== this.castLevel) {
                this.castLevel = castLevel;
                var event_2 = new Events.DataLinkCastLevelChangeEvent();
                event_2.dataLink = this;
                event_2.index = this.getIndex();
                this.dispatchEvent(event_2);
                this.onValidityChange();
            }
        };
        return DataLink;
    }());
    return DataLink;
});
