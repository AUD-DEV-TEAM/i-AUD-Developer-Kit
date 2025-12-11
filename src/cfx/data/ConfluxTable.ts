import { ScriptConfluxScriptColumn } from "../../cfx/data/ScriptConfluxScriptColumn";
/**
* Conflux Table
*/
export interface ConfluxTable{

  /** 
   * Fetch를 실행합니다.
   *
  */
  executeFetch(): void;

  /** 
   * Column 배열을 반환합니다.
   *
  */
  getColumns(): ScriptConfluxScriptColumn[];

  /** 
   * Table 명을 반환합니다.
   *
  */
  getName(): string;

  /** 
   * Row 를 반환합니다.
   *
  */
  getRow(): any;

  /** 
   * 다음 행이 있는지에 대한 여부를 반환합니다.
   *
  */
  nextRow(): boolean;

}
