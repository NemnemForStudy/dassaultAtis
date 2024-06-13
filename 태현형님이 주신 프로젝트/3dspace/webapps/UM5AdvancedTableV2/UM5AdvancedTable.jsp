<!DOCTYPE html>
<%@page import="com.dec.util.DecStringUtil"%>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:widget="http://www.netvibes.com/ns/">

<head>
	<meta charset="UTF-8" />
	<title>UM5 Advanced Table Widget</title>

	<meta name="author" content="UM5" />
	<meta name="description" content="UM5 Advanced Table Widget" />
	<meta name="apiVersion" content="1.3" />
	<meta name="debugMode" content="false" />
	<meta name="strictMode" content="false" />
	<% String sTitle = DecStringUtil.nullToEmpty(request.getParameter("wdgTitle"));
	   String sTableMode = DecStringUtil.nullToEmpty(request.getParameter("tableMode"));
	   String sTypeOfObject = DecStringUtil.nullToEmpty(request.getParameter("Type"));
	   String sWhere = DecStringUtil.nullToEmpty(request.getParameter("Where"));
	   String sFindProgram = DecStringUtil.nullToEmpty(request.getParameter("FindProgram"));
	   String sFindFunction = DecStringUtil.nullToEmpty(request.getParameter("FindFunction"));
	   String sFindParams = DecStringUtil.nullToEmpty(request.getParameter("FindParams"));
	   String sInfoSelect = DecStringUtil.nullToEmpty(request.getParameter("InfoSelect"));
	   String sInfoConnection = DecStringUtil.nullToEmpty(request.getParameter("InfoConnection"));
	   String sColumnKeys	 = DecStringUtil.nullToEmpty(request.getParameter("ColumnKeys"));
	   String sColumnHeaders = DecStringUtil.nullToEmpty(request.getParameter("ColumnHeaders"));
	   String sSortKeys		 = DecStringUtil.nullToEmpty(request.getParameter("SortKeys"));
	   String sSearchKeys	 = DecStringUtil.nullToEmpty(request.getParameter("SearchKeys"));
	%>
	<!-- Other Scripts -->

	<script type="text/javascript" src="../BTWWLibrairies/jquery/jquery-3.2.1.min.js"></script>

	<!-- Application Preferences -->

	<widget:preferences>
		<widget:preference type="text" name="wdgTitle" label="Widget Title" defaultValue='<%=sTitle%>' />

		<widget:preference type="list" name="tableMode" label="Table Mode" defaultValue='<%=sTableMode%>'>
			<widget:option label="Find And Expand" value='FindAndExpand' />
			<widget:option label="Find Only" value='FindOnly' />
			<widget:option label="Drop and Expand" value='DropAndExpand' />
			<widget:option label="Drop Only" value='DropOnly' />
		</widget:preference>

		<widget:preference type="hidden" name="adminMode" label="Admin Mode" defaultValue='true' />
		<widget:preference type="hidden" name="platformTenant" label="3DEXPERIENCE Platform" defaultValue='' />
		<widget:preference type="hidden" name="ctx" label="3DSpace Context" defaultValue='' />

		<widget:preference type="hidden" name="oidsDropped" label="DroppedOids" defaultValue='' />

		<!-- Config Find -->
		<widget:preference type="hidden" name="configFind" label="Table Configuration (Find)" defaultValue='' />
		<widget:preference type="text" name="configNameFind" label="New Configuration Name (Find)" defaultValue='' />

		<!-- Get Roots -->
		<widget:preference type="text" name="typeObjRoot" label="Type of Root Objects" defaultValue='<%=sTypeOfObject%>' />
		<widget:preference type="text" name="whereExpRoot" label="Where expression for Root Objects" defaultValue='<%=sWhere%>' />

		<!-- Advanced Find Roots -->
		<widget:preference type="text" name="findProgram" label="Find Program" defaultValue='<%=sFindProgram%>' />
		<widget:preference type="text" name="findFunction" label="Find Function" defaultValue='<%=sFindFunction%>' />
		<widget:preference type="text" name="findParams" label="Additional Find Parameters (url format)" defaultValue='<%=sFindParams%>' />


		<!-- Config Expand -->
		<widget:preference type="hidden" name="configExpand" label="Table Configuration (Expand)" defaultValue='' />
		<widget:preference type="text" name="configNameExpand" label="New Configuration Name (Expand)" defaultValue='' />

		<!-- Expand Infos -->
		<widget:preference type="text" name="typeObjExp" label="Type of Object for Expand" defaultValue='Task,Phase,Gate' />
		<widget:preference type="text" name="whereExpObjExp" label="Where expression for Expanded Objects" defaultValue='' />
		<widget:preference type="text" name="typeRel" label="Type of Relationship for Expand" defaultValue='*' />
		<widget:preference type="text" name="whereExpRelExp" label="Where expression for Expanded Relationships" defaultValue='' />

		<!-- Advanced Expand -->
		<widget:preference type="text" name="expandProg" label="Expand Program" defaultValue='' />
		<widget:preference type="text" name="expandFunc" label="Expand Function" defaultValue='' />
		<widget:preference type="text" name="expandParams" label="Additional Expand Parameters (url format)" defaultValue='' />


		<!-- Config Display -->
		<widget:preference type="hidden" name="configDisplay" label="Table Configuration (Display)" defaultValue='' />
		<widget:preference type="text" name="configNameDisplay" label="New Configuration Name (Display)" defaultValue='' />

		<!-- Selects -->
		<widget:preference type="text" name="selects" label="Infos to Select on Objects" defaultValue='<%=sInfoSelect%>' />
		<widget:preference type="text" name="selectsRel" label="Infos to Select on Relationships" defaultValue='<%=sInfoConnection%>' />

		<!-- Display -->
		<widget:preference type="text" name="columnKeys" label="Columns Keys" defaultValue='<%=sColumnKeys%>' />
		<widget:preference type="text" name="columnDisp" label="Columns Headers" defaultValue='<%=sColumnHeaders%>' />
		<widget:preference type="text" name="sortKeys" label="Sort by keys" defaultValue='<%=sSortKeys%>' />
		<widget:preference type="text" name="searchKeys" label="Search on keys" defaultValue='<%=sSearchKeys%>' />
	
		<!-- Others -->
		<widget:preference type="boolean" name="dispArrows" label="Display direction arrows" defaultValue='false' />

		<!-- Cross Filter -->
		<widget:preference type="text" name="sendFilterKeys" label="Send Filter Event (EventName|Key,...)" defaultValue='' />
		<widget:preference type="text" name="receiveFilterKeys" label="Receive Filter Event (EventName|Key,...)" defaultValue='' />

		<widget:preference type="boolean" name="doFilterHighlight" label="Do Filter when using column Highlighter"
		 defaultValue='false' />

		<widget:preference type="list" name="filterMode" label="Filter Mode" defaultValue='AND'>
			<widget:option label="Display Item if ONE filter criteria is Ok" value='OR' />
			<widget:option label="Display Item if ALL filters criterias are Ok" value='AND' />
		</widget:preference>

		<widget:preference type="boolean" name="selectAllPathsForVPMRef" label="Activate cross Selction with Product Structure widgets (expand all possible parent Paths)"
		 defaultValue='false' />

		<widget:preference type="boolean" name="doFilterHide" label="Hide Rows when filtered" defaultValue='false' />

		<widget:preference type="list" name="defaultExpand" label="Default Expand Level" defaultValue='0'>
			<widget:option label="0 - No Expand" value='0' />
			<widget:option label="1" value='1' />
			<widget:option label="2" value='2' />
			<widget:option label="3" value='3' />
		</widget:preference>
	</widget:preferences>


	<!-- Widget files -->

	<link rel="stylesheet" type="text/css" href="styles/Main.css" />
	<script type="text/javascript" src="scripts/Main.js"></script>

	<!-- Wait for widget global object to be added to the page by 3DDashboard frame -->

	<script type="text/javascript">
		function widgetLoading() {
			if (widget) {
				executeWidgetCode();
			} else {
				console.warn("Defered widget Loading");
				setTimeout(widgetLoading, 100); //Wait for widget object to be added correctly
			}
		}
		widgetLoading();
	</script>

</head>

<body>
	<p>Widget is Loading...</p>
</body>

</html>