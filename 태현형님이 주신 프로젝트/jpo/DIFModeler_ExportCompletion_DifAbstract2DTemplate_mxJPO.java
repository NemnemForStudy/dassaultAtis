
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class DIFModeler_ExportCompletion_DifAbstract2DTemplate_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DIFStandard_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DIFStandard");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DifModeler_AddStandar = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DifModeler_AddStandard");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMDifTemplateRepSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMDifTemplateRepIDSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMDifTemplateRepSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_0__DIFStandard_, _STRING_1__DifModeler_AddStandar, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { iPLMIDSet } ) );
		PLMDifTemplateRepIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMDifTemplateRepSet ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMDifTemplateRepIDSet ) );
	}
}
