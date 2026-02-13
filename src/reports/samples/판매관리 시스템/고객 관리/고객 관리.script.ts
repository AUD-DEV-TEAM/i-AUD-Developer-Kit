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
const LBL_TTL_3: TextBox = Matrix.getObject("LBL_TTL_3") as TextBox;

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
		initInputValue();
	}
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_CUSTOMER') {
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   고객 목록 (' + e.RecordCount + '개사)';
	
	}else if(e.Id == 'VS_INP_TYPE'){
		VS_INP_TYPE.Value = '';
		
	}else if(e.Id == 'VS_INP_GRADE'){
		VS_INP_GRADE.Value = '';
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
	initInputValue();
};

// 저장
BTN_SAV.OnClick = function(s, e) {
	const savFields = [VS_INP_NAME.Text, VS_INP_TYPE.Value, VS_INP_GRADE.Value];
	const savControls = [VS_INP_NAME, VS_INP_TYPE, VS_INP_GRADE];
	const savInvalid = isInvalidInput(savFields, savControls);
	if (savInvalid) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		savInvalid.Focus();
		return;
	}

	if(LBL_TTL_3.Text.includes('등록')){
		Matrix.RunScript('', 'GRD_INSERT', function(p) {
			if (p.Success == false) {
				Matrix.Alert(p.Message);
				return;
			}
			Matrix.doRefresh('GRD_CUSTOMER');
			Matrix.Information('추가 완료되었습니다.', '안내');
		});

	}else if(LBL_TTL_3.Text.includes('수정')){
		Matrix.RunScript('', 'GRD_UPDATE', function(p) {
			if (p.Success == false) {
				Matrix.Alert(p.Message);
				return;
			}
			Matrix.doRefresh('GRD_CUSTOMER');
			Matrix.Information('수정 완료되었습니다.', '안내');
		});
	}
};

// 추가
BTN_ADD.OnClick = function(s, e) {
	Matrix.SetGlobalParams('VS_CUST_ID', '');
	initInputValue();

	LBL_TTL_3.Text = '   고객 신규 등록';
};
/******** Button Click Event ********/

VS_KEYWORD.OnTextKeydown = function(s, e) {
	if (e.Event.isEnter()) {
		Matrix.doRefresh('GRD_CUSTOMER');
	}
};

GRD_CUSTOMER.OnDataBindEnd = function(s, e) {
	Matrix.SetGlobalParams('VS_CUST_ID', '');
	initInputValue();

	LBL_TTL_3.Text = '   고객 신규 등록';
}

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

GRD_CUSTOMER.OnCellClick = function(s, e) {
	Matrix.SetGlobalParams('VS_CUST_ID', e.Row.GetValue('CUST_ID'));
	LBL_TTL_3.Text = '   고객 정보 수정';
};


const initInputValue = function() {
	VS_INP_NAME.Text = '';
	VS_INP_TYPE.Value = '';
	VS_INP_GRADE.Value = '';
	VN_INP_LIMIT.Value = 0;
	VS_INP_REG_NO.Text = '';
	VS_INP_PHONE.Text = '';
	VS_INP_EMAIL.Text = '';
	VS_INP_MAIN.Text = '';
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
