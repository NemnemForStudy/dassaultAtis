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
import com.dassault_systemes.enovia.enterprisechangemgtuxservice.webservice.ImpactAnalysisService;

import matrix.db.Context;
/**
 * The <code>ChgUXServicesImpactAnalysisBase</code> class contains implementation code for impact analysis web service.
 * @version Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 */
public class ChgUXServicesImpactAnalysisBase_mxJPO extends emxDomainObject_mxJPO implements ServiceConstants
{
	
    /**
     * Constructor.
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds no arguments.
     * @throws Exception if the operation fails.
     * @since ECM R424
     */
    public ChgUXServicesImpactAnalysisBase_mxJPO (Context context, String[] args)
      throws Exception
    {
        super(context, args);
    }
 
    /**
     * This function supports the impact analysis details.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollection getImpactAnalysisInfo(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ImpactAnalysisService.getImpactAnalysisInfo(context, parameters);  	        
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}	        
    }    
    
    /**
     * This function supports the service data/JPO handling.
     * @param context
     * @param args
     * @return list of impact basis items
     * @throws FoundationUserException
     */
    static public Datacollections getImpactBasis(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ImpactAnalysisService.getImpactBasis(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    }
    
    /**
     * This function supports the service data/JPO handling.
     * @param context
     * @param args
     * @return list of impacted items items
     * @throws FoundationUserException
     */
    static public Datacollections getImpactedItems(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ImpactAnalysisService.getImpactedItems(context, parameters);
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
    static public Datacollections getAttachment(final Context context, final String[] args)throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	    	return ImpactAnalysisService.getAttachment(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
    } 
    
    /**
     * This function supports the impact analysis access service data/JPO handling.
     * @param context
     * @param args
     * @return
     * @throws FoundationUserException
     */
    static public Datacollection getAccessBits(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ImpactAnalysisService.getAccessBits(context, parameters);  	        
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}	        
    }         

    /**
     * This function supports the service data/JPO handling.
     * @param context
     * @param args
     * @return list of contributors
     * @throws FoundationUserException
     */
    static public Datacollections getContributors(final Context context, final String[] args) throws FoundationUserException {
    	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ImpactAnalysisService.getContributors(context, parameters);
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
   static public Datacollection updateContributors(final Context context, final String[] args) throws FoundationUserException {
	   try {
	    	final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ImpactAnalysisService.updateContributors(context,serviceParameters);
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
   static public Datacollection updateImpactBasis(final Context context, final String[] args) throws FoundationUserException {
	   try {
	   		final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ImpactAnalysisService.updateImpactBasis(context,serviceParameters);
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
   static public Datacollection updateImpactedItems(final Context context, final String[] args) throws FoundationUserException {
	   try {
	   		final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ImpactAnalysisService.updateImpactedItems(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
   } 
   
   /**
    * This function supports set Why(reason) For ImpactBasis
    * @param context
    * @param args
    * @return 
    * @throws FoundationUserException
    */
   public static Datacollection setWhyForImpactBasis(final Context context, final String[] args) throws FoundationUserException {
	   try {
	   		final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ImpactAnalysisService.setWhyForImpactBasis(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
   }
   
   /**
    * This function supports set Why(reason) For ImpactedItems
    * @param context
    * @param args
    * @return 
    * @throws FoundationUserException
    */
   public static Datacollection setWhyForImpactedItems(final Context context, final String[] args) throws FoundationUserException {
	   try {
	   		final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ImpactAnalysisService.setWhyForImpactedItems(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
   }
      /**
    * This function supports set Status For ImpactedItems
    * @param context
    * @param args
    * @return 
    * @throws FoundationUserException
    */
   public static Datacollection setStatusForImpactedItems(final Context context, final String[] args) throws FoundationUserException {
	   try {
	   		final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ImpactAnalysisService.setStatusForImpactedItems(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
   }
       
       
   /**
    * This function supports the service data/JPO handling.
    * @param context
    * @param args
    * @return list of contributors
    * @throws FoundationUserException
    */
   static public Datacollections getImplementingChangeActions(final Context context, final String[] args) throws FoundationUserException {
   	try {
	        final ServiceParameters parameters = JPOUtil.unpackArgs(args);
	        return ImpactAnalysisService.getImplementingChangeActions(context, parameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
   }
   
   /**
    * This function supports connect Impacted Items As Proposed And CA to IA
    * @param context
    * @param args
    * @return 
    * @throws FoundationUserException
    */
   public static Datacollection connectImpactedItemsAsProposedAndCAtoIA(final Context context, final String[] args) throws FoundationUserException {
	   try {
	   		final ServiceParameters serviceParameters = (ServiceParameters)JPOUtil.unpackArgs(args);
			return ImpactAnalysisService.connectImpactedItemsAsProposedAndCAtoIA(context,serviceParameters);
		}catch(Exception ex) {
			ex.printStackTrace();
			throw new FoundationUserException(ex.getMessage());
		}
   }
       
}





