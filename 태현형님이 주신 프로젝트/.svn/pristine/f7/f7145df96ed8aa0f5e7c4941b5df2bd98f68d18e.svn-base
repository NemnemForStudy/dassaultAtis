/** ${CLASSNAME}

   Copyright (c) 1999-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program
   @since Program Central R210
   @author NR2
*/

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.MailUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;

/**
 * The <code>emxProjectHoldAndCancel</code> class represents the JPO to process Project
 * Hold and Cancel states.
 * 
 * @version PRG R210 - Copyright (c) 2010, MatrixOne, Inc.
 * @since Program Central R210
 * @author NR2
 */
public class emxProjectHoldAndCancel_mxJPO extends emxProjectHoldAndCancelBase_mxJPO
{
    /**
     * Constructs 
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the id
     * @throws Exception if the operation fails
     * @since PRG V6R2011x
	 * @author NR2
     */
    public emxProjectHoldAndCancel_mxJPO (Context context, String[] args) throws Exception
    {
        // Call the super constructor
        super(context,args);
    }
    
    //Modified by thok on 2023.05.17 --- [S]
    /**
     * This method is called to Cancel the Project.
     * will be called from the Project Property page Commands
     * @param context The Matrix Context object
     * @param args, contains gate id of the Gate in context.
     * @return boolean indicating SUCCESS or FAILURE
     * @throws MatrixException if operation fails
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList projectCancel(Context context,String[] args)throws MatrixException {
    	StringList returnVal = new StringList(); //Will contain all the projectIds on which selected operations could not be performed
    	String projectId = args[0];
    	String command = "Cancel";
        try{
        	notifyMailForResourceRequest(context,projectId,command);
        	returnVal.add(projectId);
        }
        catch(Exception e){
            throw new MatrixException(e);
        }
        return returnVal;
    }
    
    /**
     * This method used to send Icon mail to resource pool approver.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds the following input arguments:
     *            projectId,projectState,
     *
     * @return void -
     * @throws MatrixException
     *             if operation fails
     * @since Added by vf2 for release version V6R2012.
     *
     */
    private void notifyMailForResourceRequest(Context context, String projectId, String projectState) throws MatrixException {
        if(ProgramCentralUtil.isNotNullString(projectId) && ProgramCentralUtil.isNotNullString(projectState)) {
            int requestCount = 0;
            try {
                DomainObject domObjProject = newInstance(context, projectId);
                String strRelationshipType = RELATIONSHIP_RESOURCE_PLAN;
                String strType = TYPE_RESOURCE_REQUEST;
                StringList busSelect = new StringList();
                busSelect.add(SELECT_ID);
                busSelect.add(SELECT_TYPE);
                busSelect.add(SELECT_NAME);
                busSelect.add(SELECT_CURRENT);
                String whereClause = "("+SELECT_CURRENT+"=="+STATE_RESOURCE_REQUEST_REQUESTED+")";
                MapList mlRequests = domObjProject.getRelatedObjects(context,
                        strRelationshipType, //pattern to match relationships
                        strType, //pattern to match types
                        busSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                        null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                        false, //get To relationships
                        true, //get From relationships
                        (short)1, //the number of levels to expand, 0 equals expand all.
                        whereClause, //where clause to apply to objects, can be empty ""
                        EMPTY_STRING,0); //where clause to apply to relationship, can be empty ""
                        requestCount = mlRequests.size();
                if(requestCount > 0) {
                    Map map = new HashMap();
                    for(int i=0; i < requestCount; i++) {
                        Map resourceRequestMap = (Map) mlRequests.get(i);
                        String strResourceRequest = (String)resourceRequestMap.get(SELECT_ID);
                        String strRequestName = (String)resourceRequestMap.get(SELECT_NAME);
                        if(ProgramCentralUtil.isNotNullString(strResourceRequest)) {
                            StringList resourceMgrList = getResourceManagerForRequest(context, strResourceRequest);
                            for(int j=0;j<resourceMgrList.size();j++) {
                                StringList slTempName = (StringList)map.get(resourceMgrList.get(j));
                                if(null == slTempName || slTempName.size()==0) {
                                    map.put(resourceMgrList.get(j), new StringList(strRequestName));
                                } else if(!slTempName.contains(strRequestName)) {
                                    slTempName.add(strRequestName);
                                    map.put(resourceMgrList.get(j), slTempName);
                                }
                            }
                        }
                    }
                    for(int s=0;s<map.size();s++){
                        sendIconMail(context,projectId,projectState,map);
                    }
                }
            } catch(Exception e) {
                throw new MatrixException(e);
            }
        }
    }
    /**
     * This method used to get approver list for Resource Request which are in
     * submitted state.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds the following input arguments: strResourceReq
     *
     * @return StringList - containing the list of approver.
     * @throws MatrixException
     *             if operation fails
     * @since Added by vf2 for release version V6R2012.
     *
     */
    private StringList getResourceManagerForRequest(Context context,String strResourceReq)throws MatrixException {
        StringList resourceManagerList = new StringList();
        DomainObject domRequest = newInstance(context, strResourceReq);
        StringBuffer sbRelationshipType = new StringBuffer(50);
        sbRelationshipType.append(RELATIONSHIP_RESOURCE_POOL);
        sbRelationshipType.append(",");
        sbRelationshipType.append(RELATIONSHIP_RESOURCE_MANAGER);
        StringBuffer sbType = new StringBuffer(50);
        sbType.append(TYPE_ORGANIZATION);
        sbType.append(",");
        sbType.append(TYPE_PERSON);
        StringList busSelect = new StringList();
        busSelect.add(SELECT_ID);
        busSelect.add(SELECT_TYPE);
        busSelect.add(SELECT_NAME);
        busSelect.add(SELECT_LEVEL);
        MapList orgList = domRequest.getRelatedObjects(context,
                sbRelationshipType.toString(), //pattern to match relationships
                sbType.toString(), //pattern to match types
                busSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                true, //get To relationships
                true, //get From relationships
                (short)2, //the number of levels to expand, 0 equals expand all.
                null, //where clause to apply to objects, can be empty ""
                EMPTY_STRING,
                0); //where clause to apply to relationship, can be empty ""
        if(null != orgList) {
            for(int k=0;k<orgList.size();k++) {
                Map orgMap = (Map)orgList.get(k);
                if("2".equals(orgMap.get(SELECT_LEVEL).toString())) {
                    resourceManagerList.add(orgMap.get(SELECT_ID).toString());
                }
            }
        }
        return resourceManagerList;
    }

    /**
     * This method used to send iconmail to approver.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds the following input arguments:
     *            projectId,projectState,
     *            Map  - Containing details of approver
     * @return void -
     * @throws MatrixException
     *             if operation fails
     * @since Added by vf2 for release version V6R2012.
     *
     */
    private void sendIconMail(Context context, String projectId,String projectState,Map map) throws Exception {
        String projectName = "";
        String projectPolicy = ProgramCentralConstants.POLICY_PROJECT_SPACE;
        if(ProgramCentralUtil.isNotNullString(projectId)) {
            DomainObject domObjProject = newInstance(context, projectId);
            projectName = domObjProject.getInfo(context, SELECT_NAME);
            projectPolicy = domObjProject.getInfo(context, SELECT_POLICY);
        }
        String strMgr = null;
        StringList slRequestName = new StringList();
        String sMailSubject = "";

        // IR-448083
        String i18ProjectState = EnoviaResourceBundle.getStateI18NString(context, projectPolicy, projectState, context.getLocale().getLanguage());
        String strMgrName = null;
        for(Iterator itr = map.keySet().iterator();itr.hasNext();){
            strMgr = (String)itr.next();
            slRequestName = (StringList)map.get(strMgr);
            int size = slRequestName.size();
            StringBuffer sbRequestNames = new StringBuffer(60);
            for(int k=0;k<size;k++){
                sbRequestNames.append(slRequestName.get(k));
                if(size-1 > k)
                    sbRequestNames.append(",");
            }
            StringList mailToList = new StringList(1);
            StringList mailCcList = new StringList(1);
            if(ProgramCentralUtil.isNotNullString(strMgr)) {
                DomainObject domObjMgr = newInstance(context, strMgr);
                strMgrName = domObjMgr.getInfo(context, SELECT_NAME);
                mailToList.add(strMgrName);

                if(ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_HOLD.equals(projectState))
                    sMailSubject = "emxProgramCentral.ProjectPolicyChange.ResourceRequest.SubjectForHold";
                else if(ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_CANCEL.equals(projectState))
                    sMailSubject = "emxProgramCentral.ProjectStateChange.ResourceRequest.SubjectForCancel";
                else
                    sMailSubject = "emxProgramCentral.ProjectPolicyChange.ResourceRequest.SubjectForResume";
                String companyName = null;
                sMailSubject  = emxProgramCentralUtilClass.getMessage(
                        context, sMailSubject, null, null, companyName);

                //get the mail message
                String sMailMessage = "";
                sMailMessage = "emxProgramCentral.ProjectStateChange.ResourceRequest.Message";
                String mKey[] = {"RequestName", "ProjectName","State"};

                // IR-447723
                // String mValue[] = {sbRequestNames.toString(), projectName,projectState};
                String mValue[] = {sbRequestNames.toString(), projectName, i18ProjectState};
                sMailMessage  = emxProgramCentralUtilClass.getMessage(
                        context, sMailMessage, mKey, mValue, companyName);
                String rpeUserName = PropertyUtil.getGlobalRPEValue(context,ContextUtil.MX_LOGGED_IN_USER_NAME);
                MailUtil.setAgentName(context, rpeUserName);
                MailUtil.sendMessage(context, mailToList, mailCcList, null,
                        sMailSubject, sMailMessage , null);
                strMgrName = null;
            }
        }
    }
    //Modified by thok on 2023.05.17 --- [E]
}
