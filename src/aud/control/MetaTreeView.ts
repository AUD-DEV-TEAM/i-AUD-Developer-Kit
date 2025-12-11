import { TreeView } from "../../aud/control/TreeView";
import { FilterInfo } from "../../aud/control/MetaTreeView/FilterInfo";
import { TreeViewNode } from "../../aud/control/treeviews/TreeViewNode";
import { DataRow } from "../../aud/data/DataRow";
/**
* i-META 항목 표시를 위한 컨트롤
*/
export interface MetaTreeView extends TreeView{

  /**
   * LOV 팝업 시 다른 조회조건을 포함할지 여부
  */
  IncludeFilterItem: boolean;

  /** 
   * 모든 필터를 삭제하는 api
   *
  */
  ClearAllFilter(): void;

  /** 
   * 조회 조건 삭제하는 api
   *
  * @param code 코드
  */
  ClearFilter(code: string): void;

  /** 
   * meta layout에 걸려 있는 filter 정보 조회
   *
  */
  GetLOVFilterInfo(): FilterInfo[];

  /** 
   * Check 상태가 변경된 항목을 추가 또는 삭제하는 api
   *
  * @param notRefresh 연결된 그리드를 조회할 지 여부
  */
  UpdateCheckedItems(notRefresh: boolean): void;

  /** 
   * 필터 상태가 변경된 항목을 추가 또는 삭제하는 api
   *
  * @param autoRefresh 연결된 그리드를 조회할 지 여부
  */
  UpdateFilterItem(autoRefresh: boolean): void;

  /**
   * @event 
   *
   * 메타 보고서 오픈 후 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link MetaTreeView}
  */
  OnDataBindEnd : (sender : MetaTreeView
  , args : { 
    /**
     * Id
    */
    Id: string
    /**
     * 개수
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event 
   *
   * 항목을 drop 시 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link MetaTreeView}
  */
  OnDrop : (sender : MetaTreeView
  , args : { 
    /**
     * Id
    */
    Id: string
    /**
     * Row들
    */
    Rows: TreeViewNode[]
    /**
     * Row: 1, Column:2, Filter: 3, Data 4
    */
    Area: number
    /**
     * 취소 여부
    */
    Cancel: boolean
    /**
     * Handled
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 조회 조건이 변경되는 경우 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link MetaTreeView}
  */
  OnFilterChanged : (sender : MetaTreeView
  , args : { 
    /**
     * Id
    */
    Id: string
    /**
     * 데이터
    */
    Data: DataRow
    /**
     * 필터 정보
    */
    FilterInfo: FilterInfo[]
    /**
     * 연결된 grid refresh할지 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 검색어 검색 후 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link MetaTreeView}
  */
  OnSearchComplete : (sender : MetaTreeView
  , args : { 
    /**
     * Id
    */
    Id: string
    /**
     * 검색어
    */
    Keyword: string
  }
  ) => void;


}
