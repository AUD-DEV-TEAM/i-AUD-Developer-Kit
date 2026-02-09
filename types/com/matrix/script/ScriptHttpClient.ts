/**
 * Multipart 방식의 HTTP 요청을 지원하는 Client 객체입니다.
 *
 * 파일 업로드, 텍스트 파라미터 전송 등 `multipart/form-data` 형식의
 * HTTP 요청을 구성하고 실행할 수 있습니다.
 *
 * @example
 * ```js
 * var http = Matrix.getHttpClient();
 *
 * http.Create("http://api.example.com/upload", "POST");
 * http.setHeader("Accept", "application/json");
 * http.addTextBody("userCode", "matrix");
 * http.addBinaryBody("_TEMP_/report.xlsx", "file", "보고서.xlsx");
 *
 * var result = http.execute();
 * ```
 */
export interface ScriptHttpClient{

  /**
   * HTTP 요청을 생성합니다.
   *
   * @param url 요청 URL
   * @param method 요청 방식 (GET, POST)
   */
  Create(url: string, method: string): ScriptHttpClient;

  /**
   * 요청 헤더를 추가합니다. 동일한 이름의 헤더가 여러 개 존재할 수 있습니다.
   *
   * @param key 헤더 이름
   * @param value 헤더 값
   */
  addHeader(key: string, value: string): ScriptHttpClient;

  /**
   * 요청에 파일을 첨부합니다.
   *
   * @param filePath 파일 경로 (reports 하위 경로)
   * @param name 폼 필드 이름
   * @param attachName 업로드 시 파일 이름
   */
  addBinaryBody(filePath: string, name: string, attachName: string): ScriptHttpClient;

  /**
   * 요청에 파일을 첨부합니다. MIME 타입과 인코딩을 지정할 수 있습니다.
   *
   * @param filePath 파일 경로 (reports 하위 경로)
   * @param name 폼 필드 이름
   * @param attachName 업로드 시 파일 이름
   * @param mimeType MIME 타입 (e.g. "application/octet-stream")
   * @param charset 인코딩 (e.g. "UTF-8")
   */
  addBinaryBody(filePath: string, name: string, attachName: string, mimeType: string, charset: string): ScriptHttpClient;

  /**
   * 요청에 텍스트 파라미터를 추가합니다.
   *
   * @param key 파라미터 이름
   * @param value 파라미터 값
   */
  addTextBody(key: string, value: string): ScriptHttpClient;

  /**
   * 요청에 텍스트 파라미터를 추가합니다. 인코딩을 지정할 수 있습니다.
   *
   * @param key 파라미터 이름
   * @param value 파라미터 값
   * @param charSet 인코딩 (e.g. "UTF-8", "EUC-KR")
   */
  addTextBody(key: string, value: string, charSet: string): ScriptHttpClient;

  /**
   * 구성된 HTTP 요청을 실행하고 응답 문자열을 반환합니다.
   */
  execute(): string;

  /**
   * 지정한 이름의 헤더를 모두 제거합니다.
   *
   * @param name 제거할 헤더 이름
   */
  removeHeaders(name: string): ScriptHttpClient;

  /**
   * 요청 헤더를 설정합니다. 동일한 이름의 기존 헤더가 있으면 덮어씁니다.
   *
   * @param key 헤더 이름
   * @param value 헤더 값
   */
  setHeader(key: string, value: string): ScriptHttpClient;

}
