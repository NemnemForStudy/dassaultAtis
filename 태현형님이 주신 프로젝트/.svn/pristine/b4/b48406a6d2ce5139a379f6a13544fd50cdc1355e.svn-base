<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<script language="Javascript" src="../common/scripts/emxUICore.js"></script>
<%@page import = "com.matrixone.apps.effectivity.EffectivityFramework"%>
<%@page import = "com.matrixone.apps.domain.DomainConstants"%>
<%@page import = "com.matrixone.apps.domain.DomainObject"%>
<%@page import = "com.dassault_systemes.plm.config.entity.itf.IConfiguredEntity"%>
<%@page import = "com.dassault_systemes.plm.config.entity.itf.IConfiguredEntitiesFactory"%>
<%@page import = "com.dassault_systemes.plm.config.entity.itf.ConfiguredEntitiesFactory"%>
<%@page import = "com.dassault_systemes.vplm.config.nav.constants.ConfigurationConstants.Criteria"%>
<%@page import = "com.dassault_systemes.vplm.config.services.ConfigDictionaryServices.CriteriaTypes"%>
<%@page import = "com.matrixone.apps.modeler_services.TypeServices"%>
<%@page import = "com.matrixone.apps.domain.util.ContextUtil"%>

<%@page import="java.util.Map"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>

<%@page import="matrix.util.StringList"%>


<script language="Javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="Javascript" src="../common/scripts/emxUIUtility.js"></script>
<script language="Javascript" src="../common/scripts/emxUIPopups.js"></script>
<script language="Javascript" src="../common/scripts/emxUIModal.js"></script>
<script language="Javascript" src="../common/scripts/emxUITableUtil.js"></script>
<script language="Javascript" src="../common/scripts/emxUIFreezePane.js"></script>

<%! 
   public ArrayList<Criteria> getConfiguredEffectivityTypesList(Context context, String referenceType) throws Exception{ 
      // 
      // Get the list of instance types that can have enabled criteria
      StringList effectivityTypesList = new StringList();// unique list of effectivity types
      ArrayList<Criteria> criteriaList = new ArrayList<Criteria>();      
      List<String> listOfFilterableInstances = TypeServices.getListOfERFilterableInstanceTypesFromConfigurableReference( context, referenceType );
      System.out.println("referenceType: " + referenceType);
      Iterator<String> itInstTypes = listOfFilterableInstances.iterator();
      while( itInstTypes.hasNext())
      {
         String InstType = itInstTypes.next();
         String effectivityTypes = com.matrixone.apps.effectivity.ConfiguredEntity.getConfiguredEffectivityTypes( context, InstType, "relationship" );
         System.out.println("InstType: " + InstType + " effectivityTypes: " + effectivityTypes);
         if(!effectivityTypesList.contains(effectivityTypes) && !"".equals(effectivityTypes)) {
           System.out.println("Adding effectivityTypes: " + effectivityTypes);
           effectivityTypesList.add(effectivityTypes);
           if(effectivityTypes.equals("FeatureOption")){
             criteriaList.add( Criteria.FEATURES );            
           }else if(effectivityTypes.equals("ProductRevision")){
             criteriaList.add( Criteria.STATES );
           }else if(effectivityTypes.equals("ManufacturingPlan")){
             criteriaList.add( Criteria.MANUFACTURING_PLANS );
           }else if(effectivityTypes.equals("Units")){
             criteriaList.add( Criteria.UNITS );
           }else if(effectivityTypes.equals("Date")){
             criteriaList.add( Criteria.GLOBAL_DATE );
           }else if(effectivityTypes.equals("ContextualDate")){
             criteriaList.add( Criteria.CONTEXTUAL_DATE );
           }else if(effectivityTypes.equals("Milestone")){
             criteriaList.add( Criteria.MILESTONE );
           }
         }
      }
      return criteriaList;
      
   } 
%>

<%
	try
  {
	
  System.out.println("In ConfigurationContextAddExistingPostProcess.jsp");
	String strObjId = emxGetParameter(request, "objectId");
	String[] strTableRowIds    = emxGetParameterValues(request, "emxTableRowId");
	String strConfigCtxObjIds[]=null;
    strConfigCtxObjIds = new String[strTableRowIds.length];
    StringBuffer sbTableRowId = null;
    for (int i = 0; i < strTableRowIds.length; i++)      // for each table row
    {
    	StringTokenizer strTokenizer = new StringTokenizer(strTableRowIds[i] ,"|");
    	strConfigCtxObjIds[i]=strTokenizer.nextToken();
    }

  System.out.println("********************rootObjectId:" + strObjId);
  DomainObject rootProductObject = new DomainObject(strObjId);
  //String rootProductPID = rootProductObject.getInfo(context, "physicalid");
  StringList selectableList = new StringList("physicalid");
  selectableList.add("type");
  Map tempMap = (Map) rootProductObject.getInfo(context, selectableList);
  String rootProductPID = (String) tempMap.get("physicalid");
  String rootProductType = (String) tempMap.get("type");
  
  System.out.println("********************rootProductPID:" + rootProductPID);

  List<String> listOfConfigCtxModels = new ArrayList<String>();

  for (int i = 0; i < strConfigCtxObjIds.length; i++){
    System.out.println("********************context model id:" + strConfigCtxObjIds[i]); 
    listOfConfigCtxModels.add(strConfigCtxObjIds[i]);
  }
    
    
    //If the selection is empty given an alert to user
    if(strTableRowIds==null){
%>    
      
      <script language="javascript" type="text/javaScript">
          alert("<emxUtil:i18n localize='i18nId'>Effectivity.Alert.FullSearch.Selection</emxUtil:i18n>");
      </script>
    <%
    }
    //If the selection are made in Search results page then     
    else{
    	//StringList slConfigCtxObj= new StringList(strConfigCtxObjIds);
    	//EffectivityFramework.addConfigurationContext(context,slConfigCtxObj,strObjId);
    	ArrayList<Criteria> criteriaList = getConfiguredEffectivityTypesList(context, rootProductType);

      //Get the factory
      System.out.println("********************Creating Factory element:"); 
      IConfiguredEntitiesFactory factory = ConfiguredEntitiesFactory.getConfiguredEntitiesFactory(context);
      System.out.println("********************Creating ConfiguredEntity:"); 
      IConfiguredEntity rootConfigurable = factory.CreateConfiguredEntity(context, rootProductPID);
      System.out.println("********************attaching model:"); 
      ContextUtil.startTransaction(context,true);
      try{
          HashMap attachStatus = rootConfigurable.attachModels(context, listOfConfigCtxModels);
          System.out.println("********************attachStatus.size:" + attachStatus.size());
      }catch(Exception ex){
          ex.printStackTrace();
      }
      // Enable criterias
      try{
          System.out.println("********************Now enabling Criterias");
          HashMap enabledCriterias = rootConfigurable.enableCriterias(context, criteriaList);
          System.out.println("********************enabledCriterias.size:" + enabledCriterias.size());
      }catch(Exception ex){
          ex.printStackTrace();
      } 
      ContextUtil.commitTransaction(context);	 		   
   			
   			   
   		 
    }
    %>

    <script language="javascript" type="text/javaScript"> 
     //getTopWindow().getWindowOpener().location.href = getTopWindow().getWindowOpener().location.href;

 
if(typeof getTopWindow().SnN != 'undefined' && getTopWindow().SnN.FROM_SNN){

           findFrame(getTopWindow(),"CFFConfigurationContext").refreshSBTable();           
             //sbFrame.refreshSBTable();
	}else{
      var listFrame=window.parent.getTopWindow().getWindowOpener().parent;
     listFrame.editableTable.loadData();
     listFrame.rebuildView(); 
     parent.window.closeWindow();
}






    </script>
    <%     

    }catch(Exception ex)
    {
    	session.putValue("error.message", ex.getMessage());//XSSOK  // adding this statement for IR-713074-3DEXPERIENCER2019x
		%>
        <script language="javascript" type="text/javaScript">
         //alert("<%=ex.getMessage()%>");//XSSOK                 
        </script>
        <%    
    }
%>
<%@include file = "../common/emxNavigatorBottomErrorInclude.inc"%>    
