
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class PhysicalResource_ExchangeXPDM_XPDM2_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__VPMEditor_XPDM2_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMEditor_XPDM2_VPMReferenceCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__ENORsc_Resource_addAl = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENORsc_Resource_addAllFlowConnections");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__PLMHistorizationCnx_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx/PLMHistoLinkCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__PLMHistorizationCnx_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__PLMHistorizationCnx_a = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx_addHistoEntitiesFromCnx");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet2 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetHistoRef = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet1 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet1Ref = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDFlowAndHistoCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHistoRefCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHistoRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet restrictedPLMIDSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		restrictedPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		PLMIDSet1.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_1__VPMEditor_XPDM2_VPMRe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { restrictedPLMIDSet } ) );
		PLMIDSet1Ref.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet1, _STRING_0__PRODUCTCFG_div_VPMRef ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_VPMRef ) ) );
		PLMRouteSet2.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELPPRContextModel_, _STRING_3__ENORsc_Resource_addAl, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet1Ref } ) );
		PLMIDFlowAndHistoCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet2, _STRING_4__all_ ) );
		PLMIDSetHistoRefCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDFlowAndHistoCnx, _STRING_5__PLMHistorizationCnx_div_ ) );
		PLMRouteSetHistoRef.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_6__PLMHistorizationCnx_, _STRING_7__PLMHistorizationCnx_a, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetHistoRefCnx } ) );
		PLMIDSetHistoRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetHistoRef, _STRING_4__all_ ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSet1 ), PLMIDFlowAndHistoCnx ), PLMIDSetHistoRef ) );
	}
}
