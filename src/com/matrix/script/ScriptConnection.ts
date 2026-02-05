import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
import { ScriptRecordSet } from "../../../com/matrix/script/ScriptRecordSet";
import { ScriptDataRow } from "../../../com/matrix/script/ScriptDataRow";
import { ScrpitCallableStatement } from "../../../com/matrix/script/ScrpitCallableStatement";
import { ScriptPreparedStatement } from "../../../com/matrix/script/ScriptPreparedStatement";
/**
* 데이터베이스에 접속하여 쿼리 작업을 지원합니다.
*/
export interface ScriptConnection{

  /** 
   * 트랜잭션을 시작합니다.
   *
  */
  BeginTransaction(): boolean;

  /** 
   * 트랜잭션을 커밋합니다.
   *
  */
  CommitTransaction(): boolean;

  /** 
   * 데이터베이스에 연결합니다.
   *
  * @param code 데이터베이스 연결 코드
  */
  Connect(code: string): boolean;

  /** 
   * 데이터베이스 연결을 해제합니다.
   *
  */
  DisConnect(): void;

  /** 
   * 쿼리의 결과를 데이터 테이블 유형으로 반환합니다.
대용량의 데이터를 실행하면 서버에서 메모리 점유 문제가 발생할 수 있으니
callback을 지원하는 함수를 사용하시기 바랍니다.
   *
  * @param sql 실행 쿼리
  */
  ExecuteDataTable(sql: string): ScriptDataTable;

  /** 
   * 쿼리의 결과를 데이터 테이블 유형으로 반환합니다.
   *
   * @example
   * ```js
   * 
   * var req      = Matrix.getRequest();
   * var res      = Matrix.getResponse();
   * var session  = Matrix.getSession();
   * var util     = Matrix.getUtility();  
   * var con      = Matrix.getConnection(); 
   * var sql; 
   * try{
   * 	con.Connect("AUD_SAMPLE_DB");
   * 	sql = "SELECT * FROM TABLE";
   * 	
   * 	//쿼리 결과를 JSON 형태로 출력 합니다.
   * 	//[
   * 	//   {"COLUMN1":"value","COLUMN2":"value1"},
   * 	//   {"COLUMN1":"value","COLUMN2":"value1"}
   * 	//]
   * 	var writer = res.getJsonResponseWriter();	 								  
   * 	writer.beginArray();
   *   	//쿼리를 실행 후 Row 단위로 반복 작업 수행
   * 	//데이터를 메모리에 적재하지 않으므로 대용량 처리시 적합함.
   * 	con.ExecuteDataTable(sql 
   * 						,CALL_BACK(function(row){
   *                            var rs = row.getDataTable();     
   * 						   var name;
   * 						   var data;
   * 						   writer.beginObject();
   * 						   for(var c=0,len=rs.getColumnCount();c<len;c++){
   * 						   		name = rs.getColumn(c).getName();
   * 								writer.addProperty(name ,row.getData(name));
   * 						   }
   * 						   writer.endObject();
   * 						   return null;//다음 row 읽기
   *                         }));
   *   	writer.endArray();
   * 	writer.close();
   * 	
   *   	con.DisConnect();
   * }catch(e){
   * 	Matrix.ThrowException("Server Script Error:" + e.message);
   * }finally{
   * 	// release here 
   * 	if(stmt != null){ 
   * 		stmt.Close(); 
   * 		stmt = null; 
   * 	} 
   * 	if(con != null){ 
   * 		con.DisConnect(); 
   * 		con = null; 
   * 	} 
   * }
   * ```
  * @param sql 실행 쿼리
  * @param callbackRow 파일의 Row 단위 데이터 처리 함수
  * ```
  * 
  *                     CALL_BACK(function(row){
  *                     //row == com.matrix.script.ScriptDataRow
  *                     //return true : 해당 row 를 데이터 테이블에 추가
  *                     //      false : 엑셀 파일 읽기 종료
  *                     //       null : 다음 row 읽기
  *               })
  * ```
  */
  ExecuteDataTable(sql: string, callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * 쿼리의 결과 중 제한된 레코드를 데이터 테이블 유형으로 반환합니다.

   *
  * @param sql 실행할 SQL
  * @param limitRows 제한할 레코드 수량
  */
  ExecuteDataTableLimit(sql: string, limitRows: number): ScriptDataTable;

  /** 
   * 프로시저 실행 결과를 데이터 테이블 유형으로 반환합니다.
   *
  * @param sql 실행할 SQL
  * @param limitRows 제한할 레코드 수량
  */
  ExecuteProcedure(sql: string, limitRows: number): ScriptDataTable;

  /** 
   * SQL을 실행하고 {@link ScriptRecordSet}을 반환합니다.
   *
   * @example
   * ```js
   *   	var con = Matrix.getConnection();
   * 	con.Connect("AUD_SAMPLE_DB");
   * 	var rs = con.ExecuteRecordSet("SELECT * FROM table");
   * 	while(rs.next()){
   * 		rs.getString("DBMS_CODE");
   * 	}
   * 	con.DisConnect();
   * 	con = null;
   * ```
  * @param sql 실행 쿼리
  */
  ExecuteRecordSet(sql: string): ScriptRecordSet;

  /** 
   * Scalar 형식의 쿼리를 실행한 결과를 반환합니다. (E.g. select count(*) from table)
   *
  * @param sql 실행 쿼리
  */
  ExecuteScalar(sql: string): number;

  /** 
   * 입력/수정/삭제 쿼리를 실행합니다.
   *
  * @param sql 실행 쿼리
  */
  ExecuteUpdate(sql: string): number;

  /** 
   * 입력/수정/삭제 쿼리를 실행합니다. {@link ScriptPreparedStatement}의 바인딩 기능을 사용합니다.
   *
  * @param table 테이블 객체
  * @param row 대상 레코드
  * @param tableName 대상 테이블 명
  * @param useStatement 바인딩 사용 여부
  */
  ExecuteUpdateRow(table: ScriptDataTable, row: ScriptDataRow, tableName: string, useStatement: boolean): number;

  /** 
   * JDBC의 CallableStatement 객체를 생성 반환합니다(Procedure 사용할 경우)
   *
  * @param sql 실행 쿼리
  */
  PrepareCall(sql: string): ScrpitCallableStatement;

  /** 
   * JDBC의 CallableStatement 객체를 생성 반환합니다(Procedure 사용할 경우)
   *
  * @param sql 실행 쿼리
  * @param useName 쿼리 변수명 사용 여부
  */
  PrepareCall(sql: string, useName: boolean): ScrpitCallableStatement;

  /** 
   * JDBC의 PreparedStatement 객체를 생성 후 반환합니다.
   *
  * @param sql 실행 쿼리
  */
  PreparedStatement(sql: string): ScriptPreparedStatement;

  /** 
   * JDBC의 PreparedStatement 객체를 생성 후 반환합니다.
   *
  * @param sql 실행 쿼리
  * @param useName 쿼리 변수명 사용 여부
  */
  PreparedStatement(sql: string, useName: boolean): ScriptPreparedStatement;

  /** 
   * 트랜잭션을 롤백합니다.
   *
  */
  RollBackTransaction(): boolean;

  /** 
   * 쿼리를 실행하기 위한 Statement 객체를 생성합니다.
   *
  */
  createStatement(): ScriptPreparedStatement;

  /** 
   * 데이터베이스 연결의 카탈로그 정보를 반환합니다.
   *
  */
  getCatalog(): string;

  /** 
   * 현재 연결된 데이터베이스의 DbType를 반환합니다.
   *
  */
  getDbType(): number;

  /** 
   * 데이터베이스 연결의 카탈로그 정보를 설정합니다.
   *
  * @param catalogName 카탈로그 이름
  */
  setCatalog(catalogName: string): void;

}
