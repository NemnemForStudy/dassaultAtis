define('CSIMathematics/CSIDeclareMathPointfJS', ['DS/MathematicsES/MathPointJSImpl'], function (MathPoint) {
    'use strict';

    /**
     * Declare the CATMathPointf type in the CSICommands.
     * It streams a MathPointJSImpl.
     */
    var CSIDeclare = function (CSICommands)
    {
        var serializeMathPointf = function (parameter, point)
        {
            parameter.writeFloat('x', point.x);
            parameter.writeFloat('y', point.y);
            parameter.writeFloat('z', point.z);
            return true; // everything OK
        };

        var unserializeMathPointf = function (message)
        {
            var x = message.readFloat('x');
            var y = message.readFloat('y');
            var z = message.readFloat('z');
            var pt = new MathPoint(x, y, z);
            return pt;
        };

        CSICommands.declareType(
        {
            type: 'CATMathPointf',
            serialize: serializeMathPointf,
            unserialize: unserializeMathPointf,
        });
    };

    return CSIDeclare;
});
