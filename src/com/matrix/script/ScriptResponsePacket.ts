import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
import { ScriptPreparedStatement } from "../../../com/matrix/script/ScriptPreparedStatement";
import { ScriptDataSet } from "../../../com/matrix/script/ScriptDataSet";
import { JsonFileWriter } from "../../../com/matrix/Excel/io/JsonFileWriter";
import { ResponsePrintWriter } from "../../../com/matrix/Excel/Writer/ResponsePrintWriter";
/**
* 클라이언트로 출력할 응답을 제어할 수 있는 객체로 다중의 데이터테이블 객체를 출력 할 수 있습니다.
*/
export interface ScriptResponsePacket{

  /** 
   * 쿼리 실행 결과를 테이블로 생성합니다. Client에서는 테이블 명으로 접근이 가능합니다.
   *
  * @param tableName 테이블 명
  * @param connectionCode 데이터베이스 연결 코드
  * @param sql 쿼리 문자열
  */
  CreateTable(tableName: string, connectionCode: string, sql: string): ScriptDataTable;

  /** 
   * 빈 테이블을 생성합니다.
   *
  * @param tableName Table name
  */
  CreateTable(tableName: string): ScriptDataTable;

  /** 
   * addAsyncTable() 메서드를 통해 등록된 DataTable들의 쿼리를 비동기적으로 실행합니다.
   *
  */
  ExecuteAsyncTables(): void;

  /** 
   * Client로 텍스트 결과를 전달 합니다.
   *
  * @param text text
  */
  WriteResponseText(text: string): void;

  /** 
   * 주어진 경로의 파일의 내용을 전송합니다.
   *
  * @param path file path
  */
  WriteResponseTextFile(path: string): void;

  /** 
   * 쿼리를 실행하여 결과를 테이블로 생성하며, 클라이언트는 테이블 이름을 통해 접근할 수 있습니다. 쿼리는 ExecuteAsyncTables() 호출 시 병렬로 실행됩니다.
   *
   * @example
   * ```js
   * 
   * var req = Matrix.getRequest(); 
   * var res = Matrix.getResponse();
   * var sql =" SELECT user_code, meta_file_code, d1,d2,d3,d4,d5, m1,m2,m3,m4,m5 FROM mex_user_file_data limit 10000 ";
   * // 쿼리를 실행하여 결과를 테이블로 생성 (비동기 처리)
   * res.addAsyncTable("T1", "MTXRPTY", sql );
   * res.addAsyncTable("T2", "MTXRPTY", sql );
   * res.addAsyncTable("T3", "MTXRPTY", sql );
   * res.addAsyncTable("T4", "MTXRPTY", sql );
   * res.addAsyncTable("T5", "MTXRPTY", sql );
   * //등록된 쿼리를 실행 (서버의 메모리를 사용하지 않고 바로 Client레 출력 합니다.)
   * res.ExecuteAsyncTables();
   * ```
  * @param tableName DataTabel의 이름
  * @param connectionCode 데이터 베이스 연결 코드
  * @param sql SQL
  */
  addAsyncTable(tableName: string, connectionCode: string, sql: string): ScriptDataTable;

  /** 
   * Client에서 사용할 DataTable을 등록합니다.
DataTable의 결과 데이터가 많아도 서버의 메모리에 저장하지 않습니다.
ScriptPreparedStatement와 해당 데이터 베이스의 Connection 객체는 데이터 출력 후 자동으로 연결을 해제합니다.
강제로 해당 객체를 닫을 경우 Client 데이터 출력 중 에러가 발생합니다.
   *
   * @example
   * ```js
   * 	
   * 	// 쿼리 결과를 서버 메모리에 담지 않고 바로 Client로 내보내기	
   * 	var req = Matrix.getRequest();
   * 	var res = Matrix.getResponse();
   * 	var con = Matrix.getConnection();
   * 	var sql; 
   * 	var stmt; 
   * 		
   * 	con.Connect("MTXRPTY"); //데이터 베이스 연결
   * 	sql = "SELECT * FROM MTX_REPORT";	
   * 	stmt = con.PreparedStatement(sql);	
   * 	
   * 	//사용자에게 전달할 테이블을 Statement의 결과로 등록하도록 합니다.
   * 	//서버에 메모리를 사용하지 않고 Client로 바로 데이터를 출력합니다.
   * 	//여기에서 사용한 Statement와 데이터베이스 연결객체는 데이터 출력 후 자동으로 닫히므로 닫으면 안됩니다.	
   * 	res.addTable("T01",stmt); 
   * 	
   * 	// stmt.close();   <= 닫으면 에러 발생
   * 	// stmt = null; 
   * 	//con.DisConnect(); <= 닫으면 에러 발생
   * 	//con = null;
   * ```
  * @param tableName table name
  * @param statement PreparedStatement
  */
  addTable(tableName: string, statement: ScriptPreparedStatement): boolean;

  /** 
   * Client에서 사용할 DataTable을 등록합니다.
DataTable의 결과 데이터가 많은 경우 서버 메모리 점유 문제를 발생시킬 수 있으니,  가벼운 데이터에 한정하여 사용하시고,  많은 데이터에 대한 처리는 "addTable(string tableName, ScriptPrepareStatement stmt)"를 사용하시기 바랍니다.
   *
  * @param tableName Table name
  * @param table table
  */
  addTable(tableName: string, table: ScriptDataTable): boolean;

  /** 
   * Client에서 전달할 데이터셋을 반환합니다.
   *
  */
  getDataSet(): ScriptDataSet;

  /** 
   * Client에 json 결과를 작성할 수 있는 객체를 반환 합니다.
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
   * 	con.Connect("DBMS Code");
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
  */
  getJsonResponseWriter(): JsonFileWriter;

  /** 
   * Client에 텍스트 결과를 전달 할 수 있는 객체를 반환 합니다.
   *
  */
  getResponseWriter(): ResponsePrintWriter;

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

}
