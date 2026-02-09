import { ConfluxResultTable } from "../../cfx/data/ConfluxResultTable";
import { ConfluxEnvironment } from "../../cfx/control/ConfluxEnvironment";
import { ConfluxResultFile } from "../../cfx/data/ConfluxResultFile";
import { ConfluxTable } from "../../cfx/data/ConfluxTable";
/**
* Conflux 객체. AUD-Conflux Script Editor에서 접근 가능합니다.
*/
export interface Conflux{

  /** 
   * Result File을 추가합니다.
   *
  * @param name 파일명
  * @param path 파일 경로
  * @param type 파일 타입
  */
  addResultFile(name: string, path: string, type: string): void;

  /** 
   * Result Table을 추가합니다.
   *
  * @param name 이름
  * @param resultTable 추가할 Conflux Result Table 객체
  */
  addResultTable(name: string, resultTable: ConfluxResultTable): void;

  /** 
   * Conflux Result Table을 생성하여 반환합니다.
   *
  */
  createResultTable(): ConfluxResultTable;

  /** 
   * Conflux 환경 변수 객체를 반환합니다.
   *
  */
  getEnvironment(): ConfluxEnvironment;

  /** 
   * Conflux Result File 배열을 반환합니다.
   *
  */
  getFiles(): ConfluxResultFile[];

  /** 
   * Conflux Table을 반환합니다.
   *
  * @param name Conflux 테이블 명
  */
  getTable(name: string): ConfluxTable;

  /** 
   * Conflux Table 배열을 반환합니다.
   *
  */
  getTables(): ConfluxTable[];

  /** 
   * 특정 변수의 값을 반환합니다.
   *
  * @param key 가져올 변수 Key
  */
  getVariable(key: string): string;

  /** 
   * 특정 변수의 값을 셋팅합니다.
   *
  * @param key 지정할 변수 Key
  * @param value 지정할 변수 Value
  */
  setVariable(key: string, value: string): void;

}
