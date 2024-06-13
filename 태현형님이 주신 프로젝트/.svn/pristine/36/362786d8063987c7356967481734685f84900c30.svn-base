function executeWidgetCode() {
	require(['DS/PlatformAPI/PlatformAPI', 'DS/decDashboardCommon/decDashboardCommon', 'DS/decDashboardCommon/decDashboardEmbeded3DSpace'],
    	function (PlatformAPI, dashboardCommon, embeded3DSpace) {
	        'use strict';
	        var myWidget = {
				init: function() {
					// load할 3dspace url 지정
					embeded3DSpace.setQueryStr("jsp=../common/emxPortal.jsp&portal=decCWPMaterialPortal&label=emxProgramCentral.Label.CWPMaterialSummary&suiteKey=ProgramCentral&showPageHeader=false");

					// main widget에서 프로젝트 코드 지정 시 event catch
					PlatformAPI.subscribe("ProjectInfo", myWidget.setProjectCode);

					// dashboard url을 통해 프로젝트 코드 조회
					dashboardCommon.getProjectCode(myWidget.load);
				},
				load: function() {
					embeded3DSpace.load();
				},
				setProjectCode: function (callData) {
					dashboardCommon.setProjectCode(callData, myWidget.load);
				}
			};
	        
	        widget.addEvents({
	            onLoad: myWidget.init,
	            onRefresh: myWidget.load,
	            onConfigChange: myWidget.init,
	            onUpdateValue: function(){
								
					dashboardCommon.setProjectbox();
					dashboardCommon.getProjectCode(myWidget.load);
            		//myWidget.setProjectCode();
					myWidget.init;
				}
	        });
	    }
	);
}
