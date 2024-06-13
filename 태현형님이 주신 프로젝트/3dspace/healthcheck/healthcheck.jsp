<%@ page import = "matrix.db.Context,com.matrixone.apps.domain.util.ContextUtil,java.io.PrintWriter" %>
<%
	matrix.db.Context context = null;
	int result = HttpServletResponse.SC_NOT_FOUND;
	String json = ""; 
	try
	{
		context = new matrix.db.Context("");
		ContextUtil.pushContext(context);
		context.connect();
		result = HttpServletResponse.SC_OK;
	}
	catch(Exception e)
	{
		result = HttpServletResponse.SC_NOT_FOUND;
		json="{\"error\":" + "\"" + e.getMessage() + "\"" +"}";
		response.setContentType("application/json ; charset=utf-8 ");
		response.getWriter().print(json);
	}
	finally
	{
		response.setStatus(result);
	}
%>

