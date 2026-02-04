import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Button } from "@AUD_CLIENT/control/Button";
import { CalendarYear } from "@AUD_CLIENT/control/CalendarYear";

let Matrix : Matrix;

/* Button Controls */
const BTN_REF: Button = Matrix.getObject("BTN_REF") as Button;
const BTN_VIEW_ALL: Button = Matrix.getObject("BTN_VIEW_ALL") as Button;


Matrix.OnDocumentLoadComplete = function(s, e) {
	(Matrix.getObject('LBL_TTL_2') as Label).Text = Matrix.GetUserInfo().UserName + '님 환영합니다';
};

/******** Button Click Event ********/
// 검색
BTN_REF.OnClick = function(s, e) {
	Matrix.doRefresh('');
};

// 전체보기
BTN_VIEW_ALL.OnClick = function(s, e) {
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
};
/******** Button Click Event ********/