define('DS/EPSSchematicsCSI/EPSSchematicsCSICategory', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary'
], function (BlockLibrary) {
    'use strict';

    var CSICategory = 'CSI';
    BlockLibrary.registerCategory(CSICategory, 'text!DS/EPSSchematicsCSI/assets/EPSSchematicsCSICategoryDoc.json');
    return CSICategory;
});
