/*
 ** ${CLASSNAME}
 **
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 */

import java.util.ArrayList;
import java.util.List;

import com.dassault_systemes.enovia.e6wv2.foundation.FoundationUserException;
import com.dassault_systemes.enovia.e6wv2.foundation.ServiceConstants;
import com.dassault_systemes.enovia.e6wv2.foundation.db.JPOUtil;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Datacollection;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Datacollections;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Dataobject;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.ServiceParameters;
import com.dassault_systemes.enovia.enterprisechangemgtuxservice.webservice.ChangeOrderService;

import matrix.db.Context;
/**
 * The <code>ChgUXServicesChangeOrderBase</code> class contains implementation code for change order web service.
 * @version Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 */
public class ChgUXServicesChangeOrderBase_mxJPO extends emxDomainObject_mxJPO implements ServiceConstants
{
	
    /**
     * Constructor.
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds no arguments.
     * @throws Exception if the operation fails.
     * @since ECM R211
     */
    public ChgUXServicesChangeOrderBase_mxJPO (Context context, String[] args)
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
    static public Datacollection getChangeOrders(final Context context, final String[] args) throws FoundationUserException {
    	try {
        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
        Datacollection changeOrder = parameters.getDatacollection();
        //get specific change order info or user change orders
        if (changeOrder.getDataobjects().isEmpty()) {
        	changeOrder = ChangeOrderService.getUserChangeOrders(context, parameters);
        } else {
        	changeOrder = ChangeOrderService.getChangeOrderInfo(context, parameters);
        }
        return changeOrder;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
   
	 /**
     * This function supports Create a new change order service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException 
     */
    static public Datacollection updateChangeOrder(final Context context, final String[] args) throws FoundationUserException {
    	try {
        final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
        	return ChangeOrderService.createChangeOrder(context, serviceParameters);          
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }

    /**
     * This function supports get change orchestration service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollections getChangeOrchestration(final Context context, final String[] args)throws FoundationUserException {
    	try {
        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
        final Datacollections dcChangeObjects = new Datacollections();
    	Datacollection dcChangeObject = ChangeOrderService.getChangeOrchestration(context, parameters);
        	dcChangeObjects.getDatacollections().add(dcChangeObject);
        return dcChangeObjects;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }

    /**
     * This function supports get change orchestration information service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollections getChangeOrchestrationInfo(final Context context, final String[] args)throws FoundationUserException {
    	try {
        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
        final Datacollections dcChangeObjects = new Datacollections();
        List<String> lsChanges = new ArrayList<String>();
        List<Dataobject> lsChangeObjects = parameters.getDatacollection().getDataobjects();
        for(int i=0; i<lsChangeObjects.size();i++) {
        	Dataobject doChange = lsChangeObjects.get(i);
        	lsChanges.add(doChange.getId());
        }
    	Datacollection dcChangeObject = ChangeOrderService.getChangeOrchestrationInfo(context,lsChanges, parameters);
        	dcChangeObjects.getDatacollections().add(dcChangeObject);
        return dcChangeObjects;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports the change order access service data/JPO handling.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollections getChangeOrderAccessBits(final Context context, final String[] args) throws FoundationUserException {
    	try {
        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
        final Datacollections dcChangeObjects = new Datacollections();
        Datacollection dcChangeObject = ChangeOrderService.getChangeOrderAccessBits(context, parameters);  
        dcChangeObjects.getDatacollections().add(dcChangeObject);
        return dcChangeObjects;
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
        	dcChangeObject = ChangeOrderService.getMembers(context, parameters);  
        	dcChangeObjects.getDatacollections().add(dcChangeObject);
            return dcChangeObjects;
        }catch(Exception ex) {
        	ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
        }       
    }
        
    /**
     * This function supports add/remove members of change order.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
    static public Datacollection updateMembers(final Context context, final String[] args) throws FoundationUserException {
		try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeOrderService.updateMembers(context,serviceParameters); 
		} catch (Exception ex) {
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
    static public Dataobject processChangeOrderAction(final Context context, final String[] args) throws FoundationUserException {
    	try {
        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
        Dataobject doChangeObj = new Dataobject();
        Datacollection dcChangeObject = ChangeOrderService.processChangeOrderAction(context, parameters);
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
     * This function supports connect/disconnect existing change order/action for change orchestration service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
    static public Datacollection processChangeOrchestrationAction(final Context context, final String[] args) throws FoundationUserException {
		try {
    		final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeOrderService.processChangeOrchestrationAction(context,serviceParameters);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		} 
    }    
    
    /**
     * This function supports the service to get change request of change order object.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollections getCOChangeRequest(final Context context, final String[] args) throws FoundationUserException {
    	try {
        final ServiceParameters parameters = JPOUtil.unpackArgs(args);     
        final Datacollections dcsChangeRequest = new Datacollections();                      
        Datacollection dcChangeRequest = ChangeOrderService.getCOChangeRequestInfo(context, parameters); 
        dcsChangeRequest.getDatacollections().add(dcChangeRequest);
        return dcsChangeRequest;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
    * This function supports get change order issues service.
    * @param context
    * @param args
    * @return 
    * @throws FoundationUserException
    */   
    static public Datacollections getIssues(final Context context, final String[] args)throws FoundationUserException {
       try {
       final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	       return ChangeOrderService.getIssues(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }

    /**
     * This function supports get reported against items service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollections getReportedAgainstItems(final Context context, final String[] args)throws FoundationUserException {
    	try {
        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
        	return ChangeOrderService.getReportedAgainstItems(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    } 
    
    /**
     * This function supports connect/disconnect reported against items.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollection updateReportedAgainstItems(final Context context, final String[] args) throws FoundationUserException {
		try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeOrderService.updateReportedAgainstItems(context,serviceParameters); 
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		} 
    }    
}





