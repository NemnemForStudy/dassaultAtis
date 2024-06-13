<%@include file="emxNavigatorInclude.inc"%>
<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@include file="emxUIDataGridCustomJavaScriptInclude.inc"%>


<%@ page import="com.matrixone.apps.domain.util.FrameworkProperties,
                 com.matrixone.apps.domain.util.XSSUtil"%>

<%
String strLanguage = Request.getLanguage(request);
String strTableName= (String) emxGetParameter(request,"customTable");
String curTable= (String) emxGetParameter(request,"curTable");
Locale locale = new Locale(strLanguage);
String emxSelectorBadChars  = "";
try {
    emxSelectorBadChars     = EnoviaResourceBundle.getProperty(context, "emxFramework.CustomTable.NameBadChars");
}
catch(Exception e){
    throw (new FrameworkException(e));
}
%>
<html>
<head>
<script type="text/javascript" language="JavaScript" src="../common/scripts/emxUICore.js"></script>
<script type="text/javascript" language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script type="text/javascript" language="javascript" src="../common/scripts/emxJSValidationUtil.js"></script>
<script type="text/javascript" language="javascript" src="../common/scripts/emxUICoreMenu.js"></script>

<script type="text/javascript" language="JavaScript">
var strColNames = new Array();
strColNames.push('None');
</script>
<script type="text/javascript" language="javascript" src="../common/scripts/emxUIMultiColumnSortUtils.js"></script>
<script type="text/javascript" language="javascript" src="../common/scripts/emxUIDataGridCustom.js"></script>

<script type="text/javascript">
            addStyleSheet("emxUIDialog");
            addStyleSheet("emxUIForm");
            addStyleSheet("emxUIDefault");
</script>
<script type="text/javascript" language="javascript">
function checkField(field)
{
    var strText= trimWhitespace(field.value);
    var STR_SELECTOR_BAD_CHARS = "<%=emxSelectorBadChars.trim()%>";
    var ARR_SELECTOR_BAD_CHARS = "";
    if (STR_SELECTOR_BAD_CHARS != "")
    {
        ARR_SELECTOR_BAD_CHARS = STR_SELECTOR_BAD_CHARS.split(" ");
    }
    badCharacters = checkStringForChars(strText,ARR_SELECTOR_BAD_CHARS,false);
    if(badCharacters.length != 0) {
        alert(INVALID_CHAR_MSG  +"\n"
             + STR_SELECTOR_BAD_CHARS);
        getTopWindow().submitInProgress = false;
        return "false";
    }
    return "true";
}

function validateNameField(uiType)
 {
    var textBox = document.getElementById("txtCustomTextBox");
    // Modified for bug no 345339
    textBox.value = textBox.value.trim();
    if(textBox.value!=null)
    {
        var customTableName = textBox.value;
        if(trimWhitespace(customTableName).length == 0){
            alert("<emxUtil:i18nScript localize="i18nId">emxFramework.UITable.TableName.Alert</emxUtil:i18nScript>");
            getTopWindow().submitInProgress = false;
            return;
        }
        var returnValue = checkField(textBox);
        var found="false";
        if(returnValue=="true"){
            var nameField =textBox.value;
           var defaultTableName = "<%=strTableName%>";
	       defaultTableName =decodeURIComponent(defaultTableName);
            if(customTableName!=defaultTableName){
                for(var i=0;i<derivedTablelist.length;i++){
                    if(derivedTablelist[i]==nameField){
                        found="true";
                        break;
                    }
                }
            }
            if(found=="true"){
            	getTopWindow().submitInProgress = false;
                alert("<emxUtil:i18nScript localize="i18nId">emxFramework.CustomizeTable.View.Name.Alert</emxUtil:i18nScript>");
                return;
            }
            else if(!submitForm(uiType)){
					getTopWindow().submitInProgress = false;
			}
         }
     }
     // Till here

 }
</script>

</head>
<body>
<%
HashMap hmpAvailableColumns             = null;
        MapList mplVisibleColumns               = null;
        MapList mplBasicColumns                 = null;
        MapList mplHiddenColumns                = null;
        MapList mplAttributeColumns             = null;
        MapList mplRelationshipAttributeColumns = null;
        MapList mplExpressionColumns            = null;
        MapList mapInterfaceAttributes          = null;
        HashMap requestMap                      = null;
        HashMap hmpTableData                    = null;
        HashMap hmpTableControlMap              = null;
     String strCurrentTable                  = emxGetParameter(request,"table");
        String strMultiColumnSort               = (String) emxGetParameter(request,"multiColumnSort");
        String strUIType                        = emxGetParameter(request, "uiType");
        String strMode                          = emxGetParameter(request, "mode");
        String strSortDirection                 = emxGetParameter(request,"sortDirection");
        String strSortColumnName                = emxGetParameter(request,"sortColumnName");
String availableColumnMap = emxGetParameter(request,"availableColumnMap");
String currentTableVisibleColumns = emxGetParameter(request,"currentTableVisibleColumns");
String currentTableAttributeList = emxGetParameter(request,"currentTableAttributeList");
String Seperator = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", locale, "emxFramework.Basic.Separator");
String paneSeparator = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", locale, "emxFramework.Basic.Pane_Separator");

        boolean canShowSnippets = Boolean.FALSE;
	boolean isUserTable = Boolean.FALSE;
StringList strlSortDirection    = new StringList();
        StringList strlSortColumnName   = new StringList();
        if(strSortDirection!=null && strSortDirection.contains(","))
             strlSortDirection = FrameworkUtil.split(strSortDirection,",");
        else if(strSortDirection!=null && strSortDirection.length()>0)
            strlSortDirection.add(strSortDirection);

        if(strSortColumnName!=null && strSortColumnName.contains(","))
            strlSortColumnName = FrameworkUtil.split(strSortColumnName,",");
        else if(strSortColumnName!=null && strSortColumnName.length()>0)
            strlSortColumnName.add(strSortColumnName);
String strColumnText            = "";
        String strColumnName            = "";
        String strColumnExpr            = "";
        String strColumnWidth           = "";
        String strColumnLabel           = "";
        int iWidth                      = 0;
        String strSortable              = "";
        String strNameLabel             = "";
        String strAvailableColumnsLabel = "";
        String strVisibleColumnsLabel   = "";
        String strWidthLabel            = "";
        String strRegSuite              = "";
        String strWidthLegendLabel      = "";
        
        java.util.List derivedTableNamesList    = com.matrixone.apps.framework.ui.UITableCustom.getDerivedTableNames(context,strCurrentTable);

        int iFreezePane =Integer.parseInt(emxGetParameter(request, "split"));
		String fullTextSearch = "";
if("edit".equalsIgnoreCase(strMode)){
strCurrentTable=curTable;
}
 try
        {
            strNameLabel            = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", locale, "emxFramework.CustomTable.Name.Label");
            strAvailableColumnsLabel= EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", locale, "emxFramework.CustomTable.AvailableColumns.Label");
            strVisibleColumnsLabel  = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", locale, "emxFramework.CustomTable.VisibleColumns.Label");
            strWidthLabel           = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", locale, "emxFramework.CustomTable.Width.Label");
            strWidthLegendLabel     = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", locale, "emxFramework.UITable.SortBy.Label");            
        }
        catch(Exception e)
        {
            throw(new FrameworkException(e));
        }
if(derivedTableNamesList!=null && derivedTableNamesList.size()>0)
    {
        Iterator itr = derivedTableNamesList.iterator();

        while(itr.hasNext())
        {
            String strDerivedTable = (String)itr.next();
            if(strDerivedTable.indexOf("~")>0)
                strDerivedTable = strDerivedTable.substring(0,strDerivedTable.lastIndexOf("~"));

%>
<script language="JavaScript" type="text/JavaScript">
        derivedTablelist.push('<%=XSSUtil.encodeForJavaScript(context, strDerivedTable)%>');
</script>
<%
        }
    }

%>
<form name="customtable" id='customtable' action="emxCustomizeDataGridProcess.jsp" method="post">
<input type="hidden" name="table"  value='<xss:encodeForHTMLAttribute><%=strCurrentTable%></xss:encodeForHTMLAttribute>' />
<input type="hidden" name="uiType"  value='<xss:encodeForHTMLAttribute><%=strUIType%></xss:encodeForHTMLAttribute>' />
<input type="hidden" name="customTableColValue"  value='' />
<input type="hidden" name="columnsText"  value='' />
<input type="hidden" name="mode"  value='<xss:encodeForHTMLAttribute><%=strMode%></xss:encodeForHTMLAttribute>' />
<input type="hidden" name="multiColumnSort"  value='<xss:encodeForHTMLAttribute><%=strMultiColumnSort%></xss:encodeForHTMLAttribute>' />
<input type="hidden" name="hdnFirstColumnDirection"  value='' />
<input type="hidden" name="hdnThirdColumnDirection"  value='' />
<input type="hidden" name="hdnSecondColumnDirection"  value='' />
<input type="hidden" name="hdnFirstColumn"  value='' />
<input type="hidden" name="hdnThirdColumn"  value='' />
<input type="hidden" name="hdnSecondColumn"  value='' />
<table name="Table3" id="Table3" width="100%" height="5%" cellspacing="2" cellpadding="5%">
    <tr>
        <td width = "30%" class="label" colspan ="1%" ><%=strNameLabel%></td>
        <td width = "70%" class="inputField" colspan ="1%" >
        <input name="txtCustomTextBox" id ="txtCustomTextBox" size ="40%" maxlength=60 value='<%=XSSUtil.encodeForHTMLAttribute(context, strTableName)%>'  onKeypress = "javascript:submitFunction(event)" />
        </td>
    </tr>

</table>
<table name="Table1" id="Table1" height="6%" width="100%" cellspacing="0" cellpadding="5%">
    <tr>
        <td class = "label"  colspan ="1%" width="320" nowrap="nowrap"><%=strAvailableColumnsLabel%></td>
        <td class = "label"  colspan ="1%" align="left"width="100%" nowrap="nowrap" ><%=strVisibleColumnsLabel%></td>

    </tr>
</table>
<table id="parentTable" cellspacing="0" >
<tr>
<td class = "inputField" >
<table id ="Table6"  cellspacing="0" cellpadding="5%" >
<tr>
<td class = "inputField" width="270px;" valign="top" >
<select name="AvailableColumn" id="AvailableColumn" size="13" style="width:270px;" multiple>
	<option value="Separator|Separator||null~0"><xss:encodeForHTML><%=Seperator%></xss:encodeForHTML></option>

</select>
<script>


var currentTableAttributeList = <%=currentTableAttributeList%>;
var  iWidth = 0;

if(Object.keys(currentTableAttributeList).length !== 0){
var select = document.getElementById("AvailableColumn");

	for (var  i = 0, size = currentTableAttributeList.length; i < size; i++) {
		var currentTableAttrList = currentTableAttributeList[i];
		var strColumnName = currentTableAttrList.name;
		var strColumnLabel = currentTableAttrList.displayLabel;
		var strSortable = currentTableAttrList.sortable;
		var strColumnText = currentTableAttrList.expression;
		var strColumnWidth = currentTableAttrList.width;
		var label = currentTableAttrList.label;
		if(strColumnWidth=="default" && strColumnWidth!="null" || strColumnWidth==0){
			iWidth = 0;
		} else {
			iWidth = strColumnWidth/ 8;
		}
iWidth = Math.trunc(iWidth);
var option = document.createElement("OPTION");
option.title = strColumnLabel;
option.value=strColumnName+"|"+strColumnText+"|"+label+"|"+strSortable+"~"+iWidth;
option.text=strColumnLabel;
select.insertBefore(option,select.lastChild)
	}
}
</script>

</select>
</td>
<td class="inputField" valign="top" width="80">
<table id="Table2" name="Table2" align="center" width="100%">
<tr>
    <td class="inputField" align="center"><a href="javascript:moveRight()"> <img id="Rightmove" border="0" src="images/buttonRight.gif" /></a></td>
</tr>
<tr>
    <td class="inputField" align="center"><a href="JavaScript:moveLeft()"> <img id="Leftmove" border="0" src="images/buttonLeft.gif" /> </a></td>
</tr>
<tr>
<td class="inputField" align="center"><a href="JavaScript:remove()"> <img id="Remove" border="0" src="images/buttonRemove.gif" /> </a></td>
</tr>
</table>
</td>
<td class="inputField" valign="top" width="320">
<table>
            <tr>
                <td class="inputField" width="80%"">
                <select name="VisibleColumn" id="VisibleColumn" size="13" style="WIDTH: 270px;"  multiple onclick="displayWidth()" onchange="displayWidth()">
		</select>
<script>
try{
var currentTableVisibleColumns =<%=currentTableVisibleColumns%>;
}catch(err){
var currentTableVisibleColumns = <%=currentTableVisibleColumns%>;
}
var  iWidth = 0;

if(Object.keys(currentTableVisibleColumns).length !== 0){
var select = document.getElementById("VisibleColumn");

	for (var  i = 0, size = currentTableVisibleColumns.length; i < size; i++) {


		var currentTableAttrList = currentTableVisibleColumns[i];
		var strColumnName = currentTableAttrList.name;
		var strColumnLabel = currentTableAttrList.displayLabel;
		var strColumnExpr = currentTableAttrList.expression;
		if((typeof strColumnExpr!= 'undefined') && strColumnExpr!= null && strColumnExpr!= ''){
			strColumnExpr = (strColumnExpr.indexOf(",")>-1) ? strColumnExpr.replace(",", "CO::MM::A") : strColumnExpr;
		} else if(typeof strColumnExpr=="undefined"){
		        strColumnExpr="null";
		}
		var strSortable = currentTableAttrList.sortable;
		var strColumnWidth = currentTableAttrList.width;
		var label = "";
		
		if(strColumnWidth=="default" && strColumnWidth!="null" || strColumnWidth==0){
			iWidth = 0;
		} else {
			iWidth = strColumnWidth / 8;
		}
iWidth = Math.trunc(iWidth);
var option = document.createElement("OPTION");
if( currentTableAttrList["Column Type"] =="separator"){
option.title="[Separator]";
option.value=strColumnName+"|"+strColumnExpr+"|"+label+"|"+strSortable+"~"+0;
option.text ="[Separator]";
}else{
option.title = strColumnLabel;
option.value=strColumnName+"|"+strColumnExpr+"|"+label+"|"+strSortable+"~"+iWidth;
option.text=strColumnLabel;
}
select.insertBefore(option,select.lastChild)
var iFreezePane = "<%=iFreezePane%>";
if((iFreezePane<=0) && (i==0)){
var option1 = document.createElement("OPTION");
	option1.title = "<%=paneSeparator%>";
option1.value="paneSeparator@SB|paneSeparator|freezePane|false~0";
option1.text="<%=paneSeparator%>";
select.insertBefore(option1,select.lastChild)
	}if((iFreezePane>0) && (i==iFreezePane-1)){
var option1 = document.createElement("OPTION");
option1.title = "<%=paneSeparator%>";
option1.value="paneSeparator@SB|paneSeparator|freezePane|false~0";
option1.text="<%=paneSeparator%>";
select.insertBefore(option1,select.lastChild)
		}
    }
}
</script>
 </td>
    <td valign="top">
    <table align="center">
    <tr>
    <td class="inputField" valign="top"><a href="JavaScript:moveUp()"> <img src="images/buttonArrangeUp.gif" border="0" /> </a></td>
    </tr>
    <tr>
    <td class="inputField" valign="top"><a href="JavaScript:moveDown()"> <img src="images/buttonArrangeDown.gif" border="0" /> </a></td>
    </tr>
    </table>
    </td>
    </tr>
</table>
 <table width="100%">

                <tr>
                    <td class="inputField" valign="top" width="100%">
                    <fieldset style="WIDTH: 100%; display:none;" >
                    <legend><%=strWidthLegendLabel %></legend>
                    <table name="multiColSort" id="multiColSort" width="100%" cellpadding="2" cellspacing="3" align="center">
                        <tr>
                            <td class="inputField" >&nbsp;</td>
                            <td class="inputField"><img src="images/iconSortAscending.gif" border="0" /></td>
                            <td class="inputField"><img src="images/iconSortDescending.gif" border="0" /></td>
                        </tr>
                        <tr>

                            <td class="inputField">                            
                            <select name="firstColumn" id="firstColumn" style="max-width: 270px;" onchange="javascript:populateSecondOption();javascript:populateThirdOption();populate();conflict()">
                            </select>
                            </td>
                            <td class="inputField"><input type="radio" name="firstSortDirection" value ="ascending" checked /></td>
                            <td class="inputField"><input type="radio" name="firstSortDirection" value ="descending" /></td>
                        </tr>
                        <tr>

                            <td class="inputField"><select name="secondColumn" id="secondColumn" style="max-width: 270px;"  onchange="javascript:populateThirdOption();populate();conflict()">
                            </select></td>
                            <td class="inputField"><input type="radio" name="secondSortDirection" value ="ascending" checked /></td>
                            <td class="inputField"><input type="radio" name="secondSortDirection" value ="descending" /></td>
                        </tr>
                        <tr>

                            <td class="inputField"><select name="thirdColumn" id="thirdColumn" style="max-width: 270px;" onchange="javascript:populate();conflict()">
                            </select></td>
                            <td class="inputField"><input type="radio" name="thirdSortDirection"  value ="ascending" checked /></td>
                            <td class="inputField"><input type="radio" name="thirdSortDirection" value ="descending" /></td>
                        </tr>
                    </table>
                    </fieldset>
        </td>
        </tr>
        </table>
        </td>

    </tr>
    </table>
    </td>
    <td width="100%" class="inputField">
    </td>
    </tr>
    </table>
<%

            if("false".equalsIgnoreCase(strMultiColumnSort))
            {
%>
                <script type="text/javascript" language="JavaScript">
                    disableSort('multiColSort');
                </script>
<%
            }
            else
            {
                if(strSortColumnName!=null)
                {
                    for(int i=0;i<strlSortColumnName.size();i++)
                    {
                        String sortColumnName = (String)strlSortColumnName.get(i);
                        if(!"".equals(sortColumnName))
                        {

%>
                        <script type="text/javascript" language="JavaScript">
                            selectedColumns.push('<xss:encodeForJavaScript><%=sortColumnName%></xss:encodeForJavaScript>');
                        </script>
<%
                        }
                    }
                }
                if(strSortDirection!=null)
                {
                    for(int i=0;i<strlSortDirection.size();i++)
                    {

%>
                        <script type="text/javascript" language="JavaScript">
                            selectedDirection.push('<xss:encodeForJavaScript><%=(String) strlSortDirection.get(i)%></xss:encodeForJavaScript>');
                        </script>
<%
                    }
                }
%>
             <script type="text/javascript" language="JavaScript">
                document.getElementById("txtCustomTextBox").focus();
                setColumn();
                var newcustomtable = document.customtable;
                loadData(selectedColumns,selectedDirection,newcustomtable.firstSortDirection,newcustomtable.secondSortDirection,newcustomtable.thirdSortDirection);
            </script>
<%
            }
%>
</form>
</body>

</html>

