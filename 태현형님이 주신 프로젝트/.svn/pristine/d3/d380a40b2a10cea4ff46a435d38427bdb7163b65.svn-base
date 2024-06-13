
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Rmt_Comment_ExportCompletion_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__Class_div_Comment_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Comment");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__Comment_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Comment");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__rmt_nav_comm_docs_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("rmt_nav_comm_docs");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__Class_div_DOCUMENTS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/DOCUMENTS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__DocumentCompletion_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DocumentCompletion");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsComments = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsDocs = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet CommDocs = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsOnlyDocs = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsDocsAndScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		IdsComments.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__Class_div_Comment_ ) );
		CommDocs.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__Comment_, _STRING_2__rmt_nav_comm_docs_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsComments } ) );
		IdsDocs.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( CommDocs ) );
		IdsOnlyDocs.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , IdsDocs, _STRING_3__Class_div_DOCUMENTS_ ) );
		IdsDocsAndScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_4__DocumentCompletion_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsOnlyDocs } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, IdsDocs ), IdsDocsAndScope ) );
	}
}
