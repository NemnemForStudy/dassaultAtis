package com.dec.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.StringReader;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.ListIterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.common.Company;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.framework.ui.UINavigatorUtil;

import matrix.db.Context;
import matrix.util.StringList;

public class DecMatrixUtil {
    private static Logger logger = Logger.getLogger(DecMatrixUtil.class);

    public static Map<String, MapList> libraryMap = null;

    public static MapList productUniqueNoList = null;
    public static MapList commonStandardList = null;

    public static String SC_AUTHOR = "VPLMCreator.$1.$2";
    public static String SC_CONTRIBUTOR = "VPLMExperimenter.$1.$2";
    public static String SC_OWNER = "VPLMProjectAdministrator.$1.$2";
    public static String SC_LEADER = "VPLMProjectLeader.$1.$2";
    public static String SC_PUBLIC_READER = "VPLMSecuredCrossAccess.$1.$2";
    public static String SC_READER = "VPLMViewer.$1.$2";

    public static String SC_DEFAULT_PJT = "GLOBAL";
    public static String SC_DEFAULT_ROLE = "Project User";

    /**
     * 관리자 Context
     *
     * @return context
     */
    public static Context getAdminContext() {
        Context context = null;
        try {

            String sUser = "admin_platform";
            String sPass = "Qwer1234";

            context = connectContext(sUser, sPass);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            if (context != null)
                context.close();
        }
        return context;
    }

    /**
     * @param user
     * @return
     * @throws Exception
     */
    public static Context connectContext(String user) throws Exception {
        return connectContext(user, "");
    }

    /**
     * @param user
     * @return
     * @throws Exception
     */
    public static Context connectContext(String user, String pass) throws Exception {
        Context context = null;
        try {
            if (DecStringUtil.isNotEmpty(user)) {
                pass = DecStringUtil.nullToEmpty(pass);
                context = new Context("localhost");
                context.setUser(user);
                context.setPassword(pass);
                context.connect();
            }
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            if (context != null)
                context.close();

            throw e;
        }
        return context;
    }

    /**
     * enovia.ini 파일의 변수 값
     *
     * @param context
     * @param var
     * @return sValue
     * @throws Exception
     */
    public static String getSystemINIVariable(Context context, String var) {
        String sValue = DecConstants.EMPTY_STRING;
        boolean isConnect = false;
        try {
            if (context == null) {
                context = getAdminContext();
                isConnect = true;
            }

            if (DecStringUtil.isNotEmpty(var)) {
                StringList slValue = FrameworkUtil.splitString(MqlUtil.mqlCommand(context, "print system inivar $1", true, var), "=");
                sValue = slValue.size() > 1 ? ((String) slValue.get(1)).trim() : sValue;
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return "";
        } finally {
            if (isConnect)
                context.close();
        }
        return sValue;
    }

    /**
     * enovia.ini 파일의 변수 값
     *
     * @param var
     * @return sValue
     * @throws Exception
     */
    public static String getSystemINIVariable(String var) {
        return getSystemINIVariable(null, var);
    }


    /**
     * Type의 attribute Name List
     *
     * @param context
     * @param sType
     * @return
     * @throws Exception
     */
    public static StringList getAttributeNamesOfType(Context context, String sType) throws Exception {
        StringList attributeList = new StringList();
        try {
            String sRst = MqlUtil.mqlCommand(context, "print type $1 select $2 dump $3", sType, "attribute", "|");
            attributeList.addAll(FrameworkUtil.splitString(sRst, "|"));
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return attributeList;
    }

    /**
     * Type의 attribute Selector List
     *
     * @param context
     * @param sType
     * @return
     * @throws Exception
     */
    public static StringList getSelectAttributeListOfType(Context context, String sType) throws Exception {
        StringList selectList = new StringList();
        try {
            StringList slRst = getAttributeNamesOfType(context, sType);
            for (ListIterator<String> itr = slRst.listIterator(); itr.hasNext(); ) {
                selectList.addElement("attribute[" + itr.next() + "]");
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return selectList;
    }

    /**
     * Interface의 attribute Name List
     *
     * @param context
     * @param sInterface
     * @return
     * @throws Exception
     */
    public static StringList getAttributeNamesOfInterface(Context context, String sInterface) throws Exception {
        StringList attributeList = new StringList();
        try {
            String sRst = MqlUtil.mqlCommand(context, "print interface $1 select $2 dump $3", sInterface, "attribute", "|");
            attributeList.addAll(FrameworkUtil.splitString(sRst, "|"));
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return attributeList;
    }

    /**
     * Interface의 attribute Selector List
     *
     * @param context
     * @param sInterface
     * @return
     * @throws Exception
     */
    public static StringList getSelectAttributeListOfInterface(Context context, String sInterface) throws Exception {
        StringList selectList = new StringList();
        try {
            StringList slRst = getAttributeNamesOfInterface(context, sInterface);
            for (ListIterator<String> itr = slRst.listIterator(); itr.hasNext(); ) {
                selectList.addElement("attribute[" + itr.next() + "]");
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return selectList;
    }

    /**
     * Relationship attribute Name List
     *
     * @param context
     * @param sRelationship
     * @return
     * @throws Exception
     */
    public static StringList getAttributeNamesOfRelationship(Context context, String sRelationship) throws Exception {
        StringList attributeList = new StringList();
        try {
            String sRst = MqlUtil.mqlCommand(context, "print relationship $1 select $2 dump $3", sRelationship, "attribute", "|");
            attributeList.addAll(FrameworkUtil.splitString(sRst, "|"));
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return attributeList;
    }


    /**
     * Relationship attribute Selector List
     *
     * @param context
     * @param sRelationship
     * @return
     * @throws Exception
     */
    public static StringList getSelectAttributeListOfRelationship(Context context, String sRelationship) throws Exception {
        StringList selectList = new StringList();
        try {
            StringList slRst = getAttributeNamesOfRelationship(context, sRelationship);
            for (ListIterator<String> itr = slRst.listIterator(); itr.hasNext(); ) {
                selectList.addElement("attribute[" + itr.next() + "]");
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return selectList;
    }

    /**
     * Object Info
     *
     * @param context
     * @param sObjectId
     * @param sSelect
     * @return
     * @throws Exception
     */
    public static String getInfo(Context context, String sObjectId, String sSelect) throws Exception {
        return getInfo(context, sObjectId, sSelect, DecConstants.DEFAULT_SPLITOR);
    }

    /**
     * Object Info
     *
     * @param context
     * @param sObjectId
     * @param sSelect
     * @param sDelimiter
     * @return
     * @throws Exception
     */
    public static String getInfo(Context context, String sObjectId, String sSelect, String sDelimiter) throws Exception {
        String sRtn = DecConstants.EMPTY_STRING;
        if (DecStringUtil.isEmpty(sObjectId))
            return sRtn;

        try {
            sRtn = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump $3", sObjectId, sSelect, sDelimiter);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return sRtn;
        }
        return sRtn;
    }

    /**
     * Connect Check
     *
     * @param context
     * @param sFromObjId
     * @param sToObjId
     * @param sRelationshipName
     * @return
     * @throws Exception
     */
    public static boolean isConnected(Context context, String sFromObjId, String sToObjId, String sRelationshipName) throws Exception {
        String isConnected = "false";
        try {
            isConnected = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", sFromObjId, "from[" + sRelationshipName + "|to.id==" + sToObjId + "]");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
        return isConnected.equalsIgnoreCase("true") ? true : false;
    }

    /**
     * Type, Name으로 최신 rev Object의 ID 찾기
     *
     * @param context
     * @param sType
     * @param sName
     * @return
     * @throws Exception
     */
    public static String getObjectId(Context context, String sType, String sName) throws Exception {
        return getObjectId(context, sType, sName, DecConstants.QUERY_WILDCARD);
    }

    /**
     * Type, Name, Revision 으로 Object의 ID 찾기
     *
     * @param context
     * @param sType
     * @param sName
     * @param sRev
     * @return
     * @throws Exception
     */
    public static String getObjectId(Context context, String sType, String sName, String sRev) throws Exception {
        return getObjectId(context, sType, sName, sRev, null);
    }

    /**
     * Type, Name, Revision 으로 Object의 ID 찾기
     *
     * @param context
     * @param sType
     * @param sName
     * @param sRev
     * @return
     * @throws Exception
     */
    public static String getObjectId(Context context, String sType, String sName, String sRev, String sWhereExp) throws Exception {
        String sObjectId = DecConstants.EMPTY_STRING;
        try {
            sWhereExp = DecStringUtil.nullToEmpty(sWhereExp);
            sWhereExp += (sWhereExp.length() > 0 ? "&&" : "") + " (type=='" + sType + "')";
            if (DecConstants.QUERY_WILDCARD.equals(sRev))
                sWhereExp = sWhereExp + " && (revision==last)";

            StringList slResult = FrameworkUtil.splitString(MqlUtil.mqlCommand(context, "temp query bus $1 $2 $3 where $4 select $5 dump $6", sType, sName, sRev, sWhereExp, DecConstants.SELECT_ID, DecConstants.RELATION_OBJECT_SPLITOR), DecConstants.RELATION_OBJECT_SPLITOR);
            if (slResult.size() > 3)
                sObjectId = (String) slResult.get(3);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return sObjectId;
        }
        return sObjectId;
    }

    /**
     * Object Connect
     *
     * @param context
     * @param sFromObjId
     * @param sToObjId
     * @param sRelationship
     * @param isDuplicated
     * @param attributeMap
     * @return
     * @throws Exception
     */
    public static boolean connect(Context context, String sFromObjId, String sToObjId, String sRelationship, boolean isDuplicated, Map attributeMap) throws Exception {
        boolean isConnect = false;
        String connectionId = null;
        try {
            if (!isConnected(context, sFromObjId, sToObjId, sRelationship) || isDuplicated) {
                connectionId = DomainRelationship.connect(context, DomainObject.newInstance(context, sFromObjId), sRelationship, DomainObject.newInstance(context, sToObjId)).getName();
                isConnect = true;
            } else {
                return false;
            }

            if (isConnect && (attributeMap != null && !attributeMap.isEmpty())) {
                new DomainRelationship(connectionId).setAttributeValues(context, attributeMap);
                connectionId = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", sFromObjId, "from[" + sRelationship + "|to.id==" + sToObjId + "].id");
            }
        } catch (Exception e) {
            if (isConnect) {
                MqlUtil.mqlCommand(context, "del connection $1", true, connectionId);
            }
            throw e;
        }
        return isConnect;
    }

    /**
     * @param context
     * @param sFromObjId
     * @param sToObjId
     * @param sRelationship
     * @param sWhereClause
     * @throws Exception
     */
    public static void disconnect(Context context, String sFromObjId, String sToObjId, String sRelationship, String sWhereClause) throws Exception {
        try {
            StringBuilder sSelectBuilder = new StringBuilder();
            sSelectBuilder.append("from[").append(sRelationship).append("|to.id=='").append(sToObjId).append("'");
            if (DecStringUtil.isNotEmpty(sWhereClause)) {
                sSelectBuilder.append(" && ").append(sWhereClause);
            }
            sSelectBuilder.append("].id");

            StringList slResult = FrameworkUtil.splitString(getInfo(context, sFromObjId, sSelectBuilder.toString()), "|");
            if (slResult.size() > 0) {
                String[] sConnectionId = new String[slResult.size()];
                sConnectionId = (String[]) slResult.toArray(sConnectionId);
                DomainRelationship.disconnect(context, sConnectionId[0]);
            }
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw e;
        }
    }

    /**
     * @param context
     * @param objectId
     * @param sRelationship
     * @param disconnectFrom
     * @throws Exception
     */
    public static void disconnect(Context context, String objectId, String sRelationship, boolean disconnectFrom) throws Exception {
        try {
            StringBuffer sSelectBuilder = new StringBuffer();
            if (DecStringUtil.isEmpty(sRelationship)) {
                System.out.println("Relationship name is null!");
            }
            sSelectBuilder.append(disconnectFrom ? "to" : "from").append("[").append(sRelationship).append("].id");

            StringList slResult = FrameworkUtil.splitString(getInfo(context, objectId, sSelectBuilder.toString()), "|");
            if (slResult.size() > 0) {
                String[] sConnectionId = new String[slResult.size()];
                sConnectionId = (String[]) slResult.toArray(sConnectionId);
                DomainRelationship.disconnect(context, sConnectionId);
            }
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw e;
        }
    }

    /**
     * Trigger Off
     *
     * @param context
     * @throws Exception
     */
    public static void triggerOff(Context context) throws Exception {
        try {
            MqlUtil.mqlCommand(context, "trigger off", true);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw e;
        }
    }

    /**
     * Trigger On
     *
     * @param context
     * @throws Exception
     */
    public static void triggerOn(Context context) throws Exception {
        try {
            MqlUtil.mqlCommand(context, "trigger on", true);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw e;
        }
    }

    /**
     * ENOVIA Workspace 경로
     *
     * @param context
     * @return
     * @throws Exception
     */
    public static String getWorkspacePath(Context context) throws Exception {
        String sWorkspace = DecConstants.EMPTY_STRING;
        try {
            String sBOSRoot = getSystemINIVariable(context, "MX_BOS_ROOT");
            String sBOSWorkspace = getSystemINIVariable(context, "MX_BOS_WORKSPACE");
            sWorkspace = sBOSRoot + sBOSWorkspace;
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw e;
        }
        return sWorkspace;
    }

    /**
     * @param context
     * @return
     * @throws Exception
     */
    public static String createWorkspace(Context context) throws Exception {
        String sWorkspace = DecConstants.EMPTY_STRING;
        try {
            sWorkspace = context.createWorkspace() + "/" + System.currentTimeMillis();
            File file = new File(sWorkspace);
            if (!file.exists()) {
                file.mkdirs();
            }
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw e;
        }
        return sWorkspace;
    }

    /**
     * ENOVIA Log 경로
     *
     * @param context
     * @return
     * @throws Exception
     */
    public static String getLogPath(Context context) throws Exception {
        String sLogPath = DecConstants.EMPTY_STRING;
        try {
            sLogPath = getSystemINIVariable(context, "MX_TRACE_FILE_PATH");
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw e;
        }
        return sLogPath;
    }


    /**
     * Icon Link HTML
     *
     * @param context
     * @param objectId
     * @param displayValue
     * @return
     * @throws FrameworkException
     */
    public static String getIconLinkHTML(Context context, String objectId, String displayValue) throws FrameworkException {
        return getIconLinkHTML(context, objectId, displayValue, true);
    }

    /**
     * Icon Link HTML
     *
     * @param context
     * @param objectId
     * @param displayValue
     * @param isPopup
     * @return
     * @throws FrameworkException
     */
    public static String getIconLinkHTML(Context context, String objectId, String displayValue, boolean isPopup) throws FrameworkException {
        return getIconLinkHTML(context, objectId, displayValue, "", isPopup);
    }

    /**
     * Icon Link HTML
     *
     * @param context
     * @param objectId
     * @param displayValue
     * @param defaultCategory
     * @param isPopup
     * @return
     * @throws FrameworkException
     */
    public static String getIconLinkHTML(Context context, String objectId, String displayValue, String defaultCategory, boolean isPopup) throws FrameworkException {
        return getIconLinkHTML(context, objectId, displayValue, defaultCategory, isPopup, true);
    }

    /**
     * @param context
     * @param objectId
     * @param displayValue
     * @param defaultCategory
     * @param isPopup
     * @param isIcon
     * @return
     * @throws FrameworkException
     */
    public static String getIconLinkHTML(Context context, String objectId, String displayValue, String defaultCategory, boolean isPopup, boolean isIcon) throws FrameworkException {
        String returnValue = "";
        if (DecStringUtil.nullToEmpty(objectId).length() > 0 && DecStringUtil.nullToEmpty(displayValue).length() > 0) {
            String iconName = isIcon ? UINavigatorUtil.getTypeIconProperty(context, DomainObject.newInstance(context, objectId).getInfo(context, DecConstants.SELECT_TYPE)) : "";

            if (isPopup) {
                returnValue = "<a href=\"javascript:emxTableColumnLinkClick('../common/emxTree.jsp?mode=insert&amp;objectId=" + objectId + "&amp;DefaultCategory=" + defaultCategory + "', '700', '600', 'false', 'popup','','" + displayValue + "','false' )\">" + (DecStringUtil.isNotEmpty(iconName) ? "<img src=\"images/" + iconName + "\" height=\"16\" border=\"0\" />" : "") + displayValue + "</a>";
            } else {
                returnValue = "<a href=\"../common/emxTree.jsp?mode=insert&amp;objectId=" + objectId + "\">" + displayValue + "</a>";
            }
        }
        return returnValue;
    }

    /**
     * Icon Link HTML
     *
     * @param context
     * @param value
     * @param iconPath
     * @param popupUrl
     * @return
     * @throws FrameworkException
     */
    public static String getIconPopupLinkHTML(Context context, String value, String iconPath, String popupUrl) throws FrameworkException {
        String returnValue = "";
        if (DecStringUtil.nullToEmpty(popupUrl).length() > 0 || DecStringUtil.nullToEmpty(iconPath).length() > 0) {
            returnValue = "<a href=\"javascript:emxTableColumnLinkClick('" + popupUrl + "', '700', '600', 'false', 'popup','','" + value + "','false' )\"><img src=\"" + iconPath + "\" height=\"18\" border=\"0\" />" + value + "</a>";
        }
        return returnValue;
    }

    /**
     * @param context
     * @param value
     * @param popupUrl
     * @return
     * @throws FrameworkException
     */
    public static String getPopupLinkHTML(Context context, String value, String popupUrl) throws FrameworkException {
        String returnValue = "";
        if (DecStringUtil.nullToEmpty(popupUrl).length() > 0) {
            returnValue = "<a href=\"javascript:emxTableColumnLinkClick('" + popupUrl + "', '700', '600', 'false', 'popup','','" + value + "','false' )\">" + value + "</a>";
        }
        return returnValue;
    }


    /**
     * @param field
     * @param value
     * @return
     * @throws Exception
     */
    public static StringBuffer getWhereExpression(String field, String value) throws Exception {
        return getWhereExpression(field, value, true);
    }

    /**
     * @param field
     * @param valueList
     * @return
     * @throws Exception
     */
    public static StringBuffer getWhereExpression(String field, StringList valueList) throws Exception {
        StringBuffer whereExpression = new StringBuffer();
        setWhereExpression(whereExpression, field, valueList);
        return whereExpression;
    }

    /**
     * @param field
     * @param value
     * @param isEquals
     * @return
     * @throws Exception
     */
    public static StringBuffer getWhereExpression(String field, String value, boolean isEquals) throws Exception {
        StringBuffer whereExpression = new StringBuffer();
        setWhereExpression(whereExpression, field, value, isEquals);
        return whereExpression;
    }

    /**
     * @param whereExpression
     * @param field
     * @param value
     * @throws Exception
     */
    public static void setWhereExpression(StringBuffer whereExpression, String field, String value) throws Exception {
        setWhereExpression(whereExpression, field, value, true);
    }

    /**
     * @param whereExpression
     * @param field
     * @param value
     * @param isEquals
     * @throws Exception
     */
    public static void setWhereExpression(StringBuffer whereExpression, String field, String value, boolean isEquals) throws Exception {
        setWhereExpression(whereExpression, field, value, isEquals, true);
    }

    /**
     * @param whereExpression
     * @param field
     * @param value
     * @param isEquals
     * @param caseSensitive
     * @throws Exception
     */
    public static void setWhereExpression(StringBuffer whereExpression, String field, String value, boolean isEquals, boolean caseSensitive) throws Exception {
        try {
            if (whereExpression != null) {
                if ((field != null && field.length() > 0) && (value != null && value.length() > 0)) {
                    if (!value.equals(DecConstants.QUERY_WILDCARD)) {
                        String comparisonOperator = isEquals ? ((value.indexOf(DecConstants.QUERY_WILDCARD) == 0 || value.lastIndexOf(DecConstants.QUERY_WILDCARD) == (value.length() - 1)) ? (caseSensitive ? " ~= " : " ~~ ") : " == ") : " != ";

                        whereExpression.append(whereExpression.length() > 0 ? " && " : "");
                        whereExpression.append("(").append(field).append(comparisonOperator).append("\"").append(value).append("\")");
                    }
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        }
    }

    /**
     * @param whereExpression
     * @param field
     * @param valueList
     * @throws Exception
     */
    public static void setWhereExpression(StringBuffer whereExpression, String field, StringList valueList) throws Exception {
        try {
            if (whereExpression != null) {
                StringBuffer valueBuffer = new StringBuffer();
                for (int i = 0; i < valueList.size(); i++) {
                    valueBuffer.append(valueBuffer.length() > 0 ? "," : "").append((String) valueList.get(i));
                }
                whereExpression.append(whereExpression.length() > 0 ? " && " : "");
                whereExpression.append("(").append(field).append(" smatchlist '").append(valueBuffer.toString()).append("' ',')");
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        }
    }

    /**
     * Connection Info
     *
     * @param context
     * @param sConnectionId
     * @param sSelect
     * @return
     * @throws Exception
     */
    public static String getConnectionInfo(Context context, String sConnectionId, String sSelect) throws Exception {
        return getConnectionInfo(context, sConnectionId, sSelect, DecConstants.DEFAULT_SPLITOR);
    }

    /**
     * Connection Info
     *
     * @param context
     * @param sConnectionId
     * @param sSelect
     * @param sDelimiter
     * @return
     * @throws Exception
     */
    public static String getConnectionInfo(Context context, String sConnectionId, String sSelect, String sDelimiter) throws Exception {
        String sRtn = DecConstants.EMPTY_STRING;
        try {
            sRtn = MqlUtil.mqlCommand(context, "print connection $1 select $2 dump $3", sConnectionId, sSelect, sDelimiter);
        } catch (Exception e) {
            return sRtn;
        }
        return sRtn;
    }

    /**
     * Check License
     *
     * @return context
     */
    public static boolean checkLicense(Context context, String lic) throws Exception {
        boolean isLic = false;
        try {
            if (DecStringUtil.isNotEmpty(lic)) {
                StringList assignLicList = FrameworkUtil.splitString(MqlUtil.mqlCommand(context, "print person $1 select $2 dump $3", context.getUser(), "product", "|"), "|");
                if (assignLicList.contains(lic)) {
                    isLic = true;
                }
            }
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
        }
        return isLic;
    }

    /**
     * WhereExpresion - filter에서 or 조건으로 검색 시 Where 문 반환
     *
     * @param context
     * @param sFilterValue
     * @param fieldList
     * @return
     * @throws Exception
     */
    public static String getFilterOrExpression(Context context, String sFilterValue, StringList fieldList) throws Exception {
        return getFilterOrExpression(context, sFilterValue, fieldList, StringList.create(","));
    }

    /**
     * WhereExpresion - filter에서 or 조건으로 검색 시 Where 문 반환
     *
     * @param context
     * @param fieldList
     * @param delimeterList
     * @return
     * @throws Exception
     */
    public static String getFilterOrExpression(Context context, String sValue, StringList fieldList, StringList delimeterList) throws Exception {
        StringBuffer sbWhereExp = new StringBuffer();
        try {
            if (DecStringUtil.isNotEmpty(sValue) && !sValue.equals("*") && delimeterList != null && delimeterList.size() > 0) {

                StringList slValueList = StringList.create(sValue);
                for (int i = 0; i < delimeterList.size(); i++) {
                    String sDelimeter = delimeterList.get(i);
                    int valueSize = slValueList.size();
                    for (int j = 0; j < valueSize; j++) {
                        sValue = slValueList.get(j);
                        if (sValue.contains(sDelimeter)) {
                            slValueList.remove(j--);
                            valueSize += -1;
                            slValueList.addAll(FrameworkUtil.splitString(sValue, sDelimeter));
                        }
                    }
                }

                for (String s : slValueList)
                    System.out.println(s);


            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sbWhereExp.toString();
    }

    /**
     * 내 회사 Id
     *
     * @param context
     * @return
     * @throws Exception
     */
    public static String getMyCompanyId(Context context) throws Exception {
        return getOrganizationInfo(context, context.getUser(), DecConstants.SELECT_ID, DecConstants.TYPE_COMPANY);
    }

    /**
     * 내 회사명
     *
     * @param context
     * @return
     * @throws Exception
     */
    public static String getMyCompanyName(Context context) throws Exception {
        return getOrganizationInfo(context, context.getUser(), DecConstants.SELECT_NAME, DecConstants.TYPE_COMPANY);
    }

    /**
     * 내 부서 Id
     *
     * @param context
     * @return
     * @throws Exception
     */
    public static String getMyDepartmentId(Context context) throws Exception {
        return getOrganizationInfo(context, context.getUser(), DecConstants.SELECT_ID, DecConstants.TYPE_DEPARTMENT);
    }

    /**
     * 내 부서명
     *
     * @param context
     * @return
     * @throws Exception
     */
    public static String getMyDepartmentName(Context context) throws Exception {
        return getOrganizationInfo(context, context.getUser(), DecConstants.SELECT_NAME, DecConstants.TYPE_DEPARTMENT);
    }

    public static boolean checkPerson(Context context, String sUser) {
        boolean isCreate = false;
        try {
            if (DecStringUtil.isNotEmpty(sUser)) {
                String sRst = MqlUtil.mqlCommand(context, "temp query bus $1 $2 $3 select $4 dump $5", true, "Person", sUser, "-", "name", "|");
                if (DecStringUtil.isNotEmpty(sRst)) {
                    isCreate = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isCreate;
    }

    /**
     * 조직 정보
     *
     * @param context
     * @param sUserName
     * @param sSelect
     * @param orgType
     * @return
     * @throws Exception
     */
    public static String getOrganizationInfo(Context context, String sUserName, String sSelect, String orgType) {
        String sValue = DecConstants.EMPTY_STRING;
        try {
            if (DecStringUtil.isEmpty(sUserName))
                sUserName = context.getUser();

            if (checkPerson(context, sUserName)) {
                String personId = PersonUtil.getPersonObjectID(context, sUserName);
                if (DecStringUtil.isNotEmpty(orgType)) {
                    sValue = getInfo(context, personId, "to[" + DecConstants.RELATIONSHIP_MEMBER + "|from.type=='" + orgType + "'].from." + sSelect);
                } else {
                    StringList orgTypeList = new StringList(3);
                    orgTypeList.add(DecConstants.TYPE_DEPARTMENT);
                    orgTypeList.add(DecConstants.TYPE_BUSINESS_UNIT);
                    orgTypeList.add(DecConstants.TYPE_COMPANY);

                    for (ListIterator<String> itr = orgTypeList.listIterator(); itr.hasNext(); ) {
                        orgType = itr.next();
                        sValue = getInfo(context, personId, "to[" + DecConstants.RELATIONSHIP_MEMBER + "|from.type=='" + orgType + "'].from." + sSelect);
                        if (DecStringUtil.isNotEmpty(sValue))
                            break;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return sValue;
        }
        return sValue;
    }

    /**
     * table의 Row Id를 StringList로 반환
     *
     * @param request
     * @return
     * @throws Exception
     */
    public static StringList getTableRowIdList(HttpServletRequest request) throws Exception {
        return getTableRowIdList(request.getParameterValues("emxTableRowId"));
    }

    /**
     * table의 Row Id를 StringList로 반환
     *
     * @param emxTableRowIds
     * @return
     * @throws Exception
     */
    public static StringList getTableRowIdList(String[] emxTableRowIds) throws Exception {
        StringList strList = new StringList();
        StringList objectIdList = new StringList();
        String oid = "";
        try {
            if (emxTableRowIds != null && emxTableRowIds.length > 0) {
                for (int i = 0; i < emxTableRowIds.length; i++) {
                    if (emxTableRowIds[i].indexOf("|") != -1) {
                        strList = FrameworkUtil.split(emxTableRowIds[i], "|");
                        if (strList.size() == 3) {
                            oid = (String) strList.get(0);
                        } else {
                            oid = (String) strList.get(1);
                        }
                    } else {
                        oid = emxTableRowIds[i];
                    }
                    objectIdList.add(oid);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return objectIdList;
    }

    /**
     * @param context
     * @param sObjectId
     * @param sInterfaceName
     * @return
     * @throws Exception
     */
    public static boolean addBusinessInterface(Context context, String sObjectId, String sInterfaceName) throws Exception {
        try {
            MqlUtil.mqlCommand(context, "mod bus $1 add interface $2", true, sObjectId, sInterfaceName);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * command의 href
     *
     * @param context
     * @param sCommandName
     * @return
     * @throws Exception
     */
    public static String getCommandHref(Context context, String sCommandName) throws Exception {
        StringBuffer sbHref = new StringBuffer();
        try {
            if (DecStringUtil.isNotEmpty(sCommandName)) {
                String sResult = MqlUtil.mqlCommand(context, "print command " + sCommandName + " select href setting[Registered Suite].value dump |", true);
                if (DecStringUtil.isNotEmpty(sResult)) {
                    StringList slResult = FrameworkUtil.splitString(sResult, "|");
                    sbHref.append(DecStringUtil.nullToEmpty((String) slResult.get(0)));
                    String sRegisteredSuite = DecStringUtil.nullToEmpty((String) slResult.get(1));

                    if (sbHref.indexOf("${COMMON_DIR}") >= 0) {
                        String sHref = "/3dspace/" + FrameworkUtil.findAndReplace(sbHref.toString(), "${COMMON_DIR}", "common");
                        sbHref.delete(0, sbHref.length());
                        sbHref.append(sHref);
                    } else if (sbHref.indexOf("${SUITE_DIR}") >= 0) {
                        String sDirectory = EnoviaResourceBundle.getProperty(context, "eServiceSuite" + sRegisteredSuite.replaceAll(" ", "") + ".Directory");
                        String sHref = "/3dspace/" + FrameworkUtil.findAndReplace(sbHref.toString(), "${SUITE_DIR}", sDirectory);
                        sbHref.delete(0, sbHref.length());
                        sbHref.append(sHref);
                    } else {
                        sbHref.append(sResult);
                    }

                    if (DecStringUtil.isNotEmpty(sRegisteredSuite)) {
                        sbHref.append((sbHref.indexOf("?") >= 0 ? "&" : "?") + "suiteKey=" + sRegisteredSuite);

                        String sStringResourceFileId = EnoviaResourceBundle.getProperty(context, "eServiceSuite" + sRegisteredSuite.replaceAll(" ", "") + ".StringResourceFileId");
                        if (DecStringUtil.isNotEmpty(sStringResourceFileId))
                            sbHref.append("&StringResourceFileId=" + sStringResourceFileId);
                        String sDirectory = EnoviaResourceBundle.getProperty(context, "eServiceSuite" + sRegisteredSuite.replaceAll(" ", "") + ".Directory");
                        if (DecStringUtil.isNotEmpty(sDirectory))
                            sbHref.append("&SuiteDirectory=" + sDirectory);
                    }
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            return sbHref.toString();
        }
        return sbHref.toString();
    }

    /**
     * @return
     * @throws Exception
     */
    public static boolean checkRegisteredUser(Context context, String sName) throws Exception {
        boolean checkUser = false;
        try {
            String sRst = MqlUtil.mqlCommand(context, "list person $1 select $2 dump $3", true, sName, "name", "|");
            if (sRst.length() > 0)
                checkUser = true;

        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            e.printStackTrace();
        }
        return checkUser;
    }

    /**
     * To-do List 생성
     *
     * @param context
     * @param mTodoInfo
     * @return
     * @throws Exception
     */
    public static boolean createToDo(Context context, Map mTodoInfo) throws Exception {
        try {
            StringList userList = (StringList) mTodoInfo.get("userList");
            String sUser = (String) mTodoInfo.get("user");
            String sTitle = (String) mTodoInfo.get("title");
            String sObjectId = (String) mTodoInfo.get("objectId");
            String sCommonTask = (String) mTodoInfo.get("commonTask");
            boolean isCommonTask = DecStringUtil.nullToStr(sCommonTask, "true").equalsIgnoreCase("true") ? true : false;

            if (DecStringUtil.isNotEmpty(sUser)) {
                if (userList == null)
                    userList = new StringList();

                userList.add(0, sUser);
            }

            if (userList != null && userList.size() > 0) {
                DomainObject doTask = null;
                String sTaskId = null;

                // 공통 To-List 일때
                if (isCommonTask) {
                    sUser = userList.get(0);
                    doTask = DomainObject.newInstance(context);
                    doTask.createObject(context, "Task", sTitle, String.valueOf(System.currentTimeMillis()), "Project Task", DecConstants.VAULT_ESERVICE_PRODUCTION);
                    doTask.setOwner(context, sUser);
                    sTaskId = doTask.getId(context);
                    connect(context, sObjectId, sTaskId, "Contributes To", true, null);
                }

                for (String userName : userList) {
                    // user별로 각각 to-doList를 생성할 때
                    if (!isCommonTask) {
                        doTask = DomainObject.newInstance(context);
                        doTask.createObject(context, "Task", sTitle, String.valueOf(System.currentTimeMillis()), "Project Task", DecConstants.VAULT_ESERVICE_PRODUCTION);
                        doTask.setOwner(context, sUser);
                        sTaskId = doTask.getId(context);
                        connect(context, sObjectId, sTaskId, "Contributes To", true, null);
                    }

                    String sPersonId = PersonUtil.getPersonObjectID(context, userName);
                    connect(context, sPersonId, sTaskId, "Assigned Tasks", true, null);
                }
            }
        } catch (
                Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    /**
     * To-do List 생성
     *
     * @param context
     * @param sUser
     * @param sTitle
     * @param sObjectId
     * @return
     * @throws Exception
     */
    public static boolean createToDo(Context context, String sUser, String sTitle, String sObjectId) throws Exception {
        return createToDo(context, StringList.create(sUser), sTitle, sObjectId, true);
    }

    public static boolean createToDo(Context context, StringList userList, String sTitle, String sObjectId, boolean isCommonTask) throws Exception {
        Map todoInfo = new HashMap();
        todoInfo.put("user", userList);
        todoInfo.put("title", sTitle);
        todoInfo.put("objectId", sObjectId);
        todoInfo.put("commonTask", String.valueOf(isCommonTask));
        return createToDo(context, todoInfo);
    }

    /**
     * @param sRole
     * @return
     * @throws Exception
     */
    public static StringList getRoleUserList(Context context, String sRole) throws Exception {
        StringList userLsit = new StringList();
        try {
            String sRst = MqlUtil.mqlCommand(context, "print role $1 select $2 dump $3", true, sRole, "person", "|");
            userLsit = FrameworkUtil.splitString(sRst, "|");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userLsit;
    }

    /**
     * @param context
     * @param sCheckinFile
     * @return
     */
    public static String checkinDocument(Context context, String sCheckinFile) {
        return checkinDocument(context, sCheckinFile, null);
    }

    public static String checkinDocument(Context context, String sCheckinFile, String sDesc) {
        String sNewDocId = DecConstants.EMPTY_STRING;
        try {
            File file = new File(sCheckinFile);
            if (file.exists()) {
                String sFileName = file.getName();
                String sFileDir = file.getParent();

                DomainObject dDoc = DomainObject.newInstance(context);
                DomainObject dFileDoc = DomainObject.newInstance(context);

                dDoc.createObject(context, DecConstants.TYPE_DOCUMENT, DomainObject.getAutoGeneratedName(context, "type_Document", ""), "0", DecConstants.POLICY_DOCUMENT, DecConstants.VAULT_ESERVICE_PRODUCTION);
                sNewDocId = dDoc.getObjectId(context);
                dDoc.setAttributeValue(context, "Title", sFileName);
                if (DecStringUtil.isNotEmpty(sDesc)) {
                    dDoc.setDescription(context, sDesc);
                    dFileDoc.setDescription(context, sDesc);
                }

                dFileDoc.createObject(context, DecConstants.TYPE_DOCUMENT, System.nanoTime() + "", "1", "Version", DecConstants.VAULT_ESERVICE_PRODUCTION);
                String sFileDocId = dFileDoc.getObjectId(context);
                dFileDoc.setAttributeValue(context, "Title", sFileName);
                dFileDoc.setAttributeValue(context, "Is Version Object", "True");

                connect(context, sNewDocId, sFileDocId, "Active Version", false, null);
                connect(context, sNewDocId, sFileDocId, "Latest Version", false, null);
                dDoc.checkinFile(context, true, true, "", DecConstants.FORMAT_GENERIC, sFileName, sFileDir);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sNewDocId;
    }

    /**
     * @param context
     * @param sDocId
     * @param sCheckinFile
     * @param sDesc
     * @return
     */
    public static void versionUpDocument(Context context, String sDocId, String sCheckinFile, String sDesc) {
        try {
            if (DecStringUtil.isNotEmpty(sDocId)) {
                String sLastVersionDocId = DecMatrixUtil.getInfo(context, sDocId, "from[Latest Version].to.id");
                if (DecStringUtil.isNotEmpty(sLastVersionDocId)) {
                    File fCheckinFile = new File(sCheckinFile);

                    String sVersionFileName = DecMatrixUtil.getInfo(context, sLastVersionDocId, DecConstants.SELECT_ATTRIBUTE_TITLE);
                    String sCheckinFileName = fCheckinFile.getName();

                    CommonDocument commonDocument = (CommonDocument) DomainObject.newInstance(context, CommonDocument.TYPE_DOCUMENTS);
                    commonDocument.setId(sDocId);

                    CommonDocument versionDoc = (CommonDocument) DomainObject.newInstance(context, CommonDocument.TYPE_DOCUMENTS);
                    versionDoc.setId(sLastVersionDocId);
                    versionDoc.lock(context);

                    String sNewFileDocId = commonDocument.reviseVersion(context, sVersionFileName, sCheckinFileName, null);
                    versionDoc.unlock(context);

                    commonDocument.checkinFile(context, true, true, "", DecConstants.FORMAT_GENERIC, sCheckinFileName, fCheckinFile.getParent());

                    if (DecStringUtil.isNotEmpty(sDesc)) {
                        versionDoc.setId(sNewFileDocId);

                        commonDocument.setDescription(context, sDesc);
                        versionDoc.setDescription(context, sDesc);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * @param context
     * @param sDocId
     */
    public static void deleteDocumentVersion(Context context, String sDocId) {
        try {
            if (DecStringUtil.isNotEmpty(sDocId)) {
                String sFileDocTitle = DecMatrixUtil.getInfo(context, sDocId, "from[Latest Version].to." + DecConstants.SELECT_ATTRIBUTE_TITLE);

                if (DecStringUtil.isNotEmpty(sFileDocTitle)) {
                    CommonDocument commonDocument = (CommonDocument) DomainObject.newInstance(context, CommonDocument.TYPE_DOCUMENTS);
                    commonDocument.setId(sDocId);
                    commonDocument.deleteVersion(context, sFileDocTitle, false);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * @param sClassName
     * @param sMethodName
     * @param sValue
     * @return
     * @throws Exception
     */
    public static String labelRounding(String sClassName, String sMethodName, String sValue) throws Exception {
        String sReturn = DecConstants.EMPTY_STRING;
        try {
            if (DecStringUtil.isNotEmpty(sValue) && DecStringUtil.isNumericStr(sValue, false)) {
                Class cClass = Class.forName("com.sam.nutrition." + sClassName);
                Object classObj = cClass.newInstance();
                Method m = cClass.getMethod(sMethodName, Double.class);
                sReturn = String.valueOf(m.invoke(classObj, Double.valueOf(sValue)));
            }
        } catch (NoSuchMethodException nsme) {
            return sValue;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sReturn;
    }

    public static String getHostCompanyName(Context context) {
        try {
            String HostCompanyID = Company.getHostCompany(context);
            Company HostCompany = new Company(HostCompanyID);
            HostCompany.open(context);
            String HostCompanyName = HostCompany.getName();

            return HostCompanyName;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }


    /**
     * @param context
     * @param user
     * @throws Exception
     */
//    public static void setInitialPersonSecurityContext(Context context, String user) throws Exception {
//        try {
//            if (DecStringUtil.isEmpty(user))
//                return;
//
//            StringList slSecurityContext = FrameworkUtil.splitString(getInfo(context, PersonUtil.getPersonObjectID(context, user), "from[Assigned Security Context].to.name", ujuDecConstants.RELATION_OBJECT_SPLITOR), ujuDecConstants.RELATION_OBJECT_SPLITOR);
//
//            SecurityContext secCtx = new SecurityContext();
//            for (ListIterator<String> itrSC = slSecurityContext.listIterator(); itrSC.hasNext(); ) {
//                String sSC = itrSC.next();
//                secCtx = SecurityContext.getSecurityContext(context, sSC);
//                secCtx.unassignGroups(context, StringList.create(user));
//            }
//            String sSCName = "";
//            String sHostCompanyName = getHostCompanyName(context);
//
//            // VPLMCreator
//            sSCName = "VPLMCreator." + sHostCompanyName + ".Default";
//            secCtx = SecurityContext.getSecurityContext(context, sSCName);
//            secCtx.assignPersons(context, StringList.create(user));
//
//            // ProjectLead
//            MqlUtil.mqlCommand(context, "mod person $1 assign role $2", true, user, SC_DEFAULT_ROLE);
//            sSCName = SC_DEFAULT_ROLE + "." + sHostCompanyName + "." + SC_DEFAULT_PJT;
//            secCtx = SecurityContext.getSecurityContext(context, sSCName);
//            secCtx.assignPersons(context, StringList.create(user));
//
//            setDefaultSecurityContext(context, user, sSCName);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

//    public static void setDefaultSecurityContext(Context context, String sUser, String sSCName) throws Exception {
//        try {
//            if (context == null)
//                return;
//
//            ContextUtil.pushContext(context, sUser, null, null);
//
//            PersonUtil.setDefaultSecurityContext(context, sSCName);
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            ContextUtil.popContext(context);
//        }
//    }

    /**
     * @param context
     * @param sUser
     * @return
     */
//    public static String getPersonName(Context context, String sUser) {
//        return getPersonName(context, sUser, null);
//    }

    /**
     * @param context
     * @param sUser
     * @param language
     * @return
     */
//    public static String getPersonName(Context context, String sUser, String language) {
//        String sName = ujuDecConstants.EMPTY_STRING;
//        try {
//            language = DecStringUtil.nullToStr(language, "ko");
//
//            if (language.equals("en")) {
//                sName = PersonUtil.getPersonObject(context, sUser).getInfo(context, "attribute[samEnglishName]");
//            }
//            if (DecStringUtil.isEmpty(sName) || language.equals("ko")) {
//                sName = PersonUtil.getFullName(context, sUser);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return sName;
//    }

    /**
     * @param context
     * @param sUser
     * @return
     */
//    public static String getDepartmentName(Context context, String sUser) {
//        return getDepartmentName(context, sUser, null);
//    }

    /**
     * @param context
     * @param sUser
     * @param language
     * @return
     */
//    public static String getDepartmentName(Context context, String sUser, String language) {
//        String sName = ujuDecConstants.EMPTY_STRING;
//        try {
//            language = DecStringUtil.nullToStr(language, "ko");
//            String sUserId = PersonUtil.getPersonObjectID(context, sUser);
//
//            if (language.equals("en")) {
//                sName = DecMatrixUtil.getInfo(context, sUserId, "to[Member|from.type=='Department'].from.attribute[samEnglishName]");
//            }
//
//            if (DecStringUtil.isEmpty(sName) || language.equals("ko")) {
//                sName = DecMatrixUtil.getInfo(context, sUserId, "to[Member|from.type=='Department'].from.attribute[Organization Name]");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return sName;
//    }

  

    /**
     * @param context
     * @param sUser
     * @return
     */
//    public static String getTeamLeaderByUser(Context context, String sUser) {
//        String sTeamLeader = ujuDecConstants.EMPTY_STRING;
//        try {
//            if (DecStringUtil.isEmpty(sUser))
//                return sTeamLeader;
//
//            String sDepartmentCode = getOrganizationInfo(context, sUser, ujuDecConstants.SELECT_NAME, ujuDecConstants.TYPE_DEPARTMENT);
//            sTeamLeader = getTeamLeader(context, sDepartmentCode);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return sTeamLeader;
//    }

    /**
     * @param context
     * @param sDeaprtmentCode
     * @return
     */
//    public static String getTeamLeader(Context context, String sDeaprtmentCode) {
//        String sTeamLeader = ujuDecConstants.EMPTY_STRING;
//        try {
//            if (DecStringUtil.isEmpty(sDeaprtmentCode))
//                return sTeamLeader;
//
//            String sDepartmentId = getObjectId(context, ujuDecConstants.TYPE_DEPARTMENT, sDeaprtmentCode, "-");
//            if (DecStringUtil.isNotEmpty(sDepartmentId)) {
//                sTeamLeader = FrameworkUtil.splitString(getInfo(context, sDepartmentId, "from[Member|to.attribute[samPosition]=='팀장' && to.current=='Active'].to.name"), "|").get(0);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return sTeamLeader;
//    }

    /**
     * @param context
     * @return
     */
//    public static String getAbsencePerson(Context context) {
//        return getAbsencePerson(context, context.getUser());
//    }

    /**
     * @param context
     * @param sUser
     * @return
     */
//    public static String getAbsencePerson(Context context, String sUser) {
//        String sPerson = "";
//        try {
//            DomainObject doObject = PersonUtil.getPersonObject(context, sUser);
//
//            StringList busSelects = new StringList();
//            busSelects.add("attribute[Absence Delegate]");
//            busSelects.add("attribute[Absence Start Date]");
//            busSelects.add("attribute[Absence End Date]");
//
//            Map mObject = doObject.getInfo(context, busSelects);
//
//            String sDelegate = (String) mObject.get("attribute[Absence Delegate]");
//            String sStartDate = (String) mObject.get("attribute[Absence Start Date]");
//            String sEndDate = (String) mObject.get("attribute[Absence End Date]");
//
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
//            if (DecStringUtil.isNotEmpty(sStartDate)) {
//                int startDate = Integer.valueOf(ujuDateUtil.changeDateFormat(sStartDate, sdf));
//                int today = Integer.valueOf(ujuDateUtil.changeDateFormat(Calendar.getInstance().getTime(), sdf));
//
//                if (startDate <= today) {
//                    if (DecStringUtil.isNotEmpty(sEndDate)) {
//                        int endDate = Integer.valueOf(ujuDateUtil.changeDateFormat(sEndDate, sdf));
//                        if (endDate >= today) {
//                            sPerson = sDelegate;
//                        }
//                    } else {
//                        sPerson = sDelegate;
//                    }
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return sPerson;
//    }

    //    public static boolean checkAbsenceUser(Context context, String sUser) {
//        boolean check = false;
//        try {
//            String sLoginUser = context.getUser();
//            String sAbsencePerson = getAbsencePerson(context, sUser);
//
//            if (DecStringUtil.isNotEmpty(sAbsencePerson)) {
//                if (sAbsencePerson.equals(sLoginUser)) {
//                    check = true;
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return check;
//    }
    
    public static enum SERVER_TYPE {
    	LOCAL
    	, DEV
    	, PROD
    }
    
    private static SERVER_TYPE _serverType;
    
    public static SERVER_TYPE getServerType() {
    	if ( _serverType == null )
    	{
    		String enoviaURL = getSystemINIVariable(null, "ENOVIA_URL").toUpperCase();
    		logger.debug("enoviaURL : " + enoviaURL);
    		if ( enoviaURL.startsWith("https://epcplatform.".toUpperCase()) )
			{
    			_serverType = SERVER_TYPE.PROD;
			}
			else if ( enoviaURL.startsWith("https://epcplatformdev.".toUpperCase()) ) 
			{
				_serverType = SERVER_TYPE.DEV;
			}
			else
			{
				_serverType = SERVER_TYPE.LOCAL;
			}
    	}
    	
    	logger.debug("_serverType : " + _serverType.name());
    	return _serverType;
    }
    
    public static String generateMQLCommand(String mqlStmt, String... args) throws Exception{
    	try {
			for (int k = args.length; k >= 1 ; k--)
			{
				mqlStmt = mqlStmt.replace("$" + k, "\"" + args[k - 1] + "\"");
			}
			return mqlStmt;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    }
    
    public static Map parseWebReport(Context context, String query, String... paramStr) throws Exception{
    	try {
    		String result = MqlUtil.mqlCommand(context, query, paramStr);
    		Map resultMap = new HashMap();
    		if ( StringUtils.isNotEmpty(result) )
    		{
    			StringList strResultList = FrameworkUtil.splitString(result,"Objects");
                StringList tokenList = new StringList();
                
                try ( BufferedReader in = new BufferedReader(new StringReader((String)strResultList.get(strResultList.size()-1))) ) {
                    String line;
                    while ((line = in.readLine()) != null)
                    {
                        tokenList = FrameworkUtil.split(line,"=");
                        if(tokenList.size()==2)
                        {
                            String key = (String)tokenList.get(0);
                            if(key==null || key.trim().length()<0)
                            {
                            	key="";
                            }
                            String value = (String)tokenList.get(1);
                            if(value==null || value.trim().length()<0)
                            {
                            	value="";
                            }
                            if ('|' == value.charAt(value.length() - 1))
                            {
                            	value = value.substring(0, value.length() - 1);
                            }
                            resultMap.put(key.trim(), value.trim());
                        }
                    }
                }
    		}
    		return resultMap;
    	} catch(Exception e) {
    		e.printStackTrace();
    		throw e;
    	}
    }
}