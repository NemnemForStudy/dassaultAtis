/* Class defining basic infrastructure, contains common data members required
   for executing any IEF related actions.
 */

import java.util.StringTokenizer;
import com.matrixone.MCADIntegration.server.MCADServerResourceBundle;
import com.matrixone.MCADIntegration.server.cache.IEFGlobalCache;
import com.matrixone.MCADIntegration.utils.MCADUtil;
import com.matrixone.apps.domain.DomainConstants;

import matrix.db.BusinessObject;
import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.MQLCommand;
import matrix.util.StringList;

import com.matrixone.MCADIntegration.server.beans.MCADMxUtil;



public class GetClonedObjects_mxJPO
{

	public GetClonedObjects_mxJPO (Context context, String[] args)
	throws Exception
	{
	}
	
	public String getClonedObjects(Context context,String[] args) throws Exception
	{
		IEFGlobalCache globalcache	= new IEFGlobalCache();
		MCADServerResourceBundle serverResourceBundle = new MCADServerResourceBundle(context.getSession().getLanguage());
		MCADMxUtil util	= new MCADMxUtil(context, serverResourceBundle, globalcache);
		
		StringList physicalIdList = (StringList) util.getClonedObjects(context, args[1]);
		
		String result = MCADUtil.getDelimitedStringFromCollection(physicalIdList, ",");		
		
		return result;
	}
	
	public String getDuplicateObjects(Context context,String[] args) throws Exception
	{
		  String xmlOutput= "";
		try
		{
		    String type = "";
			String name = "";
			String phid = args[0]; 
            String attrMCADIntegSourceObj = MCADMxUtil.getActualNameForAEFData(context, "attribute_MCADInteg-SourceObj");
            String attrIsVersionObject	= MCADMxUtil.getActualNameForAEFData(context, "attribute_IsVersionObject");			
	 
	    MQLCommand mql = new MQLCommand();
		String query1 = "print bus " + phid + " select type name dump |";
		mql.executeCommand(context, query1);
	    String type_and_name = mql.getResult();
		StringTokenizer token = new StringTokenizer(type_and_name,"|");
		while(token.hasMoreTokens())
		{
		    type = token.nextToken().trim();
			name = token.nextToken().trim();
		}		
		
		String query2 = "temp query bus " + type + " " + name + " * where " + "\"attribute[" + attrIsVersionObject + "] match False\" select attribute[" + attrMCADIntegSourceObj + "] dump";
		mql.executeCommand(context, query2);
	    String result2 = mql.getResult(); 
		
		StringTokenizer result2Token = new StringTokenizer(result2,"\n");
        String result_row = result2Token.nextToken();
		
		StringTokenizer rowTok2 = new StringTokenizer(result_row,",");
        
		String result2Tok_row = "";
		String result2Tok_type = "";
		String result2Tok_name = "";
		String result2Tok_rev = "";
		
		/*while(rowTok2.hasMoreTokens())
		{
		    result2Tok_row = "";
		    result2Tok_row = rowTok2.nextToken();
			
			System.out.println("result2Tok_row: " + result2Tok_row); 
		}*/
		
		if(rowTok2.hasMoreTokens())
		result2Tok_type = rowTok2.nextToken();
		if(rowTok2.hasMoreTokens())
		result2Tok_name = rowTok2.nextToken();
		if(rowTok2.hasMoreTokens())
		result2Tok_rev = rowTok2.nextToken();
		if(rowTok2.hasMoreTokens())
		result2Tok_row = rowTok2.nextToken(); 		
	
	    result2Tok_row = result2Tok_row.trim();
		
	    String source_phid = "";
	    if(result2Tok_row.equals(""))
		    source_phid = phid;
		else
        {		
		 StringTokenizer strTok1 = new StringTokenizer(result2Tok_row,"|");
         source_phid = strTok1.nextToken();
        }	
		
		String query3 = "print bus " + source_phid + " select name dump";
		mql.executeCommand(context, query3);
	    String source_name = mql.getResult();
        
		source_name = source_name.trim();
		
		String query4 = "temp query bus " + type + " " + source_name + " * where " + "\"attribute[" + attrIsVersionObject + "] match False\" select physicalid dump";
		mql.executeCommand(context, query4);
	    String result4 = mql.getResult(); 
			
		StringTokenizer strTok4 = new StringTokenizer(result4,"\n");
		String sourcecopies = "";
		String copies = "";
		
		while(strTok4.hasMoreTokens())
		{
			String row4 = strTok4.nextToken();
			StringTokenizer row4Tok = new StringTokenizer(row4,",");
			String source_major_phid = "";
			while(row4Tok.hasMoreTokens())
			{
				source_major_phid = row4Tok.nextToken();
			}
			
			if(!"".equals(source_major_phid))
			{
				if(sourcecopies.equals(""))
					sourcecopies = source_major_phid;
				else 
				    sourcecopies = sourcecopies + "," + source_major_phid;
				
				 String[] argArray = {type, source_major_phid};
				 String dup_copies = getClonedObjects(context,argArray);
                                                                 System.out.println("dup_copies: " + dup_copies);
				 dup_copies = dup_copies.trim();
			
				if(!"".equals(dup_copies))
				{
					if(copies.equals(""))
						copies = dup_copies;
					else 
						copies = copies + "," + dup_copies;
				}	
			}
		}							
		
		if(!"".equals(copies))
		{			
			copies = copies + "," + sourcecopies;					 										
			
			StringList slSel = new StringList(1);
                  slSel.addElement(DomainConstants.SELECT_ID);    

            String[] phids = copies.split(",");//array of physialid
                  BusinessObjectWithSelectList busObjectWithSelectList = BusinessObject.getSelectBusinessObjectData(context, phids, slSel);
                  for(int i = 0; i < busObjectWithSelectList.size(); i++)
                  {
                        BusinessObjectWithSelect busWithSelect = busObjectWithSelectList.getElement(i);
                        String id = busWithSelect.getSelectData(DomainConstants.SELECT_ID);
                   
				        if(xmlOutput.equals(""))
						   xmlOutput = id;
					    else 
						   xmlOutput = xmlOutput + "," + id;
				  }		
		}
		
		}
        catch(Exception e)
		{
			System.out.println("[IEFBuildFolderStructure.createAttributesMap] EXCEPTION : " + e.getMessage());
		}
		return xmlOutput;
	}
}
