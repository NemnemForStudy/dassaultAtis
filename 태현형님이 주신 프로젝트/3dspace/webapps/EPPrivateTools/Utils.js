define('DS/EPPrivateTools/Utils', [], function () {
	'use strict';

	var Utils = {};

	// Creates an HTML element
	Utils.html = function (iType, iContent, iClassName, iId, iExtraProperties) {
		var newElem = document.createElement(iType);

		if (iClassName) {
			newElem.className = iClassName;
		}

		if (iId) {
			newElem.id = iId;
		}

		if (iExtraProperties) {
		    var keys = Object.keys(iExtraProperties);
		    for (var i = 0; i < keys.length; ++i) {
		        var k = keys[i];
		        newElem[k] = iExtraProperties[k];
		    }
		}

		if (typeof iContent === 'string' || typeof iContent === 'number' || typeof iContent === 'boolean') {
			newElem.textContent = iContent;
		}
		else {
			if (iContent && iContent.constructor === Array) {
				for (var j = 0; j < iContent.length; ++j) {
					newElem.appendChild(iContent[j]);
				}
			}
		}
		return newElem;
	};

	Utils.emptyHtml = function (iDomElement) {
		while (iDomElement.firstChild) {
			iDomElement.removeChild(iDomElement.firstChild);
		}
	};


	Utils.detachHtmlFromDom = function (iDomElement) {
		iDomElement.parentNode.removeChild(iDomElement);
	};


	Utils.emitEvent = function (iEventName, iEventParameters, iEmitter) {
		var newEvent = new CustomEvent(iEventName, {
			detail: iEventParameters
		});

		var emitter = iEmitter || window;
		emitter.dispatchEvent(newEvent);
	};

	Utils.listenEvent = function (iEventName, iCallback, iListener) {
		var listener = iListener || window;
		listener.addEventListener(iEventName, iCallback);
	};

	Utils.removeListener = function (iEventName, iCallback, iListener) {
		var listener = iListener || window;
		listener.removeEventListener(iEventName, iCallback);
	};



	Utils.loadJS = function (path, callback) {
		var script = document.createElement('script');
		script.type = 'text/JavaScript';
		script.src = path;
		if (callback !== undefined && callback !== null) {
			script.onload = callback;
			script.onreadystatechange = callback;
		}
		document.getElementsByTagName('head')[0].appendChild(script);
	};

	Utils.loadCSS = function (path, callback) {
		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = path;
		if (callback !== undefined && callback !== null) {
			link.onload = callback;
			link.onreadystatechange = callback;
		}
		document.getElementsByTagName('head')[0].appendChild(link);
	};

	Utils.copyTextToClipboard = function (iText) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(iText);
		}
		else {
			var textArea = Utils.html('textarea', iText);
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
		}
    };

    Utils.readValueinObjectSS = function (iObjectKey, iKey) {
		var objectValue = Utils.readSS(iObjectKey);
		if (objectValue){
			return objectValue[iKey];
		}
		return undefined;
	};

	Utils.readValueinObjectLS = function (iObjectKey, iKey) {
		var objectValue = Utils.readLS(iObjectKey);
		if (objectValue){
			return objectValue[iKey];
		}
		return undefined;
	};

	Utils.removeValueinObjectLS = function (iObjectKey, iKey) {
		var objectValue = Utils.readLS(iObjectKey);
		if (objectValue){
			delete objectValue[iKey];
			Utils.storeLS(iObjectKey, objectValue);
		}

	};

	Utils.pushInObjectLS = function (iObjectKey, iKey, iValue) {
		var objectValue = Utils.readLS(iObjectKey);
		objectValue[iKey] = iValue;
		Utils.storeLS(iObjectKey, objectValue);
    };

    Utils.pushInObjectSS = function (iObjectKey, iKey, iValue) {
		var objectValue = Utils.readSS(iObjectKey);
		objectValue[iKey] = iValue;
		Utils.storeSS(iObjectKey, objectValue);
	};

	Utils.pushInArrayLS = function (iObjectKey, iValue) {
		var objectValue = Utils.readLS(iObjectKey) || [];
		objectValue.push(iValue);
		Utils.storeLS(iObjectKey, objectValue);
	};

	Utils.storeLS = function(key, value){
		window.localStorage.setItem(key, JSON.stringify(value));
	};

	Utils.readLS = function(key) {
		try {
			return JSON.parse(window.localStorage.getItem(key));
		} catch (e) {
			return window.localStorage.getItem(key);
		}
    };

    Utils.storeSS = function(key, value){
		window.sessionStorage.setItem(key, JSON.stringify(value));
	};

    Utils.readSS = function(key) {
		try {
			return JSON.parse(window.sessionStorage.getItem(key));
		} catch (e) {
			return window.sessionStorage.getItem(key);
		}
    };

    Utils.removeSS = function(key) {
		window.sessionStorage.removeItem(key);
	};

	Utils.removeLS = function(key) {
		window.localStorage.removeItem(key);
	};

	Utils.dateNow = function () {
		var now = new Date();
		var month = String(now.getMonth() + 1);
		var day = String(now.getDate());
		var year = now.getFullYear();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();

		if (month.length < 2) { month = '0' + month; }
		if (day.length < 2) { day = '0' + day; }
		if (hours.length < 2) { hours = '0' + hours; }
		if (minutes.length < 2) { minutes = '0' + minutes; }
		if (seconds.length < 2) { seconds = '0' + seconds; }

		return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	};

	return Utils;
});
