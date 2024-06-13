package com.dec.util;

import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.matrixone.apps.domain.util.FrameworkUtil;

import matrix.db.SelectConstants;
import matrix.util.StringList;
;

/**
 * String 관련 Util
 */
public class DecStringUtil extends StringUtils {
    private static Logger logger = Logger.getLogger(DecStringUtil.class);
    
	public static String CHARACTERSET_UTF_8 = "UTF-8";
	public static String CHARACTERSET_EUC_KR = "euc-kr";
	public static String CHARACTERSET_KSC5601 = "ksc5601";
	public static String CHARACTERSET_8859_1 = "8859_1";
	public static String CHARACTERSET_ISO_8859_1 = "iso-8859-1";
	public static String CHARACTERSET_ASCII = "ascii";

    /**
     * null 일 경우 공백
     *
     * @param value
     * @return
     */

    public static String nullToEmpty(String value) {
        return ((isEmpty(value)) ? "" : value);
    }

    public static String nullToEmpty(Object value) {
        String ret = "";
        if (value != null) {
            if (value instanceof String) {
                ret = (String) value;
            } else {
                ret = value.toString();
            }
            if (isEmpty(ret)) {
                ret = "";
            }
        }
        return ret;
    }

    /**
     * 소수점 0 제거
     *
     * @param sValue
     * @return
     */
    public static String removeDecimalZero(String sValue) {
        if (isNumericStr(sValue, false)) {
            sValue = new BigDecimal(sValue).stripTrailingZeros().toPlainString();
        }
        return sValue;
    }

    /**
     * null일 경우 0
     *
     * @param value
     * @return
     */
    public static String nullToZero(String value) {
        return ((isEmpty(value)) ? "0" : value);
    }

    /**
     * null일 경우 replaceStr
     *
     * @param value
     * @param replaceStr
     * @return
     */

    public static String nullToStr(String value, String replaceStr) {
        return ((isEmpty(value)) ? replaceStr : value);
    }


//    public static String nullToStr(Object value, String replaceStr) {
//        String ret = "";
//        if (value != null) {
//            if (value instanceof String) {
//                ret = (String) value;
//            } else {
//                ret = value.toString();
//            }
//
//            ret = ret.trim();
//            if (isEmpty(ret)) {
//                ret = replaceStr;
//            }
//        } else {
//            ret = replaceStr;
//        }
//        return ret;
//    }

    /**
     * Integer 체크
     *
     * @param value
     * @return
     */
//    public static boolean isInteger(String value) {
//        boolean isInteger = false;
//        if (isNotEmpty(value)) {
//            try {
//                Integer.parseInt(value);
//                isInteger = true;
//            } catch (Exception e) {
//                logger.error(e.getMessage(), e);
//            }
//        }
//        return isInteger;
//    }

    /**
     * Double 체크
     *
     * @param value
     * @return
     */
//    public static boolean isDouble(String value) {
//        boolean isDouble = false;
//        if (isNotEmpty(value)) {
//            try {
//                Double.parseDouble(value);
//                isDouble = true;
//            } catch (Exception e) {
//                logger.error(e.getMessage(), e);
//            }
//        }
//        return isDouble;
//    }

    /**
     * 공백 제거
     *
     * @param value
     * @return
     */
//    public static String removeEmpty(String value) {
//        return nullToEmpty(value).replaceAll("\\p{Z}", "");
//    }

    /**
     * 특수문자 제거
     *
     * @param originStr
     * @return
     */
//    public static String removeSpecialCharacter(String originStr) {
//        return removeSpecialCharacter(originStr, "");
//    }
    
//    public static String removeSpecialCharacter(String originStr, String substitute) {
//        String match = "[^\uAC00-\uD7A3xfe0-9a-zA-Z\\s]";
//        originStr = originStr.replaceAll(match, substitute);
//        return originStr;
//    }

//    public static Map<String, Map> getKeyDataMapFromMapList(MapList dataList, String paramKey) {
//        Map<String, Map> result = new HashMap<String, Map>();
//
//        Map mData = null;
//        String key = "";
//        for (Object obj : dataList) {
//            mData = (Map) obj;
//            key = (String) mData.get(paramKey);
//
//            if (isNotEmpty(key)) {
//                result.put(key, (Map) obj);
//            }
//        }
//
//        return result;
//    }

//    public static Map<String, Object> getKeyValueMapFromMapList(MapList dataList, String paramKey, String paramValueKey) {
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        Map mData = null;
//        String key = "";
//        String value = "";
//        for (ListIterator<Map> itr = dataList.listIterator(); itr.hasNext(); ) {
//            mData = itr.next();
//            key = (String) mData.get(paramKey);
//            value = (String) mData.get(paramValueKey);
//
//            if (isNotEmpty(value)) {
//                result.put(key, value);
//            }
//        }
//
//        return result;
//    }

//    public static Map<String, Integer> getKeyIndexMapFromMapList(MapList dataList, String paramKey) {
//        Map<String, Integer> result = new HashMap<String, Integer>();
//
//        Map mData = null;
//        String key = "";
//        for (int i = 0; i < dataList.size(); i++) {
//            mData = (Map) dataList.get(i);
//            key = (String) mData.get(paramKey);
//            result.put(key, i);
//        }
//        return result;
//    }

//    public static Map<String, DomainObject> getKeyDomainObjectMapFromMapList(MapList dataList, String paramKey) throws Exception {
//        Map<String, DomainObject> result = new HashMap<String, DomainObject>();
//        try {
//            Map mData = null;
//            String key = "";
//            String oid = "";
//            for (ListIterator<Map> itr = dataList.listIterator(); itr.hasNext(); ) {
//                mData = itr.next();
//                key = (String) mData.get(paramKey);
//                oid = (String) mData.get(ujuConstants.SELECT_ID);
//
//                if (isNotEmpty(oid)) {
//                    result.put(key, new DomainObject(oid));
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return result;
//    }

//    public static Map<String, StringList> getKeyValueListMapFromMapList(MapList dataList, String paramKey, String paramValueKey) {
//        Map<String, StringList> result = new HashMap<String, StringList>();
//
//        Map mData = null;
//        String key = "";
//        Object value = null;
//        for (ListIterator<Map> itr = dataList.listIterator(); itr.hasNext(); ) {
//            mData = itr.next();
//            key = (String) mData.get(paramKey);
//            value = mData.get(paramValueKey);
//
//            if (value != null) {
//                result.put(key, getStringListFromObject(value));
//            }
//        }
//
//        return result;
//    }

    public static StringList getStringListFromObject(Object object) {
        StringList result = new StringList();
        if (object != null) {
            if (object instanceof StringList) {
                result = (StringList) object;
            } else {
                result = FrameworkUtil.split((String) object, matrix.db.SelectConstants.cSelectDelimiter);
            }
        }
        return result;
    }
    
    public static StringList getStringListChangeObject (Object object) {
    	StringList slReturn = new StringList();
    	String sReturn = null;
		if(object instanceof String) {
			sReturn = (String)object;
			slReturn.add(sReturn);
		}else if(object instanceof StringList) {
			slReturn.addAll((StringList)object);
		}
		return slReturn;
    }

    /**
     * 넘어온 문자가 숫자인지 체크
     *
     * @param sValue
     * @return
     */
    public static boolean isNumericStr(String sValue) {
        return isNumericStr(sValue, false);
    }

    /**
     * 넘어온 문자가 숫자인지 체크
     *
     * @param sValue
     * @return
     */
    public static boolean isNumericStr(String sValue, boolean checkInteger) {
        if (isEmpty(sValue)) {
            return false;
        }
        boolean isNumber = true;
        boolean checkPoint = false;
        for (char c : sValue.toCharArray()) {
            if (c >= 48 && c <= 57) {
                continue;
            } else {
                if (!checkInteger && c == '.') {
                    if (!checkPoint) {
                        checkPoint = true;
                        continue;
                    } else {
                        isNumber = false;
                        break;
                    }
                } else {
                    isNumber = false;
                    break;
                }
            }
        }
        return isNumber;
    }

//    public static String getParentFullCode(String fullCode, String delimiter) {
//        String ret = "";
//        if (fullCode.indexOf(delimiter) > 0) {
//            ret = fullCode.substring(0, fullCode.lastIndexOf(delimiter));
//        }
//        return ret;
//    }

//    public static String getParentCode(String fullCode, String delimiter) {
//        String ret = "";
//        if (fullCode.indexOf(delimiter) > 0) {
//            String sParentFullCode = getParentFullCode(fullCode, delimiter);
//            ret = sParentFullCode.substring(sParentFullCode.lastIndexOf(".") + 1);
//        }
//        return ret;
//    }

//    public static String commifyString(String sValue) {
//        return commifyString(sValue, "#,###");
//    }

//    public static String commifyString(String sValue, String sPattern) {
//        if (ujuStringUtil.isEmpty(sValue) || !ujuStringUtil.isNumericStr(sValue))
//            return sValue;
//
//        DecimalFormat df = new DecimalFormat(sPattern);
//        return df.format(Double.valueOf(sValue)).toString();
//    }
    
    
	/**
     * String을 Empty 처리를 한다.
     * null일경우는 ""를 리턴하고, 그렇지 않을 경우는 양쪽 스페이스를 없애고 리턴한다.
     * @param str String 원본 String
     * @return String 원본 String가 null일 경우 "" 그렇지 않을 경우 trim 된 String
     */
    public static String setEmpty( String str ) {
        String ret = "";
        if( str != null ) {
            ret = str.trim();
        }
        return ret;
    }
    
    
    /**
	 * String이 Null이 아니며 공백이 아니면 true를 return
	 *
	 * @param string
	 * @return
	 */
	static public boolean isNotEmpty(String string) {
		return StringUtils.isNotEmpty(("null".equals(string) || "undefined".equals(string) ? "" : string));
	}
    
	/**
	 * String이 Null이거나 공백이면 true를 return
	 *
	 * @param string
	 * @return
	 */
	static public boolean isEmpty(String string) {
		return StringUtils.isEmpty(("null".equals(string) || "undefined".equals(string) ? "" : string));
	}
	
	/**
	 * isEmpty(String) 함수와 동일
	 *
	 * @param string
	 * @return
	 */
	static public boolean isNullString(String string) {
		return StringUtils.isEmpty(("null".equals(string) || "undefined".equals(string) ? "" : string));
	}

	/**
	 * isNotEmpty 함수와 동일
	 *
	 * @param arg
	 * @return
	 */
	public static boolean isNotNullString(String arg) {
		return (!isNullString(arg));
	}
	
	
	/**
	 * UTF-8 String을 8859-1로 변환한다.
	 *
	 * @param str
	 * @return
	 * @throws Exception
	 */
//	public static String encodeDefaultCharset(String str) throws Exception {
//		try {
//			return convertCharset(str, CHARACTERSET_UTF_8, "8859_1");
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}

	/**
	 * 8859-1 String을 UTF-8로 변환한다.
	 *
	 * @param str
	 * @return
	 * @throws Exception
	 */
//	public static String decodeDefaultCharset(String str) throws Exception {
//		try {
//			return convertCharset(str, "8859_1", CHARACTERSET_UTF_8);
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}

	/**
	 * String의 Character Set을 변환한다. (fromCharsetName to targetCharsetName)
	 *
	 * @param str
	 * @param fromCharsetName
	 * @param targetedCharsetName
	 * @return
	 * @throws Exception
	 */
//	public static String convertCharset(String str, String fromCharsetName, String targetedCharsetName) throws Exception {
//		try {
//			return new String(str.getBytes(fromCharsetName), targetedCharsetName);
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}

	/**
	 *
	 * String의 Character Set을 하여 Log에 출력한다. 조사 가능한 Character Set: euc-kr,
	 * ksc5601, iso-8859-1, 8859_1, ascii, UTF-8
	 *
	 * @param str
	 * @throws Exception
	 */
//	public static void testCharset(String str) throws Exception {
//		try {
//			Vector<String> listOfCharset = new Vector<String>();
//			ujuLoggerUtil.info("==>testCharset()");
//			ujuLoggerUtil.info("==>str:" + str);
//			listOfCharset.add(CHARACTERSET_EUC_KR);
//			listOfCharset.add(CHARACTERSET_KSC5601);
//			listOfCharset.add(CHARACTERSET_ISO_8859_1);
//			listOfCharset.add(CHARACTERSET_8859_1);
//			listOfCharset.add(CHARACTERSET_ASCII);
//			listOfCharset.add(CHARACTERSET_UTF_8);
//			String result = null;
//			int listOfCharsetSize = listOfCharset.size();
//			for (int i = 0; i < listOfCharsetSize; i++) {
//				result = new String(str.getBytes(), listOfCharset.get(i));
//				ujuLoggerUtil.info("==>result:" + listOfCharset.get(i) + ":" + result);
//			}
//			ujuLoggerUtil.info("==>Case2");
//			int listOfCharsetSize1 = listOfCharset.size();
//			for (int i = 0; i < listOfCharsetSize1; i++) {
//				int listOfCharsetSize2 = listOfCharset.size();
//				for (int j = 0; j < listOfCharsetSize2; j++) {
//					result = new String(str.getBytes(listOfCharset.get(j)), listOfCharset.get(i));
//					ujuLoggerUtil.info("==>result:" + listOfCharset.get(j) + "/" + listOfCharset.get(i) + ":" + result);
//				}
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}
	
	/**
	 *
	 * String의 줄바꿈(개행) 문자를 '&lt;br&gt;' 태그로 치환한다.
	 *
	 * @param str
	 * @return
	 * @throws Exception
	 */
//	public static String getStringForInputingByTextArea(String str) throws Exception {
//		try {
//			String result = "";
//			if (str != null) {
//				str = str.trim();
//				char arrayChar[] = str.toCharArray();
//				for (int i = 0; i < arrayChar.length; i++) {
//					if (arrayChar[i] == '\n') {
//						result = result + "<br>";
//					} else {
//						result = result + arrayChar[i];
//					}
//				}
//			}
//			return result;
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}
	
	/**
	 * String을 구분자(delimiter)로 잘라서 ArrayList로 반환한다.
	 *
	 * @param string
	 * @param delimiter
	 * @return
	 * @throws Exception
	 */
//	@SuppressWarnings({ "rawtypes", "unchecked" })
//	public static List getTokenizedList(String string, char delimiter) throws Exception {
//		try {
//			List resultList = new ArrayList();
//
//			StringBuilder sb = new StringBuilder();
//			if (string.length() == 0)
//				return resultList;
//
//			char stringArray[] = string.toCharArray();
//			int eos = stringArray.length - 1;
//			for (int i = 0; i < stringArray.length; i++) {
//				char tempChar = stringArray[i];
//				if (tempChar != delimiter && i == eos) {
//					sb.append(tempChar);
//				}
//				if (tempChar == delimiter || i == eos) {
//					resultList.add(sb.toString());
//					sb.setLength(0);
//				} else {
//					sb.append(tempChar);
//				}
//			}
//
//			return resultList;
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}
	
	
	/**
	 *
	 * String의 겹따옴표 문자(&quot;)를 '&amp;quot;'로 치환한다.
	 *
	 * @param str
	 * @return
	 * @throws Exception
	 */
//	public static String getValidedTextForView(String str) throws Exception {
//		try {
//			String tempStr = switchString(str, '\"', "&quot;");
//			return tempStr;
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}

	/**
	 *
	 * String의 작은 따옴표 문자(&#39;)를 "\'"로 치환한다.
	 *
	 * @param str
	 * @return
	 * @throws Exception
	 */
//	public static String getValidedTextForDB(String str) throws Exception {
//		try {
//			String tempStr = switchString(str, '\'', "\'\'");
//			return tempStr;
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}
	
	
	/**
	 *
	 * String의 "\\"을 "\\\\"로 치환하고, "\"을 "\\\"으로 치환한다.
	 *
	 * @param str
	 * @return
	 * @throws Exception
	 */
//	public static String getValidedTextOfTextField(String str) throws Exception {
//		try {
//			String tempStr = switchString(str, '\\', "\\\\");
//			tempStr = switchString(tempStr, '\"', "\\\"");
//			return tempStr;
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}
	
	
	/**
	 * String에서 regex로 주어진 문자(char)를 replacement에 주어진 문자열(String)로 치환한다.
	 *
	 * @param str
	 * @param regex
	 * @param replacement
	 * @return
	 * @throws Exception
	 */
//	public static String switchString(String str, char regex, String replacement) throws Exception {
//		try {
//			StringBuilder sb = new StringBuilder();
//			if (str != null) {
//				char arrayChar[] = str.toCharArray();
//				for (int i = 0; i < arrayChar.length; i++) {
//					if (arrayChar[i] == regex) {
//						sb.append(replacement);
//					} else {
//						sb.append(arrayChar[i]);
//					}
//				}
//			}
//			return sb.toString();
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//	}

	/**
	 * String에서 줄바꿈 제거 (exception 메시지를 alert으로 띄울 때 활용)
	 *
	 * @param str
	 * @return
	 */
//	public static String replaceSlashes(String str) {
//		if (isEmpty(str))
//			return "";
//		if (str.indexOf("@") > -1) {
//			str = StringUtils.substringAfterLast(str, "@");
//		}
//		int idxEx = StringUtils.indexOfIgnoreCase(str, "Exception: ");
//		if (idxEx > -1) {
//			str = StringUtils.substringAfter(str, "Exception: ");
//		}
//
//		str = StringUtils.replace(str, "\"", "\\\"");
//		StringBuilder b = new StringBuilder();
//		for (int i = 0; i < str.length(); i++) {
//			if ((byte) str.charAt(i) == 13) {
//				b.append(" ");
//			} else if ((byte) str.charAt(i) == 10) {
//				b.append("");
//			} else
//				b.append(str.charAt(i));
//		}
//		return b.toString();
//	}

	/**
	 * NULL Object String 을 Empty String 변환
	 *
	 * @param str
	 * @return
	 */
//	public static String replaceNullToEmptyString(String str) {
//		return str == null || "null".equals(str) || "undefined".equals(str) ? "" : str;
//	}

//	public static String replaceNullToEmptyString(Object str) {
//		return replaceNullToEmptyString((String) str);
//	}

	/**
	 *
	 * emxTableRowID에서 Object Id 얻기
	 *
	 * @param memberIds
	 * @return
	 * @throws Exception
	 */
//	public static StringList getObjectIds(String[] memberIds) throws Exception {
//		StringList strList = new StringList();
//		StringList objectIdList = new StringList();
//		String oid = "";
//		try {
//			if (memberIds != null && memberIds.length > 0) {
//				for (int i = 0; i < memberIds.length; i++) {
//					if (memberIds[i].indexOf("|") != -1) {
//						strList = FrameworkUtil.split(memberIds[i], "|");
//						if (strList.size() == 3) {
//							oid = (String) strList.get(0);
//						} else {
//							oid = (String) strList.get(1);
//						}
//					} else {
//						oid = memberIds[i];
//					}
//					objectIdList.add(oid);
//				}
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return objectIdList;
//	}

	/**
	 *
	 * @param memberIds
	 * @return
	 * @throws Exception
	 */
//	public static String getObjectId(String[] memberIds) throws Exception {
//		StringList strList = new StringList();
//		String oid = "";
//		try {
//			if (memberIds != null && memberIds.length > 0) {
//				if (memberIds[0].indexOf("|") != -1) {
//					strList = FrameworkUtil.split(memberIds[0], "|");
//					if (strList.size() == 3) {
//						oid = (String) strList.get(0);
//					} else {
//						oid = (String) strList.get(1);
//					}
//				}
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return oid;
//	}

	/**
	 *
	 * Mql Result
	 *
	 * @param result
	 * @return
	 * @throws Exception
	 */
//	public static String getMqlResultStr(Object result) throws Exception {
//		String resultStr = "";
//		try {
//			if (result == null || "".equals(result.toString()) || "null".equalsIgnoreCase(result.toString()))
//				return resultStr;
//
//			StringList resultList = FrameworkUtil.split(result.toString(), "|");
//			resultStr = resultList.get(3).toString();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return resultStr;
//	}

	/**
	 *
	 * Mql Result
	 *
	 * @param result
	 * @return
	 * @throws Exception
	 */
//	public static StringList getMqlResult(Object result) throws Exception {
//		StringList resultList = new StringList();
//		try {
//			if (result == null || "".equals(result.toString()) || "null".equalsIgnoreCase(result.toString()))
//				return resultList;
//
//			resultList = FrameworkUtil.split(result.toString(), "|");
//			resultList.remove(0);
//			resultList.remove(0);
//			resultList.remove(0);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return resultList;
//	}

	/**
	 *
	 * HTML Tag 치환
	 *
	 * @param input
	 * @return
	 */
//	public static String replaceTag(Object input) {
//		String result = (input == null ? "" : input.toString());
//		try {
//			StringBuffer filtered = new StringBuffer(result.length());
//			char c;
//			for (int i = 0; i <= result.length() - 1; i++) {
//				c = result.charAt(i);
//				switch (c) {
//				case '<':
//					filtered.append("&lt;");
//					break;
//				case '>':
//					filtered.append("&gt;");
//					break;
//				case '"':
//					filtered.append("&quot;");
//					break;
//				case '&':
//					filtered.append("&amp;");
//				case '\'':
//					filtered.append("&#39;");
//					break;
//				default:
//					filtered.append(c);
//				}
//			}
//			result = filtered.toString();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return result;
//	}

	/**
	 *
	 * 문자셋 변환 (8859_1 -> KSC5601)
	 *
	 * @param english
	 * @return
	 */
//	public static synchronized String E2K(String english) {
//		String korean = "";
//		if (english == null)
//			return "";
//		try {
//			korean = new String(english.getBytes("8859_1"), "KSC5601");
//		} catch (UnsupportedEncodingException e) {
//			korean = new String(english);
//		}
//		return korean;
//	}

	/**
	 *
	 * 문자셋 변환 (8859_1 -> UTF-8)
	 *
	 * @param english
	 * @return
	 */
//	public static synchronized String E2U(String english) {
//		String korean = "";
//		if (english == null)
//			return "";
//		try {
//			korean = new String(english.getBytes("8859_1"), "UTF-8");
//		} catch (UnsupportedEncodingException e) {
//			korean = new String(english);
//		}
//		return korean;
//	}

	/**
	 *
	 * 문자셋 변환 (UTF-8 -> 8859_1)
	 *
	 * @param english
	 * @return
	 */
//	public static synchronized String U2E(String english) {
//		String korean = "";
//		if (english == null)
//			return "";
//		try {
//			korean = new String(english.getBytes("UTF-8"), "8859_1");
//		} catch (UnsupportedEncodingException e) {
//			korean = new String(english);
//		}
//		return korean;
//	}

	/**
	 *
	 * 문자셋 변환 (UTF-8 -> EUC-KR)
	 *
	 * @param english
	 * @return
	 */
//	public static synchronized String U2K(String english) {
//		String korean = "";
//		if (english == null)
//			return "";
//		try {
//			korean = new String(english.getBytes("UTF-8"), "EUC-KR");
//		} catch (UnsupportedEncodingException e) {
//			korean = new String(english);
//		}
//		return korean;
//	}

	/**
	 *
	 * 문자셋 변환 (KSC5601 -> 8859_1)
	 *
	 * @param korean
	 * @return
	 */
//	public static synchronized String K2E(String korean) {
//		String english = "";
//		if (korean == null)
//			return "";
//		try {
//			english = new String(korean.getBytes("KSC5601"), "8859_1");
//		} catch (UnsupportedEncodingException e) {
//			english = new String(korean);
//		}
//		return english;
//	}

	/**
	 *
	 * String 배열을 StringList로 변환
	 *
	 * @param arrayStr
	 * @return
	 */
//	public static StringList toStringList(String[] arrayStr) {
//		StringList stringList = new StringList();
//		try {
//			if (arrayStr != null) {
//				for (int i = 0; i < arrayStr.length; i++) {
//					stringList.add(arrayStr[i]);
//				}
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return stringList;
//	}
	
	/**
     * String을 Empty 처리를 한다.
     * null일경우는 ""를 리턴하고, 그렇지 않을 경우는 양쪽 스페이스를 없애고 리턴한다.
     *
     * @param pParam          String 원본 String
     * @return String 원본 String가 null일 경우 "" 그렇지 않을 경우 trim 된 String
     */
//    public static String NVL(Object pParam) {
//        return NVL(pParam, "");
//    }

    /**
     * String을 Empty 처리를 한다.
     * null일경우는 strDefaultValue를 리턴하고, 그렇지 않을 경우는 양쪽 스페이스를 없애고 리턴한다.
     *
     * @param pParam          object
     * @param strDefaultValue pParam이 null일시 대체될 값
     * @return String 원본 String가 null일 경우 "" 그렇지 않을 경우 trim 된 String
     */
//    public static String NVL(Object pParam, String strDefaultValue) {
//        String ret = "";
//
//
//        if (pParam != null) {
//            if (pParam instanceof String) {
//                ret = (String) pParam;
//            } else {
//                ret = pParam.toString();
//            }
//
//            ret = ret.trim();
//            if (isEmpty(ret)) {
//                ret = strDefaultValue;
//            }
//        } else {
//            ret = strDefaultValue;
//        }
//        return ret;
//    }
    
    /**
     * 입력된 스트링에서 구분자(delimiter)를 하나의 단어로 인식하고 이 단어를 기준으로 문자열을 분리, 분리된 문자열을 배열에 할당하여 반환한다.
     * <p/>
     * <pre>
     *
     * [사용 예제]
     *
     * split2Array("AA-BBB--DDDD", "-",true)
     * ===>    AA
     *         BBB
     *
     *         DDDD
     *
     * split2Array("AA-BBB--DDDD", "-", false);
     * ===>    AA
     *         BBB
     *         DDDD
     *
     * split2Array("ABCDEABCDE", "BE", true)
     * ===> ABCDEABCDE
     *
     * </pre>
     *
     * @param strTarget
     * @param strDelimiter   구분자(delimiter)로 인식할 단어로서 결과 문자열에는 포함되지 않는다.
     * @param isIncludedNull 구분자로 구분된 문자열이 Null일 경우 결과값에 포함여부 ( true : 포함, false : 포함하지 않음. )
     * @return java.lang.String[]
     */
//    public static String[] split2Array(String strTarget, String strDelimiter, boolean isIncludedNull) {
//
//        int intIdx = 0;
//        String[] aryResultStrArray = null;
//
//        try {
//            Vector vecTempValues = new Vector();
//
//            String strCheck = new String(strTarget);
//            while (strCheck.length() != 0) {
//                int intBegin = strCheck.indexOf(strDelimiter);
//                if (intBegin == -1) {
//                    vecTempValues.add(strCheck);
//                    break;
//                } else {
//                    int intEnd = intBegin + strDelimiter.length();
//                    //	StringTokenizer는 구분자가 연속으로 중첩되어 있을 경우 공백 문자열을 반환하지 않음.
//                    // 따라서 아래와 같이 작성함.
//                    if (isIncludedNull) {
//                        vecTempValues.add(strCheck.substring(0, intBegin));
//                        strCheck = strCheck.substring(intEnd);
//                        if (strCheck.length() == 0) {
//                            vecTempValues.add(strCheck);
//                            break;
//                        }
//                    } else {
//                        if (!isEmpty(strCheck.substring(0, intBegin))) {
//                            vecTempValues.add(strCheck.substring(0, intBegin));
//                        }
//                        strCheck = strCheck.substring(intEnd);
//                    }
//
//                }
//            }
//
//            String[] aryTempStr = new String[0];
//            aryResultStrArray = (String[]) vecTempValues.toArray(aryTempStr);
//
//        } catch (Exception e) {
//            return aryResultStrArray;
//        }
//
//        return aryResultStrArray;
//    }

//    public static String getSelectAttributeName(Context context, String strAttributeName){
//    	
//    	return "attribute["+strAttributeName+"]";
//    }
    
    /**
    * token으로 구분한 배열을 중복제거후 리턴
    *
    * @param str
    * @param token
    * @return
    * @since 2016. 11. 9.
    * @auther MyeongHoi,Heo
    */
//    public static String removeDuplicateStringToken(String str, String token){   
//
//    	  String removeDubString="";	  
//    	  String[] array = StringUtils.split(str, token.trim());  
//    	  TreeSet ts=new TreeSet();
//    	  for(int i=0; i<array.length; i++){
//    		  ts.add(array[i]);
//    	  }	  
//    	  Iterator it=ts.iterator();
//
//    	  while(it.hasNext()){
//    		  removeDubString += (String)it.next()+token.trim();
//    	  }
//             removeDubString=removeDubString.substring(0, removeDubString.lastIndexOf(token.trim()));
//    	 return removeDubString;		  
//    }
    
    /**
     * 소수점 하위 값 제거
     *
     * @param sValue
     * @return
     */
    public static String removeDecimal(String sValue) {
        if (isNumericStr(sValue, false)) {
        	double sNum = Double.parseDouble(sValue);
            sValue = String.valueOf(Math.floor(sNum));
        }
        return removeDecimalZero(sValue);
    }
    public static String searchWordFilter(Object sParam) {
    	String str = DecStringUtil.nullToEmpty(sParam);
        try {
        	if (str.isEmpty()) {
                return str;
            }
	        // if first word is '*'
	        if (str.charAt(0) == '*') {
	            str = str.substring(1);
	        }
	        // if last word is '*'
	        int lastIndex = str.length() - 1;
	        if (str.charAt(lastIndex) == '*') {
	            str = str.substring(0, lastIndex);
	        }
        } catch (Exception e) {
            e.printStackTrace();    
        }
        return str;
    }
    
    /**
     * SelectConstants.cSelectDelimiter로 Split 하여 StringList로 반환
     *
     * @param obj
     * @return
     */
    public static StringList getSelectStringList(Object obj) {
        return getSelectStringList(obj, false);
    }

    public static StringList getSelectStringList(Object obj, boolean includeEmpty) {
        StringList slResult = new StringList();
        try {
            if (obj instanceof StringList) {
                slResult = (StringList) obj;
            } else {
                String sParamVal = (String) obj;
                if (isNotEmpty(sParamVal)) {
                    slResult = FrameworkUtil.splitString((String) obj, SelectConstants.cSelectDelimiter);
                } else if (includeEmpty) {
                    slResult.add(DecConstants.EMPTY_STRING);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return slResult;
    }
    
    /**
     * String을 Empty 처리를 한다.
     * null일경우는 ""를 리턴하고, 그렇지 않을 경우는 양쪽 스페이스를 없애고 리턴한다.
     *
     * @param pParam String 원본 String
     * @return String 원본 String가 null일 경우 "" 그렇지 않을 경우 trim 된 String
     */
    public static String NVL(Object pParam) {
        return NVL(pParam, "");

    }
    
    /**
     * String을 Empty 처리를 한다.
     * null일경우는 strDefaultValue를 리턴하고, 그렇지 않을 경우는 양쪽 스페이스를 없애고 리턴한다.
     *
     * @param pParam          object
     * @param strDefaultValue pParam이 null일시 대체될 값
     * @return String 원본 String가 null일 경우 "" 그렇지 않을 경우 trim 된 String
     */
    public static String NVL(Object pParam, String strDefaultValue) {
        String ret = "";


        if (pParam != null) {
            if (pParam instanceof String) {
                ret = (String) pParam;
            } else {
                ret = pParam.toString();
            }

            ret = ret.trim();
            if (isEmpty(ret)) {
                ret = strDefaultValue;
            }
        } else {
            ret = strDefaultValue;
        }
        return ret;
    }
    
    public static Boolean isEmpty(Object obj) {
    	if (obj instanceof String) return obj == null || "".equals(obj.toString().trim());
    	else if (obj instanceof List) return obj == null || ((List) obj).isEmpty(); 
    	else if (obj instanceof Map) return obj == null || ((Map) obj).isEmpty(); 
    	else if (obj instanceof Object[]) return obj == null || Array.getLength(obj) == 0; 
    	else return obj == null;
    }
    
    public static Boolean isNotEmpty(Object obj) {
    	return !isEmpty(obj);
    }
    public static Boolean isNotNull(Object obj) {
    	return obj != null;
    }
    
    public static boolean isInteger(String s) {
        try { 
            Integer.parseInt(s); 
        } catch(NumberFormatException e) { 
            return false; 
        } catch(NullPointerException e) {
            return false;
        }
        // only got here if we didn't return false
        return true;
    }
    
    public static boolean isLong(String s) {
    	try { 
    		Long.parseLong(s); 
    	} catch(NumberFormatException e) { 
    		return false; 
    	} catch(NullPointerException e) {
    		return false;
    	}
    	// only got here if we didn't return false
    	return true;
    }
}
