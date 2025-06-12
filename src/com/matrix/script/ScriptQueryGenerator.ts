import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
import { ScriptDataRow } from "../../../com/matrix/script/ScriptDataRow";
import { enDBType } from "../../../com/matrix/data/enDBType";
/**
* 데이터 테이블 기준으로 입력/수정/삭제 쿼리를 자동으로 생성해 줍니다.
*/
export interface ScriptQueryGenerator{

  /** 
   * 일반 입력 쿼리를 생성해 줍니다.
   *
  * @param table 테이블 객체
  * @param row 대상 레코드
  * @param tableName 대상 테이블 명
  * @param dbType 데이터베이스 유형
  */
  getDMLCommand(table: ScriptDataTable, row: ScriptDataRow, tableName: string, dbType: enDBType): string;

  /** 
   * 데이터베이스별 시스템 일자 반환 함수명를 반환합니다.
   *
  * @param dbType 데이터베이스 유형
  */
  getDateTimeNowString(dbType: enDBType): string;

  /** 
   * 병합 쿼리를 생성해 줍니다.
   *
  * @param table 테이블 객체
  * @param row 대상 레코드
  * @param tableName 대상 테이블 명
  * @param dbType 데이터베이스 유형
  */
  getMergeCommand(table: ScriptDataTable, row: ScriptDataRow, tableName: string, dbType: enDBType): string;

  /** 
   * 쿼리의 바인딩 변수의 값을 대입한 SQL을 반환 합니다.
   *
  * @param sql SQL
  * @param dbmsCode DBMS Code
  */
  getParameterBindedSQL(sql: string, dbmsCode: string): string;

  /** 
   * 쿼리의 바인딩 변수의 값을 대입한 SQL을 반환 합니다.
   *
  * @param sql SQL
  */
  getParameterBindedSQL(sql: string): string;

  /** 
   * 쿼리 내에서 바인딩 변수의 목록을 추출 합니다.
   *
  * @param sql SQL
  */
  getQueryParameters(sql: string): string[];

  /** 
   * 데이터 베이스 연결 옵션에서 인용 기호(")의  삭제 옵션이 활성화된 경우 주어진 쿼리에서 인용 기호(")를 삭제 한 쿼리를 반환 합니다.
   *
  * @param sql SQL
  * @param dbmsCode DBMS Code
  */
  removeDoubleQuotation(sql: string, dbmsCode: string): string;

  /** 
   * 쿼리내의 주석을 제거합니다.
   *
  * @param sql SQL
  */
  removeSQLComments(sql: string): string;

}
