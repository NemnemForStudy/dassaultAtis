<%--  emxFreezePaneUpdateTableSelection.jsp
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
--%>
<%@page import="com.matrixone.apps.domain.util.PersonUtil"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="javax.json.JsonReader" %>
<%@page import="javax.json.Json" %>
<%@page import="java.io.StringReader" %>
<%@page import="javax.json.JsonObject" %>
<%@page import="javax.json.JsonObjectBuilder" %>

<%@include file = "emxNavigatorInclude.inc"%>
<%@include file = "emxNavigatorTopErrorInclude.inc"%>

<%
try {
    BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
    String json = "";
    if(br != null){
        json = br.readLine();
    }
    JsonReader jsonReader = Json.createReader(new StringReader(json));
    JsonObject objIn = jsonReader.readObject();
    String selectedTable = objIn.getString("selectedTable");
    String tableMenu = objIn.getString("tableMenu");
	String program = objIn.getString("selectedProgram");

    PersonUtil.updateMxTableMenuSelection(context, tableMenu, selectedTable, program); 
    out.clear();
    response.setContentType("application/json; charset=UTF-8");
    JsonObjectBuilder objBuilder=Json.createObjectBuilder();
    objBuilder.add("result", "success");
    objBuilder.add("message", "Selection updated.");
    //JSONObject ret = new JSONObject("{result: 'success',  message: 'Selection updated.'}");
    out.print(objBuilder.build().toString());
	out.flush();
} catch (Exception ex) {
    out.clear();
    response.setContentType("application/json; charset=UTF-8");
    JsonObjectBuilder objBuilder=Json.createObjectBuilder();
    objBuilder.add("result", "error");
    objBuilder.add("message", ex.getMessage());
    //JSONObject objOut = new JSONObject("{result: 'error',  message: '" + ex.getMessage() + "'}");
    out.print(objBuilder.build().toString());
	out.flush();
}
%>
