/*global define*/
/*jshint -W116 */
/*jshint -W098 */
/*jshint -W101 */
/*jshint -W083 */
/*jshint -W055 */
/*jshint -W044 */
/*jshint -W089 */

define("DS/Bookmarklet/GettingTheBookmarklet", ["UWA/Json", "i18n!DS/Bookmarklet/assets/nls/bookmarklet"], function (Json, nls) {
    "use strict";
    var endpoint = top.dsDefaultWebappsBaseUrl;
    
    var exports = {};
    
    exports.url = function (protocol) {
        protocol = typeof protocol !== "undefined" ? protocol : true;
        
        // bookmarklet should work on-premises on any domain, so no check on origin should be added for postMessage
        // if (!/\\.(?:3dexperience|dsone)\\.3ds\.com(:\\d{1,5}|)$/.test(e.origin)) return;
        return (protocol === true ? "javascript:" : "") + '(function (w,d) { var frameId = "3dexperience-bookmarklet", curElem = d.getElementById(frameId); curElem && d.body.removeChild(curElem); var i = d.createElement("iframe"), f = function (e) { if (!e.data) return; var resp = JSON.parse(e.data); if (!resp || resp.key != "ds-bookmarklet") return; switch (resp.type) { case "init": eval("(" + resp.data + ")(w, d, e.source, \'' + endpoint + '\', ' + Json.encode(nls).replace(/"/g, '\\"') + ')"); break; case "close": w.removeEventListener("message", f, false); i && i.parentNode && d.body.removeChild(i); break; default: break;} }; w.addEventListener("message", f, false); i.src="' + endpoint + 'Bookmarklet/Bookmarklet.html"; i.id = frameId; i.width="0"; i.height= "0"; i.frameborder= "0"; d.body.appendChild(i); }(window,document));';
    };
    
    return exports;
});
