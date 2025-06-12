import { Control } from "../../aud/control/Control";
import { Event } from "../../aud/data/Event";
/**
* 리치텍스트 박스 컨트롤 입니다.
*/
export interface RichTextBox extends Control{

  /**
   * 계산 수식
  */
  Formula: string;

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
   * 해당 컨트롤의 Placeholder 텍스트를 지정합니다. UsePlaceholder가 true일 경우만 사용 가능합니다. (개행 문자: \n)
   *
  * @param placeholdervalue String 형식의 텍스트
  */
  SetPlaceholder(placeholdervalue: string): void;

  /**
   * @event 
   *
   * 리치 텍스트 박스 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link RichTextBox}
  */
  OnTextChange : (sender : RichTextBox
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 기존 값
    */
    OldValue: string
    /**
     * 현재 값
    */
    NewValue: string
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트 박스 컨트롤의 key 입력 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link RichTextBox}
  */
  OnTextKeydown : (sender : RichTextBox
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
     * 리치 텍스트 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트 박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   *
   * @param args
   *
   * Target : {@link RichTextBox}
  */
  OnTextKeypress : (sender : RichTextBox
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
     * 리치 텍스트 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트 박스 컨트롤의 key 입력 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link RichTextBox}
  */
  OnTextKeyup : (sender : RichTextBox
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
     * 리치 텍스트 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


}
