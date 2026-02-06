import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix: Matrix;

/* Controls */
const VS_KEYWORD: TextBox = Matrix.getObject("VS_KEYWORD") as TextBox;
const GRD_CUST: DataGrid = Matrix.getObject("GRD_CUST") as DataGrid;
const BTN_SEARCH: Button = Matrix.getObject("BTN_SEARCH") as Button;
const BTN_SELECT_ALL: Button = Matrix.getObject("BTN_SELECT_ALL") as Button;
const BTN_CLEAR: Button = Matrix.getObject("BTN_CLEAR") as Button;
const BTN_OK: Button = Matrix.getObject("BTN_OK") as Button;
const BTN_CANCEL: Button = Matrix.getObject("BTN_CANCEL") as Button;
const LBL_COUNT: Label = Matrix.getObject("LBL_COUNT") as Label;

// 부모에서 전달된 기존 선택 목록
let preSelectedIds: string[] = [];

Matrix.OnDocumentLoadComplete = function(s, e) {
	// 부모에서 전달된 파라미터 수신
	const params = Matrix.GetDialogRequestParams();
	if (params && params.SELECTED_IDS) {
		preSelectedIds = String(params.SELECTED_IDS).split(',').filter(function(v) { return v !== ''; });
	}
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_CUST') {
		// 기존 선택된 고객에 체크 표시
		if (preSelectedIds.length > 0) {
			for (let i = 0; i < GRD_CUST.GetRowCount(); i++) {
				const custId = String(GRD_CUST.getRowValue(i, 'CUST_ID'));
				if (preSelectedIds.indexOf(custId) !== -1) {
					GRD_CUST.setRowValue(i, 'CHK', 'Y');
				}
			}
			GRD_CUST.Update();
		}
		updateCount();
	}
};

// 조회
BTN_SEARCH.OnClick = function(s, e) {
	Matrix.doRefresh('GRD_CUST');
};

// 전체 선택
BTN_SELECT_ALL.OnClick = function(s, e) {
	for (let i = 0; i < GRD_CUST.GetRowCount(); i++) {
		GRD_CUST.setRowValue(i, 'CHK', 'Y');
	}
	GRD_CUST.Update();
	updateCount();
};

// 선택 해제
BTN_CLEAR.OnClick = function(s, e) {
	for (let i = 0; i < GRD_CUST.GetRowCount(); i++) {
		GRD_CUST.setRowValue(i, 'CHK', 'N');
	}
	GRD_CUST.Update();
	updateCount();
};

// 확인 - 선택된 고객 정보를 부모에 반환
BTN_OK.OnClick = function(s, e) {
	const customers: { CUST_ID: string; CUST_NAME: string }[] = [];
	for (let i = 0; i < GRD_CUST.GetRowCount(); i++) {
		if (GRD_CUST.getRowValue(i, 'CHK') == 'Y') {
			customers.push({
				CUST_ID: String(GRD_CUST.getRowValue(i, 'CUST_ID')),
				CUST_NAME: String(GRD_CUST.getRowValue(i, 'CUST_NAME'))
			});
		}
	}
	Matrix.ReportDialogResult({ customers: customers }, true, "OK");
};

// 취소
BTN_CANCEL.OnClick = function(s, e) {
	Matrix.ReportDialogResult(null, true, "Cancel");
};

// 체크박스 멀티헤더 클릭
GRD_CUST.OnGridMultiHeaderCheckBoxClicked = function(s, e) {
	const checkValue = e.Checked ? 'Y' : 'N';
	for (let i = 0; i < GRD_CUST.GetRowCount(); i++) {
		GRD_CUST.setRowValue(i, 'CHK', checkValue);
	}
	GRD_CUST.Update();
	updateCount();
};

// 셀 클릭 시 선택 건수 업데이트
GRD_CUST.OnCellClick = function(s, e) {
	if (e.Field.Name == 'CHK') {
		updateCount();
	}
};

// 선택 건수 업데이트
var updateCount = function() {
	let count = 0;
	for (let i = 0; i < GRD_CUST.GetRowCount(); i++) {
		if (GRD_CUST.getRowValue(i, 'CHK') == 'Y') {
			count++;
		}
	}
	LBL_COUNT.Text = '선택: ' + count + '건';
	LBL_COUNT.Update();
};
