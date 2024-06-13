<%@page import="com.dec.util.DecStringUtil"%>
<%@ page import="java.io.File" %>
<%@ page import="java.util.Base64" %>
<%@page contentType="text/html; charset=UTF-8" %>
<%!
    public static String decode(String sValue) throws Exception {
        byte[] targetBytes = sValue.getBytes("UTF-8");
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] decodedBytes = decoder.decode(targetBytes);
        return new String(decodedBytes);
    }
%>
<%
    String logPath = request.getParameter("logpath");
    String linecnt = request.getParameter("linecnt");

    logPath = decode(logPath);

    boolean fileExists = true;
    if (DecStringUtil.isEmpty(logPath)) {
        fileExists = false;
    } else {
        fileExists = new File(logPath).exists();
    }

    if (fileExists) {
%>

<%@ taglib uri="/WEB-INF/tailTaglib.tld" prefix="t" %>
<t:tail file="<%=logPath%>" count="<%=Integer.valueOf(linecnt)%>" id="S">
    <br><%=S%>
</t:tail>


<%
    } else {
        out.println("해당하는 파일이 없다.....");
    }
%>


<script>
    scrollTo(0, document.body.scrollHeight);
</script>
