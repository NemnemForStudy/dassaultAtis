
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class SafetyReliabilitySource_ExportReview_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__CATSafety_div_Reliabi = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety/ReliabilitySource");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__CATSafety_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__CATSafety_GetReliabil = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety_GetReliabilitySourceFormula");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_RefLib = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet FormulaIds = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet FormulaRouteSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		PLMIDSet_RefLib.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__CATSafety_div_Reliabi ) );
		FormulaRouteSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATSafety_, _STRING_2__CATSafety_GetReliabil, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_RefLib } ) );
		FormulaIds.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( FormulaRouteSet ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet_RefLib, FormulaIds ) );
	}
}
