<html>

<%@include file = "emxNavigatorInclude.inc"%>
<%@include file = "emxNavigatorTopErrorInclude.inc"%>

<head> 
</head>
<%


try
{                                                              
	

    com.matrixone.apps.cache.CacheManager.getInstance().clearTenant(
            context,
            com.matrixone.apps.cache.CacheManager._entityNames.FORMS);
    com.matrixone.apps.cache.CacheManager.getInstance().clearTenant(
            context,
            com.matrixone.apps.cache.CacheManager._entityNames.MENUS);
    com.matrixone.apps.cache.CacheManager.getInstance().clearTenant(
            context,
            com.matrixone.apps.cache.CacheManager._entityNames.RMB_MENUS);
    com.matrixone.apps.cache.CacheManager.getInstance().clearTenant(
            context,
            com.matrixone.apps.cache.CacheManager._entityNames.COMMANDS);
    com.matrixone.apps.cache.CacheManager.getInstance().clearTenant(
            context,
            com.matrixone.apps.cache.CacheManager._entityNames.INQUIRIES);
    com.matrixone.apps.cache.CacheManager.getInstance().clearTenant(
            context,
            com.matrixone.apps.cache.CacheManager._entityNames.FORMS);
    com.matrixone.apps.cache.CacheManager.getInstance().clearTenant(
            context,
            com.matrixone.apps.cache.CacheManager._entityNames.TABLES);
    com.matrixone.apps.cache.CacheManager.getInstance().clearTenant(
            context,
            com.matrixone.apps.cache.CacheManager._entityNames.PORTALS);
    com.matrixone.apps.cache.CacheManager.getInstance().clearTenant(
            context,
            com.matrixone.apps.cache.CacheManager._entityNames.CHANNELS);
    
} catch (Exception ex) {
%>

<script>

alert("Error");
</script>
<%   
} 
 
%>

<script>

alert("UI Cache has been reloaded");
</script>
<body>
<%@include file = "emxNavigatorBottomErrorInclude.inc"%>
</body>
</html>

