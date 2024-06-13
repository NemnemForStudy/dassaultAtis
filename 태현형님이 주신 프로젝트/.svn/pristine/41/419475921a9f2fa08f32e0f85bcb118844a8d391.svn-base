/*
**  emxAEFCollectionBase
**
**  Copyright (c) 1992-2020 Dassault Systemes.
**  All Rights Reserved.
**  This program contains proprietary and trade secret information of MatrixOne,
**  Inc.  Copyright notice is precautionary only
**  and does not evidence any actual or intended publication of such program
**
**   This JPO contains the implementation of emxAEFCollectionBase
*/

import java.io.File;
import java.io.FileInputStream;
import java.util.*;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.dassault_systemes.enovia.changeaction.servicesimpl.ChangeConstants;
import com.dec.util.DecExcelUtil;
import com.dec.util.DecStringUtil;
import com.matrixone.apps.domain.*;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.json.JSONArray;
import com.matrixone.json.JSONObject;

import matrix.db.BusinessObjectAttributes;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.RelationshipList;
import matrix.db.State;
import matrix.util.Pattern;
import matrix.util.StringList;

import com.matrixone.apps.framework.ui.ProgramCallable;

/**
 * The <code>emxAEFCollectionBase</code> class contains methods for the
 * "Collection" Common Component.
 *
 * @version AEF 10.0.Patch1.0 - Copyright (c) 2003, MatrixOne, Inc.
 */

public class decCodeMasterExcel_mxJPO {

	 public void getExcelData(Context context,String[] args) throws Exception{
		 
		 String sFolderWIN 	= "c:\\temp\\";
	     String sFolderUNIX = "/tmp/";
	     String mNumber = "순번";
		 String mKeyName ="Name";
		 String mKeyDes ="Description";
		 
		 File outfile = null;
		 MapList mlReturn = new MapList();
		 List<Map<String, Object>> map = new ArrayList<>();
		 Map<String, Object> hashMap = new HashMap<>();
		 Map paramMap = (Map)JPO.unpackArgs(args);
	    //filePath에는 파일이름 넘어온다.
		 
	    	String sFolder = (String) paramMap.get("folder");
	    	String sFilename = (String) paramMap.get("fileName");
	    	
	    	if(DecStringUtil.isNotNullString(sFilename)) {
		        outfile = new File(sFolder + sFilename);
		        mlReturn = DecExcelUtil.getExcelDataToList(outfile.getPath());
			}
	    	
	    	
	             FileInputStream file = new FileInputStream("C:/Users/atis/Desktop/엑셀임포트코드마스터.xlsx");
	             XSSFWorkbook workbook = new XSSFWorkbook(file);	
	    	     
	             
	             int rowindex=0;
	             int columnindex=0;
	             XSSFSheet sheet=workbook.getSheetAt(0);
	             
	             int rows=sheet.getPhysicalNumberOfRows();
	             for(rowindex=0;rowindex<rows;rowindex++){
	            	//행을읽는다
	                 XSSFRow row=sheet.getRow(rowindex);
	                 if(row !=null){
	                     //셀의 수
	                     int cells=row.getPhysicalNumberOfCells();
	                     for(columnindex=0; columnindex<cells; columnindex++){
	                         //셀값을 읽는다
	                         XSSFCell cell=row.getCell(columnindex);
	                         //cell.equals(columnindex);
	                        	String adb = cell.toString();
	                        	String sName = "";
	                        	String sDescription = "";
	                        	if(!adb.equals(mNumber)&&columnindex>=1&&!adb.equals(mKeyName)&&!adb.equals(mKeyDes)) {
	                        		
	                        		if(columnindex==1) {
	                        			sName = adb;
	                        			hashMap.put("Name", adb);
	                        		}
	                        		if(columnindex==2) {
	                        			sDescription = adb;
	                        			hashMap.put("Description", adb);
	                        		}
	                        		
	                        	}
	                        	System.out.println(columnindex);
	                        	System.out.println(cell);
	                         
	                         String value="";
	                         //셀이 빈값일경우를 위한 널체크
	                         if(cell==null){
	                             continue;
	                         }
	                         
							if(!sName.isEmpty()&&!sDescription.isEmpty()) {
								map.add(hashMap);
							}
	                     }	                     
	                 }
	             }
	             
	              
	 }	
}
