package com.dec.util;

import com.matrixone.apps.common.Person;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.program.ProgramCentralUtil;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

import java.util.Map;

public class DecPersonUtil {

    public static String getPersonDepartment(Context context, String sPerson) throws Exception {
        String returnValue = "";
        try{
            String sRelPattern = DecConstants.RELATIONSHIP_MEMBER;
            String sTypePattern = DecConstants.TYPE_DEPARTMENT;

            StringList slBus = new StringList();
            slBus.add(DecConstants.SELECT_ORGANIZATIONNAME);

            StringList slRel = new StringList();

            Person person = Person.getPerson(context, sPerson);
            MapList ml = person.getRelatedObjects(context,
                    sRelPattern,
                    sTypePattern,
                    slBus,
                    slRel,
                    true,
                    false,
                    (short)1,
                    null,
                    null,
                    0);

            if (ml != null && ml.size() > 0) {
                Map map = (Map) ml.get(0);
                returnValue = (String) map.get(DecConstants.SELECT_ORGANIZATIONNAME);
            }

        } catch(Exception e) {
            e.printStackTrace();
        }
        return returnValue;
    }

}
