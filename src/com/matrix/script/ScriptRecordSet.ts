/**
* 데이터베이스에서 ResultSet의 데이터를 순차적으로 읽을 수 있는 기능을 제공합니다.
*/
export interface ScriptRecordSet{

  /** 
   * ResultSet의 데이터를 반환합니다.
   *
  * @param columnIndex 컬럼 이름 또는 인덱스
  */
  getData(columnIndex: string|number): any;

  /** 
   * ResultSet의 데이터를 double 형태로 반환합니다.
   *
  * @param columnIndex 컬럼 이름 또는 인덱스
  */
  getDouble(columnIndex: string|number): number;

  /** 
   * ResultSet의 데이터를 INT 타입으로 반환합니다.
   *
  * @param columnIndex 컬럼 이름 또는 인덱스
  */
  getInt(columnIndex: string|number): number;

  /** 
   * ResultSet의 데이터를 문자열 형태로 반환합니다.
   *
  * @param columnIndex 컬럼 이름 또는 인덱스
  */
  getString(columnIndex: string|number): string;

  /** 
   * ResultSet의 Cursor를 이동합니다.
ResultSet에 데이터가 더이상 존재하지 않을 시 false를 반환합니다.
   *
  */
  next(): boolean;

}
