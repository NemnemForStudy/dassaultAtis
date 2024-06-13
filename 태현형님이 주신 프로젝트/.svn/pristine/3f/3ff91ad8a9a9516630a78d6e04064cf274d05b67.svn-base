package com.dec.util;

import java.io.UnsupportedEncodingException;

import org.apache.log4j.Logger;

public class DecLoggerUtil {

	static Logger logger = Logger.getLogger(DecLoggerUtil.class);

	/**
	 * DEBUG 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void debug(String message) {
		logger.debug(message);
	}

	/**
	 * INFO 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void info(String message) {
		logger.info(message);
	}

	/**
	 * WARN 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void warn(String message) {
		logger.warn(message);
	}

	/**
	 * ERROR 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void error(String message) {
		logger.error(message);
	}

	/**
	 * FATAL 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void fatal(String message) {
		// logger.fatal(message);
		logger.error(message);
	}

	/**
	 * DEBUG 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void debug(String message, Throwable throwable) {
		logger.debug(message, throwable);
	}

	/**
	 * INFO 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void info(String message, Throwable throwable) {
		logger.info(message, throwable);
	}

	/**
	 * WARN 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void warn(String message, Throwable throwable) {
		logger.warn(message, throwable);
	}

	/**
	 * ERROR 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void error(String message, Throwable throwable) {
		logger.error(message, throwable);
	}

	/**
	 * FATAL 레벨 이상에서 출력된다.
	 *
	 * @param message
	 */
	public static void fatal(String message, Throwable throwable) {
		// logger.fatal(message, throwable);
		logger.error(message, throwable);
	}

	/**
	 * 파라미터의 값 message에 대하여 new String(message.getBytes("8859_1"), "UTF-8")
	 * String을 INFO 레벨 이상에서 출력된다.
	 *
	 * @param message
	 * @throws UnsupportedEncodingException
	 */
	public static void infoDecodedDefaultCharset(String message) throws UnsupportedEncodingException {
		logger.info(new String(message.getBytes("8859_1"), "UTF-8"));
	}

}