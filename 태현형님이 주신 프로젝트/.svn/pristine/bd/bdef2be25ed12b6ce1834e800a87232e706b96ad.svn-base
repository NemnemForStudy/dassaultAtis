/*
 *  Copyright (c) 1992-2020 Dassault Systemes.
 *  All Rights Reserved.
 */

import matrix.db.Context;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import matrix.db.MQLCommand;

/**
 * The <code>emxDomainObjectBase</code> class implements the DomainObject bean.
 */
public class emxDomainObjectBase_mxJPO extends DomainObject {

    private static final long serialVersionUID = -8595122082676574726L;

	/**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        args[0] - id of the business object
     * @throws Exception if the operation fails
     * @since AEF 9.5.1.1
     */
    public emxDomainObjectBase_mxJPO(Context context, String[] args) throws Exception {
   		super();
    	if(args != null && args.length > 0) {
    		setId(args[0]);
    	}
  	}

    /**
     * This method is used to check if atleast one object is connected through specific relationship, with the expand Limit to 1.
	 *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        args[0] - id of the business object
     *        args[1] - side of expand (from/to)
     *        args[2] - relationship name
     *        
     * @return String true - if the one object is connected.
     *				  false - if not even a single object is connected.
     *
     * @throws Exception if the operation fails
     * @since AEF BX3-HFx
     */
    public String hasRelationship(Context context, String args[]) throws Exception {
    	 boolean fromSide = false;
    	 boolean toSide = false;
    	//objectid to traverse in arg[0]
    	 String objectId = args[0];
    	//is from/to side to traverse in arg[1]
    	//rel to traverse in arg[2]
    	String relName = args[2];
    	
    	MQLCommand mql = new MQLCommand();
    	String strMqlCmd = "expand bus $1 $2 relationship $3 terse limit 1";
    	mql.executeCommand(context, strMqlCmd,objectId,args[1],relName);
    	if (mql.getError().length() != 0)
    		throw new Exception(mql.getError().trim());
    	if ((mql.getResult().trim()).length() > 0)
    		return "true";
    	return "false";
    }

	/**
	 * This method is used to update the objects updatestamp on the configured triggered event.
	 * 
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        args[0] - id of the business object
     * @throws Exception if the operation fails
     * @since 3DEXPERIENCER2015x(R417)
     * @author GUDLAVALLETI Sreenivasa [WGI]
	 */
	public static void setUpdatestamp(Context context, String[] args) throws Exception {
		try
		{
			String objectId = args[0];
			String UUID = matrix.util.UUID.getNewUUIDHEXString();
			DomainObject obj = DomainObject.newInstance(context, objectId);
			obj.setUpdateStamp(context, UUID);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
    }
	
	/**
	 * This method is use to set attribute Originator to Revise Object.
	 * @param context 
	 * @param args holds the following input parameters,
	 *        args[0] - Id Of New Object
	 *        args[1] - Type Of New Object
	 *        args[2] - Name Of New Object
	 *        args[3] - Revision Of New Object
	 *        args[4] - Login User
	 * @throws Exception
	 * @since  R2015x(R417)
	 */
	public static void setOriginator(Context context, String[] args) throws Exception
	{
		try
		{
			String strNewObjectId    = args[0];
			String strNewObjectType  = args[1];
			String strNewObjectName  = args[2];
			String strNewObjectRev   = args[3];
			String strUser           = args[4];
			if(UIUtil.isNullOrEmpty(strUser)){
				strUser = context.getUser();	
			}
			    
			String mqlCommand   = "";
			if(UIUtil.isNotNullAndNotEmpty(strNewObjectId))
			{
				mqlCommand = "modify bus $1 $2 $3";
				MqlUtil.mqlCommand(context, mqlCommand, true, strNewObjectId, DomainConstants.ATTRIBUTE_ORIGINATOR,strUser);	
			}
			else
			{
				mqlCommand = "modify bus $1 $2 $3 $4 $5";
				MqlUtil.mqlCommand(context, mqlCommand, true, strNewObjectType, strNewObjectName, strNewObjectRev, DomainConstants.ATTRIBUTE_ORIGINATOR, strUser);	
			}
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			throw ex;
		}
	}
}
