import { TreeViewNode } from "../../../aud/control/treeviews/TreeViewNode";
/**
 * TreeView 선택 모델입니다.
 */
export interface SelectionModel {

  /**
   * 해당 노드를 선택에 추가합니다.
   *
   * @param node 노드
   */
  AddSelect(node: TreeViewNode): void;

  /**
   * 해당 노드를 선택에서 제외합니다.
   *
   * @param node 노드
   */
  DeSelect(node: TreeViewNode): void;

}
