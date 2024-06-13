
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Config_GetStructConfig_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__PLMCORE_div_PLMCoreRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__VPMCfgContext_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgContext");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__VPMCfgContext_AddCont = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgContext_AddContextFromReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__VPMCfgContext_div_VPM = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgContext/VPMCfgContext");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__PLMCORE_div_PLMCoreIn = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__VPMCfgEffectivity_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgEffectivity");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__VPMCfgEffectivity_Add = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgEffectivity_AddEffectivityFromInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__VPMCfgEffectivity_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgEffectivity/VPMCfgEffectivity");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__VPMCfgInstanceConfigu = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgInstanceConfiguration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__VPMCfgInstanceConfigu = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgInstanceConfiguration_AddInstanceConfigurationFromInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__VPMCfgInstanceConfig = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgInstanceConfiguration/VPMCfgInstanceConfiguration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__VPMCfgConfiguration_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgConfiguration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__VPMCfgConfiguration_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgConfiguration_AddPredefinedConfigurationFromInstanceConfiguration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__VPMCfgConfiguration_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgConfiguration/VPMCfgConfiguration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__Product_Configuratio = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Product Configuration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__ProductConfiguration = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductConfiguration_AddProductConfigurationFromInstanceConfiguration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__Class_div_Product_Co = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Product Configuration");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetContext = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetEff = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetInstConfig = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPredefConfig = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductConfig = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetInputRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetInputInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetContext = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetEff = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetInstConfig = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPredefConfig = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductConfig = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetInputRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__PLMCORE_div_PLMCoreRe ) );
		PLMRouteSetContext.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__VPMCfgContext_, _STRING_2__VPMCfgContext_AddCont, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetInputRef } ) );
		PLMIDSetContext.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetContext ), _STRING_3__VPMCfgContext_div_VPM ) );
		PLMIDSetInputInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_4__PLMCORE_div_PLMCoreIn ) );
		PLMRouteSetEff.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__VPMCfgEffectivity_, _STRING_6__VPMCfgEffectivity_Add, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetInputInst } ) );
		PLMIDSetEff.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetEff ), _STRING_7__VPMCfgEffectivity_div_ ) );
		PLMRouteSetInstConfig.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_8__VPMCfgInstanceConfigu, _STRING_9__VPMCfgInstanceConfigu, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetInputInst } ) );
		PLMIDSetInstConfig.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetInstConfig ), _STRING_10__VPMCfgInstanceConfig ) );
		PLMRouteSetPredefConfig.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_11__VPMCfgConfiguration_, _STRING_12__VPMCfgConfiguration_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetInstConfig } ) );
		PLMIDSetPredefConfig.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPredefConfig ), _STRING_13__VPMCfgConfiguration_div_ ) );
		PLMRouteSetProductConfig.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_14__Product_Configuratio, _STRING_15__ProductConfiguration, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetInstConfig } ) );
		PLMIDSetProductConfig.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductConfig ), _STRING_16__Class_div_Product_Co ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetContext ), PLMIDSetEff ), PLMIDSetInstConfig ), PLMIDSetPredefConfig ), PLMIDSetProductConfig ) );
	}
}
