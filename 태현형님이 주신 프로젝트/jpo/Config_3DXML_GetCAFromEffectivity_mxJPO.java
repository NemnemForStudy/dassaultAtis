
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Config_3DXML_GetCAFromEffectivity_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__VPMCfgEffectivity_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgEffectivity/VPMCfgEffectivity");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__VPMCfgEffectivity_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VPMCfgEffectivity");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__Config_GetChangeActio = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Config_GetChangeActionFromEffectivity");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetCAContent = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCA = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCAContent = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetCA.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__VPMCfgEffectivity_div_ ) );
		PLMRouteSetCAContent.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__VPMCfgEffectivity_, _STRING_2__Config_GetChangeActio, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetCA } ) );
		PLMIDSetCAContent.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetCAContent ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetCAContent ) );
	}
}
