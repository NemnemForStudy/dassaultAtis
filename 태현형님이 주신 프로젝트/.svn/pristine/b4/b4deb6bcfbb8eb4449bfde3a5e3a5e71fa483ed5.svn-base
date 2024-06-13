define(
	'DS/ENXDataGrid/ENXSBGridPerformanceLogs',
	
	['DS/Windows/Dialog', 'DS/Controls/Button', 'DS/Windows/ImmersiveFrame', 'i18n!DS/ENXDataGrid/assets/nls/performance'],
	
	function(WUXDialog, WUXButton, WUXImmersiveFrame, nlsPerformanceJSON) {
		var ENXSBGridPerformanceLogs = {
			getLogs: function() {
				var immersiveFrame = new WUXImmersiveFrame().inject(document.body);
				
				var textContent = '';
				
				if(typeof performanceLogs['serverLogs'] != 'undefined' && typeof performanceLogs['clientLogs'] != 'undefined') {
					var generateColumnDetails, executeJPOs, generateObjectSelects, generateObjectIds, generateColValues;
					
					performanceLogs['serverLogs'].forEach(function(dataobject) {
																	if('generateColumnDetails' == dataobject.id) {
																		generateColumnDetails = dataobject;
																	} else if('executeJPOs' == dataobject.id) {
																		executeJPOs = dataobject;
																	} else if('generateObjectSelects' == dataobject.id) {
																		generateObjectSelects = dataobject;
																	} else if('generateObjectIds' == dataobject.id) {
																		generateObjectIds = dataobject;
																	} else if('generateColumnValues' == dataobject.id) {
																		generateColValues = dataobject;
																	}
																});
					
					var noOfRows = Number(generateObjectIds.dataelements['noOfRows']);
					var noOfColumns = Number(generateColumnDetails.dataelements['noOfExpCols']) + Number(generateColumnDetails.dataelements['noOfProgCols']) + Number(generateColumnDetails.dataelements['noOfIconCols']);
					var totalTime = Number(performanceLogs['totalTime']);
					var serverTime = Number(performanceLogs['dataServerTime']);
					var clientTime = Number(performanceLogs['clientLogs']['connectorGridTime']) + Number(performanceLogs['clientLogs']['renderGridTime']);
					
					if(typeof generateColumnDetails != 'undefined' && typeof generateObjectIds != 'undefined' && typeof generateObjectSelects != 'undefined' && typeof executeJPOs != 'undefined') {
						textContent += nlsPerformanceJSON.Rows + noOfRows + '<br />';
						textContent += nlsPerformanceJSON.Columns + noOfColumns + '<br /><br />';
						
						if(typeof performanceLogs['totalTime'] != 'undefined') {
							textContent += '<b>'+nlsPerformanceJSON.TotalTime+ totalTime + '</b> (Server side: ' + serverTime + nlsPerformanceJSON.ClientSide + clientTime.toFixed(2) + ')<br />';
							textContent += '<br />';
						}
						
						textContent += '<b><u>'+nlsPerformanceJSON.ServerLogs+'</u></b><br /><br />';
						
						//textContent += nlsPerformanceJSON.TableName + generateColumnDetails.dataelements['tableName'] + '<br />';
						textContent += nlsPerformanceJSON.TableName + performanceLogs.serverLogs[5].dataelements.LastViewedTable + '<br />';
						textContent += nlsPerformanceJSON.ColExp + generateColumnDetails.dataelements['noOfExpCols'] + '<br />';
						textContent += nlsPerformanceJSON.ColProg + generateColumnDetails.dataelements['noOfProgCols'] + '<br />';
						textContent += nlsPerformanceJSON.IconCol + generateColumnDetails.dataelements['noOfIconCols'] + '<br />';
						textContent += nlsPerformanceJSON.GenerateColDetails + generateColumnDetails.dataelements['time'] + '<br /><br />';
						if(generateColumnDetails.dataelements['noOfStyleCols'] > 0) {
						textContent += nlsPerformanceJSON.NumberOfStyleColumns + generateColumnDetails.dataelements['noOfStyleCols'] + '<br />';
						textContent += nlsPerformanceJSON.TimeToGenerateStyleColumns+ generateObjectSelects.dataelements['TimeToGenerateStyleColumns'] + '<br /><br />';
						}
						
						textContent += nlsPerformanceJSON.ProgClass+ generateObjectIds.dataelements['progClass'] + '<br />';
						textContent +=nlsPerformanceJSON.ProgMethod + generateObjectIds.dataelements['progMethod'] + '<br />';
						if('undefined' != typeof generateObjectIds.dataelements['expandLevel'] && null != generateObjectIds.dataelements['expandLevel']) {
							textContent += nlsPerformanceJSON.ExpandLevel + generateObjectIds.dataelements['expandLevel'] + '<br />';
						}
						textContent += nlsPerformanceJSON.TimeTakenToRunProg + generateObjectIds.dataelements['time'] + '<br /><br />';
						
						textContent += nlsPerformanceJSON.SelectExp+ generateObjectSelects.dataelements['exp'] + '<br />';
						textContent += nlsPerformanceJSON.TimeTakenToRetExp + generateObjectSelects.dataelements['time'] + '<br /><br />';
						
						for(var jpoName in executeJPOs.dataelements) {
							textContent += nlsPerformanceJSON.TimeToRun +" '"+ jpoName.split(':')[1] +" ' "+ nlsPerformanceJSON.MethodOf +" ' "+ jpoName.split(':')[0] +" ' "+ nlsPerformanceJSON.Class + executeJPOs.dataelements[jpoName] + '<br />';
						}
						
						textContent += '<br />'+nlsPerformanceJSON.TimeToGenCols + generateColValues.dataelements['time'] + '<br /><br />';
						
						textContent += '<b><u>'+nlsPerformanceJSON.ClientSideLogs+'</u></b><br /><br />';
						for(var logType in performanceLogs['clientLogs']) {
							textContent += logType + ': ' + this.roundNumber(performanceLogs['clientLogs'][logType], 2) + '<br />';
						}
						textContent += '<br />';
					}
				}
				
				var logsDialog = new WUXDialog({
					title: nlsPerformanceJSON.PerfDiag,
					header: '<h4>'+nlsPerformanceJSON.PerfDiag+'<span style=\'color:blue\'>'+nlsPerformanceJSON.UnitOfMes+'</span></h4>',
					content: textContent,
					immersiveFrame: immersiveFrame,
					modalFlag: true,
					buttons: {
						Cancel: new WUXButton({
							onClick: function(e) {
								var button = e.dsModel;
								var myDialog = button.dialog;
								myDialog.close();
							}
						})
					}
				});
			},
			roundNumber: function(val, dec) {
				return Number(Number(val).toFixed(dec));
			}
		};
		
		return ENXSBGridPerformanceLogs;
	}
);
