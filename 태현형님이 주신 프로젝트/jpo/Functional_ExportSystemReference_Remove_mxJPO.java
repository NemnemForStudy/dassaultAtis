
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Functional_ExportSystemReference_Remove_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__RFLPLMFunctional_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMFunctional/RFLPLMFunctionalReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__RFLPLMFunctional_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMFunctional");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__RFLPLMFunctionalRefer = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMFunctionalReference_RepAggregated");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.parameter_modeler.procedures.PlmParameterProcedure_AllParams");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet InputPLMIDSetRestrictedToRefs = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet SetOfAggregatedFctRepRef = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet SetOfPLMParameters = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		InputPLMIDSetRestrictedToRefs.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__RFLPLMFunctional_div_ ) );
		SetOfAggregatedFctRepRef.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__RFLPLMFunctional_, _STRING_2__RFLPLMFunctionalRefer, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { InputPLMIDSetRestrictedToRefs } ) );
		SetOfPLMParameters.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_3__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { InputPLMIDSetRestrictedToRefs } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( SetOfAggregatedFctRepRef ) ), SetOfPLMParameters ) );
	}
}
