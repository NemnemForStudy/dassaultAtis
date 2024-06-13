
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Resource_TSO_References_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__PLMDocConnection_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__PLMDocConnection_retr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection_retrieveAllConnections");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__ENOPcx_PPRContext_add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcx_PPRContext_addAllConnections");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__ENORsc_Resource_addSh = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENORsc_Resource_addShifts");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPortCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetAttachedDocCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetShifts = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDProductRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDPortCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAttachedDocCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDShifts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet restrictedPLMIDSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDProductRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		PLMRouteSetAttachedDocCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__PLMDocConnection_, _STRING_2__PLMDocConnection_retr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDProductRef } ) );
		PLMIDSetAttachedDocCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetAttachedDocCnx, _STRING_3__all_ ) );
		PLMRouteSetPortCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__DELPPRContextModel_, _STRING_5__ENOPcx_PPRContext_add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDProductRef } ) );
		PLMIDPortCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPortCnx, _STRING_3__all_ ) );
		PLMRouteSetShifts.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__DELPPRContextModel_, _STRING_6__ENORsc_Resource_addSh, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { restrictedPLMIDSet } ) );
		PLMIDShifts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetShifts ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetAttachedDocCnx ), PLMIDPortCnx ), PLMIDShifts ) );
	}
}
