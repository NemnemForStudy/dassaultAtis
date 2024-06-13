import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.Vector;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.RelationshipWithSelect;
import matrix.db.RelationshipWithSelectItr;
import matrix.util.MatrixException;
import matrix.util.StringList;

import com.dassault_systemes.enovia.bom.modeler.constants.BOMMgtConstants;
import com.dassault_systemes.enovia.bom.modeler.impl.BOMCollaborationService;
import com.dassault_systemes.enovia.bom.modeler.interfaces.services.IBOMCollaborationService;
import com.dassault_systemes.enovia.bom.modeler.interfaces.services.IBOMOrderService;
import com.dassault_systemes.enovia.bom.modeler.interfaces.services.IBOMService;
import com.dassault_systemes.enovia.bom.modeler.interfaces.dvo.IEBOM;
import com.dassault_systemes.enovia.bom.modeler.interfaces.input.IBOMIngress;
import com.dassault_systemes.enovia.bom.modeler.kernel.BOMMgtKernel;
import com.dassault_systemes.enovia.bom.modeler.util.BOMMgtUtil;
import com.dassault_systemes.enovia.partmanagement.modeler.constants.PartMgtConstants;
import com.dassault_systemes.enovia.partmanagement.modeler.exception.PartMgtException;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.dvo.IPart;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.services.IPartService;
import com.dassault_systemes.enovia.partmanagement.modeler.util.ECMUtil;
import com.dassault_systemes.enovia.partmanagement.modeler.util.PartMgtUtil;
import com.dassault_systemes.enovia.partmanagement.modeler.util.SynchronizationUtil;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.engineering.EngineeringConstants;
import com.matrixone.apps.engineering.EngineeringUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.jdom.Document;
import com.matrixone.jdom.Element;

public class enoUnifiedBOMBase_mxJPO {

	private static final String ROW_ID 						= "rowId";
	private static final String MARKUP 						= "markup";
	private static final String PARENT_ID 					= "parentId";
	private static final String CONNECTION_ID 				= "relId";	
	private static final String BOM_OPERATION 				= "bomOperation";
	private static final String REPLACE_CUT_ID 				= "replaceCutId";
	private static final String BOM_OPERATION_CUT 			= "cut";
	private static final String BOM_OPERATION_ADD 			= "add";
	private static final String BOM_OPERATION_NEW 			= "new";
	private static final String CURRENT_VARIANT_EFFECTIVITY 		= "Variant Effectivity";
	private static final String CURRENT_EVOLUTION_EFFECTIVITY 		= "CurrentEvolutionEffectivity";
	private static final String CURRENT_LEGACY_EFFECTIVITY 		= "StructureLegacyEffectivityExpression";
	private static final String CURRENT_EFFECTIVITY 		= "CurrentEffectivity";
	private static final String BOM_OPERATION_REPLACE 	  	= "replace";
	private static final String BOM_OPERATION_REPLACE_CUT 	= "replaceCut";
	private static final String BOM_OPERATION_IS_DRAG_N_DROP 	= "isDragNDrop";
	private static final String BOM_OPERATION_ADD_NEXT 			= "AddNext";
	private String fnLength = "";
	private String fnDisplayLeadingZeros = "";
	
	protected static final String OBJECT_ID = "objectId";
	
	public enoUnifiedBOMBase_mxJPO(Context context, String [] args) throws Exception {
		fnLength = EnoviaResourceBundle.getProperty(context,"emxBOMPartManagement.FindNumberLength");
    	fnDisplayLeadingZeros = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentral.FindNumberDisplayLeadingZeros");
		}
    
    private boolean isModify(Element element) { return ( element.getAttribute(MARKUP) != null ); }
    
    private String getParentId(Map <String, String> dataMap) { return dataMap.get(PARENT_ID); }
    
    @SuppressWarnings("rawtypes")
	private String getObjectId(Map dataMap) { return BOMMgtUtil.getStringValue(dataMap, OBJECT_ID); }
    
    private String getRowId(Map <String, String> dataMap) { return dataMap.get(ROW_ID); }
    
    private String getConnectionId(Map <String, String> dataMap) { return dataMap.get(CONNECTION_ID); }
    
    private String getReplaceCutId(Map <String, String> dataMap) { return dataMap.get(REPLACE_CUT_ID); }
    
    private String getCurrentEffectivity_Evolution(Map <String, String> dataMap) { return dataMap.get(CURRENT_EVOLUTION_EFFECTIVITY); }
    
    private String getCurrentEffectivity(Map <String, String> dataMap) { return dataMap.get(CURRENT_EFFECTIVITY); }
    
    private String getCurrentEffectivity_Varaint(Map <String, String> dataMap) { return dataMap.get(CURRENT_VARIANT_EFFECTIVITY); }
    
    private String getCurrentEffectivity_Legacy(Map <String, String> dataMap) { return dataMap.get(CURRENT_LEGACY_EFFECTIVITY); }
    
    private boolean isReplaceAdd(Map <String, String> bomOperationMap) { return BOM_OPERATION_REPLACE.equals( bomOperationMap.get(BOM_OPERATION) ); }
    
    private boolean isReplaceCut(Map <String, String> bomOperationMap) { return BOM_OPERATION_REPLACE_CUT.equals( bomOperationMap.get(BOM_OPERATION) ); }
    
    private boolean isAdd(Map <String, String> bomOperationMap) { return ( BOM_OPERATION_ADD.equals( bomOperationMap.get(BOM_OPERATION) ) ) || BOM_OPERATION_NEW.equals( bomOperationMap.get(BOM_OPERATION) ); }
    
    private boolean isCut(Map <String, String> bomOperationMap) { return BOM_OPERATION_CUT.equals( bomOperationMap.get(BOM_OPERATION) ); }
    
    private boolean isAddNext(Map <String, String> bomOperationMap) { return BOM_OPERATION_ADD_NEXT.equals( bomOperationMap.get(BOM_OPERATION) ); }
    
    @SuppressWarnings("rawtypes")
	private Element getRootElement(Map requestMap) { return ( (Document) requestMap.get("XMLDoc") ).getRootElement(); }

    @SuppressWarnings("rawtypes")
	private Map getRequestMap(Map programMap) { return ( programMap.get("requestMap") == null ) ? ( new HashMap() ) : ( (HashMap) programMap.get("requestMap") ); }

	private String getValueFromElement(Element element, String key) {
		if (element == null || element.getAttribute(key) == null) { return ""; }
		
		return ( element.getAttribute(key).getValue() == null ) ? "" : element.getAttribute(key).getValue();
	}

	private Map <String, String> getBOMAttributes(Context context, Map <String, String> mapChangedColumnMap) throws MatrixException {
		Map <String, String> bomAttributeMap = new HashMap <String, String> ();
		
		String value;
		String [] ebomAttributes = BOMMgtUtil.getBOMAttributes(context);
		for (int i = 0; i < ebomAttributes.length; i++) {
			value = mapChangedColumnMap.get( ebomAttributes[i] );
			if ( value != null ) { bomAttributeMap.put(ebomAttributes[i], value); }
		}
		
		return bomAttributeMap;
	}
	
	@SuppressWarnings("rawtypes")
	private IBOMService getBOMService(Context context, String objectOrConnectionId, String authoringChangeId, Map requestMap, boolean isConnectionId) throws MatrixException {
		IBOMService iBOMService = IBOMService.getService(context, objectOrConnectionId, isConnectionId);
		iBOMService.setAuthoringChange(authoringChangeId);
		if ( isRollupView(requestMap) ) { iBOMService.setAuthoringMode_Rollup(); }
		
		return iBOMService;
	}
	
    @SuppressWarnings("unchecked")
	private Map <String, String> getChangedColumnMap(Context context, Element element) {
    	
		Map <String, String> dbAttributeNames = new HashMap <String, String> ();
    	
    	dbAttributeNames.put(BOMMgtConstants.UOM, BOMMgtConstants.ATTRIBUTE_UNIT_OF_MEASURE);
    	dbAttributeNames.put("VPMVisible", BOMMgtConstants.ATTRIBUTE_ISVPMVISIBLE);
    	dbAttributeNames.put("UOMType", BOMMgtConstants.ATTRIBUTE_UOM_TYPE);
    	dbAttributeNames.put("InstanceTitle", BOMMgtConstants.ATTRIBUTE_EBOM_INSTANCE_TITLE);
    	dbAttributeNames.put("InstanceDescription", BOMMgtConstants.ATTRIBUTE_EBOM_INSTANCE_DESCRIPTION);
    	
    	Map <String, String> dataMap = new HashMap <String, String> ();
    	
    	List <Element> colList = element.getChildren("column");
    	
    	Iterator <Element> colItr  = colList.iterator();		    	
			 
		Element clm;
		String name;		
		
		while (colItr.hasNext()) {
			clm  = colItr.next();
			
			name = clm.getAttributeValue("name");
			name = ( dbAttributeNames.get(name) == null ) ? name : dbAttributeNames.get(name);
			
			dataMap.put( name, clm.getText() );
		}
		
		return dataMap;
	}
    
    private Map<String, String> getBOMOperationInfoMap(Element parentElement, Element objectElement, Map <String, String> changedColumnMap) {
    	Map<String, String> bomOperationInfoMap = new HashMap<String, String>();
    	
    	String parentId = getValueFromElement(parentElement, PARENT_ID);
    	
    	if (BOMMgtUtil.isNullOrEmpty(parentId)) { parentId = getValueFromElement(parentElement, OBJECT_ID); }
    	
    	String bomOPeration = BOMMgtUtil.isNullOrEmpty( getValueFromElement(objectElement, "param1") ) ? getValueFromElement(objectElement, MARKUP) 
    																								   : getValueFromElement(objectElement, "param1"); 
    	
    	bomOperationInfoMap.put( PARENT_ID, parentId );
    	bomOperationInfoMap.put( BOM_OPERATION, bomOPeration );
    	bomOperationInfoMap.put( CONNECTION_ID, getValueFromElement(objectElement, CONNECTION_ID) );
    	bomOperationInfoMap.put( OBJECT_ID, getValueFromElement(objectElement, OBJECT_ID) );
    	bomOperationInfoMap.put( ROW_ID, getValueFromElement(objectElement, ROW_ID) );
    	bomOperationInfoMap.put( REPLACE_CUT_ID, getValueFromElement(objectElement, "param2") );
    	bomOperationInfoMap.put( MARKUP, getValueFromElement(objectElement, "markup") );
    	bomOperationInfoMap.put( CURRENT_EVOLUTION_EFFECTIVITY, changedColumnMap.get(CURRENT_EVOLUTION_EFFECTIVITY) );
    	bomOperationInfoMap.put( CURRENT_VARIANT_EFFECTIVITY, changedColumnMap.get(CURRENT_VARIANT_EFFECTIVITY) );
    	bomOperationInfoMap.put( CURRENT_LEGACY_EFFECTIVITY, changedColumnMap.get(CURRENT_LEGACY_EFFECTIVITY) );
    	bomOperationInfoMap.put( CURRENT_EFFECTIVITY, changedColumnMap.get(CURRENT_EFFECTIVITY) );
    	
    	return bomOperationInfoMap;
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
	private void setReplaceCutBOMOperationInfo(Map <String, Map> replaceCutInfoMap, Map bomOperationMap) {
    	Map newMap = new HashMap();
    	
    	newMap.putAll(bomOperationMap);
    	
    	replaceCutInfoMap.put(getConnectionId(bomOperationMap), newMap);
    }

    /**
     * Method to return the parent rowId info
     * @param rowId
     * @return
     */
    private String getParentRowIdInfo(String rowId) {
        StringList emxTableRowIds = FrameworkUtil.split(rowId, ",");
        
        String newRowId = "";
        
        for (int i = 0; i < emxTableRowIds.size() - 1; i++) {
        	
            if (i == 0) { newRowId = (String) emxTableRowIds.get(i); }
            
            else { newRowId = newRowId + "," + (String) emxTableRowIds.get(i); }
        }
        
        return "|||" + newRowId;
    }
    
    private void appendUIChangesForModify(StringBuffer sbUIChangeXML, Map <String, String> bomOperationMap, IBOMService iBOMService) {
    	if ( BOMMgtUtil.isNotNullAndNotEmpty( iBOMService.getReplacedConnectionId() ) ) {
	    	String strRowInfo = getParentRowIdInfo( getRowId(bomOperationMap) );
	    	
	    	sbUIChangeXML.append(" FreezePaneregister(\"").append( strRowInfo ).append("\");").append("rebuildView();")
			
		   .append(" emxEditableTable.addToSelected('<mxRoot><action>add</action><data status=\"commited\">")
		   
		   .append(" <item oid=\"").append( getObjectId(bomOperationMap) ).append("\" relType=\"relationship_EBOM\" relId=\"").append( iBOMService.getReplacedConnectionId() )
		   
		   .append("\" pid=\"").append( getParentId(bomOperationMap) ).append("\" direction=\"\"></item>").append(" </data></mxRoot>');")
		   
		   .append(" FreezePaneunregister(\"").append( strRowInfo ).append("\");");
    	}
    }
    
    private void appendUIChangesForAdd(StringBuffer sbUIChangeXMLModAndAdd, StringBuffer sbUIChangeXML, IBOMService iBOMService, Map <String, String> bomOperationMap, boolean addOperation, boolean boolAuthoringModeQuantity) {    	
    	StringList bomIds = addOperation ? iBOMService.getInstanceIds() : new StringList( iBOMService.getReplacedConnectionId() );
    	
    	String rowInfo = getParentRowIdInfo( getRowId(bomOperationMap) );
    	
    	for (int i = 0, size = BOMMgtUtil.getSize(bomIds); i < size; i++) {
    		if (i == 0) {
    			sbUIChangeXML.append("<item oId=\"").append( getObjectId(bomOperationMap) ).append("\" rowId=\"")
				 		     .append( getRowId(bomOperationMap) ).append("\" pId=\"null\" relId=\"").append( bomIds.get(i) )
				 		     .append("\" markup=\"").append( "add" ).append("\"></item>");
    		}
    		
    		else {
    			sbUIChangeXMLModAndAdd.append(" FreezePaneregister(\"").append(rowInfo).append("\"); rebuildView();")
 			   .append(" emxEditableTable.addToSelected('<mxRoot><action>add</action><data status=\"commited\">")
 			   .append(" <item oid=\"").append( getObjectId(bomOperationMap) ).append("\" relType=\"relationship_EBOM\" relId=\"")
 			   .append( bomIds.get(i) ).append("\" pid=\"").append( getParentId(bomOperationMap) ).append("\" direction=\"\"></item>")
 			   .append(" </data></mxRoot>');").append(" FreezePaneunregister(\"").append(rowInfo).append("\");");
    		}
    		
    		if (boolAuthoringModeQuantity) { break; } // In quantity mode only one row should be displayed. 
    	}
    }
     
    private void appendUIChangesForAddinView(StringBuffer sbUIChangeXMLAdd,StringList childObjList,StringList relIDs, Map <String, String> bomOperationMap) {    	
    	String rowInfo = getParentRowIdInfo( getRowId(bomOperationMap) );
    	String isDragnDrop = bomOperationMap.get(BOM_OPERATION_IS_DRAG_N_DROP);
    	if("true".equalsIgnoreCase(isDragnDrop)){
	    	sbUIChangeXMLAdd.append(" FreezePaneregister(\"").append(rowInfo).append("\"); rebuildView();")
	 			   .append(" emxEditableTable.addToSelected('<mxRoot><action>add</action><data status=\"committed\">")
	 			   .append(" <item oid=\"").append( getObjectId(bomOperationMap) ).append("\" relType=\"EBOM\" relId=\"")
	 			   .append( relIDs.get(0) ).append("\" pid=\"").append( getParentId(bomOperationMap) ).append("\" direction=\"\"></item>")
	 			   .append(" </data></mxRoot>');").append(" FreezePaneunregister(\"").append(rowInfo).append("\"); rebuildView();");
    	}
    	else{
    		sbUIChangeXMLAdd.append(" <mxRoot>");
    		for(int i=0;i<relIDs.size();i++){
    			sbUIChangeXMLAdd.append("<action>add</action><data status=\"committed\">")
			   .append(" <item oid=\"").append( childObjList.get(i) ).append("\" relType=\"EBOM\" relId=\"")
			   .append( relIDs.get(i) ).append("\" pid=\"").append( getParentId(bomOperationMap) ).append("\" direction=\"\"></item>")
			   .append(" </data>");
    		}
    		sbUIChangeXMLAdd.append("</mxRoot>");
    	}
    }
    private void appendUIChangesForCut(StringBuffer sbUIChangeCompleteXML, StringBuffer sbUIChangeXML, Map <String, String> bomOperationMap, IBOMService iBOMService) {
    	// Check if the BOM component is removed using same Work Under Change if so, then remove the complete connection form UI
		if ( BOMMgtUtil.isNullOrEmpty( iBOMService.getConnectionId() ) || iBOMService.getConnectionId().equals( iBOMService.getReplacedConnectionId() ) ) { // same CA used to remove then its complete row remove from UI 
			sbUIChangeXML.append("<item oId=\"").append( getObjectId(bomOperationMap) ).append("\" rowId=\"")
				       	  .append( getRowId(bomOperationMap) ).append("\" pId=\"null\" relId=\"").append( getConnectionId(bomOperationMap) )
				       	  .append("\" markup=\"").append("cut").append("\"></item>");
		}
		
		else { // Just need to remove red striked out line form UI
	    	String strXML= "/mxRoot/rows//r[@status = 'cut'and @id='" + getRowId(bomOperationMap) + "']";
	    	
	    	sbUIChangeCompleteXML.append(" emxUICore.selectSingleNode(oXML.documentElement,\"").append(strXML).append("\").removeAttribute(\"status\");");
    	}
    }
    
    private void appendUIChangesForCutInView(StringBuffer sbUIChangeXMLCut, Map <String, String> bomOperationMap, IBOMService iBOMService) {
    	// Check if the BOM component is removed using same Work Under Change if so, then remove the complete connection form UI
    	sbUIChangeXMLCut.append(" emxEditableTable.removeRowsSelected([\"").append("|||"+getRowId(bomOperationMap)).append("\"]);");
    }
    
   private StringBuffer appendUIChangesForCutInView(Map <String, String> bomOperationMap) {
    	StringBuffer sbUICutXMLRet = new StringBuffer();
    	sbUICutXMLRet.append(" emxEditableTable.removeRowsSelected([\"").append("|||"+getRowId(bomOperationMap)).append("\"]);");
    	return sbUICutXMLRet;
    }
    private String mergeUIChangeXML(StringBuffer sbUIChangeXML1, StringBuffer sbUIChangeXML2, boolean boolWIPBOM) {
    	StringBuffer sbCompleteUIChangeXML = new StringBuffer("{ main:function() { ");
    	
    	sbCompleteUIChangeXML.append(sbUIChangeXML1);
    	
    	if ( sbUIChangeXML2.toString().isEmpty() ) {
    		if (boolWIPBOM) { sbCompleteUIChangeXML = new StringBuffer(); } //in case of WIP Mode edit just need to refresh the SB.
    		
    		else { sbCompleteUIChangeXML.append("refreshRows();arrUndoRows = new Object();postDataXML.loadXML(\"<mxRoot/>\");"); } //in case of NON WIP Mode need to refresh whole structure to add/cut information
    	}
    	
    	else {
    		String uiChangeXML = sbUIChangeXML2.toString().replaceAll("&", "&amp");
    		sbCompleteUIChangeXML.append("var objDOM = emxUICore.createXMLDOM();")
        				   .append("objDOM.loadXML('<mxRoot><action>success</action><message></message><data status=\"commited\">").append(uiChangeXML)
        				   .append("</data></mxRoot>');").append("emxUICore.checkDOMError(objDOM);updateoXML(objDOM);refreshStructureWithOutSort();")
        				   .append("arrUndoRows = new Object();").append("postDataXML.loadXML(\"<mxRoot/>\");");
    	}
    	
    	if ( !sbCompleteUIChangeXML.toString().isEmpty() ) { sbCompleteUIChangeXML.append("}}"); }
    	
    	return sbCompleteUIChangeXML.toString();
    }
    
    private Map <String, String> getUIActionMap(String uiXML) {
    	Map <String, String> uiChangeMap = new HashMap <String, String> (2);
    	
        uiChangeMap.put( "Action", BOMMgtUtil.isNullOrEmpty(uiXML) ? "success" : "execScript" );
        uiChangeMap.put( "Message", uiXML );
        
        return uiChangeMap;
    }
    
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void updateObjectList(Map programMap, Map <String, String> qtyModifiedInfoMap) {
		if ( !qtyModifiedInfoMap.isEmpty() ) {
			Map tableData = (Map) programMap.get("tableData");
	    	
	    	MapList objectList = (MapList) tableData.get("ObjectList");
	    	Iterator <Map> iterator = objectList.iterator(); 
			Map objectMap;
			String modifiedQty, modifiedFindNumber, modifiedReferenceDesignator, modifiedInstanceTitle, modifiedInstanceDescription;
			while ( iterator.hasNext() ) {
				objectMap = iterator.next();
				
				modifiedQty = qtyModifiedInfoMap.get( BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID) + "|Quantity" );
				modifiedFindNumber = qtyModifiedInfoMap.get( BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID) + "|FindNumber" );
				modifiedReferenceDesignator = qtyModifiedInfoMap.get( BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID) + "|ReferenceDesignator" );
				modifiedInstanceTitle = qtyModifiedInfoMap.get( BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID) + "|InstanceTitle" );
				modifiedInstanceDescription = qtyModifiedInfoMap.get( BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID) + "|InstanceDescription" );

				if ( modifiedQty != null ) {
					objectMap.put( BOMMgtConstants.SELECT_ATTRIBUTE_QUANTITY, modifiedQty );
				}
				
				if ( modifiedFindNumber != null ) {
					objectMap.put( BOMMgtConstants.SELECT_ATTRIBUTE_FIND_NUMBER, modifiedFindNumber );
				}
				
				if ( modifiedReferenceDesignator != null ) {
					objectMap.put( BOMMgtConstants.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR, modifiedReferenceDesignator );
				}
				
				if ( modifiedInstanceTitle != null ) {
					objectMap.put( BOMMgtConstants.SELECT_EBOM_INSTANCE_TITLE, modifiedInstanceTitle );
				}
				
				if ( modifiedInstanceDescription != null ) {
					objectMap.put( BOMMgtConstants.SELECT_EBOM_INSTANCE_DESCRIPTION, modifiedInstanceDescription );
				}
			}
		}
	}
	
    private Map <String, String> getBOMErrorActionMap(Context context, String strExceptionMsg, Map <String, String> bomOperationMap) throws Exception {
    	String rowId = (bomOperationMap == null) ? "" : bomOperationMap.get(ROW_ID);
    	
    	String errorMsg = ( BOMMgtUtil.isNullOrEmpty(rowId) ? "" : "[rowId:" + rowId + "]" ) + strExceptionMsg;
    	
    	Map <String, String> errorActionMap = new HashMap <String, String> (2);
    	errorActionMap.put("Action", "ERROR");
    	errorActionMap.put("Message", errorMsg);
    	
    	return errorActionMap;
    }
    
    private void setEffectivityExpression(IBOMIngress iBOMIngress, Map <String, String> bomOperationMap) {
    	//iBOMIngress.setEffectivityExpression( getCurrentEffectivity(bomOperationMap) );
    	iBOMIngress.setEffectivityExpression_Evolution( getCurrentEffectivity_Evolution(bomOperationMap) ); // with no effectivity modifications CFF api throwing exception so commented this line.
    	iBOMIngress.setEffectivityExpression_Variant( getCurrentEffectivity_Varaint(bomOperationMap) );
    	
    	if ( BOMMgtUtil.isNullOrEmpty( getCurrentEffectivity_Legacy(bomOperationMap) ) ) {
    		iBOMIngress.setEffectivityExpression_Legacy( getCurrentEffectivity(bomOperationMap) );
    	}
    	else {
    		iBOMIngress.setEffectivityExpression_Legacy( getCurrentEffectivity_Legacy(bomOperationMap) );
    	}
    }

    private IBOMIngress getBOMAddIngress(Map <String, String> bomOperationMap, Map <String, String> attributeMap) {
    	IBOMIngress iBOMIngress = IBOMIngress.getService();
    	
    	iBOMIngress.setChildId( getObjectId(bomOperationMap) );
    	
    	setEffectivityExpression(iBOMIngress, bomOperationMap);
    	
    	iBOMIngress.setBOMAttributeMap( attributeMap );
    	iBOMIngress.setBOMUI("SB"); // to avoid some validations which is already performed as part of Structure Browser UI.

    	return iBOMIngress;
    }

    private IBOMIngress getBOMReplaceIngress(Map <String, String> bomOperationMap, Map <String, String> attributeMap) {
    	IBOMIngress iBOMIngress = IBOMIngress.getService();
    	
    	iBOMIngress.setReplaceByObjectId( getObjectId(bomOperationMap) );
    	setEffectivityExpression(iBOMIngress, bomOperationMap);
    	iBOMIngress.setBOMAttributeMap( attributeMap );
    	iBOMIngress.setBOMUI("SB"); // to avoid some validations which is already performed as part of Structure Browser UI.
    	
    	return iBOMIngress;
    }

    private IBOMIngress getBOMModifyIngress(Map <String, String> bomOperationMap, Map <String, String> attributeMap) {
    	IBOMIngress iBOMIngress = IBOMIngress.getService();
    	
    	setEffectivityExpression(iBOMIngress, bomOperationMap);
    	iBOMIngress.setBOMAttributeMap( attributeMap );
    	iBOMIngress.setBOMUI("SB"); // to avoid some validations which is already performed as part of Structure Browser UI.
    	
    	return iBOMIngress;
    }
	 
   private IBOMIngress getBOMCutIngress(Context context, String ebomId) {
    	IBOMIngress iBOMIngress = IBOMIngress.getService();
    	iBOMIngress.setBOMUI("SB"); // to avoid some validations which is already performed as part of Structure Browser UI.
    	return iBOMIngress;
	}
    
	private void updateQtyModifiedMap(Map <String, String> qtyModifiedInfoMap, Map <String, String> bomOperationMap, Map <String, String> changedColumnMap) {
		if ( BOMMgtUtil.isNotNullAndNotEmpty( changedColumnMap.get(BOMMgtConstants.ATTRIBUTE_QUANTITY) ) ) {
			qtyModifiedInfoMap.put( bomOperationMap.get(CONNECTION_ID) + "|Quantity", changedColumnMap.get(BOMMgtConstants.ATTRIBUTE_QUANTITY) );
		}
		
		if ( BOMMgtUtil.isNotNullAndNotEmpty( changedColumnMap.get(BOMMgtConstants.ATTRIBUTE_FIND_NUMBER) ) ) {
			qtyModifiedInfoMap.put( bomOperationMap.get(CONNECTION_ID) + "|FindNumber", changedColumnMap.get(BOMMgtConstants.ATTRIBUTE_FIND_NUMBER) );
		}
		
		// doing contains key bcoz user can explictly make the value as empty
		if ( changedColumnMap.containsKey(BOMMgtConstants.ATTRIBUTE_EBOM_INSTANCE_TITLE) ) {
			qtyModifiedInfoMap.put( bomOperationMap.get(CONNECTION_ID) + "|InstanceTitle", changedColumnMap.get(BOMMgtConstants.ATTRIBUTE_EBOM_INSTANCE_TITLE) );
		}
		
		// doing contains key bcoz user can explictly make the value as empty
		if ( changedColumnMap.containsKey(BOMMgtConstants.ATTRIBUTE_EBOM_INSTANCE_DESCRIPTION) ) {
			qtyModifiedInfoMap.put( bomOperationMap.get(CONNECTION_ID) + "|InstanceDescription", changedColumnMap.get(BOMMgtConstants.ATTRIBUTE_EBOM_INSTANCE_DESCRIPTION) );
		}
		
		// doing contains key bcoz user can explictly make the value as empty
		if ( changedColumnMap.containsKey(BOMMgtConstants.ATTRIBUTE_REFERENCE_DESIGNATOR) ) {
			qtyModifiedInfoMap.put( bomOperationMap.get(CONNECTION_ID) + "|ReferenceDesignator", changedColumnMap.get(BOMMgtConstants.ATTRIBUTE_REFERENCE_DESIGNATOR) );
		}
	}
	
	@SuppressWarnings("rawtypes")
	protected boolean isRollupView(Map programMap) { return ( "Rollup".equals( BOMMgtUtil.getStringValue(programMap, "BOMViewMode") ) ); }
	
    /** this api is passed as connectionProgram from Part bom powerview for any modifications performed on BOM powerview
     * all updation is done as part of postprocess jpo, so this api should return null as there is nothing to update here.   
     * @param context
     * @param args
     * @return
     * @throws MatrixException
     */
    @SuppressWarnings("rawtypes")
    @com.matrixone.apps.framework.ui.ConnectionProgramCallable
	public Map bomConnection(Context context, String [] args) throws MatrixException {
    	return null;
    }

    /** this api is passed as postprocess jpo from BOM powerview to apply any modifications performed on BOM powerview.
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @com.matrixone.apps.framework.ui.PostProcessCallable 
	public Map updateBOM(Context context, String [] args) throws Exception {
    	StringBuffer sbUIChangeXMLModAndCut = new StringBuffer(), sbUIChangeXML = new StringBuffer(); // holds all UI related XML data
    	
    	Map programMap = JPO.unpackArgs(args), requestMap = getRequestMap(programMap); // holds required parameters passed from UI.
    	Map <String, Map> replaceCutInfoMap = new HashMap <String, Map> ();
    	Map <String, String> changedColumnMap, bomOperationMap = null, actionMap, qtyModifiedInfoMap = new HashMap <String, String> ();
    	
    	Element objectElement, elementChild, rootElement = getRootElement(requestMap);
    	
    	String workUnderChangeId = (String) JPO.invoke(context, "AuthoringMgtUxUtil", null, "getChangeAuthoringContextOID", args, String.class);
        
        List elementList = rootElement.getChildren("object");
        boolean boolAuthoringModeQuantity = isRollupView(requestMap);

        IBOMService iBOMService = null;
        
        ECMUtil.setWorkUnderChange(context, workUnderChangeId); // Change Based Sync requires setting work under change
        String selectedAddNextRelId="";
        Map persistMap = new HashMap();
        MapList persistMapList = new MapList();
 		TreeMap <Integer,StringList> newRelIDsWithOrderTreeMap = new TreeMap<Integer, StringList>(); 

        try {
        	Iterator <Element> objectIterator, elementIterator = elementList.iterator();

	        while ( elementIterator.hasNext() ) {
	        	
	        	elementChild = elementIterator.next();
	         	
	         	if ( isModify(elementChild) ) { // true, if user has done only modify operation on the row. 
	         		if(isRollupView( requestMap )){throw BOMMgtUtil.createBOMException(context, "emxEngineeringCentral.validate.ModifyInRollupView", BOMMgtConstants.ENG_RESOURCE_FILE);}
	         		
	         		changedColumnMap = getChangedColumnMap(context, elementChild); // holds all columns which are modified in current UI transaction
	            	
	            	bomOperationMap = getBOMOperationInfoMap(elementChild, elementChild, changedColumnMap); // holds all required params containing BOM operations like Add, Cut modify, replace
	            	
					String connectionId = getConnectionId(bomOperationMap);
					if ( BOMMgtUtil.isNotNullAndNotEmpty(connectionId) ) {
						iBOMService = getBOMService(context, getConnectionId(bomOperationMap), workUnderChangeId, requestMap, true);
						
						 //If part is not in VPM Control set the isVPMVisible value according to user selection.
						//if ( BOMMgtUtil.isVPMControlled(context, getParentId(bomOperationMap) )  ) { changedColumnMap.remove( BOMMgtUtil.getActualSchemaName(context, PartMgtConstants.SYM_ATTRIBUTE_VPM_VISIBLE) ); }
						
						// Does the Modify operations, If it is NON wip mode then bom instance will contain newly created BOM else it just returns the same modified bom info. 

						IBOMIngress iBOMIngress = getBOMModifyIngress(bomOperationMap, getBOMAttributes(context, changedColumnMap));
						/*Added for Auto Sync st*/
						iBOMService.setCollaboratToDesign(true);
						/*Added for Auto Sync en*/
						iBOMService.modify( context, iBOMIngress);
						
						appendUIChangesForModify(sbUIChangeXMLModAndCut, bomOperationMap, iBOMService); // If bom instance connection id and the bomoperation connection id is same then new object is not created.
						
						if ( BOMMgtUtil.isNullOrEmpty(workUnderChangeId) || !IPartService.getInfo(context, iBOMService.getParentId() ).isConfiguredPart() ) { // for configured BOM MOdify opration is replace operation and old row shold not be updated with new values.
							updateQtyModifiedMap( qtyModifiedInfoMap, bomOperationMap, getBOMAttributes(context, changedColumnMap) );
						}
					}
	         	}
	         	
	         	// Add, New and Cut operations
	         	else {
	         		List objectList = elementChild.getChildren("object");
	         		
	         		objectIterator = objectList.iterator();         		

	         		LinkedList slSortedList = new LinkedList();
	         		LinkedList slModifiedList = new LinkedList();
	         		String sSelectedRelId ="";String sNextRelId ="";
	         		Integer newRelOrder;

	         		while ( objectIterator.hasNext() ) {
	         			objectElement = (Element) objectIterator.next();
	
	                	changedColumnMap = getChangedColumnMap(context, objectElement); // holds all columns which are modified in current UI transaction
	
	                	bomOperationMap = getBOMOperationInfoMap(elementChild, objectElement, changedColumnMap); // holds all required params containing BOM operations like Add, Cut modify, replace
	
	                	if ( isAdd(bomOperationMap) ) { // true, if operation is Add
	                		iBOMService = getBOMService(context, getParentId(bomOperationMap), workUnderChangeId, requestMap, false);
	                		// If Quantity is more than 1 and Usage is selected as Each only then multi connections performed, else it connects only 1 time.
	                		IBOMIngress iBOMIngress = getBOMAddIngress(bomOperationMap, getBOMAttributes(context, changedColumnMap) );

	                		/*Added for Auto Sync st*/
	                		iBOMService.setCollaboratToDesign(true);
	                		/*Added for Auto Sync en*/

	                		iBOMService.add( context, iBOMIngress );
	                		//Added to persist the treeorder in case or Add Next operation.
	                		appendUIChangesForAdd( sbUIChangeXMLModAndCut, sbUIChangeXML, iBOMService, bomOperationMap, true, boolAuthoringModeQuantity ); // updates the UI Change XML to reflect in UI.
	                	}
	                	
	                	else if ( isAddNext(bomOperationMap) ) { // true, if operation is Add Next
	                		iBOMService = getBOMService(context, getParentId(bomOperationMap), workUnderChangeId, requestMap, false);
	                		// If Quantity is more than 1 and Usage is selected as Each only then multi connections performed, else it connects only 1 time.
	                		IBOMIngress iBOMIngress = getBOMAddIngress(bomOperationMap, getBOMAttributes(context, changedColumnMap) );

	                		/*Added for Auto Sync st*/
	                		iBOMService.setCollaboratToDesign(true);
	                		/*Added for Auto Sync en*/

	                		iBOMService.add( context, iBOMIngress );
	                		//Added to persist the treeorder in case or Add Next operation---Start.
	                		sSelectedRelId = getValueFromElement(objectElement, "param2");
	                		
	                		if ("".equals(selectedAddNextRelId) ) { selectedAddNextRelId = sSelectedRelId; }
	                		
	                		if (!selectedAddNextRelId.equals(sSelectedRelId) ) {//multiple Add Next operation.

	                			persistMap=new HashMap();
	                			persistMap.put("selectedRelID", selectedAddNextRelId);

	                			if(PartMgtUtil.isNotNullAndNotEmpty(sNextRelId) && !slSortedList.contains(sNextRelId)){
		                			persistMap.put("nextRelID", sNextRelId);
	                			}
								
	                			slModifiedList = getSortedAddNextIDs(context, newRelIDsWithOrderTreeMap);
	                			persistMap.put("newRelIDs", slModifiedList);

	                			persistMapList.add(persistMap);
	                			slModifiedList=new LinkedList();
	                			newRelIDsWithOrderTreeMap=new TreeMap();
	                			selectedAddNextRelId=sSelectedRelId;
	                		}
	                		
	                		sNextRelId = getValueFromElement(objectElement, "param3");
	                		//String sSortString = getValueFromElement(objectElement, "param4");
	                		//slCompleteList = FrameworkUtil.split(sSortString, "|");
	                		StringList slIdList = iBOMService.getInstanceIds();
	                		
	                		newRelOrder = Integer.parseInt(getValueFromElement(objectElement, "param5"));
	                		
	                		newRelIDsWithOrderTreeMap.put(newRelOrder, slIdList);
	                		//slModifiedList.addAll(slIdList);
	                		//Added to persist the treeorder in case or Add Next operation---End.
	                		appendUIChangesForAdd( sbUIChangeXMLModAndCut, sbUIChangeXML, iBOMService, bomOperationMap, true, boolAuthoringModeQuantity ); // updates the UI Change XML to reflect in UI.
	                	}
	                	                	
	                	else if ( isCut(bomOperationMap) ) { // true, if operation is Cut.
	                		iBOMService = getBOMService(context, getConnectionId(bomOperationMap), workUnderChangeId, requestMap, true);
	                		
	                		IBOMIngress iBOMIngress = getBOMCutIngress(context,iBOMService.getConnectionId());
	                		
	                		/*Added for Auto Sync st*/
	                		iBOMService.setCollaboratToDesign(true);
	                		/*Added for Auto Sync to en*/
	                		
	                		iBOMService.remove(context, iBOMIngress); //If same change is selected for Cut operation which did Add then complete bom will be disconnected, else just a Effectivity Cut performed.
	                		appendUIChangesForCut( sbUIChangeXMLModAndCut, sbUIChangeXML, bomOperationMap, iBOMService ); // updates UI change XML for reflecting it in UI. 
	                	}
	                	
	                	else if ( isReplaceCut(bomOperationMap) ) { // true, if operation is Replace Cut. will not perform any back end operation as it will be taken care in Replace Add BOM operation.
	                		setReplaceCutBOMOperationInfo(replaceCutInfoMap, bomOperationMap); // updates UI change XML for reflecting it in UI.
	                	}
	                	
	                	else if ( isReplaceAdd(bomOperationMap) ) { // true, If operation Replace Add.
	                		iBOMService = getBOMService(context, getReplaceCutId(bomOperationMap), workUnderChangeId, requestMap, true);
	                		IBOMIngress iBOMIngress = getBOMReplaceIngress( bomOperationMap, getBOMAttributes(context, changedColumnMap) );
	                		/*Added for Auto Sync st*/
	                		iBOMService.setCollaboratToDesign(true);
	                   		/*Added for Auto Sync to en*/

	                		iBOMService.replace( context,iBOMIngress ); // Does all required backend process.
	                		appendUIChangesForCut( sbUIChangeXMLModAndCut, sbUIChangeXML, replaceCutInfoMap.get( getReplaceCutId(bomOperationMap) ), iBOMService );
	                		appendUIChangesForAdd( sbUIChangeXMLModAndCut, sbUIChangeXML, iBOMService, bomOperationMap, false, boolAuthoringModeQuantity ); // Appends UI change XML for reflecting it in UI.
	                		updateQtyModifiedMap( qtyModifiedInfoMap, bomOperationMap, getBOMAttributes(context, changedColumnMap) );
	                	}
	         		}
	         		
        			persistMap=new HashMap();

	         		if(PartMgtUtil.isNotNullAndNotEmpty(selectedAddNextRelId)){
		         		persistMap.put("selectedRelID", selectedAddNextRelId);
	        		}

        			if(PartMgtUtil.isNotNullAndNotEmpty(sNextRelId)){
            			persistMap.put("nextRelID", sNextRelId);
        			}

        			slModifiedList = getSortedAddNextIDs(context, newRelIDsWithOrderTreeMap);
        			persistMap.put("newRelIDs", slModifiedList);
        			
        			persistMapList.add(persistMap);
	         		
        			reorderBOMStructure(context, persistMapList);
	         	}
	        }

	        actionMap = getUIActionMap( mergeUIChangeXML(sbUIChangeXMLModAndCut, sbUIChangeXML, !IPartService.getInfo(context, iBOMService.getParentId() ).isConfiguredPart() ) );
	        
	        updateObjectList(programMap, qtyModifiedInfoMap);
    	}
        
        catch (PartMgtException handledException) {
        	if ( "emxUnresolvedEBOM.WorkUnderChange.BlankEffectivity".equals( handledException.getPropertyKey() ) ) { bomOperationMap.remove(ROW_ID); }

        	actionMap = getBOMErrorActionMap(context, handledException.getLocalizedMessage(), bomOperationMap);
    	}

        catch (Exception e) {
        	String strExceptionMsg = e.toString();
        	if (strExceptionMsg.indexOf(']') > -1) { strExceptionMsg = strExceptionMsg.substring( (strExceptionMsg.indexOf(']') + 1), strExceptionMsg.length() ); }

        	actionMap = getBOMErrorActionMap(context, e.toString(), bomOperationMap);
        }
        
        finally {
        	ECMUtil.clearWorkUnderChange(context); // Change Based Sync requires setting work under change - clearing the value which was set.
        }

    	return actionMap;
    }
    
	/** this api is called from UI components like commands and Menus for displaying only in Rollup view.
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
    @com.matrixone.apps.framework.ui.ProgramCallable
	public boolean displayForRollupView(Context context, String [] args) throws Exception {
    	return isRollupView( JPO.unpackArgs(args) );
    }

	/** this api is called from UI components like commands and Menus for displaying only in instance view. 
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
	public boolean displayForInstanceView(Context context, String [] args) throws Exception {
    	return !displayForRollupView(context, args);
    }
    
    /** this api is called from UI component table column for displaying column values, column should be configured with map key from which this column will get the value.
     * Column settings should have setting MapKey with key specified for the Map.
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings("rawtypes")
	@com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getColumnValueList(Context context, String [] args) throws Exception {
    	Map programMap = JPO.unpackArgs(args);
    	
    	MapList objectList = (MapList) programMap.get("objectList");
    	
    	return BOMMgtUtil.getSListForTheKey( objectList, BOMMgtUtil.getColumnMapkey(programMap) );
    }
    
    /** some columns configured with program and function requires update program and function, as the updation will be performed in postprocess JPO this api is returning just true.
     * update BOM Column values
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public boolean updateBOMColumn(Context context, String [] args) throws MatrixException { return true; }
    
	private boolean isScientificNotation(String numberString) {

	    // Validate number
	    try {
	        new java.math.BigDecimal(numberString);
	    } catch (NumberFormatException e) {
	        return false;
	    }

	    // Check for scientific notation
	    return numberString.toUpperCase().contains("E");   
	}
	
    /** gets the Quantity value for BOM Quantity column.
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @com.matrixone.apps.framework.ui.ProgramCallable
	public StringList getBOMQuantity(Context context, String [] args) throws Exception {
    	Map programMap = JPO.unpackArgs(args);
    	
    	StringList quantityList = new StringList();
    	
    	MapList objectList = (MapList) programMap.get("objectList");
    	
    	Map objectMap;
    	String quantity = "";
    	Iterator <Map> objectListIterator = objectList.iterator();
    	
    	while ( objectListIterator.hasNext() ) {
    		objectMap = objectListIterator.next();
    		
    		if ( !"true".equalsIgnoreCase( BOMMgtUtil.getStringValue(objectMap, "Root Node") ) ) {
    			quantity = BOMMgtUtil.getStringValue(objectMap,BOMMgtConstants.SELECT_ATTRIBUTE_QUANTITY);
    			
    			if ( BOMMgtUtil.isNotNullAndNotEmpty(quantity) ) {
	    			//Double quantityValue = Double.parseDouble(quantity);
	    			//quantity = quantityValue.toString();
					if(isScientificNotation(quantity)){
	    			java.text.NumberFormat nf = java.text.NumberFormat.getInstance();
	    			int len = Integer.parseInt(quantity.substring(quantity.indexOf('-')+1))+2;//  2 is added due to fact that exponential notation reduces actual number of digits by 2			    		
	        		nf.setMaximumFractionDigits(len);
	        		quantity = nf.format(new BigDecimal(quantity));
    				}
    			}
    			// The value will never be blank as the value for this column is updated in F/N column  
	    		/*if ( BOMMgtUtil.isNullOrEmpty(quantity) ) { // For newly added row in edit mode this check will be true.
	    			String connectionId = BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID);
	
	    			if ( BOMMgtUtil.isNotNullAndNotEmpty(connectionId) ) {
	    				
	    				if ( boolRoolupView ) {
    						Map rollupMap = BOMMgtUtil.getRollupDataMap(context, connectionId);
    						quantity = BOMMgtUtil.getStringValue(rollupMap, BOMMgtConstants.SELECT_ATTRIBUTE_QUANTITY); 
    					} else {
    						quantity = BOMMgtKernel.getRelAttributeValue(context, connectionId, BOMMgtConstants.ATTRIBUTE_QUANTITY); // get the value from rel Attribute
    					}
		
		    			objectMap.put(BOMMgtConstants.SELECT_ATTRIBUTE_QUANTITY, quantity);
	    			}
	    		}*/
    		}

    		quantityList.add(quantity);
    	}

    	return quantityList;
    }
    
    /** gets the Reference Designator value for BOM RD column.
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getBOMReferenceDesignator(Context context, String [] args) throws Exception {
    	Map programMap = JPO.unpackArgs(args);
    	
    	StringList rdList = new StringList();
    	
    	MapList objectList = (MapList) programMap.get("objectList");
    	
    	//boolean boolRoolupView = isRollupView(paramMap);
    	
    	Map objectMap;
    	String referenceDesignator = "";
    	Iterator <Map> objectListIterator = objectList.iterator();
    	
    	while ( objectListIterator.hasNext() ) {
    		objectMap = objectListIterator.next();
    		
    		if ( !"true".equalsIgnoreCase( BOMMgtUtil.getStringValue(objectMap, "Root Node") ) ) {
    			referenceDesignator = BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR);
    			
    			// This value will be updated in F/N column
    			
    			/*if ( BOMMgtUtil.isNullOrEmpty(referenceDesignator) ) { // For newly added row in edit mode this check will be true.
    				String connectionId = BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID);
    				
    				if ( BOMMgtUtil.isNotNullAndNotEmpty(connectionId) ) {
    					
    					if ( boolRoolupView ) {
    						Map rollupMap = BOMMgtUtil.getRollupDataMap(context, connectionId);
    						referenceDesignator = BOMMgtUtil.getStringValue(rollupMap, BOMMgtConstants.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR); 
    					} else {
    						referenceDesignator = BOMMgtKernel.getRelAttributeValue(context, connectionId, BOMMgtConstants.ATTRIBUTE_REFERENCE_DESIGNATOR); // get the value from rel Attribute
    					}

    					objectMap.put(BOMMgtConstants.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR, referenceDesignator);
    				}
    			}*/
    		}
    		
    		rdList.add(referenceDesignator);
    	}
    	
    	return rdList;
    }
    
    /** gets the EBOM Instance information for BOM columns.
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getEBOMInstanceInfoList(Context context, String [] args) throws Exception {
    	Map programMap = JPO.unpackArgs(args);
    	
    	StringList instanceInfoList = new StringList();
    	
    	MapList objectList = (MapList) programMap.get("objectList");
    	
    	Map objectMap;
    	String instanceInfo = "";
    	Iterator <Map> objectListIterator = objectList.iterator();
    	
    	
    	String adminType = BOMMgtUtil.getStringValue( (Map) ( (Map) programMap.get("columnMap") ).get("settings"), "Admin Type" );
    	
    	String dbAttrKey = BOMMgtUtil.getActualSchemaName(context, adminType);
    	String selectKey = "attribute[" + dbAttrKey + "]";    	
    	
    	while ( objectListIterator.hasNext() ) {
    		objectMap = objectListIterator.next();
    		
    		if ( !"true".equalsIgnoreCase( BOMMgtUtil.getStringValue(objectMap, "Root Node") ) ) {
    			instanceInfo = BOMMgtUtil.getStringValue(objectMap, selectKey);
    			
    			// This value will be updated in Instance Title/Instance Description column
    			
    			if ( instanceInfo == null || "null".equalsIgnoreCase(instanceInfo.trim())) { // For newly added row in edit mode this check will be true.
    				String connectionId = BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID);
    				
    				if ( BOMMgtUtil.isNotNullAndNotEmpty(connectionId) ) {

    					instanceInfo = BOMMgtKernel.getRelAttributeValue(context, connectionId, dbAttrKey); // get the value from rel Attribute

    					objectMap.put(selectKey, instanceInfo);
    				}
    			}
    		}
    		
    		instanceInfoList.add(instanceInfo);
    	}
    	
    	return instanceInfoList;
    }
    
    /** gets the Find Number value for BOM Find Number column.
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getBOMFindNumber(Context context, String [] args) throws Exception {
    	Map programMap = JPO.unpackArgs(args);
    	
    	StringList findNumberList = new StringList();
    	
    	Map paramMap = (Map) programMap.get("paramList");
    	MapList objectList = (MapList) programMap.get("objectList");
    	
    	boolean boolRoolupView = isRollupView(paramMap);
    	
    	Map objectMap;
    	String findNumber = "";
    	Iterator <Map> objectListIterator = objectList.iterator();
    	
    	while ( objectListIterator.hasNext() ) {
    		objectMap = objectListIterator.next();
    		
    		if ( !"true".equalsIgnoreCase( BOMMgtUtil.getStringValue(objectMap, "Root Node") ) ) {
    			findNumber = BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_ATTRIBUTE_FIND_NUMBER);
    			
    			if ( BOMMgtUtil.isNullOrEmpty(findNumber) ) { // For newly added row in edit mode this check will be true.
    				String connectionId = BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID);
    				
    				if ( BOMMgtUtil.isNotNullAndNotEmpty(connectionId) ) {
    					Map <String, String> relInfoMap = IBOMService.getInfo(context, connectionId).getAttributeMap();

						IEBOM iEBOM = IEBOM.getService(relInfoMap);
    					
    					if ( boolRoolupView && iEBOM.isUnitOfMeasure_Each() ) {
    						/* From Quantity Rollup view, if user edits the BOM then Auto generated F/N should be calculated based on the number of Qty added, this also updates the Qty and ED column values- Start */
    						Map rollupMap = BOMMgtUtil.getRollupDataMap(context, connectionId);
    						String rollupFN = iEBOM.getFindNumber();
    						Double rollupQty = Double.parseDouble( iEBOM.getQuantity() );
    						String rollupRD = iEBOM.getReferenceDesignator();
    						
    						StringList instanceIdList = (StringList) rollupMap.get(BOMMgtConstants.ROLLUP_CONNECTION_IDS);
    						
    						RelationshipWithSelectItr relationshipWithSelectItr = BOMMgtKernel.relWithSelectListItr(context, BOMMgtUtil.getValuesInArray(instanceIdList), BOMMgtUtil.createStringList(new String[] {BOMMgtConstants.SELECT_ATTRIBUTE_FIND_NUMBER, BOMMgtConstants.SELECT_ATTRIBUTE_QUANTITY, BOMMgtConstants.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR}));
    						RelationshipWithSelect relationshipWithSelect;
    						
    						while ( relationshipWithSelectItr.next() ) {
    							relationshipWithSelect = relationshipWithSelectItr.value();
    							String fn = relationshipWithSelect.getSelectData(BOMMgtConstants.SELECT_ATTRIBUTE_FIND_NUMBER);
    							
    							if ( !fn.equals( iEBOM.getFindNumber() ) && fn.startsWith( iEBOM.getFindNumber() ) ) {
    								rollupFN += "," + fn;
    								
    								rollupQty += Double.parseDouble( relationshipWithSelect.getSelectData(BOMMgtConstants.SELECT_ATTRIBUTE_QUANTITY) );
    								
    								if ( BOMMgtUtil.isNotNullAndNotEmpty(rollupRD) ) {
    									rollupRD += "," + relationshipWithSelect.getSelectData(BOMMgtConstants.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR);
    								}
    							}
    						}
    						
    						findNumber = rollupFN;
    						objectMap.put( BOMMgtConstants.SELECT_ATTRIBUTE_QUANTITY, Double.toString(rollupQty) );
    						objectMap.put( BOMMgtConstants.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR, rollupRD );
    						/* From Quantity Rollup view, if user edits the BOM then Auto generated F/N should be calculated based on the number of Qty added, this also updates the Qty and ED column values- END */
						} else {
							findNumber = iEBOM.getFindNumber();
    						
    						objectMap.put( BOMMgtConstants.SELECT_ATTRIBUTE_QUANTITY, iEBOM.getQuantity() );
    						objectMap.put( BOMMgtConstants.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR, iEBOM.getReferenceDesignator() );
						}
    					
    					objectMap.put(BOMMgtConstants.SELECT_ATTRIBUTE_FIND_NUMBER, findNumber);
    				}
    			}
    		}
    		if (fnDisplayLeadingZeros.equalsIgnoreCase("true")){
	     	    findNumber = findNumberPadding(findNumber);
	     	}
    		findNumberList.add( FrameworkUtil.join( BOMMgtUtil.removeDuplicateValues( FrameworkUtil.split(findNumber, ",") ), "," ) );
    	}
    	
    	return findNumberList;
    }

	/** this api is invoked from ui components (commands, menus) for displaying ui components for EC/Configured parts.
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
    @com.matrixone.apps.framework.ui.ProgramCallable
	public boolean displayForUnifiedBOM(Context context, String [] args) throws Exception {
		String sPartID = EngineeringUtil.getTopLevelPartForProduct(context, getObjectId( JPO.unpackArgs(args)));
		if(!new DomainObject(sPartID).isKindOf(context, PartMgtConstants.TYPE_PART)){
			return false;
		}
    	IPart iPart = IPartService.getInfo(context,sPartID);
    	
    	return !( iPart.isPolicyClassification_Equivalent() || iPart.isManufacturingPart() ); 
    }
    
	/** this api is used to get all the Change Action ids connected to the Part.
	 * This api is passed as include OID prog for getting list of Change connected for selecting Authoring Change.
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
    public StringList getProposedChangeActionIds(Context context, String [] args) throws Exception {
		MapList caList = ECMUtil.getProposedChangeActions( context, getObjectId( JPO.unpackArgs(args) ), new String [] { BOMMgtConstants.SELECT_ID } ); 
    	return BOMMgtUtil.getSListForTheKeyWithoutEmpty(caList, BOMMgtConstants.SELECT_ID);
    }
    
	/** api called from UI components for displaying the component only if context part is Configured.
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	@com.matrixone.apps.framework.ui.ProgramCallable
	public boolean displayForConfiguredContextPart(Context context, String [] args) throws Exception {
		Map programMap = JPO.unpackArgs(args);
    	
    	String policy = BOMMgtUtil.getStringValue(programMap, "ContextPolicy");
    	
    	if ( BOMMgtUtil.isNullOrEmpty(policy) ) {
    		String objectId = BOMMgtUtil.getStringValue(programMap, "objectId");
    		IPart iPart = IPartService.getInfo(context, objectId);
    		policy = iPart.getPolicy();
    	}
    	
    	return ( BOMMgtConstants.POLICY_CONFIGURED_PART.equals(policy) );
    }
    
    /*
     * Should be called from any command range value function with command setting RANGE_VALUE_PROPERTY_KEY which contains the value of range values to be displayed
     * */
    @SuppressWarnings("rawtypes")
    @com.matrixone.apps.framework.ui.ProgramCallable
	public Map <String, StringList> getRangeValues(Context context, String [] args) throws Exception {
    	Map programMap = JPO.unpackArgs(args);
    	
    	Map settingsMap = (Map) ( (Map) programMap.get("columnMap") ).get("settings");
    	
    	return BOMMgtUtil.getActualAndDisplayValues( context, 
    															BOMMgtUtil.getStringValue(settingsMap, "RANGE_VALUE_PROPERTY_KEY"), 
    															BOMMgtUtil.getStringValue(settingsMap, "Registered Suite") );
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @com.matrixone.apps.framework.ui.ProgramCallable
	public StringList applyChangeControlledColor(Context context, String [] args) throws Exception {
    	StringList colorList = new StringList();
    	
    	Map programMap = JPO.unpackArgs(args);
    	
    	MapList objectList = (MapList) programMap.get("objectList");
    	
    	Map objectMap;
    	String changeControlled;
    	Iterator <Map> objectListIterator = objectList.iterator();
    	
    	while ( objectListIterator.hasNext() ) {
    		objectMap = objectListIterator.next();
    		
    		changeControlled = BOMMgtUtil.getStringValue(objectMap, "attribute["+ BOMMgtConstants.ATTRIBUTE_CHANGE_CONTROLLED + "]");
    		
    		colorList.add( "True".equalsIgnoreCase( (changeControlled) ) ? "RemovedRow" : "" );
    	}
    	
    	return colorList; 
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList applyRevisionColor(Context context, String [] args) throws Exception {
    	StringList colorList = new StringList();
    	
    	Map programMap = JPO.unpackArgs(args);
    	
    	MapList objectList = (MapList) programMap.get("objectList");
    	
    	Map objectMap;
    	String nextRevision;
    	Iterator <Map> objectListIterator = objectList.iterator();
    	
    	while ( objectListIterator.hasNext() ) {
    		objectMap = objectListIterator.next();
    		
    		nextRevision = BOMMgtUtil.getStringValue(objectMap, "next.revision");
    		
    		colorList.add( BOMMgtUtil.isNotNullAndNotEmpty(nextRevision) ? "RemovedRowYellow" : "" );
    	}
    	
    	return colorList; 
    }
    
@SuppressWarnings("rawtypes")
public synchronized JsonObject dragPartProcess(Context context, String[] args) throws Exception{
		
	    Map param = (Map)JPO.unpackArgs(args);

		JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
	    JsonObject ret;
	    try{
	    
	    	JsonObject jDrop = (JsonObject)param.get("drop");
	    	JsonObject jDropObject = jDrop.getJsonObject("object");
	    	JsonObject jDrag = (JsonObject)param.get("drag");
			    JsonArray jDragObjects = jDrag.getJsonArray("objects");
			    Object jAction = jDrag.get("action");
			    
			    
			    String dropAction = jAction.toString();dropAction = dropAction.replaceAll("\"", "");
			    String parentId = jDropObject.getString("oid");
			    String dropRowID = jDropObject.getString("id")+",";
			    String dropSuccessful = BOMMgtUtil.getDisplayPropertyValue(context, "emxFramework.DropProcess.DropOperationSuccessful", "emxFrameworkStringResource");
			    StringBuffer sbUIChangeXMLAdd = new StringBuffer();StringBuffer sbUIChangeXMLCut = new StringBuffer();

				String updatedXML="";
				StringBuffer selectedRows =new StringBuffer();
				StringBuffer freezePaneregister =new StringBuffer();
				StringBuffer freezePaneunregister =new StringBuffer();
				StringBuffer removedRows = new StringBuffer();
				StringBuffer removexml = new StringBuffer();
				StringList relID = new StringList();
			    
			    IBOMService iBOMServiceForAdd;
			    IBOMService iBOMServiceForCut;
			    
			    Map<String, String> bomAddInfoMap = new HashMap<String, String>();
			    Map<String, String> bomCutInfoMap = new HashMap<String, String>();

			    bomAddInfoMap.put( PARENT_ID, parentId );
			    bomAddInfoMap.put( BOM_OPERATION, BOM_OPERATION_ADD );
			    bomAddInfoMap.put( ROW_ID, dropRowID );
			    Map <String, String> changedColumnMap = new HashMap <String, String> ();
			    
			    ContextUtil.startTransaction(context, true);
			    if ( IPartService.getService( context, parentId ).isChangeControlled(context) ) {
					throw BOMMgtUtil.createBOMException(context, "emxBOMPartManagement.BOMOperation.validation.DragAndDrop.DropOperation", BOMMgtConstants.BOM_MGT_RESOURCE_FILE);
				}
			    for (int i=0; i<jDragObjects.size(); i++) {
			    	iBOMServiceForAdd = IBOMService.getService(context, parentId, false);
			    	
			    	JsonObject jDragObject = jDragObjects.getJsonObject(i);
			    	String childObjectRelId = jDragObject.getString("rid");
			    	String cutObjectRowId = jDragObject.getString("id");
			    	IPart iPart = IPartService.getInfo(context, jDragObject.getString("oid"));
			    	String chObjectId = iPart.getObjectId();
			    	
			    	bomAddInfoMap.put( OBJECT_ID, chObjectId );
			    	bomAddInfoMap.put(BOM_OPERATION_IS_DRAG_N_DROP, "true");
			    	Map <String, String> bomAttributes = new HashMap<String, String>();
			    	if(BOMMgtUtil.isNotNullAndNotEmpty(childObjectRelId)){
				    	String relType = BOMMgtKernel.printConnection(context, childObjectRelId, PartMgtConstants.SELECT_TYPE_KINDOF);
				    	if(BOMMgtConstants.RELATIONSHIP_EBOM.equalsIgnoreCase(relType)) {
				    		bomAttributes = BOMMgtUtil.getEBOMAttribute(context, childObjectRelId);
							bomAttributes.remove(BOMMgtConstants.ATTRIBUTE_FIND_NUMBER);
							bomAttributes.remove(BOMMgtConstants.ATTRIBUTE_REFERENCE_DESIGNATOR);
				    	}
			    	}
					changedColumnMap.putAll(bomAttributes);
					
			    	if(dropAction.equalsIgnoreCase("Move")){
						
			    		bomCutInfoMap.put(CONNECTION_ID, childObjectRelId);
			    		bomCutInfoMap.put(BOM_OPERATION, BOM_OPERATION_CUT );
			    		bomCutInfoMap.put(ROW_ID,cutObjectRowId);
			    		iBOMServiceForCut= IBOMService.getService(context, childObjectRelId, true);
			    		
			    		if ( IPartService.getService( context, iBOMServiceForCut.getParentId() ).isChangeControlled(context) ) {
			    			
							throw BOMMgtUtil.createBOMException(context, "emxBOMPartManagement.BOMOperation.validation.DragAndDrop.DragOperation", BOMMgtConstants.BOM_MGT_RESOURCE_FILE);
						}
			    		
			    		/* For auto collaboration .st */
			    		iBOMServiceForAdd.setCollaboratToDesign(true);
			    		iBOMServiceForCut.setCollaboratToDesign(true);
			    		/* For auto collaboration .en */
			    		
			    		iBOMServiceForAdd.add( context, getBOMAddIngress(bomAddInfoMap, getBOMAttributes(context, changedColumnMap) ) );
			    		//appendUIChangesForAddinView( sbUIChangeXMLAdd,new StringList(chObjectId),new StringList((String)iBOMServiceForAdd.getInstanceIds().get(0)), bomAddInfoMap );
						StringBuffer xml=updateXML(new StringList(chObjectId),new StringList((String)iBOMServiceForAdd.getInstanceIds().get(0)), bomAddInfoMap );
						selectedRows.append(xml.toString());
			    		
			    		iBOMServiceForCut.remove( context, getBOMAddIngress(bomCutInfoMap, changedColumnMap) );
			    		//appendUIChangesForCutInView(sbUIChangeXMLCut,  bomCutInfoMap, iBOMServiceForCut);
						removexml = appendUIChangesForCutInView(bomCutInfoMap);
						removedRows.append(removexml.toString());
						relID.add(iBOMServiceForAdd.getInstanceIds().get(0).toString());
			    		/*jsonObjBuilder.add("result", "pass");
			    		jsonObjBuilder.add("messaage", dropSuccessful);
			    		jsonObjBuilder.add("relIds", iBOMServiceForAdd.getInstanceIds().get(0).toString());
			    		jsonObjBuilder.add("onDrop", "function () {"+sbUIChangeXMLCut.toString()+sbUIChangeXMLAdd.toString()+"}");
						*/
					}
			    	else{
			    		/* For auto collaboration .st */
			    		iBOMServiceForAdd.setCollaboratToDesign(true);
			    		/* For auto collaboration .en */
			    		iBOMServiceForAdd.add( context, getBOMAddIngress(bomAddInfoMap, getBOMAttributes(context, changedColumnMap) ) );
				    	//appendUIChangesForAddinView( sbUIChangeXMLAdd,new StringList(chObjectId),new StringList((String)iBOMServiceForAdd.getInstanceIds().get(0)), bomAddInfoMap );
				    	//jsonObjBuilder.add("result", "pass");
				    	//jsonObjBuilder.add("onDrop", "function () {"+sbUIChangeXMLAdd.toString()+"}");
				    	
						StringBuffer xml=updateXML(new StringList(chObjectId),new StringList((String)iBOMServiceForAdd.getInstanceIds().get(0)), bomAddInfoMap );
						selectedRows.append(xml.toString());
			    	}
			    }
//Added to pass consolidated xml for all selected objects instead of sending one by one. This is required to resolve UI issue of multiple objects drop
					String rowInfo = getParentRowIdInfo( getRowId(bomAddInfoMap) );
					freezePaneregister.append(" FreezePaneregister(\"").append(rowInfo).append("\"); rebuildView();").append(" emxEditableTable.addToSelected('<mxRoot><action>add</action><data status=\"committed\">");
					freezePaneunregister.append(" </data></mxRoot>');").append(" FreezePaneunregister(\"").append(rowInfo).append("\"); rebuildView();");
					updatedXML=(freezePaneregister.append(selectedRows).append(freezePaneunregister)).toString();
				if(dropAction.equalsIgnoreCase("Move")){	
						jsonObjBuilder.add("result", "pass");
						jsonObjBuilder.add("messaage", dropSuccessful);
						jsonObjBuilder.add("relIds", relID.toString());
						jsonObjBuilder.add("onDrop", "function () {"+removedRows.toString()+updatedXML.toString()+"}");
					}else{
						jsonObjBuilder.add("result", "pass");
						jsonObjBuilder.add("onDrop", "function () {"+updatedXML+"}");
			    }
			   
			    ret = jsonObjBuilder.build();
			    ContextUtil.commitTransaction(context);
			    
			}
			 catch (Exception e)
	        {
			   ContextUtil.abortTransaction(context);
			   String message = e.toString();
			   message=message.replaceFirst(":*", "");
			   jsonObjBuilder.add("result", "fail");
			   jsonObjBuilder.add("message", message);
			   ret = jsonObjBuilder.build();
			   return ret;
	        }
	    
	    return ret;
	    
    }
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public StringBuffer  updateBOMInView(Context context, String [] args) throws Exception {
		Map bomOperationMap = JPO.unpackArgs(args);
		String WorkUnderOID = (String) bomOperationMap.get("WorkUnderOID");
		WorkUnderOID = BOMMgtUtil.isNotNullAndNotEmpty(WorkUnderOID)?WorkUnderOID:"";
		StringBuffer sbUIChangeXML = new StringBuffer();
		
		try{
			ContextUtil.startTransaction(context, true);
			
			ECMUtil.setWorkUnderChange(context, WorkUnderOID);
			
			StringList relIds = new StringList(); 
			
			if ( isAdd(bomOperationMap) ) {
				StringBuffer sbUIChangeXMLAdd = new StringBuffer();
				String parentObjId = (String) bomOperationMap.get("ParentObjId");
				StringList childObjList = (StringList) bomOperationMap.get("ChildObjectIds");
				Map changedColumnMap = (Map) bomOperationMap.get("ColumnValue");
				
				IBOMService iBOMServiceForAdd;
				Map<String, String> bomAddInfoMap = new HashMap<String, String>();
				bomAddInfoMap.put( PARENT_ID, parentObjId );
				for (int i=0; i<childObjList.size(); i++) {
					bomAddInfoMap.put( OBJECT_ID, childObjList.get(i).toString() );
					iBOMServiceForAdd = IBOMService.getService(context, parentObjId, false);
					
					IBOMIngress iBOMIngressForAdd = getBOMAddIngress(bomAddInfoMap, getBOMAttributes(context, changedColumnMap) );
					/* Added for EBOM Sync st*/ 
					iBOMServiceForAdd.setCollaboratToDesign(true);
					/* Added for EBOM WorkUnder en*/ 
					iBOMServiceForAdd.setAuthoringChange(WorkUnderOID);
					iBOMServiceForAdd.add( context, iBOMIngressForAdd);
					    									
					relIds.add(iBOMServiceForAdd.getInstanceIds().get(0).toString());
				}
				
				appendUIChangesForAddinView( sbUIChangeXMLAdd,childObjList,relIds, bomAddInfoMap );
				sbUIChangeXML = sbUIChangeXMLAdd;
			}
			if ( isCut(bomOperationMap) ) {
				StringList sConnectionID = (StringList) bomOperationMap.get("relIds");
				IBOMService iBOMServiceForCut;
				for (int i=0; i<sConnectionID.size(); i++) {
					iBOMServiceForCut = IBOMService.getService(context, (String) sConnectionID.get(i), true);
					if ( isRollupView(bomOperationMap) ) { iBOMServiceForCut.setAuthoringMode_Rollup(); }
					IBOMIngress iBOMIngress = getBOMCutIngress(context,iBOMServiceForCut.getConnectionId());
					
					/* Added for EBOM Sync st*/ 
					iBOMServiceForCut.setCollaboratToDesign(true);
					/* Added for EBOM Sync en*/ 
					iBOMServiceForCut.setAuthoringChange(WorkUnderOID);					
	        		iBOMServiceForCut.remove(context, iBOMIngress);
				}
				
			}
			if ( isReplaceAdd(bomOperationMap) ) {
				
				StringBuffer sbUIChangeXMLAdd = new StringBuffer();
				String parentObjId = (String) bomOperationMap.get("parentObjId");
				StringList childObjList = (StringList) bomOperationMap.get("NewChildObjectIds");
				
				Map<String, String> bomReplaceInfoMap = new HashMap<String, String>();
				String replaceID = (String) bomOperationMap.get("replaceCutId");
				Map<String, String> bomAddInfoMap = new HashMap<String, String>();
				bomAddInfoMap.put( PARENT_ID, parentObjId );
				
				IBOMService iBOMServiceForAdd;
				IBOMService iBOMServiceForReplace;
	    		
				
				Map changedColumnMap = (Map) bomOperationMap.get("columnValue");
				bomReplaceInfoMap.put( PARENT_ID, parentObjId );

				Map<String, String> bomCutInfoMap = new HashMap<String, String>();
				bomCutInfoMap.put(CONNECTION_ID, replaceID);
	    		bomCutInfoMap.put(BOM_OPERATION, BOM_OPERATION_ADD );
	    		bomCutInfoMap.put( OBJECT_ID, childObjList.get(0).toString() );
	    		
	    		iBOMServiceForReplace = IBOMService.getService(context, replaceID, true);
	    		if ( isRollupView(bomOperationMap) ) { iBOMServiceForReplace.setAuthoringMode_Rollup(); }

	    		/* Added for EBOM Sync st*/ 
				iBOMServiceForReplace.setCollaboratToDesign(true);
				/* Added for EBOM Sync en*/ 
				iBOMServiceForReplace.setAuthoringChange(WorkUnderOID);
	    		
	    		changedColumnMap.put(BOMMgtConstants.ATTRIBUTE_UNIT_OF_MEASURE, IPartService.getInfo(context, childObjList.get(0).toString()).getUnitOfMeasure());
	    		
				if(iBOMServiceForReplace.isAuthoringMode_Rollup()){
	    			changedColumnMap.put(BOMMgtConstants.ATTRIBUTE_QUANTITY, BOMMgtUtil.getRollupQuantity(context, replaceID));
	    		}
	    		
	    		iBOMServiceForReplace.replace(context, getBOMReplaceIngress(bomCutInfoMap, getBOMAttributes(context, changedColumnMap)));
        		relIds.add(replaceID);
	    		
				for (int i=1; i<childObjList.size(); i++) {
			    	bomAddInfoMap.put( OBJECT_ID, childObjList.get(i).toString() );
			    	changedColumnMap.put(BOMMgtConstants.ATTRIBUTE_UNIT_OF_MEASURE, IPartService.getInfo(context, childObjList.get(i).toString()).getUnitOfMeasure());
		    		iBOMServiceForAdd = IBOMService.getService(context, parentObjId, false);
		    		iBOMServiceForAdd.setAuthoringChange(WorkUnderOID);
		    		iBOMServiceForAdd.add( context, getBOMAddIngress(bomAddInfoMap, getBOMAttributes(context, changedColumnMap) ) );
		    		relIds.add(iBOMServiceForAdd.getInstanceIds().get(0).toString());
		    	}
				
				appendUIChangesForAddinView( sbUIChangeXMLAdd,childObjList,relIds, bomReplaceInfoMap );
				sbUIChangeXML = sbUIChangeXMLAdd;
			}
			ContextUtil.commitTransaction(context);
		} catch (Exception e)
        {
			String strExceptionMsg = e.toString();
			ContextUtil.abortTransaction(context);
			throw new FrameworkException(strExceptionMsg);
        }
		return sbUIChangeXML;
	}
	
	/** this api is called from UI components like commands and Menus for disabling the Edit command in instance view.
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
    @com.matrixone.apps.framework.ui.ProgramCallable
	public boolean disableAuthoringMenus(Context context, String [] args) throws Exception {
    	return !isRollupView( JPO.unpackArgs(args) );
    }
    
    /** this api is called from UI components like commands and Menus for disabling the Edit command in instance view.
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
    @com.matrixone.apps.framework.ui.ProgramCallable
	public StringList disableModifyingColumnsInRollUp(Context context, String [] args) throws Exception {
    	StringList slReturnList = new StringList();
    	Map programMap = JPO.unpackArgs(args);
    	MapList mlObjectList = (MapList)programMap.get("objectList");
    	for(int i =0; i<mlObjectList.size();i++){
    		String sEditable = "true";
    		if(isRollupView(getRequestMap(programMap))){
    			if(BOMMgtUtil.isNotNullAndNotEmpty(((String)((Map)mlObjectList.get(i)).get(EngineeringConstants.SELECT_RELATIONSHIP_ID)))){sEditable = "false";}
    		}
    		slReturnList.add(sEditable);
    	}
    	return slReturnList;
    }
    /** this api is called from UI components to check if TreeOder can be modified.
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
    @com.matrixone.apps.framework.ui.ProgramCallable
	public boolean isModifyTreeOderAllowed(Context context, String [] args) throws Exception {
    	Map programMap = JPO.unpackArgs(args);
    	
    	String objectId = BOMMgtUtil.getStringValue(programMap, "objectId");
    	
    	IPartService iPartService = IPartService.getService(context, objectId);
    	
		IPart iPart = iPartService.getInfo(context);
		return iPart.isInWork();
    }
    
    /** gets the Authoring lock for the given ebom rel or instance
     * @param context
     * @param args
     * @return
     * @throws Exception
     * emxEngineeringCentral.Part.EBOM
     * 
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getAuthoringLock(Context context, String [] args) throws Exception {
    	Map programMap = JPO.unpackArgs(args);
    	StringList authoringLockList = new StringList();
    	
    	Map paramMap = (Map) programMap.get("paramList");
    	MapList objectList = (MapList) programMap.get("objectList");
    	
    	String select_I_authorable = "frommid["+BOMMgtConstants.RELATIONSHIP_VPM_PROJECTION+"].torel.attribute["+BOMMgtConstants.ATTRIBUTE_AUTHORABLE+"].value";
    	
    	boolean boolRoolupView = isRollupView(paramMap);
    	Map objectMap;
    	String authoringLock = "";
    	Iterator <Map> objectListIterator = objectList.iterator();
    	
	    String sDesign = BOMMgtUtil.getDisplayPropertyValue(context, "emxEngineeringCentral.AuthoringLock.Design", "emxEngineeringCentralStringResource");
	    String sEBOM = BOMMgtUtil.getDisplayPropertyValue(context, "emxEngineeringCentral.AuthoringLock.EBOM", "emxEngineeringCentralStringResource");
	    String sNone = BOMMgtUtil.getDisplayPropertyValue(context, "emxEngineeringCentral.AuthoringLock.None", "emxEngineeringCentralStringResource");
	    
    	while ( objectListIterator.hasNext() ) {
    		objectMap = objectListIterator.next();
    		if ( !"true".equalsIgnoreCase( BOMMgtUtil.getStringValue(objectMap, "Root Node") ) ) {
    			authoringLock = BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_ATTRIBUTE_AUTHORABLE);
    			
    			if ( BOMMgtUtil.isNullOrEmpty(authoringLock) ) { // For newly added row in edit mode this check will be true.
    				String connectionId = BOMMgtUtil.getStringValue(objectMap, BOMMgtConstants.SELECT_RELATIONSHIP_ID);
    				
    				if ( BOMMgtUtil.isNotNullAndNotEmpty(connectionId) ) {
    					Map <String, String> relInfoMap = IBOMService.getInfo(context, connectionId).getAttributeMap();
    					
    					IEBOM iEBOM = IEBOM.getService(relInfoMap);
    					
    					if(boolRoolupView && iEBOM.isUnitOfMeasure_Each()) {
    						
    						Map rollupMap = BOMMgtUtil.getRollupDataMap(context, connectionId);
    						StringList instanceIdList = (StringList) rollupMap.get(BOMMgtConstants.ROLLUP_CONNECTION_IDS);
    						
    						RelationshipWithSelectItr relationshipWithSelectItr = BOMMgtKernel.relWithSelectListItr(context, 
    								BOMMgtUtil.getValuesInArray(instanceIdList), 
    								BOMMgtUtil.createStringList(new String[] 
    																					{BOMMgtConstants.SELECT_ATTRIBUTE_AUTHORABLE,
    																					  select_I_authorable}));
    								RelationshipWithSelect relationshipWithSelect;
    						
    						Vector  vec_Auth_val= new Vector();		
    						while ( relationshipWithSelectItr.next() ) {
    							relationshipWithSelect = relationshipWithSelectItr.value();
    							String r_auth = relationshipWithSelect.getSelectData(BOMMgtConstants.SELECT_ATTRIBUTE_AUTHORABLE);
    							String i_auth = relationshipWithSelect.getSelectData(select_I_authorable);
    							
    							if(r_auth == null ) r_auth = "";
    			    			if(i_auth == null ) i_auth = "";
    			    			
    				    		String sControl = r_auth.equalsIgnoreCase("false") ? sDesign :  (i_auth.equalsIgnoreCase("false")
    				    				?sEBOM
    				    				:sNone);
    				    		
    							if ( !vec_Auth_val.contains(sControl)) {
    								vec_Auth_val.add(sControl);
    							}
    						}

    						Collections.sort(vec_Auth_val);
    		
    						Iterator itr = vec_Auth_val.iterator();
    						String s_AuthFlag = "";
    						while (itr.hasNext()){
    							if (s_AuthFlag.length()!= 0) {
    								s_AuthFlag = s_AuthFlag+ "; " + (String)itr.next();
    							} else {
    								s_AuthFlag =(String)itr.next() ;
    							}
    						}
    						authoringLockList.add(s_AuthFlag);
    					} else {
    						String r_authorable = iEBOM.getAuthorable();
    						
    						/* check for instance only if EBOM rel is null */
    						if ( r_authorable == null) {
    						StringList selectable = new StringList();
							selectable.add(select_I_authorable);
							String[] arrConn = new String[1];
				    		arrConn[0]= connectionId;
				    	
							MapList sResultMap = DomainRelationship.getInfo(context,arrConn , selectable);
							Iterator itr     = sResultMap.iterator();
							Map map = (Map) itr.next();
    							Object  i_authorable = (Object) map.get(select_I_authorable);

    							if(i_authorable!= null ) {
    								if (i_authorable.getClass().getName().contains("matrix.util.StringList")){
    									StringList  i_authorableSL = (StringList) map.get(select_I_authorable);
			    			
    									for (Object objSel : i_authorableSL) 
    									{
    										String i_authorableStr = objSel.toString();
			    							if (i_authorableStr.length() > 0 && i_authorableStr.equalsIgnoreCase("false")) {
			    								String sControl =sEBOM;
			    								authoringLockList.add(sControl);
			    							}else{
			    								authoringLockList.add("");
			    							}
    									}
    								} else {
    									String  i_authorableStr = (String) map.get(select_I_authorable);
			    			
			    			if(r_authorable == null ) r_authorable = "";
    									if(i_authorableStr == null ) i_authorableStr = "";
					    					String sControl = r_authorable.equalsIgnoreCase("false") ? sDesign:  (i_authorableStr.equalsIgnoreCase("false")?sEBOM:"") ;
			    			authoringLockList.add(sControl);
    					}
    							} 
								else{
									authoringLockList.add("");
								}
    						} else  { 
								String sControl = r_authorable.equalsIgnoreCase("false") ? sDesign: sEBOM ;
								authoringLockList.add(sControl); }  
    					}
    				}
    			}
    		}
    	}
    	
    	return authoringLockList;
    }
    
	public boolean isUnifiedChangeCollaborationEnabled(Context context, String[] args) throws Exception{
			return SynchronizationUtil.isUnifiedChangeCollaborationEnabled(context);
	}
	
	/** This method is invoked from ECM Access program/function from Part properties page to display set/unset Change Controlled command
   * @param context enovia context
   * @param args arguments passed from UI.
   * @return true if change controlled field is false
   * @throws Exception if any operation fails.
   */
  
  public boolean showECMChangeControlCommands(Context context,String[] args)throws Exception{
		HashMap programMap    = (HashMap) JPO.unpackArgs(args);		
		String partId           = (String) programMap.get("objectId");
			
        IPartService iPartService = IPartService.getService(context, partId);		
		IPart iPart = iPartService.getInfo(context);	
		if(EngineeringConstants.POLICY_MANUFACTURING_PART.equalsIgnoreCase(iPart.getPolicy())){// For Manufacturing part hide set Change Required and Unset change required.
			return false;
		}
		
		return !(iPart.isApproved() || iPart.isFrozen() || PartMgtConstants.POLICY_MANUFACTURER_EQUIVALENT.equalsIgnoreCase(iPart.getPolicy()));

	}
	

	/** Method to get the LinkedList of IDs in the same order as in the TreeMap.
	 * @param context eMatrix Context object.
	 * @param addNextIDs TreeMap with the order as the key and StringList of the IDs as the value. 
	 * @return Linked list of all the IDs in the same order as in TreeMap
	 */
	private LinkedList<String> getSortedAddNextIDs(Context context, TreeMap <Integer, StringList> addNextIDs) {
		LinkedList<String> returnList=new LinkedList<String>();
		for(int i=0; i<addNextIDs.size();i++){
			returnList.addAll((StringList)addNextIDs.get(i));
		}
		
		return returnList;
	}

	/**Function to Persist the TreeOrder.
	 * @param context eMatrix Context object.
	 * @param persistDataMapList MapList containing the Map of data that needs to be persisted.
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void reorderBOMStructure (Context context, MapList persistDataMapList) throws Exception {
		Iterator itr=persistDataMapList.iterator();
		Map tempMap=new HashMap();
		String selRelId;
		String nextRelId;
		LinkedList newRels;
		LinkedList allIDs=new LinkedList();
		while(itr.hasNext()){
			tempMap=(Map) itr.next();
			selRelId=(String) tempMap.get("selectedRelID");
    		nextRelId=(String) tempMap.get("nextRelID");
    		newRels=(LinkedList) tempMap.get("newRelIDs");
			if(PartMgtUtil.isNotNullAndNotEmpty(selRelId)){
        		allIDs.add(selRelId);
			}
    		allIDs.addAll(newRels);
			if(PartMgtUtil.isNotNullAndNotEmpty(nextRelId)){
        		allIDs.add(nextRelId);
			}

 		if(allIDs != null && allIDs.size()>0){
     		IBOMOrderService treeOrderImpl = IBOMOrderService.getService();
    		treeOrderImpl.persistOrder(context, allIDs,newRels);
    		IBOMCollaborationService iCollabService = new BOMCollaborationService();
    		iCollabService.modify(context, newRels);
 		}
		}	
	}

	/**Column Function to fetch the Maturity details of the collaborated Product.
	 * @param context eMatrix Context object.
	 * @param args
	 * @return Vector containing the maturity of the collaborated Products in a Particular level.
	 * @throws Exception
	 */
	public Vector displayProductMaturityInTable(Context context, String[] args) throws Exception {
		    HashMap programMap = (HashMap)JPO.unpackArgs(args);

		    MapList objList = (MapList)programMap.get("objectList");
		    Vector <String> columnVals = new Vector <String> (objList.size());
		    Iterator itr = objList.iterator();
		    Map tempMap = new HashMap();
			String strState = "";
			String partId = "";
			String prodId = "";
			
			while (itr.hasNext()) {
				tempMap = (Map) itr.next();
				partId = (String) tempMap.get(EngineeringConstants.SELECT_ID);
				strState = "";
				
				IPartService iPartService = IPartService.getService(context, partId); 
				prodId = iPartService.getCollaboratedDesignId(context);
				
				if(UIUtil.isNotNullAndNotEmpty(prodId)){
					StringList selectStmtsList = new StringList();
					selectStmtsList.add(EngineeringConstants.SELECT_POLICY);
					selectStmtsList.add(EngineeringConstants.SELECT_CURRENT);

					DomainObject domObj = new DomainObject(prodId);

					Map <String, String> prodDataMap = domObj.getInfo(context, selectStmtsList);
					
			        String strProdPolicy = prodDataMap.get(EngineeringConstants.SELECT_POLICY);
			        String strProdState = prodDataMap.get(EngineeringConstants.SELECT_CURRENT);
			        String strProdStateKey = "emxFramework.State."+strProdPolicy+"."+strProdState;
			        strState = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(),strProdStateKey);
				}
		        columnVals.addElement(strState);
			}

			return columnVals;
		}

    /** this api is called to hide instance title column in rollup view
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
    @com.matrixone.apps.framework.ui.ProgramCallable
	public boolean hideInstanceColumnsInRollupView(Context context, String [] args) throws Exception {
    	return !isRollupView( JPO.unpackArgs(args) );
    }
    /** this api is called to hide instance title column in markup table
   	 * @param context
   	 * @param args
   	 * @return
   	 * @throws Exception
   	 */
       @com.matrixone.apps.framework.ui.ProgramCallable
   	public boolean hideInstanceColumnsInMarkup(Context context, String [] args) throws Exception {
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	String fromMarkupView = (String) programMap.get("fromOpenMarkup");
    	return !(UIUtil.isNotNullAndNotEmpty(fromMarkupView) && "true".equalsIgnoreCase(fromMarkupView));


       }
	   private StringBuffer updateXML(StringList childObjList,StringList relIDs, Map <String, String> bomOperationMap) {    	
		StringBuffer strXml=new StringBuffer();
		strXml.append(" <item oid=\"").append( getObjectId(bomOperationMap) ).append("\" relType=\"EBOM\" relId=\"")
				   .append( relIDs.get(0) ).append("\" pid=\"").append( getParentId(bomOperationMap) ).append("\" direction=\"\"></item>");
		return strXml;
	}
		     /*
        *   Pads zero to the find number based on the emxBOMPartManagement.FindNumberLength value
        *
        *   @param : fnValue the actual string which needs to be padded
        *   @return returns the Padded string
        *   @throws Exception if error encountered while carrying out the request
        */

       String findNumberPadding(String fnValue) throws Exception {

            boolean isStrNumber=true;
            int fnLen = Integer.parseInt(fnLength);
            String fnNothing=" ";

            String fnValuesVector = "";

       	 //Added below code to fix bug 333456
       	 if(fnValue == null || "null".equalsIgnoreCase(fnValue)) {
       		 fnValue = "";
       	 }
            //Checking whether Find number is a number or a String
            if(!fnValue.startsWith("0"))
            {
                try
                {
      			Long.valueOf(fnValue);
                }
                catch (Exception ex)
                {
                     isStrNumber = false;
                }
            }
            else
            {
                isStrNumber = false;
            }

            //Display the leading zeros only if find number length >0
            //Find number is number and display leadingzeros property set to true
            if(fnLen>0 && isStrNumber && "true".equalsIgnoreCase(fnDisplayLeadingZeros))
            {
                for(int i=0;i<=fnLen;i++)
                {
                   if(fnValue.length()<fnLen)
                   {

                       fnValue = "0"+fnValue;
                   }
                   else
                   {
                   	fnValuesVector= fnValue;
                       break;
                   }
                 }
             }
             else
             {
                 if(!"".equals(fnValue))
                 {
               	  fnValuesVector = fnValue;
                 }
                 else
                 {
               	  fnValuesVector= fnNothing;
                 }
             }
            return fnValuesVector;
        }

}
