/**
* 데이타 보호 레벨
* @enum
*/
export enum enFilterItemProtectLevel{

  /** 제거 보호 (연산자, value 고정) */
  "protectRemove_Value" = 4,

  /**  */
  "protectNone" = 0,

  /** 경고 메세지 */
  "protectRemoveWarn" = 1,

  /** 제거 보호 */
  "protectRemove" = 2,

  /** 제거, 연산자 고정 */
  "protectRemove_Operator" = 3,

}
