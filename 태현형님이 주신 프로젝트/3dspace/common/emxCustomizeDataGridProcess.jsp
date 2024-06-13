	
<%@include file="emxNavigatorInclude.inc"%>
<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@include file="emxNavigatorTimerTop.inc"%>

<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>

<jsp:useBean id="tableBean" class="com.matrixone.apps.framework.ui.UITable" scope="session" />
<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.UITableIndented" scope="session" />
 
<html>
<head>
<script type="text/javascript" language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script type="text/javascript" language="JavaScript" src="../common/scripts/emxUICore.js"></script>
<script type="text/javascript" language="JavaScript" src="../common/scripts/emxUICoreMenu.js"></script>
<script type="text/javascript" language="JavaScript" src="../common/scripts/emxUITableUtil.js"></script>
<script type="text/javascript" language="JavaScript" src="../common/scripts/emxUIToolbar.js"></script>
<script type="text/javascript" language="javascript" src="../common/scripts/emxUIFreezePane.js"></script>


<script type="text/javascript">
                addStyleSheet("emxUIDefault");
                addStyleSheet("emxUIDialog");
                addStyleSheet("emxUIToolbar");
                addStyleSheet("emxUIMenu");
</script>
<%
	String strColumnsText = emxGetParameter(request,"columnsText");
	String strColumnsValue = emxGetParameter(request,"customTableColValue");
	String strNewTableName = emxGetParameter(request,"txtCustomTextBox");
	String strFirstSortColumn = emxGetParameter(request,"hdnFirstColumn");
	String strSecondSortColumn = emxGetParameter(request,"hdnSecondColumn");
	String strThirdSortColumn = emxGetParameter(request,"hdnThirdColumn");
	String strFirstSortDirection= emxGetParameter(request,"hdnFirstColumnDirection");
	String strSecondSortDirection = emxGetParameter(request,"hdnSecondColumnDirection");
	String strThirdSortDirection = emxGetParameter(request,"hdnThirdColumnDirection");
	String strTable = emxGetParameter(request,"table");
    String strMode = emxGetParameter(request,"mode");
	String strSysTable = strTable;
	String strCustomSortColumn = "";
	String strCustomSortDirection = "";
	
	if( strFirstSortColumn!=null &&!"None".equalsIgnoreCase(strFirstSortColumn) && !"".equals(strFirstSortColumn))
	{
	    strFirstSortColumn = strFirstSortColumn.substring(strFirstSortColumn.indexOf("@")+1,strFirstSortColumn.length());
	    strCustomSortColumn = strFirstSortColumn;
	    strCustomSortDirection = strFirstSortDirection;
	}
	if(strSecondSortColumn!=null && !"None".equalsIgnoreCase(strSecondSortColumn) && !"".equals(strSecondSortColumn))
	{
	    strSecondSortColumn = strSecondSortColumn.substring(strSecondSortColumn.indexOf("@")+1,strSecondSortColumn.length());
	    strCustomSortColumn += "," + strSecondSortColumn;
	    strCustomSortDirection += "," + strSecondSortDirection;
	}
	if(strThirdSortColumn!=null && !"None".equalsIgnoreCase(strThirdSortColumn) && !"".equals(strThirdSortColumn))
	{
	    strThirdSortColumn = strThirdSortColumn.substring(strThirdSortColumn.indexOf("@")+1,strThirdSortColumn.length());
	    strCustomSortColumn += "," + strThirdSortColumn;
	    strCustomSortDirection += "," + strThirdSortDirection;
	}
	        
	java.util.List propertyList = new StringList();
	propertyList.add(0,strCustomSortColumn);
	propertyList.add(1,strCustomSortDirection);
	Boolean userTable =Boolean.FALSE;
if(userTable!=null)
	    {
	    	boolean isUserTable  = userTable.booleanValue();
	    	strSysTable = tableBean.getSystemTableName(context,strTable,isUserTable);
	    }
	    else
	    {
	        strSysTable = tableBean.getSystemTableName(context,strTable);
	    }
		
	
	
	java.util.List listMap = new ArrayList();
	HashMap hmpHidden = new HashMap();
	HashMap hmpBasic = new HashMap();
	HashMap hmpExpression = new HashMap();
	HashMap hmpAttribute = new HashMap();
	HashMap hmpSystem = new HashMap();
	HashMap hmpSeparator = new HashMap();
	HashMap hmpDynamicColumns = new HashMap();
	int split =0;
	StringBuilder strBuffFreezePane = new StringBuilder(64);	
	StringList strlColumnText = FrameworkUtil.split(strColumnsText,",");
	StringList strlColumnValue = FrameworkUtil.split(strColumnsValue,",");
	// Modified for bug no 345209
	int j=0;
	// End
for(int i=0;i<strlColumnValue.size();i++)
	{
	    j++;
	    String strValue =(String) strlColumnValue.get(i);
	    System.out.println("strlColumnValue:"+strlColumnValue);
	    strValue = strValue.replaceAll("CO::MM::A", ",");
	    StringList strlValues = FrameworkUtil.split(strValue,"|");
	    String strSubString = strValue;
	    strValue = (String)strlValues.get(0);
	    String strExpression = "";
	    if(strlValues.size() == 4){
	    	strExpression = (String)strlValues.get(1);
	    }else{
	    	strSubString = strSubString.substring(strSubString.indexOf("|")+1,strSubString.lastIndexOf("|"));
	    	strExpression = strSubString.substring(0,strSubString.lastIndexOf("|"));
	    }
	    String label = (String)strlValues.get(strlValues.size()-2);
	    String strSortWidth = (String)strlValues.get(strlValues.size()-1);
	    StringList strList = FrameworkUtil.split(strSortWidth,"~");
		strSortWidth = (String) strList.get(0);
		String strWidth = (String) strList.get(1);
		if(strWidth.equals("0.0"))
		    strWidth = "0";
		if( strWidth!=null && !"".equalsIgnoreCase(strWidth))
		{
		    double width = 0;
		    
		    	width = Double.parseDouble(strWidth) * 8;
		    
		    		    strWidth = String.valueOf(width);
		    strWidth = strWidth.substring(0,strWidth.indexOf("."));
		}
		String strText =(String) strlColumnText.get(i);
		//int j = i+1;
	    strText += "|" + j +"|"+ strExpression+"|"+strWidth+"|"+label;
	    // Added for bug no 345209
	    if(strExpression.equals("paneSeparator"))
	        j--;
	    // End
	    long myLong = System.currentTimeMillis();
    	String strRandom = String.valueOf(myLong);
    	if(strValue.indexOf("@")<0)
    	{
    	    if(strValue.startsWith("Separator"))
    	    {
	    	    try
	    	    {
    	        	strValue = strValue+strRandom+i;
	    	    }
	    	    catch(Exception e)
	    	    {
	    	        
	    	    }   
	    	    hmpSeparator.put(strValue,strText);
    	    }
    	    
    	}
    	else
    	{
    	    if(strValue.startsWith("system@"))
    	    {
    	        hmpSystem.put(strValue,strText);
    	    }
    	    if(strValue.startsWith("hidden@"))
    	    {
    	        hmpHidden.put(strValue,strText);
    	    }
    	    if(strValue.startsWith("basic@"))
    	    {
    	        hmpBasic.put(strValue,strText);
    	    }
    	    if(strValue.startsWith("expression@"))
    	    {
    	        hmpExpression.put(strValue,strText);
    	    }
    	    if(strValue.startsWith("businessobject@") || strValue.startsWith("relationship@"))
    	    {
    	        hmpAttribute.put(strValue,strText);
    	    }
			if(strValue.startsWith("dynamic@")){
    	    	hmpDynamicColumns.put(strValue,strText);
    	    }
    	    if(strValue.startsWith("paneSeparator"))
    	    {
    	        for(int l=0;l<i;l++)
    	        {
    	            if(l!=0 && l!=i)
    	            {
    	                // Modified for bug no 343857
    	                strBuffFreezePane.append(",");
    	                // till here
    	            }
    	            String strTemp =(String) strlColumnValue.get(l);
    	    	    strlValues = FrameworkUtil.split(strTemp,"|");
    	    	    String strValueNew = (String)strlValues.get(0);
    	    	    try
    	    	    {
    	    	        strValueNew = strValueNew.substring(strValueNew.indexOf("@")+1,strValueNew.length());
    	    	        
    	    	    }
    	    	    catch(Exception e)
    	    	    {
    	    	        // No need to throw the exception.
    	    	    }
    	    	    
    	    	    strBuffFreezePane.append(strValueNew);
		    split++;
    	        }
    	    }
    	   
    	}
	}
	
	listMap.add(hmpHidden);
	listMap.add(hmpBasic);
	listMap.add(hmpExpression);
	listMap.add(hmpAttribute);
	listMap.add(hmpSystem);
	listMap.add(hmpSeparator);
	listMap.add(hmpDynamicColumns);
	propertyList.add(2,strBuffFreezePane);
	System.out.println("propertyList:"+propertyList);
	
strNewTableName = indentedTableBean.createCustomDataGrid(context,strSysTable ,strNewTableName,listMap,propertyList,strMode);
	    
%>
	
		<script language="JavaScript">
			if(parent.getWindowOpener().getTopWindow()){
				parent.getWindowOpener().getTopWindow().removePersistenceData("sortColumnName", "<%=strNewTableName%>");
				parent.getWindowOpener().getTopWindow().removePersistenceData("sortDirection", "<%=strNewTableName%>");
			}

var loc = parent.getWindowOpener().location.href;
var value = "";
		var queryString = loc.split("?")[1];
		if (queryString) {
			var paramValue = queryString.split("&");
			if (paramValue) {
				for(var i = 0; i < paramValue.length; i++) {
					var paramName = paramValue[i].split("=");
					if (paramName[0] && paramName[0] == "freezePane") {
						value = paramName[1];
						break;
					}
				}
			}
		}
if(loc.indexOf("selectedTable")>-1){
var rtn = loc.split("?")[0],param,params_arr = [],queryString = (loc.indexOf("?") !== -1) ? loc.split("?")[1] : "";
  				    if (queryString !== "") {
        				params_arr = queryString.split("&");
        				for (var j = params_arr.length - 1; j >= 0; j -= 1) {
           				 	param = params_arr[j].split("=")[0];
            				 	if (param === "selectedTable") {
              			  			params_arr.splice(j, 1);
           				 	}
        				}
        				rtn = rtn + "?" + params_arr.join("&");
         			  }
					  
					  loc = rtn
}
var newSrc = '<xss:encodeForJavaScript><%=strNewTableName%></xss:encodeForJavaScript>';
loc = loc.replace(/(selectedTable=).*?(&)/,'$1' + newSrc+ '$2');
if(loc.indexOf("dynamicCustomFreezePane")>-1){
var newSrc = '<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>';
loc = loc.replace(/(dynamicCustomFreezePane=).*?(&)/,'$1' + newSrc+ '$2');
}
if(loc.indexOf("dynamicFreezePane")>-1){
var newSrc = '<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>';
loc = loc.replace(/(dynamicFreezePane=).*?(&)/,'$1' + newSrc+ '$2');
}
if(loc.indexOf("customFreezePane")>-1){
var newSrc = '<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>';
loc = loc.replace(/(customFreezePane=).*?(&)/,'$1' + newSrc+ '$2');
}
if(loc.indexOf("freezePane")>-1){
var newSrc = '<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>';
loc = loc.replace(/(freezePane=).*?(&)/,'$1' + newSrc+ '$2');
}
if(loc.indexOf("sortColumnName")>-1){
var newSrc = '<xss:encodeForJavaScript><%=strCustomSortColumn%></xss:encodeForJavaScript>';
loc = loc.replace(/(sortColumnName=).*?(&)/,'$1' + newSrc+ '$2');
}
if(loc.indexOf("customSortColumns")>-1){
var newSrc = '<xss:encodeForJavaScript><%=strCustomSortColumn%></xss:encodeForJavaScript>';
loc = loc.replace(/(customSortColumns=).*?(&)/,'$1' + newSrc+ '$2');
}
if(loc.indexOf("sortDirection")>-1){
var newSrc = '<xss:encodeForJavaScript><%=strCustomSortDirection%></xss:encodeForJavaScript>';
loc = loc.replace(/(sortDirection=).*?(&)/,'$1' + newSrc+ '$2');
}
if(loc.indexOf("customSortDirections")>-1){
var newSrc = '<xss:encodeForJavaScript><%=strCustomSortDirection%></xss:encodeForJavaScript>';
loc = loc.replace(/(customSortDirections=).*?(&)/,'$1' + newSrc+ '$2');
}

if(loc.indexOf("sysFreezePane")==-1){
	var url = loc+"&selectedTable="+'<xss:encodeForJavaScript><%=strNewTableName%></xss:encodeForJavaScript>'+"&sysFreezePane="+value+"&dynamicFreezePane="+'<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>'+"&customFreezePane="+'<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>'+"&dynamicCustomFreezePane="+'<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>'+"&customSortColumns="+'<xss:encodeForJavaScript><%=strCustomSortColumn%></xss:encodeForJavaScript>'+"&customSortDirections="+'<xss:encodeForJavaScript><%=strCustomSortDirection%></xss:encodeForJavaScript>'+"&split="+<%=split%>;

}else{
	var url = loc+"&selectedTable="+'<xss:encodeForJavaScript><%=strNewTableName%></xss:encodeForJavaScript>'+"&dynamicFreezePane="+'<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>'+"&customFreezePane="+'<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>'+"&dynamicCustomFreezePane="+'<xss:encodeForJavaScript><%=strBuffFreezePane%></xss:encodeForJavaScript>'+"&customSortColumns="+'<xss:encodeForJavaScript><%=strCustomSortColumn%></xss:encodeForJavaScript>'+"&customSortDirections="+'<xss:encodeForJavaScript><%=strCustomSortDirection%></xss:encodeForJavaScript>'+"&split="+<%=split%>;
}

var rtn = url.split("?")[0],param,params_arr = [],queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";
  				    if (queryString !== "") {
        				params_arr = queryString.split("&");
        				for (var j = params_arr.length - 1; j >= 0; j -= 1) {
           				 	param = params_arr[j].split("=")[0];
            				 	if (param === "fromToolbar") {
              			  			params_arr.splice(j, 1);
           				 	}
        				}
        				rtn = rtn + "?" + params_arr.join("&");
         			  }
parent.getWindowOpener().location.href=rtn ;
parent.window.closeWindow();
</script>
