import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";

let Matrix : Matrix;

const GRP_BODY : Group =   Matrix.getObject("GRP_BODY") as Group;
const GRD_CUSTOMER : DataGrid =   Matrix.getObject("GRD_CUSTOMER") as DataGrid;
const VS_KEYWORD : TextBox =   Matrix.getObject("VS_KEYWORD") as TextBox;
const VS_INP_NAME : TextBox =   Matrix.getObject("VS_INP_NAME") as TextBox;
const VS_INP_TYPE : ComboBox =   Matrix.getObject("VS_INP_TYPE") as ComboBox;
const VS_INP_GRADE : ComboBox =   Matrix.getObject("VS_INP_GRADE") as ComboBox;
const VS_INP_REG_NO : TextBox =   Matrix.getObject("VS_INP_REG_NO") as TextBox;
const VS_INP_MAIN : TextBox =   Matrix.getObject("VS_INP_MAIN") as TextBox;
const VS_INP_PHONE : TextBox =   Matrix.getObject("VS_INP_PHONE") as TextBox;
const VS_INP_EMAIL : TextBox =   Matrix.getObject("VS_INP_EMAIL") as TextBox;
const VN_INP_LIMIT : NumberBox =   Matrix.getObject("VN_INP_LIMIT") as NumberBox;


/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 **************************************/
var OnDocumentLoadComplete = function(sender, args) {
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 고객명, 사업자번호로 검색');

	GRD_CUSTOMER.GetField('CUST_ID').KeyType = 3; // KeyType: Primary
};


/**************************************
 * 문서가 로드되고 AutoRefresh가 완료되는 시점에 발생합니다.
 **************************************/
var OnLoadComplete = function(sender, args) {
	if (args.Success) {
		setInputValue(null);
	}
};


/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 **************************************/
var OnButtonClick = function(sender, args) {
	switch (args.Id) {
		case 'BTN_REF': // 검색
			Matrix.doRefresh('GRD_CUSTOMER');
			break;

		case 'BTN_DEL': // 삭제
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
				} else GRD_CUSTOMER.ClearRowState(false);
			}, 0);

			break;

		case 'BTN_RESET': // 초기화
			Matrix.SetGlobalParams('VS_CUST_ID', null);
			setInputValue(null);
			break;

		case 'BTN_SAV': // 저장
			if (!Matrix.GetGlobalParamValue('VS_CUST_ID')) {
				Matrix.Information('고객 선택 후 다시 시도하세요', '안내');
				return;
			}

			let savFields = [VS_INP_NAME.Text, VS_INP_TYPE.Value, VS_INP_GRADE.Value];
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
			break;

		case 'BTN_ADD': // 추가
			if (Matrix.GetGlobalParamValue('VS_CUST_ID')) {
				Matrix.Information('고객이 선택되어 있습니다.\n초기화 버튼 클릭 후 다시 시도하세요', '안내');
				return;
			}

			let addFields = [VS_INP_NAME.Text, VS_INP_TYPE.Value, VS_INP_GRADE.Value];
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
	}
};


/**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 **************************************/
var OnDataBindEnd = function(sender, args) {
	if (args.Id == 'GRD_CUSTOMER') {
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   고객 목록 (' + args.RecordCount + '개사)';
	}
};


/**************************************
 * 텍스트 박스 컨트롤의 key 입력 시 발생합니다.
 **************************************/
var OnTextKeydown = function(sender, args) {
	if (args.Id == 'VS_KEYWORD' && args.Event.isEnter()) {
		Matrix.doRefresh('GRD_CUSTOMER');
	}
};


/**************************************
 * 그리드의 멀티 헤더 체크 박스를 클릭하는 순간 발생합니다.
 **************************************/
var OnGridMultiHeaderCheckBoxClicked = function(sender, args) {
	if (args.Id == 'GRD_CUSTOMER') {
		let checkValue = args.Checked ? 'Y' : 'N';

		for (let i = 0; i < GRD_CUSTOMER.GetRowCount(); i++) {
			GRD_CUSTOMER.setRowValue(i, 'CHK', checkValue);
		}
		GRD_CUSTOMER.Update();
	}
};


/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 **************************************/
var OnViewerSizeChanged = function(sender, args) {
	GRP_BODY.Width = args.Width - 520;
};


/**************************************
 * 그리드의 셀을 더블 클릭할 떄 발생합니다.
 **************************************/
var OnCellDoubleClick = function(sender, args) {
	if (args.Id == 'GRD_CUSTOMER') {
		Matrix.SetGlobalParams('VS_CUST_ID', args.Row.GetValue('CUST_ID'));
		setInputValue(args.Row);
	}
};


const setInputValue = function(row) {
	if (typeof row === 'object' && row !== null) {
		VS_INP_NAME.Text	= row.GetValue('CUST_NAME');
		VS_INP_TYPE.Value	= row.GetValue('TYPE_CODE');
		VS_INP_GRADE.Value	= row.GetValue('GRADE_CODE');
		VN_INP_LIMIT.Value	= row.GetValue('CREDIT_LIMIT');
		VS_INP_REG_NO.Text	= row.GetValue('REG_NO');
		VS_INP_PHONE.Text	= row.GetValue('PHONE');
		VS_INP_EMAIL.Text	= row.GetValue('EMAIL');
		VS_INP_MAIN.Text	= row.GetValue('MAIN');
	} else {
		VS_INP_NAME.Text	= '';
		VS_INP_TYPE.Value	= '';
		VS_INP_GRADE.Value	= '';
		VN_INP_LIMIT.Value	= 0;
		VS_INP_REG_NO.Text	= '';
		VS_INP_PHONE.Text	= '';
		VS_INP_EMAIL.Text	= '';
		VS_INP_MAIN.Text	= '';
	}
};


const isInvalidInput = function(fields) {
	return fields.some(function(v) {
		return v === null || v === undefined || v === '';
	});
};
