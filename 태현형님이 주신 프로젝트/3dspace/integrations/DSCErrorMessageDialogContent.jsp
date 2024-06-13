<%--  DSCErrorMessageDialogContent.jsp

   Copyright (c) 2016-2020 Dassault Systemes. All rights reserved.
   This program contains proprietary and trade secret information of
   Dassault Systemes and its subsidiaries. Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

--%>

<%@ include file ="MCADTopInclude.inc" %>
<%
	MCADIntegrationSessionData integSessionData = (MCADIntegrationSessionData) session.getAttribute("MCADIntegrationSessionDataObject");
    Context context = integSessionData.getClonedContext(session);

%>

<html>
<head>
<link rel="stylesheet" href="../integrations/styles/emxIEFCommonUI.css" type="text/css">
</head>
<body>
<script language="JavaScript" src="./scripts/MCADUtilMethods.js" type="text/javascript"></script>
<script language="JavaScript" src="../common/scripts/emxUICore.js" type="text/javascript"></script>
<script language="JavaScript">

		var message = top.opener.top.messageToShow;	
		if(!message)
		{
			message = top.opener.messageToShow;
		}
		
        message = unescape(message);
		
        //IR-760784 : FUN098015 : For applet free promote UI
        var appletObject = null;
        var integrationFrame = getIntegrationFrame(this);
        if(integrationFrame != null && integrationFrame)
        {
        	if (typeof integrationFrame.getAppletObject === "function") 
        	{
        		appletObject = integrationFrame.getAppletObject(); 
        	}
        }

      	//IR-760784 : FUN098015 : For applet free promote UI
        function callTreeTableUIObject(methodname, argument)
        {
        	if(appletObject == null)
        	{
        		var boolbar = false;
        		var response = "";
        		var xhttp = new XMLHttpRequest();
        		
        		//IR-766723 the appname like 3DSpace should be taken from web.xml as it may vary customer to customer
        		var appName = '<%=application.getInitParameter("ematrix.page.path")%>';

        		xhttp.open("POST", appName + "/servlet/IEFCommandsServlet?"+methodname+"=xyz&Command="+methodname+"&appletfree=true", false);
        		
        		//xhttp.open("POST", "/3DSpace/servlet/IEFCommandsServlet?"+methodname+"=xyz&Command="+methodname+"&appletfree=true", false);
        		xhttp.setRequestHeader("Content-type", "application/octet-stream");
        		xhttp.send(argument);
        	
        		if (xhttp.status === 200) {
        			response = xhttp.responseText;
        		}
        		return response;
        	}
        	else
        	{
        		return appletObject.callTreeTableUIObject(methodname, argument);
        	}
        }

		function csvExport()
		{			
			//IR-760784 : FUN098015 : For applet free promote UI
			var result			= callTreeTableUIObject("updateCSVData", message);
			if(result.indexOf("ERROR") == -1)
			{
				var tableURL="IEFTableExport.jsp?timeStamp=" + result;
				frames.location.href = tableURL;
			}
		}

		document.write("<table border='0' cellspacing='0' cellpadding='5' width='100%'>");
		document.write("<tr>");
		document.write("<td width='100%' class='node'>" + message + "</td>");
		document.write("</tr>");
		document.write("</table>");

<%   
    	String callBackFunction = Request.getParameter(request,"callBackFunction");
		
		if(callBackFunction == null)
			callBackFunction = "";

		if( callBackFunction != null && !callBackFunction.equals(""))
		{
%>
			window.onload=function()
			{
					var callbackFunction = eval(top.opener.top.<%=XSSUtil.encodeForJavaScript(context,callBackFunction)%>);	
					
					if(!callbackFunction)
					{
						callbackFunction = eval(top.opener.<%=XSSUtil.encodeForJavaScript(context,callBackFunction)%>);	
					}

					if(callbackFunction)
						callbackFunction();
			}
<%
		}
%>

	</script>
</body>
<html>
