/**
* XML 파일을 JSON 파일로 변환합니다.
*/
export interface ScriptXmlToJsonConverter{

  /** 
   * JSON 변환 규칙을 생성합니다.
   *
  */
  BuildRule(): void;

  /** 
   * XML을 JSON파일로 변환 합니다.
   *
  */
  Convert(): void;

  /** 
   * JSON 변환 규칙을 등록합니다.
   *
  * @param path XML 의 노드 경로 (eg. Document/Files )
  * @param rule 규칙 부호
  * ```
  * 
  *                     // input 
  *                     // 0 : "Object"              , "{" 
  *                     // 1 : "Array"               , "["
  *                     // 2 : "Attribute"           , ","
  *                     // 3 : "Ignore"              , "!"
  *                     // 4 : "IgnoreFirst"        , "!1" 
  *               })
  * ```
  * @param name Json으로 변환할 이름
  */
  addRule(path: string, rule: string|number, name: string): void;

  /** 
   * 모든 변환 규칙을 삭제합니다.
   *
  */
  clearRule(): void;

  /** 
   * XML을 JSON파일로 변환한 문자열을 반환합니다.
   *
  */
  getJsonText(): string;

  /** 
   * 해당 경로의 변환 규칙을 삭제합니다.
   *
  * @param path XML 의 노드 경로 (eg. Document/Files )
  */
  removeRule(path: string): void;

  /** 
   * JSON 변환 시 포멧팅을 할지 여부를 설정합니다.
   *
  * @param pretty  
  */
  setFormatPretty(pretty: boolean): void;

}
