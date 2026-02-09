import { TableCell } from "../../../aud/control/table/TableCell";
import { enCellType } from "../../../aud/enums/comm/enCellType";
/**
* 테이블 레이아웃의 병합 셀을 구성하는 컨트롤.
*/
export interface TableMergeCell{

  /**
   * 병합되어져있는 셀 목록
  */
  Cells: TableCell[];

  /**
   * 열 병합 수
  */
  ColSpan: number;

  /**
   * 행 병합 수
  */
  RowSpan: number;

  /** 
   * 셀 타입을 변경하는 메소드
   *
  * @param value 변경하려는 셀 타입
  */
  SetType(value: enCellType): void;

}
