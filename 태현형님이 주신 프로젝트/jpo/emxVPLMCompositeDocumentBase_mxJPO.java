/*
** emxVPLMCompositeDocumentBase
**
** Copyright (c) 2007-2008 Dassault Systemes.
**
** All Rights Reserved.
** This program contains proprietary and trade secret information of
** MatrixOne, Inc.  Copyright notice is precautionary only and does
** not evidence any actual or intended publication of such program.
**
*/


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Stack;
import java.util.Vector;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.List;
import matrix.util.MatrixException;
import matrix.util.StringList;

import com.matrixone.jdom.CDATA;
import com.matrixone.jdom.DocType;
import com.matrixone.jdom.Document;
import com.matrixone.jdom.Element;
import com.matrixone.jdom.ProcessingInstruction;
import com.matrixone.jsystem.util.Base64Utils;
// import org.apache.axis2.util.Base64;
import com.dassault_systemes.vplm.modeler.entity.PLMxEntityDef;
import com.dassault_systemes.vplm.modeler.entity.PLMxPortEntity;

import com.dassault_systemes.vplm.modeler.entity.PLMxRepresentationEntity;

//import com.dassault_systemes.vplm.modeler.service.PLMIDService;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkProperties;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.i18nNow;


/**
 * Methods for exporting VPLM Functional/Logical Structures
 *
 * @author srickus
 * @version RequirementsManagement V6R2008-2.0
 */
public class emxVPLMCompositeDocumentBase_mxJPO extends emxDomainObject_mxJPO
{
   // Override the default Matrix date format string here:
   protected String              EMX_DATE_FORMAT         = eMatrixDateFormat.getEMatrixDateFormat();
   protected SimpleDateFormat    VPLM_DATE_FORMATTER     = new SimpleDateFormat(EMX_DATE_FORMAT);

   // Customizable Constants defined in emxRequirements.properties:
   protected String              TYPE_REQUIREMENT        = "";
   protected String              TYPE_CHAPTER            = "";
   protected String              RFLPLMFUNCTIONAL        = "";
   protected String              RFLVPMLOGICAL           = "";
   protected String              RFLVPMPHYSICAL           = "";
   protected String              RFLPLMFLOW           	= "";
   protected String              RFLPLMTYPE           	= "";
   protected String              RFLPLMFUNCTIONALCOMMUNICATION     = "";
   protected String              RFLPLMLOGICALCOMMUNICATION     = "";

   // Export Schema Constants:
   protected static final String        SELECT_RESERVED_BY              = "reservedby";
   protected static final String        RELATIONSHIP_REPRESENTATIONS    = "representations";
   protected static final String        RELATIONSHIP_TYPES              = "types";
   protected static final String        RELATIONSHIP_FLOWS              = "flows";
   protected static final String        RELATIONSHIP_PORTS              = "ports";
   protected static final String        RELATIONSHIP_IMPLEMENTED        = "implemented";
   protected static final String        RELATIONSHIP_CHILDREN           = "children";
   protected static final String        VPLM_EXTERNAL_ID                = "PLM_ExternalID";
   protected static final String        VPLM_VERSION                    = "majorrevision"; 
   protected static final String        VPLM_FUNCTION_ROOT              = "PLM_FunctionRoot";
   protected static final String        VPLM_FUNCTION_NAME              = "PLM_FunctionName";
   protected static final String        VPLM_LOGICAL_ROOT               = "PLM_LogicalRoot";
   protected static final String        VPLM_LOGICAL_NAME               = "PLM_LogicalName";
   protected static final String        VPLM_PHYSICAL_ROOT               = "PLM_PhysicalRoot";
   protected static final String        VPLM_PHYSICAL_NAME               = "PLM_PhysicalName";

   // Instance Variables:
   private Context                      emxContext;
   private DomainObject                 emxObject; //spec object

   private boolean                      isUnicornEnabled = false;
   private boolean               		debugTrace       = false;


   /**
    * Create a new Composite Document object.
    *
    * @param context
    *                the eMatrix <code>Context</code> object
    * @param args
    *                holds no arguments
    * @return a emxCompositeDocument object.
    * @throws Exception
    *                if the operation fails
    */
   public emxVPLMCompositeDocumentBase_mxJPO(Context context, String[] args) throws Exception
   {
      super(context, args);

      emxContext = context;
      emxObject = null;

      RFLPLMFUNCTIONAL = FrameworkProperties.getProperty(context, "emxRequirements.VPLMType.RFLPLMFunctional");
      RFLVPMPHYSICAL = FrameworkProperties.getProperty(context, "emxRequirements.VPLMType.RFLVPMPhysical");
      RFLVPMLOGICAL = FrameworkProperties.getProperty(context, "emxRequirements.VPLMType.RFLVPMLogical");
      RFLPLMFLOW = FrameworkProperties.getProperty(context, "emxRequirements.VPLMType.RFLPLMFlow");
      RFLPLMTYPE = FrameworkProperties.getProperty(context, "emxRequirements.VPLMType.RFLPLMType");
      RFLPLMFUNCTIONALCOMMUNICATION = FrameworkProperties.getProperty(context, "emxRequirements.VPLMType.RFLPLMFunctionalCommunication");
      RFLPLMLOGICALCOMMUNICATION = FrameworkProperties.getProperty(context, "emxRequirements.VPLMType.RFLPLMLogicalCommunication");
      TYPE_REQUIREMENT = PropertyUtil.getSchemaProperty(context, "type_Requirement");
      TYPE_CHAPTER = PropertyUtil.getSchemaProperty(context, "type_Chapter");
      isUnicornEnabled = true;
   }


   public boolean initVPLMContext(String objectId)
   {
	  return false;
   }

   /*
   *  @param iName the name of variable
   *  @param iVal the value to be printed
   *  @param iDebug the debug flag
   *  @return void
   *  @throws Exception if the operation fails
   *
   *  @since RequirementsManagement V6R2008-2.0
   */
  private void printDebugTrace(String iName, String iVal, boolean iDebug) throws IOException
  {

  }

   public MapList getVPLMRoots(Context context, String[] objIds)
      throws Exception
   {


      return(new MapList());
   }


   private MapList getVPLMRoots(Context context)
      throws Exception
   {
      MapList   plmRoots = new MapList();
      return(plmRoots);
   }


   /**
    * @param implemented entity def
    * @param implementing entity def
    * @return rootMap
    * @throws MatrixException 
    */
   private HashMap buildVPLMRootLink(Context context, PLMxEntityDef implemented, PLMxEntityDef implementing, PLMxEntityDef implementing2) throws MatrixException
   {
      HashMap rootMap = new HashMap();
      return(rootMap);
   }

   private String addVPLMRoot(Context context, HashMap rootMap, PLMxEntityDef rootDef) throws MatrixException
   {
	  return "";
   }


   private String getEMXIdentifier(PLMxEntityDef entityDef)
   {
      String    entId = null;
      String    emxId = null;
      return(emxId);
   }

   /**
    * @param specId
    * @param reqIds
    */
   private MapList buildSpecStructureData(Vector reqIds)
   {
      MapList specList = new MapList();
      return(specList);
   }


   /**
    * @param entityPaths
    * @return
    */
   private MapList buildVPLMObjectPathList(PLMxEntityDef[] entityDefs)
   {
      MapList entityList = new MapList();
      return(entityList);
   }

   /**
    * @param entityId
    * @return
    */
   private HashMap buildVPLMObjectMap(String entityId)
   {
      HashMap entityMap = new HashMap();
      return(entityMap);
   }

   /**
    * @param entityDef
    * @return
    */
   private HashMap buildVPLMObjectMap(PLMxEntityDef entityDef)
   {
      HashMap           entityMap = new HashMap();

      //SpecificationStructure.printIndentedMap(entityMap);
      return entityMap;
   }


   /**
    * @param flObjId
    * @param level
    */

   /**
    * @param entityDef
    * @return
    */
   private HashMap buildVPLMPortMap(PLMxPortEntity portDef)
   {
	  return (new HashMap());
   }

   /**
    * @param flObjId
    * @param level
    */
 
   /**
    * @param repEntity
    * @throws IOException
    */
   private HashMap buildVPLMStreamMap(PLMxRepresentationEntity repEntity) throws IOException
   {
      HashMap strMap = new HashMap();


      return(strMap);
   }

   /**
    * @param domainObj
    * @return
    */
   private HashMap buildEMXObjectMap(DomainObject domainObj)
   {
      HashMap   objectMap = new HashMap();
      return objectMap;
   }


   /**
    * Main entry point
    *
    * @param context
    *                context for this request
    * @param args
    *                holds no arguments
    * @return an integer status code (0 = success)
    * @exception Exception
    *                    when problems occurred
    */
   public int mxMain(Context context, String[] args) throws Exception
   {
      if (!context.isConnected())
      {
         String mess = i18nNow.getI18nString("emxRequirements.Alert.FeaturesCheckFailed",
               "emxRequirementsStringResource", context.getSession().getLanguage());
         throw new Exception(mess);
      }

      System.out.println("mxMain: args.length = " + args.length);

      for (int ii = 0; ii < args.length; ii++)
         System.out.println(ii + ".  " + args[ii]);

      return 0;
   }


   void print(PLMxEntityDef entity)
   {
	   print(entity, false);
   }
   void print(PLMxEntityDef entity, boolean detailed)
   {

   }


   public Document buildCompositeDocument(Context context, String[] args)
   throws Exception
	{
	    Document rootDoc = new Document();

		return (rootDoc);
	}


   private boolean isCBPObject(Context context, String plmId)
   {
	
	   return false;
   }


   private void tweakAttributes(Context context, PLMxEntityDef entity, Map attributes)
   {

   }


   private Map buildImplementMap(Context context, String specId, String funcRootId, String logicRootId, String phyRootId, Map objectPool) throws Exception
   {
	   Map implementMap = new HashMap();

	   return implementMap;
   }


   private static void fillMapElement(Element mapElem, Map parmMap)
   {
 
   }
   private static void fillObjElement(Element objElem, Map objMap)
   {

   }

   static final int FUNCTION = 0;
   static final int LOGICAL = 1;
   static final int COMMUNICATION = 2;
   static final int FLOW = 3;
   static final int TYPE = 4;
   static final int M1 = 5;
   static final int CONNECTION = 6;
   static final int PORT = 7;
   static final int REPRESENTATION = 8;
   static final int OTHER = 9;
   static final int PHYSICAL = 10;

   private PLMxEntityDef retrievePLMObject(String plmId, Map ojbectPool) throws Exception
   {
	
	   return null;
   }
   private Element buildElement(Context context, String objectId, int category, Map objectPool, Map implMap) throws Exception
   {
	
	   return null;
   }

   private Element buildElement(Context context ,PLMxEntityDef entity, int category, Map objectPool, Map implMap) throws Exception
   {
	  
	    return null;
   }

   private Element buildCBPElement(String plmId)
   {
	   Element elem = new Element("ObjectReference");


	   return elem;

   }
   private Element buildElement(Context context, PLMxEntityDef entity, int category, boolean recursive, Map objectPool, Map implMap) throws MatrixException
   {
	   

	   Element elem = new Element("ObjectReference");
		return elem;
   }

   boolean isFunctionalPort(Context context, PLMxEntityDef entity) throws MatrixException
   {

	   return false;
   }
   boolean isFunctionalCommunication(Context context, PLMxEntityDef entity) throws MatrixException
   {
	   return false;
   }
   int getCategory(Context context, PLMxEntityDef entity) throws MatrixException
   {
	
	   return -1;
   }

	   /**
	    * Take a list of object plmidentifier and do a query against the server to get the opened objects
	    *
	    * @return the list of PLMxEntityDef which can be cast into the appropriate PLMxXXXXXX interface
	    * @throws java.lang.Exception
	     * @param iModelerSession
	     * @param iListUnopenedPLMIdentifier - array of PLMIDs which are not opened
	    */
	 public PLMxEntityDef[] getOpenedObjectsFromServer(String[] iListUnopenedPLMIdentifier)
	 throws Exception
	 {
	   return null;
	 }
	 public boolean getBooleanPreference(Context context, String key) throws FrameworkException
	 {
	 	
		return false;
	 }
}
