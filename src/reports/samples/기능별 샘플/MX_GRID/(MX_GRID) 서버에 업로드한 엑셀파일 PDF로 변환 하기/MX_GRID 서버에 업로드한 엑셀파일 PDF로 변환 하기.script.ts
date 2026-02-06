import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
 
let Matrix : Matrix; 

 
let btnUpload : Button =   Matrix.getObject("btnUpload") as Button;
/**
 * 사용자 엑셀을 업로드 처리
 */
const UploadUserExcel = function () {
    Matrix.UploadLocalFile("_TEMP_", "*.xlsx", function (p) {
        if (p.Success == false) {
            Matrix.Alert(p.Message);
            return;
        }
        //파일 이름을 파라미터로 등록한다.
        Matrix.AddGlobalParams("VS_USER_UPLOAD_FILE_NAME", p.SaveFileName, 1);
        //서버 스크립트 호출하기
        Matrix.RunScript("", "IMPORT_USER_EXCEL", function (p) {
            if (p.Success == false) {
                Matrix.Alert(p.Message);
                return;
            }
            var ds = p.DataSet;
            let pdfName = ds["FILE_PATH"] as string;
            Matrix.DownloadFile("_TEMP_", pdfName, pdfName, true);
        });
        Matrix.RemoveGlobalParams("VS_USER_UPLOAD_FILE_NAME");
    });
}; 

//버튼 클릭으로 엑셀 파일 업로드 처리
btnUpload.OnClick =function(sender, args){
    UploadUserExcel();
}