import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/

var olapGrid: OlapGrid | null = null;

var initControlVariables = function () {
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
};

/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
var OnDocumentLoadComplete = function (sender: any, args: any) {
  initControlVariables();
};
/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
var OnButtonClick = function (sender: any, args: any) {
  if (args.Id == "btn02") {
    updateMultiHeader();
  } else if (args.Id == "btn03") {
    olapGrid!.getMultiHeader().UseMultiHeader = false;
    olapGrid!.Refresh();
  }
};

/**
 * 멀티 헤더 변경하기
 *   년도 별도 묶는다.
 */
var updateMultiHeader = function () {
  var mHeader = olapGrid!.CreateMultiHeaders(2);
  mHeader.UseMultiHeader = true;
  var beforeYear = "";
  var currentYear = "";
  var beginIndex = -1;
  var colspan = 1;
  var lastRowIndex = mHeader.RowCount - 1;
  var cell: any;
  for (var c = 0; c < mHeader.ColumnCount; c++) {
    cell = mHeader.getCell(lastRowIndex, c);
    cell.Align = 2;
    currentYear = cell.Text; //마지막 셀(필드명이 표시된 셀을 읽어 온다
    if (currentYear.indexOf("_") > 0) {
      currentYear = currentYear.substring(0, currentYear.indexOf("_"));
    }
    if (currentYear != beforeYear) {
      if (beginIndex >= 0) {
        cell = mHeader.getCell(0, beginIndex);
        cell.ColSpan = colspan;
        cell.Text = beforeYear;
        cell.Align = 2; /*Center*/
      }
      beginIndex = c;
      colspan = 1;
    } else {
      colspan++;
    }
    beforeYear = currentYear;
  }
  // 마지막 점검
  if (colspan > 1 && beginIndex >= 0) {
    cell = mHeader.getCell(0, beginIndex);
    cell.ColSpan = colspan;
    cell.Text = beforeYear;
    cell.Align = 2; /*Center*/
  }

  olapGrid!.Refresh();
};
