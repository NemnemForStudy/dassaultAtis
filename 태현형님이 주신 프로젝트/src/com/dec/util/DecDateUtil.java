package com.dec.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalField;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import org.apache.log4j.Logger;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.program.ProgramCentralConstants;

import matrix.db.Context;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class DecDateUtil {
    private static Logger logger = Logger.getLogger(DecDateUtil.class);

    private static final int MILLIS_IN_DAY = 1000 * 60 * 60 * 24;
    /*
    public static final SimpleDateFormat ev6FullSdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
    public static final SimpleDateFormat ev6DateSdf = new SimpleDateFormat("MM/dd/yy");
    public static final SimpleDateFormat ev6DisplaySdf = new SimpleDateFormat("yyyy. M. d.");
    public static final SimpleDateFormat ifSdf = new SimpleDateFormat("yyyy.MM.dd");
    */
    // jhlee Add 2023-05-31 SimpleDateFormat static으로 선언시 작동안하는 버그가 있어 static 빠짐
    SimpleDateFormat ev6FullSdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
    SimpleDateFormat ev6DateSdf = new SimpleDateFormat("MM/dd/yy");
    SimpleDateFormat ev6DisplaySdf = new SimpleDateFormat("yyyy. M. d.");
    SimpleDateFormat ifSdf = new SimpleDateFormat("yyyy.MM.dd");
    
    public final static String IF_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public final static String IF_DB_FORMAT = "yyyy-MM-dd HH:mi:ss";
    public final static String DEC_DATE_FORMAT = "dd-MMM-yy";
    public final static String FORMAT_YYYYMMDD = "yyyyMMdd";
    
    public static String changeDateFormat(String date, String parseFormat, String changeFormat) throws Exception {
    	return changeDateFormat(date, new SimpleDateFormat(parseFormat), new SimpleDateFormat(changeFormat));
    }
    
    public static String changeDateFormat(Object date, SimpleDateFormat parseFormat, SimpleDateFormat changeFormat) throws Exception {
    	String dateStr = "";
    	if ( date != null ) 
    	{
    		dateStr = date.toString();
    	}
    	return changeDateFormat(dateStr, parseFormat, changeFormat);
    }
    
    public static String changeDateFormat(String date, SimpleDateFormat parseFormat, SimpleDateFormat changeFormat) throws Exception {
    	try {
            if (DecStringUtil.isNotEmpty(date) ) {
                Date dDate = parseFormat.parse(date);
                if (dDate != null)
                {
                	date = changeFormat.format(dDate);
                }
            }
            return date;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    public static String changeDateFormat(String sDate, String sChangeFormat) throws Exception {
        return changeDateFormat(sDate, new SimpleDateFormat(sChangeFormat));
    }
    
    public static String changeLocalDateFormat(String sDate, List<DateTimeFormatter> formatList, String sChangeFormat) throws Exception {
    	LocalDate autoChangeLocalDate = autoChangeLocalDate(sDate, formatList);
    	return changeLocalDateFormat(autoChangeLocalDate, sChangeFormat);
    }

    public static String changeFullDateFormat(String sDate, SimpleDateFormat changeFormat) throws Exception {
        try {
            if (DecStringUtil.isNotEmpty(sDate) && changeFormat != null) {
                Date dDate = autoFullChangeDate(sDate);
                if (dDate != null)
                    sDate = changeFormat.format(dDate);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
        return sDate;
    }
    /**
     * 날짜의 format 변경
     *
     * @param sDate
     * @param changeFormat
     * @return
     * @throws Exception
     */
    public static String changeDateFormat(String sDate, SimpleDateFormat changeFormat) throws Exception {
        try {
            if (DecStringUtil.isNotEmpty(sDate) && changeFormat != null) {
                Date dDate = autoChangeDate(sDate);
                if (dDate != null)
                    sDate = changeFormat.format(dDate);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
        return sDate;
    }

    /**
     * 날짜의 format 변경
     *
     * @param dDate
     * @param sChangeFormat
     * @return
     * @throws Exception
     */
    public static String changeDateFormat(Date dDate, String sChangeFormat) throws Exception {
        return changeDateFormat(dDate, new SimpleDateFormat(sChangeFormat, Locale.US));
    }

    public static String changeLocalDateFormat(LocalDate ldDate, String sChangeFormat) throws Exception {
        return changeLocalDateFormat(ldDate, DateTimeFormatter.ofPattern(sChangeFormat, Locale.US));
    }
    
    public static String changeLocalDateTimeFormat(LocalDateTime ldtDate, String sChangeFormat) throws Exception {
    	return changeLocalDateTimeFormat(ldtDate, DateTimeFormatter.ofPattern(sChangeFormat, Locale.US));
    }
    /**
     * 날짜의 format 변경
     *
     * @param dDate
     * @param changeFormat
     * @return
     * @throws Exception
     */
    public static String changeDateFormat(Date dDate, SimpleDateFormat changeFormat) throws Exception {
        String sDate = DomainConstants.EMPTY_STRING;
        try {
            if (dDate != null && changeFormat != null) {
                sDate = changeFormat.format(dDate);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
        return sDate;
    }
    
    public static String changeLocalDateFormat(LocalDate ldDate, DateTimeFormatter changeFormat) throws Exception {
        String sDate = DomainConstants.EMPTY_STRING;
        try {
            if (ldDate != null && changeFormat != null) {
                sDate = ldDate.format(changeFormat);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
        return sDate;
    }
    
    public static String changeLocalDateTimeFormat(LocalDateTime ldtDate, DateTimeFormatter changeFormat) throws Exception {
    	String sDate = DomainConstants.EMPTY_STRING;
    	try {
    		if (ldtDate != null && changeFormat != null) {
    			sDate = ldtDate.format(changeFormat);
    		}
    	} catch (Exception e) {
    		logger.error(e.getMessage(), e);
    		throw e;
    	}
    	return sDate;
    }

    /**
     * 정해진 Format 리스트에 해당하는 format으로 날짜 형식 변경
     *
     * @param date
     * @return
     */
    public static Date autoChangeDate(String date) {
    	/*
    	 * Modified by hslee on 2023.07.05
        Date dReturn = null;
        List<SimpleDateFormat> formatList = new ArrayList<SimpleDateFormat>();
        SimpleDateFormat ev6FullSdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
        SimpleDateFormat ev6DisplaySdf = new SimpleDateFormat("yyyy. M. d.");
        formatList.add(ev6FullSdf);
        formatList.add(ev6DisplaySdf);

        formatList.add(new SimpleDateFormat("yyyy-MM-dd a h:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy-MM-dd aaa h:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy-MM-dd a hh:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy.MM.dd HH:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy/MM/dd-hh:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy/MM/dd hh:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyyMMdd hh:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy-MM-dd"));
        formatList.add(new SimpleDateFormat("yyyyMMdd"));
        formatList.add(new SimpleDateFormat("yyyy/MM/dd"));
        formatList.add(new SimpleDateFormat("MM/dd/yyyy"));
        formatList.add(new SimpleDateFormat("M/d/yyyy HH:mm:ss"));
        formatList.add(new SimpleDateFormat("M/d/yyyy HH:mm:ss a"));
        formatList.add(new SimpleDateFormat("M/d/yyyy"));
        formatList.add(new SimpleDateFormat("MM.dd.yyyy"));

        if (DecStringUtil.isNotEmpty(date)) {
            dReturn = recursiveFindFormat(date, formatList);
        }
        return dReturn;
    	 */
    	
    	return autoChangeDate(date, getDateFormatList());
    }
    
    public static Date autoChangeDate(String date, String dateFormat) {
    	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat, Locale.US);
    	List<SimpleDateFormat> formatList = new ArrayList<SimpleDateFormat>();
    	formatList.add(simpleDateFormat);
    	return autoChangeDate(date, formatList);
    }
    
    public static Date autoChangeDate(String date, List<SimpleDateFormat> formatList) {
    	Date dReturn = null;
    	if (DecStringUtil.isNotEmpty(date)) {
            dReturn = recursiveFindFormat(date, formatList);
        }
        return dReturn;
    }
    
    public static List<SimpleDateFormat> getDateFormatList() {
    	List<SimpleDateFormat> formatList = new ArrayList<SimpleDateFormat>();
        SimpleDateFormat ev6FullSdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
        SimpleDateFormat ev6DisplaySdf = new SimpleDateFormat("yyyy. M. d.");
        formatList.add(ev6FullSdf);
        formatList.add(ev6DisplaySdf);

        formatList.add(new SimpleDateFormat("yyyy-MM-dd a h:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy-MM-dd aaa h:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy-MM-dd a hh:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy.MM.dd HH:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy/MM/dd-hh:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy/MM/dd hh:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyyMMdd hh:mm:ss"));
        formatList.add(new SimpleDateFormat("yyyy-MM-dd"));
        formatList.add(new SimpleDateFormat("yyyyMMdd"));
        formatList.add(new SimpleDateFormat("yyyy/MM/dd"));
        formatList.add(new SimpleDateFormat("MM/dd/yyyy"));
        formatList.add(new SimpleDateFormat("M/d/yyyy HH:mm:ss"));
        formatList.add(new SimpleDateFormat("M/d/yyyy HH:mm:ss a", Locale.US));
        formatList.add(new SimpleDateFormat("M/d/yyyy"));
        formatList.add(new SimpleDateFormat("MM.dd.yyyy"));
        formatList.add(new SimpleDateFormat("M/d/yyyy h:mm:ss a")); // Modified by jhlee on 2023.06.22
        formatList.add(new SimpleDateFormat("M/d/yyyy hh:mm:ss a", Locale.US)); // Modified by jhlee on 2023.06.22

        return formatList;
    }
    
    public static LocalDate autoChangeLocalDate(String date) {
    	/*
    	 * Modified by hslee on 2023.07.05
    	 * 
    	LocalDate ldReturn = LocalDate.now();
    	List<DateTimeFormatter> formatList = new ArrayList<DateTimeFormatter>();
    	
    	DateTimeFormatter ev6FullSdf = DateTimeFormatter.ofPattern(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
    	DateTimeFormatter ev6DisplaySdf = DateTimeFormatter.ofPattern("yyyy. M. d.");
        formatList.add(ev6FullSdf);
        formatList.add(ev6DisplaySdf);

        formatList.add(DateTimeFormatter.ofPattern("yyyy-MM-dd a h:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy-MM-dd a hh:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy/MM/dd-hh:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyyMMdd hh:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        formatList.add(DateTimeFormatter.ofPattern("yyyyMMdd"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        formatList.add(DateTimeFormatter.ofPattern("MM/dd/yyyy"));
        formatList.add(DateTimeFormatter.ofPattern("M/d/yyyy HH:mm:ss"));
//        formatList.add(DateTimeFormatter.ofPattern("M/d/yyyy HH:mm:ss a"));
        formatList.add(DateTimeFormatter.ofPattern("M/d/yyyy hh:mm:ss a", Locale.US)); // Modified by hslee on 2023.06.22
        formatList.add(DateTimeFormatter.ofPattern("M/d/yyyy"));
        formatList.add(DateTimeFormatter.ofPattern("MM.dd.yyyy"));

        if (DecStringUtil.isNotEmpty(date)) {
        	ldReturn = recursiveFindFormatForLocalDate(date, formatList);
        }
        return ldReturn;
        */
    	return autoChangeLocalDate(date, getLocalDateFormatList());
    }
    
    public static LocalDate autoChangeLocalDate(String date, List<DateTimeFormatter> formatList) {
    	LocalDate ldReturn = LocalDate.now();
    	if (DecStringUtil.isNotEmpty(date)) {
        	ldReturn = recursiveFindFormatForLocalDate(date, formatList);
        }
        return ldReturn;
    }
    
    public static List<DateTimeFormatter> getLocalDateFormatList() {
    	List<DateTimeFormatter> formatList = new ArrayList<DateTimeFormatter>();
    	
    	DateTimeFormatter ev6FullSdf = DateTimeFormatter.ofPattern(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
    	DateTimeFormatter ev6DisplaySdf = DateTimeFormatter.ofPattern("yyyy. M. d.");
        formatList.add(ev6FullSdf);
        formatList.add(ev6DisplaySdf);

        formatList.add(DateTimeFormatter.ofPattern("yyyy-MM-dd a h:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy-MM-dd a hh:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy/MM/dd-hh:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyyMMdd hh:mm:ss"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        formatList.add(DateTimeFormatter.ofPattern("yyyyMMdd"));
        formatList.add(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        formatList.add(DateTimeFormatter.ofPattern("MM/dd/yyyy"));
        formatList.add(DateTimeFormatter.ofPattern("M/d/yyyy HH:mm:ss"));
//        formatList.add(DateTimeFormatter.ofPattern("M/d/yyyy HH:mm:ss a"));
        formatList.add(DateTimeFormatter.ofPattern("M/d/yyyy h:mm:ss a")); // Modified by jhlee on 2023.06.22
        formatList.add(DateTimeFormatter.ofPattern("M/d/yyyy hh:mm:ss a", Locale.US)); // Modified by hslee on 2023.06.22
        formatList.add(DateTimeFormatter.ofPattern("M/d/yyyy"));
        formatList.add(DateTimeFormatter.ofPattern("MM.dd.yyyy"));
        
        return formatList;
    }

    public static Date autoFullChangeDate(String date) {
        Date dReturn = null;
        List<SimpleDateFormat> formatList = new ArrayList<SimpleDateFormat>();
        SimpleDateFormat ev6FullSdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
        formatList.add(ev6FullSdf);

        if (DecStringUtil.isNotEmpty(date)) {
            dReturn = recursiveFindFormat(date, formatList);
        }
        return dReturn;
    }
    
    public static LocalDate changeDate2LocalDate(String dateStr) {
    	DateTimeFormatter inputDateTimeFormatter = DateTimeFormatter.ofPattern(eMatrixDateFormat.getInputDateFormat(), Locale.US); 
    	return LocalDate.parse(dateStr, inputDateTimeFormatter);
    }
    

    /**
     * 정해진 Format 리스트의 순서에 따라서 변경 할 포맷을 찾아 자동으로 변경
     *
     * @param date
     * @param formatList
     * @return
     */
    private static Date recursiveFindFormat(String date, List<SimpleDateFormat> formatList) {
        Date dDate = null;
        SimpleDateFormat sdf = null;
        for (Iterator<SimpleDateFormat> itr = formatList.iterator(); itr.hasNext(); ) {
            try {
                sdf = itr.next();
                dDate = sdf.parse(date);
                int i = date.indexOf("/");
                if (i >= 0) {
                    String pattern = sdf.toPattern();
                    if (date.substring(0, i).length() != pattern.substring(0, pattern.indexOf("/")).length()) {
                        continue;
                    }
                }
                break;
            } catch (Exception e) {
            }
        }
        return dDate;
    }
    
    private static LocalDate recursiveFindFormatForLocalDate(String date, List<DateTimeFormatter> formatList) {
    	LocalDate ldDate = LocalDate.now();
        DateTimeFormatter dtFormater = null;
        for (Iterator<DateTimeFormatter> itr = formatList.iterator(); itr.hasNext(); ) {
            try {
            	dtFormater = itr.next();
            	ldDate = LocalDate.parse(date, dtFormater);
                break;
            } catch (Exception e) {
            }
        }
        return ldDate;
    }

    /**
     * From과 To 차이 일수(Day)
     *
     * @param fromDate
     * @param toDate
     * @return
     * @throws Exception
     */
    public static long getDifference(String fromDate, String toDate) throws Exception {
        long diffDays = 0;
        try {
            if (DecStringUtil.isNotEmpty(fromDate) && DecStringUtil.isNotEmpty(toDate)) {
                Calendar cFrom = Calendar.getInstance();
                cFrom.setTime(autoChangeDate(fromDate));
                cFrom.set(Calendar.HOUR_OF_DAY, 0);
                cFrom.set(Calendar.MINUTE, 0);
                cFrom.set(Calendar.SECOND, 0);

                Calendar cTo = Calendar.getInstance();
                cTo.setTime(autoChangeDate(toDate));
                cTo.set(Calendar.HOUR_OF_DAY, 0);
                cTo.set(Calendar.MINUTE, 0);
                cTo.set(Calendar.SECOND, 0);

                diffDays = cTo.getTimeInMillis() - cFrom.getTimeInMillis();
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return diffDays;
    }

    /**
     * From과 To 차이 일수(Day)
     *
     * @param fromDate
     * @param toDate
     * @return
     * @throws Exception
     */
    public static long getDifferenceDay(String fromDate, String toDate) throws Exception {
        long diffDays = 0;
        try {
            if (DecStringUtil.isNotEmpty(fromDate) && DecStringUtil.isNotEmpty(toDate)) {
                Calendar cFrom = Calendar.getInstance();
                cFrom.setTime(autoChangeDate(fromDate));
                cFrom.set(Calendar.HOUR_OF_DAY, 0);
                cFrom.set(Calendar.MINUTE, 0);
                cFrom.set(Calendar.SECOND, 0);

                Calendar cTo = Calendar.getInstance();
                cTo.setTime(autoChangeDate(toDate));
                cTo.set(Calendar.HOUR_OF_DAY, 0);
                cTo.set(Calendar.MINUTE, 0);
                cTo.set(Calendar.SECOND, 0);

                double diffInMillis = cTo.getTimeInMillis() - cFrom.getTimeInMillis();
                diffDays = Math.round(diffInMillis / MILLIS_IN_DAY);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return diffDays;
    }

    /**
     * 오늘날짜와 차이 일수(Day)
     *
     * @param date
     * @return
     * @throws Exception
     */
    public static long getDifferenceDayToToday(String date) throws Exception {
        long diffDays = 0;
        try {
            if (DecStringUtil.isNotEmpty(date)) {
            	SimpleDateFormat ev6DateSdf = new SimpleDateFormat("MM/dd/yy");
                diffDays = getDifferenceDay(changeDateFormat(new Date(), ev6DateSdf), date);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return diffDays;
    }

    /**
     * 해당월의 주차
     *
     * @param sDate
     * @return
     * @throws Exception
     */
    public static int getWeekOfMonth(String sDate) throws Exception {
        try {
            Date date = autoChangeDate(sDate);
            if (date != null) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(autoChangeDate(sDate));
                return calendar.get(Calendar.WEEK_OF_MONTH);
            } else {
                return 0;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * Date의 정보
     *
     * @param sDate
     * @return
     * @throws Exception
     */
    public static int getDateCalendarVariable(String sDate, int iCalVal) throws Exception {
        try {
            Date date = autoChangeDate(sDate);
            if (date != null) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(autoChangeDate(sDate));
                return calendar.get(iCalVal);
            } else {
                return 0;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    /**
     * LocalDate의 정보
     *
     * @param sDate
     * @return
     * @throws Exception
     */
    public static int getLocalDateCalendarVariable(String sDate, TemporalField tf) throws Exception {
        try {
            LocalDate localdate = autoChangeLocalDate(sDate);
            if (localdate != null) {
                return localdate.get(tf);
            } else {
                return 0;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    public static long getLocalDateBetweenWeek(LocalDate ldFrom, LocalDate ldTo) {
    	long lFromDay = ldFrom.toEpochDay();
    	long lToDay = ldTo.toEpochDay();
    	long lBetween = lToDay - lFromDay;
    	BigDecimal bdBetween = BigDecimal.valueOf(lBetween);
    	BigDecimal bdResult = bdBetween.divide(BigDecimal.valueOf(7), RoundingMode.CEILING);
    	return bdResult.longValue();
    }
    
    public static long getLocalDateBetweenMonth(LocalDate ldFrom, LocalDate ldTo) {
        long lFromDay = (ldFrom.getYear() * 12L + ldFrom.getMonthValue() - 1) * 32L + ldFrom.getDayOfMonth();  // no overflow
        long lToDay = (ldTo.getYear() * 12L + ldTo.getMonthValue() - 1) * 32L + ldTo.getDayOfMonth();  // no overflow
    	long lBetween = lToDay - lFromDay;
    	BigDecimal bdBetween = BigDecimal.valueOf(lBetween);
    	BigDecimal bdResult = bdBetween.divide(BigDecimal.valueOf(32), RoundingMode.CEILING);
    	return bdResult.longValue();
    }
    
    public static String getFormattedDisplayDate(Context context, String date, Locale locale) throws Exception{
    	try {
    		if ( locale == null )
    		{
    			locale = context.getLocale();
    		}
    		String returnString = ProgramCentralConstants.EMPTY_STRING;
    		
            TimeZone tz = TimeZone.getTimeZone(context.getSession().getTimezone());
            double dbMilisecondsOffset = (double)(-1)*tz.getRawOffset();
            double clientTZOffset = (new Double(dbMilisecondsOffset/(1000*60*60))).doubleValue();
//            returnString                       = eMatrixDateFormat.getFormattedDisplayDate(date, clientTZOffset,locale);
            returnString = eMatrixDateFormat.getFormattedDisplayDateTime(date
            		, false
            		, eMatrixDateFormat.getEMatrixDisplayDateFormat()
            		, clientTZOffset
            		, locale);
            
            return returnString;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    }
    
    public static String getInputDateFormat() throws Exception{
    	String dateFormat = eMatrixDateFormat.getInputDateFormat();
    	return dateFormat.replaceAll("[hmsa:\\s]", "").trim();
    }
    
	/**
	 * 전달된 LocalDate 형식의 날짜의 정보(LocalDate, millisecond, enovia 날짜 문자열, 화면 출력 날짜 문자열)를 Locale에 맞게 변환해서 반환한다.
	 * @param context
	 * @param localDate
	 * @param locale
	 * @return
	 * @throws Exception
	 */
	public static Map getInputNDisplayMap(Context context, LocalDate localDate, Locale locale) throws Exception{
    	String inputDateFormat = DecDateUtil.changeLocalDateFormat(localDate, getInputDateFormat());
		String displayDateFormat = DecDateUtil.getFormattedDisplayDate(context, inputDateFormat, locale);
		
		Map todayMap = new HashMap();
		todayMap.put("localDate", localDate);
		todayMap.put("msvalue", localDate.atStartOfDay().toInstant(ZoneOffset.UTC).toEpochMilli());
		todayMap.put("input", inputDateFormat);
		todayMap.put("display", displayDateFormat);
		
		return todayMap;
    }
    
    /**
     * 오늘에 해당하는 날짜의 정보를 Locale에 맞게 변환해서 반환한다.
     * @param context
     * @param locale
     * @return
     * @throws Exception
     */
    public static Map getTodayMap(Context context, Locale locale) throws Exception{
    	LocalDate ldtToday = LocalDate.now();
		return getInputNDisplayMap(context, ldtToday, locale);
    }
    
    /**
     * 전달된 문자열 형식의 날짜에서 전달된 기간만큼 더하거나 뺀 날짜의 정보를 Map에 담아 반환한다.
     * @param context
     * @param criteriaDateStr
     * @param unit
     * @param amount
     * @param locale
     * @return
     * @throws Exception
     */
    public static Map getCalculatedDateMap(Context context, String criteriaDateStr, ChronoUnit unit, long amount, Locale locale) throws Exception{
		return getCalculatedDateMap(context, autoChangeLocalDate(criteriaDateStr), unit, amount, locale);
    }
    
    /**
     * 전달된 LocalDate 형식의 날짜에서 전달된 기간만큼 더하거나 뺀 날짜의 정보를 Map에 담아 반환한다.
     * @param context
     * @param criteriaDate
     * @param unit
     * @param amount
     * @param locale
     * @return
     * @throws Exception
     */
    public static Map getCalculatedDateMap(Context context, LocalDate criteriaDate, ChronoUnit unit, long amount, Locale locale) throws Exception{
    	LocalDate calculatedLocalDate = null;
    	calculatedLocalDate = criteriaDate.plus(amount, unit);
		return getInputNDisplayMap(context, calculatedLocalDate, locale);
    }
}
