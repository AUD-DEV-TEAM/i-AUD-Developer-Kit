/**
* 다이얼로그 박스
*/
export interface DialogBox{

  /** 
   * 다이얼로그 박스를 닫습니다.
   *
  */
  Close(): void;

  /** 
   * 다이얼로그 박스의 크기를 변경합니다.
   *
  * @param width 너비
  * @param height 높이
  */
  setSize(width: number, height: number): void;

}
