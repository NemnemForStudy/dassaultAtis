import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.common.Issue;
import com.matrixone.apps.common.WorkspaceVault;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;

import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.TimeZone;
import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.RelationshipType;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import com.matrixone.apps.domain.util.BPSJsonObjectBuilder;

import matrix.util.MatrixException;
import matrix.util.StringList;
import java.util.Locale;
import com.matrixone.apps.domain.util.eMatrixDateFormat;


public class emxDashboardDocumentsBase_mxJPO {

    SimpleDateFormat sdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(),Locale.US);

    public emxDashboardDocumentsBase_mxJPO(Context context, String[] args) throws Exception {}


    // New Where Used view for documents on main web form
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getDocumentWhereUsed(Context context, String[] args) throws Exception {

        MapList mlResults       = new MapList();
        MapList mlEntries       = new MapList();
        MapList mlEntriesWBS    = new MapList();
        HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        String sLanguage        = (String)paramMap.get("languageStr");
        String sOID             = (String) paramMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);
        String sDimensions      = EnoviaResourceBundle.getProperty(context, "emxFramework.PopupSize.Large");
        String[] aDimensions    = sDimensions.split("x");

        String sUsageFiles              = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.RMBMenu.Files" , sLanguage);
        String sUsageTaskDeliverable    = EnoviaResourceBundle.getAdminI18NString(context, "Relationship", "Task Deliverable", sLanguage);
        String sUsageReferenceDocument  = EnoviaResourceBundle.getAdminI18NString(context, "Relationship", "Reference Document", sLanguage);
        String sUsagePartSpecification  = EnoviaResourceBundle.getAdminI18NString(context, "Relationship", "Part Specification", sLanguage);
        String sUsageIssue              = EnoviaResourceBundle.getAdminI18NString(context, "Relationship", "Issue", sLanguage);
        String sUsageAttachment         = EnoviaResourceBundle.getAdminI18NString(context, "Relationship", "Meeting Attachments", sLanguage);

        // Project Space File Context
        StringList slBusSelects = new StringList(new String[] {DomainConstants.SELECT_TYPE, DomainConstants.SELECT_ID, DomainConstants.SELECT_NAME, "type.kindof["+ DomainConstants.TYPE_PROJECT_SPACE +"]", "to["+DomainConstants.RELATIONSHIP_PROJECT_VAULTS+"]", "to["+DomainConstants.RELATIONSHIP_SUB_VAULTS+"]"});
        StringList slRelSelects = new StringList(new String[] {DomainConstants.SELECT_ORIGINATED, "type[connection]"});
        String relationshipPattern =  DomainConstants.RELATIONSHIP_PROJECT_VAULTS+ "," +DomainConstants.RELATIONSHIP_SUB_VAULTS+ ","+ DomainConstants.RELATIONSHIP_VAULTED_DOCUMENTS+ ","+ DomainConstants.RELATIONSHIP_VAULTED_OBJECTS_REV2;

	MapList mlTemp       = dObject.getRelatedObjects(context, relationshipPattern, "*", slBusSelects, slRelSelects, true, false, (short) 0, "", "", 0);
        Map mResult          = new HashMap();
        StringBuilder sbPath = new StringBuilder();

        String[] sReferenceFolderPath   = new String[mlTemp.size()];
        int iLevelReference             = 0;
        String sReferenceDate           = "";
        String sReferenceFolder         = "";

        for(int i = 0; i < mlTemp.size(); i++) {

            Map mTemp           = (Map)mlTemp.get(i);
            String sLevel       = (String)mTemp.get(DomainConstants.SELECT_LEVEL);
            String sType        = (String)mTemp.get(DomainConstants.SELECT_TYPE);
            String sName        = (String)mTemp.get(DomainConstants.SELECT_NAME);
            String sId          = (String)mTemp.get(DomainConstants.SELECT_ID);
            String sDate        = (String)mTemp.get(DomainConstants.SELECT_ORIGINATED);
            String sIsProject   = (String)mTemp.get("type.kindof["+ DomainConstants.TYPE_PROJECT_SPACE +"]");
            String sHasParent   = (String)mTemp.get("to["+ DomainConstants.RELATIONSHIP_SUB_VAULTS +"]");
            String sIcon        = UINavigatorUtil.getTypeIconProperty(context, sType);
            int iLevel          = Integer.parseInt(sLevel);

            if("FALSE".equalsIgnoreCase(sHasParent)) {
                sHasParent = (String)mTemp.get("to["+DomainConstants.RELATIONSHIP_PROJECT_VAULTS+"]");
                if("FALSE".equalsIgnoreCase(sHasParent)) {
                    sIsProject = "TRUE";
                }
            }

            if(iLevelReference >= iLevel) {
                sbPath = new StringBuilder();
                sbPath.append(sReferenceFolderPath[iLevel - 1]);
            }

            if(iLevel == 1) {
                sbPath = new StringBuilder();
                sReferenceDate = sDate;
                sReferenceFolder = sName;
            }

            if("TRUE".equalsIgnoreCase(sIsProject) || "Workspace".equals(sType)) {
                mResult = new HashMap();
                mResult.put("added", "<span style='line-height:16px'>" + sReferenceDate + "</span>");
                mResult.put("folder", sReferenceFolder);
                mResult.put("id", sId);
                mResult.put("usage", sUsageFiles);
                mResult.put("context", sName);
                mResult.put("contextType", sType);
                mResult.put("path", sbPath.toString());

                mlEntries.add(mResult);
            } else {
                if(iLevel > 1) {
                sbPath.insert(0, " \\ ");
                }
                sbPath.insert(0, "</a>");
                sbPath.insert(0, sName);
                sbPath.insert(0, "<a title='" + sName + "' href='#' onClick=\"emxTableColumnLinkClick('../common/emxTree.jsp?emxSuiteDirectory=programcentral&amp;suiteKey=ProgramCentral&amp;objectId=" + sId + "', 'popup', '" + aDimensions[0] + "', '" + aDimensions[1] + "', '')\">");
                sbPath.insert(0, "<img src = '../common/images/" + sIcon + "' /> ");
                sReferenceFolderPath[iLevel] = sbPath.toString();
            }

            iLevelReference = iLevel;
        }

        if(mlEntries.size() > 0) {

            mlEntries.sort("path", "ascending", "String");
            mlEntries.sort("context", "ascending", "String");
            Map mPrevious = (Map)mlEntries.get(0);
            String sContextPrevious = (String)mPrevious.get(DomainConstants.SELECT_ID);
            mlResults.add(mPrevious);

            for(int i = 1; i < mlEntries.size(); i++) {

                Map mNext = (Map)mlEntries.get(i);
                String sContextNext = (String)mNext.get(DomainConstants.SELECT_ID);

                if(sContextPrevious.equals(sContextNext)) {
                    String sDate = (String)mNext.get("added");
                    String sPath = (String)mNext.get("path");
                    String sPathPrevious = (String)mPrevious.get("path");
                    String sDatePrevious = (String)mPrevious.get("added");
                    mPrevious.put("path", sPathPrevious + "<br/>" + sPath);
                    mPrevious.put("added", sDatePrevious + "<br/>" + sDate);
                } else {
                    mPrevious = (Map)mlEntries.get(i);
                    mlResults.add(mPrevious);
                }
                sContextPrevious = sContextNext;
            }

            for(int i = 0; i < mlResults.size(); i++) {
                mResult = (Map)mlResults.get(i);
                String sContextType = (String)mResult.get("contextType");
                if("Workspace".equals(sContextType)) {
                    String sPath = (String)mResult.get("path");
                    sPath = sPath.replace("&amp;emxSuiteDirectory=programcentral&amp;suiteKey=ProgramCentral", "");
                    mResult.put("path", sPath);
                }
            }
        }
        relationshipPattern = DomainConstants.RELATIONSHIP_TASK_DELIVERABLE+"," +DomainConstants.RELATIONSHIP_SUBTASK;
        String typePattern	= DomainConstants.TYPE_TASK_MANAGEMENT+ "," + DomainConstants.TYPE_PROJECT_SPACE;
        // Task Deliverable
        MapList mlWBS = dObject.getRelatedObjects(context, relationshipPattern, typePattern, slBusSelects, slRelSelects, true, false, (short) 0, "", "", 0);

        StringBuilder sbWBSStructure = new StringBuilder();

        for(int i = 0; i < mlWBS.size(); i++) {

            Map mTemp           = (Map)mlWBS.get(i);
            String sLevel       = (String)mTemp.get(DomainConstants.SELECT_LEVEL);
            String sType        = (String)mTemp.get(DomainConstants.SELECT_TYPE);
            String sIsProject   = (String)mTemp.get("type.kindof["+ DomainConstants.TYPE_PROJECT_SPACE +"]");
            String sName        = (String)mTemp.get(DomainConstants.SELECT_NAME);
            String sId          = (String)mTemp.get(DomainConstants.SELECT_ID);
            String sDate        = (String)mTemp.get(DomainConstants.SELECT_ORIGINATED);
            String sIcon        = UINavigatorUtil.getTypeIconProperty(context, sType);

            if("1".equals(sLevel)) {
                mResult = new HashMap();
                sbWBSStructure = new StringBuilder();
                sbWBSStructure.append("<img src = '../common/images/").append(sIcon).append("' /> ");
//                sbWBSStructure.append("<a title='").append(sName).append("' href='emxTree.jsp?mode=insert&amp;emxSuiteDirectory=programcentral&amp;suiteKey=ProgramCentral&amp;objectId=").append(sId).append("'>");
                sbWBSStructure.insert(0, "<a title='" + sName + "' href='#' onClick=\"emxTableColumnLinkClick('../common/emxTree.jsp?mode=insert&amp;emxSuiteDirectory=programcentral&amp;suiteKey=ProgramCentral&amp;objectId=" + sId + "', 'popup', '" + aDimensions[0] + "', '" + aDimensions[1] + "', '')\">");
                sbWBSStructure.append(sName);
                sbWBSStructure.append("</a>");
                mResult.put("added", "<span style='line-height:16px'>" + sDate + "</span>");
                mResult.put("folder", sName);
            } else if("TRUE".equalsIgnoreCase(sIsProject)) {
                mResult.put("id", sId);
                mResult.put("usage", sUsageTaskDeliverable);
                mResult.put("context", sName);
                mResult.put("path", sbWBSStructure.toString());
                mlEntriesWBS.add(mResult);
            } else {
                sbWBSStructure.insert(0, " \\ ");
                sbWBSStructure.insert(0, "</a>");
                sbWBSStructure.insert(0, sName);
//                sbWBSStructure.insert(0, "<a title='" + sName + "' href='emxTree.jsp?mode=insert&amp;emxSuiteDirectory=programcentral&amp;suiteKey=ProgramCentral&amp;objectId=" + sId + "'>");
                sbWBSStructure.insert(0, "<a title='" + sName + "' href='#' onClick=\"emxTableColumnLinkClick('../common/emxTree.jsp?mode=insert&amp;emxSuiteDirectory=programcentral&amp;suiteKey=ProgramCentral&amp;objectId=" + sId + "', 'popup', '" + aDimensions[0] + "', '" + aDimensions[1] + "', '')\">");
                sbWBSStructure.insert(0, "<img src = '../common/images/" + sIcon + "' /> ");
            }

        }

        if(mlEntriesWBS.size() > 0) {

            mlEntriesWBS.sort("path", "ascending", "String");
            mlEntriesWBS.sort("context", "ascending", "String");
            Map mPrevious = (Map)mlEntriesWBS.get(0);
            String sContextPrevious = (String)mPrevious.get(DomainConstants.SELECT_ID);
            mlResults.add(mPrevious);

            for(int i = 1; i < mlEntriesWBS.size(); i++) {

                Map mNext = (Map)mlEntriesWBS.get(i);
                String sContextNext = (String)mNext.get(DomainConstants.SELECT_ID);

                if(sContextPrevious.equals(sContextNext)) {
                    String sDate = (String)mNext.get("added");
                    String sPath = (String)mNext.get("path");
                    String sPathPrevious = (String)mPrevious.get("path");
                    String sDatePrevious = (String)mPrevious.get("added");
                    mPrevious.put("path", sPathPrevious + "<br/>" + sPath);
                    mPrevious.put("added", sDatePrevious + "<br/>" + sDate);
                } else {
                    mPrevious = (Map)mlEntriesWBS.get(i);
                    mlResults.add(mPrevious);
                }
                sContextPrevious = sContextNext;
            }

        }


        // Reference Document
        MapList mlReferences = dObject.getRelatedObjects(context, DomainConstants.RELATIONSHIP_REFERENCE_DOCUMENT, "*", new StringList(new String[]{"id"}), slRelSelects, true, false, (short)1, "", "", 0);
        for(int i = 0; i < mlReferences.size(); i++) {

            Map mReference  = (Map)mlReferences.get(i);
            String sId      = (String)mReference.get("id");
            String sDate    = (String)mReference.get("originated");
            mResult     = new HashMap();
            mResult.put("id", sId);
            mResult.put("usage", sUsageReferenceDocument);
            mResult.put("path", "");
            mResult.put("added", sDate);
            mlResults.add(mResult);
        }

        // Part Specification
        MapList mlParts = dObject.getRelatedObjects(context, DomainConstants.RELATIONSHIP_PART_SPECIFICATION, "*", new StringList(new String[]{"id"}), slRelSelects, true, false, (short)1, "", "", 0);
        for(int i = 0; i < mlParts.size(); i++) {
            Map mPart       = (Map)mlParts.get(i);
            String sId      = (String)mPart.get(DomainConstants.SELECT_ID);
            String sDate    = (String)mPart.get(DomainConstants.SELECT_ORIGINATED);
            mResult         = new HashMap();
            mResult.put("id", sId);
            mResult.put("usage", sUsagePartSpecification);
            mResult.put("path", "");
            mResult.put("added", sDate);
            mlResults.add(mResult);
        }

        String strRelationship = PropertyUtil.getSchemaProperty(context, Issue.SYMBOLIC_relationship_Issue);
        String strType = PropertyUtil.getSchemaProperty(context, Issue.SYMBOLIC_type_Issue);

        // Issue Context
        MapList mlIssues = dObject.getRelatedObjects(context, strRelationship, strType, new StringList(new String[]{"id"}), slRelSelects, true, false, (short)1, "", "", 0);
        for(int i = 0; i < mlIssues.size(); i++) {

            Map mIssue      = (Map)mlIssues.get(i);
            String sId      = (String)mIssue.get(DomainConstants.SELECT_ID);
            String sDate    = (String)mIssue.get(DomainConstants.SELECT_ORIGINATED);
            mResult     = new HashMap();
            mResult.put("id", sId);
            mResult.put("usage", sUsageIssue);
            mResult.put("path", "");
            mResult.put("added", sDate);
            mlResults.add(mResult);
        }

        // Meeting Attachment
        MapList mlMeetings = dObject.getRelatedObjects(context, DomainConstants.RELATIONSHIP_MEETING_ATTACHMENTS, DomainConstants.TYPE_MEETING, new StringList(new String[]{"id"}), slRelSelects, true, false, (short)1, "", "", 0);
        for(int i = 0; i < mlMeetings.size(); i++) {

            Map mMeeting    = (Map)mlMeetings.get(i);
            String sId      = (String)mMeeting.get(DomainConstants.SELECT_ID);
            String sDate    = (String)mMeeting.get(DomainConstants.SELECT_ORIGINATED);
            mResult         = new HashMap();
            mResult.put("id", sId);
            mResult.put("usage", sUsageAttachment);
            mResult.put("path", "");
            mResult.put("added", sDate);
            mlResults.add(mResult);
        }


        return mlResults;

    }


    // Folder Browser Tuning (Paste As Copy)
    public WorkspaceVault cloneWorkspaceVaultStructure(Context context, String[] args) throws Exception {

        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOIDParent   = (String) paramMap.get("parentId");
        String sOIDSource   = (String) paramMap.get("sourceId");
        String sCopyFiles   = (String) paramMap.get("copyFiles");

        return cloneWorkspaceVault(context, sOIDParent, sOIDSource, sCopyFiles);

    }
    public WorkspaceVault cloneWorkspaceVault(Context context, String sOIDParent, String sOIDSource, String sCopyFiles) throws FrameworkException, MatrixException, Exception {

        StringList busSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);

        WorkspaceVault vaultParent 	= (WorkspaceVault) DomainObject.newInstance(context, DomainConstants.TYPE_WORKSPACE_VAULT);
        WorkspaceVault vaultSource 	= (WorkspaceVault) DomainObject.newInstance(context, DomainConstants.TYPE_WORKSPACE_VAULT);
        vaultParent.setId(sOIDParent);
        vaultSource.setId(sOIDSource);


        // Clone workspace itself
        StringList slSource         = new StringList(new String[] {DomainConstants.SELECT_NAME, DomainConstants.SELECT_POLICY});
        Map mDataSource             = vaultSource.getInfo(context, slSource);
        String sName                = (String)mDataSource.get(DomainConstants.SELECT_NAME);
        String sPolicy              = (String)mDataSource.get(DomainConstants.SELECT_POLICY);
        WorkspaceVault vaultClone   = vaultParent.createSubVault(context, sName, sPolicy);
        String sOIDClone            = vaultClone.getObjectId();


        // Clone documents within workspace
        if("TRUE".equalsIgnoreCase(sCopyFiles)) {
        	String strType = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_type_DOCUMENTS);
            MapList mlDocuments = vaultSource.getRelatedObjects(context, DomainConstants.RELATIONSHIP_VAULTED_OBJECTS_REV2, strType, busSelects, null, false, true, (short)1, "", "", 0);
            for(int i = 0; i < mlDocuments.size(); i++) {

                String	sNewName        =  DomainObject.getAutoGeneratedName(context, "type_Document", "");
                Map mDocument           = (Map)mlDocuments.get(i);
                String sOIDDocument     = (String)mDocument.get(DomainConstants.SELECT_ID);
                DomainObject dObject    = new DomainObject(sOIDDocument);
                BusinessObject boTemp   = dObject.cloneObject(context, sNewName, "0", context.getVault().getName(), true);
                CommonDocument cDoc     = new CommonDocument(boTemp.getObjectId());
                matrix.db.FileList files= dObject.getFiles(context);
                String sFilename 	= "";

                if(files.size() > 0) {
                    matrix.db.File file = (matrix.db.File)files.get(0);
                    sFilename 		= file.getName();
                }

                cDoc.createVersion(context, sFilename, sFilename, null);

                String sOIDRelTarget        = boTemp.getObjectId();
                vaultClone.addRelatedObject(context, new RelationshipType(DomainConstants.RELATIONSHIP_VAULTED_OBJECTS_REV2), false, sOIDRelTarget);
            }
        }

        // Clone sub workspaces
        MapList mlSubfolders = vaultSource.getRelatedObjects(context, DomainConstants.RELATIONSHIP_SUB_VAULTS, DomainConstants.TYPE_WORKSPACE_VAULT, busSelects, null, false, true, (short)1, "", "", 0);
        for(int i = 0; i < mlSubfolders.size(); i++) {
            Map mSubfolder = (Map)mlSubfolders.get(i);
            String sOIDSubfolder = (String)mSubfolder.get(DomainConstants.SELECT_ID);
            cloneWorkspaceVault(context, sOIDClone, sOIDSubfolder, sCopyFiles);
        }

        return vaultClone;
    }


    // My Dashboard
    public JsonObject getUserDashboardData(Context context, String[] args) throws Exception {

        HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        String sLanguage        = (String)paramMap.get("languageStr");
        Integer[] iCounters     = new Integer[4];
        Calendar cNow           = Calendar.getInstance();
        Calendar cMRU           = Calendar.getInstance();
        Calendar cModified      = Calendar.getInstance();
        Calendar cOriginated    = Calendar.getInstance();
        Calendar calThreshold   = Calendar.getInstance(TimeZone.getDefault());
        int iCountMRU           = 0;
        String sLabelDate = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.History.Date", sLanguage);
        for(int i = 0; i < iCounters.length; i++){
        	iCounters[i] = 0;
        }
        cMRU.add(java.util.GregorianCalendar.DAY_OF_YEAR,-1);
        calThreshold.add(java.util.GregorianCalendar.DAY_OF_YEAR,-10);
        int iWeekNow 	= cNow.get(Calendar.WEEK_OF_YEAR);
        int iMonthNow 	= cNow.get(Calendar.MONTH);
        int iYearNow 	= cNow.get(Calendar.YEAR);
        String strModified = DomainConstants.SELECT_MODIFIED;
        StringList busSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);
        busSelects.add(DomainConstants.SELECT_POLICY);
        busSelects.add(DomainConstants.SELECT_ORIGINATED);
        busSelects.add(strModified);
        StringBuilder sbWhere = new StringBuilder();
        sbWhere.append("("+DomainConstants.SELECT_POLICY+" != 'Version')").append(" && (revision == last)").append(" && ("+strModified +" > '").append(calThreshold.get(Calendar.MONTH) + 1).append('/').append(calThreshold.get(Calendar.DAY_OF_MONTH)).append('/').append(calThreshold.get(Calendar.YEAR)).append("')");
        String strType = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_type_Document);
		try{
			String includeTypes = EnoviaResourceBundle.getProperty(context, "emxFramework.FreezePane.DashboardDocs.IncludeTypes");
			String propertyTypes="";
			if(UIUtil.isNotNullAndNotEmpty(includeTypes) && includeTypes.contains(","))
			{
				StringList slIncludeType=FrameworkUtil.split(includeTypes, ",");
				if(slIncludeType !=null && slIncludeType.size()>0)
				{	
					for(int i=0;i<slIncludeType.size();i++)
					{
						String typeName=PropertyUtil.getSchemaProperty(context,slIncludeType.get(i));
						if(UIUtil.isNotNullAndNotEmpty(typeName))
						{
							if(UIUtil.isNotNullAndNotEmpty(propertyTypes))
								propertyTypes+=","+typeName;
							else
								propertyTypes=typeName;
						}	
					}
					includeTypes=propertyTypes;
				}
			}
			else if(UIUtil.isNotNullAndNotEmpty(includeTypes))
				includeTypes=PropertyUtil.getSchemaProperty(context,includeTypes);
			if(UIUtil.isNullOrEmpty(includeTypes))
				strType="";
			else
				strType=includeTypes;

		}catch(Exception ex){

		}
        String ownerWhereClause="";
		try{
			ownerWhereClause = EnoviaResourceBundle.getProperty(context, "emxFramework.FreezePane.DashboardDocs.FilterByOwner");
			if(UIUtil.isNotNullAndNotEmpty(ownerWhereClause) && "true".equalsIgnoreCase(ownerWhereClause))
			{
				sbWhere.append(" && "+ CommonDocument.SELECT_OWNER +" == \'");
				sbWhere.append(context.getUser());
				sbWhere.append("\'");
			}
		}catch(Exception ex){
		}


        MapList mlDocuments     = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects);
        MapList mlDocumentsNEW  = new MapList();
        MapList mlDocumentsMOD  = new MapList();
        for(int i = 0; i < mlDocuments.size(); i++) {
            Map mDocument       = (Map)mlDocuments.get(i);
            String sModified    = (String)mDocument.get(strModified);
            String sOriginated  = (String)mDocument.get(DomainConstants.SELECT_ORIGINATED);
            String sDateMod     = sModified.substring(0, sModified.indexOf(' '));
            String sDateOrig    = sOriginated.substring(0, sOriginated.indexOf(' '));
            cOriginated.setTime(sdf.parse(sOriginated));
            cModified.setTime(sdf.parse(sModified));
            if(cModified.after(cMRU)) {
            	iCountMRU++;
            }
            if(cOriginated.after(calThreshold)){
            	mlDocumentsNEW.add(mDocument);
            }
            int iWeekOrig 	= cOriginated.get(Calendar.WEEK_OF_YEAR);
            int iMonthOrig 	= cOriginated.get(Calendar.MONTH);
            int iYearOrig 	= cOriginated.get(Calendar.YEAR);
            if(iYearNow == iYearOrig) {
                if(iMonthNow == iMonthOrig){
                	iCounters[1]++;
                }
                if(iWeekNow  == iWeekOrig){
                	iCounters[0]++;
                }
            }
            if(!sDateMod.equals(sDateOrig)) {
                mlDocumentsMOD.add(mDocument);
                int iWeekMod 	= cModified.get(Calendar.WEEK_OF_YEAR);
                int iMonthMod 	= cModified.get(Calendar.MONTH);
                int iYearMod 	= cModified.get(Calendar.YEAR);
                if(iYearNow == iYearMod && sDateMod.equals(sDateOrig)==false ) {
                    if(iMonthNow == iMonthMod){
                    	iCounters[3]++;
                    }
                    if(iWeekNow  == iWeekMod){
                    	iCounters[2]++;
                    }
                }
            }
        }
        JsonObjectBuilder newDocumentsSeriesBuilder = Json.createObjectBuilder();
        newDocumentsSeriesBuilder.add("name", EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.NewDocs", sLanguage)).add("color", "#EC0C41");
        JsonArrayBuilder newDocumentsDataArrayBuilder = Json.createArrayBuilder();
        if(mlDocumentsNEW.size() > 0) {
            mlDocumentsNEW.sort("originated", "ascending", "date");
            Map mDocumentFirstNEW       = (Map)mlDocumentsNEW.get(0);
            String sDateTimePrevious    = (String)mDocumentFirstNEW.get(DomainConstants.SELECT_ORIGINATED);
            String sDatePrevious        = sDateTimePrevious.substring(0, sDateTimePrevious.indexOf(' '));
            int iCountNEW               = 0;
            for(int i = 0; i < mlDocumentsNEW.size(); i++) {
                Map mDocument       = (Map)mlDocumentsNEW.get(i);
                String sDateTime    = (String)mDocument.get(DomainConstants.SELECT_ORIGINATED);
                String sDate        = sDateTime.substring(0, sDateTime.indexOf(' '));
                if(sDate.equals(sDatePrevious)) { iCountNEW++; }
                else {
                    Calendar cNEW = Calendar.getInstance();
                    cNEW.setTime(sdf.parse(sDateTimePrevious));
                    JsonArray newDocumentDataObjectArr = Json.createArrayBuilder().add(cNEW.getTimeInMillis()).add(iCountNEW).build();
                    newDocumentsDataArrayBuilder.add(newDocumentDataObjectArr);
                    iCountNEW           = 1;
                    sDateTimePrevious   = sDateTime;
                    sDatePrevious   = sDate;
                }
                if (i ==  (mlDocumentsNEW.size() - 1)) {
                    Calendar cNEW = Calendar.getInstance();
                    cNEW.setTime(sdf.parse(sDateTime));
                    JsonArray newDocumentDataObjectArr = Json.createArrayBuilder().add(cNEW.getTimeInMillis()).add(iCountNEW).build();
                    newDocumentsDataArrayBuilder.add(newDocumentDataObjectArr);
                }
            }
        }
        JsonArray newDocumentsDataArray = newDocumentsDataArrayBuilder.build();
        newDocumentsSeriesBuilder.add("data", newDocumentsDataArray);
        JsonObject newDocumentsSeries = newDocumentsSeriesBuilder.build();
        JsonObjectBuilder updateDocumentsSeriesBuilder = Json.createObjectBuilder().add("name",EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ChangedDocs" , sLanguage)).add("color", "#8BBA00");
        JsonArrayBuilder updateDocumentsDataArrayBuilder = Json.createArrayBuilder();

        if(mlDocumentsMOD.size() > 0) {
            mlDocumentsMOD.sort("modified", "ascending", "date");
            Map mDocumentFirstMOD       = (Map)mlDocumentsMOD.get(0);
            String sDateTimePrevious    = (String)mDocumentFirstMOD.get(strModified);
            String sDatePrevious        = sDateTimePrevious.substring(0, sDateTimePrevious.indexOf(' '));
            int iCountMOD               = 0;
            for(int i = 0; i < mlDocumentsMOD.size(); i++) {
                Map mDocument       = (Map)mlDocumentsMOD.get(i);
                String sDateTime    = (String)mDocument.get(strModified);
                String sDate        = sDateTime.substring(0, sDateTime.indexOf(' '));
                Calendar cMOD = Calendar.getInstance();
                cMOD.setTime(sdf.parse(sDateTime));
                if(sDate.equals(sDatePrevious)) {
                	iCountMOD++;
                }else {
                    Calendar cMODPrev = Calendar.getInstance();
                    cMODPrev.setTime(sdf.parse(sDateTimePrevious));
                    JsonArray updateDocumentDataObjectArr = Json.createArrayBuilder().add(cMODPrev.getTimeInMillis()).add(iCountMOD).build();
                    updateDocumentsDataArrayBuilder.add(updateDocumentDataObjectArr);
                    iCountMOD           = 1;
                    sDateTimePrevious   = sDateTime;
                    sDatePrevious   = sDate;
                }
                if (i ==  (mlDocumentsMOD.size() - 1)) {
                    JsonArray updateDocumentDataObjectArr = Json.createArrayBuilder().add(cMOD.getTimeInMillis()).add(iCountMOD).build();
                    updateDocumentsDataArrayBuilder.add(updateDocumentDataObjectArr);
                }
            }
        }
        JsonArray updateDocumentsDataArray = updateDocumentsDataArrayBuilder.build();
        updateDocumentsSeriesBuilder.add("data",updateDocumentsDataArray);
        JsonObject updateDocumentsSeries = updateDocumentsSeriesBuilder.build();
        JsonArray documentsDataSeriesArray = Json.createArrayBuilder().add(newDocumentsSeries).add(updateDocumentsSeries).build();

        StringBuffer docNewInWeek = new StringBuffer();
        StringBuffer docNewInMonth = new StringBuffer();
        StringBuffer docModInWeek = new StringBuffer();
        StringBuffer docModInMonth = new StringBuffer();

        String sInfoPrefix 	= " <a onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?suiteKey=Framework&table=APPDashboardUserDocuments&freezePane=RouteStatus,Name,Title,Actions,NewWindow&editLink=true&selection=multiple&sortColumnName=Modified&sortDirection=decending&program=emxDashboardDocuments:";
        docNewInWeek.append("<b>").append(iCounters[0]).append("</b>").append(sInfoPrefix).append("getDocuments&mode=NewWeek&header=emxFramework.String.DocumentsCreatedThisWeek\")'>").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.NEWThisWeek" , sLanguage)).append("</a>");
        docNewInMonth.append("<b>").append(iCounters[1]).append("</b>").append(sInfoPrefix).append("getDocuments&mode=NewMonth&header=emxFramework.String.DocumentsCreatedThisMonth\")'>").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.NEWThisMonth" , sLanguage)).append("</a>");
        docModInWeek.append("<b>").append(iCounters[2]).append("</b>").append(sInfoPrefix).append("getDocuments&mode=ModWeek&header=emxFramework.String.DocumentsModifiedThisWeek\")'>").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.MODThisWeek" , sLanguage)).append("</a>");
        docModInMonth.append("<b>").append(iCounters[3]).append("</b>").append(sInfoPrefix).append("getDocuments&mode=ModMonth&header=emxFramework.String.DocumentsModifiedThisMonth\")'>").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.MODThisMonth" , sLanguage)).append("</a>");

        JsonObject documentCountersLink = BPSJsonObjectBuilder.createJsonObjectBuilder(Json.createObjectBuilder())
		        .add("newThisWeek",docNewInWeek.toString())
		        .add("newThisMonth",docNewInMonth.toString())
		        .add("modThisWeek",docModInWeek.toString())
		        .add("modThisMonth",docModInMonth.toString())
		        .build();

        String relActiveVersion = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_relationship_ActiveVersion);
        busSelects.add("to["+relActiveVersion+"].from.id");

        // Dashboard Counters
        MapList mlDocumentsLocked = DomainObject.findObjects(context,strType, null, "locked == TRUE && locker == \"" + context.getUser() + "\"", busSelects);
        HashSet tempSet=new HashSet();
        for (int i = 0; i < mlDocumentsLocked.size(); i++) {
            Map mLockedItem = (Map)mlDocumentsLocked.get(i);
            String sId = (String)mLockedItem.get("to["+relActiveVersion+"].from.id");
			if(UIUtil.isNullOrEmpty(sId)){
                sId = (String)mLockedItem.get(DomainConstants.SELECT_ID);
            }
            tempSet.add(sId);
        }
        StringBuilder sbCounter = new StringBuilder();
        if(tempSet!=null && tempSet.size()>0) {
        sbCounter.append("<td onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?table=APPDashboardUserDocuments&program=emxDashboardDocuments:getDocuments&mode=Locked&header=emxFramework.String.LockedDocuments&freezePane=Name,RouteStatus,Title,Actions,NewWindow&suiteKey=Framework&selection=multiple\")'").append(" class='counterCell ");
        if(mlDocumentsLocked.size() == 0){
        	sbCounter.append("grayBright");
        }else{
        	sbCounter.append("redBright");
        }
        sbCounter.append("'><span class='counterText redBright'>").append(tempSet.size()).append("</span><br/>").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.LockedDocuments", sLanguage)).append("</td>");
        }
        StringBuilder sbUpdates = new StringBuilder();
        if(sbCounter.length()>0){
			sbUpdates.append("<td ");
			if(iCountMRU > 0) {
				sbUpdates.append(" onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?table=APPDashboardUserDocuments&program=emxDashboardDocuments:getDocuments&mode=MRU&header=emxFramework.String.MRUDocuments&freezePane=Name,RouteStatus,Title,Actions,NewWindow&suiteKey=Framework\")' ").append(" class='mruCell'><span style='color:#000000;font-weight:bold;'>").append(iCountMRU).append("</span> <span class='counterTextMRU'>");
				if(iCountMRU == 1) { 
					sbUpdates.append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.MostRecentUpdate"  , sLanguage)); 
				} else { 
					sbUpdates.append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.MostRecentUpdates" , sLanguage)); 
				}
				sbUpdates.append("</span>");
			} else {
				sbUpdates.append("class='mruCell' >");
			}
			sbUpdates.append("</td>");
		}
        String labelDocumentUpdates = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.DocumentUpdates", sLanguage);
        JsonObject widgetItem2 = BPSJsonObjectBuilder.createJsonObjectBuilder(Json.createObjectBuilder())
        .add("label", labelDocumentUpdates)
        .add("series", documentsDataSeriesArray)
        //widgetItem2.put("counters", documentNewUpdatedCounters);
        .add("bottomLineDataDocument", documentCountersLink)
        .add("name", "DocumentUpdates" )
        .add("type", "area")
        .add("view", "expanded")
        .add("filterable", true)
        .add("headerLabel", sLabelDate)
        .add("filterURL", "../common/emxIndentedTable.jsp?program=emxDashboardDocuments:getDocuments&mode=By Date&table=APPDashboardUserDocuments&freezePane=Name,RouteStatus,Title,Actions,NewWindow&selection=multiple")
        .add("counterLink", sbCounter.toString())
        .add("updateLink", sbUpdates.toString())
        .build();
        return widgetItem2;
    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getDocuments(Context context, String[] args) throws Exception {

		MapList mlResults       = new MapList();
		Map programMap          = (Map) JPO.unpackArgs(args);

		boolean trxnFlag = false;
		try {

			ContextUtil.startTransaction(context, false); 
			trxnFlag = true;

			String sMode            = (String) programMap.get("mode");
			if(null == sMode) { sMode = ""; }

        StringBuilder sbWhere   = new StringBuilder();
        sbWhere.append("(policy != 'Version')").append(" && (revision == last)");

        StringList busSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);
        busSelects.add("from[Publish Subscribe].to.id");
        String strPolicy = DomainConstants.SELECT_POLICY;
        String strModified = DomainConstants.SELECT_MODIFIED;
        String strOriginated = DomainConstants.SELECT_ORIGINATED;
    		String strType = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_type_Document);
    		try{
    			String includeTypes = EnoviaResourceBundle.getProperty(context, "emxFramework.FreezePane.DashboardDocs.IncludeTypes");
    			String propertyTypes="";
    			if(UIUtil.isNotNullAndNotEmpty(includeTypes) && includeTypes.contains(","))
    			{
    				StringList slIncludeType=FrameworkUtil.split(includeTypes, ",");
    				if(slIncludeType !=null && slIncludeType.size()>0)
    				{	
    					for(int i=0;i<slIncludeType.size();i++)
    					{
    						String typeName=PropertyUtil.getSchemaProperty(context,slIncludeType.get(i));
    						if(UIUtil.isNotNullAndNotEmpty(typeName))
    						{
    							if(UIUtil.isNotNullAndNotEmpty(propertyTypes))
    								propertyTypes+=","+typeName;
    							else
    								propertyTypes=typeName;
    						}	
    					}
    					includeTypes=propertyTypes;
    				}
    			}
    			else if(UIUtil.isNotNullAndNotEmpty(includeTypes))
					includeTypes=PropertyUtil.getSchemaProperty(context,includeTypes);
    			
    			if(UIUtil.isNullOrEmpty(includeTypes))
    				strType="";
    			else
    				strType=includeTypes;

    		}catch(Exception ex){

    		}

		String strExpandLimit = null;
		try{
			strExpandLimit = EnoviaResourceBundle.getProperty(context, "emxFramework.FreezePane.DashboardDocs.QueryLimit");
			if(UIUtil.isNullOrEmpty(strExpandLimit)){
				strExpandLimit = "100";
			}
		} catch (Exception ex) {
            strExpandLimit = "100";
        }
        Short expandLimit = new Short(strExpandLimit);
        boolean showLimitMessage = false;
    		String ownerWhereClause="";
    		try{
    			ownerWhereClause = EnoviaResourceBundle.getProperty(context, "emxFramework.FreezePane.DashboardDocs.FilterByOwner");
    			if(UIUtil.isNotNullAndNotEmpty(ownerWhereClause) && "true".equalsIgnoreCase(ownerWhereClause))
    			{
    				sbWhere.append(" && "+ CommonDocument.SELECT_OWNER +" == \'");
    				sbWhere.append(context.getUser());
    				sbWhere.append("\'");
    			}
    		}catch(Exception ex){
    		}
        if("New".equals(sMode)) {

            Calendar cal = Calendar.getInstance(TimeZone.getDefault());
            cal.add(java.util.GregorianCalendar.DAY_OF_YEAR,-10);

            busSelects.add(strPolicy);
            busSelects.add(strOriginated);

			busSelects.add(DomainConstants.SELECT_TYPE);
			busSelects.add(DomainConstants.SELECT_ID);

            busSelects.add(CommonDocument.SELECT_HAS_ROUTE);
			busSelects.add(CommonDocument.SELECT_MOVE_FILES_TO_VERSION);
			busSelects.add(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION);
			busSelects.add(CommonDocument.SELECT_FILE_NAME);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKED);
			busSelects.add(CommonDocument.SELECT_LOCKED);
			busSelects.add(CommonDocument.SELECT_TYPE_OF_IC_DOCUMENT);
			busSelects.add(CommonDocument.SELECT_FILE_FORMAT);
			busSelects.add(CommonDocument.SELECT_REVISION);
			busSelects.add(CommonDocument.SELECT_TYPE_OF_IC_DOCUMENT);
			busSelects.add(CommonDocument.SELECT_TYPE);
			busSelects.add(CommonDocument.SELECT_ID);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_VERSION);

			busSelects.add(CommonDocument.SELECT_SUSPEND_VERSIONING);
			busSelects.add(CommonDocument.SELECT_HAS_CHECKOUT_ACCESS);
			busSelects.add(CommonDocument.SELECT_HAS_CHECKIN_ACCESS);
			busSelects.add(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION);
			busSelects.add(CommonDocument.SELECT_FILE_NAME);
			busSelects.add(CommonDocument.SELECT_MOVE_FILES_TO_VERSION);
			busSelects.add(CommonDocument.SELECT_IS_KIND_OF_VC_DOCUMENT);
			busSelects.add("vcfile");
			busSelects.add("vcmodule");
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKED);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKER);
			busSelects.add(CommonDocument.SELECT_HAS_TOCONNECT_ACCESS);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_VERSION_ID);
			busSelects.add(CommonDocument.SELECT_OWNER);
			busSelects.add(CommonDocument.SELECT_LOCKED);
			busSelects.add(CommonDocument.SELECT_LOCKER);

			boolean bActivateDSFA= FrameworkUtil.isSuiteRegistered(context,"ActivateDSFA",false,null,null);
			if (bActivateDSFA ){
				busSelects.add(CommonDocument.SELECT_IS_KIND_OF_VC_DOCUMENT);
				busSelects.add(CommonDocument.SELECT_VCFILE_EXISTS);
				busSelects.add(CommonDocument.SELECT_VCFOLDER_EXISTS);
				busSelects.add(CommonDocument.SELECT_VCMODULE_EXISTS);
            }

            sbWhere.append(" && (originated > '").append(cal.get(Calendar.MONTH) + 1).append('/').append(cal.get(Calendar.DAY_OF_MONTH)).append('/').append(cal.get(Calendar.YEAR)).append("')");

            StringList orderBys = new StringList();
			orderBys.add("-originated");
			mlResults = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects, expandLimit.shortValue(), orderBys);
			if(mlResults.size()>=Integer.parseInt(strExpandLimit)){
				showLimitMessage = true;
			}
        } else if("Changed".equals(sMode)) {
            Calendar cal = Calendar.getInstance(TimeZone.getDefault());
            cal.add(java.util.GregorianCalendar.DAY_OF_YEAR,-10);
            busSelects.add(strPolicy);
            busSelects.add(strModified);
			busSelects.add(DomainConstants.SELECT_TYPE);
			busSelects.add(DomainConstants.SELECT_ID);
            busSelects.add(CommonDocument.SELECT_HAS_ROUTE);
			busSelects.add(CommonDocument.SELECT_MOVE_FILES_TO_VERSION);
			busSelects.add(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION);
			busSelects.add(CommonDocument.SELECT_FILE_NAME);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKED);
			busSelects.add(CommonDocument.SELECT_LOCKED);
			busSelects.add(CommonDocument.SELECT_TYPE_OF_IC_DOCUMENT);
			busSelects.add(CommonDocument.SELECT_FILE_FORMAT);
			busSelects.add(CommonDocument.SELECT_REVISION);
			busSelects.add(CommonDocument.SELECT_TYPE_OF_IC_DOCUMENT);
			busSelects.add(CommonDocument.SELECT_TYPE);
			busSelects.add(CommonDocument.SELECT_ID);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_VERSION);

			busSelects.add(CommonDocument.SELECT_SUSPEND_VERSIONING);
			busSelects.add(CommonDocument.SELECT_HAS_CHECKOUT_ACCESS);
			busSelects.add(CommonDocument.SELECT_HAS_CHECKIN_ACCESS);
			busSelects.add(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION);
			busSelects.add(CommonDocument.SELECT_FILE_NAME);
			busSelects.add(CommonDocument.SELECT_MOVE_FILES_TO_VERSION);
			busSelects.add(CommonDocument.SELECT_IS_KIND_OF_VC_DOCUMENT);
			busSelects.add("vcfile");
			busSelects.add("vcmodule");
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKED);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKER);
			busSelects.add(CommonDocument.SELECT_HAS_TOCONNECT_ACCESS);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_VERSION_ID);
			busSelects.add(CommonDocument.SELECT_OWNER);
			busSelects.add(CommonDocument.SELECT_LOCKED);
			busSelects.add(CommonDocument.SELECT_LOCKER);

			boolean bActivateDSFA= FrameworkUtil.isSuiteRegistered(context,"ActivateDSFA",false,null,null);
			if (bActivateDSFA ){
				busSelects.add(CommonDocument.SELECT_IS_KIND_OF_VC_DOCUMENT);
				busSelects.add(CommonDocument.SELECT_VCFILE_EXISTS);
				busSelects.add(CommonDocument.SELECT_VCFOLDER_EXISTS);
				busSelects.add(CommonDocument.SELECT_VCMODULE_EXISTS);
            }

            sbWhere.append(" && ("+ strModified+" > '").append(cal.get(Calendar.MONTH) + 1).append('/').append(cal.get(Calendar.DAY_OF_MONTH)).append('/').append(cal.get(Calendar.YEAR)).append("')");


            StringList orderBys = new StringList();
			orderBys.add("-modified");
			mlResults = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects, expandLimit.shortValue(), orderBys);
			if(mlResults.size()>=Integer.parseInt(strExpandLimit)){
				showLimitMessage = true;
			}
        } else if("Recent".equals(sMode)) {
            Calendar cal = Calendar.getInstance(TimeZone.getDefault());
            cal.add(java.util.GregorianCalendar.DAY_OF_YEAR,-10);
            busSelects.add(strPolicy);
            busSelects.add(strModified);
            busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_ORIGINATOR +"]");
			busSelects.add(DomainConstants.SELECT_TYPE);
			busSelects.add(DomainConstants.SELECT_ID);

            busSelects.add(CommonDocument.SELECT_HAS_ROUTE);
			busSelects.add(CommonDocument.SELECT_MOVE_FILES_TO_VERSION);
			busSelects.add(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION);
			busSelects.add(CommonDocument.SELECT_FILE_NAME);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKED);
			busSelects.add(CommonDocument.SELECT_LOCKED);
			busSelects.add(CommonDocument.SELECT_TYPE_OF_IC_DOCUMENT);
			busSelects.add(CommonDocument.SELECT_FILE_FORMAT);
			busSelects.add(CommonDocument.SELECT_REVISION);
			busSelects.add(CommonDocument.SELECT_TYPE_OF_IC_DOCUMENT);
			busSelects.add(CommonDocument.SELECT_TYPE);
			busSelects.add(CommonDocument.SELECT_ID);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_VERSION);

			busSelects.add(CommonDocument.SELECT_SUSPEND_VERSIONING);
			busSelects.add(CommonDocument.SELECT_HAS_CHECKOUT_ACCESS);
			busSelects.add(CommonDocument.SELECT_HAS_CHECKIN_ACCESS);
			busSelects.add(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION);
			busSelects.add(CommonDocument.SELECT_FILE_NAME);
			busSelects.add(CommonDocument.SELECT_MOVE_FILES_TO_VERSION);
			busSelects.add(CommonDocument.SELECT_IS_KIND_OF_VC_DOCUMENT);
			busSelects.add("vcfile");
			busSelects.add("vcmodule");
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKED);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKER);
			busSelects.add(CommonDocument.SELECT_HAS_TOCONNECT_ACCESS);
			busSelects.add(CommonDocument.SELECT_ACTIVE_FILE_VERSION_ID);
			busSelects.add(CommonDocument.SELECT_OWNER);
			busSelects.add(CommonDocument.SELECT_LOCKED);
			busSelects.add(CommonDocument.SELECT_LOCKER);

			boolean bActivateDSFA= FrameworkUtil.isSuiteRegistered(context,"ActivateDSFA",false,null,null);
			if (bActivateDSFA ){
				busSelects.add(CommonDocument.SELECT_IS_KIND_OF_VC_DOCUMENT);
				busSelects.add(CommonDocument.SELECT_VCFILE_EXISTS);
				busSelects.add(CommonDocument.SELECT_VCFOLDER_EXISTS);
				busSelects.add(CommonDocument.SELECT_VCMODULE_EXISTS);
			}
			sbWhere.append(" && "+ CommonDocument.SELECT_OWNER +" == \'");
            sbWhere.append(context.getUser());
            sbWhere.append("\'");

            sbWhere.append(" && ("+ strModified+" > '").append(cal.get(Calendar.MONTH) + 1).append('/').append(cal.get(Calendar.DAY_OF_MONTH)).append('/').append(cal.get(Calendar.YEAR)).append("')");


            StringList orderBys = new StringList();
			orderBys.add("-modified");
			mlResults = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects, expandLimit.shortValue(), orderBys);
			if(mlResults.size()>=Integer.parseInt(strExpandLimit)){
				showLimitMessage = true;
			}
        } else if("Locked".equals(sMode)) {
        	String relActiveVersion = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_relationship_ActiveVersion);
            busSelects.add("to["+relActiveVersion+"].from.id");
            busSelects.add("from["+relActiveVersion+"].to.id");
			busSelects.add("from[Publish Subscribe].to.id");
            busSelects.add(DomainConstants.SELECT_TYPE);

    			MapList mlLockedItems = DomainObject.findObjects(context, strType, null, "locked == TRUE && locker == \"" + context.getUser() + "\"", busSelects);
            ArrayList tempArray=new ArrayList();

            for (int i = 0; i < mlLockedItems.size(); i++) {
                Map mLockedItem = (Map)mlLockedItems.get(i);
                String sId = (String)mLockedItem.get("to["+relActiveVersion+"].from.id");
				if(sId==null){
					sId=(String)mLockedItem.get("id");
				}
				if (!tempArray.contains(sId)) {
					tempArray.add(sId);
                Map mResult = new HashMap();
                mResult.put(DomainConstants.SELECT_TYPE, (String)mLockedItem.get(DomainConstants.SELECT_TYPE));
                mResult.put("from[Publish Subscribe].to.id", (String)mLockedItem.get("from[Publish Subscribe].to.id"));
                mResult.put("id", sId);
                mlResults.add(mResult);
				}
            }

        } else if("MRU".equals(sMode)) {

            busSelects.add(strModified);

            Calendar cal = Calendar.getInstance();
            cal.add(java.util.GregorianCalendar.DAY_OF_YEAR, -1);

            String sMinute = String.valueOf(cal.get(Calendar.MINUTE));
            String sSecond = String.valueOf(cal.get(Calendar.SECOND));
            String sAMPM = (cal.get(Calendar.AM_PM) == 0 ) ? "AM" : "PM";

            if(sSecond.length() == 1) { sSecond = "0" + sSecond; }
            if(sMinute.length() == 1) { sMinute = "0" + sMinute; }


            sbWhere.append(" && ("+strModified +" >= \"").append(cal.get(Calendar.MONTH) + 1).append('/').append(cal.get(Calendar.DAY_OF_MONTH)).append('/').append(cal.get(Calendar.YEAR)).append(' ').append(cal.get(Calendar.HOUR) + 1).append(':').append(sMinute).append(':').append(sSecond).append(' ').append(sAMPM).append("\")");

            mlResults = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects);

        } else if("NewWeek".equals(sMode)) {
            Calendar cNow = Calendar.getInstance();
            cNow.set(Calendar.DAY_OF_WEEK, cNow.getFirstDayOfWeek());
            busSelects.add("from[Publish Subscribe].to.id");
            busSelects.add(DomainConstants.SELECT_TYPE);
            sbWhere.append(" && ("+strOriginated+" >= '").append(cNow.get(Calendar.MONTH) + 1).append('/').append(cNow.get(Calendar.DAY_OF_MONTH)).append('/').append(cNow.get(Calendar.YEAR)).append("')");
            mlResults = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects);
        } else if("ModWeek".equals(sMode)) {
            Calendar cNow = Calendar.getInstance();
            cNow.set(Calendar.DAY_OF_WEEK, cNow.getFirstDayOfWeek());
            busSelects.add("from[Publish Subscribe].to.id");
            busSelects.add(DomainConstants.SELECT_TYPE);
            busSelects.add(strOriginated);
            busSelects.add(strModified);
            sbWhere.append(" && ("+ strModified+" >= '").append(cNow.get(Calendar.MONTH) + 1).append('/').append(cNow.get(Calendar.DAY_OF_MONTH)).append('/').append(cNow.get(Calendar.YEAR)).append("')");
            mlResults = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects);
            for(int i = mlResults.size() - 1; i >= 0; i--) {
                Map mResult         = (Map)mlResults.get(i);
                String sOriginated  = (String)mResult.get(strOriginated);
                String sModified    = (String)mResult.get(strModified);
                sModified           = sModified.substring(0, sModified.indexOf(" "));
                sOriginated         = sOriginated.substring(0, sOriginated.indexOf(" "));
                if(sOriginated.equals(sModified)) { mlResults.remove(i); }
            }
        } else if("NewMonth".equals(sMode)) {
            Calendar cNow = Calendar.getInstance();
            busSelects.add("from[Publish Subscribe].to.id");
            busSelects.add(DomainConstants.SELECT_TYPE);
            sbWhere.append(" && ("+strOriginated+" >= '");
            sbWhere.append(cNow.get(Calendar.MONTH) + 1).append("/1/").append(cNow.get(Calendar.YEAR)).append("')");
            mlResults = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects);
        } else if("ModMonth".equals(sMode)) {
            Calendar cNow = Calendar.getInstance();
            cNow.set(Calendar.DAY_OF_WEEK, cNow.getFirstDayOfWeek());
            busSelects.add(DomainConstants.SELECT_TYPE);
            busSelects.add(strOriginated);
            busSelects.add(strModified);
            sbWhere.append(" && ("+ strModified +" >= '").append(cNow.get(Calendar.MONTH) + 1).append("/1/").append(cNow.get(Calendar.YEAR)).append("')");
            mlResults = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects);
            for(int i = mlResults.size() - 1; i >= 0; i--) {
                Map mResult         = (Map)mlResults.get(i);
                String sOriginated  = (String)mResult.get(strOriginated);
                String sModified    = (String)mResult.get(strModified);
                sModified           = sModified.substring(0, sModified.indexOf(" "));
                sOriginated         = sOriginated.substring(0, sOriginated.indexOf(" "));
                if(sOriginated.equals(sModified)) { mlResults.remove(i); }
            }
        } else if("By Date".equals(sMode)) {
            String sDate        = (String) programMap.get("date");
            Calendar cSelected  = Calendar.getInstance(TimeZone.getDefault());
            Calendar cNext      = Calendar.getInstance(TimeZone.getDefault());
            long lDate          = Long.parseLong(sDate);
            cSelected.setTimeInMillis(lDate);
            cNext.setTimeInMillis(lDate);
            cNext.add(java.util.GregorianCalendar.DAY_OF_YEAR, 1);
            busSelects.add("first");
            busSelects.add("revision");
            busSelects.add("last");
            sbWhere = new StringBuilder();
            sbWhere.append("("+strPolicy+" != 'Version')").append(" && ( ( ("+strModified+" > '").append(cSelected.get(Calendar.MONTH) + 1).append('/').append(cSelected.get(Calendar.DAY_OF_MONTH)).append('/').append(cSelected.get(Calendar.YEAR)).append("') ").append(" && ("+strModified+" < '").append(cNext.get(Calendar.MONTH) + 1).append('/').append(cNext.get(Calendar.DAY_OF_MONTH)).append('/').append(cNext.get(Calendar.YEAR)).append("') ) || ").append(" ( ("+strOriginated+" > '").append(cSelected.get(Calendar.MONTH) + 1).append('/').append(cSelected.get(Calendar.DAY_OF_MONTH)).append('/').append(cSelected.get(Calendar.YEAR)).append("') && ").append(" ("+strOriginated+" < '").append(cNext.get(Calendar.MONTH) + 1).append('/').append(cNext.get(Calendar.DAY_OF_MONTH)).append('/').append(cNext.get(Calendar.YEAR)).append("') ))");
            mlResults = DomainObject.findObjects(context, strType, null, sbWhere.toString(), busSelects);
        }
        if(showLimitMessage){
             String  strError = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(),"emxComponents.DashboardDocs.LimitReached");
             strError = FrameworkUtil.findAndReplace(strError, "{0}", String.valueOf(expandLimit));
             StringBuilder sb = new StringBuilder(strError);
             sb.insert(0, "Transient:");
             emxContextUtil_mxJPO.mqlNotice(context, sb.toString());
 		}
       }
		catch(Exception e) {	                	
			ContextUtil.abortTransaction(context);
			throw new Exception(e.getLocalizedMessage());

		}
		finally {
			if(trxnFlag == true) {
				ContextUtil.commitTransaction(context);

        		
        	}
        	return mlResults;
        }
        
    }

}
