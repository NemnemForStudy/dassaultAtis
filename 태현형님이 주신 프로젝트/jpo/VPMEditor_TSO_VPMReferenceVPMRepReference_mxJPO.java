
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class VPMEditor_TSO_VPMReferenceVPMRepReference_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__PRODUCTCFG_div_VPMRep = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__XCAD_CompleteItems_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_CompleteItems");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__XCAD_CompleteNonPS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_CompleteNonPS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__RelationClass_div_XCA = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RelationClass/XCADBaseDependency");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__ProductCfg_AddLPPriva = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddLPPrivateRepForReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__ProductCfg_Add3DPartR = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_Add3DPartRepresentation");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__CATMCXAssembly_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMCXAssembly");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__CATMCXAssembly_AddAll = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMCXAssembly_AddAllAggregatedMCX");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__PLMFst_Fasteners_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMFst_Fasteners");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__PLMFst_Fasteners_Add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMFst_Fasteners_AddAllAggregatedCNX");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__CATAsmPattern_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATAsmPattern");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__CATAsmPattern_AddAll = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATAsmPattern_AddAllAsmPattern");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__XCADAssembly_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADAssembly");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__XcadAssembly_ExpandV = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XcadAssembly_ExpandVPMRefToXCADRepRepInst");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__CATMaterial_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMaterial");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_17__mat_retrieveMatCnxUn = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("mat_retrieveMatCnxUnderProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_18__RawMaterialSpecifica = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RawMaterialSpecification");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_19__RawMat_retrieveAllAp = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RawMat_retrieveAllAppliedRawMaterial");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_20__ProductCfg_Add3DPart = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_Add3DPartReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_21__DocumentCompletion_a = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DocumentCompletion_allRelationshipCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_22__ProductCfg_AddVPMPor = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddVPMPorts");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsRelatedPrivateReps = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rs3DPartShapes = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rs3DPartRefs = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsEngineeringConnections = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsFastenerConnections = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsCATAsmPatternConnections = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsMaterialConnections = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsRawMaterialConnections = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsXCADRepRepInst = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsInputRefs = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsInputReps = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsSourceForPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsRefsForPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsRepsForPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsRefsRepsForPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsXCADComposition = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsXCADNonPS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsXCADDependencies = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsDocument = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		idsInputRefs.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		idsInputReps.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__PRODUCTCFG_div_VPMRep ) );
		idsXCADComposition.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_2__XCAD_CompleteItems_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		idsInputRefs.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( idsInputRefs, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , idsXCADComposition, _STRING_0__PRODUCTCFG_div_VPMRef ) ) );
		idsXCADNonPS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_3__XCAD_CompleteNonPS_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		idsXCADDependencies.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , idsXCADNonPS, _STRING_4__RelationClass_div_XCA ) );
		rsRelatedPrivateReps.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__PRODUCTCFG_, _STRING_6__ProductCfg_AddLPPriva, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rs3DPartShapes.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__PRODUCTCFG_, _STRING_7__ProductCfg_Add3DPartR, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rsEngineeringConnections.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_8__CATMCXAssembly_, _STRING_9__CATMCXAssembly_AddAll, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rsFastenerConnections.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_10__PLMFst_Fasteners_, _STRING_11__PLMFst_Fasteners_Add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rsCATAsmPatternConnections.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__CATAsmPattern_, _STRING_13__CATAsmPattern_AddAll, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rsXCADRepRepInst.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_14__XCADAssembly_, _STRING_15__XcadAssembly_ExpandV, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rsMaterialConnections.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_16__CATMaterial_, _STRING_17__mat_retrieveMatCnxUn, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rsRawMaterialConnections.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_18__RawMaterialSpecifica, _STRING_19__RawMat_retrieveAllAp, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rs3DPartRefs.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__PRODUCTCFG_, _STRING_20__ProductCfg_Add3DPart, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputReps } ) );
		idsDocument.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_21__DocumentCompletion_a, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		idsSourceForPorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( idsInputRefs, idsInputReps ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rs3DPartShapes ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rs3DPartRefs ) ) );
		idsRefsForPorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , idsSourceForPorts, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		idsRepsForPorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , idsSourceForPorts, _STRING_1__PRODUCTCFG_div_VPMRep ) );
		idsRefsRepsForPorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( idsRepsForPorts, idsRefsForPorts ) );
		rsPorts.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__PRODUCTCFG_, _STRING_22__ProductCfg_AddVPMPor, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsRefsRepsForPorts } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsRelatedPrivateReps ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rs3DPartShapes ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsEngineeringConnections ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsFastenerConnections ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsCATAsmPatternConnections ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsXCADRepRepInst ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsMaterialConnections ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsRawMaterialConnections ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rs3DPartRefs ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsPorts ) ), idsXCADDependencies ), idsXCADComposition ), idsDocument ) );
	}
}
