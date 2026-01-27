var btnCalculate = null; 
var btnUpate = null; 
var chkEnableCreateRecord = null; 
var chkManualUpdate = null; 
var DataGrid = null; 
var DataGrid = null; 
var MXGrid = null; 
var OlapGrid = null; 
var VN_BAEBUN_TYPE = null; 
var tbxLockCellFormula = null;

var initControlVariables = function(){
	btnCalculate = Matrix.getObject("btnCalculate"); 
	btnUpate = Matrix.getObject("btnUpate"); 
	chkEnableCreateRecord = Matrix.getObject("chkEnableCreateRecord"); 
	chkManualUpdate = Matrix.getObject("chkManualUpdate"); 
	DataGrid = Matrix.getObject("DataGrid"); 
	DataGrid = Matrix.getObject("DataGrid"); 
	MXGrid = Matrix.getObject("MXGrid"); 
	OlapGrid = Matrix.getObject("OlapGrid"); 
	VN_BAEBUN_TYPE = Matrix.getObject("VN_BAEBUN_TYPE"); 
	tbxLockCellFormula = Matrix.getObject("tbxLockCellFormula"); 
	
	tbxLockCellFormula.OnTextChange = function(s, e){
		OlapGrid.setLockCellFormula(tbxLockCellFormula.Text);
	};
}; 



/**
 * Write-Back 기능 활성화 하기
**/
var initWriteBack = function(){

	OlapGrid.Options.EnableWriteBack = true; //Write-back 활성화
	OlapGrid.Options.EnableCreateRecord = false; //레코드가 없는 셀의 경우 데이터 생성 여부
	OlapGrid.Options.ManualUpdate = false; //수동 계산 실행 여

	OlapGrid.setLockCellFormula(tbxLockCellFormula.Text);
}

/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :  
*****************************************/
 var OnDocumentLoadComplete  = function(sender, args)
 {
	initControlVariables();
	initWriteBack(); 
 };
 




/*****************************************
* 버튼 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Text (Readonly:False) : 라벨 값 
*****************************************/
 var OnButtonClick  = function(sender, args)
 { 
 	if(args.Id == "btnCalculate"){
				
		if(OlapGrid.CanCalculateWriteBack()){ //계산할 대상이 있으면..
			OlapGrid.CalculateWriteBack();
		}
		
	}else if(args.Id == "btnUpate"){
		if(OlapGrid.IsModified() == false){ //계산할 대상이 있으면..
			Matrix.Information("계산하지 않은 셀이 존재합니다. 계산을 먼저 수행해 주세요." ,"i-AUD");
			return;
		}
		if(OlapGrid.CanCalculateWriteBack()){ //계산할 대상이 있으면..
			Matrix.Information("계산하지 않은 셀이 존재합니다. 계산을 먼저 수행해 주세요." ,"i-AUD");
			return;
		}
		Matrix.RunScript("OlapGrid" ,"Service1" ,function(p){
										if(p.Success == false){
										Matrix.Alert(p.Message);
										return;
									}
									//alert("정상적으로 처리되었습니다.");
									Matrix.doRefresh("OlapGrid");
								});
	}
 };
/*****************************************
* 콤보박스 컨트롤의 값이 변경될때 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Value (Readonly:False) : 컨트롤 값 
*****************************************/
 var OnComboBoxValueChanged  = function(sender, args)
 {
 
	var fld = OlapGrid.getField("M1")
	fld.EditMethod = parseFloat(VN_BAEBUN_TYPE.Value);
	fld.EditPrecision = 0; //소수점 자리수
	//fld.EditMethodRef = "M2";//참조 필드(가중치 기준 필드)
	
	fld = OlapGrid.getField("M2")
	fld.EditMethod = parseFloat(VN_BAEBUN_TYPE.Value);
	fld.EditPrecision = 0; //소수점 자리수
	
	fld = OlapGrid.getField("M3")
	fld.EditMethod = parseFloat(VN_BAEBUN_TYPE.Value);
	fld.EditPrecision = 0; //소수점 자리수
	
 };
/*****************************************
* 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 bool	IsChecked (Readonly:False) : 체크 상태 
*****************************************/
 var OnCheckValueChange  = function(sender, args)
 {	
 	if(args.Id == "chkManualUpdate"){
 		OlapGrid.Options.ManualUpdate = args.IsChecked;
	}else if(args.Id == "chkEnableCreateRecord"){
		OlapGrid.Options.EnableCreateRecord = args.IsChecked;
	}
 
 };
   
/*****************************************
* 데이터 셀 수정 모드로 진입할 때 발생합니다.
* * arguments :  
*		 string	Id (Readonly:True) : 컨트롤 명 
*		 iOLAP.ScriptDataCell	Cell (Readonly:True) : 데이터 셀 객체 
*		 bool	Cancel (Readonly:False) : 이 값을 true 로 설정 할 경우 수정 모드로 진입이 취소됩니다. 
*****************************************/
 var OnOlapDataCellStartEdit  = function(sender, args)
 {
 
 }; 
 
/*****************************************
* 데이터 셀을 수정 후에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:True) : 컨트롤 명 
*		 iOLAP.ScriptDataCell	Cell (Readonly:True) : 데이터 셀 객체 
*		 double	BeforeValue (Readonly:True) : 수정 전 값 
*		 double	AfterValue (Readonly:True) : 수정 후 값 
*		 double	LockedValue (Readonly:True) : 잠긴 레코드의 값 
*		 bool	Cancel (Readonly:False) : 이 값을 true 로 설정 할 경우 수정 작업이 취소됩니다. 
*****************************************/
 var OnOlapDataCellEndEdit  = function(sender, args)
 {
 	if(args.LockedValue > args.AfterValue){
		args.Cancel = true;
        var fmtValue =  Matrix.getFormatConverter(args.Cell.Field.Format).Convert(args.LockedValue).Value;	
		
		Matrix.Information("잠금으로 설정한 값(" + fmtValue + ")보다 큰 값을 입력해 주세요.","i-AUD");
	}
 };