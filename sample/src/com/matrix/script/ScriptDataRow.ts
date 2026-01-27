import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
/**
* 데이터 레코드 모델
*/
export interface ScriptDataRow{

  /** 
   * 레코드의 작업 상태 (N: 신규, U: 수정, D: 삭제)를 삭제합니다.
   *
  */
  ClearRowStatus(): void;

  /** 
   * 레코드의 값을 반환합니다.
   *
  * @param column 컬럼 인덱스 또는 컬럼명
  */
  getData(column: string|number): any;

  /** 
   * 레코드가 포함된 데이터 테이블을 반환합니다.
   *
  */
  getDataTable(): ScriptDataTable;

  /** 
   * 레코드의 값을 반환합니다.
   *
  * @param column 컬럼 인덱스 또는 컬럼명
  */
  getDouble(column: string|number): number;

  /** 
   * 레코드의 값을 반환합니다.
   *
  * @param column 컬럼 인덱스 또는 컬럼명
  */
  getInt(column: string|number): number;

  /** 
   * 레코드의 전체 Column의 값을 배열 유형으로 반환합니다.
   *
  */
  getItemArray(): Array<any>;

  /** 
   * 레코드의 작업 상태 (N: 신규, U: 수정, D: 삭제)를 반환합니다.
   *
  */
  getRowStatus(): string;

  /** 
   * 레코드의 값을 반환합니다.
   *
  * @param column 컬럼 인덱스 또는 컬럼명
  */
  getString(column: string|number): string;

  /** 
   * 레코드의 값을 수정합니다.
   *
  * @param column 컬럼 인덱스 또는 컬럼명
  * @param value 값
  */
  setData(column: string|number, value: any): void;

  /** 
   * 배열의 값을 레코드의 값으로 수정합니다.
   *
  * @param array 값 배열
  */
  setItemArray(array: Array<any>): void;

  /** 
   * 레코드의 작업 상태 (N: 신규, U: 수정, D: 삭제)를 수정합니다.
   *
  * @param status 상태 값 (N: 신규, U: 수정, D: 삭제)
  */
  setRowStatus(status: string): void;

}
