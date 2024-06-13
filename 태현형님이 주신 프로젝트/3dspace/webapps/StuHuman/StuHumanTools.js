define('DS/StuHuman/StuHumanTools',
    ['DS/MathematicsES/MathsDef'],
    function (DSMath) {
        'use strict';

        function partition(list, prop, begin, end, pivot) {
            var piv = list[pivot];
            swap(list, pivot, end - 1);
            var store = begin;
            var ix;
            for (ix = begin; ix < end - 1; ++ix) {
                if (list[ix][prop] <= piv[prop]) {
                    swap(list, store, ix);
                    ++store;
                }
            }
            swap(list, end - 1, store);
            return store;
        }


        function swap(obj, a, b) {
            var tmp = obj[a];
            obj[a] = obj[b];
            obj[b] = tmp;
        }

        function quicksort(list, prop, begin, end) {
            if (end - 1 > begin) {
                var pivot = begin + Math.floor(Math.random() * (end - begin));

                pivot = partition(list, prop, begin, end, pivot);

                quicksort(list, prop, begin, pivot);
                quicksort(list, prop, pivot + 1, end);
            }
        }

        var HumanTools = {
            qsort: function (list, prop) {
                quicksort(list, prop, 0, list.length);
            },

            makeIsometryMatrix: function (iMatrix) {
                var result = new DSMath.Matrix3x3();

                var vx = iMatrix.getFirstColumn().clone().normalize();
                var vy = iMatrix.getSecondColumn().clone().normalize();
                var vz = iMatrix.getThirdColumn().clone().normalize();

                vz = DSMath.Vector3D.cross(vx, vy).normalize();
                vy = DSMath.Vector3D.cross(vz, vx).normalize();

                result.setFirstColumn(vx);
                result.setSecondColumn(vy);
                result.setThirdColumn(vz);
                
                if (!result.isAnIsometry()) {
                    throw new Error('cannot make an isometry');
                }

                return result;
            }
        };

        return HumanTools;
    }
);
