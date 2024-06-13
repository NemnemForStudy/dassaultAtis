<%--  emxCollectionsEditProcess.jsp  - To edit Collections
 Copyright (c) 2003-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program

   decemxProjectDetailsViewFormProcess.jsp 
   Created By thok 2023-05-31
--%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@page import="com.matrixone.apps.domain.util.ContextUtil" %>
<%@page import="java.text.SimpleDateFormat" %>
<%@page import="java.util.Calendar" %>
<%@page import="com.matrixone.apps.domain.DomainObject" %><%-- original jsp : emxCollectionsCreateProcess.jsp --%>

<%@include file = "emxNavigatorInclude.inc"%>
<%@include file = "emxNavigatorTopErrorInclude.inc"%>
<%@include file = "enoviaCSRFTokenValidation.inc"%>
<script language="JavaScript" src="scripts/emxUICore.js" type="text/javascript"></script>
<!-- Import the java packages -->

<%
        String strSystemGeneratedCollectionLabel  = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", new Locale(request.getHeader("Accept-Language")), "emxFramework.ClipBoardCollection.NameLabel");
        String jsTreeID                           = emxGetParameter(request,"jsTreeID");
        String suiteKey                           = emxGetParameter(request,"suiteKey");
        String reloadURL                          = "";
        
        Locale locale = context.getLocale();
    	String timeZone		=(String)session.getAttribute("timeZone");
    	double clientTZOffset = (new Double(timeZone)).doubleValue();
        
        String objectId                           = emxGetParameter(request,"objId");
        
        String decName                     		  = emxGetParameter(request,"decName");
        String decProjectName                     = emxGetParameter(request,"decProjectName");
        String decSiteName 						  = emxGetParameter(request,"decSiteName");
        String decSiteName_EN 					  = emxGetParameter(request,"decSiteName_EN");
        String decBizTypeCode					  = emxGetParameter(request,"decBizTypeCode");
        String decSiteType 						  = emxGetParameter(request,"decSiteType");
        String decDisciplineType 				  = emxGetParameter(request,"decDisciplineType");
        String decLocationStandard 				  = emxGetParameter(request,"decLocationStandard");
        String decArea 					  		  = emxGetParameter(request,"decArea");
        // Rollbacked by hslee on 2023.07.18 --- [s]
        String decCountryCode 					  = emxGetParameter(request,"decCountryCode");
        // Rollbacked by hslee on 2023.07.18 --- [e]
        String decPM_NM 						  = emxGetParameter(request,"decPM_NM");
        String decSV_NM 						  = emxGetParameter(request,"decSV_NM");
        String decPFM_NM 						  = emxGetParameter(request,"decPFM_NM");
        String decPCM_NM 						  = emxGetParameter(request,"decPCM_NM");
        String decProjectClient 				  = emxGetParameter(request,"decProjectClient");
        String decProjectClientCode 			  = emxGetParameter(request,"decProjectClientCode");
        String decProjectSPV 					  = emxGetParameter(request,"decProjectSPV");
        String decProjectDES 					  = emxGetParameter(request,"decProjectDES");
        String decAddress 						  = emxGetParameter(request,"decAddress");
        String decDetailAddress				      = emxGetParameter(request,"decDetailAddress");
        String decTaxAddress				      = emxGetParameter(request,"decTaxAddress");
        String decTotalCost 					  = emxGetParameter(request,"decTotalCost");
        String decOurCompanyCost 				  = emxGetParameter(request,"decOurCompanyCost");
        String decEPCType 						  = emxGetParameter(request,"EPC Category");
        String decCategory1 					  = emxGetParameter(request,"Project Category 1");
        String decCategory2 					  = emxGetParameter(request,"Project Category 2");
        String decCategory3 					  = emxGetParameter(request,"Project Category 3");
        String decLicensor 						  = emxGetParameter(request,"decLicensor");
        String decTotalCost_USD 				  = emxGetParameter(request,"decTotalCost_USD");
        String decOurCompanyCost_USD 			  = emxGetParameter(request,"decOurCompanyCost_USD");
        String decDashboardURL 					  = emxGetParameter(request,"decDashboardURL");

        String decOwner 						  = emxGetParameter(request,"decOwnerOID");
        String decBiddingProject 			  	  = emxGetParameter(request,"decBiddingProjectOID");
        String decOwnerChangeYN					  = emxGetParameter(request,"decOwnerChangeYN");
        String biddingProjectChangeYN 			  = emxGetParameter(request,"biddingProjectChangeYN");
        String decAWP_YN						  = emxGetParameter(request,"AWP");
        String decIWP_YN						  = emxGetParameter(request,"IWP");
        String decKPIDay						  = emxGetParameter(request,"decKPIDay");
        String decProjectStartDate				  = emxGetParameter(request,"decProjectStartDate_msvalue");
        String decPipingShopRatio				  = emxGetParameter(request,"decPipingShopRatio");
        try
        {
        	ContextUtil.startTransaction(context, true);

        	DomainObject projectObject = new DomainObject(objectId);
        	if(decOwnerChangeYN.equalsIgnoreCase("true")){
        		DomainObject ownerObject = new DomainObject(decOwner);
        		projectObject.changeOwner(context, ownerObject.getName(context));
        	}
        	
        	Map map = new HashMap();
        	map.put(DecConstants.ATTRIBUTE_DECSITENAME, decSiteName); 
        	map.put(DecConstants.ATTRIBUTE_DECSITENAME_EN, decSiteName_EN);
        	map.put(DecConstants.ATTRIBUTE_DECBIZTYPECODE, decBizTypeCode);
        	map.put(DecConstants.ATTRIBUTE_DECSITETYPE, decSiteType);
        	map.put(DecConstants.ATTRIBUTE_DECDISCIPLINETYPE, decDisciplineType);
        	map.put(DecConstants.ATTRIBUTE_DECLOCATIONSTANDARD, decLocationStandard);
        	map.put(DecConstants.ATTRIBUTE_DECAREA, decArea);
        	map.put(DecConstants.ATTRIBUTE_DECCOUNTRYCODE, decCountryCode);
        	map.put(DecConstants.ATTRIBUTE_DECPM_NM, decPM_NM);
        	map.put(DecConstants.ATTRIBUTE_DECSV_NM, decSV_NM);
        	map.put(DecConstants.ATTRIBUTE_DECPFM_NM, decPFM_NM);
        	map.put(DecConstants.ATTRIBUTE_DECPCM_NM, decPCM_NM);
        	map.put(DecConstants.ATTRIBUTE_DECPROJECTCLIENT, decProjectClient);
        	map.put(DecConstants.ATTRIBUTE_DECPROJECTCLIENTCODE, decProjectClientCode);
        	map.put(DecConstants.ATTRIBUTE_DECPROJECTSPV, decProjectSPV);
        	map.put(DecConstants.ATTRIBUTE_DECPROJECTDES, decProjectDES);
        	map.put(DecConstants.ATTRIBUTE_DECADDRESS, decAddress);
        	map.put(DecConstants.ATTRIBUTE_DECDETAILADDRESS, decDetailAddress);
        	map.put(DecConstants.ATTRIBUTE_DECTAXADDRESS, decTaxAddress);
        	map.put(DecConstants.ATTRIBUTE_DECTOTALCOST, decTotalCost);
        	map.put(DecConstants.ATTRIBUTE_DECOURCOMPANYCOST, decOurCompanyCost);
        	map.put(DecConstants.ATTRIBUTE_DECEPCTYPE, decEPCType);
        	map.put(DecConstants.ATTRIBUTE_DECCATEGORY1, decCategory1);
        	map.put(DecConstants.ATTRIBUTE_DECCATEGORY2, decCategory2);
        	map.put(DecConstants.ATTRIBUTE_DECCATEGORY3, decCategory3);
        	map.put(DecConstants.ATTRIBUTE_DECLICENSOR, decLicensor);
        	map.put(DecConstants.ATTRIBUTE_DECTOTALCOST_USD, decTotalCost_USD);
        	map.put(DecConstants.ATTRIBUTE_DECOURCOMPANYCOST_USD, decOurCompanyCost_USD);
        	map.put(DecConstants.ATTRIBUTE_DECDASHBOARDURL, decDashboardURL);
        	map.put(DecConstants.ATTRIBUTE_DECAWP_YN, decAWP_YN);
        	map.put(DecConstants.ATTRIBUTE_DECIWP_YN, decIWP_YN);
        	map.put(DecConstants.ATTRIBUTE_DECKPIDAY, decKPIDay);
        	map.put(DecConstants.ATTRIBUTE_DECPIPINGSHOPRATIO, decPipingShopRatio);

        	if(ProgramCentralUtil.isNotNullString(decProjectStartDate))//W1 기준일
            {
        		String inputDate = eMatrixDateFormat.getFormattedInputDate(context
        				, eMatrixDateFormat.getDateValue(context, decProjectStartDate, timeZone, locale)
        				, clientTZOffset
        				, locale);
        		
                map.put(DecConstants.ATTRIBUTE_DECPROJECTSTARTDATE, inputDate);
            }
        	
        	projectObject.setAttributeValues(context, map);
        
			if("true".equalsIgnoreCase(biddingProjectChangeYN)){
				DomainObject object = new DomainObject(objectId);
				String decProjectExecutionRel = object.getInfo(context, "to["+DecConstants.RELATIONSHIP_DECPROJECTEXECUTIONREL+"]."+DecConstants.SYMB_ID);
				if(ProgramCentralUtil.isNotNullString(decProjectExecutionRel)){
					DomainRelationship.disconnect(context,decProjectExecutionRel);
				}
				if(ProgramCentralUtil.isNotNullString(decBiddingProject)){
					DomainObject biddingObject = DomainObject.newInstance(context, decBiddingProject);
		     	    DomainRelationship.connect(context, biddingObject,DecConstants.RELATIONSHIP_DECPROJECTEXECUTIONREL,object);
				}
	        }
			ContextUtil.commitTransaction(context);
%>
        <script language="Javascript">
        	top.findFrame(top,"portalDisplay").location.reload();
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
