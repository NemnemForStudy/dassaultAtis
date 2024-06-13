/*
**  emxDocument
**
**  Copyright (c) 1992-2020 Dassault Systemes.
**  All Rights Reserved.
**  This program contains proprietary and trade secret information of MatrixOne,
**  Inc. Copyright notice is precautionary only
**  and does not evidence any actual or intended publication of such program
**
*/

import matrix.db.Context;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.MqlUtil;

/**
 * The <code>emxDocument</code> class contains methods for document.
 *
 * @version AEF 10.0.1.0 - Copyright (c) 2003, MatrixOne, Inc.
 */

public class emxDocument_mxJPO extends emxDocumentBase_mxJPO
{
    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *     0 - String that holds the document object id.
     * @throws Exception if the operation fails
     * @since EC 10.0.0.0
     */

    public emxDocument_mxJPO (Context context, String[] args)
        throws Exception
    {
        super(context, args);
    }

	public String isMapping(Context context, String[] args) throws Exception{
		try {
			String objectId = args[0];
			DomainObject doObj = DomainObject.newInstance(context, objectId);
			String type = doObj.getInfo(context, DomainConstants.SELECT_TYPE);
			String selectExpr = null;
			switch (type) {
				case "Document" :
					selectExpr = "to[Reference Document|from.type == VPMReference]";
					break;
				case "Drawing" :
					selectExpr = "to[VPMRepInstance|from.type == VPMReference]";
					break;
				default :
					break;
			}
			System.out.println("type : " + type);
			String result = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, selectExpr);
			System.out.println("result : " + result);
			return result;
			
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
