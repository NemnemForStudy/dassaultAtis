import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.MapList;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

public class project2024_mxJPO {
	public MapList findDocument(Context context, String args[]) throws Exception {
		StringList selects = new StringList("id");
		return DomainObject.findObjects(context, "Type2024", "*", "", selects);
	}
	
	public MapList findPerson(Context context, String[] args) throws Exception {
		StringList selects = new StringList("id");
		return DomainObject.findObjects(context, "Person", "*", "", selects);
	}
	
	public MapList findRelatedPerson(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String objectId = (String)programMap.get("objectId");
		
		DomainObject oId = new DomainObject(objectId);
		StringList sList = oId.getInfoList(context, "from[Assignee2024].to.id");
		
		MapList assigneeId = new MapList();
		for(int i = 0; i < sList.size(); i++) {
			String aId = (String)sList.get(i);
			HashMap hashMap = new HashMap();
			hashMap.put("id", aId);
			assigneeId.add(hashMap);
		}
		
		return assigneeId;
	}
	
	public String showPerson(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap paramMap = (HashMap)programMap.get("paramMap");
		String getId = (String)paramMap.get("objectId");
		
		DomainObject obj = new DomainObject(getId);
		String assignee = obj.getInfo(context, "relationship[Assignee2024].to.name");
		
		return assignee;
	}
	
	// ActualFinish 시간 뽑아내줌.
	public void policyChangeComplete(Context context, String[] args) throws Exception {
		String sObjectId = args[0];
		DomainObject getId = new DomainObject(sObjectId);
		
		LocalDate now = LocalDate.now();
		DateTimeFormatter today = DateTimeFormatter.ofPattern("MM/dd/yyyy");
		String time = now.format(today);
		
		getId.setAttributeValue(context, "Actual2024",time);
	}
	
	public StringList showAssignee(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap requestMap = (HashMap)programMap.get("requestMap");
		String parentOID = (String)requestMap.get("parentOID");
		
		StringList showAssignee = new StringList();
		
		DomainObject getId = new DomainObject(parentOID);
		StringList assigneeList = getId.getInfoList(context, "relationship[Assignee2024].to.name");
		
		for(int i = 0; i < assigneeList.size(); i++) {
			StringBuffer sb = new StringBuffer();
			for(int j = 0; j < assigneeList.size(); j++) {
				sb.append(assigneeList.get(j));
				if(j != assigneeList.size() -1) {
					sb.append(", ");
				}
			}
			showAssignee.add(sb.toString());
		}
		return showAssignee;
	}
	
	public Vector showDelay(Context context, String[] args) throws Exception {
		Vector showDelay = new Vector();
		try {
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			MapList objectList = (MapList)programMap.get("objectList");
			
			for(int i = 0; i < objectList.size(); i++) {
				Map objectMap = (Map)objectList.get(i);
				String id = String.valueOf(objectMap.get("id"));
				
				DomainObject obj = new DomainObject(id);
				String getEsti = obj.getInfo(context, "attribute[Estimated2024]");
				getEsti = getEsti.replace(" PM", "");
				
				LocalDateTime now = LocalDateTime.now();
				DateTimeFormatter today = DateTimeFormatter.ofPattern("M/d/yyyy HH:mm:ss");
				// LocalDateTime.parse -> String 형으로 변환
				LocalDateTime ldTime = LocalDateTime.parse(getEsti, today);
				
				// isBefore을 사용하려면 LocalDateTime을 사용해야함.
				if(now.isBefore(ldTime)) {
					showDelay.add("<img src=\"images/iconStatusGreen.gif\" name=\"imageRed\" id=\"imageRed\" alt=\"Green\" />");
				} else {
					showDelay.add("<img src=\"images/iconStatusRed.gif\" name=\"imgYellow\" id=\"imgYellow\" alt=\"Red\" />");
				}
			}
			return showDelay;
		} catch(Exception e) {
			e.printStackTrace();
			return showDelay;
		}
	}
	
	public MapList findResolution(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		StringList selects = new StringList("id");
		String parentOID = (String)programMap.get("parentOID");
		return DomainObject.findObjects(context, "ResolutionType2024", "*", "to[ResolutionRel2024].from.id==" + parentOID, selects);
	}
	
	public Vector findIndicator(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		MapList objectList = (MapList)programMap.get("objectList");
		HashMap paramList = (HashMap)programMap.get("paramList");
		
		Vector indicator2024 = new Vector();
		
		for(int i = 0; i < objectList.size(); i++) {
			String parentOID = (String)paramList.get("parentOID");
			
			DomainObject getId = new DomainObject(parentOID);
			StringList valueList = new StringList();
			valueList.add("attribute[Indicator2024]");
			
			Map map = getId.getInfo(context, valueList);
			String indicator = String.valueOf(map.get("attribute[Indicator2024]"));
			
			indicator2024.add(indicator);
		}
		
		return indicator2024;
	}
	
	public String showDes(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap requestMap = (HashMap)programMap.get("requestMap");
		String parentOID = (String)requestMap.get("parentOID");
		
		DomainObject getId = new DomainObject(parentOID);
		StringList valueList = new  StringList();
		valueList.add("description");
		
		Map map = getId.getInfo(context, valueList);
		String des = String.valueOf(map.get("description"));
		
		return des;
	}
	
	public void connectPerson(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap paramMap = (HashMap)programMap.get("paramMap");
		String oId = (String)paramMap.get("objectId");
		
		String newValue = (String)paramMap.get("New Value");
		
		DomainObject Id = new DomainObject(oId);
		
		StringList slList = Id.getInfoList(context, "relationship[Assignee2024].id");
		
		String[] values = newValue.split(", ");
		
		if(newValue == "") return;
		if(slList != null) {
			for(String str : slList) {
				DomainRelationship.disconnect(context, str);
			}
			for(String newValues : values) {
				DomainRelationship.connect(context, oId, "Assignee2024", newValues, true);
			}
		}
	}
	
	public void connectResolution(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap requestMap = (HashMap)programMap.get("requestMap");
		HashMap paramMap = (HashMap)programMap.get("paramMap");
		
		String[] parentOID = (String[])requestMap.get("parentOID");
		
		String objectId = (String)paramMap.get("objectId");
		
		if(parentOID != null) {
			DomainRelationship.connect(context, parentOID[0], "ResolutionRel2024", objectId, true);
		}
		
		String assigneeId = (String)paramMap.get("New OID");
		
		if(!assigneeId.isEmpty()) {
			DomainObject obj = new DomainObject(objectId);
			StringList getIdList = obj.getInfoList(context, "relationship[ResolutionRel2024].id");
			
			if(getIdList.size() != 0) {
				for(String str : getIdList) {
					DomainRelationship.disconnect(context, str);
				}
			}
			
			String[] values = assigneeId.split(", ");
			
			for(String assigneeID : values) {
				DomainRelationship.connect(context, objectId, "ResolutionRel2024", assigneeID, true);
			}
		}
	}
	
	// CompleteYN이 Review일 때만 보이게 하는 메소드	
	public boolean reviewCheck(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		
		String objectId = (String)programMap.get("objectId");
		
		DomainObject obj = new DomainObject(objectId);
		String current = obj.getInfo(context, "current");
		
		boolean reviewCheck = current.equals("Review") ? true : false;
		
		return reviewCheck;
	}
	
	// 43. 지시사항에 담당자가 배정 안될 시 promote 못하게 막는 메소드
	// action이라서 Active누를때 실행됨.
	public void validationAssignee(Context context, String[] args) throws Exception {
		String id = args[0];
		
		DomainObject obj = new DomainObject(id);
		String assigneeId = obj.getInfo(context, "from[Assignee2024].to.id");
		if(assigneeId == null) {
			obj.setState(context, "Create");
		}
	}
	
	// 44. 조치사항 생성 시 지시사항 상태가 Active 일때만 버튼 보이는 메소드
	public boolean showActiveButton(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		
		String objectId = (String)programMap.get("objectId");
		
		DomainObject obj = new DomainObject(objectId);
		String current = obj.getInfo(context, "current");
		boolean bo = current.equals("Active") ? true : false;
		
		return bo;
	}
	
	public Vector Assignee(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		MapList objectList = (MapList)programMap.get("objectList");
		
		Vector showAssignee = new Vector();
		
		for(Object o : objectList) {
			Map map = (Map)o;
			String objId = (String)map.get("id");
			
			DomainObject obj = new DomainObject(objId);
			StringList slList = obj.getInfoList(context, "from[Assignee2024].to.name");
			for(String s : slList) {
				StringBuffer sb = new StringBuffer();
				for(int i = 0; i < slList.size(); i++) {
					sb.append(slList.get(i));
					if(i != slList.size() -1) {
						sb.append(", ");
					}
				}
				showAssignee.add(sb.toString());
			}
		}
		return showAssignee;
		
	}
	
	public int checkYN(Context context, String[] args) throws Exception {
		String objectId = args[0];
		
		DomainObject object = new DomainObject(objectId);
		StringList slList = new StringList();
		slList.add("id");
		slList.add("attribute[Complete2024]");
		
		Map map = object.getInfo(context, slList);
		String completeYN = (String)map.get("attribute[Complete2024]");
		
		// Y가 아니면 return 1
		if(!completeYN.equals("Y")) {
			return 1;
		}
		return 0;
 	}
	
	public int validationPromoteActionComplete(Context context, String[] args) throws Exception {
		String id = args[0];
		
		StringList valueList = new StringList();
		valueList.add("id");
		valueList.add("current");
		
		DomainObject obj = new DomainObject(id);
		
		MapList mlList = obj.getRelatedObjects(context,
				"ResolutionRel2024",
				"Type2024",
				valueList,
				null,
				true,
				false,
				(short) 0, 
				null, 
				null, 
				0);
		
		for(Object o : mlList) {
			Map map = (Map)o;
			String parentId = (String)map.get("id");
			String pCurrent = (String)map.get("current");
			DomainObject pId = new DomainObject(parentId);
			MapList cMList = pId.getRelatedObjects(context,
					"ResolutionRel2024",
					"*",
					valueList,
					null,
					false,
					true,
					(short) 0, 
					null, 
					null, 
					0);
			
			StringList cCurrent = new StringList();
			for(int i = 0; i < cMList.size(); i++) {
				Map cMap = (Map)cMList.get(i);
				String current = (String)cMap.get("current");
				cCurrent.add(current);
			}
			boolean allComplete = true;
			for (int j = 0; j < cCurrent.size(); j++) {
			    if (!cCurrent.get(j).equals("Complete")) {
			        allComplete = false;
			        break;
			    }
			}
			if (allComplete && pCurrent.equals("Active")) {
			    pId.setState(context, "Complete");
			}
		}
		return 0;
	}
	
	public String changeParentDescription(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap paramMap = (HashMap)programMap.get("paramMap");
		String getId = (String)paramMap.get("objectId");
		String newValue = (String)paramMap.get("New Value");

		String showDescription = "";
		
		DomainObject cObj = new DomainObject(getId);
		
		String cDes = cObj.getInfo(context, "description");
		String aDes = cObj.getInfo(context, "parentDescription");
		System.out.println(aDes);
		
		cObj.setDescription(context, newValue);
		
		StringList valueList = new StringList();
		valueList.add("id");
		valueList.add("description");
		
		MapList mlList = cObj.getRelatedObjects(context,
				"ResolutionRel2024",
				"Type2024",
				valueList,
				null,
				true,
				false,
				(short) 0, 
				null, 
				null, 
				0);
		
		for(Object o : mlList) {	
			Map pMap = (Map)o;
			String pObjectId = (String)pMap.get("id");
			String pDes = (String)pMap.get("description");
			DomainObject pId = new DomainObject(pObjectId);
			pId.setDescription(context, newValue);
		}
		
		return showDescription;
	}
	
	public StringList parentAssignees(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap paramMap = (HashMap)programMap.get("paramMap");
		String objectId = (String)paramMap.get("objectId");
		
		DomainObject obj = new DomainObject(objectId);
		StringList sList = new StringList();
		sList.add("id");

		MapList mList = obj.getRelatedObjects(context,
				"ResolutionRel2024",
				"Type2024",
				sList,
				null,
				true,
				false,
				(short) 0, 
				null, 
				null, 
				0);
		
		StringList pSList = new StringList();
		for(Object o : mList) {
			Map map = (Map)o;
			String pId = (String)map.get("id");
			System.out.println(pId);
			
			DomainObject pObj = new DomainObject(pId);
			StringList assigneeList = pObj.getInfoList(context, "from[Assignee2024].to.name");
			System.out.println(assigneeList);
				
			pSList.addAll(assigneeList);
		}
		
		return pSList;
	}
}