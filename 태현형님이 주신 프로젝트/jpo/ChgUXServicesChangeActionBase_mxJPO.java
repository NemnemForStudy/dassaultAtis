/*
 ** ${CLASSNAME}
 **
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 */

import com.dassault_systemes.enovia.e6wv2.foundation.FoundationUserException;
import com.dassault_systemes.enovia.e6wv2.foundation.ServiceConstants;
import com.dassault_systemes.enovia.e6wv2.foundation.db.JPOUtil;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Datacollection;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Datacollections;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Dataobject;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.ServiceParameters;
import com.dassault_systemes.enovia.enterprisechangemgtuxservice.webservice.ChangeActionService;
import com.dassault_systemes.enovia.enterprisechangemgtuxservice.webservice.ChangeOrderService;
import com.dassault_systemes.enovia.enterprisechangemgtuxservice.webservice.ChangeRequestService;

import matrix.db.Context;
/**
 * The <code>ChgUXServicesChangeOrderBase</code> class contains implementation code for change order web service.
 * @version Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 */
public class ChgUXServicesChangeActionBase_mxJPO extends emxDomainObject_mxJPO implements ServiceConstants
{
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * Constructor.
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds no arguments.
     * @throws Exception if the operation fails.
     * @since ECM R211
     */
    public ChgUXServicesChangeActionBase_mxJPO (Context context, String[] args)
      throws Exception
    {
        super(context, args);
    }

    /**
     * This function supports the service data/JPO handling.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollection getChangeActions(final Context context, final String[] args) throws FoundationUserException {
    	try {
        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
        Datacollection changeAction = parameters.getDatacollection();
        //get specific change action info or user change orders
        if (changeAction.getDataobjects().isEmpty()) {
        	// code to through error
          changeAction = ChangeActionService.getUserChangeActions(context, parameters);
        } else {
        	changeAction = ChangeActionService.getChangeActionInfo(context, parameters);
        }
        return changeAction;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports the change hold/resume/cancel service data/JPO handling.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException 
     */
    static public Dataobject processChangeActionAction(final Context context, final String[] args) throws FoundationUserException {
    	try {
        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
        Dataobject doChangeObj = new Dataobject();
        Datacollection dcChangeObject = ChangeActionService.processChangeActionAction(context, parameters);
        if(!dcChangeObject.getDataobjects().isEmpty()) {
        	doChangeObj = dcChangeObject.getDataobjects().get(0);    
        }
        return doChangeObj;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports the change action access service data/JPO handling.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollections getChangeActionAccessBits(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        final Datacollections dcChangeObjects = new Datacollections();
	        Datacollection dcChangeObject = ChangeActionService.getChangeActionAccessBits(context, parameters);  
	        dcChangeObjects.getDatacollections().add(dcChangeObject);
	        return dcChangeObjects;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}	        
    }     
    
	/**
     * This function supports getGovernedData items service.
      * @param context
      * @param args
      * @return 
      * @throws FoundationUserException
      */   
    static public Datacollection getGovernedData(final Context context, final String[] args)throws FoundationUserException {
 	   try {
 	       final ServiceParameters parameters = JPOUtil.unpackArgs(args);
 	       return ChangeActionService.getGovernedData(context, parameters);
 		}catch(Exception ex) {
 			ex.printStackTrace();
 			throw new FoundationUserException(ex.getMessage());
 		}
     } 
	 
    /**
     * This function supports get contexts items service.
      * @param context
      * @param args
      * @return 
      * @throws FoundationUserException
      */   
    static public Datacollections getContextItems(final Context context, final String[] args)throws FoundationUserException {
 	   try {
 	       final ServiceParameters parameters = JPOUtil.unpackArgs(args);
 	       return ChangeActionService.getContextItems(context, parameters);
 		}catch(Exception ex) {
 			ex.printStackTrace();
 			throw new FoundationUserException(ex.getMessage());
 		}
     }     
         
    /**
   * This function supports get change action issues service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
   static public Datacollections getIssues(final Context context, final String[] args)throws FoundationUserException {
	   try {
	       final ServiceParameters parameters = JPOUtil.unpackArgs(args);        
	       return ChangeActionService.getIssues(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }    
    
     /**
     * This function supports connect/disconnect contexts items.
      * @param context
      * @param args
      * @return 
      * @throws FoundationUserException
      */
    static public Datacollection updateContextItems(final Context context, final String[] args) throws FoundationUserException {
 	   try {
 	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
 			return ChangeActionService.updateContextItems(context,serviceParameters);
 		}catch(Exception ex) {
 			ex.printStackTrace();
 			throw new FoundationUserException(ex.getMessage());
 		}
     }
    
    /**
     * This function supports the members service data/JPO handling.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollections getMembers(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        final Datacollections dcChangeObjects = new Datacollections();
	        Datacollection dcChangeObject = new Datacollection();
	    	dcChangeObject = ChangeActionService.getMembers(context, parameters);  
	    	dcChangeObjects.getDatacollections().add(dcChangeObject);      
	        return dcChangeObjects;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
        
    /**
     * This function supports add/remove members of change request.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException 
     */
    static public Datacollection updateMembers(final Context context, final String[] args) throws FoundationUserException {
    	try {
        	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
    		return ChangeActionService.updateMembers(context,serviceParameters);
    	}catch(Exception ex) {
    		ex.printStackTrace();
    		throw new FoundationUserException(ex.getMessage());
    	}
    } 
    
    /**
     * This function supports the service to get change order of change action object.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollections getCAChangeOrder(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);     
	        final Datacollections dcsChangeOrder = new Datacollections();                      
	        Datacollection dcChangeOrder = ChangeActionService.getCAChangeOrderInfo(context, parameters); 
	        dcsChangeOrder.getDatacollections().add(dcChangeOrder);
	        return dcsChangeOrder;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
}
