/**
* 필드 키 유형
* @enum
*/
export enum enKeyType{

  /** 없음 */
  None = 0,

  /** Null 값을 허용하지 않음 */
  NotNull = 1,

  /** Null 값 허용 */
  NullAble = 2,

  /** 기본 키 값 */
  Primary = 3,

}
