if(!window.Object.values) {
  //add a general method to get the values of the associative object array.  This is defined in all modern browsers.  But not IE.
  window.Object.values = function(obj) {
    if(window.Object.keys) {
      // For browsers supporting Object.keys()
      return Object.keys(obj).map(function(e) {
          return obj[e];
      });
    }

    //Otherwise (notably in IE < 9), you can loop through the object yourself with a for (x in y) loop:
    var key = null;
    var retArr = [];
    for (key in obj) {
        retArr.push(obj[key]);;
    }
    return retArr;
  };
}
