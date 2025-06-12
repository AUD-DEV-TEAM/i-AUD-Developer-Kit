/**
* 필드 데이터 유형
* @enum
*/
export enum enDataType{

  /** 수치형 */
  "Numeric" = 0,

  /** 문자형 */
  "String" = 1,

  /** yyyyMMdd 형식의 날짜 */
  "DateTime8" = 2,

  /** 시스템 날짜(시간) */
  "DateTimeNow" = 3,

  /** 접속 사용자 계정 */
  "UserCode" = 4,

  /** CLOB */
  "CLOB" = 5,

  /**  */
  "UUID" = 7,

}
