import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
let CALL_BACK : Function;
let Matrix : Matrix; 
 
const req = Matrix.getRequest(); 
const res = Matrix.getResponse(); 
const util = Matrix.getUtility(); 
const fso = Matrix.getFileSystemObject(); 

 
/************************************************
 *  FTP 서버에 파일을 업로드 하기
 * 
 ************************************************/
let ftp = null;
try{
  
	let VS_FTP_SERVER = req.getParam("VS_FTP_SERVER"); 
	let VS_PROTOCOL = req.getParam("VS_PROTOCOL"); 
	let VS_USER_CODE = req.getParam("VS_USER_CODE"); 
	let VS_USER_PWD = req.getParam("VS_USER_PWD"); 
	let VS_WORK_FOLDER = req.getParam("VS_WORK_FOLDER"); 
	let VN_PORT  = req.getParam("VN_PORT"); 
	
	
	let VS_UP_FolderName = req.getParam("VS_UP_FolderName"); 
	let VS_UP_SaveFileName = req.getParam("VS_UP_SaveFileName"); 
	let VS_UP_FileName = req.getParam("VS_UP_FileName"); 
	 
	
	if(VS_PROTOCOL == "FTP")
		ftp = Matrix.getFTPConnector(); //일반 ftp
	else 
		ftp = Matrix.getSFTPConnector(); //보안 연결
  
  	//연결하기
    ftp.Connect(VS_FTP_SERVER ,util.ToInteger(VN_PORT ,0) ,VS_USER_CODE ,VS_USER_PWD ,false);
	
	//작업 경로 설정
	ftp.setFolderPath(VS_WORK_FOLDER);
	
	//파일 업로드
	ftp.Upload(fso.PathCombine(VS_UP_FolderName ,VS_UP_SaveFileName) ,VS_UP_FileName);
	
	//client로 출력
	let table = ftp.getListFiles();
	table.AddColumn("IMG", false);
	for(let r=0;r<table.getRowCount(); r++){
		let row = table.getRow(r);
		if(row.getData("TYPE") == "FILE"){
			row.setData("IMG" ,"LOG_FILE");  //file image
		}else{
			row.setData("IMG" ,"LOG_FOLDER"); // folder image
		}
	}
	//client로 출력
	res.getDataSet().AddTable(table ,"LIST");
	
	ftp.DisConnect();
	ftp = null;
}catch(e){ 
	Matrix.ThrowException(e.message);
}finally{
	if(ftp != null){
		ftp.DisConnect();
		ftp = null;
	}
}