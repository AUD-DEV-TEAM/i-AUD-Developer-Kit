import { enDialogButtonType } from "../../aud/enums/comm/enDialogButtonType";
/**
 * 다이얼로그 박스 컨트롤입니다.
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
  * @param left 이동할 왼쪽(Left) 좌표
  * @param top 이동할 위쪽(Top) 좌표
  */
  SetPosition(left: number, top: number): void;

  /**
   * 지정한 버튼의 클릭 효과를 발생시킵니다.
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
