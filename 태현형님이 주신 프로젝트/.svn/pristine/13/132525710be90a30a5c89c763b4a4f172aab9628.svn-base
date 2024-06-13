//from http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
// Read a page's GET URL variables and return them as an associative array.
if(window.define) {
    define('DS/DELWebInfrastructure/DSCommon/src/ds_getUrlVars',[],
    function(){
        'use strict';
        return {getUrlVars: window.Ds.getUrlVars};
    });
}
if(!window.Ds) {
    window.Ds = {};
}
if(window.Ds) {
  window.Ds.getUrlVars = function(href)
  {
    var vars = [], hash;
    if(!href) {
        if(window.widget && widget.uwaUrl) {
            href = widget.uwaUrl;
        } else {
            href = window.location.href;
        }
    }
    var hashes = href.slice(href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
  }
}
