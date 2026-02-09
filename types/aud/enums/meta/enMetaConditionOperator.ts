/**
* 필터 조건 operator 유형
* @enum
*/
export enum enMetaConditionOperator{

  /** opEqual */
  "opEqual" = 0,

  /** opLessthen */
  "opLessthen" = 1,

  /** opGreaterthen */
  "opGreaterthen" = 2,

  /** opLessEqual */
  "opLessEqual" = 3,

  /** opGreaterEqual */
  "opGreaterEqual" = 4,

  /** opNot */
  "opNot" = 5,

  /** opLike */
  "opLike" = 6,

  /** opNotLike */
  "opNotLike" = 7,

  /** opIn */
  "opIn" = 8,

  /** opNotIn */
  "opNotIn" = 9,

  /** opIsNull */
  "opIsNull" = 10,

  /** opIsNotNull */
  "opIsNotNull" = 11,

  /** opBetween */
  "opBetween" = 12,

  /** opAnd */
  "opAnd" = 13,

  /** opOr */
  "opOr" = 14,

  /** opNotBetween */
  "opNotBetween" = 15,

  /** opStartWith */
  "opStartWith" = 16,

  /** opEndWith */
  "opEndWith" = 17,

  /** opContains */
  "opContains" = 18,

  /** opNotContains */
  "opNotContains" = 19,

}
