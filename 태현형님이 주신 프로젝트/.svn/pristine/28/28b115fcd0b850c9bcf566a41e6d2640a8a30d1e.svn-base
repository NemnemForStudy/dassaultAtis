/*
 * emxImageManagerBase
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 *
 */
import matrix.db.*;
import matrix.util.*;

import java.util.*;
import java.util.List;

import com.dec.util.DecConstants;
import com.matrixone.apps.common.CommonImageConverterRemoteExec;
import com.matrixone.apps.common.util.ComponentsUIUtil;
import com.matrixone.apps.domain.*;
import com.matrixone.apps.domain.util.*;


/**
 * This JPO class has some methods pertaining to Image Holder type.
 * @author schakravarthy
 * @version ProductCentral 10.6.1.0  - Copyright (c) 2005, MatrixOne, Inc.
 */
public class emxImageManager_mxJPO extends emxImageManagerBase_mxJPO
{

	private static final String FILE_EXT_JPG = "jpg";
	private static final String FILE_EXT_3DXML = "3dxml";
	private static final String FILE_EXT_CGR = "cgr";
    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since VCP 10.5.0.0
     * @grade 0
     */
    public emxImageManager_mxJPO (Context context, String[] args)
        throws Exception
    {
        super(context, args);
    }

    /**
     * This method is executed if a specific method is not specified.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @returns nothing
     * @throws Exception if the operation fails
     * @since VCP 10.5.0.0
     */
    public int mxMain(Context context, String[] args)
        throws Exception
    {
        if (true)
        {
            //throw new Exception(ComponentsUtil.i18nStringNow("emxComponents.Generic.MethodOnCommonFile", context.getLocale().getLanguage()));
            throw new Exception(EnoviaResourceBundle.getProperty(context, "emxPersonOrgModelStringResource", context.getLocale(), "emxComponents.Generic.MethodOnCommonFile"));//need to check where to add this key(ie in which properties file)
        }
        return 0;
    }
    
    /**
     * Deletes Image Holder object once the object that is associated with Image Holder is deleted
     * @param context the eMatrix <code>Context</code> object
     * @param args holds one argument
     *   args[0] - imageHolderID - id of the from Object
     * @return  0 if operation is Success.
     * @throws Exception if the operation fails
     * @since Common V6R2008-1
     */
     public int deleteDecImageHolder(Context context, String[] args) throws Exception
     {
         String imageHolderID =args[0];
         boolean contextPushed = false;
         if(imageHolderID != null && !"".equals(imageHolderID) && !"null".equalsIgnoreCase(imageHolderID))
         {

             DomainObject objImageHolder = new DomainObject(imageHolderID);

             if(objImageHolder.exists(context))
             {
                 try
                 {
                     ContextUtil.pushContext(context);
                     contextPushed = true;
                     String IsHolderconnected = (String)objImageHolder.getInfo(context, "from["+DecConstants.RELATIONSHIP_DECIMAGEHOLDER+"]");
                     if("True".equalsIgnoreCase(IsHolderconnected)){
                     	return 0;
                     }
                     objImageHolder.deleteObject(context, true);
                 }
                 catch(Exception e)
                 {
                     String[] formatArgs = {imageHolderID};
                     String message =  ComponentsUIUtil.getI18NString(context, "emxComponents.ImageManagerBase.UnableToDeleteObject",formatArgs);
                     throw new FrameworkException(message);
                 }
                 finally
                 {
                     if(contextPushed)
                     {
                         ContextUtil.popContext(context);
                     }
                 }
             }
         }
         return 0;
     }
}
