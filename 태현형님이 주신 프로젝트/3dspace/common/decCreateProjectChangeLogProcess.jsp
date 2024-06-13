<%@page import="java.sql.SQLException"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="java.time.LocalDate"%>
<%@page import="java.util.List"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@ include file="../emxUICommonAppInclude.inc"%>
<script language="javascript" src="scripts/emxUICore.js"></script>
<%	
	String sChangeLogNumber = "";
	String sProjectName = emxGetParameter(request, "projectName");
	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ){
		Map selectParamMap = new HashMap();
		selectParamMap.put("siteCd",sProjectName);
		List<Map> projectCountList = sqlSession.selectList("Project.selectCountProjectChangeLogHistory", selectParamMap);
		
		List<Map> maxNumberList = sqlSession.selectList("Project.selectMaxNumberProjectChangeLogHistory", selectParamMap);
		
		System.out.println("projectCountList:"+projectCountList);
		System.out.println("maxNumberList:"+maxNumberList);
		//documentList =  resultList;
		//Map<String, Object> selectParamMap =  new HashMap<String, Object>();
		//List<Map<String, Object>>  deliverableSequence = epcDao.queryForMapList("EPC0101.selectDeliverableSequence", null);
		//System.out.println("우리DB INSERT 전 deliverableSequence : "+ deliverableSequence);
		Map<String, Object> getCountMap = projectCountList.get(0);
		Map<String, Object> gMaxMap = maxNumberList.get(0);
		String sCount = String.valueOf(getCountMap.get("COUNT"));
		int intCount = Integer.parseInt(sCount);
		
		if(DecStringUtil.isNotEmpty(gMaxMap)){
			String sMax = String.valueOf(gMaxMap.get("CHANGELOGNUMBER"));
			int intMax = Integer.parseInt(sMax);
			if(intMax>=intCount){
				intMax += 1;
				sMax = Integer.toString(intMax);
				sChangeLogNumber=sMax;
			}else{
				intCount += 1;
				sCount = Integer.toString(intCount);
				sChangeLogNumber = sCount;
			}
		}else{
			intCount += 1;
			sCount = Integer.toString(intCount);
			sChangeLogNumber = sCount;
		}
		// DELIVERABLE IF_FLAG UPDATE //
		//sChangeLogNumber = sequence;
		//sqlSession.commit();
	}catch(RuntimeException e) { //보안 취약 조치
		e.printStackTrace();
		throw e;
	} finally {
	}
	//String sProjectName = emxGetParameter(request, "projectName");
	String sdecChange_Desc = emxGetParameter(request, "decChange_Desc");
	String sConstructionItem = emxGetParameter(request, "ConstructionItem");
	String sInputDate = emxGetParameter(request, "inputDate");
	String sOriginator = emxGetParameter(request, "originator");
	String sChangeOriginator = emxGetParameter(request, "decOwnerDisplay");
	String sRequestDate = emxGetParameter(request, "cutOffDate");
	String sOld_No = emxGetParameter(request, "Old_No");
	String sNew_No = emxGetParameter(request, "New_No");
	String sOperationCenter = emxGetParameter(request, "OperationCenter");
	String sStatus = emxGetParameter(request, "Status");
	String sSummary_Of_Outcome = emxGetParameter(request, "Summary_Of_Outcome");
	
	sInputDate = DecDateUtil.changeDateFormat(sInputDate, DecDateUtil.IF_FORMAT);
	sRequestDate = DecDateUtil.changeDateFormat(sRequestDate, DecDateUtil.IF_FORMAT);
	//sInputDate = DecDateUtil.changeDateFormat(sInputDate, DecDateUtil.FORMAT_YYYYMMDD);
	//sRequestDate =  DecDateUtil.changeDateFormat(sRequestDate, DecDateUtil.FORMAT_YYYYMMDD);
	
	//sDate = DecDateUtil.changeDateFormat(sDate, DecDateUtil.IF_FORMAT);
	//sCutOffDate = DecDateUtil.changeDateFormat(sCutOffDate, DecDateUtil.IF_FORMAT);
	String sToday = DecDateUtil.changeDateFormat(new Date(), DecDateUtil.IF_FORMAT);
	int insertRow = 0;
	List lImportData = new ArrayList();
	try(SqlSession sqlSession = decSQLSessionFactory.getSession()){
		Map mParam = new HashMap();
		mParam.put("CHANGELOGNUMBER", sChangeLogNumber);
		mParam.put("SITE_CD", sProjectName);
		mParam.put("CHANGE_DESC", sdecChange_Desc);
		mParam.put("ADDEDITDELETE", sConstructionItem);
		mParam.put("INPUT_DATE", sInputDate);
		mParam.put("ORIGINATOR", sOriginator);
		mParam.put("CHANGEORIGINATOR", sChangeOriginator);
		mParam.put("REQUEST_DATE", sRequestDate);
		mParam.put("OLD_NO", sOld_No);
		mParam.put("NEW_NO", sNew_No);
		mParam.put("OPERATIONCENTER", sOperationCenter);
		mParam.put("STATUS", sStatus);
		mParam.put("SUMMARYOFOUTCOME", sSummary_Of_Outcome);
		lImportData.add(mParam);
		sqlSession.update("Project.insertProjectChangeHistory", mParam);
		sqlSession.commit();
		%>
		<script>
			getTopWindow().closeSlideInDialog();
		</script>
		<%
		
		
	}catch (SQLException e) { //보안 취약 조치
		ContextUtil.abortTransaction(context);
		String msg = e.getMessage();
		System.out.println(msg);
		%>
		<script>
		alert("<%=msg%>");
		</script>
		<%
	}
		%>
		<script>
		getTopWindow().refreshTablePage();
		</script>
		<%
	
%>