function refreshWholeTree(e, oID, documentDropRelationship, documentCommand, showStatesInHeader, sMCSURL, imageDropRelationship, headerOnly, imageManagerToolbar, imageUploadCommand,showDescriptionInHeader){

		if(e.data && e.data.headerOnly){
			headerOnly=e.data.headerOnly;
		} 
		if(imageManagerToolbar == undefined || imageManagerToolbar == null){
			imageManagerToolbar = "";
		}
		if(imageUploadCommand == undefined || imageUploadCommand == null){
			imageUploadCommand = "";
		}

		var url = "../common/emxExtendedPageHeaderAction.jsp?action=refreshHeader&objectId="+oID+"&documentDropRelationship="
					+documentDropRelationship+"&documentCommand="+documentCommand+"&showStatesInHeader="+showStatesInHeader
					+"&imageDropRelationship="+imageDropRelationship+"&MCSURL="+sMCSURL+"&imageManagerToolbar="+imageManagerToolbar+"&imageUploadCommand="+imageUploadCommand+"&showDescriptionInHeader="+showDescriptionInHeader;

		jQuery.ajax({
		    url : url,
		    cache: false
		})
		.success( function(text){
			if (text.indexOf("#5000001")>-1) {
				var wndContent = getTopWindow().findFrame(getTopWindow(), "detailsDisplay");
				if (wndContent) {
					var tempURL ="../common/emxTreeNoDisplay.jsp";
					wndContent.location.href = tempURL;
				}

			}else {
			jQuery('#ExtpageHeadDiv').html(text);
			if(!headerOnly){
			getTopWindow().emxUICategoryTab.redrawPanel();
			}

			var extpageHeadDiv = jQuery("#ExtpageHeadDiv");
			if(extpageHeadDiv.hasClass("page-head")){
				jQuery(".mini").addClass("hide");
				jQuery(".full").removeClass("hide");
			}
			else{


				jQuery(".full").addClass("hide");
				jQuery(".mini").removeClass("hide");
			}
			adjustNavButtons();
			if (!headerOnly) {
				var objStructureFancyTree = getTopWindow().objStructureFancyTree;
				if(objStructureFancyTree && getTopWindow().bclist && getTopWindow().bclist.getCurrentBC().fancyTreeData){
					objStructureFancyTree.reInit(getTopWindow().bclist.getCurrentBC().fancyTreeData, true);
				}else{
				refreshStructureTree();
				}
				var wndContent = getTopWindow().findFrame(getTopWindow(), "detailsDisplay");
				if (wndContent) {
					var tempURL = wndContent.location.href;
					tempURL = tempURL.replace("persist=true","persist=false");
					if(isIE){
						for (var property in wndContent)
						{
						   if (property != 'name' && wndContent.hasOwnProperty(property))
								   wndContent[property] = null;
						}
						wndContent.document.body.innerHTML = "";
						wndContent.document.head.innerHTML = "";
					}
					wndContent.location.href = tempURL;
				}
			}
			if(headerOnly && getTopWindow().getWindowOpener() && getTopWindow().getWindowOpener() == getTopWindow().opener)
			{
				jQuery("div",jQuery("div#divExtendedHeaderNavigation")).not("div.field.previous.button, div.field.next.button,div.field.refresh.button , div.field.resize-Xheader.button, div#collab-space-id").hide();				
			}

		}
		});
}
function preProcessTaskCreateForm(){
	let IWPYN = document.forms[0]['IWPYN'].value;
	let wbsType = document.forms[0]['objWBSType'].value;
	if(wbsType === "CWP" && IWPYN === "N"){
		alert("IWP Is N. cannot be create IWP.");
		getTopWindow().closeSlideInDialog();
	}else if(wbsType === "IWP" ){
		alert("cannot be created under IWP.");
		getTopWindow().closeSlideInDialog();
	}
	
    $("label[for=EstimatedStartDate]").parents("td")[0].className = 'createLabelRequired';
    $("label[for=EstimatedEndDate]").parents("td")[0].className = 'createLabelRequired';
    $("label[for=CWPActivityType]").parents("td")[0].className = 'createLabelRequired';
    $("label[for=IWPType]").parents("td")[0].className = 'createLabelRequired';
    $("label[for=Discipline]").parents("td")[0].className = 'createLabelRequired';
    $("label[for=SequenceNo]").parents("td")[0].className = 'createLabelRequired';
//    $("label[for=KeyQtyType]").parents("td")[0].className = 'createLabelRequired';
//    $("label[for=UOM]").parents("td")[0].className = 'createLabelRequired';
    let btnTD1 = document.createElement('text');
    let btnTD2 = document.createElement('text');
    btnTD1.id = "onSetAutoNameBtnTD";
    btnTD2.id = "onSetAutoNameLabelTD";
    btnTD2.style.fontStyle = 'normal';
    btnTD2.style.color = '#2a2a2a';
//    btnTD1.innerHTML = "<button onclick='javascript:onSetAutoName();'>자동 이름</button>";
//    btnTD2.innerHTML = "<button onclick='javascript:onNameClear();'>Clear</button>";

	btnTD1.innerHTML = "&ensp;<input type=\"checkbox\" name=\"emxTableRowIdActual\" class=\"small\" onclick=\"autoNameCheckboxClick(this,event);\">";  
	btnTD2.innerHTML = "&nbsp;Auto&nbsp;Name";    
    
    $("label[for=Name]")[0].append(btnTD1);
    $("label[for=Name]")[0].append(btnTD2);
	reloadTaskCreateForm();
}
function autoNameCheckboxClick(objCheckbox, event) {
    if (objCheckbox.checked){
		onSetAutoName();
	}else{
		onNameClear();
	}
}
function onSetAutoName(){
	let selectedWBSType = document.forms[0]['WBS Type'].value;
	let ParentNo = document.forms[0]['objName'].value;
	let CWPActivityType = document.forms[0]['CWPActivityType'].value;
	let IWPType = document.forms[0]['IWPType'].value;
	let wbsType = document.forms[0]['objWBSType'].value;
	let CWANo = document.forms[0]['objName'].value;
	let Discipline = document.forms[0]['Discipline'].value;
	let SequenceNo = document.forms[0]['SequenceNo'].value;
    if(selectedWBSType.toUpperCase() == "CWP"){
		document.forms[0]['Name'].value = "CWP-" + CWANo + "-" + CWPActivityType + "-" + Discipline + "-" + SequenceNo;
		document.forms[0]['EWPNo'].value = "EWP-" + CWANo + "-" + CWPActivityType + "-" + Discipline + "-" + SequenceNo;
	}else if(selectedWBSType.toUpperCase() == "IWP"){
		if(document.forms[0]['objParentName']){
			CWANo = document.forms[0]['objParentName'].value;	
		}
		let cwpSequentialNo = document.forms[0]['cwpSequentialNo'].value;
		CWPActivityType = document.forms[0]['cwpActivityType'].value;
		document.forms[0]['Name'].value = "IWP-" + CWANo + "-" + CWPActivityType + "-" + Discipline + "-" + cwpSequentialNo + "-" + IWPType + "-" + SequenceNo;
	}
}
function onNameClear(){
	let selectedWBSType = document.forms[0]['WBS Type'].value;
	document.forms[0]['Name'].value = "";
	document.forms[0]['EWPNo'].value = "";
}
	
function reloadTaskCreateForm(){
	let selectedWBSType = document.forms[0]['WBS Type'].value;
    let CWPTRTag			 = $("#CWPActivityTypeId").parents("tr")[$("#CWPActivityTypeId").parents("tr").length-1];
    let IWPTRTag			 = $("#IWPTypeId").parents("tr")[$("#IWPTypeId").parents("tr").length-1];
    let DisciplineTRTag		 = $("#DisciplineId").parents("tr")[$("#DisciplineId").parents("tr").length-1];
    let SequenceNoTRTag		 = $("#SequenceNo").parents("tr")[$("#SequenceNo").parents("tr").length-1];
    let EWPNoTRTag			 = $("#EWPNo").parents("tr")[$("#EWPNo").parents("tr").length-1];
    let CWPLabelTRTag		 = $("label[for=CWPActivityType]").parents("tr")[0];
    let IWPLabelTRTag		 = $("label[for=IWPType]").parents("tr")[0];
    let DisciplineLabelTRTag = $("label[for=Discipline]").parents("tr")[0];
    let SequenceNoLabelTRTag = $("label[for=SequenceNo]").parents("tr")[0];
    let EWPNoLabelTRTag		 = $("label[for=EWPNo]").parents("tr")[0];
    
    let PlanStartDateTRTag			 = $("#EstimatedStartDate").parents("tr")[$("#EstimatedStartDate").parents("tr").length-1];
    let PlanFinishDateTRTag			 = $("#EstimatedEndDate").parents("tr")[$("#EstimatedEndDate").parents("tr").length-1];
    let ForecastStartDateTRTag		 = $("#decTaskForecastStartDate").parents("tr")[$("#decTaskForecastStartDate").parents("tr").length-1];
    let ForecastFinishDateTRTag		 = $("#decTaskForecastEndDate").parents("tr")[$("#decTaskForecastEndDate").parents("tr").length-1];
    let PlanStartDateLabelTRTag		 = $("label[for=EstimatedStartDate]").parents("tr")[0];
    let PlanFinishDateLabelTRTag	 = $("label[for=EstimatedEndDate]").parents("tr")[0];
    let ForecastStartDateLabelTRTag	 = $("label[for=decTaskForecastStartDate]").parents("tr")[0];
    let ForecastFinishDateLabelTRTag = $("label[for=decTaskForecastEndDate]").parents("tr")[0];
    
    let qtyItemTRTag 				 = $("#KeyQtyTypeId").parents("tr")[$("#KeyQtyTypeId").parents("tr").length-1];
    let qtyLabelTRTag				 = $("label[for='KeyQtyType']").parents("tr")[0];
    let UOMTRTag 				 = $("#UOMId").parents("tr")[$("#UOMId").parents("tr").length-1];
    let UOMLabelTRTag				 = $("label[for='UOM']").parents("tr")[0];

    
    let onNameBtnTD					 = document.getElementById('onSetAutoNameBtnTD');
    let onNameLabelTD					 = document.getElementById('onSetAutoNameLabelTD');
    
    if(selectedWBSType.toUpperCase() == "CWP"){
		CWPTRTag.style.display = "";
		IWPTRTag.style.display = "none";
		DisciplineTRTag.style.display = "";
		SequenceNoTRTag.style.display = "";
		CWPLabelTRTag.style.display = "";
		IWPLabelTRTag.style.display = "none";
		DisciplineLabelTRTag.style.display = "";
		SequenceNoLabelTRTag.style.display = "";
		EWPNoTRTag.style.display = "";
		EWPNoLabelTRTag.style.display = "";
		
		PlanStartDateTRTag.style.display = "";
		PlanFinishDateTRTag.style.display = "";
		ForecastStartDateTRTag.style.display = "";
		ForecastFinishDateTRTag.style.display = "";
		PlanStartDateLabelTRTag.style.display = "";
		PlanFinishDateLabelTRTag.style.display = "";
		ForecastStartDateLabelTRTag.style.display = "";
		ForecastFinishDateLabelTRTag.style.display = "";
		qtyLabelTRTag.style.display = "";
		qtyItemTRTag.style.display = "";
		UOMTRTag.style.display = "";
		UOMLabelTRTag.style.display = "";
		
		onNameBtnTD.style.display = "";
		onNameLabelTD.style.display = "";
		changeDiscipline();
		changeKeyItem();
	}else if(selectedWBSType.toUpperCase() == "IWP"){
		CWPTRTag.style.display = "none";
		IWPTRTag.style.display = "";
		DisciplineTRTag.style.display = "none";
		SequenceNoTRTag.style.display = "";
		CWPLabelTRTag.style.display = "none";
		IWPLabelTRTag.style.display = "";
		DisciplineLabelTRTag.style.display = "none";
		SequenceNoLabelTRTag.style.display = "";
		EWPNoTRTag.style.display = "none";
		EWPNoLabelTRTag.style.display = "none";
		
		PlanStartDateTRTag.style.display = "";
		PlanFinishDateTRTag.style.display = "";
		ForecastStartDateTRTag.style.display = "";
		ForecastFinishDateTRTag.style.display = "";
		PlanStartDateLabelTRTag.style.display = "";
		PlanFinishDateLabelTRTag.style.display = "";
		ForecastStartDateLabelTRTag.style.display = "";
		ForecastFinishDateLabelTRTag.style.display = "";
		qtyLabelTRTag.style.display = "none";
		qtyItemTRTag.style.display = "none";
		UOMTRTag.style.display = "none";
		UOMLabelTRTag.style.display = "none";
		
		onNameBtnTD.style.display = "";
		onNameLabelTD.style.display = "";
	}else{
		CWPTRTag.style.display = "none";
		IWPTRTag.style.display = "none";
		DisciplineTRTag.style.display = "none";
		SequenceNoTRTag.style.display = "none";
		CWPLabelTRTag.style.display = "none";
		IWPLabelTRTag.style.display = "none";
		DisciplineLabelTRTag.style.display = "none";
		SequenceNoLabelTRTag.style.display = "none";
		EWPNoTRTag.style.display = "none";
		EWPNoLabelTRTag.style.display = "none";
		
		PlanStartDateTRTag.style.display = "none";
		PlanFinishDateTRTag.style.display = "none";
		ForecastStartDateTRTag.style.display = "none";
		ForecastFinishDateTRTag.style.display = "none";
		PlanStartDateLabelTRTag.style.display = "none";
		PlanFinishDateLabelTRTag.style.display = "none";
		ForecastStartDateLabelTRTag.style.display = "none";
		ForecastFinishDateLabelTRTag.style.display = "none";
		qtyLabelTRTag.style.display = "none";
		qtyItemTRTag.style.display = "none";
		UOMTRTag.style.display = "none";
		UOMLabelTRTag.style.display = "none";
		
		onNameBtnTD.style.display = "none";
		onNameLabelTD.style.display = "none";
	}
}
function changeDiscipline(){
	var Discipline = document.forms[0]["Discipline"].value;
    var keyItem = document.forms[0]["KeyQtyType"];
	keyItem.options.length = 0;
	var hasProjectOID = document.forms[0]["objId"];
	if(hasProjectOID){
	    var projectOID = hasProjectOID.value;
	}else{
		var taskOID = document.forms[0]["objectId"][0].value;
	}
	var strURL = "../programcentral/decProjectManagementUtil.jsp?mode=getBOQKeyItem&Discipline=" + Discipline + "&projectOID=" + projectOID + "&taskOID=" + taskOID;
	
    try{
        var responseTxt = emxUICore.getData(strURL);
	    var responseJSONObj = emxUICore.parseJSON(responseTxt);
		let keyItemDisplay = responseJSONObj["display"];
		let keyItemValue = responseJSONObj["value"];
		let keyItemDisArr = keyItemDisplay.split("_");
		let keyItemValArr = keyItemValue.split("_");
		var empty = document.createElement('option');
		keyItem.append(empty);
		for(i=0; i<keyItemDisArr.length; i++){
			var option = document.createElement('option');
			option.value = keyItemValArr[i];
			option.innerText = keyItemDisArr[i];
			keyItem.append(option);
		}
		changeKeyItem();
	}catch(err) {
		console.log(err);
	}
}

function changeKeyItem() {
	let UOM = document.forms[0]["UOM"];
	UOM.options.length = 0;
    var keyItem = document.forms[0]["KeyQtyType"].value;
	var hasProjectOID = document.forms[0]["objId"];
	if(hasProjectOID){
	    var projectOID = hasProjectOID.value;
	}else{
		var taskOID = document.forms[0]["objectId"][0].value;
	}
	if(keyItem){
	    var strURL = "../programcentral/decProjectManagementUtil.jsp?mode=getUOM&keyItem=" + keyItem + "&projectOID=" + projectOID + "&taskOID=" + taskOID;
	    try{
	        var responseTxt = emxUICore.getData(strURL);
		    var responseJSONObj = emxUICore.parseJSON(responseTxt);
			let uomDisplay = responseJSONObj["display"];
			let uomValue = responseJSONObj["value"];
			let uomDisArr = uomDisplay.split("_");
			let uomValArr = uomValue.split("_");
			var empty = document.createElement('option');
			UOM.append(empty);
			for(i=0; i<uomDisArr.length; i++){
				var option = document.createElement('option');
				option.value = uomValArr[i];
				option.innerText = uomDisArr[i];
				UOM.append(option);
			}
		}catch(err) {
			console.log(err);
		}
	}
}
function validateNumericManHoursPlanned(){
	return validateNumeric("Man Hours - Planned");
}
function validateNumericManHoursActual(){
	return validateNumeric("Man Hours - Actual");
}
function validateNumericTotal(){
	return validateNumeric("KeyQtyTotal");
}
function validateNumericCompleted(){
	return validateNumeric("KeyQtyCompleted");
}
function validateNumericSequentialNo(){
	return validateNumeric("SequentialNo");
}
function validateNumericHeldUpActionEngineering(){
	return validateNumeric("HeldUpActionEngineering");
}
function validateNumericHeldUpActionProcurement(){
	return validateNumeric("HeldUpActionProcurement");
}
function validateNumericNoofIWPs(){
	return validateNumeric("NoofIWPs");
}
function validateNumericCrewCompositionpPerIWP(){
	return validateNumeric("CrewCompositionpPerIWP");
}

function validateNumeric(id){
	var regex = /[^0-9]/g;
    var numberOf = document.getElementById(id);
    var numberOfValue = Number(numberOf.value);
    if (isNaN(numberOfValue)) {
		numberOf.value = numberOf.value.replace(regex, "");
        return false;
    }else{
		return true;
	}
}