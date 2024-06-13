
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Drafting_ExportCompletion_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PRODUCTCFG_div_Drawin = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/Drawing");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__CATDraftingDiscipline = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATDraftingDiscipline");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__CATDraftingDiscipline = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATDraftingDiscipline_AddIsAViewOfReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__CATDraftingDiscipline = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATDraftingDiscipline_AddIsAViewOfRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__CATDraftingDiscipline = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATDraftingDiscipline_AddIsAViewOfInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__CATDraftingDiscipline = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATDraftingDiscipline_AddIsAViewOfPVS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__PLMWspSpecFilter_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMWspSpecFilter/PLMWspSpecPVS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__PLMWspSpecFilter_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMWspSpecFilter");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__PLMWspSpecFilter_Retr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMWspSpecFilter_RetrieveFilteredRoot");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__XCADModeler_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADModeler");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__XCAD_GetDependencies = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_GetDependenciesRepToRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__ProductCfg_AddAggreg = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddAggregatingReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__PRODUCTCFG_div_VPMIn = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_17__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMRepReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_18__ProductCfg_AddChildr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddChildrenProduct");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_19__XCADAssembly_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCADAssembly");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_20__XcadAssembly_ExpandV = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XcadAssembly_ExpandVPMRefToXCADRepRepInst");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_21__XCAD_CompleteItems_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_CompleteItems");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_22__XCAD_CompleteNonPS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("XCAD_CompleteNonPS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_23__ProductCfg_AddVPMRep = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_AddVPMRepsPortsAndConnections");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_24__PLMKnowledgewareDisc = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMKnowledgewareDiscipline");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_25__KwaDiscipline_AddPoi = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("KwaDiscipline_AddPointedDesignTable");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_26__RFLPLMImplementConne = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMImplementConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_27__RFLPLMImplementConne = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMImplementConnection_AddAllImplementCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_28__CATMaterial_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMaterial");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_29__mat_retrieveAllAppli = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("mat_retrieveAllAppliedMaterial");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_30__CATMaterialRef_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMaterialRef");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_31__mat_retrieveDomains_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("mat_retrieveDomains");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_32__CATMaterialRef_div_C = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMaterialRef/CATMatReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_33__mat_retrieveCnx_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("mat_retrieveCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_34__rdg_retrieveTexture_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("rdg_retrieveTexture");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_35__CATMaterialRef_div_M = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMaterialRef/MaterialDomain");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_36__SIMObjSimulationGene = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("SIMObjSimulationGeneric");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_37__sim_retrieveExternal = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("sim_retrieveExternalDocumentfromFEMRep");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_38__Rendering_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rendering");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_39__Rendering_AddExterna = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rendering_AddExternalDocFromRenderingRep");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_40__PLMFst_Fasteners_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMFst_Fasteners");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_41__PLMFst_Fasteners_Add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMFst_Fasteners_AddAllAggregatedCNX");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_42__CATMCXAssembly_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMCXAssembly");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_43__CATMCXAssembly_AddAl = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATMCXAssembly_AddAllAggregatedMCX");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_44__CATAsmSymGeo_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATAsmSymGeo");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_45__CATAsmSymObj_AddAllS = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("CATAsmSymObj_AddAllSymObj");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_46__PLMDocConnection_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_47__PLMDocConnection_ret = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMDocConnection_retrieveAllDocuments");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_48__PLMKnowHowRuleSet_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMKnowHowRuleSet");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_49__kwe_navigate_ruleset = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("kwe_navigate_ruleset");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_50__kwe_expand_rules_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("kwe_expand_rules");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_51__PLMWspSpecFilter_Add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMWspSpecFilter_AddAllAggregatedSpecPVS");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_in_0 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_out_0 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TgtRef_RS = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtRefPath_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TgtRepRef_RS = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtRepRefPath_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TgtInstance_RS = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtxCADProduct_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtxCADNonPS_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtInstancePath_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtAllPath_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TgtPVS_RS = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtPVSPath_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtPVSPath_IS2 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TgtFilterRoot_RS = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtFilterRootPath_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TgtAgregatingRefs_RS = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TgtAgregatingRefs_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_in_1 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet ProductComponents_R = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet ProductComponents_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_out_1 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet ShapeXCadComponents_R = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet ShapeXCadComponents_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet ProductXCadComponents_R = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet ProductXCadComponents_IS = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_in_2 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet_out_2 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet1 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet2 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet5 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet6 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet7 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet8 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet9 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet10 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet11 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet13 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet14 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet16 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSet17 = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet RsImportedRulesets = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet RsRuleEntity = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet RsAggreatedSpecPVS = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetproc = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet1 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet1Rep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet6 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet7 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet8 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSet9 = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsImportedRulesets = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRestricted = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRestrictedRep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSet_in_0.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PRODUCTCFG_div_Drawin ) );
		TgtRef_RS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATDraftingDiscipline, _STRING_2__CATDraftingDiscipline, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_in_0 } ) );
		TgtRefPath_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TgtRef_RS, _STRING_3__all_ ) );
		TgtRepRef_RS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATDraftingDiscipline, _STRING_4__CATDraftingDiscipline, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_in_0 } ) );
		TgtRepRefPath_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TgtRepRef_RS, _STRING_3__all_ ) );
		TgtInstance_RS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATDraftingDiscipline, _STRING_5__CATDraftingDiscipline, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_in_0 } ) );
		TgtInstancePath_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TgtInstance_RS, _STRING_3__all_ ) );
		TgtPVS_RS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__CATDraftingDiscipline, _STRING_6__CATDraftingDiscipline, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_in_0 } ) );
		TgtPVSPath_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TgtPVS_RS, _STRING_3__all_ ) );
		TgtPVSPath_IS2.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , TgtPVSPath_IS, _STRING_7__PLMWspSpecFilter_div_ ) );
		TgtFilterRoot_RS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_8__PLMWspSpecFilter_, _STRING_9__PLMWspSpecFilter_Retr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { TgtPVSPath_IS2 } ) );
		TgtFilterRootPath_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TgtFilterRoot_RS, _STRING_3__all_ ) );
		TgtAllPath_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( TgtRefPath_IS, TgtRepRefPath_IS ), TgtInstancePath_IS ), TgtFilterRootPath_IS ) );
		ProductXCadComponents_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_10__XCADModeler_, _STRING_11__XCAD_GetDependencies, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet_in_0 } ) ) );
		TgtAgregatingRefs_RS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__PRODUCTCFG_, _STRING_13__ProductCfg_AddAggreg, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , TgtAllPath_IS, _STRING_14__PRODUCTCFG_div_VPMIn ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , TgtAllPath_IS, _STRING_15__PRODUCTCFG_div_VPMRe ) ) } ) );
		TgtAgregatingRefs_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TgtAgregatingRefs_RS ) );
		PLMIDSet_out_0.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( TgtAgregatingRefs_IS, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , TgtAllPath_IS, _STRING_16__PRODUCTCFG_div_VPMRe ) ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , TgtAllPath_IS, _STRING_17__PRODUCTCFG_div_VPMRe ) ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , TgtFilterRootPath_IS, _STRING_16__PRODUCTCFG_div_VPMRe ) ), PLMIDSet_in_0 ), ProductXCadComponents_IS ) );
		PLMIDSet_in_1.setValue( PLMIDSet_out_0 );
		ProductComponents_R.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__PRODUCTCFG_, _STRING_18__ProductCfg_AddChildr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_in_1, _STRING_16__PRODUCTCFG_div_VPMRe ) } ) );
		ProductComponents_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( ProductComponents_R ) );
		ShapeXCadComponents_R.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_19__XCADAssembly_, _STRING_20__XcadAssembly_ExpandV, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , ProductComponents_IS, _STRING_16__PRODUCTCFG_div_VPMRe ) } ) );
		ShapeXCadComponents_IS.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( ShapeXCadComponents_R ), ProductComponents_IS ), ProductXCadComponents_IS ) );
		TgtxCADProduct_IS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_21__XCAD_CompleteItems_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { ShapeXCadComponents_IS } ) );
		TgtxCADNonPS_IS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_22__XCAD_CompleteNonPS_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { ShapeXCadComponents_IS } ) );
		PLMIDSet_out_1.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( ProductComponents_IS, PLMIDSet_in_1 ), ShapeXCadComponents_IS ), TgtxCADNonPS_IS ), TgtxCADProduct_IS ) );
		PLMIDSet_in_2.setValue( PLMIDSet_out_1 );
		PLMIDSetRestricted.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_in_2, _STRING_16__PRODUCTCFG_div_VPMRe ) );
		PLMIDSetRestrictedRep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet_in_2, _STRING_17__PRODUCTCFG_div_VPMRe ) );
		PLMRouteSet1.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_12__PRODUCTCFG_, _STRING_23__ProductCfg_AddVPMRep, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMIDSet1.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet1 ) );
		PLMIDSet1Rep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetRestrictedRep, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet1, _STRING_17__PRODUCTCFG_div_VPMRe ) ) );
		PLMRouteSet2.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_24__PLMKnowledgewareDisc, _STRING_25__KwaDiscipline_AddPoi, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet1Rep } ) );
		PLMRouteSet5.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_26__RFLPLMImplementConne, _STRING_27__RFLPLMImplementConne, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMRouteSet6.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_28__CATMaterial_, _STRING_29__mat_retrieveAllAppli, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMIDSet6.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet6 ) );
		PLMRouteSet7.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_30__CATMaterialRef_, _STRING_31__mat_retrieveDomains_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet6, _STRING_32__CATMaterialRef_div_C ) } ) );
		PLMIDSet7.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet7 ) );
		PLMRouteSet8.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_30__CATMaterialRef_, _STRING_33__mat_retrieveCnx_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet6, _STRING_32__CATMaterialRef_div_C ) } ) );
		PLMIDSet8.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet8 ) );
		PLMRouteSet9.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_30__CATMaterialRef_, _STRING_34__rdg_retrieveTexture_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSet7, _STRING_35__CATMaterialRef_div_M ) } ) );
		PLMIDSet9.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet9 ) );
		PLMRouteSet14.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_36__SIMObjSimulationGene, _STRING_37__sim_retrieveExternal, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet1Rep } ) );
		PLMRouteSet16.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_38__Rendering_, _STRING_39__Rendering_AddExterna, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet1Rep } ) );
		PLMRouteSet17.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_40__PLMFst_Fasteners_, _STRING_41__PLMFst_Fasteners_Add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMRouteSet10.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_42__CATMCXAssembly_, _STRING_43__CATMCXAssembly_AddAl, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMRouteSet11.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_44__CATAsmSymGeo_, _STRING_45__CATAsmSymObj_AddAllS, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMRouteSet13.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_46__PLMDocConnection_, _STRING_47__PLMDocConnection_ret, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		RsImportedRulesets.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_48__PLMKnowHowRuleSet_, _STRING_49__kwe_navigate_ruleset, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSet1Rep } ) );
		IdsImportedRulesets.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( RsImportedRulesets ) );
		RsRuleEntity.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_48__PLMKnowHowRuleSet_, _STRING_50__kwe_expand_rules_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsImportedRulesets } ) );
		RsAggreatedSpecPVS.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_8__PLMWspSpecFilter_, _STRING_51__PLMWspSpecFilter_Add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetRestricted } ) );
		PLMIDSet_out_2.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet_in_2, PLMIDSet1 ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet2 ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet5 ) ), PLMIDSet6 ), PLMIDSet7 ), PLMIDSet8 ), PLMIDSet9 ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet10 ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet11 ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet13 ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet14 ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet16 ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSet17 ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( RsRuleEntity ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( RsAggreatedSpecPVS ) ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSet_out_2, iPLMIDSet ) );
	}
}
