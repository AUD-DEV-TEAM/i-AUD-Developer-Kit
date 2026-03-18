import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;

let olapGrid: OlapGrid | null = null;

const initControlVariables = function (): void {
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
};

/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
const OnDocumentLoadComplete = function (_sender: any, _args: any): void {
  initControlVariables();
};
/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
const OnButtonClick = function (_sender: any, args: any): void {
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
const updateMultiHeader = function (): void {
  const mHeader = olapGrid!.CreateMultiHeaders(2);
  mHeader.UseMultiHeader = true;
  let beforeYear = "";
  let currentYear = "";
  let beginIndex = -1;
  let colspan = 1;
  const lastRowIndex = mHeader.RowCount - 1;
  let cell: any;
  for (let c = 0; c < mHeader.ColumnCount; c++) {
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
