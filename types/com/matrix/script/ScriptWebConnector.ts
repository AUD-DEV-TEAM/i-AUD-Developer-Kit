/**
* HTTP, HTTPS 프로토콜을 통한 서버 연결을 지원하는 클라이언트 객체입니다.
*/
export interface ScriptWebConnector{

  /** 
   * 특정 URL의 내용을 다운로드해서 파일로 저장합니다.
   *
  * @param targetUrl 대상 URL
  * @param filePath 파일 저장 경로
  * @param method 연결 방식 (POST,GET,PUT,DELETE)
  * @param postData 폼 전송 데이터
  * @param headers 헤더 데이터 = 로 구분
  */
  DownLoadFile(targetUrl: string, filePath: string, method: string, postData: string, headers: string[]): void;

  /** 
   * HTTP 연결을 실행하고 결과를 반환합니다.
   *
  * @param targetUrl 대상 URL
  * @param method 연결 방식 (POST,GET,PUT,DELETE)
  * @param postData 폼 전송 데이터(e.g. ['CODE=VALUE', 'CODE=VALUE'])
  * @param headers 헤더 데이터 = 로 구분(e.g. ['Content-Type=xml', 'x_Api-Key=asdfasdf'])
  */
  SendRequest(targetUrl: string, method: string, postData: string, headers: string[]): string;

  /** 
   * 특정 인코딩 체계를 사용하여 문자열을 application/x-www-form-urlencoded 형식으로 변환합니다.
   *
  * @param text 변환할 문자열
  * @param charset 인코딩(UTF-8,EUC-KR)
  */
  URLEncode(text: string, charset: string): string;

  /** 
   * HTTP 연결을 통해 파일을 업로드합니다.
   *
  * @param targetUrl 대상 URL
  * @param fileFieldName 업로드 파일의 식별할 이름
  * @param filePath 파일의 경로(reports 하위 경로)
  * @param postData 폼 전송 데이터 = 로 구분(e.g. ['CODE=VALUE', 'CODE=VALUE'])
  * @param headers 헤더 데이터 = 로 구분(e.g. ['Content-Type=xml', 'x_Api-Key=asdfasdf'])
  */
  UploadFile(targetUrl: string, fileFieldName: string, filePath: string, postData: string[], headers: string[]): string;

  /** 
   * 특정 URL에 파일들을 업로드합니다.
   *
  * @param targetUrl 대상 URL
  * @param fileList 파일 목록(e.g.['_TEMP_/aaa.htm@업로드이름.htm','_TEMP_/zasdfasdf.xlsx@첨부파일.xlsx'])
  * @param postData 폼 전송 데이터 = 로 구분
  * @param headers 헤더 데이터 = 로 구분 (e.g. ['Content-Type=xml', 'x_Api-Key=asdfasdf'])
  */
  UploadFiles(targetUrl: string, fileList: string[], postData: string[], headers: string[]): string;

  /** 
   * AUD 서버의 특정 URL 또는 RestAPI를 호출할 시, 현재 인증 정보를 유지하도록 합니다.
   *
   * @example
   * ```js
   * var web = Matrix.getHttpConnector();
   * 
   * var targetUrl = 'http://127.0.0.1:8080/api/user/aud7/session/info';
   * var method = "POST";
   * var postData = "";						
   * var headers = ['Content-Type=application/json'
   * 			  ,"Accept=application/json"];
   * //AUD 서버의 URL 호출 시 인증을 유지하도록 합니다.			
   * web.UseAudAuthority(false);
   * //URL 호출
   * var responseText = web.SendRequest(targetUrl ,method ,postData ,headers);
   * ```
  */
  UseAudAuthority(): void;

  /** 
   * 원격 서버 연결에 대한 마지막 HTTP 응답 코드를 반환합니다.
   *
  */
  getLastResponseCode(): number;

  /** 
   * 해당 메서드 호출 전에 연결한 서버에서 받은 쿠키 정보를 반환합니다.
   *
  */
  getResponseCookie(): string;

  /** 
   * 허용할 http response 코드 목록을 등록합니다.(기본은 200, 201 이며, 빈 배열을 설정하면 모든 http response 코드를 허용합니다.)
   *
   * @example
   * ```js
   * 
   * var web = Matrix.getHttpConnector();
   * 
   * var targetUrl = 'http://127.0.0.1:8080/api/user/aud7/session/info';
   * var method = "POST";
   * var postData = "";						
   * var headers = ['Content-Type=application/json'
   * 			  ,"Accept=application/json"];
   * 
   * //허용 Response Code			  
   * web.setAcceptResponseCodes([200,201]); 
   * //AUD 서버의 URL 호출 시 인증을 유지하도록 합니다.			
   * web.UseAudAuthority(false);
   * //URL 호출
   * var responseText = web.SendRequest(targetUrl ,method ,postData ,headers);
   * ```
  * @param responseCodes 허용목록(e.g. [200,201,400,500])
  */
  setAcceptResponseCodes(responseCodes: number[]): void;

  /** 
   * 최대 연결 대기 시간 설정
   *
  * @param millisecond 시간(milliseconds)
  */
  setReadTimeout(millisecond: number): void;

}
