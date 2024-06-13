
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class SafetyFaultTreeElement_ExportReview_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__CATSafety_div_FaultTr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety/FaultTreeElement");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__CATSafety_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__CATSafety_FaultTreeEl = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety_FaultTreeElementNavigationToArchitecture");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__Functional_ExportRefe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Functional_ExportReference_Design");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__RFLPLMFunctional_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMFunctional/RFLPLMFunctionalReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__Logical_ExportReferen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Logical_ExportReference_Design");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__RFLVPMLogical_div_RFL = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLVPMLogical/RFLVPMLogicalReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__CATSafety_Architectur = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety_ArchitectureNavigationToFaultTreeElement");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__CATSafety_ExpandFault = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATSafety_ExpandFaultTreeElement");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet faultTreeElementIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet functionalArchitectureIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet logicalArchitectureIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet architectureIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet mainArchitectureRefRouteSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet mainArchitectureRefIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet allFaultTreeElementRouteSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet allFaultTreeElementIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet allFaultTreeElementContentRouteSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet allFaultTreeElementContentIdSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		faultTreeElementIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__CATSafety_div_FaultTr ) );
		mainArchitectureRefRouteSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATSafety_, _STRING_2__CATSafety_FaultTreeEl, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { faultTreeElementIdSet } ) );
		mainArchitectureRefIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( mainArchitectureRefRouteSet ) );
		functionalArchitectureIdSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_3__Functional_ExportRefe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , mainArchitectureRefIdSet, _STRING_4__RFLPLMFunctional_div_ ) } ) );
		logicalArchitectureIdSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_5__Logical_ExportReferen, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , mainArchitectureRefIdSet, _STRING_6__RFLVPMLogical_div_RFL ) } ) );
		architectureIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( functionalArchitectureIdSet, logicalArchitectureIdSet ) );
		allFaultTreeElementRouteSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATSafety_, _STRING_7__CATSafety_Architectur, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { architectureIdSet } ) );
		allFaultTreeElementIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( allFaultTreeElementRouteSet ) );
		allFaultTreeElementContentRouteSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATSafety_, _STRING_8__CATSafety_ExpandFault, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , allFaultTreeElementIdSet, _STRING_0__CATSafety_div_FaultTr ) } ) );
		allFaultTreeElementContentIdSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( allFaultTreeElementContentRouteSet ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( faultTreeElementIdSet, mainArchitectureRefIdSet ), architectureIdSet ), allFaultTreeElementIdSet ), allFaultTreeElementContentIdSet ) );
	}
}
