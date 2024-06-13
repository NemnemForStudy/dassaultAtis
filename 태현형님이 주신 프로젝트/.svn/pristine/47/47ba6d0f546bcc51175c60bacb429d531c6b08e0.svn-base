define('DS/CfgEffectivityCommands/commands/CfgAddToConfigurationRevisionCmd', [
	// 'DS/CfgEffectivityCommands/commands/CfgAddInstanceConfigurationRevisionCmd'
	'DS/CfgEffectivityCommands/commands/CfgEffCmd',
	'DS/CfgBaseUX/scripts/CfgController',
	'DS/CfgBaseUX/scripts/CfgUtility',
	'DS/CfgBaseUX/scripts/CfgDialog',
	// 'DS/CfgConfigurationRevisionUX/scripts/instanceview/CfgConfigurationRevisionVersionExplorerView',
	'DS/CfgConfigurationRevisionUX/scripts/views/instance/CfgConfigurationRevisionVersionExplorerView',
	'DS/CfgBaseUX/scripts/CfgData',
	'DS/CoreEvents/ModelEvents',
	'DS/CfgBaseUX/scripts/CfgUXEnvVariables',
	'i18n!DS/CfgBaseUX/assets/nls/CfgBaseUXNLS',
	'text!DS/CfgBaseUX/assets/CfgUXEnvVariables.json',
], function (
	CfgEffCmd,
	CfgController,
	CfgUtility,
	CfgDialog,
	CfgConfigurationRevisionVersionExplorerView,
	CfgData,
	ModelEvents,
	CfgUXEnvVariablesJS,
	CfgCommonNLS,
	CfgUXEnvVariables
) {
	'use strict';
	var CfgAddInstanceConfigurationRevision = CfgEffCmd.extend({
		destroy: function () {},
		execute: function () {
			var data = this.getData();

			if (data.selectedNodes && data.selectedNodes.length > 0) {
				this.executeAddInstanceToConfigurationRevision();
			}

			// clear CfgData
			CfgData.clear();

			// initilize Add instance to cfg rev Action Events to Model Events
			CfgData.cfgAddInsToCfgRevActionEvents = new ModelEvents();

			// subscribe for each action event
			this.subscribeAddInsToCfgRevActionEvents();
		},
		/* Following _checkSelection method is used to check some pre-reqs of the selected objects
		 *
		 * @returns
		 */
		_checkSelection: function () {
			//-- Init the selection
			this.cfgUXEnvVariablesJS = CfgUXEnvVariablesJS.getCfgUXEnvVariables();
			var flags = JSON.parse(CfgUXEnvVariables);
			// if (flags.isCRBasedOnInstanceEnabled == true) {
			if (this.cfgUXEnvVariablesJS['isCRBasedOnInstanceEnabled']) {
				this._SelectedID = '';
				var data = this.getData();
				if (data.selectedNodes.length != 0 && data.selectedNodes.length != 1) {
					this._SelectedID = data.selectedNodes[0].id || '';
					this.isRoot = data.selectedNodes[0].isRoot;
					this._setStateCmd();
					if (this.isRootSelected() == true) {
						this.disable();
						return;
					}
					if (this.areInstancesFromSameLevel() == false) {
						this.disable();
						return;
					}
					// if (this.isSelectionExceedUpperLimit() == false) { this.disable(); return; }

					return;
				}
				if (data.selectedNodes.length === 1) {
					this._SelectedID = data.selectedNodes[0].id || '';
					this.isRoot = data.selectedNodes[0].isRoot;
				}
				this._setStateCmd();
			} else {
				this.disable();
				return;
			}
		},
		/* Following isRootSelected method is used to check whether selected object is ROOT or not
		 * @returns true is selected object is root
		 */
		isRootSelected: function () {
			var data = this.getData();
			if (data.selectedNodes && data.selectedNodes.length > 0) {
				if (data.selectedNodes[0].isRoot == true) return true;
			}
		},

		/** Following method will check whether all selected instances are under same ROOT reference
		 * @returns true if under same ROOT otherwise false
		 */
		areInstancesFromSameLevel: function () {
			var data = this.getData();
			// var parentId = data.selectedNodes[0].parentID;

			return data.selectedNodes.every(function (item) {
				return item.parentID == data.selectedNodes[0].parentID;
			});
		},
		/* Following method isSelectionExceedUpperLimit is for allowing only specific no.os object selection
		 *
		 * @returns true if selection is less than 100
		 */
		/*isSelectionExceedUpperLimit: function () {
            var data = this.getData();
            // if (data.selectedNodes && data.selectedNodes.length > 0) {
            //     if (data.selectedNodes.length > 100) return false;
            //     else return true;
            // }

            return (data.selectedNodes.length > 100) ? false : true;

        },*/
		/* Following executeAddInstanceToConfigurationRevision method setup pre-reqs like populateUrl and pass required data to dialog method.
		 */
		executeAddInstanceToConfigurationRevision: function () {
			var that = this;
			var instancesList = [];
			var data = that.getData();
			// var isAllHasSameRoot = false;

			this.disable();

			if (data.selectedNodes && data.selectedNodes.length > 0) {
				data.selectedNodes.forEach(function ({ id, alias, parentID }) {
					//in function parameter we used object destructuring to get data in simpler way
					let instance = {};
					instance.instanceId = id;
					instance.name = alias;
					instance.parentId = parentID;
					instancesList.push(instance);
				});

				if (widget)
					enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
				else enoviaServerFilterWidget.tenant = 'OnPremise';

				CfgUtility.populate3DSpaceURL().then(function () {
					CfgUtility.populateSecurityContext().then(function () {
						// check whether the root product contains CR
						CfgUtility.getAllowedSemantics(instancesList[0].parentId).then(
							function (response) {
								if (
									CfgUtility.isBaselineMode(
										instancesList[0].parentId,
										response
									) &&
									CfgUtility.isFirstSemantic(
										instancesList[0].parentId,
										response
									) == false
								)
									that.createVersionExplorerView(instancesList);
								else
									CfgUtility.showwarning(
										CfgCommonNLS.CfgRevMessageAttachModel,
										'error'
									);
								that.enable();
							}
						);
						// that.createInstaceCRDialog(instancesList);
					});
				});
			}
		},
		/* Following method createInstaceCRDialog is used to create add instance to CR Dialog
		 * @param {*} instancesList :    This list is of all selected instances physical ids.
		 */
		createVersionExplorerView: function (instancesList) {
			let rootParentId = instancesList[0].parentId;

			let inputOption = {
				selectedInstanceList: instancesList,
				iRootId: rootParentId,
			};

			this.CfgConfigurationRevisionVersionExplorerViewObj =
				new CfgConfigurationRevisionVersionExplorerView(inputOption);
			this.createInstaceCRDialog();
		},
		createInstaceCRDialog: function () {
			var that = this;

			this.MainContainer = new UWA.Element('div', {
				html: this.CfgConfigurationRevisionVersionExplorerViewObj.render(),
				styles: { width: '100%', height: '100%' },
			});

			var footerbtn = [
				{
					label: 'OK',
					labelValue: CfgCommonNLS.CfgLabelOK,
					handler: function () {
						// let flag = that.CfgConfigurationRevisionVersionExplorerViewObj.saveContent();
						// if(!flag)
						that.CfgConfigurationRevisionVersionExplorerViewObj.saveContent();

						that.instanceCRDialog.closeDialog();
					},
					className: 'primary',
				},
				{
					label: 'Cancel',
					labelValue: CfgCommonNLS.CfgLabelCancel,
					handler: function () {
						that.instanceCRDialog.closeDialog();
					},
					className: 'secondary',
				},
			];

			let rootParentLabel = this.getData().selectedNodes[0].parentalias;

			var dialogOption = {
				className: '',
				title: rootParentLabel
					? `${CfgCommonNLS.CfgLabelAddInstanceToCR} - ${rootParentLabel}`
					: CfgCommonNLS.CfgLabelAddInstanceToCR,
				parent: widget.body,
				body: this.MainContainer,
				overlay: true,
				mode: 'DashboardConfigurationContext',
				closable: false,
				animate: true,
				resizable: true,
				footer: footerbtn,
				persistId: 'CfgAddInstanceToConfigRevision',
				width: 440,
				height: 490,
				minHeight: 100,
				minWidth: 370,
				style: { 'min-height': '350px' },
				dialogue: {
					header: rootParentLabel
						? `${CfgCommonNLS.CfgLabelAddInstanceToCR} - ${rootParentLabel}`
						: CfgCommonNLS.CfgLabelAddInstanceToCR,
					buttonArray: footerbtn,
					target: widget.body,
				},
			};

			this.instanceCRDialog = new CfgDialog(dialogOption);
			this.instanceCRDialog.render();

			// disable the "Ok" button when the dialog is loaded
			this.instanceCRDialog.footerButton.Ok.disabled = true;
		},

		subscribeAddInsToCfgRevActionEvents: function () {
			CfgData.cfgAddInsToCfgRevActionEvents.subscribe(
				{ event: 'enableOkButtonInInstanceCRDialog' },
				() => (this.instanceCRDialog.footerButton.Ok.disabled = false)
			);

			CfgData.cfgAddInsToCfgRevActionEvents.subscribe(
				{ event: 'disableOkButtonInInstanceCRDialog' },
				() => (this.instanceCRDialog.footerButton.Ok.disabled = true)
			);
		},
	});

	return CfgAddInstanceConfigurationRevision;
});
