/// <amd-module name='DS/EPSSchematicsUI/edges/views/EPSSchematicsUILinkView'/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("DS/EPSSchematicsUI/edges/views/EPSSchematicsUILinkView", ["require", "exports", "DS/EPSSchematicsUI/edges/views/EPSSchematicsUIEdgeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIPort", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, UIEdgeView, UIDom, UIPort, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI link view.
     * @class UILinkView
     * @alias module:DS/EPSSchematicsUI/edges/views/EPSSchematicsUILinkView
     * @abstract
     * @private
     */
    var UILinkView = /** @class */ (function (_super) {
        __extends(UILinkView, _super);
        /**
         * @constructor
         * @param {UILink} link - The UI link.
         * @param {string} className - The name of the CSS class to use for displaying the link.
         */
        function UILinkView(link, className) {
            var _this = _super.call(this, className) || this;
            _this._onMouseEnterCB = _this._onMouseEnter.bind(_this);
            _this._onMouseLeaveCB = _this._onMouseLeave.bind(_this);
            _this._link = link;
            return _this;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Highlights the link's view.
         * @private
         */
        UILinkView.prototype.highlight = function () {
            if (this.structure.root !== undefined && this.structure.root !== null) {
                UIDom.addClassName(this.structure.root, 'sch-link-highlight');
            }
        };
        /**
         * Unhighlights the link's view.
         * @private
         */
        UILinkView.prototype.unhighlight = function () {
            if (this.structure.root !== undefined && this.structure.root !== null) {
                UIDom.removeClassName(this.structure.root, 'sch-link-highlight');
            }
        };
        /**
         * The callback on the validity change event of a link.
         * @public
         */
        UILinkView.prototype.onValidityChange = function () {
            if (!this._link.getModel().isValid()) {
                UIDom.addClassName(this.display.elt.parentElement, 'sch-link-invalid');
                this.createInvalidPathClone();
            }
            else {
                UIDom.removeClassName(this.display.elt.parentElement, 'sch-link-invalid');
                this.removeInvalidPathClone();
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the link view.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UILinkView.prototype.ondestroyDisplay = function (elt, grView) {
            if (this.structure.root !== undefined && this.structure.root !== null) {
                this.structure.root.removeEventListener('mouseenter', this._onMouseEnterCB);
                this.structure.root.removeEventListener('mouseleave', this._onMouseLeaveCB);
            }
            this._link = undefined;
            this._invalidPathClone = undefined;
            this._onMouseEnterCB = undefined;
            this._onMouseLeaveCB = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Creates the link view.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UILinkView.prototype.oncreateDisplay = function (elt, grView) {
            _super.prototype.oncreateDisplay.call(this, elt, grView);
            this.structure.root.addEventListener('mouseenter', this._onMouseEnterCB);
            this.structure.root.addEventListener('mouseleave', this._onMouseLeaveCB);
            this.onValidityChange();
        };
        /**
         * The callback to apply modified properties to the display.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.PathSetTrie} changes - Set of paths of modified properties.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UILinkView.prototype.onmodifyDisplay = function (elt, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, elt, changes, grView);
            this.syncInvalidPathClone();
            if (EGraphCore.inPathSet(changes, 'selected')) {
                var startPort = this._link.getStartPort();
                if (startPort instanceof UIPort) {
                    var startPortView = startPort.getView();
                    if (elt.isSelected()) {
                        startPortView.showRerouteHandler();
                    }
                    else {
                        startPortView.hideRerouteHandler();
                    }
                }
                var endPort = this._link.getEndPort();
                if (endPort instanceof UIPort) {
                    var endPortView = endPort.getView();
                    if (elt.isSelected()) {
                        endPortView.showRerouteHandler();
                    }
                    else {
                        endPortView.hideRerouteHandler();
                    }
                }
            }
        };
        /**
         * The callback on the link view mouse enter event.
         * @protected
         * @param {MouseEvent} event - The mouse enter event.
         */
        // eslint-disable-next-line no-unused-vars
        UILinkView.prototype._onMouseEnter = function (event) {
            var startPort = this._link.getStartPort();
            var endPort = this._link.getEndPort();
            if (startPort !== undefined) {
                startPort.highlight();
            }
            if (endPort !== undefined) {
                endPort.highlight();
            }
            this.highlight();
        };
        /**
         * The callback on the link view mouse leave event.
         * @protected
         */
        UILinkView.prototype._onMouseLeave = function () {
            var startPort = this._link.getStartPort();
            var endPort = this._link.getEndPort();
            startPort.unhighlight();
            endPort.unhighlight();
            this.unhighlight();
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Creates an invalid path clone.
         * @private
         */
        UILinkView.prototype.createInvalidPathClone = function () {
            if (this._invalidPathClone === undefined) {
                this._invalidPathClone = UIDom.createSVGPath({
                    className: 'sch-link-path-invalid',
                    parent: this.structure.root
                });
                this.display.invalidPathClone = this._invalidPathClone;
                this.display.invalidPathClone.grElt = this._link.getDisplay();
                this.display.invalidPathClone.subElt = 'invalidPathClone';
                this.syncInvalidPathClone();
            }
        };
        /**
         * Removes the invalid path clone.
         * @private
         */
        UILinkView.prototype.removeInvalidPathClone = function () {
            if (this._invalidPathClone !== undefined) {
                this.structure.root.removeChild(this._invalidPathClone);
                this._invalidPathClone = undefined;
            }
        };
        /**
         * Synchronizes the invalid path clone.
         * @private
         */
        UILinkView.prototype.syncInvalidPathClone = function () {
            if (this._invalidPathClone !== undefined) {
                var path = this.elts.elt.getAttribute('d');
                if (path !== null && path !== undefined) {
                    this._invalidPathClone.setAttribute('d', path);
                }
            }
        };
        return UILinkView;
    }(UIEdgeView));
    return UILinkView;
});
