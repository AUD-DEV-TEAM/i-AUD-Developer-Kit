/**
* 롤업 유형
* @enum
*/
export enum enMetaFieldMetaRollupTypeDescription{

  /** None */
  "None" = 0,

  /** 쿼리 단에서 풀리는 계산 필드 */
  "Before" = 1,

  /** OLAP 그리드에 넘어가서 풀리는 계산 필드 */
  "After" = 2,

  /** Before, After 둘다 계산식이 존재하는 항목 */
  "Both" = 3,

}
