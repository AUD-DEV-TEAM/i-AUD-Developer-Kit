/* 조회 조건 컨트롤 */
var VS_TYPE 	= Matrix.getObject('VS_TYPE');		// 고객유형
var VS_GRADE 	= Matrix.getObject('VS_GRADE');		// 고객등급
var VS_KEYWORD 	= Matrix.getObject('VS_KEYWORD');	// 검색어

/* '고객 등록' Form의 입력 컨트롤 */
var VS_INP_NAME 	= Matrix.getObject('VS_INP_NAME');	// 고객명
var VS_INP_TYPE 	= Matrix.getObject('VS_INP_TYPE');	// 고객유형
var VS_INP_GRADE 	= Matrix.getObject('VS_INP_GRADE');	// 고객등급
var VN_INP_LIMIT 	= Matrix.getObject('VN_INP_LIMIT');	// 외상가능한도금액
var VS_INP_REG_NO 	= Matrix.getObject('VS_INP_REG_NO');// 사업자번호
var VS_INP_PHONE 	= Matrix.getObject('VS_INP_PHONE');	// 연락처
var VS_INP_EMAIL 	= Matrix.getObject('VS_INP_EMAIL');	// 이메일
var VS_INP_MAIN 	= Matrix.getObject('VS_INP_MAIN');	// 사업장주소



/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :  
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 고객명, 사업자번호로 검색');
 };
 
 
/**************************************
 * 문서가 로드되고 AutoRefresh가 완료되는 시점에 발생합니다.
 * * arguments :  
 *		 boolean	Success (Readonly:False) : 성공여부 
 *		 string	Message (Readonly:False) : 에러 메시지 
**************************************/
 var OnLoadComplete  = function(sender, args){
 	if(args.Success){
		setInputValue(false);
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
		case 'BTN_REF': // 검색
			Matrix.doRefresh('GRD_CUSTOMER');
			break;
			
		case 'BTN_RESET': // 초기화
			setInputValue(false);
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
 	if(args.Id == 'GRD_CUSTOMER'){
		Matrix.getObject('LBL_TTL_2').Text = '   고객 목록 (' + args.RecordCount + '개사)';
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
		Matrix.doRefresh('GRD_CUSTOMER');
	}
 };
 
 
/**************************************
 * 그리드의 멀티 헤더 체크 박스를 클릭하는 순간 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤 이름 
 *		 aud.control.grids.MultiHeaderCell	HeaderCell (Readonly:False) : 멀티헤더셀 객체 
 *		 booleans	Checked (Readonly:False) : 체크 유무 
 *		 boolean	Cancel (Readonly:False) : 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다. 
**************************************/
 var OnGridMultiHeaderCheckBoxClicked  = function(sender, args){
 	if(args.Id == 'GRD_CUSTOMER'){
		var GRD_CUSTOMER = Matrix.getObject(args.Id);
		var checkValue = args.Checked ? 'Y' : 'N';
		
		for (var i=0; i<GRD_CUSTOMER.GetRowCount(); i++) {
			GRD_CUSTOMER.setRowValue(i, 'CHK', checkValue);
		}
		GRD_CUSTOMER.Update();
	}
 };
 
 
/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 * * arguments :  
 *		 number	Width (Readonly:False) : 뷰어의 넓이 
 *		 number	Height (Readonly:False) : 뷰어의 높이 
**************************************/
 var OnViewerSizeChanged  = function(sender, args){
 	var GRP_BODY 	 = Matrix.getObject('GRP_BODY');	
	GRP_BODY.Width = args.Width - 520;
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
 	if(args.Id == 'GRD_CUSTOMER'){
		setInputValue(args.Row);
	}
 };
 
 
 var setInputValue = function(row){
 	if(row){
		VS_INP_NAME.Text	= row.GetValue('CUST_NAME');
		VS_INP_TYPE.Value	= row.GetValue('TYPE_CODE');
		VS_INP_GRADE.Value	= row.GetValue('GRADE_CODE');
		VN_INP_LIMIT.Value	= row.GetValue('CREDIT_LIMIT');
		VS_INP_REG_NO.Text	= row.GetValue('REG_NO');
		VS_INP_PHONE.Text	= row.GetValue('PHONE');
		VS_INP_EMAIL.Text	= row.GetValue('EMAIL');
		VS_INP_MAIN.Text	= row.GetValue('MAIN');
	
	}else{
		VS_INP_NAME.Text	= '';
		VS_INP_TYPE.Value	= '';
		VS_INP_GRADE.Value	= '';
		VN_INP_LIMIT.Value	= '';
		VS_INP_REG_NO.Text	= '';
		VS_INP_PHONE.Text	= '';
		VS_INP_EMAIL.Text	= '';
		VS_INP_MAIN.Text	= '';
	}
 }