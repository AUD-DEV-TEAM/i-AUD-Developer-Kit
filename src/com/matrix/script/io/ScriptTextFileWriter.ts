/**
* 텍스트 파일을 순차적으로 쓰는 기능을 지원합니다.
*/
export interface ScriptTextFileWriter{

  /** 
   * buffer에 있는 내용을 파일에 Write 하고 객체를 닫습니다.
   *
  */
  close(): void;

  /** 
   * buffer에 있는 내용을 파일에 Write합니다.
   *
  */
  flush(): void;

  /** 
   * 파일에 주어진 문자열을 추가합니다.
   *
  * @param text 파일에 쓰고자 하는 내용
  */
  print(text: string): void;

  /** 
   * 파일에 주어진 문자열을 추가하고 개행을 처리합니다.
   *
  * @param text 파일에 쓰고자 하는 내용
  */
  println(text: string): void;

  /** 
   * BOM 문자열을 파일에 출력합니다.
   *
  */
  writeBom(): void;

}
