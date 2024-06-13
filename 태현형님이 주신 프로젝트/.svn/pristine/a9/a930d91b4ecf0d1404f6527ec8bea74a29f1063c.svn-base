import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.Vector;

import com.dassault_systemes.vplm.config.appservices.interfaces.ConfigTrace;
import com.dassault_systemes.platform.model.itf.nav.INavBusConnection;
import com.dassault_systemes.platform.model.itf.nav.INavBusProvider;
import com.dassault_systemes.platform.model.services.NavigationServicesProvider;
import com.dassault_systemes.plm.config.entity.itf.ConfiguredEntitiesFactory;
import com.dassault_systemes.plm.config.entity.itf.IConfiguredEntitiesFactory;
import com.dassault_systemes.plm.config.entity.itf.IConfiguredEntity;
import com.dassault_systemes.plm.config.expression.itf.EnumTypeExpr;
import com.dassault_systemes.plm.config.expression.itf.IFilterableExpression;
import com.dassault_systemes.vplm.config.appservices.interfaces.IConfigExpressionServices.CfgDomain;
import com.dassault_systemes.vplm.config.appservices.interfaces.IConfigExpressionServices.CfgExpressionDomain;
import com.dassault_systemes.vplm.config.appservices.interfaces.IConfigExpressionServices.CfgExpressionView;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkProperties;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.effectivity.EffectivityFramework;
import com.matrixone.apps.factory.ConfigFilterablesFactory;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.interfaces.IConfigFilterablesFactory;
import com.matrixone.apps.modeler_integration.IConfigNavFilterable;
import com.matrixone.apps.modeler_integration.IConfigNavListOfFilterables;
import com.matrixone.jdom.Document;
import com.matrixone.jdom.Element;
import com.matrixone.jdom.JDOMException;
import com.matrixone.jdom.Namespace;
import com.matrixone.jdom.input.SAXBuilder;
import com.matrixone.json.JSONObject;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.Relationship;
import matrix.db.RelationshipWithSelect;
import matrix.util.StringList;

import com.dassault_systemes.vplm.config.appservices.interfaces.ConfigServicesToolbox;
import com.dassault_systemes.vplm.config.appservices.interfaces.IConfigDecouplingActivation; 

// emxEffectivityFrameworkBase.java
//
// Created on Sep 4, 2009
//
// Copyright (c) 1992,2015 Dassault Systemes.
// All Rights Reserved
// This program contains proprietary and trade secret information of
// Dassault Systemes. Copyright notice is precautionary only and does
// not evidence any actual or intended publication of such program.
//

/**
 * @author dmcelhinney
 *
 * The <code>emxEffectivityFrameworkBase</code> class/interface contains...
 *
 * @version CFF R209 - Copyright (c) 1992,2015 Dassault Systemes.
 */
public class emxEffectivityFrameworkBase_mxJPO {
	public static final String ATTRIBUTE_MILESTONE_DATE 		= PropertyUtil.getSchemaProperty("attribute_MilestoneDate");
	public static final String SELECT_ATTRIBUTE_MILESTONE_DATE =  "attribute["+ATTRIBUTE_MILESTONE_DATE+"]";

    /**
     * @param context
     * @param args
     * @throws Exception
     */
    public emxEffectivityFrameworkBase_mxJPO(Context context, String[] args)
	    throws Exception {
    	super();
    }
    
    public static boolean isDecoupleEnable(Context context) throws FrameworkException {

		boolean bDecouplingEnabled = false;
		try {
			IConfigDecouplingActivation iCfgParam = ConfigServicesToolbox.getDecouplingParam();
			bDecouplingEnabled = iCfgParam.isDecouplingActivated( context );
		} catch (Exception e) {
			bDecouplingEnabled = false;
		}
		return bDecouplingEnabled;
	}
    
    public static boolean isDecoupleEnable(Context context, String[] args) throws FrameworkException {

		return true;
	}
    
    public boolean disableAddConfigurationContext(Context context, String[] args) throws Exception	{
        boolean disableAddCC = true;
    	try {
    		HashMap programMap = (HashMap) JPO.unpackArgs(args);
    		String objectId = (String) programMap.get("objectId");                             
            DomainObject domObj = DomainObject.newInstance(context, objectId);
           	String strState = domObj.getInfo(context, DomainConstants.SELECT_CURRENT);
           	String  TYPE_PRODUCTS = PropertyUtil.getSchemaProperty(context, "type_Products");
       		String  TYPE_CONFIGFEATURES = PropertyUtil.getSchemaProperty(context, "type_ConfigurationFeature");
       		if(domObj.isKindOf(context, TYPE_PRODUCTS)){
       			// TODO - Need to revisit the below code 
       			if ("Release".equalsIgnoreCase(strState) || "Obsolete".equalsIgnoreCase(strState) || "Review".equalsIgnoreCase(strState)) { 
       				disableAddCC = false;
       			}
       		}  
       		else if(domObj.isKindOf(context, TYPE_CONFIGFEATURES)){
       			// TODO - Need to revisit the below code 
       			if ("Release".equalsIgnoreCase(strState) || "Obsolete".equalsIgnoreCase(strState) || "Review".equalsIgnoreCase(strState)) { 
       				disableAddCC = false;
       			}
       		}
/*       		else {
       			disableAddCC = true;
       		}*/
    	}
    	catch(Exception e) {
    		e.printStackTrace();
    	}
    	return disableAddCC;
    	//return true;
    }
    
    public boolean disableRemoveConfigurationContext(Context context, String[] args) throws Exception{
    	boolean disableRemoveCC = true;
    	try {
    		HashMap programMap = (HashMap) JPO.unpackArgs(args);
    		String objectId = (String) programMap.get("objectId");                             
            DomainObject domObj = DomainObject.newInstance(context, objectId);
           	String strState = domObj.getInfo(context, DomainConstants.SELECT_CURRENT);
           	String  TYPE_PRODUCTS = PropertyUtil.getSchemaProperty(context, "type_Products");
           	String  TYPE_CONFIGFEATURES = PropertyUtil.getSchemaProperty(context, "type_ConfigurationFeature");
       		if(domObj.isKindOf(context, TYPE_PRODUCTS)){
       			// TODO - Need to revisit the below code 
       			if ("Release".equalsIgnoreCase(strState) || "Obsolete".equalsIgnoreCase(strState) || "Review".equalsIgnoreCase(strState)) { 
       				disableRemoveCC = false;
       			}
       		}else if(domObj.isKindOf(context, TYPE_CONFIGFEATURES)){
       			// TODO - Need to revisit the below code 
       			if ("Obsolete".equalsIgnoreCase(strState)) { 
       				disableRemoveCC = false;
       			}
       		}  
    	}
    	catch(Exception e) {
    		e.printStackTrace();
    	}
    	return disableRemoveCC;
    }
    

    /**
     * Updates the effectivity expression for an object.
     * Called as the update method for the Edit form.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values- objectId, New Value
     * @return Object - boolean true if the operation is successful
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public Object updateObjectExpression(Context context,
	    String[] args)
        throws Exception
    {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
	String newExpression = (String)paramMap.get("New OID"); //hidden formated expression


	EffectivityFramework ef = new EffectivityFramework ();
	return ef.updateObjectExpression(context, args);
    }
    
    //*******************************Access Programs for decoupling Effectivity columns *********************
    /**
     * This Function is used for Showing the legacy CFF column on structure browser
     * 
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public boolean showNonDecoupledColumns(Context context, String[] args) throws Exception
    {
	       boolean showColumn = false;
    	   
	       try{
	           if(!isDecoupleEnable(context)){
	               showColumn = true;
	           }

	       }catch(Exception ex){
	            ex.printStackTrace();
	       }
	    return showColumn;
    }
    
    public boolean showVariantColumn(Context context, String[] args) throws Exception
    {
	       boolean showColumn = false;	    
	       try{
	    	   

		       HashMap arguMap = (HashMap) JPO.unpackArgs(args);
		       String effectivityDiscipline = (String)arguMap.get("effType");
	           if(( effectivityDiscipline != null && (effectivityDiscipline.equalsIgnoreCase("varianteff")|| effectivityDiscipline.equalsIgnoreCase("variantevolutioneff")) && (isDecoupleEnable(context)))){
	               showColumn = true;
	           }

	       }catch(Exception ex){
	            ex.printStackTrace();
	       }
	    return showColumn;
    }
    
    public boolean showDecoupledColumnForProposedCurrent(Context context, String[] args) throws Exception
    {
	       boolean showColumn = false;	    
	       try{
	           if(isDecoupleEnable(context)){
	               showColumn = true;
	           }

	       }catch(Exception ex){
	            ex.printStackTrace();
	       }
	    return showColumn;
    }
    
    
    public boolean showEvolutionColumn(Context context, String[] args) throws Exception
    {
	       boolean showColumn = false;	       
	       try{
	    			   
		       HashMap arguMap = (HashMap) JPO.unpackArgs(args);
		       String effectivityDiscipline = (String)arguMap.get("effType");
	           if((effectivityDiscipline != null  && (effectivityDiscipline.equalsIgnoreCase("evolutioneff")|| effectivityDiscipline.equalsIgnoreCase("variantevolutioneff")) && (isDecoupleEnable(context)))){
	               showColumn = true;
	           }
	       }catch(Exception ex){
	            ex.printStackTrace();
	       }
	    return showColumn;
    }  
    
    public boolean showLegacyEffectivityColumn(Context context, String[] args) throws Exception
    {
	       boolean showColumn = false;	       
	       try{
			   String exp = "ShowLegacyEffectivityColumn";
		       String CmdExp = "print expression $1 select value dump";
		  	   String strLegacyColumnStatus = MqlUtil.mqlCommand(context, CmdExp,exp).trim();
	    	   
	           if(isDecoupleEnable(context) && strLegacyColumnStatus.equals("Enabled")){
	               showColumn = true;
	           }
	       }catch(Exception ex){
	    	   showColumn = true;
	       }
	    return showColumn;
    }
    

    //*******************************End of Access Programs for decoupling Effectivity columns *********************
    
    //*******************************Start of SET Programs for decoupling Effectivity Columns *****************   
    /**
     * Updates the Decoupled Evolution effectivity expression for a relationship.
     * Called as the update method from structure browser edit.
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values- relId, New Value
     * @return Object - boolean true if the operation is successful
     * @throws Exception if the operation fails
     */
    public Object updateEvolutionEffectivity(Context context,String[] args) throws Exception	
    {    	
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap reqMap = (HashMap) programMap.get("requestMap");
        String newExpression = (String)paramMap.get("New Value");
        String relId  = (String)paramMap.get("relId");
	    String ignoreEffectivityUpdate  = (String) reqMap.get("IgnoreEffectivityUpdate");
        
    	if (relId == null || (relId != null && relId.trim().isEmpty())) {
    		String errorMessage = EnoviaResourceBundle.getProperty(context, "Effectivity",
    				"Effectivity.Alert.rootNodeStructureEffectivity",context.getSession().getLanguage());
    		throw new FrameworkException(errorMessage);
    	}	    
	    
        return (!"true".equalsIgnoreCase(ignoreEffectivityUpdate)) 
				? updateEvolutionEffectivityOnRel(context, new String [] { relId, newExpression }) 
				: true;        
    }
    
    
    public Object updateEvolutionEffectivityOnRel(Context context,String[] args) throws Exception	
    {    	
		return updateDecoupledEffectivity(context,args,CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_EVOLUTION);
    }
    
    public Object updateVariantEffectivity(Context context,
    	    String[] args)
            throws Exception
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap paramMap = (HashMap) programMap.get("paramMap");
            HashMap reqMap = (HashMap) programMap.get("requestMap");
            String objectId = (String) paramMap.get("objectId");
            String newExpression = (String)paramMap.get("New Value");
            String relId  = (String)paramMap.get("relId");
            String ignoreEffectivityUpdate = (String)reqMap.get("IgnoreEffectivityUpdate");
        	EffectivityFramework ef = new EffectivityFramework();  
       
        	if (relId == null || (relId != null && relId.trim().isEmpty())) {
        		String errorMessage = EnoviaResourceBundle.getProperty(context, "Effectivity",
        				"Effectivity.Alert.rootNodeStructureEffectivity",context.getSession().getLanguage());
        		throw new FrameworkException(errorMessage);
        	}	
        	
            return (!"true".equalsIgnoreCase(ignoreEffectivityUpdate)) 
					? updateVariantEffectivityOnRel(context, new String [] { relId, newExpression }) 
					: true;
        	
        }
    

    /**
     * Updates the Decoupled Variant effectivity expression for a relationship.
     * Called as the update method from structure browser edit.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values- relId, New Value
     * @return Object - boolean true if the operation is successful
     * @throws Exception if the operation fails
     */    
    public Object updateVariantEffectivityOnRel(Context context,
    	    String[] args)
            throws Exception
        {
		    return updateDecoupledEffectivity(context,args,CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_VARIANT);
        }
    
    
    public boolean updateDecoupledEffectivity(Context context,
    	    String[] args, CfgDomain cfgDomain)
            throws Exception
        {
		String newExpression = args[1];
		String relId  = args[0];
	    boolean result = false;
    	//EffectivityFramework ef = new EffectivityFramework();  
    	String xmlData = null;

    	
    	if(UIUtil.isNotNullAndNotEmpty(newExpression)){
	    	HashMap paramMap = new HashMap();
	    	paramMap.put("New Value",newExpression);
	    	HashMap hashArgs = new HashMap();
	    	hashArgs.put("paramMap", paramMap);
	    	
	        xmlData = getActualToXMLData(context, JPO.packArgs(hashArgs));
	        connectConfigCriteria(context,xmlData,relId);		//Connects the BOs to each other 
    	}
    	
    	/*DomainRelationship domRel = new DomainRelationship(relId);
    	domRel.open(context);
    	String relType = domRel.getTypeName();
    	String relAlias = FrameworkUtil.getAliasForAdmin(context, "relationship", relType, true);
    	MapList relEffTypes = ef.getRelEffectivity(context, relAlias);*/

    	StringList selects = ConfigFilterablesFactory.getNecessarySelectsForRelationshipToConfigure();
		RelationshipWithSelect rel1 = (Relationship.getSelectRelationshipData( context, new String[] {relId}, selects )).getElement(0); 
	    INavBusProvider navBusProvider = NavigationServicesProvider.getNavBusProvider();                                   
	    INavBusConnection navBusConnection = navBusProvider.createNavBusConnection( context, rel1 );
	    IConfigFilterablesFactory factory = ConfigFilterablesFactory.getConfigFilterablesFactory( context );
	    
	    IConfigNavFilterable instanceToConfigure = null;
	    try {
	    	instanceToConfigure = factory.createFilterable( context, navBusConnection ); 
	    }
	    catch (Exception e) {
			e.printStackTrace();
		}
	    
	    if(!( "VPLM" ).equals( context.getApplication()))
		{		 
			context.setApplication("VPLM");
		}    
	    
	    if(!UIUtil.isNotNullAndNotEmpty(newExpression)){
		    try {
		    	ContextUtil.startTransaction(context, true);
			    CfgDomain[] domainsToUnset = new CfgDomain[1];
			    domainsToUnset[0] = cfgDomain;
			    result = instanceToConfigure.unsetExpressions(context, domainsToUnset);
		        ContextUtil.commitTransaction(context);
			} catch (Exception e) {
				String errorMSG = e.getMessage();
				throw new FrameworkException(errorMSG);
			}      		    
	    } else{
		    try {
		    	ContextUtil.startTransaction(context, true);
			    CfgExpressionDomain[] ConfigDomainExpressions = new CfgExpressionDomain[1];		  
			    ConfigDomainExpressions[0] = CfgExpressionDomain.set( xmlData , cfgDomain);
		        result = instanceToConfigure.setExpressions(context, ConfigDomainExpressions );		       
		        ContextUtil.commitTransaction(context);
			} catch (Exception e) {
					throw new FrameworkException(e.getMessage());
			}      

	    }
     return result;
        }
    
    /**
     * 
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public Object updateLegacyEffectivity(Context context,String[] args)
    		throws Exception
    {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap reqMap = (HashMap) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        String newExpression = (String)paramMap.get("New Value");
        String relId  = (String)paramMap.get("relId");
        String ignoreEffectivityUpdate = (String)reqMap.get("IgnoreEffectivityUpdate");
    	EffectivityFramework ef = new EffectivityFramework();  

    	if (relId == null || (relId != null && relId.trim().isEmpty())) {
    		String errorMessage = EnoviaResourceBundle.getProperty(context, "Effectivity",
    				"Effectivity.Alert.rootNodeStructureEffectivity",context.getSession().getLanguage());
    		throw new FrameworkException(errorMessage);
    	}
    	
        return (!"true".equalsIgnoreCase(ignoreEffectivityUpdate)) 
				? updateLegacyEffectivityOnRel(context, new String [] { relId, newExpression }) 
				: true;
    }
    
    public Object updateLegacyEffectivityOnRel(Context context,
    	    String[] args)
    	   throws Exception
    {
   		return updateDecoupledEffectivity(context,args,CfgDomain.CFG_DOMAIN_CONFIG_CHANGE);
   }
    
    
    public Vector getEvolutionEffectivity(Context context, String[]args)
            throws Exception
    {
    	return getDecoupledEffectivityExpression(context,args,CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_EVOLUTION);
    }
    

    public Vector getVariantEffectivity(Context context, String[]args)
            throws Exception
    {
    	return getDecoupledEffectivityExpression(context,args,CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_VARIANT);
    }
    
    public Vector getLegacyEffectivity(Context context,String[] args)
    		throws Exception
    {	
    	return getLegacyEffectivityExpression(context,args);
    }
    /**
     * Column JPO to render legacy effectivity expression
     * 
     * @param context
     * @param args
     * @return
     * @throws Exception
     * @since 2019x FD05
     */
    private Vector getLegacyEffectivityExpression(Context context, String[]args)
            throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);	   
    	MapList objectList = (MapList)programMap.get("objectList");
        Vector exprVector = new Vector(objectList.size());
        //List<INavBusConnection> navBusConnections = getNavBusConnections(context,objectList);
		List<INavBusConnection> navBusConnections = null;
        if(!programMap.containsKey("navBusConnections")) {
            navBusConnections = getNavBusConnections(context,objectList);
			programMap.put("navBusConnections",navBusConnections);
        }else {
        	navBusConnections = (ArrayList)programMap.get("navBusConnections");;
        }
		
		IConfigNavListOfFilterables listOfFilterables = null;
        if(!programMap.containsKey("listOfFilterables")) {
			IConfigFilterablesFactory factory2 = ConfigFilterablesFactory.getConfigFilterablesFactory(context);
   		    listOfFilterables = factory2.createListOfFilterables(context, navBusConnections);
			programMap.put("listOfFilterables",listOfFilterables);
        }else {
        	listOfFilterables = (IConfigNavListOfFilterables)programMap.get("listOfFilterables");;
        }
        Map<String,List<String>> listOfEffectivityExpressions= getExpressions(context,listOfFilterables,CfgDomain.CFG_DOMAIN_CONFIG_CHANGE, EnumTypeExpr.TypeXSLTransformed,  CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, true, false);
    	for(int i=0;i<objectList.size();i++) {
			Map tempMap = (Map)objectList.get(i);
			String strConnectionID = (String) tempMap.get("physicalid[connection]");	
			if(strConnectionID!=null && !strConnectionID.isEmpty()) {
				try {
					List strInfo=listOfEffectivityExpressions.get(strConnectionID);
					String displayExpression = (String)strInfo.get(0);
					String strDomain = (String)strInfo.get(1);
					if(strDomain.equalsIgnoreCase("Non Decouplable")  && !strDomain.equalsIgnoreCase("ERROR") && !displayExpression.equalsIgnoreCase("ERROR")){
						exprVector.add(displayExpression);		// ONLY For NON Decouplable put Effectivity Expression
					}else{
						exprVector.add("");
					}
				}catch (Exception e) {
					exprVector.add("");
				}
			}else {
				exprVector.add("");
			}  	
    	}
    	return exprVector;
     }
    /**
	 * unused since 2019x FD05
	 */
    public Vector getLegacyEffectivityExpression(Context context, String[]args, CfgDomain domain)
            throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);	   
    	MapList objectList = (MapList)programMap.get("objectList");
        Vector exprVector = new Vector(objectList.size());
        SAXBuilder saxb = new SAXBuilder();

    	for(int i=0;i<objectList.size();i++) {
			Map tempMap = (Map)objectList.get(i);
			String strConnectionID = (String) tempMap.get(DomainRelationship.SELECT_ID);	
			if(strConnectionID!=null && !strConnectionID.isEmpty()) {
				try {
		        	StringList selects = ConfigFilterablesFactory.getNecessarySelectsForRelationshipToConfigure();
		        	RelationshipWithSelect rel1 = (Relationship.getSelectRelationshipData( context, new String[] {strConnectionID}, selects )).getElement(0); 
		    	    INavBusProvider navBusProvider = NavigationServicesProvider.getNavBusProvider();                                   
		    	    INavBusConnection navBusConnection = navBusProvider.createNavBusConnection( context, rel1 );
		    	    IConfigFilterablesFactory factory = ConfigFilterablesFactory.getConfigFilterablesFactory( context );
		    	    IConfigNavFilterable instanceToConfigure = factory.createFilterable( context, navBusConnection );  
				    if(instanceToConfigure!=null){
					    IFilterableExpression filterableExpression = instanceToConfigure.getEffectivity( context );
					    if(instanceToConfigure.hasEffectivity(context)){
			    		    try {
				            	String displayExpression = filterableExpression.getExpression( context, domain, EnumTypeExpr.TypeXSLTransformed, CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, false );
				            	if(!displayExpression.equals("")){
				            		String XMLExpression = filterableExpression.getExpression( context, domain, EnumTypeExpr.TypeXML, CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, false );
			    		           	Document document = document = saxb.build(new StringReader(XMLExpression));
			    		           	Element root = document.getRootElement();
					            	Element expression = root.getChild("Expression", null);
					            	String strDomain = expression.getAttributeValue("Domain");
		                            if(strDomain==null) {
		                                exprVector.add(displayExpression); 
		                            }
		                            else if(strDomain.equalsIgnoreCase("ConfigChange")){
						            	String XMLExpression1 = filterableExpression.getExpression( context, CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_VARIANT, EnumTypeExpr.TypeXML, CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, false );
				    		           	Document document1 = saxb.build(new StringReader(XMLExpression1));
				    		           	Element root1 = document1.getRootElement();
						            	Element expression1 = root1.getChild("Expression", null);
						            	String strDomain1 = expression1.getAttributeValue("Domain");
						            	if(strDomain1.equalsIgnoreCase("ConfigChange_Variant")){
						            		exprVector.add("");
						            	}else{
							            	String XMLExpression2 = filterableExpression.getExpression( context, CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_EVOLUTION, EnumTypeExpr.TypeXML, CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, false );
					    		           	Document document2 = saxb.build(new StringReader(XMLExpression2));
					    		           	Element root2 = document2.getRootElement();
							            	Element expression2 = root2.getChild("Expression", null);
							            	String strDomain2 = expression2.getAttributeValue("Domain");
							            	if(strDomain2.equalsIgnoreCase("ConfigChange_Evolution")){
							            		exprVector.add("");
							            	} else {
							            		exprVector.add(displayExpression);		
							            	}
						            	}
					            	}else{
					            		exprVector.add("");
					            	}
				            	}else{
				            		exprVector.add("");
				            	}
			    		    }
			    		    catch(Exception e)
			    		    {
			    		    	exprVector.add("");
			    		    }
					    }else{
					    	exprVector.add("");
					    }
				    }else{
				    	exprVector.add("");
				    }
				} catch (Exception e) {
					exprVector.add("");
				}
			} else {
				exprVector.add("");
			}  	
    	}
    	return exprVector;
     }

    
    /**
     * private API to update objectid list with physicalid[connection], return list of INavBusConnection
     * 
     * @param context
     * @param objectList
     * @return
     * @throws Exception
     * @since 2019x FD05
     */
    private List getNavBusConnections(Context context, MapList objectList) throws Exception{
    	List<INavBusConnection> navBusConnections = new ArrayList();

    	try {
    		//----------------------------------------------------------
    		//START - Update ObjectList each Map to add relationship physical id
    		//----------------------------------------------------------        
    		//first create StringList with relIds in it, if it is not null/empty will populate in list
    		List slConnectionIDs= new StringList();
    		for(int i=0;i<objectList.size();i++) {
    			Map tempMap = (Map)objectList.get(i);
    			String strConnectionID = (String) tempMap.get(DomainRelationship.SELECT_ID);
    			if(strConnectionID!=null && !strConnectionID.isEmpty()) {
    				slConnectionIDs.add(strConnectionID);
    			}
    		}
    		//Based on stringlist construct an array;
    		String[] relIDsArray = new String[slConnectionIDs.size()];
    		//DB Call to get physicalids and put in Map with OID to PID
    		if(!slConnectionIDs.isEmpty()) {
    			MapList mlPIDs = new MapList();
    			StringList slSelects= new StringList("physicalid");
    			slSelects.add(DomainObject.SELECT_ID);
    			mlPIDs = DomainRelationship.getInfo(context,(String[]) slConnectionIDs.toArray(relIDsArray),slSelects);
    			Map oidPIDMap= new HashMap();
    			for(int i=0;i<mlPIDs.size();i++) {
    				Map tempMap2 = (Map)mlPIDs.get(i);
    				String strConnectionOID = (String) tempMap2.get(DomainObject.SELECT_ID);
    				String strConnectionPID = (String) tempMap2.get("physicalid");	
    				oidPIDMap.put(strConnectionOID, strConnectionPID);
    			}
    			for(int i=0;i<objectList.size();i++) {
    				Map tempMap = (Map)objectList.get(i);
    				String strConnectionID = (String) tempMap.get(DomainRelationship.SELECT_ID);
    				String strConnectionPID=(String)oidPIDMap.get(strConnectionID);
    				tempMap.put("physicalid[connection]", strConnectionPID);
    				Relationship rel = new Relationship(strConnectionPID);
    				INavBusProvider navBusProvider = NavigationServicesProvider.getNavBusProvider();    
    				INavBusConnection navBusConnection = navBusProvider.createNavBusConnection(context, rel);
    				navBusConnections.add(navBusConnection);
    			}
    		}
    		//----------------------------------------------------------
    		//END - Update ObjectList each Map to add relationship physical id
    		//----------------------------------------------------------  
    	} catch (Exception e) {
    		throw new FrameworkException(e.getMessage());
    	}
    	return navBusConnections;
    }
    /**
     * Private method to get effectivity expression based on arg passed.
     * 
     * @param context
     * @param navBusConnections
     * @param inConfigDomain
     * @param inTypeExpr
     * @param in_expressionView
     * @param in_simplify
     * @param in_withDescription
     * @param compactView
     * @return
     * @throws Exception
     * @since 2019x FD05
     */
    private Map getExpressions(Context context, IConfigNavListOfFilterables listOfFilterables2, CfgDomain inConfigDomain, EnumTypeExpr inTypeExpr, CfgExpressionView in_expressionView, boolean in_simplify, boolean in_withDescription, boolean compactView) throws Exception{
    	Map<String,List<String>> listOfEffectivityExpressions= new HashMap();
    	try {
    		listOfEffectivityExpressions = listOfFilterables2.getExpressions(context, (CfgDomain) inConfigDomain, inTypeExpr,  in_expressionView, in_simplify, in_withDescription, compactView);
    		//listOfEffectivityExpressions=={55CD82568F2E000061269B5C84860800=[PRD_np4: Color{GREEN}, Decoupled], 55CD82568F2E000061269B5C080B0600=[PRD_np4: Color{RED}, Decoupled]}
    	} catch (Exception e) {
    		throw new FrameworkException(e.getMessage());
    	}
    	return listOfEffectivityExpressions;
    }
    /**
     * Column JPO to render decoupled effectivity expression based on domain
     * 
     * @param context
     * @param args
     * @param domain
     * @return
     * @throws Exception
     * @since Updated in 2019x FD05
     */
    private Vector getDecoupledEffectivityExpression(Context context, String[]args, CfgDomain domain)
            throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);	   
    	MapList objectList = (MapList)programMap.get("objectList");
        Vector exprVector = new Vector(objectList.size());
        
        //List<INavBusConnection> navBusConnections = getNavBusConnections(context,objectList);
        List<INavBusConnection> navBusConnections = null;
        if(!programMap.containsKey("navBusConnections")) {
            navBusConnections = getNavBusConnections(context,objectList);
			programMap.put("navBusConnections",navBusConnections);
        }else {
        	navBusConnections = (ArrayList)programMap.get("navBusConnections");;
        }
   		IConfigNavListOfFilterables listOfFilterables = null;
        if(!programMap.containsKey("listOfFilterables")) {
			IConfigFilterablesFactory factory2 = ConfigFilterablesFactory.getConfigFilterablesFactory(context);
   		    listOfFilterables = factory2.createListOfFilterables(context, navBusConnections);
			programMap.put("listOfFilterables",listOfFilterables);
        }else {
        	listOfFilterables = (IConfigNavListOfFilterables)programMap.get("listOfFilterables");;
        }

        Map<String,List<String>> listOfEffectivityExpressions= getExpressions(context,listOfFilterables,domain, EnumTypeExpr.TypeXSLTransformed,  CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, true, false);
    	for(int i=0;i<objectList.size();i++) {
			Map tempMap = (Map)objectList.get(i);
			String strConnectionID = (String) tempMap.get("physicalid[connection]");	
			if(strConnectionID!=null && !strConnectionID.isEmpty()) {
				try {
					List strInfo=listOfEffectivityExpressions.get(strConnectionID);
					String displayExpression = (String)strInfo.get(0);
					String strDomain = (String)strInfo.get(1);
					if(!strDomain.equalsIgnoreCase("Non Decouplable") && !strDomain.equalsIgnoreCase("ERROR") && !displayExpression.equalsIgnoreCase("ERROR")){
						exprVector.add(displayExpression);		
					}else{
						exprVector.add("");
					}
				}catch (Exception e) {
					exprVector.add("");
				}
			}else {
				exprVector.add("");
			}  	
    	}
    	return exprVector;
     }
    /**
     * Column JPO to render decoupled Proposed Evolution expression
     * 
     * @param context
     * @param args
     * @return
     * @throws Exception
     * @since Updated in 2019x FD05
     */
    public Vector getProposedEvolutionEffectivity(Context context, String[]args)
            throws Exception
        {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);	   
    	MapList objectList = (MapList)programMap.get("objectList");
        Vector exprVector = new Vector(objectList.size());
        
        //List<INavBusConnection> navBusConnections = getNavBusConnections(context,objectList);
		List<INavBusConnection> navBusConnections = null;
        if(!programMap.containsKey("navBusConnections")) {
            navBusConnections = getNavBusConnections(context,objectList);
			programMap.put("navBusConnections",navBusConnections);
        }else {
        	navBusConnections = (ArrayList)programMap.get("navBusConnections");;
        }
		
		IConfigNavListOfFilterables listOfFilterables = null;
        if(!programMap.containsKey("listOfFilterables")) {
			IConfigFilterablesFactory factory2 = ConfigFilterablesFactory.getConfigFilterablesFactory(context);
   		    listOfFilterables = factory2.createListOfFilterables(context, navBusConnections);
			programMap.put("listOfFilterables",listOfFilterables);
        }else {
        	listOfFilterables = (IConfigNavListOfFilterables)programMap.get("listOfFilterables");;
        }
        CfgDomain domain= CfgDomain.CFG_DOMAIN_CONFIG_CHANGE;
        if(isDecoupleEnable(context)) {
        	domain=CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_EVOLUTION;
        }
        Map<String,List<String>> listOfEffectivityExpressions= getExpressions(context,listOfFilterables,domain, EnumTypeExpr.TypeXSLTransformed,  CfgExpressionView.CFG_EXPRVIEW_PROJECTED, true, true, false);
    	for(int i=0;i<objectList.size();i++) {
			Map tempMap = (Map)objectList.get(i);
			String strConnectionID = (String) tempMap.get("physicalid[connection]");	
			if(strConnectionID!=null && !strConnectionID.isEmpty()) {
				try {
					List strInfo=listOfEffectivityExpressions.get(strConnectionID);
					String displayExpression = (String)strInfo.get(0);
					exprVector.add(displayExpression);		
				}catch (Exception e) {
					exprVector.add("");
				}
			}else {
				exprVector.add("");
			}  	
    	}
    	return exprVector;
        }
    /**
     * unused since 2019x FD05
     * @param context
     * @param args
     * @return
     * @throws Exception
	 * 
     */
    public String getProposedEvolutionEffectivityOnRel(Context context, String[]args)
            throws Exception
        {
			String strConnectionID  = args[0];
			String XMLExpression = "";
    		if(!strConnectionID.isEmpty()) {
    			try{
    				StringList selects = ConfigFilterablesFactory.getNecessarySelectsForRelationshipToConfigure();
    				RelationshipWithSelect rel1 = (Relationship.getSelectRelationshipData( context, new String[] {strConnectionID}, selects )).getElement(0); 
    				INavBusProvider navBusProvider = NavigationServicesProvider.getNavBusProvider();                                   
    				INavBusConnection navBusConnection = navBusProvider.createNavBusConnection( context, rel1 );
    				IConfigFilterablesFactory factory = ConfigFilterablesFactory.getConfigFilterablesFactory( context );
    				IConfigNavFilterable instanceToConfigure = factory.createFilterable( context, navBusConnection );
    				
    				if(instanceToConfigure!=null){
    					IFilterableExpression filterableExpression = instanceToConfigure.getEffectivity( context );
    					if(instanceToConfigure.hasEffectivity(context)){
    						try {
    							if(isDecoupleEnable(context)){
    								XMLExpression = filterableExpression.getExpression( context, CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_EVOLUTION, EnumTypeExpr.TypeXSLTransformed, CfgExpressionView.CFG_EXPRVIEW_PROJECTED, true, false );
    							}else{
    								XMLExpression = filterableExpression.getExpression( context, CfgDomain.CFG_DOMAIN_CONFIG_CHANGE, EnumTypeExpr.TypeXSLTransformed, CfgExpressionView.CFG_EXPRVIEW_PROJECTED, true, false );	
    							}
    						}
    						catch(Exception e)
    						{
    							e.printStackTrace();
    						}							
    					}
    				}
    			}catch (Exception e) {
    				e.printStackTrace();
				}
    		}
    	return XMLExpression;
        }    
    
    
    
    //*******************************End of GET Programs for Decouple XBOM Columns ********************    
    
    /**
     * Method to get model ids from XML expression
     * 
     * @param Context
     * context for this request Element
     * exprElem root xml element
     * @returns List<String> ModelIDs - List of ModelIDs involved in XML expression
     * @exception Exception
     * @since
     * @grade 0
     */
     private final static String XML_HOLDERNAME_ATTRIBUTE = "HolderName";
     private final static String XML_HOLDERTYPE_ATTRIBUTE = "HolderType";
     private final static String XML_CONTEXT_ELEM = "Context";
     public static final String RELATIONSHIP_CONFIGURATION_CONTEXT = PropertyUtil.getSchemaProperty("relationship_ConfigurationContext");
     private static List<String> parseXMLForModelIDs(Context context,Element exprElem)
                   throws FrameworkException, Exception {
            // get operator element
            List<String> modelIds =new Vector<String>();
            Element rightExprElem;
            String elementName = exprElem.getName();
            if (XML_CONTEXT_ELEM.equals(elementName)) {
    			String modelname = exprElem.getAttributeValue("HolderName");
    			//String type = exprElem.getAttributeValue("HolderType");- Not Useful as type is hardcoded to Model always
            	StringList objectSelects = new StringList(DomainConstants.SELECT_ID);
            	String strType = PropertyUtil.getSchemaProperty(context, "type_Model");
            	MapList listOfModels = DomainObject.findObjects(context, strType, modelname,"",null,DomainConstants.QUERY_WILDCARD,null,true, objectSelects);
            	if(listOfModels!=null && !listOfModels.isEmpty()){
            		for(int j = 0; j < listOfModels.size(); j++){
            			Map parntMap = (Map)listOfModels.get(j);	
            			String strModelID = (String)parntMap.get(DomainObject.SELECT_ID);
            			modelIds.add(strModelID);
            		}
            	}
            }else {
                   List childList = exprElem.getChildren();
                   for (int i = 0; i < childList.size(); i++) {
                         rightExprElem = (Element) childList.get(i);
                         List childChildList = rightExprElem.getChildren();
                         modelIds.addAll(parseXMLForModelIDs(context,rightExprElem));
                   }
            }
            return modelIds;
     }

     /**
      * This Function is used to connect the Models to Configuration Criteria
      * @param context
      * @param xmldata
      * @param relnId
      * @throws JDOMException
      * @throws Exception
      */
     public void connectConfigCriteria(Context context,String xmldata,String relnId) throws JDOMException, Exception {
         //---------------------------------------------------------------
 		// get model IDs from expression---------------------------------
         //---------------------------------------------------------------            

     	String xmlData = xmldata;
     	String relId = relnId;
     	
 		com.matrixone.jdom.input.SAXBuilder saxb = new com.matrixone.jdom.input.SAXBuilder();
 		saxb.setFeature(
 				"http://apache.org/xml/features/disallow-doctype-decl",
 				true);
 		saxb.setFeature(
 				"http://xml.org/sax/features/external-general-entities",
 				false);
 		saxb.setFeature(
 				"http://xml.org/sax/features/external-parameter-entities",
 				false);
 		Document document = saxb.build(new java.io.StringReader(
 				xmlData));
 		com.matrixone.jdom.Element rootElement = document.getRootElement();
 		String XML_LOCATION_CHANGE_NAMESPACE = "urn:com:dassault_systemes:config CfgEffectivityExpression.xsd";//"urn:com:dassault_systemes:config CfgExpressionDefinition.xsd";
 		Namespace DEFAULT_NAMESPACE = Namespace.getNamespace("Cfg", "urn:com:dassault_systemes:config");

 		Element exprElem = rootElement.getChild("Expression",
 				DEFAULT_NAMESPACE);
 		List<String> modelIds = parseXMLForModelIDs(context, exprElem);
         
         //---------------------------------------------------------------
 		//  model IDs Cofiguration Context connection with from side object of relId ----
         //---------------------------------------------------------------  
 		/*DomainRelationship domRelObj = new DomainRelationship(relId);
 		//check if connected to 'Effectivity Usage' relationship
 		StringList relSelects = new StringList(1);
 		relSelects.add(DomainRelationship.SELECT_FROM_ID);
 		String strCCs = null;

 		Map objMap = domRelObj.getRelationshipData(context, relSelects);
 		StringList fromID = (StringList)objMap.get(DomainRelationship.SELECT_FROM_ID);

 		try {
 		      String strMqlCmd1 = "print bus $1 select $2 dump";
 	          strCCs =  (String) MqlUtil.mqlCommand(context, strMqlCmd1,fromID.get(0),"from["+RELATIONSHIP_CONFIGURATION_CONTEXT+"].to.id");
 		}
 		catch(Exception e) {
 			e.printStackTrace();
 		}
         String str[] = strCCs.split(",");
         
         List<String> al = new ArrayList();
         al = Arrays.asList(str);
 		//**************************************
 		
 		try {
 			Iterator slItr = modelIds.iterator();
 			while (slItr.hasNext()) {
 				String strConfigCtxObjId = (String) slItr.next();
 				if(!al.contains(strConfigCtxObjId)) {
 					DomainRelationship.connect(context, fromID.get(0), RELATIONSHIP_CONFIGURATION_CONTEXT,strConfigCtxObjId, true);
 				}							
 			}
 		} catch (Exception ex) {
 			throw new FrameworkException(ex.getMessage());
 		}*/
 		StringList relSelects = new StringList(2);
  		String strContextID = "from.from["+RELATIONSHIP_CONFIGURATION_CONTEXT+"].to.id";
  		relSelects.add(DomainRelationship.SELECT_FROM_ID);
  		relSelects.add(strContextID);
  		MapList mlRelInfo= DomainRelationship.getInfo(context, new String[] {relId}, relSelects);
  		if(mlRelInfo.size()>0) {
  			Map mpRelInfo=(Map)mlRelInfo.get(0);
			StringList fromID = new StringList();
			if(mpRelInfo.get(DomainRelationship.SELECT_FROM_ID) instanceof StringList){
				fromID = (StringList) mpRelInfo.get(DomainRelationship.SELECT_FROM_ID);	
			}else if(mpRelInfo.get(DomainRelationship.SELECT_FROM_ID) instanceof String){
				fromID.add(mpRelInfo.get(DomainRelationship.SELECT_FROM_ID).toString());	
			}
			StringList al = new StringList();
			if(mpRelInfo.get(strContextID) instanceof StringList){
				al = (StringList) mpRelInfo.get(strContextID);	
			}else if(mpRelInfo.get(strContextID) instanceof String){
				al.add(mpRelInfo.get(strContextID).toString());	
			}
            List<String> al1 = new ArrayList();
  			try {
  				Iterator slItr = modelIds.iterator();
  				while (slItr.hasNext()) {
  					String strConfigCtxObjId = (String) slItr.next();
  					if(!al.contains(strConfigCtxObjId)) {
						al1.add(strConfigCtxObjId);
  					}							
  				}
				if(al1.size() > 0){
					DomainRelationship.connect(context, DomainObject.newInstance(context, fromID.get(0)), RELATIONSHIP_CONFIGURATION_CONTEXT,true, al1.toArray(new String[al1.size()]));
				}
  			} catch (Exception ex) {
  				throw new FrameworkException(ex.getMessage());
  			}
  		}		
     }
   
    /**
     * Updates the effectivity expression for a relationship.
     * Called as the update method from structure browser edit.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values- relId, New Value
     * @return Object - boolean true if the operation is successful
     * @throws Exception if the operation fails
     * @since CFF R209
     */
         public Object updateRelExpression(Context context,
	    String[] args)
        throws Exception
    {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        String objectId = (String) paramMap.get("objectId");
	String newExpression = (String)paramMap.get("New Value");
	String relId  = (String)paramMap.get("relId");

	EffectivityFramework ef = new EffectivityFramework ();
	//Set the Effectivity Types for the rel.
	//The valid effectivity types will be all types available for the relationship
	if (relId == null || (relId != null && relId.trim().isEmpty())) {
		String errorMessage = EnoviaResourceBundle.getProperty(context, "Effectivity",
				"Effectivity.Alert.rootNodeStructureEffectivity",context.getSession().getLanguage());
		throw new FrameworkException(errorMessage);
	}
	DomainRelationship domRel = new DomainRelationship(relId);
	domRel.open(context);
	String relType = domRel.getTypeName();
	String relAlias = FrameworkUtil.getAliasForAdmin(context, "relationship", relType, true);
	MapList relEffTypes = ef.getRelEffectivity(context, relAlias);
	EffectivityFramework.setRelEffectivityTypes(context, relId, relEffTypes);

	return ef.updateRelExpression(context, args);
    }
     
     /**
      * This Method is used for Update the Effectivity using new API fir Non-DEcoupled Mode
      * @param context
      * @param args
      * @return
      * @throws Exception
      */
    /*public Object updateRelExpression(Context context,
    	    String[] args)		
            throws Exception											
    {
    	HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap reqMap = (HashMap) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        String newExpression = (String)paramMap.get("New Value");
        String relId  = (String)paramMap.get("relId");
        String ignoreUpdateProgram = (String)reqMap.get("ignoreUpdateProgram");
    	EffectivityFramework ef = new EffectivityFramework();  
        String xmlData = getActualToXMLData(context, args);
	    boolean result = false;
        if("true".equalsIgnoreCase(ignoreUpdateProgram)) {
        	return true;
        }
        else {
        	connectConfigCriteria(context,xmlData,relId);
	    	//Set the Effectivity Types for the rel.
	    	//The valid effectivity types will be all types available for the relationship
        	if (relId == null || (relId != null && relId.trim().isEmpty())) {
	    		String errorMessage = EnoviaResourceBundle.getProperty(context, "Effectivity",
	    				"Effectivity.Alert.rootNodeStructureEffectivity",context.getSession().getLanguage());
	    		throw new FrameworkException(errorMessage);
	    	}
	    	DomainRelationship domRel = new DomainRelationship(relId);
	    	domRel.open(context);
	    	String relType = domRel.getTypeName();
	    	String relAlias = FrameworkUtil.getAliasForAdmin(context, "relationship", relType, true);
	    	MapList relEffTypes = ef.getRelEffectivity(context, relAlias);
			StringList selects = ConfigFilterablesFactory.getNecessarySelectsForRelationshipToConfigure();
			RelationshipWithSelect rel1 = (Relationship.getSelectRelationshipData( context, new String[] {relId}, selects )).getElement(0); 		   
			INavBusProvider navBusProvider = NavigationServicesProvider.getNavBusProvider();                                   
		    INavBusConnection navBusConnection = navBusProvider.createNavBusConnection( context, rel1 );
		    IConfigFilterablesFactory factory = ConfigFilterablesFactory.getConfigFilterablesFactory( context );
		    IConfigNavFilterable instanceToConfigure = null;
		    try {		    	
		    	instanceToConfigure = factory.createFilterable( context, navBusConnection ); 
		    }
		    catch (Exception e) {
				e.printStackTrace();
			}
		    
		    if(!( "VPLM" ).equals( context.getApplication()))
			{		 
				context.setApplication("VPLM");
			} 
		    //set Expression(s)
		    //boolean result = false;
		    try {		    	
			    	ContextUtil.startTransaction(context, true);
				    CfgExpressionDomain[] ConfigDomainExpressions = new CfgExpressionDomain[1];		  
				    ConfigDomainExpressions[0] = CfgExpressionDomain.set( xmlData , CfgDomain.CFG_DOMAIN_CONFIG_CHANGE);
			        result = instanceToConfigure.setExpressions(context, ConfigDomainExpressions );			        
			        ContextUtil.commitTransaction(context);
			} 
		    catch (Exception e) {
				String errorMSG = e.getMessage();
				boolean res = errorMSG.contains("Following Model has been found in the input XML expression but is not attached to the Reference");	
				if(res) { 
					String errorMessage = EnoviaResourceBundle.getProperty(context, "Effectivity","Effectivity.Alert.ModelNotAttachedErrorEffectivity",context.getSession().getLanguage());
					throw new FrameworkException(errorMessage);
				}
				//e.printStackTrace();
			}        
        } 	        
	    return result;
    }
*/
    /**
     * Displays the Item Effectivity field checkboxes
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values - objectId
     *        requestMap HashMap of request values - type
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public String getItemEffectivityDisplay(Context context, String[]args)
        throws Exception
    {
	   HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap paramMap   = (HashMap)programMap.get("paramMap");
	   HashMap requestMap= (HashMap)programMap.get("requestMap");
	   String symType = (String)requestMap.get("type");
           // Get the selected type on the create form
           // The form selection for type can come in various forms so it needs to be handled correctly.
           // Ex. type=_selectedType:SoftwareBuild,type_HardwareBuild,type_Builds OR
           //     type=type_Program OR
           //     type=Workspace Vault
           //
	   if(symType!=null && !symType.equals(""))
           {
               if(symType.startsWith("_selectedType:")) //means user has selected a different type than original
               {
                   StringList typeList = FrameworkUtil.split(symType, ",");
                   if (typeList.size()>1)
                   {
                       symType = (String)typeList.get(0);
                       symType = symType.substring(symType.indexOf(":") + 1, symType.length());
                   }
               }
               else if(symType.indexOf(',')>0)
               {
        	   symType = symType.substring(0,symType.indexOf(','));
               }
               if (!symType.startsWith("type_"))
               {
        	   symType = FrameworkUtil.getAliasForAdmin(context, "type", symType, true);
               }
           }
	   StringBuffer sb = new StringBuffer(100);
	   String actualValue = null;
	   String displayValue = null;
	   Map effType = null;

	   EffectivityFramework EFF = new EffectivityFramework();
	   MapList mlEffectivityTypes = EFF.getTypeEffectivity(context, symType);
	   if (!mlEffectivityTypes.isEmpty())
	   {
	       for (int i=0; i < mlEffectivityTypes.size(); i++)
	       {
		   if (i > 0)
		   {   //append a newline
                       sb.append("<br/>");
		   }
		   effType = (Map)mlEffectivityTypes.get(i);
		   actualValue = (String)effType.get(EffectivityFramework.ACTUAL_VALUE);
		   displayValue = (String)effType.get(EffectivityFramework.DISPLAY_VALUE);
		   sb.append("<input type=\"checkbox\" name=\"effTypes\" value=\"");
		   sb.append(actualValue);
		   sb.append("@displayactual@");
		   sb.append(displayValue);
		   sb.append("\"/>");
		   sb.append("&#160;");
		   sb.append(displayValue);
		   sb.append("&#160;");
	       }
	   }
	   return sb.toString();
    }

    /**
     * Displays the Item Effectivity field checkboxes for Edit
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values -
     *        requestMap HashMap of request values - objectId, mode
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public String getItemEffectivityEditDisplay(Context context, String[]args)
        throws Exception
    {
	   HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap paramMap   = (HashMap)programMap.get("paramMap");
	   HashMap requestMap= (HashMap)programMap.get("requestMap");
	   String objectId = (String)requestMap.get("objectId");
	   String mode = (String)requestMap.get("mode");
	   StringBuffer sb = new StringBuffer(100);
	   String actualValue = null;
	   String displayValue = null;
	   Map effType = null;

	   DomainObject domObj = DomainObject.newInstance(context, objectId);
	   EffectivityFramework EFF = new EffectivityFramework();
	   String objType = domObj.getInfo(context, DomainConstants.SELECT_TYPE);
	   String typeAlias = FrameworkUtil.getAliasForAdmin(context, "type", objType, true);
	   MapList mlObjectEffectivityTypes = EFF.getObjectEffectivityTypes(context, objectId);
	   if (mode != null && mode.equalsIgnoreCase("edit"))
	   {
	       MapList mlTypeEffectivityTypes = EFF.getTypeEffectivity(context, typeAlias);
	       if (!mlTypeEffectivityTypes.isEmpty())
	       {
		   for (int i=0; i < mlTypeEffectivityTypes.size(); i++)
		   {
		       effType = (Map)mlTypeEffectivityTypes.get(i);
		       actualValue = (String)effType.get(EffectivityFramework.ACTUAL_VALUE);
		       displayValue = (String)effType.get(EffectivityFramework.DISPLAY_VALUE);
		       if (i > 0)
		       {   //append a newline
			   sb.append("<br/>");
		       }

		       sb.append("<input type=\"checkbox\" name=\"effTypes\" value=\"");
		       sb.append(actualValue);
			   sb.append("@displayactual@");
			   sb.append(displayValue);
		       sb.append("\"");
		       if (mlObjectEffectivityTypes.contains(effType))
		       {
			   sb.append("checked");
		       }
		       sb.append("/>");
		       sb.append("&#160;");
		       sb.append(displayValue);
		       sb.append("&#160;");
		   }
	       }
	   }
	   else //view mode only display comma separated list
	   {
	       for (int i=0; i < mlObjectEffectivityTypes.size(); i++)
	       {
		   effType = (Map)mlObjectEffectivityTypes.get(i);
		   actualValue = (String)effType.get(EffectivityFramework.ACTUAL_VALUE);
		   displayValue = (String)effType.get(EffectivityFramework.DISPLAY_VALUE);
		   if (sb.length() > 0)
		   {
		       sb.append(",");
		   }
		   sb.append(displayValue);
	       }
	   }
	   return sb.toString();
    }

    /**
     * Updates the object Effectivity Types value.
     * Called as the update method for Item Effectivity field on create/edit form
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values - objectId
     *        requestMap HashMap of request values - effTypes
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public void updateObjectEffectivityTypes(Context context, String[]args)
        throws Exception
    {
	   HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap paramMap   = (HashMap)programMap.get("paramMap");
	   HashMap requestMap= (HashMap)programMap.get("requestMap");
	   String objectId = (String)paramMap.get("objectId");
	   //String oldValue = (String)paramMap.get("Old Value");
	   //String newValue = (String)paramMap.get("New Value");
	   //TODO get both actual and display types
	   String[] effTypes = (String[])requestMap.get("effTypes");
	   MapList mlTypes = new MapList ();
	   HashMap typeMap = null;
	   EffectivityFramework ef = new EffectivityFramework();
	   if (effTypes == null)
	   {
	       //Effectivity Types have been cleared
	       typeMap = new HashMap();
	       typeMap.put(ef.ACTUAL_VALUE, "");
	       //TODO get translated value
	       typeMap.put(ef.DISPLAY_VALUE, "");
	       mlTypes.add(typeMap);
	   }
	   else
	   {
	       for (int i = 0; i < effTypes.length; i++)
	       {
	    	   String[] displayActual = (String[])effTypes[i].split("@displayactual@");
		   typeMap = new HashMap();
		   typeMap.put(ef.ACTUAL_VALUE, displayActual[0]);
		   //TODO get translated value
		   typeMap.put(ef.DISPLAY_VALUE, displayActual[1]);
		   mlTypes.add(typeMap);
	       }
	   }
	   //TODO should send in object id list
	   ef.setObjectEffectivityTypes(context, objectId, mlTypes);
    }
    /**
     *
     * @param requestMap
     * @return Concatenated String of key- value pairs , specific to CFF
     */
    private String cffParams(Map requestMap, String mode)
    {
    	String strAmp = null;
       if (mode != null && mode.equalsIgnoreCase("edit"))
 	   {
 	       strAmp = "&";
 	   }
 	   else // null mode means create form
 	   {
 	       strAmp = "&amp;";
 	   }
    	String url = null;
    	String includeContextProgram = (String)requestMap.get("includeContextProgram");
    	String showOr = (String)requestMap.get("showOr");
    	String showAnd = (String)requestMap.get("showAnd");
    	String showContext = (String)requestMap.get("showContext");
    	String postProcessCFFURL = (String)requestMap.get("postProcessCFFURL");
    	StringBuffer sb = new StringBuffer();

    	if(includeContextProgram != null)
    	{
    		sb.append(strAmp);
    		sb.append("includeContextProgram=");
    		sb.append(includeContextProgram);
    	}

    	if(showOr != null)
    	{
    		sb.append(strAmp);
    		sb.append("showOr=");
        	sb.append(showOr);
    	}
    	if(showAnd != null)
    	{
    		sb.append(strAmp);
    		sb.append("showAnd=");
        	sb.append(showAnd);
    	}
    	if(showContext != null)
    	{
    		sb.append(strAmp);
    		sb.append("showContext=");
        	sb.append(showContext);
    	}
    	if(postProcessCFFURL != null)
    	{
    		sb.append(strAmp);
    		sb.append("postProcessCFFURL=");
        	sb.append(postProcessCFFURL);
    	}
    	url = sb.toString();
    	return url;
    }


    /**
     * Displays the Effectivity Expression field
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values - fieldMap
     *        requestMap HashMap of request values - objectId, mode, form
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public String getEffectivityExpressionDisplay(Context context, String[]args)
        throws Exception
    {
	   HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap paramMap   = (HashMap)programMap.get("paramMap");
	   HashMap requestMap= (HashMap)programMap.get("requestMap");
	   String objectId = (String)requestMap.get("objectId");
	   String relID = (String)requestMap.get("relId");
	   double timezone = (new Double((String)requestMap.get("timeZone"))).doubleValue();
	   String mode = (String)requestMap.get("mode");
	   String formName = (String)requestMap.get("form");
           HashMap fieldMap   = (HashMap)programMap.get("fieldMap");
	   String fieldName = (String)fieldMap.get("name");
	   EffectivityFramework EFF = new EffectivityFramework();
	   StringBuffer sb = new StringBuffer(100);
	   String actualValue = "";
	   String displayValue = "";
	   String strObjectId = "";
	   String strParentId = "";
	   String parentOID = "";
	   if (relID != null && !relID.equals("null") && relID.length() > 0)
	   {
	       String[] relIds = new String[1];
	       relIds[0] = relID;
	       StringList relSelects = new StringList(1);
	       relSelects.add(DomainConstants.SELECT_FROM_ID);
	       //DomainRelationship relObj = new DomainRelationship(relID);
	       MapList mp = DomainRelationship.getInfo(context, relIds, relSelects);
	       //MapList mp = relObj.getInfo(context, relIds, relSelects);
	       parentOID = (String)((Map)mp.get(0)).get(DomainConstants.SELECT_FROM_ID);
	   }

	   Map mapExpression = null;
	   //TODO remove temp code of hardcoded form name - should be passed in by BPS edit form
	   formName = "editDataForm";
	   StringList listValue = new StringList();
	   StringList listValueActual = new StringList();
	   StringBuffer sbListValue = new StringBuffer();

	   MapList mlObjectExpression = EFF.getObjectExpression(context, objectId, timezone, true);
	   mapExpression = (Map)mlObjectExpression.get(0);
	   actualValue = (String)mapExpression.get(EffectivityFramework.ACTUAL_VALUE);
	   displayValue = (String)mapExpression.get(EffectivityFramework.DISPLAY_VALUE);
	   listValue = (StringList)mapExpression.get("listValue");
	   for(int i=0;i<listValue.size();i++)
	   {
	     sbListValue.append(listValue.get(i));
	     sbListValue.append("@delimitter@");
	   }
	   String strListValue = sbListValue.toString();
	   sbListValue.delete(0, sbListValue.length());
	   listValueActual = (StringList)mapExpression.get("listValueActual");
	   for(int i=0;i<listValueActual.size();i++)
	   {
	     sbListValue.append(listValueActual.get(i));
	     sbListValue.append("@delimitter@");
	   }
	   strObjectId = "&objectId=" + objectId;
	   strParentId = "&parentOID=" + parentOID;
	   String quoteSeparatedIds = strListValue.substring(0, strListValue.length());
	   String strListValueAc = sbListValue.toString();
	   String quoteSeparatedIdsAc = strListValueAc.substring(0, strListValueAc.length());
	   HashMap effectivityFrameworkMap = new HashMap();
	   HashMap effTypes = new HashMap();
	   effTypes.put(EffectivityFramework.DISPLAY_VALUE, displayValue);
	   effTypes.put(EffectivityFramework.ACTUAL_VALUE, actualValue);
	   effectivityFrameworkMap.put("effTypes", effTypes);
	   HashMap effExpr = new HashMap();
	   effExpr.put(EffectivityFramework.DISPLAY_VALUE, displayValue);
	   effExpr.put(EffectivityFramework.ACTUAL_VALUE, actualValue);
	   effectivityFrameworkMap.put("effExpr", effExpr);
	   String editEffectivityURL = "../effectivity/EffectivityDefinitionDialog.jsp?modetype=edit" + strObjectId + strParentId +"&formName=" + formName + "&fieldNameEffExprDisplay=" + fieldName + "&fieldNameEffExprActual=EffectivityExpressionOID&fieldNameEffExprActualListAc=EffectivityExpressionOIDListAc&fieldNameEffExprActualList=EffectivityExpressionOIDList&fieldNameEffTypes=effTypes";
	   String cffParams = cffParams(requestMap,"edit");
	   editEffectivityURL = editEffectivityURL.concat(cffParams);
	   if (mode != null && mode.equalsIgnoreCase("edit"))
	   {
	       sb.append(" <script src='../common/scripts/emxUIModal.js'> </script> ");
	       sb.append(" <script src='../emxUIPageUtility.js'> </script> ");
	       sb.append("<script> ");
	       sb.append("function showEffectivityExpressionDialog() { ");
	       sb.append(" emxShowModalDialog(\"");
	       sb.append(editEffectivityURL);
	       sb.append("\",700,500);");
	       sb.append("}");
	       sb.append("</script>");
	       sb.append("<textarea name=\"EffectivityExpression\" size=\"20");
	       sb.append("\" readonly=\"readonly\" >");
	       sb.append(displayValue);
	       sb.append("</textarea>");
	       sb.append("<a href=\"javascript:showEffectivityExpressionDialog()\">");
	       sb.append("<img src=\"../common/images/iconActionEdit.gif\" border=\"0\"/></a>");
	       sb.append("<input type=\"hidden\" name=\"EffectivityExpressionOID\" value=\"");
	       sb.append(actualValue);
	       sb.append("\" />");
	       sb.append("<input type=\"hidden\" name=\"EffectivityExpressionOIDList\" value=\"");
	       sb.append(quoteSeparatedIds);
	       sb.append("\" />");
	       sb.append("<input type=\"hidden\" name=\"EffectivityExpressionOIDListAc\" value=\"");
	       sb.append(quoteSeparatedIdsAc);
	       sb.append("\" />");
	   }
	   else //view mode only display expression
	   {
	       sb.append(displayValue);
	   }
	   return sb.toString();
    }
    /**
     * Displays the Effectivity Expression field
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values - fieldMap
     *        requestMap HashMap of request values - objectId, mode, form
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public String getEffectivityExpressionCreate(Context context, String[]args)
        throws Exception
    {
	   HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap paramMap   = (HashMap)programMap.get("paramMap");
	   HashMap requestMap= (HashMap)programMap.get("requestMap");
	   String objectId = (String)requestMap.get("objectId");
	   double timezone = (new Double((String)requestMap.get("timeZone"))).doubleValue();
	   String mode = (String)requestMap.get("mode");
	   String formName = (String)requestMap.get("form");
           HashMap fieldMap   = (HashMap)programMap.get("fieldMap");
	   String fieldName = (String)fieldMap.get("name");
	   EffectivityFramework EFF = new EffectivityFramework();
	   StringBuffer sb = new StringBuffer(100);
	   String actualValue = "";
	   String displayValue = "";
	   String quoteSeparatedIds = null;
	   String quoteSeparatedIdsAc = null;
	   Map mapExpression = null;
	    //for create form
       mode = "create";
       formName = "emxCreateForm";

	   String createEffectivityURL = "../effectivity/EffectivityDefinitionDialog.jsp?modetype=create&amp;invockedFrom=fromForm&amp;formName=" + formName + "&amp;parentOID=" + objectId + "&amp;fieldNameEffExprDisplay=" + fieldName + "&amp;fieldNameEffExprActual=EffectivityExpressionOID&amp;fieldNameEffTypes=effTypes&amp;fieldNameEffExprActualListAc=EffectivityExpressionOIDListAc&amp;fieldNameEffExprActualList=EffectivityExpressionOIDList";
	   String cffParams = cffParams(requestMap,"create");
	   createEffectivityURL = createEffectivityURL.concat(cffParams);
	   if (mode != null && mode.equalsIgnoreCase("create"))
	   {
	       sb.append(" <script src='../common/scripts/emxUIModal.js'> </script> ");
	       sb.append(" <script src='../emxUIPageUtility.js'> </script> ");
	       sb.append("<script> ");
	       sb.append("function showEffectivityExpressionDialog() { ");
	       sb.append(" emxShowModalDialog(\"");
	       sb.append(createEffectivityURL);
	       sb.append("\",700,500);");
	       sb.append("}");
	       sb.append("</script>");
	       sb.append("<textarea name=\"EffectivityExpression\" size=\"20\" value=\"");
	       sb.append(displayValue);
	       sb.append("\" readonly=\"readonly\" ></textarea>");
	       sb.append("<a href=\"javascript:showEffectivityExpressionDialog()\">");
	       sb.append("<img src=\"../common/images/iconActionEdit.gif\" border=\"0\"/></a>");
	       sb.append("<input type=\"hidden\" name=\"EffectivityExpressionOID\" value=\"");
	       sb.append(actualValue);
	       sb.append("\" />");
	       sb.append("<input type=\"hidden\" name=\"EffectivityExpressionOIDList\" value=\"");
	       sb.append(quoteSeparatedIds);
	       sb.append("\" />");
	       sb.append("<input type=\"hidden\" name=\"EffectivityExpressionOIDListAc\" value=\"");
	       sb.append(quoteSeparatedIdsAc);
	       sb.append("\" />");
	   }
	   return sb.toString();
    }
    /**
     * Returns a MapList of selected Ids from full search results
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        RequestValuesMap HashMap of request values - emxTableRowId
     *
     * @throws Exception if the operation fails
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getModelMilestoneDictionary(Context context, String[]args)
        throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
        HashMap requestMap=(HashMap)programMap.get("RequestValuesMap");
        String disableRootSelection = (String)programMap.get("disableRootSelection");
        MapList mlSearchResults = new MapList();

        String[] emxTableRowId = (String[]) requestMap.get("EFFTableRowId");
        String selectedId;
        
        if(!programMap.keySet().contains("parentId")){
            for (int i=0; i < emxTableRowId.length; i++ )
            {
              //if this is coming from the Full Text Search, have to parse out |objectId|relId|
              StringTokenizer strTokens = new StringTokenizer(emxTableRowId[i],"|");
              if ( strTokens.hasMoreTokens())
              {
                  selectedId = strTokens.nextToken();
                  Map idMap = new HashMap();
                  idMap.put(DomainConstants.SELECT_ID, selectedId);
                  if("true".equalsIgnoreCase(disableRootSelection)){
                      idMap.put("level", "0");              
                  }
                  mlSearchResults.add(idMap);
              }
            }
        }
        
        String strExpandLevelFilter = "";
        if(programMap.get("emxExpandFilter")!=null){
        	strExpandLevelFilter = (String)programMap.get("emxExpandFilter");
        }

        String strEffType = "";
        if(programMap.get("effectivityType")!=null){
        	strEffType = (String)programMap.get("effectivityType");
        }
        
        if(strExpandLevelFilter.equals("All") && strEffType.equalsIgnoreCase("Milestone")){
	    	 MapList returnList = new MapList();
	    	 returnList=getConfigContextMilestoneTracks(context, args);
	 		 mlSearchResults.addAll(returnList);
        	
        }

        return mlSearchResults;
    }
    /**
     * Returns a MapList of selected Ids from full search results
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        RequestValuesMap HashMap of request values - emxTableRowId
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getSelectorSearchResults(Context context, String[]args)
        throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
        HashMap requestMap=(HashMap)programMap.get("RequestValuesMap");
        String disableRootSelection = (String)programMap.get("disableRootSelection");
        MapList mlSearchResults = new MapList();

        String[] emxTableRowId = (String[]) requestMap.get("EFFTableRowId");
        String selectedId;
        for (int i=0; i < emxTableRowId.length; i++ )
        {
          //if this is coming from the Full Text Search, have to parse out |objectId|relId|
          StringTokenizer strTokens = new StringTokenizer(emxTableRowId[i],"|");
          if ( strTokens.hasMoreTokens())
          {
              selectedId = strTokens.nextToken();
              Map idMap = new HashMap();
              idMap.put(DomainConstants.SELECT_ID, selectedId);
              if("true".equalsIgnoreCase(disableRootSelection)){
            	  idMap.put("disableSelection", "true");
              }

              mlSearchResults.add(idMap);
          }
        }

        return mlSearchResults;
    }

    /**
     * Gets the Item Effectivity Expression Column for table display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        objectList MapList of object IDs
     *        paramList HashMap of parameter values
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public Vector getItemEffectivityExpressionColumn(Context context, String[]args)
        throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
	MapList objectList = (MapList)programMap.get("objectList");
	HashMap params = (HashMap)programMap.get("paramList");

	String exportFormat="";
	boolean exportToExcel=false;
	if(params!=null && params.containsKey("reportFormat")){
		exportFormat = (String)params.get("reportFormat");
	}
	if("CSV".equalsIgnoreCase(exportFormat)){
		exportToExcel = true;
	}

	double timezone = (new Double((String)params.get("timeZone"))).doubleValue();
        Vector exprVector = new Vector(objectList.size());
	Iterator exprListItr = objectList.iterator();
	EffectivityFramework ef = new EffectivityFramework();
	String displayValue = "";
	CharSequence csInfDisp = ef.getInfinitySymbolDisplay(context);
	CharSequence csInfKeyIn = ef.getInfinitySymbolKeyIn(context);

	MapList expressionMap =  ef.getObjectExpression(context, objectList, timezone, true);

	for (int idx = 0; idx < expressionMap.size(); idx++)
	{
	    Map exprMap = (Map)expressionMap.get(idx);
	    displayValue = (String)exprMap.get(EffectivityFramework.DISPLAY_VALUE);
	    if (exportToExcel) {
	    	if (displayValue.contains(csInfDisp)) {
	    		displayValue = displayValue.replace(csInfDisp, csInfKeyIn);
	    	}
	    }
        exprVector.add(displayValue);
	}
	return exprVector;
    }
    /**
     * Gets the Structure Effectivity Expression Column for table display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        objectList MapList of object IDs
     *        paramList HashMap of parameter values
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public Vector getStructureEffectivityExpressionColumn(Context context, String[]args)
        throws Exception
    {
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	MapList objectList = (MapList)programMap.get("objectList");
    	HashMap params = (HashMap)programMap.get("paramList");

    	String exportFormat="";
    	boolean exportToExcel=false;
    	if(params!=null && params.containsKey("reportFormat")){
    		exportFormat = (String)params.get("reportFormat");
    	}
    	if("CSV".equalsIgnoreCase(exportFormat)){
    		exportToExcel = true;
    	}

    	double timezone = (new Double((String)params.get("timeZone"))).doubleValue();
    	Vector exprVector = new Vector(objectList.size());
    	Iterator exprListItr = objectList.iterator();
    	EffectivityFramework ef = new EffectivityFramework();
    	String displayValue = "";
    	CharSequence csInfDisp = ef.getInfinitySymbolDisplay(context);
    	CharSequence csInfKeyIn = ef.getInfinitySymbolKeyIn(context);

    	String styleSheetDisplay = FrameworkProperties.getProperty(context, "emxEffectivity.Display.UseStyleSheetFormat");
    	MapList expressionMap = null;

    	if (Boolean.valueOf(styleSheetDisplay))
    	{
    		//check if effectivity data has already been selected
    		Map dataMap = (Map)objectList.get(0);
    		boolean containsEFFData = dataMap.containsKey(EffectivityFramework.SELECT_ATTRIBUTE_EFFECTIVITY_COMPILED_FORM);

    		if (!containsEFFData)
    		{
    			StringList relidList = new StringList();
    			for (int i = 0; i < objectList.size(); i++)
    			{
    				String id = (String)((Map)objectList.get(i)).get(DomainRelationship.SELECT_RELATIONSHIP_ID);
    				if (id != null && !id.isEmpty())
    				{
    					relidList.add(id);
    				}
    			}
    			String[] relIds = Arrays.copyOf(relidList.toArray(),relidList.size(), String[].class);
    			expressionMap =  ef.getRelExpression(context, relIds, EffectivityFramework.CURRENT_VIEW);

    		}
    		else
    		{
    			expressionMap =  ef.getRelExpression(context, objectList, EffectivityFramework.CURRENT_VIEW);
    		}
    	}
    	else    	
    	{
    		expressionMap =  ef.getRelExpression(context, objectList, timezone, true);
    	}

    	for (int idx = 0; idx < expressionMap.size(); idx++)
    	{
    		Map exprMap = (Map)expressionMap.get(idx);
    		displayValue = (String)exprMap.get(EffectivityFramework.DISPLAY_VALUE);
    		if (exportToExcel) {
    			if (displayValue.contains(csInfDisp)) {
    				displayValue = displayValue.replace(csInfDisp, csInfKeyIn);
    			}
    		}
    		exprVector.add(displayValue);
    	}
    	return exprVector;
    }
    /**
     * New API in Old Effectivity Method
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    /*public Vector getStructureEffectivityExpressionColumn(Context context, String[]args)
            throws Exception{
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);	   
    	MapList objectList = (MapList)programMap.get("objectList");
    	HashMap params = (HashMap)programMap.get("paramList");
        HashMap reqMap = (HashMap)params.get("RequestValuesMap");
    	String parentOID = (String)params.get("parentOID");
    	DomainObject DOMObj = DomainObject.newInstance(context, parentOID);   	
        Vector exprVector = new Vector(objectList.size());

    	for(int i=0;i<objectList.size();i++) {
    	   	
    		Map tempMap = (Map)objectList.get(i);
    		String strConnectionID = (String) tempMap.get(DomainRelationship.SELECT_ID);	
    		if(strConnectionID!=null && !strConnectionID.isEmpty()) {
            	StringList selects = ConfigFilterablesFactory.getNecessarySelectsForRelationshipToConfigure();
            	RelationshipWithSelect rel1 = (Relationship.getSelectRelationshipData( context, new String[] {strConnectionID}, selects )).getElement(0); 
        	    INavBusProvider navBusProvider = NavigationServicesProvider.getNavBusProvider();                                   
        	    INavBusConnection navBusConnection = navBusProvider.createNavBusConnection( context, rel1 );
        	    IConfigFilterablesFactory factory = ConfigFilterablesFactory.getConfigFilterablesFactory( context );
        	    IConfigNavFilterable instanceToConfigure = factory.createFilterable( context, navBusConnection );  
    		    IFilterableExpression filterableExpression = instanceToConfigure.getEffectivity( context );
    		    try {
            	String XMLExpression = filterableExpression.getExpression( context, CfgDomain.CFG_DOMAIN_CONFIG_CHANGE, EnumTypeExpr.TypeXSLTransformed, CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, false );
            	exprVector.add(XMLExpression);
    		    }
    		    catch(Exception e)
    		    {
    		    	exprVector.add("");
    		    	e.printStackTrace();
    		    	//e.printStackTrace();
    		    }
    		} else {
    			exprVector.add("");
    		}  	
    	}
    	
    	return exprVector;
    }*/

    /**
     * This method is invocked by the RelationshipEffectivityUsageDeleteCheck trigger
     * to allow the deletion of the rel only if it is being deleted programmatically
     *
     * @param context the eMatrix <code>Context</code> object
     * @return
     * @throws Exception throws exception if the operation fails
     * @since CFF R209
     */
    public int checkRPEForEffectivityUsageDelete(Context context, String[]args) throws Exception
    {
        // Get the RPE variable MX_ALLOW_EFFECTIVITY_USAGE_DELETE, if it is not null and equal to "true"
        // it indicates that the relationship is being deleted programmatically via an update to the expression therefore
       // we should allow the delete.  In all other cases we should disallow the delete.
        String allowDelete = PropertyUtil.getRPEValue(context, " MX_ALLOW_EFFECTIVITY_USAGE_DELETE ", false);
        if(allowDelete!= null && "true".equals(allowDelete))
        {
            return 0;
        }
       else
            return 1;
    }
    /** This method returns the sequenceSelectable for the CFFDefinition Table
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public Vector getSequenceSelectable(Context context, String[] args) throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	MapList objectList = (MapList)programMap.get("objectList");
    	HashMap params = (HashMap)programMap.get("paramList");
    	String effType = (String)params.get("effectivityType");
        Vector seqSelectableVector = new Vector(objectList.size());
        EffectivityFramework ef = new EffectivityFramework();
        Map cmdSettings = ef.getEffectivityTypeSettings(context);
        Map cmdMap = (Map)cmdSettings.get(effType);
        String SequenceSelectable = (String)cmdMap.get(ef.CMD_SETTING_SEQUENCESELECTABLE);
        String strVal = null;
        DomainObject dom =  null;
        String strObjId  = null;
        for(int idx = 0; idx < objectList.size(); idx++)
        {
        	Map mpObj = (Map)objectList.get(idx);
        	strObjId = (String)mpObj.get("id");
            dom = new DomainObject(strObjId);
        	strVal = (String)dom.getInfo(context, SequenceSelectable);
        	seqSelectableVector.add(strVal);
        }
    	return seqSelectableVector;
    }

    /** This method returns the context Ids to be pre-populated from the effectivity expression in the  CFFDefinition Table
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments
     *        effectivityExpression: the actual effectivity expression from which the context Ids have to be retrieved
     *        effectivityType: the currently chosen effectivity type in the EffectivityDefinitionDialog
     * @return returns MapList containing the contextIds from the actual expression
     * @throws Exception
     */
@com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getContextsFromExpression(Context context, String[] args)throws Exception
    {
    	MapList ContextOIdsList = new MapList();

    	//1. unpack the arguments
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);

    	//2. retrieve the actual expression from the parameters
    	String sActualExpression = (String)programMap.get("effectivityExpression");

    	if(sActualExpression.trim().isEmpty())
    		return ContextOIdsList;

    	//3. Retrieve the effectivity type from the parameters
    	String sEffType = (String)programMap.get("effectivityType");

    	//4. create the Effectivity Framework bean
    	EffectivityFramework Eff = new EffectivityFramework();

    	//5. get the context physical ids from the actual expression
    	StringList sPhysicalIdList = Eff.getEffectivityUsage(context, sActualExpression, sEffType);

        //6. create the MapList to be returned
    	for(int i = 0; i < sPhysicalIdList.size(); i++)
        {
    	   Map idMap = new HashMap();
           idMap.put(DomainConstants.SELECT_ID, sPhysicalIdList.get(i));
           ContextOIdsList.add(idMap);
    	}
        return ContextOIdsList;
    }

    /**
     * Displays the Effectivity as a filter
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values - fieldMap
     *        requestMap HashMap of request values - objectId, relId, mode, form
     *        fieldMap HashMap of field values - name
     *
     * @throws Exception if the operation fails
     * @since CFF R210
     */
    public String getEffectivityFilterDisplay(Context context, String[]args)
        throws Exception
    {
	   HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap paramMap   = (HashMap)programMap.get("paramMap");
	   HashMap requestMap= (HashMap)programMap.get("requestMap");
	   String objectId = (String)requestMap.get("objectId");
	   String relID = (String)requestMap.get("relId");
	   double timezone = (new Double((String)requestMap.get("timeZone"))).doubleValue();
	   String mode = (String)requestMap.get("mode");
	   String formName = (String)requestMap.get("form");
           HashMap fieldMap   = (HashMap)programMap.get("fieldMap");
	   String fieldName = (String)fieldMap.get("name");
	   EffectivityFramework EFF = new EffectivityFramework();
	   StringBuffer sb = new StringBuffer(100);
	   String actualValue = "";
	   String displayValue = "";
	   String strObjectId = "";
	   String strParentId = "";
	   String parentOID = "";
	   String strAmp = "";
	   if (mode != null && mode.equalsIgnoreCase("custom"))
	   {
	       ;  // use formname passed in
	   }
	   else if (mode != null && mode.equalsIgnoreCase("edit"))
	   {
	       formName = "editDataForm";
	       strAmp = "&";
	   }
	   else // null mode means create form
	   {
	       formName = "emxCreateForm";
	       strAmp = "&amp;";
	   }
	   if (relID != null && !relID.equals("null") && relID.length() > 0)
	   {
	       String[] relIds = new String[1];
	       relIds[0] = relID;
	       StringList relSelects = new StringList(1);
	       relSelects.add(DomainConstants.SELECT_FROM_ID);
	       //DomainRelationship relObj = new DomainRelationship(relID);
	       MapList mp = DomainRelationship.getInfo(context, relIds, relSelects);
	       //MapList mp = relObj.getInfo(context, relIds, relSelects);
	       parentOID = (String)((Map)mp.get(0)).get(DomainConstants.SELECT_FROM_ID);
	   }
	   Map mapExpression = null;
	   StringList listValue = new StringList();
	   StringList listValueActual = new StringList();
	   StringBuffer sbListValue = new StringBuffer();

	   strObjectId = "objectId=" + objectId;
	   strParentId = "parentOID=" + parentOID;
	   String quoteSeparatedIds = "";//strListValue.substring(0, strListValue.length());
	   String strListValueAc = ""; //sbListValue.toString();
	   String quoteSeparatedIdsAc = strListValueAc.substring(0, strListValueAc.length());
	   String fieldNameActual = fieldName + "Actual";
	   String fieldNameList = fieldName + "List";
	   String fieldNameListAc = fieldName + "ListAc";
	   String fieldNameOID = fieldName + "OID";

           String effectivityURL = "../effectivity/EffectivityDefinitionDialog.jsp?modetype=filter"+strAmp+"invockedFrom=fromForm"+strAmp+"formName=" + formName + strAmp + strObjectId+ strAmp + strParentId + strAmp + "fieldNameEffExprDisplay=" + fieldName + strAmp + "fieldNameEffExprActual="+fieldNameActual+strAmp+"fieldNameEffExprActualListAc="+fieldNameList+strAmp+"fieldNameEffExprActualList="+fieldNameListAc+strAmp+"fieldNameEffExprOID="+fieldNameOID;
           String cffParams = cffParams(requestMap,mode);
           effectivityURL = effectivityURL.concat(cffParams);
           sb.append(" <script src='../common/scripts/emxUIModal.js'> </script> ");
           sb.append(" <script src='../emxUIPageUtility.js'> </script> ");
           sb.append("<script> ");
           sb.append("function showEffectivityExpressionDialog() { ");
           sb.append(" emxShowModalDialog(\"");
           sb.append(effectivityURL);
           sb.append("\",700,500);");
           sb.append("}");
           sb.append("</script>");
           sb.append("<textarea name=\"");
           sb.append(fieldName);
           sb.append("\" size=\"20");
           sb.append("\" readonly=\"readonly\" >");
           sb.append(displayValue);
           sb.append("</textarea>");
           sb.append("<a href=\"javascript:showEffectivityExpressionDialog()\">");
           sb.append("<img src=\"../common/images/iconActionEdit.gif\" border=\"0\"/></a>");
           sb.append("<input type=\"hidden\" name=\"");
           sb.append(fieldNameActual);
           sb.append("\" value=\"");
           sb.append(actualValue);
           sb.append("\" />");
           sb.append("<input type=\"hidden\" name=\"");
           sb.append(fieldNameList);
           sb.append("\" value=\"");
           sb.append(quoteSeparatedIds);
           sb.append("\" />");
           sb.append("<input type=\"hidden\" name=\"");
           sb.append(fieldNameListAc);
           sb.append("\" value=\"");
           sb.append(quoteSeparatedIdsAc);
           sb.append("\" />");
           sb.append("<input type=\"hidden\" name=\"");
           sb.append(fieldNameOID);
           sb.append("\" value=\"\" />");
	   return sb.toString();
    }

    /**
     * Gets the Structure Effectivity Expression Column for table display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        objectList MapList of object IDs
     *        paramList HashMap of parameter values
     *
     * @throws Exception if the operation fails
     * @since CFF R210
     */
    public Vector getProposedStructureEffectivityColumn(Context context, String[]args)
        throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
	MapList objectList = (MapList)programMap.get("objectList");
	HashMap params = (HashMap)programMap.get("paramList");
	double timezone = (new Double((String)params.get("timeZone"))).doubleValue();
        Vector exprVector = new Vector(objectList.size());
	Iterator exprListItr = objectList.iterator();
	EffectivityFramework ef = new EffectivityFramework();
	String displayValue = "";

	MapList expressionMap =  ef.getRelProposedExpression(context, objectList, timezone, true);

	for (int idx = 0; idx < expressionMap.size(); idx++)
	{
	    Map exprMap = (Map)expressionMap.get(idx);
	    displayValue = (String)exprMap.get(EffectivityFramework.DISPLAY_VALUE);
            exprVector.add(displayValue);
	}
	return exprVector;
    }

    /**
     * Gets the Structure Effectivity Expression Column for table display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        objectList MapList of object IDs
     *        paramList HashMap of parameter values
     *
     * @throws Exception if the operation fails
     * @since CFF R210
     */
    public Vector getCurrentStructureEffectivityColumn(Context context, String[]args)
        throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
	MapList objectList = (MapList)programMap.get("objectList");
	HashMap params = (HashMap)programMap.get("paramList");
	double timezone = (new Double((String)params.get("timeZone"))).doubleValue();
        Vector exprVector = new Vector(objectList.size());
	Iterator exprListItr = objectList.iterator();
	EffectivityFramework ef = new EffectivityFramework();
	String displayValue = "";

	MapList expressionMap =  ef.getRelExpression(context, objectList, timezone, true);

	for (int idx = 0; idx < expressionMap.size(); idx++)
	{
	    Map exprMap = (Map)expressionMap.get(idx);
	    displayValue = (String)exprMap.get(EffectivityFramework.DISPLAY_VALUE);
            exprVector.add(displayValue);
	}
	return exprVector;
    }
    /**
     * Displays the Effectivity Expression field for a Change
     *    - used from the create form context
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values - fieldMap
     *        requestMap HashMap of request values - objectId, mode, form
     *
     * @throws Exception if the operation fails
     * @since CFF R210
     */
    public String getEffectivityOnChangeCreate(Context context, String[]args)
        throws Exception
    {
	   HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap paramMap   = (HashMap)programMap.get("paramMap");
	   HashMap requestMap= (HashMap)programMap.get("requestMap");
	   String objectId = (String)requestMap.get("objectId");
	   double timezone = (new Double((String)requestMap.get("timeZone"))).doubleValue();
	   String mode = (String)requestMap.get("mode");
	   String formName = (String)requestMap.get("form");
           HashMap fieldMap   = (HashMap)programMap.get("fieldMap");
	   String fieldName = (String)fieldMap.get("name");
	   EffectivityFramework EFF = new EffectivityFramework();
	   StringBuffer sb = new StringBuffer(100);
	   String actualValue = "";
	   String displayValue = "";
	   String quoteSeparatedIds = null;
	   String quoteSeparatedIdsAc = null;
	   Map mapExpression = null;
	    //for create form
           mode = "create";
           formName = "emxCreateForm";
       String field =  (String)fieldMap.get("name");

	   String symType = (String)requestMap.get("type");
	   String typeName = PropertyUtil.getSchemaProperty(context,symType);
	   String effTypes = "";
	   try
	   {
	       //First try to get Owning Application property for the type
	        String owningApp = FrameworkUtil.getTypeApplicationName(context, typeName);
	        if (owningApp == null || owningApp.length() <=0)
	        {
	            //if no owning application is set, then use the suiteDirectory
	            owningApp = (String)requestMap.get("SuiteDirectory");
	        }
	        Object domObj = (Object)DomainObject.newInstance(context, typeName, owningApp);
	        com.matrixone.apps.common.IEffectivityOnChange effInt = (com.matrixone.apps.common.IEffectivityOnChange)domObj;
	        effTypes = effInt.getGovernedEffectivity(context);
	   }
	   catch (Exception ex)
	   {
	       //this type does not implement Effectivity interface, do not show any effectivity types.
	       effTypes = "";
	   }
	   Map effType = null;
	   MapList mlEffectivityTypes = EFF.getEffectivityTypeData(context, effTypes);

	   String createEffectivityURL = "../effectivity/EffectivityDefinitionDialog.jsp?modetype=create&amp;invockedFrom=fromForm&amp;formName=" + formName + "&amp;parentOID=" + objectId + "&amp;fieldNameEffExprDisplay="+field+"&amp;fieldNameEffExprActual="+field+"OID&amp;fieldNameEffTypes=effTypes&amp;fieldNameEffExprActualListAc="+field+"ActualListAc&amp;fieldNameEffExprActualList="+field+"ActualList";
	   String cffParams = cffParams(requestMap,"create");
	   createEffectivityURL = createEffectivityURL.concat(cffParams);
	   if (mode != null && mode.equalsIgnoreCase("create"))
	   {
	       //sb.append(" <script src='../common/scripts/emxUIModal.js'> </script> ");
	       sb.append(" <script src='../emxUIPageUtility.js'> </script> ");
	       sb.append("<script> ");
	       sb.append("function showEffectivityExpressionDialog() { ");
	       sb.append(" emxShowModalDialog(\"");
	       sb.append(createEffectivityURL);
	       sb.append("\",700,500);");
	       sb.append("}");
	       sb.append("</script>");
	       sb.append("<textarea name=\""+XSSUtil.encodeForHTMLAttribute(context, field)+"\" size=\"20\" value=\"");
	       sb.append(XSSUtil.encodeForHTMLAttribute(context, displayValue));
	       sb.append("\" readonly=\"readonly\" ></textarea>");
	       sb.append("<a href=\"javascript:showEffectivityExpressionDialog()\">");
	       sb.append("<img src=\"../common/images/iconActionEdit.gif\" border=\"0\"/></a>");
	       sb.append("<input type=\"hidden\" name=\""+XSSUtil.encodeForHTMLAttribute(context, field)+"OID\" value=\"");
	       sb.append(XSSUtil.encodeForHTMLAttribute(context, actualValue));
	       sb.append("\" />");
	       sb.append("<input type=\"hidden\" name=\""+XSSUtil.encodeForHTMLAttribute(context, field)+"ActualList\" value=\"");
	       sb.append(XSSUtil.encodeForHTMLAttribute(context, quoteSeparatedIds));
	       sb.append("\" />");
	       sb.append("<input type=\"hidden\" name=\""+XSSUtil.encodeForHTMLAttribute(context, field)+"ActualListAc\" value=\"");
	       sb.append(XSSUtil.encodeForHTMLAttribute(context, quoteSeparatedIdsAc));
	       sb.append("\" />");

	       if (!mlEffectivityTypes.isEmpty())
	       {
		   for (int i=0; i < mlEffectivityTypes.size(); i++)
		   {
		       if (i > 0)
		       {   //append a newline
			   sb.append("<br/>");
		       }
		       effType = (Map)mlEffectivityTypes.get(i);
		       actualValue = (String)effType.get(EffectivityFramework.ACTUAL_VALUE);
		       displayValue = (String)effType.get(EffectivityFramework.DISPLAY_VALUE);
		       sb.append("<input type=\"checkbox\" name=\"effTypes\" style=\"display:none;\" checked=\"checked\" value=\"" );
		       sb.append(XSSUtil.encodeForHTMLAttribute(context, actualValue));
		       sb.append("@displayactual@");
		       //XSS OK
		       sb.append(displayValue);
		       sb.append("\"/>");
		   }
	       }
	   }
	   return sb.toString();
    }

    /**
     * Displays the Effectivity Expression field for a Change
     *     - used from the Edit/Properties form
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values - fieldMap
     *        requestMap HashMap of request values - objectId, mode, form
     *
     * @throws Exception if the operation fails
     * @since CFF R210
     */
    public String getEffectivityOnChangeDisplay (Context context, String[]args)
        throws Exception
    {
	   HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap paramMap   = (HashMap)programMap.get("paramMap");
	   HashMap requestMap= (HashMap)programMap.get("requestMap");
	   String objectId = (String)requestMap.get("objectId");
	   double timezone = (new Double((String)requestMap.get("timeZone"))).doubleValue();
	   String mode = (String)requestMap.get("mode");
	   String formName = (String)requestMap.get("form");
           HashMap fieldMap   = (HashMap)programMap.get("fieldMap");
	   String fieldName = (String)fieldMap.get("name");
	   EffectivityFramework EFF = new EffectivityFramework();
	   StringBuffer sb = new StringBuffer(100);
	   String actualValue = "";
	   String displayValue = "";
	   String strObjectId = "";
	   String strParentId = "";
	   String parentOID = "";
	   String field = null;
	   field = (String)fieldMap.get("name");
	   String effTypes = "";
	   try
	   {
	       String symType = (String)requestMap.get("type");
	       String typeName = PropertyUtil.getSchemaProperty(context,symType);

	       //First try to get Owning Application property for the type
	        String owningApp = FrameworkUtil.getTypeApplicationName(context, typeName);
	        if (owningApp == null || owningApp.length() <=0)
	        {
	            //if no owning application is set, then use the suiteDirectory
	            owningApp = (String)requestMap.get("SuiteDirectory");
	        }
	       Object domObj = (Object)DomainObject.newInstance(context, typeName, owningApp);
	       com.matrixone.apps.common.IEffectivityOnChange effInt = (com.matrixone.apps.common.IEffectivityOnChange)domObj;
	       effTypes = effInt.getGovernedEffectivity(context);
	   }
	   catch (Exception ex)
	   {
	       //this type does not implement Effectivity interface, do not show any effectivity types.
	       effTypes = "";
	   }
	   Map effType = null;
	   MapList mlEffectivityTypes = EFF.getEffectivityTypeData(context, effTypes);

	   Map mapExpression = null;
	   //TODO remove temp code of hardcoded form name - should be passed in by BPS edit form
	   formName = "editDataForm";
	   StringList listValue = new StringList();
	   StringList listValueActual = new StringList();
	   StringBuffer sbListValue = new StringBuffer();

	   MapList mlObjectExpression = EFF.getEffectivityOnChange(context, objectId);
	   mapExpression = (Map)mlObjectExpression.get(0);
	   actualValue = (String)mapExpression.get(EffectivityFramework.ACTUAL_VALUE);
	   displayValue = (String)mapExpression.get(EffectivityFramework.DISPLAY_VALUE);
	   listValue = (StringList)mapExpression.get(EffectivityFramework.LIST_VALUE);
	   for(int i=0;i<listValue.size();i++)
	   {
	     sbListValue.append(listValue.get(i));
	     sbListValue.append("@delimitter@");
	   }
	   String strListValue = sbListValue.toString();
	   sbListValue.delete(0, sbListValue.length());
	   listValueActual = (StringList)mapExpression.get(EffectivityFramework.LIST_VALUE_ACTUAL);
	   for(int i=0;i<listValueActual.size();i++)
	   {
	     sbListValue.append(listValueActual.get(i));
	     sbListValue.append("@delimitter@");
	   }
	   strObjectId = "&objectId=" + XSSUtil.encodeForHTMLAttribute(context,objectId);
	   strParentId = "&parentOID=" + XSSUtil.encodeForHTMLAttribute(context,parentOID);
	   String quoteSeparatedIds = strListValue.substring(0, strListValue.length());
	   String strListValueAc = sbListValue.toString();
	   String quoteSeparatedIdsAc = strListValueAc.substring(0, strListValueAc.length());

	   String editEffectivityURL = "../effectivity/EffectivityDefinitionDialog.jsp?modetype=edit" + strObjectId + strParentId +"&formName=" + formName + "&fieldNameEffExprDisplay="+field+"&fieldNameEffExprActual="+field+"OID&fieldNameEffExprActualListAc="+field+"ActualListAc&fieldNameEffExprActualList="+field+"ActualList&fieldNameEffTypes=effTypes";
	   String cffParams = cffParams(requestMap,"edit");
	   editEffectivityURL = editEffectivityURL.concat(cffParams);
	   if (mode != null && mode.equalsIgnoreCase("edit"))
	   {
		   //Added for making Effectivity field readonly in edit mode for Mobile env
		   if(UINavigatorUtil.isMobile(context)){
			   sb.append(XSSUtil.encodeForHTML(context,displayValue));
		   }
		   else{
		   //sb.append(" <script src='../common/scripts/emxUIModal.js'> </script> ");
	       sb.append(" <script src='../emxUIPageUtility.js'> </script> ");
	       sb.append("<script> ");
	       sb.append("function showEffectivityExpressionDialog() { ");
	       sb.append(" emxShowModalDialog(\"");
	       sb.append(editEffectivityURL);
	       sb.append("\",700,500);");
	       sb.append("}");
	       sb.append("</script>");
	       sb.append("<textarea name=\""+field+"\" size=\"20");
	       sb.append("\" readonly=\"readonly\" >");
	       sb.append(XSSUtil.encodeForHTML(context,displayValue));
	       sb.append("</textarea>");
	       sb.append("<a href=\"javascript:showEffectivityExpressionDialog()\">");
	       sb.append("<img src=\"../common/images/iconActionEdit.gif\" border=\"0\"/></a>");
	       sb.append("<input type=\"hidden\" name=\""+field+"OID\" value=\"");
	       sb.append(XSSUtil.encodeForHTMLAttribute(context,actualValue));
	       sb.append("\" />");
	       sb.append("<input type=\"hidden\" name=\""+field+"ActualList\" value=\"");
	       sb.append(quoteSeparatedIds);
	       sb.append("\" />");
	       sb.append("<input type=\"hidden\" name=\""+field+"ActualListAc\" value=\"");
	       sb.append(quoteSeparatedIdsAc);
	       sb.append("\" />");
	       if (!mlEffectivityTypes.isEmpty())
	       {
		   for (int i=0; i < mlEffectivityTypes.size(); i++)
		   {
		       if (i > 0)
		       {   //append a newline
			   sb.append("<br/>");
		       }
		       effType = (Map)mlEffectivityTypes.get(i);
		       actualValue = (String)effType.get(EffectivityFramework.ACTUAL_VALUE);
		       displayValue = (String)effType.get(EffectivityFramework.DISPLAY_VALUE);
		       sb.append("<input type=\"checkbox\" name=\"effTypes\" style=\"display:none;\" checked=\"checked\" value=\"" );
		       sb.append(XSSUtil.encodeForHTMLAttribute(context,actualValue));
		       sb.append("@displayactual@");
		       sb.append(XSSUtil.encodeForHTML(context,displayValue));
		       sb.append("\"/>");
		   }
	       }
           }
	   }
	   else //view mode only display expression
	   {
	       sb.append(XSSUtil.encodeForHTML(context,displayValue));
	   }
	   return sb.toString();
    }

    /**
     * Updates the effectivity expression for a Change object.
     * Called as the update method for the create and edit form of a change type.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values- objectId, New Value
     * @return Object - boolean true if the operation is successful
     * @throws Exception if the operation fails
     * @since CFF R210
     */
    public Object updateEffectivityOnChange(Context context,
	    String[] args)
        throws Exception
    {
        Map programMap = (HashMap) JPO.unpackArgs(args);
        Map paramMap = (HashMap) programMap.get("paramMap");
        Map requestMap = (HashMap) programMap.get("requestMap");
        Map fieldMap = (HashMap) programMap.get("fieldMap");
        Map settingsMap = (HashMap) fieldMap.get("settings");
        String objectId = (String) paramMap.get("objectId");
        String[] suiteDirectory = (String[])requestMap.get("SuiteDirectory");
        String[] type = (String[])requestMap.get("type");
        Boolean requiredSetting = null;
        try
        {
        	requiredSetting = Boolean.parseBoolean((String)settingsMap.get("Required"));
        }
        catch(Exception e)
        {
        	requiredSetting = new Boolean(false);
        }
        Boolean isEffectivityMand = checkEffectivityRequired(context, suiteDirectory[0],type[0]);
        String newExpression = (String)paramMap.get("New OID"); //hidden formated expression
        if ((requiredSetting && isEffectivityMand) || (!requiredSetting && !isEffectivityMand))
        {
            EffectivityFramework ef = new EffectivityFramework();
            ef.setEffectivityOnChange(context, objectId, newExpression);
        }
        return new Boolean(true);
    }

    /**
     * Refreshes the Effectivity Proposed Expression for all operations under the change context
     * due to a changed in the Named Effectivity expression.
     *     Called from a modifyAttribute trigger on type Named Effectivity
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values- objectId, New Value
     * @return Object - boolean true if the operation is successful
     * @throws Exception if the operation fails
     * @since CFF R210
     */
    public Object refreshProposedEffectivity(Context context, String[] args)
        throws Exception
    {
	//get all relIds that are affected by this change
	EffectivityFramework eff = new EffectivityFramework ();
	String neObjId = args[0];
	DomainObject neObj = DomainObject.newInstance(context, neObjId);
	StringList objectSelects = new StringList(2);
	objectSelects.add(eff.SELECT_CHANGE_ID_FOR_NAMED_EFFECTIVITY);
	objectSelects.add(eff.SELECT_NAMED_EFFECTIVITY_USAGE_RELIDS);
   
   StringList mvList = new StringList();
	mvList.add(eff.SELECT_NAMED_EFFECTIVITY_USAGE_RELIDS);
	Map affectedRelMap = neObj.getInfo(context, objectSelects, mvList);
	//MapList affectedRelIds = neObj.getRelatedObjects(context, EffectivityFramework.RELATIONSHIP_NAMED_EFFECTIVITY_USAGE, "*", objectSelects, null, true, false, (short)1, null, null, 0);

	MapList affectedRelIds = new MapList();
	if (affectedRelMap != null && !affectedRelMap.isEmpty())
	{
	    StringList slRels = (StringList)affectedRelMap.get(eff.SELECT_NAMED_EFFECTIVITY_USAGE_RELIDS);
	    for (int i=0; slRels != null && i < slRels.size(); i++)
	    {
		Map relMap = new HashMap();
		relMap.put(DomainObject.SELECT_RELATIONSHIP_ID,slRels.get(i));

		affectedRelIds.add(relMap);
	    }
	}

	//refresh all the proposed expressions for the list of relIds
	if (affectedRelIds.size() > 0)
	{
	    //temporarily setchangeid so temp code in refresh can figure correct expression - should be removed when computeExpressionView is functional
	    eff.setChangeId((String)affectedRelMap.get(eff.SELECT_CHANGE_ID_FOR_NAMED_EFFECTIVITY));
	    eff.refreshProposedEffectivity(context, affectedRelIds);
	}

	return new Boolean(true);
    }

    /**
     * Adds the Named Effectivity Interface to the Named Effectivity Object.
     *    This is called as a create trigger on the Named Effectivity type.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        paramMap HashMap of parameter values- objectId, New Value
     * @return Object - boolean true if the operation is successful
     * @throws Exception if the operation fails
     * @since CFF R210
     */
    public Object addNamedEffectivityInterface(Context context, String[] args)
        throws Exception
    {
	String neObjId = args[0];

	EffectivityFramework.addNamedEffectivityInterface(context, neObjId);
	return new Boolean(true);
    }
    /**
     * Access function to show whether the field Effectivity is mandatory or not
     * @param context
     * @param args
     * @return true or false
     * @throws Exception
     */
    public boolean showMand(Context context, String[] args) throws Exception
    {
	Map programMap = (HashMap) JPO.unpackArgs(args);
	String symType = (String)programMap.get("type");
	String typeName = PropertyUtil.getSchemaProperty(context,symType);
	Boolean isEffectivityMand = null;
	
	//Added for removing effectivity field while creating CO for Mobile Mode
	String strMode = (String)programMap.get("mode");
	
	if(UINavigatorUtil.isMobile(context))
	{
		if(strMode != null && !strMode.equals("") && strMode.equalsIgnoreCase("create"))
			return false;
	}
	
	//First try to get Owning Application property for the type
	String owningApp = FrameworkUtil.getTypeApplicationName(context, typeName);
	if (owningApp == null || owningApp.length() <=0)
	{
	    //if no owning application is set, then use the suiteDirectory
	    owningApp = (String)programMap.get("SuiteDirectory");
	}
	isEffectivityMand = checkEffectivityRequired(context, owningApp,symType);

	String requiredSetting = null;
	requiredSetting = (String)((Map)programMap.get("SETTINGS")).get("Required");
	if(requiredSetting == null || requiredSetting.equalsIgnoreCase("false"))
	{
	    return !isEffectivityMand;
	}
	else
	{
	    return isEffectivityMand;
	}
    }
    /**
     * Returns whether the Effectivity field is required for this type
     * @param context
     * @param suiteDirectory String specifying the bean directory the the type belongs to
     * @param typeName String specifying the symbolic name of the type
     * @return true if the Effectivity field is requried, else return false
     * @throws Exception
     */
    private Boolean checkEffectivityRequired(Context context, String suiteDirectory, String typeName) throws Exception
    {
	String symType = PropertyUtil.getSchemaProperty(context,typeName);
	Boolean isEffReq = new Boolean(false);
	try
	{
	    Object domObj = (Object)DomainObject.newInstance(context, symType, suiteDirectory);
	    com.matrixone.apps.common.IEffectivityOnChange effInt = (com.matrixone.apps.common.IEffectivityOnChange)domObj;
	    isEffReq = effInt.isEffectivityRequired(context);
	}
	catch (Exception err)
	{
	    String errorMessage = EnoviaResourceBundle.getProperty(context, "Effectivity","Effectivity.Error.IEffectivityOnChangeNotImplemented",context.getSession().getLanguage());
	    emxContextUtil_mxJPO.mqlWarning(context, errorMessage);
	}
	return isEffReq;
    }

    /**
     * Delete the Named Effectivity object when the Change object is deleted.
     *     Called as delete action trigger on Named Effectivity relationship
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args String array holding the Named Effectivity objectId
     * @return Object - boolean true if the operation is successful
     * @throws Exception if the operation fails
     * @since CFF R210
     */
    public Object deleteNamedEffectivity(Context context, String[] args)
        throws Exception
    {
	Boolean bReturn = null;
	int status = 0;
	try
	{
	    status = EffectivityFramework.deleteNamedEffectivity(context, args);
	}
	catch (Exception err)
	{
	    status = 1;
	    throw err;
	}
	finally
	{
            bReturn = new Boolean(status==0);
	}
	return bReturn;
    }

    /**
     * Check if the context object is being used in an effectivity expression.  If it is
     * then do not allow the delete of the object.  This is a mandatory trigger that needs to
     * be set for all object Types that are being used in an effectivity sequence context.
     *
     * @param context the eMatrix <code>Context</code> object
     * @return int 0 for success and 1 for failure
     * @throws Exception throws exception if the operation fails
     * @since CFF R210
     */
   public int checkAllowEffectivityContextObjectDelete( Context context, String[] args ) throws Exception
   {
      ConfigTrace.TraceIn( "ConfigExpressionModeler", "checkAllowEffectivityContextObjectDelete" );
      int returnStatus = 0;
	   try
	   {
	      returnStatus = EffectivityFramework.checkAllowEffectivityContextObjectDelete( context, args );
	      if ( returnStatus == 1 )
	      {
		      String errorMessage = EnoviaResourceBundle.getProperty( context, "Effectivity", "Effectivity.Error.EffectivityUsageCannotDelete", context.getSession().getLanguage() );
            ConfigTrace.Trace( "ConfigExpressionModeler", "errorMessage : " + errorMessage );
	         emxContextUtil_mxJPO.mqlError( context, errorMessage );
	      }
	   }
	   catch( Exception err )
	   {
         ConfigTrace.TraceOut( "ConfigExpressionModeler" );
	      throw err;
	   }
      ConfigTrace.TraceOut( "ConfigExpressionModeler" );
	   return returnStatus;
   }

    /**
     * This is used as Edit Access Function for structure effectivity
     * column to set that cell as editable or not.
     * @param context
     * @param args
     * @return StringList contains boolean value which will decide weather cell is editable or not.
     * @throws Exception
     */
    public static StringList getCellLevelEditAccess(Context context, String args[])throws Exception
    {
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	MapList objectList = (MapList)programMap.get("objectList");
    	HashMap requestMap = (HashMap)programMap.get("requestMap");

    	String rootObjectId = (String)requestMap.get("objectId");
    	StringList returnStringList = new StringList (objectList.size());
    	Iterator objectItr = objectList.iterator();
    	while (objectItr.hasNext())
    	{
    		Map curObjectMap = (Map) objectItr.next();
    		String curObjectID = (String) curObjectMap.get("id");
    		boolean hasRelID = curObjectMap.containsKey(DomainRelationship.SELECT_ID);
    		String strLevel = (String) curObjectMap.get(DomainRelationship.SELECT_LEVEL);
    		
    		if(rootObjectId!=null && rootObjectId.equalsIgnoreCase(curObjectID)|| (UINavigatorUtil.isMobile(context))  /*|| (strLevel.equals("0"))||!hasRelID*/)
    		{
    			returnStringList.add(Boolean.toString(Boolean.FALSE));
    		}
    		else
    		{
    			returnStringList.add(Boolean.toString(Boolean.TRUE));
    		}
    	}
    	return returnStringList;
    }
    
    
    /**
     * This Function is used for Legacy Effectivity column edit access program
     * @param context
     * @param args
     * @param domain
     * @return
     * @throws Exception
     */
    public StringList legacyEffectivityEditAccess(Context context, String[]args)
            throws Exception
    {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);	   
    	MapList objectList = (MapList)programMap.get("objectList");
        StringList returnStringList = new StringList (objectList.size());
        Iterator objectItr = objectList.iterator();
        while (objectItr.hasNext()) {
             Map curObjectMap = (Map) objectItr.next();
             String chng = (String)curObjectMap.get("from.interface["+ PropertyUtil.getSchemaProperty(context,"interface_ChangeControl")+"]");
             if((chng==null) || (chng!=null && chng.equalsIgnoreCase("false"))){
                    returnStringList.add(Boolean.toString(Boolean.TRUE));
              }
              else{
                    returnStringList.add(Boolean.toString(Boolean.FALSE));
              }
        }
		return returnStringList;
     }
    
    public StringList variantColumnEditAccess(Context context, String[]args)
            throws Exception
    {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);	   
    	MapList objectList = (MapList)programMap.get("objectList");
        Vector exprVector = new Vector(objectList.size());
        SAXBuilder saxb = new SAXBuilder();
        StringList returnStringList = new StringList (objectList.size());

    	for(int i=0;i<objectList.size();i++) {
			Map tempMap = (Map)objectList.get(i);
			String strConnectionID = (String) tempMap.get(DomainRelationship.SELECT_ID);
			if(strConnectionID!=null && !strConnectionID.isEmpty()) {			
				try{
					//String strLevel = (String) tempMap.get(DomainRelationship.SELECT_LEVEL);	

		        	StringList selects = ConfigFilterablesFactory.getNecessarySelectsForRelationshipToConfigure();
		        	RelationshipWithSelect rel1 = (Relationship.getSelectRelationshipData( context, new String[] {strConnectionID}, selects )).getElement(0); 
		    	    INavBusProvider navBusProvider = NavigationServicesProvider.getNavBusProvider();                                   
		    	    INavBusConnection navBusConnection = navBusProvider.createNavBusConnection( context, rel1 );
		    	    IConfigFilterablesFactory factory = ConfigFilterablesFactory.getConfigFilterablesFactory( context );
		    	    IConfigNavFilterable instanceToConfigure = factory.createFilterable( context, navBusConnection );  
		    	    
		    	    if(instanceToConfigure!=null){
					    IFilterableExpression filterableExpression = instanceToConfigure.getEffectivity( context );
					    
					    if(instanceToConfigure.hasEffectivity(context)){
			    		    try {
									String XMLExpression = filterableExpression.getExpression( context, CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_VARIANT, EnumTypeExpr.TypeXML, CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, false );
								if(!XMLExpression.equals("")){
										String XMLExpression1 = filterableExpression.getExpression( context, CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_VARIANT, EnumTypeExpr.TypeXML, CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, false );
										
										Document document = document = saxb.build(new StringReader(XMLExpression1));
										Element root = document.getRootElement();
										Element expression = root.getChild("Expression", null);
										String strDomain = expression.getAttributeValue("Domain");
										
										if(!strDomain.equalsIgnoreCase("ConfigChange")){
											returnStringList.add(Boolean.toString(Boolean.TRUE));
										}
										else{
											returnStringList.add(Boolean.toString(Boolean.FALSE));
										}							
								}else{
									returnStringList.add(Boolean.toString(Boolean.TRUE));
								}		           
			    		    }
			    		    catch(Exception e)
			    		    {
			    		    	returnStringList.add(Boolean.toString(Boolean.FALSE));
			    		    }
					    }else {
					    	returnStringList.add(Boolean.toString(Boolean.TRUE));
					    }
		    	    }else{
		    	    	returnStringList.add(Boolean.toString(Boolean.FALSE));
		    	    }
				}catch (Exception e) {
					returnStringList.add(Boolean.toString(Boolean.FALSE));
				}
			}else {
				returnStringList.add(Boolean.toString(Boolean.TRUE));
			}  	
    	}
		return returnStringList;
     }

    private boolean allowVariantColumnToEdit(Context context, String parentId, String policyAllowedForMod) throws Exception {
		if (parentId == null || "".equals(parentId)) {
			return Boolean.TRUE;
		}
		
		else {
			String parentPolicy = DomainObject.newInstance(context, parentId).getInfo(context, DomainConstants.SELECT_POLICY);
			
			if (policyAllowedForMod == null || "".equals(policyAllowedForMod) || parentPolicy.equals(policyAllowedForMod)) {
				return Boolean.TRUE;
			} else {
				return Boolean.FALSE;
			}
		}
}
    
    private boolean allowVariantEditBasedOnPolicy(Context context, String strPolicy, String policyAllowedForMod) throws Exception {
		if (strPolicy == null || "".equals(strPolicy)) {
			return Boolean.TRUE;
		}
		else {
			if (strPolicy == null || "".equals(strPolicy) || strPolicy.equals(policyAllowedForMod)) {
				return Boolean.TRUE;
			} else {
				return Boolean.FALSE;
			}
		}
}
public StringList variantColumnEditAccessForProposedCurrent(Context context, String[]args)
        throws Exception
{
	HashMap programMap = (HashMap)JPO.unpackArgs(args);	   
	HashMap requestMap = (HashMap)programMap.get("requestMap");
	MapList objectList = (MapList)programMap.get("objectList");
    SAXBuilder saxb = new SAXBuilder();
    StringList returnStringList = new StringList (objectList.size());
    
    String allowVariantEditParentPolicy = (String) requestMap.get("allowVariantEditParentPolicy");
    if (allowVariantEditParentPolicy != null && !"".equals(allowVariantEditParentPolicy)) {
    	allowVariantEditParentPolicy = PropertyUtil.getSchemaProperty(context, allowVariantEditParentPolicy);
    }
    
    String DisableVariantEdit = (String) requestMap.get("DisableVariantEdit");
    if ( "true".equalsIgnoreCase(DisableVariantEdit) ) {
    	for(int i=0;i<objectList.size();i++) {
    		Map tempMap = (Map)objectList.get(i);
    		String strConnectionID = (String) tempMap.get(DomainRelationship.SELECT_ID);
    		if ( "true".equalsIgnoreCase(DisableVariantEdit) ) {
    			if ( strConnectionID == null || strConnectionID.isEmpty() ) {
    				returnStringList.add(Boolean.toString(allowVariantEditBasedOnPolicy(context, (String) tempMap.get("from.policy"), allowVariantEditParentPolicy)));

    			} else {
    				returnStringList.add(Boolean.toString(Boolean.FALSE));
    			}
    		}
    	}
    } else {
    	for(int i=0;i<objectList.size();i++) {
    		Map tempMap = (Map)objectList.get(i);
    		String strConnectionID = (String) tempMap.get("physicalid[connection]");
    		if(strConnectionID!=null && !strConnectionID.isEmpty()) {
    			returnStringList.add(Boolean.toString(allowVariantEditBasedOnPolicy(context, (String) tempMap.get("from.policy"), allowVariantEditParentPolicy)));   
    		}else {
    			returnStringList.add(Boolean.toString(Boolean.FALSE));
    		}
    	}
    }
	return returnStringList;
 }  

    public StringList evolutionColumnEditAccess(Context context, String[]args)
            throws Exception
    {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);	   
    	MapList objectList = (MapList)programMap.get("objectList");
        Vector exprVector = new Vector(objectList.size());
        SAXBuilder saxb = new SAXBuilder();
        StringList returnStringList = new StringList (objectList.size());

    	for(int i=0;i<objectList.size();i++) {
			Map tempMap = (Map)objectList.get(i);
			String strConnectionID = (String) tempMap.get(DomainRelationship.SELECT_ID);
			//String strLevel = (String) tempMap.get(DomainRelationship.SELECT_LEVEL);
			if(strConnectionID!=null && !strConnectionID.isEmpty()) {
				try{
		        	StringList selects = ConfigFilterablesFactory.getNecessarySelectsForRelationshipToConfigure();
		        	RelationshipWithSelect rel1 = (Relationship.getSelectRelationshipData( context, new String[] {strConnectionID}, selects )).getElement(0); 
		    	    INavBusProvider navBusProvider = NavigationServicesProvider.getNavBusProvider();                                   
		    	    INavBusConnection navBusConnection = navBusProvider.createNavBusConnection( context, rel1 );
		    	    IConfigFilterablesFactory factory = ConfigFilterablesFactory.getConfigFilterablesFactory( context );
		    	    IConfigNavFilterable instanceToConfigure = factory.createFilterable( context, navBusConnection );  
		    	    if(instanceToConfigure!=null){
					    IFilterableExpression filterableExpression = instanceToConfigure.getEffectivity( context );
					    
					    if(instanceToConfigure.hasEffectivity(context)){
			    		    try {
									String XMLExpression = filterableExpression.getExpression( context, CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_EVOLUTION, EnumTypeExpr.TypeXML, CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, false );
								if(!XMLExpression.equals("")){
										String XMLExpression1 = filterableExpression.getExpression( context, CfgDomain.CFG_DOMAIN_CONFIG_CHANGE_EVOLUTION, EnumTypeExpr.TypeXML, CfgExpressionView.CFG_EXPRVIEW_CURRENT, true, false );
										
										Document document = document = saxb.build(new StringReader(XMLExpression1));
										Element root = document.getRootElement();
										Element expression = root.getChild("Expression", null);
										String strDomain = expression.getAttributeValue("Domain");
										
										if(!strDomain.equalsIgnoreCase("ConfigChange")){
											returnStringList.add(Boolean.toString(Boolean.TRUE));
										}
										else{
											returnStringList.add(Boolean.toString(Boolean.FALSE));
										}							
								}else{
									returnStringList.add(Boolean.toString(Boolean.TRUE));
								}		           
			    		    }
			    		    catch(Exception e)
			    		    {
			    		    	returnStringList.add(Boolean.toString(Boolean.FALSE));
			    		    }
					    }else {
					    	returnStringList.add(Boolean.toString(Boolean.TRUE));
					    }	
		    	    }else{
		    	    	returnStringList.add(Boolean.toString(Boolean.FALSE));
		    	    }
				}catch (Exception e) {
					returnStringList.add(Boolean.toString(Boolean.FALSE));
				}
			}else {
				returnStringList.add(Boolean.toString(Boolean.TRUE));
			}  	
    	}
		return returnStringList;
     }
    
    
    public static StringList currentEvolutionEditAccess(Context context, String args[])throws Exception
    {
      HashMap programMap = (HashMap)JPO.unpackArgs(args);
      MapList objectList = (MapList)programMap.get("objectList");
      HashMap requestMap = (HashMap)programMap.get("requestMap");
      
      String strAppCEEditAcessProgram = (String)requestMap.get("appCEEditAccessProgram");
      String strAppCEEditAccessFunction = (String)requestMap.get("appCEEditAccessFunction");
      
      StringList returnStringList = new StringList (objectList.size());       
      
      if(UIUtil.isNotNullAndNotEmpty(strAppCEEditAcessProgram)){
            returnStringList = (StringList)(JPO.invoke(context, strAppCEEditAcessProgram, args, strAppCEEditAccessFunction,
                        args, StringList.class));
            
      }else{
            String rootObjectId = (String)requestMap.get("objectId");
            
            Iterator objectItr = objectList.iterator();
            while (objectItr.hasNext())
            {
                  Map curObjectMap = (Map) objectItr.next();
                  String curObjectID = (String) curObjectMap.get("id");
                  String chng = (String)curObjectMap.get("from.interface["+ PropertyUtil.getSchemaProperty(context,"interface_ChangeControl")+"]");
                  // TODO - get the getInfo on CurObjectID 
                  
                  
                  //if(rootObjectId!=null && rootObjectId.equalsIgnoreCase(curObjectID)|| (UINavigatorUtil.isMobile(context))/*||!hasRelID*/)
                 if((chng==null) || (chng!=null && rootObjectId!=null && chng.equalsIgnoreCase("false"))) /*||!hasRelID*/
                  {
                        //TODO - Support 
                        returnStringList.add(Boolean.toString(Boolean.TRUE));
                  }
                  else
                  {
                        returnStringList.add(Boolean.toString(Boolean.FALSE));
                  }
            }
      }
      
      return returnStringList;
    }



    /**
     * Returns a MapList of selected Ids from full search results when using relational effectivity Object View
     *   This will expand the selected objects and return a row for each parent/child pair
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        RequestValuesMap HashMap of request values - emxTableRowId
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public MapList getSelectorSearchResultsRelationalObjView(Context context, String[]args)
        throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
        HashMap requestMap=(HashMap)programMap.get("RequestValuesMap");
        MapList mlSearchResults = new MapList();
        String[] emxTableRowId = (String[]) requestMap.get("emxTableRowId");
        String selectedId;
        for (int i=0; i < emxTableRowId.length; i++ )
        {
          //if this is coming from the Full Text Search, have to parse out |objectId|relId|
          StringTokenizer strTokens = new StringTokenizer(emxTableRowId[i],"|");
          if ( strTokens.hasMoreTokens())
          {
              selectedId = strTokens.nextToken();
              Map resultMap = new HashMap();
              resultMap.put(DomainConstants.SELECT_ID, selectedId);
              mlSearchResults.add(resultMap);
          }
        }

        return mlSearchResults;
    }

    /**
     * Returns a MapList of selected Ids from full search results when using relational effectivity Relational View
     *   This will expand the selected objects and return a row for each parent/child pair
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        RequestValuesMap HashMap of request values - emxTableRowId
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getSelectorSearchResultsRelationalRelView(Context context, String[]args)
        throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
        HashMap requestMap=(HashMap)programMap.get("RequestValuesMap");
        MapList mlSearchResults = new MapList();

        String[] emxTableRowId = (String[]) requestMap.get("EFFTableRowId");
        String selectedId;
        for (int i=0; i < emxTableRowId.length; i++ )
        {
          //if this is coming from the Full Text Search, have to parse out |objectId|relId|
          StringTokenizer strTokens = new StringTokenizer(emxTableRowId[i],"|");
          if ( strTokens.hasMoreTokens())
          {
              selectedId = strTokens.nextToken();
              Map idMap = new HashMap();
              idMap.put(DomainConstants.SELECT_ID, selectedId);
              String strGlobalContextFO = (String)programMap.get("FromGlobalContextFO");
              if(strGlobalContextFO!=null
            		  && !strGlobalContextFO.equals("")
            		  && strGlobalContextFO.equalsIgnoreCase("true")){
            	  idMap.put("disableSelection","false"); //allow selection of root nodes for Global context Feature Option Effectivity when DV is present
              }else{
            	  idMap.put("disableSelection","true"); //do not allow selection of root nodes for relational effectivity
              }
              mlSearchResults.add(idMap);
          }
        }
        return mlSearchResults;
    }
    /**
     *
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds a packed hashmap with the following arguments
     *        RequestValuesMap HashMap of request values - emxTableRowId
     *
     * @throws Exception if the operation fails
     * @since CFF R209
     */
    public Vector getRelationalColumnName(Context context, String[]args)
        throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	MapList objectList = (MapList)programMap.get("objectList");
    	HashMap paramMap = (HashMap) programMap.get("paramList");
    	String catgoryType = (String) paramMap.get("effectivityType");
        Vector exprVector = new Vector(objectList.size());
	    EffectivityFramework EFF = new EffectivityFramework();

        String [] objectIdArray = new String[objectList.size()];
        String [] relIdArray = new String[objectList.size()];
        for (int i = 0; i < objectList.size(); i++)
        {
        	Map objectMap = (Map)objectList.get(i);
        	String strName = (String)objectMap.get("Name");
        	if (strName != null && !"null".equalsIgnoreCase(strName) && !"".equals(strName))
        	{
        		exprVector.add(strName);
        		continue;
        	}
        	String objectId = (String)objectMap.get(DomainObject.SELECT_ID);
        	String relId = (String)objectMap.get(DomainObject.SELECT_RELATIONSHIP_ID);
        	String parentId = (String)objectMap.get("from.physicalid");
        	//if (parentId == null || "null".equalsIgnoreCase(parentId) || "".equals(parentId))
        	//{
        	//	parentId = objectId;
        	//}
        	if (relId == null)
        	{
        		relId = "null";
        	}
        	if (parentId == null)
        	{
        		parentId = "null";
        	}
    	    JSONObject effObj = new JSONObject();
    		effObj.put("parentId", parentId);
    	    effObj.put("objId", objectId);
    	    effObj.put("relId", relId);
    	    String jsonString = effObj.toString();

    	    Map formatedExpr = EFF.formatExpression(context, catgoryType, jsonString);
    	    exprVector.add((String)formatedExpr.get(EFF.DISPLAY_VALUE));

 //       	objectIdArray[i] = objectId;
 //       	relIdArray[i] = relId;
        }
 //       StringList objectSelects = new StringList(DomainObject.SELECT_NAME);
 //       MapList objectMapList = DomainObject.getInfo(context, objectIdArray, objectSelects);

 //       StringList relSelects = new StringList("to.name");
 //       MapList relMapList = DomainRelationship.getInfo(context, relIdArray, relSelects);



//        for (int j = 0; j < objectMapList.size(); j++)
//        {
//        	Map objectMap = (Map)objectMapList.get(j);
//        	String objName = (String)objectMap.get(DomainObject.SELECT_NAME);
//        	Map relMap = (Map)relMapList.get(j);
//        	String toName = (String)relMap.get("to.name");
//        	String fullName = objName + "{" + toName + "}";
//        	exprVector.add(fullName);
//        }

        return exprVector;
    }


    /**
     * Thi is used
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
	public StringList getConfigurationContexts(Context context,
			String[] args) throws Exception {
		HashMap requestMap = (HashMap) JPO.unpackArgs(args);
		String strContextObjId = (String) requestMap.get("objectId");
		String strRelId;
		if(requestMap.containsKey("relId") && requestMap.get("relId")!= null){
			strRelId = (String) requestMap.get("relId");
			DomainRelationship domRel = new DomainRelationship(strRelId);
			Map tempMAp = domRel.getRelationshipData(context, new StringList("from.id"));
			strContextObjId = (String)((StringList) tempMAp.get("from.id")).get(0);
		}
		MapList configContextList = EffectivityFramework.getConfigurationContexts(context, strContextObjId);
		StringList strConfigContextList = new StringList(configContextList.size());
		for (Object configContextObjData : configContextList) {
			strConfigContextList.add((String)((Map)configContextObjData).get(DomainConstants.SELECT_ID));
		}
		return strConfigContextList;

	}

       /**
     * This method is used to populate Configuration Context Summary table
     * @param context
     * @param args
     * @return
     * @throws Exception
     * @since R214
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public static MapList getConfigurationContextObjects(Context context, String args[])throws Exception
    {
    	final String SELECT_PHYSICALID ="physicalid";
    	final String SELECT_ID ="id";
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	String strContextObjId = (String)programMap.get("objectId");
    	DomainObject domContextObj = new DomainObject(strContextObjId);
    	StringList selectableList = new StringList(SELECT_PHYSICALID);
    	Map tempMap = (Map) domContextObj.getInfo(context, selectableList);
    	String rootProductPID = (String) tempMap.get(SELECT_PHYSICALID);
    	
    	//Get the factory
        ConfigTrace.Trace("CONFIG_TRACES", "********************Creating Factory element:"); 
        IConfiguredEntitiesFactory factory = ConfiguredEntitiesFactory.getConfiguredEntitiesFactory(context);
        ConfigTrace.Trace("CONFIG_TRACES", "********************Creating ConfiguredEntity:"); 
        IConfiguredEntity rootConfigurable = factory.CreateConfiguredEntity(context, rootProductPID);
        
        List<String> attachedModelList = new ArrayList<>();
        
        try{
            attachedModelList = rootConfigurable.getAttachedModels(context);
            ConfigTrace.Trace("CONFIG_TRACES", "********************attachedModelList.size:" + attachedModelList.size());
        }catch(Exception ex){
            ex.printStackTrace();
        }
        
        String[] attachedModelIdsArray = attachedModelList.toArray(new String[0]);
        MapList configContextObjectIdList = DomainObject.getInfo(context, attachedModelIdsArray, new StringList(SELECT_ID));
        MapList configContextMapList = new MapList();
        for(int i = 0; i < attachedModelList.size(); i++) {
        	Map tempPIdMap = new HashMap();
        	tempPIdMap.put(SELECT_PHYSICALID, attachedModelList.get(i));
        	tempPIdMap.put(SELECT_ID, ((Map) configContextObjectIdList.get(i)).get(SELECT_ID));
        	configContextMapList.add(tempPIdMap);
        }
        
    	return configContextMapList;
    	
    }

    /**
     * This method is delete check trigger for Configuration Context relationship
     * @param context
     * @param args
     * @return
     * @throws Exception
     * @since R214
     */
    public int checkEffectivityContextUsage(Context context, String args[]) throws Exception
    {
      ConfigTrace.TraceIn( "ConfigExpressionModeler", "checkEffectivityContextUsage" );
    	String relId = args[0];
    	String fromObjId = args[1];
    	String toObjId = args[2];

    	String SELECT_EFFECTIVITY_CONTEXT_USAGE_ID = "to[" + EffectivityFramework.RELATIONSHIP_EFFECTIVITY_CONTEXT + "].fromrel.fromrel.from.id";
      
      StringList mvList = new StringList();
    	mvList.add(SELECT_EFFECTIVITY_CONTEXT_USAGE_ID);
    	//Need to determine if toObjId has Effectivity Context relationship AND it is in the same structure as fromObjId
		StringList objSelects = new StringList();
		objSelects.add(SELECT_EFFECTIVITY_CONTEXT_USAGE_ID);
		String [] objIdList = new String [] {toObjId};
      
      ConfigTrace.Trace( "ConfigExpressionModeler", "relId                               : " + relId );
      ConfigTrace.Trace( "ConfigExpressionModeler", "fromObjId                           : " + fromObjId );
      ConfigTrace.Trace( "ConfigExpressionModeler", "toObjId                             : " + toObjId );
      ConfigTrace.Trace( "ConfigExpressionModeler", "SELECT_EFFECTIVITY_CONTEXT_USAGE_ID : " + SELECT_EFFECTIVITY_CONTEXT_USAGE_ID );
      
    	MapList ECUsageList = DomainObject.getInfo(context, objIdList, objSelects, mvList);
    	if (ECUsageList != null && !ECUsageList.isEmpty())
    	{
    		Iterator usageItr = ECUsageList.iterator();
    		Map objInfo;
    		while (usageItr.hasNext())
    		{
    			objInfo = (Map)usageItr.next();
    			StringList strObjId = (StringList)objInfo.get(SELECT_EFFECTIVITY_CONTEXT_USAGE_ID);
            ConfigTrace.Trace( "ConfigExpressionModeler", "Found a query result : " + strObjId );

    			if (strObjId != null && strObjId.contains(fromObjId))
    			{
               ConfigTrace.Trace( "ConfigExpressionModeler", "   This is a match, detach is not possible" );
    				String strLanguage = context.getSession().getLanguage();
    				String strErrorMessage =EnoviaResourceBundle.getProperty(context, "Effectivity","Effectivity.Alert.CannotRemoveConfigCtx", strLanguage);
    				StringBuffer sbErrorMessage = new StringBuffer();
    				sbErrorMessage.append(strErrorMessage);
    				/*  sbErrorMessage.append("\\n");
    					sbErrorMessage.append(strType);
    					sbErrorMessage.append(" ");
    					sbErrorMessage.append(strName);
    					sbErrorMessage.append(" ");
    					sbErrorMessage.append(strRevision);*/

               ConfigTrace.TraceOut( "ConfigExpressionModeler" );
    				throw new FrameworkException(sbErrorMessage.toString());
    			}
    		}
    	}
      ConfigTrace.TraceOut( "ConfigExpressionModeler" );
    	return 0;


    }

    /**
     * This method is delete check trigger for Configuration Context relationship
     * @param context
     * @param args
     * @return
     * @throws Exception
     * @since R214
     */
    public int createConfigurationContext(Context context, String args[]) throws Exception
    {
    	String fromObjId = args[1];
    	String toObjId = args[2];

    	//TODO create config context realtionship between faceb
    	return 0;


    }

    /**
     * This method returns Configuration Context ObjectIds which are already connected
     * @param context
     * @param args
     * @return
     * @throws Exception
     * @since R214
     */
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList excludeConnectedConfigCtxObjects(Context context, String[] args) throws Exception
    {
    	final String SELECT_PHYSICALID ="physicalid";
    	final String SELECT_ID ="id";
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	String strContextObjId = (String)programMap.get("objectId");
    	//MapList objMapList = EffectivityFramework.getConfigurationContexts(context, strContextObjId);
    	
    	DomainObject domContextObj = new DomainObject(strContextObjId);
    	StringList selectableList = new StringList(SELECT_PHYSICALID);
    	Map tempObjMap = (Map) domContextObj.getInfo(context, selectableList);
    	String rootProductPID = (String) tempObjMap.get(SELECT_PHYSICALID);
    	
    	//Get the factory
        ConfigTrace.Trace("CONFIG_TRACES", "********************Creating Factory element:"); 
        IConfiguredEntitiesFactory factory = ConfiguredEntitiesFactory.getConfiguredEntitiesFactory(context);
        ConfigTrace.Trace("CONFIG_TRACES", "********************Creating ConfiguredEntity:"); 
        IConfiguredEntity rootConfigurable = factory.CreateConfiguredEntity(context, rootProductPID);
        
        List<String> attachedModelList = new ArrayList<>();
        
        try{
            attachedModelList = rootConfigurable.getAttachedModels(context);
            ConfigTrace.Trace("CONFIG_TRACES", "********************attachedModelList.size:" + attachedModelList.size());
        }catch(Exception ex){
            ex.printStackTrace();
        }
        
        String[] attachedModelIdsArray = attachedModelList.toArray(new String[0]);
        MapList configContextObjectIdList = DomainObject.getInfo(context, attachedModelIdsArray, new StringList(SELECT_ID));

    	StringList excludeList= new StringList();
    	for(int i=0;i<configContextObjectIdList.size();i++){
            Map tempMap=(Map)configContextObjectIdList.get(i);
            excludeList.add(tempMap.get(DomainConstants.SELECT_ID).toString());
        }

    	return excludeList;

    }

    /**
     * Formats the expression based on settings in the Effectivity Type commands.
     * Returns the display value and storage (actual) value for this expression.
     * Used by the Effectivity Expression Dialog to convert the UI string to a display value and storage value.
     *
     * @return Map containing LIST_VALUE LIST_VALUE_ACTUAL DISPLAY_VALUE and ACTUAL_VALUE keys
     * @throws Exception if the operation fails
     * @exclude
     */
    public Map formatExpression(Context context, String[] args)
    throws Exception{
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	MapList appItemsList = (MapList) programMap.get("AppItemsList");
    	String strEffectivityType = (String) programMap.get("EffectivityType");
    	EffectivityFramework EFF_app = new EffectivityFramework();
    	return  EFF_app.formatExpression(context, strEffectivityType, appItemsList);
    }

    /**
     * returns complete Milestone Tracks connected to configuration context
     * to be displayed in UI - Structure Browser
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     * 		  objectId: id of configuration context model
     *        and other information from request map
     * @returns MapList maplist of complete milestonetracks
     * @throws Exception if the operation fails
     */
    @com.matrixone.apps.framework.ui.ProgramCallable 
    public MapList getConfigContextMilestoneTracks(Context context, String[] args) throws Exception
    {
	   	MapList modelMilestoneTrackML = new MapList();
	   	try{
		   	HashMap arguMap = (HashMap) JPO.unpackArgs(args);
		   	String strModelId = (String)arguMap.get("objectId");
		   	String parentId = (String)arguMap.get("parentId");
			String fromFilterToolbar = (String)arguMap.get("fromFilterToolbar");
		   	String strIncCompMilestone = (fromFilterToolbar != null && "true".equalsIgnoreCase(fromFilterToolbar))?"true":"false";

		   	//if not from root=model, no need to expand further
		   	if(parentId != null && !"null".equals(parentId) && parentId.length() > 0){
		   		return modelMilestoneTrackML;
		   	}

		   	String expandLevel = (String)arguMap.get("expandLevel");
		   	String effectivityDiscipline = (String)arguMap.get("effectivityDiscipline");
		   	String relId = (String)arguMap.get("relId");

	   		StringList disciplinesList = new StringList();
	   		if(effectivityDiscipline != null && !"null".equals(effectivityDiscipline) && effectivityDiscipline.length() > 0){
	   			String[] effDisciplineArr = effectivityDiscipline.split(",");
	   			for(int i=0; i < effDisciplineArr.length; i ++){
	   				disciplinesList.add(effDisciplineArr[i]);
	   			}
	   		}

	    	//milestone track and milestone specific attributes
	    	StringList busSelects = new StringList(2);
	    	busSelects.add(DomainObject.SELECT_ID);
	    	busSelects.add(SELECT_ATTRIBUTE_MILESTONE_DATE);
	   		StringList relationshipSelects = new StringList();
	   		relationshipSelects.add(DomainConstants.SELECT_RELATIONSHIP_ID);

	     	Map infoMap = new HashMap();
	     	infoMap.put("objectId", strModelId);
	     	infoMap.put("disciplinesList", disciplinesList);
	     	infoMap.put("busSelectsList", busSelects);
	     	infoMap.put("relSelectsList", relationshipSelects);
	     	infoMap.put("bIncludeMilestoneTrack", "false");
			infoMap.put("bIncludeCompleteMilestone", strIncCompMilestone);

	     	//get milestonetracks and milestones connected to config context model
	     	String[] arrJPOArgs = (String[])JPO.packArgs(infoMap);
	     	MapList milestoneTrackML = null;
	     	try{
	     		String configCxtProg = "emxModel";
	     		String configCxtmethod = "getModelMilestoneTracks";
	            String sCommand = "print program $1 select $2 dump;";
	            String className = MqlUtil.mqlCommand(context, sCommand, true, configCxtProg, "classname");
	     		milestoneTrackML = (MapList) JPO.invokeLocal(context,className,null, configCxtmethod,arrJPOArgs,MapList.class);
	     	} catch(Throwable ex){
	     		ex.printStackTrace();
	     	}

	   	   	if(milestoneTrackML != null && milestoneTrackML.size() > 0){
	   	   		//goes through maplist of (discipline, milestonetrack\milestones)
	   	   		MapList tmpMilestoneML = new MapList();
	   	   		for(int i=0; i < milestoneTrackML.size(); i++){
	   	   			Map objMap = (Map)milestoneTrackML.get(i);
	   	   			java.util.Set keySet = objMap.keySet();
	   	   			Iterator keyItr = keySet.iterator();
	   	   			//only one key (discipline) in map
	   	   			String discipline = (String)keyItr.next();

	   	   			MapList disciplineMilestoneML = (MapList)objMap.get(discipline);
	   	   			//goes through maplist of (discipline, milestonetrack\milestones)
	   	   			for(int j=0; j < disciplineMilestoneML.size(); j++){
	   	   				Map tempMap = (Map)disciplineMilestoneML.get(j);
	   	   				tempMap.put("level", "1");

	   	    			if(!tmpMilestoneML.contains(tempMap)){
	   	    				tmpMilestoneML.add(tempMap);
	   	    			}
	   	   			}

	   	   			//add milestones to the master list
	   	   			modelMilestoneTrackML.addAll(tmpMilestoneML);
	   	   			tmpMilestoneML.clear();
	   	   		}
	   	   	}
	   	}catch(Exception ex){
	   		 ex.printStackTrace();
	   	}
	    return modelMilestoneTrackML;
    }

	/**
	  * Returns Milestones' discipline value to be displayed in Milestone Effectivity table,
	  * given that this information is already available in milestone object list.
	  *
	  * @param context the ENOVIA <code>Context</code> object
	  * @param args holds the HashMap containing the following arguments:
	  * 			objectList: contain a list of milestone objects
	  * @return Object - containing a list of milestone disciplines of all Milestones in the configuration context
	  * @throws Exception
	  *             if the operation fails
	  */
	public Vector getMilestoneDiscipline (Context context, String[] args){
		Vector returnVec = new Vector();
		try{
			HashMap inputMap = (HashMap)JPO.unpackArgs(args);
			MapList objectMapList = (MapList) inputMap.get("objectList");
			String strLanguage = context.getSession().getLanguage();

			String milestoneDisciplineStr = PropertyUtil.getSchemaProperty(context, "attribute_MilestoneDiscipline");
			String RELATIONSHIP_CONFIGURATION_ITEM = PropertyUtil.getSchemaProperty(context,"relationship_ConfigurationItem");
			for(int i=0; i < objectMapList.size(); i++){
				Map objMap = (Map) objectMapList.get(i);
				String milestoneDiscipline= (String)objMap.get(milestoneDisciplineStr);
				String mlOID= (String)objMap.get(DomainObject.SELECT_ID);

				if(null ==milestoneDiscipline  || ("null").equalsIgnoreCase(milestoneDiscipline)){
					//TODO- Need to fix this case in case if same Milestone used different places as different Discipline
					String selectMDAttribute="to["+RELATIONSHIP_CONFIGURATION_ITEM+"].from.attribute["+milestoneDisciplineStr+"]";
					milestoneDiscipline = new DomainObject(mlOID).getInfo(context,selectMDAttribute);
					if(milestoneDiscipline == null || milestoneDiscipline.equalsIgnoreCase("null"))  
						milestoneDiscipline = "";
				}


				if("Engineering".equals(milestoneDiscipline)){
					 milestoneDiscipline = "emxFramework.Range.Milestone.Engineering";
				 }else if("Manufacturing".equals(milestoneDiscipline)){
					 milestoneDiscipline ="emxFramework.Range.Milestone.Manufacturing";
				 }
				returnVec.add(EnoviaResourceBundle.getProperty(context, "Framework",milestoneDiscipline, strLanguage));
			}

		}catch(Exception e) {
			e.printStackTrace();
		}
		return returnVec;
	}

    /**
     * returns true to show Milestone Discipline column of Milestone Definition Table
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args could hold relId or effectivityDiscipline argument
     * @returns boolean  true to show Milestone Discipline column
     * @throws Exception if the operation fails
     */
    public boolean showMilestoneDisciplineColumn(Context context, String[] args) throws Exception
    {
	   	boolean showColumn = true;
	   	try{
		   	HashMap arguMap = (HashMap) JPO.unpackArgs(args);
		   	String effectivityDiscipline = (String)arguMap.get("effectivityDiscipline");
		   	String relId = (String)arguMap.get("relId");

	   		if((effectivityDiscipline != null && !"null".equalsIgnoreCase(effectivityDiscipline) && effectivityDiscipline.length() > 0) ||
	   		   (relId != null && !"null".equalsIgnoreCase(relId) && relId.length() > 0)){
	   			showColumn = false;
	   		}
	   	}catch(Exception ex){
	   		 ex.printStackTrace();
	   	}
	    return showColumn;
    }
    
    /**
     * Formats the expression based on settings in the Effectivity Type commands.This is specifically used in ECH Applicability Expression
     * Returns the display value and storage (actual) value for this expression.
     * Used by the Effectivity Expression Dialog to convert the UI string to a display value and storage value.
     *
     * @return Map containing LIST_VALUE LIST_VALUE_ACTUAL DISPLAY_VALUE and ACTUAL_VALUE keys
     * @throws Exception if the operation fails
     * @exclude
     */
    public Map formatExpressionforApplicabilityContext(Context context, String[] args)
    throws Exception{
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	MapList appItemsList = (MapList) programMap.get("AppItemsList");
    	String strEffectivityType = (String) programMap.get("EffectivityType");
    	EffectivityFramework EFF_app = new EffectivityFramework();

    	return  EFF_app.formatExpressionforApplicabilityContext(context, strEffectivityType, appItemsList);
    }

    /**
 	 * Gets display expression given a list of applicable items. Currently, it supports of
	 * types Products or Manufacturing Plan
 	 *
 	 * @param context the eMatrix <code>Context</code> object
 	 * @param args the argument contains program map, which in turn contains below items:
	 * 		"contextModelId": the context model that applicable items are selected from
	 *      "applicableItemsList": maplist of applicable items containg type, name and revision
 	 * @return String: expression to be displayed
 	 * @throws Exception if error during processing
 	 *  @exclude
 	 */
 	public String getDisplayExpression(Context context, String[] args) throws Exception
 	{
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	MapList applicableItemsList = (MapList) programMap.get("applicableItemsList");
    	String contextModelId = (String) programMap.get("contextModelId");

    	HashMap contentMap = new HashMap();
    	if(contextModelId != null && contextModelId.length() > 0){
    		contentMap.put("contextModelId", contextModelId);
    	}

    	if(applicableItemsList != null && applicableItemsList.size() > 0){
    		contentMap.put("applicableItemsList", applicableItemsList);
    	}

 		return EffectivityFramework.getDisplayExpression(context, contentMap);

 	}    

    /**
     * Returns true if the attribute has a dependency on effectivity expression usage.  
     * This trigger will block the modification of an attribute that is referenced in an effectivity expression.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args String [] with the following arguments
     * 		0 = the object id of the object containing the attribute 
     * 		1 = the relationship id of the relationship containing the attribute (either objectid or relid, but not both, objectid takes precedence) 
     * 		2 = symbolic name of a relationship to expand (optional - used with object id only if need to expand the object to determine usage)
     * 		3 = boolean true to indicate expand is from the object, false to indicate expand is to the object (optional - used with object id only if need to expand the object to determine usage)
     * @return int 0 for success and 1 for failure
     * @throws Exception throws exception if the operation fails
     */
 	public int checkEffectivityUsageToAllowModifyAttribute(Context context, String[]args) throws Exception
 	{
 		int returnStatus = 0;
 		String attribName = args[0];
 		String objId = args[1];
    	String relId = args[2];
    	String relType = args[3];
    	String isFrom = args[4];
    	
 		try
 		{
 			if (relType !=null && !relType.isEmpty()) // if symbolic rel name passed in then we want to check usage on this reltype
 			{
 				String [] idArr = new String[]{objId};
 				boolean isUsedInEffectivity = EffectivityFramework.isObjectStructureUsedInEffectivity(context, idArr, relType, Boolean.parseBoolean(isFrom));
 				if (isUsedInEffectivity)
 					returnStatus = 1;
 			}
 			else if (relId != null && !relId.isEmpty())
 			{
 				String [] idArr = new String[]{"", relId};
	 			returnStatus = EffectivityFramework.checkAllowEffectivityContextObjectDelete(context, idArr); 
 			}
 			else if (objId !=null && !objId.isEmpty())
 			{
 				String [] idArr = new String[]{objId, ""};
	 			returnStatus = EffectivityFramework.checkAllowEffectivityContextObjectDelete(context, idArr); 				
 			}
			
 			if (returnStatus == 1)
 			{
 				String errorMessage = EnoviaResourceBundle.getProperty(context, "Effectivity","Effectivity.Error.CannotModifyAttributeReferencedInEffectivity",context.getSession().getLanguage());
 				errorMessage = errorMessage.replace("<admin_name>", attribName);
 				emxContextUtil_mxJPO.mqlError(context, errorMessage);
 			}
 		}
 		catch (Exception err)
 		{
 			throw err;
 		}
 		return returnStatus;
 	}
 	
 	
 	private String getActualToXMLData(Context context, String[] args) throws Exception {
		
 		EffectivityFramework ef = new EffectivityFramework(); 
 		HashMap programMap = (HashMap)JPO.unpackArgs(args);
 		HashMap paramMap = (HashMap)programMap.get("paramMap");
 		String xmlExpression = (String)paramMap.get("New Value");
 		if(!xmlExpression.contains("CfgEffectivityExpression")) {
 			String strXMLExpression = ef.getXMLExpressionForApplicability(context, args);
 			String NewXMLData1 = strXMLExpression.replaceFirst("<CfgChangeExpression xmlns=\\\"urn:com:dassault_systemes:config\\\" xmlns:xsi=\\\"http://www.w3.org/2001/XMLSchema-instance\\\" xsi:schemaLocation=\\\"urn:com:dassault_systemes:config CfgChangeExpression.xsd\\\">", "<Cfg:CfgEffectivityExpression xmlns:Cfg=\"urn:com:dassault_systemes:config\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"urn:com:dassault_systemes:config CfgEffectivityExpression.xsd\">");
 			String NewXMLData2 = NewXMLData1.replaceAll("CfgChangeExpression", "CfgEffectivityExpression");
 			xmlExpression = NewXMLData2.replace("\\", "");
 		}
 		return xmlExpression;

 	}
 	
   /**
     * This method is used to generate the icon and perform action on move right quick action 
     * in FO / Milestone panels in Effectivity Dialog
     * @param context
     * @param args
     * @return
     * @throws FrameworkException
     */
		public Vector moveRightQuickAction(Context context, String[] args) throws FrameworkException {
  			try{
  				HashMap programMap = (HashMap)JPO.unpackArgs(args);
  				HashMap paramMap = (HashMap)programMap.get("paramList");
  		    	//String parentOID = (String)paramMap.get("parentOID");		
  				String contextId = (String)paramMap.get("objectId");	//doubt
  				MapList objectList = (MapList) programMap.get("objectList");
  				String suiteKey = (String) paramMap.get("suiteKey");
  				String strTimeStamp  = (String) paramMap.get("timeStamp");
  		    	Vector actionIcons = new Vector();
  				for (int i = 0; i < objectList.size(); i++) 
  				{
  					Map objectMap = (Map) objectList.get(i);
  					String strObjectId = "";
  					String parentId = "";
  					String relId = "";
  					String levelId = "";
  					if(objectMap.containsKey(DomainConstants.SELECT_ID))
  						strObjectId = (String) objectMap.get(DomainConstants.SELECT_ID);
  					if(objectMap.containsKey("id[parent]"))
  						parentId = (String) objectMap.get("id[parent]");
  					if(objectMap.containsKey(DomainRelationship.SELECT_ID))
  						relId = (String) objectMap.get(DomainRelationship.SELECT_ID);
  					if(objectMap.containsKey("id[level]"))
  						levelId = (String) objectMap.get("id[level]");
  					
  						String selection = "true" ;
  						if(objectMap.get("InsertIntoExp") !=null){
  							selection = (String) objectMap.get("InsertIntoExp");
  						}
  								
  					if(selection.equals("true") && !levelId.equalsIgnoreCase("0")){
  	  					StringBuffer strBufferIcons = new StringBuffer();
  	  					String jsString = "clearAllCheckedItems(); var rowArr = ['" + levelId + "']; emxEditableTable.select(rowArr); window.parent.document.getElementById('insertButtinId').click(); emxEditableTable.unselect(rowArr);";
  	  					strBufferIcons.append("<a href=\"javascript: " + jsString + "\" >");
  	  					strBufferIcons.append("<img border=\"0\" src=\"images/utilRoadmapRightArrow.gif\" alt=\"\" />");
  	  					strBufferIcons.append("</a>");     
  	  					actionIcons.add(strBufferIcons.toString());
  					}
  					else {
  						actionIcons.add(DomainObject.EMPTY_STRING);
  					}
  				}
  				return  actionIcons;
  			}
  			catch (Exception e) {
  				throw new FrameworkException(e.toString());
  			}
  			
  	}
		/**
	     * returns true to show Milestone Action column of Milestone Definition Table
	     *
	     * @param context the eMatrix <code>Context</code> object
	     * @param args could hold relId or effectivityDiscipline argument
	     * @returns boolean  true to show Milestone Action column
	     * @throws Exception if the operation fails
	     */
	    public boolean showMilestoneActionColumn(Context context, String[] args) throws Exception
	    {
		   	boolean showColumn = false;
		   	try{
			   	HashMap arguMap = (HashMap) JPO.unpackArgs(args);
			   	String effectivityType = (String)arguMap.get("effectivityType");

		   		if(effectivityType != null && !"null".equalsIgnoreCase(effectivityType) && effectivityType.length() > 0){
		   			showColumn = true;
		   		}
		   	}catch(Exception ex){
		   		 ex.printStackTrace();
		   	}
		    return showColumn;
	    }
		

}
