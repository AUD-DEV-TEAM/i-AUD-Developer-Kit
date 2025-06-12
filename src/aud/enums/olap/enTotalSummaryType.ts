/**
* i-OLAP 소계의 집계 함수 구분
* @enum
*/
export enum enTotalSummaryType{

  /** None */
  "None" = 0,

  /** SumOfChild */
  "SumOfChild" = 1,

  /** MinOfChild */
  "MinOfChild" = 2,

  /** MaxOfChild */
  "MaxOfChild" = 3,

  /** AverageOfChild */
  "AverageOfChild" = 4,

  /** CountOfChild */
  "CountOfChild" = 5,

}
