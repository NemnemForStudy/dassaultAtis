//
// $Id: emxProjectConcept.java.rca 1.6 Wed Oct 22 16:21:23 2008 przemek Experimental przemek $ 
//
// emxProjectConcept.java
//
// Copyright (c) 2002-2020 Dassault Systemes.
// All Rights Reserved
// This program contains proprietary and trade secret information of
// MatrixOne, Inc.  Copyright notice is precautionary only and does
// not evidence any actual or intended publication of such program.
//

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.ProjectConcept;

import matrix.db.*;
import matrix.db.Access;
import matrix.util.StringList;

/**
 * The <code>emxProjectConcept</code> class represents the Project Concept JPO
 * functionality for the AEF type.
 *
 * @version AEF 10.0.SP4 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxProjectConcept_mxJPO extends emxProjectConceptBase_mxJPO
{

    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since AEF 10.0.SP4
     * @grade 0
     */
    public emxProjectConcept_mxJPO (Context context, String[] args)
        throws Exception
    {
      super(context, args);
    }
    
    // Modified by thok on 2023.05.19 --- [S]
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void performPostProcessActionsEdit(Context context, String[] args)
    throws Exception
    {
        try{
            com.matrixone.apps.program.ProjectConcept projectConcept =
                (com.matrixone.apps.program.ProjectConcept) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PROJECT_CONCEPT,DomainConstants.PROGRAM);

            com.matrixone.apps.common.Person person =
                (com.matrixone.apps.common.Person) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PERSON);

            final String ATTRIBUTE_SCHEDULE_FROM = PropertyUtil.getSchemaProperty(context, "attribute_ScheduleFrom");
            final String SELECT_ATTRIBUTE_SCHEDULE_FROM = "attribute[" + ATTRIBUTE_SCHEDULE_FROM + "]";

            final String RELATIONSHIP_CONTRIBUTES_TO = PropertyUtil.getSchemaProperty("relationship_ContributesTo");
            final String SELECT_CONTRIBUTES_TO_RELATIONSHIP_ID = "from[" + RELATIONSHIP_CONTRIBUTES_TO + "].id";

            StringList busSelects = new StringList(2);
            busSelects.add(ProjectConcept.SELECT_OWNER);
            busSelects.add(SELECT_PROJECT_ACCESS_LIST_ID);

            busSelects.add(SELECT_TYPE);
            busSelects.add(SELECT_ATTRIBUTE_SCHEDULE_FROM);
            busSelects.add(SELECT_CONTRIBUTES_TO_RELATIONSHIP_ID);

            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap requestMap = (HashMap) programMap.get("requestMap");
            HashMap paramMap = (HashMap) programMap.get("paramMap");
            String objectId = (String)paramMap.get("objectId");
            String businessUnitId= (String)requestMap.get("BusinessUnitId");
            String programId= (String)requestMap.get("ProgramId");
            String deliverableId= (String)requestMap.get("DeliverableEditable");
            //Modified for Bug # 340636 on 9/7/2007 - Start
            String ProjectName= (String)requestMap.get("ProjectName");

            projectConcept.setId(objectId);
            Map projectInfo = projectConcept.getInfo(context,busSelects);
            
            //
            // Following code is written for coping with TaskDateRollUp algorithm. This code should be moved to Schedule From attribute
            // modify Action trigger. Its late in X+4 to change the schema, hence the code is accomodated here.
            // When a project lead changes Schedule From attribute value for the existing project, following code
            // resets the time part of the project's estimated start/finish date appropriately, so that roll up process
            // algorithm still functions correctly.
            //
            String strScheduleFrom = (String)projectInfo.get(SELECT_ATTRIBUTE_SCHEDULE_FROM);
            String existingProjectScheduleFromVal = (String)requestMap.get("Schedule FromfieldValue");

            boolean isScheduledChanged = true;
            if(ProgramCentralUtil.isNullString(existingProjectScheduleFromVal) ||strScheduleFrom.equalsIgnoreCase(existingProjectScheduleFromVal)){
                isScheduledChanged = false;
            }

            //Added:NZF:22-Dec-2011:IR-091218V6R2012
            if(isScheduledChanged){
                com.matrixone.apps.program.Task task = (com.matrixone.apps.program.Task) DomainObject
                        .newInstance(context, DomainConstants.TYPE_TASK, "PROGRAM");
                task.setId(objectId);
                task.rollupAndSave(context);
            }

            //End:NZF:22-Dec-2011:IR-091218V6R2012

            String strType = (String)projectInfo.get(SELECT_TYPE);
            StringList prjSpaceSubTypes = getAllProjectSubTypeNames(context,DomainConstants.TYPE_PROJECT_SPACE);
            StringList prjConceptSubTypes = getAllProjectSubTypeNames(context,DomainConstants.TYPE_PROJECT_CONCEPT);
            String strProjType = "";
            // [MODIFIED::Jan 20, 2011:S4E:R211:TypeAhead::Start]
            String strFieldName="";
            if(prjSpaceSubTypes.contains(strType)){
                strProjType = DomainConstants.TYPE_PROJECT_SPACE;
                strFieldName ="ProjectSpaceOwner";
            } else if(prjConceptSubTypes.contains(strType)){
                strProjType = DomainConstants.TYPE_PROJECT_CONCEPT;
                strFieldName ="ProjectConceptOwner";
            }
            String ownerName =(String) requestMap.get(strFieldName);
            // [MODIFIED::Jan 20, 2011:S4E:R211:TypeAhead::End]
            BusinessType busType = new BusinessType(strProjType,context.getVault());
            if(busType.hasChildren(context))
            {
                String ActualType = (String) requestMap.get("ActualType");
                boolean isContextPushed = false;
                if (!(projectConcept.checkAccess(context,(short) AccessConstants.cModify)))
                {
                    ContextUtil.pushContext(context);
                    isContextPushed = true;
                }
                if(ActualType!=null && !ActualType.isEmpty()){
                    projectConcept.setType(context,ActualType,objectId,projectConcept.getPolicy(context).toString());
                }
                if(isContextPushed)
                    ContextUtil.popContext(context);
            }

            //Added for Change Discipline
            boolean isECHInstalled = com.matrixone.apps.domain.util.FrameworkUtil.isSuiteRegistered(context,"appVersionEnterpriseChange",false,null,null);
            if(isECHInstalled){
                if(projectConcept.isKindOf(context, PropertyUtil.getSchemaProperty(context,"type_ChangeProject"))){
                    String strInterfaceName = PropertyUtil.getSchemaProperty(context,"interface_ChangeDiscipline");
                    //Check if an the change discipline interface has been already connected
                    //PRG:RG6:R213:Mql Injection:parameterized Mql:20-Oct-2011:start
                    String sCommandStatement = "print bus $1 select $2 dump";
                    String sIsInterFacePresent = MqlUtil.mqlCommand(context, sCommandStatement,objectId,"interface[" + strInterfaceName + "]");
                  //PRG:RG6:R213:Mql Injection:parameterized Mql:20-Oct-2011:End

                    //If no interface --> add one
                    if("false".equalsIgnoreCase(sIsInterFacePresent)){
                        //PRG:RG6:R213:Mql Injection:parameterized Mql:20-Oct-2011:start
                        sCommandStatement = "modify bus $1 add interface $2";
                        MqlUtil.mqlCommand(context, sCommandStatement,objectId,strInterfaceName);
                      //PRG:RG6:R213:Mql Injection:parameterized Mql:20-Oct-2011:End
                    }

                    BusinessInterface busInterface = new BusinessInterface(strInterfaceName, context.getVault());
                    AttributeTypeList listInterfaceAttributes = busInterface.getAttributeTypes(context);

                    Iterator listInterfaceAttributesItr = listInterfaceAttributes.iterator();
                    while (listInterfaceAttributesItr.hasNext()){
                        String attrName = ((AttributeType)listInterfaceAttributesItr.next()).getName();
                        String attrNameSmall = attrName.replaceAll(" ", "");
                        String attrNameSmallHidden = attrNameSmall + "Hidden";
                        String attrNameValue = (String)requestMap.get(attrNameSmallHidden);

                        if(attrNameValue!=null && !attrNameValue.equalsIgnoreCase("")){
                            projectConcept.setAttributeValue(context, attrName, attrNameValue);
                        }else{
                            projectConcept.setAttributeValue(context, attrName, "No");
                        }
                    }
                }
            }
            //End Added for Change Discipline

            //Modified for Bug # 340636 on 9/7/2007 - End
            /*Map projectInfo = projectConcept.getInfo(context,busSelects);*/
            String oldOwner = (String) projectInfo.get(ProjectConcept.SELECT_OWNER);
            String accessObjectId = (String) projectInfo.get(SELECT_PROJECT_ACCESS_LIST_ID);
            DomainObject accessObject = DomainObject.newInstance(context,accessObjectId);
            if(ownerName!= null && !ownerName.equals("") && !ownerName.equals("null"))
            {
               projectConcept.setOwner(context,ownerName);
               accessObject.setOwner(context, ownerName);
            }

            person = com.matrixone.apps.common.Person.getPerson(context);

            // get the company id for this context
            com.matrixone.apps.common.Company company = person.getCompany(context);
            if(businessUnitId!= null && !businessUnitId.equals("") && !businessUnitId.equals("null"))
            {
                projectConcept.setBusinessUnit(context, businessUnitId);
            }
            else
            {
                projectConcept.setBusinessUnit(context, null);
            }
            // Connect Program
            if(programId!= null && !programId.equals("") && !programId.equals("null")) {
                projectConcept.setProgram(context, programId);
            } else {
                projectConcept.setProgram(context, null);
            }

            // Connect Deliverable
            String strContributesToId = (String)projectInfo.get(SELECT_CONTRIBUTES_TO_RELATIONSHIP_ID);
            if(ProgramCentralUtil.isNotNullString(deliverableId)){
                DomainObject deliverable = DomainObject.newInstance(context,deliverableId);

                if (ProgramCentralUtil.isNotNullString(strContributesToId))
                    DomainRelationship.setToObject( context, strContributesToId, deliverable);
                else
                    DomainRelationship.connect( context, projectConcept, RELATIONSHIP_CONTRIBUTES_TO, deliverable);
            }
            else
            {
                if (ProgramCentralUtil.isNotNullString(strContributesToId))
                    DomainRelationship.disconnect( context, strContributesToId);
            }

           if(ownerName!= null && !ownerName.equals("") && !ownerName.equals("null") && (!ownerName.equals(oldOwner))){
            Access accessMask = new Access();
            //accessMask.setReadAccess(true);
            //accessMask.setShowAccess(true);
            //Added 337605_1
            accessMask.setModifyAccess(true);
            accessMask.setExecuteAccess(true);
            accessMask.setUser(oldOwner);

            StringList userList = new StringList(1);
            userList.add(oldOwner);

            BusinessObjectList objects = new BusinessObjectList(1);
            objects.add(accessObject);

            boolean isContextPushed = false;

            ContextUtil.pushContext(context);
            isContextPushed = true;
            //revoke all access on the PAL object for the Old Owner
            BusinessObject.revokeAccessRights(context,objects,userList);
            //Grant the required access on the PAL object to the Old Owner
            BusinessObject.grantAccessRights(context,objects,accessMask);
            if(isContextPushed)
                ContextUtil.popContext(context);
           }
           
        }catch(Exception ee){
            String strMsg = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,
                    "emxProgramCentral.Experiment.ModifyAsscess", context.getSession().getLanguage());

            MqlUtil.mqlCommand(context, "warning $1", strMsg);
            ee.printStackTrace();
        }
    }
    
    private StringList getAllProjectSubTypeNames(Context context, String type) throws FrameworkException
    {
        StringList subTypeList = new StringList();
      //PRG:RG6:R213:Mql Injection:parameterized Mql:20-Oct-2011:start
        String sCommandStatement = "print type $1 select $2 dump $3";
        String subTypes = MqlUtil.mqlCommand(context, sCommandStatement,type,"derivative","|");
      //PRG:RG6:R213:Mql Injection:parameterized Mql:20-Oct-2011:End
        if("".equalsIgnoreCase(subTypes)){
            subTypeList.addElement(type);
            return subTypeList;
        } else {
            subTypes = subTypes+"|"+type;
        }
        subTypeList = FrameworkUtil.split(subTypes, "|");
        return subTypeList;
    }
    // Modified by thok on 2023.05.19 --- [E]
}
