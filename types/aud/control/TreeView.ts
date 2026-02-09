import { Control } from "../../aud/control/Control";
import { ContextMenu } from "../../aud/control/ContextMenu";
import { DataSet } from "../../aud/data/DataSet";
import { TreeViewNode } from "../../aud/control/treeviews/TreeViewNode";
import { SelectionModel } from "../../aud/control/treeviews/SelectionModel";
import { enMetaItemDropType } from "../../aud/enums/treeview/enMetaItemDropType";
/**
 * 트리뷰 컨트롤입니다.
 */
export interface TreeView extends Control {

  /**
   * 보고서가 열리면서 자동으로 조회할지 여부를 가져오거나 설정합니다.
   */
  AutoRefresh: boolean;

  /**
   * 컨텍스트 메뉴 객체를 가져옵니다.
   * @hidden
   */
  ContextMenu: ContextMenu;

  /**
   * 데이터셋을 가져오거나 설정합니다.
   */
  DataSet: DataSet;

  /**
   * 트리 옵션을 가져옵니다.
   * @hidden
   */
  Option: object;

  /**
   * 최상위 노드를 가져옵니다.
   * @hidden
   */
  RootNode: TreeViewNode;

  /**
   * 행 목록을 가져옵니다.
   * @hidden
   */
  Rows: TreeViewNode[];

  /**
   * 선택 행 정보 객체를 가져옵니다.
   */
  Selection: SelectionModel;

  /**
   * 전체 행 목록을 가져옵니다.
   * @hidden
   */
  TotalRows: TreeViewNode[];

  /**
   * 행을 추가합니다.
   *
   * @param key 추가하려는 노드의 키
   * @param parentKey 추가하려는 노드의 부모 키
   */
  AppendRow(key: string, parentKey: string): TreeViewNode | undefined;

  /**
   * 데이터 계산과 그리기를 수행하는 메서드입니다.
   *
   * @param keepAutoExpandLevel 확장된 노드를 유지할지 여부
   */
  Calculate(keepAutoExpandLevel: boolean): void;

  /**
   * 데이터셋을 초기화합니다.
   *
   * @hidden
   */
  ClearDataSet(): void;

  /**
   * 포커스를 초기화합니다.
   *
   * @hidden
   */
  ClearFocus(): void;

  /**
   * 노드의 하위 노드들을 Rows에서 삭제합니다.
   *
   * @param node 접으려는 대상 노드
   */
  Collapse(node: TreeViewNode): void;

  /**
   * 전체 노드를 축소합니다.
   *
   */
  CollapseAll(): void;

  /**
   * 선택한 노드들의 부모 값들을 변경합니다.
   *
   * @param dropType 드롭 타입
   * @param targetNode 대상 노드
   * @param draggingRows 드래그 중인 Row들
   * @hidden
   */
  DragAndDrop(dropType: enMetaItemDropType, targetNode: TreeViewNode, draggingRows: TreeViewNode[]): void;

  /**
   * 노드의 하위 노드들을 Rows에 추가합니다.
   *
   * @param node 선택한 노드
   * @hidden
   */
  Expand(node: TreeViewNode): void;

  /**
   * 전체 노드를 확장합니다.
   *
   * @hidden
   */
  ExpandAll(): void;

  /**
   * 키에 해당하는 Row를 찾아서 이동합니다.
   *
   * @param key 노드의 키
   */
  FindAndFocus(key: string): TreeViewNode | undefined;

  /**
   * 지정된 데이터셋을 반환합니다.
   *
   * @hidden
   */
  GetDataSet(): DataSet;

  /**
   * 키에 해당하는 TreeNode를 반환합니다.
   *
   * @param key 찾으려는 노드의 키
   */
  GetTreeNode(key: string): TreeViewNode | undefined;

  /**
   * 행을 삭제합니다.
   *
   * @param key 노드의 키
   */
  RemoveRow(key: string): void;

  /**
   * 특정 노드를 선택하는 메서드입니다.
   *
   * @param idx 행 번호
   * @hidden
   */
  SelectRow(idx: number): void;

  /**
   * 전체 Row의 Bound를 계산하는 메서드입니다.
   *
   * @hidden
   */
  SetBound(): void;

  /**
   * 데이터셋을 지정합니다.
   *
   * @param dataSet 지정하려는 데이터셋
   * @hidden
   */
  SetDataSet(dataSet: DataSet): void;

  /**
   * Selection을 지정합니다.
   *
   * @param node 노드의 키나 노드를 받아서 Selection으로 지정합니다.
   * @hidden
   */
  SetSelection(node: string | TreeViewNode): void;

  /**
   * 컨트롤에 오버라이딩되어 자주 호출되므로 그리기만 수행합니다.
   *
   * @param updateRows 업데이트 Row 여부
   */
  Update(updateRows?: boolean): void;

  /**
   * @event
   *
   * Row가 화면에 최초 표시될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnCellLoaded: (sender: TreeView
    , args: {
      /**
       * 표시되는 노드
       */
      Row: TreeViewNode
      /**
       * Disposed 여부
       */
      IsDisposed: boolean
    }
  ) => void;


  /**
   * @event
   *
   * 트리의 체크박스를 클릭하는 순간 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnCheckBoxClicked: (sender: TreeView
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 체크 여부
       */
      Checked: boolean
      /**
       * 이 값을 `true`로 설정하면 클릭 처리가 취소됩니다.
       */
      Cancel: boolean
      /**
       * 레코드 노드
       */
      Row: TreeViewNode
      /**
       * 체크한 항목을 메타에 바로 추가할지 여부
       */
      Handled: boolean
    }
  ) => void;


  /**
   * @event
   *
   * 컨텍스트 메뉴가 열릴 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnContextMenuOpenning: (sender: TreeView
    , args: {
      /**
       * 컨텍스트 메뉴 객체
       */
      Menu: ContextMenu
    }
  ) => void;


  /**
   * @event
   *
   * 더블클릭 시 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnDoubleClick: (sender: TreeView
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 노드
       */
      Node: TreeViewNode
    }
  ) => void;


  /**
   * @event
   *
   * 드래그 시 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnDrag: (sender: TreeView
    , args: {
      /**
       * Disposed 여부
       */
      IsDisposed: boolean
      /**
       * 부모 여부
       */
      IsParent: boolean
      /**
       * 선택된 Row들
       */
      SelectedRows: TreeViewNode[]
      /**
       * 대상
       */
      Target: TreeViewNode
      /**
       * 타입
       */
      Type: number
    }
  ) => void;


  /**
   * @event
   *
   * 드롭이 끝난 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnEndDrop: (sender: TreeView
    , args: {
      /**
       * 취소 여부
       */
      Cancel: boolean
      /**
       * Disposed 여부
       */
      IsDisposed: boolean
      /**
       * 선택된 Row들
       */
      SelectedRows: TreeViewNode[]
      /**
       * 대상
       */
      Target: TreeViewNode
      /**
       * 타입
       */
      Type: number
    }
  ) => void;


  /**
   * @event
   *
   * 키 입력 시 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnKeyDown: (sender: TreeView
    , args: {
    }
  ) => void;


  /**
   * @event
   *
   * 선택된 아이템이 바뀔 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnSelectedItemChanged: (sender: TreeView
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드들
       */
      SelectedNodes: TreeViewNode[]
      /**
       * 마지막으로 선택된 노드
       */
      LastSelectedNode: TreeViewNode
    }
  ) => void;


  /**
   * @event
   *
   * 드래그 시작 시 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnStartDrag: (sender: TreeView
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 타입
       */
      Type: number
      /**
       * 대상
       */
      Target: TreeViewNode
      /**
       * 선택된 Row들
       */
      SelectedRows: TreeViewNode[]
      /**
       * 취소 여부
       */
      Cancel: boolean
    }
  ) => void;


  /**
   * @event
   *
   * 드롭을 시작할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnStartDrop: (sender: TreeView
    , args: {
      /**
       * 취소 여부
       */
      Cancel: boolean
      /**
       * Handled 여부
       */
      Handled: boolean
      /**
       * Disposed 여부
       */
      IsDisposed: boolean
      /**
       * 선택된 Row들
       */
      SelectedRows: TreeViewNode[]
      /**
       * 대상
       */
      Target: TreeViewNode
      /**
       * 타입
       */
      Type: number
    }
  ) => void;


  /**
   * @event
   *
   * 캡션 수정 후 Enter 또는 Change 이벤트 시 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
   */
  OnTextChange: (sender: TreeView
    , args: {
      /**
       * 선택된 Row
       */
      SelectedRow: TreeViewNode
      /**
       * 값
       */
      Value: string
    }
  ) => void;


}
