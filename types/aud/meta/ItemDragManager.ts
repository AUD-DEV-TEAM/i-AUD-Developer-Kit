import { MetaListBox } from "../../aud/meta/MetaListBox";
import { TreeView } from "../../aud/control/TreeView";
import { TreeViewNode } from "../../aud/control/treeviews/TreeViewNode";
import { DataRow } from "../../aud/data/DataRow";
/**
* 항목 drag 관리 객체
* @hidden
*/
export interface ItemDragManager{

  /**
   * MetaListBox 컨트롤 배열
   * @hidden
  */
  ControlList: MetaListBox[];

  /**
   * 메타 항목 트리뷰
   * @hidden
  */
  ItemTreeView: TreeView;

  /**
   * 병합 메타 항목 트리뷰
   * @hidden
  */
  MergeItemTreeView: TreeView;

  /** 
   * 체크박스 클릭 시 작동하는 메소드
   *
  * @param control treeView, ListBox, Filter 컨트롤
  * @param node 체크한 TreeViewNode
  * @param newValue 체크 여부
   * @hidden
  */
  ClickCheckBox(control?: any, node?: TreeViewNode, newValue?: boolean): void;

  /** 
   * 이름으로 ListBox control 찾는 메소드
   *
  * @param name 컨트롤 이름
   * @hidden
  */
  GetListBox(name: string): MetaListBox;

  /** 
   * 초기화 메소드
   *
   * @hidden
  */
  Init(): void;

  /** 
   * 병합 항목 생성 메소드
   *
  * @param control 병합할 항목이 있는 대상 컨트롤
   * @hidden
  */
  Merge(control: TreeView): DataRow[];

}
