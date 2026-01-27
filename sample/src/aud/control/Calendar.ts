import { Control } from "../../aud/control/Control";
/**
* 일자를 선택할 수 있는 컨트롤 입니다.
*/
export interface Calendar extends Control{

  /**
   * 데이터용 날짜 포멧
  */
  DataFormat: string;

  /**
   * Date형 선택된 날짜
  */
  Date: Date;

  /**
   * 달력에서 요일 표시를 시작할 기준 요일을 지정(기본값: 0, 일요일)
  */
  DisplayStartDayOfWeek: number;

  /**
   * 토/일 강조 색상 적용 여부
  */
  HighlightWeekend: boolean;

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
   * String형 선택된 날짜
  */
  Text: string;

  /**
   * Daily 달력에 각 행의 주차를 표시할지 여부
  */
  UseWeekNumber: boolean;

  /**
   * DataFormat 형태의 String형 선택된 날짜
  */
  Value: string;

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
   * 날짜 선택 팝업을 표시합니다.
   *
  */
  ShowPopup(): void;

  /**
   * @event 
   *
   * 날짜 선택 컨트롤의 값이 변결될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Calendar}
  */
  OnValueChanged : (sender : Calendar
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * String 형식의 날짜
    */
    Text: string
    /**
     * Date 형식의 날짜
    */
    Date: Date
  }
  ) => void;


}
