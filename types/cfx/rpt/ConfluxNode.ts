import { ConfluxResultFile } from "../../cfx/data/ConfluxResultFile";
import { ConfluxTable } from "../../cfx/data/ConfluxTable";
/**
* Conflux Node
*/
export interface ConfluxNode{

  /** 
   * Activity 노드의 코드를 반환합니다.
   *
  */
  getCode(): string;

  /** 
   * Activity 노드의 산출물 파일 목록을 반환합니다.
   *
  */
  getFiles(): ConfluxResultFile[];

  /** 
   * Activity 노드의 이름을 반환합니다.
   *
  */
  getName(): string;

  /** 
   * Activity 노드의 산출물 테이블 목록을 반환합니다.
   *
  */
  getTables(): ConfluxTable[];

  /** 
   * Activity 노드의 타입을 반환합니다.
   *
  */
  getType(): number;

  /** 
   * 노드 실행 여부를 반환합니다.
   *
   * @hidden
  */
  isExecuted(): boolean;

}
