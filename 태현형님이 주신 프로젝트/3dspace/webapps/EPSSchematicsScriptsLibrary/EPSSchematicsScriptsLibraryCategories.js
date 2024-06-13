define('DS/EPSSchematicsScriptsLibrary/EPSSchematicsScriptsLibraryCategories', [
    'DS/EPSSchematicsCoreLibrary/EPSSchematicsCoreLibraryCoreCategory',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary'
], function (CoreCategory, BlockLibrary) {
    'use strict';

    var Categories = {
        Script: CoreCategory + '/Script'
    };
    BlockLibrary.registerCategory(Categories.Script, 'i18n!DS/EPSSchematicsScriptsLibrary/assets/nls/EPSCategoryScriptDoc');

    return Categories;
});
