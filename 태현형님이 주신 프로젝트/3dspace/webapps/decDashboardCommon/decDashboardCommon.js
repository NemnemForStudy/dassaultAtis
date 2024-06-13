define('DS/decDashboardCommon/decDashboardCommon', ['UWA/Utils','DS/WAFData/WAFData'], function ( Utils,WAFData) {
    "use strict";
    var dashboardCommon = {};
    
/*     dashboardCommon.setValue = function(selectElement) {
									      const selectedValue = selectElement.value;
									      const gProjectCode = selectedValue.split(' ')[0];
									     
									      widget.setValue("projectCode",gProjectCode);
									      console.log('selectedValue : selectedValue', gProjectCode);
									      // 여기에 원하는 동작을 추가
									       //WebPage.setSubscribe(); << 이건 아님..
									       console.log('selectedValue2222 : selectedValue222', gProjectCode);
									       // WebPage.displayContentFromUrl(url);
	}*/
    
	dashboardCommon.getProjectCode = function (callback) {
		var topURL = top.location.href;
		var dashboardId = topURL.substring(topURL.indexOf("#dashboard:") + "#dashboard:".length, topURL.indexOf("/tab:"));
		
		var widgetURL = widget.getUrl();
		var spaceURL = widgetURL.substring(0, widgetURL.indexOf("/3dspace"));
		WAFData.authenticatedRequest(spaceURL + "/3dspace/resources/JPO/emxProjectSpace/getProjectOutLineList", {
			method: "POST",
			type: "json",
			data: {
				whereParam: "attribute[decDashboardURL] ~~ '*" + dashboardId + "*'"
			},
			onComplete: function (response) {
            	console.log('Startup params', response);
            	var projectCode = null;
            	if ( response.hasOwnProperty("result") === true && response["result"].toUpperCase() === "SUCCESS")
           		{
					if ( response["data"].length > 0 )
					{
						projectCode = response["data"][0]["name"];
//	                	dashboardCommon.setProjectCode({projectCode: projectCode}, callback);
					}
				}
				
				if ( projectCode === null || projectCode === "" )
				{
					
					WAFData.authenticatedRequest(spaceURL + "/3dspace/resources/JPO/emxProjectSpace/getProjectCodeList", {
						method: "POST",
						type: "json",
						data: {
							projectCode: projectCode
						},
						onComplete: function (response) {
		                	console.log('Startup params', response);
		                	if ( response.hasOwnProperty("result") === true && response["result"].toUpperCase() === "SUCCESS")
		               		{	
								var widgetId = widget.id;
								var widgetDiv = "m_"+widgetId;
								console.log('widgetId : widgetId', widgetId);
								const pWidget = window.parent.document.getElementById(widgetDiv);
								const dataArr = response["data"];
								let widgetCount = window.parent.document.getElementsByClassName('moduleHeader__title').length;
									const parentDiv = pWidget.getElementsByClassName('moduleHeader__title')[0];
							    	const newDiv = document.createElement('div');
							    	newDiv.setAttribute('id',widgetId);
			  				    	const selectElement = document.createElement("select");   
									const options = response["data"];
									options.unshift(""); // 맨 앞에 빈 문자열 추가
									
									options.forEach(optionText => {
								      const optionElement = document.createElement("option");
								      if ( optionText !== "" )
								      {
									      optionElement.textContent = optionText["name"] + " " + optionText["attribute[decSiteName]"];
									  }
									  else
									  {
										  optionElement.textContent = optionText;
									  }
								      
								      selectElement.appendChild(optionElement);
								    });

						    
								    var projectCode = widget.getValue("projectCode");
								    if(projectCode!=""){
										// select 엘리먼트 내의 option들을 찾아서 반복
										for (let i = 0; i < selectElement.options.length; i++) {
										  const option = selectElement.options[i];
										  const optionValue = selectElement.options[i].label;
										  var selectOption = optionValue.split(' ')[0];
										  // val 값과 option의 값이 일치하면 해당 option을 선택
										  if (selectOption === projectCode) {
										    option.selected = true;
										    break; // 선택되었으므로 더 이상 반복할 필요 없음
										  }
										}
									}else{
										widget.body.innerHTML += "<p>Please enter the project code into the Preference in the upper right corner.</p>";
									}
								    
								    function setValue() {
								      const selectedValue = selectElement.value;
								      const gProjectCode = selectedValue.split(' ')[0];
								     
								      widget.setValue("projectCode",gProjectCode);
								      console.log('selectedValue : selectedValue', gProjectCode);
								      console.log('selectedValue2222 : selectedValue222', gProjectCode);
								    }
									
									
									const pWidgetExist = window.parent.document.getElementById(widgetId);
									if(pWidgetExist==null ){
										 newDiv.appendChild(selectElement);
									}						    
								   
								    

								    selectElement.addEventListener("change", setValue);

									parentDiv.appendChild(newDiv);
									newDiv.style.float = 'right';
									options.shift();
					   		   																		
								
								dashboardCommon.setProjectCode({projectCode: projectCode}, callback);
							}
							else
							{
								widget.body.innerHTML += "<p>" + response["result"] + "</p>";
							}
		            	}	
					
					})
				/////////	
				}
				else
				{
					dashboardCommon.setProjectCode({projectCode: projectCode}, callback);
				}
        	},
        	onFailure: function (e) {
				console.log('ERROR : getProjectCode', e);
			},
			onTimeout: function (e) { 
				console.log('ERROR : getProjectCode', e);  
			}
        });
	};
    dashboardCommon.setSelectBox = function(){}    
        /**
		 * set Project Code And load
		 */
	dashboardCommon.setProjectCode = function(callData, callback){
		var projectCode = callData.projectCode;
		if(projectCode.indexOf("Config!") != -1){
			projectCode = projectCode.replace("Config!", "");
			/*
			 * Modified by hslee on 2023.08.02 --- [s]
			widget.setValue('projectCode', projectCode);
			WebPage.load();
			*/
		}
		
		if ( projectCode !== undefined && projectCode !== "" && projectCode !== null )
		{
			widget.setValue('projectCode', projectCode);
			callback();
		}
		// Modified by hslee on 2023.08.02 --- [e]
	};
	
	/*dashboardCommon.getProjectCodeList = function() {
					var projectCode = widget.getValue("projectCode");

			    		var widgetURL = widget.getUrl();
			    		var spaceURL = widgetURL.substring(0, widgetURL.indexOf("/3dspace"));
						WAFData.authenticatedRequest(spaceURL + "/3dspace/resources/JPO/emxProjectSpace/getProjectCodeList", {
							method: "POST",
							type: "json",
							data: {
								projectCode: projectCode
							},
							onComplete: function (response) {
			                	console.log('Startup params', response);
			                	if ( response.hasOwnProperty("result") === true && response["result"].toUpperCase() === "SUCCESS")
			               		{	
									const dataArr = response["data"];
									let widgetCount = window.parent.document.getElementsByClassName('moduleHeader__title').length;
									for (var i = 0; i < widgetCount; i++) { // 배열 arr의 모든 요소의 인덱스(index)를 출력함.
										const parentDiv = window.parent.document.getElementsByClassName('moduleHeader__title')[i];
								    	const newDiv = document.createElement('div');
				  				    	const selectElement = document.createElement("select");   
										const options = response["data"];
										options.unshift(""); // 맨 앞에 빈 문자열 추가
										
										options.forEach(optionText => {
									      const optionElement = document.createElement("option");
									      optionElement.textContent = optionText;
									      selectElement.appendChild(optionElement);
									    });
									    
									    if(projectCode!=""){
											// select 엘리먼트 내의 option들을 찾아서 반복
											for (let i = 0; i < selectElement.options.length; i++) {
											  const option = selectElement.options[i];
											  
											  // val 값과 option의 값이 일치하면 해당 option을 선택
											  if (option.value === projectCode) {
											    option.selected = true;
											    break; // 선택되었으므로 더 이상 반복할 필요 없음
											  }
											}
										}
									    
									    function getUrl() {
													if(widget.getValue('projectCode')){
													var useUrl = widget.getUrl();
													useUrl = useUrl.substring(0, useUrl.indexOf('html'));
									                var urlProtocol, url = Utils.parseUrl(useUrl + "jsp?projectCode=" + widget.getValue('projectCode')),
									                    urlResult = '',
									                    urlSource = url.source;
													}else{
									                var urlProtocol, url = '',
									                    urlResult = '',
									                    urlSource = url.source;
													}
																						
									                if (urlSource && urlSource !== 'about:blank') {
									                    urlProtocol = url.protocol;
									                    if (urlProtocol === 'https') {
									                        urlResult = urlSource;
									                    } else if (urlProtocol === 'http') {
									                        urlResult = urlSource;
									                    } else {
									                        urlResult = 'http://' + urlSource;
									                    }
									                }
									                return urlResult.trim();
									    };
									    
									    function setValue() {
									      const selectedValue = selectElement.value;
									      const gProjectCode = selectedValue.split(' ')[0];
									      var url = getUrl();
									      widget.setValue("projectCode",gProjectCode);
									      console.log('selectedValue : selectedValue', gProjectCode);
									      // 여기에 원하는 동작을 추가
									       //WebPage.setSubscribe(); << 이건 아님..
									       console.log('selectedValue2222 : selectedValue222', gProjectCode);
									       // WebPage.displayContentFromUrl(url);
									    }
																		    
									    newDiv.appendChild(selectElement);
									    
	
									    selectElement.addEventListener("change", setValue);
										parentDiv.appendChild(newDiv);
										newDiv.style.float = 'right';
										options.shift();
  						   		    }																		
							
								}
								else
								{
									widget.body.innerHTML += "<p>" + response["result"] + "</p>";
								}
			            	},
			            	onFailure: function (e) {
								console.log('ERROR : getDisciplineList', e);
							},
							onTimeout: function (e) { 
								console.log('ERROR : getDisciplineList', e);  
							}
			            });

	};*/
	
	dashboardCommon.setProjectbox = function(){
				
				
				var widgetId = widget.id;
				var widgetDiv = "m_"+widgetId;
				var widgetDiv2 = "frame-"+widgetId;
				var pWidget2 = window.parent.document.getElementById(widgetDiv2);
				
				console.log('widgetId : widgetId',widgetId);
				var projectCode = widget.getValue("projectCode"); // 환경설정에 바꾼 프로젝트 코드.
				var pWidget = window.parent.document.getElementById(widgetDiv);
				var selectElement = pWidget.querySelector("select");
				
				if ( selectElement !== null && selectElement !== undefined ) // Added by hslee on 2023.09.10
				{
					// 선택된 옵션의 인덱스를 가져옵니다.
	    		    var selectedIndex = selectElement.selectedIndex;
	   			    // 선택된 옵션의 값을 가져옵니다.
	     		    var selectedValue = selectElement.options[selectedIndex].value;
	     		    var boxOption = selectedValue.split(' ')[0];
	     		    if(boxOption!=projectCode){
						  for (let i = 0; i < selectElement.options.length; i++) {
							  const option = selectElement.options[i];
							  const optionValue = selectElement.options[i].label;
							  var selectOption = optionValue.split(' ')[0];
							  // val 값과 option의 값이 일치하면 해당 option을 선택
							  if (selectOption === projectCode) {
							      option.selected = true;
							      break; // 선택되었으므로 더 이상 반복할 필요 없음
							  }						  
						  }				 						 
					 }	
					console.log('projectCode : projectCode',projectCode);
					//pWidget2.contentWindow.location.reload();
					
					}
				}
				

    
	return dashboardCommon;
});
