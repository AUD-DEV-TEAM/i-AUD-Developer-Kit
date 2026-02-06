import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Button } from "@AUD_CLIENT/control/Button";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { PiePlotOptions } from "@AUD_CLIENT/control/charts/PiePlotOptions";

let Matrix : Matrix;

/* Button Controls */
const BTN_REF: Button = Matrix.getObject("BTN_REF") as Button;
const BTN_DETAIL_CST: Button = Matrix.getObject("BTN_DETAIL_CST") as Button;
const BTN_DETAIL_PRD: Button = Matrix.getObject("BTN_DETAIL_PRD") as Button;

/* Tab Controls */
const LBL_TAB_AMT: Label = Matrix.getObject("LBL_TAB_AMT") as Label;
const LBL_TAB_QTY: Label = Matrix.getObject("LBL_TAB_QTY") as Label;
const LBL_TAB_CNT: Label = Matrix.getObject("LBL_TAB_CNT") as Label;

let popup: any = null;


Matrix.OnDocumentLoadComplete = function(s, e) {
	Matrix.SetVariable('VN_RANK_CST', '1');
	Matrix.SetVariable('VN_RANK_PRD', '1');
};

Matrix.OnDataBindEnd = function(s, e) {
	if (['CHT_2', 'CHT_3', 'CHT_5'].includes(e.Id)) {
		((Matrix.getObject(e.Id) as Chart).PlotOptions as unknown as PiePlotOptions).DataLabelsDistance = 0;

	} else if (e.Id == 'GRD_TOTAL') {
		if (!e.RecordCount) {
			['1', '2', '3', '4'].forEach(function(i) {
				(Matrix.getObject('LBL_TOTAL_VAL_' + i) as Label).Text = '';
			});
		}

		['1', '2', '3', '4'].forEach(function(i) {
			let lbl = Matrix.getObject('LBL_RATE_' + i) as Label;
			let val = Number(lbl.Value);
			let displayVal = Math.abs(val).toFixed(1);

			if (isNaN(val)) {
				lbl.Text = '';
				lbl.Update();
				return;
			}

			if (val > 0) {
				lbl.Text = '▲ ' + displayVal + '% 전년 대비';
				lbl.Style.Font.Color.SetColor('#10b981'); // 초록

			} else if (val < 0) {
				lbl.Text = '▼ ' + displayVal + '% 전년 대비';
				lbl.Style.Font.Color.SetColor('#ef4444'); // 빨강

			} else {
				lbl.Text = '– 전년 대비';   // 0일 때
				lbl.Style.Font.Color.SetColor('#64748b'); // 회색
			}

			lbl.Update();
		});
	}
};

/******** Button Click Event ********/
// 조회
BTN_REF.OnClick = function(s, e) {
	Matrix.doRefresh('');
};

// 고객별 매출 상세
BTN_DETAIL_CST.OnClick = function(s, e) {
	Matrix.SetVariable('VN_RANK_CST', '10');
	Matrix.doRefresh('GRD_3_DTL');

	popup = Matrix.ShowWindow("고객별 매출 상세", 0, 0, 590, 573, true, false, "고객별 매출 TOP 10", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

// 제품별 매출 상세
BTN_DETAIL_PRD.OnClick = function(s, e) {
	Matrix.SetVariable('VN_RANK_PRD', '10');
	Matrix.doRefresh('GRD_4_DTL');

	popup = Matrix.ShowWindow("제품별 매출 상세", 0, 0, 680, 573, true, false, "제품별 매출 TOP 10", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};
/******** Button Click Event ********/

const setActiveTab = function(activeTab: Label) {
	let tabs = [
		{ tab: LBL_TAB_AMT, suffix: 'AMT' },
		{ tab: LBL_TAB_QTY, suffix: 'QTY' },
		{ tab: LBL_TAB_CNT, suffix: 'CNT' }
	];
	tabs.forEach(function(item) {
		let isActive = item.tab === activeTab;
		(Matrix.getObject('GRD_1_' + item.suffix) as DataGrid).Visible = isActive;
		(Matrix.getObject('CHT_1_' + item.suffix) as Chart).Visible = isActive;
		item.tab.Style.Background.Color.SetColor(isActive ? '#ffffff' : '#f1f5f9');
		item.tab.Update();
	});
};

// 매출액
LBL_TAB_AMT.OnClick = function(s, e) {
	setActiveTab(LBL_TAB_AMT);
};

// 수량
LBL_TAB_QTY.OnClick = function(s, e) {
	setActiveTab(LBL_TAB_QTY);
};

// 건수
LBL_TAB_CNT.OnClick = function(s, e) {
	setActiveTab(LBL_TAB_CNT);
};