function executeWidgetCode() {
	require(['DS/decDashboardCommon/decDashboardEmbeded3DSpace', 'DS/WAFData/WAFData', 'DS/decDashboardCommon/decDashboardCommon', 'DS/PlatformAPI/PlatformAPI'],
    	function (embeded3DSpace, WAFData, dashboardCommon, PlatformAPI) {
	        'use strict';
	        var myWidget = {
				msgArr: new Array(),
				inputProjectCodeMsg: "<p>Please enter the project code into the Preference in the upper right corner.</p>",
				init: function() {
					// main widget에서 프로젝트 코드 지정 시 event catch
					PlatformAPI.subscribe("ProjectInfo", myWidget.setProjectCode);
					
					// dashboard url을 통해 프로젝트 코드 조회
					dashboardCommon.getProjectCode(myWidget.load);
					
					embeded3DSpace.setQueryStr("jsp=../programcentral/decWorkFrontAnalysisChart.jsp&hierarchyFrameSelection=single&FMCS Discipline=" + widget.getValue("fmcsDiscipline") + "&filterParam=fromYear:true,fromMonth:true,toYear:true,toMonth:true");
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
					myWidget.init;
				}
	        });
	    }
	);
}
