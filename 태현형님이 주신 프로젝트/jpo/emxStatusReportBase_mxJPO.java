/**
 * emxStatusReportBase.java
 *
 * Copyright (c) 2002-2020 Dassault Systemes.
 * All Rights Reserved
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;

import com.matrixone.apps.common.Issue;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.CacheUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.framework.ui.UITable;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;


/**
 * The <code>${CLASSNAME}</code> class represents the Status Report JPO
 * functionality for the DPM type.
 */
public class emxStatusReportBase_mxJPO {
	
	public emxStatusReportBase_mxJPO (Context context, String[] args) throws Exception {
		super();
	}
    
    /**
     * IssuesList for status report
     * @param context
     * @param args
     * @return MapList of Issue Object Info
     * @throws MatrixException
     */
	 @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getIssuesforStatus(Context context,String[] args) throws MatrixException {
    	MapList returnMap= new MapList();
    	try {
	    	 Map programMap = (Map) JPO.unpackArgs(args);
	         // For issue status bar
	         final String axisValueString =  (String) programMap.get("xValue"); // 
	         int axisValue = 0;    // Default values for all inclusion
	         // Default values for all inclusion
	         if (ProgramCentralUtil.isNotNullString(axisValueString))
	        	 axisValue = Integer.parseInt(axisValueString);
	            
	    	if(axisValue == 0) {
	    		returnMap= (MapList)CacheUtil.getCacheObject(context,"pendigIssuse");
	    	}
	    	if(axisValue == 1) {
	    		returnMap=(MapList)CacheUtil.getCacheObject(context,"overdueIssuse");
	    	}
	    	if(axisValue == 2  ) {
	    		returnMap=(MapList)CacheUtil.getCacheObject(context,"latestartIssuse");
	    	}
	    	if(axisValue == 3) {
	    		returnMap=(MapList)CacheUtil.getCacheObject(context,"completedIssuse");
	    	}
    	} catch (Exception ex) {
    		ex.printStackTrace();
    		throw new MatrixException(ex);
    	}
    	return returnMap;
    }
	 
	 
    /**
     * get Risk List for status report
     * @param context
     * @param args
     * @return MapList of Risk Object Info
     * @throws MatrixException
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getRiskforStatus(Context context,String[] args) throws MatrixException
    {
    	MapList returnMap= new MapList();
    	try {
    		  Map programMap        = (Map) JPO.unpackArgs(args);          
    		  final String xAxisValueString             =  (String) programMap.get("xValue"); // Impact
	          final String yAisValueString             =  (String) programMap.get("yValue"); // Probability
	          int xAxisValue = 0;    // Default values for all inclusion
	          int yAxisValue = 0;
	          // Default values for all inclusion
	          if (UIUtil.isNotNullAndNotEmpty(xAxisValueString))
	        	  xAxisValue = Integer.parseInt(xAxisValueString);
	
	          if (UIUtil.isNotNullAndNotEmpty(yAisValueString))
	        	  yAxisValue = Integer.parseInt(yAisValueString);
	            
	     
	          Map[][] aRisks =(Map[][]) CacheUtil.getCacheObject(context,"riskGridInfo");
	    	
	    	  returnMap=(MapList)aRisks[xAxisValue][yAxisValue].get("Risk Object List");
	    		
	    		 for (Iterator itrRiskInfo = returnMap.iterator(); itrRiskInfo.hasNext();) {
	                 Map riskInfo = (Map) itrRiskInfo.next();
	                 String riskId = (String) riskInfo.get(DomainConstants.SELECT_ID);
	                 DomainObject obj = DomainObject.newInstance(context, riskId);
	                 String isRisk = obj.getInfo(context, ProgramCentralConstants.SELECT_IS_RISK); 
	                 riskInfo.put(ProgramCentralConstants.SELECT_IS_RISK, isRisk);
	                 
	                 riskInfo.remove("level");
	                
	    		 }
	    	
	    	}
    	 catch (Exception ex) {
             ex.printStackTrace();
                     }
                
    	return returnMap;
    }
    
    
    /**
     * get Opportunity List for status report
     * @param context
     * @param args
     * @return MapList of Opportunity Object Info
     * @throws MatrixException
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getOpportunityforStatus(Context context,String[] args) throws MatrixException
    {
    	MapList returnMap= new MapList();
    	try {
    		  Map programMap        = (Map) JPO.unpackArgs(args);          
    		  final String xAxisValueString             =  (String) programMap.get("xValue"); // Impact
	          final String yAisValueString             =  (String) programMap.get("yValue"); // Probability
	          int xAxisValue = 0;    // Default values for all inclusion
	          int yAxisValue = 0;
	          // Default values for all inclusion
	          if (UIUtil.isNotNullAndNotEmpty(xAxisValueString))
	        	  xAxisValue = Integer.parseInt(xAxisValueString);
	
	          if (UIUtil.isNotNullAndNotEmpty(yAisValueString))
	        	  yAxisValue = Integer.parseInt(yAisValueString);
	            
	     
	          Map[][] opportunityMap =(Map[][]) CacheUtil.getCacheObject(context,"opportunityGridInfo");
	    	
	    	  returnMap=(MapList)opportunityMap[xAxisValue][yAxisValue].get("OpportunityObjectList");
	    	}
    	 catch (Exception ex) {
             ex.printStackTrace();
                     }
                
    	return returnMap;
    }
    
    
    /**
     *  forms PMCIssue Table columns dynamically
     * @param context
     * @param args
     * @return MapList of columns for PMCIssue table
     * @throws Exception
     */
    public MapList getIssuseDynamicColumns(Context context, String[] args) throws Exception{

    	MapList returnList = new MapList();
    	LinkedHashMap<String, Map> columnMap =new LinkedHashMap<>();
    	final String issueTableName = "IssueList";
    	
    	List columsToBeExculded = Arrays.asList("name2", "Edit","Separator2","Separator1","Separator3","QuickFile");
		Vector assignments = new Vector();
		assignments.add("all");
		MapList issueTableColumnMapList = UITable.getColumns(context, issueTableName, assignments);

		for (Iterator itrIssueListCols = issueTableColumnMapList.iterator(); itrIssueListCols.hasNext();) {

			Map mCol = (Map) itrIssueListCols.next();
			String sColName = (String)mCol.get("name");
			if(columsToBeExculded.contains(sColName)) {
				continue;
			} else if("Name".equals(sColName)) {
				((Map)(mCol.get("settings"))).put("Column Type", "programHTMLOutput");
                ((Map)(mCol.get("settings"))).put("function", "getIssueName");
                ((Map)(mCol.get("settings"))).put("program", "emxStatusReport");
                ((Map)(mCol.get("settings"))).put("Sort Program", "emxSortHTMLAlphaNumericBase");
                ((Map)(mCol.get("settings"))).put("RMB Menu", "false");
                ((Map)(mCol.get("settings"))).put("Sort Type", "other");
                mCol.put("sorttype", "other");
			} else if("ClassifiedItem".equals(sColName)) {
				((Map)(mCol.get("settings"))).put("function", "getReportedAgainst");
                ((Map)(mCol.get("settings"))).put("program", "emxStatusReport");
                ((Map)(mCol.get("settings"))).put("Width", "150");
                ((Map)(mCol.get("settings"))).put("RMB Menu", "false");
			}else if("State".equals(sColName)) {  // Added to relabel from State to Maturity
				mCol.put("label", "emxProgramCentral.Common.State");
				((Map)(mCol.get("settings"))).put("Registered Suite", "ProgramCentral");
			}else if("Slip Days".equals(sColName)) { // Added to replace status icon with Status text
				mCol.put("label", "emxProgramCentral.Common.Status");
				((Map)(mCol.get("settings"))).put("Registered Suite", "ProgramCentral");
			}
			columnMap.put(sColName, mCol);
		}
		//resequencing the columns of table
		returnList.add(columnMap.get("Name"));
		returnList.add(columnMap.get("Slip Days"));
		returnList.add(columnMap.get("ClassifiedItem"));
		returnList.add(columnMap.get("Priority"));
		columnMap.remove("Name");
		columnMap.remove("Slip Days");
		columnMap.remove("ClassifiedItem");
		columnMap.remove("Priority");
		Set <String> columnMapKeys = columnMap.keySet();
		for(String key: columnMapKeys){
			returnList.add(columnMap.get(key));
		}
    	return returnList;
    }
    
    
    /**
     * Program HTML for IssueName
     * @param context
     * @param args
     * @return StringList containing names of Issue
     * @throws MatrixException
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getIssueName(Context context, String[] args) throws MatrixException {
    	
    	StringList issueNameList = new StringList();
    	StringList busSelectList = new StringList();
    	busSelectList.add(DomainConstants.SELECT_ID);
    	busSelectList.add(DomainConstants.SELECT_NAME);
       
    	try{
            Map programMap         = (HashMap) JPO.unpackArgs(args);
            MapList issueMapList  = (MapList) programMap.get("objectList");
            Map paramList          = (HashMap) programMap.get("paramList");
            String PrinterFriendly = (String) paramList.get("reportFormat");
            String[] issueIdArray = new String[issueMapList.size()];
            String invokedFrom =(String) CacheUtil.getCacheObject(context,"invokedFrom");
            //Added for ODT
			if(!"TestCase".equalsIgnoreCase(invokedFrom)) {
				//NX5 - name is not in select list for emxCommonIssueBase:getActiveIssues
				for (int i=0, j=issueMapList.size(); i<j; i++) {
					Map issueMap = (Map)issueMapList.get(i);
					String issueId = (String) issueMap.get(DomainConstants.SELECT_ID);
					issueIdArray[i] = issueId;
				}
				issueMapList = DomainObject.getInfo(context, issueIdArray,busSelectList);
			}
            
            for (int i=0, j=issueMapList.size(); i<j; i++) {
            	Map issueMap = (Map)issueMapList.get(i);
            	String issueId = (String) issueMap.get(DomainConstants.SELECT_ID);
            	String issueName = (String) issueMap.get(DomainConstants.SELECT_NAME);
            	
            	if(ProgramCentralUtil.isNotNullString(issueId)) {
            		if(PrinterFriendly != null) {
            			issueNameList.add(issueName);
            		} else {
            			issueId   = XSSUtil.encodeForURL(context,issueId);
            			issueName = XSSUtil.encodeForXML(context,issueName);
            			
            			String nextURL = "../common/emxNavigator.jsp?mode=insert&amp;isPopup=true&amp;objectId=";
            			issueNameList.add("<a href=\""+ nextURL + issueId +"\" target=\"_blank\">"+ issueName +"</a>");
            		}
            	}
            }
        } catch(Exception exception) {
        	throw new MatrixException(exception);
        }
        return issueNameList;
    }

    
    /**
     * ProgramHTML for Reported against column of PMCIssue Table
     * @param context
     * @param args
     * @return StringList containing names of reported against items
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getReportedAgainst(Context context,String[] args)
         throws Exception
    {

        Map programMap = (Map)JPO.unpackArgs(args);
        Map paramList = (Map) programMap.get("paramList");
        MapList relBusObjPageList = (MapList) programMap.get("objectList");
        int size  = relBusObjPageList.size();
        StringList vec = new StringList(size);
        for(int i=0; i<size; i++)
        {
            Map map = (Map)relBusObjPageList.get(i);
            String strObjectId = (String) map.get(DomainConstants.SELECT_ID);

            String strShowLink = null;
            if(!(strObjectId == null || "".equals(strObjectId)))
            {
                DomainObject dom = new DomainObject(strObjectId);
                String strRelationIssue = PropertyUtil.getSchemaProperty(context,
                                                  Issue.SYMBOLIC_relationship_Issue);
                StringList slRepAgainstIds = dom.getInfoList(context,"from[" + strRelationIssue + "].to.id");
                Iterator repAgainstIdItr = slRepAgainstIds.iterator();
                while(repAgainstIdItr.hasNext()) {
                    String strRepAgainstId = (String)repAgainstIdItr.next();
                    StringList slRepAgainst = new StringList(1);
                    slRepAgainst.add(DomainConstants.SELECT_NAME);
                    DomainObject domIssue = new DomainObject(strRepAgainstId);
                    Map mapRepAgainst = domIssue.getInfo(context, slRepAgainst);
                    String strRepAgainstName = (String) mapRepAgainst.get(DomainConstants.SELECT_NAME);
                    String URLToShow = "../common/emxNavigator.jsp?isPopup=true&amp;objectId="
                                              + XSSUtil.encodeForJavaScript(context,strRepAgainstId);
                    if((paramList.get("reportFormat")) != null)
            		{
                    	strShowLink = strRepAgainstName  ;
            		}else{
                    strShowLink = (strShowLink == null) ? "" : (strShowLink + "<br/>");
                    strShowLink += "<a href=\""+ URLToShow +"\" target=\"_blank\">" + XSSUtil.encodeForXML(context,strRepAgainstName) + "</a>";
            		}
                }
            }
            else {
                strShowLink ="";
            }
            vec.add(strShowLink);
        }
            return vec;
    }
   }


