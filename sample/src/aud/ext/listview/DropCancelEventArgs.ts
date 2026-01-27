import { ListViewItem } from "../../../aud/ext/listview/ListViewItem";
import { AddIn } from "../../../aud/control/AddIn";
/**
* drag&drop 이 취소될 경우 발생하는 이벤트의 arguments
*/
export interface DropCancelEventArgs{

  /**
   * 다른 리스트뷰로 이동 시, Drop Event를 방지하는 변수(true:방지, false:기본 동작 수행, default:false)
  */
  EventCancel: boolean;

  /**
   * 현재 선택 된 Items
  */
  SelectedItems: ListViewItem[];

  /**
   * 이동 대상이 되는 ListView가 포함 된 AddIn Control
  */
   readonly Target: AddIn;

}
