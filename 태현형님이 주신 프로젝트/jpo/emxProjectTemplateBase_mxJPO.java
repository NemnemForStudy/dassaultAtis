/* emxProjectTemplateBase.java
*
* Copyright (c) 2002-2020 Dassault Systemes.
* All Rights Reserved
* This program contains proprietary and trade secret information of
* MatrixOne, Inc.  Copyright notice is precautionary only and does
* not evidence any actual or intended publication of such program.
*
* static const char RCSID[] = $Id: ${CLASSNAME}.java.rca 1.13.2.2 Thu Dec  4 07:55:07 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.13.2.1 Thu Dec  4 01:53:14 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.13 Tue Oct 28 18:55:12 2008 przemek Experimental przemek $
*/


import com.dassault_systemes.enovia.tskv2.ProjectSequence;
import com.matrixone.apps.cache.CacheManager;
import com.matrixone.apps.cache.CacheManager._entityNames;
import com.matrixone.apps.common.ContentReplicateOptions;
import com.matrixone.apps.common.Organization;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.program.*;

import matrix.db.BusinessInterface;
import matrix.db.BusinessInterfaceList;
import matrix.db.BusinessObject;
import matrix.db.BusinessObjectItr;
import matrix.db.BusinessObjectList;
import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.Policy;
import matrix.util.MatrixException;
import matrix.util.StringList;

import java.text.SimpleDateFormat;
import java.util.*;


/**
 * The <code>emxProjectTemplateBase</code> class represents the Project
 * Template JPO functionality for the AEF type.
 *
 * @version AEF 9.5.1.1 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxProjectTemplateBase_mxJPO extends com.matrixone.apps.program.ProjectTemplate
{
    /** the company id for this project template. */
    protected String _companyId = null;

    /**
     * Constructs a new emxProjectTemplate JPO object.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds the following input arguments: 0 - String containing the
     *            id
     * @throws Exception
     *             if the operation fails
     * @since AEF 9.5.1.1
     */
    public emxProjectTemplateBase_mxJPO (Context context, String[] args) throws Exception
    {
        // Call the super constructor
        super();
        if ((args != null) && (args.length > 0))
        {
            setId(args[0]);
        }
    }

    /**
     * This function verifies user's permission for a given project template.
     * This check is made by verifying the user's company matches the template's
     * company.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds no arguments
     * @return boolean true or false
     * @throws Exception
     *             if the operation fails
     * @since AEF 9.5.1.0
     */
    public boolean hasAccess(Context context, String[] args)
      throws FrameworkException
    {
         //This method is not used hence commenting the entire method.
        /*
        // program[emxProjectTemplate -method hasAccess
        // -construct ${OBJECTID}] == true
        String personCompanyId = MqlUtil.mqlCommand(context,
                "get env global PERSONCOMPANYID"); //PRG:RG6:R213:Mql Injection:Static Mql:19-Oct-2011
        if ("".equals(personCompanyId))
        {
            com.matrixone.apps.common.Person person = null;
            personCompanyId = person.getPerson(context).getCompanyId(context);
          //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:start
           String sCommandStatement = "set env global $1 $2";
           MqlUtil.mqlCommand(context, sCommandStatement,"PERSONCOMPANYID",personCompanyId);
            //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:End
        }
        if (_companyId == null)
        {
            _companyId = getInfo(context, SELECT_COMPANY_ID);
        }
        return (personCompanyId.equals(_companyId)) ? true : false;
        */
        return false;
    }

    /***************************************************************************
     * Methods for Config Table Conversion Task
     **************************************************************************/
    /**
     * gets the list of All ProjectTemplates owned by the user
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds no arguments
     * @return MapList containing the ids of ProjectTemplate objects
     * @throws Exception
     *             if the operation fails
     * @since PMC 10-6
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getAllProjectTemplates(Context context, String[] args)
      throws Exception
    {
        return getProjectTemplates(context, null);
    }

    /**
     * gets the list of active ProjectTemplates owned by the user
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds no arguments
     * @return MapList containing the ids of ProjectTemplate objects
     * @throws Exception
     *             if the operation fails
     * @since PMC 10-6
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getActiveProjectTemplates(Context context, String[] args)
      throws Exception
    {
        return getProjectTemplates(context, "Active");
    }

    /**
     * gets the list of inactive ProjectTemplates owned by the user
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds no arguments
     * @return MapList containing the ids of ProjectTemplate objects
     * @throws Exception
     *             if the operation fails
     * @since PMC 10-6
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getInActiveProjectTemplates(Context context, String[] args)
      throws Exception
    {
        return getProjectTemplates(context, "Inactive");
    }

    /**
     * gets the list of project template objects owned by the user
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds no arguments
     * @return MapList containing the ids of ProjectTemplate objects
     * @throws Exception
     *             if the operation fails
     * @since PMC 10-6
     */
    public MapList getProjectTemplates(Context context, String selectState)
      throws Exception
    {
        // Check license while listing Project Template, if license check fails here
        // the templates will not be listed.
        //
        //ComponentsUtil.checkLicenseReserved(context, DomainConstants.TRIGRAM_ENOVIA_PROGRAM_CENTRAL);
        ComponentsUtil.checkLicenseReserved(context,ProgramCentralConstants.PRG_LICENSE_ARRAY);


        MapList templateList = null;
        try
        {
            String busWhere = null;
            com.matrixone.apps.program.ProjectTemplate projectTemplate = (com.matrixone.apps.program.ProjectTemplate) DomainObject.newInstance(context,
                    DomainConstants.TYPE_PROJECT_TEMPLATE,
                    DomainConstants.PROGRAM);

            // Build the where clause based on the filter request
            // For active task display everything except tasks that are on the
            // complete or archive states
            if (selectState == null)
            {
                // do nothing here
            }
    		else if (("Inactive").equals(
                      selectState))
            {
                busWhere = "current==Obsolete";
            }
            else
            {
                // default, sets to Active
                busWhere = "current!=Obsolete";
            }

            String vaultPattern = "";
            String vaultOption = PersonUtil.getSearchDefaultSelection(context);
            vaultPattern = PersonUtil.getSearchVaults(context, false ,vaultOption);

            // use the matchlist keyword to filter by vaults, need this if
            // option is not "All Vaults"
            if (!vaultOption.equals(PersonUtil.SEARCH_ALL_VAULTS) && vaultPattern.length() > 0)
            {
                if ((busWhere == null) || "".equals(busWhere))
                {
                    busWhere = "vault matchlist '" + vaultPattern + "' ','";
                }
                else
                {
                    busWhere += "&& vault matchlist '" + vaultPattern + "' ','";
                }
            }

            // Retrieve the project template list.
            StringList busSelects = new StringList(2);
            busSelects.add(projectTemplate.SELECT_ID);
            busSelects.add(projectTemplate.SELECT_VAULT);

            templateList = projectTemplate.getProjectTemplates(context,
                    busSelects, busWhere);

            // Use query to search objects only on selected vaults
            templateList = projectTemplate.findObjects(context,
                    DomainConstants.TYPE_PROJECT_TEMPLATE, null, null, null,
                    null,// vaultPattern
                    busWhere, true, busSelects);
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            return templateList;
        }
    }

    /**
     * gets the estimated duration of the project templates
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds the following input arguments: objectList - Contains a
     *            MapList of Maps which contains object names paramList - Map
     *            containing parameters for cloning the object
     * @return Vector containing the estimated duration value as String
     * @throws Exception
     *             if the operation fails
     * @since PMC 10-6
     */
    public Vector getEstimateDuration(Context context, String[] args)
      throws Exception
    {
        Vector estimatedDuration = new Vector();
        try
        {
            com.matrixone.apps.program.ProjectTemplate projectTemplate = (com.matrixone.apps.program.ProjectTemplate) DomainObject.newInstance(context,
                    DomainConstants.TYPE_PROJECT_TEMPLATE,
                    DomainConstants.PROGRAM);
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");
            Map paramList = (Map) programMap.get("paramList");
            Map objectMap = null;

            Iterator objectListIterator = objectList.iterator();
            String[] objIdArr = new String[objectList.size()];
            int arrayCount = 0;
            while (objectListIterator.hasNext())
            {
                objectMap = (Map) objectListIterator.next();
                objIdArr[arrayCount] = (String) objectMap.get(projectTemplate.SELECT_ID);
                arrayCount++;
            }

            MapList actionList = ProjectTemplate.getInfo(context, objIdArr,
                    new StringList(projectTemplate.SELECT_TASK_ESTIMATED_DURATION));

            Iterator actionsListIterator = actionList.iterator();
            while (actionsListIterator.hasNext())
            {
                objectMap = (Map) actionsListIterator.next();
                String duration = (String) objectMap.get(projectTemplate.SELECT_TASK_ESTIMATED_DURATION);
                estimatedDuration.add(duration);
            }
            // ends while
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            return estimatedDuration;
        }
    }

    /**
     * gets the owner with lastname,firstname format also has a link to open a
     * pop up with the owner
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds the following input arguments: objectList - Contains a
     *            MapList of Maps which contains object names paramList - Map
     *            containing parameters for cloning the object
     * @return Vector containing the owner name as String
     * @throws Exception
     *             if the operation fails
     * @since PMC 10-6
     */
    public Vector getOwner(Context context, String[] args)
      throws Exception
    {
        Vector owner = new Vector();
        try
        {
            com.matrixone.apps.program.ProjectTemplate projectTemplate = (com.matrixone.apps.program.ProjectTemplate) DomainObject.newInstance(context,
                    DomainConstants.TYPE_PROJECT_TEMPLATE,
                    DomainConstants.PROGRAM);
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");
            Map paramList = (Map) programMap.get("paramList");
            Map objectMap = null;

            Iterator objectListIterator = objectList.iterator();
            String[] objIdArr = new String[objectList.size()];
            int arrayCount = 0;
            while (objectListIterator.hasNext())
            {
                objectMap = (Map) objectListIterator.next();
                objIdArr[arrayCount] = (String) objectMap.get(projectTemplate.SELECT_ID);
                arrayCount++;
            }

            MapList actionList = projectTemplate.getInfo(context, objIdArr,
                    new StringList(projectTemplate.SELECT_OWNER));

            Iterator actionsListIterator = actionList.iterator();
            String sPersonFullName = "";
            while (actionsListIterator.hasNext())
            {
                objectMap = (Map) actionsListIterator.next();
                String owners = (String) objectMap.get(projectTemplate.SELECT_OWNER);
                //Added:PRG:RG6:R212:10-Jun-2011
                if(ProgramCentralUtil.isNotNullString(owners))
                {
                    sPersonFullName = PersonUtil.getFullName(context,owners);
                }
                else
                {
                    sPersonFullName = "";
                }
                owner.add(XSSUtil.encodeForXML(context,sPersonFullName));
                //Added:PRG:RG6:R212:10-Jun-2011
            }
            // ends while
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            return owner;
        }
    }
  /**
     * This method determines if the checkbox needs to be enabled if the logged
     * in person is the owner of the ProjectTemplate in
     * PMCProjectTemplateSummary table.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds the following input arguments: objectList - objectList
     *            Contains a MapList of Maps which contains objects.
     * @return Object of type Vector
     * @throws Exception
     *             if the operation fails
     * @since PMC 10-6
     */
  public Vector showTemplateCheckbox(Context context, String[] args)
    throws Exception
  {
      HashMap programMap = (HashMap) JPO.unpackArgs(args);
      MapList objectList = (MapList) programMap.get("objectList");

      Vector enableCheckbox = new Vector();

      //modified for the bug 328024
      matrix.db.Person loginPerson=new matrix.db.Person(context.getUser());
      loginPerson.open(context);
      //Till here
      try
      {
          com.matrixone.apps.program.ProjectTemplate projectTemplate = (com.matrixone.apps.program.ProjectTemplate) DomainObject.newInstance(context,DomainConstants.TYPE_PROJECT_TEMPLATE, DomainConstants.PROGRAM);

          Iterator objectListItr = objectList.iterator();
          while (objectListItr.hasNext())
          {
              Map objectMap = (Map) objectListItr.next();
              String projectTemplateId = (String) objectMap.get(projectTemplate.SELECT_ID);

              if (projectTemplateId !=null && !projectTemplateId.equals("null") && !projectTemplateId.equals(""))
              {
                  projectTemplate.setId(projectTemplateId);
                  String projectTemplateOwner = projectTemplate.getInfo(context, projectTemplate.SELECT_OWNER).toString();
                  //modified for the bug 328024
                  if (loginPerson.isAssigned(context,"Project Administrator") || ( projectTemplateOwner !=null && !projectTemplateOwner.equals("null") && !projectTemplateOwner.equals("") && projectTemplateOwner.equals(context.getUser())))
                  {
                      enableCheckbox.add("true");
                  }
                  else
                  {
                      enableCheckbox.add("false");
                  }
              }
          }
      }
      catch (Exception ex)
      {
        throw ex;
      }
      finally
      {
        //added for the bug 328024
        loginPerson.close(context);
        //till here
        return enableCheckbox;
      }
  }
        /**
         * This method gets the Value range values depending upon the property
         * emxFramework.DefaultSearchVaults PMCProjectTemplateCreateForm.
         *
         * @param context
         *            the eMatrix <code>Context</code> object
         * @param args
         *            holds the following input arguments: objectList -
         *            objectList Contains a MapList of Maps which contains
         *            objects.
         * @return HashMap
         * @throws Exception
         *             if the operation fails
         * @since PMC V6R2008-1
         */
        @com.matrixone.apps.framework.ui.ProgramCallable
        public HashMap getProjTempVaultRangeValues(Context context, String[] args)
        throws Exception
        {

            com.matrixone.apps.common.Person person =
                (com.matrixone.apps.common.Person) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PERSON,DomainConstants.PROGRAM);


            String sLanguage=context.getSession().getLanguage();

            String ctxPersonId = person.getPerson(context).getId();
            person.setId(ctxPersonId);

            String userVault = person.getVault();

            userVault = i18nNow.getMXI18NString(userVault,"",sLanguage,"Vault");

            StringList vaultsList = GetVaults(context, ctxPersonId);

            if(vaultsList.isEmpty()) {
                vaultsList = GetAllVaults(context);
            }
            vaultsList.sort();

            StringList fieldRangeValues = new StringList();
            StringList fieldDisplayRangeValues = new StringList();

            // Get internationalized vault names
            StringList i18NVaults = new StringList();
            String i18nVault = "";
            String vaultName = "";
            Iterator vaultItr = vaultsList.iterator();
            while(vaultItr.hasNext()) {
                vaultName = (String)vaultItr.next();
                vaultName = vaultName.trim();
                i18nVault  = i18nNow.getMXI18NString(vaultName,"",sLanguage,"Vault");

                fieldRangeValues.addElement(vaultName);
                fieldDisplayRangeValues.addElement(i18nVault);
            }

            HashMap tempMap = new HashMap();
            tempMap.put("field_choices", fieldRangeValues);
            tempMap.put("field_display_choices", fieldDisplayRangeValues);


            return tempMap;
        }


        /**
         * This method gets all the vaults PMCProjectTemplateCreateForm.
         *
         * @param context
         *            the eMatrix <code>Context</code> object
         * @return StringList
         * @throws Exception
         *             if the operation fails
         * @since PMC V6R2008-1
         */
        public StringList GetAllVaults(Context context)
        throws MatrixException
        {

            // Get all vaults so that user can choose
            // this is all company's vaults not all vaults from all servers
            StringList vaultList = new StringList();

            com.matrixone.apps.common.Person person =
                com.matrixone.apps.common.Person.getPerson(context);
            com.matrixone.apps.common.Company company = person.getCompany(context);

            StringList selectList = new StringList(2);
            selectList.add(DomainConstants.SELECT_VAULT);
            selectList.add(DomainConstants.SELECT_SECONDARY_VAULTS);
            Map companyMap = company.getInfo(context,selectList);
            StringList secVaultList = FrameworkUtil.split((String)companyMap.get(DomainConstants.SELECT_SECONDARY_VAULTS),null);
            Iterator itr = secVaultList.iterator();

            String vaults = (String)companyMap.get(DomainConstants.SELECT_VAULT);
            vaultList.add(vaults);
            while (itr.hasNext() )
            {
                vaultList.add(PropertyUtil.getSchemaProperty(context, (String)itr.next()));
            }

            return vaultList;
        }

        /**
         * This method gets the vaults PMCProjectTemplateCreateForm.
         *
         * @param context
         *            the eMatrix <code>Context</code> object
         * @return StringList
         * @throws Exception
         *             if the operation fails
         * @since PMC V6R2008-1
         */
        public StringList GetVaults(Context context, String theId)
        throws MatrixException
        {
            com.matrixone.apps.common.Person person =
                (com.matrixone.apps.common.Person) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PERSON);

            StringList vaultSL = new StringList();
            if(theId != null && !"".equals(theId)) {
                person.setId(theId);
                vaultSL = convertToStringList(person.getSearchDefaultVaults(context), ",");
            }

            return vaultSL;

        }


        /**
         * This method Splits the string to StringList
         * PMCProjectTemplateCreateForm.
         *
         * @param String
         *            the vault String
         * @param String
         *            the split character
         * @return StringList
         * @throws Exception
         *             if the operation fails
         * @since PMC V6R2008-1
         */
        public StringList convertToStringList(String vaultStr, String splitAt)
        throws MatrixException
        {
            StringList vaultSL = new StringList();
            StringList vaultSplit = FrameworkUtil.split(vaultStr, splitAt);
            Iterator vaultItr = vaultSplit.iterator();
            while (vaultItr.hasNext()){
                vaultSL.add(((String) vaultItr.next()).trim());
            }
            return vaultSL;
        }
       /**
         * This method performs the Post Process Actions of Project Template
         * Creation PMCProjectTemplateCreateForm.
         *
         * @param context
         *            the eMatrix <code>Context</code> object
         * @param String
         *            the split character
         * @return StringList
         * @throws Exception
         *             if the operation fails
         * @since PMC V6R2008-1
         */

        @com.matrixone.apps.framework.ui.PostProcessCallable
        public void performPostProcessActions (Context context,String[] args)throws Exception
        {
            // Check license while creating Project Template, if license check fails here
            // the template will not be created by emxCreate.jsp component.
            //
            //ComponentsUtil.checkLicenseReserved(context, DomainConstants.TRIGRAM_ENOVIA_PROGRAM_CENTRAL);
            ComponentsUtil.checkLicenseReserved(context,ProgramCentralConstants.PRG_LICENSE_ARRAY);


            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap requestMap = (HashMap) programMap.get("requestMap");
            HashMap paramMap = (HashMap) programMap.get("paramMap");
            String businessUnitId= (String)requestMap.get("BusinessUnitId");
            String defaultVault = (String)requestMap.get("defaultVault");
            String strProjName = (String)requestMap.get("Name");
            String currency = (String)requestMap.get("Currency");
            String objectId = (String)paramMap.get("objectId");
            String strDescription = (String)requestMap.get("ProjectTemplateDescription");
            String strScheduleFrom = (String)requestMap.get("ScheduleFrom");

            com.matrixone.apps.program.Program program =
                (com.matrixone.apps.program.Program) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PROGRAM,DomainConstants.PROGRAM);
            com.matrixone.apps.program.ProjectTemplate projectTemplate =
                (com.matrixone.apps.program.ProjectTemplate) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PROJECT_TEMPLATE,DomainConstants.PROGRAM);
            com.matrixone.apps.program.ProjectSpace project =
                (com.matrixone.apps.program.ProjectSpace) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PROJECT_SPACE,DomainConstants.PROGRAM);


            try{
                ContextUtil.startTransaction(context, true);
                projectTemplate.setId(objectId);

               //JBR - change for JLR - start
               //String revision=projectTemplate.getUniqueName(DomainConstants.EMPTY_STRING);
               Policy pProjectTemplate = projectTemplate.getPolicy(context);
               String revision = pProjectTemplate.getFirstInSequence(context);
               //JBR - change for JLR - end
                String type = projectTemplate.getInfo(context, DomainConstants.SELECT_TYPE);
                //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:start
                
				String sCommandStatement = "modify bus $1 name $2 revision $3";
				boolean autonamingAccess = autonamingAccess(context, args);
				if(autonamingAccess){
					sCommandStatement += " add interface $4";
					MqlUtil.mqlCommand(context, sCommandStatement,objectId, strProjName,revision, "ProjectAutonaming");
				} 
				else{
					MqlUtil.mqlCommand(context, sCommandStatement,objectId, strProjName,revision);
				}
				
                //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:End

                if(businessUnitId!= null && !businessUnitId.equals("") && !businessUnitId.equals("null")) {
                    projectTemplate.setOrganization(context, businessUnitId);
                }

                DomainObject _accessListObject=DomainObject.newInstance(context);
                // create project access list object and connect to project
                _accessListObject.createAndConnect(context,
                        DomainConstants.TYPE_PROJECT_ACCESS_LIST,
                        projectTemplate.getUniqueName("PAL-"),
                        DomainConstants.EMPTY_STRING,
                        DomainConstants.POLICY_PROJECT_ACCESS_LIST,
                        context.getVault().getName(),
                        DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST,
                        projectTemplate,
                        false);


              //Start - Added for new PAL based sequence operation

                    String palPhysicalId = ProgramCentralUtil.getPhysicalId(context,_accessListObject.getObjectId(context));

                    ProjectSequence pal = new ProjectSequence(context,palPhysicalId);
                    pal.assignSequence(context,
                            null,
                            ProgramCentralUtil.getPhysicalId(context,objectId),
                            null,
                            null, true);


                //End


                // get person id
                com.matrixone.apps.common.Person person = com.matrixone.apps.common.Person.getPerson(context);
                String personId = person.getObjectId();

                // get the company id for this context
                com.matrixone.apps.common.Company company = person.getCompany(context);

                if (projectTemplate.isKindOf(context, DomainConstants.TYPE_PROJECT_TEMPLATE))
                {
                    //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:start
                    sCommandStatement = "connect bus $1 preserve relationship $2 to $3";
                    MqlUtil.mqlCommand(context, sCommandStatement,company.getObjectId() , DomainConstants.RELATIONSHIP_COMPANY_PROJECT_TEMPLATES,objectId);
                    //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:End
                }
                else
                {
                    //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:start
                    sCommandStatement = "connect bus $1 preserve relationship $2 to $3";
                    MqlUtil.mqlCommand(context, sCommandStatement,company.getObjectId() , DomainConstants.RELATIONSHIP_COMPANY_PROJECT,objectId);
                    //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:End


                    // add the originator as a default "Project Owner" member
                    // of this project
                    projectTemplate.addMember(context, personId);
                }

                StringList objectSelects = new StringList(2);
                objectSelects.add(SELECT_ORIGINATED);
                objectSelects.add(ProgramCentralConstants.SELECT_PHYSICALID);
                Map projectTemplateInfo = projectTemplate.getInfo(context, objectSelects);

                String originated = (String)projectTemplateInfo.get(SELECT_ORIGINATED);
                String sourceId = (String)projectTemplateInfo.get(ProgramCentralConstants.SELECT_PHYSICALID);

                //
                // In date roll up bean the default start of the business hour is considered as 8 AM.
                // Thus set the time part of the originated date as 8 AM. Due to this the date roll up operation
                // will be performed correctly.
                //
                Date dtOriginated = eMatrixDateFormat.getJavaDate(originated);
                Calendar calOriginated = new GregorianCalendar();
                calOriginated.setTime(dtOriginated);
                calOriginated.set(Calendar.HOUR_OF_DAY, 8);
                calOriginated.set(Calendar.MINUTE, 0);
                calOriginated.set(Calendar.SECOND, 0);
                calOriginated.set(Calendar.MILLISECOND, 0);

                //Modified:7-Apr-09:wqy:R207:PRG 371705
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat(eMatrixDateFormat.getInputDateFormat(), Locale.US);
                //End:R207:PRG 371705

                originated = simpleDateFormat.format(calOriginated.getTime());

                HashMap attributes = new HashMap(6);
                attributes.put(DomainConstants.ATTRIBUTE_TASK_ESTIMATED_START_DATE, originated);
                attributes.put(DomainConstants.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE, originated);
                attributes.put(DomainConstants.ATTRIBUTE_TASK_ESTIMATED_DURATION, "0");
                attributes.put(DomainConstants.ATTRIBUTE_ORIGINATOR, context.getUser());
                if(ProgramCentralUtil.isNotNullString(currency)){
                    attributes.put(ProgramCentralConstants.ATTRIBUTE_CURRENCY, currency);
                }
                attributes.put(DomainConstants.ATTRIBUTE_PROJECT_SCHEDULE_FROM, strScheduleFrom);
                attributes.put(ProgramCentralConstants.ATTRIBUTE_SOURCE_ID, sourceId);
                projectTemplate.setAttributeValues(context, attributes);

                if (strDescription != null)
                {
                    projectTemplate.setDescription(context, strDescription);
                }

                String defaultOrg = PersonUtil.getActiveOrganization(context);
                // RVW - Don't want to use title here
                // defaultOrg = Organization.getCompanyTitleFromName(context, defaultOrg);  // Added to return Title instead of Name
                String defaultProj = PersonUtil.getActiveProject(context);
                String projectTemplateId = projectTemplate.getId(context);

                //If collab space is GLOBAL, remove it.
                if ("GLOBAL".equalsIgnoreCase(defaultProj)){
                    projectTemplate.removePrimaryOwnership(context);
                    //Template should be available to the whole company.
                    // IR 739658 policy will give correct access, this was giving access to restricted users across CS
                    // IR 741352 We needed to put back Company visibility for CSE roles in GLOBAL CS
                    DomainAccess.createObjectOwnership(context, projectTemplateId, defaultOrg, null, "Project Member", DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, true);
                }

                // with the addition of co-owner we need to add the PT owner to SOV to make sure they have access to all PT objects
                DomainAccess.createObjectOwnership(context, projectTemplateId, personId, "Project Lead", DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);

                ContextUtil.commitTransaction(context);
            }
            catch(Exception ee)
            {
               ee.printStackTrace();
               if (ContextUtil.isTransactionActive(context)) {
                ContextUtil.abortTransaction(context);
            }
        }
       }
        /**
         * This method determines if the Vault field needs to be displayed or
         * not value returned should be: true/false
         *
         *
         * @param context
         *            the eMatrix <code>Context</code> object
         * @return the user access permissions for this project.
         * @throws FrameworkException
         *             if operation fails.
         * @since AEF 9.5.1.0
         */
        public boolean showVaultField(Context context, String[] args)
        throws Exception
        {
             com.matrixone.apps.common.Person person =
                (com.matrixone.apps.common.Person) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PERSON,DomainConstants.PROGRAM);
            String sLanguage=context.getSession().getLanguage();
            String ctxPersonId = person.getPerson(context).getId();
            person.setId(ctxPersonId);
            String userVault = person.getVault();
            userVault = i18nNow.getMXI18NString(userVault,"",sLanguage,"Vault");
            StringList vaultsList = GetVaults(context, ctxPersonId);
            if(vaultsList.size()>1)
            {
                return true;
            }
            else return false;
        }
     /**
         * gets the Originator -Context User Name PMCProjectTemplateCreateForm
         *
         * @param context
         *            the eMatrix <code>Context</code> object
         * @param args
         *            holds the following input arguments: objectList - Contains
         *            a MapList of Maps which contains object names paramList -
         *            Map containing parameters for cloning the object
         * @return String containing the Originator name as String
         * @throws Exception
         *             if the operation fails
         * @since PMC V6R2008-1
         */
    public String getOriginator(Context context, String[] args)
    throws Exception
    {
        String personName = "";
        try{
            com.matrixone.apps.common.Person person =
                (com.matrixone.apps.common.Person) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PERSON,DomainConstants.PROGRAM);
            String ctxPersonId = person.getPerson(context).getId();
            person.setId(ctxPersonId);
            personName = PersonUtil.getFullName(context,person.getName(context));

           }catch(Exception ex){
                throw ex;
            }
            finally
            {
                return personName;
            }
        }
        /**
         * This method gets the Name of the Project Template not value returned
         * should be: true/false
         *
         * PMCProjectTemplateCreateForm
         *
         * @param context
         *            the eMatrix <code>Context</code> object
         * @return the user access permissions for this project.
         * @throws FrameworkException
         *             if operation fails.
         * @since PMC V6R2008-1
         */

        public String getName(Context context, String[] args)
        throws Exception
        {
            String strOuput ="";
            try
            {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap requestMap = (HashMap) programMap.get("requestMap");
            String objectId = (String)requestMap.get("objectId");
            StringBuffer output = new StringBuffer();
            String sLanguage=context.getSession().getLanguage();
            com.matrixone.apps.program.ProjectTemplate projectTemplate =
                (com.matrixone.apps.program.ProjectTemplate) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PROJECT_TEMPLATE,DomainConstants.PROGRAM);
            String cloneName="";
            if (objectId != null && ! "".equals(objectId) && ! "false".equals(objectId))
            {
                // Clone Name:
                projectTemplate.setId(objectId);
                cloneName = projectTemplate.getName(context);
                cloneName = " " + cloneName;
                // Added:26-march-10:vm3:R209:PRG:Bug 015201
                cloneName = cloneName.replaceAll("&", "&amp;");
                //End-Added:26-march-10:vm3:R209:PRG:Bug 015201
                i18nNow i18nnow = new i18nNow();
                String strCloneMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                        "emxProgramCentral.Common.CloningOf", sLanguage);
                strCloneMsg=strCloneMsg+XSSUtil.encodeForXML(context,cloneName);
                output.append("<input type=\"text\" name=\"Name\" value=\""+strCloneMsg+"\"/><script language=\"JavaScript\">assignValidateMethod(\"Name\", \"isBadNameChars\");</script>");
            }

            else
            {
                //ADDED for 357476
                output.append("<input type=\"text\" name=\"Name\" value=\"\"/><script language=\"JavaScript\">assignValidateMethod(\"Name\", \"isBadNameChars\");</script>");
                //ADDED for 357476 ends.
            }
            strOuput =output.toString();
           }catch(Exception ex)
               {
                    throw ex;
               }
           finally
               {
                return strOuput ;
               }
        }
     /**
         * This method gets the Description of the Project Template not
         * value returned should be: true/false
         *
         * PMCProjectTemplateCreateForm
         *
         * @param context
         *            the eMatrix <code>Context</code> object
         * @return the user access permissions for this project.
         * @throws FrameworkException
         *             if operation fails.
         * @since PMC V6R2008-1
         */

        public String getDescription(Context context, String[] args)
        throws Exception
        {
            String strOuput="";
            try{
            StringBuffer output = new StringBuffer();
            com.matrixone.apps.program.ProjectTemplate projectTemplate =
                (com.matrixone.apps.program.ProjectTemplate) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PROJECT_TEMPLATE,DomainConstants.PROGRAM);

            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap requestMap = (HashMap) programMap.get("requestMap");
            String objectId = (String)requestMap.get("objectId");

            String cloneDescription="";
            //ADDED for 357476
            if (objectId != null && ! "".equals(objectId) && ! "false".equals(objectId))
            {
                projectTemplate.setId(objectId);
                cloneDescription = projectTemplate.getDescription(context);
                // [MODIFIED::Feb 26, 2011:S4E:R211:IR-051555V6R2012::Start]
                cloneDescription = ProgramCentralUtil.getHTMLCompatibleString(context, cloneDescription);
                // [MODIFIED::Feb 26, 2011:S4E:R211:IR-051555V6R2012::End]
                output.append("<textarea name=\"ProjectTemplateDescription\" >"+XSSUtil.encodeForXML(context,cloneDescription.trim())+"</textarea>");
            }

            else
            {
                output.append("<textarea name=\"ProjectTemplateDescription\" ></textarea>");
            }
            //ADDED for 357476 ends

            strOuput =output.toString();

               }catch(Exception ex)
               {
                    throw ex;
               }
               finally{
                return strOuput ;
               }
        }
     /**
         * This method performs the Post Process Actions for Project
         * Template Clone Creation PMCProjectTemplateCreateForm for Clone
         *
         * @param context
         *            the eMatrix <code>Context</code> object
         * @param String
         *            the split character
         * @return StringList
         * @throws Exception
         *             if the operation fails
         * @since PMC V6R2008-1
         */

        @com.matrixone.apps.framework.ui.PostProcessCallable
        public void performClonePostProcessActions (Context context,String[] args)throws Exception
        {
            try{
                com.matrixone.apps.program.ProjectSpace targetTemplate =
                    (com.matrixone.apps.program.ProjectSpace) DomainObject.newInstance(context,
                            DomainConstants.TYPE_PROJECT_SPACE,DomainConstants.PROGRAM);

                com.matrixone.apps.program.ProjectTemplate sourceTemplate =
                    (com.matrixone.apps.program.ProjectTemplate) DomainObject.newInstance(context,
                            DomainConstants.TYPE_PROJECT_TEMPLATE,DomainConstants.PROGRAM);

                HashMap programMap = (HashMap) JPO.unpackArgs(args);
                HashMap requestMap = (HashMap) programMap.get("requestMap");
                HashMap paramMap = (HashMap) programMap.get("paramMap");
                    // Clone-- parentObjId is Source, objectId is Target
                String objectId = (String)paramMap.get("objectId");

                String defaultVault = (String) requestMap.get("defaultVault");
                String parentObjId = (String)requestMap.get("objectId");
                String newTemplateName = (String)requestMap.get("Name");
                String strDescription = (String)requestMap.get("ProjectTemplateDescription");
                String strCurrency = (String)requestMap.get("Currency");
                String strScheduleFrom = (String)requestMap.get("ScheduleFrom");

                // Change for ReviseTemplate with same reference document - start
                String refernceDocument = (String)requestMap.get("ReferenceDocument");

                ContentReplicateOptions selectedOptionForReferenceDocument = ContentReplicateOptions.COPY;
                if("Reference".equalsIgnoreCase(refernceDocument)){
                    selectedOptionForReferenceDocument = ContentReplicateOptions.CONNECT_EXISTING;
                }
                //Change for ReviseTemplate with same reference document - End

                // JBR - change for JLR - start
                String strIsVersion = (String) requestMap.get("IsVersion");
                boolean bIsVersion = false;
                if (UIUtil.isNotNullAndNotEmpty(strIsVersion) && "true".equalsIgnoreCase(strIsVersion)) {
                    bIsVersion = true;
                }
                // JBR - change for JLR - end

                ContextUtil.startTransaction(context, true);
                sourceTemplate.setId(parentObjId);
                targetTemplate.setId(objectId);

                String templateType = sourceTemplate.getInfo(context,DomainConstants.SELECT_TYPE);
                // JBR - change for JLR - start
                //String revision=sourceTemplate.getUniqueName(DomainConstants.EMPTY_STRING);
                String revision = "";
                String sCommandStatement = "";
                if (!bIsVersion) {
                    Policy pProjectTemplate = sourceTemplate.getPolicy(context);
                    revision = pProjectTemplate.getFirstInSequence(context);
                    sCommandStatement = "modify bus $1 name $2 revision $3";
                MqlUtil.mqlCommand(context, sCommandStatement,objectId, newTemplateName,revision);
                }

                // JBR - change for JLR - end
                String newTemplateType = targetTemplate.getInfo(context, DomainConstants.SELECT_TYPE);

                //newTemplateType is created as Project Template so,
                //if templateType is a sub-type, change newTemplateType to sub-type instead of Project Template

                if ( !newTemplateType.equalsIgnoreCase(templateType)
                        && targetTemplate.isKindOf(context, DomainConstants.TYPE_PROJECT_TEMPLATE)) {
                    targetTemplate.change(context, templateType,
                            targetTemplate.getName(), targetTemplate.getRevision(),
                            targetTemplate.getVault().toString(),
                            targetTemplate.getPolicy(context).getName());
                   }

                BusinessInterfaceList interfaceList = sourceTemplate.getBusinessInterfaces(context,false);
                if(interfaceList != null) {
                    BusinessInterfaceList newObjBusinessInterfaceList = targetTemplate.getBusinessInterfaces(context, true);
                    for(int i=0, j = interfaceList.size(); i<j ; i++) {
                        BusinessInterface busInterface = interfaceList.get(i);
                        if(!newObjBusinessInterfaceList.contains(busInterface)) {
                            targetTemplate.addBusinessInterface(context, busInterface);
                        }
                    }
                }

                StringList attributeList = DomainObject.getTypeAttributeNames(context, sourceTemplate.TYPE_PROJECT_TEMPLATE);

                // let actuals default to empty.
                attributeList.remove(ATTRIBUTE_TASK_ACTUAL_DURATION);
                attributeList.remove(ATTRIBUTE_TASK_ACTUAL_START_DATE);
                attributeList.remove(ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);
                attributeList.remove(ATTRIBUTE_PERCENT_COMPLETE);
                attributeList.remove(ATTRIBUTE_ORIGINATOR);
                attributeList.remove(ATTRIBUTE_CURRENCY);
                attributeList.add(ProgramCentralConstants.ATTRIBUTE_SOURCE_ID);

                Map sourceAttributes = sourceTemplate.getAttributeMap(context,true);

                Map attributes = new HashMap();

                Iterator itr = attributeList.iterator();
                while (itr.hasNext()) {
                    String attribute = (String) itr.next();
                    String value = (String) sourceAttributes.get(attribute);
                    if (value != null) {
                        attributes.put(attribute, value);
                    }
                }

                if(sourceAttributes.containsKey(ProgramCentralConstants.ATTRIBUTE_FORMAT_PATTERN)) {
                    attributes.put(ProgramCentralConstants.ATTRIBUTE_FORMAT_PATTERN, (String)sourceAttributes.get(ProgramCentralConstants.ATTRIBUTE_FORMAT_PATTERN));
                }

                DomainObject _accessListObject=DomainObject.newInstance(context);
                // create project access list object and connect to project
                _accessListObject.createAndConnect(context,
                        DomainConstants.TYPE_PROJECT_ACCESS_LIST,
                        targetTemplate.getUniqueName("PAL-"),
                        DomainConstants.EMPTY_STRING,
                        DomainConstants.POLICY_PROJECT_ACCESS_LIST,
                        context.getVault().getName(),
                        DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST,
                        targetTemplate,
                        false);

                //Start - Added for new PAL based sequence operation
                try {
                    String palPhysicalId = ProgramCentralUtil.getPhysicalId(context,_accessListObject.getObjectId(context));

                    ProjectSequence pal = new ProjectSequence(context,palPhysicalId);
                    pal.assignSequence(context,
                            null,
                            ProgramCentralUtil.getPhysicalId(context,objectId),
                            null,
                            null, true);

                } catch (Exception e) {
                    e.printStackTrace();
                }
                //End

                // get person id
                com.matrixone.apps.common.Person person = com.matrixone.apps.common.Person.getPerson(context);

                // get the company id for this context
                com.matrixone.apps.common.Company company = person.getCompany(context);

                if (targetTemplate.isKindOf(context, DomainConstants.TYPE_PROJECT_TEMPLATE)) {
                    //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:start
                     sCommandStatement = "connect bus $1 preserve relationship $2 to $3";
                    MqlUtil.mqlCommand(context, sCommandStatement,company.getObjectId() , DomainConstants.RELATIONSHIP_COMPANY_PROJECT_TEMPLATES,objectId);
                    //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:End
                } else {
                    //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:start
                     sCommandStatement = "connect bus $1 preserve relationship $2 to $3";
                    MqlUtil.mqlCommand(context, sCommandStatement,company.getObjectId() , DomainConstants.RELATIONSHIP_COMPANY_PROJECT,objectId);
                    //PRG:RG6:R213:Mql Injection:parameterized Mql:19-Oct-2011:End
                    String personId = person.getObjectId();

                    // add the originator as a default "Project Owner" member
                    // of this project
                    targetTemplate.addMember(context, personId);
                }



                StringList objectSelects = new StringList(2);
                objectSelects.add(SELECT_ORIGINATED);
                objectSelects.add(ProgramCentralConstants.SELECT_PHYSICALID);
                Map newProjectTemplateInfo = targetTemplate.getInfo(context, objectSelects);

                String originated = (String)newProjectTemplateInfo.get(SELECT_ORIGINATED);
                String sourceId = (String)newProjectTemplateInfo.get(ProgramCentralConstants.SELECT_PHYSICALID);

                //
                // In date roll up bean the default start of the business hour is considered as 8 AM.
                // Thus set the time part of the originated date as 8 AM. Due to this the date roll up operation
                // will be performed correctly.
                //
                Date dtOriginated = eMatrixDateFormat.getJavaDate(originated);
                Calendar calOriginated = new GregorianCalendar();
                calOriginated.setTime(dtOriginated);
                calOriginated.set(Calendar.HOUR_OF_DAY, 8);
                calOriginated.set(Calendar.MINUTE, 0);
                calOriginated.set(Calendar.SECOND, 0);
                calOriginated.set(Calendar.MILLISECOND, 0);
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat(eMatrixDateFormat.getInputDateFormat(),Locale.US);
                originated = simpleDateFormat.format(calOriginated.getTime());

              //  attributes = new HashMap(4);
                if (!attributes.containsKey(ATTRIBUTE_TASK_ESTIMATED_DURATION)) {
                        attributes.put(DomainConstants.ATTRIBUTE_TASK_ESTIMATED_START_DATE, originated);
                        attributes.put(DomainConstants.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE, originated);
                        attributes.put(DomainConstants.ATTRIBUTE_TASK_ESTIMATED_DURATION, "0");
                    }

                attributes.put(DomainConstants.ATTRIBUTE_ORIGINATOR, context.getUser());
                attributes.put(ATTRIBUTE_CURRENCY, strCurrency);
                attributes.put(DomainConstants.ATTRIBUTE_PROJECT_SCHEDULE_FROM, strScheduleFrom);
                if(!bIsVersion){
                    attributes.put(ProgramCentralConstants.ATTRIBUTE_SOURCE_ID, sourceId);
                }

                targetTemplate.setAttributeValues(context, attributes);

                if (strDescription != null) {
                    targetTemplate.setDescription(context, strDescription);
                }


                // NX5 - Clone the Owner as a Co-Owners for Template versioning and Cloning (per MB)
                // cloneStructure takes care of normal co-owner cloning, dropping the new owner from
                // this list
                if (bIsVersion) {
                    String owner = sourceTemplate.getOwner(context).getName();
                    String user = context.getUser();
                    if (!owner.equalsIgnoreCase(user)) {
                        String idOwner = PersonUtil.getPersonObjectID(context, owner);

                        String[] selectedCoOwnerIdList = new String[1];
                        selectedCoOwnerIdList[0] = idOwner;
                        DomainRelationship.connect(context, targetTemplate,
                                DomainRelationship.RELATIONSHIP_MEMBER,
                                true, selectedCoOwnerIdList);
                    }
                }

                // There will be another method for Template Versioning - otherwise its cloning and the constraints are reset
                // nx5 - TP6574
                if (bIsVersion) {
                    //  static public void cloneStructure(Context context,
                    //    ProjectSpace source,
                    //   ProjectSpace target,
                    //   Map answerList,
                    //   boolean cloneFolderMembers,
                    //   boolean autoNameTasks,
                    //   Map mapCheckAttributeCopy,
                    //   boolean cloneTaskAssignee,
                    //   boolean copyTaskConstraint,
                    //   boolean copySourceIdAttribute,
                    //   ContentReplicateOptions selectedOptionForTaskDeliverable,
                    //   ContentReplicateOptions selectedOptionForFolderContent,
                    //   ProjectCloneOption... cloneOption)
                    // ProjectTemplate.cloneStructure(context,sourceTemplate,targetTemplate,null,true,false,null,false,true,true, ContentReplicateOptions.COPY, ContentReplicateOptions.COPY,ProjectCloneOption.CLONE_EVERYTHING);
                    ProjectTemplate.cloneStructure(context,
                            sourceTemplate,
                            targetTemplate,
                            null,
                            true,
                            false,
                            null,
                            false,
                            true,
                            true,
                            ContentReplicateOptions.COPY,
                            selectedOptionForReferenceDocument,
                            ContentReplicateOptions.COPY,
                            ProjectCloneOption.CLONE_EVERYTHING);

                } else {
                     // ProjectTemplate.cloneStructure(context, sourceTemplate, targetTemplate, null, true);
                    //Added For : IR-600159-3DEXPERIENCER2016x : Document Object disappears when Project Template is Cloned/Revised
                    ProjectTemplate.cloneStructure(context, sourceTemplate, targetTemplate, null, true,false,null,false,false,false,ContentReplicateOptions.COPY,ContentReplicateOptions.COPY,selectedOptionForReferenceDocument,true,ProjectCloneOption.CLONE_EVERYTHING);

                }
                Financials.cloneStructure(context,sourceTemplate,targetTemplate);


                //Added:29-June-2010:s4e:R210 PRG:ARP
                //Added to connect clone of All ResourcePlanTemplate to new cloned Projecttemplate
                StringList slResourcePlanTemplateList = sourceTemplate.getInfoList(context, "to["+ResourcePlanTemplate.RELATIONSHIP_RESOURCE_PLAN_TEMPLATE+"].id");
                if(null!=slResourcePlanTemplateList && !slResourcePlanTemplateList.isEmpty())
                {
                    for(int nCount=0;nCount<slResourcePlanTemplateList.size();nCount++)
                    {
                        Map resourcePlanTemplateArgsMap = new HashMap();
                        String strResourcePlanTemplateID = (String)slResourcePlanTemplateList.get(nCount);
                        resourcePlanTemplateArgsMap.put("strResourcePlanTemplateId",strResourcePlanTemplateID);
                        resourcePlanTemplateArgsMap.put("strProjectTempalteId",objectId);
                        resourcePlanTemplateArgsMap.put("isProjectTemplateVersion", "true");
                        String[] arrResourcePlanTemplateArgs =JPO.packArgs(resourcePlanTemplateArgsMap);
                        JPO.invoke(context,
                                "emxResourcePlanTemplateBase", null, "cloneResourcePlanTemplate",
                                arrResourcePlanTemplateArgs, null);
                    }
                }
                 String defaultOrg = PersonUtil.getActiveOrganization(context);
                 String defaultProj = PersonUtil.getActiveProject(context);
                 //If collab space is GLOBAL, remove it.
                 if ("GLOBAL".equalsIgnoreCase(defaultProj)){
                    targetTemplate.removePrimaryOwnership(context);
                    // IR 739658 policy will give correct access, this was giving access to restricted users across CS
                    // IR 741352 We needed to put back Company visibility for CSE roles in GLOBAL CS
                    DomainAccess.createObjectOwnership(context, targetTemplate.getId(context), defaultOrg, null, "Project Member", DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, true);
                 }

                 ContextUtil.commitTransaction(context);
            }
            catch(Exception ex)
               {
                if (ContextUtil.isTransactionActive(context))
                    ContextUtil.abortTransaction(context);
                ex.printStackTrace();
                      throw ex;
               }
        }


 /**
     * This method gets the Owner name Creation PMCProjectTemplateCreateForm for
     * Clone
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param String
     *            the split character
     * @return StringList
     * @throws Exception
     *             if the operation fails
     * @since PMC V6R2008-1
     */

        public String getOwnerName(Context context, String args[]) throws Exception
    {
        String output = "";
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        String objectId = (String) paramMap.get("objectId");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String strMode = (String) requestMap.get("mode");
        String jsTreeID = (String) requestMap.get("jsTreeID");
        com.matrixone.apps.common.Person person =
            (com.matrixone.apps.common.Person) DomainObject.newInstance(context, DomainConstants.TYPE_PERSON);
        com.matrixone.apps.program.ProjectTemplate projectTemplate =
                    (com.matrixone.apps.program.ProjectTemplate) DomainObject.newInstance(context,
                            DomainConstants.TYPE_PROJECT_TEMPLATE,DomainConstants.PROGRAM);
        projectTemplate.setId(objectId);
        StringList busSelects = new StringList(2);
        busSelects.add(DomainConstants.SELECT_OWNER);
        Map riskMap = projectTemplate.getInfo(context, busSelects);
        String riskOwner = (String) riskMap.get(DomainConstants.SELECT_OWNER);
        String ownerId = Person.getPerson(context, riskOwner).getId();
        StringBuffer sb = new StringBuffer();

        String userName = projectTemplate.getInfo(context, DomainConstants.SELECT_OWNER);
        person = Person.getPerson(context, userName);
        busSelects.clear();
        busSelects.add(Person.SELECT_LAST_NAME);
        busSelects.add(Person.SELECT_FIRST_NAME);
        Map personFullNameMap = person.getInfo(context, busSelects);
        String strLastName = (String) personFullNameMap.get(Person.SELECT_LAST_NAME);
        String strFirstName = (String) personFullNameMap.get(Person.SELECT_FIRST_NAME);
        String personName = strLastName + ", " + strFirstName;
        if("edit".equalsIgnoreCase(strMode))
        {
            sb.append("<input type=\"text\" name=\"PersonName\" size=\"36\" value=\""+personName+"\" readonly=\"readonly\"/>");
            sb.append("<input type=\"hidden\" name=\"Owner\" value=\""+userName+"\"/>");
            //Added:09-June-2010:vm3:R210 PRG:2011x
            sb.append("<input type=\"button\" name=\"bType\" size=\"200\" value=\"...\" alt=\"\" onClick=\"javascript:chooseProjectTemplateOwner()\"/>");
            //sb.append("<input type=\"button\" name=\"bType\" size=\"200\" value=\"...\" alt=\"\" onClick=\"javascript:showModalDialog('../common/emxFullSearch.jsp?field=TYPES=type_Person&amp;table=PMCCommonPersonSearchTable&amp;form=PMCCommonPersonSearchForm&amp;selection=single&amp;objectId="+objectId+ "&amp;submitURL=../programcentral/emxProgramCentralCommonPersonSearchUtil.jsp&amp;fieldNameActual=Owner&amp;fieldNameDisplay=PersonName&amp;mode=addProjectTemplateOwnerAssignee')\"");
            //sb.append("<input type=\"button\" name=\"bType\" size=\"200\" value=\"...\" alt=\"\" onClick=\"performPersonSearch();\"");
            //End Added:09-June-2010:vm3:R210 PRG:2011x
        }
        else
        {
            sb.append(personName);
        }
        output = sb.toString();

        return output;
    }
    /**
     * This method updates the Owner name Creation PMCProjectTemplateCreateForm
     * for Clone
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param String
     *            the split character
     * @return StringList
     * @throws Exception
     *             if the operation fails
     * @since PMC V6R2008-1
     */

    public boolean updateOwner(Context context,String args[]) throws Exception
    {
        //Added:09-June-2010:vm3:R210 PRG:2011x
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        Map requestMap = (Map)programMap.get("requestMap");
        Map paramMap = (Map) programMap.get("paramMap");
        String strObjectId = (String)paramMap.get("objectId");
        ProjectTemplate domTemplate =new ProjectTemplate(strObjectId);
        String strPerson = (String)paramMap.get("New Value");
        String tempStrPerson = domTemplate.getInfo(context, SELECT_NAME);
        String strTemplateId = (String)programMap.get("templateId");
        domTemplate.setOwner(context, strPerson);
        //End-Added:09-June-2010:vm3:R210 PRG:2011x
        return true;
    }


    //Added:27-Apr-2010:s4e:R210 PRG:2011x
    /**
     * This method gets the Field for type of the Project Template and Project Template Subtypes.
     *
     * PMCProjectTemplateCreateForm
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return the user access permissions for this project.
     * @throws FrameworkException
     *             if operation fails.
     */

    public String getType(Context context, String[] args)
    throws Exception
    {
        Map programMap = (Map)JPO.unpackArgs(args);
        Map requestMap = (Map)programMap.get("requestMap");
        String strOuput="";
        StringBuffer output = new StringBuffer();
        i18nNow i18nnow = new i18nNow();
        String sLanguage=context.getSession().getLanguage();
        String strSelectedType = (String)requestMap.get("type");
        if (strSelectedType != null) {
            if (strSelectedType.indexOf(":") != -1) {
                // type=_selectedType:TestChildVault,type_ProjectVault,type_TectChildVault
                StringList slSplitType = FrameworkUtil.split(strSelectedType, ":");
                if (slSplitType.size() > 1) {
                    strSelectedType = (String)slSplitType.get(1);
                    slSplitType = FrameworkUtil.split(strSelectedType, ",");
                    if (slSplitType.size() > 0) {
                        strSelectedType = (String)slSplitType.get(0);
                    }
                    else {
                        strSelectedType = null;
                    }
                }
                else {
                    strSelectedType = null;
                }
            }
            else {
                // If it is just command separated value then take the first value
                StringList slSplitType = FrameworkUtil.split(strSelectedType, ",");
                if (slSplitType.size() > 0) {
                    strSelectedType = (String)slSplitType.get(0);
                }
                else {
                    strSelectedType = null;
                }
            }
        }
        if (strSelectedType == null) {
            strSelectedType = DomainConstants.TYPE_WORKSPACE_VAULT; // Default!
        }
        else {
            // If it is symbolic name then convert it to real name
            if (strSelectedType.startsWith("type_")) {
                strSelectedType = PropertyUtil.getSchemaProperty(context, strSelectedType);
            }
        }
        String strType = "";
        strType = i18nnow.getAdminI18NString("Type",strSelectedType,sLanguage);
        try{
            output.append("<input type='hidden' name='TypeActual' value=\""+strSelectedType+"\"/>");
            output.append("<input type='text' readonly='true' name='TypeActualDisplay' value=\""+strType+"\"/>");
            output.append("<input type='button' name='TypeActual' value='...' onclick=\"javascript:showChooser('emxTypeChooser.jsp?SelectType=single&amp;ReloadOpener=true&amp;SelectAbstractTypes=false&amp;InclusionList=type_ProjectTemplate&amp;fieldNameActual=TypeActual&amp;fieldNameDisplay=TypeActualDisplay&amp;fieldNameOID=TypeActualOID&amp;suiteKey=ProgramCentral','500','500')\"/>");


            strOuput = output.toString();

        }catch(Exception ex)
        {
            throw ex;
        }
        return strOuput ;

    }
    //End:27-Apr-2010:s4e:R210 PRG:2011x

    /**
     *  This method returns vector containing name of vaults in which Project Template is present.
     *  @param context the ENOVIA <code>Context</code> object
     * @param returns vector containing name of the vault in which Project Template is present.
     * @param args The arguments, it contains programMap
     * @throws Exception if operation fails
     */

        public Vector getProjectTemplateVaults(Context context,String[] args) throws MatrixException {
            Vector vProjectVaults = new Vector();
            try {
                HashMap programMap = (HashMap) JPO.unpackArgs(args);
                MapList objectList = (MapList)programMap.get("objectList");
                Map mpProjectTemplate;
                String strVault = DomainConstants.EMPTY_STRING;
                for(int i=0;i<objectList.size();i++)
                {
                    mpProjectTemplate = (Map)objectList.get(i);
                    strVault = (String)mpProjectTemplate.get(DomainConstants.SELECT_VAULT);
                    vProjectVaults.add(strVault);
                }

            }catch(Exception e)
            {
                throw new MatrixException(e);
            }
            return vProjectVaults;
          }

    @com.matrixone.apps.framework.ui.ProgramCallable
    public static MapList getRevisions(Context context, String[] args) throws Exception
    {
        HashMap map = (HashMap) JPO.unpackArgs(args);
        String       objectId = (String) map.get("objectId");
        DomainObject busObj   = DomainObject.newInstance(context, objectId);

        StringList busSelects = new StringList(1);
        busSelects.add(DomainObject.SELECT_ID);

        // for the Id passed, get revisions Info
        MapList revisionsList = busObj.getRevisionsInfo(context,busSelects, new StringList(0));

        return revisionsList;
    }

    /**
     * This method returns Project template tasks to assign to Question. it filter
     * out tasks which are already connected to any question.
     *
     * @param   context
     *          the ENOVIA <code>Context</code> object
     * @param   argumentArray
     *          Array which holds Project template id and question id.
     *
     * @return  taskInfoMapList
     *          MapList which holds tasks information to list down for connecting
     *          to the question.
     *
     * @throws  FrameworkException
     *          FrameworkException can be thrown in case of method fail to execute.
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTaskMapListToAssignQuestion(Context context, String[] argumentArray) throws MatrixException {

        StringList busSelectList = new StringList(2);
        busSelectList.add(SELECT_ID);
        busSelectList.add(SELECT_NAME);
        busSelectList.add(Task.SELECT_HAS_QUESTIONS);
        busSelectList.add("to[Question].from.id");

        StringList relSelectList = new StringList();
		relSelectList.add("from.id");
        String busWhere = EMPTY_STRING;
        String relWhere = EMPTY_STRING;
        MapList taskInfoMapList = new MapList();

        try {
            Map programMap = JPO.unpackArgs(argumentArray);
            String projectTemplateId = (String)programMap.get("projectTemplateId");
            String questionId = (String)programMap.get("questionId");

            ProjectTemplate projectTemplate = new ProjectTemplate(projectTemplateId);
            MapList allTaskInfoMapList = projectTemplate.getRelatedObjects(context,RELATIONSHIP_SUBTASK,TYPE_TASK_MANAGEMENT,
                                                        busSelectList,relSelectList,false,true,(short)0,busWhere,relWhere,0);

            for(int i=0;i<allTaskInfoMapList.size();i++) {
                Map templateTaskInfoMap = (Map) allTaskInfoMapList.get(i);
                String isTaskHasQuestion = (String) templateTaskInfoMap.get(Task.SELECT_HAS_QUESTIONS);
                String level = (String) templateTaskInfoMap.get(DomainConstants.SELECT_LEVEL);
                if(!("1".equalsIgnoreCase(level))){
                    templateTaskInfoMap.remove(DomainConstants.SELECT_LEVEL);
                    templateTaskInfoMap.put(DomainConstants.SELECT_LEVEL, "1");
                }
                if(ProgramCentralUtil.isNotNullString(questionId)) {
				if(templateTaskInfoMap.get("to[Question].from.id") instanceof String){
					if(((String)templateTaskInfoMap.get("to[Question].from.id")).contains(questionId)){
						continue;
					}
				}
				
				else if(templateTaskInfoMap.get("to[Question].from.id") instanceof StringList){
					if(((StringList)templateTaskInfoMap.get("to[Question].from.id")).contains(questionId)){
						continue;
					}
				}
                }
                //Add tasks which are not already assigned to any question.
                //if ("false".equalsIgnoreCase(isTaskHasQuestion)){
                    taskInfoMapList.add(templateTaskInfoMap);
                //}
            
            }
            return taskInfoMapList;

        } catch (Exception exception) {
            throw new MatrixException(exception);
        }
    }

    /**
     * This method returns Project template question for assigning tasks.
     *
     * @param   context
     *          the ENOVIA <code>Context</code> object
     * @param   argumentArray
     *          Array which holds Project template id.
     *
     * @return  taskInfoMapList
     *          MapList which holds question information to list down.
     *
     * @throws  FrameworkException
     *          FrameworkException can be thrown in case of method fail to execute.
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getProjectTemplateQuestionList(Context context, String[] argumentArray) throws MatrixException {

        StringList busSelectList = new StringList(2);
        busSelectList.add(SELECT_ID);
        busSelectList.add(SELECT_NAME);

        StringList relSelectList = new StringList();
    //  String busWhere = EMPTY_STRING;
        //String busWhere = "current=='" + STATE_PROJECT_TEMPLATE_ACTIVE + "'";
        String busWhere = "current!=Obsolete";
		String relWhere = EMPTY_STRING;

        MapList questionInfoMapList = new MapList();
        MapList questionInfoMapList1 = new MapList();


        try {
            Map programMap = JPO.unpackArgs(argumentArray);
            String projectTemplateId = (String)programMap.get("projectTemplateId");
            String taskIdString = (String)programMap.get("taskIdString");
			String taskIdFinal = "";
			if(ProgramCentralUtil.isNotNullString(taskIdString)){
				taskIdFinal = (String) FrameworkUtil.split(taskIdString,"is").get(0);
			}

			String questionIdsConnectedToTask = "";
			
			if(ProgramCentralUtil.isNotNullString(taskIdFinal)){
				String sCommandStatement = "print bus $1 select $2 dump $3";
				String questionToIdSelectable = "to[Question].from.id";
                questionIdsConnectedToTask = MqlUtil.mqlCommand(context, sCommandStatement,taskIdFinal, questionToIdSelectable,"|");
			}
            ProjectTemplate projectTemplate = new ProjectTemplate(projectTemplateId);
				questionInfoMapList1 = projectTemplate.getRelatedObjects(context,RELATIONSHIP_PROJECT_QUESTION,TYPE_QUESTION,
                                                                    busSelectList,relSelectList,false,true,(short)1,
                                                                    busWhere,relWhere,0);

				for(int questionItr=0; questionItr<questionInfoMapList1.size();questionItr++){
					Map questionMap = (Map) questionInfoMapList1.get(questionItr);
					String questionIdTemp = (String) questionMap.get(SELECT_ID);
					DomainObject questionObjTemp = new DomainObject(questionIdTemp);
					MapList mlSubQuestion = questionObjTemp.getRelatedObjects(context,RELATIONSHIP_QUESTION,TYPE_QUESTION,
																		busSelectList,relSelectList,false,true,(short)0,
																		null,null);
					for(int subQueItr=0; subQueItr<mlSubQuestion.size(); subQueItr++){
						Map subQueMap = (Map) mlSubQuestion.get(subQueItr);
						String subQueId = (String) subQueMap.get("id");
						
						if(ProgramCentralUtil.isNotNullString(questionIdsConnectedToTask) &&questionIdsConnectedToTask.contains(subQueId)){
							continue;
						}
						questionInfoMapList.add(subQueMap);
					}
					
					if(ProgramCentralUtil.isNotNullString(questionIdsConnectedToTask) &&questionIdsConnectedToTask.contains(questionIdTemp)){
						continue;
					}
					questionInfoMapList.add(questionMap);
				}
			

        } catch (Exception exception) {
            throw new MatrixException(exception);
        }
        return questionInfoMapList;
    }

public String getTemplateTasksPreview(Context context, String[] args) throws MatrixException {

        String previewButtonLevel = EnoviaResourceBundle.getProperty(context,ProgramCentralConstants.PROGRAMCENTRAL,
                "emxProgramCentral.Common.Project.Preview", context.getSession().getLanguage());

        StringBuilder sb = new StringBuilder();
        sb.append("<input type=\"button\" id=\"predictWBS\" name=\"predictWBS\" value=\"");
        sb.append(previewButtonLevel);
        sb.append("\" onClick=\"javascript=previewTemplateTasksWBS()\"/>");

        return sb.toString();
    }

    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTemplateTasksWBS(Context context,String[]args)throws Exception {

        StringList taskList = (StringList) CacheUtil.getCacheObject(context, "taskIdList");
        MapList finalTaskList = new MapList();
        String[] taskIdsArray = new String[taskList.size()];
        taskList.toArray(taskIdsArray);
        StringList busSelects = new StringList();
        busSelects.add(SELECT_ID);
        busSelects.add(SELECT_HAS_SUBTASK);

        MapList mapList = DomainObject.getInfo(context, taskIdsArray, busSelects);

        for(int i=0;i<mapList.size();i++){
            Map taskInfoMap = (Map)mapList.get(i);
            String hasSubtask = (String) taskInfoMap.get(SELECT_HAS_SUBTASK);
            if("FALSE".equalsIgnoreCase(hasSubtask)){
                taskInfoMap.put("hasChildren", "false");
            }
            finalTaskList.add(taskInfoMap);
        }
        return finalTaskList;
    }

    /**
     *
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public boolean hasAccessToTemplateWBSActionMenu(Context context, String[] args) throws Exception {
        boolean hasAccess = Boolean.FALSE;
        Map programMap = (Map) JPO.unpackArgs(args);
        String objectId = (String) programMap.get("objectId");

        StringList busSelects = new StringList();
        busSelects.add(ProgramCentralConstants.SELECT_PROJECT_TYPE);
        busSelects.add(ProgramCentralConstants.SELECT_PROJECT_ID);
        busSelects.add(ProgramCentralConstants.SELECT_CURRENT);
        busSelects.add(ProgramCentralConstants.SELECT_KINDOF_PROJECT_TEMPLATE);
		busSelects.add(ProgramCentralConstants.SELECT_PROJECT_STATE);

        DomainObject domObj = DomainObject.newInstance(context, objectId);
        Map infoMap = domObj.getInfo(context, busSelects);

        //String objType = (String) infoMap.get(DomainConstants.SELECT_TYPE);
        String rootObjType = (String) infoMap.get(ProgramCentralConstants.SELECT_PROJECT_TYPE);
        String rootObjId = (String) infoMap.get(ProgramCentralConstants.SELECT_PROJECT_ID);
        String rootObjState = (String) infoMap.get(ProgramCentralConstants.SELECT_CURRENT);
        String istypeOfprjTemplate= (String) infoMap.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_TEMPLATE);
		String ptState = (String) infoMap.get(ProgramCentralConstants.SELECT_PROJECT_STATE);

        
        if( "True".equalsIgnoreCase(istypeOfprjTemplate)|| DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(rootObjType)){//From task popup in Template side.
            ProjectTemplate projectTemplate = (ProjectTemplate)DomainObject.newInstance(context, DomainConstants.TYPE_PROJECT_TEMPLATE, DomainObject.PROGRAM);
			//When opened in Template context
            String projectTemplateId = objectId;

            if(DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(rootObjType)){
				//When opened in Task context
                projectTemplateId = rootObjId;
            }

            if("Draft".equalsIgnoreCase(rootObjState) || "In Approval".equalsIgnoreCase(rootObjState) || "Draft".equalsIgnoreCase(ptState) || "In Approval".equalsIgnoreCase(ptState)){
            hasAccess =  projectTemplate.isOwnerOrCoOwner(context, projectTemplateId);
        }
        }
        return hasAccess;
    }


    /**
     * Returns the co-owner(s) list of Project Template.
     *
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getProjectTemplateCoOwners(Context context, String[] args) throws Exception {

        Map programMap = (Map) JPO.unpackArgs(args);
        String templateId = (String) programMap.get("objectId");

        StringList objectSelects = new StringList();
        objectSelects.add(DomainConstants.SELECT_ID);
        objectSelects.add(DomainConstants.SELECT_NAME);

        StringList relSelects = new StringList(DomainRelationship.SELECT_ID);

        ProjectTemplate template = (ProjectTemplate) DomainObject.newInstance(context, templateId, PROGRAM, TYPE_PROJECT_TEMPLATE);
        MapList coOwnerMapList = template.getCoOwners(context, objectSelects, relSelects);

        return coOwnerMapList;
    }


    /**
     * It checks if the logged-in user is owner/co-owner of the Template.
     *
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public boolean isOwnerOrCoOwner(Context context, String[] args) throws Exception {
        Map programMap = (Map) JPO.unpackArgs(args);
        String templateId = (String) programMap.get("objectId");

        ProjectTemplate projectTemplate = (ProjectTemplate)DomainObject.newInstance(context, DomainConstants.TYPE_PROJECT_TEMPLATE, DomainObject.PROGRAM);
        return projectTemplate.isOwnerOrCoOwner(context, templateId);
    }


    /**
     * Returns all the Admin users from the company belongs to the Project Template. Excludes owner and co-owner(s)
     * from the list.
     *
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getAllAdminFromCompany(Context context, String[] args) throws Exception {

        Map programMap = (Map) JPO.unpackArgs(args);
        String templateId = (String) programMap.get("objectId");

        ProjectTemplate template = (ProjectTemplate) DomainObject.newInstance(context, templateId, PROGRAM, TYPE_PROJECT_TEMPLATE);
        MapList companyAdminList = template.getAllAdminFromCompany(context);

        return companyAdminList;
    }


    /**
     * Returns Admin User Name.
     *
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getAdminUserName(Context context, String[] args) throws Exception {

        Map programMap = JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");
        StringList adminUserNameList = new StringList(objectList.size());

        Iterator it  = objectList.iterator();
        while(it.hasNext()) {
            Map objectInfoMap = (Map) it.next();
            String firstName = (String) objectInfoMap.get(Person.SELECT_FIRST_NAME);
            String lastName = (String) objectInfoMap.get(Person.SELECT_LAST_NAME);

            adminUserNameList.add(firstName+ " " + lastName);
        }

        return adminUserNameList;
    }

    /**
     * Returns all the Admin list from Template Company those can be used as Template owner.
     *
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
    public StringList getOwnerInclusionList(Context context, String[] args) throws Exception {

        Map programMap = (Map) JPO.unpackArgs(args);
        String templateId = (String) programMap.get("objectId");

        ProjectTemplate template = (ProjectTemplate) DomainObject.newInstance(context, templateId, PROGRAM, TYPE_PROJECT_TEMPLATE);
        StringList ownerInclusionList = template.getOwnerInclusionList(context);

        return ownerInclusionList;

    }

    /**
     *  "$type_eServiceTriggerProgramParameters" "PolicyProjectTemplateStateInactiveDemoteAction" "PromotePreviousVersion"
     *  Inactivate all other versions of the template
     *
     * @param context
     * @param args
     * @throws Exception
     */

    public void triggerPromotePreviousVersion(Context context, String[] args) throws Exception
    {
        String demotedTemplateOID = args[0];
        try
        {
            DomainObject doObj = DomainObject.newInstance(context, demotedTemplateOID);

            StringList singleSelects = new StringList();
            singleSelects.add(DomainObject.SELECT_ID);
            singleSelects.add(DomainObject.SELECT_CURRENT);
            StringList multiSelects = new StringList();

            MapList mlRevs = doObj.getRevisionsInfo(context, singleSelects, multiSelects);
            if(!mlRevs.isEmpty())
            {
                Iterator itrRevs = mlRevs.iterator();
                while(itrRevs.hasNext())
                {
                    Map mRev = (Map)itrRevs.next();
                    String strOID = (String)mRev.get(DomainObject.SELECT_ID);
                    String strCurrent = (String)mRev.get(DomainObject.SELECT_CURRENT);

                    if(!demotedTemplateOID.equals(strOID) && !strCurrent.equalsIgnoreCase("Obsolete"))
                    {
                        // Promote to Inactive
                        String sCommandStatement = "promote bus $1";
                        MqlUtil.mqlCommand(context, sCommandStatement, strOID);
                    }
                }
            }
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw ex;
        }
    }

    /**
     * "$type_eServiceTriggerProgramParameters" "TypeProjectTemplateDeleteCheck" "DemotePreviousVersion"
     * @param context
     * @param args
     * @throws Exception
     */
    public int triggerDemotePreviousVersionOnDelete(Context context, String[] args) throws Exception
    {
        String deletedTemplateOID = args[0];
        try
        {
            DomainObject doObj = DomainObject.newInstance(context, deletedTemplateOID);
            boolean bLatestRev = doObj.isLastRevision(context);

            // Rule Number 1 - if this is not the last revision, you cannot delete it
            if (!bLatestRev) {

                String msg = EnoviaResourceBundle.getProperty(context,ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.ProjectTemplate.DeleteLatestVersion", context.getSession().getLanguage());
                // Exception exCustom = new Exception("This Project Template version cannot be deleted, a higher version exists");
                emxContextUtil_mxJPO.mqlNotice(context, msg);
                return 1;
            }
//No need to demote previous revision. As now there is proper lifecycle available for Template
            // Rule Number 2 - cannot delete the only Active version if there are other remaining
			/*
			 * StringList singleSelects = new StringList();
			 * singleSelects.add(DomainObject.SELECT_ID);
			 * singleSelects.add(DomainObject.SELECT_CURRENT); StringList multiSelects = new
			 * StringList();
			 * 
			 * 
			 * MapList mlRevs = doObj.getRevisionsInfo(context, singleSelects,
			 * multiSelects);
			 * 
			 * if(bLatestRev && !mlRevs.isEmpty() && mlRevs.size()>1) { BusinessObject
			 * doPreviousRev = doObj.getPreviousRevision(context); flag = true;
			 * ContextUtil.pushContext(context); doPreviousRev.demote(context); //
			 * ContextUtil.popContext(context); }
			 */
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw ex;
         }
        return 0;
    }

    /**
     * Get all project which are connected with "Initiated Template Project" relationship.
     * @param context - The ENOVIA <code>Context</code> object.
     * @param args - Holds information related context object.
     * @return - Project list.
     * @throws Exception if operation fails.
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getProjects(Context context,String[]args)throws Exception
    {
        Map arguMap     = (Map)JPO.unpackArgs(args);
        String objectId = (String) arguMap.get("objectId");
        String invokeFrom   = (String) arguMap.get("invokeFrom");

        if(ProgramCentralUtil.isNullString(objectId)){
            throw new IllegalArgumentException("objectId parameter is null or empty");
        }

        StringList objectSelect = new StringList(1);
        objectSelect.addElement(ProgramCentralConstants.SELECT_PROJECT_ID_FROM_TEMPLATE);

        DomainObject templateObj = DomainObject.newInstance(context, objectId);

        //Get all revision of template
        BusinessObjectList revisionList =
                templateObj.getRevisions(context);
        BusinessObjectItr boItr =
                new BusinessObjectItr(revisionList);

        String revObjIds[] = new String[revisionList.size()];

        int oidCnt = 0;
        BusinessObject bo;
        while (boItr.next()) {
            bo = boItr.obj();
            revObjIds[oidCnt++] = bo.getObjectId(context);
        }
        boItr.reset();

        MapList objectList = new MapList();
        BusinessObjectWithSelectList bwsl = null;

        if("TestCase".equalsIgnoreCase(invokeFrom)){ //Added for ODT
            bwsl = ProgramCentralUtil.
                    getObjectWithSelectList(context, revObjIds, objectSelect,false);
        }else{
            bwsl = ProgramCentralUtil.
                getObjectWithSelectList(context, revObjIds, objectSelect);
        }

        bwsl.forEach(bws->{
            StringList projectIdList =((BusinessObjectWithSelect) bws)
                    .getSelectDataList(ProgramCentralConstants.SELECT_PROJECT_ID_FROM_TEMPLATE);
            if(projectIdList != null)
                projectIdList.forEach(id->{
                    Map<String,String> projectMap = new HashMap();
                    projectMap.put(SELECT_ID, (String) id);
                    objectList.add(projectMap);
                });
        });

        return objectList;
    }

	/**
     * Get Template name list for all the questions and subquestions present in that template.
     * @param context - The ENOVIA <code>Context</code> object.
     * @param args - Holds information related context object.
     * @return - Template Name list.
     * @throws Exception if operation fails.
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getProjectTemplateNameForQuestions(Context context,String[]args)throws Exception
    {
        Map arguMap     = (Map)JPO.unpackArgs(args);
        Map paramMap = (Map) arguMap.get("paramList");
        MapList objectList = (MapList) arguMap.get("objectList");
        String objectId = (String) arguMap.get("objectId");
        String invokeFrom   = (String) arguMap.get("invokeFrom");
        String templateId   = (String) paramMap.get("parentOID");
        StringList templateNameList   = new StringList();
        String templateName   = "";
		if(ProgramCentralUtil.isNotNullString(templateId)){
			DomainObject templateObj = new DomainObject(templateId);
			templateName = (String) templateObj.getName(context);
		}
		
		for(int objectListItr=0; objectListItr<objectList.size();objectListItr++){
			templateNameList.add(templateName);
		}

        return templateNameList;
    }

	public static int triggerCheckRouteState(Context context, String[] args) throws Exception {

String type = MqlUtil.mqlCommand(context, "get env $1", "TYPE");
		String name = MqlUtil.mqlCommand(context, "get env $1", "NAME");
		String rev = MqlUtil.mqlCommand(context, "get env $1", "REVISION");
		String id = MqlUtil.mqlCommand(context, "get env $1", "OBJECTID");
		String state = MqlUtil.mqlCommand(context, "get env $1", "CURRENTSTATE");
		String policy = MqlUtil.mqlCommand(context, "get env $1", "POLICY");
    	ContextUtil.pushContext(context);
    	DomainObject object = DomainObject.newInstance(context, id);
    	object.open(context);
		String relObjectRoute = PropertyUtil.getSchemaProperty(context, "relationship_ObjectRoute");
		String typeRoute = PropertyUtil.getSchemaProperty(context, "type_Route");
String stateCompete = CacheManager.getInstance().getValue(context, _entityNames.POLICY_STATES, "policy_Route", "state_Complete");

    	String policySymbName = FrameworkUtil.getAliasForAdmin(context, "policy", policy, true);
    	String stateSymbName = FrameworkUtil.reverseLookupStateName(context, policy, state);

    	String sAdHocRouteName= (String) EnoviaResourceBundle.getProperty(context, "emxFramework.Lifecycle.AdHocRouteName");

    	String attrRouteBasePolicy = "attribute[" + DomainObject.ATTRIBUTE_ROUTE_BASE_POLICY + "]";
    	String attrRouteBaseState = "attribute[" + DomainObject.ATTRIBUTE_ROUTE_BASE_STATE + "]";
    	// IR-955918
    	char SYMB_OPEN_PARAN = '(';
    	char SYMB_CLOSE_PARAN = ')';
    	char SYMB_QUOTE = '\'';
    	String SYMB_AND = " && ";
    	String SYMB_OR = " || ";
    	String SYMB_EQUAL = " == ";


    	StringBuffer sbRelWhereExp = new StringBuffer();

    	Boolean strAreAdhocRoutesBlocking=true;
    	String strAdhocRouteSetting=MqlUtil.mqlCommand(context, "execute program $1 $2 $3 $4 $5 $6 $7","emxMailUtil","-method","getMessage",
    			"emxFramework.AdHocRoutesBlockLifecycle","0","","emxSystem");
    	if(strAdhocRouteSetting!=null){
    		strAreAdhocRoutesBlocking= Boolean.valueOf(strAdhocRouteSetting);
    	}
    	sbRelWhereExp.append(SYMB_OPEN_PARAN);
    	sbRelWhereExp.append(SYMB_OPEN_PARAN);
    	sbRelWhereExp.append(SYMB_OPEN_PARAN).append(attrRouteBasePolicy).append(SYMB_EQUAL).append(SYMB_QUOTE).append(policySymbName).append(SYMB_QUOTE).append(SYMB_CLOSE_PARAN);
    	sbRelWhereExp.append(SYMB_AND);
    	sbRelWhereExp.append(SYMB_OPEN_PARAN).append(attrRouteBaseState).append(SYMB_EQUAL).append(SYMB_QUOTE).append(stateSymbName).append(SYMB_QUOTE).append(SYMB_CLOSE_PARAN);
    	sbRelWhereExp.append(SYMB_CLOSE_PARAN);

    	sbRelWhereExp.append(SYMB_OR);
    	sbRelWhereExp.append(SYMB_OPEN_PARAN).append(attrRouteBaseState).append(SYMB_EQUAL).append(SYMB_QUOTE).append(sAdHocRouteName).append(SYMB_QUOTE).append(SYMB_CLOSE_PARAN);
    	sbRelWhereExp.append(SYMB_CLOSE_PARAN);            


		StringList busSelects = new StringList();
		busSelects.addElement("type");
		busSelects.addElement("name");
		busSelects.addElement("revision");
		busSelects.addElement("current");
		StringList relSelects = new StringList();
    	MapList list = object.getRelatedObjects(context, relObjectRoute, typeRoute, busSelects, relSelects, false, true, (short) 1, null, sbRelWhereExp.toString(), 0);

		object.close(context);
		ContextUtil.popContext(context);

		boolean bPromoteFlag = false;
		StringBuffer inWorkRoutes = new StringBuffer();

		for(int i = 0; list != null && i < list.size(); i++) {
			Map route = (Map)list.get(i);
			String routeType = (String)route.get("type");
			String routeName = (String)route.get("name");
			String routeRev = (String)route.get("revision");
			String routeState = (String)route.get("current");
			
				if(!routeState.equals(stateCompete)) {
					bPromoteFlag = true;
					inWorkRoutes.append("'" + routeType + "' '" + routeName + "' '" + routeRev + "'");
				}
		}

		if (bPromoteFlag) {
			String[] keys = new String[5];
			String[] values = new String[5];
			keys[0] = "Type";
			keys[1] = "Name";
			keys[2] = "Rev";
			keys[3] = "WorkRoute";
			values[0] = type;
			values[1] = name;
			values[2] = rev;
			values[3] = inWorkRoutes.toString();

			throw new Exception(MessageUtil.getMessage(context, "emxFramework.ProgramObject.eServicecommonCheckRoutes_if.RouteNotComplete", keys, values, null));
		}
		return 0;
	
    }
	
	//Autonaming Enforcement
    public HashMap getAutoNameSeriesRange(Context context, String[] args)
            throws Exception
    {
    	HashMap rangeMap = new HashMap();
    	String mqlQuery = "temp query bus $1 $2 $3 select $4 $5 dump";
    	String projectInfo = com.matrixone.apps.domain.util.MqlUtil.mqlCommand(context, mqlQuery, "eService Object Generator" , "type_ProjectSpace", "*", DomainConstants.SELECT_ID, DomainConstants.SELECT_REVISION);
    	String[] projectNameGenerators = projectInfo.split("\n");

    	StringList fieldChoices = new StringList();
    	StringList fieldDisplayChoices = new StringList();

    	for(String generator : projectNameGenerators) {
    		String[] generatorDetails = generator.split(",");
    		String revision = generatorDetails[2];
    		String id = generatorDetails[3];
    		
    		fieldChoices.add(id);
			fieldDisplayChoices.add(revision);
    	}
    	rangeMap.put("field_choices", fieldChoices);
    	rangeMap.put("field_display_choices", fieldDisplayChoices);

    	return rangeMap;
    }
	
    @com.matrixone.apps.framework.ui.ProgramCallable
	public String getAutonameSeries(Context context, String[] args) throws Exception{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String objectId = (String)requestMap.get("objectId");
        String revision = DomainConstants.EMPTY_STRING;
        try{
			DomainObject projectTemplate = DomainObject.newInstance(context,objectId);
			String generatorId = projectTemplate.getAttributeValue(context, "ProjectAutonameSeries");
        
			if(ProgramCentralUtil.isNotNullString(generatorId) && !generatorId.isEmpty()) {
				String mqlQuery = "print bus $1 select $2 dump";
				revision = com.matrixone.apps.domain.util.MqlUtil.mqlCommand(context, mqlQuery, generatorId, DomainConstants.SELECT_REVISION);
				return ProgramCentralUtil.isNotNullString(revision) ? revision : DomainConstants.EMPTY_STRING;
			}
		}
		catch(Exception ex) {
	        ex.printStackTrace();
	     }
		 return revision;	
	}
	
	 public boolean updateAutonameSeries(Context context,String args[]) throws Exception
	    {
	        HashMap programMap = (HashMap) JPO.unpackArgs(args);
	        Map requestMap = (Map)programMap.get("requestMap");  
	        Map paramMap = (Map) programMap.get("paramMap");  
	        String strObjectId = (String)paramMap.get("objectId");
	        String newSeriesId = (String)paramMap.get("New Value");
	        try {
	        	ProjectTemplate domTemplate =new ProjectTemplate(strObjectId);		        		       
		        domTemplate.setAttributeValue(context, "ProjectAutonameSeries", newSeriesId);
		        return true;	
	        }
	        catch(Exception ex) {
	        	ex.printStackTrace();
	        	return false;
	        }
	        
	    }
		
	public boolean autonamingAccess(Context context, String args[]) throws Exception{
		try{
			System.out.println("In autonamingAccess");
			String mqlQuery = "temp query bus $1 $2 $3";
			String projectInfo = com.matrixone.apps.domain.util.MqlUtil.mqlCommand(context, mqlQuery, "eService Object Generator" , "type_ProjectSpace", "*");
			System.out.println("In autonamingAccess projectInfo : "+projectInfo);
			String[] projectNameGenerators = projectInfo.split("\n");
			return projectNameGenerators.length > 1 ? true : false;
		}
		catch(Exception e){
			return false;
		}
	}
	
	/**
     * It checks if the user has access for question commands and if Template is in either Released or Obsolete state
     *
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public boolean hasAccessToQuestionCommands(Context context, String[] args) throws Exception {
        Map programMap = (Map) JPO.unpackArgs(args);
        String templateId = (String) programMap.get("objectId");
		boolean hasAccessToQuestionCommandsStatus = false;
		
		StringList busSelects = new StringList();
        busSelects.add(DomainObject.SELECT_CURRENT);

        ProjectTemplate projectTemplateObj = new ProjectTemplate(templateId);
        Map infoMap = projectTemplateObj.getInfo(context, busSelects);
		
		String currentState = (String)infoMap.get(DomainObject.SELECT_CURRENT);
		if(!("Released".equalsIgnoreCase(currentState) || "Obsolete".equalsIgnoreCase(currentState))){
			hasAccessToQuestionCommandsStatus = projectTemplateObj.isOwnerOrCoOwner(context, templateId);
		}
        return hasAccessToQuestionCommandsStatus;
    }
}
