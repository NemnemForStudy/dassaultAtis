// MSFProductCentralUtil.java
//
// Copyright (c) 1992-2020 Dassault Systemes.
// All Rights Reserved
// This program contains proprietary and trade secret information of
// MatrixOne, Inc.  Copyright notice is precautionary only and does
// not evidence any actual or intended publication of such program.

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import com.matrixone.apps.domain.util.MapList;

/**
 * The <code>MSFProductCentralUtil</code> class represents the JPO for
 * obtaining the MS Office integration menus
 */
public class MSFProductCentralUtil_mxJPO 
{

/**
   * Constructs a new MSFProductCentralUtil JPO object.
   *
   * @param context the eMatrix <code>Context</code> object
   * @param args an array of String arguments for this method
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */
  public MSFProductCentralUtil_mxJPO (Context context, String[] args)
      throws Exception
  {
    // Call the super constructor
    super();
  }
   
  /**
   * Get Products of a the current user
   * Returns a maplist of the current users Product ids
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */

   public static MapList getCurrentUserProducts(Context context, String[] args) throws MatrixException
   {
     MapList productOwnedList = new MapList();
	 MapList productAllList = new MapList();
	 MapList productList = new MapList();
	 
     try
     {
		productOwnedList = (MapList)JPO.invoke(context, "emxProduct", null, "getOwnedProducts", args, MapList.class);
		productAllList = (MapList)JPO.invoke(context, "emxProduct", null, "getAllProducts", args, MapList.class);
		
		productList.addAll(productOwnedList);
		productList.addAll(productAllList);
     }
     catch (Exception ex) 
     {
       throw (new MatrixException("emxMsoiProductCentralUtil:getCurrentUserProducts : " + ex.toString()) );
     }
     return productList;
   }

  /**
   * Get the folders of a Product
   * Returns a maplist of features 
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */

   public static MapList getOwnedContextFeatures(Context context, String[] args) throws MatrixException
   {
     MapList featureList = new MapList();
	 MapList logicalFeatureList = new MapList();
	 MapList manufacturingFeatureList = new MapList();
	 MapList configurationFeatureList = new MapList();
	 
     try
     {
		logicalFeatureList = (MapList)JPO.invoke(context, "LogicalFeature", null, "getLogicalFeatureStructure", args, MapList.class);
		manufacturingFeatureList = (MapList)JPO.invoke(context, "ManufacturingFeature", null, "getManufacturingFeatureStructure", args, MapList.class);
		configurationFeatureList = (MapList)JPO.invoke(context, "ConfigurationFeature", null, "getConfigurationFeatureStructure", args, MapList.class);
		
		featureList.addAll(logicalFeatureList);
		featureList.addAll(manufacturingFeatureList);
		featureList.addAll(configurationFeatureList);
     }
     catch (Exception ex) 
     {
       throw (new MatrixException("emxMsoiProductCentralUtil:getOwnedContextFeatures: " + ex.toString()) );
     }
     return featureList;
   }

  /**
   * Get the folders of a Product
   * Returns a maplist of features 
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */

   public static MapList getCurrentUserFeatures(Context context, String[] args) throws MatrixException
   {
     MapList featureList = new MapList();
	 MapList logicalFeatureList = new MapList();
	 MapList manufacturingFeatureList = new MapList();
	 MapList configurationFeatureList = new MapList();
	 
     try
     {
		//Logically Current User Features are Owned features. Hence not calling getTopLevelLogicalFeatures getTopLevelManufacturingFeatures getTopLevelConfigurationFeatures
		logicalFeatureList = (MapList)JPO.invoke(context, "LogicalFeature", null, "getTopLevelOwnedLogicalFeatures", args, MapList.class);
		manufacturingFeatureList = (MapList)JPO.invoke(context, "ManufacturingFeature", null, "getTopLevelOwnedManufacturingFeatures", args, MapList.class);
		configurationFeatureList = (MapList)JPO.invoke(context, "ConfigurationFeature", null, "getTopLevelOwnedConfigurationFeatures", args, MapList.class);
		
		featureList.addAll(logicalFeatureList);
		featureList.addAll(manufacturingFeatureList);
		featureList.addAll(configurationFeatureList);
     }
     catch (Exception ex) 
     {
       throw (new MatrixException("emxMsoiProductCentralUtil:getCurrentUserFeatures: " + ex.toString()) );
     }
     return featureList;
   }
   
  /**
   * Get the sub folders of a Product
   * Returns a maplist of sub features 
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */

   public static MapList getOptionList(Context context, String[] args) throws MatrixException
   {
     MapList subFeatureList = new MapList();
	 MapList subLogicalFeatureList = new MapList();
	 MapList subManufacturingFeatureList = new MapList();
	 MapList subConfigurationList = new MapList();
	 
     try
     {
		subLogicalFeatureList = (MapList)JPO.invoke(context, "LogicalFeature", null, "getLogicalFeatureStructure", args, MapList.class);
		subManufacturingFeatureList = (MapList)JPO.invoke(context, "ManufacturingFeature", null, "getManufacturingFeatureStructure", args, MapList.class);
		subConfigurationList = (MapList)JPO.invoke(context, "ConfigurationFeature", null, "getConfigurationFeatureStructure", args, MapList.class);
		
		subFeatureList.addAll(subLogicalFeatureList);
		subFeatureList.addAll(subManufacturingFeatureList);
		subFeatureList.addAll(subConfigurationList);
	 }
     catch (Exception ex) 
     {
       throw (new MatrixException("emxMsoiProductCentralUtil:getOptionList: " + ex.toString()) );
     }
     return subFeatureList;
   }

  /**
   * Get the requirements of a Product
   * Returns a maplist of requirements 
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */

   public static MapList getCurrentUserRequirements(Context context, String[] args) throws MatrixException
   {
     MapList requirementList = new MapList();
     try
     {
		requirementList = (MapList)JPO.invoke(context, "emxRequirement", null, "getOwnedRequirements", args, MapList.class);
     }
     catch (Exception ex) 
     {
       throw (new MatrixException("emxMsoiProductCentralUtil:getCurrentUserRequirements: " + ex.toString()) );
     }
     return requirementList;
   }

  /**
   * Get the requirements of a Product
   * Returns a maplist of requirements 
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */

   public static MapList getRelatedRequirements(Context context, String[] args) throws MatrixException
   {
     MapList requirementList = new MapList();
	 MapList ownedList = new MapList();
	 MapList assignedList = new MapList();
	 MapList allList = new MapList();
     try
     {
		ownedList = (MapList)JPO.invoke(context, "emxRequirement", null, "getOwnedRequirements", args, MapList.class);
		assignedList = (MapList)JPO.invoke(context, "emxRequirement", null, "getAssignedRequirements", args, MapList.class);
		allList = (MapList)JPO.invoke(context, "emxRequirement", null, "getAllRequirements", args, MapList.class);
		
		requirementList.addAll(ownedList);
		requirementList.addAll(assignedList);
		requirementList.addAll(allList);
     }
     catch (Exception ex) 
     {
       throw (new MatrixException("emxMsoiProductCentralUtil:getRelatedRequirements: " + ex.toString()) );
     }
     return requirementList;
   }

  /**
   * Get the builds of a Product
   * Returns a maplist of builds 
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */

   public static MapList getCurrentUserBuilds(Context context, String[] args) throws MatrixException
   {
     MapList buildsList = new MapList();
	 MapList ownedBuildsList = new MapList();
	 MapList allBuildsList = new MapList();
	 
     try
     {
		ownedBuildsList = (MapList)JPO.invoke(context, "emxBuild", null, "getOwnedBuilds", args, MapList.class);
		allBuildsList = (MapList)JPO.invoke(context, "emxBuild", null, "getAllBuilds", args, MapList.class);
		
		buildsList.addAll(ownedBuildsList);
		buildsList.addAll(allBuildsList);
     }
     catch (Exception ex) 
     {
       throw (new MatrixException("emxMsoiProductCentralUtil:getCurrentUserBuilds: " + ex.toString()) );
     }
     return buildsList;
   }

  /**
   * Get the test cases of a Product
   * Returns a maplist of test cases 
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */

   public static MapList getRelatedTestCases(Context context, String[] args) throws MatrixException
   {
     MapList testCasesList = new MapList();
     try
     {
    	 testCasesList = (MapList)JPO.invoke(context, "emxTestCase", null, "getRelatedTestCases", args, MapList.class);
     }
     catch (Exception ex) 
     {
       throw (new MatrixException("emxMsoiProductCentralUtil:getRelatedTestCases: " + ex.toString()) );
     }
     return testCasesList;
   }

  /**
   * Get the use cases of a Product
   * Returns a maplist of use cases 
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */

   public static MapList getRelatedUseCases(Context context, String[] args) throws MatrixException
   {
     MapList useCasesList = new MapList();
     try
     {
    	 useCasesList = (MapList)JPO.invoke(context, "emxUseCase", null, "getRelatedUseCases", args, MapList.class);
     }
     catch (Exception ex) 
     {
    	 throw (new MatrixException("emxMsoiProductCentralUtil:getRelatedUseCases: " + ex.toString()) );
     }
     return useCasesList;
   }
}
