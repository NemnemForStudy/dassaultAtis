/* global define */

define('DS/ENOXCADAdminSettingUI/models/EditorModel', [
  'UWA/Class/Model'
], function (Model) {

  'use strict';

  var editorModel = Model.extend({

    setup: function () {
      // console.log('EditorModel has been set up.');
    }
  });

  return editorModel;
});

/* global define */

define('DS/ENOXCADAdminSettingUI/models/FileExchangeModel', [
  'UWA/Class/Model'
], function (Model) {

  'use strict';

  var fileExchangeModel = Model.extend({

    setup: function () {
      // console.log('FileExchangeModel has been set up.');
    }
  });

  return fileExchangeModel;
});

/* global define, widget */

define('DS/ENOXCADAdminSettingUI/utils/AJAXUtil', [
  'DS/WAFData/WAFData'
], function (
  WAFData
) {

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
            'Accept': 'application/json',
            'Accept-Language': widget.lang
          },

          onFailure: function (error, textStatus) {
            if(textStatus)
              console.log("Error from server side: ", textStatus.errorMessage);
            return reject(error);
          },

          onComplete: function (response) {
            return resolve(response);
          }
        });
      });
    }
  }

  return ajaxUtil;

});

/* global define, UWA, adminSettingNLS*/

define('DS/ENOXCADAdminSettingUI/utils/CommonUIUtil', [
  'DS/UIKIT/Popover',
  'DS/UIKIT/Accordion'
], function (
  Popover,
  Accordion
) {

  'use strict';

  var commonUIUtil = {

    // to get all settings columns structure
    getCellStructure: function () {

      const cellSettingLabel = UWA.createElement('td', {
        'width': '50%',
        'align': 'left'
      });

      const cellSettingInfo = UWA.createElement('td', {
        'width': '10%',
        'align': 'left'
      });

      const cellSettingUIType = UWA.createElement('td', {
        'width': '25%',
        'align': 'left'
      });

      const cellSettingDeployStatus = UWA.createElement('td', {
        'width': '15%',
        'align': 'right'
      });

      const columnsStructure = [cellSettingLabel, cellSettingInfo, cellSettingUIType, cellSettingDeployStatus];
      return columnsStructure;

    },

    // to display setting information
    buildPopoverSpan: function (containerCell, tooltipNLSText) {

      const imgInfoSpan = UWA.createElement('span', {
        'class': 'fonticon fonticon-info'
      }).inject(containerCell);

      imgInfoSpan.setStyle('color', 'black');

      new Popover({
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
        imgTitle = adminSettingNLS.Deployed;
        iconColor = 'green';
        break;
      case 'NotDeployed':
        imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-cog';
        imgTitle = adminSettingNLS.NotDeployed;
        iconColor = 'orange';
        break;
      case 'NewNotDeployed':
        imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-cog';
        imgTitle = adminSettingNLS.NewNotDeplyed;
        iconColor = 'black';
        break;
      case 'InvalidValueCanNotDeploy':
        imgClass = 'fonticon fonticon-' + iconSize + 'x fonticon-wrong';
        imgTitle = adminSettingNLS.InvalidValueCanNotDeploy;
        iconColor = 'red';
        break;
      default:
        break;
      }

      const imgCell = UWA.createElement('td', {
        'width': '15%',
        'align': 'center',
        'title': imgTitle
      });

      const imgSpan = UWA.createElement('span', {
        'class': imgClass
      }).inject(imgCell);

      imgSpan.setStyle('color', iconColor);
      imgCell.setStyle('vertical-align', 'text-bottom');
      imgCell.setStyle('min-width', '46px');

      return imgCell;
    },

    // to create Settings table heading
    buildSettingsTableHeading: function () {

      const lineTitle = UWA.createElement('tr', {
        'class': 'success'
      });

      var iCell = UWA.createElement('td', {
        'align': 'left',
        'width': '50%',
      }).inject(lineTitle);

      UWA.createElement('h5', {
        text: adminSettingNLS.Name
      }).inject(iCell);

      iCell = UWA.createElement('td', {
        'align': 'left',
        'width': '10%',
      }).inject(lineTitle);

      UWA.createElement('h5', {
        text: adminSettingNLS.Info
      }).inject(iCell);

      iCell = UWA.createElement('td', {
        'align': 'left',
        'width': '25%',
      }).inject(lineTitle);

      UWA.createElement('h5', {
        text: adminSettingNLS.Value
      }).inject(iCell);

      iCell = UWA.createElement('td', {
        'align': 'center',
        'width': '15%',
      }).inject(lineTitle);

      UWA.createElement('h5', {
        text: adminSettingNLS.DeployStatus
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

  }

  return commonUIUtil;
});

/* global define */

define('DS/ENOXCADAdminSettingUI/models/ToggleModel', [
  'UWA/Class/Model'
], function (Model) {

  'use strict';

  var toggleModel = Model.extend({

    setup: function () {
      // console.log('ToggleModel has been set up.');
    }
  });

  return toggleModel;
});

/* global define */

define('DS/ENOXCADAdminSettingUI/utils/AlertMessage', [
  'DS/UIKIT/Alert'
], function (
  Alert
) {

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

/* global define, UWA, adminSettingNLS */

define('DS/ENOXCADAdminSettingUI/utils/ApplyResetToolbar',
  ['DS/UIKIT/Input/Button'],
  function (
    Button
  ) {

    'use strict';

    var applyResetToolbar = {

      // to add 'Apply' & 'Reset' buttons
      addApplyResetToolbar: function (applyCallback, resetCallback) {

        const applyResetDiv = UWA.createElement('div', {
          'class': 'adminSettingApplyResetDiv'
        });

        const tableButtons = UWA.createElement('table', {
          'class': '',
          'id': '',
          'width': '100%'
        }).inject(applyResetDiv);

        const lineButtons = UWA.createElement('tr').inject(tableButtons);

        const buttonApplyCell = UWA.createElement('td', {
          'width': '50%',
          'Align': 'center'
        }).inject(lineButtons);

        const applyBttn = new Button({
          className: 'primary',
          id: 'buttonExport',
          icon: 'export',
          attributes: {
            disabled: false,
            title: adminSettingNLS.Apply,
            text: adminSettingNLS.Apply
          },
          events: {
            onClick: function () {
              applyCallback();
            }
          }
        }).inject(buttonApplyCell);

        applyBttn.getContent().setStyle('width', 110);

        const buttonResetCell = UWA.createElement('td', {
          'width': '50%',
          'Align': 'center'
        }).inject(lineButtons);

        const resetBbttn = new Button({
          className: 'warning',
          icon: 'loop',
          attributes: {
            disabled: false,
            title: adminSettingNLS.Reset,
            text: adminSettingNLS.Reset
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
    }

    return applyResetToolbar;

  });

/* global define, require, integrationNLS:writable, integrationName, adminSettingNLS */
/* exported integrationNLS */

define('DS/ENOXCADAdminSettingUI/utils/JSONUtil', [
  'WebappsUtils/WebappsUtils',
  'text!DS/ENOXCADAdminSettingUI/assets/IEFUPS.json'
], function (
  WebappsUtils,
  IEFJson
) {

  'use strict';

  var jsonUtils = {

    // to get Integration JSON data from json file
    getIntegJSONdata: function (jsonfile) {

      return new Promise((resolve, reject) => {

        const requset = new XMLHttpRequest();

        requset.addEventListener('readystatechange', () => {
          if (requset.readyState === 4 && requset.status === 200) {

            try {

              const jsonData = JSON.parse(requset.responseText);

              try {
                require(['i18n!DS/ENOXCADAdminSettingUI/assets/nls/' + integrationName], function (IntegNLS) {
                  integrationNLS = IntegNLS;
                  return resolve(jsonData.settings);
                });
              } catch (err) {
                console.error("Failure in loding " + integrationName + " NLS file:", err);
                return reject(adminSettingNLS.integNLSLoadingFailureMessage);
              }

            } catch (err) {
              console.error("Failure in parsing " + integrationName + " JSON:", err);
              return reject(adminSettingNLS.integJSONParsingFailureMessage);
            }

          } else if (requset.readyState === 4) {
            console.error("Json file not found. File name: " + jsonfile);
            resolve([]);
          }
        });

        requset.open('GET', jsonfile);
        requset.send();

      });
    },

    // to get IEF + Integration JSON data from json files
    getAllJSONData: function () {

      return new Promise((resolve, reject) => {

        let iefSettings = [];

        try {

          const iefJSONData = JSON.parse(IEFJson);
          iefSettings = iefJSONData.settings;

        } catch (err) {
          console.error("Failure in parsing IEF JSON:", err);
          return reject(adminSettingNLS.iefJSONParsingFailureMessage);
        }

        for (let setting of iefSettings) {
          setting.isIEFSetting = true;
        }

        const integJsonFile = WebappsUtils.getWebappsAssetUrl('ENOXCADAdminSettingUI', integrationName + '.json');

        this.getIntegJSONdata(integJsonFile).then((integSettings) => {

          return resolve(iefSettings.concat(integSettings));

        }).catch(error => {
          return reject(error);
        });
      });
    }

  }

  return jsonUtils;

});

/* global define */

define('DS/ENOXCADAdminSettingUI/models/ComboBoxModel', [
  'UWA/Class/Model'
], function (Model) {

  'use strict';

  var comboBoxModel = Model.extend({

    setup: function () {
      // console.log('ComboBoxModel has been set up.');
    }
  });

  return comboBoxModel;
});

/* global define */

define('DS/ENOXCADAdminSettingUI/models/LineEditorModel', [
  'UWA/Class/Model'
], function (Model) {

  'use strict';

  var lineEditorModel = Model.extend({

    setup: function () {
      // console.log('LineEditorModel has been set up.');
    }
  });

  return lineEditorModel;
});

/* global define */

define('DS/ENOXCADAdminSettingUI/utils/URLHandler', [], function () {

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

/* global define */

define('DS/ENOXCADAdminSettingUI/models/CheckBoxModel', [
  'UWA/Class/Model'
], function (Model) {

  'use strict';

  var checkBoxModel = Model.extend({

    setup: function () {
      // console.log('CheckBoxModel has been set up.');
    }
  });

  return checkBoxModel;
});

/* global define */

define('DS/ENOXCADAdminSettingUI/utils/ValidateSetting', [
  'DS/ENOXCADAdminSettingUI/utils/URLHandler',
  'DS/ENOXCADAdminSettingUI/utils/AJAXUtil'
], function (URLHandler, AJAXUtil) {

  'use strict';

  var validateSetting = {

    isValid: function (dataFromJson) {

      return new Promise((resolve, reject) => {

        const url = URLHandler.getURL() +
          '/resources/xcadsettings/services/validate?tenant=' + URLHandler.getTenant();

        AJAXUtil.getFromServer(url, 'POST', JSON.stringify(dataFromJson)).then(response => {

          console.log('Response from validate web service: ', response);
          return resolve(response);

        }).catch(error => {

          console.error('Failure in validate web service: ', error);
          return reject(error);

        });
      });
    }

  };

  return validateSetting;
});

define('DS/ENOXCADAdminSettingUI/utils/FileExchangeConfig', [
    'UWA/Core',
    'UWA/Utils',
    'UWA/Utils/Client',
    'DS/WAFData/WAFData',
    'DS/ENOXCADAdminSettingUI/utils/URLHandler'
    ], function(
	    UWA,
	    Utils,
	    Client,
	    WAFData,
	    URLHandler
    ) {
    'use strict';

    const URL_SECURITY_CONTEXT = "/resources/pno/person/getsecuritycontext";
    const URL_CSRF_TOKEN = "/resources/v1/application/CSRF";
    const URL_VALIDATE_TNR = "/resources/xcadsettings/services/validateTNR";
    const URL_XCAD_DETAILS = "/resources/v1/modeler/dsxcad/dsxcad:Representation";
    const URL_CHECKIN_TICKET = "/resources/v1/modeler/dsxcad/CheckinTicket";
    const URL_FILE_CREATION = "/resources/v1/modeler/dsxcad";
    const URL_UPDATE_GCO_PARAM = "/resources/xcadsettings/services/deploy?tenant=";

    var _securityContext;

    function ExchnageConfig() {
	if (typeof ExchnageConfig.instance === 'object') return ExchnageConfig.instance;
	ExchnageConfig.instance = this;
	return this;
    };

    function safeParse(data) {
	return typeof data === 'string' ? JSON.parse(data) : data;
    }

    function executeService(url, options, errMsg) {
	return new UWA.Promise(function (resolve, reject) {
	    options.onComplete = function(response) {
		let result = safeParse(response);
		resolve(result);
	    };

	    options.onFailure = function(err) {
		reject(errMsg + " " + "Failure");
	    };

	    options.onTimeout = function(e) {
		reject(errMsg + " " + "Timeout");
	    };

	    // Flatten data
	    if (options.data) {
		options.data = JSON.stringify(options.data);
	    }

	    WAFData.authenticatedRequest(url, options);
	});
    }

    /*
     * Set Security Context
     */
    ExchnageConfig.prototype.setSecurityContext = function(securityContext) {
	_securityContext = "ctx::" + securityContext;
    }

    /*
     * Get Security Context
     */
    ExchnageConfig.prototype.getSecurityContext = async function() {
	const url = URLHandler.getURL() + URL_SECURITY_CONTEXT;
	let options = {
		method: 'GET',
		type: 'json',
		proxy: 'passport',
	};
	let errMsg = "Error: SecurityContext";
	return executeService(url, options, errMsg);
    }

    /*
     * Get CSRF Token
     */
    ExchnageConfig.prototype.getCSRFToken = async function() {
	const url = URLHandler.getURL() + URL_CSRF_TOKEN;
	let options = {
		method: 'GET',
		proxy: 'passport',
	};
	let errMsg = "Error: CSRF Token";
	return executeService(url, options, errMsg);
    }

    /*
     * To Validate TNR and get PHID
     */
    ExchnageConfig.prototype.validateTNR = async function(payLoad) {
	const url = URLHandler.getURL() + URL_VALIDATE_TNR + '?tenant=' + URLHandler.getTenant();
	let options = {
		timeout: 250000,
		method: 'POST',
		type: 'json',
		headers: {
		    'Content-Type'		: 'application/json',
		    'Accept'			: 'application/json',
		    'SecurityContext'	: _securityContext
		},
		data: payLoad
	};
	let errMsg = "Error: validateTNR service";
	return executeService(url, options, errMsg);
    }

    /*
     * Get XCAD Details of CESTAMP and FILENAME
     */
    ExchnageConfig.prototype.getXCADDetails = async function(phid, csrfToken) {
	const url = URLHandler.getURL() + URL_XCAD_DETAILS + `/${phid}?$mask=dsmvxcad:xCADRepMask.Default`;
	let options = {
		timeout: 250000,
		method: 'GET',
		headers: {
		    'SecurityContext'	: _securityContext,
		    'ENO_CSRF_TOKEN'	: csrfToken
		}
	};
	let errMsg = "Error: getXCADDetails service";
	return executeService(url, options, errMsg);
    }
    /*
     * Get Check-in Ticket
     */
    ExchnageConfig.prototype.getCheckinTicket = async function(csrfToken) {
	const url = URLHandler.getURL() + URL_CHECKIN_TICKET;
	let options = {
		method: "POST",
		headers: {
		    'Content-Type'		: 'application/json',
		    'Accept'			: 'application/json',
		    'SecurityContext'	: _securityContext,
		    'ENO_CSRF_TOKEN'	: csrfToken
		},
		data: {
		    "FileNumber": "1",
		    "TicketNumber": "1",
		    "Type": "dsxcad:Resource"
		}
	};
	let errMsg = "Error: Checkin Ticket";
	return executeService(url, options, errMsg);
    }

    /*
     * FCS file upload
     */
    ExchnageConfig.prototype.fcsCheckin = async function(checkinTicket, file) {
	return new Promise((resolve,reject) => {
	    const url = checkinTicket['ticketURL'];
	    let ticketParam = checkinTicket['jobticket'];
	    let ticket = checkinTicket['tickets'][0];

	    // dispatch xhr to start file upload - detect file upload completion and notify user
	    let xhr = new XMLHttpRequest();

	    // listen for `upload.load` event
	    xhr.onreadystatechange = function (oEvent) {
		if (xhr.readyState === 4) {
		    if (xhr.status === 0 || xhr.status === 200) {
			resolve(xhr.response.trim());
		    } else if (xhr.status === 500) {
			reject("Error: Upload File to FCS");
		    } 
		}
	    };

	    // listen for `progress` event
	    xhr.upload.onprogress = function(e) {
	    }

	    // listen for `upload.error` event
	    xhr.upload.onerror = () => {
		console.error('Upload failed.');
	    }

	    // open request
	    xhr.open('POST', url, true);

	    // prepare a file object
	    const formData = new FormData();
	    formData.append('__fcs__nohtml', true);
	    formData.append(ticketParam, ticket);
	    formData.append('file_0',  file);

	    // send request
	    xhr.send(formData);
	});
    }

    /*
     * Create/Modify File
     */
    ExchnageConfig.prototype.fileCreation = async function(csrfToken, checkinReceipt, fileName, fileCheckSum, filePhid, fileCeStamp, name, urlType) {
	let fileTitle = fileName.substring(0,fileName.indexOf("."));
	let url,payload;

	if(filePhid!="") {
	    url = URLHandler.getURL() + URL_FILE_CREATION + `/${urlType}/${filePhid}/Modify?$mask=dsmvxcad:xCADRepMask.Details`;
	    payload = {
		    "title": fileTitle,
		    "description": fileTitle,
		    "cestamp": fileCeStamp,
		    "dsxcad:AuthoringFile": {
			"filename": fileName,
			"receipt": checkinReceipt,
			"MD5": fileCheckSum
		    }
	    }
	} else {
	    url = URLHandler.getURL() + URL_FILE_CREATION + `/${urlType}?$mask=dsmvxcad:xCADRepMask.Details&AuthorizeCADOrigin=${integCadOrigin}`;
	    payload = {
		    "items": [{
			"attributes": {
			    "title": fileTitle,
			    "description": fileTitle,
			    "dsxcad:xCADAttributes": {
				"cadorigin": integCadOrigin
			    },
			    "dsxcad:AuthoringFile": {
				"filename": fileName,
				"receipt": checkinReceipt,
				"MD5": fileCheckSum
			    }
			}
		    }]
	    }
	    if(name!=undefined) {
		payload.items[0].attributes['name'] = name;
	    }
	}

	let options = {
		method: "POST",
		headers: {
		    'Content-Type'		: 'application/json',
		    'Accept'			: 'application/json',
		    'SecurityContext'	: _securityContext,
		    'ENO_CSRF_TOKEN'	: csrfToken
		},
		data: payload
	};
	let errMsg = "Error: File Creation";
	return executeService(url, options, errMsg);
    }

    /*
     * Update GCO parameter with TNR of file
     */
    ExchnageConfig.prototype.updateGCOParam = async function(payLoad) {
	const url = URLHandler.getURL() + URL_UPDATE_GCO_PARAM + URLHandler.getTenant();
	let options = {
		timeout: 250000,
		method: "POST",
		type: 'json',
		headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json',
		    'Accept-Language': widget.lang
		},
		data: payLoad
	};
	let errMsg = "Error: updateGCO service";
	return executeService(url, options, errMsg);
    }

    /*
     * Get Download Ticket
     */
    ExchnageConfig.prototype.getDownloadTicket = async function(csrfToken, filePhid, urlType) {
	const url = URLHandler.getURL()  + URL_FILE_CREATION + `/${urlType}/${filePhid}/dsxcad:AuthoringFile/DownloadTicket`;
	let options = {
		method: "POST",
		headers: {
		    'Content-Type'		: 'application/json',
		    'Accept'			: 'application/json',
		    'SecurityContext'	: _securityContext,
		    'ENO_CSRF_TOKEN'	: csrfToken
		}
	};
	let errMsg = "Error: Get Download Ticket";
	return executeService(url, options, errMsg);
    }

    /*
     * Checkout file from FCS
     */
    ExchnageConfig.prototype.fcsFileCheckout = async function(fcsJobTicket) {
	return new Promise((resolve,reject) => {
	    const url = fcsJobTicket.ticketURL + '?' + Utils.toQueryString({
		'__fcs__jobTicket': fcsJobTicket.ticket,
		'file_0_name': fcsJobTicket.filename,
		'__fcs__attachment': true
	    });

	    fetch(url)
	    .then(response => response.blob())
	    .then(blob => {
		const objURL = URL.createObjectURL(blob);

		const anchor = document.createElement("a");
		anchor.href = objURL;
		anchor.download = fcsJobTicket.filename;

		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);

		URL.revokeObjectURL(objURL);

		resolve();
	    })
	    .catch(console.error);
	});
    }

    return new ExchnageConfig();
});

/* global define, UWA, changedModels:writable, integrationNLS, iefNLS */

define('DS/ENOXCADAdminSettingUI/views/ToggleView', [
  'UWA/Class/View',
  'DS/Controls/Toggle',
  'DS/ENOXCADAdminSettingUI/utils/CommonUIUtil'
], function (
  View,
  WUXToggle,
  CommonUIUtil
) {

  var toggleView = View.extend({

    tagName: 'tr',

    setup: function () {
      const that = this;
      that.listenTo(that.model, 'onChange:value', that.valueOnChangeHandler);
      that.listenTo(that.model, 'onChange:deployStatus', that.deployStatusOnChangeHandler);
    },

    // 'value' on change handler
    valueOnChangeHandler: function (model, options) {
      const that = this;
      console.log('options: ', options);

      that.addModelToChangedModels(model);
      model.set('deployStatus', 'NotDeployed');
    },

    // to add current model to changedModels array
    addModelToChangedModels: function (model) {
      if (changedModels.includes(model)) {
        changedModels = changedModels.filter(item => item !== model)
      }
      changedModels.push(model);
    },

    // 'deployStatus' on change handler
    deployStatusOnChangeHandler: function(model, options) {
      const that = this;
      that.cellSettingDeployStatus.innerHTML = '';
      CommonUIUtil.buildDeployStsCell(options).inject(that.cellSettingDeployStatus);
    },

    // to render switch row
    render: function () {

      const that = this;
      let label, info;

      if (that.model.get('isIEFSetting')) {
        label = iefNLS[that.model.get('label')];
        info = iefNLS[that.model.get('info')];
      } else {
        label = integrationNLS[that.model.get('label')];
        info = integrationNLS[that.model.get('info')];
      }

      const cellStructure = CommonUIUtil.getCellStructure();
      const cellSettingLabel = cellStructure[0];
      const cellSettingInfo = cellStructure[1];
      const cellSettingUIType = cellStructure[2];
      that.cellSettingDeployStatus = cellStructure[3];

      UWA.createElement('p', {
        text: label,
        'class': ''
      }).inject(cellSettingLabel);

      CommonUIUtil.buildPopoverSpan(cellSettingInfo, info);

      const toggle = new WUXToggle({
        type: that.model.get('uitype'),
        checkFlag: JSON.parse(that.model.get('valueFromDB').toLowerCase().trim())
      }).inject(cellSettingUIType);

      toggle.elements.container.style.display = 'inline';

      CommonUIUtil.buildDeployStsCell(that.model.get('deployStatus')).inject(that.cellSettingDeployStatus);

      cellSettingLabel.inject(that.container);
      cellSettingInfo.inject(that.container);
      cellSettingUIType.inject(that.container);
      that.cellSettingDeployStatus.inject(that.container);

      toggle.addEventListener('change', function () {
        that.model.set('value', toggle.checkFlag.toString());
      });

      return that;
    },

  });

  return toggleView;

});

/* global define, UWA, changedModels:writable, integrationNLS, iefNLS, adminSettingNLS, integrationName */

define('DS/ENOXCADAdminSettingUI/views/LineEditorView', [
  'UWA/Class/View',
  'DS/UIKIT/Mask',
  'DS/Controls/Toggle',
  'DS/Controls/LineEditor',
  'DS/ENOXCADAdminSettingUI/utils/CommonUIUtil',
  'DS/ENOXCADAdminSettingUI/utils/ValidateSetting',
  'DS/ENOXCADAdminSettingUI/utils/AlertMessage'
], function (
  View,
  Mask,
  WUXToggle,
  WUXLineEditor,
  CommonUIUtil,
  ValidateSetting,
  AlertMessage
) {

  var lineEditorView = View.extend({

    setup: function () {
      const that = this;
      that.listenTo(that.model, 'onChange:value', that.valueOnChangeHandler);
      that.listenTo(that.model, 'onChange:deployStatus', that.deployStatusOnChangeHandler);
    },

    // 'value' on change handler
    valueOnChangeHandler: function (model, options) {
      const that = this;
      console.log('options: ', options);

      if (model.get('mode') === 'advanced') {

        Mask.mask(that.container);

        let modelJSON = model.toJSON();
        modelJSON.integrationName = integrationName;

        ValidateSetting.isValid(modelJSON).then(response => {

          let isValid = response.isValid;

          if (isValid) {

            that.addModelToChangedModels(model);
            model.set('deployStatus', 'NotDeployed');

          } else {

            let errorMessage;
            if (response.errorMessage === "invalidValidateRequest")
              errorMessage = adminSettingNLS.invalidValidateRequest;
            else if (model.get('isIEFSetting'))
              errorMessage = iefNLS[response.errorMessage];
            else
              errorMessage = integrationNLS[response.errorMessage];

            AlertMessage.add({
              className: 'error',
              message: errorMessage
            });

            that.lineEditor._myInput.focus();
            model.set('deployStatus', 'InvalidValueCanNotDeploy');

            if (changedModels.includes(model)) {
              changedModels = changedModels.filter(item => item !== model)
            }
          }

          Mask.unmask(that.container);
        });

      } else {
        that.addModelToChangedModels(model);
        model.set('deployStatus', 'NotDeployed');
      }

    },

    // 'deployStatus' on change handler
    deployStatusOnChangeHandler: function(model, options) {
      const that = this;
      that.cellSettingDeployStatus.innerHTML = '';
      CommonUIUtil.buildDeployStsCell(options).inject(that.cellSettingDeployStatus);
    },

    // to add current model to changedModels array
    addModelToChangedModels: function (model) {
      if (changedModels.includes(model)) {
        changedModels = changedModels.filter(item => item !== model)
      }
      changedModels.push(model);
    },

    // to render line editor row
    render: function () {

      const that = this;
      let label, info;

      if (that.model.get('isIEFSetting')) {
        label = iefNLS[that.model.get('label')];
        info = iefNLS[that.model.get('info')];
      } else {
        label = integrationNLS[that.model.get('label')];
        info = integrationNLS[that.model.get('info')];
      }

      const cellStructure = CommonUIUtil.getCellStructure();
      const cellSettingLabel = cellStructure[0];
      const cellSettingInfo = cellStructure[1];
      const cellSettingUIType = cellStructure[2];
      that.cellSettingDeployStatus = cellStructure[3];

      UWA.createElement('p', {
        text: label,
        'class': ''
      }).inject(cellSettingLabel);

      CommonUIUtil.buildPopoverSpan(cellSettingInfo, info);

      that.lineEditor = new WUXLineEditor({
        value: that.model.get('valueFromDB')
      }).inject(cellSettingUIType);

      if(that.model.get('sizeInCharNumber'))
        that.lineEditor._myInput.setAttribute('size', that.model.get('sizeInCharNumber'));

      CommonUIUtil.buildDeployStsCell(that.model.get('deployStatus')).inject(that.cellSettingDeployStatus);

      cellSettingLabel.inject(that.container);
      cellSettingInfo.inject(that.container);
      cellSettingUIType.inject(that.container);
      that.cellSettingDeployStatus.inject(that.container);

      that.lineEditor.addEventListener('blur', function () {
        that.model.set('value', that.lineEditor.value);
      });

      return that;
    },

  });

  return lineEditorView;
});

/* global define, UWA, changedModels:writable, integrationNLS, iefNLS, adminSettingNLS, integrationName */

define('DS/ENOXCADAdminSettingUI/views/EditorView', [
  'UWA/Class/View',
  'DS/UIKIT/Mask',
  'DS/Controls/Toggle',
  'DS/Controls/Editor',
  'DS/ENOXCADAdminSettingUI/utils/CommonUIUtil',
  'DS/ENOXCADAdminSettingUI/utils/ValidateSetting',
  'DS/ENOXCADAdminSettingUI/utils/AlertMessage'
], function (
  View,
  Mask,
  WUXToggle,
  WUXEditor,
  CommonUIUtil,
  ValidateSetting,
  AlertMessage
) {

  'use strict';

  var editorView = View.extend({

    setup: function () {
      const that = this;
      that.listenTo(that.model, 'onChange:value', that.valueOnChangeHandler);
      that.listenTo(that.model, 'onChange:deployStatus', that.deployStatusOnChangeHandler);
    },

    // 'value' on change handler
    valueOnChangeHandler: function (model, options) {
      const that = this;
      console.log('options: ', options);

      if (model.get('mode') === 'advanced') {

        Mask.mask(that.container);

        let modelJSON = model.toJSON();
        modelJSON.integrationName = integrationName;

        ValidateSetting.isValid(modelJSON).then(response => {

          let isValid = response.isValid;

          if (isValid) {

            that.addModelToChangedModels(model);
            model.set('deployStatus', 'NotDeployed');

          } else {

            let errorMessage;
            if (response.errorMessage === "invalidValidateRequest")
              errorMessage = adminSettingNLS.invalidValidateRequest;
            else if (model.get('isIEFSetting'))
              errorMessage = iefNLS[response.errorMessage];
            else
              errorMessage = integrationNLS[response.errorMessage];

            AlertMessage.add({
              className: 'error',
              message: errorMessage
            });

            that.editor._myInput.focus();
            model.set('deployStatus', 'InvalidValueCanNotDeploy');

            if (changedModels.includes(model)) {
              changedModels = changedModels.filter(item => item !== model)
            }
          }

          Mask.unmask(that.container);
        });

      } else {
        that.addModelToChangedModels(model);
        model.set('deployStatus', 'NotDeployed');
      }

    },

    // 'deployStatus' on change handler
    deployStatusOnChangeHandler: function (model, options) {
      const that = this;
      that.cellSettingDeployStatus.innerHTML = '';
      CommonUIUtil.buildDeployStsCell(options).inject(that.cellSettingDeployStatus);
    },

    // to add current model to changedModels array
    addModelToChangedModels: function (model) {
      if (changedModels.includes(model)) {
        changedModels = changedModels.filter(item => item !== model)
      }
      changedModels.push(model);
    },

    // to render editor row
    render: function () {

      const that = this;
      let label, info;

      if (that.model.get('isIEFSetting')) {
        label = iefNLS[that.model.get('label')];
        info = iefNLS[that.model.get('info')];
      } else {
        label = integrationNLS[that.model.get('label')];
        info = integrationNLS[that.model.get('info')];
      }

      const cellStructure = CommonUIUtil.getCellStructure();
      const cellSettingLabel = cellStructure[0];
      const cellSettingInfo = cellStructure[1];
      const cellSettingUIType = cellStructure[2];
      that.cellSettingDeployStatus = cellStructure[3];

      UWA.createElement('p', {
        text: label,
        'class': ''
      }).inject(cellSettingLabel);

      CommonUIUtil.buildPopoverSpan(cellSettingInfo, info);

      that.editor = new WUXEditor({
        newLineMode: 'enter',
        value: that.model.get('valueFromDB')
      }).inject(cellSettingUIType);

      if (that.model.get('widthInCharNumber'))
        that.editor._myInput.setAttribute('cols', that.model.get('widthInCharNumber'));

      if (that.model.get('nbRows'))
        that.editor._myInput.setAttribute('rows', that.model.get('nbRows'));

      CommonUIUtil.buildDeployStsCell(that.model.get('deployStatus')).inject(that.cellSettingDeployStatus);

      cellSettingLabel.inject(that.container);
      cellSettingInfo.inject(that.container);
      cellSettingUIType.inject(that.container);
      that.cellSettingDeployStatus.inject(that.container);

      that.editor.addEventListener('blur', function () {
        that.model.set('value', that.editor.value);
      });

      return that;
    },

  });

  return editorView;
});

define('DS/ENOXCADAdminSettingUI/utils/FileExchangeUIBuilder', [
    'UWA/Core',
    'DS/Utilities/Dom',
    'DS/ENOXCADAdminSettingUI/utils/FileExchangeConfig',
    'DS/ENOXCADAdminSettingUI/utils/AlertMessage',
    'i18n!DS/ENOXCADAdminSettingUI/assets/nls/AdminSetting'
    ], function(
	    UWA,
	    DomUtils,
	    FileExchangeConfig,
	    AlertMessage,
	    AdminSettingNLS
    ) {

    'use strict';
    
    function ExchangeUIBuilder() {
	if (typeof ExchangeUIBuilder.instance === 'object') return ExchangeUIBuilder.instance;
	ExchangeUIBuilder.instance = this;
	return this;
    };

    /*
     * File picker event handler
     */
    function filePickerHandler(model, file) {
	model.set('viewController', 'FilePickerStart');
	let fileExtension = file.name.split('.')[1];
	let isValidExtension = (model._attributes.validExtns!=undefined) ? (model._attributes.validExtns.some(obj=> obj.toLowerCase() === fileExtension.toLowerCase())) : true;
	if(isValidExtension) {
	    var reader = new FileReader();
	    reader.onload = function(ev) {
		crypto.subtle.digest('SHA-256', ev.target.result).then(hashBuffer => {
		    const hashArray = Array.from(new Uint8Array(hashBuffer));
		    const hashHex = hashArray
		    .map(bytes => bytes.toString(16).padStart(2, '0'))
		    .join('');

		    let valueModel = model.get('referenceData');

		    let value = {
			    "phid": valueModel['phid'],
			    "cestamp": valueModel['cestamp'],
			    "filename": file.name,
			    'urltarget' : valueModel['urltarget'],
			    "filechecksum": hashHex,
			    "file": file
		    };
		    model.set('referenceData', value);
		    model.set('viewController', 'FilePickerEnd');
		}).catch(ex => console.error(ex));
	    };
	    reader.onerror = function(err) {
		console.error("Failed to read file", err);
	    }
	    reader.readAsArrayBuffer(file);
	} else {
	    //warning alert
	    AlertMessage.add({
		className: 'warning',
		message: AdminSettingNLS.FileExchange['Warning']
	    });
	}
    }

    /*
     * Line Editor Compute Symbol
     */
    ExchangeUIBuilder.prototype.createLineEditorSign = function(lineEditor) {
	lineEditor.elements._sign = UWA.createElement('div', { 'class': 'wux-controls-lineeditor-sign' });
	lineEditor.elements._sign.inject(lineEditor.elements.container);

	lineEditor.elements._statusCompute = UWA.createElement('div', { 'class': 'wux-controls-lineeditor-statuscompute' });
	lineEditor.elements._statusCompute.hide();
	lineEditor.elements._statusCompute.inject(lineEditor.elements._sign);
	DomUtils.generateIcon('compute wux-ui-3ds-spin', { target: lineEditor.elements._statusCompute });

	lineEditor.elements._statusOK = UWA.createElement('div', { 'class': 'wux-controls-lineeditor-statusok' });
	lineEditor.elements._statusOK.hide();
	lineEditor.elements._statusOK.inject(lineEditor.elements._sign);
	DomUtils.generateIcon('status-ok', { target: lineEditor.elements._statusOK });

	lineEditor.elements._statusKO = UWA.createElement('div', { 'class': 'wux-controls-lineeditor-statusko' });
	lineEditor.elements._statusKO.hide();
	lineEditor.elements._statusKO.inject(lineEditor.elements._sign);
	DomUtils.generateIcon('status-ko', { target: lineEditor.elements._statusKO });
    }

    /*
     * control line Editor Symbol
     */
    ExchangeUIBuilder.prototype.hideAllSignStatus = function(lineEditor) {
	lineEditor._myInput.style.removeProperty('padding-left');
	lineEditor.elements._statusCompute.hide();
	lineEditor.elements._statusOK.hide();
	lineEditor.elements._statusKO.hide();
    }

    /*
     * File Chooser Handler
     */
    ExchangeUIBuilder.prototype.openFilePicker = function(model) {
	let isODTInfra = widget.getValue("isODTInfra")!=undefined ? widget.getValue("isODTInfra") : false;
	if(isODTInfra) {
	    let odtFile = new File(['ODT_Upload'], 'ODT_Upload.sldasm');
	    filePickerHandler(model, odtFile);
	} else {
	    let fileInput = UWA.createElement('input', {
		class: 'fileexchangeutil-input-file',
		type: 'file',
		multiple: false,
		styles: {
		    display: 'none'
		},
		events: {
		    change: function (event) {
			filePickerHandler(model, event.target.files[0]);
		    }
		}
	    });
	    fileInput.click();
	}
    }

    /*
     * Upload File Action
     */
    ExchangeUIBuilder.prototype.uploadAction = async function (model) {
	model.set('viewController', 'UploadStart');
	let valueModel = model.get('referenceData');
	let _fileName = valueModel['filename'];
	try {
	    let csrfToken = await FileExchangeConfig.getCSRFToken();
	    let checkinTicket = await FileExchangeConfig.getCheckinTicket(csrfToken.csrf.value);
	    let checkinReceipt = await FileExchangeConfig.fcsCheckin(checkinTicket,valueModel['file']);
	    let creationResult = await FileExchangeConfig.fileCreation(csrfToken.csrf.value,
		    checkinReceipt, _fileName, valueModel['filechecksum'],
		    valueModel['phid'], valueModel['cestamp'],
		    model._attributes.targetName, valueModel['urltarget']);

	    let value = {
		    "phid": creationResult.member[0].id,
		    "cestamp": creationResult.member[0].cestamp,
		    "filename": _fileName,
		    'urltarget' : valueModel['urltarget'],
		    "filechecksum": valueModel['filechecksum'],
		    "file": valueModel['file']
	    };
	    model.set('referenceData', value);

	    let valueArray = [
		creationResult.member[0].type,
		creationResult.member[0].name,
		creationResult.member[0].revision
		];
	    model.set('value', valueArray.toString());

	    let payLoad = {
		    changedModels: [model],
		    integrationName: integrationName
	    };
	    await FileExchangeConfig.updateGCOParam(payLoad);

	    model.set('viewController', 'UploadOK');
	    //success alert with filename
	    AlertMessage.add({
		className: 'success',
		message: `"${_fileName}" ${AdminSettingNLS.FileExchange["Upload.Success"]}`
	    });
	} catch(error) {
	    model.set('viewController', 'UploadKO');
	    //error alert
	    AlertMessage.add({
		className: 'error',
		message: `${AdminSettingNLS.FileExchange["Upload.Error"]} "${_fileName}"`
	    });
	    console.error(error);
	}
    }

    /*
     * Donwload File Action
     */
    ExchangeUIBuilder.prototype.downloadAction = async function(model) {
	let valueModel = model.get('referenceData');
	let _fileName = valueModel['filename'];
	try {
	    let csrfToken = await FileExchangeConfig.getCSRFToken();
	    let dwnLoadTicket = await FileExchangeConfig.getDownloadTicket(csrfToken.csrf.value, valueModel['phid'], valueModel['urltarget']);
	    await FileExchangeConfig.fcsFileCheckout(dwnLoadTicket);
	    //success alert with filename
	    AlertMessage.add({
		className: 'success',
		message: `"${_fileName}" ${AdminSettingNLS.FileExchange["Download.Success"]}` 
		    //${fileDownload} file downloaded successfully`
	    });

	} catch(error) {
	    //error alert
	    AlertMessage.add({
		className: 'error',
		message: `${AdminSettingNLS.FileExchange["Download.Error"]} "${_fileName}"`
	    });
	    console.error(error);
	}
    }

    return new ExchangeUIBuilder();
});

/* global define, integrationName, adminSettingNLS */

define('DS/ENOXCADAdminSettingUI/utils/GCOUtil', [
  'DS/ENOXCADAdminSettingUI/utils/URLHandler',
  'DS/ENOXCADAdminSettingUI/utils/AJAXUtil'
], function (
  URLHandler,
  AJAXUtil
) {

  'use strict';

  var gcoUtil = {

    // to get GCO object information
    getGCOTypeNameRevision: function (integGCOName) {

      return new Promise((resolve, reject) => {

        let paramsJSON = {
          integGCOName: integGCOName
        };

        const paramsJSONString = encodeURI(JSON.stringify(paramsJSON));

        const url = URLHandler.getURL() +
          '/resources/xcadsettings/services/getGCOInfo?paramsJSONString=' +
          paramsJSONString + '&tenant=' + URLHandler.getTenant();

        AJAXUtil.getFromServer(url, 'GET').then(response => {

          console.log('Response from getGCOInfo web service:', response);
          return resolve(response);

        }).catch(error => {

          console.error('Failure in getGCOInfo web service:', error);
          return reject(adminSettingNLS.getGCOInfoFailureMessage);

        });
      });
    },

    // to get attribute values from GCO object
    getAttributeValuesFromGCO: function (allJSONData) {

      return new Promise((resolve, reject) => {

        let paramsJSON = {
          allJSONData: allJSONData,
          integrationName: integrationName
        };

        const url = URLHandler.getURL() +
          '/resources/xcadsettings/services/getValues?tenant=' + URLHandler.getTenant();

        AJAXUtil.getFromServer(url, 'POST', JSON.stringify(paramsJSON)).then(response => {

          console.log('Response from getValues web service:', response);

          for (let resObj of response) {
            for (let dataObj of allJSONData) {
              if (dataObj.id === resObj.settingId) {
                dataObj.valueFromDB = resObj.attributeValue;

                if(resObj.isDeployed)
                  dataObj.deployStatus = 'Deployed';
                else
                  dataObj.deployStatus = 'NotDeployed';

                if(Object.prototype.hasOwnProperty.call(resObj, 'rangeValues')) {
                  dataObj.range = resObj.rangeValues;
                  dataObj.rangelabel = resObj.rangeLabels;
                }
              }
            }
          }

          return resolve(allJSONData);

        }).catch(error => {

          console.error('Failure in getValues web service:', error);
          return reject(adminSettingNLS.getValuesFailureMessage);

        });

      });
    }
  }

  return gcoUtil;
});

/* global define, UWA, changedModels:writable, integrationNLS, iefNLS */

define('DS/ENOXCADAdminSettingUI/views/ComboBoxView', [
  'UWA/Class/View',
  'DS/Controls/ComboBox',
  'DS/ENOXCADAdminSettingUI/utils/CommonUIUtil'
], function (
  View,
  WUXComboBox,
  CommonUIUtil
) {

  var comboBoxView = View.extend({

    tagName: 'tr',

    setup: function () {
      const that = this;
      that.listenTo(that.model, 'onChange:value', that.valueOnChangeHandler);
      that.listenTo(that.model, 'onChange:deployStatus', that.deployStatusOnChangeHandler);
    },

    // 'value' on change handler
    valueOnChangeHandler: function (model, options) {
      const that = this;
      console.log('options: ', options);

      that.addModelToChangedModels(model);
      model.set('deployStatus', 'NotDeployed');
    },

    // to add current model to changedModels array
    addModelToChangedModels: function (model) {
      if (changedModels.includes(model)) {
        changedModels = changedModels.filter(item => item !== model)
      }
      changedModels.push(model);
    },

    // 'deployStatus' on change handler
    deployStatusOnChangeHandler: function (model, options) {
      const that = this;
      that.cellSettingDeployStatus.innerHTML = '';
      CommonUIUtil.buildDeployStsCell(options).inject(that.cellSettingDeployStatus);
    },

    // to add combobox row
    render: function () {

      const that = this;
      let label, info,
        labelItems = [],
        rangeLables = that.model.get('rangelabel');

      if (that.model.get('isIEFSetting')) {
        label = iefNLS[that.model.get('label')];
        info = iefNLS[that.model.get('info')];

        if (that.model.get('mode') === 'basic') {
          for (let i = 0; i < rangeLables.length; i++)
            labelItems.push(iefNLS[rangeLables[i]]);
        } else {
          labelItems = rangeLables;
        }
      } else {
        label = integrationNLS[that.model.get('label')];
        info = integrationNLS[that.model.get('info')];

        if (that.model.get('mode') === 'basic') {
          for (let i = 0; i < rangeLables.length; i++)
            labelItems.push(integrationNLS[rangeLables[i]]);
        } else {
          labelItems = rangeLables;
        }
      }

      const cellStructure = CommonUIUtil.getCellStructure();
      const cellSettingLabel = cellStructure[0];
      const cellSettingInfo = cellStructure[1];
      const cellSettingUIType = cellStructure[2];
      that.cellSettingDeployStatus = cellStructure[3];

      UWA.createElement('p', {
        text: label,
        'class': ''
      }).inject(cellSettingLabel);

      CommonUIUtil.buildPopoverSpan(cellSettingInfo, info);

      const ranges = that.model.get('range');
      let elementsList = [];

      for (let i = 0; i < ranges.length; i++) {
        elementsList.push({
          labelItem: labelItems[i],
          valueItem: ranges[i]
        });
      }

      const comboBox = new WUXComboBox({
        elementsList: elementsList,
        enableSearchFlag: false,
        actionOnClickFlag: false,
        value: that.model.get('valueFromDB')
      }).inject(cellSettingUIType);

      if(that.model.get('popupWidth'))
        comboBox.elements.container.style.width = that.model.get('popupWidth'); // in px or %

      CommonUIUtil.buildDeployStsCell(that.model.get('deployStatus')).inject(that.cellSettingDeployStatus);

      cellSettingLabel.inject(that.container);
      cellSettingInfo.inject(that.container);
      cellSettingUIType.inject(that.container);
      that.cellSettingDeployStatus.inject(that.container);

      comboBox.addEventListener('change', function () {
        that.model.set('value', comboBox.value);
      });

      return that;
    },

  });

  return comboBoxView;

});

define('DS/ENOXCADAdminSettingUI/views/FileExchangeView', [
    'UWA/Class/View',
    'DS/UIKIT/Mask',
    'DS/Controls/LineEditor',
    'DS/Controls/Button',
    'DS/Controls/TooltipModel',
    'DS/ENOXCADAdminSettingUI/utils/FileExchangeUIBuilder',
    'DS/ENOXCADAdminSettingUI/utils/CommonUIUtil',
    'text!DS/ENOXCADAdminSettingUI/assets/FileExchangeSetting.json',
    'i18n!DS/ENOXCADAdminSettingUI/assets/nls/AdminSetting'
    ], function (
	    View,
	    Mask,
	    WUXLineEditor,
	    WUXButton,
	    WUXTooltipModel,
	    FileExchangeUIBuilder,
	    CommonUIUtil,
	    FileExchangeSettingText,
	    AdminSettingNLS
    ) {

    const FILEPICKER_BUTTON = 'wux-tweakers-button';

    var fileExchangeView = View.extend({

	setup: function () {
	    const that = this;
	    that.listenTo(that.model, 'onChange:viewController', that.viewController);
	},

	// view controller
	viewController: function (model, options) {
	    var that = this;

	    function controlElements(isCompute) {
		if(isCompute) {
		    that.lineEditor._myInput.style.paddingLeft = '21px';
		    that.lineEditor.elements._statusCompute.show();
		    that.btnUploadFile.disabled = true;
		    that.btnBrowseFile.disabled = true;
		    that.btnDownloadFile.disabled = true;
		} else {
		    that.lineEditor.elements._statusCompute.hide();
		    that.btnBrowseFile.disabled = false;
		    that.btnDownloadFile.disabled = false;
		}
	    }

	    switch(options) {
	    case "FilePickerStart" :
		FileExchangeUIBuilder.hideAllSignStatus(that.lineEditor);
		break;
	    case "FilePickerEnd" :
		let fileName = model.get('referenceData')['filename'];
		that.lineEditor.getContent().getChildren()[0].value = fileName;
		that.lineEditor.tooltipInfos.shortHelp = fileName;
		that.btnUploadFile.disabled = false;
		break;
	    case "UploadStart" :
		FileExchangeUIBuilder.hideAllSignStatus(that.lineEditor);
		controlElements(true);
		break;
	    case "UploadOK" :
		that.lineEditor.elements._statusOK.show();
		controlElements(false);
		break;
	    case "UploadKO" :
		that.lineEditor.elements._statusKO.show();
		controlElements(false);
		break;
	    }
	},

	// to render file exchange view
	render: function () {

	    const that = this;
	    let label, info, nlsUploadBtn, nlsDownloadBtn;

	    label = (that.model.get('isIEFSetting')!=undefined && iefNLS[that.model.get('label')]!=undefined) 
	    ? iefNLS[that.model.get('label')] : integrationNLS['SLWToolBoxLabel'];

	    info = (that.model.get('isIEFSetting')!=undefined && iefNLS[that.model.get('info')]!=undefined) 
	    ? iefNLS[that.model.get('info')] : integrationNLS['SLWToolBoxInfo'];

	    nlsUploadBtn = (that.model.get('isIEFSetting')!=undefined && iefNLS[that.model.get('btnUploadLabel')]!=undefined) 
	    ? iefNLS[that.model.get('btnUploadLabel')] : integrationNLS['SLWUploadLabel'];

	    nlsDownloadBtn = (that.model.get('isIEFSetting')!=undefined && iefNLS[that.model.get('btnCurrentLabel')]!=undefined) 
	    ? iefNLS[that.model.get('btnCurrentLabel')] : integrationNLS['SLWCurentLabel'];


	    const cellStructure = CommonUIUtil.getCellStructure();
	    const cellSettingLabel = cellStructure[0];
	    const cellSettingInfo = cellStructure[1];
	    const cellSettingUIType = cellStructure[2];
	    const cellSettingDeployStatus = cellStructure[3];

	    UWA.createElement('p', {
		text: label,
		'class': ''
	    }).inject(cellSettingLabel);

	    CommonUIUtil.buildPopoverSpan(cellSettingInfo, info);

	    //view creator with line-editor and buttons
	    that.createExchangeView(cellSettingUIType, nlsUploadBtn, nlsDownloadBtn);

	    CommonUIUtil.buildDeployStsCell(that.model.get('deployStatus')).inject(cellSettingDeployStatus);

	    cellSettingLabel.inject(that.container);
	    cellSettingInfo.inject(that.container);
	    cellSettingUIType.inject(that.container);
	    cellSettingDeployStatus.inject(that.container);

	    return that;
	},

	//create exchange view
	createExchangeView: function(cellSettingUIType, nlsUploadBtn, nlsDownloadBtn) {
	    var that = this;

	    let model = that.model;

	    let controlContainer = document.createElement("div");
	    controlContainer.classList.add("controlContainer");
	    cellSettingUIType.appendChild(controlContainer);


	    let urlannotation = JSON.parse(FileExchangeSettingText).filecreation
	    .map(obj=> {
		if(obj.targetupload === model._attributes.targetUpload) 
		    return obj.urlannotation
	    })[0];
	    let urlTarget = (urlannotation!=undefined) ? urlannotation : "dsxcad:Resource";

	    //create line editor to show file
	    that.lineEditor = new WUXLineEditor({
		placeholder: AdminSettingNLS.FileExchange["LineEditor.PlaceHolder"]
	    });
	    that.lineEditor.placeholder = AdminSettingNLS.FileExchange["LineEditor.PlaceHolder"];
	    that.lineEditor.tooltipInfos = new WUXTooltipModel();
	    that.lineEditor.elements.inputField.setAttribute('readonly', 'readonly');

	    controlContainer.appendChild(that.lineEditor.getContent())

	    //line editor sign status
	    FileExchangeUIBuilder.createLineEditorSign(that.lineEditor);

	    //browser file from disk
	    that.btnBrowseFile = new WUXButton({ 
		emphasize: "secondary", 
		icon:{
		    iconName:"folder-open", 
		    fontIconFamily: WUXManagedFontIcons.Font3DS, 
		    fontIconSize: "1x"
		},
		disabled: false
	    });
	    that.btnBrowseFile.tooltipInfos = new WUXTooltipModel({
		shortHelp: AdminSettingNLS.FileExchange['BrowseFile']
	    });
	    that.btnBrowseFile.elements.container.classList.add('wux-tweakers-button-browsefile');
	    controlContainer.appendChild(that.btnBrowseFile.getContent());

	    //upload file to dos
	    that.btnUploadFile = new WUXButton({ 
		emphasize: "primary", 
		icon:{
		    iconName:"upload", 
		    fontIconFamily: WUXManagedFontIcons.Font3DS, 
		    fontIconSize: "1x"
		},
		disabled: true
	    });
	    that.btnUploadFile.tooltipInfos = new WUXTooltipModel({
		shortHelp: nlsUploadBtn
	    });
	    that.btnUploadFile.elements.container.classList.add(FILEPICKER_BUTTON);
	    controlContainer.appendChild(that.btnUploadFile.getContent());

	    //download file from dos
	    that.btnDownloadFile = new WUXButton({
		emphasize: "secondary", 
		icon:{
		    iconName:"download", 
		    fontIconFamily: WUXManagedFontIcons.Font3DS, 
		    fontIconSize: "1x"
		},
		disabled: true
	    });
	    that.btnDownloadFile.tooltipInfos = new WUXTooltipModel({
		shortHelp: nlsDownloadBtn
	    });
	    that.btnDownloadFile.elements.container.classList.add(FILEPICKER_BUTTON);
	    controlContainer.appendChild(that.btnDownloadFile.getContent());

	    //Button Event handling
	    that.btnBrowseFile.addEventListener("buttonclick", function () { //file chooser event
		FileExchangeUIBuilder.openFilePicker(that.model);
	    });

	    that.btnUploadFile.addEventListener("buttonclick", function () { //upload file event
		FileExchangeUIBuilder.uploadAction(that.model);
	    });

	    that.btnDownloadFile.addEventListener("buttonclick", function () { //download file event
		FileExchangeUIBuilder.downloadAction(that.model);
	    });

	    let phid = "",
	    cestamp = "",
	    filename = "";

	    //fill line editor
	    if(model.get('valueFromDB')!=undefined && model.get('valueFromDB')!="") {
		let valueModel = model.get('referenceData');

		that.lineEditor.value = valueModel['filename'];
		that.lineEditor.tooltipInfos.shortHelp = valueModel['filename'];

		that.btnDownloadFile.disabled = false;

		phid = valueModel['phid'];
		cestamp = valueModel['cestamp'];
		filename = valueModel['filename'];

	    }

	    let value = {
		    "phid": phid,
		    "cestamp": cestamp,
		    "filename": filename,
		    'urltarget' : urlTarget
	    };
	    model.set('referenceData', value);
	},
    });

    return fileExchangeView;
});

/* global define, UWA, changedModels:writable, integrationNLS, iefNLS */

define('DS/ENOXCADAdminSettingUI/views/CheckBoxView', [
  'UWA/Class/View',
  'DS/Controls/Toggle',
  'DS/Controls/ButtonGroup',
  'DS/ENOXCADAdminSettingUI/utils/CommonUIUtil'
], function (
  View,
  WUXToggle,
  WUXButtonGroup,
  CommonUIUtil
) {

  var checkBoxView = View.extend({

    tagName: 'tr',

    setup: function () {
      const that = this;
      that.listenTo(that.model, 'onChange:value', that.valueOnChangeHandler);
      that.listenTo(that.model, 'onChange:deployStatus', that.deployStatusOnChangeHandler);
    },

    // 'value' on change handler
    valueOnChangeHandler: function (model, options) {
      const that = this;
      console.log('options: ', options);

      that.addModelToChangedModels(model);
      model.set('deployStatus', 'NotDeployed');
    },

    // to add current model to changedModels array
    addModelToChangedModels: function (model) {
      if (changedModels.includes(model)) {
        changedModels = changedModels.filter(item => item !== model)
      }
      changedModels.push(model);
    },

    // 'deployStatus' on change handler
    deployStatusOnChangeHandler: function(model, options) {
      const that = this;
      that.cellSettingDeployStatus.innerHTML = '';
      CommonUIUtil.buildDeployStsCell(options).inject(that.cellSettingDeployStatus);
    },

    // to add checkbox row
    render: function () {

      const that = this;
      let label, info, labelItems = [],
        rangeLables = that.model.get('rangelabel');

      if (that.model.get('isIEFSetting')) {
        label = iefNLS[that.model.get('label')];
        info = iefNLS[that.model.get('info')];
        for (let i = 0; i < rangeLables.length; i++)
          labelItems.push(iefNLS[rangeLables[i]]);
      } else {
        label = integrationNLS[that.model.get('label')];
        info = integrationNLS[that.model.get('info')];
        for (let i = 0; i < rangeLables.length; i++)
          labelItems.push(integrationNLS[rangeLables[i]]);
      }

      const cellStructure = CommonUIUtil.getCellStructure();
      const cellSettingLabel = cellStructure[0];
      const cellSettingInfo = cellStructure[1];
      const cellSettingUIType = cellStructure[2];
      that.cellSettingDeployStatus = cellStructure[3];

      UWA.createElement('p', {
        text: label,
        'class': ''
      }).inject(cellSettingLabel);

      CommonUIUtil.buildPopoverSpan(cellSettingInfo, info);

      const buttonGroup = new WUXButtonGroup({
        type: 'checkbox'
      }).inject(cellSettingUIType);

      const valuesFromDB = that.model.get('valueFromDB').split(',');

      const ranges = that.model.get('range');

      for (let i = 0; i < ranges.length; i++) {
        const toggle = new WUXToggle({
          type: 'checkbox',
          label: labelItems[i],
          value: ranges[i],
          checkFlag: valuesFromDB.includes(ranges[i]) ? true : false
        });
        buttonGroup.addChild(toggle);
      }

      buttonGroup.elements.container.style.display = 'inline-block';

      CommonUIUtil.buildDeployStsCell(that.model.get('deployStatus')).inject(that.cellSettingDeployStatus);

      cellSettingLabel.inject(that.container);
      cellSettingInfo.inject(that.container);
      cellSettingUIType.inject(that.container);
      that.cellSettingDeployStatus.inject(that.container);

      buttonGroup.addEventListener('change', function () {
        that.model.set('value', buttonGroup.value.toString());
      });

      return that;
    },
  });

  return checkBoxView;

});

define('DS/ENOXCADAdminSettingUI/helper/ExchangeViewHelper', [
    'UWA/Core',
    'DS/ENOXCADAdminSettingUI/views/FileExchangeView',
    'DS/ENOXCADAdminSettingUI/utils/FileExchangeConfig'
    ], function(
	    UWA,
	    FileExchangeView,
	    FileExchangeConfig
    ) {

    'use strict';

    function ExchangeViewHelper() {
	if (typeof ExchangeViewHelper.instance === 'object') return ExchangeViewHelper.instance;
	ExchangeViewHelper.instance = this;
	return this;
    };

    /*
     * Line Editor Compute Symbol
     */
    ExchangeViewHelper.prototype.buildContainer = async function(fileExchangeModel, settingsTBody) {

	async function process_SecurityContext(model) {
	    return new Promise((resolve,reject) => {
		FileExchangeConfig.getSecurityContext()
		.then(response => { 
		    FileExchangeConfig.setSecurityContext(response.SecurityContext);
		})
		.catch(err => {
		    console.error(err);
		})
		.finally(() => {
		    resolve({
			"model":model
		    });
		});
	    });
	}

	async function process_ValidateTNR(object) {
	    return new Promise((resolve,reject) => {
		let model = object['model'];
		object['phid'] = "";
		if(model.get('valueFromDB')!=undefined && model.get('valueFromDB')!="") {
		    let valueArr = model.get('valueFromDB').split(",");
		    let payLoad = {
			    "type":valueArr[0],
			    "name":valueArr[1],
			    "revision":valueArr[2]
		    };

		    FileExchangeConfig.validateTNR(payLoad)
		    .then((response) => {
			if(Object.entries(response).length>0) {
			    object['phid'] = response['phid'];
			}
		    })
		    .catch(err => {
			console.error(err);
		    })
		    .finally(() => {
			resolve(object)
		    });
		} else {
		    resolve(object);
		}
	    });
	}

	async function process_csrfToken(object) {
	    return new Promise((resolve,reject) => {
		object['csrfToken'] = "";
		if(object['phid']!="") {
		    FileExchangeConfig.getCSRFToken()
		    .then((response) => {
			object['csrfToken'] = response.csrf.value;
		    })
		    .catch(err => {
			console.error(err);
		    })
		    .finally(() => {
			resolve(object);
		    });
		} else {
		    resolve(object);
		}

	    });
	}

	async function process_XcadDetails(object) {
	    return new Promise((resolve,reject) => {
		let model = object['model'];
		if(object['phid']!="") {
		    FileExchangeConfig.getXCADDetails(object['phid'], object['csrfToken'])
		    .then((response) => {
			let valueModel = {
				"phid": response.member[0].id,
				"cestamp": response.member[0].cestamp,
				"filename": response.member[0]['dsxcad:AuthoringFile'].filename
			};
			model.set('referenceData', valueModel);
		    })
		    .catch(err =>{
			console.error(err);
		    })
		    .finally(() => {
			resolve(model);
		    });
		} else {
		    resolve(model);
		}
	    });
	}

	function process_ExchangeView(model) {
	    model.set('viewController', '');
	    const fileExchangeRow = UWA.createElement("tr");
	    let fileExchangeView = new FileExchangeView({
		id: model.id,
		className: "fileExchangeRowClass",
		model: model,
		container: fileExchangeRow,
	    });
	    fileExchangeView.render().container.inject(settingsTBody);
	}

	try {
	    let sCResponse = await process_SecurityContext(fileExchangeModel);
	    let vResponse = await process_ValidateTNR(sCResponse);
	    let csrfResponse = await process_csrfToken(vResponse);
	    let model = await process_XcadDetails(csrfResponse);

	    process_ExchangeView(model);
	} catch (err) {
	    console.error(err);
	}
    }

    return new ExchangeViewHelper();
});

/* global define, UWA, widget, iefNLS, integrationNLS*/

define("DS/ENOXCADAdminSettingUI/views/SettingsView", [
    "UWA/Class/View",
    "DS/ENOXCADAdminSettingUI/models/ToggleModel",
    "DS/ENOXCADAdminSettingUI/views/ToggleView",
    "DS/ENOXCADAdminSettingUI/models/ComboBoxModel",
    "DS/ENOXCADAdminSettingUI/views/ComboBoxView",
    "DS/ENOXCADAdminSettingUI/models/CheckBoxModel",
    "DS/ENOXCADAdminSettingUI/views/CheckBoxView",
    "DS/ENOXCADAdminSettingUI/models/LineEditorModel",
    "DS/ENOXCADAdminSettingUI/views/LineEditorView",
    "DS/ENOXCADAdminSettingUI/models/EditorModel",
    "DS/ENOXCADAdminSettingUI/views/EditorView",
    'DS/ENOXCADAdminSettingUI/models/FileExchangeModel',
    "DS/ENOXCADAdminSettingUI/helper/ExchangeViewHelper",
    "DS/ENOXCADAdminSettingUI/utils/CommonUIUtil",
    "DS/ENOXCADAdminSettingUI/utils/AlertMessage",
    "i18n!DS/ENOXCADAdminSettingUI/assets/nls/AdminSetting",
    ], function (
	    View,
	    ToggleModel,
	    ToggleView,
	    ComboBoxModel,
	    ComboBoxView,
	    CheckBoxModel,
	    CheckBoxView,
	    LineEditorModel,
	    LineEditorView,
	    EditorModel,
	    EditorView,
	    ExchangeModel,
	    ExchangeHelper,
	    CommonUIUtil,
	    AlertMessage,
	    AdminSettingNLS
    ) {

    'use strict';

    var count=0;
    var settingsView = View.extend({

	render: function (allJSONDataObjs) {

	    const that = this;

	    that.setContainerHeight();

	    // to set height of container on resize of widget
	    widget.addEvent('onResize', function () {
		let hght = widget.getViewportDimensions().height;
		that.container.setStyle('height', (hght - 210) + 'px');
	    });

	    let groupTable = {},
	    settingsTBody, accordTitle;

	    for (let jsonObj of allJSONDataObjs) {

		if (Object.prototype.hasOwnProperty.call(jsonObj, 'valueFromDB')) {

		    if (Object.prototype.hasOwnProperty.call(groupTable, jsonObj.groupName)) {
			settingsTBody = groupTable[jsonObj.groupName];
		    } else {

			const settingsTable = UWA.createElement('table', {
			    'class': 'adminSetttingsTable table table-condensed',
			    'id': jsonObj.groupName + 'Table'
			}).inject(that.container);

			if (Object.prototype.hasOwnProperty.call(jsonObj, 'isIEFSetting'))
			    accordTitle = iefNLS[jsonObj.groupName];
			else
			    accordTitle = integrationNLS[jsonObj.groupName];

			const accord = CommonUIUtil.createFamilyUIKITAccordion(settingsTable, jsonObj.groupName, accordTitle);
			accord.inject(that.container);

			settingsTBody = UWA.createElement('tbody', {
			    'class': 'fparamtbody',
			    'id': jsonObj.groupName + 'Body'
			}).inject(settingsTable);

			var tableHeading = CommonUIUtil.buildSettingsTableHeading();
			tableHeading.inject(settingsTBody);

			groupTable[jsonObj.groupName] = settingsTBody;
		    }

		    switch (jsonObj.uitype) {
		    case 'switch':
			that.addToggle(jsonObj, settingsTBody);
			break;
		    case 'combobox':
			that.addComboBox(jsonObj, settingsTBody);
			break;
		    case 'checkbox':
			that.addCheckBox(jsonObj, settingsTBody);
			break;
		    case 'textbox':
			that.addLineEditor(jsonObj, settingsTBody);
			break;
		    case 'multilineTextbox':
			that.addEditor(jsonObj, settingsTBody);
			break;
		    case 'fileupload':
			that.addFileExchange(jsonObj, settingsTBody);
			break;
		    default:
			break;
		    }
		}
	    }

	    return that;
	},

	// to make a binary choice, i.e. a choice between one of two possible mutually exclusive option
	addToggle: function (data, settingsTBody) {

	    const toggleRow = UWA.createElement('tr');

	    let toggleModel = new ToggleModel(data);
	    let toggleView = new ToggleView({
		id: toggleModel.id,
		className: 'toggleRowClass',
		model: toggleModel,
		container: toggleRow
	    });

	    toggleView.render().container.inject(settingsTBody);
	},

	// to select an item among a list of possible items.
	addComboBox: function (data, settingsTBody) {

	    const comboBoxRow = UWA.createElement('tr');

	    let comboBoxModel = new ComboBoxModel(data);
	    let comboBoxView = new ComboBoxView({
		id: comboBoxModel.id,
		className: 'comboBoxRowClass',
		model: comboBoxModel,
		container: comboBoxRow
	    });

	    comboBoxView.render().container.inject(settingsTBody);
	},

	// to choose multiple options at the same time
	addCheckBox: function (data, settingsTBody) {

	    const checkBoxRow = UWA.createElement('tr');

	    let checkBoxModel = new CheckBoxModel(data);
	    let checkBoxView = new CheckBoxView({
		id: checkBoxModel.id,
		className: 'checkBoxRowClass',
		model: checkBoxModel,
		container: checkBoxRow
	    });

	    checkBoxView.render().container.inject(settingsTBody);
	},

	// to enter and edit a single line of plain text
	addLineEditor: function (data, settingsTBody) {

	    const lineEditorRow = UWA.createElement('tr');

	    let lineEditorModel = new LineEditorModel(data);
	    let lineEditorView = new LineEditorView({
		id: lineEditorModel.id,
		className: 'lineEditorRowClass',
		model: lineEditorModel,
		container: lineEditorRow
	    });

	    lineEditorView.render().container.inject(settingsTBody);
	},

	// to enter and edit multiple lines of plain text.
	addEditor: function (data, settingsTBody) {

	    const editorRow = UWA.createElement('tr');

	    let editorModel = new EditorModel(data);
	    let editorView = new EditorView({
		id: editorModel.id,
		className: 'editorRowClass',
		model: editorModel,
		container: editorRow
	    });

	    editorView.render().container.inject(settingsTBody);
	},

	//to upload and download file
	addFileExchange: function (data, settingsTBody) {
	    if (data.targetName == undefined 
		    || data.targetName == "" 
			|| typeof (data.targetName) != "string") {
		count++;
		if(count==1) {
		    AlertMessage.add({
			className: "error",
			message: AdminSettingNLS.FileExchange["targetName.Error"]
		    });
		}
	    } else {
		let fileExchangeModel = new ExchangeModel(data);
		ExchangeHelper.buildContainer(fileExchangeModel, settingsTBody);
	    }
	},

	destroy: function () {
	    this._parent();
	},

	// to set initial height of container
	setContainerHeight: function () {
	    let hght = widget.getViewportDimensions().height;
	    this.container.setStyle("height", hght - 210 + "px");
	},
    });

    return settingsView;

});

/* global define, UWA*/
/* exported changedModels, integrationNLS, iefNLS, adminSettingNLS */

var changedModels = [];
var integrationNLS, iefNLS, adminSettingNLS, integrationName, integCadOrigin;

define('DS/ENOXCADAdminSettingUI/views/XCADAdminSettingView', [
  'UWA/Class/View',
  'DS/UIKIT/Mask',
  'DS/UIKIT/Scroller',
  'DS/ENOXCADAdminSettingUI/utils/AlertMessage',
  'DS/ENOXCADAdminSettingUI/utils/URLHandler',
  'DS/ENOXCADAdminSettingUI/utils/GCOUtil',
  'DS/ENOXCADAdminSettingUI/utils/JSONUtil',
  'DS/ENOXCADAdminSettingUI/utils/ApplyResetToolbar',
  'DS/ENOXCADAdminSettingUI/utils/AJAXUtil',
  'DS/ENOXCADAdminSettingUI/views/SettingsView',
  'i18n!DS/ENOXCADAdminSettingUI/assets/nls/AdminSetting',
  'i18n!DS/ENOXCADAdminSettingUI/assets/nls/IEFUPS',
  'css!DS/ENOXCADAdminSettingUI/ENOXCADAdminSettingUI'
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
  SettingsView,
  AdminSettingNLS,
  IEFUPSNLS
) {

  'use strict';

  let pageJSONData = [];
  let gcoInfo = {};

  let xcadAdminSettingView = View.extend({

    setup: function (options) {
      this.integGCOName = options.integGCOName;
      this.urlInfo = options.urlInfo;
      this.settingsView = null;
      this.applyResetDiv = null;
    },

    render: function () {

      const that = this;
      iefNLS = IEFUPSNLS;
      adminSettingNLS = AdminSettingNLS;

      Mask.mask(that.container);

      that.addIntroDiv();

      URLHandler.init(this.urlInfo.baseUrl, this.urlInfo.tenant);

      GCOUtil.getGCOTypeNameRevision(that.integGCOName).then(response => {
        gcoInfo = response;
        integrationName = gcoInfo.integrationName;
        integCadOrigin = gcoInfo.integCadOrigin;

        JSONUtil.getAllJSONData().then(allJSONData => {

          pageJSONData = allJSONData;

          if (allJSONData.length > 0) {
            that.renderSettingsView(allJSONData).then(() => {
              that.addApplyResetToolbar();
              Mask.unmask(that.container);
            }).catch(() => {
              Mask.unmask(that.container);
            });
          } else {
            Mask.unmask(that.container);
          }

        }).catch(error => {
          console.log(error);
          that.addErrorDiv(error);
          Mask.unmask(that.container);
        });

      }).catch(error => {
        console.log(error);
        that.addErrorDiv(error);
        Mask.unmask(that.container);
      });

      return this;
    },

    // to add introduction of Settings tab
    addIntroDiv: function () {

      const introDiv = UWA.createElement('div', {
        'class': 'information'
      }).inject(this.container);

      UWA.createElement('br', {}).inject(introDiv);

      UWA.createElement('p', {
        text: adminSettingNLS.intro,
        'class': 'font-3dslight'
      }).inject(introDiv);

    },

    // to display error message while initialization of Settings tab
    addErrorDiv: function (errorText) {

      const span = UWA.createElement('span', {
        'class': 'badge badge-error',
      }).inject(this.container);

      UWA.createElement('span', {
        text: errorText,
        'class': 'badge-content',
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

    // to add Settings View
    renderSettingsView: function (allJSONData) {

      return new Promise((resolve, reject) => {

        const that = this;

        GCOUtil.getAttributeValuesFromGCO(allJSONData).then(allJSONData => {

          that.settingsView = new SettingsView({
            id: 'settingsID',
            className: 'adminSettingsDivClass'
          });
          that.settingsView.render(allJSONData).container.inject(this.container);

          new Scroller({
            element: that.settingsView.container
          }).inject(that.container);

          return resolve();

        }).catch(error => {
          console.log(error);
          that.addErrorDiv(error);
          return reject();
        });
      });
    },

    // to update attribute values on click of 'Apply' button
    applyBtnOnClickHandler: function () {

      if (changedModels.length > 0) {

        const that = this;

        Mask.mask(that.container);

        let deployParams = {
          changedModels: changedModels,
          integrationName: integrationName
        }

        const url = that.urlInfo.baseUrl +
          '/resources/xcadsettings/services/deploy?tenant=' + that.urlInfo.tenant;

        AJAXUtil.getFromServer(url, 'POST', JSON.stringify(deployParams)).then(response => {

          console.log('Response from deploy web service: ', response);

          AlertMessage.add({
            className: 'success',
            message: AdminSettingNLS.applySuccessMessage
          });

          for (var changedModel of changedModels) {
            changedModel.set('deployStatus', 'Deployed');
          }

          changedModels = [];
          Mask.unmask(that.container);

        }).catch(error => {
          console.error('Failure in deploy web service: ', error);

          AlertMessage.add({
            className: 'error',
            message: AdminSettingNLS.applyFailureMessage
          });

          changedModels = [];
          Mask.unmask(that.container);
        });
      }
    },

    // to reset attribute values on click of 'Reset' button
    resetBtnOnClickHandler: function () {

      AlertMessage.add({
        className: 'success',
        message: AdminSettingNLS.resetSuccessMessage
      });

      this.resetSettingsView();

    },

    // to reset Settings View
    resetSettingsView: function () {
      Mask.mask(this.container);
      this.stopListening(this.settingsView);
      this.settingsView.destroy();
      this.settingsView = null;
      this.applyResetDiv.destroy();
      this.applyResetDiv = null;
      this.renderSettingsView(pageJSONData).then(() => {
        this.addApplyResetToolbar();
        Mask.unmask(this.container);
      }).catch(() => {
        Mask.unmask(this.container);
      });
      changedModels = [];
    },

    // to destroy Settings Tab View
    destroy: function () {

      this.stopListening(this.settingsView);
      this.settingsView.destroy();
      this.settingsView = null;

      this._parent();
    },

  });

  return xcadAdminSettingView;

});

