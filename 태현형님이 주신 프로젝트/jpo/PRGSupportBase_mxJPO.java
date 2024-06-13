/*
 *  ${CLASSNAME}.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 * 
 * @quickreview 16:07:19 ODW TSK2879119: ENOVIA_GOV_MSF_2017x_FD01 Support Of Collaborative Tasks In MSF
 *
 */
			
import java.text.ParseException;
			
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
			
import matrix.db.Context;
import matrix.util.MatrixException;
			
public class PRGSupportBase_mxJPO extends emxDomainObject_mxJPO {

    public PRGSupportBase_mxJPO (Context context, String[] args) throws Exception {
      super(context, args);
                }

    public MapList getTaskRelatedInfo(Context context, String[] argumentStringArray) throws FrameworkException, ParseException {

		MapList outputMapList = new MapList();
		return outputMapList;
		}
			
	public MapList getTaskRelatedInfoAfterDate(Context context,String[] argumentStringArray) throws Exception {
		
		MapList taskInfoMapList = new MapList();
		return taskInfoMapList;
                 }
			
    public static String updateTaskPercentComplete(Context context, String[] argumentStringArray) throws MatrixException {
   		return "succes";
		}
}
