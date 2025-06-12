/**
* i-OLAP 2차 집계 방식
* @enum
*/
export enum enSummaryVariation{

  /** None */
  None = 0,

  /** Absolute */
  Absolute = 1,

  /** Percent */
  Percent = 2,

  /** PercentOfColumn */
  PercentOfColumn = 3,

  /** PercentOfRow */
  PercentOfRow = 4,

  /** SubTotalPercentOfColumn */
  SubTotalPercentOfColumn = 5,

  /** SubTotalPercentOfRow */
  SubTotalPercentOfRow = 6,

  /** RunningAverage */
  RunningAverage = 7,

  /** RunningCount */
  RunningCount = 8,

  /** RunningMax */
  RunningMax = 9,

  /** RunningMin */
  RunningMin = 10,

  /** RunningProduct */
  RunningProduct = 11,

  /** RunningSum */
  RunningSum = 12,

  /** FirstPeriod */
  FirstPeriod = 15,

  /** LastPeriod */
  LastPeriod = 16,

  /** PeriodIncrease */
  PeriodIncrease = 17,

  /** PeriodIncreaseRate */
  PeriodIncreaseRate = 18,

}
