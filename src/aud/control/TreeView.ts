import { Control } from "../../aud/control/Control";
import { ContextMenu } from "../../aud/control/ContextMenu";
import { DataSet } from "../../aud/data/DataSet";
import { TreeViewNode } from "../../aud/control/treeviews/TreeViewNode";
import { SelectionModel } from "../../aud/control/treeview/SelectionModel";
import { enMetaItemDropType } from "../../aud/enums/treeview/enMetaItemDropType";
/**
* TreeView 객체
*/
export interface TreeView extends Control{

  /**
   * 보고서가 열리면서 자동으로 Refresh를 할지 여부
  */
  AutoRefresh: boolean;

  /**
   * 컨텍스트 메뉴 객체
   * @hidden
  */
  ContextMenu: ContextMenu;

  /**
   * 데이터 셋
  */
  DataSet: DataSet;

  /**
   * Tree Option
   * @hidden
  */
  Option: any;

  /**
   * 최상위 노드
   * @hidden
  */
  RootNode: TreeViewNode;

  /**
   * 행 목록
   * @hidden
  */
  Rows: TreeViewNode[];

  /**
   * 선택 행 정보 객체
  */
  Selection: SelectionModel;

  /**
   * 전체 행 목록
   * @hidden
  */
  TotalRows: TreeViewNode[];

  /** 
   * 행 추가
   *
  * @param key 추가하려는 node의 key
  * @param parentKey 추가하려는 node의 parent key
  */
  AppendRow(key: string, parentKey: string): TreeViewNode|undefined;

  /** 
   * 데이타 계산과 그리기를 해주는 메소드
   *
  * @param keepAutoExpandLevel 확장된 노드를 유지할지 말지 선택
  */
  Calculate(keepAutoExpandLevel: boolean): void;

  /** 
   * DataSet을 Clear한다
   *
   * @hidden
  */
  ClearDataSet(): void;

  /** 
   * Focus를 Clear한다
   *
   * @hidden
  */
  ClearFocus(): void;

  /** 
   * node의 하위 node들을 rows에서 삭제한다.
   *
  * @param node 접으려는 대상 Node
  */
  Collapse(node: TreeViewNode): void;

  /** 
   * 전체 축소
   *
  */
  CollapseAll(): void;

  /** 
   * 선택한 node들의 Parent값들을 바꿔준다.
   *
  * @param dropType Drop 타입
  * @param targetNode 대상 Node
  * @param draggingRows 드래깅 중인 Row들
   * @hidden
  */
  DragAndDrop(dropType: enMetaItemDropType, targetNode: TreeViewNode, draggingRows: any): void;

  /** 
   * node의 하위 node들을 rows에 추가한다.
   *
  * @param node 선택한 노드
   * @hidden
  */
  Expand(node: TreeViewNode): void;

  /** 
   * 전체 확장
   *
   * @hidden
  */
  ExpandAll(): void;

  /** 
   * key에 해당하는 row를 찾아서 이동
   *
  * @param key node의 key
  */
  FindAndFocus(key: string): TreeViewNode|undefined;

  /** 
   * 지정된 DataSet을 반환한다
   *
   * @hidden
  */
  GetDataSet(): DataSet;

  /** 
   * key에 해당하는 TreeNode를 반환한다
   *
  * @param key 찾으려는 노드의 키
  */
  GetTreeNode(key: string): TreeViewNode|undefined;

  /** 
   * 행 삭제
   *
  * @param key node의 key
  */
  RemoveRow(key: string): void;

  /** 
   * 특정 노드를 선택하는 메소드
   *
  * @param idx 행번호
   * @hidden
  */
  SelectRow(idx: number): void;

  /** 
   * 전체 row의 bound를 계산해주는 메소드
   *
   * @hidden
  */
  SetBound(): void;

  /** 
   * DataSet을 지정한다
   *
  * @param dataSet 지정하려는 DataSet
   * @hidden
  */
  SetDataSet(dataSet: DataSet): void;

  /** 
   * Selection을 지정한다
   *
  * @param node 노드의 키나 노드를 받아서 Selection으로 지정함
   * @hidden
  */
  SetSelection(node: string|TreeViewNode): void;

  /** 
   * control에 overriding 되서 자주 호출되므로 그리기만 수행함
   *
  * @param updateRows 업데이트 Row들
  */
  Update(updateRows?: boolean): void;

  /**
   * @event 
   *
   * row가 화면에 최초 표시될 때 발생
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnCellLoaded : (sender : TreeView
  , args : { 
    /**
     * 표시되는 Node
    */
    Row: TreeViewNode
    /**
     * IsDisposed
    */
    IsDisposed: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * Tree의 체크 박스를 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnCheckBoxClicked : (sender : TreeView
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 체크 유무
    */
    Checked: boolean
    /**
     * 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
    */
    Cancel: boolean
    /**
     * 레코드 노드
    */
    Row: TreeViewNode
    /**
     * 체크한 항목을 메타에 바로 추가할 지 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 컨텍스트 메뉴가 열릴 때 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnContextMenuOpenning : (sender : TreeView
  , args : { 
    /**
     * MenuObject
    */
    Menu: ContextMenu
  }
  ) => void;


  /**
   * @event 
   *
   * 더블 클릭시 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnDoubleClick : (sender : TreeView
  , args : { 
    /**
     * Id
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
   * 드래그 이벤트
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnDrag : (sender : TreeView
  , args : { 
    /**
     * IsDisposed
    */
    IsDisposed: boolean
    /**
     * 부모 여부
    */
    IsParent: boolean
    /**
     * 선택된 Row들
    */
    SelectedRows: any
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
   * 드롭이 끝난 후 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnEndDrop : (sender : TreeView
  , args : { 
    /**
     * 취소여부
    */
    Cancel: boolean
    /**
     * IsDisposed
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
   * 키 입력 시 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnKeyDown : (sender : TreeView
  , args : { 
  }
  ) => void;


  /**
   * @event 
   *
   * 선택된 아이템이 바뀔 때 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnSelectedItemChanged : (sender : TreeView
  , args : { 
    /**
     * Id
    */
    Id: string
    /**
     * 선택된 Node들
    */
    SelectedNodes: TreeViewNode[]
    /**
     * 마지막으로 선택된 Node
    */
    LastSelectedNode: TreeViewNode
  }
  ) => void;


  /**
   * @event 
   *
   * 드래그 시작 시 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnStartDrag : (sender : TreeView
  , args : { 
    /**
     * Id
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
    SelectedRows: any
    /**
     * 취소 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 드롭을 시작할 때 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnStartDrop : (sender : TreeView
  , args : { 
    /**
     * 취소 여부
    */
    Cancel: boolean
    /**
     * Handled
    */
    Handled: boolean
    /**
     * IsDisposed
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
   * 캡션 수정 후 enter or change 이벤트 시 발생
   *
   * @param args
   *
   * Target : {@link TreeView}
  */
  OnTextChange : (sender : TreeView
  , args : { 
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
