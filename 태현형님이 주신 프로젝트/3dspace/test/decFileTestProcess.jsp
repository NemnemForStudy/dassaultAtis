<%@page import="java.io.File"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	ContextUtil.startTransaction(context, true);
	
	String savePath = context.createWorkspace();
	 
	// 파일 크기 15MB로 제한
	int sizeLimit = 1024*1024*15;
	 
	//  ↓ request 객체,               ↓ 저장될 서버 경로,       ↓ 파일 최대 크기,    ↓ 인코딩 방식,       ↓ 같은 이름의 파일명 방지 처리
	// (HttpServletRequest request, String saveDirectory, int maxPostSize, String encoding, FileRenamePolicy policy)
	// 아래와 같이 MultipartRequest를 생성만 해주면 파일이 업로드 된다.(파일 자체의 업로드 완료)
	MultipartRequest multi = new MultipartRequest (request, savePath, sizeLimit, "utf-8");
	
	String fileName = multi.getFilesystemName("captureFile");
	 
	// 업로드한 파일의 전체 경로를 DB에 저장하기 위함
	String m_fileFullPath = savePath + "/" + fileName;
	
	File file = new File(m_fileFullPath);
	
	System.out.println(file.getName());
	
	// 1. decRequest
	// 2. checkin
	
	
	DomainObject doObj = DomainObject.newInstance(context, "22220.15368.17780.37672");
	doObj.checkinFile(context, false, true, "", "generic", file.getName(), savePath);
	
	String genericFormat = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_format_generic);
	
	FileList files = new FileList();
    matrix.db.File file2 = new matrix.db.File(file.getName(), genericFormat);
    files.addElement(file2);
	
	doObj.checkoutFiles(context, false, "generic", files, "c:\\temp");
	 
	ContextUtil.commitTransaction(context);
}catch(Exception e){
	ContextUtil.abortTransaction(context);
	e.printStackTrace();
	throw e;
}
%>