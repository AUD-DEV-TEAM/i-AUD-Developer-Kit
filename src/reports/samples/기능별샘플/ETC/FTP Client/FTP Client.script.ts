import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { iGrid } from "@AUD_CLIENT/control/iGrid";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Image } from "@AUD_CLIENT/control/Image";
import { ColorPicker } from "@AUD_CLIENT/control/ColorPicker";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
 
let Matrix : Matrix; 
/*****************************
 * 서버 스크립트로 FTP Client 개발하기
 * 
 *****************************/

let DataGrid : DataGrid =   Matrix.getObject("DataGrid") as DataGrid;
let VS_FTP_SERVER : TextBox =   Matrix.getObject("VS_FTP_SERVER") as TextBox;
let VS_USER_CODE : TextBox =   Matrix.getObject("VS_USER_CODE") as TextBox;
let VS_USER_PWD : TextBox =   Matrix.getObject("VS_USER_PWD") as TextBox;
let VS_WORK_FOLDER : TextBox =   Matrix.getObject("VS_WORK_FOLDER") as TextBox;
let VS_PROTOCOL : ComboBox =   Matrix.getObject("VS_PROTOCOL") as ComboBox;
let VN_PORT : TextBox =   Matrix.getObject("VN_PORT") as TextBox;
let btnUpload : Button =   Matrix.getObject("btnUpload") as Button;
let btnConnect : Button =   Matrix.getObject("btnConnect") as Button;
/**
 * 텍스트 박스 Enter 입력 시 데이터 조회 호출
 * @param s 
 * @param e 
 */
VS_WORK_FOLDER.OnTextKeypress = function(s, e){
	if(e.Event.isEnter()){
		readFolders();
	}
};

/**
 * 버튼 클릭으로 데이터 조회 호출
 * @param sender 
 * @param args 
 */
btnConnect.OnClick = function(sender, args){
	readFolders();
}


/**
 * 버튼 클릭으로 파일 업로드 하기
 * @param sender 
 * @param args 
 */
btnUpload.OnClick = function(sender, args){
	UploadFile();
} 
/**
 * FTP에서 파일 목록을 반환하는 서버 스크립트를 호출한다.
 */ 
const readFolders = function(){
	Matrix.RunScript("" ,"FTP_LIST" ,function(p){
								if(p.Success == false){
								Matrix.Alert(p.Message);
								return;
							}
							let  ds = p.DataSet; 
							//그리드에 파일 및 폴더 목록 출력
							DataGrid.SetDataSet(ds);
						});

 
 }
 /**
  * FTP 에 파일을 업로드하기위해 
  * 사용자에게 파일 업로드 대화 상자를 표시한다.
  * 
  */
 const UploadFile = function(){
		
		Matrix.UploadLocalFile("_TEMP_" ,"" ,function(p){
                                   	if(p.Success == false){
                                  		Matrix.Alert(p.Message);
                                  		return;
                                  	}
									Matrix.AddGlobalParams("VS_UP_FolderName" ,p.FolderName, 1);
									Matrix.AddGlobalParams("VS_UP_SaveFileName" ,p.SaveFileName, 1);
									Matrix.AddGlobalParams("VS_UP_FileName" ,p.FileName, 1); 
									uploadExecute();
                                  });
		 
 
 
 }
 /**
  * 서버에 업로드된 파일을 FTP서버로 업로드 하기위해 서버 스크립트를 호출한다.
  */
 const uploadExecute = function(){
 
		Matrix.RunScript("" ,"UPLOAD" ,function(p){
                                	if(p.Success == false){
                               		Matrix.Alert(p.Message);
                               		return;
                               	}
                               	var  ds = p.DataSet; 
								DataGrid.SetDataSet(ds);
                               });
 }
 
 /**
  * 데이터 그리드 셀 더블 클릭 이벤트 핸들러
  * 
  */
 DataGrid.OnCellDoubleClick  = function(sender, args)
 {
 	var type  = args.Row.GetValue("TYPE") as string;
	var name  = args.Row.GetValue("NAME") as string;
	if(type == "DIRECTORY"){
		
		var paths = VS_WORK_FOLDER.Text.split("/");
		if(".." == name){
			
			paths = paths.slice(0,paths.length-1);
			
			VS_WORK_FOLDER.Text = paths.join("/");
			readFolders();
			
		}else if("." == name){
		
		}else{
			paths.push(name);
			VS_WORK_FOLDER.Text = paths.join("/");
			readFolders();
		}
	}else if(type == "FILE"){
		
		Matrix.AddGlobalParams("VS_FILE_NAME" ,name, 1);
		Matrix.RunScript("" ,"DOWNLOAD" ,function(p){
                                	if(p.Success == false){
                               		Matrix.Alert(p.Message);
                               		return;
                               	}
                               	var  ds = p.DataSet; 
								var row = ds.GetTable(0).GetRow(0);
								Matrix.DownloadFile(row.GetValue("FOLDER_NAME")  as any as string 
									,row.GetValue("FILE_NAME") as any as string
									,name
									, true);
                               });
	}
 }; 