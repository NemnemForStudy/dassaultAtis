define('CSIMathematics/CSIDeclareMathDirectionfJS', ['DS/MathematicsES/MathDirectionJSImpl'], function (MathDirection)
{
    'use strict';

    /**
     * Declare the CATMathDirectionf type in the CSICommands.
     * It streams a MathDirectionJSImpl.
     */
    var CSIDeclare = function (CSICommands)
    {
        var serializeMathDirectionf = function (parameter, direction)
        {
            parameter.writeFloat('x', direction.x);
            parameter.writeFloat('y', direction.y);
            parameter.writeFloat('z', direction.z);
            return true; // everything OK
        };

        var unserializeMathDirectionf = function (message)
        {
            var x = message.readFloat('x');
            var y = message.readFloat('y');
            var z = message.readFloat('z');
            var dir = new MathDirection(x, y, z);
            return dir;
        };

        CSICommands.declareType(
        {
            type: 'CATMathDirectionf',
            serialize: serializeMathDirectionf,
            unserialize: unserializeMathDirectionf,
        });
    };

    return CSIDeclare;
});
