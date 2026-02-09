import { TableCell } from "../../../aud/control/table/TableCell";
import { enSizeType } from "../../../aud/enums/comm/enSizeType";
/**
* 테이블 레이아웃의 행을 구성하는 클래스.
*/
export interface TableRow{

  /**
   * 실제 행 높이
  */
  ActualHeight: number;

  /**
   * 셀 목록
  */
  Cells: TableCell[];

  /**
   * 행 높이
  */
  Height: number;

  /**
   * 행 높이 유형(0:Pixel/1:Star)
  */
  RowHeightType: enSizeType;

  /** 
   * 특정 셀을 찾는다.
   *
  * @param index 해당 찾으려는 셀의 열 인덱스 값
  */
  GetCell(index: number): TableCell;

}
