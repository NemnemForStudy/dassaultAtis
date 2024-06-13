/*
 *emxEngineeringisVPMVisibleAttributeMigrationBase.java
 * program migrates Existing PUEECO and its appicability attribute to NE object and set the expression
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */



import java.util.Iterator;

import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.util.StringList;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.engineering.EngineeringConstants;
import com.matrixone.apps.engineering.Part;

  @SuppressWarnings("serial")
public class emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO  extends emxCommonMigration_mxJPO {
      /**
      *
      * @param context the eMatrix <code>Context</code> object
      * @param args holds no arguments
      * @throws Exception if the operation fails
      * @grade 0
      */
	  
	  public static final String ATTRIBUTE_ISVPMVISIBLE = PropertyUtil.getSchemaProperty("attribute_isVPMVisible");
      public emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO (Context context, String[] args)
              throws Exception
      {
       super(context, args);
      }


      /**
       * This method does the migration work.  Existing PUEECO and its 
       * applicability attribute will migrated to NE object and the expression
       * will be set for 2011x env.
       * @param context the eMatrix <code>Context</code> object
       * @param objectIdList StringList holds list objectids to migrate
       * @returns nothing
       * @throws Exception if the operation fails
       */
      public void  migrateObjects(Context context, StringList objectIdList) throws Exception {
    	  
          // if scan variable is set, then do not migrate data
          // just write the problamatic ids to log else proceed with migration
    	  
          if (scan) {
              return;
          }
          
          int listSize = (objectIdList == null) ? 0 : objectIdList.size();
          
          if (listSize > 0) {
        	  ContextUtil.startTransaction(context, true);
	         try {
	        	          	 
	        	  StringList strPartIdList = new StringList();
	        	  
	              Iterator itr = objectIdList.iterator();
	              
	              while (itr.hasNext()) {
	            	  String sPartObjID = (String) itr.next();
	            	  Part currentPartObj = new Part(sPartObjID);  
	            	  currentPartObj.setAttributeValue(context,EngineeringConstants.ATTRIBUTE_VPM_VISIBLE, "FALSE");
	            	  strPartIdList.add(sPartObjID);
            		  Iterator<BusinessObject> bObjItr = currentPartObj.getRevisions(context).iterator();
            		  while(bObjItr.hasNext()){
            			  DomainObject domObj = DomainObject.newInstance(context, bObjItr.next());
            			  if(!sPartObjID.equals(domObj.getObjectId(context))){
	            			  domObj.setAttributeValue(context, EngineeringConstants.ATTRIBUTE_VPM_VISIBLE, "FALSE");
	            			  strPartIdList.add(domObj.getObjectId(context));
            			  }
            		  }
	              }

		          loadMigratedOidsList(strPartIdList);
	              ContextUtil.commitTransaction(context);
	          } catch (Exception ex) {
	        	  ContextUtil.abortTransaction(context);
	              ex.printStackTrace();
	              throw ex;
	          }
          }
      }
      private void loadMigratedOidsList (StringList objectIdList) throws Exception
      {
          Iterator itr = objectIdList.iterator();
          String objectId=null;
          while (itr.hasNext())
          {
              objectId = (String) itr.next();
              loadMigratedOids(objectId);
          }
      }
    public void help(Context context, String[] args) throws Exception
    {
        if(!context.isConnected())
        {
            throw new Exception("not supported on desktop client");
        }

        writer.write("================================================================================================\n");
        writer.write(" isVPMVisible Attribute Migration is a two step process  \n");
        writer.write(" Step1: Find objects of Type Part with isVPMVisible true and write them into flat files \n");
        writer.write(" Example: \n");
        writer.write(" execute program emxEngineeringisVPMVisibleAttributeMigrationFindObjects 1000 'Part' C:/Temp/oids/; \n");
        writer.write(" First parameter  = indicates number of object per file \n");
        writer.write(" Second Parameter = the parent type to search for \n");
        writer.write(" Third Parameter  = the directory where files should be written \n");
        writer.write(" \n");
        writer.write(" Step2: Migrate the objects \n");
        writer.write(" Example: \n");
        writer.write(" execute program emxEngineeringisVPMVisibleAttributeMigration 'C:/Temp/oids/' 1 n ; \n");
        writer.write(" First parameter  = the directory to read the files from\n");
        writer.write(" Second Parameter = minimum range of file to start migrating  \n");
        writer.write(" Third Parameter  = maximum range of file to end migrating  \n");
        writer.write("        - value of 'n' means all the files starting from mimimum range\n");
        writer.write("================================================================================================\n");
        writer.close();
    }
}
