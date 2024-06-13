/*
**  emxDomainAccess
**
**  Copyright (c) 1992-2020 Dassault Systemes.
**  All Rights Reserved.
**  This program contains proprietary and trade secret information of MatrixOne,
**  Inc.  Copyright notice is precautionary only
**  and does not evidence any actual or intended publication of such program.
**
*/

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.Vector;
import matrix.db.BusinessObjectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.CacheUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.StringUtil;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;


/**
 */
public class emxDomainAccessBase_mxJPO {


    private static final String FROM_PROJECT = "from.project";
	private static final String FROM_ORGANIZATION = "from.organization";
	private static final String CURRENT_ACCESS_CHANGEOWNER = "current.access[changeowner]";
	private static final String PROJECT_MATURITY = "project.maturity";
	private static final String TYPE_DOCUMENTS = "type_DOCUMENTS";
	private static final String DOMAINACCESS_READ = "Read";
	private static final String ORGANIZATION = "organization";
	private static final String RELATIONSHIP_TASK_DELIVERABLE = "relationship_TaskDeliverable";
	/**
     * read access.
     */
    public static final String READ = "Read";                     //"emxTeamReadAccess";
    /**
     * read/write access.
     */
    public static final String READ_WRITE = "Read Write";         //"emxTeamReadWriteAccess";
    /**
     * add access.
     */
    public static final String ADD = "Add";                       //"emxTeamAddAccess";
    /**
     * remove access.
     */
    public static final String REMOVE = "Remove";                 //"emxTeamRemoveAccess";
    /**
     * add/remove access.
     */
    public static final String ADD_REMOVE = "Add Remove";         //"emxTeamAddRemoveAccess";
    /**
     * Full access.
     */
    public static final String FULL = "Full"; //"emxTeamWorkspaceLeadAccess"
    /**
     * Basic access.
     */
    public static final String BASIC = "Basic";

	/**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation
     * @since V6R2011x
     * @grade 0
     */
    public emxDomainAccessBase_mxJPO(Context context, String[] args)
      throws Exception
    {
        //super(context, args);
    }

    @SuppressWarnings("deprecation")
    public void assignSecurityContext(Context context, String[] args) throws Exception
    {
        boolean transaction = false;
        try
        {
            // Verify that enough parameter are available to avoid array index out of bound exceptions.
            if( args.length >= 6 )
            {
                String relType = args[0];
                String relMember = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_Member);
                // Verify that relationship type is Member if not this trigger doesn't need to be run.
                if( relMember.equals(relType) )
                {
                    String typePerson = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_type_Person);
                    String toType = args[1];
                    // Verify that to type of the object is Person if not this trigger doesn't need to be run.
                    if( typePerson.equals(toType) )
                    {
                        String companyId = args[2];
                        String typeOrganization = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_type_Organization);
                        String sResult = MqlUtil.mqlCommand(context,"print bus $1 select $2 dump",companyId,"type.kindof["+  typeOrganization +"]");
                        // Verify that from type of the object is kind of Organization if not this trigger doesn't need to be run.
                        if ("TRUE".equalsIgnoreCase(sResult))
                        {
                        	String globalPrj = DomainAccess.getDefaultProject(context);
                        	if ("".equals(globalPrj)) {
                        		return;
                        	}
                            ContextUtil.startTransaction(context, true);
                            transaction = true;
                            String currentRole = context.getRole();
                            String currentApplication = context.getApplication();
                            try
                            {
                                ContextUtil.pushContext(context);
                                if( DomainAccess.init(context) )
                                {
                                    context.resetRole(DomainAccess.VPLMADMIN_COMPANYNAME_DEFAULT_SC);
                                    context.setApplication("VPLM");
                                }
                                String personId = args[3];
                                String attrValue = args[4];
                                String oldAttrValue = args[5];
                                StringList oldRoles = new StringList(1);
                                StringList newRoles = new StringList(1);
                                if( attrValue != null )
                                newRoles = StringUtil.split(attrValue, "~");
                                if( oldAttrValue != null )
                                oldRoles = StringUtil.split(oldAttrValue, "~");

                                StringList addedRoles = new StringList(newRoles.size());
                                StringList removedRoles = new StringList(oldRoles);
                                Iterator<?> itr = newRoles.iterator();
                                while(itr.hasNext())
                                {
                                    String addedRole = (String)itr.next();
                                    if( oldRoles.contains(addedRole) )
                                    {
                                        removedRoles.remove(addedRole);
                                    } else if(DomainAccess.BusinessRoles.contains(PropertyUtil.getSchemaProperty(context, addedRole))) {
                                        addedRoles.addElement(addedRole);
                                    }
                                }
                                DomainObject company = DomainObject.newInstance(context, companyId);
                                StringList selects = new StringList(2);
                                selects.addElement(DomainObject.SELECT_NAME);
                                selects.addElement(DomainObject.SELECT_TYPE);
                                selects.addElement(DomainObject.SELECT_REVISION);
                                selects.addElement(DomainObject.SELECT_VAULT);
                                Map<?, ?> companyMap =  company.getInfo(context, selects);
                                String companyName =  (String)companyMap.get(DomainObject.SELECT_NAME);
                                String companyType =  (String)companyMap.get(DomainObject.SELECT_TYPE);
                                String orgRev =  (String)companyMap.get(DomainObject.SELECT_REVISION);
                                //String orgVault =  (String)companyMap.get(DomainObject.SELECT_VAULT);
                                DomainObject person = DomainObject.newInstance(context, personId);
                                String personName = person.getInfo(context, DomainObject.SELECT_NAME);
                                boolean needOperationalOrg = DomainAccess.needOperationalOrg(context, personId, companyId);
                                String scCompanyName = companyName;
                                if( needOperationalOrg )
                                {
                                    //scCompanyName = companyName + "_OPERATIONAL";
                                    System.out.println("Warning:: Person " + personName + " is getting added to " + scCompanyName);
                                }
                                String relationshipAssignedSecurityContext = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_AssignedSecurityContext);
                                Iterator<?> addItr = addedRoles.iterator();
                                while(addItr.hasNext())
                                {
                                    String roleName = (String)addItr.next();
                                    String scId = DomainAccess.createSecurityContext(context, DomainAccess.getDefaultProject(context), roleName, scCompanyName, companyType, orgRev);
                                    DomainObject scObj = DomainObject.newInstance(context, scId);
                                    String scName = scObj.getInfo(context, DomainObject.SELECT_NAME);
                                    DomainRelationship.connect(context, personId, relationshipAssignedSecurityContext, scId, true);
                                    String assignedRoles = MqlUtil.mqlCommand(context, "print person $1 select assignment dump", true, personName);
                                    if( assignedRoles.indexOf(scName) < 0)
                                    {
                                        MqlUtil.mqlCommand(context, "mod person $1 assign role $2", true, personName, "ctx::"+ scName);
                                    }
                                }
                                Iterator<?> rmItr = removedRoles.iterator();
                                while(rmItr.hasNext())
                                {
                                    //mod person u1 remove assign role ctx::role_ExchangeUser.BU1.default;
                                    String roleName = (String)rmItr.next();
                                    String scId = DomainAccess.createSecurityContext(context, DomainAccess.getDefaultProject(context), roleName, scCompanyName, companyType, orgRev);
                                    DomainObject scObj = DomainObject.newInstance(context, scId);
                                    String scName = scObj.getInfo(context, DomainObject.SELECT_NAME);
                                    String personSCcmd = "print bus $1 select $2 dump";
                                    String select = "from[" + relationshipAssignedSecurityContext + "|to.name== '" + scName + "'].id";
                                    String relId = MqlUtil.mqlCommand(context, personSCcmd, person.getObjectId(), select);
                                    if( relId != null && !"".equals(relId))
                                    {
                                        DomainRelationship.disconnect(context, relId, true);
                                    }
                                    String assignedRoles = MqlUtil.mqlCommand(context, "print person $1 select assignment dump", true, personName);
                                    if( assignedRoles.indexOf(scName) >= 0)
                                    {
                                        MqlUtil.mqlCommand(context, "mod person $1 remove assign role $2", true, personName, "ctx::"+ scName);
                                    }
                                }
                                if( currentRole != null && !"".equals(currentRole) )
                                {
                                    context.resetRole(currentRole);
                                }
                                if( currentApplication != null && !"".equals(currentApplication) )
                                {
                                    context.setApplication(currentApplication);
                                }
                            }
                            catch(Exception ex )
                            {
                                ex.printStackTrace();
                                throw ex;
                            }
                            finally
                            {
                                ContextUtil.popContext(context);
                            }
                            ContextUtil.commitTransaction(context);
                        }
                    }
                }
            }
        } catch (Exception ex)
        {
            ex.printStackTrace();
            if( transaction )
                ContextUtil.abortTransaction(context);
            throw new Exception(ex);
        }
    }

    public void removePrimaryOwnership(Context context, String[] args) throws Exception
    {
        try
        {
            String busId = args[0];
            DomainObject obj = DomainObject.newInstance(context, busId);
            String project = obj.getInfo(context, DomainAccess.SELECT_PROJECT);
            if(DomainAccess.getDefaultProject(context).equals(project))
            {
                obj.removePrimaryOwnership(context);
            }
        } catch(Exception ex)
        {
            throw ex;
        }
    }
    public void assignSecurityContextCheck(Context context, String[] args) throws Exception
    {
        PropertyUtil.setGlobalRPEValue(context, "OLDATTRVALUE", args[0]);
    }

    @SuppressWarnings("deprecation")
    public void assignPersonalSecurityContext(Context context, String[] args) throws Exception
    {
        try
        {
            String companyId = args[0];
            String personId = args[1];
            //DebugUtil.debug("companyId = " + companyId);
            //DebugUtil.debug("personId  = " + personId);
            DomainObject person = DomainObject.newInstance(context, personId);
            String personName = person.getInfo(context, DomainObject.SELECT_NAME);
            DomainObject org = DomainObject.newInstance(context, companyId);
            String orgName = org.getInfo(context, DomainObject.SELECT_NAME);
            String SCName = "Grant."+ orgName +"."+ personName + "_PRJ";
            String result=MqlUtil.mqlCommand(context, "list role $1",person.getName()+"_PRJ");
            if(UIUtil.isNullOrEmpty(result))
            {
            MqlUtil.mqlCommand(context, "add role $1 asaproject parent $2 hidden", true, personName + "_PRJ","User Projects" );
            }
            result=MqlUtil.mqlCommand(context,"list role $1",SCName);
            if(UIUtil.isNullOrEmpty(result)){
				MqlUtil.mqlCommand(context, "add role $1 parent $2,$3,$4 hidden", true,
                               SCName,"Grant",orgName, personName + "_PRJ");
            }
			MqlUtil.mqlCommand(context, "modify person $1 assign role $2", true, personName, SCName);
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw ex;
        }
    }
    public void deletePersonalSecurityContext(Context context, String[] args) throws Exception
    {
        try {
            String personName = args[0];
            String personalSecurityContexts = MqlUtil.mqlCommand(context, "print person $1 select $2 $3 dump", personName, "assignment[Grant*].name", "assignment[Grant*].project" );

            StringList securityContextList = StringUtil.split(personalSecurityContexts, ",");
            String personalSecurityContext = (String) securityContextList.get(0);
            String personRole = (String) securityContextList.get(1);

            String strPersonalWorkspaceType = PropertyUtil.getSchemaProperty(context, "type_PersonalWorkspace");
            MqlUtil.mqlCommand(context, "delete role $1", true, personalSecurityContext);

            String strCommand = "temp query bus $1 $2 $3  where $4 select $5 dump $6";
            String sResult = MqlUtil.mqlCommand(context, strCommand, true, strPersonalWorkspaceType, "*", "*","project=='"+personRole+"'", "id","|");

            StringList resultList = StringUtil.split(sResult, "\n");
            if(resultList.size()>0 && resultList.size() == 1){
                    StringList objectList = StringUtil.split((String)resultList.get(0), "|");
                    MqlUtil.mqlCommand(context, "delete bus $1", true, (String)objectList.get(3));
            }

            MqlUtil.mqlCommand(context, "delete role $1", true, personRole);
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
    }
    /************ APIs related to trigger manager ***************/

    public boolean createObjectOwnershipInheritance(Context context, String[] args) throws Exception  {
        String fromId = args[0];
        String toId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5];
        String isToRel = "";
        String isFromRel = "";
        if(args.length>=8){
        	isToRel = args[6]; // it should be TORELATIONSHIP macro
			isFromRel = args[7]; // it should be FROMRELATIONSHIP macro
        }        	
        if(!("true".equalsIgnoreCase(isFromRel) || "true".equalsIgnoreCase(isToRel))){
        return createObjectOwnershipInheritance(context, fromId, toId, relId, relType, fromType, toType, null, false);
        }else {
        	return true;
        }
    }

    public boolean fixObjectOwnershipInheritanceAfterModifyTo(Context context, String[] args) throws Exception  {
        String fromId = args[0];
        String toId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5];
        String newToId = args[6];
        String newToType = args[7];
        return createObjectOwnershipInheritance(context, fromId, newToId, relId, relType, fromType, newToType, null, false);
    }

    public boolean fixObjectOwnershipInheritanceAfterModifyFrom(Context context, String[] args) throws Exception  {
        String fromId = args[0];
        String toId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5];
        String newFromId = args[6];
        String newFromType = args[7];
        return createObjectOwnershipInheritance(context, newFromId, toId, relId, relType, newFromType, toType, null, false);
    }

    public boolean deleteObjectOwnershipInheritance(Context context, String[] args) throws Exception  {
        String fromId = args[0];
        String toId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5];
        return deleteObjectOwnershipInheritance(context, fromId, toId, relId, relType, fromType, toType, null, false);

    }
    public boolean createObjectOwnershipInheritanceByForce(Context context, String[] args) throws Exception  {
        String fromId = args[0];
        String toId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5];
        return createObjectOwnershipInheritance(context, fromId, toId, relId, relType, fromType, toType, null, true);
    }
    
    public boolean deleteObjectOwnershipInheritanceByForce(Context context, String[] args) throws Exception {
        String fromId = args[0];
        String toId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5];
        if ("1".equals(PropertyUtil.getGlobalRPEValue(context, "RPE_DELETE_FOLDER"))) {
			return true;
		} else {
		    if (DomainObject.RELATIONSHIP_VAULTED_OBJECTS.equals(relType)) {
                String toRevisions = MqlUtil.mqlCommand(context,
                                                        "print bus $1 select $2 $3 $4 dump $5",
                                                        toId,
                                                        "!substitute",
                                                        "majorids.minorrevisions.id",
                                                        "majorids.minorrevisions.to[Vaulted Objects|from.id==" + fromId + "]",
                                                        "|");
                
                String[] revisionList = toRevisions.split("[|]");
                for (int i= revisionList.length/2;i<revisionList.length;i++) {
                    if (revisionList[i].equalsIgnoreCase("TRUE"))
                        return true;
                }
                
                //Remove Ownership from all objects
                for (int i=0;i<revisionList.length/2;i++) {
                    if (!toId.equals(revisionList[i])) {
                        DomainAccess.deleteObjectOwnership(context, revisionList[i], fromId, null, true);
                    }
                }
            } else if (DomainConstants.TYPE_DOCUMENT.equalsIgnoreCase(toType)) { //existing check exists for other rel types
			    DomainObject domainObject = new DomainObject(toId);
				BusinessObjectList  lists = domainObject.getRevisions(context);    	
				String oldRevisionId = "";
				int sizeOfRevisions = lists.size();
				if (sizeOfRevisions > 1) {
					for (int i=0; i< sizeOfRevisions; i++) {
						oldRevisionId = lists.getElement(i).getObjectId();
						if (!oldRevisionId.equals(toId))
							DomainAccess.deleteObjectOwnership(context, oldRevisionId,fromId,null, true);
					}
				}
			}
        	return deleteObjectOwnershipInheritance(context, fromId, toId, relId, relType, fromType, toType, null, true);
		}
    }
    
    public boolean createObjectOwnershipInheritance(Context context, String fromId, String toId, String relId, String relType, String fromType, String toType, String comment, boolean runAsUserAgent) throws Exception  {
        String attrAccessTypeSelect = DomainObject.getAttributeSelect(PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_attribute_AccessType));
		String context_Person = context.getUser();
		ContextUtil.pushContext(context, null, null, null);
        DomainObject obj = DomainObject.newInstance(context, toId);
        StringList objectSelects = new StringList(attrAccessTypeSelect);
        objectSelects.addElement(DomainConstants.SELECT_TYPE);
        objectSelects.addElement(DomainConstants.SELECT_OWNER);
        Map objectInfo = obj.getInfo(context, objectSelects);
        String attrAccessType = (String) objectInfo.get(attrAccessTypeSelect);
        String owner = (String) objectInfo.get(DomainConstants.SELECT_OWNER);
		if(owner.equalsIgnoreCase(context_Person)){
			runAsUserAgent = true;
		}
        boolean needGrants = true;
        boolean inheritSpecificFolderForTemplateFolder = false;
        if( DomainObject.RELATIONSHIP_VAULTED_OBJECTS.equals(relType))
        {
            needGrants = false;
            DomainObject fromObject = DomainObject.newInstance(context, fromId);
            
            String SELECT_KINDOF_CONTROLED_FOLDER = "type.kindof[" + DomainConstants.TYPE_CONTROLLED_FOLDER+ "]";
            StringList busSelects = new StringList(2);
            busSelects.addElement(DomainObject.SELECT_TYPE);
            busSelects.addElement(SELECT_KINDOF_CONTROLED_FOLDER);
            Map fromObjectInfo = fromObject.getInfo(context, busSelects);
            boolean isKindOfControlledFolder = "TRUE".equalsIgnoreCase((String) fromObjectInfo.get(SELECT_KINDOF_CONTROLED_FOLDER));
            
            if( fromType == null || "".equals(fromType) )
            {
              fromType = (String) fromObjectInfo.get(DomainObject.SELECT_TYPE);
            }
            
            if(fromType.equals(DomainObject.TYPE_PROJECT_VAULT) || isKindOfControlledFolder)
            {
                String attribute_FOLDER_CLASSIFICATION = PropertyUtil.getSchemaProperty(context, "attribute_FolderClassification");
                String selectFolderClassification = "attribute["+ attribute_FOLDER_CLASSIFICATION +"]";
                String folderClassification = fromObject.getInfo(context, selectFolderClassification);
                StringList contentTypesList = new StringList();
                if("Shared".equals(folderClassification) ) {
                    try
                    {
						contentTypesList = getBMAccessContentTypesandSubtypes(context); //returns either Types from property file or Types with their subtypes
                    } catch(Exception ex) {
                        needGrants = true;
                    }
                    if( !needGrants )
                    {
                        if( toType == null || "".equals(toType) )
                        {
                            DomainObject toObject = DomainObject.newInstance(context, toId);
                            toType = toObject.getInfo(context, DomainObject.SELECT_TYPE);
                        }
                        if(contentTypesList.indexOf(toType) > -1)
                        {
                            needGrants = true;
                        }
                    }
                }
            }
        }
        
        if( DomainObject.RELATIONSHIP_TASK_DELIVERABLE.equals(relType))
        {
        	String sCommandPrintStatement = "print bus $1 select $2 dump";
            String strDeliverablesInheritance = MqlUtil.mqlCommand(context, sCommandPrintStatement,fromId,DomainConstants.SELECT_ATTRIBUTE_DELIVERABLES_INHERITANCE);
        	
        	if("No".equalsIgnoreCase(strDeliverablesInheritance)) {
        		needGrants = false;
        	}
        }
        
		 ContextUtil.popContext(context);
		 
        if((attrAccessType != null) && "Specific".equals(attrAccessType))
        {
            String strInterfaceName = PropertyUtil.getSchemaProperty(context,"interface_TemplateFolder");
            String sCommandPrintStatement = "print bus $1 select $2 dump";
            String sIsInterFacePresent = MqlUtil.mqlCommand(context, sCommandPrintStatement,fromId,"interface[" + strInterfaceName + "]");
            // If there is an Project Template interface on the parent we want to inherit even Specific Folders
            if("true".equalsIgnoreCase(sIsInterFacePresent)){
                inheritSpecificFolderForTemplateFolder = true;
            }

            //  Add the user creating the folder to SOV with Full access for Specific Folders
    		String personName = context.getUser()+"_PRJ";
            String result=MqlUtil.mqlCommand(context, "list role $1",personName);
            if(!UIUtil.isNullOrEmpty(result))
            {
				List policiesLogicalNames = DomainAccess.getObjectLogicalAccessRange(context,toId);
                String accessName = (String)policiesLogicalNames.get(policiesLogicalNames.size()-1);
                DomainAccess.createObjectOwnership(context, toId, "", personName, accessName, comment);
            }
        }

        if( needGrants && (attrAccessType == null || "".equals(attrAccessType) || !"Specific".equals(attrAccessType) || inheritSpecificFolderForTemplateFolder))
        {
        	DomainAccess.createObjectOwnership(context, toId, fromId, comment, runAsUserAgent);
        }

        return true;
    }

    public boolean deleteObjectOwnershipInheritance(Context context, String fromId, String toId, String relId, String relType, String fromType, String toType, String comment, boolean runAsUserAgent) throws Exception  {
        String attrAccessTypeSelect = DomainObject.getAttributeSelect(PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_attribute_AccessType));
        DomainObject obj = DomainObject.newInstance(context, toId);
        String attrAccessType = obj.getInfo(context, attrAccessTypeSelect);
        if( attrAccessType == null || "".equals(attrAccessType) || !"Specific".equals(attrAccessType))
        {
          DomainAccess.deleteObjectOwnership(context, toId, fromId, comment, runAsUserAgent);
        }
        return true;
    }


    /* Added this method to remove the Ownership bit which we got from the parent( relationship create tigger) */

    public boolean deleteObjectOwnershipInheritanceUtilty(Context context, String[] args) throws Exception  {
    	String toId = args[0];
        String fromId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5];

        StringList busSel =  new StringList(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
        DomainObject documentObj = new DomainObject();
        documentObj.setId(toId);

        Map busMap = documentObj.getInfo(context, busSel);
        if ("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) {
        	String strComment =  "Ownership Inheritance from "+ fromType;

        	if(!DomainAccess.hasObjectOwnership(context, toId, fromId, strComment)){
        		strComment = null;
        	}
            boolean runAsSuperUser = false;
        	DomainAccess.deleteObjectOwnership(context, toId, fromId, strComment, runAsSuperUser);
            return true;
       }else {
        	return true;
       }

    }
    public boolean deleteObjectOwnershipInheritanceUtility(Context context, String[] args) throws Exception  {
    	return deleteObjectOwnershipInheritanceUtilty(context,args);
    }
    public boolean createObjectOwnershipInheritanceUtility(Context context, String[] args) throws Exception  {
        String toId = args[0];
        String fromId = args[1];
        String fromType = args[4];
        //below Parameters are already available from Trigger program.
        //String relId = args[2];
        //String relType = args[3];
        //String toType = args[5];

        DomainObject documentObj = new DomainObject();
        documentObj.setId(toId);
        StringList busSel =  new StringList(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
        Map busMap = documentObj.getInfo(context, busSel);
        String comment ="Ownership Inheritance from " + fromType;
        if ("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) {
             DomainAccess.createObjectOwnership(context, toId, fromId, comment, false);
             return true;
        }else{
             return true;
        }
    }


	public boolean createObjectOwnershipInheritanceTaskDelivarables(Context context, String[] args) throws Exception {
		String toId = args[0];
		String fromId = args[1];
		/*String relId = args[2];
		String relType = args[3];
		String fromType = args[4];
		String toType = args[5];*/
		String relTaskDeliverable = PropertyUtil.getSchemaProperty(context, RELATIONSHIP_TASK_DELIVERABLE);
		StringList selectables = new StringList();
		selectables.add(ORGANIZATION);
		selectables.add(DomainAccess.SELECT_PROJECT);
		selectables.add(PROJECT_MATURITY);
		selectables.add("to[" + relTaskDeliverable + "]."+FROM_ORGANIZATION);
		selectables.add("to[" + relTaskDeliverable + "]."+FROM_PROJECT);
		selectables.add(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
		//String typeDoc = PropertyUtil.getSchemaProperty(context, TYPE_DOCUMENTS);
		DomainObject documentObj = DomainObject.newInstance(context, toId);
		@SuppressWarnings("unchecked")
		Map<String, String> documentMap = documentObj.getInfo(context, selectables);
		String sTaskComapany = documentMap.get("to[" + relTaskDeliverable + "]."+FROM_ORGANIZATION);
		String sTaskProject = documentMap.get("to[" + relTaskDeliverable + "]."+FROM_PROJECT);
		String sDocComapany = documentMap.get(ORGANIZATION);
		String sDocProject = documentMap.get(DomainAccess.SELECT_PROJECT);
		boolean hasCrossOrg = UIUtil.isNotNullAndNotEmpty(sTaskComapany) && UIUtil.isNotNullAndNotEmpty(sDocComapany)
				&& (!sTaskComapany.equals(sDocComapany) || !sTaskProject.equals(sDocProject)) ? true : false;
		if ("true".equalsIgnoreCase((String) documentMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) {
			DomainAccess.createObjectOwnership(context, toId, fromId, null, false);
			if (hasCrossOrg) {
				DomainAccess.createObjectOwnership(context, toId, sTaskComapany, sTaskProject, DOMAINACCESS_READ,
						DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
			}
			return true;
		} else {
			return true;
		}
	}

public boolean createObjectOwnershipInheritanceForReferenceDocuments(Context context, String[] args) throws Exception  {
        String fromId = args[0];
        String toId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5];
		
		//FUN128276 : disable trigger from Reference Document relationship to avoid ownership transfer
		String strDisableOwnershipInheritance = context.getCustomData("disableOwnershipInheritance");
        if(!(strDisableOwnershipInheritance==null||strDisableOwnershipInheritance.isEmpty()))
		  return true;
		// check if the type is Issue
		boolean isIssueType = isTypeIssue(context, fromType);
		
		// Check if the From Object is Issue type then skip adding ownership approach
		if(isIssueType){
			return true;
		}
		
        String typeDoc = PropertyUtil.getSchemaProperty(context,TYPE_DOCUMENTS);

        DomainObject documentObj = new DomainObject();
        documentObj.setId(toId);

        StringList busSel =  new StringList("type.kindof["+ typeDoc + "]");
        busSel.add(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
        Map busMap = documentObj.getInfo(context, busSel);
        String comment ="Ownership Inheritance from " + fromType;
        boolean runAsSuperUser = false;
        if ("true".equalsIgnoreCase((String)busMap.get("type.kindof["+ typeDoc + "]")) && "true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) {
             return createObjectOwnershipInheritance(context, fromId, toId, relId, relType, fromType, toType, comment, runAsSuperUser);
        }else{
             return true;
        }
    }

	private static boolean isTypeIssue(Context context, String fromType) throws Exception{
        Set<String> issueTypesSet = new HashSet<String>();

		issueTypesSet = (Set)CacheUtil.getCacheObject(context,"ISSUE_TYPE_HIERARCHY");

		if (issueTypesSet == null ) {

			issueTypesSet = new HashSet<String>();

            String strResult = MqlUtil.mqlCommand(context, "print type $1 select derivative dump $2", "Issue", "|");  

            for (String sType : strResult.split(",")) {
                issueTypesSet.add(PropertyUtil.getSchemaProperty(context, sType));
            }

			issueTypesSet.add("Issue");

			CacheUtil.setCacheObject(context, "ISSUE_TYPE_HIERARCHY", issueTypesSet);
         }
        return issueTypesSet.contains(fromType);
     }


@SuppressWarnings("deprecation")
public boolean createObjectOwnershipInheritanceForRoutes(Context context, String[] args) throws Exception  {
    String fromId = args[0];
    String toId = args[1];
    String relId = args[2];
    String relType = args[3];
    String fromType = args[4];
    String toType = args[5];

    String typeRoute = PropertyUtil.getSchemaProperty(context,"type_Route");

    DomainObject documentObj = new DomainObject();
    documentObj.setId(toId);
    
    StringList busSel =  new StringList("type.kindof["+ typeRoute + "]");
    busSel.add(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
    Map busMap = documentObj.getInfo(context, busSel);
    String comment ="Ownership Inheritance from " + fromType;
    String strAccess = DomainAccess.getReaderAccessName(context, toId);
    System.out.println("strAccess : "+ strAccess);
    String physicalMasks = DomainAccess.getPhysicalAccessMasks(context, toId, strAccess);
    System.out.println("strAccess : "+ physicalMasks);
    if ("true".equalsIgnoreCase((String)busMap.get("type.kindof["+ typeRoute + "]")) && "true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) {
        boolean runAsUserAgent = false;
        StringBuffer sCommand = new StringBuffer();
        sCommand.append("modify bus $1 add ownership bus $2 for $3 as ");
    	StringList mqlParam = new StringList();
    	mqlParam.add(toId);
    	mqlParam.add(fromId);
    	mqlParam.add(comment);
        String[] physicalMasksList = physicalMasks.split(",");
    	int index= 3;
    	for (int i = 0; i < physicalMasksList.length; i++) {
    		sCommand.append(" $"+ (++index));
    		if(i!=physicalMasksList.length-1){
    			sCommand.append(",");
    		}
    		mqlParam.add(physicalMasksList[i]);
		}
        MqlUtil.mqlCommand(context, sCommand.toString(), runAsUserAgent, mqlParam);
    	return true; 
    }else{
         return true;
    }
}
/** Trigger program to update Issue Assignee as SOV on the Issue Object
 * @param context
 * @param args
 * @returns boolean returns true
 * @throws Exception
 */
public boolean createObjectOwnershipForIssueAssignee(Context context, String[] args) throws Exception  {
    String toId = args[0];
    String fromId = args[1];           
    String fromType = args[2];
    String fromName = args[3];
    StringList accessNames = DomainAccess.getLogicalNames(context, toId);	    
	String defaultAccess = (String)accessNames.get(3);
	
	DomainObject busObject = new DomainObject();
	busObject.setId(toId);
    StringList busSel =  new StringList(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);  
    Map busMap = busObject.getInfo(context, busSel);
    String typeGroup = PropertyUtil.getSchemaProperty(context,"type_Group");
    String typeGroupProxy = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
    if ("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) { 
		if(typeGroup.equalsIgnoreCase(fromType) || typeGroupProxy.equalsIgnoreCase(fromType)) {
    		 DomainObject fromObj = new DomainObject(fromId);
    		 DomainAccess.createObjectOwnershipForUserGroups(context, toId, fromName, defaultAccess, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED);
    	 } else {
    		 DomainAccess.createObjectOwnership(context, toId, fromId, defaultAccess, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED);
    	 }	
    }
	return true;
}

/** Trigger program to remove SOV of Issue Assignee on the Issue Object
 * @param context
 * @param args
 * @returns boolean returns true
 * @throws Exception
 */
public boolean clearObjectOwnershipForIssueAssignee(Context context, String[] args) throws Exception  {
  String toId = args[0];
	String assigneeName = args[1];
	String fromType = args[2];      
	StringList accessNames = DomainAccess.getLogicalNames(context, toId);	    
	String defaultAccess = (String)accessNames.get(accessNames.size() - 1);
		
  DomainObject documentObj = new DomainObject();
  documentObj.setId(toId);
  StringList busSel =  new StringList(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
  busSel.add("attribute["+DomainConstants.ATTRIBUTE_CO_OWNER+"]");
  
  Map busMap = documentObj.getInfo(context, busSel);
	String typeGroup = PropertyUtil.getSchemaProperty(context,"type_Group");
	String typeGroupProxy = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
	String coowner = (String)busMap.get("attribute["+DomainConstants.ATTRIBUTE_CO_OWNER+"]");
	
	if("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) {
		if(typeGroup.equals(fromType) || typeGroupProxy.equals(fromType)) {
			
			 StringList coownerList = StringUtil.split(coowner, "~");
			 
			// add ownership for co-owner if assignee is also co-owner
			 if(coownerList.contains(assigneeName)) {
				 String personId=PersonUtil.getPersonObjectID(context,assigneeName);
				DomainAccess.createObjectOwnership(context, toId, personId, defaultAccess, DomainAccess.COMMENT_GRANTING_ACCESS);
			 }
			 
			// remove assignee ownership
			if(DomainAccess.hasObjectOwnership(context, toId, "", assigneeName,DomainAccess.COMMENT_MULTIPLE_OWNERSHIP)){
				DomainAccess.deleteObjectOwnership(context, toId, "",assigneeName, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, false);
	        } 
			if(DomainAccess.hasObjectOwnership(context, toId, "", assigneeName,DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED)){
	        	DomainAccess.deleteObjectOwnership(context, toId, "",assigneeName, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED, false);
	        }
			
			return true;
    
		} else {
 		    String cmd = "print role $1 select person dump";
			String result = MqlUtil.mqlCommand(context, cmd, assigneeName+"_PRJ");
			if (assigneeName.equals(result)) { 
				
				StringList coownerList = StringUtil.split(coowner, "~");
				 
				// add ownership for co-owner if assignee is also co-owner
				 if(coownerList.contains(assigneeName)) {
					 String personId=PersonUtil.getPersonObjectID(context,assigneeName);
					DomainAccess.createObjectOwnership(context, toId, personId, defaultAccess, DomainAccess.COMMENT_GRANTING_ACCESS);
				 }
				
				// remove assignee ownership
				if(DomainAccess.hasObjectOwnership(context, toId, "", assigneeName+"_PRJ",DomainAccess.COMMENT_MULTIPLE_OWNERSHIP)){
					DomainAccess.deleteObjectOwnership(context, toId, "",assigneeName+"_PRJ", DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, false);
		        } 
				if(DomainAccess.hasObjectOwnership(context, toId, "", assigneeName+"_PRJ",DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED)){
		        	DomainAccess.deleteObjectOwnership(context, toId, "",assigneeName+"_PRJ", DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED, false);
		        }
       			return true;
			}
		}
	}
    return true;
}
/** Trigger program to update Meetings Assignee on the Meeting Object
 * @param context
 * @param args
 * @returns boolean returns true
 * @throws Exception
 */
public boolean createObjectOwnershipForMeetingAssignee(Context context, String[] args) throws Exception  {
    String toId = args[0];
    String fromId = args[1];           
    String fromType = args[2];
    String fromName = args[3];
    StringList accessNames = DomainAccess.getLogicalNames(context, toId);	    
	String defaultAccess = (String)accessNames.get(0);
	DomainObject busObject = new DomainObject();
	busObject.setId(toId);
    StringList busSel =  new StringList(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);  
    Map busMap = busObject.getInfo(context, busSel);
    String typeGroup = PropertyUtil.getSchemaProperty(context,"type_Group");
    String typeGroupProxy = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
    if ("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) { 
		if(typeGroup.equalsIgnoreCase(fromType) || typeGroupProxy.equalsIgnoreCase(fromType)) {
    		 DomainAccess.createObjectOwnershipForUserGroups(context, toId, fromName, defaultAccess, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
    	 } else {
    		 DomainAccess.createObjectOwnership(context, toId, fromId, defaultAccess, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
    	 }	
    }
	return true;
}

/** Trigger program to remove SOV of Meetings Assignee on the Meeting Object
 * @param context
 * @param args
 * @returns boolean returns true
 * @throws Exception
 */
public boolean clearObjectOwnershipForMeetingAssignee(Context context, String[] args) throws Exception  {
	String toId = args[0];
	String assigneeName = args[1];
	String fromType = args[2];      
	DomainObject meetingObject = new DomainObject();
	meetingObject.setId(toId);
	StringList busSel =  new StringList(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
	Map busMap = meetingObject.getInfo(context, busSel);
	String typeGroup = PropertyUtil.getSchemaProperty(context,"type_Group");
	String typeGroupProxy = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
	if("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) {
		if(typeGroup.equals(fromType) || typeGroupProxy.equals(fromType)) {
			DomainAccess.deleteObjectOwnership(context, toId, "",assigneeName, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, false);
			return true;
		} else {
			String cmd = "print role $1 select person dump";
			String result = MqlUtil.mqlCommand(context, cmd, assigneeName+"_PRJ");
			if (assigneeName.equals(result)) { 
				DomainAccess.deleteObjectOwnership(context, toId, "", assigneeName+"_PRJ", DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, false);
				return true;
			}
		}
	}
	return true;
}
public boolean createObjectOwnershipInheritanceForIssues(Context context, String[] args) throws Exception  {

    String fromId = args[0];
    String toId = args[1];
    String relId = args[2];
    String relType = args[3];
    String fromType = args[4];
    String toType = args[5];

    String typeDoc = PropertyUtil.getSchemaProperty("type_Issue");

    DomainObject documentObj = new DomainObject();
    documentObj.setId(toId);

    StringList busSel =  new StringList("type.kindof["+ typeDoc + "]");
    busSel.add(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
    Map busMap = documentObj.getInfo(context, busSel);
    String comment ="Ownership Inheritance from " + toType;
    boolean runAsSuperUser = false;
    if ("true".equalsIgnoreCase((String)busMap.get("type.kindof["+ typeDoc + "]")) && "true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) {
                  return createObjectOwnershipInheritance(context, fromId, toId, relId, relType, fromType, toType, comment, runAsSuperUser);
    }else{
         return true;
    }
}

public void createObjectOwnershipInheritanceOnRevise(Context context, String[] args) throws Exception  {

	 String oldObjectId = args[0];
	 String typeDoc = PropertyUtil.getSchemaProperty(context, "type_Document");
	 String documentPolicy=PropertyUtil.getSchemaProperty(context, "policy_Document");
	 StringList busSel =  new StringList("type.kindof["+ typeDoc + "]");
	 busSel.add("next.current.access[changesov]");
	 busSel.add("next.id");
	 busSel.add("next.owner");
	 busSel.add(DomainConstants.SELECT_POLICY);
	 DomainObject documentObj = new DomainObject();
	 documentObj.setId(oldObjectId);
	 Map busMap = documentObj.getInfo(context, busSel);
	 String changeowner=(String)busMap.get("next.current.access[changesov]");
     String objectId = (String) busMap.get("next.id");
     String owner = (String) busMap.get("next.owner");
     String kindOf=(String) busMap.get("type.kindof["+ typeDoc + "]");
     String policy=(String) busMap.get(DomainConstants.SELECT_POLICY);
    if(("true".equalsIgnoreCase(kindOf) && "true".equalsIgnoreCase(changeowner)) && policy.equalsIgnoreCase(documentPolicy))
     {
   	 	String personId=PersonUtil.getPersonObjectID(context,owner);
   	 	StringList accessNames = DomainAccess.getLogicalNames(context, objectId);
   	 	String ownerAccess = (String)accessNames.get(accessNames.size()-2);

   	 	DomainAccess.createObjectOwnership(context, objectId, personId, ownerAccess, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP,true);

     }
}

public boolean createObjectOwnershipInheritanceWithChangeSOVCheck(Context context, String[] args) throws Exception  {
    String fromId = args[0];
    String toId = args[1];
    String relId = args[2];
    String relType = args[3];
    String fromType = args[4];
    String toType = args[5];
	
	//FUN128276 : disable trigger from Reference Document relationship to avoid ownership transfer
		String strDisableOwnershipInheritance = context.getCustomData("disableOwnershipInheritance");
        if(!(strDisableOwnershipInheritance==null||strDisableOwnershipInheritance.isEmpty()))
		  return true;
	  
	// check if the type is Issue
	boolean isIssueType = isTypeIssue(context, fromType);
		
	// Check if the From Object is Issue type then skip adding ownership approach
	if(isIssueType){
		return true;
	}

    DomainObject documentObj = new DomainObject();
    documentObj.setId(toId);
    String result = MqlUtil.mqlCommand(context, "print type $1 select composed dump", toType);
    boolean isComposee = Boolean.parseBoolean(result);

    String hasSOV = documentObj.getInfo(context, "current.access[changesov]");
    boolean allowInheritance = DomainAccess.allowTypeInheritOwnership(context, toType, relType);
    if ("true".equalsIgnoreCase(hasSOV) && allowInheritance && !isComposee) {
         return createObjectOwnershipInheritance(context, fromId, toId, relId, relType, fromType, toType, null, false);
    }else{
         return true;
    }
}

    /************ APIs related to UI SB table component. ***************/
    @com.matrixone.apps.framework.ui.ProgramCallable
    static public MapList getObjectAccessList(Context context, String[] args) throws Exception {
        Map<?, ?> programMap = (Map<?, ?>) JPO.unpackArgs(args);
        String id = (String) programMap.get("objectId");
        if (id == null) {
            Map<?, ?> paramList = (Map<?, ?>) programMap.get("paramList");
            id = (String) paramList.get("objectId");
        }
        if (id.indexOf(':') != -1) { //if id is one of the access masks, then ignore.
            return new MapList();
        }
        MapList results = DomainAccess.getAccessSummaryList(context, id);
        DomainObject domainObject = new DomainObject(id);
        if(domainObject.isKindOf(context, DomainConstants.TYPE_WORKSPACE_VAULT)){
            String wVaultOwner = domainObject.getInfo(context, DomainConstants.SELECT_OWNER);
            String[] param = {id};
            String workspaceId ="";
            workspaceId= (String)JPO.invoke(context, "emxWorkspaceFolder", null, "getProjectId", JPO.packArgs(param), Object.class);
            if(UIUtil.isNotNullAndNotEmpty(workspaceId)){
            DomainObject workspaceObj = new DomainObject(workspaceId);
            String wsOwner = workspaceObj.getInfo(context, DomainConstants.SELECT_OWNER);
            wsOwner += "_PRJ";
            wVaultOwner += "_PRJ";
            Iterator resultsItr = results.iterator();
            while(resultsItr.hasNext()){
                Map mapObjects = (Map) resultsItr.next();
                String member = (String)mapObjects.get(DomainConstants.SELECT_NAME);
                if(UIUtil.isNotNullAndNotEmpty(member)&& (wsOwner.equals(member) || wVaultOwner.equals(member))){
                    mapObjects.put("disableSelection","true");
                }else{
                    mapObjects.put("disableSelection","false");
                }
            }
        }
        }
        //MapList results = getAccessSummaryList(context, id);
        return results;
    }

    static public void deleteTableOwnershipData(Context context, String[] args) throws Exception {
        HashMap<?, ?> programMap = (HashMap<?, ?>) JPO.unpackArgs(args);
        //String objectId = (String) programMap.get("objectId");
        Map<?, ?> requestValuesMap = (Map<?, ?>) programMap.get("RequestValuesMap");
        String[] emxTableRowId = (String[]) requestValuesMap.get("emxTableRowId");

        if (emxTableRowId != null)
        {
            for(int i=0; i<emxTableRowId.length ; i++)
            {
                //each row contains the relationship id, object id, parent, etc.
                String ownershipRow = emxTableRowId[i];
                StringList ownershipRowInfo = FrameworkUtil.split(ownershipRow, "|");
                String ownershipId = (String) ownershipRowInfo.get(1);

                //the ownership id is a colon delimited busId, organization, project & comment.
                StringList ownershipInfo = FrameworkUtil.split(ownershipId, ":");
                String busId = (String) ownershipInfo.get(0);
                String organization = (String) ownershipInfo.get(1);
                String project = (String) ownershipInfo.get(2);
                String comment = (String) ownershipInfo.get(3);

                DomainAccess.deleteObjectOwnership(context, busId, organization, project, comment);
            }
        }
    }

    static private StringList getTableData(Context context, String[] args, String key) throws Exception {
        Map<?, ?> programMap = (Map<?, ?>) JPO.unpackArgs(args);
        MapList objectListFromArgs = (MapList) programMap.get("objectList");
        
        Map<?, ?> paramList = (Map<?, ?>) programMap.get("paramList");
        String ctxObjId = (String) paramList.get("objectId");
      
        MapList objectListFromDB = null;
        if(DomainAccess.KEY_ACCESS_GRANTED.equalsIgnoreCase(key)) {
        	objectListFromDB = DomainAccess.getAccessSummaryList(context, ctxObjId);
        }else {
        	objectListFromDB = objectListFromArgs;
        }
        
        int size = objectListFromDB.size();
        
        HashMap<String, String> colValuesFromDB = new HashMap<String, String>();
        for(int i = 0; i < size; i++) {
        	Map<?, ?> mapFromDB = (Map<?, ?>) objectListFromDB.get(i);
        	String uniqueRowIdFromDB = (String) mapFromDB.get(DomainConstants.SELECT_ID);
        	String colValueFromDB = (String) mapFromDB.get(key);
        	if(DomainAccess.KEY_ACCESS_PROJECT.equalsIgnoreCase(key)) {
        		colValueFromDB=(String) mapFromDB.get("projectTitle");
        	}
        	colValuesFromDB.put(uniqueRowIdFromDB, colValueFromDB);
        }
        
        StringList results = new StringList(objectListFromArgs.size());
        for (int i=0; i < objectListFromArgs.size(); i++) {
            Map<?, ?> mapFromArgs = (Map<?, ?>) objectListFromArgs.get(i);
            String uniqueRowIdFromArgs = (String) mapFromArgs.get(DomainConstants.SELECT_ID);

            results.addElement(colValuesFromDB.get(uniqueRowIdFromArgs));
        }
        return results;
    }

    @SuppressWarnings("unchecked")
    static public Map<String, StringList> getObjectLogicalAccessRange(Context context, String[] args) throws Exception {
        Map<?, ?> programMap = (Map<?, ?>) JPO.unpackArgs(args);
        Map<?, ?> requestMap = (HashMap<?, ?>) programMap.get("requestMap");
        String busId = (String) requestMap.get("objectId");
        HashMap<String, StringList> rangeMap = new HashMap<String, StringList>();
        List<?> fieldChoices = DomainAccess.getObjectLogicalAccessRange(context, busId);
        StringList fieldChoicesDisplay = new StringList(fieldChoices.size());
        fieldChoicesDisplay.addAll(fieldChoices);
        rangeMap.put("field_choices", fieldChoicesDisplay);
        rangeMap.put("field_display_choices", fieldChoicesDisplay);

        return rangeMap;
    }

    static public StringList getObjectAccessIds(Context context, String[] args) throws Exception {
        return getTableData(context, args, DomainAccess.KEY_ACCESS_ID);
    }

    static public StringList getObjectAccessNames(Context context, String[] args) throws Exception {
        return getTableData(context, args, DomainAccess.KEY_ACCESS_NAME);
    }

    static public StringList getOrganizations(Context context, String[] args) throws Exception {
        return getTableData(context, args, DomainAccess.KET_ACCESS_ORGTITLE);
    }

    static public StringList getProjects(Context context, String[] args) throws Exception {
        return getTableData(context, args, DomainAccess.KEY_ACCESS_PROJECT);
    }

    static public Vector getAccesses(Context context, String[] args) throws Exception {
        return getAccessDisplayValues(context,args, DomainAccess.KEY_ACCESS_GRANTED);
    }

    static public StringList getInheritedName(Context context, String[] args) throws Exception {
        return getTableData(context, args, DomainAccess.KEY_ACCESS_INHERITED_NAME);
    }

    static public StringList getComments(Context context, String[] args) throws Exception {

      Map<?, ?> programMap        = (Map<?, ?>) JPO.unpackArgs(args);
        HashMap<?, ?> requestMap    = (HashMap<?, ?>) programMap.get("paramList");
        String languageStr      = (String)requestMap.get("languageStr");

      StringList commentList = getTableData(context, args, DomainAccess.KEY_ACCESS_COMMENT);
      StringList commentListDisp = new StringList();
      String translatedComments = "";
	  String translatedPrimaryComment = "";
        String translatedGrantedComment = "";
      try
      {
          translatedComments = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.MultipleOwnership.Comments");
		  translatedPrimaryComment = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.MultipleOwnership.Primary");
          translatedGrantedComment = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.MultipleOwnership.Granted");
      } catch (Exception ex)
      {
          translatedComments = DomainAccess.COMMENT_MULTIPLE_OWNERSHIP;
      }
      for (int i = 0; i < commentList.size(); i++) {
        String comment = (String)commentList.get(i);
        if(DomainAccess.COMMENT_MULTIPLE_OWNERSHIP.equals(comment)){
          commentListDisp.addElement(translatedComments);
		  }else if("Primary".equalsIgnoreCase(comment)){
                commentListDisp.addElement(translatedPrimaryComment);
        	} else if(UIUtil.isNotNullAndNotEmpty(comment) && comment.startsWith(DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED)){
        		commentListDisp.addElement(comment.replaceFirst(DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED, translatedGrantedComment));
        } else {
          commentListDisp.addElement(comment);
        }
    }
      return commentListDisp;
    }

    static public Vector getInheritedAccess(Context context, String[] args) throws Exception {
       return getAccessDisplayValues(context,args, DomainAccess.KEY_ACCESS_INHERITED_ACCESS);
    }
    private static Vector getAccessDisplayValues(Context context, String[] args, String column) throws Exception
    {
        Map<?, ?> programMap        = (Map<?, ?>) JPO.unpackArgs(args);
        HashMap<?, ?> requestMap    = (HashMap<?, ?>) programMap.get("paramList");
        String languageStr      = (String)requestMap.get("languageStr");
        Vector returnVector= new Vector();

        StringList columnList = getTableData(context, args,column);
        StringList columnDisplayList = new StringList();
        for(int i=0; i<columnList.size(); i++){
            HashMap cellMap = new HashMap();
            String access = (String)columnList.get(i);
            String accessDisp = getAccessDisplayValue(context, access, languageStr);
            columnDisplayList.addElement(accessDisp);
            cellMap.put("ActualValue",access);
            cellMap.put("DisplayValue",accessDisp);
            returnVector.add(cellMap);
        }
        return returnVector;
    }

    /* Based on policy, determine access rights */
    static public StringList getAccessRights(Context context, String[] args) throws Exception {
        return null;
    }

    @SuppressWarnings({ "static-access", "unchecked" })
    public StringList removeLesserAccess(Context context, StringList accessList, String inheritedAccess) throws Exception {

     // AccessUtil accessUtil = new AccessUtil();

        StringList accessListSequence = new StringList();
        accessListSequence.add(0, BASIC);
        accessListSequence.add(1, READ);
        accessListSequence.add(2, READ_WRITE);
        accessListSequence.add(3, ADD);
        accessListSequence.add(4, REMOVE);
        accessListSequence.add(5, ADD_REMOVE);
        accessListSequence.add(6, FULL);

        int accessIndex = accessListSequence.indexOf(inheritedAccess);

      for(int i=0; i<accessIndex; i++){
        accessList.remove(accessListSequence.get(i));
      }
      return accessList;
    }

    public static String getAccessDisplayValue(Context context, String accesses, String languageStr) throws Exception {
        if(UIUtil.isNotNullAndNotEmpty(accesses)){
            StringBuffer accessDisps = null;
            StringTokenizer tok = new StringTokenizer(accesses,"|");
            while(tok.hasMoreTokens()){
                String access = tok.nextToken();
                if(access.contains(" ")){
                    access =FrameworkUtil.findAndReplace(access, " ", "");
                }
                String accessDisp = access;
                try
                {
                    String key = "emxFramework.Access."+access;
                    accessDisp = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), key);
                    if( key.equals(accessDisp))
                    {
                        accessDisp = access;
                    }
                } catch (Exception ex)
                {
                    //Do Nothing
                }
                if(accessDisps == null){
                    accessDisps = new StringBuffer(accessDisp);
                }else {
                    accessDisps.append("|").append(accessDisp);
                }
            }

            return accessDisps.toString();
        }
        return accesses;
    }


    /**To get the Accesses for Add Ownership
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "unchecked" })
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Map<String, StringList> getAccessRange(Context context, String[] args)
    throws Exception
    {
        Map<?, ?> programMap        = (Map<?, ?>) JPO.unpackArgs(args);
        HashMap<?, ?> requestMap    = (HashMap<?, ?>) programMap.get("requestMap");
        HashMap<?, ?> columnValues =(HashMap<?, ?>) programMap.get("columnValues");
        HashMap<String, StringList> rangeMap = new HashMap<String, StringList>();
        String languageStr      = (String)requestMap.get("languageStr");
        if(columnValues!=null && columnValues.size()>0){
        String inheritedAccess = (String)columnValues.get("Inherited Access");
        String currentAccess = (String)columnValues.get("Access");
        String objectId             = (String) requestMap.get("objectId");

        StringList tempList = FrameworkUtil.split(inheritedAccess, "|");
        inheritedAccess = (tempList.size()>0)? tempList.get(0).toString().trim():inheritedAccess;

        StringList accessList       = DomainAccess.getLogicalNames(context, objectId);
        StringList accessListCopy = new StringList();
        StringList accessListDisp   = new StringList();
        accessListCopy.addAll(accessList);

        HashMap<?, ?> rowValues =(HashMap<?, ?>) programMap.get("rowValues");
        String inheritedOId = (String) rowValues.get("objectId");
    	inheritedOId = inheritedOId.substring(0,inheritedOId.indexOf(":") > -1 ? inheritedOId.indexOf(":") : inheritedOId.length());

        if(UIUtil.isNotNullAndNotEmpty(inheritedAccess) && currentAccess.equals(inheritedAccess)){

        	String inheritedPhysicalMasks = DomainAccess.getPhysicalAccessMasks(context,inheritedOId, inheritedAccess);
        	accessListCopy = removeLesserAccess_new(context, accessListCopy, inheritedAccess, inheritedPhysicalMasks.length(),objectId, true, inheritedOId);
        }else if(UIUtil.isNotNullAndNotEmpty(currentAccess)){
        	String physicalMasks = "";
			//to restrict the less access bits, we need the parent access bits information.
        	if(objectId.equals(inheritedOId)){

        		String cmd = "print bus $1 select $2 $3 dump $4";
        		String mqlOutput = MqlUtil.mqlCommand(context, cmd, objectId, "ownership.businessobject","id","|");
        		StringList tokens = FrameworkUtil.splitString(mqlOutput, String.valueOf("|"));
        		while (true) {
        			String id = (String) tokens.remove(0);
        			if (objectId.equals(id)) {
        				break;
        			}
        			if(id != null && !"".equals(id) )
        			{
        				inheritedOId = id;
        			}
        		}
        	}

        if(UIUtil.isNotNullAndNotEmpty(inheritedAccess)){
        		physicalMasks = DomainAccess.getPhysicalAccessMasks(context,inheritedOId, inheritedAccess);
        		accessListCopy = removeLesserAccess_new(context, accessListCopy, inheritedAccess, physicalMasks.length(),objectId, true, inheritedOId);
        	}else{
        		accessListCopy = removeLesserAccess_new(context, accessListCopy, currentAccess, physicalMasks.length(),objectId);
        	}
    }

        for(int i=0; i<accessListCopy.size(); i++){
          String access = (String)accessListCopy.get(i);
          access =  access.contains("|")?access.substring(0, access.indexOf("|")):access;
          String accessDisp = getAccessDisplayValue(context, access, languageStr);
          accessListDisp.add(accessDisp);
        }

        rangeMap.put("RangeValues",accessListCopy);
        rangeMap.put("RangeDisplayValue", accessListDisp);
        }

        return rangeMap;
    }


    /**To update the access value for Add Ownership
     * @param context
     * @param args
     * @throws Exception
     */
    public void updateAccessValue(Context context, String[] args)throws Exception {
        Map<?, ?> programMap        = (Map<?, ?>) JPO.unpackArgs(args);
        HashMap<?, ?> requestMap    = (HashMap<?, ?>) programMap.get("requestMap");
        String objectId     = (String) requestMap.get("objectId");
        HashMap<?, ?> paramMap  = (HashMap<?, ?>) programMap.get("paramMap");
        String access     = (String)paramMap.get("New Value");
        String dataDetails    = (String)paramMap.get("objectId");
        StringList valueList = StringUtil.split(dataDetails, ":");
        if( valueList.size() >= 4)
        {
          String org = (String)valueList.get(1);
          String project = (String)valueList.get(2);
          String comment = (String)valueList.get(3);
          String physicalMasks = DomainAccess.getPhysicalAccessMasks(context, objectId, access);
          if(access.equals(physicalMasks)&& access.contains("|") ){
        	  if( DomainAccess.hasObjectOwnership(context, objectId, org, project, comment)){
        		  org = (org == null || DomainConstants.EMPTY_STRING.equals(org)|| DomainAccess.MULTIPLWOWNERSHIP_ADMINISTRATION.equals(org)) ? "-" : org;
        		  project = (project == null || DomainConstants.EMPTY_STRING.equals(project)|| DomainAccess.MULTIPLWOWNERSHIP_ADMINISTRATION.equals(project)) ? "-" : project;
        		  comment = (comment == null) ? DomainConstants.EMPTY_STRING : comment;
	        	  String command = "modify bus $1 remove ownership $2 $3 for $4";
	          	  MqlUtil.mqlCommand(context, command, false, objectId, org, project, comment);
        	  }
        	  //DomainAccess.createObjectOwnership(context, objectId, access.substring(access.indexOf("|")+1, access.length()), comment, false);
          }else{
        DomainAccess.createObjectOwnership(context, objectId, org, project, access, comment, true);
        }
    }
    }

    /**To get the Organizations and Projects unique combination
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public MapList getObjectList(Context context, String[] args) throws Exception
    {
        HashMap programMap  = (HashMap) JPO.unpackArgs(args);
        String userName     = (String) programMap.get("userName");
        MapList mapList     = PersonUtil.getSecurityContexts(context, userName, null);
        HashSet<Map>  hashSet = new HashSet<Map>();
        for(int i = 0; i < mapList.size(); i++){
            hashSet.add((Map)mapList.get(i));
        }
        mapList.clear();
        mapList.addAll(hashSet);
        return mapList;
    }

    /**To get the Organization
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public StringList getOrganizationToDisplay(Context context, String[] args) throws Exception
    {
        StringList orgList = new StringList();
        HashMap<?, ?> programMap = (HashMap<?, ?>)JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");
        for(int i = 0; i < objectList.size(); i++)
        {
            Map<?, ?> map         = (Map<?, ?>)objectList.get(i);
            String orgName  = (String) map.get("from[Security Context Organization].to.name");
            orgList.addElement(orgName);
        }
        return orgList;
    }

     /** To get the projects
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public StringList getProjectsToDisplay(Context context, String[] args) throws Exception
    {
        StringList projList = new StringList();
        HashMap<?, ?> programMap = (HashMap<?, ?>)JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");
        for(int i = 0; i < objectList.size(); i++)
        {
            Map<?, ?> map         = (Map<?, ?>)objectList.get(i);
            String projects = (String) map.get("from[Security Context Project].to.name");
            projList.addElement(projects);
        }
        return projList;
    }

     /**To reload the Oraganizations on change of Person with
       * Default Organization highlighted
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    @com.matrixone.apps.framework.ui.ProgramCallable
    public HashMap<String, StringList> reloadOrganizations(Context context, String[] args) throws Exception
    {
        HashMap<String, StringList> orgMap        = new HashMap<String, StringList>();
        HashMap<?, ?> fieldMap      = (HashMap<?, ?>)JPO.unpackArgs(args);
        HashMap<?, ?> fieldValue    = (HashMap<?, ?>) fieldMap.get("fieldValues");
        String userName       = (String) fieldValue.get("Name");
        if(UIUtil.isNullOrEmpty(userName)) {        	
        	userName = (String) fieldValue.get("NamewithScope");                  	
        }
        userName = userName.trim();

		/*
		 * //to get the Default Organization String defaultOrg =
		 * PersonUtil.getDefaultOrganization(context, userName); StringList resultList =
		 * PersonUtil.getOrganizations(context, userName, ""); //to remove the duplicate
		 * entries from the list resultList = removeDuplicates(resultList);
		 */ 
        Map orgRangeMap = getOrgRanges(context, userName);
        orgMap.put("RangeValues", (StringList)orgRangeMap.get("ActualValues"));
        orgMap.put("RangeDisplayValues", (StringList)orgRangeMap.get("DisplayValues"));
        
        return orgMap;
    }

      /**To reload the projects on change of the Person
       * with default Project highlighted
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    @com.matrixone.apps.framework.ui.ProgramCallable
    public HashMap<String, StringList> reloadProjects(Context context, String[] args) throws Exception
    {
        HashMap<String, StringList> projMap       = new HashMap<String, StringList>();
        HashMap<?, ?> fieldMap      = (HashMap<?, ?>)JPO.unpackArgs(args);
        HashMap<?, ?> fieldValue    = (HashMap<?, ?>) fieldMap.get("fieldValues");
        String userName       = (String) fieldValue.get("Name");
        if(UIUtil.isNullOrEmpty(userName)) {        	
        	userName = (String) fieldValue.get("NamewithScope");                  	
        }        
        userName = userName.trim();
        String Organization   = (String) fieldValue.get("Organization");

        //to get the default Project
        String defualtProj    = PersonUtil.getDefaultProject(context, userName);
        StringList resultList = PersonUtil.getProjects(context, userName, Organization);
        //to remove the duplicate entries from the list
        resultList = removeDuplicates(resultList);

        projMap.put("RangeValues", displayDefaultValueOnTop(defualtProj, resultList));

        return projMap;
    }



    /**To update the ownership of the workspace
     * @param context
     * @param args
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void updateOwnership(Context context, String[] args) throws Exception
    {
        HashMap<?, ?> fieldMap      = (HashMap<?, ?>)JPO.unpackArgs(args);
        HashMap<?, ?> requestMap    = (HashMap<?, ?>) fieldMap.get("requestMap");
        String objectId       = (String)requestMap.get("objectId");
        String owner          = (String) requestMap.get("Name");
        if(UIUtil.isNullOrEmpty(owner)) {        	
        	owner = (String) requestMap.get("NamewithScope");        	
        }
        String Organization   = (String) requestMap.get("Organization");
        String project        = (String) requestMap.get("Project");
        try{
            DomainObject domainObject = new DomainObject(objectId);
            domainObject.TransferOwnership(context, owner, project, Organization);
        } catch(Exception e){
            emxContextUtil_mxJPO.mqlNotice(context,e.getMessage());
        }
    }

    /**To remove the duplicate entries from the list
     * @param list
     * @return
     */
    @SuppressWarnings("unchecked")
    private static StringList removeDuplicates(StringList list)
    {
        HashSet<String> hashSet = new HashSet<String>();
        for(int i = 0; i < list.size(); i++)
        {
            hashSet.add((String)list.get(i));
        }
        list.clear();
        list.addAll(hashSet);
        return list;
    }

    /**To add  the members for a workspace for security context with access
         * @param context
         * @param args
         * @throws Exception
         */
        @com.matrixone.apps.framework.ui.ProgramCallable
        public void addMember(Context context, String[] args) throws Exception
        {
              try
              {
            HashMap<?, ?> paramMap      = (HashMap<?, ?>)JPO.unpackArgs(args);
            //String objectId = (String)paramMap.get("busObjId");
            String access = (String)paramMap.get("access");
            //String comment = "Multiple Ownership For Object";
            String[] ids = (String[])paramMap.get("emxTableRowIds");
            for(int i =0; i<ids.length;i++)
            {
                StringList idList = com.matrixone.apps.domain.util.StringUtil.split(ids[i], "|");
                if( idList.size() >2 )
                {
                    String busId = (String)idList.get(1);
                    String personId = (String)idList.get(0);
                    DomainAccess.createObjectOwnership(context, busId, personId, access, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);

                }
            }
        }
              catch(Exception e)
              {
                emxContextUtil_mxJPO.mqlNotice(context,e.getMessage());
              }
          }
        /**To add  the organization for a workspace for security context with access
         * @param context
         * @param args
         * @throws Exception
         */

        @com.matrixone.apps.framework.ui.ProgramCallable
        public void addOrganization(Context context, String[] args) throws Exception
        {
              try
              {
            HashMap<?, ?> paramMap      = (HashMap<?, ?>)JPO.unpackArgs(args);
            //String objectId = (String)paramMap.get("busObjId");
            String access = (String)paramMap.get("access");
            //String comment = "Multiple Ownership For Object";
            String[] ids = (String[])paramMap.get("emxTableRowIds");
            for(int i =0; i<ids.length;i++)
            {
                StringList idList = com.matrixone.apps.domain.util.StringUtil.split(ids[i], "|");
                if( idList.size() >2 )
                {
                    String busId = (String)idList.get(1);
                    String orgId = (String)idList.get(0);
                    String orgName = new DomainObject(orgId).getInfo(context, DomainObject.SELECT_NAME);
                    DomainAccess.createObjectOwnership(context, busId, orgName,null, access, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                }
            }
        }
              catch(Exception e)
              {
                emxContextUtil_mxJPO.mqlNotice(context,e.getMessage());
              }
          }
        /**To add  the project for a workspace for security context with access
         * @param context
         * @param args
         * @throws Exception
         */
        @com.matrixone.apps.framework.ui.ProgramCallable
        public void addProject(Context context, String[] args) throws Exception
        {
              try
              {
            HashMap<?, ?> paramMap      = (HashMap<?, ?>)JPO.unpackArgs(args);
            //String objectId = (String)paramMap.get("busObjId");
            String access = (String)paramMap.get("access");
            //String comment = "Multiple Ownership For Object";
            String[] ids = (String[])paramMap.get("emxTableRowIds");
            for(int i =0; i<ids.length;i++)
            {
                StringList idList = com.matrixone.apps.domain.util.StringUtil.split(ids[i], "|");
                if( idList.size() >2 )
                {
                    String busId = (String)idList.get(1);
                    String projectId = (String)idList.get(0);
                    String projectName = new DomainObject(projectId).getInfo(context, DomainObject.SELECT_NAME);
                    DomainAccess.createObjectOwnership(context, busId, null,projectName, access, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                }
            }
        }
              catch(Exception e)
              {
                emxContextUtil_mxJPO.mqlNotice(context,e.getMessage());
              }
          }
        /**To add  the project and organization for a workspace for security context with access
         * @param context
         * @param args
         * @throws Exception
         */
        @com.matrixone.apps.framework.ui.ProgramCallable
        public void addSecurityContext(Context context, String[] args) throws Exception
        {
              try
              {
            HashMap<?, ?> paramMap      = (HashMap<?, ?>)JPO.unpackArgs(args);
            //String objectId = (String)paramMap.get("busObjId");
            String access = (String)paramMap.get("access");
            //String comment = "Multiple Ownership For Object";
            String[] ids = (String[])paramMap.get("emxTableRowIds");

            for(int i =0; i<ids.length;i++)
            {
                StringList idList = com.matrixone.apps.domain.util.StringUtil.split(ids[i], "|");
                if( idList.size() >2 )
                {
                    String busId = (String)idList.get(1);
                    String secContextId = (String)idList.get(0);
                    String orgName = new DomainObject(secContextId).getInfo(context, DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_ORGANIZATION_TO_NAME);
                    String projectName = new DomainObject(secContextId).getInfo(context, DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_PROJECT_TO_NAME);
                    DomainAccess.createObjectOwnership(context, busId, orgName,projectName, access, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                }
            }
        }
              catch(Exception e)
              {
                emxContextUtil_mxJPO.mqlNotice(context,e.getMessage());
              }
          }
        /**To remove the access for a workspace for security context with access
         * @param context
         * @param args
         * @throws Exception
         */

        @SuppressWarnings("deprecation")
        @com.matrixone.apps.framework.ui.ProgramCallable
        public void deleteAccess(Context context, String[] args) throws Exception
        {

            try
            {
            HashMap<?, ?> paramMap      = (HashMap<?, ?>)JPO.unpackArgs(args);
            String[] ids = (String[])paramMap.get("emxTableRowIds");
            for(int i =0; i<ids.length;i++)
            {
                StringList idList = com.matrixone.apps.domain.util.StringUtil.split(ids[i], "|");
                if( idList.size() >2 )
                {
                    String busId = (String)idList.get(1);
                        String ownerName = "";
                    String strProject = "";
                        String strOrganization = "";
                        if (UIUtil.isNotNullAndNotEmpty(busId))
                        {
                              ownerName = new DomainObject(busId).getOwner(context).getName();
                        }
                    String secContextId = (String)idList.get(0);
                        int fIndex = -1,sIndex = -1,tIndex = -1;
                        fIndex =secContextId.indexOf(":");
                        if (fIndex != -1)
                        {
                          sIndex =secContextId.indexOf(":", fIndex+1);
                        }
                        if (sIndex != -1)
                        {
                          tIndex =secContextId.indexOf(":", sIndex+1);
                        }
                        if (fIndex != -1 && sIndex != -1)
                        {
                      strOrganization = secContextId.substring(fIndex+1, sIndex);
                        }
                        if (sIndex != -1 && tIndex != -1)
                        {
                      strProject = secContextId.substring(sIndex+1, tIndex);
                        }
                    boolean ownerCheck = false;
                    if (strProject.length() !=0)
                    {
                        if(strProject.indexOf("_")>1)
                        {
                            ownerCheck = strProject.substring(0, strProject.lastIndexOf("_")).equals(ownerName);
                        }
                    }
                    if(!ownerCheck && UIUtil.isNotNullAndNotEmpty(strOrganization) && UIUtil.isNotNullAndNotEmpty(strProject)) {
                        String loggedInOrg = PersonUtil.getActiveOrganization(context);
                    	String loggedInProj = PersonUtil.getActiveProject(context);

                    	if(strOrganization.equals(loggedInOrg) && strProject.equals(loggedInProj)) {
                          ownerCheck = true;
						}
                    }
                    if (ownerCheck) {
						String languageStr = context.getSession().getLanguage();
						String exMsg = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Message.CannotDeletetheOwner",new Locale(languageStr));
						throw new Exception(exMsg);
                    }
                    String strComments = secContextId.substring(tIndex+1);
                    if(isRouteOwnerWithSelectedWSScope(context, strProject, busId)){
            			String sErrorMessage = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Common.DomainAccessRouteErrorMessage",new Locale(context.getSession().getLanguage()));
                        emxContextUtil_mxJPO.mqlNotice(context,sErrorMessage);
            		}else{
                    boolean hasOwnershipAccess = DomainAccess.hasObjectOwnership(context, busId, strOrganization, strProject, strComments);
                    if (strComments.length()!= 0 && !ownerCheck && hasOwnershipAccess)
                    {
                        DomainAccess.deleteObjectOwnership(context, busId, strOrganization,strProject,strComments);
                    } else {
                        String sErrorMessage = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Common.DomainAccessDeleteAccessErrorMessage",new Locale(context.getSession().getLanguage()));
                        emxContextUtil_mxJPO.mqlNotice(context,sErrorMessage);
                    }
                }
                }
             }
            }
            catch(Exception e)
            {
              emxContextUtil_mxJPO.mqlNotice(context,e.getMessage());
            }
        }
        
        /** To check if the person is owner of any route having workspace as scope while 'Remove Access' command in Multi Ownership Access page
         * If the person is owner of any routes having workspace as scope, then return true to block the remove access operation
         * @param context
         * @param personalProject (Person name)
         * @param busId (Context object, e.g: Workspace)
         * @returns a boolean
         * @throws Exception
         */
    public static boolean isRouteOwnerWithSelectedWSScope(Context context, String personalProject, String busId) throws Exception{
    		 	MapList RouteList = new MapList();
    			try
    			{
    				ContextUtil.pushContext(context);
    				DomainObject dObj = new DomainObject(busId);
    				String objType= dObj.getType(context);
    				if(DomainObject.TYPE_WORKSPACE.equals(objType) &&  UIUtil.isNotNullAndNotEmpty(personalProject)&& personalProject.endsWith("_PRJ")){
    					personalProject = personalProject.substring(0, personalProject.length()-4);		
    					String personId = PersonUtil.getPersonObjectID(context,personalProject);					
    					String busPhysicalId = FrameworkUtil.getPIDfromOID(context, busId);	
    					String sWhere =  "attribute["+DomainObject.ATTRIBUTE_RESTRICT_MEMBERS+"]=="+busPhysicalId;
    					dObj = new DomainObject(personId);	
    					StringList selects = new StringList(2);
    				    selects.addElement(DomainConstants.SELECT_NAME);
    				    selects.addElement(DomainConstants.SELECT_ID);
    					
    					RouteList = dObj.getRelatedObjects(
    							context,                  		// matrix context
    							DomainConstants.RELATIONSHIP_PROJECT_ROUTE,  		// relationship pattern
    							DomainConstants.TYPE_ROUTE,     						// object pattern
    							selects,           	 // object selects
    							null,         		// relationship selects
    							true,                  	  // to direction
    							false,                    	 // from direction
    							(short) 1,               	 // recursion level
    							sWhere,            	 // object where clause
    							"",             	// relationship where clause
    							(int) 0 );	
    					if(!RouteList.isEmpty()){
    						return true;	
    		    		}
    					
    				}			
    			}catch(Exception ex)
    			{	
    				throw new Exception(ex);

    			}finally{
    				ContextUtil.popContext(context);
    			}
    			return false;			
    }    


    @SuppressWarnings("unchecked")
    public static StringList getCellLevelEditAccess(Context context, String args[])throws Exception
    {
        HashMap<?, ?> inputMap = (HashMap<?, ?>)JPO.unpackArgs(args);
        HashMap<?, ?> requestMap    = (HashMap<?, ?>) inputMap.get("requestMap");
        String objectId       = (String)requestMap.get("objectId");
        DomainObject obj = new DomainObject(objectId);
        StringList selects = new StringList(4);
        selects.addElement(DomainConstants.SELECT_OWNER);
        selects.addElement(DomainConstants.SELECT_HAS_CHANGEOWNER_ACCESS);
        selects.addElement(DomainConstants.SELECT_ORGANIZATION);
        selects.addElement(DomainConstants.SELECT_PROJECT);
        selects.addElement(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
        
        Map objMap = obj.getInfo(context, selects);
        MapList objectMap = (MapList) inputMap.get("objectList");
        //List<Boolean> returnStringList = new ArrayList<Boolean>(objectMap.size());
        StringList returnStringList = new StringList(objectMap.size());
        Iterator<?> objectItr = objectMap.iterator();
        String owner = (String)objMap.get(DomainConstants.SELECT_OWNER);
        String objectProject = (String)objMap.get(DomainConstants.SELECT_PROJECT);
        String objectOrg = (String)objMap.get(DomainConstants.SELECT_ORGANIZATION);
        String changeOwnerAccess = (String)objMap.get(DomainConstants.SELECT_HAS_CHANGEOWNER_ACCESS);
        String changeSovAccess = (String)objMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
        while (objectItr.hasNext()) {
            Map<?,?> curObjectMap = (Map<?,?>) objectItr.next();
            String curObjectID = (String) curObjectMap.get("id");
            String disableSelection = (String)curObjectMap.get("disableSelection");
            StringList valueList = StringUtil.split(curObjectID, ":");
                if( "true".equalsIgnoreCase(changeOwnerAccess) || "true".equalsIgnoreCase(changeSovAccess) )
                {
                    changeOwnerAccess = "true";
                }
            if("false".equalsIgnoreCase(changeOwnerAccess)) {
                returnStringList.add("false");
            } else if( valueList.size() >= 4 ) {
                String project = (String)valueList.get(2);
                if( project.contains("_PRJ")) {
                    String cmd = "print role $1 select person dump";
                    String result = MqlUtil.mqlCommand(context, cmd, project);
                    if( context.getUser().equals(result) || result.equals(owner) || "true".equalsIgnoreCase(disableSelection)) {
                        returnStringList.add("false");
                    } else {
                        returnStringList.add("true");
                    }
                } else if(!DomainConstants.EMPTY_STRING.equals(curObjectMap.get("org")) || !DomainConstants.EMPTY_STRING.equals(curObjectMap.get("project"))) {
                    boolean org = ((String) curObjectMap.get("org")).equals(objectOrg);
                    boolean proj = ((String) curObjectMap.get("project")).equals(objectProject);
                    if(org && proj) {
                        returnStringList.add("false");
                    } else {
                        returnStringList.add("true");
                    }
                } else {
                    returnStringList.add("true");
                }
            } else {
                returnStringList.add("true");
            }
        }
        return returnStringList;
    }
    @SuppressWarnings("deprecation")
    public void clearMultipleOwnership(Context context, String[] args) throws Exception  {
        String objectId = args[0];
        if( objectId != null && !"".equals(objectId))
        {
          try
          {
            ContextUtil.pushContext(context);
            DomainAccess.clearMultipleOwnership(context, objectId);
          } finally
          {
            ContextUtil.popContext(context);
          }
        }
    }


    public boolean clearInheritedOwnership(Context context, String[] args) throws Exception  {
        String objectId = args[0];
        context.printTrace("logwriter","In emxDomainAccessBase_mxJPO:clearInheritedOwnership args[0] is="+objectId);
        if(FrameworkUtil.isObjectId(context, objectId))
        {
            DomainAccess.clearInheritedOwnership(context, objectId);
        }

        return true;
    }

    /** To get the logged in user
     * @param context
     * @param args
     * @return String
     * @throws Exception
     */
    public String getContextUser(Context context, String[] args) throws Exception {
        return context.getUser();
    }


    /** To exclude the members already added to the object using 'Add Member' command in Multi Ownership Access page
     * @param context
     * @param args
     * @returns a StringList: List of ObjectIds to be excluded from the search
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList getExcludePersonList(Context context, String args[]) throws Exception {
        return getExclusionList(context, args, "Person");
        }

    /** To exclude the Collaborative Space already added to the object using 'Add Collaborative Space' command in Multi Ownership Access page
     * @param context
     * @param args
     * @returns a StringList: List of ObjectIds to be excluded from the search
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList getExcludeCollabSpaceList(Context context, String args[]) throws Exception {
        return getExclusionList(context, args, "CollabSpace");
        }


    /** To exclude the Collaborative Space already added to the object using 'Add Organization' command in Multi Ownership Access page
     * @param context
     * @param args
     * @returns a StringList: List of ObjectIds to be excluded from the search
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList getExcludeOrgList(Context context, String args[]) throws Exception {
        return getExclusionList(context, args, "Org");
    }


    /** To exclude the members already added to the object using 'Add User Group' command in Multi Ownership Access page
     * @param context
     * @param args
     * @returns a StringList: List of ObjectIds to be excluded from the search
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList getExcludeUserGroupsList(Context context, String args[]) throws Exception {
        return getExclusionList(context, args, "GroupProxy");
        }

    public StringList getInclusionList(Context context, String args[]) throws Exception{
        String objectId = args[0];
        String commandType = args[1];
        return getInclusionList(context,objectId,commandType);

    }

    /** This method returns the list of members that are available at the parent and can added to the WorkspaceVault with
     *  AccessType == 'Specific' in Multi Ownership Access page
     * @param context
     * @param objectId Workspace Vault with AccessType=='Specific'
     * @param commandType search object type :- Person,Org,CollabSpace
     * @returns a StringList: List of ObjectIds to be included in the search
     * @throws Exception
     */
    public static StringList getInclusionList(Context context, String objectId, String commandType) throws Exception {
        MapList accessList = new MapList();
        if(UIUtil.isNotNullAndNotEmpty(objectId)){
            accessList = DomainAccess.getAccessSummaryList(context, objectId);
        }
        return getOwnershipIdList(context,accessList,commandType);
    }


    /** To return the actual exclude object Id's list that are already added to the object
     * @param context
     * @param args
     * @param commandType search object type :- Person,Org,CollabSpace
     * @returns a StringList: List of ObjectIds to be excluded from the search
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public StringList getExclusionList(Context context, String args[], String commandType) throws Exception {
        MapList accessList = getObjectAccessList(context, args);
        return getOwnershipIdList(context,accessList,commandType);
    }

    /**This method returns the objectIds of the type 'commandType' from the ownership details passed as 'accessList' param.
     * @param context
     * @param accessList: Ownership details of the object
     * @param commandType search object type :- Person,Org,CollabSpace
     * @returns a StringList: List of ObjectIds
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static StringList getOwnershipIdList(Context context,MapList accessList,String commandType) throws Exception {

        StringList ids = new StringList(accessList.size());
        String type = "";
        String rev = "";
        boolean isRDF= false;
        if("CollabSpace".equals(commandType)){
            type = DomainConstants.TYPE_PNOPROJECT;
            rev = "-";
        } else if("Org".equals(commandType)){
            type = DomainConstants.TYPE_ORGANIZATION;
            rev = "*";
        } else if ("GroupProxy".equals(commandType)) {
        	type = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
        	if(UINavigatorUtil.isCloud(context)) {
        		isRDF = true;
        	}
        	 rev = "-";
        }
        String queryName = "";
        for (int i = 0; i < accessList.size(); i++) {
            Map accessMap = (Map) accessList.get(i);
            String tempName = (String)accessMap.get("name");
            String tempId = (String) accessMap.get("id");
            String ownershipType = (String) accessMap.get("TYPE");
            tempId = tempId.substring(tempId.indexOf(":") + 1, tempId.lastIndexOf(":")).replace(":", ".");
            if("Person".equals(commandType)){
                if(tempName.indexOf("_PRJ") > 0 && !tempName.replace(":", ".").equals(tempId) && "Person".equalsIgnoreCase(ownershipType)) {
                    String personName = tempName.substring(0, tempName.indexOf("_PRJ"));
                    ids.add(PersonUtil.getPersonObjectID(context, personName));
                }
            } else {
                if("".equals(queryName)){
                    queryName = tempName;
                } else {
                    queryName += "," + tempName;
                }
            }
                }

        if(!"".equals(queryName)) {
        	
        	String querySelect = "id";
        	if(UINavigatorUtil.isCloud(context) && "GroupProxy".equals(commandType)) {
        		querySelect = "attribute["+PropertyUtil.getSchemaProperty(context,"attribute_GroupURI")+"]";
        		
        	}
            String result = MqlUtil.mqlCommand(context, "temp query bus $1 $2 $3 select $4 dump $5", type, queryName, rev, querySelect, "|");
            StringList resultList = StringUtil.split(result, "\n");

                if(resultList.size()>0){
                for(int i=0;i<resultList.size();i++){
                    StringList objectList = StringUtil.split((String)resultList.get(i), "|");
                    ids.add(objectList.get(3));
                }
            }
        }
        
        // Removing before If block for IR-713364-3DEXPERIENCER2022x
        /*String personId = PersonUtil.getPersonObjectID(context);
         if(! ids.contains(personId) && !isRDF){
        	ids.add(PersonUtil.getPersonObjectID(context));
        }*/
        return ids;
    }


    /** This method returns the list of SecurityContext objects that are available at the parent and can added to the WorkspaceVault with
     *  AccessType == 'Specific' in Multi Ownership Access page
     * @param context
     * @param objectId Workspace Vault with AccessType=='Specific'
     * @returns a StringList: List of ObjectIds to be included in the search
     * @throws Exception
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public static StringList getInclusionSecurityContextList(Context context,String objectId)throws Exception{
        MapList accessList = new MapList();
        if(!"".equals(objectId) && objectId!=null){
            accessList = DomainAccess.getAccessSummaryList(context, objectId);
        }
        return getSecurityContextOIDsList(context,accessList);
    }

    /** To exclude the Security Context objects already added to the object using 'Add Security Context' command in Multi Ownership Access page
     * @param context
     * @param args
     * @returns a StringList: List of ObjectIds to be excluded from the search
     * @throws Exception
     */

    /** To exclude the Security Context objects already added to the object using 'Add Security Context' command in Multi Ownership Access page
     * @param context
     * @param args
     * @returns a StringList: List of ObjectIds to be excluded from the search
     * @throws Exception
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList getExcludeSecurityContextList(Context context, String args[]) throws Exception {

        MapList accessList = getObjectAccessList(context, args);

        return getSecurityContextOIDsList(context,accessList);
    }
    /**This method returns the objectIds of the Security Context objects from the ownership details passed as 'accessList' param.
     * @param context
     * @param accessList: Ownership details of the object
     * @returns a StringList: List of ObjectIds to be excluded from the search
     * @throws Exception
     */

    public static StringList getSecurityContextOIDsList(Context context, MapList accessList) throws Exception {

        StringList objectSelects = new StringList();
        objectSelects.add(DomainConstants.SELECT_ID);


        objectSelects.add(DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_PROJECT_TO_NAME);
        objectSelects.add(DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_ORGANIZATION_TO_NAME);

        // get the where expression for the type 
        String whereClause = FrameworkUtil.getWhereExpressionForMql(context,"",DomainConstants.TYPE_SECURITYCONTEXT) ;
        
        MapList securityContextList = DomainObject.findObjects(context,
                                                                DomainConstants.TYPE_SECURITYCONTEXT,
                                                                 "*",
                                                                 "*",
                                                                 "*",
                                                                 "*",
                                                                 whereClause,
                                                                 null,
                                                                 true,
                                                                 objectSelects,
                                                                 (short) 0);
        StringList excludeSecContextIdList = new StringList();
        StringList uniqueOrgProjComboList = new StringList();


        // This map will be used to get the objectId of the already added Security Context object
        Map idMap = new HashMap();

        // To get rid off the duplicate ids
        for (int i = 0; i < securityContextList.size(); i++) {
            Map secContextMap = (Map) securityContextList.get(i);
            String id = (String) secContextMap.get(DomainConstants.SELECT_ID);
            String org = (String) secContextMap.get(DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_ORGANIZATION_TO_NAME);
            String proj = (String) secContextMap.get(DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_PROJECT_TO_NAME);
            String orgProjCombo = org.concat(".").concat(proj);


            if(uniqueOrgProjComboList.contains(orgProjCombo)){
                excludeSecContextIdList.add(id);
            } else {
                uniqueOrgProjComboList.add(orgProjCombo);
                idMap.put(orgProjCombo, id);
            }
        }


        // AccessList is already passed as the parameter
        // MapList accessList = getObjectAccessList(context, args);

        for (int i = 0; i < accessList.size(); i++) {
            Map accessMap = (Map) accessList.get(i);
            String tempName = (String)accessMap.get("name");

            if(UIUtil.isNotNullAndNotEmpty((String)idMap.get(tempName))){
                excludeSecContextIdList.add((String)idMap.get(tempName));
            }
        }


        return excludeSecContextIdList;
    }

     @com.matrixone.apps.framework.ui.ProgramCallable
    public static MapList getIncludeSecurityContextOIDsList(Context context, String args[]) throws Exception {
    	
    	Map<?, ?> programMap = (Map<?, ?>) JPO.unpackArgs(args);
    	String objectId = (String) programMap.get("objectId");
        if (objectId == null) {
            Map<?, ?> paramList = (Map<?, ?>) programMap.get("paramList");
            objectId = (String) paramList.get("objectId");
        }
    	//long startTime = System.currentTimeMillis();
    	MapList accessList = new MapList();
        if(!"".equals(objectId) && objectId!=null){
            accessList = DomainAccess.getAccessSummaryList(context, objectId);
        }

		String whereClause    = "";
		for (int i = 0; i < accessList.size(); i++) {
            Map accessMap = (Map) accessList.get(i);
            String tempName = (String)accessMap.get("name");
            if(UIUtil.isNotNullAndNotEmpty(tempName) && !tempName.endsWith("_PRJ")){
            	whereClause += "(name !~~ \"*"+tempName+"\") &&" ;	
            }
        }
		if(!"".equals(whereClause)){
			whereClause = whereClause.substring(0, whereClause.lastIndexOf("&&"));
		}
		

        StringList objectSelects = new StringList();
        objectSelects.add(DomainConstants.SELECT_ID);

        String  projTitleSelect = "from["+ PropertyUtil.getSchemaProperty(context, "relationship_SecurityContextProject") + "].to.attribute[Title]";
        String  orgTitleSelect = "from["+ PropertyUtil.getSchemaProperty(context, "relationship_SecurityContextOrganization") + "].to.attribute[Title]";
        objectSelects.add(DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_PROJECT_TO_NAME);
        objectSelects.add(projTitleSelect);
        objectSelects.add(DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_ORGANIZATION_TO_NAME);
        objectSelects.add(orgTitleSelect);
        // get the where expression for the type 
        whereClause = FrameworkUtil.getWhereExpressionForMql(context,whereClause,DomainConstants.TYPE_SECURITYCONTEXT) ;

        MapList securityContextList = DomainObject.findObjects(context,
                                                                DomainConstants.TYPE_SECURITYCONTEXT,
                                                                 "*",
                                                                 "*",
                                                                 "*",
                                                                 "*",
                                                                 whereClause,
                                                                 null,
                                                                 true,
                                                                 objectSelects,
                                                                 (short) 0);


        MapList includeSecContextIdList = new MapList();
        HashSet uniqueOrgProjCombo = new HashSet();

        for (int i = 0; i < securityContextList.size(); i++) {
            Map secContextMap = (Map) securityContextList.get(i);
            String id = (String) secContextMap.get(DomainConstants.SELECT_ID);
            String org = (String) secContextMap.get(DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_ORGANIZATION_TO_NAME);
            String proj = (String) secContextMap.get(DomainConstants.SELECT_RELATIONSHIP_SECURITY_CONTEXT_PROJECT_TO_NAME);
            if(UIUtil.isNotNullAndNotEmpty(org) && UIUtil.isNotNullAndNotEmpty(proj)) {
            	String orgProjCombo = org.concat(".").concat(proj);  
            	if(!uniqueOrgProjCombo.contains(orgProjCombo)){
            		includeSecContextIdList.add(secContextMap);
            		uniqueOrgProjCombo.add(orgProjCombo);
				}
        	}
        }
			return includeSecContextIdList;
		}
	
	static public StringList getSCProjects(Context context, String[] args) throws Exception {
		String  projTitleSelect = "from["+ PropertyUtil.getSchemaProperty(context, "relationship_SecurityContextProject") + "].to.attribute[Title]";
        return getSCData(context, args, projTitleSelect);
        }

    static public StringList getSCOrganizations(Context context, String[] args) throws Exception {
    	String  orgTitleSelect = "from["+ PropertyUtil.getSchemaProperty(context, "relationship_SecurityContextOrganization") + "].to.attribute[Title]";
        return getSCData(context, args, orgTitleSelect);
            }
	
	static private StringList getSCData(Context context, String[] args, String key) throws Exception {
        Map<?, ?> programMap = (Map<?, ?>) JPO.unpackArgs(args);
		String  projTitleSelect = "from["+ PropertyUtil.getSchemaProperty(context, "relationship_SecurityContextProject") + "].to.attribute[Title]";
		String  orgTitleSelect = "from["+ PropertyUtil.getSchemaProperty(context, "relationship_SecurityContextOrganization") + "].to.attribute[Title]";
        MapList objectList = (MapList) programMap.get("objectList");
        StringList results = new StringList(objectList.size());
        for (int i=0; i < objectList.size(); i++) {
            Map<?, ?> map = (Map<?, ?>) objectList.get(i);
            String value = (String) map.get(key);
			if(projTitleSelect.equals(key) && UIUtil.isNullOrEmpty(value)) {
				value= (String) map.get(projTitleSelect);
			}
			if(orgTitleSelect.equals(key) && UIUtil.isNullOrEmpty(value)) {
				value= (String) map.get(orgTitleSelect);
			}
            results.addElement(value);
        }
        return results;
    }

    /** This method is used to display the default Organization / Project on top of the list
     * @param Organization
     * @param defaultOrg
     * @param resultList
     */
    private StringList displayDefaultValueOnTop(String defaultValue, StringList resultList) throws Exception {
      if(resultList.size() > 0 ) {
        //to remove the duplicate entries from the list
          resultList = removeDuplicates(resultList);
            for(int i = 0; i < resultList.size(); i++) {
                if(resultList.get(i).equals(defaultValue)){
                    resultList.remove(i);
                    resultList.add(0,defaultValue);
                    break;
                }
          }
            return resultList;
        }
      return resultList;
      }

    /** To get the Range of Organizations for the context user with default Org on top
     * @param context
     * @param args
     * @return HashMap
     * @throws Exception
     */
     public Object getOrgRangeValues(Context context, String[] args) throws Exception {
        HashMap tempMap = new HashMap();
        StringList fieldRangeValues = new StringList();
        StringList fieldDisplayRangeValues = new StringList();

        Map orgMap = getOrgRanges(context, context.getUser());
        
        tempMap.put("field_choices", (StringList)orgMap.get("ActualValues"));
        tempMap.put("field_display_choices",  (StringList)orgMap.get("DisplayValues"));
        return tempMap;
    }

        /** To get the Range of project for the context user with default Project on top
         * @param context
         * @param args
         * @return HashMap
         * @throws Exception
         */
        public Object getProjectRangeValues(Context context, String[] args) throws Exception {
            HashMap tempMap = new HashMap();
            StringList fieldRangeValues = new StringList();
            StringList fieldDisplayRangeValues = new StringList();

            //to get the default Project
            String defualtProj    = PersonUtil.getActiveProject(context);
            String defaultOrg     = PersonUtil.getActiveOrganization(context);
            
            //resultList contains "name|title or name|name"
            StringList resultList = PersonUtil.getProjectsWithTitleAndName(context, context.getUser(), defaultOrg);

            String defaultProjectTitle ="";
            for(int j = 0; j < resultList.size(); j++) {
            	StringList tempResult = StringUtil.split((String)resultList.get(j), "|");
            	String project = tempResult.get(0);
            	if(!fieldRangeValues.contains(project) && UIUtil.isNotNullAndNotEmpty(project) && !project.equals(defualtProj)) {
            		fieldRangeValues.addElement(tempResult.get(0));
            		fieldDisplayRangeValues.addElement(tempResult.get(1));
            	}else if(project.equals(defualtProj)){
            		defaultProjectTitle = tempResult.get(1);
            	}
            }
            fieldRangeValues.add(0,defualtProj);
            fieldDisplayRangeValues.add(0,defaultProjectTitle);
            
            tempMap.put("field_choices", fieldRangeValues);
            tempMap.put("field_display_choices", fieldDisplayRangeValues);
            return tempMap;
        }
    public boolean isNotARaceProject(Context context,String[] args) throws Exception
    {
        boolean isRaceProject = false;
        try
        {
            isRaceProject = PersonUtil.isRaceProject(context);
        } catch(Exception ex)
        {
            // Do nothing as default value is set in definetion of variable.
        }
        return !isRaceProject;
    }

    /**
    *
    * Set the Interface TemplateFolder on Project Template and its Folders.
    *
    * @param context The ENOVIA <code>Context</code> object.
    * @param args holds information about objects.
    * @throws Exception
    */
   public boolean setTemplateFolderInheritance(Context context, String[] args) throws Exception
   {
      try
      {
          String fromId = args[0];  // id of from object
          String toId = args[1];    // id of to object
          String objectId = args[2];    // id of to object
          String strEvent = args[3];    // event will be create or modifyfrom
          String strInterfaceName = PropertyUtil.getSchemaProperty(context,"interface_TemplateFolder");
          String sCommandModifyStatement = "modify bus $1 add interface $2";

          // if fromId is null then this is the Project Template, it has no parent
          if(UIUtil.isNullOrEmpty(fromId)) {
              // add the interface to the template
              MqlUtil.mqlCommand(context, sCommandModifyStatement,objectId,strInterfaceName);
          }
          else
          {
              String sCommandPrintStatement = "print bus $1 select $2 dump";
              if("ModifyFrom".equalsIgnoreCase(strEvent)){
                  fromId = objectId ;
              }
              String sIsInterFacePresent = MqlUtil.mqlCommand(context, sCommandPrintStatement,fromId,"interface[" + strInterfaceName + "]");

              // If there is an interface on the parent add it to the new folder
              if("true".equalsIgnoreCase(sIsInterFacePresent)){
            	  String existingInterface = MqlUtil.mqlCommand(context, sCommandPrintStatement,toId,"interface[" + strInterfaceName + "]");
                  //Add only if already not added.
            	  if("false".equalsIgnoreCase(existingInterface)) {
                	  MqlUtil.mqlCommand(context, sCommandModifyStatement,toId,strInterfaceName);
                  }
              }

          }
      }
      catch(Exception ex)
      {
          ex.printStackTrace();
          throw ex;
      }
      return true;
   }

   /** To remove lesser access
    * @param context
    * @param Access bits of the context object
    * @param Inherited Access
    * @param inherited objects physical bits length
    * @param Object Id
    * @return String
    * @throws Exception
    */
   @SuppressWarnings({ "static-access", "unchecked" })
   public StringList removeLesserAccess_new(Context context, StringList accessList, String inheritedAccess, int inheritedAccessLen, String objectID) throws Exception {

   	return removeLesserAccess_new(context, accessList, inheritedAccess, inheritedAccessLen, objectID, false,"");
   }

   /** To remove lesser access
    * @param context
    * @param Access bits of the context object
    * @param Inherited Access
    * @param inherited objects physical bits length
    * @param Object Id
    * @param to show Inherited Access as first element in drop down
    * @param Inherited Object Id
    * @return String
    * @throws Exception
    */
   @SuppressWarnings({ "static-access", "unchecked" })
   public StringList removeLesserAccess_new(Context context, StringList accessList, String inheritedAccess, int inheritedAccessLen, String objectID, boolean showInheritedAccess, String InheritedObjId) throws Exception {

       StringList accessListSequence = new StringList();
       String policyName = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectID, "policy");
       if(showInheritedAccess){
       	accessListSequence.add(inheritedAccess+"|"+InheritedObjId);
       }

       for(int i=0; i<accessList.size(); i++){
       		String access = DomainAccess.getPhysicalAccessMasksForPolicy(context, policyName, (String)accessList.get(i));
       		if(access.length() > inheritedAccessLen){
       			accessListSequence.add((String)accessList.get(i));
       		}
       }
       return  accessListSequence ;
   }
   /** Trigger program to add SOV of Issue Assignee and co-owners on the reported against Object
    * @param context
    * @param args
    * @returns boolean returns true
    * @throws Exception
    */

   public boolean createObjectOwnershipInheritanceForIssueRelationship(Context context, String[] args) throws Exception  {
       String toId = args[0];
       String fromId = args[1];
       
       DomainObject typeObject = new DomainObject();
       typeObject.setId(fromId);
       String objectName = typeObject.getInfo(context,DomainConstants.SELECT_NAME);
       
       String commentForType ="Ownership Inheritance from " + objectName;

       MapList results = DomainAccess.getOwnershipAccessBasedOnOneLevel(context, fromId);
       Iterator mitr = results.iterator();
       String strAccess = DomainAccess.getReaderAccessName(context, toId);    
       while(mitr.hasNext())
       {
           Map m = (Map)mitr.next();
           String project = (String)m.get("project");
           if(UIUtil.isNotNullAndNotEmpty(project))
           {
               try {
               	ContextUtil.pushContext(context, null, null, null);
               	DomainAccess.createObjectOwnership(context, toId, null, project, strAccess, commentForType, false);
               }finally{
               	ContextUtil.popContext(context);
               }
           }     
       }  
          return true;
     }
   /** Trigger program to remove SOV of Issue Assignee and co-owners added on the reported against Object
    * @param context
    * @param args
    * @returns boolean returns true
    * @throws Exception
    */

   public boolean deleteObjectOwnershipInheritanceForIssueRelationship(Context context, String[] args) throws Exception  {
       String toId = args[0];
       String fromId = args[1]; 
       DomainObject typeObject = new DomainObject();
       typeObject.setId(fromId);
       String objectName = typeObject.getInfo(context,DomainConstants.SELECT_NAME);
       String commentForType ="Ownership Inheritance from " + objectName;
       MapList results = DomainAccess.getOwnershipAccessBasedOnOneLevel(context, toId);
       Iterator mitr = results.iterator();   
       while(mitr.hasNext())
       {
           Map m = (Map)mitr.next();
           String project = (String)m.get("project");
           if(UIUtil.isNotNullAndNotEmpty(project)  &&  project.contains("_PRJ") )
           {
               DomainAccess.deleteObjectOwnership(context, toId, "", project, commentForType, true);
           }
       }  
   		typeObject = new DomainObject();
   		typeObject.setId(toId);
   		String objectType = typeObject.getInfo(context,DomainConstants.SELECT_TYPE);
   		commentForType ="Ownership Inheritance from " + objectType;
       //to delete access for issue inherited access
   		DomainAccess.deleteObjectOwnership(context, fromId, toId, commentForType, true);
       return true;
   }
   
	public int updateOwnershipAccessonChangeOwner(Context context, String[] args) throws Exception {
        try {
                //Getting the object ID
                String strObjectId = args[0];
                String kindOfOwner = args[1];
                String newOwner = args[2];
                String oldOwner = args[3];
                if(DomainConstants.SELECT_OWNER.equals(kindOfOwner)){
                   DomainObject busObject = new DomainObject();
                   busObject.setId(strObjectId);
                   StringList busSel =  new StringList(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);  
                   StringList accessNames = DomainAccess.getLogicalNames(context, strObjectId);
                   Map busMap = busObject.getInfo(context, busSel);
                   
                   String newOwnerId = PersonUtil.getPersonObjectID(context, newOwner);
                   String  defaultAccess = (String)accessNames.get(accessNames.size()-1); // Full Access
                   if ("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) { 
                      DomainAccess.createObjectOwnership(context, strObjectId, newOwnerId, defaultAccess, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);     
                   }   
                   
                   if(UIUtil.isNotNullAndNotEmpty(oldOwner)){                                                    
                	  defaultAccess = (String)accessNames.get(1);// Read Access
                      String cmd = "print role $1 select person dump";
                      String result = MqlUtil.mqlCommand(context, cmd, oldOwner+"_PRJ");
                      String oldOwnerId = PersonUtil.getPersonObjectID(context, oldOwner);
                      if ("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS)) && oldOwner.equals(result)) {                                                                          
                          DomainAccess.createObjectOwnership(context, strObjectId, oldOwnerId, defaultAccess , DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, true); 
                      }
                    }             
                }
                return 0;
        }
        catch (Exception e) {                                               
             return 1;
        }        
     }

	public static Vector getTypeInformation(Context context, String[] args) throws Exception {
		Vector types = new Vector();
		Map<?, ?> programMap = (Map<?, ?>) JPO.unpackArgs(args);
        MapList objectListFromArgs = (MapList) programMap.get("objectList");
        HashMap<?, ?> requestMap    = (HashMap<?, ?>) programMap.get("paramList");
        String languageStr      = (String)requestMap.get("languageStr");
    	String organization = "";
    	String type = "";
    	
    	String securityCon = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.Type.SecurityContext");
    	String person = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.Type.Person");
    	String userGroup = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.Type.Group");
    	String collabSpace = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.SecurityContextSelection.Project");
        for(Map objMap : (List<Map>)objectListFromArgs) {
        	organization = (String) objMap.get(DomainAccess.KEY_ACCESS_ORG);
        	type = (String) objMap.get("TYPE");
        	if(UIUtil.isNotNullAndNotEmpty(organization) || "SecurityContext".equals(type)) {
        		types.add(securityCon);
        	} else if ("Person".equals(type)) {
        		types.add(person);
        	} else if("CollabSpace".equals(type)){
        		types.add(collabSpace);
        	}else if("Group".equals(type)){
        		types.add(userGroup);
        	}
        }
        return types;
	}
    public boolean createObjectOwnershipForMessages(Context context, String[] args) throws Exception  {
        String fromId = args[0]; // 
        String toId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5]; 
     	String fromPolicy = (String) new DomainObject(fromId).getInfo(context, DomainConstants.SELECT_POLICY);
     	String toPolicy = (String) new DomainObject(toId).getInfo(context, DomainConstants.SELECT_POLICY);
     	String POLICY_PRIVATE_MSG = PropertyUtil.getSchemaProperty(context,"policy_PrivateMessage");
        if(!POLICY_PRIVATE_MSG.equalsIgnoreCase(toPolicy) ){
        	return createObjectOwnershipInheritance(context, fromId, toId, relId, relType, fromType, toType, null, false);
        }
        return true;
    }
    public boolean deleteObjectOwnershipForMessages(Context context, String[] args) throws Exception  {
        String fromId = args[0];
        String toId = args[1];
        String relId = args[2];
        String relType = args[3];
        String fromType = args[4];
        String toType = args[5];
        String POLICY_PRIVATE_MSG = PropertyUtil.getSchemaProperty(context,"policy_PrivateMessage");
		DomainObject domainObject = new DomainObject(toId);
		String toPolicy = (String) domainObject.getInfo(context, DomainConstants.SELECT_POLICY);
		if(!POLICY_PRIVATE_MSG.equalsIgnoreCase(toPolicy) ){
        	return deleteObjectOwnershipInheritance(context, fromId, toId, relId, relType, fromType, toType, null, true);
		}
		return true;
    }
    
    private Map getOrgRanges(Context context, String user) throws Exception {
    	
    	StringList actuals = new StringList();
    	StringList displayValues = new StringList();
    	//to get the Default Organization
        String defaultOrg     = PersonUtil.getActiveOrganization(context);
        MapList scContextsMap = PersonUtil.getSecurityContexts(context, user,new StringList());
        String relSecurityContextOrganization = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_SecurityContextOrganization);
        String orgSelect = "from[" + relSecurityContextOrganization + "].to.name";
        String orgTitleSelect = "from[" + relSecurityContextOrganization + "].to.attribute[Title]";
    	Map orgToDisplayName = new HashMap();
        for(Map scMap : (List<Map>)scContextsMap) {
        	String orgDisplayName = (String)scMap.get(orgTitleSelect);
			if(UIUtil.isNotNullAndNotEmpty(orgDisplayName) && !orgToDisplayName.containsKey((String)scMap.get(orgSelect))) {
				orgToDisplayName.put((String)scMap.get(orgSelect),orgDisplayName);
			} else if(!orgToDisplayName.containsKey((String)scMap.get(orgSelect))){
				orgToDisplayName.put((String)scMap.get(orgSelect),(String)scMap.get(orgSelect));
			}
        }
        java.util.List<Map.Entry<String, String> > list = 
                new LinkedList<Map.Entry<String, String> >(orgToDisplayName.entrySet()); 
   
         // Sort the list 
         Collections.sort(list, new Comparator<Map.Entry<String, String> >() { 
             public int compare(Map.Entry<String, String> o1,  
                                Map.Entry<String, String> o2) 
             { 
                 return (o1.getValue()).compareTo(o2.getValue()); 
             } 
         }); 
           
         // put data from sorted list to hashmap  
         HashMap<String, String> temp = new LinkedHashMap<String, String>(); 
         for (Map.Entry<String, String> aa : list) { 
             temp.put(aa.getKey(), aa.getValue()); 
         }
         java.util.List<String> orgKeys = new ArrayList<>(temp.keySet());
         for(String orgName:orgKeys) {
        	 if(!actuals.contains(orgName)) {
        		 if(defaultOrg.equals(orgName)) {
        			 actuals.add(0, orgName);
        			 displayValues.add(0,temp.get(orgName));
        		 } else {
        			 actuals.add(orgName);
        			 displayValues.add(temp.get(orgName));
        		 }
        	 }
         }
         Map orgRangeMap = new HashMap();
         orgRangeMap.put("ActualValues", actuals);
         orgRangeMap.put("DisplayValues", displayValues);
         return orgRangeMap;
    }

   /** To return list of types or types and their sub-types that can inherit access from Bookmark
    * @param context
    * @throws FrameworkException
    */
	
    private static StringList getBMAccessContentTypesandSubtypes(Context context) throws FrameworkException {

        StringList slBMAccessContentTypesandSubtypes = (StringList) CacheUtil.getCacheObject(context, "XER_BMAccessContentTypesandSubtypes");
        if( slBMAccessContentTypesandSubtypes != null)
        {
            return slBMAccessContentTypesandSubtypes;
        }

        Set typesSet = new HashSet();
        String inheritAccessForTypes = "";
		
        inheritAccessForTypes = EnoviaResourceBundle.getProperty(context, "emxFramework.FolderContentTypesThatRequireGrants");

        boolean checkSubTypes = false;            
        try
        {
            checkSubTypes = "true".equalsIgnoreCase(EnoviaResourceBundle.getProperty(context, "emxFramework.BMAccessIncludeSubtypes"));            
        } catch(Exception ex) {
            checkSubTypes = false;
        }
        String[] types = inheritAccessForTypes.split(",");
        for (int i = 0; i < types.length; i++) {
            String sType = PropertyUtil.getSchemaProperty(context, types[i]);
            if(sType!=null && !"".equals(sType.trim())) {
                typesSet.add(sType);
                if(checkSubTypes) {                                          	
                    String strCommand = "print type $1 select derivative dump $2";
                    String subTypes = MqlUtil.mqlCommand(context,strCommand, true, sType, "|");
                    typesSet.addAll(FrameworkUtil.split(subTypes, "|"));
                }
            }
        }

        StringList BMCONTENT_TYPES_REQUIRE_INHERITANCE = new StringList();
		BMCONTENT_TYPES_REQUIRE_INHERITANCE.addAll(typesSet);
        BMCONTENT_TYPES_REQUIRE_INHERITANCE = BMCONTENT_TYPES_REQUIRE_INHERITANCE.unmodifiableCopy();
        CacheUtil.setCacheObject(context, "XER_BMAccessContentTypesandSubtypes", BMCONTENT_TYPES_REQUIRE_INHERITANCE);
        return BMCONTENT_TYPES_REQUIRE_INHERITANCE;
   }

}
