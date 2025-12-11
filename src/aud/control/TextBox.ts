import { Control } from "../../aud/control/Control";
import { enInputType } from "../../aud/enums/comm/enInputType";
import { Event } from "../../aud/data/Event";
/**
* 텍스트 박스 컨트롤 입니다.
*/
export interface TextBox extends Control{

  /**
   * 계산 수식
  */
  Formula: string;

  /**
   * 텍스트 박스 타입
  */
  InputType: enInputType;

  /**
   * 읽기전용
  */
  IsReadOnly: boolean;

  /**
   * 최대 입력 글자수 제한
  */
  MaxLength: number;

  /**
   * 컨트롤의 PaddingLeft(default: 6)
  */
  PaddingLeft: number;

  /**
   * 컨트롤의 PaddingRight(default: 6)
  */
  PaddingRight: number;

  /**
   * 텍스트
  */
  Text: string;

  /**
   * Placeholder 사용 유무(default: false)
  */
  UsePlaceholder: boolean;

  /** 
   * 해당 컨트롤의 Placeholder 텍스트를 지정합니다. UsePlaceholder가 true일 경우만 사용 가능합니다.
   *
  * @param placeholdervalue String 형식의 텍스트
  */
  SetPlaceholder(placeholdervalue: string): void;

  /**
   * @event 
   *
   * 텍스트 박스 컨트롤의 텍스트가 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link TextBox}
  */
  OnTextChange : (sender : TextBox
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트 박스 컨트롤의 key 입력 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link TextBox}
  */
  OnTextKeydown : (sender : TextBox
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트 박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   *
   * @example
   * ```js
   *     //텍스트 박스에 Enter 입력 시 조회 하기
   *     var tbxFilter = Matrix.getObject("tbxFilter");
   *     tbxFilter.OnTextKeypress = function (s, e) {
   *         if (e.Event.isEnter()) { //Enter 키 클릭 시
   * 			Matrix.doRefresh("Grid");
   *         }
   *     };
   * ```
   * @param args
   *
   * Target : {@link TextBox}
  */
  OnTextKeypress : (sender : TextBox
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트 박스 컨트롤의 key 입력 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link TextBox}
  */
  OnTextKeyup : (sender : TextBox
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
    */
    Event: Event
  }
  ) => void;


}
