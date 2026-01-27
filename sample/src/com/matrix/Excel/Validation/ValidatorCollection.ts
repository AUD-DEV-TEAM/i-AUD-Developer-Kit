/**
* 엑셀 유효성 검사 객체에 대한 정보를 제공합니다.
*/
export interface ValidatorCollection{

  /** 
   * 유효성 검사 목록을 JSON 문자열로 반환 합니다.
   *
  */
  getJSONString(): string;

  /** 
   * 주어진 JSON 문자열로 유효성 목록을 재 구성 합니다.
   *
  * @param jsonText JsonText
  */
  setJSONString(jsonText: string): void;

}
