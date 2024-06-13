<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file="../common/emxNavigatorInclude.inc"%>

<%
try {
	String objectId = emxGetParameter(request, "objectId");
	String sRelName = emxGetParameter(request, "relation");
	String[] emxTableRowIdArray = emxGetParameterValues(request, "emxTableRowId");
	
	Map objectMap = UIUtil.parseRelAndObjectIds(context, emxTableRowIdArray, false);
	String[] relIds = (String[])objectMap.get("relIds");
	String[] oids = (String[])objectMap.get("objectIds");
	
	ContextUtil.startTransaction(context, true);
	if ( relIds.length > 0 && StringUtils.isNotEmpty(relIds[0]) )
	{
		DomainRelationship.disconnect(context, relIds);
	}
	else
	{
		StringList slOid = null;
		String sTargetId = null;
		String sGetFrom = emxGetParameter(request, "getFrom");
		String sFromId = null;
		String sToId = null;
		for (String oid : oids)
		{
			slOid = FrameworkUtil.splitString(oid, "|");
			sTargetId = (String) slOid.get(0);
			if ( "TRUE".equalsIgnoreCase(sGetFrom) )
			{
				sFromId = objectId;
				sToId = sTargetId;
			}
			else
			{
				sFromId = sTargetId;
				sToId = objectId;
			}
			MqlUtil.mqlCommand(context, "disconnect bus $1 relationship $2 to $3", sFromId, sRelName, sToId);
		}
	}
	
	ContextUtil.commitTransaction(context);
%>	
<script type="text/javascript">
parent.location.reload();
</script>
<%
} catch(Exception e) {
	ContextUtil.abortTransaction(context);
	e.printStackTrace();
	throw e;
}
%>