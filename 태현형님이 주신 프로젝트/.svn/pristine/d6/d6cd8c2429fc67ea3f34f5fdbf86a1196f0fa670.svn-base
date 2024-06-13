import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;

import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.framework.ui.UIUtil;

import com.matrixone.apps.domain.util.FrameworkUtil;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class emxDashboardRoutesBase_mxJPO {

	public static String[] sColors = {"329cee","f6bd0f","8BBA00","ec0c41","752fc3","AFD8F8","fad46c","c9ff0d","F984A1","A66EDD"};
	public static String colorRed = "#cc0000";
	public static String colorYellow = "#ff7f00";
	public static String colorGreen 	= "#009c00";
	public static String colorGray = "#5f747d";
	public static String relRouteTask = DomainConstants.RELATIONSHIP_ROUTE_TASK;
	public static String relObjectRoute = DomainConstants.RELATIONSHIP_OBJECT_ROUTE;	
	 SimpleDateFormat sdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);

    public emxDashboardRoutesBase_mxJPO(Context context, String[] args) throws Exception {}

    public JsonObject getRouteWidgetJsonData(matrix.db.Context context, String[] args) throws Exception {

    	Collection routeAttrMultiValueList = new HashSet(10);
    	routeAttrMultiValueList.add("to["+ relRouteTask +"].from.id");
    	routeAttrMultiValueList.add("to["+ relRouteTask +"].from.current");
    	routeAttrMultiValueList.add("to["+ relRouteTask +"].from.from["+ DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.attribute["+ DomainConstants.ATTRIBUTE_FIRST_NAME +"]");
    	routeAttrMultiValueList.add("to["+ relRouteTask +"].from.from["+ DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.attribute["+ DomainConstants.ATTRIBUTE_LAST_NAME +"]");
    	routeAttrMultiValueList.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE + "]");
    	routeAttrMultiValueList.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_ACTUAL_COMPLETION_DATE +"]");
    	routeAttrMultiValueList.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_TITLE +"]");
    	routeAttrMultiValueList.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_ROUTE_ACTION+"]");
    	routeAttrMultiValueList.add("to["+ relRouteTask +"].from.from["+DomainConstants.RELATIONSHIP_PROJECT_TASK+"].to.name");
    	routeAttrMultiValueList.add("to["+ relObjectRoute +"].from.type.kindof");

       String sLanguage = context.getLocale().getLanguage();
       Calendar cRecent = Calendar.getInstance();
       Calendar cFuture = Calendar.getInstance();
       String sOID                 = "";
       int[] aCountPurpose     = new int[3];
        cRecent.add(java.util.GregorianCalendar.DAY_OF_YEAR, -14);
        cFuture.add(java.util.GregorianCalendar.DAY_OF_YEAR, 5);

       String sLabelHidePanel = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.HidePanel",  sLanguage);
       String sLabelRoute = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Type.Route",  sLanguage);
       String sLabelTitle= EnoviaResourceBundle.getProperty(context, "Components", "emxFramework.Attribute.Title",  sLanguage);
       String sLabelAction= EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.TaskDetails.Action",  sLanguage);
       String sLabelAssignee= EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Assignee",  sLanguage);
       
       

       JsonObject tooltipObject = Json.createObjectBuilder()
	       .add("labelRoute", sLabelRoute)
	       .add("labelTitle", sLabelTitle)
	       .add("labelAction", sLabelAction)
	       .add("labelAssignee", sLabelAssignee)
	       .build();
       

        java.util.List<String> lTypes       = new ArrayList<String>();
        java.util.List<String> lTemplates   = new ArrayList<String>();

        MapList mlTypes = new MapList();

        StringList busSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);
        busSelects.add(DomainConstants.SELECT_NAME);
        busSelects.add(DomainConstants.SELECT_CURRENT);

        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_STATUS +"]");
        busSelects.add("attribute[Current Route Node]");
        busSelects.add("to["+ relRouteTask +"]");
        busSelects.add("to["+ relRouteTask +"].from.current");
        busSelects.add("to["+ relRouteTask +"].from.from["+ DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.attribute["+ DomainConstants.ATTRIBUTE_FIRST_NAME +"]");
        busSelects.add("to["+ relRouteTask +"].from.from["+ DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.attribute["+ DomainConstants.ATTRIBUTE_LAST_NAME +"]");
        busSelects.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE + "]");
        busSelects.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_ACTUAL_COMPLETION_DATE +"]");
        busSelects.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_TITLE +"]");
        busSelects.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_ROUTE_ACTION+"]");
        busSelects.add("to["+ relRouteTask +"].from.from["+DomainConstants.RELATIONSHIP_PROJECT_TASK+"].to.name");
        busSelects.add("to["+ relObjectRoute +"]");
        busSelects.add("to["+ relObjectRoute +"].from.type.kindof");
        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE +"]");
        busSelects.add("from["+ DomainConstants.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE +"].to.name");

        MapList mlRoutes        = retrieveRoutesPending(context, busSelects, routeAttrMultiValueList, "");
        MapList mlTasksPending  = new MapList();
        MapList mlTasksRecent   = new MapList();

       StringBuilder strThereAreRouts = new StringBuilder();
       strThereAreRouts.append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ThereAre" , sLanguage));
       strThereAreRouts.append(" <span style='font-weight:bold;color:#000;'>").append(mlRoutes.size()).append("</span> ");
       strThereAreRouts.append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.PendingRoutes" , sLanguage));

        for(int i = 0; i < mlRoutes.size(); i++) {

            Map mRoute          = (Map)mlRoutes.get(i);
            String sId          = (String)mRoute.get(DomainConstants.SELECT_ID);
            String sName        = (String)mRoute.get(DomainConstants.SELECT_NAME);
            String sHasTask     = (String)mRoute.get("to["+ relRouteTask +"]");
            String sHasObject   = (String)mRoute.get("to["+ relObjectRoute +"]");
            String sPurpose     = (String)mRoute.get("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE +"]");
            String sTemplate    = (String)mRoute.get("from["+ DomainConstants.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE +"].to.name");

           if("TRUE".equalsIgnoreCase(sHasTask)) {

           	StringList sStatus      = (StringList)mRoute.get("to["+ relRouteTask +"].from.current");
           	StringList sDateTarget  = (StringList)mRoute.get("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE + "]");
           	StringList sDateActual  = (StringList)mRoute.get("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_ACTUAL_COMPLETION_DATE +"]");
           	StringList sTitle       = (StringList)mRoute.get("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_TITLE +"]");
           	StringList sAction      = (StringList)mRoute.get("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_ROUTE_ACTION +"]");
           	StringList sFirstName   = (StringList)mRoute.get("to["+ relRouteTask +"].from.from["+ DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.attribute["+ DomainConstants.ATTRIBUTE_FIRST_NAME +"]");
           	StringList sLastName    = (StringList)mRoute.get("to["+ relRouteTask +"].from.from["+ DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.attribute["+ DomainConstants.ATTRIBUTE_LAST_NAME +"]");
           	StringList sFullNames 	= (StringList)mRoute.get("to["+ relRouteTask +"].from.from["+ DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.name");

               for(int k = 0; k < sStatus.size(); k++) {
            	   String sFullName = "";
            	   try {
            		   sFullName    = (String)sFullNames.get(k);
            	   } catch (Exception ex) {
            		   //donothing
            	   }
                   if(sFullName.equals(context.getUser())) {
                	   addPendingTaskToMap(context, mlTasksPending, sId, sName, (String)sStatus.get(k), (String)sDateTarget.get(k), (String)sTitle.get(k), (String)sAction.get(k), (String)sFirstName.get(k), (String)sLastName.get(k), sLanguage);
                	   addRecentTaskToMap(context, mlTasksRecent, cRecent, sId, sName, (String)sStatus.get(k), (String)sDateTarget.get(k), (String)sDateActual.get(k), (String)sTitle.get(k), (String)sAction.get(k), (String)sFirstName.get(k), (String)sLastName.get(k), sLanguage);
                   }
               }
            }

            // Route Content Type
            if(sHasObject.equalsIgnoreCase("TRUE")) {
                    StringList slData = (StringList)mRoute.get("to["+ relObjectRoute +"].from.type.kindof");
                    for(int k = 0; k < slData.size(); k++) {
                        String sData = (String)slData.get(k);
                        sData = EnoviaResourceBundle.getTypeI18NString(context, sData, sLanguage);
                        if(!lTypes.contains(sData)) {
                            lTypes.add(sData);
                            Map mType = new HashMap();
                            mType.put("name", (String)slData.get(k));
                            mType.put("label", sData);
                            mlTypes.add(mType);
                        }
                    }
                    }
            // Route Base Purpose counters
           if(sPurpose.equals("Approval")){ 
           	aCountPurpose[0]++; 
           } else if(sPurpose.equals("Review")){
           	aCountPurpose[1]++;
           }else if(sPurpose.equals("Standard")) {
           	aCountPurpose[2]++; 
           }

            // Get list of all templates in use
           if(UIUtil.isNullOrEmpty(sTemplate)) {
           	sTemplate = "-"; 
           	mRoute.put("from["+ DomainConstants.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE +"].to.name", "-"); 
           }
           if(!lTemplates.contains(sTemplate)){ 
           	lTemplates.add(sTemplate); 
           }           
        }


        // Add routes that have been completed recently
        StringBuilder sbWhere = new StringBuilder();
        sbWhere.append("(owner == \"").append(context.getUser()).append("\") && (current == 'Complete')");
        sbWhere.append("&& (modified >= ").append(cRecent.get(Calendar.MONTH)).append("/").append(cRecent.get(Calendar.DAY_OF_MONTH)).append("/").append(cRecent.get(Calendar.YEAR)).append(")");
        MapList mlRoutesRecent = DomainObject.findObjects(context, DomainConstants.TYPE_ROUTE, null, null, null, context.getVault().getName(), sbWhere.toString(), null,
                true, busSelects,(short)0, null, null, routeAttrMultiValueList);
        for(int i = 0; i < mlRoutesRecent.size(); i++) {

            Map mRoute          = (Map)mlRoutesRecent.get(i);
            String sId          = (String)mRoute.get(DomainConstants.SELECT_ID);
            String sName        = (String)mRoute.get(DomainConstants.SELECT_NAME);
            String sHasTask     = (String)mRoute.get("to["+relRouteTask+"]");


            if(sHasTask.equalsIgnoreCase("TRUE")) {
           	StringList sStatus      = (StringList)mRoute.get("to["+relRouteTask+"].from.current");
           	StringList sDateTarget  = (StringList)mRoute.get("to["+relRouteTask+"].from.attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE + "]");
           	StringList sDateActual  = (StringList)mRoute.get("to["+relRouteTask+"].from.attribute["+ DomainConstants.ATTRIBUTE_ACTUAL_COMPLETION_DATE +"]");
           	StringList sTitle       = (StringList)mRoute.get("to["+relRouteTask+"].from.attribute["+ DomainConstants.ATTRIBUTE_TITLE +"]");
           	StringList sAction      = (StringList)mRoute.get("to["+relRouteTask+"].from.attribute["+ DomainConstants.ATTRIBUTE_ROUTE_ACTION+"]");
           	StringList sFirstName   = (StringList)mRoute.get("to["+relRouteTask+"].from.from["+ DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.attribute["+ DomainConstants.ATTRIBUTE_FIRST_NAME +"]");
           	StringList sLastName    = (StringList)mRoute.get("to["+relRouteTask+"].from.from["+ DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.attribute["+ DomainConstants.ATTRIBUTE_LAST_NAME +"]");

           	for(int k = 0; k < sStatus.size(); k++) {
                  addRecentTaskToMap(context, mlTasksRecent, cRecent, sId, sName, (String)sStatus.get(k), (String)sDateTarget.get(k), (String)sDateActual.get(k), (String)sTitle.get(k), (String)sAction.get(k), (String)sFirstName.get(k), (String)sLastName.get(k), sLanguage);
                }

            }
        }

       mlTasksPending.sort("date", "descending", "date");
       JsonObject widgetItem1 = getRoutePendingTasks(context, mlTasksPending, tooltipObject, sLanguage);
       
       mlTasksRecent.sort("actual", "descending", "date");
       JsonObject widgetItem2 = getRouteRecentTasks(context, mlTasksRecent, tooltipObject, sLanguage);

       JsonObject widgetItem4 = getRouteBasePurposeData(context, aCountPurpose, sLanguage);

       Collections.sort(lTemplates);
       JsonObject widgetItem5= getRouteTemplateData(context, lTemplates, mlRoutes, sLanguage);
      
       Collections.sort(lTypes);
       JsonObject widgetItem3 = getRouteContentTypeData(context, lTypes, mlRoutes, mlTypes, sLanguage);


       JsonObject headerData = Json.createObjectBuilder()
	       .add("hidePanelLabel",sLabelHidePanel)
	       .add("headerString", strThereAreRouts.toString())
	       .build();
       


       JsonArray widgetArray = Json.createArrayBuilder()
	       .add(widgetItem1)
	       .add(widgetItem2)
	       .add(widgetItem3)
	       .add(widgetItem4)
	       .add(widgetItem5)
	       .build();
       
       String detailedURL ="../common/emxIndentedTable.jsp?freezePane=Status,Name,NewWindow&toolbar=APPRouteSummaryToolBar" +
       		"&program=emxRoute:getMyDeskActiveRoutes,emxRoute:getMyDeskInActiveRoutes,emxRoute:getAllMyDeskRoutes" +
       		"&programLabel=emxComponents.Filter.Active,emxComponents.Filter.Complete,emxComponents.Filter.All&table=APPRouteSummary" +
       		"&selection=multiple&header=emxComponents.String.RoutesSummary&suiteKey=Components";
       

       JsonObject routeDataObject = Json.createObjectBuilder()
	       .add("header",headerData)       
	       .add("widgets", widgetArray)
	       .add("detailedURL", detailedURL)
	       .build();
       
       return routeDataObject;
   }
   
   private JsonObject getRoutePendingTasks(matrix.db.Context context, MapList mlTasksPending,
		   JsonObject tooltipObject, String sLanguage) throws Exception{
	   
	 String sLabelPendingTasks = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.PendingTasks", sLanguage);	   






   	 JsonArrayBuilder taskOverdueArrayBuilder = Json.createArrayBuilder();
   	 JsonArrayBuilder taskNowArrayBuilder = Json.createArrayBuilder();
   	 JsonArrayBuilder taskSoonArrayBuilder = Json.createArrayBuilder();
   	 JsonArrayBuilder seriesPendingTaskArrayBuilder = Json.createArrayBuilder();
   	 JsonArrayBuilder labelPendingTaskArrayBuilder = Json.createArrayBuilder();
     JsonObjectBuilder taskPendingObjectLinkBuilder = Json.createObjectBuilder();
       
	 StringBuilder sbPendingWeek         = new StringBuilder();
	 StringBuilder sbPendingMonth        = new StringBuilder();
	 StringBuilder sbPendingOverdue      = new StringBuilder();
	 String sPrefixTasks         = "<a onclick='clickChart(\"../common/emxIndentedTable.jsp?table=APPTaskSummary&freezePane=Name,Title&program=emxDashboardRoutes:getRouteTasksPending&mode=";
	 String sSuffixTasks         = "&suiteKey=Framework&selection=multiple&header=";
	 String sLabelThisWeek   = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ThisWeek" , sLanguage);
	 String sLabelThisMonth  = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ThisMonth", sLanguage);
	 String sLabelOverdue= EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Overdue",  sLanguage);
   	 String sLabelNow= EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Now",  sLanguage);
   	 String sLabelSoon= EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Soon",  sLanguage);

       int[] aCountPending     = new int[3];

       Calendar cNow               = Calendar.getInstance();
       Calendar cDate              = Calendar.getInstance();
       Calendar cRecent            = Calendar.getInstance();
       Calendar cFuture            = Calendar.getInstance();

       cRecent.add(java.util.GregorianCalendar.DAY_OF_YEAR, -14);
       cFuture.add(java.util.GregorianCalendar.DAY_OF_YEAR, 5);
       int iYearNow       = cNow.get(Calendar.YEAR);
       int iMonthNow      = cNow.get(Calendar.MONTH);
       int iWeekNow       = cNow.get(Calendar.WEEK_OF_YEAR);

		String statusCompletedDate = EnoviaResourceBundle.getProperty(context,"Components","emxComponents.TaskSummary.CompletedDate",sLanguage);
		String statusDueDate = EnoviaResourceBundle.getProperty(context,"Components","emxComponents.Routes.ScheduleCompDate",sLanguage);
     
   		int iMaxPending = 0;
        for(int i = 0; i < mlTasksPending.size(); i++) {

            Map mTaskPending            = (Map)mlTasksPending.get(i);
            String sTitle               = (String)mTaskPending.get("title");
            String sDate                = (String)mTaskPending.get("date");
            //String sDateLabel           = (String)mTaskPending.get("date");
            String sPerson              = (String)mTaskPending.get("person");
            String sAction              = (String)mTaskPending.get("action");
            String sRoute               = (String)mTaskPending.get("name");
            String sId                  = (String)mTaskPending.get("id");
            String status               = (String)mTaskPending.get("status");

            if(sTitle.equals("")) { sTitle = "(" + sAction + ")"; }
            else if(sTitle.equals(" ")) { sTitle = "(" + sAction + ")"; }

            if(UIUtil.isNotNullAndNotEmpty(sDate)){
                iMaxPending++;

                labelPendingTaskArrayBuilder.add(sTitle);
                cDate.setTime(sdf.parse(sDate));

                int iYear   = cDate.get(Calendar.YEAR);
                int iMonth  = cDate.get(Calendar.MONTH);
                int iWeek   = cDate.get(Calendar.WEEK_OF_YEAR);
                int iDay    = cDate.get(Calendar.DAY_OF_MONTH);











                JsonObjectBuilder taskDataObjectBuilder = Json.createObjectBuilder();
                
                taskDataObjectBuilder.add("id", sId);
                taskDataObjectBuilder.add("title", sTitle);
                taskDataObjectBuilder.add("route", sRoute);
                taskDataObjectBuilder.add("person", sPerson);
                taskDataObjectBuilder.add("action", sAction);
                taskDataObjectBuilder.add("date", cDate.getTimeInMillis());
                taskDataObjectBuilder.add("x", cDate.getTimeInMillis());
                taskDataObjectBuilder.add("y", i);
	               
                if ("Complete".equalsIgnoreCase(status)){
                	taskDataObjectBuilder.add("status",statusCompletedDate);
                }else{
                	taskDataObjectBuilder.add("status",statusDueDate);
                }

                JsonObject taskDataObject = taskDataObjectBuilder.build();
                if(cDate.before(cNow)){

               	 taskOverdueArrayBuilder.add(taskDataObject); 
               	 aCountPending[2]++; 
                }else {
                    if(cDate.after(cFuture)){

                    	taskOverdueArrayBuilder.add(taskDataObject); 
                    }else{

                   	 taskNowArrayBuilder.add(taskDataObject); 
                    }
                }

                if(iYear == iYearNow) {
                    if(iWeek == iWeekNow)   { aCountPending[0]++; }
                    if(iMonth == iMonthNow) { aCountPending[1]++;     }
                }

            }

        }


     JsonArray taskOverdueArray = taskOverdueArrayBuilder.build();
   	 JsonObjectBuilder taskOverdueDataObjectBuilder = Json.createObjectBuilder();
   	 taskOverdueDataObjectBuilder.add("name", sLabelOverdue);
   	 taskOverdueDataObjectBuilder.add("color", colorRed);  	 
   	 taskOverdueDataObjectBuilder.add("data", taskOverdueArray);




   	 





   	 JsonObject taskOverdueMarkerObject = Json.createObjectBuilder()
   	 .add("fillColor", "#ffffff")


   	 .add("lineColor", colorRed)
   	 .build();
   	 taskOverdueDataObjectBuilder.add("marker", taskOverdueMarkerObject);
   	 








   	 JsonObjectBuilder taskNowDataObjectBuilder = Json.createObjectBuilder();
   	 taskNowDataObjectBuilder.add("name", sLabelNow);
   	 taskNowDataObjectBuilder.add("color", colorYellow);	 
   	 taskNowDataObjectBuilder.add("data", taskNowArrayBuilder.build());
   	 



 	 JsonObject taskNowDataMarkerObject = Json.createObjectBuilder()
 	 .add("fillColor", "#ffffff")
 	 .add("lineColor", colorYellow)
 	 .build();
 	 taskNowDataObjectBuilder.add("marker", taskNowDataMarkerObject);
   	 
   	 JsonObjectBuilder taskSoonDataObjectBuilder = Json.createObjectBuilder() ;
   	 taskSoonDataObjectBuilder.add("name", sLabelSoon);
   	 taskSoonDataObjectBuilder.add("color", colorGreen);
   	 taskSoonDataObjectBuilder.add("data", taskSoonArrayBuilder.build());
   	 
 	 JsonObject taskSoonMarkerObject = Json.createObjectBuilder()
 	 .add("fillColor", "#ffffff")
 	 .add("lineColor", colorGreen)
 	 .build();
 	 taskSoonDataObjectBuilder.add("marker", taskSoonMarkerObject);
   	 
   	 seriesPendingTaskArrayBuilder.add(taskOverdueDataObjectBuilder.build());
   	 seriesPendingTaskArrayBuilder.add(taskNowDataObjectBuilder.build());
   	 seriesPendingTaskArrayBuilder.add(taskSoonDataObjectBuilder.build());

     sbPendingWeek.append("<span style='font-weight:bold;'>").append(aCountPending[0]).append("</span> ").append(sPrefixTasks).append("week").append(sSuffixTasks).append("emxFramework.String.PendingTasksThisWeek").append("\")'>").append(sLabelThisWeek).append("</a>");
     sbPendingMonth.append("<span style='font-weight:bold;'>").append(aCountPending[1]).append("</span> ").append(sPrefixTasks).append("month").append(sSuffixTasks).append("emxFramework.String.PendingTasksThisMonth").append("\")'>").append(sLabelThisMonth).append("</a>");
     sbPendingOverdue.append("<span style='font-weight:bold;'>").append(aCountPending[2]).append("</span> ").append(sPrefixTasks).append("overdue").append(sSuffixTasks).append("emxFramework.String.PendingTasksOverdue").append("\")'>").append(sLabelOverdue).append("</a>");

     taskPendingObjectLinkBuilder.add("taskPendingThisWeek", sbPendingWeek.toString());
   	 taskPendingObjectLinkBuilder.add("taskPendingThisMonth", sbPendingMonth.toString());
   	 taskPendingObjectLinkBuilder.add("taskPendingOverDue", sbPendingOverdue.toString());

   	    int iHeightPending = 40 + (iMaxPending * 17);
        if(iHeightPending < 160) {
       	 iHeightPending = 160; 
        }


        JsonArray seriesPendingTaskArray = seriesPendingTaskArrayBuilder.build();
        JsonArray labelPendingTaskArray = labelPendingTaskArrayBuilder.build();
        JsonObject taskPendingObjectLink = taskPendingObjectLinkBuilder.build();
        
        
        JsonObjectBuilder widgetItem1Builder = Json.createObjectBuilder();     
        widgetItem1Builder.add("label", sLabelPendingTasks);
        widgetItem1Builder.add("series", seriesPendingTaskArray);
        widgetItem1Builder.add("name", "Pending");
        widgetItem1Builder.add("type", "scatter");
        widgetItem1Builder.add("height", iHeightPending);
        widgetItem1Builder.add("yMax", iMaxPending-1);
        widgetItem1Builder.add("yAxisCategories", labelPendingTaskArray);        
        widgetItem1Builder.add("view", "expanded");
        widgetItem1Builder.add("bottomLineData", taskPendingObjectLink);
        widgetItem1Builder.add("xAxisDateValue", Calendar.getInstance().getTimeInMillis());
        widgetItem1Builder.add("tooltipObject", tooltipObject);
        widgetItem1Builder.add("filterable", true);
        widgetItem1Builder.add("showLegend", true);        
        widgetItem1Builder.add("filterURL", "../common/emxPortal.jsp?portal=APPRoutePowerView&suiteKey=Components" +
        		"&StringResourceFileId=emxComponentsStringResource&SuiteDirectory=components&emxSuiteDirectory=components");

        if(seriesPendingTaskArray.size()==0){
        	widgetItem1Builder.add("view", "collapsed");
        }                 

        return widgetItem1Builder.build();
   }
   
   private JsonObject getRouteRecentTasks(matrix.db.Context context, MapList mlTasksRecent, 
		   JsonObject tooltipObject, String sLanguage) throws Exception{







	   JsonArrayBuilder seriesRecentTaskArrayBuilder = Json.createArrayBuilder();
	   JsonArrayBuilder labelRecentTaskArrayBuilder = Json.createArrayBuilder();        
	   JsonArrayBuilder taskWithTargetDateArrayBuilder = Json.createArrayBuilder();
	   JsonArrayBuilder taskDelayedArrayBuilder = Json.createArrayBuilder();
	   JsonArrayBuilder taskInTimeArrayBuilder = Json.createArrayBuilder();
	   JsonArrayBuilder taskWitoutTargetArrayBuilder = Json.createArrayBuilder();
       
       String sLabelForRecentTasks = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.RecentUpdates", sLanguage);
       String sLabelTarget = EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.Routes.ScheduleCompDate",  sLanguage);
	   String sLabelInTime = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.InTime",  sLanguage);
	   String sLabelDelayed = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Delayed",  sLanguage);
	   String sLabelNoTarget = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.NoTargetDate",  sLanguage);
       Calendar cDate              = Calendar.getInstance();
   	   int iMaxRecent          = 0;

	   	String statusCompletedDate = EnoviaResourceBundle.getProperty(context,"Components","emxComponents.TaskSummary.CompletedDate",sLanguage);
		String statusDueDate = EnoviaResourceBundle.getProperty(context,"Components","emxComponents.Routes.ScheduleCompDate",sLanguage);
 
        for(int i = 0; i < mlTasksRecent.size(); i++) {

            Map mTaskRecent             = (Map)mlTasksRecent.get(i);
            String sTitle               = (String)mTaskRecent.get("title");
            String sTarget              = (String)mTaskRecent.get("target");
            //String sTargetLabel         = (String)mTaskRecent.get("target");
            String sActual              = (String)mTaskRecent.get("actual");
            String sPerson              = (String)mTaskRecent.get("person");
            String sAction              = (String)mTaskRecent.get("action");
            String sRoute               = (String)mTaskRecent.get("name");
            String sId                  = (String)mTaskRecent.get("id");
            String status               = (String)mTaskRecent.get("status"); 
            
            Calendar cTarget = Calendar.getInstance();
			
			if(UIUtil.isNotNullAndNotEmpty(sTarget)){
            	cTarget.setTime(sdf.parse(sTarget));
			}
            int iYearTarget   = cTarget.get(Calendar.YEAR);
            int iMonthTarget  = cTarget.get(Calendar.MONTH);
            int iDayTarget    = cTarget.get(Calendar.DAY_OF_MONTH);
            
            if(sTitle.equals("")) { sTitle = "(" + sAction + ")"; }
            else if(sTitle.equals(" ")) { sTitle = "(" + sAction + ")"; }

            if(!"".equals(sActual)) {

                iMaxRecent++;

                labelRecentTaskArrayBuilder.add(sTitle);
                cDate.setTime(sdf.parse(sActual));



               JsonObjectBuilder taskDataObjectBuilder = Json.createObjectBuilder();
               taskDataObjectBuilder.add("id", sId);
               taskDataObjectBuilder.add("title", sTitle);
               taskDataObjectBuilder.add("route", sRoute);
               taskDataObjectBuilder.add("person", sPerson);
               taskDataObjectBuilder.add("action", sAction);
               taskDataObjectBuilder.add("date", cDate.getTimeInMillis());
               taskDataObjectBuilder.add("x", cDate.getTimeInMillis());               

               taskDataObjectBuilder.add("y", i);

               if ("Complete".equalsIgnoreCase(status)){
               	taskDataObjectBuilder.add("status",statusCompletedDate);
               }else{
               	taskDataObjectBuilder.add("status",statusDueDate);
               }

               JsonObject taskDataObject = taskDataObjectBuilder.build();
               if(UIUtil.isNullOrEmpty(sTarget)) {                	

               	taskWitoutTargetArrayBuilder.add(taskDataObject);
               }else {

            	   
                   JsonObjectBuilder cloneTaskDataObjectBuilder = FrameworkUtil.getBuilderObjectClone(taskDataObject);
                   cloneTaskDataObjectBuilder.add("x", cTarget.getTimeInMillis());


                
                   taskWithTargetDateArrayBuilder.add(cloneTaskDataObjectBuilder.build());
                    if(cDate.after(cTarget)) {

                     	taskDelayedArrayBuilder.add(taskDataObject);
                    } else {

                     	taskInTimeArrayBuilder.add(taskDataObject);
                    }

                }

            }

        }

       JsonObject taskWithTargetMarkerObject = Json.createObjectBuilder()
	       .add("fillColor", "#ffffff")
	       .add("lineColor", colorYellow)
	       .build();
	   JsonObject taskWithTargetDataObject =  Json.createObjectBuilder()
	       .add("name", sLabelTarget)
	       .add("color", colorYellow)

	       .add("data", taskWithTargetDateArrayBuilder.build())
	       .add("marker", taskWithTargetMarkerObject)
	       .build();
       seriesRecentTaskArrayBuilder.add(taskWithTargetDataObject);
       
       JsonObject taskDelayedMarkerObject = Json.createObjectBuilder()
	       .add("fillColor", "#ffffff")







	       .add("lineColor", colorRed)
	       .build();
       

       JsonObject taskDelayedDataObject = Json.createObjectBuilder()
	       .add("name", sLabelDelayed)
	       .add("color", colorRed) 
	       .add("data", taskDelayedArrayBuilder.build())
	       .add("marker", taskDelayedMarkerObject)
	       .build();
       seriesRecentTaskArrayBuilder.add(taskDelayedDataObject);
       
       JsonObject taskInTimeMarkerObject = Json.createObjectBuilder()
	   	   .add("fillColor", "#ffffff")
	   	   .add("lineColor", colorGreen)
	   	   .build();
       JsonObject taskInTimeDataObject = Json.createObjectBuilder()
	       .add("name", sLabelInTime)
	       .add("color", colorGreen)	 

	       .add("data", taskInTimeArrayBuilder.build())
	       .add("marker", taskInTimeMarkerObject)
	       .build();
       seriesRecentTaskArrayBuilder.add(taskInTimeDataObject);
       	   
       JsonObject taskWithoutTargetDataMarkerObject = Json.createObjectBuilder()       


	   	   .add("fillColor", "#ffffff")
	   	   .add("lineColor", colorGray)
	   	   .build();
       JsonObject taskWithoutTargetDataObject = Json.createObjectBuilder() 
	       .add("name", sLabelNoTarget)


	       .add("color", colorGray) 
	       .add("data", taskWitoutTargetArrayBuilder.build())
	       .add("marker", taskWithoutTargetDataMarkerObject)
	       .build();
       seriesRecentTaskArrayBuilder.add(taskWithoutTargetDataObject);

       int iHeightRecent	= 78 + (iMaxRecent * 20);
       if(iHeightRecent < 150) {
       	iHeightRecent = 150; 
       }


       JsonArray seriesRecentTaskArray = seriesRecentTaskArrayBuilder.build();
       JsonObjectBuilder widgetItem2Builder = Json.createObjectBuilder();      
       widgetItem2Builder.add("label", sLabelForRecentTasks);
       widgetItem2Builder.add("series", seriesRecentTaskArray);
       widgetItem2Builder.add("name", "Recent");
       widgetItem2Builder.add("type", "scatter");
       widgetItem2Builder.add("height", iHeightRecent);
       widgetItem2Builder.add("yMax", iMaxRecent-1);

       widgetItem2Builder.add("yAxisCategories", labelRecentTaskArrayBuilder.build());
       widgetItem2Builder.add("view", "expanded");
       widgetItem2Builder.add("xAxisDateValue", Calendar.getInstance().getTimeInMillis());
       widgetItem2Builder.add("tooltipObject", tooltipObject);
       widgetItem2Builder.add("filterable", true);
       widgetItem2Builder.add("showLegend", true);
       widgetItem2Builder.add("filterURL", "../common/emxPortal.jsp?portal=APPRoutePowerView&suiteKey=Components" +
		"&StringResourceFileId=emxComponentsStringResource&SuiteDirectory=components&emxSuiteDirectory=components");
       if(seriesRecentTaskArray.size()==0){
       	widgetItem2Builder.add("view", "collapsed");
       }


       return widgetItem2Builder.build();
   }
   

   private JsonObject getRouteBasePurposeData(matrix.db.Context context, int[] aCountPurpose, String sLanguage) 
	throws Exception{
	  
	   String sLabelPurpose = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.RouteBasePurpose", sLanguage);
   

	   JsonArrayBuilder seriesPurposeArrayBuilder = Json.createArrayBuilder();
	   JsonObject seriesPurposeApprove = Json.createObjectBuilder()
		   .add("name",EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Route_Base_Purpose.Approval", sLanguage))
		   .add("color","#8BBA00")
		   .add("y",aCountPurpose[0])
		   .add("value","Approval")
		   .build();
	   seriesPurposeArrayBuilder.add(seriesPurposeApprove);
       
	   JsonObject seriesPurposeReview = Json.createObjectBuilder()
	       .add("name",EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Route_Base_Purpose.Review", sLanguage))

	       .add("color","#329CEE")      
	       .add("y",aCountPurpose[1])
	       .add("value","Review")
	       .build();
       seriesPurposeArrayBuilder.add(seriesPurposeReview);
       
       JsonObject seriesPurposeStandard = Json.createObjectBuilder()
	       .add("name",EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Route_Base_Purpose.Standard", sLanguage))
	       .add("color","#F6BD0F")
	       .add("y",aCountPurpose[2])
	       .add("value","Standard")
	       .build();
       seriesPurposeArrayBuilder.add(seriesPurposeStandard);
       

       JsonArray seriesPurposeArray = seriesPurposeArrayBuilder.build();
       JsonObject dataItem4 = Json.createObjectBuilder()    
	       .add("data", seriesPurposeArray)
	       .add("name", sLabelPurpose)


	       .build();
       JsonArrayBuilder seriesRoutePurposeFinalBuilder = Json.createArrayBuilder();
       seriesRoutePurposeFinalBuilder.add(dataItem4);
       

       JsonObjectBuilder widgetItem4Builder = Json.createObjectBuilder();     
       widgetItem4Builder.add("label", sLabelPurpose);

       widgetItem4Builder.add("series", seriesRoutePurposeFinalBuilder.build());
       widgetItem4Builder.add("name", "Purpose");
       widgetItem4Builder.add("type", "pie");
       widgetItem4Builder.add("view", "expanded");
       widgetItem4Builder.add("height", 140);
       widgetItem4Builder.add("filterable", true);
       widgetItem4Builder.add("filterURL","../common/emxIndentedTable.jsp?editLink=true&selection=multiple&program=emxDashboardRoutes:getRoutesPending" +
  		"&table=APPRouteSummary&freezePane=Status,Name,NewWindow");
       if(seriesPurposeArray.size()==0){
       	widgetItem4Builder.add("view", "collapsed");
       }
	

       return widgetItem4Builder.build();
   }
   
   private JsonObject getRouteTemplateData(matrix.db.Context context, java.util.List<String> lTemplates, MapList mlRoutes,
		   String sLanguage)throws Exception{
	   


       JsonArrayBuilder seriesTemplateDataArrayBuilder = Json.createArrayBuilder();
       JsonArrayBuilder labelTemplateArrayBuilder = Json.createArrayBuilder(); 	
	   String sLabelForRouteTemplate = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.RouteTemplate", sLanguage);

        for(int i = 0; i < lTemplates.size(); i++) {
       	labelTemplateArrayBuilder.add(lTemplates.get(i));
        }

        int[] aCountTemplate = new int[lTemplates.size()];

        for(int i = 0; i < mlRoutes.size(); i++) {

            Map mRoute          = (Map)mlRoutes.get(i);
            String sTemplate    = (String)mRoute.get("from["+ DomainConstants.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE +"].to.name");

            aCountTemplate[lTemplates.indexOf(sTemplate)]++;
            }

       for(int i = 0; i < aCountTemplate.length; i++) {

       	JsonObject seriesTemplate = Json.createObjectBuilder()
	       	.add("color", "#"+sColors[i%sColors.length])
	       	.add("y", aCountTemplate[i])
	       	.build();
       	seriesTemplateDataArrayBuilder.add(seriesTemplate);
       	//sbDataTemplate.append("{ color:'#").append(sColors[i%sColors.length]).append("', y:").append(aCountTemplate[i]).append("},"); 
        }

       JsonArray seriesTemplateDataArray = seriesTemplateDataArrayBuilder.build();
       
       int iHeightTemplate 	= 32 + (aCountTemplate.length * 28);


	   JsonObject dataObj = Json.createObjectBuilder()      
	       .add("data", seriesTemplateDataArray)
	       .add("name", sLabelForRouteTemplate)
	       .build();
       JsonArray seriesRouteTemplateFinal = Json.createArrayBuilder()

       .add(dataObj)
       .build();
       

       JsonObjectBuilder widgetItem5Builder =  Json.createObjectBuilder();  
       widgetItem5Builder.add("label", sLabelForRouteTemplate);
       widgetItem5Builder.add("series", seriesRouteTemplateFinal);
       widgetItem5Builder.add("name", "Template");
       widgetItem5Builder.add("type", "bar");
       widgetItem5Builder.add("height", iHeightTemplate );

       widgetItem5Builder.add("xAxisCategories", labelTemplateArrayBuilder.build() );        
       widgetItem5Builder.add("view", "expanded");
       widgetItem5Builder.add("filterable", true);
       widgetItem5Builder.add("tooltipEnabled", false);
       widgetItem5Builder.add("filterURL","../common/emxIndentedTable.jsp?editLink=true&selection=multiple&program=emxDashboardRoutes:getRoutesPending" +
       		"&table=APPRouteSummary&freezePane=Status,Name,NewWindow");
       if(seriesTemplateDataArray.size()==0){
       	widgetItem5Builder.add("view", "collapsed");
       }
       

       return widgetItem5Builder.build();
   }

   private JsonObject getRouteContentTypeData(matrix.db.Context context, java.util.List<String> lTypes, MapList mlRoutes, MapList mlTypes, 
   		String sLanguage) throws Exception{

	   String sLabelContentType = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ContentType", sLanguage);


       JsonArrayBuilder seriesContentTypeArrayBuilder = Json.createArrayBuilder();
       JsonArrayBuilder labelContentTypeArrayBuilder = Json.createArrayBuilder();

	   	for(int i = 0; i < lTypes.size(); i++) {
	   		labelContentTypeArrayBuilder.add(lTypes.get(i));
        }

	   	int[] aCountType = new int[lTypes.size()];        
        for(int i = 0; i < mlRoutes.size(); i++) {

            Map mRoute          = (Map)mlRoutes.get(i);
            String sHasObject   = (String)mRoute.get("to["+ relObjectRoute +"]");
            if(sHasObject.equalsIgnoreCase("TRUE")) {
                java.util.List<String> lPreviousTypes = new ArrayList<String>();
                    StringList slData = (StringList)mRoute.get("to["+relObjectRoute+"].from.type.kindof");

                    for(int k = 0; k < slData.size(); k++) {
                        String sData = (String)slData.get(k);
                        if(!lPreviousTypes.contains(sData)) {
                            sData = EnoviaResourceBundle.getTypeI18NString(context, sData, sLanguage);
                            aCountType[lTypes.indexOf(sData)]++;
                            lPreviousTypes.add(sData);
                        }
                    }
                    }
                }

        for(int i = 0; i < aCountType.length; i++) {
            String sFilter = "";
            for(int j = 0; j < mlTypes.size(); j++) {
                Map mType = (Map)mlTypes.get(j);
                String sTypeLabel = (String)mType.get("label");
                if(sTypeLabel.equals(lTypes.get(i))) {
                    sFilter = (String)mType.get("name");
                    break;
                }
            }


           JsonObject seriesContentType = Json.createObjectBuilder()
           .add("filter", sFilter)
           .add("color", "#"+sColors[i%sColors.length])
           .add("y", aCountType[i])
           .build();
           
           seriesContentTypeArrayBuilder.add(seriesContentType);
           //sbDataType.append("{ filter:'").append(sFilter).append("', color:'#").append(sColors[i%sColors.length]).append("', y:").append(aCountType[i]).append("},");
        }

       JsonArray seriesContentTypeArray = seriesContentTypeArrayBuilder.build();
       int iHeightContentType 	= 32 + (aCountType.length * 28);


	   JsonObject dataObj = Json.createObjectBuilder()      
	   .add("data", seriesContentTypeArray)
	   .add("name", sLabelContentType) 
	   .build();
       JsonArray seriesContentTypeFinal = Json.createArrayBuilder()

       .add(dataObj)
       .build();
       

       JsonObjectBuilder widgetItem3Builder = Json.createObjectBuilder();     
       widgetItem3Builder.add("label", sLabelContentType);
       widgetItem3Builder.add("series", seriesContentTypeFinal);
       widgetItem3Builder.add("name", "ContentType");
       widgetItem3Builder.add("type", "bar");
       widgetItem3Builder.add("height", iHeightContentType);

       widgetItem3Builder.add("xAxisCategories", labelContentTypeArrayBuilder.build());
       widgetItem3Builder.add("view", "expanded");
       widgetItem3Builder.add("filterable", true);       
       widgetItem3Builder.add("tooltipEnabled", false);
       widgetItem3Builder.add("filterURL","../common/emxIndentedTable.jsp?editLink=true&selection=multiple&program=emxDashboardRoutes:getRoutesPending" +
       		"&table=APPRouteSummary&freezePane=Status,Name,NewWindow");
       if(seriesContentTypeArray.size()==0){
       	widgetItem3Builder.add("view", "collapsed");
        }


       return widgetItem3Builder.build();
    }

   private void addPendingTaskToMap(Context context, MapList mlTasksPending, String sId, String sName, String sStatus, 
		   String sDateTarget, String sTitle, String sAction, String sFirstName, String sLastName, String sLanguage) {

        if(!sStatus.equals("Complete")) {

           if(!sDateTarget.equals("")) {
           	if(!sDateTarget.equals(" ")) {
           		try {
           			Map mPendingTask = new HashMap();
           			String sPerson = sLastName.toUpperCase() + " " + sFirstName;
           			
           			if("Approve".equals(sAction)) {
	                	sAction=EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Route_Action.Approve", sLanguage);
	                } else if("Comment".equals(sAction)) {
	                	sAction=EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Route_Action.Comment", sLanguage);	
	                } else if("Notify Only".equals(sAction)) {
	                	sAction=EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Route_Action.Notify_Only", sLanguage);	
	                }

	                mPendingTask.put("id", sId);
	                mPendingTask.put("name", sName);
	                mPendingTask.put("date", sDateTarget);
	                mPendingTask.put("title", sTitle);
	                mPendingTask.put("action", sAction);
	                mPendingTask.put("person", sPerson);
	                mPendingTask.put("status", sStatus);

	                mlTasksPending.add(mPendingTask);
           		} catch(FrameworkException e) {
           			e.printStackTrace();
           		}
           	}
          }
        }
    }

   private void addRecentTaskToMap(Context context, MapList mlTasksRecent, Calendar cRecent, String sId, String sName, String sStatus, String sDateTarget,
		   String sDateActual, String sTitle, String sAction, String sFirstName, String sLastName, String sLanguage) throws ParseException {

        if(!sDateActual.equals(" ")) {
            if(!sDateActual.equals("")) {

                Calendar cDate = Calendar.getInstance();
                cDate.setTime(sdf.parse(sDateActual));

                if(cDate.after(cRecent)) {
                	try {
                		Map mPendingTask = new HashMap();
                		String sPerson = sLastName.toUpperCase() + " " + sFirstName;
                		
                		if("Approve".equals(sAction)) {
		                	sAction=EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Route_Action.Approve", sLanguage);
		                } else if("Comment".equals(sAction)) {
		                	sAction=EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Route_Action.Comment", sLanguage);
		                } else if("Notify Only".equals(sAction)) {
		                	sAction=EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Route_Action.Notify_Only", sLanguage);		
		                }

		                mPendingTask.put("id", sId);
		                mPendingTask.put("name", sName);
		                mPendingTask.put("target", sDateTarget);
		                mPendingTask.put("actual", sDateActual);
                    	mPendingTask.put("title", sTitle);
                    	mPendingTask.put("action", sAction);
                    	mPendingTask.put("person", sPerson);
                    	mPendingTask.put("status", sStatus);

                    	mlTasksRecent.add(mPendingTask);
                	} catch(FrameworkException e) {
                		e.printStackTrace();
                	}
                }
            }
       }
   }

   public MapList retrieveRoutesPending(matrix.db.Context context, StringList busSelects, String sFilter) throws FrameworkException {
       
	   String sWhere = "(current == 'In Process') && (attribute[Route Status] == 'Started') && (to["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].from.from["+DomainConstants.RELATIONSHIP_PROJECT_TASK+"].to.name == \""+context.getUser()+"\")";
       if(!sFilter.equals("")) {
           sWhere += " && " + sFilter;
       }
       return DomainObject.findObjects(context, DomainConstants.TYPE_ROUTE, context.getVault().getName(), sWhere, busSelects);
    }
    
   public MapList retrieveRoutesPending(matrix.db.Context context, StringList busSelects, Collection routeAttrMultiValueList, 
		   String sFilter) throws FrameworkException {
       
	   String sWhere = "(current == 'In Process') && (attribute[Route Status] == 'Started') && (to["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].from.from["+DomainConstants.RELATIONSHIP_PROJECT_TASK+"].to.name == \""+context.getUser()+"\")";
	   if(!sFilter.equals("")) {
           sWhere += " && " + sFilter;
       }
       return DomainObject.findObjects(context, DomainConstants.TYPE_ROUTE, null, null, null, context.getVault().getName(), sWhere, null,
               true, busSelects,(short)0, null, null, routeAttrMultiValueList);
   }
    
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getRoutesPending(Context context, String[] args) throws FrameworkException, Exception {


        HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        String sOID             = (String) paramMap.get("objectId");
        String sFilterContent   = (String) paramMap.get("filterContentType");
        String sFilterTemplate  = (String) paramMap.get("filterTemplate");
        String sFilterPurpose   = (String) paramMap.get("filterPurpose");
        String relObjectRoute = DomainConstants.RELATIONSHIP_OBJECT_ROUTE;
        String relInitiatingRouteTemplate = DomainConstants.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE;

        StringBuilder sbWhere = new StringBuilder();
        StringList busSelects = new StringList();
        busSelects.add("id");
		busSelects.add("attribute["+DomainConstants.ATTRIBUTE_RESTRICT_MEMBERS+"]");



        if(null != sFilterContent) {
            if(sbWhere.length() > 0) { sbWhere.append(" && "); }
            busSelects.add("to["+ relObjectRoute +"]");
            busSelects.add("to["+ relObjectRoute +"].from.type.kindof");
            sbWhere.append("(to["+ relObjectRoute +"] == True)");
            sbWhere.append("&& (to["+ relObjectRoute+"].from.type.kindof == '");
            sbWhere.append(sFilterContent);
            sbWhere.append("')");
        }
        if(null != sFilterPurpose) {
            if(sbWhere.length() > 0) { sbWhere.append(" && "); }
            sbWhere.append("(attribute["+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE +"] == '").append(sFilterPurpose).append("')");
        }
        if(null != sFilterTemplate) {
            if(sbWhere.length() > 0) { sbWhere.append(" && "); }
            if(sFilterTemplate.equals("-")) {
                busSelects.add("from["+ relInitiatingRouteTemplate +"]");
                sbWhere.append("(from["+ relInitiatingRouteTemplate +"] == False)");
            } else {
                busSelects.add("from["+ relInitiatingRouteTemplate +"].to.name");
                sbWhere.append("(from["+ relInitiatingRouteTemplate +"].to.name == '");
                sbWhere.append(sFilterTemplate);
                sbWhere.append("')");
            }
        }
        return retrieveRoutesPending(context, busSelects, sbWhere.toString());
        }

    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getRouteTasksPending(Context context, String[] args) throws FrameworkException, Exception {


        MapList mlResults   = new MapList();
        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("objectId");
        String sMode        = (String) paramMap.get("mode");
        Calendar cNow       = Calendar.getInstance();
        int iYearNow        = cNow.get(Calendar.YEAR);
        int iWeekNow        = cNow.get(Calendar.WEEK_OF_YEAR);
        int iMonthNow       = cNow.get(Calendar.MONTH);
        Long lNow           = cNow.getTimeInMillis();
		final String sTypeInboxTask = PropertyUtil.getSchemaProperty("type_InboxTask");
		final String sTypeWorkflowTask = PropertyUtil.getSchemaProperty("type_WorkflowTask");
		final String sTypeTask = PropertyUtil.getSchemaProperty("type_Task");

		final String SELECT_KINDOF_TASK = "type.kindof[" + sTypeTask+ "]";
		final String SELECT_KINDOF_WORKFLOW_TASK = "type.kindof[" + sTypeWorkflowTask+ "]";
		final String SELECT_KINDOF_INBOX_TASK = "type.kindof[" + sTypeInboxTask+ "]";
		
        java.util.List<String> lIds = new ArrayList<String>();

        StringList busSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);
        busSelects.add(DomainConstants.SELECT_NAME);
        busSelects.add(DomainConstants.SELECT_CURRENT);
        busSelects.add("attribute["+ PropertyUtil.getSchemaProperty(context,DomainSymbolicConstants.SYMBOLIC_attribute_CurrentRouteNode) +"]");

        Collection routeAttrMultiValueList = new HashSet(3);
        routeAttrMultiValueList.add("to["+ relRouteTask +"].from.id");
		routeAttrMultiValueList.add("to["+ relRouteTask +"].from.owner");
        routeAttrMultiValueList.add("to["+ relRouteTask +"].from.current");
        routeAttrMultiValueList.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE + "]");
        
        busSelects.add("to["+ relRouteTask +"]");
        busSelects.add("to["+ relRouteTask +"].from.id");
		busSelects.add("to["+ relRouteTask +"].from.owner");
        busSelects.add("to["+ relRouteTask +"].from.current");
        busSelects.add("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE +"]");

        MapList mlRoutes = retrieveRoutesPending(context, busSelects, routeAttrMultiValueList, "");

        for(int i = 0; i < mlRoutes.size(); i++) {

            Map mRoute      = (Map)mlRoutes.get(i);
            StringList slId = (StringList)mRoute.get("to["+ relRouteTask +"].from.id");
			StringList slTaskOwner = (StringList)mRoute.get("to["+ relRouteTask +"].from.owner");
            StringList slStatus = (StringList)mRoute.get("to["+ relRouteTask +"].from.current");
            StringList slTarget = (StringList)mRoute.get("to["+ relRouteTask +"].from.attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE +"]");
            if(slStatus.size()>0) {
                for(int j = 0; j < slStatus.size(); j++) {
                    if(context.getUser().equals((String)slTaskOwner.get(j))) {
                		addPendingTaskByMode(lIds, sMode, iYearNow, iMonthNow, iWeekNow, lNow, (String)slId.get(j),(String) slStatus.get(j), (String)slTarget.get(j));
                	}
                }
            }
        }

        String[] aIds = new String[lIds.size()];
        for(int i = 0; i < aIds.length; i++) { 
        	aIds[i] = lIds.get(i); 
        }
        StringList slTask = new StringList();

        slTask.add(DomainConstants.SELECT_ID);
        slTask.add("attribute["+DomainConstants.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE+"]");

        slTask.add("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_INSTRUCTIONS+"]");
        slTask.add("attribute["+ DomainConstants.ATTRIBUTE_ACTUAL_COMPLETION_DATE+"]");
        slTask.add(DomainConstants.SELECT_TYPE);
        slTask.add("attribute["+ DomainConstants.ATTRIBUTE_TASK_ACTUAL_FINISH_DATE+"]");

        slTask.add("attribute["+ PropertyUtil.getSchemaProperty(context,DomainSymbolicConstants.SYMBOLIC_attribute_DueDate)+"]");
        slTask.add("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_ACTION +"]");
        slTask.add("attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE +"]");
        slTask.add("from["+ relRouteTask +"].to.id");
        slTask.add("from["+ relRouteTask +"].to.Name");
		slTask.add("from[" + relRouteTask + "].to.to[" + DomainConstants.RELATIONSHIP_ROUTE_SCOPE + "].from.id");
		slTask.add("from[" + relRouteTask + "].to.to[" + DomainConstants.RELATIONSHIP_ROUTE_SCOPE + "].from.name");
        slTask.add(DomainConstants.SELECT_DESCRIPTION);
        slTask.add(DomainConstants.SELECT_CURRENT);
		slTask.add(SELECT_KINDOF_TASK);
	    slTask.add(SELECT_KINDOF_WORKFLOW_TASK);
		slTask.add(SELECT_KINDOF_INBOX_TASK);
		
        mlResults = DomainObject.getInfo(context, aIds, slTask);

        return mlResults;
    }
    
    public void addPendingTaskByMode(java.util.List lIds, String sMode, int iYearNow, int iMonthNow, int iWeekNow, Long lNow, String sId, String sStatus, String sTarget) throws ParseException {

        if(sStatus.equals("Assigned") || sStatus.equals("Review")) {

            if(null != sTarget) { if(!sTarget.equals("")) { if(!sTarget.equals(" ")) {

                Boolean bAdd            = false;
                SimpleDateFormat sdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat());
                Calendar cTarget        = Calendar.getInstance();

                cTarget.setTime(sdf.parse(sTarget));

                int iYear   = cTarget.get(Calendar.YEAR);
                int iWeek   = cTarget.get(Calendar.WEEK_OF_YEAR);
                int iMonth  = cTarget.get(Calendar.MONTH);

                if(sMode.equals("week")) {
                    if(iYear == iYearNow) {
                        if(iWeek == iWeekNow) {
                            bAdd = true;
                        }
                    }
                } else if(sMode.equals("month")) {
                    if(iYear == iYearNow) {
                        if(iMonth == iMonthNow) {
                            bAdd = true;
                        }
                    }
                } else if(sMode.equals("overdue")) {
                    Long lTarget = cTarget.getTimeInMillis();
                    if(lTarget < lNow) { bAdd = true; }
                }

                if(bAdd) {
                    lIds.add(sId);
                }

            }}}
        }

    }


    // My Dashboard
    public JsonObject getUserDashboardData(Context context, String[] args) throws Exception {

        String[] sColors        = {"329cee","f6bd0f","8BBA00","ec0c41","752fc3","AFD8F8","fad46c","c9ff0d","F984A1","A66EDD"};
        String[] aResults       = new String[16];
        HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        String sOID             = (String)paramMap.get("objectId");
        String sLanguage        = (String)paramMap.get("languageStr");
        Integer[] iCounters     = new Integer[3];
        int iCountTimeline      = 0;
        int iCountMRU           = 0;







        JsonArrayBuilder seriesPendingTaskArrayBuilder = Json.createArrayBuilder();
        JsonArrayBuilder categoryLabelsArrayBuilder = Json.createArrayBuilder(); 
        
        categoryLabelsArrayBuilder.add(" ");
        JsonArrayBuilder timeLine1ArrayBuilder = Json.createArrayBuilder();
        JsonArrayBuilder timeLine2ArrayBuilder = Json.createArrayBuilder();
        JsonArrayBuilder timeLine3ArrayBuilder = Json.createArrayBuilder();
        
        String sLabelAssignedTasksPending = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.AssignedTasksPending", sLanguage);
    	String sLabelPast = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Past", sLanguage);
    	String sLabelNow = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Now", sLanguage);
    	String sLabelSoon = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Soon", sLanguage);
    	
        String sLabelRoute = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Type.Route",  sLanguage);
        String sLabelTitle = EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.Widget.Tasks",  sLanguage);
        String sLabelAction = EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.TaskDetails.Action",  sLanguage);
        String sLabelAssignee= EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Assignee",  sLanguage);
        String sLabelTargetDate =EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.Routes.ScheduleCompDate",  sLanguage);
    	
		String statusDueDate = EnoviaResourceBundle.getProperty(context,"Components","emxComponents.Routes.ScheduleCompDate",sLanguage);
     
        

        JsonObject tooltipObject = Json.createObjectBuilder()
	        .add("labelRoute", sLabelRoute)
	        .add("labelTitle", sLabelTitle)
	        .add("labelAction", sLabelAction)       
	        .add("labelAssignee", sLabelAssignee)
	        .add("labelTargetDate", sLabelTargetDate)
	        .build();

        for(int i = 0; i < 3; i++) { iCounters[i] = 0; }

        Calendar cNow   = Calendar.getInstance();
        int iWeekNow 	= cNow.get(Calendar.WEEK_OF_YEAR);
        int iMonthNow 	= cNow.get(Calendar.MONTH);
        int iYearNow 	= cNow.get(Calendar.YEAR);
        Calendar cFuture= Calendar.getInstance();
        cFuture.add(java.util.GregorianCalendar.DAY_OF_YEAR, 5);

        Calendar cMRU= Calendar.getInstance();
        cMRU.add(java.util.GregorianCalendar.DAY_OF_YEAR, -1);

        StringBuilder sbInfo1           = new StringBuilder();
        StringBuilder sbInfo2           = new StringBuilder();
        StringBuilder sbInfo3           = new StringBuilder();

        com.matrixone.apps.common.Person pUser = com.matrixone.apps.common.Person.getPerson( context );

        StringList busSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);
        busSelects.add(DomainConstants.SELECT_NAME);
        busSelects.add(DomainConstants.SELECT_CURRENT);
        busSelects.add(DomainConstants.SELECT_MODIFIED);
        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE +"]");
        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_ACTION +"]");
        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_TITLE +"]");
        busSelects.add("from["+ DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.id");
        busSelects.add("from["+ DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.name");
        StringBuilder sbWhere   = new StringBuilder();
        sbWhere.append("(current != 'Complete')");
        sbWhere.append(" && (from[" +  DomainConstants.RELATIONSHIP_ROUTE_TASK  + "].to.attribute[Route Status] != \"Stopped\") ");

        MapList mlInboxTasks = pUser.getRelatedObjects(context, "Project Task", "Inbox Task", busSelects, null, true, false, (short)1, sbWhere.toString(), "", 0);

        mlInboxTasks.sort("attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE +"]", "descending", "date");

        for(int i = 0; i < mlInboxTasks.size(); i++) {

            Map mInboxTask  = (Map)mlInboxTasks.get(i);
            String sDate    = (String)mInboxTask.get("attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE +"]");
            String sTitle   = (String)mInboxTask.get("attribute["+ DomainConstants.ATTRIBUTE_TITLE +"]");
            String sAction  = (String)mInboxTask.get("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_ACTION +"]");
            String sPerson =   pUser.getName();
            String sId      = (String)mInboxTask.get("from["+ DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.id");
            String sRoute   = (String)mInboxTask.get("from["+ DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.name");
            String sModified= (String)mInboxTask.get(DomainConstants.SELECT_MODIFIED);
            String status = (String)mInboxTask.get(DomainConstants.SELECT_CURRENT);

            Calendar cModified    = Calendar.getInstance();
            cModified.setTime(sdf.parse(sModified));
            if(cModified.after(cMRU)) { iCountMRU++; }

            if(UIUtil.isNullOrEmpty(sTitle)){
            	sTitle = "(" + sAction + ")"; 
            }

            if(UIUtil.isNotNullAndNotEmpty(sDate)){
            	
                    iCountTimeline++;
                    Calendar cTarget    = Calendar.getInstance();
                    cTarget.setTime(sdf.parse(sDate));

                    int iDay 	= cTarget.get(Calendar.DAY_OF_MONTH);
                    int iWeek 	= cTarget.get(Calendar.WEEK_OF_YEAR);
                    int iMonth 	= cTarget.get(Calendar.MONTH);
                    int iYear 	= cTarget.get(Calendar.YEAR);


                    categoryLabelsArrayBuilder.add(sTitle);







                    JsonObject routeDataObject = Json.createObjectBuilder()
                    .add("id", sId)
                    .add("title", sTitle)
                    .add("route", sRoute)
                    .add("person", sPerson)
                    .add("action", sAction)
                    .add("date", cTarget.getTimeInMillis())




                    .add("x", cTarget.getTimeInMillis())            
                    .add("y", iCountTimeline)
                    .add("status",statusDueDate)
                    .build();
                                   
                    if(cTarget.before(cNow)) {
                    	iCounters[0]++; 

                    	timeLine1ArrayBuilder.add(routeDataObject);
                    }else {
                        if(cTarget.before(cFuture)) {

                        	timeLine2ArrayBuilder.add(routeDataObject);
                        }else {

                        	timeLine3ArrayBuilder.add(routeDataObject);
                        }
                    }
                    if(iYear == iYearNow) {
                        if(iMonth == iMonthNow) { iCounters[1]++; }
                        if(iWeek == iWeekNow) { iCounters[2]++; }
                    }
            }

        }

        // Info Links
        String sInfoPrefix 	= " <a onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?suiteKey=Framework&table=APPTaskSummary&freezePane=Name,NewWindow&editLink=true&selection=multiple&sortColumnName=DueDate&sortDirection=ascending&program=emxDashboardRoutes:";
        sbInfo1.append("<b>").append(iCounters[0]).append("</b>").append(sInfoPrefix).append("getRouteTasksAssignedPending&mode=Overdue&header=emxFramework.String.RouteTasksOverdue\")'>").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.Overdue" , sLanguage)).append("</a>");
        sbInfo2.append("<b>").append(iCounters[1]).append("</b>").append(sInfoPrefix).append("getRouteTasksAssignedPending&mode=Month&header=emxFramework.String.RouteTasksDueThisMonth\")'>").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ThisMonth" , sLanguage)).append("</a>");
        sbInfo3.append("<b>").append(iCounters[2]).append("</b>").append(sInfoPrefix).append("getRouteTasksAssignedPending&mode=Week&header=emxFramework.String.RouteTasksDueThisWeek\")'>").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.ThisWeek" , sLanguage)).append("</a>");


        // Dashboard Counters
        StringBuilder sbCounter = new StringBuilder();
        sbCounter.append("<td onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?table=APPTaskSummary&program=emxDashboardRoutes:getRouteTasksAssignedPending&header=emxFramework.String.AssignedTasksPending&toolbar=APPTaskSummaryToolBar&freezePane=Name,NewWindow&sortColumnName=Name&sortDirection=ascending&suiteKey=Framework&selection=multiple\")' ");
        sbCounter.append(" class='counterCell ");
        if(mlInboxTasks.size() == 0){ sbCounter.append("grayBright");   }
        else                        { sbCounter.append("purple");       }
        sbCounter.append("'><span class='counterText ");
        if(mlInboxTasks.size() == 0){ sbCounter.append("grayBright");   }
        else                        { sbCounter.append("purple");       }
        sbCounter.append("'>").append(mlInboxTasks.size()).append("</span><br/>");
        sbCounter.append(EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.Common.AssignedTasks", sLanguage)).append("</td>");

        StringBuilder sbUpdates = new StringBuilder();
        if(sbCounter.length()>0){		
			sbUpdates.append("<td ");
			if(iCountMRU > 0) {
				sbUpdates.append(" onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?table=APPTaskSummary&program=emxDashboardRoutes:getRouteTasksAssignedPending&mode=MRU&header=emxFramework.String.MRURouteTasks&freezePane=Name,NewWindow&suiteKey=Framework&selection=multiple\")' ");
				sbUpdates.append(" class='mruCell'><span style='color:#000000;font-weight:bold;'>").append(iCountMRU).append("</span> <span class='counterTextMRU'>");
				if(iCountMRU == 1) { sbUpdates.append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.MostRecentUpdate"  , sLanguage)); }
				else               { sbUpdates.append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.MostRecentUpdates" , sLanguage)); }
				sbUpdates.append("</span>");
			} else {
				sbUpdates.append(" class='mruCell' >");
			}
			sbUpdates.append("</td>");
		} 

        int iHeight = 40 + (iCountTimeline*17);
        if(iHeight < 160) { iHeight = 160; }

     	JsonObject taskOverdueDataObject = Json.createObjectBuilder()



	       	.add("name", sLabelPast)
	       	.add("color", colorRed)	 
	       	.add("data", timeLine1ArrayBuilder.build())
	       	.build();
         

       	JsonObject taskNowDataObject = Json.createObjectBuilder()
	       	.add("name", sLabelNow)
	       	.add("color", colorYellow)  	 

	       	.add("data", timeLine2ArrayBuilder.build())
	       	.build();
        	 

       	JsonObject taskSoonDataObject = Json.createObjectBuilder()
	       	.add("name", sLabelSoon)
	       	.add("color", colorGreen)

	       	.add("data", timeLine3ArrayBuilder.build())
	       	.build();
        	 
       	seriesPendingTaskArrayBuilder.add(taskOverdueDataObject);
       	seriesPendingTaskArrayBuilder.add(taskNowDataObject);
       	seriesPendingTaskArrayBuilder.add(taskSoonDataObject);
        
        JsonObject taskPendingObjectLink = Json.createObjectBuilder()
	        .add("taskPendingThisWeek", sbInfo3.toString())
	      	.add("taskPendingThisMonth", sbInfo2.toString())
	      	.add("taskPendingOverDue", sbInfo1.toString())
	      	.build();
        
      	String sHasInboxTaskAssigned	= pUser.getInfo(context, "to["+ DomainConstants.RELATIONSHIP_PROJECT_TASK+"]");
      	

        JsonObject routeWidget = Json.createObjectBuilder()        
        .add("label", sLabelAssignedTasksPending)

        .add("series", seriesPendingTaskArrayBuilder.build())
        .add("name", "RouteTasks")
        .add("type", "scatter")
        .add("height", iHeight)
        .add("yMax", iCountTimeline)

        .add("yAxisCategories", categoryLabelsArrayBuilder.build())        
        .add("view", "expanded")
        .add("bottomLineData", taskPendingObjectLink)
        .add("xAxisDateValue", Calendar.getInstance().getTimeInMillis())
        .add("tooltipObject", tooltipObject)
        .add("filterable", true)
        .add("showLegend", true)       
        .add("filterURL", "../common/emxPortal.jsp?portal=APPRoutePowerView&suiteKey=Components" +
        		"&StringResourceFileId=emxComponentsStringResource&SuiteDirectory=components&emxSuiteDirectory=components")
        .add("counterLink", sbCounter.toString())
        .add("updateLink", sbUpdates.toString())
        .add("hasInboxTaskAssigned",sHasInboxTaskAssigned)
        .build();
        return routeWidget;
    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getRouteTasksAssignedPending(Context context, String[] args) throws Exception {


        Map programMap          = (Map) JPO.unpackArgs(args);
        String sMode            = (String) programMap.get("mode");
        StringBuilder sbWhere   = new StringBuilder();

        if(null == sMode) { sMode = ""; }
        com.matrixone.apps.common.Person pUser = com.matrixone.apps.common.Person.getPerson( context );

        String attrScheduledCompletionDate = DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE;
        StringList busSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);
        busSelects.add(DomainConstants.SELECT_TYPE);
        busSelects.add(DomainConstants.SELECT_CURRENT);
        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_DUEDATE_OFFSET +"]");
		busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_TITLE +"]");
        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE +"]");
        busSelects.add("from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.id");
        busSelects.add("from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.name");        
        busSelects.add("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_ACTION +"]");
        
        sbWhere.append("(current != 'Complete')");
        sbWhere.append(" && (from[" +  DomainConstants.RELATIONSHIP_ROUTE_TASK  + "].to.attribute[Route Status] != \"Stopped\") ");
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

        } else if(sMode.equals("Week")) {

            Calendar cStart = Calendar.getInstance();
            Calendar cEnd = Calendar.getInstance();

            cStart.set(Calendar.DAY_OF_WEEK, cStart.getFirstDayOfWeek());
            cEnd.set(Calendar.DAY_OF_WEEK, cEnd.getFirstDayOfWeek());
            cEnd.add(java.util.GregorianCalendar.DAY_OF_YEAR, +7);

            sbWhere.append(" && ");
            sbWhere.append("(attribute["+ attrScheduledCompletionDate +"] >= '").append(cStart.get(Calendar.MONTH) + 1).append("/").append(cStart.get(Calendar.DAY_OF_MONTH)).append("/").append(cStart.get(Calendar.YEAR)).append("')");
            sbWhere.append(" && ");
            sbWhere.append("(attribute["+ attrScheduledCompletionDate +"] < '").append(cEnd.get(Calendar.MONTH) + 1).append("/").append(cEnd.get(Calendar.DAY_OF_MONTH)).append("/").append(cEnd.get(Calendar.YEAR)).append("')");

        } else if(sMode.equals("Month")) {

            Calendar cStart = Calendar.getInstance();
            Calendar cEnd = Calendar.getInstance();

            cEnd.add(java.util.GregorianCalendar.MONTH, +1);

            sbWhere.append(" && ");
            sbWhere.append("(attribute["+ attrScheduledCompletionDate +"] >= '").append(cStart.get(Calendar.MONTH) + 1).append("/1/").append(cStart.get(Calendar.YEAR)).append("')");
            sbWhere.append(" && ");
            sbWhere.append("(attribute["+ attrScheduledCompletionDate +"] < '").append(cEnd.get(Calendar.MONTH) + 1).append("/1/").append(cEnd.get(Calendar.YEAR)).append("')");

        } else if(sMode.equals("Overdue")) {

            Calendar cal = Calendar.getInstance();
            cal.add(java.util.GregorianCalendar.DAY_OF_YEAR, -1);
            
            String sMinute = String.valueOf(cal.get(Calendar.MINUTE));
            String sSecond = String.valueOf(cal.get(Calendar.SECOND));
            String sAMPM = (cal.get(Calendar.AM_PM) == 0 ) ? "AM" : "PM";

            if(sSecond.length() == 1) { sSecond = "0" + sSecond; }
            if(sMinute.length() == 1) { sMinute = "0" + sMinute; }

			StringBuilder sbDate = new StringBuilder();            
            sbDate.append(cal.get(Calendar.MONTH) + 1).append("/").append(cal.get(Calendar.DAY_OF_MONTH)+1).append("/").append(cal.get(Calendar.YEAR));
            sbDate.append(" ").append(cal.get(Calendar.HOUR)).append(":").append(sMinute).append(":").append(sSecond).append(" ").append(sAMPM);          
            
            sbWhere.append(" && ");
            sbWhere.append("(attribute["+ attrScheduledCompletionDate +"] <= '");
            sbWhere.append(sdf.format(new java.util.Date(sbDate.toString())));
            sbWhere.append("')");

        }

        return pUser.getRelatedObjects(context, DomainConstants.RELATIONSHIP_PROJECT_TASK , DomainConstants.TYPE_INBOX_TASK, busSelects, null, true, false, (short)1, sbWhere.toString(), "", 0);

    }
}
