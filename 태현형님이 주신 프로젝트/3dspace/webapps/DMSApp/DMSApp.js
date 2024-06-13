/*! jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],E=C.document,r=Object.getPrototypeOf,s=t.slice,g=t.concat,u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},x=function(e){return null!=e&&e===e.window},c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.4.1",k=function(e,t){return new k.fn.init(e,t)},p=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function d(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}k.fn=k.prototype={jquery:f,constructor:k,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=k.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return k.each(this,e)},map:function(n){return this.pushStack(k.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},k.extend=k.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(k.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||k.isPlainObject(n)?n:{},i=!1,a[t]=k.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},k.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t){b(e,{nonce:t&&t.nonce})},each:function(e,t){var n,r=0;if(d(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(p,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(d(Object(e))?k.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(d(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g.apply([],a)},guid:1,support:y}),"function"==typeof Symbol&&(k.fn[Symbol.iterator]=t[Symbol.iterator]),k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var h=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,k="sizzle"+1*new Date,m=n.document,S=0,r=0,p=ue(),x=ue(),N=ue(),A=ue(),D=function(e,t){return e===t&&(l=!0),0},j={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",$=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",F=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp($),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+$),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ne=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(m.childNodes),m.childNodes),t[m.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&((e?e.ownerDocument||e:m)!==C&&T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!A[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&U.test(t)){(s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=k),o=(l=h(t)).length;while(o--)l[o]="#"+s+" "+xe(l[o]);c=l.join(","),f=ee.test(t)&&ye(e.parentNode)||e}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){A(t,!0)}finally{s===k&&e.removeAttribute("id")}}}return g(t.replace(B,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[k]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:m;return r!==C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),m!==C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=k,!C.getElementsByName||!C.getElementsByName(k).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){a.appendChild(e).innerHTML="<a id='"+k+"'></a><select id='"+k+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+k+"-]").length||v.push("~="),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+k+"+*").length||v.push(".#.+[+~]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",$)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e===C||e.ownerDocument===m&&y(m,e)?-1:t===C||t.ownerDocument===m&&y(m,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===C?-1:t===C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]===m?-1:s[r]===m?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if((e.ownerDocument||e)!==C&&T(e),d.matchesSelector&&E&&!A[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){A(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!==C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!==C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&j.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=p[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&p(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(F," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[S,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[S,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[k]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace(B,"$1"));return s[k]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[S,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[k]||(e[k]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===S&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[k]&&(v=Ce(v)),y&&!y[k]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[k]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(B,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(B," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=N[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[k]?i.push(a):o.push(a);(a=N(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=S+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t===C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument===C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(S=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(S=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=k.split("").sort(D).join("")===k,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);k.find=h,k.expr=h.selectors,k.expr[":"]=k.expr.pseudos,k.uniqueSort=k.unique=h.uniqueSort,k.text=h.getText,k.isXMLDoc=h.isXML,k.contains=h.contains,k.escapeSelector=h.escape;var T=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&k(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},N=k.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var D=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?k.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?k.grep(e,function(e){return e===n!==r}):"string"!=typeof n?k.grep(e,function(e){return-1<i.call(n,e)!==r}):k.filter(n,e,r)}k.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?k.find.matchesSelector(r,e)?[r]:[]:k.find.matches(e,k.grep(t,function(e){return 1===e.nodeType}))},k.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(k(e).filter(function(){for(t=0;t<r;t++)if(k.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)k.find(e,i[t],n);return 1<r?k.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&N.test(e)?k(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(k.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:L.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof k?t[0]:t,k.merge(this,k.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),D.test(r[1])&&k.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(k):k.makeArray(e,this)}).prototype=k.fn,q=k(E);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}k.fn.extend({has:function(e){var t=k(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(k.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&k(e);if(!N.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&k.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?k.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(k(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(k.uniqueSort(k.merge(this.get(),k(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),k.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return T(e,"parentNode")},parentsUntil:function(e,t,n){return T(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return T(e,"nextSibling")},prevAll:function(e){return T(e,"previousSibling")},nextUntil:function(e,t,n){return T(e,"nextSibling",n)},prevUntil:function(e,t,n){return T(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return"undefined"!=typeof e.contentDocument?e.contentDocument:(A(e,"template")&&(e=e.content||e),k.merge([],e.childNodes))}},function(r,i){k.fn[r]=function(e,t){var n=k.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=k.filter(t,n)),1<this.length&&(O[r]||k.uniqueSort(n),H.test(r)&&n.reverse()),this.pushStack(n)}});var R=/[^\x20\t\r\n\f]+/g;function M(e){return e}function I(e){throw e}function W(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}k.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},k.each(e.match(R)||[],function(e,t){n[t]=!0}),n):k.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){k.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return k.each(arguments,function(e,t){var n;while(-1<(n=k.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<k.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},k.extend({Deferred:function(e){var o=[["notify","progress",k.Callbacks("memory"),k.Callbacks("memory"),2],["resolve","done",k.Callbacks("once memory"),k.Callbacks("once memory"),0,"resolved"],["reject","fail",k.Callbacks("once memory"),k.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return k.Deferred(function(r){k.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,M,s),l(u,o,I,s)):(u++,t.call(e,l(u,o,M,s),l(u,o,I,s),l(u,o,M,o.notifyWith))):(a!==M&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){k.Deferred.exceptionHook&&k.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==I&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(k.Deferred.getStackHook&&(t.stackTrace=k.Deferred.getStackHook()),C.setTimeout(t))}}return k.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:M,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:M)),o[2][3].add(l(0,e,m(n)?n:I))}).promise()},promise:function(e){return null!=e?k.extend(e,a):a}},s={};return k.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=k.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(W(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)W(i[t],a(t),o.reject);return o.promise()}});var $=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;k.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&$.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},k.readyException=function(e){C.setTimeout(function(){throw e})};var F=k.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),k.ready()}k.fn.ready=function(e){return F.then(e)["catch"](function(e){k.readyException(e)}),this},k.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--k.readyWait:k.isReady)||(k.isReady=!0)!==e&&0<--k.readyWait||F.resolveWith(E,[k])}}),k.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(k.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var _=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)_(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(k(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},z=/^-ms-/,U=/-([a-z])/g;function X(e,t){return t.toUpperCase()}function V(e){return e.replace(z,"ms-").replace(U,X)}var G=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Y(){this.expando=k.expando+Y.uid++}Y.uid=1,Y.prototype={cache:function(e){var t=e[this.expando];return t||(t={},G(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[V(t)]=n;else for(r in t)i[V(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][V(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(V):(t=V(t))in r?[t]:t.match(R)||[]).length;while(n--)delete r[t[n]]}(void 0===t||k.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!k.isEmptyObject(t)}};var Q=new Y,J=new Y,K=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function ee(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(Z,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:K.test(i)?JSON.parse(i):i)}catch(e){}J.set(e,t,n)}else n=void 0;return n}k.extend({hasData:function(e){return J.hasData(e)||Q.hasData(e)},data:function(e,t,n){return J.access(e,t,n)},removeData:function(e,t){J.remove(e,t)},_data:function(e,t,n){return Q.access(e,t,n)},_removeData:function(e,t){Q.remove(e,t)}}),k.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=J.get(o),1===o.nodeType&&!Q.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=V(r.slice(5)),ee(o,r,i[r]));Q.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){J.set(this,n)}):_(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=J.get(o,n))?t:void 0!==(t=ee(o,n))?t:void 0;this.each(function(){J.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){J.remove(this,e)})}}),k.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Q.get(e,t),n&&(!r||Array.isArray(n)?r=Q.access(e,t,k.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=k.queue(e,t),r=n.length,i=n.shift(),o=k._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){k.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Q.get(e,n)||Q.access(e,n,{empty:k.Callbacks("once memory").add(function(){Q.remove(e,[t+"queue",n])})})}}),k.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?k.queue(this[0],t):void 0===n?this:this.each(function(){var e=k.queue(this,t,n);k._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&k.dequeue(this,t)})},dequeue:function(e){return this.each(function(){k.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=k.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Q.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var te=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ne=new RegExp("^(?:([+-])=|)("+te+")([a-z%]*)$","i"),re=["Top","Right","Bottom","Left"],ie=E.documentElement,oe=function(e){return k.contains(e.ownerDocument,e)},ae={composed:!0};ie.getRootNode&&(oe=function(e){return k.contains(e.ownerDocument,e)||e.getRootNode(ae)===e.ownerDocument});var se=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&oe(e)&&"none"===k.css(e,"display")},ue=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];for(o in i=n.apply(e,r||[]),t)e.style[o]=a[o];return i};function le(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return k.css(e,t,"")},u=s(),l=n&&n[3]||(k.cssNumber[t]?"":"px"),c=e.nodeType&&(k.cssNumber[t]||"px"!==l&&+u)&&ne.exec(k.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)k.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,k.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ce={};function fe(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Q.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&se(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ce[s])||(o=a.body.appendChild(a.createElement(s)),u=k.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ce[s]=u)))):"none"!==n&&(l[c]="none",Q.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}k.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){se(this)?k(this).show():k(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?k.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Q.set(e[n],"globalEval",!t||Q.get(t[n],"globalEval"))}ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;var me,xe,be=/<|&#?\w+;/;function we(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))k.merge(p,o.nodeType?[o]:o);else if(be.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+k.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;k.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<k.inArray(o,r))i&&i.push(o);else if(l=oe(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}me=E.createDocumentFragment().appendChild(E.createElement("div")),(xe=E.createElement("input")).setAttribute("type","radio"),xe.setAttribute("checked","checked"),xe.setAttribute("name","t"),me.appendChild(xe),y.checkClone=me.cloneNode(!0).cloneNode(!0).lastChild.checked,me.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!me.cloneNode(!0).lastChild.defaultValue;var Te=/^key/,Ce=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ee=/^([^.]*)(?:\.(.+)|)/;function ke(){return!0}function Se(){return!1}function Ne(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ae(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ae(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Se;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return k().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=k.guid++)),e.each(function(){k.event.add(this,t,i,r,n)})}function De(e,i,o){o?(Q.set(e,i,!1),k.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Q.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(k.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Q.set(this,i,r),t=o(this,i),this[i](),r!==(n=Q.get(this,i))||t?Q.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else r.length&&(Q.set(this,i,{value:k.event.trigger(k.extend(r[0],k.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Q.get(e,i)&&k.event.add(e,i,ke)}k.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.get(t);if(v){n.handler&&(n=(o=n).handler,i=o.selector),i&&k.find.matchesSelector(ie,i),n.guid||(n.guid=k.guid++),(u=v.events)||(u=v.events={}),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof k&&k.event.triggered!==e.type?k.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(R)||[""]).length;while(l--)d=g=(s=Ee.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=k.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=k.event.special[d]||{},c=k.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&k.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),k.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.hasData(e)&&Q.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(R)||[""]).length;while(l--)if(d=g=(s=Ee.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=k.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||k.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)k.event.remove(e,d+t[l],n,r,!0);k.isEmptyObject(u)&&Q.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=k.event.fix(e),u=new Array(arguments.length),l=(Q.get(this,"events")||{})[s.type]||[],c=k.event.special[s.type]||{};for(u[0]=s,t=1;t<arguments.length;t++)u[t]=arguments[t];if(s.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,s)){a=k.event.handlers.call(this,s,l),t=0;while((i=a[t++])&&!s.isPropagationStopped()){s.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!s.isImmediatePropagationStopped())s.rnamespace&&!1!==o.namespace&&!s.rnamespace.test(o.namespace)||(s.handleObj=o,s.data=o.data,void 0!==(r=((k.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,u))&&!1===(s.result=r)&&(s.preventDefault(),s.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<k(i,this).index(l):k.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(k.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[k.expando]?e:new k.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click",ke),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Q.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},k.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},k.Event=function(e,t){if(!(this instanceof k.Event))return new k.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?ke:Se,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&k.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[k.expando]=!0},k.Event.prototype={constructor:k.Event,isDefaultPrevented:Se,isPropagationStopped:Se,isImmediatePropagationStopped:Se,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=ke,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=ke,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=ke,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},k.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Te.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Ce.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},k.event.addProp),k.each({focus:"focusin",blur:"focusout"},function(e,t){k.event.special[e]={setup:function(){return De(this,e,Ne),!1},trigger:function(){return De(this,e),!0},delegateType:t}}),k.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){k.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||k.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),k.fn.extend({on:function(e,t,n,r){return Ae(this,e,t,n,r)},one:function(e,t,n,r){return Ae(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,k(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Se),this.each(function(){k.event.remove(this,e,n,t)})}});var je=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,qe=/<script|<style|<link/i,Le=/checked\s*(?:[^=]|=\s*.checked.)/i,He=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Oe(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&k(e).children("tbody")[0]||e}function Pe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Re(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Me(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(Q.hasData(e)&&(o=Q.access(e),a=Q.set(t,o),l=o.events))for(i in delete a.handle,a.events={},l)for(n=0,r=l[i].length;n<r;n++)k.event.add(t,i,l[i][n]);J.hasData(e)&&(s=J.access(e),u=k.extend({},s),J.set(t,u))}}function Ie(n,r,i,o){r=g.apply([],r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Le.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),Ie(t,r,i,o)});if(f&&(t=(e=we(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=k.map(ve(e,"script"),Pe)).length;c<f;c++)u=e,c!==p&&(u=k.clone(u,!0,!0),s&&k.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,k.map(a,Re),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Q.access(u,"globalEval")&&k.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?k._evalUrl&&!u.noModule&&k._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")}):b(u.textContent.replace(He,""),u,l))}return n}function We(e,t,n){for(var r,i=t?k.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||k.cleanData(ve(r)),r.parentNode&&(n&&oe(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}k.extend({htmlPrefilter:function(e){return e.replace(je,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=oe(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||k.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Me(o[r],a[r]);else Me(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=k.event.special,o=0;void 0!==(n=e[o]);o++)if(G(n)){if(t=n[Q.expando]){if(t.events)for(r in t.events)i[r]?k.event.remove(n,r):k.removeEvent(n,r,t.handle);n[Q.expando]=void 0}n[J.expando]&&(n[J.expando]=void 0)}}}),k.fn.extend({detach:function(e){return We(this,e,!0)},remove:function(e){return We(this,e)},text:function(e){return _(this,function(e){return void 0===e?k.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Ie(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Oe(this,e).appendChild(e)})},prepend:function(){return Ie(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Oe(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(k.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return k.clone(this,e,t)})},html:function(e){return _(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!qe.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=k.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(k.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return Ie(this,arguments,function(e){var t=this.parentNode;k.inArray(this,n)<0&&(k.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),k.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){k.fn[e]=function(e){for(var t,n=[],r=k(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),k(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var $e=new RegExp("^("+te+")(?!px)[a-z%]+$","i"),Fe=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Be=new RegExp(re.join("|"),"i");function _e(e,t,n){var r,i,o,a,s=e.style;return(n=n||Fe(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||oe(e)||(a=k.style(e,t)),!y.pixelBoxStyles()&&$e.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function ze(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(u){s.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",u.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ie.appendChild(s).appendChild(u);var e=C.getComputedStyle(u);n="1%"!==e.top,a=12===t(e.marginLeft),u.style.right="60%",o=36===t(e.right),r=36===t(e.width),u.style.position="absolute",i=12===t(u.offsetWidth/3),ie.removeChild(s),u=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s=E.createElement("div"),u=E.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===u.style.backgroundClip,k.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),a},scrollboxSize:function(){return e(),i}}))}();var Ue=["Webkit","Moz","ms"],Xe=E.createElement("div").style,Ve={};function Ge(e){var t=k.cssProps[e]||Ve[e];return t||(e in Xe?e:Ve[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Ue.length;while(n--)if((e=Ue[n]+t)in Xe)return e}(e)||e)}var Ye=/^(none|table(?!-c[ea]).+)/,Qe=/^--/,Je={position:"absolute",visibility:"hidden",display:"block"},Ke={letterSpacing:"0",fontWeight:"400"};function Ze(e,t,n){var r=ne.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function et(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=k.css(e,n+re[a],!0,i)),r?("content"===n&&(u-=k.css(e,"padding"+re[a],!0,i)),"margin"!==n&&(u-=k.css(e,"border"+re[a]+"Width",!0,i))):(u+=k.css(e,"padding"+re[a],!0,i),"padding"!==n?u+=k.css(e,"border"+re[a]+"Width",!0,i):s+=k.css(e,"border"+re[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function tt(e,t,n){var r=Fe(e),i=(!y.boxSizingReliable()||n)&&"border-box"===k.css(e,"boxSizing",!1,r),o=i,a=_e(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if($e.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||"auto"===a||!parseFloat(a)&&"inline"===k.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===k.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+et(e,t,n||(i?"border":"content"),o,r,a)+"px"}function nt(e,t,n,r,i){return new nt.prototype.init(e,t,n,r,i)}k.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=_e(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=V(t),u=Qe.test(t),l=e.style;if(u||(t=Ge(s)),a=k.cssHooks[t]||k.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=ne.exec(n))&&i[1]&&(n=le(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(k.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=V(t);return Qe.test(t)||(t=Ge(s)),(a=k.cssHooks[t]||k.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=_e(e,t,r)),"normal"===i&&t in Ke&&(i=Ke[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),k.each(["height","width"],function(e,u){k.cssHooks[u]={get:function(e,t,n){if(t)return!Ye.test(k.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?tt(e,u,n):ue(e,Je,function(){return tt(e,u,n)})},set:function(e,t,n){var r,i=Fe(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===k.css(e,"boxSizing",!1,i),s=n?et(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-et(e,u,"border",!1,i)-.5)),s&&(r=ne.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=k.css(e,u)),Ze(0,t,s)}}}),k.cssHooks.marginLeft=ze(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(_e(e,"marginLeft"))||e.getBoundingClientRect().left-ue(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),k.each({margin:"",padding:"",border:"Width"},function(i,o){k.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+re[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(k.cssHooks[i+o].set=Ze)}),k.fn.extend({css:function(e,t){return _(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Fe(e),i=t.length;a<i;a++)o[t[a]]=k.css(e,t[a],!1,r);return o}return void 0!==n?k.style(e,t,n):k.css(e,t)},e,t,1<arguments.length)}}),((k.Tween=nt).prototype={constructor:nt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||k.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(k.cssNumber[n]?"":"px")},cur:function(){var e=nt.propHooks[this.prop];return e&&e.get?e.get(this):nt.propHooks._default.get(this)},run:function(e){var t,n=nt.propHooks[this.prop];return this.options.duration?this.pos=t=k.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):nt.propHooks._default.set(this),this}}).init.prototype=nt.prototype,(nt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=k.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){k.fx.step[e.prop]?k.fx.step[e.prop](e):1!==e.elem.nodeType||!k.cssHooks[e.prop]&&null==e.elem.style[Ge(e.prop)]?e.elem[e.prop]=e.now:k.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=nt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},k.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},k.fx=nt.prototype.init,k.fx.step={};var rt,it,ot,at,st=/^(?:toggle|show|hide)$/,ut=/queueHooks$/;function lt(){it&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(lt):C.setTimeout(lt,k.fx.interval),k.fx.tick())}function ct(){return C.setTimeout(function(){rt=void 0}),rt=Date.now()}function ft(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=re[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function pt(e,t,n){for(var r,i=(dt.tweeners[t]||[]).concat(dt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function dt(o,e,t){var n,a,r=0,i=dt.prefilters.length,s=k.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=rt||ct(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:k.extend({},e),opts:k.extend(!0,{specialEasing:{},easing:k.easing._default},t),originalProperties:e,originalOptions:t,startTime:rt||ct(),duration:t.duration,tweens:[],createTween:function(e,t){var n=k.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=V(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=k.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=dt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(k._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return k.map(c,pt,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),k.fx.timer(k.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}k.Animation=k.extend(dt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return le(n.elem,e,ne.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(R);for(var n,r=0,i=e.length;r<i;r++)n=e[r],dt.tweeners[n]=dt.tweeners[n]||[],dt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&se(e),v=Q.get(e,"fxshow");for(r in n.queue||(null==(a=k._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,k.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],st.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||k.style(e,r)}if((u=!k.isEmptyObject(t))||!k.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Q.get(e,"display")),"none"===(c=k.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=k.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===k.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Q.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&fe([e],!0),p.done(function(){for(r in g||fe([e]),Q.remove(e,"fxshow"),d)k.style(e,r,d[r])})),u=pt(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?dt.prefilters.unshift(e):dt.prefilters.push(e)}}),k.speed=function(e,t,n){var r=e&&"object"==typeof e?k.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return k.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in k.fx.speeds?r.duration=k.fx.speeds[r.duration]:r.duration=k.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&k.dequeue(this,r.queue)},r},k.fn.extend({fadeTo:function(e,t,n,r){return this.filter(se).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=k.isEmptyObject(t),o=k.speed(e,n,r),a=function(){var e=dt(this,k.extend({},t),o);(i||Q.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&!1!==i&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=k.timers,r=Q.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&ut.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||k.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Q.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=k.timers,o=n?n.length:0;for(t.finish=!0,k.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),k.each(["toggle","show","hide"],function(e,r){var i=k.fn[r];k.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(ft(r,!0),e,t,n)}}),k.each({slideDown:ft("show"),slideUp:ft("hide"),slideToggle:ft("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){k.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),k.timers=[],k.fx.tick=function(){var e,t=0,n=k.timers;for(rt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||k.fx.stop(),rt=void 0},k.fx.timer=function(e){k.timers.push(e),k.fx.start()},k.fx.interval=13,k.fx.start=function(){it||(it=!0,lt())},k.fx.stop=function(){it=null},k.fx.speeds={slow:600,fast:200,_default:400},k.fn.delay=function(r,e){return r=k.fx&&k.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},ot=E.createElement("input"),at=E.createElement("select").appendChild(E.createElement("option")),ot.type="checkbox",y.checkOn=""!==ot.value,y.optSelected=at.selected,(ot=E.createElement("input")).value="t",ot.type="radio",y.radioValue="t"===ot.value;var ht,gt=k.expr.attrHandle;k.fn.extend({attr:function(e,t){return _(this,k.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){k.removeAttr(this,e)})}}),k.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?k.prop(e,t,n):(1===o&&k.isXMLDoc(e)||(i=k.attrHooks[t.toLowerCase()]||(k.expr.match.bool.test(t)?ht:void 0)),void 0!==n?null===n?void k.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=k.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(R);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ht={set:function(e,t,n){return!1===t?k.removeAttr(e,n):e.setAttribute(n,n),n}},k.each(k.expr.match.bool.source.match(/\w+/g),function(e,t){var a=gt[t]||k.find.attr;gt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=gt[o],gt[o]=r,r=null!=a(e,t,n)?o:null,gt[o]=i),r}});var vt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;function mt(e){return(e.match(R)||[]).join(" ")}function xt(e){return e.getAttribute&&e.getAttribute("class")||""}function bt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(R)||[]}k.fn.extend({prop:function(e,t){return _(this,k.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[k.propFix[e]||e]})}}),k.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&k.isXMLDoc(e)||(t=k.propFix[t]||t,i=k.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=k.find.attr(e,"tabindex");return t?parseInt(t,10):vt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(k.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),k.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){k.propFix[this.toLowerCase()]=this}),k.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).addClass(t.call(this,e,xt(this)))});if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).removeClass(t.call(this,e,xt(this)))});if(!arguments.length)return this.attr("class","");if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){k(this).toggleClass(i.call(this,e,xt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=k(this),r=bt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=xt(this))&&Q.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Q.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+mt(xt(n))+" ").indexOf(t))return!0;return!1}});var wt=/\r/g;k.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,k(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=k.map(t,function(e){return null==e?"":e+""})),(r=k.valHooks[this.type]||k.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=k.valHooks[t.type]||k.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(wt,""):null==e?"":e:void 0}}),k.extend({valHooks:{option:{get:function(e){var t=k.find.attr(e,"value");return null!=t?t:mt(k.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=k(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=k.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<k.inArray(k.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),k.each(["radio","checkbox"],function(){k.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<k.inArray(k(e).val(),t)}},y.checkOn||(k.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var Tt=/^(?:focusinfocus|focusoutblur)$/,Ct=function(e){e.stopPropagation()};k.extend(k.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!Tt.test(d+k.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[k.expando]?e:new k.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:k.makeArray(t,[e]),c=k.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,Tt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Q.get(o,"events")||{})[e.type]&&Q.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&G(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!G(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),k.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,Ct),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,Ct),k.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=k.extend(new k.Event,n,{type:e,isSimulated:!0});k.event.trigger(r,null,t)}}),k.fn.extend({trigger:function(e,t){return this.each(function(){k.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return k.event.trigger(e,t,n,!0)}}),y.focusin||k.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){k.event.simulate(r,e.target,k.event.fix(e))};k.event.special[r]={setup:function(){var e=this.ownerDocument||this,t=Q.access(e,r);t||e.addEventListener(n,i,!0),Q.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this,t=Q.access(e,r)-1;t?Q.access(e,r,t):(e.removeEventListener(n,i,!0),Q.remove(e,r))}}});var Et=C.location,kt=Date.now(),St=/\?/;k.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||k.error("Invalid XML: "+e),t};var Nt=/\[\]$/,At=/\r?\n/g,Dt=/^(?:submit|button|image|reset|file)$/i,jt=/^(?:input|select|textarea|keygen)/i;function qt(n,e,r,i){var t;if(Array.isArray(e))k.each(e,function(e,t){r||Nt.test(n)?i(n,t):qt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)qt(n+"["+t+"]",e[t],r,i)}k.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!k.isPlainObject(e))k.each(e,function(){i(this.name,this.value)});else for(n in e)qt(n,e[n],t,i);return r.join("&")},k.fn.extend({serialize:function(){return k.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=k.prop(this,"elements");return e?k.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!k(this).is(":disabled")&&jt.test(this.nodeName)&&!Dt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=k(this).val();return null==n?null:Array.isArray(n)?k.map(n,function(e){return{name:t.name,value:e.replace(At,"\r\n")}}):{name:t.name,value:n.replace(At,"\r\n")}}).get()}});var Lt=/%20/g,Ht=/#.*$/,Ot=/([?&])_=[^&]*/,Pt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Rt=/^(?:GET|HEAD)$/,Mt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Ft=E.createElement("a");function Bt(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(R)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function _t(t,i,o,a){var s={},u=t===Wt;function l(e){var r;return s[e]=!0,k.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function zt(e,t){var n,r,i=k.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&k.extend(!0,e,r),e}Ft.href=Et.href,k.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Et.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":k.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,k.ajaxSettings),t):zt(k.ajaxSettings,e)},ajaxPrefilter:Bt(It),ajaxTransport:Bt(Wt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=k.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?k(y):k.event,x=k.Deferred(),b=k.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Pt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Et.href)+"").replace(Mt,Et.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(R)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Ft.protocol+"//"+Ft.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=k.param(v.data,v.traditional)),_t(It,v,t,T),h)return T;for(i in(g=k.event&&v.global)&&0==k.active++&&k.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Rt.test(v.type),f=v.url.replace(Ht,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Lt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(St.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Ot,"$1"),o=(St.test(f)?"&":"?")+"_="+kt+++o),v.url=f+o),v.ifModified&&(k.lastModified[f]&&T.setRequestHeader("If-Modified-Since",k.lastModified[f]),k.etag[f]&&T.setRequestHeader("If-None-Match",k.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+$t+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=_t(Wt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(k.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(k.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--k.active||k.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return k.get(e,t,n,"json")},getScript:function(e,t){return k.get(e,void 0,t,"script")}}),k.each(["get","post"],function(e,i){k[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),k.ajax(k.extend({url:e,type:i,dataType:r,data:t,success:n},k.isPlainObject(e)&&e))}}),k._evalUrl=function(e,t){return k.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){k.globalEval(e,t)}})},k.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=k(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){k(this).wrapInner(n.call(this,e))}):this.each(function(){var e=k(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){k(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){k(this).replaceWith(this.childNodes)}),this}}),k.expr.pseudos.hidden=function(e){return!k.expr.pseudos.visible(e)},k.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},k.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Ut={0:200,1223:204},Xt=k.ajaxSettings.xhr();y.cors=!!Xt&&"withCredentials"in Xt,y.ajax=Xt=!!Xt,k.ajaxTransport(function(i){var o,a;if(y.cors||Xt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Ut[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),k.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),k.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return k.globalEval(e),e}}}),k.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),k.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=k("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Vt,Gt=[],Yt=/(=)\?(?=&|$)|\?\?/;k.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Gt.pop()||k.expando+"_"+kt++;return this[e]=!0,e}}),k.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Yt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Yt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Yt,"$1"+r):!1!==e.jsonp&&(e.url+=(St.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||k.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?k(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Gt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((Vt=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Vt.childNodes.length),k.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=D.exec(e))?[t.createElement(i[1])]:(i=we([e],t,o),o&&o.length&&k(o).remove(),k.merge([],i.childNodes)));var r,i,o},k.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=mt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&k.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?k("<div>").append(k.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},k.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){k.fn[t]=function(e){return this.on(t,e)}}),k.expr.pseudos.animated=function(t){return k.grep(k.timers,function(e){return t===e.elem}).length},k.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=k.css(e,"position"),c=k(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=k.css(e,"top"),u=k.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,k.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},k.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){k.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===k.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===k.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=k(e).offset()).top+=k.css(e,"borderTopWidth",!0),i.left+=k.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-k.css(r,"marginTop",!0),left:t.left-i.left-k.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===k.css(e,"position"))e=e.offsetParent;return e||ie})}}),k.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;k.fn[t]=function(e){return _(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),k.each(["top","left"],function(e,n){k.cssHooks[n]=ze(y.pixelPosition,function(e,t){if(t)return t=_e(e,n),$e.test(t)?k(e).position()[n]+"px":t})}),k.each({Height:"height",Width:"width"},function(a,s){k.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){k.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return _(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?k.css(e,t,i):k.style(e,t,n,i)},s,n?e:void 0,n)}})}),k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){k.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}}),k.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),k.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),k.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||k.guid++,i},k.holdReady=function(e){e?k.readyWait++:k.ready(!0)},k.isArray=Array.isArray,k.parseJSON=JSON.parse,k.nodeName=A,k.isFunction=m,k.isWindow=x,k.camelCase=V,k.type=w,k.now=Date.now,k.isNumeric=function(e){var t=k.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return k});var Qt=C.jQuery,Jt=C.$;return k.noConflict=function(e){return C.$===k&&(C.$=Jt),e&&C.jQuery===k&&(C.jQuery=Qt),k},e||(C.jQuery=C.$=k),k});

define('DS/DMSApp/Utils/Renderers/GroupAttrOfTypeRenderer',
  [
    'DS/W3DXComponents/Collections/ActionsCollection',
    'DS/W3DXComponents/Views/Layout/GridScrollView',
    'DS/W3DXComponents/Views/Item/TileView'
  ],
  function(ActionsCollection, GridScrollView, TileView) {
    "use strict";
    
    var groupAttrOfType = {
      collection: 'DS/DMSApp/Collections/GroupAttrOfTypeCollection',
      view: 'DS/W3DXComponents/Views/Item/SetView',
      /*detail: {
        'title': 'Attributes List'
      },*/
      viewOptions: {
        //itemView : TileView,
        contents: {
          useInfiniteScroll: false,
          usePullToRefresh: false,
          //className : "table",
          views: [{
            'id': 'tile',
            'title': "AttributeList",
            'view': GridScrollView,
            'itemView': TileView
          }],
          headers: [{
              'label': "Name",
              'property': 'id'
            },
            {
              'label': "Type",
              'property': 'type'
            },
            {
              'label': "Multi-value",
              'property': 'multivaluated'
            },
            {
              'label': "Default value",
              'property': 'defaultValue'
            },
            {
              'label': "Depreciated",
              'property': 'depraciated'
            }
          ]
        },
        actions: {
          collection: function() {
            var acts = new ActionsCollection([{
                text: "subTypeForm",
                icon: 'fonticon fonticon-search',
                overflow: false
              }, {
                text: "subTypeForm",
                icon: 'fonticon fonticon-select-on',
                overflow: false
              },
              {
                id: 'createAttr',
                title: "Attributeform",
                icon: 'plus',
                overflow: false
              }
            ]);
            return acts;
          }
        }
      },
    }
    return groupAttrOfType;

  });

/**
 * Icon input use the type form
 */

define('DS/DMSApp/Views/Layouts/IconInput',
  [
    'UWA/Core',
    'UWA/Promise',
    'DS/UIKIT/Alert',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS'
  ],
  function(UWA, Promise, Alert, myNls) {
    "use strict";
    
    
    function resizeBase64Img(base64, newWidth, newHeight) {
        return new Promise((resolve, reject) => {
          let canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          let context = canvas.getContext("2d");
          let img = document.createElement("img");
          img.src = base64;
          img.onerror = reject;
          img.onload = function() {
            var oldWidth = img.width;
            var oldHeight = img.height;
            context.scale(newWidth / oldWidth, newHeight / oldHeight);
            context.drawImage(img, 0, 0);
            resolve({
              data: canvas.toDataURL("image/png"), 
              oldWidth: oldWidth, 
              oldHeight: oldHeight
            });
          }
        });
    }
    
    function buildAlertBox(msg, container) {
      let alertBox = new Alert({
        visible: true,
        autoHide: true,
        hideDelay: 2000
      }).inject(container);
      alertBox.add({
        className: 'error',
        message: msg
      });
    };

    function getIconField(options, values) {
      
      // Initialiaze controls
      var icons = {};
      var divIconGroup = UWA.createElement('div', options);
      
      options = UWA.merge(options,{
        onIconChange: function() {},
        onIconError: function() {},
      })
      
      for(let iconDef of options.icons) {
        let iconName = iconDef.name;
        let iconWidth = parseInt(iconDef.width);
        let iconHeight = parseInt(iconDef.height);
        let iconHtml = icons[iconName] = UWA.extend(iconDef, {
          name: iconName,
          width: iconWidth,
          height: iconHeight,
          depends: iconDef.depends || [],
          label:  UWA.createElement('label', {
            'class': 'fonticon fonticon-upload',
            'for': options.name + "-file-"  + iconName,
            'styles': {
              'cursor':'pointer',
              'min-width': (iconWidth * 2 + 8) + 'px',
              'min-height': (iconHeight * 2 + 8) + 'px',
              'line-height': (iconHeight * 2 + 8) + 'px',
              'background-size': (iconWidth * 2 ) + 'px ' + (iconHeight * 2 ) + 'px' ,
              'font-size': iconHeight + "px",
              'background-position':'4px 4px',
              'background-repeat':'no-repeat',
              'text-align': 'center',
              'vertical-align': 'top',
              'border-radius': '4px',
              'border': '1px solid #e2e4e3',
              'box-shadow': '0 0 0 3px white inset',
              'caret-color': 'transparent',
              'margin-right': '15px'
            }
          }),
          data: UWA.createElement('input', {
            'id': options.name + "-" + iconName,
            'type': 'hidden'
          }),
          file:  UWA.createElement('input', {
            'id': options.name + "-file-"  + iconName,
            'type': 'file',
            'accept': 'image/*',
            'hidden': 'true'
          }),
          setData: function(value) {
            var next = value.replace(/^data:image\/png;base64,/, '');
            var prev = this.getData();
            if(next!=prev) {
              options.onIconChange(this.name, this.data.value = next)
            }
            this.display(next);
            return next;
          },
          getData: function() {
            return this.data.value;
          },
          display: function(value) {
            this.label.setStyle("background-color", "#f9f9f9");
            if(value) {
              this.label.setStyle('display', '');
              this.label.setStyle('color', 'transparent');
              this.label.setStyle("background-image", "url(data:image/png;base64," + value + ")");
            } else {
              this.label.setStyle('color', '#78befa');
              this.label.setStyle("background-image", "none");
            }
          },
          init: function() {
            var self = this;
            this.label.inject(divIconGroup);
            this.file.inject(divIconGroup);
            this.data.inject(divIconGroup);
            this.label.onmouseleave = function(){
              self.display(self.getData()); // Restore icon
            };
            this.label.onmouseenter = function(){
              self.display(null); // Hide icon
              self.label.setStyle("background-color", "#3d3d3de6");
            };
            this.file.onchange = function() {
              if (!this.files[0]) { // Cancel button
                return
              }
              let type = this.files[0].type;
              let reader = new FileReader();
              reader.onload = function(e) {
                resizeBase64Img(e.target.result, iconHtml.width, iconHtml.height).then((tt)=>{
                  self.apply(tt, type)
                });
              };
              reader.readAsDataURL(this.files[0]);
            }
          },
          apply: function(tt, type) {
            // Check the file size after compression
            if (tt.data.length > 2000 * 256 / 64) {
              buildAlertBox(myNls.get("IconSizeErr"), pSkeleton.container);
              return;
            }
            // Check the file extension
            if(!type.contains('/png')) {
              buildAlertBox(myNls.get("IconFormatErr"), pSkeleton.container);
            }
            // Check the icon size
            if(tt.oldWidth!=this.width || tt.oldHeight!=this.height) { 
              buildAlertBox(myNls.get("IconDimError").replace("%width%",this.width).replace("%height%",this.height), pSkeleton.container);
            }
            this.setData(tt.data);
            for(let iconDep of (this.depends || [])) {
              if(!icons[iconDep].getData()) {
                resizeBase64Img(e.target.result, icons[iconDep].width, icons[iconDep].height).then((tt) => {
                  icons[iconDep].setData(tt.data);
                });
              }
            }
          }
        });
        iconHtml.init();
      }
      
      // Initialize values
      for(let iconHtml of Object.values(icons)) {
          var value = iconHtml.setData(iconHtml.value || (values || {})[iconHtml.name] || '');
          for(let iconDep of (iconHtml.depends || [])) {
            icons[iconDep].label.setStyle("display", value ? "" : "none");
          }
      }
      return divIconGroup;
    }
    
    return getIconField;
  });

define('DS/DMSApp/Utils/Renderers/ToolsRenderer',
[
],
function() {
	"use strict"
	var rootMenu = {
		collection: 'DS/DMSApp/Collections/ToolsCollection',
		view: 'DS/DMSApp/Views/ToolsLayoutView',
		// General View options
		viewOptions: {
			useInfiniteScroll: false,
			usePullToRefresh: false,
			contents: {
				events: {
				}
			}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				description: 'subtitle'
			},

			events: {
			}
		}
	};
	return rootMenu;
});

define('DS/DMSApp/Utils/TypeFormUtils',
[
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS'
], function (myNls) {
    "use strict";
    
    var utils = {
        //
        init: function () {
        },
        
        getInstListForEditAutoComplete : function(dicoHandler,aType) {
            var toRet = [];
            var instanceList = dicoHandler.getInstancesOfType(aType);
            var currentInstances = (aType['CreateInstName']||"").split(';'); 
            instanceList.forEach(function(item) {
                if(currentInstances.length===1 && currentInstances[0]===""){
                    if(item['firstParent']===true) {
                        toRet.push({
                        'value': item['Name'],
                        'label': dicoHandler.getDisplayName(item.Name)+" ("+myNls.get('Inherited')+")",
                        'subLabel': dicoHandler.getDisplayName(item.Name),
                        'selected': true
                        });
                    }
                    else {
                        toRet.push({
                            'value': item['Name'],
                            'label': dicoHandler.getDisplayName(item.Name),
                            'subLabel': dicoHandler.getDisplayName(item.Name),
                            'element': item
                        });
                    }
                }
                else {
                    for(var i=0; i < currentInstances.length; i++) {
                        if(currentInstances[i]===item['Name']) {
                            toRet.push({
                                'value': item['Name'],
                                'label': dicoHandler.getDisplayName(item.Name),
                                'subLabel': dicoHandler.getDisplayName(item.Name),
                                'element': item,
                                'selected': true
                            });
                        }
                        else {
                            toRet.push({
                                'value': item['Name'],
                                'label': dicoHandler.getDisplayName(item.Name),
                                'subLabel': dicoHandler.getDisplayName(item.Name),
                                'element': item
                            });
                        }
                    }
                }

            });
            return toRet;
        },
        getInstListForAutoComplete : function(dicoHandler, aType){
            var toRet = [];
            var instanceList = dicoHandler.getInstancesOfType(aType);
            instanceList.forEach(function(item) {
                if(item['firstParent']===true) {
                    toRet.push({
                    'value': item['Name'],
                    'label': dicoHandler.getDisplayName(item.Name)+" ("+myNls.get('Inherited')+")",
                    'subLabel': dicoHandler.getDisplayName(item.Name),
                    'selected': true
                    });
                }
                else 
                {
                    toRet.push({
                    'value': item['Name'],
                    'label': dicoHandler.getDisplayName(item.Name),
                    'subLabel': dicoHandler.getDisplayName(item.Name),
                    'element': item
                    });
                }
            });
            return toRet;
        }
        
    };
    
    return utils;
});

define('DS/DMSApp/Views/Layouts/attributesLayout',
	[
	  	'UWA/Core',
	  	'UWA/Class/View',
        'DS/UIKIT/Modal'/*,
        'DS/Windows/ImmersiveFrame',
        'DS/Windows/Panel'*/

	], function (UWA, View, Modal/*, ImmersiveFrame, Panel*/) {

		'use strict';
        /*
        This class generates all the views in the process View. In other words, it's the "leader" view.
        */
        return View.extend({
            tagName: 'div',
            className: 'AttributesView',

            init: function(/*frame*/options){
            	UWA.log("attributesLayout::init");
            	/*this.immersiveFrame = frame;*/

                //An ImmersiveFrame object is Mandatory to use Panels. We add these to the immersive Frame.
                //this.immersiveFrame = new ImmersiveFrame();

                this.modal = null;
                this.editor = null;
                this.persistJSONObject = null;
                this.content = null;
                options = UWA.clone(options || {}, false);
                this._parent(options);


            },

            setup : function(options){
                UWA.log("attributesLayout::setup");
                var that = this;
                UWA.log(that);
                //this.listenTo(this.model, {onChange: that.buildAttributesTableContent});
                //that.listenTo(that.collection, "onChange", that.render);
                //that.listenTo(that.model, "onSync", that.render);
                this.listenTo(this.collection, {
                	onSync: that.updateAttributeTableContent
                });
                /*this.listenTo(this.model.actions, {
                	onChange: that.updateAttributeTableContent("test1")});*/
                this.listenTo(this.model, {
                	onChange: that.updateAttributeTableContent
                });

                //this.content = /*UWA.createElement('div', { //*/new UWA.Element("div");
                //this.buildAttributesTableContent(model);


                /*this.modal = new Modal({
                    className: 'site-reset',
                    closable: true
                }).inject(widget.body);
                this.modal.hide();*/

                /*UWA.log(this.container);
                this.container.setContent(this.content);
                this.editor = new Modal({
                    className: 'site-reset',
                    closable: true
                }).inject(widget.body);
                this.editor.hide();*/

                //Instantiation of the left Panel, which contains a Form that will retrieve a JSON File containing the type and the action requested.
               /* this.leftPanel = new Panel({
                    closeButtonFlag: false,
                    width: 200,
                    //height: widget.getViewportDimensions().height - this.immersiveFrame.height,
                    resizableFlag: false,
                    titleBarVisibleFlag: false,
                    movableFlag: false,
                    currentDockArea: WUXDockAreaEnum.LeftDockArea,
                    verticallyStretchableFlag: true,
                    position: {
                        my: 'top left',
                        at: 'bottom left',
                        of: this.immersiveFrame
                    }
                });

                //Instantion of the Center Panel, which contains the eGraph.
                this.centerPanel = new Panel({
                    closeButtonFlag: false,
                    maximizedFlag: true,
                    titleBarVisibleFlag: false,
                    resizableFlag: true,
                    movableFlag: false,
                    position: {
                        my: 'bottom',
                        at: 'bottom',
                        of: this.immersiveFrame
                    }
                });

                //Instantiation of the top Panel, which contains the caption for the graph
                this.topPanel = new Panel({
                    closeButtonFlag: false,
                    height: 100,
                    //height: widget.getViewportDimensions().height - this.immersiveFrame.height,
                    resizableFlag: false,
                    titleBarVisibleFlag: false,
                    movableFlag: false,
                    currentDockArea: WUXDockAreaEnum.TopDockArea,
                    verticallyStretchableFlag: true,
                    horizontallyStretchableFlag: true,
                    position: {
                        my: 'top',
                        at: 'top',
                        of: this.immersiveFrame
                    }
                });*/



            },

            /*
            Render is the core method of a view, in order to populate its root container element, with the appropriate HTML.
            The convention is for render to always return this.
            */
            render : function(){
                UWA.log("attributesLayout::render");
                UWA.log(this);
                //We set the Left Panel Content thanks to the getContentPanel() method, from the ProcessLeftPanelView class.
                //this.leftPanel.content = ProcessLeftPanelView.getContentPanel(this);

                //this.topPanel.content = ProcessTopPanelView.getContentPanel()

                //It is mandatory to add the panel to the immersive Frame that will act as a container.
                //this.immersiveFrame.addWindow(this.leftPanel);

                //this.immersiveFrame.addWindow(this.topPanel);

                //Then, we have to inject the immersive Frame to the content of this View.
               //this.immersiveFrame.inject(this.content);

                //Finally, we have to set the content of the View with the property content, containing the Immersive Frame.
                this.content = UWA.createElement('div', {
                    'id': 'table-div'
                });
                this.buildAttributesTableContent();
                this.container.setContent(this.content);

                //Render always return this, this allows to chain view methods.
                return this;
            },

            buildAttributesTableContent : function(data) {
            	UWA.log("buildTable");
            	UWA.log(data);
                var dplWdthArr = [40, 10, 25, 25, 190],
                table,tbody,thead,firstLine;

            	table = UWA.createElement('table', {
                    'class': 'table table-hover',//'tableImportExport',
                    'id': 'attrTable'
                }).inject(this.content);

                thead =  UWA.createElement('thead', {
                    'class': 'attrthead',
                    'id': 'attrthead'
                }).inject(table);

                tbody =  UWA.createElement('tbody', {
                    'class': 'attrtbody',
                    'id': 'attrtbody'
                }).inject(table);

                firstLine = UWA.createElement('tr').inject(thead);

                UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left',
	                    'text' : 'Name'
               		}).inject(firstLine);
                UWA.createElement('p', {
                    text : "Type",
                    'class': ''
                }).inject(
                    UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left'
               		}).inject(firstLine)
               	);
                UWA.createElement('p', {
                    text : "Multi-Value",
                    'class': ''
                }).inject(
                    UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left'
               		}).inject(firstLine)
               	);
                UWA.createElement('p', {
                    text : "DefaultValue",
                    'class': ''
                }).inject(
                    UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left'
               		}).inject(firstLine)
               	);
                UWA.createElement('p', {
                    text : "Depreciated",
                    'class': ''
                }).inject(
                    UWA.createElement('th', {
	                    'colspan': '1',
	                    'width': '20%',
	                    'align': 'left'
               		}).inject(firstLine)
               	);
               	this.tbody = tbody;
            },

            updateAttributeTableContent : function() {
            	UWA.log("updateTable");
            	UWA.log(this);
							var attributes = this.collection._models;
            	var length = attributes.length;

	            for (var i = 0; i < length; i++) {
	            	var attr = attributes[i];
	                var row = UWA.createElement('tr').inject(this.tbody);
	                /*var p = UWA.createElement('p', {
	                    //title: ext['name'],
	                    text: "test"
	                });*/
	                UWA.createElement('p', {text : attr._attributes['id']}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                UWA.createElement('p', {text : attr._attributes['subtitle']}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                UWA.createElement('p', {text : attr._attributes['multivaluated']}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                UWA.createElement('p', {text : attr._attributes['defaultValue']}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                UWA.createElement('p', {text : ''}).inject(UWA.createElement('td', {'colspan':'1','align':'left','width':'20%'}).inject(row));
	                /*var span = UWA.createElement("span",{styles:{"cursor": "pointer;"},id:ext['name']});
	                span.className = 'fonticon fonticon-2x fonticon-exchange-delete';
	                span.inject(UWA.createElement('td', {'align':'center','width':'20%'}).inject(row));
	                span.onclick = function(currElmt){
	                    var currSpan = currElmt.target;
	                    that.changeClass(currSpan,that.extensionsToDelete)
	                };*/
            	}
            },

            /*
            displayCenterPanel function is called from the getContentPanel() method of the ProcessLeftPanelView class.
            It receives as Parameters, the type and action chosen from the left panel, and the JSONObject containing all the necessary informations.
            */
            displayCenterPanel : function(type, action, persistJSONObject){
                UWA.log("ProcessView::displayCenterPanel");

                //Global value
                this.persistJSONObject = persistJSONObject;

                //We set the Left Panel Content thanks to the getContentPanel() method, from the ProcessEGraphView class.
                //this.centerPanel.content = ProcessEGraphView.getContentPanel();

                //We add the Center Panel to the Immersive Frame to display it, only when the form from the left Panel is submitted.
                //this.immersiveFrame.addWindow(this.centerPanel);

                //This method is used for the display of the arrows from eGraph
                //ProcessEGraphView.addEdgeArrowDesign();

                //Calls the method getGraph from ProcessEGraphView class
                //ProcessEGraphView.getGraph(this, type, action, this.persistJSONObject);
            },


            /*
            displayCreatePanel function is called from the buildNodeElement() method of the myNodeView class. In other words, it is called
            when we click on the create button of an opening node.
            It receives as Parameters, the type and action chosen from the left panel, and the step of the node
            */
            displayCreatePanel : function(type, opening, action, step){
                UWA.log("ProcessView::displayCreatePanel");

                this.modal.setHeader('<h4>Add a New Business Rule</h4>');

                this.modal.setBody(CreateFormView.getContentPanel(this, type, opening, action, step, this.persistJSONObject));

                this.modal.show();
            },

            /*
            displayEditPanel function is called from the buildNodeElement() method of the myNodeView class. In other words, it is called
            when we click on the edit button of a BR node.
            It receives as Parameters, the type and action chosen from the left panel, and the metadata associated with each node : name,
            description, factType, policy, precedence, step, number etc.
            */
            displayEditPanel : function(type, action, name, description, factType, policy, precedence, step, number){
                UWA.log("ProcessView::displayEditPanel");

                this.modal.setHeader('<h4>Edit Business Rule</h4>');

                this.modal.setBody(EditFormView.getContentPanel(this, type, action, name, description, factType, policy, precedence, step, number, this.persistJSONObject, false, false));

                this.modal.show();
            },

            /*
            displayTextEditorPanel function is called from the getContentPanel() method of the CreateFormView class. In other words, it is called
            when we click on the pencil button in the creation Form.
            It receives as Parameters, the body code written by the user.
            */
            displayTextEditorPanel : function(code){
                UWA.log("ProcessView::displayTextEditorPanel");

                this.editor.setHeader('<h4>Dassault Text Editor</h4>');

                this.editor.setBody(TextEditorView.getContentPanel(code));

                this.editor.show();
            },

            /*
            Refresh function is called whenever the user do an action in the processEGraph View : creation, deletion, edition.
            This function re-display the eGraph with the according changes.
            It receives as Parameters, the type and action chosen from the left panel and the JSON containing the informations.
            */
            refresh : function(type, action, getJSON){
                UWA.log("attributesLayout::refresh");
                this.persistJSONObject = getJSON;

                this.modal.hide();
                this.editor.hide();

                //We need to display again the center panel for refreshing
                this.displayCenterPanel(type, action, this.persistJSONObject);

            },

            destroy : function() {
            	UWA.log("attributesLayout::destroy");

            	this.stopListening();

                this._parent();
            }




        });

});

define('DS/DMSApp/Utils/Menu',
  [],
  function() {
    "use strict";
    var tt = [{
        "name": "Types",
        "subtitle": "Create your own types",
        "image": "TypeIcon.png",
        "id": "1"
      },
      {
        "name": "Group of Attributes",
        "subtitle": "Enrich your data model",
        "image": "GroupAttrIcon.png",
        "id": "2"
      },
      {
        "name": "Extensions",
        "subtitle": "Create your own extensions",
        "image": "ExtIcon.png",
        "id": "3"
      },
      {
        "name": "Attributes",
        "subtitle": "Allow to define new attributes",
        "image": "AttrIcon.png",
        "id": "4"
      },
      {
        "name": "Unique Keys",
        "subtitle": "Allow to define new unique keys",
        "image": "AttrIcon.png",
        "id": "5"
      },
      {
        "name": "Tools",
        "subtitle": "Import/Export, Indexation ...",
        "image": "AttrIcon.png",
        "id": "6"
      }
    ];
    return tt;
  });

define('DS/DMSApp/Utils/URLHandler',
    [
    ], function () {
        "use strict";

        var iHandler = {
            //
            init: function (url, tenant, uri, SC) {
                this.url = url;
                this.tenant = tenant;
                this.serverUri = uri;
                this.SC = SC;
            },

            setURL : function(url) {
                this.url = url;
            },

            getURL : function() {
                return this.url;
            },

            setTenant : function (itenant) {
                this.tenant = itenant;
            },

            getTenant : function() {
                return this.tenant;
            },

            setServerUri : function(iUri) {
                this.serverUri = iUri
            },

            getServerUri : function() {
                return this.serverUri;
            },

            setSecurityContext : function(iSC) {
                this.SC = iSC;
            },

            getSecurityContext : function() {
                return this.SC;
            }

        };

        return iHandler;
    });

define('DS/DMSApp/Utils/UuidHandler',
  [],
  function() {

    'use strict';

    function UuidHandler(aUuid) {
      if (!(this instanceof UuidHandler)) {
        throw new TypeError("UuidHandler constructor cannont be called as a function.");
      }
      this._uuid = aUuid;
    }
    UuidHandler.separator = "-",
      UuidHandler.create_UUID = function() {
        var separator = UuidHandler.separator;
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx' + separator + 'xxxx' + separator + '4xxx' + separator + 'yxxx' + separator + 'xxxxxxxxxxxx';
        uuid = uuid.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        var result = new UuidHandler(uuid);
        return result;
      };
    UuidHandler.prototype = {
      constructor: UuidHandler,

      getUuid: function() {
        return this._uuid;
      },
      setUuid: function(aUuid) {
        this._uuid = aUuid;
      },
      getSeparator: function() {
        UuidHandler.separator;
      },
      getUuidWithoutSeparator: function() {
        var tmpUuid = this._uuid;
        var myRegExp = new RegExp(UuidHandler.separator, 'g');
        return tmpUuid.replace(myRegExp, '');
      }

    };
    return UuidHandler;
  });

/*global define*/
define('DS/DMSApp/Models/ToolsModel',
    [
        'UWA/Core',
        'UWA/Class/Model'
    ], function (UWA, Model) {
        "use strict";
        return Model.extend({
            defaults: function () {
                return {

                };
            }
        });
    });

define('DS/DMSApp/Utils/Renderers/AttrDisplayRenderer',
  [], function() {
    "use strict";

    var extOfType = {
      collection:  'DS/DMSApp/Collections/DMSMenuCollection',
      view: 'DS/DMSApp/Views/AttrDisplayView',
      /*viewOptions: {
        contents: {
          useInfiniteScroll: false,
          usePullToRefresh: false
        },
        actions: {
          collection: function() {
            var acts = new ActionsCollection([{
                text: "subTypeForm",
                icon: 'fonticon fonticon-search',
                overflow: false
              }, {
                text: "subTypeForm",
                icon: 'fonticon fonticon-select-on',
                overflow: false
              },
              {
                id: 'createAttr',
                title: "Attributeform",
                icon: 'plus',
                overflow: false
              }
            ]);
            return acts;
          }
        }
      },*/
      idCardOptions: {
        actions: function() {
          return [{
            text: "subTypeForm",
            icon: 'plus',
            handler: function(view) {
              UWA.log("Add your Type");
              typeForm.launchPanel({
                theModel: this.collection,
                container: this.container
              })
            }
          }, {
            text: "subTypeForm",
            icon: 'fonticon fonticon-trash ',
            handler: function(view) {
              UWA.log("Add your Type");
              typeForm.launchPanel({
                theModel: this.collection,
                container: this.container
              })
            }
          }];
        }

      },
    };

    return extOfType;
  });

define('DS/DMSApp/Models/AttributeModel',

  ['UWA/Core',
    'UWA/Class/Model',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
  ],
  function(UWA, Model, myNls) {
    "use strict";

    return UWA.extend(Model.extend({
      defaults: function() {

        return {
          //Metadata associated with the model returned
          //Every model must specify an ID
          id: '',
          //Properties for the tile object
          title: '',
          subtitle: '',
          content: '',
          //Properties for the data Model
          multivaluated: '',
          defaultValue: '',
          type: '',
          isInherited: '',
          isOOTBAttr: ''
        };
      },

      parse: function(response, options) {
        var resultat;
        response['isInherited']=this._computeIsInherited(response['isInherited']);
        var internalName = response['Name'];
        var nls_key = "";
        if (response['Local'] == "Yes") {
          nls_key = response['Nature'] + "." + response['Owner'];
        } else {
          nls_key = response['Nature'];
        }
        	//BMN2 ODT Jasmine 31-03-2022 : var externalName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(internalName, nls_key) : dicoHandler.getDisplayName(internalName);
				var externalName = response["ExternalName"];
        var internalParentName = response['Owner'];
        if (internalParentName == "" && response['Local'] == "No" && response.generatedOwner) {
          internalParentName = response.generatedOwner;
        }
        var nls_Key_Owner = ""
        if (response.hasOwnProperty("ownerNature")) {
          nls_Key_Owner = response.ownerNature;
        }
        //BMN2 ODT Jasmine 31-03-2022 : var externalParentName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(internalParentName, nls_Key_Owner) : dicoHandler.getDisplayName(internalParentName);
				var externalParentName = response["ExternalParentName"];
        var attrNatureNLS = this.getNLSForAttrType(response['Type']);
        var multivalueNLS = response['MultiValuated'] === "Yes" ? myNls.get("labelYes") : myNls.get("labelNo");
        resultat = {

          //Metadata associated with the model returned
          //Every model must specify an ID
          id: internalName,
          //Properties for the tile object
          title: externalName,
          subtitle: attrNatureNLS,
          //Properties for the data Model
          type: response['Type'],
          owner: externalParentName,
          ownerId: internalParentName,
          ownerNature: response.ownerNature,
          isOOTBAttr: response['isOOTBAttr'],
          isInherited: response['isInherited'],
          isLocal: response['Local'],
          maxLength: response['MaxLength'],
          resetOnClone: response['ResetOnClone'],
          resetOnRevision: response['ResetOnRevision'],
          resetOnFork: response['ResetOnFork'],
          multivaluated: response['MultiValuated'],
          multiValueNLS: multivalueNLS,
          multiLine: response['MultiLine'],
          protection: response['Protection'],
          hasRangeDefinde: response['HasRangeDefined'],
          range: response['AuthorizedValues'],
          hasMagnitude: response['HasMagnitude'],
          rangeNls: response['AuthorizedValuesNLS'],
          dimension: response['Dimension'],
          manipulationUnit: response['ManipulationUnit'],
          defaultValue: response['Default'],
          userAccess: response['UIAccess'],
          predicate: response['SixWPredicate'],
          searchable: response['Indexation'],
          exportable: response['V6Exportable'],
          nlsList: response["NameNLS"],
          DMSStatus: response['DMSStatus'],
          hasDefault: response['HasDefault']
        };
        // BMN2 01-04-2022  : Done on AttrOfTypeCollection
        // if(resultat.nlsList==undefined && resultat.isOOTBAttr != undefined && resultat.isOOTBAttr=="No"){
        //   resultat.nlsList = dicoHandler.getListNameNLSFromDico(internalName,nls_key);
        // }
        // BMN2 11/12/2020 : IR-811449-3DEXPERIENCER2021x
        // TODO: We have to implement also for other type of attribute like
        // Boolean and String (may be Attribute with dimension)
        
        // BMN2 ODT Jasmine 31-03-2022 :
        if (response.Type === "Date" && response.Default != "") {
          var date = new Date(response.Default * 1000);
          var displayValue = date.toLocaleDateString(options.lang + "-" + options.locale, {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
          });
          resultat["defaultValueNLS"] = displayValue;
        } else {
          resultat["defaultValueNLS"] = response.Default;
        }
        return resultat;
      },
      // Quelle est l'utilité de cette méthode ?????
      sync: function(method, model, options) {
        UWA.log(this);
        var id, attrs, idAttrName, resp, errorMessage;
        if (method === 'create' || method === 'update' || method === 'patch') {
          attrs = model.toJSON(options);
        }
        id = model.id;
        idAttrName = model.idAttribute;
      },
      _computeIsInherited: function (aVal) {
        let toRet = "No";
        if (typeof aVal == "undefined") {
          toRet = "No";
        } else {
          toRet = aVal;
        }
        return toRet;
      },

      getFullName: function() {
        if (this.isLocal()) {
          return this.get("ownerId") + "." + this.get("id");
        }
        return this.get("id");
      },
      isDate: function(){
        return this.getType() === "Date" ? true : false;
      },
      isString: function() {
        return this.getType() === "String" ? true : false;
      },
      isInt: function() {
        return this.getType() === "Integer" ? true : false;
      },
      isDouble: function () {
        return this.getType() === "Double" ? true : false;
      },
      isBoolean: function () {
        return this.getType() === "Boolean" ? true : false;
      },
      getType: function() {
        return this.get("type");
      },
      isOOTB: function() {
        return this.get("isOOTBAttr") === "Yes" ? true : false;
      },
      isInherited: function() {
        return this.get("isInherited") === "Yes" ? true : false;
      },
      isLocal: function() {
        return this.get("isLocal") === "Yes" ? true : false;
      },

      /**
       * isMultiValuated - description
       *
       * @return {type}  description
       */
      isMultiValuated: function() {
        return this.get('multivaluated') === "Yes" ? true : false;
      },

      /**
       * isMultiLine - description
       *
       * @return {type}  description
       */
      isMultiLine: function() {
        return this.get('multiLine') === "Yes" ? true : false;
      },
      isSearchable: function() {
        return this.get('searchable') === "Yes" ? true : false;
      },
      isExportable: function() {
        return this.get('exportable') === "Yes" ? true : false;
      },
      isResetOnClone: function() {
        return this.get('resetOnClone') === "Yes" ? true : false;
      },
      isResetOnRevision: function() {
        return this.get('resetOnRevision') === "Yes" ? true : false;
      },
      /* S63 02/08/2022
      * FUN114519
      * Adding has default get function
      */
      hasDefault: function() {
          var bHasDef;
          if(this.get('hasDefault') === undefined)
            bHasDef = true;
          else
            bHasDef = this.get('hasDefault') === "Yes";
        return bHasDef;
      },
      getDefaultValue: function() {
        return this.get("defaultValue");
      },
      getMaxLength: function() {
        return this.get("maxLength");
      },
      getRange: function() {
        return this.get("range");
      },
      getUserAccess: function() {
        return this.get("userAccess");
      },
      getNlsEnglish: function() {
        var list = this.get("nlsList");
        return list && list.en ? list.en : "";
      },
      getNlsFrench: function() {
        var list = this.get("nlsList");
        return list && list.fr ? list.fr : "";
      },
      getNlsDutch: function() {
        var list = this.get("nlsList");
        return list && list.de ? list.de : "";
      },
      getNlsJapanesse: function() {
        var list = this.get("nlsList");
        return list && list.ja ? list.ja : "";
      },
      getNlsKorean: function() {
        var list = this.get("nlsList");
        return list && list.ko ? list.ko : "";
      },
      getNlsRussian: function() {
        var list = this.get("nlsList");
        return list && list.ru ? list.ru : "";
      },
      getNlsChinesse: function() {
        var list = this.get("nlsList");
        return list && list.zh ? list.zh : "";
      },
      getDMSStatus: function() {
        return this.get("DMSStatus");
      },
      getNLSForAttrType: function(aType) {
        var toRet = "";
        switch (aType) {
          case "String":
            toRet = myNls.get("AttrTypeString");
            break;
          case "Integer":
            toRet = myNls.get("AttrTypeInt");
            break;
          case "Double":
            toRet = myNls.get("AttrTypeReal");
            break;
          case "Date":
            toRet = myNls.get("AttrTypeDate");
            break;
          case "Boolean":
            toRet = myNls.get("AttrTypeBool");
            break;
          default:
        }
        return toRet;
      }
    }),
    { // methode de classe
      /**
       * 
       * @param {String} attrType 
       * @param {String} oldrange 
       * @param {String} newrange 
       * @param {Array} errors 
       * @returns {Array} range
       */
      checkRange: function(attrType, oldrange, newrange, errors) { // on pourrait retourner l'id NLS au lieu du mesage?
        var words = (newrange ? newrange.split(";") : [])
            .map(item => item.trim())
            .filter(item => item.length>0);
        
        var missingValues = oldrange ? oldrange.split(";").filter(item => !words.includes(item)) : [];
        if(missingValues.length) {
          errors.push({
            fixed: true,
            nls: 'attrRangeMissingValue',
            values: missingValues
          });
          words = words.concat(missingValues);
        }
        
        var singleValues = words.filter((item, index) => words.indexOf(item) == index);
        var duplicateValues = words.filter((item, index) => words.indexOf(item) != index)
        
        if (duplicateValues.length > 0) {
          errors.push({
            fixed: true,
            nls: 'attrRangeErrDupValue',
            values: duplicateValues.filter((item, index) => duplicateValues.indexOf(item) == index)
          })
          words = singleValues;
        }
        
        if(attrType == "Integer") {
          var invalidValues = words.filter( item=>!/^[-+]?[0-9]+$/.test(item) );
          if(invalidValues.length) {
            errors.push({
              fixed: false,
              nls: 'attrRangeErrNumeric',
              values: invalidValues
            });
          }
        }
        if(attrType == "String") {
          var invalidValues = words.filter( item=>!/^[a-zA-Z0-9]+$/.test(item) );
          if(invalidValues.length) {
            errors.push({
              fixed: false,
              nls: 'attrRangeErrAlphanumeric',
              values: invalidValues
            });
          }
        }
        
        words = words.map(string => string.trim());
        words = words.filter(item => item.length>0);
        if (attrType == "String") {
          words = words.sort();
        }
        if (attrType == "Integer") {
          words = words.sort((x,y)=>parseInt('0' + x)-parseInt('0' + y))
        }
        return words;
      }
    });
  });

define('DS/DMSApp/Views/Layouts/CustomField',
  [
    'DS/UIKIT/Input/Text',
    'DS/UIKIT/Input/Date',
    'DS/UIKIT/Input/Number',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Input/Toggle',
    'DS/UIKIT/Autocomplete',
  ],
  function(Text, DateInput, Number, Select, Toggle, Autocomplete) {
    "use strict";

    //url is the only attribute of this class.
    function CustomField(iName, iType, iHeader, iValue, iDisplayeValue, iCanBeEnable, opts) {
      if (!(this instanceof CustomField)) {
        throw new TypeError("CustomField constructor cannot be called as a function.");
      }
      this.name = iName;
      this.header = iHeader;
      this.value = iValue;
      this.displayValue = iDisplayeValue;
      this.type = iType;
      this.fieldDiv;
      this.fieldInput;
      this.canBeEnable = iCanBeEnable;
      this.checkBeforeEnable;
      this.disableField = null;
      this.enableField = null;
      this.placeHolderValue = opts ? opts.placeholder : "";
    }
    CustomField.prototype = {
      constructor: CustomField,
      buildInput: function(type) {
        switch (type) {
          case "input":

            break;
          default:

        }
      },
      buildField: function() {
        if (this.type == "input") {
          var divCol = UWA.createElement('div', {
            'class': 'col-lg-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            text: this.header
          }).inject(divInputGroup);
          spanName.setStyle("font-weight", "bold");
          /*var inputName = UWA.createElement('input', {
            type: 'text',
            class: 'form-control',
            value: this.value,
          }).inject(divInputGroup);*/
          //inputName.disabled = true;
          var inputName = new Text({
            className: 'form-control',
            value: this.displayValue,
          }).inject(divInputGroup);
          divInputGroup.inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = inputName;
          this.disableField = inputName;
          this.enableField = inputName;
        } else if (this.type == "date") {
          var divCol = UWA.createElement('div', {
            'class': 'col-lg-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            text: this.header
          }).inject(divInputGroup);
          // BMN2 29/01/2021 : IR-816263-3DEXPERIENCER2021x
          let displayValue = "";
          let date = "";
          if (this.displayValue.length > 0) {
            date = new Date(this.displayValue * 1000);
            displayValue = date.toLocaleDateString(widget.lang + "-" + widget.locale, {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric"
            });
          }
          /*var displayValueEn = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
          })*/
          //  var displayValue = date.toISOString().split('T')[0];
          spanName.setStyle("font-weight", "bold");
          var inputText = new Text({
            className: 'form-control',
            value: displayValue,
          }).inject(divInputGroup);
          inputText.hide();
          var inputDate = new DateInput({
            value: displayValue,
            placeholder: 'Select a date...'
          }).inject(divInputGroup);
          inputDate.setDate(date);
          //inputName.disabled = true;
          divInputGroup.inject(divCol);
          var deleteBtn = UWA.createElement('span', {
            'class': 'input-group-addon fonticon fonticon-clear'
          }).inject(divInputGroup);
          deleteBtn.hide();
          this.fieldDiv = divCol;
          this.fieldInput = inputDate;
          this.disableField = inputText;
          this.enableField = inputDate;

        } else if (this.type == "integer") {
          var divCol = UWA.createElement('div', {
            'class': 'col-lg-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            text: this.header
          }).inject(divInputGroup);
          spanName.setStyle("font-weight", "bold");
          var inputText = new Text({
            className: 'form-control',
            value: this.displayValue,
          }).inject(divInputGroup);
          inputText.hide();
          var input = new Number({
            placeholder: 'Pick a number...',
            min: -2147483647,
            max: 2147483647,
            step: 1,
            value: this.value
          }).inject(divInputGroup);
          /*var input = UWA.createElement('input', {
            type: 'number',
            class: 'form-control',
            value: this.value,
            min: -2147483647,
            max: 2147483647,
            step: 1,

          }).inject(divInputGroup);*/

          divInputGroup.inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = input;
          this.disableField = inputText;
          this.enableField = input;

        } else if (this.type == "switch") {
          var divCol = UWA.createElement('div', {
            'class': 'col-lg-6'
          });
          divCol.setStyle("padding", "10px");
          /*var inputName = new Text({
            className: 'form-control',
            value: this.value,
          }).inject(col4);
          inputText.hide();*/
          var toogle = new Toggle({
            type: 'switch',
            value: 'option1',
            label: this.header,
            checked: this.value == true
          }).inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = toogle;
          this.disableField = toogle;
          this.enableField = toogle;
        } else if (this.type == "select") {
          var divCol = UWA.createElement('div', {
            'class': 'col-lg-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            text: this.header
          }).inject(divInputGroup);
          spanName.setStyle("font-weight", "bold");
          var valueInputText = ""
          if (Array.isArray(this.value)) {
            var tmpArr = this.value.filter(item => item.selected == true);
            if (tmpArr.length > 0) {
              valueInputText = tmpArr[0].label
            }
          }


          var inputText = new Text({
            className: 'form-control',
            value: valueInputText,
          }).inject(divInputGroup);
          inputText.hide();
          var input = new Select({
            //id: "defaultValue",
            placeholder: this.placeHolderValue,
            custom: false,
            options: this.value
          }).inject(divInputGroup);

          divInputGroup.inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = input;
          this.disableField = inputText;
          this.enableField = input;
        } else if (this.type == "autocomplete") {
          var divCol = UWA.createElement('div', {
            'class': 'col-lg-6'
          });
          divCol.setStyle("padding", "10px");
          var divInputGroup = UWA.createElement('div', {
            'class': 'input-group'
          });
          var spanName = UWA.createElement('span', {
            'class': 'input-group-addon fieldHeader',
            text: this.header
          }).inject(divInputGroup);
          spanName.setStyle("font-weight", "bold");
          var inputText = new Text({
            className: 'form-control',
            value: this.displayValue,
          }).inject(divInputGroup);
          inputText.hide();
          var inputName = new Autocomplete({
            showSuggestsOnFocus: true,
            multiSelect: false,
            allowFreeInput: false,
            minLengthBeforeSearch: 0,
            datasets: [],
            placeholder: "",
            events: {
              onHideSuggests: function() {}
            },
            style: {
              overflow: 'visible'
            }
          }).inject(divInputGroup);
          //inputName.disabled = true;
          divInputGroup.inject(divCol);
          this.fieldDiv = divCol;
          this.fieldInput = inputName;
          this.disableField = inputText;
          this.enableField = inputName;
        }
        return this;
      },

      enable: function() {
        //console.log(this.fieldInput);
        if (this.checkBeforeEnable != undefined && !this.checkBeforeEnable()) {
          return;
        }
        if (this.canBeEnable) {
          this.disableField.hide();
          this.enableField.show();

          if (this.fieldInput.disabled != undefined) {
            this.fieldInput.disabled = false;
          } else if (this.fieldInput.setDisabled() != undefined) {
            this.fieldInput.setDisabled(false);
          }
        }
        return this;
      },

      disable: function(showValue) {
        //console.log(this.fieldInput);
        if (showValue) {
          this.enableField.hide();
          this.disableField.show();
          this.disableField.setDisabled(true);
        }
        if (this.fieldInput.disabled != undefined) {
          this.fieldInput.disabled = true;
        } else if (this.fieldInput.setDisabled() != undefined) {
          this.fieldInput.setDisabled(true);
        }
        return this;
      },
      getValue: function() {
        var toRet = "";
        if (this.fieldInput.getValue() != undefined) {
          if (this.fieldInput instanceof Toggle) {
            toRet = this.fieldInput.isChecked();
          } else {
            toRet = this.fieldInput.getValue();
          }

        } else if (this.fieldInput.value != undefined) {
          toRet = this.fieldInput.value;
        }
        return toRet;
      },
      isChanged: function() {
        var value = this.value;
        if (Array.isArray(this.value)) {
          let selectedItem = this.value.filter(item => item.selected == true);
          if (selectedItem.length > 0) {
            value = selectedItem[0].value
          } else {
            value = "";
          }
        }
        var curVal = this.getValue();
        if (Array.isArray(curVal)) {
          curVal = curVal.toString();
        }
        if (value != curVal) {
          return true;
        }
        return false;
      }


    };



    return CustomField;
  });

/**
 * Icon input use the type form
 */

define('DS/DMSApp/Views/Layouts/Widgets',
[
  'UWA/Core',
  'UWA/Promise',
  'DS/UIKIT/Alert',
  'i18n!DS/DMSApp/assets/nls/DMSAppNLS'
],
function(UWA, Promise, Alert, myNls) {
  "use strict";
    
    
  function resizeBase64Img(base64, newWidth, newHeight) {
        return new Promise((resolve, reject) => {
          let canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          let context = canvas.getContext("2d");
          let img = document.createElement("img");
          img.src = base64;
          img.onerror = reject;
          img.onload = function() {
            var oldWidth = img.width;
            var oldHeight = img.height;
            context.scale(newWidth / oldWidth, newHeight / oldHeight);
            context.drawImage(img, 0, 0);
            resolve({
              data: canvas.toDataURL("image/png"), 
              oldWidth: oldWidth, 
              oldHeight: oldHeight
            });
          }
        });
  }

  return {
    
    createAlertBox: function buildAlertBox(errors) {
      if(UWA.is(errors, 'string')) {
        return buildAlertBox({
          "message": UWA.String.escapeHTML(errors),
          "fixed": false
        });
      } 
      if(UWA.is(errors, 'object')) {
        return buildAlertBox([errors])
      }
      if(UWA.is(errors, 'array')) {
        var alertMessages = errors.map(function (error) {
          let result = "";
          if(UWA.is(error, 'string')) {
            result = UWA.String.escapeHTML(error)
          }
          if(UWA.is(error, 'object')) {
            result = UWA.String.escapeHTML(error.message || myNls.get(error.nls) || undefined);
            for(let [key, val] of Object.entries(error)) {
              result = result.replace("%" + key + "%", UWA.String.escapeHTML(val));
            }
            if(error.values) {
              result = result + " <br/> " + error.values.map(v=>"&laquo; " + UWA.String.escapeHTML(v) + " &raquo;").join(" - ") 
            }
          }
          return result;
        });
        
        let alertBox = new Alert({
          visible: true,
          autoHide: true,
          hideDelay: 2000
        });
        alertBox.add({
          className: 'error',
          message: alertMessages.length==1 ? alertMessages[0] : ("<ol><li>" + alertMessages.join("</li><li>") + "</li></ol>")
        });
        return alertBox;
      }
      throw 'Unexpected parameter type';
    },
    
    createCustoAlert: function buildCustoAlert(opts) {
      let message = opts['message'],
      className = opts['type'],
      hideDelay = opts['delay'],
      autoHide = opts['auto'],
      closable = !opts['auto'];
      if(opts['type']===undefined) {
        className = "primary";
      }
      let alertBox = new Alert({
        visible: true,
        autoHide: autoHide,
        closable: closable,
        hideDelay: hideDelay,
        className:className,
        messages: UWA.String.escapeHTML(message)
      });
      return alertBox;
    },
    
    createIconField: function (options, values) {
      
      // Initialiaze controls
      var { onIconChange, onIconApplied, icons, maxsize, ...options } = UWA.merge(options,{
        onIconChange: function() {},
        onIconApplied: function() {},
      });
      var divIconGroup = UWA.createElement('div', options);
      
      for(let iconDef of icons) {
        let iconName = iconDef.name;
        let iconWidth = parseInt(iconDef.width);
        let iconHeight = parseInt(iconDef.height);
        let iconHtml = icons[iconName] = UWA.extend(iconDef, {
          name: iconName,
          width: iconWidth,
          height: iconHeight,
          depends: iconDef.depends || [],
          label:  UWA.createElement('label', {
            'class': 'fonticon fonticon-upload',
            'for': options.name + "-file-"  + iconName,
            'styles': {
              'cursor':'pointer',
              'min-width': (iconWidth * 2 + 8) + 'px',
              'min-height': (iconHeight * 2 + 8) + 'px',
              'line-height': (iconHeight * 2 + 8) + 'px',
              'background-size': (iconWidth * 2 ) + 'px ' + (iconHeight * 2 ) + 'px' ,
              'font-size': iconHeight + "px",
              'background-position':'4px 4px',
              'background-repeat':'no-repeat',
              'text-align': 'center',
              'vertical-align': 'top',
              'border-radius': '4px',
              'border': '1px solid #e2e4e3',
              'box-shadow': '0 0 0 3px white inset',
              'caret-color': 'transparent',
              'margin-right': '15px'
            }
          }),
          data: UWA.createElement('input', {
            'id': options.name + "-" + iconName,
            'type': 'hidden'
          }),
          file:  UWA.createElement('input', {
            'id': options.name + "-file-"  + iconName,
            'type': 'file',
            'accept': 'image/*',
            'hidden': 'true'
          }),
          set: function(value) {
            var next = value.replace(/^data:image\/png;base64,/, '');
            var prev = this.get();
            if(next!=prev) {
              onIconChange(this.name, this.data.value = next)
            }
            this.display(next);
            return next;
          },
          get: function() {
            return this.data.value;
          },
          display: function(value) {
            this.label.setStyle("background-color", "#f9f9f9");
            if(value) {
              this.label.setStyle('display', '');
              this.label.setStyle('color', 'transparent');
              this.label.setStyle("background-image", "url(data:image/png;base64," + value + ")");
            } else {
              this.label.setStyle('color', '#78befa');
              this.label.setStyle("background-image", "none");
            }
          },
          build: function() {
            var self = this;
            this.label.inject(divIconGroup);
            this.file.inject(divIconGroup);
            this.data.inject(divIconGroup);
            this.label.onmouseleave = function(){
              self.display(self.get()); // Restore icon
            };
            this.label.onmouseenter = function(){
              self.display(null); // Hide icon
              self.label.setStyle("background-color", "#3d3d3de6");
            };
            this.file.onchange = function() {
              if (!this.files[0]) { // Cancel button
                return
              }
              let type = this.files[0].type;
              let reader = new FileReader();
              reader.onerror = function(e) {
                onIconApplied(iconName, [{
                  fixed: false,
                  nls: 'IconFormatErr'
                }]);
              };
              reader.onload = function(e) {
                resizeBase64Img(e.target.result, iconHtml.width, iconHtml.height).then(
                  function(tt){
                    self.apply(UWA.extend(tt, {
                      type: type,
                      result: e.target.result
                    }));
                  },
                  function(fail) {
                    onIconApplied(iconName, [{
                      fixed: false,
                      nls: 'IconFormatErr'
                    }])
                  }
                );
              };
              reader.readAsDataURL(this.files[0]);
            }
          },
          apply: function(tt) {
            // Check the file size after compression
            let errors = [];
            const maxb64 = (maxsize || 2000) * 256 / 64;
            const isPng = tt.type.contains('/png');
            const content = tt.result.replace(/^data:image\/.*;base64,/, '');
            // Check the file extension
            if(!isPng) {
              errors.push({
                fixed: true,
                nls: 'IconTypeErr'
              });
            } else if(content.length < maxb64) {
              tt.data = content; // Keep provided icon
            } else if(tt.data.length < maxb64) {
              errors.push({ // Browser succeed to compress image
                fixed: true,
                nls: 'IconSizeErr'
              });
            } else {
              errors.push({
                fixed: false,
                nls: 'IconSizeErr'
              });
            }

            // Check the icon size
            if(tt.oldWidth!=this.width || tt.oldHeight!=this.height) { 
              errors.push({
                fixed: true,
                nls: 'IconDimError',
                width: this.width,
                height: this.height
              });
            }
            var promises = [];
            if(errors.every(error=>error.fixed)) {
              this.set(tt.data);
              for(let iconDep of this.depends) if(!icons[iconDep].get()) {
                promises.push(resizeBase64Img(tt.result, icons[iconDep].width, icons[iconDep].height).then((tt) => {
                  icons[iconDep].set(tt.data);
                }));
              }
            }
            return Promise.all(promises).then(function(){
              onIconApplied(iconName, errors);
            });
          }
        });
        iconHtml.build();
      }
      
      // Initialize values
      for(let iconHtml of Object.values(icons)) {
          var value = iconHtml.set(iconHtml.value || (values || {})[iconHtml.name] || '');
          for(let iconDep of iconHtml.depends) {
            icons[iconDep].label.setStyle("display", value ? "" : "none");
          }
      }
      return divIconGroup;
    },
    
    createTypeIconField: function(options, values) {
       return this.createIconField(UWA.extend(options,{
         'icons': [
            {
              name: "IconLarge",
              width: 32,
              height: 32,
              depends: ["IconNormal","IconSmall"]
            }, 
            {
              name: "IconNormal",
              width: 22,
              height: 22
            }, 
            {
              name: "IconSmall",
              width: 16,
              height: 16
            }
          ]
       }), values);
    }
  }

});

define('DS/DMSApp/Collections/DMSMenuCollection',
  [
    'UWA/Core',
    'UWA/Class/Collection',
    'DS/DMSApp/Utils/URLHandler',
    'DS/WAFData/WAFData',
    /*'DS/DMSApp/Utils/jqueryMin',*/
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/Menu',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS'
  ],
  function(UWA, Collection, URLHandler, WAFData, /*jQuery, */WebappsUtils,DMSTools, myNLS) {
    "use strict";

    var MyCollection, myCollec, keys = [],
      len = 10,
      name = 'MyCollection';


    // Initialize the localStorage content :
    /* debugger;
     for (var i = 1; i <= len; i++) {
         localStorage.setItem(name + '-' + i, JSON.stringify({
             attr: Math.random().toString(36).substring(7)
         }));
         keys.push(i);
     }
     localStorage.setItem(name, keys.join(','));*/

    return Collection.extend({
      //No initial model passed, because there is only 1 Tile ("Manage Business Rule").

      /*
      Setup function is called when initializing a newly created instance of collection.
      It is not called in my application code because it is internally used.
      It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
      */
      setup: function() {
        UWA.log("DMSMenuCollection::setup");
        //the URL property of this Collection Object is used to have access to the JSON File "Beginning_Entries.json".
        //this.url = URLHandler.getURL() + "/resources/dictionary/DictionaryOOTB";
        this.url = WebappsUtils.getWebappsAssetUrl('DMSApp', 'DMSTools.json');
      },

      /*
      Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
      It is not called in my application code because it is internally used.
      */
      sync: function(method, collection, options) {
        UWA.log("DMSMenuCollection::sync");
        /*options.lang = widget.lang;
        options.type = 'json';
        options.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'SecurityContext': URLHandler.getSecurityContext()
        };
        options = Object.assign({
          ajax: WAFData.authenticatedRequest
        }, options);*/
        this._parent.apply(this, [method, collection, options]);
        /*debugger;
        var resp, errorMessage, data;

        try {
            switch (method) {
            case "read":
                resp = localStorage.getItem(name).split(',').map(function (id) {
                    data = localStorage.getItem(name + "-" + id);
                    return data && JSON.parse(data);
                }, this).filter(function (attrs) {
                    return attrs; // Remove all falsy values
                }, this);
                break;
            default:
                throw new Error('Unsupported method "{0}"'.format(method));
            }

        }
        catch (error) {
            errorMessage = error.message;
        }

        if (resp) {
            if (options && options.onComplete) {
                options.onComplete(resp);
            }
        }
        else {
            if (options && options.onFailure) {
                options.onFailure(errorMessage || 'Unknown error');
           }
        }

        // return an obj with a dummy cancel() method,
        // because in this implementation of sync() we synchronously
        // call options.onComplete, cancel is a no-op.
        return {
            cancel: function () {
                return;
            }
        };*/
      },

      /*
      Parse function is used to transform the backend response into an array of models.
      It is not called in my application code because it is internally used.
      The parameter "data" corresponds to the raw response object returned by the backend API.

      It returns the array of model attributes to be added to the collection.
      */
      parse: function(data) {
        //pSkeleton.dico_OOTB = data;

        //var menuURL = WebappsUtils.getWebappsAssetUrl('DMSApp', 'DMSTools.json');
        var menu = data;//DMSTools;
        /*UWA.Data.request(menuURL, {
          async: false,
          type: 'json',
          onComplete: function(data) {
            menu = data;
          }
        });*/
        //debugger;
        UWA.log("DMSMenuCollection::parse");
        //var paramReturned = [];
        /*data.push({name:"Types",subtitle:"Create your own types", image:"TypeIcon.png", id:"1"});
        data.push({name:"Group of Attributes",subtitle:"Enrich your data model", image:"GroupAttrIcon.png", id:"2"});
        data.push({name:"Extensions",subtitle:"Create your own extensions", image:"ExtIcon.png", id:"3"});
        data.push({name:"Attributes",subtitle:"Allow to define new attributes", image:"AttrIcon.png", id:"4"});*/
        if (Array.isArray(menu)) {
          menu.forEach(function(iElement) {
          	iElement['image'] = WebappsUtils.getWebappsAssetUrl('DMSApp', iElement['image']);
          	iElement['subtitle'] = "<span title='"+myNLS.get(iElement['subtitle'])+"'>"+myNLS.get(iElement['subtitle'])+"</span>";
          	iElement['title'] = myNLS.get(iElement['title']);
            /*paramReturned.push({
              //Metadata associated with the model returned

              //Title and Image are properties that can be displayed in the Tile Object
              title: iElement.name,
              subtitle: iElement.subtitle,
              introduction: iElement.subtitle,
              image: WebappsUtils.getWebappsAssetUrl('DMSApp', iElement.image),

              //Every model must specify an ID
              id: iElement.id
            });*/
          });
        }
        return menu;//paramReturned;

      }

    });

    // create a collection and fetch its content.
    // This will call our implementation of sync for the operation
    // "read" :
    //myCollec = new MyCollection();
    /*myCollec.fetch({
        onComplete: function (collec, response, options) {
            UWA.log(myCollec.toJSON());
        }
    });*/

  });

/**
 * @author AMN14
 */
define('DS/DMSApp/Collections/ToolsCollection', [
    'UWA/Core',
    'UWA/Class/Model',
    'UWA/Class/Collection',
    'DS/DMSApp/Models/ToolsModel',
    'DS/WAFData/WAFData',
    'DS/DMSApp/Utils/URLHandler',
], function (UWA,
    Model,
    Collection,
    ToolsModel,
    WAFData,
    URLHandler
) {
        'use strict';


        var ToolsCollection = Collection.extend({

            model: ToolsModel,

            setup: function (models, options) {
                UWA.log('ToolsCollection::setup');
                this.url = URLHandler.getURL() + "/resources/datasetup_ws/GetImportSecurityContexts";
            },


            sync: function (method, model, options) {
                UWA.log("ToolsCollection::sync");

                options.headers = {
                    Accept: 'application/json',
                    'Accept-Language': widget.lang
                };

                options = Object.assign({
                    ajax: WAFData.authenticatedRequest
                }, options);

                this._parent.apply(this, [method, model, options]);
            },


            parse: function (data) {
                UWA.log("ToolsCollection::parse");
                var parsedResponse = { env: null, Scs: [] };
                parsedResponse.env = data.ENV;
                var listCollabSpace = data.SCs;
                if (listCollabSpace != null && Array.isArray(listCollabSpace)) {
                    listCollabSpace.forEach(function (collabSpace) {
                        parsedResponse.Scs.push(
                            {
                                collabID: collabSpace.SC,
                                collabName: collabSpace.CS,
                            }
                        );
                    }
                    )
                }
                return parsedResponse;
            },
        }
        );

        return ToolsCollection;
    }
);

define('DS/DMSApp/Utils/dictionaryJSONHandler',
  ['DS/DMSApp/Utils/UuidHandler', 'i18n!DS/DMSApp/assets/nls/DMSAppNLS'],
  function(UuidHandler, myNls) {
    "use strict";

    function DicoHandler(options) {
      
    }

    DicoHandler.prototype = {
      constructor: DicoHandler,
      //url is the only attribute of this class.
      init: function(iDicoJson, iDicoOOTB) {
        this.charFlag = "__";
        this.isParamPackageVisible = false;
        iDicoJson = iDicoJson || {};
        iDicoOOTB = iDicoOOTB || {};
        iDicoJson.Dictionary = iDicoJson.Dictionary || {};
        iDicoOOTB.Dictionary = iDicoOOTB.Dictionary || {};
        var timestampJson = parseInt(iDicoJson.Dictionary.JsonTimeStamp || "0");
        var timestampOOTB = parseInt(iDicoOOTB.Dictionary.JsonTimeStamp || "0");
        
        if (!this.dicoJson || timestampJson > this.dicoJson.Dictionary.JsonTimeStamp) {
          this.dicoJson = JSON.parse(JSON.stringify(iDicoJson));
          this.dicoJson.Dictionary.JsonTimeStamp = timestampJson;
          this.mergeDico = null;
        }
        if (!this.dicoOOTB || timestampOOTB > this.dicoOOTB.Dictionary.JsonTimeStamp) {
          this.dicoOOTB = JSON.parse(JSON.stringify(iDicoOOTB));
          this.dicoOOTB.Dictionary.JsonTimeStamp = timestampOOTB;
          this.mergeDico = null;
        }
        try {
          if (window.pSkeleton && iDicoJson['DictionaryNLS']) {
            window.pSkeleton.dico_CUSTO['DictionaryNLS'] = iDicoJson['DictionaryNLS'];
            /*Object.keys(this.dicoJson["DictionaryNLS"]).forEach(function(item) {
              pSkeleton.dico_CUSTO['DictionaryNLS'][item] = this.dicoJson["DictionaryNLS"][item];
            });*/
          }
        } catch(error) {}
        
        for(var type of ["Types", "Interfaces", "Relationships", "UniqueKeys"]) {
          if(!this.dicoJson.Dictionary[type]) this.dicoJson.Dictionary[type]={};
          if(!this.dicoOOTB.Dictionary[type]) this.dicoOOTB.Dictionary[type]={};
        }
        if(!this.mergeDico) {
          this.mergeDico = {
            Dictionary: {
              Types: {},
              Interfaces: {},
              Relationships: {},
              UniqueKeys: {}
            }
          };
          
          for(var type of ["Types", "Interfaces", "Relationships", "UniqueKeys"]) {
            for(let [key,val] of Object.entries( this.dicoJson.Dictionary[type] ) ) {
              this.mergeDico.Dictionary[type][key] = val; 
            }
            for(let [key,val] of Object.entries( this.dicoOOTB.Dictionary[type] ) ) {
              this.mergeDico.Dictionary[type][key] = val; 
            }
          }
        }
      },

      /*setOOTBDico(iJson) {
      	this.OOTBDico = iJson;
      },

      setCUSTODico(iJson) {
      	this.CUSTODico = iJson;
      },*/
      // Called by UniqueKeyForm.js
      getInterfaces(scope) {
        var isParamPackageVisible = this.isParamPackageVisible;
        return Object.values(this.dicoJson['Dictionary']['Interfaces'] || {}).filter(function(type){
          if (!isParamPackageVisible && (type["Package"] === "OtbERConfiguration" || type["Package"] === "OtbIRPCConfiguration")) {
            return false;
          }
          if (type['Automatic'] === 'No') { // FUN125205: Pas d'unique keys sur les extensions de déploiement non automatique ?
            return false;
          }
          if (type["Deployment"] !== "Yes") {
            return false;
          }
          return !scope || (type['ScopeTypes'] || []).includes(scope) || (type['ScopeRelationships'] || []).includes(scope);
        });
      },
      // Called by AttrGroupCollection.js
      getAttGroups(typeScope) {
        // IR-816552-3DEXPERIENCER2021x S63 - scopes can contain duplicates but not results!
        var scopes = null;
        while(typeScope) {
          var type = this.mergeDico['Dictionary']['Types'][typeScope] || this.mergeDico['Dictionary']['Relationships'][typeScope] || {};
          scopes = (scopes || []).concat(type['ExtendingInterfaces'] || []);
          typeScope = type['Parent']
        }
        var isParamPackageVisible = this.isParamPackageVisible;
        return Object.values(this.dicoJson['Dictionary']['Interfaces'] || {}).filter(function(extension) {
          if (!isParamPackageVisible && (extension["Package"] === "OtbERConfiguration" || extension["Package"] === "OtbIRPCConfiguration")) {
            return false;
          } 
          //We are just displaying deployment interfaces that are not param interfaces but since FUN125205 we display non automatic deployment extensions
          if (extension['Deployment'] === "No" /*|| extension['Automatic'] === 'No'*/ ) {
            return false;
          }
          return !scopes || scopes.includes(extension['Name']); //If we just searching for a selected group of attributes
        })
      },

      getScopes(scopes) {
        var paramReturned = [];
        var data = this.mergeDico;
        var key = Object.keys(data["Dictionary"]['Types']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var type = data["Dictionary"]['Types'][iElement];
            if (scopes && scopes.includes(type['Name']))
              paramReturned.push(type);
          });
        }
        var key = Object.keys(data["Dictionary"]['Relationships']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var type = data["Dictionary"]['Relationships'][iElement];
            if (scopes && scopes.includes(type['Name']))
              paramReturned.push(type);
          });
        }
        return paramReturned;
      },
      /*
      This function will return a list of custo relationships.
      */
      getCustoRel() {
        var paramReturned = [];
        var data = this.dicoJson;
        var key = Object.keys(data["Dictionary"]['Relationships']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var rel = data["Dictionary"]['Relationships'][iElement];
            paramReturned.push(rel);
          });
        }
        return paramReturned;
      },
      getCustoSpeInterfaces() {
        var paramReturned = [];
        var data = this.dicoJson;
        var key = Object.keys(data["Dictionary"]['Interfaces']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var ext = data["Dictionary"]['Interfaces'][iElement];
            if (ext.Specializable == "Yes" && ext.Deployment == "No" && ext.Customer == "No")
              paramReturned.push(ext);
          });
        }
        return paramReturned;
      },
      getTypes() {
        var paramReturned = [];
        var data = this.dicoJson;
        var key = Object.keys(data["Dictionary"]['Types']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var type = data["Dictionary"]['Types'][iElement];
            paramReturned.push(type);
          });
        }
        return paramReturned;
      },
      getUniquekeys() {
        var paramReturned = [];
        var data = this.dicoJson;
        var key = Object.keys(data["Dictionary"]['UniqueKeys']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var uk = data["Dictionary"]['UniqueKeys'][iElement];
            paramReturned.push(uk);
          });
        }
        return paramReturned;
      },
      isOOTBAgregator: function(name, nature) {
        var key = this.getKeyToReadOnDico(nature);
        var toRet = this.dicoOOTB['Dictionary'][key][name] != undefined ? true : false;
        return toRet;
      },
      isOOTBAggregator2: function(model) {
        var key = this.getKeyToReadOnDico(model['nature']);
        var toRet = this.dicoOOTB['Dictionary'][key][model['id']] != undefined ? true : false;
        return toRet;
      },
      getInstancesOfType: function(parentElem) {
        var listToRet = [];
        var firstInstance = new Object();
        var dataMerge = this.mergeDico;
        // Commencer par voir si le parent a un CreateInstName
        var typeWithInstance = this.getFirstTypeToHaveInst(parentElem);
        var instOfFirstType = typeWithInstance.CreateInstName;
        listToRet = this.getCustoChildOfInstance(instOfFirstType);
        //S63 FUN124741 The user must have the choice to take the instance of the parent
        firstInstance = UWA.clone(dataMerge['Dictionary']['Relationships'][instOfFirstType]);
        firstInstance['firstParent']=true;
        listToRet.unshift(firstInstance);
        // Si oui ajouter a la list
        // Sinon remonter au pere pour voir si lui a une CreateInstName
        console.log(listToRet);
        return listToRet;
      },
      /*
       * Cette methode va retourner le premier type à avoir la propriété CreateInstName
       * en remontant le hierachie si le type fourni en argumant n'en possède pas.
       * Si toute la hierachie en est dépourvu de cette prorité alors cette fonction
       * retourne "undefined".
       */
      getFirstTypeToHaveInst: function(elem) {
        var toRet = undefined;
        var hierachyList = this.getTypeHierarchy(elem.Name, this.getKeyToReadOnDico(elem.Nature));
        for (var i = 0; i < hierachyList.length; i++) {
          var curType = hierachyList[i];
          if (curType.hasOwnProperty('CreateInstName')&&curType['CreateInstName']!=="") {
            toRet = curType;
            break;

          }
        }
        return toRet;
      },
      /*
      Cette methode doit rendre une liste d'intances enfants d'une instance fourni en argument.
      La liste sera vide si l'instance fourni en argument ne possède pas d'enfants.
      */
      getCustoChildOfInstance: function(instName) {
        var data = this.dicoJson;
        var mapToRet = [];
        var t = Object.entries(data.Dictionary.Relationships).filter(([key, val]) => val.Parent == instName);
        t.forEach(item => mapToRet.push(item[1]));
        for (var i = 0; i < mapToRet.length; i++) {
          var cur = mapToRet[i];
          mapToRet = mapToRet.concat(this.getCustoChildOfInstance(cur.Name));
        }
        return mapToRet;
      },
      // Cette methode va rendre un boolean en verifiant si le nom
      // donné en argument est une instance.
      isRelationship(name) {
        var res = false;
        var data = this.mergeDico;
        var rel = data["Dictionary"]['Relationships'][name];
        if (rel != undefined) {
          res = true;
        }
        return res;
      },
      getSpecializableExtensions() {
        var paramReturned = [];
        var data = this.mergeDico;
        var key = Object.keys(data["Dictionary"]['Interfaces']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var ext = data["Dictionary"]['Interfaces'][iElement];
            if (ext.Specializable == "Yes")
              paramReturned.push(ext);
          });
        }
        return paramReturned;
      },
      getSpecializableRelationships(scopes) {
        var paramReturned = [];
        var data = this.mergeDico;
        var key = Object.keys(data["Dictionary"]['Relationships']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var rel = data["Dictionary"]['Relationships'][iElement];
            if (rel.Specializable == "Yes")
              if (scopes) {
                if (scopes.includes(rel['Name']))
                  paramReturned.push(rel);
              }
            else {
              paramReturned.push(rel);
            }
          });
        }
        return paramReturned;
      },
      getAllSpecializableAggregator: function() {
        var toRet = this.getSpecializableTypes();
        toRet = toRet.concat(this.getSpecializableRelationships());
        toRet = toRet.concat(this.getSpecializableExtensions());
        return toRet;
      },
      getSpecializableTypes(scopes) {
        var paramReturned = [];
        var data = this.dicoJson;
        var key = Object.keys(data["Dictionary"]['Types']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var type = data["Dictionary"]['Types'][iElement];
            if (type.Specializable == "Yes")
              if (scopes) {
                if (scopes.includes(type['Name']))
                  paramReturned.push(type);
              }
            else {
              paramReturned.push(type);
            }
          });
        }
        var data = this.dicoOOTB;
        var key = Object.keys(data["Dictionary"]['Types']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var type = data["Dictionary"]['Types'][iElement];
            if (type.Specializable == "Yes")
              if (scopes) {
                if (scopes.includes(type['Name']))
                  paramReturned.push(type);
              }
            else {
              paramReturned.push(type);
            }
          });
        }
        return paramReturned;
      },
      getFirstOotbOfType(typeName, isRel) {
        var toRet;
        var nature = "Types"
        if (isRel) {
          nature = "Relationships"
        }
        var mapToRet = [];
        var data = this.mergeDico;
        var type = data["Dictionary"][nature][typeName];
        if (type != undefined) {
          if (type.hasOwnProperty("FirstOOTB")) {
            var firstOotbName = type["FirstOOTB"];
            toRet = data["Dictionary"][nature][firstOotbName];
          }
        }
        return toRet;
      },
      getAttributes(selectedTool, selectedTypeName, isInherited) {
        var paramReturned = [];
        var isOOTBAttr = "No"
        //  data = $.extend(true, {}, this.dicoJson, this.dicoOOTB),
        var data = this.mergeDico;
        var type = data["Dictionary"][selectedTool][selectedTypeName];
        if (type != undefined) {
          if (type['Name'] == type["FirstOOTB"]) {
            isOOTBAttr = "Yes"
          }
          // Verifier que la proprité existe avant de récupérer les clés.
          if (type.hasOwnProperty('Attributes')) {
            var key = Object.keys(type['Attributes']);
            //var that = this;
            if (Array.isArray(key)) {
              key.forEach(function(iElement) {
                var attr = type['Attributes'][iElement];
                attr.isInherited = isInherited;
                attr.isOOTBAttr = isOOTBAttr;
                attr.ownerNature = type.Nature;
                if (attr.hasOwnProperty("Owner") && attr.Owner === "") {
                  attr.generatedOwner = type.Name;
                }
                paramReturned.push(attr);
              });
            }
          }
          if (type['Parent'] !== "" && isInherited == "Yes")
            paramReturned = paramReturned.concat(this.getAttributes(selectedTool, type['Parent'], isInherited))
        }
        return paramReturned;
      },

      getParentName(selectedTool, selectedTypeName) {
        var data = this.dicoJson;
        return data["Dictionary"][selectedTool][selectedTypeName]['Parent'];
      },

      getParentTypeMap(selectedTypeName, key) {
        var mapToRet = [];
        var data = this.dicoJson;
        var currentType = data["Dictionary"][key][selectedTypeName];
        if (currentType != undefined) {
          mapToRet.push(currentType);
          if (currentType["Parent"] != "") {
            if (currentType.Parent != currentType.FirstOOTB) {
              mapToRet = mapToRet.concat(this.getParentTypeMap(currentType.Parent, key));
            } else {
              var firstOotbType = this.dicoOOTB["Dictionary"][key][currentType.FirstOOTB];
              if (firstOotbType == undefined)
                firstOotbType = data["Dictionary"][key][currentType.FirstOOTB];
              mapToRet.push(firstOotbType);
            }
          }
        }
        return mapToRet;
      },
      getAgregatorByNameAndNature: function(_name, _nature) {
        var data = this.mergeDico;
        var toRet = undefined;
        var key = this.getKeyToReadOnDico(_nature);
        toRet = data["Dictionary"][key][_name];
        return toRet;
      },
      getTypeHierarchy(selectedTypeName, key) {
        var mapToRet = [];
        //var nature = this.getKeyToReadOnDico(nature);
        var data = this.mergeDico;
        var currentType = data["Dictionary"][key][selectedTypeName];
        if (currentType != undefined) {
          mapToRet.push(currentType);
          if (currentType.Parent != "") {
            mapToRet = mapToRet.concat(this.getTypeHierarchy(currentType.Parent, key));
          }
        }
        return mapToRet;
      },

      getSubType(selectedTypeName) {
        var mapToRet = [];
        var data = this.mergeDico;
        /*var currentType = data["Dictionary"]["Types"][selectedTypeName];
        if (currentType != undefined) {
          mapToRet.push(currentType);
          if (currentType.Parent != currentType.FirstOOTB) {
            mapToRet = mapToRet.concat(this.getParentTypeMap(currentType.Parent));
          } else {
            var firstOttbType = this.dicoOOTB["Dictionary"]["Types"][currentType.FirstOOTB];
            mapToRet.push(firstOttbType);
          }
        }*/
        var t = Object.entries(data.Dictionary.Types).filter(([key, val]) => val.Parent == selectedTypeName);
        t.forEach(item => mapToRet.push(item[1]));
        if (t.length == 0) {
          t = Object.entries(data.Dictionary.Relationships).filter(([key, val]) => val.Parent == selectedTypeName);
          t.forEach(item => mapToRet.push(item[1]));
        }
        if (t.length == 0) {
          t = Object.entries(data.Dictionary.Interfaces).filter(([key, val]) => val.Parent == selectedTypeName);
          t.forEach(item => mapToRet.push(item[1]));
        }
        return mapToRet;
      },
      /* a faire 10/19/2020 BMN2 : Modifier cette fonction pour  filter les types/rel OOTB avec la propriété
       * DeployementExtensible = "No". les Types/rel crée depuis DMS ou types bleu ont virtuellement
       * la propriété DeployementExtensible = "Yes".
       * Il faut donc distinguer le dico OOTB et le dico CUSTO.
       */
      getDeploymentExtensibleTypesForAutoComplete(paramReturned, isIRPC, isCusto) {
        var items = [];
        items = this.getDeploymentExtensibleTypes(isIRPC, this.dicoJson, true);
        items = items.concat(this.getDeploymentExtensibleTypes(isIRPC, this.dicoOOTB, false));

        if (isIRPC !== undefined && isIRPC === "Yes") {
          paramReturned['name'] = 'IRPC';
          paramReturned['displayName'] = false;
        } else if (isIRPC !== undefined && isIRPC === "No") {
          paramReturned['name'] = 'ER';
          paramReturned['displayName'] = false;
        }
        paramReturned['items'] = items;
        return paramReturned;

      },
      getTypesToContrainedForUK() {
        var paramReturned = [];
        var data = this.dicoJson;
        var key = Object.keys(data["Dictionary"]['Types']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var type = data["Dictionary"]['Types'][iElement];
            if (!type.hasOwnProperty("DMSStatus")) {
              paramReturned.push(type);
            }
          });
        }
        var data = this.dicoOOTB;
        var key = Object.keys(data["Dictionary"]['Types']);
        if (Array.isArray(key)) {
          key.forEach(function(iElement) {
            var type = data["Dictionary"]['Types'][iElement];
            paramReturned.push(type);

          });
        }
        return paramReturned;
      },
      getDeploymentExtensibleTypes(isIRPC, dico, isCusto) {
        var items = [];
        var data = dico;
        var that = this;
        var bIRPC;
        var typeKey = Object.keys(data["Dictionary"]['Types']);
        if (Array.isArray(typeKey)) {
          typeKey.forEach(function(iElement) {
            var item = {};
            var type = data["Dictionary"]['Types'][iElement];
            if (type['CustomerExposition'] === "Programmer") {
              if (isCusto || (type['DeploymentExtensible'] && type['DeploymentExtensible'] === "Yes")) {
                bIRPC = that.isIRPC(type['Name'], "Types");
                if ((isIRPC === undefined) || (isIRPC === "Yes" && bIRPC) || (isIRPC === "No" && !bIRPC)) {
                  item['value'] = type['Name'];
                  var nls_Option = widget.getValue("DisplayOption");
                  if (nls_Option === "NLSOption") {
                    item['subLabel'] = that.getDisplayName(type['Name']);
                    item['label'] = that.getNLSName(type['Name'], type['Nature']);
                  } else {
                    item['label'] = that.getDisplayName(type['Name']);
                    item['subLabel'] = that.getNLSName(type['Name'], type['Nature']);
                  }
                  item['isIRPC'] = bIRPC ? "Yes" : "No";
                  item['scopeNature'] = type['Nature'];
                  items.push(item);
                  // Touver une meilleure facon de fitrer les types OTB ayant pas la propriété DeployementExtensible = "No"
                  /*if(that.isOOTBAgregator(type["Name"],type['Nature']) && type.DeploymentExtensible && type.DeploymentExtensible === "No"){
                    items.pop();
                  }*/
                }
              }
            }
          });
        }
        var relKey = Object.keys(data["Dictionary"]['Relationships']);
        if (Array.isArray(relKey)) {
          relKey.forEach(function(iElement) {
            var item = {};
            var type = data["Dictionary"]['Relationships'][iElement];
            if (type['CustomerExposition'] === "Programmer") {
              if (isCusto || (type['DeploymentExtensible'] && type['DeploymentExtensible'] === "Yes")) {
                bIRPC = that.isIRPC(type['Name'], "Relationships");
                if ((isIRPC === undefined) || (isIRPC === "Yes" && bIRPC) || (isIRPC === "No" && !bIRPC)) {
                  item['value'] = type['Name'];
                  var nls_Option = widget.getValue("DisplayOption");
                  if (nls_Option === "NLSOption") {
                    item['subLabel'] = that.getDisplayName(type['Name']);
                    item['label'] = that.getNLSName(type['Name'], type['Nature']);
                  } else {
                    item['label'] = that.getDisplayName(type['Name']);
                    item['subLabel'] = that.getNLSName(type['Name'], type['Nature']);
                  }
                  item['isIRPC'] = bIRPC ? "Yes" : "No";
                  item['scopeNature'] = type['Nature'];
                  items.push(item);
                  // Touver une meilleure facon de fitrer les types OTB ayant pas la propriété DeployementExtensible = "No"
                  /*if(that.isOOTBAgregator(type["Name"],type['Nature']) && type.DeploymentExtensible && type.DeploymentExtensible === "No"){
                    items.pop();
                  }*/
                }
              }
            }
          });
        }
        return items;
      },

      getExtensibleTypesForAutoComplete(paramReturned, isIRPC) {
        var items = [];
        //var paramReturned = {};
        var data = this.mergeDico;
        var that = this;
        var bIRPC;
        var typeKey = Object.keys(data["Dictionary"]['Types']);
        if (Array.isArray(typeKey)) {
          typeKey.forEach(function(iElement) {
            var item = {};
            var type = data["Dictionary"]['Types'][iElement];
            if (type['CustomerExposition'] === "Programmer")
              if (type['CustomerExtensible'] === "Yes") {
                bIRPC = that.isIRPC(type['Name'], "Types");
                if ((isIRPC === undefined) || (isIRPC === "Yes" && bIRPC) || (isIRPC === "No" && !bIRPC)) {
                  item['value'] = type['Name'];
                  var nls_Option = widget.getValue("DisplayOption");
                  if (nls_Option === "NLSOption") {
                    item['subLabel'] = that.getDisplayName(type['Name']);
                    item['label'] = that.getNLSName(type['Name'], type['Nature']);
                  } else {
                    item['label'] = that.getDisplayName(type['Name']);
                    item['subLabel'] = that.getNLSName(type['Name'], type['Nature']);
                  }
                  item['isIRPC'] = bIRPC ? "Yes" : "No";
                  item['scopeNature'] = type['Nature'];
                  items.push(item);
                }
              }
          });
        }
        var relKey = Object.keys(data["Dictionary"]['Relationships']);
        if (Array.isArray(relKey)) {
          relKey.forEach(function(iElement) {
            var item = {};
            var type = data["Dictionary"]['Relationships'][iElement];
            if (type['CustomerExposition'] === "Programmer")
              if (type['CustomerExtensible'] === "Yes") {
                bIRPC = that.isIRPC(type['Name'], "Relationships");
                if ((isIRPC === undefined) || (isIRPC === "Yes" && bIRPC) || (isIRPC === "No" && !bIRPC)) {
                  item['value'] = type['Name'];
                  var nls_Option = widget.getValue("DisplayOption");
                  if (nls_Option === "NLSOption") {
                    item['subLabel'] = that.getDisplayName(type['Name']);
                    item['label'] = that.getNLSName(type['Name'], type['Nature']);
                  } else {
                    item['label'] = that.getDisplayName(type['Name']);
                    item['subLabel'] = that.getNLSName(type['Name'], type['Nature']);
                  }
                  item['isIRPC'] = bIRPC ? "Yes" : "No";
                  item['scopeNature'] = type['Nature'];
                  items.push(item);
                }
              }
          });
        }
        if (isIRPC !== undefined && isIRPC === "Yes") {
          paramReturned['name'] = 'IRPC';
          paramReturned['displayName'] = false;
        } else if (isIRPC !== undefined && isIRPC === "No") {
          paramReturned['name'] = 'ER';
          paramReturned['displayName'] = false;
        }
        paramReturned['items'] = items;
        return paramReturned;
      },

      getCustoExtForAutoComplete(paramReturned, isIRPC) {
        var items = [];
        //var paramReturned = {};
        var data = this.mergeDico;
        var that = this;
        var bIRPC;
        var extKey = Object.keys(data["Dictionary"]['Interfaces']);
        if (Array.isArray(extKey)) {
          extKey.forEach(function(iElement) {
            var item = {};
            var ext = data["Dictionary"]['Interfaces'][iElement];
            if (ext['CustomerExposition'] === "Programmer")
              if (ext['Customer'] === "Yes") {
                if (ext['Package'].startsWith("DMSPackDefault")) {
                  bIRPC = that.isIRPC(ext['Name'], "Interfaces");
                  if ((isIRPC === undefined) || (isIRPC === "Yes" && bIRPC) || (isIRPC === "No" && !bIRPC)) {
                    item['value'] = ext['Name'];
                    var nls_Option = widget.getValue("DisplayOption");
                    if (nls_Option === "NLSOption") {
                      item['subLabel'] = that.getDisplayName(ext['Name']);
                      item['label'] = that.getNLSName(ext['Name'], ext['Nature']);
                    } else {
                      item['label'] = that.getDisplayName(ext['Name']);
                      item['subLabel'] = that.getNLSName(ext['Name'], ext['Nature']);
                    }
                    item['isIRPC'] = bIRPC ? "Yes" : "No";
                    item['scopeNature'] = ext['Nature'];
                    item['ScopeTypes'] = ext['ScopeTypes'];
                    item['ScopeRelationships'] = ext['ScopeRelationships'];
                    items.push(item);
                  }
                }
              }
          });
        }
        var relKey = Object.keys(data["Dictionary"]['Relationships']);
        if (Array.isArray(relKey)) {
          relKey.forEach(function(iElement) {
            var item = {};
            var type = data["Dictionary"]['Relationships'][iElement];
            if (type['CustomerExposition'] === "Programmer")
              if (type['Specialization'] === "Yes") {
                bIRPC = that.isIRPC(type['Name'], "Relationships");
                if ((isIRPC === undefined) || (isIRPC === "Yes" && bIRPC) || (isIRPC === "No" && !bIRPC)) {
                  item['value'] = type['Name'];
                  var nls_Option = widget.getValue("DisplayOption");
                  if (nls_Option === "NLSOption") {
                    item['subLabel'] = that.getDisplayName(type['Name']);
                    item['label'] = that.getNLSName(type['Name'], type['Nature']);
                  } else {
                    item['label'] = that.getDisplayName(type['Name']);
                    item['subLabel'] = that.getNLSName(type['Name'], type['Nature']);
                  }
                  item['isIRPC'] = bIRPC ? "Yes" : "No";
                  item['scopeNature'] = type['Nature'];
                  items.push(item);
                }
              }
          });
        }
        if (isIRPC !== undefined && isIRPC === "Yes") {
          paramReturned['name'] = 'IRPC';
          paramReturned['displayName'] = false;
        } else if (isIRPC !== undefined && isIRPC === "No") {
          paramReturned['name'] = 'ER';
          paramReturned['displayName'] = false;
        }
        paramReturned['items'] = items;
        return paramReturned;

      },

      isIRPC: function(name, nature) {
        var result = true;
        if (nature == "Interfaces") {
          result = this.isIRPCForExt(name);
          return result;
        }
        var data = this.mergeDico;

        var obj = data["Dictionary"][nature][name];
        if (obj === undefined && nature === "Types") {
          nature = "Relationships";
        }
        obj = data["Dictionary"][nature][name];
        if (obj === undefined) {
          return false;
        }

        if (obj['Parent'] === '') {
          //We currently testing relationships on PLMCoreInstance and PLMCoreRepInstance because the real first parent PLMInstance isn't visible due to CustomerExposition=None
          if ((nature === 'Relationships' && obj['Name'] === 'PLMCoreInstance') || (nature === 'Relationships' && obj['Name'] === 'PLMCoreRepInstance') || (nature === 'Types' && obj['Name'] === 'PLMEntity') || (obj['Package'] !== undefined && (obj['Package'] === "DMSPackDefault_01" || obj['Package'] === "DMSPackDefault_03")))
            result = true;
          else
            result = false;
        } else
          result = this.isIRPC(obj['Parent'], nature);

        return result;
      },

      isIRPCForExt: function(name) {
        var data = this.mergeDico;
        var result = undefined;
        var obj = data["Dictionary"]["Interfaces"][name];
        if (obj["ScopeTypes"] != undefined || obj["ScopeRelationships"] != undefined) {
          if (obj["ScopeTypes"] != undefined) {
            for (var i = 0; i < obj["ScopeTypes"].length; i++) {
              result = this.isIRPC(obj["ScopeTypes"][i], "Types");
              break;
            }
          }
          // BMN2 IR-864238 23/07/2021
          if (obj["ScopeRelationships"] != undefined) {
            for (var i = 0; i < obj["ScopeRelationships"].length; i++) {
              result = this.isIRPC(obj["ScopeRelationships"][i], "Relationships");
              break;
            }
            return result;
          }
        } else if (obj["Parent"]) {
          result = this.isIRPCForExt(obj["Parent"]);
        }
        return result;
      },

      isIRPCNew: function(element) {
        var data = this.mergeDico;
        var result = true;
        var nature = element.Nature;
        switch (nature) {
          case "Type":

            break;
          case "Relationship":

            break;
          case "Interface":

            break;
          default:

        }

      },
      isTypeCustomerExtensible: function(typeElem) {
        var toRet = false;
        var typeHierarchyList = this.getTypeHierarchy(typeElem.Name, this.getKeyToReadOnDico(typeElem.Nature));
        for (var i = 0; i < typeHierarchyList.length; i++) {
          var curType = typeHierarchyList[i];
          if (typeElem.hasOwnProperty('CustomerExtensible')) {
            if (typeElem.CustomerExtensible == "Yes" || typeElem.CustomerExtensible == "No") {
              toRet = typeElem.CustomerExtensible == "Yes" ? true : false;
              break;
            }
          }
        }
        return toRet;
      },
      isTypeDeploymentExtensible: function(typeElem) {
        var toRet = false;
        var typeHierarchyList = this.getTypeHierarchy(typeElem.Name, this.getKeyToReadOnDico(typeElem.Nature));
        for (var i = 0; i < typeHierarchyList.length; i++) {
          var curType = typeHierarchyList[i];
          if (typeElem.hasOwnProperty('DeploymentExtensible')) {
            if (typeElem['DeploymentExtensible'] == "Yes" || typeElem['DeploymentExtensible'] == "No") {
              toRet = typeElem['DeploymentExtensible'] == "Yes" ? true : false;
              break;
            }
          }
        }
        return toRet;
      },
      getKeyToReadOnDico: function(nature) {
        var toRet = "";
        switch (nature) {
          case "Type":
            toRet = "Types";
            break;
          case "Relationship":
            toRet = "Relationships";
            break;
          case "Interface":
            toRet = "Interfaces";
            break;
          default:

        }
        return toRet;
      },
      getPackageNameToCreate: function(isIRPC, isDepl) {
        if (isIRPC && !isDepl) {
          return "DMSPackDefault_01"
        } else if (!isIRPC && !isDepl) {
          return "DMSPackDefault_02";
        } else if (isIRPC && isDepl) {
          return "DMSPackDefault_03";
        } else if (!isIRPC && isDepl) {
          return "DMSPackDefault_04";
        }
      },
      accessCreateInstField: function(name) {
        var data = this.mergeDico;
        var result = false;
        var obj = data["Dictionary"]["Types"][name];
        if (obj['Parent'] != '') {
          if (obj['Name'] == "PLMCoreReference" || obj['Name'] == "PLMCoreRepReference")
            result = true;
          else
            result = this.accessCreateInstField(obj['Parent'], "Types");
        }
        return result;
      },

      setURL: function(iJson) {
        this.dicoJson = iJson;
      },

      getURL: function() {
        return this.dicoJson;
      },
      getDisplayName: function(aName) {
        if (aName == undefined) {
          return "";
        }
        var result = aName;
        var index1 = aName.indexOf(this.charFlag);
        if (index1 !== -1) {
          result = aName.substring(0, index1);
        }
        return result;
      },
      getNLSName: function(aName, aNature) {
        var toRet = "";
        if (aName != undefined && aNature != undefined) {
          var nls_data = pSkeleton.nls_OOTB;
          var key = aNature + "." + aName;
          toRet = this.getDisplayName(aName);
          if (pSkeleton.dico_CUSTO['DictionaryNLS'] && pSkeleton.dico_CUSTO['DictionaryNLS'][key])
            var nlsName = pSkeleton.dico_CUSTO['DictionaryNLS'][key];
          if (nlsName != undefined && nlsName != aName && !key.endsWith(nlsName)) {
            toRet = nlsName;
          } else if (nls_data != undefined && nls_data.hasOwnProperty("DictionaryNLS")) {
            var nlsName = nls_data["DictionaryNLS"][key];
            if (nlsName != undefined && nlsName != aName && !key.endsWith(nlsName)) {
              toRet = nlsName;
            }
          }
        }
        return toRet;
      },
      getListNameNLSFromDico: function(aName, aNature) {
        let toRet = {
          "en": "",
          "fr": "",
          "de": "",
          "ja": "",
          "ko": "",
          "ru": "",
          "zh": ""
        };
        var key = aNature + "." + aName;
        Object.keys(toRet).forEach((item, i) => {
          var nlsValue = pSkeleton.nls_Custo[item][key];
          if (nlsValue != undefined && nlsValue != aName && !key.endsWith(nlsValue)) {
            toRet[item] = nlsValue;
          }
          if (item != "en" && nlsValue == toRet["en"]) {
            delete toRet[item];
          }
        });

        return toRet;
      },
      getExtensionOfType: function(aTypeName, DeploymentFilter) {
        var toRet = [];
        var data = this.mergeDico;
        var extendingItfList = data["Dictionary"].Types[aTypeName].ExtendingInterfaces;
        extendingItfList.forEach(function(item) {
          var currentItf = data["Dictionary"].Interfaces[item];
          var filterDeploymentValue;
          if (DeploymentFilter) {
            filterDeploymentValue = "Yes";
          } else {
            filterDeploymentValue = "No";
          }
          if (currentItf != undefined && currentItf.hasOwnProperty('Deployment') && currentItf.Deployment == filterDeploymentValue) {
            toRet.push(currentItf);
          }
        });
        return toRet;
      },
      getSpecializationExtensions() {
        var toRet = [];
        var data = this.dicoJson;
        var interfaces = Object.keys(data["Dictionary"]['Interfaces']);
        if (Array.isArray(interfaces)) {
          interfaces.forEach(function(iElement) {
            var specializationExt = data["Dictionary"]['Interfaces'][iElement];
            if (specializationExt['Specialization'] === "Yes")
              toRet.push(specializationExt);
          });
        }
        return toRet;
      },
      getCustomerExtensions(typeScope) {
        var paramReturned = [];
        var paramTmp = [];
        var that = this;
        var data = that.dicoJson;
        var allData = that.mergeDico;
        if (typeScope) {
          var type = allData['Dictionary']['Types'][typeScope];
          if (type === undefined)
            type = allData['Dictionary']['Relationships'][typeScope];
          var extendingInterfaces = type['ExtendingInterfaces'] ? type['ExtendingInterfaces'] : [];
          //var extKeys = Object.keys(extendingInterfaces);
          if (Array.isArray(extendingInterfaces)) {
            extendingInterfaces.forEach(function(iElement) {
              var extendingInterface = data['Dictionary']['Interfaces'][iElement];
              if (extendingInterface && extendingInterface['Customer'] && extendingInterface['Customer'] === "Yes") {
                paramTmp.push(extendingInterface);
              }
            });
          }
          if (type['Parent'] !== "") {
            paramTmp = paramTmp.concat(that.getCustomerExtensions(type['Parent']));
          }
          //IR-816552-3DEXPERIENCER2021x S63 we now use temporary list where we removed dup before to return
          if (paramTmp.length != 0) {
            var setTmp = new Set(paramTmp);
            setTmp.forEach(v => paramReturned.push(v));
          }

        } else {
          var interfaces = Object.keys(data['Dictionary']['Interfaces']);
          if (Array.isArray(interfaces)) {
            interfaces.forEach(function(iElement) {
              var customerExt = data['Dictionary']['Interfaces'][iElement];
              if (customerExt['CustomerExposition'] && customerExt['CustomerExposition'] == "Programmer" && customerExt['Customer'] && customerExt['Customer'] === "Yes") {
                paramReturned.push(customerExt);
              }
            });
          }
        }
        return paramReturned;
      },
      getCustomerExtension(custoExt) {
        var paramReturned = [];
        var that = this;
        var data = that.dicoJson;
        var allData = that.mergeDico;
        var extension = allData['Dictionary']['Interfaces'][custoExt];
        if (extension) {
          if (extension['CustomerExposition'] && extension['CustomerExposition'] === "Programmer" && extension['Customer'] && extension['Customer'] === "Yes")
            return extension;
        }
        return null;
      },
      customerExtensionHadScope(custoExt) {
        var hadScope = false;
        var allData = this.mergeDico;
        var extension = allData['Dictionary']['Interfaces'][custoExt];
        var scopes = [];
        if (extension && extension['CustomerExposition'] && extension['CustomerExposition'] === "Programmer" && extension['Customer'] && extension['Customer'] === "Yes") {
          if ((extension['ScopeTypes'] && extension['ScopeTypes'].length !== 0) || (extension['ScopeRelationships'] && extension['ScopeRelationships'].length !== 0)) {
            if (extension['ScopeTypes'] !== undefined) {
              scopes = extension['ScopeTypes'];
              if (extension['ScopeRelationships'] !== undefined) {
                scopes = scopes.concat(extension['ScopeRelationships']);
              }
            } else if (extension['ScopeRelationships'] !== undefined) {
              scopes = extension['ScopeRelationships'];
            }
            return scopes;
          } else {
            if (extension['Parent'] && extension['Parent'] !== "")
              return this.customerExtensionHadScope(extension['Parent']);
            else
              return scopes;
          }
        }
        return null;
      },
      getSubCustomerExt(extension, isInherited) {
        var toRet = [];
        var data = this.dicoJson;
        var that = this;
        var interfaces = Object.keys(data["Dictionary"]['Interfaces']);
        if (Array.isArray(interfaces)) {
          interfaces.forEach(function(iElement) {
            var customerExt = data["Dictionary"]['Interfaces'][iElement];
            if (customerExt['Customer'] && customerExt['Customer'] === "Yes") {
              if (extension === customerExt['Parent']) {
                toRet.push(customerExt);
                if (isInherited) {
                  toRet.concat(that.getSubCustomerExt(customerExt, true))
                }
              }
            }
          });
        }
        return toRet;
      },
      buildTypeForCreation: function(_typeName, _parent, _instance, _icon, _nls, _abstract, _description) {
        // Generate Name with Uuid
        var newUuid;
        if(this.ODTUuid===undefined) {
          newUuid = UuidHandler.create_UUID();
        }
        else {
          newUuid = this.ODTUuid;
        }
        var typeName = _typeName + this.charFlag + newUuid.getUuidWithoutSeparator();
        
        // Compute the nature of the element based on his name or just retreive it from the form
        var nature = _parent.Nature;
        // Retrieve from the form
        var parentName = _parent.Name;
        // Compute to find the the firstOOTB from the parent name
        var firstOOTB = _parent.FirstOOTB;
        // Retrieve it from the form
        var abstract = _abstract ? "Yes" : "No";
        // put the default value for the property customer exposition
        var customerExpo = "Programmer";
        var specializable = "Yes";
        var specialization = "Yes";
        var customerExtensible = "Yes"; // Réponse de Jean-Pierre, récupérer l'information depuis la hierachie
        if ((_parent.Nature == "Type" || _parent.Nature == "Relationship") && !this.isTypeCustomerExtensible(_parent)) {
          customerExtensible = "No"
        }
        var deploymentExtensible = "Yes";
        if ((_parent.Nature == "Type" || _parent.Nature == "Relationship") && !this.isTypeDeploymentExtensible(_parent)) {
          customerExtensible = "No"
        }
        var extendingInterfaces = [];

        // Compute the package name, if the element to create is IRPC or ER
        var isIRPC = undefined;
        // BMN2 IR-852068 : 26/05/2021 now isIRPC function will work also for newable interface like "Robot".
        isIRPC = this.isIRPC(_parent.Name, this.getKeyToReadOnDico(_parent.Nature));
        if (isIRPC == undefined) {
          // Sortir en Erreur
        }
        var packageName = this.getPackageNameToCreate(isIRPC, false);
        // Retrieve it from the form.

        var typeToCreate = {

          "Name": typeName,
          "Nature": nature,
          "Package": packageName,
          "Parent": parentName,
          "FirstOOTB": firstOOTB,
          "Abstract": abstract,
          "CustomerExposition": customerExpo,
          "Specializable": specializable,
          "Specialization": specialization,
          "CustomerExtensible": customerExtensible,
          "DeploymentExtensible": deploymentExtensible,
          "ExtendingInterfaces": extendingInterfaces, //  va probablement devoir être généré si tu veux que les group d'attributs apparaissent--> a discuter
          "Description": _description,
          //"CreateInstName": (_instance || {}).Name || "", S63 l'utilisation de l'instance du parent doit être représenté par l'absence du champs
          "NameNLS": _nls,
          "IconLarge": (_icon || {}).IconLarge,
          "IconNormal": (_icon || {}).IconNormal,
          "IconSmall": (_icon || {}).IconSmall,
          "IconName": Object.values(_icon || {}).some(item=>!!item) ? typeName : undefined
        }
        //S63 FUN124741 un type doit pouvoir avoir plusieurs instances
        if(Array.isArray(_instance)) {
          if(_instance.length!==0) {
            var instanceList = [];
            var instances;
            _instance.forEach(function(item){
              if(item['element']) {
                instanceList.push(item['element']['Name']);
              }
            })
            instances = instanceList.join(";");
            if(instances!==""){
              typeToCreate['CreateInstName'] = instances;
            }
          }
        } 
        else {
          console.error("buildTypeForCreation method must have array parameter for instName");
          if(_instance!==undefined) {
            typeToCreate['CreateInstName'] = _instance['Name'];
          }
        }
        if (_parent.Nature != "Type") {
          delete typeToCreate.CreateInstName;
        }
        if (_parent.Nature == "Interface") {
          delete typeToCreate.ExtendingInterfaces;
          delete typeToCreate.CustomerExtensible;
          typeToCreate["Deployment"] = "No";
          typeToCreate["Customer"] = "No";
        }
        Object.keys(typeToCreate).forEach((item, i) => {
          if (typeToCreate[item] == undefined) {
            delete typeToCreate[item];
          }
        });

        return typeToCreate;
      },
      getPredicatesBasedOnType: function(type) {
        var result = pSkeleton.predicates;
        if (type == "Integer") {
          type = "integer";
        } else if (type == "String") {
          type = "string";
        } else if (type == "Boolean") {
          type = "boolean";
        } else if (type == "Date") {
          type = "dateTime";
        } else if (type == "Double") {
          type = "double";
        }
        var toRet = [];
        if (result != undefined) {
          Object.keys(result).forEach(function(item) {
            if (result[item].properties != undefined) {
              result[item].properties.forEach(function(cur) {
                if (cur.dataType.includes(type)) {
                  toRet.push(cur);
                }
              })
            }
          });
        }
        toRet.sort(function(a, b) {
          return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0;
        });
        return toRet;
      },
      buildAttrForCreation: function(_attrName, _attrNature, _owner, _attrOwnerNature, _predicate, _length, _authorizedValues, _mapNlsForRange, _defaultValue, _userAccess, _multiValue, _multiLine, _searchable, _resetWhenDuplicated, _resetWhenVersioned, _export3DXML, _hasDefault, _NLSObject, _dimension, _manipUnit) {

        // Generate Name with Uuid
        var newUuid = UuidHandler.create_UUID();
        var attrName = _attrName + this.charFlag + newUuid.getUuidWithoutSeparator();
        var attrNature = _attrNature;
        if (_attrNature == "DoubleWithDim") {
          attrNature = "Double";
        }
        var attrOwner = _owner;
        var attrOwnerNature = _attrOwnerNature;
        var predicate = _predicate;
        var length = _length;
        var rangeString = _authorizedValues;
        var rangeList = [];
        if (rangeString && rangeString.includes(';'))
          rangeList = rangeString.split(';');
        rangeList = rangeList.map(string => string.trim());
        rangeList = rangeList.filter(function(item) {
          return item != ""
        });

        // Nls For Ranges
        var nlsRangeList = {};
        rangeList.forEach((item, i) => {
          if (_mapNlsForRange) {
            var currRangNlsObj = _mapNlsForRange.get(item);
            Object.keys(currRangNlsObj).forEach((key, i) => {
              if (currRangNlsObj[key].length == 0) {
                delete currRangNlsObj[key];
              }
            });
            nlsRangeList[item] = currRangNlsObj;
          }
        });

        var defaultValue = _defaultValue;
        var userAccess = _userAccess;
        var multiValue = _multiValue;
        var multiLine = _multiLine;
        var searchable = _searchable;
        var resetWhenDuplicated = _resetWhenDuplicated;
        var resetWhenVersioned = _resetWhenVersioned;
        var export3DXML = _export3DXML;
        var hasDefault = _hasDefault;
        var nlsObject = _NLSObject;
        var dimension = _dimension;
        var manipUnit = _manipUnit;

        var attribute = {};
        attribute["Name"] = attrName;
        attribute["Nature"] = "Attribute";
        attribute["Description"] = "";
        attribute["Type"] = attrNature;
        //attribute["Owner"] = attrOwner;
        //attribute["Local"] = this.isIRPC(attrOwner, this.getKeyToReadOnDico(attrOwnerNature)) ? "Yes" : "No";
        if (this.isIRPC(attrOwner, this.getKeyToReadOnDico(attrOwnerNature))) {
          attribute["Local"] = "Yes";
          attribute["Owner"] = attrOwner;
        } else {
          attribute["Local"] = "No";
          attribute["Owner"] = "";
        }
        if (length != undefined && length != "0" && attrNature == "String")
          attribute["MaxLength"] = length;
        if (resetWhenDuplicated != undefined)
          attribute["ResetOnClone"] = resetWhenDuplicated ? "Yes" : "No";
        if (resetWhenVersioned != undefined)
          attribute["ResetOnRevision"] = resetWhenVersioned ? "Yes" : "No";
        if (multiValue != undefined)
          attribute["MultiValuated"] = multiValue ? "Yes" : "No";
        if (multiLine != undefined)
          attribute["MultiLine"] = multiLine ? "Yes" : "No";
        attribute["Protection"] = "Free";
        attribute["HasRangeDefined"] = "No";
        attribute["Default"] = defaultValue;
        attribute["UIAccess"] = userAccess;
        attribute["Indexation"] = searchable ? "Yes" : "No";
        attribute["V6Exportable"] = export3DXML ? "Yes" : "No";
        // S63 02/08/2022 FUN114519 : new statement hasDefault
        if(hasDefault!==undefined){
          if(!hasDefault)
            attribute["HasDefault"] = "No";
        }
        if (predicate != undefined) {
          attribute["SixWPredicate"] = predicate;
        }
        if (rangeList.length > 0) {
          attribute["HasRangeDefined"] = "Yes";
          attribute["AuthorizedValues"] = rangeList;
          attribute["AuthorizedValuesNLS"] = nlsRangeList;
        }
        if (dimension.length > 0) {
          attribute["HasMagnitude"] = "Yes";
          attribute["Dimension"] = dimension;
          attribute["ManipulationUnit"] = manipUnit;
        }
        attribute["NameNLS"] = nlsObject;
        if(hasDefault===false || multiValue==="Yes")
            attribute['Default']="";

        return attribute;
      },

      /**
       * buildAttrForModif - description
       *
       * @param  {type} ownerId     description
       * @param  {type} ownerNature description
       * @param  {type} attributeId description
       * @param  {type} modifObj    description
       * @return {type}             description
       */
      buildAttrForModif: function(ownerId, ownerNature, attributeId, modifObj) {
        var key = this.getKeyToReadOnDico(ownerNature);
        var attributesList = this.getAttributes(key, ownerId, "No");
        var attrToModif = attributesList.filter(item => item.Name == attributeId)[0];
        var cloneAtt = UWA.clone(attrToModif);
        /*Object.keys(modifObj).forEach(function(item){
              if(cloneAtt[item] != modifObj[item]){
                    cloneAtt[item]=modifObj[item];
              }
        });*/
        // Change 10/12/2020 : MFL BMN2 : Now Mamadou needs only the modified informations
        // so we remove all useless informations.
        Object.keys(cloneAtt).forEach(function(item) {
          if (item != "Name" && item != "Nature" && item != "Type" && item != "Owner" && item != "Local" && item != "NameNLS" && item != "AuthorizedValuesNLS" && item != "DMSStatus") {
            delete cloneAtt[item];
          }
        });
        UWA.extend(cloneAtt, modifObj, true);
        if (cloneAtt.hasOwnProperty("AuthorizedValues") && cloneAtt["AuthorizedValues"].length > 0) {
          cloneAtt["HasRangeDefined"] = "Yes";
          if (attrToModif.hasOwnProperty("AuthorizedValues")) {
            cloneAtt.AuthorizedValues.forEach((temp, i) => {
              if (attrToModif.AuthorizedValues.includes(temp) === false) {
                cloneAtt.AuthorizedValues[i] = "add:" + temp
              }
            });
          } else {
            cloneAtt.AuthorizedValues.forEach((temp, i) => {
              cloneAtt.AuthorizedValues[i] = "addFirst:" + temp
            });
          }
        }
        if((cloneAtt.hasOwnProperty('HasDefault') && cloneAtt['HasDefault']==="No")||(cloneAtt.hasOwnProperty('MultiValuated') && cloneAtt['MultiValuated']==="Yes"))
            cloneAtt["Default"] = "";
        /*else {
                 cloneAtt["HasRangeDefined"] = "No";
               }*/
        console.log(cloneAtt);
        return cloneAtt;
      },

      buildTypeForModif: function(aTypeId, aTypeNature, aIconObj, aNLSObj,_instance) {
        var typeToModif = this.getAgregatorByNameAndNature(aTypeId, aTypeNature);
        
        // BMN2 28/01/2021 : IR-815220-3DEXPERIENCER2021x
        // We only send modified and mandatory properties. Otherwise we remove all others properties.
        var result = {
          'Name': typeToModif['Name'],
          'Nature': typeToModif['Nature'],
          'Package': typeToModif['Package'],
          'DMSStatus': typeToModif['DMSStatus'],
          'NameNLS': aNLSObj || typeToModif['NameNLS'],
          'IconLarge': (aIconObj || typeToModif).IconLarge,
          'IconNormal': (aIconObj || typeToModif).IconNormal,
          'IconSmall': (aIconObj || typeToModif).IconSmall
        }
        
        //S63 FUN124741 un type devra peut être pouvoir avoir plusieurs instances
        if(Array.isArray(_instance)) {
          if(_instance.length!==0) {
            var instanceList = [];
            var instances;
            _instance.forEach(function(item){
              if(item['element'])
              instanceList.push(item['element']['Name']);
            })
            instances = instanceList.join(";");
            if(instances!==""){
              result['CreateInstName'] = instances;
            }
          }
        } 
        else {
          console.error("buildTypeForModif method must have array parameter for instName");
          if(_instance!==undefined) {
            result['CreateInstName'] = _instance['Name'];
          }
        }
        return result;
      },

      isNameExisting: function(name, nature) {
        var data = this.mergeDico;
        var that = this;
        var exist = false;
        // BMN2 10/09/2021 : Change the loop from "forEach" to "every"
        // to break the loop using the "return false" statement which is not possible with "forEach".
        Object.keys(data['Dictionary'][nature]).every(function(item) {
          if (that.getDisplayName(data['Dictionary'][nature][item]['Name']) == name) {
            exist = true;
            return false;
          }
          return true;
        });
        return exist;
      },
      // BMN2 09/09/2021 : IR-825343-3DEXPERIENCER2022x
      isNameExistingForAttr: function(name) {
        var data = this.mergeDico;
        var that = this;
        var exist = false;
        let attrNameList = [];
        // we check among every node (Type, extension etc)
        // if an attribute exist with same name.
        Object.keys(data['Dictionary']).every((nature, n) => {
          Object.keys(data['Dictionary'][nature]).every((item, i) => {
            let elem = data['Dictionary'][nature][item];
            if (elem.hasOwnProperty('Attributes')) {
              var attrList = Object.keys(elem['Attributes']);
              if (Array.isArray(attrList)) {
                attrList.every(function(iElement) {
                  var attr = elem['Attributes'][iElement];
                  if (attr.hasOwnProperty('Name') && name == that.getDisplayName(attr.Name)) {
                    exist = true;
                    return false;
                  }
                  return true;
                });
              }
            };
            if (exist) {
              return false;
            }
            return true;
          });
          if (exist) {
            return false;
          }
          return true;
        });
        return exist;
      },
      checkNameValue: function(aValue) {

      },



      addExtendingInterfaces: function(name, nature, scopeName) {
        var data = this.dicoJson;
        if (!data['Dictionary'][nature][name]) {
          nature = "Relationships";
        }
        /*if(!data['Dictionary'][nature][name]){
        	nature = "Types";
        	data = this.dicoOOTB;
        }
        if(!data['Dictionary'][nature][name]){
        	nature = "Relationships";
        }*/
        var extInter = [];
        if (data['Dictionary'][nature][name]) {
          if (data['Dictionary'][nature][name]['ExtendingInterfaces'])
            extInter = data['Dictionary'][nature][name]['ExtendingInterfaces'];
          if (extInter.indexOf(scopeName) == -1) {
            extInter.push(scopeName);
            data['Dictionary'][nature][name]['ExtendingInterfaces'] = extInter;
          }
        }
      },

      hadToRemoveExtendingInterfaces: function(name, nature, scopeName) {
        var data = this.dicoJson;
        if (!data['Dictionary']["Interfaces"][name]) {
          data = this.dicoOOTB;
        }
        if (data['Dictionary']["Interfaces"][name] && data['Dictionary']["Interfaces"][name][nature] && data['Dictionary']["Interfaces"][name][nature][scopeName])
          return false;
        else return true;
      },

      updateAllExtendingInterfaces: function() {
        var data = this.dicoJson;
        var that = this;
        var dataMerge = this.mergeDico;
        Object.keys(data['Dictionary']["Interfaces"]).forEach(function(item) {
          var extName = item;
          if (!extName.startsWith("XP_")) {
            if (data['Dictionary']["Interfaces"][extName]["ScopeTypes"] != undefined) {
              Object.keys(data['Dictionary']["Interfaces"][extName]["ScopeTypes"]).forEach(function(item) {
                that.addExtendingInterfaces(data['Dictionary']["Interfaces"][extName]["ScopeTypes"][item], "Types", extName);
              });
            }
            if (data['Dictionary']["Interfaces"][extName]["ScopeRelationships"] != undefined) {
              Object.keys(data['Dictionary']["Interfaces"][extName]["ScopeRelationships"]).forEach(function(item) {
                that.addExtendingInterfaces(data['Dictionary']["Interfaces"][extName]["ScopeRelationships"][item], "Relationships", extName);
              });
            }
          }
        });
        Object.keys(dataMerge['Dictionary']["Types"]).forEach(function(item) {
          var typeName = item;
          var extInter = dataMerge['Dictionary']["Types"]['ExtendingInterfaces'];
          if (extInter != undefined) {
            for (var index = 0; i < extInter.length; index++) {
              if (that.hadToRemoveExtendingInterfaces(extInter[index], "ScopeTypes", typeName)) {
                dataMerge['Dictionary']["Types"][typeName]['ExtendingInterfaces'].splice(dataMerge['Dictionary']["Types"][typeName]['ExtendingInterfaces'].indexOf(extInter[index], 1));
                if (that.dicoJson['Dictionary']["Types"][typeName]) {
                  that.dicoJson['Dictionary']["Types"][typeName]['ExtendingInterfaces'].splice(that.dicoJson['Dictionary']["Types"][typeName]['ExtendingInterfaces'].indexOf(extInter[index], 1));
                } else if (that.dicoOOTB['Dictionary']["Types"][typeName]) {
                  that.dicoOOTB['Dictionary']["Types"][typeName]['ExtendingInterfaces'].splice(that.dicoOOTB['Dictionary']["Types"][typeName]['ExtendingInterfaces'].indexOf(extInter[index], 1));
                }
              }
            }
          }
        });
        Object.keys(dataMerge['Dictionary']["Relationships"]).forEach(function(item) {
          var relName = item;
          var extInter = dataMerge['Dictionary']["Relationships"]['ExtendingInterfaces'];
          if (extInter != undefined) {
            for (var index = 0; i < extInter.length; index++) {
              if (that.hadToRemoveExtendingInterfaces(extInter[index], "ScopeRelationships", relName)) {
                dataMerge['Dictionary']["Relationships"][relName]['ExtendingInterfaces'].splice(dataMerge['Dictionary']["Relationships"][relName]['ExtendingInterfaces'].indexOf(extInter[index], 1));
                if (that.dicoJson['Dictionary']["Relationships"][relName]) {
                  that.dicoJson['Dictionary']["Relationships"][relName]['ExtendingInterfaces'].splice(that.dicoJson['Dictionary']["Relationships"][relName]['ExtendingInterfaces'].indexOf(extInter[index], 1));
                } else if (that.dicoOOTB['Dictionary']["Types"][typeName]) {
                  that.dicoOOTB['Dictionary']["Relationships"][relName]['ExtendingInterfaces'].splice(that.dicoOOTB['Dictionary']["Relationships"][relName]['ExtendingInterfaces'].indexOf(extInter[index], 1));
                }
              }
            }
          }
        });
        pSkeleton.updateEI = true;
      },
      getChildren: function(name, nature) {
        var key = this.getKeyToReadOnDico(nature);
        var data = this.dicoJson['Dictionary'][key] || {};
        return Object.values(data).filter(item => item.Parent===name)
      },
      hadChildren: function(name, nature) {
        var key = this.getKeyToReadOnDico(nature);
        var data = this.dicoJson['Dictionary'][key] || {};
        return !!Object.values(data).find(item => item.Parent===name)
      },
      isScopeTarget: function(name, nature) {
        var data = this.dicoJson;
        var isTargeted = false;
        var scopeField;
        if (nature === "Type") {
          scopeField = "ScopeTypes";
        } else if (nature === "Relationship") {
          scopeField = "ScopeRelationships";
        }
        Object.keys(data['Dictionary']['Interfaces']).forEach(function(item) {
          if (data['Dictionary']['Interfaces'][item][scopeField]) {
            for (var i = 0; i < data['Dictionary']['Interfaces'][item][scopeField].length; i++) {
              if (data['Dictionary']['Interfaces'][item][scopeField][i] === name) {
                isTargeted = true;
              }
            }
          }
        });
        return isTargeted;
      },

    };

    return new DicoHandler();
  });

/**
 * @module DS/DMSApp/Models/InterfaceModel
 */
define('DS/DMSApp/Models/InterfaceModel',
 ['UWA/Core',
  'UWA/Class',
  'UWA/Class/Model',
  'WebappsUtils/WebappsUtils',
  'DS/DMSApp/Utils/dictionaryJSONHandler'],
 function(UWA, Class, Model, WebappsUtils, dicoHandler) {

    'use strict';

    return Model.extend({
      defaults: function() {
        //UWA.log("TypeModel::setDefault");
        //UWA.log(this);
        return {
          //Metadata associated with the model returned
          //Every model must specify an ID
          id: 'default',
          //Title and Image are properties that can be displayed in the Tile Object
          title: 'not found',
          subtitle: '',
          content: '',
          image: '', //WebappsUtils.getWebappsAssetUrl('DMSApp',"GroupAttrIcon.png"),
          //Additional Properties for the IDCard
          ownerName: 'Owner',
          //date           : ,
          Description: '',

        };
      },
      setup: function() {

      },
      parse: function(response, options) {
        //UWA.log("TypeModel::parse");
        var that = this;
        var resultat;
       var internalName = response['Name'];
       var externalName = dicoHandler.getDisplayName(internalName);
        var nls_Option = widget.getValue("DisplayOption");
        if(nls_Option ==="NLSOption")
        {
          externalName = dicoHandler.getNLSName(internalName,response["Nature"]);
        }
        /*var key = [];
        if(response.hasOwnProperty('Attributes')){
           key = Object.keys(response['Attributes']);
        }*/
        var attributes = [];
        if(response['Attributes']) {
         var key = Object.keys(response['Attributes']);
         if (Array.isArray(key)) {
           key.forEach(function(iElement) {
             attributes.push(response['Attributes'][iElement]);
           });
         }
        }
        resultat = {
         //Metadata associated with the model returned
         //Every model must specify an ID
         id: internalName,
         //Title and Image are properties that can be displayed in the Tile Object
          title: externalName,
          //Additional Properties for data model
          isAbstract: response['Abstract'],
          attributes: attributes,
          nature: response['Nature'],
          Package: response['Package'],
          Description: response['Description']?response['Description']:"",
          handler: function() {
            that.dispatchEvent('onActionClick', [that, {model:action}, arguments[0]]);
        }
        };

          this.fillInterfaceObject(resultat,response);

        return resultat;
      },
      sync: function(method, model, options) {
        //UWA.log(this);
        var id, attrs, idAttrName, resp, errorMessage;
        if (method === 'create' || method === 'update' || method === 'patch') {
          attrs = model.toJSON(options);
        }
        id = model.id;
        idAttrName = model.idAttribute;
      },
      /*onAnyEvent : function(eventName,model,collection,options){
       if(eventName==='onAdd' && collection.tool!=="type") {
         //console.log("Model : "+ eventName);
         var nestedView = pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()).contentsViews.tile.nestedView;
         if(nestedView.visibleItems.length>0)
           nestedView.getChildView(model).container.getElementsByClassName('tile-content')[0].title=model.get('scopes').toLocaleString();
       }
      },*/
     fillInterfaceObject: function(resultat, response) {
       var scopes = [];
       var internalNameScopes = [];
       if(response['ScopeTypes'] !== undefined) {
         scopes = response['ScopeTypes'];
         response['ScopeTypes'].forEach(function(scopeType) {
           internalNameScopes.push(" "+dicoHandler.getDisplayName(scopeType));
         })
         if(response['ScopeRelationships'] !== undefined) {
           scopes = scopes.concat(response['ScopeRelationships']);
           response['ScopeRelationships'].forEach(function(scopeRel) {
             internalNameScopes.push(" "+dicoHandler.getDisplayName(scopeRel));
           })
         }
       }
       else if(response['ScopeRelationships'] !== undefined) {
         scopes = response['ScopeRelationships'];
         response['ScopeRelationships'].forEach(function(scopeRel) {
           internalNameScopes.push(" "+dicoHandler.getDisplayName(scopeRel));
         })
       }
        resultat['image'] = WebappsUtils.getWebappsAssetUrl('DMSApp', "GroupAttrIcon.png");
        resultat['ownerName'] = response['Name'];
        resultat['scopes'] = scopes;
        resultat['automatic'] = response['Automatic'];
        resultat['ScopeTypes'] = response['ScopeTypes']?response['ScopeTypes']:[];
        resultat['ScopeRelationships'] = response['ScopeRelationships']?response['ScopeRelationships']:[];
        resultat['subtitle'] = internalNameScopes.length>1 ? "<span title='"+internalNameScopes+"'>"+internalNameScopes[0]+", ...</span>" : internalNameScopes[0];
       // resultat['subtitle'] = "Automatic : "+response['Automatic'];
     }

    });
});

define('DS/DMSApp/Utils/DMSWebServices',
  [
    'UWA/Class',
    'DS/WAFData/WAFData',
    'DS/DMSApp/Utils/URLHandler',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
    "DS/FedDictionaryAccess/FedDictionaryAccessAPI",
    'UWA/Promise'
  ],
  function(Class, WAFData, URLHandler, NLS, FedDictionaryAccessAPI, Promise) {
    'use strict';

    var DMSWebServices = Class.singleton({

      // Constructor
      init: function() {
        this._parent({});
      },

      getDicoJson: function(onSuccess, onError) {
        console.log("DMSApp:getDicoJson");
        var params = [];
        var langCode = widget.lang;
        if (langCode == "zh") {
          langCode = "zh_CN";
        }
        params.push("lang=" + langCode);
        var path = "/resources/dictionary/DictionaryOOTB";
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
          'SecurityContext': URLHandler.getSecurityContext()
        };
        /*if (securityContext) {
              headers.SecurityContext = securityContext.SecurityContext;
          }*/

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'GET',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          //data: JSON.stringify(data),
          type: 'json',
          onComplete: function(payload) {
            console.log("getDicoJson:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("fail");
            console.log(this);
            var message = object;
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      isDMSAccessible: function(onSuccess, onError) {
        console.log("DMSApp:isDMSAccessible");
        var path = '/resources/dictionary/isDMSAccessible';
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
        };
        /*if (securityContext) {
                headers.SecurityContext = securityContext.SecurityContext;
            }*/

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path);
        WAFData.authenticatedRequest(fullPath, {
          method: 'GET',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          //data: JSON.stringify(data),
          type: 'json',
          onComplete: function(payload) {
            console.log("isDMSAccessible:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("fail");
            console.log(this);
            var message = object;
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.Message) {
                message = data.error.Message;
              } else if (data.message) {
                message = data.Message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      aggregatorCreate: function(data, nature, onSuccess, onError) {
        console.log("DMSApp:aggregatorCreate");
        var params = [];
        params.push("nature=" + nature);
        var path = '/resources/dictionary/AggregatorCreate';
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
        };
        /*if (securityContext) {
              headers.SecurityContext = securityContext.SecurityContext;
          }*/

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'POST',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          data: JSON.stringify(data),
          type: 'json',
          onComplete: function(payload) {
            console.log("aggregatorCreate:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("aggregatorCreate:onFailure");
            console.log(this);
            if (typeof data === "string")
              data = JSON.parse(data);
            var message = data['DictionaryException']['Message'];
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      aggregatorModify: function(data, nature, onSuccess, onError) {
        console.log("DMSApp:aggregatorModify");
        var params = [];
        params.push("nature=" + nature);
        var path = '/resources/dictionary/AggregatorModify';
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
        };
        /*if (securityContext) {
              headers.SecurityContext = securityContext.SecurityContext;
          }*/

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'POST',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          data: JSON.stringify(data),
          type: 'json',
          onComplete: function(payload) {
            console.log("aggregatorModify:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("aggregatorModify:onFailure");
            console.log(this);
            if (typeof data === "string")
              data = JSON.parse(data);
            var message = data['DictionaryException']['Message'];
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      aggregatorDelete: function(data, nature, onSuccess, onError) {
        console.log("DMSApp:aggregatorDelete");
        var params = [];
        params.push("nature=" + nature);
        var path = '/resources/dictionary/AggregatorDelete';
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
        };
        /*if (securityContext) {
              headers.SecurityContext = securityContext.SecurityContext;
          }*/

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'POST',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          data: JSON.stringify(data),
          type: 'json',
          onComplete: function(payload) {
            console.log("aggregatorDelete:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("aggregatorDelete:onFailure");
            console.log(this);
            if (typeof data === "string")
              data = JSON.parse(data);
            var message = data['DictionaryException']['Message'];
            if (data && typeof data === 'object') { // null = 'object'
              if (data.hasOwnProperty("DictionaryException")) {
                const excep = data.DictionaryException;
                const {
                  Status,
                  Message
                } = excep
                if ((Status.contains("403") || Status.contains("500")) && (Message.contains("threshold") || Message.contains("#1400005: Object has references"))) {
                  message = NLS.DeleteAggregatorErrHasObjects
                } else {
                  message = data.DictionaryException.Message;
                }
              } else {
                message = NLS.DeleteAggregatorGenericErr;
              }

              /*if (data.error && data.error.message) {
    						message = data.error.message;
    					}
    					else if (data.message) {
    						message = data.message;
    					}*/
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },
      attributeDelete: function(attrToDel, onSuccess, onError) {

        console.log("DMSApp:aggregatorDelete");
        const path = '/resources/dictionary/AttributeDelete';
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
        };
        const fullPath = this.get3DSpaceWSUrl(path);
        const myPath = URLHandler.getURL() + "/resources/dictionary/AttributeDelete";
        WAFData.authenticatedRequest(
          myPath, {
            timeout: 500000,
            'method': 'POST',
            'type': 'json',
            'data': JSON.stringify(attrToDel),
            headers: headers,
            'onComplete': function(payload) {
              onSuccess(payload);
            },
            'onFailure': function(object, data, responseStatus) {
              const resp = data;
              let message = "";
              if (resp && typeof resp === 'object') { // null = 'object'
                if ('DictionaryException' in resp) {
                  const excep = resp.DictionaryException;
                  const {
                    Status,
                    Message
                  } = excep
                  if ((Status.contains("403") || Status.contains("500")) && (Message.contains("threshold") || Message.contains("#1400005: Object has references"))) {
                    message = NLS.DeleteAggregatorErrHasObjects
                  } else {
                    message = data.DictionaryException.Message;
                  }
                } else {
                  message = NLS.DeleteAggregatorGenericErr;
                }
              }
              onError(message);
            }
          }
        );
      },

      get3DSpaceWSUrl: function(webservice, params) {
        var tenant = URLHandler.getTenant();
        if (tenant == null || tenant == undefined || tenant == "")
          tenant = "OnPremise";
        var path = URLHandler.getURL() + webservice + '?tenant=' + tenant;
        if (params) {
          params.forEach(function(param) {
            path = path + '&' + param;
          });
        }
        return path;
      },
      getOotbNLS: function(onSuccess, onError) {
        console.log("DMSApp:getOotbNLS");
        var params = [];
        var langCode = widget.lang;
        if (langCode == "zh") {
          langCode = "zh_CN";
        }
        params.push("lang=" + langCode);
        var path = '/resources/dictionary/DictionaryOOTBNLS';
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
        };
        /*if (securityContext) {
                headers.SecurityContext = securityContext.SecurityContext;
            }*/

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'GET',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          //data: JSON.stringify(data),
          type: 'json',
          onComplete: function(payload) {
            console.log("getOotbNLS:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("getOotbNLS:onFailure");
            console.log(this);
            if (typeof data === "string")
              data = JSON.parse(data);
            var message = data['DictionaryException']['Message'];
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },
      getCustoDicoWithNLSUptoDate: function(onSuccess, onError) {
        console.log("DMSApp:getCustoNLS");
        var params = [];
        params.push("lang=" + "en;fr;de;ja;ko;ru;zh_CN");
        params.push("maxAge=0");
        var path = '/resources/dictionary/DictionaryCUSTO';
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
        };
        /*if (securityContext) {
                headers.SecurityContext = securityContext.SecurityContext;
            }*/

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'GET',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          //data: JSON.stringify(data),
          type: 'json',
          onComplete: function(payload) {
            console.log("getCustoNLS:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("getCustoNLS:onFailure");
            console.log(this);
            if (typeof data === "string")
              data = JSON.parse(data);
            var message = data['DictionaryException']['Message'];
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },
      getPredicates: function(onSuccess, onError) {
        var rdfPredicateServiceObj = new Promise(function(resolve, reject) {
          var ontologyServiceObj = {
            onComplete: function(result) {
              UWA.log("Got a predicates result!" + result);
              //resolve(result);
              onSuccess(result);

            },
            onFailure: function(errorMessage) {
              UWA.log("predicates service request Fail!" + errorMessage);
              //reject(errorMessage);
              onError(errorMessage);
            },
            tenantId: URLHandler.getTenant(),
            lang: widget.lang,
            apiVersion: "R2019x",
            onlyMappable: true //IR-619053-3DEXPERIENCER2019x
          };
          FedDictionaryAccessAPI.getFedProperties(ontologyServiceObj);
        });
      },
      getDimensions: function(onSuccess, onError) {
        console.log("DMSApp:getCustoNLS");
        var params = [];
        var path = '/resources/dictionary/dimensions';
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
        };
        /*if (securityContext) {
        				headers.SecurityContext = securityContext.SecurityContext;
        		}*/

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'GET',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          //data: JSON.stringify(data),
          type: 'json',
          onComplete: function(payload) {
            console.log("getCustoNLS:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("getCustoNLS:onFailure");
            console.log(this);
            var message = object;
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      launchExport: function(onSuccess, onError) {
        console.log("DMSApp:launchExport");
        var params = [];
        params.push("lang=" + widget.lang);
        var path = "/resources/dictionary/ExportData";
        var headers = {
          'Accept': 'application/zip',
          'Content-Type': 'application/zip',
          'Accept-Language': widget.lang,
          'SecurityContext': URLHandler.getSecurityContext()
        };


        var options = DMSWebServices.options;
        var fullPath = DMSWebServices.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'GET',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          type: 'blob',
          onComplete: function(payload, Obj, request) {
            console.log("launchExport:onComplete");
            onSuccess(payload, request);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("launchExport:fail");
            console.log(this);
            if (typeof data === "string")
              data = JSON.parse(data);
            var message = data['DictionaryException']['Message'];
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      launchImport: function(data, onSuccess, onError) {
        console.log("DMSApp:launchImport");
        var params = [];
        params.push("lang=" + widget.lang);
        var path = "/resources/dictionary/ImportData";
        var headers = {
          'Accept': 'multipart/form-data',
          //'Content-Type': 'multipart/form-data',
          'Accept-Language': widget.lang,
          'SecurityContext': URLHandler.getSecurityContext()
        };

        var options = DMSWebServices.options;
        var fullPath = DMSWebServices.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'POST',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          //type : 'application/zip',
          type: 'multipart/form-data',
          data: data,
          onComplete: function(payload) {
            console.log("launchImport:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("launchImport:fail");
            console.log(this);
            if (typeof data === "string")
              data = JSON.parse(data);
            var message = data['DictionaryException']['Message'];
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      launchBRImport: function(isProd, collabSpace, data, onSuccess, onError) {
        console.log("DMSApp:launchBRImport");
        var params = [];
        //params.push("lang="+widget.lang);
        var path = "/resources/datasetup_ws/ImportZIP";
        if (!isProd) params.push("withAuthoring=true");
        var securityContext = URLHandler.getSecurityContext();
        if (!isProd) securityContext = collabSpace;

        var headers = {
          //'Accept': 'multipart/form-data',
          //'Accept-Language': widget.lang,
          //'Content-Type': 'multipart/form-data',
          'SecurityContext': securityContext
        };
        var options = DMSWebServices.options;
        var fullPath = DMSWebServices.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'POST',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          //type : 'application/zip',
          type: 'multipart/form-data',
          data: data,
          onComplete: function(payload) {
            console.log("launchImport:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("launchImport:fail");
            console.log(this);
            //IR-824489-3DEXPERIENCER2021x S63 this is the way sgq raised error
            if (typeof data === "string")
              data = JSON.parse(data);
            var message = data['message_key'];

            /*if (data !== null && data !== undefined) {
                if (data.contains("message_key"))
                    message = data.substring(16, data.length - 2);
                else if (typeof data === 'object') { // null = 'object'
                    if (data.error && data.error.message) {
                        message = data.error.message;
                    }
                    else if (data.message) {
                        message = data.message;
                    }
                }
            }
            else if (typeof object === 'string') {
                if (object.startsWith('NetworkError:')) {
                    if (object.endsWith('return ResponseCode with value "0".')) {
                        message = NLS.noConnection; // "There is no Internet connection."
                    }
                    else if (object.endsWith('return ResponseCode with value "401".') ||
                        object.endsWith('return ResponseCode with value "403".')) {
                        message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                    }
                    else {
                        message = NLS.webServiceError; // An error is returned from web service.
                    }
                }
                else if (object === 'null') {
                    message = NLS.webServiceError; // An error is returned from web service.
                }
            }*/
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      launchUpdateIndex: function(onSuccess, onError) {
        console.log("DMSApp:launchUpdateIndex");
        var params = [];
        params.push("lang=" + widget.lang);
        var path = "/resources/dictionary/UpdateIndex";
        var headers = {
          'Accept-Language': widget.lang,
          'SecurityContext': URLHandler.getSecurityContext()
        };


        var options = DMSWebServices.options;
        var fullPath = DMSWebServices.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'POST',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          onComplete: function(payload) {
            console.log("launchUpdateIndex:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("launchUpdateIndex:fail");
            console.log(this);
            var message = data;
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      getUpdateIndexInfo: function(onSuccess, onError) {
        var params = [];
        params.push("lang=" + widget.lang);
        var path = "/resources/dictionary/GetUpdateIndexModelStatusForDMS";
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
          'SecurityContext': URLHandler.getSecurityContext()
        };

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path, params);
        WAFData.authenticatedRequest(fullPath, {
          method: 'GET',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          type: 'json',
          onComplete: function(payload, Obj, request) {
            console.log("getDicoJson:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("fail");
            console.log(this);
            var message = object;
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.message) {
                message = data.error.message;
              } else if (data.message) {
                message = data.message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            onError("timeout");
          },
        });
      },

      canBeModified: function(data, onSuccess, onError) {
        console.log("DMSApp:canBeModified");
        var path = '/resources/dictionary/canBeModified';
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': widget.lang,
        };
        /*if (securityContext) {
                headers.SecurityContext = securityContext.SecurityContext;
            }*/

        var options = this.options;
        var fullPath = this.get3DSpaceWSUrl(path);
        WAFData.authenticatedRequest(fullPath, {
          method: 'POST',
          headers: headers,
          timeout: 1000 * 60 * 30, // ms, 30mn
          data: JSON.stringify(data),
          type: 'json',
          onComplete: function(payload) {
            console.log("canBeModified:onComplete");
            onSuccess(payload);
          },
          onFailure: function(object, data, responseStatus) {
            console.log("fail");
            console.log(this);
            var message = object;
            if (data && typeof data === 'object') { // null = 'object'
              if (data.error && data.error.Message) {
                message = data.error.Message;
              } else if (data.message) {
                message = data.Message;
              }
            } else if (typeof object === 'string') {
              if (object.startsWith('NetworkError:')) {
                if (object.endsWith('return ResponseCode with value "0".')) {
                  message = NLS.noConnection; // "There is no Internet connection."
                } else if (object.endsWith('return ResponseCode with value "401".') ||
                  object.endsWith('return ResponseCode with value "403".')) {
                  message = NLS.unauthorized; // "You are unauthorized to access the resource, please refresh the webpage to login and try again."
                } else {
                  message = NLS.webServiceError; // An error is returned from web service.
                }
              } else if (object === 'null') {
                message = NLS.webServiceError; // An error is returned from web service.
              }
            }
            onError(message);
          },
          onTimeout: function() {
            UWA.log("canBeModified:timeout");
          },
        });
      },
      /*postIcon: function(data,onSuccess,onError){

      	console.log("DMSApp:aggregatorDelete");
      	const path = '/resources/v1/bps/custoicon/type/icons/encoded';
      	var headers = {
      			'Accept': 'application/json',
      			'Content-Type': 'application/json',
      			'Accept-Language': widget.lang,
      	};

      	const fullPath = this.get3DSpaceWSUrl(path);
      	//const myPath = URLHandler.getURL() + "/resources/dictionary/AttributeDelete";
      	WAFData.authenticatedRequest(
      		fullPath, {
      			timeout: 1000*60*30,
      			method: 'POST',
      			type: 'json',
      			data: JSON.stringify(data),
      			headers: headers,
      			'onComplete': function(payload) {
      				onSuccess(payload);
      			},
      			'onFailure': function(object,data,responseStatus) {
      				const resp = data;
      				let message = "";
      				if (resp && typeof resp === 'object') {// null = 'object'
      					if('DictionaryException' in resp){
      						const excep = resp.DictionaryException;
      						const {Status,Message} = excep
      						if((Status.contains("403") || Status.contains("500")) && (Message.contains("threshold") || Message.contains("#1400005: Object has references"))){
      							message = NLS.DeleteAggregatorErrHasObjects
      						}
      						else{
      							message = data.DictionaryException.Message;
      						}
      					}
      					else {
      						message = NLS.DeleteAggregatorGenericErr;
      					}
      				}
      				onError(message);
      			}
      		}
      	);
      },*/
    });

    return DMSWebServices;
  });

define('DS/DMSApp/Views/ToolsLayoutView',
    [
        'UWA/Core',
        'UWA/Promise',
        'UWA/Class/View',
        'DS/UIKIT/Modal',
        'DS/UIKIT/Scroller',
        'DS/UIKIT/Input/Select',
        'DS/UIKIT/Input/Toggle',
        'DS/UIKIT/Popover',
        'DS/DMSApp/Utils/URLHandler',
        'DS/UIKIT/Autocomplete',
        'DS/DMSApp/Views/Layouts/CustomField',
        'DS/UIKIT/Input/Button',
        'DS/UIKIT/Alert',
        'DS/DMSApp/Utils/dictionaryJSONHandler',
        'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
        'DS/WAFData/WAFData',
        'DS/UIKIT/Mask',
        'DS/DMSApp/Utils/DMSWebServices',
        'DS/UIKIT/Spinner',
        /*'DS/PlatformAPI/PlatformAPI',*/
    ],
    function (UWA, Promise, View, Modal, Scroller, Select, Toggle, Popover, URLHandler, Autocomplete, CustomField, Button, Alert, dicoHandler, myNls, WAFData, Mask, DMSWebServices, Spinner/*,PlatformAPI*/) {

        'use strict';

        var extendedView;

        extendedView = View.extend({
            tagName: 'div',
            className: 'ToolsView',

            init: function ( /*frame*/ options) {
                UWA.log('ToolsLayoutView::init');
                UWA.log(options);

                options = UWA.clone(options || {}, false);
                this.userMessaging = null;
                this._parent(options);
                this.IsInPROD = false;
                this.listOfCollabSpace = [];
                this.divUpdateIndexHistory = null;
                this.updateButton = null;
                this.importButton = null;
                this.exportButton = null;
                this.importBRButton = null;
                this.toolsScroller = null;
                this.selectCollabSpace = null;
                this.fileController = null;
                this.fileBRController = null;
            },

            setup: function (options) {
                UWA.log("ToolsLayoutView::setup");
                UWA.log(options);
                var that = this;
                UWA.log(that);
            },
            /*
            Render is the core method of a view, in order to populate its root container element, with the appropriate HTML.
            The convention is for render to always return this.
            */
            render: function () {
                UWA.log("ToolsLayoutView::render");
                var introDiv, that = this;

                this.contentDiv = UWA.createElement('div', {
                    'id': 'mainToolsDiv'
                });

                Mask.mask(this.contentDiv);

                this.userMessaging = new Alert({
                    className: 'Tools-alert',
                    closable: true,
                    visible: true,
                    renderTo: document.body,
                    autoHide: true,
                    hideDelay: 2000,
                    messageClassName: 'warning'
                });

                this.container.setContent(this.contentDiv);
                this.listenTo(this.collection, {
                    onSync: that.buildMenu
                });
                //this.buildMenu();
                return this;
            },

            buildMenu: function () {
                UWA.log("ToolsLayoutView::buildMenu");
                var that = this;
                var env = this.collection._models[0]._attributes.env;

                if (!env.contains("DEV")) this.IsInPROD = true;
                this.listOfCollabSpace = this.collection._models[0]._attributes.Scs;
                
               var divToScroll = UWA.createElement('div', {
                'id': 'to-scroll-tools',
                 });
               var div = UWA.createElement('div', {
                'class': 'container-fluid'
                 }).inject(divToScroll);;

                var divGridContent = UWA.createElement('div', {
                    'id': 'ToolsGridContent',
                }).inject(div);

                var divToolsCusto = UWA.createElement('div', {
                    'class': 'ToolsSectionHeader',
                    'id': 'ToolsCusto',
                    html: myNls.custoLabel
                }).inject(divGridContent);

                /*var divToolsIndex = UWA.createElement('div', {
                    'class': 'ToolsSectionHeader',
                    'id': 'ToolsIndex',
                    html: myNls.updateIndexLabel
                }).inject(divGridContent);*/

                var divToolsBR = UWA.createElement('div', {
                    'class': 'ToolsSectionHeader',
                    'id': 'ToolsBR',
                    html: myNls.BRLabel
                }).inject(divGridContent);

                var divImportLabel = UWA.createElement('div', {
                    'class': 'ToolsLabel',
                    'id': 'ToolsImportLabel',
                }).inject(divGridContent);

                UWA.createElement('p', {
                    text: myNls.import,
                    'class': ''
                }).inject(divImportLabel);

                var divExportLabel = UWA.createElement('div', {
                    'class': 'ToolsLabel',
                    'id': 'ToolsExportLabel',
                }).inject(divGridContent);

                UWA.createElement('p', {
                    text: myNls.export,
                    'class': ''
                }).inject(divExportLabel);

                var divUpdateIndexLabel = UWA.createElement('div', {
                    'class': 'ToolsLabel',
                    'id': 'ToolsIndexLabel',
                }).inject(divGridContent);

                UWA.createElement('p', {
                    text: myNls.indexUpdate,
                    'class': ''
                }).inject(divUpdateIndexLabel);

                /* var divExportBRLabel = UWA.createElement('div', {
                     'class': 'ToolsLabel',
                     'id': 'ToolsExportBRLabel',
                 }).inject(divGridContent);
                 
                 UWA.createElement('p', {
                     text: myNls.exportBR,
                     'class': ''
                 }).inject(divExportBRLabel);*/

                var divImportBRLabel = UWA.createElement('div', {
                    'class': 'ToolsLabel',
                    'id': 'ToolsImportBRLabel',
                }).inject(divGridContent);

                UWA.createElement('p', {
                    text: myNls.importBR,
                    'class': ''
                }).inject(divImportBRLabel);

                var divImportInfo = UWA.createElement('div', {
                    'class': 'ToolsInfo',
                    'id': 'ToolsImportInfo',
                }).inject(divGridContent);

                var popoverTooltip,
                    imgInfoSpan = UWA.createElement('span', {
                        'class': 'fonticon fonticon-info'
                    }).inject(divImportInfo);

                popoverTooltip = new Popover({
                    target: imgInfoSpan,
                    trigger: "hover",
                    animate: "true",
                    position: "top",
                    body: myNls.importToolTip,
                    title: ''
                });

                var divExportInfo = UWA.createElement('div', {
                    'class': 'ToolsInfo',
                    'id': 'ToolsExportInfo',
                }).inject(divGridContent);

                var popoverTooltip2,
                    imgInfoSpan2 = UWA.createElement('span', {
                        'class': 'fonticon fonticon-info'
                    }).inject(divExportInfo);

                imgInfoSpan2.setStyle("color", "black");

                popoverTooltip2 = new Popover({
                    target: imgInfoSpan2,
                    trigger: "hover",
                    animate: "true",
                    position: "top",
                    body: myNls.exportToolTip,
                    title: ''
                });

                var divUpdateIndexInfo = UWA.createElement('div', {
                    'class': 'ToolsInfo',
                    'id': 'ToolsUpdateIndexInfo',
                }).inject(divGridContent);

                var popoverTooltip,
                    imgInfoSpan = UWA.createElement('span', {
                        'class': 'fonticon fonticon-info'
                    }).inject(divUpdateIndexInfo);

                imgInfoSpan.setStyle("color", "black");

                popoverTooltip = new Popover({
                    target: imgInfoSpan,
                    trigger: "hover",
                    animate: "true",
                    position: "top",
                    body: myNls.indexUpdateToolTip,
                    title: ''
                });

                /*  var divExportBRInfo=UWA.createElement('div', {
                      'class': 'ToolsInfo',
                       'id': 'ToolsExportBRInfo',
                  }).inject(divGridContent);*/

                /* var popoverTooltip,
                    imgInfoSpan = UWA.createElement('span', {
                        'class' : 'fonticon fonticon-info'
                    }).inject(divExportBRInfo);
      
                imgInfoSpan.setStyle("color", "black");
      
                popoverTooltip = new Popover({
                    target   : imgInfoSpan,
                    trigger  : "hover",
                    animate  : "true",
                    position : "top",
                    body     : myNls.exportBRToolTip,
                    title    : ''
                });*/

                var divImportBRInfo = UWA.createElement('div', {
                    'class': 'ToolsInfo',
                    'id': 'ToolsImportBRInfo',
                }).inject(divGridContent);

                var popoverTooltip,
                    imgInfoSpan = UWA.createElement('span', {
                        'class': 'fonticon fonticon-info'
                    }).inject(divImportBRInfo);

                imgInfoSpan.setStyle("color", "black");

                popoverTooltip = new Popover({
                    target: imgInfoSpan,
                    trigger: "hover",
                    animate: "true",
                    position: "top",
                    body: myNls.importBRToolTip,
                    title: ''
                });

                var divBrowseFile = UWA.createElement('div', {
                    'id': 'ToolsBrowseImportFile',
                    'class': 'ToolsDivBrowseFile'
                }).inject(divGridContent);

                this.fileController = new UWA.Controls.Input.File({
                    attributes: {
                        'id': 'ImportFileInput'
                    },
                    className: 'ToolsImportFileInput xml-file-input',
                    events: {
                        onChange: function () {
                            var fileInput = document.getElementById('ImportFileInput');
                            if (fileInput.files.length === 1 && that.updateButton.isDisabled() === false) {
                            	that.importButton.setDisabled(false);
                            }
                            else that.importButton.setDisabled(true);

                        }
                    }
                }).inject(divBrowseFile);

                var divBrowseBRFile = UWA.createElement('div', {
                    'id': 'ToolsBrowseImportBRFile',
                    'class': 'ToolsDivBrowseFile'
                }).inject(divGridContent);

                this.fileBRController = new UWA.Controls.Input.File({
                    attributes: {
                        'id': 'ImportBRFileInput'
                    },
                    className: 'ToolsImportFileInput xml-file-input',
                    events: {
                        onChange: function () {
                            var fileInput = document.getElementById('ImportBRFileInput');
                            if (fileInput.files.length === 1) {
                                if (that.IsInPROD || (!that.IsInPROD && that.selectCollabSpace.getSelection(false).length === 1))
                                    that.importBRButton.setDisabled(false);
                                else that.importBRButton.setDisabled(true);
                            }
                            else that.importBRButton.setDisabled(true);
                        }
                    }
                }).inject(divBrowseBRFile);

                var divSelectCollabSpace = UWA.createElement('div', {
                    'id': 'ToolsSelectCollabSpace',
                });

                this.selectCollabSpace = new Select({
                    nativeSelect: true,
                    placeholder: myNls.collabSpaceHolder,
                    'id': 'selectCollabSpace',
                    options: [],
                })

                if (!this.IsInPROD) {
                    divSelectCollabSpace.inject(divGridContent);

                    if (this.listOfCollabSpace != undefined && this.listOfCollabSpace !== null && this.listOfCollabSpace.length !== 0) {
                        this.selectCollabSpace.inject(divSelectCollabSpace);
                        this.selectCollabSpace.addEvent("onChange", function (e) {
                            UWA.log("ToolsLayoutView::selectCollabSpace onChange");
                            var selectedCollabSpace = that.selectCollabSpace.getSelection(false);

                            if (selectedCollabSpace.length != 0) {
                                var fileInput = document.getElementById('ImportBRFileInput');
                                if (fileInput.files.length === 1) that.importBRButton.setDisabled(false);
                                else that.importBRButton.setDisabled(true);
                            }
                            else that.importBRButton.setDisabled(true);
                        });
                        var i = 0;
                        for (i = 0; i < this.listOfCollabSpace.length; i++) {
                            var option = { value: this.listOfCollabSpace[i].collabID, label: this.listOfCollabSpace[i].collabName }
                            this.selectCollabSpace.add(option);
                        }
                    }
                    else {
                        var imgClass = 'fonticon fonticon-' + '1.5' + 'x fonticon-alert';
                        var imgTitle = "No collab Space";
                        var imgSpan = UWA.createElement('span', {
                            'class': imgClass,
                            'id': "collabSpaceImgAlert",
                        }).inject(divSelectCollabSpace);

                        var collabSpaceLabel = UWA.createElement('p', {
                            text: myNls.noCollabSpaceAvailable,
                            id: "CollabSpaceAlert",
                        }).inject(divSelectCollabSpace);

                        //this.importBRButton.setDisabled(true);
                    }
                }

                this.divUpdateIndexHistory = UWA.createElement('div', {
                    'id': 'ToolsUpdateIndexHistory',
                    'class': ''
                }).inject(divGridContent);

                //Mask.mask(this.divUpdateIndexHistory);
                var divImportButton = UWA.createElement('div', {
                    'class': 'ToolsDivButton',
                    'id': 'ToolsImportButton',
                }).inject(divGridContent);

                this.importButton = new Button({
                    // value: myNls.importButton,
                    className: 'default  ToolsUploadButton',
                    icon: 'fonticon-import',
                    attributes: {
                        title: myNls.importButton
                    },
                    events: {
                        onClick: function () {
                            var fileInput = document.getElementById('ImportFileInput');
                            if (fileInput.files.length === 1) {
                                that.launchImportProcess.call(that, fileInput.files[0]);
                            } else {
                                that.userMessaging.add({ className: "warning", message: myNls.importNoInput });
                            }
                        }
                    }
                }).inject(divImportButton);

                this.importButton.setDisabled(true);

                var divExportButton = UWA.createElement('div', {
                    'class': 'ToolsDivButton',
                    'id': 'ToolsExportButton',
                }).inject(divGridContent);

                this.exportButton = new Button({
                    // value: myNls.exportButton,
                    className: 'default  ToolsButton',
                    icon: 'export',
                    attributes: {
                        title: myNls.exportButton
                    },
                    events: {
                        onClick: function () {
                            that.launchDMSExport();
                        }
                    }
                }).inject(divExportButton);

                var divUpdateIndexButton = UWA.createElement('div', {
                    'class': 'ToolsDivButton',
                    'id': 'ToolsUpdateIndexButton',
                }).inject(divGridContent);

                this.updateButton = new Button({
                    //value: myNls.updateIndexButton,
                    className: 'default  ToolsButton',
                    icon: 'archive',
                    attributes: {
                        title: myNls.updateIndexButton
                    },
                    events: {
                        onClick: function () {
                            that.launchDMSUpdateIndex();
                            /*if(!that.divUpdateIndexHistory.isHidden())
                            {
                            	var d = new Date();
                           		var user = PlatformAPI.getUser();
                            	that.setUpdateIndexInformation("OnGoing",d.toLocaleString(),"...",null,user.login,"Import");
                            }*/
                            
                        }
                    }
                }).inject(divUpdateIndexButton);

                var divImportBRButton = UWA.createElement('div', {
                    'class': 'ToolsDivButton',
                    'id': 'ToolsImportBRButton',
                }).inject(divGridContent);

                this.importBRButton = new Button({
                    className: 'default  ToolsUploadButton',
                    icon: 'fonticon-import',
                    attributes: {
                        title: myNls.importBRButton
                    },
                    events: {
                        onClick: function () {
                            var fileInput = document.getElementById('ImportBRFileInput');
                            var CollabSpace = null;
                            if (!that.IsInPROD) {
                                var CollabSpaceArray = that.selectCollabSpace.getSelection(false);
                                if (CollabSpaceArray.length === 1) CollabSpace = CollabSpaceArray[0].value;

                            }
                            if (fileInput.files.length === 1 && ((!that.IsInPROD && CollabSpace !== null) || that.IsInPROD)) {
                                that.launchImportBRProcess.call(that, that.IsInPROD, CollabSpace, fileInput.files[0]);
                            } else {
                                if (that.IsInPROD)
                                    that.userMessaging.add({ className: "warning", message: myNls.importNoInput });
                                else that.userMessaging.add({ className: "warning", message: myNls.importBRInputMissingCollabAndFile });
                            }
                        }
                    }
                }).inject(divImportBRButton);

                this.importBRButton.setDisabled(true);

                /*var divExportBRButton=UWA.createElement('div', {
                   'class': 'ToolsDivButton',
                    'id': 'ToolsExportBRButton',
               }).inject(divGridContent);*/

                /*  var exportButton = new Button({
                      value: myNls.exportBRButton,
                      className: 'default ToolsButton',
                      icon: 'export',
                      attributes: {
                          title: myNls.exportBRButton
                      },
                      events: {
                          onClick: function () {
                              
                          }
                      }
                  }).inject(divExportBRButton);*/

                var divUpdateIndexStatus = UWA.createElement('div', {
                    'id': 'ToolsDivUpdateIndexStatus',
                }).inject(that.divUpdateIndexHistory);

                var divTimeUpdate = UWA.createElement('div', {
                    'id': 'ToolsDivUpdateIndexTime',
                    'class': 'ToolsUpdateInfoDiv',
                }).inject(that.divUpdateIndexHistory);


                UWA.createElement('span', {
                    'class': 'UpdateIndexTimeInfo fonticon  fonticon-play',
                    'id': 'sartUpdateIndexIcon',
                }).inject(divTimeUpdate);

                UWA.createElement('p', {
                    // text: startedAtDateLocal,
                    id: "startUpdateIndex",
                    'class': 'UpdateIndexTimeInfo'
                }).inject(divTimeUpdate);

                UWA.createElement('span', {
                    'class': 'UpdateIndexTimeInfo fonticon  fonticon-to-end',
                    'id': 'endUpdateIndexIcon',
                }).inject(divTimeUpdate);

                UWA.createElement('p', {
                    // text: EndedAtDateLocal,
                    id: "endUpdateIndex",
                    'class': 'UpdateIndexTimeInfo',
                }).inject(divTimeUpdate);

                var divUserUpdateIndex = UWA.createElement('div', {
                    'id': 'ToolsDivUpdateIndexUser',
                    'class': 'ToolsUpdateInfoDiv',
                }).inject(that.divUpdateIndexHistory);

                UWA.createElement('span', {
                    'class': 'UpdateIndexTimeInfo fonticon  fonticon-user',
                    'id': '',
                }).inject(divUserUpdateIndex);

                UWA.createElement('p', {
                    id: "pUserReason",
                    'class': 'UpdateIndexTimeInfo',
                }).inject(divUserUpdateIndex);

                var divLastSuccessfulUpdateIndex = UWA.createElement('div', {
                    'id': 'ToolsDivUpdateIndexLastSuccess',
                    'class': 'ToolsUpdateInfoDiv',
                }).inject(that.divUpdateIndexHistory);

                var lastSuccessIcon = UWA.createElement('span', {
                    'class': 'UpdateIndexTimeInfo fonticon  fonticon-check',
                    'id': '',
                }).inject(divLastSuccessfulUpdateIndex);
                lastSuccessIcon.setStyle("color", "green");

                UWA.createElement('p', {
                    // text: "last sucessfully update : "+LastSucceededDateLocal,
                    id: "pLastUpdate",
                    'class': 'UpdateIndexTimeInfo',
                }).inject(divLastSuccessfulUpdateIndex);

                this.divUpdateIndexHistory.hide();

                this.launchGetUpdateIndexInfo();
                
                this.toolsScroller = new Scroller({
          element: divToScroll
        }).inject(this.contentDiv);

				Mask.unmask(this.contentDiv);
            },

            launchImportProcess: function (File) {
                UWA.log("ToolsLayoutView::launchImportProcess");
                var reader, importerrmsg, unabletoreadfile,
                    textType = /application\/x-zip-compressed/,
                    that = this;
                UWA.log("File.type = " + File.type);

                if (File.type.match(textType)) {
                    Mask.mask(this.contentDiv);
                    var formData = new FormData();
                    formData.append('DMSzip', File, File.fileName);
                    DMSWebServices.launchImport.call(that, formData,
                        that.onCompleteRequestImport.bind(that), that.onFailureRequestImport.bind(that));
                } else {
                    importerrmsg = myNls.importBadFileExtension;
                    that.userMessaging.add({ className: "error", message: importerrmsg }); //File not supported!
                }
            },

            onCompleteRequestImport: function (payload) {
                UWA.log("Launch DMS import complete");
                this.launchGetUpdateIndexInfo();
                Mask.unmask(this.contentDiv);
                this.userMessaging.add({ className: "success", message: myNls.importSuccess });
            },

            onFailureRequestImport: function (resp) {
                UWA.log("Failure to import DMS" + resp);
                Mask.unmask(this.contentDiv);
                var message = myNls.importFail;
                if (resp !== null && resp !== undefined && resp.length !== 0)
                    message += ": " + resp;
                this.userMessaging.add({ className: "error", message: message });
            },

            launchImportBRProcess: function (isInProd, collabSpace, File) {
                UWA.log("ToolsLayoutView::launchImportBRProcess");
                var reader, importerrmsg, unabletoreadfile,
                    textType = /application\/x-zip-compressed/,
                    that = this;
                UWA.log("File.type = " + File.type);

                if (File.type.match(textType)) {
                    Mask.mask(that.contentDiv);
                    var formData = new FormData();
                    formData.append('DMSBRzip', File, File.fileName);
                    DMSWebServices.launchBRImport.call(that, isInProd, collabSpace, formData,
                        that.onCompleteRequestImportBR.bind(that), that.onFailureRequestImportBR.bind(that));

                } else {
                    importerrmsg = myNls.importBadFileExtension;
                    that.userMessaging.add({ className: "error", message: importerrmsg }); //File not supported!
                }
            },


            onCompleteRequestImportBR: function (payload) {
                UWA.log("Launch DMS import complete");
                Mask.unmask(this.contentDiv);
                this.userMessaging.add({ className: "success", message: myNls.importBrSuccess });
            },

            onFailureRequestImportBR: function (resp) {
                UWA.log("Failure to import DMS" + resp);
                Mask.unmask(this.contentDiv);
                var message = myNls.importBrFail;
                if (resp !== null && resp !== undefined && resp.length !== 0) {
                    message += ": ";
                    if (resp == "ERR_NOT_CLOUD_CONTEXT") message += myNls.importBrNotCloudContext;
                    else if (resp == "INVALID_ZIP_FILE") message += myNls.importBRinvalidZipFile;
                    else if (resp == "INCONSISTENT_ZIP_FILE") message += myNls.importBRInconsistentZipFile;
                    else if (resp == "ERR_NOT_APPROPRIATE_CLOUD_CONTEXT") message += myNls.importBrNotAppropriateCloudContext;
                    else message += resp;
                }
                this.userMessaging.add({ className: "error", message: message });
            },


            launchDMSExport: function () {
                UWA.log("ToolsLayoutView::launchDMSExport");
                Mask.mask(this.contentDiv);
                DMSWebServices.launchExport.call(this,
                    this.onCompleteRequestExport.bind(this), this.onFailureRequestExport.bind(this));
            },

            onCompleteRequestExport: function (payload, request) {
                UWA.log("Launch DMS Export complete");
                Mask.unmask(this.contentDiv);
                var fileName = "DMSExportData.zip";
                /* var contentDisp =  request.getResponseHeader("Content-Disposition"); //unable to access to content-dispositon (unsafe attribute)
                 if(contentDisp!==undefined)
                 {
                   var fileNameIdx = contentDisp.indexOf("Filename=");
                   if(fileNameIdx!=-1 && contentDisp.length>fileNameIdx+10)
                      fileName = contentDisp.slice(fileNameIdx+10,contentDisp.length-1);
                   
                 }*/
                var a = document.createElement('a');
                a.href = window.URL.createObjectURL(payload),
                    a.download = fileName;
                a.dispatchEvent(new MouseEvent('click'));
            },

            onFailureRequestExport: function (resp) {
                UWA.log("Failure to export DMS" + resp);
                Mask.unmask(this.contentDiv);
                var message = myNls.exportFail;
               if (resp !== null && resp !== undefined && resp.length !== 0)
                    message += ": " + resp;
                this.userMessaging.add({ className: "error", message: message });
            },

            launchDMSUpdateIndex: function () {
                //Mask.mask(this.contentDiv);
                UWA.log("ToolsLayoutView::launchDMSUpdateIndex");
                DMSWebServices.launchUpdateIndex.call(this,
                    this.onCompleteRequestUpdateIndex.bind(this), this.onFailureRequestUpdateIndex.bind(this));
            },

            onCompleteRequestUpdateIndex: function (payload) {
                UWA.log("Launch DMS Update Index complete");
                this.userMessaging.add({ className: "success", message: myNls.updateIndexSuccess });
                this.launchGetUpdateIndexInfo();
                // Mask.unmask(this.contentDiv);
            },

            onFailureRequestUpdateIndex: function (resp) {
                UWA.log("Failure to update index" + resp);
                // Mask.unmask(this.contentDiv);
                var message = myNls.updateIndexFail
                if (resp !== null && resp !== undefined && resp.length !== 0)
                    message += ": " + resp;
                DMSWebServices.getUpdateIndexInfo(
                this.onCompleteRequestUpdateIndexInfo.bind(this), this.onFailureRequestUpdateIndexInfo.bind(this));
                this.userMessaging.add({ className: "error", message: message });
            },


            launchGetUpdateIndexInfo: function () {
                UWA.log("ToolsLayoutView::launchGetUpdateIndexInfo");
                var that = this;
                DMSWebServices.getUpdateIndexInfo(
                    that.onCompleteRequestUpdateIndexInfo.bind(that), that.onFailureRequestUpdateIndexInfo.bind(that));
            },


            onCompleteRequestUpdateIndexInfo: function (payload) {
                var that = this;
                UWA.log("Launch DMS import complete");
                // Mask.unmask(that.divUpdateIndexHistory);
                //get update index info
                if (payload !== null && payload !== undefined) {
                    // payload = {EndedAt: "",FailedAt: "",LastSucceeded: "2020/10/06'@'14:43:54:GMT",Reason: "Import",User: "CN1",startedAt: "2020/10/06'@'14:32:54:GMT",status: "OnGoing"};
                    //payload = { EndedAt: "2020/10/06'@'14:43:54:PDT", FailedAt: "", LastSucceeded: "2020/10/06'@'14:43:54:GMT", Reason: "Import", User: "CN1", startedAt: "2020/10/06'@'14:32:54:GMT", status: "Ended" };
                    var status = payload["status"];
                    if (status !== "OnGoing") that.updateButton.setDisabled(false);

                    var startedAt = payload["startedAt"];
                    var startedAtInt = parseInt(startedAt,10);
                    var startedAtDate = new Date (startedAtInt); 
                    var startedAtDateLocal = startedAtDate.toLocaleString();
                    
                    var EndedAtDateLocal = "..."
                    if (status === "Ended" || status === "Failed" ) {
                        var EndedAt = payload["EndedAt"];
                        var EndedAtdInt = parseInt(EndedAt,10);
                        var EndedAtDate = new Date (EndedAtdInt);
                        EndedAtDateLocal = EndedAtDate.toLocaleString();
                    }
                   
                    var User = payload["User"];
                    var Reason = payload["Reason"];
                    
                    var LastSucceeded = payload["LastSucceeded"];
                    if(LastSucceeded) {
                    	var LastSucceededInt = parseInt(LastSucceeded,10);
                    	var LastSucceededDate = new Date (LastSucceededInt); 
                    	var LastSucceededDateLocal = LastSucceededDate.toLocaleString();
                    }
                    else {
                    	var LastSucceededDateLocal = null;
                    }
                    
                    that.setUpdateIndexInformation(status, startedAtDateLocal, EndedAtDateLocal, LastSucceededDateLocal, User, Reason);
                }

            },

            onFailureRequestUpdateIndexInfo: function (resp) {
                UWA.log("Failure to retrieve update information: " + resp);
                Mask.unmask(this.contentDiv);
                this.userMessaging.add({ className: "error", message: resp});
            },


            parseDate: function (date) {
                UWA.log("ToolsLayoutView::parseDate");
                var year = date.substring(0, 4);
                var month = date.substring(5, 7);
                var day = date.substring(8, 10);
                var hours = date.substring(13, 15);
                var mins = date.substring(16, 18);
                var secondes = date.substring(19, 21);
                var parsedDate = new Date();
                var parsedDate = new Date(year + "-" + month + "-" + day + "T" + hours + ":" + mins + ":" + secondes + "Z");
                return parsedDate;
            },

            setUpdateIndexInformation: function (status, startDate, endDate, lastsuccesfulDate, user, reason) {
                UWA.log("ToolsLayoutView::setUpdateIndexInformation");
                var that = this;
                var divStatus = that.divUpdateIndexHistory.getElement("#ToolsDivUpdateIndexStatus");
                divStatus.empty();
                //Update Status info  
                if (status === "OnGoing") {
                    that.updateButton.setDisabled(true);
                    that.importButton.setDisabled(true);
                    
                    new Spinner({ className: "small", id: "ToolsSpinnerIndexInfo" }).inject(divStatus).show();

                    UWA.createElement('p', {
                        text: myNls.UpdateInProgress,
                        id: "pSatusUpdate",
                        'class': ''
                    }).inject(divStatus);

                    var resetSpan = UWA.createElement('span').inject(divStatus);
                    var resetButton = new Button({
                        id: 'ToolsResetButton',
                        icon: 'fonticon fonticon-undo',
                        attributes: {
                            disabled: false,
                            'aria-hidden': 'true'
                        }
                    }).inject(resetSpan);
                    var resetPop = new Popover({
                        target: resetSpan,
                        trigger: "hover",
                        animate: "true",
                        position: "top",
                        body: myNls.resetUpdateIndexButton,
                        title: ''
                    });

                    resetButton.addEvent("onClick", function (e) {
                        that.updateButton.setDisabled(false);
                        if(document.getElementById('ImportFileInput').files.length===1)
                        	that.importButton.setDisabled(false);
                        resetSpan.hide();
                    })
                }
                else if (status === "Ended") {
                    that.updateButton.setDisabled(false);
                    if(document.getElementById('ImportFileInput').files.length===1)
                    	that.importButton.setDisabled(false);
                    var successUpdateIcon = UWA.createElement('span', {
                        'class': 'fonticon  fonticon-check',
                        'id': '',
                    }).inject(divStatus);
                    successUpdateIcon.setStyle("color", "green");

                    UWA.createElement('p', {
                        text: myNls.updateIndexDone,
                        id: 'StatusUpdateSuccess',
                        'class': 'pSatusUpdate'
                    }).inject(divStatus);
                }

                else if (status === "Failed") {
                    that.updateButton.setDisabled(false);
                    if(document.getElementById('ImportFileInput').files.length===1)
                    	that.importButton.setDisabled(false);
                    var failedUpdateIcon = UWA.createElement('span', {
                        'class': 'fonticon  fonticon-attention',
                        'id': '',
                    }).inject(divStatus);
                    failedUpdateIcon.setStyle("color", "red");

                    UWA.createElement('p', {
                        text: myNls.updateIndexfail,
                        id: 'StatusUpdateFailed',
                        class: 'pSatusUpdate',
                    }).inject(divStatus);

                }

                //Update end date			 
                var endUpdateIndex = that.divUpdateIndexHistory.getElement("#endUpdateIndex");
                endUpdateIndex.setText(endDate);

                //Update start date
                var startUpdateIndex = that.divUpdateIndexHistory.getElement("#startUpdateIndex");
                startUpdateIndex.setText(startDate);

                //Update user and reason
                var pUserReason = that.divUpdateIndexHistory.getElement("#pUserReason");
                if(reason === "Manual") {
                	reason = myNls['Manual'];
                }
                else if(reason === "Import"){
                	reason = myNls['Import'];
                }
                pUserReason.setText(user + " - " + reason);

                //Update last successful
                var ToolsDivUpdateIndexLastSuccess = that.divUpdateIndexHistory.getElement("#ToolsDivUpdateIndexLastSuccess");
                if (lastsuccesfulDate !== null) {
                    var pLastUpdate = that.divUpdateIndexHistory.getElement("#pLastUpdate");
                    pLastUpdate.setText("last sucessfully update : " + lastsuccesfulDate);
                }
                ToolsDivUpdateIndexLastSuccess.show();
                if (status === "Ended")
                    ToolsDivUpdateIndexLastSuccess.hide();
                that.divUpdateIndexHistory.show();
            },

            /*
            Refresh function is called whenever the user do an action in the processEGraph View : creation, deletion, edition.
            This function re-display the eGraph with the according changes.
            It receives as Parameters, the type and action chosen from the left panel and the JSON containing the informations.
            */
            refresh: function (type, action, getJSON) {
                UWA.log("ToolsLayoutView::refresh");
                this.persistJSONObject = getJSON;

                this.modal.hide();
                this.editor.hide();

            },
            destroy: function () {
                UWA.log("ToolsLayoutView::destroy");
                this.stopListening();
                this._parent();
            }
        });
        return extendedView;
    });

/**
 * Form to  create a Specialization type, Deployment extension, Specialization extension type
 * and Customer extension type
 */

define('DS/DMSApp/Views/UniquekeyForm',

  ['DS/UIKIT/Modal',
    'DS/UIKIT/Form',
    'DS/UIKIT/Input/Text',
    'DS/DMSApp/Utils/URLHandler',
    'UWA/Promise',
    'DS/WAFData/WAFData',
    'DS/UIKIT/Input/Toggle',
    'DS/UIKIT/Input/Button',
    'DS/UIKIT/Input/ButtonGroup',
    'DS/UIKIT/Alert',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/DMSApp/Utils/UuidHandler',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
    'DS/DMSApp/Utils/DMSWebServices'
  ],
  function(Modal, Form, Text, URLHandler, Promise, WAFData, Toggle, Button, ButtonGroup, Alert, WebappsUtils, dicoHandler, UuidHandler, myNls, DMSWebServices) {
    "use strict";

    function UniquekeyForm(aModeSubType, aModeEdit, aModel) {
      if (!(this instanceof UniquekeyForm)) {
        throw new TypeError("UniquekeyForm constructor cannot be called as a function.");
      }
      this.modeSubType = aModeSubType;
      this.modeEdit = aModeEdit;
      this.model = aModel;
    }
    UniquekeyForm.UK_NAME_FIELD_ID = "uniquekey_name";
    UniquekeyForm.TYPE_NAME_FIELD_ID = "type_name";
    UniquekeyForm.INTERFACE_FIELD_ID = "interface_name";
    UniquekeyForm.ATTRIBUTE_FIELD_ID = "attr_list";


    UniquekeyForm.UPDATE_INTERFACE_FIELD_EVENT_NAME = "updateInterfaceListEvent";

    function getNameField(aId, aValue, aEditMode) {
      var toRet = {
        type: 'text',
        name: UniquekeyForm.UK_NAME_FIELD_ID,
        label: myNls.get("NameFieldUKForm"),
        required: true,
        placeholder: myNls.get("PlaceholderUniquekeyName"),
        helperText: myNls.get("ukFormNameFieldHelper")
        //pattern: "^[a-zA-Z0-9]+$"
      };
      return toRet;
    };

    function getTypeField() {
      var toRet = {
        type: 'autocomplete',
        name: UniquekeyForm.TYPE_NAME_FIELD_ID,
        label: myNls.get("ContrainedTypeField"),
        required: true,
        showSuggestsOnFocus: true,
        datasets: [{
          items: [],
          configuration: {
            searchEngine: function(dataset, text) {
              text = text.toLowerCase();
              var sug = [];
              dataset.items.forEach(function(item) {
                if (item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text)) {
                  sug.push(item);
                }
              });
              return sug;
            }
          }
        }],
        events: {
          onSelect: function(item) {
            this._parent.dispatchEvent(UniquekeyForm.UPDATE_INTERFACE_FIELD_EVENT_NAME, item);
            this._parent.dispatchEvent("UpdateAttrList", item);
          },
          onUnselect: function() {
            this._parent.dispatchEvent(UniquekeyForm.UPDATE_INTERFACE_FIELD_EVENT_NAME);
          }
        }
      };
      return toRet;
    };

    function getInterfaceField() {
      var toRet = {
        type: 'autocomplete',
        name: UniquekeyForm.INTERFACE_FIELD_ID,
        label: myNls.get("ConstrainedInterfaceField"),
        disabled: true,
        showSuggestsOnFocus: true,
        datasets: [{
          items: [],
          configuration: {
            searchEngine: function(dataset, text) {
              text = text.toLowerCase();
              var sug = [];
              dataset.items.forEach(function(item) {
                if (item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text)) {
                  sug.push(item);
                }
              });
              return sug;
            }
          }
        }],
        events: {
          onSelect: function(item) {
            this._parent.dispatchEvent("UpdateAttrList", item);
            //this._parent.dispatchEvent(UniquekeyForm.UPDATE_INTERFACE_FIELD_EVENT_NAME, item);
          },
          onUnselect: function() {
            //this._parent.dispatchEvent(UniquekeyForm.UPDATE_INTERFACE_FIELD_EVENT_NAME);
          }
        }
      };
      return toRet;
    };

    function getAttributeField() {
      var toRet = {
        type: 'autocomplete',
        name: UniquekeyForm.ATTRIBUTE_FIELD_ID,
        label: myNls.get("ConstrainedAttributes"),
        required: true,
        multiSelect: true,
        showSuggestsOnFocus: true,
        datasets: [{
          items: [],
          configuration: {
            searchEngine: function(dataset, text) {
              text = text.toLowerCase();
              var sug = [];
              dataset.items.forEach(function(item) {
                if (item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text)) {
                  sug.push(item);
                }
              });
              return sug;
            }
          }
        }],
        events: {
          onSelect: function(item) {
            //this._parent.dispatchEvent(UniquekeyForm.UPDATE_INTERFACE_FIELD_EVENT_NAME, item);
          },
          onUnselect: function() {
            //this._parent.dispatchEvent(UniquekeyForm.UPDATE_INTERFACE_FIELD_EVENT_NAME);
          }
        }
      };
      return toRet;
    };

    function setTypeFieldAutoComplete(aFormObj) {
      var parentNameAuto = aFormObj.getAutocompleteInput(UniquekeyForm.TYPE_NAME_FIELD_ID);
      if (parentNameAuto != undefined) {
        // ! Important : this field need to dispatch an event to the Form.
        parentNameAuto._parent = aFormObj;
        parentNameAuto.elements.input.onchange = function() {
          if (parentNameAuto.selectedItems.length == 0 || parentNameAuto.selectedItems[0].label != this.value) {
            parentNameAuto.reset();
          }
        }
        // Fill the autocomplete
        dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
        dicoHandler.getTypesToContrainedForUK().forEach(function(item) {
          parentNameAuto.addItems({
            'value': item.Name,
            'label': widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(item.Name, item.Nature) : dicoHandler.getDisplayName(item.Name),
            'subLabel': widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName(item.Name) : dicoHandler.getNLSName(item.Name, item.Nature),
            'element': item
          }, parentNameAuto.datasets[0]);
        });
      }
    };

    function getFormObject(aFields) {
      var _theTypeForm = new Form({
        grid: '4 8',
        // Fields
        fields: aFields,
        // Footer
        /*buttons: [
          // Save Button
          {
            type: 'submit',
            value: myNls.get("typeFormSaveBtnLabel")
          },
          // Cancel Button
          {
            type: 'cancel',
            value: myNls.get("typeFormCancelBtnLabel"),
            id: "myCancelBtn"
          }
        ],*/
      });

      // Cancel Function : Called when the user click on Cancel Button.
      /* _theTypeForm.getContent().getElement('#myCancelBtn').addEvent('click', function() {
         _theTypeForm._parent.destroy();
       });*/
      return _theTypeForm;
    };

    function nameFieldOnInput() {
      var spanErrorName = document.getElementById("NameWarning");
      if (spanErrorName == undefined) {
        spanErrorName = UWA.createElement('span', {
          id: "NameWarning"
        });
        // LMT7 IR-867366-3DEXPERIENCER2022x : 09/11/21
        spanErrorName.appendText(myNls.get("AlphaNumericWarning"));
        spanErrorName.setStyle('font-style', 'italic');
        spanErrorName.setStyle('color', '#EA4F37');
        var parent = this.getParent();
        spanErrorName.inject(parent.firstChild);
        spanErrorName.hidden = true;

      }
      var regexAlphaNumeric = new RegExp("^[a-zA-Z0-9]+$");
      if (this.value.length > 0 && !regexAlphaNumeric.test(this.value)) {
        spanErrorName.hidden = false;
        /*var regexRet = new RegExp("^[a-zA-Z0-9]+");
        var res = this.value.match(regexRet);
        if (res != null) {
          this.value = res[0];
        } else {
          this.value = "";
        }*/
      } else {
        spanErrorName.hidden = true;
      }

    };

    function submitFuncForNewType() {
      dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
      // Step 1 : Retrieve data
      // Name
      var uk_Name = this.getField(UniquekeyForm.UK_NAME_FIELD_ID).value;
      // Parent
      var typeAutoComplete = this.getAutocompleteInput(UniquekeyForm.TYPE_NAME_FIELD_ID);
      var selectedType = undefined;
      if (typeAutoComplete != undefined) {
        if (typeAutoComplete.selectedItems.length > 0)
          selectedType = typeAutoComplete.selectedItems[0].element;
      }
      // Instance Name
      var interfaceAutoComplete = this.getAutocompleteInput(UniquekeyForm.INTERFACE_FIELD_ID);
      var selectedInterface = undefined;
      if (interfaceAutoComplete && interfaceAutoComplete.selectedItems.length > 0)
        selectedInterface = interfaceAutoComplete.selectedItems[0].element;

      var attrAutoComplField = this.getAutocompleteInput(UniquekeyForm.ATTRIBUTE_FIELD_ID);
      var attrList = [];
      if (attrAutoComplField != undefined) {
        attrAutoComplField.selectedItems.forEach((item, i) => {
          var attrName = "";
          if (item.element.Local == "Yes" && item.element.Basic != "Yes") {
            attrName = item.element.Owner + "." + item.element.Name;
          } else {
            attrName = item.element.Name;
          }
          attrList.push(attrName);
        });
      }

      var ukToCreate = {};
      var newUuid = UuidHandler.create_UUID();
      ukToCreate.Name = uk_Name + "__" + newUuid.getUuidWithoutSeparator();
      ukToCreate.Nature = "UniqueKey";
      var isIRPCType = dicoHandler.isIRPC(selectedType.Name, dicoHandler.getKeyToReadOnDico(selectedType.Nature));
      ukToCreate.Package = isIRPCType ? "DMSPackDefault_03" : "DMSPackDefault_04";
      ukToCreate.Type = selectedType.Name
      // BMN2 IR-858093 23/07/2021
      ukToCreate.Interface = selectedInterface != undefined ? selectedInterface.Name : "";
      ukToCreate.Enabled = "Yes";
      ukToCreate.Attributes = attrList;



      console.log(ukToCreate);
      DMSWebServices.aggregatorCreate(ukToCreate, "UniqueKey", function onComplete(resp) {

        console.log("onComplete response:");
        console.log(resp);
        pSkeleton.getCollectionAt(1).reset();
        var langCode = widget.lang;
        if (langCode == "zh") {
          langCode = "zh_CN";
        }
        pSkeleton.getCollectionAt(1).fetch({
          data: {
            maxAge: 0,
            lang: langCode
          },
          onComplete: function(collection, response, options) {
            console.log(collection);
            var modelOfCreatedType = pSkeleton.getCollectionAt(1).findWhere({
              id: ukToCreate.Name
            });
            var newTypeElem = pSkeleton.getViewAt(1).contentsViews.tile.nestedView.getChildView(modelOfCreatedType);
            newTypeElem.select();
          }
        });
      }, function onFaillure(resp) {
        var msg = resp;
        if(resp.contains("Unable to activate the created UniqueKey")){
          msg = myNls.errMsgCreateUKEnableIssue;
        }
        var alert = new Alert({
          visible: true,
          closeOnClick: true,
          renderTo: pSkeleton.container,
          messageClassName: 'error',
          messages: msg,
          autoHide: true,
          hideDelay: 3000
        });
        console.log("onFailure error:");
        //console.log(err);
        console.log("onFailure response:");
        console.log(resp);
      });
      this._parent.destroy();

    };

    UniquekeyForm.prototype = {
      constructor: UniquekeyForm,
      buildForNew: function() {
        var fields = [];


        // Name Field
        fields.push(getNameField("", "", false));
        // Type field
        fields.push(getTypeField());
        // Interface field
        fields.push(getInterfaceField());
        // Attribute field
        fields.push(getAttributeField());

        var _theTypeForm = getFormObject(fields);
        setTypeFieldAutoComplete(_theTypeForm);
        var inputName = _theTypeForm.getField(UniquekeyForm.TYPE_NAME_FIELD_ID);
        // Control the input of the type name field
        inputName.addEventListener("input", nameFieldOnInput);

        _theTypeForm.addEvent(UniquekeyForm.UPDATE_INTERFACE_FIELD_EVENT_NAME, function(item) {
          var interfaceField = _theTypeForm.getField(UniquekeyForm.INTERFACE_FIELD_ID);
          if (interfaceField != undefined) {
            if (item != undefined) {
              dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
              var inst_AutoComplete = _theTypeForm.getAutocompleteInput(UniquekeyForm.INTERFACE_FIELD_ID);
              inst_AutoComplete._parent = _theTypeForm;
              console.log(item.element.Name);
              inst_AutoComplete.enable();
              dicoHandler.getInterfaces(item.element.Name).forEach(function(t) {
                if (!t.hasOwnProperty("DMSStatus")) {
                  inst_AutoComplete.addItems({
                    'value': t.Name,
                    'label': widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(t.Name, t.Nature) : dicoHandler.getDisplayName(t.Name),
                    'subLabel': widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName(t.Name) : dicoHandler.getNLSName(t.Name, t.Nature),
                    'element': t
                  }, inst_AutoComplete.datasets[0]);
                }
              });
              //inst_AutoComplete.addItems(dicoHandler.getInterfaces(item.element.Name), inst_AutoComplete.datasets[0]);
            }
          }
        });
        // Submit Function : Called when the user click on Save Button.
        _theTypeForm.addEvent("UpdateAttrList", function(item) {
          var interfaceField = _theTypeForm.getField(UniquekeyForm.ATTRIBUTE_FIELD_ID);
          if (interfaceField != undefined) {
            dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
            var inst_AutoComplete = _theTypeForm.getAutocompleteInput(UniquekeyForm.ATTRIBUTE_FIELD_ID);
            var attrList = dicoHandler.getAttributes(dicoHandler.getKeyToReadOnDico(item.element.Nature), item.element.Name, "Yes");
            // BMN2 IR-871564 23/07/2021
            var funcAttrCanBeAddedForUk = function(attr){
              var forbiddenAttrList = new Map();
              forbiddenAttrList.set("isbestsofar");
              forbiddenAttrList.set("ispublished");
              forbiddenAttrList.set("locked");
              forbiddenAttrList.set("majorrevision");
              forbiddenAttrList.set("minorrevision");
              forbiddenAttrList.set("reserved");
              forbiddenAttrList.set("reservedby");
              forbiddenAttrList.set("revindex");
              if(forbiddenAttrList.has(attr.Name)){
                return false;
              }
              if(attr.hasOwnProperty("MultiLine") && attr.MultiLine == "Yes"){
                return false;
              }
              if(attr.hasOwnProperty("MultiValuated") && attr.MultiValuated == "Yes"){
                return false;
              }
              return true;
            }
            attrList.forEach(function(attr) {
              if (funcAttrCanBeAddedForUk(attr)) {
                  inst_AutoComplete.addItems({
                    'value': attr.Name,
                    'label': widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(attr.Name, attr.Nature) : dicoHandler.getDisplayName(attr.Name),
                    'subLabel': widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName(attr.Name) : dicoHandler.getNLSName(attr.Name, attr.Nature),
                    'element': attr
                  }, inst_AutoComplete.datasets[0]);

              }
            });

          }
        });
        var opts = {
          events: {
            onSubmit: submitFuncForNewType
          }
        };
        _theTypeForm.setOptions(opts);
        _theTypeForm.myValidate = function() {
          dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);;
          var ukList = dicoHandler.getUniquekeys();
          // Check the name of the uniquekey is unique and respect the name pattern [a-zA-Z0-9]
          var uniquekeyNameField = this.getTextInput(UniquekeyForm.UK_NAME_FIELD_ID);
          var ukName = undefined;
          if (uniquekeyNameField != undefined) {
            this.getField(UniquekeyForm.UK_NAME_FIELD_ID).getParent('.form-group').removeClassName('has-error');
            ukName = uniquekeyNameField.getValue();
            var regEx = new RegExp("^[a-zA-Z0-9]+$");
            if (!regEx.test(ukName)) {
              this.getField(UniquekeyForm.UK_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
              //this.dispatchEvent('onInvalid');
              var alert = new Alert({
                visible: true,
                autoHide: true,
                hideDelay: 5000
              }).inject(this._parent.elements.header);
              alert.add({
                className: 'error',
                message: myNls.get("nameError")
              });
              return false;
            }
            if (dicoHandler.isNameExisting(ukName, "UniqueKeys")) {
              this.getField(UniquekeyForm.UK_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
              //this.dispatchEvent('onInvalid');
              var alert = new Alert({
                visible: true,
                autoHide: true,
                hideDelay: 5000
              }).inject(this._parent.elements.header);
              alert.add({
                className: 'error',
                message: myNls.get("nameError")
              });
              return false;
            }
          }

          // If the type is an OOTB Type so we have to check if a group of attribute is selected if not inform the useRootChannelView

          var typeAutoComplete = this.getAutocompleteInput(UniquekeyForm.TYPE_NAME_FIELD_ID);
          var selectedType = undefined;
          if (typeAutoComplete != undefined) {
            this.getField(UniquekeyForm.TYPE_NAME_FIELD_ID).getParent('.form-group').removeClassName('has-error');
            if (typeAutoComplete.selectedItems.length > 0) {
              selectedType = typeAutoComplete.selectedItems[0].element;
            } else {
              // If a type in not selected
              this.getField(UniquekeyForm.TYPE_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
              //this.dispatchEvent('onInvalid');
              var alert = new Alert({
                visible: true,
                autoHide: true,
                hideDelay: 5000
              }).inject(this._parent.elements.header);
              alert.add({
                className: 'error',
                message: myNls.get("errMsgSelectTypeForUK")
              });

              return false;
            }
          }
          if (selectedType != undefined) {
            var isOotbType = dicoHandler.isOOTBAgregator(selectedType.Name, selectedType.Nature);
            if (isOotbType) {

              var insterfaceAC = this.getAutocompleteInput(UniquekeyForm.INTERFACE_FIELD_ID);
              var selectedInterface = undefined;
              if (insterfaceAC != undefined) {
                this.getField(UniquekeyForm.INTERFACE_FIELD_ID).getParent('.form-group').removeClassName('has-error');
                if (insterfaceAC.selectedItems.length > 0) {
                  selectedInterface = typeAutoComplete.selectedItems[0].element;
                } else {
                  this.getField(UniquekeyForm.INTERFACE_FIELD_ID).getParent('.form-group').addClassName('has-error');
                  //this.dispatchEvent('onInvalid');
                  var alert = new Alert({
                    visible: true,
                    autoHide: true,
                    hideDelay: 5000
                  }).inject(this._parent.elements.header);
                  alert.add({
                    className: 'error',
                    message: myNls.get("errMsgSelectInterfaceForOOTBTypeForUK")
                  });

                  return false;
                }
              }

            }
          }
          // Check if the user have selected atleast some attributes.
          var attrAutoComplete = this.getAutocompleteInput(UniquekeyForm.ATTRIBUTE_FIELD_ID);
          var selectedAttr = undefined;
          if (attrAutoComplete != undefined) {
            this.getField(UniquekeyForm.ATTRIBUTE_FIELD_ID).getParent('.form-group').removeClassName('has-error');
            if (attrAutoComplete.selectedItems.length <= 0) {

              this.getField(UniquekeyForm.ATTRIBUTE_FIELD_ID).getParent('.form-group').addClassName('has-error');
              //this.dispatchEvent('onInvalid');
              var alert = new Alert({
                visible: true,
                autoHide: true,
                hideDelay: 5000
              }).inject(this._parent.elements.header);
              alert.add({
                className: 'error',
                message: myNls.get("errMsgSelectAtleastOneAttrForUK")
              });

              return false;
            }


          }
          // If the type is a specialized type so the group of attribute is not mandatory.

          //
          /*var txtName = this.getTextInput(UniquekeyForm.UK_NAME_FIELD_ID).getValue();
          var regEx = new RegExp("^[0-9]|_");
          if (txtName.startsWith("XP") || regEx.test(txtName)) {
            this.getField(UniquekeyForm.UK_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
            this.dispatchEvent('onInvalid');
            var alert = new Alert({
              visible: true,
              autoHide: true,
              hideDelay: 2000
            }).inject(this.elements.container);
            alert.add({
              className: 'error',
              message: myNls.get('popUpNameError')
            });
            return false;
          }
          return this.validate();*/
          return true;
        };
        return _theTypeForm;
      },
    };
    return UniquekeyForm;
  });

/**
 * Form to create a interface
 */

define('DS/DMSApp/Views/CustoExtForm',[
	'UWA/Core',
	'DS/UIKIT/Form',
	'DS/UIKIT/Input/Text',
	'DS/UIKIT/Input/Toggle',
	'DS/UIKIT/Input/Button',
	'DS/UIKIT/Input/ButtonGroup',
	'DS/UIKIT/Alert',
	'DS/UIKIT/Mask',
	'DS/DMSApp/Utils/dictionaryJSONHandler',
	'DS/DMSApp/Utils/UuidHandler',
	'DS/DMSApp/Utils/DMSWebServices',
	'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
	'css!DS/DMSApp/DMSApp'
],
function(UWA, Form, Text, Toggle, Button, ButtonGroup, Alert, Mask, dicoHandler, UuidHandler, webService, myNls) {
	"use strict";
	//url is the only attribute of this class.
	function CustoExtForm(aModeEdit, aModel) {
		if (!(this instanceof CustoExtForm)) {
			throw new TypeError("CustoExtForm constructor cannot be called as a function.");
		}
		this.modeEdit = aModeEdit;
		this.model = aModel;
	}

	CustoExtForm.prototype = {
		constructor: CustoExtForm,
		build: function() {
			var _theCustoExtForm;
			var _interface_name = "";
			var _modeEdit = this.modeEdit;
			var _model = this.model;

			var myFields = [];
			switch (this.modeEdit) {
				case "New":
					//parent name
					myFields.push({
						type: 'autocomplete',
						name: "parent_name",
						label: myNls.get('parentName'),
						//placeholder: myNls.get('inputSearchExtension'),
						required: false,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: false,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError'),
						events: {
							onSelect: function(item, position) {
								if (acparent.selectedItems.length > 0 && !acparent.datasets[0]['name']) {
									acparent.removeDataset(0);
									delete searchParent['name'];
									searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent,item['isIRPC']);
									acparent.addDataset(searchParent);
									acparent.onUpdateSuggests(acparent.datasets);
									acparent.onHideSuggests();
									acparent.toggleSelect(item,position,true);
								}
								var scopes = dicoHandler.customerExtensionHadScope(item['value']);

								if(scopes&&scopes.length!==0) {
									acscope.unselectAll();
									searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope,item['isIRPC']);
									acscope.addDataset(searchScope);
									acscope.onUpdateSuggests(acscope.datasets);
									acscope.onHideSuggests();
									acscope.disable();
									for(var i = 0;i<scopes.length;i++) {
										acscope.toggleSelect(acscope.getItem(scopes[i]), position, true);
									}
								} else {
									acscope.removeDataset(0);
									delete searchScope['name'];
									searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope,item['isIRPC']);
									acscope.addDataset(searchScope);
									acscope.onUpdateSuggests(acscope.datasets);
									acscope.onHideSuggests();
								}
							},
							onUnselect: function(item) {
								if (acscope.selectedItems.length === 0) {
									acscope.removeDataset(0);
									delete searchScope['name'];
									searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope);
									acscope.addDataset(searchScope);
									acscope.onUpdateSuggests(acscope.datasets);
									acscope.onHideSuggests();
									if(acparent.datasets[0]['name']) {
										acparent.removeDataset(0);
										delete searchParent['name'];
										searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent);
										acparent.addDataset(searchParent);
										acparent.onUpdateSuggests(acparent.datasets);
										acparent.onHideSuggests();
									}
								}
								if(acscope.isDisabled()) {
									acscope.enable();
								}
							}
						}
					});
					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('extName'),
						required: true,
						placeholder: myNls.get("inputExtName"),
						helperText: myNls.get('uniqueField'),
						errorText: myNls.get('nameError'),
						pattern: "^[a-zA-Z0-9]+$"
					});
					//nls Name
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "abstract02",
						html: new function() {
							var div = UWA.createElement('div', {
								'class': 'myNLSDiv'
							});
							var label = UWA.createElement('label', {
								'text': myNls.get('typeFormNLsFieldLabel')
							});
							var labelHelp = UWA.createElement('i', {
								'text': myNls.get('typeFormNLsFieldHelp')
							});
							var buttonGp = new ButtonGroup({
								type: 'radio',
								buttons: [
									new Button({
										value: myNls.get('shortEnglishNLS'),
										active: true
									}),
									new Button({
										value: myNls.get('shortFrenchNLS')
									}),
									new Button({
										value: myNls.get('shortGermanNLS')
									}),
									new Button({
										value: myNls.get('shortJapaneseNLS')
									}),
									new Button({
										value: myNls.get('shortKoreanNLS')
									}),
									new Button({
										value: myNls.get('shortRussianNLS')
									}),
									new Button({
										value: myNls.get('shortChineseNLS')
									})
								],
								events: {
									onClick: function(e, button) {
										//console.log(button);
										var nodeList = e.currentTarget.getParent().getElementsByTagName('input');
										Object.keys(nodeList).forEach(function(t) {
											if (nodeList.item(t).id.contains(button.getValue().toLowerCase())) {
												nodeList.item(t).show();
											} else {
												nodeList.item(t).hide();
											}
											//console.log(e.currentTarget.getParent().getElementsByTagName('input').item(tt).id);
										});
									}
								}
							});
							buttonGp.buttons.forEach(function(item) {
								if (navigator.language.toLocaleLowerCase().contains(item.getValue().toLocaleLowerCase())) {
									item.setActive(true);
								} else {
									item.setActive(false);
								}
							});
							//var inputTa = buildInputNLS("ta", "Entrez ici votre traduction ...", navigator.language.toLocaleLowerCase());
							label.inject(div);
							labelHelp.inject(div);
							buttonGp.inject(div);
							var inputLangTab = ["en", "fr", "de", "ja", "ko", "ru", "zh"];
							var label = myNls.get('typeFormNLsFieldPlaceholder');
							var navLangCode = navigator.language.toLocaleLowerCase();
							inputLangTab.forEach(function(code) {
								var hide = true;
								if (navLangCode.contains(code)) {
									hide = false;
								}
								var input = new Text({
									id: "nlsInput_" + code,
									name: "nlsInput_" + code,
									placeholder: label
								});
								if (hide) {
									input.hide();
								}
								input.inject(div);
							});
							return div;
						}
					});
					//scope name
					myFields.push({
						type: 'autocomplete',
						name: "scope_name",
						label: myNls.get('scopesNames'),
						//placeholder: myNls.get('searchTypeOrRel'),
						required: true,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: true,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError'),
						events: {
							onSelect: function(item, position) {
								if (item['datasetId'] === undefined) {
									acscope.toggleSelect(item,position,false);
								}
								else if (acscope.selectedItems.length === 1 && !acscope.datasets[0]['name']) {
									if (acparent.selectedItems.length===0 && !acparent.datasets[0]['name']) {
										acparent.removeDataset(0);
										delete searchParent['name'];
										searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent, item['isIRPC']);
										acparent.addDataset(searchParent);
										acparent.onUpdateSuggests(acparent.datasets);
										acparent.onHideSuggests();
									}
								acscope.removeDataset(0);
								delete searchScope['name'];
								searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope, item['isIRPC']);
								acscope.addDataset(searchScope);
								acscope.onUpdateSuggests(acscope.datasets);
								acscope.onHideSuggests();
								acscope.onFocus();
								acscope.toggleSelect(acscope.getItem(item['value']), position, true);

								}
							},
							onUnselect: function(item) {
								if (acscope.selectedItems.length === 0 && acscope.datasets[0]['name']) {
									if(acparent.selectedItems.length === 0) {
										acparent.removeDataset(0);
										delete searchParent['name'];
										searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent);
										acparent.addDataset(searchParent);
										acparent.onUpdateSuggests(acparent.datasets);
										acparent.onHideSuggests();

										acscope.removeDataset(0);
										delete searchScope['name'];
										searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope);
										acscope.addDataset(searchScope);
										acscope.onUpdateSuggests(acscope.datasets);
										acscope.onHideSuggests();
										acscope.onFocus();
										//ac.onUpdateSuggests(ac.datasets);
									}
								}
							}
						}
					});
					//abstract
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "abstract",
						label: myNls.get('typeFormAbstractFieldLabel'),
						value: "False",
						html: new function() {
							var label = UWA.createElement('label', {
								'text': myNls.get('typeFormAbstractFieldLabel')
							});
							var labelHelp = UWA.createElement('i', {
								'text': myNls.get('typeFormAbstractFieldDescrip')
							});
							var toggle = new Toggle({
								type: 'switch',
								name: 'abstractOption',
								value: 'option1',
								label: myNls.get('typeFormAbstractFieldOption')
							}); //.check()
							var div = UWA.createElement('div', {
								'class': 'myAbstractOptDiv'
							});
							label.inject(div);
							labelHelp.inject(div);
							toggle.inject(div);
							return div;
						}
					});
					break;
				case "Edit":
					//Type Name
					myFields.push({
						type: 'text',
						name: "parent_name",
						label: myNls.get('parentName'),
						required: false,
						disabled:true,
						value: dicoHandler.getNLSName(this.model.get('parent'),this.model.get('nature'))
					});
					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('extName'),
						required: true,
						disabled:true,
						value: this.model.get('title')
					});
					//nls Name
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "nlsLang",
						//label: "Abstract(NLS)",
						//value: "False",
						html: new function() {
							var div = UWA.createElement('div', {
								'class': 'myNLSDiv'
							});
							var label = UWA.createElement('label', {
								'text': myNls.get('typeFormNLsFieldLabel')
							});
							var labelHelp = UWA.createElement('i', {
								'text': myNls.get('typeFormNLsFieldHelp')
							});
							var buttonGp = new ButtonGroup({
								type: 'radio',
								buttons: [
									new Button({
										value: myNls.get('shortEnglishNLS'),
										active: true
									}),
									new Button({
										value: myNls.get('shortFrenchNLS')
									}),
									new Button({
										value: myNls.get('shortGermanNLS')
									}),
									new Button({
										value: myNls.get('shortJapaneseNLS')
									}),
									new Button({
										value: myNls.get('shortKoreanNLS')
									}),
									new Button({
										value: myNls.get('shortRussianNLS')
									}),
									new Button({
										value: myNls.get('shortChineseNLS')
									})
								],
								events: {
									onClick: function(e, button) {
										//console.log(button);
										var nodeList = e.currentTarget.getParent().getElementsByTagName('input');
										Object.keys(nodeList).forEach(function(t) {
											if (nodeList.item(t).id.contains(button.getValue().toLowerCase())) {
												nodeList.item(t).show();
											} else {
												nodeList.item(t).hide();
											}
											//console.log(e.currentTarget.getParent().getElementsByTagName('input').item(tt).id);
										});
									}
								}
							});
							buttonGp.buttons.forEach(function(item) {
								if (navigator.language.toLocaleLowerCase().contains(item.getValue().toLocaleLowerCase())) {
									item.setActive(true);
								} else {
									item.setActive(false);
								}
							});


							//var inputTa = buildInputNLS("ta", "Entrez ici votre traduction ...", navigator.language.toLocaleLowerCase());
							label.inject(div);
							labelHelp.inject(div);
							buttonGp.inject(div);
							var inputLangTab = ["en", "fr", "de", "ja", "ko", "ru", "zh"];
							var label = myNls.get('typeFormNameFieldPlaceholder');
							var navLangCode = navigator.language.toLocaleLowerCase();
							var translations = _model.get('NameNLS');
							var showEnglishDefault = false;
							if(translations && Object.keys(translations).length<2) {
								showEnglishDefault = true;
							}
							inputLangTab.forEach(function(code) {
							var input = new Text({
								id: "nlsInput_" + code,
								name: "nlsInput_" + code,
								placeholder: label
							});

								if(translations && translations.hasOwnProperty(code)) {
									input.setValue(translations[code]);
								}
								/*else if(navLangCode.contains(code)) {
									input.setValue(_model.get('title'));
								}
								if (showEnglishDefault) {
									if(code !== "en")
										input.hide();
								}
								else */if(!navLangCode.contains(code)) {
									input.hide();
								}
								input.inject(div);
							});
							return div;
						}
					});
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "abstract",
						label: myNls.get('typeFormAbstractFieldLabel'),
						//value: this.model.get('isAbstract')==="Yes"?"True":"False",
						html: new function() {

							var label = UWA.createElement('label', {
								'text': myNls.get('typeFormAbstractFieldLabel')
							});
							var labelHelp = UWA.createElement('i', {
								'text': myNls.get('typeFormAbstractFieldDescrip')
							});
							var toggle = new Toggle({
								type: 'switch',
								name: 'abstractOption',
								value: 'option1',
								label: myNls.get('typeFormAbstractFieldOption')
							}); //.check()
							var div = UWA.createElement('div', {
								'class': 'myAbstractOptDiv'
							});
							label.inject(div);
							labelHelp.inject(div);
							toggle.inject(div);
							return div;
						}
					});
					break;
				case "AddSub":
					//parent name
					myFields.push({
						type: 'autocomplete',
						name: "parent_name",
						label: myNls.get('parentName'),
						placeholder: " ",
						required: false,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: false,
						disabled:true,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError')
					});
					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('extName'),
						required: true,
						placeholder: myNls.get('inputExtName'),
						helperText: myNls.get('uniqueField'),
						errorText: myNls.get('nameError'),
						pattern: "^[a-zA-Z0-9]+$"
					});
					//nls Name
						myFields.push({
					type: "html",
					'class': 'form-group',
					name: "nlsLang",
					//label: "Abstract(NLS)",
					//value: "False",
					html: new function() {
						var div = UWA.createElement('div', {
							'class': 'myNLSDiv'
						});
						var label = UWA.createElement('label', {
							'text': myNls.get('typeFormNLsFieldLabel')
						});
						var labelHelp = UWA.createElement('i', {
							'text': myNls.get('typeFormNLsFieldHelp')
						});
						var buttonGp = new ButtonGroup({
							type: 'radio',
							buttons: [
								new Button({
									value: myNls.get('shortEnglishNLS'),
									active: true
								}),
								new Button({
									value: myNls.get('shortFrenchNLS')
								}),
								new Button({
									value: myNls.get('shortGermanNLS')
								}),
								new Button({
									value: myNls.get('shortJapaneseNLS')
								}),
								new Button({
									value: myNls.get('shortKoreanNLS')
								}),
								new Button({
									value: myNls.get('shortRussianNLS')
								}),
								new Button({
									value: myNls.get('shortChineseNLS')
								})
							],
							events: {
								onClick: function(e, button) {
									//console.log(button);
									var nodeList = e.currentTarget.getParent().getElementsByTagName('input');
									Object.keys(nodeList).forEach(function(t) {
										if (nodeList.item(t).id.contains(button.getValue().toLowerCase())) {
											nodeList.item(t).show();
										} else {
											nodeList.item(t).hide();
										}
										//console.log(e.currentTarget.getParent().getElementsByTagName('input').item(tt).id);
									});
								}
							}
						});
						buttonGp.buttons.forEach(function(item) {
							if (navigator.language.toLocaleLowerCase().contains(item.getValue().toLocaleLowerCase())) {
								item.setActive(true);
							} else {
								item.setActive(false);
							}
						});


						//var inputTa = buildInputNLS("ta", "Entrez ici votre traduction ...", navigator.language.toLocaleLowerCase());
						label.inject(div);
						labelHelp.inject(div);
						buttonGp.inject(div);
						var inputLangTab = ["en", "fr", "de", "ja", "ko", "ru", "zh"];
						var label = myNls.get('typeFormNLsFieldPlaceholder');
						var navLangCode = navigator.language.toLocaleLowerCase();
						inputLangTab.forEach(function(code) {
							var hide = true;
							if (navLangCode.contains(code)) {
								hide = false;
							}
							var input = new Text({
								id: "nlsInput_" + code,
								name: "nlsInput_" + code,
								placeholder: label
							});
							if (hide) {
								input.hide();
							}
							input.inject(div);
						});
						return div;
					}
				});
				//scope name
				myFields.push({
					type: 'autocomplete',
					name: "scope_name",
					label: myNls.get('scopesNames'),
					placeholder: " ",
					required: true,
					allowFreeInput: true,
					showSuggestsOnFocus: true,
					multiSelect: true,
					//disabled:true,
					//helperText :	"EnterType ",
					errorText: myNls.get('SpecialCharacterError')
				});
				//abstract
				myFields.push({
					type: "html",
					'class': 'form-group',
					name: "abstract",
					label: myNls.get('typeFormAbstractFieldLabel'),
					value: false,
					html: new function() {

						var label = UWA.createElement('label', {
							'text': myNls.get('typeFormAbstractFieldLabel')
						});
						var labelHelp = UWA.createElement('i', {
							'text': myNls.get('typeFormAbstractFieldDescrip')
						});
						var toggle = new Toggle({
							type: 'switch',
							name: 'abstractOption',
							value: 'option1',
							label: myNls.get('typeFormAbstractFieldOption')
						}); //.check()
						var div = UWA.createElement('div', {
							'class': 'myAbstractOptDiv'
						});
						label.inject(div);
						labelHelp.inject(div);
						toggle.inject(div);
						return div;
					}
				});
				break;
				case "AddScope":
					//parent name
					myFields.push({
						type: 'autocomplete',
						name: "parent_name",
						label: myNls.get('parentName'),
						placeholder: " ",
						required: false,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: false,
						disabled:true,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError')
					});
					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('extName'),
						required: true,
						disabled:true,
						value: this.model.get('title')
					});
					//scope name
					if(_model.get('DMSStatus')!==undefined) {
						myFields.push({
							type: 'autocomplete',
							name: "lock_scope_name",
							label: myNls.get('scopesNames'),
							placeholder: " ",
							required: true,
							allowFreeInput: true,
							showSuggestsOnFocus: true,
							multiSelect: true,
							closableItems: false,
							disabled:true,
							//helperText :	"EnterType ",
							errorText: myNls.get('SpecialCharacterError')
						});
					}
					//scope name
					myFields.push({
							type: 'autocomplete',
							name: "scope_name",
							label: myNls.get('scopesNames'),
							//placeholder: myNls.get('searchTypeOrRel'),
							required: true,
							allowFreeInput: true,
							showSuggestsOnFocus: true,
							multiSelect: true,
							//closableItems: false,
							//disabled:true,
							//helperText :	"EnterType ",
							errorText: myNls.get('SpecialCharacterError')
						});

					//abstract
					/*myFields.push({
							type: "html",
							'class': 'form-group',
							name: "abstract",
							label: "Abstract(NLS)",
							//value: this.model.get('isAbstract')==="Yes"?"True":"False",
							html: new function() {

								var label = UWA.createElement('label', {
									'text': 'Abstract option(NLS)'
								});
								var labelHelp = UWA.createElement('i', {
									'text': '(Not visible in client application)'
								});
								var toggle = new Toggle({
									type: 'switch',
									name: 'abstractOption',
									value: 'option1',
									label: 'Set as abstract(NLS)',
									disabled: true
								}) //.check()
								var div = UWA.createElement('div', {
									'class': 'myAbstractOptDiv'
								});
								label.inject(div);
								labelHelp.inject(div);
								toggle.inject(div);
								return div;
							}
						});*/
						break;
				case "AddScopeFromType":
					//parent name
					myFields.push({
						type: 'autocomplete',
						name: "parent_name",
						label: myNls.get('parentName'),
						//placeholder: myNls.get('inputSearchExtension'),
						required: false,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: false,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError')
					});
						//Type Name
						myFields.push({
							type: 'text',
							name: "interface_name",
							label: myNls.get('extName'),
							required: true,
							placeholder: myNls.get('inputExtName'),
							helperText: myNls.get('uniqueField'),
							errorText: myNls.get('nameError'),
							pattern: "^[a-zA-Z0-9]+$"
						});
						//nls Name
						myFields.push({
					type: "html",
					'class': 'form-group',
					name: "abstract02",
					//label: "Abstract(NLS)",
					//value: "False",
					html: new function() {
						var div = UWA.createElement('div', {
							'class': 'myNLSDiv'
						});
						var label = UWA.createElement('label', {
							'text': myNls.get('typeFormNLsFieldLabel')
						});
						var labelHelp = UWA.createElement('i', {
							'text': myNls.get('typeFormNLsFieldHelp')
						});
						var buttonGp = new ButtonGroup({
							type: 'radio',
							buttons: [
								new Button({
									value: myNls.get('shortEnglishNLS'),
									active: true
								}),
								new Button({
									value: myNls.get('shortFrenchNLS')
								}),
								new Button({
									value: myNls.get('shortGermanNLS')
								}),
								new Button({
									value: myNls.get('shortJapaneseNLS')
								}),
								new Button({
									value: myNls.get('shortKoreanNLS')
								}),
								new Button({
									value: myNls.get('shortRussianNLS')
								}),
								new Button({
									value: myNls.get('shortChineseNLS')
								})
							],
							events: {
								onClick: function(e, button) {
									//console.log(button);
									var nodeList = e.currentTarget.getParent().getElementsByTagName('input');
									Object.keys(nodeList).forEach(function(t) {
										if (nodeList.item(t).id.contains(button.getValue().toLowerCase())) {
											nodeList.item(t).show();
										} else {
											nodeList.item(t).hide();
										}
										//console.log(e.currentTarget.getParent().getElementsByTagName('input').item(tt).id);
									});
								}
							}
						});
						buttonGp.buttons.forEach(function(item) {
							if (navigator.language.toLocaleLowerCase().contains(item.getValue().toLocaleLowerCase())) {
								item.setActive(true);
							} else {
								item.setActive(false);
							}
						});


						//var inputTa = buildInputNLS("ta", "Entrez ici votre traduction ...", navigator.language.toLocaleLowerCase());
						label.inject(div);
						labelHelp.inject(div);
						buttonGp.inject(div);
						var inputLangTab = ["en", "fr", "de", "ja", "ko", "ru", "zh"];
						var label = myNls.get('typeFormNLsFieldPlaceholder');
						var navLangCode = navigator.language.toLocaleLowerCase();
						inputLangTab.forEach(function(code) {
							var hide = true;
							if (navLangCode.contains(code)) {
								hide = false;
							}
							var input = new Text({
								id: "nlsInput_" + code,
								name: "nlsInput_" + code,
								placeholder: label
							});
							if (hide) {
								input.hide();
							}
							input.inject(div);
						});
						return div;
					}
				});
				//scope name
						myFields.push({
								type: 'autocomplete',
								name: "scope_name",
								label: myNls.get('scopesNames'),
								placeholder: " ",
								required: true,
								allowFreeInput: true,
								showSuggestsOnFocus: true,
								multiSelect: true,
								disabled: true,
								//helperText :	"EnterType ",
								errorText: myNls.get('SpecialCharacterError')
							});
					//comment
					/*myFields.push({
						type: "textarea",
						name: "my_comment",
						label: myNls.get('Description'),
						placeholder: myNls.get('enterDescription')
					});*/

						//abstract
					myFields.push({
							type: "html",
							'class': 'form-group',
							name: "abstract",
							label: myNls.get('typeFormAbstractFieldLabel'),
							value: "False",
							html: new function() {

								var label = UWA.createElement('label', {
									'text': myNls.get('typeFormAbstractFieldLabel')
								});
								var labelHelp = UWA.createElement('i', {
									'text': myNls.get('typeFormAbstractFieldDescrip')
								});
								var toggle = new Toggle({
									type: 'switch',
									name: 'abstractOption',
									value: 'option1',
									label: myNls.get('typeFormAbstractFieldOption')
								}); //.check()
								var div = UWA.createElement('div', {
									'class': 'myAbstractOptDiv'
								});
								label.inject(div);
								labelHelp.inject(div);
								toggle.inject(div);
								return div;
							}
						});
					break;
				default:
					throw new TypeError("CustoExtForm constructor required a correct editMode");
			}

			_theCustoExtForm = new Form({
				//className : 'horizontal',
				grid: '4 8',
				fields: myFields,

				//button
				/*buttons: [{
						type: 'submit',
						value: myNls.get('Save')
					},
					{
						type: 'cancel',
						value: myNls.get('Cancel'),
						id: "myCancelBtn"
					}
				],*/

				//block submit du formulaire
				//button event fired
				events: {
					onSubmit: function() {
						UWA.log("Done button clicked");
						//Mask.mask(widget.body);
						var onWSComplete = function(resp) {
							console.log("onComplete response:");
							console.log(resp);
							Mask.unmask(widget.body)
							//pSkeleton.getCollectionAt(1).parse(resp);
							var currStep = pSkeleton.getCurrentPanelIndex();
							var id = _interface_name;
							//pSkeleton.getCollectionAt(1).attGrpCreated = true;
							switch (_modeEdit) {
								case "New":
									if(pSkeleton.currentRouteSteps[currStep-1].get('renderer')==="Extensions")
										currStep = currStep-1;
									pSkeleton.getCollectionAt(currStep).myReset=true;
									pSkeleton.getCollectionAt(currStep).setup();
									pSkeleton.getCollectionAt(currStep).fetch({
										data:{
											maxAge:0,
											lang: widget.lang
										},
										onComplete: function(collection, response, options) {
											console.log(collection);
											//pSkeleton.getViewAt(1).collection.sort();
											//pSkeleton.getViewAt(1).render();
											/*var modelOfCreatedType = pSkeleton.getCollectionAt(currStep).findWhere({
												id: _interface_name
											});
											var newTypeElem = pSkeleton.getViewAt(currStep).contentsViews.tile.nestedView.getChildView(modelOfCreatedType);
											newTypeElem.select();*/
											var modModel = collection.get(_interface_name);
											var nestedView = pSkeleton.getViewAt(currStep).contentsViews.tile.nestedView;
											nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
										}
									});
									break;
								case "AddSub":
								case "AddScopeFromType":
									pSkeleton.getCollectionAt(currStep - 1).myReset=true;
									pSkeleton.getCollectionAt(currStep - 1).setup();
									pSkeleton.getCollectionAt(currStep - 1).fetch({
										data:{
											maxAge:0,
											lang: widget.lang
										},
										onComplete: function(collection, response, options) {
											var modModel = collection.get(_model.get('id'));
											var nestedView = pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
											nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
											//pSkeleton.getActiveIdCard().model = modModel;
											//pSkeleton.getActiveIdCard().render();
											pSkeleton.getCollectionAt(currStep).setup();
											pSkeleton.getCollectionAt(currStep).fetch({
												data:{
													maxAge:0,
													lang: widget.lang
												}
											});
										}
									});
									break;
								case "Edit":
									pSkeleton.getCollectionAt(currStep - 1).myReset=true;
									pSkeleton.getCollectionAt(currStep - 1).setup();
									pSkeleton.getCollectionAt(currStep - 1).fetch({
										data:{
											maxAge:0,
											lang: widget.lang
										},
										onComplete: function(collection, response, options) {
											var modModel = collection.get(_interface_name);
											pSkeleton.getModelAt(currStep)._attributes=modModel._attributes;
											pSkeleton.getActiveIdCard().model = modModel;
											pSkeleton.getActiveIdCard().render();
											var nestedView = pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
											nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
										}
									});
									break;
								case "AddScope":
									pSkeleton.getCollectionAt(currStep - 1).myReset=true;
									pSkeleton.getCollectionAt(currStep - 1).setup();
									pSkeleton.getCollectionAt(currStep - 1).fetch({data:{
										maxAge:0,
										lang: widget.lang
									},
										onComplete: function(collection, response, options) {
										var modModel = collection.get(_interface_name);
										pSkeleton.getModelAt(currStep)._attributes=modModel._attributes;
										pSkeleton.getActiveIdCard().model = modModel;
										pSkeleton.getActiveIdCard().render();
										var nestedView = pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
										nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
										pSkeleton.getCollectionAt(currStep).setup();
										pSkeleton.getCollectionAt(currStep).fetch(
												{data:{
													maxAge:0
												}
												});
									}
									});
									break;
							}
						};
						var onWSFailure = function(resp) {
							/*console.log("onFailure error:");
							console.log(err);*/
							//Mask.unmask(widget.body);
							var alert = new Alert({
								visible : true,
								//autoHide: true,
								//hideDelay: 3000
								//closable: false,
								closeOnClick : true,
								renderTo : pSkeleton.container,
								messageClassName : 'error',
								messages : resp,
								autoHide : true,
								hideDelay : 3000
								});
							console.log("onFailure response:");
							console.log(resp);
						};
						var type_scope_name = [];
						if(this.getAutocompleteInput("scope_name"))
							type_scope_name = this.getAutocompleteInput("scope_name").selectedItems; //this.getField('scope_name').value;
						/*if(type_scope_name.length===0) {
							var alert2 = new Alert({
					visible : true,
					//autoHide: true,
					//hideDelay: 3000
					//closable: false,
					closeOnClick : true,
					renderTo : widget.body,
					messageClassName : 'error',
					messages : "no Scope"
					});
							acscope.onFocus();
							return;
						}*/
						var scope_type = [],
							scope_rel = [],
							scopes = [];
						var interface_name = this.getTextInput('interface_name').getValue();
						//var interface_comment = this.getField('my_comment').value;
						var isAbstract = false;

						var data = "";
						var newUuid = UuidHandler.create_UUID();
						var nlsArray = {};
						var flag = false;
						// Abstract
						if(this.getField('abstractOption'))
							var interface_abstract = this.getField('abstractOption').checked;
						else
							var interface_abstract = _model.get('isAbstract')==="Yes";
						//IR-818199-3DEXPERIENCER2021x S63 Checking if a model exist (modify context) and checking if if it really interface information
						if(_model!=undefined && _model.get('nature')==="Interface")
						var DMSStatus = _model.get('DMSStatus');
						switch (_modeEdit) {
							case "New":
							case "AddSub":
							case "AddScopeFromType":
								var interface_parent_name = this.getAutocompleteInput("parent_name").selectedItems[0]; //this.getField('scope_name').value;
								if(type_scope_name.length!==0)
									var isIRPC = type_scope_name[0]['isIRPC'];
								else
									var isIRPC = interface_parent_name['isIRPC'];
								var packageName = dicoHandler.getPackageNameToCreate(isIRPC=="Yes",false);
								this.getFields().forEach(function(item) {
									if (item.name.startsWith('nlsInput')) {
										var key = item.name.split('_')[1];
										var nlsValue = item.value;
										if(key==="en" && nlsValue!==null && nlsValue==="") {
											nlsValue = dicoHandler.getDisplayName(interface_name);
										}
										if(nlsValue!=="")
											nlsArray[key] = nlsValue;
										/* nlsArray.push({
											"key": key,
											"nlsValue": nlsValue
										});*/

									}
								});
								for (var i = 0; i < type_scope_name.length; i++) {
									var scopeTmp = type_scope_name[i]['value'];
									scopes.push(scopeTmp);
									if (type_scope_name[i]['scopeNature'] === 'Type') {
										scope_type.push(scopeTmp);
									} else if (type_scope_name[i]['scopeNature'] === 'Relationship') {
										scope_rel.push(scopeTmp);
									}
								}
						_interface_name = interface_name + dicoHandler.charFlag + newUuid.getUuidWithoutSeparator();
						data = {
							"Name": _interface_name,
							"NameNLS": nlsArray,
							"Nature": "Interface",
							"Parent": interface_parent_name?interface_parent_name['value']:"",
							//"FirstOOTB": "",
							"Abstract": interface_abstract?"Yes":"No",
							"CustomerExposition": "Programmer",
							//"Specializable": "Yes",
							"Specialization": "Yes",
							"Deployment": "No",
							"Customer": "Yes",
							"Automatic": "No",
							//"Typing": "No",
							"Package": packageName,
							//"Description": interface_comment,
							"ScopeTypes": scope_type,
							"ScopeRelationships": scope_rel,
							//"Attributes": {}
						}
						//IR-818199-3DEXPERIENCER2021x S63 adding DMSStatus if existing
						if(DMSStatus!=undefined)
							data['DMSStatus']=DMSStatus;
						webService.aggregatorCreate(data, "Interface", onWSComplete, onWSFailure);
								break;
							case "Edit":
								var interface_parent_name = this.getTextInput('parent_name').getValue();
								var isIRPC = dicoHandler.isIRPC(_model.get('id'),"Interfaces")? "Yes" : "No";
								this.getFields().forEach(function(item) {
									if (item.name.startsWith('nlsInput')) {
										var key = item.name.split('_')[1];
										var nlsValue = item.value;
										if(key==="en" && nlsValue!==null && nlsValue==="") {
											nlsValue = dicoHandler.getDisplayName(_model.get('id'));
										}
										if(nlsValue!=="")
											nlsArray[key] = nlsValue;
										/* nlsArray.push({
											"key": key,
											"nlsValue": nlsValue
										});*/

									}
								});
								if (_model.get('ScopeTypes') !== undefined) {
									for (var i = 0; i < _model.get('ScopeTypes').length; i++) {
										var scopeType = _model.get('ScopeTypes')[i];
											scope_type.push(scopeType);
											scopes.push(scopeType);
									}
								}
								if (_model.get('ScopeRelationships') !== undefined) {
									for (var i = 0; i < _model.get('ScopeRelationships').length; i++) {
										var scopeRel = _model.get('ScopeRelationships')[i];
											scope_rel.push(scopeRel);
											scopes.push(scopeRel);
									}
								}
							packageName = _model.get('Package');
							_interface_name = _model.get('id');
							data = {
									"Name": _interface_name,
									"NameNLS": nlsArray,
									"Nature": "Interface",
									//"Parent": interface_parent_name?interface_parent_name['value']:"",
									//"FirstOOTB": ""
									"Abstract": interface_abstract?"Yes":"No",
									//"CustomerExposition": "Programmer",
									//"Specializable": "Yes",
									//"Specialization": "Yes",
									//"Deployment": "Yes",
									//"Customer": "No",
									//"Automatic": "Yes",
									//"Typing": "No",
									"Package": packageName,
									//"Description": interface_comment,
									"ScopeTypes": scope_type,
									"ScopeRelationships": scope_rel,
									"scopes": scopes,
									//"Attributes": {}
							}
							//IR-818199-3DEXPERIENCER2021x S63 adding DMSStatus if existing
							if(DMSStatus!=undefined)
								data['DMSStatus']=DMSStatus;
							//webService.canBeModified({"adminName":_interface_name,"adminType":"Interface","operation":"modify"},function(resp){if(resp["result"]["canBeModified"]==="true") {webService.aggregatorModify(data,"Interface",onWSComplete,onWSFailure);}},onWSFailure)
							webService.aggregatorModify(data,"Interface",onWSComplete,onWSFailure);
								break;
							case "AddScope":
								nlsArray = _model.get('NameNLS');
								for (var i = 0; i < type_scope_name.length; i++) {
									var scopeTmp = type_scope_name[i]['value'];
									scopes.push(scopeTmp);
									if (!_model.get('scopes').includes(scopeTmp)) {
										if (type_scope_name[i]['scopeNature'] === 'Type') {
											scope_type.push("add:" + scopeTmp);
										} else if (type_scope_name[i]['scopeNature'] === 'Relationship') {
											scope_rel.push("add:" + scopeTmp);
										}
									}
								}
								if (_model.get('ScopeTypes') !== undefined) {
									for (var i = 0; i < _model.get('ScopeTypes').length; i++) {
										var scopeType = _model.get('ScopeTypes')[i];
										if(_model.get('DMSStatus')!=undefined) {
											scope_type.push(scopeType);
											scopes.push(scopeType);
										}
										else {
											var exist = false;
											for (var j = 0; j < type_scope_name.length; j++) {
												if (type_scope_name[j]['value'] === scopeType) {
													exist = true;
												}
											}
											if (exist) {
												scope_type.push(scopeType);
											} else {
												scope_type.push("remove:" + scopeType);
											}
										}
									}
								}
								if (_model.get('ScopeRelationships') !== undefined) {
									for (var i = 0; i < _model.get('ScopeRelationships').length; i++) {
										var scopeRel = _model.get('ScopeRelationships')[i];
										if(_model.get('DMSStatus')!=undefined) {
											scope_rel.push(scopeRel);
											scopes.push(scopeRel);
										}
										else {
											var exist = false;
											for (var j = 0; j < type_scope_name.length; j++) {
												if (type_scope_name[j]['value'] === scopeRel) {
													exist = true;
												}
											}
											if (exist) {
												scope_rel.push(scopeRel);
											} else {
												scope_rel.push("remove:" + scopeRel);
											}
										}
									}
								}
							packageName = _model.get('Package');
							_interface_name = _model.get('id');
							data = {
									"Name": _interface_name,
									"NameNLS": nlsArray,
									"Nature": "Interface",
									//"Parent": interface_parent_name?interface_parent_name['value']:"",
									//"FirstOOTB": ""
									"Abstract": interface_abstract?"Yes":"No",
									//"CustomerExposition": "Programmer",
									//"Specializable": "Yes",
									//"Specialization": "Yes",
									//"Deployment": "Yes",
									//"Customer": "No",
									//"Automatic": "Yes",
									//"Typing": "No",
									"Package": packageName,
									//"Description": interface_comment,
									"ScopeTypes": scope_type,
									"ScopeRelationships": scope_rel,
									"scopes": scopes,
									//"Attributes": {}
							}
							//IR-818199-3DEXPERIENCER2021x S63 adding DMSStatus if existing
						if(DMSStatus!==undefined)
							data['DMSStatus']=DMSStatus;
							//webService.canBeModified({"adminName":_interface_name,"adminType":"Interface","operation":"modify"},function(resp){if(resp["result"]["canBeModified"]==="true") {webService.aggregatorModify(data,"Interface",onWSComplete,onWSFailure);}},onWSFailure)
							webService.aggregatorModify(data,"Interface",onWSComplete,onWSFailure);
								break;
						}
						this._parent.destroy();
					},//fin block submit formulaire
					onCancel: function() {
							UWA.log("cancel button clicked");
							}
				}
			});

			//init du formulaire
			/*_theCustoExtForm.getContent().getElement('#myCancelBtn').addEvent('click', function() {
					_theCustoExtForm._parent.destroy();
				});*/
			_theCustoExtForm.myValidate = function(){
				if(_modeEdit!=="Edit" && _modeEdit!=="AddScope") {
					var txtName = this.getTextInput("interface_name").getValue();
					var regEx = new RegExp("^[0-9]|_");
					if(txtName.startsWith("XP") || regEx.test(txtName) || dicoHandler.isNameExisting(txtName,"Interfaces")) {
						this.getField("interface_name").getParent('.form-group').addClassName('has-error');
						this.dispatchEvent('onInvalid');
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 2000
						}).inject(this.elements.container);
						alert.add({
							className: 'error',
							message: myNls.get('popUpNameError')
						});
						return false;
					}
				}
				return this.validate();
			};
			var inputName = _theCustoExtForm.getField('interface_name');
			inputName.addEventListener('input',function() {
				var spanErrorName = document.getElementById("NameWarning");
				if (spanErrorName === undefined) {
					spanErrorName = UWA.createElement('span', {
						id: "NameWarning"
					});
					// LMT7 IR-867366-3DEXPERIENCER2022x : 09/11/21
					spanErrorName.appendText(myNls.get("AlphaNumericWarning"));
					spanErrorName.setStyle('font-style', 'italic');
					spanErrorName.setStyle('color', '#EA4F37');
					var parent = this.getParent();
					spanErrorName.inject(parent.firstChild);
					spanErrorName.hidden = true;

				}
				var regexAlphaNumeric = new RegExp("^[a-zA-Z0-9]+$");
				if (this.value.length > 0 && !regexAlphaNumeric.test(this.value)) {
					spanErrorName.hidden = false;
					/*var regexRet = new RegExp("^[a-zA-Z0-9]+");
					var res = this.value.match(regexRet);
					if (res != null) {
						this.value = res[0];
					} else {
						this.value = "";
					}*/
				} else {
					spanErrorName.hidden = true;
				}
			});
			var abstractOption = _theCustoExtForm.getField('abstractOption');
			var acscope = _theCustoExtForm.getAutocompleteInput('scope_name');
			var searchScope = {};
			var acparent = _theCustoExtForm.getAutocompleteInput('parent_name');
			searchScope.configuration = {};
			searchScope.configuration.searchEngine = function(dataset, text) {
				text = text.toLowerCase();
				var sug = [];
				dataset.items.forEach(function(item) {
					if (item.label.toLowerCase().contains(text)) {
						sug.push(item);
					}
					else if(item.subLabel.toString().toLowerCase().contains(text)) {
						sug.push(item);
					}
				});
				return sug;
			};
			var searchParent = {};
			searchParent.configuration = {};
			searchParent.configuration.searchEngine = function(dataset, text) {
				text = text.toLowerCase();
				var sug = [];
				dataset.items.forEach(function(item) {
					if (item.label.toLowerCase().contains(text)) {
						sug.push(item);
					}
					else if(item.subLabel.toString().toLowerCase().contains(text)) {
						sug.push(item);
					}
				});
				return sug;
			};
			dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
			//				if (!this.modeEdit) {
			switch (this.modeEdit) {
				case "New":
				searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope);
					acscope.addDataset(searchScope);
					searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent);
					acparent.elements.input.onchange = function(item) {
						if (acparent.selectedItems.length === 0 || acparent.selectedItems[0].label !== this.value) {
							acparent.reset();
							//acparent.onUpdateSuggests();
						}
					};
					acparent.addDataset(searchParent);
					break;
					//} else {
				case "Edit":
					/*if(this.model.get('parent')){
						//var extParent = dicoHandler.getCustomerExtension(this.model.get('parent'));
						//if(extParent && ((extParent['ScopeTypes'] && extParent['ScopeTypes'].length !==1) || (extParent['ScopeRelationships'] && extParent['ScopeRelationships'].length !==1))) {
						var scopes = dicoHandler.customerExtensionHadScope(this.model.get('parent'));
						if(scopes && scopes.length!==0) {
							searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope, isIRPC);
							acscope.addDataset(searchScope);
							acscope.disable();
							for (var i = 0; i < scopes.length; i++) {
								acscope.toggleSelect(acscope.getItem(scopes[i]), -1, true);
							}
						}
						else {
							var isIRPC = dicoHandler.isIRPC(this.model.get('parent'),'Interfaces')
									isIRPC ? isIRPC = 'Yes' : isIRPC = 'No';
							searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope, isIRPC);
							acscope.addDataset(searchScope);
						}
						searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent, isIRPC);
						acparent.addDataset(searchParent);
						acparent.toggleSelect(acparent.getItem(this.model.get('parent')), -1, true);

					} else {
					if (this.model.get('ScopeRelationships') && this.model.get('ScopeRelationships').length != 0) {
						var isIRPC = dicoHandler.isIRPC(this.model.get('ScopeRelationships')[0], 'Relationships');
						isIRPC ? isIRPC = 'Yes' : isIRPC = 'No';
						//searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope, isIRPC);
						//acscope.addDataset(searchScope);
						searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent, isIRPC);
						acparent.addDataset(searchParent);
					} else if (this.model.get('ScopeTypes') && this.model.get('ScopeTypes').length != 0) {
						var isIRPC = dicoHandler.isIRPC(this.model.get('ScopeTypes')[0], 'Types');
						isIRPC ? isIRPC = 'Yes' : isIRPC = 'No';
						//searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope,isIRPC);
						//acscope.addDataset(searchScope);
						searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent,isIRPC);
						acparent.addDataset(searchParent);
					} else {
						//searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope);
						//acscope.addDataset(searchScope);
						searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent);
						acparent.addDataset(searchParent);
					}*/
					/*for (var i = 0; i < this.model.get('scopes').length; i++) {
						acscope.toggleSelect(acscope.getItem(this.model.get('scopes')[i]), -1, true);
					}
				}*/
					abstractOption.checked=this.model.get('isAbstract')==="Yes";
					abstractOption.disabled=this.model.get('DMSStatus')!==undefined;
					break;
				case "AddSub":
					//ac.addDataset(dicoHandler.getExtensibleTypes());
					var scopes = dicoHandler.customerExtensionHadScope(this.model.get('id'));
					//if((this.model.get('ScopeTypes') && this.model.get('ScopeTypes').length !==0) || (this.model.get('ScopeRelationships') && this.model.get('ScopeRelationships').length !==0)) {
					if(scopes&&scopes.length!==0) {
						acscope.disable();
						acscope.options.required=false;
					}
					var isIRPC = dicoHandler.isIRPC(this.model.get('id'),'Interfaces');
							isIRPC ? isIRPC = 'Yes' : isIRPC = 'No';
					searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope,isIRPC);
					acscope.addDataset(searchScope);
					searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent, isIRPC);
					acparent.addDataset(searchParent);
					acparent.toggleSelect(acparent.getItem(this.model.get('id')), -1, true);
					if(scopes) {
						for (var i = 0; i < scopes.length; i++) {
							acscope.toggleSelect(acscope.getItem(scopes[i]), -1, true);
						}
					}
					break;
				case "AddScope":
					//ac.addDataset(dicoHandler.getExtensibleTypes());
					if(_model.get('DMSStatus')!==undefined)
						var acscopelock = _theCustoExtForm.getAutocompleteInput('lock_scope_name');
					var isIRPC = dicoHandler.isIRPC(this.model.get('id'),'Interfaces')
							isIRPC ? isIRPC = 'Yes' : isIRPC = 'No';
				searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope, isIRPC);
					acscope.addDataset(searchScope);
					if(_model.get('DMSStatus')!==undefined)
						acscopelock.addDataset(searchScope);
					searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent, isIRPC);
					acparent.addDataset(searchParent);

					if(this.model.get('DMSStatus')===undefined) {
						for (var i = 0; i < this.model.get('scopes').length; i++) {
							acscope.toggleSelect(acscope.getItem(this.model.get('scopes')[i]), -1, true);
						}
					}
					else {
						for (var i = 0; i < this.model.get('scopes').length; i++) {
							acscope.disableItem(this.model.get('scopes')[i]);
							if(_model.get('DMSStatus')!==undefined)
								acscopelock.toggleSelect(acscopelock.getItem(this.model.get('scopes')[i]));
						}
					}
					acparent.toggleSelect(acparent.getItem(this.model.get('parent')), -1, true);
					//abstractOption.checked=this.model.get('isAbstract')==="Yes"?true:false;
					break;
				case "AddScopeFromType":
					var nature = this.model.get('nature');
					var isIRPC = dicoHandler.isIRPC(this.model.get('id'),nature+"s");
					isIRPC ? isIRPC = 'Yes' : isIRPC = 'No';
					searchScope = dicoHandler.getExtensibleTypesForAutoComplete(searchScope, isIRPC);
					acscope.addDataset(searchScope);
					searchParent = dicoHandler.getCustoExtForAutoComplete(searchParent, isIRPC);
					acparent.addDataset(searchParent);
					acscope.toggleSelect(acscope.getItem(this.model.get('id')), -1, true);
					break;
			}

			//pop up d'erreur si parent et scope pas en accords -> devrait être impossible
			/*var footer = UWA.createElement('div')
			var mySavbutton = new Button({
				value: myNls.get('ProceedLabel'),
				className: 'primary'
			}).inject(footer);
			var myCancelBtn = new Button({
				value: myNls.get('Cancel'),
				className: 'default'
			}).inject(footer);
			var title = UWA.createElement('h4');
			var attentionIcon = UWA.createElement('span', {
				class: "fonticon fonticon-attention"
			}).inject(title);
			title.appendText(myNls.get("warning"));
			title.setStyle("color", "#E87B00");
			var body = UWA.createElement('p');
			body.appendText("le scope ne correspond pas au type parent");
			var myModal = new Modal({
				closable: true,
				header: title,
				body: body,
				footer: footer
			}).inject(_theCustoExtForm.elements.container);*/


			/*mySavbutton.addEvent('onClick', function() {
				if (defaultValue.fieldInput instanceof Autocomplete) {
					defaultValue.fieldInput.reset();
				} else {
					defaultValue.fieldInput.setValue("")
				}
				defaultValue.disable(false);
				myModal.hide();
			});
			myCancelBtn.addEvent('onClick', function() {
				myModal.hide();
				multiValue.fieldInput.setCheck(false);
			});*/
			return _theCustoExtForm;
		}
	};
	return CustoExtForm;
});

/**
 * Form to create a interface
 */

define('DS/DMSApp/Views/CustomModal',

['DS/UIKIT/Modal',
  'DS/UIKIT/Form',
  'DS/UIKIT/Spinner',
  'DS/UIKIT/Mask',
  'DS/UIKIT/Input/Text',
  'DS/DMSApp/Utils/URLHandler',
  'UWA/Promise',
  'DS/WAFData/WAFData',
  'DS/UIKIT/Input/Select',
  'DS/UIKIT/Input/Toggle',
  'DS/UIKIT/Input/Number',
  'DS/UIKIT/Input/Button',
  'DS/UIKIT/Input/ButtonGroup',
  'WebappsUtils/WebappsUtils',
  'DS/DMSApp/Utils/dictionaryJSONHandler',
  'i18n!DS/DMSApp/assets/nls/DMSAppNLS'
],
function(Modal, Form, Spinner, Mask, Text, URLHandler, Promise, WAFData, Select, Toggle, Number, Button, ButtonGroup, WebappsUtils, dicoHandler, myNls) {
  "use strict";
  //url is the only attribute of this class.
  function CustomModal(aElementToDisplay, aContainer, aHeader) {
    if (!(this instanceof CustomModal)) {
      throw new TypeError("CustomModal constructor cannot be called as a function.");
    }
    this.display = aElementToDisplay;
    this.container = aContainer;
    this.headerTitle = aHeader;
  }

  CustomModal.prototype = {
    constructor: CustomModal,
    build: function() {},
    //Modal for the Type form and Extension form
    formModal: function(form, container) {
      _theModal = new Modal({
        className: 'fancy',
        visible: true,
        closable: true,
        header: headerDiv,
        body: form,
        renderTo: container,

        events: {
          onHide: function() {
            UWA.log("the Modal Closed");
            _theModal.destroy();
          }
        }
      });
      /*_theModal.getBody().getElement('#myCancelBtn').addEvent('click', function() {
        _theModal.hide();
      });*/
      return _theModal;
    },

    build: function() {
    	var myModal;
      //tag div element
      var headerDiv = UWA.createElement('div', {
        'class': 'global-div'
      });

      //title for the Modal
      var heading = UWA.createElement('h4', {
        text: this.headerTitle
      }).inject(headerDiv);

      //tag nav element
      var _tabPanel = UWA.createElement('nav', {
        'class': 'tab tab-pills',
        'id': 'the-forms'
      }).inject(headerDiv);
      var form = this.display;
      var okButton = new Button({
          value : myNls.get('Save'),
          className : 'btn primary',
          type: 'submit',
          events : {
    	  'onClick' : function() {
		      	this.setDisabled(true);
	    	  if(typeof form.myValidate === "function" && form.myValidate()) {
	    		  form.dispatchEvent('onSubmit');
	    	  }
		      	else {
		      		this.setDisabled(false);
		      	}
      		}
	      }
      });
      var cancelButton = new Button({
          value : myNls.get('Cancel'),
          type: 'cancel',
          events : {
              'onClick' : function() {
              UWA.log("DoSomething");
              myModal.destroy();
          }
      	}
      });
    myModal = new Modal({
        className: 'fancy',
        visible: true,
        closable: true,
        header: headerDiv,
        body: this.display,
        renderTo: this.container,
        footer : [ okButton, cancelButton],

        events: {
          onHide: function() {
            UWA.log("the Modal Closed");
            myModal.destroy();
          }
        }
      });
      this.display._parent=myModal;
    }
};
  return CustomModal;
});

define('DS/DMSApp/Utils/Renderers/ScopeRenderer', [
		'DS/W3DXComponents/Skeleton',
		'DS/W3DXComponents/Collections/ActionsCollection',
		'DS/W3DXComponents/Views/Layout/TableScrollView',
		'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
		'DS/DMSApp/Views/CustomModal'
	],
	function(Skeleton, ActionsCollection, TableScrollView, myNls,CustomModal) {
	"use strict";

	return {
		collection: 'DS/DMSApp/Collections/TypeCollection',
		view: 'DS/W3DXComponents/Views/Item/SetView', // 'DS/DMSApp/Views/Layouts/attributesLayout',
		viewOptions: {
			//itemView : TileView,
			contents: {
				events: {
				},
				useInfiniteScroll: false,
				usePullToRefresh: false,
				//className : "table",
				views: [
					{
						'id': 'tile',
						'title': "AttributeList",
						'className': "table",
						'view': TableScrollView,
						events: {
							onSwitch: function() {
								console.log("onSwitch");
							}
						}
					}
				],
				headers: [
					{
						'label': "Name",
						'property': 'title'
					},
					{
						'label': "Parent",
						'property': 'subtitle'
					},
					{
						'label': "Description",
						'property': 'Description'
					}
				]
			},
			actions: {
				collection: function() {
					var lActions = [];
					if(pSkeleton.isAuthoring) {
						lActions.push({
							id: 'editScope',
							title: 'Edit_Scopes',
							icon: 'fonticon fonticon-pencil',
							overflow: false
						});
					}
					var acts = new ActionsCollection(lActions);
					return acts;
				},
				events: {
					'onActionClick': function(actionsView, actionView, event) {
						var actionId = actionView.model.get('id');
						UWA.log("actionId " + actionId);
						if (actionId === 'editScope') {
							require(['DS/DMSApp/Views/InterfaceForm'], (function(InterfaceForm) {
								var myInterfaceForm = new InterfaceForm("Edit",pSkeleton.getActiveIdCard()['model']);
								var formBuild = myInterfaceForm.build();
								var myModal = new CustomModal(formBuild,pSkeleton.container,"Edit an interface");
								myModal.build();
							}).bind(this))
						}
					}
				}
			}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				ownerName: 'subtitle',
				description: 'content'
			},
			thumbnail: function() {
				return {
					squareFormat: true,
					url: this.get('image')
				};
			},
			actions: function() {
				if(this._attributes.isInherited=="No"){
					return [{
						text: "EditMode(Mettre du NLS)",
						icon: 'pencil',
						handler: function(view) {
							UWA.log("Edition of attribute");
							view.editModeOn();
						}
					}];
				}
			},
			facets: function() {
				return [{
					text: myNls.get('AttrOfTypeTab'),
					icon: 'doc-text',
					name: 'hjhjh',
					handler: Skeleton.getRendererHandler('Typeattributes')
				},
				{
					text: myNls.get('GpOfAttrOfTypeTab'),
					icon: 'doc-text',
					name: 'process',
					handler: Skeleton.getRendererHandler('attributesGroup')
				},
				{
					text: myNls.get('ExtOfTypeTab'),
					icon: 'doc-text',
					name: 'extension',
					handler: Skeleton.getRendererHandler('Extensions')
				},
				{
					text: myNls.get('SubTypeTab'),
					icon: 'doc-text',
					name: 'subType',
					handler: Skeleton.getRendererHandler('SubTypes')
				}
				];
			}
		}

	};
});

define('DS/DMSApp/Utils/Renderers/SubTypesRenderer',
  [
    'DS/W3DXComponents/Skeleton',
    'DS/W3DXComponents/Collections/ActionsCollection',
    'DS/W3DXComponents/Views/Layout/GridScrollView',
    'DS/W3DXComponents/Views/Item/TileView',
    'DS/UIKIT/Autocomplete',
    'DS/DMSApp/Views/CustomModal',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
  ],
  function(Skeleton, ActionsCollection, GridScrollView, TileView, Autocomplete, CustomModal, dicoHandler, myNls) {
    "use strict";

    var Typeattributes = {
      collection: 'DS/DMSApp/Collections/SubTypesOfTypeCollection',
      view: 'DS/W3DXComponents/Views/Item/SetView', // 'DS/DMSApp/Views/Layouts/attributesLayout',
      viewOptions: {
        //itemView : TileView,
        contents: {
          useInfiniteScroll: false,
          usePullToRefresh: false,

          //className : "table",
          views: [{
            'id': 'tile',
            'title': "AttributeList",
            'className': "table",
            'view': GridScrollView,
            'itemView': TileView
          }],
          headers: [{
            'label': "Name",
            'property': 'id'
          }],

        },
        actions: {
          collection: function() {
        	var acts = [];
        	acts.push({
            title: myNls.get("searchSubTypeToolTip"),
            icon: 'fonticon fonticon-search',
            id: 'SubTypeSearchId',
            overflow: false,
            relatedView: this
          });
          var currentIndex = pSkeleton.getCurrentPanelIndex();
          var isOOTB = false;
          var nature = pSkeleton.getModelAt(currentIndex-1).get('nature');
          if (nature!=undefined && nature !="menu") {
              var isOOTB = dicoHandler.isOOTBAggregator2(pSkeleton.getModelAt(currentIndex)._attributes)
          }
          if (pSkeleton && pSkeleton.isAuthoring && !isOOTB) {
          	acts.push({
          		id: "createSubTypeFromSubTypeView",
          		title: myNls.get("createSubTypeToolTip"),
          		icon: 'plus',
          		overflow: false,
              relatedView: this
          	});
          }
        /*  acts.push({
            id: 'filterAttr',
            //title : "Attributeform",
            icon: 'fonticon fonticon-filter',
            overflow: false
          });*/
            return new ActionsCollection(acts);
          },
          events: {
            'onActionClick': function(actionsView, actionView, event) {
              var actionId = actionView.model.get('id');
              UWA.log("actionId " + actionId);
              if (actionId === 'SubTypeSearchId') {
                var searchExist = this.container.getElement("#searchAutoCompleteInputAttr");
                if (searchExist != null) {
                  searchExist.destroy();
                } else {
                  var searchDiv = UWA.createElement('div', {
                    'id': 'searchAutoCompleteInputAttr',
                    'class': 'autoCompleteSearch'
                  });
                  searchDiv.setStyle('width', '250px');
                  var insertDiv = actionView.container.parentNode.insertBefore(searchDiv, actionView.container);
                  var autoComplete = new Autocomplete({
                    showSuggestsOnFocus: true,
                    multiSelect: false,
                    minLengthBeforeSearch: 0,
                    datasets: [],
                    events: {

                      onKeyUp: function(key) {
                        var tileList = actionView.model._attributes.relatedView.contentsViews.tile.nestedView.children;
                        var keys = Object.keys(tileList);
                        if (Array.isArray(keys)) {
                          keys.forEach(function(iElement) {
                            var tile = tileList[iElement];
                            if (tile.model._attributes.title.toLowerCase().contains(key.currentTarget.value.toLowerCase()) || tile.model._attributes.subtitle.toLowerCase().contains(key.currentTarget.value.toLowerCase())) {
                              tile.show();
                            } else {
                              tile.hide();
                            }
                          });
                        }
                      },
                      onSelect: function(item) {

                        var selectItem = [];
                        var auto = this;
                        auto.selectedItems.forEach(function(elem) {
                          selectItem.push(elem.label);
                        });
                        var tileList = actionView.model._attributes.relatedView.contentsViews.tile.nestedView.children;
                        var keys = Object.keys(tileList);
                        var typeNumber = keys.length;
                        if (Array.isArray(keys)) {
                          keys.forEach(function(iElement) {
                            var tile = tileList[iElement];
                            if (tile.model.get("title") == item.value || tile.model.get("subtitle") == item.value) {
                              tile.show();
                            } else if (selectItem.indexOf(tile.model.get("title")) === -1) {
                              tile.hide();
                              typeNumber--;
                            }
                          });

                        }
                      },
                      onUnselect: function(item, badge, badgePos) {
                        var tileList = actionView.model._attributes.relatedView.contentsViews.tile.nestedView.children;
                        var keys = Object.keys(tileList);
                        var typeNumber = keys.length;
                        if (Array.isArray(keys)) {
                          keys.forEach(function(iElement) {
                            var tile = tileList[iElement];
                            tile.show();
                          });
                        }
                      }
                    }
                  }).inject(insertDiv);
                  var searchDico = {};
                  searchDico.name = "Attr";
                  searchDico.items = [];
                  actionView.model._attributes.relatedView.collection._models.forEach(function(iElem) {
                    searchDico.items.push({
                      value: iElem._attributes.title,
                      subLabel: iElem._attributes.subtitle
                    });
                  });
                  searchDico.configuration = {};
                  searchDico.configuration.searchEngine = function(dataset, text) {
                    text = text.toLowerCase();
                    var sug = [];
                    dataset.items.forEach(function(item) {
                      if (item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text)) {
                        sug.push(item);
                      }
                    });
                    return sug;
                  }
                  autoComplete.addDataset(searchDico);
                  autoComplete.elements.clear.onclick = function() {
                    var tileList = actionView.model._attributes.relatedView.contentsViews.tile.nestedView.children;
                    var keys = Object.keys(tileList);
                    var typeNumber = keys.length;
                    if (Array.isArray(keys)) {
                      keys.forEach(function(iElement) {
                        var tile = tileList[iElement];
                        tile.show();
                      });
                    }
                  }
                  searchDiv.getElementsByTagName('input')[0].focus();
                }
              } else if (actionId === "createSubTypeFromSubTypeView") {
                require(['DS/DMSApp/Views/TypeForm'], (function(TypeForm){
                  var currentPanel = pSkeleton.getCurrentPanelIndex();
                  var myModel = pSkeleton.getModelAt(currentPanel);
                  var myTypeForm = new TypeForm(true, false, myModel).buildForSubType();
                  //var formBuild = myInterfaceForm.build();
                  // LMT7 IR-867366-3DEXPERIENCER2022x : 09/11/21
                  var myModal = new CustomModal(myTypeForm, pSkeleton.getActiveIdCard().container, myNls.get('NewTypePopup')).build();
                }).bind(this))
              }
            }
          }
        },
        events: {
          onRenderSwitcherView: function(view) {
            // To hide the view switcher Icon
            view.container.hide();
            // To hide the "|" and the dot icon.
            var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
            if (actionsDiv != undefined && actionsDiv.length > 0) {
              actionsDiv[0].className = "set-actions";
            }
            var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
            if (actionInlineDot != undefined && actionInlineDot.length > 0) {
              actionInlineDot[0].hide();
            }
          }
        }
      },
      idCardOptions: {
        attributesMapping: {
          title: 'title',
          ownerName: 'subtitle',
          description: 'content'
        },
        facets: function() {
          return [{
              text: 'Attributes',
              icon: 'doc-text',
              name: 'hjhjh',
              handler: Skeleton.getRendererHandler('Typeattributes')
            },
            {
              text: 'Group of Attributes',
              icon: 'doc-text',
              name: 'process',
              handler: Skeleton.getRendererHandler('attributesGroup')
            },
            {
              text: 'Extensions',
              icon: 'doc-text',
              name: 'extension',
              handler: Skeleton.getRendererHandler('Extensions')
            },
            {
              text: 'Sub Type(s)',
              icon: 'doc-text',
              name: 'subType',
              handler: Skeleton.getRendererHandler('SubTypes')
            }
          ];
        }
      }

    };
    return Typeattributes;
  });

define('DS/DMSApp/Utils/Renderers/SubExtensionsRenderer',
[
	'DS/W3DXComponents/Collections/ActionsCollection',
	'DS/W3DXComponents/Views/Layout/GridScrollView',
	'DS/W3DXComponents/Views/Item/TileView',
	'DS/UIKIT/DropdownMenu',
	'DS/UIKIT/Autocomplete',
	'DS/DMSApp/Views/CustomModal',
	'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
	'css!DS/DMSApp/DMSApp'
],
function(ActionsCollection, GridScrollView, TileView, DropdownMenu, Autocomplete, CustomModal, myNls) {
	"use strict";

	return {
		collection: 'DS/DMSApp/Collections/SubCustoExtCollection',
		view: 'DS/W3DXComponents/Views/Item/SetView',
		viewOptions: {
			contents: {
				useInfiniteScroll: false,
				usePullToRefresh: false,
				views: [{
					'id': 'tile',
					'title': "AttributeList",
					'className': "table",
					'view': GridScrollView,
					'itemView': TileView
				}],
				headers: [{
					'label': "Name",
					'property': 'id'
				}],
			},
			actions: {
				collection: function() {
					var acts = [];
					acts.push({
						id: 'findType',
						title: myNls.get('FindTypePopup'),
						icon: 'fonticon fonticon-search',
						overflow: false
					});
					if (pSkeleton && pSkeleton.isAuthoring) {
						acts.push({
							id: 'addType',
							title: myNls.get('NewTypePopup'),
							icon: 'fonticon fonticon-plus',
							overflow: false
						});
					}
					acts.push({
						id: 'filterType',
						title: myNls.get("TypeFilterPopup"),
						icon: 'fonticon fonticon-filter',
						overflow: false
					});
					acts.push({
						id: 'sortType',
						title: myNls.get('SortTypePopup'),
						icon: 'fonticon fonticon-sort-alpha-asc ',
						overflow: false
					});
					return new ActionsCollection(acts);
				},
				events: {
					'onActionClick': function(actionsView, actionView, event) {
						console.log(actionsView);
						console.log(actionView);
						console.log(event);
						var actionId = actionView.model.get('id');
						switch (actionId) {
							case "findType":

								var searchExist = this.container.getElement("#searchAutoCompleteInput");
								if (searchExist != null) {
									searchExist.destroy();
								} else {
									var searchDiv = UWA.createElement('div', {
										'id': 'searchAutoCompleteInput',
										'class': 'autoCompleteSearch',
										styles: {
											//'width': '100%',
											overflow: 'visible'
										}
									});
									searchDiv.setStyle('width', '250px');
									var insertDiv = actionView.container.parentNode.insertBefore(searchDiv, actionView.container);
									//var insertDiv = pSkeleton.getActiveIdCard().elements.actionsSection.insertBefore(searchDiv, pSkeleton.getActiveIdCard().elements.actionsSection.getChildren()[0]);
									var autoComplete = new Autocomplete({
										showSuggestsOnFocus: true,
										multiSelect: false,
										minLengthBeforeSearch: 0,
										datasets: [],
										placeholder: myNls.get('SearchInputMsg'),
										events: {
											onKeyUp: function(key) {
												var currIndex = pSkeleton.getCurrentPanelIndex();
												if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
													currIndex = currIndex - 1;
												this.elements.clear.onclick = function() {
													var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
													var keys = Object.keys(tileList);
													var typeNumber = keys.length;
													if (Array.isArray(keys)) {
														keys.forEach(function(iElement) {
															var tile = tileList[iElement];
															tile.show();

														});
														pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
															number: typeNumber
														});
													}
												}.bind(this);
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														if (tile.model._attributes.title.toLowerCase().contains(key.currentTarget.value.toLowerCase()) || tile.model._attributes.subtitle.toLowerCase().contains(key.currentTarget.value.toLowerCase())) {
															tile.show();
														} else {
															tile.hide();
															typeNumber--;
														}
													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											},
											onSelect: function(item) {
												var currIndex = pSkeleton.getCurrentPanelIndex();
												if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
													currIndex = currIndex - 1;
												var selectItem = [];
												var auto = this;
												auto.selectedItems.forEach(function(elem) {
													selectItem.push(elem.label);
												});
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														if (tile.model._attributes.title == item.value || tile.model._attributes.subtitle == item.value) {
															tile.show();
														} else if (selectItem.indexOf(tile.model._attributes.title) === -1) {
															tile.hide();
															typeNumber--;
														}
													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											},
											onUnselect: function(item, badge, badgePos) {
												var currIndex = pSkeleton.getCurrentPanelIndex();
												if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
													currIndex = currIndex - 1;
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														tile.show();

													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											}
										},
										style: {
											//'width': '100%',
											overflow: 'visible'
										}
									}).inject(insertDiv);
									var currIndex = pSkeleton.getCurrentPanelIndex();
									if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
										currIndex = currIndex - 1;
									var searchDico = {};
									searchDico.name = "Types";
									searchDico.items = [];
									pSkeleton.getViewAt(currIndex).collection._models.forEach(function(iElem) {
										searchDico.items.push({
											value: iElem._attributes.title,
											subLabel: iElem._attributes.subtitle
										});
									});
									searchDico.configuration = {};
									searchDico.configuration.searchEngine = function(dataset, text) {
										text = text.toLowerCase();
										var sug = [];
										dataset.items.forEach(function(item) {
											if (item.label.toLowerCase().contains(text)) {
												sug.push(item);
											} else if (item.subLabel.toLowerCase().contains(text)) {
												sug.push(item);
											}
										});
										return sug;
									}
									autoComplete.addDataset(searchDico);
									searchDiv.getElementsByTagName('input')[0].focus();
								}

								break;
							case "addType":

								var currentPanel = pSkeleton.getCurrentPanelIndex();
								if (currentPanel === 1 || pSkeleton.getModelAt(currentPanel).get('nature') === "Extensions") {
									require(['DS/DMSApp/Views/TypeForm'], (function(TypeForm) {
										var myTypeForm = new TypeForm(false, false, undefined).build();
										var myModal = new CustomModal(myTypeForm, this.container, "Create a new Type").build();
									}).bind(this))
								} else {
									require(['DS/DMSApp/Views/CustoExtForm'], (function(InterfaceForm) {
										var myInterfaceForm = new InterfaceForm("AddSub", pSkeleton.getActiveIdCard()['model']);
										var formBuild = myInterfaceForm.build();
										var myModal = new CustomModal(formBuild, pSkeleton.container, "edition d'extension(NLS)").build();
									}).bind(this))
								}

								break;
							case "filterType":

								new DropdownMenu({
									/*
									Accessing the container containing the action button "Create Business Rule", through this.containter.children etc.
									We could have access to it through getChildren() method I guess.
										*/
									target: actionView.container.parentNode.getElementsByClassName("fonticon fonticon-fonticon fonticon-filter")[0],
									items: [{
											text: myNls.get("TypeFilterHeader"),
											className: "header"
										},
										{
											id: "ConcreteTypeFilterButton",
											text: myNls.get("ConcreteTypeFilter"),
											fonticon: "object-class-concrete-add"
										},
										{
											id: "AbstractTypeFilterButton",
											text: myNls.get("AbstractTypeFilter"),
											fonticon: "object-class-abstract"
										},
										{
											id: "AllTypeFilterButton",
											text: myNls.get("AllTypeFilter")
										}
									],
									events: {
										onClick: function(e, item) {
											var currIndex = pSkeleton.getCurrentPanelIndex();
											if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
												currIndex = currIndex - 1;
											var filterPlace = 1;
											if (pSkeleton.isAuthoring)
												filterPlace++;
											var searchExist = pSkeleton.getViewAt(currIndex).container.getElementsByClassName('actions-container')[0].getElements("#searchAutoCompleteInput");
											if (searchExist.length !== 0)
												filterPlace++;
											var filterIcon = pSkeleton.getViewAt(currIndex).container.getElementsByClassName('actions-container')[0].getChildren()[filterPlace]
											if (item.id == "ConcreteTypeFilterButton") {
												//var filterIcon = $('span.action.interactive')[2];
												filterIcon.setStyle('color', '#005686');
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														if (tile.model._attributes.isAbstract != "Yes") {
															tile.show();
														} else {
															tile.hide();
															typeNumber--;
														}
													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											} else if (item.id == "AbstractTypeFilterButton") {
												//var filterIcon = $('span.action.interactive')[2];
												filterIcon.setStyle('color', '#005686');
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														if (tile.model._attributes.isAbstract == "Yes") {
															tile.show();
														} else {
															tile.hide();
															typeNumber--;
														}
													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											} else if (item.id == "AllTypeFilterButton") {
												//var filterIcon = $('span.action.interactive')[2];
												filterIcon.removeAttribute('style');
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														tile.show();
													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											}
										},
										//This event is triggered when we click outside of the dropdown menu. Then we destroy it.
										onClickOutside: function() {
											this.destroy();
										}
									}
								}).show();

								break;
							case "sortType":
								new DropdownMenu({
									target: actionView.container.parentNode.getElementsByClassName("fonticon fonticon-fonticon fonticon-filter")[0],
									//target: this.elements.actionsSection.getElementsByClassName("fonticon fonticon-fonticon fonticon-sort-alpha-asc ")[0],
									items: [{
											text: myNls.get('SortTypeByName'),
											icon: "fonticon fonticon-sort-alpha-desc"
										},
										{
											text: myNls.get('SortTypeByParentName'),
											icon: "fonticon fonticon-sort-alpha-asc"
										}
									],
									events: {
										onClick: function(e, item) {
											var currIndex = pSkeleton.getCurrentPanelIndex();
											if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
												currIndex = currIndex - 1;
											if (item.text == "Name") {
												pSkeleton.getViewAt(currIndex).collection.sort_elem = "title";
												pSkeleton.getViewAt(currIndex).collection.sort();
												pSkeleton.getViewAt(currIndex).render();
												if (pSkeleton.getViewAt(currIndex).collection.title_sort_dir == "asc") {
													pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "desc";
													pSkeleton.getViewAt(currIndex).collection.parent_sort_dir = "asc";
												} else {
													pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "asc";
													pSkeleton.getViewAt(currIndex).collection.parent_sort_dir = "asc";
												}
											} else if (item.text == "Parent Name") {
												pSkeleton.getViewAt(currIndex).collection.sort_elem = "subtitle";
												pSkeleton.getViewAt(currIndex).collection.sort();
												pSkeleton.getViewAt(currIndex).render();
												if (pSkeleton.getViewAt(currIndex).collection.parent_sort_dir == "asc") {
													pSkeleton.getViewAt(currIndex).collection.parent_sort_dir = "desc";
													pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "asc";
												} else {
													pSkeleton.getViewAt(currIndex).collection.parent_sort_dir = "asc";
													pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "asc";
												}
											}
										},
										onShow: function() {
											var currIndex = pSkeleton.getCurrentPanelIndex();
											if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
												currIndex = currIndex - 1;
											var menu = this;
											this.items.forEach(function(item) {
												if (item.text == "Name") {
													if (pSkeleton.getViewAt(currIndex).collection.title_sort_dir == "asc") {
														menu.updateItem({
															id: item.id,
															icon: "fonticon fonticon-sort-alpha-asc"
														});
													} else {
														menu.updateItem({
															id: item.id,
															icon: "fonticon fonticon-sort-alpha-desc"
														});
													}
												} else if (item.text == "Parent Name") {
													if (pSkeleton.getViewAt(currIndex).collection.parent_sort_dir == "asc") {
														menu.updateItem({
															id: item.id,
															icon: "fonticon fonticon-sort-alpha-asc"
														});
													} else {
														menu.updateItem({
															id: item.id,
															icon: "fonticon fonticon-sort-alpha-desc"
														});
													}
												}
											});
										}
									}
								}).show();

								break;
							default:
								throw new TypeError("Unknown action id");
						}
					}
				}
			},
			events: {
				onRenderSwitcherView: function(view) {
					// To hide the view switcher Icon
					view.container.hide();
					// To hide the "|" and the dot icon.
					var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
					if (actionsDiv != undefined && actionsDiv.length > 0) {
						actionsDiv[0].className = "set-actions";
					}
					var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
					if (actionInlineDot != undefined && actionInlineDot.length > 0) {
						actionInlineDot[0].hide();
					}
				}
			}
		}
	};

});

define('DS/DMSApp/Models/TypeModel',

  ['UWA/Core',
    'UWA/Class/Model',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/dictionaryJSONHandler'
  ],
  function(UWA, Model, WebappsUtils, dicoHandler) {
    "use strict";

    return Model.extend({
      defaults: function() {
        //UWA.log("TypeModel::setDefault");
        //UWA.log(this);
        return {
          //Metadata associated with the model returned
          //Every model must specify an ID
          id: 'default',
          //Title and Image are properties that can be displayed in the Tile Object
          title: 'not found',
          subtitle: '',
          content: '',
          image: '', //WebappsUtils.getWebappsAssetUrl('DMSApp',"GroupAttrIcon.png"),
          //Additional Properties for the IDCard
          ownerName: 'Owner',
          //date           : ,
          Description: '',
          //Additional Properties for data model
          isAbstract: 'Abstract : ?'
        };
      },
      setup: function() {
        //UWA.log("TypeModel::setup");
        //UWA.log(this);
      },
      parse: function(response, options) {
        //UWA.log("TypeModel::parse");
        var that = this;
        var resultat;
        var internalName = response['Name'];
        var externalName = dicoHandler.getDisplayName(internalName);
        var nls_Option = widget.getValue("DisplayOption");
        if (nls_Option === "NLSOption") {
          externalName = dicoHandler.getNLSName(internalName, response["Nature"]);
        }
        /*var key = [];
        if(response.hasOwnProperty('Attributes')){
           key = Object.keys(response['Attributes']);
        }*/
        var attributes = [];
        if (response['Attributes']) {
          var key = Object.keys(response['Attributes']);
          if (Array.isArray(key)) {
            key.forEach(function(iElement) {
              attributes.push(response['Attributes'][iElement]);
            });
          }
        }
        resultat = {
          //Metadata associated with the model returned
          //Every model must specify an ID
          id: internalName,
          //Title and Image are properties that can be displayed in the Tile Object
          title: externalName,
          //Additional Properties for data model
          isAbstract: response['Abstract'],
          attributes: attributes,
          nature: response['Nature'],
          isOOTB: dicoHandler.isOOTBAgregator(response.Name, response.Nature) ? "Yes" : "No",
          Package: response['Package'],
          DMSStatus: response['DMSStatus'],
          Description: response['Description'] ? response['Description'] : "",
          NameNLS: response['NameNLS'],
          handler: function() {
            that.dispatchEvent('onActionClick', [that, {
              model: action
            }, arguments[0]]);
          }
        };
        if (resultat.NameNLS == undefined && resultat.isOOTB == "No") {
          resultat.NameNLS = dicoHandler.getListNameNLSFromDico(internalName, response["Nature"]);
        }
        if (options.collection.tool === "attGrp") {
          this.fillInterfaceObject(resultat, response);
        } else if (options.collection.tool === "type") {
          this.fillTypeObject(resultat, response);
        } else if (options.collection.tool === "extension") {
          this.fillExtensionObject(resultat, response);
        }
        return resultat;
      },
      sync: function(method, model, options) {
        //UWA.log(this);
        var id, attrs, idAttrName, resp, errorMessage;
        if (method === 'create' || method === 'update' || method === 'patch') {
          attrs = model.toJSON(options);
        }
        id = model.id;
        idAttrName = model.idAttribute;
      },
      /*onAnyEvent : function(eventName,model,collection,options){
      	if(eventName==='onAdd' && collection.tool!=="type") {
      		//console.log("Model : "+ eventName);
      		var nestedView = pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()).contentsViews.tile.nestedView;
      		if(nestedView.visibleItems.length>0)
      			nestedView.getChildView(model).container.getElementsByClassName('tile-content')[0].title=model.get('scopes').toLocaleString();
      	}
      },*/
      fillInterfaceObject: function(resultat, response) {
        var scopes = [];
        var internalNameScopes = [];
        var nlsNameScopes = [];
        var tmpNlsName = "";
        if (response['ScopeTypes'] !== undefined) {
          scopes = response['ScopeTypes'];
          response['ScopeTypes'].forEach(function(scopeType) {
            internalNameScopes.push(" " + dicoHandler.getDisplayName(scopeType));
            tmpNlsName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(scopeType, "Type") : dicoHandler.getDisplayName(scopeType);
            nlsNameScopes.push(" " + tmpNlsName);
          })
          if (response['ScopeRelationships'] !== undefined) {
            scopes = scopes.concat(response['ScopeRelationships']);
            response['ScopeRelationships'].forEach(function(scopeRel) {
              internalNameScopes.push(" " + dicoHandler.getDisplayName(scopeRel));
              tmpNlsName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(scopeRel, "Relationship") : dicoHandler.getDisplayName(scopeRel);
              nlsNameScopes.push(" " + tmpNlsName);
            })
          }
        } else if (response['ScopeRelationships'] !== undefined) {
          scopes = response['ScopeRelationships'];
          response['ScopeRelationships'].forEach(function(scopeRel) {
            internalNameScopes.push(" " + dicoHandler.getDisplayName(scopeRel));
            tmpNlsName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(scopeRel, "Relationship") : dicoHandler.getDisplayName(scopeRel);
            nlsNameScopes.push(" " + tmpNlsName);
          })
        }
        resultat['image'] = WebappsUtils.getWebappsAssetUrl('DMSApp', "icons/DeplExtNoAuto_TileHalf.png");
        resultat['ownerName'] = response['Name'];
        resultat['scopes'] = scopes;
        resultat['automatic'] = response['Automatic'];
        resultat['ScopeTypes'] = response['ScopeTypes'] ? response['ScopeTypes'] : [];
        resultat['ScopeRelationships'] = response['ScopeRelationships'] ? response['ScopeRelationships'] : [];
        resultat['content'] = nlsNameScopes.length > 1 ? "<span title='" + nlsNameScopes + "'>" + nlsNameScopes[0] + ", ...</span>" : nlsNameScopes[0];
        resultat['scopesNls'] = nlsNameScopes;
        // resultat['subtitle'] = "Automatic : "+response['Automatic'];
        resultat['interface'] = "attGroup";
      },
      fillTypeObject: function(resultat, response) {

        resultat['subtitle'] = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(response['Parent'], response['Nature']) : dicoHandler.getDisplayName(response['Parent']);
        resultat['parent'] = response['Parent'];
        resultat['content'] = "";
        // BMN2 10/09/2021 : IR-859985-3DEXPERIENCER2022x
        // We use the hierachy to find an icon to display.
        const typeMap = dicoHandler.getParentTypeMap(resultat.id, dicoHandler.getKeyToReadOnDico(resultat.nature))
        let findIconLarge = false;
        typeMap.every(function(item) {
          if (item.IconLarge != undefined) {
            resultat['image'] = "data:image/png;base64," + item["IconLarge"];
            findIconLarge = true;
            return false;
          }
          return true;
        });
        /*  if (response["IconLarge"] != undefined) {
            resultat['image'] = "data:image/png;base64,"+response["IconLarge"];
            resultat['IconLarge'] = response["IconLarge"];
          } else*/
        if (!findIconLarge) {
          resultat['image'] = WebappsUtils.getWebappsAssetUrl('DMSApp', "icons/SpeType_TileHalf.png");
        }
        resultat['IconLarge'] = response["IconLarge"];
        resultat["IconNormal"] = response["IconNormal"];
        resultat["IconSmall"] = response["IconSmall"];
        resultat['extendingInterfaces'] = response['ExtendingInterfaces'];
        resultat['DeploymentExtensible'] = response['DeploymentExtensible'];
        resultat['CustomerExtensible'] = response['CustomerExtensible'];
      },
      fillExtensionObject: function(resultat, response) {
        var scopes = [];
        var externalNameScopes = [];
        var nlsNameScopes = [];
        var tmpNlsName = "";
        if (response['ScopeTypes'] !== undefined) {
          scopes = response['ScopeTypes'];
          response['ScopeTypes'].forEach(function(scopeType) {
            externalNameScopes.push(" " + dicoHandler.getDisplayName(scopeType));
            tmpNlsName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(scopeType, "Type") : dicoHandler.getDisplayName(scopeType);
            nlsNameScopes.push(" " + tmpNlsName);
          });
          if (response['ScopeRelationships'] !== undefined) {
            scopes = scopes.concat(response['ScopeRelationships']);
            response['ScopeRelationships'].forEach(function(scopeRel) {
              externalNameScopes.push(" " + dicoHandler.getDisplayName(scopeRel));
              tmpNlsName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(scopeRel, "Relationship") : dicoHandler.getDisplayName(scopeRel);
              nlsNameScopes.push(" " + tmpNlsName);
            });
          }
        } else if (response['ScopeRelationships'] !== undefined) {
          scopes = response['ScopeRelationships'];
          response['ScopeRelationships'].forEach(function(scopeRel) {
            externalNameScopes.push(" " + dicoHandler.getDisplayName(scopeRel));
            tmpNlsName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(scopeRel, "Relationship") : dicoHandler.getDisplayName(scopeRel);
            nlsNameScopes.push(" " + tmpNlsName);
          });
        }
        resultat['subtitle'] = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(response['Parent'], "Interface") : dicoHandler.getDisplayName(response['Parent']);
        resultat['parent'] = response['Parent'];
        resultat['scopes'] = scopes;
        resultat['scopesNls'] = nlsNameScopes;
        resultat['content'] = nlsNameScopes.length > 1 ? "<span title='" + nlsNameScopes + "'>" + nlsNameScopes[0] + ", ...</span>" : nlsNameScopes[0];
        resultat['image'] = WebappsUtils.getWebappsAssetUrl('DMSApp', "icons/CustoExt_TileHalf.png");
        resultat['ScopeTypes'] = response['ScopeTypes'] ? response['ScopeTypes'] : [];
        resultat['ScopeRelationships'] = response['ScopeRelationships'] ? response['ScopeRelationships'] : [];
        resultat['extendingInterfaces'] = response['ExtendingInterfaces'];
        resultat['interface'] = "custoExt";
      },
      getDMSStatus: function() {
        return this.get("DMSStatus");
      },
      getNature: function() {
        return this.get("nature");
      },
      isAbstract: function() {
        return this.get("isAbstract") === "Yes" ? true : false;
      }
    });
  });

define('DS/DMSApp/Collections/AttrGroupCollection',
    [
        'UWA/Core',
        'UWA/Class/Collection',
        'DS/DMSApp/Models/TypeModel',
        'WebappsUtils/WebappsUtils',
        'DS/DMSApp/Utils/URLHandler',
        'DS/WAFData/WAFData',
        'DS/DMSApp/Utils/dictionaryJSONHandler'
    ], function (UWA, Collection, Type, WebappsUtils, URLHandler, WAFData, dicoHandler) {
        "use strict";


        return Collection.extend({
        	//No initial model passed, because there is only 1 Tile ("Manage Business Rule").
        	model : Type,
        	/*
            Setup function is called when initializing a newly created instance of collection.
            It is not called in my application code because it is internally used.
            It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
        	 */
        	setup : function(){
        		UWA.log("AttrGroupCollection::setup");
        		this.url = URLHandler.getURL()+"/resources/dictionary/DictionaryCUSTO";
        		this.tool = "attGrp";
        		this.title_sort_dir = 'desc';
        		var ActiveIdCard = pSkeleton.getActiveIdCard();
        		var routeSteps = pSkeleton.currentRouteSteps;
        		var currStep = pSkeleton.getCurrentPanelIndex();
        		if(routeSteps[currStep-1].get('renderer') === "types") {
        			//this.extendingInterfaces = pSkeleton.getModelAt(currStep).get('extendingInterfaces') ? pSkeleton.getModelAt(currStep).get('extendingInterfaces') : [];
        			this.typeScope = pSkeleton.getModelAt(currStep).get('id');
        			//this.type = routeSteps[currStep-1]['id'];
        		}

        	},
        	//title_sort_dir:'asc',
        	sort_elem:'title',
        	comparator : function (modelA,modelB){
        		UWA.log("AttrGroupCollection::comparator");
        		var ret = modelA.get(this.sort_elem).localeCompare(modelB.get(this.sort_elem));
        		if(this.sort_elem=="title")
        			return this.title_sort_dir=="asc" ? ret : -ret ;
        		else if(this.sort_elem=="subtitle"){
        			return this.parent_sort_dir=="asc" ? ret : -ret ;
        		}
        	},
        	//comparator:"title",

        	/*
            Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
            It is not called in my application code because it is internally used.
        	 */
        	sync : function(method, collection, options) {
        		UWA.log("AttrGroupCollection::sync");
        		//options.lang=WidgetServices.getLanguage();
        		options.lang=widget.lang;
        		options.type='json';
        		options.headers = {
        				'Accept': 'application/json',
        				'Content-Type': 'application/json',
        				'SecurityContext': URLHandler.getSecurityContext()
        		};
        		options.sort=true;
        		options.reset=this.myReset?true:false;
        		options = Object.assign({
        			ajax: WAFData.authenticatedRequest
        		}, options);
        		this._parent.apply(this, [method, collection, options]);
        	},

        	/*
            Parse function is used to transform the backend response into an array of models.
            It is not called in my application code because it is internally used.
            The parameter "data" corresponds to the raw response object returned by the backend API.

            It returns the array of model attributes to be added to the collection.
        	 */
        	parse: function (data) {
        		UWA.log("AttrGroupCollection::parse");
            /*if(data.Dictionary.JsonTimeStamp>pSkeleton.dico_CUSTO.Dictionary.JsonTimeStamp){
                pSkeleton.dico_CUSTO = data;
            }*/
        		var paramReturned = [];
        		dicoHandler.init(data,pSkeleton.dico_OOTB);
        		var paramReturned = dicoHandler.getAttGroups(this.typeScope);
        		var currStep = pSkeleton.getCurrentPanelIndex();
        		if(pSkeleton.currentRouteSteps[currStep].get('renderer')!=='attributesGroup')
        			currStep = currStep-1;
        		this.updateHeader(paramReturned.length,currStep);

        		/*pSkeleton.getViewAt(currStep).container.getElementsByClassName('switcher-container')[0].innerHTML='';
                pSkeleton.getViewAt(currStep).container.getElementsByClassName('set-actions')[0].className="set-actions";*/
        		var that = this;
        		pSkeleton.getViewAt(1).addEvent("onSearch", function(event) {
        			that.updateHeader(event.number,currStep)
        		});
        		paramReturned.sort(function(a, b) {
    	          var a_externalName = "",
    	            b_externalName = "";
    	          var nls_Option = widget.getValue("DisplayOption");
    	          if(nls_Option ==="NLSOption")
    	          {
    	            a_externalName = dicoHandler.getNLSName(a.Name,a.Nature);
    	            b_externalName = dicoHandler.getNLSName(b.Name,b.Nature);
    	          }
    	          else {
    	        	a_externalName = dicoHandler.getDisplayName(a.Name);
    	        	b_externalName = dicoHandler.getDisplayName(b.Name);
    	          }
    	          return a_externalName.localeCompare(b_externalName);
    	        });
        		return paramReturned;

        	},

        	updateHeader: function(paramReturned, attGrpStep) {
        		var AttGrpIdCard = pSkeleton.getIdCardAt(attGrpStep);
        		var attGrpContainer, headerValue;
        		if (AttGrpIdCard) {
        			attGrpContainer = AttGrpIdCard.container;
        			if(attGrpContainer)
        				headerValue = attGrpContainer.getElementsByTagName('span')[0];
        			if(headerValue.innerText) {
        				var val = headerValue.innerText.split('|');
        				//pSkeleton.getActiveIdCard().container.getElementsByTagName('span')[0].innerText
        				headerValue.innerText = val[0] +" | "+paramReturned;

        			}
        		}
        	},/*
            onAnyEvent: function(eventName,eventData) {
              console.log("AttrGroupCollection:"+eventName);
              console.log(eventData);
            },
    				onAdd: function(currentModel,Collection,options) {
    					console.log("AttrGroupCollection::onAdd");
    				},*/
        	/*onSync: function(collection,Data,options) {
        		console.log("AttrGroupCollection::onSync");
        		var currIndex = pSkeleton.getCurrentPanelIndex();
        		if(pSkeleton.currentRouteSteps[currIndex].get('renderer')!=="attributesGroup")
        			currIndex=currIndex-1;
        		pSkeleton.getViewAt(currIndex).render();
        		this.title_sort_dir="desc";
        	},*/
        	onSort: function(currentModel,Collection,options) {
        		console.log("AttrGroupCollection::onSort");
        		if(this.title_sort_dir==="asc")
        			this.title_sort_dir="desc";
        		else
        			this.title_sort_dir="asc";
        	}

        });
    });

define('DS/DMSApp/Collections/AttrOfTypeCollection',
  [
    'UWA/Core',
    'UWA/Class/Collection',
    'DS/DMSApp/Models/TypeModel',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/URLHandler',
    'DS/WAFData/WAFData',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/DMSApp/Models/AttributeModel'
  ],
  function(UWA, Collection, Type, WebappsUtils, URLHandler, WAFData, dicoHandler, attributeModel) {
    "use strict";


    return Collection.extend({
      //No initial model passed, because there is only 1 Tile ("Manage Business Rule").
      model: attributeModel,
      /*
      Setup function is called when initializing a newly created instance of collection.
      It is not called in my application code because it is internally used.
      It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
      */
      setup: function() {
        UWA.log("AttrOfTypeCollection::setup");
        //debugger;
        //the URL property of this Collection Object is used to have access to the JSON File "Beginning_Entries.json".
        //this.url = WebappsUtils.getWebappsAssetUrl('DMSApp', 'dico.json');
        //this.url = 'https://vdevpril670dsy.dsone.3ds.com/3DSpace/resources/dictionary/typesExtensions';
        this.url = URLHandler.getURL() + "/resources/dictionary/DictionaryCUSTO";
        this.currStep = pSkeleton.getCurrentPanelIndex();
        var currModel = pSkeleton.getModelAt(this.currStep);
        if (this.currStep !== 1) {
          var toolStep = this.currStep - 1;
          var tool = pSkeleton.getCollectionAt(toolStep)['tool'];
          //pSkeleton.getModelAt(toolStep).get('id'); S63 - Je test un systeme qui marcherait quel que soit la profondeur en utilisant le this.tool utilisé au début de nos collections
          if (tool === "type") {
            this.tool = "Types";
            this.parentName = currModel.get('parent');
          } else if (tool === "attGrp") {
            this.tool = "Interfaces";
          } else if (tool === "extension") {
            this.parentName = currModel.get('parent');
            this.tool = "Interfaces";
          }
          if (currModel._attributes.nature == "UniqueKey") {
            this.constrainedType = currModel._attributes.Type;
            this.constrainedInterface = currModel._attributes.Interface;
          }
          this.typeName = currModel.get('id');
          this.typeAttributes = currModel.get('attributes');
          this.nature = currModel.get('nature');
        }
      },
      typeName: 'default',

      //comparator:"title",

      /*
      Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
      It is not called in my application code because it is internally used.
      */
      sync: function(method, model, options) {
        UWA.log("AttrOfTypeCollection::sync");
        options.contentType = "application/json";
        options.lang = widget.lang;
        options.type = 'json';
        options.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        };
        options = Object.assign({
          ajax: WAFData.authenticatedRequest
        }, options);

        this._parent.apply(this, [method, model, options]);
      },

      /*
      Parse function is used to transform the backend response into an array of models.
      It is not called in my application code because it is internally used.
      The parameter "data" corresponds to the raw response object returned by the backend API.

      It returns the array of model attributes to be added to the collection.
      */
      parse: function(data,options) {
        options.locale = widget.locale;
        UWA.log("AttrOfTypeCollection::parse");
        /*if (data.Dictionary.JsonTimeStamp > pSkeleton.dico_CUSTO.Dictionary.JsonTimeStamp) {
          pSkeleton.dico_CUSTO = data;
          Object.keys(data["DictionaryNLS"]).forEach(function(item) {
            pSkeleton.nls_OOTB["DictionaryNLS"][item] = data["DictionaryNLS"][item];
          });
        }*/
        dicoHandler.init(data, pSkeleton.dico_OOTB);
        var paramReturned = [];
        if (this.nature == "UniqueKey") {
          var constrainedTypeName = this.constrainedType;
          var constrainedInterface = this.constrainedInterface;
          var attrList = [];
          attrList = attrList.concat(dicoHandler.getAttributes(dicoHandler.getKeyToReadOnDico("Type"), constrainedTypeName, "Yes"));
          attrList = attrList.concat(dicoHandler.getAttributes(dicoHandler.getKeyToReadOnDico("Interface"), constrainedInterface, "Yes"));
          // verfier que la liste contient les attributs suivant dans this.typeAttributes.
          attrList.forEach((item, i) => {
            var attrName = item.Name;
            if (item.Local == "Yes" && item.Basic!="Yes") {
              attrName = item.Owner + "." + item.Name;
            }
            if (this.typeAttributes.includes(attrName)) {
              paramReturned.push(item);
            }
          });

        } else {
          var selectedTypeName = this.typeName;
          var selectedTool = this.tool;
          selectedTool = dicoHandler.getKeyToReadOnDico(this.nature);
          paramReturned = paramReturned.concat(dicoHandler.getAttributes(selectedTool, this.typeName, "No"));
          paramReturned = paramReturned.reverse();
          if (this.parentName) {

            paramReturned = paramReturned.concat(dicoHandler.getAttributes(selectedTool, this.parentName, "Yes"))
          }
        }
        paramReturned.forEach((item)=> {
          // Compute the Nls of the attribute name
          let nls_key = "";
          let internalName = item['Name'];
          if (item['Local'] == "Yes") {
            nls_key = item['Nature'] + "." + item['Owner'];
          } else {
            nls_key = item['Nature'];
          }
          let externalName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(internalName, nls_key) : dicoHandler.getDisplayName(internalName);
          item["ExternalName"] = externalName;
          // Compute the NLs of the owner of the attribute
          let nls_Key_Owner = ""
          let internalParentName = item['Owner'];
          if (internalParentName == "" && item['Local'] == "No" && item.generatedOwner) {
            internalParentName = item.generatedOwner;
          }
          if (item.hasOwnProperty("ownerNature")) {
            nls_Key_Owner = item.ownerNature;
          }
          let externalParentName = widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(internalParentName, nls_Key_Owner) : dicoHandler.getDisplayName(internalParentName);
          item["ExternalParentName"] = externalParentName;
          
          if (item.NameNLS == undefined && item.isOOTBAttr != undefined && item.isOOTBAttr == "No") {
            item.NameNLS = dicoHandler.getListNameNLSFromDico(internalName, nls_key);
          }
          if (!item.AuthorizedValuesNLS && !!item.AuthorizedValues && !!item.isOOTBAttr && item.isOOTBAttr == "No") {
            item.AuthorizedValuesNLS = {};
            for(let authorizedValue of item.AuthorizedValues) {
              item.AuthorizedValuesNLS[authorizedValue] = dicoHandler.getListNameNLSFromDico(internalName + "." + authorizedValue, nls_key.replace(/^Attribute/,"Range"));
            }
          }
        });
        return paramReturned;

      },
      /*onAdd: function(model, models, options) {
        var table = widget.getElement('table');
        if (table != undefined && table.className.contains('table-container')) {
          table.toggleClassName('table-container');
          table.toggleClassName('table');
        }
      },*/
      /*onCollectionRendered: function() {
        console.log("hh");
      },
      onAnyEvent: function(eventName,eventData) {
        console.log("hh");
      }*/
      onSync: function() {
        var currStep = this.currStep;
        var rendererName = pSkeleton.getSteps()[this.currStep].get('renderer');
        if (rendererName === "Typeattributes") {
          /*  widget.getElements('.row-container').forEach(function(item) {
              item.toggleClassName("row-container")
            });*/
          if (pSkeleton.getSteps()[this.currStep - 1].get('renderer') === "attributesGroup") {
            var rows = pSkeleton.getViewAt(currStep).contentsViews.tile.nestedView.container.getElementsByTagName('tr');
            var owned_column = 1;
            var disp = "none";
            for (var row = 0; row < rows.length; row++) {
              if (row === 0) {
                var cels = rows[row].getElementsByTagName('th')
                if (cels.length != 0)
                  cels[owned_column].style.display = disp;
              } else {
                var cels = rows[row].getElementsByTagName('td')
                if (cels != 0)
                  cels[owned_column].style.display = disp;
              }
            }
          } else {
            /*var keys = pSkeleton.getViewAt(currStep).contentsViews.tile.nestedView.children
            Object.keys(keys).forEach(function(item) {
              var row = pSkeleton.getViewAt(currStep).contentsViews.tile.nestedView.children[item];
              if (row.model._attributes.isInherited == "Yes") {
                row.container.addClassName('warning');
                if (row.model._attributes.isOOTBAttr == "Yes" && row.container.getElementsByClassName('fonticon-3ds').length == 0) {
                  row.container.getChildren()[1].innerText = "System";
                }
              }
            });
            */
          }
        }
      }
    });
  });

define('DS/DMSApp/Collections/SubTypesOfTypeCollection',
  [
    'UWA/Core',
    'UWA/Class/Collection',
    'DS/DMSApp/Models/TypeModel',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/URLHandler',
    'DS/WAFData/WAFData',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/DMSApp/Models/TypeModel'
  ],
  function(UWA, Collection, Type, WebappsUtils, URLHandler, WAFData, dicoHandler, typeModel) {
    "use strict";


    return Collection.extend({
      //No initial model passed, because there is only 1 Tile ("Manage Business Rule").
      model: typeModel,
      /*
      Setup function is called when initializing a newly created instance of collection.
      It is not called in my application code because it is internally used.
      It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
      */
      setup: function() {
        UWA.log("SubTypesOfTypeCollection::setup");
        //debugger;
        //the URL property of this Collection Object is used to have access to the JSON File "Beginning_Entries.json".
        //this.url = WebappsUtils.getWebappsAssetUrl('DMSApp', 'dico.json');
        //this.url = 'https://vdevpril670dsy.dsone.3ds.com/3DSpace/resources/dictionary/typesExtensions';
        this.url = URLHandler.getURL() + "/resources/dictionary/DictionaryCUSTO";
        var currStep = pSkeleton.getCurrentPanelIndex();
        var currModel = pSkeleton.getModelAt(currStep);
        if (currStep !== 1) {
          var tooStep = currStep - 1;
          var tool = pSkeleton.getModelAt(tooStep).get('id');
          if (tool === "1") {
            this.tool = "type";
            this.parentName = currModel.get('subtitle');
          } else if (tool === "2")
            this.tool = "Interfaces";
          this.typeName = currModel.get('id');
          this.typeAttributes = currModel.get('attributes');
                this.nature=currModel.get('nature');
        }
      },
      typeName: 'default',

      //comparator:"title",

      /*
      Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
      It is not called in my application code because it is internally used.
      */
      sync: function(method, model, options) {
        UWA.log("SubTypesOfTypeCollection::sync");
        options.contentType = "application/json";
        options.lang = widget.lang;
        options.type = 'json';
        options.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        };
        options = Object.assign({
          ajax: WAFData.authenticatedRequest
        }, options);

        this._parent.apply(this, [method, model, options]);
      },

      /*
      Parse function is used to transform the backend response into an array of models.
      It is not called in my application code because it is internally used.
      The parameter "data" corresponds to the raw response object returned by the backend API.

      It returns the array of model attributes to be added to the collection.
      */
      parse: function(data) {
        UWA.log("SubTypesOfTypeCollection::parse");
        var paramReturned = [];
        var selectedTypeName = this.typeName;
        var selectedTool = this.tool;
        //var CustoDIco = pSkeleton.getCollectionAt(1).full_dico;
        //paramReturned = this.typeAttributes; //dicoHandler.getAttributes(selectedTool,selectedTypeName,"No");
        //if (this.parentName) {
        if(data.Dictionary.JsonTimeStamp>pSkeleton.dico_CUSTO.Dictionary.JsonTimeStamp){
            pSkeleton.dico_CUSTO = data;
        }
        dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
        paramReturned = dicoHandler.getSubType(selectedTypeName);
        //}
        return paramReturned;

      },
      onAdd: function(model, models, options) {
        var table = widget.getElement('table');
        if (table != undefined && table.className.contains('table-container')) {
          table.toggleClassName('table-container');
          table.toggleClassName('table');
        }
      },
      /*onCollectionRendered: function() {
        console.log("hh");
      },
      onAnyEvent: function(eventName,eventData) {
        console.log("hh");
      }*/
      onSync: function() {
        widget.getElements('.row-container').forEach(function(item) {
          item.toggleClassName("row-container")
        });
        //IR-953012-3DEXPERIENCER2023x S63 7/18/22 use current panel instead of hardcode
        let currStep = pSkeleton.getCurrentPanelIndex();
        pSkeleton.getViewAt(currStep).contentsViews.tile.onItemViewSelect=function(tt){
          Object.keys(pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView.children).forEach(function(cur) {
            var curTypeId = pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView.children[cur].model.id;
            if (tt.currentItemView.model.id == curTypeId) {
              pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView.unSelectAll();
              pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView.children[cur].select();
              var selected = pSkeleton.getViewAt(1).container.getElement(".selected");
              pSkeleton.getViewAt(currStep-1).scrollView.scrollToElement(".selected");
            }
          });
        }
      }
    });
  });

define('DS/DMSApp/Collections/SubCustoExtCollection',
  [
    'UWA/Core',
    'UWA/Class/Collection',
    'DS/DMSApp/Models/TypeModel',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/URLHandler',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/WAFData/WAFData'
  ],
  function(UWA, Collection, Type, WebappsUtils, URLHandler, dicoHandler, WAFData) {
    "use strict";


    return Collection.extend({
    	//No initial model passed, because there is only 1 Tile ("Manage Business Rule").
    	model: Type,
    	/*
      Setup function is called when initializing a newly created instance of collection.
      It is not called in my application code because it is internally used.
      It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
    	 */
    	setup: function() {
    		UWA.log("SubCustoExtCollection::setup");
    		this.url = URLHandler.getURL() + "/resources/dictionary/DictionaryCUSTO";
    		this.tool = "SubExtension"
      	this.title_sort_dir = 'asc';
    		this.parent_sort_dir = 'asc';
    		var ActiveIdCard = pSkeleton.getActiveIdCard();
    		var routeSteps = pSkeleton.currentRouteSteps;
    		var currStep = pSkeleton.getCurrentPanelIndex();
    		if(routeSteps[currStep-1].get('renderer') === "Extensions") {//Si on est dans la vue des customer extension sur l'onglet des subExtension
    			this.parent = pSkeleton.getModelAt(currStep).get('id');
    		}
    		//this.typeName = pSkeleton.getModelAt(2).id;
    	},
    	title_sort_dir:'asc',
    	parent_sort_dir:'asc',
    	sort_elem:'title',
    	comparator : function (modelA,modelB){
    		UWA.log("SubCustoExtCollection::comparator");
    		var ret = modelA.get(this.sort_elem).localeCompare(modelB.get(this.sort_elem));
    		if(this.sort_elem=="title")
    			return this.title_sort_dir=="asc" ? ret : -ret ;
    		else if(this.sort_elem=="subtitle"){
    			return this.parent_sort_dir=="asc" ? ret : -ret ;
    		}
    	},

    	//comparator:"title",

    	/*
      Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
      It is not called in my application code because it is internally used.
    	 */
    	sync: function(method, model, options) {
    		UWA.log("SubCustoExtCollection::sync");
    		options.lang=widget.lang;
    		options.type='json';
    		options.headers = {
    				'Accept': 'application/json',
    				'Content-Type': 'application/json',
    				'SecurityContext': URLHandler.getSecurityContext()
    		};
    		options.sort=true;
    		options.reset=this.myReset?true:false;
    		options = Object.assign({
    			ajax: WAFData.authenticatedRequest
    		}, options);
    		this._parent.apply(this, [method, model, options]);
    	},

    	/*
      Parse function is used to transform the backend response into an array of models.
      It is not called in my application code because it is internally used.
      The parameter "data" corresponds to the raw response object returned by the backend API.

      It returns the array of model attributes to be added to the collection.
    	 */
    	parse: function(data) {
    		UWA.log("SubCustoExtCollection::parse");
        if(data.Dictionary.JsonTimeStamp>pSkeleton.dico_CUSTO.Dictionary.JsonTimeStamp){
          pSkeleton.dico_CUSTO = data;
      }
    		var paramReturned = [];
    		var selectedTypeName = this.typeName;
    		dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
    		if(this.parent)
    			paramReturned = dicoHandler.getSubCustomerExt(this.parent,true);
    		else if(this.scopes)
    			paramReturned = dicoHandler.getCustomerExtensions(this.scopes);
    		else
    			paramReturned = dicoHandler.getCustomerExtensions();
    		var currStep = pSkeleton.getCurrentPanelIndex();
    		if(pSkeleton.currentRouteSteps[currStep].get('renderer')!=='SubExt')
    			currStep = currStep-1;
    		this.updateHeader(paramReturned.length,currStep);
    		//paramReturned = dicoHandler.getExtensionOfType(selectedTypeName, true);
    		var that = this;
    		pSkeleton.getViewAt(1).addEvent("onSearch", function(event) {
    			that.updateHeader(event.number,currStep)
    		});
    		return paramReturned;
    	},

    	updateHeader: function(paramReturned, attGrpStep) {
    		var AttGrpIdCard = pSkeleton.getIdCardAt(attGrpStep);
    		var attGrpContainer, headerValue;
    		if (AttGrpIdCard) {
    			attGrpContainer = AttGrpIdCard.container;
    			if(attGrpContainer)
    				headerValue = attGrpContainer.getElementsByTagName('span')[0];
    			if(headerValue.innerText) {
    				var val = headerValue.innerText.split('|');
    				//pSkeleton.getActiveIdCard().container.getElementsByTagName('span')[0].innerText
    				headerValue.innerText = val[0] +" | "+paramReturned;

    			}
    		}
    	},
    	onSync: function(collection,Data,options) {
    		console.log("ExtOfTypeCollection::onSync");
    		var currIndex = pSkeleton.getCurrentPanelIndex();
    		//Si le renderer courrant n'est pas Extensions c'est qu'on se trouve dans le menu de gauche
    		if(pSkeleton.currentRouteSteps[currIndex].get('renderer')!=="SubExt")
    			currIndex=currIndex-1;
    		//on Force un render() pour obliger le tri puis on met à jour l'ordre de tri
    		pSkeleton.getViewAt(currIndex).render();
    		this.title_sort_dir="desc";
    		
        pSkeleton.getViewAt(currIndex).contentsViews.tile.onItemViewSelect=function(tt){
          Object.keys(pSkeleton.getViewAt(currIndex-1).contentsViews.tile.nestedView.children).forEach(function(cur) {
            var curTypeId = pSkeleton.getViewAt(currIndex-1).contentsViews.tile.nestedView.children[cur].model.id;
            if (tt.currentItemView.model.id == curTypeId) {
              pSkeleton.getViewAt(currIndex-1).contentsViews.tile.nestedView.unSelectAll();
              pSkeleton.getViewAt(currIndex-1).contentsViews.tile.nestedView.children[cur].select();
              var selected = pSkeleton.getViewAt(currIndex-1).container.getElement(".selected");
              pSkeleton.getViewAt(currIndex-1).scrollView.scrollToElement(".selected");
            }
          });
        }
    	}/*,
    	onSort: function(currentModel,Collection,options) {
    		console.log("AttrGroupCollection::onSort");
    		if(this.title_sort_dir==="asc")
    			this.title_sort_dir="desc";
    		else
    			t*is.title_sort_dir="asc";
    	}*/
    });
  });

define('DS/DMSApp/Collections/GroupAttrOfTypeCollection',
  [
    'UWA/Core',
    'UWA/Class/Collection',
    'DS/DMSApp/Models/TypeModel',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/URLHandler',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/WAFData/WAFData'
  ],
  function(UWA, Collection, Type, WebappsUtils, URLHandler, dicoHandler, WAFData) {
    "use strict";


    return Collection.extend({
      //No initial model passed, because there is only 1 Tile ("Manage Business Rule").
      model: Type,
      /*
      Setup function is called when initializing a newly created instance of collection.
      It is not called in my application code because it is internally used.
      It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
      */
      setup: function() {
        UWA.log("GroupAttrOfTypeCollection::setup");
        //the URL property of this Collection Object is used to have access to the JSON File "Beginning_Entries.json".
        //this.url = WebappsUtils.getWebappsAssetUrl('DMSApp', 'dico.json');
        //this.url = 'https://vdevpril670dsy.dsone.3ds.com/3DSpace/resources/dictionary/typesExtensions';
        this.url = URLHandler.getURL() + "/resources/dictionary/DictionaryCUSTO";
        this.typeName = pSkeleton.getModelAt(2).id;
        this.tool = "attGrp";
      },
      typeName: 'default',

      //comparator:"title",

      /*
      Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
      It is not called in my application code because it is internally used.
      */
      sync: function(method, model, options) {
        UWA.log("DMSTypes::sync");
        options.contentType = "application/json";
        options.lang = widget.lang;
        options.type = 'json';
        options.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        };
        options = Object.assign({
          ajax: WAFData.authenticatedRequest
        }, options);

        this._parent.apply(this, [method, model, options]);
      },

      /*
      Parse function is used to transform the backend response into an array of models.
      It is not called in my application code because it is internally used.
      The parameter "data" corresponds to the raw response object returned by the backend API.

      It returns the array of model attributes to be added to the collection.
      */
      parse: function(data) {
        UWA.log("GroupAttrOfTypeCollection::parse");
        if (data.Dictionary.JsonTimeStamp > pSkeleton.dico_CUSTO.Dictionary.JsonTimeStamp) {
          pSkeleton.dico_CUSTO = data;
        }
        var paramReturned = [];

        var selectedTypeName = this.typeName;
        dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
        paramReturned = dicoHandler.getExtensionOfType(selectedTypeName, false);
        return paramReturned;
      }

    });
  });

define('DS/DMSApp/Collections/ExtOfTypeCollection',
  [
    'UWA/Core',
    'UWA/Class/Collection',
    'DS/DMSApp/Models/TypeModel',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/URLHandler',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/WAFData/WAFData'
  ],
  function(UWA, Collection, Type, WebappsUtils, URLHandler, dicoHandler, WAFData) {
    "use strict";


    return Collection.extend({
    	//No initial model passed, because there is only 1 Tile ("Manage Business Rule").
    	model: Type,
    	/*
      Setup function is called when initializing a newly created instance of collection.
      It is not called in my application code because it is internally used.
      It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
    	 */
    	setup: function() {
    		UWA.log("ExtOfTypeCollection::setup");
    		this.url = URLHandler.getURL() + "/resources/dictionary/DictionaryCUSTO";
    		this.tool = "extension"
      	this.title_sort_dir = 'asc';
    		this.parent_sort_dir = 'asc';
    		var ActiveIdCard = pSkeleton.getActiveIdCard();
    		var routeSteps = pSkeleton.currentRouteSteps;
    		var currStep = pSkeleton.getCurrentPanelIndex();
    		if(routeSteps[currStep-1].get('renderer') === "types") {//Si on est dans la vue d'un type sur l'onglet extension
    			this.typeScope = pSkeleton.getModelAt(currStep).get('id');
    		}
    		if(routeSteps[currStep-1].get('renderer') === "Extensions" && this.myReset==undefined) {//Si on est dans la vue des customer extension sur l'onglet des subExtension
    			this.parent = pSkeleton.getModelAt(currStep).get('id');
    		}
    		//this.typeName = pSkeleton.getModelAt(2).id;
    	},
    	title_sort_dir:'asc',
    	parent_sort_dir:'asc',
    	sort_elem:'title',
    	comparator : function (modelA,modelB){
    		UWA.log("ExtOfTypeCollection::comparator");
    		var ret = modelA.get(this.sort_elem).localeCompare(modelB.get(this.sort_elem));
    		if(this.sort_elem=="title")
    			return this.title_sort_dir=="asc" ? ret : -ret ;
    		else if(this.sort_elem=="subtitle"){
    			return this.parent_sort_dir=="asc" ? ret : -ret ;
    		}
    		else if(this.sort_elem=="content"){
    			return this.parent_sort_dir=="asc" ? ret : -ret ;
    		}
    	},

    	//comparator:"title",

    	/*
      Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
      It is not called in my application code because it is internally used.
    	 */
    	sync: function(method, model, options) {
    		UWA.log("ExtOfTypeCollection::sync");
    		options.lang=widget.lang;
    		options.type='json';
    		options.headers = {
    				'Accept': 'application/json',
    				'Content-Type': 'application/json',
    				'SecurityContext': URLHandler.getSecurityContext()
    		};
    		options.sort=true;
    		options.reset=this.myReset?true:false;
    		options = Object.assign({
    			ajax: WAFData.authenticatedRequest
    		}, options);
    		this._parent.apply(this, [method, model, options]);
    	},

    	/*
      Parse function is used to transform the backend response into an array of models.
      It is not called in my application code because it is internally used.
      The parameter "data" corresponds to the raw response object returned by the backend API.

      It returns the array of model attributes to be added to the collection.
    	 */
    	parse: function(data) {
    		UWA.log("ExtOfTypeCollection::parse");
        /*if(data.Dictionary.JsonTimeStamp>pSkeleton.dico_CUSTO.Dictionary.JsonTimeStamp){
          pSkeleton.dico_CUSTO = data;
      }*/
    		var paramReturned = [];
    		var selectedTypeName = this.typeName;
    		dicoHandler.init(data, pSkeleton.dico_OOTB);
    		if(this.parent)
    			paramReturned = dicoHandler.getSubCustomerExt(this.parent,true);
    		else if(this.typeScope)
    			paramReturned = dicoHandler.getCustomerExtensions(this.typeScope);
    		else
    			paramReturned = dicoHandler.getCustomerExtensions();
    		var currStep = pSkeleton.getCurrentPanelIndex();
    		if(pSkeleton.currentRouteSteps[currStep].get('renderer')!=='Extensions')
    			currStep = currStep-1;
    		this.updateHeader(paramReturned.length,currStep);
    		//paramReturned = dicoHandler.getExtensionOfType(selectedTypeName, true);
    		var that = this;
    		pSkeleton.getViewAt(1).addEvent("onSearch", function(event) {
    			that.updateHeader(event.number,currStep)
    		});
    		paramReturned.sort(function(a, b) {
  	          var a_externalName = "",
  	            b_externalName = "";
  	          var nls_Option = widget.getValue("DisplayOption");
  	          if(nls_Option ==="NLSOption")
  	          {
  	            a_externalName = dicoHandler.getNLSName(a.Name,a.Nature);
  	            b_externalName = dicoHandler.getNLSName(b.Name,b.Nature);
  	          }
  	          else {
  	        	a_externalName = dicoHandler.getDisplayName(a.Name);
  	        	b_externalName = dicoHandler.getDisplayName(b.Name);
  	          }
  	          return a_externalName.localeCompare(b_externalName);
  	        });
    		return paramReturned;
    	},

    	updateHeader: function(paramReturned, attGrpStep) {
    		var AttGrpIdCard = pSkeleton.getIdCardAt(attGrpStep);
    		var attGrpContainer, headerValue;
    		if (AttGrpIdCard) {
    			attGrpContainer = AttGrpIdCard.container;
    			if(attGrpContainer)
    				headerValue = attGrpContainer.getElementsByTagName('span')[0];
    			if(headerValue.innerText) {
    				var val = headerValue.innerText.split('|');
    				//pSkeleton.getActiveIdCard().container.getElementsByTagName('span')[0].innerText
    				headerValue.innerText = val[0] +" | "+paramReturned;

    			}
    		}
    	},
      /*onSync: function() {
    		var currStep = pSkeleton.getCurrentPanelIndex();
    		if(pSkeleton.currentRouteSteps[currStep-1].get("renderer")=="Extensions") {
    			pSkeleton.getViewAt(currStep).contentsViews.tile.onItemViewSelect=function(tt){
    				Object.keys(pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView.children).forEach(function(cur) {
    					var curTypeId = pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView.children[cur].model.id;
    					if (tt.currentItemView.model.id == curTypeId) {
    						//pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView.unSelectAll();
    						//pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView.children[cur].select();
    						//var selected = pSkeleton.getViewAt(1).container.getElement(".selected");
    						//pSkeleton.getViewAt(currStep-1).scrollView.scrollToElement(".selected");
    						
    						var modModel = pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()).contentsViews.tile.nestedView.children[cur].model;
								var nestedView = pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView;
          			nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
          			pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.scrollView.scrollToElement(".selected");
    					}
    				});
    			}
    		}
      }*/
    	/*onSync: function(collection,Data,options) {
    		console.log("ExtOfTypeCollection::onSync");
    		var currIndex = pSkeleton.getCurrentPanelIndex();
    		//Si le renderer courrant n'est pas Extensions c'est qu'on se trouve dans le menu de gauche
    		if(pSkeleton.currentRouteSteps[currIndex].get('renderer')!=="Extensions")
    			currIndex=currIndex-1;
    		//on Force un render() pour obliger le tri puis on met à jour l'ordre de tri
    		pSkeleton.getViewAt(currIndex).render();
    		this.title_sort_dir="desc";
    	}*/
    });
  });

define('DS/DMSApp/Collections/ScopeCollection',
  [
    'UWA/Core',
    'UWA/Class/Collection',
    'DS/DMSApp/Models/TypeModel',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/URLHandler',
    'DS/WAFData/WAFData',
    'DS/DMSApp/Utils/dictionaryJSONHandler'
  ],
  function(UWA, Collection, Type, WebappsUtils, URLHandler, WAFData, dicoHandler) {
    "use strict";


    return Collection.extend({
      //No initial model passed, because there is only 1 Tile ("Manage Business Rule").
      model: Type,
      /*
      Setup function is called when initializing a newly created instance of collection.
      It is not called in my application code because it is internally used.
      It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
      */
      setup: function() {
        UWA.log("ScopesCollection::setup");
        //debugger;
        //the URL property of this Collection Object is used to have access to the JSON File "Beginning_Entries.json".
        //this.url = WebappsUtils.getWebappsAssetUrl('DMSApp', 'dico.json');
        //this.url = 'https://vdevpril670dsy.dsone.3ds.com/3DSpace/resources/dictionary/typesExtensions';
        this.url = URLHandler.getURL() + "/resources/dictionary/DictionaryCUSTO";
        var currStep = pSkeleton.getCurrentPanelIndex();
        var currModel = pSkeleton.getModelAt(currStep);
        this.tool = "type";
        this.typeName = currModel.get('id');
        this.ScopeTypes = currModel.get('scopes');
      },
      typeName: 'default',

      //comparator:"title",

      /*
      Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
      It is not called in my application code because it is internally used.
      */
      sync: function(method, model, options) {
        UWA.log("ScopesCollection::sync");
        options.contentType = "application/json";
        options.lang = widget.lang;
        options.type = 'json';
        options.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        };
        options = Object.assign({
          ajax: WAFData.authenticatedRequest
        }, options);

        this._parent.apply(this, [method, model, options]);
      },

      /*
      Parse function is used to transform the backend response into an array of models.
      It is not called in my application code because it is internally used.
      The parameter "data" corresponds to the raw response object returned by the backend API.

      It returns the array of model attributes to be added to the collection.
      */
      parse: function(data) {
        UWA.log("ScopesCollection::parse");
        var paramReturned = [];
        var ScopeTypes = this.ScopeTypes;
        if(data.Dictionary.JsonTimeStamp>pSkeleton.dico_CUSTO.Dictionary.JsonTimeStamp){
            pSkeleton.dico_CUSTO = data;
        }
        dicoHandler.init(pSkeleton.dico_CUSTO,pSkeleton.dico_OOTB);
        paramReturned = dicoHandler.getSpecializableTypes(ScopeTypes)
        return paramReturned;

      }/*,
      onAdd: function(model, models, options) {
        var table = widget.getElement('table');
         if (table != undefined  && table.className.contains('table-container')) {
           table.toggleClassName('table-container');
           table.toggleClassName('table');
         }
      },*/
      /*onCollectionRendered: function() {
        console.log("hh");
      },
      onAnyEvent: function(eventName,eventData) {
        console.log("hh");
      }*/
      /*onSync: function() {
         widget.getElements('.row-container').forEach(function(item){item.toggleClassName("row-container")});
        Object.keys(pSkeleton.getViewAt(2).contentsViews.tile.nestedView.children).forEach(function(item) {
          var row = pSkeleton.getViewAt(2).contentsViews.tile.nestedView.children[item];
          if (row.model._attributes.isInherited == "Yes") {
            row.container.addClassName('warning');
          }
        });
      }*/
    });
  });

define('DS/DMSApp/Collections/TypeCollection',
  [
    'UWA/Core',
    'UWA/Class/Collection',
    'DS/DMSApp/Models/TypeModel',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/URLHandler',
    'DS/WAFData/WAFData',
    'DS/DMSApp/Utils/dictionaryJSONHandler'
  ],
  function(UWA, Collection, Type, WebappsUtils, URLHandler, WAFData, dicoHandler) {
    "use strict";


    return Collection.extend({
      //No initial model passed, because there is only 1 Tile ("Manage Business Rule").
      model: Type,
      /*
      Setup function is called when initializing a newly created instance of collection.
      It is not called in my application code because it is internally used.
      It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
      */
      setup: function() {
        UWA.log("DMSTypes::setup");
        //debugger;

        this.url = URLHandler.getURL() + "/resources/dictionary/DictionaryCUSTO";
        this.tool = "type";
        var ActiveIdCard = pSkeleton.getActiveIdCard();
        var routeSteps = pSkeleton.currentRouteSteps;
        var currStep = pSkeleton.getCurrentPanelIndex();
        if (routeSteps[currStep].get('renderer') === "Extensions" || routeSteps[currStep - 1].get('renderer') === "attributesGroup") {
          var step = currStep - 1;
          //this.type = routeSteps[step]['id'];
          //this.renderer = routeSteps[step].get('renderer');
          this.scopes = pSkeleton.getModelAt(currStep).get('scopes');
        } else if (routeSteps[currStep - 1].get('renderer') === "Extensions") {
          var step = currStep - 1;
          //this.type = routeSteps[step]['id'];
          //this.renderer = routeSteps[step].get('renderer');
          this.scopes = dicoHandler.customerExtensionHadScope(ActiveIdCard['model'].get('id'));
        }
      },
      title_sort_dir: 'asc',
      parent_sort_dir: 'asc',
      sort_elem: 'title',
      full_dico: null,
      comparator: function(modelA, modelB) {
        //UWA.log("DMSTypes::comaprator");
        var ret = modelA._attributes[this.sort_elem].localeCompare(modelB._attributes[this.sort_elem]);
        if (this.sort_elem == "title")
          return this.title_sort_dir == "asc" ? ret : -ret;
        else if (this.sort_elem == "subtitle") {
          return this.parent_sort_dir == "asc" ? ret : -ret;
        }
      },
      //comparator:"title",

      /*
      Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
      It is not called in my application code because it is internally used.
      */
      sync: function(method, collection, options) {
        UWA.log("DMSTypes::sync");
        //options.lang=WidgetServices.getLanguage();
        options.lang = widget.lang;
        options.type = 'json';
        options.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'SecurityContext': URLHandler.getSecurityContext()
        };
        options.sort = true;
        options.reset = this.myReset ? true : false;
        options = Object.assign({
          ajax: WAFData.authenticatedRequest
        }, options);
        this._parent.apply(this, [method, collection, options]);
      },

      /*
      Parse function is used to transform the backend response into an array of models.
      It is not called in my application code because it is internally used.
      The parameter "data" corresponds to the raw response object returned by the backend API.

      It returns the array of model attributes to be added to the collection.
      */
      parse: function(data) {
        UWA.log("DMSTypes::parse");
        /*Object.keys(data["DictionaryNLS"]).forEach(function(item) {
          pSkeleton.nls_OOTB["DictionaryNLS"][item] = data["DictionaryNLS"][item];
        });*/
        /*if (data.Dictionary.JsonTimeStamp > pSkeleton.dico_CUSTO.Dictionary.JsonTimeStamp) {
          pSkeleton.dico_CUSTO = data;
          Object.keys(data["DictionaryNLS"]).forEach(function(item) {
            pSkeleton.nls_OOTB["DictionaryNLS"][item] = data["DictionaryNLS"][item];
          });
        }*/

        //this.full_dico=data;
        dicoHandler.init(data, pSkeleton.dico_OOTB);
        var paramReturned = [];
        if ( /*this.renderer && this.renderer=== "attributesGroup" && */ this.scopes)
          paramReturned = dicoHandler.getScopes(this.scopes);
        /*else if(this.type)
        	paramReturned = dicoHandler.getSubType(this.type);*/
        else {
          paramReturned = dicoHandler.getTypes();
          var custoRelList = dicoHandler.getCustoRel();
          paramReturned = paramReturned.concat(custoRelList);
          var speInterfaceList = dicoHandler.getCustoSpeInterfaces();
          paramReturned = paramReturned.concat(speInterfaceList);
        }
        var headerValue = pSkeleton.getActiveIdCard().container.getElementsByTagName('span')[0].innerText;
        //if(headerValue.contains('|')){
        var val = headerValue.split('|');
        pSkeleton.getActiveIdCard().container.getElementsByTagName('span')[0].innerText = val[0] + " | " + paramReturned.length;
        //}
        pSkeleton.getViewAt(1).addEvent("onSearch", function(event) {
          console.log(event);
          var headerValue = pSkeleton.getActiveIdCard().container.getElementsByTagName('span')[0].innerText;
          var val = headerValue.split('|');
          pSkeleton.getActiveIdCard().container.getElementsByTagName('span')[0].innerText = val[0] + " | " + event.number;
        });

        var nls_Option = widget.getValue("DisplayOption");

        paramReturned.sort(function(a, b) {
          var a_externalName = dicoHandler.getDisplayName(a.Name);
          if(nls_Option ==="NLSOption")
          {
            a_externalName = dicoHandler.getNLSName(a.Name,a.Nature);
          }
          var b_externalName = dicoHandler.getDisplayName(b.Name);
          if(nls_Option ==="NLSOption")
          {
            b_externalName = dicoHandler.getNLSName(b.Name,b.Nature);
          }
          return a_externalName.localeCompare(b_externalName);
        });
        return paramReturned;

      },
      /*onSync: function(collection, Data, options) {
        console.log("typesCollection::onSync");
        var currIndex = pSkeleton.getCurrentPanelIndex();
        if (pSkeleton.currentRouteSteps[currIndex].get('renderer') !== "types")
          currIndex = currIndex - 1;
        pSkeleton.getViewAt(currIndex).render();
        this.title_sort_dir = "desc";
      }*/

    });
  });

define('DS/DMSApp/Views/CustomTileView',
  [
    'UWA/Core',
    'UWA/Promise',
    'UWA/Class/View',
    'DS/UIKIT/Modal',
    'DS/UIKIT/Scroller',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Input/Toggle',
    'DS/DMSApp/Utils/URLHandler',
    'DS/UIKIT/Autocomplete',
    'DS/DMSApp/Views/Layouts/CustomField',
    'DS/UIKIT/Input/Button',
    'DS/UIKIT/Alert',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
    'DS/WAFData/WAFData',
    'DS/W3DXComponents/Views/Item/TileView',
    'DS/UIKIT/Popover'
  ],
  function(UWA, Promise, View, Modal, Scroller, Select, Toggle, URLHandler, Autocomplete, CustomField /*, ImmersiveFrame, Panel*/ , Button, Alert, dicoHandler, myNls, WAFData, TileView, Popover) {

    'use strict';
    /*
    This class generates all the views in the process View. In other words, it's the "leader" view.
    */
    return TileView.extend({
      tagName: 'div',
      className: 'dashboard-tile-view',
      elements: {},

      /**
       * @override UWA.Class.View#setup
       * @param {View}   options.collectionView - The containing collection view.
       */
      setup: function(options) {
        this._parent.apply(this, options);
        this.addEvent("onItemRendered", function(tt) {
          if ( this.model.get('DMSStatus')!=undefined || !pSkeleton.isAuthoring  /*this.model._attributes.parent == "VPMReference" || this.model._attributes.parent == "Requirement" || this.model.get('Package') === "DMSPackDefault_01"*/) {
            var span = UWA.createElement('span', {

              class: "fonticon fonticon-lock"
            });
            /*if (this.model._attributes.parent == "VPMReference") {
              span.setStyle("color", "#EA4F37");
            } else {
              span.setStyle("color", "#E87B00");
            }*/
            span.setStyle("color", "#FFFFFF");
            span.setStyle("float", "right");
            var div = this.container.getElementsByClassName('tile-actions')[0];
            div.firstElementChild.remove();
            var msgForTooltip = "";
            if(!pSkeleton.isAuthoring) {
            	div.style.backgroundColor = "#EA4F37";
              msgForTooltip = myNls.get('InProductionStatus');
            } else {
            if (this.model.get('DMSStatus')==="PROD" /*this.model._attributes.parent == "VPMReference"|| this.model.get('Package') === "DMSPackDefault_01"*/) {
              div.style.backgroundColor = "#EA4F37";
              msgForTooltip = myNls.get('importFromProd');
            } else if(this.model.get('DMSStatus')==="DEV" || this.model.get('DMSStatus')==="DMSExported"/*this.model._attributes.parent == "Requirement"*/){
              div.style.backgroundColor = "#E87B00";
                msgForTooltip = myNls.get('exported');
            }
            }
            var popover = new Popover({
              className: "inverted",
              target: div,
              position: "top",
              body: msgForTooltip,
              title: myNls.get('locked'),
              trigger: 'onmouseover',
              autoHide: true,
              delay: {
                show: 50
              }
            });
            div.onmouseover = function() {
              var delay = setTimeout(function() {
                popover.toggle();
              }, 300);
              div.onmouseout = function() {
                clearTimeout(delay);
                if (popover.isVisible) {
                  popover.toggle();
                }
              };
              // popover.toggle();
            };
            span.inject(div);
            /*var img = this.container.getElementsByTagName('img')[0];
            img.setStyle("filter", "grayscale(100%)");
            var title = this.container.getElementsByClassName('tile-title')[0];
            title.style.color = "#3d3d3d";*/

          }
        });
        this.collectionView = options.collectionView;
      }
    });

  });

define('DS/DMSApp/Utils/Renderers/AttrGroupRenderer',
[
	'DS/W3DXComponents/Skeleton',
	'DS/W3DXComponents/Views/Layout/GridScrollView',
	'DS/W3DXComponents/Collections/ActionsCollection',
	'DS/UIKIT/Autocomplete',
	'DS/UIKIT/Alert',
	'DS/UIKIT/Mask',
	'DS/DMSApp/Views/CustomModal',
	'DS/DMSApp/Views/CustomTileView',
	'DS/DMSApp/Utils/dictionaryJSONHandler',
	'DS/DMSApp/Utils/DMSWebServices',
	'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
	'css!DS/DMSApp/DMSApp'
],
function(Skeleton, GridScrollView, ActionsCollection, Autocomplete, Alert, Mask, CustomModal, CustoTileView, dicoHandler,webService, myNls) {
	"use strict";

	var attributesGroup = {
		collection: 'DS/DMSApp/Collections/AttrGroupCollection',
		view: 'DS/W3DXComponents/Views/Item/SetView',
		viewOptions: {
			contents: {
				useInfiniteScroll: false,
				usePullToRefresh: false,
				views: [{
					'id':'tile',
					'title': 'grpAttTest',
					'className': 'tileView',
					'view': GridScrollView,
					'itemView': CustoTileView
				}]
			},
			actions: {
				collection: function() {
					var arrayActs = [{
						title: myNls.get('attGrpSearchTitle'),
						icon: 'fonticon fonticon-search myFindBtnAttGrp',
						id: 'attGrpSearch',
						name: 'attGrpSearch',
						overflow: false
					}];
					var currentIndex = pSkeleton.getCurrentPanelIndex();
					var isOOTB = false;
					var nature = pSkeleton.getModelAt(currentIndex-1).get('nature');
					if (nature!=undefined && nature !="menu") {
						isOOTB = dicoHandler.isOOTBAggregator2(pSkeleton.getModelAt(currentIndex)._attributes)
					}
					if (pSkeleton && pSkeleton.isAuthoring && !isOOTB) {
						var currIndex = pSkeleton.getCurrentPanelIndex();
						if (currIndex === 1) {
							arrayActs.push({
							title: myNls.get('newAttGrpTitle'),
							icon: 'plus myPlusBtnAttGrp',
							id: 'addAttGrp',
							overflow: false
							});
						} else if (pSkeleton.currentRouteSteps[currIndex - 1].get('renderer') === 'types') {
							arrayActs.push({
							title: myNls.get('newAttGrpTitle'),
							icon: 'plus myPlusBtnAttGrp',
							id: 'newAttGrp',
							name: 'newAttGrp',
							overflow: false
							});
						}
					}
					arrayActs.push({
						title: myNls.get('sortAttGrpTitle'),
						icon: 'fonticon fonticon-sort-alpha-asc mySortBtnAttGrp',
						id: 'sortAttGrp',
						overflow: false
					});
					return new ActionsCollection(arrayActs);
				},
				events: {
					'onActionClick': function(actionsView, actionView, event) {
						console.log(actionsView);
						console.log(actionView);
						console.log(event);
						var actionId = actionView.model.get('id');
						if (actionId === 'attGrpSearch') {
							var searchExist = this.container.getElement("#searchAutoCompleteInput");
							if (searchExist != null) {
								searchExist.destroy();
							} else {
								var searchDiv = UWA.createElement('div', {
									'id': 'searchAutoCompleteInput',
									'class': 'autoCompleteSearch',
									styles: {
										//'width': '100%',
										overflow: 'visible'
									}
								});
								searchDiv.setStyle('width', '300px');
								var insertDiv = actionView.container.parentNode.insertBefore(searchDiv, actionView.container);
								//var insertDiv = pSkeleton.getActiveIdCard().elements.actionsSection.insertBefore(searchDiv, pSkeleton.getActiveIdCard().elements.actionsSection.getChildren()[0]);
								var autoComplete = new Autocomplete({
									name: "attGrpSearch",
									showSuggestsOnFocus: true,
									multiSelect: false,
									minLengthBeforeSearch: 0,
									datasets: [],
									//placeholder: myNls.get('SearchAttGrpInputMsg'),
									events: {
										onKeyUp: function(key) {
											var currIndex = pSkeleton.getCurrentPanelIndex();
											if(currIndex!=1 && pSkeleton.currentRouteSteps[currIndex].get('renderer')!=='attributesGroup') {
												currIndex = currIndex-1;
											}
											this.elements.clear.onclick = function() {
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														tile.show();
													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											}.bind(this);
											var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
											var keys = Object.keys(tileList);
											var typeNumber = keys.length;
											if (Array.isArray(keys)) {
												keys.forEach(function(iElement) {
													var tile = tileList[iElement];
													var scopeContain = false;
													tile.model.get('scopes').forEach(
														function(scope){
															if(scope.toLowerCase().contains(key.currentTarget.value.toLowerCase()))
																scopeContain = true;
														}
													);
													if (tile.model._attributes.title.toLowerCase().contains(key.currentTarget.value.toLowerCase()) || scopeContain) {
														tile.show();
													}
													else {
														tile.hide();
														typeNumber--;
													}
												});
												pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
													number: typeNumber
												});
											}
										},
										onSelect: function(item) {
											var currIndex = pSkeleton.getCurrentPanelIndex();
											if(currIndex!=1 && pSkeleton.currentRouteSteps[currIndex].get('renderer')!=='attributesGroup')
												currIndex = currIndex-1;
											var selectItem = [];
											var auto = this;
											auto.selectedItems.forEach(function(elem) {
												selectItem.push(elem.label);
											});
											var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
											var keys = Object.keys(tileList);
											var typeNumber = keys.length;
											if (Array.isArray(keys)) {
												keys.forEach(function(iElement) {
													var tile = tileList[iElement];
													if (tile.model._attributes.title == item.value || tile.model._attributes.subtitle == item.value) {
														tile.show();
													}
													else if (selectItem.indexOf(tile.model._attributes.title) === -1) {
														tile.hide();
														typeNumber--;
													}
												});
												pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
													number: typeNumber
												});
											}
										},
										onUnselect: function(item, badge, badgePos) {
											var currIndex = pSkeleton.getCurrentPanelIndex();
											if(currIndex!=1 && pSkeleton.currentRouteSteps[currIndex].get('renderer')!=='attributesGroup')
												currIndex = currIndex-1;
											var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
											var keys = Object.keys(tileList);
											var typeNumber = keys.length;
											if (Array.isArray(keys)) {
												keys.forEach(function(iElement) {
													var tile = tileList[iElement];
													tile.show();
												});
												pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
													number: typeNumber
												});
											}
										}
									},
									style: {
										//'width': '100%',
										overflow: 'visible'
									}
								}).inject(insertDiv);
								var currIndex = pSkeleton.getCurrentPanelIndex();
								if(currIndex!=1 && pSkeleton.currentRouteSteps[currIndex].get('renderer')!=='attributesGroup')
									currIndex = currIndex-1;
								autoComplete.addDataset({
									'name': "Types",
									'items': pSkeleton.getViewAt(currIndex).collection.map(function(iElem) {
										return {
											value: iElem.get('id'),
											label: iElem.get('title'),
											scopes: iElem.get('scopes')
										};
									}),
									'configuration': {
										searchEngine: function(dataset, text) {
											text = text.toLowerCase();
											var sug = [];
											dataset.items.forEach(function(item) {
												if (item.label.toLowerCase().contains(text)) {
													sug.push(item);
												} else {
													item.scopes.forEach(function(scope) {
														if (scope.toLowerCase().contains(text)) {
															sug.push(item);
														}
													});
												}
											});
											return sug;
										}
									}
								});
								searchDiv.getElementsByTagName('input')[0].focus();
							}
						} else if(actionId === 'sortAttGrp') {
							var currIndex = pSkeleton.getCurrentPanelIndex();
							if(pSkeleton.currentRouteSteps[currIndex].get('renderer')!=='attributesGroup')
								currIndex = currIndex-1;
							//pSkeleton.getViewAt(currIndex).collection.sort_elem = "title";
							pSkeleton.getViewAt(currIndex).collection.sort();
							pSkeleton.getViewAt(currIndex).render();
							if (pSkeleton.getViewAt(currIndex).collection.title_sort_dir === "asc") {
								//pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "crs";
								pSkeleton.getViewAt(currIndex).actionsView.container.getElementsByClassName('fonticon-sort-alpha-asc')[0].className="fonticon fonticon-2x fonticon-fonticon fonticon-sort-alpha-desc mySortBtnAttGrp";
							} /*else {
								//pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "asc";
								pSkeleton.getViewAt(currIndex).actionsView.container.getElementsByClassName('fonticon-sort-alpha-desc')[0].className="fonticon fonticon-2x fonticon-fonticon fonticon-sort-alpha-asc";
							}*/
						} else if(actionId === 'addAttGrp') {
							require(['DS/DMSApp/Views/InterfaceForm'], (function(InterfaceForm) {
								var myInterfaceForm;
								myInterfaceForm = new InterfaceForm("New");
								var formBuild = myInterfaceForm.build();
								var myModal = new CustomModal(formBuild,pSkeleton.container,myNls.get("newAttGrp"));
								myModal.build();
							}).bind(this));
						} else if(actionId === 'newAttGrp') {
							var currIndex = pSkeleton.getCurrentPanelIndex();
							//IR-817326-3DEXPERIENCER2021x S63 we are now check the case where we have an extension open but in the list of extending interfaces
							if(pSkeleton.currentRouteSteps[currIndex].get('renderer')!=='attributesGroup') {
								currIndex = currIndex-1;
							}
							var currModel = pSkeleton.getModelAt(currIndex);
							//if(pSkeleton.currentRouteSteps[currIndex-1].get('renderer')!=="tools")
							if(currModel.get('DeploymentExtensible')=== "Yes") {
								require(['DS/DMSApp/Views/InterfaceForm'], (function(InterfaceForm) {
									var myInterfaceForm = new InterfaceForm("AddTo",pSkeleton.getModelAt(currIndex));
									var formBuild = myInterfaceForm.build();
									var myModal = new CustomModal(formBuild,pSkeleton.container,myNls.get("newAttGrp"));
									myModal.build();
								}).bind(this));
							}
							else {
								var alert = new Alert({
									visible: true,
									autoHide: true,
									hideDelay: 3000
								}).inject(this.actionsView.container,'top');
								alert.add({
									className: 'warning',
									message: currModel.get('title')+" "+myNls.get('notExtensible')
								});
							}
						}
					}
				}
			},
			events: {
				/*onRender: function(view) {
					console.log('AttGrpRenderer:OnRender');
					console.log(view);
									//pSkeleton.getCollectionAt(pSkeleton.getCurrentPanelIndex())._models.forEach(function(model){
										//if(model.get('scopes').length>1)
											//pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()).contentsViews.tile.nestedView.getChildView(model).container.getElementsByClassName('tile-content')[0].title=model.get('scopes');
									//})
				},
				onRenderContentView: function(view) {
					console.log('AttGrpRenderer:OnRenderContentView');
					console.log(view);
				},*/
				onRenderSwitcherView: function(view) {
					// To hide the view switcher Icon
					view.container.hide();
					// To hide the "|" and the dot icon.
					var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
					if (actionsDiv != undefined && actionsDiv.length > 0) {
						actionsDiv[0].className = "set-actions";
					}
					var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
					if (actionInlineDot != undefined && actionInlineDot.length > 0) {
						actionInlineDot[0].hide();
					}
				}
			}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				ownerName: 'subtitle',
				description: 'scopesNls'
			},
			thumbnail: function() {
				return {
					squareFormat: true,
					url: this.get('image')
				};
			},
			//Extra facets for the BusinessRulesDetails, but should it be removed ?
			facets: function() {
				return [
					{
						text: myNls.get('AttrOfTypeTab'),
						icon: 'attributes-persistent',
						name: 'facetattgrprenderer-s63',
						handler: Skeleton.getRendererHandler('Typeattributes')
					},
					{	// LMT7 IR-877758-3DEXPERIENCER2022x 10/11/21 Modify the ScopesTypeTab
						text: myNls.get('ScopesTypeTab'),
						icon: 'split-3',
						name: 'scopesRenderer',
						handler: Skeleton.getRendererHandler('types')
					}
				];
			},
			actions: function() {
				var myActions = [];

				myActions.push({
					text: myNls.get('editAttGrp'),
					icon: 'fonticon fonticon-pencil',
					handler: function(view) {
						require(['DS/DMSApp/Views/InterfaceForm'], (function(InterfaceForm) {
							var formBuild = new InterfaceForm("Edit", this.model).build();
							var myModal = new CustomModal(formBuild,pSkeleton.container,myNls.get("editAttGrp"));
							myModal.build();
						}).bind(this));
					}
				});

				if(!dicoHandler.hadChildren(this.get('id'),this.get('nature'))) {
					myActions.push({
						text: myNls.get('deleteAttGrp'),
						icon: 'fonticon fonticon-trash myTrashBtnAttGrp',
						handler: function(view) {
							console.log("DeleteAggregator webservice call");
							console.log(view);
							Mask.mask(widget.body)
							webService.aggregatorDelete(
								{
									"Name": this.model.get('id'),
									"Nature": this.model.get('nature'),
									"Package": this.model.get('Package'),
								},
								this.model.get('nature'),
								function(resp) {
									console.log(resp);
									Mask.unmask(widget.body);
									pSkeleton.slideBack();
									var currStep = pSkeleton.getCurrentPanelIndex();
									pSkeleton.getCollectionAt(currStep).myReset=true;
									pSkeleton.getCollectionAt(currStep).setup();
									pSkeleton.getCollectionAt(currStep).fetch({
										data:{
											maxAge:0
									}
									});
								},
								function(message) {
									console.log(message);
									Mask.unmask(widget.body);
									var alert = new Alert({
										visible: true,
										autoHide: true,
										hideDelay: 2000
									}).inject(pSkeleton.container);
									alert.add({
										className: 'error',
										message: message
									});
								}
							);
						}
					});
				} else {
					myActions.push({
						text: "cannot remove extension because there are children(s)(NLS)",
						icon: 'fonticon fonticon-trash myTrashBtnAttGrp',
						disable: true,
					});
				}

				//}
				myActions.push({
					text: myNls.get('CpToClipExtensionInfoPopup'),
					icon: 'fonticon fonticon-clipboard-add',
					handler: function(view) {
					var value = view.model._attributes.id;
					var input = UWA.createElement('input', {
						'value': value
					});
					document.body.appendChild(input);
					input.select();
					document.execCommand("copy");
					document.body.removeChild(input);
					var alert = new Alert({
						visible: true,
						autoHide: true,
						hideDelay: 2000
					}).inject(this.elements.actionsSection,'top');
					alert.add({
						className: 'primary',
						message: myNls.get('InternalNameCopied')
					});
					}
				});
				return myActions;
			},
			events: {
				onFacetSelect: function(facetName) {
					var myModel = this.model;
					pSkeleton.facetName = facetName;
					UWA.log("MyModel onFacetSelect :" + myModel);
				},
				onRender: function() {
					// style on the icon
					let thumbnail = this.container.getElement(".thumbnail");
					thumbnail.setStyle("background-size", "auto");
					thumbnail.setStyle("background-position", "center");
					thumbnail.setStyle("background-color", "#f4f5f6");
					if(!pSkeleton.isAuthoring) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "badge-error";
						var text = myNls.get('InProductionStatus');
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text : text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					} else if(this.model.get('DMSStatus')!=undefined) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "";
						var text = "";
						if (this.model.get('DMSStatus') === "PROD") {
							className = "badge-error";
							text = myNls.get('InProductionStatus');
						} else if (this.model.get('DMSStatus') === "DEV" || this.model.get('DMSStatus') === "DMSExported") {
							className = "badge-warning";
							text = myNls.get('ExportedStatus');
						}
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text: text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					}
				}
			}
		}
	}
	return attributesGroup;
});

define('DS/DMSApp/Utils/Renderers/TypeRenderer',
[
	'DS/W3DXComponents/Skeleton',
	'DS/W3DXComponents/Views/Layout/GridScrollView',
	'DS/DMSApp/Views/CustomTileView',
	'DS/W3DXComponents/Collections/ActionsCollection',
	'DS/UIKIT/DropdownMenu',
	'DS/UIKIT/Autocomplete',
	'DS/UIKIT/Mask',
	'DS/DMSApp/Views/CustomModal',
	'DS/DMSApp/Utils/dictionaryJSONHandler',
	'DS/DMSApp/Utils/DMSWebServices',
	'DS/UIKIT/Alert',
	'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
	'css!DS/DMSApp/DMSApp'
],
function(Skeleton, GridScrollView, CustoTileView, ActionsCollection, DropdownMenu, Autocomplete, Mask, CustomModal, dicoHandler, webService, Alert, myNls) {
	"use strict";

	return {
		collection: 'DS/DMSApp/Collections/TypeCollection',
		view: 'DS/W3DXComponents/Views/Item/SetView',
		viewOptions: {
			contents: {
				useInfiniteScroll: false,
				usePullToRefresh: false,
				views: [{
					'id': 'tile',
					'title': 'TypeTest',
					'className': 'tileView',
					'view': GridScrollView,
					'itemView': CustoTileView
				}]
			},
			actions: {
				collection: function() {
					var acts = [];
					var nature = this.model.get("nature");
					acts.push({
						id: 'findType',
						title: myNls.get('FindTypePopup'),
						icon: 'fonticon fonticon-search myFindBtnType',
						overflow: false,
						nature: nature
					});
					if (pSkeleton && pSkeleton.isAuthoring) {
						//IR-953012-3DEXPERIENCER2023x S63 7/18/22 use current model nature
						if (nature === "Interface") {
							var tempIcon = "fonticon fonticon-pencil";
							var tempText = myNls.get('modScope');
							var myID = 'addScope';
							if (pSkeleton.getActiveIdCard()['model'].get('DMSStatus') != undefined) {
								tempIcon = "fonticon fonticon-plus";
								tempText = myNls.get('addScope');
							}
							var scopes = dicoHandler.customerExtensionHadScope(this.model.get('parent'));
							if (scopes && scopes.length !== 0) {
								tempIcon = "fonticon fonticon-pencil-locked";
								tempText = myNls.get('noModScopeExtension');
								myID = 'disabled';
							}
							acts.push({
								id: myID,
								title: tempText,
								icon: tempIcon,
								nature: nature,
								overflow: false
							});

						} else {
							acts.push({
								id: 'addType',
								title: myNls.get('NewTypePopup'),
								icon: 'fonticon fonticon-plus myPlusBtnType',
								overflow: false,
								nature: nature
							});
						}
					}
					acts.push({
						id: 'filterType',
						title: myNls.get("TypeFilterPopup"),
						icon: 'fonticon fonticon-filter myFilterBtnType',
						overflow: false,
						nature: nature
					});
					acts.push({
						id: 'sortType',
						title: myNls.get('SortTypePopup'),
						icon: 'fonticon fonticon-sort-alpha-asc mySortBtnType',
						overflow: false,
						nature: nature
					});
					return new ActionsCollection(acts);
				},
				events: {
					'onActionClick': function(actionsView, actionView, event) {
						var actionId = actionView.model.get('id');
						switch (actionId) {
							case "findType":

								var searchExist = this.container.getElement("#searchAutoCompleteInput");
								if (searchExist != null) {
									searchExist.destroy();
								} else {
									var searchDiv = UWA.createElement('div', {
										'id': 'searchAutoCompleteInput',
										'class': 'autoCompleteSearch',
										styles: {
											//'width': '100%',
											overflow: 'visible'
										}
									});
									searchDiv.setStyle('width', '250px');
									var insertDiv = actionView.container.parentNode.insertBefore(searchDiv, actionView.container);
									//var insertDiv = pSkeleton.getActiveIdCard().elements.actionsSection.insertBefore(searchDiv, pSkeleton.getActiveIdCard().elements.actionsSection.getChildren()[0]);
									var autoComplete = new Autocomplete({
										showSuggestsOnFocus: true,
										multiSelect: false,
										minLengthBeforeSearch: 0,
										datasets: [],
										//placeholder: myNls.get('SearchInputMsg'),
										events: {
											onKeyUp: function(key) {
												var currIndex = pSkeleton.getCurrentPanelIndex();
												if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
													currIndex = currIndex - 1;
												this.elements.clear.onclick = function() {
													var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
													var keys = Object.keys(tileList);
													var typeNumber = keys.length;
													if (Array.isArray(keys)) {
														keys.forEach(function(iElement) {
															var tile = tileList[iElement];
															tile.show();

														});
														pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
															number: typeNumber
														});
													}
												}.bind(this);
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														if (tile.model.get("title").toLowerCase().contains(key.currentTarget.value.toLowerCase()) || tile.model.get("subtitle").toLowerCase().contains(key.currentTarget.value.toLowerCase())) {
															tile.show();
														} else {
															tile.hide();
															typeNumber--;
														}
													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											},
											onSelect: function(item) {
												var currIndex = pSkeleton.getCurrentPanelIndex();
												if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
													currIndex = currIndex - 1;
												var selectItem = [];
												var auto = this;
												auto.selectedItems.forEach(function(elem) {
													selectItem.push(elem.label);
												});
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														if (tile.model.get("title") == item.value || tile.model.get("subtitle") == item.value) {
															tile.show();
														} else if (selectItem.indexOf(tile.model.get("title")) === -1) {
															tile.hide();
															typeNumber--;
														}
													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											},
											onUnselect: function(item, badge, badgePos) {
												var currIndex = pSkeleton.getCurrentPanelIndex();
												if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
													currIndex = currIndex - 1;
												var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
												var keys = Object.keys(tileList);
												var typeNumber = keys.length;
												if (Array.isArray(keys)) {
													keys.forEach(function(iElement) {
														var tile = tileList[iElement];
														tile.show();

													});
													pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
														number: typeNumber
													});
												}
											}
										},
										style: {
											//'width': '100%',
											overflow: 'visible'
										}
									}).inject(insertDiv);
									var currIndex = pSkeleton.getCurrentPanelIndex();
									if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex-1].get('renderer') === 'types')
										currIndex = currIndex - 1;
									var searchDico = {};
									searchDico.name = "Types";
									searchDico.items = [];
									pSkeleton.getViewAt(currIndex).collection._models.forEach(function(iElem) {
										searchDico.items.push({
											value: iElem.get("title"),
											subLabel: iElem.get("subtitle")
										});
									});
									searchDico.configuration = {};
									searchDico.configuration.searchEngine = function(dataset, text) {
										text = text.toLowerCase();
										var sug = [];
										dataset.items.forEach(function(item) {
											if (item.label.toLowerCase().contains(text)) {
												sug.push(item);
											} else if (item.subLabel.toLowerCase().contains(text)) {
												sug.push(item);
											}
										});
										return sug;
									};
									autoComplete.addDataset(searchDico);
									searchDiv.getElementsByTagName('input')[0].focus();
								}

								break;
							case "addType":
								if (actionView.model.get("nature") == "menu" || actionView.model.get("nature") == "Type") {
									require(['DS/DMSApp/Views/TypeForm'], (function(TypeForm){
										var myTypeForm = new TypeForm(false, false, undefined).buildForNew();
										new CustomModal(myTypeForm, pSkeleton.getActiveIdCard().container, myNls.get("NewTypeFormHeader")).build();
									}).bind(this))
								} else if (actionView.model.get("nature") == "Interface") {
									require(['DS/DMSApp/Views/InterfaceForm'], (function(InterfaceForm){
										var myInterfaceForm = new InterfaceForm("Edit", pSkeleton.getActiveIdCard()['model']);
										var formBuild = myInterfaceForm.build();
										new CustomModal(formBuild, pSkeleton.container, myNls.get('editInterface')).build();
									}).bind(this))
								}
								break;
							case "addScope":
								var currIndex = pSkeleton.getCurrentPanelIndex();
								//IR-953012-3DEXPERIENCER2023x S63 7/18/22 if call from left panel decrease currIndex
								if (actionView['model'].get('nature')!==pSkeleton.getModelAt(currIndex).get('nature')) {
									currIndex--;
								}
								var model = pSkeleton.getModelAt(currIndex);
								if (model.get('interface') === "custoExt") {
									require(['DS/DMSApp/Views/CustoExtForm'], (function(CustoExtForm){
										var myInterfaceForm = new CustoExtForm("AddScope", model);
										var formBuild = myInterfaceForm.build();
										var myModal = new CustomModal(formBuild, pSkeleton.container, myNls.get('custoExtScopeFormName')).build();
									}).bind(this))
								} else if (model.get('interface') === "attGroup") {
									require(['DS/DMSApp/Views/InterfaceForm'], (function(InterfaceForm){
										var myInterfaceForm = new InterfaceForm("Edit", model);
										var formBuild = myInterfaceForm.build();
										var myModal = new CustomModal(formBuild, pSkeleton.container, myNls.get('attGrpScopeFormName')).build();
									}).bind(this))
								}
								break;
							case "filterType":
								if (actionView.filterMenu == undefined) {
									let filterOptTab = [{
											id: "AllTypeFilterButton",
											text: myNls.get("ResetFilter"),
											fonticon: "reset",
											selectable: true

										},
										{
											className: "divider"
										},
										{
											id: "ConcreteTypeFilterButton",
											text: myNls.get("ConcreteTypeFilter"),
											fonticon: "object-class-concrete-add",
											selectable: true
										},
										{
											id: "AbstractTypeFilterButton",
											text: myNls.get("AbstractTypeFilter"),
											fonticon: "object-class-abstract",
											selectable: true
										}
									];
									if (pSkeleton.isAuthoring) {
										filterOptTab.push({
											className: "divider"
										}, {
											id: "ExportedTypeFilterButton",
											text: myNls.get("ExportedTypeFilter"),
											fonticon: "export",
											selectable: true
										}, {
											id: "InProdTypeFilterButton",
											text: myNls.get("InProdTypeFilter"),
											fonticon: "factory",
											selectable: true
										}, {
											id: "CurrentTypeFilterButton",
											text: myNls.get("UnderDefinitionFilter"),
											fonticon: "hardhat",
											selectable: true
										});
									}

									var myDropdown = new DropdownMenu({
										/*
									Accessing the container containing the action button "Create Business Rule", through this.containter.children etc.
									We could have access to it through getChildren() method I guess.
										*/
										target: actionView.container.parentNode.getElementsByClassName("fonticon fonticon-fonticon fonticon-filter")[0],
										//target: this.elements.actionsSection.getElementsByClassName("fonticon fonticon-fonticon fonticon-filter")[0],
										items: filterOptTab,
										events: {
											onClick: function(e, item) {
												var currIndex = pSkeleton.getCurrentPanelIndex();
												if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
													currIndex = currIndex - 1;
												//var filterIcon = widget.getElements('span.action.interactive')[2];
												var filterPlace = 1;
												if (pSkeleton.isAuthoring)
													filterPlace = 2;
												//var filterIcon = pSkeleton.getViewAt(currIndex).container.getElementsByClassName('actions-container')[0].getChildren()[filterPlace]
												var filterIcon = this._parent.container;
												if (item.id == "ConcreteTypeFilterButton") {
													//var filterIcon = $('span.action.interactive')[2];
													filterIcon.setStyle('color', '#005686');
													var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
													var keys = Object.keys(tileList);
													var typeNumber = keys.length;
													if (Array.isArray(keys)) {
														keys.forEach(function(iElement) {
															var tile = tileList[iElement];
															if (!tile.model.isAbstract()) {
																tile.show();
															} else {
																tile.hide();
																typeNumber--;
															}
														});
														pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
															number: typeNumber
														});
													}
												} else if (item.id == "AbstractTypeFilterButton") {
													//var filterIcon = $('span.action.interactive')[2];
													filterIcon.setStyle('color', '#005686');
													var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
													var keys = Object.keys(tileList);
													var typeNumber = keys.length;
													if (Array.isArray(keys)) {
														keys.forEach(function(iElement) {
															var tile = tileList[iElement];
															if (tile.model.isAbstract()) {
																tile.show();
															} else {
																tile.hide();
																typeNumber--;
															}
														});
														pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
															number: typeNumber
														});
													}
												} else if (item.id == "ExportedTypeFilterButton") {
													//var filterIcon = $('span.action.interactive')[2];
													filterIcon.setStyle('color', '#005686');
													var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
													var keys = Object.keys(tileList);
													var typeNumber = keys.length;
													if (Array.isArray(keys)) {
														keys.forEach(function(iElement) {
															var tile = tileList[iElement];
															if (tile.model.getDMSStatus() === "DMSExported") {
																tile.show();
															} else {
																tile.hide();
																typeNumber--;
															}
														});
														pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
															number: typeNumber
														});
													}
												} else if (item.id == "InProdTypeFilterButton") {
													//var filterIcon = $('span.action.interactive')[2];
													filterIcon.setStyle('color', '#005686');
													var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
													var keys = Object.keys(tileList);
													var typeNumber = keys.length;
													if (Array.isArray(keys)) {
														keys.forEach(function(iElement) {
															var tile = tileList[iElement];
															if (tile.model.getDMSStatus() === "PROD") {
																tile.show();
															} else {
																tile.hide();
																typeNumber--;
															}
														});
														pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
															number: typeNumber
														});
													}
												} else if (item.id == "CurrentTypeFilterButton") {
													//var filterIcon = $('span.action.interactive')[2];
													filterIcon.setStyle('color', '#005686');
													var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
													var keys = Object.keys(tileList);
													var typeNumber = keys.length;
													if (Array.isArray(keys)) {
														keys.forEach(function(iElement) {
															var tile = tileList[iElement];
															if (tile.model.getDMSStatus() == undefined) {
																tile.show();
															} else {
																tile.hide();
																typeNumber--;
															}
														});
														pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
															number: typeNumber
														});
													}
												} else if (item.id == "AllTypeFilterButton") {
													//var filterIcon = $('span.action.interactive')[2];
													filterIcon.removeAttribute('style');
													var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
													var keys = Object.keys(tileList);
													var typeNumber = keys.length;
													if (Array.isArray(keys)) {
														keys.forEach(function(iElement) {
															var tile = tileList[iElement];
															tile.show();
														});
														pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
															number: typeNumber
														});
													}
												}
											},
											//This event is triggered when we click outside of the dropdown menu. Then we destroy it.
											onClickOutside: function() {
												//this.hide();
											}
										}
									}).show();
									myDropdown._parent = actionView;
									actionView.filterMenu = myDropdown;
								} else {
									actionView.filterMenu.show();
								}

								break;
							case "sortType":
								/*var sortType = [{
									title: myNls.get('SortTypeByName'),
									icon: "fonticon fonticon-sort-alpha-asc"
								},{
									title: myNls.get('SortTypeByParentName'),
									icon: "fonticon fonticon-sort-alpha-asc"
								}];*/
								if (actionView.container.dropdown == undefined) {
									var myDropdownSort = new DropdownMenu({
										target: actionView.container,
										//target: this.elements.actionsSection.getElementsByClassName("fonticon fonticon-fonticon fonticon-sort-alpha-asc ")[0],
										items: [{
												id: "sortByName",
												text: myNls.get('SortTypeByName'),
												icon: "fonticon fonticon-sort-alpha-asc"
											},
											{
												id: "sortByParentName",
												text: myNls.get('SortTypeByParentName'),
												icon: "fonticon fonticon-sort-alpha-asc"
											}
										],
										events: {
											onClick: function(event, item) {
												if (event.target.className.contains("item-icon-sort")) {
													var currIndex = pSkeleton.getCurrentPanelIndex();
													if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
														currIndex = currIndex - 1;
													if (item.id == "sortByName") {
														pSkeleton.getViewAt(currIndex).collection.sort_elem = "title";
														//event.target.addClassName("active");
														if (event.target.className.contains("asc")) {
															pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "asc";
														} else if (event.target.className.contains("desc")) {
															pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "desc";
														}
													} else if (item.id == "sortByParentName") {
														pSkeleton.getViewAt(currIndex).collection.sort_elem = "subtitle";
														if (event.target.className.contains("asc")) {
															pSkeleton.getViewAt(currIndex).collection.parent_sort_dir = "asc";
														} else if (event.target.className.contains("desc")) {
															pSkeleton.getViewAt(currIndex).collection.parent_sort_dir = "desc";
														}
													}
													if (this.options.target.getElementsByClassName("fonticon")[0].className.contains("asc") && event.target.className.contains("desc")) {
														this.options.target.getElementsByClassName("fonticon")[0].className = this.options.target.getElementsByClassName("fonticon")[0].className.replace("asc", "desc");
													} else if (this.options.target.getElementsByClassName("fonticon")[0].className.contains("desc") && event.target.className.contains("asc")) {
														this.options.target.getElementsByClassName("fonticon")[0].className = this.options.target.getElementsByClassName("fonticon")[0].className.replace("desc", "asc");
													}
													pSkeleton.getViewAt(currIndex).collection.sort();
													pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.render();
												}
											},
											onShow: function() {
												for (var item of this.elements.container.getElementsByClassName("active")) {
													item.removeClassName("active");
												}
												var currIndex = pSkeleton.getCurrentPanelIndex();
												if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
													currIndex = currIndex - 1;
												var menu = this;
												this.items.forEach(function(item) {
													if (pSkeleton.getViewAt(currIndex).collection.sort_elem == "title" && item.id == "sortByName") {
														if (pSkeleton.getViewAt(currIndex).collection.title_sort_dir == "asc") {
															item.elements.container.getElementsByClassName("fonticon-sort-alpha-asc")[0].addClassName("active");
														} else {
															item.elements.container.getElementsByClassName("fonticon-sort-alpha-desc")[0].addClassName("active");
														}
													} else if (pSkeleton.getViewAt(currIndex).collection.sort_elem == "subtitle" && item.id == "sortByParentName") {
														if (pSkeleton.getViewAt(currIndex).collection.parent_sort_dir == "asc") {
															item.elements.container.getElementsByClassName("fonticon-sort-alpha-asc")[0].addClassName("active");
														} else {
															item.elements.container.getElementsByClassName("fonticon-sort-alpha-desc")[0].addClassName("active");
														}
													}
												});
											}
										}
									});
									myDropdownSort.items.forEach(function(item) {
										item.elements.container.firstElementChild.remove();
										item.elements.container.setStyle("cursor", "default");
										item.elements.container.addContent({
											tag: "div",
											class: "item-text item-icon-group",
											html: [{
												class: "fonticon fonticon-sort-alpha-asc item-icon-sort",
												tag: "span",
												title: myNls.get("SortTypeAsc")
											}, {
												class: "fonticon fonticon-sort-alpha-desc item-icon-sort",
												tag: "span",
												title: myNls.get("SortTypeDesc")
											}]
										});
									});
									actionView.container.dropdown = myDropdownSort;
									myDropdownSort.elements.container.addClassName("sortDropdownMenu");
									myDropdownSort.show();
								}
								/*else {
								actionView.container.dropdown.show();
							}*/

								break;
							default:
								throw new TypeError("Unknown action id");
						}
					}
				}
			},
			events: {
				onRenderSwitcherView: function(view) {
					// To hide the view switcher Icon
					view.container.hide();
					// To hide the "|" and the dot icon.
					var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
					if (actionsDiv != undefined && actionsDiv.length > 0) {
						actionsDiv[0].className = "set-actions";
					}
					var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
					if (actionInlineDot != undefined && actionInlineDot.length > 0) {
						actionInlineDot[0].hide();
					}
				}
			}
			//}
		},
		idCardOptions: {
			attributesMapping: {
				title: 'title',
				ownerName: 'subtitle',
				description: 'content'
			},
			thumbnail: function() {
				const typeMap = dicoHandler.getParentTypeMap(this.get("id"), dicoHandler.getKeyToReadOnDico(this.get('nature')));
				let img = this.get('image');
				for (let i = 0; i < typeMap.length; i++) {
					if (typeMap[i].IconLarge != undefined) {
						img = "data:image/png;base64," + typeMap[i].IconLarge;
						break;
					}
				}
				return {
					squareFormat: true,
					url: img
				};
			},
			/*{
								url: WebappsUtils.getWebappsAssetUrl('DMSApp', "TypeIcon.png"),
								squareFormat: true
							}
			,*/
			actions: function() {
				var typeCmds = [];
				if (!dicoHandler.isOOTBAgregator(this.get("id"), this.get("nature"))) {
					if (pSkeleton.isAuthoring) {
						typeCmds.push({
							text: myNls.get('EditTypePopup'),
							icon: 'pencil',
							handler: function(view) {
								require(['DS/DMSApp/Views/TypeForm'], (function(TypeForm){
									var currentPanel = pSkeleton.getCurrentPanelIndex();
									var myModel = pSkeleton.getModelAt(currentPanel);
									var myTypeForm = new TypeForm(false, true, myModel).buildForEdit();
									//var formBuild = myInterfaceForm.build();
									// LMT7 IR-867366-3DEXPERIENCER2022x : 09/11/21
									var myModal = new CustomModal(myTypeForm, pSkeleton.getActiveIdCard().container, myNls.get("EditTypePopup")).build();
								}).bind(this))
							}
						});
					}
					if (!dicoHandler.hadChildren(this.get('id'), this.get('nature')) /* && !dicoHandler.isScopeTarget(this.get('id'),this.get('nature'))*/ ) {
						typeCmds.push({
							text: myNls.get('DeleteTypePopup'),
							icon: 'fonticon fonticon-trash ',
							handler: function(view) {
								console.log("DeleteAggregator webservice call");
								Mask.mask(widget.body)
								webService.aggregatorDelete({
										"Name": this.model.get('id'),
										"Nature": this.model.get('nature'),
										"Package": this.model.get('Package'),
									}, this.model.get('nature'), function(resp) {
										console.log(resp);
										Mask.unmask(widget.body);
										pSkeleton.slideBack();
										var currStep = pSkeleton.getCurrentPanelIndex();
										pSkeleton.getCollectionAt(currStep).setup();
										pSkeleton.getCollectionAt(currStep).fetch({
											data: {
												maxAge: 0
											}
										});
									},
									function(message) {
										console.log(message);
										Mask.unmask(widget.body);
										var alert = new Alert({
											visible: true,
											autoHide: true,
											hideDelay: 2000
										}).inject(pSkeleton.container);
										alert.add({
											className: 'error',
											message: message
										});

									});
							}
						});
					} else {
						typeCmds.push({
							text: myNls.get("noDeleteTypeHasChildren"),
							icon: 'fonticon fonticon-trash ',
							disabled: true,
						});
					}
				}
				typeCmds.push({
					text: myNls.get('CpToClipTypeInfoPopup'),
					icon: 'fonticon fonticon-clipboard-add',
					handler: function(view) {
						var value = view.model.get("id");
						var input = UWA.createElement('input', {
							'value': value
						});
						document.body.appendChild(input);
						input.select();
						document.execCommand("copy");
						document.body.removeChild(input);
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 2000
						}).inject(this.elements.actionsSection);
						alert.add({
							className: 'primary',
							message: myNls.get('InternalNameCopied')
						});
					}
				});
				return typeCmds;
			},
			events: {
				onFacetSelect: function(facetName) {
					var myModel = this.model;
					pSkeleton.facetName = facetName;
					UWA.log("MyModel onFacetSelect :" + myModel);
				},
				onFacetUnselect: function(facetName) {
					var myModel = this.model;
					UWA.log("MyModel onFacetSelect :" + myModel);
				},
				onRouteChange: function(ee) {
					UWA.log("MyModel onRouteChange :" + ee);
				},
				onRender: function() {
					// style on the icon
					let thumbnail = this.container.getElement(".thumbnail");
					thumbnail.setStyle("background-size", "auto");
					thumbnail.setStyle("background-position", "center");
					thumbnail.setStyle("background-color", "#f4f5f6");

					var tt = dicoHandler.getParentTypeMap(this.model.get("id"), dicoHandler.getKeyToReadOnDico(this.model.getNature()));
					if (tt.length > 0) {
						for (let item of document.getElementsByClassName('lineageDiv')) {
							item.destroy();
						}
						var lineageDiv = UWA.createElement('div', {
							'class': 'lineageDiv'
						});
						tt.reverse().forEach(function(item) {
							console.log(item);
							var spanText = UWA.createElement('span', {
								'class': "text-primary",
								"text": widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(item.Name, item.Nature) : dicoHandler.getDisplayName(item.Name),
								"id": item.Name
							});
							// Only custo type are cliclable
							if (item.Name != item.FirstOOTB) {
								spanText.setStyle("cursor", "pointer");
							}
							var curTypeName = spanText.id;
							spanText.onclick = function() {
								if (curTypeName != pSkeleton.getActiveIdCard().model.id) {
									Object.keys(pSkeleton.getViewAt(1).contentsViews.tile.nestedView.children).forEach(function(cur) {
										var curTypeId = pSkeleton.getViewAt(1).contentsViews.tile.nestedView.children[cur].model.id;
										var model = pSkeleton.getViewAt(1).contentsViews.tile.nestedView.children[cur].model;
										if (curTypeName == curTypeId) {
											var nestedView = pSkeleton.getViewAt(1).contentsViews.tile.nestedView;
											nestedView.dispatchEvent("onItemViewClick", [model], nestedView);
										}
									});
								}
							};
							var spanChevron = UWA.createElement('span', {
								'class': "fonticon fonticon-double-chevron-right "
							});
							spanText.inject(lineageDiv);
							spanChevron.inject(lineageDiv);
						});
						lineageDiv.lastElementChild.remove();
						var container = this.container.getElement(".info-section");
						lineageDiv.inject(container);
					}
					if (!pSkeleton.isAuthoring) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "badge-error";
						var text = myNls.get('InProductionStatus');
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text: text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					} else if (this.model.get('DMSStatus') != undefined) {
						for (let item of document.getElementsByClassName('StatusDiv')) {
							item.destroy();
						}
						var infoSection = this.container.getElementsByClassName("info-section")[0];
						var className = "";
						var text = "";
						if (this.model.get('DMSStatus') === "PROD") {
							className = "badge-error";
							text = myNls.get('InProductionStatus');
						} else if (this.model.get('DMSStatus') === "DEV" || this.model.get('DMSStatus') === "DMSExported") {
							className = "badge-warning";
							text = myNls.get('ExportedStatus');
						}
						var badgeGroup = UWA.createElement('span', {
							class: className + " badge badge-root"
						});
						UWA.createElement('span', {
							class: "badge-content",
							text: text
						}).inject(badgeGroup);
						UWA.createElement('span', {
							class: "fonticon fonticon-lock"
						}).inject(badgeGroup);
						var divStatus = UWA.createElement('div', {
							class: "StatusDiv"
						});
						badgeGroup.inject(divStatus);
						divStatus.inject(infoSection);
					}
				}
			},
			//Extra facets for the BusinessRulesDetails, but should it be removed ?
			facets: function() {
				var facets = [];
				//IR-852064-3DEXPERIENCER2021x/22x S63 5/11/2021 Now we do not display extension and attribute s group tab in case of extension sub type
					facets.push({
						text: myNls.get('AttrOfTypeTab'),
						icon: 'attributes-persistent',
						name: 'hjhjh',
						handler: Skeleton.getRendererHandler('Typeattributes')
					});
					//FUN124741 S63 3/6/2022 we need extension and attribute's group tab in case of Relationship
					if(this.get('nature')==="Type" || this.get('nature')==="Relationship") {
						facets.push({
							text: myNls.get('GpOfAttrOfTypeTab'),
							icon: 'deployment-extension',
							name: 'process',
							handler: Skeleton.getRendererHandler('attributesGroup')
						});
						facets.push({
							text: myNls.get('ExtOfTypeTab'),
							icon: 'package-extension',
							name: 'extension',
							handler: Skeleton.getRendererHandler('Extensions')
						});
					}
					facets.push({
						text: myNls.get('SubTypeTab'),
						icon: 'symboltype',
						name: 'subType',
						handler: Skeleton.getRendererHandler('SubTypes')
					});
				return facets;
			}
		}
	};
});

define('DS/DMSApp/Utils/Renderers/UniquekeyRenderer',
  [
    'DS/W3DXComponents/Skeleton',
    'DS/W3DXComponents/Views/Layout/GridScrollView',
    'DS/DMSApp/Views/CustomTileView',
    'DS/W3DXComponents/Collections/ActionsCollection',
    'DS/UIKIT/DropdownMenu',
    'DS/UIKIT/Autocomplete',
    'DS/UIKIT/Mask',
    
    'DS/DMSApp/Views/CustomModal',
    'DS/DMSApp/Utils/DMSWebServices',
    'DS/UIKIT/Alert',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
    'css!DS/DMSApp/DMSApp'
  ],
  function(Skeleton, GridScrollView, CustoTileView, ActionsCollection, DropdownMenu, Autocomplete, Mask, CustomModal, webService, Alert, myNls) {
    "use strict";
    var types = {
      collection: 'DS/DMSApp/Collections/UniquekeyCollection',
      view: 'DS/W3DXComponents/Views/Item/SetView',
      viewOptions: {
        contents: {
          useInfiniteScroll: false,
          usePullToRefresh: false,
          views: [{
            'id': 'tile',
            'title': 'TypeTest',
            'className': 'tileView',
            'view': GridScrollView,
            'itemView': CustoTileView
          }]
        },
        actions: {
          collection: function() {
            var acts = [];
            var nature = this.model.get("nature");
            acts.push({
              id: 'findType',
              title: myNls.get('FindUKPopup'),
              icon: 'fonticon fonticon-search',
              overflow: false,
              nature: nature
            });
            if (pSkeleton && pSkeleton.isAuthoring) {
              acts.push({
                id: 'addType',
                title: myNls.get('NewUniquekeyPopup'),
                icon: 'fonticon fonticon-plus',
                overflow: false,
                nature: nature
              });
            }
            acts.push({
              id: 'sortType',
              title: myNls.get('SortUKPopup'),
              icon: 'fonticon fonticon-sort-alpha-asc ',
              overflow: false,
              nature: nature
            });
            return new ActionsCollection(acts);
          },
          events: {
            'onActionClick': function(actionsView, actionView, event) {
              var actionId = actionView.model.get('id');
              switch (actionId) {
                case "findType":

                  var searchExist = this.container.getElement("#searchAutoCompleteInput");
                  if (searchExist != null) {
                    searchExist.destroy();
                  } else {
                    var searchDiv = UWA.createElement('div', {
                      'id': 'searchAutoCompleteInput',
                      'class': 'autoCompleteSearch',
                      styles: {
                        //'width': '100%',
                        overflow: 'visible'
                      }
                    });
                    searchDiv.setStyle('width', '250px');
                    var insertDiv = actionView.container.parentNode.insertBefore(searchDiv, actionView.container);
                    //var insertDiv = pSkeleton.getActiveIdCard().elements.actionsSection.insertBefore(searchDiv, pSkeleton.getActiveIdCard().elements.actionsSection.getChildren()[0]);
                    var autoComplete = new Autocomplete({
                      showSuggestsOnFocus: true,
                      multiSelect: false,
                      minLengthBeforeSearch: 0,
                      datasets: [],
                      //placeholder: myNls.get('SearchInputMsg'),
                      events: {
                        onKeyUp: function(key) {
                          var currIndex = pSkeleton.getCurrentPanelIndex();
                          if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
                            currIndex = currIndex - 1;
                          this.elements.clear.onclick = function() {
                            var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                            var keys = Object.keys(tileList);
                            var typeNumber = keys.length;
                            if (Array.isArray(keys)) {
                              keys.forEach(function(iElement) {
                                var tile = tileList[iElement];
                                tile.show();

                              });
                              pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                                number: typeNumber
                              });
                            }
                          }.bind(this);
                          var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                          var keys = Object.keys(tileList);
                          var typeNumber = keys.length;
                          if (Array.isArray(keys)) {
                            keys.forEach(function(iElement) {
                              var tile = tileList[iElement];
                              if (tile.model.get("title").toLowerCase().contains(key.currentTarget.value.toLowerCase()) || tile.model.get("subtitle").toLowerCase().contains(key.currentTarget.value.toLowerCase())) {
                                tile.show();
                              } else {
                                tile.hide();
                                typeNumber--;
                              }
                            });
                            pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                              number: typeNumber
                            });
                          }
                        },
                        onSelect: function(item) {
                          var currIndex = pSkeleton.getCurrentPanelIndex();
                          if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
                            currIndex = currIndex - 1;
                          var selectItem = [];
                          var auto = this;
                          auto.selectedItems.forEach(function(elem) {
                            selectItem.push(elem.label);
                          });
                          var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                          var keys = Object.keys(tileList);
                          var typeNumber = keys.length;
                          if (Array.isArray(keys)) {
                            keys.forEach(function(iElement) {
                              var tile = tileList[iElement];
                              if (tile.model.get("title") == item.value || tile.model.get("subtitle") == item.value) {
                                tile.show();
                              } else if (selectItem.indexOf(tile.model.get("title")) === -1) {
                                tile.hide();
                                typeNumber--;
                              }
                            });
                            pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                              number: typeNumber
                            });
                          }
                        },
                        onUnselect: function(item, badge, badgePos) {
                          var currIndex = pSkeleton.getCurrentPanelIndex();
                          if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
                            currIndex = currIndex - 1;
                          var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                          var keys = Object.keys(tileList);
                          var typeNumber = keys.length;
                          if (Array.isArray(keys)) {
                            keys.forEach(function(iElement) {
                              var tile = tileList[iElement];
                              tile.show();

                            });
                            pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                              number: typeNumber
                            });
                          }
                        }
                      },
                      style: {
                        //'width': '100%',
                        overflow: 'visible'
                      }
                    }).inject(insertDiv);
                    var currIndex = pSkeleton.getCurrentPanelIndex();
                    if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'attributesGroup')
                      currIndex = currIndex - 1;
                    var searchDico = {};
                    searchDico.name = "Types";
                    searchDico.items = [];
                    pSkeleton.getViewAt(currIndex).collection._models.forEach(function(iElem) {
                      searchDico.items.push({
                        value: iElem.get("title"),
                        subLabel: iElem.get("subtitle")
                      });
                    });
                    searchDico.configuration = {};
                    searchDico.configuration.searchEngine = function(dataset, text) {
                      text = text.toLowerCase();
                      var sug = [];
                      dataset.items.forEach(function(item) {
                        if (item.label.toLowerCase().contains(text)) {
                          sug.push(item);
                        } else if (item.subLabel.toLowerCase().contains(text)) {
                          sug.push(item);
                        }
                      });
                      return sug;
                    };
                    autoComplete.addDataset(searchDico);
                    searchDiv.getElementsByTagName('input')[0].focus();
                  }

                  break;
                case "addType":
                  require(['DS/DMSApp/Views/UniquekeyForm'], (function(UniquekeyForm){
                    var myTypeForm = new UniquekeyForm(false, false, undefined).buildForNew();
                    new CustomModal(myTypeForm, pSkeleton.getActiveIdCard().container, myNls.get("NewUKFormHeader")).build();
                  }).bind(this))
                  break;
                case "filterType":
                  if (actionView.filterMenu == undefined) {
                    let filterOptTab = [{
                        id: "AllTypeFilterButton",
                        text: myNls.get("ResetFilter"),
                        fonticon: "reset",
                        selectable: true

                      },
                      {
                        className: "divider"
                      },
                      {
                        id: "ConcreteTypeFilterButton",
                        text: myNls.get("ConcreteTypeFilter"),
                        selectable: true
                      },
                      {
                        id: "AbstractTypeFilterButton",
                        text: myNls.get("AbstractTypeFilter"),
                        selectable: true
                      }
                    ];
                    if (pSkeleton.isAuthoring) {
                      filterOptTab.push({
                        className: "divider"
                      }, {
                        id: "ExportedTypeFilterButton",
                        text: myNls.get("ExportedTypeFilter"),
                        fonticon: "export",
                        selectable: true
                      }, {
                        id: "InProdTypeFilterButton",
                        text: myNls.get("InProdTypeFilter"),
                        fonticon: "factory",
                        selectable: true
                      }, {
                        id: "CurrentTypeFilterButton",
                        text: myNls.get("UnderDefinitionFilter"),
                        fonticon: "hardhat",
                        selectable: true
                      });
                    }

                    var myDropdown = new DropdownMenu({
                      /*
                    Accessing the container containing the action button "Create Business Rule", through this.containter.children etc.
                    We could have access to it through getChildren() method I guess.
        						 */
                      target: actionView.container.parentNode.getElementsByClassName("fonticon fonticon-fonticon fonticon-filter")[0],
                      //target: this.elements.actionsSection.getElementsByClassName("fonticon fonticon-fonticon fonticon-filter")[0],
                      items: filterOptTab,
                      events: {
                        onClick: function(e, item) {
                          var currIndex = pSkeleton.getCurrentPanelIndex();
                          if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
                            currIndex = currIndex - 1;
                          //var filterIcon = widget.getElements('span.action.interactive')[2];
                          var filterPlace = 1;
                          if (pSkeleton.isAuthoring)
                            filterPlace = 2;
                          //var filterIcon = pSkeleton.getViewAt(currIndex).container.getElementsByClassName('actions-container')[0].getChildren()[filterPlace]
                          var filterIcon = this._parent.container;
                          if (item.id == "ConcreteTypeFilterButton") {
                            //var filterIcon = $('span.action.interactive')[2];
                            filterIcon.setStyle('color', '#005686');
                            var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                            var keys = Object.keys(tileList);
                            var typeNumber = keys.length;
                            if (Array.isArray(keys)) {
                              keys.forEach(function(iElement) {
                                var tile = tileList[iElement];
                                if (!tile.model.isAbstract()) {
                                  tile.show();
                                } else {
                                  tile.hide();
                                  typeNumber--;
                                }
                              });
                              pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                                number: typeNumber
                              });
                            }
                          } else if (item.id == "AbstractTypeFilterButton") {
                            //var filterIcon = $('span.action.interactive')[2];
                            filterIcon.setStyle('color', '#005686');
                            var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                            var keys = Object.keys(tileList);
                            var typeNumber = keys.length;
                            if (Array.isArray(keys)) {
                              keys.forEach(function(iElement) {
                                var tile = tileList[iElement];
                                if (tile.model.isAbstract()) {
                                  tile.show();
                                } else {
                                  tile.hide();
                                  typeNumber--;
                                }
                              });
                              pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                                number: typeNumber
                              });
                            }
                          } else if (item.id == "ExportedTypeFilterButton") {
                            //var filterIcon = $('span.action.interactive')[2];
                            filterIcon.setStyle('color', '#005686');
                            var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                            var keys = Object.keys(tileList);
                            var typeNumber = keys.length;
                            if (Array.isArray(keys)) {
                              keys.forEach(function(iElement) {
                                var tile = tileList[iElement];
                                if (tile.model.getDMSStatus() === "DMSExported") {
                                  tile.show();
                                } else {
                                  tile.hide();
                                  typeNumber--;
                                }
                              });
                              pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                                number: typeNumber
                              });
                            }
                          } else if (item.id == "InProdTypeFilterButton") {
                            //var filterIcon = $('span.action.interactive')[2];
                            filterIcon.setStyle('color', '#005686');
                            var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                            var keys = Object.keys(tileList);
                            var typeNumber = keys.length;
                            if (Array.isArray(keys)) {
                              keys.forEach(function(iElement) {
                                var tile = tileList[iElement];
                                if (tile.model.getDMSStatus() === "PROD") {
                                  tile.show();
                                } else {
                                  tile.hide();
                                  typeNumber--;
                                }
                              });
                              pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                                number: typeNumber
                              });
                            }
                          } else if (item.id == "CurrentTypeFilterButton") {
                            //var filterIcon = $('span.action.interactive')[2];
                            filterIcon.setStyle('color', '#005686');
                            var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                            var keys = Object.keys(tileList);
                            var typeNumber = keys.length;
                            if (Array.isArray(keys)) {
                              keys.forEach(function(iElement) {
                                var tile = tileList[iElement];
                                if (tile.model.getDMSStatus() == undefined) {
                                  tile.show();
                                } else {
                                  tile.hide();
                                  typeNumber--;
                                }
                              });
                              pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                                number: typeNumber
                              });
                            }
                          } else if (item.id == "AllTypeFilterButton") {
                            //var filterIcon = $('span.action.interactive')[2];
                            filterIcon.removeAttribute('style');
                            var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
                            var keys = Object.keys(tileList);
                            var typeNumber = keys.length;
                            if (Array.isArray(keys)) {
                              keys.forEach(function(iElement) {
                                var tile = tileList[iElement];
                                tile.show();
                              });
                              pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
                                number: typeNumber
                              });
                            }
                          }
                        },
                        //This event is triggered when we click outside of the dropdown menu. Then we destroy it.
                        onClickOutside: function() {
                          //this.hide();
                        }
                      }
                    }).show();
                    myDropdown._parent = actionView;
                    actionView.filterMenu = myDropdown;
                  } else {
                    actionView.filterMenu.show();
                  }

                  break;
                case "sortType":
                  /*var sortType = [{
                    title: myNls.get('SortTypeByName'),
                    icon: "fonticon fonticon-sort-alpha-asc"
                  },{
                    title: myNls.get('SortTypeByParentName'),
                    icon: "fonticon fonticon-sort-alpha-asc"
                  }];*/
                  if (actionView.container.dropdown == undefined) {
                    var myDropdownSort = new DropdownMenu({
                      target: actionView.container,
                      //target: this.elements.actionsSection.getElementsByClassName("fonticon fonticon-fonticon fonticon-sort-alpha-asc ")[0],
                      items: [{
                          id: "sortByName",
                          text: myNls.get('SortTypeByName'),
                          icon: "fonticon fonticon-sort-alpha-asc"
                        },
                        {
                          id: "sortByParentName",
                          text: myNls.get('SortTypeByParentName'),
                          icon: "fonticon fonticon-sort-alpha-asc"
                        }
                      ],
                      events: {
                        onClick: function(event, item) {
                          if (event.target.className.contains("item-icon-sort")) {
                            var currIndex = pSkeleton.getCurrentPanelIndex();
                            if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
                              currIndex = currIndex - 1;
                            if (item.id == "sortByName") {
                              pSkeleton.getViewAt(currIndex).collection.sort_elem = "title";
                              //event.target.addClassName("active");
                              if (event.target.className.contains("asc")) {
                                pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "asc";
                              } else if (event.target.className.contains("desc")) {
                                pSkeleton.getViewAt(currIndex).collection.title_sort_dir = "desc";
                              }
                            } else if (item.id == "sortByParentName") {
                              pSkeleton.getViewAt(currIndex).collection.sort_elem = "subtitle";
                              if (event.target.className.contains("asc")) {
                                pSkeleton.getViewAt(currIndex).collection.parent_sort_dir = "asc";
                              } else if (event.target.className.contains("desc")) {
                                pSkeleton.getViewAt(currIndex).collection.parent_sort_dir = "desc";
                              }
                            }
                            if (this.options.target.getElementsByClassName("fonticon")[0].className.contains("asc") && event.target.className.contains("desc")) {
                              this.options.target.getElementsByClassName("fonticon")[0].className = this.options.target.getElementsByClassName("fonticon")[0].className.replace("asc", "desc");
                            } else if (this.options.target.getElementsByClassName("fonticon")[0].className.contains("desc") && event.target.className.contains("asc")) {
                              this.options.target.getElementsByClassName("fonticon")[0].className = this.options.target.getElementsByClassName("fonticon")[0].className.replace("desc", "asc");
                            }
                            pSkeleton.getViewAt(currIndex).collection.sort();
                            pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.render();
                          }
                        },
                        onShow: function() {
                          for (var item of this.elements.container.getElementsByClassName("active")) {
                            item.removeClassName("active");
                          }
                          var currIndex = pSkeleton.getCurrentPanelIndex();
                          if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'types')
                            currIndex = currIndex - 1;
                          var menu = this;
                          this.items.forEach(function(item) {
                            if (pSkeleton.getViewAt(currIndex).collection.sort_elem == "title" && item.id == "sortByName") {
                              if (pSkeleton.getViewAt(currIndex).collection.title_sort_dir == "asc") {
                                item.elements.container.getElementsByClassName("fonticon-sort-alpha-asc")[0].addClassName("active");
                              } else {
                                item.elements.container.getElementsByClassName("fonticon-sort-alpha-desc")[0].addClassName("active");
                              }
                            } else if (pSkeleton.getViewAt(currIndex).collection.sort_elem == "subtitle" && item.id == "sortByParentName") {
                              if (pSkeleton.getViewAt(currIndex).collection.parent_sort_dir == "asc") {
                                item.elements.container.getElementsByClassName("fonticon-sort-alpha-asc")[0].addClassName("active");
                              } else {
                                item.elements.container.getElementsByClassName("fonticon-sort-alpha-desc")[0].addClassName("active");
                              }
                            }
                          });
                        }
                      }
                    });
                    myDropdownSort.items.forEach(function(item) {
                      item.elements.container.firstElementChild.remove();
                      item.elements.container.setStyle("cursor", "default");
                      item.elements.container.addContent({
                        tag: "div",
                        class: "item-text item-icon-group",
                        html: [{
                          class: "fonticon fonticon-sort-alpha-asc item-icon-sort",
                          tag: "span",
                          title: "asc"
                        }, {
                          class: "fonticon fonticon-sort-alpha-desc item-icon-sort",
                          tag: "span",
                          title: "desc"
                        }]
                      });
                    });
                    actionView.container.dropdown = myDropdownSort;
                    myDropdownSort.elements.container.addClassName("sortDropdownMenu");
                    myDropdownSort.show();
                  }
                  /*else {
                  actionView.container.dropdown.show();
                }*/

                  break;
                default:
                  throw new TypeError("Unknown action id");
              }
            }
          }
        },
        events: {}
      },
      idCardOptions: {
        attributesMapping: {
          title: 'title',
          ownerName: 'externalTypeName',
          description: 'externalInterfaceName'
        },
        thumbnail: function() {
          //const typeMap = dicoHandler.getParentTypeMap(this.get("id"), dicoHandler.getKeyToReadOnDico(this.get('nature')));
          let img = this.get('image');
          /*  for (let i = 0; i < typeMap.length; i++) {
              if (typeMap[i].IconLarge != undefined) {
                img = "data:image/png;base64," + typeMap[i].IconLarge;
                break;
              }
            }*/
          return {
            squareFormat: true,
            url: img
          };
        },
        actions: function() {
          var typeCmds = [];
          typeCmds.push({
            text: myNls.get('DeleteUKPopup'),
            icon: 'fonticon fonticon-trash ',
            handler: function(view) {
              console.log("DeleteAggregator webservice call");
              Mask.mask(widget.body)
              webService.aggregatorDelete({
                  "Name": this.model.get('id'),
                  "Nature": this.model.get('nature'),
                  "Package": this.model.get('Package'),
                }, this.model.get('nature'), function(resp) {
                  console.log(resp);
                  Mask.unmask(widget.body);
                  pSkeleton.slideBack();
                  var currStep = pSkeleton.getCurrentPanelIndex();
                  pSkeleton.getCollectionAt(currStep).setup();
                  pSkeleton.getCollectionAt(currStep).fetch({
                    data: {
                      maxAge: 0
                    }
                  });
                },
                function(message) {
                  console.log(message);
                  Mask.unmask(widget.body);
                  var alert = new Alert({
                    visible: true,
                    autoHide: true,
                    hideDelay: 2000
                  }).inject(pSkeleton.container);
                  alert.add({
                    className: 'error',
                    message: message
                  });

                });
            }
          });
          return typeCmds;
        },
        events:{
          onRender: function(){
            // style on the icon
            let thumbnail = this.container.getElement(".thumbnail");
            thumbnail.setStyle("background-size", "auto");
            thumbnail.setStyle("background-position", "center");
            thumbnail.setStyle("background-color", "#f4f5f6");
          }
        },
        facets: function() {
          return [{
              text: myNls.get('AttrOfTypeTab'),
              icon: 'attributes-persistent',
              name: 'hjhjh',
              handler: Skeleton.getRendererHandler('Typeattributes')
            }
          ]
        }
      }

    };

    return types;
  });

define('DS/DMSApp/Utils/Renderers/ExtOfTypeRenderer',
  [
    'DS/W3DXComponents/Skeleton',
    'DS/W3DXComponents/Collections/ActionsCollection',
    'DS/W3DXComponents/Views/Layout/GridScrollView',
    'DS/UIKIT/DropdownMenu',
    'DS/UIKIT/Autocomplete',
    'DS/UIKIT/Alert',
    'DS/UIKIT/Mask',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/DMSApp/Utils/DMSWebServices',
    'DS/DMSApp/Views/CustomModal',
    'DS/DMSApp/Views/CustomTileView',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
    'css!DS/DMSApp/DMSApp'
  ],
  function(Skeleton, ActionsCollection, GridScrollView, DropdownMenu, Autocomplete, Alert, Mask, dicoHandler, webService, CustomModal, CustoTileView, myNls) {
    "use strict";

    var extOfType = {
    		collection: 'DS/DMSApp/Collections/ExtOfTypeCollection',
    		view: 'DS/W3DXComponents/Views/Item/SetView',
    		viewOptions: {
    	contents: {
    	useInfiniteScroll: false,
    	usePullToRefresh: false,
    	views: [{
    		'id': 'tile',
    		'title': "ExtensionList",
    		'className': 'tileView',
    		'view': GridScrollView,
    		'itemView': CustoTileView
    	}]
    },
    	actions: {
    	collection: function() {
    	var acts = [];
    	acts.push({
    		id: 'findExt',
    		name: 'findExt',
    		title: myNls.get('findExtensions'),
    		icon: 'fonticon fonticon-search myFindBtnExt',
    		overflow: false
    	});
      var currentIndex = pSkeleton.getCurrentPanelIndex();
      var isOOTB = false;
      var nature = pSkeleton.getModelAt(currentIndex-1).get('nature');
      if (nature!=undefined && nature !="menu") {
          isOOTB = dicoHandler.isOOTBAggregator2(pSkeleton.getModelAt(currentIndex)._attributes)
      }
      if (pSkeleton && pSkeleton.isAuthoring && !isOOTB) {

    		if (currentIndex === 1) {
    			acts.push({
    				id: 'newExt',
    				name: 'newExt',
    				title: myNls.get('createExtensions'),
    				icon: 'plus myPlusBtnExt',
    				overflow: false
    			});
    		} else if (pSkeleton.currentRouteSteps[currentIndex - 1].get('renderer') === 'Extensions') {
    			acts.push({
    				id: 'addSub',
    				name: 'addSub',
    				title: myNls.get('subCustoExtFormName'),
    				icon: 'plus myPlusBtnExt',
    				overflow: false
    			});
    		} else if (pSkeleton.currentRouteSteps[currentIndex - 1].get('renderer') === 'types') {
    			acts.push({
    				id: 'addScope',
    				name: 'addScope',
    				title: myNls.get('addExtToType'),
    				icon: 'plus myPlusBtnExt',
    				overflow: false
    			});
    		}
    	}
    	if (pSkeleton.currentRouteSteps[currentIndex - 1].get('renderer') === 'Extensions') {
    		var panel = "sub";
    	}
    	else {
    		var panel = "ext";
    	}
    	acts.push({
    		id: 'filterExt',
    		name: 'filterExt',
    		title: myNls.get("filterExtensions"),
    		icon: 'fonticon fonticon-filter myFilterBtnExt',
    		overflow: false,
    		panel: panel
    	});
    	acts.push({
    		id: 'sortExt',
    		name: 'sortExt',
    		title: myNls.get('sortExtensions'),
    		icon: 'fonticon fonticon-sort-alpha-asc mySortBtnExt',
    		overflow: false,
    		panel: panel
    	});
    	return new ActionsCollection(acts);
    },
    	events: {
    	'onActionClick': function(actionsView, actionView, event) {
    	console.log(actionsView);
    	console.log(actionView);
    	console.log(event);
    	var actionId = actionView.model.get('id');
    	switch (actionId) {
    		case "findExt":
    			var searchExist = this.container.getElement("#searchAutoCompleteInput");
    			if (searchExist != null) {
    				searchExist.destroy();
    			} else {
    				var searchDiv = UWA.createElement('div', {
    					'id': 'searchAutoCompleteInput',
    					'class': 'autoCompleteSearch',
    					styles: {
    					//'width': '100%',
    					overflow: 'visible'
    				}
    				});
    				searchDiv.setStyle('width', '250px');
    				var insertDiv = actionView.container.parentNode.insertBefore(searchDiv, actionView.container);
    				//var insertDiv = pSkeleton.getActiveIdCard().elements.actionsSection.insertBefore(searchDiv, pSkeleton.getActiveIdCard().elements.actionsSection.getChildren()[0]);
    				var autoComplete = new Autocomplete({
    					name: "extSearch",
    					showSuggestsOnFocus: true,
    					multiSelect: false,
    					minLengthBeforeSearch: 0,
    					datasets: [],
    					//placeholder: myNls.get('inputSearchExtension'),
    					events: {
    					onKeyUp: function(key) {
    					var currIndex = pSkeleton.getCurrentPanelIndex();
    					if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
    						currIndex = currIndex - 1;
    					this.elements.clear.onclick = function() {
    						var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
    						var keys = Object.keys(tileList);
    						var typeNumber = keys.length;
    						if (Array.isArray(keys)) {
    							keys.forEach(function(iElement) {
    								var tile = tileList[iElement];
    								tile.show();

    							});
    							pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
    								number: typeNumber
    							});
    						}
    					}.bind(this);
    					var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
    					var keys = Object.keys(tileList);
    					var typeNumber = keys.length;
    					if (Array.isArray(keys)) {
    						keys.forEach(function(iElement) {
    							var tile = tileList[iElement];
    							if (tile.model.get('title').toLowerCase().contains(key.currentTarget.value.toLowerCase()) || tile.model.get('subtitle').toLowerCase().contains(key.currentTarget.value.toLowerCase()) || tile.model.get('scopesNls').toString().toLowerCase().contains(key.currentTarget.value.toLowerCase())) {
    								tile.show();
    							} else {
    								tile.hide();
    								typeNumber--;
    							}
    						});
    						pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
    							number: typeNumber
    						});
    					}
    				},
    					onSelect: function(item) {
    					var currIndex = pSkeleton.getCurrentPanelIndex();
    					if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
    						currIndex = currIndex - 1;
    					var selectItem = [];
    					var auto = this;
    					auto.selectedItems.forEach(function(elem) {
    						selectItem.push(elem.label);
    					});
    					var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
    					var keys = Object.keys(tileList);
    					var typeNumber = keys.length;
    					if (Array.isArray(keys)) {
    						keys.forEach(function(iElement) {
    							var tile = tileList[iElement];
    							if (tile.model._attributes.title == item.value || tile.model._attributes.subtitle == item.value) {
    								tile.show();
    							} else if (selectItem.indexOf(tile.model._attributes.title) === -1) {
    								tile.hide();
    								typeNumber--;
    							}
    						});
    						pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
    							number: typeNumber
    						});
    					}
    				},
    					onUnselect: function(item, badge, badgePos) {
    					var currIndex = pSkeleton.getCurrentPanelIndex();
    					if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
    						currIndex = currIndex - 1;
    					var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
    					var keys = Object.keys(tileList);
    					var typeNumber = keys.length;
    					if (Array.isArray(keys)) {
    						keys.forEach(function(iElement) {
    							var tile = tileList[iElement];
    							tile.show();

    						});
    						pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
    							number: typeNumber
    						});
    					}
    				},
    					onCliskOutside: function() {
    					this.hide();
    				}
    				},
    					style: {
    					//'width': '100%',
    					overflow: 'visible'
    				}
    				}).inject(insertDiv);
    				var currIndex = pSkeleton.getCurrentPanelIndex();
    				if (currIndex != 1 && pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions')
    					currIndex = currIndex - 1;
    				var searchDico = {};
    				searchDico.name = "Types";
    				searchDico.items = [];
    				pSkeleton.getViewAt(currIndex).collection._models.forEach(function(iElem) {
    					searchDico.items.push({
    						value: iElem._attributes.title,
    						label: iElem._attributes.title,
    						subLabel: iElem._attributes.scopesNls,
    						parent: iElem._attributes.subtitle
    					});
    				});
    				searchDico.configuration = {};
    				searchDico.configuration.searchEngine = function(dataset, text) {
    					text = text.toLowerCase();
    					var sug = [];
    					dataset.items.forEach(function(item) {
    						if (item.label.toLowerCase().contains(text)) {
    							sug.push(item);
    						} else if (item.subLabel.toString().toLowerCase().contains(text)) {
    							sug.push(item);
    						} else if (item.parent.toLowerCase().contains(text)) {
    							sug.push(item);
    						}
    					});
    					return sug;
    				}
    				autoComplete.addDataset(searchDico);
    				searchDiv.getElementsByTagName('input')[0].focus();
    			}

    			break;
    		case "addSub":
				require(['DS/DMSApp/Views/CustoExtForm'], (function(CustoExtForm) {
					var currIndex = pSkeleton.getCurrentPanelIndex();
					var myInterfaceForm = new CustoExtForm("AddSub", pSkeleton.getModelAt(currIndex));
					var formBuild = myInterfaceForm.build();
					var myModal = new CustomModal(formBuild, pSkeleton.container, myNls.get("subCustoExtFormName"));
					myModal.build();
				}).bind(this))
    			break;
    		case "newExt":
				require(['DS/DMSApp/Views/CustoExtForm'], (function(CustoExtForm) {
					var currIndex = pSkeleton.getCurrentPanelIndex();
					var myInterfaceForm = new CustoExtForm("New");
					var formBuild = myInterfaceForm.build();
					var myModal = new CustomModal(formBuild, pSkeleton.container, myNls.get("custoExtFormName"));
					myModal.build();
				}).bind(this))
    			break;
    		case "addScope":

    			var currIndex = pSkeleton.getCurrentPanelIndex();
				//IR-935791-3DEXPERIENCER2022x/23x S63 current Model now carry extensible information
    			/*if(pSkeleton.currentRouteSteps[currIndex].get('renderer')!=="types")
    			    currIndex = currIndex-1;*/
    			var currModel = pSkeleton.getModelAt(currIndex);
    			if(currModel.get('CustomerExtensible')!==undefined && currModel.get('CustomerExtensible')=== "Yes") {
					require(['DS/DMSApp/Views/CustoExtForm'], (function(CustoExtForm) {
						var myInterfaceForm = new CustoExtForm("AddScopeFromType", pSkeleton.getModelAt(currIndex));
						var formBuild = myInterfaceForm.build();
						var myModal = new CustomModal(formBuild, pSkeleton.container, myNls.get("custoExtScopeFormName"));
						myModal.build();
					}).bind(this))
    			}
    			else {
    				var alert = new Alert({
    					visible: true,
    					autoHide: true,
    					hideDelay: 3000
    				}).inject(this.actionsView.container,'top');
    				alert.add({
    					className: 'warning',
    					message: currModel.get('title')+" "+myNls.get('notExtensible')
    				});
    			}

    			break;
    		case "filterExt":

    			new DropdownMenu({
    				/*
                    Accessing the container containing the action button "Create Business Rule", through this.containter.children etc.
                    We could have access to it through getChildren() method I guess.
    				 */
    				target: actionView.container.getElementsByClassName("fonticon")[0],
    				items: [{
    					text: myNls.get("Extensions"),
    					className: "header"
    				},
    				        {
    					id: "ConcreteTypeFilterButton",
              fonticon: "object-class-concrete-add",
    					text: myNls.get("ConcreteTypeFilter")
    				        },
    				        {
    				        	id: "AbstractTypeFilterButton",
                        fonticon: "object-class-abstract",
    				        	text: myNls.get("AbstractTypeFilter")
    				        },
    				        {
    				        	id: "AllTypeFilterButton",
    				        	text: myNls.get("AllTypeFilter")
    				        }
    				        ],
    				events: {
    				onClick: function(e, item) {
    				var currIndex = pSkeleton.getCurrentPanelIndex();
                    if(currIndex !== 1) {
	                  if (pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions'){
	                    currIndex = currIndex - 1;
					  }
					  else if(actionView.model.get('panel')!="sub" && pSkeleton.currentRouteSteps[currIndex-1].get('renderer') === 'Extensions')
					  {
					    currIndex = currIndex - 1;
					  }
	                }
    				var filterIcon = pSkeleton.getViewAt(currIndex).container.getElementsByClassName('fonticon-filter')[0];
    						if (item.id == "ConcreteTypeFilterButton") {
    							//var filterIcon = $('span.action.interactive')[2];
    							filterIcon.setStyle('color', '#005686');
    							var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
    							var keys = Object.keys(tileList);
    							var typeNumber = keys.length;
    							if (Array.isArray(keys)) {
    								keys.forEach(function(iElement) {
    									var tile = tileList[iElement];
    									if (tile.model._attributes.isAbstract != "Yes") {
    										tile.show();
    									} else {
    										tile.hide();
    										typeNumber--;
    									}
    								});
    								pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
    									number: typeNumber
    								});
    							}
    						} else if (item.id == "AbstractTypeFilterButton") {
    							//var filterIcon = $('span.action.interactive')[2];
    							filterIcon.setStyle('color', '#005686');
    							var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
    							var keys = Object.keys(tileList);
    							var typeNumber = keys.length;
    							if (Array.isArray(keys)) {
    								keys.forEach(function(iElement) {
    									var tile = tileList[iElement];
    									if (tile.model._attributes.isAbstract == "Yes") {
    										tile.show();
    									} else {
    										tile.hide();
    										typeNumber--;
    									}
    								});
    								pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
    									number: typeNumber
    								});
    							}
    						} else if (item.id == "AllTypeFilterButton") {
    							//var filterIcon = $('span.action.interactive')[2];
    							filterIcon.removeAttribute('style');
    							var tileList = pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.children;
    							var keys = Object.keys(tileList);
    							var typeNumber = keys.length;
    							if (Array.isArray(keys)) {
    								keys.forEach(function(iElement) {
    									var tile = tileList[iElement];
    									tile.show();
    								});
    								pSkeleton.getViewAt(currIndex).dispatchEvent("onSearch", {
    									number: typeNumber
    								});
    							}
    						}
    			},
    				//This event is triggered when we click outside of the dropdown menu. Then we destroy it.
    				onClickOutside: function() {
    				this.destroy();
    			}
    			}
    			}).show();

    			break;
    		case "sortExt":
        if (actionView.container.dropdown == undefined) {
          var myDropdownSort = new DropdownMenu({
            target: actionView.container,
            //target: this.elements.actionsSection.getElementsByClassName("fonticon fonticon-fonticon fonticon-sort-alpha-asc ")[0],
            items: [{
                id:"sortExtName",
                text: myNls.get('sortExtByName'),
                icon: "fonticon fonticon-sort-alpha-asc"
              },
              {
                  id:"sortExtParentName",
                  text: myNls.get('sortExtByParentName'),
                  icon: "fonticon fonticon-sort-alpha-asc"
              },
              {
                id:"sortExtScopeName",
                text: myNls.get('sortExtByScopeName'),
                icon: "fonticon fonticon-sort-alpha-asc"
              }
            ],
            events: {
              onClick: function(event, item) {
                if (event.target.className.contains("item-icon-sort")) {
                  var currIndex = pSkeleton.getCurrentPanelIndex();
                  if(currIndex !== 1) {
                	if (pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions'){
                	  currIndex = currIndex - 1;
					}
					else if(actionView.model.get('panel')!="sub" && pSkeleton.currentRouteSteps[currIndex-1].get('renderer') === 'Extensions')
					{
					  currIndex = currIndex - 1;
					}
                  }
                  if (item.id == "sortExtName") {
                    pSkeleton.getCollectionAt(currIndex).sort_elem = "title";
                    //event.target.addClassName("active");
                    if (event.target.className.contains("asc")) {
                      pSkeleton.getCollectionAt(currIndex).title_sort_dir = "asc";
                    } else if (event.target.className.contains("desc")) {
                      pSkeleton.getCollectionAt(currIndex).title_sort_dir = "desc";
                    }
                  } else if (item.id == "sortExtScopeName") {
                    pSkeleton.getViewAt(currIndex).collection.sort_elem = "content";
                    if (event.target.className.contains("asc")) {
                      pSkeleton.getCollectionAt(currIndex).parent_sort_dir = "asc";
                    } else if (event.target.className.contains("desc")) {
                      pSkeleton.getCollectionAt(currIndex).parent_sort_dir = "desc";
                    }
                  } else if (item.id == "sortExtParentName") {
                    pSkeleton.getCollectionAt(currIndex).sort_elem = "subtitle";
                    if (event.target.className.contains("asc")) {
                      pSkeleton.getCollectionAt(currIndex).parent_sort_dir = "asc";
                    } else if (event.target.className.contains("desc")) {
                      pSkeleton.getCollectionAt(currIndex).parent_sort_dir = "desc";
                    }
                  }
                  if (this.options.target.getElementsByClassName("fonticon")[0].className.contains("asc") && event.target.className.contains("desc")) {
                    this.options.target.getElementsByClassName("fonticon")[0].className = this.options.target.getElementsByClassName("fonticon")[0].className.replace("asc", "desc");
                  } else if (this.options.target.getElementsByClassName("fonticon")[0].className.contains("desc") && event.target.className.contains("asc")) {
                    this.options.target.getElementsByClassName("fonticon")[0].className = this.options.target.getElementsByClassName("fonticon")[0].className.replace("desc", "asc");
                  }
                  pSkeleton.getCollectionAt(currIndex).sort();
                  pSkeleton.getViewAt(currIndex).contentsViews.tile.nestedView.render();
                }
              },
              onShow: function() {
                for (var item of this.elements.container.getElementsByClassName("active")) {
                  item.removeClassName("active");
                }
                var currIndex = pSkeleton.getCurrentPanelIndex();
                if(currIndex !== 1) {
              	  if (pSkeleton.currentRouteSteps[currIndex].get('renderer') !== 'Extensions'){
              	    currIndex = currIndex - 1;
				  }
				  else if(actionView.model.get('panel')!="sub" && pSkeleton.currentRouteSteps[currIndex-1].get('renderer') === 'Extensions')
				  {
					currIndex = currIndex - 1;
				  }
                }
                var menu = this;
                this.items.forEach(function(item) {
                  if (pSkeleton.getCollectionAt(currIndex).sort_elem == "title" && item.id == "sortExtName") {
                    if (pSkeleton.getCollectionAt(currIndex).title_sort_dir == "asc") {
                      item.elements.container.getElementsByClassName("fonticon-sort-alpha-asc")[0].addClassName("active");
                    } else {
                      item.elements.container.getElementsByClassName("fonticon-sort-alpha-desc")[0].addClassName("active");
                    }
                  } else if (pSkeleton.getCollectionAt(currIndex).sort_elem == "subtitle" && item.id == "sortExtParentName") {
                    if (pSkeleton.getCollectionAt(currIndex).parent_sort_dir == "asc") {
                      item.elements.container.getElementsByClassName("fonticon-sort-alpha-asc")[0].addClassName("active");
                    } else {
                      item.elements.container.getElementsByClassName("fonticon-sort-alpha-desc")[0].addClassName("active");
                    }
                  } else if (pSkeleton.getCollectionAt(currIndex).sort_elem == "content" && item.id == "sortExtScopeName") {
                    if (pSkeleton.getCollectionAt(currIndex).parent_sort_dir == "asc") {
                      item.elements.container.getElementsByClassName("fonticon-sort-alpha-asc")[0].addClassName("active");
                    } else {
                      item.elements.container.getElementsByClassName("fonticon-sort-alpha-desc")[0].addClassName("active");
                    }
                  }
                });
              }
            }
          });
          myDropdownSort.items.forEach(function(item) {
            item.elements.container.firstElementChild.remove();
            item.elements.container.setStyle("cursor", "default");
            item.elements.container.addContent({
              tag: "div",
              class: "item-text item-icon-group",
              html: [{
                class: "fonticon fonticon-sort-alpha-asc item-icon-sort",
                tag: "span",
                title: "asc"
              }, {
                class: "fonticon fonticon-sort-alpha-desc item-icon-sort",
                tag: "span",
                title: "desc"
              }]
            });
          });
          actionView.container.dropdown = myDropdownSort;
          myDropdownSort.elements.container.addClassName("sortDropdownMenu");
          myDropdownSort.show();
        }

    			break;
    		default:
    			throw new TypeError("Unknown action id");
    	}
    }
    }
    },
    	events: {
    	onRenderSwitcherView: function(view) {
    	// To hide the view switcher Icon
    	view.container.hide();
    	// To hide the "|" and the dot icon.
    	var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
    	if (actionsDiv != undefined && actionsDiv.length > 0) {
    		actionsDiv[0].className = "set-actions";
    	}
    	var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
    	if (actionInlineDot != undefined && actionInlineDot.length > 0) {
    		actionInlineDot[0].hide();
    	}
    }
    }
    },
    		idCardOptions: {
    	attributesMapping: {
    	title: 'title',
    	ownerName: 'subtitle',
    	description: 'content'
    },
    	thumbnail: function() {
    	return {
    		squareFormat: true,
    		url: this.get('image')
    	};
    },
    	facets: function() {
    	return [{
    		text: myNls.get('AttrOfTypeTab'),
    		icon: 'attributes-persistent',
    		name: 'facetattrenderer-s63',
    		handler: Skeleton.getRendererHandler('Typeattributes')
    	},
    	        {
       // LMT7 IR-877758-3DEXPERIENCER2022x 10/11/21 Modify the ScopesTypeTab
    		text: myNls.get('ScopesTypeTab'),
    		icon: 'split-3',
    		name: 'facetScopesRenderer',
    		handler: Skeleton.getRendererHandler('types')
    	        },
    	        {
    	        	text: myNls.get('SubExtensions'),
    	        	icon: 'package-extension',
    	        	name: 'facetSubExtRenderer',
    	        	handler: Skeleton.getRendererHandler('Extensions')
    	        }
    	        ];
    },
    	actions: function() {
    	var lActs = [];
    	/*lActs.push({
					text: "add(NLS)",
					icon: 'plus',
					handler: function(view) {
						UWA.log("Add your sub ext");
	  					var currIndex = pSkeleton.getCurrentPanelIndex();
	  					var myDropdown = new DropdownMenu({
	  						target: this._config.get('actionsWithExtraData')[0]['listElt'],
	  	                    items: [{
	  	                        text: "Add(NL)",
	  	                        className: "header"
	  	                      },
	  	                      {
	  	                        id: "AddScope",
	  	                        text: "Modify the scope(NLS)"
	  	                      },
	  	                      {
	  	                        id: "AddSubExt",
	  	                        text: "Add a new sub extension(NLS)"
	  	                      }
	  	                    ],
	  	                    events: {
	  	                      onClick: function(e, item) {
		  						var currIndex=pSkeleton.getCurrentPanelIndex();
		  						if(item.id==='AddScope') {
	      						var myInterfaceForm = new CustoExtForm("AddScope",pSkeleton.getModelAt(currIndex));
	      						var formBuild = myInterfaceForm.build();
	      						var myModal = new CustomModal(formBuild,pSkeleton.container,"nouvelle scope pour ext(NLS)");
	      						myModal.build();
		  						}
		  						else if(item.id==='AddSubExt'){
		      						var myInterfaceForm = new CustoExtForm("AddSub",pSkeleton.getModelAt(currIndex));
		      						var formBuild = myInterfaceForm.build();
		      						var myModal = new CustomModal(formBuild,pSkeleton.container,"nouvelle sous ext(NLS)");
		      						myModal.build();
		  						}

	  						  }
	  						}
	  					}).show();
					}
				}),*/
    	//if(this.get('DMSStatus')==undefined){
    	if(pSkeleton && pSkeleton.isAuthoring) {
    		lActs.push({
    			text: myNls.get("editExtension"),
    			icon: 'pencil',
    			handler: function(view) {
	    			UWA.log("modify Customer Extension");
					require(['DS/DMSApp/Views/CustoExtForm'], (function(CustoExtForm) {
						var currIndex = pSkeleton.getCurrentPanelIndex();
						var myInterfaceForm = new CustoExtForm("Edit",pSkeleton.getModelAt(currIndex));
						var formBuild = myInterfaceForm.build();
						var myModal = new CustomModal(formBuild,pSkeleton.container,myNls.get("editExtension"));
						myModal.build();
					}).bind(this))
    			}
    		});
    	}
    	//}
    	//if(pSkeleton.isAuthoring) {
    		if(!dicoHandler.hadChildren(this.get('id'),this.get('nature'))) {
    			lActs.push({
    				text: myNls.get("deleteExtension"),
    				icon: 'fonticon fonticon-trash myTrashBtnExt',
    				handler: function(view) {
    				console.log("DeleteAggregator webservice call");
    				console.log(view);
    				Mask.mask(widget.body)
    				webService.aggregatorDelete({
    					"Name": this.model.get('id'),
    					"Nature": this.model.get('nature'),
    					"Package": this.model.get('Package'),
    				},this.model.get('nature')
    						,function(resp){
    					console.log(resp);
    					Mask.unmask(widget.body);
    					pSkeleton.slideBack();
    					var currStep = pSkeleton.getCurrentPanelIndex();
    					pSkeleton.getCollectionAt(currStep).myReset=true;
    					pSkeleton.getCollectionAt(currStep).setup();
    					pSkeleton.getCollectionAt(currStep).fetch({
    						data:{
    						maxAge:0
    					}
    					});
    				},
    						function(message) {
    					console.log(message);
    					Mask.unmask(widget.body);
              var alert = new Alert({
                visible: true,
                autoHide: true,
                hideDelay: 3000
              }).inject(pSkeleton.container);
              alert.add({
                className: 'error',
                message: message
              });
    				});
    			}
    			});
    		}
    		else {
    			lActs.push({
    				text: myNls.get("noDeleteExtension"),
    				icon: 'fonticon fonticon-trash myTrashBtnExt',
    				disabled: true,
    			});
    		}
    	//}
      	lActs.push({
      		text: myNls.get('CpToClipExtensionInfoPopup'),
      		icon: 'fonticon fonticon-clipboard-add',
      		handler: function(view) {
      		var value = view.model._attributes.id;
      		var input = UWA.createElement('input', {
      			'value': value
      		});
      		document.body.appendChild(input);
      		input.select();
      		document.execCommand("copy");
      		document.body.removeChild(input);
      		var alert = new Alert({
      			visible: true,
      			autoHide: true,
      			hideDelay: 2000
      		}).inject(this.elements.actionsSection,'top');
      		alert.add({
      			className: 'primary',
      			message: myNls.get('InternalNameCopied')
      		});
      	}
      	});
    	return lActs;
    },
    	events: {
    	onFacetSelect: function(facetName) {
    	var myModel = this.model;
    	pSkeleton.facetName = facetName;
    	UWA.log("MyModel onFacetSelect :" + myModel);
    },
    onRender: function() {
      // style on the icon
      let thumbnail = this.container.getElement(".thumbnail");
      thumbnail.setStyle("background-size", "auto");
      thumbnail.setStyle("background-position", "center");
      thumbnail.setStyle("background-color", "#f4f5f6");

    	console.log('ExtOfTypeRenderer:onRender');
    	var isRel = false;
    	if(this.model.get('nature')==="Relationship"){
    		isRel=true;
    	}
    	var lineageDiv = UWA.createElement('div', {
    		'class': 'lineageDiv'
    	});
    	if(this.model.get('parent')!="" && pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.visibleItems.length>1) {
    		var tt = dicoHandler.getParentTypeMap(this.model.id,dicoHandler.getKeyToReadOnDico(this.model._attributes.nature));
    		if (tt.length > 0) {
    			tt.reverse().forEach(function(item) {
    				console.log(item);
    				var spanText = UWA.createElement('span', {
    					'class': "text-primary",
    					"text": widget.getValue("DisplayOption") === "NLSOption"? dicoHandler.getNLSName(item.Name,item.Nature) : dicoHandler.getDisplayName(item.Name),
    							"id":item.Name
    				});
    				// Only custo type are cliclable
    				if (pSkeleton.getModelAt(pSkeleton.getCurrentPanelIndex()).get('id') != item['Name']) {
    					spanText.setStyle("cursor", "pointer");
    				}
    				var curTypeName = spanText.id;
    				spanText.onclick = function() {
    					if (curTypeName != pSkeleton.getActiveIdCard().model.id) {
    						Object.keys(pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.children).forEach(function(cur) {
    							var curTypeId = pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.children[cur].model.id;
    							if (curTypeName == curTypeId) {
    								pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.unSelectAll();
    								pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).contentsViews.tile.nestedView.children[cur].select();
    								var selected = pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).container.getElement(".selected");
    								pSkeleton.getViewAt(pSkeleton.getCurrentPanelIndex()-1).scrollView.scrollToElement(".selected");
    							}
    						});
    					}
    				}
    				var spanChevron = UWA.createElement('span', {
    					'class': "fonticon fonticon-double-chevron-right "
    				});
    				spanText.inject(lineageDiv);
    				spanChevron.inject(lineageDiv);
    			})
    			lineageDiv.lastElementChild.remove();
    		}
    	}
    	else {
    		UWA.createElement('span', {
    			'class': "text-primary",
    			"text": " ",
    		}).inject(lineageDiv);
    	}
    	var container = this.container.getElement(".detailed-info-section");
    	if(container.getChildren().length>1){
    		//var scopes = container.getChildren()[1];
    		//container.getChildren()[1].remove();
    		container.getChildren()[0].remove();
    		lineageDiv.inject(container,'top');
    		//scopes.inject(container);
    	}
    	if(!pSkeleton.isAuthoring) {
    		for (let item of document.getElementsByClassName('StatusDiv')) {
    			item.destroy();
    		}
    		var infoSection = this.container.getElementsByClassName("info-section")[0];
    		var className = "badge-error";
    		var text = myNls.get('InProductionStatus');
    		var badgeGroup = UWA.createElement('span', {
    			class: className + " badge badge-root"
    		});
    		UWA.createElement('span', {
    			class: "badge-content",
    			text : text
    		}).inject(badgeGroup);
    		UWA.createElement('span', {
    			class: "fonticon fonticon-lock"
    		}).inject(badgeGroup);
    		var divStatus = UWA.createElement('div', {
    			class: "StatusDiv"
    		});
    		badgeGroup.inject(divStatus);
    		divStatus.inject(infoSection);
    	} else if (this.model.get('DMSStatus')!=undefined) {
    		for (let item of document.getElementsByClassName('StatusDiv')) {
    			item.destroy();
    		}
    		var infoSection = this.container.getElementsByClassName("info-section")[0];
    		var className = "";
    		var text = "";
    		if (this.model.get('DMSStatus') === "PROD") {
    			className = "badge-error";
    			text = myNls.get('InProductionStatus');
    		} else if (this.model.get('DMSStatus') === "DEV" || this.model.get('DMSStatus') === "DMSExported") {
    			className = "badge-warning";
    			text = myNls.get('ExportedStatus');
    		}
    		var badgeGroup = UWA.createElement('span', {
    			class: className + " badge badge-root"
    		});
    		UWA.createElement('span', {
    			class: "badge-content",
    			text: text
    		}).inject(badgeGroup);
    		UWA.createElement('span', {
    			class: "fonticon fonticon-lock"
    		}).inject(badgeGroup);
    		var divStatus = UWA.createElement('div', {
    			class: "StatusDiv"
    		});
    		badgeGroup.inject(divStatus);
    		divStatus.inject(infoSection);
    	}
    }
    }

    },
    };

    return extOfType;
  });

/**
 * Form to  create a Specialization type, Deployment extension, Specialization extension type
 * and Customer extension type
 */

define('DS/DMSApp/Views/AttrRangeTable',

  ['DS/UIKIT/Modal',
    'DS/UIKIT/Form',
    'DS/UIKIT/Input/Text',
    'DS/DMSApp/Utils/URLHandler',
    'UWA/Promise',
    'DS/WAFData/WAFData',
    'DS/UIKIT/Toggler',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Input/Toggle',
    'DS/UIKIT/Input/Number',
    'DS/UIKIT/Input/Button',
    'DS/UIKIT/Input/ButtonGroup',
    'DS/UIKIT/Input/Date',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/DMSApp/Views/Layouts/Widgets',
    'DS/UIKIT/Autocomplete',
    'DS/DMSApp/Models/AttributeModel',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS'
  ],
  function(Modal, Form, Text, URLHandler, Promise, WAFData, Toggler, Select, Toggle, Number, Button, ButtonGroup, DateInput, WebappsUtils, dicoHandler, DMSWidgets, Autocomplete, AttributeModel, myNls) {
    
    function mapnls(obj, fn) {
      var result= {};
      result['en'] = fn('en', obj['en'], myNls['englishNLS']);
      result['fr'] = fn('fr', obj['fr'], myNls['frenchNLS']);
      result['de'] = fn('de', obj['de'], myNls['germanNLS']);
      result['ja'] = fn('ja', obj['ja'], myNls['japaneseNLS']);
      result['ko'] = fn('ko', obj['ko'], myNls['koreanNLS']);
      result['ru'] = fn('ru', obj['ru'], myNls['russianNLS']);
      result['zh'] = fn('zh', obj['zh'], myNls['chineseNLS']);
      return UWA.merge(result, obj);
    }
    
    function AttrRangeTable(opts) {
      if (!(this instanceof AttrRangeTable)) {
        throw new TypeError("AttrRangeTable constructor cannot be called as a function.");
      }
      var self = this;
      this.options = UWA.extend({
        onShow: function() {},
        onHide: function() {},
        onSave: function(values) { return true; },
        onError: function(errors) {}
      }, opts)
      this.nlsRange = opts.nlsRange || {};
      this.editMode = opts.editMode;
      
      this._rangeInit = opts.rangeList.map(function(item) {
        return mapnls({value:item},lang=>(self.nlsRange[item] || {})[lang] || "")
      });
      this._rangeEdit = this._rangeInit.map(function(item) {
        return mapnls(item, self.getNLSInput);
      });
    }
    AttrRangeTable.prototype = {
      constructor: AttrRangeTable,
      getNLSRange: function() {
        var result = this._rangeEdit.reduce(function(result, rangeValue) {
          result[rangeValue.value] = mapnls(rangeValue, (lang, rangeNlsInput)=>rangeNlsInput.value);
          return result; 
        }, {});
        return result;
      },
      getNLSInput: function(lang, value, nlslang) {
        return UWA.createElement('input', {
            'type': "text",
            'class': 'form-control',
            'value': value,
            'data-init': value
        });
      },
      getTableDataElement: function(opts) {
        var td = UWA.createElement('td', {
          'colspan': '1',
          'align': 'left',
          width: opts.width,
        });
        return td;
      },
      getTableHeaderElement: function(opts) {
        var p = UWA.createElement('p', {
          text: opts.headerName,
          'class': ''
        });

        var th = UWA.createElement('th', {
          'colspan': '1',
          'align': 'left',
          'width': opts.width,
          'white-space': 'nowrap',
          'overflow': 'hidden',
          id: opts.headerId
        });
        p.inject(th);
        return th;
      },
      
      getTable: function(myContent, editMode) {
          var self = this;
          var tableWrapper = UWA.createElement('div', {
            'class': "tableDiv"
          }).inject(myContent);
          tableWrapper.setStyle('height', '300px');
          tableWrapper.setStyle('overflow-x', 'auto');

          var table = UWA.createElement('table', {
            'class': 'table', //'tableImportExport',
            'id': 'attrTable'
          }).inject(tableWrapper);
          table.setStyle('max-width', 'unset');
          table.setStyle('table-layout', 'fixed');

          var thead = UWA.createElement('thead', {
            'class': 'attrthead',
            'id': 'attrthead'
          }).inject(table);
          
          var firstLine = UWA.createElement('tr').inject(thead);
          firstLine.setStyle('background', 'whitesmoke');
          firstLine.setStyle('position', 'sticky');
          firstLine.setStyle('top', '0');

          var rangeHeader = this.getTableHeaderElement({
            headerName: myNls['attrRangeTableHeader'],
            width: "250px",
            headerId: "nameColumn"
          }).inject(firstLine);
          
          var thElements = mapnls({}, function(lang, useless, langnls) {
            return self.getTableHeaderElement({
              headerName: langnls,
              width: "250px",
              headerId: "Trans" + lang.toUpperCase()
            }).inject(firstLine);
          })

          var tbody = UWA.createElement('tbody', {
            'class': 'attrtbody',
            'id': 'attrtbody'
          }).inject(table);
          
          var searchIconTag = rangeHeader.getElementsByTagName("p")[0];
          searchIconTag.setStyle("cursor", "pointer");
          
          var searchIcon = UWA.createElement('a', {
            'class': "fonticon fonticon-search"
          })
          searchIcon.inject(searchIconTag);
          searchIcon.setStyle("text-decoration", "none");
          searchIcon.setStyle("padding-left", "5px");
          
          var searchInput = new Text({});
          searchInput.inject(rangeHeader);
          searchInput.elements.input.setStyle("display", "none");
          
          var trElements = [];
          searchIcon.onclick = function() {
            searchInput.elements.input.setStyle("display", "inline-block");
          };
          searchInput.elements.input.onkeyup = function() {
            trElements.forEach(filterRow)
          };
          
          function filterRow(trElement) {
            var filter = searchInput.getValue().toUpperCase();
            var td = trElement.getElementsByTagName("td")[0];
            if(td && td.firstChild.value.toUpperCase().startsWith(filter)) {
              trElement.style.display = "";
            } else {
              trElement.style.display = "none";
            }
          }
          return function (rangeEdit) {
            trElements.forEach(tr=>tr.destroy());
            return trElements = rangeEdit.map(function(range, i) {
              var trElement = UWA.createElement('tr').inject(tbody);
              var input = new Text({
                'id': "range_" + i,
                'value': range.value
              }).inject(self.getTableDataElement({
                'width': "250px"
              }).inject(trElement));
              input.setDisabled(true);
              
              mapnls(range, function(lang, nlsInput) {
                nlsInput.id = 'NLSValue_' + lang + '_' + i;
                nlsInput.disabled = !editMode;
                nlsInput.inject(self.getTableDataElement({
                  width: "250px"
                }).inject(trElement));
              })
              filterRow(trElement);
              return trElement;
            });
          }
      },
      
      getTextRange: function(options) {
        var textRange = new Text({ id: "rangeInput" });
        textRange.elements.input.setStyle("margin-bottom", "10px");
        textRange.CustomValidate = function() {
          let toRet = true;
          if (options.attrType == "String") {
            let curInputValue = this.getValue();
            let words = curInputValue.split(";");
            words.forEach((item, i) => {
              item = item.trim();
              var regex = new RegExp("^[a-zA-Z0-9]+$");
              if (item.length > 0 && !regex.test(item)) {
                toRet = false;
              }
            });
          } else if (options.attrType == "Integer") {
            let curInputValue = this.getValue();
            let words = curInputValue.split(";");
            words.forEach((item, i) => {
              item = item.trim();
              var regex = new RegExp('^[-+]?[0-9]+$');
              if (item.length > 0 && !regex.test(item)) {
                toRet = false;
              }
            });
          }
          if (!toRet) {
            this.elements.input.setStyle('border-color', "#EA4F37");
          } else {
            this.elements.input.style.borderColor = null;
          }
          return toRet;
        };

        textRange.onChange = function() {
          var errors = [];
          var value = options.onChange(this.getValue(), errors);
          var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);
          this.setValue(value);
          this.elements.input.style.borderColor = fixed ? null : "#EA4F37";
        };
        return textRange;
        
      },
      //Modal for the Type form and Extension form
      formModal: function(options) {
        var self = this;
        //tag div element
        var headerDiv = UWA.createElement('div', {
          'class': 'global-div'
        });
          
        //tag nav element
        var tabPanel = UWA.createElement('nav', {
          'class': 'tab tab-pills',
          'id': 'the-forms'
        }).inject(headerDiv);
        
        //title for the Modal
        var heading = UWA.createElement('h4', {
          'text': myNls['attrRangeTableTitle'],
        }).inject(headerDiv);
          
        var myModal = new Modal({
          className: 'fancy',
          visible: true,
          closable: true,
          header: headerDiv,
          body: options.form,
          footer: "<button type='button' id='SaveButton' class='btn btn-primary'>" + UWA.String.escapeHTML(myNls['attrRangeTableClose']) + "</button>" +
            "<button type='button' id='CancelBtn' class='btn btn-default'>" + UWA.String.escapeHTML(myNls['attrRangeTableCancel']) + "</button> ",
          renderTo: options.container,

          events: {
            onHide: function() {
              UWA.log("the Modal Closed");
              myModal.destroy();
              options.onHide();
            },
            onShow: function() {
              options.onShow();
              UWA.log("the Modal shown");
            }
          }
        });

        if (!options.editMode) {
          myModal.getFooter().getElement('#SaveButton').hidden = true;
          myModal.getFooter().getElement('#CancelBtn').hidden = true;
        }
        myModal.getFooter().getElement('#SaveButton').addEvent('click', function() {
          if(options.onSave()) {
            myModal.hide();
          }
        });
        myModal.getFooter().getElement('#CancelBtn').addEvent('click', function() {
          if(options.onCancel()) {
            myModal.hide();
          }
        });

        myModal.elements.wrapper.setStyle('width', '800px');
        return myModal;
      },
      updateRangeList: function(words) {
        var self = this;
        this._rangeEdit = words.map(function(word) {
          var init = self._rangeInit.find(e=>e.value==word) || mapnls({ value:word },lang=>"");
          return     self._rangeEdit.find(e=>e.value==word) || mapnls(init, self.getNLSInput);
        });
      },
      launchPanel: function(_options) {
        let self = this;
        let editMode = _options.editMode || this.editMode;
        let attrName = _options.attrName || this.options.attrName;
        UWA.log("add_type action");

        var myContent = UWA.createElement('div', {
          'id': "myContent",
        });
        var tabNav = UWA.createElement('div', {
          'id': "got-tab-sample",
          'class': "tab"
        }); //.inject(myContent);
        tabNav.setStyle("justify-content", "center");
        tabNav.inject(myContent);
        
        if(attrName) {
          var h4 = UWA.createElement('h4');
          h4.inject(tabNav);
          
          var span = UWA.createElement('span', {
            'class': "badge font-3dsregular badge-default",
            'text': attrName
          });
          span.setStyle("padding-left", "50px");
          span.setStyle("padding-right", "50px");
          span.setStyle("padding-top", "5px");
          span.setStyle("padding-bottom", "5px");
          span.inject(h4);
        }
        
        var initRange = this._rangeInit.map(item=>item.value).join(";");
        function alterRange(value, errors) {
          var words = AttributeModel.checkRange(self.options.attrType, initRange, value, errors);
          var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);
          if(fixed) { // No error or error were fixed
            self.updateRangeList(words);
            tableUpdater(self._rangeEdit);
          }
          
          if (errors.length) {
            DMSWidgets.createAlertBox(errors).inject(myModal.elements.header);
            self.options.onError(errors);
          }
          return words.join(";");
        }

        var textRange = this.getTextRange({
          attrType: this.options.attrType, 
          onError: this.options.onError,
          onChange: alterRange
        });
        var tableUpdater = this.getTable(myContent, editMode);

        var myModal = this.formModal({
          form: myContent,
          editMode: editMode,
          container: this.options.container, 
          onShow: this.options.onShow,
          onHide: this.options.onHide,
          onSave: function() {
            var errors = []
            var value = alterRange(textRange.getValue(), errors);
            var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);

            if (fixed && textRange.CustomValidate() && self.options.onSave(value)) {
              textRange.setValue(value);
              return true;
            } else {
              return false;
            }
          },
          onCancel: function() {
            // Restore default values!
            self._rangeEdit.forEach(function(tagInputs) {
              mapnls(tagInputs, function(lang, tagInput) {
                tagInput.value = tagInput.dataset.init;
                return tagInput;
              });
            });
            textRange.setValue(editRange);
            self.updateRangeList(initRange.split(";"));
            tableUpdater(self._rangeEdit);
            return true;
          }
        });

        var editRange = alterRange(this._rangeEdit.map(e=>e.value).join(";"), []);
        textRange.parent = myModal;
        textRange.setDisabled(!editMode);
        textRange.inject(tabNav);
        textRange.setValue(editRange);
        tableUpdater(this._rangeEdit);
      },
      enable: function() {
        this.editMode = true;
      },
      disable: function() {
        this.editMode = false;
      },

    };
    return AttrRangeTable;
  });

define('DS/DMSApp/Views/AttrDisplayView',
  [
    'UWA/Core',
    'UWA/Promise',
    'UWA/Class/View',
    'DS/UIKIT/Modal',
    'DS/UIKIT/Scroller',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Input/Toggle',
    'DS/DMSApp/Utils/URLHandler',
    'DS/UIKIT/Autocomplete',
    'DS/DMSApp/Views/Layouts/CustomField',
    'DS/UIKIT/Input/Button',
    'DS/DMSApp/Views/Layouts/Widgets',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/DMSApp/Views/AttrRangeTable',
    'DS/DMSApp/Models/AttributeModel',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
    'DS/WAFData/WAFData'
  ],
  function(UWA, Promise, View, Modal, Scroller, Select, Toggle, URLHandler, Autocomplete, CustomField /*, ImmersiveFrame, Panel*/ , Button, DMSWidgets, dicoHandler, AttrRangeTable, AttributeModel, myNls, WAFData) {

    'use strict';
    /*
    This class generates all the views in the process View. In other words, it's the "leader" view.
    */
    return View.extend({
      tagName: 'div',
      className: 'AttributesView',

      init: function( /*frame*/ options) {
        UWA.log("attributesLayout::init");
        /*this.immersiveFrame = frame;*/

        //An ImmersiveFrame object is Mandatory to use Panels. We add these to the immersive Frame.
        //this.immersiveFrame = new ImmersiveFrame();
        //S63 On met le pSkeleton dans une variable locale pour pouvoir la setter dans le context d'ODT
        if(typeof pSkeleton !== 'undefined')
          this.pSkeleton = pSkeleton;
        this.modal = null;
        this.editor = null;
        this.persistJSONObject = null;
        this.content = null;
        this.field = [];
        this.fieldNew = [];
        this.fieldNew.NLSField = [];
        this.saveBtn = null;
        options = UWA.clone(options || {}, false);
        this._parent(options);
        /*
          J'ajoute ce event pour gérer la largeur des noms de chaque champs.
        */
        this.addEvent("onPostInject", function(tt) {
          var maxWidth = 0;
          tt.getElements("span.fieldHeader").forEach(function(item) {
            var tmpWidth = item.getSize().width;
            if (tmpWidth > maxWidth) {
              maxWidth = tmpWidth;
            }
          });
          tt.getElements("span.fieldHeader").forEach(function(item) {
            var tmpWidth = item.setStyle("min-width", maxWidth);
            item.setStyle("background-color", "#f4f5f6");
            //item.setStyle("font-weight","bold");
          });
        });
      },

      setup: function(options) {
        UWA.log("attributesLayout::setup");
        var that = this;
        UWA.log(that);
      },
      /*
      Render is the core method of a view, in order to populate its root container element, with the appropriate HTML.
      The convention is for render to always return this.
      */
      getNameField: function(value) {
        return new CustomField("name", 'input', myNls.get('AttrEditNameFieldLabel'), value, value, false).buildField().disable(true);
      },
      getTypeField: function(value) {
        return new CustomField("type", 'input', myNls.get('AttrEditTypeFieldLabel'), value, value, false).buildField().disable(true);
      },
      getDefaultValueForRangeDefined: function(_attrType, _rangeList, defaultValueLabel, value, editable) {
        let autocomplete = new CustomField("Default", 'autocomplete', defaultValueLabel, value, value, editable).buildField().disable(true);
        let searchDico = {};
        searchDico.name = "Types";
        searchDico.items = [];

        if (_attrType == "Integer") {
          _rangeList.sort(function(a, b) {
            return a - b;
          });
        } else {
          // the function sort(), sort automatically in alphabetic order.
          // This works well with String type.
          _rangeList.sort();
          _rangeList=_rangeList.map(tmp=>tmp.trim())
          _rangeList=_rangeList.filter(tmp=>tmp.length>0);
        }
        _rangeList.forEach(function(item) {
            searchDico.items.push({
              value: item.toString(),
              selected: value == item.toString()
            });
        });
        autocomplete.fieldInput.addDataset(searchDico);
        autocomplete.fieldInput.elements.input.onchange = function() {
          // BMN2 15/01/2021 : IR-815936-3DEXPERIENCER2021x
          let ac = autocomplete.fieldInput;
          const curVal = this.value;
          let corresItem = ac.getItems().filter(item => item.label === curVal);
          if (corresItem.length > 0) {
            ac.onSelect(corresItem[0]);
            return;
          } else {
            ac.reset();
            let defaultItem = ac.getItems().filter(item => item.label === value);
            if (defaultItem.length == 1) {
              ac.onSelect(defaultItem[0]);
            }
          }
          /*  if (autocomplete.fieldInput.selectedItems == 0 || autocomplete.fieldInput.selectedItems[0].label != this.value) {
              autocomplete.fieldInput.reset();
              var selectedItem = autocomplete.fieldInput.getItems().filter(val => val.value == value);
              if (selectedItem.length == 1) {
                autocomplete.fieldInput.onSelect(selectedItem[0]);
              }
            }*/
        };
        return autocomplete;
      },
      getDefaultValueField: function(attrType, value, editable, rangesValues, maxLength) {
        let input = "";
        const defaultValueLabel = myNls.get('AttrEditDefaultValueFieldLabel');
        let words = [];
        if (rangesValues != undefined) {
          words = rangesValues;
        }
        if (words.length > 0) {
          input = this.getDefaultValueForRangeDefined(attrType, words, defaultValueLabel, value, editable);
        } else if (attrType == "Date") {
          input = new CustomField("Default", 'date', defaultValueLabel, value, value, editable).buildField().disable(true);
        } else if (attrType == "Integer") {
          input = new CustomField("Default", 'input', defaultValueLabel, value, value, editable).buildField().disable(true);
          input.fieldInput.elements.input.oninput = function() {
            var regexInt = new RegExp('^[-+]?\\d+$');
            if (this.value.length > 1 && !regexInt.test(this.value)) {
              this.value = "";
            } else if (this.value.length == 1 && this.value != "-" && this.value != "+" && isNaN(this.value)) {
              this.value = "";
            }
          };
          input.fieldInput.elements.input.onchange = function() {
            if (this.value.length > 0)
              this.value = parseInt(this.value);
          };
        } else if (attrType == "Double") {
          input = new CustomField("Default", 'input', defaultValueLabel, value, value, editable).buildField().disable(true);
          input.fieldInput.elements.input.oninput = function() {
            var regexDouble = new RegExp('^[-+]?\\d+(\\.)?(\\d{1,6})?$');
            if (this.value.length > 1 && !regexDouble.test(this.value)) {
              //this.value = this.value.substring(0, this.value.indexOf('.') + 7);
              var reg = new RegExp('^[-+]?\\d+(\\.)?(\\d{1,6})?');
              var res = this.value.match(reg);
              if (res != null) {
                this.value = res[0];
              } else {
                this.value = "";
              }

            } else if (this.value.length == 1 && this.value != "-" && this.value != "+" && isNaN(this.value)) {
              this.value = "";
            }
          };
          input.fieldInput.elements.input.onchange = function() {
            if (this.value.length > 0)
              this.value = parseFloat(this.value);
          };
        } else if (attrType == "Boolean") {
          var selectedValue = "";
          if (value != undefined) {
            selectedValue = value;
          }
          var options = [{
            value: "true",
            label: myNls.get("createAttrFieldTrueLabel"),
            selected: (selectedValue.toLocaleLowerCase() == "true") ? true : false,
          }, {
            value: "false",
            label: myNls.get("createAttrFieldFalseLabel"),
            selected: (selectedValue.toLocaleLowerCase() == "false") ? true : false,
          }];

          input = new CustomField("Default", 'select', defaultValueLabel, options, options, editable, {
            placeholder: ""
          }).buildField().disable(true);
        } else if (attrType == "String") {
          input = new CustomField("Default", 'input', defaultValueLabel, value, value, editable).buildField().disable(true);
          if (maxLength != undefined && maxLength > 0)
            input.fieldInput.maxLength = maxLength;
        } else {
          input = new CustomField("Default", 'input', defaultValueLabel, value, value, editable).buildField().disable(true);
        }
        return input;
      },
      getAuthorizedValueField: function(attrName, attrType, range, editable, defaultValueUpdater) {
        var view = this;
        var errors = [];
        var words = AttributeModel.checkRange(attrType, range, range, errors);
        var input = new CustomField("AuthorizedValues", 'input', myNls.get('AttrEditAuthorizedValuesFieldLabel'), range, range, editable).buildField().disable(true);
        var inputGroup = input.fieldDiv.getElementsByClassName("input-group")[0];
        
        input.rangePopup = UWA.createElement("span", {
          class: "input-group-addon fonticon fonticon-language"
        });
        input.rangePopup.inject(inputGroup);
        
        input.rangeTable = this.authorizedValueTable = new AttrRangeTable({
          rangeList: range.split(';'),
          attrName: attrName,
          attrType: attrType,
          container: pSkeleton.container,
          editMode: false,
          nlsRange: this.model.get('rangeNls') || {},
          onSave: function(value) {
            input.fieldInput.setValue(value);
            input.fieldInput.dispatchEvent("onChange"); // Dispatch event will invoke updateRangeList!!
            return true;
          }
        });
        input.rangePopup.onclick = function() {
          var errors = [];
          var words = AttributeModel.checkRange(attrType, range, input.getValue(), errors);
          var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);
          if(fixed) {
            input.rangeTable.updateRangeList(words);
            input.rangeTable.launchPanel({attrName: attrName});
          }
        }
        
        input.fieldInput.addEvent("lengthChange", function(event) {
          var curVal = this.getValue();
          var words = [];
          if (curVal != "") {
            words = curVal.split(';');
          }
          var error = false;
          words.forEach(function(item) {
            if (item.length > parseInt(event.detail.length)) {
              error = true;
            }
          });
          if (error)
            this.setStyle('border-color', "#EA4F37");
        });
        input.fieldInput.elements.input.oninput = function() {
          if (attrType == "Integer" && !/^[-+\d;]+$/.test(this.value)) {
            this.value = this.value.replaceAll(/[^-+\d;]+/ig, '').replaceAll(/;+/ig, ';')
          }
        };
        input.fieldInput.onChange = function() {
          var errors = [];
          var words = AttributeModel.checkRange(attrType, range, this.getValue(), errors);
          var fixed = errors.reduce((fixed,error)=>fixed && error.fixed, true);
          
          this.setValue(words.join(";"));
          if(fixed) { // No error or error were fixed
            this.elements.input.style.borderColor = null;
            input.rangePopup.style.opacity = "1"
          } else {
            this.elements.input.style.borderColor = "#EA4F37";
            input.rangePopup.style.opacity = "0.3"
          }
          
          if (errors.length) {
            DMSWidgets.createAlertBox(errors).inject(pSkeleton.getActiveIdCard().container);
          } else {
            defaultValueUpdater(words); 
          }
        };
        input.fieldInput.CustomValidate = function() {
          let toRet = true;
          if (attrType == "String") {
            let curInputValue = this.getValue();
            let words = curInputValue.split(";");
            words.forEach((item, i) => {
              item = item.trim();
              var regex = new RegExp("^[a-zA-Z0-9]+$");
              if (item.length > 0 && !regex.test(item)) {
                toRet = false;
              }
            });

          } else if (attrType == "Integer") {
            let curInputValue = this.getValue();
            let words = curInputValue.split(";");
            words.forEach((item, i) => {
              item = item.trim();
              var regex = new RegExp('^[-+]?[0-9]+$');
              if (item.length > 0 && !regex.test(item)) {
                toRet = false;
              }
            });
          }
          if (!toRet) {
            this.elements.input.setStyle('border-color', "#EA4F37");
          } else {
            this.elements.input.style.borderColor = null;
          }
          return toRet;
        }
        return input;
      },
      render: function() {
        UWA.log("attributesLayout::render");
        UWA.log(this);
        // Important: to initliaze these variable there because when we modify then
        // attribute we recall render() function.
        this.fieldNew = [];
        this.fieldNew.NLSField = [];
        const attrType = this.model.getType();
        const attrName = this.model.get('title');
        const attrTypeNLS = this.model._attributes.subtitle;
        const curDmsStatus = this.model.getDMSStatus();
        var parentDiv = UWA.createElement('div', {
          'id': 'container-scroll'
        });
        parentDiv.setStyle("height", "100%");
        parentDiv.setStyle("width", "100%");
        var divToScroll = UWA.createElement('div', {
          'id': 'to-scroll',
          //'class': 'container-fluid'
        });
        divToScroll.setStyle("height", "100%");
        divToScroll.setStyle("width", "100%");
        var div = UWA.createElement('div', {
          'id': 'Attr-div-display',
          'class': 'container-fluid'
        });

        this.content = parentDiv;

        var divRow = UWA.createElement('div', {
          'class': 'row'
        });
        // Name Field:
        var nameField = this.getNameField(attrName);
        this.fieldNew.push(nameField);
        nameField.fieldDiv.inject(divRow);
        var typeField = this.getTypeField(attrTypeNLS);
        this.fieldNew.push(typeField);
        typeField.fieldDiv.inject(divRow);
        divRow.setStyle('margin-top', '15');
        divRow.setStyle('margin-bottom', '15');
        divRow.inject(div);
        var divRowLengthPredicate = UWA.createElement('div', {
          'class': 'row'
        });
        var predicateValue = this.model.get("predicate");
        if (predicateValue == undefined) {
          predicateValue = "";
        }
        var searchDico = {};
        searchDico.items = [];
        dicoHandler.getPredicatesBasedOnType(attrType).forEach(function(item) {
          searchDico.items.push({
            value: item.curi,
            label: item.label,
            selected: predicateValue == item.curi
          });
        });
        var selectedPredicate = searchDico.items.filter(item => item.selected == true);
        var predicateDisplayValue = "";
        if (selectedPredicate.length > 0) {
          predicateDisplayValue = selectedPredicate[0].label;
        }
        let predicateFieldEditable = true;
        if (!pSkeleton.isAuthoring || curDmsStatus == "DMSExported" || curDmsStatus == "DEV" || curDmsStatus == "PROD") {
          predicateFieldEditable = false;
        }
        var predicate = new CustomField("SixWPredicate", 'autocomplete', myNls.get('AttrEditPredicateFieldLabel'), predicateValue, predicateDisplayValue, predicateFieldEditable).buildField().disable(true);


        predicate.fieldInput.addDataset(searchDico);
        this.fieldNew.push(predicate);
        predicate.fieldDiv.inject(divRowLengthPredicate);

        divRowLengthPredicate.setStyle('margin-top', '15');
        divRowLengthPredicate.setStyle('margin-bottom', '15');
        divRowLengthPredicate.inject(div);

        if (this.model.getType().contains("Double")) {
          if (this.model.get('dimension') != undefined) {
            var divRow2 = UWA.createElement('div', {
              'class': 'row'
            });
            var dimensionValue = this.model.get('dimension');
            var dimObjArray = pSkeleton.attrDimenions.filter(obj => {
              return obj.Name == dimensionValue
            });
            var dimensionNls = dimensionValue;
            var unitArray = [];
            if (dimObjArray.length > 0) {
              dimensionNls = dimObjArray[0].NLS;
              unitArray = dimObjArray[0].Units;
            }

            var dimensionField = new CustomField("Dimension", 'input', "Dimension", dimensionValue, dimensionNls, false).buildField().disable(true);
            this.fieldNew.push(dimensionField);
            dimensionField.fieldDiv.inject(divRow2);
            var prefUnitValue = this.model.get('manipulationUnit');
            if (prefUnitValue == undefined) {
              prefUnitValue = "";
            }
            var prefUnitNls = prefUnitValue;
            var searchDico = {};
            searchDico.items = [];
            unitArray.forEach((item, i) => {
              if (prefUnitValue == item.Name) {
                prefUnitNls = item.NLSName;
              }
              searchDico.items.push({
                value: item.Name,
                label: item.NLSName,
                selected: prefUnitValue == item.Name
              });
            });


            let manipUnitEditable = true;
            if (!pSkeleton.isAuthoring || curDmsStatus == "DMSExported" || curDmsStatus == "DEV" || curDmsStatus == "PROD") {
              manipUnitEditable = false;
            }
            var manipUnitField = new CustomField("ManipulationUnit", 'autocomplete', "Manipulation Unit", prefUnitValue, prefUnitNls, manipUnitEditable).buildField().disable(true);
            this.fieldNew.push(manipUnitField);
            manipUnitField.fieldDiv.inject(divRow2);
            manipUnitField.fieldInput.addDataset(searchDico);
            divRow2.setStyle('margin-top', '15');
            divRow2.setStyle('margin-bottom', '15');
            divRow2.inject(div);
          }
        }
        var divRow3 = UWA.createElement('div', {
          'class': 'row'
        });
        if (this.model.isString()) {

          var attrMaxLength = this.model.getMaxLength();
          var lengthLabel = myNls.get('AttrEditLengthFieldLabel');
          if (attrMaxLength > 0) {
            let maxLengthEditable = true;
            if (!pSkeleton.isAuthoring) {
              maxLengthEditable = false;
            }
            var attrLength = new CustomField("MaxLength", 'integer', lengthLabel, this.model.getMaxLength(), this.model.getMaxLength(), maxLengthEditable).buildField().disable(true);
            attrLength.fieldInput.setValue(attrMaxLength);
            attrLength.fieldInput.options.min = attrMaxLength;
            attrLength.fieldInput.onChange = function() {
              var currentValue = this.getValue();
              if (currentValue.length >= 0) {
                currentValue = parseInt(currentValue);
                if (this.getValue() != currentValue)
                  this.setValue(currentValue);
                if (currentValue <= this.options.min) {
                  this.setValue(this.options.min);
                } else if (currentValue > this.options.max) {
                  this.setValue(this.options.max);
                }

                if (defaultValue != undefined) {

                  if (currentValue != 0 && currentValue >= attrMaxLength) {
                    defaultValue.fieldInput.maxLength = currentValue;
                    defaultValue.fieldInput.dispatchEvent("lengthChange", {
                      detail: {
                        length: currentValue
                      }
                    });


                  }
                }
                if (authorizedValue != undefined) {
                  authorizedValue.fieldInput.dispatchEvent("lengthChange", {
                    detail: {
                      length: currentValue
                    }
                  });
                }
              }
            };
          } else {
            var infiniteStr = myNls.get('AttrEditLengthInfiniteValue');
            var attrLength = new CustomField("length", 'input', lengthLabel, infiniteStr, infiniteStr, false).buildField().disable(true);
          }

          this.fieldNew.push(attrLength);

          attrLength.fieldDiv.inject(divRowLengthPredicate);

        }
        let defaultValEditable = true;
        if (!pSkeleton.isAuthoring || !this.model.hasDefault()) {
          defaultValEditable = false;
        }
        var defaultValue = this.getDefaultValueField(this.model.getType(), this.model.getDefaultValue(), defaultValEditable, this.model.getRange(), this.model.getMaxLength());
        this.fieldNew.push(defaultValue);
        if (this.model.isInt() || this.model.isString()) {
          defaultValue.fieldDiv.inject(divRow3);
        } else {
          defaultValue.fieldDiv.inject(divRowLengthPredicate);
        }
        defaultValue.checkBeforeEnable = function() {
          var toRet = true;
          if (multiValue.fieldInput.isChecked()||(hasDefault!==undefined&&!hasDefault.fieldInput.isChecked())) {
            toRet = false;
          }
          return toRet;
        };
        defaultValue.fieldInput.addEvent("lengthChange", function(event) {
          console.log(event.detail.length);
        });


        // Check if we have some authorized values before calling the method Array.join()
        if (this.model.isInt() || this.model.isString()) {
          var range = this.model.getRange() || [];

          let authorizedValueFieldEditable = true;
          if (!pSkeleton.isAuthoring) {
            authorizedValueFieldEditable = false;
          }
          // We allow to add a first authorized value in "Without locker" codition
          if (range.length == 0 && (curDmsStatus == "DMSExported" || curDmsStatus == "DEV" || curDmsStatus == "PROD")) {
            authorizedValueFieldEditable = false;
          }
          var view = this;
          var authorizedValue = this.getAuthorizedValueField(attrName, attrType, range.join(";"), authorizedValueFieldEditable, function(words) {
            var parent = defaultValue.fieldDiv;
            defaultValue.disableField.remove();
            defaultValue.fieldInput.remove();

            if (words.length > 0) {
              var oldDefaultValueContent = defaultValue.value
              var newDefaultValueContent = words.indexOf(oldDefaultValueContent)>=0 ? oldDefaultValueContent : words[0] 
              var newDefaultValue = view.getDefaultValueField(attrType, newDefaultValueContent, true, words, "");
              defaultValue.fieldInput = newDefaultValue.fieldInput;
              defaultValue.enableField = newDefaultValue.enableField;
              defaultValue.disableField = newDefaultValue.disableField;
              defaultValue.disableField.inject(parent.firstChild);
              defaultValue.fieldInput.inject(parent.firstChild);
              defaultValue.enable();
            } else {
              var tmpDefaultValue = view.getDefaultValueField(attrType, "", true);
              tmpDefaultValue.fieldInput.inject(parent.firstChild);
              defaultValue.fieldInput = tmpDefaultValue.fieldInput;
              defaultValue.enable();
            }
          });


          this.fieldNew.push(authorizedValue);
          this.authorizedValueField = authorizedValue;
          authorizedValue.fieldDiv.inject(divRow3);
        }
        divRow3.setStyle('margin-top', '15');
        divRow3.setStyle('margin-bottom', '15');
        divRow3.inject(div);

        var divVisib = UWA.createElement('div', {
          'class': 'row'
        }).inject(div);
        divVisib.setStyle('margin-top', '15');
        divVisib.setStyle('margin-bottom', '15');
        var userAccessvalue = this.model.getUserAccess();
        if (userAccessvalue != undefined) {
          var userAccessValues = [{
            value: "ReadWrite",
            label: myNls.get("createAttrFieldReadWriteLabel"),
            selected: (userAccessvalue.toLocaleLowerCase() == "readwrite") ? true : false,
          }, {
            value: "ReadOnly",
            label: myNls.get("createAttrFieldReadOnlyLabel"),
            selected: (userAccessvalue.toLocaleLowerCase() == "readonly") ? true : false,
          }];
          let userAccessFieldEditable = this.isUserAccessEditable();
          var userAccess = new CustomField("UIAccess", 'select', myNls.get('AttrEditUserAccessFieldLabel'), userAccessValues, userAccessValues, userAccessFieldEditable, {
            placeholder: false
          }).buildField().disable(true);

          this.fieldNew.push(userAccess);
          userAccess.fieldDiv.inject(divVisib);
        }
        var divRow4 = UWA.createElement('div', {
          'class': 'row'
        });
        var multiValue = new CustomField("MultiValuated", 'switch', myNls.get('AttrEditMultiValueFieldLabel'), this.model.isMultiValuated(), this.model.isMultiValuated(), false).buildField().disable(true);
        this.fieldNew.push(multiValue);
        multiValue.fieldDiv.inject(divRow4);
        multiValue.fieldInput.onChange = function() {

        };


        if (attrType == "String") {
          let multiLineEditable = true;
          let multiLineValue = this.model.isMultiLine();
          if (multiLineValue || !pSkeleton.isAuthoring || curDmsStatus == "DMSExported" || curDmsStatus == "DEV" || curDmsStatus == "PROD") {
            multiLineEditable = false;
          }
          var mutliLine = new CustomField("MultiLine", 'switch', myNls.get('AttrEditMultiLineFieldLabel'), multiLineValue, multiLineValue, multiLineEditable).buildField().disable(true);
          this.fieldNew.push(mutliLine);
          mutliLine.fieldDiv.inject(divRow4);
        }
        divRow4.setStyle('margin-top', '15');
        divRow4.setStyle('margin-bottom', '15');
        divRow4.inject(div);





        var divVisib2 = UWA.createElement('div', {
          'class': 'row'
        }).inject(div);
        divVisib2.setStyle('margin-top', '15');
        divVisib2.setStyle('margin-bottom', '15');
        /*var switchList = ["Searchable", "Exportable"];
        switchList.forEach(function(item) {
          var col4 = UWA.createElement('div', {
            'class': 'col-lg-6'
          }).inject(divVisib2);
          new Toggle({
            type: 'switch',
            value: 'option1',
            label: item
          }).inject(col4);
        });*/
        let searchableFieldEditable = true;
        if (!pSkeleton.isAuthoring || curDmsStatus == "DMSExported" || curDmsStatus == "DEV" || curDmsStatus == "PROD") {
          searchableFieldEditable = false;
        }
        var searchable = new CustomField("Indexation", 'switch', myNls.get('AttrEditSearchableFieldLabel'), this.model.isSearchable(), this.model.isSearchable(), searchableFieldEditable).buildField().disable(true);
        this.fieldNew.push(searchable);
        searchable.fieldDiv.inject(divVisib2);
        let exportable3DXMLFieldEditable = true;
        if (!pSkeleton.isAuthoring || curDmsStatus == "DEV" || curDmsStatus == "PROD") {
          exportable3DXMLFieldEditable = false;
        }
        var exportable = new CustomField("V6Exportable", 'switch', myNls.get('AttrEditExportableFieldLabel'), this.model.isExportable(), this.model.isExportable(), exportable3DXMLFieldEditable).buildField().disable(true);
        this.fieldNew.push(exportable);
        exportable.fieldDiv.inject(divVisib2);
        var divBehavior = UWA.createElement('div', {
          'class': 'row'
        }).inject(div);
        divBehavior.setStyle('margin-top', '15');
        divBehavior.setStyle('margin-bottom', '15');
        let resetOnCloneFieldEditable = this.isResetOnCloneEditable();
        var resetWhenDup = new CustomField("ResetOnClone", 'switch', myNls.get('AttrEditResetWhenDupFieldLabel'), this.model.isResetOnClone(), this.model.isResetOnClone(), resetOnCloneFieldEditable).buildField().disable(true);
        this.fieldNew.push(resetWhenDup);
        resetWhenDup.fieldDiv.inject(divBehavior);
        let resetOnRevisionFieldEditable = this.isResetOnRevisionEditable();
        var resetWhenVers = new CustomField("ResetOnRevision", 'switch', myNls.get('AttrEditResetWhenVersFieldLabel'), this.model.isResetOnRevision(), this.model.isResetOnRevision(), resetOnRevisionFieldEditable).buildField().disable(true);
        this.fieldNew.push(resetWhenVers);
        resetWhenVers.fieldDiv.inject(divBehavior);
        
        /* S63 02/08/2022
        * FUN114519
        * Adding has default switch
        */
        let hasDefaultFieldEditable = true;
        if (!pSkeleton.isAuthoring || curDmsStatus === "DEV" || curDmsStatus === "PROD"|| !this.model.hasDefault()) {
            hasDefaultFieldEditable = false;
        }
        if(pSkeleton.hasDef){
          var hasDefault = new CustomField("HasDefault", 'switch', myNls.get('AttrEditHasDefaultFieldLabel'), this.model.hasDefault(), this.model.hasDefault(), hasDefaultFieldEditable).buildField().disable(true);
          this.fieldNew.push(hasDefault);
          hasDefault.fieldDiv.inject(divBehavior);
        //S63 If we need a double check but is an attribute is multivaluated, it can't be hasDefautl=true
        /*hasDefault.checkBeforeEnable = function() {
          var toRet = true;
          if (multiValue.fieldInput.isChecked()) {
            toRet = false;
          }
          return toRet;
        };*/
          hasDefault.fieldInput.onChange= function() {
              if (this.isChecked()) {
                  // Sometimes the default value is autocomplete field
                  // so we have to manage diffferently
                  /*if (defaultValue.fieldInput instanceof Autocomplete) {
                      defaultValue.fieldInput.resetInput();
                  } else {
                      defaultValue.fieldInput.setValue("");
                  }*/
                  defaultValue.enable();
                } else {
                  defaultValue.disable(false);
                }
          };
        }
        /* BMN2 10/20/2020
         * We don't want to expose this property now.
        var resetOnFork = new CustomField("ResetOnFork", 'switch', myNls.get('AttrEditResetOnForkFieldLabel'), this.model._attributes.resetOnFork == "Yes", this.model._attributes.resetOnFork == "Yes", true).buildField().disable(true);
        this.fieldNew.push(resetOnFork);
        resetOnFork.fieldDiv.inject(divBehavior);*/
        var englishNLSValue = this.model.getNlsEnglish();
        var frenchNLSValue = this.model.getNlsFrench();
        var germanNLSValue = this.model.getNlsDutch();
        var japanesseNLSValue = this.model.getNlsJapanesse();
        var koreanNLSValue = this.model.getNlsKorean();
        var russianNLSValue = this.model.getNlsRussian();
        var chineseNLSValue = this.model.getNlsChinesse();
        let labelFieldEditable = true;
        if (!pSkeleton.isAuthoring) {
          labelFieldEditable = false;
        }
        var englishNLS = new CustomField("en", 'input', myNls.get('englishNLS'), englishNLSValue, englishNLSValue, labelFieldEditable).buildField().disable(true);
        this.fieldNew.NLSField.push(englishNLS);
        englishNLS.fieldDiv.inject(div);

        var frenchNLS = new CustomField("fr", 'input', myNls.get('frenchNLS'), frenchNLSValue, frenchNLSValue, labelFieldEditable).buildField().disable(true);
        this.fieldNew.NLSField.push(frenchNLS);
        frenchNLS.fieldDiv.inject(div);

        var germanNLS = new CustomField("de", 'input', myNls.get('germanNLS'), germanNLSValue, germanNLSValue, labelFieldEditable).buildField().disable(true);
        this.fieldNew.NLSField.push(germanNLS);
        germanNLS.fieldDiv.inject(div);

        var japeneseNLS = new CustomField("ja", 'input', myNls.get('japeneseNLS'), japanesseNLSValue, japanesseNLSValue, labelFieldEditable).buildField().disable(true);
        this.fieldNew.NLSField.push(japeneseNLS);
        japeneseNLS.fieldDiv.inject(div);

        var koreanNLS = new CustomField("ko", 'input', myNls.get('koreanNLS'), koreanNLSValue, koreanNLSValue, labelFieldEditable).buildField().disable(true);
        this.fieldNew.NLSField.push(koreanNLS);
        koreanNLS.fieldDiv.inject(div);

        var russianNLS = new CustomField("ru", 'input', myNls.get('russianNLS'), russianNLSValue, russianNLSValue, labelFieldEditable).buildField().disable(true);
        this.fieldNew.NLSField.push(russianNLS);
        russianNLS.fieldDiv.inject(div);

        var chineseNLS = new CustomField("zh", 'input', myNls.get('chineseNLS'), chineseNLSValue, chineseNLSValue, labelFieldEditable).buildField().disable(true);
        this.fieldNew.NLSField.push(chineseNLS);
        chineseNLS.fieldDiv.inject(div);

        var divSave = UWA.createElement('div', {
          'class': 'row'
        }).inject(div);
        divSave.setStyle('margin-top', '25');
        divSave.setStyle('margin-bottom', '25');
        divSave.setStyle('margin-left', '25');
        divSave.setStyle('margin-right', '25');
        //divSave.setStyle('display','none');

        var col4 = UWA.createElement('div', {
          'class': 'col-lg-12'
        }).inject(divSave);
        //col4.setStyle('float', 'right');
        var mySavbutton = new Button({
          value: 'Save',
          className: 'primary'
        });
        mySavbutton.hide();
        mySavbutton.elements.input.setStyle('width', '100%');
        mySavbutton.elements.input.setStyle('font-size', 'x-large');
        mySavbutton.inject(col4);
        this.saveBtn = mySavbutton;
        mySavbutton.onClick = function() {
          var curPanelIndex = pSkeleton.getCurrentPanelIndex();
          var parent = pSkeleton.getModelAt(curPanelIndex - 1);
          var attr = pSkeleton.getModelAt(curPanelIndex);
          var view = pSkeleton.getViewAt(curPanelIndex);
          var checkValidFields = true;
          if (view.authorizedValueField != undefined && !view.authorizedValueField.fieldInput.CustomValidate()) {
            checkValidFields = false;
          }
          if (checkValidFields) {
            var attrModif = {};
            view.fieldNew.forEach(function(item) {
              if (item.canBeEnable && item.isChanged()) {
                var val = item.getValue();
                if (val === true || val === false) {
                  val = val ? "Yes" : "No";
                }
                if (Array.isArray(val) && val.length == 1) {
                  val = val[0];
                }
                
                /* S63 02/08/2022
                * FUN114519
                * in case of HasDefault we are sending result only if it's No
                */
                if(item.name === "HasDefault") {
                  if(val === "No")
                    attrModif[item.name] = val;
                } else {
                    attrModif[item.name] = val;
                    if (item.name == "AuthorizedValues") {
                      attrModif["HasRangeDefined"] = "Yes";
                      attrModif[item.name] = [];
                      var val = item.getValue();
                      var tmpRangeList = val.split(";");
                      tmpRangeList = tmpRangeList.map(string => string.trim());
                      tmpRangeList = tmpRangeList.filter(function(item) {
                          return item != ""
                      });
                      attrModif[item.name] = tmpRangeList;
                    }
                    // BMN2 29/01/2021 : IR-816263-3DEXPERIENCER2021x
                    // BMN2 06/09/2021 : IR-848975-3DEXPERIENCER2022x
                    if (item.name == "Default" && attr.isDate()) {
                      var date = item.fieldInput.getDate();
                      if (date != null && date != undefined) {
                            let formatedDate = new Date(date.toDateString() + " 10:00:00 GMT");
                            let timestampInSec = Math.floor(formatedDate.getTime() / 1000);
                            // the timestamp has to be in String before sending to the webservice.
                            attrModif[item.name] = timestampInSec.toString();
                      } else {
                            attrModif[item.name] = "";
                      }
                    }
                }
              }
            });
            var nlsObject = {};
            view.fieldNew.NLSField.forEach(function(item) {
              let val = item.getValue();
              if (val.length > 0) {
                nlsObject[item.name] = val;
              }
            });
            if (!UWA.equals(nlsObject, attr._attributes.nlsList)) {
              if (!attrModif.hasOwnProperty("NameNLS")) {
                attrModif["NameNLS"] = {};
              }
              attrModif["NameNLS"] = nlsObject;
            }
            if(view.authorizedValueTable) {
              var nlsRange = view.authorizedValueTable.getNLSRange();
              if (!UWA.equals(nlsRange, attr._attributes.rangeNls)) {
                // attrModif["rangeNls"] = nlsRange;
                attrModif["AuthorizedValuesNLS"] = nlsRange;
              }
            }
            var sizeModifAttrProp = Object.keys(attrModif).length;
            if (sizeModifAttrProp > 0) {
              var globalObjToSend = {
                "AggregatorPackage": parent.get("Package"),
                "AggregatorName": parent.id,
                "AggregateMode": attr.isLocal() ? "Local" : "Global",
                "AggregatorNature": parent.get("nature"),
                "Attributes": {}
              };
              var attrObject = dicoHandler.buildAttrForModif(parent.id, parent.get("nature"), attr.id, attrModif);
              globalObjToSend.Attributes[attrObject.Name] = attrObject;
              var myPath = URLHandler.getURL() + "/resources/dictionary/AttributeModify";
              WAFData.authenticatedRequest(
                myPath, {
                  timeout: 500000,
                  'method': 'POST',
                  'type': 'json',
                  'data': JSON.stringify(globalObjToSend),
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },

                  //'headers'   : {'SecurityContext': 'VPLMProjectLeader.MyCompany.3DS Private Collab Space' } ,
                  'onComplete': function(resp) {
                    mySavbutton.hide();
                    var curPanelIndex = pSkeleton.getCurrentPanelIndex();
                    pSkeleton.getViewAt(curPanelIndex).editModeOff();
                    pSkeleton.getCollectionAt(curPanelIndex - 1).reset();
                    var langCode = widget.lang;
                    if (langCode == "zh") {
                      langCode = "zh_CN";
                    }
                    pSkeleton.getCollectionAt(curPanelIndex - 1).fetch({
                      data: {
                        maxAge: 0,
                        lang: langCode
                      },
                      onComplete: function(collection, response, options) {
                        var newModel = collection.get(pSkeleton.getNodeAt(curPanelIndex).get("assignedModel"));
                        pSkeleton.getActiveIdCard().model = newModel;
                        pSkeleton.getActiveIdCard().render();
                        pSkeleton.getViewAt(curPanelIndex).model = newModel;
                        pSkeleton.getViewAt(curPanelIndex).render();

                      }
                    });

                  },
                  'onFailure': function(err, data, responseStatus) {
                    console.log("onFailure error:");
                    console.log(err);
                    console.log("onFailure response:");
                    console.log(responseStatus);
                    const resp = data;
                    let message = "";
                    if (resp && typeof resp === 'object') { // null = 'object'
                      if ('DictionaryException' in resp) {
                        const excep = resp.DictionaryException;
                        const {
                          Status,
                          Message
                        } = excep
                        message = Message;
                      } else {
                        message = myNls.webServiceError;
                      }
                    }
                    
                    DMSWidgets.createAlertBox(message).inject(pSkeleton.getActiveIdCard().container);
                  }
                }
              );
            } else {
              // BMN2 03/09/2021 : IR-835593-3DEXPERIENCER2022x
              DMSWidgets.createAlertBox({nls:'AttrEditErrMsgNoChangeClickOnSave'}).inject(pSkeleton.getActiveIdCard().container);
            }
          }
        };
        div.inject(divToScroll);
        new Scroller({
          element: divToScroll
        }).inject(parentDiv);
        //this.buildAttributesTableContent();
        this.container.setContent(this.content);

        //Render always return this, this allows to chain view methods.
        return this;
      },

      buildInputField: function(name, value) {
        var divCol = UWA.createElement('div', {
          'class': 'col-lg-6'
        });
        var divInputGroup = UWA.createElement('div', {
          'class': 'input-group'
        });
        var spanName = UWA.createElement('span', {
          'class': 'input-group-addon',
          text: name
        }).inject(divInputGroup);
        spanName.setStyle("font-weight", "bold");
        var inputName = UWA.createElement('input', {
          type: 'text',
          class: 'form-control',
          value: value
        }).inject(divInputGroup);
        inputName.disabled = true;
        this.field.push(inputName);
        divInputGroup.inject(divCol);
        return divCol;
      },

      /*
      Refresh function is called whenever the user do an action in the processEGraph View : creation, deletion, edition.
      This function re-display the eGraph with the according changes.
      It receives as Parameters, the type and action chosen from the left panel and the JSON containing the informations.
      */
      refresh: function(type, action, getJSON) {
        UWA.log("attributesLayout::refresh");
        this.persistJSONObject = getJSON;

        this.modal.hide();
        this.editor.hide();

        //We need to display again the center panel for refreshing
        this.displayCenterPanel(type, action, this.persistJSONObject);

      },
      destroy: function() {
        UWA.log("attributesLayout::destroy");

        this.stopListening();

        this._parent();
      },
      editModeOn: function() {

        this.saveBtn.show();
        UWA.log("On passe en mode edit");
        if(this.authorizedValueTable) {
          this.authorizedValueTable.enable();
        }
        this.fieldNew.forEach(function(item) {
          item.enable();
        });
        this.fieldNew.NLSField.forEach(function(item) {
          item.enable();
        });

        this.field.forEach(function(item) {
          item.disabled = false;
        });
      },
      editModeOff: function() {
        if(this.authorizedValueTable) {
          this.authorizedValueTable.disable();
        }
        this.fieldNew.forEach(function(item) {
          item.disable();
        });
        this.fieldNew.NLSField.forEach(function(item) {
          item.disable();
        });

      },
      isUserAccessEditable: function() {
        //IR-894001-3DEXPERIENCER2022x S63 userAccess available with orange locker
        if (!this.pSkeleton.isAuthoring || this.model.getDMSStatus() == "PROD") {
          return false;
        }
        return true;
      },
      isResetOnCloneEditable: function() {
        //IR-894001-3DEXPERIENCER2022x S63 resetOnClone available with orange locker
        if (!this.pSkeleton.isAuthoring || this.model.getDMSStatus() == "PROD") {
          return false;
        }
        return true;
      },
      isResetOnRevisionEditable: function() {
        //IR-894001-3DEXPERIENCER2022x S63 resetOnRevision available with orange locker
        if (!this.pSkeleton.isAuthoring || this.model.getDMSStatus() == "PROD") {
          return false;
        }
        return true;
      }
    });

  });

/**
 * Form to  create a Specialization type, Deployment extension, Specialization extension type
 * and Customer extension type
 */

define('DS/DMSApp/Views/CreateAttrTable',

  ['DS/UIKIT/Modal',
    'DS/UIKIT/Form',
    'DS/UIKIT/Input/Text',
    'DS/DMSApp/Utils/URLHandler',
    'UWA/Promise',
    'DS/WAFData/WAFData',
    'DS/UIKIT/Toggler',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Input/Toggle',
    'DS/UIKIT/Input/Number',
    'DS/UIKIT/Input/Button',
    'DS/UIKIT/Input/ButtonGroup',
    'DS/UIKIT/Input/Date',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/DMSApp/Views/Layouts/Widgets',
    'DS/UIKIT/Autocomplete',
    'DS/DMSApp/Views/AttrRangeTable',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS'
  ],
  function(Modal, Form, Text, URLHandler, Promise, WAFData, Toggler, Select, Toggle, Number, Button, ButtonGroup, DateInput, WebappsUtils, dicoHandler, DMSWidgets, Autocomplete, AttrRangeTable, myNls) {

    var _theModal, _theAction, _theContainer, headerDiv, _attrType, _theRangeModal, _collection, _attrOwner;
    var observer;
    var lines = [];

    var exports = {

      getTableDataElement: function(opts) {
        var td = new UWA.createElement('td', {
          'colspan': '1',
          'align': 'left',
          width: opts.width,
        });
        return td;
      },
      getHeaderElement: function(opts) {
        var p = UWA.createElement('p', {
          text: opts.headerName,
          'class': ''
        });

        var th = UWA.createElement('th', {
          'colspan': '1',
          'align': 'left',
          'width': opts.width,
          'white-space': 'nowrap',
          'overflow': 'hidden',
          id: opts.headerId
        });
        p.inject(th);
        return th;
      },
      AttrNameField: function(opts) {
        var input = new Text({
          id: opts.id,
          events: {
            onChange: function() {
              var curVal = this.getValue();
              if (curVal.length == 0) return true;
              var regex = RegExp('^[a-zA-Z][a-zA-Z0-9]+$');
              if (regex.test(curVal) && this.elements.input.style.borderColor != null) {
                this.elements.input.style.borderColor = null;
              } else {
                this.elements.input.setStyle('border-color', "#EA4F37");
                DMSWidgets.createAlertBox({nls: 'ErrCreateAttrNameIncorrect'}).inject(_theModal.elements.header);
              }
            }
          }
        });

        return input;
      },


      AttrPredicateField: function(opts, attrNature) {
        var predicateDiv = UWA.createElement('div', {
          'id': opts.id,
          'class': 'autoCompletePredicate',
          styles: {
            //'width': '100%',
            overflow: 'visible'
          }
        });


        var autoCompletePredicate = new Autocomplete({
          showSuggestsOnFocus: true,
          multiSelect: false,
          minLengthBeforeSearch: 0,
          datasets: [],
          placeholder: myNls.get("createAttrFieldPredicatePlaceholder"),
          events: {},
          style: {
            //'width': '100%',
            overflow: 'visible'
          },
          events: {
            onSelect: function(item) {
              var predicateInputHidden = document.getElementById(opts.id + "_inputHidden");
              if (predicateInputHidden == undefined) {
                var input = UWA.createElement("input", {
                  id: opts.id + "_inputHidden"
                });
                input.hidden = true;
                input.value = item.value;
                input.inject(predicateDiv)
              } else {
                predicateInputHidden.value = item.value;
              }
            }
          }
        }).inject(predicateDiv);
        var searchDico = {};
        searchDico.name = "Predicates";
        searchDico.items = [];
        dicoHandler.getPredicatesBasedOnType(attrNature).forEach(function(item) {
          searchDico.items.push({
            value: item.curi,
            label: item.label
          });
        });
        autoCompletePredicate.addDataset(searchDico);
        return autoCompletePredicate;
      },

      AttrLengthField: function(opts, lineNumber) {
        var num = new Number({
          placeholder: myNls.get("createAttrFieldLengthPlaceholder"),
          min: 0,
          max: 350,
          step: 1,
          value: 0,
          id: opts.id,
          events: {
            onChange: function() {
              var maxLength = this.getValue();
              if (maxLength > 0) {

                var defaultValueField = lines[lineNumber].defaultValue;
                if (defaultValueField.getValue().length > maxLength) {
                  defaultValueField.setValue("");
                }
                defaultValueField.elements.input.maxLength = maxLength;
              } else if (maxLength == 0 && lineNumber && lines && lines[lineNumber]) {
                var defaultValueField = lines[lineNumber].defaultValue;
                defaultValueField.elements.input.removeAttribute('maxLength');
              }

            }
          }
        });
        return num;
      },
      AttrDimensionValueField: function(opts, autoCompletePrefUnit) {
        var dimensionDiv = UWA.createElement('div', {
          'id': opts.id,
          'class': 'autoCompleteDim',
          styles: {
            //'width': '100%',
            overflow: 'visible'
          }
        });


        var autoCompleteDim = new Autocomplete({
          showSuggestsOnFocus: true,
          multiSelect: false,
          minLengthBeforeSearch: 0,
          datasets: [],
          placeholder: myNls.get("createAttrFieldDimensionPlaceholder"),
          events: {},
          style: {
            //'width': '100%',
            overflow: 'visible'
          },
          events: {
            onSelect: function(selectItem) {
              autoCompletePrefUnit.reset();
              var predUnit = [];
              Object.keys(pSkeleton.attrDimenions).forEach(function(item) {
                if (pSkeleton.attrDimenions[item]["Name"] == selectItem.value) {
                  predUnit = pSkeleton.attrDimenions[item]["Units"]
                }
              });
              var seachDico = [];
              predUnit.forEach((item) => {
                seachDico.push({
                  value: item.Name,
                  label: item.NLSName
                })

              });
              //autoCompletePrefUnit.cleanDataset(0);
              //autoCompletePrefUnit.removeDataset(0);
              autoCompletePrefUnit.datasets[0].items.length = 0
              autoCompletePrefUnit.addItems(seachDico, autoCompletePrefUnit.datasets[0]);
            },
            onUnselect: function() {
              autoCompletePrefUnit.reset();
            }
          }
        }).inject(dimensionDiv);
        var searchDico = {};
        searchDico.name = "Dimenions";
        searchDico.items = [];
        Object.keys(pSkeleton.attrDimenions).forEach(function(item) {
          var name = pSkeleton.attrDimenions[item]["Name"];
          var nls = pSkeleton.attrDimenions[item]["NLS"];
          searchDico.items.push({
            value: name,
            label: nls
          });
        });
        autoCompleteDim.addDataset(searchDico);
        return autoCompleteDim;
      },
      AttrPreferedUnitValueField: function(opts) {
        var dimensionDiv = UWA.createElement('div', {
          'id': opts.id,
          'class': 'autoCompletePreferedUnit',
          styles: {
            //'width': '100%',
            overflow: 'visible'
          }
        });


        var autoCompleteDim = new Autocomplete({
          showSuggestsOnFocus: true,
          multiSelect: false,
          minLengthBeforeSearch: 0,
          datasets: [{
            items: []
          }],
          placeholder: myNls.get("createAttrFieldPrefUnitPlaceholder"),
          events: {},
          style: {
            //'width': '100%',
            overflow: 'visible'
          },
          events: {
            onSelect: function(item) {}
          }
        }).inject(dimensionDiv);
        return autoCompleteDim;
      },
      AttrAutorizedValueField: function(opts, defaultValueFieldId, lineNumber) {
        var that = this;
        var input = new Text({
          "id": opts.id,
          className: "form-control",
          events: {
            onChange: function() {
              var msgErr = "";
              var curVal = this.getValue();
              var words = curVal.split(';');
              var error = false;
              words = words.map(string => string.trim());
              words = words.filter(string => string.length > 0);
              this.setValue(words.join(";"));
              curVal = words.join(";");
              //console.log(words);
              var singleValues = words.filter((item, index) => words.indexOf(item) == index);
              var duplicateValues = words.filter((item, index) => words.indexOf(item) != index);
              if (duplicateValues.length > 0) {
                error = true;
                msgErr = myNls.get('attrRangeErrDupValue') + duplicateValues.join(" - ");
                this.setValue(singleValues.join(";"));
              }

              singleValues.forEach((item, i) => {
                console.log(item);
                if (item.length > 0) {
                  if (_attrType == "Integer") {
                    item = item.trim();
                    var regex = new RegExp('^[-+]?[0-9]+$');
                    if (regex.test(item) && this.elements.input.style.borderColor != null) {
                      this.elements.input.style.borderColor = null;
                    } else {
                      error = true;
                      msgErr = myNls.get('attrRangeErrNumeric');

                    }
                  } else if (_attrType == "String") {
                    item = item.trim();
                    var regex = new RegExp("^[a-zA-Z0-9]+$");
                    if (regex.test(item) && this.elements.input.style.borderColor != null) {
                      this.elements.input.style.borderColor = null;
                    } else {
                      error = true;
                      msgErr = myNls.get('attrRangeErrAlphanumeric');
                    }
                  }
                }
              });
              if (error) {
                this.elements.input.setStyle('border-color', "#EA4F37");
                DMSWidgets.createAlertBox(msgErr).inject(_theModal.elements.header);
              } else {
                // BMN2 08/09/2021 : IR-824980-3DEXPERIENCER2022x
                // We save the state of the default value before resetting it.
                // As we will be able to reset as it was.
                let wasDisabled = lines[lineNumber].defaultValue.isDisabled()
                var parent = lines[lineNumber].defaultValue.elements.container.getParent();
                lines[lineNumber].defaultValue.elements.container.remove();

                if (singleValues.length > 0 && curVal != "") {

                  var autoComplete = new Autocomplete({
                    showSuggestsOnFocus: true,
                    multiSelect: false,
                    allowFreeInput: false,
                    minLengthBeforeSearch: 0,
                    datasets: [],
                    placeholder: myNls.get("createAttrFieldDefaultValuePlaceholder"),
                    events: {
                      onHideSuggests: function() {
                        /*if (this.selectedItems.length == 0 && this.elements.input.value != "") {
                          this.resetInput();
                        }*/
                      }
                    },
                    style: {
                      //'width': '100%',
                      overflow: 'visible'
                    }
                  });
                  var searchDico = {};
                  searchDico.name = "Types";
                  searchDico.items = [];

                  if (_attrType == "Integer") {
                    singleValues.sort(function(a, b) {
                      return a - b
                    });
                  } else {
                    // the function sort(), sort automatically in alphabetic order.
                    // This works well with String type.
                    singleValues.sort();
                  }
                  singleValues.forEach(function(item) {
                    item = item.trim();
                    if (item.length > 0) {
                      searchDico.items.push({
                        value: item
                      });
                    }
                  });
                  autoComplete.addDataset(searchDico);
                  lines[lineNumber].defaultValue = autoComplete;
                  autoComplete.inject(parent);
                  // BMN2 02/09/2021 : IR-830606-3DEXPERIENCER2022x
                  autoComplete.validateWhenRangeIsDefined = function(rangeField) {
                    // We will not check if the default value is one of the rangeNls
                    // if it's in disabled state (this field can be in disabled
                    //  if the user set the multi value field as true).
                    if (this.isDisabled()) {
                      return true;
                    }
                    let checkValidDefaultVal = false;
                    let curInputValue = rangeField.getValue();
                    let curDefaultValue = this.getValue();
                    let words = curInputValue.split(";");
                    if (words.length > 0) {
                      /*words.forEach((item, i) => {
                        item = item.trim();
                        if(curDefaultValue===item){
                          checkValidDefaultVal =true;
                        }

                      });*/
                      if (words.includes(curDefaultValue)) {
                        checkValidDefaultVal = true;
                      }
                    } else {
                      checkValidDefaultVal = true;
                    }
                    if (!checkValidDefaultVal) {
                      this.elements.inputContainer.setStyle('border-color', "#EA4F37");
                      DMSWidgets.createAlertBox({nls: 'attrDefaultValShouldBeOneAmongRangeVal'}).inject(_theModal.elements.header);
                    } else {
                      this.elements.inputContainer.style.borderColor = null;
                    }
                    return checkValidDefaultVal;
                  }
                  // If the default value field was disabled so we will restore the state.
                  if (wasDisabled) {
                    autoComplete.resetInput();
                    autoComplete.setDisabled(true);
                  }
                } else {

                  lines[lineNumber].defaultValue = that.AttrDefaultValueField({
                    id: defaultValueFieldId
                  }, lineNumber);
                  lines[lineNumber].defaultValue.inject(parent);
                  if (wasDisabled) {
                    lines[lineNumber].defaultValue.setValue("");
                    lines[lineNumber].defaultValue.setDisabled(true);
                  }
                }

              }
            }
          }
        });

        input.CustomValidate = function() {
          let toRet = true;
          if (_attrType == "String") {
            let curInputValue = this.getValue();
            let words = curInputValue.split(";");
            words.forEach((item, _i) => {
              item = item.trim();
              var regex = new RegExp("^[a-zA-Z0-9]+$");
              if (item.length > 0 && !regex.test(item)) {
                toRet = false;
              }
            });

          } else if (_attrType == "Integer") {
            let curInputValue = this.getValue();
            let words = curInputValue.split(";");
            words.forEach((item, _i) => {
              item = item.trim();
              var regex = new RegExp('^[-+]?[0-9]+$');
              if (item.length > 0 && !regex.test(item)) {
                toRet = false;
              }
            });
          }
          if (!toRet) {
            this.elements.input.setStyle('border-color', "#EA4F37");
          } else {
            this.elements.input.style.borderColor = null;
          }
          return toRet;
        }
        return input;
      },
      AttrDefaultValueField: function(opts, lineNumber) {
        var input = "";
        if (_attrType == "Date") {
          input = new DateInput({
            id: opts.id,
            placeholder: myNls.get("createAttrFieldDateDefaultValuePlaceholder"),
            showClearIcon: true,
            events: {
              onChange: function() {
                console.log(this);
                var dateObj = this.getDate();
                // A Faire : Trouver un moyen de stocker la valeur sous forme de milli secondes.
              }
            }
          });
        } else if (_attrType == "Integer") {
          input = new Text({
            id: opts.id
          });
          input.elements.input.oninput = function() {
            var regexInt = new RegExp('^[-+]?\\d+$');
            if (this.value.length > 1 && !regexInt.test(this.value)) {
              var reg = new RegExp('^[-+]?\\d+');
              var res = this.value.match(reg);
              if (res != null) {
                this.value = res[0];
              } else {
                this.value = "";
              }
            } else if (this.value.length == 1 && this.value != "-" && this.value != "+" && isNaN(this.value)) {
              this.value = "";
            }
          };
          input.elements.input.onchange = function() {
            if (this.value.length > 0) {
              this.value = parseInt(this.value);
              if (this.value > 2147483647) {
                this.value = 2147483647;
              } else if (this.value < -2147483647) {
                this.value = -2147483647;
              }
            }
          };
          //input.setValue('');
        } else if (_attrType == "Boolean") {
          input = new Select({
            id: opts.id,
            //placeholder: 'Select your option',
            options: [{
                value: 'true',
                label: myNls.get("createAttrFieldTrueLabel"),
                //selected: true
              },
              {
                value: 'false',
                label: myNls.get("createAttrFieldFalseLabel")
              }
            ]
          });
        } else if (_attrType == "Double" || _attrType == "DoubleWithDim") {
          input = new Text({
            id: opts.id
          });
          input.elements.input.oninput = function() {
            var regexDouble = new RegExp('^[-+]?\\d+(\\.)?(\\d{1,6})?$');
            if (this.value.length > 1 && !regexDouble.test(this.value)) {
              //this.value = this.value.substring(0, this.value.indexOf('.') + 7);
              var reg = new RegExp('^[-+]?\\d+(\\.)?(\\d{1,6})?');
              var res = this.value.match(reg);
              if (res != null) {
                this.value = res[0];
              } else {
                this.value = "";
              }

            } else if (this.value.length == 1 && this.value != "-" && this.value != "+" && isNaN(this.value)) {
              this.value = "";
            }
          };
          input.elements.input.onchange = function() {
            if (this.value.length > 0) {
              this.value = parseFloat(this.value);
            }
          };
        } else {
          input = new Text({
            id: opts.id
          });
        }
        return input;
      },

      AttrMultiValueField: function(opts) {
        // BMN2 08/09/2021 :  IR-824980-3DEXPERIENCER2022x
        /*
        Put onChange event to manage the default value field according
        to the multi value field.
        */
        var toggle = new Toggle({
          type: 'switch',
          value: 'option1',
          label: '',
          id: opts.id,
          events: {
            onChange: function() {
              var defValField = opts.line.defaultValue;
              var hasDefaultField = opts.line.hasDefaultField;
              if (this.isChecked()) {
                // Sometimes the default value is autocomplete field
                // so we have to manage diffferently
                /*if (defValField instanceof Autocomplete) {
                  defValField.resetInput();
                } else {
                  defValField.setValue("");
                }*/
                defValField.setDisabled(true);
                if(pSkeleton.hasDef) {
                  hasDefaultField.setCheck(false);
                  hasDefaultField.setDisabled(true);
                  DMSWidgets.createCustoAlert({
                    'message': myNls.get('multiValSetTrue'),
                    'delay': 3000,
                    'type': 'primary',
                    'auto': true
                  }).inject(_theModal.elements.header);
                }
              } else {
                defValField.setDisabled(false);
                if(pSkeleton.hasDef){
                  hasDefaultField.setCheck(true);
                  hasDefaultField.setDisabled(false);
                }
              }
            }
          }
        });
        if (opts.checked) {
          toggle.check();
        }
        return toggle;
      },

      AttrMultiLineField: function(opts) {
        var toggle = this.AttrToggleField(opts.id, opts.checked);
        return toggle;
      },

      AttrSearchableField: function(opts) {
        var toggle = this.AttrToggleField(opts.id, opts.checked);
        return toggle;
      },

      AttrUserAccessField: function(opts) {
        var select = new Select({
          id: opts.id,
          placeholder: false,
          options: [{
              value: 'ReadWrite',
              label: myNls.get("createAttrFieldReadWriteLabel"),
              selected: true
            },
            {
              value: 'ReadOnly',
              label: myNls.get("createAttrFieldReadOnlyLabel")
            }
          ]
        });
        return select;
      },

      AttrResetWhenDuplicatedField: function(opts) {
        var toggle = this.AttrToggleField(opts.id, opts.checked);
        return toggle;
      },

      AttrResetWhenVersionedField: function(opts) {
        var toggle = this.AttrToggleField(opts.id, opts.checked);
        return toggle;
      },

      AttrV6ExportableField: function(opts) {
        var toggle = this.AttrToggleField(opts.id, opts.checked);
        return toggle;
      },
      /*S63 : 2/8/2022
      * FUN114519
      * Adding has default radio button
      */
      AttrHasDefaultField: function(opts) {
        var toggle = new Toggle({
            type: 'switch',
            value: 'option1',
            label: '',
            id: opts.id,
            events: {
              onChange: function() {
                var defValField = opts.line.defaultValue;
                var multiValField = opts.line.multiValueField;
                if (!this.isChecked()) {
                  // Sometimes the default value is autocomplete field
                  // so we have to manage diffferently
                  /*if (defValField instanceof Autocomplete) {
                    defValField.resetInput();
                  } else {
                    defValField.setValue("");
                  }*/
                  defValField.setDisabled(true);
                  DMSWidgets.createCustoAlert({
                    'message': myNls.get('defValSetFalse'),
                    'delay': 3000,
                    'type': 'primary',
                    'auto': true
                  }).inject(_theModal.elements.header);
                } else {
                  defValField.setDisabled(false);
                  if(multiValField.isChecked())
                    multiValField.uncheck();
                  DMSWidgets.createCustoAlert({
                    'message': myNls.get('defValSetTrue'),
                    'delay': 3000,
                    'type': 'primary',
                    'auto': true
                  }).inject(_theModal.elements.header);
                }
              }
            }
          });
          if (opts.checked) {
            toggle.check();
          }
          return toggle;
      },

      /* bmn2 : 10/20/2020
       * We don't want expose this porperty now.
        AttrResetOnForkField: function(opts) {
          var toggle = this.AttrToggleField(opts.id, opts.checked);
          return toggle;
        },*/
      AttrNlsField: function(trElement, i) {
        var inputEN = UWA.createElement('input', {
          type: "text",
          'class': 'form-control',
          "id": "NLSValueEN" + i
        });
        inputEN.inject(this.getTableDataElement({
          width: "250px"
        }).inject(trElement));

        var inputFR = UWA.createElement('input', {
          type: "text",
          'class': 'form-control',
          "id": "NLSValueFR" + i
        });
        inputFR.inject(this.getTableDataElement({
          width: "250px"
        }).inject(trElement));

        var inputDE = UWA.createElement('input', {
          type: "text",
          'class': 'form-control',
          "id": "NLSValueDE" + i
        });
        inputDE.inject(this.getTableDataElement({
          width: "250px"
        }).inject(trElement));

        var inputJA = UWA.createElement('input', {
          type: "text",
          'class': 'form-control',
          "id": "NLSValueJA" + i
        });
        inputJA.inject(this.getTableDataElement({
          width: "250px"
        }).inject(trElement));
        var inputKO = UWA.createElement('input', {
          type: "text",
          'class': 'form-control',
          "id": "NLSValueKO" + i
        });
        inputKO.inject(this.getTableDataElement({
          width: "250px"
        }).inject(trElement));
        var inputRU = UWA.createElement('input', {
          type: "text",
          'class': 'form-control',
          "id": "NLSValueRU" + i
        });
        inputRU.inject(this.getTableDataElement({
          width: "250px"
        }).inject(trElement));
        var inputZH = UWA.createElement('input', {
          type: "text",
          'class': 'form-control',
          "id": "NLSValueZH" + i
        });
        inputZH.inject(this.getTableDataElement({
          width: "250px"
        }).inject(trElement));
      },
      AttrToggleField: function(id, checked) {
        var toggle = new Toggle({
          type: 'switch',
          value: 'option1',
          label: '',
          id: id
        });
        if (checked) {
          toggle.check();
        }
        return toggle;
      },
      TabNavPanel: function() {
        var tabNav = UWA.createElement('div', {
          'id': "got-tab-sample",
          'class': "tab"
        }); //.inject(myContent);
        tabNav.setStyle("justify-content", "center");
        var basics = UWA.createElement('a', {
          'class': "tab-item",
          text: myNls.get("BasicsTab")
        }).inject(tabNav);
        var values = UWA.createElement('a', {
          'class': "tab-item",
          text: myNls.get("ValuesTab")
        }).inject(tabNav);
        var behavior = UWA.createElement('a', {
          'class': "tab-item",
          text: myNls.get("BehaviorsTab")
        }).inject(tabNav);
        var translations = UWA.createElement('a', {
          'class': "tab-item",
          text: myNls.get("TranslationsTab")
        }).inject(tabNav);
        var basicsToggler = new Toggler({
          container: tabNav,
          activeClass: 'active',
          //ignored: ['disabled', 'not-selectable'],
          selected: 0,
          events: {
            onToggle: function(element, index, active) {
              console.log(active ? 'Entering' : 'Leaving', element.innerHTML);
              if (index == 0) {
                var nameColumn = document.getElementById('nameColumn');
                if (nameColumn != undefined) {
                  nameColumn.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                  });
                }
              } else if (index == 1) {
                // BMN2 02/09/2021: IR-832187-3DEXPERIENCER2022x
                var valuesColumn = document.getElementById('authorizedValueColumn');
                if (valuesColumn == undefined) {
                  valuesColumn = document.getElementById('defaultValueColumn');
                }
                var defaultValueColumn = valuesColumn;
                if (defaultValueColumn != undefined) {
                  defaultValueColumn.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                  });
                }
              } else if (index == 2) {
                var resetWhenDupColumn = document.getElementById('searchableeColumn');
                if (resetWhenDupColumn != undefined) {
                  resetWhenDupColumn.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                  });
                }
              } else if (index == 3) {
                var resetWhenDupColumn = document.getElementById('TransEN');
                if (resetWhenDupColumn != undefined) {
                  resetWhenDupColumn.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                  });
                }
              }
            }
          }
        });
        return tabNav;
      },
      //Modal for the Type form and Extension form
      formModal: function(form, container, attrType) {
        _theModal = new Modal({
          className: 'fancy',
          visible: true,
          closable: true,
          header: headerDiv,
          body: form,
          footer: "<button type='button' id='SaveButton' class='btn btn-primary'>" + myNls.get("Save") + "</button>" +
            "<button type='button' id='CancelBtn' class='btn btn-default'>" + myNls.get("Cancel") + "</button> ",
          renderTo: container,

          events: {
            onHide: function(arg) {
              UWA.log("the Modal Closed");
              // As we call the hide() function when the user click on range NLS popup
              // we avoid to destroy the modal.
              if (typeof arg === "string" && arg === "HideForRangeModal") {
                _theModal.isVisible = false;
                _theModal.elements.container.setStyle("display", "");
              } else {
                _theModal.destroy();
              }
            },
            onShow: function() {
              UWA.log("the Modal shown");
              var observer = new IntersectionObserver(function(entries) {
                entries.sort(function(a, b) {
                  return (a.intersectionRatio < b.intersectionRatio) ? 1 : (a.intersectionRatio > b.intersectionRatio) ? -1 : 0;
                });
                var toggler = document.getElementById('got-tab-sample');
                if (entries.length > 0) {
                  // console.log("target : " + entries[0].target.id);
                  // console.log("ratio : " + entries[0].intersectionRatio);
                  if (entries[0].target.id == "authorizedValueColumn" && entries[0]['intersectionRatio'] >= 0.90) {
                    toggler.getElementsByClassName('active')[0].toggleClassName('active');
                    toggler.getChildren()[1].toggleClassName('active');
                  }
                  if (entries[0].target.id == "defaultValueColumn" && entries[0]['intersectionRatio'] >= 0.90) {
                    toggler.getElementsByClassName('active')[0].toggleClassName('active');
                    toggler.getChildren()[1].toggleClassName('active');
                  }
                  if (entries[0].target.id == "nameColumn" && entries[0]['intersectionRatio'] >= 0.90) {
                    toggler.getElementsByClassName('active')[0].toggleClassName('active');
                    toggler.getChildren()[0].toggleClassName('active');
                  }
                  if (entries[0].target.id == "resetWhenVersColumn" && entries[0]['intersectionRatio'] >= 0.90) {
                    toggler.getElementsByClassName('active')[0].toggleClassName('active');
                    toggler.getChildren()[2].toggleClassName('active');
                  }
                  if (entries[0].target.id == "TransDE" && entries[0]['intersectionRatio'] >= 0.90) {
                    toggler.getElementsByClassName('active')[0].toggleClassName('active');
                    toggler.getChildren()[3].toggleClassName('active');
                  }
                  if (entries[0].target.id == "TransZH" && entries[0]['intersectionRatio'] >= 0.90) {
                    toggler.getElementsByClassName('active')[0].toggleClassName('active');
                    toggler.getChildren()[3].toggleClassName('active');
                  }
                }
              }, {
                threshold: [1]
              });
              // BMN2 02/09/2021: IR-832187-3DEXPERIENCER2022x
              if (document.getElementById('authorizedValueColumn') != undefined) {
                observer.observe(document.getElementById('authorizedValueColumn'));
              } else {
                observer.observe(document.getElementById('defaultValueColumn'));
              }
              observer.observe(document.getElementById('nameColumn'));
              observer.observe(document.getElementById('resetWhenVersColumn'));
              observer.observe(document.getElementById('TransDE'));
              observer.observe(document.getElementById('TransZH'));
            }
          }
        });
        _theModal.getFooter().getElement('#SaveButton').addEvent('click', function() {
          let saveBtn = this;
          console.log(_theModal);
          var attributesList = _theModal.getBody().getElements("tbody>tr");
          var attrListToSend = [];
          var globalObjToSend = {
            "AggregatorPackage": "",
            "AggregatorName": "",
            "AggregateMode": "",
            "AggregatorNature": "",
            "Attributes": {}
          }
          // BMN2 09/09/2021 : IR-825343-3DEXPERIENCER2022x
          // We are checking the creation panel if the attribute name unqiue
          // among all attributes to be created. 
          var attrNameList = [];
          let isDuplNameForAttr = false;
          attributesList.every((item, i) => {
            var attrName = lines[i].nameField.getValue();
            if (attrNameList.includes(attrName)) {
              isDuplNameForAttr = true;
              return false;
            } else if (attrName.length > 0) {
              attrNameList.push(attrName);
            }
            return true;
          });
          if (isDuplNameForAttr) {
            DMSWidgets.createAlertBox({nls:'ErrCreateAttrNameShouldBeUnique'}).inject(_theModal.elements.header);
            return false;
          }
          // We are checking if the name is already taken by another attribute.
          let attrNameExist = false;
          let attrNameValueThatExist = "";
          attributesList.every((item, i) => {
            var attrName = lines[i].nameField.getValue();
            if (attrName.length > 0 && dicoHandler.isNameExistingForAttr(attrName)) {
              attrNameExist = true;
              attrNameValueThatExist = attrName;
              return false;
            }
            return true;
          });
          if (attrNameExist) {
            DMSWidgets.createAlertBox({
              nls: 'ErrCreateAttrNameAlreadyTaken',
              NAME: attrNameValueThatExist
            }).inject(_theModal.elements.header);
            return false;
          }
          attributesList.forEach((item, i) => {
            //console.log(item);
            //  console.log(i);
            //var attrName = item.getElement('#attrNameInput_' + i)
            var attrName = lines[i].nameField.getValue();
            console.log('name : ' + attrName);
            var regex = RegExp('^[a-zA-Z0-9_]+$');
            let rangeField = lines[i].authorizedField;
            let defaultValField = lines[i].defaultValue;
            let defaultFieldValid = true;
            let rangeValid = true;
            if (rangeField != undefined) {
              if (!rangeField.CustomValidate()) {
                rangeValid = false;
              }
              if (defaultValField.validateWhenRangeIsDefined != undefined && !defaultValField.validateWhenRangeIsDefined(rangeField)) {
                defaultFieldValid = false;
              }
            }
            var isIRPCValid = true;
            var nature = _attrOwner._attributes.nature;
            var aggregator = _attrOwner.id;
            var dicoKeyAggregator = dicoHandler.getKeyToReadOnDico(nature);

            isIRPCValid = dicoHandler.isIRPC(aggregator, dicoKeyAggregator);
            // envoyer un message d'erreur à l'utilisateur.

            if (attrName != "" && regex.test(attrName) && rangeValid && defaultFieldValid && isIRPCValid != undefined) {

              var attrPredicate = lines[i].predicateField.getValue();
              var attrDefaultValue = lines[i].defaultValue.getValue();
              var dimension = "";
              var manipUnit = "";
              if (_attrType == "DoubleWithDim") {
                //_attrType="Double";
                //"HasMagnitude": "Yes";
                dimension = lines[i].dimValue.getValue();
                manipUnit = lines[i].preferedUnitValue.getValue();
              }
              if (_attrType == "Date") {
                var date = lines[i].defaultValue.getDate();
                if (date != null || date != undefined) {
                  /*
                   We set 10:00:00 AM because if we call directly toISOString()
                  method, then the date is changed. Because the time is set to 00:00:00 when the user choose
                  a date on UI.
                  */
                  //date.setHours(10);
                  /* We build a string with the date and a time in GMT, the output od to ISPString() is something like "2020-07-08T08:00:00.000Z"
                  so we retrieve the only the date "2020-07-08" then we add the time in GMT.
                  */
                  //var sDate = date.toISOString().split('T')[0] + "@10:00:00:GMT";
                  //var myFormatedDate = new Date(sDate);
                  /*
                  we want the date in timestamp in secondes
                  */
                  /* BMN2 08/01/2021 : IR-815276-3DEXPERIENCER2021x
                   * Issue with firefox compatibility with Date() Class
                   */
                  let formatedDate = new Date(date.toDateString() + " 10:00:00 GMT");
                  let timestampInSec = Math.floor(formatedDate.getTime() / 1000);
                  // the timestamp has to be in String before sending to the webservice.
                  attrDefaultValue = timestampInSec.toString();
                  //  commenter en attendant la livraison de mamadou.
                  //attrDefaultValue = "";
                }
              }
              // For Boolean type attribute
              if (Array.isArray(attrDefaultValue) && attrDefaultValue.length > 0) {
                attrDefaultValue = attrDefaultValue[0];
              }
              // Authorized Values
              var attrAutorizedValue = "";
              if (_attrType == "String" || _attrType == "Integer") {
                attrAutorizedValue = lines[i].authorizedField.getValue();
              }
              // NLS for Authorized Values
              var nlsForRanges = undefined;
              if (lines[i].theRangeModal != undefined) {
                nlsForRanges = new Map(Object.entries(lines[i].theRangeModal.getNLSRange()));
              }

              // Length
              var attrLength = "";
              if (_attrType == "String") {
                attrLength = lines[i].lengthField.getValue();
              }
              // the method getValue() give the option selection in an array. So we have to keep the first entry of the array.
              var userAccess = lines[i].userAccessField.getValue()[0];

              if (lines[i].multiValueField != undefined) {
                var attrMultiValue = lines[i].multiValueField.isChecked();
                // If the attribute is multivalued then we clean the value of
                // the default value
                if (attrMultiValue) {
                  attrDefaultValue = "";
                }
              }
              if (lines[i].multiLineField != undefined)
                var attrMultiLine = lines[i].multiLineField.isChecked();
              var attrSearchable = lines[i].searchableField.isChecked();
              var attrResetWhenDup = lines[i].resetWhenDuplField.isChecked();
              var attrResetWhenVers = lines[i].resetWhenVersField.isChecked();
              var attrV6Exportable = lines[i].V6ExportableField.isChecked();
              // S63 02/08/2022 FUN114519 : new button hasDefault
              if (lines[i].hasDefaultField !== undefined) {
                var attrHasDefault = lines[i].hasDefaultField.isChecked();
                // If the attribute  do not have hasDefault then we clean the value of
                // the default value
                if(!attrHasDefault) {
                    attrDefaultValue = "";
                  }
              }
              // bmn2 10/20/2020 : var attrResetOnFork = lines[i].resetOnForkField.isChecked();

              var attrOwner = _attrOwner.id;
              var attrOwnerNature = _attrOwner._attributes.nature;



              var nlsEn = item.getElement("#NLSValueEN" + i);
              var nlsFr = item.getElement("#NLSValueFR" + i);
              var nlsDe = item.getElement("#NLSValueDE" + i);
              var nlsJa = item.getElement("#NLSValueJA" + i);
              var nlsKo = item.getElement("#NLSValueKO" + i);
              var nlsRu = item.getElement("#NLSValueRU" + i);
              var nlsZH = item.getElement("#NLSValueZH" + i);
              if (nlsEn.value.length == 0) {
                nlsEn.value = attrName;
              }
              var nlsObj = {
                "en": nlsEn.value,
                "fr": nlsFr.value,
                'de': nlsDe.value,
                'ja': nlsJa.value,
                'ko': nlsKo.value,
                'ru': nlsRu.value,
                'zh': nlsZH.value
              };
              // BMN2 17/11/2020 : IR-807296-3DEXPERIENCER2021x
              //  We send only nls value which is not empty.
              Object.keys(nlsObj).forEach((item, i) => {
                if (nlsObj[item].length == 0) {
                  delete nlsObj[item];
                }
              });


              var attrObject = dicoHandler.buildAttrForCreation(attrName, attrType, attrOwner, attrOwnerNature, attrPredicate, attrLength, attrAutorizedValue, nlsForRanges, attrDefaultValue, userAccess, attrMultiValue, attrMultiLine, attrSearchable, attrResetWhenDup, attrResetWhenVers, attrV6Exportable, attrHasDefault, nlsObj, dimension, manipUnit);
              globalObjToSend.Attributes[attrObject.Name] = attrObject;
              console.log(attrObject);
            }
          });

          //attrListToSend.push(attrToSend);
          if (Object.keys(globalObjToSend.Attributes).length > 0) {
            saveBtn.disabled = true;
            var nature = _attrOwner._attributes.nature;
            var aggregator = _attrOwner.id;
            var isIRPC = true;
            isIRPC = dicoHandler.isIRPC(aggregator, dicoHandler.getKeyToReadOnDico(_attrOwner._attributes.nature));
            var mode = isIRPC ? "Local" : "Global";
            var isDepl = false;
            if (nature == "Interface" && _attrOwner._attributes.automatic != undefined && _attrOwner._attributes.automatic == "Yes") {
              isDepl = true;
            }
            var aggr_package = dicoHandler.getPackageNameToCreate(isIRPC, isDepl);
            globalObjToSend.AggregatorPackage = aggr_package;
            globalObjToSend.AggregateMode = mode;
            globalObjToSend.AggregatorName = aggregator;
            globalObjToSend.AggregatorNature = nature;
            console.log(globalObjToSend);
            var myPath = URLHandler.getURL() + "/resources/dictionary/AttributeCreate";
            WAFData.authenticatedRequest(
              myPath, {
                timeout: 500000,
                'method': 'POST',
                'type': 'json',
                'data': JSON.stringify(globalObjToSend),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },

                //'headers'   : {'SecurityContext': 'VPLMProjectLeader.MyCompany.3DS Private Collab Space' } ,
                'onComplete': function(resp) {
                  console.log("onComplete response:");
                  console.log(resp);
                  _theModal.destroy();
                  _collection.reset();
                  _collection.fetch({
                    data: {
                      maxAge: 0,
                      lang: widget.lang
                    },
                    onComplete: function(collection, response, options) {
                      console.log(collection);
                    }
                  });

                },
                'onFailure': function(err, data, responseStatus) {
                  console.log("onFailure error:");
                  console.log(err);
                  console.log("onFailure response:");
                  console.log(responseStatus);
                  const resp = data;
                  let message = "";
                  if (resp && typeof resp === 'object') { // null = 'object'
                    if ('DictionaryException' in resp) {
                      const excep = resp.DictionaryException;
                      const {
                        Status,
                        Message
                      } = excep
                      if ((Status.contains("403") || Status.contains("500")) && (Message.contains("threshold") || Message.contains("#1400005: Object has references"))) {
                        message = myNls.ErrCreateAttrParentHasRef;
                      } else {
                        message = data.DictionaryException.Message;
                      }
                    } else {
                      message = myNls.DeleteAggregatorGenericErr;
                    }
                  }
                  DMSWidgets.createAlertBox(message).inject(_theModal.elements.header);
                  saveBtn.disabled = false;
                }
              }
            );
          }
        });
        _theModal.getFooter().getElement('#CancelBtn').addEvent('click', function() {
          _theModal.destroy();
        });

        _theModal.elements.wrapper.setStyle('width', '800px');
        return _theModal;
      },

      launchPanel: function(options) {
        _theAction = options.action;
        _theContainer = options.container;
        _attrType = options.attrType;
        _header = options.header;
        _attrOwner = options.attrOwner;
        _collection = options.relatedCollection;
        if (_theAction === "attrTable") {
          UWA.log("add_type action");
          var myModel;

          //tag div element
          headerDiv = UWA.createElement('div', {
            'class': 'global-div'
          });
          var myContent = UWA.createElement('div', {
            'id': "myContent",
          });


          //tag nav element
          var _tabPanel = UWA.createElement('nav', {
            'class': 'tab tab-pills',
            'id': 'the-forms'
          }).inject(headerDiv);
          var tabNav = this.TabNavPanel();
          tabNav.inject(myContent);



          var tableWrapper = UWA.createElement('div', {
            'class': "tableDiv"
          }).inject(myContent);
          tableWrapper.setStyle('overflow-x', 'auto');
          //tableWrapper.setStyle('overflow-y', 'auto');
          tableWrapper.onscroll = function() {
            var resetWhenDupColumn = document.getElementById('resetWhenDupColumn');
            if (resetWhenDupColumn != undefined && resetWhenDupColumn.isInViewport(this)) {
              //alert('in Viewport');
            }
          };
          var table = UWA.createElement('table', {
            'class': 'table', //'tableImportExport',
            'id': 'attrTable'
          }).inject(tableWrapper);
          table.setStyle('width', '3900px');
          table.setStyle('height', '300px');
          table.setStyle('max-width', 'unset');
          table.setStyle('display', 'block');
          table.setStyle('table-layout', 'fixed');

          var thead = UWA.createElement('thead', {
            'class': 'attrthead',
            'id': 'attrthead'
          }).inject(table);

          var tbody = UWA.createElement('tbody', {
            'class': 'attrtbody',
            'id': 'attrtbody'
          }).inject(table);



          //title for the Modal
          var heading = UWA.createElement('h4', {
            text: _header
          }).inject(headerDiv);

          var firstLine = UWA.createElement('tr').inject(thead);


          this.getHeaderElement({
            headerName: myNls.get("createAttrTableNameHeader"),
            width: "250px",
            headerId: "nameColumn"
          }).inject(firstLine);
          this.getHeaderElement({
            headerName: myNls.get("createAttrTablePredicateHeader"),
            width: "250px",
            headerId: "predicateColumn"
          }).inject(firstLine);

          if (options.attrType == "String") {

            this.getHeaderElement({
              headerName: myNls.get("createAttrTableLengthHeader"),
              width: "200px",
              headerId: "lengtheColumn"
            }).inject(firstLine);
          }
          if (options.attrType == "String" || options.attrType == "Integer") {

            this.getHeaderElement({
              headerName: myNls.get("createAttrTableRangesHeader"),
              width: "250px",
              headerId: "authorizedValueColumn"
            }).inject(firstLine);
          }
          if (options.attrType == "DoubleWithDim") {
            this.getHeaderElement({
              headerName: myNls.get("createAttrTableDimensionHeader"),
              width: "250px",
              headerId: "dimensionsValueColumn"
            }).inject(firstLine);

            this.getHeaderElement({
              headerName: myNls.get("createAttrTablePrefUnitHeader"),
              width: "250px",
              headerId: "PreferendUnitValueColumn"
            }).inject(firstLine);
          }
          var defaultValueHeaderNls = myNls.get("createAttrTableDefaultValueHeader");
          if (options.attrType === "DoubleWithDim") {
            defaultValueHeaderNls = myNls.get("createAttrTableDefaultValueForDimHeader");
          }
          this.getHeaderElement({
            headerName: defaultValueHeaderNls,
            width: "250px",
            headerId: "defaultValueColumn"
          }).inject(firstLine);

          this.getHeaderElement({
            headerName: myNls.get("createAttrTableUserAccessHeader"),
            width: "200px",
            headerId: "userAccessColumn"
          }).inject(firstLine);

          this.getHeaderElement({
            headerName: myNls.get("createAttrTableMultiValueHeader"),
            width: "100px",
            headerId: "multiValueColumn"
          }).inject(firstLine);
          if (options.attrType == "String") {

            this.getHeaderElement({
              headerName: myNls.get("createAttrTableMultilineHeader"),
              width: "100px",
              headerId: "multiLineColumn"
            }).inject(firstLine);
          }

          this.getHeaderElement({
            headerName: myNls.get("createAttrTableSearchableHeader"),
            width: "100px",
            headerId: "searchableeColumn"
          }).inject(firstLine);


          this.getHeaderElement({
            headerName: myNls.get("createAttrTableResetWhenDupHeader"),
            width: "100px",
            headerId: "resetWhenDupColumn"
          }).inject(firstLine);

          this.getHeaderElement({
            headerName: myNls.get("createAttrTableResetWhenVerHeader"),
            width: "100px",
            headerId: "resetWhenVersColumn"
          }).inject(firstLine);

          this.getHeaderElement({
            headerName: myNls.get("createAttrTable3DXMLHeader"),
            width: "100px",
            headerId: "XPDMExporColumn"
          }).inject(firstLine);

          /* S63 02/08/2022
          * FUN114519
          * Adding has default column
          */
          if(pSkeleton.hasDef) {
            this.getHeaderElement({
              headerName: myNls.get("createAttrHasDefaultHeader"),
              width: "100px",
              headerId: "hasDefaultColumn"
            }).inject(firstLine);
          }
          /* bmn2 10/20/2020:
           * We don't want to expose this property now.
          this.getHeaderElement({
            headerName: myNls.get("createAttrTableResetOnForkHeader"),
            width: "100px",
            headerId: "resetOnForkColumn"
          }).inject(firstLine);*/
          this.getHeaderElement({
            headerName: myNls.get("createAttrTableEnHeader"),
            width: "250px",
            headerId: "TransEN"
          }).inject(firstLine);
          this.getHeaderElement({
            headerName: myNls.get("createAttrTableFrHeader"),
            width: "250px",
            headerId: "TransFR"
          }).inject(firstLine);
          this.getHeaderElement({
            headerName: myNls.get("createAttrTableDeHeader"),
            width: "250px",
            headerId: "TransDE"
          }).inject(firstLine);
          this.getHeaderElement({
            headerName: myNls.get("createAttrTableJaHeader"),
            width: "250px",
            headerId: "TransJA"
          }).inject(firstLine);
          this.getHeaderElement({
            headerName: myNls.get("createAttrTableKoHeader"),
            width: "250px",
            headerId: "TransKO"
          }).inject(firstLine);
          this.getHeaderElement({
            headerName: myNls.get("createAttrTableRuHeader"),
            width: "250px",
            headerId: "TransRU"
          }).inject(firstLine);
          this.getHeaderElement({
            headerName: myNls.get("createAttrTableZhHeader"),
            width: "250px",
            headerId: "TransZH"
          }).inject(firstLine);
          // First line of input
          lines = [];
          for (var i = 0; i < 3; i++) {


            var inputLine = UWA.createElement('tr').inject(tbody);
            var curLine = {};
            curLine.nameField = this.AttrNameField({
              id: "attrNameInput_" + i
            });
            curLine.nameField.inject(this.getTableDataElement({
              width: "250px"
            }).inject(inputLine));
            var attrTypeForPredicate = options.attrType
            if (attrTypeForPredicate == "DoubleWithDim") {
              attrTypeForPredicate = "Double";
            }
            curLine.predicateField = this.AttrPredicateField({
              id: 'predicateInput_' + i
            }, attrTypeForPredicate);

            curLine.predicateField.inject(this.getTableDataElement({
              width: "250px"
            }).inject(inputLine));

            if (options.attrType == "String") {
              curLine.lengthField = this.AttrLengthField({
                id: "attrLengthInput_" + i
              }, i);
              curLine.lengthField.inject(this.getTableDataElement({
                width: "200px"
              }).inject(inputLine));
            }

            if (options.attrType == "String" || options.attrType == "Integer") {
              curLine.authorizedField = this.AttrAutorizedValueField({
                id: "attrAutorizedValueInput_" + i
              }, "attrDefaultValueInput_" + i, i);
              var div = UWA.createElement("div", {
                class: "input-group"
              });
              curLine.authorizedField.inject(div);
              var langIcon = UWA.createElement("span", {
                class: "input-group-addon fonticon fonticon-language"
              }).inject(div);
              //var tableNls = this.buildTableRangeNLs();

              langIcon.line = curLine;
              langIcon.theRangeModal = undefined;
              langIcon.onclick = function() {
                var value = this.line.authorizedField.getValue();
                var list = value.split(";");
                list = list.map(string => string.trim());
                list = list.filter(function(item) {
                  return item.length > 0
                });
                this.line.authorizedField.setValue(list.join(";"));
                var attrName = this.line.nameField.getValue();
                _theModal.dispatchEvent("onHide", "HideForRangeModal");
                if (this.line.theRangeModal == undefined) {
                  this.line.theRangeModal = new AttrRangeTable({
                    rangeList: [], // Pas de valeur initiale à conserver dans l'UI
                    attrName: attrName,
                    attrType: _attrType,
                    container: pSkeleton.container,
                    parent: _theModal,
                    editMode: true,
                    onSave: (function(line) {
                      return function(value) {
                        line.authorizedField.setValue(value);
                        line.authorizedField.dispatchEvent("onChange"); // Dispatch event will invoke updateRangeList!!
                        return true;
                      }
                    })(this.line),
                    onHide: function() {
                      _theModal.show();
                    }
                  });
                }
                this.line.theRangeModal.updateRangeList(list);
                this.line.theRangeModal.launchPanel({attrName: attrName});
              }
              div.inject(this.getTableDataElement({
                width: "250px"
              }).inject(inputLine));
            }
            if (options.attrType == "DoubleWithDim") {


              curLine.preferedUnitValue = this.AttrPreferedUnitValueField({
                id: "attrPreferedUnitValueInput_" + i
              }, i);
              curLine.dimValue = this.AttrDimensionValueField({
                id: "attrDimValueInput_" + i
              }, curLine.preferedUnitValue);

              curLine.dimValue.inject(this.getTableDataElement({
                width: "250px"
              }).inject(inputLine));

              curLine.preferedUnitValue.inject(this.getTableDataElement({
                width: "250px"
              }).inject(inputLine));
            }

            curLine.defaultValue = this.AttrDefaultValueField({
              id: "attrDefaultValueInput_" + i
            }, i);

            curLine.defaultValue.inject(this.getTableDataElement({
              width: "250px"
            }).inject(inputLine));

            curLine.userAccessField = this.AttrUserAccessField({
              id: "attrUserAcessInput_" + i,
            });
            curLine.userAccessField.inject(this.getTableDataElement({
              width: "250px"
            }).inject(inputLine));

            // We send the curLine object to the function, to able to mange the
            // default value field.
            curLine.multiValueField = this.AttrMultiValueField({
              id: "attrMultiValueInput_" + i,
              line: curLine
            });
            curLine.multiValueField.inject(this.getTableDataElement({
              width: "100px"
            }).inject(inputLine));

            if (options.attrType == "String") {
              curLine.multiLineField = this.AttrMultiLineField({
                id: "attrMultiLineInput_" + i
              });
              curLine.multiLineField.inject(this.getTableDataElement({
                width: "100px"
              }).inject(inputLine));
            }
            curLine.searchableField = this.AttrSearchableField({
              id: "attrSearchableInput_" + i,
              checked: true
            });
            curLine.searchableField.inject(this.getTableDataElement({
              width: "100px"
            }).inject(inputLine));

            curLine.resetWhenDuplField = this.AttrResetWhenDuplicatedField({
              id: "attrResetWhenDupInput_" + i,
              checked: true
            });
            curLine.resetWhenDuplField.inject(this.getTableDataElement({
              width: "100px"
            }).inject(inputLine));

            curLine.resetWhenVersField = this.AttrResetWhenVersionedField({
              id: "attrResetWhenVersInput_" + i,
              checked: true
            });
            curLine.resetWhenVersField.inject(this.getTableDataElement({
              width: "100px"
            }).inject(inputLine));

            curLine.V6ExportableField = this.AttrV6ExportableField({
              id: "attrV6ExportableInput_" + i
            });
            curLine.V6ExportableField.inject(this.getTableDataElement({
              width: "100px"
            }).inject(inputLine));

            /* S63 02/08/2022
            * FUN114519
            * Adding HasDefault option
            */
            if(pSkeleton.hasDef) {
              curLine.hasDefaultField = this.AttrHasDefaultField({
                id: "attrHasDefaultInput_" + i,
                checked: true,
                line: curLine
              });
              curLine.hasDefaultField.inject(this.getTableDataElement({
                width: "100px"
              }).inject(inputLine));
            }
            /* bmn2 : 10/20/2020
            curLine.resetOnForkField = this.AttrResetOnForkField({
              id: "attrResetOnForkInput_" + i
            });
            curLine.resetOnForkField.inject(this.getTableDataElement({
              width: "100px"
            }).inject(inputLine));*/

            this.AttrNlsField(inputLine, i);

            lines.push(curLine);
          }

          myModel = this.formModal(myContent, _theContainer, options.attrType);

        }
      }

    };
    return exports;
  });

define('DS/DMSApp/Views/CustomTableScrollView',
  [
    'UWA/Core',
    'UWA/Promise',
    'UWA/Class/View',
    'DS/UIKIT/Modal',
    'DS/UIKIT/Scroller',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Input/Toggle',
    'DS/DMSApp/Utils/URLHandler',
    'DS/UIKIT/Autocomplete',
    'DS/DMSApp/Views/Layouts/CustomField',
    'DS/UIKIT/Input/Button',
    'DS/UIKIT/Alert',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
    'DS/WAFData/WAFData',
    'DS/W3DXComponents/Views/Item/TileView',
    'DS/W3DXComponents/Views/Layout/TableScrollView',
  ],
  function(UWA, Promise, View, Modal, Scroller, Select, Toggle, URLHandler, Autocomplete, CustomField /*, ImmersiveFrame, Panel*/ , Button, Alert, dicoHandler, myNls, WAFData, TileView, TableScrollView) {

    'use strict';
    /*
    This class generates all the views in the process View. In other words, it's the "leader" view.
    */
    return TableScrollView.extend({
      tagName: 'div',
      className: 'dashboard-table-view',
      elements: {},

      /**
       * @override UWA.Class.View#setup
       * @param {View}   options.collectionView - The containing collection view.
       */
      setup: function(options) {
        this._parent.apply(this, options);
        this.addEvent("onItemRendered", function(tt) {
          var table = this.container.getElementsByClassName("table-container")[0];
          if (table != undefined) {
            table.toggleClassName('table-container');
            table.toggleClassName('table');
          }
        });
        this.nestedView.inheritedAttr = [];
        this.nestedView.ownAttr = [];
        this.nestedView.allAttr=[];
        this.nestedView.addEvent("onAfterItemAdded", function(row) {
          this.allAttr.push(row);
          //console.log('A new row added');
          row.container.toggleClassName("row-container");
          if (row.model._attributes.isInherited == "Yes") {
            this.inheritedAttr.push(row);
            row.container.addClassName('warning');
            if (row.model._attributes.isOOTBAttr == "Yes") {
              row.container.getChildren()[1].innerText = myNls.get("AttrOwnerOOTB");

            }
          } else {
            this.ownAttr.push(row);
          }
        });
        this.nestedView.addEvent("FilterAttrTableView", function(data) {

          switch (data) {
            case "ownAttr":
              this.ownAttr.forEach((item, i) => {
                item.show();
              });
              this.inheritedAttr.forEach((item, i) => {
                item.hide();
              });
              break;
            case "inheritedAttr":
              this.ownAttr.forEach((item, i) => {
                item.hide();
              });
              this.inheritedAttr.forEach((item, i) => {
                item.show();
              });
              break;
            default:
              this.allAttr.forEach((item, i) => {
                item.show();
              });
          }
        });
        this.nestedView.addEvent("onSearchAttr", function(data) {
          this.allAttr.forEach((item, i) => {
            var tile = item;
            if (tile.model.get("title").toLowerCase().contains(data) || tile.model.get("subtitle").toLowerCase().contains(data)) {
              tile.show();
            } else {
              tile.hide();
            }
          });
        });
        this.nestedView.addEvent("onResetAttr", function() {
          this.allAttr.forEach((item, i) => {
              item.show();
          });
        });
      }
    });

  });

define('DS/DMSApp/Utils/Renderers/AttrOfTypeRenderer',
  [
    'DS/W3DXComponents/Skeleton',
    'DS/W3DXComponents/Collections/ActionsCollection',
    'DS/UIKIT/DropdownMenu',
    'DS/UIKIT/Autocomplete',
    'DS/DMSApp/Utils/dictionaryJSONHandler',
    'DS/DMSApp/Utils/DMSWebServices',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
    'DS/DMSApp/Views/CustomTableScrollView',
    'DS/UIKIT/Alert',
  ],
  function(Skeleton, ActionsCollection, DropdownMenu, Autocomplete, dicoHandler, DMSWebServices, myNls, CustoTableScrollView, Alert) {
    "use strict";

    var Typeattributes = {
      collection: 'DS/DMSApp/Collections/AttrOfTypeCollection',
      view: 'DS/W3DXComponents/Views/Item/SetView', // 'DS/DMSApp/Views/Layouts/attributesLayout',
      viewOptions: {
        //itemView : TileView,
        contents: {
          events: {},
          useInfiniteScroll: false,
          usePullToRefresh: false,

          //className : "table",
          views: [{
            'id': 'tile',
            'title': "AttributeList",
            'className': "table",
            'view': CustoTableScrollView,
            events: {
              onSwitch: function() {
                console.log("onSwitch");
              }
            }
          }],
          headers: [{
              'label': myNls.get("AttrTableColumnLabelName"),
              'property': 'title'
            },
            {
              'label': myNls.get("AttrTableColumnLabelOwner"),
              'property': 'owner'
            },
            {
              'label': myNls.get("AttrTableColumnLabelType"),
              'property': 'subtitle'
            },
            {
              'label': myNls.get("AttrTableColumnLabelMultiValue"),
              'property': 'multiValueNLS'
            },
            {
              'label': myNls.get("AttrTableColumnLabelDefaultValue"),
              'property': 'defaultValueNLS'
            }
          ],

        },
        actions: {
          collection: function() {
            var commands = [];
            commands.push({
              title: myNls.get('FindAttrPopup'),
              icon: 'fonticon fonticon-search',
              id: 'AttrSearchId',
              overflow: false,
              relatedView: this
            });
            if (pSkeleton.isAuthoring && this.model._attributes.isOOTB === "No" && this.model._attributes.DMSStatus != "PROD" && ((this.model._attributes.DMSStatus != "DEV" && this.model._attributes.DMSStatus != "DMSExported") || (pSkeleton.isAOLI != undefined && pSkeleton.isAOLI == true))) {
              commands.push({
                id: 'createAttr',
                title: myNls.get('CreateAttrPopup'),
                icon: 'plus',
                overflow: false,
                relatedView: this
              });
            }
            var previousRendererName = pSkeleton.currentRouteSteps[pSkeleton.getCurrentPanelIndex() - 1].get('renderer');
            if (previousRendererName !== 'attributesGroup' && previousRendererName !== 'uniquekey') {
              commands.push({
                id: 'filterAttr',
                title: myNls.get('AttrFilterPopup'),
                icon: 'fonticon fonticon-filter',
                overflow: false,
                relatedView: this
              });
            }
            var acts = new ActionsCollection(commands);
            return acts;
          },
          events: {
            'onActionClick': function(actionsView, actionView, event) {
              var actionId = actionView.model.get('id');
              UWA.log("actionId " + actionId);
              if (actionId === 'AttrSearchId') {
                var searchExist = this.container.getElement("#searchAutoCompleteInputAttr");
                if (searchExist != null) {
                  searchExist.destroy();
                } else {
                  var searchDiv = UWA.createElement('div', {
                    'id': 'searchAutoCompleteInputAttr',
                    'class': 'autoCompleteSearch'
                  });
                  searchDiv.setStyle('width', '250px');
                  var insertDiv = actionView.container.parentNode.insertBefore(searchDiv, actionView.container);
                  var autoComplete = new Autocomplete({
                    showSuggestsOnFocus: true,
                    multiSelect: false,
                    minLengthBeforeSearch: 0,
                    datasets: [],
                    events: {
                      onSelect: function(item) {
                        // resetForm(null, item.subLabel || '');
                      },
                      onFocus: function(e) {},
                      onKeyUp: function(key) {
                        this.elements.clear.onclick = function() {
                          // BMN2 03/09/2021 : IR-832185-3DEXPERIENCER2022x
                          var tileList = actionView.model._attributes.relatedView.contentsViews.tile.nestedView.children;
                          var keys = Object.keys(tileList);
                          var typeNumber = keys.length;
                          if (Array.isArray(keys)) {
                            keys.forEach(function(iElement) {
                              var tile = tileList[iElement];
                              tile.show();

                            });
                          }
                        }.bind(this);
                        var tileList = actionView.model._attributes.relatedView.contentsViews.tile.nestedView.children;
                        var keys = Object.keys(tileList);
                        if (Array.isArray(keys)) {
                          keys.forEach(function(iElement) {
                            var tile = tileList[iElement];
                            if (tile.model._attributes.title.toLowerCase().contains(key.currentTarget.value.toLowerCase()) || tile.model._attributes.subtitle.toLowerCase().contains(key.currentTarget.value.toLowerCase())) {
                              tile.show();
                            } else {
                              tile.hide();
                            }
                          });
                        }
                      }
                    }
                  }).inject(insertDiv);
                  var searchDico = {};
                  searchDico.name = "Attr";
                  searchDico.items = [];
                  actionView.model._attributes.relatedView.collection._models.forEach(function(iElem) {
                    searchDico.items.push({
                      value: iElem._attributes.title,
                      subLabel: iElem._attributes.subtitle
                    });
                  });
                  searchDico.configuration = {};
                  searchDico.configuration.searchEngine = function(dataset, text) {
                    text = text.toLowerCase();
                    var sug = [];
                    dataset.items.forEach(function(item) {
                      if (item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text)) {
                        sug.push(item);
                      }
                    });
                    return sug;
                  }
                  autoComplete.addDataset(searchDico);
                  searchDiv.getElementsByTagName('input')[0].focus();
                }
              } else if (actionId === 'filterAttr') {
                new DropdownMenu({
                  /*
                  Accessing the container containing the action button "Create Business Rule", through this.containter.children etc.
                  We could have access to it through getChildren() method I guess.
                  */
                  target: this.actionsView.container.getElementsByClassName("fonticon fonticon-fonticon fonticon-filter")[0],
                  items: [{
                      id: "allAttr",
                      text: myNls.get("AllAttrFilter")
                    },
                    {
                      id: "ownAttr",
                      text: myNls.get("OwnAttrFilter")
                    },
                    {
                      id: "inheritedAttr",
                      text: myNls.get("InheritedAttrFilter")
                    }

                  ],
                  events: {
                    onClick: function(e, item) {
                      if (item.id == "ownAttr") {
                        actionView.model._attributes.relatedView.contentsViews.tile.nestedView.dispatchEvent("FilterAttrTableView", "ownAttr");

                      } else if (item.id == "inheritedAttr") {
                        actionView.model._attributes.relatedView.contentsViews.tile.nestedView.dispatchEvent("FilterAttrTableView", "inheritedAttr");
                      } else if (item.id == "allAttr") {
                        actionView.model._attributes.relatedView.contentsViews.tile.nestedView.dispatchEvent("FilterAttrTableView", "all");
                      }
                    },
                    //This event is triggered when we click outside of the dropdown menu. Then we destroy it.
                    onClickOutside: function() {
                      this.destroy();
                    }
                  }
                }).show();
              } else if (actionId === "createAttr") {
                new DropdownMenu({
                  /*
                  Accessing the container containing the action button "Create Business Rule", through this.containter.children etc.
                  We could have access to it through getChildren() method I guess.
                  */
                  target: this.actionsView.container.getElementsByClassName("fonticon fonticon-2x fonticon-plus")[0],
                  items: [{
                      id: "String",
                      text: myNls.get("AttrTypeString")
                    },
                    {
                      id: "Integer",
                      text: myNls.get("AttrTypeInt")
                    },
                    {
                      id: "Real",
                      text: myNls.get("AttrTypeReal")
                    },
                    {
                      id: "Boolean",
                      text: myNls.get("AttrTypeBool")
                    },
                    {
                      id: "Date",
                      text: myNls.get("AttrTypeDate")
                    },
                    {
                      id: "attrWithDim",
                      text: myNls.get("AttrTypeRealWithDim")
                    }
                  ],
                  events: {
                    onClick: function(e, item) {
                      require(['DS/DMSApp/Views/CreateAttrTable'], (function(CreateAttrTable) {
                        if (item.id == "String") {
                          CreateAttrTable.launchPanel({
                            attrType: "String",
                            theModel: this.collection,
                            relatedCollection: actionView.model._attributes.relatedView.collection,
                            attrOwner: actionView.model._attributes.relatedView.model,
                            action: 'attrTable',
                            header: myNls.get("HeaderPopupCreateAttrStr"),
                            container: pSkeleton.container
                          });
                        } else if (item.id == "Integer") {
                          CreateAttrTable.launchPanel({
                            attrType: "Integer",
                            theModel: this.collection,
                            relatedCollection: actionView.model._attributes.relatedView.collection,
                            attrOwner: actionView.model._attributes.relatedView.model,
                            action: 'attrTable',
                            header: myNls.get("HeaderPopupCreateAttrInt"),
                            container: pSkeleton.container
                          });
                        } else if (item.id == "Real") {
                          CreateAttrTable.launchPanel({
                            attrType: "Double",
                            theModel: this.collection,
                            relatedCollection: actionView.model._attributes.relatedView.collection,
                            attrOwner: actionView.model._attributes.relatedView.model,
                            action: 'attrTable',
                            header: myNls.get("HeaderPopupCreateAttrReal"),
                            container: pSkeleton.container
                          });
                        } else if (item.id == "Boolean") {
                          CreateAttrTable.launchPanel({
                            attrType: "Boolean",
                            theModel: this.collection,
                            relatedCollection: actionView.model._attributes.relatedView.collection,
                            attrOwner: actionView.model._attributes.relatedView.model,
                            action: 'attrTable',
                            header: myNls.get("HeaderPopupCreateAttrBoolean"),
                            container: pSkeleton.container
                          });
                        } else if (item.id == "Date") {
                          CreateAttrTable.launchPanel({
                            attrType: "Date",
                            theModel: this.collection,
                            relatedCollection: actionView.model._attributes.relatedView.collection,
                            attrOwner: actionView.model._attributes.relatedView.model,
                            action: 'attrTable',
                            header: myNls.get("HeaderPopupCreateAttrDate"),
                            container: pSkeleton.container
                          });
                        } else if (item.id == "attrWithDim") {
                          CreateAttrTable.launchPanel({
                            attrType: "DoubleWithDim",
                            theModel: this.collection,
                            relatedCollection: actionView.model._attributes.relatedView.collection,
                            attrOwner: actionView.model._attributes.relatedView.model,
                            action: 'attrTable',
                            header: myNls.get("HeaderPopupCreateAttrAttrWithDim"),
                            container: pSkeleton.container
                          });
                        }
                      }).bind(this))
                    },
                    //This event is triggered when we click outside of the dropdown menu. Then we destroy it.
                    onClickOutside: function() {
                      this.destroy();
                    }
                  }
                }).show();

              }
            }
          }
        },
        events: {
          onRenderSwitcherView: function(view) {
            // To hide the view switcher Icon
            view.container.hide();
            // To hide the "|" and the dot icon.
            var actionsDiv = view.container.getParent().getParent().getElementsByClassName('set-actions');
            if (actionsDiv != undefined && actionsDiv.length > 0) {
              actionsDiv[0].className = "set-actions";
            }
            var actionInlineDot = view.container.getParent().getParent().getElementsByClassName('actions-inline-dotted');
            if (actionInlineDot != undefined && actionInlineDot.length > 0) {
              actionInlineDot[0].hide();
            }
          }
        }
      },
      idCardOptions: {
        /*attributesMapping: {
          title: 'title'
        },*/
        actions: function() {
          var curPanelIndex = pSkeleton.getCurrentPanelIndex();
          var parentModel = pSkeleton.getModelAt(curPanelIndex - 1);
          var editCmds = [];
          if (pSkeleton.isAuthoring && this._attributes.isInherited == "No" && this._attributes.isOOTBAttr == "No") {
            editCmds.push({
              text: myNls.get("AttrEditIconLabel"),
              icon: 'pencil',
              handler: function(view) {
                UWA.log("Edition of attribute");
                view.editModeOn();
              }
            });
          }
          if (pSkeleton.isAuthoring && this._attributes.isInherited == "No" && this._attributes.isOOTBAttr == "No" && parentModel._attributes.DMSStatus != "DEV" && parentModel._attributes.DMSStatus != "DMSExported" && parentModel._attributes.DMSStatus != "PROD") {
            editCmds.push({
              text: myNls.get("AttrDeleteIconLabel"),
              icon: 'fonticon fonticon-trash',
              handler: function(view) {
                UWA.log("Delete of attribute");
                var aggregatorNature = view.model.get("ownerNature");
                var aggregatorName = view.model.get("ownerId");
                var isIRPC = dicoHandler.isIRPC(view.model.get("ownerId"), dicoHandler.getKeyToReadOnDico(view.model.get("ownerNature")));
                var aggregator = dicoHandler.getAgregatorByNameAndNature(aggregatorName, aggregatorNature)
                var isDepl = false;
                if (aggregator.Nature == "Interface" && aggregator.Automatic != undefined && aggregator.Automatic === "Yes") {
                  isDepl = true;
                }
                var aggr_package = dicoHandler.getPackageNameToCreate(isIRPC, isDepl);
                var attributesList = dicoHandler.getAttributes(dicoHandler.getKeyToReadOnDico(aggregator.Nature), aggregator.Name, "No");
                var attrToDelete = attributesList.filter(item => item.Name == view.model.id)[0];
                var globalObjToSend = {

                };
                globalObjToSend.AggregatorPackage = aggr_package;
                globalObjToSend.AggregatorName = aggregatorName;
                globalObjToSend.AggregatorNature = aggregatorNature;
                globalObjToSend.Attributes = {
                  //attrToDelete.Name : attrToDelete
                }
                globalObjToSend.Attributes[attrToDelete.Name] = attrToDelete;
                console.log(globalObjToSend);
                DMSWebServices.attributeDelete(globalObjToSend,
                  function(msg) {
                    // On Complete
                    let attrCollection = view.model.collection;
                    attrCollection.reset();
                    var langCode = widget.lang;
                    if (langCode == "zh") {
                      langCode = "zh_CN";
                    }
                    attrCollection.fetch({
                      data: {
                        maxAge: 0,
                        lang: langCode
                      },
                      onComplete: function(collection, response, options) {
                        pSkeleton.slideBack();
                      }
                    });
                  },
                  function(msg) {
                    // On Faillure
                    let alert = new Alert({
                      visible: true,
                      autoHide: true,
                      hideDelay: 2000
                    }).inject(pSkeleton.getActiveIdCard().container);
                    alert.add({
                      className: 'error',
                      message: msg
                    });
                  });
              }
            });
          }
          editCmds.push({
            text: myNls.get("CpToClipAttrInfoPopup"),
            icon: 'fonticon fonticon-clipboard-add',
            handler: function(view) {
              UWA.log("Copy the internal name of attribute");

              var value = view.model.getFullName();
              var input = UWA.createElement('input', {
                'value': value
              });
              document.body.appendChild(input);
              input.select();
              document.execCommand("copy");
              document.body.removeChild(input);
              var alert = new Alert({
                visible: true,
                autoHide: true,
                hideDelay: 2000
              }).inject(this.elements.actionsSection);
              alert.add({
                className: 'primary',
                message: 'Internal name copied !'
              });
            }
          });
          return editCmds;
        },
        facets: function() {
          return [{
            text: 'Attributes',
            icon: 'doc-text',
            name: 'hjhjh',
            handler: Skeleton.getRendererHandler('AttrDisplay')
          }];
        }
      }

    };
    return Typeattributes;
  });

define('DS/DMSApp/Views/InterfaceForm',
	[
		'DS/UIKIT/Form',
		'DS/UIKIT/Input/Toggle',
		'DS/UIKIT/Alert',
		'DS/UIKIT/Mask',
		'DS/DMSApp/Utils/dictionaryJSONHandler',
		'DS/DMSApp/Utils/UuidHandler',
		'DS/DMSApp/Utils/DMSWebServices',
		'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
		'css!DS/DMSApp/DMSApp'
	],
function(Form, Toggle, Alert, Mask, dicoHandler, UuidHandler, webService, myNls) {
	"use strict";
	//url is the only attribute of this class.
	function InterfaceForm(aModeEdit, aModel) {
		if (!(this instanceof InterfaceForm)) {
			throw new TypeError("InterfaceForm constructor cannot be called as a function.");
		}
		this.modeEdit = aModeEdit;
		this.model = aModel;
	}

	InterfaceForm.prototype = {
		constructor: InterfaceForm,

		onSubmitSuccess: function(_interface_name, _modeEdit, resp) {
			console.log("onComplete response:");
			console.log(resp);
			//pSkeleton.getCollectionAt(1).parse(resp);
			var currStep = pSkeleton.getCurrentPanelIndex();
			//pSkeleton.getCollectionAt(1).attGrpCreated = true;
			//if (!this.modeEdit) {
			switch (_modeEdit) {
				case "New": {
					if(pSkeleton.currentRouteSteps[currStep-1].get('renderer')==="attributesGroup")
						currStep = currStep-1;
					pSkeleton.getCollectionAt(currStep).myReset=true;
					pSkeleton.getCollectionAt(currStep).setup();
					pSkeleton.getCollectionAt(currStep).fetch({
						data:{
							maxAge:0
						},
						onComplete: function(collection, response, options) {
							console.log(collection);
							var modModel = collection.get(_interface_name);
							var nestedView = pSkeleton.getViewAt(currStep).contentsViews.tile.nestedView;
							nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
							Mask.unmask(widget.body);
						}
					});
					break;
				}
				case "Edit": {
					//IR-953012-3DEXPERIENCER2023x S63 7/18/22 if we are not in interface panel, slideback before refresh view
					let currStep = pSkeleton.getCurrentPanelIndex();
					if(pSkeleton.getModelAt(currStep).get('nature')!=="Interface"){
						pSkeleton.slideBack();
						//var currStep = pSkeleton.getCurrentPanelIndex();
					}
					//pSkeleton.slideBack();
					currStep = pSkeleton.getCurrentPanelIndex();
					pSkeleton.getCollectionAt(currStep-1).myReset=true;
					pSkeleton.getCollectionAt(currStep-1).setup();
					pSkeleton.getCollectionAt(currStep-1).fetch({
						data:{
							maxAge:0
						},
						onComplete: function(collection, response, options) {
							let currStep = pSkeleton.getCurrentPanelIndex();
							let modModel = collection.get(_interface_name);
							pSkeleton.getModelAt(currStep)._attributes=modModel._attributes;
							let nestedView = pSkeleton.getViewAt(currStep-1).contentsViews.tile.nestedView;
							nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
							pSkeleton.getCollectionAt(currStep).setup();
							pSkeleton.getCollectionAt(currStep).fetch({data:{
								maxAge:0
							},
							onComplete: function() {
								Mask.unmask(widget.body)
							}});
						}
					});
					break;
				}
				case "AddTo": {
					//IR-817326-3DEXPERIENCER2021x S63 we are now check the case where we have an extension open but in the list of extending interfaces
					// JLE20 - La correction précédente a introduit une regression à la création d'un attribute group depuis un type.
					if(pSkeleton.currentRouteSteps[currStep].get('renderer')!="attributesGroup") {
						currStep = currStep-1;
						pSkeleton.getModelAt(currStep).get('extendingInterfaces').push(_interface_name);
					}
					pSkeleton.getCollectionAt(currStep).myReset=true;
					pSkeleton.getCollectionAt(currStep).setup();
					pSkeleton.getCollectionAt(currStep).fetch({
						data:{
							maxAge:0
						},
						onComplete: function(collection, response, options) {
							var modModel = collection.get(_interface_name);
							var nestedView = pSkeleton.getViewAt(currStep).contentsViews.tile.nestedView;
							nestedView.dispatchEvent("onItemViewClick",[modModel],nestedView);
							Mask.unmask(widget.body);
						}
					});
					break;
				}
			}
		},

		onSubmitFailure: function(_interface_name, _modeEdit, resp) {
			/*console.log("onFailure error:");
			console.log(err);*/
			var alert = new Alert({
				visible : true,
				//autoHide: true,
				//hideDelay: 3000
				//closable: false,
				closeOnClick : true,
				renderTo : pSkeleton.container,
				messageClassName : 'error',
				messages : resp,
				autoHide : true,
				hideDelay : 3000
				});
			Mask.unmask(widget.body);
			console.log("onFailure response:");
			console.log(resp);
		},

		build: function() {
			var _theInterfaceForm;
			var _modeEdit = this.modeEdit;
			var _model = this.model;
			var self = this;

			var myFields = [];

			switch (this.modeEdit) {
				case "New": {
					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('interfaceName'),
						required: true,
						placeholder: myNls.get('enterAttGrpName'),
						helperText: myNls.get('uniqueField'),
						errorText: myNls.get('nameError'),
						pattern: "^[a-zA-Z0-9]+$"
					});
					//scope name
					myFields.push({
							type: 'autocomplete',
							name: "scope_name",
							label: myNls.get('scopesNames'),
							//placeholder: myNls.get('searchTypeOrRel'),
							required: true,
							allowFreeInput: true,
							showSuggestsOnFocus: true,
							multiSelect: true,
							//helperText :	"EnterType ",
							errorText: myNls.get('SpecialCharacterError'),
							events: {
								onSelect: function(item, position) {
									if (item['datasetId'] === undefined) {
										ac.toggleSelect(item,position,false);
									}
									else if (ac.selectedItems.length === 1 && !ac.datasets[0]['name']) {
										ac.removeDataset(0);
										delete search['name'];
										search = dicoHandler.getDeploymentExtensibleTypesForAutoComplete(search,item['isIRPC']);
										ac.addDataset(search);
										ac.onUpdateSuggests(ac.datasets);
										ac.onHideSuggests();
										ac.onFocus();
										ac.toggleSelect(ac.getItem(item['value'], position, true));
										//ac.onHideSuggests();
										//ac.onUpdateSuggests(ac.datasets);
										//ac.selectedItems.push(item);
									}
								},
								onUnselect: function(item) {
									if (ac.selectedItems.length === 0 && ac.datasets[0]['name']) {
										ac.removeDataset(0);
										delete search['name'];
										search = dicoHandler.getDeploymentExtensibleTypesForAutoComplete(search);
										ac.addDataset(search);
										//ac.onUpdateSuggests(ac.datasets);
									}
								}
							}
						});
					//Automatic Addition
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "automatic",
						html: new function() {
							var label = UWA.createElement('label', {
								'text': myNls.get("interfaceFormAutomaticFieldLabel")
							});
							var toggle = new Toggle({
								type: 'switch',
								name: "automatic",
								value: 'Yes',
								disabled: false,
								label: myNls.get("interfaceFormAutomaticFieldOption"),
								checked: true
							}) 
							var div = UWA.createElement('div', {
								'class': 'interfaceFormAutomaticOptDiv'
							});
							label.inject(div);
							toggle.inject(div);
							return div;
						}
					}); //*/

					//comment
					/*myFields.push({
						type: "textarea",
						name: "my_comment",
						label: myNls.get('Description'),
						placeholder: myNls.get('enterDescription')
					});*/
					break;
				}
				case "Edit": {
					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('interfaceName'),
						disabled: true,
						required: true,
						value: this.model.get('title')
					});
					//scope name
					myFields.push({
						type: 'autocomplete',
						name: "scope_name",
						label: myNls.get('scopesNames'),
						//placeholder: myNls.get('searchTypeOrRel'),
						required: true,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: true,
						//closableItems:false,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError')
					});
					//Automatic Addition
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "automatic",
						html: new function() {
							var label = UWA.createElement('label', {
								'text': myNls.get("interfaceFormAutomaticFieldLabel")
							});
							var toggle = new Toggle({
								type: 'switch',
								name: "automatic",
								value: self.model.get('automatic'),
								disabled: !!self.model.get('DMSStatus') && self.model.get('DMSStatus') !== "DEV",
								label: myNls.get("interfaceFormAutomaticFieldOption"),
								checked: self.model.get('automatic')==='Yes'
							}) //.check()
							var div = UWA.createElement('div', {
								'class': 'interfaceFormAutomaticOptDiv'
							});
							label.inject(div);
							toggle.inject(div);
							return div;
						}
					}); //*/
					//comment
					/*myFields.push({
						type: "textarea",
						name: "my_comment",
						label: myNls.get('Description'),
						placeholder: myNls.get('enterDescription'),
						value: this.model.get('Description')
					});*/
					break;
				}
				case "AddTo": {
					var isIRPC = dicoHandler.isIRPC(this.model.get('id'), this.model.get('nature') + "s") ? "Yes" : "No";
					//Type Name
					myFields.push({
						type: 'text',
						name: "interface_name",
						label: myNls.get('interfaceName'),
						required: true,
						placeholder: myNls.get('enterAttGrpName'),
						helperText: myNls.get('uniqueField'),
						errorText: myNls.get('alphaNumError'),
						pattern: "^[a-zA-Z0-9]+$"
					});
					//scope name
					myFields.push({
						type: 'autocomplete',
						name: "scope_name",
						label: myNls.get('scopesNames'),
						placeholder: " ",
						required: true,
						allowFreeInput: true,
						showSuggestsOnFocus: true,
						multiSelect: false,
						disabled:true,
						closableItems:false,
						//helperText :	"EnterType ",
						errorText: myNls.get('SpecialCharacterError'),
						datasets: [{
							items: [{
								'value': this.model.get('id'),
								'label': this.model.get('title'),
								'scopeNature': this.model.get('nature'),
								'isIRPC': isIRPC
							}]
						}]
					});
					//Automatic Addition
					myFields.push({
						type: "html",
						'class': 'form-group',
						name: "automatic",
						html: new function() {
							var label = UWA.createElement('label', {
								'text': myNls.get("interfaceFormAutomaticFieldLabel")
							});
							var toggle = new Toggle({
								type: 'switch',
								name: "automatic",
								value: 'Yes',
								disabled: false,
								label: myNls.get("interfaceFormAutomaticFieldOption"),
								checked: true
							})
							var div = UWA.createElement('div', {
								'class': 'interfaceFormAutomaticOptDiv'
							});
							label.inject(div);
							toggle.inject(div);
							return div;
						}
					}); //*/
					//comment
					/*myFields.push({
						type: "textarea",
						name: "my_comment",
						label: myNls.get('Description'),
						placeholder: myNls.get('enterDescription'),
					});*/
					break;
				}
				default:
					throw new TypeError("InterfaceForm constructor required a correct editMode");
			}

			_theInterfaceForm = new Form({
				//className : 'horizontal',
				grid: '4 8',
				fields: myFields,

				//button event fired
				events: {
					onSubmit: function() {
						UWA.log("Done button clicked");
						var automatic = !this.getField("automatic").checked ? 'No' : 'Yes';
						var type_scope_name = this.getAutocompleteInput("scope_name").selectedItems; //this.getField('scope_name').value;
						if(type_scope_name.length===0) {
							var alert2 = new Alert({
								visible : true,
								//autoHide: true,
								//hideDelay: 3000
								//closable: false,
								closeOnClick : true,
								renderTo : widget.body,
								messageClassName : 'error',
								messages : "no Scope"
							});
							acscope.onFocus();
							return;
						}
						
						var isIRPC = type_scope_name[0]['isIRPC'];


						var scope_type = [],
							scope_rel = [],
							scopes = [];

						var interface_name = this.getTextInput('interface_name').getValue(); //this.getField('interface_name').value;
						//IR-818199-3DEXPERIENCER2021x S63 Checking if a model exist (modify context) and checking if if it really interface information
						var DMSStatus = _model && _model.get('nature')==="Interface" ? _model.get('DMSStatus') : undefined;
						switch (_modeEdit) {
							case "New":
							case "AddTo": {
								var _interface_name = interface_name + dicoHandler.charFlag + UuidHandler.create_UUID().getUuidWithoutSeparator();

								for (var i = 0; i < type_scope_name.length; i++) {
									var scopeTmp = type_scope_name[i]['value'];
									if (type_scope_name[i]['scopeNature'] === 'Type') {
										scope_type.push(scopeTmp);
										//dicoHandler.addExtendingInterfaces(scopeTmp,"Types",_interface_name);
									} else if (type_scope_name[i]['scopeNature'] === 'Relationship') {
										scope_rel.push(scopeTmp);
									}
								}
								
								//myPath = myPath + "/resources/dictionary/AggregatorCreate?nature=Interface";
								var data = {
									"Name": _interface_name,
									"Nature": "Interface",
									"Parent": "",
									//"FirstOOTB": "",
									"Abstract": "No",
									"CustomerExposition": "Programmer",
									//"Specializable": "Yes",
									//"Specialization": "No",
									"Deployment": "Yes",
									//"Customer": "No",
									"Automatic": automatic,
									//"Typing": "No",
									"Package": dicoHandler.getPackageNameToCreate(isIRPC=="Yes",true),
									//"Description": interface_comment,
									"ScopeTypes": scope_type,
									"ScopeRelationships": scope_rel,
									//"Attributes": {}
								}
								//IR-818199-3DEXPERIENCER2021x S63 adding DMSStatus if existing
								if(DMSStatus!=undefined)
									data['DMSStatus']=DMSStatus;
								Mask.mask(widget.body);
								webService.aggregatorCreate(data, "Interface", function(resp){
									self.onSubmitSuccess(_interface_name,_modeEdit,resp);
								}, function(resp) {
									self.onSubmitFailure(_interface_name,_modeEdit,resp)
								});
								break;
							}
							case "Edit": {
								var _interface_name = _model.get('id');

								for (var i = 0; i < type_scope_name.length; i++) {
									var scopeTmp = type_scope_name[i]['value'];
									scopes.push(scopeTmp);
									if (!_model.get('scopes').includes(scopeTmp)) {
										if (type_scope_name[i]['scopeNature'] === 'Type') {
											scope_type.push("add:" + scopeTmp);
											//dicoHandler.addExtendingInterfaces(scopeTmp,"Types",_interface_name);
										} else if (type_scope_name[i]['scopeNature'] === 'Relationship') {
											scope_rel.push("add:" + scopeTmp);
											//dicoHandler.addExtendingInterfaces(scopeTmp,"Relationships",_interface_name);
										}
									}
								}
								if (_model.get('ScopeTypes') !== undefined) {
									for (var i = 0; i < _model.get('ScopeTypes').length; i++) {
										var scopeType = _model.get('ScopeTypes')[i];
										if(_model.get('DMSStatus')!=undefined) {
											scope_type.push(scopeType);
											scopes.push(scopeType);
										} else {
											var exist = false;
											for (var j = 0; j < type_scope_name.length; j++) {
												if (type_scope_name[j]['value'] === scopeType) {
													exist = true;
												}
											}
											if (exist) {
												scope_type.push(scopeType);
												//scopes.push(scopeType);
											} else {
												scope_type.push("remove:" + scopeType);
												//dicoHandler.removeExtendingInterfaces(scopeType,"Types",_interface_name);
											}
										}
									}
								}
								if (_model.get('ScopeRelationships') !== undefined) {
									for (var i = 0; i < _model.get('ScopeRelationships').length; i++) {
										var scopeRel = _model.get('ScopeRelationships')[i];
										if(_model.get('DMSStatus')!=undefined) {
											scope_rel.push(scopeRel);
											scopes.push(scopeRel);
										} else {
											var exist = false;
											for (var j = 0; j < type_scope_name.length; j++) {
												if (type_scope_name[j]['value'] === scopeRel) {
													exist = true;
												}
											}
											if (exist) {
												scope_rel.push(scopeRel);
												//scopes.push(scopeRel);
											} else {
												scope_rel.push("remove:" + scopeRel);
												//dicoHandler.removeExtendingInterfaces(scopeRel,"Relationships",_interface_name);
											}
										}
									}
								}
								
								//myPath = myPath + "/resources/dictionary/AggregatorModify?nature=Interface";
								var data = {
									"Name": _interface_name,
									"Nature": "Interface",
									//"Parent": "",
									//"FirstOOTB": "",
									//"Abstract" : "No",
									//"CustomerExposition": "Programmer",
									//"Specializable": "Yes",
									//"Specialization": "No",
									//"Deployment": "Yes",
									//"Customer": "No",
									"Automatic": !this.getField('automatic').checked ? 'No' : 'Yes',
									//"Typing": "No",
									"Package": _model.get('Package'),
									//"Description": interface_comment,
									"ScopeTypes": scope_type,
									"ScopeRelationships": scope_rel,
									"scopes": scopes,
									//"Attributes": {}
								}
								//IR-818199-3DEXPERIENCER2021x S63 Adding DMSStatus if existing
								if(DMSStatus!=undefined)
									data['DMSStatus']=DMSStatus;
								Mask.mask(widget.body);
								webService.aggregatorModify(data, "Interface", function(resp){
									self.onSubmitSuccess(_interface_name,_modeEdit,resp);
								}, function(resp) {
									self.onSubmitFailure(_interface_name,_modeEdit,resp)
								});
								break;
							}
						}
						this._parent.destroy();
					},

				}
			});
			_theInterfaceForm.myValidate = function(){
				if(_modeEdit!="Edit") {
					var txtName = this.getTextInput("interface_name").getValue();
					var regEx = new RegExp("^[0-9]|_");
					if(txtName.startsWith("XP") || regEx.test(txtName) || dicoHandler.isNameExisting(txtName,"Interfaces")) {
						this.getField("interface_name").getParent('.form-group').addClassName('has-error');
						this.dispatchEvent('onInvalid');
						var alert = new Alert({
							visible: true,
							autoHide: true,
							hideDelay: 3000,
							renderTo : this.elements.container,
							messageClassName : 'error',
							messages : myNls.get('popUpNameError'),
						});
						return false;
					}
				}
				return this.validate();
			}
			var inputName = _theInterfaceForm.getField('interface_name');
			inputName.addEventListener('input',function() {
				var spanErrorName = document.getElementById("NameWarning");
				if (spanErrorName == undefined) {
					var parent = this.getParent();
					spanErrorName = UWA.createElement('span', {
						id: "NameWarning"
					});
					// LMT7 IR-867366-3DEXPERIENCER2022x : 09/11/21
					spanErrorName.appendText(myNls.get("AlphaNumericWarning"));
					spanErrorName.setStyle('font-style', 'italic');
					spanErrorName.setStyle('color', '#EA4F37');
					spanErrorName.inject(parent.firstChild);
					spanErrorName.hidden = true;
				}
				var regexAlphaNumeric = new RegExp("^[a-zA-Z0-9]+$");
				if (this.value.length > 0 && !regexAlphaNumeric.test(this.value)) {
					spanErrorName.hidden = false;
					/*var regexRet = new RegExp("^[a-zA-Z0-9]+");
					var res = this.value.match(regexRet);
					if (res != null) {
						this.value = res[0];
					} else {
						this.value = "";
					}*/
				} else {
					spanErrorName.hidden = true;
				}
			});
			var ac = _theInterfaceForm.getAutocompleteInput('scope_name');
			var search = {
				configuration: {
					searchEngine: function(dataset, text) {
						text = text.toLowerCase();
						return dataset.items.filter(function(item) {
							return item.label.toLowerCase().contains(text) || item.subLabel.toString().toLowerCase().contains(text);
						})
					}
				}
			};
			// ac.datasets.items=[];
			// ac.addDataSet();
			dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
			switch (this.modeEdit) {
				case "New":
					search = dicoHandler.getDeploymentExtensibleTypesForAutoComplete(search);
					ac.addDataset(search);
					break;
				case "Edit":
					if (this.model.get('ScopeTypes') && this.model.get('ScopeTypes').length != 0) {
						var isIRPC = dicoHandler.isIRPC(this.model.get('ScopeTypes')[0], 'Types');
						isIRPC ? isIRPC = 'Yes' : isIRPC = 'No';
						search = dicoHandler.getDeploymentExtensibleTypesForAutoComplete(search, isIRPC);
						ac.addDataset(search);
					} else if (this.model.get('ScopeRelationships') && this.model.get('ScopeRelationships').length != 0) {
						var isIRPC = dicoHandler.isIRPC(this.model.get('ScopeRelationships')[0], 'Relationships');
						isIRPC ? isIRPC = 'Yes' : isIRPC = 'No';
						search = dicoHandler.getDeploymentExtensibleTypesForAutoComplete(search, isIRPC)
						ac.addDataset(search);
					} else {
						search = dicoHandler.getDeploymentExtensibleTypesForAutoComplete(search);
						ac.addDataset(search);
					}
					if(this.model.get('DMSStatus')==undefined) {
						for (var i = 0; i < this.model.get('scopes').length; i++) {
							ac.toggleSelect(ac.getItem(this.model.get('scopes')[i]), -1, true);
						}
					} else {
						for (var i = 0; i < this.model.get('scopes').length; i++) {
							ac.disableItem(this.model.get('scopes')[i]);
						}
					}
					break;
				case "AddTo":
					//ac.addDataset(dicoHandler.getExtensibleTypes());
					ac.toggleSelect(ac.getItem(this.model.get('id'), -1, true));
					break;
			}
			return _theInterfaceForm;
		}
	};
	return InterfaceForm;
});

 /**
  * Form to  create a Specialization type, Deployment extension, Specialization extension type
  * and Customer extension type
  */

 define('DS/DMSApp/Views/TypeForm',
   [
     'DS/UIKIT/Form',
     'DS/UIKIT/Input/Text',
     'DS/UIKIT/Input/Toggle',
     'DS/UIKIT/Input/Button',
     'DS/UIKIT/Input/ButtonGroup',
     'DS/UIKIT/Alert',
     'DS/DMSApp/Utils/dictionaryJSONHandler',
     'DS/DMSApp/Views/Layouts/Widgets',
     'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
     'DS/DMSApp/Utils/DMSWebServices',
     'DS/DMSApp/Utils/TypeFormUtils'
   ],
   function(Form, Text, Toggle, Button, ButtonGroup, Alert, dicoHandler, DMSWidgets, myNls, DMSWebServices,utils) {
     "use strict";

     function TypeForm(aModeSubType, aModeEdit, aModel) {
       if (!(this instanceof TypeForm)) {
         throw new TypeError("TypeForm constructor cannot be called as a function.");
       }
       this.modeSubType = aModeSubType;
       this.modeEdit = aModeEdit;
       this.model = aModel;
     }

     TypeForm.TYPE_NAME_FIELD_ID = "type_name";
     TypeForm.INSTANCE_NAME_FIELD_ID = "instance_name";
     TypeForm.TYPE_ICON_FIELD_ID =  "type_icon";
     TypeForm.PARENT_NAME_FIELD_ID = "parent_type";
     TypeForm.ABSTRACT_FIELD_ID = "abstractOption";
     TypeForm.DESCRIPTION_FIELD_ID = "my_comment";
     TypeForm.NLS_FIELD_ID_PREFIX = "nlsInput_";

     TypeForm.HIDE_INSTANCE_FIELD_EVENT_NAME = "hideInstanceField";

     function getParentNameField(aId, aValue, aNewMode) {
       var toRet = {
         type: 'text',
         name: TypeForm.PARENT_NAME_FIELD_ID,
         label: myNls.get("typeFormParentFieldLabel"),
         disabled: true,
         value: aValue,
         id: aId
       };
       if (aNewMode) {
         toRet = {
           type: 'autocomplete',
           name: TypeForm.PARENT_NAME_FIELD_ID,
           label: myNls.get("typeFormParentFieldLabel"),
           required: true,
           allowFreeInput: true,
           showSuggestsOnFocus: true,
           errorText: "SpecialCharacterError ",
           datasets: [{
             items: [],
             configuration: {
               searchEngine: function(dataset, text) {
                 text = text.toLowerCase();
                 var sug = [];
                 dataset.items.forEach(function(item) {
                   if (item.label.toLowerCase().contains(text) || item.subLabel.toLowerCase().contains(text)) {
                     sug.push(item);
                   }
                 });
                 return sug;
               }
             }
           }],
           events: {
             onSelect: function(item) {
               this._parent.dispatchEvent(TypeForm.HIDE_INSTANCE_FIELD_EVENT_NAME, item);
             },
             onUnselect: function() {
               this._parent.dispatchEvent(TypeForm.HIDE_INSTANCE_FIELD_EVENT_NAME);
             }
           }
         };
       }
       return toRet;
     };

     function getNameField(aId, aValue, aEditMode) {
       var toRet = {
         type: 'text',
         name: TypeForm.TYPE_NAME_FIELD_ID,
         label: myNls.get("typeFormNameFieldLabel")
       };
       var delta = {};
       if (aEditMode) {
         delta = {
           disabled: true,
           value: aValue,
           id: aId
         };
       } else {
         delta = {
           required: true,
           placeholder: myNls.get("typeFormNameFieldPlaceholder"),
           helperText: myNls.get("typeFormNameFieldHelper"),
           pattern: "^[a-zA-Z0-9]+$"
         };
       }
       UWA.extend(toRet, delta, true);
       return toRet;
     };

     function getInstanceField(aEditMode) {
       var toRet = {
         type: 'autocomplete',
         name: TypeForm.INSTANCE_NAME_FIELD_ID,
         label: myNls.get("typeFormInstanceFieldHeader"),
         required: false,
         allowFreeInput: true,
         showSuggestsOnFocus: true,
         helperText :  myNls.get('CreateInstNameHelper'),
         errorText: "SpecialCharacterError ",
         datasets: [{
           items: []
         }]
       };
       if(aEditMode) {
         toRet['disabled']=true;
       }
       return toRet;
     };
     
     
     function getIcons(form, model) {
         let iconChanged = !model;
         let iconObj = {};
         for(let iconName of ['IconLarge', 'IconNormal', 'IconSmall']) {
           let iconValue = form.getField(TypeForm.TYPE_ICON_FIELD_ID + '-' + iconName).value;
           if(iconValue) {
             iconChanged = iconChanged || iconValue != model.get(iconName);
             iconObj[iconName] = iconValue;
           } 
         }
         return iconChanged ? iconObj : undefined;
     }
     
     function getIconField(values) {
       var div = UWA.createElement('div', {
         'class': 'myTypeIconDiv'
       });
       UWA.createElement('label', {
         'text': myNls.get("typeFormIconFieldLabel"),
         'title': myNls.get("typeFormIconFieldInfo")
       }).inject(div);
       DMSWidgets.createTypeIconField({
         'name': TypeForm.TYPE_ICON_FIELD_ID,
         'class': 'myTypeIconGroup',
         'styles': {
           'margin-top': "3px",
           'margin-bottom': "3px"
         },
         onIconApplied: function(icon, errors) {
           if(errors.length) DMSWidgets.createAlertBox(errors).inject(pSkeleton.container);
         }
       }, values).inject(div);
       UWA.createElement('span', {
         'class': 'form-control-helper-text',
         'text': myNls.get("typeFormIconFieldInfo")
       }).inject(div);
          
       return {
         type: 'html',
         label: "Icon(NLS)",
         required: false,
         html: div
       };
     }
       
     function getNLS(form, model) {
         var nlsObject = {};
         var type_name = form.getField(TypeForm.TYPE_NAME_FIELD_ID).value;
         form.getFields().forEach(function(item) {
           if (item.name.startsWith(TypeForm.NLS_FIELD_ID_PREFIX)) {
             var key = item.name.split('_')[1];
             var nlsValue = item.value;
             if (key == "en" && nlsValue.length == 0) {
               nlsValue = type_name;
             }
             if (nlsValue.length > 0) {
               nlsObject[key] = nlsValue;
             }
           }
         });
         var nlsFieldChanged = !model || !UWA.equals(nlsObject, model._attributes.NameNLS);
         return nlsFieldChanged ? nlsObject : undefined;
     }


     function getNLSField(aEditMode, aNlsObj) {
       var toRet = {
         type: "html",
         'class': 'form-group',
         name: "abstract02",
         //label: "Abstract(NLS)",
         //value: "False",
         html: new function() {
           var div = UWA.createElement('div', {
             'class': 'myNLSDiv'
           });
           var label = UWA.createElement('label', {
             'text': myNls.get("typeFormNLsFieldLabel")
           });
           var labelHelp = UWA.createElement('i', {
             'text': myNls.get("typeFormNLsFieldHelp")
           });
           var buttonGp = new ButtonGroup({
             type: 'radio',
             // LMT7 IR-867366-3DEXPERIENCER2022x : 05/11/21 Add the NLS of short languages
             buttons: [
               new Button({
                 // value: 'EN',
                 value: myNls.get("shortEnglishNLS"),
                 active: true
               }),
               new Button({
                 // value: 'FR'
                 value: myNls.get("shortFrenchNLS")
               }),
               new Button({
                 // value: 'DE'
                 value: myNls.get("shortGermanNLS")
               }),
               new Button({
                 // value: 'JA'
                 value: myNls.get("shortJapaneseNLS")
               }),
               new Button({
                 // value: 'KO'
                 value: myNls.get("shortKoreanNLS")
               }),
               new Button({
                 // value: 'RU'
                 value: myNls.get("shortRussianNLS")
               }),
               new Button({
                 // value: 'ZH'
                 value: myNls.get("shortChineseNLS")
               })
             ],
             events: {
               onClick: function(e, button) {
                 console.log(button);
                 var nodeList = e.currentTarget.getParent().getElementsByTagName('input');
                 Object.keys(nodeList).forEach(function(t) {
                   if (nodeList.item(t).id.contains(button.getValue().toLowerCase())) {
                     nodeList.item(t).show();
                   } else {
                     nodeList.item(t).hide();
                   }
                   //console.log(e.currentTarget.getParent().getElementsByTagName('input').item(tt).id);
                 });
               }
             }
           });
           buttonGp.buttons.forEach(function(item) {
             if (navigator.language.toLocaleLowerCase().contains(item.getValue().toLocaleLowerCase())) {
               item.setActive(true);
             } else {
               item.setActive(false);
             }
           });


           //var inputTa = buildInputNLS("ta", "Entrez ici votre traduction ...", navigator.language.toLocaleLowerCase());
           label.inject(div);
           labelHelp.inject(div);
           buttonGp.inject(div);
           var inputLangTab = ["en", "fr", "de", "ja", "ko", "ru", "zh"];

           var placeholderValue = myNls.get("typeFormNLsFieldPlaceholder");
           var navLangCode = navigator.language.toLocaleLowerCase();
           inputLangTab.forEach(function(code) {
             var hide = true;
             if (navLangCode.contains(code)) {
               hide = false;
             }
             var input = new Text({
               id: TypeForm.NLS_FIELD_ID_PREFIX + code,
               name: TypeForm.NLS_FIELD_ID_PREFIX + code,
               placeholder: placeholderValue
             });
             if (aEditMode) {
               if (aNlsObj != undefined && aNlsObj.hasOwnProperty(code)) {
                 input.setValue(aNlsObj[code]);
               }
             }
             if (hide) {
               input.hide();
             }
             input.inject(div);
           });
           return div;
         }
       };
       return toRet;
     };

     function getAbstractField(aDisable, aChecked) {
       var toRet = {
         type: "html",
         'class': 'form-group',
         name: "abstract",
         label: "Abstract",
         value: "False",
         html: new function() {

           var label = UWA.createElement('label', {
             'text': myNls.get("typeFormAbstractFieldLabel")
           });
           var labelHelp = UWA.createElement('i', {
             'text': myNls.get("typeFormAbstractFieldDescrip")
           });
           var toggle = new Toggle({
             type: 'switch',
             name: TypeForm.ABSTRACT_FIELD_ID,
             value: 'option1',
             disabled: aDisable,
             label: myNls.get("typeFormAbstractFieldOption")
           }) //.check()
           if (aChecked) {
             toggle.check();
           }
           var div = UWA.createElement('div', {
             'class': 'myAbstractOptDiv'
           });
           label.inject(div);
           labelHelp.inject(div);
           toggle.inject(div);
           return div;
         }
       };
       return toRet;
     };

     function getInstListForAutoComplete(aType) {
       var toRet = [];
       var instanceList = dicoHandler.getInstancesOfType(aType);
       instanceList.forEach(function(item) {
         toRet.push({
           'value': item.Name,
           'label': dicoHandler.getDisplayName(item.Name),
           'subLabel': dicoHandler.getDisplayName(item.Name),
           'element': item
         });
       });
       return toRet;
     };

     function getFormObject(aFields) {
       var _theTypeForm = new Form({
         grid: '4 8',
         // Fields
         fields: aFields,
         // Footer
         /*buttons: [
           // Save Button
           {
             type: 'submit',
             value: myNls.get("typeFormSaveBtnLabel")
           },
           // Cancel Button
           {
             type: 'cancel',
             value: myNls.get("typeFormCancelBtnLabel"),
             id: "myCancelBtn"
           }
         ],*/
       });

       // Cancel Function : Called when the user click on Cancel Button.
       /* _theTypeForm.getContent().getElement('#myCancelBtn').addEvent('click', function() {
          _theTypeForm._parent.destroy();
        });*/
       return _theTypeForm;
     };

     function setParentNameAutoComplete(aFormObj) {
       var parentNameAuto = aFormObj.getAutocompleteInput(TypeForm.PARENT_NAME_FIELD_ID);
       if (parentNameAuto != undefined) {
         // ! Important : this field need to dispatch an event to the Form.
         parentNameAuto._parent = aFormObj;
         parentNameAuto.elements.input.onchange = function() {
           if (parentNameAuto.selectedItems.length == 0 || parentNameAuto.selectedItems[0].label != this.value) {
             parentNameAuto.reset();
           }
         }
         // Fill the autocomplete
         dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
         dicoHandler.getAllSpecializableAggregator().forEach(function(item) {
           parentNameAuto.addItems({
             'value': item.Name,
             'label': widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getNLSName(item.Name, item.Nature) : dicoHandler.getDisplayName(item.Name),
             'subLabel': widget.getValue("DisplayOption") === "NLSOption" ? dicoHandler.getDisplayName(item.Name) : dicoHandler.getNLSName(item.Name, item.Nature),
             'element': item
           }, parentNameAuto.datasets[0]);
         });
       }
     };

     function nameFieldOnInput() {
       var spanErrorName = document.getElementById("NameWarning");
       if (spanErrorName == undefined) {
         spanErrorName = UWA.createElement('span', {
           id: "NameWarning"
         });
         // LMT7 IR-867366-3DEXPERIENCER2022x : 09/11/21
         spanErrorName.appendText(myNls.get("AlphaNumericWarning"));
         spanErrorName.setStyle('font-style', 'italic');
         spanErrorName.setStyle('color', '#EA4F37');
         var parent = this.getParent();
         spanErrorName.inject(parent.firstChild);
         spanErrorName.hidden = true;

       }
       var regexAlphaNumeric = new RegExp("^[a-zA-Z0-9]+$");
       if (this.value.length > 0 && !regexAlphaNumeric.test(this.value)) {
         spanErrorName.hidden = false;
         /*var regexRet = new RegExp("^[a-zA-Z0-9]+");
         var res = this.value.match(regexRet);
         if (res != null) {
           this.value = res[0];
         } else {
           this.value = "";
         }*/
       } else {
         spanErrorName.hidden = true;
       }

     };

     function submitFuncForNewType() {
       dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
       // Step 1 : Retrieve data
       // Name
       var type_name = this.getField(TypeForm.TYPE_NAME_FIELD_ID).value;
       // Parent
       var parentTypeAutoComplete = this.getAutocompleteInput(TypeForm.PARENT_NAME_FIELD_ID);
       var selectedParentElem = undefined;
       if (parentTypeAutoComplete != undefined) {
         if (parentTypeAutoComplete.selectedItems.length > 0)
           selectedParentElem = parentTypeAutoComplete.selectedItems[0].element;
       } else {
         // Edit Mode
         var parent_id = model.id;
         var parent_nature = model._attributes.nature;
         selectedParentElem = dicoHandler.getAgregatorByNameAndNature(parent_id, parent_nature);
       }
       // Instance Name
       var instAutoComplete = this.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
       //S63 FUN124741 un devra peut être pouvoir avoir plusieurs instances
       if(instAutoComplete) {
         var selectedInstance = instAutoComplete.selectedItems;
        }

       // Icon Name
       var iconObj = getIcons(this);

       // NLS Translations
       var nlsObj = getNLS(this);

       // Abstract
       var type_abstract = this.getField(TypeForm.ABSTRACT_FIELD_ID).checked;
       // Description
       var type_comment = ""; //this.getField(TypeForm.DESCRIPTION_FIELD_ID).value;

       var typeToCreate = dicoHandler.buildTypeForCreation(type_name, selectedParentElem, selectedInstance, iconObj, nlsObj, type_abstract, type_comment);

       //var fileInput = document.getElementById('file-input_Large');
       //var formData = new FormData();
       //formData.append('small', fileInput.files[0], fileInput.files[0].fileName);
       /*var iconData = {
         Type: typeToCreate.Name,
         IconName: "myIcon_" + typeToCreate.Name+".png",
         IconLarge: iconObj.IconLarge.split('base64,')[1]
       }
       DMSWebServices.postIcon(iconData, function() {
         console.log("on success")
       }, function() {
         console.log("on faillure")
       });*/
       // Step 2 : build the object to send

       console.log(typeToCreate);
       DMSWebServices.aggregatorCreate(typeToCreate, typeToCreate.Nature, function onComplete(resp) {

         console.log("onComplete response:");
         console.log(resp);
         pSkeleton.getCollectionAt(1).reset();
         var langCode = widget.lang;
         if (langCode == "zh") {
           langCode = "zh_CN";
         }
         pSkeleton.getCollectionAt(1).fetch({
           data: {
             maxAge: 0,
             lang: langCode
           },
           onComplete: function(collection, response, options) {
             console.log(collection);
             var modelOfCreatedType = pSkeleton.getCollectionAt(1).findWhere({
               id: typeToCreate.Name
             });
             var newTypeElem = pSkeleton.getViewAt(1).contentsViews.tile.nestedView.getChildView(modelOfCreatedType);
             newTypeElem.select();
           }
         });
       }, function onFaillure(resp) {
         var alert = new Alert({
           visible: true,
           closeOnClick: true,
           renderTo: pSkeleton.container,
           messageClassName: 'error',
           messages: resp,
           autoHide: true,
           hideDelay: 3000
         });
         console.log("onFailure error:");
         console.log(err);
         console.log("onFailure response:");
         console.log(resp);
       });
       this._parent.destroy();

     };

     function submitFuncForEditType() {
       dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
       // Step 1 : Retrieve data
       // Name
       var type_name = this.getField(TypeForm.TYPE_NAME_FIELD_ID).value;
       // Parent
       var parent_id = this.model.id;
       var parent_nature = this.model._attributes.nature;

       // Instance Name
       //S63 FUN124741 On devra peut être pouvoir modifier les instances
       //var instAutoComplete = this.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
       var selectedInstances = [];//Pour le moment on n'autorise pas l'edit = instAutoComplete.selectedItems;

       // Icon Name
       var iconObj = getIcons(this, this.model);

       // NLS Translations
       var nlsObj = getNLS(this, this.model);
       
       // BMN2 29/01/2021 : We will only call the webserice if we detect any changes
       if (iconObj || nlsObj) {
         var typeToModify = dicoHandler.buildTypeForModif(parent_id, parent_nature, iconObj, nlsObj, selectedInstances);

         // Step 2 : build the object to send

         console.log(typeToModify);
         DMSWebServices.aggregatorModify(typeToModify, typeToModify.Nature, function onComplete(resp) {
           console.log("onComplete response:");
           console.log(resp);
           pSkeleton.getCollectionAt(1).reset();
           var langCode = widget.lang;
           if (langCode == "zh") {
             langCode = "zh_CN";
           }
           pSkeleton.getCollectionAt(1).fetch({
             data: {
               maxAge: 0,
               lang: langCode
             },
             onComplete: function(collection, response, options) {
               console.log(collection);
               var modelOfCreatedType = pSkeleton.getCollectionAt(1).findWhere({
                 id: typeToModify.Name
               });
               UWA.extend(pSkeleton.getModelAt(2)._attributes, modelOfCreatedType._attributes, true);
               pSkeleton.getActiveIdCard().render();
               // Il faut mettre à jour la collection/model avant de faire un render()
               // pour que la colonne "owner" soit mise à jour.
               pSkeleton.getViewAt(2).render();
             }
           });
         }, function onFaillure(resp) {
           var alert = new Alert({
             visible: true,
             closeOnClick: true,
             renderTo: pSkeleton.container,
             messageClassName: 'error',
             messages: resp,
             autoHide: true,
             hideDelay: 3000
           });
           console.log("onFailure response:");
           console.log(resp);
         });
         this._parent.destroy();
       }

     };

     function submitFuncForSubType() {
       dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
       // Step 1 : Retrieve data
       // Name
       var type_name = this.getField(TypeForm.TYPE_NAME_FIELD_ID).value;
       // Parent

       var selectedParentElem = undefined;

       // Edit Mode
       var parent_id = this.model.id;
       var parent_nature = this.model._attributes.nature;
       selectedParentElem = dicoHandler.getAgregatorByNameAndNature(parent_id, parent_nature);

       // Instance Name
       var instAutoComplete = this.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
       //S63 FUN124741 un type doit pouvoir avoir plusieurs instances
       if(instAutoComplete) {
         var selectedInstance = instAutoComplete.selectedItems;
        }

       // Icon Name
       var iconObj = getIcons(this, this.model);

       // NLS Translations
       var nlsObj = getNLS(this, this.model);

       // Abstract
       var type_abstract = this.getField(TypeForm.ABSTRACT_FIELD_ID).checked;
       // Description
       var type_comment = ""; //this.getField(TypeForm.DESCRIPTION_FIELD_ID).value;

       var typeToCreate = dicoHandler.buildTypeForCreation(type_name, selectedParentElem, selectedInstance, iconObj, nlsObj, type_abstract, type_comment);

       // Step 2 : build the object to send

       console.log(typeToCreate);
       // Step 3 : Call of the webservice

       DMSWebServices.aggregatorCreate(typeToCreate, typeToCreate.Nature, function onComplete(resp) {
         console.log("onComplete response:");
         console.log(resp);
         var curPanel = pSkeleton.getCurrentPanelIndex();
         pSkeleton.getCollectionAt(curPanel - 1).reset();
         var langCode = widget.lang;
         if (langCode == "zh") {
           langCode = "zh_CN";
         }
         pSkeleton.getCollectionAt(curPanel - 1).fetch({
           data: {
             maxAge: 0,
             lang: langCode
           },
           onComplete: function(collection, response, options) {
             console.log(collection);
             pSkeleton.getCollectionAt(curPanel).reset();
             pSkeleton.getCollectionAt(curPanel).fetch();
           }
         });
       }, function onFailure(resp) {
         var alert = new Alert({
           visible: true,
           closeOnClick: true,
           renderTo: pSkeleton.container,
           messageClassName: 'error',
           messages: resp,
           autoHide: true,
           hideDelay: 3000
         });
         console.log("onFailure error:");
         console.log(err);
         console.log("onFailure response:");
         console.log(resp);
       });
       this._parent.destroy();
     };

     TypeForm.prototype = {
       constructor: TypeForm,
       buildForNew: function() {
         var fields = [];
         fields.push(getParentNameField("", "", true));
         // Instance Field
         if (widget.getValue("instField") == "show") {
           fields.push(getInstanceField());
         }
         // Name Field
         fields.push(getNameField("", "", false));
         // Icon Field
         fields.push(getIconField());
         // NLS Translation Field
         fields.push(getNLSField(false));
         // Abstract with select(true/false)
         fields.push(getAbstractField(false, false));
         
         var _theTypeForm = getFormObject(fields);
         setParentNameAutoComplete(_theTypeForm);
         
         
         var inputName = _theTypeForm.getField(TypeForm.TYPE_NAME_FIELD_ID);
         // Control the input of the type name field
         inputName.addEventListener("input", nameFieldOnInput);

         _theTypeForm.addEvent(TypeForm.HIDE_INSTANCE_FIELD_EVENT_NAME, function(item) {
           var field = _theTypeForm.getField(TypeForm.INSTANCE_NAME_FIELD_ID);
           if (field != undefined) {
              var inst_AutoComplete = _theTypeForm.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
              //S63 FUN124741 Attention si on ne clean pas le dataSet on se retrouve avec des doublons, pire on peut avoir une instance selectionné alors que le champs a disparu
              inst_AutoComplete.cleanDataset(inst_AutoComplete.datasets[0]['id'])
             if (item != undefined && item.element.Nature == "Type") {
               dicoHandler.init(pSkeleton.dico_CUSTO, pSkeleton.dico_OOTB);
               var accessCreateInstField = dicoHandler.accessCreateInstField(item.element.Name);
               field.getParent().getParent().getParent().hidden = !accessCreateInstField;
               if (accessCreateInstField) {
                 // Remplir l'autocomplete du champs Instance.
                 console.log(item.element.Name);
                 inst_AutoComplete.addItems(utils.getInstListForAutoComplete(dicoHandler,item.element), inst_AutoComplete.datasets[0]);
               }
             } else {
               field.getParent().getParent().getParent().hidden = true;
             }
           }
         });
         // Display of Instance
         var field = _theTypeForm.getField(TypeForm.INSTANCE_NAME_FIELD_ID);
         if (field) {
           field.getParent().getParent().getParent().hidden = true;
           if (this.modeSubType && this.model != undefined && this.model._attributes.nature == "Type" && dicoHandler.accessCreateInstField(this.model.get('id'))) {
             field.getParent().getParent().getParent().hidden = false;
             var inst_AutoComplete = _theTypeForm.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
             var parent_type = dicoHandler.getAgregatorByNameAndNature(this.model.id, this.model._attributes.nature);
             inst_AutoComplete.addItems(utils.getInstListForAutoComplete(dicoHandler,parent_type), inst_AutoComplete.datasets[0]);
           }
         }

         // Submit Function : Called when the user click on Save Button.
         var opts = {
           events: {
             onSubmit: submitFuncForNewType
           }
         };
         _theTypeForm.setOptions(opts);
         _theTypeForm.myValidate = function() {
           var txtName = this.getTextInput(TypeForm.TYPE_NAME_FIELD_ID).getValue();
           var regEx = new RegExp("^[0-9]|_");
           // BMN2 10/09/2021 : IR-860013-3DEXPERIENCER2022x
           // Add check for newable interfaces like Robot.
           if (txtName.startsWith("XP") || regEx.test(txtName) || dicoHandler.isNameExisting(txtName, "Types") || dicoHandler.isNameExisting(txtName, "Relationships") || dicoHandler.isNameExisting(txtName, "Interfaces")) {
             this.getField(TypeForm.TYPE_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
             this.dispatchEvent('onInvalid');
             var alert = new Alert({
               visible: true,
               autoHide: true,
               hideDelay: 2000
             }).inject(this.elements.container);
             alert.add({
               className: 'error',
               message: myNls.get('popUpNameError')
             });
             return false;
           }
           return this.validate();
         };
         return _theTypeForm;
       },
       buildForEdit: function() {
         var self = this;
         var fields = [];
         // Parent Name : Edit Mode
         fields.push(getParentNameField(this.model.get('parent'), this.model.get('subtitle'), false));
         // Instance Field
         if (widget.getValue("instField") == "show") {
          fields.push(getInstanceField(true));
         }
         // Type Name
         fields.push(getNameField(this.model.get('id'), this.model.get('title'), true));
         var type_name = this.model.get('title');
         // Icon Field
         fields.push(getIconField({
           IconLarge: this.model.get("IconLarge"),
           IconNormal: this.model.get("IconNormal"),
           IconSmall: this.model.get("IconSmall")
         }));
         // NLS Fields
         fields.push(getNLSField(true, this.model._attributes["NameNLS"]));
         // Abstract
         var abstractValue = this.model._attributes["isAbstract"] === "Yes" ? true : false;
         fields.push(getAbstractField(true, abstractValue));
         var _theTypeForm = getFormObject(fields);
         // Display of Instance
         var field = _theTypeForm.getField(TypeForm.INSTANCE_NAME_FIELD_ID);
         if (field != undefined) {
          field.getParent().getParent().getParent().hidden = true;
           if (this.model != undefined && this.model.get('nature') == "Type" && dicoHandler.accessCreateInstField(this.model.get('id'))) {
             var inst_AutoComplete = _theTypeForm.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
             var parent_type = dicoHandler.getAgregatorByNameAndNature(this.model.id, this.model._attributes.nature);
             var instList = utils.getInstListForEditAutoComplete(dicoHandler, parent_type);
             inst_AutoComplete.addItems(instList, inst_AutoComplete.datasets[0]);
             field.getParent().getParent().getParent().hidden = false;
           }
         }
         // Submit Function : Called when the user click on Save Button
         var opts = {
           events: {
             onSubmit: submitFuncForEditType
           }
         };
         _theTypeForm.setOptions(opts);
         _theTypeForm.model = this.model;
         _theTypeForm.myValidate = function() {
           // Icon Name
           var iconObj = getIcons(_theTypeForm, _theTypeForm.model);
           // NLS Fields
           var nlsObject = getNLS(_theTypeForm, _theTypeForm.model);
           // We will validate the form only if we detect at least one change,
           // so we avoid to call the submit function unnecessarily.
           return (iconObj || nlsObject);
         };
         return _theTypeForm;
       },
       buildForSubType: function() {
         var fields = [];
         // Parent Name : Sub Type Mode
         fields.push(getParentNameField(this.model.get('id'), this.model.get('title'), false));
         if (widget.getValue("instField") == "show") {
           // Instance Field
           fields.push(getInstanceField());
         }
         // Name Field
         fields.push(getNameField("", "", false));
         // Icon Field
         fields.push(getIconField());
         // NLS Translation Field
         fields.push(getNLSField(false));
         // Abstract with select(true/false)
         fields.push(getAbstractField(false, false));
         var _theTypeForm = getFormObject(fields);
         var inputName = _theTypeForm.getField(TypeForm.TYPE_NAME_FIELD_ID);
         // Control the input of the type name field
         inputName.addEventListener("input", nameFieldOnInput);

         // Display of Instance
         var field = _theTypeForm.getField(TypeForm.INSTANCE_NAME_FIELD_ID);
         if (field != undefined) {
           field.getParent().getParent().getParent().hidden = true;
           if (this.model != undefined && this.model._attributes.nature == "Type" && dicoHandler.accessCreateInstField(this.model.get('id'))) {
             var inst_AutoComplete = _theTypeForm.getAutocompleteInput(TypeForm.INSTANCE_NAME_FIELD_ID);
             var parent_type = dicoHandler.getAgregatorByNameAndNature(this.model.id, this.model._attributes.nature);
             var instList = utils.getInstListForAutoComplete(dicoHandler, parent_type);
             if (instList.length > 0) {
               field.getParent().getParent().getParent().hidden = false;
             }
             inst_AutoComplete.addItems(instList, inst_AutoComplete.datasets[0]);
           }
         }
         // Submit Function : Called when the user click on Save Button.
         var opts = {
           events: {
             onSubmit: submitFuncForSubType
           }
         };
         _theTypeForm.setOptions(opts);
         _theTypeForm.model = this.model;
         _theTypeForm.myValidate = function() {
           var txtName = this.getTextInput(TypeForm.TYPE_NAME_FIELD_ID).getValue();
           var regEx = new RegExp("^[0-9]|_");
           // BMN2 10/09/2021 : IR-860013-3DEXPERIENCER2022x
           // Add check for newable interfaces like Robot.
           if (txtName.startsWith("XP") || regEx.test(txtName) || dicoHandler.isNameExisting(txtName, "Types") || dicoHandler.isNameExisting(txtName, "Relationships") || dicoHandler.isNameExisting(txtName, "Interfaces")) {
             this.getField(TypeForm.TYPE_NAME_FIELD_ID).getParent('.form-group').addClassName('has-error');
             this.dispatchEvent('onInvalid');
             var alert = new Alert({
               visible: true,
               autoHide: true,
               hideDelay: 2000
             }).inject(this.elements.container);
             alert.add({
               className: 'error',
               message: myNls.get('popUpNameError')
             });
             return false;
           }
           return this.validate();
         };
         return _theTypeForm;
       }
     };
     return TypeForm;
   });

define('DS/DMSApp/Utils/Renderers/RootRenderer',
  ['UWA/Class/Model',
    'UWA/Class/Collection',
    'UWA/Class/View',
    'DS/W3DXComponents/Skeleton',
    'DS/W3DXComponents/Collections/ActionsCollection',
    'DS/W3DXComponents/Views/Layout/ListView',
    'DS/W3DXComponents/Views/Layout/GridScrollView',
    'DS/W3DXComponents/Views/Item/TileView',
    'DS/W3DXComponents/Views/Layout/TableScrollView',
    'DS/DMSApp/Views/TypeForm',
    'DS/UIKIT/DropdownMenu',
    'DS/UIKIT/Autocomplete',
    'WebappsUtils/WebappsUtils',
    'i18n!DS/DMSApp/assets/nls/DMSAppNLS',
    'DS/DMSApp/Views/InterfaceForm',
    'DS/DMSApp/Views/CustomModal'
  ],
  function(Model, Collection, View, Skeleton, ActionsCollection, ListView, GridScrollView, TileView, TableScrollView, TypeForm, DropdownMenu, Autocomplete, WebappsUtils, myNls, InterfaceForm, CustomModal) {
    "use strict"
    var rootMenu = {
      collection: 'DS/DMSApp/Collections/DMSMenuCollection',
      /*
      When the View is not defined, it will fallback either to
      - 'DS/W3DXComponents/Views/Item/SkeletonRootView' for the CollectionView in the root panel
      or
      - 'DS/W3DXComponents/Views/Layout/ListView' for CollectionView other than the root panel
      */
      test: WebappsUtils.getWebappsAssetUrl('DMSApp', 'DMSTools.json'),
      view: ListView, //'DS/DMSApp/views/toolsRenderer',
      // General View options
      viewOptions: {
        useInfiniteScroll: false,
        usePullToRefresh: false,
        contents: {
          events: {
          }
        }
      },
      idCardOptions: {
        attributesMapping: {
          title: 'title',
          description: 'subtitle'
        },
        /*
          Facets are extra panels, that will instantiate a CollectionView if they contains Skeleton.getRendererHandler('RendererName').
          They receive the Model as parameter.
          The properties "businessRules" and "processRender" exist in the renderer map.
          */
        facets: function() {
          if (this.id === "1") {
            return [{
              text: 'Types View',
              icon: 'fonticon fonticon-list',
              name: 'global',
              /*
              Skeleton static method: function that handles the rendering of the view.
              Parameter can be either a String or a View.
              If Parameter is a string, it references another Renderer.
              */
              handler: Skeleton.getRendererHandler('types')
            }]
          } else if (this.id === "2") {
            return [{
              text: 'Group of attributes View',
              icon: 'fonticon fonticon-list',
              name: 'global',
              handler: Skeleton.getRendererHandler('attributesGroup')
            }]
          } else if (this.id === "3") {
        	  return [{
        		  text: 'Extensions View',
        		  icon: 'fonticon fonticon-list',
        		  name: 'global',
        		  handler: Skeleton.getRendererHandler('Extensions')
        	  }]
          } else if (this.id === "4") {
        	  return [{
        		  text: 'Uniquekeys View',
        		  icon: 'fonticon fonticon-list',
        		  name: 'global',
              handler: Skeleton.getRendererHandler('uniquekey')
        	  }]
          } else if (this.id === "5") {
        	  return [{
        		  text: 'Tools',
        		  icon: 'fonticon fonticon-list',
        		  name: 'global',
        		  handler: Skeleton.getRendererHandler('tools')
        	  }]
          } else {
            /*return [{
              text: 'AttributesGroup View',
              icon: 'fonticon fonticon-list',
              name: 'global',
              /*
              Skeleton static method: function that handles the rendering of the view.
              Parameter can be either a String or a View.
              If Parameter is a string, it references another Renderer.
              */
            /*handler: Skeleton.getRendererHandler('tools')
            }]*/
          }
        },

        events: {
        }
      }
    };
    return rootMenu;
  });

define('DS/DMSApp/Models/UniquekeyModel',

  ['UWA/Core',
    'UWA/Class/Model',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/dictionaryJSONHandler'
  ],
  function(UWA, Model, WebappsUtils, dicoHandler) {
    "use strict";

    return Model.extend({
      defaults: function() {
        //UWA.log("TypeModel::setDefault");
        //UWA.log(this);
        return {
          //Metadata associated with the model returned
          //Every model must specify an ID
          id: 'default',
          //Title and Image are properties that can be displayed in the Tile Object
          title: 'not found',
          subtitle: '',
          content: '',
          image: '', //WebappsUtils.getWebappsAssetUrl('DMSApp',"GroupAttrIcon.png"),
          //Additional Properties for the IDCard
          ownerName: 'Owner',
          //date           : ,
          Description: '',
          //Additional Properties for data model
          isAbstract: 'Abstract : ?'
        };
      },
      setup: function() {
        //UWA.log("TypeModel::setup");
        //UWA.log(this);
      },
      parse: function(response, options) {
        //UWA.log("TypeModel::parse");
        var that = this;
        var resultat;
        var internalName = response['Name'];
        var externalName = dicoHandler.getDisplayName(internalName);
        var typeExternalName = dicoHandler.getDisplayName(response['Type']);
        var interfaceExternalName = dicoHandler.getDisplayName(response['Interface']);
        var nls_Option = widget.getValue("DisplayOption");
        if (nls_Option === "NLSOption") {
          typeExternalName = dicoHandler.getNLSName(response['Type'], "Type");
          interfaceExternalName = dicoHandler.getNLSName(response['Interface'], "Interface");
        }
        var attributes = [];
        if (response['Attributes']) {
          var key = Object.keys(response['Attributes']);
          if (Array.isArray(key)) {
            key.forEach(function(iElement) {
              attributes.push(response['Attributes'][iElement]);
            });
          }
        }
        resultat = {
          //Metadata associated with the model returned
          //Every model must specify an ID
          id: internalName,
          //Title and Image are properties that can be displayed in the Tile Object
          title: externalName,
          //Additional Properties for data model
          attributes: attributes,
          subtitle: typeExternalName,
          nature: response['Nature'],
        //  isOOTB: dicoHandler.isOOTBAgregator(response.Name, response.Nature) ? "Yes" : "No",
          Package: response['Package'],
          Type: response['Type'],
          externalTypeName:typeExternalName,
          externalInterfaceName:interfaceExternalName,
          Interface: response['Interface'],
          image:  WebappsUtils.getWebappsAssetUrl('DMSApp',"icons/uniquekeyIcon.png"),
          Enabled: response['Enabled'],
          DMSStatus: response['DMSStatus'],
        //  Description: response['Description'] ? response['Description'] : "",
        //  NameNLS: response['NameNLS'],
          handler: function() {
            that.dispatchEvent('onActionClick', [that, {
              model: action
            }, arguments[0]]);
          }
        };

        return resultat;
      },
      sync: function(method, model, options) {
        //UWA.log(this);
        var id, attrs, idAttrName, resp, errorMessage;
        if (method === 'create' || method === 'update' || method === 'patch') {
          attrs = model.toJSON(options);
        }
        id = model.id;
        idAttrName = model.idAttribute;
      }
    });
  });

define('DS/DMSApp/Collections/UniquekeyCollection',
  [
    'UWA/Core',
    'UWA/Class/Collection',
    'DS/DMSApp/Models/UniquekeyModel',
    'WebappsUtils/WebappsUtils',
    'DS/DMSApp/Utils/URLHandler',
    'DS/WAFData/WAFData',
    'DS/DMSApp/Utils/dictionaryJSONHandler'
  ],
  function(UWA, Collection, Uniquekey, WebappsUtils, URLHandler, WAFData, dicoHandler) {
    "use strict";


    return Collection.extend({
      //No initial model passed, because there is only 1 Tile ("Manage Business Rule").
      model: Uniquekey,
      /*
      Setup function is called when initializing a newly created instance of collection.
      It is not called in my application code because it is internally used.
      It is a good practice to implement it when sub-classing a collection, when we need a particular initialization logic.
      */
      setup: function() {
        UWA.log("DMSTypes::setup");
        //debugger;
        this.url = URLHandler.getURL() + "/resources/dictionary/DictionaryCUSTO";
      },
      title_sort_dir: 'asc',
      parent_sort_dir: 'asc',
      sort_elem: 'title',
      full_dico: null,
      comparator: function(modelA, modelB) {
        //UWA.log("DMSTypes::comaprator");
        var ret = modelA._attributes[this.sort_elem].localeCompare(modelB._attributes[this.sort_elem]);
        if (this.sort_elem == "title")
          return this.title_sort_dir == "asc" ? ret : -ret;
        else if (this.sort_elem == "subtitle") {
          return this.parent_sort_dir == "asc" ? ret : -ret;
        }
      },
      //comparator:"title",

      /*
      Sync function is used to customize the manner in which a collection resource data is fetched from the backend.
      It is not called in my application code because it is internally used.
      */
      sync: function(method, collection, options) {
        UWA.log("DMSTypes::sync");
        //options.lang=WidgetServices.getLanguage();
        options.lang = widget.lang;
        options.type = 'json';
        options.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'SecurityContext': URLHandler.getSecurityContext()
        };
        options.sort = true;
        options.reset = this.myReset ? true : false;
        options = Object.assign({
          ajax: WAFData.authenticatedRequest
        }, options);
        this._parent.apply(this, [method, collection, options]);
      },

      /*
      Parse function is used to transform the backend response into an array of models.
      It is not called in my application code because it is internally used.
      The parameter "data" corresponds to the raw response object returned by the backend API.

      It returns the array of model attributes to be added to the collection.
      */
      parse: function(data) {
        UWA.log("DMSTypes::parse");

        dicoHandler.init(data, pSkeleton.dico_OOTB);
        var paramReturned = [];
        Object.keys(data.Dictionary.UniqueKeys).forEach((item, i) => {
          paramReturned.push(data.Dictionary.UniqueKeys[item]);
        });
        var headerValue = pSkeleton.getActiveIdCard().container.getElementsByTagName('span')[0].innerText;
        var val = headerValue.split('|');
        pSkeleton.getActiveIdCard().container.getElementsByTagName('span')[0].innerText = val[0] + " | " + paramReturned.length;


        return paramReturned;

      },
    });
  });

