 
 
/* 
 * script name    : ANALYSIS Template
 * script version : 7.4
 * modified date  : 2023-07-14 
 */
var TEMPLATE_VERSION = "7.0";
var TEMPLATE_NAME = "OLAP";


var WIN_EXPORT = null; // export window
var GRP_CONDITION_NAME = "GRP_CONDITION";

var AUTO_SELECT_RANGE = 10;

var chartToggle = false;	// 차트보임
var chartCellHeight = 250;
var gapChartGrid = 2;
var firstLoading = false;

var USERDEFINED_LAYOUT_MGR = null;//@USERDEFINED_LAYOUT_MGR

// controls
var Chart = null; 
var DrillToDetail = null; 
var GRP_CONDITION = null; 
var imglayout = null;
var imgchart = null; 
var imgMeta = null; 
var imgOption = null;
var OlapGrid = null; 
var tbxReportName = null; 
var GRP_CHART = null;
var LBL_SPLITTER = null;
 
var rdoCSV = null; 
var rdoHTML = null; 
var rdoText = null; 
var rdoWord = null;  
var rdoXlsx = null; 
var rdoHWP = null; 

var grpSeperate = null;
var ColumnSeperator = null;
var RowSeperator = null;

var WIN_OPTION = null;
var chkUseUserDefinedLayout = null;
var isViewerMode = (Matrix.getViewer().Mode === 2);
var activeControlName = "OlapGrid";

// 2022-09-14 (BCRM#C2708) 툴바('GDP&GNI')에서 제공되는 옵션 기능('그래프 표시', '설정')에 대한 툴팁이 제공되지 않아 해당 기능을 알 수 없음
var langNS = 'iStudioExtra:META:';

 // 다국어 리스트
var LANGUAGE_VALIDATE = Matrix.Trans(langNS + "TEMPLATE.VALIDATE_CHECK_NULL", "{0} 은/는 필수 입력입니다.");
var LANGUAGE_DETAIL_TITLE = Matrix.Trans(langNS + "TEMPLATE.DETAIL_TITLE", "상세 보기");
var LANGUAGE_EXPORT_REPORT_TITLE = Matrix.Trans(langNS + "TEMPLATE.EXPORT_REPORT_NAME", "■ 보고서 명 :");
var LANGUAGE_EXPORT_USER_NAME = Matrix.Trans(langNS + "TEMPLATE.EXPORT_USER_NAME", "■ 작성자 :");
var LANGUAGE_EXPORT_FILTER_TITLE = Matrix.Trans(langNS + "TEMPLATE.EXPORT_FILTER_NAME", "■ 필터 조건 :");
var LANGUAGE_EXPORT_CREATE_DATE = Matrix.Trans(langNS + "TEMPLATE.EXPORT_CREATE_DATE", "■ 생성 일자 :");
var LANGUAGE_EXPORT_FONT_NAME = Matrix.Trans(langNS + "TEMPLATE.EXPORT_FONT_NAME", "맑은 고딕");
var LANGUAGE_EXPORT_TITLE = Matrix.Trans(langNS + "TEMPLATE.EXPORT_TITLE", "내보내기");
var LANGUAGE_OPTION_TITLE = Matrix.Trans(langNS + "TEMPLATE.OPTION", "설정");

 
var initControlVariables = function(){
	var allElements = Matrix.getAllObjects();
	allElements.forEach(function(ele, idx){
	
		//(BCRM#C3563) 일본어폰트/번역 적용 안됨
		if(typeof ele.LanguageCode !== "undefined" && ele.LanguageCode !== "" && typeof ele.Text !== "undefined") {
			var transText = Matrix.Trans(langNS + ele.LanguageCode, "");
			ele.Text = ( transText !== "" ) ? transText : ele.Text;
		}
		
		switch(ele.Name){
			case "Chart": Chart = ele;break;
			case "DrillToDetail": DrillToDetail = ele;break;
			case "GRP_CONDITION": GRP_CONDITION = ele;break;
			case "imgchart": imgchart = ele;break;
			case "imgMeta": imgMeta = ele;break;
			case "OlapGrid": OlapGrid = ele;break;
			case "tbxReportName": tbxReportName = ele;break;
			case "rdoCSV": rdoCSV = ele;break;
			case "rdoHTML": rdoHTML = ele;break;
			case "rdoText": rdoText = ele;break;
			case "rdoWord": rdoWord = ele;break; 
			case "rdoXlsx": rdoXlsx = ele;break; 
			case "rdoHWP": rdoHWP = ele;break; 
			case "grpSeperate": grpSeperate = ele;break;
			case "ColumnSeperator": ColumnSeperator = ele;break;
			case "RowSeperator": RowSeperator = ele;break;
			case "GRP_CHART": GRP_CHART = ele;break;
			case "LBL_SPLITTER": LBL_SPLITTER = ele;break;
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
	if(GRP_CHART.Height > 2) {
		chartToggle = true;
	}
	// 2022-04-28 디자인 변경
	tbxReportName.Style.Font.Size = "14";  // 원활한 박스 스타일 사용을 위해 폰트 사이즈만 따로 변경
	
	imgchart.Tooltip = Matrix.Trans(langNS + "TEMPLATE.CHART", "Show/Hide Chart");
	imgMeta.Tooltip = Matrix.Trans(langNS + "TEMPLATE.META", "Analysis Items Setting");
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
		SetSplitters();
		if(Matrix.getControlDataSource(OlapGrid.Name) == null) {
			// Meta를 컨트롤에 바인딩
			Matrix.TemplateLoadedSetting(OlapGrid.Name);
			makeMetaFilters(true);
			
			var ds = Matrix.getControlDataSource(OlapGrid.Name);
			if(ds != null){
				if(tbxReportName.Text == ""){
					tbxReportName.Text = "  " + ds.name;
				}
			}
		}else {
			modifyGridTopAndHeight();
			if(isViewerMode){
				USERDEFINED_LAYOUT_MGR.CheckDefaultLayout(function(){
					Execute(true);
				});
			} else {
				Execute(true);
			}
		}
	 
	}catch(e){
		Matrix.DebugWrite("Err OnLoadComplete", e.message); 
	}		
 };
 
 var SetSplitters = function() {
 	Matrix.CreateSplitterEx("Col",["MetaTreeView"],["GRP_CHART", "LBL_SPLITTER", "OlapGrid"],"GRP_SPLITTER");
 	Matrix.CreateSplitterEx("Row",["GRP_CHART"],["OlapGrid"],"LBL_SPLITTER");
 }
 
 var OnNewReportWizardChanged = function(sender, args)
 { 
	Matrix.TemplateLoadedSetting(OlapGrid.Name);		
	makeMetaFilters(true);
	args.Handled = true; 
 };
 
 var makeMetaFilters = function(isLoading)
 {
 	var option = {
 		'UseGroup' : false,		// 그룹 사용 여부
 		'GRP_CONDITION_NAME' : GRP_CONDITION_NAME,	// 사용할 그룹 이름
		'Top': 34,		// 조회조건 시작위치 Top
		'Left': 2,		// 조회조건 시작위치 Left
		'Height': 23,	// 조회조건 컨트롤의 높이
		'LabelStyle' : "META_TEMPLATE_LABEL_CONTROL" // boxStyle 이름
	}; 
	Matrix.MakeMetaFilterControls(option);
	
	changeLayout();
	Execute(isLoading);
 }

 var Execute = function(isLoading)
 {
 	firstLoading = isLoading;
	Matrix.doRefresh(OlapGrid.Name);
 }
 
 var changeLayout = function() {
	var layoutTop = Matrix.GetMetaTemplateLayoutTopValue();
	
	if( typeof layoutTop === 'undefined' || layoutTop === null ) {
		layoutTop = tbxReportName.Top + tbxReportName.Height + 1;
	}
	
 	OlapGrid.Top = layoutTop + ((GRP_CHART.Height > 2) ? (GRP_CHART.Height + gapChartGrid + LBL_SPLITTER.Height + gapChartGrid) : 0);
	GRP_CHART.Top = layoutTop + 1;
	LBL_SPLITTER.Top = chartToggle ? OlapGrid.Top - (LBL_SPLITTER.Height + gapChartGrid) : OlapGrid.Top;
	setSelectRange();
	GRP_CHART.Update();
	Matrix.Update();
 }
 
 var modifyGridTopAndHeight = function() {
 	if(GRP_CHART.Height <= 2) {
 		OlapGrid.Top -= (LBL_SPLITTER.Height + 2);
	}
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
		var result = Matrix.ValidateMetaFilterValues(OlapGrid.Name);
		if(result != "") {
			args.Cancel = true; 
			if(!firstLoading) 
				Matrix.Information(LANGUAGE_VALIDATE.replace("{0}", result) ,result);
		}
		firstLoading = false;
	}catch(e){
		Matrix.DebugWrite("Err OnExecuteStart", e.message); 
	}
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
* 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 int	RecordCount (Readonly:False) : 데이터셋의 레코드 수량 
*****************************************/
var OnDataBindEnd  = function(sender, args)
{
	if (args.Id == OlapGrid.Name) {
		if (chartToggle) {
			setSelectRange();
		}
	}
}; 
 
// Chart 영역 toggle 시 선택 영역 표시
var setSelectRange = function() {
	// OlapGrid 일 때
	if(chartToggle && !OlapGrid.Options.AutoSelection) {
		var curSelection = OlapGrid.getSelection().getSelectedArea();
		if (curSelection.getRight() != AUTO_SELECT_RANGE || curSelection.getBottom() != AUTO_SELECT_RANGE) {		
			OlapGrid.getSelection().SelectDataArea(0, 0, AUTO_SELECT_RANGE, AUTO_SELECT_RANGE);
			OlapGrid.Update();
		}
	}
};
 
 /*****************************************
* 파일 내보내기 동작이 시작될 때 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 파일명 
*		 bool	IsMulti (Readonly:False) : 여러개의 컨트롤이 선택되었는지 여부 
*		 bool	Cancel (Readonly:False) : 이 값을 true로 설정하면 작업이 취소됩니다. 
*		 bool	IsServerUpload (Readonly:False) : 서버로 업로드인지 여부 
*		 BIMatrix.Common.enExportType	ExportType (Readonly:False) : Export Type 
*****************************************/
 var OnStartExport  = function(sender, args)
 { 
    if(args.Id == "DrillToDetail"){
	   args.Cancel = true;
	   window.setTimeout(function(){
	   		/* call server export function */
	   		Matrix.ExportServiceCall(args.Id);
	   },100);
	}
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
		var meta = Matrix.getMetaController(OlapGrid.Name);
		meta.ShowModal();
	}else if(args.Id == "imgchart") {
		if(chartToggle) {
			// 열려있을때
			chartCellHeight = GRP_CHART.Height;
			GRP_CHART.Height = 0;
			OlapGrid.Top -= ( chartCellHeight + gapChartGrid + LBL_SPLITTER.Height + gapChartGrid );
			LBL_SPLITTER.Top = OlapGrid.Top;
			LBL_SPLITTER.Visible = false;
			chartToggle = false;
		}else {
			// 닫혀있을때
			GRP_CHART.Height = chartCellHeight;
			OlapGrid.Top += ( chartCellHeight + gapChartGrid + LBL_SPLITTER.Height + gapChartGrid );
			LBL_SPLITTER.Top = OlapGrid.Top - ( LBL_SPLITTER.Height + gapChartGrid );
			LBL_SPLITTER.Visible = true;
			chartToggle = true;
		}
		setSelectRange();
		OlapGrid.Update();
		GRP_CHART.Update();
		if(isViewerMode){ USERDEFINED_LAYOUT_MGR.UpdateDefaultLayout(); }
	} else if(args.Id == "imgOption") {
		if(WIN_OPTION != null) { WIN_OPTION.Close(); }
		WIN_OPTION = Matrix.ShowWindow("Option" ,0 ,0 ,300 ,120 ,true ,false, LANGUAGE_OPTION_TITLE,false ,"#ffffff" ,2);
		//Maximize 방지 start - 2022-04-25
		var WIN_OPTION_Header = WIN_OPTION.uiElement.getElementsByClassName("dvDialogHeaderArea")[0];
		WIN_OPTION_Header.getElementsByClassName("dvDialogHeaderAreaButton")[0].style.display = "none";
		//Maximize 방지 end - 2022-04-25
		WIN_OPTION.OnDialogResult = function(type) {
			WIN_OPTION.Close();
			WIN_OPTION = null;
		}
		WIN_OPTION.OnClosed = function(s, e){
			WIN_OPTION = null;
		}
		WIN_OPTION.MoveToCenter();
		
	}
 };

/*****************************************
* 데이터 셀을 더블 클릭시 발생합니다.
* * arguments :  
*****************************************/
 var OnOlapViewDataCellDoubleClick  = function(sender, args)
 {  
   
	var xml = sender.getDrillToDetailXml(args.DataCell);
	var text = LANGUAGE_DETAIL_TITLE;
	try{
		var parser = null;
		var xmlDoc = null;
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(xml,"text/xml");
		}else{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(xml); 
		} 
		var nodes = xmlDoc.getElementsByTagName("SummaryInfo");
		var node;
		var infoNode; 
		var fldNode; 
		text = "";
		for(var i=0,len=nodes.length; i<len; i++){
			node = nodes[0]; //SummaryInfo
			for(var c=0,items=node.childNodes; c<items.length; c++){
				infoNode = items[c];
				if(infoNode.nodeName == "FieldInfo"){
					//Field
					for(var c2=0,subItems = infoNode.childNodes; c2<subItems.length; c2++){
						fldNode = subItems[c2];
						if(fldNode.nodeName == "Field"){
							if(fldNode.attributes.hasOwnProperty("IsNull") && fldNode.attributes["IsNull"].nodeValue == "True") continue;
							if(text != "") text += ", ";
							text += fldNode.attributes["Name"].nodeValue +"=" + fldNode.attributes["Value"].nodeValue;
						}
					}
				}
			}
		}	 
		if(text.length > 100){
			text = text.substring(0, 100) + "...";
		}
	}catch(e){text = "Drill To Detail";}
	/* 
	 * Parameters
	 * i-Meta가 적용된 컨트롤, DrillToDetail XML, Target 컨트롤 이름
	 */
	Matrix.DrillToDetail(sender, xml, 'DrillToDetail');
	
	var win = Matrix.ShowWindow("DETAIL" ,0 ,0 , 1024 ,768 ,true ,true ,text ,false, "", 1);
	win.MoveToCenter();
}
  
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
			else if(rdoCSV.Checked) OlapGrid.ExportCSV();
			else if(rdoText.Checked) {
				// 구분자 세팅
												OlapGrid.ExportText();
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
    //olap의 컬럼 전체 사이즈
	var columnCount = OlapGrid.ColumnCount + OlapGrid.getRowsFieldNames().length; 
	var colspan = columnCount; 
	if(type == "xlsx") colspan =  Math.min(columnCount, 13);
	
	var WORKBOOK = {
		"FontName":"맑은 고딕"
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
		WORKBOOK.WorkSheets[0].Controls.push({ "Name": OlapGrid.Name, "Range": "A" + (startRow + 12)});		
	}else{
		WORKBOOK.WorkSheets[0].Controls.push({ "Name": OlapGrid.Name, "Range": "A" + (startRow)});
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
			if(ctrl1.Type == 'CalendarFromTo'
				|| ctrl1.Type == 'CalendarYMFromTo'
				|| ctrl1.Type == 'CalendarWeeklyFromTo') {
				value1 = ctrl1.GetValue();
				value2 = ctrl1.GetValue2();
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
	var selectedID = args.Id;
	switch(args.Id) {
		case 'rdoText':
			grpSeperate.Visible = true;
		break;
		default:
			grpSeperate.Visible = false;
	}
 };