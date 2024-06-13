import java.util.List;
import java.util.Map;

import com.matrixone.apps.change.util.ECMUtil;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

import matrix.db.JPO;
import matrix.db.Context;
import matrix.util.StringList;

public class emxECMDocumentBase_mxJPO {
	
	/**
	 * Private method checks if an object promotion/revision can be continued
	 * @param context
	 * @param docId is Document id
	 * @param requestedChange
	 * @param requiredCAState specifies which state the CA should be
	 * @return boolean
	 * @throws Exception
	 */


	private boolean canContinueWithChangeControl(Context context, String docId, String requestedChange, String requiredCAState) throws Exception {
		
		boolean canContinueWithChangeControl = false;
		String changeActionCancelledPolicy = PropertyUtil.getSchemaProperty(context, "policy_Cancelled");
		String changeActionCancelledState = PropertyUtil.getSchemaProperty(context, "policy", changeActionCancelledPolicy, "state_Cancelled");
		if(ECMUtil.isChangeControlEnabled(context, docId)) {
			List<Map<String, String>> mlCA = ECMUtil.getAllConnectedCA(context, docId, true, true);
			
			if(mlCA != null && !mlCA.isEmpty()) {
				for (Map<String, String> map : mlCA) {
					String strCAState = map.get(DomainRelationship.SELECT_CURRENT);
					String strCAID = map.get(DomainObject.SELECT_ID);
					String strCARelWithDoc = map.get(DomainConstants.SELECT_RELATIONSHIP_TYPE);
					
					String strReqChange = "";
					if(PropertyUtil.getSchemaProperty(context, "relationship_ProposedActivities").equals(strCARelWithDoc)) {
						strReqChange = ECMUtil.getRequestedChange(context, docId, strCAID, ECMUtil.ChangeType.PROPOSED);
					} else if(PropertyUtil.getSchemaProperty(context, "relationship_RealizedActivities").equals(strCARelWithDoc)) {
						strReqChange = ECMUtil.getRequestedChange(context, docId, strCAID, ECMUtil.ChangeType.REALIZED);
					}
					
					if((UIUtil.isNotNullAndNotEmpty(strReqChange) && strReqChange.equals(requestedChange) && requiredCAState.equals(strCAState))||changeActionCancelledState.equals(strCAState)) {
						canContinueWithChangeControl = true;
						break;
					}
				}
			}
		} else {
			canContinueWithChangeControl = true;
		}
		
		return canContinueWithChangeControl;
	}
	
	/**
	 * Trigger Method to check if Change Control is enabled on Document or if any CA connected to document is completed.
	 * @param context
	 * @param args[0] is Document id and args[1] is key for alert message
	 * @return 1 - if Change Control is enabled on Document (or) if Document is connected to any CA, which is not completed
	 * @return 0 - if Change Control is not enabled on Document and if Document is connected to CA, which is completed (or) Document is not connected to any CA
	 * @throws Exception
	 */
	public int checkIfChangeControlOrConnectedChangeActionCompleted(Context context, String[] args) throws Exception {
		int retVal = 0;
		boolean errorMsgRequired = false;
		String changeActionCancelledPolicy = PropertyUtil.getSchemaProperty(context, "policy_Cancelled");
		String changeActionCancelledState = PropertyUtil.getSchemaProperty(context, "policy", changeActionCancelledPolicy, "state_Cancelled");
		String changeActionPolicy = PropertyUtil.getSchemaProperty(context, "policy_ChangeAction");
		String changeActionPolicyCompleteState = PropertyUtil.getSchemaProperty(context, "policy", changeActionPolicy, "state_Complete");
		
		List<Map<String, String>> mlCA = ECMUtil.getAllConnectedCA(context, args[0], true, true);
	     	 if(ECMUtil.isChangeControlEnabled(context, args[0])){
		    if(mlCA != null && !mlCA.isEmpty()) {
			for (Map<String, String> map : mlCA) {
			    String strCAState = map.get(DomainRelationship.SELECT_CURRENT);
			    if (!(changeActionPolicyCompleteState.equals(strCAState)||changeActionCancelledState.equals(strCAState))) {
			      	 errorMsgRequired = true;
				 break;
				}
			  }
		  }
		  else
			errorMsgRequired = true;
		} else {
		if(mlCA != null && !mlCA.isEmpty()) {
				for (Map<String, String> map : mlCA) {
					String strCAState = map.get(DomainRelationship.SELECT_CURRENT);
			if (!(changeActionPolicyCompleteState.equals(strCAState)||changeActionCancelledState.equals(strCAState))) {
						errorMsgRequired = true;
						break;
					}
				}
			}
		}
		
		if(errorMsgRequired) {
			String errorMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), args[1]);
			emxContextUtilBase_mxJPO.mqlNotice(context, errorMessage);
			retVal = 1;
		}
		
		return retVal;
	}

	
	/**
	 * Trigger Method to check if Change Control is enabled on Document or if any CA connected to Document for Obsolescence is completed.
	 * @param context
	 * @param args[0] is Document id and args[1] is key for alert message
	 * @return 1 - if Change Control is enabled on Document (or) if Document is connected to any CA for obsolescence, which is not completed
	 * @return 0 - if Change Control is not enabled on Document and if Document is not connected to any CA (or) if Document is connected to CA for obsolescence, which is completed
	 * @throws Exception
	 */
	public int checkIfChangeControlOrConnectedChangeActionForObsolescenceCompleted(Context context, String[] args) throws Exception {
		int retVal = 0;
		boolean errorMsgRequired = false;
		String changeActionCancelledPolicy = PropertyUtil.getSchemaProperty(context, "policy_Cancelled");
		String changeActionCancelledState = PropertyUtil.getSchemaProperty(context, "policy", changeActionCancelledPolicy, "state_Cancelled");
		String changeActionPolicy = PropertyUtil.getSchemaProperty(context, "policy_ChangeAction");
		String changeActionPolicyCompleteState = PropertyUtil.getSchemaProperty(context, "policy", changeActionPolicy, "state_Complete");
		
		if(!canContinueWithChangeControl(context, args[0], ECMUtil.STR_FOR_OBSOLESCENCE, changeActionPolicyCompleteState)) {
			errorMsgRequired = true;
		} else {
			List<Map<String, String>> mlCA = ECMUtil.getAllConnectedCA(context, args[0], true, true);
			
			if(mlCA != null) {
				for (Map<String, String> map : mlCA) {
					String strCAState = map.get(DomainRelationship.SELECT_CURRENT);
					String strCAID = (String) map.get(DomainObject.SELECT_ID);
					
					String strReqChange = ECMUtil.getRequestedChange(context, args[0], strCAID, ECMUtil.ChangeType.PROPOSED);
					
					if (UIUtil.isNotNullAndNotEmpty(strReqChange) && ECMUtil.STR_FOR_OBSOLESCENCE.equals(strReqChange) && !(changeActionPolicyCompleteState.equals(strCAState)||changeActionCancelledState.equals(strCAState))) {
						errorMsgRequired = true;
						break;
					}
				}
			}
		}
		
		if(errorMsgRequired) {
			String errorMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), args[1]);
			emxContextUtilBase_mxJPO.mqlNotice(context, errorMessage);
			retVal = 1;
		}
		
		return retVal;
	}
	
	/**
	 * Trigger Method to check if Change Control is enabled on Document or if any CA connected to Document for Revise is completed.
	 * @param context
	 * @param args[0] is Document id and args[1] is key for alert message
	 * @return 1 - if Change Control is enabled on Document (or) if Document is connected to any CA, which is not for Revise and not completed
	 * @return 0 - if Change Control is not enabled on Document and if Document is not connected to any CA (or) if Document is connected to CA, which is not for Revise and completed
	 * @throws Exception
	 */
	public int checkIfChangeControlOrChangeInProcessForRevise(Context context, String[] args) throws Exception {
		int retVal = 0;
		
		String sEcmReviseCheckExpValue = MqlUtil.mqlCommand(context, "list expression $1 select $2 dump", true, "EnableReviseChangeControlCheck", "value");
		
		if(UIUtil.isNullOrEmpty(sEcmReviseCheckExpValue) || "true".equalsIgnoreCase(sEcmReviseCheckExpValue)) {
			boolean errorMsgRequired = false;
			String changeActionCancelledPolicy = PropertyUtil.getSchemaProperty(context, "policy_Cancelled");
			String changeActionCancelledState = PropertyUtil.getSchemaProperty(context, "policy", changeActionCancelledPolicy, "state_Cancelled");
			
			String changeActionPolicy = PropertyUtil.getSchemaProperty(context, "policy_ChangeAction");
			String changeActionPolicyInWorkState = PropertyUtil.getSchemaProperty(context, "policy", changeActionPolicy, "state_InWork");
			String changeActionPolicyCompleteState = PropertyUtil.getSchemaProperty(context, "policy", changeActionPolicy, "state_Complete");
			
			if(!canContinueWithChangeControl(context, args[0], ECMUtil.STR_FOR_REVISE, changeActionPolicyInWorkState)) {
				errorMsgRequired = true;
			} else {
				List<Map<String, String>> mlCA = ECMUtil.getAllConnectedCA(context, args[0], true, true);
				
				if(mlCA != null) {
					for (Map<String, String> map : mlCA) {
						String strCAState = map.get(DomainRelationship.SELECT_CURRENT);
						String strCAID = map.get(DomainObject.SELECT_ID);
						
						String strReqChange = ECMUtil.getRequestedChange(context, args[0], strCAID, ECMUtil.ChangeType.PROPOSED);
						if(!changeActionCancelledState.equals(strCAState)){
						if(UIUtil.isNotNullAndNotEmpty(strReqChange) &&
								((strReqChange.equals(ECMUtil.STR_FOR_REVISE) && !changeActionPolicyInWorkState.equals(strCAState)) || (!strReqChange.equals(ECMUtil.STR_FOR_REVISE) && !changeActionPolicyCompleteState.equals(strCAState)))) {
							errorMsgRequired = true;
							break;
						}
					}
				}
			}
			}
			
			if(errorMsgRequired) {
				String errorMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), args[1]);
				emxContextUtilBase_mxJPO.mqlNotice(context, errorMessage);
				retVal = 1;
			}
		}
		
		return retVal;
	}
	
	/**
	 * Method to check if Document can be deleted wrt. ECM
	 * @param context
	 * @param args[0] is Document id and args[1] is key for alert message
	 * @return 1 - if Document is enabled with Change Control or if connected to any CA 
	 * @return 0 - if Document is not connected to any CA.
	 * @throws Exception
	 */

	public int checkIfDocumentCanBeDeletedOrDemoted(Context context, String[] args) throws Exception {
		
		if(ECMUtil.isChangeControlEnabled(context, args[0])) {
			String errorMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), args[1]);
			emxContextUtilBase_mxJPO.mqlNotice(context, errorMessage);
			return 1;
		}
			try{
				int rel=JPO.invoke(context, "UnifiedChangeActionECMTriggers_mxJPO", null, "isObjectImpactedByAnyChange", args);
				return rel;
			}catch(Exception e){
				return 0;
			}
	}
	
	/**
	 * Method to check if Revise commands can be shown wrt. ECM
	 * @param context
	 * @param args[] will contain objectID of Document
	 * @return false - if Document is enabled with Change Control or if connected to any CA, which is not completed
	 * @return true - if Document is enabled with Change Control or if connected to any completed CA or if Document is not connected to any CA
	 * @throws Exception
	 */
	public boolean showReviseCommands(Context context, String[] args) throws Exception {
		boolean showReviseCommands = true;
		String changeActionCancelledPolicy = PropertyUtil.getSchemaProperty(context, "policy_Cancelled");
		String changeActionCancelledState = PropertyUtil.getSchemaProperty(context, "policy", changeActionCancelledPolicy, "state_Cancelled");
		
		String changeActionPolicy = PropertyUtil.getSchemaProperty(context, "policy_ChangeAction");
		String changeActionPolicyCompleteState = PropertyUtil.getSchemaProperty(context, "policy", changeActionPolicy, "state_Complete");
		
		Map programMap = (Map) JPO.unpackArgs(args);
		String strDocId = (String) programMap.get("objectId");
		
		if(ECMUtil.isChangeControlEnabled(context, strDocId)) {
			showReviseCommands = false;
		} else {
			List<Map<String, String>> mlCA = ECMUtil.getAllConnectedCA(context, strDocId, true, true);
			
			for (Map<String, String> map : mlCA) {
				String strCAState = map.get(DomainRelationship.SELECT_CURRENT);
				
				if (!(changeActionPolicyCompleteState.equals(strCAState)||changeActionCancelledState.equals(strCAState))) {
					showReviseCommands = false;
				}
			}
		}
		
		showReviseCommands=showReviseCommands&&canReviseDocument(context,strDocId);
		return showReviseCommands;
	}

	private boolean canReviseDocument(Context context,String strDocId) throws Exception{
		boolean canReviseDoucment=false;
		try{
			StringList slSelect=new StringList();
			slSelect.add(DomainObject.SELECT_ID);
			slSelect.add(DomainObject.SELECT_NAME);
			slSelect.add(DomainObject.SELECT_REVISION);
			slSelect.add(DomainObject.SELECT_TYPE);
			slSelect.add(DomainObject.SELECT_OWNER);
			slSelect.add(DomainObject.SELECT_PROJECT);

			Map mpDocInfo=DomainObject.newInstance(context,strDocId).getInfo(context, slSelect);
			String strDocOwner=(String)mpDocInfo.get(DomainConstants.SELECT_OWNER);
			String strDocProject=(String)mpDocInfo.get(DomainConstants.SELECT_PROJECT);

			List<Map> mlAccess=	DomainAccess.getAccessSummaryList(context, strDocId,true);
			List<String> slProjects=PersonUtil.getProjects(context,context.getUser(),PersonUtil.getActiveOrganization(context));
			String strLoginUser=context.getUser();
			if(!strLoginUser.equals(strDocOwner)&&(!slProjects.contains(strDocProject))){
				for(Map map:mlAccess){
					if(UIUtil.isNullOrEmpty((String)map.get("inheritedId"))){
						if(!UIUtil.isNullOrEmpty((String)map.get("username"))){
							String strUserName=(String)map.get("username");
							if(strUserName.equals(strLoginUser))
								canReviseDoucment=true;

						}else{
							String strProjectName=(String)map.get("project");
							if(slProjects.contains(strProjectName))
								canReviseDoucment=true;

}

					}
				}

			}else
				canReviseDoucment=true;


		}catch(Exception e){
			throw new Exception(e.getLocalizedMessage());
		}
		return canReviseDoucment;
	}

}


