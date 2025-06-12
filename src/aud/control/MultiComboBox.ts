import { Control } from "../../aud/control/Control";
import { enInitType } from "../../aud/enums/comm/enInitType";
import { enRefreshType } from "../../aud/enums/comm/enRefreshType";
import { enTreeViewType } from "../../aud/enums/comm/enTreeViewType";
import { TreeComboNode } from "../../aud/control/TreeComboNode";
import { DataSet } from "../../aud/data/DataSet";
import { Event } from "../../aud/data/Event";
/**
* 다중선택 또는 트리 구조의 데이터를 표현할 수 있는 객체 입니다.
*/
export interface MultiComboBox extends Control{

  /**
   * 자동으로 하위 노드까지 선택여부
  */
  AutoChildSelect: boolean;

  /**
   * 트리 자동 확장 깊이
  */
  AutoExpandLevel: number;

  /**
   * 캡션 필드
  */
  CaptionField: string;

  /**
   * 자식 필드
  */
  ChildField: string;

  /**
   * 데이터소스
   * @hidden
  */
  DataSource: string;

  /**
   * Popup Container 의 높이
  */
  DialogHeight: number;

  /**
   * Popup Container 의 넓이
  */
  DialogWidth: number;

  /**
   * 편집 가능 여부
  */
  EditableValueText: boolean;

  /**
   * 값이 없을 경우 SQL 조합시에 반환할 값
  */
  EmptyValue: string;

  /**
   * 팝업컨테이너 내부 [전체 목록]의 검색 기능 대신 사용자가 쿼리의 조건문 입력 후 해당 값을 바인딩 함
  */
  FilterVariableName: string;

  /**
   * 체크박스 표시 여부
  */
  HideCheckBox: boolean;

  /**
   * 이미지 필드
  */
  ImageField: string;

  /**
   * 트리 상하위 노드 인덴트 크기 
  */
  IndentSize: number;

  /**
   * 초기화 값 지정 방식
  */
  InitType: enInitType;

  /**
   * 초기 값
  */
  InitValue: string;

  /**
   * 다중 선택 기능 활성화 여부
  */
  IsMultiSelect: boolean;

  /**
   * 읽기전용
  */
  IsReadOnly: boolean;

  /**
   * 전체가 선택되었는지 여부
  */
  IsSelectedAll: boolean;

  /**
   * 트리구조에서 상위노드 클릭, 데이터는 가장 하위노드 선택
  */
  LeafNodeOnly: boolean;

  /**
   * 컨트롤의 PaddingLeft(default: 6)
  */
  PaddingLeft: number;

  /**
   * 부모 필드
  */
  ParentField: string;

  /**
   * 팝업 컨테이너 객체
   * @hidden
  */
  PopUpCtl: string;

  /**
   * 데이터 조회 방식
  */
  RefreshType: enRefreshType;

  /**
   * 멀티콤보박스의 값이 전체 선택되었때 표시할 캡션(기본값, 제품 다국어)
  */
  SelectedAllText: string;

  /**
   * 툴팁 필드
  */
  TooltipField: string;

  /**
   * 멀티콤보박스 리스트 형태
  */
  TreeViewType: enTreeViewType;

  /**
   * 현재 선택된 값을 string[] 형식으로 반환
  */
  Value: string[];

  /**
   * 값 필드
  */
  ValueField: string;

  /** 
   * 데이터소스 적용하는 함수입니다.
   *
  * @param result ApplyDataSourceModel
  * @param tmpType enApplyDataSourceExtensionType
   * @hidden
  */
  ApplyDataSource(result?: any, tmpType?: string): void;

  /** 
   * 전체 노드를 선택합니다.
   *
  */
  CheckAll(): void;

  /** 
   * 컨트롤에 바인딩 된 데이터셋을 초기화합니다.
   *
  */
  ClearDataSet(): void;

  /** 
   * 컨트롤의 현재 선택된 값을 초기화합니다.
   *
  */
  ClearValue(): void;

  /** 
   * 특정 깊이까지 노드를 확장합니다.
   *
  * @param parent 상위 노드
  * @param depth 레벨 또는 깊이
  */
  DepthExpand(parent: TreeComboNode, depth: number): void;

  /** 
   * 컨트롤이 포커스를 얻게 합니다.
   *
  */
  Focus(): void;

  /** 
   * 선택된 값 목록의 화면표시 값을 반환합니다.
   *
  */
  GetCaption(): string;

  /** 
   * 컨트롤에 바인딩 된 데이터셋 객체를 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /** 
   * 리스트 순서로 선택된 값 목록을 반환합니다.
   *
  */
  GetSelectedValue(): string[];

  /** 
   * 선택된 값 목록을 반환합니다.
   *
  */
  GetValue(): string[];

  /** 
   * 컨트롤에 데이터셋 객체를 바인딩 합니다.
   *
  * @param ds 데이터셋 객체
  */
  SetDataSet(ds: DataSet): void;

  /** 
   * 주어진 이름의 데이터 소스를 바인딩 합니다.
   *
  * @param name 데이터 소스 명
  */
  SetDataSourceName(name: string): void;

  /** 
   * Dialog 팝업의 너비와 높이 값을 변경합니다.
   *
  * @param width 너비 값 ( 최소값 330, 최대값 900 )
  * @param height 높이 값 ( 최소값 220, 최대값 600 )
  */
  SetDialogSize(width: number, height: number): void;

  /** 
   * 컨트롤의 값을 설정합니다.
   *
  * @param values 값(string 타입으로 입력하는 경우 컴마(,)로 분리하여 여러개 입력)
  */
  SetValue(values: string|string[]): void;

  /** 
   * 팝업 컨테이너를 생성하는 함수입니다.
   *
  * @param width 넓이
  * @param height 높이
   * @hidden
  */
  createPopUpCtl(width?: number, height?: number): void;

  /**
   * @event 
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link MultiComboBox}
  */
  OnDataBindEnd : (sender : MultiComboBox
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
   * Execute 실행되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link MultiComboBox}
  */
  OnExecuteStart : (sender : MultiComboBox
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정 시 실행이 취소됩니다.
    */
    Cancel: boolean
    /**
     * 0:일반 조회, 1:검색 텍스트박스 조회, 2:전체검색 버튼 조회
    */
    FilterType: number
    /**
     * 검색 텍스트박스에 입력된 검색어
    */
    FilterText: string
  }
  ) => void;


  /**
   * @event 
   *
   * 노드를 클릭할 경우 발생합니다.
   *
   * @param args
   *
  */
  OnMultiComboBoxNodeClick : (sender : MultiComboBox
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 리스트 형식
    */
    Type: enTreeViewType
    /**
     * 선택된 노드
    */
    Node: TreeComboNode
  }
  ) => void;


  /**
   * @event 
   *
   * 노드를 클릭할 경우 발생합니다.
   *
   * @param args
   *
  */
  OnNodeClick : (sender : MultiComboBox
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 리스트 형식
    */
    Type: enTreeViewType
    /**
     * 선택된 노드
    */
    Node: TreeComboNode
  }
  ) => void;


  /**
   * @event 
   *
   * MultiComboBox의 텍스트 박스에 key 입력 후 발생합니다.(단, EditableValueText==true일 경우만)
   *
   * @param args
   *
   * Target : {@link MultiComboBox}
  */
  OnTextKeyup : (sender : MultiComboBox
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 콤보 박스의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link MultiComboBox}
  */
  OnValueChange : (sender : MultiComboBox
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 변경 전 컨트롤 값
    */
    OldValue: string
    /**
     * 현재 컨트롤 값
    */
    Value: string
  }
  ) => void;


}
