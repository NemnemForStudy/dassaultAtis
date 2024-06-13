/**
 * emxStatusReport.java
 *
 * Copyright (c) 2002-2020 Dassault Systemes.
 * All Rights Reserved
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */

import matrix.db.*;

/**
 * The <code>${CLASSNAME}</code> class represents the Status Report JPO
 * functionality for the DPM type.
 */
public class emxStatusReport_mxJPO extends emxStatusReportBase_mxJPO
{

    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since AEF 10.0.SP4
     * @grade 0
     */
    public emxStatusReport_mxJPO (Context context, String[] args)
        throws Exception
    {
      super(context, args);
    }
}

