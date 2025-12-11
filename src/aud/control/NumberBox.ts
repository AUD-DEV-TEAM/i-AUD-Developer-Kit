import { Control } from "../../aud/control/Control";
import { Event } from "../../aud/data/Event";
/**
* 넘버 박스 컨트롤 입니다.
*/
export interface NumberBox extends Control{

  /**
   * 숫자 포멧(허용 포멧 : [ # ], [ 0 ], [ , ], [ . ])
  */
  Format: string;

  /**
   * 계산 수식
  */
  Formula: string;

  /**
   * 읽기전용
  */
  IsReadOnly: boolean;

  /**
   * 최대값
  */
  Maximum: number;

  /**
   * 최소값
  */
  Minimum: number;

  /**
   * Null 허용 여부
   * @hidden
  */
  NotNull: boolean;

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
  Text: string | number;

  /**
   * Placeholder 사용 유무(default: false)
  */
  UsePlaceholder: boolean;

  /**
   * 값
  */
  Value: number;

  /** 
   * 해당 컨트롤의 Placeholder 텍스트를 지정합니다. UsePlaceholder가 true일 경우만 사용 가능합니다.
   *
  * @param placeholdervalue String 혹은 Number 형식의 텍스트
  */
  SetPlaceholder(placeholdervalue: string): void;

  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 숫자가 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link NumberBox}
  */
  OnTextChange : (sender : NumberBox
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
   * 넘버 박스 컨트롤의 key 입력 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link NumberBox}
  */
  OnTextKeydown : (sender : NumberBox
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
     * 넘버 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 key 입력 누르는 동안 발생합니다.
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
   * Target : {@link NumberBox}
  */
  OnTextKeypress : (sender : NumberBox
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
     * 넘버 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 key 입력 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link NumberBox}
  */
  OnTextKeyup : (sender : NumberBox
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
     * 넘버 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


}
