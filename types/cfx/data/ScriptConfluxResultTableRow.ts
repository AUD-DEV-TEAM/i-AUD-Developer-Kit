/**
* Conflux Result Table 의 Row
*/
export interface ScriptConfluxResultTableRow{

  /** 
   * 레코드의 특정 셀의 값을 설정합니다.
   *
  * @param columnIndex 값을 지정할 컬럼 Index
  * @param value 지정할 값
  */
  setData(columnIndex: number, value: any): void;

  /** 
   * 레코드의 특정 셀의 값을 설정합니다.
   *
  * @param columnName 값을 지정할 컬럼명
  * @param value 지정할 값
  */
  setData(columnName: string, value: any): void;

}
