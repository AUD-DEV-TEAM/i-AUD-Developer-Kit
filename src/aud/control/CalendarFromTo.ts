import { Control } from "../../aud/control/Control";
/**
* 일자를 FromTo로 선택할 수 있는 컨트롤입니다.
*/
export interface CalendarFromTo extends Control{

  /**
   * 데이터용 날짜 포멧
  */
  DataFormat: string;

  /**
   * From Date형 선택된 날짜
  */
  FromDate: Date;

  /**
   * From 날짜를 설정하거나 반환한다.(ViewFormat)
  */
  FromText: string;

  /**
   * 초기 선택된 날짜
  */
  InitDate: string;

  /**
   * 읽기전용
  */
  IsReadOnly: boolean;

  /**
   * 최대 선택 가능 날짜
  */
  MaxDate: string;

  /**
   * 최소 선택 가능 날짜
  */
  MinDate: string;

  /**
   * To 달력 컨트롤 이름
  */
  Name2: string;

  /**
   * To Date형 선택된 날짜
  */
  ToDate: Date;

  /**
   * To 날짜를 설정하거나 반환한다.(ViewFormat)
  */
  ToText: string;

  /**
   * From 에 선택된 날짜를 DataFormat에 맞춰서 반환한다.
  */
  Value: string;

  /**
   * To 에 선택된 날짜를 DataFormat에 맞춰서 반환한다.
  */
  Value2: string;

  /**
   * 출력용 날짜 포멧
  */
  ViewFormat: string;

  /** 
   * 날짜 선택 팝업을 닫습니다.
   *
  */
  HidePopup(): void;

  /** 
   * To 선택 컨트롤의 유효기간 검증에 사용 되는 MaxDate 값을 변경합니다.
   *
  * @param format String 형식의 MaxDate 형식(컨트롤 속성의 [Validator] > [MaxDate] 항목의 값과 동일한 형식)
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
   * 날짜 From 선택 컨트롤의 값이 변결될 때 발생합니다.
   *
   * @param args
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
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 날짜 FromTo 선택 컨트롤의 값이 변결될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarFromTo}
  */
  OnValueChanged : (sender : CalendarFromTo
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * String 형식의 To 날짜
    */
    Text2: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
    /**
     * Date 형식의 To 날짜
    */
    Date2: Date
  }
  ) => void;


}
