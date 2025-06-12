/**
* 기간별 비교분석 기간 유형
* @enum
*/
export enum enMetaPeriodType{

  /** 현재일 */
  "CurrentDate" = 0,

  /** Date() 함수 */
  "DateFunction" = 1,

  /** 직접입력 */
  "DirectlyInput" = 2,

  /** 전년 */
  "PrevYear" = 3,

  /** 전년동월 */
  "PrevYearSameMonth" = 4,

  /** 동년전월 */
  "SameYearPrevMonth" = 5,

  /** 전년동월동일 */
  "PrevYearSameMonthSameDay" = 6,

  /** 동년전월동일 */
  "SameYearPrevMonthSameDay" = 7,

  /** 전일 */
  "Yesterday" = 8,

}
