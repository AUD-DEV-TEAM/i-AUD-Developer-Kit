import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Group } from "@AUD_CLIENT/control/Group";
import { CalendarYear } from "@AUD_CLIENT/control/CalendarYear";

let Matrix : Matrix;

/*****************************
 * Control Declarations
 *****************************/
const GRP_TOTAL_1: Group = Matrix.getObject("GRP_TOTAL_1") as Group;
const GRP_TOTAL_2: Group = Matrix.getObject("GRP_TOTAL_2") as Group;
const GRP_TOTAL_3: Group = Matrix.getObject("GRP_TOTAL_3") as Group;
const GRP_TOTAL_4: Group = Matrix.getObject("GRP_TOTAL_4") as Group;
const GRP_BODY_1: Group = Matrix.getObject("GRP_BODY_1") as Group;
const GRP_BODY_2: Group = Matrix.getObject("GRP_BODY_2") as Group;
const GRP_BODY_3: Group = Matrix.getObject("GRP_BODY_3") as Group;
const GRP_BODY_4: Group = Matrix.getObject("GRP_BODY_4") as Group;



/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 **************************************/
var OnDocumentLoadComplete = function(sender, args) {
	(Matrix.getObject('LBL_TTL_2') as Label).Text = Matrix.GetUserInfo().UserName + '님 환영합니다';
};


/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
var OnButtonClick = function(sender, args) {
	switch (args.Id) {
		case 'BTN_REF':
			Matrix.doRefresh('');
			break;

		case 'BTN_VIEW_ALL':
			const reportCode = 'REPDAC43822C5394FCB8F2FEFAF0F86329C'; // 영업 실적
			const parameter = (Matrix.getObject('VS_YEAR') as CalendarYear).Value;
			const options = {
				Width: 1500,
				Height: 1000,
				MinWidth: 200,
				MinHeight: 200,
				Left: 30,
				Top: 30,
				Center: true,
				IsModal: false,
				Title: "최근 영업 실적 전체보기",
				Maximize: false,
				Resizable: false,
				Buttons: 0,
				Minimizable: false
			};
			Matrix.ShowReportDialog(reportCode, parameter, options, function(result) {});
			break;
	}
};


/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 * * arguments :
 *		 number	Width (Readonly:False) : 뷰어의 넓이
 *		 number	Height (Readonly:False) : 뷰어의 높이
 **************************************/
var OnViewerSizeChanged = function(sender, args) {
	/* TOTAL */
	const setTotalWidth = (args.Width - 100) / 4;
	const setCardWidth = setTotalWidth * 2 + 20;
	const setLeft = setTotalWidth * 2 + 60;

	GRP_TOTAL_1.Width = setTotalWidth;
	GRP_TOTAL_2.Width = setTotalWidth;
	GRP_TOTAL_3.Width = setTotalWidth;
	GRP_TOTAL_4.Width = setTotalWidth;

	GRP_TOTAL_2.Left = setTotalWidth + 40;
	GRP_TOTAL_3.Left = setLeft;
	GRP_TOTAL_4.Left = setTotalWidth * 3 + 80;

	/* BODY */
	GRP_BODY_1.Width = setCardWidth;
	GRP_BODY_3.Width = setCardWidth;
	GRP_BODY_2.Left = setLeft;
	GRP_BODY_4.Left = setLeft;
};
