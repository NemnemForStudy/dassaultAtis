import java.io.FileOutputStream;
import java.io.PrintStream;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

import matrix.db.BusinessObjectWithSelect;
import matrix.db.Context;
import matrix.db.Query;
import matrix.db.QueryIterator;
import matrix.util.StringList;
import matrix.db.BusinessObject;

public class emxVersionPolicyDataMigration_mxJPO {
	
	private String MIGRATION_LOG_FILE;
    private FileOutputStream foLogFileInfo;
    private PrintStream psLogWriter;
    private String vault;
    private String documentDirectory = "";
    private String tenant = "";
	
  
    public void mxMain(Context ctx, String args[]) throws Exception {
    	
    	if(!ctx.isConnected())
        {
            throw new Exception(ComponentsUtil.i18nStringNow("emxComponents.Generic.NotSupportedOnDesktopClient", ctx.getLocale().getLanguage()));
        }
    			   migrate(ctx,args);
            	   migrateReadShowAccesToVersionObject(ctx);
                   getPolicyVersionDocumentObjectSize(ctx);
                  System.out.println("execute count Version objects ok");    
    }

	 protected void migrate(Context context,String args[])
    throws Exception
    {
    	 //open file for error logging
         try
        {
        	 if (args.length >= 2 )
             {
        		 documentDirectory = args[0];
        		 tenant=args[1];
             }
             // documentDirectory does not ends with "/" add it
             String fileSeparator = java.io.File.separator;
             if(UIUtil.isNotNullAndNotEmpty(documentDirectory) && !documentDirectory.endsWith(fileSeparator))
             {
                 documentDirectory = documentDirectory + fileSeparator;
             }
             
             if(UIUtil.isNotNullAndNotEmpty(documentDirectory))
            	 MIGRATION_LOG_FILE = new java.io.File(documentDirectory+"VersionMigration"+tenant+".log").getAbsolutePath();
             else
            	 MIGRATION_LOG_FILE =  java.io.File.createTempFile(documentDirectory+"VersionMigration", ".log").getAbsolutePath();

             
            foLogFileInfo = new FileOutputStream(MIGRATION_LOG_FILE,false);
            psLogWriter = new PrintStream(foLogFileInfo);
           // vault="eService Sample,eService Administration,eService Production,vplm";
            vault="*";
        }
        catch(Exception e)
        {
            Exception ex=new Exception("Unable to create log file");
            throw ex;
        }
       

     
         
    }
	protected void migrateReadShowAccesToVersionObject(Context context) throws Exception
	{
		try
		{
			System.out.println("Please Refer "+ MIGRATION_LOG_FILE);

			long startTime = System.currentTimeMillis();

			String strRelationshipName=PropertyUtil.getSchemaProperty(context, DomainObject.SYMBOLIC_relationship_LatestVersion);
			String strPolicyVersion=PropertyUtil.getSchemaProperty(context, DomainObject.SYMBOLIC_policy_Version);

			//For read only transaction value set to false
			ContextUtil.startTransaction(context,false);

			String command = "print policy $1 select $2 dump";
			String versiontype=MqlUtil.mqlCommand(context, command,strPolicyVersion,"type");

			Query typeQuery = new Query();
			typeQuery.setBusinessObjectType(versiontype);
			typeQuery.setBusinessObjectName(DomainConstants.QUERY_WILDCARD);
			typeQuery.setBusinessObjectRevision(DomainConstants.QUERY_WILDCARD);
			typeQuery.setVaultPattern(vault);
			typeQuery.setWhereExpression("policy=='"+strPolicyVersion+"'");
			StringList busSelects = new StringList();
			busSelects.add(DomainObject.SELECT_ID);
			busSelects.add(DomainObject.SELECT_TYPE);
			busSelects.add("last.to["+strRelationshipName+"].from.id");

			QueryIterator queryTypeIterator = typeQuery.getIterator(context, busSelects, (short)1000);
			Map<String,String> objectMap=new HashMap<String,String>();
			while(queryTypeIterator.hasNext())
			{

				BusinessObjectWithSelect busWithSelect = queryTypeIterator.next();
				String fromId     = busWithSelect.getSelectData("last.to["+strRelationshipName+"].from.id");
				String toId = busWithSelect.getSelectData(DomainObject.SELECT_ID);
				if(UIUtil.isNotNullAndNotEmpty(fromId) && UIUtil.isNotNullAndNotEmpty(toId))
				objectMap.put(toId,fromId);
			}
			queryTypeIterator.close();

			ContextUtil.commitTransaction(context);

			long endTime   = System.currentTimeMillis();
			NumberFormat formatter = new DecimalFormat("#0.00000");

			String strPrintTime="Query time for Policy 'Version' is " + formatter.format((endTime - startTime) / 1000d) + " seconds";
			migrationInfoWriter(strPrintTime);
			migrationInfoWriter("              ----------------------                  ");

			int objectSize=0;

			startTime = System.currentTimeMillis();
			boolean contextPushed=false;
			try 
			{
				ContextUtil.startTransaction(context,true);
				ContextUtil.pushContext(context, PropertyUtil.getSchemaProperty(context, "person_UserAgent"),DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING);
				contextPushed = true;

				//MqlUtil.mqlCommand(context, "history off", true, true);
				for(Iterator itr=objectMap.keySet().iterator();itr.hasNext();)
				{
	
					objectSize++;
					String toId = (String) itr.next();
					String fromId     = objectMap.get(toId);
	
   	                if(UIUtil.isNotNullAndNotEmpty(fromId) && UIUtil.isNotNullAndNotEmpty(toId)) {

					    BusinessObject toIdBusObj   = new BusinessObject(toId);
					    BusinessObject fromIdBusObj = new BusinessObject(fromId);
					
					    if(toIdBusObj.exists(context) && fromIdBusObj.exists(context)) {

							migrationInfoWriter(fromId+ "|" + toId);
							command = "modify bus $1 add access  bus $2 as $3,$4 ";
							MqlUtil.mqlCommand(context, command,toId,fromId,"read","show");
					    } else {
							migrationInfoWriter("Skipping " + toId + " due to invalid data");
					    }
					}
				}
				ContextUtil.commitTransaction(context);
			}
			finally {
				//MqlUtil.mqlCommand(context, "history on", true, true);
				 if(contextPushed)
					ContextUtil.popContext(context);
				
			}
			
			if(objectSize>0)
			{
				System.out.println("Number of Objects for policy 'Version' is : "+objectSize);
				migrationInfoWriter("              ----------------------                  ");
				migrationInfoWriter("Number of Objects for policy 'Version' is : " + String.valueOf(objectSize));

			}
			migrationInfoWriter("              ----------------------                  ");
			endTime   = System.currentTimeMillis();
			strPrintTime="Migration time for Policy 'Version' is  " + formatter.format((endTime - startTime) / 1000d) + " seconds";
			migrationInfoWriter(strPrintTime);
			migrationInfoWriter("              ----------------------                  ");
			
			

		}
		catch(Exception ex)
		{
			ContextUtil.abortTransaction(context);
			System.out.println(ex.toString());
			throw ex;
		}
	}

    protected void getPolicyVersionDocumentObjectSize(Context context) {
    	try {
    		long startTime = System.currentTimeMillis();

    		String strPolicyVersion=PropertyUtil.getSchemaProperty(context, DomainObject.SYMBOLIC_policy_VersionDocument);
    		String strRelationshipName=PropertyUtil.getSchemaProperty(context, DomainObject.SYMBOLIC_relationship_Version);
    		//For read only transaction value set to false
    		ContextUtil.startTransaction(context,false);


    		String command = "print policy $1 select $2 dump";
    		String versionDocumentType=MqlUtil.mqlCommand(context, command,strPolicyVersion,"type");

    		Query typeQuery = new Query();
    		typeQuery.setBusinessObjectType(versionDocumentType);
    		typeQuery.setBusinessObjectName(DomainConstants.QUERY_WILDCARD);
    		typeQuery.setBusinessObjectRevision(DomainConstants.QUERY_WILDCARD);
    		typeQuery.setWhereExpression("");
    		typeQuery.setVaultPattern(vault);
    		StringList busSelects = new StringList();
    		busSelects.add(DomainObject.SELECT_ID);
    		busSelects.add("last.to["+strRelationshipName+"].from.id");

    		QueryIterator queryTypeIterator = typeQuery.getIterator(context, busSelects, (short)1000);

    		Map<String,String> objectMap=new HashMap<String,String>();
    		while(queryTypeIterator.hasNext())
    		{

    			BusinessObjectWithSelect busWithSelect = queryTypeIterator.next();
    			String fromId     = busWithSelect.getSelectData("last.to["+strRelationshipName+"].from.id");
    			String toId = busWithSelect.getSelectData(DomainObject.SELECT_ID);
    			if(UIUtil.isNotNullAndNotEmpty(fromId) && UIUtil.isNotNullAndNotEmpty(toId))
    			objectMap.put(toId,fromId);
    		}
    		queryTypeIterator.close();
    		ContextUtil.commitTransaction(context);
    		long endTime   = System.currentTimeMillis();
    		NumberFormat formatter = new DecimalFormat("#0.00000");

    		String strPrintTime="Query time for Policy 'Version Document' is: " + formatter.format((endTime - startTime) / 1000d) + " seconds";
    		migrationInfoWriter(strPrintTime);
    		migrationInfoWriter("              ----------------------                  ");
    		int objectSize=0;

    		startTime = System.currentTimeMillis();
    		boolean contextPushed=false;
    		try{
    			ContextUtil.pushContext(context, PropertyUtil.getSchemaProperty(context, "person_UserAgent"),DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING);
    			contextPushed = true;
    			ContextUtil.startTransaction(context,true);
    			for(Iterator itr=objectMap.keySet().iterator();itr.hasNext();)
    			{

    				objectSize++;
    				String toId = (String) itr.next();
    				String fromId     = objectMap.get(toId);
    				command = "modify bus $1 add access  bus $2 as $3,$4 ";
    				migrationInfoWriter(fromId+ "|" + toId);
    				if(UIUtil.isNotNullAndNotEmpty(fromId) && UIUtil.isNotNullAndNotEmpty(toId))
    				MqlUtil.mqlCommand(context, command,toId,fromId,"read","show");

    				
    			}
    			ContextUtil.commitTransaction(context);
    		}
    		finally{
    			if(contextPushed)
    				ContextUtil.popContext(context);	
    		}

    		endTime   = System.currentTimeMillis();
    		//print the output
    		if(objectSize>0)
    		{
    			System.out.println("Number of Objects for policy 'Version Document' is : "+objectSize);
    			migrationInfoWriter("Number. of Objects for policy 'Version Document' is :" + String.valueOf(objectSize));

    		}

    		migrationInfoWriter("              ----------------------                  ");
    		strPrintTime="Migration time for Policy 'Version Document' is:  " + formatter.format((endTime - startTime) / 1000d) + " seconds";
    		migrationInfoWriter(strPrintTime);
    		migrationInfoWriter("              ----------------------                  ");


    	}  catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	/**
    * This method writes to the log file using the Printwriter object
    * @param strLogEnrty - Message to write
    * @throws Exception if the operation fails
    * @since RequirementsManagement V6R2012x
    * @grade 0
    */
    protected void migrationInfoWriter(String strLogEnrty)
    throws Exception
    {
        if (strLogEnrty!=null && strLogEnrty.length()>0)
        {
            psLogWriter.println(strLogEnrty);

        }
    }
}

