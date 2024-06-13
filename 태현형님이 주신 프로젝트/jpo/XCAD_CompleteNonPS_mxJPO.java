
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class XCAD_CompleteNonPS_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PLMCORE_div_PLMCoreRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__PLMCORE_div_PLMCoreRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__XCADModeler_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADModeler");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__XCAD_GetDependenciesR = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetDependenciesRefToRep");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__XCAD_GetDependenciesR = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetDependenciesRefToRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__XCAD_GetDependenciesR = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetDependenciesRepToRef");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_Rep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_RefIn = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_RepIn = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_Ref1 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_Ref2 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSet_RefIn.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PLMCORE_div_PLMCoreRe ) );
		PLMIDSet_RepIn.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__PLMCORE_div_PLMCoreRe ) );
		PLMIDSet_Rep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__XCADModeler_, _STRING_3__XCAD_GetDependenciesR, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_RefIn } ) ) );
		PLMIDSet_Ref1.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__XCADModeler_, _STRING_4__XCAD_GetDependenciesR, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_RefIn } ) ) );
		PLMIDSet_Ref2.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__XCADModeler_, _STRING_5__XCAD_GetDependenciesR, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_RepIn } ) ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSet_Rep ), PLMIDSet_Ref1 ), PLMIDSet_Ref2 ) );
	}
}
