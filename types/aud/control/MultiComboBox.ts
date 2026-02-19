import { Control } from "../../aud/control/Control";
import { enInitType } from "../../aud/enums/comm/enInitType";
import { enRefreshType } from "../../aud/enums/comm/enRefreshType";
import { enTreeViewType } from "../../aud/enums/comm/enTreeViewType";
import { TreeComboNode } from "../../aud/control/TreeComboNode";
import { DataSet } from "../../aud/data/DataSet";
import { Event } from "../../aud/data/Event";
/**
* 다중 선택 또는 트리 구조의 데이터를 표현할 수 있는 콤보박스 컨트롤입니다.
*/
export interface MultiComboBox extends Control{

  /**
   * 하위 노드 자동 선택 여부를 가져오거나 설정합니다.
  */
  AutoChildSelect: boolean;

  /**
   * 트리 자동 확장 깊이를 가져오거나 설정합니다.
  */
  AutoExpandLevel: number;

  /**
   * 캡션 필드를 가져오거나 설정합니다.
  */
  CaptionField: string;

  /**
   * 자식 필드를 가져오거나 설정합니다.
  */
  ChildField: string;

  /**
   * 데이터소스를 가져오거나 설정합니다.
   * @hidden
  */
  DataSource: string;

  /**
   * 팝업 컨테이너의 높이를 가져오거나 설정합니다.
  */
  DialogHeight: number;

  /**
   * 팝업 컨테이너의 너비를 가져오거나 설정합니다.
  */
  DialogWidth: number;

  /**
   * 편집 가능 여부를 가져오거나 설정합니다.
  */
  EditableValueText: boolean;

  /**
   * 값이 없을 경우 SQL 조합 시 반환할 값을 가져오거나 설정합니다.
  */
  EmptyValue: string;

  /**
   * 팝업 컨테이너 내부 검색 기능 대신 사용할 쿼리 조건 변수 이름을 가져오거나 설정합니다.
  */
  FilterVariableName: string;

  /**
   * 체크박스 숨김 여부를 가져오거나 설정합니다.
  */
  HideCheckBox: boolean;

  /**
   * 이미지 필드를 가져오거나 설정합니다.
  */
  ImageField: string;

  /**
   * 트리 상하위 노드 인덴트 크기를 가져오거나 설정합니다.
  */
  IndentSize: number;

  /**
   * 데이터 조회 후 초기값 설정 방식을 가져오거나 설정합니다.
  */
  InitType: enInitType;

  /**
   * 초기 값을 가져오거나 설정합니다.
  */
  InitValue: string;

  /**
   * 다중 선택 기능 활성화 여부를 가져오거나 설정합니다.
  */
  IsMultiSelect: boolean;

  /**
   * 읽기 전용 여부를 가져오거나 설정합니다.
  */
  IsReadOnly: boolean;

  /**
   * 전체가 선택되었는지 여부를 가져옵니다.
  */
  IsSelectedAll: boolean;

  /**
   * 트리 구조에서 상위 노드 클릭 시 가장 하위 노드만 선택할지 여부를 가져오거나 설정합니다.
  */
  LeafNodeOnly: boolean;

  /**
   * 컨트롤의 왼쪽 여백을 가져오거나 설정합니다. (기본값: 6)
  */
  PaddingLeft: number;

  /**
   * 부모 필드를 가져오거나 설정합니다.
  */
  ParentField: string;

  /**
   * 팝업 컨테이너 객체를 가져오거나 설정합니다.
   * @hidden
  */
  PopUpCtl: any;

  /**
   * 버튼 클릭 시 데이터 조회 방식을 가져오거나 설정합니다.
  */
  RefreshType: enRefreshType;

  /**
   * 전체 선택 시 표시할 캡션을 가져오거나 설정합니다.
  */
  SelectedAllText: string;

  /**
   * 툴팁 필드를 가져오거나 설정합니다.
  */
  TooltipField: string;

  /**
   * 멀티콤보박스 리스트 형태를 가져오거나 설정합니다.
  */
  TreeViewType: enTreeViewType;

  /**
   * 현재 선택된 값을 가져오거나 설정합니다.
  */
  Value: string[];

  /**
   * 값 필드를 가져오거나 설정합니다.
  */
  ValueField: string;

  /**
   * 데이터소스를 적용합니다.
   *
   * @param result 데이터소스 모델 객체
   * @param tmpType 확장 타입
   * @hidden
   */
  ApplyDataSource(result?: object, tmpType?: string): void;

  /**
   * 전체 노드를 선택합니다.
   *
   * @example
   * ```js
   * // 멀티콤보박스 전체 선택
   * var mcbDept = Matrix.getObject("mcbDept");
   * mcbDept.CheckAll();
   * console.log(mcbDept.IsSelectedAll); // true
   * ```
   */
  CheckAll(): void;

  /**
   * 컨트롤에 바인딩된 데이터셋을 초기화합니다.
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
  * @param depth 확장할 깊이
  */
  DepthExpand(parent: TreeComboNode, depth: number): void;

  /**
   * 컨트롤이 포커스를 얻게 합니다.
   *
  */
  Focus(): void;

  /**
   * 선택된 값 목록의 표시 텍스트를 반환합니다.
   *
  */
  GetCaption(): string;

  /**
   * 컨트롤에 바인딩된 데이터셋 객체를 반환합니다.
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
   * 컨트롤에 데이터셋 객체를 바인딩합니다.
   *
  * @param ds 데이터셋 객체
  */
  SetDataSet(ds: DataSet): void;

  /**
   * 지정한 이름의 데이터소스를 바인딩합니다.
   *
  * @param name 데이터소스 이름
  */
  SetDataSourceName(name: string): void;

  /**
   * 팝업 컨테이너의 너비와 높이를 변경합니다.
   *
  * @param width 너비 (최소값 330, 최대값 900)
  * @param height 높이 (최소값 220, 최대값 600)
  */
  SetDialogSize(width: number, height: number): void;

  /**
   * 컨트롤의 값을 설정합니다.
   *
   * @example
   * ```js
   * var mcbDept = Matrix.getObject("mcbDept");
   *
   * // 배열로 여러 값 설정
   * mcbDept.SetValue(["001", "002", "003"]);
   *
   * // 문자열로 여러 값 설정 (콤마 구분)
   * mcbDept.SetValue("001,002,003");
   * ```
   * @param values 값 (string 타입인 경우 쉼표로 구분하여 여러 개 입력)
   */
  SetValue(values: string|string[]): void;

  /**
   * 팝업 컨테이너를 생성합니다.
   *
  * @param width 너비
  * @param height 높이
   * @hidden
  */
  createPopUpCtl(width?: number, height?: number): void;

  /**
   * @event
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 멀티콤보박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MultiComboBox}
  */
  OnDataBindEnd : (sender : MultiComboBox
  , args : {
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
   * 데이터 조회가 시작될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 멀티콤보박스 컨트롤
   * @param args 이벤트 인자
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
     * 조회 유형 (0: 일반 조회, 1: 검색 텍스트박스 조회, 2: 전체 검색 버튼 조회)
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
   * 노드를 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 멀티콤보박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MultiComboBox}
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
   * 노드를 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 멀티콤보박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MultiComboBox}
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
   * 텍스트 박스에서 키를 뗄 때 발생합니다. EditableValueText가 true인 경우에만 동작합니다.
   *
   * @param sender 이벤트가 발생한 멀티콤보박스 컨트롤
   * @param args 이벤트 인자
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
     * 키 이벤트 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event
   *
   * 멀티콤보박스의 값이 변경될 때 발생합니다.
   *
   * @example
   * ```js
   * var mcbDept = Matrix.getObject("mcbDept");
   * mcbDept.OnValueChange = function(sender, args) {
   *     console.log("이전 값: " + args.OldValue);
   *     console.log("현재 값: " + args.Value);
   *
   *     // 선택된 값으로 그리드 조회
   *     Matrix.doRefresh("grdEmployee");
   * };
   * ```
   * @param sender 이벤트가 발생한 멀티콤보박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link MultiComboBox}
   */
  OnValueChange : (sender : MultiComboBox
  , args : {
    /**
     * 컨트롤 이름
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
