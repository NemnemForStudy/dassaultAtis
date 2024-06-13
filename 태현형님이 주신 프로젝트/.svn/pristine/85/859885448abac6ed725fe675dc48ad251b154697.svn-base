
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class ProductionPlan_ExchangeXPDM_XPDM2_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELLmiProductionExecH = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionExecHeaderOperation/DELLmiExecHeaderOperationReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELLmiProductionExecH = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionExecHeaderOperation/DELLmiExecHeaderOperationInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__DELLmiWorkOrder_div_D = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiWorkOrder/DELLmiWorkOrderReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__DELLmiProductionPlan_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionPlan/DELLmiProductionPlanReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.process.procedures.ProcedureCalls_ExecutionTimeCst");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__DELLmiProductionSyste = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystemAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__ENOPsm_WorkOrder_addW = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_WorkOrder_addWhoResource");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__ENOPsm_ProductionSyst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_ProductionSystem_addSerializedFrom");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__ENOPsm_WorkOrder_addS = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_WorkOrder_addSerializationFromFromSR");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__ENOPpr_PPRData_addAl = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_addAllFathers");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__ENOPsm_WorkOrder_add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_WorkOrder_addWhereResource");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__ENOPsm_ProductionSys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_ProductionSystem_addImplementingResources");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetWhoResource = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetWhereResource = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetOldWhereResource = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPlanningSystem = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPlanningOpInst = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetAggrRef = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetExecHeaderOpRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetExecHeaderOpInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetWorkOrderRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProdPlanRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetWhoResource = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetWhereResource = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetOldWhereResource = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPlaningSystem = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPlaningOpInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAggrRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHeaderAndWO = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDTCRel = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetExecHeaderOpRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELLmiProductionExecH ) );
		PLMIDSetExecHeaderOpInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELLmiProductionExecH ) );
		PLMIDSetWorkOrderRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_2__DELLmiWorkOrder_div_D ) );
		PLMIDSetProdPlanRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_3__DELLmiProductionPlan_div_ ) );
		PLMIDSetHeaderAndWO.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetExecHeaderOpRef, PLMIDSetWorkOrderRef ) );
		PLMIDTCRel.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_4__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetHeaderAndWO } ) );
		PLMRouteSetWhoResource.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__DELLmiProductionSyste, _STRING_6__ENOPsm_WorkOrder_addW, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetExecHeaderOpRef } ) );
		PLMIDSetWhoResource.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetWhoResource, _STRING_7__all_ ) );
		PLMRouteSetPlanningSystem.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__DELLmiProductionSyste, _STRING_8__ENOPsm_ProductionSyst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetWorkOrderRef } ) );
		PLMIDSetPlaningSystem.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPlanningSystem, _STRING_7__all_ ) );
		PLMRouteSetPlanningOpInst.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__DELLmiProductionSyste, _STRING_9__ENOPsm_WorkOrder_addS, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetExecHeaderOpInst } ) );
		PLMIDSetPlaningOpInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPlanningOpInst, _STRING_7__all_ ) );
		PLMRouteSetAggrRef.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_10__DELPPRContextModel_, _STRING_11__ENOPpr_PPRData_addAl, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetPlaningOpInst } ) );
		PLMIDSetAggrRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetAggrRef, _STRING_7__all_ ) );
		PLMRouteSetWhereResource.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__DELLmiProductionSyste, _STRING_12__ENOPsm_WorkOrder_add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProdPlanRef } ) );
		PLMIDSetWhereResource.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetWhereResource, _STRING_7__all_ ) );
		PLMRouteSetOldWhereResource.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__DELLmiProductionSyste, _STRING_13__ENOPsm_ProductionSys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProdPlanRef } ) );
		PLMIDSetOldWhereResource.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetOldWhereResource, _STRING_7__all_ ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDTCRel ), PLMIDSetWhoResource ), PLMIDSetPlaningSystem ), PLMIDSetPlaningOpInst ), PLMIDSetAggrRef ), PLMIDSetWhereResource ), PLMIDSetOldWhereResource ) );
	}
}
