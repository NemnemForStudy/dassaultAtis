<%@page import="com.dec.util.decListUtil"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file="../common/emxNavigatorInclude.inc"%>

<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script src="../common/scripts/emxUICore.js" type="text/javascript"></script>

<%
try {
	String objectId = emxGetParameter(request, "objectId");  
    String relName = DecConstants.RELATIONSHIP_DECCODEDETAILREL;  
    String getFrom = "true";   
    String emxTableRowIdArr[] = emxGetParameterValues(request, "emxTableRowId");
    String replace = emxGetParameter(request, "replace");   
    String portalCmdName = emxGetParameter(request, "portalCmdName");   
    String openerFrame = emxGetParameter(request, "openerFrame");   
    
//     Enumeration en = emxGetParameterNames(request);
//     while ( en.hasMoreElements() )
//     {
//     	String key = (String) en.nextElement();
//     	String value = emxGetParameter(request, key);
    	
//     	System.out.println(key + " : " + value);
//     }
    
    StringList rowIdSplit = null;
    String targetId = null;
    String sFromId = null;
    String sToId = null;
    String sDirection = null;
    
    StringList slSelect = new StringList(DomainConstants.SELECT_ID);
    slSelect.add(DomainConstants.SELECT_NAME);
    slSelect.add(DecConstants.SELECT_ATTRIBUTE_DECCODEDETAILTYPE);
    
    // Code Master의 revision이 -면 relationship을 decCodeDetailRelAddTemplate을 사용하고
    // Project의 Code Master일 경우에는 relationship을 decCodeDetailRelAdd을 사용한다.
    String relType = DecConstants.RELATIONSHIP_DECCODEDETAILRELADD;
    String codeMasterRaw = MqlUtil.mqlCommand(context, "expand bus $1 to rel $2 recurse to $3 select bus $4 dump $5 terse"
    		, objectId
    		, DecConstants.RELATIONSHIP_DECCODEDETAILREL
    		, "end"
    		, DecConstants.SELECT_REVISION
    		, DecConstants.SYMB_VERTICAL_BAR);
    
    StringList codeMasterList = FrameworkUtil.splitString(codeMasterRaw, "\n");
    
    if ( codeMasterList != null && codeMasterList.size() >= 1 )
    {
	    String codeMasterRow = codeMasterList.get(0);
	    StringList codeMasterInfo = FrameworkUtil.splitString(codeMasterRow, DecConstants.SYMB_VERTICAL_BAR);
	    if ( codeMasterInfo != null && codeMasterInfo.size() >= 5 )
	    {
	    	String codeMasterRev = codeMasterInfo.get(4);
	    	
	    	if ( DecConstants.SYMB_HYPHEN.equals(codeMasterRev) )
	    	{
	    		relType = DecConstants.RELATIONSHIP_DECCODEDETAILRELADDTEMPLATE;
	    	}
	    }
    }
    
    
    DomainObject doObj = DomainObject.newInstance(context, objectId);
    MapList parentCodeList = doObj.getRelatedObjects(context
    		, DecConstants.RELATIONSHIP_DECCODEDETAILREL, DecConstants.TYPE_DECCODEDETAIL
    		, slSelect, null
    		, true, false
    		, (short) 0
    		, null, null
    		, 0);
    
//     StringList childCodeIdList = doObj.getInfoList(context, "from[decCodeDetailRel].to.id");
	String childCodeIds = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump $3", objectId, "from[decCodeDetailRel].to.id", "|");
	StringList childCodeIdList = FrameworkUtil.splitString(childCodeIds, "|");
    
    StringList parentCodeIdList = decListUtil.getSelectValueListForMapList(parentCodeList, DomainConstants.SELECT_ID);
    
    StringBuffer sbMsg = new StringBuffer();
    
    
    StringList toConnectIdList = new StringList();
    
    String message = null;
    
    for (String emxTableRowId : emxTableRowIdArr)
    {
    	rowIdSplit = FrameworkUtil.splitString(emxTableRowId, "|");
    	targetId = (String) rowIdSplit.get(1);
    	
    	if ( parentCodeIdList.contains(targetId) )
    	{
    		message = "You cannot add existing an object already connected.";
			break;
    	}
    	
    	if ( childCodeIdList.contains(targetId) )
    	{
    		message = "You cannot add existing an object already connected.";
			break;
    	}
    	
    	toConnectIdList.add(targetId);
    }
    
    if ( message != null )
    {
%>
<script type="text/javascript">
alert("<%=message %>");
top.closeSlideInDialog();
</script>
<%    	
    }
    else
    {
    	ContextUtil.startTransaction(context, true);
    	for (String toConnectId : toConnectIdList)
        {
        	MqlUtil.mqlCommand(context, "connect bus $1 relationship $2 to $3", objectId, relType, toConnectId);
        }
    	ContextUtil.commitTransaction(context);
%>
<script type="text/javascript">
alert("Add job success");
top.findFrame(top, "<%=openerFrame %>").location.reload();
top.closeSlideInDialog();
</script>
<%
    }

} catch(Exception e) {
	ContextUtil.abortTransaction(context);
	e.printStackTrace();
	throw e;
}
%>