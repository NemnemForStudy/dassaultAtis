
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class VPMEditor_GetExchangeCompletionOnReference_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__XCAD_CompleteItems_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_CompleteItems");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__XCAD_CompleteNonPS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_CompleteNonPS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__ProductCfg_AddChildre = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddChildrenProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__ProductCfg_AddVPMReps = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddVPMRepsPortsAndConnections");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__PRODUCTCFG_div_VPMRep = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__ProductCfg_AddVPMPort = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddVPMPorts");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__XCADAssembly_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADAssembly");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__XcadAssembly_ExpandVP = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XcadAssembly_ExpandVPMRefToXCADRepRepInst");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__CATMCXAssembly_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMCXAssembly");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__CATMCXAssembly_AddAl = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMCXAssembly_AddAllAggregatedMCX");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__PLMPCBLibrary_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMPCBLibrary");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__PLMPCBLibrary_addFoo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMPCBLibrary_addFootprintConnection");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet1 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet2 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet3 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet4 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet5 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet rsXCADRepRepInst = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRestricted = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet1Restricted = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet1 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet2 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsXCADComposition = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet idsXCADNonPS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetRestricted.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		idsXCADComposition.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_1__XCAD_CompleteItems_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMIDSetRestricted.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetRestricted, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , idsXCADComposition, _STRING_0__PRODUCTCFG_div_VPMRef ) ) );
		idsXCADNonPS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_2__XCAD_CompleteNonPS_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMRouteSet1.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_3__PRODUCTCFG_, _STRING_4__ProductCfg_AddChildre, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMIDSet1.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet1 ) ) );
		PLMIDSet1Restricted.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet1, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		PLMRouteSet2.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_3__PRODUCTCFG_, _STRING_5__ProductCfg_AddVPMReps, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet1Restricted } ) );
		PLMIDSet2.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet2 ) );
		PLMIDSetRep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet2, _STRING_6__PRODUCTCFG_div_VPMRep ) ) );
		PLMRouteSet3.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_3__PRODUCTCFG_, _STRING_7__ProductCfg_AddVPMPort, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRep } ) );
		rsXCADRepRepInst.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_8__XCADAssembly_, _STRING_9__XcadAssembly_ExpandVP, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMRouteSet4.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_10__CATMCXAssembly_, _STRING_11__CATMCXAssembly_AddAl, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet1Restricted } ) );
		PLMRouteSet5.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__PLMPCBLibrary_, _STRING_13__PLMPCBLibrary_addFoo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet1Restricted } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet1, PLMIDSet2 ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( rsXCADRepRepInst ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet3 ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet4 ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet5 ) ), idsXCADNonPS ), idsXCADComposition ) );
	}
}
