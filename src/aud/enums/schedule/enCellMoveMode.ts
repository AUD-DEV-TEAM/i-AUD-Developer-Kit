/**
* 행열 축 유형
* @enum
*/
export enum enCellMoveMode{

  /** 새로운 줄에 생성 */
  NewLine = 0,

  /** 셀 사이에 삽입 */
  Insert = 1,

  /** 셀 겹침 허용 */
  Overlap = 2,

  /** 동작 안함 */
  Stop = 3,

}
