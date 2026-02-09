import { TableColumn } from "../../../aud/control/table/TableColumn";
import { Control } from "../../../aud/control/Control";
import { TableMergeCell } from "../../../aud/control/table/TableMergeCell";
import { TableRow } from "../../../aud/control/table/TableRow";
import { enCellType } from "../../../aud/enums/comm/enCellType";
/**
* 테이블 레이아웃의 단일 셀을 구성하는 컨트롤.
*/
export interface TableCell{

  /**
   * 해당 셀의 열 객체
  */
  Column: TableColumn;

  /**
   * 셀 내부 컨트롤
  */
  InnerControl: Control;

  /**
   * 해당 셀을 구성원으로 가지고 있는 병합 셀 객체
  */
  MergeCell: TableMergeCell;

  /**
   * 해당 셀의 행 객체
  */
  Row: TableRow;

  /**
   * 셀 유형
  */
   readonly Type: enCellType;

  /** 
   * 셀 타입을 변경하는 메소드
   *
  * @param value 변경하려는 셀 타입
  */
  SetType(value: enCellType): void;

}
