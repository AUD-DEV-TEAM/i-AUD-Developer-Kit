import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/
var chkSyncScroll: CheckBox | null = null;
var olapGrid: OlapGrid | null = null;
var olapGrid1: OlapGrid | null = null;

var initControlVariables = function () {
  chkSyncScroll = Matrix.getObject("chkSyncScroll") as CheckBox;
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  olapGrid1 = Matrix.getObject("OlapGrid1") as OlapGrid;
};
/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
var OnDocumentLoadComplete = function (sender: any, args: any) {
  initControlVariables();
  olapGrid1!.OnScroll = function (s, e) {
    if (chkSyncScroll!.Checked == false) return;
    try {
      olapGrid!.ScrollLeft = e.ScrollLeft;
      olapGrid!.ScrollTop = e.ScrollTop;
      olapGrid!.Update();
    } catch (ex) {}
  };
};
