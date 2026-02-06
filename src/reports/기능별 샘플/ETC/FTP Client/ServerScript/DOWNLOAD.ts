import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 
import { ScriptRecordSet } from "@AUD_SERVER/matrix/script/ScriptRecordSet"; 
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement"; 
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow"; 
import { ScriptTextFileWriter } from "@AUD_SERVER/matrix/script/io/ScriptTextFileWriter"; 
import { ScriptRequestPacket } from "@AUD_SERVER/matrix/script/ScriptRequestPacket"; 
import { ScriptResponsePacket } from "@AUD_SERVER/matrix/script/ScriptResponsePacket"; 
import { ScriptUtility } from "@AUD_SERVER/matrix/script/ScriptUtility"; 
import { ScriptFileSystemObject } from "@AUD_SERVER/matrix/script/ScriptFileSystemObject";  
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection"; 
import { ScriptSession } from "@AUD_SERVER/matrix/script/ScriptSession"; 
import { ScriptQueryGenerator } from "@AUD_SERVER/matrix/script/ScriptQueryGenerator"; 

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
let CALL_BACK : Function;
let Matrix : Matrix; 
 
const req = Matrix.getRequest(); 
const res = Matrix.getResponse(); 
const util = Matrix.getUtility(); 
const fso = Matrix.getFileSystemObject(); 

 
/************************************************
 * FTP 서버에서 파일을 다운로드 합니다.
 ************************************************/
let ftp = null;
try{
  // do something...
	let VS_FTP_SERVER = req.getParam("VS_FTP_SERVER"); 
	let VS_PROTOCOL = req.getParam("VS_PROTOCOL"); 
	let VS_USER_CODE = req.getParam("VS_USER_CODE"); 
	let VS_USER_PWD = req.getParam("VS_USER_PWD"); 
	let VS_WORK_FOLDER = req.getParam("VS_WORK_FOLDER"); 
	let VN_PORT = req.getParam("VN_PORT"); 
	let VS_FILE_NAME = req.getParam("VS_FILE_NAME"); 
	
	
	if(VS_PROTOCOL == "FTP")
		ftp = Matrix.getFTPConnector(); //일반 ftp
	else 
		ftp = Matrix.getSFTPConnector(); //보안 연결
  
  	//연결하기
    ftp.Connect(VS_FTP_SERVER ,util.ToInteger(VN_PORT ,0) ,VS_USER_CODE ,VS_USER_PWD ,false);
	
	//작업 경로 설정
	ftp.setFolderPath(VS_WORK_FOLDER);
	
	//파일 다운로드
	let SAVE_FILE_PATH = "_TEMP_";
	let SAVE_FILE_NAME = util.getUniqueKey("F");
	ftp.Download(VS_FILE_NAME ,fso.PathCombine(SAVE_FILE_PATH ,SAVE_FILE_NAME));
	//client로 출력
	let table = res.getDataSet().CreateTable("DATA");
	table.AddColumn("FOLDER_NAME", false);
	table.AddColumn("FILE_NAME", false);
	let row = table.AppendRow();
	row.setData("FOLDER_NAME" ,SAVE_FILE_PATH);
	row.setData("FILE_NAME" ,SAVE_FILE_NAME);
	
	
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