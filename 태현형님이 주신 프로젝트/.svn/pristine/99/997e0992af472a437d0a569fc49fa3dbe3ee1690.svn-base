
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class ConfigCBP_GetModelVersionContent_xPDM_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__Class_div_Products_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Products");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__Products_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Products");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__Product_AddCriteriaFr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Product_AddCriteriaFromModelVersion_xPDM");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetModelVersion = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetModelVersionContent = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		PLMIDSetModelVersion.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__Class_div_Products_ ) );
		PLMRouteSetModelVersionContent.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__Products_, _STRING_2__Product_AddCriteriaFr, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetModelVersion } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetModelVersionContent ) ) );
	}
}
