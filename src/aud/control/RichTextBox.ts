import { Control } from "../../aud/control/Control";
import { Event } from "../../aud/data/Event";
/**
* 리치 텍스트 박스 컨트롤입니다.
*/
export interface RichTextBox extends Control{

  /**
   * 계산 수식을 가져오거나 설정합니다.
  */
  Formula: string;

  /**
   * 읽기 전용 여부를 가져오거나 설정합니다.
  */
  IsReadOnly: boolean;

  /**
   * 최대 입력 글자 수 제한을 가져오거나 설정합니다.
  */
  MaxLength: number;

  /**
   * 컨트롤의 왼쪽 여백을 가져오거나 설정합니다. (기본값: 6)
  */
  PaddingLeft: number;

  /**
   * 컨트롤의 오른쪽 여백을 가져오거나 설정합니다. (기본값: 6)
  */
  PaddingRight: number;

  /**
   * 텍스트를 가져오거나 설정합니다.
  */
  Text: string;

  /**
   * Placeholder 사용 여부를 가져오거나 설정합니다. (기본값: false)
  */
  UsePlaceholder: boolean;

  /**
   * 해당 컨트롤의 Placeholder 텍스트를 지정합니다. UsePlaceholder가 true일 경우만 사용 가능합니다. (개행 문자: \n)
   *
  * @param placeholdervalue 문자열 형식의 텍스트
  */
  SetPlaceholder(placeholdervalue: string): void;

  /**
   * @event
   *
   * 리치 텍스트 박스 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 리치 텍스트 박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link RichTextBox}
  */
  OnTextChange : (sender : RichTextBox
  , args : {
    /**
     * 컨트롤 이름
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
   * 리치 텍스트 박스 컨트롤에서 키를 누를 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 리치 텍스트 박스 컨트롤
   * @param args 이벤트 인자
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
     * 키 이벤트 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event
   *
   * 리치 텍스트 박스 컨트롤에서 키를 누르고 있는 동안 발생합니다.
   *
   * @param sender 이벤트가 발생한 리치 텍스트 박스 컨트롤
   * @param args 이벤트 인자
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
     * 키 이벤트 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event
   *
   * 리치 텍스트 박스 컨트롤에서 키를 뗄 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 리치 텍스트 박스 컨트롤
   * @param args 이벤트 인자
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
     * 키 이벤트 객체
    */
    Event: Event
  }
  ) => void;


}
