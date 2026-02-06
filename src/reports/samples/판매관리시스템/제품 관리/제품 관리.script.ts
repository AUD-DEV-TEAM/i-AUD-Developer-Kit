import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { MultiComboBox } from "@AUD_CLIENT/control/MultiComboBox";

let Matrix : Matrix;

/* Init Controls */
const GRD_PRODUCT: DataGrid = Matrix.getObject("GRD_PRODUCT") as DataGrid;
const VS_KEYWORD: TextBox = Matrix.getObject("VS_KEYWORD") as TextBox;
const VS_CAT: MultiComboBox = Matrix.getObject("VS_CAT") as MultiComboBox;

/* Button Controls */
const BTN_ADD: Button = Matrix.getObject("BTN_ADD") as Button;
const BTN_REF: Button = Matrix.getObject("BTN_REF") as Button;
const BTN_RESET: Button = Matrix.getObject("BTN_RESET") as Button;
const BTN_DEL: Button = Matrix.getObject("BTN_DEL") as Button;
const BTN_CNC: Button = Matrix.getObject("BTN_CNC") as Button;
const BTN_SAV: Button = Matrix.getObject("BTN_SAV") as Button;

/* Input Controls */
const VS_INP_PROD: TextBox = Matrix.getObject("VS_INP_PROD") as TextBox;
const VS_INP_CAT: ComboBox = Matrix.getObject("VS_INP_CAT") as ComboBox;
const VS_INP_PRICE: NumberBox = Matrix.getObject("VS_INP_PRICE") as NumberBox;
const VS_INP_COST: NumberBox = Matrix.getObject("VS_INP_COST") as NumberBox;
const VS_INP_UNIT: ComboBox = Matrix.getObject("VS_INP_UNIT") as ComboBox;

let popup: any = null;


Matrix.OnDocumentLoadComplete = function(s, e) {
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 제품명, 제품코드으로 검색');

	GRD_PRODUCT.GetField('PROD_ID').KeyType = 3; // KeyType: Primary
};

Matrix.OnMultiComboBoxExecuteStart = function(s, e) {
	if (e.Id == 'VS_CAT') {
		VS_CAT.CheckAll();
	}
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_PRODUCT') {
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   제품 목록 (' + e.RecordCount + '종)';
	}
};

/******** Button Click Event ********/
// 등록
BTN_ADD.OnClick = function(s, e) {
	setInputValue(null);
	Matrix.SetGlobalParams('PROD_ID', '');
	BTN_SAV.Text = '추가';

	popup = Matrix.ShowWindow("제품 등록", 0, 0, 460, 345, true, false, "제품 등록", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

// 검색
BTN_REF.OnClick = function(s, e) {
	Matrix.doRefresh('GRD_PRODUCT');
};

// 초기화
BTN_RESET.OnClick = function(s, e) {
	(Matrix.getObject('VS_CAT') as MultiComboBox).CheckAll();
	VS_KEYWORD.Text = '';
};

// 삭제
BTN_DEL.OnClick = function(s, e) {
	let checkCount = 0;
	for (let i = 0; i < GRD_PRODUCT.GetRowCount(); i++) {
		if (GRD_PRODUCT.getRowValue(i, 'CHK') == 'Y') {
			GRD_PRODUCT.ChangeRowStateAt(i, 'D');
			checkCount++;
		}
	}

	if (!checkCount) {
		Matrix.Information('삭제할 항목을 선택하세요', '안내');
		return;
	}

	Matrix.Confirm('선택한 항목을 삭제하시겠습니까?', '안내', function(ok) {
		if (ok) {
			Matrix.RunScript('GRD_PRODUCT', 'GRD_DELETE', function(p) {
				if (p.Success == false) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_PRODUCT');
				Matrix.Information('삭제 완료되었습니다.', '안내');
			});
		} else {
			GRD_PRODUCT.ClearRowState(false);
		}
	}, 0);
};

// 취소
BTN_CNC.OnClick = function(s, e) {
	popup.Close();
};

// 저장
BTN_SAV.OnClick = function(s, e) {
	let fields = [VS_INP_PROD.Text, VS_INP_CAT.Value, VS_INP_PRICE.Value, VS_INP_COST.Value, VS_INP_UNIT.Value];
	let controls = [VS_INP_PROD, VS_INP_CAT, VS_INP_PRICE, VS_INP_COST, VS_INP_UNIT];
	let invalid = isInvalidInput(fields, controls);
	if (invalid) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		invalid.Focus();
		return;
	}

	let scriptName = Matrix.GetGlobalParamValue('VS_PROD_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
	Matrix.RunScript('', scriptName, function(p) {
		if (p.Success == false) {
			Matrix.Alert(p.Message);
			return;
		}
		Matrix.doRefresh('GRD_PRODUCT');
		Matrix.Information(BTN_SAV.Text + ' 완료되었습니다.', '안내');
		popup.Close();
	});
};
/******** Button Click Event ********/

VS_KEYWORD.OnTextKeydown = function(s, e) {
	if (e.Event.isEnter()) {
		Matrix.doRefresh('GRD_PRODUCT');
	}
};

GRD_PRODUCT.OnGridMultiHeaderCheckBoxClicked = function(s, e) {
	const checkValue = e.Checked ? 'Y' : 'N';
	for (let i = 0; i < GRD_PRODUCT.GetRowCount(); i++) {
		GRD_PRODUCT.setRowValue(i, 'CHK', checkValue);
	}
	GRD_PRODUCT.Update();
};

GRD_PRODUCT.OnCellDoubleClick = function(s, e) {
	setInputValue(e.Row);
	Matrix.SetGlobalParams('VS_PROD_ID', e.Row.GetValue('PROD_ID'));
	BTN_SAV.Text = '저장';

	popup = Matrix.ShowWindow("제품 등록", 0, 0, 460, 345, true, false, "제품 등록", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

var setInputValue = function(row) {
	if (row) {
		VS_INP_PROD.Text   = row.GetValue('PROD_NAME');
		VS_INP_CAT.Value   = row.GetValue('CATEGORY_CODE');
		VS_INP_PRICE.Text  = row.GetValue('STD_PRICE');
		VS_INP_COST.Text   = row.GetValue('COST_PRICE');
		VS_INP_UNIT.Value  = row.GetValue('STD_UNIT');
	} else {
		VS_INP_PROD.Text   = '';
		VS_INP_CAT.Value   = '';
		VS_INP_PRICE.Text  = '';
		VS_INP_COST.Text   = '';
		VS_INP_UNIT.Value  = '';
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
