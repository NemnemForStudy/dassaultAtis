/*
 * emxClassificationBase.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only
 * and does not evidence any actual or intended publication of such program
 * static const RCSID [] = "$Id: ${CLASSNAME}.java.rca 1.10 Wed Oct 22 16:02:33 2008 przemek Experimental przemek $";
 */

import com.matrixone.apps.document.DCWorkspaceVault;
import com.matrixone.apps.library.LibraryCentralConstants;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.Vector;
import java.util.Iterator;
import java.util.List;

import matrix.db.BusinessObject;
import matrix.db.BusinessType;
import matrix.db.ConnectParameters;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.RelationshipType;
import matrix.db.Vault;
import matrix.util.MatrixException;
import matrix.util.Pattern;
import matrix.util.SelectList;
import matrix.util.StringList;

import com.matrixone.apps.classification.Classification;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.XSSUtil;

import java.util.ArrayList;
import java.util.HashMap;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import java.util.Locale;

/**
 * The <code>emxClassificationBase</code> class.
 *
 */
public class emxClassificationBase_mxJPO extends emxLibraryCentralCommon_mxJPO

{

    /**
     * Creates the ${CLASSNAME} Object
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args the Java <code>String[]</code> object
     * @throws Exception if the operation fails
     */

    public emxClassificationBase_mxJPO (Context context,
                         String[] args) throws Exception
    {
        super(context, args);
    }



    /**
     * This method is executed if a specific method is not specified.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args the Java <String[]</code> object
     * @return the Java <code>int</code>
     * @throws Exception if the operation fails
     * @exclude
     */

    public int mxMain (Context context, String[] args ) throws Exception
    {
        if ( true )
        {
            throw new Exception ("Do not call this method!");
        }

        return 0;
    }

    /**
     * JPO invocation decoding wrapper for method below.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds the following input arguments:
        0 - strPartId The id of the part
        1- strparentObj Id The id of the parent object
        2 - strPartType The type of the part
        3 - strName The name of the part
        4 - strPartRevision The revision of the part
        5 - strPartPolicy The policy of the part
        6 - strDescription The description of the part
    * @return a Map containing the part object and boolean state whether the part exists or not
    * @throws FrameworkException if the operation fails
    */
    public static Map createAndConnectPart(Context context, String[] args)
    throws FrameworkException {
    try{
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        String strparentObjId = (String) programMap.get("strparentObjId");
        String strPartId = (String) programMap.get("strPartId");
        String strPartType = (String) programMap.get("strPartType");
        String strName = (String) programMap.get("strName");
        String strPartRevision = (String) programMap.get("strPartRevision");
        String strPartPolicy = (String) programMap.get("strPartPolicy");
        String strDescription = (String) programMap.get("strDescription");
        return createAndConnectPart(context,strPartId,strparentObjId,strPartType,strName, strPartRevision,strPartPolicy,strDescription);
       } catch (Exception e) {
            throw new FrameworkException (e);
       }
    }

    /**
     * Creates and Connects a Part to the Parent Object.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param strPartId The id of the part
     * @param strparentObjId The id of the parent object
     * @param strPartType The type of the part
     * @param strName The name of the part
     * @param strPartRevision The revision of the part
     * @param strPartPolicy The policy of the part
     * @param strDescription The description of the part
     * @return a Map containing the part object and boolean state whether the part exists or not
     * @throws FrameworkException if the operation fails
     */

    public static Map createAndConnectPart(Context context,String strPartId,String strparentObjId,String strPartType,String strName, String strPartRevision,String strPartPolicy,String strDescription)
    throws FrameworkException {

        boolean bPartExists = false;
        Map partMap = new HashMap();
        try {
            BusinessObject busPart = new BusinessObject(strPartType, strName, strPartRevision, context.getVault().getName() );
            if(strPartId == null || "".equalsIgnoreCase(strPartId)) {
                bPartExists = busPart.exists(context);
            }
            if(bPartExists){
                partMap.put("bPartExists",new Boolean(bPartExists));
                partMap.put("busPart",busPart);
                return partMap;
            }
            if(strPartId == null || "".equalsIgnoreCase(strPartId)) {
                busPart.create(context, strPartPolicy);
            } else {
                busPart = new BusinessObject(strPartId);
            }
            strPartId = busPart.getObjectId();

            if (strDescription != null) {
                strDescription = strDescription.trim();
            }
            //Update the description of the object
            busPart.setDescription(context,strDescription);


            if (strparentObjId != null && !strparentObjId.equals("") && !strparentObjId.equals("null") ) {
                BusinessObject parentObj = new BusinessObject(strparentObjId);
                parentObj.open(context);
                String relationshipName = LibraryCentralConstants.RELATIONSHIP_CLASSIFIED_ITEM;
                parentObj.connect(context, new RelationshipType(relationshipName), true, busPart);
                parentObj.close(context);
            }

            partMap.put("bPartExists",new Boolean(bPartExists));
            partMap.put("busPart",busPart);

        } catch (Exception e) {
            throw new FrameworkException (e);
        }
        return partMap;
    }
    
    /**
     * Adds the Classified Items
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *      0 - parentId is the id of the parent object
     *      1 - childIds is the array of the child objects to be added
     * @return The string result of mql command execution
     * @throws FrameworkException if the operation fails
     */
    public static String addEndItems(Context context, String[] args)
    throws FrameworkException {
    String resultString="";
    try{
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        String parentId = (String) programMap.get("parentId");
        String[] childIds = (String[])programMap.get("childIds");
        List<String> childIdsFinal = new ArrayList<String>();
        int icounter=0;
        int actualObjectCounter = 0;
        int oBLRc=0;
        
         StringBuilder oBLErrMsg = new StringBuilder();
         StringBuilder oBLErrMsgFinal = new StringBuilder();
        for(String childId:childIds)
        {
          oBLRc=0;
              
         oBLErrMsg.setLength(0);
       //  com.matrixone.apps.library.Classification classificationObj=new com.matrixone.apps.library.Classification(); 
         boolean isObjectClassifiable=Classification.validateObjectMaturityBR(context,childId,oBLRc,parentId,oBLErrMsg);
    
         if(oBLErrMsgFinal.toString().equalsIgnoreCase(""))
            oBLErrMsgFinal.append(oBLErrMsg);
        
         if(isObjectClassifiable)
         {
            childIdsFinal.add(childId);
            icounter++;
         }
         actualObjectCounter++;
        }
      
         if(actualObjectCounter!=childIdsFinal.size())
        {
  
          throw new Exception("BL_ERROR%"+oBLErrMsgFinal.toString());
        }
        if(childIdsFinal.size()!=0)
          resultString =  addEndItems(context,parentId,childIdsFinal.toArray(new String[childIdsFinal.size()]));
         
       
       
          
        } catch (Exception e) {
            throw new FrameworkException (e);
       }
       return resultString;
    }


    /**
     * Adds the Classified Items
     * V2 for widget - performance improvement
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *      0 - parentId is the id of the parent object
     *      1 - childIds is the array of the child objects to be added
     * @return The string result of mql command execution
     * @throws FrameworkException if the operation fails
     */
    public static Map addEndItemsV2(Context context, String[] args)
    		throws FrameworkException {
    	Map resultMap = new HashMap<>();
    	int failedCount = 0;
    	int alreadyExistCount = 0;
    	try{
    		HashMap programMap = (HashMap) JPO.unpackArgs(args);
    		String parentId = (String) programMap.get("parentId");
    		String[] childIds = (String[])programMap.get("childIds");

    		DomainObject parentobj = new DomainObject(parentId);
    		DomainObject object = new DomainObject();
    		ConnectParameters params = new ConnectParameters();
    		params.setFrom(true);
    		params.setRelType(LibraryCentralConstants.RELATIONSHIP_CLASSIFIED_ITEM);
    		StringBuilder oBLErrMsg = new StringBuilder();
    		String sTypeToblock="LibraryFeaturePort";
    		String resourceBundle = "emxLibraryCentral";
			String strLanguage =  context.getSession().getLanguage();
			String errMsg = EnoviaResourceBundle.getProperty(context,resourceBundle, new Locale(strLanguage),"emxLibraryCentral.LibraryFeaturePort.AccessNotAllowed");
			
    		for(String childId:childIds)
    		{
    			object.setId(childId);
    			params.setTarget(object);
    			try{
    				oBLErrMsg.setLength(0);
    				boolean isObjectClassifiable=Classification.validateObjectMaturityBR(context,childId,0,parentId,oBLErrMsg);
    				if(!isObjectClassifiable){
    					resultMap.put(childId, oBLErrMsg.toString());
    					failedCount++;
    				}else{
    					DomainObject doObj	=	new DomainObject(childId);
    					if(doObj.isKindOf(context, sTypeToblock)){
    						String isClassifiedPort=MqlUtil.mqlCommand(context,"print bus $1 select $2 dump",childId,"to[Classified Item]");
    						if("TRUE".equalsIgnoreCase(isClassifiedPort)){
    							resultMap.put(childId, errMsg);
    							failedCount++;
    	    					continue;
    						}
    					}
    					parentobj.connect(context, params);
    				}
    			}catch(MatrixException me){
    				failedCount++;
    				if(me.getMessage() != null){
    					String error = me.getMessage();
    					if(error.indexOf("A relationship of this type already exists between these objects") != -1)
    						alreadyExistCount++;
    					else if(error.indexOf("No toconnect access to business object") != -1)
    						resultMap.put(childId, "User has no classify access to the given object");
    					else if(error.indexOf("Transaction aborted Severity") != -1 || error.indexOf("does not exist") != -1)
    						resultMap.put(childId, "The given object doesn't exist (or) user has no access to the object.");
    					else if(error.indexOf("relationship does not allow type of business object or relationship") != -1)
    						resultMap.put(childId, "This type of object is not supported by classification.");
    				}else
    					resultMap.put(childId, "Error while classifying");
    			}
    		}
    		resultMap.put("failedCount", failedCount);
    		resultMap.put("totalCount", childIds.length);
    		resultMap.put("alreadyExistCount", alreadyExistCount);
    	} catch (Exception e) {
    		throw new FrameworkException (e);
    	}
    	return resultMap;
    }


    /**
     * Adds the Classified Items
     *
     * @param context the eMatrix <code>Context</code> object
     * @param parentId is the id of the parent object
     * @param childIds is the array of the child objects to be added
     * @return The string result of mql command execution
     * @throws FrameworkException if the operation fails
     */
    public static String addEndItems(Context context, String parentId, String[] childIds)
    throws FrameworkException
    {
    try{
        DomainObject parentobj = new DomainObject(parentId);

        String sParentType = parentobj.getInfo(context,DomainObject.SELECT_TYPE);
        String strVault = parentobj.getVault();
        BusinessType busType = new BusinessType(sParentType,new Vault(strVault));
        String strParentType = busType.getParent(context);
        String sRelSubclass = LibraryCentralConstants.RELATIONSHIP_SUBCLASS;
        String workSpaceVault = PropertyUtil.getSchemaProperty(context,
                                                "type_ProjectVault");

        //In case of Adding DC Types to workSpace Vault

        if(sParentType.equals(workSpaceVault))
        {
            String []folderIds= new String[1];
            folderIds[0]=parentId;
            String objNameNotAdded =
            DCWorkspaceVault.addToFolders(context,folderIds, childIds);
        }
        else
        {
            if(parentobj.isKindOf(context, LibraryCentralConstants.TYPE_CLASSIFICATION))
            {
                 //IR-869153-3DEXPERIENCER2022x stop classifying already classified LibraryFeaturePort
                 for(String childId: childIds)
 			   {
 				   DomainObject doObj	=	new DomainObject(childId);
                    Boolean isAllowedType = true;
                    String sTypeToblock="LibraryFeaturePort";
                    if(doObj.isKindOf(context, sTypeToblock))
                   {

                    String isClassifiedPort=MqlUtil.mqlCommand(context,"print bus $1 select $2 dump",childId,"to[Classified Item]");

                        if("TRUE".equalsIgnoreCase(isClassifiedPort))
                        {
                         String resourceBundle = "emxLibraryCentral";
                         String strLanguage =  context.getSession().getLanguage();
                         String errMsg = EnoviaResourceBundle.getProperty(context,resourceBundle, new Locale(strLanguage),"emxLibraryCentral.LibraryFeaturePort.AccessNotAllowed");
                             throw new FrameworkException(errMsg);
                        }
                  
                   }
                }
                DomainRelationship rel = new DomainRelationship();
                rel.connect(context, parentobj, LibraryCentralConstants.RELATIONSHIP_CLASSIFIED_ITEM, true, childIds);
            }
        }
        String strQuery     = "expand bus $1 to relationship $2 recurse to all select bus $3 dump $4";
        String strTemp      = "";
        String strResultID  = "";

        String strResult    = MqlUtil.mqlCommand(context,strQuery, parentId, sRelSubclass, "id", ",");
        return strResult;
    }catch (Exception e) {
            throw new FrameworkException (e);
       }
    }

    /**
     * This method returns Classification Ids for a given object
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - objectId
     * @return StringList - Classification Path List
     * @throws Exception if the operation fails
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getClassificationIds(Context context,String[] args)
    throws FrameworkException
    {
        MapList classificationIds   = new MapList();
        try {
            HashMap paramMap            = (HashMap)JPO.unpackArgs(args);
            String objectId             = (String)paramMap.get("objectId");
            String excludeIPSecurityClasses = (String)paramMap.get("excludeIPSecurityClasses");
            Pattern relPattern = new Pattern(LibraryCentralConstants.RELATIONSHIP_CLASSIFIED_ITEM);
            if(!"true".equalsIgnoreCase(excludeIPSecurityClasses))
            {
                relPattern.addPattern(DomainConstants.RELATIONSHIP_PROTECTED_ITEM);
            }
            SelectList selectStmts      = new SelectList(2);
            selectStmts.add(DomainObject.SELECT_ID);
            selectStmts.add(DomainObject.SELECT_NAME);
            DomainObject domObj         = new DomainObject(objectId);
            classificationIds           = (MapList)domObj.getRelatedObjects(context,
                                            relPattern.getPattern(),   // relationship pattern
                                            LibraryCentralConstants.QUERY_WILDCARD,                 // type pattern
                                            selectStmts,        // Object selects
                                            null,               // relationship selects
                                            true,               // from
                                            false,              // to
                                            (short)1,           // expand level
                                            null,               // object where
                                            null,               // relationship where
                                            0);                 // limit
        }catch (Exception ex) {
            throw new FrameworkException (ex);
        }
        return classificationIds;
    }

    /**
     * This method returns Classification path
     * ex. PL1 -> PF1
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - objectList
     * @return StringList - Classification Path List
     * @throws Exception if the operation fails
     */
    public Vector getClassificationPath(Context context,String[] args)
    throws FrameworkException
    {
        Vector classficationPaths   = new Vector();

        try
        {
            HashMap programMap          = (HashMap) JPO.unpackArgs(args);
            MapList objectList          = (MapList)programMap.get("objectList");
            HashMap paramMap            = (HashMap) programMap.get("paramList");
            String reportFormat         = (String)paramMap.get("reportFormat");
            SelectList selectStmts      = new SelectList(3);
            selectStmts.addElement(DomainConstants.SELECT_ID);
            selectStmts.addElement(DomainConstants.SELECT_NAME);
            selectStmts.addElement(DomainConstants.SELECT_ATTRIBUTE_TITLE);
            Iterator objectListItr      = objectList.iterator();

            String elemSeperator        = "<img style=\"padding-left:2px; padding-right:2px;\" src=\"../common/images/iconTreeToArrow.gif\"></img>";
            String pathWrapperOpen      = "<span>";
            String pathWrapperClose     = "</span>";

            if (reportFormat != null && ("CSV".equals(reportFormat) || "HTML".equals(reportFormat))) {
                elemSeperator    = " -> ";
                pathWrapperOpen  = "";
                pathWrapperClose = "";
            }

            while(objectListItr.hasNext())
            {
                Map objectMap           = (Map) objectListItr.next();
                String ObjectId         = (String)objectMap.get(DomainConstants.SELECT_ID);
                
                StringList elemHtmlList = new StringList();
                DomainObject domObj     = new DomainObject(ObjectId);
                
                String classTitle           = (String)domObj.getInfo(context, DomainConstants.SELECT_ATTRIBUTE_TITLE);
                if (UIUtil.isNullOrEmpty(classTitle)) {
                	classTitle           = (String)domObj.getInfo(context, DomainConstants.SELECT_NAME);
                }
                MapList parentClasses   = (MapList)domObj.getRelatedObjects(context,
                                            LibraryCentralConstants.RELATIONSHIP_SUBCLASS,  // relationship pattern
                                            LibraryCentralConstants.QUERY_WILDCARD,         // type pattern
                                            selectStmts,        // Object selects
                                            null,               // relationship selects
                                            true,               // from
                                            false,              // to
                                            (short)0,           // expand level
                                            null,               // object where
                                            null,               // relationship where
                                            0);                 // limit
                parentClasses           = parentClasses.sortStructure(context,DomainConstants.SELECT_LEVEL,"descending","emxSortNumericAlphaSmallerBase");
                Iterator itr            = parentClasses.iterator();
                while (itr.hasNext())
                {
                    Map parentClassMap      = (Map) itr.next();
                    String parentclassName  = (String)parentClassMap.get(DomainConstants.SELECT_NAME);
                    String parentClassId    = (String)parentClassMap.get(DomainConstants.SELECT_ID);
                    String parentClassTitle    = (String)parentClassMap.get(DomainConstants.SELECT_ATTRIBUTE_TITLE);
                    elemHtmlList.add(renderPathElem(context, (UIUtil.isNullOrEmpty(parentClassTitle)) ? parentclassName : parentClassTitle,parentClassId,reportFormat ));
                }
                elemHtmlList.add(renderPathElem(context, classTitle,ObjectId,reportFormat));
                classficationPaths.add(pathWrapperOpen +FrameworkUtil.join(elemHtmlList, elemSeperator) +pathWrapperClose);
            }
        }
        catch(Exception err)
        {
            throw new FrameworkException (err);
        }
        return classficationPaths;
    }

    /**
     * This method renders the href for given object
     *
     * @param strName the name of the object
     * @param strObjectId the objectId
     * @return String - href
     * @throws Exception if the operation fails
     */
    public String renderPathElem(Context context, String strName, String strObjectId, String reportFormat)
    throws FrameworkException
    {
        if (reportFormat != null) {
            return strName;
        }
        /*If the Library/Class name contains "&" character, we need to replace it with the code "amp;" because getXML() of BPS code base
        doesn't support the "&" character.
        IR-261969 */
        /* Removed changes  "&" character replaced with "amp;" as BPS supporting & character now*/
        /* removed the encodeForHTML wrap, as it is messing up when french chars are present in the object name
        BPS does this again for programHTML fields inside SB code, which causing double encoding
        IR-261969 */
         return "<a href=\"javascript:void(0)\" onClick=\"javascript:showModalDialog('../common/emxTree.jsp?objectId="
         + XSSUtil.encodeForJavaScript(context, strObjectId) + "','860','520');\" >" + XSSUtil.encodeForXML(context, strName) + "</a>";
    }

    /**
     * This method returns exclude class id for classify/reclassify
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - object Id
     * @return StringList - exlussion Ids
     * @throws Exception if the operation fails
     */
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList getClassificationExclusionIds(Context context,String[] args)
    throws FrameworkException
    {
        StringList slExclusionIds  = new StringList();
        try {
            HashMap paramMap        = (HashMap)JPO.unpackArgs(args);
            String objectId         = (String)paramMap.get("objectId");
            DomainObject domObj     = new DomainObject(objectId);
            slExclusionIds          = domObj.getInfoList(context, "to["+ LibraryCentralConstants.RELATIONSHIP_CLASSIFIED_ITEM+"].from.id");
            
			// PSA11 - IR-664909-3DEXPERIENCER2020x -Start
			//StringBuffer sbWhereExpression  = new StringBuffer("current.access[fromconnect]~~FALSE");
			StringBuffer sbWhereExpression  = new StringBuffer("current.access[fromconnect] == FALSE");
            sbWhereExpression.append(" && (policy == " + LibraryCentralConstants.POLICY_CLASSIFICATION + " || policy == \"" + POLICY_DOCUMENT_CLASSIFICATION + "\")");
			String commaSeparatedTypeList = "";  
			// PSA11 - End
			
            // find the allowed types used for search
            String[] types     = new String[0];
            String field       = (String)paramMap.get("field");
            if(!UIUtil.isNullOrEmpty(field)){
                StringTokenizer fieldValues = new StringTokenizer(field,"=:");
                while(fieldValues.hasMoreTokens()){
                    String fieldValue  = fieldValues.nextToken();
                    if(fieldValue.equalsIgnoreCase("TYPES")){
						commaSeparatedTypeList = fieldValues.nextToken();
                        //types = fieldValues.nextToken().split(",");
                        break;
                    }
                }
            }
            // find the objects of allowed types and not having fromconnect access
            StringList objSelects   = new StringList();
            objSelects.add(DomainConstants.SELECT_ID);
            //for(int i=0;i<types.length;i++){
                //MapList mlExcludeOIDs = DomainObject.findObjects(context, types[i], "*", sbWhereExpression.toString(), objSelects);
				MapList mlExcludeOIDs = DomainObject.findObjects(context, commaSeparatedTypeList, "*", sbWhereExpression.toString(), objSelects);
                for(int j=0;j<mlExcludeOIDs.size();j++){
                    Map map = (Map)mlExcludeOIDs.get(j);
                    String excludeOID = (String)map.get(DomainObject.SELECT_ID);
                    if(!slExclusionIds.contains(excludeOID)){
                        slExclusionIds.add(excludeOID);
                    }
                }
            //}
        }catch (Exception ex) {
            throw new FrameworkException (ex);
        }
        return slExclusionIds;
    }

    /**
     * This method returns search query for Library field
     * during classification/reClassification
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - object Id
     *        1 - rowIds
     * @return String - the search query
     * @throws Exception if the operation fails
     */
    public String getLibrayDynamicQuery(Context context,String args[])
    throws Exception {
        HashMap programMap  = (HashMap)JPO.unpackArgs(args);
        HashMap requestMap  = (HashMap)programMap.get("requestMap");
        String objectId     = (String) requestMap.get("objectId");
        DomainObject doObj  = new DomainObject(objectId);
        String type         = doObj.getInfo(context,DomainObject.SELECT_TYPE);
        String dyanmicQuery = "";
		// Changes done by PSA11 start(IR-513436-3DEXPERIENCER2018x).
        if (doObj.isKindOf(context, TYPE_PART)) {
            dyanmicQuery    = "TYPES=type_GeneralLibrary,type_PartLibrary";
        }else if (doObj.isKindOf(context, TYPE_DOCUMENTS)) {
            dyanmicQuery    = "TYPES=type_GeneralLibrary,type_Library";
        }else{
            dyanmicQuery = "TYPES=type_GeneralLibrary";
        }
        return dyanmicQuery;
    }

    /**
     * This method returns search query for Class field
     * during classification/reClassification
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - object Id
     *        1 - rowIds
     * @return String - the search query
     * @throws Exception if the operation fails
     */
    public String getClassDynamicQuery(Context context,String args[])
    throws Exception
    {
        HashMap programMap  = (HashMap)JPO.unpackArgs(args);
        Map fieldValuesMap  = (HashMap)programMap.get("fieldValues");
        HashMap requestMap  = (HashMap)programMap.get("requestMap");
        String objectId     = (String) requestMap.get("objectId");
        String dyanmicQuery = "";
        DomainObject doObj  = new DomainObject(objectId);
        String type         = doObj.getInfo(context,DomainObject.SELECT_TYPE);
		// Changes done by PSA11 start(IR-513436-3DEXPERIENCER2018x).
        if (doObj.isKindOf(context, TYPE_PART)) {
            dyanmicQuery    = "TYPES=type_GeneralClass,type_PartFamily";
        }else if (doObj.isKindOf(context, TYPE_DOCUMENTS)) {
            dyanmicQuery    = "TYPES=type_GeneralClass,type_DocumentFamily";
        }else{
            dyanmicQuery = "TYPES=type_GeneralClass";
        }
        String librayId     = fieldValuesMap.containsKey("LibraryOID") ? (String)fieldValuesMap.get("LibraryOID") : "";
        dyanmicQuery        += !"".equals(librayId) ? ":REL_SUBCLASS_FROM_ID="+librayId : "";

        return dyanmicQuery;
    }

    /**
     * This method updates Class filed during classification/reclassification
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - objectId
     *        1 - rowIds
     *        2 - ClassOID
     * @throws Exception if the operation fails
     */
    public void updateClassField(Context context, String[] args)
    throws Exception
    {
        HashMap programMap          = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap          = (HashMap) programMap.get("requestMap");
        String classificationMode   = extractVal(requestMap.get("classificationMode"));
        String objectId             = extractVal(requestMap.get("objectId"));
        String newClassId           = extractVal(requestMap.get("ClassOID"));
        StringList slNewClassIds    = FrameworkUtil.split(newClassId, "|");
        if(classificationMode != null && !"null".equals(classificationMode) && "classification".equals(classificationMode)) {
            for (int i = 0; i < slNewClassIds.size() ; i++) {
                Classification.addEndItems(context, (String)slNewClassIds.get(i), new String[]{objectId});
            }
        }else if(classificationMode != null && !"null".equals(classificationMode) && "reClassification".equals(classificationMode)) {
            String oldClassId       = extractVal(requestMap.get("selectedClassIds"));
            for (int i = 0; i < slNewClassIds.size() ; i++) {
                oldClassId = (i == 0)? oldClassId :null;
                Classification.reclassify(context, new String[]{objectId}, oldClassId, (String)slNewClassIds.get(i));
            }
        }
    }

    /**
     * This method is necessary because some forms, e.g. emxForm.jsp, submit
     * requestMaps wherein each value is an array of strings, out of which
     * we will always want the first element.  Most other forms submit a
     * string value for each param value.  This method hides that difference.
     *
     * @param valObj the  string/string array
     * @returns String
     * @throws Exception if the operation fails
     */
    private static String extractVal(Object valObj) {
        String[] strArr = {};
        if (valObj !=null && valObj.getClass() == strArr.getClass()) {
            return ((String[])valObj)[0];
        } else if (valObj !=null && valObj.getClass() == String.class) {
            return (String)valObj;
        } else {
            return "";
        }
    }
}
