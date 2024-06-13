import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.dec.util.DecConstants;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.program.ProjectSpace;

import matrix.db.Context;
import matrix.db.JPO;

@SuppressWarnings("rawtypes")
public class decAccess_mxJPO {

	public boolean hasAccess(Context context, String[] args) throws Exception{
		try {
			Map programMap = (Map) JPO.unpackArgs(args);
			String objectId = (String) programMap.get("objectId");
			
			// 권한 체크
			Map settings = (Map) programMap.get("SETTINGS");
			String hasAccessSetting = (String) settings.get("hasAccess");
			
			return hasAccess(context, objectId, hasAccessSetting);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	public boolean hasAccess(Context context, String objectId, String accessSetting) throws Exception{
		try {
			boolean hasAccess = false;
			
			// decSystemAdmin인지 체크
			//FIXME: decConstants로 변경 필요
			if ( PersonUtil.hasAssignment(context, "decSystemAdmin") )
			{
				hasAccess =  true;
			}
			else
			{
				if ( StringUtils.isEmpty(objectId) )
				{
					// do nothing...
				}
				else
				{
					// Project Member인지 체크
					String type = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, DecConstants.SELECT_TYPE);
					String projectId = null;
					switch (type) {
					case "Project Space":
						projectId = objectId;
						break;
					case "decCodeMaster":
						projectId = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, "to[decCodeMasterRel].from.id");
						break;

					default:
						break;
					}
					
					if ( StringUtils.isNotEmpty(projectId) )
					{
						ProjectSpace project = new ProjectSpace(projectId);
						
						if ( project.isCtxUserProjectMember(context) )
						{
							if ( StringUtils.isEmpty(accessSetting) )
							{
								// hasAccess setting 값이 없으면 권한이 있다고 판단한다.
								// do nothing...
							}
							else
							{
								String currentUserId = PersonUtil.getPersonObjectID(context);
								// MQL Sample : print connection 
								//					bus 'Project Space' OPAT1 91687160686600 
								//					to Person admin_platform - 
								//					relationship Member
								//					select evaluate[attribute[decProjectMemberRole] matchlist 'PPM,PIM' ','];
								String hasAccessEpxr = MqlUtil.mqlCommand(context, "print connection bus $1 to $2 relationship $3 select $4 dump"
										, projectId
										, currentUserId
										, DecConstants.RELATIONSHIP_MEMBER
										, "evaluate[" + DecConstants.SELECT_ATTRIBUTE_DECPROJECTMEMBERROLE + " matchlist \"" + accessSetting + "\" \",\"]");
								
								hasAccess = Boolean.valueOf(hasAccessEpxr);
							}
							
						}
						else
						{
							// do nothing...
						}
					}
					else
					{
						// do nothing...
					}
				}
				
			}
			
			return hasAccess;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
