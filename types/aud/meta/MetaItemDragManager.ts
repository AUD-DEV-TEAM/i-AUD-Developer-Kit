import { TreeViewNode } from "../../aud/control/treeviews/TreeViewNode";
/**
* i-META Viewer 항목 drag 관리 객체
* @hidden
*/
export interface MetaItemDragManager{

  /** 
   * 체크박스 클릭 시 작동하는 메소드
   *
  * @param control treeView, ListBox, Filter 컨트롤
  * @param node 체크한 TreeViewNode
  * @param newValue 체크 여부
   * @hidden
  */
  ClickCheckBox(control: any, node: TreeViewNode, newValue: boolean): void;

  /** 
   * 초기화 메소드
   *
   * @hidden
  */
  Init(): void;

}
