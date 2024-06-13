
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class XCAD_CompleteItemsForTSO_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__XCADModeler_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADModeler");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__XCAD_GetComposedRefTo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetComposedRefToRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__XCAD_GetCompositionRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetCompositionRefToRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__RelationClass_div_XCA = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RelationClass/XCADComposition");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__XCAD_GetComponentFrom = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetComponentFromLink");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__XCAD_ExpandReverseOne = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_ExpandReverseOne");

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
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_composer = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_composed = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_allComp = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_compoLinks = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_component = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_expand = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_output = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSet_inRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		PLMIDSet_input.setValue( PLMIDSet_inRef );
		PLMIDSet_composer.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_2__XCAD_GetComposedRefTo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_input } ) ) );
		PLMIDSet_composed.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_3__XCAD_GetCompositionRe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_composer } ) ) );
		PLMIDSet_allComp.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet_composed, PLMIDSet_composer ) );
		PLMIDSet_compoLinks.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_allComp, _STRING_4__RelationClass_div_XCA ) );
		PLMIDSet_component.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_5__XCAD_GetComponentFrom, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_compoLinks } ) ) );
		PLMIDSet_expand.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_6__XCAD_ExpandReverseOne, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_component, _STRING_0__PRODUCTCFG_div_VPMRef ) } ) ) );
		PLMIDSet_output.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet_compoLinks, PLMIDSet_component ), PLMIDSet_expand ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSet_output ) );
	}
}
