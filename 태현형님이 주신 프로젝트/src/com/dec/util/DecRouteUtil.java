package com.dec.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.dassault_systemes.enovia.route.RouteConstants;
import com.matrixone.apps.common.Route;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;

import matrix.db.Context;
import matrix.db.Policy;
import matrix.db.RelationshipType;
import matrix.util.StringList;

public class DecRouteUtil {
    private static Logger logger = Logger.getLogger(DecRouteUtil.class);

    public static Route createRoute(Context context, String sObjectId, String sState, String sPerson, Map mAttr) throws Exception {
        return createRoute(context, sObjectId, sState, sPerson, null, mAttr);
    }
    
    public static void createRouteNotifyFromAdmin(Context context, String sObjectId, String sState, String sPerson, Map mAttr) throws Exception {
		try { 
			// Route - Notify Only (from admin_platform)
			ContextUtil.pushContext(context, "admin_platform", null, null);
	    	Route route = createRouteNotify(context, sObjectId, sState, sPerson, null, mAttr);
	    	route.promote(context); // Start route & send Notification (status : Draft --> Complete)
		} catch (Exception ee) {
		} finally {
			ContextUtil.popContext(context);
		}
    }
    
    public static Route createRouteComment(Context context, String sObjectId, String sState, String sPerson, Map mAttr) throws Exception {
    	mAttr.put(DomainConstants.ATTRIBUTE_ROUTE_ACTION, RouteConstants.ROUTE_ACTION_COMMENT);
    	return createRouteComment(context, sObjectId, sState, sPerson, null, mAttr);
    }
    
    public static Route createRouteComment(Context context, String sObjectId, String sState, String sPerson, String sChangePerson, Map mAttr) throws Exception {
    	mAttr.put(DomainConstants.ATTRIBUTE_ROUTE_ACTION, RouteConstants.ROUTE_ACTION_COMMENT);
    	return createRoute(context, sObjectId, sState, sPerson, sChangePerson, mAttr, true);
    }

    public static Route createRouteNotify(Context context, String sObjectId, String sState, String sPerson, Map mAttr) throws Exception {
    	mAttr.put(DomainConstants.ATTRIBUTE_ROUTE_ACTION, "Notify Only");
    	return createRouteNotify(context, sObjectId, sState, sPerson, null, mAttr);
    }

    public static Route createRoute(Context context, String sObjectId, String sState, String sPerson, String sChangePerson, Map mAttr) throws Exception {
    	return createRoute(context, sObjectId, sState, sPerson, sChangePerson, mAttr, false);
    }
    
    public static Route createRouteNotify(Context context, String sObjectId, String sState, String sPerson, String sChangePerson, Map mAttr) throws Exception {
    	mAttr.put(DomainConstants.ATTRIBUTE_ROUTE_ACTION, "Notify Only");
    	return createRoute(context, sObjectId, sState, sPerson, sChangePerson, mAttr, true);
    }
    
    public static Route createRoute(Context context, String sObjectId, String sState, String sPerson, String sChangePerson, Map mAttr, boolean isNotify) throws Exception {
        Route route = (Route) DomainObject.newInstance(context, DomainConstants.TYPE_ROUTE);


        DomainObject dom = new DomainObject(sObjectId);
        String sPolicy			= dom.getInfo(context, DomainConstants.SELECT_POLICY);
        if(!mAttr.containsKey(DomainConstants.ATTRIBUTE_ROUTE_ACTION)) {
        	mAttr.put(DomainConstants.ATTRIBUTE_ROUTE_ACTION, RouteConstants.ROUTE_ACTION_APPROVE);
        }
        StringBuffer sbBusExpr	= new StringBuffer("(attribute[Route Status] != \"Finished\" && attribute[Route Status] != \"Stopped\")");

        String sRouteAction	= (String) mAttr.get(DomainConstants.ATTRIBUTE_ROUTE_ACTION);
    	sbBusExpr.append(" && attribute[Route Completion Action] == ");
    	if(sRouteAction.equals(RouteConstants.ROUTE_ACTION_COMMENT) || sRouteAction.equals("Notify Only")) {
    		sbBusExpr.append("'Notify Route Owner'");
    		
    	} else if(sRouteAction.equals(RouteConstants.ROUTE_ACTION_APPROVE)) {
    		sbBusExpr.append("'Promote Connected Object'");
    	}
        
        
        MapList mlRoute = dom.getRelatedObjects(context,
								                DomainConstants.RELATIONSHIP_OBJECT_ROUTE,
								                DomainConstants.TYPE_ROUTE,
								                new StringList(StringList.create(DomainConstants.SELECT_ID,"from[Route Node].attribute[Route Action]")),
								                null,
								                false,
								                true,
								                (short) 0,
								                sbBusExpr.toString(),
								                DomainObject.getAttributeSelect(DomainConstants.ATTRIBUTE_ROUTE_BASE_STATE) + " == " + FrameworkUtil.reverseLookupStateName(context, sPolicy, sState),
								                0);

        System.out.println("Not Finished Route Count : " + mlRoute.size());
       
        boolean isCreateRoute	= true;
        if (mlRoute != null && mlRoute.size() > 0) {
        	for(Map mRoute : (List<Map>) mlRoute) {
        		String sRelRouteAction	= StringUtils.trimToEmpty((String) mRoute.get("from[Route Node].attribute[Route Action]"));
        		if((sRouteAction.equals(RouteConstants.ROUTE_ACTION_COMMENT) && sRelRouteAction.contains(RouteConstants.ROUTE_ACTION_COMMENT)) ||
        				(sRouteAction.equals("Notify Only") && sRelRouteAction.contains("Notify Only")) ||
        				(sRouteAction.equals(RouteConstants.ROUTE_ACTION_APPROVE) && sRelRouteAction.contains(RouteConstants.ROUTE_ACTION_APPROVE))) {
    				isCreateRoute	= false;
    				break;
        		}
        	}
        } else {
        	isCreateRoute	= true;
        }
        
        
        if (!isCreateRoute) {
            route.setId((String) ((Map) mlRoute.get(0)).get(DomainConstants.SELECT_ID));
        } else {
            //If there are no routes on the state selected create a new route
            String sRouteName = FrameworkUtil.autoName(context,
                    FrameworkUtil.getAliasForAdmin(context, DomainConstants.SELECT_TYPE, DomainConstants.TYPE_ROUTE, true),
                    new Policy(DomainConstants.POLICY_ROUTE).getFirstInSequence(context),
                    FrameworkUtil.getAliasForAdmin(context, DomainConstants.SELECT_POLICY, DomainConstants.TYPE_ROUTE, true),
                    null,
                    null,
                    true,
                    true);

            // Create new route object
            try {
            	route.createObject(context, DomainConstants.TYPE_ROUTE, sRouteName, null, DomainConstants.POLICY_ROUTE, null);
            } catch (Exception e) {
            	e.printStackTrace();
            	throw e;
            }

            // Connect the Route Owner
            String sPersonOwner = context.getUser();
            String sPersonOwnerId = PersonUtil.getPersonObjectID(context, sPersonOwner);

            //Connect route to the owner
            route.addRelatedObject(context, new RelationshipType(DomainConstants.RELATIONSHIP_PROJECT_ROUTE), false, sPersonOwnerId);

            //connect content to the route
            HashMap mState = new HashMap();
            mState.put(sObjectId, sState);
            route.AddContent(context, new String[]{sObjectId}, mState);

            if(isNotify) {
            	route.setAttributeValue(context, "Route Completion Action", "Notify Route Owner");
            	
            } else {
            	route.setAttributeValue(context, "Route Completion Action", "Promote Connected Object");
            	
            }
            
        }

        createInboxTask(context, route, sPerson, sChangePerson, mAttr);
        return route;
    }

    public static void createInboxTask(Context context, Route route, String sPerson, String sChangePerson, Map mAttr) throws Exception {
        String sPersonObjId = PersonUtil.getPersonObjectID(context, sPerson);
        if (StringUtils.isNotEmpty(sChangePerson)) {
            MapList mlChange = route.getRelatedObjects(context,
                    DomainConstants.RELATIONSHIP_ROUTE_NODE,
                    DomainConstants.TYPE_PERSON,
                    new StringList(DomainConstants.SELECT_ID),
                    new StringList(DomainConstants.SELECT_RELATIONSHIP_ID),
                    false,
                    true,
                    (short) 0,
                    null,
                    DomainConstants.SELECT_NAME + " == " + sChangePerson,
                    0);

            if (mlChange != null && mlChange.size() > 0) {
                String sChangeId = (String) ((Map) mlChange.get(0)).get(DomainConstants.SELECT_RELATIONSHIP_ID);
                DomainRelationship dr = new DomainRelationship(sChangeId);
                dr.setToObject(context, sChangeId, new DomainObject(sPersonObjId));

                if (MapUtils.isNotEmpty(mAttr)) {
                    dr.setAttributeValues(context, mAttr);
                }
            }
        } else {
            DomainRelationship drRouteNode = DomainRelationship.connect(context, route, DomainConstants.RELATIONSHIP_ROUTE_NODE, new DomainObject(sPersonObjId));

            Map mDefault = new HashMap();
            mDefault.put(DomainConstants.ATTRIBUTE_ROUTE_SEQUENCE, "1");
            if(!mAttr.containsKey(DomainConstants.ATTRIBUTE_ROUTE_ACTION)) {
            	mDefault.put(DomainConstants.ATTRIBUTE_ROUTE_ACTION, "Approve");
            }
            
            mDefault.putAll(mAttr);

            drRouteNode.setAttributeValues(context, mDefault);
        }
    }

    public static String getPropertyValue(Context context, String strAttribute, String propertyName) {
        String propertyValue = "";

        try {
            String sCommd = "print attribute $1 select $2 dump $3";
            String selectProp = "property[" + propertyName + "]";
            String result = MqlUtil.mqlCommand(context, sCommd, strAttribute, selectProp, "|");


            if (result.indexOf("value") != -1) {
                propertyValue = result.substring(result.indexOf("value") + 6, result.length()).trim();
            }
        } catch (Exception e) {
            System.out.println("Exception in getPropertyValue " + e);
        }

        return propertyValue;
    }

}
