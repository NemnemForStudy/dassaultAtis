/*
 ** ${CLASS:${CLASSNAME}}
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
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.ServiceParameters;
import com.dassault_systemes.enovia.enterprisechangemgtuxservice.webservice.ChangeRequestService;
import com.dassault_systemes.enovia.enterprisechangemgtuxservice.webservice.ConnectedChangeService;

import matrix.db.Context;
/**
 * The <code>ChgUXServicesConnectedChangeBase</code> class contains implementation code for connected change web service.
 * @version Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 */
public class ChgUXServicesConnectedChangeBase_mxJPO extends emxDomainObject_mxJPO implements ServiceConstants
{
	
    /**
     * Constructor.
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds no arguments.
     * @throws Exception if the operation fails.
     * @since ECM R424
     */
    public ChgUXServicesConnectedChangeBase_mxJPO (Context context, String[] args)
      throws Exception
    {
        super(context, args);
    }
        
    /**
     * This function supports the service data/JPO handling.
     * @param context
     * @param args
     * @return change actions
     * @throws FoundationUserException
     */
    static public Datacollections getProposedChangeActions(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ConnectedChangeService.getProposedChangeActions(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
   /**
     * This function supports the service data/JPO handling.
     * @param context
     * @param args
     * @return change actions
     * @throws FoundationUserException
     */
    static public Datacollection connectImpactedItemsAsProposed(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ConnectedChangeService.connectImpactedItemsAsProposed(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports the service data/JPO handling.
     * @param context
     * @param args
     * @return change actions
     * @throws FoundationUserException
     */
    static public Datacollection connectAffectedItemsAsAnalysisBasis(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ConnectedChangeService.connectAffectedItemsAsAnalysisBasis(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
	/**
     * This function support merging of change action.
     * @param context
     * @param args
     * @return change actions
     * @throws FoundationUserException
     */
    static public Datacollection mergeChangeAction(final Context context, final String[] args) throws FoundationUserException {
    	try {
	       final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
	        return ConnectedChangeService.mergeChangeAction(context, serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
	
    /**
     * This function supports orchestrate Items For Change
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException 
     */
    static public Datacollection orchestrateItemsForChange(final Context context, final String[] args) throws FoundationUserException {
    	try {
        	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
    		return ConnectedChangeService.orchestrateItemsForChange(context,serviceParameters);
    	}catch(Exception ex) {
    		ex.printStackTrace();
    		throw new FoundationUserException(ex.getMessage());
    	}
    }
    
    /**
     * This function supports dispatch to Child CR
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException 
     */
    static public Datacollection dispatchImpactAnalysisToChildCR(final Context context, final String[] args) throws FoundationUserException {
    	try {
        	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
    		return ConnectedChangeService.dispatchImpactAnalysisToChildCR(context,serviceParameters);
    	}catch(Exception ex) {
    		ex.printStackTrace();
    		throw new FoundationUserException(ex.getMessage());
    	}
    }
    
    /**
     * This function supports dispatch from Parent CR
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException 
     */
    static public Datacollection dispatchImpactAnalysisFromParentCR(final Context context, final String[] args) throws FoundationUserException {
    	try {
        	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
    		return ConnectedChangeService.dispatchImpactAnalysisFromParentCR(context,serviceParameters);
    	}catch(Exception ex) {
    		ex.printStackTrace();
    		throw new FoundationUserException(ex.getMessage());
    	}
    }
    
    
    /**
     * This function supports delete Impact Analysis
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException 
     */
    static public Datacollection deleteImpactAnalysis(final Context context, final String[] args) throws FoundationUserException {
    	try {
        	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
    		return ConnectedChangeService.deleteImpactAnalysis(context,serviceParameters);
    	}catch(Exception ex) {
    		ex.printStackTrace();
    		throw new FoundationUserException(ex.getMessage());
    	}
    }
   
    /**
     * This function supports get list of parent from CR Id.
       * @param context
       * @param args
       * @return 
       * @throws FoundationUserException
       */   
     static public Datacollection listOfIAFromParent(final Context context, final String[] args)throws FoundationUserException {
   	   try {
   	       final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);        
   	       return ConnectedChangeService.listOfIAFromParent(context, serviceParameters);
   		}catch(Exception ex) {
   			ex.printStackTrace();
   			throw new FoundationUserException(ex.getMessage());
   		}
      }    
     
    
    /**
     * This function supports generic Resource Fetch  (CVFetch Wrapper)
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException 
     */
    static public Datacollection genericResourceFetch(final Context context, final String[] args) throws FoundationUserException {
    	try {
        	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
    		return ConnectedChangeService.genericResourceFetch(context,serviceParameters);
    	}catch(Exception ex) {
    		ex.printStackTrace();
    		throw new FoundationUserException(ex.getMessage());
    	}
    }
    
    static public Datacollection getLicense(final Context context, final String[] args) throws FoundationUserException {
    	try {
        	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
    		return ConnectedChangeService.getLicense(context,serviceParameters);
    	}catch(Exception ex) {
    		ex.printStackTrace();
    		throw new FoundationUserException(ex.getMessage());
    	}
    }
    
    /**
     * This function supports fetch applicability from
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException 
     */
    // VMN8
    static public Datacollection fetchApplicabilityFrom(final Context context, final String[] args) throws FoundationUserException {
    	try {
        	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
    		return ConnectedChangeService.fetchApplicabilityFrom(context,serviceParameters);
    	}catch(Exception ex) {
    		ex.printStackTrace();
    		throw new FoundationUserException(ex.getMessage());
    	}
    }
    
    
    
}





