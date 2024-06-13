import java.util.Map;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.program.ProgramCentralUtil;

/**
 * @author FZS
 *
 */
public class emxProgramMigrationRelationshipConversion_mxJPO extends
    emxCommonMigration_mxJPO {

    private static final String SELECT_NAME = "name";

  /**
     * @param context
     * @param args
     * @throws Exception
     */
    public emxProgramMigrationRelationshipConversion_mxJPO(Context context,
        String[] args) throws Exception {
      super(context, args);
    }

    @SuppressWarnings({ "unchecked", "deprecation" })
    @Override
    public void migrateObjects(Context context, StringList objectList) throws Exception
    {
        String relName = "";
        String cmd = "";
        String printCmd = "print connection $1 select $2 dump $3";
        String deleteCmd = "delete connection $1 ";
   
        try{
            String strRelationshipID = "";
            String strNewRelationship = ""; 
                 
            ContextUtil.pushContext(context);
            cmd = "trigger off";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);

            if(null!=objectList && !objectList.isEmpty())
            {                	
		       DomainRelationship domRel = new DomainRelationship((String)objectList.get(0));
               relName = domRel.select(context, SELECT_NAME);

               if ("Vaulted Documents Rev2".equalsIgnoreCase(relName))
               {
                   strNewRelationship = "Vaulted Objects";
                   // "Purged Record" is not on the to end of VDR2 but there are "Purged Record" types attached to VDR@ by change type
                   ContextUtil.startTransaction(context, true);

                   cmd = "modify relationship $1 to add type $2";
                   MqlUtil.mqlCommand(context, cmd, "Vaulted Objects", "Purged Record");

                   ContextUtil.commitTransaction(context);
               }
               else if ("Resolution Project".equalsIgnoreCase(relName))
               {
                    strNewRelationship = "Contributes To";
               }
               else if ("Risk Item".equalsIgnoreCase(relName))
               {
                    strNewRelationship = "Risk Affected Items";
               }
			   else if ("Link URL".equalsIgnoreCase(relName))
               {
                    strNewRelationship = "Reference Document";
               }
               else     
               {
                     mqlLogRequiredInformationWriter("Invalid Relationship = " + relName);
                     mqlLogRequiredInformationWriter("Migration Aborted!");
                     return;
               }
               
               mqlLogRequiredInformationWriter("Migrating relationship " + relName + " to " + strNewRelationship);
               cmd = "modify connection $1 type $2";

               for(int nCount=0;nCount<objectList.size();nCount++)
               {
                  strRelationshipID = (String)objectList.get(nCount);

                  if ("Vaulted Documents Rev2".equalsIgnoreCase(relName))
                  {
		             String VDR2toid = MqlUtil.mqlCommand(context, printCmd,strRelationshipID, "to.id", "|");
		             String output = MqlUtil.mqlCommand(context, printCmd,strRelationshipID, "from.from[Vaulted Objects|" + VDR2toid + "==to.id]", "|" );

                     // if the bookmark and child are connected by both VDR2 and VO rels then just delete the VDR2 relationship
                     if ("TRUE".equalsIgnoreCase(output))                     {
                        mqlLogRequiredInformationWriter("Deleting connection << " + strRelationshipID + " >> to << " + VDR2toid + " >>");
                        MqlUtil.mqlCommand(context, deleteCmd, strRelationshipID);
                     }
                     else
                     {
                        // change VDR2 rel to VO
                        mqlLogRequiredInformationWriter("Changing connection type of << " + strRelationshipID + " >> to " + strNewRelationship);
                        MqlUtil.mqlCommand(context, cmd, strRelationshipID, strNewRelationship);
                     }
                  }
                  else
                  {
                     // change the rel
                     mqlLogRequiredInformationWriter("Changing connection type of << " + strRelationshipID + " >> to " + strNewRelationship);
                     MqlUtil.mqlCommand(context, cmd, strRelationshipID, strNewRelationship);
                  }
               }
            }   
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            if ("Vaulted Documents Rev2".equalsIgnoreCase(relName))
            {
                // "Purged Record" is not on the to end of VDR2 but there are "Purged Record" types attached to VDR@ by change type
                ContextUtil.startTransaction(context, true);

                cmd = "modify relationship $1 to remove type $2";
                MqlUtil.mqlCommand(context, cmd, "Vaulted Objects", "Purged Record");

                ContextUtil.commitTransaction(context);
            }
               
            cmd = "trigger on";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            ContextUtil.popContext(context);
        }
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
