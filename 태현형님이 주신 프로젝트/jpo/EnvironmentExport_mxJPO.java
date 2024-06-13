
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class EnvironmentExport_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PLM3DXEnvironment_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLM3DXEnvironment");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__PLM3DX_getAmbienceDoc = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLM3DX_getAmbienceDocument");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_PLMDMTDocument = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet Rts_PLMDMTDocument = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		Rts_PLMDMTDocument.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_0__PLM3DXEnvironment_, _STRING_1__PLM3DX_getAmbienceDoc, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { iPLMIDSet } ) );
		Ids_PLMDMTDocument.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( Rts_PLMDMTDocument ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, Ids_PLMDMTDocument ) );
	}
}
