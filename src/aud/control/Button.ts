import { Control } from "../../aud/control/Control";
/**
* 버튼 컨트롤로 사용자에게 명령을 실행할 수 있는 버튼을 표현합니다.
*/
export interface Button extends Control{

  /**
   * 컨트롤의 마우스 커서 모양을 지정합니다.
  */
  Cursor: string;

  /**
   * 컨트롤 다국어 코드
  */
  LanguageCode: string;

  /**
   * 텍스트
  */
  Text: string;

  /** 
   * MouseDown 했을 때 적용할 BoxStyle을 지정합니다.
BoxStyle이 존재하지 않거나, Style 속성이 없을 경우 설정되지 않습니다.
   *
   * @example
   * ```js
   * // MouseDown 시 BoxStyle을 변경 합니다.
   * // BoxStyle은 이름 또는 Key 값으로 변경하실 수 있습니다.
   * // Button.SetMouseDownBoxStyle("");
   * var Button = Matrix.getObject("Button");
   * // Key를 입력한 경우
   * Button.SetMouseDownBoxStyle("BX5DF3C663CEBD410DB823074438DD30C6");
   * // 이름을 입력한 경우
   * Button.SetMouseDownBoxStyle("PRIMARY_BTN_Default");
   * ```
  * @param boxStyleIdentifier BoxStyle의 Key 또는 이름
   * @hidden
  */
  SetMouseDownBoxStyle(boxStyleIdentifier: string): void;

  /** 
   * MouseOver 했을 때 적용할 BoxStyle을 지정합니다.
BoxStyle이 존재하지 않거나, Style 속성이 없을 경우 설정되지 않습니다.
   *
   * @example
   * ```js
   * // MouseOver 시 BoxStyle을 변경 합니다.
   * // BoxStyle은 이름 또는 Key 값으로 변경하실 수 있습니다.
   * // Button.SetMouseOverBoxStyle("");
   * var Button = Matrix.getObject("Button");
   * // Key를 입력한 경우
   * Button.SetMouseOverBoxStyle("BXCAF656A487E84A92A16419B0ACC273D0");
   * // 이름을 입력한 경우
   * Button.SetMouseOverBoxStyle("PRIMARY_BTN_Hover");
   * ```
  * @param boxStyleIdentifier BoxStyle의 Key 또는 이름
   * @hidden
  */
  SetMouseOverBoxStyle(boxStyleIdentifier: string): void;

  /**
   * @event 
   *
   * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Button}
  */
  OnClick : (sender : Button
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
  }
  ) => void;


}
