import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Button } from "@AUD_CLIENT/control/Button";

let Matrix : Matrix;

/* Button Controls */
const BTN_REF: Button = Matrix.getObject("BTN_REF") as Button;
const LBL_TAB_ALL: Label = Matrix.getObject("LBL_TAB_ALL") as Label;
const LBL_TAB_TEAM1: Label = Matrix.getObject("LBL_TAB_TEAM1") as Label;
const LBL_TAB_TEAM2: Label = Matrix.getObject("LBL_TAB_TEAM2") as Label;


Matrix.OnDocumentLoadComplete = function(s, e) {
	Matrix.SetVariable('VS_DEPT', null);
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == "GRD_CUST") {
		let lbl = Matrix.getObject("LBL_CUST_3") as Label;
		let val = Number(lbl.Value);
		let displayVal = Math.abs(val).toFixed(1);
		if (isNaN(val)) {
			lbl.Text = "";
			lbl.Update();
			return;
		}
		if (val > 0) {
			lbl.Text = "▲ " + displayVal + " 전년 대비";
			lbl.Style.Font.Color.SetColor("#10b981"); // 초록
		}
		else if (val < 0) {
			lbl.Text = "▼ " + displayVal + " 전년 대비";
			lbl.Style.Font.Color.SetColor("#ef4444"); // 빨강
		}
		else {
			lbl.Text = "– 전년 대비"; // 0일 때
			lbl.Style.Font.Color.SetColor("#64748b"); // 회색
		}
		lbl.Update();

	} else if (e.Id == 'GRD_TOTAL') {
		if (!e.RecordCount) {
			['1', '2', '3', '4'].forEach(function(i) {
				(Matrix.getObject('LBL_TOTAL_VAL_' + i) as Label).Text = '';
			});
		}
	}
};

/******** Button Click Event ********/
// 검색
BTN_REF.OnClick = function(s, e) {
	Matrix.doRefresh("");
};
/******** Button Click Event ********/

const setActiveTab = function(activeTab: Label) {
	let tabArr = [LBL_TAB_ALL, LBL_TAB_TEAM1, LBL_TAB_TEAM2];
	tabArr.forEach(function(tab) {
		tab.Style.Background.Color.SetColor(tab === activeTab ? "#ffffff" : "#f1f5f9");
		tab.Update();
	});
};

// 전체
LBL_TAB_ALL.OnClick = function(s, e) {
	setActiveTab(LBL_TAB_ALL);
	Matrix.SetVariable('VS_DEPT', null);
	Matrix.doRefresh('CHT_2');
};

// 영업1팀
LBL_TAB_TEAM1.OnClick = function(s, e) {
	setActiveTab(LBL_TAB_TEAM1);
	Matrix.SetVariable('VS_DEPT', 'DEPT011');
	Matrix.doRefresh('CHT_2');
};

// 영업2팀
LBL_TAB_TEAM2.OnClick = function(s, e) {
	setActiveTab(LBL_TAB_TEAM2);
	Matrix.SetVariable('VS_DEPT', 'DEPT012');
	Matrix.doRefresh('CHT_2');
};

Matrix.OnCellLoaded = function(s, e) {
	if (e.Id == 'GRD_4' && e.Field.Name == 'DIFF') {
		if (e.Cell.Value as number > 0) e.FontColor = "#10b981"; 		// 초록
		else if (e.Cell.Value as number < 0) e.FontColor = "#ef4444"; 	// 빨강
		else e.FontColor = "#1e293b"; 							// 검정
	}
};

Matrix.OnViewerSizeChanged = function(s, e) {
	let setTotalWidth = (e.Width - 100) / 4;

	/*  ICON  */
	["1", "2", "3", "4"].forEach(function(i, idx) {
		let icon = Matrix.getObject("LBL_ICON_" + i) as Label;
		icon.Left = (setTotalWidth - 50) / 2;
	});
};