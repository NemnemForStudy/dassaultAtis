/// <amd-module name='DS/EPSSchematicsUI/geometries/EPSSchematicsUIDataLinkGeometry'/>
define("DS/EPSSchematicsUI/geometries/EPSSchematicsUIDataLinkGeometry", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphSubDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort"], function (require, exports, UIGraphDataPort, UIGraphSubDataPort, UIShortcutDataPort) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data link geometry.
     * @class UIDataLinkGeometry
     * @alias module:DS/EPSSchematicsUI/geometries/EPSSchematicsUIDataLinkGeometry
     * @private
     */
    var UIDataLinkGeometry = /** @class */ (function () {
        /**
         * @constructor
         */
        function UIDataLinkGeometry() {
        }
        /**
         * The callback on the data link geometry update.
         * @public
         * @param {EGraphCore.Edge} edge - The edge to update.
         */
        // eslint-disable-next-line class-methods-use-this
        UIDataLinkGeometry.prototype.onupdate = function (edge) {
            var uiElement = edge.cl1.c.data.uiElement;
            var isGraphOrShortcut = uiElement instanceof UIGraphDataPort || uiElement instanceof UIGraphSubDataPort || uiElement instanceof UIShortcutDataPort;
            var isStartPort = uiElement.isStartPort();
            var c1, c2;
            if (isGraphOrShortcut) {
                c1 = isStartPort ? edge.cl1.c : edge.cl2.c;
                c2 = isStartPort ? edge.cl2.c : edge.cl1.c;
            }
            else {
                c1 = isStartPort ? edge.cl2.c : edge.cl1.c;
                c2 = isStartPort ? edge.cl1.c : edge.cl2.c;
            }
            var start = { x: c1.aleft, y: c1.atop };
            var end = { x: c2.aleft, y: c2.atop };
            var sx = start.x;
            var sy = start.y + UIDataLinkGeometry.K_MINIMIZEDLINKLENGTH;
            var tx = end.x;
            var ty = end.y - UIDataLinkGeometry.K_MINIMIZEDLINKLENGTH;
            var an1x = c1.anormx;
            var an1y = c1.anormy;
            var an2x = c2.anormx;
            var an2y = c2.anormy;
            var dx = Math.max(UIDataLinkGeometry.K_MINTANGENTLENGTH, Math.abs(tx - sx));
            var dy = Math.max(UIDataLinkGeometry.K_MINTANGENTLENGTH, Math.abs(ty - sy));
            var x1 = sx + dx * an1x / 2;
            var y1 = sy + dy * an1y / 2;
            var x2 = tx + dx * an2x / 2;
            var y2 = ty + dy * an2y / 2;
            var newPath = [
                0 /* M */, start.x, start.y,
                1 /* L */, sx, sy,
                2 /* C */, tx, ty, x1, y1, x2, y2,
                1 /* L */, end.x, end.y
            ];
            edge.set('path', newPath);
        };
        // Removed readonly so Dataflow mode can change this parameter
        UIDataLinkGeometry.K_MINIMIZEDLINKLENGTH = 10;
        UIDataLinkGeometry.K_MINTANGENTLENGTH = 120;
        return UIDataLinkGeometry;
    }());
    return UIDataLinkGeometry;
});
