import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix : Matrix;

/* Controls */
const GRD_MASTER: DataGrid = Matrix.getObject("GRD_MASTER") as DataGrid;
const GRD_DETAIL: DataGrid = Matrix.getObject("GRD_DETAIL") as DataGrid;
const LBL_TTL_3: Label = Matrix.getObject("LBL_TTL_3") as Label;
const LBL_INIT: Label = Matrix.getObject("LBL_INIT") as Label;
const LBL_MST_CNT: Label = Matrix.getObject("LBL_MST_CNT") as Label;
const LBL_DTL_CNT: Label = Matrix.getObject("LBL_DTL_CNT") as Label;
const BTN_CD_SAV: Button = Matrix.getObject("BTN_CD_SAV") as Button;

/* '그룹 추가' Form의 입력 컨트롤 */
const VS_INP_GROUP_CODE: TextBox = Matrix.getObject("VS_INP_GROUP_CODE") as TextBox;
const VS_INP_GROUP_NAME: TextBox = Matrix.getObject("VS_INP_GROUP_NAME") as TextBox;
const VS_INP_CODE_DESC: RichTextBox = Matrix.getObject("VS_INP_CODE_DESC") as RichTextBox;

/* '코드 추가' Form의 입력 컨트롤 */
const VS_GROUP_CODE: TextBox = Matrix.getObject("VS_GROUP_CODE") as TextBox;
const VS_INP_CODE: TextBox = Matrix.getObject("VS_INP_CODE") as TextBox;
const VS_CODE_NAME: TextBox = Matrix.getObject("VS_CODE_NAME") as TextBox;
const VN_SORT: NumberBox = Matrix.getObject("VN_SORT") as NumberBox;
const VS_USE_YN: ComboBox = Matrix.getObject("VS_USE_YN") as ComboBox;

let popup: any = null;

/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 **************************************/
const OnDocumentLoadComplete = function(sender, args) {
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


/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 **************************************/
const OnButtonClick = function(sender, args) {
	switch(args.Id) {
		case 'BTN_MST_ADD': // 그룹 추가
			setInputValue('GRD_MASTER');

			popup = Matrix.ShowWindow("그룹 추가",0,0,460,415,true,false,"그룹 추가",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;

		case 'BTN_DTL_ADD': // 코드 추가
			if (!Matrix.GetGlobalParamValue('VS_GROUP_CD')) {
				Matrix.Information('먼저 코드 그룹을 선택해주세요','안내');
				return;
			}

			setInputValue(null);
			BTN_CD_SAV.Text = '추가';
			VS_INP_CODE.IsReadOnly = false;
			VS_INP_CODE.Style.Background.Color.SetRGBA('255','255','255','1');
			break;

		case 'BTN_MST_DEL': // 삭제 (코드 그룹)
			if (!GRD_MASTER.GetCurrentRow()) {
				Matrix.Information('삭제할 코드 그룹 선택 후 다시 시도하세요','안내');
				return;
			} else {
				GRD_MASTER.GetCurrentRow().Data.RowState = 'D';
			}

			if (GRD_MASTER.GetCurrentRow().GetValue('CODE') > 0) {
				Matrix.Information('모든 상세 코드를 삭제한 후 다시 시도하세요','안내');
				return;
			}

			Matrix.Confirm('[ '+Matrix.GetGlobalParamValue('VS_GROUP_CD')+' ] 그룹코드를 삭제하시겠습니까?','안내', function(ok) {
				if (ok) {
					Matrix.RunScript('GRD_MASTER','GRD_MASTER_DELETE', function(p) {
						if (!p.Success) {
							Matrix.Alert(p.Message);
							return;
						}
						Matrix.doRefresh('GRD_MASTER');
						Matrix.Information('삭제 완료되었습니다.','안내');
						setInit();
					});
				} else {
					GRD_MASTER.ClearRowState(false);
				}
			}, 0);
			break;

		case 'BTN_DTL_DEL': // 삭제 (상세 코드)
			let checkCount = 0;
			for (let i = 0; i < GRD_DETAIL.GetRowCount(); i++) {
				if (GRD_DETAIL.getRowValue(i,'CHK') == 'Y') {
					GRD_DETAIL.ChangeRowStateAt(i,'D');
					checkCount++;
				}
			}

			if (!checkCount) {
				Matrix.Information('삭제할 항목을 선택하세요','안내');
				return;
			}

			Matrix.Confirm('선택한 항목을 삭제하시겠습니까?','안내', function(ok) {
				if (ok) {
					Matrix.RunScript('GRD_DETAIL','GRD_DETAIL_DELETE', function(p) {
						if (!p.Success) {
							Matrix.Alert(p.Message);
							return;
						}
						Matrix.doRefresh('GRD_MASTER,GRD_DETAIL');
						Matrix.Information('삭제 완료되었습니다.','안내');
					});
				} else {
					GRD_DETAIL.ClearRowState(false);
				}
			}, 0);
			break;

		case 'BTN_GRP_CNC': // 취소 (Form: '그룹 추가')
			popup.Close();
			break;

		case 'BTN_GRP_SAV': // 추가 (Form: '그룹 추가')
			const grpFields = [VS_INP_GROUP_CODE.Text, VS_INP_GROUP_NAME.Text];
			if (isInvalidInput(grpFields)) {
				Matrix.Information('필수 입력 항목을 확인해주세요','안내');
				return;
			}

			Matrix.RunScript('','GRD_MASTER_INSERT', function(p) {
				if (!p.Success) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_MASTER');
				Matrix.Information('추가 완료되었습니다.','안내');
				popup.Close();
			});
			break;

		case 'BTN_CD_CNC': // 취소 (Form: '코드 추가')
			popup.Close();
			break;

		case 'BTN_CD_SAV': // 추가/저장 (Form: '코드 추가')
			const cdFields = [VS_INP_CODE.Text, VS_CODE_NAME.Text];
			if (isInvalidInput(cdFields)) {
				Matrix.Information('필수 입력 항목을 확인해주세요','안내');
				return;
			}

			const scriptName = BTN_CD_SAV.Text == '저장' ? 'GRD_DETAIL_UPDATE' : 'GRD_DETAIL_INSERT';
			Matrix.RunScript('', scriptName, function(p) {
				if (!p.Success) {
					Matrix.Alert(p.Message);
					return;
				}
				Matrix.doRefresh('GRD_DETAIL');
				Matrix.Information(BTN_CD_SAV.Text+' 완료되었습니다.','안내');
				popup.Close();
			});
			break;
	}
};


/**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 **************************************/
const OnDataBindEnd = function(sender, args) {
	if (args.Id == 'GRD_MASTER') {
		LBL_MST_CNT.Text = args.RecordCount;
	} else if (args.Id == 'GRD_DETAIL') {
		LBL_DTL_CNT.Text = args.RecordCount;
	}
};


/**************************************
 * 그리드의 셀을 클릭할 때 발생합니다.
 **************************************/
const OnCellClick = function(sender, args) {
	if (args.Id == 'GRD_MASTER') {
		Matrix.SetGlobalParams('VS_GROUP_CD', args.Row.GetValue('GROUP_CD'));
		Matrix.doRefresh('GRD_DETAIL');

		LBL_TTL_3.Text = '  상세 코드 – ' + args.Row.GetValue('CODE_NAME');
		LBL_INIT.Visible = false;
	}
};


/**************************************
 * 그리드의 셀을 더블 클릭할 때 발생합니다.
 **************************************/
const OnCellDoubleClick = function(sender, args) {
	if (args.Id == 'GRD_DETAIL') {
		setInputValue(args.Row);
		BTN_CD_SAV.Text = '저장';
		VS_INP_CODE.IsReadOnly = true;
		VS_INP_CODE.Style.Background.Color.SetRGBA('217','217','217','0.3');

		popup = Matrix.ShowWindow("코드 추가",0,0,460,350,true,false,"코드 수정",true,'#ffffff',0,false,false);
		popup.MoveToCenter();
	}
};


/**************************************
 * 그리드의 멀티 헤더 체크 박스를 클릭하는 순간 발생합니다.
 **************************************/
const OnGridMultiHeaderCheckBoxClicked = function(sender, args) {
	if (args.Id == 'GRD_DETAIL') {
		const checkValue = args.Checked ? 'Y' : 'N';

		for (let i = 0; i < GRD_DETAIL.GetRowCount(); i++) {
			GRD_DETAIL.setRowValue(i, 'CHK', checkValue);
		}
		GRD_DETAIL.Update();
	}
};


const setInputValue = function(row) {
	if (row == 'GRD_MASTER') {
		VS_INP_GROUP_CODE.Text = '';
		VS_INP_GROUP_NAME.Text = '';
		VS_INP_CODE_DESC.Text  = '';

	} else if (typeof row === 'object' && row !== null) {
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
			VN_SORT.Text       = dt.getData(0,'MAX_SORT');
			VS_USE_YN.Value    = 'Y';

			popup = Matrix.ShowWindow("코드 추가",0,0,460,350,true,false,"코드 추가",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
		});
	}
};


const isInvalidInput = function(fields: any[]) {
	return fields.some(function(v) {
		return v === null || v === undefined || v === '';
	});
};

const setInit = function() {
	LBL_DTL_CNT.Text = '0';
	Matrix.SetGlobalParams('VS_GROUP_CD', null);
	LBL_TTL_3.Text = '  상세 코드 – 그룹을 선택하세요';
	LBL_INIT.Visible = true;
	VS_GROUP_CODE.IsReadOnly = true;
};
