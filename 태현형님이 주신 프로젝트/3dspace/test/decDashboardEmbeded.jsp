<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
%>

<script type="text/javascript">
function fnOnload() {
	document.getElementsByTagName("html")[0].style.height = "100%";
	document.getElementsByTagName("body")[0].style.height = "100%";
}
</script>

<style type="text/css">
html body iframe {
	height: 100%;
	width: 100%;
}
</style>

	<body onload="fnOnload()">
		<iframe src="https://3ddashboard.3ds.localdomain/3ddashboard/#dashboard:0f67b614-40d3-4dbf-837c-a5083e492ef4/tab:%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EA%B0%9C%EC%9A%94"></iframe>	
	</body>
	
<%
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>