<%@page import="java.text.ParseException"%>
<%@page import="java.sql.SQLException"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="com.matrixone.apps.domain.util.SetUtil"%>
<%@page import="com.matrixone.apps.domain.util.*"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<%@page import="java.util.Locale"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.time.LocalDate"%>
<%@page import="java.time.LocalDateTime"%>
<%@page import="java.time.format.DateTimeFormatter"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="matrix.db.JPO"%>
<%@page import="matrix.db.Environment"%>
<%@page import="com.matrixone.apps.domain.*"%>
<%@page import="java.util.*"%>
<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@include file="../emxUICommonAppInclude.inc"%>
<%@include file = "emxUIConstantsInclude.inc"%>
<%@include file = "../emxStyleDefaultInclude.inc"%>
<%@include file = "../emxStyleListInclude.inc"%>
<%@include file = "../emxStyleFormInclude.inc"%>
<%@include file = "emxCompCommonUtilAppInclude.inc"%>
<%@include file = "../emxTagLibInclude.inc" %>
<html>
<head>

<meta charset="UTF-8">
<script language="javascript" src="../common/scripts/emxUICore.js"></script>
<script language="javascript" src="../common/scripts/emxUICoreMenu.js"></script>
<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="JavaScript" src="../common/scripts/emxUICalendar.js" type="text/javascript"></script>
<script language="javascript" src="../common/scripts/emxUITimeline.js"></script>
<script language="JavaScript" src="scripts/emxUICollections.js" type="text/javascript"></script>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<script type="text/javascript" src="../common/scripts/emxUIModal.js"></script>
<script type="text/javascript" src="../common/scripts/emxUIPopups.js"></script>
<script src="../common/scripts/hichart/jquery-3.1.1.min.js"></script>
<script src="../common/scripts/hichart/highcharts.js"></script>
<script src="../common/scripts/hichart/map.js"></script>
<script src="../common/scripts/hichart/data.js"></script>
<script src="../common/scripts/hichart/world.js"></script>
<script src="../common/scripts/hichart/accessibility.js"></script>
<link rel="stylesheet" href="styles/emxUIExtendedHeader.css"/>
<link rel="stylesheet" href="styles/emxUIDefault.css"/>
<link rel="stylesheet" href="styles/emxUIToolbar.css"/>
<link rel="stylesheet" href="styles/emxUIMenu.css"/>
<link rel="stylesheet" href="styles/emxUIStructureBrowser.css"/>
<%@include file = "../emxUICommonHeaderBeginInclude.inc"%>
<%@include file = "../emxJSValidation.inc" %>
<script
	src="../common/scripts/hichart/proj4.js"></script>
<script
	src="../common/scripts/hichart/jquery-ui.min.js"></script>
<script language="JavaScript" src="../common/scripts/emxUIPopups.js"
	type="text/javascript"></script>
<link href="../common/styles/jquery-ui.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="../common/styles/decDailyLoginStatus.css">
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>

<style>
  td {
    white-space: nowrap; /* 텍스트 줄 바꿈 비활성화 */
  }
  
  #info thead th {
  position: sticky;
  top: 0;
  background-color: #c8c8c8; /* 머리 부분 배경색 */
  z-index: 1; /* 다른 내용 위에 표시 */
  }
  
  #info table tr:nth-child(odd) {
  background-color: #dcdcdc;
  }
	
	/* 짝수 행 스타일 */
  #info table tr:nth-child(even) {
	  background-color: #f2f2f2;
  }
</style>

</head>
<body>
	
	<%
	///////////////////////

	

	///////////////////////
	String startDateAlertMsg = EnoviaResourceBundle.getProperty(context, "emxProgramCentralStringResource", context.getLocale(),
			"emxProgramCentral.decDailyLoginStatus.startDateAlertMsg");
	System.out.println("startDateAlertMsg : " + startDateAlertMsg);
	
	DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    String categories ="";
    String userNameStr ="";
    String personFullNameStr ="";
    String personEmailStr ="";
    String data = "";
    String datas = "";
// 	try {
		try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ){
			Map selectParamMap = new HashMap();
			HashMap dailyMap = new HashMap();
			for(int i = 10; i > 0; i--) {
				LocalDate yesterday = LocalDate.now().minusDays(i);
				String start_date = yesterday.format(dateTimeFormatter); // mql 접속기록에 일치하는 데이터형태
			//	System.out.println( "조회할 날짜의 형태 : "+ start_date);
				selectParamMap.put("LOGIN_DATE",  start_date);
				List<Map> resultList = sqlSession.selectList("Project.selectDailyLoginStatus", selectParamMap);
				
				userNameStr 	  +=  "'";
				personFullNameStr +=  "'";
    			personEmailStr 	  +=  "'";
				
				StringList userNameList = new StringList();
				StringList fullNameList = new StringList();
				StringList emailList = new StringList();
				
    			for(Object oDecImageHolder : resultList) {
    				Map mDecImageHolder = (Map)oDecImageHolder;
    				String userName = (String) mDecImageHolder.get("PERSON_NAME");
    				System.out.println("userName: "+userName);
    				
    				String mPersonFullName = MqlUtil.mqlCommand(context, "print person $1 select $2 dump",
    						userName,"fullname");
    				String mPersonEmail = MqlUtil.mqlCommand(context, "print person $1 select $2 dump",
    						userName,"email");
    				
    				userNameList.add(userName);
    				userNameList.add(mPersonFullName);
    				userNameList.add(mPersonEmail);
    				
    				userNameStr += userName+"|";
    				personFullNameStr += mPersonFullName+"|";
    				personEmailStr += mPersonEmail+"|";
    			}
    			userNameStr 	  = userNameStr 		+ "',";
    			personFullNameStr = personFullNameStr   + "',";
    			personEmailStr 	  = personEmailStr      + "',";
				
				int rows = resultList.size();
				String loginUserCount = String.valueOf(rows);
				categories += "'"+start_date+"'" + ",";
				
				
			//	System.out.println("categories : "+categories.substring(0, categories.length()-1));
				data += loginUserCount + ",";
			//	System.out.println( "data : "+ data.substring(0, data.length()-1) );
				for(Map resultMap : resultList) {
			//		System.out.println("result:"+resultMap);
				}
			}
			categories = categories.substring(0, categories.length()-1);
			datas = data.substring(0, data.length()-1);
			userNameStr = userNameStr.substring(0, userNameStr.length()-1);
			personFullNameStr = personFullNameStr.substring(0, personFullNameStr.length()-1);
			personEmailStr = personEmailStr.substring(0, personEmailStr.length()-1);
			
			System.out.println( "categories : "+ categories);
			System.out.println( "datas : "+ datas);
			System.out.println( "dailyMap : "+ dailyMap);
			System.out.println( "userNameStr : "+ userNameStr);
		}

			
// 	}catch(MatrixException e) {
// 		e.printStackTrace();
// 		throw e;
// 	} finally {
// 	}
	
	
	%>

	<figure class="highcharts-figure">
    <div id="container" style="height: 500px;  max-width: 100%; left: 0; top: 80px; position: relative;"></div>
    <p class="highcharts-description">
    </p>
	</figure>
	
	   <!-- 클릭된 막대 정보를 표시할 div 엘리먼트 (기본적으로 숨겨둡니다) -->
    <div id="info" style="width: 750px; height:200px; left: 500px; top:600px; /*overflow:scroll;*/ padding: 0px; border: 0px; display: none; position: absolute; "></div>
	
	
	<form name ="select_date" id="select_date" 
		style= "background: white;  position: absolute; top: 50px; left: 50%; transform: translate(-50%, -50%); width: 550px; height: 20px;">
		<table style ="Border-Spacing : 5px;">
			   <tr>
			    <td>
			    	<label for ="fromDate">시작일</label>
			  	    <input type="text" id="fromDate" name="fromDate" value="" size="8" readonly="readonly" />
			  	    &nbsp;<a href="javascript:showCalendar('select_date', 'fromDate', '');"><img src="../common/images/iconSmallCalendar.gif" alt="Date Picker" border="0" /></a>
			    	<input type="hidden" name="fromDate_msvalue" value="" />
			    	<a class = "dialogClear" href = "javascript:;" onclick = "javascript:dateClear('from');">
						<emxUtil:i18n localize="i18nId">emxProgramCentral.Common.Clear</emxUtil:i18n>
					</a>
				</td>
				 <td>
			    	<label for ="toDate">종료일</label>
			  	    <input type="text" id="toDate" name="toDate" value="" size="8" readonly="readonly" />
			  	    &nbsp;<a href="javascript:showCalendar('select_date', 'toDate', '');"><img src="../common/images/iconSmallCalendar.gif" alt="Date Picker" border="0" /></a>
			    	<input type="hidden" name="toDate_msvalue" value="" />
					<a class = "dialogClear" href = "javascript:;" onclick = "javascript:dateClear('to');">
						<emxUtil:i18n localize="i18nId">emxProgramCentral.Common.Clear</emxUtil:i18n>
					</a>				
				</td>
				<td>
				<p id="p_all"><input type="submit" value="Submit"></p>
				</td>
			  </tr>
				
		</table>
	</form>
	
	
	<script>
		var now_utc = Date.now() // 지금 날짜를 밀리초로
		// getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환
		var timeOff = new Date().getTimezoneOffset()*60000+86400000; // msec+24h
		var yesterday = new Date(now_utc-timeOff).toISOString().split("T")[0];
		
		var timeOff2 = new Date().getTimezoneOffset()*60000+86400000*10; // msec+24h+10 days
		var startday = new Date(now_utc-timeOff2).toISOString().split("T")[0];
		document.getElementById("fromDate").setAttribute("value", startday);
		document.getElementById("toDate").setAttribute("value", yesterday);
		
		

		
		function dateClear(date){
			if(date === 'from'){
				document.select_date.fromDate.value = '';
				}
			else{
				document.select_date.toDate.value = '';
				}
		  }
		
	</script>
	<script>
	
	
	
	document.addEventListener('DOMContentLoaded', function () {
		
		var dataString = [<%=categories%>];
		var data = [<%= datas %>];
		var userName = [<%= userNameStr %>];
		var fullName = [<%= personFullNameStr %>];
		var eMail =    [<%= personEmailStr %>];
		  console.log('=======dataString======'+dataString);
		  console.log('=======data====='+data);
		
		  
		  
		renderChart(data, dataString, userName, fullName, eMail) // 페이지 로드됐을때 방문자 그래프 작성
		
		var form = document.getElementById('select_date');
	    form.addEventListener('submit', function (event) {
	        event.preventDefault();
			  var start_date = this.fromDate.value
			  var end_date = this.toDate.value
			  console.log("조회시작날짜:"+start_date)
			  console.log("조회끝나는날짜:"+end_date)
			  
		      var start_date2 = new Date(start_date);
		      var end_date2 = new Date(end_date);
		      
		      // 시간을 00:00:00으로 맞춰주지않으면 날짜차이 계산에 문제가 생긴다.
		      start_date2.setHours(0, 0, 0, 0); 
		      end_date2.setHours(0, 0, 0, 0);
		      console.log("date타입으로 변경된 조회시작날짜:"+start_date2)
			  console.log("date타입으로 변경된 조회끝나는날짜:"+end_date2)
		      if (start_date2 > end_date2) {
		    	  alert('<%= startDateAlertMsg %>');
		    	  return; // return 처리하면 alert 후 그래프를 새로 그리지않는다.
		    	  
		      }
		      
		      //31일-28일이면 3 출력.
			  var timeDiff = Math.abs(end_date2.getTime() - start_date2.getTime());
			  var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))+1;
			  console.log("날짜차이:"+ dayDiff); 
			  //start_date2.setDate(start_date2.getDate() + 1);
			 // var nextDay  = start_date2.toISOString().slice(0, 10);
			 // console.log(nextDay);
			  start_date2.setDate(start_date2.getDate() + 1);
			  var startDay  = start_date2.toISOString().slice(0, 10);	
			  
			 
			  var newCategories =[];
			  newCategories.push(startDay);
			  for (var i = 1; i < dayDiff; i++) {
				  start_date2.setDate(start_date2.getDate() + 1);
				  var nextDay  = start_date2.toISOString().slice(0, 10);
				  console.log("---")
				  console.log(nextDay)
				  startDay += ","+ nextDay;
				  newCategories.push(nextDay);							  
				 
			  }
			  var userNameArr   =[];
			  var personNameArr =[];
			  var eMailArr      =[];
			 

			  //newCategories.push(startDay);
			  console.log('=======newCategories시작======');
			  console.log(newCategories);
			  var formData = { proId: startDay };
			  console.log('=======formData시작======');
			  console.log(formData);
			  console.log('=======ajax시작======');
			 
						 console.log(formData);
			 $.ajax({
			    url: './decDailyLoginStatusProcess.jsp', // 데이터를 가져올 URL을 설정합니다.
			    method: 'POST', // 요청 방식을 설정합니다.
			    data : formData,
			    success: function(response) {
			    	var infoDiv = document.getElementById('info');
					  //containerDiv.appendChild(infoDiv);
					infoDiv.style.display = 'none';
			        // AJAX 요청이 성공하면 수행할 작업을 처리합니다.
			        // 응답 데이터는 response 변수에 담겨 있습니다.			       
			        var closingBraceIndex = response.lastIndexOf('}');
			        var trimmedResponse = response.substring(0, closingBraceIndex + 1);
			        console.log('수정된 response1:'+trimmedResponse);
			        var responseObj = JSON.parse(trimmedResponse);
			        console.log('수정된 response2:'+responseObj);		
			        
			        var newData =[];
			        var abc  = responseObj.logindata;
			        console.log('abc:'+ abc);
			        var splitNewData = abc.split(',');
			        console.log('splitNewData:'+ splitNewData);
			        
			        for (var j = 0; j < splitNewData.length; j++) {
			        	console.log("splitNewData:"+ j +"번"+splitNewData[j])
			        	
			        	var splitNewDataArray = splitNewData[j];
			        	 console.log('splitNewDataArray:'+ splitNewDataArray);
			        	 console.log('splitNewDataArrayLength:'+ splitNewDataArray.length);
			        	 splitNewData[j] *= 1;
			        	 newData.push(splitNewData[j]);
			        	
			        }
			       // newData.push(abc); // 
			        console.log('++++++수정된 newData:'+newData);	
			        var start_login_date = responseObj.startDay;
			        console.log('start_login_date:'+ start_login_date);
			        console.log("최종다시그려져야할 로그인유저수:" +newData);	
					console.log("최종다시그려져야할 날짜:" +newCategories);	
					
					
					
					
					 var userName        = responseObj.userName.replace(/^'|'$/g, '');
					 var personName      = responseObj.personName.replace(/^'|'$/g, '');
					 var eMail  	     = responseObj.eMail.replace(/^'|'$/g, '');

					 const userNameArr   = userName.split(',');
					 const personNameArr = personName.split(',');
					 const eMailArr      = eMail.split(',');
					 console.log(Array.isArray(userNameArr));
					 console.log(Array.isArray(personNameArr));
					 console.log(Array.isArray(eMailArr));
					 
			        renderChart(newData, newCategories, userNameArr, personNameArr, eMailArr)
			      },
			      error: function(xhr, status, error) {
			        // AJAX 요청이 실패하면 수행할 작업을 처리합니다.
			        console.log('AJAX Error:', error);
			      }
			    });

		});

		function renderChart(data, categoriesDate, userName , fullName, eMail) {
			
			console.log("보여지는 날짜:" +categoriesDate);
			console.log("보여지는 유저수:" +data);
			console.log("보여지는 유저이름:" +userName);
			console.log("보여지는 유저이름:" +fullName);
			console.log("보여지는 유저이름:" +eMail);
			
			var chart; // chart 변수를 전역 변수로 선언합니다.
			chart =Highcharts.chart('container', {
			  chart: {
			    type: 'column'
			  },
			  credits: {enabled:false}
			  ,
			  title: {
			    text: '일별 사용자 접속 현황'
			  },
			  xAxis: {
				  
				  categories: categoriesDate,

			  },
			  yAxis: {
				  min: 0,
				    
			    title: {
			      text: '접속자(명)'
			    }
			
			  },
			  tooltip: {
			    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			    pointFormat: '',
			    footerFormat: '</table>',
			    shared: true,
			    useHTML: true
			  },
			  plotOptions: {
			    column: {
			    }
			  },
			  series: [{
			    name: '일별접속자',
			    data: data,
			    point: {
                    events: {
                        click: function() {
                            // 클릭 이벤트 처리
                            var clickedDate = chart.xAxis[0].categories[this.index];
                            var matchedIndex = categoriesDate.indexOf(clickedDate);
                            var userNameList = '';
                            if (matchedIndex !== -1) {
                                // userNameStr에서 해당 인덱스에 해당하는 값을 가져옴
                                userNameList    = userName[matchedIndex]; 
                                personNameList  = fullName[matchedIndex]; 
                                personEmailList = eMail[matchedIndex]; 
                                
                            }
                            userNameList    = userNameList.replace(/^'|'$/g, '');
                            personNameList  = personNameList.replace(/^'|'$/g, '');
                            personEmailList	= personEmailList.replace(/^'|'$/g, '');
                            
                            displayInfo(clickedDate,userNameList,personNameList,personEmailList);
                        }
                    }
                },
			    dataLabels: {
			        enabled: true,
			        formatter: function() {
	                    // 데이터 값이 0이면 데이터 라벨을 표시하지 않음
	                    if (this.y === 0) {
	                        return '';
	                    }
	                    return this.y;
	                }
			      }
			
			  }]
			});
			
			
			function displayInfo(date,userNameList, personNameList, personEmailList) {
	            var infoDiv = document.getElementById('info');
	            var tableHtml = '<table border="0"> <thead><tr><th>사번</th><th>이름</th><th>Email</th></tr></thead> <tbody>';
	         // 이미지를 포함한 HTML 문자열을 생성합니다.
	         	var imageUrl = '../common/images/iconPerson16.png';
	            var imageHtml = '<img src="' + imageUrl + '" alt="사용자"></a>';
	            var userNameListSplit = userNameList.split('|');
	            var nameString =''; // 빈 문자열로 초기화

	            var userNameListSplit = userNameList.split('|');
	            var personNameListSplit = personNameList.split('|');
	            var personEmailListSplit = personEmailList.split('|');
	            for (var i = 0; i < userNameListSplit.length; i++) {
	                tableHtml += '<tr>';
	                // 첫 번째 열에는 name, 두 번째 열에는 URL, 세 번째 열에는 krname 값을 넣습니다.
	                tableHtml += '<td>' + userNameListSplit[i] + '</td>';
	                tableHtml += '<td>' + personNameListSplit[i] + '</td>';
	                tableHtml += '<td>' + personEmailListSplit[i] + '</td>';
	                tableHtml += '</tr>';
	            }
	            tableHtml += '</tbody></table>';
	            
	            infoDiv.innerHTML = tableHtml;
	            
	            infoDiv.style.position = 'fixed';
				infoDiv.style.display = 'block'; // 막대 정보를 보여줍니다.
				infoDiv.style.height = '200px'; // 막대 정보를 보여줍니다.
				infoDiv.style.overflow = 'scroll'; // 막대 정보를 보여줍니다.
	        }
		}
	});
		</script>
</body>
</html>