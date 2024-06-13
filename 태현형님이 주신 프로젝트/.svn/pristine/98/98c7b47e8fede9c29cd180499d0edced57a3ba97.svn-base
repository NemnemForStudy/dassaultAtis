/**
* this code is from all around the web :)
* if you want to put some credits you are welcome!
* BVO2 obtained from ZJX
*
* NWT - This file basically is a polyfill for a bunch of browser specific implementations
*/
//var compatibility =
(function() {
  var lastTime = 0,
      isLittleEndian = true;

  window.URL = window.URL || window.webkitURL;

//  requestAnimationFrame = function(callback, element) {
//      var requestAnimationFrame =
  window.requestAnimationFrame =
          window.requestAnimationFrame        ||
          window.webkitRequestAnimationFrame  ||
          window.mozRequestAnimationFrame     ||
          window.oRequestAnimationFrame       ||
          window.msRequestAnimationFrame      ||
          function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function() {
                  callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
          };

//      return requestAnimationFrame.call(window, callback, element);
//  },

//  cancelAnimationFrame = function(id) {
//      var cancelAnimationFrame = window.cancelAnimationFrame ||
    window.cancelAnimationFrame = window.cancelAnimationFrame ||
                                   window.mozCancelAnimationFrame ||
                                   function(id) {
                                     clearTimeout(id);
                                   };
//      return cancelAnimationFrame.call(window, id);
//  },

//  getUserMedia = function(options, success, error) {
//      var getUserMedia =
    window.navigator.getUserMedia =
          window.navigator.getUserMedia ||
          window.navigator.mozGetUserMedia ||
          window.navigator.webkitGetUserMedia ||
          window.navigator.msGetUserMedia ||
          function(options, success, error) {
              error();
          };

//      return getUserMedia.call(window.navigator, options, success, error);
//  },

// NWT 4/14/2015 - who uses this??  commented out for now until someone needs it...
//  if(!window.Ds) {
//    //keep everything namespaced!
//    window.Ds = {};
//  }
//  window.Ds.detectEndian = function() {
//      var buf = new ArrayBuffer(8);
//      var data = new Uint32Array(buf);
//      data[0] = 0xff000000;
//      isLittleEndian = true;
//      if (buf[0] === 0xff) {
//          isLittleEndian = false;
//      }
//      return isLittleEndian;
//  };

//  return {
//    URL: URL,
//    requestAnimationFrame: requestAnimationFrame,
//    cancelAnimationFrame: cancelAnimationFrame,
//    getUserMedia: getUserMedia,
//    detectEndian: detectEndian,
//    isLittleEndian: isLittleEndian
//  };
})();
