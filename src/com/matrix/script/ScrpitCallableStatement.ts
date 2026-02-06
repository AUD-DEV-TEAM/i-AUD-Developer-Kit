import { ScriptPreparedStatement } from "../../../com/matrix/script/ScriptPreparedStatement";
import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
import { enSQLTypes } from "../../../com/matrix/data/enSQLTypes";
import { ScriptDataRow } from "../../../com/matrix/script/ScriptDataRow";
/**
* JDBC CallableStatement 객체에 대한 접근을 제공합니다.
*/
export interface ScrpitCallableStatement extends ScriptPreparedStatement{

  /** 
   * 다음 결과셋을 데이터 테이블 형태로 반환합니다.
   *
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
  FetchTable(callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * PreparedStatement의 batch에 파라미터 셋을 추가합니다.
   *
  * @param sql SQL
  */
  addBatch(sql: string): void;

  /** 
   * CallableStatement의 batch 명령어에 파라미터 셋을 추가합니다.
   *
  */
  addBatch(): void;

  /** 
   * CallableStatement에 속한 모든 유형의 저장 프로시저 실행
   *
  */
  execute(): boolean;

  /** 
   * CallableStatement에 속한 쿼리 실행 후, 쿼리에 의해 생성된 ScriptDataTable 객체를 반환합니다.
   *
  */
  executeQuery(): ScriptDataTable;

  /** 
   * CallableStatement에 속한 쿼리 중 입력(Insert), 수정(Update), 또는 삭제(Delete)와 같은 DML 또는 DDL 저장 프로시저 실행
   *
  */
  executeUpdate(): number;

  /** 
   * 지정된 파라미터의 BLOB 값을 파일로 생성한 뒤 해당 파일의 경로를 반환합니다.
   *
  * @param name 파라미터 명
  */
  getBlob(name: string): string;

  /** 
   * 지정된 파라미터의 BLOB 값을 파일로 생성한 뒤 해당 파일의 경로를 반환합니다.
   *
  * @param idx 파라미터 인덱스
  */
  getBlob(idx: number): string;

  /** 
   * 지정된 JDBC BIT 또는 BOOLEAN 파라미터 값을 Java에 있는 boolean 유형으로 불러옵니다.
   *
  * @param paramName 파라미터 명
  */
  getBoolean(paramName: string): boolean;

  /** 
   * 지정된 JDBC BIT 또는 BOOLEAN 파라미터 값을 Java에 있는 boolean 유형으로 불러옵니다.
   *
  * @param idx 파라미터 인덱스
  */
  getBoolean(idx: number): boolean;

  /** 
   * 지정된 JDBC CLOB 파라미터 값을 Java에 있는 문자열 형식으로 불러옵니다.
   *
  * @param paramName 파라미터 명
  */
  getClob(paramName: string): string;

  /** 
   * 지정된 JDBC CLOB 파라미터 값을 Java에 있는 문자열 형식으로 불러옵니다.
   *
  * @param idx 파라미터 인덱스
  */
  getClob(idx: number): string;

  /** 
   * 지정된 REFERENCE CURSOR 파라미터 값을 ScriptDataTable 형식으로 불러옵니다.
   *
  * @param paramName 파라미터 명
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
  getDataTable(paramName: string, callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * 지정된 REFERENCE CURSOR 파라미터 값을 ScriptDataTable 형식으로 불러옵니다.
   *
  * @param paramName 파라미터 명
  */
  getDataTable(paramName: string): ScriptDataTable;

  /** 
   * 지정된 REFERENCE CURSOR 파라미터 값을 ScriptDataTable 형식으로 불러옵니다.
   *
  * @param idx 파라미터 인덱스
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
  getDataTable(idx: number, callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * 지정된 REFERENCE CURSOR 파라미터 값을 ScriptDataTable 형식으로 불러옵니다.
   *
  * @param idx 파라미터 인덱스
  */
  getDataTable(idx: number): ScriptDataTable;

  /** 
   * 지정된 JDBC 날짜 파라미터 값을 Java에 있는 문자열 형식으로 불러옵니다.
   *
  * @param paramName 파라미터 명
  * @param fmt 날짜 형식 (E.g. yyyy-MM-dd)
  */
  getDate(paramName: string, fmt: string): string;

  /** 
   * 지정된 JDBC 날짜 파라미터 값을 Java에 있는 문자열 형식으로 불러옵니다.
   *
  * @param idx 파라미터 인덱스
  * @param fmt 날짜 형식 (E.g. yyyy-MM-dd)
  */
  getDate(idx: number, fmt: string): string;

  /** 
   * 지정된 JDBC DOUBLE 파라미터 값을 Java에 있는 double 형식으로 불러옵니다.
   *
  * @param paramName 파라미터 명
  */
  getDouble(paramName: string): number;

  /** 
   * 지정된 JDBC DOUBLE 파라미터 값을 Java에 있는 double 형식으로 불러옵니다.
   *
  * @param idx 파라미터 인덱스
  */
  getDouble(idx: number): number;

  /** 
   * 지정된 JDBC FLOAT 파라미터 값을 Java에 있는 float 형식으로 불러옵니다.
   *
  * @param idx 파라미터 인덱스
  */
  getFloat(idx: number): number;

  /** 
   * 지정된 JDBC FLOAT 파라미터 값을 Java에 있는 float 형식으로 불러옵니다.
   *
  * @param paramName 파라미터 명
  */
  getFloat(paramName: string): number;

  /** 
   * 지정된 JDBC INTEGER 파라미터 값을 Java에 있는 Int 형식으로 불러옵니다.
   *
  * @param paramName 파라미터 명
  */
  getInt(paramName: string): number;

  /** 
   * 지정된 JDBC INTEGER 파라미터 값을 Java에 있는 Int 형식으로 불러옵니다.
   *
  * @param idx 파라미터 인덱스
  */
  getInt(idx: number): number;

  /** 
   * 지정된 파라미터의 값을 반환합니다.
   *
  * @param name 파라미터 명
  */
  getLong(name: string): any;

  /** 
   * 지정된 파라미터의 값을 반환합니다.
   *
  * @param idx 파라미터 인덱스
  */
  getLong(idx: number): any;

  /** 
   * 다음 결과셋으로 이동하고 현재 결과셋을 닫습니다.
   *
  */
  getMoreResults(): boolean;

  /** 
   * 지정된 파라미터의 값을 반환합니다.
   *
  * @param idx 파라미터 인덱스
  */
  getObject(idx: number): any;

  /** 
   * 지정된 파라미터의 값을 반환합니다.
   *
  * @param name 파라미터 명
  */
  getObject(name: string): any;

  /** 
   * 지정된 JDBC CHAR, VARCHAR 또는 LONGVARCHAR 파라미터 값을 Java에 있는 문자열 형식으로 불러옵니다.
   *
  * @param paramName 파라미터 명
  */
  getString(paramName: string): string;

  /** 
   * 지정된 JDBC CHAR, VARCHAR 또는 LONGVARCHAR 파라미터 값을 Java에 있는 문자열 형식으로 불러옵니다.
   *
  * @param idx 파라미터 인덱스
  */
  getString(idx: number): string;

  /** 
   * JDBC가 제공하는 sqlType의 parameterIndex에 OUT 파라미터를 등록합니다. 모든 OUT 파라미터는 저장 프로시저가 실행되기 전에 등록되어 있어야 합니다.
   *
  * @param idx 파라미터 인덱스
  * @param type sqlType
  */
  registerOutParameter(idx: number, type: enSQLTypes): void;

  /** 
   * CallableStatement에 의해 생성된 ResultSet 객체가 Row를 추가로 필요로 할 때, Row는 DB로부터 Fetch 되며, 이에 대한 Hint를 JDBC 드라이버에 넘깁니다. 값이 '0'으로 설정되면 Hint를 무시하며 기본 값은 '0'입니다.
   *
  * @param size Fetch 사이즈
  */
  setFetchSize(size: number): void;

}
