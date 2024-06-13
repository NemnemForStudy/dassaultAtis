/// <amd-module name='DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'/>
define("DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "DS/EPSSchematicsCoreLibrary/EPSSchematicsCoreLibraryCoreCategory"], function (require, exports, BlockLibrary, CoreCategory) {
    "use strict";
    var ArrayCategory = CoreCategory + '/Array';
    BlockLibrary.registerCategory(ArrayCategory, 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSCategoryArrayDoc');
    return ArrayCategory;
});
