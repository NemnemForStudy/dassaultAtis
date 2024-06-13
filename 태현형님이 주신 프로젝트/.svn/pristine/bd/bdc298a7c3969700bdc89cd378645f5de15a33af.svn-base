function isNumCheck()
{	
	var currCell = emxEditableTable.getCurrentCell();
	if(currCell != null)
	{
		var cCellValue = currCell.value.current.display;
		var oCellValue = currCell.value.old.display;
		var rowId = currCell.rowID;
	
		if(isNaN(cCellValue)){
			var errorUrl = "../programcentral/emxProgramCentralUtil.jsp?mode=errorMessage&errorKey=emxProgramCentral.Financials.PleaseEnterOnlyNumbers";
			var errorMessage = emxUICore.getData(errorUrl);
			alert(errorMessage);
			emxEditableTable.refreshRowByRowId(rowId);
			return false;
		} 
	}
	return true;
}

function isNumAndOverCheck()
{	
	var currCell = emxEditableTable.getCurrentCell();
	if(currCell != null)
	{
		var cCellValue = currCell.value.current.display;
		var oCellValue = currCell.value.old.display;
		var rowId = currCell.rowID;
	
		if(isNaN(cCellValue)){
			var errorUrl = "../programcentral/emxProgramCentralUtil.jsp?mode=errorMessage&errorKey=emxProgramCentral.Financials.PleaseEnterOnlyNumbers";
			var errorMessage = emxUICore.getData(errorUrl);
			alert(errorMessage);
			emxEditableTable.refreshRowByRowId(rowId);
			return false;
		} else if(cCellValue>100){
			var errorUrl = "../programcentral/emxProgramCentralUtil.jsp?mode=errorMessage&errorKey=emxProgramCentral.Financials.PleaseEnterLess100";
			var errorMessage = emxUICore.getData(errorUrl);
			alert(errorMessage);
			emxEditableTable.refreshRowByRowId(rowId);
			return false;
		}
	}
	return true;
}