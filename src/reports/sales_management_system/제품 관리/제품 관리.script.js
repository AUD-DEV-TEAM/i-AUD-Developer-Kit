/* 조회 조건 컨트롤 */
var VS_CAT 			= Matrix.getObject('VS_CAT');			// 카테고리
var VS_STATUS		= Matrix.getObject('VS_STATUS');		// 판매 상태
var VS_KEYWORD 		= Matrix.getObject('VS_KEYWORD');		// 검색어

/* '제품 등록' Form의 입력 컨트롤 */
var VS_INP_PROD 	= Matrix.getObject('VS_INP_PROD');		// 제품명
var VS_INP_CAT 		= Matrix.getObject('VS_INP_CAT');		// 카테고리
var VS_INP_PRICE 	= Matrix.getObject('VS_INP_PRICE');		// 단가
var VS_INP_COST 	= Matrix.getObject('VS_INP_COST');		// 원가
var VS_INP_UNIT 	= Matrix.getObject('VS_INP_UNIT');		// 단위
var VS_INP_STATUS 	= Matrix.getObject('VS_INP_STATUS');	// 상태

var popup 			= null; // '제품 등록' Form을 오픈할 팝업


/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :  
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 제품명, 제품코드으로 검색');
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
 	if(['VS_CAT', 'VS_STATUS'].includes(args.Id)){
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
		case 'BTN_ADD':	// 제품 등록 (Form: 제품 관리)
			setInputValue(false); // Input 컨트롤 초기화
			
			popup = Matrix.ShowWindow("제품 등록",0,0,460,415,true,false,"제품 등록",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;
			
		case 'BTN_REF': // 검색 (Form: 제품 관리)
			Matrix.doRefresh('GRD_PRODUCT');
			break;
			
		case 'BTN_RESET': // 초기화 (Form: 제품 관리)
			['VS_CAT', 'VS_STATUS'].forEach(function(i){
				Matrix.getObject(i).CheckAll();
			});
			VS_KEYWORD.Text = '';
			break;
			
		case 'BTN_CNC': // 취소 (Form: 제품 등록)
			popup.Close();
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
 	if(args.Id == 'GRD_PRODUCT'){
		Matrix.getObject('LBL_TTL_2').Text = '   제품 목록 (' + args.RecordCount + '종)';
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
 	if(args.Id == 'GRD_PRODUCT'){
		var GRD_PRODUCT = Matrix.getObject(args.Id);
		var checkValue = args.Checked ? 'Y' : 'N';
		
		for (var i=0; i<GRD_PRODUCT.GetRowCount(); i++) {
			GRD_PRODUCT.setRowValue(i, 'CHK', checkValue);
		}
		GRD_PRODUCT.Update();
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
 	if(args.Id == 'GRD_PRODUCT'){
		setInputValue(args.Row);
		
		popup = Matrix.ShowWindow("제품 등록",0,0,460,415,true,false,"제품 등록",true,'#ffffff',0,false,false);
		popup.MoveToCenter();
	}
 };
 
 
 var setInputValue = function(row){
 	if(row){
		VS_INP_PROD.Text	  = row.GetValue('PROD_ID');
		VS_INP_CAT.Text	 	  = row.GetValue('CATEGORY');
		VS_INP_PRICE.Text 	  = row.GetValue('STD_PRICE');
		VS_INP_COST.Text	  = row.GetValue('COST_PRICE');
		VS_INP_UNIT.Text	  = row.GetValue('STD_UNIT');
		VS_INP_STATUS.Text	  = row.GetValue('SALES_STATUS');
	
	}else{
		VS_INP_PROD.Text	  = '';
		VS_INP_CAT.Value	  = '';
		VS_INP_PRICE.Value 	  = '';
		VS_INP_COST.Value	  = '';
		VS_INP_UNIT.Text	  = '';
		VS_INP_STATUS.Text	  = '';
	}
 }