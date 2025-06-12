import { Control } from "../../aud/control/Control";
import { Margin } from "../../aud/control/labels/Margin";
/**
* 사용자에게 텍스트를 표현할 수 있는 객체 입니다.
*/
export interface Label extends Control{

  /**
   * 컨트롤의 마우스 커서 모양을 지정합니다.
  */
  Cursor: string;

  /**
   * 계산 수식
  */
  Formula: string;

  /**
   * 컨트롤 다국어 코드
  */
  LanguageCode: string;

  /**
   * Margin 속성
  */
  Margin: Margin;

  /**
   * 텍스트
  */
  Text: string;

  /**
   * 텍스트의 길이가 컨트롤의 너비를 넘어갈 경우 자동으로 줄바꿈 사용 여부 (기본값 : false )
  */
  UseAutoLineBreak: boolean;

  /**
   * 텍스트의 길이가 컨트롤의 너비를 넘어갈 경우 말줄임표('...') 사용 여부 ( 기본값 : false )
  */
  UseTextOverflow: boolean;

  /**
   * 라벨의 Text 값. 하위호환성 지원을 위한 속성입니다.
  */
  Value: string;

  /** 
   * Label 의 툴팁을 설정하는 함수입니다.
   *
   * @hidden
  */
  SetTooltip(): void;

  /**
   * @event 
   *
   * 텍스트블럭이 클릭되는 시점에 발생합니다.
   *
   * @param args
   *
  */
  OnClick : (sender : Label
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트블럭에 마우스를 아웃하는 시점에 발생합니다.
   *
   * @param args
   *
  */
  OnMouseOut : (sender : Label
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트블럭에 마우스를 오버하는 시점에 발생합니다.
   *
   * @param args
   *
  */
  OnMouseOver : (sender : Label
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
  }
  ) => void;


}
