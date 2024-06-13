define('DS/EPSSchematicsCoreLibrary/event/EPSSchematicsCoreLibraryEventCategory', [
    'DS/EPSSchematicsCoreLibrary/EPSSchematicsCoreLibraryCoreCategory',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary'
], function (CoreCategory, BlockLibrary) {
    'use strict';

    var EventCategory = CoreCategory + '/Event';
    BlockLibrary.registerCategory(EventCategory, 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSCategoryEventDoc');
    return EventCategory;
});
