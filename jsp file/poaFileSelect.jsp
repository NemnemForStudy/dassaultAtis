<%@page import="com.matrixone.apps.domain.DomainConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.apps.domain.util.FrameworkUtil"%>
<!-- 없으면 내부 서버 오류 뜬다. -->
<%@include file="../emxUICommonAppInclude.inc"%>

<!-- 얘는 없으면 인코딩이 되질 않음 -->
<%@include file="emxCompCommonUtilAppInclude.inc"%>
<script language="JavaScript" src="scripts/emxUICollections.js" type="text/javascript"></script>

<!-- 얘는 없으면 화면이 에러가 뜨더라. -->
<%@include file="../emxUICommonHeaderBeginInclude.inc"%>

<!-- 얘는 아마 검증하는? 파일인거 같고 -->
<%@include file="../emxJSValidation.inc"%>

<!-- 뭐하는 놈이냐.. 확인해보니 날짜 및 시간 관련인거 같은데? -->
<%@include file="../emxUICommonHeaderEndInclude.inc"%>

<%
String parentOID = request.getParameter("parentOID");
// int형 n을 새로 만들어 줌
int n = 1;
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>

<body onLoad="document.editForm.collectionName.focus();">
	<!-- editForm을 만들고 method는 post(이렇게 해야 넘기고픈 값들이 넘어감
		enctype="multipart/form-data"를 form에 넣어주고 onsubmit은 doneMethod()사용
		action은 내가 사용하고자 하는 파일(poaSubmit.jsp)기입 -->
    <form name="editForm" method="post" enctype="multipart/form-data" onsubmit="doneMethod(); return false" action="poaSubmit.jsp">
        <table border="10" width="100%" cellpadding="5" cellspacing="2">
            <div>
            <tr>
                <td height="30px" width="10%">
                <emxUtil:i18n localize="i18nId">emxFramework.Common.FileChoice</emxUtil:i18n>
                </td>
            </div>
            <div>
                <td id="addFile">
                    <!-- parentOID 전달 -->
                    <input type="hidden" name="parentOID" value="<%=parentOID%>">
                    <% for(int i = 0; i < n; i++) { %>
						<div id="getFileName<%= i %>">
							<input type="file" name="file<%= i %>" id="file<%= i %>" onchange="displayFileName(this, <%= i %>)">
							<input type="hidden" name="fileName<%= i %>" id="fileName<%= i %>">
						</div>
					<% } %>
                </td>
            </div>
            <div>
                <td id="addButton">
                    <button type="button" onclick="addFileInput()"><img width="15px" src="../common/images/buttonDialogAddGray.gif"></button>
                </td>
            </div>
            </tr>
        </table>
    </form>
    <script>
    var n = <%= n %>; // 초기값 설정

    function addFileInput() {
    	n++; // n 값을 1 증가
        var container = document.getElementById("addFile");
        var getFileName = document.createElement("div");
        getFileName.id = "getFileName" + n;
        
        // n값을 더해줌으로써 파일 값들을 가져옴.
        var fileInput = createInputElement("file", "file" + n, "file" + n, function() { 
        	displayFileName(this, n); 
        });
        var hiddenInput = createInputElement("hidden", "fileName" + n, "fileName" + n);

        getFileName.appendChild(fileInput, hiddenInput);
        container.appendChild(getFileName);
        
        addButton();
    }
    
    // createInputElement에서 type, name, id, onchange값들을 가져옴
    // 마지막에 input값을 retrun;
    function createInputElement(type, name, id, onchange) {
        var input = document.createElement("input");
        input.type = type;
        input.name = name;
        input.id = id;
        input.onchange = onchange;
        return input;
    }
        
    // addButton으로 getElementById로 addButton값을 가져오고 createElement로 button을 만들어줌
    // style.display = 'flex'로 세로 정렬을 해줌
    // image는 가져올 img를 src로 지정해서 가져옴
    function addButton() {
        var container = document.getElementById("addButton");
        var addButton = document.createElement("button");
        addButton.type = "button";
        addButton.style.display = "flex"; // flex 속성을 사용하여 세로 정렬
        var image = '<img width="15px" src="../common/images/buttonDialogSubGray.gif">';
        // innerHTML로 image를 addButton에 넣어줌
        addButton.innerHTML = image;
        
        // onclick을 사용해 클릭시 deleteButton, deleteFile을 삭제하는기능 만듦
        addButton.onclick = function() {
            deleteButton(this);
            deleteFile(this);
        };
        
        // appendChild로 자식 노드 addButton을 추가해줌
        container.appendChild(addButton);
    }

    function deleteButton(buttonElement) {
    	// 부모노드에서 자식 노드를 제거하는 메서드이다.
        buttonElement.parentNode.removeChild(buttonElement); // 버튼 삭제
    }
    
    function deleteFile(fileInputElement) {
    	// querySelectorAll에서 addFile input값 type이 file인 값을 fileList에 저장
        var fileList = document.querySelectorAll("#addFile input[type='file']");
    	// fileList.length -1 로 fileList마지막 값을 가져옴.
        var lastFileIndex = fileList.length - 1;
        
    	// 만약 lastFileIndex값이 0이상이면
        if (lastFileIndex >= 0) {
        	// deleteFile에 fileList[마지막 값]을 넣어주고
            var deleteFile = fileList[lastFileIndex];
        	// nextElementSibling은 요소 다음의 형제 요소를 찾는 기능이다.
            var deleteLine = deleteFile.nextElementSibling;
        	// 만약 deleteLine이 있다면 remove해준다.
            if (deleteLine) {
                deleteLine.remove();
            }
        	// 마찬가지로 File도 삭제해줌
            deleteFile.remove();
        }
    }
    
    function doneMethod() {
        document.editForm.submit();
    }
    
    function displayFileName(input, index) {
    	// fileNames = []로 배열 생성	 
        var fileNames = [];
    	// input.files.length 길이만큼
    	// fileName에 각각의 name값을 넣어주고
        for (var i = 0; i < input.files.length; i++) {
            var fileName = input.files[i].name;
            // fileNames 배열에 push를 해준다.
            fileNames.push(fileName);
        }
    }
</script>
</body>
</html>