import { DataRow } from "../../../aud/data/DataRow";
import { enTotalRowType } from "../../../aud/enums/grid/enTotalRowType";
import { DataGridCell } from "../../../aud/control/grids/DataGridCell";
/**
* 그리드의 레코드에 대한  대한 모델
*/
export interface DataGridRow{

  /**
   * 실제 레코드 객체
  */
  Data: DataRow;

  /**
   * 레코드 group 타입
  */
  RowType: enTotalRowType;

  /** 
   * 특정 필드의 데이터를 반환해주는 메소드
   *
  * @param fieldName 필드명
  */
  GetCell(fieldName: string): DataGridCell;

  /** 
   * 특정 필드의 값을 반환해주는 메소드
   *
  * @param fieldName 필드명
  */
  GetValue(fieldName: string): any;

  /** 
   * 특정 필드의 값을 설정해주는 메소드
   *
  * @param fieldName 필드명
  * @param value 설정할 값
  */
  SetValue(fieldName: string, value: string | number|null): void;

}
