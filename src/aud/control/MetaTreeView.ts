import { TreeView } from "../../aud/control/TreeView";
import { FilterInfo } from "../../aud/control/metaTreeViews/FilterInfo";
import { TreeViewNode } from "../../aud/control/treeviews/TreeViewNode";
import { DataRow } from "../../aud/data/DataRow";
/**
* i-META 항목을 표시하는 트리뷰 컨트롤입니다.
*/
export interface MetaTreeView extends TreeView{

  /**
   * LOV 팝업 시 다른 조회 조건을 포함할지 여부를 가져오거나 설정합니다.
  */
  IncludeFilterItem: boolean;

  /**
   * 모든 필터를 삭제합니다.
   *
  */
  ClearAllFilter(): void;

  /**
   * 지정한 코드의 조회 조건을 삭제합니다.
   *
  * @param code 코드
  */
  ClearFilter(code: string): void;

  /**
   * 메타 레이아웃에 설정된 필터 정보를 반환합니다.
   *
  */
  GetLOVFilterInfo(): FilterInfo[];

  /**
   * 체크 상태가 변경된 항목을 추가하거나 삭제합니다.
   *
  * @param notRefresh 연결된 그리드를 조회하지 않을지 여부
  */
  UpdateCheckedItems(notRefresh: boolean): void;

  /**
   * 필터 상태가 변경된 항목을 추가하거나 삭제합니다.
   *
  * @param autoRefresh 연결된 그리드를 자동 조회할지 여부
  */
  UpdateFilterItem(autoRefresh: boolean): void;

  /**
   * @event
   *
   * 메타 보고서가 열린 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 메타 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MetaTreeView}
  */
  OnDataBindEnd : (sender : MetaTreeView
  , args : {
    /**
     * 컨트롤 이름
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
   * 항목을 드롭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 메타 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MetaTreeView}
  */
  OnDrop : (sender : MetaTreeView
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 드롭된 노드 목록
    */
    Rows: TreeViewNode[]
    /**
     * 드롭 영역 (Row: 1, Column: 2, Filter: 3, Data: 4)
    */
    Area: number
    /**
     * 취소 여부
    */
    Cancel: boolean
    /**
     * 이벤트 처리 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event
   *
   * 조회 조건이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 메타 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MetaTreeView}
  */
  OnFilterChanged : (sender : MetaTreeView
  , args : {
    /**
     * 컨트롤 이름
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
     * 연결된 그리드를 자동 조회할지 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event
   *
   * 검색어 검색이 완료된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 메타 트리뷰 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MetaTreeView}
  */
  OnSearchComplete : (sender : MetaTreeView
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 검색어
    */
    Keyword: string
  }
  ) => void;


}
