import java.util.Map;

import com.matrixone.apps.cache.CacheManager;
import com.matrixone.apps.cache.CacheManager._entityNames;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MessageUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;

import matrix.db.Context;
import matrix.util.MatrixException;
import matrix.util.StringList;

public class emxTriggerUtil_mxJPO {
    public static int eServicecommonTrigcAutoRouteByAttribute_if(Context context, String[] args) throws Exception {
        // get input arguments
        String attributeName = args[0];
        attributeName = PropertyUtil.getSchemaProperty(context, attributeName);
        String sendOption = args[1];
        if ("reassign".equals(sendOption)) {
            sendOption = "assign";
        }
        String subject = args[2];
        if ("NULL".equals(subject)) {
            subject = "";
        }
        String text = args[3];
        if ("NULL".equals(text)) {
            text = "";
        }
        String passObject = args[4];
        String notify = args[5];
        if ("".equals(notify)) {
            notify = "TRUE";
        }
        String basePropFile = args[6];
        if ("".equals(basePropFile)) {
            basePropFile = "emxFrameworkStringResource";
        }

        // get the TNR of the object
        String oid = MqlUtil.mqlCommand(context, "get env $1", "OBJECTID");
        DomainObject object = DomainObject.newInstance(context, oid);
        String attValue = object.getInfo(context, "attribute[" + attributeName + "]");
        if ("assign".equals(sendOption) || "route".equals(sendOption)) {
            MqlUtil.mqlCommand(context, "mql modify bus $1 owner $2", true, oid, attValue);
        }

        if ("send".equals(sendOption) || "route".equals(sendOption)) {
            MqlUtil.mqlCommand(context, "execute program emxMailUtil -method sendNotificationToUser $1 $2 $3 $4 $5 $6 $7", attValue, subject, "0", text, "0", oid, basePropFile);
        }

        if ("TRUE".equals(notify)) {
            MqlUtil.mqlCommand(context, "execute program emxMailUtil -method getMessage $1 $2 $3 $4 $5 $6", "emxFramework.ProgramObject.eServicecommonAutoRouteByAttribute.Notification", "2", "Operation", sendOption, "Owner", attValue);
        }
        return 0;
    }

    public static int eServicecommonTrigaReleaseDrawing_if(Context context, String[] args) throws Exception {
        return 0;
    }

    public static void eServiceCheckRoutes_if(Context context, String[] args) throws Exception {
        String type = MqlUtil.mqlCommand(context, "get env $1", "TYPE");
        String name = MqlUtil.mqlCommand(context, "get env $1", "NAME");
        String rev = MqlUtil.mqlCommand(context, "get env $1", "REVISION");
        String id = MqlUtil.mqlCommand(context, "get env $1", "OBJECTID");
        String state = MqlUtil.mqlCommand(context, "get env $1", "CURRENTSTATE");
        String policy = MqlUtil.mqlCommand(context, "get env $1", "POLICY");

        String relObjectRoute = PropertyUtil.getSchemaProperty(context, "relationship_ObjectRoute");
        String typeRoute = PropertyUtil.getSchemaProperty(context, "type_Route");
        String attRouteBaseState = PropertyUtil.getSchemaProperty(context, "attribute_RouteBaseState");
        String attRouteBasePolicy = PropertyUtil.getSchemaProperty(context, "attribute_RouteBasePolicy");
        String stateCompete = CacheManager.getInstance().getValue(context, _entityNames.POLICY_STATES, "policy_Route", "state_Complete");

        ContextUtil.pushContext(context);
        DomainObject object = DomainObject.newInstance(context, id);
        object.open(context);
        StringList busSelects = new StringList();
        busSelects.addElement("type");
        busSelects.addElement("name");
        busSelects.addElement("revision");
        busSelects.addElement("current");
        StringList relSelects = new StringList();
        relSelects.addElement("attribute[" + attRouteBaseState + "]");
        relSelects.addElement("attribute[" + attRouteBasePolicy + "]");
        MapList list = object.getRelatedObjects(context, relObjectRoute, typeRoute, busSelects, relSelects, false, true, (short) 1, null, null, 0);
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
            String routeBaseSymState = (String)route.get("attribute[" + attRouteBaseState + "]");
            String routeBaseSymPolicy = (String)route.get("attribute[" + attRouteBasePolicy + "]");
            String routeBaseState = CacheManager.getInstance().getValue(context, CacheManager._entityNames.POLICY_STATES, routeBaseSymPolicy, routeBaseSymState );
            String routeBasePolicy = PropertyUtil.getSchemaProperty(context, routeBaseSymPolicy);

            if (routeBaseSymState != null && !routeBaseSymState.equals("Ad Hoc")) {
                if (routeBaseState == null || routeBaseState.length() == 0) {
                    String[] keys = new String[5];
                    String[] values = new String[5];
                    keys[0] = "State";
                    keys[1] = "Type";
                    keys[2] = "RType";
                    keys[3] = "RName";
                    keys[4] = "RRev";
                    values[0] = routeBaseSymState;
                    values[1] = type;
                    values[2] = routeType;
                    values[3] = routeName;
                    values[4] = routeRev;
                    throw new Exception(MessageUtil.getMessage(context, "emxFramework.ProgramObject.eServicecommonCheckRoutes_if.InvalidState", keys, values, null));
                }

                if (routeBasePolicy == null || routeBasePolicy.length() == 0) {
                    String[] keys = new String[5];
                    String[] values = new String[5];
                    keys[0] = "Policy";
                    keys[1] = "Type";
                    keys[2] = "RType";
                    keys[3] = "RName";
                    keys[4] = "RRev";
                    values[0] = routeBasePolicy;
                    values[1] = type;
                    values[2] = routeType;
                    values[3] = routeName;
                    values[4] = routeRev;
                    throw new Exception(MessageUtil.getMessage(context, "emxFramework.ProgramObject.eServicecommonCheckRoutes_if.InvalidPolicy", keys, values, null));
                }
            }
            Boolean considerAdHocRoutes = true;
            try {
                considerAdHocRoutes = Boolean.parseBoolean(EnoviaResourceBundle.getProperty(context, "emxFramework.AdHocRoutesBlockLifecycle"));
            } catch(Exception ex) {
                considerAdHocRoutes = false;
            }
            if (considerAdHocRoutes && routeBaseSymState.equalsIgnoreCase("Ad Hoc") || (state.equals(routeBaseState)  && policy.equals(routeBasePolicy))) {
                if(!routeState.equals(stateCompete)) {
                    bPromoteFlag = true;
                    inWorkRoutes.append("'" + routeType + "' '" + routeName + "' '" + routeRev + "'");
                }
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
            String strMsg = MessageUtil.getMessage(context, "emxFramework.ProgramObject.eServicecommonCheckRoutes_if.RouteNotComplete", keys, values, null);

            // This call is being made to check where the trigger is being called from.  In the case of TSK, the ENOVIA_SERVER_URL variable
            // is stored as data on the context object, and we use mql error for the message.  Within BPS, this variable is null.  In both cases
            // we throw Exception
            //
            if (context.getCustomData("ENOVIA_SERVER_URL") != null) {
                emxContextUtil_mxJPO.mqlError(context,strMsg);
            }
            throw new MatrixException(strMsg);
        }
        // return 0;
    }

    public static int eServicecommonTrigaSyncAdminObjectName_if(Context context, String[] args) throws FrameworkException {
        String adminType = args[0];
        String adminOldName = args[1];
        String adminNewName = args[2];

        String foundName = MqlUtil.mqlCommand(context, "list $1 $2", adminType, adminOldName);
        if (adminOldName.equalsIgnoreCase(foundName)) {
            MqlUtil.mqlCommand(context, "mod $1 $2 name $3", true, adminType, adminOldName, adminNewName);
        }
        return 0;
    }

    public static int eServicecommonTrigaNotifyEmailChange_if(Context context, String[] args) throws FrameworkException {
        String person = args[0];
        String oldEmail = args[1];
        String newEmail = args[2];
        String user = args[3];
        String time = args[4];
        String emailDefault = args[5];
        String currentState = args[6];

        String stateActive = CacheManager.getInstance().getValue(context, CacheManager._entityNames.POLICY_STATES, "policy_Person", "state_Active");
        String stateInactive = CacheManager.getInstance().getValue(context, CacheManager._entityNames.POLICY_STATES, "policy_Person", "state_Inactive ");

        if (currentState.equalsIgnoreCase(stateActive)) {
            if (!oldEmail.equalsIgnoreCase(emailDefault)) {
                MqlUtil.mqlCommand(context, "exec program emxMailUtil -method sendNotificationToUser $1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 $15" ,
                        person,
                        "emxFramework.ProgramObject.eServicecommonTrigaNotifyEmailChange_if.Subject", "0",
                        "emxFramework.ProgramObject.eServicecommonTrigaNotifyEmailChange_if.Message", "4",
                        "oldEmail", oldEmail,
                        "newEmail", newEmail,
                        "user", user,
                        "time", time,
                        "",
                        ""
                        );
            }
        } else {
            MqlUtil.mqlCommand(context, "exec program emxMailUtil -method sendNotificationToUser $1 $2 $3 $4 $5 $6 $7" ,
                    person,
                    "emxFramework.ProgramObject.eServicecommonTrigaNotifyEmailChange_if.RegSubject", "0",
                    "emxFramework.ProgramObject.eServicecommonTrigaNotifyEmailChange_if.RegMessage", "0",
                    "",
                    ""
                    );
        }

        MqlUtil.mqlCommand(context, "modify person $1 email $2", true, person, newEmail);

        if (currentState.equalsIgnoreCase(stateActive)) {
            if (!newEmail.equalsIgnoreCase(emailDefault)) {
                MqlUtil.mqlCommand(context, "exec program emxMailUtil -method sendNotificationToUser $1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 $15" ,
                        person,
                        "emxFramework.ProgramObject.eServicecommonTrigaNotifyEmailChange_if.Subject", "0",
                        "emxFramework.ProgramObject.eServicecommonTrigaNotifyEmailChange_if.Message", "4",
                        "oldEmail", oldEmail,
                        "newEmail", newEmail,
                        "user", user,
                        "time", time,
                        "",
                        ""
                        );
            }
        }

        return 0;
    }

    public static int eServicecommonTrigaDeleteDrawing_if(Context context, String[] args) throws Exception {

        return 0;
    }

    public static int eServicecommonTrigcChangeOwner_if(Context context, String[] args) throws Exception {

        String id = MqlUtil.mqlCommand(context, "get env $1", "OBJECTID");
        String newOwner = args[0];

        MqlUtil.mqlCommand(context, "mql mod bus $1 owner $2", true, id, newOwner);
        return 0;
    }

    public static int eServicecommonTrigaRevisePart_if(Context context, String[] args) throws Exception {

        return 0;
    }

    //todo
    public static int eServicecommonTrigaReviseDrawing_if(Context context, String[] args) throws Exception {

        return 0;
    }

    public static int eServicecommonTrigaCleanupMeetingConnections_if(Context context, String[] args) throws Exception {
        String relAssignedMeetings = PropertyUtil.getSchemaProperty(context, "relationship_AssignedMeetings");
        String relMeetingContext = PropertyUtil.getSchemaProperty(context, "relationship_MeetingContext");
        String attOriginator = PropertyUtil.getSchemaProperty(context, "attribute_Originator");
        String attMeetingOwner = PropertyUtil.getSchemaProperty(context, "attribute_MeetingOwner");

        String id = MqlUtil.mqlCommand(context, "get env OBJECTID");
        DomainObject object = DomainObject.newInstance(context, id);
        object.open(context);
        StringList relSelects = new StringList();
        relSelects.addElement("id");
        relSelects.addElement("attribute[" + attMeetingOwner + "]");
        MapList list = object.getRelatedObjects(context, relAssignedMeetings + "," + relMeetingContext, null, null, relSelects, true, false, (short) 1, null, null, 0);
        object.close(context);
        for(int i = 0; list != null && i < list.size(); i++) {
            Map obj = (Map)list.get(i);
            String owner = (String)obj.get("attribute[" + attMeetingOwner + "]");
            if (owner.equals("No")) {
                String connectionId = (String)obj.get("id");
                MqlUtil.mqlCommand(context, "delete connection $1", true, connectionId);
            }
        }

        return 0;
    }

}
