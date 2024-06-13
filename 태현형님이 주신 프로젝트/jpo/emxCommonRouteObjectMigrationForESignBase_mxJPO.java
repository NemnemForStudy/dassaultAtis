
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import matrix.util.Pattern;

import matrix.db.Access;
import matrix.db.AccessList;
import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.db.MQLCommand;
import matrix.db.MatrixWriter;
import matrix.util.SelectList;
import matrix.util.StringList;

import java.io.FileWriter;
 import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.common.Route;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.AccessUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxCommonRouteObjectMigrationForESignBase_mxJPO extends emxCommonMigration_mxJPO
{

    private static final long serialVersionUID = -5029177381386073045L;
	
	 
	  
	  BufferedWriter writer = null;
      FileWriter convertedOidsLog = null;
      FileWriter statusLog = null;
      FileWriter unconvertedOidsLog = null;
	  FileWriter warningLog = null;

      static String documentDirectory = "";
      static int minRange = 0;
      static int maxRange = 0;
      public static MQLCommand mqlCommand = null;

      long startTime = System.currentTimeMillis();
      long migrationStartTime = System.currentTimeMillis();
      String error = null;

      StringBuffer migratedOids = new StringBuffer(20000);
      StringBuffer statusBuffer = new StringBuffer(50000);


    public emxCommonRouteObjectMigrationForESignBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }
	
   public void mqlLogRequiredInformationWriter(String command) throws Exception
      {
          writer.write(command);
          writer.flush();
          logWarning(command);
      }
 private void logWarning (String message) throws Exception
      {
          warningLog.write( message );
          warningLog.flush();
      }
	public void checkAndWriteUnconvertedOID(String command, String ObjectId) throws Exception
	    {
			    String newLine = System.getProperty("line.separator");
                unconvertedOidsLog.write(ObjectId+newLine);
                unconvertedOidsLog.flush();
	    }
		
    public void loadMigratedOids (String objectId) throws Exception
      {
          		  String newLine = System.getProperty("line.separator");
		          migratedOids.append(objectId + newLine);
      }
	public void checkAndWriteConvertedOID() throws Exception
		{
				convertedOidsLog.write(migratedOids.toString());
				convertedOidsLog.flush();
	    }
 public void migrateObjects(Context context, StringList objectList,int FDA) throws Exception
 {
	    String ATTRIBUTE_ROUTE_REQUIRES_ESIGN = PropertyUtil.getSchemaProperty(context, "attribute_RequiresESign"); 
	    StringList objectSelects = new StringList(15);
        objectSelects.addElement("id");
        objectSelects.addElement("name");
        objectSelects.addElement("type");
        objectSelects.addElement("revision");
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);
        String requiresESign="False";
        if(FDA==1)
         requiresESign="True";
		
		
        MapList mapList = DomainObject.getInfo(context, oidsArray, objectSelects);
		
        try{
        	ContextUtil.pushContext(context);               
        	Iterator itr = mapList.iterator();
			String strObjId="";
			String strType ="";
			String strName = "";
			String strRevision ="";
			MqlUtil.mqlCommand(context, "trig off",true);
        	while( itr.hasNext())
        	{
        		try{
        			Map valueMap = (Map) itr.next();
                    mqlLogRequiredInformationWriter("route info map "+valueMap+"\n");
        			strObjId = (String)valueMap.get("id");
        			strType = (String)valueMap.get("type");
					String symTypeNmae = FrameworkUtil.getAliasForAdmin(context, "type", strType, true);
        			strName = (String)valueMap.get("name");
        			strRevision = (String)valueMap.get("revision");     			               
        			mqlLogRequiredInformationWriter("Starting Migration for route "+strName+"\n"); 
        			mqlLogRequiredInformationWriter("Updating Requires ESign on Route id "+strObjId+" \n");
					MqlUtil.mqlCommand(context, "mod bus $1 $2 $3", strObjId,ATTRIBUTE_ROUTE_REQUIRES_ESIGN,requiresESign);

        			mqlLogRequiredInformationWriter("Successfully migrated route : " + strName+"\n");
	        		loadMigratedOids(strObjId);
				}	
            catch (Exception ex) {
				checkAndWriteUnconvertedOID( strType+","+strName+","+strRevision+",Requires ESign not Updated \n" , strObjId); 
            	mqlLogRequiredInformationWriter("Failed to set  Requires ESign attribute on Route "+strObjId+"\n");
            }
			mqlLogRequiredInformationWriter("====================================================================\n");
        }
        
        } catch(Exception ex){        
        }finally{
         ContextUtil.popContext(context);
        }
		
 }
    public void migrateRouteObjectsForESign(Context context, String[] args) throws Exception
    {     
	 int argsLength = args.length;
	 int isFDA=0;
	  error = "";
	   writer     = new BufferedWriter(new MatrixWriter(context));
	   try
          {
              //getting the context user
              String contextUser=context.getUser();
              //checking whether context user has admin privilages
              String cmd = "print person '"+ contextUser +"' select system dump" ;
              String businessAccess = MqlUtil.mqlCommand(context,mqlCommand,cmd);
              //if context user does not have admin privilages then throwing Exception
              if("false".equalsIgnoreCase(businessAccess))
              {
                  error = "User does not have Admin Privileges";
                  throw new Exception(error);
              }
          }
          catch(Exception e)
          {
              writer.write("====================================================================\n");
              writer.write(e.getMessage() + " \n");
              writer.write("Step 2 of Migration :    user FAILED \n");
              writer.write("====================================================================\n");     

          } //End for
	            try
          {
        	  if (args.length < 4 )
              {
                  error = "Wrong number of arguments";
                  throw new IllegalArgumentException(error);
              }
              documentDirectory = args[0];
              
              // documentDirectory does not ends with "/" add it
              String fileSeparator = java.io.File.separator;
              if(documentDirectory != null && !documentDirectory.endsWith(fileSeparator))
              {
                documentDirectory = documentDirectory + fileSeparator;
              }

              minRange = Integer.parseInt(args[1]);

              if ("n".equalsIgnoreCase(args[2]))
              {
                maxRange = getTotalFilesInDirectory();
                if(maxRange == 0){
					try{
                	error = "There are no objects available for Migration";
						throw new IllegalArgumentException(error);
					}
					catch (IllegalArgumentException iExp){
					    writer.write("====================================================================\n");
					    writer.write(iExp.getMessage() + " \n");
					    writer.write("Step 2 of Migration :    COMPLETED \n");
					    writer.write("====================================================================\n");
					}
                }                
              } else {
                maxRange = Integer.parseInt(args[2]);
              }

              if (minRange > maxRange)
              {
                error = "Invalid range for arguments, minimum file range is greater than maximum file range value";
                throw new IllegalArgumentException(error);
              }

              if (minRange == 0 || minRange < 1 || maxRange == 0 || maxRange < 1)
              {
                error = "Invalid range for arguments, minimum/maximum file range value is 0 or negative";
                throw new IllegalArgumentException(error);
              }
              //Fix for the chunk size starts
              java.io.File minRangeFile = new java.io.File(documentDirectory + "objectids_" + minRange + ".txt");
              java.io.File maxRangeFile = new java.io.File(documentDirectory + "objectids_" + maxRange + ".txt");
              
              if(!minRangeFile.exists() || !maxRangeFile.exists()) {
				error = "Invalid range for arguments.  Either minimum or maximum file range does not exist";
                throw new IllegalArgumentException(error);
              }
              //
          }
          catch (IllegalArgumentException iExp)
          {
              writer.write("====================================================================\n");
              writer.write(iExp.getMessage() + " \n");
              writer.write("Step 2 of Migration :  FAILED \n");
              writer.write("====================================================================\n");

          }
		    try
          {
              createLogs();
          }
          catch(FileNotFoundException fExp)
          {
              // check if user has access to the directory
              // check if directory exists
              writer.write("=================================================================\n");
              writer.write("Directory does not exist or does not have access to the directory\n");
              writer.write("Step 2 of Migration :     FAILED \n");
              writer.write("=================================================================\n");
       
          }
        int i = 0;
          try
          {
              ContextUtil.pushContext(context);
              String cmd = "trigger off";
              MqlUtil.mqlCommand(context, mqlCommand,  cmd);
			 
              mqlLogRequiredInformationWriter("=======================================================\n\n");
              mqlLogRequiredInformationWriter("                Migrating Objects...\n");
              mqlLogRequiredInformationWriter("                File (" + minRange + ") to (" + maxRange + ")\n");
              mqlLogRequiredInformationWriter("                Reading files from: " + documentDirectory + "\n");
			  mqlLogRequiredInformationWriter("                Migrated objects will be written to:  convertedIds.txt \n");
              mqlLogRequiredInformationWriter("                Objects which cannot be migrated will be written to:  unConvertedObjectIds.txt\n");
              mqlLogRequiredInformationWriter("                Logging of this Migration will be written to: migration.log\n\n");
              mqlLogRequiredInformationWriter("=======================================================\n\n"); 
              migrationStartTime = System.currentTimeMillis();
              boolean migrationStatus = true;
              statusBuffer.append("File Name, Status, Object Failed (OR) Time Taken in MilliSec\n");
              for( i = minRange;i <= maxRange; i++)
              {
                  try
                  {
                      ContextUtil.startTransaction(context,true);
                      StringList objectList = new StringList();
                      migratedOids = new StringBuffer(20000);
                      try
                      {
                          objectList = readFiles(i);
						  
                      }
                      catch(FileNotFoundException fnfExp)
                      {
                          // throw exception if file does not exists
                          throw fnfExp;
                      }
                      isFDA = Integer.parseInt(args[3]);
					  mqlLogRequiredInformationWriter("=================================================================\n");
					  mqlLogRequiredInformationWriter("Migration of Objects in file objectids_" + i + ".txt START \n");
					  mqlLogRequiredInformationWriter("=================================================================\n");
                      migrateObjects(context, objectList,isFDA);
					  
                      checkAndWriteConvertedOID();
                      mqlLogRequiredInformationWriter("<<< Time taken for migration of objects & write convertedIds.txt for file in milliseconds :" + documentDirectory + "objectids_" + i + ".txt"+ ":=" +(System.currentTimeMillis() - startTime) + ">>>\n");

                      // write after completion of each file
                      mqlLogRequiredInformationWriter("=================================================================\n");
                      mqlLogRequiredInformationWriter("Migration of Objects in file objectids_" + i + ".txt COMPLETE \n");
                      statusBuffer.append("objectids_");
                      statusBuffer.append(i);
                      statusBuffer.append(".txt,COMPLETE,");
                      statusBuffer.append((System.currentTimeMillis() - startTime));
                      statusBuffer.append("\n");
                      mqlLogRequiredInformationWriter("=================================================================\n");
                  }
                  catch(FileNotFoundException fnExp)
                  {
                      // log the error and proceed with migration for remaining files
                      mqlLogRequiredInformationWriter("=================================================================\n");
                      mqlLogRequiredInformationWriter("File objectids_" + i + ".txt does not exist \n");
                      mqlLogRequiredInformationWriter("=================================================================\n");
                      ContextUtil.abortTransaction(context);
                       migrationStatus = false;
                  }
                  catch (Exception exp)
                  {
                      // abort if identifyModel or migration fail for a specific file
                      // continue the migration process for the remaining files
                      mqlLogRequiredInformationWriter("=======================================================\n");
                      mqlLogRequiredInformationWriter("Migration of Objects in file objectids_" + i + ".txt FAILED \n");
                      mqlLogRequiredInformationWriter("=="+ exp.getMessage() +"==\n");
                      mqlLogRequiredInformationWriter("=======================================================\n");
                      statusBuffer.append("objectids_");
                      statusBuffer.append(i);
                      statusBuffer.append(".txt,FAILED,");
                      statusBuffer.append("\n");
                      exp.printStackTrace();
                      ContextUtil.abortTransaction(context);
                      migrationStatus = false;

                  }
              }

              mqlLogRequiredInformationWriter("=======================================================\n");
              if(migrationStatus){
              	mqlLogRequiredInformationWriter("                Step 2 of Migration COMPLETED SUCCESSFULLY\n");
              }else{
              	mqlLogRequiredInformationWriter("                Step 2 of Migration INCOMPLETE\n");
              	mqlLogRequiredInformationWriter("Please check the logs for further details on failures\n");
              	mqlLogRequiredInformationWriter("There could be failures in migrating objects in one or more files\n");
		      }
              mqlLogRequiredInformationWriter("                Time: " + (System.currentTimeMillis() - migrationStartTime) + " ms\n");
              mqlLogRequiredInformationWriter(" \n");
              mqlLogRequiredInformationWriter(" \n");
              mqlLogRequiredInformationWriter("                Objects which cannot be migrated will be written to:  unConvertedObjectIds.txt\n");
              mqlLogRequiredInformationWriter("                Logging of this Migration will be written to: migration.log\n\n");
              mqlLogRequiredInformationWriter("=======================================================\n");
          }
          catch (Exception ex)
          {
			  
              mqlLogRequiredInformationWriter("=======================================================\n");
              mqlLogRequiredInformationWriter("Step 2 of Migration    : INCOMPLETE \n");
              mqlLogRequiredInformationWriter("=======================================================\n");
              ex.printStackTrace();
              ContextUtil.abortTransaction(context);
          }
          finally
          {
              mqlLogRequiredInformationWriter("<<< Total time taken for migration in milliseconds :=" + (System.currentTimeMillis() - migrationStartTime) + ">>>\n");
              String cmd = "trigger on";
              MqlUtil.mqlCommand(context, mqlCommand,  cmd);

              statusLog   = new FileWriter(documentDirectory + "fileStatus.csv", true);
              statusLog.write(statusBuffer.toString());
              statusLog.flush();
              statusLog.close();

              ContextUtil.popContext(context);
              convertedOidsLog.close();
          }
       
    }
     public StringList readFiles(int i) throws Exception
      {
          String objectId = "";
          StringList objectIds = new StringList();
          try
          {
              java.io.File file = new java.io.File(documentDirectory + "objectids_" + i + ".txt");
              BufferedReader fileReader = new BufferedReader(new FileReader(file));
              while((objectId = fileReader.readLine()) != null)
              {
                objectIds.add(objectId);
              }
          }
          catch(FileNotFoundException fExp)
          {
              throw fExp;
          }
          return objectIds;
      }
      /**
       * This method returns the total number of files in the directory.
       *
       * @returns int of total files present in the directory
       * @throws Exception if the operation fails
       */
      public int getTotalFilesInDirectory() throws Exception
      {
          int totalFiles = 0;
          try
          {
              String[] fileNames = null;
              java.io.File file = new java.io.File(documentDirectory);
              if(file.isDirectory())
              {
                  fileNames = file.list();
              } else {
                  throw new IllegalArgumentException();
              }
              for (int i=0; i<fileNames.length; i++)
              {
                  if(fileNames[i].startsWith("objectids_"))
                  {
                      totalFiles = totalFiles + 1;
                  }
              }
          }
          catch(Exception fExp)
          {
              // check if user has access to the directory
              // check if directory exists
              error = "Directory does not exist or does not have access to the directory";
              throw fExp;
          }

          return totalFiles;
      }
	  public void createLogs()throws Exception{
    	unconvertedOidsLog   = new FileWriter(documentDirectory + "unConvertedObjectIds"+".txt", false);
    	convertedOidsLog    = new FileWriter(documentDirectory + "convertedIds.txt", false);
		warningLog = new FileWriter(documentDirectory + "migration.log", false);

    }
       
}
    

