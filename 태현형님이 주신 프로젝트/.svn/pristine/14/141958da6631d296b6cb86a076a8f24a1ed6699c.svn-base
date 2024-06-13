/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIBlockView'/>
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
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIBlockView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicEngine/EPSSchematicsExecutionEnums", "css!DS/EPSSchematicsUI/css/nodes/EPSSchematicsUIBlock"], function (require, exports, UINodeView, UIDom, UIWUXTools, UIFontIcon, UINLS, ModelEnums, Events, ExecutionEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI block view.
     * @private
     * @class UIBlockView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIBlockView
     * @extends UINodeView
     */
    var UIBlockView = /** @class */ (function (_super) {
        __extends(UIBlockView, _super);
        /**
         * @public
         * @constructor
         * @param {UIBlock} block - The UI block.
         */
        function UIBlockView(block) {
            var _this = _super.call(this) || this;
            _this._onValidityChangeCB = _this._onValidityChange.bind(_this);
            _this._onAddButtonClickCB = _this._onAddButtonClick.bind(_this);
            _this._onMouseenterEventCB = _this._onMouseenterEvent.bind(_this);
            _this._onMouseLeaveEventCB = _this._onMouseLeaveEvent.bind(_this);
            _this._block = block;
            return _this;
        }
        /**
         * Removes the customized default view of the node.
         * @private
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UIBlockView.prototype.ondestroyDisplay = function (elt, grView) {
            if (this._block.getModel() !== undefined) {
                this._block.getModel().removeListener(Events.BlockValidityChangeEvent, this._onValidityChangeCB);
            }
            if (this._blockContainer !== undefined) {
                this._blockContainer.removeEventListener('mouseenter', this._onMouseenterEventCB, false);
                this._blockContainer.removeEventListener('mouseleave', this._onMouseLeaveEventCB, false);
            }
            if (this._triggerZoneLeftButton !== undefined) {
                this._triggerZoneLeftButton.removeEventListener('click', this._onAddButtonClickCB, false);
            }
            if (this._triggerZoneTopButton !== undefined) {
                this._triggerZoneTopButton.removeEventListener('click', this._onAddButtonClickCB, false);
            }
            if (this._triggerZoneRightButton !== undefined) {
                this._triggerZoneRightButton.removeEventListener('click', this._onAddButtonClickCB, false);
            }
            if (this._triggerZoneBottomButton !== undefined) {
                this._triggerZoneBottomButton.removeEventListener('click', this._onAddButtonClickCB, false);
            }
            this._block = undefined;
            this._blockContainer = undefined;
            this._blockContainerLeft = undefined;
            this._blockContainerMiddle = undefined;
            this._blockContainerRight = undefined;
            this._blockContainerMiddleBottom = undefined;
            this._blockNameElt = undefined;
            this._breakpointIcon = undefined;
            this._configurationIcon = undefined;
            this._infoIcon = undefined;
            this._categoryIcon = undefined;
            this._blockStateContainer = undefined;
            this._blockStatePendingElt = undefined;
            this._blockStateConnectingElt = undefined;
            this._blockStateExecutingElt = undefined;
            this._blockStateTerminatedElt = undefined;
            this._triggerZoneContainer = undefined;
            this._triggerZoneMiddle = undefined;
            this._triggerZoneTop = undefined;
            this._triggerZoneBottom = undefined;
            this._triggerZoneLeft = undefined;
            this._triggerZoneRight = undefined;
            this._triggerZoneTopButton = undefined;
            this._triggerZoneBottomButton = undefined;
            this._triggerZoneLeftButton = undefined;
            this._triggerZoneRightButton = undefined;
            this._onValidityChangeCB = undefined;
            this._onAddButtonClickCB = undefined;
            this._onMouseenterEventCB = undefined;
            this._onMouseLeaveEventCB = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Checks if the given element is part of the block container.
         * @public
         * @param {HTMLDivElement} element - The block element.
         * @returns {boolean} True if the element is part of the block container else false.
         */
        UIBlockView.prototype.isBlockContainer = function (element) {
            return element !== undefined && element === this._blockContainer;
        };
        /**
         * Checks if the given element is part of the block configuration icon.
         * @public
         * @param {HTMLDivElement} element - The block element.
         * @returns {boolean} True if the element is part of the block configuration icon else false.
         */
        UIBlockView.prototype.isConfigurationIcon = function (element) {
            return element !== undefined && element === this._configurationIcon;
        };
        /**
         * This method checks whether the given element is part of the block info icon.
         * @public
         * @param {HTMLDivElement} element - The block info icon html element.
         * @returns {boolean} True if the element is part of the block info icon else false.
         */
        UIBlockView.prototype.isInfoIcon = function (element) {
            return element !== undefined && element === this._infoIcon && (this._infoIcon.firstChild !== undefined && this._infoIcon.firstChild !== null);
        };
        /**
         * This method checks whether the given element is part of the block category icon.
         * @public
         * @param {HTMLDivElement} element - The block category icon html element.
         * @returns {boolean} True if the element is part of the block category icon else false.
         */
        UIBlockView.prototype.isCategoryIcon = function (element) {
            return element !== undefined && element === this._categoryIcon;
        };
        /**
         * Checks if the given element is the breakpoint icon.
         * @public
         * @param {HTMLDivElement} element - The element to check.
         * @returns {boolean} True if the element is the breakpoint icon else false.
         */
        UIBlockView.prototype.isBreakpointIcon = function (element) {
            return element !== undefined && element === this._breakpointIcon;
        };
        /**
         * Shows the info icon.
         * @public
         * @param {boolean} isError - True to display an error icon, false to display a warning icon.
         * @param {string} message - The information message to display in the tooltip.
         */
        UIBlockView.prototype.showInfoIcon = function (isError, message) {
            this.hideInfoIcon();
            if (this._infoIcon !== undefined) {
                var severity = isError ? 'sch-block-severity-error' : 'sch-block-severity-warning';
                UIFontIcon.create3DSFontIcon('attention', {
                    className: [severity],
                    parent: this._infoIcon,
                    tooltipInfos: { shortHelp: message }
                });
                this.display.infoIcon = this._infoIcon;
                this.display.infoIcon.grElt = this._block.getDisplay();
                this.display.infoIcon.subElt = this._infoIcon;
            }
        };
        /**
         * Hides the info icon.
         * @public
         */
        UIBlockView.prototype.hideInfoIcon = function () {
            if (this._infoIcon !== undefined) {
                this._infoIcon.innerHTML = '';
                this.display.infoIcon = undefined;
            }
        };
        /**
         * Hides the breakpoint from the block view.
         * @public
         */
        UIBlockView.prototype.hideBreakpoint = function () {
            UIDom.removeClassName(this._breakpointIcon, 'visible');
        };
        /**
         * Shows the breakpoint on the block view.
         * @public
         */
        UIBlockView.prototype.showBreakpoint = function () {
            UIDom.addClassName(this._breakpointIcon, 'visible');
        };
        /**
         * Sets the background color.
         * @public
         * @param {string} color - The background color.
         */
        UIBlockView.prototype.setBackgroundColor = function (color) {
            this._element.style.backgroundColor = '#' + color;
        };
        /**
         * Removes the background color.
         * @public
         */
        UIBlockView.prototype.removeBackgroundColor = function () {
            this._element.style.backgroundColor = '';
        };
        /**
         * Shows the block halo.
         * @public
         */
        UIBlockView.prototype.showHalo = function () {
            UIDom.addClassName(this._element, 'sch-block-halo');
        };
        /**
         * Hides the block halo.
         * @public
         */
        UIBlockView.prototype.hideHalo = function () {
            UIDom.removeClassName(this._element, 'sch-block-halo');
        };
        /**
         * Gets the block container element.
         * @public
         * @returns {HTMLDivElement} The block container element.
         */
        UIBlockView.prototype.getBlockContainer = function () {
            return this._blockContainer;
        };
        /**
         * This method gets the block container left element.
         * @public
         * @returns {HTMLDivElement} The block container left element.
         */
        UIBlockView.prototype.getBlockContainerLeftElement = function () {
            return this._blockContainerLeft;
        };
        /**
         * This method gets the block name element.
         * @public
         * @returns {HTMLDivElement} The block name element.
         */
        UIBlockView.prototype.getBlockNameElement = function () {
            return this._blockNameElt;
        };
        /**
         * This method gets the block container right element.
         * @public
         * @returns {HTMLDivElement} The block container right element.
         */
        UIBlockView.prototype.getBlockContainerRightElement = function () {
            return this._blockContainerRight;
        };
        /**
         * Gets the breakpoint icon element.
         * @public
         * @returns {HTMLDivElement} The breakpoint icon element.
         */
        UIBlockView.prototype.getBreakpointIcon = function () {
            return this._breakpointIcon;
        };
        /**
         * Gets the info icon element.
         * @public
         * @returns {HTMLDivElement} The info icon element.
         */
        UIBlockView.prototype.getInfoIconElement = function () {
            return this._infoIcon;
        };
        /**
         * Gets the trigger zone left button element.
         * @public
         * @returns {HTMLDivElement} The trigger zone left button element.
         */
        UIBlockView.prototype.getTriggerZoneLeftButtonElement = function () {
            return this._triggerZoneLeftButton;
        };
        /**
         * Gets the trigger zone right button element.
         * @public
         * @returns {HTMLDivElement} The trigger zone right button element.
         */
        UIBlockView.prototype.getTriggerZoneRightButtonElement = function () {
            return this._triggerZoneRightButton;
        };
        /**
         * Gets the trigger zone top button element.
         * @public
         * @returns {HTMLDivElement} The trigger zone top button element.
         */
        UIBlockView.prototype.getTriggerZoneTopButtonElement = function () {
            return this._triggerZoneTopButton;
        };
        /**
         * Gets the trigger zone bottom button element.
         * @public
         * @returns {HTMLDivElement} The trigger zone bottom button element.
         */
        UIBlockView.prototype.getTriggerZoneBottomButtonElement = function () {
            return this._triggerZoneBottomButton;
        };
        /**
         * Gets the configuration icon element.
         * @public
         * @returns {HTMLDivElement} The configuration icon element.
         */
        UIBlockView.prototype.getConfigurationIconElement = function () {
            return this._configurationIcon;
        };
        /**
         * Gets the category icon element.
         * @public
         * @returns {HTMLDivElement} The category icon element.
         */
        UIBlockView.prototype.getCategoryIconElement = function () {
            return this._categoryIcon;
        };
        /**
         * Shows the block state element (multiple call).
         * @public
         */
        UIBlockView.prototype.showBlockState = function () {
            if (!this._blockStateContainer) {
                this._blockStateContainer = UIDom.createElement('div', {
                    className: 'sch-block-state-container',
                    parent: this._blockContainerMiddleBottom
                });
                this.display.blockStateContainer = this._blockStateContainer;
                this.display.blockStateContainer.grElt = this._block.getDisplay();
                this.display.blockStateContainer.subElt = this._blockStateContainer;
                this._blockStatePendingElt = UIDom.createElement('p', {
                    className: 'sch-block-state-element',
                    parent: this._blockStateContainer,
                    textContent: '0',
                    tooltipInfos: { title: 'Pending', shortHelp: 'The number of instances in pending state.' }
                });
                UIDom.createElement('p', {
                    parent: this._blockStateContainer,
                    textContent: '-'
                });
                this._blockStateConnectingElt = UIDom.createElement('p', {
                    className: 'sch-block-state-element',
                    parent: this._blockStateContainer,
                    textContent: '0',
                    tooltipInfos: { title: 'Connecting', shortHelp: 'The number of instances in connecting state.' }
                });
                UIDom.createElement('p', {
                    parent: this._blockStateContainer,
                    textContent: '-'
                });
                this._blockStateExecutingElt = UIDom.createElement('p', {
                    className: 'sch-block-state-element',
                    parent: this._blockStateContainer,
                    textContent: '0',
                    tooltipInfos: { title: 'Executing', shortHelp: 'The number of instances in execution.' }
                });
                UIDom.createElement('p', {
                    parent: this._blockStateContainer,
                    textContent: '-'
                });
                this._blockStateTerminatedElt = UIDom.createElement('p', {
                    className: 'sch-block-state-element',
                    parent: this._blockStateContainer,
                    textContent: '0',
                    tooltipInfos: { title: 'Terminated', shortHelp: 'The number of instances which execution is terminated.' }
                });
            }
        };
        /**
         * Hides the block state element (multiple call).
         * @public
         */
        UIBlockView.prototype.hideBlockState = function () {
            if (this._blockContainerMiddleBottom && this._blockStateContainer) {
                this._blockContainerMiddleBottom.removeChild(this._blockStateContainer);
                this._blockStateContainer = undefined;
                this._blockStatePendingElt = undefined;
                this._blockStateConnectingElt = undefined;
                this._blockStateExecutingElt = undefined;
                this._blockStateTerminatedElt = undefined;
            }
        };
        /**
         * The callback on the execution debug block event.
         * @private
         * @param {ExecutionEvents.DebugBlockEvent} event - The execution debug block event.
         */
        UIBlockView.prototype.onDebugBlockEvent = function (event) {
            if (this._blockStateContainer && event.getPath() === this._block.getModel().toPath()) {
                var pendingValue = Number(this._blockStatePendingElt.textContent);
                var connectingValue = Number(this._blockStateConnectingElt.textContent);
                var executingValue = Number(this._blockStateExecutingElt.textContent);
                var terminatedValue = Number(this._blockStateTerminatedElt.textContent);
                var state = event.getState();
                if (state === ExecutionEnums.EBlockState.ePending) {
                    this._blockStatePendingElt.textContent = String(pendingValue + 1);
                }
                else if (state === ExecutionEnums.EBlockState.eConnecting) {
                    this._blockStatePendingElt.textContent = String(pendingValue - 1);
                    this._blockStateConnectingElt.textContent = String(connectingValue + 1);
                }
                else if (state === ExecutionEnums.EBlockState.eExecuting) {
                    this._blockStateConnectingElt.textContent = String(connectingValue - 1);
                    this._blockStateExecutingElt.textContent = String(executingValue + 1);
                }
                else if (state === ExecutionEnums.EBlockState.eTerminated) {
                    this._blockStateExecutingElt.textContent = String(executingValue - 1);
                    this._blockStateTerminatedElt.textContent = String(terminatedValue + 1);
                }
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
         * Builds the node HTML element.
         * @protected
         * @param {module:DS/egraph/core.Node} node - The graph node.
         * @returns {IHTMLElement} The node HTML element.
         */
        UIBlockView.prototype.buildNodeElement = function (node) {
            _super.prototype.buildNodeElement.call(this, node);
            UIDom.addClassName(this._element, 'sch-block');
            this._block.getModel().addListener(Events.BlockValidityChangeEvent, this._onValidityChangeCB);
            this._onValidityChange();
            this._createTriggerZoneContainer();
            this._createBlockContainer();
            this._element.dsModel = this._block;
            return this._element;
        };
        /**
         * The callback on the node display modification.
         * @protected
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.PathSetTrie} changes - Changes set of paths of modified properties.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UIBlockView.prototype.onmodifyDisplay = function (elt, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, elt, changes, grView);
            var block = elt.data.uiElement.getModel();
            var blockName = block.getName();
            this._blockNameElt.innerText = blockName;
        };
        /**
         * The callback on the node insert event.
         * @protected
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.PathSetTrie} changes - Changes set of paths of modified properties.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         * @param {module:DS/egraph/core.GraphView} nextWithView - The view of the next.
         */
        UIBlockView.prototype.oninsert = function (elt, changes, grView, nextWithView) {
            _super.prototype.oninsert.call(this, elt, changes, grView, nextWithView);
            this._block.computeWidth();
            this._block.computeHeight();
        };
        /**
         * The callback on the validity change event of a block.
         * @protected
         */
        UIBlockView.prototype._onValidityChange = function () {
            if (this._element && this._block && this._block.getModel()) {
                if (!this._block.getModel().isValid()) {
                    UIDom.addClassName(this._element, 'sch-block-invalid');
                }
                else {
                    UIDom.removeClassName(this._element, 'sch-block-invalid');
                }
            }
        };
        /**
         * Creates the block container.
         * @private
         */
        UIBlockView.prototype._createBlockContainer = function () {
            this._blockContainer = UIDom.createElement('div', {
                className: 'sch-block-container',
                parent: this._element
            });
            this.display.blockContainer = this._blockContainer;
            this.display.blockContainer.grElt = this._block.getDisplay();
            this.display.blockContainer.subElt = this._blockContainer;
            this._blockContainer.addEventListener('mouseenter', this._onMouseenterEventCB, false);
            this._blockContainer.addEventListener('mouseleave', this._onMouseLeaveEventCB, false);
            this._blockContainerLeft = UIDom.createElement('div', {
                className: 'sch-block-container-left',
                parent: this._blockContainer
            });
            this._blockContainerMiddle = UIDom.createElement('div', {
                className: 'sch-block-container-middle',
                parent: this._blockContainer
            });
            this._blockContainerRight = UIDom.createElement('div', {
                className: 'sch-block-container-right',
                parent: this._blockContainer
            });
            // Create the middle top container
            UIDom.createElement('div', {
                className: 'sch-block-container-middle-top',
                parent: this._blockContainerMiddle
            });
            // Create the block middle center container
            this._blockContainerMiddleCenter = UIDom.createElement('div', {
                className: 'sch-block-container-middle-center',
                parent: this._blockContainerMiddle
            });
            // Create the block name
            this._blockNameElt = UIDom.createElement('div', {
                className: 'sch-block-name',
                parent: this._blockContainerMiddleCenter
            });
            // Create the middle bottom container
            this._blockContainerMiddleBottom = UIDom.createElement('div', {
                className: 'sch-block-container-middle-bottom',
                parent: this._blockContainerMiddle
            });
            // Create the block breakpoint icon
            var activateBreakpoints = this._block.getEditor()._areBreakpointsEnabled() && this._block.getModel().handleBreakpoint();
            var bpClassName = ['sch-block-breakpoint-icon'];
            if (!activateBreakpoints) {
                bpClassName.push('deactivated');
            }
            this._breakpointIcon = UIDom.createElement('div', {
                className: bpClassName,
                parent: this._blockContainerLeft,
                tooltipInfos: UIWUXTools.createTooltip({
                    title: UINLS.get('tooltipTitleBlockToggleBreakpoint') + ' <span class="sch-tooltip-shortcut">F9</span>',
                    shortHelp: UINLS.get('tooltipShortHelpBlockToggleBreakpoint')
                })
            });
            if (activateBreakpoints) {
                this.display.breakpointIcon = this._breakpointIcon;
                this.display.breakpointIcon.grElt = this._block.getDisplay();
                this.display.breakpointIcon.subElt = this._breakpointIcon;
            }
            var breakpointController = this._block.getEditor().getBreakpointController();
            if (breakpointController.hasBreakpoint(this._block)) {
                this.showBreakpoint();
            }
            // Create the block configuration icon
            this._configurationIcon = UIDom.createElement('div', {
                className: 'sch-block-configuration-icon',
                parent: this._blockContainerLeft,
                tooltipInfos: { shortHelp: UINLS.get('shortHelpOpenBlockConfigurationDialog') },
                children: [UIFontIcon.createFAFontIcon('cog')]
            });
            this.display.configurationIcon = this._configurationIcon;
            this.display.configurationIcon.grElt = this._block.getDisplay();
            this.display.configurationIcon.subElt = this._configurationIcon;
            // Create the block info container
            this._infoIcon = UIDom.createElement('div', {
                className: 'sch-block-info-icon',
                parent: this._blockContainerRight
            });
            // Create the block category container
            this._categoryIcon = UIDom.createElement('div', {
                className: 'sch-block-category-icon',
                parent: this._blockContainerRight
            });
            UIFontIcon.createIconFromBlockCategory(this._block.getModel().getCategory(), this._categoryIcon, undefined, true);
            this.display.categoryIcon = this._categoryIcon;
            this.display.categoryIcon.grElt = this._block.getDisplay();
            this.display.categoryIcon.subElt = this._categoryIcon;
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
         * Creates the block trigger zone container.
         * @private
         */
        UIBlockView.prototype._createTriggerZoneContainer = function () {
            this._triggerZoneContainer = UIDom.createElement('div', {
                className: 'sch-block-triggerzone-container',
                parent: this._element
            });
            this._triggerZoneMiddle = UIDom.createElement('div', {
                className: ['sch-block-triggerzone', 'sch-block-triggerzone-middle'],
                parent: this._triggerZoneContainer
            });
            if (this._block.getModel().isValid()) {
                if (this._block.getModel().isDataPortTypeAddable(ModelEnums.EDataPortType.eInput)) {
                    this._triggerZoneTop = UIDom.createElement('div', {
                        className: ['sch-block-triggerzone', 'sch-block-triggerzone-top'],
                        parent: this._triggerZoneContainer
                    });
                    this._triggerZoneTopButton = UIBlockView._createAddPortButton(this._triggerZoneTop, UINLS.get('shortHelpAddInputDataPort'));
                    this._triggerZoneTopButton.addEventListener('click', this._onAddButtonClickCB, false);
                }
                if (this._block.getModel().isDataPortTypeAddable(ModelEnums.EDataPortType.eOutput)) {
                    this._triggerZoneBottom = UIDom.createElement('div', {
                        className: ['sch-block-triggerzone', 'sch-block-triggerzone-bottom'],
                        parent: this._triggerZoneContainer
                    });
                    this._triggerZoneBottomButton = UIBlockView._createAddPortButton(this._triggerZoneBottom, UINLS.get('shortHelpAddOutputDataPort'));
                    this._triggerZoneBottomButton.addEventListener('click', this._onAddButtonClickCB, false);
                }
                if (this._block.getModel().isControlPortTypeAddable(ModelEnums.EControlPortType.eInput)) {
                    this._triggerZoneLeft = UIDom.createElement('div', {
                        className: ['sch-block-triggerzone', 'sch-block-triggerzone-left'],
                        parent: this._triggerZoneContainer
                    });
                    this._triggerZoneLeftButton = UIBlockView._createAddPortButton(this._triggerZoneLeft, UINLS.get('shortHelpAddInputControlPort'));
                    this._triggerZoneLeftButton.addEventListener('click', this._onAddButtonClickCB, false);
                }
                if (this._block.getModel().isControlPortTypeAddable(ModelEnums.EControlPortType.eOutput)) {
                    this._triggerZoneRight = UIDom.createElement('div', {
                        className: ['sch-block-triggerzone', 'sch-block-triggerzone-right'],
                        parent: this._triggerZoneContainer
                    });
                    this._triggerZoneRightButton = UIBlockView._createAddPortButton(this._triggerZoneRight, UINLS.get('shortHelpAddOutputControlPort'));
                    this._triggerZoneRightButton.addEventListener('click', this._onAddButtonClickCB, false);
                }
            }
        };
        /**
         * Creates the add port button.
         * @private
         * @static
         * @param {HTMLDivElement} parent - The parent html element.
         * @param {string} shortHelp - The short help.
         * @returns {HTMLDivElement} The add port button.
         */
        UIBlockView._createAddPortButton = function (parent, shortHelp) {
            return UIDom.createElement('div', {
                className: 'sch-block-triggerzone-button',
                parent: parent,
                tooltipInfos: { shortHelp: shortHelp },
                children: [
                    UIFontIcon.createFAFontIcon('circle'),
                    UIFontIcon.createFAFontIcon('plus-circle')
                ]
            });
        };
        /**
         * The callback on the add button click event.
         * @private
         * @param {MouseEvent} event - The mouse click event.
         */
        UIBlockView.prototype._onAddButtonClick = function (event) {
            var portUI = undefined;
            var blockModel = this._block.getModel();
            if (event.target === this._triggerZoneTopButton) {
                var portModel = blockModel.createDynamicDataPort(ModelEnums.EDataPortType.eInput);
                portUI = this._block.getUIDataPortFromModel(portModel);
            }
            else if (event.target === this._triggerZoneBottomButton) {
                var portModel = blockModel.createDynamicDataPort(ModelEnums.EDataPortType.eOutput);
                portUI = this._block.getUIDataPortFromModel(portModel);
            }
            else if (event.target === this._triggerZoneLeftButton) {
                var portModel = blockModel.createDynamicControlPort(ModelEnums.EControlPortType.eInput);
                portUI = this._block.getUIControlPortFromModel(portModel);
            }
            else if (event.target === this._triggerZoneRightButton) {
                var portModel = blockModel.createDynamicControlPort(ModelEnums.EControlPortType.eOutput);
                portUI = this._block.getUIControlPortFromModel(portModel);
            }
            if (portUI !== undefined) {
                var historyController = this._block.getGraph().getEditor().getHistoryController();
                historyController.registerCreateAction(portUI);
            }
        };
        /**
         * The callback on the mouse enter event.
         * @private
         */
        UIBlockView.prototype._onMouseenterEvent = function () {
            UIDom.addClassName(this._element, 'hover');
        };
        /**
         * The callback on the mouse leave event.
         * @private
         */
        UIBlockView.prototype._onMouseLeaveEvent = function () {
            UIDom.removeClassName(this._element, 'hover');
        };
        return UIBlockView;
    }(UINodeView));
    return UIBlockView;
});
