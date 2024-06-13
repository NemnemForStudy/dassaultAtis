/*
 * ${CLASSNAME}.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */

import java.util.HashMap;
import java.util.Map;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.program.ProgramCentralUtil;
import matrix.db.AccessConstants;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.User;
import matrix.util.MatrixException;
import matrix.util.StringList;



public class emxProjectManagementDeferredBase_mxJPO
{
    public emxProjectManagementDeferredBase_mxJPO(Context context, String[] args) throws Exception {
        // TODO Auto-generated constructor stub
    }


	public void removeNewRevision(Context context, String[] args) throws MatrixException
	{
		String fromObjectId = args[0];
		String toObjectId = args[1];
		String relId = args[2];
		String parentEvent = args[3];
System.out.println("****Test****emxProjectManagementDeferredBase : removeNewRevision** relId :"+relId);
		// Only consider if the parent event is a revise, not clone
		//
		if (parentEvent.equals("revise")) {
			String folderType = "";
			String strCurrentState = "";

            StringList slBusSelects = new StringList(2);
            slBusSelects.add(DomainConstants.SELECT_TYPE);
            slBusSelects.add(DomainConstants.SELECT_CURRENT);
          
            Map folderInfo = new HashMap();
            try{
            	ProgramCentralUtil.pushUserContext(context);
            	DomainObject domFolder = DomainObject.newInstance(context,fromObjectId);
            	folderInfo = domFolder.getInfo(context, slBusSelects);
            }catch(Exception e){
            }finally {
            	ProgramCentralUtil.popUserContext(context);
            }

			folderType = (String)folderInfo.get(DomainConstants.SELECT_TYPE);
			strCurrentState = (String)folderInfo.get(DomainConstants.SELECT_CURRENT);

			// Only undo the replicate if this is a controlled folder and it is not
			// in the frozen state (Release or Superceded)
			if ((folderType.equals(DomainConstants.TYPE_CONTROLLED_FOLDER)) && (!strCurrentState.equals(DomainConstants.STATE_CONTROLLED_FOLDER_CREATE))) {
				// push context to user agent to avoid access issues
				// turn triggers off since we don't want disconnect triggers to fire for this connection
				// turn history off to avoid history records containing user agent and to avoid seeing disconnects for this rel
				// disconnect the newly created connection (undo the replicate)
				//
	        boolean isRelIdExists = false;
                 String strCmd1 = "print bus $1 select $2 dump $3";
				String strExistingConnIds = MqlUtil.mqlCommand(context, strCmd1, fromObjectId,"from[" + DomainConstants.RELATIONSHIP_VAULTED_OBJECTS_REV2 + "].id", "|");
                
                if(ProgramCentralUtil.isNotNullString(strExistingConnIds)){
					StringList slExistingConnIds = FrameworkUtil.split(strExistingConnIds, "|");
                    if (slExistingConnIds.contains(relId)) {
                      isRelIdExists = true;
                     }
                }
System.out.println("****Test***emxProjectManagementDeferredBase:remove**isRelIdExists : "+isRelIdExists);
		//If new relId exist then delete it for -IR-762089
				if (isRelIdExists) {
				try {
					ContextUtil.pushContext(context);
System.out.println("****Test***emxProjectManagementDeferredBase:remove**Before delete command execution");
					MqlUtil.mqlCommand(context, "trigger off", true); //PRG:RG6:R213:Mql Injection:Static Mql:18-Oct-2011
					MqlUtil.mqlCommand(context,"history off;", true); //PRG:RG6:R213:Mql Injection:Static Mql:18-Oct-2011
					//PRG:RG6:R213:Mql Injection:parameterized Mql:18-Oct-2011:start
					String sCommandStatement = "delete connection $1";
					String sPlaceHolder =  MqlUtil.mqlCommand(context, sCommandStatement,relId); 
System.out.println("****Test***emxProjectManagementDeferredBase:remove**After delete command execution");
					//PRG:RG6:R213:Mql Injection:parameterized Mql:18-Oct-2011:End
        		} catch (Exception exp) {
            		exp.printStackTrace();
            		throw new MatrixException(exp);
				}
        		finally {
            		ContextUtil.popContext(context);
					MqlUtil.mqlCommand(context, "trigger on", true); //PRG:RG6:R213:Mql Injection:Static Mql:17-Oct-2011
					MqlUtil.mqlCommand(context, "history on", true); //PRG:RG6:R213:Mql Injection:Static Mql:17-Oct-2011
        		}}
			}
		}
	}
}
