import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 

let CALL_BACK: Function;
let Matrix: Matrix;

/** 
 * 엑셀 템플릿 모델을 활용하여 파일 생성하기
 *   엑셀 모델로 생성 후 HTML, XLSX, DOCX, HML 등 다양한 형태의 파일로 변환 처리
 * 
*/

const req = Matrix.getRequest();
const res = Matrix.getResponse();
const session = Matrix.getSession();
const util = Matrix.getUtility();
const fso = Matrix.getFileSystemObject();
let con = Matrix.getConnection();


//파일 출력 타입
let ext = req.getParam("VS_EXT_TYPE");

// 템플릿 모델을 엑셀로 만든다.
let wb = util.CreateWorkBookByJson(req.getParam("VS_TEMPLATE"));
//엑셀의 첫번째 시트 가져오기
let ws = wb.getWorkSheet(0);
// 9번 라인 숨기기
ws.setRowHeight(9, 0.0);
// 숨겨진 Row 모두 시트에서 제거 및 수식 업데이트
ws.DeleteHiddenRows();


let folderName = "_TEMP_";
let fileName = util.getUniqueKey("XLS") + "." + ext;


if (ext == "xlsx") {
  //엑셀 저장
  wb.Save(fso.PathCombine(folderName, fileName));
} else if (ext == "htm") {
  // HTML 저장
  wb.getHtmlTableConverter().WriteToFile(folderName, fileName);
} else if (ext == "hml") {
  // 아래 한글 HML 포멧 저장
  wb.SaveAsHML(fso.PathCombine(folderName, fileName), "");
} else if (ext == "docx") {
  // MS-DOC 문서 저장
  wb.SaveAsMSWord(fso.PathCombine(folderName, fileName), "");
}
//저장된 정보 CLient에 전송
res.WriteResponseText(
    JSON.stringify(
       {
        "FOLDER_NAME" : folderName
        ,"FILE_NAME"  : fileName
       }
    )
);
