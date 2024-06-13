/*
 * emxLibraryCentralClassificationUsageBase.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 */
 
 /**
 * @version PMC R207 - Copyright (c) 2002, MatrixOne, Inc.
 */
 
import java.util.HashMap;

import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.library.LibraryCentralConstants;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.Relationship;
import matrix.util.MatrixException;
 
public class emxLibraryCentralClassificationUsageBase_mxJPO
{
	public emxLibraryCentralClassificationUsageBase_mxJPO(Context context, String[] args)
        throws Exception
    {
        //EMPTY CONSTRUCTOR
    }
	
	/**
      * This method is executed if a specific method is not specified.
      *
      * @param context the eMatrix <code>Context</code> object
      * @param args the Java <code>String[]</code> object
      * @return int
      * @throws Exception if the operation fails
      */
     public int mxMain (Context context, String[] args) throws Exception
     {
         if (true)
         {
             throw new Exception (
                     "Must specify method on emxWorkspaceVault invocation");
         }
         return 0;
     }
	 
	 /* This method disconnects the new revision of classified item if a revise or clone was done to it.
	 * This basically undoes the replicate that was done automatically via the revision rule on the relationship.
	 * @param context The ematrix context of the request.
	 * @param args This string array contains following arguments:
	 *          0 - From object type 
	 *          1 - The object id of relationship 
	 *			2 - The parent event (i.e. revise or clone)
     *          3 - From object id
	 *
	 * @throws MatrixException
	 */
    public int manageClassificationUsage(Context context, String[] args) throws MatrixException
    {
    	String fromType;
		String relId;
	    String parentEvent;
        String fromID;		
        
		if (context.getCustomData("ODT_ENV").equals("true")) {
			HashMap programMap = null;
			try {
				programMap = (HashMap) JPO.unpackArgs(args);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			String[] childIds = (String[]) programMap.get("args");
			System.out.println("printing childs Ids" + childIds[1]);
			fromType = childIds[0];
			relId = childIds[1];
			parentEvent = childIds[2];
			fromID = childIds[3];

		} else {
			fromType = args[0];
			relId = args[1];
			parentEvent = args[2];
			fromID = args[3];
		}

	    // Only consider if the parent event is a revise, not clone
	    if ( ("revise".equalsIgnoreCase(parentEvent) || "clone".equalsIgnoreCase(parentEvent) ) && !relId.isEmpty() && 
				!fromID.isEmpty() && LibraryCentralConstants.TYPE_GENERAL_CLASS.equals(fromType) ) {
			boolean isRemoved = false;
			try{
				DomainObject classObj = new DomainObject(fromID);
                String sUsage = classObj.getInfo(context, "attribute[" + LibraryCentralConstants.ATTRIBUTE_ClassificationUsage + "]" );
				
				if( null != sUsage && LibraryCentralConstants.ATTRIBUTEVALUE_ClassificationUsage_StandardClassification.equals(sUsage) ) {
					ContextUtil.pushContext(context); //code with super user
					MqlUtil.mqlCommand(context,"history off"); 
					isRemoved = true;
					Relationship rel = new Relationship( relId );
				    rel.remove( context );					
				}
			}catch(Exception exp){
				exp.printStackTrace();
				throw new MatrixException(exp);
			}finally {
				if( isRemoved ) {
					MqlUtil.mqlCommand(context, "history on");
					ContextUtil.popContext(context);
				}
			}
	    }
		return 0;
    }
}

