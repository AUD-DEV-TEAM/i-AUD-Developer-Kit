import { Control } from "../../aud/control/Control";
import { Event } from "../../aud/data/Event";
/**
 * 숫자 입력을 위한 넘버 박스 컨트롤입니다.
 *
 * @example
 * ```js
 * // 넘버박스 기본 사용
 * var nbxAmount = Matrix.getObject("nbxAmount");
 * nbxAmount.Format = "#,##0";
 * nbxAmount.Value = 1234567;
 * console.log(nbxAmount.Text); // "1,234,567"
 * ```
 */
export interface NumberBox extends Control{

  /**
   * 숫자 포맷을 가져오거나 설정합니다. (허용 포맷: #, 0, 콤마, 마침표)
   *
   * @example
   * ```js
   * // 다양한 숫자 포맷 예시
   * nbxAmount.Format = "#,##0";        // 천단위 콤마: 1,234,567
   * nbxPrice.Format = "#,##0.00";      // 소수점 2자리: 1,234.56
   * nbxRate.Format = "0.0%";           // 퍼센트: 12.5%
   * nbxQty.Format = "###0";            // 콤마 없음: 1234
   * ```
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
   * 최대값을 가져오거나 설정합니다.
  */
  Maximum: number;

  /**
   * 최소값을 가져오거나 설정합니다.
  */
  Minimum: number;

  /**
   * Null 허용 여부를 가져오거나 설정합니다.
   * @hidden
  */
  NotNull: boolean;

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
  Text: string | number;

  /**
   * Placeholder 사용 여부를 가져오거나 설정합니다. (기본값: false)
  */
  UsePlaceholder: boolean;

  /**
   * 값을 가져오거나 설정합니다.
  */
  Value: number;

  /**
   * 해당 컨트롤의 Placeholder 텍스트를 지정합니다. UsePlaceholder가 true일 경우만 사용 가능합니다.
   *
  * @param placeholdervalue 문자열 또는 숫자 형식의 텍스트
  */
  SetPlaceholder(placeholdervalue: string): void;

  /**
   * @event
   *
   * 넘버 박스 컨트롤의 숫자가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 넘버 박스 컨트롤
   * @param args 이벤트 인자
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
   * 넘버 박스 컨트롤에서 키를 누를 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 넘버 박스 컨트롤
   * @param args 이벤트 인자
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
     * 키 이벤트 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event
   *
   * 넘버 박스 컨트롤에서 키를 누르고 있는 동안 발생합니다.
   *
   * @example
   * ```js
   *     //넘버 박스에 Enter 입력 시 조회하기
   *     var tbxFilter = Matrix.getObject("tbxFilter");
   *     tbxFilter.OnTextKeypress = function (s, e) {
   *         if (e.Event.isEnter()) { //Enter 키 클릭 시
   * 			Matrix.doRefresh("Grid");
   *         }
   *     };
   * ```
   * @param sender 이벤트가 발생한 넘버 박스 컨트롤
   * @param args 이벤트 인자
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
     * 키 이벤트 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event
   *
   * 넘버 박스 컨트롤에서 키를 뗄 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 넘버 박스 컨트롤
   * @param args 이벤트 인자
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
     * 키 이벤트 객체
    */
    Event: Event
  }
  ) => void;


}
