import com.dassault_systemes.enovia.route.ekl.RouteEKL;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.framework.ui.UIUtil;

import matrix.db.Context;


public class emxRouteEKLBase_mxJPO extends emxDomainObject_mxJPO {

  /**
   *
   * @param context the eMatrix <code>Context</code> object
   * @param args holds no arguments
   * @throws Exception if the operation fails
   * @since 2021x
   * @grade 0
   */
  public emxRouteEKLBase_mxJPO(Context context, String[] args) throws Exception {
    super(context, args);
  }


  /**
   * This method is executed if a specific method is not specified.
   *
   * @param context the eMatrix <code>Context</code> object
   * @param args holds no arguments
   * @returns nothing
   * @throws Exception if the operation fails
   * @since 2021x
   */
  public int mxMain(Context context, String[] args)
  throws Exception
  {
    if (!context.isConnected())
    	throw new Exception(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(),"emxComponents.Generic.NotSupportedOnDesktopClient"));
    return 0;
  }




  public int createAndStartRouteFromEKL(Context context, String[] args) throws Exception {	
	 	String strContextObjectId = args[0];
		String strContextObjectPolicy = args[1];
		String strContextObjectOwner = args[2];
		String contextObjectTypeName = args[3];
		String eventType = args[4];
		RouteEKL routeEkl = new RouteEKL();
		try {
			MqlUtil.mqlCommand(context, "set env $1 $2", "MX_TASK_AUTO_COMPLETE_EKL","true");
			routeEkl.createRouteEKL(context, strContextObjectId, strContextObjectPolicy,contextObjectTypeName, strContextObjectOwner,eventType);
			MqlUtil.mqlCommand(context, "unset env $1", "MX_TASK_AUTO_COMPLETE_EKL");
		}catch(Exception ex) {
			MqlUtil.mqlCommand(context, "unset env $1", "MX_TASK_AUTO_COMPLETE_EKL");
			String strCommand = "notice $1";
			String msg = ex.getMessage();
			if(UIUtil.isNotNullAndNotEmpty(msg) && msg.contains("java.lang.Exception:")) {
				msg = msg.replace(" java.lang.Exception:", "");
			}
			MqlUtil.mqlCommand(context, strCommand, msg);
            return 1;
		}
	 return 0;
}
}
