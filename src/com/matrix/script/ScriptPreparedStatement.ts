import { ScriptRecordSet } from "../../../com/matrix/script/ScriptRecordSet";
import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
import { ScriptDataRow } from "../../../com/matrix/script/ScriptDataRow";
/**
* JDBC PreparedStatement 객체에 대한 접근을 제공합니다.
*/
export interface ScriptPreparedStatement{

  /** 
   * PreparedStatement에 속한 쿼리 실행 한 Resuleset에 대한 접근을 제공합니다.
   *
  */
  ExecuteRecordSet(): ScriptRecordSet;

  /** 
   * 쿼리를 실행하고 해당 결과를 텍스트 파일로 출력합니다.
   *
   * @example
   * ```js
   * var con = Matrix.getConnection(); // DataBase Connector //
   * var fso = Matrix.getFileSystemObject(); // file access //
   * var sql; 
   * var stmt; 
   * 
   * try{	
   * 	con.Connect("MTXRPTY");  
   * 	sql = "SELECT * FROM MTX_REPORT";
   * 	stmt = con.PreparedStatement(sql ,true);
   * 	var filePath = fso.getTemplatePath("aaa.csv");
   * 	stmt.SaveTextFile(filePath ,"\n" ,",");
   * 	  
   * 	con.DisConnect();
   * 	con = null;
   *   
   * }catch(e){
   * 	Matrix.ThrowException("Server Script Error:" + e.message);
   * }finally{
   * 
   * 	 if(stmt != null){ 
   * 	    stmt.Close(); 
   * 	    stmt = null; 
   * 	 } 
   * 	 if(con != null){ 
   * 	    con.DisConnect(); 
   * 	    con = null; 
   * 	 } 
   * }
   * ```
  * @param fileName 파일 경로
  * @param rowDelimiter row delimiter
  * @param colDelimiter column delimiter
  */
  SaveTextFile(fileName: string, rowDelimiter: string, colDelimiter: string): void;

  /** 
   * PreparedStatement의 batch에 파라미터 셋을 추가합니다.
   *
  * @param sql SQL
  */
  addBatch(sql: string): void;

  /** 
   * PreparedStatement의 batch에 파라미터 셋을 추가합니다.
   *
  */
  addBatch(): void;

  /** 
   * PreparedStatement의 batch실행 파라미터셋을 모두 제거합니다.
   *
  */
  clearBatch(): void;

  /** 
   * 파라미터 값 전체 삭제
   *
  */
  clearParameters(): ScriptPreparedStatement;

  /** 
   * PreparedStatement 종료
   *
  */
  close(): void;

  /** 
   * PreparedStatement에 속한 모든 유형의 쿼리 실행
   *
  */
  execute(): boolean;

  /** 
   * PreparedStatement에 속한 모든 유형의 쿼리 실행
   *
  * @param sql 실행 쿼리
  */
  execute(sql: string): boolean;

  /** 
   * PreparedStatement의 batch실행 파라미터셋을 실행합니다.
   *
   * @example
   * ```js
   * 
   * var req = Matrix.getRequest();
   * var res = Matrix.getResponse();
   * var session  = Matrix.getSession();
   * var util = Matrix.getUtility();
   * 
   * var con = Matrix.getConnection();
   * var fso = Matrix.getFileSystemObject();
   * var stmt = null;
   * var sql = "";
   * try{
   * 	//입력 대상 데이터 베이스의 dbms_code를 가져온다.
   * 	//SELECT DBMS_CODE FROM MTX_DBMS WHERE DBMS_ALIAS_NAME = ''
   * 	con.Connect("DBNMS");  
   * 	con.BeginTransaction();
   * 	
   * 	var folder = req.getParam("VS_FOLDER_PATH");
   * 	var file   = req.getParam("VS_FILE_NAME");
   * 	var fileExt = req.getParam("VS_FILE_EXT");
   * 	//파일의 경로를 가져온다.
   * 	var path   = fso.PathCombine(folder ,file);
   * 	
   * 	var READ_ROWS = 0;
   *     //inset statement
   * 	sql = "  INSERT INTO mex_crud_data (  "
   * 		+ "  	d1 		    ,d2 		,d3  "
   * 		+ "  	,m1 		,m2 		,m3) "
   * 		+ "   VALUES ( "
   * 		+ "     :d1 		,:d2 		,:d3  "
   * 		+ "  	,:m1 		,:m2 		,:m3) ";
   * 		
   * 	stmt = con.PrepareCall(sql ,true);
   * 	
   * 	//레코드 별로 데이터 베이스에 삽입합니다.
   * 	var PROCESS_ROW = function(row){
   * 	
   * 		stmt.setString(":d1" ,row.getString("D1"));
   * 		stmt.setString(":d2" ,row.getString("D2"));
   * 		stmt.setString(":d3" ,row.getString("D3"));;
   * 		
   * 		stmt.setDouble(":m1" ,row.getDouble("M1"));
   * 		stmt.setDouble(":m2" ,row.getDouble("M2"));
   * 		stmt.setDouble(":m3" ,row.getDouble("M3"));;
   * 		
   * 		stmt.addBatch();  //배치로 추가
   * 		
   * 		READ_ROWS ++;		
   * 		return null ;// 다음 row 읽기
   * 	}
   * 	
   * 	//파일 읽기
   * 	if(fileExt.toLowerCase() == "xlsx"){
   * 		util.ReadExcelFile(path , CALL_BACK(function(row){
   * 									return PROCESS_ROW(row);
   * 								}));
   * 	}else{  
   * 		util.ReadCSVFile(path ,false ,"," ,"\n" , CALL_BACK(function(row){
   * 													return PROCESS_ROW(row);
   * 												}));
   * 	}		
   * 		
   * 	stmt.executeBatch(); // 배치 실행
   * 	
   * 	
   * 	con.CommitTransaction();  ///data base commit
   * 	stmt.Close();
   * 	stmt = null;
   * 	con.DisConnect();
   * 	con = null;
   * 	 
   * }catch(e){
   * 	con.RollBackTransaction(); //rollback tran
   * 	Matrix.ThrowException("Server Script Error" + e.message);	
   * }finally{
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
  executeBatch(): void;

  /** 
   * PreparedStatement에 속한 쿼리 실행 후, 쿼리에 의해 생성된 ScriptDataTable 객체를 반환합니다.
   *
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
  executeQuery(callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * PreparedStatement에 속한 쿼리 실행 후, 쿼리에 의해 생성된 ScriptDataTable 객체를 반환합니다.
   *
  */
  executeQuery(): ScriptDataTable;

  /** 
   * PreparedStatement에 속한 쿼리 중 입력(Insert), 수정(Update), 또는 삭제(Delete)와 같은 DML 쿼리 또는 DDL 쿼리 실행
   *
  */
  executeUpdate(): number;

  /** 
   * 지정된 매개변수를 주어진 Array 객체로 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param typeName 데이터 타입 이름(e.g. VARCHAR, NUMERIC)
  * @param array 값 배열
  */
  setArray(idx: number, typeName: string, array: object[]): ScriptPreparedStatement;

  /** 
   * 지정된 매개변수를 주어진 Array 객체로 설정합니다.
   *
  * @param name 변수명
  * @param typeName 데이터 타입 이름(e.g. VARCHAR, NUMERIC)
  * @param array 값 배열
  */
  setArray(name: string, typeName: string, array: object[]): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터에 BLOB 값을 설정합니다.
   *
   * @example
   * ```js
   * var con = Matrix.getConnection(); 
   * var fso = Matrix.getFileSystemObject();
   * try{
   * 	// database connect
   * 	con.Connect("DBxxxxx");
   * 	con.BeginTransaction();
   * 	var sql = "INSERT INTO BLOB_TEST(ID, NAME, FILE_DATA) VALUES(:ID,:NAME,:FILE_DATA)";
   * 	var stmt = con.PrepareCall(sql ,true);
   * 	
   * 	var files = fso.getFiles("WEB_IMAGES");
   * 	for(var i=0; i<files.length; i++){
   * 		var file =fso.getFileInfo(files[i]);
   * 		stmt.setString(":ID", file.getName());
   * 		stmt.setString(":NAME", file.getName());
   * 		stmt.setBLOBFile(":FILE_DATA" , fso.PathCombine("WEB_IMAGES" , file.getPath()));
   * 		stmt.executeUpdate();
   * 	}
   * 	stmt.close();
   * 	stmt = null;
   * 	con.CommitTransaction();
   * 	con.DisConnect();
   * 	con = null;
   * }catch(e){
   * 	con.RollBackTransaction();
   * 	Matrix.ThrowException("데이터 저장 실패" +e.message);
   * }finally{
   * 	//release here 
   * 	 if(stmt != null){ 
   * 	    stmt.close(); 
   * 	    stmt = null; 
   * 	 } 
   * 	 if(con != null){ 
   * 	    con.DisConnect(); 
   * 	    con = null; 
   * 	 } 
   * }
   * ```
  * @param name 변수명
  * @param filePath Path of file.
  */
  setBLOBFile(name: string, filePath: string): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터에 BLOB 값을 설정합니다.
   *
   * @example
   * ```js
   * 
   * var con = Matrix.getConnection(); 
   * var fso = Matrix.getFileSystemObject();
   * try{
   * 	// database connect
   * 	con.Connect("DBxxxxx");
   * 	con.BeginTransaction();
   * 	var sql = "INSERT INTO BLOB_TEST(ID, NAME, FILE_DATA) VALUES(?, ?, ?)";
   * 	var stmt = con.PrepareCall(sql ,true);
   * 	
   * 	var files = fso.getFiles("WEB_IMAGES");
   * 	for(var i=0; i<files.length; i++){
   * 		var file =fso.getFileInfo(files[i]);
   * 		stmt.setString(1, file.getName());
   * 		stmt.setString(2, file.getName());
   * 		stmt.setBLOBFile(3, fso.PathCombine("WEB_IMAGES" , file.getPath()));
   * 		stmt.executeUpdate();
   * 	}
   * 	stmt.close();
   * 	stmt = null;
   * 	con.CommitTransaction();
   * 	con.DisConnect();
   * 	con = null;
   * }catch(e){
   * 	con.RollBackTransaction();
   * 	Matrix.ThrowException("데이터 저장 실패" +e.message);
   * }finally{
   * 	//release here 
   * 	 if(stmt != null){ 
   * 	    stmt.close(); 
   * 	    stmt = null; 
   * 	 } 
   * 	 if(con != null){ 
   * 	    con.DisConnect(); 
   * 	    con = null; 
   * 	 } 
   * }
   * ```
  * @param idx 파라미터 인덱스
  * @param filePath Path of file.
  */
  setBLOBFile(idx: number, filePath: string): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 Boolean 유형의 값으로 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param value 값
  */
  setBoolean(idx: number, value: boolean): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 Boolean 유형의 값으로 설정합니다.
   *
  * @param name 변수명
  * @param value 값
  */
  setBoolean(name: string, value: boolean): ScriptPreparedStatement;

  /** 
   *  지정된 파라미터를 CharacterStream(문자 스트림) 유형의 값으로 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param value 값
  */
  setCharacterStream(idx: number, value: string): ScriptPreparedStatement;

  /** 
   *  지정된 파라미터를 CharacterStream(문자 스트림) 유형의 값으로 설정합니다.
   *
  * @param name 변수명
  * @param value 값
  */
  setCharacterStream(name: string, value: string): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터에 Date 값을 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param date Date
  */
  setDate(idx: number, date: object): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터에 Date 값을 설정합니다.
   *
  * @param name 파라미터 명
  * @param date Date
  */
  setDate(name: string, date: object): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 Double 유형의 값으로 설정합니다.
   *
  * @param name 변수명
  * @param value 값
  */
  setDouble(name: string, value: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 Double 유형의 값으로 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param value 값
  */
  setDouble(idx: number, value: number): ScriptPreparedStatement;

  /** 
   * PreparedStatement에 의해 생성된 ResultSet 객체가 Row를 추가로 필요로 할 때, Row는 DB로부터 Fetch 되며, 이에 대한 Hint를 JDBC 드라이버에 넘깁니다. 값이 '0'으로 설정되면 Hint를 무시하며, 기본 값은 '0'입니다.
   *
  * @param size Fetch 사이즈
  */
  setFetchSize(size: number): void;

  /** 
   * 지정된 파라미터를 Float 유형의 값으로 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param value 값
  */
  setFloat(idx: number, value: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 Float 유형의 값으로 설정합니다.
   *
  * @param name 변수명
  * @param value 값
  */
  setFloat(name: string, value: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 Int 유형의 값으로 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param value 값
  */
  setInt(idx: number, value: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 Int 유형의 값으로 설정합니다.
   *
  * @param name 변수명
  * @param value 값
  */
  setInt(name: string, value: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 Long 유형의 값으로 설정합니다.
   *
  * @param name 변수명
  * @param value 값
  */
  setLong(name: string, value: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 Long 유형의 값으로 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param value 값
  */
  setLong(idx: number, value: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 null 값으로 설정합니다.
   *
  * @param name Parameter name
  */
  setNull(name: string): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 null 값으로 설정합니다.
   *
  * @param idx Parameter Index
  * @param columnType column's datatype
  */
  setNull(idx: number, columnType: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 null 값으로 설정합니다.
   *
  * @param idx Parameter Index
  */
  setNull(idx: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 null 값으로 설정합니다.
   *
  * @param name Parameter name
  * @param columnType column's datatype
  */
  setNull(name: string, columnType: number): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를  object 형의 값으로 설정합니다.
   *
  * @param name 파라미터 명
  * @param value 값
  */
  setObject(name: string, value: object): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를  object 형의 값으로 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param value 값
  */
  setObject(idx: number, value: object): ScriptPreparedStatement;

  /** 
   * Statement 객체 실행 대기 시간을 초 단위로 설정한다.
   *
  * @param seconds seconds the new query timeout limit in seconds; zero means there is no limit
  */
  setQueryTimeout(seconds: number): void;

  /** 
   * 지정된 파라미터를 String 유형의 값으로 설정합니다.
   *
  * @param name 변수명
  * @param value 값
  */
  setString(name: string, value: string): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터를 String 유형의 값으로 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param value 값
  */
  setString(idx: number, value: string): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터에 Time 값을 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param date Date
  */
  setTime(idx: number, date: object): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터에 Time 값을 설정합니다.
   *
  * @param name 파라미터 명
  * @param date Date
  */
  setTime(name: string, date: object): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터에 Timestamp 값을 설정합니다.
   *
  * @param idx 파라미터 인덱스
  * @param date Date
  */
  setTimestamp(idx: number, date: object): ScriptPreparedStatement;

  /** 
   * 지정된 파라미터에 Timestamp 값을 설정합니다.
   *
  * @param name 파라미터 명
  * @param date Date
  */
  setTimestamp(name: string, date: object): ScriptPreparedStatement;

}
