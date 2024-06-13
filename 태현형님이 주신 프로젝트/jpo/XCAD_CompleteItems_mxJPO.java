
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class XCAD_CompleteItems_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__XCADModeler_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADModeler");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__XCAD_GetFamilyFromIte = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetFamilyFromItem");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__XCADModelAndItemsMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADModelAndItemsModeler/XCADModelRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__XCAD_GetDependenciesR = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetDependenciesRepToRep");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__XCAD_GetItemsFromFami = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetItemsFromFamily");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__XCAD_GetComposedRefTo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetComposedRefToRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__XCAD_GetCompositionRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetCompositionRefToRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__RelationClass_div_XCA = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RelationClass/XCADComposition");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__XCAD_GetComponentFrom = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetComponentFromLink");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__XCAD_ExpandReverseOn = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_ExpandReverseOne");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__XCAD_ExpandRefOne_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_ExpandRefOne");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_inRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_input = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_family = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_familyObj = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_items = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_composer = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_composed = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_allComp = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_compoLinks = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_component = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_expand = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_output = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_depLinks = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_fullFamilyObj = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_fullItems = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_fullExpand = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSet_inRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		PLMIDSet_input.setValue( PLMIDSet_inRef );
		PLMIDSet_family.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_2__XCAD_GetFamilyFromIte, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_input } ) ) );
		PLMIDSet_familyObj.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_family, _STRING_3__XCADModelAndItemsMode ) );
		PLMIDSet_depLinks.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_4__XCAD_GetDependenciesR, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_familyObj } ) ) );
		PLMIDSet_fullFamilyObj.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_depLinks, _STRING_3__XCADModelAndItemsMode ) );
		PLMIDSet_fullItems.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_5__XCAD_GetItemsFromFami, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_fullFamilyObj } ) ) );
		PLMIDSet_items.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_5__XCAD_GetItemsFromFami, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_familyObj } ) ) );
		PLMIDSet_input.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet_input, PLMIDSet_items ), PLMIDSet_fullItems ) );
		PLMIDSet_composer.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_6__XCAD_GetComposedRefTo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_input, _STRING_0__PRODUCTCFG_div_VPMRef ) } ) ) );
		PLMIDSet_composed.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_7__XCAD_GetCompositionRe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_composer, _STRING_0__PRODUCTCFG_div_VPMRef ) } ) ) );
		PLMIDSet_allComp.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet_composed, PLMIDSet_composer ) );
		PLMIDSet_compoLinks.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_allComp, _STRING_8__RelationClass_div_XCA ) );
		PLMIDSet_component.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_9__XCAD_GetComponentFrom, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_compoLinks } ) ) );
		PLMIDSet_expand.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_10__XCAD_ExpandReverseOn, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_component, _STRING_0__PRODUCTCFG_div_VPMRef ) } ) ) );
		PLMIDSet_fullItems.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet_fullItems, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_component, _STRING_0__PRODUCTCFG_div_VPMRef ) ) );
		PLMIDSet_fullExpand.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_11__XCAD_ExpandRefOne_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_fullItems, _STRING_0__PRODUCTCFG_div_VPMRef ) } ) ) );
		PLMIDSet_output.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet_compoLinks, PLMIDSet_component ), PLMIDSet_expand ), PLMIDSet_family ), PLMIDSet_items ), PLMIDSet_depLinks ), PLMIDSet_fullItems ), PLMIDSet_fullExpand ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSet_output ) );
	}
}
