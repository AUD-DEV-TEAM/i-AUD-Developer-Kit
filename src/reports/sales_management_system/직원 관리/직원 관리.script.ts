import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Calendar } from "@AUD_CLIENT/control/Calendar";
import { MultiComboBox } from "@AUD_CLIENT/control/MultiComboBox";

let Matrix : Matrix;

/*****************************
 * Control Declarations
 *****************************/
const VS_KEYWORD : TextBox = Matrix.getObject("VS_KEYWORD") as TextBox;
const GRD_EMPLOYEE : DataGrid = Matrix.getObject("GRD_EMPLOYEE") as DataGrid;
const VS_INP_NAME : TextBox = Matrix.getObject("VS_INP_NAME") as TextBox;
const VS_INP_DEPT : ComboBox = Matrix.getObject("VS_INP_DEPT") as ComboBox;
const VS_INP_POSITION : ComboBox = Matrix.getObject("VS_INP_POSITION") as ComboBox;
const VS_INP_STATUS : ComboBox = Matrix.getObject("VS_INP_STATUS") as ComboBox;
const VS_INP_EMAIL : TextBox = Matrix.getObject("VS_INP_EMAIL") as TextBox;
const VS_INP_PHONE : TextBox = Matrix.getObject("VS_INP_PHONE") as TextBox;
const BTN_SAV : Button = Matrix.getObject("BTN_SAV") as Button;
const VS_INP_HIRE : Calendar = Matrix.getObject("VS_INP_HIRE") as Calendar;

let popup: any = null;


/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 **************************************/
var OnDocumentLoadComplete = function(sender, args){
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 이름, 사번으로 검색');

	GRD_EMPLOYEE.GetField('EMP_ID').KeyType = 3; // KeyType: Primary
};


/**************************************
 * Execute 실행되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 boolean	Cancel (Readonly:False) : 이 값을 true로 설정 시 실행이 취소됩니다.
 *		 number	FilterType (Readonly:False) : 0:일반 조회, 1:검색 텍스트박스 조회, 2:전체검색 버튼 조회
 *		 string	FilterText (Readonly:False) : 검색 텍스트박스에 입력된 검색어
 **************************************/
var OnMultiComboBoxExecuteStart = function(sender, args){
	if(['VS_DEPT','VS_POSITION','VS_STATUS'].includes(args.Id)){
		(Matrix.getObject(args.Id) as MultiComboBox).CheckAll();
	}
};


/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
var OnButtonClick = function(sender, args){
	switch(args.Id){
		case 'BTN_ADD':	// 직원 등록 (Form: 직원 관리)
			setInputValue(null); // Input 컨트롤 초기화
			Matrix.SetGlobalParams('VS_EMP_ID','');
			BTN_SAV.Text = '추가';

			popup = Matrix.ShowWindow("직원 등록",0,0,460,415,true,false,"직원 등록",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;

		case 'BTN_REF': // 검색 (Form: 직원 관리)
			Matrix.doRefresh('GRD_EMPLOYEE');
			break;

		case 'BTN_RESET': // 초기화 (Form: 직원 관리)
			['VS_DEPT','VS_POSITION','VS_STATUS'].forEach(function(i){
				(Matrix.getObject(i) as MultiComboBox).CheckAll();
			});
			VS_KEYWORD.Text = '';
			break;

		case 'BTN_DEL': // 삭제 (Form: 직원 관리)
			let checkCount = 0;

			for(let i=0; i<GRD_EMPLOYEE.GetRowCount(); i++){
				if(GRD_EMPLOYEE.getRowValue(i,'CHK') == 'Y'){
					GRD_EMPLOYEE.ChangeRowStateAt(i,'D');
					checkCount++;
				}
			}

			if(!checkCount){
				Matrix.Information('삭제할 항목을 선택하세요','안내');
				return;
			}

			Matrix.Confirm('선택한 항목을 삭제하시겠습니까?','안내' ,function(ok){
				if(ok){
					Matrix.RunScript('GRD_EMPLOYEE','GRD_DELETE' ,function(p){
						if(p.Success == false){
						Matrix.Alert(p.Message);
						return;
					}
						Matrix.doRefresh('GRD_EMPLOYEE');
						Matrix.Information('삭제 완료되었습니다.','안내');
					});
				}else GRD_EMPLOYEE.ClearRowState(false);
			} ,0);

			break;

		case 'BTN_CNC': // 취소 (Form: 직원 등록)
			popup.Close();
			break;

		case 'BTN_SAV': // 저장 (Form: 직원 등록)
			let fields = [VS_INP_NAME.Text,VS_INP_DEPT.Value,VS_INP_POSITION.Value,VS_INP_STATUS.Value,VS_INP_HIRE.Value];
			if(isInvalidInput(fields)){
				Matrix.Information('필수 입력 항목을 확인해주세요','안내');
				return;
			}

			let scriptName = Matrix.GetGlobalParamValue('VS_EMP_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
			Matrix.RunScript('',scriptName ,function(p){
				if(p.Success == false){
				Matrix.Alert(p.Message);
				return;
				}
				Matrix.doRefresh('GRD_EMPLOYEE');
				Matrix.Information(BTN_SAV.Text+' 완료되었습니다.','안내');
				popup.Close();
			});
			break;
	}
};

/**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 number	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
 **************************************/
var OnDataBindEnd = function(sender, args){
	if(args.Id == 'GRD_EMPLOYEE'){
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   직원 목록 (' + args.RecordCount + '명)';
	}
};


/**************************************
 * 텍스트 박스 컨트롤의 key 입력 시 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 string	Text (Readonly:False) : 현재 텍스트
 *		 aud.data.Event	Event (Readonly:False) : 텍스트박스 key event 객체
 **************************************/
var OnTextKeydown = function(sender, args){
	if(args.Id == 'VS_KEYWORD' && args.Event.isEnter()){
		Matrix.doRefresh('GRD_EMPLOYEE');
	}
};


/**************************************
 * 그리드의 멀티 헤더 체크 박스를 클릭하는 순간 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 aud.control.grids.MultiHeaderCell	HeaderCell (Readonly:False) : 멀티헤더셀 객체
 *		 boolean	Checked (Readonly:False) : 체크 유무
 *		 boolean	Cancel (Readonly:False) : 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
 **************************************/
var OnGridMultiHeaderCheckBoxClicked = function(sender, args){
	if(args.Id == 'GRD_EMPLOYEE'){
		let checkValue = args.Checked ? 'Y' : 'N';

		for (let i=0; i<GRD_EMPLOYEE.GetRowCount(); i++) {
			GRD_EMPLOYEE.setRowValue(i, 'CHK', checkValue);
		}
		GRD_EMPLOYEE.Update();
	}
};


/**************************************
 * 그리드의 셀을 더블 클릭할 떄 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 aud.control.grids.DataGridRow	Row (Readonly:False) : 데이터 레코드 정보
 *		 aud.control.grids.DataGridCell	Cell (Readonly:False) : 데이터셀 정보
 *		 aud.control.grids.DataGridColumn	Field (Readonly:False) : 필드 정보
 **************************************/
var OnCellDoubleClick = function(sender, args){
	if(args.Id == 'GRD_EMPLOYEE'){
		setInputValue(args.Row);
		Matrix.SetGlobalParams('VS_EMP_ID',args.Row.GetValue('EMP_ID'));
		BTN_SAV.Text = '저장';

		popup = Matrix.ShowWindow("직원 등록",0,0,460,415,true,false,"직원 수정",true,'#ffffff',0,false,false);
		popup.MoveToCenter();
	}
};


var setInputValue = function(row){
	if(typeof row === 'object' && row !== null){
		VS_INP_NAME.Text	  = row.GetValue('EMP_NAME');
		VS_INP_DEPT.Value	  = row.GetValue('DEPT_CODE');
		VS_INP_POSITION.Value = row.GetValue('POSITION_CODE');
		VS_INP_STATUS.Value	  = row.GetValue('EMP_STATUS_CODE');
		VS_INP_EMAIL.Text	  = row.GetValue('EMAIL');
		VS_INP_PHONE.Text	  = row.GetValue('PHONE');
		VS_INP_HIRE.Value	  = row.GetValue('HIRE_DATE');

	}else{
		VS_INP_NAME.Text	  = '';
		VS_INP_DEPT.Value	  = '';
		VS_INP_POSITION.Value = '';
		VS_INP_STATUS.Value	  = '';
		VS_INP_EMAIL.Text	  = '';
		VS_INP_PHONE.Text	  = '';
		VS_INP_HIRE.Value	  = '';
	}
};


var isInvalidInput = function(fields) {
	return fields.some(function(v) {
		return v === null || v === undefined || v === '';
	});
};
