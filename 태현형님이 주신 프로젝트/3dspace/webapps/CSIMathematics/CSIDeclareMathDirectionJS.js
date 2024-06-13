define('CSIMathematics/CSIDeclareMathDirectionJS', ['DS/MathematicsES/MathDirectionJSImpl'], function (MathDirection)
{
    'use strict';

    /**
     * Declare the CATMathDirection type in the CSICommands.
     * It streams a MathDirectionJSImpl.
     */
    var CSIDeclare = function (CSICommands)
    {
        var serializeMathDirection = function (parameter, direction)
        {
            parameter.writeDouble('x', direction.x);
            parameter.writeDouble('y', direction.y);
            parameter.writeDouble('z', direction.z);
            return true; // everything OK
        };

        var unserializeMathDirection = function (message)
        {
            var x = message.readDouble('x');
            var y = message.readDouble('y');
            var z = message.readDouble('z');
            var dir = new MathDirection(x, y, z);
            return dir;
        };

        CSICommands.declareType(
        {
            type: 'CATMathDirection',
            serialize: serializeMathDirection,
            unserialize: unserializeMathDirection,
        });
    };

    return CSIDeclare;
});
