window.jsmvcFindController = function (el, contructorFuncion) {
    var control = null;
    if (el && $(el).data) {
        var controls = $(el).data("controls");
        if (controls && controls.length) {
            for (var i = 0; i < controls.length; i++) {
                var ctrl = controls[i];
                if (ctrl && ctrl.constructor && ctrl.constructor == contructorFuncion) {
                    control = ctrl;
                    break;
                }
            }
        }
    }
    return control;
}
