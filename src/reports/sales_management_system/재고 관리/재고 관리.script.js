/* 조회 조건 컨트롤 */
var VS_CATEGORY 	 = Matrix.getObject('VS_CATEGORY');		// 카테고리
var VS_WAREHOUSE 	 = Matrix.getObject('VS_WAREHOUSE');	// 창고
var VS_KEYWORD 		 = Matrix.getObject('VS_KEYWORD');		// 검색어

/* '재고 등록' Form의 입력 컨트롤 */
var VS_INP_PRODUCT 	 = Matrix.getObject('VS_INP_PRODUCT');	// 제품
var VS_INP_STORAGE 	 = Matrix.getObject('VS_INP_STORAGE');	// 창고
var VN_INP_CURR 	 = Matrix.getObject('VN_INP_CURR');		// 현재 재고
var VN_INP_SAFE 	 = Matrix.getObject('VN_INP_SAFE');		// 안전 재고

var GRD_STOCK		= Matrix.getObject('GRD_STOCK');		// DataGrid 
var BTN_SAV			= Matrix.getObject('BTN_SAV');			// 저장 버튼
var popup 			= null; // '재고 관리' Form


/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :  
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 제품명으로 검색');
	
	GRD_STOCK.GetField('INV_ID').KeyType = 3; // KeyType: Primary
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
 	if(['VS_CATEGORY','VS_WAREHOUSE'].includes(args.Id)){
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
		case 'BTN_ADD':	// 재고 등록 (Form: 재고 관리)
			setInputValue(null);
			Matrix.SetGlobalParams('INV_ID',false);
			BTN_SAV.Text = '추가';
			
			popup = Matrix.ShowWindow("재고 등록",0,0,460,265,true,false,"재고 등록",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;
			
		case 'BTN_REF': // 검색 (Form: 재고 관리)
			Matrix.doRefresh('GRD_STOCK');
			break;
			
		case 'BTN_RESET': // 초기화 (Form: 제품 관리)
			Matrix.getObject('VS_CAT').CheckAll();
			VS_KEYWORD.Text = '';
			break;
			
		case 'BTN_DEL': // 삭제 (Form: 제품 관리)
			var checkCount = 0;
			for(var i=0; i<GRD_STOCK.GetRowCount(); i++){
				if(GRD_STOCK.getRowValue(i,'CHK') == 'Y'){
					GRD_STOCK.ChangeRowStateAt(i,'D');
					checkCount++;
				}
			}
			
			if(!checkCount){
				Matrix.Information('삭제할 항목을 선택하세요','안내');
				return;
			}
			
			Matrix.Confirm('선택한 항목을 삭제하시겠습니까?','안내' ,function(ok){
               	if(ok){
					Matrix.RunScript('GRD_STOCK','GRD_DELETE' ,function(p){
						if(p.Success == false){
						Matrix.Alert(p.Message);
						return;
					}
						Matrix.doRefresh('GRD_STOCK');
						Matrix.Information('삭제 완료되었습니다.','안내');
					});
             	}else GRD_STOCK.ClearRowState(false);
            } ,0);
			
			break;
			
		case 'BTN_RESET': // 초기화 (Form: 재고 관리)
			['VS_CATEGORY','VS_WAREHOUSE','VS_STATUS'].forEach(function(i){
				Matrix.getObject(i).CheckAll();
			});
			VS_KEYWORD.Text = '';
			break;
			
		case 'BTN_CNC': // 취소 (Form: 재고 등록)
			popup.Close();
			break;
			
		case 'BTN_SAV': // 저장 (Form: 제품 등록)
			var fields = [VS_INP_PRODUCT.Value,VS_INP_STORAGE.Value,VN_INP_CURR.Value];
			if(isInvalidInput(fields)){
				Matrix.Information('필수 입력 항목을 확인해주세요','안내');
				return;
			}
			
			var scriptName = Matrix.GetGlobalParamValue('VS_INV_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
			Matrix.RunScript('',scriptName ,function(p){
            	if(p.Success == false){
           		Matrix.Alert(p.Message);
           		return;
           	}
				Matrix.doRefresh('GRD_STOCK');
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
 	if(args.Id == 'GRD_STOCK'){
		Matrix.getObject('LBL_TTL_2').Text = '   재고 목록 (' + args.RecordCount + '건)';
	
	}else if(args.Id == 'GRD_TOTAL'){
		if(!args.RecordCount){
			['1','2','3','4'].forEach(function(i){
				Matrix.getObject('LBL_TOTAL_VAL_' + i).Text = '';
			});
		}
		
		var val = Matrix.getObject(args.Id).getRowValue(0,'UNDER_SAFETY_STOCK_COUNT_VAL');
		var setColor = val<0 ? '#ef4444' : '#1e293b';
		
		Matrix.getObject('LBL_TOTAL_VAL_3').Style.Font.Color.SetColor(setColor);
		Matrix.getObject('LBL_TOTAL_VAL_3').Update();
	}
 };
 
 
/**************************************
 * 텍스트 박스 컨트롤의 key 입력 시 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤 이름 
 *		 string	Text (Readonly:False) : 현재 텍스트 
 *		 aud.data.Event	Event (Readonly:False) : 텍스트박스 key event 객체 
**************************************/
 var OnTextKeydown  = function(sender, args){
 	if(args.Id == 'VS_KEYWORD' && args.Event.isEnter()){
		Matrix.doRefresh('GRD_STOCK');
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
 	if(args.Id == 'GRD_STOCK'){
		var GRD_STOCK = Matrix.getObject(args.Id);
		var checkValue = args.Checked ? "Y" : "N";
		
		for (var i=0; i<GRD_STOCK.GetRowCount(); i++) {
			GRD_STOCK.setRowValue(i, "CHK", checkValue);
		}
		GRD_STOCK.Update();
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
 	if(args.Id == 'GRD_STOCK'){
		setInputValue(args.Row);
		Matrix.SetGlobalParams('VS_INV_ID',args.Row.GetValue('INV_ID'));
		BTN_SAV.Text = '저장';
			
		popup = Matrix.ShowWindow("재고 등록",0,0,460,265,true,false,"재고 등록",true,'#ffffff',0,false,false);
		popup.MoveToCenter();
	}
 };
 
 
 var setInputValue = function(row){
 	if(typeof row === 'object' && row !== null){
		VS_INP_PRODUCT.IsReadOnly = true;
		VS_INP_PRODUCT.Text	= row.GetValue('PROD_NAME');
		VS_INP_STORAGE.Value	= row.GetValue('STORAGE');
		VN_INP_CURR.Value		= row.GetValue('CURR_QTY');
		VN_INP_SAFE.Value		= row.GetValue('SAFE_QTY');

	}else{
		VS_INP_PRODUCT.IsReadOnly = false;
		VS_INP_PRODUCT.Value	= '';
		VS_INP_STORAGE.Value	= '';
		VN_INP_CURR.Value		= '';
		VN_INP_SAFE.Value		= '';
	}
 }
 
 
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
 
 
var isInvalidInput = function(fields) {
	return fields.some(function(v) {
		return v === null || v === undefined || v === '';
	});
}