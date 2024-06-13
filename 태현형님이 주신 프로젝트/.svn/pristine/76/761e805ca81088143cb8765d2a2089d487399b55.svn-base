<%--  emxPrefConversions.jsp -
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxPrefConversions.jsp.rca 1.12 Wed Oct 22 15:48:04 2008 przemek Experimental przemek $
--%>

<%@page import="com.matrixone.apps.framework.ui.UIUtil,java.util.*"%>
<%@include file = "emxNavigatorInclude.inc"%>
<HTML>
<%@include file = "emxNavigatorTopErrorInclude.inc"%>
  <HEAD>
    <TITLE></TITLE>
    <META http-equiv="imagetoolbar" content="no" />
    <META http-equiv="pragma" content="no-cache" />
    <SCRIPT language="JavaScript" src="scripts/emxUIConstants.js"
    type="text/javascript">
    </SCRIPT>
    <script language="JavaScript" src="scripts/emxUICore.js"></script>
    <SCRIPT language="JavaScript" src="scripts/emxUIModal.js"
          type="text/javascript">
    </SCRIPT>
    <SCRIPT language="JavaScript" src="scripts/emxUIPopups.js"
          type="text/javascript">
    </SCRIPT>
    <script src="../webapps/AmdLoader/AmdLoader.js" type="text/javascript"></script>
    <SCRIPT type="text/javascript">
      /*  addStyleSheet("emxUIForm");
       addStyleSheet("emxUIDefault"); */

       /* function doLoad() {
         if (document.forms[0].elements.length > 0) {
           var objElement = document.forms[0].elements[0];

           if (objElement.focus) objElement.focus();
           if (objElement.select) objElement.select();
         }
       } */
       
       function preventDefaultEventonSubmit(){
    	   if(event.submitter.className == "wux-controls-button wux-controls-combobox-expander"){
    		   event.preventDefault();
    	   }
       }
       
    </SCRIPT>
  </HEAD>
  <BODY onload="turnOffProgress()">
  <SCRIPT>
  addStyleSheet("emxUIForm");
  addStyleSheet("emxUIDefault");
  </SCRIPT>
    <FORM method="post" onsubmit="preventDefaultEventonSubmit()" action="emxPrefConversionsProcessing.jsp">
      <TABLE border="0" cellpadding="5" cellspacing="2"
             width="100%">
        <TR>
          <TD width="150" class="label">
            <emxUtil:i18n localize="i18nId">emxFramework.Preferences.Currency</emxUtil:i18n>
          </TD>
          <TD class="inputField">
            <TABLE class="combobox-currency" border="0">
            <TR width="150%">
<%
    try
    {
    ContextUtil.startTransaction(context, false);
    // Get Currency choices
    String asEntered = UINavigatorUtil.getI18nString("emxFramework.Preferences.Currency.As_Entered", "emxFrameworkStringResource", request.getHeader("Accept-Language"));
    String attribute_Currency =PropertyUtil.getSchemaProperty(context, "attribute_Currency");
    AttributeType attributeCurrency = new AttributeType(attribute_Currency);
    StringList currencyChoices = new StringList();
                    try
                    {
                        attributeCurrency.open(context);
                        currencyChoices = attributeCurrency.getChoices();
                        }catch(Exception mx)
                        {}
    currencyChoices.insertElementAt("As Entered", 0);
    //Collections.sort((java.util.List)currencyChoices);
    // Get Currency preference set for logged in user
    /* String currencyDefault = PersonUtil.getCurrency(context);
    if(currencyDefault==null || currencyDefault.trim().length()== 0)
    {
      currencyDefault="As Entered";
    } */

%>

<script type="text/javascript" language="JavaScript">

require(['DS/Controls/ComboBox'],
		function (WUXComboBox) {
		    'use strict';
		    var myComboBox ;
		    var currencyArray = [];
		     <%
		     HashMap<String, String> hmap = new HashMap<String, String>();
		     String[] actualValueArr = new String[171];
		     String[] displayValueArr = new String[171];
		     int len = actualValueArr.length;
		     for(int i=0;i<len;i++){
		    	 actualValueArr[i]="i";
		    	 displayValueArr[i]="i";
		        }
		     for(int i=0;i< currencyChoices.size(); i++){
		    	
		    	 //get choice
		    	 String choice = (String)currencyChoices.get(i);
		    	// translate the choice
		    	 String strChoice = choice.replace('-', '_');
		         String choicePropKey = "emxFramework.Range.Currency." + strChoice.replace(' ', '_');
		         String choicePropValue = UINavigatorUtil.getI18nString(choicePropKey, "emxFrameworkStringResource", request.getHeader("Accept-Language"));

		         // if translation not found then show choice.
		         if (choicePropValue == null || choicePropValue.equals(choicePropKey))
		         {
		             choicePropValue = choice;
		         }
		    displayValueArr[i]=   choicePropValue;
		    hmap.put(choicePropValue,choice);
		     }
		     
		     String selectedCurrency = PersonUtil.getCurrency(context);
		     if(UIUtil.isNullOrEmpty(selectedCurrency))
		     {
		    	 selectedCurrency="As Entered";
		     }

		     Arrays.sort(displayValueArr);
			 for(int i=0;i<displayValueArr.length;i++){
				 if(hmap.containsKey(displayValueArr[i])){
		    		  String temp = (String)hmap.get(displayValueArr[i]);
		    		  actualValueArr[i]=temp;
		    	  }  
			 }
			 %>
			 
			 var displayValue=[];
			 var actualValue=[];
			 
			 <%
			 
			 for(int i=0;i<displayValueArr.length;i++){
				 
				 String temp = displayValueArr[i];
				 temp = temp.replace("'", "\\'");
				 %>
				 displayValue[<%=i%>]= '<%=temp%>';
			<%	 
			 }
			 
             for(int i=0;i<actualValueArr.length;i++){
				 
				 String temp = actualValueArr[i];
				 %>
				 actualValue[<%=i%>]= '<%=temp%>';
			<%	 
             } 
			 
			 %>
             
		     var sIndex = actualValue.indexOf('<%=selectedCurrency%>');
			
		     var selCurrency = '<%=selectedCurrency%>';
		     
		     myComboBox = new WUXComboBox({
		    	 elementsList : displayValue,
		    	 selectedIndex : sIndex,
		    	 actionOnClickFlag : false, 
		    	 enableSearchFlag : true
		     });
		     myComboBox.inject(document.getElementsByClassName("combobox-currency")[0]);
		     
		     myComboBox.addEventListener('change', function(){
					var newValue = myComboBox.elementsList[myComboBox.selectedIndex];
		    	    var indx =displayValue.indexOf(newValue);
		    	    var selValue = actualValue[indx];
					document.getElementById("currency").value = selValue;
				});
		     if(document.getElementById("currency").value==null || document.getElementById("currency").value==""){
		     document.getElementById("currency").value = selCurrency;
		     }
	});    
</script>
                
              </TR>
            </TABLE>
          </TD>
        </TR>
        <TR>
          <TD>
            &nbsp;
          </TD>
          <TD>
            &nbsp;
          </TD>
        </TR>
        <TR>
          <TD width="150" class="label">
            <emxUtil:i18n localize="i18nId">emxFramework.Preferences.UnitOfMeasure</emxUtil:i18n>
          </TD>
          <TD class="inputField">
            <TABLE border="0">
<%
    // Get Unit Of Measure choices
    String english = UINavigatorUtil.getI18nString("emxFramework.Preferences.UnitOfMeasure.English", "emxFrameworkStringResource", request.getHeader("Accept-Language"));
    String metric = UINavigatorUtil.getI18nString("emxFramework.Preferences.UnitOfMeasure.Metric", "emxFrameworkStringResource", request.getHeader("Accept-Language"));

    // Get UOM preference set for logged in user
    String unitOfMeasureDefault = PersonUtil.getUnitOfMeasure(context);
    if(unitOfMeasureDefault==null || unitOfMeasureDefault.trim().length()== 0)
    {
        unitOfMeasureDefault="As Entered";
    }

    String strChecked = "";

    if (unitOfMeasureDefault.equals("As Entered"))
    {
        strChecked = "checked";
    }

%>
<TR>
    <!-- //XSSOK -->
    <TD><INPUT type="radio" name="unitOfMeasure" id="unitOfMeasure" value="As Entered" <%=strChecked%> />&nbsp;<%=asEntered%></TD>
</TR>

<%
    strChecked = "";
    if (unitOfMeasureDefault.equals("English"))
    {
        strChecked = "checked";
    }
%>

<TR>
    <!-- //XSSOK -->
    <TD><INPUT type="radio" name="unitOfMeasure" id="unitOfMeasure" value="English" <%=strChecked%> />&nbsp;<%=english%></TD>
</TR>

<%
    strChecked = "";
    if (unitOfMeasureDefault.equals("Metric"))
    {
        strChecked = "checked";
    }
%>

<TR>
    <!-- //XSSOK -->
    <TD><INPUT type="radio" name="unitOfMeasure" id="unitOfMeasure" value="Metric" <%=strChecked%> />&nbsp;<%=metric%></TD>
</TR>

<%
    }
    catch (Exception ex)
    {
        ContextUtil.abortTransaction(context);

        if(ex.toString()!=null && (ex.toString().trim()).length()>0)
        {
            emxNavErrorObject.addMessage("emxPrefConversions:" + ex.toString().trim());
        }
    }
    finally
    {
        ContextUtil.commitTransaction(context);
    }
%>
            </TABLE>
          </TD>
        </TR>
      </TABLE>
      <INPUT type="hidden" name="currency" id="currency" value="" checked />
    </FORM>
  </BODY>

<%@include file = "emxNavigatorBottomErrorInclude.inc"%>

</HTML>


