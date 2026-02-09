import { ScheduleCell } from "../../../aud/ext/schedule/ScheduleCell";
/**
* 스케줄 그리드 selection 모델
*/
export interface SelectionModel{

  /**
   * 선택한 셀들
  */
  Cells: ScheduleCell[];

}
