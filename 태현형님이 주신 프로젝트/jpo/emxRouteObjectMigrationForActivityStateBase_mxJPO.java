
import matrix.db.Context;
import matrix.db.MQLCommand;
import matrix.util.StringList;

import java.io.FileWriter;
import java.io.BufferedWriter;
import com.matrixone.apps.common.Route;
import com.matrixone.apps.domain.util.ContextUtil;

public class emxRouteObjectMigrationForActivityStateBase_mxJPO extends emxCommonMigration_mxJPO
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


    public emxRouteObjectMigrationForActivityStateBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }
	


 public void migrateObjects(Context context, StringList objectList) throws Exception
 {	    
	 mqlLogRequiredInformationWriter("Starting Migration to update Activity state on Route Objects \n");
		
        try{
        	ContextUtil.pushContext(context); 
        	
        	for(int i = 0; i< objectList.size(); i++) {
        		String objectID = objectList.get(i);
        		try {
	        		
	        		mqlLogRequiredInformationWriter("Starting Migration for route : "+objectID+"\n"); 
	        		Route.updateRouteActivityStatus(context, objectID);
	        		mqlLogRequiredInformationWriter("Successfully migrated route : " + objectID+"\n");
	        		checkAndloadMigratedOids(objectID);
        		}	
                catch (Exception ex) {
                	checkAndWriteUnconvertedOID( "Object "+ objectID  +" is not migrated and default value is set as Activity status.", objectID); 
                	mqlLogRequiredInformationWriter("Object not migrated "+objectID+"\n");                
                }
        		mqlLogRequiredInformationWriter("====================================================================\n");
        	}     	
        
        } catch(Exception ex){ 
        	//Do nothing
        }finally{
        	ContextUtil.popContext(context);        	
        }
		
 }
   
	 public void mqlLogRequiredInformationWriter(String command) throws Exception
	 {
	     super.mqlLogRequiredInformationWriter(command +"\n");
	 }
	 
	 
	 public void checkAndloadMigratedOids(String command) throws Exception
	 {
	  if(migratedOids.indexOf(command)<= -1){
	     super.loadMigratedOids(command +"\n");
	  }
	     
	 }
	 public void checkAndWriteUnconvertedOID(String command, String ObjectId) throws Exception
	 {
	  if(migratedOids.indexOf(ObjectId)<= -1){
	     super.writeUnconvertedOID(command, ObjectId);
	  }
	     
	 }
      

       
}
    

