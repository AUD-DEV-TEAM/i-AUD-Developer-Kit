/**
* 현재 접속한 사용자의 세션에 대한 정보를 제공합니다.
*/
export interface ScriptSession{

  /** 
   * 현재 세션의 특정 값을 문자열로 변환하여 반환합니다.
   *
  * @param key 세션 키
  */
  getAttribute(key: string): string;

  /** 
   * 현재 세션의 모든 키 목을을 반환합니다.
   *
  */
  getAttributeNames(): string[];

  /** 
   * 현재 세션의 특정 값을 반환합니다.
   *
  */
  getObject(): any;

  /** 
   * 현재 세션에 특정 값을 설정합니다.
   *
  * @param key 세션 키
  * @param value 값
  */
  setAttribute(key: string, value: any): void;

}
