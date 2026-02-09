/**
* AUD 보고서의 DataSource 객체에 대한 접근을 제공합니다.
*/
export interface DataSourceInfo{

  /** 
   * 데이터베이스 연결 코드
   *
  */
  getConnectionCode(): string;

  /** 
   * SQL 정보
   *
  */
  getSQL(): string;

}
