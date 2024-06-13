/*
 **   emxSubscriptionReplyHandlerBase.java
 **
 **   Copyright (c) 1992-2020 Dassault Systemes.
 **   All Rights Reserved.
 **   This program contains proprietary and trade secret information of MatrixOne,
 **   Inc.  Copyright notice is precautionary only
 **   and does not evidence any actual or intended publication of such program
 **
 */

import com.matrixone.util.*;
import java.util.*;
import matrix.db.Context;
import matrix.db.*;
import matrix.util.*;
import java.io.*;
import javax.mail.internet.*;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.common.util.SubscriptionUtil;
import com.matrixone.apps.framework.ui.UINavigatorUtil;

import org.jsoup.Jsoup;


public class emxSubscriptionReplyHandlerBase_mxJPO
{
    private com.matrixone.util.MxInternetAddress[] toMailList        = null;
    private com.matrixone.util.MxInternetAddress[] fromMailList      = null;
    private com.matrixone.util.MxInternetAddress[] ccMailList        = null;

    /**
     * Default Constructor.
     *
     * @since Common V6R2009-1
     */
    public emxSubscriptionReplyHandlerBase_mxJPO ()
    {
    }

    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since Common V6R2009-1
     */

    public emxSubscriptionReplyHandlerBase_mxJPO (Context context, String[] args) throws Exception
    {
    }

    public int mxMain (Context context, String[] args) throws Exception
    {
        BufferedWriter writer = new BufferedWriter(new
        MatrixWriter(context));
        writer.write("emxSubscriptionReplyHandlerBase\n");
        writer.flush();

        return  0;
    }

    /**
     * This method captures Email reply and links it to the respective Discussion object if already exiting
     *                  else creates a new discussion with the information that is in the reply mail
     * @param context the eMatrix <code>Context</code> object
     * @param args [] contains all the Email information like Subject, message body, To, CC, BCC etc
     * @throws Exception if the operation fails
     * @since V6R2009-1
     */

    public void captureMailInfo(Context context, String[] args) throws Exception
    {
        String strTypeMsg = PropertyUtil.getSchemaProperty(context,"type_Message");
        String strPolicyMsg = PropertyUtil.getSchemaProperty(context,"policy_Message");
        String strRelMsg = PropertyUtil.getSchemaProperty(context,"relationship_Message");
        String strTypeThread = PropertyUtil.getSchemaProperty(context,"type_Thread");
        String strPolicyThread = PropertyUtil.getSchemaProperty(context,"policy_Thread");
        String strRelThread = PropertyUtil.getSchemaProperty(context,"relationship_Thread");
        String strRelReply = PropertyUtil.getSchemaProperty(context,"relationship_Reply");
        String propAllowCcSubscription = "false";
        String replyMailInfo = "";
        Hashtable nameIdTable = null;
        if (args != null && args.length > 0)
        {
            replyMailInfo = args[0];
        }


        try
        {
            MxMessage mxMessage                 = new MxMessage(replyMailInfo);
            com.matrixone.util.MxInternetAddress[] toMailList        = mxMessage.getToMxInternetAddress() ;
            com.matrixone.util.MxInternetAddress[] fromMailList      = mxMessage.getFromMxInternetAddress() ;
            com.matrixone.util.MxInternetAddress[] ccMailList        = mxMessage.getCcMxInternetAddress() ;
            String message = ""; 
            String htmlMessge = mxMessage.getHtmlMessage();
            //System.out.println("htmlMessge: "+htmlMessge);
            //htmlMessge for Rich text emails
            if (!htmlMessge.isEmpty() || htmlMessge != null) {
            	message = htmlMessge;
                //to handle jsoup parsing
            	message = message.replaceAll("<o:p>&nbsp;</o:p>", "EM:P:T:Y:L:I:NE");
                message = message.replaceAll("&nbsp;", "BR:E:A:K:S:P:A:CE");
                message = message.replaceAll("<o:p></o:p>", "NE:W:L:I:NE");
                
    			String parsedHTML = getTextFromHTMLPart(message); 
                
    			message =checkForUnsupportedCharacter(parsedHTML);
                message = message.replaceAll("EM:P:T:Y:L:I:NE", " \n");
                message = message.replaceAll("BR:E:A:K:S:P:A:CE", " ");
                message = message.replaceAll("NE:W:L:I:NE", "\n");
            } 

            //getMessage for plain text emails
            if ("".equals(message)) {
            	message = mxMessage.getMessage();
            }
            
            
            
            int endOfMessage  = message.indexOf("-+-----+-----+-----+-----+-----+");
            if(endOfMessage > 0)
            {
                message = message.substring(0, endOfMessage);
            }
            message = checkForUnsupportedCharacter(message);
            //get person object using emailid
            String fromId           = fromMailList[0].getAddress().toLowerCase();
			String cmd = "list person email $1";
			String fromName = MqlUtil.mqlCommand(context,cmd, fromId);
			 
            String subject1         = mxMessage.getSubject();
            try
            {
                propAllowCcSubscription = (String)EnoviaResourceBundle.getProperty(context,"emxComponents.CaptureEmail.AutoCCSubscriptionEnabled");
            }
            catch(Exception ex)
            {
                ex.printStackTrace();
                throw ex;
            }
            //parsing logic for subject
            //e.g. Re Issue assigned | Issue, ISS-001, -
            String replyInf         = subject1.substring(0, subject1.lastIndexOf("|")); 
            String typeNameRevTemp     = subject1.substring(subject1.lastIndexOf("|") + 1, subject1.length());
            String[] itr = typeNameRevTemp.split(",");
			
			String type = itr[0].trim();
			String name = itr[1].trim();
			String rev = "";
			if (itr.length == 3) {
				rev = itr[2].trim();
			}
			
            
			String personCTX = PersonUtil.getDefaultSecurityContext(context, fromName);
            ContextUtil.pushContext(context, fromName, null, null);
            context.resetRole("ctx::"+ personCTX);
			context.resetVault("eService Production");
			
			//convert the TYPE NAME REVISION TO OBJECT ID
            String discussionId = MqlUtil.mqlCommand(context,"print bus $1 $2 $3 select $4 dump",type,name,rev,"Id");
            Random random           = new Random();
            int randomNumber        = random.nextInt(999999999);
            String newMessageName   = "auto_" + Integer.toString(randomNumber);
            DomainObject oldMessageBusObject = new DomainObject(discussionId);
            BusinessObject newMessageBusObject = new BusinessObject(strTypeMsg, newMessageName, "-", "eService Production");
            DomainObject newMessageDomObject = new DomainObject(newMessageBusObject);

            String subject = replyInf;
            String typename = oldMessageBusObject.getType(context);
            if(strTypeMsg.equalsIgnoreCase(typename))
            {
                String msgPolicy = oldMessageBusObject.getPolicy(context).getName();
                newMessageDomObject.create(context, msgPolicy);
                newMessageDomObject.open(context);
                newMessageDomObject.promote(context);
                newMessageDomObject.setDescription(context, message);
                subject = oldMessageBusObject.getAttributeValue(context, "Subject");
                subject = "Re ".concat(subject);
                subject = removeNamedBadChars(context, subject);
                newMessageDomObject.setAttributeValue( context, "Subject", subject);
                StringList busSelects = new StringList(4);
                busSelects.add(DomainObject.SELECT_ID);
                MapList objlist = oldMessageBusObject.getRelatedObjects(
                                context,        // matrix context
                                strRelReply,   // relationship pattern
                                "*",            // object pattern
                                busSelects,  // object selects
                                null,           // relationship selects
                                true,           // to direction
                                false,          // from direction
                                (short) 0,  // recursion level
                                null,           // object where clause
                                null);

                String topDiscussionObjId = discussionId;
                if(objlist.size()>0)
                {
                    Map topParentObj = (Map) objlist.get(objlist.size()-1);
                    topDiscussionObjId = (String) topParentObj.get(DomainObject.SELECT_ID);
                }
                try
                {
                    oldMessageBusObject.connectTo(context, strRelReply,
                                    newMessageDomObject);
                    if(propAllowCcSubscription.equalsIgnoreCase("true") && ccMailList!=null && ccMailList.length>0 && topDiscussionObjId!=null)
                    {
                        boolean subscribedStatus = autoCcSubscription(context,topDiscussionObjId,ccMailList);
                        subscribedStatus =  autoCcSubscription(context,topDiscussionObjId,toMailList);
                    }

                }
                catch(Exception ex)
                {
                    System.out.println("ERROR::" + ex.getMessage());
                    ex.printStackTrace();
                }
            }
            else
            {
            	newMessageBusObject.create(context, strPolicyMsg);
            	newMessageDomObject = new DomainObject();
            	newMessageDomObject.setId(newMessageBusObject.getObjectId());
                newMessageDomObject.open(context);
                newMessageDomObject.promote(context);
                newMessageDomObject.setDescription(context, message);
                DomainObject newThreadDomObject = new DomainObject();
                StringList busSelects = new StringList(2);
                busSelects.add(DomainObject.SELECT_TYPE);
                busSelects.add(DomainObject.SELECT_ID);
                MapList objlist = oldMessageBusObject.getRelatedObjects(
                                context,        // matrix context
                                strRelThread,   // relationship pattern
                                "*",            // object pattern
                                busSelects,  // object selects
                                null,           // relationship selects
                                false,           // to direction
                                true,          // from direction
                                (short) 0,  // recursion level
                                null,           // object where clause
                                null);
                String threadObjId = null;
                if(objlist.size()>0)
                {
                    Map threadObj = (Map) objlist.get(0);
                    threadObjId = (String) threadObj.get(DomainObject.SELECT_ID);
                    newThreadDomObject = new DomainObject(threadObjId);
                }
                if(threadObjId==null || "null".equals(threadObjId))
                {
                    int randomNumber2        = random.nextInt(999999999);
                    String newThreadName   = "auto_" + Integer.toString(randomNumber2);
                    BusinessObject newThreadBusObject = new BusinessObject(strTypeThread, newThreadName, "-", "eService Production");
                    newThreadBusObject.create(context, strPolicyThread);
                    threadObjId = newThreadBusObject.getObjectId();
                    newThreadDomObject = new DomainObject(newThreadBusObject);
                    try
                    {
                        oldMessageBusObject.connectTo(context, strRelThread,
                                    newThreadDomObject);
                    }
                    catch(Exception ex)
                    {
                        System.out.println("ERROR::" + ex.getMessage());
                        ex.printStackTrace();
                    }
                }
                subject = "Re ".concat(subject);
                subject = removeNamedBadChars(context, subject);
                newMessageDomObject.setAttributeValue( context, "Subject", subject);
                try
                {
                    newThreadDomObject.connectTo(context, strRelMsg,
                                    newMessageDomObject);
                }
                catch(Exception ex)
                {
                    System.out.println("ERROR::" + ex.getMessage());
                    ex.printStackTrace();
                }
                String newDiscussionObjectId = newMessageDomObject.getObjectId();
                boolean subscribedStatus = false;
                if(propAllowCcSubscription.equalsIgnoreCase("true") && ccMailList!=null && ccMailList.length>0 && newDiscussionObjectId!=null)
                {
                    subscribedStatus = autoCcSubscription(context,newDiscussionObjectId,ccMailList);
                    subscribedStatus =  autoCcSubscription(context,newDiscussionObjectId,toMailList);
                }
                subscribedStatus = autoCcSubscription(context,newDiscussionObjectId,fromMailList);
            }

            newMessageDomObject.close(context);
            ContextUtil.popContext(context);
        }
        catch(Exception exception)
        {
            System.out.println("ERROR ::" + exception.getMessage());
            exception.printStackTrace();
        }
    }

	
    /**
     * This method subscribes on discussion object for newDiscussion/new Reply event for the persons specified
     * @param context the eMatrix <code>Context</code> object
     * @param discussionId is the discussion object Id on which the subscription is to be done.
     * @param mailList is the list of persons that are to be subscribed on the discussion object for the new Discussion event.
     * @throws Exception if the operation fails
     * @since V6R2009-1
     */

    private boolean autoCcSubscription (Context context, String discussionId, com.matrixone.util.MxInternetAddress[] mailList) throws Exception
    {
        final String subscriptionAgent = PropertyUtil.getSchemaProperty(context, "person_SubscriptionAgent");
        for(int len = 0; len < mailList.length; len++)
        {
            String mailId           = mailList[len].getAddress().toLowerCase();
            String cmd = "list person email $1";
            if(cmd!=null && !"".equals(cmd.trim()) && !cmd.equalsIgnoreCase(subscriptionAgent))
            {
            	String fromName = MqlUtil.mqlCommand(context,cmd,mailId);
                ContextUtil.pushContext(context, fromName, null, null);
                SubscriptionUtil.createSubscription(context, discussionId, "New Reply,New Discussion", false, "Both");
                ContextUtil.popContext(context);
            }
        }
        return true;
    }


    /**
     * This method check for any unsupported character in the message and replaces that character with a supported one
       and also eliminate trim to get the exact reply message
     * @param message message that is to parsed for checking the unsupported characters
     * @throws Exception if the operation fails
     * @since V6R2009-1
     */

    private String checkForUnsupportedCharacter(String message)
    {
        if(message.indexOf("&") > 0)
            message  = com.matrixone.jsystem.util.StringUtils.replaceAll(message, "&", "_");

        if(message.indexOf("<") > 0)
            message  = com.matrixone.jsystem.util.StringUtils.replaceAll(message, "<", "[");

        if(message.indexOf(">") > 0)
            message  = com.matrixone.jsystem.util.StringUtils.replaceAll(message, ">", "]");

        if(message.indexOf("#") > 0)
            message  = com.matrixone.jsystem.util.StringUtils.replaceAll(message, "#", "_");
        // patterns to separate the reply from the UNDERSCORE Pattern
		com.matrixone.jsystem.util.MxPattern _onlyUnderscorePattern = com.matrixone.jsystem.util.MxPattern.compile("______+");

        // patterns to separate the reply from the original message
		com.matrixone.jsystem.util.MxPattern     _originalMessagePattern = com.matrixone.jsystem.util.MxPattern.compile
                ("(Original Message:)"+
                 "|(-----\\s?Original Message\\s?-----)"+
                 "|(wrote:$)"+
                 // this is for Outlook 2003; SD37261, SD37683
                 "(^  _____  $)");

        // Determine if pattern exists in input
        com.matrixone.jsystem.util.MxMatcher matcher = _onlyUnderscorePattern.matcher(message);
        // Get matching string
        if (matcher.find()) {
        message = message.substring(0, matcher.start());
        }
        else
        {
            matcher = _originalMessagePattern.matcher(message);
            if (matcher.find())
            {
                 message = message.substring(0, matcher.start());
            }
            else
            {
                //Eliminate the reply message followed by From:/To:/Sent:
                int endOfMessage = message.indexOf("From:");
                if(endOfMessage < 0)
                {
                    endOfMessage = message.indexOf("Sent:");
                }
                if(endOfMessage < 0)
                {
                    endOfMessage = message.indexOf("To:");
                }
                if(endOfMessage > 0)
                message = message.substring(0, endOfMessage);
            }
        }
        return message;
    }
    
    private String getTextFromHTMLPart(String html) {    	
    	String result =  Jsoup.parse(html).text();        
        return result;
    }
    //Need ODT
    private String removeNamedBadChars(Context context, String str) throws FrameworkException {
    	String emxNameBadChars = EnoviaResourceBundle.getProperty(context, "emxFramework.Javascript.NameBadChars");
    	String[] badCharList = emxNameBadChars.split(" ");
    	for(String s : badCharList) { 	
    		str = FrameworkUtil.findAndReplace(str, s, "");    		
    	}    	
    	str = FrameworkUtil.findAndReplace(str, "\"", "");
    	str = FrameworkUtil.findAndReplace(str, "\'", "");
    	str = FrameworkUtil.findAndReplace(str, "\\", "");    	
    	return str;
    }
    
}
