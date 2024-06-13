define('DS/EPSSchematicsCoreLibrary/debug/EPSSchematicsCoreLibraryDebugCategory', [
    'DS/EPSSchematicsCoreLibrary/EPSSchematicsCoreLibraryCoreCategory',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary'
], function (CoreCategory, BlockLibrary) {
    'use strict';

    var DebugCategory = CoreCategory + '/Debug';
    BlockLibrary.registerCategory(DebugCategory, 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSCategoryDebugDoc');
return DebugCategory;
});
