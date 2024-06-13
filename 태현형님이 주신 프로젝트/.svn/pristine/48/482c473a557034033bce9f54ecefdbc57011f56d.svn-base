
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class ExperienceExport_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PLMExpAbstract3DExper = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMExpAbstract3DExperience");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__PLMExp_getSRPointedEx = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMExp_getSRPointedExps");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__PLMExp_getSRPointedAs = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMExp_getSRPointedAssets");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__PLMExp3DExperience_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMExp3DExperience/Abstract3DExperienceObject");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__ProductCfg_AddChildre = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddChildrenProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__PRODUCTCFG_div_VPMRef = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__VPMEditor_GetAllRepre = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMEditor_GetAllRepresentations");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__Logical_ExportReferen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Logical_ExportReference_Design");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__RFLVPMLogical_div_RFL = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLVPMLogical/RFLVPMLogicalReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__MaterialReferenceExp = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("MaterialReferenceExport");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__CATMaterialRef_div_C = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMaterialRef/CATMatReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__SimulationOpen_Gener = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("SimulationOpen_GenerativeStress");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__SIMObjSimulation_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("SIMObjSimulation/SIMObjSimulationObject");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__EnvironmentExport_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("EnvironmentExport");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__PLM3DXAmbienceEnviro = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLM3DXAmbienceEnvironment/AmbienceEnvironment");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_PointedExps = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_PointedAssets = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_RefPrds = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_RepRefPrds = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_RefLogical = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_RefMaterial = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_RefSimu = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_RefAmbiance = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet Ids_CommercialTwinSRPointedAsset = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet Rts_PointedExps = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet Rts_PointedAssets = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet Rts_RepRefPrds = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet Rts_Exp = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		Rts_PointedExps.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_0__PLMExpAbstract3DExper, _STRING_1__PLMExp_getSRPointedEx, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { iPLMIDSet } ) );
		Ids_PointedExps.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( Rts_PointedExps ) );
		Rts_PointedAssets.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_0__PLMExpAbstract3DExper, _STRING_2__PLMExp_getSRPointedAs, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { Ids_PointedExps } ) );
		Ids_PointedAssets.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( Rts_PointedAssets ) );
		Rts_Exp.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_0__PLMExpAbstract3DExper, _STRING_2__PLMExp_getSRPointedAs, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , Ids_PointedAssets, _STRING_3__PLMExp3DExperience_div_ ) } ) );
		Ids_CommercialTwinSRPointedAsset.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( Rts_Exp ) );
		Rts_RepRefPrds.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__PRODUCTCFG_, _STRING_5__ProductCfg_AddChildre, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( Ids_PointedAssets, Ids_CommercialTwinSRPointedAsset ), _STRING_6__PRODUCTCFG_div_VPMRef ) } ) );
		Ids_RefPrds.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( Rts_RepRefPrds ) );
		Ids_RepRefPrds.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_7__VPMEditor_GetAllRepre, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { Ids_RefPrds } ) );
		Ids_RefLogical.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_8__Logical_ExportReferen, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , Ids_PointedAssets, _STRING_9__RFLVPMLogical_div_RFL ) } ) );
		Ids_RefMaterial.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_10__MaterialReferenceExp, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , Ids_PointedAssets, _STRING_11__CATMaterialRef_div_C ) } ) );
		Ids_RefSimu.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_12__SimulationOpen_Gener, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , Ids_PointedAssets, _STRING_13__SIMObjSimulation_div_ ) } ) );
		Ids_RefAmbiance.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_14__EnvironmentExport_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , Ids_PointedAssets, _STRING_15__PLM3DXAmbienceEnviro ) } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, Ids_PointedExps ), Ids_PointedAssets ), Ids_RefPrds ), Ids_RepRefPrds ), Ids_RefLogical ), Ids_RefMaterial ), Ids_RefSimu ), Ids_RefAmbiance ) );
	}
}
