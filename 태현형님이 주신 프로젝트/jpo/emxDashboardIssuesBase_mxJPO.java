
import com.matrixone.apps.common.Issue;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.BPSJsonObjectBuilder;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.framework.ui.UIUtil;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

public class emxDashboardIssuesBase_mxJPO {
    
    public static String sColorState1 = "#6699bb";
    public static String sColorState2 = "#cc0000";
    public static String sColorState3 = "#ff7f00";
    public static String sColorState4 = "#009c00";
    public static String sColorState5 = "#AAB8BE";
    public static String sColorLink     = emxUtil_mxJPO.sColorLink;
    
    SimpleDateFormat sdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat());
    String[] sColors     = emxUtil_mxJPO.sColorsCharts;
    
    public emxDashboardIssuesBase_mxJPO(Context context, String[] args) throws Exception {}
    // My Dashboard
    public JsonObject getUserDashboardData(Context context, String[] args) throws Exception {
        
        HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        //String sOID             = (String)paramMap.get("objectId");
        String sLanguage        = (String)paramMap.get("languageStr"); 
        int iCountDate          = 0;
        int iCountMRU           = 0;
        Calendar cMRU           = Calendar.getInstance();
        long sNow = Calendar.getInstance().getTimeInMillis();
        cMRU.add(java.util.GregorianCalendar.DAY_OF_YEAR,-1);

        com.matrixone.apps.common.Person pUser = com.matrixone.apps.common.Person.getPerson( context );
        
        StringList busSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);        
        busSelects.add(DomainConstants.SELECT_NAME);
        busSelects.add(DomainConstants.SELECT_OWNER);
        busSelects.add(DomainConstants.SELECT_CURRENT);
        busSelects.add(DomainConstants.SELECT_ORIGINATED);  
        busSelects.add(DomainConstants.SELECT_MODIFIED);        
        busSelects.add(DomainConstants.SELECT_DESCRIPTION);
        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_ESTIMATED_START_DATE +"]");
        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_ESTIMATED_END_DATE +"]");
        
        String strType = PropertyUtil.getSchemaProperty(context, Issue.SYMBOLIC_type_Issue);
        String strRelationAssignedIssue = PropertyUtil.getSchemaProperty(context, Issue.SYMBOLIC_relationship_AssignedIssue);  
        String strGroupMember = PropertyUtil.getSchemaProperty(context, "relationship_GroupMember");  
        
		StringList userGroups = pUser.getInfoList(context, "to["+strGroupMember+"].from.id");
		
		MapList ugAssignedIssues = new MapList();
		for(String userGroupId : userGroups) {
			DomainObject ugObj = new DomainObject(userGroupId);
			MapList ugAssignedIssuesTemp = ugObj.getRelatedObjects(context, strRelationAssignedIssue, strType, busSelects, null, false, true, (short)1, "current != 'Closed'", "", 0);
			
			if(ugAssignedIssuesTemp.size() > 0) {
				ugAssignedIssues.addAll(ugAssignedIssuesTemp);
			}	
		}
		
        MapList mlIssues = pUser.getRelatedObjects(context, strRelationAssignedIssue, strType, busSelects, null, false, true, (short)1, "current != 'Closed'", "", 0);
		mlIssues.addAll(ugAssignedIssues);
        mlIssues.sort("attribute["+ DomainConstants.ATTRIBUTE_ESTIMATED_END_DATE +"]", "ascending", "date");       
        
        JsonArrayBuilder yAxisCategoreisBuilder = Json.createArrayBuilder();
        JsonArrayBuilder issueDetailsOjbectArrayBuilder = Json.createArrayBuilder();
		
		StringList dup = new StringList();
		MapList m1IssuesFinal = new MapList();
		String sHasIssuesAssigned = "false";
		if(mlIssues.size() > 0) {
			sHasIssuesAssigned = "true";	
		}	
        for(int i = 0; i < mlIssues.size(); i++) {
            Map mIssue = (Map)mlIssues.get(i);
            String sId          = (String)mIssue.get(DomainConstants.SELECT_ID);
			
			if(dup.contains(sId)) {
				continue;
			}
			m1IssuesFinal.add(mIssue);			
			dup.add(sId);
            String sName        = (String)mIssue.get(DomainConstants.SELECT_NAME);
            String sCurrent     = (String)mIssue.get(DomainConstants.SELECT_CURRENT);
            String sModified    = (String)mIssue.get(DomainConstants.SELECT_MODIFIED);
            String sOwner       = (String)mIssue.get(DomainConstants.SELECT_OWNER);
            String sDescription = (String)mIssue.get(DomainConstants.SELECT_DESCRIPTION);
            String sStart       = (String)mIssue.get("attribute["+ DomainConstants.ATTRIBUTE_ESTIMATED_START_DATE +"]");
            String sEnd         = (String)mIssue.get("attribute["+ DomainConstants.ATTRIBUTE_ESTIMATED_END_DATE +"]");
            String sColor       = sColorState1;
            
            Calendar cModified    = Calendar.getInstance();            
            cModified.setTime(sdf.parse(sModified));  
            if(cModified.after(cMRU)) { iCountMRU++; }            
            

            if(UIUtil.isNotNullAndNotEmpty(sStart) && UIUtil.isNotNullAndNotEmpty(sEnd)) {
                Calendar sStartDate = Calendar.getInstance();            
                Calendar sEndDate = Calendar.getInstance();
            	sStartDate.setTime(sdf.parse(sStart));
            	sEndDate.setTime(sdf.parse(sEnd));
                            
                if(sCurrent.equals("Assign")) {
                	sColor = sColorState2; 
                }else if(sCurrent.equals("Active")) {
                	sColor = sColorState3; 
                }else if(sCurrent.equals("Review")) {
                	sColor = sColorState4; 
                }                    
                iCountDate++;            
                yAxisCategoreisBuilder.add(sName);                    
                JsonObject issueDetailsOjbect = BPSJsonObjectBuilder.createJsonObjectBuilder(Json.createObjectBuilder())


                .add("low", sStartDate.getTimeInMillis())
                .add("high", sEndDate.getTimeInMillis())
                .add("id", sId)

                .add("desc", sDescription)
                .add("owner", sOwner)
                .add("color", sColor)
                .build();
                issueDetailsOjbectArrayBuilder.add(issueDetailsOjbect);

                }
            }
            
        JsonArray yAxisCategoreis = yAxisCategoreisBuilder.build();
        StringBuilder sbCounter = new StringBuilder();        
        sbCounter.append("<td onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?table=IssueListDetails&program=emxDashboardIssues:getIssuesAssignedPending&header=emxFramework.String.AssignedPendingIssues&freezePane=Name,Edit&suiteKey=Framework&selection=multiple\")'");
        sbCounter.append(" class='counterCell ");
        if(m1IssuesFinal.size() == 0){ sbCounter.append("grayBright");   }
        else                    { sbCounter.append("yellow");       }
        sbCounter.append("'><span class='counterText ");
        if(m1IssuesFinal.size() == 0){ sbCounter.append("grayBright");   }
        else                    { sbCounter.append("yellow");       }        
        sbCounter.append("'>").append(m1IssuesFinal.size()).append("</span><br/>");
        sbCounter.append(EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.MyDesk.Issues", sLanguage)).append("</td>");         
        
        StringBuilder sbUpdates = new StringBuilder();
        if(sbCounter.length()>0){
			sbUpdates.append("<td ");  
			if(iCountMRU > 0) {   
			      
            sbUpdates.append(" onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?table=IssueListDetails&program=emxDashboardIssues:getIssuesAssignedPending&mode=MRU&header=emxFramework.String.MRUIssues&freezePane=Name,Edit&suiteKey=Framework&selection=multiple\")' ");
            sbUpdates.append(" class='mruCell'><span style='color:#000000;font-weight:bold;'>").append(iCountMRU).append("</span> <span class='counterTextMRU'>");            
            if(iCountMRU == 1) { sbUpdates.append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.MostRecentUpdate"  , sLanguage)); }
            else               { sbUpdates.append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.MostRecentUpdates" , sLanguage)); }
            sbUpdates.append("</span>");          
	         
        } else {	
			sbUpdates.append("class='mruCell' >");
		}
			sbUpdates.append("</td>");  
		}               
        
        int iHeightDate	= 35 + (iCountDate * 20);              
        if(iHeightDate < 120) { iHeightDate = 120; }
        
        String labelPlannedIssues = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.AssignedPendingIssues", sLanguage);
        
        JsonObject issueItemObj = BPSJsonObjectBuilder.createJsonObjectBuilder(Json.createObjectBuilder())     

	        .add("name", labelPlannedIssues)
	        .add("data", issueDetailsOjbectArrayBuilder.build())
	        .build();
 	   	JsonArray seriesIssuesFinal = Json.createArrayBuilder()


	 	   	.add(issueItemObj)
	 	   	.build();
        
 	   	
 	   
        JsonObject issueWidget = BPSJsonObjectBuilder.createJsonObjectBuilder(Json.createObjectBuilder())

        .add("label", labelPlannedIssues)
        .add("series", seriesIssuesFinal)       
        .add("name", "PlannedIssues" )
        .add("type", "columnrange")
        .add("height", iHeightDate)
        .add("view", "expanded")
        .add("filterable", true)
        .add("zoomType", "xy")
        .add("sNow", sNow)
        .add("filterURL", "../common/emxPortal.jsp?portal=IssuePortal&HelpMarker=emxhelpissuepowerview&suiteKey=Components&StringResourceFileId=emxComponentsStringResource&SuiteDirectory=components&emxSuiteDirectory=components")       
        .add("xAxisCategories", yAxisCategoreis)
        .add("counterLink", sbCounter.toString())
        .add("updateLink", sbUpdates.toString())
        .add("hasIssuesAssigned",sHasIssuesAssigned)
        .build();
        return issueWidget;    
    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getIssuesAssignedPending(Context context, String[] args) throws Exception {
		
                        
        Map programMap          = (Map) JPO.unpackArgs(args);
        String sMode            = (String) programMap.get("mode");  
        StringBuilder sbWhere   = new StringBuilder();

        if(null == sMode) { sMode = ""; }
        com.matrixone.apps.common.Person pUser = com.matrixone.apps.common.Person.getPerson( context );
        
        StringList busSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);
        busSelects.add(DomainConstants.SELECT_MODIFIED);         
            
        sbWhere.append("(current != 'Closed')");
        
        if(sMode.equals("MRU")) {
            
            Calendar cal = Calendar.getInstance();
            cal.add(java.util.GregorianCalendar.DAY_OF_YEAR, -1);

            String sMinute = String.valueOf(cal.get(Calendar.MINUTE));
            String sSecond = String.valueOf(cal.get(Calendar.SECOND));
            String sAMPM = (cal.get(Calendar.AM_PM) == 0 ) ? "AM" : "PM";

            if(sSecond.length() == 1) { sSecond = "0" + sSecond; }
            if(sMinute.length() == 1) { sMinute = "0" + sMinute; }

            
            sbWhere.append(" && (modified >= \"");
            sbWhere.append(cal.get(Calendar.MONTH) + 1).append("/").append(cal.get(Calendar.DAY_OF_MONTH)).append("/").append(cal.get(Calendar.YEAR));
            sbWhere.append(" ").append(cal.get(Calendar.HOUR) + 1).append(":").append(sMinute).append(":").append(sSecond).append(" ").append(sAMPM);
            sbWhere.append("\")");            
            
        }
        String strType = PropertyUtil.getSchemaProperty(context, Issue.SYMBOLIC_type_Issue);
        String strRelationAssignedIssue = PropertyUtil.getSchemaProperty(context, Issue.SYMBOLIC_relationship_AssignedIssue); 
        
		String strGroupMember = PropertyUtil.getSchemaProperty(context, "relationship_GroupMember");  
		
		StringList userGroups = pUser.getInfoList(context, "to["+strGroupMember+"].from.id");
		System.out.println("userGroups : " + userGroups);
		MapList ugAssignedIssues = new MapList();
		for(String userGroupId : userGroups) {
			DomainObject ugObj = new DomainObject(userGroupId);
			MapList ugAssignedIssuesTemp = ugObj.getRelatedObjects(context, strRelationAssignedIssue, strType, busSelects, null, false, true, (short)1, sbWhere.toString(), "", 0);
			System.out.println("ugAssignedIssuesTemp : " + ugAssignedIssuesTemp);
			if(ugAssignedIssuesTemp.size() > 0) {
				ugAssignedIssues.addAll(ugAssignedIssuesTemp);
			}	
		}
        MapList mlIssues = pUser.getRelatedObjects(context, strRelationAssignedIssue, strType, busSelects, null, false, true, (short)1, sbWhere.toString(), "", 0);
		mlIssues.addAll(ugAssignedIssues);
		MapList finalMapList = new MapList();
		StringList dup = new StringList();
		for(Map issueMap : (List<Map>) mlIssues) { 
			String issId = (String)issueMap.get(DomainConstants.SELECT_ID);
			if(dup.contains(issId)) {
				continue;
			}
			dup.add(issId);
			finalMapList.add(issueMap);
		}		
		return finalMapList;
		
    }

}
