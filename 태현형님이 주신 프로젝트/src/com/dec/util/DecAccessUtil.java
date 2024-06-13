package com.dec.util;

import java.util.Map;

import com.matrixone.apps.common.Person;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.MapList;

import matrix.db.Context;
import matrix.util.StringList;

public class DecAccessUtil {

	
	public static boolean checkAccessSummaryList(Context context, String sObjectId) throws Exception {
		return checkAccessSummaryList(context, sObjectId, new StringList());
		
	}
	public static boolean checkAccessSummaryList(Context context, String sObjectId, StringList slCheckType) throws Exception {
		slCheckType.add(DomainConstants.TYPE_WORKSPACE);
		slCheckType.add(DomainConstants.TYPE_WORKSPACE_VAULT);
		
		String sUser		= context.getUser();
		MapList results 	= DomainAccess.getAccessSummaryList(context, sObjectId);

		DomainObject dmObject	= DomainObject.newInstance(context, sObjectId);
		String sObjectType		= dmObject.getInfo(context, DomainConstants.SELECT_TYPE);
		
		// Group, Security Context of User [B]
    	Person person 		= Person.getPerson(context);
		StringList slBusSelect	= new StringList();
		slBusSelect.add(DomainConstants.SELECT_ID);
		slBusSelect.add(DomainConstants.SELECT_NAME);
		slBusSelect.add(DomainConstants.SELECT_TYPE);
		
        MapList mlResultList = person.getRelatedObjects(	context, 
														"Group Member,Assigned Security Context", 
														"Group,Security Context", 
														slBusSelect, null, 
														true, true,
														(short) 1, 
														"", "", 0);
        
        StringList slGroupList		= new StringList();
        StringList slSecurityList	= new StringList();
        for(int i = 0; i < mlResultList.size(); i++) {
        	Map mGroupInfo		= (Map) mlResultList.get(i);
        	String sResultName	= (String) mGroupInfo.get(DomainConstants.SELECT_NAME);
        	String sResultType	= (String) mGroupInfo.get(DomainConstants.SELECT_TYPE);
        	
        	if(sResultType.equals(DomainConstants.TYPE_GROUP)) {
        		if(!slGroupList.contains(sResultName)) {
            		slGroupList.add(sResultName);
            	}
        		
        	} else if(sResultType.equals(DomainConstants.TYPE_SECURITYCONTEXT)) {
        		if(!slSecurityList.contains(sResultName)) {
        			slSecurityList.add(sResultName);
        		}
        	}
        }
        // Group, Security Context of User [E]
        
		for(int i = 0; i < results.size(); i++) {	// Check Assigned Member
			Map mAccess			= (Map) results.get(i);
			String sTYPE		= DecStringUtil.setEmpty((String) mAccess.get("TYPE"));	// Group, Person 
			String sName		= DecStringUtil.setEmpty((String) mAccess.get("name"));	
			// Group (Object Name), Person (ex) admin_platform_PRJ), SecurityContext [ex) Company Name.Default ]
			
//			if(sTYPE.equals("Group")) {
//				if(slGroupList.contains(sName)) {
//					return false;
//				}
//    			
//			} else 
			if(sTYPE.equals("Person")) {
    			String sUserName	= DecStringUtil.setEmpty((String) mAccess.get("username"));	// Person - username ex)admin_platform

				if(sUserName.equals(sUser)) {
    				return false;
    			}
				
			} 
//			else if(sTYPE.equals("SecurityContext")) {
//				String sAccess		= DecStringUtil.setEmpty((String) mAccess.get("access"));
//		        if(slCheckType.contains(sObjectType)) {	// exceptions
//		        	if(sAccess.equals("All")) {	// Remove grant
//		        		// SKIP
//		        	} else {
//		        		for(int j = 0; j < slSecurityList.size(); j++) {
//		        			String sSecurityContext	= (String) slSecurityList.get(j);
//		        			if(sSecurityContext.indexOf(sName) >= 0) {
//		        				return false;
//		        			}
//		        		}
//		        	}
//		        } else {
//		        	for(int j = 0; j < slSecurityList.size(); j++) {
//		        		String sSecurityContext	= (String) slSecurityList.get(j);
//		        		if(sSecurityContext.indexOf(sName) >= 0) {
//		        			return false;
//		        		}
//		        	}
//		        }
//			} else {
//				// do nothing
//			}
		}
		
		return true;
	}
}
