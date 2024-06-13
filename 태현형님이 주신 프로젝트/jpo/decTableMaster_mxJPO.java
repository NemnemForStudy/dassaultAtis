/*
**  emxAEFCollectionBase
**
**  Copyright (c) 1992-2020 Dassault Systemes.
**  All Rights Reserved.
**  This program contains proprietary and trade secret information of MatrixOne,
**  Inc.  Copyright notice is precautionary only
**  and does not evidence any actual or intended publication of such program
**
**   This JPO contains the implementation of emxAEFCollectionBase
*/

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.dec.util.DecConstants;
import com.dec.util.DecMatrixUtil;
import com.dec.util.decListUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UITableCustom;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.State;
import matrix.util.Pattern;
import matrix.util.StringList;
/**
 * The <code>emxAEFCollectionBase</code> class contains methods for the
 * "Collection" Common Component.
 *
 * @version AEF 10.0.Patch1.0 - Copyright (c) 2003, MatrixOne, Inc.
 */
@SuppressWarnings({"rawtypes", "unchecked"})
public class decTableMaster_mxJPO extends decCodeMaster_mxJPO{

	public MapList findTableMaster(Context context, String[] args) throws Exception {
		HashMap dataMap = (HashMap) JPO.unpackArgs(args);
		String objectId = (String) dataMap.get("objectId");
		

		return getCodeMasterList(context, objectId, "Table");
	}


	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList findTableDetail(Context context, String[] args) throws Exception {
		MapList projectList = new MapList();
		HashMap dataMap = (HashMap) JPO.unpackArgs(args);
		String parentId = (String) dataMap.get("objectId");
		String projectType = "Project Space";
		StringList busSelects = new StringList();
		busSelects.add(DomainConstants.SELECT_ID);
		busSelects.add(DomainConstants.SELECT_NAME);
		busSelects.add(DomainConstants.SELECT_DESCRIPTION);
		
		// busSelects.add(DomainConstants.SELECT_ATTRIBUTE_TITLE);
		busSelects.add(DomainConstants.SELECT_TO_ID);
		String sName = "decDeliverableDoc";
		MapList orgVPDocList = DomainObject.findObjects(context, "decDeliverableDoc", "*", "policy==Version",
				busSelects);
		for (int i = 0; i < orgVPDocList.size(); i++) {
			HashMap<?, ?> hashmap = (HashMap<?, ?>) orgVPDocList.get(i);
			String description = (String) hashmap.get("description");
		}
		
		LocalDate now = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		String formatedNow = now.format(formatter);
		
		
		
		
		// busSelects.add(DomainConstants.select_relationship_attr);

		StringList selectRelStmts = new StringList();
		selectRelStmts.add(DomainRelationship.SELECT_ID);
		String busWhere = "";
		String relationshipName = (String) dataMap.get("relationName");
		String strRelName = PropertyUtil.getSchemaProperty(context, relationshipName);
		// Getting actual type name - Person
		String strType = PropertyUtil.getSchemaProperty(context, "type_decCodeDetail");
		String typeGroupProxy = PropertyUtil.getSchemaProperty(context, "type_GroupProxy");
		Pattern typePattern = new Pattern(strType);
		typePattern.addPattern(typeGroupProxy);

		try {
			if (!parentId.isEmpty()) {

				DomainObject dom = DomainObject.newInstance(context, parentId);
				
				String domName = dom.getTypeName(context);
				if(domName.equals(projectType)) {
					return projectList;
				}
				projectList = dom.getRelatedObjects(context, "*", // relationship pattern
						"*", // object pattern
						busSelects, // object selects
						selectRelStmts, // relationship selects
						false, // to direction
						true, // from direction
						(short) 1, // recursion level
						"", // object where clause
						null); // relationship where clause

				if (projectList.size() > 0) {
					// projectList.sort(lpsConstants.SELECT_ATTRIBUTE_LPSSEQUENCEORDER, "ascending",
					// "integer");
				}
				return projectList;
			} else {

				return projectList;

			}
		} catch (Exception ex) {
			throw ex;
		}
	}

	@com.matrixone.apps.framework.ui.CreateProcessCallable
	public Map createTableMaster(Context context, String[] args) throws Exception {
		try {
			// Modified by hslee on 2023.07.26 --- [s]
			ContextUtil.startTransaction(context, true); 
			
			HashMap programMap = (HashMap) JPO.unpackArgs(args); // get data
			// Modified by hslee on 2023.07.26 --- [e]
			
			Locale locale = context.getLocale();
			String masterId = "";
			Map returnMap = new HashMap();
			DomainObject doMaster = new DomainObject();
			
			String sdecMasterType = "Table";
			
			String sName = (String) programMap.get("Name");
			String sDesc = (String) programMap.get("Description");
			String codeDetailName = MqlUtil.mqlCommand(context, "temp query bus $1 $2 $3;", true, DecConstants.TYPE_DECCODEMASTER, sName, "-");
			if(codeDetailName != "") {
				String message = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", locale, "emxFramework.Msg.ThereIsATableMasterWithADuplicateName");
				throw new FrameworkException(message);
			}
			
			doMaster.createObject(context, DecConstants.TYPE_DECCODEMASTER, sName, "-", DecConstants.POLICY_DECCODEMASTER, DecConstants.VAULT_ESERVICE_PRODUCTION);
			masterId = doMaster.getId(context);
			doMaster.setDescription(context, sDesc);
			doMaster.setAttributeValue(context, "decMasterType", sdecMasterType);
			returnMap.put(DecConstants.SELECT_ID, masterId);
			
			String templateId = DecMatrixUtil.getObjectId(context, DecConstants.TYPE_DECCODEMASTERTEMPLATE, "Global", DecConstants.SYMB_HYPHEN);
			DomainObject doTemplate = DomainObject.newInstance(context, templateId);
			DomainRelationship.connect(context, doTemplate, DecConstants.RELATIONSHIP_DECCODEMASTERTEMPLATEREL, doMaster);
				
			MapList ml = UITableCustom.getColumns(context, sName, null);
			
			HashMap settings = null;
			
			if(!CollectionUtils.isEmpty(ml)) {
				for (int i = 0; i < ml.size(); i++) {
					HashMap<?, ?> hashmap = (HashMap<?, ?>) ml.get(i);
					// dweCode에 들어갈 값
					String name = (String) hashmap.get("name"); 
					// description에 들어갈 값
					String label = (String) hashmap.get("label");
					
					settings = (HashMap) hashmap.get("settings");
					
					createDetail(context, locale, doMaster, i, settings, name, label);
				}
			}else {
				String sFailMessage = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(), "emxFramework.DecTableMaster.CreateFail");
				throw new FrameworkException(sFailMessage);
			}
			
			ContextUtil.commitTransaction(context); // Modified by hslee on 2023.07.26
			return returnMap;
		} catch (Exception e) {
			ContextUtil.abortTransaction(context); // Modified by hslee on 2023.07.26
			e.printStackTrace();
			throw e;
		}
	}



	public void createDetail(Context context, Locale locale, DomainObject doMaster, int sequence, HashMap settings, String name, String label) throws FrameworkException {
		String strResourceFile = UINavigatorUtil.getStringResourceFileId(context, (String) settings.get("Registered Suite"));
		
		// Modified by hslee on 2023.07.26 --- [s]
		String labelPropertyName = null;
		if ( StringUtils.isNotEmpty(label) )
		{
			labelPropertyName = EnoviaResourceBundle.getProperty(context, strResourceFile, locale, label);
		}
		// Modified by hslee on 2023.07.26 --- [e]
		
		String revision = null;
		String masterRev = doMaster.getInfo(context, DecConstants.SELECT_REVISION);
		String masterName = doMaster.getInfo(context, DecConstants.SELECT_NAME);
		if ( "-".equals(masterRev) )
		{
			revision = masterName;
		}
		else
		{
			revision = masterRev + "_" + masterName;
		}

		DomainObject doDetail = new DomainObject();
//		doDetail.createObject(context, DecConstants.TYPE_DECCODEDETAIL, name, String.valueOf(System.currentTimeMillis()), DecConstants.POLICY_DECCODEMASTER, DecConstants.VAULT_ESERVICE_PRODUCTION);
		doDetail.createObject(context, DecConstants.TYPE_DECCODEDETAIL, name, revision, DecConstants.POLICY_DECCODEMASTER, DecConstants.VAULT_ESERVICE_PRODUCTION);
		doDetail.setDescription(context, labelPropertyName);
		doDetail.setAttributeValue(context, DecConstants.ATTRIBUTE_DECCODE, name);
		
		String groupHeader = (String) settings.get("Group Header");
		if( StringUtils.isNotEmpty(groupHeader) ) 
		{
			groupHeader = EnoviaResourceBundle.getProperty(context, strResourceFile, locale, groupHeader);  
			doDetail.setAttributeValue(context, DecConstants.ATTRIBUTE_DECGROUPHEADER, groupHeader);
		}
		
		DomainRelationship drDetail = DomainRelationship.connect(context, doMaster, DecConstants.RELATIONSHIP_DECCODEDETAILREL, doDetail);
		drDetail.setAttributeValue(context, DecConstants.ATTRIBUTE_SEQUENCE_ORDER, String.valueOf(sequence+1));
	}
	
	
	public String updateColumn(Context context, String[] args) throws Exception {
		String message ="";
		try {
			String objectId = (String) args[1]; //코드마스터의 id..		
			DomainObject doTableMaster = new DomainObject(objectId);
			String strObjectName = doTableMaster.getInfo(context,DomainConstants.SELECT_NAME); //테이블이름
			
			StringList busSelects = new StringList();
			busSelects.add(DomainConstants.SELECT_ID);
			busSelects.add(DomainConstants.SELECT_NAME);
			busSelects.add(DomainConstants.SELECT_DESCRIPTION);
			
			StringList selectRelStmts = new StringList();
			selectRelStmts.add(DomainRelationship.SELECT_ID);
			
			//tablemaster에 연결된 table detail 리스트
			MapList tableDetailList = doTableMaster.getRelatedObjects(context, DecConstants.RELATIONSHIP_DECCODEDETAILREL, // relationship pattern
						DecConstants.TYPE_DECCODEDETAIL, // object pattern
						busSelects, // object selects
						selectRelStmts, // relationship selects
						false, // to direction
						true, // from direction
						(short) 1, // recursion level
						"", // object where clause
						null,
						0);
			// 실제(DB상 조회되는) 테이블에 대한 데이터를 리스트에 담는다.
			MapList columnSchemaList = UITableCustom.getColumns(context, strObjectName, null);
			
			// MQL Table Column Name
			StringList columnNameList = decListUtil.getSelectValueListForMapList(columnSchemaList, DecConstants.SELECT_NAME);
			 
			// Table Detail Object Name
			StringList detailNameList = decListUtil.getSelectValueListForMapList(tableDetailList, DecConstants.SELECT_NAME);
			
			// 테이블마스터에 생성된 디테일오브젝트 - 존재하던 컬럼을 비활성화
			Hashtable<?, ?> tableDetailMap = null;
			HashMap<?, ?> columnSchemaMap = null;
			HashMap settings = null;
			String strResourceFile = null;
			String groupHeader = null;
			String columnName = null;
			String columnLabel = null;
			String label = null;
			String tableDetailName = null;
			String tableDetailId = null;
			String tableDetailDesc = null;
			Locale locale = context.getLocale();
			
			ContextUtil.startTransaction(context, true);
			
			for (int i = 0; i < tableDetailList.size(); i++) {
				tableDetailMap = (Hashtable<?, ?>) tableDetailList.get(i);
				
				tableDetailName = (String) tableDetailMap.get(DecConstants.SELECT_NAME);
				tableDetailId = (String) tableDetailMap.get(DecConstants.SELECT_ID);
				tableDetailDesc = (String) tableDetailMap.get(DecConstants.SELECT_DESCRIPTION);
				
				DomainObject doTableDetail = new DomainObject(tableDetailId);
				for (int j = 0; j < columnSchemaList.size(); j++) {
					columnSchemaMap  = (HashMap<?, ?>) columnSchemaList.get(j);
					columnName = (String) columnSchemaMap.get("name");
					columnLabel = (String) columnSchemaMap.get("label");//Modified by thok 2023.11.07
					
					settings = (HashMap) columnSchemaMap.get("settings");
					if( (columnName.equals(tableDetailName)) ) {
						// columnName과 detailName이 같으면 group header를 업데이트
						strResourceFile = UINavigatorUtil.getStringResourceFileId(context, (String) settings.get("Registered Suite"));
						
						if ( StringUtils.isNotEmpty(tableDetailDesc) )
						{
							tableDetailDesc = EnoviaResourceBundle.getProperty(context, strResourceFile, locale, columnLabel);//Modified by thok 2023.11.07
							doTableDetail.setDescription(context, tableDetailDesc);
						}

						groupHeader = (String) settings.get("Group Header");
						if( StringUtils.isNotEmpty(groupHeader) ) {
							groupHeader = EnoviaResourceBundle.getProperty(context, strResourceFile, locale, groupHeader);  
						} else {
							groupHeader = "";
						}
						doTableDetail.setAttributeValue(context, DecConstants.ATTRIBUTE_DECGROUPHEADER, groupHeader);
					}
				}
			
				//테이블 디테일 뷰에 존재하는 컬럼명이 실제 테이블에 존재하지않는 컬럼명일 경우 아래 if문 실행				
				if(!columnNameList.contains(tableDetailName)) {
					doTableDetail.setState(context, "Inactive");
					doTableDetail.setAttributeValue(context, DecConstants.ATTRIBUTE_DECGROUPHEADER, "");
				}
			}
				
			int addSeOr = 1;
			
			for (int n = 0; n < columnSchemaList.size(); n++) {
			 	columnSchemaMap = (HashMap<?, ?>) columnSchemaList.get(n);
				columnName = (String) columnSchemaMap.get("name");
				
				// 테이블디테일 뷰에 컬럼명이 존재하지않으면 생성하고 테이블마스터에 연결해주는부분
				if(!detailNameList.contains(columnName)) {
					
					label = (String) columnSchemaMap.get("label");
					settings = (HashMap) columnSchemaMap.get("settings");
					
					createDetail(context, locale, doTableMaster, tableDetailList.size() + addSeOr, settings, columnName, label);
					
					addSeOr++;
				}			
			}
				
			ContextUtil.commitTransaction(context);
		} catch (Exception e) {
			ContextUtil.abortTransaction(context);
			e.printStackTrace();
			throw e;
		}
		
		return message;
	}
		
		// 테이블 디테일 demote
		public String stateDemote(Context context, String[] args) throws Exception {
			/// HashMap programMap = (HashMap) JPO.unpackArgs(args);
			String message ="";
			String messageOrderName ="";
			String OrderNameList ="";
			for (int i = 0; i < args.length; i++) {
				String objectId = args[i];
				System.out.println("Table Detail demote 실행 : " + i + "번째 컬럼");
				// MapList relBusObjPageList = (MapList)programMap.get("objectList");
				DomainObject orderId = new DomainObject(objectId);
				State state = orderId.getCurrentState(context);
				String stateName = state.getName();
				String active = "Active";
				OrderNameList += orderId.getName()+", "; // 모든 state가 Active인 경우.
				
				if (!stateName.equals(active)) {
					orderId.demote(context);				
				}else {			
					messageOrderName += orderId.getName()+", ";				
				}
			}
			System.out.println("OrderNameList:"+OrderNameList);
	   
			if(messageOrderName.isEmpty()) {
				message = "활성화되었습니다.";
			}else if(OrderNameList.equals(messageOrderName)){
				 System.out.println("다같을떄messageOrderName:"+messageOrderName);
				 System.out.println("다같을떄OrderNameList:"+OrderNameList);
				message = "선택한 Table Detail의 상태가 Active 입니다.";
			}
			else{
				messageOrderName = messageOrderName.substring(0, messageOrderName.length() - 1);
				String cutmessageOrderName = StringUtils.substring(messageOrderName, 0, -1);
				System.out.println("자른 message:"+cutmessageOrderName);
				message = "활성화되었습니다. \n 이미 상태가 활성화인 Table Detail : "+cutmessageOrderName;
			}
			System.out.println("완료 message:"+message);
			return message;
		}

		// 테이블 디테일 promote
		public String statePromote(Context context, String[] args) throws Exception {
			/// HashMap programMap = (HashMap) JPO.unpackArgs(args);
			String message ="";
			String messageOrderName ="";
			String OrderNameList ="";
			for (int i = 0; i < args.length; i++) {
				String objectId = args[i];
				System.out.println("Table Detail promote 실행 : " + i + "번째 컬럼");
				// MapList relBusObjPageList = (MapList)programMap.get("objectList");
				DomainObject orderId = new DomainObject(objectId);
				State state = orderId.getCurrentState(context);
				String stateName = state.getName();
				String inactive = "Inactive";
				OrderNameList += orderId.getName()+", "; // 모든 state가 Active인 경우.
				
				if (!stateName.equals(inactive)) {
						orderId.promote(context);				
					}else {			
						messageOrderName += orderId.getName()+", ";				
					}
			}
			System.out.println("OrderNameList:"+OrderNameList);
	   
			if(messageOrderName.isEmpty()) {
				message = "비활성화되었습니다.";
			}else if(OrderNameList.equals(messageOrderName)){
				 System.out.println("다같을떄messageOrderName:"+messageOrderName);
				 System.out.println("다같을떄OrderNameList:"+OrderNameList);
				message = "선택한 Table Detail의 상태가 Inactive 입니다.";
			}
			else{
				messageOrderName = messageOrderName.substring(0, messageOrderName.length() - 1);
				String cutmessageOrderName = StringUtils.substring(messageOrderName, 0, -1);
				System.out.println("자른 message:"+cutmessageOrderName);
				message = "비활성화되었습니다. \n 이미 상태가 비활성화인 Table Detail : "+cutmessageOrderName;
			}
			System.out.println("완료 message:"+message);
			
			
			return message;
		}
		
		public StringList project_findTableMaster(Context context, String[] args) throws Exception {
			
			System.out.println("프로젝트에서 테이블마스터 clone 실행");
			HashMap dataMap = (HashMap) JPO.unpackArgs(args);
			StringList strCodeMasterIDs = new StringList();
			String objectId2 = (String) dataMap.get("objectId");
			DomainObject projectDom = new DomainObject(objectId2);
			String projectName = projectDom.getName(context);
			String projectType = "Project Space";
			StringList busSelects = new StringList();
			busSelects.add(DomainConstants.SELECT_ID);
			
			String typeTable = "Table";

			MapList ml = DomainObject.findObjects(context, "decCodeMaster", "*",  "revision=='-'",
					busSelects);
			
			MapList compareList = new MapList(ml);
				
		
			for(int i = 0 ; i<compareList.size(); i++) {
				HashMap<?, ?> hashmap = (HashMap<?, ?>) compareList.get(i);

				
				String objectId = (String) hashmap.get("id");
				DomainObject dom = new DomainObject(objectId);
				String codeMasterName = dom.getName(context);
				String codeMastertype = dom.getAttributeValue(context, "decMasterType");
			    String cmResult = MqlUtil.mqlCommand(context, "temp query bus $1 $2 $3;", true, "decCodeMaster", codeMasterName, projectName);
			    
				
				if(!codeMastertype.equals(typeTable) || cmResult !="") {
					ml.remove(hashmap);
					
				}else {
					strCodeMasterIDs.add(objectId);	
				}
			}
			System.out.println("리턴할 스트링리스트:"+strCodeMasterIDs);
			return strCodeMasterIDs;
		}
		
		
		
		
		
		
	@Override
	public MapList getCodeDetailList(Context context, Map paramMap) throws Exception {
		String projectId = (String) paramMap.get("projectId");
		
		String codeMasterId = (String) paramMap.get("codeMasterId");
		String codeMasterName = (String) paramMap.get("codeMasterName");
		String codeMasterRevision = (String) paramMap.get("codeMasterRevision");
		
		String codeDetailCode = (String) paramMap.get("codeDetailCode");
		String codeDetailType = (String) paramMap.get("codeDetailType");
		String codeDetailLevel = (String) paramMap.get("codeDetailLevel");
		
		StringList slSelectParam = (StringList) paramMap.get("slSelectParam");
		StringList slRelSelectParam = (StringList) paramMap.get("slRelSelectParam");
		
		String whereParam = (String) paramMap.get("whereParam");
		String relWhereParam = (String) paramMap.get("relWhereParam");
		
		boolean activeOnly = (Boolean) paramMap.getOrDefault("activeOnly", false);
		short expandLevelParam = (short)((int) paramMap.getOrDefault("expandLevelParam", 1));
		boolean applyFilter = (Boolean) paramMap.getOrDefault("applyFilter", false);
		
		return getCodeDetailList(context, projectId
				, codeMasterId, codeMasterName, codeMasterRevision
				, codeDetailCode, codeDetailType, codeDetailLevel
				, slSelectParam, slRelSelectParam
				, whereParam, relWhereParam
				, activeOnly, expandLevelParam, applyFilter);
	}
	
}