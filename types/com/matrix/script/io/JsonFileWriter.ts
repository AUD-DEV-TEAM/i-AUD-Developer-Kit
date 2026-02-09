/**
* Json 파일 쓰기를 지원합니다.
*/
export interface JsonFileWriter{

  /**
   * JSON 파일 출력 시 개행 및 들여쓰기를 통해 문서를 구조화 할 지 여부
  */
  FormatPretty: boolean;

  /** 
   * Json 객체 속값 값을 파일에 출력합니다.(구문:name=value )
   *
  * @param name 속성명
  * @param value 속성값
  */
  addProperty(name: string, value: any): JsonFileWriter;

  /** 
   * Json 배열에 값을 추가합니다.
   *
  * @param value 속성값
  */
  addToArray(value: any): JsonFileWriter;

  /** 
   * Json 배열 구분을 출력합니다.(구문:[)
   *
  */
  beginArray(): JsonFileWriter;

  /** 
   * Json 배열 구분을 출력합니다(구문:name=[)
   *
  * @param name 속성명
  */
  beginArray(name: string): JsonFileWriter;

  /** 
   * Json 객체 생성 기호를 파일에 출력합니다.(구문:{)
   *
  */
  beginObject(): JsonFileWriter;

  /** 
   * Json 객체 생성 기호를 파일에 출력합니다.(구문:name={ )
   *
  * @param name 속성명
  */
  beginObject(name: string): JsonFileWriter;

  /** 
   * buffer에 있는 내용을 파일에 Write 하고 객체를 닫습니다.
   *
  */
  close(): void;

  /** 
   * Json 배열 종료 기호를 출력합니다.(구문:] )
   *
  */
  endArray(): JsonFileWriter;

  /** 
   * Json 객체 종료 기호를 파일에 출력합니다.(구문:})
   *
  */
  endObject(): JsonFileWriter;

  /** 
   * write text
   *
  * @param text text
  */
  write(text: string): JsonFileWriter;

}
