define('DS/EPSSchematicsCoreLibrary/calculator/EPSSchematicsCoreLibraryCalculatorCategory', [
    'DS/EPSSchematicsCoreLibrary/EPSSchematicsCoreLibraryCoreCategory',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary'
], function (CoreCategory, BlockLibrary) {
    'use strict';

    var CalculatorCategory = CoreCategory + '/Calculator';
    BlockLibrary.registerCategory(CalculatorCategory, 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSCategoryCalculatorDoc');
    return CalculatorCategory;
});
