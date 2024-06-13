import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import matrix.db.Context;
import matrix.util.StringList;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.StringUtil;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxCoownerMigrationMigrateIssueObjectsBase_mxJPO extends emxCommonMigration_mxJPO
{

	/**
	 *
	 */
	private static final long serialVersionUID = -5029177381386073045L;


	public emxCoownerMigrationMigrateIssueObjectsBase_mxJPO(Context context, String[] args) throws Exception {
		super(context, args);
	}

	public static StringList mxObjectSelects = new StringList(15);
	public static String co_owners = "";
	public static String co_ownerValue = "";

	public static void init(Context context) throws FrameworkException
	{
		co_owners = PropertyUtil.getSchemaProperty(context, "attribute_CoOwner");
		co_ownerValue = "attribute["+co_owners+"]";
	}

	public void migrateObjects(Context context, StringList objectList) throws Exception
	{
		mqlLogRequiredInformationWriter("In emxSecurityMigrationMigrateTeamObjects 'migrateObjects' method "+"\n");
		init(context);
		mxObjectSelects.addElement(co_ownerValue);
		mxObjectSelects.addElement(DomainConstants.SELECT_ID);
		mxObjectSelects.addElement(DomainConstants.SELECT_NAME);
		mxObjectSelects.addElement("grantee");
		mxObjectSelects.addElement("grantor");
		mxObjectSelects.addElement("grant.granteeaccess");

		String[] oidsArray = new String[objectList.size()];
		oidsArray = (String[])objectList.toArray(oidsArray);
		MapList mapList = DomainObject.getInfo(context, oidsArray, mxObjectSelects);
		Iterator<?> itr = mapList.iterator();
		mqlLogRequiredInformationWriter("=================================================================================================================================" + "\n");
		while(itr.hasNext())
		{
			Map<?, ?> m = (Map<?, ?>)itr.next();
			String oid = (String)m.get(DomainConstants.SELECT_ID);
			String ObjectName = (String)m.get(DomainConstants.SELECT_NAME);
			mqlLogRequiredInformationWriter("Started Migrating Object Name '"+ ObjectName + "' with Object Id "+oid);
			String coowners = (String)m.get(co_ownerValue);
			StringList grantees = (StringList)m.get("grantee");
			StringList grantors = (StringList)m.get("grantor");
			grantees = removeDuplicates(grantees);
			if(UIUtil.isNotNullAndNotEmpty(coowners) && grantees.size() >0)
			{
				updateSOVForCoowners(context,grantees,grantors,coowners,ObjectName,oid);
			}else {
				mqlLogRequiredInformationWriter("No need to modify Issue " + ObjectName + "because it doesn't have any grantee" +"\n");
			}
			mqlLogWriter("#################################################################################################################################" + "\n");
		}
	}

	private void updateSOVForCoowners(Context context,StringList grantees,StringList grantors,String coowners,String ObjectName,String oid) throws Exception
	{
		if((grantees != null && grantees.size() > 0) )
		{
			DomainObject doObject = new DomainObject(oid);
			Iterator gItr = grantees.iterator();
			Iterator grantorItr = grantors.iterator();
			StringList co_ownersList = StringUtil.split(coowners, "~");
			StringList accessNames = DomainAccess.getLogicalNames(context, oid);
			String defaultAccess = (String)accessNames.get(accessNames.size()-1);
			while(gItr.hasNext())
			{
				String grantee = (String)gItr.next();
				String grantor = (String)grantorItr.next();
				if( grantee!= null && !"".equals(grantee.trim()) && co_ownersList.contains(grantee))
				{
					mqlLogRequiredInformationWriter("Modify Issue " + oid + " Add objectOwnership for user " + grantee +" with access as "+ defaultAccess);
					DomainAccess.createObjectOwnership(context, oid, null, grantee + "_PRJ", defaultAccess, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
					mqlLogRequiredInformationWriter("Modify Issue " + oid + " Remove grantee " + grantee);
					doObject.revokeAccess(context, grantor, grantee);
					mqlLogRequiredInformationWriter("------------------------------------------------------");
				}
			}
		}
	}

	private static StringList removeDuplicates(StringList list)
	{
		HashSet<String> hashSet = new HashSet<String>();
		for(int i = 0; i < list.size(); i++)
		{
			hashSet.add((String) list.get(i));
		}
		list.clear();
		list.addAll(hashSet);
		return list;
	}

	public void mqlLogRequiredInformationWriter(String command) throws Exception
	{
		super.mqlLogRequiredInformationWriter(command +"\n");
	}

	public void mqlLogWriter(String command) throws Exception
	{
		super.mqlLogWriter(command +"\n");
	}
}
