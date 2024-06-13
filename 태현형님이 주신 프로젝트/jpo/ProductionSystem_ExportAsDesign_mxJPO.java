
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class ProductionSystem_ExportAsDesign_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELLmiProductionSyste = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystemPPR/DELLmiPPRSystemReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELLmiProductionSyste = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystemPPR/DELLmiPPRSystemInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__DELLmiProductionAbstr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionAbstractOperationPPR/DELLmiPPROperationReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__DELLmiProductionAbstr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionAbstractOperationPPR/DELLmiPPROperationInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__DELLmiProductionOpera = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionOperationPPR/DELLmiOperationPPRInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__DELLmiProductionSyste = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystemAbstract/DELLmiAbstractProductionEntity");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__PLMCORE_div_PLMCoreRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__PLMCORE_div_PLMCoreIn = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__DELLmiWorkOrder_div_D = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiWorkOrder/DELLmiWorkOrderReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__DELLmiProductionExecH = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionExecHeaderOperation/DELLmiExecHeaderOperationReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__DELLmiProductionPlan = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionPlan/DELLmiProductionPlanReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__Config_GetStructConf = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Config_GetStructConfig");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__DELLmiProductionSyst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystemAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__ENOPsm_ProductionSys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_ProductionSystem_addAllPortsRepInstAndCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__DELLmiProductionSyst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystemIOPort/DELLmiProdSystemIOPort");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__DELLmiProductionCand = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionCandidateResCnx/DELLmiCandidateResourcesCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_17__DELLmiProductionTime = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionTimeConstraintCnx/DELLmiTimeConstraintCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_18__DELLmiProductionMate = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionMaterialPathCnx1/DELLmiMaterialPathCnxCust");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_19__DELLmiProductionSyst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystemIOCnx/DELLmiProductionSystemIOCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_20__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx/DELAsmProcessCanUseCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_21__PLMCORE_div_PLMCoreR = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreRepInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_22__DELLmiProductionSyst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystemOutputCnxAbstract/DELLmiProductionSystemOutputCnxAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_23__PLMRequirementSpecif = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMRequirementSpecifyHowToCnxAbstract/PLMReqSpecifyHowToCnxAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_24__RFLPLMImplementConne = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMImplementConnection/RFLPLMImplementConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_25__PLMHistorizationCnx_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx/PLMHistoLinkCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_26__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_27__ENOPpr_PPRData_addRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_addRepRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_28__ENOPsm_ProductionSys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_ProductionSystem_addSerializedFrom");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_29__ENOPsm_WorkOrder_add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_WorkOrder_addWhereResource");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_30__ENOPsm_WorkOrder_add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_WorkOrder_addWhoResource");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_31__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_32__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_33__ProductCfg_Add3DPart = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_Add3DPartRepresentation");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_34__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.process.procedures.ProcedureCalls_ExecutionTimeCst");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_35__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_36__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx_addAllDocuments");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_37__ENOPsm_CandidateReso = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_CandidateResourceCnx_addAllDocuments");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_38__PLMDocConnection_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_39__PLMDocConnection_ret = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection_retrieveAllDocumentsIncludingCBP");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_40__ENOPsm_ProductionSys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPsm_ProductionSystem_addOutputEntitiesWithoutCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_41__ProductCfg_AddChildr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddChildrenProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_42__VPMEditor_GetAllRepr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMEditor_GetAllRepresentations");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_43__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_44__Class_div_DOCUMENTS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/DOCUMENTS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_45__DocumentCompletion_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DocumentCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_46__DELAsmAssemblyModelD = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelDisciplines/DetailedFasten");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_47__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.mbom.procedures.ProcedureCalls_GetHowToTargets");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetCapableDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetAttachedDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetRepRef = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetCandidateDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetSerial = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetOutputs = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProducts = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetWhereResource = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetWhoResource = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetResource3DPartRep = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSystemRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSystemInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetOpWkiRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetOpWkiInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetOpInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAllRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAllInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSystemOpInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDAllRefInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSystemRefOpInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDAllRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_ConfigData = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetIOPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCandidateCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetTimeCstCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetFlowCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetIOCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetImplementedCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAttachedDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRepInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRepRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetOutputCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHowToCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCandidateDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDWOAndExecHeaderOpRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSerial = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetOutputs = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProducts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductStructure = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDExecRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDWhereResource = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDExecOp = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDTCRel = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDWhoResource = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHistoRefCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDResourceRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDResource3DPartRep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDWorkOrder = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHeaderAndWO = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDAllDoc = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDDocsAndScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDDetailedFasten = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMHowToTargetSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetSystemRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELLmiProductionSyste ) );
		PLMIDSetSystemInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELLmiProductionSyste ) );
		PLMIDSetOpWkiRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_2__DELLmiProductionAbstr ) );
		PLMIDSetOpWkiInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_3__DELLmiProductionAbstr ) );
		PLMIDSetOpInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_4__DELLmiProductionOpera ) );
		PLMIDSetAllRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_5__DELLmiProductionSyste ) );
		PLMIDSetAllInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetSystemInst, PLMIDSetOpWkiInst ) );
		PLMIDSetSystemOpInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetSystemInst, PLMIDSetOpInst ) );
		PLMIDAllRefInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_6__PLMCORE_div_PLMCoreRe ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_7__PLMCORE_div_PLMCoreIn ) ) );
		PLMIDSetSystemRefOpInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetSystemRef, PLMIDSetOpInst ) );
		PLMIDAllRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_6__PLMCORE_div_PLMCoreRe ) );
		PLMIDWOAndExecHeaderOpRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_8__DELLmiWorkOrder_div_D ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_9__DELLmiProductionExecH ) ) );
		PLMIDExecRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_10__DELLmiProductionPlan ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_8__DELLmiWorkOrder_div_D ) ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_9__DELLmiProductionExecH ) ) );
		PLMIDExecOp.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_9__DELLmiProductionExecH ) );
		PLMIDWorkOrder.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_8__DELLmiWorkOrder_div_D ) );
		PLMIDSetHeaderAndWO.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDExecOp, PLMIDWorkOrder ) );
		PLMIDSet_ConfigData.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_11__Config_GetStructConf, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDAllRefInst } ) );
		PLMRouteSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__DELLmiProductionSyst, _STRING_13__ENOPsm_ProductionSys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetAllRef } ) );
		PLMIDSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPortsAndCnx, _STRING_14__all_ ) );
		PLMIDSetIOPorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_15__DELLmiProductionSyst ) );
		PLMIDSetCandidateCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_16__DELLmiProductionCand ) );
		PLMIDSetTimeCstCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_17__DELLmiProductionTime ) );
		PLMIDSetFlowCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_18__DELLmiProductionMate ) );
		PLMIDSetIOCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_19__DELLmiProductionSyst ) );
		PLMIDSetCapableCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_20__DELAsmAssemblyModelC ) );
		PLMIDSetRepInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_21__PLMCORE_div_PLMCoreR ) );
		PLMIDSetOutputCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_22__DELLmiProductionSyst ) );
		PLMIDSetHowToCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_23__PLMRequirementSpecif ) );
		PLMIDSetImplementedCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_24__RFLPLMImplementConne ) );
		PLMIDSetHistoRefCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_25__PLMHistorizationCnx_div_ ) );
		PLMRouteSetRepRef.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_26__DELPPRContextModel_, _STRING_27__ENOPpr_PPRData_addRe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRepInst } ) );
		PLMIDSetRepRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetRepRef, _STRING_14__all_ ) );
		PLMRouteSetSerial.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__DELLmiProductionSyst, _STRING_28__ENOPsm_ProductionSys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDWOAndExecHeaderOpRef } ) );
		PLMIDSerial.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetSerial, _STRING_14__all_ ) );
		PLMRouteSetWhereResource.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__DELLmiProductionSyst, _STRING_29__ENOPsm_WorkOrder_add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDExecRef } ) );
		PLMIDWhereResource.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetWhereResource, _STRING_14__all_ ) );
		PLMRouteSetWhoResource.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__DELLmiProductionSyst, _STRING_30__ENOPsm_WorkOrder_add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDExecOp } ) );
		PLMIDWhoResource.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetWhoResource, _STRING_14__all_ ) );
		PLMIDResourceRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDWhereResource, _STRING_31__PRODUCTCFG_div_VPMRe ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDWhoResource, _STRING_31__PRODUCTCFG_div_VPMRe ) ) );
		PLMRouteSetResource3DPartRep.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_32__PRODUCTCFG_, _STRING_33__ProductCfg_Add3DPart, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDResourceRef } ) );
		PLMIDResource3DPartRep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetResource3DPartRep, _STRING_14__all_ ) );
		PLMIDTCRel.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_34__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetHeaderAndWO } ) );
		PLMRouteSetCapableDocuments.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_35__DELAsmAssemblyModelC, _STRING_36__DELAsmAssemblyModelC, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetCapableCnx } ) );
		PLMIDSetCapableDocuments.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetCapableDocuments, _STRING_14__all_ ) );
		PLMRouteSetCandidateDocuments.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__DELLmiProductionSyst, _STRING_37__ENOPsm_CandidateReso, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetCandidateCnx } ) );
		PLMIDSetCandidateDocuments.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetCandidateDocuments, _STRING_14__all_ ) );
		PLMRouteSetAttachedDocuments.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_38__PLMDocConnection_, _STRING_39__PLMDocConnection_ret, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDAllRef } ) );
		PLMIDSetAttachedDocuments.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetAttachedDocuments, _STRING_14__all_ ) );
		PLMRouteSetOutputs.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_26__DELPPRContextModel_, _STRING_40__ENOPsm_ProductionSys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetOutputCnx } ) );
		PLMIDSetOutputs.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetOutputs, _STRING_14__all_ ) );
		PLMRouteSetProducts.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_32__PRODUCTCFG_, _STRING_41__ProductCfg_AddChildr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetOutputs, _STRING_31__PRODUCTCFG_div_VPMRe ) } ) );
		PLMIDSetProducts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProducts, _STRING_14__all_ ) );
		PLMIDSetProductStructure.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_42__VPMEditor_GetAllRepr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProducts, _STRING_31__PRODUCTCFG_div_VPMRe ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProducts, _STRING_43__PRODUCTCFG_div_VPMRe ) ) } ) );
		PLMIDAllDoc.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetCapableDocuments, _STRING_44__Class_div_DOCUMENTS_ ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetAttachedDocuments, _STRING_44__Class_div_DOCUMENTS_ ) ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetCandidateDocuments, _STRING_44__Class_div_DOCUMENTS_ ) ) );
		PLMIDDocsAndScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_45__DocumentCompletion_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDAllDoc } ) );
		PLMIDDetailedFasten.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetOutputs, _STRING_46__DELAsmAssemblyModelD ) );
		PLMHowToTargetSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_47__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDDetailedFasten } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSet_ConfigData ), PLMIDSetIOPorts ), PLMIDSetCandidateCnx ), PLMIDSetCapableCnx ), PLMIDSetTimeCstCnx ), PLMIDSetFlowCnx ), PLMIDSetIOCnx ), PLMIDSetCapableDocuments ), PLMIDSetImplementedCnx ), PLMIDSetAttachedDocuments ), PLMIDSetRepInst ), PLMIDSetRepRef ), PLMIDSetOutputCnx ), PLMIDSetHowToCnx ), PLMIDSetCandidateDocuments ), PLMIDSerial ), PLMIDSetOutputs ), PLMIDSetProducts ), PLMIDSetProductStructure ), PLMIDWhereResource ), PLMIDWhoResource ), PLMIDTCRel ), PLMIDSetHistoRefCnx ), PLMIDResource3DPartRep ), PLMIDDocsAndScope ), PLMHowToTargetSet ) );
	}
}
