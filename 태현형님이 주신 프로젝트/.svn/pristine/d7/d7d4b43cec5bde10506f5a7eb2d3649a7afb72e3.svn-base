<%--  emxProgramCentralWeeklyTimesheetUtil.jsp

  Copyright (c) 1992-2020 Dassault Systemes.

  All Rights Reserved.
  This program contains proprietary and trade secret information
  of MatrixOne, Inc.  Copyright notice is precautionary only and
  does not evidence any actual or intended publication of such program

  static const char RCSID[] = $Id: emxProgramCentralWeeklyTimesheetUtility.jsp.rca 1.37 Tue Oct 28 22:59:43 2008 przemek Experimental przemek $

--%>

<%@ include file="emxProgramGlobals2.inc"%>
<%@ include file="../emxUICommonAppInclude.inc"%>

<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="java.util.Map"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<script language="javascript" src="../common/scripts/emxUICore.js"></script>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<script language="javascript" src="../common/scripts/emxUIFormValidation.js"></script>
<%@page import="matrix.util.StringList"%>

<%@include file="../emxUICommonHeaderBeginInclude.inc"%>
<%@ page import="com.matrixone.apps.program.Assessment"%>
<%@ page import="com.matrixone.apps.domain.util.PersonUtil"%>
<%@ page import="com.matrixone.apps.domain.util.i18nNow"%>
<%@ page import="com.matrixone.apps.program.ProgramCentralConstants" %>
<%
String mode = emxGetParameter(request,"mode");
String language  = request.getHeader("Accept-Language");

 if("copySelect".equalsIgnoreCase(mode)){

  try {
   String tableRowId = emxGetParameter(request,"emxTableRowId");
   String[] objectIds = tableRowId.split("\\|");
   String objectId = objectIds[1];
   objectId = XSSUtil.encodeURLForServer(context,objectId);

   String parentOID = emxGetParameter(request,"parentOID");
   Assessment assessment = new Assessment();
   String objectNew = assessment.copySelected (context, parentOID, objectId);
   
   %>
   <script language="javascript">
//        var url = "../common/emxForm.jsp?form=PMCCreateAssessment&mode=edit&suiteKey=ProgramCentral&formHeader=emxProgramCentral.Common.FormBasics&HelpMarker=emxhelpassessmentdetailsdialog&submitAction=refreshCaller&cancelProcessJPO=emxAssessment:deleteAssessment&objectId=<%=XSSUtil.encodeForURL(context,objectNew)%>";
//        var url = "../common/emxForm.jsp?form=PMCCreateAssessment&mode=edit&suiteKey=ProgramCentral&formHeader=emxProgramCentral.Common.FormBasics&HelpMarker=emxhelpassessmentdetailsdialog&submitAction=refreshCaller&hideCancel=true&objectId=<%=XSSUtil.encodeForURL(context,objectNew)%>";
//        getTopWindow().showSlideInDialog(url,true);
        var topFrame = findFrame(getTopWindow(), "PMCAssessment");
        topFrame.location.href = topFrame.location.href;
   </script>
  <%
  } catch(Exception ex) {
      String errorMessage = ex.getMessage();
      %>
      <script language="javascript">
          alert("<%=XSSUtil.encodeForJavaScript(context,errorMessage)%>");
      </script>
      <%
  }


} else if("copyPrevious".equalsIgnoreCase(mode)){
    try {
    String parentOID = emxGetParameter(request,"parentOID");
    Assessment assessment = new Assessment();
    String objectNew = assessment.copyPrevious(context, parentOID);
    %>
    <script language="javascript">
//         var url = "../common/emxForm.jsp?form=PMCCreateAssessment&mode=edit&suiteKey=ProgramCentral&formHeader=emxProgramCentral.Common.FormBasics&HelpMarker=emxhelpassessmentdetailsdialog&submitAction=refreshCaller&postProcessJPO=emxAssessment:postProcessAssessment&objectId=<%=XSSUtil.encodeForURL(context,objectNew)%>";
//         var url = "../common/emxForm.jsp?form=PMCCreateAssessment&mode=edit&suiteKey=ProgramCentral&formHeader=emxProgramCentral.Common.FormBasics&HelpMarker=emxhelpassessmentdetailsdialog&submitAction=refreshCaller&cancelProcessJPO=emxAssessment:deleteAssessment&objectId=<%=XSSUtil.encodeForURL(context,objectNew)%>";
//         var url = "../common/emxForm.jsp?form=PMCCreateAssessment&mode=edit&suiteKey=ProgramCentral&formHeader=emxProgramCentral.Common.FormBasics&HelpMarker=emxhelpassessmentdetailsdialog&submitAction=refreshCaller&hideCancel=true&objectId=<%=XSSUtil.encodeForURL(context,objectNew)%>";
//         getTopWindow().showSlideInDialog(url,true);
        var topFrame = findFrame(getTopWindow(), "PMCAssessment");
        topFrame.location.href = topFrame.location.href;
    </script>
    <%
    } catch(Exception ex) {
        String errorMessage = ex.getMessage();
        %>
        <script language="javascript">
            alert("<%=XSSUtil.encodeForJavaScript(context,errorMessage)%>");
        </script>
        <%
    }

} else if ("deleteAssessment".equalsIgnoreCase(mode)){

    String[] selectedIds = emxGetParameterValues(request,"emxTableRowId");
    String[] strObjectIDArr    = new String[selectedIds.length];
    String sObjId = "";
    for(int i=0; i<selectedIds.length; i++)
    {
        String sTempObj = selectedIds[i];
        Map mParsedObject = ProgramCentralUtil.parseTableRowId(context,sTempObj);
        sObjId = (String)mParsedObject.get("objectId");
        strObjectIDArr[i] = sObjId;
     }
     if ( strObjectIDArr != null )
     {
         try {
           DomainObject.deleteObjects(context,strObjectIDArr);
         } catch(Exception e)  {
           session.setAttribute("error.message", e.getMessage());
         }
     }
      %>
      <script language="javascript" type="text/javaScript">
        var topFrame = findFrame(getTopWindow(), "PMCAssessment");
        topFrame.location.href = topFrame.location.href;
      </script>
      <%

} else if ("findAssessor".equalsIgnoreCase(mode)){

    String fieldNameDisplay = emxGetParameter(request, "fieldNameDisplay");
    fieldNameDisplay = XSSUtil.encodeURLForServer(context, fieldNameDisplay);
    String fieldNameActual = emxGetParameter(request, "fieldNameActual");
    fieldNameActual = XSSUtil.encodeURLForServer(context, fieldNameActual);
    String fieldNameOID = emxGetParameter(request, "fieldNameOID");
    fieldNameOID = XSSUtil.encodeURLForServer(context, fieldNameOID);

    String assessmentId = emxGetParameter(request, "objectId");
    Assessment assessment = new Assessment(assessmentId);
    StringList busSelects = new StringList();
    busSelects.add(ProgramCentralConstants.SELECT_ID);
    Map projectMap = assessment.getRelatedObject(context, Assessment.RELATIONSHIP_PROJECT_ASSESSMENT, false, busSelects, null);
    String projectId = (String) projectMap.get(ProgramCentralConstants.SELECT_ID);
    String strURL = "../common/emxFullSearch.jsp?field=TYPES=type_Person:CURRENT=policy_Person.state_Active&table=PMCCommonPersonSearchTable&selection=multiple&includeOIDprogram=emxAssessment:getPeopleForAssessor&showInitialResults=true";
    strURL +="&objectId=" + XSSUtil.encodeForURL(context, projectId);
    strURL +="&submitURL=../common/AEFSearchUtil.jsp";
    strURL +="&fieldNameDisplay="+fieldNameDisplay;
    strURL +="&fieldNameActual="+fieldNameActual;
    strURL +="&fieldNameOID="+XSSUtil.encodeForURL(context, fieldNameOID);
        %>
        <script language="javascript">
           <%-- XSSOK--%>
            var url = "<%=strURL%>";
            url = url + "&frameNameForField="+parent.name;
            showModalDialog(url);
        </script>
       <%
  }
%>


