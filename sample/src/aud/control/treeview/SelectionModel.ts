import { TreeViewNode } from "../../../aud/control/treeviews/TreeViewNode";
/**
* TreeView 선택 객체
*/
export interface SelectionModel{

  /** 
   * 해당 node를 선택에 포함하는 메소드
   *
  * @param node 노드
  */
  AddSelect(node: TreeViewNode): void;

  /** 
   * 해당 node를 선택에 제외하는 메소드
   *
  * @param node 노드
  */
  DeSelect(node: TreeViewNode): void;

}
