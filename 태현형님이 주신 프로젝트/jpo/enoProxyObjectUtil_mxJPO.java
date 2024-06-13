/*
 *  enoProxyObjectUtil
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */
import matrix.db.Context;
import matrix.util.StringList;

import com.matrixone.apps.domain.util.TransactionTriggerUtil;
import com.matrixone.apps.framework.ui.UINavigatorUtil;

import java.util.Map;
import java.lang.reflect.Method;


public class enoProxyObjectUtil_mxJPO  
{



/**
 * 
 * @param context
 * @param args
 * @throws Exception
 */
    public enoProxyObjectUtil_mxJPO (Context context, String[] args)
        throws Exception
    {
      //super(context, args);
    }



/**
 * This API will extract the OIDs from ${TRANSHISTORY} into a StringList, and pass it to ProxyObject.checkForOrphanProxy().
 * 
 * @param context
 * @param args
 * @throws Exception
 */
  public int deleteOrphanProxy(matrix.db.Context context, String[] args) throws Exception
  {
	    		  
		int result = 0;
		try {
			Map parseHistoryMap = TransactionTriggerUtil.parseHistory(context, args[0]);
			StringList objectIdList = new StringList();
			for(Object key: parseHistoryMap.keySet()){
				String keyStr = (String)key;
				if(((String)parseHistoryMap.get(keyStr)).startsWith("disconnect")){
					String[] strArray = keyStr.split("_");
					objectIdList.add(strArray[0]);
				}
			}
			
			if(objectIdList.size() != 0 ){

				//invoking the method through reflection, to avoid Prerequisite cyclic dependency with 6W framework
				Method method = Class.forName("com.dassault_systemes.enovia.e6wproxy.ProxyObject").getMethod( "checkForOrphanProxy", Context.class, StringList.class);
				method.invoke(null, context, objectIdList);
			}

		} catch (Exception ex) {
            ex.printStackTrace();
            //throw ex;
		}

		return result;

  }
  
  /**
   * This API will check whether any OSLC provider is configured or not 
   * 
   * @param context
   * @param args
   * @throws Exception
   */
    public static boolean isOslcConfigured(matrix.db.Context context, String[] args) throws Exception
    {

    	return UINavigatorUtil.isOslcConfigured(context);
    }
  
}

