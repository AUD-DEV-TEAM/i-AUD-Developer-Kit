/**
* JSON 포멧을 출력하는 기능을 제공합니다.
*/
export interface JsonFileWriter{

  /** 
   * Json 객체의 속성을 추가 합니다.
   *
  * @param propName 속성 이름
  * @param propValue 속성 값
  */
  addProperty(propName: string, propValue: any): JsonFileWriter;

  /** 
   * Json 배열에 값을 추가 합니다.
   *
  * @param value 항목의 값
  */
  addToArray(value: any): JsonFileWriter;

  /** 
   * Json 배열 시작 문자열 출력합니다.
   *
  */
  beginArray(): JsonFileWriter;

  /** 
   * Json 배열 시작 문자열 출력합니다.
   *
  * @param name 배열의 이름
  */
  beginArray(name: string): JsonFileWriter;

  /** 
   * Json 객체의 시작 문자열 출력합니다.
   *
  * @param name 객체의 이름
  */
  beginObject(name: string): JsonFileWriter;

  /** 
   * Json 객체의 시작 문자열 출력합니다.
   *
  */
  beginObject(): JsonFileWriter;

  /** 
   * 객체의 스트림을 닫습니다.
   *
  */
  close(): void;

  /** 
   * Json 배열 종료 문자열 출력합니다.
   *
  */
  endArray(): JsonFileWriter;

  /** 
   * Json 객체의 종료 문자열 출력합니다.
   *
  */
  endObject(): JsonFileWriter;

  /** 
   * Json에 텍스트를 출력 합니다.
   *
  */
  write(): JsonFileWriter;

}
