/*
 * * Copyright (c) 1992-2020 Dassault Systemes.
 * All Rights Reserved.
 */
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.Vector;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.SqlSession;

import com.daewooenc.mybatis.main.decSQLSessionFactory;
import com.dec.util.DecConstants;
import com.dec.util.DecDateUtil;
import com.dec.util.DecStringUtil;
import com.dec.util.decListUtil;
import com.matrixone.apps.cache.CacheManager;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.framework.ui.UICache;
import com.matrixone.apps.framework.ui.UIComponent;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.program.ProgramCentralConstants;

import matrix.db.*;
import matrix.db.Access;
import matrix.util.MatrixException;
import matrix.util.Pattern;
import matrix.util.StringList;


/**
 * This jpo is used to show the content of extended page header
 * in object details page
 * @author g1f
 *
 */
public class emxExtendedHeader_mxJPO extends emxExtendedHeaderBase_mxJPO{
    
        
    /**
     * @param context <code>matrix.db.Context</code>
     * @param args
     * @throws Exception
     */
    public emxExtendedHeader_mxJPO(Context context, String[] args) throws Exception {
    	super(context, args);
    }       
    public StringBuilder getHeaderContents(Context context, String[] args) throws Exception {

        try {
			StringBuilder sbResults = new StringBuilder();
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			String sLanguage = (String)programMap.get("language");
			String sOID = (String) programMap.get("objectId");
			String documentDropRelationship	= (String) programMap.get("documentDropRelationship");
			String documentCommand		= (String) programMap.get("documentCommand");
			String showStatesInHeader	= (String) programMap.get("showStatesInHeader");
			String showDescriptionInHeader	= (String) programMap.get("showDescriptionInHeader");
			String imageDropRelationship	= (String) programMap.get("imageDropRelationship");
			String timeZone=(String)programMap.get("timeZone");
			String imageManagerToolbar = (String)programMap.get("imageManagerToolbar");
			String imageUploadCommand = (String)programMap.get("imageUploadCommand");
			String showUploadImageInPersonHeader= (String)programMap.get("showUploadImageInPersonHeader");

			String strNoImages = EnoviaResourceBundle.getProperty(context, "emxFramework.DnD.NoImages");	
			String strNoUploadKind = EnoviaResourceBundle.getProperty(context, "emxFramework.DnD.NoUploadKind");	
			String strNoUploadType = EnoviaResourceBundle.getProperty(context, "emxFramework.DnD.NoUploadType");
			
			List<String> lNoImages=Arrays.asList(strNoImages.split(","));                
			List<String> lNoUploadKind =Arrays.asList(strNoUploadKind.split(","));       
			List<String> lNoUploadType = Arrays.asList(strNoUploadType.split(","));

			if(UIUtil.isNullOrEmpty(documentDropRelationship)){
				documentDropRelationship = "Reference Document";
			}
			if( UIUtil.isNullOrEmpty(documentCommand)){
				documentCommand = "APPReferenceDocumentsTreeCategory";
			}

			String sMCSURL              = (String) programMap.get("MCSURL");
			DomainObject dObject        = new DomainObject(sOID);
			StringList selBUS           = new StringList();

			StringBuilder sbContentImage        = new StringBuilder();
			StringBuilder sbContentName         = new StringBuilder();
			StringBuilder sbContentDescription  = new StringBuilder();
			StringBuilder sbContentDetails      = new StringBuilder();
			StringBuilder sbContentDocuments    = new StringBuilder();
			StringBuilder sbIcon                = new StringBuilder();
			StringBuilder sbRevision            = new StringBuilder();
			StringBuilder sbRevisionTitle       = new StringBuilder();
			StringBuilder sbHigherRevisionExists = new StringBuilder();
			StringBuilder sbContentLifeCycle    = new StringBuilder();
			StringBuilder sb1stSector  = new StringBuilder();  // WBS Info
			StringBuilder sb2ndSector  = new StringBuilder();  // CWP/IWP Info
			StringBuilder sb3rdSector  = new StringBuilder();  // CWP/IWP Plan Date
			String sLinkPrefix          = "onClick=\"showNonModalDialog('../common/emxTree.jsp?mode=insert";
			String sLinkSuffix          = "', '950', '680', true, 'Large');\"";

			String sLabelHigherRevision = EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.EngineeringChange.HigherRevisionExists", sLanguage);
			String sLabelOwner          = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Basic.Owner", sLanguage);
			String sLabelModified       = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Basic.Modified", sLanguage);

			selBUS.add(DomainConstants.SELECT_TYPE);
			selBUS.add("type.kindof");
			selBUS.add("type.kindof["+DomainConstants.TYPE_TASK_MANAGEMENT+"]");
			selBUS.add(DomainConstants.SELECT_NAME);
			selBUS.add(DomainConstants.SELECT_REVISION);
			selBUS.add(DomainConstants.SELECT_CURRENT);
			selBUS.add(DomainConstants.SELECT_DESCRIPTION);
			selBUS.add(DomainConstants.SELECT_MODIFIED);
			selBUS.add(DomainConstants.SELECT_OWNER);
			selBUS.add("last");
			selBUS.add("attribute["+PropertyUtil.getSchemaProperty(context,DomainSymbolicConstants.SYMBOLIC_attribute_MarketingName)+"]");
			selBUS.add("attribute["+PropertyUtil.getSchemaProperty(context,DomainSymbolicConstants.SYMBOLIC_attribute_DisplayName)+"]");
			selBUS.add("attribute[" + DomainConstants.ATTRIBUTE_TITLE + "]");
			selBUS.add(DomainConstants.SELECT_HAS_FROMCONNECT_ACCESS);
			selBUS.add(DomainConstants.SELECT_HAS_CHECKIN_ACCESS);
			selBUS.add(DomainConstants.SELECT_HAS_MODIFY_ACCESS);
			selBUS.add("project");
			Map mData 		= dObject.getInfo(context, selBUS);
			String sType 		= (String)mData.get(DomainConstants.SELECT_TYPE);
			String sKind 		= (String)mData.get("type.kindof");
			String sKindTask	= (String)mData.get("type.kindof["+DomainConstants.TYPE_TASK_MANAGEMENT+"]");
			String sName 		= (String)mData.get(DomainConstants.SELECT_NAME);
			String sRevision 	= (String)mData.get(DomainConstants.SELECT_REVISION);
			String sDescription     = (String)mData.get(DomainConstants.SELECT_DESCRIPTION);
			String sModified        = (String)mData.get(DomainConstants.SELECT_MODIFIED);
			String sOwner = PersonUtil.getFullName(context, (String)mData.get(DomainConstants.SELECT_OWNER));
			String sLast 		= (String)mData.get("last");
			String fromConnect 		= (String)mData.get(DomainConstants.SELECT_HAS_FROMCONNECT_ACCESS);
			String checkInAccess	= (String)mData.get(DomainConstants.SELECT_HAS_CHECKIN_ACCESS);
			String modifyAccess  = (String)mData.get(DomainConstants.SELECT_HAS_MODIFY_ACCESS);
			
      // IR-511566: we show any one of these attribute "Title", "Display Name" or "Marketing Name", which will not be null in the sequence.
			String sMarketingName 	= (String)mData.get("attribute[" + DomainConstants.ATTRIBUTE_TITLE + "]");
			if(UIUtil.isNullOrEmpty(sMarketingName)) {
				sMarketingName	= (String)mData.get("attribute["+PropertyUtil.getSchemaProperty(context,DomainSymbolicConstants.SYMBOLIC_attribute_DisplayName)+"]");
				if(UIUtil.isNullOrEmpty(sMarketingName)){
					sMarketingName  = (String)mData.get("attribute["+PropertyUtil.getSchemaProperty(context,DomainSymbolicConstants.SYMBOLIC_attribute_MarketingName)+"]");
				}
			}

			if(sKind.equals(DomainConstants.TYPE_ORGANIZATION)) {
				sName = sMarketingName;
				sMarketingName="";
			}
			//adding additional params required for genHeaderImage()
			programMap.put("bFromJSP", false);
			
			if((lNoImages.indexOf(sKind) == -1)) {
			        sbContentImage.append("<div class=\"headerImage\" id=\"divExtendedHeaderImage\">");
					if(!"hide".equalsIgnoreCase(showUploadImageInPersonHeader)){ 
						sbContentImage.append("<span id=\"extendedHeaderImage\">").append(genHeaderImage(context, args, sOID, sLanguage, sMCSURL, imageDropRelationship, false, modifyAccess)).append("</span>");
					}
			        sbContentImage.append("</div>");
			}

			// REVISION details
			    if(!sRevision.equals("-")) {
			        if(!sRevision.equals(" ")) {
			            if(!sRevision.equals("")) {
			                sbRevision.append(" (").append(sRevision);
			                sbRevisionTitle.append(" (").append(sRevision);
			                if(!sLast.equalsIgnoreCase(sRevision)) {
			                    BusinessObject boLast   = dObject.getLastRevision(context);
			                    String sOIDLast         = boLast.getObjectId();
			                    sbHigherRevisionExists.append(" <img style='vertical-align:middle;height:16px;cursor:pointer;' src='../common/images/iconSmallStatusAlert.gif' ");
			                    sbHigherRevisionExists.append(sLinkPrefix);
			                    sbHigherRevisionExists.append("&objectId=").append(XSSUtil.encodeForURL(context, sOIDLast));
			                    sbHigherRevisionExists.append(sLinkSuffix);
			                    sbHigherRevisionExists.append(" title='").append(sLabelHigherRevision).append(" : ").append(XSSUtil.encodeForHTMLAttribute(context,sLast)).append("'> ");
			                }
			                sbRevision.append(")");
			                sbRevisionTitle.append(")");
			            }
			        }
			    }

			// NAME
			sbIcon.append("  <img class='typeIcon' ");
			sbIcon.append(" src='../common/images/").append(UINavigatorUtil.getTypeIconProperty(context, sType)).append("' />");
			
			if(DomainConstants.TYPE_CONTROLLED_FOLDER.equalsIgnoreCase(sType)){
				
				sName = sMarketingName;
				sMarketingName = DomainConstants.EMPTY_STRING;
			}
			sbContentName.append("<span title='"+ XSSUtil.encodeForHTMLAttribute(context,sName)+"' class=\"extendedHeader name\">").append(XSSUtil.encodeForHTML(context,sName)).append("</span>");
			if(UIUtil.isNotNullAndNotEmpty(sMarketingName)) {
			    sbContentName.append("<span title='"+XSSUtil.encodeForHTMLAttribute(context,sMarketingName)+"' class=\"extendedHeader marketing-name\">");
			    sbContentName.append(XSSUtil.encodeForHTML(context,sMarketingName));
			    sbContentName.append("</span>");

			}
			if(UINavigatorUtil.isMobile(context)){
				sbContentName.append("<br>");
			}
			String typeName = EnoviaResourceBundle.getTypeI18NString(context, sType, sLanguage);
			String typeRevisionTooltip = typeName+ sbRevisionTitle.toString();
			sbContentName.append("<span class=\"extendedHeader\">").append(sbIcon);
			sbContentName.append("<span class=\"extendedHeader type-name\" title='"+XSSUtil.encodeForHTMLAttribute(context,typeRevisionTooltip) +"'>").append(typeName).append(sbRevision.toString());
			sbContentName.append("</span>");
			if(sbHigherRevisionExists.length() != 0) {
			    sbContentName.append("<span class=\"extendedHeader higher-revision-exists\">").append(sbHigherRevisionExists.toString()).append("</span>");
			}
			sbContentName.append(genHeaderAlerts(context, sOID, sLanguage, false));
			// to not show the lifecycle in header on the basis of setting
			if(!"hide".equalsIgnoreCase(showStatesInHeader)){
			sbContentLifeCycle.append("<span id=\"extendedHeaderStatus\" class=\"extendedHeader state\">");

			if(!UINavigatorUtil.isMobile(context)){
				sbContentLifeCycle.append(genHeaderStatus(context, sOID, sLanguage, false)).append("</span>");
			}else{
				sbContentLifeCycle.append(genHeaderStatus(context, sOID, sLanguage, false)).append("</span>");
			}
			}
			// DESCRIPTION
			if(!"hide".equalsIgnoreCase(showDescriptionInHeader)){ if(null != sDescription) { if(!"".equals(sDescription)) {
//			    sbContentDescription.append("<div class=\"headerContent\" id=\"divExtendedHeaderDescription\" ");
			    sbContentDescription.append("<div class=\"headerContent\" id=\"divExtendedHeaderDescription\" style=\"border-left: 1px solid #aaa;\""); // Modified by hslee on 2023.08.01
			    String sText = sDescription.replaceAll("\n", "<br/>");

			    if(sText.length() > 106) {
			        sbContentDescription.append(" title='").append(XSSUtil.encodeForHTMLAttribute(context,sDescription)).append("'");
			    }

			    sbContentDescription.append("><span class=\"extendedHeader content\">");
			    sbContentDescription.append(XSSUtil.encodeForHTML(context,sText,false));
			    sbContentDescription.append("</span></div>");
			}}}

			if(!UINavigatorUtil.isMobile(context)){
			sbContentDetails.append(sbContentLifeCycle.toString());
			sbContentDetails.append("<span class=\"extendedHeader\">").append(sLabelOwner).append(" : " ).append(XSSUtil.encodeForHTML(context,sOwner)).append("</span>");
			sbContentDetails.append("<span id=\"extendedHeaderModified\" class=\"extendedHeader\">").append(sLabelModified).append(" : " );
			sbContentDetails.append("<a onclick=\"javascript:showPageHeaderContent('");
			
			// when user click on last modified link, it will open OOTB history page by executing any one of below available command in
			// category menu.
			String historyCommands = "'AEFHistory','APPDocumentHistory','APPRouteHistory'";
			String strUrl = "../common/emxHistory.jsp?HistoryMode=CurrentRevision&Header=emxFramework.Common.History&objectId=" + XSSUtil.encodeForURL(context,sOID);
			sbContentDetails.append(strUrl +"','',new Array("+ historyCommands +"));\"");
			sbContentDetails.append(" >");
			double iClientTimeOffset = (new Double(timeZone)).doubleValue();
			int iDateFormat = PersonUtil.getPreferenceDateFormatValue(context);
			boolean bDisplayTime = true; //PersonUtil.getPreferenceDisplayTimeValue(context);
			sModified = eMatrixDateFormat.getFormattedDisplayDateTime(context,sModified, bDisplayTime, iDateFormat, iClientTimeOffset, new Locale(context.getSession().getLanguage()));
			sbContentDetails.append(XSSUtil.encodeForHTML(context,sModified));
			sbContentDetails.append("</a></span>");
			}

			if(lNoUploadKind.indexOf(sKind) == -1) {
			    if(lNoUploadType.indexOf(sType) == -1) {
					 if(!sKind.equals("DOCUMENTS")){ 
			    		 checkInAccess="true";
			    	 }
			        //if("true".equalsIgnoreCase(fromConnect) && "true".equalsIgnoreCase(checkInAccess) && canAttachDocument(context, sOID, sType, documentDropRelationship, sKind, sKindTask)){
			        if(canAttachDocument(context, sOID, sType, documentDropRelationship, sKind, sKindTask)){
			        		sbContentDocuments.append(genHeaderDocuments(context, sOID, documentDropRelationship, documentCommand, sLanguage, false, timeZone));
			        }
			    }
			}
			
			
    // Modified by choimingi on 2023.05.24
			String memberId = ProgramCentralConstants.SELECT_MEMBER_ID;
			String loginUserQuery = MqlUtil.mqlCommand(context, "temp query bus Person "+context.getUser()+" * select id");
			 int lastIndex = loginUserQuery.lastIndexOf("=");
			 String loginUserId = loginUserQuery.substring(lastIndex+2);							
			 System.out.println("로그인유저id:" + loginUserId );
			String SDropbox = "Project Space";
			StringList busSelects = new StringList();
			busSelects.add(DomainObject.SELECT_ID); //프로젝트 id
			busSelects.add(DomainObject.SELECT_NAME); // 프로젝트 이름
      // busSelects.add(DecConstants.SELECT_ATTRIBUTE_DECPROJECTTYPE); // 어트리부트테스트
			busSelects.add(ProgramCentralConstants.SELECT_MEMBER_ID); // 연결된 멤버의 id..
			busSelects.add(ProgramCentralConstants.SELECT_PROJECT_LEAD_NAME);
      // String memberId = ProgramCentralConstants.SELECT_MEMBER_ID;
			MapList mpProjectList = new MapList();
			String typePattern = "Project Space";       
			///////
			DomainObject openProjectDom = new DomainObject(sOID);
			String getPType = openProjectDom.getAttributeValue(context, "decProjectType");
			String getDashboard = openProjectDom.getAttributeValue(context, "decDashboardURL");
			///////
			String gdps = openProjectDom.getAttributeValue(context, "decProjectStatus");
			String getProperties = "emxFramework.Range.decProjectStatus."+gdps;
			String propertiesStatus = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(),
					getProperties); 
			
			String sText2 = sDescription.replaceAll("\n", "<br/>");
			
			
			
			if(sText2.length() > 106) {
			    sbContentDescription.append(" title='").append(XSSUtil.encodeForHTMLAttribute(context,sDescription)).append("'");
			}

			String sProjectAdmin = EnoviaResourceBundle.getProperty(context, "emxProgramCentralStringResource", context.getLocale(),
					"emxProgramCentral.Label.ProjectHeaderAdministrator");
			String pOngoing = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(),
					"emxFramework.Attribute.OngoingProject");
			String pBidding = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(),
					"emxFramework.Attribute.BiddingProject"); 
			String pDashboard = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(),
					"emxFramework.Label.projectHeaderDashboard"); 
			/*
			mpProjectList =  DomainObject.findObjects(context, typePattern, "*","(type == 'Project Space') && (current != 'Complete') && (current != 'Archive') && (current != 'Hold') && (current != 'Cancel') && (attribute[decProjectType]=='"+getPType+"')",
					busSelects);       //("+memberId+"=="+loginUserId+") && 
			MapList mpCompareProjectList = new MapList(mpProjectList);
			*/
			 // ##### 헤더영역 내용 append
			
//         sbContentProject.append("<span title= 'project' class=\"extendedHeader project-name\">").append(sProjectName).append(" : ");
			boolean isProject = DecConstants.TYPE_PROJECT_SPACE.equals(sType);
			boolean isDeliverableDoc = DecConstants.TYPE_DECDELIVERABLEDOC.equals(sType);
			boolean isVendorPrint = DecConstants.TYPE_DECVPDOCUMENT.equals(sType);
			if ( isProject )
			{
				// 1st Sector
				sb1stSector.append("<span title= 'project' class=\"extendedHeader project-name\">");
				
				String current = (String) mData.get(DecConstants.SELECT_CURRENT);
				String siteName = dObject.getInfo(context, DecConstants.SELECT_ATTRIBUTE_DECSITENAME);
				if ( "Complete".equals(current) || "Archive".equals(current) || "Hold".equals(current) || "Cancel".equals(current) )
				{
					sb1stSector.append("<b>").append(sName).append(" ").append(siteName).append("</b>");
				}
				else
				{
					emxProjectSpace_mxJPO projectJPO = new emxProjectSpace_mxJPO(sOID);
					Map projectParamMap = new HashMap();
					projectParamMap.put("projectType", getPType);
					MapList mpCompareProjectList = projectJPO.getProjectCodeList(context, JPO.packArgs(projectParamMap));
					
					sb1stSector.append("<select id=\"project-combo\" onchange=\"javascript:getDefaultCategory()\">");
					for (int i = 0 ; i <mpCompareProjectList.size(); i++) {
						Map hashmap = (Hashtable) mpCompareProjectList.get(i);
//						String relMemberId = (String) hashmap.get(memberId);
						String projectN = (String) hashmap.get("name");
						String projectId = (String) hashmap.get("id");
						String project_siteN = (String) hashmap.get(DecConstants.SELECT_ATTRIBUTE_DECSITENAME);
//						DomainObject poject_dom = new DomainObject(projectId);
//						String project_siteN = poject_dom.getAttributeValue(context, "decSiteName");
	  	 
//						if(!relMemberId.contains(loginUserId)) {
//							mpProjectList.remove(hashmap);
//							System.out.println("삭제된 해쉬맵:"+ i +" 번 , "+ hashmap);
//						}else {
							if(sOID.equals(projectId)) {
								sb1stSector.append("<option selected id=\"");
							}else{
								sb1stSector.append("<option id=\""); 
							}	       		 
							sb1stSector.append(projectId).append("\">");
							sb1stSector.append(projectN).append(" ").append(project_siteN).append("</option>");
//						}
					}
					sb1stSector.append(XSSUtil.encodeForHTMLAttribute(context,sName));
					sb1stSector.append("</select>");
				}
				
				sb1stSector.append("</span>");
			   	 
				if(DecStringUtil.equals(getPType, "ongoing")) {
					sb1stSector.append("<span style=\"display: block; font-weight:600;\">"+pOngoing).append("&nbsp;&nbsp;");
				}else if(DecStringUtil.equals(getPType, "bidding")) {
					sb1stSector.append("<span style=\"display: block; font-weight:600;\">"+pBidding).append("&nbsp;&nbsp;");
				}
				sb1stSector.append("<span id=\"project-status\" style=\"  display:inline-block; width:90px ;color: #ffffff; text-align:center; font-weight: normal; background: linear-gradient(to bottom, #04A3CF, #368EC4); border-radius: 5px; padding: 0px 0px;\">"+propertiesStatus+"</span></span>");
				sb1stSector.append("<span style=\"display: block; font-weight:600;\">").append(sProjectAdmin).append(" : ");
				sb1stSector.append("<span style=\"font-weight:normal;\">").append(XSSUtil.encodeForHTML(context,sOwner)).append("</span>");
				
				// 2nd Sector
				sb2ndSector.append("<div class=\"extendedHeader project-dashboard\" style=\" cursor: pointer; text-align:center;\"");
				// Modified by jhlee on 2023-09-12 [B]
			//	if ( StringUtils.isEmpty(getDashboard) )
			//	{
			//		sb2ndSector.append(" onclick=\"javascript:alert('" + EnoviaResourceBundle.getProperty(context, "emxProgramCentralStringResource", context.getLocale(), "emxProgramCentral.Msg.DashboardURLIsNotDefined") + "');\" >");
			//	}
			//	else
			//	{
			//		sb2ndSector.append("onclick=\"javascript:window.open('"+getDashboard+"')\">");
			//	}
				sb2ndSector.append("onclick=\"javascript:window.open('../common/decDashboardLink.jsp?objectId=" + sOID + "', 'hiddenFrame')\">");
				// Modified by jhlee on 2023-09-12 [E]
				sb2ndSector.append("<img src=\"../widget/images/MyApps/X3DDASH_AP_AppIcon.svg\" style=\"height:42px; display:inline-block; text-align:center;\"><br/>");
				sb2ndSector.append("</div>");
				sb2ndSector.append("<span style=\"font-weight:bold;\">"+pDashboard+"</span>");
			}
			else if ( isDeliverableDoc || isVendorPrint )
			{
				// 1st Sector
				String projectExpr = dObject.getInfo(context, "to[Task Deliverable].from[Project Space].evaluate[name + \" \" + attribute[decSiteName]]");
				
				sb1stSector.append("<span title= 'project' class=\"extendedHeader\"><b>")
					.append(projectExpr)
					.append("</b></span>");
				sb1stSector
					.append("<span>")
					.append(XSSUtil.encodeForHTML(context, sName))
					.append("</span><br/>");
				sb1stSector.append(sbIcon.toString())
					.append("&nbsp;")
					.append("<span>")
					.append(i18nNow.getTypeI18NString(sType, context.getLocale().getCountry()))
					.append("</span><br/>");
			}
			
			String isTaskMgmtExpr = MqlUtil.mqlCommand(context, "print type $1 select $2 dump", sType, "kindof[Task Management]");
			boolean isTaskMgmt = Boolean.valueOf(isTaskMgmtExpr);
			if ( isTaskMgmt )
			{
				StringList slSelect = new StringList();
				slSelect.add("to[Project Access Key].from.from[Project Access List].to.id");
				slSelect.add("to[Project Access Key].from.from[Project Access List].to.attribute[decSiteName]");
				slSelect.add(DecConstants.SELECT_CURRENT);
				slSelect.add(DecConstants.SELECT_ATTRIBUTE_DECSTAGE);
				slSelect.add(DecConstants.SELECT_ATTRIBUTE_DECDISCIPLINE);
				slSelect.add(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
				slSelect.add(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
				slSelect.add(DecConstants.SELECT_ATTRIBUTE_DECMATERIALRAS);
				slSelect.add("to[Subtask].from[" + DecConstants.TYPE_DECCWPTASK + "]." + DecConstants.SELECT_ATTRIBUTE_DECDISCIPLINE);
				slSelect.add("to[Subtask].from[" + DecConstants.TYPE_DECCWPTASK + "]." + DecConstants.SELECT_ATTRIBUTE_DECRELEASEACTUAL);
				
				Map projectInfo = dObject.getInfo(context, slSelect);
				
				String projectId = (String) projectInfo.get("to[Project Access Key].from.from[Project Access List].to.id");
				String siteName = (String) projectInfo.get("to[Project Access Key].from.from[Project Access List].to.attribute[decSiteName]");
				sb1stSector.append("<span title= 'project' class=\"extendedHeader project-name\" style='font-weight: bolder;'>").append(siteName).append("</span>");
				
				if ( !DecConstants.TYPE_DECCWPTASK.equals(sType) && !DecConstants.TYPE_DECIWPTASK.equals(sType) )
				{
					sb1stSector.append(sbIcon.toString())
			    		.append("&nbsp;")
						.append("<span style=\"font-weight: bolder;\">")
						.append(dObject.getInfo(context, DecConstants.SELECT_ATTRIBUTE_DECWBSTYPE))
						.append("&nbsp;")
						.append(XSSUtil.encodeForHTML(context, sName))
						.append("</span><br/>");
				}
				else
				{
					sb1stSector.append(sbIcon.toString())
						.append("&nbsp;")
						.append("<span style=\"font-weight: bolder;\">")
						.append(XSSUtil.encodeForHTML(context, sName))
						.append("</span><br/>");
					
					decCodeMaster_mxJPO codeJPO = new decCodeMaster_mxJPO();
					String dpCode = null;
					String dpDesc = null;
					if ( DecConstants.TYPE_DECCWPTASK.equals(sType) )
					{
						dpCode = (String) projectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECDISCIPLINE);
					}
					else
					{
						dpCode = (String) projectInfo.get("to[Subtask].from[" + DecConstants.TYPE_DECCWPTASK + "]." + DecConstants.SELECT_ATTRIBUTE_DECDISCIPLINE);
					}
					dpDesc = codeJPO.getCodeDetailDisplayValueWithCodePath (context, projectId, null, "Discipline", null, new String[] {dpCode});
					
					MapList cwpIwpStageList = codeJPO.getProjectCodeDetailList(context, projectId, "CWP/IWP Stage");
					Map<String, Map> cwpIwpStageMap = decListUtil.getSelectKeyDataMapForMapList(cwpIwpStageList, DecConstants.SELECT_ATTRIBUTE_DECCODE);
					
					MapList cwpIwpStatusList = codeJPO.getProjectCodeDetailList(context, projectId, "CWP/IWP Status");
					Map<String, Map> cwpIwpStatusMap = decListUtil.getSelectKeyDataMapForMapList(cwpIwpStatusList, DecConstants.SELECT_ATTRIBUTE_DECCODE);
					
					String stageCode = null;
					String stageDesc = null;
					String forecastStartDate = null;
					String estimatedStartDate = null;
					String current = null;
					String statusCode = null;
					String statusDesc = null;
					
					stageCode = (String) projectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECSTAGE);
					if ( cwpIwpStageMap.containsKey(stageCode) ) 
					{
						stageDesc = (String) cwpIwpStageMap.get(stageCode).get(DecConstants.SELECT_DESCRIPTION);
					}
					else
					{
						stageDesc = stageCode;
					}
					
					// get Status
					forecastStartDate = (String) projectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
					estimatedStartDate = (String) projectInfo.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
					current = (String) projectInfo.get(DecConstants.SELECT_CURRENT);
					
					emxTask_mxJPO taskJPO = new emxTask_mxJPO(context, null);
					String today = DecDateUtil.changeDateFormat(new Date(), DecDateUtil.IF_FORMAT);
					statusCode = taskJPO.getCWPTaskStateName(context, forecastStartDate, estimatedStartDate, current, today, context.getLocale());
					if ( cwpIwpStatusMap.containsKey(statusCode) ) 
					{
						statusDesc = (String) cwpIwpStatusMap.get(statusCode).get(DecConstants.SELECT_DESCRIPTION);
					}
					else
					{
						statusDesc = statusCode;
					}
					
					sb2ndSector.append("<span class=\"extendedHeader\">").append("<b>DP</b> : ").append(dpDesc).append("</span>");
					sb2ndSector.append("<span class=\"extendedHeader\">").append("<b>Stage</b> : ").append(stageDesc).append("</span>");
					sb2ndSector.append("<span class=\"extendedHeader\">").append("<b>Status</b> : ").append(statusDesc).append("</span>");
					
					Locale locale = context.getLocale();
					
					if ( DecConstants.TYPE_DECCWPTASK.equals(sType) )
					{
						String RAS = (String) projectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECMATERIALRAS);
						RAS = DecDateUtil.getFormattedDisplayDate(context, RAS, locale);
						estimatedStartDate = DecDateUtil.getFormattedDisplayDate(context, estimatedStartDate, locale);
						
						// Modified by thok 2023.11.03 [S]
						String cwpMaterialAvailability = DecConstants.EMPTY_STRING;
						try (SqlSession sqlSession = decSQLSessionFactory.getSession()){
							Map selectParamMap = new HashMap();
					    	selectParamMap.put("CWP_NO",dObject.getInfo(context, DecConstants.SELECT_NAME));
					    	List<Map> cwpMap = sqlSession.selectList("Project.selectCWPMaterialAvailability", selectParamMap);
					    	for(Object obj : cwpMap) {
					    		Map object = (Map) obj;
					    		if(object!=null) {
					    			cwpMaterialAvailability = (String) object.get("WKOP_ABLE_YMD");
					    			cwpMaterialAvailability = cwpMaterialAvailability.substring(6,8) + "/" 
					    									+ cwpMaterialAvailability.substring(4,6) + "/"
					    									+ cwpMaterialAvailability.substring(0,4) + " 12:00:00 PM";
					    			cwpMaterialAvailability = DecDateUtil.getFormattedDisplayDate(context, cwpMaterialAvailability, locale);
					    		}
					    	}
						} catch(Exception e){
				    		e.printStackTrace();
				    	}
						sb3rdSector.append("<span class=\"extendedHeader\">").append("<b>RAS</b> : ").append(RAS).append("</span>");
						sb3rdSector.append("<span class=\"extendedHeader\">").append("<b>Material Availability</b> : ").append(cwpMaterialAvailability).append("</span>");// Modified by thok 2023.11.03 [E]
						sb3rdSector.append("<span class=\"extendedHeader\">").append("<b>Plan Start</b> : ").append(estimatedStartDate).append("</span>");
					}
					else
					{
						String cwpReleaseActual = (String) projectInfo.get("to[Subtask].from[" + DecConstants.TYPE_DECCWPTASK + "]." + DecConstants.SELECT_ATTRIBUTE_DECRELEASEACTUAL);
						cwpReleaseActual = DecDateUtil.getFormattedDisplayDate(context, cwpReleaseActual, locale);
						estimatedStartDate = DecDateUtil.getFormattedDisplayDate(context, estimatedStartDate, locale);
						forecastStartDate = DecDateUtil.getFormattedDisplayDate(context, forecastStartDate, locale);
						
						sb3rdSector.append("<span class=\"extendedHeader\">").append("<b>CWP Released</b> : ").append(cwpReleaseActual).append("</span>");
						sb3rdSector.append("<span class=\"extendedHeader\">").append("<b>Plan Start</b> : ").append(estimatedStartDate).append("</span>");
						sb3rdSector.append("<span class=\"extendedHeader\">").append("<b>Forecast Start</b> : ").append(forecastStartDate).append("</span>");
					}
				}
				sb1stSector.append("<span style=\"font-weight:normal;\">").append(XSSUtil.encodeForHTML(context, sDescription)).append("</span>");
			}
			 
			 // Modified by choimingi on 2023.05.24
			
			// FINAL TABLE
			if(!UINavigatorUtil.isMobile(context)){
			sbResults.append("<div id=\"divExtendedHeaderContent\" o=\"").append(XSSUtil.encodeForHTML(context,sOID)).append("\" dr=\"").append(XSSUtil.encodeForHTML(context,documentDropRelationship)).append("\" dc=\"")
			.append(XSSUtil.encodeForHTML(context,documentCommand)).append("\" showStates=\"").append(XSSUtil.encodeForHTML(context, showStatesInHeader)).append("\" showDescription=\"").append(XSSUtil.encodeForHTML(context, showDescriptionInHeader)).append("\" idr=\"").append(XSSUtil.encodeForHTML(context,imageDropRelationship)).append("\" mcs=\"").append(XSSUtil.encodeForHTML(context,sMCSURL)).append("\">");

			sbResults.append(sbContentImage.toString());
//        if(sType.equals(SDropbox)) {
			if( sb1stSector.length() > 0 ) {
			    sbResults.append("<div class=\"headerContent\" id=\"divExtendedHeaderProject\">").append(sb1stSector.toString()).append("</div>");
			}else {
			    sbResults.append("<div class=\"headerContent\" id=\"divExtendedHeaderName\">").append(sbContentName.toString()).append("</div>");
			}
			if( sb2ndSector.length() > 0 ) {
				sbResults.append("<div class=\"headerContent\" id=\"divExtendedHeader2nd\">").append(sb2ndSector.toString()).append("</div>");
			}
			if( sb3rdSector.length() > 0 ) {
				sbResults.append("<div class=\"headerContent\" id=\"divExtendedHeader3rd\">").append(sb3rdSector.toString()).append("</div>");
			}
			if( !isProject && !isTaskMgmt ) {
				sbResults.append(sbContentDescription.toString());
				if ( !isDeliverableDoc && !isVendorPrint )
				{
					sbResults.append("<div class=\"headerContent\" id=\"divExtendedHeaderDetails\">").append(sbContentDetails.toString()).append("</div>");
				}
			}
			if(sType.equals(SDropbox)) {
			// Modified by choimingi on 2023.05.24
			// Modified by choimingi on 2023.05.24
			}
			if(sbContentDocuments.length() > 0) {
			    sbResults.append("<div class=\"headerContent\" id=\"divExtendedHeaderDocuments\" >").append(sbContentDocuments.toString()).append("</div>");
			}
			}else{
				sbResults.append("<div id=\"divExtendedHeaderContent\" o=\"").append(XSSUtil.encodeForHTML(context,sOID)).append("\" dr=\"").append(XSSUtil.encodeForHTML(context,documentDropRelationship)).append("\" dc=\"")
								.append(XSSUtil.encodeForHTML(context,documentCommand)).append("\" showStates=\"").append(XSSUtil.encodeForHTML(context,showStatesInHeader)).append("\" showDescription=\"").append(XSSUtil.encodeForHTML(context, showDescriptionInHeader)).append("\" idr=\"").append(XSSUtil.encodeForHTML(context,imageDropRelationship)).append("\" mcs=\"").append(XSSUtil.encodeForHTML(context,sMCSURL)).append("\">");
			    sbResults.append(sbContentImage.toString());
			    if(sbContentDocuments.length() > 0) {
			    	sbResults.append("<div class=\"headerContent\" id=\"divExtendedHeaderName\">").append(sbContentName.toString()).append(sbContentDocuments.toString()).append(sbContentLifeCycle.toString()).append("</div>");
			    }else{
			    	sbResults.append("<div class=\"headerContent\" id=\"divExtendedHeaderName\">").append(sbContentName.toString()).append(sbContentLifeCycle.toString()).append("</div>");
			    }
			}

			sbResults.append("</div>");
 String personCollabSpaceName = PersonUtil.getActiveProject(context);
 String collabspace = (String)mData.get("project");
 
 String personCollabSpaceTitle = "";
 if(!UIUtil.isNullOrEmpty(collabspace) && !personCollabSpaceName.equals(collabspace)){
			 personCollabSpaceTitle = PersonUtil.getProjectTitle(context, collabspace);
			 personCollabSpaceTitle = UIUtil.isNotNullAndNotEmpty(personCollabSpaceTitle) ? personCollabSpaceTitle : collabspace;

			sbResults.append("<div id='collab-space-id' class='header full'>");
			 sbResults.append(personCollabSpaceTitle);
			sbResults.append("</div>");
 }
    sbResults.append(genHeaderNavigationImage(context, sLanguage, sOID, documentDropRelationship,documentCommand, showStatesInHeader, imageDropRelationship, sMCSURL, collabspace, imageManagerToolbar, imageUploadCommand, personCollabSpaceName,personCollabSpaceTitle,showDescriptionInHeader));
    return sbResults;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

    }

    /**
     * This method draw the div for displaying the image icon in the extended header, also provide drop in area for image upload based on the image upload access to the object.
     * jhlee Add 05-24 페이지에 이미지 업데이트된 날짜 추가
     * @param context
     * @param args
     * @param arg
     * @return
     * @throws Exception
     */
    public static String genHeaderImage(Context context,  Map<String, Object> params) throws Exception {
    	String sOID = (String)params.get("objectId"); 
    	String sLanguage = (String)params.get("language"); 
    	String sMCSURL = (String)params.get("MCSURL"); 
    	String relationship = (String)params.get("imageDropRelationship"); 
    	Boolean bFromJSP = (boolean)params.get("bFromJSP"); 
    	String imageManagerToolbar = (String)params.get("imageManagerToolbar"); 
        if(UIUtil.isNullOrEmpty(imageManagerToolbar)){
        	imageManagerToolbar = "APPImageManagerToolBar";
        }
    	
    	StringBuilder sbResult  = new StringBuilder();
        StringBuilder sbImage   = new StringBuilder();
        String sURLPrimaryImage = emxUtil_mxJPO.getPrimaryImageURL(context, null, sOID, "mxThumbnail Image", sMCSURL, "");
        String sLabelDropImages = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.DropImagesHere", sLanguage);
        boolean hasImageUploadAccess = false;	
        
        hasImageUploadAccess = hasImageUploadAccess(context, params);
        
        if (!sURLPrimaryImage.equals("../common/images/icon48x48ImageNotFound.gif")) {
			boolean useInPlaceManager = false;
			try{
				useInPlaceManager = "true".equalsIgnoreCase(EnoviaResourceBundle.getProperty(context, "emxFramework.InPlaceImageManager"));
			}catch(Exception e){
			}
			if(useInPlaceManager){
				sbImage.append("<a href='#' onClick=\"require(['../components/emxUIImageManagerInPlace'], function(ImageManager){ new ImageManager('" +  sOID + "'); } );return false;\" >");
			}else{
	            sbImage.append("<a href='#' onClick=\"var posLeft=(screen.width/2)-(900/2);var posTop = (screen.height/2)-(650/2);window.open('");
	            sbImage.append("../components/decemxImageManager.jsp?isPopup=false&toolbar=");
	            sbImage.append(XSSUtil.encodeForURL(context, imageManagerToolbar));
	            sbImage.append("&header=emxComponents.Image.ImageManagerHeading&HelpMarker=emxhelpimagesview&");
	            sbImage.append("objectId=").append(XSSUtil.encodeForURL(context,sOID));
	            sbImage.append("',  '', 'height=650,width=900,top=' + posTop + ',left=' + posLeft + ',toolbar=no,directories=no,status=no,menubar=no;return false;')\">");
			}
            sbImage.append("<img id='divDropPrimaryImage' src='").append(sURLPrimaryImage).append("' border='1' style='vertical-align:middle;border: 1px solid #bababa;box-shadow:1px 1px 2px #ccc;' height='42'></a>");
            if(UINavigatorUtil.isMobile(context)){
            	sbResult.append(sbImage.toString());
            }
            else if(!hasImageUploadAccess)
            {
            	sbResult.append(sbImage.toString());
            }
        }
        if(hasImageUploadAccess && (!UINavigatorUtil.isMobile(context))){
        	sbResult.append("<form id='imageUpload' action='../common/emxExtendedPageHeaderFileUploadImage.jsp?objectId=").append(sOID).append("&relationship=").append(XSSUtil.encodeForURL(context, relationship)).append("'  method='post'  enctype='multipart/form-data'>");
	        if(sbImage.length() == 0) {
	            sbResult.append("   <div id='divDropImages' class='dropArea'");
	            sbResult.append("      ondrop='ImageDrop(event, \"imageUpload\", \"divDropImages\")' ");
	            sbResult.append("  ondragover='ImageDragHover(event, \"divDropImages\")' ");
	            sbResult.append(" ondragleave='ImageDragHover(event, \"divDropImages\")' >");
	            sbResult.append(sLabelDropImages);
	        } else {
	            sbResult.append("   <div id='divDropImages' class='dropAreaWithImage'");
	            sbResult.append("      ondrop='ImageDropOnImage(event, \"imageUpload\", \"divDropImages\", \"divDropPrimaryImage\")' ");
	            sbResult.append("  ondragover='ImageDragHoverWithImage(event, \"divDropImages\", \"divDropPrimaryImage\")' ");
	            sbResult.append(" ondragleave='ImageDragHoverWithImage(event, \"divDropImages\", \"divDropPrimaryImage\")' >");
	            sbResult.append(sbImage.toString());
	        }
	        sbResult.append("   </div>");
	        sbResult.append("</form>");
        }

       return sbResult.toString();

    }
    
    public static String genHeaderImage(Context context, String[] args, String sOID, String sLanguage, String sMCSURL, String relationship, Boolean bFromJSP , String modifyAccess) throws Exception {
    	
    	boolean bUpdateAccess = true;
		if(!PersonUtil.hasAssignment(context, "decSystemAdmin")){
			DomainObject doObj = DomainObject.newInstance(context, sOID);
			doObj.open(context);
			String sType = doObj.getTypeName();
			String sProjectOID = null;
			if(DecStringUtil.equals(sType, DecConstants.TYPE_PROJECT_SPACE)) {
				sProjectOID = sOID;
			}else if(DecStringUtil.equalsAny(sType, DecConstants.TYPE_PHASE, DecConstants.TYPE_DECCWPTASK, DecConstants.TYPE_DECIWPTASK)) {
				sProjectOID = doObj.getInfo(context, "to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST +"].to.id");
			}
			if(sProjectOID != null) {
				String currentUserId = PersonUtil.getPersonObjectID(context);
				String hasAccessEpxr = MqlUtil.mqlCommand(context, "print connection bus $1 to $2 relationship $3 select $4 dump"
						, sProjectOID
						, currentUserId
						, DecConstants.RELATIONSHIP_MEMBER
						, "evaluate[" + DecConstants.SELECT_ATTRIBUTE_DECPROJECTMEMBERROLE + " matchlist \"PIM\" \",\"]");
				if(!Boolean.valueOf(hasAccessEpxr)) {
					bUpdateAccess = false;
				}
			}
		}
		
    	StringBuilder sbResult  = new StringBuilder();
        StringBuilder sbImage   = new StringBuilder();
        // choimingi Add[S]  07/28/2023
        DomainObject openProjectDom = new DomainObject(sOID);
        String pType = openProjectDom.getType(context);
        // choimingi Add[E]  07/28/2023
        String sLabelDropImages = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.DropImagesHere", sLanguage);
        String sURLPrimaryImage = "" ;
        try {
			HashMap programMap = new HashMap();
			HashMap objectMap = new HashMap();
    		objectMap.put("id", sOID);
    		MapList objectList = new MapList();
    		objectList.add(objectMap);
    		programMap.put("objectList", objectList);    		
    		programMap.put("objectId", sOID);    		
    		
    		Map Imagedata = new HashMap();
    		Imagedata.put("MCSURL", sMCSURL);
    		Map requestMap = new HashMap();
    		requestMap.put("ImageData", Imagedata);    		
    		
    		programMap.put("paramList", requestMap);
    		programMap.put("format", "format_mxThumbnailImage");    		
    		programMap.put("href", sMCSURL);
			
			programMap.put(UIComponent.IMAGE_MANAGER_GENERATE_HTML_FLAG, UIComponent.FALSE);
			Vector vImageURLS = (Vector) JPO.invoke(context, "emxImageManager", null, "getImageURLs",
													JPO.packArgs(programMap), Vector.class);
			if(vImageURLS.size()>0){
				sURLPrimaryImage =(String)((Map)vImageURLS.get(0)).get("ImageURL");
				if(UIUtil.isNullOrEmpty(sURLPrimaryImage)) {
					sURLPrimaryImage = "../common/images/icon48x48ImageNotFound.gif";
				}
			}else{
				sURLPrimaryImage = "../common/images/icon48x48ImageNotFound.gif" ;
			}
		}catch(Exception e){
			sURLPrimaryImage = "../common/images/icon48x48ImageNotFound.gif" ;
		}
        
		String loggedInRole    =   PersonUtil.getDefaultSecurityContext(context);

        if (!sURLPrimaryImage.equals("../common/images/icon48x48ImageNotFound.gif")) {
			boolean useInPlaceManager = false;
			try{
				useInPlaceManager = "true".equalsIgnoreCase(EnoviaResourceBundle.getProperty(context, "emxFramework.InPlaceImageManager"));
			}catch(Exception e){
			}
			if(bUpdateAccess) {
				if(useInPlaceManager){
					sbImage.append("<a href='#' onClick=\"require(['../components/emxUIImageManagerInPlace'], function(ImageManager){ new ImageManager('" +  XSSUtil.encodeForJavaScript(context,sOID) + "'); } );return false;\" >");
				}else{
		            sbImage.append("<a href='#' onClick=\"var posLeft=(screen.width/2)-(900/2);var posTop = (screen.height/2)-(650/2);window.open('");
		            sbImage.append("../components/decemxImageManager.jsp?isPopup=false&toolbar=APPImageManagerToolBar&header=emxComponents.Image.ImageManagerHeading&HelpMarker=emxhelpimagesview&");
		            sbImage.append("objectId=").append(XSSUtil.encodeForURL(context,sOID));
		            sbImage.append("',  '', 'height=650,width=900,top=' + posTop + ',left=' + posLeft + ',toolbar=no,directories=no,status=no,menubar=no;return false;')\">");
				}
			}
			if(DecStringUtil.equals(pType, "Project Space")) {
				sbImage.append("<img id='divDropPrimaryImage' src='").append(sURLPrimaryImage).append("' border='1' style='vertical-align:middle;border: 1px solid #bababa;box-shadow:1px 1px 2px #ccc;' height='62'></a>");
			}else {
				sbImage.append("<img id='divDropPrimaryImage' src='").append(sURLPrimaryImage).append("' border='1' style='vertical-align:middle;border: 1px solid #bababa;box-shadow:1px 1px 2px #ccc;' height='42'></a>");
			}
            if(UINavigatorUtil.isMobile(context)){
            	sbResult.append(sbImage.toString());
        }
            else if("false".equalsIgnoreCase(modifyAccess))
            {
            	sbResult.append(sbImage.toString());
            }
        }
		if((!UINavigatorUtil.isMobile(context))  && ("true".equalsIgnoreCase(modifyAccess))&& ! PersonUtil.isVPLMAdmin(context, loggedInRole) && ! PersonUtil.isVPLMReader(context, loggedInRole) && ! PersonUtil.isVPLMContributor(context, loggedInRole)){
        	sbResult.append("<form id='imageUpload' action='../common/emxExtendedPageHeaderFileUploadImage.jsp?objectId=").append(XSSUtil.encodeForURL(context,sOID)).append("&relationship=").append(XSSUtil.encodeForURL(context, relationship)).append("'  method='post'  enctype='multipart/form-data'>");
	        if(sbImage.length() == 0) {
	            sbResult.append("   <div id='divDropImages' class='dropArea'");
				if(bUpdateAccess) {
	            sbResult.append("      ondrop='ImageDrop(event, \"imageUpload\", \"divDropImages\")' ");
	            sbResult.append("  ondragover='ImageDragHover(event, \"divDropImages\")' ");
	            sbResult.append(" ondragleave='ImageDragHover(event, \"divDropImages\")' >");
				}else {
		            sbResult.append(">");
				}
	            sbResult.append(sLabelDropImages);
	        } else {
	            sbResult.append("   <div id='divDropImages' class='dropAreaWithImage'");
				if(bUpdateAccess) {
	            sbResult.append("      ondrop='ImageDropOnImage(event, \"imageUpload\", \"divDropImages\", \"divDropPrimaryImage\")' ");
	            sbResult.append("  ondragover='ImageDragHoverWithImage(event, \"divDropImages\", \"divDropPrimaryImage\")' ");
	            sbResult.append(" ondragleave='ImageDragHoverWithImage(event, \"divDropImages\", \"divDropPrimaryImage\")' >");
				}else {
		            sbResult.append(">");
				}
	            sbResult.append(sbImage.toString());
	        }
	        sbResult.append("   </div>");
	        sbResult.append("</form>");
        }

       return sbResult.toString();

    }
    

    
    private String genHeaderAlerts(Context context, String sOID, String sLanguage, Boolean bFromJSP) throws Exception {

        StringBuilder sbResult      = new StringBuilder();
        StringList selAlerts        = new StringList();
        DomainObject dObject        = new DomainObject(sOID);

        String sStyleHighlightIcon  = UINavigatorUtil.isMobile(context) ? "style='height:16px;'" : "style='height:11px;'";

        selAlerts.add(DomainConstants.SELECT_ID);

        String relIssue = PropertyUtil.getSchemaProperty(context,DomainSymbolicConstants.SYMBOLIC_relationship_Issue);
        String typeIssue = PropertyUtil.getSchemaProperty(context,DomainSymbolicConstants.SYMBOLIC_type_Issue);
        // Route can be connected to object with multiple relationships.
        Pattern relPattern         = null;
        relPattern  = new Pattern(DomainConstants.RELATIONSHIP_ROUTE_SCOPE);
        relPattern.addPattern(DomainObject.RELATIONSHIP_OBJECT_ROUTE);
        relPattern.addPattern(DomainObject.RELATIONSHIP_ROUTE_TASK);

        String mlPendingRoutesWhere = "";
        String  activeFilter = EnoviaResourceBundle.getProperty(context,"emxComponentsRoutes.Filter.Active");
        
        
        if(UIUtil.isNotNullAndNotEmpty(activeFilter))
        {
            StringTokenizer tokenizer=new StringTokenizer(activeFilter,",");
            while(tokenizer.hasMoreTokens())
            {
                String nextFilter=tokenizer.nextToken();
                if(!"".equals(mlPendingRoutesWhere))
                {
                	mlPendingRoutesWhere += "||";
                }
                mlPendingRoutesWhere += "attribute[Route Status] == \"" + nextFilter + "\"";
            }
        }
        
        //MapList mlPendingIssues     = dObject.getRelatedObjects(context, relIssue, typeIssue, selAlerts, null, true,  false, (short)1, "current != 'Closed'", "", 0);
		String physicalId = dObject.getInfo(context, DomainConstants.SELECT_PHYSICAL_ID);
		
		HashMap programMap = new HashMap();		
    		programMap.put("objectId", sOID);    		
    		
		MapList mlPendingIssues = (MapList) JPO.invoke(context, "emxCommonIssue", null, "getActiveIssues",
													JPO.packArgs(programMap), MapList.class);
		
		//MapList mlPendingIssues     = new Issue().getAllIssues(context, physicalId, true, false);
		
		
		
		
        MapList mlPendingChanges    = dObject.getRelatedObjects(context, DomainConstants.RELATIONSHIP_EC_AFFECTED_ITEM, "Change", selAlerts, null, true,  false, (short)1, "(current != 'Complete') && (current != 'Close') && (current != 'Reject')", "", 0);
        MapList mlPendingRoutes     = dObject.getRelatedObjects(context, relPattern.getPattern(), DomainConstants.TYPE_ROUTE,  selAlerts, null, false, true,  (short)1, mlPendingRoutesWhere, "", 0);

        // this string will contain OOTB categories command for Issues,Changes,Routes
        String categoryCommands = "";

            if(mlPendingIssues.size() > 0) {
            	categoryCommands = "'ContextIssueListPage'";
            	sbResult.append("<span id='spanExtendedHeaderAlerts' class='extendedHeader counter'>");
                String sAlertIssues = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ExistingIssue", sLanguage);
                sbResult.append("<a ").append("title='").append(sAlertIssues).append("'");

                String sOIDIssue = "";
                if(mlPendingIssues.size() == 1) {
                    Map mIssue = (Map)mlPendingIssues.get(0);
                    sOIDIssue = (String)mIssue.get("id");
                }
                String strUrl = "../common/emxIndentedTable.jsp?selection=multiple&freezePane=Name&table=IssueList&toolbar=ContextIssueToolBar&program=emxCommonIssue:getActiveIssues&objectId="+ XSSUtil.encodeForURL(context,sOID);
                sbResult.append(" onclick=\"javascript:showPageHeaderContent('");
                sbResult.append(strUrl +"', '");
                sbResult.append(XSSUtil.encodeForJavaScript(context,sOIDIssue) +"',new Array("+categoryCommands+"));\"");
                sbResult.append(">").append(mlPendingIssues.size());
                sbResult.append("<img ").append(sStyleHighlightIcon).append(" src='../common/images/iconSmallIssue.png'/></a>");
                sbResult.append("</span>");
            }

            if(mlPendingChanges.size() > 0) {
            	categoryCommands = "'CommonEngineeringChangeTreeCategory'";
            	sbResult.append("<span id='spanExtendedHeaderAlerts' class='extendedHeader counter'>");
                String sAlertChanges = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ExistingChange", sLanguage);
                sbResult.append(" <a ").append("title='").append(sAlertChanges).append("'");
                String sOIDChange = "";
                if(mlPendingChanges.size() == 1) {
                    Map mIssue = (Map)mlPendingChanges.get(0);
                    sOIDChange = (String)mIssue.get("id");
                }
                String strUrl = "../common/emxIndentedTable.jsp?table=APPDashboardEC&toolbar=APPObjectECListToolBar&program=emxCommonEngineeringChange:getObjectECList&objectId="+ XSSUtil.encodeForURL(context,sOID);
                sbResult.append(" onclick=\"javascript:showPageHeaderContent('");
                sbResult.append(strUrl +"', '");
                sbResult.append(XSSUtil.encodeForJavaScript(context,sOIDChange) +"',new Array("+categoryCommands+"));\"");

                sbResult.append(">").append(mlPendingChanges.size());
                sbResult.append("<img ").append(sStyleHighlightIcon).append(" src='../common/images/iconSmallECR.gif'/></a>");
                sbResult.append("</span>");
            }

            if(mlPendingRoutes.size() > 0) {
            	categoryCommands = "'APPRoutes','TMCRoute'";
            	sbResult.append("<span id='spanExtendedHeaderAlerts' class='extendedHeader counter'>");
                String sAlertRoutes = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ExistingRoute", sLanguage);
                sbResult.append(" <a ").append("title='").append(sAlertRoutes).append("'");
                String sOIDRoute = "";
                if(mlPendingRoutes.size() == 1) {
                    Map mRoute = (Map)mlPendingRoutes.get(0);
                    sOIDRoute = (String)mRoute.get("id");
                }
                String strUrl = "../common/emxIndentedTable.jsp?table=APPRouteSummary&toolbar=APPRouteSummaryToolBar&program=emxRoute:getActiveRoutes" +
                		"&suiteKey=Components&StringResourceFileId=emxComponentsStringResource&SuiteDirectory=components&selection=multiple&freezePane=Name&objectId="+XSSUtil.encodeForURL(context, sOID);
                sbResult.append(" onclick=\"javascript:showPageHeaderContent('");
                sbResult.append(strUrl +"', '");
                sbResult.append(XSSUtil.encodeForJavaScript(context, sOIDRoute) +"',new Array("+categoryCommands+"));\"");

                sbResult.append(">").append(mlPendingRoutes.size());
                sbResult.append("<img ").append(sStyleHighlightIcon).append(" src='../common/images/iconSmallRoute.png'/></a>");
                sbResult.append("</span>");
            }

        return sbResult.toString();

    }
    
    /**
     * Method to check whether the logged in user has access to upload an Image or not.
     * @param context
     * @param args - expect a Map containing  imageUploadCommand (actual name of the command) and objectId
     * @return boolean
     * @throws FrameworkException
     */
    private static boolean hasImageUploadAccess(Context context, Map<String, Object> args) throws FrameworkException    {
        
    	boolean hasImageUploadAccess = false;
    	String imageUploadCommand = (String)args.get("imageUploadCommand");
    	if(UIUtil.isNullOrEmpty(imageUploadCommand)) {
    		imageUploadCommand = "APPUploadImage";
    	}	
    	

	    Map command = UICache.getCommand(context, imageUploadCommand);
	    String objectId = (String)args.get("objectId");
	    Map requestMap = new HashMap();
	    requestMap.put("objectId", objectId);
		Vector userRoleList = PersonUtil.getAssignments(context);
		hasImageUploadAccess = UICache.checkAccess(context, (HashMap) command, userRoleList);
	    if(hasImageUploadAccess){
		    hasImageUploadAccess = UIComponent.hasAccess(context, objectId, (HashMap) requestMap,(HashMap) command);
    	}
    	
    	return hasImageUploadAccess;
    }


    private boolean canAttachDocument(Context context, String sOID, String sType, String sRelationship, String sKind, String sKindTask) throws Exception {

    	String command = "print relationship $1 select fromtype dump $2";
    	String fromTypes = MqlUtil.mqlCommand(context, command, true, sRelationship,",");
        StringList relFromTypes = FrameworkUtil.split(fromTypes, ",");

        if (relFromTypes.size() == 0){
            return false;
        }
        if( relFromTypes.indexOf(sType) > -1 || relFromTypes.indexOf(sKind) > -1 || "true".equalsIgnoreCase(sKindTask)){
        	return true;
        }
	    return false;
    }

    private static String genHeaderNavigationImage(Context context, String sLanguage, String sOID, String documentDropRelationship,
    		String documentCommand, String showStatesInHeader, String imageRelationship, String sMCSURL, String collabspace, String imageManagerToolbar, String imageUploadCommand, String personCollabSpaceName, String personCollabSpaceTitle,String showDescriptionInHeader) throws Exception {

    	StringBuffer strNavImages = new StringBuffer();
    	String sPrevious = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.BackToolbarMenu.label",sLanguage);
    	String sNext = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.ForwardToolbarMenu.label",sLanguage);
    	String sRefresh = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.History.Refresh",sLanguage);
        String resizeHeader = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.extendedPageHeader.Collapse",sLanguage);
		String appMenuLabel = EnoviaResourceBundle.getProperty(context, "Framework", "emxNavigator.UIMenu.ApplicationMenu",sLanguage);
		String notificationCountLabel = EnoviaResourceBundle.getProperty(context, "Framework", "emxNavigator.UIMenu.IconMailNotify",sLanguage);
    	String sShowNotificationIcon = EnoviaResourceBundle.getProperty(context, "emxFramework.IconMail.ShowNotificationIcon");
    	strNavImages.append("<div id=\"divExtendedHeaderNavigation\" style='margin-right: 0px; right: 1px; position: absolute;'>");
    	strNavImages.append("<table><tr>");
		if(!UIUtil.isNullOrEmpty(collabspace) && !personCollabSpaceName.equals(collabspace)){
			strNavImages.append("<td><div id='collab-space-id' class='header mini'>");
			strNavImages.append(personCollabSpaceTitle);
			strNavImages.append("</div> </td>");
		}
		if(UIUtil.isNotNullAndNotEmpty(sShowNotificationIcon) && sShowNotificationIcon.equalsIgnoreCase("True")  && !UINavigatorUtil.isCloud(context)){
		
        int numberofunreadmessages  = 0;
        String tableheadername = "<td>";
        IconMailList iconMailList = IconMail.getMail(context);
        IconMailItr iconItr      = new IconMailItr(iconMailList);
        while (iconItr.next()) {
        	IconMail iconMailObjItem  = iconItr.obj();
        	if (( iconMailObjItem.isUnRead()) || (iconMailObjItem.isNew())) {
        		//tableheadername = "<td class = 'fonticon fonticon-bell-alt'>";
        		numberofunreadmessages++;
           }
        }
		if(numberofunreadmessages == 0){
			strNavImages.append(tableheadername+"<div id='iconMailNotification' class='fonticon fonticon-bell-alt' onclick='showIconMailDialog();'></div>");
		}else{
		       strNavImages.append(tableheadername+"<div id='iconMailNotification' class='fonticon fonticon-bell-alt' onclick='showIconMailDialog();'><span id='buttonnotification' class='notifications' title='"+notificationCountLabel+"'>"+numberofunreadmessages+"</span></div>");
		}
		
		//strNavImages.append("<div id='iconMailNotification' class='field notifications-unread button'><button id='buttonnotification' onclick='showIconMailDialog();' class='notifications-unread' title='"+notificationCountLabel+"'><div class='notifications-counter'>"+numberofunreadmessages+"</div></button></div></td>");
		}
        
    	
    	strNavImages.append("<td class='table-spacer'><div class='vertical-pipe'></div></td><td><a class='fonticon fonticon-chevron-left' title='"+sPrevious+"' href='javascript:getTopWindow().bclist.goBack();' >");
    	strNavImages.append("</a></td><td><a class='fonticon fonticon-chevron-right' title='"+sNext+"' href='javascript:getTopWindow().bclist.goForward();'></a></td>");
    	strNavImages.append("<td class='table-spacer'><div class='vertical-pipe'></div></td><td><a class='fonticon fonticon-refresh' title='"+sRefresh+"' onclick='javascript:refreshWholeTree(event,\""+XSSUtil.encodeForJavaScript(context, sOID)+"\",\""+XSSUtil.encodeForJavaScript(context, documentDropRelationship)+"\",\""+XSSUtil.encodeForJavaScript(context, documentCommand)+"\",\""+XSSUtil.encodeForJavaScript(context, showStatesInHeader)+"\",\""+sMCSURL +"\",\""+XSSUtil.encodeForJavaScript(context, imageRelationship)+"\",\"\",\""+XSSUtil.encodeForJavaScript(context, imageManagerToolbar)+"\",\""+XSSUtil.encodeForJavaScript(context, imageUploadCommand)+"\",\""+XSSUtil.encodeForJavaScript(context, showDescriptionInHeader)+"\");'>");
    	strNavImages.append("</a></td>");
       strNavImages.append("<td><a class='fonticon fonticon-expand-up' id='resize-Xheader-Link' title='"+resizeHeader+"' onclick='toggleExtendedPageHeader();'></a></td>");
    	strNavImages.append("</tr></table>");
    	strNavImages.append("</div>");
    	return strNavImages.toString();
    }
}
