/**
* 날짜 타입에 대한 연산을 지원하는 클래스입니다.
*/
export interface ScriptDateUtil{

  /**
   * 일
  */
  Day: number;

  /**
   * 요일 값
  */
  DayOfWeek: number;

  /**
   * 시간
  */
  Hour: number;

  /**
   * 분
  */
  Minute: number;

  /**
   * 월
  */
  Month: number;

  /**
   * 초
  */
  Second: number;

  /**
   * 년도
  */
  Year: number;

  /** 
   * 기존 날짜에 일수를 더합니다
   *
  * @param days 가감하고자 하는 값
  */
  AddDays(days: number): ScriptDateUtil;

  /** 
   * 기존 날짜에 시간을 더합니다.
   *
  * @param hour 가감하고자 하는 값
  */
  AddHours(hour: number): ScriptDateUtil;

  /** 
   * 기존 일시에 분을 더합니다
   *
  * @param hour 가감하고자 하는 값
  */
  AddMinutes(hour: number): ScriptDateUtil;

  /** 
   * 기존 날짜에 월수를 더합니다
   *
  * @param months 가감하고자 하는 값
  */
  AddMonths(months: number): ScriptDateUtil;

  /** 
   * 기존 일시에 초를 더합니다
   *
  * @param hour 가감하고자 하는 값
  */
  AddSeconds(hour: number): ScriptDateUtil;

  /** 
   * 기존 날짜에 년도를 더합니다.
   *
  * @param years 가감하고자 하는 값
  */
  AddYears(years: number): ScriptDateUtil;

  /** 
   * 현재 값과 대상값을 비교하고 크면 1, 같으면 0, 작으면 -1을 반환합니다.
   *
  * @param target 비교대상
  */
  CompareTo(target: ScriptDateUtil): number;

  /** 
   * 날짜에 대한 지정된 포멧의 Date 객체로 변환합니다.
   *
  * @param text 변환하고자 하는 문자형의 일자 값
  * @param format 출력 포멧(ex:yyyy-MM-dd HH:mm:ss)
  */
  ParseDate(text: string, format: string): void;

  /** 
   * 날짜에 대한 지정된 포멧의 문자열을 반환합니다.
   *
  * @param format 출력 포멧(ex:yyyy-MM-dd HH:mm:ss)
  */
  ToString(format: string): string;

}
