import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 
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

//사용자 업로드 파일의 이름 (샘플에서는  _TEMP_ 하위에 저장 한다)
let  VS_USER_UPLOAD_FILE_NAME = req.getParam("VS_USER_UPLOAD_FILE_NAME");
let  xlsFilePath = fso.getTemplatePath(VS_USER_UPLOAD_FILE_NAME);
if (!fso.Exists(xlsFilePath)) {
    Matrix.ThrowException("File not found !! \n" + VS_USER_UPLOAD_FILE_NAME);
}
let pdfName : string = util.getUniqueKey("PDF") + ".pdf";
let pdfPath : string = fso.getTemplatePath(pdfName);
Matrix.ExcelToPDF(xlsFilePath, pdfPath);

//client에 해당 파일의 경로 정보를 전달합니다.
res.WriteResponseText(JSON.stringify({
    "FILE_PATH": pdfName
}));
