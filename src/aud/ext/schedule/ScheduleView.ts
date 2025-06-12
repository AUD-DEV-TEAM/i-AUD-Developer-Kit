import { ScheduleCell } from "../../../aud/ext/schedule/ScheduleCell";
/**
* 스케줄 그리드 view
*/
export interface ScheduleView{

  /**
   * 마우스 우클릭 시 선택된 셀
  */
  MenuCell: ScheduleCell;

  /**
   * 현재 화면에 보이는 셀들
  */
  visibleCell: ScheduleCell[];

  /** 
   * 차트의 현재 정보를 기준으로 새로 그립니다.
   *
  */
  Draw(): void;

  /** 
   * 조건에 만족하는 셀을 찾는다.
   *
  * @param fieldName 탐색할 필드명
  * @param value 검색 값
  */
  FocusCell(fieldName: string, value: string): void;

}
