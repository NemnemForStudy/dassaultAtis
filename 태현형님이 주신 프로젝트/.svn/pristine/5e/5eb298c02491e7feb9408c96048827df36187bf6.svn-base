package com.daewooenc.compare;

public class CompareRule {

	private String key4Source;
	private String key4Target;
	private DATA_TYPE dataType;
	
	public enum COMPARE_TYPE {
		COMPARE
		, VALIDATE
	}
	
	public enum DATA_TYPE {
		INTEGER
		, REAL
		, DATE
		, NOTNULL
	}

	public CompareRule(String key4Source, String key4Target) {
		this.key4Source = key4Source;
		this.key4Target = key4Target;
	}
	
	public CompareRule(String key4Source, DATA_TYPE dataType) {
		this.key4Source = key4Source;
		this.dataType = dataType;
	}
	
	public String getKey4Source() {
		return key4Source;
	}
	public void setKey4Source(String key4Source) {
		this.key4Source = key4Source;
	}
	public String getKey4Target() {
		return key4Target;
	}
	public void setKey4Target(String key4Target) {
		this.key4Target = key4Target;
	}
	public DATA_TYPE getDataType() {
		return dataType;
	}
	public void setDataType(DATA_TYPE dataType) {
		this.dataType = dataType;
	}

	
}
