/**
* 텍스트 파일을 순차적으로 읽는 기능을 지원합니다.
*/
export interface ScriptTextFileReader{

  /** 
   * 해당 객체를 닫습니다.
   *
  */
  close(): void;

  /** 
   * 라인단위로 읽어 해당 라인의 문자열을 반환 합니다.(파일의 종료를 만나면 null을 반환합니다.)
   *
  */
  readLine(): string;

}
