import { IMultiHeaderCell } from "../../../aud/control/olap/IMultiHeaderCell";
/**
* 멀티 헤더에 대한 정보를 제공합니다.
*/
export interface ScriptMultiHeader{

  /**
   * 필드 개수
  */
  ColumnCount: number;

  /**
   * 행 개수
  */
  RowCount: number;

  /**
   * 멀티헤더 사용 여부
  */
  UseMultiHeader: boolean;

  /** 
   * 특정 셀의 정보를 반환합니다.
   *
  * @param row Row
  * @param col Column
  */
  getCell(row: number, col: number): IMultiHeaderCell;

}
