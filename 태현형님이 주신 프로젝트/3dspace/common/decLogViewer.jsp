<%@page import="com.dec.util.decListUtil"%>
<%@ page import="java.io.File" %>
<%@ page import="matrix.util.StringList" %>
<%@ page import="com.matrixone.apps.domain.util.MapList" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.ListIterator" %>
<%@ page import="com.matrixone.apps.domain.util.FrameworkUtil" %>
<%@ page import="java.util.Base64" %>
<%@page contentType="text/html; charset=UTF-8" %>

<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>
<script type="text/javascript" src="../common/scripts/emxUIConstants.js"></script>
<script type="text/javascript" src="../common/scripts/emxUICore.js"></script>
<script type="text/javascript" src="../common/scripts/emxUIModal.js"></script>
<script type="text/javascript" src="../common/scripts/emxUIPopups.js"></script>
<script type="text/javascript" src="../common/scripts/emxTypeAhead.js"></script>
<script type="text/javascript" src="../common/scripts/emxQuery.js"></script>
<style>
    body {
        -ms-overflow-style: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }

</style>
<script type="text/javascript">
    addStyleSheet("emxUIDefault");
    addStyleSheet("emxUIForm");
</script>
<%!
    public static String encode(String sValue) throws Exception {
        byte[] targetBytes = sValue.getBytes("UTF-8");
        Base64.Encoder encoder = Base64.getEncoder();
        byte[] encodedBytes = encoder.encode(targetBytes);
        return new String(encodedBytes);
    }

    public static boolean fileNameCheck(StringList viewLogPrefix, String sFileName) {
        for (String sPrefix : viewLogPrefix) {
            if (sFileName.contains(sPrefix))
                return true;
        }
        return false;
    }
%>
<%
    String sServerPath = FrameworkUtil.findAndReplace(pageContext.getServletContext().getRealPath("/"), "\\", "/");
	sServerPath = FrameworkUtil.findAndReplace(sServerPath, "Build/Jenkins/checkout/3dspace/3dspace/", "R2023x/3DSpace/win_b64/code/tomee/webapps/3dspace/");
    StringList logDir = new StringList();
    logDir.add(FrameworkUtil.findAndReplace(sServerPath, "win_b64/code/tomee/webapps/3dspace", "") + "logs");
//     logDir.add("C:\\3ds\\3dspace\\logs");
    logDir.add(FrameworkUtil.findAndReplace(sServerPath, "webapps/3dspace", "") + "logs");

    StringList viewLogPrefix = new StringList();
    viewLogPrefix.add("3dspacetomee_r2023x-stderr");
    viewLogPrefix.add("3dspacetomee_r2023x-stdout");
//     viewLogPrefix.add("3dspace-stdout.");
//     viewLogPrefix.add("3dspace-stderr.");
    viewLogPrefix.add("localhost.");
    viewLogPrefix.add("mxtrace.");

    MapList logFileList = new MapList();
    MapList lastLogFile = new MapList();

    Map logMap = null;
    for (String sLogDir : logDir) {
        File[] files = new File(sLogDir).listFiles();
        if (files != null) {
            for (File f : files) {
                String sFileName = f.getName();
                if (fileNameCheck(viewLogPrefix, sFileName)) {
                    logMap = new HashMap();
                    logMap.put("fileName", sFileName);
                    logMap.put("fielPath", encode(sLogDir + "\\" + sFileName));
                    logFileList.add(logMap);
                }
            }
        }
    }

    logFileList.sort("fileName", "descending", "string");

    for (String sPrefix : viewLogPrefix) {
        MapList equalsList = decListUtil.getContainsValueObjectsOfMapList(logFileList, "fileName", sPrefix, false, 1);
        if (equalsList != null && equalsList.size() > 0) {
            lastLogFile.add(equalsList.get(0));
        }
    }
%>
<script>
    $(getTopWindow()).resize(function () {
        onResize();
    });
</script>
<html>
<body id="content" style="overflow:hidden;">
<table>
    <tr>
        <td class="label">로그 타입</td>
        <td class="field">
            <select id="selectType" onchange="fn_change(this.value);">
                <option value="last">최신</option>
                <option value="all">전체</option>
            </select>
            <select id="logpath">
                <%
                    for (ListIterator<Map> itr = logFileList.listIterator(); itr.hasNext(); ) {
                        logMap = itr.next();
                        String sFileName = (String) logMap.get("fileName");
                        String sFilePath = (String) logMap.get("fielPath");
                %>
                <option class="all" style="display: none" value="<%=sFilePath%>"><%=sFileName%>
                </option>
                <%
                    }
                %>

                <%
                    for (ListIterator<Map> itr = lastLogFile.listIterator(); itr.hasNext(); ) {
                        logMap = itr.next();
                        String sFileName = (String) logMap.get("fileName");
                        String sFilePath = (String) logMap.get("fielPath");
                %>
                <option class="last" value="<%=sFilePath%>"><%=sFileName%>
                </option>
                <%
                    }
                %>
            </select>
        </td>
    </tr>

    <tr>
        <td class="label">Line Count</td>
        <td class="field">
            <input type="text" id="linecnt" value="500"/>
            &nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="Print" value="Print" onclick="printlog();"/>
        </td>
    </tr>
</table>

<iframe id="logframe" name="logframe" style="border: 0;"></iframe>
<script>
    function onResize() {
        $("#logframe").css("height", window.innerHeight - 120);
    }

    function printlog() {
        var logpath = $("#logpath").val();
        var linecnt = $("#linecnt").val();
        $("#logframe").prop("src", "decLogViewerDetail.jsp?logpath=" + logpath + "&linecnt=" + linecnt);
    }

    function fn_change(val) {
        $("#logpath option").each(function () {
            $(this).css("display", "none");
        });

        $.each($("." + val), function (index, obj) {
            $(obj).css("display", "");
        });
    }

    onResize();
</script>
</body>
</html>
