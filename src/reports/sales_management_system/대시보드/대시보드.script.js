/* 조회 조건 컨트롤 */
var VS_YEAR = Matrix.doRefresh("VS_YEAR");

/* 라벨 컨트롤 */
var LBL_TOTAL_2 = Matrix.getObject("LBL_TOTAL_2");


/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :  
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
 	Matrix.getObject('LBL_TTL_2').Text = Matrix.GetUserInfo().UserName+'님 환영합니다';
 };

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤이름 
 *		 string	Text (Readonly:False) : 라벨 값 
**************************************/
 var OnButtonClick  = function(sender, args){
 	switch(args.Id){
		case 'BTN_REF':
			Matrix.doRefresh('GRD_1, GRD_2, GRD_3, GRD_4, GRD_5, GRD_TOTAL, CHT_1, CHT_2, CHT_3, CHT_4, CHT_5, CHT_6');
			break;
			
		case 'BTN_VIEW_ALL':
			var reportCode = 'REPDAC43822C5394FCB8F2FEFAF0F86329C';
			var parameter = {};
			var options = {
                         Width : 1500,	   //너비
                         Height : 1000,	   //높이
                         MinWidth : 200,	  //최소 너비
                         MinHeight : 200,  //최소 높이
                         Left : 30,	     //창의 위치(Left)
                         Top : 30,	     //창의 위치(Top)
                         Center : true,	 //창의 위치를 화면의 가운데로 배치할 지 여부
                         IsModal  : false,	 //모달창 여부
                         Title : "1-1. 재고 변동 추이",	//팝업창의 타이틀
                         Maximize : false,	//최대화 버튼 활성화 여부
                         Resizable : false,	//창 사이즈 조정 기능 활성화 여부
                         Buttons : 0,	       // 버튼 타입 ( 0 : 없음, 1:닫기, 2:확인/취소)
                         Minimizable : false // 접기/펼치기 버튼 활성화 여부
                      };
			Matrix.ShowReportDialog(reportCode ,parameter ,options ,function(result) {
                                                     /********************************************************************************************************
                                                     **  ShowReportDialog 파라미터 상세 설명
                                                     **  reportCode : 보고서 코드
                                                     **  parameter  :  팝업 창으로 전달 할 인자 값(객체 타입으로 배열,문자, 객체 모두 사용가능)
                                                                       팝업 창에서는 해당 인자를  Matrix.GetDialogRequestParams() 함수를 사용하여 접근
                                                     **  options    : 창 생성 옵션으로 창의 사이즈 및 위치 등의 정보
                                                                       {
                                                                         Width : 600,	   //너비
                                                                         Height : 500,	   //높이
                                                                         MinWidth : 200,	  //최소 너비
                                                                         MinHeight : 200,  //최소 높이
                                                                         Left : 30,	     //창의 위치(Left)
                                                                         Top : 30,	     //창의 위치(Top)
                                                                         Center : true,	 //창의 위치를 화면의 가운데로 배치할 지 여부
                                                                         IsModal  : false,	 //모달창 여부
                                                                         Title : "title",	//팝업창의 타이틀
                                                                         Maximize : false,	//최대화 버튼 활성화 여부
                                                                         Resizable : false,	//창 사이즈 조정 기능 활성화 여부
                                                                         Buttons : 0,	       // 버튼 타입 ( 0 : 없음, 1:닫기, 2:확인/취소)
                                                                         Minimizable : false // 접기/펼치기 버튼 활성화 여부
                                                                      };
                                                     **  callback   : 팝업 창에서 현재 보고서로 반환값을 전달 받을 수 있는 callback 함수
                                                                      - 팝업 창에서 부모창으로 반환값을 넘기려면 Matrix.ReportDialogResult(param, true)를
                                                                        사용하며, 첫 번째 인자 param의 값은 callback 함수의 첫번 째 인자 result로 전달 됩니다.
                                                     **************************************************************************************************************/
                                                    if(result){
                                                       // do something...
                                                    }
                                               });
	}
 };
 
/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 * * arguments :  
 *		 number	Width (Readonly:False) : 뷰어의 넓이 
 *		 number	Height (Readonly:False) : 뷰어의 높이 
**************************************/
 var OnViewerSizeChanged  = function(sender, args){
 	/* 상단 총계 그룹 */
 	var GRP_TOTAL_1 = Matrix.getObject('GRP_TOTAL_1');
 	var GRP_TOTAL_2 = Matrix.getObject('GRP_TOTAL_2');
 	var GRP_TOTAL_3 = Matrix.getObject('GRP_TOTAL_3');
 	var GRP_TOTAL_4 = Matrix.getObject('GRP_TOTAL_4');
	
	var setTotalWidth	= (args.Width-100) / 4;
	var setCardWidth	= setTotalWidth*2+20;
	var setLeft 		= setTotalWidth*2+60;

	GRP_TOTAL_1.Width = setTotalWidth;
	GRP_TOTAL_2.Width = setTotalWidth;
	GRP_TOTAL_3.Width = setTotalWidth;
	GRP_TOTAL_4.Width = setTotalWidth;
	
	GRP_TOTAL_2.Left = setTotalWidth+40;
	GRP_TOTAL_3.Left = setLeft;
	GRP_TOTAL_4.Left = setTotalWidth*3+80;
	
	/* 콘텐츠 그룹 */
 	var GRP_BODY_1 = Matrix.getObject('GRP_BODY_1');
 	var GRP_BODY_2 = Matrix.getObject('GRP_BODY_2');
 	var GRP_BODY_3 = Matrix.getObject('GRP_BODY_3');
 	var GRP_BODY_4 = Matrix.getObject('GRP_BODY_4');
	
	GRP_BODY_1.Width = setCardWidth;
	GRP_BODY_3.Width = setCardWidth;
	GRP_BODY_2.Left = setLeft;
	GRP_BODY_4.Left = setLeft;
 };

