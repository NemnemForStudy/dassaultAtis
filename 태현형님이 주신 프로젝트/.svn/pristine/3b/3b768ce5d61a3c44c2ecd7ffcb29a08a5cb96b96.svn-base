/*
**  emxMsoiPreferencesPageLayout
**
**  Copyright (c) 1992-2003 MatrixOne, Inc.
**  All Rights Reserved.
**  This program contains proprietary and trade secret information of MatrixOne,
**  Inc.  Copyright notice is precautionary only
**  and does not evidence any actual or intended publication of such program
**
**  Returns Preferences page layout
*/
/**
 * emxMsoiPreferencesPageLayout jpo
 * This jpo returns a string containing xml for generating Preferences page
 */

import matrix.db.Context;
import com.matrixone.MCADIntegration.server.MCADServerResourceBundle;
import com.matrixone.MCADIntegration.server.beans.MCADMxUtil;
import com.matrixone.MCADIntegration.server.cache.IEFCache;
import com.matrixone.MCADIntegration.server.cache.IEFGlobalCache;

public class emxMsoiPreferencesPageLayout_mxJPO
{
	MCADMxUtil util = null;

	private final String COMBO_BOX		= "ComboBox";
	private final String EDIT_BOX		= "EditBox";
	private final String RADIO_BUTTON	= "Radio";
	private final String POPUP_LIST		= "PopupList";
	private final String CHECK_BOX		= "CheckBox";
	private IEFCache  _GlobalCache      = new IEFGlobalCache();

	public emxMsoiPreferencesPageLayout_mxJPO()
	{
	}

	public emxMsoiPreferencesPageLayout_mxJPO (Context context, String[] args) throws Exception
	{
		if (!context.isConnected())
			throw new Exception("not supported no desktop client");
	}

	public int mxMain(Context context, String []args)  throws Exception
	{
		return 0;
	}
	
	private void init(Context context, String language)
	{
		MCADServerResourceBundle serverResourceBundle = new MCADServerResourceBundle(language);
		util = new  MCADMxUtil(context, null,_GlobalCache);
	}

	/**
	 * Entry Point
	 * This method returns a string containing xml which is used for generating Preferences page
	 *
	 */
	public String getPreferencesPageLayout(Context context, String[] args)throws Exception
	{
		String language = args[0];

		init(context, language);

		StringBuffer preferencesPageLayout = new StringBuffer("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");

		preferencesPageLayout.append("<preferences>");

		//Category "Checkin" starts
		preferencesPageLayout.append("<category name=\"Checkin\">");
		
		//Preference - MCADInteg-DeleteLocalFileOnCheckin
		preferencesPageLayout.append("<preference name=\"" + util.getActualNameForAEFData(context, "attribute_MCADInteg-DeleteLocalFileOnCheckin") + "\">");
		preferencesPageLayout.append("<label>DeleteLocalFilesOnCheckin</label>");
		preferencesPageLayout.append("<uitype>" + CHECK_BOX + "</uitype>");
		preferencesPageLayout.append("</preference>");

		//Preference - IEF-UseAutoNameOption
		preferencesPageLayout.append("<preference name=\"" + util.getActualNameForAEFData(context, "attribute_IEF-UseAutoNameOption") + "\">");
		preferencesPageLayout.append("<label>AutoName</label>");
		preferencesPageLayout.append("<uitype>" + CHECK_BOX + "</uitype>");
		preferencesPageLayout.append("</preference>");

		//Preference - MCADInteg-LockObjectOnCheckin
		preferencesPageLayout.append("<preference name=\"" + util.getActualNameForAEFData(context,"attribute_MCADInteg-LockObjectOnCheckin") + "\">");
		preferencesPageLayout.append("<label>RetainLockOnCheckin</label>");
		preferencesPageLayout.append("<uitype>" + CHECK_BOX + "</uitype>");
		preferencesPageLayout.append("</preference>");

		preferencesPageLayout.append("</category>");
		//Category "Checkin" ends
		
		//Category "Checkout" starts
		preferencesPageLayout.append("<category name=\"Checkout\">");

		//Preference - MCADInteg-LockObjectOnCheckout
		preferencesPageLayout.append("<preference name=\"" + util.getActualNameForAEFData(context,"attribute_MCADInteg-LockObjectOnCheckout") + "\">");
		preferencesPageLayout.append("<label>LockObjectsOnCheckout</label>");
		preferencesPageLayout.append("<uitype>" + CHECK_BOX + "</uitype>");
		preferencesPageLayout.append("</preference>");

		//Preference - MCADInteg-WarnForFileOverwrite
		preferencesPageLayout.append("<preference name=\"" + util.getActualNameForAEFData(context, "attribute_MCADInteg-WarnForFileOverwrite") + "\">");
		preferencesPageLayout.append("<label>WarnForFileOverwrite</label>");
		preferencesPageLayout.append("<uitype>" + CHECK_BOX + "</uitype>");
		preferencesPageLayout.append("</preference>");

		//Preference - MCADInteg-CheckOutDirectory
		preferencesPageLayout.append("<preference name=\"" + util.getActualNameForAEFData(context, "attribute_MCADInteg-CheckOutDirectory") + "\">");
		preferencesPageLayout.append("<label>DefaultCheckoutDirectory</label>");
		preferencesPageLayout.append("<uitype>" + POPUP_LIST + "</uitype>");
		preferencesPageLayout.append("</preference>");

		preferencesPageLayout.append("</category>");
		//Category "Checkout" ends

		preferencesPageLayout.append("</preferences>");
		
		return preferencesPageLayout.toString();
	}
}


