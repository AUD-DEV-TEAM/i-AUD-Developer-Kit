import { SolidColorBrush } from "../../aud/drawing/SolidColorBrush";
import { BorderInfo } from "../../aud/drawing/BorderInfo";
import { FontInfo } from "../../aud/drawing/FontInfo";
/**
* 컨트롤의 스타일을 설정합니다.
*/
export interface Style{

  /**
   * 배경
  */
  Background: SolidColorBrush;

  /**
   * 선
  */
  Border: BorderInfo;

  /**
   * 박스스타일 키
  */
  BoxStyle: string;

  /**
   * 폰트
  */
  Font: FontInfo;

  /**
   * 타입
  */
  Type: string;

  /** 
   * 박스스타일 키로 스타일을 적용합니다.
   *
   * @example
   * ```js
   *  //컨트롤의  스타일을 변경 합니다.
   *  //스타일은 이름 또는 키 값으로 변경하실 수 있습니다.
   *  var Button = Matrix.getObject("Button");  
   *  //Button.Style.SetBoxStyleKey("");
   *  Button.Style.SetBoxStyleName("ACTIVE_BUTTON");
   *  //스타일 변경 후 Update를 호출해야지 반영됩니다.
   *  Button.Update();
   * ```
  * @param boxStyleKey 박스스타일키
  */
  SetBoxStyleKey(boxStyleKey: string): string;

  /** 
   * 박스 스타일명으로 스타일을 적용합니다.
   *
   * @example
   * ```js
   *  //컨트롤의  스타일을 변경 합니다.
   *  //스타일은 이름 또는 키 값으로 변경하실 수 있습니다.
   *  var Button = Matrix.getObject("Button");  
   *  //Button.Style.SetBoxStyleKey("");
   *  Button.Style.SetBoxStyleName("ACTIVE_BUTTON");
   *  //스타일 변경 후 Update를 호출해야지 반영됩니다.
   *  Button.Update();
   * ```
  * @param boxStyleName 박스 스타일 명
  */
  SetBoxStyleName(boxStyleName: string): string;

}
