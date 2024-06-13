
define('DS/EPSSchematicsCoreLibrary/string/EPSSchematicsCoreLibraryStringCategory', [
    'DS/EPSSchematicsCoreLibrary/EPSSchematicsCoreLibraryCoreCategory',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary'
], function (CoreCategory, BlockLibrary) {
    'use strict';

    var StringCategory = CoreCategory + '/String';
    BlockLibrary.registerCategory(StringCategory, 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSCategoryStringDoc');
    return StringCategory;
});
