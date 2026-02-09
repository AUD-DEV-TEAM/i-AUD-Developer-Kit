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
const GRD_STOCK: DataGrid = Matrix.getObject("GRD_STOCK") as DataGrid;
const VS_KEYWORD: TextBox = Matrix.getObject("VS_KEYWORD") as TextBox;

/* Button Controls */
const BTN_ADD: Button = Matrix.getObject("BTN_ADD") as Button;
const BTN_REF: Button = Matrix.getObject("BTN_REF") as Button;
const BTN_DEL: Button = Matrix.getObject("BTN_DEL") as Button;
const BTN_RESET: Button = Matrix.getObject("BTN_RESET") as Button;
const BTN_CNC: Button = Matrix.getObject("BTN_CNC") as Button;
const BTN_SAV: Button = Matrix.getObject("BTN_SAV") as Button;

/* Input Controls */
const VS_INP_PRODUCT: ComboBox = Matrix.getObject("VS_INP_PRODUCT") as ComboBox;
const VS_INP_STORAGE: ComboBox = Matrix.getObject("VS_INP_STORAGE") as ComboBox;
const VN_INP_CURR: NumberBox = Matrix.getObject("VN_INP_CURR") as NumberBox;
const VN_INP_SAFE: NumberBox = Matrix.getObject("VN_INP_SAFE") as NumberBox;

let popup: any = null;


Matrix.OnDocumentLoadComplete = function(s, e) {
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 제품명으로 검색');

	GRD_STOCK.GetField('INV_ID').KeyType = 3; // KeyType: Primary
};

Matrix.OnMultiComboBoxExecuteStart = function(s, e) {
	if (['VS_CATEGORY', 'VS_WAREHOUSE'].includes(e.Id)) {
		(Matrix.getObject(e.Id) as MultiComboBox).CheckAll();
	}
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_STOCK') {
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   재고 목록 (' + e.RecordCount + '건)';

	} else if (e.Id == 'GRD_TOTAL') {
		if (!e.RecordCount) {
			['1', '2', '3', '4'].forEach(function(i) {
				(Matrix.getObject('LBL_TOTAL_VAL_' + i) as Label).Text = '';
			});
		}

		let val = (Matrix.getObject(e.Id) as DataGrid).getRowValue(0, 'UNDER_SAFETY_STOCK_COUNT_VAL') as number;
		let setColor = val < 0 ? '#ef4444' : '#1e293b';

		(Matrix.getObject('LBL_TOTAL_VAL_3') as Label).Style.Font.Color.SetColor(setColor);
		(Matrix.getObject('LBL_TOTAL_VAL_3') as Label).Update();
	}
};

/******** Button Click Event ********/
// 등록
BTN_ADD.OnClick = function(s, e) {
	setInputValue(null);
	Matrix.SetGlobalParams('INV_ID', '');
	BTN_SAV.Text = '추가';

	popup = Matrix.ShowWindow("재고 등록", 0, 0, 460, 265, true, false, "재고 등록", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

// 검색
BTN_REF.OnClick = function(s, e) {
	Matrix.doRefresh('GRD_STOCK');
};

// 삭제
BTN_DEL.OnClick = function(s, e) {
	let checkCount = 0;
	for (let i = 0; i < GRD_STOCK.GetRowCount(); i++) {
		if (GRD_STOCK.getRowValue(i, 'CHK') == 'Y') {
			GRD_STOCK.ChangeRowStateAt(i, 'D');
			checkCount++;
		}
	}

	if (!checkCount) {
		Matrix.Information('삭제할 항목을 선택하세요', '안내');
		return;
	}

	Matrix.Confirm('선택한 항목을 삭제하시겠습니까?', '안내', function(ok) {
		if (ok) {
			Matrix.RunScript('GRD_STOCK', 'GRD_DELETE', function(p) {
				if (p.Success == false) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_STOCK');
				Matrix.Information('삭제 완료되었습니다.', '안내');
			});
		} else {
			GRD_STOCK.ClearRowState(false);
		}
	}, 0);
};

// 초기화
BTN_RESET.OnClick = function(s, e) {
	['VS_CATEGORY', 'VS_WAREHOUSE'].forEach(function(i) {
		(Matrix.getObject(i) as MultiComboBox).CheckAll();
	});
	VS_KEYWORD.Text = '';
};

// 취소
BTN_CNC.OnClick = function(s, e) {
	popup.Close();
};

// 저장
BTN_SAV.OnClick = function(s, e) {
	let fields = [VS_INP_PRODUCT.Value, VS_INP_STORAGE.Value, VN_INP_CURR.Value];
	let controls = [VS_INP_PRODUCT, VS_INP_STORAGE, VN_INP_CURR];
	let invalid = isInvalidInput(fields, controls);
	if (invalid) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		invalid.Focus();
		return;
	}

	let scriptName = Matrix.GetGlobalParamValue('VS_INV_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
	Matrix.RunScript('', scriptName, function(p) {
		if (p.Success == false) {
			Matrix.Alert(p.Message);
			return;
		}
		Matrix.doRefresh('GRD_STOCK');
		Matrix.Information(BTN_SAV.Text + ' 완료되었습니다.', '안내');
		popup.Close();
	});
};
/******** Button Click Event ********/

VS_KEYWORD.OnTextKeydown = function(s, e) {
	if (e.Event.isEnter()) {
		Matrix.doRefresh('GRD_STOCK');
	}
};

GRD_STOCK.OnGridMultiHeaderCheckBoxClicked = function(s, e) {
	const checkValue = e.Checked ? 'Y' : 'N';
	for (let i = 0; i < GRD_STOCK.GetRowCount(); i++) {
		GRD_STOCK.setRowValue(i, 'CHK', checkValue);
	}
	GRD_STOCK.Update();
};

GRD_STOCK.OnCellDoubleClick = function(s, e) {
	setInputValue(e.Row);
	Matrix.SetGlobalParams('VS_INV_ID', e.Row.GetValue('INV_ID'));
	BTN_SAV.Text = '저장';

	popup = Matrix.ShowWindow("재고 등록", 0, 0, 460, 265, true, false, "재고 등록", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

const setInputValue = function(row) {
	if (row) {
		VS_INP_PRODUCT.IsReadOnly = true;
		VS_INP_PRODUCT.Text  = row.GetValue('PROD_NAME');
		VS_INP_STORAGE.Value = row.GetValue('STORAGE');
		VN_INP_CURR.Value    = row.GetValue('CURR_QTY');
		VN_INP_SAFE.Value    = row.GetValue('SAFE_QTY');
	} else {
		VS_INP_PRODUCT.IsReadOnly = false;
		VS_INP_PRODUCT.Value = '';
		VS_INP_STORAGE.Value = '';
		VN_INP_CURR.Value    = 0;
		VN_INP_SAFE.Value    = 0;
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
