
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class PhysicalResource_GetOneLevelEntitiesForDesign_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__PLMDocConnection_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__PLMDocConnection_retr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection_retrieveAllDocumentsIncludingCBP");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__ENOPcx_PPRContext_add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcx_PPRContext_addAllConnections");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__ENORsc_Resource_addAc = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENORsc_Resource_addAcceptedPackagings");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__ENORsc_Resource_addSh = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENORsc_Resource_addShifts");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__PRODUCTCFG_div_VPMRep = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__ENORsc_Resource_getBe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENORsc_Resource_getBehaviorReps");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__ENORsc_Resource_getS = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENORsc_Resource_getSimulationLogicReps");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__ENORsc_Resource_addB = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENORsc_Resource_addBehaviorLibraryReps");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__CATSysBehaviorLibrar = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSysBehaviorLibrary/CATSysBehaviorLibRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__CATSysBehaviorLibrar = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSysBehaviorLibrary");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__CATSysBehaviorLibrar = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSysBehaviorLibrary_GetRefLibFromRepLib");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__CATSysBehaviorLibrar = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSysBehaviorLibrary/CATSysBehaviorLibReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__SystemsBehavior_GetD = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("SystemsBehavior_GetDependencies");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet2 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet3 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet4 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet5 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet6 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet7 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetAttachedDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetShifts = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetB = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetC = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetD = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetE = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetF = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetG = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAttachedDocuments = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDShifts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet restrictedPLMIDSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		restrictedPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_VPMRef ) );
		PLMRouteSetAttachedDocuments.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__PLMDocConnection_, _STRING_2__PLMDocConnection_retr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { restrictedPLMIDSet } ) );
		PLMIDSetAttachedDocuments.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetAttachedDocuments, _STRING_3__all_ ) );
		PLMRouteSet7.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__DELPPRContextModel_, _STRING_5__ENOPcx_PPRContext_add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { restrictedPLMIDSet } ) );
		PLMIDSetG.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet7, _STRING_3__all_ ) );
		PLMRouteSet2.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__DELPPRContextModel_, _STRING_6__ENORsc_Resource_addAc, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { restrictedPLMIDSet } ) );
		PLMRouteSetShifts.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__DELPPRContextModel_, _STRING_7__ENORsc_Resource_addSh, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { restrictedPLMIDSet } ) );
		PLMIDShifts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetShifts ) );
		PLMIDSetB.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_8__PRODUCTCFG_div_VPMRep ) );
		PLMRouteSet3.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__DELPPRContextModel_, _STRING_9__ENORsc_Resource_getBe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetB } ) );
		PLMRouteSet4.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__DELPPRContextModel_, _STRING_10__ENORsc_Resource_getS, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetB } ) );
		PLMIDSetC.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet3 ), _STRING_8__PRODUCTCFG_div_VPMRep ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet4 ), _STRING_8__PRODUCTCFG_div_VPMRep ) ) );
		PLMRouteSet5.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__DELPPRContextModel_, _STRING_11__ENORsc_Resource_addB, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetC } ) );
		PLMIDSetD.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet5, _STRING_3__all_ ), _STRING_12__CATSysBehaviorLibrar ) );
		PLMRouteSet6.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_13__CATSysBehaviorLibrar, _STRING_14__CATSysBehaviorLibrar, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetD } ) );
		PLMIDSetE.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet6, _STRING_3__all_ ), _STRING_15__CATSysBehaviorLibrar ) );
		PLMIDSetF.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_16__SystemsBehavior_GetD, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetE } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet2 ) ), PLMIDSetE ), PLMIDSetF ), PLMIDSetG ), PLMIDSetAttachedDocuments ), PLMIDShifts ) );
	}
}
