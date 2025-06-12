/**
* 피벗 컨트롤의 메뉴옵션
*/
export interface ScriptMenuOption{

  /**
   * 분석 항목 설정 메뉴 활성화 여부
  */
  AnalysisItemsSettings: boolean;

  /**
   * 행/열 변경 메뉴 활성화 여부
  */
  AxisChange: boolean;

  /**
   * 캐시 정보 메뉴 활성화 여부
  */
  CacheInfo: boolean;

  /**
   * 필터 제거 메뉴 활성화 여부
  */
  ClearFilter: boolean;

  /**
   * 전체 축소 메뉴 활성화 여부
  */
  CollapsedAll: boolean;

  /**
   * 컨트롤 속성 메뉴 활성화 여부
  */
  ControlProperties: boolean;

  /**
   * 사용자 정의 항목 관리 메뉴 활성화 여부
  */
  CustomDimension: boolean;

  /**
   * 전체 확장 메뉴 활성화 여부
  */
  ExpandAll: boolean;

  /**
   * CSV Export 메뉴 활성화 여부
  */
  ExportCSV: boolean;

  /**
   * Excel Export  메뉴활성화 여부
  */
  ExportExcel: boolean;

  /**
   * Text Export 메뉴 활성화 여부
  */
  ExportText: boolean;

  /**
   * 그룹 메뉴 활성화 여부
  */
  FieldGroup: boolean;

  /**
   * 필터 관리 메뉴 활성화 여부
  */
  FilterManager: boolean;

  /**
   * 서식 설정 메뉴 활성화 여부
  */
  Format: boolean;

  /**
   * 계산 수식 편집기 메뉴 활성화 여부
  */
  FormulaEdit: boolean;

  /**
   * 메타큐브 연계 기능 활성화 여부
  */
  HideMetaCube: boolean;

  /**
   * Measure 필드 숨김 메뉴 활성화 여부
  */
  Hiding: boolean;

  /**
   * 배치 관리자 메뉴 활성화 여부
  */
  LayoutManager: boolean;

  /**
   * 멀티 헤더 메뉴 활성화 여부
  */
  MultiHeader: boolean;

  /**
   * 정렬 메뉴 활성화 여부
  */
  Sort: boolean;

  /**
   * Style 메뉴 활성화 여부
  */
  Style: boolean;

  /**
   * 합계 표시 메뉴 활성화 여부
  */
  VisibleTotal: boolean;

}
