import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

import com.dassault_systemes.enovia.partmanagement.modeler.impl.PartCollaborationService;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.services.IPartCollaborationService; 
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.services.IUserFactChangeLogService;
import com.dassault_systemes.vplmintegration.sdk.VPLMIntegException;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.validator.IPartValidator;
import com.dassault_systemes.enovia.partmanagement.modeler.util.ECMUtil;
import com.dassault_systemes.enovia.partmanagement.modeler.util.PartMgtUtil;

public class enoPartCollaborationBase_mxJPO {

	public enoPartCollaborationBase_mxJPO(Context context, String[] args) throws Exception {

	}
  
  /**
   * This is the controller method for collaborate to Product create
   * This is invoked from the PartCreatePostProcess.jsp
   * @param context
   * @param args : args[0] - contains the newly created Part Id
   * @return String
   * @throws Exception
   */
  
	public void collaboratePartCreate(Context context,String[] args) throws VPLMIntegException, Exception {

			ArrayList<String> list = JPO.unpackArgs(args);
			try{
	    		IPartCollaborationService iPartCollabService = new PartCollaborationService();
				iPartCollabService.setCollaboratToDesign(true);
				iPartCollabService.performCollabOperation(context, list, IPartValidator.OPERATION_ADD);
				
			} catch(Exception e) {
				throw e;
			}
	}
	
	 /**
	   * This is the controller method for collaborate to Product clone
	   * This is invoked from emxECPartBase: postProcessForClonePart() JPO
	   * @param context
	   * @param args : args[0] - contains the newly created Part Id
	   * @return String
	   * @throws Exception
	   */
	
	public void collaboratePartCloneAndEdit(Context context,String[] args) throws VPLMIntegException, Exception {

		ArrayList<String> list = JPO.unpackArgs(args);
			try{
	    		IPartCollaborationService iPartCollabService = new PartCollaborationService();
			iPartCollabService.setCollaboratToDesign(true);
			iPartCollabService.performCollabOperation(context, list, IPartValidator.OPERATION_CLONE);

	    				// As part of clone, since the part gets updated, the collaboration of edit should happen
	    				iPartCollabService.performCollabOperation(context, list, IPartValidator.OPERATION_MODIFY);
		
			} catch(Exception e) {
				throw e;
			}
	}

		
	  /**
	   * This is the controller method for collaborate to Product create
	   * This is invoked from the PartCreatePostProcess.jsp
	   * @param context
	   * @param args : args[0] - contains the newly created Part Id
	   * @return String
	   * @throws Exception
	   */
	  
		public void collaboratePartRevise(Context context,String[] args) throws VPLMIntegException, Exception {

			if (UIUtil.isNullOrEmpty(args[0]))
			{
				throw new FrameworkException("Invalid arguments");
			}		
			String partId =args[0];
			DomainObject doPart = DomainObject.newInstance(context, partId);
			
			// Retrieve the next revision
			BusinessObject nextRevObj = doPart.getNextRevision(context);
			String  strNextRevPartId = nextRevObj.getObjectId(context);
		

			try{
				String workUnderOID = ECMUtil.getWorkUnderChange(context);
			    
				ArrayList<String> list = new ArrayList<String>();
	    		IPartCollaborationService iPartCollabService = new PartCollaborationService();
		
	    		list.add(strNextRevPartId);
				iPartCollabService.setCollaboratToDesign(true);
				iPartCollabService.performCollabOperation(context, list, IPartValidator.OPERATION_REVISE);
				if(PartMgtUtil.isNotNullAndNotEmpty(workUnderOID) && PartMgtUtil.isNullOrEmpty(ECMUtil.getWorkUnderChange(context))){
					ECMUtil.setWorkUnderChange(context, workUnderOID);
				}
			} catch(Exception e) {
					throw e;
			}
		}


/**
 * This is the controller method for collaborate when Part is Edited
 * This is invoked from the post process JPO of Edit
 * @param context
 * @param args : contains the Part Id along with other paramaters
 * @return String
 * @throws Exception
 */
@com.matrixone.apps.framework.ui.PostProcessCallable
public void collaboratePartEdit(Context context,String[] args) throws VPLMIntegException, Exception {
	
	HashMap programMap  = (HashMap) JPO.unpackArgs(args);
	Map requestMap      = (Map) programMap.get("requestMap");
	String partId     = (String)requestMap.get("objectId");
	String workUnderOID = (String) requestMap.get("WorkUnderOID");
	
	ArrayList<String> list = new ArrayList<String>();
	
	if (UIUtil.isNotNullAndNotEmpty(partId))
	{
		 list.add(partId);	 
	} else {
		partId     = (String)requestMap.get("objIds");

	if (UIUtil.isNullOrEmpty(partId))
	{
			throw new FrameworkException("Invalid object Id");
		}
		StringList sPartList = FrameworkUtil.split(partId, "~");
		for (Object oId : sPartList) 
		{
			if(oId.toString().trim().length()> 0)
						list.add(oId.toString().trim());
		}
	}
	
	if (UIUtil.isNullOrEmpty(partId))
	{
		throw new FrameworkException("Invalid object Id");
	}
	
	try {
		/* Below code is to update the user facts on the change logs - Start */
		
		if ( UIUtil.isNotNullAndNotEmpty(workUnderOID) ) {
			context.getCEStamp(); // without this code stamping the ChangeLog will not work if Work under change is selected. this line should be before settign the work under change.
		
			ECMUtil.setWorkUnderChange(context, workUnderOID);
			
			IUserFactChangeLogService iUserFactChangeLogService = IUserFactChangeLogService.getService();
			iUserFactChangeLogService.updateObjectUserFact(context, new StringList(partId), IUserFactChangeLogService.USER_EVENT_OBJECT_MODIFY);
		}
		/* Below code is to update the user facts on the change logs - End */
		
		IPartCollaborationService iPartCollabService = new PartCollaborationService();
		iPartCollabService.setCollaboratToDesign(true);
		iPartCollabService.performCollabOperation(context, list, IPartValidator.OPERATION_MODIFY);
		
	}
	catch(Exception e) {
		throw e;
	}

	}

}
