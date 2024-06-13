import java.util.Iterator;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.search.index.ConfigModeler;
import matrix.db.Context;
import matrix.util.MatrixException;
import matrix.util.StringList;


public class emxLibraryCentralMigrateClassificationUnitsBase_mxJPO extends emxCommonMigration_mxJPO{

	private static String vaultName = "*";
	private static String boTypeFieldName = "classificationAttributes";
	private static String fieldNamePrefix = "IPC";

	private void init(Context context) throws FrameworkException{

	}

	public emxLibraryCentralMigrateClassificationUnitsBase_mxJPO(Context context, String[] args) throws Exception {
		super(context, args);
		init(context);
	}

	/*
	 * Migration for writing the input unit & input value fields of classification attributes (with dimension) to custom config xml
	 * 
	 * for all the classification attributes assigned with dimension
	 * 		-	write inputunit & inputvalue fields to the searchindexcustom file in DB using the ConfigModeler java API
	 * 		-	finally commit the data after done with writing all the attribute fields
	 * 
	 * @see ${CLASS:emxCommonMigrationBase}#migrateObjects(matrix.db.Context, matrix.util.StringList)
	 */
	public void migrateObjects(Context context, StringList attriNames) throws Exception
	{
		mqlLogRequiredInformationWriter("In emxLibraryCentralMigrateClassificationUnitsBase 'migrateObjects' method "+"\n");
		if(attriNames == null || attriNames.isEmpty())
			mqlLogRequiredInformationWriter("No data found to be migrated");
		else{
			ContextUtil.abortTransaction(context); //transaction started in emxCommonMigration should be aborted else below commitCustomToDB step will fail as it needs an explicit transaction
			
			ConfigModeler cm = new ConfigModeler(context);
			Iterator attriNameIter = attriNames.iterator();
			while (attriNameIter.hasNext()) {
				String attriName = (String) attriNameIter.next();
				if(attriName != null && !attriName.isEmpty()){
					try
					{
						mqlLogRequiredInformationWriter("\nStarted Migration for classification attribute: "+ attriName + "\n");

						String select = "attribute[" + attriName + "]";
						String fieldName = getFieldName(context, attriName);

						cm.addField(vaultName, boTypeFieldName, fieldName+"INPUTUNIT", select+".inputunit", "STRING", false);
						cm.addField(vaultName, boTypeFieldName, fieldName+"INPUTVALUE", select+".inputvalue", "DOUBLE", false);
						String attrPredi = attriName.replaceAll(" ", "_");
						cm.setFieldAttribute(vaultName, boTypeFieldName, fieldName+"INPUTVALUE", "sixw", "ds6wg:"+attrPredi+"InputValue");
						cm.setFieldAttribute(vaultName, boTypeFieldName, fieldName+"INPUTUNIT", "sixw", "ds6wg:"+attrPredi+"InputUnit");
					}catch(Exception ex){
						mqlLogRequiredInformationWriter("Migration failed for classification attribute: "+ attriName + "\n");
						writeUnconvertedOID("Migration for classification attribute: "+ attriName +" failed \n", attriName);
					}

					//committing to searchindexcustom
					try{
						cm.commitCustomToDB(context, false);
					}catch(Exception ex){
						mqlLogRequiredInformationWriter("Migration failed: error occured while writing to searchindexcustom \n");
						mqlLogRequiredInformationWriter(ex.toString());
					}
				}
			}
		}
	}

	private static String getFieldName(Context context, String iAttributeName)
	{
		iAttributeName = iAttributeName.toUpperCase().replaceAll(" ", "_");
		if (isOnPremise(context)) {
			return fieldNamePrefix+ "." + iAttributeName;
		} else {
			String tenantID = context.getTenant();
			if (UIUtil.isNotNullAndNotEmpty(tenantID)) {
				return fieldNamePrefix+ "." + processTenantIDForConfigXML(tenantID) + "." + iAttributeName;
			} else {
				return fieldNamePrefix+ "." + iAttributeName;
			}
		}
	}

	private static boolean isOnPremise(Context  iContext)
	{
		try {
			return FrameworkUtil.isOnPremise(iContext);
		} catch (MatrixException e) {
			return false;
		}
	}

	private static String processTenantIDForConfigXML (String iTenantID) {		
		return (iTenantID.replaceAll("[^A-Za-z0-9]", ""));
	}
}
