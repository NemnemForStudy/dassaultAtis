/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsTypeCastConfig'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsTypeCastConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var TypeCastConfig = {
        baseType: {
            Array: {
                Boolean: undefined,
                Buffer: undefined,
                Double: undefined,
                Integer: undefined,
                Object: undefined,
                String: undefined
            },
            Boolean: {
                Array: undefined,
                Buffer: undefined,
                Double: 'eLossless',
                Integer: 'eLossless',
                Object: undefined,
                String: 'eLossy'
            },
            Buffer: {
                Array: undefined,
                Boolean: undefined,
                Double: undefined,
                Integer: undefined,
                Object: undefined,
                String: undefined
            },
            Double: {
                Array: undefined,
                Boolean: 'eLossy',
                Buffer: undefined,
                Integer: 'eLossy',
                Object: undefined,
                String: 'eLossless'
            },
            Integer: {
                Array: undefined,
                Boolean: 'eLossy',
                Buffer: undefined,
                Double: 'eLossless',
                Object: undefined,
                String: 'eLossless'
            },
            Object: {
                Array: undefined,
                Boolean: undefined,
                Buffer: undefined,
                Double: undefined,
                Integer: undefined,
                String: undefined
            },
            String: {
                Array: undefined,
                Boolean: 'eLossy',
                Buffer: undefined,
                Double: 'eUnsafe',
                Integer: 'eUnsafe',
                Object: undefined
            }
        },
        objectTypeOptions: {
            allowExtraProperty: true
        }
    };
    return TypeCastConfig;
});
