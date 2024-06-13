package com.dec.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.daewooenc.export.ExportConfig;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.eMatrixDateFormat;

import matrix.util.StringList;

/**
 * <PRE>
 * 엑셀 관련 Util
 * </PRE>
 *
 * @author Jihoon, park
 * @version 1.0 2022/04/11
 */
public class DecExcelUtil {
    private static Logger logger = Logger.getLogger(DecExcelUtil.class);

    public final static int KEY_TYPE_FIRSTROW = 0;
    public final static int KEY_TYPE_CELLNUMBER = 1;

    public final static String EXTENSION_XLS = ".xls";
    public final static String EXTENSION_XLSM = ".xlsm";
    public final static String EXTENSION_XLSX = ".xlsx";

    /**
     * Excel File --> Workbook 변환
     *
     * @param filePath
     * @return
     * @throws Exception
     * @throws NumberFormatException
     */
    public static Workbook getExcelWorkBook(String filePath) throws Exception, NumberFormatException {
        Workbook workbook 	= null;
        try {
        	FileInputStream fis = null;
            try {
                fis = new FileInputStream(filePath);
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e.getMessage(), e);
            }
            
            Workbook wb = null;
            if (filePath.toLowerCase().endsWith(EXTENSION_XLS)) {
                workbook = new HSSFWorkbook(new POIFSFileSystem(new FileInputStream(filePath)));
                
            } else if (filePath.toLowerCase().endsWith(EXTENSION_XLSX) || filePath.toLowerCase().endsWith(EXTENSION_XLSM)) {
                workbook = new XSSFWorkbook(new FileInputStream(filePath));
            }
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            return workbook;
        }
        return workbook;
    }

    

    /**
     * Excel의 첫번째 시트의 첫번째 행의 데이터 가져오기
     *
     * @param sheet
     * @return
     * @throws Exception
     */
    public static StringList getExcelFirstRowData(String filePath) throws Exception {
		Workbook excelFile = getExcelWorkBook(filePath);
        Sheet sheet = excelFile.getSheetAt(0);
        return getExcelFirstRowData(sheet);
    }
    
    /**
     * Excel Sheet의 첫번째 행의 데이터 가져오기
     *
     * @param sheet
     * @return
     * @throws Exception
     */
    
    public static StringList getExcelFirstRowData(Sheet sheet) throws Exception {
        StringList slFirstRowDataList = new StringList();
        try {
            Row row = sheet.getRow(0);
            int iCellCnt = row.getPhysicalNumberOfCells();
            for (int i = 0; i < iCellCnt; i++) {
                slFirstRowDataList.add(getCellValue(row.getCell((short) i)));
            }
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
        }
        return slFirstRowDataList;
    }

    /**
     * Excel의 Row data 리스트
     *
     * @param sheet   Row Data를 가져올 Excel의 sheet
     * @param keyType Row data의 Key 값 (0:첫번쨰 Row가 Key, 1:셀의 번호가 Key)
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowData(Sheet sheet, int keyType) throws Exception {
        MapList excelRowData = new MapList();
        try {
            Cell cell = null;
            Map dataMap = null;
            StringList keyList = new StringList();

            Row row = sheet.getRow(0);
            int iRowCnt = sheet.getPhysicalNumberOfRows();
            int iCellCnt = row.getPhysicalNumberOfCells();

            // Key data setting
            for (int i = 0; i < iCellCnt; i++) {
                cell = row.getCell((short) i);
                if (keyType == 0) {
                    keyList.add(getCellValue(cell).trim());
                } else if (keyType == 1) {
                    keyList.add(String.valueOf(i));
                }
            }

            // Row data setting
            int iStart = (keyType == 0 ? 1 : 0);
            for (int i = iStart; i < iRowCnt; i++) {
                row = sheet.getRow(i);
                dataMap = new HashMap();
                for (int j = 0; j < iCellCnt; j++) {
                    cell = row.getCell((short) j);
                    dataMap.put((String) keyList.get(j), getCellValue(cell));
                }
                excelRowData.add(dataMap);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getLocalizedMessage());
        }
        return excelRowData;
    }

    /**
     * Excel의 cell 데이터
     *
     * @param cell 데이터를 가져올 cell
     * @return
     * @throws Exception
     * 수정 필요
     */
    public static String getCellValue(Cell cell) throws Exception {
    	String value = DomainConstants.EMPTY_STRING;
        try {
            if (cell == null)
                return value;
            
            CellType cellType = cell.getCellType();
            if (cellType == CellType.FORMULA)
                cellType = cell.getCachedFormulaResultType();

            if (cellType == CellType.STRING) {
                value = cell.getStringCellValue();
            } else if (cellType == CellType.NUMERIC) {
                if (DateUtil.isCellDateFormatted(cell)) {
                    value = DecDateUtil.changeDateFormat(cell.getDateCellValue(), new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US));
                } else {
                    double dVal = cell.getNumericCellValue();
                    if (dVal - (long) dVal > 0) {
                        value = String.valueOf(dVal);
                    } else {
                        value = String.valueOf((long) dVal);
                    }
                }
            } else if (cellType == CellType.BOOLEAN) {
                value = String.valueOf(cell.getBooleanCellValue());
            } else if (cellType == CellType.ERROR) {
                value = String.valueOf(cell.getErrorCellValue());
            } else {
                value = DomainConstants.EMPTY_STRING;
            }
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw e;
        }
        return value;
    }

    /**
     * 첫번쨰 Row data를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param filePath 데이터를 가져올 Excel의 파일 경로
     * @return
     * @throws Exception
     */
    public static Map<String, MapList> getExcelRowDataByFirstRowKey(String filePath) throws Exception {
        return getExcelRowData(filePath, 0);
    }

    /**
     * 첫번쨰 Row data를 Key 값으로 Excel의 Row data 가져오기 (sheet의 명을 Key값을 Map으로 반환)
     *
     * @param workbook Excel workbook
     * @return
     * @throws Exception
     */
    public static Map<String, MapList> getExcelRowDataByFirstRowKey(Workbook workbook) throws Exception {
        return getExcelRowData(workbook, 0);
    }

    /**
     * 첫번쨰 Row data를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param filePath  데이터를 가져올 Excel의 파일 경로
     * @param sheetName Row Data를 가져올 Excel의 sheet명
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowDataByFirstRowKey(String filePath, String sheetName) throws Exception {
        return getExcelRowData(getExcelWorkBook(filePath), sheetName, 0);
    }

    /**
     * 첫번쨰 Row data를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param workbook  Excel workbook
     * @param sheetName Row Data를 가져올 Excel의 sheet명
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowDataByFirstRowKey(Workbook workbook, String sheetName) throws Exception {
        return getExcelRowData(workbook, sheetName, 0);
    }

    /**
     * 첫번쨰 Row data를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param filePath   데이터를 가져올 Excel의 파일 경로
     * @param sheetIndex Row Data를 가져올 Excel의 sheet 번호
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowDataByFirstRowKey(String filePath, int sheetIndex) throws Exception {
        return getExcelRowData(filePath, sheetIndex, 0);
    }

    /**
     * 첫번쨰 Row data를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param workbook   Excel workbook
     * @param sheetIndex Row Data를 가져올 Excel의 sheet 번호
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowDataByFirstRowKey(Workbook workbook, int sheetIndex) throws Exception {
        return getExcelRowData(workbook.getSheetAt(sheetIndex), 0);
    }

    /**
     * 셀의 번호를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param filePath 데이터를 가져올 Excel의 파일 경로
     * @return
     * @throws Exception
     */
    public static Map<String, MapList> getExcelRowDataByCellNumberKey(String filePath) throws Exception {
        return getExcelRowData(filePath, 1);
    }

    /**
     * 셀의 번호를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param workbook Excel workbook
     * @return
     * @throws Exception
     */
    public static Map<String, MapList> getExcelRowDataByCellNumberKey(Workbook workbook) throws Exception {
        return getExcelRowData(workbook, 1);
    }

    /**
     * 셀의 번호를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param filePath  데이터를 가져올 Excel의 파일 경로
     * @param sheetName Row Data를 가져올 Excel의 sheet명
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowDataByCellNumberKey(String filePath, String sheetName) throws Exception {
        return getExcelRowData(filePath, sheetName, 1);
    }

    /**
     * 셀의 번호를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param workbook  Excel workbook
     * @param sheetName Row Data를 가져올 Excel의 sheet명
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowDataByCellNumberKey(Workbook workbook, String sheetName) throws Exception {
        return getExcelRowData(workbook, sheetName, 1);
    }

    /**
     * 셀의 번호를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param filePath   데이터를 가져올 Excel의 파일 경로
     * @param sheetIndex Row Data를 가져올 Excel의 sheet 번호
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowDataByCellNumberKey(String filePath, int sheetIndex) throws Exception {
        return getExcelRowData(filePath, sheetIndex, 1);
    }

    /**
     * 셀의 번호를 Key 값으로 Excel의 Row data 가져오기
     *
     * @param workbook   Excel workbook
     * @param sheetIndex Row Data를 가져올 Excel의 sheet 번호
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowDataByCellNumberKey(Workbook workbook, int sheetIndex) throws Exception {
        return getExcelRowData(workbook, sheetIndex, 1);
    }

    /**
     * Excel의 Row data 가져오기
     *
     * @param filePath 데이터를 가져올 Excel의 파일 경로
     * @param keyType  Row data의 Key 값 (0:첫번쨰 Row가 Key, 1:셀의 번호가 Key)
     * @return
     * @throws Exception
     */
    public static Map<String, MapList> getExcelRowData(String filePath, int keyType) throws Exception {
        return getExcelRowData(getExcelWorkBook(filePath), keyType);
    }

    /**
     * Excel의 Row data 가져오기
     *
     * @param workbook Excel workbook
     * @param keyType  Row data의 Key 값 (0:첫번쨰 Row가 Key, 1:셀의 번호가 Key)
     * @return
     * @throws Exception
     */
    public static Map<String, MapList> getExcelRowData(Workbook workbook, int keyType) throws Exception {
        Map<String, MapList> mExcelData = new HashMap<String, MapList>();

        Sheet sheet = null;
        int sheetCnt = workbook.getNumberOfSheets();
        for (int i = 0; i < sheetCnt; i++) {
            sheet = workbook.getSheetAt(i);
            mExcelData.put(sheet.getSheetName(), getExcelRowData(sheet, keyType));
        }
        return mExcelData;
    }

    /**
     * Excel의 Row data 가져오기
     *
     * @param filePath  데이터를 가져올 Excel의 파일 경로
     * @param sheetName Row Data를 가져올 Excel의 sheet명
     * @param keyType   Row data의 Key 값 (0:첫번쨰 Row가 Key, 1:셀의 번호가 Key)
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowData(String filePath, String sheetName, int keyType) throws Exception {
        return getExcelRowData(getExcelWorkBook(filePath), sheetName, keyType);
    }

    /**
     * Excel의 Row data 가져오기
     *
     * @param workbook  Excel workbook
     * @param sheetName Row Data를 가져올 Excel의 sheet명
     * @param keyType   Row data의 Key 값 (0:첫번쨰 Row가 Key, 1:셀의 번호가 Key)
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowData(Workbook workbook, String sheetName, int keyType) throws Exception {
        return getExcelRowData(workbook.getSheet(sheetName), keyType);
    }

    /**
     * Excel의 Row data 가져오기
     *
     * @param filePath   데이터를 가져올 Excel의 파일 경로
     * @param sheetIndex Row Data를 가져올 Excel의 sheet 번호
     * @param keyType    Row data의 Key 값 (0:첫번쨰 Row가 Key, 1:셀의 번호가 Key)
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowData(String filePath, int sheetIndex, int keyType) throws Exception {
        return getExcelRowData(getExcelWorkBook(filePath), sheetIndex, keyType);
    }

    /**
     * Excel의 Row data 가져오기
     *
     * @param workbook   Excel workbook
     * @param sheetIndex Row Data를 가져올 Excel의 sheet 번호
     * @param keyType    Row data의 Key 값 (0:첫번쨰 Row가 Key, 1:셀의 번호가 Key)
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowData(Workbook workbook, int sheetIndex, int keyType) throws Exception {
        return getExcelRowData(workbook.getSheetAt(sheetIndex), keyType);
    }

    /**
     *
     * @param filePath
     * @return
     * @throws Exception
     */


    /**
     * 특정 Row를 Key로 Excel의 Row data 가져오기
     *
     * @param work     Excel workbook
     * @param sheetIdx Row Data를 가져올 Excel의 sheet 번호
     * @param keyRow   Row data의 Key 값 (keyRow번쨰 Row가 Key)
     * @return
     * @throws Exception
     */
    public static MapList getExcelSelectKeyRowData(Workbook work, int sheetIdx, int keyRow) throws Exception {
        MapList excelRowData = new MapList();
        try {
            Sheet sheet = work.getSheetAt(sheetIdx);
            Cell cell = null;
            Map dataMap = null;
            StringList keyList = new StringList();

            Row row = sheet.getRow(keyRow);
            int iRowCnt = sheet.getPhysicalNumberOfRows();
            int iCellCnt = row.getPhysicalNumberOfCells();

            for (int i = 0; i < iCellCnt; i++) {
                cell = row.getCell((short) i);
                keyList.add(getCellValue(cell).trim());
            }

            for (int i = keyRow + 1; i < iRowCnt; i++) {
                row = sheet.getRow(i);
                dataMap = new HashMap();
                for (int j = 0; j < iCellCnt; j++) {
                    cell = row.getCell((short) j);
                    dataMap.put((String) keyList.get(j), getCellValue(cell));
                }
                excelRowData.add(dataMap);
            }
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
        }
        return excelRowData;
    }
    
    /**
     * Excel의 Row data 리스트
     *
     * @param sheet   Row Data를 가져올 Excel의 sheet
     * @param keyType Row data의 Key 값 (0:첫번쨰 Row가 Key, 1:셀의 번호가 Key)
     * @return
     * @throws Exception
     */
    public static MapList getExcelRowData1(Sheet sheet, int keyType) throws Exception {
        MapList excelRowData = new MapList();
        try {
            Cell cell 			= null;
            Map dataMap 		= null;
            StringList keyList 	= new StringList();

            Row row 			= sheet.getRow(1);	// 1 Row is Title row
            int iRowCnt 		= sheet.getPhysicalNumberOfRows() + 1;
            int iCellCnt 		= row.getPhysicalNumberOfCells() + 1;

            // Key data setting
            for (int i = 0; i < iCellCnt; i++) {
                cell = row.getCell((short) i);
                if (keyType == 0) {
                    keyList.add(getCellValue(cell).trim());
                } else if (keyType == 1) {
                    keyList.add(String.valueOf(i));
                }
            }

            // Row data setting
            int iStart = (keyType == 0 ? 2 : 1);
            for (int i = iStart; i < iRowCnt; i++) {
                row = sheet.getRow(i);
                dataMap = new HashMap();
                for (int j = 0; j < iCellCnt; j++) {
                    cell = row.getCell((short) j);
                    dataMap.put((String) keyList.get(j), getCellValue(cell));
                }
                excelRowData.add(dataMap);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getLocalizedMessage());
        }
        return excelRowData;
    }
    
    //
	public static Map getExcelDataMatrixMap(String filePath) 
		throws Exception 
	{
		Workbook excelFile = getExcelWorkBook(filePath);
		
		return getExcelDataMatrixMap( excelFile.getSheetAt(0) , 0);
	}
	
	public static Map getExcelDataMatrixMap(Sheet sheet, int headerIdx) 
		throws Exception 
	{
		Map map = new HashMap();
		
		int rows = sheet.getPhysicalNumberOfRows();
		
        if( rows > 0 ) 
        {
        	Row row = sheet.getRow(headerIdx);	// list header row
        	
        	int cells = row.getPhysicalNumberOfCells();	// list header cells
        	
        	for( int i = 0; i < rows; i++ ) 
        	{
        		row = sheet.getRow(i);
        		
        		if( row != null ) 
        		{
        			for( int j = 0; j < cells; j++ ) 
        			{
    					Cell cell = row.getCell(j);
    					
    					String cellValue = "";
    					
    					if( cell != null ) 
    					{
    						cellValue = getCellValue(cell).trim();
    					}
    					
    					if( cellValue.equals("false") ) 
    					{
    						cellValue = "";
    					}
    					
    					map.put(i + "." + j, cellValue.replaceAll("\n", " "));
    				}
        		}
        	}
        	
        	map.put("ROWS", rows);
        	map.put("CELLS", cells);
        }
        
        return map;
	}

	/**
	 * 
	 * Excel의 첫번쨰 sheet의 데이터
	 * 
	 * @param filePath
	 * @return
	 * @throws Exception
	 */
	public static MapList getExcelDataToList(String filePath) throws Exception {
		return getExcelDataToList(filePath, 1);
	}
	
	public static MapList getExcelDataToList(String filePath, int iStartRow) 
		throws Exception 
	{
		MapList list = new MapList();
		
		Workbook excelFile = getExcelWorkBook(filePath);
		
        Sheet sheet = excelFile.getSheetAt(0);
        
        int rows = sheet.getPhysicalNumberOfRows();
        
        if( rows > 0 ) 
        {
        	StringList keyList = new StringList();
        	
        	Row row = sheet.getRow(0);
        	
        	int cells = row.getPhysicalNumberOfCells();
        	
        	if( cells > 0 ) 
        	{
        		for( int j = 0; j < cells; j++ ) 
        		{
        			Cell cell = row.getCell(j);
        			
        			keyList.add(cell.toString());
                }
        	}
        	
        	Map map = null;
        	
        	for( int i = iStartRow; i < rows; i++ ) 
        	{
        		row = sheet.getRow(i);

        		if(row == null) {
        			continue;
        		}
        		Cell cell = row.getCell(0);
        		
        		map = new HashMap();
        		
        		for( int j = 0; j < cells; j++ ) 
        		{
        			cell = row.getCell(j);
        		//  jhlee Add 2023-11-03 -- [s]
            	//	if(cell == null) {
            	//		continue;
            	//	}
        		//	
				//	String value = getCellValue(cell).trim();
					
        			String value = "";
            		if(cell != null) {
            			value = getCellValue(cell).trim();
            		}
            	//  jhlee Add 2023-11-03 -- [e]
					
					if( value.equals("false") || DecStringUtil.equals(value, "---") ) 
					{
						value = "";
					}
					
        			map.put(keyList.get(j), value);
        		}
        		map.put("Row", String.valueOf(i-1));
        		list.add(map);
        	}
        }
        
        return list;
	}
	
	
	
	/**
	 * 
	 * Excel의 첫번쨰 sheet의 데이터
	 * 
	 * @param filePath
	 * @return
	 * @throws Exception
	 */
	public static MapList getCodeMasterExcelDataToList(String filePath) 
		throws Exception 
	{
		MapList list = new MapList();
		
		Workbook excelFile = getExcelWorkBook(filePath);
		
        Sheet sheet = excelFile.getSheetAt(0); //첫시트 (0번)
        System.out.println("코드마스터 엑셀 임포트로 진입");
        int rows = sheet.getPhysicalNumberOfRows(); // row몇개인지 읽는곳
        
        if( rows > 0 ) 
        {
        	StringList keyList = new StringList(); //키값담기위한 리스트
        	
        	Row row = sheet.getRow(0);
        	
        	int cells = row.getPhysicalNumberOfCells(); //A1~C1
        	
        	if( cells > 0 )  // 컬럼( 옆으로 셀 몇 줄인가?) 
        	{
        		for( int j = 0; j < cells; j++ ) 
        		{
        			Cell cell = row.getCell(j); // 읽기시작 A1,B1,C3 ... ,
        			
        			keyList.add(cell.toString()); // KEY값에 해당하는 녀석들 리스트에 담는다.
                }
        	} System.out.println("ExcelUtil의 KeyList:"+keyList);
        	// 위에서 키값에 담음
        	Map map = null;
        	
        	for( int i = 1; i < rows; i++ ) 
        	{
        		row = sheet.getRow(i); // i=1일때 A2 B2 C3 읽었다..
        		
        		Cell cell = row.getCell(0); // A3 B3 C3를 읽었다.
        		
        		if(DecStringUtil.isEmpty( cell.toString() ) )
        			continue;
        		
        		map = new HashMap(); // 셀값들을 맵에 주워담아보자
        		
        		for( int j = 0; j < cells; j++ ) 
        		{
        			cell = row.getCell(j);
        			
					String value = getCellValue(cell).trim();
					
					if( value.equals("false") ) 
					{
						value = "";
					}
					
        			map.put(keyList.get(j), value); //키값에 매칭해서 조회중인 행의 컬럼값(j값의 컬럼)으로 들어간다. 
        		}
        		map.put("Row", String.valueOf(i-1));
        		list.add(map);
        	}
        }
        
        return list;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Map write2Excel(MapList mapList, List<ExportConfig> configList, File file) throws Exception{
		Map resultMap = new HashMap();
		try ( FileOutputStream fos = new FileOutputStream(file); 
			XSSFWorkbook workbook = new XSSFWorkbook();
		) {
			
			XSSFSheet sheet = workbook.createSheet();
			
			Map map = null;
			int rowIdx = 0;
			int colIdx = 0;
			
			XSSFRow row = sheet.createRow(rowIdx++);
			XSSFCell cell = null;
			
			for (ExportConfig config : configList)
			{
				cell = row.createCell(colIdx++);
				cell.setCellValue(config.getColumnHeader());
			}
			
			for (Object obj : mapList)
			{
				row = sheet.createRow(rowIdx++);
				colIdx = 0;
				
				map = (Map) obj;
				
				for (ExportConfig config : configList)
				{
					cell = row.createCell(colIdx++);
					cell.setCellValue( String.valueOf( map.get(config.getColumnKey() ) ) );
				}
			}
			
			workbook.write(fos);
			
			resultMap.put("result", "success");
			
		} catch (Exception e) {
			resultMap.put("result", "fail");
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Map write2Excel2(MapList mapList, List<ExportConfig> configList, File file) throws Exception{
		Map resultMap = new HashMap();
		try ( FileOutputStream fos = new FileOutputStream(file); 
//			XSSFWorkbook workbook = new XSSFWorkbook();
			SXSSFWorkbook workbook = new SXSSFWorkbook();
		) {
//			XSSFSheet sheet = workbook.createSheet();
			workbook.setCompressTempFiles(true);
			SXSSFSheet sheet = workbook.createSheet();
			sheet.setRandomAccessWindowSize(100);
			
			Map map = null;
			int rowIdx = 0;
			int colIdx = 0;
			
//			XSSFRow row = sheet.createRow(rowIdx++);
			SXSSFRow row = sheet.createRow(rowIdx++);
//			XSSFCell cell = null;
			SXSSFCell cell = null;
			
			for (ExportConfig config : configList)
			{
				cell = row.createCell(colIdx++);
				cell.setCellValue(config.getColumnHeader());
			}
			
			for (Object obj : mapList)
			{
				row = sheet.createRow(rowIdx++);
				colIdx = 0;
				
				map = (Map) obj;
				
				for (ExportConfig config : configList)
				{
					cell = row.createCell(colIdx++);
					cell.setCellValue( String.valueOf( map.get(config.getColumnKey() ) ) );
				}
			}
			
			workbook.write(fos);
			
			resultMap.put("result", "success");
			
		} catch (Exception e) {
			resultMap.put("result", "fail");
			e.printStackTrace();
		}
		
		return resultMap;
	}
}
