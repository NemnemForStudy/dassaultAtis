
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Process_ExchangeXPDM_XPDM2_MBOMWithoutProcess_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__ENOPcs_Process_addAlt = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcs_Process_addAlternateProcesses");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.mbom.procedures.ProcedureCalls_GetHowToTargets");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel_addPortsAndCnxExceptImplCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisitePort/DELFmiProcessPrerequisitePort");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedencePort/DELFmiProcessPrecedencePort");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisiteCnx/DELFmiProcessPrerequisiteCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisiteCnx1/DELFmiProcessPrerequisiteCnxCust");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedenceCnx/DELFmiProcessPrecedenceCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedenceCnx1/DELFmiProcessPrecedenceCnxCust");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrereqMatCnx/DELFmiProcessPrereqMaterializationCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx/DELAsmProcessCanUseCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__PLMRequirementSpecif = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMRequirementSpecifyHowToCnxAbstract/PLMReqSpecifyHowToCnxAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_17__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelImplementCnx/DELFmiProcessImplementCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_18__DELFmiMfgSubstitute_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiMfgSubstitute/DELFmiMfgSubstituteCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_19__DELMfgResponsibility = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELMfgResponsibility/DELMfgResponsibilityCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_20__PLMHistorizationCnx_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx/PLMHistoLinkCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_21__PLMAssignmentFilter_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMAssignmentFilter/PLMAssignmentFilterCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_22__PLMHistorizationCnx_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_23__PLMHistorizationCnx_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx_addHistoEntitiesFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_24__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.commonprocedures.procedures.ProcedureCalls_MBOMAndProcessHowToLinkTargetFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_25__Class_div_Requiremen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Requirement Specification");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_26__Rmt_ReqSpec_ExportCo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rmt_ReqSpec_ExportCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_27__Class_div_Requiremen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Requirement");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_28__Rmt_Requirement_Expo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rmt_Requirement_ExportCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_29__Class_div_Chapter_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Chapter");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_30__Rmt_Chapter_ExportCo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rmt_Chapter_ExportCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_31__PLM_ImplementLink_So = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLM_ImplementLink_Source");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_32__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.mbom.procedures.ProcedureCalls_PartialScopeLink");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_33__DELFmi_PrecedenceCst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmi_PrecedenceCst_Target,DELFmi_PrecedenceCst_Source");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_34__DELFmi_PrerequisiteC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmi_PrerequisiteCst_Target,DELFmi_PrerequisiteCst_Source");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_35__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelImplementCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_36__DELFmiFunctionModelI = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionModelImplCnx_AddAllImplementedComponentsFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_37__DELFmiFunctionModelI = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionModelImplCnx_AddAllImplementedComponentsFromSR");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_38__DELAsmAssemblyModelD = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelDisciplines");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_39__ENOPcs_Process_addPr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcs_Process_addProductOccFromAssignmentFilter");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_40__RelationClass_div_EB = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RelationClass/EBOM");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_41__ENOPpr_PPRData_getPa = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_getPartsFromEBOM");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_42__PRODUCTCFG_div_VPMIn = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_43__ENOPpr_PPRData_addRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_addRefAndAggregatingRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_44__ENOPcs_Process_addCa = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcs_Process_addCapableResourcesWithoutQueryFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_45__Class_div_DOCUMENTS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/DOCUMENTS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_46__DocumentCompletion_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DocumentCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_47__ENOPcx_PPRContext_ad = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcx_PPRContext_addProductsLinkedToProcessPorts");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_48__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_49__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_50__ProductCfg_Add3DPart = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_Add3DPartRepresentation");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_51__DELMfgSubstitute_Sou = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELMfgSubstitute_Source");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_52__ENOPcs_Process_addSu = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcs_Process_addSubstituteFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_53__ENOPpr_PPRData_addRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_addResponsibilityFromCnx");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProduct = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetCapableRsc = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductSTL = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetAlternate = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetReq = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetParts = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProduct2 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetSubstitute = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetResponsibility = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetHistoRef = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductOccFilter = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductStructure = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductAggrRep = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProduct = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPrecedencePorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPrecedenceCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetValidPrecedenceCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetScopePrecedenceCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetDRCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetMaterializationCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetScopePrequisiteCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetValidPrequisiteCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductSTL = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableRsc = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetDRPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAlternateProcess = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqs = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqSpec = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqSpecCompletude = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReq = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqCompletude = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqChapter = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqChapterCompletude = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetEBOMRel = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetParts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetScopeImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetValidImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSubstituteCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetValidSubstituteCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetResponsibilityCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSubstitute = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetResponsibility = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHistoRefCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHistoRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAssignFilterCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductOccFilter = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductStructure = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductAggrRep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDAllDoc = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDDocsAndScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMPartialScopeIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMHowToTargetSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetProcessRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELFmiFunctionalModel ) );
		PLMIDSetProcessInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELFmiFunctionalModel ) );
		PLMRouteSetAlternate.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELPPRContextModel_, _STRING_3__ENOPcs_Process_addAlt, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRef } ) );
		PLMIDSetAlternateProcess.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetAlternate, _STRING_4__all_ ) );
		PLMHowToTargetSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_5__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRef } ) );
		PLMRouteSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_6__DELFmiFunctionalModel, _STRING_7__DELFmiFunctionalModel, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRef } ) );
		PLMIDSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPortsAndCnx, _STRING_4__all_ ) );
		PLMIDSetDRPorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_8__DELFmiFunctionalModel ) );
		PLMIDSetPrecedencePorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_9__DELFmiFunctionalModel ) );
		PLMIDSetDRCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_10__DELFmiFunctionalMode ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_11__DELFmiFunctionalMode ) ) );
		PLMIDSetPrecedenceCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_12__DELFmiFunctionalMode ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_13__DELFmiFunctionalMode ) ) );
		PLMIDSetMaterializationCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_14__DELFmiFunctionalMode ) );
		PLMIDSetCapableCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_15__DELAsmAssemblyModelC ) );
		PLMIDSetReqCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_16__PLMRequirementSpecif ) );
		PLMIDSetImplCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_17__DELFmiFunctionalMode ) );
		PLMIDSetSubstituteCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_18__DELFmiMfgSubstitute_div_ ) );
		PLMIDSetResponsibilityCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_19__DELMfgResponsibility ) );
		PLMIDSetHistoRefCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_20__PLMHistorizationCnx_div_ ) );
		PLMIDSetAssignFilterCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_21__PLMAssignmentFilter_div_ ) );
		PLMRouteSetHistoRef.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_22__PLMHistorizationCnx_, _STRING_23__PLMHistorizationCnx_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetHistoRefCnx } ) );
		PLMIDSetHistoRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetHistoRef, _STRING_4__all_ ) );
		PLMIDSetReqs.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_24__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetReqCnx } ) );
		PLMIDSetReqSpec.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetReqs, _STRING_25__Class_div_Requiremen ) );
		PLMIDSetReqSpecCompletude.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_26__Rmt_ReqSpec_ExportCo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetReqSpec } ) );
		PLMIDSetReq.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetReqs, _STRING_27__Class_div_Requiremen ) );
		PLMIDSetReqCompletude.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_28__Rmt_Requirement_Expo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetReq } ) );
		PLMIDSetReqChapter.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetReqs, _STRING_29__Class_div_Chapter_ ) );
		PLMIDSetReqChapterCompletude.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_30__Rmt_Chapter_ExportCo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetReqChapter } ) );
		PLMIDSetScopeImplCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessRef, PLMIDSetProcessInst ) );
		PLMIDSetValidImplCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.ValidateSRs( iContext , PLMIDSetImplCnx, _STRING_31__PLM_ImplementLink_So, PLMIDSetScopeImplCnx ) );
		PLMPartialScopeIdSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_32__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRef } ) );
		PLMIDSetScopePrecedenceCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessInst, PLMIDSetPrecedencePorts ) );
		PLMIDSetValidPrecedenceCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.ValidateSRs( iContext , PLMIDSetPrecedenceCnx, _STRING_33__DELFmi_PrecedenceCst, PLMIDSetScopePrecedenceCnx ) );
		PLMIDSetScopePrequisiteCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessInst, PLMIDSetDRPorts ) );
		PLMIDSetValidPrequisiteCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.ValidateSRs( iContext , PLMIDSetDRCnx, _STRING_34__DELFmi_PrerequisiteC, PLMIDSetScopePrequisiteCnx ) );
		PLMRouteSetProduct.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_35__DELFmiFunctionalMode, _STRING_36__DELFmiFunctionModelI, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetValidImplCnx } ) );
		PLMRouteSetProduct2.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_35__DELFmiFunctionalMode, _STRING_37__DELFmiFunctionModelI, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessInst } ) );
		PLMIDSetProduct.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProduct2, _STRING_4__all_ ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProduct, _STRING_4__all_ ) ) );
		PLMRouteSetProductOccFilter.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_38__DELAsmAssemblyModelD, _STRING_39__ENOPcs_Process_addPr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetAssignFilterCnx } ) );
		PLMIDSetProductOccFilter.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductOccFilter, _STRING_4__all_ ) );
		PLMIDSetEBOMRel.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProduct, _STRING_40__RelationClass_div_EB ) );
		PLMRouteSetParts.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELPPRContextModel_, _STRING_41__ENOPpr_PPRData_getPa, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetEBOMRel } ) );
		PLMIDSetParts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetParts, _STRING_4__all_ ) );
		PLMIDSetProductInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProduct, _STRING_42__PRODUCTCFG_div_VPMIn ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductOccFilter, _STRING_42__PRODUCTCFG_div_VPMIn ) ) );
		PLMRouteSetProductStructure.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELPPRContextModel_, _STRING_43__ENOPpr_PPRData_addRe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProductInst } ) );
		PLMIDSetProductStructure.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductStructure, _STRING_4__all_ ) );
		PLMRouteSetCapableRsc.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELPPRContextModel_, _STRING_44__ENOPcs_Process_addCa, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetCapableCnx } ) );
		PLMIDSetCapableRsc.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetCapableRsc, _STRING_4__all_ ) );
		PLMIDAllDoc.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetCapableRsc, _STRING_45__Class_div_DOCUMENTS_ ) );
		PLMIDDocsAndScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_46__DocumentCompletion_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDAllDoc } ) );
		PLMRouteSetProductSTL.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELPPRContextModel_, _STRING_47__ENOPcx_PPRContext_ad, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetMaterializationCnx } ) );
		PLMIDSetProductSTL.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductSTL, _STRING_4__all_ ) );
		PLMIDSetProductRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProduct, _STRING_48__PRODUCTCFG_div_VPMRe ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductStructure, _STRING_48__PRODUCTCFG_div_VPMRe ) ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductSTL, _STRING_48__PRODUCTCFG_div_VPMRe ) ) );
		PLMRouteSetProductAggrRep.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_49__PRODUCTCFG_, _STRING_50__ProductCfg_Add3DPart, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProductRef } ) );
		PLMIDSetProductAggrRep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductAggrRep, _STRING_4__all_ ) );
		PLMIDSetValidSubstituteCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.ValidateSRs( iContext , PLMIDSetSubstituteCnx, _STRING_51__DELMfgSubstitute_Sou, PLMIDSetProcessInst ) );
		PLMRouteSetSubstitute.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELPPRContextModel_, _STRING_52__ENOPcs_Process_addSu, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetValidSubstituteCnx } ) );
		PLMIDSetSubstitute.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetSubstitute, _STRING_4__all_ ) );
		PLMRouteSetResponsibility.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELPPRContextModel_, _STRING_53__ENOPpr_PPRData_addRe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetResponsibilityCnx } ) );
		PLMIDSetResponsibility.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetResponsibility, _STRING_4__all_ ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetDRPorts ), PLMIDSetPrecedencePorts ), PLMIDSetMaterializationCnx ), PLMIDSetCapableCnx ), PLMIDSetValidPrecedenceCnx ), PLMIDSetValidPrequisiteCnx ), PLMIDSetProduct ), PLMIDSetCapableRsc ), PLMIDSetProductSTL ), PLMIDSetAlternateProcess ), PLMIDSetReqCnx ), PLMIDSetReqs ), PLMIDSetReqSpecCompletude ), PLMIDSetReqCompletude ), PLMIDSetReqChapterCompletude ), PLMIDSetParts ), PLMIDSetValidImplCnx ), PLMIDSetResponsibilityCnx ), PLMIDSetValidSubstituteCnx ), PLMIDSetSubstitute ), PLMIDSetResponsibility ), PLMIDSetHistoRefCnx ), PLMIDSetHistoRef ), PLMIDSetProductOccFilter ), PLMIDSetProductStructure ), PLMIDSetProductAggrRep ), PLMIDDocsAndScope ), PLMPartialScopeIdSet ), PLMHowToTargetSet ) );
	}
}
