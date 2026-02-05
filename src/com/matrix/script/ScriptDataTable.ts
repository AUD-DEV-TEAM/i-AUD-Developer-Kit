import { ScriptDataColumn } from "../../../com/matrix/script/ScriptDataColumn";
import { enKeyType } from "../../../com/matrix/data/enKeyType";
import { enDataType } from "../../../com/matrix/data/enDataType";
import { enSaveMode } from "../../../com/matrix/data/enSaveMode";
import { ScriptDataRow } from "../../../com/matrix/script/ScriptDataRow";
/**
* 데이터 테이블 모델
*/
export interface ScriptDataTable{

  /** 
   * 컬럼을 추가합니다. 키 유형, 데이터 유형, 저장 방식을 지정할 수 있습니다.
   *
  * @param columnName 컬럼명
  * @param isNumber 수치형인지 여부
  * @param keyType 키 유형
  * @param dataType 데이터 유형
  * @param saveMode 저장 실행 방식
  */
  AddColumn(columnName: string, isNumber: boolean, keyType: enKeyType, dataType: enDataType, saveMode: enSaveMode): ScriptDataColumn;

  /** 
   * 컬럼을 추가합니다.
   *
  * @param columnName 컬럼명
  * @param isNumber 수치형인지 여부
  */
  AddColumn(columnName: string, isNumber: boolean): ScriptDataColumn;

  /** 
   * 테이블 내 레코드를 추가하고 추가된 레코드 객체를 반환합니다.
   *
  * @param row 추가할 행
  */
  AppendRow(row: ScriptDataRow): ScriptDataRow;

  /** 
   * 테이블 내 레코드를 추가하고 추가된 레코드 객체를 반환합니다.
   *
  */
  AppendRow(): ScriptDataRow;

  /** 
   * 현재 테이블에 새로운 테이블의 모든 레코드를 추가합니다.
   *
  * @param table 테이블
  */
  AppendTableRows(table: ScriptDataTable): void;

  /** 
   * 테이블 내 모든 레코드의 작업 상태 (N: 신규, U: 수정, D: 삭제)를 삭제합니다.
   *
  */
  ClearRowStatus(): void;

  /** 
   * 테이블 내 모든 레코드를 삭제합니다.
   *
  */
  ClearRows(): void;

  /** 
   * 레코드를 순회합니다.
   *
  */
  FetchRows(): void;

  /** 
   * 테이블 내 레코드를 조회합니다. OLAP의 Write-back은 레코드가 많으므로 반드시 이 함수에서 처리합니다.
   *
  * @param callbackRow 콜백 함수
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
  FetchRows(callbackRow: (row: ScriptDataRow )=>boolean|null): void;

  /** 
   * 필터 조건에 충족하는 데이터 테이블을 반환합니다.
   *
  * @param filterText 필터 구분(e.g.FIELD_NAME = 'Korea'  )
  */
  Filter(filterText: string): ScriptDataTable;

  /** 
   * 테이블 내 특정 위치의 레코드를 삭제합니다.
   *
  * @param idx 레코드의 위치
  */
  RemoveRow(idx: number): void;

  /** 
   * 레코드를 정렬합니다.
   *
  * @param expression 정렬 설정(e.g. [FIELD_1] ASC , [FIELD_1] DESC)
  */
  Sort(expression: string): void;

  /** 
   * 테이블 내 특정 컬럼을 반환합니다.
   *
  * @param index index
  */
  getColumn(index: number): ScriptDataColumn;

  /** 
   * 테이블 내 특정 컬럼을 반환합니다.
   *
  * @param columnName Column 명
  */
  getColumn(columnName: string): ScriptDataColumn;

  /** 
   * 테이블 내 컬럼의 개수를 반환합니다.
   *
  */
  getColumnCount(): number;

  /** 
   * 테이블 내 컬럼의 목록을 배열 유형으로 반환합니다.
   *
  */
  getColumns(): ScriptDataColumn[];

  /** 
   * 특정 레코드의 값을 반환합니다.
   *
  * @param recordIndex 레코드의 위치
  * @param columnName Column 명
  */
  getData(recordIndex: number, columnName: string): any;

  /** 
   * 특정 레코드의 값을 반환합니다.
   *
  * @param recordIndex 레코드의 위치
  * @param columnName Column 명
  */
  getDouble(recordIndex: number, columnName: string): number;

  /** 
   * 특정 레코드의 값을 반환합니다.
   *
  * @param recordIndex 레코드의 위치
  * @param columnName Column 명
  */
  getInt(recordIndex: number, columnName: string): number;

  /** 
   * 테이블 객체의 고유 이름을 반환합니다.
   *
  */
  getName(): string;

  /** 
   * 테이블 내 특정 위치의 레코드를 반환합니다.
   *
  * @param idx 레코드의 위치
  */
  getRow(idx: number): ScriptDataRow;

  /** 
   * 테이블 내 데이터의 개수를 반환합니다.
   *
  */
  getRowCount(): number;

  /** 
   * 특정 레코드의 값을 반환합니다.
   *
  * @param recordIndex 레코드의 위치
  * @param columnName Column 명
  */
  getString(recordIndex: number, columnName: string): string;

  /** 
   * 데이터베이스와 연결된 테이블 명을 반환합니다.
   *
  */
  getTableName(): string;

  /** 
   * 특정 레코드의 값을 수정합니다.
   *
  * @param recordIndex 레코드의 위치
  * @param columnName Column 명
  * @param value 수정할 값
  */
  setData(recordIndex: number, columnName: string, value: any): void;

  /** 
   * 테이블 내 모든 레코드의 작업 상태를 변경합니다.
   *
  * @param status 상태 값 (N: 신규, U: 수정, D: 삭제)
  */
  setRowStatus(status: string): void;

  /** 
   * 데이터베이스와 연결된 테이블 명을 설정합니다.
   *
  * @param name 이름
  */
  setTableName(name: string): void;

  /** 
   * SAP RFC DataTable 형태로 변환합니다.
   *
  */
  toSapDataTable(): any;

}
