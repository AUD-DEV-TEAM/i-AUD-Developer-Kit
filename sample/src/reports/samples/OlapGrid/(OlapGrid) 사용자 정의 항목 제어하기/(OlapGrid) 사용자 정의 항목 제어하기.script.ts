import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/
var btnClear: Button | null = null;
var btnExecute: Button | null = null;
var olapGrid: OlapGrid | null = null;
var tbxValues: TextBox | null = null;
var tbxGroupName: TextBox | null = null;

var initControlVariables = function () {
  btnClear = Matrix.getObject("btnClear") as Button;
  btnExecute = Matrix.getObject("btnExecute") as Button;
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  tbxValues = Matrix.getObject("tbxValues") as TextBox;
  tbxGroupName = Matrix.getObject("tbxGroupName") as TextBox;
};
initControlVariables();

/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
var OnButtonClick = function (sender: any, args: any) {
  switch (args.Id) {
    case "btnClear":
      olapGrid!.ClearCustomDimensions();
      olapGrid!.Refresh();
      break;
    case "btnExecute":
      var nDim = olapGrid!.addCustomDimension("창고이름", tbxGroupName!.Text);
      nDim.Caption = tbxGroupName!.Text;
      var arr = tbxValues!.Text.split(",");
      var text = '"' + arr.join('","') + '"';
      nDim.Formula = " InList([창고이름], " + text + ")";
      nDim.DataCellStyle = "BX68081E5FE2164E87AC30386900E82C78";
      olapGrid!.Refresh();
      break;
  }
};
