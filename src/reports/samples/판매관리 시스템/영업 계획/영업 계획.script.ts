import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { CalendarYM } from "@AUD_CLIENT/control/CalendarYM";
import { MultiComboBox } from "@AUD_CLIENT/control/MultiComboBox";

let Matrix : Matrix;

/* Init Controls */
const GRD_PLAN: DataGrid = Matrix.getObject("GRD_PLAN") as DataGrid;

/* Button Controls */
const BTN_ADD: Button = Matrix.getObject("BTN_ADD") as Button;
const BTN_REF: Button = Matrix.getObject("BTN_REF") as Button;
const BTN_RESET: Button = Matrix.getObject("BTN_RESET") as Button;
const BTN_DEL: Button = Matrix.getObject("BTN_DEL") as Button;
const BTN_CNC: Button = Matrix.getObject("BTN_CNC") as Button;
const BTN_SAV: Button = Matrix.getObject("BTN_SAV") as Button;

/* Input Controls */
const VS_INP_ID: TextBox = Matrix.getObject("VS_INP_ID") as TextBox;
const VS_INP_YM: CalendarYM = Matrix.getObject("VS_INP_YM") as CalendarYM;
const VS_INP_PIC: ComboBox = Matrix.getObject("VS_INP_PIC") as ComboBox;
const VS_INP_PROD: ComboBox = Matrix.getObject("VS_INP_PROD") as ComboBox;
const VN_INP_QTY: NumberBox = Matrix.getObject("VN_INP_QTY") as NumberBox;
const VN_INP_AMT: NumberBox = Matrix.getObject("VN_INP_AMT") as NumberBox;
const VS_INP_STATUS: ComboBox = Matrix.getObject("VS_INP_STATUS") as ComboBox;

let popup: any = null;


Matrix.OnDocumentLoadComplete = function(s, e) {
	VS_INP_ID.IsReadOnly = true;
	GRD_PLAN.GetField('PLAN_ID').KeyType = 3; // KeyType: Primary
};

Matrix.OnMultiComboBoxExecuteStart = function(s, e) {
	if (['VS_PIC', 'VS_STATUS'].includes(e.Id)) {
		(Matrix.getObject(e.Id) as MultiComboBox).CheckAll();
	}
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_PLAN') {
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   영업 계획 목록 (' + e.RecordCount + '건)';

	} else if (e.Id == 'GRD_TOTAL') {
		if (!e.RecordCount) {
			['1', '2', '3', '4'].forEach(function(i) {
				(Matrix.getObject('LBL_TOTAL_VAL_' + i) as Label).Text = '';
			});
		}
	}
};

/******** Button Click Event ********/
// 등록
BTN_ADD.OnClick = function(s, e) {
	setInputValue(false);
	Matrix.SetGlobalParams('PLAN_ID', '');
	BTN_SAV.Text = '추가';

	popup = Matrix.ShowWindow("계획 등록", 0, 0, 460, 415, true, false, "계획 등록", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

// 검색
BTN_REF.OnClick = function(s, e) {
	Matrix.doRefresh('GRD_PLAN');
};

// 초기화
BTN_RESET.OnClick = function(s, e) {
	['VS_PIC', 'VS_STATUS'].forEach(function(i) {
		(Matrix.getObject(i) as MultiComboBox).CheckAll();
	});
};

// 삭제
BTN_DEL.OnClick = function(s, e) {
	let checkCount = 0;
	for (let i = 0; i < GRD_PLAN.GetRowCount(); i++) {
		if (GRD_PLAN.getRowValue(i, 'CHK') == 'Y') {
			GRD_PLAN.ChangeRowStateAt(i, 'D');
			checkCount++;
		}
	}

	if (!checkCount) {
		Matrix.Information('삭제할 항목을 선택하세요', '안내');
		return;
	}

	Matrix.Confirm('선택한 항목을 삭제하시겠습니까?', '안내', function(ok) {
		if (ok) {
			Matrix.RunScript('GRD_PLAN', 'GRD_DELETE', function(p) {
				if (p.Success == false) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_PLAN');
				Matrix.Information('삭제 완료되었습니다.', '안내');
			});
		} else {
			GRD_PLAN.ClearRowState(false);
		}
	}, 0);
};

// 취소
BTN_CNC.OnClick = function(s, e) {
	popup.Close();
};

// 저장
BTN_SAV.OnClick = function(s, e) {
	let fields = [VS_INP_ID.Text, VS_INP_YM.Value, VS_INP_PIC.Value, VS_INP_PROD.Value, VN_INP_QTY.Value, VS_INP_STATUS.Value];
	let controls = [VS_INP_ID, VS_INP_YM, VS_INP_PIC, VS_INP_PROD, VN_INP_QTY, VS_INP_STATUS];
	let invalid = isInvalidInput(fields, controls);
	if (invalid) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		invalid.Focus();
		return;
	}

	let scriptName = Matrix.GetGlobalParamValue('VS_PLAN_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
	Matrix.RunScript('', scriptName, function(p) {
		if (p.Success == false) {
			Matrix.Alert(p.Message);
			return;
		}
		Matrix.doRefresh('GRD_PLAN');
		Matrix.Information(BTN_SAV.Text + ' 완료되었습니다.', '안내');
		popup.Close();
	});
};
/******** Button Click Event ********/

GRD_PLAN.OnGridMultiHeaderCheckBoxClicked = function(s, e) {
	const checkValue = e.Checked ? 'Y' : 'N';
	for (let i = 0; i < GRD_PLAN.GetRowCount(); i++) {
		GRD_PLAN.setRowValue(i, 'CHK', checkValue);
	}
	GRD_PLAN.Update();
};

GRD_PLAN.OnCellDoubleClick = function(s, e) {
	setInputValue(e.Row);
	Matrix.SetGlobalParams('VS_PLAN_ID', e.Row.GetValue('PLAN_ID'));
	BTN_SAV.Text = '저장';

	popup = Matrix.ShowWindow("계획 등록", 0, 0, 460, 415, true, false, "계획 등록", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

const setInputValue = function(row) {
	if (row) {
		VS_INP_ID.Text      = row.GetValue('PLAN_ID');
		VS_INP_YM.Value     = row.GetValue('PLAN_YM');
		VS_INP_PIC.Value    = row.GetValue('EMP_ID');
		VS_INP_PROD.Value   = row.GetValue('PROD_ID');
		VN_INP_QTY.Value    = row.GetValue('TARGET_QTY');
		VN_INP_AMT.Value    = row.GetValue('TARGET_AMT');
		VS_INP_STATUS.Value = row.GetValue('PLAN_STATUS_CODE');
	} else {
		Matrix.Execute('SET_PLAN_ID', function(p) {
			if (p.Success == false) {
				Matrix.Alert(p.Message);
				return;
			}
			let dt = p.DataTable;
			VS_INP_ID.Text = dt.getRowValue(0, 'PLAN_ID');
		});
		VS_INP_YM.Value     = '';
		VS_INP_PIC.Value    = '';
		VS_INP_PROD.Value   = '';
		VN_INP_QTY.Value    = 0;
		VN_INP_AMT.Value    = 0;
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
