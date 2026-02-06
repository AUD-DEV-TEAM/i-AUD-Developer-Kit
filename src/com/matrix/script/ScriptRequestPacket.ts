import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
import { ScriptDataSet } from "../../../com/matrix/script/ScriptDataSet";
import { DataSourceInfo } from "../../../com/matrix/canvas/report/DataSourceInfo";
import { ScriptDataRow } from "../../../com/matrix/script/ScriptDataRow";
/**
* 클라이언트에서 요청한 정보에 대한 접근을 제공합니다.
*/
export interface ScriptRequestPacket{

  /** 
   * 보고서내 SQL을 실행합니다.
대용량의 데이터를 실행하면 서버에서 메모리 점유 문제가 발생할 수 있으니
callback을 지원하는 함수를 사용하시기 바랍니다.
   *
   * @example
   * ```js
   * 		var req = Matrix.getRequest();
   * 		req.ExecuteReportDataSource("Data1"
   *   			,function(row){
   * 				//테이블 객체 반환
   * 				var rowTable = row.getDataTable();
   * 				for(var i=0,i<rowTable.getColumnCount(); i++){
   * 					var value = row.getString(i);
   * 				}
   * 				//다음행 읽기 계속
   * 			   	return null;
   *
   *          });
   * ```
  * @param key 데이터 소스 명 or 아이디
  */
  ExecuteReportDataSource(key: string): ScriptDataTable;

  /** 
   * 보고서내 SQL을 실행합니다.
대용량의 데이터를 실행하면 서버에서 메모리 점유 문제가 발생할 수 있으니
callback을 지원하는 함수를 사용하시기 바랍니다.
   *
  * @param key 데이터 소스 명 or 아이디
  * @param callbackRow 파일의 Row 단위 데이터 처리 함수
  * ```
  *
  *                     function(row){
  *                     //row == com.matrix.script.ScriptDataRow
  *                     //return true : 해당 row 를 데이터 테이블에 추가
  *                     //      false : 엑셀 파일 읽기 종료
  *                     //       null : 다음 row 읽기
  *               }
  * ```
  */
  ExecuteReportDataSource(key: string, callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * 현재 접속한 사용자가 특정 권한 그룹의 소속인지를 반환합니다.
   *
  * @param roleCode 권한 그룹 코드
  */
  HasRole(roleCode: string): string;

  /** 
   * 현재 접속한 사용자의 권한 정보를 확인할 수 있습니다. 해당 정보는 객체(보고서, 폴더, 데이터베이스)에 대한 것입니다.
   *
  * @param authObjectCode 객체 코드(보고서코드, 폴더코드, 데이터베이스 코드)
  * @param objectCode 객체 타입 코드(보고서 : R0, 폴더: F0, 데이터베이스: D0)
  */
  getAuthority(authObjectCode: string, objectCode?: string): number;

  /** 
   * 로그인한 사용자의 인증 쿠키 정보를 반환합니다.
만약, 인증이 필요한 AUD 서버의 특정 페이지 또는 RestAPI를 호출할 때, 해당 값을 사용하여 인증을 유지할 수 있습니다.
   *
   * @example
   * ```js
   * var web = Matrix.getHttpConnector(); // http url connector
   * var req = Matrix.getRequest(); // request
   * var cookies = req.getCookieList();
   * var nCookies = [];
   * var idx;
   * for(var i=0,len=cookies.length;i<len;i++){
   * 	idx = cookies[i].indexOf('=');
   * 	if(idx > 0){
   * 		nCookies.push( cookies[i].substring(0, idx) + "=" + web.URLEncode(cookies[i].substring(idx + 1)));
   * 	}
   * }
   *                         
   * var authCookie = nCookies.join(";");
   * ```
  */
  getCookieList(): string[];

  /** 
   * 로그인한 사용자의 인증 쿠키 정보를 반환합니다.
만약, 인증이 필요한 AUD 서버의 특정 페이지 또는 RestAPI를 호출할 때, 해당 값을 사용하여 인증을 유지할 수 있습니다.
   *
   * @example
   * ```js
   * //현재 로그인한 사용자의 정보를 조회 하기 위한 Rest API 호출
   * var req = Matrix.getRequest(); // request 
   * var web = Matrix.getHttpConnector(); // http url connector
   * 
   * //Rest Api URL
   * var targetUrl = "http://127.0.0.1:8080/api/user/login/user/info";
   * var method = "POST";
   * var postData = JSON.stringify({
   * 							"langCode": "kr",
   * 							"loginFlag": "main",
   * 							"userCode": "matrix"
   * 							});
   * var headers = ['Content-Type:application/json'
   * 			,"Accept:application/json"
   * 			,"charset:UTF-8"
   * 			,'Cookie:' +req.getCookieString("UTF-8")]; //인증을 위해 Cookie를 전달합니다.
   * //URL 호출			
   * var result = web.SendRequest(targetUrl ,method ,postData ,headers);
   * Matrix.WriteLog(result);
   * ```
  * @param encodeName Cookie값에 대해 URLEncoding 할 캐릭터셋입니다.
  */
  getCookieString(encodeName: string[]): string;

  /** 
   * Client에서 전달 받는 데이터셋을 반환합니다.
   *
  */
  getDataSet(): ScriptDataSet;

  /** 
   * Client에서 전달 받은 파라미터의 값을 반환합니다.
   *
  * @param key 파라미터 명(컨트롤 명)
  */
  getParam(key: string): string;

  /** 
   * Client에서 전달 받은 파라미터의 값을 반환합니다.
   *
  * @param idx 파라미터 컬렉션 내 인덱스 값
  */
  getParam(idx: number): string;

  /** 
   * Client에서 전달 받은 파라미터의 개수를 반환합니다.
   *
  */
  getParamsCount(): number;

  /** 
   * 현재 접속한 사용자의 IP Address를 반환합니다.
   *
  */
  getRemoteAddr(): string;

  /** 
   * 현재 연결된 보고서 코드를 반환합니다.
   *
  */
  getReportCode(): string;

  /** 
   * 보고서 내 데이터 소스를 반환합니다.
   *
  * @param key 데이터 소스 명 or 아이디
  */
  getReportDataSource(key: string): DataSourceInfo;

  /** 
   * 보고서 내 서버 스크립트의 내용을 문자열로 반환합니다. (`@`로 시작하는 공통 모듈만 허용)
   *
  * @param name 서버 스크립트 이름
  */
  getServerScript(name: string): string;

  /** 
   * Client에서 전달 받은 데이터 테이블 객체를 반환합니다.
   *
  * @param key 테이블 명(컨트롤 명)
  */
  getTable(key: string): ScriptDataTable;

  /** 
   * Client에서 전달 받은 데이터 테이블 객체를 반환합니다.
   *
  * @param idx 테이블 컬렉션 내 인덱스 값
  */
  getTable(idx: number): ScriptDataTable;

  /** 
   * Client에서 전달 받은 테이블의 개수를 반환합니다.
   *
  */
  getTableCount(): number;

  /** 
   * 현재 접속한 사용자의 ID를 반환합니다.
   *
  */
  getUserCode(): string;

  /** 
   * MASKING 기능 적용 시 사용할 모듈 코드를 등록합니다.
   *
  * @param maskCode MASK CODE(E0 : Export, SV : i-AUD)
  */
  setMaskingModuleCode(maskCode: string): void;

  /** 
   * 파라미터의 값을 추가하거나 수정합니다.
   *
  * @param key 파라미터 명
  * @param value 파라미터 값
  */
  setParam(key: string, value: string): void;

}
