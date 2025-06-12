import { IWorkSheet } from "../../../aud/control/igrids/IWorkSheet";
import { ICell } from "../../../aud/control/igrids/ICell";
import { IRow } from "../../../aud/control/igrids/IRow";
import { IColumn } from "../../../aud/control/igrids/IColumn";
import { ISelectionArea } from "../../../aud/control/igrids/ISelectionArea";
/**
* MX_GRID 유틸리티
*/
export interface XLS_UTIL{

  /** 
   * 시트에 셀을 추가 합니다.
   *
  * @param ws 
  * @param cell 
  */
  addCell(ws: IWorkSheet, cell: ICell): boolean;

  /** 
   * 전달된 주소에 맞는 셀을 생성해서 반환 합니다.
   *
  * @param row  row 모델
  * @param column column 모델
  */
  createCell(row: IRow, column: IColumn): ICell;

  /** 
   *  시트에 행/열이 주어진 수보다 작을 경우 행/열을 생성하고 빈셀을 생성합니다.
   *
  * @param ws 워크 시트 모델
  * @param rows 행의 최대 수
  * @param columns 열의 최대 수
  */
  expandCellsToIndex(ws: IWorkSheet, rows: number, columns: number): boolean;

  /** 
   *  시트에 열이 주어진 열 수 보다 작을 경우 해당 수량 만큼 생성합니다.
   *
  * @param ws 
  * @param columns 
  */
  expandColumnsToIndex(ws: IWorkSheet, columns: number): boolean;

  /** 
   *  시트에 행이 주어진 행 수 보다 작을 경우 해당 수량 만큼 생성합니다.
   *
  * @param ws 
  * @param rows 
  */
  expandRowsToIndex(ws: IWorkSheet, rows: number): boolean;

  /** 
   * 주어진 주소 영역 값으로 영역의 위치 값을 반환 합니다.
   *
  * @param range 
  */
  getAreaFromRange(range: string): ISelectionArea;

  /** 
   * 시트의 특정 셀을 반환 합니다. 모델이 없으면 임시 생성한 모델을 반환 합니다.
   *
  * @param ws 
  * @param row 
  * @param column 
  */
  getCell(ws: IWorkSheet, row: number, column: number): ICell;

  /** 
   * 주어진 컬럼 위치 값으로 엑셀 컬럼의 주소 값을 반환 합니다.
   *
  * @param column 
  */
  getColumnName(column: string): string;

  /** 
   * 주어진 위치 값으로 엑셀의 주소값을 반환 합니다.
   *
  * @param row 
  * @param column 
  */
  getRangeName(row: number, column: number): string;

  /** 
   * 주어진 엑셀 주소값을 계산된 행/열 번호로 반환 합니다.
   *
  * @param address 
  */
  parseExcelAddress(address: string): {"R":number, "C":number};


  isEmptyBorder(borderStyle:string):boolean;
}
