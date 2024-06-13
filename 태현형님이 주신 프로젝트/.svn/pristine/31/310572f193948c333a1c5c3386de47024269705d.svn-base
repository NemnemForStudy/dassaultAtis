
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class MBOM_TSO_References_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel_addPortsRepInstAndCnxExceptImplCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisitePort/DELFmiProcessPrerequisitePort");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedencePort/DELFmiProcessPrecedencePort");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisiteCnx/DELFmiProcessPrerequisiteCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisiteCnx1/DELFmiProcessPrerequisiteCnxCust");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedenceCnx/DELFmiProcessPrecedenceCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedenceCnx1/DELFmiProcessPrecedenceCnxCust");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrereqMatCnx/DELFmiProcessPrereqMaterializationCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx/DELAsmProcessCanUseCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__PLMAssignmentFilter_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMAssignmentFilter/PLMAssignmentFilterCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__PLMRequirementSpecif = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMRequirementSpecifyHowToCnxAbstract/PLMReqSpecifyHowToCnxAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__PLMHistorizationCnx_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx/PLMHistoLinkCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__DELFmiFunctionModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionModel_AddImplementingCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_17__PLMDocConnection_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_18__PLMDocConnection_ret = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection_retrieveAllConnections");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_19__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_20__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx_addAllDocuments");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_21__Class_div_DOCUMENTS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/DOCUMENTS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_22__DocumentCompletion_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DocumentCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_23__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_24__ENOPcx_PPRContext_ad = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcx_PPRContext_addProductsLinkedToProcessPorts");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_25__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_26__ProductCfg_AddChildr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddChildrenProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_27__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_28__VPMEditor_GetAllRepr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMEditor_GetAllRepresentations");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_29__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_30__VPMEditor_TSO_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMEditor_TSO_VPMReferenceVPMRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_31__PRODUCTCFG_div_VPMIn = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_32__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_33__VPMEditor_TSO_VPMIns = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMEditor_TSO_VPMInstance");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetCapableDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetMatProduct = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProducts = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetAttachedDocCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessReference = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessInstance = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessRefAndInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetDRPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPrecedencePorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetDRCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPrecedenceCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetMaterialisationCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetMatProduct = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProducts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductStructure = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAssignmentFilterCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHowToCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAttachedDocCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductRefrep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetTSORef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetTSOInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDProductRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHistoRefCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDAllDoc = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDDocsAndScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetProcessReference.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELFmiFunctionalModel ) );
		PLMIDSetProcessInstance.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELFmiFunctionalModel ) );
		PLMIDSetProcessRefAndInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessReference, PLMIDSetProcessInstance ) );
		PLMRouteSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELFmiFunctionalModel, _STRING_3__DELFmiFunctionalModel, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessReference } ) );
		PLMIDSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPortsAndCnx, _STRING_4__all_ ) );
		PLMIDSetDRPorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_5__DELFmiFunctionalModel ) );
		PLMIDSetPrecedencePorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_6__DELFmiFunctionalModel ) );
		PLMIDSetDRCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_7__DELFmiFunctionalModel ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_8__DELFmiFunctionalModel ) ) );
		PLMIDSetPrecedenceCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_9__DELFmiFunctionalModel ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_10__DELFmiFunctionalMode ) ) );
		PLMIDSetMaterialisationCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_11__DELFmiFunctionalMode ) );
		PLMIDSetCapableCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_12__DELAsmAssemblyModelC ) );
		PLMIDSetAssignmentFilterCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_13__PLMAssignmentFilter_div_ ) );
		PLMIDSetHowToCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_14__PLMRequirementSpecif ) );
		PLMIDSetHistoRefCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_15__PLMHistorizationCnx_div_ ) );
		PLMRouteSetImplCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELFmiFunctionalModel, _STRING_16__DELFmiFunctionModel_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRefAndInst } ) );
		PLMIDSetImplCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetImplCnx, _STRING_4__all_ ) );
		PLMRouteSetAttachedDocCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_17__PLMDocConnection_, _STRING_18__PLMDocConnection_ret, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessReference } ) );
		PLMIDSetAttachedDocCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetAttachedDocCnx, _STRING_4__all_ ) );
		PLMRouteSetCapableDocuments.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_19__DELAsmAssemblyModelC, _STRING_20__DELAsmAssemblyModelC, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetCapableCnx } ) );
		PLMIDSetCapableDocuments.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetCapableDocuments, _STRING_4__all_ ) );
		PLMIDAllDoc.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetCapableDocuments, _STRING_21__Class_div_DOCUMENTS_ ) );
		PLMIDDocsAndScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_22__DocumentCompletion_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDAllDoc } ) );
		PLMRouteSetMatProduct.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_23__DELPPRContextModel_, _STRING_24__ENOPcx_PPRContext_ad, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetMaterialisationCnx } ) );
		PLMIDSetMatProduct.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetMatProduct, _STRING_4__all_ ) );
		PLMRouteSetProducts.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_25__PRODUCTCFG_, _STRING_26__ProductCfg_AddChildr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetMatProduct ), _STRING_27__PRODUCTCFG_div_VPMRe ) } ) );
		PLMIDSetProducts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProducts, _STRING_4__all_ ) );
		PLMIDProductRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProducts, _STRING_27__PRODUCTCFG_div_VPMRe ) );
		PLMIDSetProductStructure.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_28__VPMEditor_GetAllRepr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDProductRef } ) );
		PLMIDSetProductRefrep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProducts, _STRING_27__PRODUCTCFG_div_VPMRe ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductStructure, _STRING_27__PRODUCTCFG_div_VPMRe ) ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductStructure, _STRING_29__PRODUCTCFG_div_VPMRe ) ) );
		PLMIDSetTSORef.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_30__VPMEditor_TSO_VPMRef, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProductRefrep } ) );
		PLMIDSetProductInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProducts, _STRING_31__PRODUCTCFG_div_VPMIn ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductStructure, _STRING_31__PRODUCTCFG_div_VPMIn ) ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductStructure, _STRING_32__PRODUCTCFG_div_VPMRe ) ) );
		PLMIDSetTSOInst.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_33__VPMEditor_TSO_VPMIns, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProductInst } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetDRPorts ), PLMIDSetPrecedencePorts ), PLMIDSetDRCnx ), PLMIDSetPrecedenceCnx ), PLMIDSetMaterialisationCnx ), PLMIDSetCapableCnx ), PLMIDSetAssignmentFilterCnx ), PLMIDSetHowToCnx ), PLMIDSetImplCnx ), PLMIDSetAttachedDocCnx ), PLMIDSetCapableDocuments ), PLMIDSetProductRefrep ), PLMIDSetTSORef ), PLMIDSetProductInst ), PLMIDSetTSOInst ), PLMIDSetHistoRefCnx ), PLMIDDocsAndScope ) );
	}
}
