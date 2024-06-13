package com.dec.util;

import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.program.ProgramCentralConstants;

import matrix.db.Context;

public class DecCommonUtil {

    /**
     * jhlee Add 07-21 decemxProgramCentralUtil.jsp에서 CWP,IWP 생성에 필요한 정보 가져오는 기능 (jsp 한계용량 때문에 여기에 작성)
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public static String getCreateTaskURL(Context context, String sOID, String sPSOID, String parentId, String rowId, String portalCommandName) throws Exception {
    	String sURL = "";
    	try {
			DomainObject doParent = DomainObject.newInstance(context, sOID);
			DomainObject doPS = DomainObject.newInstance(context, sPSOID);
			doParent.open(context);
			String objType = doParent.getTypeName();
			if(!objType.equals(DecConstants.TYPE_DECCWPTASK)) {
				if(!PersonUtil.hasAssignment(context, "decSystemAdmin")){
					String currentUserId = PersonUtil.getPersonObjectID(context);
					String hasAccessEpxr = MqlUtil.mqlCommand(context, "print connection bus $1 to $2 relationship $3 select $4 dump"
							, sPSOID
							, currentUserId
							, DecConstants.RELATIONSHIP_MEMBER
							, "evaluate[" + DecConstants.SELECT_ATTRIBUTE_DECPROJECTMEMBERROLE + " matchlist \"PIM,AWP\" \",\"]");
					if(!Boolean.valueOf(hasAccessEpxr)) {
						return EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL, "ProgramCentral.Alert.IsNotHaveRole", context.getSession().getLanguage());
					}
				}
			}
			String objName = doParent.getName();
			String objParentName = doParent.getInfo(context, "to[" + DecConstants.RELATIONSHIP_SUBTASK + "].from.name");
			String objWBSType = doParent.getAttributeValue(context, DecConstants.ATTRIBUTE_DECWBSTYPE);
			String cwpActivityType = doParent.getAttributeValue(context, DecConstants.ATTRIBUTE_DECCWPACTIVITYTYPE);
			String cwpSequentialNo = doParent.getAttributeValue(context, DecConstants.ATTRIBUTE_DECSEQUENTIALNO);
			String sIWPYN = doPS.getAttributeValue(context, DecConstants.ATTRIBUTE_DECIWP_YN);
			sURL = "../common/emxCreate.jsp?typeChooser=false&type=Task&nameField=keyin&form=PMCProjectTaskCreateForm&mode=create&addTask=addTaskBelow&createJPO=emxTask:createNewTask&showApply=true&suiteKey=ProgramCentral&HelpMarker=emxhelpwbsadddialog&StringResourceFileId=emxProgramCentralStringResource&SuiteDirectory=programcentral&submitAction=doNothing&postProcessURL=../programcentral/emxProgramCentralUtil.jsp?mode=addSubTaskBelow&preProcessJavaScript=preProcessTaskCreateForm&objectId="+sOID+"&parentId="+parentId+"&rowId="+rowId+"&portalCmdName="+portalCommandName+"&PolicyName=policy_ProjectTask&showPageURLIcon=false&objId=" + sPSOID + "&objName=" + objName + "&objWBSType=" + objWBSType + "&cwpActivityType=" + cwpActivityType + "&objParentName=" + objParentName + "&cwpSequentialNo=" + cwpSequentialNo + "&IWPYN=" + sIWPYN;

    	} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    	return sURL;
    }
    public static String getNameColumnTreeLinkURL(Context context, String sObjectId) throws FrameworkException {
    	if(DecStringUtil.isNotEmpty(sObjectId)) {
        	DomainObject doObj = DomainObject.newInstance(context);
        	doObj.openObject(context);
        	return getColumnTreeLinkURL(context, doObj.getName(), sObjectId);
    	}else {
    		return DecConstants.EMPTY_STRING;
    	}
    }
    
    public static String getColumnTreeLinkURL(Context context, String sDisplay, String sObjectId) {
    	StringBuilder sbLink = new StringBuilder();
    	sbLink.append("<a href=\"../common/emxNavigator.jsp?isPopup=false&amp;objectId=").append(sObjectId).append("\" target=\"_blank\">").append(sDisplay).append("</a>");
    	return sbLink.toString();
    }
}
