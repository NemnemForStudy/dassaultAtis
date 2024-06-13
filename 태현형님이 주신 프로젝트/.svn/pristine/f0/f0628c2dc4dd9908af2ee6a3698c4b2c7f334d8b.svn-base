
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<script>
<%
	String sOID = request.getParameter("objectId");
	DomainObject doPS = DomainObject.newInstance(context, sOID);
	String sDashboardURL = doPS.getAttributeValue(context, DecConstants.ATTRIBUTE_DECDASHBOARDURL);
	if(DecStringUtil.isNotEmpty(sDashboardURL)){
%>
		window.open("<%=sDashboardURL%>");
<%	}else{  %>
		window.alert("<%=EnoviaResourceBundle.getProperty(context, "emxProgramCentralStringResource", context.getLocale(), "emxProgramCentral.Msg.DashboardURLIsNotDefined")%>");
<%  }  %>
</script>