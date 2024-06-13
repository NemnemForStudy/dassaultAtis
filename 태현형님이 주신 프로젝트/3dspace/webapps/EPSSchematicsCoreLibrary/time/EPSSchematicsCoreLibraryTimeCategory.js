define('DS/EPSSchematicsCoreLibrary/time/EPSSchematicsCoreLibraryTimeCategory', [
    'DS/EPSSchematicsCoreLibrary/EPSSchematicsCoreLibraryCoreCategory',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary'
], function (CoreCategory, BlockLibrary) {
    'use strict';

    var TimeCategory = CoreCategory + '/Time';
    BlockLibrary.registerCategory(TimeCategory, 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSCategoryTimeDoc');
    return TimeCategory;
});
