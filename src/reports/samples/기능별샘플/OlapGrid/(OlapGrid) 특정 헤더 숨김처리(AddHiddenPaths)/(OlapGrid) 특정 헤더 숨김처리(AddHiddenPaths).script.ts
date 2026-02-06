import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/
var button: Button | null = null;
var olapGrid: OlapGrid | null = null;

var initControlVariables = function () {
  button = Matrix.getObject("Button") as Button;
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;

  button.OnClick = function (s, e) {
    HIDE_PATH();
  };
};
initControlVariables();

var HIDE_PATH = function () {
  olapGrid!.ClearHiddenPaths(); //전체 숨김 내역 제거

  //년도가 2012 년이면 판매 단가를 표시하지 않는다.
  var cell: any;
  var path: string;
  for (var c = 0, len = olapGrid!.ColumnCount; c < len; c++) {
    cell = olapGrid!.getCell(0, c);
    if (cell.Field && cell.Field.Name == "판매단가") {
      if (cell.getHeaderValue("년도") == "2012") {
        //경로 정보를 구한다.
        path = getHiddenPath(cell.ColumnHeader);
        olapGrid!.AddHiddenPaths(path);
      }
    }
  }
  Matrix.doRefresh("OlapGrid");
};

var getHiddenPath = function (hCell: any): string {
  var path = "";
  var cell = hCell;
  while (true) {
    if (!cell || !cell.Field) break;

    if (cell.Measure) {
      path += "[" + cell.Key + "]";
    } else if (cell.GrandTotal) {
      path += "[#GRAND_TOTAL#]";
    } else if (cell.Total && cell.Reference) {
      path += "[#" + cell.Reference.Key + "#]";
    } else {
      path += "[" + cell.Key + "]";
    }
    cell = cell.Parent;
  }
  return path;
};
