/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIShortcutDataPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIShortcutDataPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIDataPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/data/EPSSchematicsUIShapes", "css!DS/EPSSchematicsUI/css/connectors/EPSSchematicsUIShortcutDataPort"], function (require, exports, UIDataPortView, UIDom, UIShapes) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI shortcut data port view.
     * @class UIShortcutDataPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIShortcutDataPortView
     * @extends UIDataPortView
     * @private
     */
    var UIShortcutDataPortView = /** @class */ (function (_super) {
        __extends(UIShortcutDataPortView, _super);
        /**
         * @constructor
         * @param {UIShortcutDataPort} port - The UI shortcut data port.
         */
        function UIShortcutDataPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Updates the connector width.
         * @public
         * @override
         */
        // eslint-disable-next-line class-methods-use-this
        UIShortcutDataPortView.prototype.updateConnectorWidth = function () {
        };
        /**
         * Destroys the connector.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view.
         */
        UIShortcutDataPortView.prototype.ondestroyDisplay = function (elt, grView) {
            this._icon = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the connector SVG element.
         * @protected
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIShortcutDataPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-shortcut-data-port');
            var shortcutType = this._port.getShortcutType();
            if (shortcutType === 0 /* eStartPort */) {
                UIDom.addClassName(this._element, 'sch-output-data-port');
                this._createOutputConnector(connector);
                this._createIcon(-90, 0, 6.5, 0.08);
            }
            else if (shortcutType === 1 /* eEndPort */) {
                UIDom.addClassName(this._element, 'sch-input-data-port');
                this._createInputConnector(connector);
                this._createIcon(-90, 0, 3.8, 0.07);
            }
            return this._element;
        };
        /**
         * The callback on the connector mouse enter event.
         * @protected
         * @param {MouseEvent} event - The mouse enter event.
         */
        UIShortcutDataPortView.prototype._onMouseEnter = function (event) {
            if (event.buttons === 0) {
                _super.prototype._onMouseEnter.call(this, event);
                var dataPortUI = this._port.getParent().getDataPortUI();
                if (dataPortUI !== undefined) {
                    dataPortUI.highlight();
                }
            }
        };
        /**
         * The callback on the connector mouse leave event.
         * @protected
         * @param {MouseEvent} event - The mouse leave event.
         */
        UIShortcutDataPortView.prototype._onMouseLeave = function (event) {
            _super.prototype._onMouseLeave.call(this, event);
            var dataPortUI = this._port.getParent().getDataPortUI();
            if (dataPortUI !== undefined) {
                dataPortUI.unhighlight();
            }
        };
        /**
         * Creates the shortcut svg icon.
         * It is mainly a IE11 fix which does not handle svg matrix modification in css!
         * @private
         * @param {number} rotation - The icon rotation.
         * @param {number} translateX - The icon left translation.
         * @param {number} translateY - The icon top translation.
         * @param {number} scale - The icon scale.
         */
        UIShortcutDataPortView.prototype._createIcon = function (rotation, translateX, translateY, scale) {
            this._icon = UIDom.createSVGPath({
                className: 'sch-shortcut-icon',
                parent: this._element,
                attributes: {
                    d: UIShapes.shortcutIconPathPoints,
                    transform: 'rotate(' + rotation + ') translate(' + translateX + ' ' + translateY + ') scale(' + scale + ')'
                }
            });
        };
        return UIShortcutDataPortView;
    }(UIDataPortView));
    return UIShortcutDataPortView;
});
