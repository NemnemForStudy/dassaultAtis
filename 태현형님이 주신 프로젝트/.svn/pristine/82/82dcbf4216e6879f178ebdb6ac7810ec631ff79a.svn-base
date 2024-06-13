
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class ProductionSystem_ExchangeXPDM_Execution_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELLmiProductionSyste = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystem/DELLmiProductionSystemReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELLmiProductionHeade = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionHeaderProcessAbstract/DELLmiPPRHeaderProcessReferenceAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.process.procedures.ProcedureCalls_GetSystemWithScope");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__DELLmiProductionSyste = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystemAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__ENOPsm_ProductionSyst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_ProductionSystem_expandForExecution");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.process.procedures.ProcedureCalls_GetSystemWithoutScope");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.process.procedures.ProcedureCalls_GetSystemWithoutResourceScope");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__ProductionSystem_Exch = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductionSystem_ExchangeXPDM_XPDM2");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetExpandWithScope = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRootRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRootWithScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetExpandWithScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetExpandWithoutScopeOnMBOM = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetExpandWithoutScopeFromRes = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDAll = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetForXPDM2 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetRootRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELLmiProductionSyste ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELLmiProductionHeade ) ) );
		PLMIDSetRootWithScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_2__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRootRef } ) );
		PLMRouteSetExpandWithScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_3__DELLmiProductionSyste, _STRING_4__ENOPsm_ProductionSyst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRootWithScope } ) );
		PLMIDSetExpandWithScope.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetExpandWithScope, _STRING_5__all_ ) );
		PLMIDSetExpandWithoutScopeOnMBOM.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_6__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRootRef } ) );
		PLMIDSetExpandWithoutScopeFromRes.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_7__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRootRef } ) );
		PLMIDSetForXPDM2.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetExpandWithScope ), PLMIDSetExpandWithoutScopeOnMBOM ), PLMIDSetExpandWithoutScopeFromRes ) );
		PLMIDAll.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_8__ProductionSystem_Exch, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetForXPDM2 } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetForXPDM2, PLMIDAll ) );
	}
}
