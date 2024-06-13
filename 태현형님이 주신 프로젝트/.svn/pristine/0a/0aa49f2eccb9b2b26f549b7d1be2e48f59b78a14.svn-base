/*
**   MSFUtilBase.java
**
**   Copyright (c) 1992-2020 Dassault Systemes.
**   All Rights Reserved.
**   This program contains proprietary and trade secret information of MatrixOne,
**   Inc.  Copyright notice is precautionary only
**   and does not evidence any actual or intended publication of such program
**
**  @quickReview 17:02:15 ACE2 FUN058788: ENOVIA_GOV_MSF_Support_Office365_Enchancements
**  @quickReview 12:04:16 AMA3 FUN058788: Custom_Attribute_Sync_Requirement
**  @quickReview 17:02:22 ACE2 IR-504290-3DEXPERIENCER2016x: Mandatory Project and Experiment mappings missing BusinessID
**  @quickReview 17:04:14 RP3 TSK3456847: ENOVIA_BAA_MSF_2017x_FD03_AdministrationOfAttributesForMicrosoftProjectIntegration
**  @quickReview 17:05:09 ACE2 IR-518568-3DEXPERIENCER2017x: Backport the changes related to filter attribute selection on 2016x and 2017x similar to 2015x 
* 
* 
*/

import matrix.db.Context;
import matrix.util.StringList;

import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;


public class MSFUtilBase_mxJPO {

	StringList ProjectSpecificAttrList = new StringList(new String[] {});
	StringList ExperimentSpecificAttrList = new StringList(new String[] {"PercentComplete", "ActualDuration", "ActualStart", "ActualFinish"});

	public MSFUtilBase_mxJPO (Context context, String[] args) throws Exception {}
	
	/**
	 * This method is executed if a specific method is not specified.
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args holds no arguments
	 * @return int
	 * @throws Exception if the operation fails
	 * @since AEF Rossini
	 */
	public int mxMain(Context context, String[] args)
			throws FrameworkException {
		if (!context.isConnected())
			throw new FrameworkException(ComponentsUtil.i18nStringNow("emxTeamCentral.Generic.NotSupportedOnDesktopClient", context.getLocale().getLanguage()));
		return 0;
	}

	// Check if user is administrator for SharePoint related tasks
	public Boolean IsUserAdmin(Context context, String[] args) throws Exception
	{
		return PersonUtil.hasAnyAssignment(context, "role_VPLMAdmin");
	}

	public String getInstalledProducts(Context context,String[] args)
	{
		String retVal = "command_IEFDesktopCollections;command_IEFDesktopMyLockedObjects;command_IEFDesktopRecentlyCheckInFiles;command_MsoiGeneralSearch;command_IEFDesktopTMCAllWorskpace;command_MsoiTMCFolders;";

		try {
			// Product names are not localized.
			String strCommand = "print prog $1 select property dump $2";

			String strOutput = MqlUtil.mqlCommand(context, strCommand,
					"eServiceSystemInformation.tcl", ",");

			if (strOutput.contains("appVersionLibraryCentral")) {
				retVal += "command_MsoiLibraryCentralMyLibraries;";
			}

			if (strOutput.contains("appVersionProgramCentral"))
				retVal += "command_MsoiPMCAllProjectsMyDesk;command_MsoiPMCFolders;command_MsoiWBSTasks;command_MsoiOpenWBSTasks;command_MsoiClosedWBSTasks;";
			if (strOutput.contains("appVersionProductLine"))
				retVal += "command_MsoiProductCentralMyBuilds;command_MsoiProductCentralMyProducts;";
			if (strOutput.contains("appVersionSupplierCentral"))
				retVal += "command_MsoiWBSTasks;command_MsoiOpenWBSTasks;command_MsoiClosedWBSTasks;";
			if (strOutput.contains("appVersionVariantConfiguration"))
				retVal += "command_MsoiProductCentralMyFeatures;";
			if (strOutput.contains("appVersionRequirementsManagement"))
				retVal += "command_MsoiProductCentralMyRequirements;command_MsoiProductCentralSubRequirements;";
			if (strOutput.contains("appVersionIntegrationFramework"))
				retVal += "command_MsoiProjectFolderContent;";
			if (strOutput.contains("appVersionX-BOMEngineering"))
				retVal += "command_MsoiMyParts;command_MsoiReferenceDocuments;command_MsoiSpecifications;command_MsoiEBOM;";
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return retVal;
	}

	@Deprecated
	public StringList GetTypeSpecificAttributeList(Context context, String[] args) { return null; }

	@Deprecated
	public StringList GetTypeSpecificAttributeListEx(String type) { return null; }
	
	@Deprecated
	public StringList GetExcludedAttributeMappings(String type) { return null; }

	@Deprecated
	public String GetTypeSpecificAttributeListWrapper(Context context, String[] args) { return null; }

	public boolean checkUserIsAdmin(Context context) {

		String accessUsers = "role_AdministrationManager,role_VPLMAdmin";

		boolean bUserAdmin = false;
		try {
			bUserAdmin = PersonUtil.hasAnyAssignment(context, accessUsers);
		} catch (FrameworkException e) {
			e.printStackTrace();
		}
		return bUserAdmin;
	}
}
