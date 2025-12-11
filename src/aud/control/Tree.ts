import { Control } from "../../aud/control/Control";
import { MTXTree } from "../../aud/control/matrixTree/MTXTree";
import { MTXTreeNode } from "../../aud/control/matrixTree/MTXTreeNode";
import { DataRow } from "../../aud/data/DataRow";
import { DataTable } from "../../aud/data/DataTable";
import { DataSet } from "../../aud/data/DataSet";
import { ContextMenu } from "../../aud/control/ContextMenu";
/**
* 데이터를 계층형 트리구조로 표현합니다(비동기).
*/
export interface Tree extends Control{

  /**
   * 보고서가 열리면서 자동으로 Refresh를 할지 여부
  */
  AutoRefresh: boolean;

  /**
   * 전체 Refresh동작 에서 Refresh 대상인지 여부
  */
  DoRefresh: boolean;

  /**
   * 자식노드가 있는지에 대한 필드(필드값=Y|N)
  */
  HasChildField: string;

  /**
   * 마우스 오버 시 셀렉션 배경 색상. Tree가 Refresh되면 해당 값으로 변경됩니다.
  */
  HoverBackgroundColor: string;

  /**
   * 마우스 오버 시 셀렉션 글자 색상 Tree가 Refresh되면 해당 값으로 변경됩니다.
  */
  HoverFontColor: string;

  /**
   * 이미지필드
  */
  ImageField: string;

  /**
   * 부모 자식 자동 생성용
   * @hidden
  */
  KeyField: string;

  /**
   * 라벨필드
  */
  LabelField: string;

  /**
   * Matrix Tree
   * @hidden
  */
  MtxTree: MTXTree;

  /**
   * 폴더노드일때 노드 선택시 이미지필드
  */
  OnImageField: string;

  /**
   * 부모 자식 자동 생성용
   * @hidden
  */
  ParentKeyField: string;

  /**
   * 트리의 채크박스 사용여부
  */
  ShowCheckBox: boolean;

  /**
   * 툴팁 필드
   * @hidden
  */
  ToolTipField: string;

  /**
   * 값필드
  */
  ValueField: string;

  /** 
   * 노드추가
   *
  * @param parentNode 부모 노드
  * @param data Row 데이터
  */
  AppendNode(parentNode: MTXTreeNode, data: DataRow): MTXTreeNode;

  /** 
   * 테이블 데이터를 선택한 노드의 하위에 추가 합니다. 부모 노드가 없으면 ROOT에 추가 합니다.
   *
  * @param parentNode 부모 노드
  * @param table 테이블
  */
  AppendTable(parentNode: MTXTreeNode, table: DataTable): MTXTreeNode;

  /** 
   * 트리 객체 초기화
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
   * 차트에 바인딩된 데이터셋을 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /** 
   * 노드 반환
   *
  * @param nodeCode 노드 코드
  */
  GetNode(nodeCode: string): MTXTreeNode;

  /** 
   * 최상위 노드 반환
   *
  */
  GetRootNode(): MTXTreeNode;

  /** 
   * 노드 삭제
   *
  * @param nodeCode 노드 코드
  */
  RemoveNode(nodeCode: string): void;

  /** 
   * 노드 선택
   *
  * @param nodeCode 노드 코드
  */
  SelectNode(nodeCode: string): void;

  /** 
   * 차트의 데이터셋을 변경합니다.
   *
  * @param dataset 데이터셋 객체
  */
  SetDataSet(dataset: DataSet): void;

  /**
   * @event 
   *
   * 컨텍스트 메뉴가 열리기 전에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnContextMenuOpening : (sender : Tree
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * Selected node
    */
    Node: MTXTreeNode
    /**
     * 컨텍스트 메뉴 객체
    */
    Menu: ContextMenu
    /**
     * 컨텍스트 메뉴를 열지 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param args
   *
   * Parameter Info
  */
  OnDataBindEnd : (sender : Tree
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 데이터셋의 레코드 수량
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 접은 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeAfterCollapsed : (sender : Tree
  , args : { 
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
   * 트리컨트롤의 노드를 펼친 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeAfterExpand : (sender : Tree
  , args : { 
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
   * 트리컨트롤의 노드를 접기 전에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeBeforeCollapsed : (sender : Tree
  , args : { 
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
   * 트리컨트롤의 노드를 펼치기 전에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeBeforeExpand : (sender : Tree
  , args : { 
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
   * 트리컨트롤 노드의 채크박스를 클릭했을때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeCheckboxClick : (sender : Tree
  , args : { 
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
   * 트리컨트롤의 노드를 클릭했을때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeClick : (sender : Tree
  , args : { 
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
   * 트리컨트롤의 노드를 더블클릭했을때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeDbClick : (sender : Tree
  , args : { 
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
   * 트리컨트롤의 노드에서 마우스 우클릭 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeRightClick : (sender : Tree
  , args : { 
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
