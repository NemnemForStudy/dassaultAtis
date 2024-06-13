
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class XCAD_ExportNonPSRep_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__XCADModeler_div_XCADN = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADModeler/XCADNonPSBaseRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__XCADModeler_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADModeler");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__XCAD_GetDependenciesR = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetDependenciesRepToRep");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__XCAD_GetDependenciesR = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetDependenciesRepToRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__ProductCfg_AddChildre = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddChildrenProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__XCAD_AddRepInstAndRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_AddRepInstAndRefFather");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__PLMCORE_div_PLMCoreRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__VPMEditor_GetAllRepre = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMEditor_GetAllRepresentations");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_NonPSReps = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_PointedRefsAndDependencies = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_PointedRepsAndDependencies = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_NonPSReps_Ptd = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet ProductComponents_R = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_RefFromRep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_CompleteInput = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_CompletedProduct = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSet_NonPSReps.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__XCADModeler_div_XCADN ) );
		PLMIDSet_PointedRepsAndDependencies.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_2__XCAD_GetDependenciesR, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_NonPSReps } ) ) );
		PLMIDSet_NonPSReps_Ptd.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_PointedRepsAndDependencies, _STRING_0__XCADModeler_div_XCADN ), PLMIDSet_NonPSReps ) );
		PLMIDSet_PointedRefsAndDependencies.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_3__XCAD_GetDependenciesR, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_NonPSReps_Ptd } ) ) );
		ProductComponents_R.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__PRODUCTCFG_, _STRING_5__ProductCfg_AddChildre, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_PointedRefsAndDependencies, _STRING_6__PRODUCTCFG_div_VPMRef ) } ) ) );
		PLMIDSet_RefFromRep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__XCADModeler_, _STRING_7__XCAD_AddRepInstAndRef, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_PointedRepsAndDependencies, _STRING_8__PLMCORE_div_PLMCoreRe ) } ) ) );
		PLMIDSet_CompleteInput.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSet_PointedRefsAndDependencies ), ProductComponents_R ), PLMIDSet_PointedRepsAndDependencies ), PLMIDSet_RefFromRep ) );
		PLMIDSet_CompletedProduct.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_9__VPMEditor_GetAllRepre, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_CompleteInput } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSet_CompletedProduct ), PLMIDSet_CompleteInput ) );
	}
}
