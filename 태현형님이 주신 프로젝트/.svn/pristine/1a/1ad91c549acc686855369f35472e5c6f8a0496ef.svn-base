import java.util.HashMap;
import com.matrixone.apps.classification.ClassificationAttributesCreationUtil;
import matrix.db.Context;

public class emxLibraryCentralCreateNewAttributesBase_mxJPO {
	
	public emxLibraryCentralCreateNewAttributesBase_mxJPO(Context context, String[] args) {
		
	}

	/**
	 * Returns valid range values for the specified field. This
	 * method is specified by adding settings to the field definition.
	 *
	 * @param context
	 *            context for this request
	 * @param args
	 *            JPO input arguments (programMap)
	 * @return rangeMap
	 * @throws Exception
	 *             if an unexpected error occurs.
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public HashMap getRange(Context context, String[] args) throws Exception
	{
		return ClassificationAttributesCreationUtil.getRange(context, args);
	}
	
	/**
	 * For fetching Dimensions to show in Dimensions drop down.
	 * uses JKnowledgeInterfaces jar
	 * 
	 * @param context
	 * @param args
	 * @return HashMap
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public HashMap getDimensionList(Context context, String[] args) throws Exception
	{
		return ClassificationAttributesCreationUtil.getDimensionList(context, args);
	}
	
	/**
	 * For fetching Units of the selected Dimension
	 * 
	 * @param context
	 * @param args
	 * @return HashMap
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public HashMap getDimensionUnits(Context context, String[] args) throws Exception
	{
		return ClassificationAttributesCreationUtil.getDimensionUnits(context, args);
	}

    /**
     * returns HTML string to display in attribute creation form for predicate field
     * 
     * @param context
     * @param args
     * @return HTML string
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public String getAttributePredicateHTML(Context context, String[] args)
    {
    	return ClassificationAttributesCreationUtil.getAttributePredicateHTML(context, args);
    }

    /**
     * Fetch classification attribute data for edit form
     * 
     * @param context
     * @param args
     * @return String
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public String getAttributeData(Context context, String[] args) throws Exception
    {
    	return ClassificationAttributesCreationUtil.getAttributeData(context, args);
    }

    /**
     * update classification attribute data from edit form
     * 
     * @param context
     * @param args
     * @return HashMap
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public HashMap<String, String> updateAttributeData(Context context, String[] args) throws Exception
    {
    	return ClassificationAttributesCreationUtil.updateAttributeData(context, args);
    }

    /**
     * @param context
     * @param args
     * @return Boolean
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Boolean isAttributeChoicesEditable(Context context, String[] args) throws Exception
    {
    	return ClassificationAttributesCreationUtil.isAttributeChoicesEditable(context, args);
    }

    /**
     * @param context
     * @param args
     * @return Boolean
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Boolean isAttributeChoicesNotEditable(Context context, String[] args) throws Exception
    {
    	return !isAttributeChoicesEditable(context, args);
    }

    /**
     * @param context
     * @param args
     * @return Boolean
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Boolean isAttributeDefaultEditable(Context context, String[] args) throws Exception
    {
    	return ClassificationAttributesCreationUtil.isAttributeDefaultEditable(context, args);
    }

    /**
     * @param context
     * @param args
     * @return Boolean
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Boolean isAttributeDefaultNotEditable(Context context, String[] args) throws Exception
    {
    	return !isAttributeDefaultEditable(context, args);
    }
}
