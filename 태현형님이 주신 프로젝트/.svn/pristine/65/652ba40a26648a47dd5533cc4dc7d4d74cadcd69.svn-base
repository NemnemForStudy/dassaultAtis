if(!window.Object.size) {
  //add a general method to get the size of the associative object array.
  // usage: var myObj = {'a':1,'b':123};
  //        alert("myObj size = "+Object.size(myObj)); //displays "myObj size = 2"
  window.Object.size = function(obj) {
    if(window.Object.keys) {
      // For browsers supporting Object.keys()
      return Object.keys(obj).length;
    }

    //Otherwise (notably in IE < 9), you can loop through the object yourself with a for (x in y) loop:
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) ++size;
    }
    return size;
  };
}
