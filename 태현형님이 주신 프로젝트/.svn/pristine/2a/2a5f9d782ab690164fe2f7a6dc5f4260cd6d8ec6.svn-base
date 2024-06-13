<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<%@page import = "com.matrixone.apps.effectivity.EffectivityFramework"%>
<%@page import = "com.matrixone.apps.domain.util.ContextUtil"%>
<%@page import = "com.matrixone.apps.domain.DomainConstants"%>
<%@page import = "com.matrixone.apps.domain.DomainRelationship"%>
<%@page import="matrix.util.StringList"%>
<%@page import = "java.util.StringTokenizer"%>
<%@page import="java.util.List"%>
<%@page import = "com.dassault_systemes.plm.config.entity.itf.IConfiguredEntity"%>
<%@page import = "com.dassault_systemes.plm.config.entity.itf.IConfiguredEntitiesFactory"%>
<%@page import = "com.dassault_systemes.plm.config.entity.itf.ConfiguredEntitiesFactory"%>
<%
	try
  {
	System.out.println("********************In ConfigurationContextRemoveProcess:");
	String strObjId = emxGetParameter(request, "objectId");
	String[] strTableRowIds    = emxGetParameterValues(request, "emxTableRowId");
	String strConfigCtxRelIds[]=null;
	strConfigCtxRelIds = new String[strTableRowIds.length];
    StringBuffer sbTableRowId = null;
    for (int i = 0; i < strTableRowIds.length; i++)      // for each table row
    {
    	StringTokenizer strTokenizer = new StringTokenizer(strTableRowIds[i] ,"|");
        strConfigCtxRelIds[i]=strTokenizer.nextToken();
    }   
    MapList ctxPhyIDMaplist = DomainObject.getInfo(context, strConfigCtxRelIds, new StringList("physicalid"));
    List<String> ctxModelPhyIDList = new ArrayList<String>();
    for(int i = 0; i < ctxPhyIDMaplist.size(); i++){
    	Map tempMap = (Map) ctxPhyIDMaplist.get(i);
    	ctxModelPhyIDList.add((String)tempMap.get("physicalid"));
    }
    IConfiguredEntitiesFactory factory = ConfiguredEntitiesFactory.getConfiguredEntitiesFactory(context);
    IConfiguredEntity rootConfigurable = factory.CreateConfiguredEntity(context, strObjId);
    ContextUtil.startTransaction(context,true);
    //DomainRelationship.disconnect(context, strConfigCtxRelIds);
    try{
        HashMap detachStatus = rootConfigurable.detachModels(context, ctxModelPhyIDList);
        System.out.println("********************detachStatus.size:" + detachStatus.size());
    }catch(Exception ex){
        ex.printStackTrace();
    }
    
    ContextUtil.commitTransaction(context);
    
    %>

    <script language="javascript" type="text/javaScript">

          parent.editableTable.loadData();
          parent.rebuildView();

    </script>
    <%
    
	}catch(Exception ex){
		ContextUtil.abortTransaction(context);
		%>
        <script language="javascript" type="text/javaScript">
         alert("<%=ex.getMessage()%>");//XSSOK                 
        </script>
        <%    
	}
	%>
<%@include file = "../common/emxNavigatorBottomErrorInclude.inc"%>
