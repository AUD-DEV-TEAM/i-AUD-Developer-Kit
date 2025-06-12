import { ListViewItem } from "../../../aud/ext/listview/ListViewItem";
import { DropCancelEventArgs } from "../../../aud/ext/listview/DropCancelEventArgs";
/**
* ListView 컨트롤
*/
export interface ListView{

  /**
   * ListView 배경색
  */
  Background: string;

  /**
   * ListView 테두리 색상
  */
  BorderColor: string;

  /**
   * ListView 테두리 종류(none, dotted, dashed, solid)
  */
  BorderStyle: string;

  /**
   * ListView 테두리 두께
  */
  BorderThickness: string;

  /**
   * 헤더 컬럼
  */
  Column: ListViewItem;

  /**
   * DragAndDrop 지원 여부(해당 객체 Self)
  */
  IsDraggable: boolean;

  /**
   * DragAndDrop 지원 여부(Other ListView)
  */
  IsDraggableToOther: boolean;

  /**
   * 다중 선택 지원 여부
  */
  IsMultiSelect: boolean;

  /**
   * Items Map에 있는 모든 Key 배열
  */
  ItemKeys: ListViewItem[];

  /**
   * Items Map에 있는 모든 Values 배열
  */
  ItemValues: ListViewItem[];

  /**
   * ListView에 등록 된 모든 ListViewItem Map
  */
  Items: Map<string, ListViewItem>;

  /**
   * ListViewItem width를 ListView 가로 크기에 맞게 자동 리사이징
  */
  ListViewItemAutoResize: ListViewItem[];

  /**
   * 단일 선택 ListViewItem 객체
  */
  SelectedItem: ListViewItem;

  /**
   * 다중 선택 ListViewItem 객체
  */
  SelectedItems: ListViewItem[];

  /**
   * ListViewItem 선택 시, SelectionStyle 지정(테두리 두께, 테두리 색상, 배경색)
  */
  SelectionStyle: object;

  /**
   * 현재 표시되는 ListViewItem 배열
  */
  ViewItems: ListViewItem[];

  /** 
   * ListViewItem 추가
   *
  * @param item 항목
  */
  AddItem(item: ListViewItem): void;

  /** 
   * ListViewItem Clear
   *
  */
  Clear(): void;

  /** 
   * ListView SelectedItems All Clear
   *
  */
  ClearSelection(): void;

  /** 
   * ListViewItem 생성(Default)
   *
  */
  CreateListViewItem(): ListViewItem;

  /** 
   * ListViewItem 획득
   *
  * @param id ListViewItem Id 문자열
  */
  Get(id: string): ListViewItem | undefined;

  /** 
   * ListViewItem 획득
   *
  * @param idx ListViewItem Index 번호
  */
  GetAt(idx: number): ListViewItem | undefined;

  /** 
   * ListViewItem 제거
   *
  * @param id ListViewItem Id 문자열
  */
  Remove(id: string): void;

  /** 
   * ListViewItem 제거
   *
  * @param idx ListViewItem Index 번호
  */
  RemoveAt(idx: number): void;

  /** 
   * ListView ScrollBar 위치를 가장 밑으로 이동
   *
  */
  ScrollToEnd(): void;

  /** 
   * ListView SelectedItems Value Change
   *
  * @param items ListViewItem 배열
  */
  SelectedItemsValueChange(items: ListViewItem[]): void;

  /** 
   * ListViewItem 갱신
   *
  */
  Update(): void;

  /**
   * @event 
   *
   * DropEvent 발생 후, 발생되는 이벤트
   *
   * @param args
   *
   * Target : {@link ListView}
  */
  OnAfterDropEvent : (sender : ListView
  , args : { 
    /**
     * 이동 된 ListViewItem 및 ListViewItem[]
    */
    item: ListViewItem
  }
  ) => void;


  /**
   * @event 
   *
   * DropEvent 발생 전, 발생되는 이벤트
   *
   * @param args
   *
   * Target : {@link ListView}
  */
  OnBeforeDropEvent : (sender : ListView
  , args : { 
    /**
     * 이동 된 ListViewItem 및 ListViewItem[]
    */
    item: ListViewItem
  }
  ) => void;


  /**
   * @event 
   *
   * PreviewDragEvent(MouseDown) 발생 전, 발생되는 이벤트
   *
   * @param args
   *
   * Target : {@link ListView}
  */
  OnBeforePreviewDragEvent : (sender : ListView
  , args : { 
    /**
     * MouseDown 위치에 존재하는 ListViewItem
    */
    item: ListViewItem
  }
  ) => void;


  /**
   * @event 
   *
   * 다른 리스트뷰로 이동 시, Drop Event를 방지하는 이벤트
   *
   * @param args
   *
   * Target : {@link ListView}
  */
  OnDropCancelEvent : (sender : ListView
  , args : { 
    /**
     * DropEvent Cancel 관련 데이터
    */
    args: DropCancelEventArgs
  }
  ) => void;


  /**
   * @event 
   *
   * ListViewItem 선택 시, 발생되는 이벤트
   *
   * @param args
   *
   * Target : {@link ListView}
  */
  OnSelectedItems : (sender : ListView
  , args : { 
    /**
     * 선택 된 ListViewItem 및 ListViewItem[]
    */
    item: ListViewItem
  }
  ) => void;


}
