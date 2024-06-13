// NWT - 10/16/2015
// Based on http://stackoverflow.com/questions/3417139/how-do-i-calculate-the-height-of-toolbars-address-bars-and-other-navigation-too/3417992#3417992
//Tested working in the following browsers :
//    Chrome
//    FF 9+
//    IE9
//    Opera
(function($) {
    $.getScrollBarSize = function() {
       var inner = $('<p></p>').css({
          'width':'100%',
          'height':'100%'
       });
       var outer = $('<div></div>').css({
          'position':'absolute',
          'width':'100px',
          'height':'100px',
          'top':'0',
          'left':'0',
          'visibility':'hidden',
          'overflow':'hidden'
       }).append(inner);

       $(document.body).append(outer);

       var w1 = inner.width(), h1 = inner.height();
       outer.css('overflow','scroll');
       var w2 = inner.width(), h2 = inner.height();
       if (w1 == w2 && outer[0].clientWidth) {
          w2 = outer[0].clientWidth;
       }
       if (h1 == h2 && outer[0].clientHeight) {
          h2 = outer[0].clientHeight;
       }

       outer.detach();

       return {verticalWidth:(w1 - w2),horizontalHeight:(h1 - h2)};
    };

    //Method to detect if the element has any scrollbars
    // based on http://stackoverflow.com/questions/4814398/how-can-i-check-if-a-scrollbar-is-visible
    $.fn.hasScrollBar = function() {
        return {vertical: (this.get(0).scrollHeight > this.get(0).clientHeight), horizontal:(this.get(0).scrollWidth > this.get(0).clientWidth)};
    }
})(jQuery);
