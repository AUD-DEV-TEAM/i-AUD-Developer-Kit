import { MultiHeaderCell } from "../../../aud/control/grids/MultiHeaderCell";
import { Control } from "../../../aud/control/Control";
/**
* 데이터 그리드의 멀티 헤더에 대한 정보를 제공합니다.
*/
export interface MultiHeader{

  /**
   * 멀티 헤더 셀 목록
  */
  Children: MultiHeaderCell;

  /**
   * 최대 열 개수
  */
  MaxColumn: number;

  /**
   * 최대 행 개수
  */
  MaxRow: number;

  /** 
   * 멀티헤더 객체에 정의된 특정 위치의 셀을 반환합니다.
   *
  * @param RowIndex 찾으려는 셀의 Row 인덱스
  * @param ColumnIndex 찾으려는 셀의 Column 인덱스
  */
  GetCell(RowIndex: number, ColumnIndex: number): MultiHeaderCell;

  /** 
   * 멀티헤더 객체에 정의된 컨트롤을 반환합니다.
   *
  * @param name 찾으려는 컨트롤 이름
  */
  GetControl(name: string): Control;

}
