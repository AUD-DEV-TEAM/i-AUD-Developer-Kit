/**
* i-OLAP Hybrid 방식의 SQL집계 함수
* @enum
*/
export enum enGroupByType{

  /** Auto */
  Auto = 0,

  /** Sum */
  Sum = 1,

  /** Count */
  Count = 2,

  /** Max */
  Max = 3,

  /** Min */
  Min = 4,

  /** Average */
  Average = 5,

  /** DistinctCount */
  DistinctCount = 6,

  /** None */
  None = 7,

  /** AlwaysGroupBy */
  AlwaysGroupBy = 8,

}
