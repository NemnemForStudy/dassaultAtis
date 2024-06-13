<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file="../common/emxNavigatorInclude.inc"%>

<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script src="../common/scripts/emxUICore.js" type="text/javascript"></script>

<%
try {
	ContextUtil.pushContext(context);
	
	String strObjId = emxGetParameter(request, "objectId");  
    String strRelName = emxGetParameter(request, "relName");   
    String strGetFrom = emxGetParameter(request, "getFrom");   
    String strRowId[] = emxGetParameterValues(request, "emxTableRowId");
    String strReplace = emxGetParameter(request, "replace");   
    String strPortalCmdName = emxGetParameter(request, "portalCmdName");   
    
    StringList slOid = null;
    String sOid = null;
    String sFromId = null;
    String sToId = null;
    String sDirection = null;
    
    ContextUtil.startTransaction(context, true);
    for (String emxTableRowId : strRowId)
    {
    	slOid = FrameworkUtil.splitString(emxTableRowId, "|");
    	sOid = (String) slOid.get(1);
    	
    	if ( "TRUE".equalsIgnoreCase(strGetFrom) )
    	{
    		sFromId = strObjId;
    		sToId = sOid;
    		sDirection = "from";
    	}
    	else
    	{
    		sFromId = sOid;
    		sToId = strObjId;
    		sDirection = "to";
    	}
    	
    	if ( "TRUE".equalsIgnoreCase(strReplace) )
    	{
    		String sExistRelIdExpr = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump $3", strObjId, sDirection + "[" + strRelName + "].id", "|");
    		if ( StringUtils.isNotEmpty(sExistRelIdExpr) )
    		{
	    		String[] sExistsRelIdArr = sExistRelIdExpr.split("[|]");
	    		DomainRelationship.disconnect(context, sExistsRelIdArr);
    		}
    	}
    	
    	MqlUtil.mqlCommand(context, "connect bus $1 relationship $2 to $3", sFromId, strRelName, sToId);
    }
    ContextUtil.commitTransaction(context);
%>
<script type="text/javascript">
var targetFrame = null;
if ( "" !== "<%=strPortalCmdName %>" && null !== "<%=strPortalCmdName %>" && "null" !== "<%=strPortalCmdName %>" )
{
	targetFrame = findFrame(parent, "<%=strPortalCmdName %>");
}
else
{
	targetFrame = findFrame(getTopWindow(), "detailsDisplay");
}
targetFrame.location.reload();
</script>
<%
} catch(Exception e) {
	ContextUtil.abortTransaction(context);
	e.printStackTrace();
	throw e;
} finally {
	ContextUtil.popContext(context);
}
%>