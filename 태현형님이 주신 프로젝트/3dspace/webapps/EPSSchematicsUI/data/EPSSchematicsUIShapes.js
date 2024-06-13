/// <amd-module name='DS/EPSSchematicsUI/data/EPSSchematicsUIShapes'/>
define("DS/EPSSchematicsUI/data/EPSSchematicsUIShapes", ["require", "exports", "text!DS/EPSSchematicsUI/assets/EPSSchematicsUIShapes.json"], function (require, exports, UIShapesJSON) {
    "use strict";
    var JSONShapes = JSON.parse(UIShapesJSON);
    /**
     * The class defines the UI Shapes.
     * @class UIShapes
     * @alias module:DS/EPSSchematicsUI/data/EPSSchematicsUIShapes
     * @abstract
     * @private
     */
    var UIShapes = /** @class */ (function () {
        function UIShapes() {
        }
        UIShapes.controlPortPolygonPoints = JSONShapes.controlPortPolygonPoints;
        UIShapes.inputDataPortPolygonPoints = JSONShapes.inputDataPortPolygonPoints;
        UIShapes.outputDataPortPolygonPoints = JSONShapes.outputDataPortPolygonPoints;
        UIShapes.inputDataPortStretchablePolygonPoints = JSONShapes.inputDataPortStretchablePolygonPoints;
        UIShapes.inputDataPortStretchableReversedPolygonPoints = JSONShapes.inputDataPortStretchableReversedPolygonPoints;
        UIShapes.outputDataPortStretchablePolygonPoints = JSONShapes.outputDataPortStretchablePolygonPoints;
        UIShapes.outputDataPortStretchableReversedPolygonPoints = JSONShapes.outputDataPortStretchableReversedPolygonPoints; // TODO: points not implemenated yet!
        UIShapes.graphTestDataPortPathPoints = JSONShapes.graphTestDataPortPathPoints;
        UIShapes.stretchableGraphTestDataPortPathPoints = JSONShapes.stretchableGraphTestDataPortPathPoints;
        UIShapes.stretchableReversedGraphTestDataPortPathPoints = JSONShapes.stretchableReversedGraphTestDataPortPathPoints;
        UIShapes.inputSubDataPortPolygonPoints = JSONShapes.inputSubDataPortPolygonPoints;
        UIShapes.outputSubDataPortPolygonPoints = JSONShapes.outputSubDataPortPolygonPoints;
        UIShapes.shortcutIconPathPoints = JSONShapes.shortcutIconPathPoints;
        UIShapes.eventPortPathPoints = JSONShapes.eventPortPathPoints;
        UIShapes.eventPortPathPointsOrignal = JSONShapes.eventPortPathPointsOrignal;
        UIShapes.eventPortPathPoints01 = JSONShapes.eventPortPathPoints01;
        UIShapes.eventPortPathPoints02 = JSONShapes.eventPortPathPoints02;
        UIShapes.eventPortPathPointsArondi = JSONShapes.eventPortPathPointsArondi;
        UIShapes.eventPortPathPointsWifi = JSONShapes.eventPortPathPointsWifi;
        UIShapes.castLevelLossLessPathPoints = JSONShapes.castLevelLossLessPathPoints;
        UIShapes.castLevelLossyPathPoints = JSONShapes.castLevelLossyPathPoints;
        UIShapes.castLevelInvalidPathPoints = JSONShapes.castLevelInvalidPathPoints;
        UIShapes.castLevelBackgroundPathPoints = JSONShapes.castLevelBackgroundPathPoints;
        UIShapes.minimizedCastLevelCrossPathPoints = JSONShapes.minimizedCastLevelCrossPathPoints;
        return UIShapes;
    }());
    return UIShapes;
});
