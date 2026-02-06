import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

let olapGrid: OlapGrid | null = null;
let RD_DEFAULT: RadioButton | null = null;
let RD_TREEVIEW: RadioButton | null = null;

const initControlVariables = function (): void {
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  RD_DEFAULT = Matrix.getObject("RD_DEFAULT") as RadioButton;
  RD_DEFAULT.OnValueChange = function (_s: any, e: any): void {
    if (e.IsChecked === true) fnChangeViewType(0);
  };
  RD_TREEVIEW = Matrix.getObject("RD_TREEVIEW") as RadioButton;
  RD_TREEVIEW.OnValueChange = function (_s: any, e: any): void {
    if (e.IsChecked === true) fnChangeViewType(1);
  };
};

/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
const OnDocumentLoadComplete = function (_sender: any, _args: any): void {
  initControlVariables();
};

//OlapGrid 의 ViewType 을 변경합니다.
const fnChangeViewType = function (vType: number): void {
  if (!olapGrid) olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;

  if (olapGrid.Options.ViewType != vType) {
    olapGrid.Options.ViewType = vType;
    olapGrid.Refresh();
  }
};

export { OnDocumentLoadComplete };
