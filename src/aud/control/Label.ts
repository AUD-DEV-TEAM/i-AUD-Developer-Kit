import { Control } from "../../aud/control/Control";
import { Margin } from "../../aud/control/labels/Margin";
/**
* 텍스트를 표시할 수 있는 라벨 컨트롤입니다.
*/
export interface Label extends Control{

  /**
   * 컨트롤의 마우스 커서 모양을 가져오거나 설정합니다.
  */
  Cursor: string;

  /**
   * 계산 수식을 가져오거나 설정합니다.
  */
  Formula: string;

  /**
   * 다국어 코드를 가져오거나 설정합니다.
  */
  LanguageCode: string;

  /**
   * Margin 속성을 가져오거나 설정합니다.
  */
  Margin: Margin;

  /**
   * 표시 텍스트를 가져오거나 설정합니다.
  */
  Text: string;

  /**
   * 텍스트의 길이가 컨트롤의 너비를 넘어갈 경우 자동 줄바꿈 사용 여부를 가져오거나 설정합니다. (기본값: false)
  */
  UseAutoLineBreak: boolean;

  /**
   * 텍스트의 길이가 컨트롤의 너비를 넘어갈 경우 말줄임표('...') 사용 여부를 가져오거나 설정합니다. (기본값: false)
  */
  UseTextOverflow: boolean;

  /**
   * 라벨의 Text 값을 가져오거나 설정합니다. 하위 호환성 지원을 위한 속성입니다.
  */
  Value: string;

  /**
   * 라벨의 툴팁을 설정합니다.
   *
   * @hidden
  */
  SetTooltip(): void;

  /**
   * @event
   *
   * 라벨이 클릭될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 라벨 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Label}
  */
  OnClick : (sender : Label
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 표시 텍스트
    */
    Text: string
  }
  ) => void;


  /**
   * @event
   *
   * 라벨에서 마우스가 벗어날 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 라벨 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Label}
  */
  OnMouseOut : (sender : Label
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 표시 텍스트
    */
    Text: string
  }
  ) => void;


  /**
   * @event
   *
   * 라벨에 마우스를 올릴 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 라벨 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Label}
  */
  OnMouseOver : (sender : Label
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 표시 텍스트
    */
    Text: string
  }
  ) => void;


}
