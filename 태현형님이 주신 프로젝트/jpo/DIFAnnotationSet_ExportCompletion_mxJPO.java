
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class DIFAnnotationSet_ExportCompletion_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DIFModelerAnnotationS = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DIFModelerAnnotationSet/DIFAnnotationSet");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DIFModeler01_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DIFModeler01");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__DifModeler_AddMBDObje = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DifModeler_AddMBDObjects");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__DIFModeler03_div_DIFV = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DIFModeler03/DIFViewStream");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__DifModeler_AddStandar = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DifModeler_AddStandard");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__DifModeler_AddAnnotat = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DifModeler_AddAnnotatedProductCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__DifModeler_AddAnnotat = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DifModeler_AddAnnotatedProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__ProductCfg_AddChildre = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddChildrenProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__ProductCfg_AddVPMRep = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddVPMRepsPortsAndConnections");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAnnotationSets = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMDifMBDObjectsSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMDifMBDObjectsIDSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMDifAnnotatedProductCnxSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMDifAnnotatedProductCnxIDSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMDifAnnotatedProductsSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMDifAnnotatedProductsIDSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMDifProductsExpanded = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMDifProductsExpandedIDSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet1 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet1 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMDifRepReferenceWithStandard = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMDifStandardSet = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMDifStandardIDSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetAnnotationSets.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DIFModelerAnnotationS ) );
		PLMDifMBDObjectsSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__DIFModeler01_, _STRING_2__DifModeler_AddMBDObje, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetAnnotationSets } ) );
		PLMDifMBDObjectsIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMDifMBDObjectsSet ) );
		PLMDifRepReferenceWithStandard.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMDifMBDObjectsIDSet, _STRING_3__DIFModeler03_div_DIFV ) );
		PLMDifStandardSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__DIFModeler01_, _STRING_4__DifModeler_AddStandar, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMDifRepReferenceWithStandard } ) );
		PLMDifStandardIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMDifStandardSet ) );
		PLMDifAnnotatedProductCnxSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__DIFModeler01_, _STRING_5__DifModeler_AddAnnotat, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetAnnotationSets } ) );
		PLMDifAnnotatedProductCnxIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMDifAnnotatedProductCnxSet ) );
		PLMDifAnnotatedProductsSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__DIFModeler01_, _STRING_6__DifModeler_AddAnnotat, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMDifAnnotatedProductCnxIDSet } ) );
		PLMDifAnnotatedProductsIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMDifAnnotatedProductsSet ) );
		PLMDifProductsExpanded.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_7__PRODUCTCFG_, _STRING_8__ProductCfg_AddChildre, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMDifAnnotatedProductsIDSet, _STRING_9__PRODUCTCFG_div_VPMRef ) } ) );
		PLMDifProductsExpandedIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMDifProductsExpanded ), PLMDifAnnotatedProductsIDSet ) );
		PLMRouteSet1.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_7__PRODUCTCFG_, _STRING_10__ProductCfg_AddVPMRep, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMDifProductsExpandedIDSet, _STRING_9__PRODUCTCFG_div_VPMRef ) } ) );
		PLMIDSet1.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet1 ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMDifMBDObjectsIDSet ), PLMIDSet1 ), PLMDifAnnotatedProductCnxIDSet ), PLMDifProductsExpandedIDSet ), PLMDifStandardIDSet ) );
	}
}
