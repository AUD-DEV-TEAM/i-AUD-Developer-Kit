import { enDialogButtonType } from "../../aud/enums/comm/enDialogButtonType";
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
   * 다이얼로그의 위치를 변경합니다.
   *
  * @param left 이동할 좌표(Left)
  * @param top 이동할 좌표(Top)
  */
  SetPosition(left: number, top: number): void;

  /** 
   * 버튼을 클릭한 효과를 발생합니다.
   *
  * @param buttonType 버튼 타입
  */
  Trigger(buttonType: enDialogButtonType): Function;

  /** 
   * 다이얼로그 박스의 크기를 변경합니다.
   *
  * @param width 너비
  * @param height 높이
  */
  setSize(width: number, height: number): void;

}
