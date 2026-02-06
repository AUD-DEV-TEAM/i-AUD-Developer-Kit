import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { iGrid } from "@AUD_CLIENT/control/iGrid";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Image } from "@AUD_CLIENT/control/Image";
import { ColorPicker } from "@AUD_CLIENT/control/ColorPicker";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;

let btnCalculate: Button;
let btnUpate: Button;
let chkEnableCreateRecord: CheckBox;
let chkManualUpdate: CheckBox;
let DataGrid: DataGrid;
let MXGrid: iGrid;
let OlapGrid: OlapGrid;
let VN_BAEBUN_TYPE: ComboBox;
let tbxLockCellFormula: RichTextBox;

const initControlVariables = function () {
  btnCalculate = Matrix.getObject("btnCalculate") as Button;
  btnUpate = Matrix.getObject("btnUpate") as Button;
  chkEnableCreateRecord = Matrix.getObject("chkEnableCreateRecord") as CheckBox;
  chkManualUpdate = Matrix.getObject("chkManualUpdate") as CheckBox;
  DataGrid = Matrix.getObject("DataGrid") as DataGrid;
  MXGrid = Matrix.getObject("MXGrid") as iGrid;
  OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  VN_BAEBUN_TYPE = Matrix.getObject("VN_BAEBUN_TYPE") as ComboBox;
  tbxLockCellFormula = Matrix.getObject("tbxLockCellFormula") as RichTextBox;

  tbxLockCellFormula.OnTextChange = function (s, e) {
    OlapGrid.setLockCellFormula(tbxLockCellFormula.Text);
  };
};

/**
 * Write-Back 기능 활성화 하기
 **/
const initWriteBack = function () {
  OlapGrid.Options.EnableWriteBack = true; //Write-back 활성화
  OlapGrid.Options.EnableCreateRecord = false; //레코드가 없는 셀의 경우 데이터 생성 여부
  OlapGrid.Options.ManualUpdate = false; //수동 계산 실행 여

  OlapGrid.setLockCellFormula(tbxLockCellFormula.Text);
};

/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
const OnDocumentLoadComplete = function (sender: any, args: any) {
  initControlVariables();
  initWriteBack();
};

/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
const OnButtonClick = function (sender: any, args: any) {
  if (args.Id == "btnCalculate") {
    if (OlapGrid.CanCalculateWriteBack()) {
      //계산할 대상이 있으면..
      OlapGrid.CalculateWriteBack(function() {});
    }
  } else if (args.Id == "btnUpate") {
    if (OlapGrid.IsModified() == false) {
      //계산할 대상이 있으면..
      Matrix.Information("수정된 데이터가 존재하지 않습니다.", "i-AUD");
      return;
    }
    //if(OlapGrid.CanCalculateWriteBack()){ //계산할 대상이 있으면..
    //Matrix.Information("계산하지 않은 셀이 존재합니다. 계산을 먼저 수행해 주세요." ,"i-AUD");
    //return;

    //}else{
    //	saveOlap();
    //}
    if (OlapGrid.CanCalculateWriteBack()) {
      //계산할 대상이 있으면..
      OlapGrid.CalculateWriteBack(
        /* succsss only */
        function () {
          saveOlap();
        }
      );
    } else {
      saveOlap();
    }
  }
};

const saveOlap = function () {
  Matrix.RunScript("OlapGrid", "Service2", function (p) {
    if (p.Success == false) {
      Matrix.Alert(p.Message);
      return;
    }
    //alert("정상적으로 처리되었습니다.");
    Matrix.doRefresh("OlapGrid");
  });
};
/*****************************************
 * 콤보박스 컨트롤의 값이 변경될때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Value (Readonly:False) : 컨트롤 값
 *****************************************/
const OnComboBoxValueChanged = function (_sender: any, _args: any) {
  let fld = OlapGrid.getField("M1");
  fld.EditMethod = parseFloat(VN_BAEBUN_TYPE.Value);
  fld.EditPrecision = 0; //소수점 자리수
  //fld.EditMethodRef = "M2";//참조 필드(가중치 기준 필드)

  fld = OlapGrid.getField("M2");
  fld.EditMethod = parseFloat(VN_BAEBUN_TYPE.Value);
  fld.EditPrecision = 0; //소수점 자리수

  fld = OlapGrid.getField("M3");
  fld.EditMethod = parseFloat(VN_BAEBUN_TYPE.Value);
  fld.EditPrecision = 0; //소수점 자리수
};
/*****************************************
 * 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 bool	IsChecked (Readonly:False) : 체크 상태
 *****************************************/
const OnCheckValueChange = function (_sender: any, args: any) {
  if (args.Id == "chkManualUpdate") {
    OlapGrid.Options.ManualUpdate = args.IsChecked;
  } else if (args.Id == "chkEnableCreateRecord") {
    OlapGrid.Options.EnableCreateRecord = args.IsChecked;
  }
};

/*****************************************
 * 데이터 셀 수정 모드로 진입할 때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:True) : 컨트롤 명
 *		 iOLAP.ScriptDataCell	Cell (Readonly:True) : 데이터 셀 객체
 *		 bool	Cancel (Readonly:False) : 이 값을 true 로 설정 할 경우 수정 모드로 진입이 취소됩니다.
 *****************************************/
const OnOlapDataCellStartEdit = function (_sender: any, _args: any) {};

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
const OnOlapDataCellEndEdit = function (_sender: any, args: any) {
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
