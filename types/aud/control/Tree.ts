import { Control } from "../../aud/control/Control";
import { MTXTree } from "../../aud/control/matrixTree/MTXTree";
import { MTXTreeNode } from "../../aud/control/matrixTree/MTXTreeNode";
import { DataRow } from "../../aud/data/DataRow";
import { DataTable } from "../../aud/data/DataTable";
import { DataSet } from "../../aud/data/DataSet";
import { ContextMenu } from "../../aud/control/ContextMenu";
/**
 * 데이터를 계층형 트리 구조로 표현합니다(비동기).
 */
export interface Tree extends Control {

  /**
   * 보고서가 열리면서 자동으로 조회할지 여부를 가져오거나 설정합니다.
   */
  AutoRefresh: boolean;

  /**
   * 전체 조회 동작에서 조회 대상인지 여부를 가져오거나 설정합니다.
   */
  DoRefresh: boolean;

  /**
   * 자식 노드가 있는지에 대한 필드를 가져오거나 설정합니다. (필드값: Y|N)
   */
  HasChildField: string;

  /**
   * 마우스 오버 시 셀렉션 배경 색상을 가져오거나 설정합니다. Tree가 조회되면 해당 값으로 변경됩니다.
   */
  HoverBackgroundColor: string;

  /**
   * 마우스 오버 시 셀렉션 글자 색상을 가져오거나 설정합니다. Tree가 조회되면 해당 값으로 변경됩니다.
   */
  HoverFontColor: string;

  /**
   * 이미지 필드를 가져오거나 설정합니다.
   */
  ImageField: string;

  /**
   * 부모 자식 자동 생성용 키 필드를 가져오거나 설정합니다.
   * @hidden
   */
  KeyField: string;

  /**
   * 라벨 필드를 가져오거나 설정합니다.
   */
  LabelField: string;

  /**
   * Matrix Tree 객체를 가져옵니다.
   * @hidden
   */
  MtxTree: MTXTree;

  /**
   * 폴더 노드일 때 노드 선택 시 이미지 필드를 가져오거나 설정합니다.
   */
  OnImageField: string;

  /**
   * 부모 자식 자동 생성용 부모 키 필드를 가져오거나 설정합니다.
   * @hidden
   */
  ParentKeyField: string;

  /**
   * 트리의 체크박스 사용 여부를 가져오거나 설정합니다.
   */
  ShowCheckBox: boolean;

  /**
   * 툴팁 필드를 가져오거나 설정합니다.
   * @hidden
   */
  ToolTipField: string;

  /**
   * 값 필드를 가져오거나 설정합니다.
   */
  ValueField: string;

  /**
   * 노드를 추가합니다.
   *
   * @param parentNode 부모 노드
   * @param data Row 데이터
   */
  AppendNode(parentNode: MTXTreeNode, data: DataRow): MTXTreeNode;

  /**
   * 테이블 데이터를 선택한 노드의 하위에 추가합니다. 부모 노드가 없으면 ROOT에 추가합니다.
   *
   * @param parentNode 부모 노드
   * @param table 테이블
   */
  AppendTable(parentNode: MTXTreeNode, table: DataTable): MTXTreeNode;

  /**
   * 트리 객체를 초기화합니다.
   *
   */
  Clear(): void;

  /**
   * 전체 노드를 축소합니다.
   *
   */
  CollapsedAll(): void;

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
   * 트리에 바인딩된 데이터셋을 반환합니다.
   *
   */
  GetDataSet(): DataSet;

  /**
   * 노드를 반환합니다.
   *
   * @param nodeCode 노드 코드
   */
  GetNode(nodeCode: string): MTXTreeNode;

  /**
   * 최상위 노드를 반환합니다.
   *
   */
  GetRootNode(): MTXTreeNode;

  /**
   * 노드를 삭제합니다.
   *
   * @param nodeCode 노드 코드
   */
  RemoveNode(nodeCode: string): void;

  /**
   * 노드를 선택합니다.
   *
   * @param nodeCode 노드 코드
   */
  SelectNode(nodeCode: string): void;

  /**
   * 트리의 데이터셋을 변경합니다.
   *
   * @param dataset 데이터셋 객체
   */
  SetDataSet(dataset: DataSet): void;

  /**
   * @event
   *
   * 컨텍스트 메뉴가 열리기 전에 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnContextMenuOpening: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드
       */
      Node: MTXTreeNode
      /**
       * 컨텍스트 메뉴 객체
       */
      Menu: ContextMenu
      /**
       * 이 값을 `true`로 설정할 경우 컨텍스트 메뉴가 열리지 않습니다.
       */
      Cancel: boolean
    }
  ) => void;


  /**
   * @event
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnDataBindEnd: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 데이터셋의 레코드 수
       */
      RecordCount: number
    }
  ) => void;


  /**
   * @event
   *
   * 트리 컨트롤의 노드를 접은 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnNodeAfterCollapsed: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드
       */
      Node: MTXTreeNode
    }
  ) => void;


  /**
   * @event
   *
   * 트리 컨트롤의 노드를 펼친 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnNodeAfterExpand: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드
       */
      Node: MTXTreeNode
    }
  ) => void;


  /**
   * @event
   *
   * 트리 컨트롤의 노드를 접기 전에 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnNodeBeforeCollapsed: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드
       */
      Node: MTXTreeNode
    }
  ) => void;


  /**
   * @event
   *
   * 트리 컨트롤의 노드를 펼치기 전에 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnNodeBeforeExpand: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드
       */
      Node: MTXTreeNode
    }
  ) => void;


  /**
   * @event
   *
   * 트리 컨트롤 노드의 체크박스를 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnNodeCheckboxClick: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드
       */
      Node: MTXTreeNode
    }
  ) => void;


  /**
   * @event
   *
   * 트리 컨트롤의 노드를 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnNodeClick: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드
       */
      Node: MTXTreeNode
    }
  ) => void;


  /**
   * @event
   *
   * 트리 컨트롤의 노드를 더블클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnNodeDbClick: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드
       */
      Node: MTXTreeNode
    }
  ) => void;


  /**
   * @event
   *
   * 트리 컨트롤의 노드에서 마우스 우클릭 시 발생합니다.
   *
   * @param sender 이벤트가 발생한 트리 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
   */
  OnNodeRightClick: (sender: Tree
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 선택된 노드
       */
      Node: MTXTreeNode
    }
  ) => void;


}
