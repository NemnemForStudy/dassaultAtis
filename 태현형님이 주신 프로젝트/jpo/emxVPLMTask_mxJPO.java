//
// $Id: ${CLASSNAME}.java.rca 1.1.1.4.2.2 Thu Dec  4 07:56:08 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.1.1.4.2.1 Thu Dec  4 01:54:59 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.1.1.4 Wed Oct 22 15:50:25 2008 przemek Experimental przemek $
//
// emxVPLMTask.java
//
// Copyright (c) 2007-2020 Dassault Systemes.
// All Rights Reserved
// This program contains proprietary and trade secret information of
// MatrixOne, Inc.  Copyright notice is precautionary only and does
// not evidence any actual or intended publication of such program.
//

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import com.dec.util.DecConstants;
import com.dec.util.DecStringUtil;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;

import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

/**
 * The <code>emxVPLMTask</code> class represents the VPLM Task JPO functionality
 * for the AEF type VPLM Task.
 *
 * @version AEF 10.7.SP1 - Copyright (c) 2007, MatrixOne, Inc.
 */
public class emxVPLMTask_mxJPO extends emxVPLMTaskBase_mxJPO {
	/**
	 * Constructor.
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds no arguments
	 * @throws Exception if the operation fails
	 * @since AEF 10-7-SP1
	 */

	public emxVPLMTask_mxJPO(Context context, String[] args) throws Exception {
		super(context, args);
	}

	public Object getTaskReferenceDocuments(Context context, String[] args) throws Exception {
		try {
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			// Modified:11-June-09:yox:R207:PRG:Bug :372619
			// support for export and report format have been provided at lots of places
			// below also
			HashMap paramList = (HashMap) programMap.get("paramList");
			String strReportFormat = (String) paramList.get("reportFormat");
			String strExportFormat = (String) paramList.get("exportFormat");
			// End:yox:R207:PRG:Bug :372619
			MapList objectList = (MapList) programMap.get("objectList");
			Map tempMap = null;
			String taskId = "";
			Vector taskList = new Vector();
			String prefixDeliverableUrl = "<img src='../common/images/utilSpace.gif' width='1' height='25' /><a href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=";
			// Modified:11-June-09:yox:R207:PRG:Bug :372619
			String prefixSpacerUrl = "<img src='../common/images/utilSpace.gif' width='1' height='25' />";
			// End:yox:R207:PRG:Bug :372619
			String anchorEnd = "</a>&#160;";
			String suffixDeliverableUrl = "', '930', '650', 'false', 'popup', '')\" class=\"object\">";
			StringBuffer tempURL = null; // Used to form url of all objects if multiple tasks are connected.

			String[] taskIds = new String[objectList.size()];
			for (int i = 0; i < objectList.size(); i++) {
				tempMap = (Map) objectList.get(i);
				taskId = (String) tempMap.get("id");
				if (taskId != null && !"".equals(taskId)) {
					taskIds[i] = taskId;
				}
			}
			StringList busSel = new StringList();
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.id");
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.name");
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to."
					+ ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE);
			String SELECT_FROM_TYPE = "to[Data Vaults].from.type";

			Map<String, StringList> derivativeMap = ProgramCentralUtil.getDerivativeTypeListFromUtilCache(context,
					ProgramCentralConstants.TYPE_PROJECT_SPACE, ProgramCentralConstants.TYPE_PROJECT_CONCEPT,
					ProgramCentralConstants.TYPE_PROJECT_TEMPLATE);

			StringList subTypeList = new StringList();
			subTypeList.addAll(derivativeMap.get(ProgramCentralConstants.TYPE_PROJECT_SPACE));
			subTypeList.addAll(derivativeMap.get(ProgramCentralConstants.TYPE_PROJECT_CONCEPT));
			subTypeList.addAll(derivativeMap.get(ProgramCentralConstants.TYPE_PROJECT_TEMPLATE));

			BusinessObjectWithSelectList tasksObjectWithSelectList = null;
			tasksObjectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, taskIds, busSel);

			for (BusinessObjectWithSelect bws : tasksObjectWithSelectList) {
				tempURL = new StringBuffer();
				StringList deliverablesIdList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.id");
				StringList deliverablesNameList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.name");
				StringList deliverablesTypeList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
				StringList deliverablesTitleList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to." + ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE);
//                  System.out.println("deliverablesTitleList "+deliverablesTitleList);
//                  if (deliverablesTitleList != null) {
//                  System.out.println("deliverablesTitleList.size() "+deliverablesTitleList.size());
//                  }
				int deliverablesAdded = 0;
				if (deliverablesIdList != null) {
					busSel = new StringList();
					busSel.add(SELECT_FROM_TYPE);
					busSel.add(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
					busSel.add(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
					BusinessObjectWithSelectList deliverablesObjectWithSelectList1 = null;
					deliverablesObjectWithSelectList1 = ProgramCentralUtil.getObjectWithSelectList(context,
							deliverablesIdList.toStringArray(), busSel);
					for (int x = 0; x < deliverablesIdList.size(); x++) {
						// Map deliverablesmap = (Map)deliverablesList.get(x);
						String deliverablesName = (String) deliverablesNameList.get(x);
						String deliverablesId = (String) deliverablesIdList.get(x);
						// Get Icon for the type
						String deliverablesType = (String) deliverablesTypeList.get(x);
						if(DecStringUtil.equals(deliverablesType, DecConstants.TYPE_URL)) {
							continue;
						}
						String strTypeSymName = FrameworkUtil.getAliasForAdmin(context, "type", deliverablesType, true);
						String typeIcon = "";
						try {
							typeIcon = EnoviaResourceBundle.getProperty(context,
									"emxFramework.smallIcon." + strTypeSymName);
						} catch (Exception e) {
							typeIcon = EnoviaResourceBundle.getProperty(context, "emxFramework.smallIcon.defaultType");
						}

						String defaultTypeIcon = "<img src='../common/images/" + typeIcon + "' border='0' />";

						BusinessObjectWithSelect deliverablesbws1 = deliverablesObjectWithSelectList1.get(x);
						String fromType = deliverablesbws1.getSelectData(SELECT_FROM_TYPE);
						String isKindOfWorkspace = deliverablesbws1
								.getSelectData(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
						String isKindOfControlledFolder = deliverablesbws1
								.getSelectData(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);

						String deliverableTitle = (String) deliverablesTitleList.get(x);
						if ("TRUE".equalsIgnoreCase(isKindOfControlledFolder)
								|| "TRUE".equalsIgnoreCase(isKindOfWorkspace)) {
							deliverablesName = deliverableTitle;
						}

						// deliverable hyperlink formation
						// Modified:11-June-09:yox:R207:PRG:Bug :372619
						if ("CSV".equalsIgnoreCase(strExportFormat)) {
							tempURL.append(deliverablesName);
							if (x != (deliverablesIdList.size() - 1)) {
								tempURL.append(",");
							}
						} else {
							if ("HTML".equalsIgnoreCase(strReportFormat)) {
								tempURL.append(prefixSpacerUrl);
								tempURL.append(defaultTypeIcon);
								tempURL.append(XSSUtil.encodeForXML(context, deliverablesName));
							} else {
								tempURL.append(prefixDeliverableUrl);
								tempURL.append(deliverablesId);
								if ("TRUE".equalsIgnoreCase(isKindOfWorkspace) && subTypeList.contains(fromType)) {
									tempURL.append("&amp;emxSuiteDirectory=programcentral");
								}
								tempURL.append(suffixDeliverableUrl);
								tempURL.append(defaultTypeIcon);
								tempURL.append(XSSUtil.encodeForXML(context, deliverablesName));
								tempURL.append(anchorEnd);
							}
							tempURL.append("<br></br>"); // To show each task in different line.
						}
						deliverablesAdded++;
						// End:R207:PRG:Bug :372619
					}
				}

				if (deliverablesAdded == 0)
					tempURL.append(" ");
				taskList.add(tempURL.toString());

			}

			return taskList;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}

	public Object getTaskReferenceDocumentTypes(Context context, String[] args) throws Exception {
		try {
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			// Added:11-June-09:yox:R207:PRG:Bug :372619
			HashMap paramList = (HashMap) programMap.get("paramList");
			String languageStr = (String) paramList.get("languageStr");
			String strExportFormat = (String) paramList.get("exportFormat");
			// End:R207:PRG:Bug :372619;
			MapList objectList = (MapList) programMap.get("objectList");
			Map tempMap = null;

			String taskId = "";

			Vector taskList = new Vector();
			String prefixDeliverableUrl = "<b><img src='..common/images/utilSpace.gif' width='1' height='25' />";
			// String anchorEnd = "</a>&nbsp";
			String suffixDeliverableUrl = "</b>";
			StringBuffer sbfURL = null;
			sbfURL = new StringBuffer();
			sbfURL.append(" ");
			StringBuffer tempURL = null; // Used to form url of all objects if multiple tasks are connected.
			String[] taskIds = new String[objectList.size()];
			for (int i = 0; i < objectList.size(); i++) {
				tempMap = (Map) objectList.get(i);
				taskId = (String) tempMap.get("id");
				if (taskId != null && !"".equals(taskId)) {
					taskIds[i] = taskId;
				}
			}
			StringList busSel = new StringList();
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");

			BusinessObjectWithSelectList tasksObjectWithSelectList = null;
			tasksObjectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, taskIds, busSel);

			for (BusinessObjectWithSelect bws : tasksObjectWithSelectList) {
				tempURL = new StringBuffer();
				StringList deliverablesList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");

				int deliverablesAdded = 0;
				if (deliverablesList != null) {

					int deliverablesSize = deliverablesList.size();
					for (int x = 0; x < deliverablesSize; x++) {
						String deliverablesType = (String) deliverablesList.get(x);
						if(DecStringUtil.equals(deliverablesType, DecConstants.TYPE_URL)) {
							continue;
						}
						deliverablesType = i18nNow.getTypeI18NString(deliverablesType, languageStr);
						// deliverable hyperlink formation
						if ("CSV".equals(strExportFormat)) {
							tempURL.append(deliverablesType);
							if (x != (deliverablesSize - 1)) {
								tempURL.append(",");
							}

						} else {
							tempURL.append(prefixDeliverableUrl);
							tempURL.append(deliverablesType);
							tempURL.append(suffixDeliverableUrl);
							tempURL.append("<br></br>"); // To show each type in different line.
						}
						deliverablesAdded++;
						// End:R207:PRG:Bug :372619
					}
				}

				if (deliverablesAdded == 0)
					tempURL.append(" ");
				taskList.add(tempURL.toString());

			}

			return taskList;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}

	public Object getTaskReferenceDocumentStates(Context context, String[] args) throws Exception {
		try {
//      get values from args.

			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			// Modified:11-June-09:yox:R207:PRG:Bug :372619
			HashMap paramList = (HashMap) programMap.get("paramList");
			String languageStr = (String) paramList.get("languageStr");
			String strExportFormat = (String) paramList.get("exportFormat");
			// End:R207:PRG:Bug :372619
			MapList objectList = (MapList) programMap.get("objectList");
			Map tempMap = null;

			String taskId = "";

			Vector taskList = new Vector();
			String prefixDeliverableUrl = "<b><img src='../common/images/utilSpace.gif' width='1' height='25' />";
			String suffixDeliverableUrl = "</b>";

			StringBuffer tempURL = null; // Used to form url of all objects if multiple tasks are connected.
			String[] taskIds = new String[objectList.size()];
			for (int i = 0; i < objectList.size(); i++) {
				tempMap = (Map) objectList.get(i);
				taskId = (String) tempMap.get("id");
				if (taskId != null && !"".equals(taskId)) {
					taskIds[i] = taskId;
				}
			}
			StringList busSel = new StringList();
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.policy");
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.current");

			BusinessObjectWithSelectList tasksObjectWithSelectList = null;
			tasksObjectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, taskIds, busSel);

			for (BusinessObjectWithSelect bws : tasksObjectWithSelectList) {
				tempURL = new StringBuffer();
				StringList deliverablesTypeList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
				StringList deliverablesPolicyList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.policy");
				StringList deliverablesStateList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.current");

				int deliverablesAdded = 0;
				if (deliverablesStateList != null) {
					int deliverablesSize = deliverablesStateList.size();
					for (int x = 0; x < deliverablesSize; x++) {
						String deliverablesType = (String) deliverablesTypeList.get(x);
						if(DecStringUtil.equals(deliverablesType, DecConstants.TYPE_URL)) {
							continue;
						}
						String deliverablesPolicy = (String) deliverablesPolicyList.get(x);
						String deliverablesState = (String) deliverablesStateList.get(x);
						// Modified:11-June-09:yox:R207:PRG:Bug :372619
						// String deliverablesPolicy = (String)deliverablesmap.get(SELECT_POLICY);
						deliverablesState = i18nNow.getStateI18NString(deliverablesPolicy, deliverablesState,
								languageStr);
						// deliverable state formation
						if ("CSV".equals(strExportFormat)) {
							tempURL.append(deliverablesState);
							if (x != (deliverablesSize - 1)) {
								tempURL.append(",");
							}
						} else {
							tempURL.append(prefixDeliverableUrl);
							tempURL.append(deliverablesState);
							tempURL.append(suffixDeliverableUrl);
							tempURL.append("<br></br>"); // To show each state in different line.
						}
						deliverablesAdded++;
						// End:R207:PRG:Bug :372619
					}
				}

				if (deliverablesAdded == 0)
					tempURL.append(" ");
				taskList.add(tempURL.toString());

			}

			return taskList;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}

	/**
	 * This function get Deliverable owners for the Deliverable report.
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments: 0 - String containing the
	 *                object id
	 * @throws Exception if operation fails
	 * @since AEF 10.7.1.0
	 */
	public Object getTaskReferenceDocumentOwners(Context context, String[] args) throws Exception {
		try {
//      get values from args.

			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			// Added:11-June-09:yox:R207:PRG:Bug :372619
			HashMap paramList = (HashMap) programMap.get("paramList");
			String strExportFormat = (String) paramList.get("exportFormat");
			// End:R207:PRG:Bug :372619
			MapList objectList = (MapList) programMap.get("objectList");
			Map tempMap = null;

			String taskId = "";

			Vector taskList = new Vector();
			String prefixDeliverableUrl = "<b><img src='../common/images/utilSpace.gif' width='1' height='25' />";
			String suffixDeliverableUrl = "</b>";

			StringBuffer tempURL = null; // Used to form url of all objects if multiple tasks are connected.
			String[] taskIds = new String[objectList.size()];
			for (int i = 0; i < objectList.size(); i++) {
				tempMap = (Map) objectList.get(i);
				taskId = (String) tempMap.get("id");
				if (taskId != null && !"".equals(taskId)) {
					taskIds[i] = taskId;
				}
			}
			StringList busSel = new StringList();
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.owner");

			BusinessObjectWithSelectList tasksObjectWithSelectList = null;
			tasksObjectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, taskIds, busSel);

			for (BusinessObjectWithSelect bws : tasksObjectWithSelectList) {
				tempURL = new StringBuffer();
				StringList deliverablesTypeList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
				StringList deliverablesOwnerList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.owner");
				int deliverablesAdded = 0;

				if (deliverablesOwnerList != null) {
					int deliverableOwnerListSize = deliverablesOwnerList.size();
					for (int x = 0; x < deliverableOwnerListSize; x++) {
						String deliverablesType = (String) deliverablesTypeList.get(x);
						if(DecStringUtil.equals(deliverablesType, DecConstants.TYPE_URL)) {
							continue;
						}
						String deliverablesOwner = (String) deliverablesOwnerList.get(x);
						if ("CSV".equals(strExportFormat)) {
							if (x == 0) {
								tempURL.append("\"");
							}
							tempURL.append(XSSUtil.encodeForURL(context, deliverablesOwner));
							if (x != (deliverableOwnerListSize - 1)) {
								tempURL.append(",");
							} else {
								tempURL.append("\"");
							}
						} else {
							tempURL.append(prefixDeliverableUrl);
							tempURL.append(XSSUtil.encodeForURL(context, deliverablesOwner));
							tempURL.append(suffixDeliverableUrl);
							tempURL.append("<br></br>"); // To show each owner in different line.
						}
						deliverablesAdded++;
						// End:R207:PRG:Bug :372619
					}
				}

				if (deliverablesAdded == 0)
					tempURL.append(" ");
				taskList.add(tempURL.toString());

			}

			return taskList;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}

	/**
	 * This function get Deliverable revisions for the Deliverable report.
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments: 0 - String containing the
	 *                object id
	 * @throws Exception if operation fails
	 * @since AEF 10.7.1.0
	 */
	public Object getTaskReferenceDocumentRevisions(Context context, String[] args) throws Exception {
		try {

			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			// Added:11-June-09:yox:R207:PRG:Bug :372619
			HashMap paramList = (HashMap) programMap.get("paramList");
			String languageStr = (String) paramList.get("languageStr");
			String strExportFormat = (String) paramList.get("exportFormat");
			// End:R207:PRG:Bug :372619
			MapList objectList = (MapList) programMap.get("objectList");
			Map tempMap = null;

			String taskId = "";

			Vector taskList = new Vector();
			String prefixDeliverableUrl = "<b><img src='../common/images/utilSpace.gif' width='1' height='25' />";
			String suffixDeliverableUrl = "</b>";

			StringBuffer tempURL = null; // Used to form url of all objects if multiple tasks are connected.
			String[] taskIds = new String[objectList.size()];
			for (int i = 0; i < objectList.size(); i++) {
				tempMap = (Map) objectList.get(i);
				taskId = (String) tempMap.get("id");
				if (taskId != null && !"".equals(taskId)) {
					taskIds[i] = taskId;
				}
			}
			StringList busSel = new StringList();
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to." + ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to." + ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.revision");

			BusinessObjectWithSelectList objectWithSelectList = null;
			objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, taskIds, busSel);

			for (BusinessObjectWithSelect bws : objectWithSelectList) {
				tempURL = new StringBuffer();
				StringList deliverablesTypeList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
				StringList deliverablesRevisionList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.revision");
				StringList isDeliverableControlledFolder = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to." + ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
				StringList isDeliverableWorkspaceVault = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to." + ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);

				int deliverablesAdded = 0;
				if (deliverablesRevisionList != null) {

					int deliverablesSize = deliverablesRevisionList.size();
					for (int x = 0; x < deliverablesSize; x++) {
						String deliverablesType = (String) deliverablesTypeList.get(x);
						if(DecStringUtil.equals(deliverablesType, DecConstants.TYPE_URL)) {
							continue;
						}
						String deliverablesRevision = (String) deliverablesRevisionList.get(x);
						boolean isWorkspaceFolder = "TRUE".equalsIgnoreCase((String) isDeliverableWorkspaceVault.get(x))
								&& !"TRUE".equalsIgnoreCase((String) isDeliverableControlledFolder.get(x));
						if (isWorkspaceFolder) {
							deliverablesRevision = EMPTY_STRING;
						}
						// deliverable state formation
						if ("CSV".equals(strExportFormat)) {
							if (deliverablesAdded > 0)
								tempURL.append(",");
							tempURL.append(XSSUtil.encodeForURL(context, deliverablesRevision));
						} else {
							tempURL.append(prefixDeliverableUrl);
							tempURL.append(XSSUtil.encodeForURL(context, deliverablesRevision));
							tempURL.append(suffixDeliverableUrl);
							tempURL.append("<br></br>"); // To show each revision in different line.
						}
						deliverablesAdded++;
						// End:R207:PRG:Bug :372619
					}
				}

				if (deliverablesAdded == 0)
					tempURL.append(" ");
				taskList.add(tempURL.toString());

			}

			return taskList;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}

	/**
	 * This method is executed to get file names associated to document
	 * deliverables.
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds arguments
	 * @returns Object
	 * @throws Exception if the operation fails
	 * @since PMC X+2
	 * @grade 0
	 */

	public Object getTaskReferenceDocumentFiles(Context context, String[] args) throws Exception {
		try {
			// get values from args.
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			// Added:11-June-09:yox:R207:PRG:Bug :372619
			HashMap paramList = (HashMap) programMap.get("paramList");
			String strReportFormat = (String) paramList.get("reportFormat");
			String strExportFormat = (String) paramList.get("exportFormat");
			// End:R207:PRG:Bug :372619
			MapList objectList = (MapList) programMap.get("objectList");
			Map tempMap = null;
			String taskId = "";
			Vector taskList = new Vector();
			// Added:11-June-09:yox:R207:PRG:Bug :372619
			String prefixSpacerUrl = "<img src='../common/images/utilSpace.gif' width='1' height='25' />";
			// End:R207:PRG:Bug :372619
			String prefixDeliverableUrl = "<a href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=";
			String anchorEnd = "</a>";
			String suffixDeliverableUrl = "', '930', '650', 'false', 'popup', '')\" class=\"object\">";
			StringBuffer tempURL = null; // Used to form url of all objects if multiple tasks are connected.
			String activeVersion = PropertyUtil.getSchemaProperty(context, SYMBOLIC_relationship_ActiveVersion);
			String attributeTitle = PropertyUtil.getSchemaProperty(context, SYMBOLIC_attribute_Title);
			String select_Files = "from[" + activeVersion + "].to.attribute[" + attributeTitle + "].value";
			String select_File_Ids = "from[" + activeVersion + "].to.id";

			String[] taskIds = new String[objectList.size()];
			for (int i = 0; i < objectList.size(); i++) {
				tempMap = (Map) objectList.get(i);
				taskId = (String) tempMap.get("id");
				if (taskId != null && !"".equals(taskId)) {
					taskIds[i] = taskId;
				}
			}
			StringList busSel = new StringList();
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.id");

			BusinessObjectWithSelectList tasksObjectWithSelectList = null;
			tasksObjectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, taskIds, busSel);

			for (BusinessObjectWithSelect bws : tasksObjectWithSelectList) {
				tempURL = new StringBuffer();
				StringList deliverablesTypeList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
				StringList deliverablesIdList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.id");
				busSel = new StringList();
				busSel.add(select_Files);
				busSel.add(select_File_Ids);
				BusinessObjectWithSelectList deliverablesObjectWithSelectList1 = null;

				int deliverablesAdded = 0;
				if (deliverablesIdList != null) {
					int deliverablesSize = deliverablesIdList.size();
					deliverablesObjectWithSelectList1 = ProgramCentralUtil.getObjectWithSelectList(context, deliverablesIdList.toStringArray(), busSel);
					for (int x = 0; x < deliverablesSize; x++) {
						String deliverablesType = (String) deliverablesTypeList.get(x);
						if(DecStringUtil.equals(deliverablesType, DecConstants.TYPE_URL)) {
							continue;
						}
						BusinessObjectWithSelect deliverablebws1 = deliverablesObjectWithSelectList1.get(x);
						StringList deliverablesName = deliverablebws1.getSelectDataList(select_Files);
						StringList deliverablesId = deliverablebws1.getSelectDataList(select_File_Ids);
						// deliverable hyperlink formation
						if (deliverablesId == null || deliverablesName == null || deliverablesId.isEmpty()
								|| deliverablesName.isEmpty()) {
							if (!"CSV".equals(strExportFormat)) {
								tempURL.append("<b>");
								tempURL.append(" ");
								tempURL.append("</b>");
								tempURL.append("<br></br>"); // To show each entry in different line.
							} else {
								if (deliverablesAdded > 0)
									tempURL.append(",");

								tempURL.append("[]");
							}
						} else { // modified:14-March-09:yox:R207:PRG:Bug :SR00016218
							if (deliverablesId instanceof StringList) {
								if (deliverablesId.size() > 0) {
									if (!"CSV".equals(strExportFormat)) {
										tempURL.append(prefixSpacerUrl);
									} else if (deliverablesAdded > 0)
										tempURL.append(",");

									tempURL.append("[");
									for (int i = 0; i < deliverablesId.size(); i++) {
										String strDeliverableId = (String) deliverablesId.get(i);
										String strDeliverableName = (String) deliverablesName.get(i);

										if ("CSV".equals(strExportFormat)) {
											// Encoding for deliverable name removed to fix IR-830209
											tempURL.append(strDeliverableName);
											if (i != (deliverablesId.size() - 1)) {
												tempURL.append(",");
											}
										} else {
											if ("HTML".equals(strReportFormat)) {
												tempURL.append(XSSUtil.encodeForXML(context, strDeliverableName));
											} else {
												tempURL.append(prefixDeliverableUrl);
												tempURL.append(XSSUtil.encodeForURL(context, strDeliverableId));
												tempURL.append("&amp;parentOID=" + strDeliverableId);
												tempURL.append("&amp;AppendParameters=true");
												tempURL.append(suffixDeliverableUrl);
												tempURL.append(XSSUtil.encodeForXML(context, strDeliverableName));
												tempURL.append(anchorEnd);
											}
											if (i != (deliverablesId.size() - 1)) {
												tempURL.append(",&#160;");
											}
										}
									}
									tempURL.append("]");
								}
							}
							if (!"CSV".equals(strExportFormat)) {
								tempURL.append("<br></br>"); // To show each entryin different line.
							}
							// End:R207:PRG :Bug :SR00016218
						}
						deliverablesAdded++;
					}
				}

				if (deliverablesAdded == 0)
					tempURL.append(" ");
				taskList.add(tempURL.toString());

			}

			return taskList;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}

	/**
	 * This method is executed to get file version associated to document
	 * deliverables.
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds arguments
	 * @returns Object
	 * @throws Exception if the operation fails
	 * @since PMC X+2
	 * @grade 0
	 */

	public Object getTaskReferenceDocumentVersions(Context context, String[] args) throws Exception {
		try {
//      get values from args.

			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			// Added:11-June-09:yox:R207:PRG:Bug :372619
			HashMap paramList = (HashMap) programMap.get("paramList");
			String strExportFormat = (String) paramList.get("exportFormat");
			// End:PRG:Bug :372619
			MapList objectList = (MapList) programMap.get("objectList");
			Map tempMap = null;
			String taskId = "";
			Vector taskList = new Vector();
			String prefixDeliverableUrl = "<b><img src='../common/images/utilSpace.gif' width='1' height='25'/>";
			String suffixDeliverableUrl = "</b>";
			StringBuffer tempURL = null; // Used to form url of all objects if multiple tasks are connected.
			String activeVersion = PropertyUtil.getSchemaProperty(context, SYMBOLIC_relationship_ActiveVersion);
			String select_File_Revs = "from[" + activeVersion + "].to.revision";

			String[] taskIds = new String[objectList.size()];
			for (int i = 0; i < objectList.size(); i++) {
				tempMap = (Map) objectList.get(i);
				taskId = (String) tempMap.get("id");
				if (taskId != null && !"".equals(taskId)) {
					taskIds[i] = taskId;
				}
			}
			StringList busSel = new StringList();
			// busSel.add("from["+DomainObject.RELATIONSHIP_TASK_DELIVERABLE+"].to."+select_File_Revs);
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
			busSel.add("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.id");
			// MapList taskInfoList = DomainObject.getInfo(context, taskIds, busSel);

			BusinessObjectWithSelectList tasksObjectWithSelectList = null;
			tasksObjectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, taskIds, busSel);

			for (BusinessObjectWithSelect bws : tasksObjectWithSelectList) {
				tempURL = new StringBuffer();
				StringList deliverablesTypeList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.type");
				StringList deliverablesList = bws.getSelectDataList("from[" + DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT + "].to.id");
				busSel = new StringList();
				busSel.add(select_File_Revs);
				BusinessObjectWithSelectList deliverablesObjectWithSelectList1 = null;

				int deliverablesAdded = 0;
				if (deliverablesList != null) {
					int deliverablesSize = deliverablesList.size();
					deliverablesObjectWithSelectList1 = ProgramCentralUtil.getObjectWithSelectList(context,
							deliverablesList.toStringArray(), busSel);
					for (int x = 0; x < deliverablesSize; x++) {
						String deliverablesType = (String) deliverablesTypeList.get(x);
						if(DecStringUtil.equals(deliverablesType, DecConstants.TYPE_URL)) {
							continue;
						}
						BusinessObjectWithSelect deliverablebws1 = deliverablesObjectWithSelectList1.get(x);
						StringList deliverablesVersion = deliverablebws1.getSelectDataList(select_File_Revs);
						if (deliverablesVersion == null) {
							deliverablesVersion = new StringList();
						}

						if (deliverablesVersion == null || deliverablesVersion.equals("")) {
							tempURL.append("<b>");
							tempURL.append(" ");
							tempURL.append("</b>");
							tempURL.append("<br></br>"); // To show each entry in different line.

						} else {
							// Modified:11-June-09:yox:R207:PRG:Bug :372619
							if ("CSV".equals(strExportFormat)) {

								tempURL.append(deliverablesVersion);
								if (x != (deliverablesList.size() - 1)) {
									tempURL.append(",");
								}
							} else {
								tempURL.append(prefixDeliverableUrl);
								tempURL.append(deliverablesVersion);
								tempURL.append(suffixDeliverableUrl);
								tempURL.append("<br></br>"); // To show each entryin different line.
							}
						}
						deliverablesAdded++;
						// End:R207:PRG:Bug :372619
					}
				}

				if (deliverablesAdded == 0)
					tempURL.append(" ");
				taskList.add(tempURL.toString());

			}

			return taskList;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}
}
