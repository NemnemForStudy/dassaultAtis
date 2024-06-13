<%@page import="com.dec.util.DecConstants"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	ContextUtil.pushContext(context);
	DomainObject.findObjects(context, DecConstants.TYPE_PROJECT_SPACE, DecConstants.SYMB_WILD, DecConstants.SYMB_WILD
			, DecConstants.SYMB_WILD, DecConstants.VAULT_ESERVICE_PRODUCTION, null, false, new StringList(DecConstants.SELECT_ID));
} catch(Exception e) {
	e.printStackTrace();
	throw e;
} finally {
	ContextUtil.popContext(context);
}
%>