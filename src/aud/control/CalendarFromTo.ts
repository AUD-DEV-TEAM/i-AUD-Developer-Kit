import { Control } from "../../aud/control/Control";
/**
 * 시작일과 종료일을 선택할 수 있는 기간 선택 달력 컨트롤입니다.
 */
export interface CalendarFromTo extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyyMMdd"`)
  */
  DataFormat: string;

  /**
   * 달력에서 요일 표시를 시작할 기준 요일을 가져오거나 설정합니다. (기본값: `0`, 일요일)
  */
  DisplayStartDayOfWeek: number;

  /**
   * From(시작) 날짜를 `Date` 객체로 가져오거나 설정합니다.
  */
  FromDate: Date;

  /**
   * From(시작) 날짜를 {@link ViewFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  FromText: string;

  /**
   * 토/일 강조 색상 적용 여부를 가져오거나 설정합니다.
  */
  HighlightWeekend: boolean;

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
   * To(종료) 달력 컨트롤의 이름을 가져옵니다.
  */
  Name2: string;

  /**
   * To(종료) 날짜를 `Date` 객체로 가져오거나 설정합니다.
  */
  ToDate: Date;

  /**
   * To(종료) 날짜를 {@link ViewFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  ToText: string;

  /**
   * 달력에 각 행의 주차를 표시할지 여부를 가져오거나 설정합니다.
  */
  UseWeekNumber: boolean;

  /**
   * From(시작) 날짜를 {@link DataFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  Value: string;

  /**
   * To(종료) 날짜를 {@link DataFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  Value2: string;

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
   * To(종료) 달력의 최대 선택 가능 날짜를 변경합니다.
   *
  * @param format MaxDate 형식 문자열 (컨트롤 속성의 [Validator] > [MaxDate] 항목과 동일한 형식)
  * @param measureDate 기준이 되는 날짜
  */
  SetToCalendarMaxDate(format: string, measureDate: Date): void;

  /**
   * 날짜 선택 팝업을 표시합니다.
   *
  */
  ShowPopup(): void;

  /**
   * @event
   *
   * From(시작) 날짜가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarFromTo}
  */
  OnFromValueChanged : (sender : CalendarFromTo
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * {@link ViewFormat} 형식의 From 날짜 문자열
    */
    Text: string
    /**
     * `Date` 객체 형식의 From 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event
   *
   * From(시작) 또는 To(종료) 날짜가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarFromTo}
  */
  OnValueChanged : (sender : CalendarFromTo
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * {@link ViewFormat} 형식의 From 날짜 문자열
    */
    Text: string
    /**
     * {@link ViewFormat} 형식의 To 날짜 문자열
    */
    Text2: string
    /**
     * `Date` 객체 형식의 From 날짜
    */
    Date: Date
    /**
     * `Date` 객체 형식의 To 날짜
    */
    Date2: Date
  }
  ) => void;


}
