
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Config_GetConfiguredReferences_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__VPMCfgConfiguration_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgConfiguration/VPMCfgConfiguration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__VPMCfgConfiguration_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgConfiguration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__VPMCfgConfiguration_A = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgConfiguration_AddReferenceFromConfiguration");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__PLMCORE_div_PLMCoreRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMCORE/PLMCoreReference");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetRef = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetInputConfig = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetInputConfig.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__VPMCfgConfiguration_div_ ) );
		PLMRouteSetRef.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__VPMCfgConfiguration_, _STRING_2__VPMCfgConfiguration_A, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetInputConfig } ) );
		PLMIDSetRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetRef ), _STRING_3__PLMCORE_div_PLMCoreRe ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetRef ) );
	}
}
