/**
* 클라이언트에 응답할 데이터(JSON)을 문자열 형태로 출력할 수 있는 기능을 제공합니다.
*/
export interface ResponsePrintWriter{

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
  print(text: any): void;

  /** 
   * 파일에 주어진 문자열을 추가하고 개행을 처리합니다.
   *
  * @param text 파일에 쓰고자 하는 내용
  */
  println(text: any): void;

}
