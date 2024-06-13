<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/emxUIConstantsInclude.inc"%>

<%@page import="com.matrixone.apps.domain.util.ContextUtil"%>
<%@page import="com.matrixone.apps.domain.util.MqlUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="matrix.db.BusinessObject"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import = "com.matrixone.apps.domain.DomainConstants"%>
<%@page import = "com.matrixone.apps.framework.ui.UINavigatorUtil"%>
<%@page import = "com.dassault_systemes.enovia.changeaction.interfaces.IProposedChanges"%>
<%@page import = "com.dassault_systemes.enovia.changeaction.interfaces.IProposedActivity"%>
<%@page import = "com.dassault_systemes.enovia.changeaction.interfaces.IChangeAction"%>
<%@page import = "com.dassault_systemes.enovia.enterprisechangemgt.util.ChangeUtil"%>
<%@page import = "com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>

<jsp:useBean id="changeUXUtil" class="com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeUXUtil" scope="session"/>
<jsp:useBean id="changeActionObj" class="com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeAction" scope="session"/>


<%
  out.clear();
  
  String strContextID;
  String strObjectType;
  String functionality;
  String caId;
  String fieldNameActual;
  String fieldNameDisplay;
  String icon;
  String relId;
  String objectId;
  String forUpdate = "";
  String forNone = "";
  String resolutionItemNotAllowed = "";
  try
  {
    functionality = emxGetParameter(request,"functionality");
    String stringResFileId = "emxEnterpriseChangeMgtStringResource";
    if("switchToHigherRevisionOK".equalsIgnoreCase(functionality)){
      Map mpInvalidObjects = null;
      String strErrorMSG = null;

      caId = emxGetParameter(request,"caId");
      String oldObj = emxGetParameter(request,"oldObj");
      oldObj = oldObj.replace("pid:", "");
      String newObj = emxGetParameter(request,"newObj");
      newObj = newObj.replace("pid:", "");
      relId = emxGetParameter(request, "relId");

      System.out.println("caId " + caId + " oldObj " + oldObj + " newObj " + newObj + " relId " + relId);
      changeActionObj.setId(caId);

      StringList newItemsList = new  StringList(newObj);
      StringList oldItemsList = new  StringList(oldObj);
      StringList relIdList = new  StringList(relId);
      String proposedReason = "";
      
      try{
      
        //1) get old item details
          IChangeAction iCa = changeActionObj.getChangeAction(context, caId);
          List<IProposedChanges> proposedChangeList=iCa.getProposedChanges(context);
          Iterator proposedChangeItr =proposedChangeList.iterator();
          while(proposedChangeItr.hasNext())
          {
            IProposedChanges ProposedChange=(IProposedChanges) proposedChangeItr.next();
            BusinessObject whereObject=ProposedChange.getWhere();
            if(oldObj.equals(whereObject.getObjectId())){
              StringList selectable = new StringList();
              selectable.add(DomainObject.SELECT_ID);
              DomainObject domainwhereObj = new DomainObject(whereObject.getName());
              Map MapObjectInfo = domainwhereObj.getInfo(context, selectable);
              String proposedId = (String)MapObjectInfo.get(DomainObject.SELECT_ID);

              proposedReason = changeActionObj.getReasonForChangeFromChangeAction(context,proposedId,caId);
             
            }
          }
        ContextUtil.startTransaction(context,true);
        //2) Disconnect old item
        changeActionObj.disconnectAffectedItems(context,relIdList);
        //3) Connect new item
        mpInvalidObjects = changeActionObj.connectAffectedItems(context, newItemsList);
        strErrorMSG = (String)mpInvalidObjects.get("strErrorMSG");
        
        //4) set old item details to new item
        boolean isReasonForChangeEmpty = ChangeUtil.isNullOrEmpty(proposedReason);        
        if(!isReasonForChangeEmpty){
          iCa = changeActionObj.getChangeAction(context, caId);
          proposedChangeList=iCa.getProposedChanges(context);
          for (IProposedChanges ProposedChange : proposedChangeList) {
            BusinessObject whereObject=ProposedChange.getWhere();
            if(newObj.equals(whereObject.getObjectId())){
              
              List<IProposedActivity> activities = ProposedChange.getActivites();

              for (IProposedActivity activity : activities) {
                activity.SetWhyComment(context, proposedReason);
              }
              ProposedChange.SetWhyComment(context, proposedReason);
              
            }
          }
        }
      ContextUtil.commitTransaction(context);
      }
      catch (Exception e){
        ContextUtil.abortTransaction(context);
        session.putValue("error.message",e.getMessage());
      }
      finally
      { 
        //5) alert error if any
        if(!ChangeUtil.isNullOrEmpty(strErrorMSG)){
          %>
          <script language="JavaScript">
          alert("<%=strErrorMSG%>");
          </script>
          <%
        }
        //6) refresh parent table and close popup
        %>
        <script language="JavaScript">
          debugger;
          window.opener.location.href = window.opener.location.href;
          window.close();
        </script>
        <%
      }
    }
    else{

    String rowDetails = emxGetParameter(request, "fieldValues");
    if(functionality.equals("resolutionItemRevisionPopup") && rowDetails!=null)
    {
      forUpdate = EnoviaResourceBundle.getRangeI18NString(context, DomainConstants.ATTRIBUTE_REQUESTED_CHANGE, "For_Update", context.getSession().getLanguage());
      
      forNone = EnoviaResourceBundle.getRangeI18NString(context, DomainConstants.ATTRIBUTE_REQUESTED_CHANGE, "None", context.getSession().getLanguage());

      resolutionItemNotAllowed =  EnoviaResourceBundle.getProperty(context, stringResFileId, context.getLocale(),"EnterpriseChangeMgt.Alert.ResolutionItemCannotBeAddedForRequestedChange");
      
    }

    fieldNameActual  = emxGetParameter(request,"fieldNameActual");
    fieldNameDisplay = emxGetParameter(request,"fieldNameDisplay");
   
    objectId = emxGetParameter(request,"objectId");
    DomainObject rootDom = new DomainObject(objectId);
    strContextID = rootDom.getInfo(context, "physicalid");
    strContextID = "pid:" + strContextID;
    strObjectType = rootDom.getInfo(context, "type");
    icon = UINavigatorUtil.getTypeIconProperty(context, strObjectType);
    
    caId = emxGetParameter(request, "parentOID");
    relId = emxGetParameter(request, "relId");

    //if relid is null, take last relid from the request
    if(relId == null || relId.equals("null"))
    {
      String[] relIds = emxGetParameterValues(request, "relId");
      relId= relIds[relIds.length - 1];
    }

    String strNoSelectionErrorMsg =  EnoviaResourceBundle.getProperty(context, stringResFileId, context.getLocale(),"EnterpriseChangeMgt.Alert.NoObjectSelected");
  
%>
<html>
<head>
<script type="text/javascript" src="../webapps/AmdLoader/AmdLoader.js"></script>
<link rel="stylesheet" type="text/css" href="../webapps/c/UWA/assets/css/standalone.css" />
<script type="text/javascript" src="../webapps/c/UWA/js/UWA_Standalone_Alone.js"></script>
<script type="text/javascript" src="../webapps/WebappsUtils/WebappsUtils.js"></script>
<script type="text/javascript" src="../webapps/UIKIT/UIKIT.js"></script>
<script language="Javascript" src="../common/scripts/emxUIModal.js"></script>
<script type="text/javascript" src="../webapps/PlatformAPI/PlatformAPI.js"></script>
<script type="text/javascript" src="../webapps/ENOXVersionExplorerController/ENOXVersionExplorerController.js"></script>
<script type="text/javascript" src="../webapps/ENOXVersionExplorerUtils/ENOXVersionExplorerUtils.js"></script>
<style type="text/css">
    .tile-title{
        font-size: 15px;
        font-family: '3dsregular' tahoma,serif;
        color: #368ec4;
    }
    .module{
        width:100%;
        height:100%;
        margin: 0;
        border: none;
    }
    .moduleWrapper {
        zoom: 1;
        height:100%;
    }
    .moduleContent {
        height:100%;
    }
    .module > .moduleHeader {
        display: none;
    }
    .moduleFooter {
        display: none;
    }
    .floatingPanel_RightButtons{
        display: none;
    }
    .version-explorer-modal{
      width:100% !important;
      height:100% !important;
      max-width:100% !important;
      max-height:100% !important;
    }
</style>
<script>
  function launchRevisionExplorerForSolutionItems()
  {
    console.log("inside script");          
    require([
            'DS/LifecycleServices/LifecycleServicesSettings',
            'DS/ENOXVersionExplorerController/VersionExplorerController',
            'DS/ENOXVersionExplorerUtils/VersionExplorerEnums',
            'DS/ENOXVersionExplorerUtils/VersionExplorerSettings',
            'DS/ENOChgServices/scripts/services/ChgInfraService',
            'DS/ENOChgServices/scripts/services/ChgServiceGlobalVariable',
            'DS/PlatformAPI/PlatformAPI',
          ],
    function(LifecycleServicesSettings, VersionExplorerController, VersionExplorerEnums, VersionExplorerSettings,ChgInfraService, ChgServiceGlobalVariable, PlatformAPI){
      ChgInfraService.init();
       WidgetUwaUtils.setupEnoviaServer();
            window.enoviaServer.widgetName = "ChangeActionManagement";
            window.enoviaServer.widgetId = window.widget.id;
            var curTenant = "";
                <%
                    if(!FrameworkUtil.isOnPremise(context)){
                %>
                    curTenant = "<%=XSSUtil.encodeForJavaScript(context, context.getTenant())%>";
                <%
                    }
                %>
             if(!curTenant){
                curTenant = 'OnPremise';
             }
             window.enoviaServer.tenant = curTenant;
         
         var e6wUrl = widget.getUrl(),
                 runYourApp = widget.getUrl().match(/[?&]runYourApp=([^&]*)?/), //override myapps url.
                 myAppsUrl = PlatformAPI.getApplicationConfiguration('app.urls.myapps'),
                 proxy = (window.UWA.Data.proxies["passport"] ? "passport" : "ajax"), 
                 e6wUrl = e6wUrl.substring(0, e6wUrl.indexOf('/enterprisechangemgt'));
                 if (!myAppsUrl || runYourApp) {
                    var myAppsUrl = e6wUrl;
                 }
                 
      window.enoviaServerCAWidget = {
                    sRealURL: e6wUrl,
                    storageUrl: myAppsUrl,
          baseURL: "",
                    myRole: "",
                    proxy: "passport",
                    _getUrl: function() {
                        this.baseURL = this.sRealURL ||  this.storageUrl;
            return this.baseURL;
                    },
                    computeUrl: function (relativeURL) {
                        return this._getUrl() + relativeURL;
                    },
                    getSecurityContext: function () {
                        return this.mySecurityContext;
                    },
                    getRole: function () {
                        return this.myRole;
                    },
                    is3DSpace: true,
                    wsCallTimeout: 30000,
                    mySecurityContext: "",
                    UXPref : "New",
                    arrOid: [],
                    InterCom: UWA.Utils.InterCom,
                    compassSocket: null,
                    prefIntercomServer: null,
                    compassSocketName: "",
                    prefSocketName: "",
                    collabspace: "",
                    tenant:curTenant,
          NamePref: "Title"
                 };

      var that = this;
      var caGlobalObject = ChgServiceGlobalVariable.getGlobalVariable();

      var userId = "<%=XSSUtil.encodeForJavaScript(context, context.getUser())%>";
      var language = "<%=XSSUtil.encodeForJavaScript(context, context.getSession().getLanguage())%>";

      var currentTop = window.opener.getTopWindow();
      while (currentTop && currentTop.x3DPlatformServices == undefined) {
        if (currentTop.getWindowOpener().getTopWindow()) currentTop = currentTop.getWindowOpener().getTopWindow();
      }
            
      caGlobalObject.compassWindow = currentTop;
           
      var myAppBaseURL=""; 
      var my3DSpaceURL="";
      if (currentTop && currentTop.x3DPlatformServices) {
        for(var tenantCounter=0 ; tenantCounter < currentTop.x3DPlatformServices.length ; tenantCounter++){
          var tenantDetails = currentTop.x3DPlatformServices[tenantCounter];
          if(tenantDetails && tenantDetails.platformId == curTenant){
            myAppBaseURL = tenantDetails["3DCompass"];
            my3DSpaceURL = tenantDetails["3DSpace"];
            break;
          }
        }
        //myAppBaseURL = currentTop.x3DPlatformServices[0]['3DCompass'];
      }

caGlobalObject.tenant = curTenant;
      var config = {
        myAppsBaseUrl: myAppBaseURL,
        userId: userId,
        lang: language
      };

      var selectedObjectId = "<%=XSSUtil.encodeForJavaScript(context,strContextID)%>";
      var selectedObjectType = "<%=XSSUtil.encodeForJavaScript(context,strObjectType)%>";
      var functionality = "<%=XSSUtil.encodeForJavaScript(context,functionality)%>";
      var caId = "<%=XSSUtil.encodeForJavaScript(context,caId)%>";
      var relId = "<%=XSSUtil.encodeForJavaScript(context,relId)%>";
      var objPhyId = "<%=XSSUtil.encodeForJavaScript(context,objectId)%>";
      var forUpdate = "<%=XSSUtil.encodeForJavaScript(context,forUpdate)%>";
      var forNone = "<%=XSSUtil.encodeForJavaScript(context,forNone)%>";

      if(functionality==="resolutionItemRevisionPopup"){
        var openerFrame = window.opener.findFrame(window.opener.getTopWindow(), "ECM3DAffectedItemsCA");

        //var contentFrame   = window.opener.findFrame(window.opener.getTopWindow(),"listHidden");
        var colIndex = openerFrame.colMap.columns["Requested Change"].index;

        var requestedChangeValue = openerFrame.emxUICore.selectSingleNode(openerFrame.oXML.documentElement, "/mxRoot/rows//r[@o ='" + objPhyId + "']/c["+colIndex+"][@a]/text()");

        if(!(requestedChangeValue.textContent===forUpdate || requestedChangeValue.textContent===forNone)){
          alert("<%=XSSUtil.encodeForJavaScript(context, resolutionItemNotAllowed)%>");
          window.close();
        }
      }
      
      

ChgInfraService.populate3DSpaceURL(config).
                        then(function(success){
      ChgInfraService.populateSecurityContext()
                    .then(function (securityContextDetails){
      
      var externalSettings = [];
      externalSettings = [{'3DSpace': my3DSpaceURL, 'platformId': caGlobalObject.tenant}];
      
      LifecycleServicesSettings.app_initialization(function(){
        that._versionExplorerContainer = UWA.createElement('div', {
          styles: {
            height: '100%',
            width: '100%'
          }
        });

        that.versionExplorer = new VersionExplorerController({
          versionGraphContainer: that._versionExplorerContainer,
          selectionMode: VersionExplorerEnums.SELECTION_MODES.SINGLE_SELECT_ONLY,
          autoUpdate: true,
          showToolbar: false,
          displayMode: VersionExplorerEnums.DISPLAY_MODES.SUBWAY_VIEW,
          widget : window.widget
        });

        var options = {};
        options.displayMode = VersionExplorerEnums.DISPLAY_MODES.SUBWAY_VIEW;

        VersionExplorerSettings.loadUserSettingsPromise(options).then(function () {
          that.versionExplorer.publishEvent('ENOXVersionExplorerLoadVersionModel', {
            id: selectedObjectId,
            tenantId: curTenant,
            type: selectedObjectType, //"VPMReference",
            securityContext: enoviaServerCAWidget.getSecurityContext().replace("ctx::", ''),
            dataModelType: VersionExplorerEnums.DATA_MODEL_TYPES.MODEL_ER
          });
          that.versionExplorer.subscribeEvent('ENOXVersionExplorerModalOK', function(args){
            var objIds = [];
            var objInfos = [];
            var arrData =  args;
            if(arrData && Array.isArray(arrData)){
              for(var idx in arrData){
                var selectdObj = arrData[idx];
                if(selectdObj && selectdObj._options && selectdObj._options.data){
                  var objData = selectdObj._options.data;
                  var id = objData.id;
                  objIds.push("pid:" + id);
                  objInfos.push(objData);
                }
              }
            }
            if(objIds.length > 0) {
              
              if("higherRevisionPopup"==functionality){
                
                document.switchToHigherRevisionOK.action="ECMRevisionExplorer.jsp?caId="+caId+"&oldObj="+selectedObjectId+"&newObj="+objIds[0]+"&relId="+relId+"&functionality=switchToHigherRevisionOK";
                document.switchToHigherRevisionOK.submit();

              }
              else if("resolutionItemRevisionPopup"==functionality){
                //Add Resolution item in the field
                //XSSOK
                
                var tmpFieldNameActual = "<%=XSSUtil.encodeForJavaScript(context,fieldNameActual)%>";
                //XSSOK
                var tmpFieldNameDisplay = "<%=XSSUtil.encodeForJavaScript(context,fieldNameDisplay)%>";

                var icon = "<%=icon%>";

                var vfieldNameActual = window.opener.document.forms[0][tmpFieldNameActual];

                var vfieldNameDisplay = window.opener.document.forms[0][tmpFieldNameDisplay];

                vfieldNameDisplay.value = objInfos[0].name + " " + objInfos[0].revision;
                
                vfieldNameActual.value = objInfos[0].id;

                if(window.location.href.indexOf("targetLocation=popup")>-1){
                  window.close();
                } 
              }

              
            }
              else {
                alert("<%=strNoSelectionErrorMsg%>");
                launchRevisionExplorerForSolutionItems();
              }
                   
          });
          that.versionExplorer.subscribeEvent('ENOXVersionExplorerModalCancel', function(){
            if(window.location.href.indexOf("targetLocation=popup")>-1){
              window.close();
            }
          });
        });

        that.versionExplorer.showDialog({clientX: 0, clientY: 0}, widget.body, true);

      },externalSettings);

      
      });

    });
    });
  }
  

</script>
</head>
<body onLoad = "launchRevisionExplorerForSolutionItems();" style="overflow:hidden;">
  <form name=switchToHigherRevisionOK id=switchToHigherRevisionOK method="post">
    <input type="hidden" id="candidateItemList" name="candidateItemList" value="" />
  </form>
</body>
</html> 
<%
  }//end of else block
}//en of top try block
catch(Exception e)
{
  e.printStackTrace();
  session.putValue("error.message", e.getMessage());
}// End of main Try-catck block
%>
