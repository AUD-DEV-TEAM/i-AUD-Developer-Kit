import { ConfluxNode } from "../../cfx/rpt/ConfluxNode";
import { ConfluxEnvironment } from "../../cfx/control/ConfluxEnvironment";
/**
* Conflux 객체. i-AUD Script Editor에서 접근 가능합니다.
*/
export interface ReportConflux{

  /** 
   * 캐시를 재활용하여 보고서를 실행합니다.
   *
  */
  executeAll(): ConfluxNode[];

  /** 
   * 보고서를 실행합니다.
   *
  * @param remake 재생성 여부(true : 전체 다시 생성, false:캐시 재활용)
  */
  executeAll(remake: boolean): ConfluxNode[];

  /** 
   * 캐시를 재활용하여 보고서의 특정 노드를 실행합니다.
   *
  * @param nodeName 노드 명
   * @hidden
  */
  executeNode(nodeName: string): void;

  /** 
   * 보고서의 특정 노드를 실행합니다.
   *
  * @param nodeName 노드 명
  * @param remake 재생성 여부(true : 전체 다시 생성, false:캐시 재활용)
   * @hidden
  */
  executeNode(nodeName: string, remake: boolean): void;

  /** 
   * 보고서에 정의된 Activity 노드 목록을 반환합니다.
   *
  */
  getDocumentNodes(): ConfluxNode[];

  /** 
   * Conflux 환경 정보를 반환합니다.
   *
  */
  getEnvironment(): ConfluxEnvironment;

  /** 
   * 노드명에 해당하는 보고서의 정의된 Activity 노드를 반환합니다.
   *
  * @param nodeName 노드명
   * @hidden
  */
  getNode(nodeName: string): ConfluxNode;

  /** 
   * 특정 변수의 값을 반환합니다.
   *
  * @param key 변수명
  */
  getVariable(key: string): string;

  /** 
   * 변수명 목록을 반환합니다.
   *
  */
  getVariableNames(): string[];

  /** 
   * Conflux 레포트를 불러옵니다.
   *
  * @param reportCode 레포트 코드
  */
  loadReport(reportCode: string): void;

  /** 
   * 특정 변수의 값을 셋팅합니다.
   *
  * @param key 변수명
  * @param value 변수값
  */
  setVariable(key: string, value: string): void;

}
