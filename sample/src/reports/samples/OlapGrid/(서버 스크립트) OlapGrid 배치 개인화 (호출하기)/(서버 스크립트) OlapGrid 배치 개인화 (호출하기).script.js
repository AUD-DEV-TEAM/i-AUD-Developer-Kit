
/*****************************************
* 버튼 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Text (Readonly:False) : 라벨 값 
*****************************************/
 var OnButtonClick  = function(sender, args)
 {
 	if(args.Id == "btnSaveLayout"){
		ShowLayoutWindow("CREATE","OlapGrid");
	}else if(args.Id == "btnLoadLayout"){
		ShowLayoutWindow("SELECT","OlapGrid");
	}
 }
 
 
 var ShowLayoutWindow = function(jobType, olapName){
 	if(! Matrix.GetReportInfo().CODE){
		Matrix.Information("배치 저장/복원 기능은 현재 보고서를 저장 후 사용 가능합니다." ,"저장 확인");
		return;
	}
	// 팝업창으로 넘길 파라미터 설정.
	var olapGrid =  Matrix.getObject(olapName);
	var param = {
		  "VS_LAYOUT_REPORT_CODE" : Matrix.GetReportInfo().CODE
		, "VS_LAYOUT_INFO" : (jobType == "CREATE" ? getLayoutInfo(olapName) : "")
		, "VS_CONTROL_CODE" : olapName
		, "JOB_TYPE":jobType
		, "CONTROL_NAME": (olapGrid.Caption ? olapGrid.Caption : olapGrid.Name)
		, "REPORT_NAME" : Matrix.GetReportInfo().NAME
	};	 
	// 팝업창에 표시할 보고서 코드.
	var reportCode = "REPA57EA3E7DDBB4576841598FC91055FE9";	
	// 팝업창 옵션 설정.
	var opt = {
		Width : 500,
		Height : 400,
		Left : 30,
		Top : 30,
		Center : true,
		Modal : true,
		Title : "",
		Maximize : true,
		Resizable : true, 
		Buttons : 0 // Button  0 : 없음, 1:닫기, 2:확인/취소
	};
 
	Matrix.ShowReportDialog(reportCode, param, opt, function(result){
		if(result){
			if(jobType == "SELECT"){
				setLayoutInfo(result);
			}
		}
	});	
 
 };
  
 var getLayoutInfo = function(id){
 	var ctl = Matrix.getObject(id);
	//var ctl = Matrix.getObject("OlapGrid");
	var fields = ctl.getFields(); 
	var RESULT = [];
	for(var i=0; i<fields.length; i++){
		var fld = fields[i];
		var item = {
			"Name": fld.Name
			,"Area": fld.Area
			,"AreaIndex": fld.AreaIndex
			,"Caption": fld.Caption
			,"Format": fld.Format 
			,"Formula": fld.Formula 
			,"Formula2": fld.Formula2 
			,"SortType": fld.SortType 
			,"SortBaseField": fld.SortBaseField 
			,"SummaryType": fld.SummaryType 
			,"SummaryVariation": fld.SummaryVariation 
			,"SummaryBaseFieldKey": fld.SummaryBaseFieldKey 
			,"TextAlignment": fld.TextAlignment 
			,"ToolTipField": fld.ToolTipField
			,"ToolTipText": fld.ToolTipText
			,"TotalSummaryType": fld.TotalSummaryType
			,"Width": fld.Width
			,"Visible": fld.Visible
			,"VisibleSubTotal": fld.VisibleSubTotal
			,"Unit": fld.Unit
			,"FilterInfo":fld.FilterInfo.Serialize()
		};
		RESULT.push(item);		
	}
	return  JSON.stringify(RESULT);
 }
 var setLayoutInfo = function(result){ 	
 	var ctl = Matrix.getObject(result.CONTROL);	
	var fields = result.MODEL;
	for(var i=0; i<fields.length; i++){
		var fld = fields[i];
		var oldFld = ctl.getField(fld.Name);
		if(oldFld != null){
			oldFld.Name = fld.Name
			oldFld.Area = fld.Area
			oldFld.AreaIndex = fld.AreaIndex
			oldFld.Caption = fld.Caption
			oldFld.Format = fld.Format 
			oldFld.Formula = fld.Formula 
			oldFld.Formula2 = fld.Formula2 
			oldFld.SortType = fld.SortType 
			oldFld.SortBaseField = fld.SortBaseField 
			oldFld.SummaryType = fld.SummaryType 
			oldFld.SummaryVariation = fld.SummaryVariation 
			oldFld.SummaryBaseFieldKey = fld.SummaryBaseFieldKey 
			oldFld.TextAlignment = fld.TextAlignment 
			oldFld.ToolTipField = fld.ToolTipField
			oldFld.ToolTipText = fld.ToolTipText
			oldFld.TotalSummaryType = fld.TotalSummaryType
			oldFld.Width = fld.Width
			oldFld.Visible = fld.Visible
			oldFld.VisibleSubTotal = fld.VisibleSubTotal
			oldFld.Unit = fld.Unit
			oldFld.FilterInfo.DeSerialize(fld.FilterInfo);
		} 		
	} 
	ctl.Refresh();	
 }
 
 
 