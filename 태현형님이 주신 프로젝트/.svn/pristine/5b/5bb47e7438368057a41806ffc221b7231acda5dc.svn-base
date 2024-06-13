
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class SafetyFailureModesEffectsAnalysis_ExportReview_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__CATSafety_div_Failure = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety/FailureModesEffectsAnalysis");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__CATSafety_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__CATSafety_FMEANavigat = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety_FMEANavigationToArchitecture");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__Functional_ExportRefe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Functional_ExportReference_Design");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__RFLPLMFunctional_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMFunctional/RFLPLMFunctionalReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__Logical_ExportReferen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Logical_ExportReference_Design");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__RFLVPMLogical_div_RFL = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLVPMLogical/RFLVPMLogicalReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__CATSafety_Architectur = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety_ArchitectureNavigationToFMEA");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__CATSafety_ExpandFMEA_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety_ExpandFMEA");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__CATSafety_div_Failure = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety/FailureModesEffectsAnalysisCausalityRelationship");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__CATSafety_CausalityR = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety_CausalityRelationshipNavigationToTargets");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet fmeaIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet functionalArchitectureIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet logicalArchitectureIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet architectureIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet mainArchitectureRefRouteSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet mainArchitectureRefIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet allFMEARouteSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet allFMEAIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet allFMEAContentRouteSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet allFMEAContentIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet causalityRelationshipRouteSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet causalityRelationshipIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet allCausalityRelationshipContentIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		fmeaIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__CATSafety_div_Failure ) );
		mainArchitectureRefRouteSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATSafety_, _STRING_2__CATSafety_FMEANavigat, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { fmeaIdSet } ) );
		mainArchitectureRefIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( mainArchitectureRefRouteSet ) );
		functionalArchitectureIdSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_3__Functional_ExportRefe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , mainArchitectureRefIdSet, _STRING_4__RFLPLMFunctional_div_ ) } ) );
		logicalArchitectureIdSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_5__Logical_ExportReferen, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , mainArchitectureRefIdSet, _STRING_6__RFLVPMLogical_div_RFL ) } ) );
		architectureIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( functionalArchitectureIdSet, logicalArchitectureIdSet ) );
		allFMEARouteSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATSafety_, _STRING_7__CATSafety_Architectur, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { architectureIdSet } ) );
		allFMEAIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( allFMEARouteSet ) );
		allFMEAContentRouteSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATSafety_, _STRING_8__CATSafety_ExpandFMEA_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , allFMEAIdSet, _STRING_0__CATSafety_div_Failure ) } ) );
		allFMEAContentIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( allFMEAContentRouteSet ) );
		causalityRelationshipIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , allFMEAContentIdSet, _STRING_9__CATSafety_div_Failure ) );
		causalityRelationshipRouteSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATSafety_, _STRING_10__CATSafety_CausalityR, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { causalityRelationshipIdSet } ) );
		allCausalityRelationshipContentIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( causalityRelationshipRouteSet ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( fmeaIdSet, mainArchitectureRefIdSet ), architectureIdSet ), allFMEAIdSet ), allFMEAContentIdSet ), causalityRelationshipIdSet ), allCausalityRelationshipContentIdSet ) );
	}
}
