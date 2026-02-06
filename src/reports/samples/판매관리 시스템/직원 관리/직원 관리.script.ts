import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { MultiComboBox } from "@AUD_CLIENT/control/MultiComboBox";
import { Calendar } from "@AUD_CLIENT/control/Calendar";

let Matrix : Matrix;

/* Init Controls */
const GRD_EMPLOYEE: DataGrid = Matrix.getObject("GRD_EMPLOYEE") as DataGrid;
const VS_KEYWORD: TextBox = Matrix.getObject("VS_KEYWORD") as TextBox;

/* Button Controls */
const BTN_ADD: Button = Matrix.getObject("BTN_ADD") as Button;
const BTN_REF: Button = Matrix.getObject("BTN_REF") as Button;
const BTN_RESET: Button = Matrix.getObject("BTN_RESET") as Button;
const BTN_DEL: Button = Matrix.getObject("BTN_DEL") as Button;
const BTN_CNC: Button = Matrix.getObject("BTN_CNC") as Button;
const BTN_SAV: Button = Matrix.getObject("BTN_SAV") as Button;

/* Input Controls */
const VS_INP_NAME: TextBox = Matrix.getObject("VS_INP_NAME") as TextBox;
const VS_INP_DEPT: ComboBox = Matrix.getObject("VS_INP_DEPT") as ComboBox;
const VS_INP_POSITION: ComboBox = Matrix.getObject("VS_INP_POSITION") as ComboBox;
const VS_INP_STATUS: ComboBox = Matrix.getObject("VS_INP_STATUS") as ComboBox;
const VS_INP_EMAIL: TextBox = Matrix.getObject("VS_INP_EMAIL") as TextBox;
const VS_INP_PHONE: TextBox = Matrix.getObject("VS_INP_PHONE") as TextBox;
const VS_INP_HIRE: Calendar = Matrix.getObject("VS_INP_HIRE") as Calendar;

let popup: any = null;


Matrix.OnDocumentLoadComplete = function(s, e) {
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 이름, 사번으로 검색');
	GRD_EMPLOYEE.GetField('EMP_ID').KeyType = 3; // KeyType: Primary
};

Matrix.OnMultiComboBoxExecuteStart = function(s, e) {
	if (['VS_DEPT', 'VS_POSITION', 'VS_STATUS'].includes(e.Id)) {
		(Matrix.getObject(e.Id) as MultiComboBox).CheckAll();
	}
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_EMPLOYEE') {
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   직원 목록 (' + e.RecordCount + '명)';
	}
};

/******** Button Click Event ********/
// 등록
BTN_ADD.OnClick = function(s, e) {
	setInputValue(null);
	Matrix.SetGlobalParams('VS_EMP_ID', '');
	BTN_SAV.Text = '추가';
	popup = Matrix.ShowWindow("직원 등록", 0, 0, 460, 415, true, false, "직원 등록", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

// 검색
BTN_REF.OnClick = function(s, e) {
	Matrix.doRefresh('GRD_EMPLOYEE');
};

// 초기화
BTN_RESET.OnClick = function(s, e) {
	['VS_DEPT', 'VS_POSITION', 'VS_STATUS'].forEach(function(i) {
		(Matrix.getObject(i) as MultiComboBox).CheckAll();
	});
	VS_KEYWORD.Text = '';
};

// 삭제
BTN_DEL.OnClick = function(s, e) {
	let checkCount = 0;
	for (let i = 0; i < GRD_EMPLOYEE.GetRowCount(); i++) {
		if (GRD_EMPLOYEE.getRowValue(i, 'CHK') == 'Y') {
			GRD_EMPLOYEE.ChangeRowStateAt(i, 'D');
			checkCount++;
		}
	}

	if (!checkCount) {
		Matrix.Information('삭제할 항목을 선택하세요', '안내');
		return;
	}

	Matrix.Confirm('선택한 항목을 삭제하시겠습니까?', '안내', function(ok) {
		if (ok) {
			Matrix.RunScript('GRD_EMPLOYEE', 'GRD_DELETE', function(p) {
				if (p.Success == false) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_EMPLOYEE');
				Matrix.Information('삭제 완료되었습니다.', '안내');
			});
		} else {
			GRD_EMPLOYEE.ClearRowState(false);
		}
	}, 0);
};

// 취소
BTN_CNC.OnClick = function(s, e) {
	popup.Close();
};

// 저장
BTN_SAV.OnClick = function(s, e) {
	const fields = [VS_INP_NAME.Text, VS_INP_DEPT.Value, VS_INP_POSITION.Value, VS_INP_STATUS.Value, VS_INP_HIRE.Value];

	const controls = [VS_INP_NAME, VS_INP_DEPT, VS_INP_POSITION, VS_INP_STATUS, VS_INP_HIRE];
	const invalid = isInvalidInput(fields, controls);
	if (invalid) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		invalid.Focus();
		return;
	}

	const scriptName = Matrix.GetGlobalParamValue('VS_EMP_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
	Matrix.RunScript('', scriptName, function(p) {
		if (p.Success == false) {
			Matrix.Alert(p.Message);
			return;
		}
		Matrix.doRefresh('GRD_EMPLOYEE');
		Matrix.Information(BTN_SAV.Text + ' 완료되었습니다.', '안내');
		popup.Close();
	});
};
/******** Button Click Event ********/

VS_KEYWORD.OnTextKeydown = function(s, e) {
	if (e.Event.isEnter()) {
		Matrix.doRefresh('GRD_EMPLOYEE');
	}
};

GRD_EMPLOYEE.OnGridMultiHeaderCheckBoxClicked = function(s, e) {
	const checkValue = e.Checked ? 'Y' : 'N';
	for (let i = 0; i < GRD_EMPLOYEE.GetRowCount(); i++) {
		GRD_EMPLOYEE.setRowValue(i, 'CHK', checkValue);
	}
	GRD_EMPLOYEE.Update();
};

GRD_EMPLOYEE.OnCellDoubleClick = function(s, e) {
	setInputValue(e.Row);
	Matrix.SetGlobalParams('VS_EMP_ID', e.Row.GetValue('EMP_ID'));
	BTN_SAV.Text = '저장';
	popup = Matrix.ShowWindow("직원 등록", 0, 0, 460, 415, true, false, "직원 수정", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

var setInputValue = function(row) {
	if (row) {
		VS_INP_NAME.Text     = row.GetValue('EMP_NAME');
		VS_INP_DEPT.Value    = row.GetValue('DEPT_CODE');
		VS_INP_POSITION.Value = row.GetValue('POSITION_CODE');
		VS_INP_STATUS.Value  = row.GetValue('EMP_STATUS_CODE');
		VS_INP_EMAIL.Text    = row.GetValue('EMAIL');
		VS_INP_PHONE.Text    = row.GetValue('PHONE');
		VS_INP_HIRE.Value    = row.GetValue('HIRE_DATE');
	} else {
		VS_INP_NAME.Text     = '';
		VS_INP_DEPT.Value    = '';
		VS_INP_POSITION.Value = '';
		VS_INP_STATUS.Value  = '';
		VS_INP_EMAIL.Text    = '';
		VS_INP_PHONE.Text    = '';
		VS_INP_HIRE.Value    = '';
	}
};

var isInvalidInput = function(fields, controls?): any {
	var idx = fields.findIndex(function(v) {
		return v === null || v === undefined || v === '';
	});
	if (idx !== -1 && controls && controls[idx]) {
		return controls[idx];
	}
	return idx !== -1 ? true : null;
};
