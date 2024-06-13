package com.dassault_systemes.enovia.uielements.ui;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.Date;

import com.dassault_systemes.enovia.uielements.Installer;
import com.dassault_systemes.enovia.uielements.InstallerException;
import com.dassault_systemes.enovia.uielements.util.Helper;
import com.dassault_systemes.enovia.uielements.util.Helper.UIElement;
import com.dassault_systemes.enovia.uielements.util.UIInstallerConstants;
import com.dassault_systemes.enovia.uielements.xml.Uielement;

import matrix.db.Context;

public class UIInstallerBase_mxJPO {
	protected static final String VERB_ON = "verb on";

	public UIInstallerBase_mxJPO(Context context, String[] args) throws InstallerException {
		super();
	}

	public Integer installUIElements(Context context, String[] args) throws InstallerException {
		try {
			File directory = new File(args[0]);
			Installer.logFile = new PrintStream(new FileOutputStream(directory + File.separator + "UIInstallation.log", false));
			if (args.length < 6) {
				String error = "ERROR : Minimum six \"MXAPPBUILD, MXAPPLICATION, MXVERSION, MXORGNAME, MXOLDVERSION, MXMODE\" arguments are required";
				Installer.logFile.println(error);
				throw new InstallerException(error);
			}
			StringBuilder sb = new StringBuilder("Parameters from tcl : ");
			for (int i = 0; i < args.length; i++) {
				sb.append(args[i]);
				if (i < args.length - 1) {
					sb.append(", ");
				}
			}
			Installer.logFile.println(sb.toString());
			Date d1 = new Date();
			Helper.mqlCommand(context, VERB_ON, Installer.logFile);
			Installer inst = new Installer();
			inst.initializeUIElements(context);

			// Capture required UIElements to install for HF
			Uielement elementsToInstall = inst.getUIElementsToInstall(context, args);
			String installMode = args[5];

			if ( (args.length - 1) > 5 ) {
				if ( args[6].equalsIgnoreCase( "YES" ) )
					args[6] = "true";
				else
					args[6] = "false";
			}		

			String installApplication = args[1];
			if (installMode.equalsIgnoreCase(UIInstallerConstants.SERVICE_PACK)) {
				String appVersion = "property[appVersion" + installApplication + "]";
				String featureVersion = "property[featureVersion" + installApplication + "]";
				String mqlReturn = Helper.mqlCommand(context, "print prog $1 select $2 $3", Installer.logFile, "eServiceSystemInformation.tcl",
						appVersion, featureVersion);
				if (!(mqlReturn.contains(appVersion) || mqlReturn.contains(featureVersion))) {
					installMode = UIInstallerConstants.FULL_BUILD;
					args[5] = UIInstallerConstants.FULL_BUILD;
				}
			}

			if (installMode.equalsIgnoreCase(UIInstallerConstants.SERVICE_PACK) && elementsToInstall == null) {
				Installer.logFile.println("INFO : Nothing to install for mode " + UIInstallerConstants.SERVICE_PACK);
				return 0;
			}
			Installer.logFile.println("INFO : UI Install start for mode " + installMode);
			for (UIElement element : Installer.orderPrefernces()) {
				try {
					StringBuffer xmlPath = new StringBuffer(directory.getCanonicalPath()).append(File.separator)
							.append(UIInstallerConstants.APP_INSTALL).append(File.separator).append(UIInstallerConstants.PROGRAMS)
							.append(File.separator).append(element.getUIElement());
					if (installMode.equalsIgnoreCase(UIInstallerConstants.FULL_BUILD)
							|| installMode.equalsIgnoreCase(UIInstallerConstants.SERVICE_PACK)) {
						xmlPath.append(UIInstallerConstants.XML);
					}
					else {
						xmlPath.append("_").append(installMode).append(UIInstallerConstants.XML);
					}
					File XmlFile = new File(xmlPath.toString());
					if (XmlFile.exists()) {
						if (!context.isTransactionActive()) {
							context.start(Boolean.TRUE);
						}
						try {
							inst.installAll(context, directory, XmlFile, args, element, elementsToInstall, Installer.logFile);
							context.commit();
						}
						catch (Exception e) {
							context.abort();
							throw new InstallerException(e);
						}
					}
					else {
						Installer.logFile.println("INFO :" + XmlFile.getCanonicalPath() + " does not exist.");
					}
				}
				catch (Exception e) {
					Installer.logFile.println("ERROR :" + e.getLocalizedMessage());
				}
			}
			Installer.logFile.println("INFO : UI Install complete");
			Date d2 = new Date();
			long diff = d2.getTime() - d1.getTime();
			long diffMinutes = (diff / 1000) / 60;
			long diffseconds = (diff / 1000) % 60;
			Installer.logFile.println("Installation Time :" + diffMinutes + " mins " + diffseconds + " secs");

			if (Installer.error) {
				Installer.logFile.format("%-10s %-20s\n", "WARNING:", "Installation finished with one or more WARNINGs.");
			}

			if (Installer.logFile != null) {
				Installer.logFile.close();
			}

			return 0;
		}
		catch (Exception e) {
			Installer.logFile.println("ERROR :" + e.getLocalizedMessage());
			return 1;
		}
		finally {
			Installer.logFile.close();
		}
	}

	public void genrateXMLForAllUIElements(Context context, String[] args) throws InstallerException {
		Installer inst = new Installer();
		inst.generateAllXML(args);
	}
}
