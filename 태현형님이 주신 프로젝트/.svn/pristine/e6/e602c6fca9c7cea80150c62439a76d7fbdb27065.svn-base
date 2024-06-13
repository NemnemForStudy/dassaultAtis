<%--  MCADGenericFooterPage.jsp

   Copyright (c) 2016-2020 Dassault Systemes. All rights reserved.
   This program contains proprietary and trade secret information of
   Dassault Systemes and its subsidiaries. Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

--%>

<%@ include file ="MCADTopInclude.inc" %>

<%
	MCADIntegrationSessionData integSessionData = (MCADIntegrationSessionData) session.getAttribute("MCADIntegrationSessionDataObject");

	// IR-757855-3DEXPERIENCER2019x : to differetiate between applet UI and applet free UI
	matrix.db.Context Context = integSessionData.getClonedContext(session);
	MCADMxUtil util = new MCADMxUtil(Context, integSessionData.getLogger(), integSessionData.getResourceBundle(), integSessionData.getGlobalCache());
	boolean bEnableAppletFreeUI = util.IsAppletFreeUI(Context);
	
	String buttonName	= emxGetParameter(request, "buttonName");
	String buttonLabel	= null;
	String buttonContinue = null;
	String clickContinueOrCancelButton	= null;
	if(buttonName!=null && buttonName.equalsIgnoreCase("Close"))
		buttonLabel = integSessionData.getStringResource("mcadIntegration.Server.ButtonName.Close");
	else if(buttonName!=null && buttonName.equalsIgnoreCase("ContinueCancel"))
	{
		buttonContinue = integSessionData.getStringResource("mcadIntegration.Server.ButtonName.Continue");
		buttonLabel = integSessionData.getStringResource("mcadIntegration.Server.ButtonName.Cancel");
		clickContinueOrCancelButton	= integSessionData.getStringResource("mcadIntegration.Server.Message.ClickContinueOrCancelButton");
	}
	else
		buttonLabel = integSessionData.getStringResource("mcadIntegration.Server.ButtonName.Cancel");
%>

<script language="JavaScript" type="text/javascript">
	function ContinueButtonAction()
	{
	    top.opener.doContinueButtonAction();
		top.close();
	}
</script>
                                               
<html>
<head>
<link rel="stylesheet" href="./styles/emxIEFCommonUI.css" type="text/css">
</head>
<body>
<form name="bottomCommonForm" >
  <!--XSSOK-->
  <%if(buttonName != null && buttonName.equalsIgnoreCase("ContinueCancel")) {%>
  <%=clickContinueOrCancelButton %>
	<%}%>

<table border="0" cellspacing="0" cellpadding="0" align=right>
  <tr><td>&nbsp</td></tr>
  <tr>
  <%if(buttonName != null && buttonName.equalsIgnoreCase("ContinueCancel")) {%>

        <td align="right"><a href="javascript:ContinueButtonAction()"><img src="../integrations/images/emxUIButtonNext.gif" border="0"></a>&nbsp</td>
	<!--XSSOK-->
        <td align="right"><a href="javascript:ContinueButtonAction()"><%=buttonContinue%></a>&nbsp&nbsp;</td>
     <td align="right"><a href="javascript:top.close()"><img src="../integrations/images/emxUIButtonCancel.gif" border="0"></a>&nbsp</td>
     <!--XSSOK-->
     <td align="right"><a href="javascript:top.close()"><%= buttonLabel %></a>&nbsp&nbsp;</td>

	<%} // IR-757855-3DEXPERIENCER2019x : to differetiate between applet UI and applet free UI.
  		// we close promote window in case of error for applet free UI
  		else if(bEnableAppletFreeUI){ %>

     <td align="right"><a href="javascript:top.opener.close();javascript:top.close()"><img src="../integrations/images/emxUIButtonCancel.gif" border="0"></a>&nbsp</td>
     <!--XSSOK-->
     <td align="right"><a href="javascript:top.opener.close();javascript:top.close();"><%= buttonLabel %></a>&nbsp&nbsp;</td>
	<script language="JavaScript" type="text/javascript">
		window.onbeforeunload = function(){
			top.opener.close();
		}
	</script>
    <%} else { %>

     <td align="right"><a href="javascript:top.close()"><img src="../integrations/images/emxUIButtonCancel.gif" border="0"></a>&nbsp</td>
     <!--XSSOK-->
     <td align="right"><a href="javascript:top.close()"><%= buttonLabel %></a>&nbsp&nbsp;</td>

        <%}%>
	</tr>  
 </table>


</form>

</body>
</html>
