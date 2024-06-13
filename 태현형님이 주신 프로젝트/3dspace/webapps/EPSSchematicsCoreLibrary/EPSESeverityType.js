define('DS/EPSSchematicsCoreLibrary/EPSESeverityType', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary'
], function (Enums, TypeLibrary) {
    'use strict';

    TypeLibrary.registerGlobalEnumType('ESeverity', Enums.ESeverity);

    return Enums.ESeverity;
});
