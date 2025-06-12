/**
* 엑셀 모델을 HTML Table형태의 출력을 지원합니다.
*/
export interface HTMLTableConverter{

  /** 
   * 스트일(css) file 경로 추가하기
   *
  * @param path css file path
  */
  AddCssLink(path: string): void;

  /** 
   * 출력 문서에 스타일(css) 구문을 추가 합니다.
   *
  * @param code css code
  */
  AddCssText(code: string): void;

  /** 
   * Javascript file 경로 추가하기
   *
  * @param path javascript file path
  */
  AddScriptLink(path: string): void;

  /** 
   * 출력 문서에 javascript 구문을 추가 합니다.
   *
  * @param code javascript code
  */
  AddScriptText(code: string): void;

  /** 
   * HTML 파일을 생성합니다.
   *
  * @param folderName Folder Name
  * @param fileName File Name
  * @param targetSheetNames target sheet name(eg.sheet1,shtt2)
  */
  WriteToFile(folderName: string, fileName: string, targetSheetNames: string): void;

  /** 
   * HTML 파일을 생성합니다.
   *
  * @param folderName Folder Name
  * @param fileName File Name
  */
  WriteToFile(folderName: string, fileName: string): void;

  /** 
   * HTML Table Tag 반환합니다.
   *
  * @param targetSheetNames target sheet name(eg.sheet1,shtt2)
  */
  getHtmlTable(targetSheetNames: string): string;

}
