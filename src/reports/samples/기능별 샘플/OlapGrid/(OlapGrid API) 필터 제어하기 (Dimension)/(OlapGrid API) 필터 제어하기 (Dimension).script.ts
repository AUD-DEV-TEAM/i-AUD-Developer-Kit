import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { TextBox } from "@AUD_CLIENT/control/TextBox";

let Matrix: Matrix;

const tbxDebug: RichTextBox = Matrix.getObject("tbxDebug") as RichTextBox;
const olapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
const cboOperator: ComboBox = Matrix.getObject("cboOperator") as ComboBox;
const cboFields: ComboBox = Matrix.getObject("cboFields") as ComboBox;
const tbxValues: TextBox = Matrix.getObject("tbxValues") as TextBox;

/** OlapGrid 필드를 데이터 셋으로 생성합니다.  */
const bindOlapFields = function (): void {
  const ds = Matrix.CreateDataSet();
  const dt = ds.CreateTable("DATA");
  dt.AddColumn("NAME", false);
  const fields = olapGrid.getFields();
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].Category != 2) {
      /*Measure가 아닌 것들...*/
      dt.GetRow(dt.AppendRow()).SetValue("NAME", fields[i].Name);
    }
  }
  cboFields.SetDataSet(ds);
};

/** Olap의 필드 정보를 읽어서 설정합니다. */
const bindOlapFieldFilter = function (name: string): void {
  const fld = olapGrid.getField(name);
  if (fld.FilterInfo && fld.FilterInfo.HasFilter()) {
    // Operator 및 값 설정
    const filter = fld.FilterInfo;
    if (filter.FilterType == 0) {
      /*In*/
      cboOperator.Value = "In";
      tbxValues.Text = filter.Values ? filter.Values.join(",") : "";
    } else if (filter.FilterType == 1) {
      /*NotIn*/
      cboOperator.Value = "NotIn";
      tbxValues.Text = filter.Values ? filter.Values.join(",") : "";
    } else {
      // if(filter.FilterType == 4){ /*BetWeen*/
      cboOperator.Value = "Between";
      tbxValues.Text = filter.Values ? filter.Values.join(",") : "";
    }
  } else {
    //초기화
    cboOperator.Value = "In";
    tbxValues.Text = "";
  }
};

/** Filter 설정하기 */
const setOlapFieldFilter = function (): void {
  const fld = olapGrid.getField(cboFields.Value);
  if (fld) {
    const values = tbxValues.Text.split(",");
    const filter = cboOperator.Value;
    switch (filter) {
      case "In":
        olapGrid.setDimensionFilterIn(fld.Name, values); //  IN
        tbxDebug.Text =
          "OlapGrid.setDimensionFilterIn('" +
          fld.Name +
          "',['" +
          values.join("','") +
          "']);";
        break;
      case "NotIn":
        olapGrid.setDimensionFilterNotIn(fld.Name, values); //NOT IN
        tbxDebug.Text =
          "OlapGrid.setDimensionFilterNotIn('" +
          fld.Name +
          "',['" +
          values.join("','") +
          "']);";
        break;
      case "Between":
        if (values.length >= 2) {
          olapGrid.setDimensionFilterBetWeen(fld.Name, values[0], values[1]); //between
          tbxDebug.Text =
            "OlapGrid.setDimensionFilterBetWeen('" +
            fld.Name +
            "','" +
            values[0] +
            "','" +
            values[1] +
            "');";
        }
        break;
    }
    olapGrid.Refresh();
  }
};

/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
const OnDocumentLoadComplete = function (_sender: object, _args: object): void {
  bindOlapFields();
};

/*****************************************
 * 콤보박스 컨트롤의 값이 변경될때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Value (Readonly:False) : 컨트롤 값
 *****************************************/
const OnComboBoxValueChanged = function (_sender: object, args: { Id: string; Value: string }): void {
  if (args.Id == "cboFields") {
    bindOlapFieldFilter(args.Value);
  }
};

/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
const OnButtonClick = function (_sender: object, args: { Id: string; Text: string }): void {
  if (args.Id == "btnExecute") {
    setOlapFieldFilter();
  }
};