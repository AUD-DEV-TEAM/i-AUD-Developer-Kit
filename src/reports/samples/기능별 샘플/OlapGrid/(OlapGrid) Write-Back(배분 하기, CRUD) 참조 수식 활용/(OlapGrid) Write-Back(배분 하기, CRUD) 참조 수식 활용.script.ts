import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

let olapGrid: OlapGrid;
let VN_BAEBUN_TYPE: ComboBox;
let tbxLockCellFormula: RichTextBox;

const initControlVariables = function (): void {
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  VN_BAEBUN_TYPE = Matrix.getObject("VN_BAEBUN_TYPE") as ComboBox;
  tbxLockCellFormula = Matrix.getObject("tbxLockCellFormula") as RichTextBox;

  tbxLockCellFormula.OnTextChange = function (s: any, e: any): void {
    olapGrid.setLockCellFormula(tbxLockCellFormula.Text);
  };
};

/**
 * Write-Back 기능 활성화 하기
 **/
const initWriteBack = function (): void {
  olapGrid.Options.EnableWriteBack = true; //Write-back 활성화
  olapGrid.Options.EnableCreateRecord = false; //레코드가 없는 셀의 경우 데이터 생성 여부
  olapGrid.Options.ManualUpdate = false; //수동 계산 실행 여

  olapGrid.setLockCellFormula(tbxLockCellFormula.Text);
};

/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
const OnDocumentLoadComplete = function (sender: any, args: any): void {
  initControlVariables();
  initWriteBack();
};

/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
const OnButtonClick = function (sender: any, args: any): void {
  if (args.Id == "btnCalculate") {
    if (olapGrid.CanCalculateWriteBack()) {
      //계산할 대상이 있으면..
      olapGrid.CalculateWriteBack(function (): void {});
    }
  } else if (args.Id == "btnUpate") {
    if (olapGrid.IsModified() == false) {
      //계산할 대상이 있으면..
      Matrix.Information("수정된 데이터가 존재하지 않습니다.", "i-AUD");
      return;
    }
    //if(olapGrid.CanCalculateWriteBack()){ //계산할 대상이 있으면..
    //Matrix.Information("계산하지 않은 셀이 존재합니다. 계산을 먼저 수행해 주세요." ,"i-AUD");
    //return;

    //}else{
    //	saveOlap();
    //}
    if (olapGrid.CanCalculateWriteBack()) {
      //계산할 대상이 있으면..
      olapGrid.CalculateWriteBack(
        /* succsss only */
        function (): void {
          saveOlap();
        }
      );
    } else {
      saveOlap();
    }
  }
};

const saveOlap = function (): void {
  Matrix.RunScript("OlapGrid", "Service2", function (p: any): void {
    if (p.Success == false) {
      Matrix.Alert(p.Message);
      return;
    }
    Matrix.doRefresh("OlapGrid");
  });
};
/*****************************************
 * 콤보박스 컨트롤의 값이 변경될때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Value (Readonly:False) : 컨트롤 값
 *****************************************/
const OnComboBoxValueChanged = function (_sender: any, _args: any): void {
  let fld = olapGrid.getField("M1");
  fld.EditMethod = parseFloat(VN_BAEBUN_TYPE.Value);
  fld.EditPrecision = 0; //소수점 자리수
  //fld.EditMethodRef = "M2";//참조 필드(가중치 기준 필드)

  fld = olapGrid.getField("M2");
  fld.EditMethod = parseFloat(VN_BAEBUN_TYPE.Value);
  fld.EditPrecision = 0; //소수점 자리수

  fld = olapGrid.getField("M3");
  fld.EditMethod = parseFloat(VN_BAEBUN_TYPE.Value);
  fld.EditPrecision = 0; //소수점 자리수
};
/*****************************************
 * 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 bool	IsChecked (Readonly:False) : 체크 상태
 *****************************************/
const OnCheckValueChange = function (_sender: any, args: any): void {
  if (args.Id == "chkManualUpdate") {
    olapGrid.Options.ManualUpdate = args.IsChecked;
  } else if (args.Id == "chkEnableCreateRecord") {
    olapGrid.Options.EnableCreateRecord = args.IsChecked;
  }
};

/*****************************************
 * 데이터 셀 수정 모드로 진입할 때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:True) : 컨트롤 명
 *		 iOLAP.ScriptDataCell	Cell (Readonly:True) : 데이터 셀 객체
 *		 bool	Cancel (Readonly:False) : 이 값을 true 로 설정 할 경우 수정 모드로 진입이 취소됩니다.
 *****************************************/
const OnOlapDataCellStartEdit = function (_sender: any, _args: any): void {};

/*****************************************
 * 데이터 셀을 수정 후에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:True) : 컨트롤 명
 *		 iOLAP.ScriptDataCell	Cell (Readonly:True) : 데이터 셀 객체
 *		 double	BeforeValue (Readonly:True) : 수정 전 값
 *		 double	AfterValue (Readonly:True) : 수정 후 값
 *		 double	LockedValue (Readonly:True) : 잠긴 레코드의 값
 *		 bool	Cancel (Readonly:False) : 이 값을 true 로 설정 할 경우 수정 작업이 취소됩니다.
 *****************************************/
const OnOlapDataCellEndEdit = function (_sender: any, args: any): void {
  if (args.LockedValue > args.AfterValue) {
    args.Cancel = true;
    const fmtValue = Matrix.getFormatConverter(args.Cell.Field.Format).Convert(
      args.LockedValue
    ).Value;

    Matrix.Information(
      "잠금으로 설정한 값(" + fmtValue + ")보다 큰 값을 입력해 주세요.",
      "i-AUD"
    );
  }
  //입력값 점검 전체 값계의 값보다 크면 안된다.
  const limitValue = parseFloat(args.Cell.Value2); // <= 참조 수식 값 확인
  if (limitValue < args.AfterValue) {
    args.Cancel = true;
    const fmtValue = Matrix.getFormatConverter(args.Cell.Field.Format).Convert(
      args.LockedValue
    ).Value;

    Matrix.Information(
      "입력한 값은 Row의 합계 " + limitValue + " 보다 클 수 없습니다..",
      "i-AUD"
    );
  }
};

export {
  OnDocumentLoadComplete,
  OnButtonClick,
  OnComboBoxValueChanged,
  OnCheckValueChange,
  OnOlapDataCellStartEdit,
  OnOlapDataCellEndEdit,
};
