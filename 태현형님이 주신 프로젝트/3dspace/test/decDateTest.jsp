<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	String date = "2023. 6. 15.";
	String date_msvalue = "1686798000000";
	
	Locale locale = context.getLocale();
	String timeZone		=(String)session.getAttribute("timeZone");
	double clientTZOffset = (new Double(timeZone)).doubleValue();
	
	// date 문자열 --> locale을 적용해 date로 변경 --> system 저장 형식으로 변경
	String inputDate = eMatrixDateFormat.getFormattedInputDateTime(context
			, date // 일자
			, null // 시간
			, clientTZOffset // 타임존
			, locale); // 로케일
			
	System.out.println("inputDate1 : " + inputDate);
	
	// date millisecond --> date로 변경 --> system 저장 형식으로 변경
	inputDate = eMatrixDateFormat.getFormattedInputDate(context
			, eMatrixDateFormat.getDateValue(context, date_msvalue, timeZone, locale)
			, clientTZOffset
			, locale);
	
	System.out.println("inputDate2 : " + inputDate);
	 
	// system 저장된 날짜 --> locale을 적용해 사용자 환경에 맞는 날짜로 변경
	String outputDate = eMatrixDateFormat.getFormattedDisplayDate(inputDate, clientTZOffset, Locale.US);
	System.out.println("outputDate : " + outputDate);
	outputDate = eMatrixDateFormat.getFormattedDisplayDate(inputDate, clientTZOffset, Locale.UK);
	System.out.println("outputDate : " + outputDate);
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>