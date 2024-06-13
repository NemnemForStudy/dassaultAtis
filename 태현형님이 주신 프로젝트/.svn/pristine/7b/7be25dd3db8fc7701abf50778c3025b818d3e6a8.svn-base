
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class VPMEditor_XPDM2_VPMReferenceCompletion_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__PRODUCTCFG_div_VPMRep = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__XCAD_CompleteItems_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_CompleteItems");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__XCAD_CompleteNonPS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_CompleteNonPS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__ProductCfg_AddVPMPort = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddVPMPortsAndConnections");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__XCADAssembly_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADAssembly");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__XcadAssembly_ExpandVP = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XcadAssembly_ExpandVPMRefToXCADRepRepInst");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__CATMCXAssembly_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMCXAssembly");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__CATMCXAssembly_AddAll = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMCXAssembly_AddAllAggregatedMCX");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__PLMFst_Fasteners_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMFst_Fasteners");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__PLMFst_Fasteners_Add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMFst_Fasteners_AddAllAggregatedCNX");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__ProductCfg_Add3DPart = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_Add3DPartRepresentation");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__ProductCfg_AddVPMPor = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddVPMPorts");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsPortCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsPortsOnReps = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsMCX = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsFastenerConnections = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rs3DPartShapes = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsInputRefs = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsInputReps = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsPortCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsTmpAllReps = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsXCADComposition = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsXCADNonPS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsXCADRepRepInst = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		idsInputRefs.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		idsInputReps.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__PRODUCTCFG_div_VPMRep ) );
		idsXCADComposition.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_2__XCAD_CompleteItems_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		idsInputRefs.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( idsInputRefs, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , idsXCADComposition, _STRING_0__PRODUCTCFG_div_VPMRef ) ) );
		idsXCADNonPS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_3__XCAD_CompleteNonPS_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		idsInputRefs.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( idsInputRefs, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , idsXCADNonPS, _STRING_0__PRODUCTCFG_div_VPMRef ) ) );
		rsPortCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__PRODUCTCFG_, _STRING_5__ProductCfg_AddVPMPort, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		idsPortCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsPortCnx ) );
		rsXCADRepRepInst.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_6__XCADAssembly_, _STRING_7__XcadAssembly_ExpandVP, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rsMCX.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_8__CATMCXAssembly_, _STRING_9__CATMCXAssembly_AddAll, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rsFastenerConnections.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_10__PLMFst_Fasteners_, _STRING_11__PLMFst_Fasteners_Add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		rs3DPartShapes.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__PRODUCTCFG_, _STRING_12__ProductCfg_Add3DPart, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsInputRefs } ) );
		idsTmpAllReps.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( idsInputReps, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , idsPortCnx, _STRING_1__PRODUCTCFG_div_VPMRep ) ) );
		rsPortsOnReps.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__PRODUCTCFG_, _STRING_13__ProductCfg_AddVPMPor, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { idsTmpAllReps } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( idsPortCnx, com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsMCX ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsFastenerConnections ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rs3DPartShapes ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsPortsOnReps ) ), idsXCADNonPS ), idsXCADComposition ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsXCADRepRepInst ) ) );
	}
}
