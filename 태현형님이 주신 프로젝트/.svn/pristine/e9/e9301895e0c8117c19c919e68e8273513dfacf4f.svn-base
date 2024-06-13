/*
 *  emxRPNBase.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 * static const char RCSID[] = $Id: ${CLASSNAME}.java.rca 1.1.1.2.3.2.2.2 Thu Dec  4 07:55:17 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.1.1.2.3.2.2.1 Thu Dec  4 01:53:27 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.1.1.2.3.2 Wed Oct 22 15:50:26 2008 przemek Experimental przemek $
 */

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Vector;

import matrix.db.AttributeType;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.program.Opportunity;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.ProjectSpace;
import com.matrixone.apps.program.Risk;
import com.matrixone.apps.program.RiskManagement;
import com.matrixone.apps.program.RiskRPNRelationship;
import com.matrixone.apps.program.OpportunityRPNRelationship;



public class emxRPNBase_mxJPO extends com.matrixone.apps.program.RiskRPNRelationship
{

//  Constructor

    public emxRPNBase_mxJPO (Context context, String[] args)
    throws Exception
    {
        // Call the super constructor
        super();

    }

    private static final String FROM_ID = "from." + SELECT_ID;


	private boolean isOpportunity(Context context, String[] args) throws Exception {

		try {
			final Map programMap = (HashMap) JPO.unpackArgs(args);
			final Map paramMap = (HashMap) programMap.get("paramMap");
			final String objId = (String) paramMap.get("objectId");

			DomainObject dmobjectID = DomainObject.newInstance(context, objId);
			if (dmobjectID.isKindOf(context, Opportunity.TYPE_OPPORTUNITY)) {
				return true;
			}
			return false;
		} catch (final Exception ex) {
			ex.printStackTrace();
			System.out.println(ex.getMessage());
			throw ex;
		}

	}

    /**
     * Get the probability attribute value for Create Form for Risk-RPN relation
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */
    public String getProbability(Context context, String[] args) throws Exception {
        final StringBuffer options = new StringBuffer();

        try {

            String attrProbability = PropertyUtil.getSchemaProperty(context, "attribute_RiskProbability");
            String rangeKey = "emxFramework.Range.Risk_Probability.";
        	if (isOpportunity (context, args)) {
                attrProbability = PropertyUtil.getSchemaProperty(context, "attribute_OpportunityProbability");
                rangeKey = "emxFramework.Range.Opportunity_Probability.";
        	}

            final StringList probabilitytRanges = FrameworkUtil.getRanges(context, attrProbability);
            final int length = probabilitytRanges.size();

            options.append("<select name='Probability' onChange='modifyRPN();'>");

            // NX5 - FUN071553
            for (int i = 0; i < length; i++) {
                final String rangeValue = (String) probabilitytRanges.get(i);
                final String convertedProbabilityRange = EnoviaResourceBundle.getProperty(context, "Framework",rangeKey + rangeValue, context.getLocale());
                options.append(" <option value=\"" + FrameworkUtil.encodeURL(rangeValue) + "\"");
                options.append(">");
                options.append(convertedProbabilityRange + "</option> ");
            }
            options.append("</select>");
            return options.toString();

        } catch (final Exception ex) {
            ex.printStackTrace();
            System.out.println(options.toString());
            System.out.println(ex.getMessage());
            throw ex;
        }
    }

    /**
     * Get the impact attribute value for Create Form from Risk-RPN relation
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since PMC V6R2008-1
     */
    public String getImpact(Context context, String[] args)
            throws Exception
    {
            final StringBuffer options = new StringBuffer();

            try {

                String attrImpact = PropertyUtil.getSchemaProperty(context, "attribute_RiskImpact");
                String rangeKey = "emxFramework.Range.Risk_Impact.";
            	if (isOpportunity (context, args)) {
            		attrImpact = PropertyUtil.getSchemaProperty(context, "attribute_OpportunityImpact");
                    rangeKey = "emxFramework.Range.Opportunity_Impact.";
            	}

                final StringList impactRanges = FrameworkUtil.getRanges(context, attrImpact);
                final int length = impactRanges.size();

                final String sLanguage = context.getSession().getLanguage();

                options.append("<select name='Impact' onChange='modifyRPN();'>");

                // NX5 - FUN071553
                for (int i = 0; i < length; i++) {
                    final String rangeValue = (String) impactRanges.get(i);
                    final String convertedImpactRange = EnoviaResourceBundle.getProperty(context, "Framework",rangeKey + rangeValue, context.getLocale());
                    options.append(" <option value=\"" + FrameworkUtil.encodeURL(rangeValue) + "\"");
                    options.append(">");
                    options.append(convertedImpactRange + "</option> ");
                }
                options.append("</select>");
                return options.toString();

            } catch (final Exception ex) {
                ex.printStackTrace();
                System.out.println(options.toString());
                System.out.println(ex.getMessage());
                throw ex;
            }
        }


    /**
     * Get the RPN attribute value for Create Form from Risk-RPN relation
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */
    public String getRPN(Context context,String args[]) throws Exception
    {
        StringBuffer sb = new StringBuffer();
        sb.append("<input name=\"RPN\" size=\"2\" value=\"1\" maxlength=\"2\" readonly=\"readonly\">");
        String textbox = sb.toString();
        return textbox;
    }

    /**
     * Get the effective date attribute value for Create Form
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */
    public String getEffectivityDate(Context context,String args[]) throws Exception
    {
    	//Modification end For Bug IR-067611V6R2011x:RZ1
    	HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String effectiveDate = (String) requestMap.get("EffectiveDate");
        String timezone = (String) requestMap.get("timeZone");
        double dbTimeZone = Double.parseDouble(timezone);
        Locale locale = (Locale) requestMap.get("localeObj");
        if(effectiveDate != null && ! "".equals(effectiveDate) )
		{effectiveDate = com.matrixone.apps.domain.util.eMatrixDateFormat.getFormattedInputDate(context,effectiveDate, dbTimeZone,locale);
    	}
        //Modification end For Bug IR-067611V6R2011x:RZ1
        StringBuffer sb = new StringBuffer();
        sb.append("<script language=\"javascript\" type=\"text/javascript\" src=\"../common/scripts/emxUICalendar.js\"></script>");
        sb.append("<input type=\"text\" name=\"EffectiveDate\" size=\"20\" value=\""+effectiveDate+"\"  readonly=\"readonly\">");
       // sb.append("<input type=\"text\" name=\"EffectiveDate\" size=\"20\" value=\"\"  readonly=\"readonly\">");
        sb.append("<a href=\"javascript:showCalendar('editDataForm','EffectiveDate','')\" >");
        sb.append("<img src=\"../common/images/iconSmallCalendar.gif\" border=0 valign=\"absmiddle\" name=img5>");
        sb.append("</a>");
        String date = sb.toString();
        return date;

    }

    /**
     * Get the status attribute value for Create Form
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     */
    public String getStatus(Context context,String args[]) throws Exception
    {
        StringBuffer sb = new StringBuffer();
        sb.append("<textarea rows= \"5\" name=\"Status\" cols=\"45\"></textarea>");
        String textarea = sb.toString();
        return textarea;
    }


    /**
     * Get the impact attribute value for View,Edit Form from Risk-RPN relation
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */
    public String getImpactView(Context context,String args[]) throws Exception
    {

        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");

        String rpnId = (String) requestMap.get("rpnId");
        Map RPNDataMap=null;

        String mode = "";
        if(requestMap.containsKey((Object)"mode"))
        {
            mode = (String) requestMap.get("mode");
        }
        com.matrixone.apps.program.RiskRPNRelationship rpn =
            (com.matrixone.apps.program.RiskRPNRelationship) DomainRelationship.newInstance(context,
                    DomainConstants.RELATIONSHIP_RISK_RPN, "PROGRAM");

        // RPNDataMap=DomainRelationship.getAttributeMap(context,rpnId,"Risk
        // Impact");
        String impact = (String)DomainRelationship.getAttributeValue(context,rpnId,ATTRIBUTE_RISK_IMPACT);
        Map tempmap = rpn.getTypeAttributes(context, rpn.RELATIONSHIP_RISK_RPN);
        Map impactMap = (Map)tempmap.get(rpn.ATTRIBUTE_RISK_IMPACT);
        StringList impactList = (StringList)impactMap.get("choices");
        int size = impactList.size();
        StringBuffer sb = new StringBuffer();
        if(mode.equals("edit"))
        {
            sb.append("<select name=\"Impact\" onChange=\"modifyRPN();\">");
            for(int i=0;i<size;i++)
            {
                String value = XSSUtil.encodeForHTML(context,(String) impactList.get(i));
                if(value.equals(impact))
                {
                    sb.append("<option value=\""+value+"\" selected>"+value+"</option>");
                }
                else
                {
                    sb.append("<option value=\""+value+"\">"+value+"</option>");
                }
            }
            sb.append("</select>");
            impact=sb.toString();
        }
        else
        {
            sb.append(impact);
            impact=sb.toString();
        }

        return impact;
    }

    /**
     * Get the probability attribute value for View,Edit Form from Risk-RPN
     * relation
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */
    public String getProbabilityView(Context context,String args[]) throws Exception
    {

        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        String mode = "";

        com.matrixone.apps.program.RiskRPNRelationship rpn =
            (com.matrixone.apps.program.RiskRPNRelationship) DomainRelationship.newInstance(context,
                    DomainConstants.RELATIONSHIP_RISK_RPN, "PROGRAM");
        Map tempmap = rpn.getTypeAttributes(context, rpn.RELATIONSHIP_RISK_RPN);
        Map probabilityMap = (Map)tempmap.get(rpn.ATTRIBUTE_RISK_PROBABILITY);
        StringList probabilityList = (StringList)probabilityMap.get("choices");
        int size = probabilityList.size();
        if(requestMap.containsKey((Object)"mode"))
        {
            mode = (String) requestMap.get("mode");
        }

        String rpnId = (String) requestMap.get("rpnId");
        // Map RPNDataMap=DomainRelationship.getAttributeMap(context,rpnId);
        String probability = (String)DomainRelationship.getAttributeValue(context,rpnId, ATTRIBUTE_RISK_PROBABILITY);
        StringBuffer sb = new StringBuffer();
        if(mode.equals("edit"))
        {
            sb.append("<select name=\"Probability\" onChange=\"modifyRPN();\">");
            for(int i=0;i<size;i++)
            {
                String value = XSSUtil.encodeForHTML(context,(String) probabilityList.get(i));
                if(value.equals(probability))
                {
                    sb.append("<option value=\""+value+"\" selected>"+value+"</option>");
                }
                else
                {
                    sb.append("<option value=\""+value+"\">"+value+"</option>");
                }
            }
            sb.append("</select>");
            probability=sb.toString();
        }
        return probability;
    }


    /**
     * Get the RPN attribute value for View,Edit Form
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */
    public String getRPNView(Context context,String args[]) throws Exception
    {

        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        String mode = "";

        com.matrixone.apps.program.RiskRPNRelationship rpn =
            (com.matrixone.apps.program.RiskRPNRelationship) DomainRelationship.newInstance(context,
                    DomainConstants.RELATIONSHIP_RISK_RPN, "PROGRAM");

        if(requestMap.containsKey((Object)"mode"))
        {
            mode = (String) requestMap.get("mode");
        }
        String rpnId = (String) requestMap.get("rpnId");
        // Map RPNDataMap=DomainRelationship.getAttributeMap(context,rpnId);
        String probability = (String)DomainRelationship.getAttributeValue(context,rpnId,ATTRIBUTE_RISK_PROBABILITY);
        String impact = (String)DomainRelationship.getAttributeValue(context,rpnId,ATTRIBUTE_RISK_IMPACT);
        String RPN = String.valueOf(Integer.parseInt(impact) * Integer.parseInt(probability));
        StringBuffer sb = new StringBuffer();
        if(mode.equals("edit"))
        {
            sb.append("<input name=\"RPN\" size=\"2\" value=\""+XSSUtil.encodeForHTML(context,RPN)+"\" maxlength=\"2\" readonly=\"readonly\">");
            RPN = sb.toString();
        }
        return RPN;
    }


    /**
     * Get the Effective Date attribute value for View,Edit Form
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */
    public String getEffectiveDateView(Context context,String args[]) throws Exception
    {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        String timezone = (String) requestMap.get("timeZone");
        String mode = "";
        if(requestMap.containsKey((Object)"mode"))
        {
            mode = (String) requestMap.get("mode");
        }
        com.matrixone.apps.program.RiskRPNRelationship rpn =
            (com.matrixone.apps.program.RiskRPNRelationship) DomainRelationship.newInstance(context,
                    DomainConstants.RELATIONSHIP_RISK_RPN, "PROGRAM");
        String rpnId = (String) requestMap.get("rpnId");
        // Map RPNDataMap=DomainRelationship.getAttributeMap(context,rpnId);
        String effectiveDate = (String)DomainRelationship.getAttributeValue(context,rpnId,ATTRIBUTE_EFFECTIVE_DATE);
        double dbTimeZone = Double.parseDouble(timezone);
        effectiveDate = eMatrixDateFormat.getFormattedDisplayDate(effectiveDate,dbTimeZone,Locale.getDefault());
        StringBuffer sb = new StringBuffer();
        if(mode.equals("edit"))
        {
            sb.append("<script language=\"javascript\" type=\"text/javascript\" src=\"../common/scripts/emxUICalendar.js\"></script>");
            sb.append("<input type=\"text\" name=\"EffectiveDate\" size=\"20\" value=\""+XSSUtil.encodeForHTML(context,effectiveDate)+"\" readonly=\"readonly\">");
            sb.append("<a href=\"javascript:showCalendar('editDataForm','EffectiveDate','')\" >");
            sb.append("<img src=\"../common/images/iconSmallCalendar.gif\" border=0 valign=\"absmiddle\" name=img5>");
            sb.append("</a>");
            effectiveDate = sb.toString();
        }
        return effectiveDate;
    }



    /**
     * Get the status attribute value for View,Edit Form
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */
    public String getStatusView(Context context,String args[]) throws Exception
    {

        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        String mode = "";

        if(requestMap.containsKey((Object)"mode"))
        {
            mode = (String) requestMap.get("mode");
        }
        com.matrixone.apps.program.RiskRPNRelationship rpn =
            (com.matrixone.apps.program.RiskRPNRelationship) DomainRelationship.newInstance(context,
                    DomainConstants.RELATIONSHIP_RISK_RPN, DomainConstants.PROGRAM);
        String rpnId = (String) requestMap.get("rpnId");
        // Map RPNDataMap=DomainRelationship.getAttributeMap(context,rpnId);
        String status = (String)DomainRelationship.getAttributeValue(context,rpnId,ATTRIBUTE_STATUS);
        StringBuffer sb = new StringBuffer();
        if(mode.equals("edit"))
        {
            sb.append("<textarea rows= \"5\" name=\"Status\" cols=\"45\">"+XSSUtil.encodeForHTML(context,status)+"</textarea>");
            status=sb.toString();
        }

        return status;
    }


    /**
     * Creates a new connection between Risk and RPN object and sets the
     * Relationship Attributes
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return void
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */

    @com.matrixone.apps.framework.ui.PostProcessCallable
    public HashMap createNewOPN(Context context,String args[]) throws Exception
    {
    	return createNewRPN(context,RiskManagement.TYPE_OPPORTUNITY, args);
    }

    @com.matrixone.apps.framework.ui.PostProcessCallable
    public HashMap createNewRPN(Context context,String args[]) throws Exception
    {
    	return createNewRPN(context, DomainConstants.TYPE_RISK, args);
    }

    @com.matrixone.apps.framework.ui.PostProcessCallable
    private HashMap createNewRPN(Context context,String objType, String args[]) throws Exception
    {
    	HashMap returnMap = new HashMap();
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String probability = (String) requestMap.get("Probability");
        String impact = (String) requestMap.get("Impact");
        String RPN = (String) requestMap.get("RPN");
        String effectiveDate = (String) requestMap.get("EffectiveDate");
        String status = (String) requestMap.get("Status");
        String objectId = (String) requestMap.get("objectId");
        String timezone = (String) requestMap.get("timeZone");
        double dbTimeZone = Double.parseDouble(timezone);
        //Modified For Bug IR-067611V6R2011x
        Locale locale = (Locale) requestMap.get("localeObj");
        //modification end For Bug IR-067611V6R2011x


        // Opportunity or Risk
        String TYPE        = DomainConstants.TYPE_RISK;
        String PROBABILITY = DomainConstants.ATTRIBUTE_RISK_PROBABILITY;
        String IMPACT      = DomainConstants.ATTRIBUTE_RISK_IMPACT;
        String RPNATTRVALUE    = DomainConstants.ATTRIBUTE_RISK_RPN_VALUE;
        String RELTYPE     = DomainConstants.RELATIONSHIP_RISK_RPN;
        boolean isRisk = true;

        if (objType.equalsIgnoreCase(RiskManagement.TYPE_OPPORTUNITY)) {
            TYPE        = RiskManagement.TYPE_OPPORTUNITY;
            PROBABILITY = Opportunity.ATTRIBUTE_OPPORTUNITY_PROBABILITY;
            IMPACT      = Opportunity.ATTRIBUTE_OPPORTUNITY_IMPACT;
            RPNATTRVALUE    = Opportunity.ATTRIBUTE_OPPORTUNITY_RPN_VALUE;
            RELTYPE     = Opportunity.RELATIONSHIP_OPPORTUNITY_RPN;
            isRisk = false;
        }

        if(effectiveDate != null && ! "".equals(effectiveDate) )
        {//Modified For Bug IR-067611V6R2011x :RZ1
        effectiveDate = com.matrixone.apps.domain.util.eMatrixDateFormat.getFormattedInputDate(context,effectiveDate, dbTimeZone,locale);
         //modification end For Bug IR-067611V6R2011x:RZ1
        }
        com.matrixone.apps.common.Person person =
            (com.matrixone.apps.common.Person) DomainObject.newInstance(context,
                    DomainConstants.TYPE_PERSON);
        com.matrixone.apps.program.Risk                       risk = null;
        com.matrixone.apps.program.RiskRPNRelationship        rpn  = null;
        com.matrixone.apps.program.Opportunity                opportunity = null;
        com.matrixone.apps.program.OpportunityRPNRelationship opn =  null;
        if(isRisk)
        {
         risk =(com.matrixone.apps.program.Risk) DomainObject.newInstance(context,
                    DomainConstants.TYPE_RISK, DomainConstants.PROGRAM);
         rpn = (com.matrixone.apps.program.RiskRPNRelationship) DomainRelationship.newInstance(context,
                    DomainConstants.RELATIONSHIP_RISK_RPN, DomainConstants.PROGRAM);
        }
        else
        {
            opportunity =(com.matrixone.apps.program.Opportunity) DomainObject.newInstance(context,
                            RiskManagement.TYPE_OPPORTUNITY,DomainConstants.PROGRAM);
            opn =(com.matrixone.apps.program.OpportunityRPNRelationship) DomainRelationship.newInstance(context,
                            Opportunity.RELATIONSHIP_OPPORTUNITY_RPN, DomainConstants.PROGRAM);
        }
        person = person.getPerson(context);
        String personName = person.getInfo(context, person.SELECT_NAME);
        if(isRisk){
        risk.setId(objectId);}
        else{
            opportunity.setId(objectId);
        }

        try {
            //Added:nr2:PRG:R210:06-Sep:2010:IR-070397V6R2012
            boolean isValidRPNEffectiveDate = true;
            if(isRisk){
            isValidRPNEffectiveDate = validateRPNEffectiveDate(context,risk,effectiveDate);}
            else{
                isValidRPNEffectiveDate = validateRPNEffectiveDate(context,opportunity,effectiveDate);
            }

            if(!isValidRPNEffectiveDate){
                String languageStr = (String) requestMap.get("languageStr");
                String strErrorMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                        "emxProgramCentral.OPN.InvalidEffectiveDate", languageStr);
                if(isRisk){
                strErrorMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                        "emxProgramCentral.RPN.InvalidEffectiveDate", languageStr);
                }

                returnMap.put("Action","Stop");
                MqlUtil.mqlCommand(context, "Notice $1", strErrorMsg);
                return returnMap;
            }
            //End:nr2:PRG:R210:06-Sep:2010:IR-070397V6R2012
            if(isRisk){
                risk.startTransaction(context, true);}
            else{
                opportunity.startTransaction(context, true);
            }
            HashMap map = new HashMap();
            if (ProgramCentralUtil.isNotNullString(probability)) {
                 if(isRisk){
                     map.put(ProgramCentralConstants.ATTRIBUTE_RISK_PROBABILITY, probability);
                 } else{
                     map.put(Opportunity.ATTRIBUTE_OPPORTUNITY_PROBABILITY, probability);
                 }
            }

            if (ProgramCentralUtil.isNotNullString(impact)) {
                if(isRisk){
                    map.put(ProgramCentralConstants.ATTRIBUTE_RISK_IMPACT, impact);
                } else{
                    map.put(Opportunity.ATTRIBUTE_OPPORTUNITY_IMPACT, impact);
                }
            }
            if(isRisk){
                if (ProgramCentralUtil.isNotNullString(probability)&&  ProgramCentralUtil.isNotNullString(impact)) {
                   String rpnValue = String.valueOf(Integer.parseInt(probability) * Integer.parseInt(impact));
                   map.put(Risk.ATTRIBUTE_RISK_FACTOR, rpnValue);
                }
                risk.setAttributeValues(context, map);
                rpn = risk.createRPN(context);
            } else{
                if (ProgramCentralUtil.isNotNullString(probability)&&  ProgramCentralUtil.isNotNullString(impact)) {
                    String rpnValue = String.valueOf(Integer.parseInt(probability) * Integer.parseInt(impact));
                    map.put(Opportunity.ATTRIBUTE_OPPORTUNITY_RPN_VALUE, rpnValue);
                 }                
                opportunity.setAttributeValues(context, map);
                opn=opportunity.createRPN(context);
            }
            map.clear();



            if (ProgramCentralUtil.isNotNullString(probability)) {
                if(isRisk){
                map.put(rpn.ATTRIBUTE_RISK_PROBABILITY, probability);}
            	else{
            		map.put(Opportunity.ATTRIBUTE_OPPORTUNITY_PROBABILITY, probability);}
            }
            if (ProgramCentralUtil.isNotNullString(impact)) {
                if(isRisk){
                map.put(rpn.ATTRIBUTE_RISK_IMPACT, impact);}
            	else{
            		map.put(Opportunity.ATTRIBUTE_OPPORTUNITY_IMPACT, impact);}
            }
            if (ProgramCentralUtil.isNotNullString(probability)&&  ProgramCentralUtil.isNotNullString(impact)) {
                String rpnValue = String.valueOf(Integer.parseInt(probability) * Integer.parseInt(impact));
                if(isRisk){
                map.put(rpn.ATTRIBUTE_RISK_RPN_VALUE, rpnValue);}
                else{
                	map.put(Opportunity.ATTRIBUTE_OPPORTUNITY_RPN_VALUE, rpnValue);}
            }
            if (ProgramCentralUtil.isNotNullString(effectiveDate)) {
                if(isRisk){
            	map.put(rpn.ATTRIBUTE_EFFECTIVE_DATE, effectiveDate);}
            	else{
            		map.put(Opportunity.ATTRIBUTE_EFFECTIVE_DATE, effectiveDate);}
            }
            if (ProgramCentralUtil.isNotNullString(status)) {
                if(isRisk){
            	map.put(rpn.ATTRIBUTE_STATUS, status);}
            	else{
            		map.put(opn.ATTRIBUTE_STATUS, status);}
            }
            if (ProgramCentralUtil.isNotNullString(personName)) {
                if(isRisk){
            	map.put(rpn.ATTRIBUTE_ORIGINATOR, personName);}
            	else{
            		map.put(opn.ATTRIBUTE_ORIGINATOR, personName);}
            }
            if(isRisk){
                rpn.setAttributeValues(context, map);
            } else {
                  opn.setAttributeValues(context, map);
            }


            // commit the data
            ContextUtil.commitTransaction(context);
        } catch (Exception e) {
            ContextUtil.abortTransaction(context);
            throw e;
        }
        return returnMap;
    }
    /*
     * #Added:nr2:PRG:R210:07-Sep-2010:IR-070397V6R2012
     * This method is added to validate RPN creation and Editing.
     * Checks if RPN with same effective date s present for the risk.
     * If yes, returns false
     * else return true.
     */
    private boolean validateRPNEffectiveDate(Context context,RiskManagement risk,String effectiveDate) throws MatrixException{
    	boolean isValidRPNEffectiveDate = true;
    	String SELECT_EFFECTIVE_DATE=null;
		//DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy h:m:s a");
		SimpleDateFormat sdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
		
    	if(risk.isKindOf(context, ProgramCentralConstants.TYPE_RISK)){
    	  SELECT_EFFECTIVE_DATE = "relationship[" + RELATIONSHIP_RISK_RPN + "].attribute[" + ATTRIBUTE_EFFECTIVE_DATE + "]";}
    	else if(risk.isKindOf(context, RiskManagement.TYPE_OPPORTUNITY))
    	{ SELECT_EFFECTIVE_DATE = "relationship[" + Opportunity.RELATIONSHIP_OPPORTUNITY_RPN + "].attribute[" + ATTRIBUTE_EFFECTIVE_DATE + "]";}
    	try{
    		String SELECT_RPN_ID=ProgramCentralConstants.EMPTY_STRING;
    		if(risk.isKindOf(context, ProgramCentralConstants.TYPE_RISK)){
	    		 SELECT_RPN_ID = "from[" + RELATIONSHIP_RISK_RPN + "].to.id";}
    		else if(risk.isKindOf(context, RiskManagement.TYPE_OPPORTUNITY)){
    			SELECT_RPN_ID = "from[" + Opportunity.RELATIONSHIP_OPPORTUNITY_RPN  + "].to.id";
    		}
	    		String RPN_ID = risk.getInfo(context, SELECT_RPN_ID);
	    		if(null == RPN_ID){
	    			isValidRPNEffectiveDate = true;
	    			return isValidRPNEffectiveDate;
	    		}
	    		else{
	                StringList RPNList = risk.getInfoList(context,SELECT_EFFECTIVE_DATE);
	                if(null == RPNList || (RPNList != null && RPNList.size() == 0)){
	        			isValidRPNEffectiveDate = true;
	        			return isValidRPNEffectiveDate;
	                }

	                //effectiveDate = LocalDate.parse(effectiveDate, formatter).toString();
	                effectiveDate = sdf.parse(effectiveDate).toString();
	                for(int i=0;i<RPNList.size();i++){
	                	String effectiveDateOfRPNs = (String) RPNList.get(i);
						// Added for IR-548399  For Comparing two dates without time.
						if(null != effectiveDateOfRPNs){
						//effectiveDateOfRPNs = LocalDate.parse(effectiveDateOfRPNs, formatter).toString();
						effectiveDateOfRPNs = sdf.parse(effectiveDateOfRPNs).toString();
						if(effectiveDateOfRPNs.equalsIgnoreCase(effectiveDate)){
	                    	isValidRPNEffectiveDate = false;
	                    	break;
						}
	            		}
	                }
	    		}
    	}
    	catch(Exception e){
    		throw new MatrixException(e);
    	}
    	return isValidRPNEffectiveDate;
    }

    /**
     * Edits atribute on connection between Risk and RPN object
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return void
     * @throws Exception
     *             if the operation fails
     * @since PMC   V6R2008-1
     */

    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void editRPN(Context context,String args[]) throws Exception
    {

        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap paramMap = (HashMap) programMap.get("paramMap");
            HashMap requestMap = (HashMap) programMap.get("requestMap");

            String Impact = (String) paramMap.get("Impact");
            String Probability = (String) paramMap.get("Probability");
            String RPN = (String) paramMap.get("RPN");
            String EffectiveDate = (String) paramMap.get("EffectiveDate");
            String timezone = (String) requestMap.get("timeZone");
            double dbTimeZone = Double.parseDouble(timezone);
            if(EffectiveDate != null && ! "".equals(EffectiveDate) )
            {
            EffectiveDate = com.matrixone.apps.domain.util.eMatrixDateFormat.getFormattedInputDate(context,EffectiveDate, dbTimeZone,Locale.getDefault());
            }
            String Status = (String) paramMap.get("Status");

            String rpnId = (String) requestMap.get("rpnId");

            com.matrixone.apps.program.RiskRPNRelationship rpn =
                (com.matrixone.apps.program.RiskRPNRelationship) DomainRelationship.newInstance(context,
                        DomainConstants.RELATIONSHIP_RISK_RPN, DomainConstants.PROGRAM);

        	//Added:nr2:PRG:R210:06-Sep:2010:IR-070397V6R2012
            String thisRPNEffectiveDate = rpn.getAttributeValue(context,rpnId,DomainConstants.ATTRIBUTE_EFFECTIVE_DATE);
            if(null!= thisRPNEffectiveDate && !thisRPNEffectiveDate.equalsIgnoreCase(EffectiveDate)){
	            String[] relationshipIds = {rpnId};

	            StringList relSelect = new StringList();
	            relSelect.add(FROM_ID);

	            MapList riskIdmapList = rpn.getInfo(context, relationshipIds, relSelect);
	            String riskId = "";

	            if(null != riskIdmapList && riskIdmapList.size() > 0){
	            	Map riskMap = (Map) riskIdmapList.get(0);
	            	riskId = (String) riskMap.get(FROM_ID);
	            }
	            if(null == riskId || "".equals(riskId) || "null".equals(riskId)){
	            	throw new MatrixException();
	            }
	            Risk risk = new Risk();
	            risk.setId(riskId);

	            boolean isValidRPNEffectiveDate = true;
	            isValidRPNEffectiveDate = validateRPNEffectiveDate(context,risk,EffectiveDate);

	            if(!isValidRPNEffectiveDate){
	            	String languageStr = (String) paramMap.get("languageStr");
	                String strErrorMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
	            			"emxProgramCentral.RPN.InvalidEffectiveDate", languageStr);
	                MqlUtil.mqlCommand(context, "Notice $1", strErrorMsg);
	            	return;
	            }
            }
        	//End:nr2:PRG:R210:06-Sep:2010:IR-070397V6R2012

            HashMap attributeMap = new HashMap();
            attributeMap.put(DomainConstants.ATTRIBUTE_RISK_IMPACT,Impact);
            attributeMap.put(DomainConstants.ATTRIBUTE_RISK_PROBABILITY,Probability);
            attributeMap.put(DomainConstants.ATTRIBUTE_RISK_RPN_VALUE,RPN);
            attributeMap.put(DomainConstants.ATTRIBUTE_STATUS,Status);
            attributeMap.put(DomainConstants.ATTRIBUTE_EFFECTIVE_DATE,EffectiveDate);

            rpn.setAttributeValues(context,rpnId,(Map)attributeMap);
        }catch(Exception e)
        {
        }

    }

//Added:16-Jun-09:nr2:R208:PRG Bug :373434
    public Boolean checkEditAccess(Context context,String[] args) throws Exception{
        Boolean access = Boolean.valueOf(false);
        try{
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            String objectId = (String) programMap.get("objectId");
            String projectId = (String) programMap.get("projectID");
            String riskId = (String) programMap.get("riskId");

            // [MODIFIED::Feb 4, 2011:S4E:R211:IR-088047V6R2012 ::Start]
            if(ProgramCentralUtil.isNullString(projectId))
            {
            	DomainObject riskDo = DomainObject.newInstance(context, riskId);
            	projectId = riskDo.getInfo(context,"to["+RELATIONSHIP_RISK+"].from.id");
            }
            // [MODIFIED::Feb 4, 2011:S4E:R211:IR-088047V6R2012 ::End]
            com.matrixone.apps.program.ProjectSpace projectSpace=null;
            projectSpace =
               (com.matrixone.apps.program.ProjectSpace) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PROJECT_SPACE, "PROGRAM");

            com.matrixone.apps.program.Risk risk =
                (com.matrixone.apps.program.Risk) DomainObject.newInstance(context,
                        DomainConstants.TYPE_RISK, DomainConstants.PROGRAM);
//Check for Risk
            if(!"".equals(riskId) && !(riskId==null) && !"".equals(projectId) && !(projectId==null)){
                projectSpace.setId(projectId);
                risk.setId(riskId);
                //Get Project Access
                String strAccess = projectSpace.getAccess(context);

                String objectWhere = "name == \"" + context.getUser() + "\"";
                MapList assigneeList = risk.getAssignees(context,null,null,objectWhere,null);

                if(strAccess.equalsIgnoreCase("Project Owner") || strAccess.equalsIgnoreCase("Project Lead"))
                    access = Boolean.valueOf(true);
                else if(context.getUser().equalsIgnoreCase(risk.getOwner(context).toString()))
                    access = Boolean.valueOf(true);
                else if(assigneeList.size() > 0)
                    access = Boolean.valueOf(true);
                else
                    access = Boolean.valueOf(false);
            }
        } catch (Exception e){}
          return access;
    }

    public void updateProbabilityValue(Context context,String[] args) throws Exception{

        Map programMap = JPO.unpackArgs(args);
        Map paramMap = (Map) programMap.get("paramMap");
        Map requestMap = (Map) programMap.get("requestMap");
        String mode=(String) requestMap.get("mode");
        String objectId = (String) paramMap.get("objectId");
        String objectrelId = (String) paramMap.get("relId");
        String newProbabilityValue = (String) paramMap.get("New Value");

        //String select_risk_Probability = "attribute["+ProgramCentralConstants.ATTRIBUTE_RISK_IMPACT+"]";

        DomainRelationship RPN = new DomainRelationship(objectrelId);
        String impactValue = RPN.getAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_IMPACT);
        if("PMCProjectOpportunity".equalsIgnoreCase(mode))
        {
            impactValue = RPN.getAttributeValue(context, Opportunity.ATTRIBUTE_OPPORTUNITY_IMPACT);
        }

        String[] relationshipIds = {objectrelId};

        StringList relSelect = new StringList();
        relSelect.add(FROM_ID);

        MapList riskIdmapList = RPN.getInfo(context, relationshipIds, relSelect);
        String riskId = EMPTY_STRING;
        if(riskIdmapList != null && riskIdmapList.size() > 0){
            Map riskMap = (Map) riskIdmapList.get(0);
            riskId = (String) riskMap.get(FROM_ID);
        }
        Risk risk = new Risk();
        Opportunity opportunity = new Opportunity();

        if("PMCProjectOpportunity".equalsIgnoreCase(mode))
        {
            opportunity.setId(riskId);
        }else{
        	 risk.setId(riskId);
        }


        int prob = Integer.parseInt(newProbabilityValue);
        int impact = Integer.parseInt(impactValue);

        int iRPN = prob * impact;


        if("PMCProjectOpportunity".equalsIgnoreCase(mode))
        {
            RPN.setAttributeValue(context, Opportunity.ATTRIBUTE_OPPORTUNITY_RPN_VALUE, String.valueOf(iRPN));
            RPN.setAttributeValue(context,  Opportunity.ATTRIBUTE_OPPORTUNITY_PROBABILITY, newProbabilityValue);
            opportunity.setAttributeValue(context, Opportunity.ATTRIBUTE_OPPORTUNITY_PROBABILITY, newProbabilityValue);
            opportunity.setAttributeValue(context, Opportunity.ATTRIBUTE_OPPORTUNITY_RPN_VALUE, String.valueOf(iRPN));
        }else{
            RPN.setAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_RPN_VALUE, String.valueOf(iRPN));
            RPN.setAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_PROBABILITY, newProbabilityValue);
            risk.setAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_PROBABILITY, newProbabilityValue);
            risk.setAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_FACTOR, String.valueOf(iRPN));
        }
    }

    public void updateImpactValue(Context context,String[] args) throws Exception{

        Map programMap = JPO.unpackArgs(args);
        Map paramMap = (Map) programMap.get("paramMap");
        Map requestMap = (Map) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        String objectrelId = (String) paramMap.get("relId");
        String newImpactValue = (String) paramMap.get("New Value");
        String mode=(String) requestMap.get("mode");

        DomainRelationship RPN = new DomainRelationship(objectrelId);
        String probabilityValue = RPN.getAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_PROBABILITY);
        if("PMCProjectOpportunity".equalsIgnoreCase(mode))
        {
            probabilityValue = RPN.getAttributeValue(context, Opportunity.ATTRIBUTE_OPPORTUNITY_PROBABILITY);
        }

        String[] relationshipIds = {objectrelId};

        StringList relSelect = new StringList();
        relSelect.add(FROM_ID);

        MapList riskIdmapList = RPN.getInfo(context, relationshipIds, relSelect);
        String riskId = EMPTY_STRING;
        if(riskIdmapList != null && riskIdmapList.size() > 0){
            Map riskMap = (Map) riskIdmapList.get(0);
            riskId = (String) riskMap.get(FROM_ID);
        }
        Risk risk = new Risk();
        Opportunity opportunity = new Opportunity();

        if("PMCProjectOpportunity".equalsIgnoreCase(mode))
        {
            opportunity.setId(riskId);
        }else{
        	 risk.setId(riskId);
        }
        int prob = Integer.parseInt(probabilityValue);
        int impact = Integer.parseInt(newImpactValue);
        int iRPN = prob * impact;

        if("PMCProjectOpportunity".equalsIgnoreCase(mode))
        {
            RPN.setAttributeValue(context, Opportunity.ATTRIBUTE_OPPORTUNITY_RPN_VALUE, String.valueOf(iRPN));
            RPN.setAttributeValue(context,  Opportunity.ATTRIBUTE_OPPORTUNITY_IMPACT, newImpactValue);
            opportunity.setAttributeValue(context, Opportunity.ATTRIBUTE_OPPORTUNITY_IMPACT, newImpactValue);
            opportunity.setAttributeValue(context, Opportunity.ATTRIBUTE_OPPORTUNITY_RPN_VALUE, String.valueOf(iRPN));
        }else{
            RPN.setAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_RPN_VALUE, String.valueOf(iRPN));
            RPN.setAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_IMPACT, newImpactValue);
            risk.setAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_IMPACT, newImpactValue);
            risk.setAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_RISK_FACTOR, String.valueOf(iRPN));
        }
    }

    public void updateEffectiveDate(Context context, String[] args) throws Exception{

        Map programMap = JPO.unpackArgs(args);
        Map paramMap = (Map) programMap.get("paramMap");
        Map requestMap = (Map) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        String objectrelId = (String) paramMap.get("relId");
        String newEffectiveDateValue = (String) paramMap.get("New Value");
        String timezone = (String) requestMap.get("timeZone");
        String mode=(String) requestMap.get("mode");

        double dClientTimeZoneOffset = (new Double(timezone)).doubleValue();
        Locale locale = context.getLocale();

        newEffectiveDateValue = eMatrixDateFormat.getFormattedInputDate(context,newEffectiveDateValue, dClientTimeZoneOffset,locale);
        RiskRPNRelationship rpn=null;
        OpportunityRPNRelationship opn=null;
    	 if("PMCProjectOpportunity".equalsIgnoreCase(mode))
         {
             opn= (OpportunityRPNRelationship) DomainRelationship.newInstance(context,Opportunity.RELATIONSHIP_OPPORTUNITY_RPN,PROGRAM);
         }else{
        	 rpn= (RiskRPNRelationship) DomainRelationship.newInstance(context,RELATIONSHIP_RISK_RPN,PROGRAM);
         }

        String thisRPNEffectiveDate = rpn.getAttributeValue(context,objectrelId,ATTRIBUTE_EFFECTIVE_DATE);
        String[] relationshipIds = {objectrelId};

        StringList relSelect = new StringList();
        relSelect.add(FROM_ID);

        MapList riskIdmapList = rpn.getInfo(context, relationshipIds, relSelect);
        String riskId = EMPTY_STRING;
        if(riskIdmapList != null && riskIdmapList.size() > 0){
            Map riskMap = (Map) riskIdmapList.get(0);
            riskId = (String) riskMap.get(FROM_ID);
        }

        if(ProgramCentralUtil.isNullString(riskId)){
            throw new MatrixException("Risk Id is null");
        }
        Risk risk = new Risk();
        Opportunity opportunity = new Opportunity();

	            if("PMCProjectOpportunity".equalsIgnoreCase(mode))
	            {
            opportunity.setId(riskId);
	            }else{
	            	 risk.setId(riskId);
        }


	            boolean isValidRPNEffectiveDate = true;
	            if("PMCProjectOpportunity".equalsIgnoreCase(mode)){
	            	 isValidRPNEffectiveDate = validateRPNEffectiveDate(context,opportunity,newEffectiveDateValue);
	            }else{
	            	isValidRPNEffectiveDate = validateRPNEffectiveDate(context,risk,newEffectiveDateValue);
	            }
	            
        if(!isValidRPNEffectiveDate){
            String languageStr = (String) paramMap.get("languageStr");
            String strErrorMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.RPN.InvalidEffectiveDate", languageStr);
            MqlUtil.mqlCommand(context, "Notice $1", strErrorMsg);
            return;
         }

	            if("PMCProjectOpportunity".equalsIgnoreCase(mode))
	            {
            opn.setAttributeValue(context, objectrelId, ATTRIBUTE_EFFECTIVE_DATE,newEffectiveDateValue);
	            }else{
	            	 rpn.setAttributeValue(context, objectrelId, ATTRIBUTE_EFFECTIVE_DATE,newEffectiveDateValue);
        }


    }

    public void updateStatusValue(Context context,String[] args) throws Exception{

        Map programMap = JPO.unpackArgs(args);
        Map paramMap = (Map) programMap.get("paramMap");
        Map requestMap = (Map) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        String objectrelId = (String) paramMap.get("relId");
        String newStatusValue = (String) paramMap.get("New Value");
        String mode=(String) requestMap.get("mode");

        DomainRelationship RPN = new DomainRelationship(objectrelId);
        String[] relationshipIds = {objectrelId};

        StringList relSelect = new StringList();
        relSelect.add(FROM_ID);

        MapList riskIdmapList = RPN.getInfo(context, relationshipIds, relSelect);
        String riskId = EMPTY_STRING;
        if(riskIdmapList != null && riskIdmapList.size() > 0){
            Map riskMap = (Map) riskIdmapList.get(0);
            riskId = (String) riskMap.get(FROM_ID);
        }
        RPN.setAttributeValue(context, "Status", newStatusValue);
    }



}


