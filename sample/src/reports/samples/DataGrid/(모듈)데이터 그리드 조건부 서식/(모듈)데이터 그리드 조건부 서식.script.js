


/* 
 * script name    : DataList Template
 * script version : 1.4
 * modified date  : 2021-02-10 
 */
var TEMPLATE_VERSION = "2.1";
var TEMPLATE_NAME = "LIST"; 


 
var chartToggle = false;	// 차트보임
var chartCellHeight = 250;
var firstLoading = false;


// controls

var Chart = null; 
var DataGrid = null; 
var GRP_CONDITION = null; 
var imgchart = null; 
var imgMeta = null; 
var rdoCSV = null; 
var rdoHTML = null; 
var rdoHWP = null; 
var rdoText = null; 
var rdoWord = null; 
var rdoXlsx = null; 
var TableLayout = null; 
var tbxReportName = null; 

var grpSeperate = null;
var ColumnSeperator = null;
var RowSeperator = null;

var WIN_EXPORT = null; // export window
 // 다국어 리스트
var LANGUAGE_VALIDATE = Matrix.getLanguage("TEMPLATE.VALIDATE_CHECK_NULL", "{0} 은/는 필수 입력입니다.");
var LANGUAGE_EXPORT_REPORT_TITLE = Matrix.getLanguage("TEMPLATE.EXPORT_REPORT_NAME", "■ 보고서 명 :");
var LANGUAGE_EXPORT_USER_NAME = Matrix.getLanguage("TEMPLATE.EXPORT_USER_NAME", "■ 작성자 :");
var LANGUAGE_EXPORT_FILTER_TITLE = Matrix.getLanguage("TEMPLATE.EXPORT_FILTER_NAME", "■ 필터 조건 :");
var LANGUAGE_EXPORT_CREATE_DATE = Matrix.getLanguage("TEMPLATE.EXPORT_CREATE_DATE", "■ 생성 일자 :");
var LANGUAGE_EXPORT_FONT_NAME = Matrix.getLanguage("TEMPLATE.EXPORT_FONT_NAME", "맑은 고딕");
var LANGUAGE_EXPORT_TITLE = Matrix.getLanguage("TEMPLATE.EXPORT_TITLE", "내보내기");

var initControlVariables = function(){
	var allElements = Matrix.getAllObjects();
	allElements.forEach(function(ele, idx){
		switch(ele.Name){
			case "Chart": Chart = ele;break;
			case "DataGrid": DataGrid = ele;break;
			case "GRP_CONDITION": GRP_CONDITION = ele;break;
			case "imgchart": imgchart = ele;break;
			case "imgMeta": imgMeta = ele;break;
			case "rdoCSV": rdoCSV = ele;break;
			case "rdoHTML": rdoHTML = ele;break;
			case "rdoHWP": rdoHWP = ele;break;
			case "rdoText": rdoText = ele;break;
			case "rdoWord": rdoWord = ele;break;
			case "rdoXlsx": rdoXlsx = ele;break;
			case "TableLayout": TableLayout = ele;break;
			case "tbxReportName": tbxReportName = ele;break;
			case "grpSeperate": grpSeperate = ele;break;
			case "ColumnSeperator": ColumnSeperator = ele;break;
			case "RowSeperator": RowSeperator = ele;break;
		}
	}); 
}



 
/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :  
*****************************************/
 var OnDocumentLoadComplete  = function(sender, args)
 {
 	initControlVariables();
	var chartCell = TableLayout.GetCell(0 ,0);
	if(chartCell.Row.Height > 0) {
		chartToggle = true;
	}
	// 구분자 세팅
	ColumnSeperator.Text = parent.iStudioConfig.DataGridTextExportColSeparator;
	RowSeperator.Text = parent.iStudioConfig.DataGridTextExportRowSeparator;
 };

/*****************************************
* 문서가 로드되고 AutoRefresh가 완료되는 시점에 발생합니다.
* * arguments :  
*		 bool	Success (Readonly:False) : 성공여부 
*		 string	Message (Readonly:False) : 에러 메시지 
*****************************************/
 var OnLoadComplete  = function(sender, args)
 { 
 	try{
			
		if(Matrix.getControlDataSource(DataGrid.Name) == null) {
			// Meta를 GRID_NAME 컨트롤에 바인딩
			Matrix.TemplateLoadedSetting(DataGrid.Name);
			makeMetaFilters(true);
			var ds = Matrix.getControlDataSource(DataGrid.Name);
			if(ds != null){
				if(tbxReportName.Text == ""){
					tbxReportName.Text = "  " + ds.name;
				}
			}
		}else {
			Execute(true);
		}
	
	}catch(e){ }		
 };
 
 var OnNewReportWizardChanged = function(sender, args)
 { 
	Matrix.TemplateLoadedSetting(DataGrid.Name);		
	makeMetaFilters(true);
	args.Handled = true; 
 };
 
 var makeMetaFilters = function(isLoading)
 {
 	var option = {
		'UseGroup': false,
		'GRP_CONDITION_NAME': "GRP_CONDITION",
		'Top': 34,		// 조회조건 시작위치 Top
		'Left': 2,		// 조회조건 시작위치 Left
		'Height': 23,	// 조회조건 컨트롤의 높이
		'LabelStyle' : {
			'BackgroundColor' : '212,232,242,1',	// RGBA
			'BorderColor' : '191,191,191,1'			// RGBA
		}
	}; 
	Matrix.MakeMetaFilterControls(option);
	
	Matrix.Update();
	Execute(isLoading);
 }

 var Execute = function(isLoading)
 {
 	firstLoading = isLoading;
	Matrix.doRefresh(DataGrid.Name);
 }


/*****************************************
* Refresh가 실행되는 시점에 발생합니다.
* * arguments :  
*		 bool	IsAutoRefresh (Readonly:False) : true일 경우 AutoRefresh 동작 입니다. 
*		 string	Target (Readonly:False) : 현대 Refresh 대상(들)의 이름 
*		 bool	Cancel (Readonly:False) : 이 값을 true로 설정 시 실행이 취소됩니다. 
*****************************************/
 var OnExecuteStart  = function(sender, args)
 {
    if(args.IsAutoRefresh) return;	
	try{
		var result = Matrix.ValidateMetaFilterValues(DataGrid.Name);
		if(result != "") {
			args.Cancel = true;
			if(!firstLoading)
				Matrix.Information(LANGUAGE_VALIDATE.replace("{0}", result) ,result);
		}
		firstLoading = false;
	}catch(e){  }
 };
 
 /*****************************************
* 컨트롤의 메타 소스가 변경되면 발생합니다.
* * arguments :  
*		 bool	Handled (Readonly:False) : 스크립트 수동 핸들링 여부 
*****************************************/
 var OnMetaLayoutChange  = function(sender, args)
 {
    args.Handled = true;
	Execute(false); 
 };
 

 /*****************************************
* 이미지 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Text (Readonly:False) : 라벨 값 
*****************************************/
 var OnImageClick  = function(sender, args)
 {
 	if(args.Id == "imgMeta") {
		var meta = Matrix.getMetaController(DataGrid.Name);
		meta.ShowModal();
	}else if(args.Id == "imgchart") {
		var chartCell = TableLayout.GetCell(0 ,0);
		if(chartToggle) {
			chartCellHeight = chartCell.Row.Height;
			chartCell.Row.Height = 0;
			chartToggle = false;
		}else {
			chartCell.Row.Height = chartCellHeight;
			chartToggle = true;
		}
		TableLayout.Update();
	}
 };
 
 
/*****************************************
* i-PORTAL에서 엑셀 다운로드 버튼 클릭 시 작동.(정의되어있지 않으면 기본 엑셀 다운로드 팝업창이 출력)
* * arguments :  
*****************************************/
 var OnExcelExportStart  = function(sender, args)
 {      
	if(WIN_EXPORT != null)
		WIN_EXPORT.Close(); 
	
 	WIN_EXPORT  = Matrix.ShowWindow("EXPORT" ,0 ,0 ,400 ,340 ,true ,false, LANGUAGE_EXPORT_TITLE ,false ,"#ffffff" ,2);
	WIN_EXPORT.OnDialogResult = function(type) {
		if(type == 'OK') {
			if(rdoXlsx.Checked) exportFile("xlsx"); 
			else if(rdoHTML.Checked) exportFile("htm");
			else if(rdoWord.Checked) exportFile("docx");
			else if(rdoHWP.Checked) exportFile("hwp");
			else if(rdoCSV.Checked) Matrix.ExportServiceCall("DataGrid" ,0);//csv 
			//else if(rdoText.Checked) Matrix.ExportServiceCall("DataGrid" ,1);//text
			else if(rdoText.Checked) {
				// 구분자 세팅
				parent.iStudioConfig.DataGridTextExportColSeparator = ColumnSeperator.Text;
				parent.iStudioConfig.DataGridTextExportRowSeparator = RowSeperator.Text;
				Matrix.ExportServiceCall("DataGrid" ,1);//text
			}
			WIN_EXPORT.Close();
			WIN_EXPORT = null;
		}
	} 
	WIN_EXPORT.OnClosed = function(s, e){
		WIN_EXPORT = null;
	};
	WIN_EXPORT.MoveToCenter();  
 
 }
 var exportFile = function(type)
 {		 
	var nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
    //그리드 컬럼 갯수 
	var columnCount = DataGrid.GetColumnCount(); 
	var colspan = columnCount; 
	if(type == "xlsx") colspan =  Math.min(columnCount, 13);
	
	var WORKBOOK = {
		"FontName":LANGUAGE_EXPORT_FONT_NAME
		, "FontSize" : 11
		, "WorkSheets": [
			{
				"Name":"Sheet1"
				, "DisplayGridlines":"false"
				, "Controls": []
				, "Ranges": [
					 {"Range":"A1","ColSpan" : colspan,"Value": LANGUAGE_EXPORT_REPORT_TITLE + " " +Matrix.GetReportInfo().NAME}
					,{"Range":"A2","ColSpan" : colspan,"Value": LANGUAGE_EXPORT_USER_NAME + " " +Matrix.GetUserInfo().UserName}
					,{"Range":"A3","ColSpan" : colspan,"Value": LANGUAGE_EXPORT_CREATE_DATE + " " + nowText}
					,{"Range":"A4","ColSpan" : colspan,"Value": LANGUAGE_EXPORT_FILTER_TITLE}
				]
			}
		]
	}; 
	// excel column name
	var getColumnName = function(num) {
	  for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
		ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
	  }
	  return ret;
	}
	var filterRows = getFilterCondition();
	for(var r=0; r<filterRows.length; r++){	 
		var filterValue = filterRows[r].Values.join(",");
//		if(filterValue.length > 256){ //최대 256까지
//			filterValue = filterValue.substring(0,256) + "...";
//		}
		WORKBOOK.WorkSheets[0].Ranges.push({"Range":"A"  + (5+r),"ColSpan" : colspan, "Value":  "        [" + filterRows[r].Name + "] "+ filterRows[r].Operator +"  : " +  filterValue });
	}
	var startRow = filterRows.length + 5;
	 
	//chart show/hide
	if(chartToggle){
		try{	
			// 차트에 데이터가 바인딩 되었는지 여부를 판단 합니다.
			chartToggle = Chart.GetDataSet().GetTableCount() > 0;
		}catch(e){chartToggle = false;}
	}
	if(chartToggle){
		WORKBOOK.WorkSheets[0].Controls.push({ "Name": Chart.Name, "Range": "A" + startRow + ":" + getColumnName(colspan) + (startRow + 10), "ImageExport": true});
		WORKBOOK.WorkSheets[0].Ranges.push( {"Range":"A" + startRow ,"ColSpan" : colspan,"RowSpan" : 11}); 
		WORKBOOK.WorkSheets[0].Controls.push({ "Name": DataGrid.Name, "Range": "A" + (startRow + 12)});		
	}else{
		WORKBOOK.WorkSheets[0].Controls.push({ "Name": DataGrid.Name, "Range": "A" + (startRow)});
	}
	
	 
	if("xlsx" == type){
	 	Matrix.ExcelExportServiceCall(WORKBOOK ,null ,function(e){ 	  
		   	if(e.Success == false){
           		alert("export fail" + e.Message);
           		return;
           	}
           	// download file
           	var row = e.DataSet.GetTable(0).GetRow(0);
           	var folderName = row.GetValue("FolderName");
           	var fileName = row.GetValue("FileName");
           	// download.maf 주소
			Matrix.DownloadFile(folderName + "/"
								, fileName
								, Matrix.GetReportInfo().NAME + "_" + nowText + ".xlsx", true, null);
           });
		   
	}else if("docx" == type){	//word
	 	Matrix.WordExportServiceCall(WORKBOOK ,null ,function(e){ 	  
		   	if(e.Success == false){
           		alert("export fail" + e.Message);
           		return;
           	}
           	// download file
           	var row = e.DataSet.GetTable(0).GetRow(0);
           	var folderName = row.GetValue("FolderName");
           	var fileName = row.GetValue("FileName"); 
			Matrix.DownloadFile(folderName + "/"
								, fileName
								, Matrix.GetReportInfo().NAME + "_" + nowText + ".docx", true, null);
           });
	
	}else if(type == "htm"){
		/* HTML Export */
		Matrix.HTMLExportServiceCall(WORKBOOK ,null 
				,function(e){
					if(e.Success == false){
						alert("export fail" + e.Message);
						return;
					} 		
					// download file
					var row = e.DataSet.GetTable(0).GetRow(0);
					var folderName = row.GetValue("FolderName");
					var fileName = row.GetValue("FileName");
					Matrix.DownloadFile(folderName + "/", fileName, Matrix.GetReportInfo().NAME + "_" + nowText + ".htm", true, null);
			});		   
	}else if(type == "hwp"){
		/* HWP Export */ 
		Matrix.HMLExportServiceCall(WORKBOOK ,null 
				,function(e){
					if(e.Success == false){
						alert("export fail" + e.Message);
						return;
					} 		
					// download file
					var row = e.DataSet.GetTable(0).GetRow(0);
					var folderName = row.GetValue("FolderName");
					var fileName = row.GetValue("FileName");
					Matrix.DownloadFile(folderName + "/", fileName, Matrix.GetReportInfo().NAME + "_" + nowText + ".hwp", true, null);
			});		   
	}
 };
 
 
 var getFilterCondition = function() {
 
 	var conditions = Matrix.GetMetaTemplateConditions();
	var rows = [];
	for(var i in conditions) {
		var row = {"Name":"","Operator":"", "Values":[]};
		var condition = conditions[i];
		// Label 분리
		var labelCtl = Matrix.getObject(condition.Label); 
		row["Name"] = labelCtl.Text;
		row["Operator"] = labelCtl.Description;
		
		// Control 분리
		var controls = condition.Controls;
		var controlLength = controls.length;
		
		if(controlLength == 1) {
			var value1 = Matrix.GetParamValue(Matrix.getObject(controls[0]));	// array		 
			for(var idx in value1) {				
				row.Values.push(value1[idx]);				
			}  
		}else {
			var ctrl1 = Matrix.getObject(controls[0]);
			var ctrl2 = Matrix.getObject(controls[1]);
			var value1;
			var value2;
			if(ctrl1.__type__ == 'istudio.control.CalendarFromTo'
				|| ctrl1.__type__ == 'istudio.control.CalendarYMFromTo'
				|| ctrl1.__type__ == 'istudio.control.CalendarWeeklyFromTo') {
				value1 = ctrl1.GetValue();
				value2 = ctrl2.GetValue2();
			}else {
				value1 = Matrix.GetParamValue(ctrl1);	// array
				value2 = Matrix.GetParamValue(ctrl2);	// array
			}			
			row.Values.push(value1 + " ~ " + value2);
		}
		rows.push(row);
	}
	return rows;
 }
 
/*****************************************
* 라디오 컨트롤의 값이 변경될 경우 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	GroupName (Readonly:False) : 그룹명 
*		 string	Text (Readonly:False) : 라벨 값 
*		 bool	IsChecked (Readonly:False) : 체크 상태 
*****************************************/
 var OnRadioValueChange  = function(sender, args)
 {
	var selectedID = args.Id
	switch(args.Id) {
		case 'rdoText':
			grpSeperate.Visible = true;
		break;
		default:
			grpSeperate.Visible = false;
	}
 }; 
 