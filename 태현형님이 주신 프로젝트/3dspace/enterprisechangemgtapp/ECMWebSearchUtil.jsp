<%--
  ECMWebSearchUtil.jsp
  Copyright (c) 1993-2020 Dassault Systemes.
  All Rights Reserved.
  This program contains proprietary and trade secret information of
  Dassault Systemes.
  Copyright notice is precautionary only and does not evidence any actual
  or intended publication of such program
--%>

<%-- Common Includes --%>

<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file = "ECMDesignTopInclude.inc"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<%@page import="com.matrixone.apps.domain.DomainConstants"%>
<%@page import="com.matrixone.apps.domain.DomainRelationship"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.apps.domain.util.PropertyUtil"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="com.matrixone.apps.domain.util.FrameworkUtil"%>

<%@ page import="java.util.Hashtable"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Enumeration" %>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.TreeSet,java.util.Iterator"%>
<%@ page import="com.matrixone.apps.domain.util.mxType " %>

<%@page import="com.matrixone.apps.domain.util.BackgroundProcess"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>

<script language="Javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="Javascript" src="../common/scripts/emxUICore.js"></script>
<script language="Javascript" src="../common/scripts/emxUIUtility.js"></script>
<script language="Javascript" src="../common/scripts/emxUIPopups.js"></script>
<script language="Javascript" src="../common/scripts/emxUIModal.js"></script>
<script language="Javascript" src="../common/scripts/emxUITableUtil.js"></script>
<script language="Javascript" src="../common/scripts/emxUIFreezePane.js"></script>
<script language="javascript" src="../common/scripts/emxUIJson.js"></script>

<html>
	<body onload="doSubmit();">
	
		<%
			
			String commaseperatedlist = "";
			String languageStr     	= request.getHeader("Accept-Language");
			String stringResFileId = "emxEnterpriseChangeMgtStringResource";
		
			boolean bIsError 	= false;
			String strVal = "In ECMWebSearchUtil.jsp";
	
			//String strCOActionsError = EnoviaResourceBundle.getProperty(context, stringResFileId, context.getLocale(),"EnterpriseChangeMgt.Alert.COActions");
			
			try {
				
				String functionality = emxGetParameter(request,"fromOperation");
				System.out.println("functionality " + functionality);
				%>
					<script language="JavaScript">
			          
			          var functionality = "<%= functionality %>";
						
			        </script>
		         <%
				
				if("searchDependency".equalsIgnoreCase(functionality)){
				
					
					String strObjId 	= emxGetParameter(request, "objectId");
					
					String[] strRowId 	= emxGetParameterValues(request, "emxTableRowId");
					
					%>
					<%
					StringList mrsrList = null;
					if(mrsrList == null){
		                mrsrList = new StringList();
		            }
					String[] idsArray = new String[strRowId.length];  
					for (int i=0; i < strRowId.length; i++ )
		            {
		               //if this is coming from the Full Text Search, have to parse out |objectId|relId|                   
		               StringList oidList = FrameworkUtil.split(strRowId[i], "|");
		               idsArray[i] = (String)oidList.get(0);
		            }
					
					StringList selList = new StringList();
					selList.add(DomainObject.SELECT_ID);
					selList.add("physicalid");
					MapList physicalIdML = DomainObject.getInfo(context, idsArray, selList);
					if(physicalIdML != null && physicalIdML.size() > 0){
		                for(int n=0; n < physicalIdML.size(); n++){
		                    Map cxtMap = (Map)physicalIdML.get(n);
		                    String physicalId = (String)cxtMap.get("physicalid");
		                    if(!mrsrList.contains(physicalId)){
		                        mrsrList.add(physicalId);                   
		                    }
		                }
		             }
					
					commaseperatedlist = String.join(",",mrsrList);
					
				}
				else if("searchObjects".equalsIgnoreCase(functionality)){
					String[] strRowId = emxGetParameterValues(request, "emxTableRowId");
					String uniqueKey = emxGetParameter(request,"uniqueKey");
				
		            String[] idsArray = new String[strRowId.length];  
					for (int i=0; i < strRowId.length; i++ )
		            {
		               //if this is coming from the Full Text Search, have to parse out |objectId|relId|                   
		               StringList oidList = FrameworkUtil.split(strRowId[i], "|");
		               idsArray[i] = (String)oidList.get(0);
		            }
					
					StringList selList = new StringList();
					selList.add(DomainObject.SELECT_ID);
					selList.add(DomainObject.SELECT_PHYSICAL_ID);
					selList.add(DomainObject.SELECT_NAME);
					selList.add(DomainObject.SELECT_TYPE);
					selList.add(DomainObject.SELECT_POLICY);
					selList.add(DomainObject.TYPE_IMAGE);
					selList.add(DomainObject.SELECT_DESCRIPTION);
            		selList.add(DomainObject.SELECT_REVISION);
            		//source  val

					MapList physicalIdML = DomainObject.getInfo(context, idsArray, selList);
					String[][] result = new String[idsArray.length][8];
					if(physicalIdML != null && physicalIdML.size() > 0){
		                for(int n=0; n < physicalIdML.size(); n++){
		                    Map cxtMap = (Map)physicalIdML.get(n);
		                    System.out.println("137");
		                    String physicalId = (String)cxtMap.get(DomainObject.SELECT_PHYSICAL_ID);
		                    String name = (String)cxtMap.get(DomainObject.SELECT_NAME);
		                    String type = (String)cxtMap.get(DomainObject.SELECT_TYPE);
		                    String policy = (String)cxtMap.get(DomainObject.SELECT_POLICY);
		                    String image = (String)cxtMap.get(DomainObject.TYPE_IMAGE);
		                    String description = (String)cxtMap.get(DomainObject.SELECT_DESCRIPTION);
		                    String revision = (String)cxtMap.get(DomainObject.SELECT_REVISION);

							result[n][0] = physicalId;
							result[n][1] = name;
							result[n][2] = type;
							result[n][3] = policy;
							result[n][4] = image;
							result[n][5] = description;
							result[n][6] = revision;
							result[n][7] = "sourceid_value";
							System.out.println("153");
		                    
		                }
		             }
		            

		            %>
					<script language="JavaScript">
			          
			          var searchedObjList = {};
			          var uniqueKey = "<%= uniqueKey %>";
						
			        </script>
		         	<%
		            for(int n=0; n < result.length; n++){ 
		            System.out.println("167");
		            %>

		            	<script language="JavaScript">
			          	
		            	var searchedObj = [];
		            	searchedObj.push("<%= result[n][0] %>");
		            	searchedObj.push("<%= result[n][1] %>");
		            	searchedObj.push("<%= result[n][2] %>");
		            	searchedObj.push("<%= result[n][3] %>");
		            	searchedObj.push("<%= result[n][4] %>");
						//Commented for IR-968567
		            	/*searchedObj.push("<%= result[n][5] %>");*/
		            	searchedObj.push("<%= result[n][6] %>");
		            	searchedObj.push("<%= result[n][7] %>");

		            	searchedObjList["<%= n %>"] = searchedObj;
		            	</script>

		         	<% } 
					System.out.println("186");
					//commaseperatedlist = "test";
				}
			}catch (Exception e) {
				bIsError = true;
				session.putValue("error.message", "" + e);
				
			}// End of main Try-catck block
		%>
		<script>
			
					
		function doSubmit(){
					//
					if(functionality=="searchDependency"){
					var list = "<%=XSSUtil.encodeForJavaScript(context,commaseperatedlist)%>";
					sessionStorage.setItem("searchList", list);
					}
					else{
						//sessionStorage.setItem("searchedObjectDetails", JSON.stringify(searchedObjList));
						searchedObjList.uniqueKey = uniqueKey;
						localStorage.setItem("searchedObjectDetails", JSON.stringify(searchedObjList));
					}
					if(isIE){        
			        	getTopWindow().open('','_self','');  
			            getTopWindow().closeWindow();
			        }
			        else{
			            getTopWindow().closeWindow();
			        }
					
				}
			
		</script>
		<%@include file = "../common/emxNavigatorBottomErrorInclude.inc"%>
	</body>
</html>




