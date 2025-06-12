/**
* i-OLAP 집계 함수 구분
* @enum
*/
export enum enSummaryType{

  /** None */
  "None" = 0,

  /** Sum */
  "Sum" = 1,

  /** Min */
  "Min" = 2,

  /** Max */
  "Max" = 3,

  /** Average */
  "Average" = 4,

  /** Count */
  "Count" = 5,

  /** Calculate */
  "Calculate" = 9,

  /** DistinctCount */
  "DistinctCount" = 13,

  /** Text */
  "Text" = 14,

}
