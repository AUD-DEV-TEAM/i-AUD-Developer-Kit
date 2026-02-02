import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Group } from "@AUD_CLIENT/control/Group";

let Matrix : Matrix;

/*****************************
 * Typed const declarations
 *****************************/
const GRP_BODY_1 : Group =   Matrix.getObject("GRP_BODY_1") as Group;
const GRP_TOTAL_1 : Group =   Matrix.getObject("GRP_TOTAL_1") as Group;
const GRP_TOTAL_4 : Group =   Matrix.getObject("GRP_TOTAL_4") as Group;
const GRP_TOTAL_2 : Group =   Matrix.getObject("GRP_TOTAL_2") as Group;
const GRP_TOTAL_3 : Group =   Matrix.getObject("GRP_TOTAL_3") as Group;
const GRP_BODY_2 : Group =   Matrix.getObject("GRP_BODY_2") as Group;
const GRP_BODY_3 : Group =   Matrix.getObject("GRP_BODY_3") as Group;
const GRP_BODY_4 : Group =   Matrix.getObject("GRP_BODY_4") as Group;


/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
 	(Matrix.getObject('LBL_TTL_2') as Label).Text = Matrix.GetUserInfo().UserName+'님 환영합니다';
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
			Matrix.doRefresh('');
			break;

		case 'BTN_VIEW_ALL':
			let reportCode = 'REPDAC43822C5394FCB8F2FEFAF0F86329C';
			let parameter = {};
			let options = {
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
			Matrix.ShowReportDialog(reportCode ,parameter ,options ,function(result){});
	}
 };

/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 * * arguments :
 *		 number	Width (Readonly:False) : 뷰어의 넓이
 *		 number	Height (Readonly:False) : 뷰어의 높이
**************************************/
 var OnViewerSizeChanged  = function(sender, args){
 	/* TOTAL */
	let setTotalWidth	= (args.Width-100) / 4;
	let setCardWidth	= setTotalWidth*2+20;
	let setLeft 		= setTotalWidth*2+60;

	GRP_TOTAL_1.Width = setTotalWidth;
	GRP_TOTAL_2.Width = setTotalWidth;
	GRP_TOTAL_3.Width = setTotalWidth;
	GRP_TOTAL_4.Width = setTotalWidth;

	GRP_TOTAL_2.Left = setTotalWidth+40;
	GRP_TOTAL_3.Left = setLeft;
	GRP_TOTAL_4.Left = setTotalWidth*3+80;

	/* BODY */
	GRP_BODY_1.Width = setCardWidth;
	GRP_BODY_3.Width = setCardWidth;
	GRP_BODY_2.Left = setLeft;
	GRP_BODY_4.Left = setLeft;
 };
