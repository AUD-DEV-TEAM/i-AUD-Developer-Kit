/**
* OLAP 데이터 테이블의 행(Row) 객체로 데이터 읽기 수정이 가능합니다.
*/
export interface DataRow{

  /** 
   * 특정 컬럼이 Lock인지 여부를 반환 합니다.
   *
  * @param dataColumnIndex OlapField의 DataColumnIndex
  */
  IsLockColumn(dataColumnIndex: number): boolean;

  /** 
   * 특정 컬럼의 값을 반환 합니다. Measure 필드의 값만 허용 합니다.
   *
  * @param dataColumnIndex OlapField의 DataColumnIndex
  */
  getNumber(dataColumnIndex: number): number;

  /** 
   * 특정 디멘전 값을 가져옵니다.(Dimension 필드)
   *
  * @param columnName 컬럼명
  */
  getString(columnName: string): string;

  /** 
   * 특정 디멘전 값을 가져옵니다.(Dimension 필드)
   *
  * @param dataColumnIndex OlapField의 DataColumnIndex
  */
  getString(dataColumnIndex: number): string;

  /** 
   * 특정 컬럼의 값을 설정합니다.
   *
  * @param dataColumnIndex OlapField의 DataColumnIndex
  * @param columnValue 값
  */
  setNumber(dataColumnIndex: number, columnValue: number): void;

  /** 
   * 특정 디멘전의 값을 설정합니다.
   *
  * @param columnName 컬럼명
  * @param text  텍스트
  */
  setString(columnName: string, text: string): void;

  /** 
   * 특정 디멘전의 값을 설정합니다.
   *
  * @param index OlapField의 DataColumnIndex
  * @param text  텍스트
  */
  setString(index: number, text: string): string;

}
