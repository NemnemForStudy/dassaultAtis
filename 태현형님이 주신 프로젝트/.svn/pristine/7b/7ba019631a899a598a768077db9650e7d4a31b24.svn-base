// global bigPipe due to facebook
/*global define, bigPipe*/
/*jshint -W101 */
/*jshint -W083 */
/*jshint -W044 */
/*jshint -W055 */
/*jshint -W020 */



function __Bookmarklet(w, d, evtSource, origin, nls) {
    "use strict";
    
    nls = nls || { bookmarklet: {} };
    
    var getNls = function (key, params) {
        var result = "";
        try {
            result = nls.bookmarklet[key];
            
            for (var paramKey in params) {
                if (typeof params[paramKey] != "undefined") {
                    result = result.replace(new RegExp("{" + paramKey + "}", "g"), params[paramKey]);
                }
            }
        } catch (err) {}
        
        return result || ("nls.bookmarklet." + key);
    };
    
    if (!("__x3dexp_bookmarklet" in w)) {
        w["__x3dexp_bookmarklet"] = {};
    }
    
    w["__x3dexp_bookmarklet"].loaded = true;
    
    var utils = {};
    
    utils.stylesheetElem = function (id, styles) {
        var css = d.createElement("style");
        css.type = "text/css";
        css.id = id;
        
        if (css.styleSheet) {
            css.styleSheet.cssText = styles;
        }
        else {
            css.appendChild(d.createTextNode(styles));
        }
        
        d.getElementsByTagName("head")[0].appendChild(css);
    };
    
    utils.is = function (filter, value) {
        filter = filter || "";
        
        switch (filter) {
            case "domain":
                return new RegExp("^(.+\.|)" + value.replace(".", "\.") + "$", "i").test(d.domain);
            case "array":
                return Object.prototype.toString.call(value) === "[object Array]";
            default:
                break;
        }
        
        return false;
    };
    
    utils.substr = function (str, maxLength) {
        str = (str || "").trim();
        
        if (str.length > maxLength) {
            str = str.substr(0, maxLength - 3) + "...";
        }
        
        return str;
    };
    
    function $(selector, context) {
        selector = selector || "";
        context = context || d;
        
        if (!selector) {
            return this;
        }
        
        if (!(this instanceof $)) {
            return new $(selector, context);
        }
        
        var self = this;
        
        this._elems = [];
        
        this._context = d;
        if (context instanceof $) {
            this._context = context.get(0);
        }
        else if (context !== d && context) {
            if (typeof context === "object" && context.ELEMENT_NODE) {
                this._context = $(context).get(0);
            }
            else {
                this._context = $(context, d).get(0);
            }
        }
        
        if (!this._context) {
            return this;
        }
        
        if (typeof selector === "object") {
            if (selector instanceof $) {
                this._elems = selector._elems;
            }
            else if (selector.ELEMENT_NODE) {
                this._elems.push(selector);
            }
        }
        else {
            switch (selector.charAt(0)) {
                case "#":
                    var el = d.getElementById(selector.substr(1));
                    el && self._elems.push(el);
                    break;
                case ".":
                    self.forEach(self._context.getElementsByClassName(selector.substr(1)), function (el) {
                        el && self._elems.push(el);
                    });
                    break;
                case "~":
                    self.forEach(self._context.querySelectorAll(selector.substr(1)), function (el) {
                        el && self._elems.push(el);
                    });
                    break;
                default:
                    if (/^<(?:div|span|a|img|style|button|input|ul|li)/i.test(selector)) {
                        self._elems.push(self._context.createElement(selector.replace("<", "").replace("/>", "").trim()));
                    }
                    else {
                        self.forEach(self._context.getElementsByTagName(selector.toUpperCase()), function (el) {
                            el && self._elems.push(el);
                        });
                    }
                    break;
            }
        }
        
        return this;
    }
    
    $.prototype.forEach = function (arr, cb) {
        
        if (arguments.length === 1) {
            if (typeof arr === "function") {
                cb = arr;
                arr = this._elems;
            }
            else {
                return this;
            }
        }
        
        var result;
        
        for (var i = 0, arrLength = arr.length; i < arrLength; ++i ) {
            cb && (result = cb(arr[i], i));
            
            if (result === false) {
                break;
            }
        }
        
        return this;
    };
    
    $.prototype.get = function (index) {
        return this._elems && this._elems[index];
    };
    
    $.prototype.size = function () {
        return this._elems.length;
    };
    
    /*$.prototype.withAttr = function (name, regex) {
        name = (name || "").toLowerCase();
        
        var existAttrOnly = true;
        if (arguments.length > 1) {
            existAttrOnly = false;
        }
        
        var elems = [];
        return this.forEach(function (elem) {
            if ((existAttrOnly && elem.hasAttribute(name)) || (!existAttrOnly && regex.test(elem.getAttribute(name)))) {
                elems.push(elem);
            }
        });
    };*/
    
    $.prototype.attr = function (name, value) {
        if (arguments.length === 1) {
            return this.get(0) && this.get(0).getAttribute(name);
        }
        
        return this.forEach(function (elem) {
            if (typeof elem.setAttribute === "undefined") {
                var attr = d.createAttribute(name);
                attr.value = value;
                
                elem.setAttributeNode(attr);
            }
            else {
                elem.setAttribute(name, value);
            }
        });
    };
    
    $.prototype.property = function (name, value) {
        if (arguments.length === 1) {
            return this.get(0)[name] || null;
        }
        
        return this.forEach(function (elem) {
            elem[name] = value;
        });
    };
    
    $.prototype.val = function (value) {
        if (arguments.length === 0) {
            return this.get(0)["value"] || null;
        }
        
        return this.attr("value", value);
    };
    
    $.prototype.hasClass = function (value) {
        
        if (!value) {
            return false;
        }
        
        var result = false;
        
        this.forEach(function (elem) {
            var el = $(elem);
            var currentClass = (el.attr("class") || "").split(" ");
            if (currentClass.indexOf(value) > -1) {
                result = true;
                return false;
            }
        });
        
        return result;
    };
    
    $.prototype.addClass = function (value) {
        
        if (!value) {
            return this;
        }
        
        return this.forEach(function (elem) {
            var el = $(elem);
            var currentClass = (el.attr("class") || "").split(" ");
            if (currentClass.indexOf(value) > -1) {
                return;
            }
            
            var newClass = [];
            if (currentClass.length) {
                newClass = newClass.concat(currentClass);
            }
            newClass.push(value);
            
            el.attr("class", newClass.join(" "));
        });
    };
    
    $.prototype.removeClass = function (value) {
        
        return this.forEach(function (elem) {
            var el = $(elem);
            var currentClass = (el.attr("class") || "").split(" ");
                
            if (typeof value === "undefined") {
                el.attr("class", "");
                return ;
            }
            
            for (var i = 0, arrLength = currentClass.length; i < arrLength; i++) {
                if (currentClass[i] === value) {
                    currentClass.splice(i, 1);
                    break;
                }
            }
            
            el.attr("class", currentClass.join(" "));
        });
    };
    
    $.prototype.on = function (evt, callback) {
        var fc = function (e) {
            e = e || w.event;
            
            var res = (callback.bind(this))(e);
            
            if (res !== false) {
                return;
            }
            
            if (e.cancelBubble !== null) {
                e.cancelBubble = true;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (w.event) {
                e.returnValue = false;
            }
            if (e.cancel !== null) {
                e.cancel = true;
            }
            
            return false;
        };
        
        return this.forEach(function (elem) {
            if (elem.addEventListener) {
                elem.addEventListener(evt, fc.bind(this), false);
            }
            else if (elem.attachEvent) {
                elem.attachEvent("on" + evt, fc.bind(this));
            }
            else {
                elem["on" + evt] = fc.bind(this);
            }
        }.bind(this));
    };
    
    $.prototype.trigger = function (evtName) {
        return this.forEach(function (elem) {
            var evObj = d.createEvent("Events");
            evObj.initEvent(evtName, true, false);
            elem.dispatchEvent(evObj);
        });
    };
    
    $.prototype.text = function (value) {
        if (arguments.length === 0) {
            return this.get(0).textContent;
        }
        
        return this.forEach(function (elem) {
            elem && (elem.textContent = value);
        });
    };
    
    $.prototype.html = function (value) {
        if (arguments.length === 0) {
            return this.get(0).innerHTML;
        }
        
        return this.forEach(function (elem) {
            elem && (elem.innerHTML = value);
        });
    };
    
    $.prototype.css = function (name, value) {
        if (arguments.length === 1) {
            if (this.get(0)) {
                var style = w.getComputedStyle(this.get(0));
                return style[name];
            }
            return null;
        }
        
        return this.forEach(function (elem) {
            elem && (elem.style[name] = value);
        });
    };
    
    $.prototype.hide = function () {
        return this.css("display", "none");
    };
    
    $.prototype.show = function () {
        return this.css("display", "block");
    };
    
    $.prototype.appendTo = function (elem) {
        
        if (!(elem instanceof $)) {
            elem = $(elem);
        }
        
        return this.forEach(function (el) {
            elem.get(0) && elem.get(0).appendChild(el);
        });
    };
    
    $.prototype.remove = function () {
        var self = this;
        
        this.forEach(function (elem, i) {
            elem.parentNode.removeChild(elem);
            self._elems.splice(i, 1);
        });
        
        return this;
    };
    
    function Sharer(o) {
        if (!(this instanceof Sharer)) {
            return new Sharer(o);
        }
        
        o = o || {};
        o.padding = o.padding || 4;
        o.picture = o.picture || {};
        o.picture.resize = o.picture.resize || {};
        o.picture.resize.width = o.picture.resize.width || 160;
        o.picture.resize.height = o.picture.resize.height || 120;
        o.picture.minWidth = o.picture.minWidth || 150;
        o.picture.maxWidth = o.picture.maxWidth || 2000;
        o.picture.minHeight = o.picture.minHeight || 150;
        o.picture.maxHeight = o.picture.maxHeight || 2000;
        o.media = o.media || {};
        o.media.resize = o.media.resize || {};
        o.media.resize.width = o.media.resize.width || 360;
        o.media.resize.height = o.media.resize.height || 202;
        
        o.thumbnail = o.thumbnail || {};
        o.thumbnail.pictures = o.thumbnail.pictures || o.staticSrc + "/img/empty.gif";
        o.thumbnail.medias = o.thumbnail.medias || o.staticSrc + "/img/empty.gif";
        o.thumbnail.rss = o.thumbnail.rss || o.staticSrc + "/img/empty.gif";
        o.thumbnail.widgets = o.thumbnail.widgets || o.staticSrc + "/img/widgets.png";
        
        this._options = o;
        this._version = "v0.4";
        this.init();
    }

    Sharer.prototype.init = function () {
        
        if ($("#x3dexp-overlay").get(0)) {
            return this;
        }
        
        if (!d.head) {
            d.firstChild.appendChild(d.createElement("head"));
        }
        
        if (!d.body) {
            d.firstChild.appendChild(d.createElement("body"));
        }
        
        this.addDefaultStylesheets();
        this.overlay();
        
        return this;
    };

    Sharer.prototype.addDefaultStylesheets = function () {
        
        var style = "";
        
        style += "#x3dexp-sharer { z-index: 9000000000;margin: 0;display:block;line-height: 1.428571429;color: #333; }";
        style += "#x3dexp-sharer, #x3dexp-sharer * { font-family: Arial,sans-serif;font-size: 14px;webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;margin: 0;padding:0;list-style:none;-webkit-font-smoothing: antialiased;max-width: none;max-height: none;text-align: left; }";
        style += "#x3dexp-sharer a, #x3dexp-sharer a:hover { color: #368ec4;cursor: pointer;font-weight: normal; }";
        style += "#x3dexp-sharer .x3dexp-scrim { position: fixed;z-index: 9000000001;background-color: white;background-color: rgba(238,238,238,0.8);top: 0;left: 0;right: 0;bottom: 0; }";
        style += "#x3dexp-sharer .x3dexp-modal { position:fixed;z-index: 9000000002;top: 125px;left: 25%;width: 559px;margin-right: auto;margin-left: auto;color: #555; }";
        style += ".x3dexp-sharer-animated .x3dexp-modal, .x3dexp-sharer-animated .x3dexp-scrim { transition: all 0.5s ease-in-out; }";
        style += "#x3dexp-sharer .x3dexp-modal-animated-low-size { transform: scale(0); }";
        style += "#x3dexp-sharer .x3dexp-scrim-animated-hide { background-color: rgba(238,238,238,0); }";
        style += "#x3dexp-version { float: left;color: #C8C8C8; }";
        style += "#x3dexp-sharer .x3dexp-modal-wrap {  }";
        style += "#x3dexp-sharer .x3dexp-modal-content { position: relative;webkit-box-shadow: 0 5px 15px rgba(0,0,0,0.25);box-shadow: 0 5px 15px rgba(0,0,0,0.25);background-color: #fff;border: 1px solid #999;border: 1px solid rgba(0,0,0,0.15);outline: 0;-webkit-box-shadow: 0 3px 9px rgba(0,0,0,0.2);box-shadow: 0 3px 9px rgba(0,0,0,0.2);background-clip: padding-box;border-radius: 6px; }";
        style += "#x3dexp-sharer .x3dexp-modal-header { padding: 12px 20px 12px;font-size: 18px;cursor: move; }";
        style += "#x3dexp-sharer .x3dexp-modal-header-title { font-size: 18px }";
        style += "#x3dexp-sharer .x3dexp-modal-body { padding: 0px; }";
        style += "#x3dexp-sharer .x3dexp-modal-footer { padding: 15px;text-align: right;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px; }";
        style += "#x3dexp-sharer .x3dexp-modal-notification { display: none;position: absolute; top: 50%;left: 25%; }";
        style += "#x3dexp-sharer .x3dexp-modal-notification-content { position: relative; left: -18%;padding: 15px;border-radius: 6px;text-align: center;background: #FFF3E9;border: 1px solid #E87B00; }";
        style += "#x3dexp-sharer .x3dexp-clearfix:after { clear: both;content: \".\";display: block;font-size: 0;height: 0;line-height: 0;visibility: hidden; }";

        style += "#x3dexp-picker {padding: 0 10px;}";
        style += "#x3dexp-picker-menu { margin:10px;overflow:hidden;border-bottom: 1px solid #dfdfdf;padding: 0 10px; }";
        style += "#x3dexp-picker-menu .x3dexp-picker-menu-bar { border-bottom:3px solid #368ec4; }";
        style += "#x3dexp-picker-menu .x3dexp-picker-menu-item-cont { position: relative;display: inline-block;margin-right: 30px;cursor: pointer;height: 36px;vertical-align: middle; }";
        style += "#x3dexp-picker-menu .x3dexp-picker-menu-item { margin-left: 33px;line-height: 1.9em; }";
        style += "#x3dexp-picker-menu .x3dexp-picker-menu-item span { position: absolute;top: -15px;left: -18px;font-size: 11px;color: white; }";
        style += "#x3dexp-picker-menu .x3dexp-picker-menu-item-sel { border-bottom:3px solid #368ec4; }";
        style += "#x3dexp-picker-menu .x3dexp-picker-menu-item-cont:hover div, #x3dexp-picker-menu .x3dexp-picker-menu-item-sel div, #x3dexp-picker-menu .x3dexp-picker-menu-item-sel div { opacity: 0.6!important; }";
        style += "#x3dexp-picker-menu .x3dexp-picker-menu-item-cont div { opacity: 0.3; }";

        style += "#x3dexp-picker-menu .x3dexp-picker-menu-icon { position: absolute;top: 0;left: 0;width: 26px;height: 26px;background-repeat: no-repeat; }";
        style += "#x3dexp-picker .x3dexp-picker-menu-picture-icon { background: url('" + this._options.staticSrc + "/img/icons/images.png'); }";
        style += "#x3dexp-picker .x3dexp-picker-menu-media-icon { background: url('" + this._options.staticSrc + "/img/icons/media.png'); }";
        style += "#x3dexp-picker .x3dexp-picker-menu-rss-icon { background: url('" + this._options.staticSrc + "/img/icons/links.png'); }";
        style += "#x3dexp-picker .x3dexp-picker-menu-widget-icon { background: url('" + this._options.staticSrc + "/img/icons/widgets.png'); }";
        
        
        
        style += "#x3dexp-picker-pictures { display:none; }";
        style += "#x3dexp-picker-medias { display:none; }";
        style += "#x3dexp-picker-rss { display:none; }";
        style += "#x3dexp-picker-widgets { display:none; }";
        style += "#x3dexp-picker-medias .x3dexp-picker-item { width: 360px!important;display: block!important;margin: 50px auto!important;float: none!important; }";
        style += "#x3dexp-picker-medias .x3dexp-picker-item-pictures { height:202px!important; }";
        
        
        style += "#x3dexp-sharer button { -webkit-appearance: button;cursor: pointer;text-transform: none;overflow: visible;color: inherit;font: inherit;margin: 0;width: auto!important; }";
        style += "#x3dexp-sharer .x3dexp-modal .x3dexp-btn { margin-left: 10px; }";
        style += "#x3dexp-sharer .x3dexp-btn { display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;line-height: 1.428571429;text-align: center;white-space: nowrap;vertical-align: middle;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px; }";
        style += "#x3dexp-sharer .x3dexp-btn-disabled { opacity: 0.4; }";
        style += "#x3dexp-sharer .x3dexp-btn-primary { color: white;background-color: #368ec4;float: right; }";
        style += "#x3dexp-sharer .x3dexp-btn-default { color: #77797c;border-color: #b4b6ba;background-color: #f5f6f7;background-image: -moz-linear-gradient(top,#f5f6f7,#e2e4e3);background-image: -webkit-gradient(linear,0 0,0 100%,from(#f5f6f7),to(#e2e4e3));background-image: -webkit-linear-gradient(top,#f5f6f7,#e2e4e3);background-image: linear-gradient(to bottom,#f5f6f7,#e2e4e3); }";
        //style += ".x3dexp-btn:hover, .x3dexp-btn:focus { color: #333;text-decoration: none; }";
        style += ".x3dexp-btn-primary:hover { color: #fff!important;border-color: #005686!important;background-color: #005686!important; }";
        style += ".x3dexp-btn-primary:focus { color: #fff!important;border-color: #005686!important;background-color: #368ec4!important; }";
        style += ".x3dexp-btn-primary:active { color: #fff!important;border-color: #368ec4!important;background-color: #003c5a!important; }";
        
        style += ".x3dexp-btn-default:hover, .x3dexp-btn-default:focus { color: #5b5d5e;border-color: #5b5d5e;background-color: #e6e8ea;background-image: -moz-linear-gradient(top,#e6e8ea,#d1d4d4);background-image: -webkit-gradient(linear,0 0,0 100%,from(#e6e8ea),to(#d1d4d4));background-image: -webkit-linear-gradient(top,#e6e8ea,#d1d4d4);background-image: linear-gradient(to bottom,#e6e8ea,#d1d4d4); }";
        
        style += ".x3dexp-modal .x3dexp-close:hover, .x3dexp-modal .x3dexp-close:focus { color: #000;text-decoration: none;cursor: pointer;opacity: .5;filter: alpha(opacity=50); }";
        style += ".x3dexp-modal .x3dexp-close { position: absolute;top: 0; right: 0;padding: 15px!important;font-size: 28px!important;line-height: 0.9em!important;color: #000;text-shadow: 0 1px 0 #fff;opacity: .2;filter: alpha(opacity=20); }";
        style += ".x3dexp-modal button.x3dexp-close { padding: 0;cursor: pointer;background: 0;border: 0;-webkit-appearance: none; }";
        
        
        style += "#x3dexp-sharer .x3dexp-picker-item { position: relative;width: 160px;display: inline-block;margin: 5px;float: left; }";
        style += "#x3dexp-picker-rss .x3dexp-picker-item { position: relative;display: block;width: auto;margin: 2px 25px;float: none; }";
        style += "#x3dexp-picker-rss .x3dexp-picker-item-sel {  }";
        style += "#x3dexp-picker-rss .x3dexp-picker-item-unsel {  }";
        style += "#x3dexp-picker-rss .x3dexp-picker-item-unsel:hover { background: none!important; }";
        style += "#x3dexp-picker-rss .x3dexp-picker-item-pictures { position: absolute!important;top:4px!important;left:0!important;height: 20px!important;width: 20px!important;background: url('" + this._options.staticSrc + "/img/icons/rss_blue.png'); }";
        style += "#x3dexp-picker-rss .x3dexp-picker-item-title { position: static!important;background: none!important;color:#555!important;text-align: left!important;margin-left:27px; }";
        style += "#x3dexp-picker-rss .x3dexp-picker-checkbox { display:none; }";
        style += "#x3dexp-picker-rss .x3dexp-picker-link { position: absolute;top: 6px;right: 0; }";
        
        style += "#x3dexp-picker-body { width: 100%;height: 350px;overflow: auto; overflow-x: hidden;line-height: 142%;border-top: 4px solid transparent;padding:5px; }";
        
        
        style += "#x3dexp-sharer .x3dexp-picker-item-pictures { position: relative;height: 120px;background-color: white;overflow:hidden; }";
        style += "#x3dexp-sharer .x3dexp-picker-item-unsel:hover { background: rgb(231,231,231); }";
        style += "#x3dexp-sharer .x3dexp-picker-item-sel { background-color: #0a5cd1;color: #fff; }";
        style += "#x3dexp-sharer .x3dexp-picker-item-title { position: absolute;width: 100%;height:32px;overflow:hidden;bottom: 0;left: 0;background: #368ec4;color:white;opacity: 0.9;text-align: right;padding: 5px;cursor: default; }";
        style += "#x3dexp-sharer a.x3dexp-picker-item-title:hover { color:white!important; }";
        
        style += "#x3dexp-sharer .x3dexp-picker-checkbox-cont { position: absolute;right: 0;bottom: 0;width: 0px;height:0px;border-bottom-color: #0a5cd1!important;border-bottom-width: 42px!important;border-left-width: 42px!important;border-color: transparent;border-bottom-style: solid;border-left-style: solid; display:none;padding: 0; }";
        style += "#x3dexp-sharer .x3dexp-picker-checkbox { position: absolute;bottom: 8px;left: 12px;padding: 0;width: 19px;height: 19px;margin: 0;cursor: default; }";
        style += "#x3dexp-sharer .x3dexp-picker-checkmark { display: none; }";
        style += "#x3dexp-sharer .x3dexp-picker-item-sel .x3dexp-picker-checkmark, #x3dexp-sharer .x3dexp-picker-item-unsel:hover .x3dexp-picker-checkmark { position: absolute;bottom: 3px;right: 2px;font-weight: bold;font-size: 24px;color:white; display:block; }";
        
        style += "#x3dexp-sharer .x3dexp-picker-item-sel .x3dexp-picker-checkbox-cont { display: block; }";
        style += "#x3dexp-sharer .x3dexp-picker-item-unsel:hover .x3dexp-picker-checkbox-cont { border-bottom-color: #E7E7E7!important;display: block; }";
        style += "#x3dexp-sharer .x3dexp-picker-loading { font-size: 14px;font-weight: bold;text-align: center; }";
        
        style += "#x3dexp-sharer .x3dexp-picker-msg { padding: 10px 5px;font-weight: bold;font-size: 16px; }";
        
        style += "#x3dexp-sharer .x3dexp-picker-header-elem { display: none;margin: 0 10px 10px; }";
        //style += "#x3dexp-sharer .x3dexp-picker-item-unsel:hover .x3dexp-picker-item-title { background: #E7E7E7;text-align:right; }";
        
        style += "#x3dexp-sharer .x3dexp-current-url-title, #x3dexp-sharer .x3dexp-picker-label { font-weight: bold; }";
        style += "#x3dexp-sharer .x3dexp-current-url-list li { position: relative;margin: 10px 0; }";
        style += "#x3dexp-sharer .x3dexp-current-url-icon { position: absolute;top: 0;left: 0;width: 20px;height: 20px;background: no-repeat url('" + this._options.staticSrc + "/img/icons/link_blue.png'); }";
        style += "#x3dexp-sharer .x3dexp-current-url-link { margin-left: 25px; }";
        style += "#x3dexp-sharer .x3dexp-current-url-post { float: right;margin-left: 7px; }";
        style += "#x3dexp-picker-title { font-weight: bold; }";
        
        style += "#x3dexp-set-title { font-size: 14px;display: inline-block;margin-left: 5px;width: 478px;padding: 3px; border: 1px solid #d2d2d2; }";
        style += "#x3dexp-set-title:focus, #x3dexp-set-title::selection { border: 1px solid #999; }";
        
        style += ".x3dexp-hide-iframe { position: relative;left: -9000px; }";
        
        utils.stylesheetElem("x3dexp-stylesheet", style);
    };

    Sharer.prototype.overlay = function () {
        
        var self                    = this,
            x3dexpContainer         = $("<div/>").attr("id", "x3dexp-sharer"),
            scrim                   = $("<div/>").attr("id", "x3dexp-scrim").attr("class", "x3dexp-scrim"),
            modal                   = $("<div/>").attr("id", "x3dexp-modal").attr("class", "x3dexp-modal"),
            modalWrap               = $("<div/>").attr("id", "x3dexp-modal-wrap").attr("class", "x3dexp-modal-wrap"),
            modalContent            = $("<div/>").attr("id", "x3dexp-modal-content").attr("class", "x3dexp-modal-content"),
            modalHeader             = $("<div/>").attr("id", "x3dexp-modal-header").attr("class", "x3dexp-modal-header"),
            modalHeaderTitle        = $("<span/>").attr("id", "x3dexp-modal-header-title").attr("class", "x3dexp-modal-header-title").text(getNls("title")),
            modalBody               = $("<div/>").attr("id", "x3dexp-modal-body").attr("class", "x3dexp-modal-body"),
            modalFooter             = $("<div/>").attr("id", "x3dexp-modal-footer").attr("class", "x3dexp-modal-footer x3dexp-clearfix"),
            modalNotification       = $("<div/>").attr("id", "x3dexp-modal-notification").attr("class", "x3dexp-modal-notification"),
            modalNotificationContent= $("<div/>").attr("id", "x3dexp-modal-notification-content").attr("class", "x3dexp-modal-notification-content"),
            modalCloseButton        = $("<button/>").attr("id", "x3dexp-modal-close").attr("class", "x3dexp-close").text("\u00D7"),
            modalDefaultButton      = $("<button/>").attr("id", "x3dexp-modal-btn-default").attr("class", "x3dexp-btn x3dexp-btn-default").text(getNls("cancel")),
            modalPrimaryButton      = $("<button/>").attr("id", "x3dexp-modal-btn-primary").attr("class", "x3dexp-btn x3dexp-btn-primary"),
            picker                  = $("<div/>").attr("id", "x3dexp-picker"),
            pickerMenu              = $("<div/>").attr("id", "x3dexp-picker-menu"),
            pickerMenuPhotosCont    = $("<div/>").attr("class", "x3dexp-picker-menu-item-cont x3dexp-picker-menu-item-cont-pictures"),
            pickerMenuPhotos        = $("<div/>").attr("class", "x3dexp-picker-menu-item").text(getNls("menu_images_title")),
            pickerMenuPhotosItem    = $("<div/>").attr("class", "x3dexp-picker-menu-icon x3dexp-picker-menu-picture-icon"),
            //pickerMenuPhotosItemNb  = $("<div/>").attr("id", "x3dexp-picker-menu-item-nb-pictures").text("(0)"),
            pickerMenuVideosCont    = $("<div/>").attr("class", "x3dexp-picker-menu-item-cont x3dexp-picker-menu-item-cont-medias"),
            pickerMenuVideos        = $("<div/>").attr("class", "x3dexp-picker-menu-item").text(getNls("menu_medias_title")),
            pickerMenuVideosItem    = $("<div/>").attr("class", "x3dexp-picker-menu-icon x3dexp-picker-menu-media-icon"),
            //pickerMenuVideosItemNb  = $("<div/>").attr("id", "x3dexp-picker-menu-item-nb-medias").text("(0)"),
            pickerMenuRssCont       = $("<div/>").attr("class", "x3dexp-picker-menu-item-cont x3dexp-picker-menu-item-cont-rss"),
            pickerMenuRss           = $("<div/>").attr("class", "x3dexp-picker-menu-item").text(getNls("menu_links_title")),
            pickerMenuRssItem       = $("<div/>").attr("class", "x3dexp-picker-menu-icon x3dexp-picker-menu-rss-icon"),
            //pickerMenuRssItemNb     = $("<div/>").attr("id", "x3dexp-picker-menu-item-nb-rss").text("(0)"),
            pickerMenuWidgetsCont   = $("<div/>").attr("class", "x3dexp-picker-menu-item-cont x3dexp-picker-menu-item-cont-widgets"),
            pickerMenuWidgets       = $("<div/>").attr("class", "x3dexp-picker-menu-item").text(getNls("menu_widgets_title")),
            pickerMenuWidgetsItem   = $("<div/>").attr("class", "x3dexp-picker-menu-icon x3dexp-picker-menu-widget-icon"),
            //pickerMenuWidgetsItemNb = $("<div/>").attr("id", "x3dexp-picker-menu-item-nb-widgets").text("(0)"),
            pickerHeader            = $("<div/>").attr("id", "x3dexp-picker-header").attr("class", "x3dexp-clearfix"),
            selectAllCont           = $("<div/>").attr("id", "x3dexp-select-all-cont").attr("class", "x3dexp-picker-header-elem"),
            buttonSelectAll         = $("<a/>").attr("id", "x3dexp-select-all").text(getNls("add_all_images")),
            currentUrlCont          = $("<div/>").attr("id", "x3dexp-current-url-cont").attr("class", "x3dexp-picker-header-elem"),
            setTitleCont            = $("<div/>").attr("id", "x3dexp-set-title-cont").attr("class", "x3dexp-picker-header-elem"),
            setTitleLabel           = $("<span/>").attr("class", "x3dexp-picker-label").text(getNls("page_title_field") + ":"),
            setTitleElem            = $("<input/>").attr("id", "x3dexp-set-title").attr("class", "x3dexp-set-title").val(d.title),
            currentPickerTitle      = $("<div/>").attr("id", "x3dexp-picker-title").attr("class", "x3dexp-picker-header-elem"),
            currentUrlTitle         = $("<div/>").attr("class", "x3dexp-current-url-title").text(getNls("current_url_field") + ":"),
            currentUrlUl            = $("<ul/>").attr("class", "x3dexp-current-url-list"),
            currentUrlLi            = $("<li/>").attr("class", "x3dexp-clearfix"),
            currentURLIcon          = $("<span/>").attr("class", "x3dexp-current-url-icon"),
            currentURLLink          = $("<span/>").attr("class", "x3dexp-current-url-link"),
            currentURLQlPost        = $("<a/>").attr("id", "x3dexp-current-url-ql-post").attr("class", "x3dexp-current-url-post").text(getNls("add_current_url_to_quicklinks")),
            currentURLWprPost       = $("<a/>").attr("id", "x3dexp-current-url-wpr-post").attr("class", "x3dexp-current-url-post").text(getNls("add_current_url_to_web_page_reader")),
            pickerBody              = $("<div/>").attr("id", "x3dexp-picker-body"),
            pickerLoading           = $("<div/>").attr("id", "x3dexp-picker-loading").attr("class", "x3dexp-picker-loading").text(getNls("loading")),
            pickerImg               = $("<ul/>").attr("id", "x3dexp-picker-pictures").attr("class", "x3dexp-picker-list x3dexp-clearfix"),
            pickerVideo             = $("<ul/>").attr("id", "x3dexp-picker-medias").attr("class", "x3dexp-picker-list x3dexp-clearfix"),
            pickerRss               = $("<ul/>").attr("id", "x3dexp-picker-rss").attr("class", "x3dexp-picker-list x3dexp-clearfix"),
            pickerWidgets           = $("<ul/>").attr("id", "x3dexp-picker-widgets").attr("class", "x3dexp-picker-list x3dexp-clearfix"),
            hiddenFilter            = $("<input/>").attr("id", "x3dexp-hidden-filter").attr("type", "hidden");
            
        var menuItemOnClick = function (type, el) {
            $(".x3dexp-picker-menu-item-cont", $("#x3dexp-sharer")).removeClass("x3dexp-picker-menu-item-sel");
            $(el).addClass("x3dexp-picker-menu-item-sel");
            
            var pickerBody = $("#x3dexp-picker-body");
            pickerBody.removeClass();
            
            if (type === "pictures") {
                self.pictures.display(self);
                pickerBody.addClass("x3dexp-picker-body-pictures");
            }
            else {
                self.pictures.hide(self);
            }
            
            if (type === "medias") {
                self.medias.display(self);
                pickerBody.addClass("x3dexp-picker-body-medias");
            }
            else {
                self.medias.hide(self);
            }
            
            if (type === "rss") {
                self.rss.display(self);
                pickerBody.addClass("x3dexp-picker-body-rss");
            }
            else {
                self.rss.hide(self);
            }
            
            /*if (type == "widgets") {
                self.widgets.display(self);
                pickerBody.addClass("x3dexp-picker-body-widgets");
            }
            else {
                self.widgets.hide(self);
            }*/
            
            return false;
        };
        
        pickerMenuPhotosCont.on("click", function () {
            return menuItemOnClick("pictures", this);
        });
        pickerMenuVideosCont.on("click", function () {
            return menuItemOnClick("medias", this);
        });
        pickerMenuRssCont.on("click", function () {
            return menuItemOnClick("rss", this);
        });
        /*pickerMenuWidgetsCont.on("click", function () {
            return menuItemOnClick("widgets", this);
        });*/
        
        var postItems = function (selectAll) {
            selectAll = selectAll || false;
            
            var filter = $("#x3dexp-hidden-filter", $("#x3dexp-picker")).attr("value");
            var title = $("#x3dexp-set-title").val();
            
            var ckElem;
            if (selectAll) {
                ckElem = $("input", $("#x3dexp-picker-" + filter));
            }
            else {
                $("input", $("#x3dexp-picker-" + filter)).forEach(function (el) {
                    var elem = $(el);
                    if (elem.property("checked")) {
                        ckElem = elem;
                        return false;
                    }
                });
                
                if (!ckElem) {
                    return false;
                }
            }
            
            switch (filter) {
                case "pictures":
                    var links = [];
                    
                    $("input", $("#x3dexp-picker-" + filter)).forEach(function (el) {
                        var elem = $(el);
                        (selectAll || (!selectAll && elem.property("checked"))) && links.push({ url: elem.attr("data-link"), title: elem.attr("data-title") });
                    });
                    
                    self.open({
                        type: filter,
                        title: title,
                        description: ckElem.attr("data-description"),
                        links: links
                    });
                    
                    break;
                case "medias":
                case "slides":
                    self.open({
                        type: filter,
                        title: title,
                        description: ckElem.attr("data-description"),
                        links: [{ url: ckElem.attr("data-link"), title: ckElem.attr("data-title") }]
                    });
                    
                    break;
                case "rss":
                    self.open({
                        type: filter,
                        title: title,
                        description: ckElem.attr("data-description"),
                        links: [{ url: ckElem.attr("data-link"), title: ckElem.attr("data-title") }]
                    });
                    
                    break;
                default:
                    break;
            }
        
            return false;
        };
        
        buttonSelectAll.hide();
        buttonSelectAll.on("click", function () {
            return postItems(true);
        });
        
        modalPrimaryButton.on("click", function () {
            return postItems();
        });
        self.updateModalPrimaryButtonTitle();
        
        currentURLWprPost.on("click", function () {
            self.open({
                type: "webpage",
                //title: d.location.title,
                title: $("#x3dexp-set-title").val(),
                description: d.location.title,
                links: [{ url: d.location.href, title: d.location.href}]
            });
            return false;
        });
        
        currentURLQlPost.on("click", function () {
            self.open({
                type: "quicklinks",
                title: $("#x3dexp-set-title").val(),
                description: d.location.title,
                links: [{ url: d.location.href, title: d.location.href}]
            });
            return false;
        });
        
        modalCloseButton.on("click", self.close);
        modalDefaultButton.on("click", self.close);
        d.onkeyup = function (e) {
            e = e || w.event;
            
            if (e.keyCode === 27) {
                self.close();
            }
        };
        
        var isModalMoving = false, startingPoint = { };
        modalHeader.on("mousedown", function (e) {
            e = e || w.event;
            
            if(e.stopPropagation) {
                e.stopPropagation();
            }
            
            if(e.preventDefault) {
                e.preventDefault();
            }
            
            e.cancelBubble=true;
            e.returnValue=false;
            
            isModalMoving = true;
            startingPoint.x = e.screenX - modal.get(0).offsetLeft;
            startingPoint.y = e.screenY - modal.get(0).offsetTop;
            
        });
        
        $(d)
        .on("mouseup", function () {
            isModalMoving = false;
        })
        .on("mousemove", function (e) {
            if (!isModalMoving) {
                return;
            }
            
            var visibleSize = 80, modalWidth = parseInt(modalHeader.css("width").replace("px", ""), 10);
            var topValue = Math.max(0, e.screenY - startingPoint.y);
            var leftValue = Math.max(visibleSize - modalWidth, e.screenX - startingPoint.x);
            
            topValue = Math.min(topValue, w.innerHeight - parseInt(modalHeader.css("height").replace("px", ""), 10));
            leftValue = Math.min(leftValue, w.innerWidth - visibleSize);
            
            modal.css("top", topValue + "px");
            modal.css("left", leftValue + "px");
        });
        
        pickerMenuPhotos.appendTo(pickerMenuPhotosCont);
        //pickerMenuPhotosItemNb.appendTo(pickerMenuPhotosCont);
        pickerMenuPhotosItem.appendTo(pickerMenuPhotosCont);
        pickerMenuPhotosCont.appendTo(pickerMenu);
        
        pickerMenuVideos.appendTo(pickerMenuVideosCont);
        //pickerMenuVideosItemNb.appendTo(pickerMenuVideosCont);
        pickerMenuVideosItem.appendTo(pickerMenuVideosCont);
        pickerMenuVideosCont.appendTo(pickerMenu);
        
        pickerMenuRss.appendTo(pickerMenuRssCont);
        //pickerMenuRssItemNb.appendTo(pickerMenuRssCont);
        pickerMenuRssItem.appendTo(pickerMenuRssCont);
        pickerMenuRssCont.appendTo(pickerMenu);
        
        pickerMenuWidgets.appendTo(pickerMenuWidgetsCont);
        //pickerMenuWidgetsItemNb.appendTo(pickerMenuWidgetsCont);
        pickerMenuWidgetsItem.appendTo(pickerMenuWidgetsCont);
        // do not display widget menu
        //pickerMenuWidgetsCont.appendTo(pickerMenu);
        
        pickerMenu.appendTo(picker);
        
        setTitleLabel.appendTo(setTitleCont);
        setTitleElem.appendTo(setTitleCont);
        setTitleCont.appendTo(pickerHeader);
        
        // picker header
        buttonSelectAll.appendTo(selectAllCont);
        selectAllCont.appendTo(pickerHeader);
        currentUrlTitle.appendTo(currentUrlCont);
        
        var maxLength = 35, currentLinkTxt = d.location.href, currentLinkTxtDisplayed = currentLinkTxt;
        if (currentLinkTxtDisplayed.length > maxLength) {
            currentLinkTxtDisplayed = currentLinkTxtDisplayed.substr(0, maxLength - 3) + "...";
        }
        
        currentURLLink.text(currentLinkTxtDisplayed).attr("title", currentLinkTxt);
            
        currentURLIcon.appendTo(currentUrlLi);
        currentURLLink.appendTo(currentUrlLi);
        currentURLWprPost.appendTo(currentUrlLi);
        currentURLQlPost.appendTo(currentUrlLi);
        currentUrlLi.appendTo(currentUrlUl);
        currentUrlUl.appendTo(currentUrlCont);
        
        currentUrlCont.appendTo(pickerHeader);
        currentPickerTitle.appendTo(pickerHeader);
        
        pickerHeader.appendTo(picker);
        
        // picker body
        pickerImg.appendTo(pickerBody);
        pickerVideo.appendTo(pickerBody);
        pickerRss.appendTo(pickerBody);
        pickerWidgets.appendTo(pickerBody);
        hiddenFilter.appendTo(pickerBody);
        pickerLoading.appendTo(pickerBody);
        pickerBody.appendTo(picker);
        
        // picker
        picker.appendTo(modalBody);
        
        scrim.appendTo(x3dexpContainer);
        
        modalHeaderTitle.appendTo(modalHeader);
        modalCloseButton.appendTo(modalHeader);
        
        //modalDefaultButton.appendTo(modalFooter);
        modalPrimaryButton.appendTo(modalFooter);
        
        modalNotificationContent.appendTo(modalNotification);
        
        modalHeader.appendTo(modalContent);
        modalBody.appendTo(modalContent);
        modalFooter.appendTo(modalContent);
        modalNotification.appendTo(modalContent);
        modalContent.appendTo(modalWrap);
        modalWrap.appendTo(modal);
        modal.appendTo(x3dexpContainer);
        
        modal.addClass("x3dexp-modal-animated-low-size");
        scrim.addClass("x3dexp-scrim-animated-hide");
        
        x3dexpContainer.appendTo(d.body);
        
        // load pictures picker by default
        pickerMenuPhotosCont.trigger("click");
        
        setTimeout(function () {
            
            x3dexpContainer.addClass("x3dexp-sharer-animated");
            
            modal.removeClass("x3dexp-modal-animated-low-size");
            scrim.removeClass("x3dexp-scrim-animated-hide");
            
            var topStartValue = Math.max(0, (w.innerHeight - parseInt(modal.css("height").replace("px", ""), 10)) / 2);
            var leftStartValue = Math.max(0, (w.innerWidth - parseInt(modal.css("width").replace("px", ""), 10)) / 2);
            modal.css("top", topStartValue + "px");
            modal.css("left", leftStartValue + "px");
            
            modal.on("transitionend", function () {
                x3dexpContainer.removeClass("x3dexp-sharer-animated");
            });
        }, 0);
        
        return this;
    };
    
    Sharer.prototype.updateModalPrimaryButtonTitle = function (nbItems) {
        nbItems = nbItems || 0;
        
        $("#x3dexp-modal-btn-primary").text(getNls("add_items", { "nbItems": nbItems }));
    };
    
    Sharer.prototype.displayItems = function (o) {
        o = o || {};
        o.items = o.items || [];
        o.unique = o.unique || false;
        o.multiSelect = o.multiSelect || false;
        o.cropThumbnail = o.cropThumbnail !== false;
        o.noThumbnail = o.noThumbnail || false;
        o.noDefaultThumbnail = o.noDefaultThumbnail || false;
        o.hideCheckbox = o.hideCheckbox || false;
        o.picture = o.picture || {};
        o.picture.maxWidth = o.picture.maxWidth || this._options.picture.maxWidth;
        o.picture.minWidth = o.picture.minWidth || this._options.picture.minWidth;
        o.picture.maxHeight = o.picture.maxHeight || this._options.picture.maxHeight;
        o.picture.minHeight = o.picture.minHeight || this._options.picture.minHeight;
        
        if (o.unique) {
            var filteredItems = [], uniqueItem = {};
            
            for (var i = 0, arrlength = o.items.length; i < arrlength; i++) {
                if (!uniqueItem[o.items[i].link]) {
                    uniqueItem[o.items[i].link] = true;
                    filteredItems.push(o.items[i]);
                }
            }
            
            o.items = filteredItems;
            filteredItems = null;
        }
        
        var self = this,
            thumbOpts = this._options.picture,
            itemCounter = { all: 0, valid: 0, onFirstItemValidFired: false },
            nbItemsFound = o.items.length,
            onItemComplete = function () {
                
                o.onProgress && o.onProgress(Math.max(0, Math.min(100, itemCounter.all * 100 / nbItemsFound)));
                    
                if (itemCounter.valid && !itemCounter.onFirstItemValidFired) {
                    itemCounter.onFirstItemValidFired = true;
                    o.onFirstItemValid && o.onFirstItemValid(itemCounter.valid > 1);
                }
                
                if (itemCounter.all >= nbItemsFound) {
                    $("#x3dexp-picker-menu-item-nb-" + o.filter).addClass("").text("(" + itemCounter.valid + ")");
                    o.onComplete && o.onComplete(itemCounter.valid > 1);
                }
            },
            isValidItem = function (item, img) {
            
                if (item.isDefaultThumbnail) {
                    return true;
                }
                
                if (img.get(0).width < o.picture.minWidth || img.get(0).width > o.picture.maxWidth) {
                    return false;
                }
                
                if (img.get(0).height < o.picture.minHeight || img.get(0).height > o.picture.maxHeight) {
                    return false;
                }
                
                return true;
            },
            onItemLoaded = function (item, thumbnail) {
                ++itemCounter.valid;
                ++itemCounter.all;
                
                if (o.filter === "medias") {
                    thumbOpts = self._options.media;
                }
                
                var pickerItem = $("<li/>").attr("class", "x3dexp-picker-item x3dexp-picker-item-unsel");
                
                var itemElem            = $("<div/>").attr("class", "x3dexp-picker-item-pictures"),
                    titleItemElem       = $("<div/>").attr("class", "x3dexp-picker-item-title"),
                    checkboxItem        = $("<input/>").attr("type", "checkbox").attr("class", "x3dexp-picker-checkbox").attr("name", "x3dexp-item"),
                    itemLink            = $("<a/>").attr("class", "x3dexp-picker-link").text(getNls("add_item_to_feed_reader")),
                    itemWallPageReader  = $("<a/>").attr("class", "x3dexp-picker-item-title").text(getNls("add_item_to_web_page_reader"));
                
                if (!o.noThumbnail) {
                    var resized = { width: thumbnail.get(0).width, height: thumbnail.get(0).height }, margin = { left: 0, top: 0 };
                    var finalRatio = thumbOpts.resize.width / thumbOpts.resize.height, originalRatio = resized.width / resized.height;
                    
                    if (o.cropThumbnail) {
                        if (originalRatio >= finalRatio) {
                            resized.height = thumbOpts.resize.height;
                            resized.width = resized.height * thumbnail.get(0).width / thumbnail.get(0).height;
                        }
                        else {
                            resized.width = thumbOpts.resize.width;
                            resized.height = resized.width * thumbnail.get(0).height / thumbnail.get(0).width;
                        }
                        
                        margin.top = (thumbOpts.resize.height - resized.height) / 2;
                        margin.left = (thumbOpts.resize.width - resized.width) / 2;
                    }
                    else {
                        if (resized.width > thumbOpts.resize.width) {
                            resized.width = Math.min(thumbOpts.resize.width, Math.max(thumbOpts.resize.width, resized.width));
                            resized.height = resized.width * thumbnail.get(0).height / thumbnail.get(0).width;
                        }
                        
                        if (resized.height > thumbOpts.resize.height) {
                            resized.height = Math.min(thumbOpts.resize.height, Math.max(thumbOpts.resize.height, resized.height));
                            resized.width = resized.height * thumbnail.get(0).width / thumbnail.get(0).height;
                        }
                        
                        if (resized.height < thumbOpts.resize.height) {
                            margin.top = (thumbOpts.resize.height - resized.height) / 2;
                        }
                        
                        if (resized.width < thumbOpts.resize.width) {
                            margin.left = (thumbOpts.resize.width - resized.width) / 2;
                        }
                    }
                    
                    thumbnail
                        .attr("width", resized.width)
                        .attr("height", resized.height)
                        .css("margin-top", margin.top + "px")
                        .css("margin-left", margin.left + "px")
                        .appendTo(itemElem);
                }
                
                checkboxItem
                    .attr("data-title", item.title || "")
                    .attr("data-description", item.description || item.title || "")
                    .attr("data-link", item.link || "")
                    .attr("data-opts", item.opts || "");
                
                pickerItem.on("click", function (e) {
                    if (o.hideCheckbox) {
                        return;
                    }
                    
                    if (e.target && e.target.tagName !== "INPUT" && e.target.type !== "checkbox") {
                        var ckElem = $("input", this), isChecked = ckElem.property("checked");
                        if (!o.multiSelect) {
                            $(".x3dexp-picker-checkbox", $("#x3dexp-picker-" + o.filter)).property("checked", false);
                        }
                        ckElem.property("checked", isChecked !== true ? true : false);
                    }
                    self._togglePostButton();
                });
                
                itemElem.appendTo(pickerItem);
                
                if (o.displayTitle) {
                    titleItemElem.text(utils.substr(item.title, o.displayTitle)).appendTo(pickerItem);
                    titleItemElem.attr("title", item.title);
                }
                
                if (o.filter === "rss") {
                    itemLink.on("click", function () {
                        self.open({
                            type: "rss",
                            title: $("#x3dexp-set-title").val(),
                            description: checkboxItem.attr("data-description"),
                            links: [{ url: checkboxItem.attr("data-link"), title: checkboxItem.attr("data-title") }]
                        });
                        return false;
                    });
                    itemLink.appendTo(pickerItem);
                }
                else if (o.filter === "medias") {
                    titleItemElem.remove();
                    itemWallPageReader.on("click", function () {
                        self.open({
                            type: "webpage",
                            title: $("#x3dexp-set-title").val(),
                            description: checkboxItem.attr("data-description"),
                            links: [{ url: checkboxItem.attr("data-link"), title: checkboxItem.attr("data-title") }]
                        });
                        return false;
                    });
                    itemWallPageReader.appendTo(pickerItem);
                }
                
                checkboxItem.appendTo(pickerItem);
                pickerItem.appendTo("#x3dexp-picker-" + o.filter);
                
                
                if (o.hideCheckbox) {
                    checkboxItem.property("checked", true).hide();
                    self._togglePostButton();
                }
                
                onItemComplete();
            },
            getBestThumbnail = function (item, cb) {
                var nbThumbnails = item.thumbnail.length,
                    counter = 0,
                    bestThumbnail = null,
                    fcComplete = function (elem, thumbnail) {
                        if (thumbnail && (!bestThumbnail || elem.isDefaultThumbnail || (thumbnail.get(0).width > bestThumbnail.get(0).width && thumbnail.get(0).height > bestThumbnail.get(0).height))) {
                            bestThumbnail = thumbnail;
                        }
                        
                        if (counter === nbThumbnails) {
                            cb && cb(bestThumbnail === null, elem, bestThumbnail);
                        }
                    };
                
                for (var i = 0; i < nbThumbnails; i++) {
                    $("<img/>").attr("src", item.thumbnail[i]).on("load", function () {
                        ++counter;
                        if (isValidItem(item, this)) {
                            fcComplete(item, this);
                            return false;
                        }
                        else {
                            fcComplete(item, null);
                        }
                    }).on("error", function () {
                        ++counter;
                        fcComplete(item, null);
                    });
                }
            };
        
        if (nbItemsFound > 0) {
            o.items.forEach(function (item) {
                if (!utils.is("array", item.thumbnail)) {
                    item.thumbnail = [item.thumbnail];
                }
                
                var stackCounter = 0,
                    onThumbnail = function (err, item, thumbnail) {
                        ++stackCounter;
                        if (err) {
                            
                            if (o.noDefaultThumbnail || stackCounter > 2) {
                                ++itemCounter.all;
                                return onItemComplete();
                            }
                            
                            item.isDefaultThumbnail = true;
                            item.thumbnail = [o.defaultThumbnail];
                            return getBestThumbnail(item, onThumbnail);
                        }
                        
                        onItemLoaded(item, thumbnail);
                    };
                
                if (o.noThumbnail) {
                    onItemLoaded(item, null);
                }
                else {
                    getBestThumbnail(item, onThumbnail);
                }
            });
        }
        else {
            onItemComplete();
        }
    };
    
    Sharer.prototype.parser = function (cb) {
        
        var onComplete = function (err, data) {
            if (cb) {
                cb(err, data);
            }
        };
        
        (function () {
            var infos = {
                sitename: { "default": d.domain },
                src: { "default": d.location.href },
                title: { "default": d.title },
                description: { "default": "" },
                image: { "default": "" },
                media: { "default": "" },
                rss: { "default": "" }
            };
            
            var currentVal;
            $("meta", d).forEach(function (elem) {
                if (elem && (elem.getAttribute("content") || elem.getAttribute("value"))) {
                    currentVal = ((elem.getAttribute("property") || elem.getAttribute("name")) + "").toLowerCase();
                    switch (currentVal) {
                        case "og:site_name":
                        case "al:ios:app_name":
                        case "twitter:site":
                        case "twitter:app:name:iphone":
                        case "twitter:app:name:ipad":
                        case "twitter:app:name:googleplay":
                            infos.sitename[currentVal] = (elem.getAttribute("content") || elem.getAttribute("value")).toLowerCase();
                            break;
                        case "twitter:url":
                        case "og:url":
                            infos.src[currentVal] = elem.getAttribute("content") || elem.getAttribute("value");
                            break;
                        case "twitter:title":
                        case "og:title":
                            infos.title[currentVal] = elem.getAttribute("content") || elem.getAttribute("value");
                            break;
                        case "twitter:description":
                        case "og:description":
                        case "description":
                        case "keywords":
                            infos.description[currentVal] = elem.getAttribute("content") || elem.getAttribute("value");
                            break;
                        case "og:image":
                        case "twitter:image":
                            infos.image[currentVal] = elem.getAttribute("content") || elem.getAttribute("value");
                            break;
                        case "twitter:player":
                        case "og:video:secure_url":
                        case "og:video":
                            infos.media[currentVal] = elem.getAttribute("content") || elem.getAttribute("value");
                            break;
                        default:
                            break;
                    }
                }
            });
            
            $("link", d).forEach(function (elem) {
                if (elem && elem.href) {
                    currentVal = ((elem.getAttribute("itemprop") || elem.getAttribute("rel")) + "").toLowerCase();
                    switch (currentVal) {
                        case "alternate":
                            if ( "application/rss+xml" === (elem.type || "").toLowerCase()) {
                                infos.rss["link"] = elem.href;
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
            
            // Some websites use ajax navigation without refreshing meta tags in header, need to parse data in document body
            // For example: videos on youtube.com
            var videoObject = {};
            videoObject["url"] = $("~[itemtype='http://schema.org/VideoObject'] > link[itemprop='url']").attr("href");
            videoObject["name"] = $("~[itemtype='http://schema.org/VideoObject'] > meta[itemprop='name']").attr("content");
            videoObject["description"] = $("~[itemtype='http://schema.org/VideoObject'] > meta[itemprop='description']").attr("content");
            videoObject["thumbnailUrl"] = $("~[itemtype='http://schema.org/VideoObject'] > link[itemprop='thumbnailUrl']").attr("href");
            videoObject["embedURL"] = $("~[itemtype='http://schema.org/VideoObject'] > link[itemprop='embedURL']").attr("href");
            
            var info = {
                sitename: infos.src["og:site_name"] || infos.src["al:ios:app_name"] || infos.src["twitter:site"] || infos.src["twitter:app:name:iphone"] || infos.src["twitter:app:name:ipad"] || infos.src["twitter:app:name:googleplay"] || infos.src["default"] || "",
                src: videoObject["url"] || infos.src["twitter:url"] || infos.src["og:url"] || infos.src["default"] || "",
                title: videoObject["name"] || infos.title["twitter:title"] || infos.title["og:title"] || infos.title["default"] || "",
                description: videoObject["description"] || infos.description["twitter:description"] || infos.description["og:description"] || infos.description["description"] || infos.description["keywords"] || infos.description["default"] || "",
                image: videoObject["thumbnailUrl"] || infos.image["twitter:image"] || infos.image["og:image"] || infos.image["default"] || "",
                media: videoObject["embedURL"] || infos.media["twitter:player"] || infos.media["og:video:secure_url"] || infos.media["og:video"] || infos.media["default"] || "",
                rss: infos.rss["link"] || infos.rss["default"] || ""
            };

            // special handler for youtube
            if (/youtube\.com$/i.test(d.domain)) {
                var id = "";
                var params = d.location.search.substr(1).split("&");
                for (var i = 0; i < params.length; i++) {
                    var q = params[i].split("=");
                    if (q[0] == "v" && q[1]) {
                        id = q[1];
                        break;
                    }
                }

                if (id) {
                    info.media = "https://youtube.com/embed/" + id;
                    info.image = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
                }
            }
            
            onComplete(null, info);
        }());
    };
    
    Sharer.prototype._togglePostButton = function () {
        var filter = $("#x3dexp-hidden-filter", $("#x3dexp-picker")).attr("value");
        
        var ckElem, nbItems = 0;
        $("input", $("#x3dexp-picker-" + filter)).forEach(function (el) {
            var elem = $(el);
            if (elem.property("checked")) {
                if (!ckElem) {
                    ckElem = elem;
                }
                ++nbItems;
            }
        });
        
        this.updateModalPrimaryButtonTitle(nbItems);
        
        var postButton = $("#x3dexp-modal-btn-primary");
        if (ckElem) {
            postButton.removeClass("x3dexp-btn-disabled");
        }
        else {
            postButton.addClass("x3dexp-btn-disabled");
        }
    };
    
    Sharer.prototype.pictures = {
        display: function (self) {
            
            if (this.loading) {
                return;
            }
        
            $("#x3dexp-picker-loading").show();
            $("#x3dexp-hidden-filter").attr("value", "pictures");
            self._togglePostButton();
            
            var displayPickerItems = function () {
                $("#x3dexp-picker-loading").hide();
                $(".x3dexp-picker-header-elem", $("#x3dexp-sharer")).hide();
                $("#x3dexp-select-all-cont").show();
                $("#x3dexp-set-title-cont").show();
                
                var pickerItems = $("#x3dexp-picker-pictures");
                
                if ($("#x3dexp-hidden-filter").attr("value") === "pictures") {
                    pickerItems.show();
                }
                
                var buttonSelectAll = $("#x3dexp-select-all"), buttonPrimary = $("#x3dexp-modal-btn-primary");
                
                buttonSelectAll.hide();
                buttonPrimary.hide();
                
                if (!$(".x3dexp-picker-item", pickerItems).size()) {
                    !$(".x3dexp-picker-msg", pickerItems).size() && $("<li/>").attr("class", "x3dexp-picker-msg").text(getNls("no_photo_found")).appendTo(pickerItems);
                }
                else {
                    buttonSelectAll.show();
                    buttonPrimary.show();
                }
            };
            
            if (!this.loaded) {
                
                this.loading = true;
                
                var that = this;
                self.parser(function (err, info) {
                    that.loaded = true;
                    that.loading = false;
                    
                    var items = [], elemTitle;
                    
                    // default values
                    if (info.image) {
                        items.push({
                            title: info.image,
                            description: info.description,
                            thumbnail: info.image,
                            link: info.image
                        });
                    }
                    
                    $("img").forEach(function (elem) {
                        elemTitle = [];
                        if (elem.title.trim()) {
                            elemTitle.push(elem.title.trim());
                        }
                        else if (elem.alt.trim()) {
                            elemTitle.push(elem.alt.trim());
                        }
                        else {
                            elemTitle.push(elem.width + " x " + elem.height);
                        }
                        
                        elem.src && items.push({
                            title: elemTitle.join(" "),
                            description: info.description,
                            thumbnail: elem.src,
                            link: elem.src
                        });
                    });
                    
                    if (!items.length) {
                        return displayPickerItems();
                    }
                    
                    self.displayItems({
                        filter: "pictures",
                        items: items,
                        displayTitle: 17,
                        unique: true,
                        multiSelect: true,
                        noDefaultThumbnail: true,
                        selectAllPanel: true,
                        defaultThumbnail: self._options.thumbnail.pictures,
                        onFirstItemValid: displayPickerItems,
                        onComplete: displayPickerItems
                    });
                });
            }
            else {
                displayPickerItems();
            }
        },
        hide: function () {
            $("#x3dexp-picker-pictures").hide();
        },
        loaded: false
    };
    
    Sharer.prototype.medias = {
        display: function (self) {
            
            if (this.loading) {
                return;
            }
            
            $("#x3dexp-picker-loading").show();
            $("#x3dexp-hidden-filter").attr("value", "medias");
            $("#x3dexp-modal-btn-primary").show();
            self._togglePostButton();
            
            var displayPickerItems = function () {
                $("#x3dexp-picker-loading").hide();
                $(".x3dexp-picker-header-elem", $("#x3dexp-sharer")).hide();
                $("#x3dexp-set-title-cont").show();
                
                var pickerItems = $("#x3dexp-picker-medias"), buttonPrimary = $("#x3dexp-modal-btn-primary");
                
                buttonPrimary.hide();
                
                if ($("#x3dexp-hidden-filter").attr("value") === "medias") {
                    pickerItems.show();
                }
                
                if (!$(".x3dexp-picker-item", pickerItems).size()) {
                    !$(".x3dexp-picker-msg", pickerItems).size() && $("<li/>").attr("class", "x3dexp-picker-msg").text(getNls("no_media_found")).appendTo(pickerItems);
                }
                else {
                    buttonPrimary.show();
                }
            };
            
            if (!this.loaded) {
                
                this.loading = true;
                
                var that = this;
                self.parser(function (err, info) {
                    that.loaded = true;
                    that.loading = false;
                    
                    var items = [];
                    
                    // default values
                    if (info.media) {
                        items.push({
                            title: info.title,
                            description: info.description,
                            thumbnail: info.image,
                            link: self.medias.sanitizeVideoUrl(info.media, info.sitename)
                        });
                    }

                    if (!items.length) {
                        $("video").forEach(function (elem) {
                            // skip hidden elem
                            if (elem.offsetParent === null) {
                                return
                            }

                            var thumbnail = self._options.thumbnail.medias;
                            if (elem.poster) {
                                thumbnail = elem.poster;
                            }

                            if (elem.src) {
                                items.push({
                                    title: d.title,
                                    description: "",
                                    thumbnail: thumbnail,
                                    link: self.medias.sanitizeVideoUrl(elem.src.replace(/^blob:/i, ""), info.sitename)
                                });
                            }
                            else if($("source", elem).size()) {
                                items.push({
                                    title: d.title,
                                    description: "",
                                    thumbnail: thumbnail,
                                    link: self.medias.sanitizeVideoUrl($("source", elem).get(0).src, info.sitename)
                                });
                            }
                        });
                    }
                    
                    if (!items.length) {
                        return displayPickerItems();
                    }
                    
                    self.displayItems({
                        filter: "medias",
                        items: items,
                        displayTitle: 44,
                        unique: items.length == 1,
                        hideCheckbox: items.length == 1,
                        defaultThumbnail: self._options.thumbnail.medias,
                        onFirstItemValid: displayPickerItems,
                        onComplete: displayPickerItems
                    });
                });
            }
            else {
                displayPickerItems();
            }
        },
        hide: function () {
            $("#x3dexp-picker-medias").hide();
        },
        loaded: false,
        sanitizeVideoUrl: function (url, sitename) {
            url = url || "";
            sitename = sitename || d.domain;
            
            if ((sitename === "youtube" || utils.is("domain", "youtube.com")) && !~url.indexOf("/embed/")) {
                url = "https://www.youtube.com/embed/" + url.replace(/^(?:.*?)\bv(?:=|\/)([a-z0-9_-]+)\b(?:.*?)$/i, "$1");
            }
            else if ((sitename === "vimeo" || utils.is("domain", "vimeo.com")) && !~url.indexOf("player.vimeo.com")) {
                url = "https://player.vimeo.com/video/" + url.replace(/^(?:.*?)\bclip_id=([a-z0-9_-]+)\b(?:.*?)$/i, "$1");
            }
            
            return url;
        }
    };
    
    Sharer.prototype.rss = {
        display: function (self) {
            
            if (this.loading) {
                return;
            }
            
            $("#x3dexp-picker-loading").show();
            $("#x3dexp-hidden-filter").attr("value", "rss");
            $("#x3dexp-modal-btn-primary").hide();
            self._togglePostButton();
            
            var displayPickerItems = function () {
                $("#x3dexp-picker-loading").hide();
                $(".x3dexp-picker-header-elem", $("#x3dexp-sharer")).hide();
                $("#x3dexp-current-url-cont").show();
                $("#x3dexp-picker-title").text(getNls("rss_feeds") + ":").show();
                $("#x3dexp-set-title-cont").show();
                
                var pickerItems = $("#x3dexp-picker-rss"), pickerMsg = $(".x3dexp-picker-msg", pickerItems);
                
                if ($("#x3dexp-hidden-filter").attr("value") === "rss") {
                    pickerItems.show();
                }
                
                if (!$(".x3dexp-picker-item", pickerItems).size()) {
                    !pickerMsg.size() && $("<li/>").attr("class", "x3dexp-picker-msg").text(getNls("no_rss_found")).appendTo(pickerItems);
                }
                else {
                    pickerMsg.hide();
                }
            };
            
            if (!this.loaded) {
                
                this.loading = true;
                
                var that = this;
                self.parser(function (err, info) {
                    that.loaded = true;
                    that.loading = false;
                    
                    var items = [];
                    
                    // default values
                    if (info.rss) {
                        items.push({
                            title: info.rss,
                            description: info.description,
                            link: info.rss
                        });
                    }
                    
                    if (info.sitename === "facebook" || utils.is("domain", "facebook.com")) {
                        //get page id
                        var pageId;
                        if (typeof bigPipe !== "undefined" && bigPipe._livePagelets) {
                            for (var key in bigPipe._livePagelets) {
                                if (key.indexOf("PageAdsPagelet_") === 0) {
                                    pageId = key.replace("PageAdsPagelet_", "");
                                    break;
                                }
                            }
                        }
                        
                        var feed = "https://www.facebook.com/feeds/page.php?format=atom10&id=" + pageId;
                        items.push({
                            title: feed,
                            description: info.description,
                            link: feed
                        });
                    }
                    
                    $("a").forEach(function (elem) {
                        if (!elem) {
                            return;
                        }
                        
                        var href = (elem.href || "").trim();
                        if (/^[^?#]*(?:\.(?:rss|xml|gne)|\?rss=1)$/i.test(href)) {
                            items.push({
                                title: elem.href,
                                description: info.description,
                                link: elem.href
                            });
                        }
                        else if (/Subscribe/i.test($(elem).text())) {
                            items.push({
                                title: elem.href,
                                description: info.description,
                                link: elem.href
                            });
                        }
                    });
                    
                    if (!items.length) {
                        return displayPickerItems();
                    }
                    
                    self.displayItems({
                        filter: "rss",
                        items: items,
                        unique: true,
                        displayTitle: 44,
                        noThumbnail: true,
                        defaultThumbnail: self._options.thumbnail.rss,
                        onFirstItemValid: displayPickerItems,
                        onComplete: displayPickerItems
                    });
                });
            }
            else {
                displayPickerItems();
            }
        },
        hide: function () {
            $("#x3dexp-picker-rss").hide();
        },
        loaded: false
    };

    Sharer.prototype.JSON = {
        stringify: function (data) {
            return JSON.stringify(data);
        },
        parse: function (data) {
            return JSON.parse(data);
        }
    };
    
    Sharer.prototype.displayNotification = function (text) {
        text = text || "";
        
        $("#x3dexp-modal-notification-content").text(text);
        
        var elem = $("#x3dexp-modal-notification").show();
        setTimeout(function () {
            elem.hide();
        }, 5000);
    };

    Sharer.prototype.open = function (params) {
        var opts, width = 500, height = 700, url = this._options.endpoint;
        opts = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",toolbar=no,left=0,top=0,fullscreen=no,location=no,resizable=no,modal=yes,dialog=true";
        
        var query = [];
        query.push("__x3dsharer");
        
        var hash = [];
        //hash.push("__x3dsharer");
        //hash.push("__t=" + Date.now());
        
        switch (params.type) {
            case "rss":
                hash.push("app:NETFEOP_AP");
                hash.push("content:title=" + encodeURIComponent(params.title) + "&feedUrl=" + encodeURIComponent(params.links[0].url));
                break;
            
            case "page":
            case "slides":
            case "webpage":
                hash.push("app:X3DWEBP_AP");
                hash.push("content:title=" + encodeURIComponent(params.title) + "&webUrl=" + encodeURIComponent(params.links[0].url));
                break;
            
            //case "medias":
            //case "pictures":
            //case "quicklinks":
            default:
                hash.push("app:X3DLINK_AP");
                
                var props = [];
                for (var i = 0, arrLength = params.links.length; i < arrLength; i++) {
                    props.push({ "link": params.links[i].url, "title": params.links[i].title || params.title });
                }
                
                hash.push("content:title=" + encodeURIComponent(params.title) + "&links=" + encodeURIComponent(this.JSON.stringify(props)));
        }
        
        url += "?" + query.join("&");
        url += "#" + hash.join("/");
        
        if (w["__x3dexp_bookmarklet"].popup) {
            w["__x3dexp_bookmarklet"].popup.close();
            delete w["__x3dexp_bookmarklet"].popup;
        }
        
        // Maximum URL length is 2,083 characters in Internet Explorer: https://support.microsoft.com/en-us/kb/208427
        if (("ActiveXObject" in window) && url.length >= 2000) {
            this.displayNotification(getNls("ie_url_problem"));
        }
        else {
            w["__x3dexp_bookmarklet"].popup = w.open(url, "_blank", opts, true);
        }
        
        return this;
    };
    
    Sharer.prototype.close = function() {
        var x3dexpContainer = $("#x3dexp-sharer"), modal = $("#x3dexp-modal");
        modal.addClass("x3dexp-modal-animated-low-size");
        $("#x3dexp-scrim").addClass("x3dexp-scrim-animated-hide");
        x3dexpContainer.addClass("x3dexp-sharer-animated");
        
        modal.on("transitionend", function () {
        
            if (x3dexpContainer.size()) {
                x3dexpContainer.remove();
            }
            
            if ($("#x3dexp-stylesheet").size()) {
                $("#x3dexp-stylesheet").remove();
            }
            
            // post message to current window
            w.postMessage(JSON.stringify({ "key": "ds-bookmarklet", "type": "close" }), "*");
        });
    };
    
    w["__x3dexp_bookmarklet"].$ = $;
    
    if (d.getElementById("x3dexp-sharer")) {
        //Sharer.prototype.close();
        return false;
    }
    
    var currentSharer = new Sharer({
        endpoint: origin.replace(/\/resources\/.*$/, ""),
        webappsFolder: origin,
        staticSrc: origin + "Bookmarklet/assets"
    });
    
    w["__x3dexp_bookmarklet"].sharer = currentSharer;
}

__Bookmarklet.prototype.postMsg = function () {
    "use strict";
    window.parent.postMessage(JSON.stringify({ "key": "ds-bookmarklet", "type": "init", "data": __Bookmarklet.toString() }), "*");
};

// post message, modal window should be displayed if this script has been loaded via Bookmarklet link (see GettingTheBookmarklet.js)
__Bookmarklet.prototype.postMsg();


/*
 * Support for DS AMD (needed for running tests)
 */

if (typeof define === "undefined") {
    define = function () {};
}

define("DS/Bookmarklet/Bookmarklet", [], function () {
    "use strict";
    
    var exports = {};
    
    exports.get = __Bookmarklet;
    
    exports.postMsg = __Bookmarklet.prototype.postMsg;

    return exports;
});


