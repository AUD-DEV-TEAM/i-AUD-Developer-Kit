/**
* 문자(string) 타입에 대한 변환을 지원하는 클래스입니다.
*/
export interface StringUtility{

  /** 
   * 해당 문자(열)로 끝나는지 여부를 판단합니다.
   *
  * @param value 검색 대상 문자열
  * @param match 검색어
  */
  EndWith(value: string, match: string): boolean;

  /** 
   * 찾는 문자(열)의 인덱스 값을 반환합니다.
   *
  * @param value 검색 대상 문자열
  * @param text 검색어
  * @param startIndex 검색 시작 인덱스(생략시 첫글자부터 검색)
  */
  IndexOf(value: string, text: string, startIndex: number): number;

  /** 
   * 문자를 다른 문자로 변경합니다.
   *
  * @param text 검색 대상 문자열
  * @param oldChar 바꿀 대상 문자
  * @param newChar 새롭게 대체할 문자
  */
  Replace(text: string, oldChar: string, newChar: string): string;

  /** 
   * 해당 문자(열)로 시작하는지 여부를 판단합니다.
   *
  * @param value 검색 대상 문자열
  * @param match 검색어
  */
  StartWith(value: string, match: string): boolean;

  /** 
   * 해당 문자(열)를 소문자로 치환합니다.
   *
  * @param text 치환 대상 문자열
  */
  ToLower(text: string): string;

  /** 
   * 해당 문자(열)를 대문자로 치환합니다.
   *
  * @param text 치환 대상 문자열
  */
  ToUpper(text: string): string;

  /** 
   * 공백을 제거합니다.
   *
  * @param text 변환대상 문자열
  */
  Trim(text: string): string;

}
