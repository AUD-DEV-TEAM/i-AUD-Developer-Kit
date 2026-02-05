/**
* 엑셀 모델을 HTML Table 형태로 출력하는 기능을 제공합니다.
*
* @example
* ```js
* var req = Matrix.getRequest();
* var res = Matrix.getResponse();
* var util = Matrix.getUtility();
* var fso = Matrix.getFileSystemObject();
*
* //----------------------------------------------
* // 패턴1: MX-GRID 엑셀 모델을 HTML 파일로 변환
* //----------------------------------------------
* var wb = Matrix.OpenWorkBook(req.getReportCode(), "MX_GRID_CODE", true);
* wb.Calculate(true);
*
* var folderName = "_TEMP_";
* var fileName = util.getUniqueKey("HTM") + ".htm";
* // HTML 파일 생성 (전체 시트)
* wb.getHtmlTableConverter().WriteToFile(folderName, fileName);
*
* // 클라이언트에 파일 경로 전달
* res.WriteResponseText(JSON.stringify({
*     "FOLDER_NAME": folderName,
*     "FILE_NAME": fileName
* }));
*
* //----------------------------------------------
* // 패턴2: CSS/JavaScript를 추가하여 HTML 파일 생성
* //----------------------------------------------
* var htmlConverter = wb.getHtmlTableConverter();
* // 외부 CSS 파일 링크 추가
* htmlConverter.AddCssLink("/css/print-style.css");
* // 인라인 CSS 추가
* htmlConverter.AddCssText("table { border-collapse: collapse; } td { padding: 4px; }");
* // 인라인 JavaScript 추가
* htmlConverter.AddScriptText("window.onload = function(){ window.print(); }");
* // 특정 시트만 HTML로 출력
* htmlConverter.WriteToFile(folderName, fileName, "V1,V2");
*
* //----------------------------------------------
* // 패턴3: HTML Table 문자열 직접 가져오기
* //----------------------------------------------
* var htmlConverter2 = wb.getHtmlTableConverter();
* // V1 시트의 HTML Table 태그를 문자열로 반환
* var htmlText = htmlConverter2.getHtmlTable("V1");
* // 최대 100행까지만 출력
* var htmlText2 = htmlConverter2.getHtmlTable("V1", 100);
* ```
*/
export interface HTMLTableConverter{

  /**
   * 출력 문서에 외부 CSS 파일 링크를 추가합니다.
   *
  * @param path CSS 파일 경로
  */
  AddCssLink(path: string): void;

  /**
   * 출력 문서에 인라인 CSS 구문을 추가합니다.
   *
  * @param code CSS 코드
  */
  AddCssText(code: string): void;

  /**
   * 출력 문서에 외부 JavaScript 파일 링크를 추가합니다.
   *
  * @param path JavaScript 파일 경로
  */
  AddScriptLink(path: string): void;

  /**
   * 출력 문서에 인라인 JavaScript 구문을 추가합니다.
   *
  * @param code JavaScript 코드
  */
  AddScriptText(code: string): void;

  /**
   * HTML 파일을 생성합니다.
   *
  * @param folderName 폴더명
  * @param fileName 파일명
  */
  WriteToFile(folderName: string, fileName: string): void;

  /**
   * 특정 시트만 대상으로 HTML 파일을 생성합니다.
   *
  * @param folderName 폴더명
  * @param fileName 파일명
  * @param targetSheetNames 대상 시트명 (`,`로 구분, e.g. `"V1,V2"`)
  */
  WriteToFile(folderName: string, fileName: string, targetSheetNames: string): void;

  /**
   * 특정 시트의 HTML Table 태그 문자열을 반환합니다.
   *
  * @param targetSheetNames 대상 시트명 (`,`로 구분, e.g. `"V1,V2"`)
  */
  getHtmlTable(targetSheetNames: string): string;

  /**
   * 특정 시트의 HTML Table 태그 문자열을 지정된 행 수만큼 반환합니다.
   *
  * @param targetSheetNames 대상 시트명 (`,`로 구분, e.g. `"V1,V2"`)
  * @param limitRows 최대 출력 행 수
  */
  getHtmlTable(targetSheetNames: string, limitRows: number): string;

}
