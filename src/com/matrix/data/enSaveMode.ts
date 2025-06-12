/**
* 필드 데이터 저장 방식
* @enum
*/
export enum enSaveMode{

  /** 삽입/수정/삭제 모두 동작 */
  "All" = 0,

  /** 삽입 동작만 수행 */
  "InsertOnly" = 1,

  /** 수정 동작만 수행 */
  "UpdateOnly" = 2,

}
