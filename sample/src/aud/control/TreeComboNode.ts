/**
* 멀티 콤보 박스의 노드 객체에 대한 정보를 제공합니다.
*/
export interface TreeComboNode{

  /**
   * 자식 노드가 있는지 여부
  */
  HasChildrens: boolean;

  /**
   * 체크 박스가 체크되었는지 여부
  */
  IsChecked: boolean;

  /**
   * 노드의 확장상태인지 여부
  */
  IsExpanded: boolean;

  /**
   * 부모 노드
  */
  ParentNode: TreeComboNode;

  /** 
   * 노드의 하위 레벨을 축소 합니다.
   *
  */
  Collapsed(): void;

  /** 
   * 노드의 하위 레벨을 확장 합니다.
   *
  */
  Expand(): void;

  /** 
   * 노드의 자식 노드들의 목록을 반환합니다.
   *
  */
  getChildrens(): TreeComboNode[];

  /** 
   * 노드의 특정 필드의 값을 반환합니다.
   *
  * @param name 필드명
  */
  getData(name: string): any;

  /** 
   * 노드의 체크 박스 상태를 변경합니다.
   *
  * @param checked 체크 여부
  */
  setChecked(checked: boolean): void;

}
