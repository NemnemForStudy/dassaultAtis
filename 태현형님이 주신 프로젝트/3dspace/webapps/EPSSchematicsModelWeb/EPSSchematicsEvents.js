/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsEvents'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsEvents", ["require", "exports", "DS/EPEventServices/EPEvent", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicsModelWeb/EPSSchematicsTools"], function (require, exports, Event, EventServices, Tools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var Events;
    (function (Events) {
        /**
         * class NodeIdSelectorEvent
         * @extends Event
         * @private
         */
        var NodeIdSelectorEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorEvent, _super);
            function NodeIdSelectorEvent() {
                return _super.call(this) || this;
            }
            NodeIdSelectorEvent.prototype.getNodeIdSelector = function () {
                return this.nodeIdSelector;
            };
            NodeIdSelectorEvent.prototype.getIndex = function () {
                return this.index;
            };
            return NodeIdSelectorEvent;
        }(Event));
        Events.NodeIdSelectorEvent = NodeIdSelectorEvent;
        NodeIdSelectorEvent.prototype.type = 'NodeIdSelectorEvent';
        EventServices.registerEvent(NodeIdSelectorEvent);
        /**
         * @class NodeIdSelectorAddEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorAddEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorAddEvent, _super);
            function NodeIdSelectorAddEvent() {
                return _super.call(this) || this;
            }
            return NodeIdSelectorAddEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorAddEvent = NodeIdSelectorAddEvent;
        NodeIdSelectorAddEvent.prototype.type = 'NodeIdSelectorAddEvent';
        EventServices.registerEvent(NodeIdSelectorAddEvent);
        /**
         * @class NodeIdSelectorRemoveEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorRemoveEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorRemoveEvent, _super);
            function NodeIdSelectorRemoveEvent() {
                return _super.call(this) || this;
            }
            return NodeIdSelectorRemoveEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorRemoveEvent = NodeIdSelectorRemoveEvent;
        NodeIdSelectorRemoveEvent.prototype.type = 'NodeIdSelectorRemoveEvent';
        EventServices.registerEvent(NodeIdSelectorRemoveEvent);
        /**
         * @class NodeIdSelectorNameChangeEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorNameChangeEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorNameChangeEvent, _super);
            function NodeIdSelectorNameChangeEvent() {
                return _super.call(this) || this;
            }
            NodeIdSelectorNameChangeEvent.prototype.getName = function () {
                return this.name;
            };
            return NodeIdSelectorNameChangeEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorNameChangeEvent = NodeIdSelectorNameChangeEvent;
        NodeIdSelectorNameChangeEvent.prototype.type = 'NodeIdSelectorNameChangeEvent';
        EventServices.registerEvent(NodeIdSelectorNameChangeEvent);
        /**
         * @class NodeIdSelectorPoolChangeEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorPoolChangeEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorPoolChangeEvent, _super);
            function NodeIdSelectorPoolChangeEvent() {
                return _super.call(this) || this;
            }
            NodeIdSelectorPoolChangeEvent.prototype.getPool = function () {
                return this.pool;
            };
            return NodeIdSelectorPoolChangeEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorPoolChangeEvent = NodeIdSelectorPoolChangeEvent;
        NodeIdSelectorPoolChangeEvent.prototype.type = 'NodeIdSelectorPoolChangeEvent';
        EventServices.registerEvent(NodeIdSelectorPoolChangeEvent);
        /**
         * @class NodeIdSelectorCriterionChangeEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorCriterionChangeEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorCriterionChangeEvent, _super);
            function NodeIdSelectorCriterionChangeEvent() {
                return _super.call(this) || this;
            }
            NodeIdSelectorCriterionChangeEvent.prototype.getCriterion = function () {
                return this.criterion;
            };
            return NodeIdSelectorCriterionChangeEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorCriterionChangeEvent = NodeIdSelectorCriterionChangeEvent;
        NodeIdSelectorCriterionChangeEvent.prototype.type = 'NodeIdSelectorCriterionChangeEvent';
        EventServices.registerEvent(NodeIdSelectorCriterionChangeEvent);
        /**
         * @class NodeIdSelectorIdentifierChangeEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorIdentifierChangeEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorIdentifierChangeEvent, _super);
            function NodeIdSelectorIdentifierChangeEvent() {
                return _super.call(this) || this;
            }
            NodeIdSelectorIdentifierChangeEvent.prototype.getIdentifier = function () {
                return this.identifier;
            };
            return NodeIdSelectorIdentifierChangeEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorIdentifierChangeEvent = NodeIdSelectorIdentifierChangeEvent;
        NodeIdSelectorIdentifierChangeEvent.prototype.type = 'NodeIdSelectorIdentifierChangeEvent';
        EventServices.registerEvent(NodeIdSelectorIdentifierChangeEvent);
        /**
         * @class NodeIdSelectorQueuingChangeEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorQueuingChangeEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorQueuingChangeEvent, _super);
            function NodeIdSelectorQueuingChangeEvent() {
                return _super.call(this) || this;
            }
            NodeIdSelectorQueuingChangeEvent.prototype.getQueuing = function () {
                return this.queuing;
            };
            return NodeIdSelectorQueuingChangeEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorQueuingChangeEvent = NodeIdSelectorQueuingChangeEvent;
        NodeIdSelectorQueuingChangeEvent.prototype.type = 'NodeIdSelectorQueuingChangeEvent';
        EventServices.registerEvent(NodeIdSelectorQueuingChangeEvent);
        /**
         * @class NodeIdSelectorTimeoutChangeEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorTimeoutChangeEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorTimeoutChangeEvent, _super);
            function NodeIdSelectorTimeoutChangeEvent() {
                return _super.call(this) || this;
            }
            NodeIdSelectorTimeoutChangeEvent.prototype.getTimeout = function () {
                return this.timeout;
            };
            return NodeIdSelectorTimeoutChangeEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorTimeoutChangeEvent = NodeIdSelectorTimeoutChangeEvent;
        NodeIdSelectorTimeoutChangeEvent.prototype.type = 'NodeIdSelectorTimeoutChangeEvent';
        EventServices.registerEvent(NodeIdSelectorTimeoutChangeEvent);
        /**
         * @class NodeIdSelectorMaxInstanceCountChangeEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorMaxInstanceCountChangeEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorMaxInstanceCountChangeEvent, _super);
            function NodeIdSelectorMaxInstanceCountChangeEvent() {
                return _super.call(this) || this;
            }
            NodeIdSelectorMaxInstanceCountChangeEvent.prototype.getMaxInstanceCount = function () {
                return this.maxInstanceCount;
            };
            return NodeIdSelectorMaxInstanceCountChangeEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorMaxInstanceCountChangeEvent = NodeIdSelectorMaxInstanceCountChangeEvent;
        NodeIdSelectorMaxInstanceCountChangeEvent.prototype.type = 'NodeIdSelectorMaxInstanceCountChangeEvent';
        EventServices.registerEvent(NodeIdSelectorMaxInstanceCountChangeEvent);
        /**
         * @class NodeIdSelectorCmdLineChangeEvent
         * @extends NodeIdSelectorEvent
         * @private
         */
        var NodeIdSelectorCmdLineChangeEvent = /** @class */ (function (_super) {
            __extends(NodeIdSelectorCmdLineChangeEvent, _super);
            function NodeIdSelectorCmdLineChangeEvent() {
                return _super.call(this) || this;
            }
            NodeIdSelectorCmdLineChangeEvent.prototype.getCmdLine = function () {
                return this.cmdLine;
            };
            return NodeIdSelectorCmdLineChangeEvent;
        }(NodeIdSelectorEvent));
        Events.NodeIdSelectorCmdLineChangeEvent = NodeIdSelectorCmdLineChangeEvent;
        NodeIdSelectorCmdLineChangeEvent.prototype.type = 'NodeIdSelectorCmdLineChangeEvent';
        EventServices.registerEvent(NodeIdSelectorCmdLineChangeEvent);
        /**
         * @class BlockEvent
         * @extends Event
         * @private
         */
        var BlockEvent = /** @class */ (function (_super) {
            __extends(BlockEvent, _super);
            function BlockEvent() {
                return _super.call(this) || this;
            }
            BlockEvent.prototype.getBlock = function () {
                return this.block;
            };
            BlockEvent.prototype.getIndex = function () {
                return this.index;
            };
            return BlockEvent;
        }(Event));
        Events.BlockEvent = BlockEvent;
        BlockEvent.prototype.type = 'BlockEvent';
        EventServices.registerEvent(BlockEvent);
        /**
         * @class BlockAddEvent
         * @extends BlockEvent
         * @private
         */
        var BlockAddEvent = /** @class */ (function (_super) {
            __extends(BlockAddEvent, _super);
            function BlockAddEvent() {
                return _super.call(this) || this;
            }
            return BlockAddEvent;
        }(BlockEvent));
        Events.BlockAddEvent = BlockAddEvent;
        BlockAddEvent.prototype.type = 'BlockAddEvent';
        EventServices.registerEvent(BlockAddEvent);
        /**
         * @class BlockRemoveEvent
         * @extends BlockEvent
         * @private
         */
        var BlockRemoveEvent = /** @class */ (function (_super) {
            __extends(BlockRemoveEvent, _super);
            function BlockRemoveEvent() {
                return _super.call(this) || this;
            }
            return BlockRemoveEvent;
        }(BlockEvent));
        Events.BlockRemoveEvent = BlockRemoveEvent;
        BlockRemoveEvent.prototype.type = 'BlockRemoveEvent';
        EventServices.registerEvent(BlockRemoveEvent);
        /**
         * @class BlockNameChangeEvent
         * @extends BlockEvent
         * @private
         */
        var BlockNameChangeEvent = /** @class */ (function (_super) {
            __extends(BlockNameChangeEvent, _super);
            function BlockNameChangeEvent() {
                return _super.call(this) || this;
            }
            BlockNameChangeEvent.prototype.getName = function () {
                return this.name;
            };
            return BlockNameChangeEvent;
        }(BlockEvent));
        Events.BlockNameChangeEvent = BlockNameChangeEvent;
        BlockNameChangeEvent.prototype.type = 'BlockNameChangeEvent';
        EventServices.registerEvent(BlockNameChangeEvent);
        /**
         * @class BlockDescriptionChangeEvent
         * @extends BlockEvent
         * @private
         */
        var BlockDescriptionChangeEvent = /** @class */ (function (_super) {
            __extends(BlockDescriptionChangeEvent, _super);
            function BlockDescriptionChangeEvent() {
                return _super.call(this) || this;
            }
            BlockDescriptionChangeEvent.prototype.getDescription = function () {
                return this.description;
            };
            return BlockDescriptionChangeEvent;
        }(BlockEvent));
        Events.BlockDescriptionChangeEvent = BlockDescriptionChangeEvent;
        BlockDescriptionChangeEvent.prototype.type = 'BlockDescriptionChangeEvent';
        EventServices.registerEvent(BlockDescriptionChangeEvent);
        /**
         * @class BlockScriptContentChangeEvent
         * @extends BlockEvent
         * @private
         */
        var BlockScriptContentChangeEvent = /** @class */ (function (_super) {
            __extends(BlockScriptContentChangeEvent, _super);
            function BlockScriptContentChangeEvent() {
                return _super.call(this) || this;
            }
            BlockScriptContentChangeEvent.prototype.getScriptContent = function () {
                return this.scriptContent;
            };
            return BlockScriptContentChangeEvent;
        }(BlockEvent));
        Events.BlockScriptContentChangeEvent = BlockScriptContentChangeEvent;
        BlockScriptContentChangeEvent.prototype.type = 'BlockScriptContentChangeEvent';
        EventServices.registerEvent(BlockScriptContentChangeEvent);
        /**
         * @class BlockValidityChangeEvent
         * @extends BlockEvent
         * @private
         */
        var BlockValidityChangeEvent = /** @class */ (function (_super) {
            __extends(BlockValidityChangeEvent, _super);
            function BlockValidityChangeEvent() {
                return _super.call(this) || this;
            }
            return BlockValidityChangeEvent;
        }(BlockEvent));
        Events.BlockValidityChangeEvent = BlockValidityChangeEvent;
        BlockValidityChangeEvent.prototype.type = 'BlockValidityChangeEvent';
        EventServices.registerEvent(BlockValidityChangeEvent);
        /**
         * @class BlockTemplateChangeEvent
         * @extends BlockEvent
         * @private
         */
        var BlockTemplateChangeEvent = /** @class */ (function (_super) {
            __extends(BlockTemplateChangeEvent, _super);
            function BlockTemplateChangeEvent() {
                return _super.call(this) || this;
            }
            return BlockTemplateChangeEvent;
        }(BlockEvent));
        Events.BlockTemplateChangeEvent = BlockTemplateChangeEvent;
        BlockTemplateChangeEvent.prototype.type = 'BlockTemplateChangeEvent';
        EventServices.registerEvent(BlockTemplateChangeEvent);
        /**
         * @class BlockNodeIdSelectorChangeEvent
         * @extends BlockEvent
         * @private
         */
        var BlockNodeIdSelectorChangeEvent = /** @class */ (function (_super) {
            __extends(BlockNodeIdSelectorChangeEvent, _super);
            function BlockNodeIdSelectorChangeEvent() {
                return _super.call(this) || this;
            }
            BlockNodeIdSelectorChangeEvent.prototype.getNodeIdSelector = function () {
                return this.nodeIdSelector;
            };
            return BlockNodeIdSelectorChangeEvent;
        }(BlockEvent));
        Events.BlockNodeIdSelectorChangeEvent = BlockNodeIdSelectorChangeEvent;
        BlockNodeIdSelectorChangeEvent.prototype.type = 'BlockNodeIdSelectorChangeEvent';
        EventServices.registerEvent(BlockNodeIdSelectorChangeEvent);
        /**
         * @class BlockStartupPortChangeEvent
         * @extends BlockEvent
         * @private
         */
        var BlockStartupPortChangeEvent = /** @class */ (function (_super) {
            __extends(BlockStartupPortChangeEvent, _super);
            function BlockStartupPortChangeEvent() {
                return _super.call(this) || this;
            }
            BlockStartupPortChangeEvent.prototype.getStartupPort = function () {
                return this.startupPort;
            };
            return BlockStartupPortChangeEvent;
        }(BlockEvent));
        Events.BlockStartupPortChangeEvent = BlockStartupPortChangeEvent;
        BlockStartupPortChangeEvent.prototype.type = 'BlockStartupPortChangeEvent';
        EventServices.registerEvent(BlockStartupPortChangeEvent);
        /**
         * @class ControlLinkEvent
         * @extends Event
         * @private
         */
        var ControlLinkEvent = /** @class */ (function (_super) {
            __extends(ControlLinkEvent, _super);
            function ControlLinkEvent() {
                return _super.call(this) || this;
            }
            ControlLinkEvent.prototype.getControlLink = function () {
                return this.controlLink;
            };
            ControlLinkEvent.prototype.getIndex = function () {
                return this.index;
            };
            return ControlLinkEvent;
        }(Event));
        Events.ControlLinkEvent = ControlLinkEvent;
        ControlLinkEvent.prototype.type = 'ControlLinkEvent';
        EventServices.registerEvent(ControlLinkEvent);
        /**
         * @class ControlLinkAddEvent
         * @extends ControlLinkEvent
         * @private
         */
        var ControlLinkAddEvent = /** @class */ (function (_super) {
            __extends(ControlLinkAddEvent, _super);
            function ControlLinkAddEvent() {
                return _super.call(this) || this;
            }
            return ControlLinkAddEvent;
        }(ControlLinkEvent));
        Events.ControlLinkAddEvent = ControlLinkAddEvent;
        ControlLinkAddEvent.prototype.type = 'ControlLinkAddEvent';
        EventServices.registerEvent(ControlLinkAddEvent);
        /**
         * @class ControlLinkRemoveEvent
         * @extends ControlLinkEvent
         * @private
         */
        var ControlLinkRemoveEvent = /** @class */ (function (_super) {
            __extends(ControlLinkRemoveEvent, _super);
            function ControlLinkRemoveEvent() {
                return _super.call(this) || this;
            }
            return ControlLinkRemoveEvent;
        }(ControlLinkEvent));
        Events.ControlLinkRemoveEvent = ControlLinkRemoveEvent;
        ControlLinkRemoveEvent.prototype.type = 'ControlLinkRemoveEvent';
        EventServices.registerEvent(ControlLinkRemoveEvent);
        /**
         * @class ControlLinkWaitCountChangeEvent
         * @extends ControlLinkEvent
         * @private
         */
        var ControlLinkWaitCountChangeEvent = /** @class */ (function (_super) {
            __extends(ControlLinkWaitCountChangeEvent, _super);
            function ControlLinkWaitCountChangeEvent() {
                return _super.call(this) || this;
            }
            ControlLinkWaitCountChangeEvent.prototype.getWaitCount = function () {
                return this.waitCount;
            };
            return ControlLinkWaitCountChangeEvent;
        }(ControlLinkEvent));
        Events.ControlLinkWaitCountChangeEvent = ControlLinkWaitCountChangeEvent;
        ControlLinkWaitCountChangeEvent.prototype.type = 'ControlLinkWaitCountChangeEvent';
        EventServices.registerEvent(ControlLinkWaitCountChangeEvent);
        /**
         * @class ControlLinkCastLevelChangeEvent
         * @extends ControlLinkEvent
         * @private
         */
        var ControlLinkCastLevelChangeEvent = /** @class */ (function (_super) {
            __extends(ControlLinkCastLevelChangeEvent, _super);
            function ControlLinkCastLevelChangeEvent() {
                return _super.call(this) || this;
            }
            return ControlLinkCastLevelChangeEvent;
        }(ControlLinkEvent));
        Events.ControlLinkCastLevelChangeEvent = ControlLinkCastLevelChangeEvent;
        ControlLinkCastLevelChangeEvent.prototype.type = 'ControlLinkCastLevelChangeEvent';
        EventServices.registerEvent(ControlLinkCastLevelChangeEvent);
        /**
         * @class ControlLinkValidityChangeEvent
         * @extends ControlLinkEvent
         * @private
         */
        var ControlLinkValidityChangeEvent = /** @class */ (function (_super) {
            __extends(ControlLinkValidityChangeEvent, _super);
            function ControlLinkValidityChangeEvent() {
                return _super.call(this) || this;
            }
            return ControlLinkValidityChangeEvent;
        }(ControlLinkEvent));
        Events.ControlLinkValidityChangeEvent = ControlLinkValidityChangeEvent;
        ControlLinkValidityChangeEvent.prototype.type = 'ControlLinkValidityChangeEvent';
        EventServices.registerEvent(ControlLinkValidityChangeEvent);
        /**
         * @class DataLinkEvent
         * @extends Event
         * @private
         */
        var DataLinkEvent = /** @class */ (function (_super) {
            __extends(DataLinkEvent, _super);
            function DataLinkEvent() {
                return _super.call(this) || this;
            }
            DataLinkEvent.prototype.getDataLink = function () {
                return this.dataLink;
            };
            DataLinkEvent.prototype.getIndex = function () {
                return this.index;
            };
            return DataLinkEvent;
        }(Event));
        Events.DataLinkEvent = DataLinkEvent;
        DataLinkEvent.prototype.type = 'DataLinkEvent';
        EventServices.registerEvent(DataLinkEvent);
        /**
         * @class DataLinkAddEvent
         * @extends DataLinkEvent
         * @private
         */
        var DataLinkAddEvent = /** @class */ (function (_super) {
            __extends(DataLinkAddEvent, _super);
            function DataLinkAddEvent() {
                return _super.call(this) || this;
            }
            return DataLinkAddEvent;
        }(DataLinkEvent));
        Events.DataLinkAddEvent = DataLinkAddEvent;
        DataLinkAddEvent.prototype.type = 'DataLinkAddEvent';
        EventServices.registerEvent(DataLinkAddEvent);
        /**
         * @class DataLinkRemoveEvent
         * @extends DataLinkEvent
         * @private
         */
        var DataLinkRemoveEvent = /** @class */ (function (_super) {
            __extends(DataLinkRemoveEvent, _super);
            function DataLinkRemoveEvent() {
                return _super.call(this) || this;
            }
            return DataLinkRemoveEvent;
        }(DataLinkEvent));
        Events.DataLinkRemoveEvent = DataLinkRemoveEvent;
        DataLinkRemoveEvent.prototype.type = 'DataLinkRemoveEvent';
        EventServices.registerEvent(DataLinkRemoveEvent);
        /**
         * @class DataLinkCastLevelChangeEvent
         * @extends DataLinkEvent
         * @private
         */
        var DataLinkCastLevelChangeEvent = /** @class */ (function (_super) {
            __extends(DataLinkCastLevelChangeEvent, _super);
            function DataLinkCastLevelChangeEvent() {
                return _super.call(this) || this;
            }
            return DataLinkCastLevelChangeEvent;
        }(DataLinkEvent));
        Events.DataLinkCastLevelChangeEvent = DataLinkCastLevelChangeEvent;
        DataLinkCastLevelChangeEvent.prototype.type = 'DataLinkCastLevelChangeEvent';
        EventServices.registerEvent(DataLinkCastLevelChangeEvent);
        /**
         * @class DataLinkValidityChangeEvent
         * @extends DataLinkEvent
         * @private
         */
        var DataLinkValidityChangeEvent = /** @class */ (function (_super) {
            __extends(DataLinkValidityChangeEvent, _super);
            function DataLinkValidityChangeEvent() {
                return _super.call(this) || this;
            }
            return DataLinkValidityChangeEvent;
        }(DataLinkEvent));
        Events.DataLinkValidityChangeEvent = DataLinkValidityChangeEvent;
        DataLinkValidityChangeEvent.prototype.type = 'DataLinkValidityChangeEvent';
        EventServices.registerEvent(DataLinkValidityChangeEvent);
        /**
         * @class ControlPortEvent
         * @extends Event
         * @private
         */
        var ControlPortEvent = /** @class */ (function (_super) {
            __extends(ControlPortEvent, _super);
            function ControlPortEvent() {
                return _super.call(this) || this;
            }
            ControlPortEvent.prototype.getControlPort = function () {
                return this.controlPort;
            };
            ControlPortEvent.prototype.getIndex = function () {
                return this.index;
            };
            ControlPortEvent.prototype.getIndexByType = function () {
                return this.indexByType;
            };
            return ControlPortEvent;
        }(Event));
        Events.ControlPortEvent = ControlPortEvent;
        ControlPortEvent.prototype.type = 'ControlPortEvent';
        EventServices.registerEvent(ControlPortEvent);
        /**
         * @class ControlPortAddEvent
         * @extends ControlPortEvent
         * @private
         */
        var ControlPortAddEvent = /** @class */ (function (_super) {
            __extends(ControlPortAddEvent, _super);
            function ControlPortAddEvent() {
                return _super.call(this) || this;
            }
            return ControlPortAddEvent;
        }(ControlPortEvent));
        Events.ControlPortAddEvent = ControlPortAddEvent;
        ControlPortAddEvent.prototype.type = 'ControlPortAddEvent';
        EventServices.registerEvent(ControlPortAddEvent);
        /**
         * @class ControlPortRemoveEvent
         * @extends ControlPortEvent
         * @private
         */
        var ControlPortRemoveEvent = /** @class */ (function (_super) {
            __extends(ControlPortRemoveEvent, _super);
            function ControlPortRemoveEvent() {
                return _super.call(this) || this;
            }
            return ControlPortRemoveEvent;
        }(ControlPortEvent));
        Events.ControlPortRemoveEvent = ControlPortRemoveEvent;
        ControlPortRemoveEvent.prototype.type = 'ControlPortRemoveEvent';
        EventServices.registerEvent(ControlPortRemoveEvent);
        /**
         * @class ControlPortNameChangeEvent
         * @extends ControlPortEvent
         * @private
         */
        var ControlPortNameChangeEvent = /** @class */ (function (_super) {
            __extends(ControlPortNameChangeEvent, _super);
            function ControlPortNameChangeEvent() {
                return _super.call(this) || this;
            }
            ControlPortNameChangeEvent.prototype.getName = function () {
                return this.name;
            };
            return ControlPortNameChangeEvent;
        }(ControlPortEvent));
        Events.ControlPortNameChangeEvent = ControlPortNameChangeEvent;
        ControlPortNameChangeEvent.prototype.type = 'ControlPortNameChangeEvent';
        EventServices.registerEvent(ControlPortNameChangeEvent);
        /**
         * @class ControlPortEventTypeChangeEvent
         * @extends ControlPortEvent
         * @private
         */
        var ControlPortEventTypeChangeEvent = /** @class */ (function (_super) {
            __extends(ControlPortEventTypeChangeEvent, _super);
            function ControlPortEventTypeChangeEvent() {
                return _super.call(this) || this;
            }
            ControlPortEventTypeChangeEvent.prototype.getEventType = function () {
                return this.eventType;
            };
            return ControlPortEventTypeChangeEvent;
        }(ControlPortEvent));
        Events.ControlPortEventTypeChangeEvent = ControlPortEventTypeChangeEvent;
        ControlPortEventTypeChangeEvent.prototype.type = 'ControlPortEventTypeChangeEvent';
        EventServices.registerEvent(ControlPortEventTypeChangeEvent);
        /**
         * @class ControlPortValidityChangeEvent
         * @extends ControlPortEvent
         * @private
         */
        var ControlPortValidityChangeEvent = /** @class */ (function (_super) {
            __extends(ControlPortValidityChangeEvent, _super);
            function ControlPortValidityChangeEvent() {
                return _super.call(this) || this;
            }
            return ControlPortValidityChangeEvent;
        }(ControlPortEvent));
        Events.ControlPortValidityChangeEvent = ControlPortValidityChangeEvent;
        ControlPortValidityChangeEvent.prototype.type = 'ControlPortValidityChangeEvent';
        EventServices.registerEvent(ControlPortValidityChangeEvent);
        /**
         * @class DataPortEvent
         * @extends Event
         * @private
         */
        var DataPortEvent = /** @class */ (function (_super) {
            __extends(DataPortEvent, _super);
            function DataPortEvent() {
                return _super.call(this) || this;
            }
            DataPortEvent.prototype.getDataPort = function () {
                return this.dataPort;
            };
            DataPortEvent.prototype.getIndex = function () {
                return this.index;
            };
            DataPortEvent.prototype.getIndexByType = function () {
                return this.indexByType;
            };
            return DataPortEvent;
        }(Event));
        Events.DataPortEvent = DataPortEvent;
        DataPortEvent.prototype.type = 'DataPortEvent';
        EventServices.registerEvent(DataPortEvent);
        /**
         * @class DataPortAddEvent
         * @extends DataPortEvent
         * @private
         */
        var DataPortAddEvent = /** @class */ (function (_super) {
            __extends(DataPortAddEvent, _super);
            function DataPortAddEvent() {
                return _super.call(this) || this;
            }
            return DataPortAddEvent;
        }(DataPortEvent));
        Events.DataPortAddEvent = DataPortAddEvent;
        DataPortAddEvent.prototype.type = 'DataPortAddEvent';
        EventServices.registerEvent(DataPortAddEvent);
        /**
         * @class DataPortRemoveEvent
         * @extends DataPortEvent
         * @private
         */
        var DataPortRemoveEvent = /** @class */ (function (_super) {
            __extends(DataPortRemoveEvent, _super);
            function DataPortRemoveEvent() {
                return _super.call(this) || this;
            }
            return DataPortRemoveEvent;
        }(DataPortEvent));
        Events.DataPortRemoveEvent = DataPortRemoveEvent;
        DataPortRemoveEvent.prototype.type = 'DataPortRemoveEvent';
        EventServices.registerEvent(DataPortRemoveEvent);
        /**
         * @class DataPortNameChangeEvent
         * @extends DataPortEvent
         * @private
         */
        var DataPortNameChangeEvent = /** @class */ (function (_super) {
            __extends(DataPortNameChangeEvent, _super);
            function DataPortNameChangeEvent() {
                return _super.call(this) || this;
            }
            DataPortNameChangeEvent.prototype.getName = function () {
                return this.name;
            };
            return DataPortNameChangeEvent;
        }(DataPortEvent));
        Events.DataPortNameChangeEvent = DataPortNameChangeEvent;
        DataPortNameChangeEvent.prototype.type = 'DataPortNameChangeEvent';
        EventServices.registerEvent(DataPortNameChangeEvent);
        /**
         * @class DataPortDefaultValueChangeEvent
         * @extends DataPortEvent
         * @private
         */
        var DataPortDefaultValueChangeEvent = /** @class */ (function (_super) {
            __extends(DataPortDefaultValueChangeEvent, _super);
            function DataPortDefaultValueChangeEvent() {
                return _super.call(this) || this;
            }
            DataPortDefaultValueChangeEvent.prototype.getDefaultValue = function () {
                return Tools.copyValue(this.defaultValue);
            };
            return DataPortDefaultValueChangeEvent;
        }(DataPortEvent));
        Events.DataPortDefaultValueChangeEvent = DataPortDefaultValueChangeEvent;
        DataPortDefaultValueChangeEvent.prototype.type = 'DataPortDefaultValueChangeEvent';
        EventServices.registerEvent(DataPortDefaultValueChangeEvent);
        /**
         * @class DataPortValueTypeChangeEvent
         * @extends DataPortDefaultValueChangeEvent
         * @private
         */
        var DataPortValueTypeChangeEvent = /** @class */ (function (_super) {
            __extends(DataPortValueTypeChangeEvent, _super);
            function DataPortValueTypeChangeEvent() {
                return _super.call(this) || this;
            }
            DataPortValueTypeChangeEvent.prototype.getValueType = function () {
                return this.valueType;
            };
            return DataPortValueTypeChangeEvent;
        }(DataPortDefaultValueChangeEvent));
        Events.DataPortValueTypeChangeEvent = DataPortValueTypeChangeEvent;
        DataPortValueTypeChangeEvent.prototype.type = 'DataPortValueTypeChangeEvent';
        EventServices.registerEvent(DataPortValueTypeChangeEvent);
        /**
         * @class DataPortOverrideChangeEvent
         * @extends DataPortEvent
         * @private
         */
        var DataPortOverrideChangeEvent = /** @class */ (function (_super) {
            __extends(DataPortOverrideChangeEvent, _super);
            function DataPortOverrideChangeEvent() {
                return _super.call(this) || this;
            }
            DataPortOverrideChangeEvent.prototype.isOverride = function () {
                return this.override;
            };
            return DataPortOverrideChangeEvent;
        }(DataPortEvent));
        Events.DataPortOverrideChangeEvent = DataPortOverrideChangeEvent;
        DataPortOverrideChangeEvent.prototype.type = 'DataPortOverrideChangeEvent';
        EventServices.registerEvent(DataPortOverrideChangeEvent);
        /**
         * @class DataPortTestValuesChangeEvent
         * @extends DataPortEvent
         * @private
         */
        var DataPortTestValuesChangeEvent = /** @class */ (function (_super) {
            __extends(DataPortTestValuesChangeEvent, _super);
            function DataPortTestValuesChangeEvent() {
                return _super.call(this) || this;
            }
            DataPortTestValuesChangeEvent.prototype.getTestValues = function () {
                return Tools.copyValue(this.testValues);
            };
            return DataPortTestValuesChangeEvent;
        }(DataPortEvent));
        Events.DataPortTestValuesChangeEvent = DataPortTestValuesChangeEvent;
        DataPortTestValuesChangeEvent.prototype.type = 'DataPortTestValuesChangeEvent';
        EventServices.registerEvent(DataPortTestValuesChangeEvent);
        /**
         * @class DataPortValidityChangeEvent
         * @extends DataPortEvent
         * @private
         */
        var DataPortValidityChangeEvent = /** @class */ (function (_super) {
            __extends(DataPortValidityChangeEvent, _super);
            function DataPortValidityChangeEvent() {
                return _super.call(this) || this;
            }
            return DataPortValidityChangeEvent;
        }(DataPortEvent));
        Events.DataPortValidityChangeEvent = DataPortValidityChangeEvent;
        DataPortValidityChangeEvent.prototype.type = 'DataPortValidityChangeEvent';
        EventServices.registerEvent(DataPortValidityChangeEvent);
        /**
         * @class SettingEvent
         * @extends Event
         * @private
         */
        var SettingEvent = /** @class */ (function (_super) {
            __extends(SettingEvent, _super);
            function SettingEvent() {
                return _super.call(this) || this;
            }
            SettingEvent.prototype.getSetting = function () {
                return this.setting;
            };
            SettingEvent.prototype.getIndex = function () {
                return this.index;
            };
            return SettingEvent;
        }(Event));
        Events.SettingEvent = SettingEvent;
        SettingEvent.prototype.type = 'SettingEvent';
        EventServices.registerEvent(SettingEvent);
        /**
         * @class SettingAddEvent
         * @extends SettingEvent
         * @private
         */
        var SettingAddEvent = /** @class */ (function (_super) {
            __extends(SettingAddEvent, _super);
            function SettingAddEvent() {
                return _super.call(this) || this;
            }
            return SettingAddEvent;
        }(SettingEvent));
        Events.SettingAddEvent = SettingAddEvent;
        SettingAddEvent.prototype.type = 'SettingAddEvent';
        EventServices.registerEvent(SettingAddEvent);
        /**
         * @class SettingRemoveEvent
         * @extends SettingEvent
         * @private
         */
        var SettingRemoveEvent = /** @class */ (function (_super) {
            __extends(SettingRemoveEvent, _super);
            function SettingRemoveEvent() {
                return _super.call(this) || this;
            }
            return SettingRemoveEvent;
        }(SettingEvent));
        Events.SettingRemoveEvent = SettingRemoveEvent;
        SettingRemoveEvent.prototype.type = 'SettingRemoveEvent';
        EventServices.registerEvent(SettingRemoveEvent);
        /**
         * @class SettingNameChangeEvent
         * @extends SettingEvent
         * @private
         */
        var SettingNameChangeEvent = /** @class */ (function (_super) {
            __extends(SettingNameChangeEvent, _super);
            function SettingNameChangeEvent() {
                return _super.call(this) || this;
            }
            SettingNameChangeEvent.prototype.getName = function () {
                return this.name;
            };
            return SettingNameChangeEvent;
        }(SettingEvent));
        Events.SettingNameChangeEvent = SettingNameChangeEvent;
        SettingNameChangeEvent.prototype.type = 'SettingNameChangeEvent';
        EventServices.registerEvent(SettingNameChangeEvent);
        /**
         * @class SettingValueChangeEvent
         * @extends SettingEvent
         * @private
         */
        var SettingValueChangeEvent = /** @class */ (function (_super) {
            __extends(SettingValueChangeEvent, _super);
            function SettingValueChangeEvent() {
                return _super.call(this) || this;
            }
            SettingValueChangeEvent.prototype.getValue = function () {
                return Tools.copyValue(this.value);
            };
            return SettingValueChangeEvent;
        }(SettingEvent));
        Events.SettingValueChangeEvent = SettingValueChangeEvent;
        SettingValueChangeEvent.prototype.type = 'SettingValueChangeEvent';
        EventServices.registerEvent(SettingValueChangeEvent);
        /**
         * @class SettingValueTypeChangeEvent
         * @extends SettingValueChangeEvent
         * @private
         */
        var SettingValueTypeChangeEvent = /** @class */ (function (_super) {
            __extends(SettingValueTypeChangeEvent, _super);
            function SettingValueTypeChangeEvent() {
                return _super.call(this) || this;
            }
            SettingValueTypeChangeEvent.prototype.getValueType = function () {
                return this.valueType;
            };
            return SettingValueTypeChangeEvent;
        }(SettingValueChangeEvent));
        Events.SettingValueTypeChangeEvent = SettingValueTypeChangeEvent;
        SettingValueTypeChangeEvent.prototype.type = 'SettingValueTypeChangeEvent';
        EventServices.registerEvent(SettingValueTypeChangeEvent);
        /**
         * @class SettingOverrideChangeEvent
         * @extends SettingEvent
         * @private
         */
        var SettingOverrideChangeEvent = /** @class */ (function (_super) {
            __extends(SettingOverrideChangeEvent, _super);
            function SettingOverrideChangeEvent() {
                return _super.call(this) || this;
            }
            SettingOverrideChangeEvent.prototype.isOverride = function () {
                return this.override;
            };
            return SettingOverrideChangeEvent;
        }(SettingEvent));
        Events.SettingOverrideChangeEvent = SettingOverrideChangeEvent;
        SettingOverrideChangeEvent.prototype.type = 'SettingOverrideChangeEvent';
        EventServices.registerEvent(SettingOverrideChangeEvent);
        /**
         * @class SettingValidityChangeEvent
         * @extends SettingEvent
         * @private
         */
        var SettingValidityChangeEvent = /** @class */ (function (_super) {
            __extends(SettingValidityChangeEvent, _super);
            function SettingValidityChangeEvent() {
                return _super.call(this) || this;
            }
            return SettingValidityChangeEvent;
        }(SettingEvent));
        Events.SettingValidityChangeEvent = SettingValidityChangeEvent;
        SettingValidityChangeEvent.prototype.type = 'SettingValidityChangeEvent';
        EventServices.registerEvent(SettingValidityChangeEvent);
        /**
         * @class TemplateLibraryGraphChangeEvent
         * @extends Event
         * @private
         */
        var TemplateLibraryGraphChangeEvent = /** @class */ (function (_super) {
            __extends(TemplateLibraryGraphChangeEvent, _super);
            function TemplateLibraryGraphChangeEvent() {
                return _super.call(this) || this;
            }
            TemplateLibraryGraphChangeEvent.prototype.getUid = function () {
                return this.uid;
            };
            return TemplateLibraryGraphChangeEvent;
        }(Event));
        Events.TemplateLibraryGraphChangeEvent = TemplateLibraryGraphChangeEvent;
        TemplateLibraryGraphChangeEvent.prototype.type = 'TemplateLibraryGraphChangeEvent';
        EventServices.registerEvent(TemplateLibraryGraphChangeEvent);
        /**
         * @class TemplateLibraryScriptChangeEvent
         * @extends Event
         * @private
         */
        var TemplateLibraryScriptChangeEvent = /** @class */ (function (_super) {
            __extends(TemplateLibraryScriptChangeEvent, _super);
            function TemplateLibraryScriptChangeEvent() {
                return _super.call(this) || this;
            }
            TemplateLibraryScriptChangeEvent.prototype.getUid = function () {
                return this.uid;
            };
            return TemplateLibraryScriptChangeEvent;
        }(Event));
        Events.TemplateLibraryScriptChangeEvent = TemplateLibraryScriptChangeEvent;
        TemplateLibraryScriptChangeEvent.prototype.type = 'TemplateLibraryScriptChangeEvent';
        EventServices.registerEvent(TemplateLibraryScriptChangeEvent);
        /**
         * @class TypeLibraryRegisterEvent
         * @extends Event
         * @private
         */
        var TypeLibraryRegisterEvent = /** @class */ (function (_super) {
            __extends(TypeLibraryRegisterEvent, _super);
            function TypeLibraryRegisterEvent() {
                return _super.call(this) || this;
            }
            TypeLibraryRegisterEvent.prototype.getName = function () {
                return this.name;
            };
            return TypeLibraryRegisterEvent;
        }(Event));
        Events.TypeLibraryRegisterEvent = TypeLibraryRegisterEvent;
        TypeLibraryRegisterEvent.prototype.type = 'TypeLibraryRegisterEvent';
        EventServices.registerEvent(TypeLibraryRegisterEvent);
        /**
         * @class TypeLibraryRegisterGlobalEvent
         * @extends TypeLibraryRegisterEvent
         * @private
         */
        var TypeLibraryRegisterGlobalEvent = /** @class */ (function (_super) {
            __extends(TypeLibraryRegisterGlobalEvent, _super);
            function TypeLibraryRegisterGlobalEvent() {
                return _super.call(this) || this;
            }
            return TypeLibraryRegisterGlobalEvent;
        }(TypeLibraryRegisterEvent));
        Events.TypeLibraryRegisterGlobalEvent = TypeLibraryRegisterGlobalEvent;
        TypeLibraryRegisterGlobalEvent.prototype.type = 'TypeLibraryRegisterGlobalEvent';
        EventServices.registerEvent(TypeLibraryRegisterGlobalEvent);
        /**
         * @class TypeLibraryRegisterLocalCustomEvent
         * @extends TypeLibraryRegisterEvent
         * @private
         */
        var TypeLibraryRegisterLocalCustomEvent = /** @class */ (function (_super) {
            __extends(TypeLibraryRegisterLocalCustomEvent, _super);
            function TypeLibraryRegisterLocalCustomEvent() {
                return _super.call(this) || this;
            }
            TypeLibraryRegisterLocalCustomEvent.prototype.getGraphContext = function () {
                return this.graphContext;
            };
            return TypeLibraryRegisterLocalCustomEvent;
        }(TypeLibraryRegisterEvent));
        Events.TypeLibraryRegisterLocalCustomEvent = TypeLibraryRegisterLocalCustomEvent;
        TypeLibraryRegisterLocalCustomEvent.prototype.type = 'TypeLibraryRegisterLocalCustomEvent';
        EventServices.registerEvent(TypeLibraryRegisterLocalCustomEvent);
        /**
         * @class TypeLibraryUnregisterEvent
         * @extends Event
         * @private
         */
        var TypeLibraryUnregisterEvent = /** @class */ (function (_super) {
            __extends(TypeLibraryUnregisterEvent, _super);
            function TypeLibraryUnregisterEvent() {
                return _super.call(this) || this;
            }
            TypeLibraryUnregisterEvent.prototype.getName = function () {
                return this.name;
            };
            return TypeLibraryUnregisterEvent;
        }(Event));
        Events.TypeLibraryUnregisterEvent = TypeLibraryUnregisterEvent;
        TypeLibraryUnregisterEvent.prototype.type = 'TypeLibraryUnregisterEvent';
        EventServices.registerEvent(TypeLibraryUnregisterEvent);
        /**
         * @class TypeLibraryUnregisterLocalCustomEvent
         * @extends TypeLibraryUnregisterEvent
         * @private
         */
        var TypeLibraryUnregisterLocalCustomEvent = /** @class */ (function (_super) {
            __extends(TypeLibraryUnregisterLocalCustomEvent, _super);
            function TypeLibraryUnregisterLocalCustomEvent() {
                return _super.call(this) || this;
            }
            TypeLibraryUnregisterLocalCustomEvent.prototype.getGraphContext = function () {
                return this.graphContext;
            };
            return TypeLibraryUnregisterLocalCustomEvent;
        }(TypeLibraryUnregisterEvent));
        Events.TypeLibraryUnregisterLocalCustomEvent = TypeLibraryUnregisterLocalCustomEvent;
        TypeLibraryUnregisterLocalCustomEvent.prototype.type = 'TypeLibraryUnregisterLocalCustomEvent';
        EventServices.registerEvent(TypeLibraryUnregisterLocalCustomEvent);
        /**
         * @class TypeLibraryUpdateEvent
         * @extends Event
         * @private
         */
        var TypeLibraryUpdateEvent = /** @class */ (function (_super) {
            __extends(TypeLibraryUpdateEvent, _super);
            function TypeLibraryUpdateEvent() {
                return _super.call(this) || this;
            }
            TypeLibraryUpdateEvent.prototype.getName = function () {
                return this.name;
            };
            return TypeLibraryUpdateEvent;
        }(Event));
        Events.TypeLibraryUpdateEvent = TypeLibraryUpdateEvent;
        TypeLibraryUpdateEvent.prototype.type = 'TypeLibraryUpdateEvent';
        EventServices.registerEvent(TypeLibraryUpdateEvent);
        /**
         * @class TypeLibraryUpdateLocalCustomEvent
         * @extends TypeLibraryUpdateEvent
         * @private
         */
        var TypeLibraryUpdateLocalCustomEvent = /** @class */ (function (_super) {
            __extends(TypeLibraryUpdateLocalCustomEvent, _super);
            function TypeLibraryUpdateLocalCustomEvent() {
                return _super.call(this) || this;
            }
            TypeLibraryUpdateLocalCustomEvent.prototype.getGraphContext = function () {
                return this.graphContext;
            };
            return TypeLibraryUpdateLocalCustomEvent;
        }(TypeLibraryUpdateEvent));
        Events.TypeLibraryUpdateLocalCustomEvent = TypeLibraryUpdateLocalCustomEvent;
        TypeLibraryUpdateLocalCustomEvent.prototype.type = 'TypeLibraryUpdateLocalCustomEvent';
        EventServices.registerEvent(TypeLibraryUpdateLocalCustomEvent);
        /**
         * @class BlockLibraryRegisterCategoryEvent
         * @extends Event
         * @private
         */
        var BlockLibraryRegisterCategoryEvent = /** @class */ (function (_super) {
            __extends(BlockLibraryRegisterCategoryEvent, _super);
            function BlockLibraryRegisterCategoryEvent() {
                return _super.call(this) || this;
            }
            BlockLibraryRegisterCategoryEvent.prototype.getCategory = function () {
                return this.category;
            };
            return BlockLibraryRegisterCategoryEvent;
        }(Event));
        Events.BlockLibraryRegisterCategoryEvent = BlockLibraryRegisterCategoryEvent;
        BlockLibraryRegisterCategoryEvent.prototype.type = 'BlockLibraryRegisterCategoryEvent';
        EventServices.registerEvent(BlockLibraryRegisterCategoryEvent);
        /**
         * @class BlockLibraryRegisterBlockEvent
         * @extends Event
         * @private
         */
        var BlockLibraryRegisterBlockEvent = /** @class */ (function (_super) {
            __extends(BlockLibraryRegisterBlockEvent, _super);
            function BlockLibraryRegisterBlockEvent() {
                return _super.call(this) || this;
            }
            BlockLibraryRegisterBlockEvent.prototype.getUid = function () {
                return this.uid;
            };
            return BlockLibraryRegisterBlockEvent;
        }(Event));
        Events.BlockLibraryRegisterBlockEvent = BlockLibraryRegisterBlockEvent;
        BlockLibraryRegisterBlockEvent.prototype.type = 'BlockLibraryRegisterBlockEvent';
        EventServices.registerEvent(BlockLibraryRegisterBlockEvent);
    })(Events || (Events = {}));
    return Events;
});
