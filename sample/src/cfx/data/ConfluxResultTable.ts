import { ScriptConfluxScriptColumn } from "../../cfx/data/ScriptConfluxScriptColumn";
import { ScriptConfluxResultTableRow } from "../../cfx/data/ScriptConfluxResultTableRow";
/**
* Conflux Result Table
*/
export interface ConfluxResultTable{

  /** 
   * Column을 추가하여 반환합니다.
   *
   * @example
   * ```js
   * var newColumn = table.AddColumn("newColumn", 1);
   * ```
  * @param columnName 컬럼명
  * @param type 타입
  */
  AddColumn(columnName: string, type: number): ScriptConfluxScriptColumn;

  /** 
   * Column을 추가하여 반환합니다.
   *
   * @example
   * ```js
   * var newColumn = table.AddColumn("newColumn", true);
   * ```
  * @param columnName 컬럼명
  * @param isNumber 숫자인지 아닌지 여부
  */
  AddColumn(columnName: string, isNumber: boolean): ScriptConfluxScriptColumn;

  /** 
   * Column을 추가하여 반환합니다.
   *
   * @example
   * ```js
   * var newColumn = table.AddColumn("newColumn");
   * ```
  * @param columnName 컬럼명
  */
  AddColumn(columnName: string): ScriptConfluxScriptColumn;

  /** 
   * valueList로 Row를 추가합니다.
   *
  * @param valueList 값 리스트
  */
  AppendRow(valueList: any): void;

  /** 
   * TableRow객체로 직접 Row를 추가하여 반환합니다.
   *
  * @param row Table Row 객체
  */
  AppendRow(row: ScriptConfluxResultTableRow): void;

  /** 
   * Row를 생성합니다.
   *
  */
  CreateRow(): ScriptConfluxResultTableRow;

  /** 
   * Column을 배열형태로 반환합니다.
   *
  */
  getColumns(): ScriptConfluxScriptColumn[];

  /** 
   * Table 명을 반환합니다.
   *
  */
  getName(): string;

  /** 
   * Table 명을 지정합니다.
   *
  * @param name Result Table 명
  */
  setName(name: string): void;

}
