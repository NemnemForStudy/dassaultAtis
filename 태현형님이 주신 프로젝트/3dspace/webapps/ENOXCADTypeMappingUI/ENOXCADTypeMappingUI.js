define('DS/ENOXCADTypeMappingUI/utils/URLHandler', [], function () {
  'use strict';

  var urlHandler = {
    init: function (url, tenant) {
      this.url = url;
      this.tenant = tenant;
    },

    setURL: function (url) {
      this.url = url;
    },

    getURL: function () {
      return this.url;
    },

    getTenant: function () {
      return this.tenant;
    },

    setTenant: function (itenant) {
      this.tenant = itenant;
    }
  };

  return urlHandler;
});

/* eslint-disable no-console */
/* global typeMappingIntegNLS:writable, typeMappingIntegName, typeMappingNLS */
/* exported typeMappingIntegNLS */

define('DS/ENOXCADTypeMappingUI/utils/JSONUtil', [
  'WebappsUtils/WebappsUtils'
], function (WebappsUtils) {
  'use strict';

  var jsonUtils = {
    // to get Integration JSON data from json file
    getIntegJSONdata: function () {
      return new Promise((resolve, reject) => {
        const integJsonFile = WebappsUtils.getWebappsAssetUrl(
          'ENOXCADTypeMappingUI',
          typeMappingIntegName + '.json'
        );

        const requset = new XMLHttpRequest();

        requset.addEventListener('readystatechange', () => {
          if (requset.readyState === 4 && requset.status === 200) {
            try {
              const jsonData = JSON.parse(requset.responseText);

              try {
                require([
                  'i18n!DS/ENOXCADTypeMappingUI/assets/nls/' +
                    typeMappingIntegName
                ], function (IntegNLS) {
                  typeMappingIntegNLS = IntegNLS;
                  return resolve(jsonData.typeMappings);
                });
              } catch (err) {
                console.log('Failure in loding type mapping NLS file: ', err);
                return reject(typeMappingNLS.integNLSLoadingFailureMessage);
              }
            } catch (err) {
              console.log('Failure in parsing type mapping JSON: ', err);
              return reject(typeMappingNLS.integJSONParsingFailureMessage);
            }
          } else if (requset.readyState === 4) {
            console.log('Json file not found. File name: ', integJsonFile);
            resolve([]);
          }
        });

        requset.open('GET', integJsonFile);
        requset.send();
      });
    }
  };

  return jsonUtils;
});

define('DS/ENOXCADTypeMappingUI/models/SelectionChipsModel', [
  'UWA/Class/Model'
], function (Model) {
  'use strict';

  var selectionChipsModel = Model.extend({
    setup: function () {
      // console.log('SelectionChipsModel has been set up.');
    }
  });

  return selectionChipsModel;
});

define('DS/ENOXCADTypeMappingUI/utils/AlertMessage', [
  'DS/UIKIT/Alert'
], function (Alert) {
  'use strict';

  // to show alert message
  return new Alert({
    className: 'param-alert',
    closable: true,
    visible: true,
    renderTo: document.body,
    autoHide: true,
    hideDelay: 3000,
    messageClassName: 'warning'
  });
});

/* global UWA, typeMappingNLS, WUXManagedFontIcons*/

define('DS/ENOXCADTypeMappingUI/utils/CommonUIUtil', [
  'DS/UIKIT/Popover',
  'DS/UIKIT/Accordion',
  'DS/Controls/ComboBox',
  'DS/Controls/Button',
  'DS/Controls/SelectionChips'
], function (Popover, Accordion, WUXComboBox, WUXButton, SelectionChips) {
  'use strict';

  var commonUIUtil = {
    // to get all typeMappings columns structure
    getCellStructure: function () {
      const cellTypeMappingLabel = UWA.createElement('td', {
        width: '45%',
        align: 'left'
      });

      const cellTypeMappingInfo = UWA.createElement('td', {
        width: '10%',
        align: 'left'
      });

      const cellTypeMappingUIType = UWA.createElement('td', {
        width: '30%',
        align: 'left'
      });

      const cellTypeMappingDeployStatus = UWA.createElement('td', {
        width: '15%',
        align: 'right'
      });

      const columnsStructure = [
        cellTypeMappingLabel,
        cellTypeMappingInfo,
        cellTypeMappingUIType,
        cellTypeMappingDeployStatus
      ];
      return columnsStructure;
    },

    // to display typeMapping information
    buildPopoverSpan: function (containerCell, tooltipNLSText) {
      const imgInfoSpan = UWA.createElement('span', {
        'class': 'fonticon fonticon-info'
      }).inject(containerCell);

      imgInfoSpan.setStyle('color', 'black');

      // eslint-disable-next-line no-unused-vars
      const popOver = new Popover({
        target: imgInfoSpan,
        trigger: 'hover',
        animate: 'true',
        position: 'top',
        body: tooltipNLSText,
        title: ''
      });
    },

    // to show deploy status icon
    buildDeployStsCell: function (deployStatus) {
      const iconSize = '1';
      let imgClass, imgTitle, iconColor;

      switch (deployStatus) {
        case 'Deployed':
          imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-check';
          imgTitle = typeMappingNLS.Deployed;
          iconColor = 'green';
          break;
        case 'NotDeployed':
          imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-cog';
          imgTitle = typeMappingNLS.NotDeployed;
          iconColor = 'orange';
          break;
        case 'NewNotDeployed':
          imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-cog';
          imgTitle = typeMappingNLS.NewNotDeplyed;
          iconColor = 'black';
          break;
        case 'InvalidValueCanNotDeploy':
          imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-wrong';
          imgTitle = typeMappingNLS.InvalidValueCanNotDeploy;
          iconColor = 'red';
          break;
        default:
          break;
      }

      const imgCell = UWA.createElement('td', {
        width: '15%',
        align: 'center',
        title: imgTitle
      });

      const imgSpan = UWA.createElement('span', {
        'class': imgClass
      }).inject(imgCell);

      imgSpan.setStyle('color', iconColor);
      imgCell.setStyle('vertical-align', 'text-bottom');
      imgCell.setStyle('min-width', '46px');

      return imgCell;
    },

    // to create TypeMappings table heading
    buildTypeMappingsTableHeading: function () {
      const lineTitle = UWA.createElement('tr', {
        'class': 'success'
      });

      var iCell = UWA.createElement('td', {
        align: 'left',
        width: '45%'
      }).inject(lineTitle);

      UWA.createElement('h5', {
        text: typeMappingNLS.cellCADType
      }).inject(iCell);

      iCell = UWA.createElement('td', {
        align: 'left',
        width: '10%'
      }).inject(lineTitle);

      UWA.createElement('h5', {
        text: typeMappingNLS.cellInfo
      }).inject(iCell);

      iCell = UWA.createElement('td', {
        align: 'left',
        width: '30%'
      }).inject(lineTitle);

      UWA.createElement('h5', {
        text: typeMappingNLS.cell3DEXPERIENCETypes
      }).inject(iCell);

      iCell = UWA.createElement('td', {
        align: 'center',
        width: '15%'
      }).inject(lineTitle);

      UWA.createElement('h5', {
        text: typeMappingNLS.cellDeployStatus
      }).inject(iCell);

      return lineTitle;
    },

    // to create Accordion - not used
    createFamilyUIKITAccordion: function (content, name, titleNLS) {
      let accord = new Accordion({
        className: 'styled divided filled',
        exclusive: false,
        items: []
      });

      accord.addItem({
        title: titleNLS,
        content: content,
        selected: true,
        name: name
      });

      return accord;
    },

    getSelectionChips: function (rangeLables, ranges, valuesFromDB) {
      const selectionChips = new SelectionChips({
        displayMenu: false
      });

      for (let i = 0; i < valuesFromDB.length; i++) {
        if (ranges.includes(valuesFromDB[i])) {
          let index = ranges.indexOf(valuesFromDB[i]);
          selectionChips.addChip({
            label: rangeLables[index],
            value: ranges[index]
          });
        }
      }

      selectionChips.getContent().setStyles({
        width: '100%',
        height: 'auto',
        'min-height': '50px'
      });

      return selectionChips;
    },

    getAllTypesComboBox: function (rangeLables, ranges) {
      const elementsList = [];

      for (let i = 0; i < ranges.length; i++) {
        elementsList.push({
          labelItem: rangeLables[i],
          valueItem: ranges[i]
        });
      }

      const comboBox = new WUXComboBox({
        elementsList: elementsList,
        enableSearchFlag: false,
        actionOnClickFlag: false
      });

      comboBox.elements.container.style.width = '100%'; // in px or %
      comboBox.elements.container.style.padding = '5px 5px 5px 0px';

      return comboBox;
    },

    getAddTypeButton: function () {
      const addItemButton = new WUXButton({
        icon: {
          iconName: 'plus',
          fontIconFamily: WUXManagedFontIcons.Font3DS
        },
        emphasize: 'secondary'
      });

      addItemButton.getContent().title = typeMappingNLS.addTypeToolTip;
      addItemButton.getContent().setStyle('display', 'inline-block');
      addItemButton.getContent().setStyle('background', 'none');
      addItemButton.getContent().setStyle('min-width', '40px');

      return addItemButton;
    }
  };

  return commonUIUtil;
});

/* eslint-disable no-console */
/* global widget */

define('DS/ENOXCADTypeMappingUI/utils/AJAXUtil', [
  'DS/WAFData/WAFData'
], function (WAFData) {
  'use strict';

  var ajaxUtil = {
    // to handle AJAX call to server
    getFromServer: function (url, method, deployParams) {
      return new Promise((resolve, reject) => {
        WAFData.authenticatedRequest(url, {
          timeout: 250000,
          method: method,
          type: 'json',
          // proxy: 'passport',
          data: deployParams ? deployParams : undefined,

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': widget.lang
          },

          onFailure: function (error, textStatus) {
            if (textStatus)
              console.log(
                'Error from server side in type mapping: ',
                textStatus.errorMessage
              );
            return reject(error);
          },

          onComplete: function (response) {
            return resolve(response);
          }
        });
      });
    }
  };

  return ajaxUtil;
});

/* global UWA, typeMappingNLS */

define('DS/ENOXCADTypeMappingUI/utils/ApplyResetToolbar', [
  'DS/UIKIT/Input/Button'
], function (Button) {
  'use strict';

  var applyResetToolbar = {
    // to add 'Apply' & 'Reset' buttons
    addApplyResetToolbar: function (applyCallback, resetCallback) {
      const applyResetDiv = UWA.createElement('div', {
        'class': 'typeMappingApplyResetDiv'
      });

      const tableButtons = UWA.createElement('table', {
        'class': '',
        id: '',
        width: '100%'
      }).inject(applyResetDiv);

      const lineButtons = UWA.createElement('tr').inject(tableButtons);

      const buttonApplyCell = UWA.createElement('td', {
        width: '50%',
        Align: 'center'
      }).inject(lineButtons);

      const applyBttn = new Button({
        className: 'primary',
        id: 'buttonExport',
        icon: 'export',
        attributes: {
          disabled: false,
          title: typeMappingNLS.Apply,
          text: typeMappingNLS.Apply
        },
        events: {
          onClick: function () {
            applyCallback();
          }
        }
      }).inject(buttonApplyCell);

      applyBttn.getContent().setStyle('width', 110);

      const buttonResetCell = UWA.createElement('td', {
        width: '50%',
        Align: 'center'
      }).inject(lineButtons);

      const resetBbttn = new Button({
        className: 'warning',
        icon: 'loop',
        attributes: {
          disabled: false,
          title: typeMappingNLS.Reset,
          text: typeMappingNLS.Reset
        },
        events: {
          onClick: function () {
            resetCallback();
          }
        }
      }).inject(buttonResetCell);

      resetBbttn.getContent().setStyle('width', 110);

      return applyResetDiv;
    }
  };

  return applyResetToolbar;
});

/* eslint-disable no-console */
/* global typeMappingIntegName, typeMappingNLS */

define('DS/ENOXCADTypeMappingUI/utils/GCOUtil', [
  'DS/ENOXCADTypeMappingUI/utils/URLHandler',
  'DS/ENOXCADTypeMappingUI/utils/AJAXUtil'
], function (URLHandler, AJAXUtil) {
  'use strict';

  var gcoUtil = {
    // to get GCO object information
    getGCOTypeNameRevision: function (integGCOName) {
      return new Promise((resolve, reject) => {
        let paramsJSON = {
          integGCOName: integGCOName
        };

        const paramsJSONString = encodeURI(JSON.stringify(paramsJSON));

        const url =
          URLHandler.getURL() +
          '/resources/xcadtypemapping/services/getGCOInfo?paramsJSONString=' +
          paramsJSONString +
          '&tenant=' +
          URLHandler.getTenant();

        AJAXUtil.getFromServer(url, 'GET')
          .then((response) => {
            console.log(
              'Response from type mapping getGCOInfo web service:',
              response
            );
            return resolve(response);
          })
          .catch((error) => {
            console.log(
              'Failure in type mapping getGCOInfo web service:',
              error
            );
            return reject(typeMappingNLS.getGCOInfoFailureMessage);
          });
      });
    },

    // to get attribute values from GCO object
    getTypeMappingValuesFromGCO: function (allJSONData) {
      return new Promise((resolve, reject) => {
        let paramsJSON = {
          allJSONData: allJSONData,
          integrationName: typeMappingIntegName
        };

        const url =
          URLHandler.getURL() +
          '/resources/xcadtypemapping/services/getValues?tenant=' +
          URLHandler.getTenant();

        AJAXUtil.getFromServer(url, 'POST', JSON.stringify(paramsJSON))
          .then((response) => {
            console.log(
              'Response from type mapping getValues web service:',
              response
            );

            for (let resObj of response) {
              for (let dataObj of allJSONData) {
                if (dataObj.mappingId === resObj.mappingId) {
                  dataObj.valueFromDB = resObj.valueFromDB;

                  if (resObj.isDeployed) dataObj.deployStatus = 'Deployed';
                  else dataObj.deployStatus = 'NotDeployed';

                  if (
                    Object.prototype.hasOwnProperty.call(resObj, 'rangeValues')
                  ) {
                    dataObj.range = resObj.rangeValues;
                    dataObj.rangelabel = resObj.rangeLabels;
                  }

                  dataObj.parentEnoviaType = resObj.parentEnoviaType;
                }
              }
            }

            return resolve(allJSONData);
          })
          .catch((error) => {
            console.log(
              'Failure in type mapping getValues web service:',
              error
            );
            return reject(typeMappingNLS.getValuesFailureMessage);
          });
      });
    }
  };

  return gcoUtil;
});

/* eslint-disable no-console */
/* global typeMappingNLS, typeMappingIntegCadOrigin */

define('DS/ENOXCADTypeMappingUI/utils/CheckObjectsForType', [
    'DS/ENOXCADTypeMappingUI/utils/URLHandler',
    'DS/ENOXCADTypeMappingUI/utils/AJAXUtil'
], function(URLHandler, AJAXUtil) {
    'use strict';

    var checkObjectsForType = {

        // To check if objects of enovia sub type present in database
        isObjectsPresentForEnoviaType: function(subEnoviaType, parentEnoviaType) {
            return new Promise((resolve, reject) => {
                let paramsJSON = {
                    subEnoviaType: subEnoviaType,
                    parentEnoviaType: parentEnoviaType,
                    integCadOrigin: typeMappingIntegCadOrigin
                };

                const paramsJSONString = encodeURI(JSON.stringify(paramsJSON));

                const url = URLHandler.getURL() +
                    '/resources/xcadtypemapping/services/checkObjectsForType?paramsJSONString=' + paramsJSONString +
                    '&tenant=' + URLHandler.getTenant();

                AJAXUtil.getFromServer(url, 'GET')
                    .then((response) => {
                        console.log('Response from type mapping checkObjectsForType web service:', response);
                        return resolve(response);
                    })
                    .catch((error) => {
                        console.log('Failure in type mapping checkObjectsForType web service:', error);
                        return reject(typeMappingNLS.checkObjectsForTypeFailureMessage);
                    });
            });
        }
    };

    return checkObjectsForType;
});

/* global UWA, typeMappingChangedModels:writable, typeMappingIntegNLS, typeMappingNLS */

define('DS/ENOXCADTypeMappingUI/views/SelectionChipsView', [
    'UWA/Class/View',
    'DS/UIKIT/Mask',
    'DS/ENOXCADTypeMappingUI/utils/CommonUIUtil',
    'DS/ENOXCADTypeMappingUI/utils/AlertMessage',
    'DS/ENOXCADTypeMappingUI/utils/CheckObjectsForType'
], function(View, Mask, CommonUIUtil, AlertMessage, CheckObjectsForType) {
    'use strict';

    var selectionChipsView = View.extend({
        tagName: 'tr',

        setup: function() {
            const that = this;

            that.listenTo(
                that.model,
                'onChange:valueFromUI',
                that.valueOnChangeHandler
            );

            that.listenTo(
                that.model,
                'onChange:deployStatus',
                that.deployStatusOnChangeHandler
            );
        },

        // 'valueFromUI' on change handler
        valueOnChangeHandler: function(model, options) {
            const that = this;

            if (options) {
                that.addModelToChangedModels(model);
                model.set('deployStatus', 'NotDeployed');
            } else {
                AlertMessage.add({
                    className: 'error',
                    message: typeMappingNLS.valueCanNotBeBlankMessage
                });

                model.set('deployStatus', 'InvalidValueCanNotDeploy');

                if (typeMappingChangedModels.includes(model)) {
                    typeMappingChangedModels = typeMappingChangedModels.filter(
                        (item) => item !== model
                    );
                }
            }
        },

        // to add current model to typeMappingChangedModels array
        addModelToChangedModels: function(model) {
            if (typeMappingChangedModels.includes(model)) {
                typeMappingChangedModels = typeMappingChangedModels.filter(
                    (item) => item !== model
                );
            }
            typeMappingChangedModels.push(model);
        },

        // 'deployStatus' on change handler
        deployStatusOnChangeHandler: function(model, options) {
            const that = this;
            that.cellTypeMappingDeployStatus.innerHTML = '';
            CommonUIUtil.buildDeployStsCell(options).inject(
                that.cellTypeMappingDeployStatus
            );
        },

        // to add SelectionChips row
        render: function() {
            const that = this;

            const cellStructure = CommonUIUtil.getCellStructure();
            const cellTypeMappingCadType = cellStructure[0];
            const cellTypeMappingInfo = cellStructure[1];
            const cellTypeMapping3DXPTypes = cellStructure[2];
            that.cellTypeMappingDeployStatus = cellStructure[3];

            const label = typeMappingIntegNLS[that.model.get('label')];
            const info = typeMappingIntegNLS[that.model.get('info')];

            // Create CAD Type Column
            UWA.createElement('p', {
                text: label,
                'class': ''
            }).inject(cellTypeMappingCadType);

            // Create Info Column
            CommonUIUtil.buildPopoverSpan(cellTypeMappingInfo, info);

            // Create 3DEXPERIENCE Type Column
            const enoviaTypesTable = UWA.createElement('table', {
                'class': 'enoviaTypesTable table table-condensed',
                id: 'enoviaTypesTable'
            }).inject(cellTypeMapping3DXPTypes); // table

            // Create selection chips row
            const selectionChipsRow = UWA.createElement('tr'); // 1st row
            selectionChipsRow.inject(enoviaTypesTable);

            const cellSelectionChips = UWA.createElement('td', {
                width: '100%',
                colspan: 2
            }).inject(selectionChipsRow);

            const rangeLables = that.model.get('rangelabel');
            const ranges = that.model.get('range');
            const valuesFromDB = that.model.get('valueFromDB').split(',');

            const selectionChips = CommonUIUtil.getSelectionChips(
                rangeLables,
                ranges,
                valuesFromDB
            );
            selectionChips.inject(cellSelectionChips);

            // Create add selection chips row
            const addSelectionChipsRow = UWA.createElement('tr'); // 2nd row
            addSelectionChipsRow.inject(enoviaTypesTable);

            const cellAllTypesComboBox = UWA.createElement('td', {
                width: '85%',
                align: 'left'
            }).inject(addSelectionChipsRow);

            const allTypesComboBox = CommonUIUtil.getAllTypesComboBox(
                rangeLables,
                ranges
            );
            allTypesComboBox.inject(cellAllTypesComboBox);

            const cellAddTypeButton = UWA.createElement('td', {
                width: '15%',
                align: 'left'
            }).inject(addSelectionChipsRow);

            const addTypeButton = CommonUIUtil.getAddTypeButton();
            addTypeButton.inject(cellAddTypeButton);

            // Create Deploy Status Column
            CommonUIUtil.buildDeployStsCell(that.model.get('deployStatus')).inject(
                that.cellTypeMappingDeployStatus
            );

            cellTypeMappingCadType.inject(that.container);
            cellTypeMappingInfo.inject(that.container);
            cellTypeMapping3DXPTypes.inject(that.container);
            that.cellTypeMappingDeployStatus.inject(that.container);

            that.selectionChipsBackup = selectionChips.getAllChipsOptions();

            // Add type button on click event handler
            addTypeButton.addEventListener('click', function() {
                const addedChipsAsLabels = selectionChips.getAllChipsAsLabels();
                if (!addedChipsAsLabels.includes(allTypesComboBox.label)) {
                    selectionChips.addChip({
                        label: allTypesComboBox.label,
                        value: allTypesComboBox.value
                    });
                } else {
                    AlertMessage.add({
                        className: 'error',
                        message: typeMappingNLS.typeIsAlreadyPresentMessage
                    });
                }
            });

            // Event on chip addition
            selectionChips.addEventListener('onPostAdd', function() {
                let addedChips = selectionChips.getAllChipsOptions();
                let addedChipsValues = addedChips.map(function(el) {
                    return el.value;
                });
                that.selectionChipsBackup = selectionChips.getAllChipsOptions();
                that.model.set('valueFromUI', addedChipsValues.toString());
            });

            // Event on chip removal
            selectionChips.addEventListener('onPostRemove', function(e) {
                Mask.mask(that.container);

                let addedChips = selectionChips.getAllChipsOptions();
                let addedChipsValues = addedChips.map(function(el) {
                    return el.value;
                });

                const parentEnoviaType = that.model.get('parentEnoviaType');

                if (addedChipsValues.includes(parentEnoviaType)) {
                    const subEnoviaType = e.options.chips[0].chipOptions.value;

                    CheckObjectsForType.isObjectsPresentForEnoviaType(subEnoviaType, parentEnoviaType)
                        .then(response => {
                            const isObjectPresent = response.isObjectPresent;

                            if (!isObjectPresent) {
                                that.selectionChipsBackup = selectionChips.getAllChipsOptions();
                                that.model.set('valueFromUI', addedChipsValues.toString());
                            } else {
                                AlertMessage.add({
                                    className: 'error',
                                    message: typeMappingNLS.sub3DXPTypeCanNotBeRemoved
                                });

                                selectionChips._preventEventsCpt++; // Disable Events
                                selectionChips.removeAllChips();
                                selectionChips.addChips(that.selectionChipsBackup);
                                selectionChips._preventEventsCpt--; // Enable Events
                            }

                            Mask.unmask(that.container);
                        })
                        .catch((error) => {
                            AlertMessage.add({
                                className: 'error',
                                message: error
                            });

                            selectionChips._preventEventsCpt++; // Disable Events
                            selectionChips.removeAllChips();
                            selectionChips.addChips(that.selectionChipsBackup);
                            selectionChips._preventEventsCpt--; // Enable Events

                            Mask.unmask(that.container);
                        });
                } else {
                    AlertMessage.add({
                        className: 'error',
                        message: typeMappingNLS.parent3DXPTypeCanNotBeRemoved
                    });

                    selectionChips._preventEventsCpt++; // Disable Events
                    selectionChips.removeAllChips();
                    selectionChips.addChips(that.selectionChipsBackup);
                    selectionChips._preventEventsCpt--; // Enable Events

                    Mask.unmask(that.container);
                }
            });

            return that;
        }
    });

    return selectionChipsView;
});

/* global UWA, widget, typeMappingIntegNLS */

define('DS/ENOXCADTypeMappingUI/views/TypeMappingsView', [
  'UWA/Class/View',
  'DS/ENOXCADTypeMappingUI/models/SelectionChipsModel',
  'DS/ENOXCADTypeMappingUI/views/SelectionChipsView',
  'DS/ENOXCADTypeMappingUI/utils/CommonUIUtil'
], function (View, SelectionChipsModel, SelectionChipsView, CommonUIUtil) {
  'use strict';

  var typeMappingsView = View.extend({
    render: function (allJSONDataObjs) {
      const that = this;

      that.setContainerHeight();

      // to set height of container on resize of widget
      widget.addEvent('onResize', function () {
        let hght = widget.getViewportDimensions().height;
        that.container.setStyle('height', hght - 210 + 'px');
      });

      let groupTable = {},
        typeMappingsTBody,
        accordTitle;

      for (let jsonObj of allJSONDataObjs) {
        if (Object.prototype.hasOwnProperty.call(jsonObj, 'valueFromDB')) {
          if (
            Object.prototype.hasOwnProperty.call(groupTable, jsonObj.groupName)
          ) {
            typeMappingsTBody = groupTable[jsonObj.groupName];
          } else {
            const typeMappingsTable = UWA.createElement('table', {
              'class': 'typeMappingTable table table-condensed',
              id: jsonObj.groupName + 'Table'
            }).inject(that.container);

            accordTitle = typeMappingIntegNLS[jsonObj.groupName];

            const accord = CommonUIUtil.createFamilyUIKITAccordion(
              typeMappingsTable,
              jsonObj.groupName,
              accordTitle
            );
            accord.inject(that.container);

            typeMappingsTBody = UWA.createElement('tbody', {
              'class': 'fparamtbody',
              id: jsonObj.groupName + 'Body'
            }).inject(typeMappingsTable);

            var tableHeading = CommonUIUtil.buildTypeMappingsTableHeading();
            tableHeading.inject(typeMappingsTBody);

            groupTable[jsonObj.groupName] = typeMappingsTBody;
          }

          if (jsonObj.mappingType && jsonObj.mappingType === 'busType') {
            that.addSelectionChips(jsonObj, typeMappingsTBody);
          }
        }
      }

      return that;
    },

    // to select an item among a list of possible items.
    addSelectionChips: function (data, typeMappingsTBody) {
      const selectionChipsRow = UWA.createElement('tr');

      let selectionChipsModel = new SelectionChipsModel(data);
      let selectionChipsView = new SelectionChipsView({
        id: selectionChipsModel.mappingId,
        className: 'selectionChipsRowClass',
        model: selectionChipsModel,
        container: selectionChipsRow
      });

      selectionChipsView.render().container.inject(typeMappingsTBody);
    },

    destroy: function () {
      this._parent();
    },

    // to set initial height of container
    setContainerHeight: function () {
      let hght = widget.getViewportDimensions().height;
      this.container.setStyle('height', hght - 210 + 'px');
    }
  });

  return typeMappingsView;
});

/* eslint-disable no-console */
/* global UWA */
/* exported typeMappingChangedModels, typeMappingNLS, typeMappingIntegNLS, typeMappingIntegCadOrigin */

var typeMappingNLS,
  // eslint-disable-next-line no-unused-vars
  typeMappingIntegNLS,
  typeMappingIntegName,
  typeMappingIntegCadOrigin,
  typeMappingChangedModels = [];

define('DS/ENOXCADTypeMappingUI/views/XCADTypeMappingView', [
  'UWA/Class/View',
  'DS/UIKIT/Mask',
  'DS/UIKIT/Scroller',
  'DS/ENOXCADTypeMappingUI/utils/AlertMessage',
  'DS/ENOXCADTypeMappingUI/utils/URLHandler',
  'DS/ENOXCADTypeMappingUI/utils/GCOUtil',
  'DS/ENOXCADTypeMappingUI/utils/JSONUtil',
  'DS/ENOXCADTypeMappingUI/utils/ApplyResetToolbar',
  'DS/ENOXCADTypeMappingUI/utils/AJAXUtil',
  'DS/ENOXCADTypeMappingUI/views/TypeMappingsView',
  'i18n!DS/ENOXCADTypeMappingUI/assets/nls/TypeMapping',
  'css!DS/ENOXCADTypeMappingUI/ENOXCADTypeMappingUI'
], function (
  View,
  Mask,
  Scroller,
  AlertMessage,
  URLHandler,
  GCOUtil,
  JSONUtil,
  ApplyResetToolbar,
  AJAXUtil,
  TypeMappingsView,
  TypeMappingNLS
) {
  'use strict';

  let typeMappingPageJSON = [];

  var xcadTypeMappingView = View.extend({
    setup: function (options) {
      this.integGCOName = options.integGCOName;
      this.urlInfo = options.urlInfo;
      this.typeMappingsView = null;
      this.applyResetDiv = null;
    },

    render: function () {
      const that = this;
      typeMappingNLS = TypeMappingNLS;

      Mask.mask(that.container);

      that.addIntroDiv();

      URLHandler.init(this.urlInfo.baseUrl, this.urlInfo.tenant);

      GCOUtil.getGCOTypeNameRevision(that.integGCOName)
        .then((response) => {
          typeMappingIntegName = response.integrationName;
          typeMappingIntegCadOrigin = response.integCadOrigin;

          JSONUtil.getIntegJSONdata()
            .then((integJSONData) => {
              typeMappingPageJSON = [...integJSONData];

              if (integJSONData.length > 0) {
                that
                  .renderTypeMappingsView(integJSONData)
                  .then(() => {
                    that.addApplyResetToolbar();
                    Mask.unmask(that.container);
                  })
                  .catch((error) => {
                    that.addErrorDiv(error);
                    Mask.unmask(that.container);
                  });
              } else {
                Mask.unmask(that.container);
              }
            })
            .catch((error) => {
              that.addErrorDiv(error);
              Mask.unmask(that.container);
            });
        })
        .catch((error) => {
          that.addErrorDiv(error);
          Mask.unmask(that.container);
        });

      return this;
    },

    // to add introduction of TypeMappings tab
    addIntroDiv: function () {
      const introDiv = UWA.createElement('div', {
        'class': 'information'
      }).inject(this.container);

      UWA.createElement('br', {}).inject(introDiv);

      UWA.createElement('p', {
        text: typeMappingNLS.intro,
        'class': 'font-3dslight'
      }).inject(introDiv);
    },

    // to display error message while initialization of TypeMappings tab
    addErrorDiv: function (errorText) {
      const span = UWA.createElement('span', {
        'class': 'badge badge-error'
      }).inject(this.container);

      UWA.createElement('span', {
        text: errorText,
        'class': 'badge-content'
      }).inject(span);
    },

    // to add 'Apply' & 'Reset' buttons
    addApplyResetToolbar: function () {
      this.applyResetDiv = ApplyResetToolbar.addApplyResetToolbar(
        this.applyBtnOnClickHandler.bind(this),
        this.resetBtnOnClickHandler.bind(this)
      );

      this.applyResetDiv.inject(this.container);
    },

    // to add TypeMappings View
    renderTypeMappingsView: function (integJSONData) {
      return new Promise((resolve, reject) => {
        const that = this;

        GCOUtil.getTypeMappingValuesFromGCO(integJSONData)
          .then((integJSONDataFromDB) => {
            that.typeMappingsView = new TypeMappingsView({
              id: 'typeMappingsID',
              className: 'typeMappingsDivClass'
            });
            that.typeMappingsView
              .render(integJSONDataFromDB)
              .container.inject(this.container);

            new Scroller({
              element: that.typeMappingsView.container
            }).inject(that.container);

            return resolve();
          })
          .catch((error) => {
            return reject(error);
          });
      });
    },

    // to update attribute values on click of 'Apply' button
    applyBtnOnClickHandler: function () {
      if (typeMappingChangedModels.length > 0) {
        const that = this;

        Mask.mask(that.container);

        let deployParams = {
          typeMappingChangedModels: typeMappingChangedModels,
          integrationName: typeMappingIntegName
        };

        const url =
          that.urlInfo.baseUrl +
          '/resources/xcadtypemapping/services/deploy?tenant=' +
          that.urlInfo.tenant;

        AJAXUtil.getFromServer(url, 'POST', JSON.stringify(deployParams))
          .then((response) => {
            console.log(
              'Response from type mapping deploy web service: ',
              response
            );

            AlertMessage.add({
              className: 'success',
              message: TypeMappingNLS.applySuccessMessage
            });

            for (var changedModel of typeMappingChangedModels) {
              changedModel.set('deployStatus', 'Deployed');
            }

            typeMappingChangedModels = [];
            Mask.unmask(that.container);
          })
          .catch((error) => {
            console.log('Failure in type mapping deploy web service: ', error);

            AlertMessage.add({
              className: 'error',
              message: TypeMappingNLS.applyFailureMessage
            });

            typeMappingChangedModels = [];
            Mask.unmask(that.container);
          });
      }
    },

    // to reset attribute values on click of 'Reset' button
    resetBtnOnClickHandler: function () {
      AlertMessage.add({
        className: 'success',
        message: TypeMappingNLS.resetSuccessMessage
      });

      this.resetTypeMappingsView();
    },

    // to reset TypeMappings View
    resetTypeMappingsView: function () {
      Mask.mask(this.container);
      this.stopListening(this.typeMappingsView);
      this.typeMappingsView.destroy();
      this.typeMappingsView = null;
      this.applyResetDiv.destroy();
      this.applyResetDiv = null;

      this.renderTypeMappingsView(typeMappingPageJSON)
        .then(() => {
          this.addApplyResetToolbar();
          Mask.unmask(this.container);
        })
        .catch(() => {
          Mask.unmask(this.container);
        });

      typeMappingChangedModels = [];
    },

    // to destroy TypeMappings Tab View
    destroy: function () {
      this.stopListening(this.typeMappingsView);
      this.typeMappingsView.destroy();
      this.typeMappingsView = null;

      this._parent();
    }
  });

  return xcadTypeMappingView;
});

