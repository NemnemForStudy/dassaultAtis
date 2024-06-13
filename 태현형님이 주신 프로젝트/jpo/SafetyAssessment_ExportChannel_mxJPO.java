
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class SafetyAssessment_ExportChannel_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__CATSafety_div_SafetyA = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety/SafetyAssessment");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet safetyAssessmentIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		safetyAssessmentIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__CATSafety_div_SafetyA ) );
		oPLMIDSet.setValue( safetyAssessmentIdSet );
	}
}
