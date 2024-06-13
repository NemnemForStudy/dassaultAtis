/// <amd-module name='DS/EPSSchematicsUI/tools/EPSSchematicsUINLSTools'/>
define("DS/EPSSchematicsUI/tools/EPSSchematicsUINLSTools", ["require", "exports", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/EPSSchematicsUIEnums"], function (require, exports, UINLS, ModelEnums, UIEnums) {
    "use strict";
    var UINLSTools = /** @class */ (function () {
        function UINLSTools() {
        }
        /**
         * Gets the severity shorthelp.
         * @private
         * @param {ESeverity} severity - The severity level.
         * @returns {string} The severity shorthelp.
         */
        UINLSTools.getSeverityShortHelp = function (severity) {
            var shortHelp;
            if (severity === ModelEnums.ESeverity.eInfo) {
                shortHelp = UINLS.get('shortHelpSeverityInfo');
            }
            else if (severity === ModelEnums.ESeverity.eDebug) {
                shortHelp = UINLS.get('shortHelpSeverityDebug');
            }
            else if (severity === ModelEnums.ESeverity.eWarning) {
                shortHelp = UINLS.get('shortHelpSeverityWarning');
            }
            else if (severity === ModelEnums.ESeverity.eError) {
                shortHelp = UINLS.get('shortHelpSeverityError');
            }
            else if (severity === ModelEnums.ESeverity.eSuccess) {
                shortHelp = UINLS.get('shortHelpSeveritySuccess');
            }
            return shortHelp;
        };
        /**
         * Gets the origin shorthelp.
         * @private
         * @param {EMessageOrigin} origin - The origin of the message.
         * @returns {string} The message origin shorthelp.
         */
        UINLSTools.getOriginShortHelp = function (origin) {
            var shortHelp;
            if (origin === UIEnums.EMessageOrigin.eApplication) {
                shortHelp = UINLS.get('shortHelpOriginApplication');
            }
            else if (origin === UIEnums.EMessageOrigin.eUser) {
                shortHelp = UINLS.get('shortHelpOriginUser');
            }
            return shortHelp;
        };
        /**
         * Gets the data ports NLS name according to the given data port type.
         * @public
         * @static
         * @param {EDataPortType} portType - The data port type.
         * @returns {string} The data ports NLS name.
         */
        UINLSTools.getDataPortsNLSName = function (portType) {
            var portName;
            if (portType === ModelEnums.EDataPortType.eInput) {
                portName = UINLS.get('categoryInputDataPorts');
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                portName = UINLS.get('categoryOutputDataPorts');
            }
            else if (portType === ModelEnums.EDataPortType.eLocal) {
                portName = UINLS.get('categoryLocalDataPorts');
            }
            return portName;
        };
        /**
         * Gets the control ports NLS name according to the given control port type.
         * @public
         * @static
         * @param {EControlPortType} portType - The control port type.
         * @returns {string} The control ports NLS name.
         */
        UINLSTools.getControlPortsNLSName = function (portType) {
            var portName;
            if (portType === ModelEnums.EControlPortType.eInput) {
                portName = UINLS.get('categoryInputControlPorts');
            }
            else if (portType === ModelEnums.EControlPortType.eOutput) {
                portName = UINLS.get('categoryOutputControlPorts');
            }
            else if (portType === ModelEnums.EControlPortType.eInputEvent) {
                portName = UINLS.get('categoryInputEventPorts');
            }
            else if (portType === ModelEnums.EControlPortType.eOutputEvent) {
                portName = UINLS.get('categoryOutputEventPorts');
            }
            return portName;
        };
        /**
         * Gets the NLS from the provided string.
         * @public
         * @static
         * @param {string} str - The formated string targetting the NLS string.
         * @returns {string} The NLS string.
         */
        UINLSTools.getNLSFromString = function (str) {
            var nlsString = undefined;
            var nlsToken = '$nls:';
            if (str !== undefined && str !== '') {
                var hasToken = str.substring(0, nlsToken.length) === nlsToken;
                var nlsKey = hasToken ? str.substring(nlsToken.length) : undefined;
                nlsString = hasToken ? UINLS[nlsKey] : undefined;
            }
            return nlsString;
        };
        return UINLSTools;
    }());
    return UINLSTools;
});
