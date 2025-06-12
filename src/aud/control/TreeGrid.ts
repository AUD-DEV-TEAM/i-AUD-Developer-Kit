import { Grid } from "../../aud/control/Grid";
import { TreeSetting } from "../../aud/control/grids/TreeSetting";
import { TreeGridNode } from "../../aud/control/grids/TreeGridNode";
import { DataGridRow } from "../../aud/control/grids/DataGridRow";
import { DataGridCell } from "../../aud/control/grids/DataGridCell";
import { enTreeCellArea } from "../../aud/enums/comm/enTreeCellArea";
/**
* 데이터를 트리 형태로 표현해주는 컨트롤.
*/
export interface TreeGrid extends Grid{

  /**
   * 트리 구조 정보 객체
  */
  TreeInfo: TreeSetting;

  /** 
   * 체크되어져 있는 모든 행들을 해제합니다.
   *
  */
  ClearCheckedRows(): void;

  /** 
   * 전체 노드를 축소합니다.
   *
  */
  CollapseAll(): void;

  /** 
   * 전체 노드를 확장합니다.
   *
  */
  ExpandAll(): void;

  /** 
   * 특정 깊이까지 노드를 확장합니다.
   *
  * @param depth 레벨 또는 깊이
  */
  ExpandToLevel(depth: number): void;

  /** 
   * 체크되어져 있는 모든 행들을 반환합니다.
   *
  */
  GetCheckedRows(): TreeGridNode[];

  /** 
   * 특정 위치의 레코드(행)을 찾아준다.
   *
  * @param idx 행 위치
  */
  GetRow(idx: number): TreeGridNode;

  /** 
   * 전체 레코드(필터로 인해 숨은 레코드 포함)에서 특정 위치의 레코드(행)을 찾아준다.
   *
  * @param idx 행 위치
  */
  GetRowInTotalRows(idx: number): TreeGridNode;

  /**
   * @event 
   *
   * 트리 그리드의 트리형태 셀을 클릭할 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnTreeCellClick : (sender : TreeGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 선택한 영역
    */
    Area: enTreeCellArea
  }
  ) => void;


}
