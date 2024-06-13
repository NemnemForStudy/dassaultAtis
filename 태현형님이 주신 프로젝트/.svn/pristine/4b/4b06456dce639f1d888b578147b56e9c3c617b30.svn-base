/*
**
**   Copyright (c) 1992-2020 Dassault Systemes.
**   All Rights Reserved.
**   This program contains proprietary and trade secret information of Dassault Systemes,
**   Inc.  Copyright notice is precautionary only
**   and does not evidence any actual or intended publication of such program
*/
import java.util.Map;
import matrix.db.Context;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;

/**
 * @author VJN1 * 
 */

public class emxIssueStateNameSortBase_mxJPO extends emxCommonBaseComparator_mxJPO
{
    private Context context;
    private static final String STATE = "State";
    private static final String DIR   = "dir";
    private static final String FRAMEWORK = "emxFrameworkStringResource";
   
    /**
     * emxIssueStateNameSortBase JPO Constructor
     * @param context
     * @param args
     * @throws Exception
     */
    public emxIssueStateNameSortBase_mxJPO(Context context, String[] args)
        throws Exception
    {
        this.context = context;
    }

    /**
     * Default Constructor.
     */

    public emxIssueStateNameSortBase_mxJPO ()
    {
        try {
            this.context = ContextUtil.getAnonymousContext();
        } catch (Exception e) {}
    }

    /**
     * This method used for comparing objects based on state name.
     *
     * @param object1 Map contains column Values
     * @param object2 Map contains column Values
     * @return integer representing the comparision value
     */

    public int compare (Object object1,Object object2) 
    {
        Map map1 = (Map)object1;
        Map map2 = (Map)object2;
        Map sortKeys = getSortKeys();
        String keyDir  = (String) sortKeys.get(DIR);
        String stringValue1 = (String) map1.get(STATE); 
        String stringValue2 = (String) map2.get(STATE);

        String stateDisplayName_1 = EnoviaResourceBundle.getProperty(context, FRAMEWORK, context.getLocale(), "emxFramework.State.Issue."+stringValue1.replace(" ","_"));
        String stateDisplayName_2 = EnoviaResourceBundle.getProperty(context, FRAMEWORK, context.getLocale(), "emxFramework.State.Issue."+stringValue2.replace(" ","_"));
        int diff = 0; 
            
        try {
            diff = stateDisplayName_1.compareToIgnoreCase(stateDisplayName_2);
        } catch (Exception e) {
        	System.out.println("error message = "+e.getMessage());
            throw new RuntimeException(e.getMessage());
        } 
                   
        return ("ascending".equals(keyDir)? diff : -diff);
    }
}
