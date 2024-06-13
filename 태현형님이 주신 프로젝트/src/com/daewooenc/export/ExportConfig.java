package com.daewooenc.export;

public class ExportConfig {

	private String columnHeader;
	private String columnKey;
	public String getColumnHeader() {
		return columnHeader;
	}
	public void setColumnHeader(String columnHeader) {
		this.columnHeader = columnHeader;
	}
	public String getColumnKey() {
		return columnKey;
	}
	public void setColumnKey(String columnKey) {
		this.columnKey = columnKey;
	}
	public ExportConfig(String columnHeader, String columnKey) {
		super();
		this.columnHeader = columnHeader;
		this.columnKey = columnKey;
	}
	
}
