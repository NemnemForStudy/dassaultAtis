<%--  decRequestProcess.jsp  - To edit Collections
 Copyright (c) 2003-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program

   decRequestProcess.jsp 
   Created By thok 2023-05-31
--%>
<%@ page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@ page import="com.matrixone.apps.domain.util.ContextUtil" %>
<%@ page import="java.io.File"%>
<%@ page import="com.matrixone.apps.domain.DomainObject" %><%-- original jsp : emxCollectionsCreateProcess.jsp --%>
<%@ page import="com.dec.util.DecConstants"%>
<%@ page import="java.time.format.DateTimeFormatter"%>
<%@ page import="java.time.LocalDate"%>

<%@include file = "emxNavigatorInclude.inc"%>
<%@include file = "emxNavigatorTopErrorInclude.inc"%>
<script language="JavaScript" src="scripts/emxUICore.js" type="text/javascript"></script>
<!-- Import the java packages -->
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<%
        String strSystemGeneratedCollectionLabel  = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", new Locale(request.getHeader("Accept-Language")), "emxFramework.ClipBoardCollection.NameLabel");
        String mode                           	  = emxGetParameter(request,"mode");
        String openerFrame                        = emxGetParameter(request,"openerFrame");
        String objectId                           = emxGetParameter(request,"objectId");
        String responseId                         = emxGetParameter(request,"responseId");
        
        String Title                     		  = DecConstants.EMPTY_STRING;
        String decType                     		  = DecConstants.EMPTY_STRING;
        String decContentData                     = DecConstants.EMPTY_STRING;
        String decContentDataResponse             = DecConstants.EMPTY_STRING;
        String fileName 						  = DecConstants.EMPTY_STRING;
        String deleteFileList					  = DecConstants.EMPTY_STRING;
        String projectId						  = DecConstants.EMPTY_STRING;
        String OGprojectId						  = DecConstants.EMPTY_STRING;
        String projectConnectId					  = DecConstants.EMPTY_STRING;
        
        String[] deleteFileArray				  = null;
        String savePath = context.createWorkspace();
        
        LocalDate now = LocalDate.now();
        
        Calendar calendar = Calendar.getInstance(context.getLocale());

	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMM");
	    // 포맷 적용
	    String today = now.format(formatter);
		 
		// 파일 크기 500MB로 제한
		int sizeLimit = 1024*1024*500;
		
		try
        { 
		//  ↓ request 객체,               ↓ 저장될 서버 경로,       ↓ 파일 최대 크기,    ↓ 인코딩 방식,       ↓ 같은 이름의 파일명 방지 처리
		// (HttpServletRequest request, String saveDirectory, int maxPostSize, String encoding, FileRenamePolicy policy)
		// 아래와 같이 MultipartRequest를 생성만 해주면 파일이 업로드 된다.(파일 자체의 업로드 완료)
		MultipartRequest multi = null;
		if(mode.equalsIgnoreCase("create") || mode.equalsIgnoreCase("edit") 
			|| mode.equalsIgnoreCase("response") || mode.equalsIgnoreCase("responseEdit")){
			multi = new MultipartRequest (request, savePath, sizeLimit, "utf-8");
			Title                     		  = multi.getParameter(DecConstants.ATTRIBUTE_TITLE);
	        decType                     	  = multi.getParameter(DecConstants.ATTRIBUTE_DECTYPE);
	        decContentData                    = multi.getParameter(DecConstants.ATTRIBUTE_DECCONTENTDATA);
	        decContentDataResponse            = multi.getParameter("decContentDataResponse");
	        deleteFileList					  = multi.getParameter("deleteFileList");
	        projectId						  = multi.getParameter("decProjectOID");
	        projectId 				  		  = ProgramCentralUtil.isNullString(projectId) ? "" : projectId;
	        fileName 						  = multi.getFilesystemName("captureFile");

	        deleteFileArray = deleteFileList.split("\\|");
		}
		
        String sType = DecConstants.EMPTY_STRING;
	    String sPolicy = DecConstants.EMPTY_STRING;
	    String sName = DecConstants.EMPTY_STRING;
	    
	    if(ProgramCentralUtil.isNullString(openerFrame)){
	    	openerFrame = "content";
	    }
        
        
        	ContextUtil.startTransaction(context, true);
        	
        	if(mode.equalsIgnoreCase("create"))
        	{
        		DomainObject doNew = new DomainObject();
        		
       	        sType = DecConstants.TYPE_DECREQUEST;
       	     	sPolicy = DecConstants.POLICY_DECREQUEST;

       	     	MapList requestList = DomainObject.findObjects(context, sType, "REQ-" + today + DecConstants.SYMB_HYPHEN + DecConstants.SYMB_WILD, DecConstants.SYMB_HYPHEN
						, DecConstants.SYMB_WILD, DecConstants.VAULT_ESERVICE_PRODUCTION
						, DecConstants.EMPTY_STRING, false, new StringList(DecConstants.SELECT_NAME));
       	     	int maxName = 0;
       	     	if(requestList.size() > 0){
	       	     	Map mObject = null;
	
	                for(Object o : requestList) {
	                	mObject = (HashMap) o; 
	                	String name = String.valueOf(mObject.get(DecConstants.SELECT_NAME));
	                	int nameNum = Integer.parseInt(name.substring(name.length() - 4, name.length()));
	                	maxName = maxName < nameNum ? nameNum : maxName;
	                }
	                
	                sName = "REQ-" + today + DecConstants.SYMB_HYPHEN + String.format("%04d", maxName + 1);
	                
       	     	} else {
       	     		sName = "REQ-" + today + DecConstants.SYMB_HYPHEN + "0001";
       	     	}
	      		
	            doNew.createObject(context, sType, sName, "-", sPolicy, DecConstants.VAULT_ESERVICE_PRODUCTION);
	            
	            doNew.setAttributeValue(context, DecConstants.ATTRIBUTE_TITLE, Title);
	            doNew.setAttributeValue(context, DecConstants.ATTRIBUTE_DECTYPE, decType);
	            doNew.setAttributeValue(context, DecConstants.ATTRIBUTE_DECCONTENTDATA, decContentData);
	            doNew.setAttributeValue(context, DecConstants.ATTRIBUTE_ORIGINATOR, context.getUser());
	            
	            objectId = doNew.getObjectId();
	           
	            // 프로젝트랑 연결
	            if(projectId.length() > 0){
	            	DomainObject projectObject = new DomainObject(projectId);
	            	DomainRelationship.connect(context, projectObject, DecConstants.RELATIONSHIP_DECPROJECTREQUESTREL, doNew);
	            }
	            
	         	// 파일 업로드[S]
				if(ProgramCentralUtil.isNotNullString(fileName)){
					
					// 업로드한 파일의 전체 경로를 DB에 저장하기 위함
					String m_fileFullPath = savePath + "/" + fileName;
					
					File file = new File(m_fileFullPath);
					
					// 1. decRequest
					// 2. checkin
					
					DomainObject doObj = DomainObject.newInstance(context, objectId);
					doObj.checkinFile(context, false, true, "", "generic", file.getName(), savePath);
				}
				// 파일 업로드[E]
        	} else if(mode.equalsIgnoreCase("edit")){
        		DomainObject doEdit = new DomainObject(objectId);
        		
        		OGprojectId = doEdit.getInfo(context, "to["+DecConstants.RELATIONSHIP_DECPROJECTREQUESTREL+"].from."+DecConstants.SELECT_ID);
        		OGprojectId = ProgramCentralUtil.isNullString(OGprojectId) ? "" : OGprojectId;
        		
        		projectConnectId = doEdit.getInfo(context, "to["+DecConstants.RELATIONSHIP_DECPROJECTREQUESTREL+"]."+DecConstants.SELECT_ID);
        		projectConnectId = ProgramCentralUtil.isNullString(projectConnectId) ? "" : projectConnectId;
        		
        		doEdit.setAttributeValue(context, DecConstants.ATTRIBUTE_TITLE, Title);
        		doEdit.setAttributeValue(context, DecConstants.ATTRIBUTE_DECTYPE, decType);
        		doEdit.setAttributeValue(context, DecConstants.ATTRIBUTE_DECCONTENTDATA, decContentData);

        		// 파일 삭제[S]
	         	for(String deleteFile : deleteFileArray){//수정 할때 삭제 할 첨부파일이 존재할 경우
	         		if(!deleteFile.equalsIgnoreCase("NoData")){
	         			MqlUtil.mqlCommand(context,"delete bus $1 format $2 file $3",objectId,"generic",deleteFile);
	         		}
	         	}
        		// 파일 삭제[E]
        				
	         	// 파일 업로드[S]
				if(ProgramCentralUtil.isNotNullString(fileName)){
					
					// 업로드한 파일의 전체 경로를 DB에 저장하기 위함
					String m_fileFullPath = savePath + "/" + fileName;
					
					File file = new File(m_fileFullPath);
					
					// 1. decRequest
					// 2. checkin
					
					DomainObject doObj = DomainObject.newInstance(context, objectId);
					doObj.checkinFile(context, false, true, "", "generic", file.getName(), savePath);
					
				}

				// 프로젝트랑 해제 or 신규 연결[S]
				if(OGprojectId.length() > 0 && projectId.length() > 0){ // 기존 프로젝트 != 수정한 프로젝트
            		DomainObject projectObject = new DomainObject(projectId);
            		if(!OGprojectId.equalsIgnoreCase(projectId)){
            			DomainRelationship.disconnect(context, projectConnectId);
            			DomainRelationship.connect(context, projectObject, DecConstants.RELATIONSHIP_DECPROJECTREQUESTREL, doEdit);
            		} 
            	} else if(OGprojectId.length() == 0 && projectId.length() > 0){ // 기존 프로젝트 X  수정한 프로젝트 O
            		DomainObject projectObject = new DomainObject(projectId);
            		DomainRelationship.connect(context, projectObject, DecConstants.RELATIONSHIP_DECPROJECTREQUESTREL, doEdit);
        		} else if(OGprojectId.length() > 0 && projectId.length() == 0){ // 기존 프로젝트 O 수정한 프로젝트 X
            		DomainRelationship.disconnect(context, projectConnectId);
            	}
				// 프로젝트랑 해제 or 신규 연결[E]
        	} else if(mode.equalsIgnoreCase("response")) {
        		DomainObject doResponse = new DomainObject();
        		
       	        sType = DecConstants.TYPE_DECRESPONSE;
       	     	sPolicy = DecConstants.POLICY_DECRESPONSE;
	      		
       	     	MapList requestList = DomainObject.findObjects(context, sType, "RESP-" + today + DecConstants.SYMB_HYPHEN + DecConstants.SYMB_WILD, DecConstants.SYMB_HYPHEN
						, DecConstants.SYMB_WILD, DecConstants.VAULT_ESERVICE_PRODUCTION
						, DecConstants.EMPTY_STRING, false, new StringList(DecConstants.SELECT_NAME));
    	     	int maxName = 0;
    	     	if(requestList.size() > 0){
	       	     	Map mObject = null;
	
	                for(Object o : requestList) {
	                	mObject = (HashMap) o; 
	                	String name = String.valueOf(mObject.get(DecConstants.SELECT_NAME));
	                	int nameNum = Integer.parseInt(name.substring(name.length() - 4, name.length()));
	                	maxName = maxName < nameNum ? nameNum : maxName;
	                }
	                
	                sName = "RESP-" + today + DecConstants.SYMB_HYPHEN + String.format("%04d", maxName + 1);
	                
    	     	} else {
    	     		sName = "RESP-" + today + DecConstants.SYMB_HYPHEN + "0001";
    	     	}
       	     	
	      		
	      		doResponse.createObject(context, sType, sName, "-", sPolicy, DecConstants.VAULT_ESERVICE_PRODUCTION);
	            
	      		doResponse.setAttributeValue(context, DecConstants.ATTRIBUTE_TITLE, Title);
	      		doResponse.setAttributeValue(context, DecConstants.ATTRIBUTE_DECCONTENTDATA, decContentData);
	      		doResponse.setAttributeValue(context, DecConstants.ATTRIBUTE_ORIGINATOR, context.getUser());
	            
	            responseId = doResponse.getObjectId();
	            
	         	// 파일 업로드[S]
				if(ProgramCentralUtil.isNotNullString(fileName)){
					
					// 업로드한 파일의 전체 경로를 DB에 저장하기 위함
					String m_fileFullPath = savePath + "/" + fileName;
					
					File file = new File(m_fileFullPath);
					
					// 1. decRequest
					// 2. checkin
					
					DomainObject doObj = DomainObject.newInstance(context, responseId);
					doObj.checkinFile(context, false, true, "", "generic", file.getName(), savePath);
				}
	         	DomainObject doRequest = new DomainObject(objectId);
				DomainRelationship.connect(context, doRequest, DecConstants.RELATIONSHIP_DECRESPONSEREL, doResponse);
				// 파일 업로드[E]
        	} else if(mode.equalsIgnoreCase("responseEdit")){
        		DomainObject doResponseEdit = new DomainObject(responseId);
        		
        		doResponseEdit.setAttributeValue(context, DecConstants.ATTRIBUTE_TITLE, Title);
        		doResponseEdit.setAttributeValue(context, DecConstants.ATTRIBUTE_DECCONTENTDATA, decContentData);
        		doResponseEdit.setAttributeValue(context, DecConstants.ATTRIBUTE_ORIGINATOR, context.getUser());

        		// 파일 삭제[S]
	         	for(String deleteFile : deleteFileArray){//수정 할때 삭제 할 첨부파일이 존재할 경우
	         		if(!deleteFile.equalsIgnoreCase("NoData")){
	         			MqlUtil.mqlCommand(context,"delete bus $1 format $2 file $3",responseId,"generic",deleteFile);
	         		}
	         	}
        		// 파일 삭제[E]
        				
	         	// 파일 업로드[S]
				if(ProgramCentralUtil.isNotNullString(fileName)){
					
					// 업로드한 파일의 전체 경로를 DB에 저장하기 위함
					String m_fileFullPath = savePath + "/" + fileName;
					
					File file = new File(m_fileFullPath);
					
					// 1. decRequest
					// 2. checkin
					
					DomainObject doObj = DomainObject.newInstance(context, responseId);
					doObj.checkinFile(context, false, true, "", "generic", file.getName(), savePath);
					
				}
        	}
			ContextUtil.commitTransaction(context);
%>
        <script language="Javascript">
        	getTopWindow().closeSlideInDialog();
        	<%if(mode.equalsIgnoreCase("create") && ProgramCentralUtil.isNotNullString(objectId)){%>
        	alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Common.RequestSuccess</emxUtil:i18nScript>");
        	<%} else if(mode.equalsIgnoreCase("edit")){%>
        	alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Common.RequestEditSuccess</emxUtil:i18nScript>");
        	<%}%>
        	
        	<%if(openerFrame.equalsIgnoreCase("content")){%>
        	top.findFrame(top,"content").location.reload();
        	<%}%>
        </script>
<%
        }
        catch(Exception e)
        {
        	e.printStackTrace();
            throw e;
        }

%>

<%@include file = "emxNavigatorBottomErrorInclude.inc"%>
