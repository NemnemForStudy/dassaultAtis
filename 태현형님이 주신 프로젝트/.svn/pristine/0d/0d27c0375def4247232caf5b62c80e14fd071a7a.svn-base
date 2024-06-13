/*
 ** ${CLASSNAME}
 **
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 */

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;

import javax.json.JsonArray;
import javax.json.JsonObject;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

import com.dassault_systemes.enovia.partmanagement.modeler.notification.UPSEBOMCollaborationNotification;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.Job;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.vplmintegrationitf.util.VPLMIntegCollaborationReporter;
import com.matrixone.vplmintegrationitf.util.VPLMxIntegrationPublicUtilities;

/**
 * The <code>emxUPSCollaboration</code> class contains implementation code for UPS collaboration.
 *
 * 
 */
public class emxUPSCollaboration_mxJPO 
{

    private String _bgJobId = null;
    private Job _bgjobInstance ;
	
    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds no arguments.
     * @throws Exception if the operation fails.
     * 
     */
	
    public emxUPSCollaboration_mxJPO (Context context, String[] args)
        throws Exception
    {
    	Map objectMap = (Map) JPO.unpackArgs(args);
    	_bgJobId = (String) objectMap.get("Job ID");
    	_bgjobInstance = Job.getInstance(context, _bgJobId);
    }

    /**
     * This method executes UPS collaboration as part of background job.  
     * 
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds String array as arguments
     * @return Boolean.
     * @throws Exception if the operation fails.
     *
     */

	public void execute(Context context,String[] args) throws Exception
    {
    	
		_bgjobInstance.setProgressPercent(0);
		
		System.out.println("emxUPSCollaboration:execute Invoked!!!");
		System.out.println(args);
		
		Hashtable <String, String> messageTable=new Hashtable<>();
		
		/* to capture the bg job status */
		
		String jobStatus = "Succeeded";
    	Hashtable<String, Comparable> argTable = new Hashtable();
    	
    	/* to store reference name for display in notification*/
    	String strPrdNames="";
    	
    	String strMessage="";
    	String collabStatus="success";

    	/* level info is always stored as the last element of the array*/
		String syncDepth =args[args.length-1];
		
		/* retrieve the id for collaboration and also for retrieving the reference name */
		
		StringList idList=new StringList();
		String[] objectIds=new String[args.length-1];
		
		
		/* iterate to get retrieve all the products to be collaborated and for display in notification*/
		for(int i=0;i<args.length-1;i++) {
			idList.add(args[i]);
			objectIds[i]=args[i];
			System.out.println("objectIds " +(i+1)+" - "+args[i]);
		}
		
		System.out.println("Sync Depth " +syncDepth);
		
		/* fetch the reference title for all selected references*/
		String attrVPLMVName = "attribute["+PropertyUtil.getSchemaProperty(context,"attribute_PLMEntity.V_Name")+"]";
		StringList objectSelects=new StringList();
		objectSelects.add(attrVPLMVName);

		MapList prdNameMapList=DomainObject.getInfo(context, objectIds, objectSelects); 
		Iterator prdNameItr=prdNameMapList.iterator();
		
		String strSeparator="";
		while(prdNameItr.hasNext()) {
			strPrdNames=strPrdNames+strSeparator+(String)((Map)prdNameItr.next()).get(attrVPLMVName);
			strSeparator=", ";
		}
		
		System.out.println("strPrdNames " +strPrdNames);
		
		/* call to collaboration service .st */
		
		argTable.put("IDLIST", idList);
		argTable.put("SYNC_DEPTH", syncDepth);
		argTable.put("DETAILED_REPORT", "true");
	    argTable.put("SYNC_AND_TRANSFER", "no");
	    	
		String[] arguments  = JPO.packArgs(argTable);
		Hashtable <String, Hashtable> results = null;
	    try {

	   	/* invocation of collaboration API */	
		System.out.println("Point1");
		results = (Hashtable)JPO.invoke(context, "VPLMIntegBOMVPLMSynchronize", null, "synchronizeFromVPMToMatrix", arguments, Hashtable.class);
		System.out.println("Hashtable resultmap = "+results);

		System.out.println("Point2");
		/* call to collaboration service .en */
		Map collabReport=results.get(VPLMIntegCollaborationReporter.CONSOLIDATED_REPORT); 

		//Without using json transform API - start
		/*
		ArrayList<String> errorReport=(ArrayList<String>)collabReport.get(VPLMIntegCollaborationReporter.ERROR_MESSAGES);
		
		if(!errorReport.isEmpty()) {
			collabStatus="failure";
			String strCommaSeparator="";
			StringBuilder sb = new StringBuilder();
			for (String strTemp : errorReport) {
				sb.append(strCommaSeparator);
				sb.append(strTemp);
				strCommaSeparator = ", ";
			}
			strMessage=sb.toString();
		} else {	
			ArrayList<String> shortReport=(ArrayList<String>)collabReport.get("SHORT_REPORT");
			System.out.println("shortReport= "+shortReport.toString());
			
			if(!shortReport.isEmpty()) {
				String strCommaSeparator="";
				StringBuilder sb = new StringBuilder();
				for (String strTemp : shortReport) {
					sb.append(strCommaSeparator);
					sb.append(strTemp);
					strCommaSeparator = ", ";
				}
				strMessage=sb.toString();
			}
		}*/
		//Without using json transform API - end

		//Using json transform API - start
		
		JsonObject collabReportJson=VPLMxIntegrationPublicUtilities.transformCollaborationReportToJSON(context, new Hashtable(collabReport));
		System.out.println("collabReportJson= "+collabReportJson);
		
		JsonArray erroreportJson=(JsonArray)collabReportJson.getJsonArray(VPLMIntegCollaborationReporter.ERROR_MESSAGES);

		if(erroreportJson.size()>0) {
			collabStatus="failure";
			String strCommaSeparator="";
			StringBuilder sb = new StringBuilder();
			for (int i=0; i < erroreportJson.size(); i++) {
				sb.append(strCommaSeparator);
				sb.append(erroreportJson.getJsonString(i));
				strCommaSeparator=", ";
			}
			strMessage=sb.toString();
		} else {	
			JsonArray shortReportJson=(JsonArray)collabReportJson.getJsonArray(VPLMIntegCollaborationReporter.SHORT_REPORT);
			System.out.println("shortReportJson= "+shortReportJson);
			System.out.println(shortReportJson.size());
			
			if(shortReportJson.size()>0) {
				String strCommaSeparator="";
				StringBuilder sb = new StringBuilder();
				for (int i=0; i < shortReportJson.size(); i++) {
					sb.append(strCommaSeparator);
					sb.append(shortReportJson.getJsonString(i));
					strCommaSeparator=", ";
				}
				strMessage=sb.toString();
				strMessage=strMessage.replaceAll("\"", "");
			}
		}	
		//Using json transform API - end
		
		System.out.println(strMessage);
	
		messageTable.put("SHORT_REPORT", strMessage);
	
		System.out.println("messageTable [Short Report] :"+messageTable.toString());		
		
	    	} catch (Exception e) {
	    		System.out.println("e message" + e.toString());
	    		System.out.println("strMessage: " + strMessage);
				
				collabStatus="failure";

	    		if(UIUtil.isNullOrEmpty(strMessage))
	    			strMessage = e.toString();

	    		System.out.println("strMessage: " + strMessage);

	    		jobStatus = "Failed";
	    		_bgjobInstance.setErrorMessage("** ABORTED **");
	    		messageTable.put("SHORT_REPORT", strMessage);
				System.out.println("Message Table in catch: "+messageTable.toString());

		}	
			finally {
				
				/* retrieve the users to whome the msg needs to be sent */
				System.out.println("context.getUser():"+context.getUser());
				StringList users = new StringList();
				users.add(context.getUser());
				
				/* update bg jobs*/
				_bgjobInstance.setProgressPercent(100);
				System.out.println("JOB Status :"+jobStatus);
				_bgjobInstance.finish(context, jobStatus);
				
				/* store the product list and collaboration status for notification */	
				messageTable.put("VPMREFERENCE_LIST", strPrdNames);
				messageTable.put("COLLABORATION_STATUS", collabStatus);
        
				System.out.println("Message Table in finally: "+messageTable.toString());
				
				/* Call notification API to send notification*/
				UPSEBOMCollaborationNotification.sendNotification(context, users, messageTable);
    }
	}

}


