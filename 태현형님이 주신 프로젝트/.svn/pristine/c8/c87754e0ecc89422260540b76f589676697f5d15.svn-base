
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class ECM_xPDM_ExportCA_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__Class_div_Change_Acti = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Change Action");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__Change_Action_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Change Action");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__ECM_ExportCA_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ECM_ExportCA");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCA = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetCA = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		PLMIDSetCA.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__Class_div_Change_Acti ) );
		PLMRouteSetCA.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__Change_Action_, _STRING_2__ECM_ExportCA_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetCA } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetCA ) ) );
	}
}
