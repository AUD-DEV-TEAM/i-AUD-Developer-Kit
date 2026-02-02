/* init controls */
var GRD_PLAN		= Matrix.getObject('GRD_PLAN');			// DataGrid 
var BTN_SAV			= Matrix.getObject('BTN_SAV');			// 저장 버튼
var popup 			= null; // '계획 등록' Form

/* 조회 조건 컨트롤 */
var VS_YM 			= Matrix.getObject('VS_YM');		// 연월
var VS_PIC 			= Matrix.getObject('VS_PIC');		// 담당자
var VS_STATUS		= Matrix.getObject('VS_STATUS');	// 상태

/* '계획 등록' Form의 입력 컨트롤 */
var VS_INP_ID 		= Matrix.getObject('VS_INP_ID');		// 계획ID
var VS_INP_YM 		= Matrix.getObject('VS_INP_YM');		// 계획년월
var VS_INP_PIC 		= Matrix.getObject('VS_INP_PIC');		// 담당자
var VS_INP_PROD 	= Matrix.getObject('VS_INP_PROD');		// 제품
var VN_INP_QTY 		= Matrix.getObject('VN_INP_QTY');		// 계획 수량
var VN_INP_AMT 		= Matrix.getObject('VN_INP_AMT');		// 계획 금액
var VS_INP_STATUS	= Matrix.getObject('VS_INP_STATUS');	// 상태

/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :  
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
	VS_INP_ID.IsReadOnly= true;
	GRD_PLAN.GetField('PLAN_ID').KeyType = 3; // KeyType: Primary
 };
 
 
/**************************************
 * Execute 실행되는 시점에 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤 이름 
 *		 boolean	Cancel (Readonly:False) : 이 값을 true로 설정 시 실행이 취소됩니다. 
 *		 number	FilterType (Readonly:False) : 0:일반 조회, 1:검색 텍스트박스 조회, 2:전체검색 버튼 조회 
 *		 string	FilterText (Readonly:False) : 검색 텍스트박스에 입력된 검색어 
**************************************/
 var OnMultiComboBoxExecuteStart  = function(sender, args){
 	if(['VS_PIC', 'VS_STATUS'].includes(args.Id)){
		Matrix.getObject(args.Id).CheckAll();
	}
 };
 
 
/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤이름 
 *		 string	Text (Readonly:False) : 라벨 값 
**************************************/
 var OnButtonClick  = function(sender, args){
 	switch(args.Id){
		case 'BTN_ADD':	// 계획 등록 (Form: 영업 계획)
			setInputValue(false); // Input 컨트롤 초기화
			Matrix.SetGlobalParams('PLAN_ID',false);
			BTN_SAV.Text = '추가';
			
			popup = Matrix.ShowWindow("계획 등록",0,0,460,415,true,false,"계획 등록",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;
			
		case 'BTN_REF': // 검색 (Form: 영업 계획)
			Matrix.doRefresh('GRD_PLAN');
			break;
			
		case 'BTN_RESET': // 초기화 (Form: 영업 계획)
			['VS_PIC', 'VS_STATUS'].forEach(function(i){
				Matrix.getObject(i).CheckAll();
			});
			break;
			
		case 'BTN_DEL': // 삭제 (Form: 영업 관리)
			var checkCount = 0;
			for(var i=0; i<GRD_PLAN.GetRowCount(); i++){
				if(GRD_PLAN.getRowValue(i,'CHK') == 'Y'){
					GRD_PLAN.ChangeRowStateAt(i,'D');
					checkCount++;
				}
			}
			
			if(!checkCount){
				Matrix.Information('삭제할 항목을 선택하세요','안내');
				return;
			}
			
			Matrix.Confirm('선택한 항목을 삭제하시겠습니까?','안내' ,function(ok){
               	if(ok){
					Matrix.RunScript('GRD_PLAN','GRD_DELETE' ,function(p){
						if(p.Success == false){
						Matrix.Alert(p.Message);
						return;
					}
						Matrix.doRefresh('GRD_PLAN');
						Matrix.Information('삭제 완료되었습니다.','안내');
					});
             	}else GRD_PLAN.ClearRowState(false);
            } ,0);
			
			break;
			
		case 'BTN_CNC': // 취소 (Form: 영업 계획)
			popup.Close();
			break;
			
		case 'BTN_SAV': // 저장 (Form: 영업 등록)
			var fields = [VS_INP_ID.Text,VS_INP_YM.Value,VS_INP_PIC.Value,VS_INP_PROD.Value,VN_INP_QTY.Value,VS_INP_STATUS.Value];
			if(isInvalidInput(fields)){
				Matrix.Information('필수 입력 항목을 확인해주세요','안내');
				return;
			}
			
			var scriptName = Matrix.GetGlobalParamValue('VS_PLAN_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
			Matrix.RunScript('',scriptName ,function(p){
            	if(p.Success == false){
           		Matrix.Alert(p.Message);
           		return;
           	}
				Matrix.doRefresh('GRD_PLAN');
				Matrix.Information(BTN_SAV.Text+' 완료되었습니다.','안내');
				popup.Close();
            });
			break;
	}
 };
 
 /**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤이름 
 *		 number	RecordCount (Readonly:False) : 데이터셋의 레코드 수량 
**************************************/
 var OnDataBindEnd  = function(sender, args){
 	if(args.Id == 'GRD_PLAN'){
		Matrix.getObject('LBL_TTL_2').Text = '   영업 계획 목록 (' + args.RecordCount + '건)';
	
	}else if(args.Id == 'GRD_TOTAL'){
		if(!args.RecordCount){
			['1','2','3','4'].forEach(function(i){
				Matrix.getObject('LBL_TOTAL_VAL_' + i).Text = '';
			});
		}
	}
 };
 
 
/**************************************
 * 그리드의 멀티 헤더 체크 박스를 클릭하는 순간 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤 이름 
 *		 aud.control.grids.MultiHeaderCell	HeaderCell (Readonly:False) : 멀티헤더셀 객체 
 *		 boolean	Checked (Readonly:False) : 체크 유무 
 *		 boolean	Cancel (Readonly:False) : 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다. 
**************************************/
 var OnGridMultiHeaderCheckBoxClicked  = function(sender, args){
 	if(args.Id == 'GRD_PLAN'){
		var GRD_PLAN = Matrix.getObject(args.Id);
		var checkValue = args.Checked ? "Y" : "N";
		
		for (var i=0; i<GRD_PLAN.GetRowCount(); i++) {
			GRD_PLAN.setRowValue(i, "CHK", checkValue);
		}
		GRD_PLAN.Update();
	}
 };
 
 /**************************************
 * 그리드의 셀을 더블 클릭할 떄 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤 이름 
 *		 aud.control.grids.DataGridRow	Row (Readonly:False) : 데이터 레코드 정보 
 *		 aud.control.grids.DataGridCell	Cell (Readonly:False) : 데이터셀 정보 
 *		 aud.control.grids.DataGridColumn	Field (Readonly:False) : 필드 정보 
**************************************/
 var OnCellDoubleClick  = function(sender, args){
 	if(args.Id == 'GRD_PLAN'){
		setInputValue(args.Row);
		Matrix.SetGlobalParams('VS_PLAN_ID',args.Row.GetValue('PLAN_ID'));
		BTN_SAV.Text = '저장';
		
		popup = Matrix.ShowWindow("계획 등록",0,0,460,415,true,false,"계획 등록",true,'#ffffff',0,false,false);
		popup.MoveToCenter();
	}
 };
 
 
/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 * * arguments :  
 *		 number	Width (Readonly:False) : 뷰어의 넓이 
 *		 number	Height (Readonly:False) : 뷰어의 높이 
**************************************/
 var OnViewerSizeChanged  = function(sender, args){
 	var GRP_TOTAL_1 = Matrix.getObject('GRP_TOTAL_1');
 	var GRP_TOTAL_2 = Matrix.getObject('GRP_TOTAL_2');
 	var GRP_TOTAL_3 = Matrix.getObject('GRP_TOTAL_3');
 	var GRP_TOTAL_4 = Matrix.getObject('GRP_TOTAL_4');
	
	var setWidth = (args.Width-100) / 4;

	GRP_TOTAL_1.Width = setWidth;
	GRP_TOTAL_2.Width = setWidth;
	GRP_TOTAL_3.Width = setWidth;
	GRP_TOTAL_4.Width = setWidth;
	
	GRP_TOTAL_2.Left = setWidth+40;
	GRP_TOTAL_3.Left = setWidth*2+60;
	GRP_TOTAL_4.Left = setWidth*3+80;
 };
 
 
 var setInputValue = function(row){
 	if(row){
		VS_INP_ID.Text	  	= row.GetValue('PLAN_ID');
		VS_INP_YM.Value	 	= row.GetValue('PLAN_YM');
		VS_INP_PIC.Value 	= row.GetValue('EMP_ID');
		VS_INP_PROD.Value	= row.GetValue('PROD_ID');
		VN_INP_QTY.Value	= row.GetValue('TARGET_QTY');
		VN_INP_AMT.Value	= row.GetValue('TARGET_AMT');
		VS_INP_STATUS.Value	= row.GetValue('PLAN_STATUS_CODE');
	
	}else{
		Matrix.Execute('SET_PLAN_ID' ,function(p){
			if(p.Success == false){
				Matrix.Alert(p.Message);
				return;
			}
			var  dt = p.DataTable;
			VS_INP_ID.Text = dt.getRowValue(0,'PLAN_ID');
       });
		VS_INP_YM.Value	 	= '';
		VS_INP_PIC.Value 	= '';
		VS_INP_PROD.Value	= '';
		VN_INP_QTY.Value	= '';
		VN_INP_AMT.Value	= '';
		VS_INP_STATUS.Value	= '';
	}
 };
 
 
var isInvalidInput = function(fields) {
	return fields.some(function(v) {
		return v === null || v === undefined || v === '';
	});
};