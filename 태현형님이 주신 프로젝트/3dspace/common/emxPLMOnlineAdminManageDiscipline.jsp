<%@include file = "../common/emxNavigatorInclude.inc"%>
<%@ page import="com.dassault_systemes.pos.resource.interfaces.PLMxPosDisciplineServices" %>
<%@ page import="com.dassault_systemes.pos.resource.interfaces.IPLMxPosResourceManager" %>
<%@ page import="com.dassault_systemes.pos.resource.interfaces.PLMxPosManagerAccess" %>
<%@ page import="com.dassault_systemes.pos.resource.interfaces.IPLMxPosDiscipline" %>
<%@include file = "../common/emxPLMOnlineAdminAttributesCalculation.jsp"%>
<%@include file = "../common/emxPLMOnlineAdminAuthorize.jsp"%>
<html>
  <head> 
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>
  <%
        String disciplines = emxGetParameter(request,"disciplines");
        String parentdiscipline = emxGetParameter(request,"parentDisciplines");
		String message = getNLSMessageWithParameter("CONF_HasBeenCreated","Dsicipline");
		// ALU4 2020:03:11 TSK5602766 raise message for success or failure  
		String errorBuffer = "";
        if (parentdiscipline == null ) parentdiscipline="";
         
        String[] subDisciplines = disciplines.split(",,");

        if(parentdiscipline.equals("")){
            for(int i = 1; i < subDisciplines.length ; i++){
				IPLMxPosDiscipline disc = null;
				try
				{
					manageContextTransaction(mainContext,"start");
					IPLMxPosResourceManager irm = PLMxPosManagerAccess.getResourceManager();
					disc = irm.createDiscipline(mainContext,subDisciplines[i],subDisciplines[i]);
					
					manageContextTransaction(mainContext,"end");
				} catch(Exception e){
					disc = null;
					manageContextTransaction(mainContext,"abort");
				}
				// if(null == disc)
				{
					// errorBuffer+=" "+subDisciplines[i] ;
					errorBuffer+=" "+subDisciplines[i] + "->"+disc;
				}
            }
          }else{
            for(int i = 1; i < subDisciplines.length ; i++){
				int res = -1;
				try
				{
					manageContextTransaction(mainContext,"start");
					res =PLMxPosDisciplineServices.createSubDiscipline(mainContext,parentdiscipline,subDisciplines[i],subDisciplines[i]);
					manageContextTransaction(mainContext,"end");
				} catch(Exception e){
					res = -1;
					manageContextTransaction(mainContext,"abort");
				}
				// if(res == -1)
				{
					// errorBuffer+=" "+subDisciplines[i];
					errorBuffer+=" "+subDisciplines[i]+"->"+res;
				}
            }
          }

		if(!"".equals(errorBuffer))
		{
			message = getNLSMessageWithParameter("ERR_IDAlreadyExist","Discipline") + ":"+errorBuffer;
		}
		
        if(!parentdiscipline.equals("")){
        %>
            <jsp:forward page="emxPLMOnlineAdminDisciplineDetails.jsp">
                <jsp:param name="disc" value="<%=parentdiscipline%>"></jsp:param>
                <jsp:param name="source" value="notRoot"></jsp:param>
                <jsp:param name="message" value="<%=message%>"></jsp:param>
            </jsp:forward>
        <%}else{%>
            <jsp:forward page="emxPLMOnlineAdminDisciplineDetails.jsp">
                <jsp:param name="disc" value="<%=parentdiscipline%>"></jsp:param>
                <jsp:param name="message" value="<%=message%>"></jsp:param>
            </jsp:forward>
        <%}%>
  </body>
</html>
