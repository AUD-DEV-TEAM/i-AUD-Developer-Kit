import { DayOfWeek } from "../../../aud/enums/comm/DayOfWeek";
/**
* 라인(설비) 스케쥴
*/
export interface LineSchedule{

  /** 
   * 라인 정지 일정 추가(특정일)
   *
  * @param year 년
  * @param month 월
  * @param day 일
  */
  AddStopSpecialDay(year: number, month: number, day: number): void;

  /** 
   * 라인 정지 일정 추가(매일 반복)
   *
  * @param beginHour 시작시간
  * @param endHour 종료시간
  */
  AddStopTimeDaily(beginHour: number, endHour: number): void;

  /** 
   * 라인 정지 일정 추가(월간 반복)
   *
  * @param day 일
  */
  AddStopTimeMonthly(day: number): void;

  /** 
   * 라인 정지 일정 추가(주간 반복)
   *
  * @param dayOfweek 일
  */
  AddStopTimeWeekly(dayOfweek: DayOfWeek): void;

  /** 
   * 라인 정지 일정 추가(주간 반복 시작~종료 시간)
   *
  * @param dayOfweek 일
  * @param beginHour 시작시간
  * @param endHour 종료시간
  */
  AddStopTimeWeeklyBetween(dayOfweek: DayOfWeek, beginHour: number, endHour: number): void;

  /** 
   * 라인 정지 일정 추가(년간 반복)
   *
  * @param month 월
  * @param day 일
  */
  AddStopTimeYearly(month: number, day: number): void;

  /** 
   * 라인 정지 일정 모두 제거
   *
  */
  StopTimeClear(): void;

}
