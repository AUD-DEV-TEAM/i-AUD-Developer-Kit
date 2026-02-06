import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;

let chkSyncScroll: CheckBox | null = null;
let olapGrid: OlapGrid | null = null;
let olapGrid1: OlapGrid | null = null;

const initControlVariables = function (): void {
  chkSyncScroll = Matrix.getObject("chkSyncScroll") as CheckBox;
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  olapGrid1 = Matrix.getObject("OlapGrid1") as OlapGrid;
};
/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
const OnDocumentLoadComplete = function (_sender: any, _args: any): void {
  initControlVariables();
  olapGrid1!.OnScroll = function (_s: any, e: any): void {
    if (chkSyncScroll!.Checked == false) return;
    try {
      olapGrid!.ScrollLeft = e.ScrollLeft;
      olapGrid!.ScrollTop = e.ScrollTop;
      olapGrid!.Update();
    } catch (ex) {}
  };
};
