import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.XSSUtil;

import java.io.File;
import java.util.*;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

public class samPOARequset_mxJPO {
	public MapList findDocument(Context context, String[] args) throws Exception {
	    StringList selects = new StringList("id");
	    HashMap programMap = (HashMap) JPO.unpackArgs(args);
	    String objectId = (String) programMap.get("objectId");
	    DomainObject getId = new DomainObject(objectId);

	    StringList valueList = new StringList();
	    valueList.add("id");
	    valueList.add("name");
	    valueList.add("revision");
	    
	    // getRelatedObjects로 samPOARel(relationship), type=*, valueList
	    // 들어있는 모든 파일을 가져온다.
	    MapList mapList = getId.getRelatedObjects(context,
	            "samPOARel",
	            "*",
	            valueList,
	            null,
	            false, 
	            true,
	            (short) 0,
	            null,
	            null,
	            0);
	    
	    // lateseRevisions Map을 새로 만들어주고
	    Map<String, String> latestRevisions = new HashMap<>();

	    // 가장 최근 리비전 추적
	    for (int i = 0; i < mapList.size(); i++) {
	        Map map = (Map) mapList.get(i);
	        String name = (String) map.get("name");
	        String revision = (String) map.get("revision");
	        
	        // conatinsKey를 사용해 Map, Dictionary에서 주어진
	        // 키가 존재하는지 여부를 확인하는 함수이다.
	        // name의 키가 존재하지 않거나 revision을 비교해서 
	        // 첫번째 revision이 두 번째 리비전(latestRevisions.get(name)보다 크다는 것을 의미
	        // latestRevisions에 name, revision을 put해줌
	        if (!latestRevisions.containsKey(name) || revision.compareTo(latestRevisions.get(name)) > 0) {
	            latestRevisions.put(name, revision);
	        }
	    }

	    // 최신 리비전을 가진 문서 필터링
	    MapList showList = new MapList();
	    for (int i = 0; i < mapList.size(); i++) {
	        Map map = (Map) mapList.get(i);
	        String name = (String) map.get("name");
	        String revision = (String) map.get("revision");

	        // revision이 만약 latestRevisions.get(name)과 같으면
	        // showList에 map을 넣어줌.
	        if (revision.equals(latestRevisions.get(name))) {
	        	showList.add(map);
	        }
	    }

	    // return으로 showList를 해줌.
	    return showList;
	}
	
	// 각각의 ObjectName을 보여줘야 하기 때문에 Vector사용.
	public Vector showObject(Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap paramList = (HashMap)programMap.get("paramList");
		MapList objectList = (MapList)programMap.get("objectList");
		String parentOID = (String)paramList.get("parentOID");
		
		Vector name = new Vector();
		
		int size = objectList.size();
		String[] strObjectIds = new String[size];
		for(int i = 0; i < size; i++) {
			Map objList = (Map)objectList.get(i);
			String deliverableId = (String) objList.get(DomainObject.SELECT_ID);
            strObjectIds[i] = deliverableId;
            
            DomainObject getId = new DomainObject(strObjectIds[i]);
            StringList titleList = getId.getInfoList(context, "attribute[Title]");
            StringList titleName = getId.getInfoList(context, "name");
            
            StringList valueList = new StringList();
            valueList.add("id");
            valueList.add("name");
            
            // strLink, sLink, strURL들은 사용하던거 들고왔음
            
            String strLink = "<a href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?mode=insert&amp;emxSuiteDirectory=components&amp;relId=null";
            String sLink = strLink + "&amp;parentOID=" + XSSUtil.encodeForJavaScript(context, parentOID) + "&amp;objectId=" + objList.get(DomainConstants.SELECT_ID) + "&amp;AppendParameters=true', '700', '600', 'false', 'content', '');\">";
            String strURL = sLink + "</a>";
            
            // for문을 돌려서 각각의 strURL에 sLink와 encodeForXML을 더해주고
            // name에 strURL을 추가해줌
            for(String title : titleList) {
            	strURL += sLink +XSSUtil.encodeForXML(context, title) + "</a>&#160;";
            	name.add("<nobr>"+strURL+"</nobr>");
            }
		}
		return name;
	}
	
	public Vector showVideo(Context context, String[] args) throws Exception {
	    HashMap programMap = (HashMap) JPO.unpackArgs(args);
	    MapList objectList = (MapList) programMap.get("objectList");
	    HashMap paramList = (HashMap)programMap.get("paramList");
	    String objId = (String)paramList.get("objectId");
	    
	    Vector showVideoButton = new Vector();
	    String pathName = "C:\\temp\\video";
	    File dir = new File(pathName);
	    File files[] = dir.listFiles();
	    for (int i = 0; i < files.length; i++) {
	    	File fileList = files[i];
	        String file = files[i].toString();
	        
	        for (int j = 0; j < objectList.size(); j++) {
	            Map objList = (Map) objectList.get(j);
	            String objectId = (String) objList.get(DomainObject.SELECT_ID);

	            DomainObject getId = new DomainObject(objectId);
	            StringList titleList = getId.getInfoList(context, "attribute[Title]");
	            
	            for (String fileName : titleList) {
	                int dot = fileName.lastIndexOf(".");
	                String titleType = fileName.substring(dot + 1);
	                if (titleType.equalsIgnoreCase("webm") || titleType.equalsIgnoreCase("mp4") || titleType.equalsIgnoreCase("ogg")) {
	                    // 버튼 이미지와 링크를 함께 추가하여 버튼을 생성합니다.
	                	String sLink = "&amp;objectId=" + objectId + "&amp;fileName=" + fileName + "&amp;titleType=" + titleType;
	                	String buttonImage = "<img src=\"images/buttonActionbarNext.gif\" onclick=\"window.open('../common/emxShowVideo.jsp?" + sLink + "','_blank','width=700, height=600');\" style=\"cursor: pointer;\"/>";
	                    showVideoButton.add(buttonImage);
	                } else {
	                    showVideoButton.add("");
	                }
	            }

	        }
	    }
	    return showVideoButton;
	}

}