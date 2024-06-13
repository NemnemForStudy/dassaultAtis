/**
  If you are scaling a 2D layout that includes droppable targets, then you need to take to ACTUAL SCALED size of the target into account.
  jQueryUI 1.10.3 currently doesn't take this into account.  Therefore, we are going to overload the function that sets the internal width/height for calculations
    and then let jQueryUI do it's thing.

  2014-03-19 - NWT
**/
(function($) {
  if($.ui && $.ui.ddmanager && $.ui.ddmanager.prepareOffsets)
  {
    if(!$.ui.ddmanager._prepareOffsets) { //only do this if we haven't done it before
      $.ui.ddmanager._prepareOffsets = $.ui.ddmanager.prepareOffsets; //store the old one... we'll need it later.
      $.ui.ddmanager.prepareOffsets = function(t, event) {
        this._prepareOffsets(t,event); //call the original function
    		var m = $.ui.ddmanager.droppables[t.options.scope] || [];
        var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;

    		droppablesLoop: for (var i = 0; i < m.length; i++) {
    		  var transform = $(m[i].element[0]).css("transform") ||
    		                  $(m[i].element[0]).css("-webkit-transform") ||
    		                  $(m[i].element[0]).css("-moz-transform") ||
    		                  $(m[i].element[0]).css("-ms-transform") ||
    		                  $(m[i].element[0]).css("-o-transform") ||
    		                  ""; //default to an empty string
          if(!transform || (transform == "none")) {
            //make sure we don't have any parent elements that are scaled
            var $parentScaledElem = $(m[i].element[0]).parents("[style*='transform'][style*='scale(']");
            if($parentScaledElem.size() > 0) {
        		  transform = $parentScaledElem.css("transform") ||
    		                  $parentScaledElem.css("-webkit-transform") ||
    		                  $parentScaledElem.css("-moz-transform") ||
    		                  $parentScaledElem.css("-ms-transform") ||
    		                  $parentScaledElem.css("-o-transform") ||
    		                  ""; //default to an empty string
            }
          }

          var scale = transform.match(matrixRegex); //valid example : ["matrix(1.44562, 0, 0, 1.44562, 0, 0)", "1.44562", "1.44562"]
          if(scale && (scale.length == 3)) {
            var objProportions = { width: m[i].element[0].offsetWidth * scale[1], height: m[i].element[0].offsetHeight * scale[2] }; //scale[1] will contain scaleX and scale[2] will contain scaleY
            if(m[i].proportions && $.isFunction(m[i].proportions)) { //jQueryUI v1.11+
        			m[i].proportions(objProportions);
            } else {
        			m[i].proportions = objProportions;
        		}
      		}
    		}
      };
    }
  }
})(jQuery);
