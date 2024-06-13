<%--  emxTablePaginationController.jsp
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxTablePaginationController.jsp.rca 1.12 Wed Oct 22 15:48:49 2008 przemek Experimental przemek $
--%>

<%@include file = "emxNavigatorInclude.inc"%>

<%@include file = "emxNavigatorTopErrorInclude.inc"%>

<jsp:useBean id="tableBean" class="com.matrixone.apps.framework.ui.UITable" scope="session"/>

<html>
<head>
<%@include file = "emxUIConstantsInclude.inc"%>
</head>

<body>
<%
	boolean blnPaginateComplete = true;
	String timeStamp = emxGetParameter(request, "timeStamp");
    String displayMode = emxGetParameter(request, "displayMode");
    String sPage = emxGetParameter(request, "page");

	try
	{
	    if (timeStamp != null)
	    {
	    ContextUtil.startTransaction(context, true);
	    HashMap tableData = tableBean.getTableData(timeStamp);

	    /*if("singlePage".equals(displayMode))
	    {
	        PersonUtil.setPaginationPreference(context,"false");
	    }
	    else if("multiPage".equals(displayMode))
	    {
	        PersonUtil.setPaginationPreference(context,"true");
	    }*/

	    tableBean.setPaginationData(context, tableData, displayMode, sPage);
	    }
	    else
	    {
	        blnPaginateComplete = false;
	    }
	}
	catch(Exception ex)
	{
		blnPaginateComplete = false;
	    ContextUtil.abortTransaction(context);
	    if(ex.toString() != null && (ex.toString().trim()).length()>0)
	    {
	        emxNavErrorObject.addMessage("emxTablePagination: " + ex.toString().trim());
	    }
	} finally {
	    ContextUtil.commitTransaction(context);
	}

	if(blnPaginateComplete){
%>
<script language="JavaScript" type="text/javascript">
if(typeof parent.listDisplay!="undefined")
  {
    parent.listDisplay.location.href = parent.listDisplay.location.href;
    parent.loadFooter();
  }
else {
    var framename=findFrame(getTopWindow(), "detailsDisplay");
	if(typeof framename.listDisplay=="undefined"){
		framename=findFrame(getTopWindow(), "AEFLifecycleTaskSignatures");
	if(framename == null || typeof framename.listDisplay=="undefined"){
			framename=findFrame(getTopWindow(), "AEFLifecycleApprovals");
		}
		if(framename == null || typeof framename.listDisplay=="undefined"){
			framename=findFrame(top,"listDisplay").parent ;
		}
	}
	   framename.listDisplay.location.href = framename.listDisplay.location.href;
       framename.loadFooter();
	   framename.turnOffProgress();
}
        //parent.listFoot.location.href = parent.listFoot.location.href;
</script>
<%
	}
%>
<script language="JavaScript" type="text/javascript">
	parent.turnOffProgress();
</script>
<%@include file = "emxNavigatorBottomErrorInclude.inc"%>
</body>
</html>
