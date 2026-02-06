import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Button } from "@AUD_CLIENT/control/Button";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { MultiComboBox } from "@AUD_CLIENT/control/MultiComboBox";
import { CalendarFromTo } from "@AUD_CLIENT/control/CalendarFromTo";

let Matrix: Matrix;

/* Controls */
const VS_YMD_FROM: CalendarFromTo = Matrix.getObject("VS_YMD_FROM") as CalendarFromTo;
const GRD_SALES: DataGrid = Matrix.getObject("GRD_SALES") as DataGrid;
const GRD_TOTAL: DataGrid = Matrix.getObject("GRD_TOTAL") as DataGrid;
const BTN_SEARCH: Button = Matrix.getObject("BTN_SEARCH") as Button;
const BTN_EXCEL: Button = Matrix.getObject("BTN_EXCEL") as Button;
const BTN_CUST: Button = Matrix.getObject("BTN_CUST") as Button;
const BTN_CUST_CLEAR: Button = Matrix.getObject("BTN_CUST_CLEAR") as Button;
const LBL_CUST_FILTER: Label = Matrix.getObject("LBL_CUST_FILTER") as Label;

// 선택된 고객 목록 (CUST_ID, CUST_NAME)
let selectedCustomers: { CUST_ID: string; CUST_NAME: string }[] = [];

Matrix.OnDocumentLoadComplete = function(s, e) {
	VS_YMD_FROM.InitDate = 'DATE(0,F,F);DATE(0,L,L)';
};

Matrix.OnMultiComboBoxExecuteStart = function(s, e) {
	if (['VS_PIC', 'VS_STATUS'].includes(e.Id)) {
		(Matrix.getObject(e.Id) as MultiComboBox).CheckAll();
	}
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_SALES') {
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '판매실적 목록 (' + e.RecordCount + '건)';

	} else if (e.Id == 'GRD_TOTAL') {
		if (!e.RecordCount) {
			(Matrix.getObject('LBL_TOTAL_VAL_1') as Label).Text = '';
			(Matrix.getObject('LBL_TOTAL_VAL_2') as Label).Text = '';
			(Matrix.getObject('LBL_TOTAL_VAL_3') as Label).Text = '';
			return;
		}
		(Matrix.getObject('LBL_TOTAL_VAL_1') as Label).Text = GRD_TOTAL.getRowValue(0, 'TOTAL_QTY') as string;
		(Matrix.getObject('LBL_TOTAL_VAL_2') as Label).Text = GRD_TOTAL.getRowValue(0, 'TOTAL_AMT') as string;
		(Matrix.getObject('LBL_TOTAL_VAL_3') as Label).Text = GRD_TOTAL.getRowValue(0, 'TOTAL_COST') as string;
	}
};

// 조회
BTN_SEARCH.OnClick = function(s, e) {
	applyCustomerFilter();
	Matrix.doRefresh('GRD_SALES');
};

// Excel 내보내기
BTN_EXCEL.OnClick = function(s, e) {
	GRD_SALES.ExportExcel('판매실적_조회');
};

// 고객 검색 팝업 열기
BTN_CUST.OnClick = function(s, e) {
	// 이미 선택된 고객 ID 목록을 팝업에 전달
	const params = {
		SELECTED_IDS: selectedCustomers.map(function(c) { return c.CUST_ID; }).join(',')
	};

	Matrix.ShowReportDialog(
		"REPCUSTSEARCH0001POPUP0000000001",
		params,
		{
			Width: 650,
			Height: 500,
			Center: true,
			IsModal: true,
			Title: "고객 검색",
			Resizable: true,
			Buttons: 0
		},
		function(result) {
			if (result && result.customers) {
				selectedCustomers = result.customers;
				updateCustomerLabel();
			}
		}
	);
};

// 고객 필터 초기화
BTN_CUST_CLEAR.OnClick = function(s, e) {
	selectedCustomers = [];
	updateCustomerLabel();
};

// 고객 라벨 업데이트
var updateCustomerLabel = function() {
	if (selectedCustomers.length === 0) {
		LBL_CUST_FILTER.Text = '  전체';
	} else if (selectedCustomers.length === 1) {
		LBL_CUST_FILTER.Text = '  ' + selectedCustomers[0].CUST_NAME;
	} else {
		LBL_CUST_FILTER.Text = '  ' + selectedCustomers[0].CUST_NAME + ' 외 ' + (selectedCustomers.length - 1) + '건';
	}
	LBL_CUST_FILTER.Update();
};

// 고객 필터를 전역 파라미터로 적용
var applyCustomerFilter = function() {
	if (selectedCustomers.length > 0) {
		const custIds = selectedCustomers.map(function(c) { return c.CUST_ID; }).join(',');
		Matrix.SetGlobalParams('VS_CUST_IDS', custIds);
	} else {
		Matrix.SetGlobalParams('VS_CUST_IDS', '');
	}
};
