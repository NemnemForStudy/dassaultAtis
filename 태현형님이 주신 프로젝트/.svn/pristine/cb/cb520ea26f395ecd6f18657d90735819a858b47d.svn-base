
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.TicketWrapper;
import matrix.util.StringList;

import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.client.fcs.FcsClient;
//import com.matrixone.fcs.common.Logger;
import com.matrixone.fcs.common.Resources;
import com.matrixone.fcs.http.HttpVcCheckout;
import com.matrixone.fcs.mcs.Checkin;
import com.matrixone.fcs.mcs.Checkout;
import com.matrixone.fcs.mcs.McsBase;
import com.matrixone.fcs.mcs.PreCheckin;
import com.matrixone.servlet.Framework;
import com.matrixone.apps.common.util.ImageConversionUtil;


public class enoDownloadPackageBase_mxJPO  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
    /** relationship "Document Holder". */
   public static final String RELATIONSHIP_DOCUMENT_HOLDER =
           PropertyUtil.getSchemaProperty("relationship_DocumentHolder");
    /** relationship "Company Documents". */
   public static final String RELATIONSHIP_COMPANY_DOCUMENTS =
           PropertyUtil.getSchemaProperty("relationship_CompanyDocuments");


   /** selects the person's Company name. */
   public static final String SELECT_COMPANY_DOCUMENT_HOLDER_ID =
           "to[" + DomainObject.RELATIONSHIP_EMPLOYEE + "].from.from["+ RELATIONSHIP_DOCUMENT_HOLDER +"].to.id";
   
   public static final String TYPE_DOCUMENTS = PropertyUtil.getSchemaProperty(DomainObject.SYMBOLIC_type_DOCUMENTS);
   
   /** "Active Version" relationship name*/
   public static final String RELATIONSHIP_ACTIVE_VERSION = PropertyUtil.getSchemaProperty(DomainObject.SYMBOLIC_relationship_ActiveVersion);
   /** "Active Version" relationship name*/
   public static final String RELATIONSHIP_LATEST_VERSION = PropertyUtil.getSchemaProperty(DomainObject.SYMBOLIC_relationship_LatestVersion);
   /** "Reference Document" relationship name*/
   public static final String RELATIONSHIP_REFERENCE_DOCUMENT = PropertyUtil.getSchemaProperty(DomainObject.SYMBOLIC_relationship_ReferenceDocument);
   /** The select of attribute "Checkin Reason". */
   public static final String SELECT_CHECKIN_REASON = DomainObject.getAttributeSelect(DomainObject.ATTRIBUTE_CHECKIN_REASON);
   /** The select of attribute "Title". */
   public static final String SELECT_TITLE =DomainObject. getAttributeSelect(DomainObject.ATTRIBUTE_TITLE);

   
   
   /**
    * Download Package.
    *
    * @param context The user context.
    * @param PartId The Part Id.
    * @param sSelectedFiles The srray of selected files for zipping.
    * @param selectedLevel The level for BOM.
    * @param downloadDate the date the download is done
    * @param errorPage the page to contain error
    * @param request The HttpRequest object.
    * @param response The HttpResponse object.
    * @throws Exception If the operation fails.
    * @since 10-6-HF6
    */
   public TicketWrapper getDownloadPackage (Context context,
                           String sPartId,
                           String[] sSelectedFiles,
                           String selectedLevel,
                           String downloadDate,
                           String errorPage,
                           HttpServletRequest request,
                           HttpServletResponse response)
   throws Exception
   {
       return getDownloadPackage(context,
                                 sPartId,
                                 sSelectedFiles,
                                 selectedLevel,
                                 downloadDate,
                                 errorPage,
                                 request,
                                 response,
                                 true);
   }

   public TicketWrapper getDownloadPackage(Context context, String[] args) throws Exception {
   	
                      
       try{
       	
    	   Map programMap = (HashMap) JPO.unpackArgs(args);
   	    
   	    String partId = (String)programMap.get("partId");	   
   	    String fileObjs[] = (String[])programMap.get("fileObjs");
   	    String selectedlevel = (String)programMap.get("selectedlevel");
   	    String strDownloadDateTime = (String)programMap.get("strDownloadDateTime");
   	    String errorPage = (String)programMap.get("errorPage");
   	    HttpServletRequest request = (HttpServletRequest)programMap.get("request");
   	    HttpServletResponse response = (HttpServletResponse)programMap.get("response");
   	    boolean bIncBOMStructure = (boolean) programMap.get("bIncBOMStructure");
   	  

   	    TicketWrapper ticketWrp = getDownloadPackage(context,partId,fileObjs,selectedlevel,strDownloadDateTime,errorPage,request,response, bIncBOMStructure);
			
			return ticketWrp;
			
		} catch (Exception e) {
			throw new FrameworkException(e);
		}		
   }
	
   /**
    * Download Package.
    *
    * @param context The user context.
    * @param PartId The Part Id.
    * @param sSelectedFiles The srray of selected files for zipping.
    * @param selectedLevel The level for BOM.
    * @param downloadDate the date the download is done
    * @param errorPage the page to contain error
    * @param request The HttpRequest object.
    * @param response The HttpResponse object.
    * @param includeStructurePath whether to include structure path for
    *        file(s) being downloaded.
    * @throws Exception If the operation fails.
    * @since 10-5
    */
   public TicketWrapper getDownloadPackage (Context context,
                           String sPartId,
                           String[] sSelectedFiles,
                           String selectedLevel,
                           String downloadDate,
                           String errorPage,
                           HttpServletRequest request,
                           HttpServletResponse response,
                           boolean includeStructurePath)
   throws Exception
   {
	   
	     
       String fileObjs[] = sSelectedFiles;
       boolean isWindows = ImageConversionUtil.isWindows();
       String wsdirectory = null;
       String directory = null;
       char cFieldSep = 0x09;
   		String delimiter = String.valueOf(cFieldSep);
       Vector vSummaryDetails = new Vector();
       Vector vBoids = new Vector();
       Vector vFileNames = new Vector();
       Vector vFileformats = new Vector();
       Vector vFilepath    =   new Vector();
       Vector vLocks =  new Vector();
       Vector vIndex = new Vector();
       Vector vVersions = new Vector();

       String outputFolder = null;
       String packageFileName = null;
       String BOMFileName = null;

       String sGenericFormat = DomainObject.FORMAT_GENERIC;
       TicketWrapper ticket = null;

       try
       {
           StringList partSelects = new StringList(5);
           partSelects.add(DomainObject.SELECT_NAME);
           partSelects.add(DomainObject.SELECT_TYPE);
           partSelects.add(DomainObject.SELECT_REVISION);
           partSelects.add(DomainObject.SELECT_CURRENT);
           partSelects.add(DomainObject.SELECT_DESCRIPTION);

           DomainObject part = new DomainObject(sPartId);
           Map partMap = part.getInfo(context, partSelects);

           //step 1 - Getting Part Name to form a top level directory with that name + add each info into vectors avout the selected files
           String  partName    =   (String)partMap.get(DomainObject.SELECT_NAME);
   			//Added for fix 372917
           if (partName.indexOf("/")!=-1)
           {
               partName = com.matrixone.jsystem.util.StringUtils.replaceAll(partName,"/","-");
           }
   		//fix 372917 ends
           String  partType    =   (String)partMap.get(DomainObject.SELECT_TYPE);
           String  partRev     =   (String)partMap.get(DomainObject.SELECT_REVISION);

           //Create a user workspace and append the user workspace directory with partname,specification level,specification name******************
           wsdirectory = context.createWorkspace();
           directory =   wsdirectory + java.io.File.separator + partName;
           java.io.File dir = new java.io.File(directory);
           //Create Dir on Server
           dir.mkdirs();

           if(fileObjs != null)
           {
               for(int i=0; i<fileObjs.length; i++)
               {
                   StringTokenizer fileTokens    =   new StringTokenizer(fileObjs[i],delimiter);
                   if(fileTokens.hasMoreTokens())
                   {
                       String insideZipDir = fileTokens.nextToken();
                       //Added for 372917
                       if (isWindows && insideZipDir.indexOf("/")!=-1)
                       {
                           insideZipDir = com.matrixone.jsystem.util.StringUtils.replaceAll(insideZipDir,"/","_");
                       }
                       //372917:end
                       String  objIds   =   fileTokens.nextToken();
                       String formats = fileTokens.nextToken();
                       String filenames   =   fileTokens.nextToken();
                       // Check for DSFA Data
                       String strVCIndex = fileTokens.hasMoreTokens() ? fileTokens.nextToken() : "";
                       String strVCVersion = fileTokens.hasMoreTokens() ? fileTokens.nextToken() : "";

                       StringTokenizer idTokens = new StringTokenizer(objIds, "|");
                       String parentEBOMId = null;
                       String specId = null;
                       if(idTokens.hasMoreTokens())
                       {
                           parentEBOMId   =   idTokens.nextToken();
                           specId    =   idTokens.nextToken();
                       }

                       String specDetails = parentEBOMId + "|" + specId + "|" + filenames;

                       if (strVCIndex.equals("1"))
                          filenames = "";
                       vSummaryDetails.addElement(specDetails);
                       vBoids.addElement(specId);
                       vFileNames.addElement(filenames);
                       vFileformats.addElement(formats);

                       //vFilepath.addElement(insideZipDir);
                       //Bug# 313382 - long file's path name
                       if((includeStructurePath) && (strVCIndex.equals("0")))
                       {
                           vFilepath.addElement(insideZipDir);
                       }
                       else if(strVCIndex.equals("0"))
                       {
                           //Use Part's TNR and Doc's TNR as file's path
                           String str1 = insideZipDir;
                           int docTNRIndex = str1.lastIndexOf(java.io.File.separator);
                           String docTNR = str1.substring(docTNRIndex + java.io.File.separator.length());
                           String str2 = str1.substring(0, docTNRIndex);
                           int partTNRIndex = str2.lastIndexOf((String)java.io.File.separator);
                           String partTNR = str2.substring(partTNRIndex + java.io.File.separator.length());
                           String strTemp = partTNR + java.io.File.separator + docTNR;
                           vFilepath.addElement(strTemp);
                       }
                       else
                       {
                           vFilepath.addElement("");
                       }

                       vLocks.addElement("false");
                       vIndex.addElement(strVCIndex);
                       vVersions.addElement(strVCVersion);
                   }
               }
           }
           //folder to store the excel sheets
           outputFolder = directory + java.io.File.separator;


           /*  Check if the company is connected to 'Report Holder' object.
                   If yes get 'Report Holder' and connect the above created Document object.
                   If no create 'Report Holder' and connect it to both company and Document.
           */
           //If Document is created and files checked in successfull
           com.matrixone.apps.common.Person person = (com.matrixone.apps.common.Person)Person.getPerson(context);
           StringList personSelects = new StringList(5);
           personSelects.add(Person.SELECT_COMPANY_ID);
           personSelects.add(Person.SELECT_COMPANY_NAME);
           personSelects.add(DomainObject.SELECT_NAME);
           personSelects.add(SELECT_COMPANY_DOCUMENT_HOLDER_ID);
           personSelects.add(DomainObject.SELECT_COMPANY_STORE);
           Map personMap = person.getInfo(context, personSelects);

           String store = (String)personMap.get(DomainObject.SELECT_COMPANY_STORE);
           //description: Reading the newly added property to know whether truncate the revision or not.
           boolean truncateRevision = (EnoviaResourceBundle.getProperty(context,"emxComponents.Package.TruncateRevision")).equalsIgnoreCase("true") ? true : false;
           //step2 create excel sheets for Package & EBOm + check them into document object
           if(fileObjs != null)
           {
               packageFileName = partName + "_PackageReport.csv";
               //Create the package file
               createPackageFile(context, partMap, personMap, downloadDate, vSummaryDetails, outputFolder, packageFileName, truncateRevision, request);

           } // end of if(fileObjs!=null)
           //excel sheet for EBOM : naming "PartName_BOM.xls"
           BOMFileName = partName + "_BOMReport.csv";
           createBOMFile(context, part, partMap, selectedLevel, downloadDate, outputFolder, BOMFileName, truncateRevision, request);

           ContextUtil.startTransaction(context, true);
           Map documentAndHolder = createDocumentAndCheckInFiles(context, personMap, partType + " " + partName + " " + partRev, sGenericFormat, outputFolder, packageFileName, BOMFileName);
           DomainObject docObj = (DomainObject) documentAndHolder.get(DomainConstants.TYPE_DOCUMENT);
           DomainObject reportHolder = (DomainObject) documentAndHolder.get(DomainConstants.TYPE_HOLDER);
           String docobjid = docObj.getInfo(context, DomainConstants.SELECT_ID);
           if(fileObjs != null)
           {
               //add doc obj path for package file
               vBoids.addElement(docobjid);
               vFileNames.addElement(packageFileName);
               vFileformats.addElement(sGenericFormat);
               vFilepath.addElement("");
               vLocks.addElement("false");
               vIndex.addElement("0");
               vVersions.addElement("0");
           }
           //add doc obj path for bom file
           vBoids.addElement(docobjid);
           vFileNames.addElement(BOMFileName);
           vFileformats.addElement(sGenericFormat);
           vFilepath.addElement("");
           vLocks.addElement("false");
           vIndex.addElement("0");
           vVersions.addElement("0");

           //code to check whether user enter the  P & T Archive Name and Workspace folder values or not
           boolean bFieldExists = false;
           CommonDocument PTArchiveObj = null;

           String sWorkspaceFolderId = request.getParameter("workspaceFolderId"); //get Workspace folder Id's
           String sPTArchiveName = request.getParameter("archiveName"); //get Package and Transfer Archive Name
           
           String docFileName = "";
           //code to test whether WorkspaceFolder and Package & Transfer Archive Name are null or not
           if(sWorkspaceFolderId !=null && !sWorkspaceFolderId.equals("null") && !sWorkspaceFolderId.equals("") && sPTArchiveName !=null && !sPTArchiveName.equals("null") && !sPTArchiveName.equals(""))
           {
           	if(fileObjs != null)
               {
           		docFileName = sPTArchiveName + ".zip";
               }else{
               	docFileName = BOMFileName;
               }
               bFieldExists = true;
               PTArchiveObj = (CommonDocument)DomainObject.newInstance(context,DomainConstants.TYPE_PT_ARCHIVE);
               MqlUtil.mqlCommand(context,"history off;", true);
               StringBuffer historyItemValue = new StringBuffer(5000);
               historyItemValue.append("create from:").append(partType).append(" ").append(partName).append(" ").append(partRev).append(" # Levels:").append(selectedLevel);
               try {
               	PTArchiveObj.createAndConnect(context, DomainObject.TYPE_PT_ARCHIVE, sPTArchiveName,
                                                       (String)null, DomainConstants.POLICY_DOCUMENT, historyItemValue.toString(),
                                                       context.getVault().getName(), docFileName, (String)null,
                                                       reportHolder, RELATIONSHIP_COMPANY_DOCUMENTS, "true", (Map)null);
               } finally {
               	MqlUtil.mqlCommand(context,"history on;", true);
               }

               String shistory = "modify businessobject $1 add history $2 comment $3 ;" ;
               MqlUtil.mqlCommand(context,shistory,  PTArchiveObj.getObjectId(context), "Create", historyItemValue.toString());

               StringTokenizer  st  = new StringTokenizer(sWorkspaceFolderId,";");
               String  folderId ="";
               while (st.hasMoreTokens())
               {
                    folderId = st.nextToken();
                    DomainObject domFolderObj = DomainObject.newInstance(context, folderId);
                    //Connecting Package & Transfer Object to Workspace folder Object
                    PTArchiveObj.connect(context, DomainObject.RELATIONSHIP_VAULTED_OBJECTS, domFolderObj, true);
               }
               
          	 
                  PTArchiveObj.createVersion(context, historyItemValue.toString(), docFileName, new HashMap());
            }//end if
           //End Feature
           ContextUtil.commitTransaction(context);

           int boidSize = vBoids.size();
           String zipFileName = "";
           if(bFieldExists)
           {
               zipFileName = sPTArchiveName + ".zip";
               StringList selectList = new StringList(4);
               selectList.add(CommonDocument.SELECT_DEFAULT_FORMAT);
               selectList.add(CommonDocument.SELECT_STORE);
               Map ptaMap = PTArchiveObj.getInfo(context, selectList);
               String format = (String)ptaMap.get(CommonDocument.SELECT_DEFAULT_FORMAT);
               if ( store == null || "".equals(store) )
               {
                   store = (String)ptaMap.get(CommonDocument.SELECT_STORE);
               } else {
                   store = PropertyUtil.getSchemaProperty(context,store);
               }
               ArrayList list = new ArrayList();
               for (int n=0; n<boidSize; n++){
                   list.add(new matrix.db.BusinessObjectProxy((String)vBoids.elementAt(n), (String)vFileformats.elementAt(n),(String)vFileNames.elementAt(n), (String)vFilepath.elementAt(n), false, false));
               }

               boolean zipOutput = true;
               String webAppName = Framework.getFullClientSideURL(request,response,"");

               ticket = Checkout.doIt(context, zipOutput, docFileName, webAppName, list);
               String checkoutTicketStr = ticket.getExportString();


               ArrayList boids = new ArrayList();
               matrix.db.BusinessObjectProxy bproxy = new matrix.db.BusinessObjectProxy(PTArchiveObj.getObjectId(context),
                                                                     format, docFileName, true, false);//_append,//_unlock)
               boids.add(bproxy);
               ticket = PreCheckin.doIt(context, store, webAppName, boids.size());
               String checkinTicketStr = ticket.getExportString();

               // We need to modify the URL for our new verb
               String query = Resources.setAction(ticket.getActionURL(),FcsClient.CHECKOUT_AND_CHECKIN_ACTION);

               URL url = new URL(query);
               HttpURLConnection uc=(HttpURLConnection)url.openConnection();
               uc.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
               uc.setDoOutput(true);
               uc.setDoInput(true);
               uc.setUseCaches(false);
               uc.setRequestProperty("Accept-Language","en-us");
               uc.setRequestMethod("POST");
               uc.connect();
               OutputStream out = uc.getOutputStream();
               //String params = McsBase.resolveFcsParam("checkinTicket") + "=" + com.matrixone.apps.domain.util.XSSUtil.encodeForURL(checkinTicketStr);
               //params += "&" + McsBase.resolveFcsParam("checkoutTicket") + "=" + com.matrixone.apps.domain.util.XSSUtil.encodeForURL(checkoutTicketStr);
               String params = McsBase.resolveFcsParam("checkinTicket") + "=" + com.matrixone.apps.domain.util.XSSUtil.encodeForURL(checkinTicketStr);
               params += "&" + McsBase.resolveFcsParam("checkoutTicket") + "=" + com.matrixone.apps.domain.util.XSSUtil.encodeForURL(checkoutTicketStr);

               out.write((params + "\r\n").getBytes());

               if( uc.getResponseCode() != HttpURLConnection.HTTP_OK )
               {
                   String languageStr = context.getSession().getLanguage();
                   String message = ComponentsUtil.i18nStringNow("emxComponents.Part.Requestfailed", languageStr);
                   throw new Exception(message);
               }
               BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream()));
               StringBuffer sb = new StringBuffer();
               String line;
               while((line = in.readLine()) != null)
               {
                   sb.append(line);
               }
               in.close();
              // Logger.log("Got: " + sb.toString());
               // now complete the checkin
               Checkin.doIt(context, sb.toString(), store, boids);

               String[] stboids = new String[boidSize];
               String[] stfileNames = new String[boidSize];
               String[] stfileformats = new String[boidSize];
               String[] stfilepath = new String[boidSize];
               String[] stlocks = new String[boidSize];
               String[] stversions = new String[boidSize];
               long[] lgindex = new long[boidSize];

               String strIndex = "";
               Long longIndex;
               for (int n=0; n<boidSize; n++){
                   stboids[n] = (String)vBoids.elementAt(n);
                   stfileNames[n] = (String)vFileNames.elementAt(n);
                   stfileformats[n] = (String)vFileformats.elementAt(n);
                   stfilepath[n] = (String)vFilepath.elementAt(n);
                   stlocks[n] = (String)vLocks.elementAt(n);
                   stversions[n] = (String)vVersions.elementAt(n);
                   strIndex = (String)vIndex.elementAt(n);
                   if ((strIndex == null) || (strIndex.equals("")))
                     strIndex = "0";
                   longIndex = new Long(strIndex);
                   lgindex[n] = longIndex.longValue();
               }
               //Create the zip file
               //ticket = HttpCheckout.doIt(context,stboids,stfileNames,stfileformats,stlocks,stfilepath,true,zipFileName,errorPage,request,response);
               ticket = HttpVcCheckout.doIt(context,stboids,stfileNames,stfileformats,stlocks,lgindex,stversions,stfilepath,true,zipFileName,errorPage,request,response);
           }
           else
           {
               zipFileName = partName+"_"+partRev+".zip";
               String[] stboids = new String[boidSize];
               String[] stfileNames = new String[boidSize];
               String[] stfileformats = new String[boidSize];
               String[] stfilepath = new String[boidSize];
               String[] stlocks = new String[boidSize];
               String[] stversions = new String[boidSize];
               long[] lgindex = new long[boidSize];

               String strIndex = "";
               Long longIndex;
               for (int n=0; n<boidSize; n++){
                   stboids[n] = (String)vBoids.elementAt(n);
                   stfileNames[n] = (String)vFileNames.elementAt(n);
                   stfileformats[n] = (String)vFileformats.elementAt(n);
                   stfilepath[n] = (String)vFilepath.elementAt(n);
                   stlocks[n] = (String)vLocks.elementAt(n);
                   stversions[n] = (String)vVersions.elementAt(n);
                   strIndex = (String)vIndex.elementAt(n);
                   if ((strIndex == null) || (strIndex.equals("")))
                      strIndex = "0";
                   longIndex = new Long(strIndex);
                   lgindex[n] = longIndex.longValue();
               }

               //Create the zip file
               //ticket = HttpCheckout.doIt(context,stboids,stfileNames,stfileformats,stlocks,stfilepath,true,zipFileName,errorPage,request,response);
               ticket = HttpVcCheckout.doIt(context,stboids,stfileNames,stfileformats,stlocks,lgindex,stversions,stfilepath,true,zipFileName,errorPage,request,response);
           }
       }catch(Exception e) {
          //COMES HERE WHEN ANY OPERATION HAS FAILED.
          ContextUtil.abortTransaction(context);
          throw new FrameworkException(e);
       }
       finally {
           // Fix Bug #341117 The temp file cleanup should also happen if there is any exception
           //Delete all the temporary files and directories created in workspace
           java.io.File fileToDelete = null;

           if (outputFolder != null) {
               if (packageFileName != null) {
                   fileToDelete = new java.io.File(outputFolder + packageFileName);
                   if (fileToDelete.exists() && !fileToDelete.delete()) {
                       fileToDelete.deleteOnExit();
                   }
               }

               if (BOMFileName != null) {
                   fileToDelete = new java.io.File(outputFolder + BOMFileName);
                   if (fileToDelete.exists() && !fileToDelete.delete()) {
                       fileToDelete.deleteOnExit();
                   }
               }
           }

           if (directory != null) {
               fileToDelete = new java.io.File(directory);
               if (fileToDelete.exists() && !fileToDelete.delete()) {
                   fileToDelete.deleteOnExit();
               }
           }

           if (wsdirectory != null) {
               fileToDelete = new java.io.File(wsdirectory);
               if (fileToDelete.exists() && !fileToDelete.delete()) {
                   fileToDelete.deleteOnExit();
               }
           }
       }
       return (ticket);
   }


private void createPackageFile(Context context, Map partMap, Map personMap, String downloadDate, Vector vSummaryDetails, String outputFolder, String packageFileName, boolean truncateRevision, HttpServletRequest request) throws Exception {
    StringBuffer buf = new StringBuffer();

    //excel sheet for package : naming "PartName_Package.xls"

    StringBuffer strPackgeBuffer = new StringBuffer(5000);
    // To read String value for CompanyName & LoginUser(that gets displayed in csv file) from property file
    //String CompanyName = (String)EnoviaResourceBundle.getProperty(context,"emxComponents.Package.CompanyName");
   // String LoginUser = (String)EnoviaResourceBundle.getProperty(context,"emxComponents.Package.LoginUser");
    
    Locale localeStr = context.getLocale();

    String strSummaryReport = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.SummaryReport");        
    String strType = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxComponents.Common.Type");
    String strAssemblyNumber = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.AssemblyNo");
    String strRevision = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxComponents.Common.Rev");
    String strState = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxComponents.Common.State");
    String strDescription = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxComponents.Common.Description");
    String strCompanyName = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxComponents.Form.Label.CompanyName");
    String strDownLoadedOn = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.downloadedOn");
    String strResult = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.result");
    String strSucess = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.sucess");
    String strFileName = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.FileName");
    String strAssociatedObj = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.AssociatedObj");
    String strPartName = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.PartName");
    String strLoginUser = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.PartRev");
    
    strPackgeBuffer.append(strSummaryReport).append("\n");
    strPackgeBuffer.append(strType).append(",").append(strAssemblyNumber).append(",").append(strRevision).append("\n");
    strPackgeBuffer.append(partMap.get(DomainObject.SELECT_TYPE)).append(",").append("=\"").append(partMap.get(DomainObject.SELECT_NAME)).append("\"").append(",");
    String partRev = (String)partMap.get(DomainObject.SELECT_REVISION);
    //description: Displaying the revision based on property setting.
    if(truncateRevision)
    {
       strPackgeBuffer.append(partRev).append("\n");
    } else {
       strPackgeBuffer.append("'").append(partRev).append("'\n");
    }
    strPackgeBuffer.append(strState).append(",").append(partMap.get(DomainObject.SELECT_CURRENT)).append("\n");
    strPackgeBuffer.append(strDescription).append(",\"").append(partMap.get(DomainObject.SELECT_DESCRIPTION)).append("\"\n\n");
    strPackgeBuffer.append(strCompanyName).append(",\"").append(personMap.get(Person.SELECT_COMPANY_NAME)).append("\"\n");
    strPackgeBuffer.append(strLoginUser).append(",\"").append(personMap.get(DomainConstants.SELECT_NAME)).append("\"\n");
    strPackgeBuffer.append(strDownLoadedOn).append(",\"").append(downloadDate).append("\"\n");
    strPackgeBuffer.append(strResult).append(",").append(strSucess).append("\n\n");
    strPackgeBuffer.append(strFileName).append(",").append(strDescription).append(",").append(strAssociatedObj).append(",").append(strPartName).append(",").append(strRevision).append("\n");

    for(int i=0; i< vSummaryDetails.size(); i++)
    {
        String strTempCheck = (String)vSummaryDetails.elementAt(i);
        if(strTempCheck != null)
        {
            StringTokenizer strToken = new StringTokenizer(strTempCheck, "|");
            if(strToken.hasMoreTokens())
            {
                String strEbomId = strToken.nextToken(); //get ebom obj id
                String strSpecId = strToken.nextToken(); //get spec id
                String fileName = strToken.nextToken(); //get file name

                StringList selectList = new StringList(2);
                selectList.add(DomainConstants.SELECT_NAME);
                selectList.add(DomainConstants.SELECT_REVISION);

                //get ebom obj details
                DomainObject ebompackObj = DomainObject.newInstance(context);
                ebompackObj.setId(strEbomId);
                Map ebomMap = ebompackObj.getInfo(context, selectList);
                String ebompackObjname = (String)ebomMap.get(DomainConstants.SELECT_NAME);
                String ebompackObjrev = (String)ebomMap.get(DomainConstants.SELECT_REVISION);

                //get spec obj details
                DomainObject spec = DomainObject.newInstance(context);
                spec.setId(strSpecId);
                Map specMap = spec.getInfo(context, selectList);
                String specName = (String)specMap.get(DomainConstants.SELECT_NAME);

                MapList versionList = spec.getRelatedObjects(context,
                                                                RELATIONSHIP_ACTIVE_VERSION,
                                                                TYPE_DOCUMENTS,
                                                                new StringList(SELECT_CHECKIN_REASON),
                                                                null,
                                                                false,
                                                                true,
                                                                (short)1,
                                                                SELECT_TITLE + " == \"" + fileName + "\"",
                                                                null);

                Iterator itr = versionList.iterator();
                String fileDescription = "";
                /* we don't need a while loop because with where clause
                    we will get only one version object as a return
                */
                if(itr.hasNext())
                {
                    Map versionMap = (Map)itr.next();
                    fileDescription = (String)versionMap.get(SELECT_CHECKIN_REASON);
                }

                strPackgeBuffer.append("\"").append(fileName).append("\",\"").append(fileDescription).append("\",").append(specName).append(",");
                strPackgeBuffer.append("=\"").append(ebompackObjname).append("\"").append(",");
                //description: Displaying the revision based on property setting.
                if(truncateRevision) {
                    strPackgeBuffer.append(ebompackObjrev).append("\n");
                } else {
                    strPackgeBuffer.append("'").append(ebompackObjrev).append("'\n");
                }
            }// end of if(strToken.hasMoreTokens())
        }//end of if(strTempCheck != null)
    }//end of for(int i=1)
    String fileEncoding = com.matrixone.apps.framework.ui.UINavigatorUtil.getFileEncoding(context, request);
    java.io.RandomAccessFile packageReportFileAccess = new java.io.RandomAccessFile(outputFolder + packageFileName, "rw");
    packageReportFileAccess.write(strPackgeBuffer.toString().getBytes(fileEncoding));
    packageReportFileAccess.close();
}


/**
 * Creates the part BOM info and stores in outputFoler specified.
 * @param context
 * @param part
 * @param partMap
 * @param selectedLevel
 * @param downloadDate
 * @param outputFolder
 * @param bomFileName
 * @param truncateRevision
 * @throws Exception
 */
private void createBOMFile(Context context, DomainObject part, Map partMap, String selectedLevel, String downloadDate, String outputFolder, String bomFileName, boolean truncateRevision, HttpServletRequest request) throws Exception {
	
    StringList selectStmts = new StringList(6);
    selectStmts.addElement(DomainObject.SELECT_ID);
    selectStmts.addElement(DomainObject.SELECT_TYPE);
    selectStmts.addElement(DomainObject.SELECT_NAME);
    selectStmts.addElement(DomainObject.SELECT_REVISION);
    selectStmts.addElement(DomainObject.SELECT_DESCRIPTION);
    selectStmts.addElement(DomainObject.SELECT_ATTRIBUTE_UNITOFMEASURE);
    selectStmts.addElement("from["+DomainConstants.POLICY_MANUFACTURER_EQUIVALENT+"].to.name");

    StringList selectRelStmts = new StringList(5);
    selectRelStmts.addElement(DomainObject.SELECT_ATTRIBUTE_QUANTITY);
    selectRelStmts.addElement(DomainObject.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR);
    selectRelStmts.addElement(DomainObject.SELECT_FIND_NUMBER);

    Short SLevel = new Short(selectedLevel);
    short sPLevel = SLevel.shortValue();

    MapList ebomList = part.getRelatedObjects(context,DomainRelationship.RELATIONSHIP_EBOM,
                                                DomainObject.TYPE_PART, selectStmts,
                                                selectRelStmts, false, true, sPLevel, "", "");

    StringBuffer strBOMBuffer = new StringBuffer(5000);
    //Modified for    IR-070088V6R2012x starts
    String allocStatus="";
    String allocPref="";
    String strPartUOM="";
    Locale localeStr=context.getLocale();
    String strLevel=EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxEngineeringCentral.Common.Level");
    String strFindNumber=EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.FindNum");
    String strQuantity=EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.Quantity");
    String strRefDesignator=EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.RefDesignator");
    String strItem=EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.Item");
    String strUOM=EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxEngineeringCentral.Part.UOM");
    String strMPN=EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.MPN");
    String strManufacturer=EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.Manufacturer");
    String strStatus=EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", localeStr, "emxFramework.Attribute.Location_Status");
    String strPreference=EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", localeStr, "emxFramework.Attribute.Location_Preference");
    String strLocation=EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxEngineeringCentral.Common.Location");
    
    String strType = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxComponents.Common.Type");
    String strAssemblyNumber = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxBOMManagement.DownloadPackage.AssemblyNo");
    String strRevision = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxComponents.Common.Rev");
    String strDescription = EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", localeStr, "emxComponents.Common.Description");
      
    
    strBOMBuffer.append(strType).append(",").append(strAssemblyNumber)
			.append(",").append(strRevision).append("\n");
    //Modified for    IR-070088V6R2012x ends
    strBOMBuffer.append(partMap.get(DomainObject.SELECT_TYPE)).append(",").append("=\"").append(partMap.get(DomainObject.SELECT_NAME)).append("\"").append(",");
    //description: Displaying the revision based on property setting.
    if(truncateRevision) {
       strBOMBuffer.append(partMap.get(DomainObject.SELECT_REVISION)).append("\n");
    } else {
       strBOMBuffer.append("'").append(partMap.get(DomainObject.SELECT_REVISION)).append("'\n");
    }
    //Modified for    IR-070088V6R2012x
	strBOMBuffer.append(strLevel).append(",").append(strFindNumber).append(
			",").append(strQuantity).append(",").append(strRefDesignator)
			.append(",").append(strItem).append(",").append(strRevision)
			.append(",").append(strDescription).append(",").append(strUOM)
			.append(",").append(strMPN).append(",").append(strManufacturer)
			.append(",").append(strLocation).append(",").append(strStatus)
			.append(",").append(strPreference).append("\n");
    Iterator ebomItr = ebomList.iterator();

    while (ebomItr.hasNext())
    {
        Map ebommap = (Map) ebomItr.next();

        strBOMBuffer.append(ebommap.get("level")).append(",\"").append(ebommap.get(DomainConstants.SELECT_FIND_NUMBER)).append("\",");
        strBOMBuffer.append(ebommap.get(DomainConstants.SELECT_ATTRIBUTE_QUANTITY)).append(",\"");
        strBOMBuffer.append(ebommap.get(DomainConstants.SELECT_ATTRIBUTE_REFERENCE_DESIGNATOR)).append("\",");
        strBOMBuffer.append("=\"").append(ebommap.get(DomainConstants.SELECT_NAME)).append("\"").append(",");
        //description: Displaying the revision based on property setting.
        if(truncateRevision) {
            strBOMBuffer.append(ebommap.get(DomainConstants.SELECT_REVISION)).append(",");
        } else {
            strBOMBuffer.append("'").append(ebommap.get(DomainConstants.SELECT_REVISION)).append("',");
        }
        //Start : Modified for Mx336041
        //strBOMBuffer.append("\"").append(ebommap.get(DomainConstants.SELECT_DESCRIPTION)).append("\",");
        String description = (String)ebommap.get(DomainConstants.SELECT_DESCRIPTION);
        description = FrameworkUtil.findAndReplace(description,"\"","\"\"");
        strBOMBuffer.append("=\"").append(description).append("\",");
        //End : Mx336041
        //Modified for    IR-070088V6R2012x starts
        strPartUOM = (String) ebommap.get(DomainObject.SELECT_ATTRIBUTE_UNITOFMEASURE);
  	    strPartUOM = strPartUOM.replace(' ','_');
  	    strPartUOM = "emxFramework.Range.Unit_of_Measure."+strPartUOM;
  	    strPartUOM = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", localeStr, strPartUOM);
        strBOMBuffer.append(strPartUOM).append(",");
        //Modified for    IR-070088V6R2012x starts
        /* code to get  MEPs and Manufacturers */
        DomainObject partObj = DomainObject.newInstance(context, (String)ebommap.get(DomainConstants.SELECT_ID));

        String mepOrgNameSelect = "relationship["+DomainObject.RELATIONSHIP_MANUFACTURING_RESPONSIBILITY+"].from.name";
        //Added for    IR-070088V6R2012x starts
        String strLocPreference = "relationship["+DomainConstants.RELATIONSHIP_ALLOCATION_RESPONSIBILITY+"].attribute["+DomainConstants.ATTRIBUTE_LOCATION_PREFERENCE+"].value";
        String strLocStatus = "relationship["+DomainConstants.RELATIONSHIP_ALLOCATION_RESPONSIBILITY+"].attribute["+DomainConstants.ATTRIBUTE_LOCATION_STATUS+"].value";
        String strLocName = "relationship["+DomainConstants.RELATIONSHIP_ALLOCATION_RESPONSIBILITY+"].from.name";
        //Added for    IR-070088V6R2012x ends
        StringList mepsSelectables = new StringList(4);
        mepsSelectables.addElement(DomainConstants.SELECT_ID);
        mepsSelectables.addElement(DomainConstants.SELECT_TYPE);
        mepsSelectables.addElement(DomainConstants.SELECT_NAME);
        mepsSelectables.addElement(mepOrgNameSelect);
        //Added for    IR-070088V6R2012x starts
        mepsSelectables.addElement(strLocName);
        mepsSelectables.addElement(strLocStatus);
        mepsSelectables.addElement(strLocPreference);
        //Added for    IR-070088V6R2012x ends

        StringList mepsRelSelectables = new StringList(1);
        mepsRelSelectables.addElement(DomainConstants.SELECT_RELATIONSHIP_NAME);

        StringBuffer sbRelPattern = new StringBuffer(DomainConstants.RELATIONSHIP_LOCATION_EQUIVALENT);
        sbRelPattern.append(",").append(DomainConstants.RELATIONSHIP_MANUFACTURER_EQUIVALENT);

        StringBuffer sbTypePattern = new StringBuffer(DomainConstants.TYPE_LOCATION_EQUIVALENT_OBJECT);
        sbTypePattern.append(",").append(DomainConstants.TYPE_PART).append(",");

        //fetching list of related MEPs via location Equivalent Object
        MapList listMEPs =new MapList();
        if(ebommap.containsKey("from["+DomainConstants.POLICY_MANUFACTURER_EQUIVALENT+"].to.name"))
        	listMEPs = partObj.getRelatedObjects(context,
                                                     sbRelPattern.toString() ,              // relationship pattern
                                                     sbTypePattern.toString(),              // object pattern
                                                     mepsSelectables,                 // object selects
                                                     mepsRelSelectables,              // relationship selects
                                                     false,                        // to direction
                                                     true,                       // from direction
                                                     (short) 2,                   // recursion level
                                                     null,                        // object where clause
                                                     null);                        // relationship where clause
        //to hold ids of MEP connected to EP
        Vector vecMepId = new Vector();
        Vector vecMepNames = new Vector();
        Vector vecMepOrgNames = new Vector();
        //Added for    IR-070088V6R2012x starts
        Vector vecMepLocPreferences=new Vector();
        Vector vecMepLocStatus=new Vector();
        Vector vecMepLocNames=new Vector();
        //Added for    IR-070088V6R2012x ends

        //to hold relIds with which MEPs are connected to EP
        // will hold Location Equiv rel id if MEP is Location Context
        // will hold Manufacturer Equiv rel id if MEP is Corporate Context

        //Iterating to Location Context MEP list to load MEP Ids and rel Ids
        for(int j=0; j<listMEPs.size(); j++)
        {
           Map mep = (Map)listMEPs.get(j);
           String relName = (String)mep.get(DomainConstants.SELECT_RELATIONSHIP_NAME);
           //Checking for level in resultlist: level 1 will have relationship id level , 2 will have mep object id
           // Adding id of MEP  and relationship id for type Location Equivalent
           if("2".equals((String)mep.get("level")) || relName.equals(DomainConstants.RELATIONSHIP_MANUFACTURER_EQUIVALENT)) {
                vecMepId.addElement(mep.get(DomainConstants.SELECT_ID));
                vecMepNames.addElement(mep.get(DomainConstants.SELECT_NAME));
                vecMepOrgNames.addElement(mep.get(mepOrgNameSelect));
        //Added for    IR-070088V6R2012x starts
                vecMepLocNames.addElement(mep.get(strLocName));
                vecMepLocStatus.addElement(mep.get(strLocStatus));
                vecMepLocPreferences.addElement(mep.get(strLocPreference));
        //Added for    IR-070088V6R2012x ends
           }
        }// end of for (listCorpMEPs)

        if(vecMepId.size() == 0) {
           strBOMBuffer.append(",\n");
        } else {

            strBOMBuffer.append("\"").append(vecMepNames.elementAt(0)).append("\",\"");
            //Modified for    IR-070088V6R2012x starts
            strBOMBuffer.append(vecMepOrgNames.elementAt(0)+"\",\"");
            String locName = (String) vecMepLocNames.elementAt(0);
            if(UIUtil.isNullOrEmpty(locName))
            	locName = "";
            strBOMBuffer.append(locName+"\",\"");
			allocStatus=(String)vecMepLocStatus.elementAt(0);
			if(UIUtil.isNotNullAndNotEmpty(allocStatus)){
				allocStatus = allocStatus.replace(' ','_');
                allocStatus = "emxFramework.Range.Location_Status."+ allocStatus;
                allocStatus = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",localeStr, allocStatus);
			}
			else
				allocStatus="";
            strBOMBuffer.append(allocStatus+"\",\"");
			allocPref = (String)vecMepLocPreferences.elementAt(0);
			if(UIUtil.isNotNullAndNotEmpty(allocPref)){
				allocPref = allocPref.replace(' ','_');
                allocPref = "emxFramework.Range.Location_Preference."+allocPref;
                allocPref = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",localeStr, allocPref);
			}
			else
				allocPref="";
            strBOMBuffer.append(allocPref+"\"\n");
            for(int k = 1; k < vecMepId.size(); k++)
            	{
                  strBOMBuffer.append(",,,,,,,,");
                  strBOMBuffer.append("\"").append(vecMepNames.elementAt(k)).append("\",\"");
                  strBOMBuffer.append(vecMepOrgNames.elementAt(k)+"\"").append(",\"");
                  strBOMBuffer.append(vecMepLocNames.elementAt(k)+"\"");
                  allocStatus=(String)vecMepLocStatus.elementAt(k);
                  if(UIUtil.isNotNullAndNotEmpty(allocStatus)){
                	  allocStatus = allocStatus.replace(' ','_');
                	  allocStatus = "emxFramework.Range.Location_Status."+ allocStatus;
                	  allocStatus = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",localeStr, allocStatus);
                  }
                  else
                	  allocStatus="";
                  strBOMBuffer.append(",\"").append(allocStatus+"\"");
                  allocPref = (String)vecMepLocPreferences.elementAt(k);
                  if(UIUtil.isNotNullAndNotEmpty(allocPref)){
                	  allocPref = allocPref.replace(' ','_');
                      allocPref = "emxFramework.Range.Location_Preference."+allocPref;
                      allocPref = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",localeStr, allocPref);
                  }
                  else
                	  allocPref="";
                  strBOMBuffer.append(",\"").append(allocPref+"\"\n");
            //Modified for    IR-070088V6R2012x ends
             }
           }
    }
    String fileEncoding = com.matrixone.apps.framework.ui.UINavigatorUtil.getFileEncoding(context, request);
    java.io.RandomAccessFile bomReportFileAccess = new java.io.RandomAccessFile(outputFolder + bomFileName, "rw");
    bomReportFileAccess.write(strBOMBuffer.toString().getBytes(fileEncoding));
    bomReportFileAccess.close();
}

/**
 *  Creates a document and connect it to the 'Report Holder' object and check in the files given.
 *  Check if the company is connected to 'Report Holder' object.
 *      If yes get 'Report Holder' and connect the above created Document object.
 *      If no create 'Report Holder' and connect it to both company and Document.
 *
 * @param context
 * @param personMap having info Person's Company Name, Company Id, Company Document Holder Id
 * @param docDesc description of the document
 * @param format format of the document e.g. generic
 * @param outputFolder location of the files (packageFileName, BOMFileName) to be checked in the the created document object
 * @param packageFileName name of the Package File, if it is null system will not check in this file.
 * @param BOMFileName name of the part BOM file name.
 * @return Map containing Document (TYPE_DOCUMENT) and Holder objects (TYPE_HOLDER).
 * @throws FrameworkException
 */
private Map createDocumentAndCheckInFiles(Context context, Map personMap, String docDesc, String format, String outputFolder, String packageFileName, String BOMFileName) throws FrameworkException
{
    try {
        String orgName = (String)personMap.get(Person.SELECT_COMPANY_NAME);
        String sOrgId = (String)personMap.get(Person.SELECT_COMPANY_ID);
        String reportHolderId = (String)personMap.get(SELECT_COMPANY_DOCUMENT_HOLDER_ID);
        DomainObject organization = DomainObject.newInstance(context, sOrgId);

        //Create the Document object and Check in the summary files to Document object.
        // Document Description and Tilte need to be given as generic text, applicable to all docs.

        /* pn4 : comment the below and added the below */	
        //docObj = docObj.create(context, DomainObject.TYPE_DOCUMENT, "", POLICY_DOCUMENT, docDesc, "Document Title", null);
        
        DomainObject docObj = DomainObject.newInstance(context,DomainConstants.TYPE_DOCUMENT);
        
       docObj.createObject(context,  DomainObject.TYPE_DOCUMENT, "", "",DomainConstants.POLICY_DOCUMENT,context.getVault().getName() );
              
        DomainObject reportHolder = DomainObject.newInstance(context, DomainObject.TYPE_HOLDER);
       
        if(reportHolderId == null || reportHolderId.equals("")) {
            //No Holder object. create Holder object and connect it to Company
            reportHolder.createObject(context, DomainObject.TYPE_HOLDER, orgName +" Reports", "-", DomainConstants.POLICY_HOLDER, context.getVault().toString());
            reportHolder.connect(context, RELATIONSHIP_DOCUMENT_HOLDER, organization, true );
        } else {
            //Holder object already exists - Get the holder object.
            reportHolder = DomainObject.newInstance(context, reportHolderId);
        }

        //Connect Holder object to Document object
        docObj.connect(context, RELATIONSHIP_COMPANY_DOCUMENTS, reportHolder, true);

        if(packageFileName != null)
            docObj.checkinFile(context,true, true, null, format, packageFileName, outputFolder);
        docObj.checkinFile(context,true, true, null, format, BOMFileName, outputFolder);


        Map obj = new HashMap();
        obj.put(DomainConstants.TYPE_DOCUMENT, docObj);
        obj.put(DomainConstants.TYPE_HOLDER, reportHolder);
        return obj;
    } catch (Exception e) {
        throw new FrameworkException(e);
    }
}

}
