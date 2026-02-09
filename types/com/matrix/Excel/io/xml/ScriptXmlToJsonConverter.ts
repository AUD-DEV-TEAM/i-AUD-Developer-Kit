/**
* XML 파일을 JSON 파일로 변환합니다.
* 
* @example
* ```js
* // XML 파일을 JSON으로 변환 (자동 규칙 생성)
* var fso = Matrix.getFileSystemObject();
* var jsonPath = fso.PathCombine("_TEMP_", "output.json");
* var converter = Matrix.getXMLtoJSONConverter(xmlFilePath, jsonPath);
* converter.BuildRule();           // XML 구조를 분석하여 변환 규칙 자동 생성
* converter.setFormatPretty(true); // 들여쓰기 포맷팅
* converter.Convert();             // 변환 실행 및 파일 저장
*
* // XML 문자열을 직접 변환 (수동 규칙 지정)
* var xml = "<Root><Items><Item><Name>A</Name></Item><Item><Name>B</Name></Item></Items></Root>";
* var converter2 = Matrix.getXMLtoJSONConverter(xml, jsonPath);
* // 규칙: "{" = Object, "[" = Array, "," = Attribute, "!" = Ignore
* converter2.addRule("Root", "{", "Root");
* converter2.addRule("Root/Items/Item", "[", "Item");
* converter2.Convert();
*
* // 파일 저장 없이 JSON 문자열로 반환
* var jsonText = converter2.getJsonText();
* Matrix.WriteLog(jsonText);
* ```
*/
export interface ScriptXmlToJsonConverter{

  /** 
   * JSON 변환 규칙을 생성합니다.
   *
  */
  BuildRule(): void;

  /** 
   * XML을 JSON파일로 변환합니다.
   *
  */
  Convert(): void;

  /** 
   * JSON 변환 규칙을 등록합니다.
   *
  * @param path XML 의 노드 경로 (eg. Document/Files )
  * @param rule 규칙 부호
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
   * JSON 변환 시 포맷팅을 할지 여부를 설정합니다.
   *
  * @param pretty 포맷팅 여부
  */
  setFormatPretty(pretty: boolean): void;

}
