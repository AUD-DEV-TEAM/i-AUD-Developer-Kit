import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix : Matrix;

/* Init Controls */
const GRD_MASTER: DataGrid = Matrix.getObject("GRD_MASTER") as DataGrid;
const GRD_DETAIL: DataGrid = Matrix.getObject("GRD_DETAIL") as DataGrid;
const LBL_TTL_3: Label = Matrix.getObject("LBL_TTL_3") as Label;
const LBL_INIT: Label = Matrix.getObject("LBL_INIT") as Label;
const LBL_MST_CNT: Label = Matrix.getObject("LBL_MST_CNT") as Label;
const LBL_DTL_CNT: Label = Matrix.getObject("LBL_DTL_CNT") as Label;

/* Button Controls */
const BTN_MST_ADD: Button = Matrix.getObject("BTN_MST_ADD") as Button;
const BTN_DTL_ADD: Button = Matrix.getObject("BTN_DTL_ADD") as Button;
const BTN_MST_DEL: Button = Matrix.getObject("BTN_MST_DEL") as Button;
const BTN_DTL_DEL: Button = Matrix.getObject("BTN_DTL_DEL") as Button;
const BTN_GRP_CNC: Button = Matrix.getObject("BTN_GRP_CNC") as Button;
const BTN_GRP_SAV: Button = Matrix.getObject("BTN_GRP_SAV") as Button;
const BTN_CD_CNC: Button = Matrix.getObject("BTN_CD_CNC") as Button;
const BTN_CD_SAV: Button = Matrix.getObject("BTN_CD_SAV") as Button;

/* Input Controls - 그룹 추가 Form */
const VS_INP_GROUP_CODE: TextBox = Matrix.getObject("VS_INP_GROUP_CODE") as TextBox;
const VS_INP_GROUP_NAME: TextBox = Matrix.getObject("VS_INP_GROUP_NAME") as TextBox;
const VS_INP_CODE_DESC: RichTextBox = Matrix.getObject("VS_INP_CODE_DESC") as RichTextBox;

/* Input Controls - 코드 추가 Form */
const VS_GROUP_CODE: TextBox = Matrix.getObject("VS_GROUP_CODE") as TextBox;
const VS_INP_CODE: TextBox = Matrix.getObject("VS_INP_CODE") as TextBox;
const VS_CODE_NAME: TextBox = Matrix.getObject("VS_CODE_NAME") as TextBox;
const VN_SORT: NumberBox = Matrix.getObject("VN_SORT") as NumberBox;
const VS_USE_YN: ComboBox = Matrix.getObject("VS_USE_YN") as ComboBox;

let popup: any = null;


Matrix.OnDocumentLoadComplete = function(s, e) {
	/* Primary 세팅 */
	GRD_MASTER.GetField('GROUP_CD').KeyType = 3;
	GRD_DETAIL.GetField('CODE').KeyType = 3;

	/* 초기 세팅 */
	setInit();

	/* Placeholder 설정 */
	VS_INP_GROUP_CODE.UsePlaceholder = true;
	VS_INP_GROUP_NAME.UsePlaceholder = true;
	VS_INP_CODE_DESC.UsePlaceholder = true;
	VS_INP_CODE.UsePlaceholder = true;
	VS_CODE_NAME.UsePlaceholder = true;

	VS_INP_GROUP_CODE.SetPlaceholder(' 예: NEW_CODE_TYPE');
	VS_INP_GROUP_NAME.SetPlaceholder(' 예: 새로운 코드 유형');
	VS_INP_CODE_DESC.SetPlaceholder(' 그룹에 대한 설명');
	VS_INP_CODE.SetPlaceholder(' 예: NEW_VALUE');
	VS_CODE_NAME.SetPlaceholder(' 예: 새로운 값');
};

Matrix.OnDataBindEnd = function(s, e) {
	if (e.Id == 'GRD_MASTER') {
		LBL_MST_CNT.Text = e.RecordCount.toString();
	} else if (e.Id == 'GRD_DETAIL') {
		LBL_DTL_CNT.Text = e.RecordCount.toString();
	}
};

/******** Button Click Event ********/
// 그룹 추가
BTN_MST_ADD.OnClick = function(s, e) {
	setInputValue('GRD_MASTER');

	popup = Matrix.ShowWindow("그룹 추가", 0, 0, 460, 415, true, false, "그룹 추가", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

// 코드 추가
BTN_DTL_ADD.OnClick = function(s, e) {
	if (!Matrix.GetGlobalParamValue('VS_GROUP_CD')) {
		Matrix.Information('먼저 코드 그룹을 선택해주세요', '안내');
		return;
	}

	setInputValue(null);
	BTN_CD_SAV.Text = '추가';
	VS_INP_CODE.IsReadOnly = false;
	VS_INP_CODE.Style.Background.Color.SetRGBA('255', '255', '255', '1');
};

// 삭제 (코드 그룹)
BTN_MST_DEL.OnClick = function(s, e) {
	if (!GRD_MASTER.GetCurrentRow()) {
		Matrix.Information('삭제할 코드 그룹 선택 후 다시 시도하세요', '안내');
		return;
	} else {
		GRD_MASTER.GetCurrentRow().Data.RowState = 'D';
	}

	if (GRD_MASTER.GetCurrentRow().GetValue('CODE') > 0) {
		Matrix.Information('모든 상세 코드를 삭제한 후 다시 시도하세요', '안내');
		return;
	}

	Matrix.Confirm('[ ' + Matrix.GetGlobalParamValue('VS_GROUP_CD') + ' ] 그룹코드를 삭제하시겠습니까?', '안내', function(ok) {
		if (ok) {
			Matrix.RunScript('GRD_MASTER', 'GRD_MASTER_DELETE', function(p) {
				if (!p.Success) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_MASTER');
				Matrix.Information('삭제 완료되었습니다.', '안내');
				setInit();
			});
		} else {
			GRD_MASTER.ClearRowState(false);
		}
	}, 0);
};

// 삭제 (상세 코드)
BTN_DTL_DEL.OnClick = function(s, e) {
	let checkCount = 0;
	for (let i = 0; i < GRD_DETAIL.GetRowCount(); i++) {
		if (GRD_DETAIL.getRowValue(i, 'CHK') == 'Y') {
			GRD_DETAIL.ChangeRowStateAt(i, 'D');
			checkCount++;
		}
	}

	if (!checkCount) {
		Matrix.Information('삭제할 항목을 선택하세요', '안내');
		return;
	}

	Matrix.Confirm('선택한 항목을 삭제하시겠습니까?', '안내', function(ok) {
		if (ok) {
			Matrix.RunScript('GRD_DETAIL', 'GRD_DETAIL_DELETE', function(p) {
				if (!p.Success) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_MASTER,GRD_DETAIL');
				Matrix.Information('삭제 완료되었습니다.', '안내');
			});
		} else {
			GRD_DETAIL.ClearRowState(false);
		}
	}, 0);
};

// 취소 (그룹 추가)
BTN_GRP_CNC.OnClick = function(s, e) {
	popup.Close();
};

// 추가 (그룹 추가)
BTN_GRP_SAV.OnClick = function(s, e) {
	const grpFields = [VS_INP_GROUP_CODE.Text, VS_INP_GROUP_NAME.Text];
	const grpControls = [VS_INP_GROUP_CODE, VS_INP_GROUP_NAME];
	const grpInvalid = isInvalidInput(grpFields, grpControls);
	if (grpInvalid) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		grpInvalid.Focus();
		return;
	}

	Matrix.RunScript('', 'GRD_MASTER_INSERT', function(p) {
		if (!p.Success) {
			Matrix.Alert(p.Message);
			return;
		}
		Matrix.doRefresh('GRD_MASTER');
		Matrix.Information('추가 완료되었습니다.', '안내');
		setInit();
		popup.Close();
	});
};

// 취소 (코드 추가)
BTN_CD_CNC.OnClick = function(s, e) {
	popup.Close();
};

// 추가/저장 (코드 추가)
BTN_CD_SAV.OnClick = function(s, e) {
	const cdFields = [VS_INP_CODE.Text, VS_CODE_NAME.Text];
	const cdControls = [VS_INP_CODE, VS_CODE_NAME];
	const cdInvalid = isInvalidInput(cdFields, cdControls);
	if (cdInvalid) {
		Matrix.Information('필수 입력 항목을 확인해주세요', '안내');
		cdInvalid.Focus();
		return;
	}

	const scriptName = BTN_CD_SAV.Text == '저장' ? 'GRD_DETAIL_UPDATE' : 'GRD_DETAIL_INSERT';
	Matrix.RunScript('', scriptName, function(p) {
		if (!p.Success) {
			Matrix.Alert(p.Message);
			return;
		}
		Matrix.doRefresh('GRD_MASTER,GRD_DETAIL');
		Matrix.Information(BTN_CD_SAV.Text + ' 완료되었습니다.', '안내');
		popup.Close();
	});
};
/******** Button Click Event ********/

GRD_MASTER.OnCellClick = function(s, e) {
	Matrix.SetGlobalParams('VS_GROUP_CD', e.Row.GetValue('GROUP_CD'));
	Matrix.doRefresh('GRD_DETAIL');

	LBL_TTL_3.Text = '  상세 코드 – ' + e.Row.GetValue('CODE_NAME');
	LBL_INIT.Visible = false;
};

GRD_DETAIL.OnCellDoubleClick = function(s, e) {
	setInputValue(e.Row);
	BTN_CD_SAV.Text = '저장';
	VS_INP_CODE.IsReadOnly = true;
	VS_INP_CODE.Style.Background.Color.SetRGBA('217', '217', '217', '0.3');

	popup = Matrix.ShowWindow("코드 추가", 0, 0, 460, 350, true, false, "코드 수정", true, '#ffffff', 0, false, false);
	popup.MoveToCenter();
};

GRD_DETAIL.OnGridMultiHeaderCheckBoxClicked = function(s, e) {
	const checkValue = e.Checked ? 'Y' : 'N';
	for (let i = 0; i < GRD_DETAIL.GetRowCount(); i++) {
		GRD_DETAIL.setRowValue(i, 'CHK', checkValue);
	}
	GRD_DETAIL.Update();
};

var setInputValue = function(row) {
	if (row == 'GRD_MASTER') {
		VS_INP_GROUP_CODE.Text = '';
		VS_INP_GROUP_NAME.Text = '';
		VS_INP_CODE_DESC.Text  = '';

	} else if (row) {
		VS_GROUP_CODE.Text = Matrix.GetGlobalParamValue('VS_GROUP_CD');
		VS_INP_CODE.Text   = row.GetValue('CODE');
		VS_CODE_NAME.Text  = row.GetValue('CODE_NAME');
		VN_SORT.Text       = row.GetValue('SORT_ORDER');
		VS_USE_YN.Value    = row.GetValue('USE_YN_CODE');

	} else {
		Matrix.Execute('GET_MAX_SORT', function(p) {
			if (!p.Success) {
				Matrix.Alert(p.Message);
				return;
			}
			const dt = p.DataTable;

			VS_GROUP_CODE.Text = Matrix.GetGlobalParamValue('VS_GROUP_CD');
			VS_INP_CODE.Text   = '';
			VS_CODE_NAME.Text  = '';
			VN_SORT.Text       = dt.getData(0, 'MAX_SORT');
			VS_USE_YN.Value    = 'Y';

			popup = Matrix.ShowWindow("코드 추가", 0, 0, 460, 350, true, false, "코드 추가", true, '#ffffff', 0, false, false);
			popup.MoveToCenter();
		});
	}
};

var isInvalidInput = function(fields: any[], controls?): any {
	var idx = fields.findIndex(function(v) {
		return v === null || v === undefined || v === '';
	});
	if (idx !== -1 && controls && controls[idx]) {
		return controls[idx];
	}
	return idx !== -1 ? true : null;
};

var setInit = function() {
	LBL_DTL_CNT.Text = '0';
	Matrix.SetGlobalParams('VS_GROUP_CD', null);
	LBL_TTL_3.Text = '  상세 코드 – 그룹을 선택하세요';
	LBL_INIT.Visible = true;
	VS_GROUP_CODE.IsReadOnly = true;
};
