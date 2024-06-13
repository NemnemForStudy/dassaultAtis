
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.dec.util.DecExcelUtil"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="java.io.File"%>
<%@page import="org.apache.commons.fileupload.FileItem"%>
<%@page import="org.apache.commons.fileupload.DiskFileUpload"%>
<%@page import="java.util.List"%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>

<%@include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/emxUIConstantsInclude.inc"%>


<%@include file = "../emxUICommonHeaderEndInclude.inc" %>

<%
String sResult = null;
try{
	String sParentOID = emxGetParameter(request, "parentOID");
	// Added by hslee on 2023.07.31 --- [s]
	if ( StringUtils.isEmpty(sParentOID) )
	{
		sParentOID = emxGetParameter(request, "objectId");
	}
	// Added by hslee on 2023.07.31 --- [e]
	String sType = emxGetParameter(request, "type");
	String sFolder = emxGetParameter(request, "folder");
	DiskFileUpload upload	= new DiskFileUpload();
	//List items 				= upload.parseRequest(request);  
	List files = upload.parseRequest(request);
	MapList mlExcelData = null;
	
	String sFilename = "";
	FileItem file = null;
	File outfile = null;
	Iterator iter = files.iterator();
	
	int index;
	while (iter.hasNext()) {
		file = (FileItem) iter.next();
		sFilename = file.getName();
		if(DecStringUtil.isNotNullString(sFilename)) {
			if (sFilename.contains("/")) {
				index = sFilename.lastIndexOf("/");
				sFilename = sFilename.substring(index);
			}
			if (sFilename.contains("\\")) {
				index = sFilename.lastIndexOf("\\");
				sFilename = sFilename.substring(index + 1);
			}
			
			// Added by hslee on 2023.06.23 --- [s]
			if (sFilename.contains(".")) {
				index = sFilename.lastIndexOf(".");
				String sExtension = sFilename.substring(index + 1);
				sFilename = sFilename.substring(0, index) + System.currentTimeMillis() + "." + sExtension;
			}
			// Added by hslee on 2023.06.23 --- [e]
		
			try {
				outfile = new File(sFolder + sFilename);
				file.write(outfile);
				mlExcelData = DecExcelUtil.getExcelDataToList(outfile.getPath());
			} catch (NullPointerException ne) {
				throw ne;
			}  catch (Exception e) {
				throw e;
			} finally{
				System.gc();
				System.runFinalization();
				if(outfile != null && !outfile.delete()) {
					outfile.deleteOnExit();
				}
			}
		}
	}
	
	// Modified by hslee on 2023.08.01 --- [s]
	if ( StringUtils.isNotEmpty(sParentOID) )
	{
		DomainObject doObj = DomainObject.newInstance(context, sParentOID);
		doObj.open(context);
		if(!DecStringUtil.equals(doObj.getTypeName(), DecConstants.TYPE_PROJECT_SPACE)){
			sParentOID = doObj.getInfo(context, "to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST +"].to.id");
		}
	}
	// Modified by hslee on 2023.08.01 --- [e]
			
	Map mParam = new HashMap();
	mParam.put("parentOID", sParentOID);
	mParam.put("objectList", mlExcelData);
	
	// Added by hslee on 2023.06.22 --- [s]
	Enumeration en = emxGetParameterNames(request);
	String key = null;
	while ( en.hasMoreElements() )
	{
		key = (String) en.nextElement();
		mParam.put(key, emxGetParameter(request, key));
	}
	// Added by hslee on 2023.06.22 --- [e]
	if(DecStringUtil.equals(sType, "CWP")){
		sResult = JPO.invoke(context, "emxDnD", null, "importExcelCWPMasterData", JPO.packArgs(mParam), String.class);
	}else if(DecStringUtil.equals(sType, "CWPPlan")){
		sResult = JPO.invoke(context, "emxDnD", null, "importExcelCWPPlanData", JPO.packArgs(mParam), String.class);
	}else if(DecStringUtil.equals(sType, "IWP")){
		sResult = JPO.invoke(context, "emxDnD", null, "importExcelIWPExcutionData", JPO.packArgs(mParam), String.class);
	}else if(DecStringUtil.equals(sType, "KeyQtyMaster")){
		sResult = JPO.invoke(context, "emxDnD", null, "importExcelKeyQtyMasterData", JPO.packArgs(mParam), String.class);
	}else if(DecStringUtil.equals(sType, "KeyQty")){
		sResult = JPO.invoke(context, "emxDnD", null, "importExcelKeyQtyData", JPO.packArgs(mParam), String.class);
	}else if(DecStringUtil.equals(sType, "KPI")){
		sResult = JPO.invoke(context, "emxDnD", null, "importExcelConstructionKPIData", JPO.packArgs(mParam), String.class);
	}else if(DecStringUtil.equals(sType, "CodeMasterCreate")){
		sResult = JPO.invoke(context, "emxDnD", null, "importExcelCodeMasterCreate", JPO.packArgs(mParam), String.class);
	}else if(DecStringUtil.equals(sType, "CodeMasterAdd")){
		sResult = JPO.invoke(context, "emxDnD", null, "importExcelCodeMasterAdd", JPO.packArgs(mParam), String.class);
	}else if(DecStringUtil.equals(sType, "CWPNo")){
		sResult = JPO.invoke(context, "emxDnD", null, "importExcelCWPNoData", JPO.packArgs(mParam), String.class);
	}
} catch (MatrixException me) {
	sResult = me.getMessage();
} catch (Exception e) {
	sResult = e.getMessage();
}
out.clear();

%>
<%=sResult%>