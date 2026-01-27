 

var VS_LAYOUT_REPORT_CODE = null; //대상 보고서 (사용자 화면 보고서 코드)
var VS_LAYOUT_INFO = null;
var JOB_TYPE = "SELECT"; //SELECT or CREATE
var CONTROL_NAME = null;
var REPORT_NAME = null;
var VS_CONTROL_CODE = null;
/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :  
*****************************************/
 var OnDocumentLoadComplete  = function(sender, args)
 {
 	var params = Matrix.GetDialogRequestParams();
	VS_LAYOUT_REPORT_CODE = params["VS_LAYOUT_REPORT_CODE"];
	VS_LAYOUT_INFO        = params["VS_LAYOUT_INFO"];
	JOB_TYPE        	  = params["JOB_TYPE"];
	CONTROL_NAME       	  = params["CONTROL_NAME"];
	REPORT_NAME        	  = params["REPORT_NAME"];
	VS_CONTROL_CODE 	  = params["VS_CONTROL_CODE"];
	Matrix.AddGlobalParams("VS_LAYOUT_REPORT_CODE" ,VS_LAYOUT_REPORT_CODE, 1 );
	Matrix.AddGlobalParams("VS_LAYOUT_INFO" ,VS_LAYOUT_INFO, 1 );
	Matrix.AddGlobalParams("VS_CONTROL_CODE" ,VS_CONTROL_CODE, 1 );
	if(JOB_TYPE == "SELECT"){
		Matrix.doRefresh("GRD_LAYOUT");
		Matrix.SetSheetActive("FORM_SELECT");
	}else{
		Matrix.SetSheetActive("FORM_INPUT");
		Matrix.getObject("LBL_REPORT_NAME").Text = "대상 보고서 : " + REPORT_NAME;
		Matrix.getObject("LBL_CONTROL_NAME").Text = "대상 컨트롤  : " + CONTROL_NAME;
	}
	 
 };
/*****************************************
* 그리드의 셀을 더블 클릭할 떄 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤 이름 
*		 istudio.control.grid.DataGridRow	Row (Readonly:False) : 데이터 레코드 정보 
*		 istudio.control.grid.DataGridCell	Cell (Readonly:False) : 데이터셀 정보 
*		 istudio.control.grid.column.DataGridColumn	Field (Readonly:False) : 필드 정보 
*****************************************/
 var OnCellDoubleClick  = function(sender, args)
 {
	if(args.Id =="GRD_LAYOUT"){
		 
		if(args.Field.Name == "DEL_BTN"){
			//삭제 기능
			Matrix.AddGlobalParams(":VS_LAYOUT_CODE",args.Row.GetValue("LAYOUT_CODE"), 1 );	
			
			Matrix.Confirm("선택하신 항목을 삭제하시겠습니까?" ,"삭제 확인" ,function(ok){
                                   if(ok){ // click ok or yes
            	                        //삭제 하기
                						DELETE_LAYOUT();                    
                                  }
                                } ,0);
		}else{
			//layout 선택한값 반환 하기
			SELECT_LAYOUT();
		}
	}
 };
 
 
 var DELETE_LAYOUT = function(){
 	Matrix.RunScript("" ,"DELETE_LAYOUT" ,function(p){
                                	if(p.Success == false){
                               		Matrix.Alert(p.Message);
                               		return;
                               	}
                               	Matrix.doRefresh("GRD_LAYOUT");
                               });	
 } 
 
 var SELECT_LAYOUT = function(){
   
 	var  GRD_LAYOUT = Matrix.getObject("GRD_LAYOUT");
 	if(GRD_LAYOUT.GetRowCount() == 0){	 
		return;
	}
	var data    = GRD_LAYOUT.getRowValue("LAYOUT_INFO");
	var ctlCode = GRD_LAYOUT.getRowValue("CONTROL_CODE");
	if(data){
		//저장된 json 데이터를 모델로 던진다.
		Matrix.ReportDialogResult({"CONTROL": ctlCode, "MODEL":JSON.parse(data)}, true);	
	}
 	
 }
 var SAVE_LAYOUT = function(){
 	Matrix.RunScript("" ,"SAVE_LAYOUT" ,function(p){
                                	if(p.Success == false){
                               		Matrix.Alert(p.Message);
                               		return;
                               	}
								Matrix.ReportDialogResult(null, true);
								
                               });
 }
/*****************************************
* 버튼 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Text (Readonly:False) : 라벨 값 
*****************************************/
 var OnButtonClick  = function(sender, args)
 {
 	if(args.Id == "btnLayoutSelectOK"){
		SELECT_LAYOUT();
	}else if(args.Id == "btnLayoutSelectCancel"){	
		Matrix.ReportDialogResult(null, true);
	}else if(args.Id == "btnSave"){
		if(!Matrix.getObject("VS_LAYOUT_NAME").Text){
			Matrix.Information("저장 이름을 입력해 주세요" ,"입력 확인");
			Matrix.getObject("VS_LAYOUT_NAME").Focus();
			return;
		}
		SAVE_LAYOUT();
	}else if(args.Id == "btnCancel"){
		Matrix.ReportDialogResult(null, true);
	}
 };	