
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Process_ExchangeXPDM_XPDM2_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__Process_ExchangeXPDM_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Process_ExchangeXPDM_XPDM2_MBOMWithoutProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel_addPortsAndCnxExceptImplCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelImplementCnx/DELFmiProcessImplementCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__PLMAssignmentFilter_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMAssignmentFilter/PLMAssignmentFilterCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__PLM_ImplementLink_Sou = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLM_ImplementLink_Source");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelImplementCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__DELFmiFunctionModelI = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionModelImplCnx_AddAllImplementedComponentsFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__DELFmiFunctionModelI = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionModelImplCnx_AddAllImplementedComponentsFromSR");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__DELAsmAssemblyModelD = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelDisciplines");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__ENOPcs_Process_addPr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcs_Process_addProductOccFromAssignmentFilter");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__RelationClass_div_EB = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RelationClass/EBOM");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__ENOPpr_PPRData_getPa = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_getPartsFromEBOM");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_17__PRODUCTCFG_div_VPMIn = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_18__ENOPpr_PPRData_addRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_addRefAndAggregatingRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_19__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_20__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_21__ProductCfg_Add3DPart = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_Add3DPartRepresentation");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_22__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.mbom.procedures.ProcedureCalls_PartialScopeLink");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProduct = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetParts = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProduct2 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductOccFilter = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductStructure = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductAggrRep = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetFirstStep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcess = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProduct = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetEBOMRel = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetParts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetScopeImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetValidImplCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAssignFilterCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductOccFilter = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductStructure = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductAggrRep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMPartialScopeIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetProcessRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELFmiFunctionalModel ) );
		PLMIDSetProcessInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELFmiFunctionalModel ) );
		PLMIDSetProcess.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessRef, PLMIDSetProcessInst ) );
		PLMIDSetFirstStep.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_2__Process_ExchangeXPDM_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { iPLMIDSet } ) );
		PLMRouteSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_3__DELFmiFunctionalModel, _STRING_4__DELFmiFunctionalModel, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRef } ) );
		PLMIDSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPortsAndCnx, _STRING_5__all_ ) );
		PLMIDSetImplCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_6__DELFmiFunctionalModel ) );
		PLMIDSetAssignFilterCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_7__PLMAssignmentFilter_div_ ) );
		PLMIDSetScopeImplCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessRef, PLMIDSetProcessInst ) );
		PLMIDSetValidImplCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.ValidateSRs( iContext , PLMIDSetImplCnx, _STRING_8__PLM_ImplementLink_Sou, PLMIDSetScopeImplCnx ) );
		PLMRouteSetProduct.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_9__DELFmiFunctionalModel, _STRING_10__DELFmiFunctionModelI, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetValidImplCnx } ) );
		PLMRouteSetProduct2.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_9__DELFmiFunctionalModel, _STRING_11__DELFmiFunctionModelI, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessInst } ) );
		PLMIDSetProduct.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProduct2, _STRING_5__all_ ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProduct, _STRING_5__all_ ) ) );
		PLMRouteSetProductOccFilter.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__DELAsmAssemblyModelD, _STRING_13__ENOPcs_Process_addPr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetAssignFilterCnx } ) );
		PLMIDSetProductOccFilter.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductOccFilter, _STRING_5__all_ ) );
		PLMIDSetEBOMRel.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProduct, _STRING_14__RelationClass_div_EB ) );
		PLMRouteSetParts.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_15__DELPPRContextModel_, _STRING_16__ENOPpr_PPRData_getPa, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetEBOMRel } ) );
		PLMIDSetParts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetParts, _STRING_5__all_ ) );
		PLMIDSetProductInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProduct, _STRING_17__PRODUCTCFG_div_VPMIn ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductOccFilter, _STRING_17__PRODUCTCFG_div_VPMIn ) ) );
		PLMRouteSetProductStructure.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_15__DELPPRContextModel_, _STRING_18__ENOPpr_PPRData_addRe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProductInst } ) );
		PLMIDSetProductStructure.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductStructure, _STRING_5__all_ ) );
		PLMIDSetProductRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProduct, _STRING_19__PRODUCTCFG_div_VPMRe ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductStructure, _STRING_19__PRODUCTCFG_div_VPMRe ) ) );
		PLMRouteSetProductAggrRep.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_20__PRODUCTCFG_, _STRING_21__ProductCfg_Add3DPart, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProductRef } ) );
		PLMIDSetProductAggrRep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductAggrRep, _STRING_5__all_ ) );
		PLMPartialScopeIdSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_22__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRef } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetFirstStep ), PLMIDSetAssignFilterCnx ), PLMIDSetProduct ), PLMIDSetParts ), PLMIDSetValidImplCnx ), PLMIDSetProductOccFilter ), PLMIDSetProductStructure ), PLMIDSetProductAggrRep ), PLMPartialScopeIdSet ) );
	}
}
