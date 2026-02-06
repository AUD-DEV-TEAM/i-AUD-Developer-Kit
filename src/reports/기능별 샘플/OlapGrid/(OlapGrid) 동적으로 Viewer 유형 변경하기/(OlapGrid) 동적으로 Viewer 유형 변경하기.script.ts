import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/

var olapGrid: OlapGrid | null = null;
var BTN_APPLY: any = null;
var RD_DEFAULT: RadioButton | null = null;
var RD_TREEVIEW: RadioButton | null = null;

var initControlVariables = function () {
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  BTN_APPLY = Matrix.getObject("BTN_APPLY");
  RD_DEFAULT = Matrix.getObject("RD_DEFAULT") as RadioButton;
  RD_DEFAULT.OnValueChange = function (s, e) {
    if (e.IsChecked === true) fnChangeViewType(0);
  };
  RD_TREEVIEW = Matrix.getObject("RD_TREEVIEW") as RadioButton;
  RD_TREEVIEW.OnValueChange = function (s, e) {
    if (e.IsChecked === true) fnChangeViewType(1);
  };
};

/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
var OnDocumentLoadComplete = function (sender: any, args: any) {
  initControlVariables();
};

//OlapGrid 의 ViewType 을 변경합니다.
var fnChangeViewType = function (vType: number) {
  if (!olapGrid) olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;

  if (olapGrid.Options.ViewType != vType) {
    olapGrid.Options.ViewType = vType;
    olapGrid.Refresh();
  }
};
