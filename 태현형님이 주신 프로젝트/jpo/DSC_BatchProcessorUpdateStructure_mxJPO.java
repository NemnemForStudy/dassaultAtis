/*
 **  DSC_BatchProcessorUpdateStructure
 **
 **  All Rights Reserved.
 **  This program contains proprietary and trade secret information of Dassault Systemes and its 
 **  subsidiaries, Copyright notice is precautionary only
 **  and does not evidence any actual or intended publication of such program
 **
 ** Program to create DSCMessage for Background Update Structure. 
 */

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Hashtable;

import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.Relationship;
import matrix.db.RelationshipItr;
import matrix.db.RelationshipList;
import matrix.db.RelationshipType;
import matrix.util.StringList;

import java.util.HashMap;
import java.util.Map;

import com.matrixone.MCADIntegration.server.MCADServerException;
import com.matrixone.MCADIntegration.server.MCADServerResourceBundle;
import com.matrixone.MCADIntegration.server.batchprocessor.DSCMessage;
import com.matrixone.MCADIntegration.server.batchprocessor.DSCQueue;
import com.matrixone.MCADIntegration.server.batchprocessor.DSCQueueFactory;
import com.matrixone.MCADIntegration.server.beans.MCADMxUtil;
import com.matrixone.MCADIntegration.server.cache.IEFGlobalCache;
import com.matrixone.MCADIntegration.utils.MCADException;
import com.matrixone.MCADIntegration.utils.MCADGlobalConfigObject;
import com.matrixone.MCADIntegration.utils.xml.IEFXmlNodeImpl;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;




public class DSC_BatchProcessorUpdateStructure_mxJPO
{
	private MCADMxUtil _util = null;
	private MCADServerResourceBundle _serverResourceBundle = null;
	private IEFGlobalCache _cache = null;
	private MCADGlobalConfigObject gco = null;

	private String integrationName = null;
	private String operationName = null;
	private String relCADSubComponent = null;



	public DSC_BatchProcessorUpdateStructure_mxJPO(Context context,String[] args) throws Exception 
	{
		if (!context.isConnected())
			throw new Exception("not supported no desktop client");
	}

	public int mxMain(Context context, String[] args) throws Exception
	{
		return 0;
	}

	public void createMessageObject(Context context, String[] args)throws Exception 
	{
		try 
		{													
			HashMap hashMapArgs = (HashMap) JPO.unpackArgs(args);

			this.integrationName = (String) hashMapArgs.get("integrationName");
			this.operationName = (String) hashMapArgs.get("operationName");

			String type = (String) hashMapArgs.get("type");
			String name = (String) hashMapArgs.get("name");
			String rev = (String) hashMapArgs.get("rev");
			String ver = (String) hashMapArgs.get("ver");
			String languageName = (String) hashMapArgs.get("language");
			String activeMessageRelationship = (String) hashMapArgs.get("activemessagerel");


			this._serverResourceBundle = new MCADServerResourceBundle(languageName);
			this._cache = new IEFGlobalCache();
			this._util = new MCADMxUtil(context, _serverResourceBundle, _cache);

			String personSiteName = getPersonSiteName(context);
			String queueName = null;

			DSC_GetBatchProcessorDetails_mxJPO batchProcessorDetails = new DSC_GetBatchProcessorDetails_mxJPO();

			if (personSiteName == null || personSiteName.trim().equals(""))
			{
				String[] args1 = new String[1];
				args1[0] = operationName;
				queueName = batchProcessorDetails.getDefaultSiteBatchOperationQueueName(context, args1);
			} 
			else 
			{
				try
				{
					String[] args2 = new String[2];
					args2[0] = operationName;
					args2[1] = personSiteName;

					queueName = batchProcessorDetails.getBatchOperationQueueNameForSite(context, args2);
				} 
				catch (Exception exception)
				{
					Hashtable exceptiontable = new Hashtable(1);
					exceptiontable.put("OPERATION", operationName);
					MCADServerException.createException(_serverResourceBundle.getString("mcadIntegration.Server.Message.FailedToGetBatchOperationQueueName",exceptiontable), exception);
				}
			}

			if(queueName != null && !queueName.equals(""))
			{
			boolean canConnectMsg = true;

			BusinessObject busObj = new BusinessObject(type, name, rev, "");
			busObj.open(context);

			RelationshipList relList = _util.getToRelationship(context, busObj,(short) 0, false);

			if (relList != null) 
			{
				RelationshipItr relItr = new RelationshipItr(relList);
				while (relItr.next())
				{
					Relationship returnRel = relItr.obj();
					if (returnRel.getTypeName().equals(activeMessageRelationship))
					{
						returnRel.open(context);
						BusinessObject msgObj = returnRel.getFrom();
						if (_util.getCurrentState(context,msgObj.getObjectId(context)).equals("Submitted"))
						{
		
					canConnectMsg = false;
						}
					}
				}

				if (canConnectMsg) 
				{
					//DSCQueue queue = new DSCQueue(context,MCADMxUtil.getActualNameForAEFData(context,"type_DSCQueue"), queueName);
					DSCQueue queue 		= DSCQueueFactory.getInstance(context, queueName);

					if (!queue.exists(context)) 
					{
						queue.create(context, MCADMxUtil.getActualNameForAEFData(context,"policy_DSCQueuePolicy"));
					}

					queue.open(context);

					String uniqueName = getUniqueNameForMessage();
					String messageBody = createMessageBody(context, uniqueName,type, name, ver);

					DSCMessage messageObject = new DSCMessage(context,uniqueName, messageBody);

					if (!messageObject.exists(context)) 
					{
						messageObject.create(context, MCADMxUtil.getActualNameForAEFData(context,"policy_DSCMessagePolicy"));
					}

					_util.setAttributeOnBusObject(context, messageObject,MCADMxUtil.getActualNameForAEFData(context,"attribute_Title"), operationName);

					messageObject.open(context);
					messageObject.setBody(context, messageBody);
					messageObject.setPriority(context, "1");
					messageObject.close(context);

					queue.addPendingMessage(context, messageObject);

					connectMessageAndBusObj(context, busObj, messageObject,activeMessageRelationship, false);

					queue.close(context);
				}
			}
		} 
		}
		catch (Exception e) 
		{
			MCADServerException.createManagedException("IEF0133200103",_serverResourceBundle.getString("mcadIntegration.Server.Message.IEF0133200103"),e);
		}
	}


	private void connectMessageAndBusObj(Context context,BusinessObject busObj, DSCMessage messageObj,String relationshipName, boolean isFrom) throws Exception 
	{
		RelationshipType relType = new RelationshipType(relationshipName);
		relType.open(context);
		Relationship activeMessage = busObj.connect(context, relType, isFrom,messageObj);
		relType.close(context);
	}


	private String getPersonSiteName(Context context) throws MCADException 
	{
		String personSite = null;
		String Args[] = new String[1];
		Args[0] = context.getUser();
		String mqlResult = _util.executeMQL(context,"print person $1 select site dump", Args);

		if (mqlResult.startsWith("true|"))
			personSite = mqlResult.substring(mqlResult.indexOf("|") + 1,mqlResult.length());
		else
			MCADServerException.createException(_serverResourceBundle.getString("mcadIntegration.Server.Message.FailedToGetSiteName")+ mqlResult, null);

		return personSite;
	}

	private String getUniqueNameForMessage()
	{
		// Format the date time stamp
		Calendar calendar = Calendar.getInstance();
		String timePattern = "yyyy.MM.dd_HH.mm.ss";
		SimpleDateFormat formatter = (SimpleDateFormat) DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG);
		formatter.applyPattern(timePattern);

		String timeStamp = formatter.format(calendar.getTime());
		String uniqueName = timeStamp + "_" + java.util.UUID.randomUUID().toString();

		return uniqueName;
	}

	private String createMessageBody(Context context, String messageName,String type, String name, String ver) throws Exception 
	{
		IEFXmlNodeImpl messageNode = new IEFXmlNodeImpl(IEFXmlNodeImpl.TAG);
		messageNode.setName("message");

		IEFXmlNodeImpl messageNameNode = new IEFXmlNodeImpl(IEFXmlNodeImpl.TAG);
		messageNameNode.setName("messagename");
		messageNameNode.setContent(messageName);
		messageNode.addNode(messageNameNode);

		IEFXmlNodeImpl operationNameNode = new IEFXmlNodeImpl(IEFXmlNodeImpl.TAG);
		operationNameNode.setName("operationname");
		operationNameNode.setContent(operationName);
		messageNode.addNode(operationNameNode);

		IEFXmlNodeImpl integrationNameNode = new IEFXmlNodeImpl(IEFXmlNodeImpl.TAG);
		integrationNameNode.setName("integrationname");
		integrationNameNode.setContent(integrationName);
		messageNode.addNode(integrationNameNode);
		
		IEFXmlNodeImpl ignoreLockNode = new IEFXmlNodeImpl(IEFXmlNodeImpl.TAG);
		ignoreLockNode.setName("ignoreLock");
		ignoreLockNode.setContent("false");
		messageNode.addNode(ignoreLockNode);

		IEFXmlNodeImpl messageBodyNode = new IEFXmlNodeImpl(IEFXmlNodeImpl.TAG);
		messageBodyNode.setName("messagebody");
		messageNode.addNode(messageBodyNode);

		IEFXmlNodeImpl cadObjectListNode = new IEFXmlNodeImpl(IEFXmlNodeImpl.TAG);
		cadObjectListNode.setName("cadobjectlist");
		messageBodyNode.addNode(cadObjectListNode);

		IEFXmlNodeImpl cadObjectNode = new IEFXmlNodeImpl(IEFXmlNodeImpl.TAG);
		cadObjectNode.setName("cadobject");
		cadObjectListNode.addNode(cadObjectNode);


		Hashtable cadObjectAttributes = new Hashtable();
		cadObjectAttributes.put("type", type);
		cadObjectAttributes.put("name", name);
		cadObjectAttributes.put("revision", ver);
		cadObjectNode.setAttributes(cadObjectAttributes);


		return messageNode.getXmlString();
	}

	public void deleteMessageObject(Context context, String[] args)throws Exception
	{
		try 
		{
			//System.out.println("Delete messgae object --- request");
			HashMap hashMapArgs = (HashMap) JPO.unpackArgs(args);
			String type = (String) hashMapArgs.get("type");
			String name = (String) hashMapArgs.get("name");
			String rev = (String) hashMapArgs.get("rev");

		//	System.out.println("Delete messgae object --- hashMapArgs-->"+hashMapArgs);
			
			String languageName = (String) hashMapArgs.get("language");
			this._serverResourceBundle = new MCADServerResourceBundle(languageName);
			this._util = new MCADMxUtil(context, _serverResourceBundle, _cache);

			String REL_CADSUBCOMP = this._util.getActualNameForAEFData(context,"relationship_CADSubComponent");
			String REL_ACTIVEMESSAGE = this._util.getActualNameForAEFData(context,"relationship_ActiveMessage");
			
		String ATTR_REL_MODIFICATION_STATUS_IN_MATRIX = this._util.getActualNameForAEFData(context,"attribute_RelationshipModificationStatusinMatrix");
		String SEL_ATTR_RELMODSTATUS= "attribute["+ATTR_REL_MODIFICATION_STATUS_IN_MATRIX+"]";
		
			String cadSubcomponentRelationship = (String) hashMapArgs.get("cadsubcomprel");
			//System.out.println("cadSubcomponentRelationship->"+cadSubcomponentRelationship);
			String activeMessageRelationship = (String) hashMapArgs.get("activemessagerel");

			BusinessObject busChildObj = new BusinessObject(type, name, rev, "");
			busChildObj.open(context);
			String sParentOid = busChildObj.getObjectId(context);
			busChildObj.close(context);
			//System.out.println("sParentOid-->"+sParentOid);
		StringList busSelectsJobs = new StringList(2);
		busSelectsJobs.add( DomainObject.SELECT_ID );
		busSelectsJobs.add( DomainObject.SELECT_CURRENT);

			
			
DomainObject doObj = DomainObject.newInstance(context,sParentOid);


				MapList mlJobsInfo = doObj.getRelatedObjects( 	context,
															REL_ACTIVEMESSAGE,
															"*",
															busSelectsJobs,
															null,
															true, //toDir
															false, //fromDir
															(short)1,
															null,
															null,
															0 );
//System.out.println("mlJobsInfo-->"+mlJobsInfo);
String sPendingJobId  = null;
		boolean bPendingJobExists = false;
		for (int i = 0; i < mlJobsInfo.size(); i++) {
			Map mItem = (Map)mlJobsInfo.get( i );
			sPendingJobId = (String) mItem.get( DomainObject.SELECT_ID ) ;
			String sJobStatus = (String) mItem.get( DomainObject.SELECT_CURRENT ) ;
			if("Submitted".equals(sJobStatus))
			{
				bPendingJobExists = true;
				break;
			}
		}
	
//System.out.println("bPendingJobExists-->"+bPendingJobExists);
		if(bPendingJobExists){

			StringList busSelects = new StringList(1);
			busSelects.add( DomainObject.SELECT_ID );

			StringList relSelects = new StringList(2);
			relSelects.addElement(DomainRelationship.SELECT_ID);
			relSelects.addElement(SEL_ATTR_RELMODSTATUS);
			//Getting all components connected to the object
			MapList mlInfo = doObj.getRelatedObjects( 	context,
														REL_CADSUBCOMP,
														"*",
														busSelects,
														relSelects,
														false, //toDir
														true, //fromDir
														(short)1,
														null,
														null,
														0 );			
//System.out.println("mlInfo-->"+mlInfo);			
			boolean bToDeleteJob = false;
			if(mlInfo.size()==0){
				bToDeleteJob = true;
			} else {
					boolean bPendingAssyLikeConnectionExists = false;
					for (int i = 0; i < mlInfo.size(); i++) {
						Map mItem = (Map)mlInfo.get( i );
						String sMajToMajRelId = (String) mItem.get( DomainRelationship.SELECT_ID ) ;
						String srelModStatusValue = (String) mItem.get( SEL_ATTR_RELMODSTATUS ) ;
						if(srelModStatusValue!=null && srelModStatusValue.length() != 0)
						{
							bPendingAssyLikeConnectionExists = true;
							break;
						}
					}
					//System.out.println("after for loop--bPendingAssyLikeConnectionExists-->"+bPendingAssyLikeConnectionExists);	
					if(!bPendingAssyLikeConnectionExists){
						bToDeleteJob = true;
					}

			}		
		//	System.out.println("bToDeleteJob-->"+bToDeleteJob);	
		//	System.out.println("sPendingJobId-->"+sPendingJobId);	
			if(bToDeleteJob){
		//		System.out.println("Job to be deleted..");
				BusinessObject msgObj = new BusinessObject(sPendingJobId);
				msgObj.remove(context);
			}
		}
//System.out.println("Delete job-processing-completed..");

/*			busChildObj.open(context);
			RelationshipList relChildList = _util.getToRelationship(context,busChildObj, (short) 0, false);
						System.out.println("relChildList->"+relChildList);
			if (relChildList != null)
			{
				RelationshipItr relItr = new RelationshipItr(relChildList);
				while (relItr.next())
				{
					Relationship returnRel = relItr.obj();
					System.out.println("returnRel->"+returnRel);
					if (returnRel.getTypeName().equals(cadSubcomponentRelationship))
					{
						System.out.println("returnRel is CAD Submco->");
						String relChildId = returnRel.getName();System.out.println("relChildId->"+relChildId);
						returnRel.open(context);

						BusinessObject parentObj = returnRel.getFrom();

						RelationshipList relParentList = _util.getToRelationship(context, parentObj,(short) 0, false);
						System.out.println("relParentList->"+relParentList);
						if (relParentList != null)
						{
							RelationshipItr relParentItr = new RelationshipItr(relParentList);
							while (relParentItr.next()) 
							{
								Relationship returnParentRel = relParentItr.obj();
									System.out.println("each returnParentRel->"+returnParentRel);
								if (returnParentRel.getTypeName().equals(activeMessageRelationship))
								{
									System.out.println("each returnParentRel is act messgae->");
									returnParentRel.open(context);
									BusinessObject msgObj = returnParentRel.getFrom();
									System.out.println("eacmsgObje->"+msgObj);
									// check state of message object
									if (_util.getCurrentState(context,msgObj.getObjectId(context)).equals("Submitted")) 
									{
										System.out.println("eacmsgObje in Submitetd->");
										RelationshipList relAllChildList = _util.getFromRelationship(context,parentObj, (short) 0,false);
										System.out.println("relAllChildList->"+relAllChildList);
										if (relAllChildList != null)
										{
											
											RelationshipItr relAllChildListItr = new RelationshipItr(relAllChildList);
											boolean deleteMsgObj = false;

											int counter = 0;
											while (relAllChildListItr.next())
											{
												Relationship returnAllChildRel = relAllChildListItr.obj();
												System.out.println("while returnAllChildRel->"+returnAllChildRel);
												String returnRelID = returnAllChildRel.getName();
System.out.println("while returnRelID->"+returnRelID);
												if (!relChildId.equals(returnRelID)) 
												{
													System.out.println("while returnRelID NOT same->");
													if (returnAllChildRel.getTypeName().equals(cadSubcomponentRelationship))
													{
														System.out.println("while returnRelID NOT same INSIDE->");
														counter++;
														System.out.println("while returnRelID NOT same INSIDE counter->"+counter);
														returnAllChildRel.open(context);
														String attrValue = _util.getRelationshipAttributeValue(context,returnAllChildRel,MCADMxUtil.getActualNameForAEFData(context,"attribute_RelationshipModificationStatusinMatrix"));
System.out.println("while returnRelID NOT same INSIDE RMSINMANTRIX attrValue->"+attrValue+"<-->");
														if (attrValue == null|| attrValue.length() == 0) 
														{
															System.out.println("deleteMsgObj->"+deleteMsgObj+"<-->");
															deleteMsgObj = true;
														}
													}
												}
											}
System.out.println("while ends-deleteMsgObj->"+deleteMsgObj+"<-->");
System.out.println("while ends-counter->"+counter+"<-->");
											if (deleteMsgObj || (counter < 1)) 
											{
												System.out.println("remove message...");
												msgObj.remove(context);
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
*/			


		} 
		catch (Exception e) 
		{
			MCADServerException.createException(_serverResourceBundle.getString("mcadIntegration.Server.Message.FailedWhileDeletingDSCMessage"),e);
		}

	}

}
