import { ScheduleCell } from "../../../aud/ext/schedule/ScheduleCell";
import { DataRow } from "../../../aud/data/DataRow";
/**
* 스케쥴 열 아이템
*/
export interface ScheduleRow{

  /**
   * 스케쥴 셀 목록
  */
  Cells: ScheduleCell[];

  /**
   * 데이터 레코드
  */
  DataRow: DataRow;

  /**
   * 상위 열
  */
  ParentNode: ScheduleRow;

}
