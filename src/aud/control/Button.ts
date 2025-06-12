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
