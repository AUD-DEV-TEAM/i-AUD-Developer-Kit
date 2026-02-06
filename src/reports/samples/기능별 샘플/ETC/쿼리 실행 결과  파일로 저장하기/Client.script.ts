import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
 
let Matrix : Matrix; 
/*****************************
 * 서버 스크립트 호출 하기
 *****************************/ 
let btnExport : Button =   Matrix.getObject("btnExport") as Button; 
btnExport.OnClick = function(sender,args){
	//서버 스크립트를 호출 합니다.
	Matrix.RunScript("" ,"CreateTableTextWriter" ,function(p){
                                	if(p.Success == false){
                               		Matrix.Alert(p.Message);
                               		return;
                               	}  
								let result =  p.DataSet as any;
								
								let folderName = "_TEMP_" as string;
								let fileName = result["FILE_NAME"]  as string;
								let saveName = Matrix.getDateTime().ToString("yyyy-MM-dd_HHmmss");
								//파일 다운로드 후 삭제 
								Matrix.DownloadFile(folderName ,fileName , saveName +".csv", true);
                               });
 
 }; 