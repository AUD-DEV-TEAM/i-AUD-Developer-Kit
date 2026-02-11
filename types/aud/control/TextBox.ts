import { Control } from "../../aud/control/Control";
import { enInputType } from "../../aud/enums/comm/enInputType";
import { Event } from "../../aud/data/Event";
/**
 * 텍스트박스 컨트롤입니다.
 *
 * @example
 * ```js
 * // 텍스트박스 기본 사용
 * var tbxName = Matrix.getObject("tbxName");
 * tbxName.MaxLength = 50;
 * tbxName.UsePlaceholder = true;
 * tbxName.SetPlaceholder("이름을 입력하세요");
 *
 * // 값 설정 및 조회
 * tbxName.Text = "홍길동";
 * console.log(tbxName.Text); // "홍길동"
 * ```
 */
export interface TextBox extends Control {

  /**
   * 계산 수식을 가져오거나 설정합니다.
   */
  Formula: string;

  /**
   * 텍스트박스 타입을 가져오거나 설정합니다.
   */
  InputType: enInputType;

  /**
   * 읽기 전용 여부를 가져오거나 설정합니다.
   */
  IsReadOnly: boolean;

  /**
   * 최대 입력 글자 수 제한을 가져오거나 설정합니다.
   */
  MaxLength: number;

  /**
   * 컨트롤의 왼쪽 패딩을 가져오거나 설정합니다. (기본값: 6)
   */
  PaddingLeft: number;

  /**
   * 컨트롤의 오른쪽 패딩을 가져오거나 설정합니다. (기본값: 6)
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
   * 해당 컨트롤의 Placeholder 텍스트를 지정합니다. `UsePlaceholder`가 `true`일 경우에만 사용 가능합니다.
   *
   * @example
   * ```js
   * var tbxSearch = Matrix.getObject("tbxSearch");
   * tbxSearch.UsePlaceholder = true;
   * tbxSearch.SetPlaceholder("검색어를 입력하세요");
   * ```
   * @param placeholdervalue 문자열 형식의 텍스트
   */
  SetPlaceholder(placeholdervalue: string): void;

  /**
   * @event
   *
   * 텍스트박스 컨트롤의 텍스트가 변경될 때 발생합니다.
   *
   * @example
   * ```js
   * var tbxSearch = Matrix.getObject("tbxSearch");
   * tbxSearch.OnTextChange = function(sender, args) {
   *     console.log("변경된 텍스트: " + args.Text);
   *
   *     // 입력 값에 따른 실시간 필터링
   *     var grid = Matrix.getObject("grdData");
   *     grid.SetFilter("NAME LIKE '%" + args.Text + "%'");
   * };
   * ```
   * @param sender 이벤트가 발생한 텍스트박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TextBox}
   */
  OnTextChange: (sender: TextBox
    , args: {
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
   * 텍스트박스 컨트롤의 키 입력 시 발생합니다.
   *
   * @param sender 이벤트가 발생한 텍스트박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TextBox}
   */
  OnTextKeydown: (sender: TextBox
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 현재 텍스트
       */
      Text: string
      /**
       * 텍스트박스 키 이벤트 객체
       */
      Event: Event
    }
  ) => void;


  /**
   * @event
   *
   * 텍스트박스 컨트롤의 키를 누르는 동안 발생합니다.
   *
   * @param sender 이벤트가 발생한 텍스트박스 컨트롤
   * @param args 이벤트 인자
   *
   * @example
   * ```js
   * // 텍스트박스에 Enter 입력 시 조회하기
   * var tbxFilter = Matrix.getObject("tbxFilter");
   * tbxFilter.OnTextKeypress = function(s, e) {
   *     if (e.Event.isEnter()) { // Enter 키 클릭 시
   *         Matrix.doRefresh("Grid");
   *     }
   * };
   * ```
   *
   * Target : {@link TextBox}
   */
  OnTextKeypress: (sender: TextBox
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 현재 텍스트
       */
      Text: string
      /**
       * 텍스트박스 키 이벤트 객체
       */
      Event: Event
    }
  ) => void;


  /**
   * @event
   *
   * 텍스트박스 컨트롤의 키 입력 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 텍스트박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TextBox}
   */
  OnTextKeyup: (sender: TextBox
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 현재 텍스트
       */
      Text: string
      /**
       * 텍스트박스 키 이벤트 객체
       */
      Event: Event
    }
  ) => void;

  /** 텍스트 박스의 값을 배열로 반환합니다. */
  GetValue(): string[];
}
