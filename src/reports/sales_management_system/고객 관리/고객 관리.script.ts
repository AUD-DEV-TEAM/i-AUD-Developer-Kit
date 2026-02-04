import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";

let Matrix : Matrix;

/* Init Controls */
const GRP_BODY: Group = Matrix.getObject("GRP_BODY") as Group;
const GRD_CUSTOMER: DataGrid = Matrix.getObject("GRD_CUSTOMER") as DataGrid;
const VS_KEYWORD: TextBox = Matrix.getObject("VS_KEYWORD") as TextBox;

/* Button Controls */
const BTN_REF: Button = Matrix.getObject('BTN_REF') as Button;
const BTN_DEL: Button = Matrix.getObject('BTN_DEL') as Button;
const BTN_RESET: Button = Matrix.getObject('BTN_RESET') as Button;
const BTN_SAV: Button = Matrix.getObject('BTN_SAV') as Button;
const BTN_ADD: Button = Matrix.getObject('BTN_ADD') as Button;

/* Input Controls */
const VS_INP_NAME: TextBox = Matrix.getObject("VS_INP_NAME") as TextBox;
const VS_INP_TYPE: ComboBox = Matrix.getObject("VS_INP_TYPE") as ComboBox;
const VS_INP_GRADE: ComboBox = Matrix.getObject("VS_INP_GRADE") as ComboBox;
const VS_INP_REG_NO: TextBox = Matrix.getObject("VS_INP_REG_NO") as TextBox;
const VS_INP_MAIN: TextBox = Matrix.getObject("VS_INP_MAIN") as TextBox;
const VS_INP_PHONE: TextBox = Matrix.getObject("VS_INP_PHONE") as TextBox;
const VS_INP_EMAIL: TextBox = Matrix.getObject("VS_INP_EMAIL") as TextBox;
const VN_INP_LIMIT: NumberBox = Matrix.getObject("VN_INP_LIMIT") as NumberBox;


Matrix.OnDocumentLoadComplete = function(s, e) {
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 고객명, 사업자번호로 검색');
};

Matrix.OnLoadComplete = function(s, e) {
	if (e.Message) {
		setInputValue(null);
	}
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_CUSTOMER') {
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   고객 목록 (' + e.RecordCount + '개사)';
	}
};

/******** Button Click Event ********/
// 검색
BTN_REF.OnClick = function(s, e) {
	Matrix.doRefresh('GRD_CUSTOMER');
};

// 삭제
BTN_DEL.OnClick = function(s, e) {
	let checkCount = 0;
	for (let i = 0; i < GRD_CUSTOMER.GetRowCount(); i++) {
		if (GRD_CUSTOMER.getRowValue(i, 'CHK') == 'Y') {
			GRD_CUSTOMER.ChangeRowStateAt(i, 'D');
			checkCount++;
		}
	}

	if (!checkCount) {
		Matrix.Information('삭제할 항목을 선택하세요', '안내');
		return;
	}

	Matrix.Confirm('선택한 항목을 삭제하시겠습니까?', '안내', function(ok) {
		if (ok) {
			Matrix.RunScript('GRD_CUSTOMER', 'GRD_DELETE', function(p) {
				if (p.Success == false) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_CUSTOMER');
				Matrix.Information('삭제 완료되었습니다.', '안내');
			});
		} else {
			GRD_CUSTOMER.ClearRowState(false);
		}
	}, 0);
};

// 초기화
BTN_RESET.OnClick = function(s, e) {
	Matrix.SetGlobalParams('VS_CUST_ID', '');
	setInputValue(null);
};

// 저장
BTN_SAV.OnClick = function(s, e) {
	if (!Matrix.GetGlobalParamValue('VS_CUST_ID')) {
		Matrix.Information('고객 선택 후 다시 시도하세요', '안내');
		return;
	}

	const savFields = [VS_INP_NAME.Text, VS_INP_TYPE.Value, VS_INP_GRADE.Value];
	if (isInvalidInput(savFields)) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		return;
	}

	Matrix.RunScript('', 'GRD_UPDATE', function(p) {
		if (p.Success == false) {
			Matrix.Alert(p.Message);
			return;
		}
		Matrix.doRefresh('GRD_CUSTOMER');
		Matrix.Information('수정 완료되었습니다.', '안내');
	});
};

// 추가
BTN_ADD.OnClick = function(s, e) {
	if (Matrix.GetGlobalParamValue('VS_CUST_ID')) {
		Matrix.Information('고객이 선택되어 있습니다.\n초기화 버튼 클릭 후 다시 시도하세요', '안내');
		return;
	}

	const addFields = [VS_INP_NAME.Text, VS_INP_TYPE.Value, VS_INP_GRADE.Value];
	if (isInvalidInput(addFields)) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		return;
	}

	Matrix.RunScript('', 'GRD_INSERT', function(p) {
		if (p.Success == false) {
			Matrix.Alert(p.Message);
			return;
		}
		Matrix.doRefresh('GRD_CUSTOMER');
		Matrix.Information('추가 완료되었습니다.', '안내');
	});
};
/******** Button Click Event ********/

VS_KEYWORD.OnTextKeydown = function(s, e) {
	if (e.Event.isEnter()) {
		Matrix.doRefresh('GRD_CUSTOMER');
	}
};

GRD_CUSTOMER.OnGridMultiHeaderCheckBoxClicked = function(s, e) {
	const checkValue = e.Checked ? 'Y' : 'N';
	for (let i = 0; i < GRD_CUSTOMER.GetRowCount(); i++) {
		GRD_CUSTOMER.setRowValue(i, 'CHK', checkValue);
	}
	GRD_CUSTOMER.Update();
};

Matrix.OnViewerSizeChanged = function(s, e) {
	GRP_BODY.Width = e.Width - 520;
};

GRD_CUSTOMER.OnCellDoubleClick = function(s, e) {
	Matrix.SetGlobalParams('VS_CUST_ID', e.Row.GetValue('CUST_ID'));
	setInputValue(e.Row);
};

var setInputValue = function(row) {
	if (typeof row === 'object' && row !== null) {
		VS_INP_NAME.Text = row.GetValue('CUST_NAME');
		VS_INP_TYPE.Value = row.GetValue('TYPE_CODE');
		VS_INP_GRADE.Value = row.GetValue('GRADE_CODE');
		VN_INP_LIMIT.Value = row.GetValue('CREDIT_LIMIT');
		VS_INP_REG_NO.Text = row.GetValue('REG_NO');
		VS_INP_PHONE.Text = row.GetValue('PHONE');
		VS_INP_EMAIL.Text = row.GetValue('EMAIL');
		VS_INP_MAIN.Text = row.GetValue('MAIN');
	} else {
		VS_INP_NAME.Text = '';
		VS_INP_TYPE.Value = '';
		VS_INP_GRADE.Value = '';
		VN_INP_LIMIT.Value = 0;
		VS_INP_REG_NO.Text = '';
		VS_INP_PHONE.Text = '';
		VS_INP_EMAIL.Text = '';
		VS_INP_MAIN.Text = '';
	}
};

var isInvalidInput = function(fields) {
	return fields.some(function(v) {
		return v === null || v === undefined || v === '';
	});
};