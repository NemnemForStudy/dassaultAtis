/*
 **  IEFReviseMajorTrigger
 **
 **  Copyright Dassault Systemes, 1992-2007.
 **  All Rights Reserved.
 **  This program contains proprietary and trade secret information of Dassault Systemes and its 
 **  subsidiaries, Copyright notice is precautionary only
 **  and does not evidence any actual or intended publication of such program
 **
 **  Program to use as trigger on Revise event of Major Objects
 */
import matrix.db.Context;
import matrix.db.MatrixWriter;

import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.MCADIntegration.server.MCADServerException;
import com.matrixone.MCADIntegration.server.MCADServerSettings;
import com.matrixone.MCADIntegration.server.beans.MCADMxUtil;
import com.matrixone.MCADIntegration.server.beans.MCADReviseHelper;
import com.matrixone.MCADIntegration.server.cache.IEFGlobalCache;

public class IEFReviseMajorTrigger_mxJPO
{
	private boolean isCheckinEx = false;
	private boolean isCheckin   = false;
	private boolean isPromote 	= false;
	private boolean isReviseAPI	= true;
	private MCADReviseHelper reviseHelper = null;
	private MatrixWriter _mxWriter = null;

	private MCADMxUtil util	= null;

	/**
	 * The no-argument constructor.
	 */
	public  IEFReviseMajorTrigger_mxJPO()
	{
	}

	/**
	 * Constructor which accepts the Matrix context and an array of String
	 * arguments.
	 */
	public  IEFReviseMajorTrigger_mxJPO(Context context, String[] args) throws Exception
	{
		_mxWriter = new MatrixWriter(context);
		util 	  = new MCADMxUtil(context, null, new IEFGlobalCache());
		reviseHelper = new MCADReviseHelper(context);
		isCheckin   = getRPEforOperation(context, util, MCADServerSettings.IEF_CHECKIN).equalsIgnoreCase("true");
		isCheckinEx = getRPEforOperation(context, util, MCADServerSettings.IEF_CHECKINEX).equalsIgnoreCase("true");
		isPromote	= getRPEforOperation(context, util, "Finalize").equalsIgnoreCase("true");
		isReviseAPI	= getRPEforOperation(context, util, MCADServerSettings.RPE_DEC_REVISE_OPERATION).equalsIgnoreCase("true");

	}

	public int mxMain(Context context, String []args)  throws Exception
	{
		return 0;
	}

	private String getRPEforOperation(Context context, MCADMxUtil mxUtil,  String operationName)
	{

		String Args[] = new String[2];
		Args[0] = "global";
		Args[1] = operationName;
		String sResult = mxUtil.executeMQL(context, "get env $1 $2", Args);
		String result	= "";
		if(sResult.startsWith("true"))
		{
			result = sResult.substring(sResult.indexOf("|")+1, sResult.length());
		}

		return result;
	}

	public int reviseObjectAndCreateRealtionship(Context context, String []args) throws Exception
	{
		int ret = 0;
		
		if(isCheckin || isCheckinEx || isPromote || isReviseAPI)
			return 0;
		else
		{
			try
			{
				//MCADReviseHelper reviseHelper = new MCADReviseHelper(context);
			ret = reviseHelper.postReviseProcess(context, args);
			/*IR-870769- setting the RPE variable */
			PropertyUtil.setGlobalRPEValue(context, MCADServerSettings.RPE_DEC_VAULTEDOBJECT_REVISE, "true");
			}
			catch (Exception me)
			{
				_mxWriter.write("[IEFReviseMajorTrigger] Error occurred:" + me.getMessage());
				MCADServerException.createException(me.getMessage(), me);
			}
		}
		return ret;
	}
	/*FUN116767:: added new method to connect new revision with folder : called from triggerProgram:DECFloatBookmarkContentOnRevise */
	public int floatBookmarkContentOnRevise(Context context, String []args)throws Exception{
		int ret = 0;
		try
		{
			//MCADReviseHelper reviseHelper = new MCADReviseHelper(context);
			ret = reviseHelper.connectNewRevisionWithFolder(context, args);
		}
		catch (Exception me)
		{
			_mxWriter.write("[IEFReviseMajorTrigger] Error occurred:" + me.getMessage());
			MCADServerException.createException(me.getMessage(), me);
		}
		return ret;
		
	}
	
}
