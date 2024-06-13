/// <amd-module name='DS/EPSSchematicsUI/tools/EPSSchematicsUIDom'/>
define("DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphUtils", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools"], function (require, exports, EgraphUtils, UIWUXTools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var UIDom = /** @class */ (function () {
        function UIDom() {
        }
        /**
         * Adds the given className to the provided element.
         * @public
         * @static
         * @param {Element|SVGElement} element - The Element or SVG Element.
         * @param {string|Array<string>} className - The className or list of className to add.
         */
        UIDom.addClassName = function (element, className) {
            if (element !== undefined && className !== undefined && className !== '') {
                var list = Array.isArray(className) ? this.flatDeep(className) : [className];
                list.forEach(function (name) { return EgraphUtils.classListAdd(element, name); });
            }
        };
        /**
         * Removes the given className from the provided element.
         * @public
         * @static
         * @param {Element|SVGElement} element - The Element or SVG Element.
         * @param {string|Array<string>} className - The className or list of className to remove.
         */
        UIDom.removeClassName = function (element, className) {
            if (element !== undefined && className !== undefined && className !== '') {
                var list = Array.isArray(className) ? className : [className];
                list.forEach(function (name) { return EgraphUtils.classListRemove(element, name); });
            }
        };
        /**
         * Toggles the given className from the provided element.
         * @public
         * @static
         * @param {Element|SVGElement} element - The Element or SVG Element.
         * @param {string|Array<string>} className - The className or list of className.
         */
        UIDom.toggleClassName = function (element, className) {
            var _this = this;
            if (element !== undefined && className !== undefined && className !== '') {
                var list = Array.isArray(className) ? className : [className];
                list.forEach(function (name) {
                    var fct = _this.hasClassName(element, name) ? _this.removeClassName : _this.addClassName;
                    fct(element, name);
                });
            }
        };
        /**
         * Checks if the provided element has the given className.
         * @public
         * @static
         * @param {Element|SVGElement} element - The Element or SVG Element.
         * @param {string|Array<string>} className - The className or list of className.
         * @returns {boolean} True if the element has the className else false.
         */
        UIDom.hasClassName = function (element, className) {
            var result = false;
            if (element !== undefined) {
                var list = Array.isArray(className) ? className : [className];
                for (var l = 0; l < list.length; l++) {
                    result = EgraphUtils.classListContains(element, list[l]);
                    if (!result) {
                        break;
                    }
                }
            }
            return result;
        };
        /**
         * Merges multiple className into one array.
         * @public
         * @static
         * @param {string|Array<string>} className1 - The className or list of className.
         * @param {string|Array<string>} [className2] - The className or list of className.
         * @returns {Array<string>} The merged className.
         */
        UIDom.mergeClassName = function (className1, className2) {
            if (className2 === void 0) { className2 = []; }
            var className = this.flatDeep([className1, className2]);
            return className;
        };
        /**
         * Clears the className of the provided element.
         * @public
         * @static
         * @param {Element|SVGElement} element - The Element or SVG Element.
         */
        UIDom.clearClassName = function (element) {
            if (element) {
                element.setAttribute('class', '');
            }
        };
        /**
         * Deep flats the provided array.
         * TODO: Array.flat not available in TS2.5!
         * @private
         * @static
         * @param {Array<*>} arr - The array to flat.
         * @returns {Array<*>} The flatten array.
         */
        UIDom.flatDeep = function (arr) {
            var _this = this;
            return arr.reduce(function (acc, val) { return acc.concat(Array.isArray(val) ? _this.flatDeep(val) : val); }, []);
        };
        /**
         * Gets the element bounding box including its margin, padding and border.
         * @public
         * @static
         * @param {Element} element - The element.
         * @returns {IDOMRect} The element computed style bounding box.
         */
        UIDom.getComputedStyleBBox = function (element) {
            var bbox = { width: 0, height: 0 };
            if (element instanceof HTMLElement) {
                var style = window.getComputedStyle(element);
                var eltWidth = parseFloat(style.width);
                if (element.textContent !== null && element.textContent !== undefined && element.textContent !== '') {
                    eltWidth = UIDom.computeTextWidth(element.textContent, this.getFontFromStyle(style));
                }
                var eltMarginWidth = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                var eltPaddingWidth = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
                var eltBorderWidth = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
                var eltMinWidth = parseFloat(style.minWidth);
                bbox.width = eltWidth + eltMarginWidth + eltPaddingWidth + eltBorderWidth;
                bbox.width = eltMinWidth > 0 && bbox.width < eltMinWidth ? eltMinWidth : bbox.width;
                var eltHeight = parseFloat(style.height);
                var eltMarginHeight = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
                var eltPaddingHeight = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
                var eltBorderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
                var eltMinHeight = parseFloat(style.minHeight);
                bbox.height = eltHeight + eltMarginHeight + eltPaddingHeight + eltBorderHeight;
                bbox.height = eltMinHeight > 0 && bbox.height < eltMinHeight ? eltMinHeight : bbox.height;
            }
            return bbox;
        };
        /**
         * Gets the font declaration from the diven CSS style declaration.
         * This is a workaround for Firefox only regression that causes style.font to be empty! (Chrome supports it!)
         * @private
         * @param {CSSStyleDeclaration} style - The CSS style declaration.
         * @returns {string} The font declaration.
         */
        UIDom.getFontFromStyle = function (style) {
            var fontStyle = style.getPropertyValue('font-style');
            var fontVariant = style.getPropertyValue('font-variant');
            var fontWeight = style.getPropertyValue('font-weight');
            var fontSize = style.getPropertyValue('font-size');
            var fontFamily = style.getPropertyValue('font-family');
            var font = (fontStyle + ' ' + fontVariant + ' ' + fontWeight + ' ' + fontSize + ' ' + fontFamily).replace(new RegExp(' +', 'g'), ' ').trim();
            return font;
        };
        /**
         * Computes the text width.
         * @public
         * @static
         * @param {string} text - The text.
         * @param {string} font - The font.
         * @returns {number} The text width.
         */
        UIDom.computeTextWidth = function (text, font) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            context.font = font;
            var metrics = context.measureText(text);
            return metrics.width;
        };
        /**
         * Gets the html element borders width.
         * @public
         * @static
         * @param {HTMLElement} element - The html element.
         * @returns {IDOMRect} The html element computed style border width.
         */
        UIDom.getComputedStyleBorderWidth = function (element) {
            var border = { left: 0, right: 0, top: 0, bottom: 0 };
            if (element instanceof HTMLElement) {
                var style = window.getComputedStyle(element);
                border.left = parseFloat(style.borderLeftWidth);
                border.right = parseFloat(style.borderRightWidth);
                border.top = parseFloat(style.borderTopWidth);
                border.bottom = parseFloat(style.borderBottomWidth);
            }
            return border;
        };
        /**
         * Gets the computed style of the element.
         * @public
         * @static
         * @param {Element} element - The element to get the style from.
         * @param {string} styleName - The name of the style to get.
         * @returns {string} The computed style.
         */
        UIDom.getComputedStyle = function (element, styleName) {
            var style = '';
            if (element instanceof Element) {
                style = window.getComputedStyle(element)[styleName];
            }
            return style;
        };
        /**
         * Gets the html element minimum dimension.
         * @public
         * @static
         * @param {HTMLElement} element - The html element.
         * @returns {IDOMRect} The html element computed style minimum dimension.
         */
        UIDom.getComputedStyleMinDimension = function (element) {
            var minDimension = { width: 0, height: 0 };
            if (element instanceof HTMLElement) {
                var style = window.getComputedStyle(element);
                minDimension.width = parseFloat(style.minWidth);
                minDimension.height = parseFloat(style.minHeight);
            }
            return minDimension;
        };
        /**
         * Creates a new DOM element.
         * @public
         * @static
         * @param {string} tagName - The element tag name.
         * @param {IDomOptions} [options] - The creation options.
         * @returns {Element} The created DOM element.
         */
        UIDom.createElement = function (tagName, options) {
            var element = document.createElement(tagName);
            return this.applyOptions(element, options);
        };
        /**
         * Creates an SVG circle.
         * @public
         * @static
         * @param {ISVGCircleOptions} [options] - The creation options.
         * @returns {SVGCircleElement} The SVG circle.
         */
        UIDom.createSVGCircle = function (options) {
            var element = document.createElementNS(this.svgNS, 'circle');
            return this.applyOptions(element, options);
        };
        /**
         * Creates an SVG element.
         * @public
         * @static
         * @param {IDomOptions} [options] - The creation options.
         * @returns {SVGSVGElement} The SVG element.
         */
        UIDom.createSVGElement = function (options) {
            var element = document.createElementNS(this.svgNS, 'svg');
            return this.applyOptions(element, options);
        };
        /**
         * Creates an SVG group.
         * @public
         * @static
         * @param {IDomOptions} [options] - The creation options.
         * @returns {SVGGElement} The SVG group.
         */
        UIDom.createSVGGroup = function (options) {
            var element = document.createElementNS(this.svgNS, 'g');
            return this.applyOptions(element, options);
        };
        /**
         * Creates an SVG line.
         * @public
         * @static
         * @param {ISVGLineOptions} [options] - The creation options.
         * @returns {SVGLineElement} The SVG line.
         */
        UIDom.createSVGLine = function (options) {
            var element = document.createElementNS(this.svgNS, 'line');
            return this.applyOptions(element, options);
        };
        /**
         * Creates an SVG path.
         * @public
         * @static
         * @param {ISVGPathOptions} [options] - The creation options.
         * @returns {SVGPathElement} The SVG path.
         */
        UIDom.createSVGPath = function (options) {
            var element = document.createElementNS(this.svgNS, 'path');
            return this.applyOptions(element, options);
        };
        /**
         * Creates an SVG polygon.
         * @public
         * @static
         * @param {ISVGPolygonOptions} [options] - The creation options.
         * @returns {SVGPolygonElement} The SVG polygon.
         */
        UIDom.createSVGPolygon = function (options) {
            var element = document.createElementNS(this.svgNS, 'polygon');
            return this.applyOptions(element, options);
        };
        /**
         * Creates an SVG rectangle.
         * @public
         * @static
         * @param {ISVGRectOptions} [options] - The creation options.
         * @returns {SVGRectElement} The SVG rectangle.
         */
        UIDom.createSVGRect = function (options) {
            var element = document.createElementNS(this.svgNS, 'rect');
            return this.applyOptions(element, options);
        };
        /**
         * Creates an SVG text.
         * @public
         * @static
         * @param {IDomOptions} [options] - The creation options.
         * @returns {SVGTextElement} The SVG text.
         */
        UIDom.createSVGText = function (options) {
            var element = document.createElementNS(this.svgNS, 'text');
            return this.applyOptions(element, options);
        };
        /**
         * Creates an SVG tspan element.
         * @public
         * @static
         * @param {ISVGTSpanOptions} [options] - The creation options.
         * @returns {SVGTSpanElement} The SVG tspan element.
         */
        UIDom.createSVGTSpan = function (options) {
            var element = document.createElementNS(this.svgNS, 'tspan');
            return this.applyOptions(element, options);
        };
        /**
         * Transforms the provided SVG shape.
         * @public
         * @static
         * @param {SVGGraphicsElement} shape - The SVG shape element.
         * @param {number} x - The x translate value.
         * @param {number} y - The y translate value.
         * @param {number} r - The r rotate value.
         */
        UIDom.transformSVGShape = function (shape, x, y, r) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (r === void 0) { r = 0; }
            var svg = this.createSVGElement();
            var matrix = shape.getCTM();
            if (matrix === undefined || matrix === null) {
                matrix = svg.createSVGMatrix();
            }
            matrix = matrix.translate(x, y).rotate(r);
            var transform = svg.createSVGTransformFromMatrix(matrix);
            shape.transform.baseVal.appendItem(transform);
        };
        /**
         * Renders an offscreen SVG element in order to compute its bounding box and
         * get its rendered width and height.
         * @public
         * @static
         * @param {SVGElement} svgElt - The SVG Element to render.
         * @param {Array.<string>} [parentClassNames] - A list of parent classNames to add.
         * @returns {Object} The bounding box of the SVG Element.
         */
        UIDom.renderedSVGBBox = function (svgElt, parentClassNames) {
            var bbox = { width: 0, height: 0 };
            if (svgElt !== undefined) {
                var parent_1;
                var svgClone = svgElt.cloneNode(true);
                if (Array.isArray(parentClassNames)) {
                    for (var c = 0; c < parentClassNames.length; c++) {
                        var g = UIDom.createSVGGroup({ className: parentClassNames[c] });
                        if (parent_1 !== undefined) {
                            parent_1.appendChild(g);
                        }
                        else {
                            parent_1 = g;
                        }
                        if (c === parentClassNames.length - 1) {
                            g.appendChild(svgClone);
                        }
                    }
                }
                parent_1 = parent_1 || svgClone;
                svgClone.setAttribute('style', 'display:inline-block');
                svgClone.setAttribute('style', 'visibility:hidden');
                var svg = UIDom.createSVGElement();
                svg.appendChild(parent_1);
                document.body.appendChild(svg);
                var bCBox = svgClone.getBoundingClientRect();
                document.body.removeChild(svg);
                svg.removeChild(parent_1);
                bbox.width = bCBox.width;
                bbox.height = bCBox.height;
            }
            return bbox;
        };
        /**
         * Loads the CSS file with the specified path.
         * @public
         * @static
         * @param {string} path - The CSS file path to load.
         * @param {function} [callback] - The callback of the resource loaded event.
         */
        UIDom.loadCSS = function (path, callback) {
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = path;
            if (callback !== undefined && callback !== null) {
                link.onload = function (e) { return callback(e); };
            }
            document.getElementsByTagName('head')[0].appendChild(link);
        };
        /**
         * Loads the JS file with the specified path.
         * @public
         * @static
         * @param {string} path - The JS file path to load.
         * @param {function} callback - The callback of the resource loaded event.
         */
        UIDom.loadJS = function (path, callback) {
            var script = document.createElement('script');
            script.type = 'text/JavaScript';
            script.src = path;
            if (callback !== undefined && callback !== null) {
                script.onload = function (e) { return callback(e); };
            }
            document.getElementsByTagName('head')[0].appendChild(script);
        };
        /**
         * Applies the provided options to the given element.
         * @public
         * @static
         * @param {IWUXElement} element - The element.
         * @param {IDomOptions} [options] - The creation options.
         * @returns {Element} The element.
         */
        UIDom.applyOptions = function (element, options) {
            if (element !== undefined && options !== undefined) {
                if (options.className !== undefined) {
                    this.addClassName(element, options.className);
                }
                if (options.children !== undefined) {
                    options.children.forEach(function (child) { return element.appendChild(child); });
                }
                if (options.textContent !== undefined) {
                    element.textContent = options.textContent;
                }
                if (options.attributes !== undefined) {
                    for (var aProp in options.attributes) {
                        if (options.attributes.hasOwnProperty(aProp)) {
                            element.setAttribute(aProp, options.attributes[aProp]);
                        }
                    }
                }
                if (options.style !== undefined && element instanceof HTMLElement) {
                    for (var sProp in options.style) {
                        if (options.style.hasOwnProperty(sProp)) {
                            element.style[sProp] = options.style[sProp];
                        }
                    }
                }
                if (options.tooltipInfos !== undefined) {
                    element.tooltipInfos = UIWUXTools.createTooltip(options.tooltipInfos);
                }
                if (options.innerHTML !== undefined) {
                    element.innerHTML = options.innerHTML;
                }
                if (options.onclick !== undefined && element instanceof HTMLElement) {
                    element.onclick = function (e) { return options.onclick(e); };
                }
                if (element instanceof HTMLElement || element instanceof SVGElement) {
                    element.onanimationend = options.onanimationend || null;
                }
                if (options.parent !== undefined) {
                    if (options.insertBefore !== undefined) {
                        options.parent.insertBefore(element, options.insertBefore);
                    }
                    else {
                        options.parent.appendChild(element);
                    }
                }
            }
            return element;
        };
        /**
         * Computes the distance of an element from the mouse.
         * @protected
         * @param {Element} element - The element to compute the distance from.
         * @param {number} mouseLeft - The left position of the mouse.
         * @param {number} mouseTop - The top position of the mouse.
         * @returns {number} The distance between the mouse cursor and the element.
         */
        UIDom.computeDistanceFromMouse = function (element, mouseLeft, mouseTop) {
            var distance = 0;
            var distLeft = 0;
            var distTop = 0;
            var elementBbox = element.getBoundingClientRect();
            var left = elementBbox.left;
            var top = elementBbox.top;
            var width = elementBbox.width;
            var height = elementBbox.height;
            if (mouseLeft <= left) {
                distLeft = left - mouseLeft;
            }
            else if (mouseLeft >= (left + width)) {
                distLeft = mouseLeft - (left + width);
            }
            if (mouseTop >= (top + height)) {
                distTop = mouseTop - (top + height);
            }
            else if (mouseTop <= top) {
                distTop = top - mouseTop;
            }
            distance = Math.sqrt((distLeft * distLeft) + (distTop * distTop));
            return distance;
        };
        /**
         * @member {string} The standard SVG namespace.
         */
        UIDom.svgNS = 'http://www.w3.org/2000/svg';
        return UIDom;
    }());
    return UIDom;
});
