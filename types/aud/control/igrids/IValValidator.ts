/**
* MX_GRID 셀 유효성 검사 모델
*/
export interface IValValidator{

  /**
   * 입력 후 validation 메시지 (본문)
  */
  ErrorMessage: string;

  /**
   * 입력 후 validation 메시지  (헤더)
  */
  ErrorTitle: string;

  /**
   * 기준 값 1의 수식
  */
  Formula1: string;

  /**
   * 기순 값 2의 수식
  */
  Formula2: string;

  /**
   *  빈 셀 무시여부
  */
  IgnoreBlank: boolean;

  /**
   * 셀 내 DropDown 컨트롤 표시 여부
  */
  InCellDropDown: boolean;

  /**
   * 입력 시 정보 표시 (본문)
  */
  InputMessage: string;

  /**
   * 입력 시 정보 표시 (헤더)
  */
  InputTitle: string;

  /**
   * DropDown 컨트롤의 값 목록
  */
  LOV: string[];

  /**
   * 연산자
    BETWEEN=0
    EQUAL=1
    GREATER_THAN=2
    GREATER_OR_EQUAL=3
    LESS_THAN=4
    LESS_OR_EQUAL = 5
    NONE = 6
    NOT_BETWEEN = 7
    NOT_EQUAL = 8
  */
  Operator: number;

  /**
   * 입력 후 validation 메시지 표시 여부
  */
  ShowError: boolean;

  /**
   * 입력 시 정보 표시 여부
  */
  ShowInput: boolean;

  /**
   * 유효성 검사 종류
 ANY_VALUE = 0
 WHOLE_NUMBER = 1
 DECIMAL = 2
 LIST = 3
 DATE = 4
 TIME = 5
 TEXT_LENGTH = 6
 CUSTOM = 7
  */
  Type: number;

  /**
   * 기준 값 1
  */
  Value1: string|number|null;

  /**
   * 기준 값 2
  */
  Value2: string|number|null;

}
