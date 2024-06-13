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
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.ServiceParameters;
import com.dassault_systemes.enovia.enterprisechangemgtuxservice.webservice.ChangeRequestService;

import matrix.db.Context;
/**
 * The <code>ChgUXServicesChangeOrderBase</code> class contains implementation code for change request web service.
 * @version Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 */
public class ChgUXServicesChangeRequestBase_mxJPO extends emxDomainObject_mxJPO implements ServiceConstants
{
	
	/**
     * Constructor.
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds no arguments.
     * @throws Exception if the operation fails.
     * @since ECM R423
     *
     */	 
    public ChgUXServicesChangeRequestBase_mxJPO (Context context, String[] args)
      throws Exception
    {
        super(context, args);
    }

    /**
     * This function supports the change request service data/JPO handling.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollection getChangeRequests(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        Datacollection dcChangeRequest = parameters.getDatacollection();
	        //get specific change request info or user change requests
	        if (dcChangeRequest.getDataobjects().isEmpty()) {
	        	dcChangeRequest = ChangeRequestService.getUserChangeRequests(context, parameters);
	        } else {
	        	dcChangeRequest = ChangeRequestService.getChangeRequestInfo(context, parameters);
	        }
	        return dcChangeRequest;
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
	    	dcChangeObject = ChangeRequestService.getMembers(context, parameters);  
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
    		return ChangeRequestService.updateMembers(context,serviceParameters);
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
    static public Datacollection processChangeRequestAction(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ChangeRequestService.processChangeRequestAction(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }    

    /**
     * This function supports the change request access service data/JPO handling.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollections getChangeRequestAccessBits(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        final Datacollections dcChangeObjects = new Datacollections();
	        Datacollection dcChangeObject = ChangeRequestService.getChangeRequestAccessBits(context, parameters);  
	        dcChangeObjects.getDatacollections().add(dcChangeObject);
	        return dcChangeObjects;
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
	    	Datacollection dcChangeObject = ChangeRequestService.getChangeOrchestration(context, parameters);
	        dcChangeObjects.getDatacollections().add(dcChangeObject);
	        return dcChangeObjects;
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports get affected items service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollections getAffectedItems(final Context context, final String[] args)throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	    	return ChangeRequestService.getAffectedItems(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports get impact analysis service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollections getImpactAnalysis(final Context context, final String[] args)throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	    	return ChangeRequestService.getImpactAnalysis(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports get impact analysis summary service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollections getImpactAnalysisSummary(final Context context, final String[] args)throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	    	return ChangeRequestService.getImpactAnalysisSummary(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports get impact analysis summary service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollections impactAnalysisForRolledUpViewSummary(final Context context, final String[] args)throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	    	return ChangeRequestService.impactAnalysisForRolledUpViewSummary(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    

    /**
     * This function supports get impact analysis attachment service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollections getImpactAnalysisAttachment(final Context context, final String[] args)throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	    	return ChangeRequestService.getImpactAnalysisAttachment(context, parameters);
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
			return ChangeRequestService.processChangeOrchestrationAction(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    } 
    

    /**
     * This function supports connect/disconnect existing change request for Impact Analysis service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
    static public Datacollection processImpactAnalysisAction(final Context context, final String[] args) throws FoundationUserException {
    	try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.processImpactAnalysisAction(context,serviceParameters);
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
	        return ChangeRequestService.getReportedAgainstItems(context, parameters);
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
	    	return ChangeRequestService.updateReportedAgainstItems(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports connect/disconnect affected items.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
    static public Datacollection updateAffectedItems(final Context context, final String[] args) throws FoundationUserException {
    	try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.updateAffectedItems(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    } 
    
    /**
     * This function supports connect/disconnect affected items.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
    static public Datacollection moveAffectedItems(final Context context, final String[] args) throws FoundationUserException {
    	try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.moveAffectedItems(context,serviceParameters);
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
	       return ChangeRequestService.getContextItems(context, parameters);
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
			return ChangeRequestService.updateContextItems(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }     

    /**
   * This function supports get change request issues service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
   static public Datacollections getIssues(final Context context, final String[] args)throws FoundationUserException {
	   try {
	       final ServiceParameters parameters = JPOUtil.unpackArgs(args);        
	       return ChangeRequestService.getIssues(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }    
    
   
   
    /**
    * This function supports get CR attachment service.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */   
   static public Datacollections getAttachment(final Context context, final String[] args)throws FoundationUserException {
	   try {
	       final ServiceParameters parameters = JPOUtil.unpackArgs(args);        
	   	   return ChangeRequestService.getAttachment(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }    
      
    /**
    * This function supports connect/disconnect impact analysis contributors.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
   static public Datacollection updateImpactAnalysisContributors(final Context context, final String[] args) throws FoundationUserException {
	   try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.updateImpactAnalysisContributors(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
   /**
    * This function supports connect/disconnect impact analysis impact basis.
    * @param context
    * @param args
    * @return 
    * @throws FoundationUserException
    */   
   static public Datacollection updateIAImpactBasis(final Context context, final String[] args) throws FoundationUserException {
	   try {
	   		final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.updateIAImpactBasis(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
   } 
   
   /**
    * This function supports connect/disconnect impact analysis impacted items.
    * @param context
    * @param args
    * @return 
    * @throws FoundationUserException
    */
   static public Datacollection updateIAImpactedItems(final Context context, final String[] args) throws FoundationUserException {
	   try {
	   		final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.updateIAImpactedItems(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
   } 
   
   /**
    * This function supports Cancel child impact analysis.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
   static public Datacollection cancelChangeAnalysis(final Context context, final String[] args) throws FoundationUserException {
	   try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.cancelChangeAnalysis(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    } 
	 /**
    * This function supports Duplicate impact analysis.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
   static public Datacollection duplicateChangeAnalysis(final Context context, final String[] args) throws FoundationUserException {
	   try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.duplicateChangeAnalysis(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
   
   /**
    * This function supports list of IA from Parent.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
   static public Datacollection listOfIAFromParent(final Context context, final String[] args) throws FoundationUserException {
	   try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.listOfIAFromParent(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
   
   
   /**
    * This function supports Duplicate impact analysis.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
   static public Datacollection dispatchImpactAnalysisFromParentCR(final Context context, final String[] args) throws FoundationUserException {
	   try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.dispatchImpactAnalysisFromParentCR(context,serviceParameters);
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
			return ChangeRequestService.dispatchImpactAnalysisToChildCR(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    } 
   
   /**
    * This function supports refine impact analysis.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
   static public Datacollection refineChangeAnalysis(final Context context, final String[] args) throws FoundationUserException {
	   try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.refineChangeAnalysis(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    } 
   
   
   
   
   /**
    * This function supports set Why(reason for change) For AffectedItems.
     * @param context
     * @param args
     * @return 
     * @throws FoundationUserException
     */
   static public Datacollection setWhyForAffectedItems(final Context context, final String[] args) throws FoundationUserException {
	   try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ChangeRequestService.setWhyForAffectedItems(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    } 
}






