/*
 **  DECProdStructureHelper
 **
 **  Copyright Dassault Systemes, 1992-2007.
 **  All Rights Reserved.
 **  This program contains proprietary and trade secret information of Dassault Systemes and its 
 **  subsidiaries, Copyright notice is precautionary only
 **  and does not evidence any actual or intended publication of such program
 **
 */
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.Vector;

import matrix.db.AttributeItr;
import matrix.db.AttributeList;
import matrix.db.BusinessObject;
import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.Policy;
import matrix.db.Relationship;
import matrix.db.RelationshipWithSelect;
import matrix.util.StringList;

import com.matrixone.MCADIntegration.server.MCADServerException;
import com.matrixone.MCADIntegration.server.MCADServerResourceBundle;
import com.matrixone.MCADIntegration.server.MCADServerSettings;
import com.matrixone.MCADIntegration.server.beans.IEFBaselineHelper;
import com.matrixone.MCADIntegration.server.beans.IEFIntegAccessUtil;
import com.matrixone.MCADIntegration.server.beans.IEFSimpleConfigObject;
import com.matrixone.MCADIntegration.server.beans.IEFSimpleObjectExpanderWithView;
import com.matrixone.MCADIntegration.server.beans.MCADMxUtil;
import com.matrixone.MCADIntegration.server.beans.MCADServerGeneralUtil;
import com.matrixone.MCADIntegration.server.cache.IEFGlobalCache;
import com.matrixone.MCADIntegration.utils.MCADAppletServletProtocol;
import com.matrixone.MCADIntegration.utils.MCADGlobalConfigObject;
import com.matrixone.MCADIntegration.utils.MCADLocalConfigObject;
import com.matrixone.MCADIntegration.utils.MCADUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.i18nNow;
// Modified by hslee on 2023.08.21
// import com.matrixone.apps.framework.ui.UITableIndented;
import com.matrixone.apps.framework.ui.decUITableIndented;
import com.matrixone.jdom.Element;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.DomainConstants;
import matrix.db.RelationshipType;

public class DECProdStructureHelper_mxJPO
{
	public DECProdStructureHelper_mxJPO(Context context,String[] argv)
	{
	}

	public int mxMain(Context context, String []argv)  throws Exception
	{  
		return 0;
	}

   /**
     * Update Display Filter attribute from folder to content.
     * Update the value of DisplayOnFilter property of a relationship to false
     * @param context the eMatrix Context object
     * @param args[0]: From Object Id
     * @param args[1]: To Object Id
     * @param args[2]: relationship name
     * @return void
     * @throws Exception if the operation fails
     * @since TMC V6R2015x
     * @grade 0
     */
     public void createAsssocDrawingRelConnection(matrix.db.Context context, String[] args ) throws Exception
     {
        System.out.println("- TRIGGER .. createAsssocDrawingRelConnection--");
         try {
			String sFromOidCADModel = args[0];
			String sToOidCADDrwg = args[1];
			System.out.println("-sFromOidCADModel--"+sFromOidCADModel);
			System.out.println("-sToOidCADDrwg--"+sToOidCADDrwg);
            StringList objectSelects = new StringList();
            String attributeIsVersionObject = PropertyUtil.getSchemaProperty(context, "attribute_IsVersionObject");
            String IS_VERSION_OBJECT = "attribute["+ attributeIsVersionObject +"]";
            objectSelects.addElement(IS_VERSION_OBJECT);
			String[]oids = {sFromOidCADModel};
            MapList mlist = DomainObject.getInfo(context, oids, objectSelects);
            Iterator itr = mlist.iterator();
            boolean isVersionObject = false;
            while(itr.hasNext())
            {
                Map<String, String> m = (Map<String,String>)itr.next();
                String isVersion = m.get(IS_VERSION_OBJECT);
                if( isVersion != null && "true".equalsIgnoreCase(isVersion))
                {
                    isVersionObject = true;
                    break;
                }

            }
			System.out.println("-isVersionObject--"+isVersionObject);			
           if(!isVersionObject) {
                createReverseDrawingConnection(context,sFromOidCADModel,sToOidCADDrwg);
            }
         } catch (Exception ex) {
             ex.printStackTrace();
         }
    }

    /**
     * Update the value of DisplayOnFilter property of a relationship between folder and Content to true
     * @param context the eMatrix Context object
     * @param args[0]: From Object Id
     * @param args[1]: To Object Id
     * @param args[2]: relationship name
     * @return void
     * @throws Exception if the operation fails
     * @since TMC V6R2015x
     * @grade 0
     */
    public void deleteAsssocDrawingRelConnection(matrix.db.Context context, String[] args ) throws Exception
    {
        System.out.println("-DELETE TRIGGER .. deleteAsssocDrawingRelConnection--");
         try {
			String sFromOidCADModel = args[0];
			String sToOidCADDrwg = args[1];
			System.out.println("-DELETE--sFromOidCADModel--"+sFromOidCADModel);
			System.out.println("-DELETE--sToOidCADDrwg--"+sToOidCADDrwg);
            StringList objectSelects = new StringList();
            String attributeIsVersionObject = PropertyUtil.getSchemaProperty(context, "attribute_IsVersionObject");
            String IS_VERSION_OBJECT = "attribute["+ attributeIsVersionObject +"]";
            objectSelects.addElement(IS_VERSION_OBJECT);
			String[]oids = {sFromOidCADModel};
            MapList mlist = DomainObject.getInfo(context, oids, objectSelects);
            Iterator itr = mlist.iterator();
            boolean isVersionObject = false;
            while(itr.hasNext())
            {
                Map<String, String> m = (Map<String,String>)itr.next();
                String isVersion = m.get(IS_VERSION_OBJECT);
                if( isVersion != null && "true".equalsIgnoreCase(isVersion))
                {
                    isVersionObject = true;
                    break;
                }

            }
			System.out.println("-DELETE isVersionObject--"+isVersionObject);			
           if(!isVersionObject) {
                deleteReverseDrawingConnection(context,sFromOidCADModel,sToOidCADDrwg);
            }
         } catch (Exception ex) {
             ex.printStackTrace();
         }
    }	
	
    private void createReverseDrawingConnection(Context context, String fromObjId, String toObjId) throws Exception {
		System.out.println("- in.. createReverseDrawingConnection--");
	   try {
		DomainObject domFromTmp = DomainObject.newInstance(context, toObjId);
		String[] toSideArray = new String[]{fromObjId};
		String relName = PropertyUtil.getSchemaProperty(context, "relationship_ReverseAssociatedDrawing");
		Map mpVariantDef = domFromTmp.addRelatedObjects(context, new RelationshipType(relName), true, toSideArray);
		String sRelId = (String) mpVariantDef.get(toObjId);
		System.out.println("-connection done--");			
         } catch (Exception ex) {
             ex.printStackTrace();
         }					
	}	

    private void deleteReverseDrawingConnection(Context context, String fromObjId, String toObjId) throws Exception {
	System.out.println("- in.. deleteReverseDrawingConnection--");
	   try {
		
		String[] toSideArray = new String[]{toObjId};
		String relName = PropertyUtil.getSchemaProperty(context, "relationship_ReverseAssociatedDrawing");
		
		StringList slSelects = new StringList(1);
		slSelects.addElement("from["+relName+"|to.id=='"+fromObjId+"'].id");
					
		MapList mlObjInfo = DomainObject.getInfo(context, toSideArray, slSelects);
		
		System.out.println("-mlObjInfo--"+mlObjInfo);	
		HashMap hmTemp = (HashMap)mlObjInfo.get(0);
		String selectedRelId = (String) hmTemp.get("from["+relName+"].id");
		System.out.println("-selectedRelId--"+selectedRelId);	
		if(selectedRelId!=null && selectedRelId.length() != 0){

				String args[] = new String[] {selectedRelId};				
				MCADMxUtil.executeMQL("delete connection $1", context, args);
		
		}
         } catch (Exception ex) {
             ex.printStackTrace();
         }					
	}
}


