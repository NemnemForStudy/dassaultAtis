<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	ContextUtil.startTransaction(context, true);
	
	long lStart = System.currentTimeMillis();
	Map resultMap = JPO.invoke(context, "decCodeMaster", null, "cloneCodeMaster", new String[]{}, Map.class);
	ContextUtil.commitTransaction(context);
	long lEnd = System.currentTimeMillis();
	System.out.println((lEnd - lStart) / 1000d + " sec. resultMap : " + resultMap);
	
} catch(Exception e) {
	ContextUtil.abortTransaction(context);
	e.printStackTrace();
	throw e;
}
%>