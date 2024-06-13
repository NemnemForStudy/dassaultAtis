/*
 **  MCADDesignTEAMDefinitionPrivateStatePromoteAction
 **
 **  Copyright Dassault Systemes, 1992-2016.
 **  All Rights Reserved.
 **  This program contains proprietary and trade secret information of Dassault Systemes and its 
 **  subsidiaries, Copyright notice is precautionary only
 **  and does not evidence any actual or intended publication of such program
 **
 **  Program to auto promote object from PRIVATE state to IN_WORK state
 */

import java.util.HashMap;
import java.util.ResourceBundle;
import com.matrixone.MCADIntegration.server.MCADServerResourceBundle;
import com.matrixone.MCADIntegration.server.beans.MCADMxUtil;
import com.matrixone.MCADIntegration.server.cache.IEFGlobalCache;
import matrix.db.BusinessObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import matrix.db.Context;

public class MCADDesignTEAMDefinitionPrivateStatePromoteAction_mxJPO {

	private String objId = null;

	public MCADDesignTEAMDefinitionPrivateStatePromoteAction_mxJPO() {
	}

	/**
	 * @param context
	 * @param args
	 *            args[0] = Business id of the object
	 * @return
	 * @throws Exception
	 */
	public int mxMain(Context context, String[] args) throws Exception {
		return 0;
	}

	/**
	 * @param context
	 * @param args
	 *            args[0] = Business id of the object
	 * @return
	 * @throws Exception
	 */
	public int autoPromote(Context context, String[] args) throws Exception {
		int result = 1;
		try {
			String objId = args[0];
			MCADMxUtil mxUtil = new MCADMxUtil(context,
					new MCADServerResourceBundle(context.getSession().getLanguage()), new IEFGlobalCache());
			String autoPromote = MqlUtil.mqlCommand(context, "list expression $1 select $2 dump",
					"VPLMAutoPromoteNextMinorRev", "value");

			if ("true".equalsIgnoreCase(autoPromote)) {
				String DESIGN_TEAM_DEF = MCADMxUtil.getActualNameForAEFData(context,"policy_DesignTEAMDefinition");
				String busPolicy = args[1];			
		
				if (DESIGN_TEAM_DEF.equals(busPolicy)) {
					ContextUtil.pushContext(context);
					mxUtil.executeMQL(context, "trigger off");
					BusinessObject obj = new BusinessObject(objId);
					
					String Args[] = new String[2];
					Args[0] = "IsDECAutoPromoteOnCreate";
					Args[1] = "true";
					mxUtil.executeMQL(context, "set env $1 $2", Args);
					
					obj.promote(context);
					
					Args[1] = "false";
					mxUtil.executeMQL(context, "set env $1 $2", Args);
					mxUtil.executeMQL(context, "trigger on");
					ContextUtil.popContext(context);
					}
			}
			result = 0;
		} catch (Exception e) {
			e.printStackTrace();
			return 1;
		}
		return result;
	}

}
