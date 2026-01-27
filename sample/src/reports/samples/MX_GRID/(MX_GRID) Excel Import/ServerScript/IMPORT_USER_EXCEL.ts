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
import { ScriptSelection } from "@AUD_CLIENT/control/olap/ScriptSelection"; 
import { ScriptSession } from "@AUD_SERVER/matrix/script/ScriptSession"; 
import { ScriptQueryGenerator } from "@AUD_SERVER/matrix/script/ScriptQueryGenerator"; 
 /* Please do not modify or delete the following let iables: "CALL_BACK", "Matrix". */
let CALL_BACK : Function;
let Matrix : Matrix; 

/**************************************
 * 업로드된 엑셀 파일을 화면에 출력합니다.
************************************ **/
let  req = Matrix.getRequest(); /* request */
let  res = Matrix.getResponse(); /* response */
let  session = Matrix.getSession(); /* session */
let  util = Matrix.getUtility(); /* utility */
let  fso = Matrix.getFileSystemObject();
/**
 * MX-GRID는 reports/iGRID_DESIGN/{REPORT_CODE}/{MX_GRID CODE}.json2 의 경로에 저장한다.
 * 해당 폴더는 임시로 사용되므로 정기적인 자동 삭제가 필요하다.
 */
let  MXGRID_TEMP_FOLDER = fso.PathCombine(["iGRID_DESIGN", "TEMP_DESIGN"]);
fso.CreateFolder(MXGRID_TEMP_FOLDER);
fso.RemoveOldFiles(MXGRID_TEMP_FOLDER, 120); //2시간 이상된 파일 자동 삭제 하도록...

//사용자 업로드 파일의 이름 (샘플에서는  _TEMP_ 하위에 저장 한다)
let  VS_USER_UPLOAD_FILE_NAME = req.getParam("VS_USER_UPLOAD_FILE_NAME");
let  xlsFilePath = fso.getTemplatePath(VS_USER_UPLOAD_FILE_NAME);
if (!fso.Exists(xlsFilePath)) {
    Matrix.ThrowException("File not found !! \n" + VS_USER_UPLOAD_FILE_NAME);
}

//엑셀 파일을 MX-GRID용으로 파싱한다. (모든 시트)
let  jsonPath = Matrix.ParseExcel(xlsFilePath, true);

//파싱된 파일을 임시경로로 복사한다.
let  MX_GRID_CODE = util.getUniqueKey("T");
let  target = fso.PathCombine([MXGRID_TEMP_FOLDER, MX_GRID_CODE]) + ".json2";
fso.CopyFileEx(jsonPath, target);

//client에 해당 파일의 경로 정보를 전달합니다.
res.WriteResponseText(JSON.stringify({
    "XLS_PATH": "@TEMP_DESIGN@" + MX_GRID_CODE
}));
