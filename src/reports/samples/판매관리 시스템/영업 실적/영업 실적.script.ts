import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { MultiComboBox } from "@AUD_CLIENT/control/MultiComboBox";
import { Calendar } from "@AUD_CLIENT/control/Calendar";
import { CalendarFromTo } from "@AUD_CLIENT/control/CalendarFromTo";

let Matrix : Matrix;

/* Init Controls */
const VS_YMD_FROM: CalendarFromTo = Matrix.getObject("VS_YMD_FROM") as CalendarFromTo;
const GRD_PERF: DataGrid = Matrix.getObject("GRD_PERF") as DataGrid;

/* Button Controls */
const BTN_ADD: Button = Matrix.getObject("BTN_ADD") as Button;
const BTN_REF: Button = Matrix.getObject("BTN_REF") as Button;
const BTN_RESET: Button = Matrix.getObject("BTN_RESET") as Button;
const BTN_DEL: Button = Matrix.getObject("BTN_DEL") as Button;
const BTN_CNC: Button = Matrix.getObject("BTN_CNC") as Button;
const BTN_SAV: Button = Matrix.getObject("BTN_SAV") as Button;

/* Input Controls */
const VS_INP_ID: TextBox = Matrix.getObject("VS_INP_ID") as TextBox;
const VS_INP_YMD: Calendar = Matrix.getObject("VS_INP_YMD") as Calendar;
const VS_INP_PIC: ComboBox = Matrix.getObject("VS_INP_PIC") as ComboBox;
const VS_INP_CUST: ComboBox = Matrix.getObject("VS_INP_CUST") as ComboBox;
const VS_INP_PROD: ComboBox = Matrix.getObject("VS_INP_PROD") as ComboBox;
const VN_INP_QTY: NumberBox = Matrix.getObject("VN_INP_QTY") as NumberBox;
const VN_INP_PRICE: NumberBox = Matrix.getObject("VN_INP_PRICE") as NumberBox;
const VN_INP_COST: NumberBox = Matrix.getObject("VN_INP_COST") as NumberBox;
const VS_INP_STATUS: ComboBox = Matrix.getObject("VS_INP_STATUS") as ComboBox;

let popup: any = null;


Matrix.OnDocumentLoadComplete = function(s, e) {
	if (Matrix.GetDialogRequestParams()) {
		const getYear = Number(Matrix.GetDialogRequestParams());
		VS_YMD_FROM.InitDate = getYear + '0101;' + getYear + '1231';

		BTN_ADD.Visible = false;
		BTN_DEL.Visible = false;
		GRD_PERF.GetField('CHK').Visible = false;

	} else {
		VS_YMD_FROM.InitDate = 'DATE(0,F,F);DATE(0,L,L)';
	}

	VS_INP_ID.IsReadOnly = true;
	GRD_PERF.GetField('SALES_ID').KeyType = 3; // KeyType: Primary
};

Matrix.OnMultiComboBoxExecuteStart = function(s, e) {
	if (['VS_PIC', 'VS_CUST', 'VS_STATUS'].includes(e.Id)) {
		(Matrix.getObject(e.Id) as MultiComboBox).CheckAll();
	}
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_PERF') {
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   영업 실적 목록 (' + e.RecordCount + '건)';

	} else if (e.Id == 'GRD_TOTAL') {
		if (!e.RecordCount) {
			['1', '2', '3', '4'].forEach(function(i) {
				(Matrix.getObject('LBL_TOTAL_VAL_' + i) as Label).Text = '';
			});
		}

		const val = (Matrix.getObject(e.Id) as DataGrid).getRowValue(0, 'TOTAL_COMP_PERF_VAL') as number;
		let setColor: string;

		if (val < 0) setColor = '#ef4444';      // 빨강
		else if (val > 0) setColor = '#10b981';  // 초록
		else setColor = '#1e293b';               // 검정

		(Matrix.getObject('LBL_TOTAL_VAL_2') as Label).Style.Font.Color.SetColor(setColor);
		(Matrix.getObject('LBL_TOTAL_VAL_2') as Label).Update();
	}
};

/******** Button Click Event ********/
// 등록
BTN_ADD.OnClick = function(s, e) {
	setInputValue(null);
	Matrix.SetGlobalParams('SALES_ID', '');
	BTN_SAV.Text = '추가';

	popup = Matrix.ShowWindow("실적 등록", 0, 0, 460, 500, true, false, "실적 등록", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

// 검색
BTN_REF.OnClick = function(s, e) {
	Matrix.doRefresh('GRD_PERF');
};

// 초기화
BTN_RESET.OnClick = function(s, e) {
	['VS_PIC', 'VS_CUST', 'VS_STATUS'].forEach(function(i) {
		(Matrix.getObject(i) as MultiComboBox).CheckAll();
	});
};

// 삭제
BTN_DEL.OnClick = function(s, e) {
	let checkCount = 0;
	for (let i = 0; i < GRD_PERF.GetRowCount(); i++) {
		if (GRD_PERF.getRowValue(i, 'CHK') == 'Y') {
			GRD_PERF.ChangeRowStateAt(i, 'D');
			checkCount++;
		}
	}

	if (!checkCount) {
		Matrix.Information('삭제할 항목을 선택하세요', '안내');
		return;
	}

	Matrix.Confirm('선택한 항목을 삭제하시겠습니까?', '안내', function(ok) {
		if (ok) {
			Matrix.RunScript('GRD_PERF', 'GRD_DELETE', function(p) {
				if (p.Success == false) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_PERF');
				Matrix.Information('삭제 완료되었습니다.', '안내');
			});
		} else {
			GRD_PERF.ClearRowState(false);
		}
	}, 0);
};

// 취소
BTN_CNC.OnClick = function(s, e) {
	popup.Close();
};

// 저장
BTN_SAV.OnClick = function(s, e) {
	const fields = [VS_INP_ID.Text, VS_INP_YMD.Value, VS_INP_PIC.Value, VS_INP_CUST.Value, VS_INP_PROD.Value,
		VN_INP_QTY.Value, VN_INP_PRICE.Value, VN_INP_COST.Value, VS_INP_STATUS.Value];

	let controls = [VS_INP_ID, VS_INP_YMD, VS_INP_PIC, VS_INP_CUST, VS_INP_PROD, VN_INP_QTY, VN_INP_PRICE, VN_INP_COST, VS_INP_STATUS];
	let invalid = isInvalidInput(fields, controls);
	if (invalid) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		invalid.Focus();
		return;
	}

	const scriptName = Matrix.GetGlobalParamValue('VS_SALES_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
	Matrix.RunScript('', scriptName, function(p) {
		if (p.Success == false) {
			Matrix.Alert(p.Message);
			return;
		}
		Matrix.doRefresh('GRD_PERF');
		Matrix.Information(BTN_SAV.Text + ' 완료되었습니다.', '안내');
		popup.Close();
	});
};
/******** Button Click Event ********/

GRD_PERF.OnGridMultiHeaderCheckBoxClicked = function(s, e) {
	const checkValue = e.Checked ? 'Y' : 'N';
	for (let i = 0; i < GRD_PERF.GetRowCount(); i++) {
		GRD_PERF.setRowValue(i, 'CHK', checkValue);
	}
	GRD_PERF.Update();
};

GRD_PERF.OnCellClick = function(s, e) {
	if(e.Field.Name == 'CHK') return;
	
	setInputValue(e.Row);
	Matrix.SetGlobalParams('VS_SALES_ID', e.Row.GetValue('SALES_ID'));
	BTN_SAV.Text = '저장';

	popup = Matrix.ShowWindow("실적 등록", 0, 0, 460, 500, true, false, "실적 등록", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

const setInputValue = function(row) {
	if (row) {
		VS_INP_ID.Text      = row.GetValue('SALES_ID');
		VS_INP_YMD.Value    = row.GetValue('SALES_DATE');
		VS_INP_PIC.Value    = row.GetValue('EMP_ID');
		VS_INP_CUST.Value   = row.GetValue('CUST_ID');
		VS_INP_PROD.Value   = row.GetValue('PROD_ID');
		VN_INP_QTY.Value    = row.GetValue('QTY');
		VN_INP_PRICE.Value  = row.GetValue('UNIT_PRICE');
		VN_INP_COST.Value   = row.GetValue('COST_AMOUNT');
		VS_INP_STATUS.Value = row.GetValue('STATUS_CODE');
	} else {
		Matrix.Execute('SET_SALES_ID', function(p) {
			if (p.Success == false) {
				Matrix.Alert(p.Message);
				return;
			}
			const dt = p.DataTable;
			VS_INP_ID.Text = dt.getRowValue(0, 'SALES_ID');
		});
		VS_INP_ID.Text      = '';
		VS_INP_YMD.Value    = '';
		VS_INP_PIC.Value    = '';
		VS_INP_CUST.Value   = '';
		VS_INP_PROD.Value   = '';
		VN_INP_QTY.Value    = 0;
		VN_INP_PRICE.Value  = 0;
		VN_INP_COST.Value   = 0;
		VS_INP_STATUS.Value = '';
	}
};

const isInvalidInput = function(fields, controls?): any {
	const idx = fields.findIndex(function(v) {
		return v === null || v === undefined || v === '';
	});
	if (idx !== -1 && controls && controls[idx]) {
		return controls[idx];
	}
	return idx !== -1 ? true : null;
};
