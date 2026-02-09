/**
 * 멀티 콤보박스의 노드 객체에 대한 정보를 제공합니다.
 */
export interface TreeComboNode {

  /**
   * 자식 노드가 있는지 여부를 가져옵니다.
   */
  HasChildrens: boolean;

  /**
   * 체크박스가 체크되었는지 여부를 가져옵니다.
   */
  IsChecked: boolean;

  /**
   * 노드의 확장 상태인지 여부를 가져옵니다.
   */
  IsExpanded: boolean;

  /**
   * 부모 노드를 가져옵니다.
   */
  ParentNode: TreeComboNode;

  /**
   * 노드의 하위 레벨을 축소합니다.
   *
   */
  Collapsed(): void;

  /**
   * 노드의 하위 레벨을 확장합니다.
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
   * @param name 필드 이름
   */
  getData(name: string): string;

  /**
   * 노드의 체크박스 상태를 변경합니다.
   *
   * @param checked 체크 여부
   */
  setChecked(checked: boolean): void;

}
