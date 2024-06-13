define('CSIMathematics/CSIDeclareMathPoint2DfJS', ['DS/MathematicsES/MathPoint2DJSImpl'], function (MathPoint2D) {
    'use strict';

    /**
     * Declare the CATMathPoint2Df type in the CSICommands.
     * It streams a MathPoint2DJSImpl.
     */
    var CSIDeclare = function (CSICommands)
    {
        var serializeMathPoint2Df = function (parameter, point)
        {
            parameter.writeFloat('x', point.x);
            parameter.writeFloat('y', point.y);
            return true; // everything OK
        };

        var unserializeMathPoint2Df = function (message)
        {
            var x = message.readFloat('x');
            var y = message.readFloat('y');
            var pt = new MathPoint2D(x, y);
            return pt;
        };

        CSICommands.declareType(
        {
            type: 'CATMathPoint2Df',
            serialize: serializeMathPoint2Df,
            unserialize: unserializeMathPoint2Df,
        });
    };

    return CSIDeclare;
});
