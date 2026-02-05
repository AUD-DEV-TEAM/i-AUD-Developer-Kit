import { Control } from "../../aud/control/Control";
/**
 * 주(Week) 단위로 날짜를 선택할 수 있는 달력 컨트롤입니다.
 */
export interface CalendarWeekly extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyyMMdd"`)
  */
  DataFormat: string;

  /**
   * 선택된 날짜를 `Date` 객체로 가져오거나 설정합니다.
  */
  Date: Date;

  /**
   * 초기 선택 날짜를 가져오거나 설정합니다.
  */
  InitDate: string;

  /**
   * 읽기 전용 여부를 가져오거나 설정합니다.
  */
  IsReadOnly: boolean;

  /**
   * 최대 선택 가능 날짜를 가져오거나 설정합니다.
  */
  MaxDate: string;

  /**
   * 최소 선택 가능 날짜를 가져오거나 설정합니다.
  */
  MinDate: string;

  /**
   * 선택된 날짜를 {@link ViewFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  Text: string;

  /**
   * 선택된 날짜를 {@link DataFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  Value: string;

  /**
   * 출력용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyy-MM-dd"`)
  */
  ViewFormat: string;

  /**
   * 날짜 선택 팝업을 닫습니다.
   *
  */
  HidePopup(): void;

  /**
   * 날짜 선택 팝업을 표시합니다.
   *
  */
  ShowPopup(): void;

  /**
   * @event
   *
   * 선택된 주가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarWeekly}
  */
  OnValueChanged : (sender : CalendarWeekly
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * {@link ViewFormat} 형식의 날짜 문자열
    */
    Text: string
    /**
     * `Date` 객체 형식의 날짜
    */
    Date: Date
  }
  ) => void;


}
