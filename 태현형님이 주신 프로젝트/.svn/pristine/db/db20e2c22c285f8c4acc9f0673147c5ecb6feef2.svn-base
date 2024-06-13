package com.dassault_systemes.enovia.processsteps;

import com.dassault_systemes.enovia.processsteps.services.impl.ProcessStepsXML;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.ContextUtil;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;

/**
 * This program generates XML for configuration of Process Dashboard for
 * Dassault Systemes' DOCO product UI. The details of the generation are
 * described in RFL in PES. This program is to be executed from MQL command
 * line. The program produces traces under <ENOVIA Server installation dir/logs.
 *
 * @author Dassault Systemes
 *
 */
public class GenerateProcessStepsXML_mxJPO {

	private static final String	CONST_TRACE_XML_GENERATION		= "XMLGeneration";
	private static final String	CONST_FILE_XML_GENERATION_LOG	= "XMLGeneration.log";

	private void initialize(Context context) throws ProcessStepsException {
	}

	public GenerateProcessStepsXML_mxJPO(Context context, String[] args) throws ProcessStepsException {
		try {
			traceBeginMethod(context);

			traceBegin(context, "Initializing Begins");
			initialize(context);
			traceEnd(context, "Initializing Ends");

		}
		catch (Exception exp) {
			traceError(context, exp.getMessage());
			throw new ProcessStepsException(exp);
		}
		finally {
			traceEndMethod(context);
		}
	}

	/**
	 * Entry point of the migration program.
	 *
	 * @param context
	 *            ENOVIA Context object
	 * @param args
	 *            The command line arguments
	 * @throws ProcessStepsException
	 *             if operation fails
	 * @throws MatrixException
	 */
	public static void mxMain(Context context, String[] args) throws MatrixException, Exception {
		try {
			System.out.println("---- Beginning program execution ---- ");
			boolean traceON = true;
			boolean allSession = false; // false for only this session

			context.setTrace(CONST_FILE_XML_GENERATION_LOG, CONST_TRACE_XML_GENERATION, traceON, allSession);
			traceBeginMethod(context);

			runInTransaction(context, new Callable() {

				@Override
				public Object run(Context context, String... args) throws ProcessStepsException {
					if (args.length < 2) {
						System.out.println("----Please try again, insufficient number of arguments ---- " + args.length);
					}
					else {
						try {
							System.out.println("----Executing program with argument count ---- " + args.length);
							JPO.invoke( context, "com.dassault_systemes.enovia.processsteps.GenerateProcessStepsXML", null, "run", args, null);
						} catch (Exception e) {
							throw new ProcessStepsException(e);
						}
					}
					return null;
				}
			}, args);

		}
		catch (Exception exp) {
			ContextUtil.abortTransaction(context);
			traceError(context, exp.getMessage());
			throw new ProcessStepsException(exp);
		}
		finally {
			traceEndMethod(context);
		}
	}

	/**
	 * Starts the data migration.
	 *
	 * @param context
	 *            ENOVIA Context object
	 * @throws ProcessStepsException
	 *             if operation fails
	 */
	public void run(Context context, String[] args) throws ProcessStepsException {
		try {
			traceBeginMethod(context);

			System.out.println("----Generating Process Dashboard configuration XML for policy ----");
			try {
				String currentPolicy = args[0];
				String targetLocation = args[1];
				String type = DomainConstants.EMPTY_STRING;
				if (args.length == 3) {
					type = args[2];
				}
				new ProcessStepsXML(context, currentPolicy, targetLocation, type);
			}
			catch (Exception exp) {
				traceError(context, exp.getMessage());
				throw new ProcessStepsException(exp);
			}
		}
		finally {
			traceEndMethod(context);
		}
	}

	/**
	 * Prints trace message for trace type XMLGeneration
	 *
	 * @param context
	 *            ENOVIA Context object
	 * @param message
	 *            The message to be printed in trace
	 * @throws ProcessStepsException
	 *             if operation fails
	 */
	private static void trace(Context context, String message) throws ProcessStepsException {
		try {
			context.printTrace(CONST_TRACE_XML_GENERATION, message);
		}
		catch (MatrixException exp) {
			traceError(context, exp.getMessage());
			throw new ProcessStepsException(exp);
		}
	}

	/**
	 * Print "Begin: " token before trace message
	 *
	 * @param context
	 *            ENOVIA Context object
	 * @param message
	 *            The message to be printed in trace
	 * @throws ProcessStepsException
	 *             if operation fails
	 */
	private static void traceBegin(Context context, String message) throws ProcessStepsException {
		trace(context, "Begin: " + message);
	}

	/**
	 * Print "End: " token before trace message
	 *
	 * @param context
	 *            ENOVIA Context object
	 * @param message
	 *            The message to be printed in trace
	 * @throws ProcessStepsException
	 *             if operation fails
	 */
	private static void traceEnd(Context context, String message) throws ProcessStepsException {
		trace(context, "End: " + message);
	}

	/**
	 * Print "ERROR: " token before trace message
	 *
	 * @param context
	 *            ENOVIA Context object
	 * @param message
	 *            The message to be printed in trace
	 * @throws ProcessStepsException
	 *             if operation fails
	 */
	private static void traceError(Context context, String message) throws ProcessStepsException {
		trace(context, "ERROR: " + message);
	}

	/**
	 * Print "End: <method name>" trace message
	 *
	 * @param context
	 *            ENOVIA Context object
	 * @throws ProcessStepsException
	 *             if operation fails
	 */
	private static void traceEndMethod(Context context) throws ProcessStepsException {
		String methodName = getTracedMethodName();
		traceEnd(context, methodName + "()");
	}

	/**
	 * Print "End: <method name>" trace message
	 *
	 * @param context
	 *            ENOVIA Context object
	 * @throws ProcessStepsException
	 *             if operation fails
	 */
	private static void traceBeginMethod(Context context) throws ProcessStepsException {
		String methodName = getTracedMethodName();
		traceBegin(context, methodName + "()");
	}

	/**
	 * Returns the name of the method being traced. This SHOULD NOT be called by
	 * any client other than traceBeginMethod and traceEndMethod methods.
	 *
	 * @return the method name
	 */
	private static String getTracedMethodName() {
		Exception exp = new Exception();
		StackTraceElement[] stes = exp.getStackTrace();
		StackTraceElement ste = stes[2];
		String methodName = ste.getMethodName();
		return methodName;
	}

	/**
	 * makes sure that transaction is successfully commit/abort.
	 *
	 * @param context
	 *            the ENOVIA Context Object
	 * @param callable
	 *            Callable interface instance
	 * @param args
	 *            parameters that will be used in run method.
	 * @return Object anything the user want to
	 * @throws ProcessStepsException
	 *             if invalid parameters, if operation fails due to some other
	 *             reason
	 */
	public static Object runInTransaction(Context context, Callable callable, String... args) throws ProcessStepsException {
		try {
			ContextUtil.startTransaction(context, true);
			try {
				final Object obj = callable.run(context, args);
				ContextUtil.commitTransaction(context);
				return obj;
			}
			catch (final Exception e) {
				ContextUtil.abortTransaction(context);
				throw new ProcessStepsException(e);
			}
		}
		catch (final Exception e) {
			throw new ProcessStepsException(e);
		}
	}

	public static interface Callable {
		public Object run(Context context, String... args) throws ProcessStepsException;
	}

}
