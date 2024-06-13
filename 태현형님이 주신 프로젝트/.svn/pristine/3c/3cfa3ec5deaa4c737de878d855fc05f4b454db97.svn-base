var fakeStyle = { filter: {}, opacity: {} };
var document = self.document = {
  style: fakeStyle, parentNode: null, nodeType: 9,
  title: "webworkerstitle",
  createEvent: function(a) { return a; },
  toString: function () { return "FakeDocumentWorker;" }
};
var window = self.window = self;
window.dispatchEvent = function (a) { return a; };
window.location = "fakelocationWorker";
window.location.hash = "fakelocationHashWorker";
window.enoviaServer = true;
// WARNING: if not correct web workers wont load
// 
window.dsDefaultWebappsBaseUrl = "..";
window.COMPASS_CONFIG = {};
var fakeElement = Object.create(document);
fakeElement.nodeType = 1;
fakeElement.toString = function () { return "FakeElementWorker" };
fakeElement.parentNode = fakeElement.firstChild = fakeElement.lastChild = fakeElement;
fakeElement.ownerDocument = document;
fakeElement.style = fakeStyle;
fakeElement.title = "fakeTitleWorker";
fakeElement.createEvent = function(a) { return a; };

document.head = document.body = fakeElement;
document.ownerDocument = document.documentElement = document;
document.getElementById = document.createElement = function (...params) { return fakeElement; };
document.createDocumentFragment = function () { return this; };
document.getElementsByTagName = document.getElementsByClassName = function () { return [fakeElement]; };
document.getAttribute = document.setAttribute = document.removeChild =
    document.addEventListener = document.removeEventListener =
    function () { return null; };
document.cloneNode = document.appendChild = function () { return this; };
document.appendChild = function (child) { return child; };
document.childNodes = [];
document.implementation = {
    createHTMLDocument: function () { return document; },
    hasFeature: function (...params) { return false; }
}

var localStorage = {
    getItem: function (...params) { return undefined; }
};

// need to declare a parent variable to not have PlatformAPI load error triggering dependencies
window.document = document;
var parent = window;
