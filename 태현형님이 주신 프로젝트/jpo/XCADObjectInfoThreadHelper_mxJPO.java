
/**
 * XCADObjectInfoThreadHelper
 *
 *  Copyright Dassault Systemes, 1992-2017.
 *  All Rights Reserved.
 *  This program contains proprietary and trade secret information of Dassault Systemes and its 
 *  subsidiaries, Copyright notice is precautionary only
 *  and does not evidence any actual or intended publication of such program
 *
 * $Archive: $
 * $Revision: 1$
 * $Author: DAL2
 */

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.ArrayList;

import matrix.db.BusinessObject;
import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;


public class XCADObjectInfoThreadHelper_mxJPO 
{
	private int MAX_NO_OF_THREADS = 2; //By Default the number of threads kept here is 2. Can be modified in future
	public XCADObjectInfoThreadHelper_mxJPO(Context context, String[] args) throws Exception
	{
	}

	public BusinessObjectWithSelectList mxMain(Context context,String[] args) throws Exception
	{
		try 
		{
			Hashtable argsTable	= (Hashtable)JPO.unpackArgs(args);
			ArrayList listOfStrArrays = (ArrayList<String[]>) argsTable.get("listOfStrArrays");
			StringList selectables = (StringList) argsTable.get("selectables");
			MAX_NO_OF_THREADS = (Integer) argsTable.get("threadCount");
			System.out.println("Number of threads fetched from ief.properties file--\""+MAX_NO_OF_THREADS+"\"");
			//Standard way to create thread using executor
			ExecutorService executor = Executors.newFixedThreadPool(MAX_NO_OF_THREADS);
			ArrayList<Future> results = new ArrayList<Future>();
			
			//Divide the task of calling DB into manageable chunks using threads
			for(Object curStrArray : listOfStrArrays)
			{
				//Clone the context so that same user is calling the DB //TODO need to get clarification that cloned context is getting destroyed 
				Context ctxCloned = context.getFrameContext(matrix.util.UUID.getNewUUIDHEXString());
				
				XCADDesignOperationThread xCadBOThread = new XCADDesignOperationThread(ctxCloned,(String[])curStrArray,selectables);
				System.out.println("**** Context User   : " + context.getUser());
				System.out.println("**** CtxCloned User : " + ctxCloned.getUser());
				
				//Execute/run the thread process
				Future<HashMap> result = executor.submit(xCadBOThread);
				if(result!=null)
				{
					results.add(result);
				}
			}

			executor.shutdown();
			//Run the process until all the threads are terminated
			while (!executor.isTerminated()) 
			{
			}

			//Resultlist contains all the busSelect objects so collect all the objects in one variable.
			BusinessObjectWithSelectList bowslInfo = new BusinessObjectWithSelectList();
			for (int i = 0; i < results.size(); i++) 
			{
				Future<HashMap> future = results.get(i);
				HashMap result = future.get();
				BusinessObjectWithSelectList curBowslInfo = (BusinessObjectWithSelectList) result.get("BOWSLInfo");
				if(curBowslInfo != null)
				{
					bowslInfo.addAll(curBowslInfo);
				}
			}

			/*for (int i = 0; i < bowslInfo.size(); i++) 
			 * {
					BusinessObjectWithSelect busObjectWithSelect = (BusinessObjectWithSelect) bowslInfo.elementAt(i);
					Vector keys = busObjectWithSelect.getSelectKeys();
					for(Object selectable : keys){
						System.out.println(selectable+": "+busObjectWithSelect.getSelectData((String)selectable));
					}
				}
				*/
			return bowslInfo;
		} 
		finally 
		{
			//ContextUtil.popContext(context);
		}

	}

	//Thread class
	class XCADDesignOperationThread implements Callable<HashMap> 
	{
		private Context 	_Context 			= null; 
		private String[] 	_ObjIDStrArray 		= null;
		private StringList 	_BusSelectsStrList 	= null; 

		// Constructor 
		public XCADDesignOperationThread(Context context, String[] oidList, StringList busSelectionList) 
		{	
			this._Context = context;	
			this._ObjIDStrArray = oidList;
			this._BusSelectsStrList = busSelectionList;
		}

		public void setObjectList(String[] oidList) 
		{
			_ObjIDStrArray = oidList;
		}

		public void setBusSelectsList(StringList busSelectionList) 
		{
			_BusSelectsStrList = busSelectionList;
		}

		//Threads actual task to call the DB.
		public HashMap call() throws Exception
		{
			HashMap hmInfo = new HashMap();
			try 
			{
				long l1 = System.currentTimeMillis();
				System.out.println("In thread...."+l1);
				BusinessObjectWithSelectList bowslInfo = BusinessObject.getSelectBusinessObjectData(_Context, _ObjIDStrArray, _BusSelectsStrList);
				hmInfo.put("BOWSLInfo", bowslInfo);
				long l2 = System.currentTimeMillis();
				System.out.println("In thread time...."+(l2-l1));
			}
			finally
			{
				this._Context.close();
			}
			return hmInfo;
		}
	}
}

