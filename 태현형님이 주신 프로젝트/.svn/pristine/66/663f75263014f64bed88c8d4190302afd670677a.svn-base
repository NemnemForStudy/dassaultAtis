
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Process_ExportAsDesign_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__PLMCORE_div_PLMCoreRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__PLMCORE_div_PLMCoreIn = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__Config_GetStructConfi = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Config_GetStructConfig");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel_addPortsRepInstAndCnxExceptImplCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisitePort/DELFmiProcessPrerequisitePort");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedencePort/DELFmiProcessPrecedencePort");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisiteCnx/DELFmiProcessPrerequisiteCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisiteCnx1/DELFmiProcessPrerequisiteCnxCust");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedenceCnx/DELFmiProcessPrecedenceCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedenceCnx1/DELFmiProcessPrecedenceCnxCust");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrereqMatCnx/DELFmiProcessPrereqMaterializationCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx/DELAsmProcessCanUseCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionRepresentationInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_17__PLMAssignmentFilter_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMAssignmentFilter/PLMAssignmentFilterCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_18__PLMRequirementSpecif = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMRequirementSpecifyHowToCnxAbstract/PLMReqSpecifyHowToCnxAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_19__PLMHistorizationCnx_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx/PLMHistoLinkCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_20__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_21__ENOPpr_PPRData_addRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_addRepRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_22__DELFmiFunctionModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionModel_AddImplementingCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_23__PLMDocConnection_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_24__PLMDocConnection_ret = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection_retrieveAllDocumentsIncludingCBP");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_25__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_26__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx_addAllDocuments");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_27__Class_div_DOCUMENTS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/DOCUMENTS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_28__DocumentCompletion_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DocumentCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_29__ENOPcx_PPRContext_ad = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcx_PPRContext_addProductsLinkedToProcessPorts");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_30__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_31__ProductCfg_AddChildr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddChildrenProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_32__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_33__VPMEditor_GetAllRepr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMEditor_GetAllRepresentations");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_34__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_35__DELAsmAssemblyModelD = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelDisciplines/DetailedFasten");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_36__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.mbom.procedures.ProcedureCalls_GetHowToTargets");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetAttachedDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetCapableDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetRepRef = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetMatProduct = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProducts = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessReference = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessInstance = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessRefAndInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAttachedDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_ConfigData = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetDRPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPrecedencePorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetDRCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPrecedenceCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetMaterialisationCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAllRefInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDAllRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRepInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRepRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetMatProduct = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProducts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductStructure = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAssignmentFilterCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHowToCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHistoRefCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDAllDoc = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDDocsAndScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDDetailedFasten = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMHowToTargetSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetProcessReference.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELFmiFunctionalModel ) );
		PLMIDSetProcessInstance.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELFmiFunctionalModel ) );
		PLMIDSetProcessRefAndInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessReference, PLMIDSetProcessInstance ) );
		PLMIDSetAllRefInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_2__PLMCORE_div_PLMCoreRe ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_3__PLMCORE_div_PLMCoreIn ) ) );
		PLMIDSet_ConfigData.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_4__Config_GetStructConfi, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetAllRefInst } ) );
		PLMRouteSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__DELFmiFunctionalModel, _STRING_6__DELFmiFunctionalModel, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessReference } ) );
		PLMIDSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPortsAndCnx, _STRING_7__all_ ) );
		PLMIDSetDRPorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_8__DELFmiFunctionalModel ) );
		PLMIDSetPrecedencePorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_9__DELFmiFunctionalModel ) );
		PLMIDSetDRCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_10__DELFmiFunctionalMode ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_11__DELFmiFunctionalMode ) ) );
		PLMIDSetPrecedenceCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_12__DELFmiFunctionalMode ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_13__DELFmiFunctionalMode ) ) );
		PLMIDSetMaterialisationCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_14__DELFmiFunctionalMode ) );
		PLMIDSetCapableCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_15__DELAsmAssemblyModelC ) );
		PLMIDSetRepInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_16__DELFmiFunctionalMode ) );
		PLMIDSetAssignmentFilterCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_17__PLMAssignmentFilter_div_ ) );
		PLMIDSetHowToCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_18__PLMRequirementSpecif ) );
		PLMIDSetHistoRefCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_19__PLMHistorizationCnx_div_ ) );
		PLMRouteSetRepRef.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_20__DELPPRContextModel_, _STRING_21__ENOPpr_PPRData_addRe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRepInst } ) );
		PLMIDSetRepRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetRepRef, _STRING_7__all_ ) );
		PLMRouteSetImplCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__DELFmiFunctionalModel, _STRING_22__DELFmiFunctionModel_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRefAndInst } ) );
		PLMIDSetImplCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetImplCnx, _STRING_7__all_ ) );
		PLMRouteSetAttachedDocuments.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_23__PLMDocConnection_, _STRING_24__PLMDocConnection_ret, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessReference } ) );
		PLMIDSetAttachedDocuments.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetAttachedDocuments, _STRING_7__all_ ) );
		PLMRouteSetCapableDocuments.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_25__DELAsmAssemblyModelC, _STRING_26__DELAsmAssemblyModelC, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetCapableCnx } ) );
		PLMIDSetCapableDocuments.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetCapableDocuments, _STRING_7__all_ ) );
		PLMIDAllDoc.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetAttachedDocuments, _STRING_27__Class_div_DOCUMENTS_ ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetCapableDocuments, _STRING_27__Class_div_DOCUMENTS_ ) ) );
		PLMIDDocsAndScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_28__DocumentCompletion_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDAllDoc } ) );
		PLMRouteSetMatProduct.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_20__DELPPRContextModel_, _STRING_29__ENOPcx_PPRContext_ad, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetMaterialisationCnx } ) );
		PLMIDSetMatProduct.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetMatProduct, _STRING_7__all_ ) );
		PLMRouteSetProducts.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_30__PRODUCTCFG_, _STRING_31__ProductCfg_AddChildr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetMatProduct ), _STRING_32__PRODUCTCFG_div_VPMRe ) } ) );
		PLMIDSetProducts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProducts, _STRING_7__all_ ) );
		PLMIDSetProductStructure.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_33__VPMEditor_GetAllRepr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProducts ), _STRING_32__PRODUCTCFG_div_VPMRe ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProducts ), _STRING_34__PRODUCTCFG_div_VPMRe ) ) } ) );
		PLMIDDetailedFasten.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProcessReference, _STRING_35__DELAsmAssemblyModelD ) );
		PLMHowToTargetSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_36__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDDetailedFasten } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSet_ConfigData ), PLMIDSetDRPorts ), PLMIDSetPrecedencePorts ), PLMIDSetMaterialisationCnx ), PLMIDSetCapableCnx ), PLMIDSetDRCnx ), PLMIDSetPrecedenceCnx ), PLMIDSetImplCnx ), PLMIDSetAttachedDocuments ), PLMIDSetCapableDocuments ), PLMIDSetRepInst ), PLMIDSetRepRef ), PLMIDSetMatProduct ), PLMIDSetProducts ), PLMIDSetProductStructure ), PLMIDSetAssignmentFilterCnx ), PLMIDSetHowToCnx ), PLMIDSetHistoRefCnx ), PLMIDDocsAndScope ), PLMHowToTargetSet ) );
	}
}
