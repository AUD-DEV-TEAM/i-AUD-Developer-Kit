import { NamedDictionary } from "../../../aud/data/NamedDictionary";
/**
* 트리 컨트롤을 구성하는 노드 인터페이스. 계층 구조의 트리 데이터를 표현합니다.
*/
export interface MTXTreeNode{

  /**
   * 자식 노드 목록
  */
  Childs: MTXTreeNode[];

  /**
   * 코드
  */
   readonly Code: string;

  /**
   * DataRow
  */
  Data: NamedDictionary;

  /**
   * 노드 Depth
  */
  Depth: number;

  /**
   * 체크박스 체크여부
  */
  IsChecked: boolean;

  /**
   * 노드 펼침여부
  */
  IsExpand: boolean;

  /**
   * 폴더여부
  */
  IsFolder: boolean;

  /**
   * 자식노드 조회여부
  */
  IsGetSubFolder: boolean;

  /**
   * 최상위노드 여부
  */
  IsRoot: boolean;

  /**
   * 부모 노드
  */
  Parent: MTXTreeNode;

  /** 
   * 노드 하위노드 삭제
   *
  */
  Clear(): void;

  /** 
   * 노드 접기
   *
  * @param ignoreEvent 사용자 Event 호출 무시 여부(권장: true)
  * ```
  * true
  * ```
  */
  Collapsed(ignoreEvent: boolean): void;

  /** 
   * 전체 열기 & 특정 레벨 열기에서 불필요한 이벤트 제거
   *
  * @param ignoreEvent 사용자 Event 호출 무시 여부(권장: true)
  * ```
  * true
  * ```
  */
  Expand(ignoreEvent: boolean): void;

  /** 
   * 접힌 노드 열기
   *
  */
  ExpandCollapsed(): void;

  /** 
   * 경로 가져오기
   *
  */
  GetPath(): string;

  /** 
   * 노드 데이터의 값 가져오기
   *
  * @param name 데이터 명
  */
  GetValue(name: string): string;

  /** 
   * 자식노드 삭제
   *
  * @param nodeCode 자식노드 코드
  */
  RemoveChild(nodeCode: string): void;

  /** 
   * 자식노드 모두 삭제
   *
  */
  RemoveChildAll(): void;

  /** 
   * 노드 체크박스에 값 넣기
   *
  * @param checked 채크 여부
  */
  SetChecked(checked: boolean): void;

  /** 
   * 노드 선택
   *
  * @param flag 선택 여부
  */
  SetSelect(flag: boolean): void;

  /** 
   * 노드 데이터에 값 넣기
   *
  * @param name 데이터 명
  * @param value 데이터 값
  */
  SetValue(name: string, value: string): void;

}
