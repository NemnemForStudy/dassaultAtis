/// <amd-module name='DS/EPSSchematicsUI/panels/views/EPSSchematicsUIBlockLibraryDocView'/>
define("DS/EPSSchematicsUI/panels/views/EPSSchematicsUIBlockLibraryDocView", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/libraries/EPSSchematicsUITypesCatalog", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIThumbnailViewer", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "DS/Controls/Button", "css!DS/EPSSchematicsUI/css/panels/views/EPSSchematicsUIBlockLibraryDocView"], function (require, exports, UIDom, UIFontIcon, UIWUXTools, UINLS, UITypesCatalog, UIThumbnailViewer, ModelEnums, BlockLibrary, WUXButton) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI block library documentation view.
     * @class UIBlockLibraryDocView
     * @alias module:DS/EPSSchematicsUI/panels/views/EPSSchematicsUIBlockLibraryDocView
     * @private
     */
    var UIBlockLibraryDocView = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         * @param {HTMLDivElement} parentContainer - The parent container element.
         */
        function UIBlockLibraryDocView(editor, parentContainer) {
            this._editor = editor;
            this._parentContainer = parentContainer;
            this._initialize();
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
         * Removes the view.
         * @public
         */
        UIBlockLibraryDocView.prototype.remove = function () {
            this._removeThumbnailViewer();
            this._editor = undefined;
            this._parentContainer = undefined;
            this._thumbnailViewer = undefined;
            this._docContainer = undefined;
            this._docHeader = undefined;
            this._docTitle = undefined;
            this._docContent = undefined;
        };
        /**
         * Gets the block library documentation view element.
         * @public
         * @returns {HTMLDivElement} The block library documentation view element.
         */
        UIBlockLibraryDocView.prototype.getElement = function () {
            return this._docContainer;
        };
        /**
         * Displays the category documentation.
         * @public
         * @param {string} categoryName - The name of the category.
         * @param {string} fullCategoryName - The full name of the category.
         */
        UIBlockLibraryDocView.prototype.displayCategoryDocumentation = function (categoryName, fullCategoryName) {
            this._clearDocumentation();
            if (categoryName !== undefined && fullCategoryName !== undefined) {
                var categoryTitle = UIDom.createElement('div', {
                    className: 'sch-doc-block-title',
                    parent: this._docContent
                });
                var categoryDoc = BlockLibrary.getCategoryDocumentation(fullCategoryName);
                categoryName = categoryDoc !== undefined && categoryDoc.getName() !== undefined ? categoryDoc.getName() : categoryName;
                UIDom.createElement('h2', {
                    textContent: UINLS.get('sectionCategoryTitle', { categoryName: categoryName }),
                    parent: categoryTitle
                });
                if (categoryDoc !== undefined) {
                    var description = categoryDoc.getDescription();
                    if (description !== undefined) {
                        var catDesc = UIDom.createElement('div', {
                            className: 'sch-doc-summary',
                            parent: this._docContent
                        });
                        UIDom.createElement('h3', {
                            textContent: UINLS.get('sectionDescription'),
                            parent: catDesc
                        });
                        var catDescContent = UIDom.createElement('div', {
                            className: 'sch-doc-summary-content',
                            parent: catDesc
                        });
                        UIFontIcon.createIconFromBlockCategory(fullCategoryName, catDescContent);
                        UIDom.createElement('p', {
                            innerHTML: description,
                            parent: catDescContent
                        });
                    }
                }
            }
        };
        /**
         * Displays the block documentation.
         * @public
         * @param {string} blockUid - The block Uid.
         */
        UIBlockLibraryDocView.prototype.displayBlockDocumentation = function (blockUid) {
            this._clearDocumentation();
            this._removeThumbnailViewer();
            var block = BlockLibrary.getBlock(blockUid);
            if (block !== undefined) {
                var blockDoc = block.getDocumentation();
                if (blockDoc !== undefined) {
                    // Create block title
                    var blockTitle = UIDom.createElement('div', {
                        className: 'sch-doc-block-title',
                        parent: this._docContent,
                        children: [UIDom.createElement('h2', {
                                textContent: UINLS.get('sectionBlockTitle', { blockName: block.getName() })
                            })]
                    });
                    UIBlockLibraryDocView._createExampleButton(blockDoc, blockTitle);
                    // Create block summary
                    UIDom.createElement('div', {
                        className: 'sch-doc-summary',
                        parent: this._docContent,
                        children: [
                            UIDom.createElement('h3', { textContent: UINLS.get('sectionSummary') }),
                            UIDom.createElement('div', {
                                className: 'sch-doc-summary-content',
                                children: [
                                    UIFontIcon.createIconFromBlockCategory(block.getCategory()),
                                    UIDom.createElement('p', { innerHTML: blockDoc.getSummary() })
                                ]
                            })
                        ]
                    });
                    // Create the block technical information
                    var docTech = UIDom.createElement('div', {
                        className: 'sch-doc-tech',
                        parent: this._docContent,
                        children: [UIDom.createElement('h3', { textContent: UINLS.get('sectionTechnicalInformation') })]
                    });
                    this._createThumbnailViewer(blockUid, docTech);
                    UIBlockLibraryDocView._createInputControlPortsCategory(block, docTech);
                    UIBlockLibraryDocView._createInputEventPortsCategory(block, docTech);
                    UIBlockLibraryDocView._createOutputControlPortsCategory(block, docTech);
                    UIBlockLibraryDocView._createOutputEventPortsCategory(block, docTech);
                    UIBlockLibraryDocView._createInputDataPortsCategory(block, docTech);
                    UIBlockLibraryDocView._createOutputDataPortsCategory(block, docTech);
                    UIBlockLibraryDocView._createSettingsCategory(block, docTech);
                    UIBlockLibraryDocView._createBlockDescriptionCategory(block, this._docContent);
                }
            }
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
         * Initializes the documentation view.
         * @private
         */
        UIBlockLibraryDocView.prototype._initialize = function () {
            this._docContainer = UIDom.createElement('div', {
                className: 'sch-blocklibrary-doc-container',
                parent: this._parentContainer
            });
            this._docHeader = UIDom.createElement('div', {
                className: ['sch-doc-header', 'epsNoSelect'],
                parent: this._docContainer
            });
            this._docTitle = UIDom.createElement('h5', {
                textContent: UINLS.get('sectionBlockDocumentation'),
                parent: this._docHeader
            });
            this._docContent = UIDom.createElement('div', {
                className: 'sch-doc-content',
                parent: this._docContainer
            });
        };
        /**
         * Clears the block library documentation in order to display a blank page.
         * @private
         */
        UIBlockLibraryDocView.prototype._clearDocumentation = function () {
            while (this._docContent.firstChild) {
                this._docContent.removeChild(this._docContent.firstChild);
            }
            this._docContent.scrollTop = 0;
        };
        /**
         * Creates the thumbnail viewer.
         * @private
         * @param {string} blockUid - The block uid.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView.prototype._createThumbnailViewer = function (blockUid, parent) {
            var thumbnailContainer = UIDom.createElement('div', {
                className: 'sch-doc-thumbnail-viewer',
                parent: parent
            });
            var graphContainer = UIDom.createElement('div', {
                className: ['sch-doc-graph-container', 'epsNoSelect'],
                parent: thumbnailContainer
            });
            this._thumbnailViewer = new UIThumbnailViewer(graphContainer, this._editor, blockUid);
        };
        /**
         * Remove the thumbnail viewer.
         * @private
         */
        UIBlockLibraryDocView.prototype._removeThumbnailViewer = function () {
            if (this._thumbnailViewer !== undefined) {
                this._thumbnailViewer.remove();
                this._thumbnailViewer = undefined;
            }
        };
        /**
         * Creates the input control ports category.
         * @private
         * @static
         * @param {Block} block - The block.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView._createInputControlPortsCategory = function (block, parent) {
            var inputControlPorts = block.getControlPorts(ModelEnums.EControlPortType.eInput);
            if (inputControlPorts.length > 0) {
                var category_1 = UIDom.createElement('div', {
                    className: 'sch-doc-section-icp',
                    parent: parent,
                    children: [UIDom.createElement('h4', { textContent: UINLS.get('categoryInputControlPorts') })]
                });
                inputControlPorts.forEach(function (inputControlPort) {
                    var icpDesc = inputControlPort.getDocumentationDescription();
                    var p = UIDom.createElement('p', { className: 'sch-doc-icp', parent: category_1 });
                    UIDom.createElement('doc-icp-name', { parent: p, textContent: inputControlPort.getName() });
                    if (icpDesc) {
                        UIDom.createElement('doc-description-token', { parent: p, textContent: ': ' });
                        UIDom.createElement('doc-description', { parent: p, innerHTML: icpDesc });
                    }
                });
            }
        };
        /**
         * Creates the input event ports category.
         * @private
         * @static
         * @param {Block} block - The block.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView._createInputEventPortsCategory = function (block, parent) {
            var inputEventPorts = block.getControlPorts(ModelEnums.EControlPortType.eInputEvent);
            if (inputEventPorts.length > 0) {
                var category_2 = UIDom.createElement('div', {
                    className: 'sch-doc-section-iep',
                    parent: parent,
                    children: [UIDom.createElement('h4', { textContent: UINLS.get('categoryInputEventPorts') })]
                });
                inputEventPorts.forEach(function (inputEventPort) {
                    var iepName = inputEventPort.getName();
                    var iepEventType = inputEventPort.getEventType();
                    var iepDesc = inputEventPort.getDocumentationDescription();
                    var p = UIDom.createElement('p', { className: 'sch-doc-iep', parent: category_2 });
                    UIDom.createElement('doc-iep-name', { parent: p, textContent: iepName });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ' (' });
                    UIDom.createElement('doc-valuetype', { parent: p, textContent: iepEventType });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ')' });
                    if (iepDesc) {
                        UIDom.createElement('doc-description-token', { parent: p, textContent: ': ' });
                        UIDom.createElement('doc-description', { parent: p, innerHTML: iepDesc });
                    }
                });
            }
        };
        /**
         * Creates the output control ports category.
         * @private
         * @static
         * @param {Block} block - The block.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView._createOutputControlPortsCategory = function (block, parent) {
            var outputControlPorts = block.getControlPorts(ModelEnums.EControlPortType.eOutput);
            if (outputControlPorts.length > 0) {
                var category_3 = UIDom.createElement('div', {
                    className: 'sch-doc-section-ocp',
                    parent: parent,
                    children: [UIDom.createElement('h4', { textContent: UINLS.get('categoryOutputControlPorts') })]
                });
                outputControlPorts.forEach(function (outputControlPort) {
                    var ocpDesc = outputControlPort.getDocumentationDescription();
                    var p = UIDom.createElement('p', { className: 'sch-doc-ocp', parent: category_3 });
                    UIDom.createElement('doc-ocp-name', { parent: p, textContent: outputControlPort.getName() });
                    if (ocpDesc) {
                        UIDom.createElement('doc-description-token', { parent: p, textContent: ': ' });
                        UIDom.createElement('doc-description', { parent: p, innerHTML: ocpDesc });
                    }
                });
            }
        };
        /**
         * Creates the output event ports category.
         * @private
         * @static
         * @param {Block} block - The block.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView._createOutputEventPortsCategory = function (block, parent) {
            var outputEventPorts = block.getControlPorts(ModelEnums.EControlPortType.eOutputEvent);
            if (outputEventPorts.length > 0) {
                var category_4 = UIDom.createElement('div', {
                    className: 'sch-doc-section-oep',
                    parent: parent,
                    children: [UIDom.createElement('h4', { textContent: UINLS.get('categoryOutputEventPorts') })]
                });
                outputEventPorts.forEach(function (outputEventPort) {
                    var oepName = outputEventPort.getName();
                    var oepEventType = outputEventPort.getEventType();
                    var oepDesc = outputEventPort.getDocumentationDescription();
                    var p = UIDom.createElement('p', { className: 'sch-doc-oep', parent: category_4 });
                    UIDom.createElement('doc-oep-name', { parent: p, textContent: oepName });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ' (' });
                    UIDom.createElement('doc-valuetype', { parent: p, textContent: oepEventType });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ')' });
                    if (oepDesc) {
                        UIDom.createElement('doc-description-token', { parent: p, textContent: ': ' });
                        UIDom.createElement('doc-description', { parent: p, innerHTML: oepDesc });
                    }
                });
            }
        };
        /**
         * Creates the input data ports category.
         * @private
         * @static
         * @param {Block} block - The block.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView._createInputDataPortsCategory = function (block, parent) {
            var inputDataPorts = block.getDataPorts(ModelEnums.EDataPortType.eInput);
            if (inputDataPorts.length > 0) {
                var category_5 = UIDom.createElement('div', {
                    className: 'sch-doc-section-idp',
                    parent: parent,
                    children: [UIDom.createElement('h4', { textContent: UINLS.get('categoryInputDataPorts') })]
                });
                inputDataPorts.forEach(function (inputDataPort) {
                    var idpName = inputDataPort.getName();
                    var idpValueType = inputDataPort.getValueType();
                    var idpDefaultValue = UITypesCatalog.getStringValue(idpValueType, inputDataPort.getDefaultValue());
                    var idpDesc = inputDataPort.getDocumentationDescription();
                    var p = UIDom.createElement('p', { className: 'sch-doc-idp', parent: category_5 });
                    UIDom.createElement('doc-idp-name', { parent: p, textContent: idpName });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ' (' });
                    UIDom.createElement('doc-valuetype', { parent: p, textContent: idpValueType });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ') = ' });
                    UIDom.createElement('doc-value', { parent: p, textContent: idpDefaultValue });
                    if (idpDesc) {
                        UIDom.createElement('doc-description-token', { parent: p, textContent: ': ' });
                        UIDom.createElement('doc-description', { parent: p, innerHTML: idpDesc });
                    }
                });
            }
        };
        /**
         * Creates the output data ports category.
         * @private
         * @static
         * @param {Block} block - The block.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView._createOutputDataPortsCategory = function (block, parent) {
            var outputDataPorts = block.getDataPorts(ModelEnums.EDataPortType.eOutput);
            if (outputDataPorts.length > 0) {
                var category_6 = UIDom.createElement('div', {
                    className: 'sch-doc-section-odp',
                    parent: parent,
                    children: [UIDom.createElement('h4', { textContent: UINLS.get('categoryOutputDataPorts') })]
                });
                outputDataPorts.forEach(function (outputDataPort) {
                    var odpName = outputDataPort.getName();
                    var odpValueType = outputDataPort.getValueType();
                    var odpDesc = outputDataPort.getDocumentationDescription();
                    var p = UIDom.createElement('p', { className: 'sch-doc-odp', parent: category_6 });
                    UIDom.createElement('doc-odp-name', { parent: p, textContent: odpName });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ' (' });
                    UIDom.createElement('doc-valuetype', { parent: p, textContent: odpValueType });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ')' });
                    if (odpDesc) {
                        UIDom.createElement('doc-description-token', { parent: p, textContent: ': ' });
                        UIDom.createElement('doc-description', { parent: p, innerHTML: odpDesc });
                    }
                });
            }
        };
        /**
         * Creates the block description category.
         * @private
         * @static
         * @param {Block} block - The block.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView._createBlockDescriptionCategory = function (block, parent) {
            var blockDescription = block.getDocumentationDescription();
            if (blockDescription !== undefined && blockDescription !== '') {
                UIDom.createElement('div', {
                    className: 'sch-doc-section-desc',
                    parent: parent,
                    children: [
                        UIDom.createElement('h3', { textContent: UINLS.get('sectionDescription') }),
                        UIDom.createElement('p', { innerHTML: blockDescription })
                    ]
                });
            }
        };
        /**
         * Creates the settings category.
         * @private
         * @static
         * @param {Block} block - The block.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView._createSettingsCategory = function (block, parent) {
            var settings = block.getSettings();
            if (settings.length > 0) {
                var category_7 = UIDom.createElement('div', {
                    className: 'sch-doc-section-settings',
                    parent: parent,
                    children: [UIDom.createElement('h4', { textContent: UINLS.get('categorySettings') })]
                });
                settings.forEach(function (setting) {
                    var settingName = setting.getName();
                    var settingValueType = setting.getValueType();
                    var settingValue = UITypesCatalog.getStringValue(settingValueType, setting.getValue());
                    var settingDesc = setting.getDocumentationDescription();
                    var p = UIDom.createElement('p', { className: 'sch-doc-setting', parent: category_7 });
                    UIDom.createElement('doc-setting-name', { parent: p, textContent: settingName });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ' (' });
                    UIDom.createElement('doc-valuetype', { parent: p, textContent: settingValueType });
                    UIDom.createElement('doc-valuetype-token', { parent: p, textContent: ') = ' });
                    UIDom.createElement('doc-value', { parent: p, textContent: settingValue });
                    if (settingDesc) {
                        UIDom.createElement('doc-description-token', { parent: p, textContent: ': ' });
                        UIDom.createElement('doc-description', { parent: p, innerHTML: settingDesc });
                    }
                });
            }
        };
        /**
         * Creates the example button.
         * @private
         * @static
         * @param {BlockLibrary.BlockDocumentation} blockDoc - The block documentation.
         * @param {HTMLElement} parent - The parent element.
         */
        UIBlockLibraryDocView._createExampleButton = function (blockDoc, parent) {
            var example = blockDoc.getExample();
            if (example !== undefined && example !== null) {
                var exampleButton = new WUXButton({
                    emphasize: 'primary',
                    label: UINLS.get('buttonBlockExample'),
                    value: example,
                    icon: UIFontIcon.getWUX3DSIconDefinition('play'),
                    allowUnsafeHTMLLabel: false,
                    tooltipInfos: UIWUXTools.createTooltip({ shortHelp: UINLS.get('shortHelpOpenBlockExample') }),
                    onClick: function () {
                        var origin = window.location.origin;
                        var url = origin + '/' + example.webapp + '?content=' + example.content;
                        window.open(url, '_blank');
                    }
                });
                exampleButton.inject(parent);
            }
        };
        return UIBlockLibraryDocView;
    }());
    return UIBlockLibraryDocView;
});
