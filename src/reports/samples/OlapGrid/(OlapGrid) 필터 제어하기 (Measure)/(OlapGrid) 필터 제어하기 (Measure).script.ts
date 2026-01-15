import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/
var cboAndOrOperator: ComboBox | null = null;
var cboFields: ComboBox | null = null;
var cboOperatorA: ComboBox | null = null;
var cboOperatorB: ComboBox | null = null;
var olapGrid: OlapGrid | null = null;
var tbxDebug: RichTextBox | null = null;
var tbxValueA: NumberBox | null = null;
var tbxValueB: NumberBox | null = null;

var initControlVariables = function () {
  cboAndOrOperator = Matrix.getObject("cboAndOrOperator") as ComboBox;
  cboFields = Matrix.getObject("cboFields") as ComboBox;
  cboOperatorA = Matrix.getObject("cboOperatorA") as ComboBox;
  cboOperatorB = Matrix.getObject("cboOperatorB") as ComboBox;
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  tbxDebug = Matrix.getObject("tbxDebug") as RichTextBox;
  tbxValueA = Matrix.getObject("tbxValueA") as NumberBox;
  tbxValueB = Matrix.getObject("tbxValueB") as NumberBox;
};
initControlVariables();

/** OlapGrid 필드를 데이터 셋으로 생성합니다.  */
var bindOlapFields = function () {
  var ds = Matrix.CreateDataSet();
  var dt = ds.CreateTable("DATA");
  dt.AddColumn("NAME", false);
  var fields = olapGrid!.getFields();
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].Category == 2 && fields[i].CreateType == 0 /*Default*/) {
      /*Measure가 아닌 것들...*/
      dt.GetRow(dt.AppendRow()).SetValue("NAME", fields[i].Name);
    }
  }
  cboFields!.SetDataSet(ds);
};
/** Olap의 필드 정보를 읽어서 설정합니다. */
var bindOlapFieldFilter = function (name: string) {
  var fld = olapGrid!.getField(name);
  if (fld.FilterInfo && fld.FilterInfo.HasMeasureFilter) {
    // Operator 및 값 설정
    var filter = fld.FilterInfo;
    switch (filter.MeasureAndOrOperator) {
      case 0: //none
        cboAndOrOperator!.SelectedIndex = 0;
        break;
      case 1: //Or
        cboAndOrOperator!.SelectedIndex = 2;
        break;
      case 2: //and
        cboAndOrOperator!.SelectedIndex = 1;
        break;
    }

    cboOperatorA!.SelectedIndex = filter.MeasureFilterTypeA; /*Equals*/

    cboOperatorB!.SelectedIndex = filter.MeasureFilterTypeB;
    tbxValueA!.Value = filter.MeasureFilterValueA;
    tbxValueB!.Value = filter.MeasureFilterValueB;
  } else {
    //초기화
    cboOperatorA!.Value = "=";
    cboOperatorB!.Value = "=";
    tbxValueA!.Value = 0;
    tbxValueB!.Value = 0;
    cboAndOrOperator!.SelectedIndex = 0;
  }
};

/** Filter 설정하기 */
var setOlapFieldFilter = function () {
  var fld = olapGrid!.getField(cboFields!.Value);
  if (fld) {
    if (cboAndOrOperator!.SelectedIndex > 0) {
      var isAnd = cboAndOrOperator!.Value == "AND";
      olapGrid!.setMeasureFilter(
        fld.Name,
        cboOperatorA!.Value,
        tbxValueA!.Value,
        cboOperatorB!.Value,
        tbxValueB!.Value,
        isAnd
      );
      tbxDebug!.Text =
        "OlapGrid.setMeasureFilter('" +
        fld.Name +
        "', '" +
        cboOperatorA!.Value +
        "'," +
        tbxValueA!.Value +
        " ,'" +
        cboOperatorB!.Value +
        "'," +
        tbxValueB!.Value +
        "," +
        isAnd +
        ");";
    } else {
      olapGrid!.setMeasureFilter(fld.Name, cboOperatorA!.Value, tbxValueA!.Value);
      tbxDebug!.Text =
        "OlapGrid.setMeasureFilter('" +
        fld.Name +
        "', '" +
        cboOperatorA!.Value +
        "'," +
        tbxValueA!.Value +
        ");";
    }
    olapGrid!.Refresh();
  }
};
/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
var OnDocumentLoadComplete = function (sender: any, args: any) {
  bindOlapFields();
};

/*****************************************
 * 콤보박스 컨트롤의 값이 변경될때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Value (Readonly:False) : 컨트롤 값
 *****************************************/
var OnComboBoxValueChanged = function (sender: any, args: any) {
  switch (args.Id) {
    case "cboFields":
      bindOlapFieldFilter(args.Value);
      break;
    case "cboAndOrOperator":
      if (args.Value == "AND" || args.Value == "OR") {
        tbxValueB!.IsEnabled = true;

        cboOperatorB!.IsEnabled = true;
      } else {
        tbxValueB!.IsEnabled = false;
        tbxValueB!.Value = 0;
        cboOperatorB!.IsEnabled = false;
      }
      break;
  }
};
/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
var OnButtonClick = function (sender: any, args: any) {
  if (args.Id == "btnExecute") {
    setOlapFieldFilter();
  }
};
