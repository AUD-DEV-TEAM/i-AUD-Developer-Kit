import { enSortType } from "../../../aud/enums/schedule/enSortType";
/**
* 스케쥴 그리드 필드 모델
*/
export interface ScheduleField{

  /**
   * 표현 명
  */
  Caption: string;

  /**
   * 높이
  */
  Height: number;

  /**
   * 필드명
  */
  Name: string;

  /**
   * 정렬 기준 필드명
  */
  SortBaseFieldName: string;

  /**
   * 정렬 상태
  */
  SortType: enSortType;

  /**
   * 너비
  */
  Width: number;

}
