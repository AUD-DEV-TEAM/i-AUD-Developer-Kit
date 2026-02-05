import { Control } from "../../aud/control/Control";
import { Event } from "../../aud/data/Event";
/**
* 마스크 텍스트 박스 컨트롤입니다.
*/
export interface MaskTextBox extends Control{

  /**
   * 마스크 포맷을 가져오거나 설정합니다.
  */
  Format: string;

  /**
   * 계산 수식을 가져오거나 설정합니다.
  */
  Formula: string;

  /**
   * 읽기 전용 여부를 가져오거나 설정합니다.
  */
  IsReadOnly: boolean;

  /**
   * 컨트롤의 왼쪽 여백을 가져오거나 설정합니다. (기본값: 6)
  */
  PaddingLeft: number;

  /**
   * 컨트롤의 오른쪽 여백을 가져오거나 설정합니다. (기본값: 6)
  */
  PaddingRight: number;

  /**
   * 표시 텍스트를 가져오거나 설정합니다.
  */
  Text: string;

  /**
   * Placeholder 사용 여부를 가져오거나 설정합니다. (기본값: false)
  */
  UsePlaceholder: boolean;

  /**
   * 값을 가져오거나 설정합니다.
  */
  Value: string;

  /**
   * Placeholder 텍스트를 지정합니다. UsePlaceholder가 true일 경우만 사용 가능합니다.
   *
  * @param placeholdervalue Placeholder 텍스트
  */
  SetPlaceholder(placeholdervalue: string): void;

  /**
   * @event
   *
   * 마스크 텍스트 박스의 값이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 마스크 텍스트 박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MaskTextBox}
  */
  OnTextChange : (sender : MaskTextBox
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
    /**
     * 컨트롤 값
    */
    Text: string
  }
  ) => void;


  /**
   * @event
   *
   * 마스크 텍스트 박스에서 키를 누를 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 마스크 텍스트 박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MaskTextBox}
  */
  OnTextKeydown : (sender : MaskTextBox
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
   * 마스크 텍스트 박스에서 키를 누르고 있는 동안 발생합니다.
   *
   * @example
   * ```js
   * // 텍스트 박스에 Enter 입력 시 조회하기
   * var tbxFilter = Matrix.getObject("tbxFilter");
   * tbxFilter.OnTextKeypress = function (s, e) {
   *     if (e.Event.isEnter()) {
   *         Matrix.doRefresh("Grid");
   *     }
   * };
   * ```
   * @param sender 이벤트가 발생한 마스크 텍스트 박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MaskTextBox}
  */
  OnTextKeypress : (sender : MaskTextBox
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
   * 마스크 텍스트 박스에서 키를 뗄 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 마스크 텍스트 박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MaskTextBox}
  */
  OnTextKeyup : (sender : MaskTextBox
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
