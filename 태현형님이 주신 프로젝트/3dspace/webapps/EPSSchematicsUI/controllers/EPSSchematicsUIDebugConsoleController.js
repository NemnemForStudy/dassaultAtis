/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIDebugConsoleController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIDebugConsoleController", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeDocument", "DS/EPSSchematicsUI/tools/EPSSchematicsUINLSTools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsUI/EPSSchematicsUIEnums", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, WUXTreeDocument, UINLSTools, UIEvents, UIFontIcon, UITools, UIEnums, WUXTreeNodeModel, ExecutionEvents, EventServices, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var severityStrengthMap = new Map([
        [ModelEnums.ESeverity.eDebug, 0],
        [ModelEnums.ESeverity.eInfo, 1],
        [ModelEnums.ESeverity.eSuccess, 2],
        [ModelEnums.ESeverity.eWarning, 3],
        [ModelEnums.ESeverity.eError, 4]
    ]);
    /**
     * This class defines a UI debug console controller.
     * @class UIDebugConsoleController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIDebugConsoleController
     * @private
     */
    var UIDebugConsoleController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         */
        function UIDebugConsoleController(editor) {
            this._treeDocument = new WUXTreeDocument({ useAsyncPreExpand: true });
            this._onPrintEventCB = this._onPrintEvent.bind(this);
            this._onApplicationPrintEventCB = this._onApplicationPrintEvent.bind(this);
            this._notificationCount = 0;
            this._notificationStrength = 0;
            this._editor = editor;
            EventServices.addListener(ExecutionEvents.PrintEvent, this._onPrintEventCB);
            EventServices.addListener(UIEvents.UIApplicationPrintEvent, this._onApplicationPrintEventCB);
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
         * Removes the controller.
         * @public
         */
        UIDebugConsoleController.prototype.remove = function () {
            EventServices.removeListener(ExecutionEvents.PrintEvent, this._onPrintEventCB);
            EventServices.removeListener(UIEvents.UIApplicationPrintEvent, this._onApplicationPrintEventCB);
            this._onPrintEventCB = undefined;
            this._onApplicationPrintEventCB = undefined;
            this.clear();
            this._treeDocument = undefined;
            this._registeredDebugConsole = undefined;
            this._editor = undefined;
            this._notificationCount = undefined;
            this._notificationStrength = undefined;
        };
        /**
         * Gets the tree document containing the event list.
         * @public
         * @returns {WUXTreeDocument} The tree document.
         */
        UIDebugConsoleController.prototype.getTreeDocument = function () {
            return this._treeDocument;
        };
        /**
         * Clears the event list of the debug console controller.
         * @public
         */
        UIDebugConsoleController.prototype.clear = function () {
            this._treeDocument.empty();
        };
        /**
         * Gets the notification count.
         * @public
         * @returns {number} The notification count.
         */
        UIDebugConsoleController.prototype.getNotificationCount = function () {
            return this._notificationCount;
        };
        /**
         * Gets the notification strength.
         * @public
         * @returns {number} The notification strength.
         */
        UIDebugConsoleController.prototype.getNotificationStrength = function () {
            return this._notificationStrength;
        };
        /**
         * Displays a message into the debug console.
         * @public
         * @param {EMessageOrigin} origin - The origin of the message.
         * @param {ESeverity} severity - The severity of the message.
         * @param {Date} timestamp - The timestamp of the message.
         * @param {Array<*>|*} contentList - The list of message.
         * @param {boolean} [showNotification=true] - True to show a notification baloon else false.
         */
        UIDebugConsoleController.prototype.displayMessage = function (origin, severity, timestamp, contentList, showNotification) {
            var _this = this;
            if (showNotification === void 0) { showNotification = true; }
            contentList = Array.isArray(contentList) ? contentList : [contentList];
            contentList.forEach(function (message) { return _this._registerNodeModel(origin, severity, timestamp, message); });
            if (this._registeredDebugConsole === undefined && showNotification) {
                this._notificationCount++;
                var strength = severityStrengthMap.get(severity);
                this._notificationStrength = strength > this._notificationStrength ? strength : this._notificationStrength;
                var viewers = this._editor.getViewerController().getRootViewerWithAllViewers();
                viewers.forEach(function (viewer) { return viewer.getMainGraph().getToolbar().getDebugConsoleButton().displayNotification(_this._notificationCount, _this._notificationStrength); });
            }
        };
        /**
         * Registers a debug console.
         * @public
         * @param {UIDebugConsolePanel} debugConsole - The debug console to register.
         */
        UIDebugConsoleController.prototype.registerDebugConsole = function (debugConsole) {
            this._registeredDebugConsole = debugConsole;
        };
        /**
         * Unregisters the debug console.
         * @public
         */
        UIDebugConsoleController.prototype.unregisterDebugConsole = function () {
            this._registeredDebugConsole = undefined;
        };
        /**
         * Clears the notifications of each debug console toolbar button.
         * @public
         */
        UIDebugConsoleController.prototype.clearToolbarButtonsNotifications = function () {
            this._notificationCount = 0;
            this._notificationStrength = 0;
            var viewers = this._editor.getViewerController().getRootViewerWithAllViewers();
            viewers.forEach(function (viewer) { return viewer.getMainGraph().getToolbar().getDebugConsoleButton().clearNotifications(); });
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
         * Registers a node model into the tree document for the given message.
         * @private
         * @param {EMessageOrigin} origin - The origin of the message.
         * @param {ESeverity} severity - The message severity level.
         * @param {Date} timestamp - The message timestamp.
         * @param {*} message - The message.
         */
        UIDebugConsoleController.prototype._registerNodeModel = function (origin, severity, timestamp, message) {
            var nodeModel = new WUXTreeNodeModel({
                grid: {
                    originIcon: UIFontIcon.getWUXIconFromMessageOrigin(origin),
                    originText: UINLSTools.getOriginShortHelp(origin),
                    message: message,
                    severity: severity,
                    severityText: UINLSTools.getSeverityShortHelp(severity),
                    severityIcon: UIFontIcon.getWUXIconFromSeverity(severity),
                    timestamp: timestamp,
                    fullTime: UITools.getFullTime(timestamp),
                    fullDate: UITools.getFullDate(timestamp)
                }
            });
            this._treeDocument.addRoot(nodeModel);
        };
        /**
         * The callback on the Print event.
         * @private
         * @param {PrintEvent} event - The Print event.
         */
        UIDebugConsoleController.prototype._onPrintEvent = function (event) {
            var contentList = event.getContent();
            var severity = event.getSeverity();
            var timestamp = event.getDate();
            this.displayMessage(UIEnums.EMessageOrigin.eUser, severity, timestamp, contentList);
        };
        /**
         * The callback on the Application Print event.
         * @private
         * @param {ApplicationPrintEvent} event - The Application Print event.
         */
        UIDebugConsoleController.prototype._onApplicationPrintEvent = function (event) {
            var contentList = event.getContent();
            var severity = event.getSeverity();
            var timestamp = event.getDate();
            var showNotification = event.getShowNotificationState();
            this.displayMessage(UIEnums.EMessageOrigin.eApplication, severity, timestamp, contentList, showNotification);
        };
        return UIDebugConsoleController;
    }());
    return UIDebugConsoleController;
});
