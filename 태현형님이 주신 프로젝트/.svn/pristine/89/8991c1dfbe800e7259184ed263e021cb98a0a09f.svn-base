import java.util.Iterator;
import java.util.Map;

import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.Risk;

import matrix.db.Context;
import matrix.util.StringList;
/**
 * @author
 *
 */
public class emxProgramMigrationRisk_mxJPO extends emxCommonMigration_mxJPO {

    private static final long serialVersionUID = -5029177381386073045L;
    private boolean fromMQL = false;

    /**
     * @param context
     * @param args
     * @throws Exception
     */
    public emxProgramMigrationRisk_mxJPO(Context context,
            String[] args) throws Exception {
        super(context, args);
    }

    @SuppressWarnings({ "unchecked", "deprecation" })
    @Override
    public void migrateObjects(Context context, StringList objectList) throws Exception
    {
        StringList mxObjectSelects = new StringList(7);
        mxObjectSelects.add(SELECT_ID);
        mxObjectSelects.add(SELECT_TYPE);
        mxObjectSelects.add(SELECT_NAME);
        mxObjectSelects.add(ProgramCentralConstants.SELECT_PHYSICALID);
        mxObjectSelects.add(Risk.SELECT_RISK_PROBABILITY);
        mxObjectSelects.add(Risk.SELECT_RISK_IMPACT);
        mxObjectSelects.add(Risk.SELECT_RISK_FACTOR);
       
        
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);
        MapList objectInfoList = DomainObject.getInfo(context, oidsArray, mxObjectSelects);
        MapList riskList = new MapList();

        try{


            ContextUtil.pushContext(context);
            String cmd = "trigger off";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            Iterator objectInfoListIterator = objectInfoList.iterator();
            while (objectInfoListIterator.hasNext())
            {
                Map objectInfo = (Map)objectInfoListIterator.next();

                riskList.add(objectInfo);
            }
            
            // 2021x FD04 - Risk Factor calculation 
            MapList riskObjectList = new MapList();
            riskObjectList.addAll(riskList);
            migrateRiskCalculateRiskFactor(context, riskObjectList);

        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            String cmd = "trigger on";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            ContextUtil.popContext(context);
        }
    }


    private void migrateRiskCalculateRiskFactor(Context context, MapList objectList) throws Exception
    {

        try{

            ContextUtil.pushContext(context);
            String cmd = "trigger off";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("===================MIGRATION FOR RISK OBJECT UPDATE STARTED=====================================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String objectId = (String)objectInfo.get(SELECT_ID);
                String sProbability = (String)objectInfo.get(Risk.SELECT_RISK_PROBABILITY);
                String sImpact      = (String)objectInfo.get(Risk.SELECT_RISK_IMPACT);
                String sRiskFactor  = (String)objectInfo.get(Risk.SELECT_RISK_FACTOR);

                int impact = Integer.parseInt(sImpact);
                int prob = Integer.parseInt(sProbability);
                
                if(sRiskFactor != null && (sRiskFactor.isEmpty() || "0".equalsIgnoreCase(sRiskFactor))){
                    mqlLogRequiredInformationWriter("Modify value of Attribute Risk Factor for Risk " + objectId);

                    int iRPN  = impact * prob;
                    DomainObject riskObj = DomainObject.newInstance(context, objectId);
                    riskObj.setAttributeValue(context, ATTRIBUTE_RISK_FACTOR, String.valueOf(iRPN));
                    // Add object to list of converted OIDs
                    loadMigratedOids(objectId);
                }else{
                    mqlLogRequiredInformationWriter("Skipping object <<" + objectId + ">>, NO MIGRATION NEEDED");

                    // Add object to list of unconverted OIDs
                    String comment = "Skipping object <<" + objectId + ">> NO MIGRATIION NEEDED";
                    writeUnconvertedOID(comment, objectId);
                }
            }
            mqlLogRequiredInformationWriter("===================MIGRATION FOR CHANGING DEFAULT USER ACCESS COMPLETED=====================================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            String cmd = "trigger on";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            ContextUtil.popContext(context);
        }
    }


    /**
     *
     * @override
     */
    public void mqlLogRequiredInformationWriter(String command) throws Exception
    {
        if (fromMQL) {
            System.out.println(command);
        } else {
            super.mqlLogRequiredInformationWriter(command +"\n");
        }
    }

    /**
     *
     * @override
     */
    public void mqlLogWriter(String command) throws Exception
    {
        if (fromMQL) {
            System.out.println(command);
        } else {
            super.mqlLogWriter(command +"\n");
        }
    }

    /**
     *
     * @override
     */

    public void loadMigratedOids (String objectId) throws Exception
    {
        if (fromMQL) {
            System.out.println(objectId);
        } else {
            String newLine = System.getProperty("line.separator");
            super.loadMigratedOids(objectId + newLine);
        }
    }


}
